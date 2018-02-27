import sections from './sections';
import transparency from './vendor/transparency.min.js';

const render = {

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
			} else if (dataObject.types[i].type.name == "electric") {
				background.style.backgroundColor = "#FFE066";
			} else {
				background.style.backgroundColor = "#0B132B";
			}
		}
	}
};

export default render;
