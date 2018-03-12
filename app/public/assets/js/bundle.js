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
/******/ 	__webpack_require__.p = "/assets/js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
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

exports.default = sections;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sections = __webpack_require__(0);

var _sections2 = _interopRequireDefault(_sections);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _filter = __webpack_require__(6);

var _filter2 = _interopRequireDefault(_filter);

var _loader = __webpack_require__(7);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = {

	//Get the data from the pokemon API
	getPokemons: function getPokemons() {
		console.log('Pokemons worden geladen');
		//Show loader
		_loader2.default.show();
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
			_loader2.default.hide();
			//Render pokemon overview
			_render2.default.overview(dataObject);
			//Initialize input method
			_filter2.default.getInput(dataObject);
			console.log('Pokemons geladen');
		}).catch(function (error) {
			_sections2.default.toggle('error');
		});
	},

	getPokemonDetail: function getPokemonDetail(name) {
		console.log('Pokemon detail pagina wordt geladen');
		//Show loader
		_loader2.default.show();
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
			_loader2.default.hide();
			_render2.default.detail(data);
		}).catch(function (error) {
			_sections2.default.toggle('error');
			console.log(error);
		});
	}

};

exports.default = api;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sections = __webpack_require__(0);

var _sections2 = _interopRequireDefault(_sections);

var _background = __webpack_require__(5);

var _background2 = _interopRequireDefault(_background);

var _transparencyMin = __webpack_require__(9);

var _transparencyMin2 = _interopRequireDefault(_transparencyMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
						return "assets/img/pokemons/" + (this.id + 1) + ".png";
					}
				}
			};
			Transparency.render(document.querySelector('#pokemons ul'), dataObject, directives);
		}
	},
	detail: function detail(dataObject) {
		_background2.default.toggle(dataObject);

		var directives = {
			img: {
				src: function src(params) {
					return "assets/img/pokemons/" + this.id + ".png";
				}
			}

		};
		Transparency.render(document.querySelector('#pokemons-detail'), dataObject, directives);
		_sections2.default.toggle('pokemons-detail');
	}

};

exports.default = render;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sections = __webpack_require__(0);

var _sections2 = _interopRequireDefault(_sections);

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

var _routie = __webpack_require__(8);

var _routie2 = _interopRequireDefault(_routie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = {
	//Set the router
	init: function init() {

		(0, _routie2.default)({
			'': function _() {
				(0, _routie2.default)('home');
			},
			'home': function home() {
				_sections2.default.toggle('home');
			},
			'pokemons': function pokemons() {
				_sections2.default.toggle('pokemons');
			},
			'pokemons/:name': function pokemonsName(name) {
				_api2.default.getPokemonDetail(name);
			}
		});
	}

};

exports.default = router;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _router = __webpack_require__(3);

var _router2 = _interopRequireDefault(_router);

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	var app = {
		//Starts app with initialize the router and gets the data
		init: function init() {
			_router2.default.init();
			_api2.default.getPokemons();
		}
	};
	//Start app
	app.init();
})();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var background = {

	element: document.querySelector("#pokemons-detail"),

	toggle: function toggle(dataObject) {
		for (var i = 0; i < dataObject.types.length; i++) {
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

exports.default = background;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filter = {
	getInput: function getInput(dataObject) {
		var _this = this;

		var searchForm = document.querySelector('.search');
		searchForm.addEventListener('keyup', function (e) {
			return _this.filter(searchForm.value, dataObject);
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
		_render2.default.overview(filterData);
	}
};

exports.default = filter;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var loader = {
	element: document.querySelector('.loader'),
	show: function show() {
		this.element.classList.add("show");
	},
	hide: function hide() {
		this.element.classList.remove("show");
	}

};

exports.default = loader;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * routie - a tiny hash router
 * v0.3.2
 * http://projects.jga.me/routie
 * copyright Greg Allen 2016
 * MIT License
*/
var Routie = function Routie(w, isModule) {

  var routes = [];
  var map = {};
  var reference = "routie";
  var oldReference = w[reference];

  var Route = function Route(path, name) {
    this.name = name;
    this.path = path;
    this.keys = [];
    this.fns = [];
    this.params = {};
    this.regex = pathToRegexp(this.path, this.keys, false, false);
  };

  Route.prototype.addHandler = function (fn) {
    this.fns.push(fn);
  };

  Route.prototype.removeHandler = function (fn) {
    for (var i = 0, c = this.fns.length; i < c; i++) {
      var f = this.fns[i];
      if (fn == f) {
        this.fns.splice(i, 1);
        return;
      }
    }
  };

  Route.prototype.run = function (params) {
    for (var i = 0, c = this.fns.length; i < c; i++) {
      this.fns[i].apply(this, params);
    }
  };

  Route.prototype.match = function (path, params) {
    var m = this.regex.exec(path);

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = this.keys[i - 1];

      var val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];

      if (key) {
        this.params[key.name] = val;
      }
      params.push(val);
    }

    return true;
  };

  Route.prototype.toURL = function (params) {
    var path = this.path;
    for (var param in params) {
      path = path.replace('/:' + param, '/' + params[param]);
    }
    path = path.replace(/\/:.*\?/g, '/').replace(/\?/g, '');
    if (path.indexOf(':') != -1) {
      throw new Error('missing parameters for url: ' + path);
    }
    return path;
  };

  var pathToRegexp = function pathToRegexp(path, keys, sensitive, strict) {
    if (path instanceof RegExp) return path;
    if (path instanceof Array) path = '(' + path.join('|') + ')';
    path = path.concat(strict ? '' : '/?').replace(/\/\(/g, '(?:/').replace(/\+/g, '__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (_, slash, format, key, capture, optional) {
      keys.push({ name: key, optional: !!optional });
      slash = slash || '';
      return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || format && '([^/.]+?)' || '([^/]+?)') + ')' + (optional || '');
    }).replace(/([\/.])/g, '\\$1').replace(/__plus__/g, '(.+)').replace(/\*/g, '(.*)');
    return new RegExp('^' + path + '$', sensitive ? '' : 'i');
  };

  var addHandler = function addHandler(path, fn) {
    var s = path.split(' ');
    var name = s.length == 2 ? s[0] : null;
    path = s.length == 2 ? s[1] : s[0];

    if (!map[path]) {
      map[path] = new Route(path, name);
      routes.push(map[path]);
    }
    map[path].addHandler(fn);
  };

  var routie = function routie(path, fn) {
    if (typeof fn == 'function') {
      addHandler(path, fn);
      routie.reload();
    } else if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) == 'object') {
      for (var p in path) {
        addHandler(p, path[p]);
      }
      routie.reload();
    } else if (typeof fn === 'undefined') {
      routie.navigate(path);
    }
  };

  routie.lookup = function (name, obj) {
    for (var i = 0, c = routes.length; i < c; i++) {
      var route = routes[i];
      if (route.name == name) {
        return route.toURL(obj);
      }
    }
  };

  routie.remove = function (path, fn) {
    var route = map[path];
    if (!route) return;
    route.removeHandler(fn);
  };

  routie.removeAll = function () {
    map = {};
    routes = [];
  };

  routie.navigate = function (path, options) {
    options = options || {};
    var silent = options.silent || false;

    if (silent) {
      removeListener();
    }
    setTimeout(function () {
      window.location.hash = path;

      if (silent) {
        setTimeout(function () {
          addListener();
        }, 1);
      }
    }, 1);
  };

  routie.noConflict = function () {
    w[reference] = oldReference;
    return routie;
  };

  var getHash = function getHash() {
    return window.location.hash.substring(1);
  };

  var checkRoute = function checkRoute(hash, route) {
    var params = [];
    if (route.match(hash, params)) {
      route.run(params);
      return true;
    }
    return false;
  };

  var hashChanged = routie.reload = function () {
    var hash = getHash();
    for (var i = 0, c = routes.length; i < c; i++) {
      var route = routes[i];
      if (checkRoute(hash, route)) {
        return;
      }
    }
  };

  var addListener = function addListener() {
    if (w.addEventListener) {
      w.addEventListener('hashchange', hashChanged, false);
    } else {
      w.attachEvent('onhashchange', hashChanged);
    }
  };

  var removeListener = function removeListener() {
    if (w.removeEventListener) {
      w.removeEventListener('hashchange', hashChanged);
    } else {
      w.detachEvent('onhashchange', hashChanged);
    }
  };
  addListener();

  if (isModule) {
    return routie;
  } else {
    w[reference] = routie;
  }
};

if (false) {
  Routie(window);
} else {
  module.exports = Routie(window, true);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var require;var require;var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function t(e, n, r) {
  function i(s, u) {
    if (!n[s]) {
      if (!e[s]) {
        var l = "function" == typeof require && require;if (!u && l) return require(s, !0);if (o) return o(s, !0);var a = new Error("Cannot find module '" + s + "'");throw a.code = "MODULE_NOT_FOUND", a;
      }var h = n[s] = { exports: {} };e[s][0].call(h.exports, function (t) {
        var n = e[s][1][t];return i(n ? n : t);
      }, h, h.exports, t, e, n, r);
    }return n[s].exports;
  }for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) {
    i(r[s]);
  }return i;
}({ 1: [function (t, e, n) {
    var r,
        i,
        o,
        s,
        u,
        l = [].indexOf || function (t) {
      for (var e = 0, n = this.length; n > e; e++) {
        if (e in this && this[e] === t) return e;
      }return -1;
    };s = t("../lib/lodash.js"), u = t("./helpers"), i = t("./context"), o = {}, o.render = function (t, e, n, r) {
      var l, a;return null == e && (e = []), null == n && (n = {}), null == r && (r = {}), a = r.debug && console ? u.consoleLogger : u.nullLogger, a("Transparency.render:", t, e, n, r), t ? (s.isArray(e) || (e = [e]), t = (l = u.data(t)).context || (l.context = new i(t, o)), t.render(e, n, r).el) : void 0;
    }, o.matcher = function (t, e) {
      return t.el.id === e || l.call(t.classNames, e) >= 0 || t.el.name === e || t.el.getAttribute("data-bind") === e;
    }, o.clone = function (t) {
      return r(t).clone()[0];
    }, o.jQueryPlugin = u.chainable(function (t, e, n) {
      var r, i, s, u;for (u = [], i = 0, s = this.length; s > i; i++) {
        r = this[i], u.push(o.render(r, t, e, n));
      }return u;
    }), ("undefined" != typeof jQuery && null !== jQuery || "undefined" != typeof Zepto && null !== Zepto) && (r = jQuery || Zepto, null != r && (r.fn.render = o.jQueryPlugin)), ("undefined" != typeof e && null !== e ? e.exports : void 0) && (e.exports = o), "undefined" != typeof window && null !== window && (window.Transparency = o), ("undefined" != "function" && null !== __webpack_require__(10) ? __webpack_require__(11) : void 0) && !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return o;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }, { "../lib/lodash.js": 7, "./context": 3, "./helpers": 5 }], 2: [function (t, e, n) {
    var r,
        i,
        o,
        s,
        u,
        l,
        a,
        h,
        c = function c(t, e) {
      function n() {
        this.constructor = t;
      }for (var r in e) {
        p.call(e, r) && (t[r] = e[r]);
      }return n.prototype = e.prototype, t.prototype = new n(), t.__super__ = e.prototype, t;
    },
        p = {}.hasOwnProperty;a = t("../lib/lodash"), h = t("./helpers"), e.exports = i = { Attributes: {}, createAttribute: function createAttribute(t, e) {
        var n;return new (n = i.Attributes[e] || r)(t, e);
      } }, r = function () {
      function t(t, e) {
        this.el = t, this.name = e, this.templateValue = this.el.getAttribute(this.name) || "";
      }return t.prototype.set = function (t) {
        return this.el[this.name] = t, this.el.setAttribute(this.name, t.toString());
      }, t;
    }(), o = function (t) {
      function e(t, e) {
        this.el = t, this.name = e, this.templateValue = this.el.getAttribute(this.name) || !1;
      }var n, r, o, s;for (c(e, t), n = ["hidden", "async", "defer", "autofocus", "formnovalidate", "disabled", "autofocus", "formnovalidate", "multiple", "readonly", "required", "checked", "scoped", "reversed", "selected", "loop", "muted", "autoplay", "controls", "seamless", "default", "ismap", "novalidate", "open", "typemustmatch", "truespeed"], r = 0, o = n.length; o > r; r++) {
        s = n[r], i.Attributes[s] = e;
      }return e.prototype.set = function (t) {
        return this.el[this.name] = t, t ? this.el.setAttribute(this.name, this.name) : this.el.removeAttribute(this.name);
      }, e;
    }(r), l = function (t) {
      function e(t, e) {
        var n;this.el = t, this.name = e, this.templateValue = function () {
          var t, e, r, i;for (r = this.el.childNodes, i = [], t = 0, e = r.length; e > t; t++) {
            n = r[t], n.nodeType === h.TEXT_NODE && i.push(n.nodeValue);
          }return i;
        }.call(this).join(""), this.children = a.toArray(this.el.children), (this.textNode = this.el.firstChild) ? this.textNode.nodeType !== h.TEXT_NODE && (this.textNode = this.el.insertBefore(this.el.ownerDocument.createTextNode(""), this.textNode)) : this.el.appendChild(this.textNode = this.el.ownerDocument.createTextNode(""));
      }return c(e, t), i.Attributes.text = e, e.prototype.set = function (t) {
        for (var e, n, r, i, o; e = this.el.firstChild;) {
          this.el.removeChild(e);
        }for (this.textNode.nodeValue = t, this.el.appendChild(this.textNode), i = this.children, o = [], n = 0, r = i.length; r > n; n++) {
          e = i[n], o.push(this.el.appendChild(e));
        }return o;
      }, e;
    }(r), u = function (t) {
      function e(t) {
        this.el = t, this.templateValue = "", this.children = a.toArray(this.el.children);
      }return c(e, t), i.Attributes.html = e, e.prototype.set = function (t) {
        for (var e, n, r, i, o; e = this.el.firstChild;) {
          this.el.removeChild(e);
        }for (this.el.innerHTML = t + this.templateValue, i = this.children, o = [], n = 0, r = i.length; r > n; n++) {
          e = i[n], o.push(this.el.appendChild(e));
        }return o;
      }, e;
    }(r), s = function (t) {
      function e(t) {
        e.__super__.constructor.call(this, t, "class");
      }return c(e, t), i.Attributes["class"] = e, e;
    }(r);
  }, { "../lib/lodash": 7, "./helpers": 5 }], 3: [function (t, e, n) {
    var r, i, o, s, u, l, a;a = t("./helpers"), s = a.before, o = a.after, u = a.chainable, l = a.cloneNode, i = t("./instance"), e.exports = r = function () {
      function t(t, e) {
        this.el = t, this.Transparency = e, this.template = l(this.el), this.instances = [new i(this.el, this.Transparency)], this.instanceCache = [];
      }var e, n;return n = u(function () {
        return this.parent = this.el.parentNode, this.parent ? (this.nextSibling = this.el.nextSibling, this.parent.removeChild(this.el)) : void 0;
      }), e = u(function () {
        return this.parent ? this.nextSibling ? this.parent.insertBefore(this.el, this.nextSibling) : this.parent.appendChild(this.el) : void 0;
      }), t.prototype.render = s(n)(o(e)(u(function (t, e, n) {
        for (var r, o, s, u, a, h, c; t.length < this.instances.length;) {
          this.instanceCache.push(this.instances.pop().remove());
        }for (; t.length > this.instances.length;) {
          u = this.instanceCache.pop() || new i(l(this.template), this.Transparency), this.instances.push(u.appendTo(this.el));
        }for (c = [], s = o = 0, a = t.length; a > o; s = ++o) {
          h = t[s], u = this.instances[s], r = [], c.push(u.prepare(h, r).renderValues(h, r).renderDirectives(h, s, e).renderChildren(h, r, e, n));
        }return c;
      }))), t;
    }();
  }, { "./helpers": 5, "./instance": 6 }], 4: [function (t, e, n) {
    var r,
        i,
        o,
        s,
        u,
        l,
        a,
        h,
        c,
        p,
        f,
        d = {}.hasOwnProperty,
        m = function m(t, e) {
      function n() {
        this.constructor = t;
      }for (var r in e) {
        d.call(e, r) && (t[r] = e[r]);
      }return n.prototype = e.prototype, t.prototype = new n(), t.__super__ = e.prototype, t;
    };p = t("../lib/lodash.js"), f = t("./helpers"), r = t("./attributeFactory"), e.exports = s = { Elements: { input: {} }, createElement: function createElement(t) {
        var e, n;return new (e = "input" === (n = t.nodeName.toLowerCase()) ? s.Elements[n][t.type.toLowerCase()] || u : s.Elements[n] || o)(t);
      } }, o = function () {
      function t(t) {
        this.el = t, this.attributes = {}, this.childNodes = p.toArray(this.el.childNodes), this.nodeName = this.el.nodeName.toLowerCase(), this.classNames = this.el.className.split(" "), this.originalAttributes = {};
      }return t.prototype.empty = function () {
        for (var t; t = this.el.firstChild;) {
          this.el.removeChild(t);
        }return this;
      }, t.prototype.reset = function () {
        var t, e, n, r;n = this.attributes, r = [];for (e in n) {
          t = n[e], r.push(t.set(t.templateValue));
        }return r;
      }, t.prototype.render = function (t) {
        return this.attr("text", t);
      }, t.prototype.attr = function (t, e) {
        var n, i;return n = (i = this.attributes)[t] || (i[t] = r.createAttribute(this.el, t, e)), null != e && n.set(e), n;
      }, t.prototype.renderDirectives = function (t, e, n) {
        var r, i, o, s;o = [];for (i in n) {
          d.call(n, i) && (r = n[i], "function" == typeof r && (s = r.call(t, { element: this.el, index: e, value: this.attr(i).templateValue }), null != s ? o.push(this.attr(i, s)) : o.push(void 0)));
        }return o;
      }, t;
    }(), a = function (t) {
      function e(t) {
        e.__super__.constructor.call(this, t), this.elements = f.getElements(t);
      }return m(e, t), s.Elements.select = e, e.prototype.render = function (t) {
        var e, n, r, i, o;for (t = t.toString(), i = this.elements, o = [], e = 0, n = i.length; n > e; e++) {
          r = i[e], "option" === r.nodeName && o.push(r.attr("selected", r.el.value === t));
        }return o;
      }, e;
    }(o), c = function (t) {
      function e() {
        return e.__super__.constructor.apply(this, arguments);
      }var n, r, i, o;for (m(e, t), n = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"], r = 0, i = n.length; i > r; r++) {
        o = n[r], s.Elements[o] = e;
      }return e.prototype.attr = function (t, n) {
        return "text" !== t && "html" !== t ? e.__super__.attr.call(this, t, n) : void 0;
      }, e;
    }(o), u = function (t) {
      function e() {
        return e.__super__.constructor.apply(this, arguments);
      }return m(e, t), e.prototype.render = function (t) {
        return this.attr("value", t);
      }, e;
    }(c), h = function (t) {
      function e() {
        return e.__super__.constructor.apply(this, arguments);
      }return m(e, t), s.Elements.textarea = e, e;
    }(u), i = function (t) {
      function e() {
        return e.__super__.constructor.apply(this, arguments);
      }return m(e, t), s.Elements.input.checkbox = e, e.prototype.render = function (t) {
        return this.attr("checked", Boolean(t));
      }, e;
    }(u), l = function (t) {
      function e() {
        return e.__super__.constructor.apply(this, arguments);
      }return m(e, t), s.Elements.input.radio = e, e;
    }(i);
  }, { "../lib/lodash.js": 7, "./attributeFactory": 2, "./helpers": 5 }], 5: [function (t, e, n) {
    var r, _i, o, s;r = t("./elementFactory"), n.before = function (t) {
      return function (e) {
        return function () {
          return t.apply(this, arguments), e.apply(this, arguments);
        };
      };
    }, n.after = function (t) {
      return function (e) {
        return function () {
          return e.apply(this, arguments), t.apply(this, arguments);
        };
      };
    }, n.chainable = n.after(function () {
      return this;
    }), n.onlyWith$ = function (t) {
      return "undefined" != typeof jQuery && null !== jQuery || "undefined" != typeof Zepto && null !== Zepto ? function (e) {
        return t(arguments);
      }(jQuery || Zepto) : void 0;
    }, n.getElements = function (t) {
      var e;return e = [], _i(t, e), e;
    }, _i = function i(t, e) {
      var o, s;for (o = t.firstChild, s = []; o;) {
        o.nodeType === n.ELEMENT_NODE && (e.push(new r.createElement(o)), _i(o, e)), s.push(o = o.nextSibling);
      }return s;
    }, n.ELEMENT_NODE = 1, n.TEXT_NODE = 3, s = function s() {
      return "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML;
    }, n.cloneNode = "undefined" == typeof document || null === document || s() ? function (t) {
      return t.cloneNode(!0);
    } : function (t) {
      var e, r, i, s, u;if (e = Transparency.clone(t), e.nodeType === n.ELEMENT_NODE) for (e.removeAttribute(o), u = e.getElementsByTagName("*"), i = 0, s = u.length; s > i; i++) {
        r = u[i], r.removeAttribute(o);
      }return e;
    }, o = "transparency", n.data = function (t) {
      return t[o] || (t[o] = {});
    }, n.nullLogger = function () {}, n.consoleLogger = function () {
      return console.log(arguments);
    }, n.log = n.nullLogger;
  }, { "./elementFactory": 4 }], 6: [function (t, e, n) {
    var r,
        i,
        o,
        s,
        u = {}.hasOwnProperty;i = t("../lib/lodash.js"), o = (s = t("./helpers")).chainable, e.exports = r = function () {
      function t(t, e) {
        this.Transparency = e, this.queryCache = {}, this.childNodes = i.toArray(t.childNodes), this.elements = s.getElements(t);
      }return t.prototype.remove = o(function () {
        var t, e, n, r, i;for (r = this.childNodes, i = [], t = 0, e = r.length; e > t; t++) {
          n = r[t], i.push(n.parentNode.removeChild(n));
        }return i;
      }), t.prototype.appendTo = o(function (t) {
        var e, n, r, i, o;for (i = this.childNodes, o = [], e = 0, n = i.length; n > e; e++) {
          r = i[e], o.push(t.appendChild(r));
        }return o;
      }), t.prototype.prepare = o(function (t) {
        var e, n, r, i, o;for (i = this.elements, o = [], n = 0, r = i.length; r > n; n++) {
          e = i[n], e.reset(), o.push(s.data(e.el).model = t);
        }return o;
      }), t.prototype.renderValues = o(function (t, e) {
        var n, r, o, s;if (i.isElement(t) && (n = this.elements[0])) return n.empty().el.appendChild(t);if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
          o = [];for (r in t) {
            u.call(t, r) && (s = t[r], null != s && (i.isString(s) || i.isNumber(s) || i.isBoolean(s) || i.isDate(s) ? o.push(function () {
              var t, e, i, o;for (i = this.matchingElements(r), o = [], t = 0, e = i.length; e > t; t++) {
                n = i[t], o.push(n.render(s));
              }return o;
            }.call(this)) : "object" == (typeof s === "undefined" ? "undefined" : _typeof(s)) ? o.push(e.push(r)) : o.push(void 0)));
          }return o;
        }
      }), t.prototype.renderDirectives = o(function (t, e, n) {
        var r, i, o, s;s = [];for (o in n) {
          u.call(n, o) && (r = n[o], "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && (t = { value: t }), s.push(function () {
            var n, s, u, l;for (u = this.matchingElements(o), l = [], n = 0, s = u.length; s > n; n++) {
              i = u[n], l.push(i.renderDirectives(t, e, r));
            }return l;
          }.call(this))));
        }return s;
      }), t.prototype.renderChildren = o(function (t, e, n, r) {
        var i, o, s, u, l;for (l = [], o = 0, u = e.length; u > o; o++) {
          s = e[o], l.push(function () {
            var e, o, u, l;for (u = this.matchingElements(s), l = [], e = 0, o = u.length; o > e; e++) {
              i = u[e], l.push(this.Transparency.render(i.el, t[s], n[s], r));
            }return l;
          }.call(this));
        }return l;
      }), t.prototype.matchingElements = function (t) {
        var e, n, r;return r = (e = this.queryCache)[t] || (e[t] = function () {
          var e, r, i, o;for (i = this.elements, o = [], e = 0, r = i.length; r > e; e++) {
            n = i[e], this.Transparency.matcher(n, t) && o.push(n);
          }return o;
        }.call(this)), s.log("Matching elements for '" + t + "':", r), r;
      }, t;
    }();
  }, { "../lib/lodash.js": 7, "./helpers": 5 }], 7: [function (t, e, n) {
    var r = {};r.toString = Object.prototype.toString, r.toArray = function (t) {
      for (var e = new Array(t.length), n = 0; n < t.length; n++) {
        e[n] = t[n];
      }return e;
    }, r.isString = function (t) {
      return "[object String]" == r.toString.call(t);
    }, r.isNumber = function (t) {
      return "[object Number]" == r.toString.call(t);
    }, r.isArray = Array.isArray || function (t) {
      return "[object Array]" === r.toString.call(t);
    }, r.isDate = function (t) {
      return "[object Date]" === r.toString.call(t);
    }, r.isElement = function (t) {
      return !(!t || 1 !== t.nodeType);
    }, r.isPlainValue = function (t) {
      var e;return e = typeof t === "undefined" ? "undefined" : _typeof(t), "object" !== e && "function" !== e || n.isDate(t);
    }, r.isBoolean = function (t) {
      return t === !0 || t === !1;
    }, e.exports = r;
  }, {}] }, {}, [1]);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTVkMDMwNWJjYjBhNjc2M2MxOWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvc2VjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL3JlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy92ZW5kb3Ivcm91dGllLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL3ZlbmRvci90cmFuc3BhcmVuY3kubWluLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyJdLCJuYW1lcyI6WyJzZWN0aW9ucyIsInRvZ2dsZSIsInJvdXRlIiwiZWxlbWVudHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwibGVuZ3RoIiwiaWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJhcGkiLCJnZXRQb2tlbW9ucyIsImNvbnNvbGUiLCJsb2ciLCJzaG93IiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiY2FjaGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YU9iamVjdCIsImRhdGEiLCJyZXN1bHRzIiwibWFwIiwiaW5kZXgiLCJuYW1lIiwidXJsIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoaWRlIiwib3ZlcnZpZXciLCJnZXRJbnB1dCIsImNhdGNoIiwiZ2V0UG9rZW1vbkRldGFpbCIsInBhcnNlIiwiZ2V0SXRlbSIsImRhdGFEZXRhaWwiLCJmaWx0ZXIiLCJvYmoiLCJkZXRhaWwiLCJlcnJvciIsInJlbmRlciIsImRpcmVjdGl2ZXMiLCJ0ZXh0IiwicGFyYW1zIiwibGluayIsImhyZWYiLCJpbWciLCJzcmMiLCJUcmFuc3BhcmVuY3kiLCJxdWVyeVNlbGVjdG9yIiwicm91dGVyIiwiaW5pdCIsImFwcCIsImJhY2tncm91bmQiLCJlbGVtZW50IiwidHlwZXMiLCJ0eXBlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzZWFyY2hGb3JtIiwiYWRkRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwiZmlsdGVyRGF0YSIsImluY2x1ZGVzIiwibG9hZGVyIiwiUm91dGllIiwidyIsImlzTW9kdWxlIiwicm91dGVzIiwicmVmZXJlbmNlIiwib2xkUmVmZXJlbmNlIiwiUm91dGUiLCJwYXRoIiwia2V5cyIsImZucyIsInJlZ2V4IiwicGF0aFRvUmVnZXhwIiwicHJvdG90eXBlIiwiYWRkSGFuZGxlciIsImZuIiwicHVzaCIsInJlbW92ZUhhbmRsZXIiLCJjIiwiZiIsInNwbGljZSIsInJ1biIsImFwcGx5IiwibWF0Y2giLCJtIiwiZXhlYyIsImxlbiIsImtleSIsInZhbCIsImRlY29kZVVSSUNvbXBvbmVudCIsInRvVVJMIiwicGFyYW0iLCJyZXBsYWNlIiwiaW5kZXhPZiIsIkVycm9yIiwic2Vuc2l0aXZlIiwic3RyaWN0IiwiUmVnRXhwIiwiQXJyYXkiLCJqb2luIiwiY29uY2F0IiwiXyIsInNsYXNoIiwiZm9ybWF0IiwiY2FwdHVyZSIsIm9wdGlvbmFsIiwicyIsInNwbGl0Iiwicm91dGllIiwicmVsb2FkIiwicCIsIm5hdmlnYXRlIiwibG9va3VwIiwicmVtb3ZlQWxsIiwib3B0aW9ucyIsInNpbGVudCIsInJlbW92ZUxpc3RlbmVyIiwic2V0VGltZW91dCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaGFzaCIsImFkZExpc3RlbmVyIiwibm9Db25mbGljdCIsImdldEhhc2giLCJzdWJzdHJpbmciLCJjaGVja1JvdXRlIiwiaGFzaENoYW5nZWQiLCJhdHRhY2hFdmVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZXRhY2hFdmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0IiwiZSIsIm4iLCJyIiwidSIsImwiLCJyZXF1aXJlIiwibyIsImEiLCJjb2RlIiwiaCIsImNhbGwiLCJkZWJ1ZyIsImNvbnNvbGVMb2dnZXIiLCJudWxsTG9nZ2VyIiwiaXNBcnJheSIsImNvbnRleHQiLCJlbCIsIm1hdGNoZXIiLCJjbGFzc05hbWVzIiwiZ2V0QXR0cmlidXRlIiwiY2xvbmUiLCJqUXVlcnlQbHVnaW4iLCJjaGFpbmFibGUiLCJqUXVlcnkiLCJaZXB0byIsImNvbnN0cnVjdG9yIiwiX19zdXBlcl9fIiwiaGFzT3duUHJvcGVydHkiLCJBdHRyaWJ1dGVzIiwiY3JlYXRlQXR0cmlidXRlIiwidGVtcGxhdGVWYWx1ZSIsInNldCIsInNldEF0dHJpYnV0ZSIsInRvU3RyaW5nIiwicmVtb3ZlQXR0cmlidXRlIiwiY2hpbGROb2RlcyIsIm5vZGVUeXBlIiwiVEVYVF9OT0RFIiwibm9kZVZhbHVlIiwiY2hpbGRyZW4iLCJ0b0FycmF5IiwidGV4dE5vZGUiLCJmaXJzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwib3duZXJEb2N1bWVudCIsImNyZWF0ZVRleHROb2RlIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVDaGlsZCIsImh0bWwiLCJpbm5lckhUTUwiLCJiZWZvcmUiLCJhZnRlciIsImNsb25lTm9kZSIsInRlbXBsYXRlIiwiaW5zdGFuY2VzIiwiaW5zdGFuY2VDYWNoZSIsInBhcmVudCIsInBhcmVudE5vZGUiLCJuZXh0U2libGluZyIsInBvcCIsImFwcGVuZFRvIiwicHJlcGFyZSIsInJlbmRlclZhbHVlcyIsInJlbmRlckRpcmVjdGl2ZXMiLCJyZW5kZXJDaGlsZHJlbiIsImQiLCJFbGVtZW50cyIsImlucHV0IiwiY3JlYXRlRWxlbWVudCIsIm5vZGVOYW1lIiwidG9Mb3dlckNhc2UiLCJhdHRyaWJ1dGVzIiwiY2xhc3NOYW1lIiwib3JpZ2luYWxBdHRyaWJ1dGVzIiwiZW1wdHkiLCJyZXNldCIsImF0dHIiLCJnZXRFbGVtZW50cyIsInNlbGVjdCIsImFyZ3VtZW50cyIsInRleHRhcmVhIiwiY2hlY2tib3giLCJCb29sZWFuIiwicmFkaW8iLCJvbmx5V2l0aCQiLCJFTEVNRU5UX05PREUiLCJvdXRlckhUTUwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInF1ZXJ5Q2FjaGUiLCJtb2RlbCIsImlzRWxlbWVudCIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc0Jvb2xlYW4iLCJpc0RhdGUiLCJtYXRjaGluZ0VsZW1lbnRzIiwiT2JqZWN0IiwiaXNQbGFpblZhbHVlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUEsSUFBTUEsV0FBVzs7QUFFaEJDLFNBQVEsZ0JBQVNDLEtBQVQsRUFBZ0I7O0FBRXZCLE1BQU1DLFdBQVdDLFNBQVNDLGdCQUFULENBQTBCLFNBQTFCLENBQWpCOztBQUVBLE9BQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxTQUFTSSxNQUE3QixFQUFxQ0QsR0FBckMsRUFBMEM7QUFDekM7QUFDQSxPQUFJSCxTQUFTRyxDQUFU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S0FBN2lCLEVBQThpQkcsRUFBRTJGLFNBQUYsR0FBWSxVQUFTOUYsQ0FBVCxFQUFXO0FBQUMsYUFBT0EsTUFBSSxDQUFDLENBQUwsSUFBUUEsTUFBSSxDQUFDLENBQXBCO0FBQXNCLEtBQTVsQixFQUE2bEJDLEVBQUVGLE9BQUYsR0FBVUksQ0FBdm1CO0FBQXltQixHQUFub0IsRUFBb29CLEVBQXBvQixDQUF6dFYsRUFBcmIsRUFBdXhYLEVBQXZ4WCxFQUEweFgsQ0FBQyxDQUFELENBQTF4WCxDQUFELEM7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL2pzXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTVkMDMwNWJjYjBhNjc2M2MxOWMiLCJjb25zdCBzZWN0aW9ucyA9IHtcblxuXHR0b2dnbGU6IGZ1bmN0aW9uKHJvdXRlKSB7XG5cblx0XHRjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlY3Rpb24nKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdC8vSWYgdGhlIGhhc2ggaXMgZXF1YWwgdG8gYW4gaWQgb2YgYSBzZWN0aW9uIHNob3cgdGhhdCBzZWN0aW9uLiBJZiBub3QgaGlkZSBpdC5cblx0XHRcdGlmIChlbGVtZW50c1tpXS5pZCA9PT0gcm91dGUpIHtcblx0XHRcdFx0ZWxlbWVudHNbaV0uY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50c1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcblx0XHRcdH1cblxuXHRcdH1cblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VjdGlvbnM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9zZWN0aW9ucy5qcyIsImltcG9ydCBzZWN0aW9ucyBmcm9tICcuL3NlY3Rpb25zJztcbmltcG9ydCByZW5kZXIgZnJvbSAnLi9yZW5kZXInO1xuaW1wb3J0IGZpbHRlciBmcm9tICcuL2ZpbHRlcic7XG5pbXBvcnQgbG9hZGVyIGZyb20gJy4vbG9hZGVyJztcblxuY29uc3QgYXBpID0ge1xuXG5cdC8vR2V0IHRoZSBkYXRhIGZyb20gdGhlIHBva2Vtb24gQVBJXG5cdGdldFBva2Vtb25zOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZygnUG9rZW1vbnMgd29yZGVuIGdlbGFkZW4nKTtcblx0XHQvL1Nob3cgbG9hZGVyXG5cdFx0bG9hZGVyLnNob3coKTtcblx0XHQvL0dldCB0aGUgZGF0YVxuXHRcdGZldGNoKCdodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24/bGltaXQ9MTUxJywge1xuXHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0XHRtb2RlOiAnY29ycycsXG5cdFx0XHRcdGNhY2hlOiAnZGVmYXVsdCdcblx0XHRcdH0pXG5cdFx0XHQvL1JldHVybiBkYXRhIGFzIGpzb25cblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblxuXHRcdFx0LnRoZW4oZGF0YSA9PiB7XG5cdFx0XHRcdC8vQWRkIGFuIElEIHRvIGV2ZXJ5IG9iamVjdCB3aXRoIG1hcCBmdW5jdGlvblxuXHRcdFx0XHRjb25zdCBkYXRhT2JqZWN0ID0gZGF0YS5yZXN1bHRzLm1hcCgoaSwgaW5kZXgpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0aWQ6IGluZGV4LFxuXHRcdFx0XHRcdFx0bmFtZTogaS5uYW1lLFxuXHRcdFx0XHRcdFx0dXJsOiBpLnVybFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQvL1NhdmUgZGF0YSBpbiBsb2NhbCBzdG9yYWdlXG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRhT2JqZWN0JywgSlNPTi5zdHJpbmdpZnkoZGF0YU9iamVjdCkpO1xuXHRcdFx0XHQvL1JlbW92ZSBMb2FkZXJcblx0XHRcdFx0bG9hZGVyLmhpZGUoKTtcblx0XHRcdFx0Ly9SZW5kZXIgcG9rZW1vbiBvdmVydmlld1xuXHRcdFx0XHRyZW5kZXIub3ZlcnZpZXcoZGF0YU9iamVjdCk7XG5cdFx0XHRcdC8vSW5pdGlhbGl6ZSBpbnB1dCBtZXRob2Rcblx0XHRcdFx0ZmlsdGVyLmdldElucHV0KGRhdGFPYmplY3QpO1xuXHRcdFx0XHRjb25zb2xlLmxvZygnUG9rZW1vbnMgZ2VsYWRlbicpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdHNlY3Rpb25zLnRvZ2dsZSgnZXJyb3InKTtcblx0XHRcdH0pO1xuXHR9LFxuXG5cdGdldFBva2Vtb25EZXRhaWw6IGZ1bmN0aW9uKG5hbWUpIHtcblx0XHRjb25zb2xlLmxvZygnUG9rZW1vbiBkZXRhaWwgcGFnaW5hIHdvcmR0IGdlbGFkZW4nKTtcblx0XHQvL1Nob3cgbG9hZGVyXG5cdFx0bG9hZGVyLnNob3coKTtcblx0XHQvL0dldCBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXG5cdFx0Y29uc3QgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGFPYmplY3QnKSk7XG5cblx0XHQvL0dldCB0aGUgb2JqZWN0IHdpdGggdGhlIG5hbWUgb2YgbmFtZSBvZiB0aGUgcGFyYW1ldGVyIGFuZCBzYXZlIGl0IGluIHZhcmlhYmxlXG5cdFx0Y29uc3QgZGF0YURldGFpbCA9IGRhdGEuZmlsdGVyKG9iaiA9PiB7XG5cdFx0XHRpZiAob2JqLm5hbWUgPT0gbmFtZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vR2V0IGRhdGEgb2YgdGhlIGRldGFpbCBvYmplY3Rcblx0XHRmZXRjaChkYXRhRGV0YWlsWzBdLnVybClcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHRcdC50aGVuKGRhdGEgPT4ge1xuXHRcdFx0XHRsb2FkZXIuaGlkZSgpO1xuXHRcdFx0XHRyZW5kZXIuZGV0YWlsKGRhdGEpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdHNlY3Rpb25zLnRvZ2dsZSgnZXJyb3InKTtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdFx0fSk7XG5cblxuXHR9LFxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhcGk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9hcGkuanMiLCJpbXBvcnQgc2VjdGlvbnMgZnJvbSAnLi9zZWN0aW9ucyc7XG5pbXBvcnQgYmFja2dyb3VuZCBmcm9tICcuL2JhY2tncm91bmQnO1xuaW1wb3J0IHRyYW5zcGFyZW5jeSBmcm9tICcuL3ZlbmRvci90cmFuc3BhcmVuY3kubWluLmpzJztcblxuY29uc3QgcmVuZGVyID0ge1xuXG5cdG92ZXJ2aWV3OiBmdW5jdGlvbihkYXRhT2JqZWN0KSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhT2JqZWN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBkaXJlY3RpdmVzID0ge1xuXHRcdFx0XHRuYW1lOiB7XG5cdFx0XHRcdFx0dGV4dDogZnVuY3Rpb24ocGFyYW1zKSAge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMubmFtZTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRsaW5rOiB7XG5cdFx0XHRcdFx0aHJlZjogZnVuY3Rpb24ocGFyYW1zKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gXCIjcG9rZW1vbnMvXCIgKyB0aGlzLm5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpbWc6IHtcblx0XHRcdFx0XHRzcmM6IGZ1bmN0aW9uKHBhcmFtcykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFwiYXNzZXRzL2ltZy9wb2tlbW9ucy9cIiArICh0aGlzLmlkICsgMSkgKyBcIi5wbmdcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRUcmFuc3BhcmVuY3kucmVuZGVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb2tlbW9ucyB1bCcpLCBkYXRhT2JqZWN0LCBkaXJlY3RpdmVzKTtcblx0XHR9XG5cblx0fSxcblx0ZGV0YWlsOiBmdW5jdGlvbihkYXRhT2JqZWN0KSB7XG5cdFx0YmFja2dyb3VuZC50b2dnbGUoZGF0YU9iamVjdCk7XG5cblx0XHR2YXIgZGlyZWN0aXZlcyA9IHtcblx0XHRcdGltZzoge1xuXHRcdFx0XHRzcmM6IGZ1bmN0aW9uKHBhcmFtcykge1xuXHRcdFx0XHRcdHJldHVybiBcImFzc2V0cy9pbWcvcG9rZW1vbnMvXCIgKyB0aGlzLmlkICsgXCIucG5nXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH07XG5cdFx0VHJhbnNwYXJlbmN5LnJlbmRlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9rZW1vbnMtZGV0YWlsJyksIGRhdGFPYmplY3QsIGRpcmVjdGl2ZXMpO1xuXHRcdHNlY3Rpb25zLnRvZ2dsZSgncG9rZW1vbnMtZGV0YWlsJyk7XG5cdH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL3JlbmRlci5qcyIsImltcG9ydCBzZWN0aW9ucyBmcm9tICcuL3NlY3Rpb25zLmpzJztcbmltcG9ydCBhcGkgZnJvbSAnLi9hcGkuanMnO1xuaW1wb3J0IHJvdXRpZSBmcm9tICcuL3ZlbmRvci9yb3V0aWUuanMnO1xuXG5jb25zdCByb3V0ZXIgPSB7XG5cdC8vU2V0IHRoZSByb3V0ZXJcblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cblx0XHRyb3V0aWUoe1xuXHRcdFx0Jyc6ICgpID0+IHtcblx0XHRcdFx0cm91dGllKCdob21lJyk7XG5cdFx0XHR9LFxuXHRcdFx0J2hvbWUnOiAoKSA9PiB7XG5cdFx0XHRcdHNlY3Rpb25zLnRvZ2dsZSgnaG9tZScpO1xuXHRcdFx0fSxcblx0XHRcdCdwb2tlbW9ucyc6ICgpID0+IHtcblx0XHRcdFx0c2VjdGlvbnMudG9nZ2xlKCdwb2tlbW9ucycpO1xuXHRcdFx0fSxcblx0XHRcdCdwb2tlbW9ucy86bmFtZSc6IChuYW1lKSA9PiB7XG5cdFx0XHRcdGFwaS5nZXRQb2tlbW9uRGV0YWlsKG5hbWUpO1xuXHRcdFx0fSxcblx0XHR9KTtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvcm91dGVyLmpzIiwiaW1wb3J0IHJvdXRlciBmcm9tICcuL21vZHVsZXMvcm91dGVyLmpzJztcbmltcG9ydCBhcGkgZnJvbSAnLi9tb2R1bGVzL2FwaS5qcyc7XG5cbihmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGNvbnN0IGFwcCA9IHtcblx0XHQvL1N0YXJ0cyBhcHAgd2l0aCBpbml0aWFsaXplIHRoZSByb3V0ZXIgYW5kIGdldHMgdGhlIGRhdGFcblx0XHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdHJvdXRlci5pbml0KCk7XG5cdFx0XHRhcGkuZ2V0UG9rZW1vbnMoKTtcblx0XHR9XG5cdH07XG5cdC8vU3RhcnQgYXBwXG5cdGFwcC5pbml0KCk7XG5cbn0pKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJjb25zdCBiYWNrZ3JvdW5kID0ge1xuXG5cdGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcG9rZW1vbnMtZGV0YWlsXCIpLFxuXG5cdHRvZ2dsZTogZnVuY3Rpb24oZGF0YU9iamVjdCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YU9iamVjdC50eXBlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGRhdGFPYmplY3QudHlwZXNbaV0udHlwZS5uYW1lID09IFwiZmlyZVwiKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNFNjM5NDZcIjtcblx0XHRcdH0gZWxzZSBpZiAoZGF0YU9iamVjdC50eXBlc1tpXS50eXBlLm5hbWUgPT0gXCJ3YXRlclwiKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM1QkMwRUJcIjtcblx0XHRcdH0gZWxzZSBpZiAoZGF0YU9iamVjdC50eXBlc1tpXS50eXBlLm5hbWUgPT0gXCJncmFzc1wiKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM5QkM1M0RcIjtcblx0XHRcdH0gZWxzZSBpZiAoZGF0YU9iamVjdC50eXBlc1tpXS50eXBlLm5hbWUgPT0gXCJwb2lzb25cIikge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjM0QzMTVCXCI7XG5cdFx0XHR9IGVsc2UgaWYgKGRhdGFPYmplY3QudHlwZXNbaV0udHlwZS5uYW1lID09IFwibm9ybWFsXCIpIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiO1xuXHRcdFx0fSBlbHNlIGlmIChkYXRhT2JqZWN0LnR5cGVzW2ldLnR5cGUubmFtZSA9PSBcImVsZWN0cmljXCIpIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0ZGRTA2NlwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzBCMTMyQlwiO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBiYWNrZ3JvdW5kO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvYmFja2dyb3VuZC5qcyIsImltcG9ydCByZW5kZXIgZnJvbSAnLi9yZW5kZXInO1xuXG5jb25zdCBmaWx0ZXIgPSB7XG5cdGdldElucHV0OiBmdW5jdGlvbihkYXRhT2JqZWN0KSB7XG5cdFx0Y29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gnKTtcblx0XHRzZWFyY2hGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB0aGlzLmZpbHRlcihzZWFyY2hGb3JtLnZhbHVlLCBkYXRhT2JqZWN0KSk7XG5cdH0sXG5cblx0ZmlsdGVyOiBmdW5jdGlvbih2YWx1ZSwgZGF0YU9iamVjdCkge1xuXHRcdGNvbnN0IGZpbHRlckRhdGEgPSBkYXRhT2JqZWN0LmZpbHRlcihvYmogPT4ge1xuXHRcdFx0aWYgKG9iai5uYW1lLmluY2x1ZGVzKHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmaWx0ZXJEYXRhO1xuXHRcdH0pO1xuXHRcdHJlbmRlci5vdmVydmlldyhmaWx0ZXJEYXRhKTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZmlsdGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvZmlsdGVyLmpzIiwiY29uc3QgbG9hZGVyID0ge1xuXHQgZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcicpLFxuXHQgc2hvdzogZnVuY3Rpb24oKXtcblx0XHQgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuXHQgfSxcblx0IGhpZGU6IGZ1bmN0aW9uKCl7XG5cdFx0IHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcblx0IH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvbG9hZGVyLmpzIiwiLyohXG4gKiByb3V0aWUgLSBhIHRpbnkgaGFzaCByb3V0ZXJcbiAqIHYwLjMuMlxuICogaHR0cDovL3Byb2plY3RzLmpnYS5tZS9yb3V0aWVcbiAqIGNvcHlyaWdodCBHcmVnIEFsbGVuIDIwMTZcbiAqIE1JVCBMaWNlbnNlXG4qL1xudmFyIFJvdXRpZSA9IGZ1bmN0aW9uKHcsIGlzTW9kdWxlKSB7XG5cbiAgdmFyIHJvdXRlcyA9IFtdO1xuICB2YXIgbWFwID0ge307XG4gIHZhciByZWZlcmVuY2UgPSBcInJvdXRpZVwiO1xuICB2YXIgb2xkUmVmZXJlbmNlID0gd1tyZWZlcmVuY2VdO1xuXG4gIHZhciBSb3V0ZSA9IGZ1bmN0aW9uKHBhdGgsIG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5rZXlzID0gW107XG4gICAgdGhpcy5mbnMgPSBbXTtcbiAgICB0aGlzLnBhcmFtcyA9IHt9O1xuICAgIHRoaXMucmVnZXggPSBwYXRoVG9SZWdleHAodGhpcy5wYXRoLCB0aGlzLmtleXMsIGZhbHNlLCBmYWxzZSk7XG5cbiAgfTtcblxuICBSb3V0ZS5wcm90b3R5cGUuYWRkSGFuZGxlciA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgdGhpcy5mbnMucHVzaChmbik7XG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLnJlbW92ZUhhbmRsZXIgPSBmdW5jdGlvbihmbikge1xuICAgIGZvciAodmFyIGkgPSAwLCBjID0gdGhpcy5mbnMubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICB2YXIgZiA9IHRoaXMuZm5zW2ldO1xuICAgICAgaWYgKGZuID09IGYpIHtcbiAgICAgICAgdGhpcy5mbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFJvdXRlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYyA9IHRoaXMuZm5zLmxlbmd0aDsgaSA8IGM7IGkrKykge1xuICAgICAgdGhpcy5mbnNbaV0uYXBwbHkodGhpcywgcGFyYW1zKTtcbiAgICB9XG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24ocGF0aCwgcGFyYW1zKXtcbiAgICB2YXIgbSA9IHRoaXMucmVnZXguZXhlYyhwYXRoKTtcblxuICAgIGlmICghbSkgcmV0dXJuIGZhbHNlO1xuXG5cbiAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gbS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgdmFyIGtleSA9IHRoaXMua2V5c1tpIC0gMV07XG5cbiAgICAgIHZhciB2YWwgPSAoJ3N0cmluZycgPT0gdHlwZW9mIG1baV0pID8gZGVjb2RlVVJJQ29tcG9uZW50KG1baV0pIDogbVtpXTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICB0aGlzLnBhcmFtc1trZXkubmFtZV0gPSB2YWw7XG4gICAgICB9XG4gICAgICBwYXJhbXMucHVzaCh2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIFJvdXRlLnByb3RvdHlwZS50b1VSTCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHZhciBwYXRoID0gdGhpcy5wYXRoO1xuICAgIGZvciAodmFyIHBhcmFtIGluIHBhcmFtcykge1xuICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgnLzonK3BhcmFtLCAnLycrcGFyYW1zW3BhcmFtXSk7XG4gICAgfVxuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1xcLzouKlxcPy9nLCAnLycpLnJlcGxhY2UoL1xcPy9nLCAnJyk7XG4gICAgaWYgKHBhdGguaW5kZXhPZignOicpICE9IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcGFyYW1ldGVycyBmb3IgdXJsOiAnK3BhdGgpO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbiAgfTtcblxuICB2YXIgcGF0aFRvUmVnZXhwID0gZnVuY3Rpb24ocGF0aCwga2V5cywgc2Vuc2l0aXZlLCBzdHJpY3QpIHtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIFJlZ0V4cCkgcmV0dXJuIHBhdGg7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBBcnJheSkgcGF0aCA9ICcoJyArIHBhdGguam9pbignfCcpICsgJyknO1xuICAgIHBhdGggPSBwYXRoXG4gICAgICAuY29uY2F0KHN0cmljdCA/ICcnIDogJy8/JylcbiAgICAgIC5yZXBsYWNlKC9cXC9cXCgvZywgJyg/Oi8nKVxuICAgICAgLnJlcGxhY2UoL1xcKy9nLCAnX19wbHVzX18nKVxuICAgICAgLnJlcGxhY2UoLyhcXC8pPyhcXC4pPzooXFx3KykoPzooXFwoLio/XFwpKSk/KFxcPyk/L2csIGZ1bmN0aW9uKF8sIHNsYXNoLCBmb3JtYXQsIGtleSwgY2FwdHVyZSwgb3B0aW9uYWwpe1xuICAgICAgICBrZXlzLnB1c2goeyBuYW1lOiBrZXksIG9wdGlvbmFsOiAhISBvcHRpb25hbCB9KTtcbiAgICAgICAgc2xhc2ggPSBzbGFzaCB8fCAnJztcbiAgICAgICAgcmV0dXJuICcnICsgKG9wdGlvbmFsID8gJycgOiBzbGFzaCkgKyAnKD86JyArIChvcHRpb25hbCA/IHNsYXNoIDogJycpICsgKGZvcm1hdCB8fCAnJykgKyAoY2FwdHVyZSB8fCAoZm9ybWF0ICYmICcoW14vLl0rPyknIHx8ICcoW14vXSs/KScpKSArICcpJyArIChvcHRpb25hbCB8fCAnJyk7XG4gICAgICB9KVxuICAgICAgLnJlcGxhY2UoLyhbXFwvLl0pL2csICdcXFxcJDEnKVxuICAgICAgLnJlcGxhY2UoL19fcGx1c19fL2csICcoLispJylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyguKiknKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBwYXRoICsgJyQnLCBzZW5zaXRpdmUgPyAnJyA6ICdpJyk7XG4gIH07XG5cbiAgdmFyIGFkZEhhbmRsZXIgPSBmdW5jdGlvbihwYXRoLCBmbikge1xuICAgIHZhciBzID0gcGF0aC5zcGxpdCgnICcpO1xuICAgIHZhciBuYW1lID0gKHMubGVuZ3RoID09IDIpID8gc1swXSA6IG51bGw7XG4gICAgcGF0aCA9IChzLmxlbmd0aCA9PSAyKSA/IHNbMV0gOiBzWzBdO1xuXG4gICAgaWYgKCFtYXBbcGF0aF0pIHtcbiAgICAgIG1hcFtwYXRoXSA9IG5ldyBSb3V0ZShwYXRoLCBuYW1lKTtcbiAgICAgIHJvdXRlcy5wdXNoKG1hcFtwYXRoXSk7XG4gICAgfVxuICAgIG1hcFtwYXRoXS5hZGRIYW5kbGVyKGZuKTtcbiAgfTtcblxuICB2YXIgcm91dGllID0gZnVuY3Rpb24ocGF0aCwgZm4pIHtcbiAgICBpZiAodHlwZW9mIGZuID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFkZEhhbmRsZXIocGF0aCwgZm4pO1xuICAgICAgcm91dGllLnJlbG9hZCgpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhdGggPT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAodmFyIHAgaW4gcGF0aCkge1xuICAgICAgICBhZGRIYW5kbGVyKHAsIHBhdGhbcF0pO1xuICAgICAgfVxuICAgICAgcm91dGllLnJlbG9hZCgpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZuID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcm91dGllLm5hdmlnYXRlKHBhdGgpO1xuICAgIH1cbiAgfTtcblxuICByb3V0aWUubG9va3VwID0gZnVuY3Rpb24obmFtZSwgb2JqKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGMgPSByb3V0ZXMubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICB2YXIgcm91dGUgPSByb3V0ZXNbaV07XG4gICAgICBpZiAocm91dGUubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiByb3V0ZS50b1VSTChvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByb3V0aWUucmVtb3ZlID0gZnVuY3Rpb24ocGF0aCwgZm4pIHtcbiAgICB2YXIgcm91dGUgPSBtYXBbcGF0aF07XG4gICAgaWYgKCFyb3V0ZSlcbiAgICAgIHJldHVybjtcbiAgICByb3V0ZS5yZW1vdmVIYW5kbGVyKGZuKTtcbiAgfTtcblxuICByb3V0aWUucmVtb3ZlQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgbWFwID0ge307XG4gICAgcm91dGVzID0gW107XG4gIH07XG5cbiAgcm91dGllLm5hdmlnYXRlID0gZnVuY3Rpb24ocGF0aCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBzaWxlbnQgPSBvcHRpb25zLnNpbGVudCB8fCBmYWxzZTtcblxuICAgIGlmIChzaWxlbnQpIHtcbiAgICAgIHJlbW92ZUxpc3RlbmVyKCk7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHBhdGg7XG5cbiAgICAgIGlmIChzaWxlbnQpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBhZGRMaXN0ZW5lcigpO1xuICAgICAgICB9LCAxKTtcbiAgICAgIH1cblxuICAgIH0sIDEpO1xuICB9O1xuXG4gIHJvdXRpZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgd1tyZWZlcmVuY2VdID0gb2xkUmVmZXJlbmNlO1xuICAgIHJldHVybiByb3V0aWU7XG4gIH07XG5cbiAgdmFyIGdldEhhc2ggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpO1xuICB9O1xuXG4gIHZhciBjaGVja1JvdXRlID0gZnVuY3Rpb24oaGFzaCwgcm91dGUpIHtcbiAgICB2YXIgcGFyYW1zID0gW107XG4gICAgaWYgKHJvdXRlLm1hdGNoKGhhc2gsIHBhcmFtcykpIHtcbiAgICAgIHJvdXRlLnJ1bihwYXJhbXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICB2YXIgaGFzaENoYW5nZWQgPSByb3V0aWUucmVsb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhhc2ggPSBnZXRIYXNoKCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGMgPSByb3V0ZXMubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICB2YXIgcm91dGUgPSByb3V0ZXNbaV07XG4gICAgICBpZiAoY2hlY2tSb3V0ZShoYXNoLCByb3V0ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgYWRkTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAody5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB3LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBoYXNoQ2hhbmdlZCwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3LmF0dGFjaEV2ZW50KCdvbmhhc2hjaGFuZ2UnLCBoYXNoQ2hhbmdlZCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciByZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh3LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHcucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGhhc2hDaGFuZ2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdy5kZXRhY2hFdmVudCgnb25oYXNoY2hhbmdlJywgaGFzaENoYW5nZWQpO1xuICAgIH1cbiAgfTtcbiAgYWRkTGlzdGVuZXIoKTtcblxuICBpZiAoaXNNb2R1bGUpe1xuICAgIHJldHVybiByb3V0aWU7XG4gIH0gZWxzZSB7XG4gICAgd1tyZWZlcmVuY2VdID0gcm91dGllO1xuICB9XG5cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09ICd1bmRlZmluZWQnKXtcbiAgUm91dGllKHdpbmRvdyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IFJvdXRpZSh3aW5kb3csdHJ1ZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy92ZW5kb3Ivcm91dGllLmpzIiwiIWZ1bmN0aW9uIHQoZSxuLHIpe2Z1bmN0aW9uIGkocyx1KXtpZighbltzXSl7aWYoIWVbc10pe3ZhciBsPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIXUmJmwpcmV0dXJuIGwocywhMCk7aWYobylyZXR1cm4gbyhzLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK3MrXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBoPW5bc109e2V4cG9ydHM6e319O2Vbc11bMF0uY2FsbChoLmV4cG9ydHMsZnVuY3Rpb24odCl7dmFyIG49ZVtzXVsxXVt0XTtyZXR1cm4gaShuP246dCl9LGgsaC5leHBvcnRzLHQsZSxuLHIpfXJldHVybiBuW3NdLmV4cG9ydHN9Zm9yKHZhciBvPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUscz0wO3M8ci5sZW5ndGg7cysrKWkocltzXSk7cmV0dXJuIGl9KHsxOltmdW5jdGlvbih0LGUsbil7dmFyIHIsaSxvLHMsdSxsPVtdLmluZGV4T2Z8fGZ1bmN0aW9uKHQpe2Zvcih2YXIgZT0wLG49dGhpcy5sZW5ndGg7bj5lO2UrKylpZihlIGluIHRoaXMmJnRoaXNbZV09PT10KXJldHVybiBlO3JldHVybi0xfTtzPXQoXCIuLi9saWIvbG9kYXNoLmpzXCIpLHU9dChcIi4vaGVscGVyc1wiKSxpPXQoXCIuL2NvbnRleHRcIiksbz17fSxvLnJlbmRlcj1mdW5jdGlvbih0LGUsbixyKXt2YXIgbCxhO3JldHVybiBudWxsPT1lJiYoZT1bXSksbnVsbD09biYmKG49e30pLG51bGw9PXImJihyPXt9KSxhPXIuZGVidWcmJmNvbnNvbGU/dS5jb25zb2xlTG9nZ2VyOnUubnVsbExvZ2dlcixhKFwiVHJhbnNwYXJlbmN5LnJlbmRlcjpcIix0LGUsbixyKSx0PyhzLmlzQXJyYXkoZSl8fChlPVtlXSksdD0obD11LmRhdGEodCkpLmNvbnRleHR8fChsLmNvbnRleHQ9bmV3IGkodCxvKSksdC5yZW5kZXIoZSxuLHIpLmVsKTp2b2lkIDB9LG8ubWF0Y2hlcj1mdW5jdGlvbih0LGUpe3JldHVybiB0LmVsLmlkPT09ZXx8bC5jYWxsKHQuY2xhc3NOYW1lcyxlKT49MHx8dC5lbC5uYW1lPT09ZXx8dC5lbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWJpbmRcIik9PT1lfSxvLmNsb25lPWZ1bmN0aW9uKHQpe3JldHVybiByKHQpLmNsb25lKClbMF19LG8ualF1ZXJ5UGx1Z2luPXUuY2hhaW5hYmxlKGZ1bmN0aW9uKHQsZSxuKXt2YXIgcixpLHMsdTtmb3IodT1bXSxpPTAscz10aGlzLmxlbmd0aDtzPmk7aSsrKXI9dGhpc1tpXSx1LnB1c2goby5yZW5kZXIocix0LGUsbikpO3JldHVybiB1fSksKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBqUXVlcnkmJm51bGwhPT1qUXVlcnl8fFwidW5kZWZpbmVkXCIhPXR5cGVvZiBaZXB0byYmbnVsbCE9PVplcHRvKSYmKHI9alF1ZXJ5fHxaZXB0byxudWxsIT1yJiYoci5mbi5yZW5kZXI9by5qUXVlcnlQbHVnaW4pKSwoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUmJm51bGwhPT1lP2UuZXhwb3J0czp2b2lkIDApJiYoZS5leHBvcnRzPW8pLFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJm51bGwhPT13aW5kb3cmJih3aW5kb3cuVHJhbnNwYXJlbmN5PW8pLChcInVuZGVmaW5lZFwiIT10eXBlb2YgZGVmaW5lJiZudWxsIT09ZGVmaW5lP2RlZmluZS5hbWQ6dm9pZCAwKSYmZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIG99KX0se1wiLi4vbGliL2xvZGFzaC5qc1wiOjcsXCIuL2NvbnRleHRcIjozLFwiLi9oZWxwZXJzXCI6NX1dLDI6W2Z1bmN0aW9uKHQsZSxuKXt2YXIgcixpLG8scyx1LGwsYSxoLGM9ZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBuKCl7dGhpcy5jb25zdHJ1Y3Rvcj10fWZvcih2YXIgciBpbiBlKXAuY2FsbChlLHIpJiYodFtyXT1lW3JdKTtyZXR1cm4gbi5wcm90b3R5cGU9ZS5wcm90b3R5cGUsdC5wcm90b3R5cGU9bmV3IG4sdC5fX3N1cGVyX189ZS5wcm90b3R5cGUsdH0scD17fS5oYXNPd25Qcm9wZXJ0eTthPXQoXCIuLi9saWIvbG9kYXNoXCIpLGg9dChcIi4vaGVscGVyc1wiKSxlLmV4cG9ydHM9aT17QXR0cmlidXRlczp7fSxjcmVhdGVBdHRyaWJ1dGU6ZnVuY3Rpb24odCxlKXt2YXIgbjtyZXR1cm4gbmV3KG49aS5BdHRyaWJ1dGVzW2VdfHxyKSh0LGUpfX0scj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxlKXt0aGlzLmVsPXQsdGhpcy5uYW1lPWUsdGhpcy50ZW1wbGF0ZVZhbHVlPXRoaXMuZWwuZ2V0QXR0cmlidXRlKHRoaXMubmFtZSl8fFwiXCJ9cmV0dXJuIHQucHJvdG90eXBlLnNldD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lbFt0aGlzLm5hbWVdPXQsdGhpcy5lbC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLHQudG9TdHJpbmcoKSl9LHR9KCksbz1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKHQsZSl7dGhpcy5lbD10LHRoaXMubmFtZT1lLHRoaXMudGVtcGxhdGVWYWx1ZT10aGlzLmVsLmdldEF0dHJpYnV0ZSh0aGlzLm5hbWUpfHwhMX12YXIgbixyLG8scztmb3IoYyhlLHQpLG49W1wiaGlkZGVuXCIsXCJhc3luY1wiLFwiZGVmZXJcIixcImF1dG9mb2N1c1wiLFwiZm9ybW5vdmFsaWRhdGVcIixcImRpc2FibGVkXCIsXCJhdXRvZm9jdXNcIixcImZvcm1ub3ZhbGlkYXRlXCIsXCJtdWx0aXBsZVwiLFwicmVhZG9ubHlcIixcInJlcXVpcmVkXCIsXCJjaGVja2VkXCIsXCJzY29wZWRcIixcInJldmVyc2VkXCIsXCJzZWxlY3RlZFwiLFwibG9vcFwiLFwibXV0ZWRcIixcImF1dG9wbGF5XCIsXCJjb250cm9sc1wiLFwic2VhbWxlc3NcIixcImRlZmF1bHRcIixcImlzbWFwXCIsXCJub3ZhbGlkYXRlXCIsXCJvcGVuXCIsXCJ0eXBlbXVzdG1hdGNoXCIsXCJ0cnVlc3BlZWRcIl0scj0wLG89bi5sZW5ndGg7bz5yO3IrKylzPW5bcl0saS5BdHRyaWJ1dGVzW3NdPWU7cmV0dXJuIGUucHJvdG90eXBlLnNldD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lbFt0aGlzLm5hbWVdPXQsdD90aGlzLmVsLnNldEF0dHJpYnV0ZSh0aGlzLm5hbWUsdGhpcy5uYW1lKTp0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLm5hbWUpfSxlfShyKSxsPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUodCxlKXt2YXIgbjt0aGlzLmVsPXQsdGhpcy5uYW1lPWUsdGhpcy50ZW1wbGF0ZVZhbHVlPWZ1bmN0aW9uKCl7dmFyIHQsZSxyLGk7Zm9yKHI9dGhpcy5lbC5jaGlsZE5vZGVzLGk9W10sdD0wLGU9ci5sZW5ndGg7ZT50O3QrKyluPXJbdF0sbi5ub2RlVHlwZT09PWguVEVYVF9OT0RFJiZpLnB1c2gobi5ub2RlVmFsdWUpO3JldHVybiBpfS5jYWxsKHRoaXMpLmpvaW4oXCJcIiksdGhpcy5jaGlsZHJlbj1hLnRvQXJyYXkodGhpcy5lbC5jaGlsZHJlbiksKHRoaXMudGV4dE5vZGU9dGhpcy5lbC5maXJzdENoaWxkKT90aGlzLnRleHROb2RlLm5vZGVUeXBlIT09aC5URVhUX05PREUmJih0aGlzLnRleHROb2RlPXRoaXMuZWwuaW5zZXJ0QmVmb3JlKHRoaXMuZWwub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKSx0aGlzLnRleHROb2RlKSk6dGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLnRleHROb2RlPXRoaXMuZWwub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKSl9cmV0dXJuIGMoZSx0KSxpLkF0dHJpYnV0ZXMudGV4dD1lLGUucHJvdG90eXBlLnNldD1mdW5jdGlvbih0KXtmb3IodmFyIGUsbixyLGksbztlPXRoaXMuZWwuZmlyc3RDaGlsZDspdGhpcy5lbC5yZW1vdmVDaGlsZChlKTtmb3IodGhpcy50ZXh0Tm9kZS5ub2RlVmFsdWU9dCx0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMudGV4dE5vZGUpLGk9dGhpcy5jaGlsZHJlbixvPVtdLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspZT1pW25dLG8ucHVzaCh0aGlzLmVsLmFwcGVuZENoaWxkKGUpKTtyZXR1cm4gb30sZX0ociksdT1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKHQpe3RoaXMuZWw9dCx0aGlzLnRlbXBsYXRlVmFsdWU9XCJcIix0aGlzLmNoaWxkcmVuPWEudG9BcnJheSh0aGlzLmVsLmNoaWxkcmVuKX1yZXR1cm4gYyhlLHQpLGkuQXR0cmlidXRlcy5odG1sPWUsZS5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuLHIsaSxvO2U9dGhpcy5lbC5maXJzdENoaWxkOyl0aGlzLmVsLnJlbW92ZUNoaWxkKGUpO2Zvcih0aGlzLmVsLmlubmVySFRNTD10K3RoaXMudGVtcGxhdGVWYWx1ZSxpPXRoaXMuY2hpbGRyZW4sbz1bXSxuPTAscj1pLmxlbmd0aDtyPm47bisrKWU9aVtuXSxvLnB1c2godGhpcy5lbC5hcHBlbmRDaGlsZChlKSk7cmV0dXJuIG99LGV9KHIpLHM9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0KXtlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsdCxcImNsYXNzXCIpfXJldHVybiBjKGUsdCksaS5BdHRyaWJ1dGVzW1wiY2xhc3NcIl09ZSxlfShyKX0se1wiLi4vbGliL2xvZGFzaFwiOjcsXCIuL2hlbHBlcnNcIjo1fV0sMzpbZnVuY3Rpb24odCxlLG4pe3ZhciByLGksbyxzLHUsbCxhO2E9dChcIi4vaGVscGVyc1wiKSxzPWEuYmVmb3JlLG89YS5hZnRlcix1PWEuY2hhaW5hYmxlLGw9YS5jbG9uZU5vZGUsaT10KFwiLi9pbnN0YW5jZVwiKSxlLmV4cG9ydHM9cj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxlKXt0aGlzLmVsPXQsdGhpcy5UcmFuc3BhcmVuY3k9ZSx0aGlzLnRlbXBsYXRlPWwodGhpcy5lbCksdGhpcy5pbnN0YW5jZXM9W25ldyBpKHRoaXMuZWwsdGhpcy5UcmFuc3BhcmVuY3kpXSx0aGlzLmluc3RhbmNlQ2FjaGU9W119dmFyIGUsbjtyZXR1cm4gbj11KGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucGFyZW50PXRoaXMuZWwucGFyZW50Tm9kZSx0aGlzLnBhcmVudD8odGhpcy5uZXh0U2libGluZz10aGlzLmVsLm5leHRTaWJsaW5nLHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuZWwpKTp2b2lkIDB9KSxlPXUoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wYXJlbnQ/dGhpcy5uZXh0U2libGluZz90aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUodGhpcy5lbCx0aGlzLm5leHRTaWJsaW5nKTp0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsKTp2b2lkIDB9KSx0LnByb3RvdHlwZS5yZW5kZXI9cyhuKShvKGUpKHUoZnVuY3Rpb24odCxlLG4pe2Zvcih2YXIgcixvLHMsdSxhLGgsYzt0Lmxlbmd0aDx0aGlzLmluc3RhbmNlcy5sZW5ndGg7KXRoaXMuaW5zdGFuY2VDYWNoZS5wdXNoKHRoaXMuaW5zdGFuY2VzLnBvcCgpLnJlbW92ZSgpKTtmb3IoO3QubGVuZ3RoPnRoaXMuaW5zdGFuY2VzLmxlbmd0aDspdT10aGlzLmluc3RhbmNlQ2FjaGUucG9wKCl8fG5ldyBpKGwodGhpcy50ZW1wbGF0ZSksdGhpcy5UcmFuc3BhcmVuY3kpLHRoaXMuaW5zdGFuY2VzLnB1c2godS5hcHBlbmRUbyh0aGlzLmVsKSk7Zm9yKGM9W10scz1vPTAsYT10Lmxlbmd0aDthPm87cz0rK28paD10W3NdLHU9dGhpcy5pbnN0YW5jZXNbc10scj1bXSxjLnB1c2godS5wcmVwYXJlKGgscikucmVuZGVyVmFsdWVzKGgscikucmVuZGVyRGlyZWN0aXZlcyhoLHMsZSkucmVuZGVyQ2hpbGRyZW4oaCxyLGUsbikpO3JldHVybiBjfSkpKSx0fSgpfSx7XCIuL2hlbHBlcnNcIjo1LFwiLi9pbnN0YW5jZVwiOjZ9XSw0OltmdW5jdGlvbih0LGUsbil7dmFyIHIsaSxvLHMsdSxsLGEsaCxjLHAsZixkPXt9Lmhhc093blByb3BlcnR5LG09ZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBuKCl7dGhpcy5jb25zdHJ1Y3Rvcj10fWZvcih2YXIgciBpbiBlKWQuY2FsbChlLHIpJiYodFtyXT1lW3JdKTtyZXR1cm4gbi5wcm90b3R5cGU9ZS5wcm90b3R5cGUsdC5wcm90b3R5cGU9bmV3IG4sdC5fX3N1cGVyX189ZS5wcm90b3R5cGUsdH07cD10KFwiLi4vbGliL2xvZGFzaC5qc1wiKSxmPXQoXCIuL2hlbHBlcnNcIikscj10KFwiLi9hdHRyaWJ1dGVGYWN0b3J5XCIpLGUuZXhwb3J0cz1zPXtFbGVtZW50czp7aW5wdXQ6e319LGNyZWF0ZUVsZW1lbnQ6ZnVuY3Rpb24odCl7dmFyIGUsbjtyZXR1cm4gbmV3KGU9XCJpbnB1dFwiPT09KG49dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKT9zLkVsZW1lbnRzW25dW3QudHlwZS50b0xvd2VyQ2FzZSgpXXx8dTpzLkVsZW1lbnRzW25dfHxvKSh0KX19LG89ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQpe3RoaXMuZWw9dCx0aGlzLmF0dHJpYnV0ZXM9e30sdGhpcy5jaGlsZE5vZGVzPXAudG9BcnJheSh0aGlzLmVsLmNoaWxkTm9kZXMpLHRoaXMubm9kZU5hbWU9dGhpcy5lbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLHRoaXMuY2xhc3NOYW1lcz10aGlzLmVsLmNsYXNzTmFtZS5zcGxpdChcIiBcIiksdGhpcy5vcmlnaW5hbEF0dHJpYnV0ZXM9e319cmV0dXJuIHQucHJvdG90eXBlLmVtcHR5PWZ1bmN0aW9uKCl7Zm9yKHZhciB0O3Q9dGhpcy5lbC5maXJzdENoaWxkOyl0aGlzLmVsLnJlbW92ZUNoaWxkKHQpO3JldHVybiB0aGlzfSx0LnByb3RvdHlwZS5yZXNldD1mdW5jdGlvbigpe3ZhciB0LGUsbixyO249dGhpcy5hdHRyaWJ1dGVzLHI9W107Zm9yKGUgaW4gbil0PW5bZV0sci5wdXNoKHQuc2V0KHQudGVtcGxhdGVWYWx1ZSkpO3JldHVybiByfSx0LnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuYXR0cihcInRleHRcIix0KX0sdC5wcm90b3R5cGUuYXR0cj1mdW5jdGlvbih0LGUpe3ZhciBuLGk7cmV0dXJuIG49KGk9dGhpcy5hdHRyaWJ1dGVzKVt0XXx8KGlbdF09ci5jcmVhdGVBdHRyaWJ1dGUodGhpcy5lbCx0LGUpKSxudWxsIT1lJiZuLnNldChlKSxufSx0LnByb3RvdHlwZS5yZW5kZXJEaXJlY3RpdmVzPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcixpLG8scztvPVtdO2ZvcihpIGluIG4pZC5jYWxsKG4saSkmJihyPW5baV0sXCJmdW5jdGlvblwiPT10eXBlb2YgciYmKHM9ci5jYWxsKHQse2VsZW1lbnQ6dGhpcy5lbCxpbmRleDplLHZhbHVlOnRoaXMuYXR0cihpKS50ZW1wbGF0ZVZhbHVlfSksbnVsbCE9cz9vLnB1c2godGhpcy5hdHRyKGkscykpOm8ucHVzaCh2b2lkIDApKSk7cmV0dXJuIG99LHR9KCksYT1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKHQpe2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyx0KSx0aGlzLmVsZW1lbnRzPWYuZ2V0RWxlbWVudHModCl9cmV0dXJuIG0oZSx0KSxzLkVsZW1lbnRzLnNlbGVjdD1lLGUucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbih0KXt2YXIgZSxuLHIsaSxvO2Zvcih0PXQudG9TdHJpbmcoKSxpPXRoaXMuZWxlbWVudHMsbz1bXSxlPTAsbj1pLmxlbmd0aDtuPmU7ZSsrKXI9aVtlXSxcIm9wdGlvblwiPT09ci5ub2RlTmFtZSYmby5wdXNoKHIuYXR0cihcInNlbGVjdGVkXCIsci5lbC52YWx1ZT09PXQpKTtyZXR1cm4gb30sZX0obyksYz1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKCl7cmV0dXJuIGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsYXJndW1lbnRzKX12YXIgbixyLGksbztmb3IobShlLHQpLG49W1wiYXJlYVwiLFwiYmFzZVwiLFwiYnJcIixcImNvbFwiLFwiY29tbWFuZFwiLFwiZW1iZWRcIixcImhyXCIsXCJpbWdcIixcImlucHV0XCIsXCJrZXlnZW5cIixcImxpbmtcIixcIm1ldGFcIixcInBhcmFtXCIsXCJzb3VyY2VcIixcInRyYWNrXCIsXCJ3YnJcIl0scj0wLGk9bi5sZW5ndGg7aT5yO3IrKylvPW5bcl0scy5FbGVtZW50c1tvXT1lO3JldHVybiBlLnByb3RvdHlwZS5hdHRyPWZ1bmN0aW9uKHQsbil7cmV0dXJuXCJ0ZXh0XCIhPT10JiZcImh0bWxcIiE9PXQ/ZS5fX3N1cGVyX18uYXR0ci5jYWxsKHRoaXMsdCxuKTp2b2lkIDB9LGV9KG8pLHU9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSgpe3JldHVybiBlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9cmV0dXJuIG0oZSx0KSxlLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuYXR0cihcInZhbHVlXCIsdCl9LGV9KGMpLGg9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSgpe3JldHVybiBlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9cmV0dXJuIG0oZSx0KSxzLkVsZW1lbnRzLnRleHRhcmVhPWUsZX0odSksaT1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKCl7cmV0dXJuIGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1yZXR1cm4gbShlLHQpLHMuRWxlbWVudHMuaW5wdXQuY2hlY2tib3g9ZSxlLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuYXR0cihcImNoZWNrZWRcIixCb29sZWFuKHQpKX0sZX0odSksbD1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKCl7cmV0dXJuIGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1yZXR1cm4gbShlLHQpLHMuRWxlbWVudHMuaW5wdXQucmFkaW89ZSxlfShpKX0se1wiLi4vbGliL2xvZGFzaC5qc1wiOjcsXCIuL2F0dHJpYnV0ZUZhY3RvcnlcIjoyLFwiLi9oZWxwZXJzXCI6NX1dLDU6W2Z1bmN0aW9uKHQsZSxuKXt2YXIgcixpLG8scztyPXQoXCIuL2VsZW1lbnRGYWN0b3J5XCIpLG4uYmVmb3JlPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseSh0aGlzLGFyZ3VtZW50cyksZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fX0sbi5hZnRlcj1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpLHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfX19LG4uY2hhaW5hYmxlPW4uYWZ0ZXIoZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pLG4ub25seVdpdGgkPWZ1bmN0aW9uKHQpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiBqUXVlcnkmJm51bGwhPT1qUXVlcnl8fFwidW5kZWZpbmVkXCIhPXR5cGVvZiBaZXB0byYmbnVsbCE9PVplcHRvP2Z1bmN0aW9uKGUpe3JldHVybiB0KGFyZ3VtZW50cyl9KGpRdWVyeXx8WmVwdG8pOnZvaWQgMH0sbi5nZXRFbGVtZW50cz1mdW5jdGlvbih0KXt2YXIgZTtyZXR1cm4gZT1bXSxpKHQsZSksZX0saT1mdW5jdGlvbih0LGUpe3ZhciBvLHM7Zm9yKG89dC5maXJzdENoaWxkLHM9W107bzspby5ub2RlVHlwZT09PW4uRUxFTUVOVF9OT0RFJiYoZS5wdXNoKG5ldyByLmNyZWF0ZUVsZW1lbnQobykpLGkobyxlKSkscy5wdXNoKG89by5uZXh0U2libGluZyk7cmV0dXJuIHN9LG4uRUxFTUVOVF9OT0RFPTEsbi5URVhUX05PREU9MyxzPWZ1bmN0aW9uKCl7cmV0dXJuXCI8Om5hdj48LzpuYXY+XCIhPT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibmF2XCIpLmNsb25lTm9kZSghMCkub3V0ZXJIVE1MfSxuLmNsb25lTm9kZT1cInVuZGVmaW5lZFwiPT10eXBlb2YgZG9jdW1lbnR8fG51bGw9PT1kb2N1bWVudHx8cygpP2Z1bmN0aW9uKHQpe3JldHVybiB0LmNsb25lTm9kZSghMCl9OmZ1bmN0aW9uKHQpe3ZhciBlLHIsaSxzLHU7aWYoZT1UcmFuc3BhcmVuY3kuY2xvbmUodCksZS5ub2RlVHlwZT09PW4uRUxFTUVOVF9OT0RFKWZvcihlLnJlbW92ZUF0dHJpYnV0ZShvKSx1PWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpLGk9MCxzPXUubGVuZ3RoO3M+aTtpKyspcj11W2ldLHIucmVtb3ZlQXR0cmlidXRlKG8pO3JldHVybiBlfSxvPVwidHJhbnNwYXJlbmN5XCIsbi5kYXRhPWZ1bmN0aW9uKHQpe3JldHVybiB0W29dfHwodFtvXT17fSl9LG4ubnVsbExvZ2dlcj1mdW5jdGlvbigpe30sbi5jb25zb2xlTG9nZ2VyPWZ1bmN0aW9uKCl7cmV0dXJuIGNvbnNvbGUubG9nKGFyZ3VtZW50cyl9LG4ubG9nPW4ubnVsbExvZ2dlcn0se1wiLi9lbGVtZW50RmFjdG9yeVwiOjR9XSw2OltmdW5jdGlvbih0LGUsbil7dmFyIHIsaSxvLHMsdT17fS5oYXNPd25Qcm9wZXJ0eTtpPXQoXCIuLi9saWIvbG9kYXNoLmpzXCIpLG89KHM9dChcIi4vaGVscGVyc1wiKSkuY2hhaW5hYmxlLGUuZXhwb3J0cz1yPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0LGUpe3RoaXMuVHJhbnNwYXJlbmN5PWUsdGhpcy5xdWVyeUNhY2hlPXt9LHRoaXMuY2hpbGROb2Rlcz1pLnRvQXJyYXkodC5jaGlsZE5vZGVzKSx0aGlzLmVsZW1lbnRzPXMuZ2V0RWxlbWVudHModCl9cmV0dXJuIHQucHJvdG90eXBlLnJlbW92ZT1vKGZ1bmN0aW9uKCl7dmFyIHQsZSxuLHIsaTtmb3Iocj10aGlzLmNoaWxkTm9kZXMsaT1bXSx0PTAsZT1yLmxlbmd0aDtlPnQ7dCsrKW49clt0XSxpLnB1c2gobi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pKTtyZXR1cm4gaX0pLHQucHJvdG90eXBlLmFwcGVuZFRvPW8oZnVuY3Rpb24odCl7dmFyIGUsbixyLGksbztmb3IoaT10aGlzLmNoaWxkTm9kZXMsbz1bXSxlPTAsbj1pLmxlbmd0aDtuPmU7ZSsrKXI9aVtlXSxvLnB1c2godC5hcHBlbmRDaGlsZChyKSk7cmV0dXJuIG99KSx0LnByb3RvdHlwZS5wcmVwYXJlPW8oZnVuY3Rpb24odCl7dmFyIGUsbixyLGksbztmb3IoaT10aGlzLmVsZW1lbnRzLG89W10sbj0wLHI9aS5sZW5ndGg7cj5uO24rKyllPWlbbl0sZS5yZXNldCgpLG8ucHVzaChzLmRhdGEoZS5lbCkubW9kZWw9dCk7cmV0dXJuIG99KSx0LnByb3RvdHlwZS5yZW5kZXJWYWx1ZXM9byhmdW5jdGlvbih0LGUpe3ZhciBuLHIsbyxzO2lmKGkuaXNFbGVtZW50KHQpJiYobj10aGlzLmVsZW1lbnRzWzBdKSlyZXR1cm4gbi5lbXB0eSgpLmVsLmFwcGVuZENoaWxkKHQpO2lmKFwib2JqZWN0XCI9PXR5cGVvZiB0KXtvPVtdO2ZvcihyIGluIHQpdS5jYWxsKHQscikmJihzPXRbcl0sbnVsbCE9cyYmKGkuaXNTdHJpbmcocyl8fGkuaXNOdW1iZXIocyl8fGkuaXNCb29sZWFuKHMpfHxpLmlzRGF0ZShzKT9vLnB1c2goZnVuY3Rpb24oKXt2YXIgdCxlLGksbztmb3IoaT10aGlzLm1hdGNoaW5nRWxlbWVudHMociksbz1bXSx0PTAsZT1pLmxlbmd0aDtlPnQ7dCsrKW49aVt0XSxvLnB1c2gobi5yZW5kZXIocykpO3JldHVybiBvfS5jYWxsKHRoaXMpKTpcIm9iamVjdFwiPT10eXBlb2Ygcz9vLnB1c2goZS5wdXNoKHIpKTpvLnB1c2godm9pZCAwKSkpO3JldHVybiBvfX0pLHQucHJvdG90eXBlLnJlbmRlckRpcmVjdGl2ZXM9byhmdW5jdGlvbih0LGUsbil7dmFyIHIsaSxvLHM7cz1bXTtmb3IobyBpbiBuKXUuY2FsbChuLG8pJiYocj1uW29dLFwib2JqZWN0XCI9PXR5cGVvZiByJiYoXCJvYmplY3RcIiE9dHlwZW9mIHQmJih0PXt2YWx1ZTp0fSkscy5wdXNoKGZ1bmN0aW9uKCl7dmFyIG4scyx1LGw7Zm9yKHU9dGhpcy5tYXRjaGluZ0VsZW1lbnRzKG8pLGw9W10sbj0wLHM9dS5sZW5ndGg7cz5uO24rKylpPXVbbl0sbC5wdXNoKGkucmVuZGVyRGlyZWN0aXZlcyh0LGUscikpO3JldHVybiBsfS5jYWxsKHRoaXMpKSkpO3JldHVybiBzfSksdC5wcm90b3R5cGUucmVuZGVyQ2hpbGRyZW49byhmdW5jdGlvbih0LGUsbixyKXt2YXIgaSxvLHMsdSxsO2ZvcihsPVtdLG89MCx1PWUubGVuZ3RoO3U+bztvKyspcz1lW29dLGwucHVzaChmdW5jdGlvbigpe3ZhciBlLG8sdSxsO2Zvcih1PXRoaXMubWF0Y2hpbmdFbGVtZW50cyhzKSxsPVtdLGU9MCxvPXUubGVuZ3RoO28+ZTtlKyspaT11W2VdLGwucHVzaCh0aGlzLlRyYW5zcGFyZW5jeS5yZW5kZXIoaS5lbCx0W3NdLG5bc10scikpO3JldHVybiBsfS5jYWxsKHRoaXMpKTtyZXR1cm4gbH0pLHQucHJvdG90eXBlLm1hdGNoaW5nRWxlbWVudHM9ZnVuY3Rpb24odCl7dmFyIGUsbixyO3JldHVybiByPShlPXRoaXMucXVlcnlDYWNoZSlbdF18fChlW3RdPWZ1bmN0aW9uKCl7dmFyIGUscixpLG87Zm9yKGk9dGhpcy5lbGVtZW50cyxvPVtdLGU9MCxyPWkubGVuZ3RoO3I+ZTtlKyspbj1pW2VdLHRoaXMuVHJhbnNwYXJlbmN5Lm1hdGNoZXIobix0KSYmby5wdXNoKG4pO3JldHVybiBvfS5jYWxsKHRoaXMpKSxzLmxvZyhcIk1hdGNoaW5nIGVsZW1lbnRzIGZvciAnXCIrdCtcIic6XCIscikscn0sdH0oKX0se1wiLi4vbGliL2xvZGFzaC5qc1wiOjcsXCIuL2hlbHBlcnNcIjo1fV0sNzpbZnVuY3Rpb24odCxlLG4pe3ZhciByPXt9O3IudG9TdHJpbmc9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxyLnRvQXJyYXk9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPW5ldyBBcnJheSh0Lmxlbmd0aCksbj0wO248dC5sZW5ndGg7bisrKWVbbl09dFtuXTtyZXR1cm4gZX0sci5pc1N0cmluZz1mdW5jdGlvbih0KXtyZXR1cm5cIltvYmplY3QgU3RyaW5nXVwiPT1yLnRvU3RyaW5nLmNhbGwodCl9LHIuaXNOdW1iZXI9ZnVuY3Rpb24odCl7cmV0dXJuXCJbb2JqZWN0IE51bWJlcl1cIj09ci50b1N0cmluZy5jYWxsKHQpfSxyLmlzQXJyYXk9QXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24odCl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09ci50b1N0cmluZy5jYWxsKHQpfSxyLmlzRGF0ZT1mdW5jdGlvbih0KXtyZXR1cm5cIltvYmplY3QgRGF0ZV1cIj09PXIudG9TdHJpbmcuY2FsbCh0KX0sci5pc0VsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuISghdHx8MSE9PXQubm9kZVR5cGUpfSxyLmlzUGxhaW5WYWx1ZT1mdW5jdGlvbih0KXt2YXIgZTtyZXR1cm4gZT10eXBlb2YgdCxcIm9iamVjdFwiIT09ZSYmXCJmdW5jdGlvblwiIT09ZXx8bi5pc0RhdGUodCl9LHIuaXNCb29sZWFuPWZ1bmN0aW9uKHQpe3JldHVybiB0PT09ITB8fHQ9PT0hMX0sZS5leHBvcnRzPXJ9LHt9XX0se30sWzFdKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL3ZlbmRvci90cmFuc3BhcmVuY3kubWluLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGdsb2JhbHMgX193ZWJwYWNrX2FtZF9vcHRpb25zX18gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=