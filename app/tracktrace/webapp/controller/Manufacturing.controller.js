sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, MessageToast,Fragment,JSONModel,MessageBox) {
    "use strict";
    return Controller.extend("tracktrace.controller.Manufacturing", {
        onInit: async function () {
            const oMaterialDataModel = new sap.ui.model.json.JSONModel([]);
            this.getView().setModel(oMaterialDataModel, "materials");

           
            var oTable = this.byId('boxProduct_productTypeTable');
            oTable._getSelectAllCheckbox().setVisible(false);
        },
      
        onSelectionChange: function (oEvent) {
            var oTable = this.byId("boxProduct_productTypeTable");
            var oSelectedItem = oEvent.getParameter("listItem");
            var oContext = oSelectedItem.getBindingContext("materialDataModel");
        
            if (oContext) {
                var bHasQRCode = oContext.getProperty("BoxQRCode");
        
                // Prevent selection of rows that have a BoxQRCode
                if (bHasQRCode) {
                    oSelectedItem.setSelected(false); // Deselect the item
                    return;
                }
        
                // Handle deselection of the currently selected row
                if (oSelectedItem.getSelected()) {
                    // Keep the item selected
                    oTable.removeSelections(true); // Clear all selections
                    oSelectedItem.setSelected(true); // Select only the current item
                } else {
                    oTable.removeSelections(true); // Clear all selections if clicked again
                }
            }
        },
        
        onValueHelpBatch: function(oEvent) {
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
        
                try {
                    const aFilteredData = await this._fetchBatchDetails(sSelectedBatchNo);
        
                    const dataModel = new sap.ui.model.json.JSONModel({ materials: aFilteredData });
                    this.getView().setModel(dataModel, "materialDataModel");
        
                    tableLayout.setVisible(true);
                } catch (error) {
                    sap.m.MessageToast.show(error.message);
                    this._oInputField.setValue("");
                    tableLayout.setVisible(false);
                }
            }
        
            const oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([]);
        },
        
        _fetchBatchDetails: async function (sBatchNo) {
            const oModel = this.getOwnerComponent().getModel();
            const oBindList = oModel.bindList(`/getBatchIDRelevantData(BatchNo='${sBatchNo}')`);
            const aBatchIdData = [];
        
            try {
                const aContexts = await oBindList.requestContexts();
        
                aContexts.forEach((oContext) => {
                    aBatchIdData.push(oContext.getObject());
                });
            } catch (error) {
                throw new Error("Error fetching batch details: " + error.message);
            }
        
            return aBatchIdData;
        },
        
        onGenerateQRPress: function(oEvent) {
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
        
                this._createMaterialBox(oPayload, selectedItem);  // Pass the selected item to update it
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
        
                // Perform the create operation and wait for the result
                const oContext = await oBindList.create(newEntry);
                await oContext.created();  // Ensure the entity creation is completed
        
                // Get the created data
                const oData = oContext.getObject();
                console.log("Created Data:", oData);
                console.log("BoxQRCode:", oData.BoxQRCode);
                console.log("BoxQRCodeURL:", oData.BoxQRCodeURL);
                console.log("BatchID:", oData.BatchID);
        
                // Update the selected row with the new QR code and URL
                const materialData = selectedItem.getBindingContext("materialDataModel").getObject();
                materialData.BoxQRCode = oData.BoxQRCode;
                materialData.BoxQRCodeURL = oData.BoxQRCodeURL;
        
                // Refresh the model to reflect the changes
                oModel.refresh(true);
                let oTable = this.byId("boxProduct_productTypeTable");
                oTable.removeSelections();

        
                sap.m.MessageToast.show("QR Code generated successfully!");
        
            } catch (oError) {
            
                console.error("Error creating QR Code:", oError);
                MessageBox.error("Error generating QR Code. Please try again.");
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
