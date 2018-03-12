import sections from './sections';
import render from './render';
import filter from './filter';
import loader from './loader';

const api = {

	//Get the data from the pokemon API
	getPokemons: function() {
		console.log('Pokemons worden geladen');
		//Show loader
		loader.show();
		//Get the data
		fetch('https://pokeapi.co/api/v2/pokemon?limit=151', {
				method: 'GET',
				mode: 'cors',
				cache: 'default'
			})
			//Return data as json
			.then(response => response.json())

			.then(data => {
				//Add an ID to every object with map function
				const dataObject = data.results.map((i, index) => {
					return {
						id: index,
						name: i.name,
						url: i.url
					};
				});
				//Save data in local storage
				localStorage.setItem('dataObject', JSON.stringify(dataObject));
				//Remove Loader
				loader.hide();
				//Render pokemon overview
				render.overview(dataObject);
				//Initialize input method
				filter.getInput(dataObject);
				console.log('Pokemons geladen');
			})
			.catch(error => {
				sections.toggle('error');
			});
	},

	getPokemonDetail: function(name) {
		console.log('Pokemon detail pagina wordt geladen');
		//Show loader
		loader.show();
		//Get data from localStorage
		const data = JSON.parse(localStorage.getItem('dataObject'));

		//Get the object with the name of name of the parameter and save it in variable
		const dataDetail = data.filter(obj => {
			if (obj.name == name) {
				return true;
			} else {
				return false;
			}
		});

		//Get data of the detail object
		fetch(dataDetail[0].url)
			.then(response => response.json())
			.then(data => {
				loader.hide();
				render.detail(data);
			})
			.catch(error => {
				sections.toggle('error');
				console.log(error);
			});


	},

};

export default api;
