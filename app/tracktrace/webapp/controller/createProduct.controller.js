sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
], function (Controller, MessageBox, MessageToast, Fragment, JSONModel) {
    "use strict";

    return Controller.extend("tracktrace.controller.createProduct", {
        onInit: function () {
            // this.oModel = this.getView().getModel();
        },

        onMaterialValuehelpClick: function (oEvent) {
            this._oInputField = oEvent.getSource().getBindingContext();
            
            // Check if the dialog is already created
            if (!this._oMaterialDialog) {
                this._oMaterialDialog = sap.ui.xmlfragment("tracktrace.fragments.material", this);
                this.getView().addDependent(this._oMaterialDialog);
            }
            
            // Show busy indicator
            sap.ui.core.BusyIndicator.show(0); // Delay set to 0 for immediate visibility
            
            // Fetch data from OData V4 service using list binding
            const oODataModel = this.getView().getModel(); // Assuming the default model is OData V4
            const oBinding = oODataModel.bindList("/ztrack_material");
            
            // Trigger data loading
            oBinding.requestContexts().then((aContexts) => {
                const aMaterials = aContexts.map((oContext) => oContext.getObject());
                const oMaterialModel = new sap.ui.model.json.JSONModel({ value: aMaterials });
                this.getView().setModel(oMaterialModel, "materialModel");
                
                this._oMaterialDialog.open();
            }).catch(() => {
                sap.m.MessageBox.error("Failed to fetch material data.");
            }).finally(() => {
                // Hide busy indicator
                sap.ui.core.BusyIndicator.hide();
            });
        },
        
        

        onMaterialFilterSearch: function (oEvent) {
            // Get the search query
            var sQuery = oEvent.getParameter("value");
            // Create a filter for material name
            var oFilter = new sap.ui.model.Filter("materialName", sap.ui.model.FilterOperator.Contains, sQuery);
            // Apply the filter
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },
        
        onMaterialValueHelpClose: function (oEvent) {
            // Check if an item was selected
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                // Retrieve the selected material name
                var sSelectedMaterial = oSelectedItem.getTitle();
                // Set the value in the input field
                this.getView().byId("materialInput_createProduct").setValue(sSelectedMaterial);
                this.loadContractData(sSelectedMaterial);
            }
            // Clear filters after selection or cancel
            oEvent.getSource().getBinding("items").filter([]);
        },


        loadContractData: function (sSelectedMaterial) {
            let contractModel = this.getOwnerComponent().getModel();
        
            // Bind the context to /A_ProductionOrder path
            let contractBindlist = contractModel.bindList("/A_ProductionOrder");
            console.log(contractBindlist);
            
            // Fetch the contexts (data entries) for the list
            let contexts = contractBindlist.getContexts();
        
            // If contexts are available, iterate over and filter the data
            if (contexts) {
                contexts.forEach(function (context) {
                    // Access the object using context.getObject()
                    let contractData = context.getObject();
        
                    // Ensure the contractData exists and filter by MaterialName and selected material
                    if (contractData && contractData.MaterialName !== "Final Fuel" && contractData.Material === sSelectedMaterial) {
                        console.log("Filtered Data:", contractData);
                    }
                });
            } else {
                console.error("No contexts available in the model.");
            }
        },
        
        
        
        
        

        onProductionPlantValueHelp: function () {
            // Lazy load the SelectDialog fragment
            if (!this._oProductionPlantDialog) {
                this._oProductionPlantDialog = sap.ui.xmlfragment("tracktrace.fragments.productionPlant", this);
                this.getView().addDependent(this._oProductionPlantDialog);
            }
            // Open the dialog
            this._oProductionPlantDialog.open();
        },
        
        onproductionplantFilterSearch: function (oEvent) {
            // Get the search query
            var sQuery = oEvent.getParameter("value");
            // Create a filter for the "productionPlant" property
            var oFilter = new sap.ui.model.Filter("productionPlant", sap.ui.model.FilterOperator.Contains, sQuery);
            // Apply the filter to the items binding
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },
        
        onproductionplantValueHelpClose: function (oEvent) {
            // Check if an item was selected
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                // Retrieve the selected production plant value
                var sSelectedProductionPlant = oSelectedItem.getTitle();
                // Set the value in the input field
                this.getView().byId("productionPlantInput_createProduct").setValue(sSelectedProductionPlant);
            }
            // Clear filters after selection or cancel
            oEvent.getSource().getBinding("items").filter([]);
        },
        
        
        
        onWorkCenterValueHelp: function () {
            // Lazy load the SelectDialog fragment
            if (!this._oWorkCenterDialog) {
                this._oWorkCenterDialog = sap.ui.xmlfragment("tracktrace.fragments.workCenter", this);
                this.getView().addDependent(this._oWorkCenterDialog);
            }
            // Open the dialog
            this._oWorkCenterDialog.open();
        },
        
        onWorkCenterFilterSearch: function (oEvent) {
            // Get the search query
            var sQuery = oEvent.getParameter("value");
            // Create a filter for the "workCenter" property
            var oFilter = new sap.ui.model.Filter("workCenter", sap.ui.model.FilterOperator.Contains, sQuery);
            // Apply the filter
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },
        
        onWorkCenterValueHelpClose: function (oEvent) {
            // Check if an item was selected
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                // Retrieve the selected work center value
                var sSelectedWorkCenter = oSelectedItem.getTitle();
                // Set the value in the input field
                this.getView().byId("workCenterInput_createProduct").setValue(sSelectedWorkCenter);
            }
            // Clear filters after selection or cancel
            oEvent.getSource().getBinding("items").filter([]);
        },
        
        onOrderTypeValueHelp: function () {
            // Lazy load the SelectDialog fragment
            if (!this._oOrderTypeDialog) {
                this._oOrderTypeDialog = sap.ui.xmlfragment("tracktrace.fragments.orderType", this);
                this.getView().addDependent(this._oOrderTypeDialog);
            }
            // Open the dialog
            this._oOrderTypeDialog.open();
        },
        
        onOrderTypeFilterSearch: function (oEvent) {
            // Get the search query
            var sQuery = oEvent.getParameter("value");
            // Create a filter for the "orderType" property
            var oFilter = new sap.ui.model.Filter("orderType", sap.ui.model.FilterOperator.Contains, sQuery);
            // Apply the filter
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },
        
        onOrderTypeValueHelpClose: function (oEvent) {
            // Check if an item was selected
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                // Retrieve the selected order type value
                var sSelectedOrderType = oSelectedItem.getTitle();
                // Set the value in the input field
                this.getView().byId("orderTypeInput").setValue(sSelectedOrderType);
            }
            // Clear filters after selection or cancel
            oEvent.getSource().getBinding("items").filter([]);
        },



       
        


    });
});