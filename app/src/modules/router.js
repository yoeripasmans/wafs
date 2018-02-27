import sections from './sections.js';
import api from './api.js';
import routie from './vendor/routie.js';

const router = {
	//Set the router
	init: function() {

		routie({
			'': () => {
				routie('home');
			},
			'home': () => {
				sections.toggle('home');
			},
			'pokemons': () => {
				sections.toggle('pokemons');
			},
			'pokemons/:name': (name) => {
				api.getPokemonDetail(name);
			},
		});
	},

};

export default router;
