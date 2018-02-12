(function() {
	'use strict';

	var app = {
		//Starts app with initialize the routes and gets the data
		init: function() {
			routes.init();
			dataHandler.request();
		}
	};

	var routes = {
		init: function() {
			routie({
				'': function() {
					routie('home');
				},
				'home': function() {
					sections.toggle('home');
				},
				'pokemons': function() {
					sections.toggle('pokemons');
				},
				'pokemons/:name': function(name) {
					sections.toggle('pokemons-detail');
					render.renderDetail(name);
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

	var dataObject;

	var dataHandler = {

		request: function() {
			fetch('https://pokeapi.co/api/v2/pokemon')
				.then(function(response) {
					return response.json();
				})
				.then(function(data) {
					dataObject = data.results;
					render.renderOverview();
				});
		},

	};

	var render = {

		renderOverview: function() {
			for (var i = 0; i < dataObject.length; i++) {
				var directives = {
					name: {
						text: function(params) {
							return this.name;
						},
						href: function(params) {
							return "#pokemons/" + this.name;
						}
					},
				};
				Transparency.render(document.querySelector('#pokemons ul'), dataObject, directives);
			}

		},
		renderDetail: function(name) {

			for (var i = 0; i < dataObject.length; i++) {
				if (dataObject[i].name == name) {
					var directives = {
						name: {
							text: function(params) {
								return this.name;
							},
							href: function(params) {
								return "#pokemons/" + this.name;
							}
						},
					};
					Transparency.render(document.querySelector('#pokemons-detail'), dataObject[i], directives);
				}
			}

		}
	};

	//Start app
	app.init();

})();
