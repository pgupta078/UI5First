 sap.ui.define([
 	"sap/ui/core/mvc/Controller",
 	"sap/m/MessageToast",
 	"sap/m/MessageBox",
 	"sap/ui/model/resource/ResourceModel",
 	"sap/ui/model/json/JSONModel"
 ], function (Controller, MessageToast, MessageBox, ResourceModel, JSONModel) {
 	"use strict";
 	return Controller.extend("zfirst.zfirstproject.controller.View1", {
 		onInit: function () {
 			debugger;
 			this.fname = this.byId("fname");
 			this.lname = this.byId("lname");
 			this.salary = this.byId("salary");

 			//Code to load thet fragement -on loading the application what all the req should be done should be written in onInit Function
 			if (!this.oDialog) //! operator means it should not initialize all the time- only once
 			{
 				this.oDialog = sap.ui.xmlfragment("zfirst.zfirstproject.fragments.Dialog", this);
 				// add dependent so that i18n text will work for fragement as well.		
 				this.getView().addDependent(this.oDialog);
 			}
               //i18n for Controller 			
 			var i18nModel = new ResourceModel({
 				//	bundleUrl: "zfirst.zfirstproject.i18n.i18n"
 				bundleName: "zfirst.zfirstproject.i18n.i18n"
 			});
 			this.getView().setModel(i18nModel, "i18n"); //new addition
 			//   this.getView().setModel(i18nModel,"i18n");
 			//Create Json Structure to populate table
 			
 			var oTab = this.byId("Table1");
 			var oJSon = new JSONModel("./model/employee.json");
 			//Prepare the data to be populated to JSSON
 			/*	var adata = [{
 						"tfname": "Tim",
 						"tlname": "Dexter",
 						"tsalary": "34000",
 						"tgender": "M"
 					}, {
 						"tfname": "Kim",
 						"tlname": "Puma",
 						"tsalary": "44000",
 						"tgender": "F"
 					}, {
 						"tfname": "Deborah",
 						"tlname": "Vouris",
 						"tsalary": "45600",
 						"tgender": "F"
 					}, {
 						"tfname": "Maureen",
 						"tlname": "West",
 						"tsalary": "55600",
 						"tgender": "F"
 					}

 				];
 				//Assign data  to json and json to table
 				oJSon.setData({
 					'modelData': adata
 				});*/
 			oTab.setModel(oJSon);

 			//combobox
 			debugger;
 			var ocmb = this.byId("icGender");
 			var oJSonc = new JSONModel("./model/gender.json");
 			ocmb.setModel(oJSonc);
 		},
 		//to open the fragement/dialog
 		onPressAccept: function () {
 			this.oDialog.open();
 			var fname = this.fname.getValue();
 			var lname = this.lname.getValue();
 			var ffname = sap.ui.getCore().byId('ffname');
 			var flname = sap.ui.getCore().byId("flname");
 			ffname.setValue(fname);
 			flname.setValue(lname);

 		},
 		onPressclosef: function () {
 			this.oDialog.close();
 		},
 		onPressbackf: function () {

 			var ffname = sap.ui.getCore().byId("ffname").getValue();
 			var flname = sap.ui.getCore().byId("flname").getValue();
 			this.fname.setValue(ffname);
 			this.lname.setValue(flname);
 			this.oDialog.close();
 		},
 		onPressLogon: function (oEvent) {

 			//		MessageToast.show(this.byId('Logon').getText() + " Pressed");
 			//     this.getView().setModel(i18nModel, "i18n");
 			var oBundle = this.getView().getModel("i18n").getResourceBundle();
 			debugger;
 			var errMess = oBundle.getText("namevalidation")
 			var fname = this.byId("fname").getValue();
 			var lname = this.byId("lname").getValue();
 			if (fname === "" || lname === "") {
 				//	MessageToast.show("name can not be empty");
 				//Using Message Box
 				MessageBox.show(errMess, {
 					title: "Error",
 					icon: sap.m.MessageBox.Icon.ERROR
 				});
 				return;
 			};
 			//
 		},
 		onRowClick: function (oEvent) {
 			debugger;
 			//Read the clicked row values	
 			var fname = oEvent.getSource().getCells()[0].getText();
 			var lname = oEvent.getSource().getCells()[1].getText();
 			//set to the fields		
 			this.fname.setValue(fname);
 			this.lname.setValue(lname);

 		},
 		onPressDefault: function (oEvent) {
 			//	sap.m.MessageToast.show(this.byId('Press').getText() + " Pressed");
 			sap.m.MessageBox.show(this.byId('Press').getText() + " Pressed");
 		}
 	});
 });