(function() {

	var app = {
		init: function() {
			position.check();
		}
	};

	var position = {
		set: function() {
		},
		check: function() {
			var el = document.body;
			var self = this;
			this.update();

			el.addEventListener('touchstart', function(){
				self.update();
			});
		},
		update: function() {},
		getDistance: function() {},
	};

	var gMap = {
		generate: function() {},
		update: function() {}
	};

	var helper = {
		isNumber: function() {
			helper.isNumber('1');
		},
		getElement: function(element) {
			return document.querySelector(element);
		},
		getElements: function(elements) {
			return document.querySelectorAll(elements);
		},
	};

	var debug = {
		isNumber: function() {},
	};

	var $ = helper.getElement;

	//Start app
	app.init();

})();
