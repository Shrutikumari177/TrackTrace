sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "tracktrace/utils/HelperFunction"
  ], (BaseController,Filter,FilterOperator,Fragment,JSONModel,HelperFunction) => {
    "use strict";
  
    return BaseController.extend("tracktrace.controller.InvMapping", {

        onInit() {
            var oData = {
                orderConfirmations: [
                    {
                        orderConfirmationId: "OC001",
                        productionOrder:"P1001",
                        batchId : "B0001",
                        startDate: "2025-01-01",
                        endDate: "2025-06-31",
                        quantity: "1100",
                        status: "Completed"
                    },
                    {
                        orderConfirmationId: "OC002",
                        productionOrder:"P1002",
                        batchId: "B1002",
                        startDate: "2025-02-01",
                        endDate: "2025-07-31",
                        quantity: "1130",
                        status: "In Progress",
                    },
                    {
                        orderConfirmationId: "OC003",
                        productionOrder:"P1003",
                        batchId: "B1003",
                        startDate: "2025-03-01",
                        endDate: "2025-07-31",
                        quantity: "1230",
                        status: "Pending",
                    }
                ]
            };

            var oModel = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel, "ocContainerModel");

            let vendorNo = {vendors :  [
                {
                    vendorId : "21000001",
                    vendorName : "Vanshaj"
                },
                {
                    vendorId : "21000002",
                    vendorName : "Shruti"
                },
                {
                    vendorId : "21000003",
                    vendorName : "Ashwani"
                },
                {
                    vendorId : "21000004",
                    vendorName : "Deepanshu"
                },
                {
                    vendorId : "21000005",
                    vendorName : "Ayush"
                }
            ]}

            let vendorModel = new sap.ui.model.json.JSONModel(vendorNo);
            this.getView().setModel(vendorModel, "vendorDataModel");
          
        },

        onOpenOcCodeValueHelp : function(){
            HelperFunction._openValueHelpDialog(this,"_ocCodeFragment","tracktrace.fragments.ocCodeValueHelp")
        },
        onOpenBatchIdValueHelp: function(){
            HelperFunction._openValueHelpDialog(this,"_batchIdDataFragment","tracktrace.fragments.batchCodeValueHelp")
        },
        _onOpenVendorValueHelp :function(){
            HelperFunction._openValueHelpDialog(this,"vendorDetailFragment","tracktrace.fragments.vendorValueHelp")
        },
        onOCValueConfirmItem : function(oEvent){
            HelperFunction._valueHelpSelectedValue(oEvent,this,"mapping_ocValueHelpInput")
        },
        onBatchValueConfirmItem : function(oEvent){
            HelperFunction._valueHelpSelectedValue(oEvent,this,"mapping_batchValueHelpInput")
        },
        onVendorValueConfirmItem :function(oEvent){
            let vendorId = HelperFunction._valueHelpSelectedValue(oEvent,this,"mapping_vendorValueHelpInput")
            let vendorNameInput = this.byId("mapping_vendorNameInput")
            if(vendorId){
                let oModel = this.getView().getModel("vendorDataModel")
                let modelData = oModel.getData()
                if(modelData.vendors && Array.isArray(modelData.vendors)){
                    let filterData = modelData.vendors.find(item=>item.vendorId===vendorId)
                    if(filterData.vendorName){
                        vendorNameInput.setValue(filterData.vendorName)
                    } 
                }

            }
            
        },
        _onMappingGoButtonPress: function(){
                  let ocValue = this.byId("mapping_ocValueHelpInput").getValue()
                  let batchValue = this.byId("mapping_batchValueHelpInput").getValue()
                  if(ocValue || batchValue){
                    this.getDataFromVendorModel(ocValue,batchValue)
                  }
                  else{
                    sap.m.MessageToast.show("Please select Order No")
                  }
        },

        getDataFromVendorModel:async function(ocParam,batchParam){
            let oModel = this.getView().getModel("ocContainerModel")
            let modelData = oModel.getData()
            if(modelData.orderConfirmations && Array.isArray(modelData.orderConfirmations)){
               let filterData =  modelData.orderConfirmations.find(item=>{
                   return item.orderConfirmationId===ocParam && item.batchId === batchParam
                })
                if(!filterData){
                    sap.m.MessageToast.show("Data not Found")
                    await this.refreshModelMethod()
                    return
                }
               let filterModel = new JSONModel(filterData)
               this.getView().setModel(filterModel,"filterOcModelData")
            }
        },
        refreshModelMethod : function(){
            let filterOcDataModel = this.getView().getModel("filterOcModelData")
            if(filterOcDataModel){
                filterOcDataModel.setProperty("/",[])
                HelperFunction._clearInputValues(this,["mapping_vendorValueHelpInput","mapping_vendorNameInput"])
            }
        }


      
    });
  });