sap.ui.define(["sap/ui/core/Fragment"], function (Fragment) {
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
        }
    };
});
