sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "tracktrace/utils/HelperFunction"
  ], (BaseController,Filter,FilterOperator,Fragment,JSONModel,HelperFunction) => {
    "use strict";
  
    return BaseController.extend("tracktrace.controller.ProductionTrackingDashboard", {

        onInit() {
            var oData = {
                orderConfirmations: [
                    {
                        orderConfirmationId: "OC001",
                        batchId : "B0001",
                        date: "2025-01-01",
                        customer: "C001",
                        status: "Completed",
                        internalConfirmations: [
                            {
                                internalConfirmationId: "IC001",
                                batchId: "B1001",
                                productOrder: "P1001",
                                mfgDate: "2024-11-01",
                                expiryDate: "2025-02-01",
                                boxes: [
                                    { sno: "0001", productionOrder: "PO001", batchId: "B001", mfgDate: "2024-10-01", expiryDate: "2025-02-01" },
                                    { sno: "0002", productionOrder: "PO001", batchId: "B001", mfgDate: "2024-10-09", expiryDate: "2025-02-01" }
                                ]
                            },
                            {
                                internalConfirmationId: "IC002",
                                batchId: "B1002",
                                productOrder: "P1002",
                                mfgDate: "2024-11-02",
                                expiryDate: "2025-02-01",
                                boxes: [
                                    { sno: "0003", productionOrder: "PO001", batchId: "B002", mfgDate: "2024-11-10", expiryDate: "2025-02-01" },
                                    { sno: "0004", productionOrder: "PO001", batchId: "B002", mfgDate: "2024-11-10", expiryDate: "2025-02-01" }
                                ]
                            }
                        ]
                    },
                    {
                        orderConfirmationId: "OC002",
                        batchId: "B1002",
                        date: "2025-01-02",
                        customer: "C002",
                        status: "In Progress",
                        internalConfirmations: [
                            {
                                internalConfirmationId: "IC003",
                                batchId: "B2001",
                                productOrder: "P2001",
                                mfgDate: "2024-12-01",
                                expiryDate: "2025-03-01",
                                boxes: [
                                    { sno: "0005", productionOrder: "PO002", batchId: "B003", mfgDate: "2024-12-01", expiryDate: "2025-03-01" },
                                    { sno: "0006", productionOrder: "PO002", batchId: "B003", mfgDate: "2024-12-05", expiryDate: "2025-03-01" }
                                ]
                            }
                        ]
                    },
                    {
                        orderConfirmationId: "OC003",
                        batchId: "B1003",
                        date: "2025-01-03",
                        customer: "C003",
                        status: "Pending",
                        internalConfirmations: [
                            {
                                internalConfirmationId: "IC004",
                                batchId: "B3001",
                                productOrder: "P3001",
                                mfgDate: "2024-12-10",
                                expiryDate: "2025-04-01",
                                boxes: [
                                    { sno: "0007", productionOrder: "PO003", batchId: "B004", mfgDate: "2024-12-15", expiryDate: "2025-04-01" },
                                    { sno: "0008", productionOrder: "PO003", batchId: "B004", mfgDate: "2024-12-20", expiryDate: "2025-04-01" }
                                ]
                            }
                        ]
                    }
                ]
            };

            var oModel = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel, "orderDataModel");
            var oModel2 = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel2, "ocContainerModel");

        },

        _onDashboardBatchValueHelp: function(){
            HelperFunction._openValueHelpDialog(this,"_dashboardBatchIdDataFragment","tracktrace.fragments.batchCodeValueHelp")
        },
        _onDashboardOCValueHelp: function(){
            HelperFunction._openValueHelpDialog(this,"_dashboardOCCodeFragment","tracktrace.fragments.ocCodeValueHelp")
        },
        onOCValueConfirmItem : function(oEvent){
            HelperFunction._valueHelpSelectedValue(oEvent,this,"productionDashboard_ocID")
        },
        onBatchValueConfirmItem : function(oEvent){
           let batchValue =  HelperFunction._valueHelpSelectedValue(oEvent,this,"productionDashboard_batchId")
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
        _onGoButtonPress :async function(){
            let ocValue = this.byId("productionDashboard_ocID").getValue()
            let batchValue = this.byId("productionDashboard_batchId").getValue()
            let shape_layout = this.byId("dashboard_shapeLayout")
            let details_layout = this.byId("dashboard_ContainerDetailsLayout")
            if(ocValue && batchValue){
                this.getOcDataWithBatchIdAndOCID(ocValue,batchValue).then(oData=>{                
                  if(oData.length === 0){
                    sap.m.MessageToast.show("Data not Found")
                    return
                  }
                  else{
                    let filterModel = new JSONModel(oData)
                    this.getView().setModel(filterModel,"orderModel")
                    shape_layout?shape_layout.setVisible(true):console.warn("Layout not Found");
                  }
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
           let url = `/getProductionTrackingDashboardData?OCID='${encodedOcId}'`;
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



        onGoButtonPress :async function(){
            let ocCode = this.byId("productionDashboard_ocID").getValue()
            let batchCode = this.byId("productionDashboard_batchId").getValue()
            let shape_layout = this.byId("dashboard_shapeLayout")
            let details_layout = this.byId("dashboard_ContainerDetailsLayout")
            let readModel = this.getView().getModel("orderDataModel")
            let modelData = readModel.getData()
            if (modelData.orderConfirmations && Array.isArray(modelData.orderConfirmations)) {
                let filterData = modelData.orderConfirmations.find(item => item.orderConfirmationId === ocCode  && item.batchId===batchCode);
                if(!filterData){
                    sap.m.MessageToast.show("Data not Found.")
                    shape_layout?shape_layout.setVisible(false):console.warn("Layout not Found");
                    details_layout?details_layout.setVisible(false):console.warn("Details Layout not Found");
                    return
                }
                let detailModel = new JSONModel()
                detailModel.setData({orderConfirmations:[filterData]})
                this.getView().setModel(detailModel,"orderModel")
                shape_layout?shape_layout.setVisible(true):console.warn("Layout not Found");
            } else {
                console.error("Order confirmations data not found.");
            }
        },


        onSearchOCItem: function (oEvent) {
            this.performTableSearch(oEvent, "dashboardOCproduct_ProductTable", [
                "ICID",
                "BatchID"
            ]);
        },
        
        onSearchBoxItem: function (oEvent) {
            this.performTableSearch(oEvent, "detailsFragemnt_boxTable", [
                "SerialNo",
                "BatchID"
            ]);
        },        

        performTableSearch: function (oEvent, tableId, filterFields) {
            const sValue = oEvent.getParameter("query") || oEvent.getParameter("newValue");
            const oTable = this.getView().byId(tableId);
            if (!oTable) {
                console.error("Table not found");
                return;
            }
            const aFilters = filterFields.map((field) =>
                new sap.ui.model.Filter(field, sap.ui.model.FilterOperator.Contains, sValue)
            );
            const oFilter = new sap.ui.model.Filter({
                filters: aFilters,
                and: false
            });
            const oBinding = oTable.getBinding("items");
            if (!oBinding) {
                console.error("Table binding not found");
                return;
            }
            oBinding.filter(oFilter);
        },

        countFormatter : function(value){
           return value ? value.length : " "
        },

        onImageClick: function (oEvent) {
            const oView = this.getView();
            const oSource = oEvent.getSource();
            const oContext = oSource.getBindingContext("orderModel");        
            if (!oContext) {
                return sap.m.MessageToast.show("No data found for this image.");
            }
            const oData = oContext.getObject();
            if (oData) {
                oData.ICs?.forEach((ic) => {
                    Object.assign(ic, {
                        ManufactureDt: oData.ManufactureDt || "",
                        ExpiryDt: oData.ExpiryDt || "",
                        ProductionOrder: oData.ProductionOrder || "",
                        BatchID: oData.BatchID || "",
                    });
                });
        
                const detailModel = new sap.ui.model.json.JSONModel(oData);
                oView.setModel(detailModel, "fragmentModel");
        
                const detailsLayout = oView.byId("dashboard_ContainerDetailsLayout");
                if (detailsLayout) {
                    detailsLayout.setVisible(true);
                }
            }
            console.log("Clicked Image Data:", oData);
        },
        

        _loadImageData :  function(receivedId){
               let detailsLayout = this.getView().byId("dashboard_ContainerDetailsLayout")
               if (modelData.orderConfirmations && Array.isArray(modelData.orderConfirmations)) {
                let filterData = modelData.orderConfirmations.find(item => item.orderConfirmationId === receivedId);
                let detailModel = new JSONModel()
                detailModel.setData(filterData)
                this.getView().setModel(detailModel,"fragmentModel")
                detailsLayout.setVisible(true)
            } else {
                console.error("Order confirmations data not found.");
            }
        },

        _onOCQrCodeLink: function(oEvent){
            var oModel = this.getView().getModel("fragmentModel");
            var oData = oModel.getData();
            let BoxQRCodeURL = oData.OCQRCodeURL;
            let oDialog = this.byId("dashboarDeatislDetailQrDialog");
            let oImage = this.byId("dashboardDetailsqrImage");
            oImage.setSrc(BoxQRCodeURL);
            oDialog.open();
        },

        onDashboardPrintQR: function () {
            var oImage = this.byId("dashboardDetailsqrImage");
            var sImageSrc = oImage.getSrc();
            if (sImageSrc) {
                var oImageElement = new Image();
                oImageElement.onload = function () {
                    console.log("Image loaded successfully. Proceeding to print...");
                    var oWindow = window.open("", "_blank");
                    oWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
                    oWindow.document.write('<img src="' + sImageSrc + '" style="width:200px;height:200px;"/>');
                    oWindow.document.write('</body></html>');
                    oWindow.document.close();
                    setTimeout(() => {
                        oWindow.print();
                        oWindow.close(); 
                    }, 500); 
                };
                oImageElement.onerror = function () {
                    console.error("Failed to load the QR code image from URL:", sImageSrc);
                    sap.m.MessageToast.show("Failed to load the QR code image.");
                };
                oImageElement.src = sImageSrc;
            } else {
                console.warn("QR Code source is empty or undefined.");
                sap.m.MessageToast.show("QR Code is not available for printing.");
            }
        },

        onCloseQRDialog: function () {
            this.byId("dashboarDeatislDetailQrDialog").close();
        },

        onDashboardBoxQrCode: function(oEvent){
            let oSource = oEvent.getSource()
            let oBinding = oSource.getBindingContext("boxModelData")
            let oData = oBinding.getObject()
             let BoxQRCodeURL = oData.BoxQRCodeURL;
            let oDialog = this.byId("dashboarDeatislDetailQrDialog");
            let oImage = this.byId("dashboardDetailsqrImage");
            oImage.setSrc(BoxQRCodeURL);
            oDialog.open();
        },

        onDashboardICQrCode: function(oEvent){
            let oSource = oEvent.getSource()
            let oBinding = oSource.getBindingContext("fragmentModel")
            let oData = oBinding.getObject()
             let BoxQRCodeURL = oData.ICQRCodeURL;
            let oDialog = this.byId("dashboarDeatislDetailQrDialog");
            let oImage = this.byId("dashboardDetailsqrImage");
            oImage.setSrc(BoxQRCodeURL);
            oDialog.open();
        },     

        onIcRowSelect: function (oEvent) {
            const oView = this.getView(); 
            const oContext = oEvent.getSource().getBindingContext("fragmentModel");            
            if (!oContext) {
                return sap.m.MessageToast.show("No Data Found");
            }
            const icData = oContext.getObject();
            const rowData = icData?.Boxes || [];
            
            if (!Array.isArray(rowData) || rowData.length === 0) {
                return sap.m.MessageToast.show("No Data Found");
            }
        
            rowData.forEach((box) => {
                Object.assign(box, {
                    ManufactureDt: icData.ManufactureDt || "",
                    ExpiryDt: icData.ExpiryDt || "",
                    ProductionOrder: icData.ProductionOrder || "",
                    BatchID: icData.BatchID || "",
                });
            });
        
            const boxModel = new sap.ui.model.json.JSONModel({ boxes: rowData });
            oView.setModel(boxModel, "boxModelData");
            console.log("my order Data:", boxModel.getData());
        
            const oIconTabBar = oView.byId("idIconTabBar");
            if (oIconTabBar) {
                const oBoxDetailsTab = oView.byId("DialogBoxDetails");
                if (oBoxDetailsTab) {
                    oBoxDetailsTab.setEnabled(true); 
                }
                oIconTabBar.setSelectedKey("boxKey");
            } else {
                console.error("IconTabBar not found.");
            }
        },
        
    });
  });