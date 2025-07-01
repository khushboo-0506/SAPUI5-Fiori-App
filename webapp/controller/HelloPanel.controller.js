sap.ui.define([
	"sap/ui/core/mvc/Controller", //to create controller
	"sap/m/MessageToast" //to show small popup
], (Controller, MessageToast) => {
	"use strict";
	return Controller.extend("ui5.walkthrough.controller.HelloPanel", {
		onShowHello() {
			// read msg from i18n model
			const oBundle = this.getView().getModel("i18n").getResourceBundle();
			const sRecipient = this.getView().getModel().getProperty("/recipient/name"); //Gets the recipient name
			const sMsg = oBundle.getText("helloMsg", [sRecipient]); //Fetches the localized message from i18n.properties
			// show message in a small popup
			MessageToast.show(sMsg);
		},

		//Opens a dialog window
		async onOpenDialog() {
			// create dialog lazily
			//Uses the ??= operator to load the dialog fragment only if it hasn’t been loaded yet
			this.oDialog ??= await this.loadFragment({
				name: "ui5.walkthrough.view.HelloDialog" //loads HelloDialog.fragment.xml
			});
			this.oDialog.open(); //once dialpg is loaded, it is opened on screen
		},

		//Closes the open dialog when the close button is clicked
		onCloseDialog() {
			this.byId("helloDialog").close();
		}
	});

});