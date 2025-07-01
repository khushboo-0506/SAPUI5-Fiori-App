sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/RatingIndicator", //for star rating
	"sap/m/Label", //to show text
	"sap/m/Button" //to submit rating
], (Control, RatingIndicator, Label, Button) => {
	"use strict";

	//custom control
	return Control.extend("ui5.walkthrough.control.ProductRating", {
		metadata : {
			//defines a prop. value->int , defval=0
			properties : {
				value: 	{type : "int", defaultValue : 0}
			}, //ae current rating store krta h user jo select krta h

			//delares child controls
			aggregations : {

				//multiple:true ->You're only managing one RatingIndicator, one Label, and one Button
				//we only need one of each, rendering multiple would be confusing nd incorrect
				_rating : {type : "sap.m.RatingIndicator", multiple: false, visibility : "hidden"},

				//visibility:hidden ->aggregation is private, not accessible outside the control
				_label : {type : "sap.m.Label", multiple: false, visibility : "hidden"},

				_button : {type : "sap.m.Button", multiple: false, visibility : "hidden"}
			},

			//here created custom event change that emits the rating value once user submits
			events : {
				change : {
					parameters : {
						value : {type : "int"}
					}
				}
			}
		},

		init() {
			//Creates a RatingIndicator 
			this.setAggregation("_rating", new RatingIndicator({
				value: this.getValue(), //sets currentvalue of rating
				iconSize: "2rem",
				visualMode: "Full", 

				//Binds the liveChange event of RatingIndicator to the _onRate() method
				//livechange->fires as soon as user changes the rating
				liveChange: this._onRate.bind(this)
			}));

			// Creates a label with default text (e.g., “Rate this product”).
			this.setAggregation("_label", new Label({
				text: "{i18n>productRatingLabelInitial}"
			}).addStyleClass("sapUiSmallMargin"));

			//create a submit button
			this.setAggregation("_button", new Button({
				text: "{i18n>productRatingButton}",
				press: this._onSubmit.bind(this)
			}).addStyleClass("sapUiTinyMarginTopBottom"));
		},

        //sets the value property
		setValue(fValue) {
			this.setProperty("value", fValue, true);
			this.getAggregation("_rating").setValue(fValue); //Sets value property and updates the rating UI, 
			//true = suppress rerendering

			return this; //Returns the current instance
		},

		reset() {
			const oResourceBundle = this.getModel("i18n").getResourceBundle();//get access to i18n bundles

			this.setValue(0); // reset rating=0
			this.getAggregation("_label").setDesign("Standard"); // normal label
			this.getAggregation("_rating").setEnabled(true); // make rating editable again
			this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial")); //reset label text
			this.getAggregation("_button").setEnabled(true); //enable button
		},

		_onRate(oEvent) {
			const oRessourceBundle = this.getModel("i18n").getResourceBundle();
			const fValue = oEvent.getParameter("value"); // get new rating

			this.setProperty("value", fValue, true); // update property

			this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
			this.getAggregation("_label").setDesign("Bold"); //visually emphasize feedback
			 
		},

		_onSubmit(oEvent) {
			const oResourceBundle = this.getModel("i18n").getResourceBundle();

			this.getAggregation("_rating").setEnabled(false); //disable rating
			this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal"));
			this.getAggregation("_button").setEnabled(false); //disable button
			this.fireEvent("change", {
				value: this.getValue()
			});
		},

		//oRm: rENDERmANGER-HELPS you write in HTML in a structured way
		//oControl: Instance of your custom control
		renderer(oRm, oControl) {
			oRm.openStart("div", oControl);
			oRm.class("myAppDemoWTProductRating");
			oRm.openEnd();
			oRm.renderControl(oControl.getAggregation("_rating"));
			oRm.renderControl(oControl.getAggregation("_label"));
			oRm.renderControl(oControl.getAggregation("_button"));
			oRm.close("div");
		}
	});
});