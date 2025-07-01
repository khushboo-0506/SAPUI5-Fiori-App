//install dependencies
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator" //For filtering lists based on user input
], (Controller, JSONModel, Filter, FilterOperator) => {
	"use strict";

	//extending base controller
	return Controller.extend("ui5.walkthrough.controller.InvoiceList", { 
		onInit() {
			//new json model storing vurrency set to "EUR"
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view"); //sets the oViewModel as a named model ("view") on the current view.
		},

		//Defines a method to filter invoice items
		onFilterInvoices: function (oEvent) {
			const aFilter = []; //An empty array to store filter conditions
			const sQuery = oEvent.getParameter("query"); //Fetches the search string typed by the user

			//if not empty, cretes new filter that checks if productname contains the query string
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery)); //push the filter into aFilter
			}

			const oList = this.byId("invoiceList"); //Gets the list control by its ID (invoiceList)
			const oBinding = oList.getBinding("items"); //Accesses the binding that controls the items aggregation ( eg. rows)
			oBinding.filter(aFilter); //Applies the filters, updating the list UI accordingly
		},

		//nav to detail view for the clicked invoice item
		onPress: function (oEvent) {
			const oItem = oEvent.getSource(); //Gets the control that triggered the event
			const oRouter = this.getOwnerComponent().getRouter();//Retrieves the router object from the app component
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(
					oItem.getBindingContext("invoice").getPath().substring(1) //Gets the path of the selected item, Removes the leading "/", because encodeURIComponent should not encode it
				)
			});
		}
	});
});