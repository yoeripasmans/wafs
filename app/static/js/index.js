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
					dataHandler.requestDetail(name);
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
					elements[i].classList.add("show");
				} else {
					elements[i].classList.remove("show");
				}

			}
		},

	};

	var dataHandler = {

		//Get the data from the pokemon API
		request: function() {
			fetch('https://pokeapi.co/api/v2/pokemon')
				.then(function(response) {
					return response.json();
				})
				.then(function(data) {
					dataHandler.data = data.results;
					//Add an ID to every object
					var dataObject = data.results.map(function(i, index) {
						return {
							id: index,
							name: i.name,
							url: i.url
						};
					});
					render.overview(dataObject);
					console.log(dataObject);
				});
		},

		requestDetail: function(name) {
			if (name) {
				//Get the object with the name of name of the parameter and save it in variable
				var dataDetail = this.filter(name);

				//Get more data of the filtered object
				fetch(dataDetail[0].url)
					.then(function(response) {
						return response.json();
					})
					.then(function(data) {
						render.detail(data);
					});
			}
		},

		filter: function(name) {
			var dataDetail = this.data.filter(function(obj) {
				if (obj.name == name) {
					return true;
				} else {
					return false;
				}
			});
			return dataDetail;
		},

	};

	var render = {

		overview: function(dataObject) {
			for (var i = 0; i < dataObject.length; i++) {
				var directives = {
					name: {
						text: function(params) {
							return this.name;
						},
					},
					link: {
						href: function(params) {
							return "#pokemons/" + this.name;
						}
					},
					img: {
						src: function(params) {
							return "static/img/pokemons/" + (this.id + 1) + ".png";
						}
					}
				};
				Transparency.render(document.querySelector('#pokemons ul'), dataObject, directives);
			}

		},
		detail: function(dataObject) {
			var directives = {
				img: {
					src: function(params) {
						return "static/img/pokemons/" + this.id + ".png";
					}
				}

			};
			Transparency.render(document.querySelector('#pokemons-detail'), dataObject, directives);
			sections.toggle('pokemons-detail');
		}
	};

	//Start app
	app.init();

})();
