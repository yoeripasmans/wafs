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
//# sourceMappingURL=bundle.js.map