sap.ui.define([
   "sap/ui/core/mvc/Controller"
], (Controller) => {
   "use strict";

   // defined a custom controller 
   return Controller.extend("ui5.walkthrough.controller.App", {
      //auto call func when view is initialized
      onInit() {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
         // calls getContentDensityClass() from Component.js
		}
   });
});