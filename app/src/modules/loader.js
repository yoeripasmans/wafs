const loader = {
	 element: document.querySelector('.loader'),
	 show: function(){
		 this.element.classList.add("show");
	 },
	 hide: function(){
		 this.element.classList.remove("show");
	 }

};

export default loader;
