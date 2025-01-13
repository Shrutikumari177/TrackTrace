sap.ui.define(["sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator"],
    function (Fragment,Filter,FilterOperator) {
   "use strict";
   return {

       _openValueHelpDialog: function (oController, fragmentId, fragmentName) {
           let oView = oController.getView();

           if (!oController[fragmentId]) {
               return Fragment.load({
                   id: oView.getId(),
                   name: fragmentName,
                   controller: oController
               }).then(oDialog => {
                   oController[fragmentId] = oDialog;
                   oView.addDependent(oController[fragmentId]);
                   oController[fragmentId].open();
               }).catch(error => {
                   console.warn("Fragment not Loading", error);
               });
           } else {
               oController[fragmentId].open();
           }
       },

       _valueHelpSelectedValue : function(oEvent,oController,inputId){
           let inputValue = oController.byId(inputId)
           let sSelect = oEvent.getParameter("selectedItem")
           let sValue = sSelect.getTitle()
          if(sValue){
            inputValue.setValue(sValue)
            return sValue
          }
       },

       _clearInputValues : function(oControl,ids){
           ids.forEach(id=>{
               let inputField = oControl.byId(id)
               if(inputField){
                   inputField.setValue("")
               }
               else{
                   console.warn(`${id} not Found`)
               }
           })  
       },

       _valueHelpLiveSearch : function(oEvent,filterField){
            let sValue = oEvent.getParameter("value")|| oEvent.getParameter("query") || oEvent.getParameter("newValue")
            let oBinding = oEvent.getSource().getBinding("items")
            if(sValue){
               let oFilter = new sap.ui.model.Filter(filterField,FilterOperator.Contains,sValue)
               oBinding.filter([oFilter])
            }
            else{
               oBinding.filter([])
            }
       },

       getOCDataWithBatchId: async function (oControl,urlPath,batchId) {
           let oModel = oControl.getOwnerComponent().getModel();
           let batchValue = encodeURIComponent(batchId)
           let path = `/${urlPath}(BatchID='${batchValue}')`;
           let oBindList = oModel.bindList(path)        
           try {
               let oContexts = await oBindList.requestContexts(0, Infinity);
               let oData = oContexts.map(context => context.getObject());
               return oData;
           } catch (error) {
               console.error(`Error fetching data from ${url} with BatchID=${batchId}:`, error);
           }
       },
   };
});
