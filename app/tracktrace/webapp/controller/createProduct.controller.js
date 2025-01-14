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
            // sap.ui.core.BusyIndicator.show(0); // Delay set to 0 for immediate visibility
            
            // Fetch data from OData V4 service using list binding
            const oODataModel = this.getView().getModel(); // Assuming the default model is OData V4
            const oBinding = oODataModel.bindList("/ztrack_material");
            
            // Trigger data loading
            oBinding.requestContexts().then((aContexts) => {
                const aMaterials = aContexts.map((oContext) => oContext.getObject());
                const oMaterialModel = new sap.ui.model.json.JSONModel({ value: aMaterials });
                this.getView().setModel(oMaterialModel, "materialModel");
                
                // Open the dialog
                this._oMaterialDialog.open();
            }).catch(() => {
                sap.m.MessageBox.error("Failed to fetch material data.");
            }).finally(() => {
                // Hide busy indicator
                // sap.ui.core.BusyIndicator.hide();
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
                var sSelectedMaterial = oSelectedItem.getTitle().trim();
                // Set the value in the input field
                this.getView().byId("materialInput_createProduct").setValue(sSelectedMaterial);
                this.loadContractData(sSelectedMaterial);
            }
            // Clear filters after selection or cancel
            oEvent.getSource().getBinding("items").filter([]);
        },
        
        loadContractData: function (sSelectedMaterial) {
            let contractModel = this.getOwnerComponent().getModel();
            let componentModel = this.getOwnerComponent().getModel();
        
            // Bind the list to the /A_ProductionOrder path
            let contractBindlist = contractModel.bindList("/A_ProductionOrder");
            let componentModelBindlist = componentModel.bindList("/A_ProductionOrderComponent");
        
            // Fetch the contexts (data entries) for the /A_ProductionOrder list
            contractBindlist.requestContexts().then((aContractContexts) => {
                // Map contexts to their data objects
                const aProductionOrders = aContractContexts.map((oContext) => oContext.getObject());
        
                // Filter the production orders based on the selected material name
                const aFilteredOrders = aProductionOrders.filter((oOrder) => {
                    return oOrder.MaterialName.trim().toLowerCase() === sSelectedMaterial.trim().toLowerCase();
                });
        
                console.log("Filtered Production Orders:", aFilteredOrders);
        
                if (aFilteredOrders.length === 0) {
                    console.log("No matching production orders found.");
                    return;
                }
        
                // Extract all unique ManufacturingOrder values
                const aManufacturingOrders = aFilteredOrders.map((oOrder) => oOrder.ProductionOrder);
        
                // Fetch the contexts (data entries) for the /A_ProductionOrderComponent list
                componentModelBindlist.requestContexts().then((aComponentContexts) => {
                    // Map contexts to their data objects
                    const aComponents = aComponentContexts.map((oContext) => oContext.getObject());
        
                    // Filter components based on ManufacturingOrder matching ProductionOrder
                    const aFilteredComponents = aComponents.filter((oComponent) => {
                        return aManufacturingOrders.includes(oComponent.ManufacturingOrder);
                    });
        
                    console.log("Filtered Components:", aFilteredComponents);
        
                    // Set the filtered data to JSON models
                    const oFilteredOrdersModel = new sap.ui.model.json.JSONModel({ value: aFilteredOrders });
                    this.getView().setModel(oFilteredOrdersModel, "filterProductionModel");
        
                    const oFilteredComponentsModel = new sap.ui.model.json.JSONModel({ value: aFilteredComponents });
                    this.getView().setModel(oFilteredComponentsModel, "filterComponentModel");
                }).catch((oError) => {
                    console.error("Error fetching component contexts:", oError);
                });
            }).catch((oError) => {
                console.error("Error fetching production order contexts:", oError);
            });
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
        onProducOrderValueHelp :function(){
            if (!this._productionOrderDialog) {
                this._productionOrderDialog = sap.ui.xmlfragment("tracktrace.fragments.productionOrder", this);
                this.getView().addDependent(this._productionOrderDialog);
            }
            // Open the dialog
            this._productionOrderDialog.open();

        },
        onproductionOrderValueHelpConfirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                // Retrieve the selected manufacturing order
                var sSelectedOrderType = oSelectedItem.getTitle();
                // Set the value in the input field
                this.getView().byId("workCenterInput_createProducte").setValue(sSelectedOrderType);
        
                // Filter data from A_ProductionOrderComponent OData model
                var oModel = this.getView().getModel(); // Assuming the OData V4 model is the default model
                var sFilterPath = "/A_ProductionOrderComponent"; // Path to the entity set
                var oFilter = new sap.ui.model.Filter("ManufacturingOrder", sap.ui.model.FilterOperator.EQ, sSelectedOrderType);
        
                // Perform the read operation using bindList with filters
                oModel.bindList(sFilterPath, undefined, undefined, [oFilter]).requestContexts()
                    .then(function (aContexts) {
                        // Extract data from the returned contexts
                        var aData = aContexts.map(function (oContext) {
                            return oContext.getObject();
                        });
        
                        // Bind the filtered data to a JSON model
                        var oJSONModel = new sap.ui.model.json.JSONModel(aData);
                        this.getView().setModel(oJSONModel, "filteredComponents");
        
                        // Optional: Log or handle the data as needed
                        console.log("Filtered Data:", aData);
                    }.bind(this))
                    .catch(function (oError) {
                        console.error("Error fetching data:", oError);
                    });
            }
            // Clear filters after selection or cancel
            oEvent.getSource().getBinding("items").filter([]);
        },
        

        onProductionOrderValueHelp : function(){

            if (!this._productionDialog) {
                this._productionDialog = sap.ui.xmlfragment("tracktrace.fragments.productionFragment", this);
                this.getView().addDependent(this._productionDialog);
            }
            // Open the dialog
            this._productionDialog.open();
        },

        onproductionValueHelpConfirm:function(oEvent){
        
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                // Retrieve the selected order type value
                var sSelectedOrderType = oSelectedItem.getTitle();
                // Set the value in the input field
                this.getView().byId("workCenterInput_createProduedcte").setValue(sSelectedOrderType);
                var oModel = this.getView().getModel(); // Assuming the default OData model is used

        // Create a new filter for OrderID
        var oFilter = new sap.ui.model.Filter("OrderID", sap.ui.model.FilterOperator.EQ, sSelectedOrderType);

        // Bind the filtered data to a new model
        var oListBinding = oModel.bindList("/ProdnOrdConf2", undefined, undefined, [oFilter]);
        var that = this;
        oListBinding.requestContexts().then(function (aContexts) {
            // Extract data from the contexts
            var aFilteredData = aContexts.map(function (oContext) {
                return oContext.getObject();
            });

            // Create a JSONModel with the filtered data and set it to the view
            var oConfirmationModel = new sap.ui.model.json.JSONModel({ value: aFilteredData });
            that.getView().setModel(oConfirmationModel, "confirmationModel");
            console.log("oConfirmationModel",oConfirmationModel);
            
        }).catch(function (oError) {
            // Handle any errors during the data fetch
            sap.m.MessageToast.show("Failed to fetch filtered data.");
            console.error(oError);
        });
    }

    // Clear filters after selection or cancel
    oEvent.getSource().getBinding("items").filter([]);
}
       
        


    });
});