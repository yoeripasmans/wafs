import render from './render';

const filter = {
	getInput: function(dataObject) {
		const searchForm = document.querySelector('.search');
		searchForm.addEventListener('keyup', e => this.filter(searchForm.value, dataObject));
	},

	filter: function(value, dataObject) {
		const filterData = dataObject.filter(obj => {
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

export default filter;
