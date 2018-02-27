import router from './modules/router.js';
import api from './modules/api.js';

(function() {
	'use strict';

	const app = {
		//Starts app with initialize the router and gets the data
		init: function() {
			router.init();
			api.getPokemons();
		}
	};
	//Start app
	app.init();

})();
