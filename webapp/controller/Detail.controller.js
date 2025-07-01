//declare dependencies
sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, History, MessageToast, JSONModel) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.Detail", {
		onInit() {
			//Creates a JSON model with currency property set to "EUR"
            const oViewModel = new JSONModel({
				currency: "EUR"
			});

			this.getView().setModel(oViewModel, "view"); //Sets the view model to current view

			//Gets the app router from Component.js
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this); //when detail route matched-> calls onObjectMatched()
		},

		onObjectMatched(oEvent) {
            this.byId("rating").reset(); //When the route is matched, resets the rating control UI by ID

			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "invoice" //bind the entire Detail view to a specific object in the "invoice" model based on the route parameter
			});
		},

		//Called when the user presses a back button
        onNavBack() {
			const oHistory = History.getInstance(); //gets a singleton instance of the SAPUI5 History class, which is responsible for managing and accessing the application's browser history
			const sPreviousHash = oHistory.getPreviousHash(); //Gets the hash based route/ browser history

			if (sPreviousHash !== undefined) {
				window.history.go(-1); //if there is previous route->navigate back in browser history

				//if not then it navigates to the "overview" route.
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true); 
				//true-> indicates navigation replaces history, instead of adding new entry
			}
		},

		//called when user submit rating
        onRatingChange(oEvent) {
			const fValue = oEvent.getParameter("value"); //gets newly selected rating value by user
			const oResourceBundle = this.getView().getModel("i18n").getResourceBundle(); //load localized string from 118n models
			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue])); //Shows a MessageToast like:  “You rated 4 out of 5!”
		}
	});
});