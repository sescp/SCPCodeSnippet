onFileChange: function(oEvent) {
			this.fileToUpload = oEvent.getParameter("files")["0"];
			if (this.fileToUpload) {
				// this.app.setBusy(true);
				var fileReader = new FileReader();
				fileReader.onload = this.uploadFile.bind(this);
				fileReader.readAsBinaryString(this.fileToUpload);
			} else {
				MessageBox.show("No file was selected");
			}
		},

		onFileUpload: function() {
			this.fileToUpload = this.getView().byId("createFileUploader").getParameter("files")["0"];
			if (this.fileToUpload) {
				// this.app.setBusy(true);
				var fileReader = new FileReader();
				fileReader.onload = this.uploadFile.bind(this);
				fileReader.readAsBinaryString(this.fileToUpload);
			} else {
				MessageBox.show("No file was selected");
			}
		},
		
		uploadFile: function(e) {
			var view = this.getView();
			/*model = view.getModel(),
			sPath = view.getElementBinding().getPath(),
			url = model.sServiceUrl + sPath + "/ServiceRequestAttachmentFolder",
			token = model.getSecurityToken();*/
			image = window.btoa(e.target.result);
			var data = {
				Name: this.fileToUpload.name,
				Binary: window.btoa(e.target.result)
			};
			var oParameters = {
				"PRODUCTID": "P0000001",
				"DESCRIPTION": "Test",
				"CATEGORY": "Shirt",
				"COLORS": "Red",
				"SIZES": "M",
				"IMAGE": window.btoa(e.target.result),
				"PRICE": "600",
				"TEST1": "",
				"TEST2": "",
				"QUANTITY": "10"
			};

		},
		CreateButtonID: function() {
			var that = this;
			var view = sap.ui.getCore();
			var genderdata = sap.ui.getCore().byId("SIZES").getSelectedKey();
			var payload = {
				SIZES: genderdata,
				PRODUCTID: view.byId("PRODUCTID").getValue(),
				DESCRIPTION: view.byId("createDescription").getValue(),
				CATEGORY: view.byId("CATEGORY").getSelectedKey(),
				COLORS: view.byId("COLORS").getSelectedKey(),
				PRICE: view.byId("PRICE").getValue(),
				IMAGE: image,
				TEST1: view.byId("currencyID").getSelectedKey(),
				TEST2: view.byId("GenderID").getSelectedKey(),
				QUANTITY: view.byId("quantityInputID").getValue()

			};

			$.ajax({
				url: "/XSOR/DBR-70071/products.xsodata/PRODUCTS",
				type: "POST",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(payload),
				success: function(data) {
					var x = 10;
					sap.m.MessageBox.success("Product Created Successfully");
					that.oDialog.close();
					that.onRefresh();
				},
				error: function(err) {
					sap.m.MessageBox.error("Error");
				}
			});
		},