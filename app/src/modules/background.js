const background = {

	element: document.querySelector("#pokemons-detail"),

	toggle: function(dataObject) {
		for (let i = 0; i < dataObject.types.length; i++) {
			if (dataObject.types[i].type.name == "fire") {
				this.element.style.backgroundColor = "#E63946";
			} else if (dataObject.types[i].type.name == "water") {
				this.element.style.backgroundColor = "#5BC0EB";
			} else if (dataObject.types[i].type.name == "grass") {
				this.element.style.backgroundColor = "#9BC53D";
			} else if (dataObject.types[i].type.name == "poison") {
				this.element.style.backgroundColor = "#3D315B";
			} else if (dataObject.types[i].type.name == "normal") {
				this.element.style.backgroundColor = "grey";
			} else if (dataObject.types[i].type.name == "electric") {
				this.element.style.backgroundColor = "#FFE066";
			} else {
				this.element.style.backgroundColor = "#0B132B";
			}
		}
	}

};

export default background;
