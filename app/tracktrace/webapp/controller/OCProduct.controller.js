
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "external/PDF"
], function (Controller, MessageToast,Fragment,JSONModel,PDF) {
    "use strict";
    let sEncodedBatchNo;
    return Controller.extend("tracktrace.controller.OCProduct", {
        onInit: function () {
          let oTable = this.byId('OCproduct_ProductTable');
          oTable._getSelectAllCheckbox().setVisible(false);
          
          const oMaterialDataModel = new sap.ui.model.json.JSONModel([]);
          this.getView().setModel(oMaterialDataModel, "materials");
          },

          onSelectionChange: function (oEvent) {
            let oTable = this.byId("OCproduct_ProductTable");
            let oSelectedItem = oEvent.getParameter("listItem");
            let bSelected = oEvent.getParameter("selected");
        
            let sICID = oSelectedItem.getBindingContext("materialDataModel").getProperty("ICID");
        
            oTable.getItems().forEach(oItem => {
                let oContext = oItem.getBindingContext("materialDataModel");
                if (oContext) {
                    let sICIDpack = oContext.getProperty("ICID");
        
                    if (sICIDpack === sICID) {
                        oTable.setSelectedItem(oItem, bSelected);
                    }
                }
            });
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
          const tableLayout = this.byId("OCproduct_BlockLayoutRow2");
      
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
      
          if (!sBatchNo || typeof sBatchNo !== "string") {
              throw new Error("Invalid parameter: 'sBatchNo' must be a non-empty string.");
          }
      
          const oModel = this.getOwnerComponent().getModel();
           sEncodedBatchNo = encodeURIComponent(sBatchNo); 
          const sPath = `/getBatchIDRelevantData(BatchNo='${sEncodedBatchNo}',filterNoEmptyICID=true)`; 
      
          const oBindList = oModel.bindList(sPath);
          const aBatchIdData = [];
      
          try {
              const aContexts = await oBindList.requestContexts();
      
              aContexts.forEach((oContext) => {
                  aBatchIdData.push(oContext.getObject());
              });
          } catch (error) {
              throw new Error(`Error fetching batch details: ${error.message}`);
          }
      
          return aBatchIdData;
      },

      onViewQRCodePress: function (oEvent) {
        let oLink = oEvent.getSource();
        let oContext = oLink.getBindingContext("materialDataModel");
        let oData = oContext.getObject();

   
        let OcQRCodeURL = oData.OCQRCodeURL;

        let oDialog = this.byId("OCproduct_qrCodeDialog");
        let oImage = this.byId("OCproduct_qrImage");
        oImage.setSrc(OcQRCodeURL);

        oDialog.open();
    },
    onCloseQRDialog: function () {
        this.byId("OCproduct_qrCodeDialog").close();
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
