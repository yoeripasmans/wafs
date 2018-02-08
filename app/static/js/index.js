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
			//Toggle the sections when the the page loads.
			window.addEventListener("load", function(route) {
				route = window.location.hash.slice(1);
				//Check if a hash exsist. If not set it to "start". Else fire the toggle method to display the current hash
				if (route == "") {
					window.location.hash = 'start';
				} else {
					sections.toggle(route);
				}
			});

			//Toggle the sections when the hash changes. This happens when the user clicks on a link.
			window.addEventListener("hashchange", function(route) {
				//save the clicked url to a usable string and slices it to the name of the clicked link
				route = window.location.hash.slice(1);
				//Passes the hash to the sections as a parameter.
				sections.toggle(route);
			});
		},

	};

	var sections = {

		toggle: function(route) {

			var elements = document.querySelectorAll('section');

			for (var i = 0; i < elements.length; i++) {
				//If the hash is equal to an id of a section show that section. If not hide it.
				if (elements[i].id === route) {
					elements[i].style.display = "block";
				} else {
					elements[i].style.display = "none";
				}

			}
		},

	};

	//Start app
	app.init();

})();
