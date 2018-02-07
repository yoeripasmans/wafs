(function() {
	'use strict';

	var app = {
		//Starts app with initialize the routes
		init: function() {
			routes.init();
		}
	};

	var routes = {
		init: function() {
			//Toggle the sections when the hash changes. This happens when the user clicks on a link.
			window.addEventListener("hashchange", function(route) {
				//Splits the clicked url to a usable string with the name of the clicked hash
				route = route.newURL.split("#")[1];
				//Passes the hash to the sections as a parameter.
				sections.toggle(route);
			});
		}
	};

	var sections = {
		toggle: function(route) {
			//Selects all sections 
			var elements = document.querySelectorAll('section');

			for (var i = 0; i < elements.length; i++) {
				//If the hash is equal to an id of a section show that section. If not hide it.
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
