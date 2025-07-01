//defined ui5 module and dependencies
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], (UIComponent, JSONModel, Device) => {
	"use strict";

	//extending the base UIComponent class
	return UIComponent.extend("ui5.walkthrough.Component", {
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"], //Tells UI5 that this component supports async view loading
			manifest: "json"
		},

		init() {
			// auto call when component start

			UIComponent.prototype.init.apply(this, arguments); // calls init func of  parent class(UIComponent) from within the child class(your custom component)

			// created and set json model
			const oData = {
				recipient: {
					name: "World"
				}
			};
			const oModel = new JSONModel(oData);
			this.setModel(oModel);

            // set device model
			const oDeviceModel = new JSONModel(Device); //Wraps the Device API into a JSON model
			oDeviceModel.setDefaultBindingMode("OneWay"); // View updates when device changes, but user can’t change it
			this.setModel(oDeviceModel, "device"); //attaches this model to default model of the app

			// create the views based on the url/hash - url based navigation
			this.getRouter().initialize();
		},

		//Set Content Density
        getContentDensityClass() {
			return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
			//sapUiSizeCozy → for touch devices (larger controls)
            //sapUiSizeCompact → for desktops (small control, more compact layout)
		}
	});
});