sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("tracktrace.controller.DealerDashboard", {
        onInit() {
            const initialData = {
                showQuantityBox: false // Initial visibility of the quantity box
            };
            const model = new sap.ui.model.json.JSONModel(initialData);
            this.getView().setModel(model);
        },


        onCheckboxSelect: function (oEvent) {
            const selectedCheckbox = oEvent.getSource();
            const isSelected = selectedCheckbox.getSelected();
            const selectedCheckboxId = selectedCheckbox.getId();
            const model = this.getView().getModel(); // Assuming you're using a JSONModel
        
            if (selectedCheckboxId.includes("dealer_icCheckBox")) {
                this.byId("dealer_ocCheckBox").setSelected(false); // Deselect "OC"
                this.byId("dealer_icFieldsContainer").setVisible(isSelected); // Show or hide IC fields
                model.setProperty("/showQuantityBox", isSelected); // Show quantity box for "IC"
            }
        
            if (selectedCheckboxId.includes("dealer_ocCheckBox")) {
                this.byId("dealer_icCheckBox").setSelected(false); // Deselect "IC"
                this.byId("dealer_icFieldsContainer").setVisible(isSelected); // Always hide IC fields for "OC"
                model.setProperty("/showQuantityBox", false); // Hide quantity box for "OC"
            }
        },
        onIncreaseQuantity: function () {
            // Get the input control using the view's byId method
            var oQuantityInput = this.getView().byId("dealer_quantityInput");
            if (oQuantityInput) {
                // Get the current value, increment it, and update the input
                var iCurrentValue = parseInt(oQuantityInput.getValue(), 10) || 0;
                oQuantityInput.setValue(iCurrentValue + 1);
            } else {
                console.error("Quantity input control not found");
            }
        },
        onDecreaseQuantity: function () {
            // Get the input control using the view's byId method
            var oQuantityInput = this.getView().byId("dealer_quantityInput");
            if (oQuantityInput) {
                // Get the current value, decrement it (minimum value: 0), and update the input
                var iCurrentValue = parseInt(oQuantityInput.getValue(), 10) || 0;
                if (iCurrentValue > 0) {
                    oQuantityInput.setValue(iCurrentValue - 1);
                }
            } else {
                console.error("Quantity input control not found");
            }
        },
                
        
        
        // oncreateSalesOrderPress: function () {
        //     // Check if the fragment is already created
        //     if (!this._oSalesOrderDialog) {
        //         // Load the fragment
        //         this._oSalesOrderDialog = sap.ui.xmlfragment("app.home.fragments.SalesOrder", this);
        //         this.getView().addDependent(this._oSalesOrderDialog);
        //     }
        //     // Open the dialog
        //     this._oSalesOrderDialog.open();
        // },
        // onCheckboxSelect: function (oEvent) {
        //     // Get the selected checkbox ID
        //     var sSelectedCheckBoxId = oEvent.getSource().getId();
        //     var oICCheckBox = sap.ui.getCore().byId("icCheckBox");
        //     var oOCCheckBox = sap.ui.getCore().byId("ocCheckBox");
        //     var oDynamicContent = sap.ui.getCore().byId("dynamicContent");
        
        //     // Reset both checkboxes
        //     oICCheckBox.setSelected(false);
        //     oOCCheckBox.setSelected(false);
        
        //     // Set only the selected checkbox
        //     if (sSelectedCheckBoxId === oICCheckBox.getId()) {
        //         oICCheckBox.setSelected(true);
        //     } else if (sSelectedCheckBoxId === oOCCheckBox.getId()) {
        //         oOCCheckBox.setSelected(true);
        //     }
        
        //     // Show or clear dynamic content
        //     if (oEvent.getParameter("selected")) {
        //         oDynamicContent.setVisible(true);
        //         // Reset fields when a new checkbox is selected
        //         sap.ui.getCore().byId("quantityInput").setValue(0);
        //         sap.ui.getCore().byId("datePicker").setValue("");
        //         sap.ui.getCore().byId("retailerInput").setValue("");
        //     } else {
        //         oDynamicContent.setVisible(false);
        //     }
        // },
        
        // onIncreaseQuantity: function () {
        //     // Get the current value and increment it
        //     var oQuantityInput = sap.ui.getCore().byId("quantityInput");
        //     var iCurrentValue = parseInt(oQuantityInput.getValue(), 10) || 0;
        //     oQuantityInput.setValue(iCurrentValue + 1);
        // },
        
        // onDecreaseQuantity: function () {
        //     // Get the current value and decrement it (minimum value: 0)
        //     var oQuantityInput = sap.ui.getCore().byId("quantityInput");
        //     var iCurrentValue = parseInt(oQuantityInput.getValue(), 10) || 0;
        //     if (iCurrentValue > 0) {
        //         oQuantityInput.setValue(iCurrentValue - 1);
        //     }
        // },
        
        // onSubmitSalesOrder: function () {
        //     // Handle submission logic here
        //     var sQuantity = sap.ui.getCore().byId("quantityInput").getValue();
        //     var sDate = sap.ui.getCore().byId("datePicker").getDateValue();
        //     var sRetailer = sap.ui.getCore().byId("retailerInput").getValue();
        
        //     // Implement your logic with the collected data
        //     console.log("Quantity:", sQuantity);
        //     console.log("Date:", sDate);
        //     console.log("Retailer:", sRetailer);
        // },
        
        // onCancelSalesOrder: function () {
        //     // Close the dialog
        //     this._oSalesOrderDialog.close();
        // },
        


        onScanSuccess: function (oEvent) {

            // debugger
    
            if (oEvent.getParameter("cancelled")) {
    
              MessageToast.show("Scan cancelled", { duration: 1000 });
    
            } else {
    
              var scanResult = oEvent.getParameter("text");
    
              if (scanResult) {
    
                // Parse the scanned QR code data
    
                var scannedData = JSON.parse(scanResult);
    
                // Set the driverName and cleanerName to the input fields
    
    
                var oDriverInput = this.getView().byId("_IDGenInut5");
    
                var oCleanerInput = this.getView().byId("_IDGeInput6");
    
                var oVehicleData = this.getView().byId("vehicle_id");
    
                var CustumerCode = this.getView().byId("_IDGenInput13");
    
                var Status = this.getView().byId("vehicleDescription_id").setValue("Security Pending , Vehicle Master Missing");
    
                // var Material = this.getView().byId("_IDGenSelect1")
    
                // var MaterialValue = scannedData.material
    
                // var filterMaterial = getMatData.filter(function (data) {
    
                //   return data.MaterialType == MaterialValue;
    
                // });
    
                // var finalMaterial = filterMaterial[0].MaterialDefination
    
                // console.log("filterMaterial", filterMaterial)
    
    
    
                oDriverInput.setValue(scannedData.driverName || "");
    
                oCleanerInput.setValue(scannedData.cleanerName || "");
    
                oVehicleData.setValue(scannedData.assignTruckNo || "")
    
                CustumerCode.setValue(scannedData.shipToParty || "")
    
                // Material.setValue(finalMaterial || "")
    
              } else {
    
                MessageToast.show("No data found in scan", { duration: 1000 });
    
              }
    
              var cust = this.getView().byId("_IDGenInput13").mProperties.value
    
                console.log("cust", cust)
    
    
                var filter = customerData.filter(function (data) {
    
                  return data.Kunnr == cust
    
                });
    
                console.log("filter" , filter)
    
                ShipToName = filter[0].Name1
    
                Destination = filter[0].Ort01
    
            }
    
        }
    
     
    });
});