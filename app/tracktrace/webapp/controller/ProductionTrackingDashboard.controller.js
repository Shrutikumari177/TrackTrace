sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
  ], (BaseController,Filter,FilterOperator,Fragment,JSONModel) => {
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

        },


        onGetSelectValue : function(selectBoxId){
            let idData = {}
            selectBoxId.forEach(function(selectId){
                let sId = this.byId(selectId.id)
                let sItem = sId.getSelectedItem()
                idData[selectId.key] = sItem?sItem.getText():null
            },this)
            return idData;
        },

        _onGoButtonPress :async function(){
            debugger
            let selectValues =await this.onGetSelectValue([{id:"dashboard_ocSelectBox",key:"selectOcCode"},
                {id:"dashboard_batchIdSelectBox",key:"selectBatchCode"}])
            let ocCode = selectValues["selectOcCode"]
            let batchCode = selectValues["selectBatchCode"]
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
                "internalConfirmationId",
                "batchId"
            ]);
        },
        
        onSearchBoxItem: function (oEvent) {
            this.performTableSearch(oEvent, "detailsFragemnt_boxTable", [
                "sno",
                "batchId"
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
           return value.length
        },

        onImageClick: function (oEvent) {
            const oSource = oEvent.getSource();
            const oContext = oSource.getBindingContext("orderModel"); 
            if (!oContext) {
                sap.m.MessageToast.show("No data found for this image.");
                return;
            }
            const oData = oContext.getObject();
            if(oData){
                this._loadImageData(oData.orderConfirmationId)
            }
            console.log("Clicked Image Data:", oData);
            // sap.m.MessageToast.show(`Selected Order Confirmation: ${oData.orderConfirmationId}`);
        },  
        
        _loadImageData :  function(receivedId){
               let oModel = this.getView().getModel("orderModel")
               let detailsLayout = this.getView().byId("dashboard_ContainerDetailsLayout")
               let modelData = oModel.getData()
               console.log("model data",modelData)
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

        
        

        onIcRowSelect: function (oEvent) {
            const oView = this.getView(); 
            const oContext = oEvent.getSource().getBindingContext("fragmentModel");
            if (!oContext) {
                sap.m.MessageToast.show("No Data Found");
                return;
            }
            const rowData = oContext.getObject()?.boxes;   
            if (!rowData) {
                sap.m.MessageToast.show("No Data Found");
                return;
            }  
                const boxModel = new sap.ui.model.json.JSONModel();
                boxModel.setData({ boxes: rowData });
                this.getView().setModel(boxModel, "boxModelData");
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