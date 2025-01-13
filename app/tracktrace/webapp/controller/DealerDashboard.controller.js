sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("tracktrace.controller.DealerDashboard", {
        onInit() {
           
        },



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

                console.log("filter", filter)

                ShipToName = filter[0].Name1

                Destination = filter[0].Ort01

            }

        },

        onSelectContract: async function (oEvent) {
            try {
                var oSelectedItem = oEvent.getSource();
                var oBindingContext = oSelectedItem.getBindingContext();
        
                // Retrieve OCID from the selected item
                var sOCID = oBindingContext.getProperty("OCID");
                console.log("Selected OCID:", sOCID);
        
                // Get the model from the component
                let oModel = this.getOwnerComponent().getModel();
        
                // Build the path for the OData function
                let sPath = `/getProductionTrackingDashboardData(OCID='${sOCID}')`;
        
                // Use bindContext to call the OData function
                const oBindinggetCust = oModel.bindContext(sPath, null, {});
                const oData = await oBindinggetCust.requestObject();

                let allOCIDData = oData.value[0]
                
                var oNewModel = new sap.ui.model.json.JSONModel();

                // Set the fetched OData into the new model
                oNewModel.setData(allOCIDData);
                console.table("oNewModel" , oNewModel)
        
                // Set the new model to the view
                this.getView().setModel(oNewModel, "newModel");
        
                // Log the fetched data
                console.log("Fetched Data:", oData);
            } catch (oError) {
                console.error("Error fetching data:", oError);
            }
        }
        


    });
});