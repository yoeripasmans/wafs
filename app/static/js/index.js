(function() {
	'use strict';

	var app = {
		init: function() {
			routes.init();
		}
	};

	var routes = {
		init: function() {
			window.addEventListener("hashchange", function(route) {
				sections.toggle(route.newURL);
			});
		}
	};

	var sections = {
		toggle: function(route) {
			var hash = route.split("#")[1];
			var elements = document.querySelectorAll('section');

			for (var i = 0; i < elements.length; i++) {
				if (elements[i].id === hash) {
					elements[i].style.display = "block";
				} else {
					elements[i].style.display = "none";
				}
			}

		}
	};

	//Start app
	app.init();

})();
