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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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

var _render = __webpack_require__(4);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
			_render2.default.overview(dataObject);
			//Initialize input method
			self.getInput(dataObject);
			console.log('Pokemons geladen');
		}).catch(function (error) {
			_sections2.default.toggle('error');
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
			_render2.default.detail(data);
		}).catch(function (error) {
			_sections2.default.toggle('error');
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
		_render2.default.overview(filterData);
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

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

var _routie = __webpack_require__(5);

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _router = __webpack_require__(2);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sections = __webpack_require__(0);

var _sections2 = _interopRequireDefault(_sections);

var _transparencyMin = __webpack_require__(6);

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
		_sections2.default.toggle('pokemons-detail');
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

exports.default = render;

/***/ }),
/* 5 */
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
/* 6 */
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
    }), ("undefined" != typeof jQuery && null !== jQuery || "undefined" != typeof Zepto && null !== Zepto) && (r = jQuery || Zepto, null != r && (r.fn.render = o.jQueryPlugin)), ("undefined" != typeof e && null !== e ? e.exports : void 0) && (e.exports = o), "undefined" != typeof window && null !== window && (window.Transparency = o), ("undefined" != "function" && null !== __webpack_require__(7) ? __webpack_require__(8) : void 0) && !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
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
/* 7 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODg1YWFkOTRlZjlhOWJiMTIxYTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvc2VjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL3JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL3ZlbmRvci9yb3V0aWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvdmVuZG9yL3RyYW5zcGFyZW5jeS5taW4uanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIl0sIm5hbWVzIjpbInNlY3Rpb25zIiwidG9nZ2xlIiwicm91dGUiLCJlbGVtZW50cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJsZW5ndGgiLCJpZCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImFwaSIsImdldFBva2Vtb25zIiwiY29uc29sZSIsImxvZyIsInNlbGYiLCJsb2FkZXIiLCJxdWVyeVNlbGVjdG9yIiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiY2FjaGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImRhdGFPYmplY3QiLCJyZXN1bHRzIiwibWFwIiwiaW5kZXgiLCJuYW1lIiwidXJsIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvdmVydmlldyIsImdldElucHV0IiwiY2F0Y2giLCJlcnJvciIsImdldFBva2Vtb25EZXRhaWwiLCJwYXJzZSIsImdldEl0ZW0iLCJkYXRhRGV0YWlsIiwiZmlsdGVyIiwib2JqIiwiZGV0YWlsIiwic2VhcmNoRm9ybSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidmFsdWUiLCJmaWx0ZXJEYXRhIiwiaW5jbHVkZXMiLCJyb3V0ZXIiLCJpbml0IiwiYXBwIiwicmVuZGVyIiwiZGlyZWN0aXZlcyIsInRleHQiLCJwYXJhbXMiLCJsaW5rIiwiaHJlZiIsImltZyIsInNyYyIsIlRyYW5zcGFyZW5jeSIsImJhY2tncm91bmRDb2xvclRvZ2dsZSIsImJhY2tncm91bmQiLCJ0eXBlcyIsInR5cGUiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsIlJvdXRpZSIsInciLCJpc01vZHVsZSIsInJvdXRlcyIsInJlZmVyZW5jZSIsIm9sZFJlZmVyZW5jZSIsIlJvdXRlIiwicGF0aCIsImtleXMiLCJmbnMiLCJyZWdleCIsInBhdGhUb1JlZ2V4cCIsInByb3RvdHlwZSIsImFkZEhhbmRsZXIiLCJmbiIsInB1c2giLCJyZW1vdmVIYW5kbGVyIiwiYyIsImYiLCJzcGxpY2UiLCJydW4iLCJhcHBseSIsIm1hdGNoIiwibSIsImV4ZWMiLCJsZW4iLCJrZXkiLCJ2YWwiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ0b1VSTCIsInBhcmFtIiwicmVwbGFjZSIsImluZGV4T2YiLCJFcnJvciIsInNlbnNpdGl2ZSIsInN0cmljdCIsIlJlZ0V4cCIsIkFycmF5Iiwiam9pbiIsImNvbmNhdCIsIl8iLCJzbGFzaCIsImZvcm1hdCIsImNhcHR1cmUiLCJvcHRpb25hbCIsInMiLCJzcGxpdCIsInJvdXRpZSIsInJlbG9hZCIsInAiLCJuYXZpZ2F0ZSIsImxvb2t1cCIsInJlbW92ZUFsbCIsIm9wdGlvbnMiLCJzaWxlbnQiLCJyZW1vdmVMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhhc2giLCJhZGRMaXN0ZW5lciIsIm5vQ29uZmxpY3QiLCJnZXRIYXNoIiwic3Vic3RyaW5nIiwiY2hlY2tSb3V0ZSIsImhhc2hDaGFuZ2VkIiwiYXR0YWNoRXZlbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGV0YWNoRXZlbnQiLCJtb2R1bGUiLCJleHBvcnRzIiwidCIsIm4iLCJyIiwidSIsImwiLCJyZXF1aXJlIiwibyIsImEiLCJjb2RlIiwiaCIsImNhbGwiLCJkZWJ1ZyIsImNvbnNvbGVMb2dnZXIiLCJudWxsTG9nZ2VyIiwiaXNBcnJheSIsImNvbnRleHQiLCJlbCIsIm1hdGNoZXIiLCJjbGFzc05hbWVzIiwiZ2V0QXR0cmlidXRlIiwiY2xvbmUiLCJqUXVlcnlQbHVnaW4iLCJjaGFpbmFibGUiLCJqUXVlcnkiLCJaZXB0byIsImNvbnN0cnVjdG9yIiwiX19zdXBlcl9fIiwiaGFzT3duUHJvcGVydHkiLCJBdHRyaWJ1dGVzIiwiY3JlYXRlQXR0cmlidXRlIiwidGVtcGxhdGVWYWx1ZSIsInNldCIsInNldEF0dHJpYnV0ZSIsInRvU3RyaW5nIiwicmVtb3ZlQXR0cmlidXRlIiwiY2hpbGROb2RlcyIsIm5vZGVUeXBlIiwiVEVYVF9OT0RFIiwibm9kZVZhbHVlIiwiY2hpbGRyZW4iLCJ0b0FycmF5IiwidGV4dE5vZGUiLCJmaXJzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwib3duZXJEb2N1bWVudCIsImNyZWF0ZVRleHROb2RlIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVDaGlsZCIsImh0bWwiLCJpbm5lckhUTUwiLCJiZWZvcmUiLCJhZnRlciIsImNsb25lTm9kZSIsInRlbXBsYXRlIiwiaW5zdGFuY2VzIiwiaW5zdGFuY2VDYWNoZSIsInBhcmVudCIsInBhcmVudE5vZGUiLCJuZXh0U2libGluZyIsInBvcCIsImFwcGVuZFRvIiwicHJlcGFyZSIsInJlbmRlclZhbHVlcyIsInJlbmRlckRpcmVjdGl2ZXMiLCJyZW5kZXJDaGlsZHJlbiIsImQiLCJFbGVtZW50cyIsImlucHV0IiwiY3JlYXRlRWxlbWVudCIsIm5vZGVOYW1lIiwidG9Mb3dlckNhc2UiLCJhdHRyaWJ1dGVzIiwiY2xhc3NOYW1lIiwib3JpZ2luYWxBdHRyaWJ1dGVzIiwiZW1wdHkiLCJyZXNldCIsImF0dHIiLCJlbGVtZW50IiwiZ2V0RWxlbWVudHMiLCJzZWxlY3QiLCJhcmd1bWVudHMiLCJ0ZXh0YXJlYSIsImNoZWNrYm94IiwiQm9vbGVhbiIsInJhZGlvIiwib25seVdpdGgkIiwiRUxFTUVOVF9OT0RFIiwib3V0ZXJIVE1MIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJxdWVyeUNhY2hlIiwibW9kZWwiLCJpc0VsZW1lbnQiLCJpc1N0cmluZyIsImlzTnVtYmVyIiwiaXNCb29sZWFuIiwiaXNEYXRlIiwibWF0Y2hpbmdFbGVtZW50cyIsIk9iamVjdCIsImlzUGxhaW5WYWx1ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBLElBQU1BLFdBQVc7O0FBRWhCQyxTQUFRLGdCQUFTQyxLQUFULEVBQWdCOztBQUV2QixNQUFJQyxXQUFXQyxTQUFTQyxnQkFBVCxDQUEwQixTQUExQixDQUFmOztBQUVBLE9BQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxTQUFTSSxNQUE3QixFQUFxQ0QsR0FBckMsRUFBMEM7QUFDekM7QUFDQSxPQUFJSCxTQUFTRyxDQUFULEVBQVlFLEVBQVosS0FBbUJOLEtBQXZCLEVBQThCO0FBQzdCQyxhQUFTRyxDQUFULEVBQVlHLFNBQVosQ0FBc0JDLEdBQXRCLENBQTBCLE1BQTFCO0FBQ0EsSUFGRCxNQUVP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Q0FBM0IsSUFBOEI4RixFQUFFOEYsTUFBRixDQUFTL0YsQ0FBVCxDQUFoRDtBQUE0RCxLQUE3aUIsRUFBOGlCRSxFQUFFNEYsU0FBRixHQUFZLFVBQVM5RixDQUFULEVBQVc7QUFBQyxhQUFPQSxNQUFJLENBQUMsQ0FBTCxJQUFRQSxNQUFJLENBQUMsQ0FBcEI7QUFBc0IsS0FBNWxCLEVBQTZsQjdGLEVBQUU0RixPQUFGLEdBQVVHLENBQXZtQjtBQUF5bUIsR0FBbm9CLEVBQW9vQixFQUFwb0IsQ0FBenRWLEVBQXJiLEVBQXV4WCxFQUF2eFgsRUFBMHhYLENBQUMsQ0FBRCxDQUExeFgsQ0FBRCxDOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODg1YWFkOTRlZjlhOWJiMTIxYTUiLCJjb25zdCBzZWN0aW9ucyA9IHtcblxuXHR0b2dnbGU6IGZ1bmN0aW9uKHJvdXRlKSB7XG5cblx0XHR2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzZWN0aW9uJyk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQvL0lmIHRoZSBoYXNoIGlzIGVxdWFsIHRvIGFuIGlkIG9mIGEgc2VjdGlvbiBzaG93IHRoYXQgc2VjdGlvbi4gSWYgbm90IGhpZGUgaXQuXG5cdFx0XHRpZiAoZWxlbWVudHNbaV0uaWQgPT09IHJvdXRlKSB7XG5cdFx0XHRcdGVsZW1lbnRzW2ldLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbWVudHNbaV0uY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG5cdFx0XHR9XG5cblx0XHR9XG5cdH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNlY3Rpb25zO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvc2VjdGlvbnMuanMiLCJpbXBvcnQgc2VjdGlvbnMgZnJvbSAnLi9zZWN0aW9ucyc7XG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vcmVuZGVyJztcblxuY29uc3QgYXBpID0ge1xuXG5cdC8vR2V0IHRoZSBkYXRhIGZyb20gdGhlIHBva2Vtb24gQVBJXG5cdGdldFBva2Vtb25zOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZygnUG9rZW1vbnMgd29yZGVuIGdlbGFkZW4nKTtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0Ly9TaG93IGxvYWRlclxuXHRcdHZhciBsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGVyJyk7XG5cdFx0bG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuXHRcdC8vR2V0IHRoZSBkYXRhXG5cdFx0ZmV0Y2goJ2h0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbj9saW1pdD0xNTEnLCB7XG5cdFx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRcdG1vZGU6ICdjb3JzJyxcblx0XHRcdFx0Y2FjaGU6ICdkZWZhdWx0J1xuXHRcdFx0fSlcblx0XHRcdC8vUmV0dXJuIGRhdGEgYXMganNvblxuXHRcdFx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdH0pXG5cdFx0XHQudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdC8vQWRkIGFuIElEIHRvIGV2ZXJ5IG9iamVjdCB3aXRoIG1hcCBmdW5jdGlvblxuXHRcdFx0XHR2YXIgZGF0YU9iamVjdCA9IGRhdGEucmVzdWx0cy5tYXAoZnVuY3Rpb24oaSwgaW5kZXgpIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0aWQ6IGluZGV4LFxuXHRcdFx0XHRcdFx0bmFtZTogaS5uYW1lLFxuXHRcdFx0XHRcdFx0dXJsOiBpLnVybFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQvL1NhdmUgZGF0YSBpbiBsb2NhbCBzdG9yYWdlXG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRhT2JqZWN0JywgSlNPTi5zdHJpbmdpZnkoZGF0YU9iamVjdCkpO1xuXHRcdFx0XHQvL1JlbW92ZSBMb2FkZXJcblx0XHRcdFx0bG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuXHRcdFx0XHQvL1JlbmRlciBwb2tlbW9uIG92ZXJ2aWV3XG5cdFx0XHRcdHJlbmRlci5vdmVydmlldyhkYXRhT2JqZWN0KTtcblx0XHRcdFx0Ly9Jbml0aWFsaXplIGlucHV0IG1ldGhvZFxuXHRcdFx0XHRzZWxmLmdldElucHV0KGRhdGFPYmplY3QpO1xuXHRcdFx0XHRjb25zb2xlLmxvZygnUG9rZW1vbnMgZ2VsYWRlbicpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0XHRzZWN0aW9ucy50b2dnbGUoJ2Vycm9yJyk7XG5cdFx0XHR9KTtcblx0fSxcblxuXHRnZXRQb2tlbW9uRGV0YWlsOiBmdW5jdGlvbihuYW1lKSB7XG5cdFx0Y29uc29sZS5sb2coJ1Bva2Vtb24gZGV0YWlsIHBhZ2luYSB3b3JkdCBnZWxhZGVuJyk7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdC8vU2hvdyBsb2FkZXJcblx0XHR2YXIgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcicpO1xuXHRcdGxvYWRlci5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcblx0XHQvL0dldCBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXG5cdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhT2JqZWN0JykpO1xuXG5cdFx0Ly9HZXQgdGhlIG9iamVjdCB3aXRoIHRoZSBuYW1lIG9mIG5hbWUgb2YgdGhlIHBhcmFtZXRlciBhbmQgc2F2ZSBpdCBpbiB2YXJpYWJsZVxuXHRcdHZhciBkYXRhRGV0YWlsID0gZGF0YS5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XG5cdFx0XHRpZiAob2JqLm5hbWUgPT0gbmFtZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vR2V0IGRhdGEgb2YgdGhlIGRldGFpbCBvYmplY3Rcblx0XHRmZXRjaChkYXRhRGV0YWlsWzBdLnVybClcblx0XHRcdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRsb2FkZXIuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG5cdFx0XHRcdHJlbmRlci5kZXRhaWwoZGF0YSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRcdHNlY3Rpb25zLnRvZ2dsZSgnZXJyb3InKTtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdFx0fSk7XG5cblxuXHR9LFxuXG5cdGdldElucHV0OiBmdW5jdGlvbihkYXRhT2JqZWN0KSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBzZWFyY2hGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpO1xuXHRcdHNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRzZWxmLmZpbHRlcih0aGlzLnZhbHVlLCBkYXRhT2JqZWN0KTtcblx0XHR9KTtcblx0fSxcblxuXHRmaWx0ZXI6IGZ1bmN0aW9uKHZhbHVlLCBkYXRhT2JqZWN0KSB7XG5cdFx0dmFyIGZpbHRlckRhdGEgPSBkYXRhT2JqZWN0LmZpbHRlcihmdW5jdGlvbihvYmopIHtcblx0XHRcdGlmIChvYmoubmFtZS5pbmNsdWRlcyh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmlsdGVyRGF0YTtcblx0XHR9KTtcblx0XHRyZW5kZXIub3ZlcnZpZXcoZmlsdGVyRGF0YSk7XG5cdH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXBpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvYXBpLmpzIiwiaW1wb3J0IHNlY3Rpb25zIGZyb20gJy4vc2VjdGlvbnMuanMnO1xuaW1wb3J0IGFwaSBmcm9tICcuL2FwaS5qcyc7XG5pbXBvcnQgcm91dGllIGZyb20gJy4vdmVuZG9yL3JvdXRpZS5qcyc7XG5cbmNvbnN0IHJvdXRlciA9IHtcblx0Ly9TZXQgdGhlIHJvdXRlclxuXHRpbml0OiBmdW5jdGlvbigpIHtcblxuXHRcdHJvdXRpZSh7XG5cdFx0XHQnJzogKCkgPT4ge1xuXHRcdFx0XHRyb3V0aWUoJ2hvbWUnKTtcblx0XHRcdH0sXG5cdFx0XHQnaG9tZSc6ICgpID0+IHtcblx0XHRcdFx0c2VjdGlvbnMudG9nZ2xlKCdob21lJyk7XG5cdFx0XHR9LFxuXHRcdFx0J3Bva2Vtb25zJzogKCkgPT4ge1xuXHRcdFx0XHRzZWN0aW9ucy50b2dnbGUoJ3Bva2Vtb25zJyk7XG5cdFx0XHR9LFxuXHRcdFx0J3Bva2Vtb25zLzpuYW1lJzogKG5hbWUpID0+IHtcblx0XHRcdFx0YXBpLmdldFBva2Vtb25EZXRhaWwobmFtZSk7XG5cdFx0XHR9LFxuXHRcdH0pO1xuXHR9LFxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9yb3V0ZXIuanMiLCJpbXBvcnQgcm91dGVyIGZyb20gJy4vbW9kdWxlcy9yb3V0ZXIuanMnO1xuaW1wb3J0IGFwaSBmcm9tICcuL21vZHVsZXMvYXBpLmpzJztcblxuKGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Y29uc3QgYXBwID0ge1xuXHRcdC8vU3RhcnRzIGFwcCB3aXRoIGluaXRpYWxpemUgdGhlIHJvdXRlciBhbmQgZ2V0cyB0aGUgZGF0YVxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cm91dGVyLmluaXQoKTtcblx0XHRcdGFwaS5nZXRQb2tlbW9ucygpO1xuXHRcdH1cblx0fTtcblx0Ly9TdGFydCBhcHBcblx0YXBwLmluaXQoKTtcblxufSkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImltcG9ydCBzZWN0aW9ucyBmcm9tICcuL3NlY3Rpb25zJztcbmltcG9ydCB0cmFuc3BhcmVuY3kgZnJvbSAnLi92ZW5kb3IvdHJhbnNwYXJlbmN5Lm1pbi5qcyc7XG5cbmNvbnN0IHJlbmRlciA9IHtcblxuXHRvdmVydmlldzogZnVuY3Rpb24oZGF0YU9iamVjdCkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YU9iamVjdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRpcmVjdGl2ZXMgPSB7XG5cdFx0XHRcdG5hbWU6IHtcblx0XHRcdFx0XHR0ZXh0OiBmdW5jdGlvbihwYXJhbXMpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLm5hbWU7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0bGluazoge1xuXHRcdFx0XHRcdGhyZWY6IGZ1bmN0aW9uKHBhcmFtcykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFwiI3Bva2Vtb25zL1wiICsgdGhpcy5uYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0aW1nOiB7XG5cdFx0XHRcdFx0c3JjOiBmdW5jdGlvbihwYXJhbXMpIHtcblx0XHRcdFx0XHRcdHJldHVybiBcInN0YXRpYy9pbWcvcG9rZW1vbnMvXCIgKyAodGhpcy5pZCArIDEpICsgXCIucG5nXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0VHJhbnNwYXJlbmN5LnJlbmRlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9rZW1vbnMgdWwnKSwgZGF0YU9iamVjdCwgZGlyZWN0aXZlcyk7XG5cdFx0fVxuXG5cdH0sXG5cdGRldGFpbDogZnVuY3Rpb24oZGF0YU9iamVjdCkge1xuXHRcdHRoaXMuYmFja2dyb3VuZENvbG9yVG9nZ2xlKGRhdGFPYmplY3QpO1xuXG5cdFx0dmFyIGRpcmVjdGl2ZXMgPSB7XG5cdFx0XHRpbWc6IHtcblx0XHRcdFx0c3JjOiBmdW5jdGlvbihwYXJhbXMpIHtcblx0XHRcdFx0XHRyZXR1cm4gXCJzdGF0aWMvaW1nL3Bva2Vtb25zL1wiICsgdGhpcy5pZCArIFwiLnBuZ1wiO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9O1xuXHRcdFRyYW5zcGFyZW5jeS5yZW5kZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bva2Vtb25zLWRldGFpbCcpLCBkYXRhT2JqZWN0LCBkaXJlY3RpdmVzKTtcblx0XHRzZWN0aW9ucy50b2dnbGUoJ3Bva2Vtb25zLWRldGFpbCcpO1xuXHR9LFxuXG5cdGJhY2tncm91bmRDb2xvclRvZ2dsZTogZnVuY3Rpb24oZGF0YU9iamVjdCkge1xuXHRcdHZhciBiYWNrZ3JvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwb2tlbW9ucy1kZXRhaWxcIik7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFPYmplY3QudHlwZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChkYXRhT2JqZWN0LnR5cGVzW2ldLnR5cGUubmFtZSA9PSBcImZpcmVcIikge1xuXHRcdFx0XHRiYWNrZ3JvdW5kLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0U2Mzk0NlwiO1xuXHRcdFx0fSBlbHNlIGlmIChkYXRhT2JqZWN0LnR5cGVzW2ldLnR5cGUubmFtZSA9PSBcIndhdGVyXCIpIHtcblx0XHRcdFx0YmFja2dyb3VuZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM1QkMwRUJcIjtcblx0XHRcdH0gZWxzZSBpZiAoZGF0YU9iamVjdC50eXBlc1tpXS50eXBlLm5hbWUgPT0gXCJncmFzc1wiKSB7XG5cdFx0XHRcdGJhY2tncm91bmQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOUJDNTNEXCI7XG5cdFx0XHR9IGVsc2UgaWYgKGRhdGFPYmplY3QudHlwZXNbaV0udHlwZS5uYW1lID09IFwicG9pc29uXCIpIHtcblx0XHRcdFx0YmFja2dyb3VuZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMzRDMxNUJcIjtcblx0XHRcdH0gZWxzZSBpZiAoZGF0YU9iamVjdC50eXBlc1tpXS50eXBlLm5hbWUgPT0gXCJub3JtYWxcIikge1xuXHRcdFx0XHRiYWNrZ3JvdW5kLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiO1xuXHRcdFx0fSBlbHNlIGlmIChkYXRhT2JqZWN0LnR5cGVzW2ldLnR5cGUubmFtZSA9PSBcImVsZWN0cmljXCIpIHtcblx0XHRcdFx0YmFja2dyb3VuZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGRkUwNjZcIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJhY2tncm91bmQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMEIxMzJCXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9yZW5kZXIuanMiLCIvKiFcbiAqIHJvdXRpZSAtIGEgdGlueSBoYXNoIHJvdXRlclxuICogdjAuMy4yXG4gKiBodHRwOi8vcHJvamVjdHMuamdhLm1lL3JvdXRpZVxuICogY29weXJpZ2h0IEdyZWcgQWxsZW4gMjAxNlxuICogTUlUIExpY2Vuc2VcbiovXG52YXIgUm91dGllID0gZnVuY3Rpb24odywgaXNNb2R1bGUpIHtcblxuICB2YXIgcm91dGVzID0gW107XG4gIHZhciBtYXAgPSB7fTtcbiAgdmFyIHJlZmVyZW5jZSA9IFwicm91dGllXCI7XG4gIHZhciBvbGRSZWZlcmVuY2UgPSB3W3JlZmVyZW5jZV07XG5cbiAgdmFyIFJvdXRlID0gZnVuY3Rpb24ocGF0aCwgbmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLmtleXMgPSBbXTtcbiAgICB0aGlzLmZucyA9IFtdO1xuICAgIHRoaXMucGFyYW1zID0ge307XG4gICAgdGhpcy5yZWdleCA9IHBhdGhUb1JlZ2V4cCh0aGlzLnBhdGgsIHRoaXMua2V5cywgZmFsc2UsIGZhbHNlKTtcblxuICB9O1xuXG4gIFJvdXRlLnByb3RvdHlwZS5hZGRIYW5kbGVyID0gZnVuY3Rpb24oZm4pIHtcbiAgICB0aGlzLmZucy5wdXNoKGZuKTtcbiAgfTtcblxuICBSb3V0ZS5wcm90b3R5cGUucmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGMgPSB0aGlzLmZucy5sZW5ndGg7IGkgPCBjOyBpKyspIHtcbiAgICAgIHZhciBmID0gdGhpcy5mbnNbaV07XG4gICAgICBpZiAoZm4gPT0gZikge1xuICAgICAgICB0aGlzLmZucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIGZvciAodmFyIGkgPSAwLCBjID0gdGhpcy5mbnMubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICB0aGlzLmZuc1tpXS5hcHBseSh0aGlzLCBwYXJhbXMpO1xuICAgIH1cbiAgfTtcblxuICBSb3V0ZS5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbihwYXRoLCBwYXJhbXMpe1xuICAgIHZhciBtID0gdGhpcy5yZWdleC5leGVjKHBhdGgpO1xuXG4gICAgaWYgKCFtKSByZXR1cm4gZmFsc2U7XG5cblxuICAgIGZvciAodmFyIGkgPSAxLCBsZW4gPSBtLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB2YXIga2V5ID0gdGhpcy5rZXlzW2kgLSAxXTtcblxuICAgICAgdmFyIHZhbCA9ICgnc3RyaW5nJyA9PSB0eXBlb2YgbVtpXSkgPyBkZWNvZGVVUklDb21wb25lbnQobVtpXSkgOiBtW2ldO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRoaXMucGFyYW1zW2tleS5uYW1lXSA9IHZhbDtcbiAgICAgIH1cbiAgICAgIHBhcmFtcy5wdXNoKHZhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLnRvVVJMID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgdmFyIHBhdGggPSB0aGlzLnBhdGg7XG4gICAgZm9yICh2YXIgcGFyYW0gaW4gcGFyYW1zKSB7XG4gICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKCcvOicrcGFyYW0sICcvJytwYXJhbXNbcGFyYW1dKTtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFwvOi4qXFw/L2csICcvJykucmVwbGFjZSgvXFw/L2csICcnKTtcbiAgICBpZiAocGF0aC5pbmRleE9mKCc6JykgIT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyBwYXJhbWV0ZXJzIGZvciB1cmw6ICcrcGF0aCk7XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xuICB9O1xuXG4gIHZhciBwYXRoVG9SZWdleHAgPSBmdW5jdGlvbihwYXRoLCBrZXlzLCBzZW5zaXRpdmUsIHN0cmljdCkge1xuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSByZXR1cm4gcGF0aDtcbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEFycmF5KSBwYXRoID0gJygnICsgcGF0aC5qb2luKCd8JykgKyAnKSc7XG4gICAgcGF0aCA9IHBhdGhcbiAgICAgIC5jb25jYXQoc3RyaWN0ID8gJycgOiAnLz8nKVxuICAgICAgLnJlcGxhY2UoL1xcL1xcKC9nLCAnKD86LycpXG4gICAgICAucmVwbGFjZSgvXFwrL2csICdfX3BsdXNfXycpXG4gICAgICAucmVwbGFjZSgvKFxcLyk/KFxcLik/OihcXHcrKSg/OihcXCguKj9cXCkpKT8oXFw/KT8vZywgZnVuY3Rpb24oXywgc2xhc2gsIGZvcm1hdCwga2V5LCBjYXB0dXJlLCBvcHRpb25hbCl7XG4gICAgICAgIGtleXMucHVzaCh7IG5hbWU6IGtleSwgb3B0aW9uYWw6ICEhIG9wdGlvbmFsIH0pO1xuICAgICAgICBzbGFzaCA9IHNsYXNoIHx8ICcnO1xuICAgICAgICByZXR1cm4gJycgKyAob3B0aW9uYWwgPyAnJyA6IHNsYXNoKSArICcoPzonICsgKG9wdGlvbmFsID8gc2xhc2ggOiAnJykgKyAoZm9ybWF0IHx8ICcnKSArIChjYXB0dXJlIHx8IChmb3JtYXQgJiYgJyhbXi8uXSs/KScgfHwgJyhbXi9dKz8pJykpICsgJyknICsgKG9wdGlvbmFsIHx8ICcnKTtcbiAgICAgIH0pXG4gICAgICAucmVwbGFjZSgvKFtcXC8uXSkvZywgJ1xcXFwkMScpXG4gICAgICAucmVwbGFjZSgvX19wbHVzX18vZywgJyguKyknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnKC4qKScpO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHBhdGggKyAnJCcsIHNlbnNpdGl2ZSA/ICcnIDogJ2knKTtcbiAgfTtcblxuICB2YXIgYWRkSGFuZGxlciA9IGZ1bmN0aW9uKHBhdGgsIGZuKSB7XG4gICAgdmFyIHMgPSBwYXRoLnNwbGl0KCcgJyk7XG4gICAgdmFyIG5hbWUgPSAocy5sZW5ndGggPT0gMikgPyBzWzBdIDogbnVsbDtcbiAgICBwYXRoID0gKHMubGVuZ3RoID09IDIpID8gc1sxXSA6IHNbMF07XG5cbiAgICBpZiAoIW1hcFtwYXRoXSkge1xuICAgICAgbWFwW3BhdGhdID0gbmV3IFJvdXRlKHBhdGgsIG5hbWUpO1xuICAgICAgcm91dGVzLnB1c2gobWFwW3BhdGhdKTtcbiAgICB9XG4gICAgbWFwW3BhdGhdLmFkZEhhbmRsZXIoZm4pO1xuICB9O1xuXG4gIHZhciByb3V0aWUgPSBmdW5jdGlvbihwYXRoLCBmbikge1xuICAgIGlmICh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYWRkSGFuZGxlcihwYXRoLCBmbik7XG4gICAgICByb3V0aWUucmVsb2FkKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGF0aCA9PSAnb2JqZWN0Jykge1xuICAgICAgZm9yICh2YXIgcCBpbiBwYXRoKSB7XG4gICAgICAgIGFkZEhhbmRsZXIocCwgcGF0aFtwXSk7XG4gICAgICB9XG4gICAgICByb3V0aWUucmVsb2FkKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZm4gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByb3V0aWUubmF2aWdhdGUocGF0aCk7XG4gICAgfVxuICB9O1xuXG4gIHJvdXRpZS5sb29rdXAgPSBmdW5jdGlvbihuYW1lLCBvYmopIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYyA9IHJvdXRlcy5sZW5ndGg7IGkgPCBjOyBpKyspIHtcbiAgICAgIHZhciByb3V0ZSA9IHJvdXRlc1tpXTtcbiAgICAgIGlmIChyb3V0ZS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHJvdXRlLnRvVVJMKG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJvdXRpZS5yZW1vdmUgPSBmdW5jdGlvbihwYXRoLCBmbikge1xuICAgIHZhciByb3V0ZSA9IG1hcFtwYXRoXTtcbiAgICBpZiAoIXJvdXRlKVxuICAgICAgcmV0dXJuO1xuICAgIHJvdXRlLnJlbW92ZUhhbmRsZXIoZm4pO1xuICB9O1xuXG4gIHJvdXRpZS5yZW1vdmVBbGwgPSBmdW5jdGlvbigpIHtcbiAgICBtYXAgPSB7fTtcbiAgICByb3V0ZXMgPSBbXTtcbiAgfTtcblxuICByb3V0aWUubmF2aWdhdGUgPSBmdW5jdGlvbihwYXRoLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIHNpbGVudCA9IG9wdGlvbnMuc2lsZW50IHx8IGZhbHNlO1xuXG4gICAgaWYgKHNpbGVudCkge1xuICAgICAgcmVtb3ZlTGlzdGVuZXIoKTtcbiAgICB9XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcblxuICAgICAgaWYgKHNpbGVudCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGFkZExpc3RlbmVyKCk7XG4gICAgICAgIH0sIDEpO1xuICAgICAgfVxuXG4gICAgfSwgMSk7XG4gIH07XG5cbiAgcm91dGllLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICB3W3JlZmVyZW5jZV0gPSBvbGRSZWZlcmVuY2U7XG4gICAgcmV0dXJuIHJvdXRpZTtcbiAgfTtcblxuICB2YXIgZ2V0SGFzaCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSk7XG4gIH07XG5cbiAgdmFyIGNoZWNrUm91dGUgPSBmdW5jdGlvbihoYXNoLCByb3V0ZSkge1xuICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICBpZiAocm91dGUubWF0Y2goaGFzaCwgcGFyYW1zKSkge1xuICAgICAgcm91dGUucnVuKHBhcmFtcyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHZhciBoYXNoQ2hhbmdlZCA9IHJvdXRpZS5yZWxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGFzaCA9IGdldEhhc2goKTtcbiAgICBmb3IgKHZhciBpID0gMCwgYyA9IHJvdXRlcy5sZW5ndGg7IGkgPCBjOyBpKyspIHtcbiAgICAgIHZhciByb3V0ZSA9IHJvdXRlc1tpXTtcbiAgICAgIGlmIChjaGVja1JvdXRlKGhhc2gsIHJvdXRlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBhZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh3LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHcuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGhhc2hDaGFuZ2VkLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHcuYXR0YWNoRXZlbnQoJ29uaGFzaGNoYW5nZScsIGhhc2hDaGFuZ2VkKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHcucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgaGFzaENoYW5nZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3LmRldGFjaEV2ZW50KCdvbmhhc2hjaGFuZ2UnLCBoYXNoQ2hhbmdlZCk7XG4gICAgfVxuICB9O1xuICBhZGRMaXN0ZW5lcigpO1xuXG4gIGlmIChpc01vZHVsZSl7XG4gICAgcmV0dXJuIHJvdXRpZTtcbiAgfSBlbHNlIHtcbiAgICB3W3JlZmVyZW5jZV0gPSByb3V0aWU7XG4gIH1cblxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT0gJ3VuZGVmaW5lZCcpe1xuICBSb3V0aWUod2luZG93KTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gUm91dGllKHdpbmRvdyx0cnVlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL3ZlbmRvci9yb3V0aWUuanMiLCIhZnVuY3Rpb24gdChlLG4scil7ZnVuY3Rpb24gaShzLHUpe2lmKCFuW3NdKXtpZighZVtzXSl7dmFyIGw9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighdSYmbClyZXR1cm4gbChzLCEwKTtpZihvKXJldHVybiBvKHMsITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrcytcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIGg9bltzXT17ZXhwb3J0czp7fX07ZVtzXVswXS5jYWxsKGguZXhwb3J0cyxmdW5jdGlvbih0KXt2YXIgbj1lW3NdWzFdW3RdO3JldHVybiBpKG4/bjp0KX0saCxoLmV4cG9ydHMsdCxlLG4scil9cmV0dXJuIG5bc10uZXhwb3J0c31mb3IodmFyIG89XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxzPTA7czxyLmxlbmd0aDtzKyspaShyW3NdKTtyZXR1cm4gaX0oezE6W2Z1bmN0aW9uKHQsZSxuKXt2YXIgcixpLG8scyx1LGw9W10uaW5kZXhPZnx8ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTAsbj10aGlzLmxlbmd0aDtuPmU7ZSsrKWlmKGUgaW4gdGhpcyYmdGhpc1tlXT09PXQpcmV0dXJuIGU7cmV0dXJuLTF9O3M9dChcIi4uL2xpYi9sb2Rhc2guanNcIiksdT10KFwiLi9oZWxwZXJzXCIpLGk9dChcIi4vY29udGV4dFwiKSxvPXt9LG8ucmVuZGVyPWZ1bmN0aW9uKHQsZSxuLHIpe3ZhciBsLGE7cmV0dXJuIG51bGw9PWUmJihlPVtdKSxudWxsPT1uJiYobj17fSksbnVsbD09ciYmKHI9e30pLGE9ci5kZWJ1ZyYmY29uc29sZT91LmNvbnNvbGVMb2dnZXI6dS5udWxsTG9nZ2VyLGEoXCJUcmFuc3BhcmVuY3kucmVuZGVyOlwiLHQsZSxuLHIpLHQ/KHMuaXNBcnJheShlKXx8KGU9W2VdKSx0PShsPXUuZGF0YSh0KSkuY29udGV4dHx8KGwuY29udGV4dD1uZXcgaSh0LG8pKSx0LnJlbmRlcihlLG4scikuZWwpOnZvaWQgMH0sby5tYXRjaGVyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuZWwuaWQ9PT1lfHxsLmNhbGwodC5jbGFzc05hbWVzLGUpPj0wfHx0LmVsLm5hbWU9PT1lfHx0LmVsLmdldEF0dHJpYnV0ZShcImRhdGEtYmluZFwiKT09PWV9LG8uY2xvbmU9ZnVuY3Rpb24odCl7cmV0dXJuIHIodCkuY2xvbmUoKVswXX0sby5qUXVlcnlQbHVnaW49dS5jaGFpbmFibGUoZnVuY3Rpb24odCxlLG4pe3ZhciByLGkscyx1O2Zvcih1PVtdLGk9MCxzPXRoaXMubGVuZ3RoO3M+aTtpKyspcj10aGlzW2ldLHUucHVzaChvLnJlbmRlcihyLHQsZSxuKSk7cmV0dXJuIHV9KSwoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGpRdWVyeSYmbnVsbCE9PWpRdWVyeXx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFplcHRvJiZudWxsIT09WmVwdG8pJiYocj1qUXVlcnl8fFplcHRvLG51bGwhPXImJihyLmZuLnJlbmRlcj1vLmpRdWVyeVBsdWdpbikpLChcInVuZGVmaW5lZFwiIT10eXBlb2YgZSYmbnVsbCE9PWU/ZS5leHBvcnRzOnZvaWQgMCkmJihlLmV4cG9ydHM9byksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmbnVsbCE9PXdpbmRvdyYmKHdpbmRvdy5UcmFuc3BhcmVuY3k9byksKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBkZWZpbmUmJm51bGwhPT1kZWZpbmU/ZGVmaW5lLmFtZDp2b2lkIDApJiZkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gb30pfSx7XCIuLi9saWIvbG9kYXNoLmpzXCI6NyxcIi4vY29udGV4dFwiOjMsXCIuL2hlbHBlcnNcIjo1fV0sMjpbZnVuY3Rpb24odCxlLG4pe3ZhciByLGksbyxzLHUsbCxhLGgsYz1mdW5jdGlvbih0LGUpe2Z1bmN0aW9uIG4oKXt0aGlzLmNvbnN0cnVjdG9yPXR9Zm9yKHZhciByIGluIGUpcC5jYWxsKGUscikmJih0W3JdPWVbcl0pO3JldHVybiBuLnByb3RvdHlwZT1lLnByb3RvdHlwZSx0LnByb3RvdHlwZT1uZXcgbix0Ll9fc3VwZXJfXz1lLnByb3RvdHlwZSx0fSxwPXt9Lmhhc093blByb3BlcnR5O2E9dChcIi4uL2xpYi9sb2Rhc2hcIiksaD10KFwiLi9oZWxwZXJzXCIpLGUuZXhwb3J0cz1pPXtBdHRyaWJ1dGVzOnt9LGNyZWF0ZUF0dHJpYnV0ZTpmdW5jdGlvbih0LGUpe3ZhciBuO3JldHVybiBuZXcobj1pLkF0dHJpYnV0ZXNbZV18fHIpKHQsZSl9fSxyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0LGUpe3RoaXMuZWw9dCx0aGlzLm5hbWU9ZSx0aGlzLnRlbXBsYXRlVmFsdWU9dGhpcy5lbC5nZXRBdHRyaWJ1dGUodGhpcy5uYW1lKXx8XCJcIn1yZXR1cm4gdC5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmVsW3RoaXMubmFtZV09dCx0aGlzLmVsLnNldEF0dHJpYnV0ZSh0aGlzLm5hbWUsdC50b1N0cmluZygpKX0sdH0oKSxvPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUodCxlKXt0aGlzLmVsPXQsdGhpcy5uYW1lPWUsdGhpcy50ZW1wbGF0ZVZhbHVlPXRoaXMuZWwuZ2V0QXR0cmlidXRlKHRoaXMubmFtZSl8fCExfXZhciBuLHIsbyxzO2ZvcihjKGUsdCksbj1bXCJoaWRkZW5cIixcImFzeW5jXCIsXCJkZWZlclwiLFwiYXV0b2ZvY3VzXCIsXCJmb3Jtbm92YWxpZGF0ZVwiLFwiZGlzYWJsZWRcIixcImF1dG9mb2N1c1wiLFwiZm9ybW5vdmFsaWRhdGVcIixcIm11bHRpcGxlXCIsXCJyZWFkb25seVwiLFwicmVxdWlyZWRcIixcImNoZWNrZWRcIixcInNjb3BlZFwiLFwicmV2ZXJzZWRcIixcInNlbGVjdGVkXCIsXCJsb29wXCIsXCJtdXRlZFwiLFwiYXV0b3BsYXlcIixcImNvbnRyb2xzXCIsXCJzZWFtbGVzc1wiLFwiZGVmYXVsdFwiLFwiaXNtYXBcIixcIm5vdmFsaWRhdGVcIixcIm9wZW5cIixcInR5cGVtdXN0bWF0Y2hcIixcInRydWVzcGVlZFwiXSxyPTAsbz1uLmxlbmd0aDtvPnI7cisrKXM9bltyXSxpLkF0dHJpYnV0ZXNbc109ZTtyZXR1cm4gZS5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmVsW3RoaXMubmFtZV09dCx0P3RoaXMuZWwuc2V0QXR0cmlidXRlKHRoaXMubmFtZSx0aGlzLm5hbWUpOnRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKHRoaXMubmFtZSl9LGV9KHIpLGw9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0LGUpe3ZhciBuO3RoaXMuZWw9dCx0aGlzLm5hbWU9ZSx0aGlzLnRlbXBsYXRlVmFsdWU9ZnVuY3Rpb24oKXt2YXIgdCxlLHIsaTtmb3Iocj10aGlzLmVsLmNoaWxkTm9kZXMsaT1bXSx0PTAsZT1yLmxlbmd0aDtlPnQ7dCsrKW49clt0XSxuLm5vZGVUeXBlPT09aC5URVhUX05PREUmJmkucHVzaChuLm5vZGVWYWx1ZSk7cmV0dXJuIGl9LmNhbGwodGhpcykuam9pbihcIlwiKSx0aGlzLmNoaWxkcmVuPWEudG9BcnJheSh0aGlzLmVsLmNoaWxkcmVuKSwodGhpcy50ZXh0Tm9kZT10aGlzLmVsLmZpcnN0Q2hpbGQpP3RoaXMudGV4dE5vZGUubm9kZVR5cGUhPT1oLlRFWFRfTk9ERSYmKHRoaXMudGV4dE5vZGU9dGhpcy5lbC5pbnNlcnRCZWZvcmUodGhpcy5lbC5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpLHRoaXMudGV4dE5vZGUpKTp0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMudGV4dE5vZGU9dGhpcy5lbC5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpKX1yZXR1cm4gYyhlLHQpLGkuQXR0cmlidXRlcy50ZXh0PWUsZS5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuLHIsaSxvO2U9dGhpcy5lbC5maXJzdENoaWxkOyl0aGlzLmVsLnJlbW92ZUNoaWxkKGUpO2Zvcih0aGlzLnRleHROb2RlLm5vZGVWYWx1ZT10LHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy50ZXh0Tm9kZSksaT10aGlzLmNoaWxkcmVuLG89W10sbj0wLHI9aS5sZW5ndGg7cj5uO24rKyllPWlbbl0sby5wdXNoKHRoaXMuZWwuYXBwZW5kQ2hpbGQoZSkpO3JldHVybiBvfSxlfShyKSx1PWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUodCl7dGhpcy5lbD10LHRoaXMudGVtcGxhdGVWYWx1ZT1cIlwiLHRoaXMuY2hpbGRyZW49YS50b0FycmF5KHRoaXMuZWwuY2hpbGRyZW4pfXJldHVybiBjKGUsdCksaS5BdHRyaWJ1dGVzLmh0bWw9ZSxlLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG4scixpLG87ZT10aGlzLmVsLmZpcnN0Q2hpbGQ7KXRoaXMuZWwucmVtb3ZlQ2hpbGQoZSk7Zm9yKHRoaXMuZWwuaW5uZXJIVE1MPXQrdGhpcy50ZW1wbGF0ZVZhbHVlLGk9dGhpcy5jaGlsZHJlbixvPVtdLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspZT1pW25dLG8ucHVzaCh0aGlzLmVsLmFwcGVuZENoaWxkKGUpKTtyZXR1cm4gb30sZX0ocikscz1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKHQpe2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyx0LFwiY2xhc3NcIil9cmV0dXJuIGMoZSx0KSxpLkF0dHJpYnV0ZXNbXCJjbGFzc1wiXT1lLGV9KHIpfSx7XCIuLi9saWIvbG9kYXNoXCI6NyxcIi4vaGVscGVyc1wiOjV9XSwzOltmdW5jdGlvbih0LGUsbil7dmFyIHIsaSxvLHMsdSxsLGE7YT10KFwiLi9oZWxwZXJzXCIpLHM9YS5iZWZvcmUsbz1hLmFmdGVyLHU9YS5jaGFpbmFibGUsbD1hLmNsb25lTm9kZSxpPXQoXCIuL2luc3RhbmNlXCIpLGUuZXhwb3J0cz1yPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0LGUpe3RoaXMuZWw9dCx0aGlzLlRyYW5zcGFyZW5jeT1lLHRoaXMudGVtcGxhdGU9bCh0aGlzLmVsKSx0aGlzLmluc3RhbmNlcz1bbmV3IGkodGhpcy5lbCx0aGlzLlRyYW5zcGFyZW5jeSldLHRoaXMuaW5zdGFuY2VDYWNoZT1bXX12YXIgZSxuO3JldHVybiBuPXUoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wYXJlbnQ9dGhpcy5lbC5wYXJlbnROb2RlLHRoaXMucGFyZW50Pyh0aGlzLm5leHRTaWJsaW5nPXRoaXMuZWwubmV4dFNpYmxpbmcsdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcy5lbCkpOnZvaWQgMH0pLGU9dShmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudD90aGlzLm5leHRTaWJsaW5nP3RoaXMucGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLmVsLHRoaXMubmV4dFNpYmxpbmcpOnRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWwpOnZvaWQgMH0pLHQucHJvdG90eXBlLnJlbmRlcj1zKG4pKG8oZSkodShmdW5jdGlvbih0LGUsbil7Zm9yKHZhciByLG8scyx1LGEsaCxjO3QubGVuZ3RoPHRoaXMuaW5zdGFuY2VzLmxlbmd0aDspdGhpcy5pbnN0YW5jZUNhY2hlLnB1c2godGhpcy5pbnN0YW5jZXMucG9wKCkucmVtb3ZlKCkpO2Zvcig7dC5sZW5ndGg+dGhpcy5pbnN0YW5jZXMubGVuZ3RoOyl1PXRoaXMuaW5zdGFuY2VDYWNoZS5wb3AoKXx8bmV3IGkobCh0aGlzLnRlbXBsYXRlKSx0aGlzLlRyYW5zcGFyZW5jeSksdGhpcy5pbnN0YW5jZXMucHVzaCh1LmFwcGVuZFRvKHRoaXMuZWwpKTtmb3IoYz1bXSxzPW89MCxhPXQubGVuZ3RoO2E+bztzPSsrbyloPXRbc10sdT10aGlzLmluc3RhbmNlc1tzXSxyPVtdLGMucHVzaCh1LnByZXBhcmUoaCxyKS5yZW5kZXJWYWx1ZXMoaCxyKS5yZW5kZXJEaXJlY3RpdmVzKGgscyxlKS5yZW5kZXJDaGlsZHJlbihoLHIsZSxuKSk7cmV0dXJuIGN9KSkpLHR9KCl9LHtcIi4vaGVscGVyc1wiOjUsXCIuL2luc3RhbmNlXCI6Nn1dLDQ6W2Z1bmN0aW9uKHQsZSxuKXt2YXIgcixpLG8scyx1LGwsYSxoLGMscCxmLGQ9e30uaGFzT3duUHJvcGVydHksbT1mdW5jdGlvbih0LGUpe2Z1bmN0aW9uIG4oKXt0aGlzLmNvbnN0cnVjdG9yPXR9Zm9yKHZhciByIGluIGUpZC5jYWxsKGUscikmJih0W3JdPWVbcl0pO3JldHVybiBuLnByb3RvdHlwZT1lLnByb3RvdHlwZSx0LnByb3RvdHlwZT1uZXcgbix0Ll9fc3VwZXJfXz1lLnByb3RvdHlwZSx0fTtwPXQoXCIuLi9saWIvbG9kYXNoLmpzXCIpLGY9dChcIi4vaGVscGVyc1wiKSxyPXQoXCIuL2F0dHJpYnV0ZUZhY3RvcnlcIiksZS5leHBvcnRzPXM9e0VsZW1lbnRzOntpbnB1dDp7fX0sY3JlYXRlRWxlbWVudDpmdW5jdGlvbih0KXt2YXIgZSxuO3JldHVybiBuZXcoZT1cImlucHV0XCI9PT0obj10Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpP3MuRWxlbWVudHNbbl1bdC50eXBlLnRvTG93ZXJDYXNlKCldfHx1OnMuRWxlbWVudHNbbl18fG8pKHQpfX0sbz1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCl7dGhpcy5lbD10LHRoaXMuYXR0cmlidXRlcz17fSx0aGlzLmNoaWxkTm9kZXM9cC50b0FycmF5KHRoaXMuZWwuY2hpbGROb2RlcyksdGhpcy5ub2RlTmFtZT10aGlzLmVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksdGhpcy5jbGFzc05hbWVzPXRoaXMuZWwuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKSx0aGlzLm9yaWdpbmFsQXR0cmlidXRlcz17fX1yZXR1cm4gdC5wcm90b3R5cGUuZW1wdHk9ZnVuY3Rpb24oKXtmb3IodmFyIHQ7dD10aGlzLmVsLmZpcnN0Q2hpbGQ7KXRoaXMuZWwucmVtb3ZlQ2hpbGQodCk7cmV0dXJuIHRoaXN9LHQucHJvdG90eXBlLnJlc2V0PWZ1bmN0aW9uKCl7dmFyIHQsZSxuLHI7bj10aGlzLmF0dHJpYnV0ZXMscj1bXTtmb3IoZSBpbiBuKXQ9bltlXSxyLnB1c2godC5zZXQodC50ZW1wbGF0ZVZhbHVlKSk7cmV0dXJuIHJ9LHQucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5hdHRyKFwidGV4dFwiLHQpfSx0LnByb3RvdHlwZS5hdHRyPWZ1bmN0aW9uKHQsZSl7dmFyIG4saTtyZXR1cm4gbj0oaT10aGlzLmF0dHJpYnV0ZXMpW3RdfHwoaVt0XT1yLmNyZWF0ZUF0dHJpYnV0ZSh0aGlzLmVsLHQsZSkpLG51bGwhPWUmJm4uc2V0KGUpLG59LHQucHJvdG90eXBlLnJlbmRlckRpcmVjdGl2ZXM9ZnVuY3Rpb24odCxlLG4pe3ZhciByLGksbyxzO289W107Zm9yKGkgaW4gbilkLmNhbGwobixpKSYmKHI9bltpXSxcImZ1bmN0aW9uXCI9PXR5cGVvZiByJiYocz1yLmNhbGwodCx7ZWxlbWVudDp0aGlzLmVsLGluZGV4OmUsdmFsdWU6dGhpcy5hdHRyKGkpLnRlbXBsYXRlVmFsdWV9KSxudWxsIT1zP28ucHVzaCh0aGlzLmF0dHIoaSxzKSk6by5wdXNoKHZvaWQgMCkpKTtyZXR1cm4gb30sdH0oKSxhPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUodCl7ZS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLHQpLHRoaXMuZWxlbWVudHM9Zi5nZXRFbGVtZW50cyh0KX1yZXR1cm4gbShlLHQpLHMuRWxlbWVudHMuc2VsZWN0PWUsZS5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKHQpe3ZhciBlLG4scixpLG87Zm9yKHQ9dC50b1N0cmluZygpLGk9dGhpcy5lbGVtZW50cyxvPVtdLGU9MCxuPWkubGVuZ3RoO24+ZTtlKyspcj1pW2VdLFwib3B0aW9uXCI9PT1yLm5vZGVOYW1lJiZvLnB1c2goci5hdHRyKFwic2VsZWN0ZWRcIixyLmVsLnZhbHVlPT09dCkpO3JldHVybiBvfSxlfShvKSxjPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUoKXtyZXR1cm4gZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyxhcmd1bWVudHMpfXZhciBuLHIsaSxvO2ZvcihtKGUsdCksbj1bXCJhcmVhXCIsXCJiYXNlXCIsXCJiclwiLFwiY29sXCIsXCJjb21tYW5kXCIsXCJlbWJlZFwiLFwiaHJcIixcImltZ1wiLFwiaW5wdXRcIixcImtleWdlblwiLFwibGlua1wiLFwibWV0YVwiLFwicGFyYW1cIixcInNvdXJjZVwiLFwidHJhY2tcIixcIndiclwiXSxyPTAsaT1uLmxlbmd0aDtpPnI7cisrKW89bltyXSxzLkVsZW1lbnRzW29dPWU7cmV0dXJuIGUucHJvdG90eXBlLmF0dHI9ZnVuY3Rpb24odCxuKXtyZXR1cm5cInRleHRcIiE9PXQmJlwiaHRtbFwiIT09dD9lLl9fc3VwZXJfXy5hdHRyLmNhbGwodGhpcyx0LG4pOnZvaWQgMH0sZX0obyksdT1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKCl7cmV0dXJuIGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1yZXR1cm4gbShlLHQpLGUucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5hdHRyKFwidmFsdWVcIix0KX0sZX0oYyksaD1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKCl7cmV0dXJuIGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1yZXR1cm4gbShlLHQpLHMuRWxlbWVudHMudGV4dGFyZWE9ZSxlfSh1KSxpPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUoKXtyZXR1cm4gZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyxhcmd1bWVudHMpfXJldHVybiBtKGUsdCkscy5FbGVtZW50cy5pbnB1dC5jaGVja2JveD1lLGUucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5hdHRyKFwiY2hlY2tlZFwiLEJvb2xlYW4odCkpfSxlfSh1KSxsPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUoKXtyZXR1cm4gZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyxhcmd1bWVudHMpfXJldHVybiBtKGUsdCkscy5FbGVtZW50cy5pbnB1dC5yYWRpbz1lLGV9KGkpfSx7XCIuLi9saWIvbG9kYXNoLmpzXCI6NyxcIi4vYXR0cmlidXRlRmFjdG9yeVwiOjIsXCIuL2hlbHBlcnNcIjo1fV0sNTpbZnVuY3Rpb24odCxlLG4pe3ZhciByLGksbyxzO3I9dChcIi4vZWxlbWVudEZhY3RvcnlcIiksbi5iZWZvcmU9ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKSxlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19fSxuLmFmdGVyPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyksdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fX0sbi5jaGFpbmFibGU9bi5hZnRlcihmdW5jdGlvbigpe3JldHVybiB0aGlzfSksbi5vbmx5V2l0aCQ9ZnVuY3Rpb24odCl7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGpRdWVyeSYmbnVsbCE9PWpRdWVyeXx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFplcHRvJiZudWxsIT09WmVwdG8/ZnVuY3Rpb24oZSl7cmV0dXJuIHQoYXJndW1lbnRzKX0oalF1ZXJ5fHxaZXB0byk6dm9pZCAwfSxuLmdldEVsZW1lbnRzPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBlPVtdLGkodCxlKSxlfSxpPWZ1bmN0aW9uKHQsZSl7dmFyIG8scztmb3Iobz10LmZpcnN0Q2hpbGQscz1bXTtvOylvLm5vZGVUeXBlPT09bi5FTEVNRU5UX05PREUmJihlLnB1c2gobmV3IHIuY3JlYXRlRWxlbWVudChvKSksaShvLGUpKSxzLnB1c2gobz1vLm5leHRTaWJsaW5nKTtyZXR1cm4gc30sbi5FTEVNRU5UX05PREU9MSxuLlRFWFRfTk9ERT0zLHM9ZnVuY3Rpb24oKXtyZXR1cm5cIjw6bmF2PjwvOm5hdj5cIiE9PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIikuY2xvbmVOb2RlKCEwKS5vdXRlckhUTUx9LG4uY2xvbmVOb2RlPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBkb2N1bWVudHx8bnVsbD09PWRvY3VtZW50fHxzKCk/ZnVuY3Rpb24odCl7cmV0dXJuIHQuY2xvbmVOb2RlKCEwKX06ZnVuY3Rpb24odCl7dmFyIGUscixpLHMsdTtpZihlPVRyYW5zcGFyZW5jeS5jbG9uZSh0KSxlLm5vZGVUeXBlPT09bi5FTEVNRU5UX05PREUpZm9yKGUucmVtb3ZlQXR0cmlidXRlKG8pLHU9ZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIiksaT0wLHM9dS5sZW5ndGg7cz5pO2krKylyPXVbaV0sci5yZW1vdmVBdHRyaWJ1dGUobyk7cmV0dXJuIGV9LG89XCJ0cmFuc3BhcmVuY3lcIixuLmRhdGE9ZnVuY3Rpb24odCl7cmV0dXJuIHRbb118fCh0W29dPXt9KX0sbi5udWxsTG9nZ2VyPWZ1bmN0aW9uKCl7fSxuLmNvbnNvbGVMb2dnZXI9ZnVuY3Rpb24oKXtyZXR1cm4gY29uc29sZS5sb2coYXJndW1lbnRzKX0sbi5sb2c9bi5udWxsTG9nZ2VyfSx7XCIuL2VsZW1lbnRGYWN0b3J5XCI6NH1dLDY6W2Z1bmN0aW9uKHQsZSxuKXt2YXIgcixpLG8scyx1PXt9Lmhhc093blByb3BlcnR5O2k9dChcIi4uL2xpYi9sb2Rhc2guanNcIiksbz0ocz10KFwiLi9oZWxwZXJzXCIpKS5jaGFpbmFibGUsZS5leHBvcnRzPXI9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQsZSl7dGhpcy5UcmFuc3BhcmVuY3k9ZSx0aGlzLnF1ZXJ5Q2FjaGU9e30sdGhpcy5jaGlsZE5vZGVzPWkudG9BcnJheSh0LmNoaWxkTm9kZXMpLHRoaXMuZWxlbWVudHM9cy5nZXRFbGVtZW50cyh0KX1yZXR1cm4gdC5wcm90b3R5cGUucmVtb3ZlPW8oZnVuY3Rpb24oKXt2YXIgdCxlLG4scixpO2ZvcihyPXRoaXMuY2hpbGROb2RlcyxpPVtdLHQ9MCxlPXIubGVuZ3RoO2U+dDt0Kyspbj1yW3RdLGkucHVzaChuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobikpO3JldHVybiBpfSksdC5wcm90b3R5cGUuYXBwZW5kVG89byhmdW5jdGlvbih0KXt2YXIgZSxuLHIsaSxvO2ZvcihpPXRoaXMuY2hpbGROb2RlcyxvPVtdLGU9MCxuPWkubGVuZ3RoO24+ZTtlKyspcj1pW2VdLG8ucHVzaCh0LmFwcGVuZENoaWxkKHIpKTtyZXR1cm4gb30pLHQucHJvdG90eXBlLnByZXBhcmU9byhmdW5jdGlvbih0KXt2YXIgZSxuLHIsaSxvO2ZvcihpPXRoaXMuZWxlbWVudHMsbz1bXSxuPTAscj1pLmxlbmd0aDtyPm47bisrKWU9aVtuXSxlLnJlc2V0KCksby5wdXNoKHMuZGF0YShlLmVsKS5tb2RlbD10KTtyZXR1cm4gb30pLHQucHJvdG90eXBlLnJlbmRlclZhbHVlcz1vKGZ1bmN0aW9uKHQsZSl7dmFyIG4scixvLHM7aWYoaS5pc0VsZW1lbnQodCkmJihuPXRoaXMuZWxlbWVudHNbMF0pKXJldHVybiBuLmVtcHR5KCkuZWwuYXBwZW5kQ2hpbGQodCk7aWYoXCJvYmplY3RcIj09dHlwZW9mIHQpe289W107Zm9yKHIgaW4gdCl1LmNhbGwodCxyKSYmKHM9dFtyXSxudWxsIT1zJiYoaS5pc1N0cmluZyhzKXx8aS5pc051bWJlcihzKXx8aS5pc0Jvb2xlYW4ocyl8fGkuaXNEYXRlKHMpP28ucHVzaChmdW5jdGlvbigpe3ZhciB0LGUsaSxvO2ZvcihpPXRoaXMubWF0Y2hpbmdFbGVtZW50cyhyKSxvPVtdLHQ9MCxlPWkubGVuZ3RoO2U+dDt0Kyspbj1pW3RdLG8ucHVzaChuLnJlbmRlcihzKSk7cmV0dXJuIG99LmNhbGwodGhpcykpOlwib2JqZWN0XCI9PXR5cGVvZiBzP28ucHVzaChlLnB1c2gocikpOm8ucHVzaCh2b2lkIDApKSk7cmV0dXJuIG99fSksdC5wcm90b3R5cGUucmVuZGVyRGlyZWN0aXZlcz1vKGZ1bmN0aW9uKHQsZSxuKXt2YXIgcixpLG8scztzPVtdO2ZvcihvIGluIG4pdS5jYWxsKG4sbykmJihyPW5bb10sXCJvYmplY3RcIj09dHlwZW9mIHImJihcIm9iamVjdFwiIT10eXBlb2YgdCYmKHQ9e3ZhbHVlOnR9KSxzLnB1c2goZnVuY3Rpb24oKXt2YXIgbixzLHUsbDtmb3IodT10aGlzLm1hdGNoaW5nRWxlbWVudHMobyksbD1bXSxuPTAscz11Lmxlbmd0aDtzPm47bisrKWk9dVtuXSxsLnB1c2goaS5yZW5kZXJEaXJlY3RpdmVzKHQsZSxyKSk7cmV0dXJuIGx9LmNhbGwodGhpcykpKSk7cmV0dXJuIHN9KSx0LnByb3RvdHlwZS5yZW5kZXJDaGlsZHJlbj1vKGZ1bmN0aW9uKHQsZSxuLHIpe3ZhciBpLG8scyx1LGw7Zm9yKGw9W10sbz0wLHU9ZS5sZW5ndGg7dT5vO28rKylzPWVbb10sbC5wdXNoKGZ1bmN0aW9uKCl7dmFyIGUsbyx1LGw7Zm9yKHU9dGhpcy5tYXRjaGluZ0VsZW1lbnRzKHMpLGw9W10sZT0wLG89dS5sZW5ndGg7bz5lO2UrKylpPXVbZV0sbC5wdXNoKHRoaXMuVHJhbnNwYXJlbmN5LnJlbmRlcihpLmVsLHRbc10sbltzXSxyKSk7cmV0dXJuIGx9LmNhbGwodGhpcykpO3JldHVybiBsfSksdC5wcm90b3R5cGUubWF0Y2hpbmdFbGVtZW50cz1mdW5jdGlvbih0KXt2YXIgZSxuLHI7cmV0dXJuIHI9KGU9dGhpcy5xdWVyeUNhY2hlKVt0XXx8KGVbdF09ZnVuY3Rpb24oKXt2YXIgZSxyLGksbztmb3IoaT10aGlzLmVsZW1lbnRzLG89W10sZT0wLHI9aS5sZW5ndGg7cj5lO2UrKyluPWlbZV0sdGhpcy5UcmFuc3BhcmVuY3kubWF0Y2hlcihuLHQpJiZvLnB1c2gobik7cmV0dXJuIG99LmNhbGwodGhpcykpLHMubG9nKFwiTWF0Y2hpbmcgZWxlbWVudHMgZm9yICdcIit0K1wiJzpcIixyKSxyfSx0fSgpfSx7XCIuLi9saWIvbG9kYXNoLmpzXCI6NyxcIi4vaGVscGVyc1wiOjV9XSw3OltmdW5jdGlvbih0LGUsbil7dmFyIHI9e307ci50b1N0cmluZz1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLHIudG9BcnJheT1mdW5jdGlvbih0KXtmb3IodmFyIGU9bmV3IEFycmF5KHQubGVuZ3RoKSxuPTA7bjx0Lmxlbmd0aDtuKyspZVtuXT10W25dO3JldHVybiBlfSxyLmlzU3RyaW5nPWZ1bmN0aW9uKHQpe3JldHVyblwiW29iamVjdCBTdHJpbmddXCI9PXIudG9TdHJpbmcuY2FsbCh0KX0sci5pc051bWJlcj1mdW5jdGlvbih0KXtyZXR1cm5cIltvYmplY3QgTnVtYmVyXVwiPT1yLnRvU3RyaW5nLmNhbGwodCl9LHIuaXNBcnJheT1BcnJheS5pc0FycmF5fHxmdW5jdGlvbih0KXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1yLnRvU3RyaW5nLmNhbGwodCl9LHIuaXNEYXRlPWZ1bmN0aW9uKHQpe3JldHVyblwiW29iamVjdCBEYXRlXVwiPT09ci50b1N0cmluZy5jYWxsKHQpfSxyLmlzRWxlbWVudD1mdW5jdGlvbih0KXtyZXR1cm4hKCF0fHwxIT09dC5ub2RlVHlwZSl9LHIuaXNQbGFpblZhbHVlPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBlPXR5cGVvZiB0LFwib2JqZWN0XCIhPT1lJiZcImZ1bmN0aW9uXCIhPT1lfHxuLmlzRGF0ZSh0KX0sci5pc0Jvb2xlYW49ZnVuY3Rpb24odCl7cmV0dXJuIHQ9PT0hMHx8dD09PSExfSxlLmV4cG9ydHM9cn0se31dfSx7fSxbMV0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvdmVuZG9yL3RyYW5zcGFyZW5jeS5taW4uanMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHRocm93IG5ldyBFcnJvcihcImRlZmluZSBjYW5ub3QgYmUgdXNlZCBpbmRpcmVjdFwiKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBnbG9iYWxzIF9fd2VicGFja19hbWRfb3B0aW9uc19fICovXHJcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=