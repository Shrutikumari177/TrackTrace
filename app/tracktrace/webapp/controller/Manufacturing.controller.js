sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, MessageToast, Fragment, JSONModel, MessageBox) {
    "use strict";
    let formattedDate;
    return Controller.extend("tracktrace.controller.Manufacturing", {
        onInit: async function () {
            const oMaterialDataModel = new sap.ui.model.json.JSONModel([]);
            this.getView().setModel(oMaterialDataModel, "materials");

            this._oBusyDialog = new sap.m.BusyDialog({
                title: "Generating QR Code",
                text: "Please wait..."
            });

            var oTable = this.byId('boxProduct_productTypeTable');
            oTable._getSelectAllCheckbox().setVisible(false);
        },

        onSelectionChange: function (oEvent) {
            var oTable = this.byId("boxProduct_productTypeTable");
            var oSelectedItem = oEvent.getParameter("listItem");
            var oContext = oSelectedItem.getBindingContext("materialDataModel");

            if (oContext) {
                var bHasQRCode = oContext.getProperty("BoxQRCode");

                if (bHasQRCode) {
                    oSelectedItem.setSelected(false); // Deselect the item
                    return;
                }

                if (oSelectedItem.getSelected()) {
                    oTable.removeSelections(true); // Clear all selections
                    oSelectedItem.setSelected(true); // Select only the current item
                } else {
                    oTable.removeSelections(true); // Clear all selections if clicked again
                }
            }
        },

        onValueHelpBatch: function (oEvent) {
            const oView = this.getView();
            this._oInputField = oEvent.getSource();
            if (!this.requestNoFragment) {
                Fragment.load({
                    id: oView.getId(),
                    name: "tracktrace.fragments.product",
                    controller: this
                }).then(oDialog => {
                    this.requestNoFragment = oDialog;
                    oView.addDependent(this.requestNoFragment);
                    this.requestNoFragment.open();
                });
            } else {
                this.requestNoFragment.open();
            }
        },
        onBatchIdValueHelpSearch: function (oEvent) {
            var searchedValue = oEvent.getParameter("value");
            var oFilter = new sap.ui.model.Filter("BatchNo", sap.ui.model.FilterOperator.Contains, searchedValue);
            var oBinding = oEvent.getSource().getBinding("items");
            var oSelectDialog = oEvent.getSource();


            oBinding.filter([oFilter]);

            oBinding.attachEventOnce("dataReceived", function () {
                var aItems = oBinding.getCurrentContexts();

                if (aItems.length === 0) {
                    oSelectDialog.setNoDataText("No data found");
                } else {
                    oSelectDialog.setNoDataText("Loading...");
                }
            });
        },

        onValueHelpBatchIdSelection: async function (oEvent) {
        
             const oSelectedItem = oEvent.getParameter("selectedItem");
            const tableLayout = this.byId("boxProduct_BlockLayoutRow2");

            if (oSelectedItem) {
                const sSelectedBatchNo = oSelectedItem.getTitle();
                this._oInputField.setValue(sSelectedBatchNo);

             }

            const oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([]);
        },
      
        _onGoButtonPress: async function () {
            const sBatchId = this.byId("boxProduct_batchId").getValue(); // Get Batch ID input value
            const sProductionId = this.byId("productionDashbard_ocID").getValue(); // Get Production ID input value
            const oDatePicker = this.byId("DatePicker"); // Get DatePicker input
            const oDateValue = oDatePicker.getDateValue(); // Get Date object
            let formattedDate = null;
        
            if (oDateValue) {
                const year = oDateValue.getFullYear();
                const month = String(oDateValue.getMonth() + 1).padStart(2, "0"); // Months are 0-based
                const day = String(oDateValue.getDate()).padStart(2, "0");
                formattedDate = `${year}-${month}-${day}`;
            }
        
            // Validate at least one filter is provided
            if (!sBatchId && !sProductionId && !formattedDate) {
                sap.m.MessageToast.show("Please enter at least one filter.");
                return;
            }
        
            const tableLayout = this.byId("boxProduct_BlockLayoutRow2");
        
            try {
                // Fetch filtered data based on inputs
                const aFilteredData = await this._fetchBatchDetails(sBatchId, formattedDate, sProductionId);
        
                if (aFilteredData && aFilteredData.length > 0) {
                    // If data is found, bind it to the model and show the table
                    const dataModel = new sap.ui.model.json.JSONModel({ materials: aFilteredData });
                    this.getView().setModel(dataModel, "materialDataModel");
                    tableLayout.setVisible(true);
                } else {
                    // If no data is found, hide the table and show a message
                    tableLayout.setVisible(false);
                    sap.m.MessageToast.show("No data found for the selected filters.");
                }
            } catch (error) {
                // Handle errors gracefully
                tableLayout.setVisible(false);
                sap.m.MessageToast.show("Error fetching data: " + error.message);
            }
        },
        
      
        _fetchBatchDetails: async function (sBatchNo, sMfg, sProd) {
            const oModel = this.getOwnerComponent().getModel();
            let sPath = "/getBatchIDRelevantData";
        
            let sFilter = "";
        
            if (sBatchNo && sMfg && sProd) {
                sFilter = `(BatchNo='${sBatchNo}',ManufactureDt='${sMfg}',ProductionOrder='${sProd}')`;
            } else if (sBatchNo && sMfg) {
                sFilter = `(BatchNo='${sBatchNo}',ManufactureDt='${sMfg}')`;
            } else if (sBatchNo && sProd) {
                sFilter = `(BatchNo='${sBatchNo}',ProductionOrder='${sProd}')`;
            } else if (sMfg && sProd) {
                sFilter = `(ManufactureDt='${sMfg}',ProductionOrder='${sProd}')`;
            } else if (sBatchNo) {
                sFilter = `(BatchNo='${sBatchNo}')`;
            } else if (sMfg) {
                sFilter = `(ManufactureDt='${sMfg}')`;
            } else if (sProd) {
                sFilter = `(ProductionOrder='${sProd}')`;
            }
        
           
            sPath += sFilter;
        
            const oBindList = oModel.bindList(sPath);
        
            const aBatchIdData = [];
        
            try {
                const aContexts = await oBindList.requestContexts();
        
                aContexts.forEach((oContext) => {
                    aBatchIdData.push(oContext.getObject());
                });
            } catch (error) {
                throw new Error(error.message);
            }
        
            return aBatchIdData;
        },
        
      


        onGenerateQRPress: function (oEvent) {
            const oTable = this.byId("boxProduct_productTypeTable");
            const selectedItem = oTable.getSelectedItem();

            if (selectedItem) {
                const oModel = this.getView().getModel("materialDataModel");
                const materialData = selectedItem.getBindingContext("materialDataModel").getObject();

                const oPayload = {
                    SerialNo: materialData.SerialNo,
                    BatchID: materialData.BatchNo
                };

                console.log("Payload to backend: ", oPayload);

                this._oBusyDialog.open();

                this._createMaterialBox(oPayload, selectedItem);
            } else {
                sap.m.MessageToast.show("Please select the row to generate QR.");
            }
        },

        _createMaterialBox: async function (oPayload, selectedItem) {
            try {
                const oModel = this.getView().getModel("materialDataModel");
                const oBindList = this.getView().getModel().bindList("/MaterialBox");

                const newEntry = {
                    SerialNo: oPayload.SerialNo,
                    BatchID: oPayload.BatchID
                };

                const oContext = await oBindList.create(newEntry);
                await oContext.created();

                const oData = oContext.getObject();

                const materialData = selectedItem.getBindingContext("materialDataModel").getObject();
                materialData.BoxQRCode = oData.BoxQRCode;
                materialData.BoxQRCodeURL = oData.BoxQRCodeURL;

                oModel.refresh(true);

                const oTable = this.byId("boxProduct_productTypeTable");
                oTable.removeSelections();
                this._oBusyDialog.close();

            } catch (oError) {
                console.error("Error creating QR Code:", oError);
                this._oBusyDialog.close();
                sap.m.MessageBox.error("Error generating QR Code. Please try again.");
            }
        },




        onViewQRCodePress: function (oEvent) {
            let oLink = oEvent.getSource();
            let oContext = oLink.getBindingContext("materialDataModel");
            let oData = oContext.getObject();


            let BoxQRCodeURL = oData.BoxQRCodeURL;

            let oDialog = this.byId("qrDialog");
            let oImage = this.byId("qrImage");
            oImage.setSrc(BoxQRCodeURL);

            oDialog.open();
        },
        onCloseQRDialog: function () {
            this.byId("qrDialog").close();
        },
        onPrintQR: function () {
            var oImage = this.byId("qrImage");
            var sImageSrc = oImage.getSrc();

            console.log("QR Image Source:", sImageSrc);

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

















    });
});
