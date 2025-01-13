
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
            let conditionModel = {
                vendorIdDisplay : false,
                vendorIdEdit : true,
                submitBtnEnabled : true
            }
            let cModel =new sap.ui.model.json.JSONModel(conditionModel);
            this.getView().setModel(cModel, "displayOrNotModel");

            let vendorNo = {
                vendors: [
                    {
                        vendorId: "21000000",
                        vendorName: "La Belle Perfumes",
                        location: "New York, USA"
                    },
                    {
                        vendorId: "21000001",
                        vendorName: "Fragrance Outlet",
                        location: "Los Angeles, USA"
                    },
                    {
                        vendorId: "21000002",
                        vendorName: "Perfume Direct",
                        location: "London, UK"
                    },
                    {
                        vendorId: "21000003",
                        vendorName: "Sephora",
                        location: "Paris, France"
                    },
                    {
                        vendorId: "21000004",
                        vendorName: "Nordstrom",
                        location: "Seattle, USA"
                    }
                ]
            };
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
            let batchValue = HelperFunction._valueHelpSelectedValue(oEvent,this,"mapping_batchValueHelpInput")
            HelperFunction.getOCDataWithBatchId(this,"getBatchOCValueHelp",JSON.stringify(batchValue)).then(oData => {
                if(oData.length===0){
                    sap.m.MessageToast.show("OC Data Not Found")
                    return
                }else{
                    console.log("data",oData)
                    let oModel = new sap.ui.model.json.JSONModel(oData);
                    this.getView().setModel(oModel,"batchDataModel")
                    console.log("model data",this.getView().getModel("batchDataModel").getData())
                }
            }).catch(error => {
                console.error("Error Fetching Data:", error);
            });
            console.log("batch value",batchValue)
        },

        onBatchValueHelpSearch : function(oEvent){
            HelperFunction._valueHelpLiveSearch(oEvent,"BatchNo")
        },
        onOCValueHelpSearch : function(oEvent){
            HelperFunction._valueHelpLiveSearch(oEvent,"orderConfirmationId")
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
                  let oModel = this.getView().getModel("displayOrNotModel")
                  let vModel = this.getView().getModel("vendorDataModel")
                  let vData = vModel.getData()
                  let batchValue = this.byId("mapping_batchValueHelpInput").getValue()
                  if(ocValue && batchValue){
                    this.getOcDataWithBatchIdAndOCID(ocValue,batchValue).then(oData=>{
                       console.log("get Data:",oData)
                       
                       if(oData[0].VendorId){
                            oModel.setProperty("/vendorIdDisplay",true)
                            oModel.setProperty("/vendorIdEdit",false)
                            oModel.setProperty("/submitBtnEnabled",false)
                            if(vData.vendors && Array.isArray(vData.vendors)){
                                let filterData = vData.vendors.find(item=>item.vendorId===oData[0].VendorId)
                                console.log("filterddata",filterData)
                                if(filterData){
                                    oData[0].location = filterData.location
                                }
                            }
                        }
                        let filterModel = new JSONModel(oData[0])
                      this.getView().setModel(filterModel,"filterOcModelData")
                      console.log("odata",this.getView().getModel("filterOcModelData").getData())
                    }).catch(error=>{
                       console.log("error",error)
                    })
                  }
                  else{
                    sap.m.MessageToast.show("Please Enter Both Fields")
            }
        },

        getOcDataWithBatchIdAndOCID : async function(ocParam,batchParam){
             let oModel = this.getOwnerComponent().getModel()
             let encodedBatchId = encodeURIComponent(batchParam);
            let encodedOcId = encodeURIComponent(ocParam); 
            let url = `/getBatchOcDealerMappingdata?BatchID='${encodedBatchId}'&OCID='${encodedOcId}'`;
            console.log(url)
            let oBindList = oModel.bindList(url);
            try {
                let oContext = await oBindList.requestContexts(0,Infinity)
                let oData = oContext.map(context=>context.getObject())
                return oData
            } catch (error) {
                sap.m.MessageToast.show(error)
            }
        },

        refreshModelMethod : function(){
            let filterOcDataModel = this.getView().getModel("filterOcModelData")
            if(filterOcDataModel){
                filterOcDataModel.setProperty("/",[])
                HelperFunction._clearInputValues(this,["mapping_vendorValueHelpInput","mapping_vendorNameInput"])
            }
        },

        onSubmitMappingData: async function () {
            let oModel = this.getOwnerComponent().getModel(); 
        
            let oBindList = oModel.bindList("/OuterContainer");
            let aFilter = new sap.ui.model.Filter({
                path: "OCID",
                operator: sap.ui.model.FilterOperator.EQ,
                value1: "00000001"
            });
        
            oBindList.filter(aFilter).requestContexts().then((aContexts) => {
                if (aContexts.length === 0) {
                    sap.m.MessageBox.error("No matching entity found for the given filter.");
                    return;
                }
        
                let oContext = aContexts[0];
                oContext.setProperty("VendorId", "21000000");
                oContext.setProperty("VendorName", "La Belle Perfumes");
                oContext.setProperty("status", "completed");
        
                oModel.submitBatch("updateGroup").then(
                    () => {
                        sap.m.MessageToast.show("Data updated successfully!");
                    },
                    (oError) => {
                        console.error("Error updating data:", oError);
                        sap.m.MessageBox.error("Error occurred: " + (oError.message || "Unknown error."));
                    }
                );
            }).catch((error) => {
                console.error("Error requesting contexts:", error);
                sap.m.MessageBox.error("Failed to retrieve data: " + error.message);
            });
        }
        
        
        
        
    });
  });