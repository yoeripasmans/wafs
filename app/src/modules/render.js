import sections from './sections';
import background from './background';
import transparency from './vendor/transparency.min.js';

const render = {

	overview: function(dataObject) {
		for (let i = 0; i < dataObject.length; i++) {
			const directives = {
				name: {
					text: function(params)  {
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
						return "assets/img/pokemons/" + (this.id + 1) + ".png";
					}
				}
			};
			Transparency.render(document.querySelector('#pokemons ul'), dataObject, directives);
		}

	},
	detail: function(dataObject) {
		background.toggle(dataObject);

		var directives = {
			img: {
				src: function(params) {
					return "assets/img/pokemons/" + this.id + ".png";
				}
			}

		};
		Transparency.render(document.querySelector('#pokemons-detail'), dataObject, directives);
		sections.toggle('pokemons-detail');
	},

};

export default render;
