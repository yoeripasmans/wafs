(function() {
	'use strict';

	var app = {
		//Starts app with initialize the routes and gets the data
		init: function() {
			routes.init();
			api.getPokemons();
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
					api.getPokemonDetail(name);
				},
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

	var api = {

		//Get the data from the pokemon API
		getPokemons: function() {
			console.log('Pokemons worden geladen');
			var self = this;
			//Show loader
			var loader = document.querySelector('.loader');
			loader.classList.add("show");
			fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
				//Return data as json
				.then(function(response) {
					return response.json();
				})
				.then(function(data) {
					//Add an ID to every object with map function
					var dataObject = data.results.map(function(i, index) {
						return {
							id: index,
							name: i.name,
							url: i.url
						};
					});
					self.data = dataObject;
					//Save data in local storage
					localStorage.setItem('dataObject', JSON.stringify(dataObject));
					//Render pokemon overview
					loader.classList.remove("show");
					render.overview(dataObject);
					self.getInput();
					console.log('Pokemons geladen');
				})
				.catch(function(error) {
					console.log(error);
				});
		},

		getPokemonDetail: function(name) {
			console.log('Pokemon detail pagina wordt geladen');
			var self = this;
			//Show loader
			var loader = document.querySelector('.loader');
			loader.classList.add("show");
			var data = JSON.parse(localStorage.getItem('dataObject'));
			//Check if data exist
			//Get the object with the name of name of the parameter and save it in variable
			var dataDetail = data.filter(function(obj) {
				if (obj.name == name) {
					return true;
				} else {
					return false;
				}
			});

			//Get data of the detail object
			fetch(dataDetail[0].url)
				.then(function(response) {
					return response.json();
				})
				.then(function(data) {
					loader.classList.remove("show");
					render.detail(data);
				})
				.catch(function(error) {
					console.log(error);
				});

		},

		getInput: function() {
			var self = this;
			var searchForm = document.querySelector('.search');
			searchForm.addEventListener('keyup', function(e) {
				self.filter(this.value);
			});
		},

		filter: function(value) {
			var data = JSON.parse(localStorage.getItem('dataObject'));
			var filterData = data.filter(function(obj) {
				if (obj.name.includes(value)) {
					return true;
				} else {
					return false;
				}
				return filterData;
			});
			render.overview(filterData);
		}

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
			this.backgroundColorToggle(dataObject);

			var directives = {
				img: {
					src: function(params) {
						return "static/img/pokemons/" + this.id + ".png";
					}
				}

			};
			Transparency.render(document.querySelector('#pokemons-detail'), dataObject, directives);
			sections.toggle('pokemons-detail');
		},

		backgroundColorToggle: function(dataObject) {
			var background = document.querySelector("#pokemons-detail");

			for (var i = 0; i < dataObject.types.length; i++) {
				if (dataObject.types[i].type.name == "fire") {
					background.style.backgroundColor = "#E63946";
				} else if (dataObject.types[i].type.name == "water") {
					background.style.backgroundColor = "#5BC0EB";
				} else if (dataObject.types[i].type.name == "grass") {
					background.style.backgroundColor = "#9BC53D";
				} else if (dataObject.types[i].type.name == "poison") {
					background.style.backgroundColor = "#3D315B";
				} else if (dataObject.types[i].type.name == "normal") {
					background.style.backgroundColor = "grey";
				} else {
					background.style.backgroundColor = "#0B132B";
				}
			}
		}
	};

	//Start app
	app.init();

})();
