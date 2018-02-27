const sections = {

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

export default sections;
