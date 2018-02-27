import sections from './sections';
import render from './render';

const api = {

	//Get the data from the pokemon API
	getPokemons: function() {
		console.log('Pokemons worden geladen');
		var self = this;
		//Show loader
		var loader = document.querySelector('.loader');
		loader.classList.add("show");
		//Get the data
		fetch('https://pokeapi.co/api/v2/pokemon?limit=151', {
				method: 'GET',
				mode: 'cors',
				cache: 'default'
			})
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
				//Save data in local storage
				localStorage.setItem('dataObject', JSON.stringify(dataObject));
				//Remove Loader
				loader.classList.remove("show");
				//Render pokemon overview
				render.overview(dataObject);
				//Initialize input method
				self.getInput(dataObject);
				console.log('Pokemons geladen');
			})
			.catch(function(error) {
				sections.toggle('error');
			});
	},

	getPokemonDetail: function(name) {
		console.log('Pokemon detail pagina wordt geladen');
		var self = this;
		//Show loader
		var loader = document.querySelector('.loader');
		loader.classList.add("show");
		//Get data from localStorage
		var data = JSON.parse(localStorage.getItem('dataObject'));

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
				sections.toggle('error');
				console.log(error);
			});


	},

	getInput: function(dataObject) {
		var self = this;
		var searchForm = document.querySelector('.search');
		searchForm.addEventListener('keyup', function(e) {
			self.filter(this.value, dataObject);
		});
	},

	filter: function(value, dataObject) {
		var filterData = dataObject.filter(function(obj) {
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

export default api;
