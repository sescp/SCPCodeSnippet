	onInit: function () {

			var oView = this.getView();

			oView.addEventDelegate({
				onBeforeShow: jQuery.proxy(function (evt) {
					this.onBeforeShow(evt);
				}, this)
			});
		},

		onBeforeShow: function () {
			alert("onbeforeshow");
		}