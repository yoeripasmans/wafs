(function() {
	'use strict';

	var app = {
		//Starts app with initialize the routes
		init: function() {
			routes.init();
			getData.request();
		}
	};

	var routes = {
		init: function() {
			routie({
				'': function() {
					window.location.hash = 'home';
				},
				'home': function() {
					sections.toggle('home');
				},
				'pokemons': function() {
					sections.toggle('pokemons');
				}
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
	var getData = {
		request: function() {
			var request = new XMLHttpRequest();
			request.open('GET', 'https://cors-anywhere.herokuapp.com/' + 'http://www.pokeapi.co/api/v2/pokemon', true);

			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					// Success!
					var data = JSON.parse(request.responseText);
					console.log(data);
				} else {
					// We reached our target server, but it returned an error

				}
			};

			request.onerror = function() {
				// There was a connection error of some sort
			};

			request.send();
		}
	};



	//Start app
	app.init();

})();
