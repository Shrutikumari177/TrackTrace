
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";
    let Dealer;
    let  userEmail;

    return Controller.extend("tracktrace.controller.DealerDashboard", {
        onInit: async function () {
            await  this.getLoggedInUserInfo(); 
            Dealer = await  this.checkforValidUser();
            this.getDealerOc(Dealer);
            
            
        },
        getLoggedInUserInfo : async function(){
            try {
              let User = await sap.ushell.Container.getService("UserInfo");
              let userID = User.getId();
              userEmail = User.getEmail();
              let userFullName = User.getFullName();
              console.log("userEmail", userEmail);
              console.log("userFullName", userFullName);
              console.log("userID", userID);
            } catch (error) {
              userEmail ="shruti.kumari@ingenxtec.com";
              console.log("hiii",userEmail);
            }
          },
        checkforValidUser: async function() {
            let loggedinUser = userEmail; 
        
            if (loggedinUser === "shruti.kumari@ingenxtec.com") {
                let DealerFound = "21000000";
              
                return DealerFound;
            } else if (loggedinUser === "ashwani.sharma@ingenxtec.com") {
                let DealerFound = "21000001";
              
                return DealerFound;
            } else {
                console.log("No vendor found for the logged-in user");
                return null; 
            }
        },
        getDealerOc: async function() {
            const oModel = this.getOwnerComponent().getModel();
            const oBindList = oModel.bindList(`/getDealerDashOCValueHelp(VendorId='${Dealer}')`);
            const aBatchIdData = [];
        
            try {
                const aContexts = await oBindList.requestContexts();
        
                aContexts.forEach((oContext) => {
                    aBatchIdData.push(oContext.getObject());
                });
            } catch (error) {
                throw new Error("Error fetching batch details: " + error.message);
            }
        
            console.log("Fetched Data:", aBatchIdData);
        
            const oDataModel = new sap.ui.model.json.JSONModel();
            oDataModel.setData({ OCData: aBatchIdData });
        
            this.getOwnerComponent().setModel(oDataModel, "OCModel");
        
            return aBatchIdData;
        },
        onSelectContract: async function (oEvent) {
            try {
                var oSelectedItem = oEvent.getSource();
                var oBindingContext = oSelectedItem.getBindingContext("OCModel"); // Ensure you are passing the correct model name
                
                if (!oBindingContext) {
                    console.error("Binding context is undefined");
                    return;
                }
                
                var sOCID = oBindingContext.getProperty("OCID");
                console.log("Selected OCID:", sOCID);
        
                let oModel = this.getOwnerComponent().getModel();
                let sPath = `/getProductionTrackingDashboardData(OCID='${sOCID}')`;
        
                const oBindinggetCust = oModel.bindContext(sPath, null, {});
                const oData = await oBindinggetCust.requestObject();
        
                let allOCIDData = oData.value[0];
                let pOrder = allOCIDData.ProductionOrder;
                let mfgDate = allOCIDData.ManufactureDt;
                let expDate = allOCIDData.ExpiryDt;
                let BatchID = allOCIDData.BatchID;
        
                console.table("oNewModel", allOCIDData);
        
                const result = allOCIDData.ICs.flatMap(ic => {
                    return ic.Boxes.map(box => ({
                        ICID: ic.ICID,
                        ICQRCode: ic.ICQRCode,
                        ICQRCodeUrl: ic.ICQRCodeURL,
                        BoxSerialNo: box.SerialNo,
                        BoxQRCode: box.BoxQRCode,
                        BoxQRCodeUrl: box.BoxQRCodeURL,
                        pOrder,
                        mfgDate,
                        expDate,
                        BatchID,
                    }));
                });
        
                var oNewModel1 = new sap.ui.model.json.JSONModel();
                oNewModel1.setData(result);
                this.getView().setModel(oNewModel1, "newArrayModel");
        
                var oNewModel = new sap.ui.model.json.JSONModel();
                oNewModel.setData(allOCIDData);
                this.getView().setModel(oNewModel, "newModel");
        
               
            } catch (oError) {
                console.error("Error fetching data:", oError);
            }
        },
        
        
         


        onScanSuccess: function (oEvent) {

            

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


        onSelectContract1: async function (oEvent) {
            try {
                var oSelectedItem = oEvent.getSource();
                var oBindingContext = oSelectedItem.getBindingContext();
        
                
                var sOCID = oBindingContext.getProperty("OCID");
                console.log("Selected OCID:", sOCID);
        
                let oModel = this.getOwnerComponent().getModel();
        
                let sPath = `/getProductionTrackingDashboardData(OCID='${sOCID}')`;
        
                const oBindinggetCust = oModel.bindContext(sPath, null, {});
                const oData = await oBindinggetCust.requestObject();

                let allOCIDData = oData.value[0]
                let pOrder = allOCIDData.ProductionOrder
                let mfgDate = allOCIDData.ManufactureDt
                let expDate = allOCIDData.ExpiryDt
                let BatchID = allOCIDData.BatchID
                
                console.table("oNewModel" , allOCIDData)
                const result = allOCIDData.ICs.flatMap(ic => {
                    return ic.Boxes.map(box => ({
                        ICID: ic.ICID,
                        ICQRCode: ic.ICQRCode,
                        ICQRCodeUrl: ic.ICQRCodeURL,
                        BoxSerialNo: box.SerialNo,
                        BoxQRCode: box.BoxQRCode,
                        BoxQRCodeUrl: box.BoxQRCodeURL,
                        pOrder,
                        mfgDate,
                        expDate,
                        BatchID,
                    }));
                });
                
                console.log("result",result);
                var oNewModel1 = new sap.ui.model.json.JSONModel();
                oNewModel1.setData(result);        
                this.getView().setModel(oNewModel1, "newArrayModel");
        
                var oNewModel = new sap.ui.model.json.JSONModel();
                oNewModel.setData(allOCIDData);        
                this.getView().setModel(oNewModel, "newModel");
        
                // Log the fetched data
                console.log("Fetched Data:", oData);
            } catch (oError) {
                console.error("Error fetching data:", oError);
            }
        },

        onDealerDashboardICQrCode: function(oEvent){
            let oSource = oEvent.getSource()
            let oBinding = oSource.getBindingContext("newArrayModel")
            let oData = oBinding.getObject()
             let BoxQRCodeURL = oData.ICQRCodeUrl;
            let oDialog = this.byId("dealerDashboardDetailQrDialog");
            let oImage = this.byId("dealerDashboardDetailsqrImage");
            oImage.setSrc(BoxQRCodeURL);
            oDialog.open();
        }, 
        onCloseQRDialog: function () {
            this.byId("dealerDashboardDetailQrDialog").close();
        }, 
        onDealerDashboardPrintQR: function () {
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
        onDealerDashboardBoxQrCode: function(oEvent){
            let oSource = oEvent.getSource()
            let oBinding = oSource.getBindingContext("newArrayModel")
            let oData = oBinding.getObject()
             let BoxQRCodeURL = oData.BoxQRCodeUrl;
            let oDialog = this.byId("dealerDashboardDetailQrDialog");
            let oImage = this.byId("dealerDashboardDetailsqrImage");
            oImage.setSrc(BoxQRCodeURL);
            oDialog.open();
        },
        


    });
});