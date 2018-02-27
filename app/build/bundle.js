/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = routie;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = transparency;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _transparency = __webpack_require__(1);

var _transparency2 = _interopRequireDefault(_transparency);

var _routie = __webpack_require__(0);

var _routie2 = _interopRequireDefault(_routie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	var app = {
		//Starts app with initialize the router and gets the data
		init: function init() {
			router.init();
			api.getPokemons();
		}
	};

	var router = {
		//Set the router
		init: function init() {

			(0, _routie2.default)({
				'': function _() {
					(0, _routie2.default)('home');
				},
				'home': function home() {
					sections.toggle('home');
				},
				'pokemons': function pokemons() {
					sections.toggle('pokemons');
				},
				'pokemons/:name': function pokemonsName(name) {
					api.getPokemonDetail(name);
				}
			});
		}

	};

	var sections = {

		toggle: function toggle(route) {

			var elements = document.querySelectorAll('section');

			for (var i = 0; i < elements.length; i++) {
				//If the hash is equal to an id of a section show that section. If not hide it.
				if (elements[i].id === route) {
					elements[i].classList.add("show");
				} else {
					elements[i].classList.remove("show");
				}
			}
		}

	};

	var api = {

		//Get the data from the pokemon API
		getPokemons: function getPokemons() {
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
			.then(function (response) {
				return response.json();
			}).then(function (data) {
				//Add an ID to every object with map function
				var dataObject = data.results.map(function (i, index) {
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
			}).catch(function (error) {
				sections.toggle('error');
			});
		},

		getPokemonDetail: function getPokemonDetail(name) {
			console.log('Pokemon detail pagina wordt geladen');
			var self = this;
			//Show loader
			var loader = document.querySelector('.loader');
			loader.classList.add("show");
			//Get data from localStorage
			var data = JSON.parse(localStorage.getItem('dataObject'));

			//Get the object with the name of name of the parameter and save it in variable
			var dataDetail = data.filter(function (obj) {
				if (obj.name == name) {
					return true;
				} else {
					return false;
				}
			});

			//Get data of the detail object
			fetch(dataDetail[0].url).then(function (response) {
				return response.json();
			}).then(function (data) {
				loader.classList.remove("show");
				render.detail(data);
			}).catch(function (error) {
				sections.toggle('error');
				console.log(error);
			});
		},

		getInput: function getInput(dataObject) {
			var self = this;
			var searchForm = document.querySelector('.search');
			searchForm.addEventListener('keyup', function (e) {
				self.filter(this.value, dataObject);
			});
		},

		filter: function filter(value, dataObject) {
			var filterData = dataObject.filter(function (obj) {
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

	var render = {

		overview: function overview(dataObject) {
			for (var i = 0; i < dataObject.length; i++) {
				var directives = {
					name: {
						text: function text(params) {
							return this.name;
						}
					},
					link: {
						href: function href(params) {
							return "#pokemons/" + this.name;
						}
					},
					img: {
						src: function src(params) {
							return "static/img/pokemons/" + (this.id + 1) + ".png";
						}
					}
				};
				Transparency.render(document.querySelector('#pokemons ul'), dataObject, directives);
			}
		},
		detail: function detail(dataObject) {
			this.backgroundColorToggle(dataObject);

			var directives = {
				img: {
					src: function src(params) {
						return "static/img/pokemons/" + this.id + ".png";
					}
				}

			};
			Transparency.render(document.querySelector('#pokemons-detail'), dataObject, directives);
			sections.toggle('pokemons-detail');
		},

		backgroundColorToggle: function backgroundColorToggle(dataObject) {
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

	//Start app
	app.init();
})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzc4NGU5MjUwNWMxYzE1MDE5MmEiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicm91dGllXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHJhbnNwYXJlbmN5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRpYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJpbml0Iiwicm91dGVyIiwiYXBpIiwiZ2V0UG9rZW1vbnMiLCJzZWN0aW9ucyIsInRvZ2dsZSIsIm5hbWUiLCJnZXRQb2tlbW9uRGV0YWlsIiwicm91dGUiLCJlbGVtZW50cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJsZW5ndGgiLCJpZCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImNvbnNvbGUiLCJsb2ciLCJzZWxmIiwibG9hZGVyIiwicXVlcnlTZWxlY3RvciIsImZldGNoIiwibWV0aG9kIiwibW9kZSIsImNhY2hlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJkYXRhT2JqZWN0IiwicmVzdWx0cyIsIm1hcCIsImluZGV4IiwidXJsIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW5kZXIiLCJvdmVydmlldyIsImdldElucHV0IiwiY2F0Y2giLCJlcnJvciIsInBhcnNlIiwiZ2V0SXRlbSIsImRhdGFEZXRhaWwiLCJmaWx0ZXIiLCJvYmoiLCJkZXRhaWwiLCJzZWFyY2hGb3JtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ2YWx1ZSIsImZpbHRlckRhdGEiLCJpbmNsdWRlcyIsImRpcmVjdGl2ZXMiLCJ0ZXh0IiwicGFyYW1zIiwibGluayIsImhyZWYiLCJpbWciLCJzcmMiLCJUcmFuc3BhcmVuY3kiLCJiYWNrZ3JvdW5kQ29sb3JUb2dnbGUiLCJiYWNrZ3JvdW5kIiwidHlwZXMiLCJ0eXBlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiXSwibWFw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QyxLQUFYLENBQWlCdkQsQ0FBakIsRUFBb0J3RCxJQUFwQixDQUF5QjlELElBQXpCLElBQWlDLE9BQXJDLEVBQThDO0FBQ3BENEQsZ0JBQVdHLEtBQVgsQ0FBaUJDLGVBQWpCLEdBQW1DLFNBQW5DO0FBQ0EsS0FGTSxNQUVBLElBQUl2QyxXQUFXb0MsS0FBWCxDQUFpQnZELENBQWpCLEVBQW9Cd0QsSUFBcEIsQ0FBeUI5RCxJQUF6QixJQUFpQyxPQUFyQyxFQUE4QztBQUNwRDRELGdCQUFXRyxLQUFYLENBQWlCQyxlQUFqQixHQUFtQyxTQUFuQztBQUNBLEtBRk0sTUFFQSxJQUFJdkMsV0FBV29DLEtBQVgsQ0FBaUJ2RCxDQUFqQixFQUFvQndELElBQXBCLENBQXlCOUQsSUFBekIsSUFBaUMsUUFBckMsRUFBK0M7QUFDckQ0RCxnQkFBV0csS0FBWCxDQUFpQkMsZUFBakIsR0FBbUMsU0FBbkM7QUFDQSxLQUZNLE1BRUEsSUFBSXZDLFdBQVdvQyxLQUFYLENBQWlCdkQsQ0FBakIsRUFBb0J3RCxJQUFwQixDQUF5QjlELElBQXpCLElBQWlDLFFBQXJDLEVBQStDO0FBQ3JENEQsZ0JBQVdHLEtBQVgsQ0FBaUJDLGVBQWpCLEdBQW1DLE1BQW5DO0FBQ0EsS0FGTSxNQUVBLElBQUl2QyxXQUFXb0MsS0FBWCxDQUFpQnZELENBQWpCLEVBQW9Cd0QsSUFBcEIsQ0FBeUI5RCxJQUF6QixJQUFpQyxVQUFyQyxFQUFpRDtBQUN2RDRELGdCQUFXRyxLQUFYLENBQWlCQyxlQUFqQixHQUFtQyxTQUFuQztBQUNBLEtBRk0sTUFFQTtBQUNOSixnQkFBV0csS0FBWCxDQUFpQkMsZUFBakIsR0FBbUMsU0FBbkM7QUFDQTtBQUNEO0FBQ0Q7QUE1RGEsRUFBZjs7QUErREE7QUFDQXZFLEtBQUlDLElBQUo7QUFFQSxDQTFORCxJIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzc4NGU5MjUwNWMxYzE1MDE5MmEiLCJtb2R1bGUuZXhwb3J0cyA9IHJvdXRpZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJvdXRpZVwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gdHJhbnNwYXJlbmN5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidHJhbnNwYXJlbmN5XCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHRyYW5zcGFyZW5jeSBmcm9tICd0cmFuc3BhcmVuY3knO1xuaW1wb3J0IHJvdXRpZSBmcm9tICdyb3V0aWUnO1xuXG4oZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRjb25zdCBhcHAgPSB7XG5cdFx0Ly9TdGFydHMgYXBwIHdpdGggaW5pdGlhbGl6ZSB0aGUgcm91dGVyIGFuZCBnZXRzIHRoZSBkYXRhXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyb3V0ZXIuaW5pdCgpO1xuXHRcdFx0YXBpLmdldFBva2Vtb25zKCk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IHJvdXRlciA9IHtcblx0XHQvL1NldCB0aGUgcm91dGVyXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdHJvdXRpZSh7XG5cdFx0XHRcdCcnOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyb3V0aWUoJ2hvbWUnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0J2hvbWUnOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRzZWN0aW9ucy50b2dnbGUoJ2hvbWUnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0J3Bva2Vtb25zJzogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2VjdGlvbnMudG9nZ2xlKCdwb2tlbW9ucycpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQncG9rZW1vbnMvOm5hbWUnOiBmdW5jdGlvbihuYW1lKSB7XG5cdFx0XHRcdFx0YXBpLmdldFBva2Vtb25EZXRhaWwobmFtZSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdH07XG5cblx0Y29uc3Qgc2VjdGlvbnMgPSB7XG5cblx0XHR0b2dnbGU6IGZ1bmN0aW9uKHJvdXRlKSB7XG5cblx0XHRcdHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlY3Rpb24nKTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHQvL0lmIHRoZSBoYXNoIGlzIGVxdWFsIHRvIGFuIGlkIG9mIGEgc2VjdGlvbiBzaG93IHRoYXQgc2VjdGlvbi4gSWYgbm90IGhpZGUgaXQuXG5cdFx0XHRcdGlmIChlbGVtZW50c1tpXS5pZCA9PT0gcm91dGUpIHtcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cdFx0fSxcblxuXHR9O1xuXG5cdGNvbnN0IGFwaSA9IHtcblxuXHRcdC8vR2V0IHRoZSBkYXRhIGZyb20gdGhlIHBva2Vtb24gQVBJXG5cdFx0Z2V0UG9rZW1vbnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coJ1Bva2Vtb25zIHdvcmRlbiBnZWxhZGVuJyk7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHQvL1Nob3cgbG9hZGVyXG5cdFx0XHR2YXIgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcicpO1xuXHRcdFx0bG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuXHRcdFx0Ly9HZXQgdGhlIGRhdGFcblx0XHRcdGZldGNoKCdodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24/bGltaXQ9MTUxJywge1xuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRcdFx0bW9kZTogJ2NvcnMnLFxuXHRcdFx0XHRcdGNhY2hlOiAnZGVmYXVsdCdcblx0XHRcdFx0fSlcblx0XHRcdFx0Ly9SZXR1cm4gZGF0YSBhcyBqc29uXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdC8vQWRkIGFuIElEIHRvIGV2ZXJ5IG9iamVjdCB3aXRoIG1hcCBmdW5jdGlvblxuXHRcdFx0XHRcdHZhciBkYXRhT2JqZWN0ID0gZGF0YS5yZXN1bHRzLm1hcChmdW5jdGlvbihpLCBpbmRleCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0aWQ6IGluZGV4LFxuXHRcdFx0XHRcdFx0XHRuYW1lOiBpLm5hbWUsXG5cdFx0XHRcdFx0XHRcdHVybDogaS51cmxcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly9TYXZlIGRhdGEgaW4gbG9jYWwgc3RvcmFnZVxuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRhT2JqZWN0JywgSlNPTi5zdHJpbmdpZnkoZGF0YU9iamVjdCkpO1xuXHRcdFx0XHRcdC8vUmVtb3ZlIExvYWRlclxuXHRcdFx0XHRcdGxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcblx0XHRcdFx0XHQvL1JlbmRlciBwb2tlbW9uIG92ZXJ2aWV3XG5cdFx0XHRcdFx0cmVuZGVyLm92ZXJ2aWV3KGRhdGFPYmplY3QpO1xuXHRcdFx0XHRcdC8vSW5pdGlhbGl6ZSBpbnB1dCBtZXRob2Rcblx0XHRcdFx0XHRzZWxmLmdldElucHV0KGRhdGFPYmplY3QpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdQb2tlbW9ucyBnZWxhZGVuJyk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0XHRcdHNlY3Rpb25zLnRvZ2dsZSgnZXJyb3InKTtcblx0XHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdGdldFBva2Vtb25EZXRhaWw6IGZ1bmN0aW9uKG5hbWUpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdQb2tlbW9uIGRldGFpbCBwYWdpbmEgd29yZHQgZ2VsYWRlbicpO1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0Ly9TaG93IGxvYWRlclxuXHRcdFx0dmFyIGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZXInKTtcblx0XHRcdGxvYWRlci5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcblx0XHRcdC8vR2V0IGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2Vcblx0XHRcdHZhciBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YU9iamVjdCcpKTtcblxuXHRcdFx0Ly9HZXQgdGhlIG9iamVjdCB3aXRoIHRoZSBuYW1lIG9mIG5hbWUgb2YgdGhlIHBhcmFtZXRlciBhbmQgc2F2ZSBpdCBpbiB2YXJpYWJsZVxuXHRcdFx0dmFyIGRhdGFEZXRhaWwgPSBkYXRhLmZpbHRlcihmdW5jdGlvbihvYmopIHtcblx0XHRcdFx0aWYgKG9iai5uYW1lID09IG5hbWUpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvL0dldCBkYXRhIG9mIHRoZSBkZXRhaWwgb2JqZWN0XG5cdFx0XHRmZXRjaChkYXRhRGV0YWlsWzBdLnVybClcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0bG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuXHRcdFx0XHRcdHJlbmRlci5kZXRhaWwoZGF0YSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0XHRcdHNlY3Rpb25zLnRvZ2dsZSgnZXJyb3InKTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0XHRcdH0pO1xuXG5cblx0XHR9LFxuXG5cdFx0Z2V0SW5wdXQ6IGZ1bmN0aW9uKGRhdGFPYmplY3QpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdHZhciBzZWFyY2hGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpO1xuXHRcdFx0c2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0c2VsZi5maWx0ZXIodGhpcy52YWx1ZSwgZGF0YU9iamVjdCk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0ZmlsdGVyOiBmdW5jdGlvbih2YWx1ZSwgZGF0YU9iamVjdCkge1xuXHRcdFx0dmFyIGZpbHRlckRhdGEgPSBkYXRhT2JqZWN0LmZpbHRlcihmdW5jdGlvbihvYmopIHtcblx0XHRcdFx0aWYgKG9iai5uYW1lLmluY2x1ZGVzKHZhbHVlKSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmlsdGVyRGF0YTtcblx0XHRcdH0pO1xuXHRcdFx0cmVuZGVyLm92ZXJ2aWV3KGZpbHRlckRhdGEpO1xuXHRcdH1cblxuXHR9O1xuXG5cdGNvbnN0IHJlbmRlciA9IHtcblxuXHRcdG92ZXJ2aWV3OiBmdW5jdGlvbihkYXRhT2JqZWN0KSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFPYmplY3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGRpcmVjdGl2ZXMgPSB7XG5cdFx0XHRcdFx0bmFtZToge1xuXHRcdFx0XHRcdFx0dGV4dDogZnVuY3Rpb24ocGFyYW1zKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLm5hbWU7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bGluazoge1xuXHRcdFx0XHRcdFx0aHJlZjogZnVuY3Rpb24ocGFyYW1zKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBcIiNwb2tlbW9ucy9cIiArIHRoaXMubmFtZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGltZzoge1xuXHRcdFx0XHRcdFx0c3JjOiBmdW5jdGlvbihwYXJhbXMpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFwic3RhdGljL2ltZy9wb2tlbW9ucy9cIiArICh0aGlzLmlkICsgMSkgKyBcIi5wbmdcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHRcdFRyYW5zcGFyZW5jeS5yZW5kZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bva2Vtb25zIHVsJyksIGRhdGFPYmplY3QsIGRpcmVjdGl2ZXMpO1xuXHRcdFx0fVxuXG5cdFx0fSxcblx0XHRkZXRhaWw6IGZ1bmN0aW9uKGRhdGFPYmplY3QpIHtcblx0XHRcdHRoaXMuYmFja2dyb3VuZENvbG9yVG9nZ2xlKGRhdGFPYmplY3QpO1xuXG5cdFx0XHR2YXIgZGlyZWN0aXZlcyA9IHtcblx0XHRcdFx0aW1nOiB7XG5cdFx0XHRcdFx0c3JjOiBmdW5jdGlvbihwYXJhbXMpIHtcblx0XHRcdFx0XHRcdHJldHVybiBcInN0YXRpYy9pbWcvcG9rZW1vbnMvXCIgKyB0aGlzLmlkICsgXCIucG5nXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH07XG5cdFx0XHRUcmFuc3BhcmVuY3kucmVuZGVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb2tlbW9ucy1kZXRhaWwnKSwgZGF0YU9iamVjdCwgZGlyZWN0aXZlcyk7XG5cdFx0XHRzZWN0aW9ucy50b2dnbGUoJ3Bva2Vtb25zLWRldGFpbCcpO1xuXHRcdH0sXG5cblx0XHRiYWNrZ3JvdW5kQ29sb3JUb2dnbGU6IGZ1bmN0aW9uKGRhdGFPYmplY3QpIHtcblx0XHRcdHZhciBiYWNrZ3JvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwb2tlbW9ucy1kZXRhaWxcIik7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YU9iamVjdC50eXBlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoZGF0YU9iamVjdC50eXBlc1tpXS50eXBlLm5hbWUgPT0gXCJmaXJlXCIpIHtcblx0XHRcdFx0XHRiYWNrZ3JvdW5kLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0U2Mzk0NlwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGRhdGFPYmplY3QudHlwZXNbaV0udHlwZS5uYW1lID09IFwid2F0ZXJcIikge1xuXHRcdFx0XHRcdGJhY2tncm91bmQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNUJDMEVCXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZGF0YU9iamVjdC50eXBlc1tpXS50eXBlLm5hbWUgPT0gXCJncmFzc1wiKSB7XG5cdFx0XHRcdFx0YmFja2dyb3VuZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM5QkM1M0RcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChkYXRhT2JqZWN0LnR5cGVzW2ldLnR5cGUubmFtZSA9PSBcInBvaXNvblwiKSB7XG5cdFx0XHRcdFx0YmFja2dyb3VuZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMzRDMxNUJcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChkYXRhT2JqZWN0LnR5cGVzW2ldLnR5cGUubmFtZSA9PSBcIm5vcm1hbFwiKSB7XG5cdFx0XHRcdFx0YmFja2dyb3VuZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChkYXRhT2JqZWN0LnR5cGVzW2ldLnR5cGUubmFtZSA9PSBcImVsZWN0cmljXCIpIHtcblx0XHRcdFx0XHRiYWNrZ3JvdW5kLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0ZGRTA2NlwiO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJhY2tncm91bmQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMEIxMzJCXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0Ly9TdGFydCBhcHBcblx0YXBwLmluaXQoKTtcblxufSkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdGF0aWMvanMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9