/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(115);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(15).Object.getPrototypeOf;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(5)
	  , $getPrototypeOf = __webpack_require__(7);

	__webpack_require__(13)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(6);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(8)
	  , toObject    = __webpack_require__(5)
	  , IE_PROTO    = __webpack_require__(9)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(10)('keys')
	  , uid    = __webpack_require__(12);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14)
	  , core    = __webpack_require__(15)
	  , fails   = __webpack_require__(24);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , core      = __webpack_require__(15)
	  , ctx       = __webpack_require__(16)
	  , hide      = __webpack_require__(18)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(17);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(19)
	  , createDesc = __webpack_require__(27);
	module.exports = __webpack_require__(23) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(20)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , toPrimitive    = __webpack_require__(26)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(23) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(23) && !__webpack_require__(24)(function(){
	  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(24)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21)
	  , document = __webpack_require__(11).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(21);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(30);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	var $Object = __webpack_require__(15).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(23), 'Object', {defineProperty: __webpack_require__(19).f});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(34);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(35);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(64);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(37);
	__webpack_require__(59);
	module.exports = __webpack_require__(63).f('iterator');

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(38)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(40)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(39)
	  , defined   = __webpack_require__(6);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(41)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(42)
	  , hide           = __webpack_require__(18)
	  , has            = __webpack_require__(8)
	  , Iterators      = __webpack_require__(43)
	  , $iterCreate    = __webpack_require__(44)
	  , setToStringTag = __webpack_require__(57)
	  , getPrototypeOf = __webpack_require__(7)
	  , ITERATOR       = __webpack_require__(58)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(45)
	  , descriptor     = __webpack_require__(27)
	  , setToStringTag = __webpack_require__(57)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(18)(IteratorPrototype, __webpack_require__(58)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(20)
	  , dPs         = __webpack_require__(46)
	  , enumBugKeys = __webpack_require__(55)
	  , IE_PROTO    = __webpack_require__(9)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(25)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(56).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(19)
	  , anObject = __webpack_require__(20)
	  , getKeys  = __webpack_require__(47);

	module.exports = __webpack_require__(23) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(48)
	  , enumBugKeys = __webpack_require__(55);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(8)
	  , toIObject    = __webpack_require__(49)
	  , arrayIndexOf = __webpack_require__(52)(false)
	  , IE_PROTO     = __webpack_require__(9)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(50)
	  , defined = __webpack_require__(6);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(51);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(49)
	  , toLength  = __webpack_require__(53)
	  , toIndex   = __webpack_require__(54);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(39)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(39)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11).document && document.documentElement;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(19).f
	  , has = __webpack_require__(8)
	  , TAG = __webpack_require__(58)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(10)('wks')
	  , uid        = __webpack_require__(12)
	  , Symbol     = __webpack_require__(11).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	var global        = __webpack_require__(11)
	  , hide          = __webpack_require__(18)
	  , Iterators     = __webpack_require__(43)
	  , TO_STRING_TAG = __webpack_require__(58)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(61)
	  , step             = __webpack_require__(62)
	  , Iterators        = __webpack_require__(43)
	  , toIObject        = __webpack_require__(49);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(40)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(58);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	module.exports = __webpack_require__(15).Symbol;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(11)
	  , has            = __webpack_require__(8)
	  , DESCRIPTORS    = __webpack_require__(23)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(42)
	  , META           = __webpack_require__(67).KEY
	  , $fails         = __webpack_require__(24)
	  , shared         = __webpack_require__(10)
	  , setToStringTag = __webpack_require__(57)
	  , uid            = __webpack_require__(12)
	  , wks            = __webpack_require__(58)
	  , wksExt         = __webpack_require__(63)
	  , wksDefine      = __webpack_require__(68)
	  , keyOf          = __webpack_require__(69)
	  , enumKeys       = __webpack_require__(70)
	  , isArray        = __webpack_require__(73)
	  , anObject       = __webpack_require__(20)
	  , toIObject      = __webpack_require__(49)
	  , toPrimitive    = __webpack_require__(26)
	  , createDesc     = __webpack_require__(27)
	  , _create        = __webpack_require__(45)
	  , gOPNExt        = __webpack_require__(74)
	  , $GOPD          = __webpack_require__(76)
	  , $DP            = __webpack_require__(19)
	  , $keys          = __webpack_require__(47)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(75).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(72).f  = $propertyIsEnumerable;
	  __webpack_require__(71).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(41)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(18)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(12)('meta')
	  , isObject = __webpack_require__(21)
	  , has      = __webpack_require__(8)
	  , setDesc  = __webpack_require__(19).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(24)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(11)
	  , core           = __webpack_require__(15)
	  , LIBRARY        = __webpack_require__(41)
	  , wksExt         = __webpack_require__(63)
	  , defineProperty = __webpack_require__(19).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(47)
	  , toIObject = __webpack_require__(49);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(47)
	  , gOPS    = __webpack_require__(71)
	  , pIE     = __webpack_require__(72);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 72 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(51);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(49)
	  , gOPN      = __webpack_require__(75).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(48)
	  , hiddenKeys = __webpack_require__(55).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(72)
	  , createDesc     = __webpack_require__(27)
	  , toIObject      = __webpack_require__(49)
	  , toPrimitive    = __webpack_require__(26)
	  , has            = __webpack_require__(8)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(23) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('asyncIterator');

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('observable');

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(81);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(85);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(34);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(83);
	module.exports = __webpack_require__(15).Object.setPrototypeOf;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(14);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(84).set});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(21)
	  , anObject = __webpack_require__(20);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(16)(Function.call, __webpack_require__(76).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	var $Object = __webpack_require__(15).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(45)});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(89);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BaseComponent = undefined;

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(33);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BaseComponent = exports.BaseComponent = function (_React$Component) {
	    (0, _inherits3.default)(BaseComponent, _React$Component);

	    function BaseComponent(props) {
	        (0, _classCallCheck3.default)(this, BaseComponent);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (BaseComponent.__proto__ || (0, _getPrototypeOf2.default)(BaseComponent)).call(this, props));

	        var originComponentDidMount = _this.componentDidMount; // 接管子类方法
	        var originComponentWillUnmount = _this.componentWillUnmount; // 接管子类方法
	        _this.state = {};
	        _this._isMounted = false;
	        // 重定义子类componentDidMount
	        _this.componentDidMount = function () {
	            _this.superComponentDidMount();
	            if (typeof originComponentDidMount === 'function') {
	                originComponentDidMount.call(_this);
	            }
	        };
	        // 重定义子类componentWillUnmount
	        _this.componentWillUnmount = function () {
	            _this.superComponentWillUnmount();
	            if (typeof originComponentWillUnmount === 'function') {
	                originComponentWillUnmount.call(_this);
	            }
	        };
	        return _this;
	    }

	    /**
	     * 监听Store通用方法
	     * @param    {object}   store   Reflux之Store对象
	     */


	    (0, _createClass3.default)(BaseComponent, [{
	        key: 'listenStore',
	        value: function listenStore(store) {
	            var _this2 = this;

	            store.listen(function (data) {
	                if (_this2.isMounted()) {
	                    _this2.setState(data);
	                }
	            });
	        }
	        // 基类DidMount方法

	    }, {
	        key: 'superComponentDidMount',
	        value: function superComponentDidMount() {
	            this._isMounted = true;
	        }
	        // 基类WillUnmount方法

	    }, {
	        key: 'superComponentWillUnmount',
	        value: function superComponentWillUnmount() {
	            this._isMounted = false;
	        }
	        // 判断组件是否已挂载

	    }, {
	        key: 'isMounted',
	        value: function isMounted() {
	            return this._isMounted;
	            // exceptions for flow control :(
	            /*if (!this._isMounted) {
	                try {
	                    ReactDOM.findDOMNode(this);
	                    this._isMounted = true;
	                } catch (e) {
	                    // Error: Invariant Violation: Component (with keys: props,context,state,refs,_reactInternalInstance) contains `render` method but is not mounted in the DOM
	                    this._isMounted = false;
	                } 
	            }
	            return this._isMounted;*/
	        }
	    }]);
	    return BaseComponent;
	}(React.Component);

	;

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染
	'setMondeAction', 'setIonizerAction', 'setUvAction', 'setChildLockAction', 'setSwitchStateAction', 'setTimeClock', 'setWeatherData']);

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @type {store}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _stringify = __webpack_require__(92);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _Actions = __webpack_require__(90);

	var _DeviceTokenCache = __webpack_require__(94);

	var _RequestAction = __webpack_require__(95);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 控制字段
	// OnOffSet     开关机设置   1 开机 2 关机
	// ModeSet      模式设置     2自动 3低速模式 4中速模式 5告诉模式 6睡眠模式
	// WorkTimeSet  工作时间设置  1 2 4 8 小时， 默认为255
	// ChildLockSet 童锁         1关闭 2童锁打卡
	// UvSet        紫外线设置    1 开启 2 关闭
	// IonizerSet   负离子设置     1开启 2 关闭

	// 运行模式
	// WorkModeValue        工作模式  1待机模式 2自动模式 3低速模式 4中速模式 5高速模式 6睡眠模式 7睡眠唤醒模式
	// TimeSetValue         工作时间设定  1 2 4 8 255
	// HourRemainingTime    剩余时间小时  0-8 默认为255
	// MinuteRemainingTime  剩余时间分钟 0-59
	// ChildLockState       儿童锁状态  1 不锁定 2 锁定
	// UvState              紫外线状态
	// IonizerState         负离子状态
	// PM25Value            PM25
	// SmellSensorValue     气味传感器值  0优 1良 2中 3差
	// HourFilterWorkTime   滤网工作时间小时 0-2000
	// MinuteFilterWorkTime 滤网工作时间分钟 0-59
	// CurrentAirQuality    当前空气质量    1优良   2中等  3差等


	//故障数据
	// FilterWarning       滤网告警          1正常  2超过2000个小时
	// PM25SensorWarning   PM25传感器警告    1正常  2异常
	// SmellSensorWarning  气味传感器警告     1正常  2异常
	//

	var dataFilterTimers = {
	    WorkModeValue: 0,
	    TimeSetValue: 0,
	    ChildLockState: 0,
	    UvState: 0,
	    IonizerState: 0,
	    HourRemainingTime: 0,
	    MinuteRemainingTime: 0
	};
	function dataFilter(data) {
	    var time = new Date().getTime();
	    var result = {};
	    for (var k in data) {
	        if (typeof dataFilterTimers[k] !== 'undefined') {
	            if (dataFilterTimers[k] < time) {
	                dataFilterTimers[k] = 0;
	                result[k] = data[k];
	            } else {
	                console.log("yy filter: " + k);
	            }
	        } else {
	            result[k] = data[k];
	        }
	    }
	    return result;
	}
	// 设置过滤器过期时间
	function setDataTimer() {
	    var time = new Date().getTime() + 10e3; // 10秒内不接收新数据

	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	    }

	    for (var i in keys) {
	        dataFilterTimers[keys[i]] = time;
	    }
	}

	var isFirstGet = true;

	var appData = {
	    online: 2,
	    onLinestatue: false,
	    networkavailable: '2'
	};

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas, type) {

	        var data = dataFilter(datas);

	        console.log("data:" + data);
	        //控制数据
	        if (data.OnOffSet != undefined) {
	            appData.OnOffSet = data.OnOffSet;
	            appData.OnOffSet == '1' ? appData.WorkModeValue = '2' : appData.WorkModeValue = '1';
	        }
	        if (data.ModeSet != undefined) {
	            appData.ModeSet = data.ModeSet;
	            if (appData.OnOffSet == '1') {
	                appData.WorkModeValue = appData.ModeSet;
	            }
	            // if(!isFirstGet){
	            //     setDataTimer("WorkModeValue");
	            // }
	            // isFirstGet = false;
	        }
	        if (data.WorkTimeSet != undefined) {
	            appData.WorkTimeSet = data.WorkTimeSet;
	            // appData.TimeSetValue = appData.WorkTimeSet;
	            // if( appData.WorkTimeSet < 9 && appData.WorkTimeSet > 0){
	            //     appData.HourRemainingTime = appData.WorkTimeSet ;
	            //     appData.MinuteRemainingTime = "00";
	            // }
	            // if(!isFirstGet){
	            //     setDataTimer("HourRemainingTime","MinuteRemainingTime");
	            // }else{
	            //     console.log("clear 定时设置");
	            //     appData.HourRemainingTime = "00";
	            //     appData.MinuteRemainingTime = "00";
	            // }
	            // isFirstGet = false;
	        }
	        if (data.ChildLockSet != undefined) {
	            appData.ChildLockSet = data.ChildLockSet;
	            appData.ChildLockState = appData.ChildLockSet;
	            // if(!isFirstGet){
	            //     setDataTimer("ChildLockState");
	            // }
	        }
	        if (data.UvSet != undefined) {
	            appData.UvSet = data.UvSet;
	            appData.UvState = data.UvSet;
	            // if(!isFirstGet){
	            //     setDataTimer("UvState");
	            // }
	        }
	        if (data.IonizerSet != undefined) {
	            appData.IonizerSet = data.IonizerSet;
	            appData.IonizerState = data.IonizerSet;
	            // if(!isFirstGet){
	            //     setDataTimer("IonizerState");
	            // }
	            // isFirstGet = false;
	        }

	        //运行数据
	        if (data.WorkModeValue != undefined) {
	            appData.WorkModeValue = data.WorkModeValue;
	        }
	        if (data.TimeSetValue != undefined) {
	            appData.TimeSetValue = data.TimeSetValue;
	        }
	        if (data.HourRemainingTime != undefined) {
	            appData.HourRemainingTime = data.HourRemainingTime;
	        }
	        if (data.MinuteRemainingTime != undefined) {
	            appData.MinuteRemainingTime = data.MinuteRemainingTime;
	        }
	        if (data.ChildLockState != undefined) {
	            appData.ChildLockState = data.ChildLockState;
	        }

	        if (data.UvState != undefined) {
	            appData.UvState = data.UvState;
	        }
	        if (data.IonizerState != undefined) {
	            appData.IonizerState = data.IonizerState;
	        }

	        if (data.PM25Value != undefined) {
	            appData.PM25Value = data.PM25Value;
	        }
	        if (data.SmellSensorValue != undefined) {
	            appData.SmellSensorValue = data.SmellSensorValue;
	        }
	        if (data.HourFilterWorkTime != undefined) {
	            appData.HourFilterWorkTime = data.HourFilterWorkTime;
	        }
	        if (data.MinuteFilterWorkTime != undefined) {
	            appData.MinuteFilterWorkTime = data.MinuteFilterWorkTime;
	        }
	        if (data.CurrentAirQuality != undefined) {
	            appData.CurrentAirQuality = data.CurrentAirQuality;
	        }

	        // 告警数据
	        // FilterWarning       滤网告警          1正常  2超过2000个小时
	        // PM25SensorWarning   PM25传感器警告    1正常  2异常
	        // SmellSensorWarning  气味传感器警告     1正常  2异常
	        if (data.FilterWarning) appData.FilterWarning = data.FilterWarning;
	        if (data.PM25SensorWarning) appData.PM25SensorWarning = data.PM25SensorWarning;
	        if (data.SmellSensorWarning) appData.SmellSensorWarning = data.SmellSensorWarning;

	        //离线&故障
	        if (data.online) appData.online = data.online;
	        if (data.networkavailable) appData.networkavailable = data.networkavailable;
	        if (appData.online == 2) {
	            appData.onLinestatue = false;
	        } else {
	            appData.onLinestatue = true;
	        }

	        if (data.temp != undefined) {
	            appData.temp = data.temp;
	            (0, _RequestAction.setTemp)(data.temp);
	        }

	        if (data.cityName != undefined) {
	            appData.cityName = data.cityName;
	            (0, _RequestAction.setCity)(data.cityName);
	        }
	        if (data.pm25 != undefined) {
	            appData.pm25 = data.pm25;(0, _RequestAction.setPM25)(appData.pm25);
	        }

	        if (data.appId != undefined) appData.appId = data.appId;
	        if (data.deviceId != undefined) {
	            (0, _RequestAction.setDeviceId)(data.deviceId);
	            appData.deviceId = data.deviceId;
	        }
	        if (data.addr != undefined) {
	            appData.addr = data.addr;
	            (0, _RequestAction.setAddr)(data.addr);
	            console.log("addr:" + appData.addr);
	        }
	        // if(data.accessToken != undefined) appData.accessToken = data.accessToken;
	        // if(data.deviceId != undefined  && !hasSetRequest()){
	        //     setDeviceInfo(data.accessToken,data.deviceId);
	        // }

	        this.trigger(appData);
	    },
	    onSetMondeAction: function onSetMondeAction(modeIndex) {

	        if (checkChildLodkAction()) {
	            console.log("童锁打开了");return;
	        }
	        if (checkNetWorkLockedAction()) {
	            console.log("没有网了");return;
	        }
	        if (checkPowerOnAction()) {
	            console.log("没有开机");return;
	        }

	        var currentModeIndex = modeIndex;
	        if (modeIndex > 5) {
	            currentModeIndex = 1;
	        }
	        var nextMode = currentModeIndex + 1;

	        var index = nextMode;

	        appData.WorkModeValue = nextMode;

	        var updateFlag = het.hexUpFlag(1, 1, 2);
	        var switchData = {
	            ModeSet: parseInt(index, 10),
	            updateFlag: updateFlag
	        };
	        this.trigger(appData);
	        setDataTimer("WorkModeValue");
	        het.send(switchData, function (data) {}, function () {
	            het.toast("发送失败");
	        });
	    },
	    onSetIonizerAction: function onSetIonizerAction(modeIndex) {

	        if (checkChildLodkAction()) {
	            console.log("童锁打开了");return;
	        }
	        if (checkNetWorkLockedAction()) {
	            console.log("没有网了");return;
	        }
	        if (checkPowerOnAction()) {
	            console.log("没有开机");return;
	        }

	        var currentSate = modeIndex;
	        var nextState = 1;
	        if (currentSate == 1) {
	            nextState = 2;
	        }

	        appData.IonizerState = nextState;

	        var updateFlag = het.hexUpFlag(5, 1, 2);
	        var switchData = {
	            IonizerSet: parseInt(nextState, 10),
	            updateFlag: updateFlag
	        };
	        this.trigger(appData);
	        setDataTimer("IonizerState");
	        // console.log("控制命令 1111" + JSON.stringify(switchData) );
	        het.send(switchData, function (data) {}, function () {
	            het.toast("发送失败");
	        });
	    },
	    onSetUvAction: function onSetUvAction(modeIndex) {

	        if (checkChildLodkAction()) {
	            console.log("童锁打开了");return;
	        }
	        if (checkNetWorkLockedAction()) {
	            console.log("没有网了");return;
	        }
	        if (checkPowerOnAction()) {
	            console.log("没有开机");return;
	        }

	        var currentSate = modeIndex;
	        var nextState = 1;
	        if (currentSate == 1) {
	            nextState = 2;
	        }

	        appData.UvState = nextState;

	        var updateFlag = het.hexUpFlag(4, 1, 2);
	        var switchData = {
	            UvSet: parseInt(nextState, 10),
	            updateFlag: updateFlag
	        };
	        this.trigger(appData);
	        setDataTimer("UvState");
	        // console.log("控制命令 1111" + JSON.stringify(switchData) );
	        het.send(switchData, function (data) {}, function () {
	            het.toast("发送失败");
	        });
	    },
	    onSetChildLockAction: function onSetChildLockAction(modeIndex) {

	        if (checkNetWorkLockedAction()) {
	            console.log("没有网了");return;
	        }
	        if (checkPowerOnAction()) {
	            console.log("没有开机");return;
	        }

	        var nextChildValue = 1;
	        if (modeIndex == 1) {
	            nextChildValue = 2;
	        }

	        appData.ChildLockState = nextChildValue;

	        // 童锁
	        var updateFlag = het.hexUpFlag(3, 1, 2);
	        var switchData = {};
	        if (appData.ChildLockState == 1) {
	            switchData = {
	                ChildLockSet: parseInt("1", 10),
	                updateFlag: updateFlag
	            };
	        } else {
	            switchData = {
	                ChildLockSet: parseInt("2", 10),
	                updateFlag: updateFlag
	            };
	        }
	        this.trigger(appData);
	        setDataTimer("ChildLockState");

	        console.log("控制命令 1111" + (0, _stringify2.default)(switchData));
	        het.send(switchData, function (data) {}, function () {
	            het.toast("发送失败");
	        });
	        console.log("控制命令 2222");
	    },
	    onSetSwitchStateAction: function onSetSwitchStateAction(modexIndex) {

	        console.log("onSetSwitchStateAction dianji");
	        if (checkChildLodkAction()) {
	            console.log("童锁打开了");return;
	        }
	        if (checkNetWorkLockedAction()) {
	            console.log("没有网了");return;
	        }

	        var nextChildValue = 1;
	        if (modexIndex == 1) {
	            nextChildValue = 2;
	        }

	        appData.WorkModeValue = nextChildValue;

	        var updateFlag = het.hexUpFlag(0, 1, 2);
	        var switchData = {};
	        if (appData.WorkModeValue == 1) {
	            switchData = {
	                OnOffSet: parseInt("2", 10),
	                updateFlag: updateFlag
	            };
	            appData.TimeSetValue = 255;
	            appData.HourRemainingTime = "0";
	            appData.MinuteRemainingTime = "00";
	            console.log("clear 定时设置1");
	        } else {
	            switchData = {
	                OnOffSet: parseInt("1", 10),
	                updateFlag: updateFlag
	            };
	        }
	        this.trigger(appData);
	        setDataTimer("WorkModeValue", "UvState", "IonizerState", "TimeSetValue", "HourRemainingTime", "MinuteRemainingTime");
	        het.send(switchData, function (data) {}, function () {
	            het.toast("发送失败");
	        });
	    },
	    onSetTimeClock: function onSetTimeClock(timeIndex) {
	        appData.TimeSetValue = timeIndex;
	        appData.HourRemainingTime = timeIndex;
	        appData.MinuteRemainingTime = "00";
	        console.log("setTIme" + timeIndex);

	        var updateFlag = het.hexUpFlag(2, 1, 2);
	        var switchData = {
	            WorkTimeSet: parseInt(timeIndex, 10),
	            updateFlag: updateFlag
	        };
	        this.trigger(appData);
	        setDataTimer("HourRemainingTime", "MinuteRemainingTime", "TimeSetValue");

	        console.log("控制命令 1111" + (0, _stringify2.default)(switchData));
	        het.send(switchData, function (data) {}, function () {
	            het.toast("发送失败");
	        });
	    },
	    onSetWeatherData: function onSetWeatherData(data) {
	        appData.weatherData = data;
	        this.trigger(appData);
	    }
	});

	function checkChildLodkAction() {
	    var childLock = (appData.ChildLockState || 1) == 2; // == 2表示童锁打开
	    return childLock;
	    // return false;
	}

	function checkNetWorkLockedAction() {
	    var netWorkState = appData.onLinestatue; // true 表示有网
	    return !netWorkState;
	    // return false;
	}

	function checkPowerOnAction() {
	    var workModeIndex = appData.WorkModeValue || 1;
	    return workModeIndex == 1; // ===1 表示待机中
	    // return false;
	}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(15)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	var requestInfo = {
	    userToken: '',
	    deviceId: ''
	};

	var hasSet = false;

	function setDeviceInfo(uerToken1, deviceid1) {
	    console.log("i receive token and devicedid:" + uerToken1 + '  ' + deviceid1);

	    if (uerToken1 && deviceid1) {
	        requestInfo.userToken = uerToken1;
	        requestInfo.deviceId = deviceid1;

	        if (uerToken1.length > 3) {
	            hasSet = true;
	        }
	    }
	}

	function getDeviceInfo() {
	    return requestInfo;
	}

	function hasSetRequest() {
	    return hasSet;
	}

	module.exports = { setDeviceInfo: setDeviceInfo, getDeviceInfo: getDeviceInfo, hasSetRequest: hasSetRequest };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _map = __webpack_require__(96);

	var _map2 = _interopRequireDefault(_map);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var deviceId = "";
	var PM25 = "";
	var temp = "";
	var city = "";
	var addr = "";
	var sevenDayWeatherForeCastCacheData = null;
	var FirstNotGetCityTimes = 0;

	var cacheHistoryData = new _map2.default();

	function getSevenDayWeatherForeCastCacheData() {
	    return sevenDayWeatherForeCastCacheData;
	}

	function setAddr(value) {
	    addr = value;
	}

	function getAddr() {
	    return addr;
	}

	function setCity(value) {
	    city = value;
	}

	function getCity() {
	    return city;
	}

	function setDeviceId(id) {
	    deviceId = id;
	}

	function setTemp(value) {
	    temp = value;
	}
	function getTemp() {
	    return temp;
	}

	function setPM25(value) {
	    PM25 = value;
	}
	function getPM25() {
	    return PM25;
	}

	function getFilterHistory(date, type, successCB, errorCB) {
	    console.log("getFilterHistory");

	    if (deviceId.length < 1) {
	        errorCB();
	    }

	    var url = "/v1/app/customization/guangleiairpurifier/getRecordList";
	    var shortDate = "";
	    if (type == 0) {
	        var nextDay = new Date();
	        date = nextDay.Format("yyyy-MM-dd hh:mm:ss");
	        shortDate = nextDay.Format("yyyy-MM-dd-hh");
	    }

	    // 从缓存获取数据
	    if (type == 0) {
	        if (cacheHistoryData.has(shortDate)) {
	            if (typeof successCB === 'function') {
	                successCB(cacheHistoryData.get(shortDate));
	            }
	            return;
	        }
	    } else {
	        if (cacheHistoryData.has(date)) {
	            if (typeof successCB === 'function') {
	                successCB(cacheHistoryData.get(date));
	            }
	            return;
	        }
	    }

	    var requestParmars = {
	        deviceId: deviceId,
	        date: date,
	        type: type
	    };

	    var successcallback = function successcallback(data) {
	        var dataString = data.toString();
	        var jsondata = JSON.parse(dataString);
	        jsondata = jsondata['data'];

	        console.log("PM2.5 请求成功");
	        if (typeof successCB === 'function') {
	            successCB(jsondata);
	        }

	        if (type == 0) {
	            cacheHistoryData.set(shortDate, jsondata);
	        } else {
	            cacheHistoryData.set(date, jsondata);
	        }
	    };
	    var failedcallback = function failedcallback(error) {
	        console.log("请求失败" + error.toString());
	        het.toast("获取PM25历史记录失败");
	        if (typeof errorCB === 'function') {
	            errorCB();
	        }
	    };

	    het.get(url, requestParmars, successcallback, failedcallback, false);
	}

	function getWeatherForeCast(successCB, errorCB) {
	    //console.log("getWeatherForeCast");

	    if (city.length < 1) {
	        // console.log("city 获取失败");
	        FirstNotGetCityTimes++;

	        if (FirstNotGetCityTimes % 2 == 1) {
	            //console.log("city 获取失败： " + FirstNotGetCityTimes);
	            setTimeout(function () {
	                getWeatherForeCast(successCB, errorCB);
	            }, 3000);
	        }
	    }

	    var url = "/v1/app/customization/guangleiairpurifier/get7DaysWeatherForcast";
	    var requestParmars = {
	        city: city
	    };
	    var successcallback = function successcallback(data) {
	        var dataString = data.toString();

	        var jsondata = JSON.parse(dataString);
	        jsondata = jsondata['data'];
	        sevenDayWeatherForeCastCacheData = jsondata;

	        // console.log("天气预报成功 jsondata: ", jsondata);
	        if (typeof successCB === 'function') {
	            successCB(jsondata);
	        }
	    };
	    var failedcallback = function failedcallback(error) {
	        // console.log("请求失败" +error.toString());
	        if (typeof error === 'function') {
	            errorCB();
	        }
	    };

	    het.get(url, requestParmars, successcallback, failedcallback, false);
	}

	var pixelRatio = function () {
	    var canvas = document.createElement('canvas'),
	        context = canvas.getContext('2d'),
	        backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;

	    return (window.devicePixelRatio || 1) / backingStore;
	}();

	function getPoxelRation() {
	    return pixelRatio;
	}

	module.exports = { setAddr: setAddr, getAddr: getAddr, setTemp: setTemp, getTemp: getTemp, getPoxelRation: getPoxelRation, setCity: setCity, getCity: getCity, setDeviceId: setDeviceId, setPM25: setPM25, getPM25: getPM25, getFilterHistory: getFilterHistory, getWeatherForeCast: getWeatherForeCast, getSevenDayWeatherForeCastCacheData: getSevenDayWeatherForeCastCacheData };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(77);
	__webpack_require__(37);
	__webpack_require__(59);
	__webpack_require__(98);
	__webpack_require__(112);
	module.exports = __webpack_require__(15).Map;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(99);

	// 23.1 Map Objects
	module.exports = __webpack_require__(108)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(19).f
	  , create      = __webpack_require__(45)
	  , redefineAll = __webpack_require__(100)
	  , ctx         = __webpack_require__(16)
	  , anInstance  = __webpack_require__(101)
	  , defined     = __webpack_require__(6)
	  , forOf       = __webpack_require__(102)
	  , $iterDefine = __webpack_require__(40)
	  , step        = __webpack_require__(62)
	  , setSpecies  = __webpack_require__(107)
	  , DESCRIPTORS = __webpack_require__(23)
	  , fastKey     = __webpack_require__(67).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(18);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(16)
	  , call        = __webpack_require__(103)
	  , isArrayIter = __webpack_require__(104)
	  , anObject    = __webpack_require__(20)
	  , toLength    = __webpack_require__(53)
	  , getIterFn   = __webpack_require__(105)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(20);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(43)
	  , ITERATOR   = __webpack_require__(58)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(106)
	  , ITERATOR  = __webpack_require__(58)('iterator')
	  , Iterators = __webpack_require__(43);
	module.exports = __webpack_require__(15).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(51)
	  , TAG = __webpack_require__(58)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(11)
	  , core        = __webpack_require__(15)
	  , dP          = __webpack_require__(19)
	  , DESCRIPTORS = __webpack_require__(23)
	  , SPECIES     = __webpack_require__(58)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(11)
	  , $export        = __webpack_require__(14)
	  , meta           = __webpack_require__(67)
	  , fails          = __webpack_require__(24)
	  , hide           = __webpack_require__(18)
	  , redefineAll    = __webpack_require__(100)
	  , forOf          = __webpack_require__(102)
	  , anInstance     = __webpack_require__(101)
	  , isObject       = __webpack_require__(21)
	  , setToStringTag = __webpack_require__(57)
	  , dP             = __webpack_require__(19).f
	  , each           = __webpack_require__(109)(0)
	  , DESCRIPTORS    = __webpack_require__(23);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(16)
	  , IObject  = __webpack_require__(50)
	  , toObject = __webpack_require__(5)
	  , toLength = __webpack_require__(53)
	  , asc      = __webpack_require__(110);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(111);

	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21)
	  , isArray  = __webpack_require__(73)
	  , SPECIES  = __webpack_require__(58)('species');

	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(14);

	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(113)('Map')});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(106)
	  , from    = __webpack_require__(114);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(102);

	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(92);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(33);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _Store = __webpack_require__(91);

	var _CircleWave = __webpack_require__(116);

	var _Wave = __webpack_require__(150);

	var _TimeSelect = __webpack_require__(151);

	var _AirStatePage = __webpack_require__(152);

	var _DirtView = __webpack_require__(153);

	var _WeatherForecast = __webpack_require__(154);

	var _EmitterCSSAnimation = __webpack_require__(155);

	var _YYEmitterCSSAnimation = __webpack_require__(156);

	var _YYImageAnimation = __webpack_require__(157);

	var _RequestAction = __webpack_require__(95);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter; // import {Funs} from '../../../common/src/fun.es6';

	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;


	var WorkModeArray = ['待机', '自动', '低速', '中速', '高速', '睡眠', '取消睡眠'];
	var airStatusStrArray = ["good", "fine", "bad"];

	var pointColor = ["rgba(255, 255, 255,1)", "rgba(2247, 228, 123,1)", "rgba(255, 134, 134,1)"];
	var fixedTim = {
	    statusshow: false,
	    minhour: 1,
	    maxhour: 8,
	    defaulthour: '1',
	    hourarray: ['1', '2', '3', '4', '5', '6', '7', '8'],
	    title: '',
	    hourunit: "小时",
	    hourshow: false
	};
	var isFixdTime = true;

	var count = 0;
	var thirtyDays = [];
	var requestThirtyDays = [];
	var daySelect = {
	    statusshow: false,
	    minhour: 1,
	    maxhour: 30,
	    defaulthour: '',
	    hourarray: [],
	    title: '',
	    hourunit: "",
	    hourshow: false
	};

	var hasShowErrorAlert = false;
	var airInfoPercent = "18%";

	Date.prototype.Format = function (fmt) {
	    //author: meizz
	    var o = {
	        "M+": this.getMonth() + 1, //月份
	        "d+": this.getDate(), //日
	        "h+": this.getHours(), //小时
	        "m+": this.getMinutes(), //分
	        "s+": this.getSeconds(), //秒
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	        "S": this.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	    }return fmt;
	};

	var hasFirstRequesthistoryData = false;
	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {},
	        renderConfigData: true });
	});

	// 接收app推送数据
	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	});

	var halfScreenWidth = 140;
	// 创建React组件

	var App = function (_BaseComponent) {
	    (0, _inherits3.default)(App, _BaseComponent);

	    function App(props) {
	        (0, _classCallCheck3.default)(this, App);

	        var _this2 = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

	        _this2.listenStore(_Store.Store); // 监听Store
	        halfScreenWidth = window.screen.width * 0.55;
	        airInfoPercent = (halfScreenWidth - 144 + 24) / 2;
	        // console.log("airInfoPercent: " + airInfoPercent);

	        _this2.getOneMonthDay();
	        daySelect.defaulthour = thirtyDays[0];
	        daySelect.hourarray = thirtyDays;

	        _this2.state = {
	            selectshow: false,
	            airInfoPage: false,
	            oneDayOnMonthSelect: thirtyDays[0],
	            oneDayOnMonthSelectRequest: requestThirtyDays[0],
	            sevenWeatherForecast: {},
	            historyOneDayData: [],
	            enableBackAnimation: true,
	            filterTimePercentMode: true
	        };

	        //console.log(thirtyDays);
	        return _this2;
	    }

	    (0, _createClass3.default)(App, [{
	        key: 'getHistoryDataByDateString',
	        value: function getHistoryDataByDateString(dateStr, type, successfuncitoncb, errorfunctioncb) {

	            //console.log("getHistoryDataByDateString 0");
	            var _this = this;
	            var successCB = function successCB(data) {
	                // console.log("historyData:" + JSON.stringify(data));
	                if (data && data.length > 0) {
	                    (function () {
	                        var historyDataArray = [];
	                        data.map(function (oneDayPMValue) {
	                            var pm25value = oneDayPMValue["pm25Value"] || 0;
	                            historyDataArray.push(pm25value);
	                        });
	                        _this.setState({
	                            historyOneDayData: historyDataArray
	                        });
	                    })();
	                }
	                if (typeof successfuncitoncb === "function") {
	                    successfuncitoncb(data);
	                }
	            };
	            var errorCB = function errorCB() {

	                if (typeof errorfunctioncb === "function") {
	                    errorfunctioncb();
	                }
	            };
	            (0, _RequestAction.getFilterHistory)(dateStr, type, successCB, errorCB);
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {

	            het.setTitle((0, _stringify2.default)({
	                setNavTitle: 0,
	                setNavRightBtnHiden: 0
	            }));
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            console.log(" appmain componentDidMount");

	            var _this = this;
	            setTimeout(function () {

	                if (!hasFirstRequesthistoryData) {
	                    var successcb = function successcb(data) {
	                        hasFirstRequesthistoryData = true;
	                    };
	                    var errorcb = function errorcb() {
	                        hasFirstRequesthistoryData = false;
	                    };
	                    // console.log("i request histoyr 1");
	                    _this.getHistoryDataByDateString(requestThirtyDays[0], 0, successcb, errorcb);
	                    hasFirstRequesthistoryData = true;
	                }
	            }, 3010);

	            if ((0, _RequestAction.getSevenDayWeatherForeCastCacheData)() == null) {
	                setTimeout(function () {
	                    (0, _RequestAction.getWeatherForeCast)();
	                }, 3000);
	            }
	        }
	    }, {
	        key: 'getOneMonthDay',
	        value: function getOneMonthDay() {
	            var now = new Date();
	            var currentDay = now.getDate();
	            for (var i = 0; i < 30; i++) {
	                var newDAY = new Date();
	                var nextNow = newDAY.setDate(currentDay - i);
	                var nextDay = new Date(nextNow);
	                var year = nextDay.getFullYear();
	                var month = nextDay.getMonth();
	                var day = nextDay.getDate();
	                var str2 = year + "年" + (month + 1) + "月" + day + "日";

	                var requestTime = nextDay.Format("yyyy-MM-dd");
	                // let requestTime = year  + "-"+ (month+1) + "-"+ day ;
	                thirtyDays.push(str2);
	                requestThirtyDays.push(requestTime);
	            }
	        }
	    }, {
	        key: 'childLockAction',
	        value: function childLockAction() {
	            var currentChildValue = this.state.ChildLockState || 1;
	            _Actions.Actions.setChildLockAction(currentChildValue);
	        }
	    }, {
	        key: 'switchAction',
	        value: function switchAction() {
	            var currentChildValue = this.state.WorkModeValue || 1;
	            _Actions.Actions.setSwitchStateAction(currentChildValue);
	        }
	    }, {
	        key: 'autoModeAction',
	        value: function autoModeAction() {
	            var currentModeIndex = this.state.WorkModeValue || 2;
	            _Actions.Actions.setMondeAction(currentModeIndex);
	        }
	    }, {
	        key: 'alarmColokAction',
	        value: function alarmColokAction() {

	            if (this.checkChildLodkAction()) {
	                console.log("童锁打开了");return;
	            }
	            if (this.checkNetWorkLockedAction()) {
	                console.log("没有网了");return;
	            }
	            if (this.checkPowerOnAction()) {
	                console.log("没有开机");return;
	            }

	            isFixdTime = true;
	            this.setState({
	                selectshow: !this.state.selectshow,
	                enableBackAnimation: !this.state.enableBackAnimation
	            });
	        }
	    }, {
	        key: 'anionModeAction',
	        value: function anionModeAction() {

	            var currentSate = this.state.IonizerState;
	            _Actions.Actions.setIonizerAction(currentSate);
	        }
	    }, {
	        key: 'ultravioletLampAction',
	        value: function ultravioletLampAction() {
	            var currentSate = this.state.UvState;
	            _Actions.Actions.setUvAction(currentSate);
	        }
	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {

	            if (isFixdTime) {
	                this.setState({
	                    selectshow: false,
	                    enableBackAnimation: true
	                });
	            } else {
	                this.setState({
	                    selectshow: false,
	                    enableBackAnimation: false
	                });
	            }
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock(selectHourValue) {

	            //console.log("submitTime: " + selectHourValue) ;
	            if (isFixdTime) {
	                var hourValue = selectHourValue;
	                if (hourValue < 9 && hourValue > 0) {
	                    //console.log("submitTime: " + selectHourValue) ;
	                    _Actions.Actions.setTimeClock(hourValue);
	                }
	                fixedTim.defaulthour = selectHourValue;
	            } else {
	                //console.log("getHistoryDataByDateString 0000value:" + selectHourValue);
	                var timeDayValue = selectHourValue;
	                var indexInArray = thirtyDays.indexOf(selectHourValue);
	                this.setState({
	                    oneDayOnMonthSelect: timeDayValue,
	                    oneDayOnMonthSelectRequest: indexInArray
	                });
	                daySelect.defaulthour = timeDayValue;
	                count++;
	                // console.log("getHistoryDataByDateString 0000:" + indexInArray + " count:" + count);
	                if (indexInArray == 0) {
	                    // console.log("getHistoryDataByDateString 0000");
	                    this.getHistoryDataByDateString(requestThirtyDays[0], 0, null, null);
	                } else {
	                    this.getHistoryDataByDateString(requestThirtyDays[indexInArray], 1, null, null);
	                }
	            }

	            if (isFixdTime) {
	                this.setState({
	                    selectshow: false,
	                    enableBackAnimation: true
	                });
	            } else {
	                this.setState({
	                    selectshow: false,
	                    enableBackAnimation: false
	                });
	            }
	        }
	    }, {
	        key: 'selectOneDay',
	        value: function selectOneDay() {
	            this.setState({
	                selectshow: true
	            });
	            isFixdTime = false;
	        }
	    }, {
	        key: 'checkChildLodkAction',
	        value: function checkChildLodkAction() {
	            var childLock = (this.state.ChildLockState || 1) == 2; // == 2表示童锁打开
	            return childLock;
	        }
	    }, {
	        key: 'checkNetWorkLockedAction',
	        value: function checkNetWorkLockedAction() {
	            var netWorkState = this.state.onLinestatue; // true 表示有网
	            return !netWorkState;
	        }
	    }, {
	        key: 'switchToWeather',
	        value: function switchToWeather() {
	            if ((0, _RequestAction.getCity)()) {
	                window.location.href = '#/forcast';
	            }
	        }
	    }, {
	        key: 'checkPowerOnAction',
	        value: function checkPowerOnAction() {

	            var workModeIndex = this.state.WorkModeValue || 1;
	            return workModeIndex == 1; // ===1 表示待机中
	        }
	    }, {
	        key: 'switchToPMValueHistoryView',
	        value: function switchToPMValueHistoryView() {
	            this.setState({
	                airInfoPage: !this.state.airInfoPage,
	                enableBackAnimation: !this.state.enableBackAnimation
	            });

	            //请求当天的pm2.5数据
	            if (!this.state.airInfoPage && !hasFirstRequesthistoryData) {
	                this.getHistoryDataByDateString(thirtyDays[0], 0, null, null);
	            }
	        }
	    }, {
	        key: 'handleAlert',
	        value: function handleAlert() {

	            if (!hasShowErrorAlert) {

	                var alertMessage = "";
	                if (this.state.FilterWarning && this.state.FilterWarning == 1) {
	                    alertMessage = "滤网超过2000个小时";
	                } else if (this.state.PM25SensorWarning && this.state.PM25SensorWarning == 1) {
	                    alertMessage = "PM2.5传感器故障";
	                } else if (this.state.SmellSensorWarning && this.state.SmellSensorWarning == 1) {
	                    alertMessage = "气味传感器故障";
	                }

	                if (alertMessage.length > 2) {
	                    het.toast((0, _stringify2.default)({ "contactService": alertMessage, "tel": "13662242507" }));

	                    hasShowErrorAlert = true;
	                }

	                var leftTime = this.state.HourFilterWorkTime || 0;
	                var filterMessage = "";
	                if (leftTime >= 1800 && leftTime < 2000) {
	                    filterMessage = "滤网即将到期，为不影响设备的正常使用，请及时更换滤网，并在设备长按\"定时键\"5s重置滤网工作时间。";
	                    var alertInfo = {
	                        title: "",
	                        content: filterMessage,
	                        button: "知道了"
	                    };
	                    het.toast((0, _stringify2.default)(alertInfo));
	                    hasShowErrorAlert = true;
	                } else if (leftTime >= 2000) {
	                    filterMessage = "滤网已经到期，为不影响设备的正常使用，请及时更换滤网，并在设备长按\"定时键\"5s重置滤网工作时间。";
	                    het.toast((0, _stringify2.default)({ "contactService": filterMessage, "tel": "13662242507" }));
	                    hasShowErrorAlert = true;
	                }

	                var PM25Value = this.state.PM25Value || 0;
	                if (PM25Value > 500) {
	                    filterMessage = "PM2.5数值过高，请检查您的污染源";
	                    var _alertInfo = {
	                        title: "",
	                        content: filterMessage,
	                        button: "知道了"
	                    };
	                    het.toast((0, _stringify2.default)(_alertInfo));
	                    hasShowErrorAlert = true;
	                }
	            }
	        }
	    }, {
	        key: 'showFilterLeftTimeMode',
	        value: function showFilterLeftTimeMode() {
	            this.setState({
	                filterTimePercentMode: !this.state.filterTimePercentMode
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            //console.log("appmain render");

	            //console.log("state: "+ JSON.stringify(this.state));
	            this.handleAlert();

	            var workModeIndex = this.state.WorkModeValue || 1;
	            var workModeValue = workModeIndex > 1 ? WorkModeArray[workModeIndex - 1] : "自动";
	            var switchValue = workModeIndex == 1 ? "开机" : "关机";

	            var alarmClockIndex = (this.state.TimeSetValue || 255) < 9 && (this.state.TimeSetValue || 255) > 0;
	            var alarmClockPath = alarmClockIndex ? "../static/image/appmain/alarmClock03.png" : "../static/image/appmain/alarmClock02.png";
	            var alarmClock = alarmClockIndex ? "appMain_selected" : "";

	            var UvStateState = (this.state.UvState || 2) == 1;
	            var UvImagePath = UvStateState ? "../static/image/appmain/uvmode03.png" : "../static/image/appmain/uvmode02.png";
	            var ultravioletLamp = UvStateState ? "appMain_selected" : "";

	            var IonizerState = (this.state.IonizerState || 2) == 1;
	            var IonImagePath = IonizerState ? "../static/image/appmain/anionmode03.png" : "../static/image/appmain/anionmode02.png";
	            var anionMode = IonizerState ? "appMain_selected" : "";

	            var autoModeIndex = this.state.WorkModeValue || 2;
	            var autoModePath = "../static/image/appmain/automode01.png";
	            var autoMode = "";

	            var leftHour = this.state.HourRemainingTime || 0; //  剩余时间小时  0-8 默认为255
	            if (leftHour > 9) {
	                leftHour = 0;
	            }
	            var leftMinute = this.state.MinuteRemainingTime || "0"; //剩余时间分钟 0-59
	            var workStatus = "";

	            //console.log("leftHour: " + leftHour + " leftMinute:" + leftMinute);

	            if (alarmClockIndex) {
	                workStatus = " 定时中" + leftHour + "小时" + leftMinute + "分钟后关闭";
	            }
	            if (workModeIndex == 1) {
	                workStatus = "已关机";
	            }

	            switch (autoModeIndex) {
	                case 1:
	                    autoModePath = "../static/image/appmain/automode01.png";break;
	                case 2:
	                    autoModePath = "../static/image/appmain/automode03.png";autoMode = "appMain_selected";break;
	                case 3:
	                    autoModePath = "../static/image/appmain/lowspeed03.png";autoMode = "appMain_selected";break;
	                case 4:
	                    autoModePath = "../static/image/appmain/midlespeed03.png";autoMode = "appMain_selected";break;
	                case 5:
	                    autoModePath = "../static/image/appmain/hightspeed03.png";autoMode = "appMain_selected";break;
	                case 6:
	                    autoModePath = "../static/image/appmain/sleepmode03.png";autoMode = "appMain_selected";break;
	                case 7:
	                    autoModePath = "../static/image/appmain/sleepmode02.png";autoMode = "appMain_selected";break;
	            }

	            if (!this.state.onLinestatue) {
	                workStatus = "设备失去连接，请尝试重新连接";
	            }
	            var globalDisable = "";
	            var enableBackAnimation = this.state.enableBackAnimation;

	            var childLock = (this.state.ChildLockState || 1) == 2;
	            var switchDisable = "";
	            if (childLock) {
	                alarmClockPath = "../static/image/appmain/alarmClock01.png";
	                alarmClock = "appMain_disabled";
	                UvImagePath = "../static/image/appmain/uvmode01.png";
	                ultravioletLamp = "appMain_disabled";
	                IonImagePath = "../static/image/appmain/anionmode01.png";
	                anionMode = "appMain_disabled";
	                autoModePath = "../static/image/appmain/automode01.png";
	                autoMode = "appMain_disabled";
	                switchDisable = "switchDisable";
	            }

	            if (workModeIndex == 1 || !this.state.onLinestatue) {
	                alarmClockPath = "../static/image/appmain/alarmClock01.png";
	                alarmClock = "appMain_disabled";
	                UvImagePath = "../static/image/appmain/uvmode01.png";
	                ultravioletLamp = "appMain_disabled";
	                IonImagePath = "../static/image/appmain/anionmode01.png";
	                anionMode = "appMain_disabled";
	                autoModePath = "../static/image/appmain/automode01.png";
	                autoMode = "appMain_disabled";
	                globalDisable = "globalDisable";
	                enableBackAnimation = false;
	            }

	            var PM25Value = this.state.pm25 || "0";
	            var airValue = "中";
	            var currentAirQuality = this.state.CurrentAirQuality || 2;
	            var airstatus = "";

	            var moveDirection = "";
	            var graintColor = pointColor[0];

	            switch (currentAirQuality) {
	                case 1:
	                    {
	                        airValue = "优";
	                        airstatus = airStatusStrArray[0];
	                        graintColor = pointColor[0];
	                        moveDirection = "output";
	                        break;
	                    }
	                case 2:
	                    {
	                        airValue = "中";
	                        airstatus = airStatusStrArray[1];
	                        graintColor = pointColor[1];
	                        moveDirection = "input";
	                        break;
	                    }
	                case 3:
	                    {
	                        airValue = "差";
	                        airstatus = airStatusStrArray[2];
	                        graintColor = pointColor[2];
	                        moveDirection = "input";
	                        break;
	                    }
	                default:
	                    {
	                        airValue = "优";
	                        airstatus = airStatusStrArray[0];
	                        graintColor = pointColor[0];
	                        moveDirection = "output";
	                        break;
	                    }
	            }

	            var gpsLocationCityName = this.state.cityName || "";
	            var selectshow = this.state.selectshow;
	            var timeSelectDataSource = fixedTim;
	            if (selectshow && !isFixdTime) {
	                timeSelectDataSource = daySelect;
	            }
	            var leftTime = this.state.HourFilterWorkTime || 0;
	            var leftPercent = 100 - Math.floor(leftTime) / 20;
	            leftPercent = leftPercent < 0 ? "0" : leftPercent;
	            leftPercent = parseInt(leftPercent);
	            var leftLifeTimeStr = "滤网寿命剩余" + leftPercent + "%";
	            if (!this.state.filterTimePercentMode) {
	                var leftHours = 2000 - Math.floor(leftTime);
	                if (leftHours < 0) {
	                    leftHours = 0;
	                }
	                leftLifeTimeStr = "滤网寿命剩余" + leftHours + "小时";
	            }
	            var filterAlertImagePathStyle = leftPercent < 10 ? {} : { paddingRight: "6px", visibility: "hidden" };

	            return React.createElement(
	                'div',
	                { className: 'container' },
	                React.createElement(
	                    'div',
	                    { className: 'watingPage' },
	                    React.createElement(
	                        'div',
	                        { className: 'diveceView ' },
	                        React.createElement(
	                            'div',
	                            { className: "dirt_image " },
	                            function () {
	                                if (enableBackAnimation) {
	                                    console.log("i enableBackAnimation ");

	                                    {/*return <DirtView airStatus={airstatus}/>*/}

	                                    return React.createElement(_EmitterCSSAnimation.EmitterCSSAnimation, {
	                                        direction: moveDirection,
	                                        grainColor: graintColor });

	                                    {/*return  <YYEmitterCSSAnimation*/}
	                                    {/*direction={moveDirection}*/}
	                                    {/*grainColor={graintColor}/>  ;*/}

	                                    {/*return <YYImageAnimation />*/}
	                                }
	                            }()
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: "deviceWasherImage " + globalDisable },
	                            React.createElement(
	                                'div',
	                                { className: 'circleView ' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'circleView_middle ' },
	                                    React.createElement('div', { className: "circleView_inner " + airstatus, style: { width: halfScreenWidth, height: halfScreenWidth } })
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: "air_info " + globalDisable, style: { top: airInfoPercent } },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        '\u7A7A\u6C14\u8D28\u91CF\u7B49\u7EA7'
	                                    ),
	                                    React.createElement(
	                                        'h3',
	                                        { className: 'air_info_level' },
	                                        airValue
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: 'locationInfo', onTouchStart: this.switchToWeather.bind(this) },
	                                        React.createElement('img', { src: '../static/image/appmain/location.png' }),
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            gpsLocationCityName
	                                        )
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: 'pmTempValue' },
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            '\u5BA4\u5916PM2.5:',
	                                            PM25Value
	                                        )
	                                    )
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'device_control' },
	                            React.createElement(
	                                'div',
	                                { className: 'device_control_relative' },
	                                React.createElement(
	                                    'dl',
	                                    { className: "wash_children_lock " + globalDisable, onTouchStart: this.childLockAction.bind(this) },
	                                    React.createElement(
	                                        'dd',
	                                        null,
	                                        React.createElement('img', { src: "../static/image/appmain/childerlock_" + (childLock ? "on.png" : "off.png"), width: '36', height: '36' })
	                                    ),
	                                    React.createElement(
	                                        'dt',
	                                        null,
	                                        '\u7AE5\u9501'
	                                    )
	                                ),
	                                React.createElement(
	                                    'dl',
	                                    { className: "wash_switch " + switchDisable, onTouchStart: this.switchAction.bind(this) },
	                                    React.createElement(
	                                        'dd',
	                                        null,
	                                        React.createElement('img', { src: '../static/image/appmain/wash_switch.png', width: '36', height: '36' })
	                                    ),
	                                    React.createElement(
	                                        'dt',
	                                        null,
	                                        switchValue
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: "screen_life_relative " + globalDisable },
	                                    React.createElement(
	                                        'div',
	                                        { onTouchStart: this.showFilterLeftTimeMode.bind(this) },
	                                        React.createElement('img', { src: '../static/image/appmain/filterImage.png', width: '15', height: '15', style: filterAlertImagePathStyle }),
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            leftLifeTimeStr
	                                        )
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: 'arrow_panel', onTouchStart: this.switchToPMValueHistoryView.bind(this) },
	                                        React.createElement('img', { src: '../static/image/appmain/arrow_up.png' })
	                                    )
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(_AirStatePage.AirStatePage, {
	                        show: this.state.airInfoPage,
	                        hiddenAction: this.switchToPMValueHistoryView.bind(this),

	                        selectOneDay: this.selectOneDay.bind(this),
	                        selectOneDayOnMonth: this.state.oneDayOnMonthSelect,
	                        selectOneDayOnMonthRequest: this.state.oneDayOnMonthSelectRequest,

	                        historyData: this.state.historyOneDayData
	                    }),
	                    React.createElement(
	                        'div',
	                        { className: 'ControlPannelUpWave' },
	                        React.createElement(_Wave.Wave, { waveID: 'workWave' })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'device_panel' },
	                        React.createElement(
	                            'h3',
	                            { style: { height: "20px" } },
	                            workStatus
	                        ),
	                        React.createElement(
	                            'section',
	                            { className: 'flex control_btn_list' },
	                            React.createElement(
	                                'dl',
	                                { className: "flex-cell", key: '0', 'data-index': '0', onTouchStart: this.autoModeAction.bind(this) },
	                                React.createElement(
	                                    'dd',
	                                    { className: autoMode },
	                                    React.createElement('img', { src: autoModePath })
	                                ),
	                                React.createElement(
	                                    'dt',
	                                    { className: autoMode },
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        workModeValue
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'dl',
	                                { className: "flex-cell", key: '1', 'data-index': '1', onTouchStart: this.alarmColokAction.bind(this) },
	                                React.createElement(
	                                    'dd',
	                                    { className: alarmClock },
	                                    React.createElement('img', { src: alarmClockPath })
	                                ),
	                                React.createElement(
	                                    'dt',
	                                    { className: alarmClock },
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        '\u5B9A\u65F6'
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'dl',
	                                { className: "flex-cell", key: '2', 'data-index': '2', onTouchStart: this.anionModeAction.bind(this) },
	                                React.createElement(
	                                    'dd',
	                                    { className: anionMode },
	                                    ' ',
	                                    React.createElement('img', { src: IonImagePath })
	                                ),
	                                React.createElement(
	                                    'dt',
	                                    { className: anionMode },
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        '\u8D1F\u79BB\u5B50'
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'dl',
	                                { className: 'flex-cell', key: '3', 'data-index': '3', onTouchStart: this.ultravioletLampAction.bind(this) },
	                                React.createElement(
	                                    'dd',
	                                    { className: ultravioletLamp },
	                                    React.createElement('img', { src: UvImagePath })
	                                ),
	                                React.createElement(
	                                    'dt',
	                                    { className: ultravioletLamp },
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        '\u7D2B\u5916\u706F'
	                                    )
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_TimeSelect.TimeSelect, {

	                    needUpdateArray: false,
	                    show: selectshow,
	                    title: timeSelectDataSource.title,
	                    statusshow: timeSelectDataSource.statusshow,

	                    hourshow: true,
	                    hourstep: 1,
	                    hourunit: timeSelectDataSource.hourunit,
	                    minhour: timeSelectDataSource.minhour,
	                    maxhour: timeSelectDataSource.maxhour,

	                    minuteshow: false,
	                    minutestep: 1,
	                    minuteunit: '',
	                    minminute: 0,
	                    maxmin: 0,

	                    defaulthour: timeSelectDataSource.defaulthour,
	                    defaultminute: '0',
	                    cancelClock: this.cancelClock.bind(this),
	                    submitClock: this.submitClock.bind(this),
	                    hourarray: timeSelectDataSource.hourarray,
	                    ArrayInit: false
	                })
	            );
	        }
	    }]);
	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 设备控制');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/forcast', component: _WeatherForecast.WeatherForecast })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CircleWave = undefined;

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(33);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(117);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var wave_width = 140; /**
	                       * Created by yuanyunlong on 2017/1/3.
	                       */

	var wave_angle = 10;
	var wave_height = 15; // 浪的峰值

	var CircleWave = exports.CircleWave = function (_Component) {
	    (0, _inherits3.default)(CircleWave, _Component);

	    function CircleWave(props) {
	        (0, _classCallCheck3.default)(this, CircleWave);

	        var _this2 = (0, _possibleConstructorReturn3.default)(this, (CircleWave.__proto__ || (0, _getPrototypeOf2.default)(CircleWave)).call(this, props));

	        _this2.status = {
	            flag: 0,
	            step: 0,
	            lines: ['rgba(170,221,255,0.3)', 'rgba(170,221,255,0.3)']
	        };
	        console.log("child constructor");

	        wave_width = window.screen.width * 0.55;
	        return _this2;
	    }

	    (0, _createClass3.default)(CircleWave, [{
	        key: 'defaultProps',
	        value: function defaultProps() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {

	            var drawing = document.querySelector('#washerCanvas');

	            var context = drawing.getContext('2d');

	            this.setState({
	                drawing: drawing,
	                context: context
	            });

	            var _this = this;

	            // setTimeout(function () {
	            //     _this.draw();
	            // }, 1000);

	            setInterval(function () {
	                _this.init();
	            }, 1000 / 60);
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            this.draw();
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {

	            var ctx = this.state.context;
	            var lines = this.status.lines;
	            var step = this.status.step;

	            ctx.clearRect(0, 0, wave_width, wave_width);
	            step++;

	            this.status.step = step;

	            var circleRadius = wave_width / 2.0;
	            var circleDistance = wave_width / 1.0;

	            for (var j = lines.length - 1; j >= 0; j--) {

	                //转化为弧度
	                var stepAngle = (step + j * 90) * Math.PI / 180;
	                var deltaHeight = Math.sin(stepAngle) * wave_angle;

	                var deltaHeightRight = Math.cos(stepAngle) * wave_angle;

	                var y = circleRadius / 0.8 - deltaHeight;

	                //计算在左半圆上随着y值上下移动，对应的x值
	                // 90*90
	                var expression = circleRadius * circleRadius - Math.pow(circleRadius - y, 2);
	                var x = circleRadius - Math.sqrt(expression);

	                var rightY = circleRadius / .8 - deltaHeightRight;
	                var expressionRight = circleRadius * circleRadius - Math.pow(circleRadius - rightY, 2);
	                //取右侧的X坐标（同一个y值会有两个x坐标）
	                var rightX = circleDistance - (circleRadius - Math.sqrt(expressionRight));
	                // alert("rightX:"+rightX+" rightY:"+rightY+" x:"+x+" y:"+y);

	                ctx.lineWidth = 0.1;
	                ctx.strokeStyle = lines[j];
	                ctx.fillStyle = lines[j];
	                ctx.beginPath();
	                ctx.moveTo(x, y);

	                ctx.bezierCurveTo(circleRadius, y - wave_height, circleRadius, rightY - wave_height, rightX, rightY);
	                //计算圆起始点（与X轴平行的直径的右侧端点）与圆左侧给定Y坐标的点


	                var distance = Math.sqrt(Math.pow(circleDistance - x, 2) + Math.pow(circleRadius - y, 2));
	                //sina=d/2r   a为夹角的一半  2a为两点的圆心角   Math.asin最终结果为弧度 如asin(1)=1/2*PI
	                var angle = Math.asin(distance / circleDistance) * 2;

	                var distanceRight = Math.sqrt(Math.pow(circleDistance - rightX, 2) + Math.pow(circleRadius - rightY, 2));
	                var angleRight = Math.asin(distanceRight / circleDistance) * 2;
	                //如果在左侧上半圆则用2PI-弧度
	                if (y < circleRadius) {
	                    angle = 2 * Math.PI - angle;
	                }

	                if (rightY < circleRadius) {
	                    angleRight = -angleRight;
	                }

	                ctx.arc(circleRadius, circleRadius, circleRadius, angleRight, angle, false);

	                ctx.stroke();
	                ctx.fill();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            return _react2.default.createElement('canvas', { id: 'washerCanvas', width: wave_width, height: wave_width });
	        }
	    }]);
	    return CircleWave;
	}(_react.Component);

	;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(118);


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */

	'use strict';

	var _assign = __webpack_require__(120);

	var ReactChildren = __webpack_require__(121);
	var ReactComponent = __webpack_require__(133);
	var ReactPureComponent = __webpack_require__(136);
	var ReactClass = __webpack_require__(137);
	var ReactDOMFactories = __webpack_require__(142);
	var ReactElement = __webpack_require__(125);
	var ReactPropTypes = __webpack_require__(147);
	var ReactVersion = __webpack_require__(148);

	var onlyChild = __webpack_require__(149);
	var warning = __webpack_require__(127);

	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(143);
	  createElement = ReactElementValidator.createElement;
	  createFactory = ReactElementValidator.createFactory;
	  cloneElement = ReactElementValidator.cloneElement;
	}

	var __spread = _assign;

	if (process.env.NODE_ENV !== 'production') {
	  var warned = false;
	  __spread = function () {
	    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
	    warned = true;
	    return _assign.apply(null, arguments);
	  };
	}

	var React = {

	  // Modern

	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    toArray: ReactChildren.toArray,
	    only: onlyChild
	  },

	  Component: ReactComponent,
	  PureComponent: ReactPureComponent,

	  createElement: createElement,
	  cloneElement: cloneElement,
	  isValidElement: ReactElement.isValidElement,

	  // Classic

	  PropTypes: ReactPropTypes,
	  createClass: ReactClass.createClass,
	  createFactory: createFactory,
	  createMixin: function (mixin) {
	    // Currently a noop. Will be used to validate and trace mixins.
	    return mixin;
	  },

	  // This looks DOM specific but these are actually isomorphic helpers
	  // since they are just generating DOM strings.
	  DOM: ReactDOMFactories,

	  version: ReactVersion,

	  // Deprecated hook for JSX spread, don't use this for anything.
	  __spread: __spread
	};

	module.exports = React;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 119 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 120 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactChildren
	 */

	'use strict';

	var PooledClass = __webpack_require__(122);
	var ReactElement = __webpack_require__(125);

	var emptyFunction = __webpack_require__(128);
	var traverseAllChildren = __webpack_require__(130);

	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var fourArgumentPooler = PooledClass.fourArgumentPooler;

	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.func = forEachFunction;
	  this.context = forEachContext;
	  this.count = 0;
	}
	ForEachBookKeeping.prototype.destructor = function () {
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;

	  func.call(context, child, bookKeeping.count++);
	}

	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}
	MapBookKeeping.prototype.destructor = function () {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result;
	  var keyPrefix = bookKeeping.keyPrefix;
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;


	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (ReactElement.isValidElement(mappedChild)) {
	      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}

	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}

	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}

	function forEachSingleChildDummy(traverseContext, child, name) {
	  return null;
	}

	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}

	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}

	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
	  count: countChildren,
	  toArray: toArray
	};

	module.exports = ReactChildren;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PooledClass
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(123);

	var invariant = __webpack_require__(124);

	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function (copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function (a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function (a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fourArgumentPooler = function (a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};

	var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
	  }
	};

	var standardReleaser = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;

	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances.
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function (CopyConstructor, pooler) {
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};

	module.exports = PooledClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 123 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule reactProdInvariant
	 * 
	 */
	'use strict';

	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */

	function reactProdInvariant(code) {
	  var argCount = arguments.length - 1;

	  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

	  for (var argIdx = 0; argIdx < argCount; argIdx++) {
	    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
	  }

	  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

	  var error = new Error(message);
	  error.name = 'Invariant Violation';
	  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

	  throw error;
	}

	module.exports = reactProdInvariant;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	'use strict';

	var _assign = __webpack_require__(120);

	var ReactCurrentOwner = __webpack_require__(126);

	var warning = __webpack_require__(127);
	var canDefineProperty = __webpack_require__(129);
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};

	var specialPropKeyWarningShown, specialPropRefWarningShown;

	function hasValidRef(config) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.key !== undefined;
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  var warnAboutAccessingKey = function () {
	    if (!specialPropKeyWarningShown) {
	      specialPropKeyWarningShown = true;
	      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
	    }
	  };
	  warnAboutAccessingKey.isReactWarning = true;
	  Object.defineProperty(props, 'key', {
	    get: warnAboutAccessingKey,
	    configurable: true
	  });
	}

	function defineRefPropWarningGetter(props, displayName) {
	  var warnAboutAccessingRef = function () {
	    if (!specialPropRefWarningShown) {
	      specialPropRefWarningShown = true;
	      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
	    }
	  };
	  warnAboutAccessingRef.isReactWarning = true;
	  Object.defineProperty(props, 'ref', {
	    get: warnAboutAccessingRef,
	    configurable: true
	  });
	}

	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,

	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,

	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  if (process.env.NODE_ENV !== 'production') {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};
	    var shadowChildren = Array.isArray(props.children) ? props.children.slice(0) : props.children;

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    if (canDefineProperty) {
	      Object.defineProperty(element._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: false
	      });
	      // self and source are DEV only properties.
	      Object.defineProperty(element, '_self', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: self
	      });
	      Object.defineProperty(element, '_shadowChildren', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: shadowChildren
	      });
	      // Two elements created in two different places should be considered
	      // equal for testing purposes and therefore we hide it from enumeration.
	      Object.defineProperty(element, '_source', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: source
	      });
	    } else {
	      element._store.validated = false;
	      element._self = self;
	      element._shadowChildren = shadowChildren;
	      element._source = source;
	    }
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};

	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
	 */
	ReactElement.createElement = function (type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      ref = config.ref;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }

	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    if (key || ref) {
	      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
	        if (key) {
	          defineKeyPropWarningGetter(props, displayName);
	        }
	        if (ref) {
	          defineRefPropWarningGetter(props, displayName);
	        }
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	};

	/**
	 * Return a function that produces ReactElements of a given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
	 */
	ReactElement.createFactory = function (type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

	  return newElement;
	};

	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
	 */
	ReactElement.cloneElement = function (element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = _assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }

	    // Remaining properties override existing props
	    var defaultProps;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return ReactElement(element.type, key, ref, self, source, owner, props);
	};

	/**
	 * Verifies the object is a ReactElement.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function (object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	};

	ReactElement.REACT_ELEMENT_TYPE = REACT_ELEMENT_TYPE;

	module.exports = ReactElement;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 126 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */

	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(128);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var printWarning = function printWarning(format) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };

	    warning = function warning(condition, format) {
	      if (format === undefined) {
	        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	      }

	      if (format.indexOf('Failed Composite propType: ') === 0) {
	        return; // Ignore CompositeComponent proptype check.
	      }

	      if (!condition) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }

	        printWarning.apply(undefined, [format].concat(args));
	      }
	    };
	  })();
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 128 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule canDefineProperty
	 */

	'use strict';

	var canDefineProperty = false;
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    Object.defineProperty({}, 'x', { get: function () {} });
	    canDefineProperty = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	module.exports = canDefineProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule traverseAllChildren
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(123);

	var ReactCurrentOwner = __webpack_require__(126);
	var ReactElement = __webpack_require__(125);

	var getIteratorFn = __webpack_require__(131);
	var invariant = __webpack_require__(124);
	var KeyEscapeUtils = __webpack_require__(132);
	var warning = __webpack_require__(127);

	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';

	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */

	var didWarnAboutMaps = false;

	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return KeyEscapeUtils.escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }

	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          var mapsAsChildrenAddendum = '';
	          if (ReactCurrentOwner.current) {
	            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
	            if (mapsAsChildrenOwnerName) {
	              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
	            }
	          }
	          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (process.env.NODE_ENV !== 'production') {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
	        if (children._isReactElement) {
	          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
	        }
	        if (ReactCurrentOwner.current) {
	          var name = ReactCurrentOwner.current.getName();
	          if (name) {
	            addendum += ' Check the render method of `' + name + '`.';
	          }
	        }
	      }
	      var childrenString = String(children);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
	    }
	  }

	  return subtreeCount;
	}

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}

	module.exports = traverseAllChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 131 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getIteratorFn
	 * 
	 */

	'use strict';

	/* global Symbol */

	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	module.exports = getIteratorFn;

/***/ },
/* 132 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule KeyEscapeUtils
	 * 
	 */

	'use strict';

	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {string} key to be escaped.
	 * @return {string} the escaped key.
	 */

	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });

	  return '$' + escapedString;
	}

	/**
	 * Unescape and unwrap key for human-readable display
	 *
	 * @param {string} key to unescape.
	 * @return {string} the unescaped key.
	 */
	function unescape(key) {
	  var unescapeRegex = /(=0|=2)/g;
	  var unescaperLookup = {
	    '=0': '=',
	    '=2': ':'
	  };
	  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

	  return ('' + keySubstring).replace(unescapeRegex, function (match) {
	    return unescaperLookup[match];
	  });
	}

	var KeyEscapeUtils = {
	  escape: escape,
	  unescape: unescape
	};

	module.exports = KeyEscapeUtils;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponent
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(123);

	var ReactNoopUpdateQueue = __webpack_require__(134);

	var canDefineProperty = __webpack_require__(129);
	var emptyObject = __webpack_require__(135);
	var invariant = __webpack_require__(124);
	var warning = __webpack_require__(127);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	ReactComponent.prototype.isReactComponent = {};

	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
	  this.updater.enqueueSetState(this, partialState);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'setState');
	  }
	};

	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'forceUpdate');
	  }
	};

	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function (methodName, info) {
	    if (canDefineProperty) {
	      Object.defineProperty(ReactComponent.prototype, methodName, {
	        get: function () {
	          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
	          return undefined;
	        }
	      });
	    }
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}

	module.exports = ReactComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNoopUpdateQueue
	 */

	'use strict';

	var warning = __webpack_require__(127);

	function warnNoop(publicInstance, callerName) {
	  if (process.env.NODE_ENV !== 'production') {
	    var constructor = publicInstance.constructor;
	    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
	  }
	}

	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },

	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback) {},

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    warnNoop(publicInstance, 'forceUpdate');
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState) {
	    warnNoop(publicInstance, 'replaceState');
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	    warnNoop(publicInstance, 'setState');
	  }
	};

	module.exports = ReactNoopUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPureComponent
	 */

	'use strict';

	var _assign = __webpack_require__(120);

	var ReactComponent = __webpack_require__(133);
	var ReactNoopUpdateQueue = __webpack_require__(134);

	var emptyObject = __webpack_require__(135);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactPureComponent(props, context, updater) {
	  // Duplicated from ReactComponent.
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	function ComponentDummy() {}
	ComponentDummy.prototype = ReactComponent.prototype;
	ReactPureComponent.prototype = new ComponentDummy();
	ReactPureComponent.prototype.constructor = ReactPureComponent;
	// Avoid an extra prototype jump for these methods.
	_assign(ReactPureComponent.prototype, ReactComponent.prototype);
	ReactPureComponent.prototype.isPureReactComponent = true;

	module.exports = ReactPureComponent;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactClass
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(123),
	    _assign = __webpack_require__(120);

	var ReactComponent = __webpack_require__(133);
	var ReactElement = __webpack_require__(125);
	var ReactPropTypeLocations = __webpack_require__(138);
	var ReactPropTypeLocationNames = __webpack_require__(140);
	var ReactNoopUpdateQueue = __webpack_require__(134);

	var emptyObject = __webpack_require__(135);
	var invariant = __webpack_require__(124);
	var keyMirror = __webpack_require__(139);
	var keyOf = __webpack_require__(141);
	var warning = __webpack_require__(127);

	var MIXINS_KEY = keyOf({ mixins: null });

	/**
	 * Policies that describe methods in `ReactClassInterface`.
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null
	});

	var injectedMixins = [];

	/**
	 * Composite components are higher-level components that compose other composite
	 * or host components.
	 *
	 * To create a new type of `ReactClass`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactClassInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will be available on the prototype.
	 *
	 * @interface ReactClassInterface
	 * @internal
	 */
	var ReactClassInterface = {

	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: SpecPolicy.DEFINE_MANY,

	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: SpecPolicy.DEFINE_MANY,

	  // ==== Definition methods ====

	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: SpecPolicy.DEFINE_ONCE,

	  // ==== Delegate methods ====

	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps, nextContext) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props, state and/or context.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props/state/context will not require a component
	   * update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	   *     return !equal(nextProps, this.props) ||
	   *       !equal(nextState, this.state) ||
	   *       !equal(nextContext, this.context);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	   * and `nextContext`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {?object} prevContext
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: SpecPolicy.DEFINE_MANY,

	  // ==== Advanced methods ====

	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: SpecPolicy.OVERRIDE_BASE

	};

	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared like instance properties in the specification
	 * when defining classes using `React.createClass`, they are actually static
	 * and are accessible on the constructor instead of the prototype. Despite
	 * being static, they must be defined outside of the "statics" key under
	 * which all other static methods are defined.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function (Constructor, displayName) {
	    Constructor.displayName = displayName;
	  },
	  mixins: function (Constructor, mixins) {
	    if (mixins) {
	      for (var i = 0; i < mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, mixins[i]);
	      }
	    }
	  },
	  childContextTypes: function (Constructor, childContextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
	    }
	    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
	  },
	  contextTypes: function (Constructor, contextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
	    }
	    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
	  },
	  /**
	   * Special case getDefaultProps which should move into statics but requires
	   * automatic merging.
	   */
	  getDefaultProps: function (Constructor, getDefaultProps) {
	    if (Constructor.getDefaultProps) {
	      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
	    } else {
	      Constructor.getDefaultProps = getDefaultProps;
	    }
	  },
	  propTypes: function (Constructor, propTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
	    }
	    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	  },
	  statics: function (Constructor, statics) {
	    mixStaticSpecIntoComponent(Constructor, statics);
	  },
	  autobind: function () {} };

	// noop
	function validateTypeDef(Constructor, typeDef, location) {
	  for (var propName in typeDef) {
	    if (typeDef.hasOwnProperty(propName)) {
	      // use a warning instead of an invariant so components
	      // don't show up in prod but only in __DEV__
	      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
	    }
	  }
	}

	function validateMethodOverride(isAlreadyDefined, name) {
	  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactClassMixin.hasOwnProperty(name)) {
	    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
	  }

	  // Disallow defining methods more than once unless explicitly allowed.
	  if (isAlreadyDefined) {
	    !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
	  }
	}

	/**
	 * Mixin helper which handles policy validation and reserved
	 * specification keys when building React classes.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  if (!spec) {
	    if (process.env.NODE_ENV !== 'production') {
	      var typeofSpec = typeof spec;
	      var isMixinValid = typeofSpec === 'object' && spec !== null;

	      process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
	    }

	    return;
	  }

	  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
	  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

	  var proto = Constructor.prototype;
	  var autoBindPairs = proto.__reactAutoBindPairs;

	  // By handling mixins before any other properties, we ensure the same
	  // chaining order is applied to methods with DEFINE_MANY policy, whether
	  // mixins are listed before or after these methods in the spec.
	  if (spec.hasOwnProperty(MIXINS_KEY)) {
	    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	  }

	  for (var name in spec) {
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }

	    if (name === MIXINS_KEY) {
	      // We have already handled mixins in a special case above.
	      continue;
	    }

	    var property = spec[name];
	    var isAlreadyDefined = proto.hasOwnProperty(name);
	    validateMethodOverride(isAlreadyDefined, name);

	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactClass methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	      if (shouldAutoBind) {
	        autoBindPairs.push(name, property);
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactClassInterface[name];

	          // These cases should already be caught by validateMethodOverride.
	          !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	          if (process.env.NODE_ENV !== 'production') {
	            // Add verbose displayName to the function, which helps when looking
	            // at profiling tools.
	            if (typeof property === 'function' && spec.displayName) {
	              proto[name].displayName = spec.displayName + '_' + name;
	            }
	          }
	        }
	      }
	    }
	  }
	}

	function mixStaticSpecIntoComponent(Constructor, statics) {
	  if (!statics) {
	    return;
	  }
	  for (var name in statics) {
	    var property = statics[name];
	    if (!statics.hasOwnProperty(name)) {
	      continue;
	    }

	    var isReserved = name in RESERVED_SPEC_KEYS;
	    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

	    var isInherited = name in Constructor;
	    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
	    Constructor[name] = property;
	  }
	}

	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeIntoWithNoDuplicateKeys(one, two) {
	  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

	  for (var key in two) {
	    if (two.hasOwnProperty(key)) {
	      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
	      one[key] = two[key];
	    }
	  }
	  return one;
	}

	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    var c = {};
	    mergeIntoWithNoDuplicateKeys(c, a);
	    mergeIntoWithNoDuplicateKeys(c, b);
	    return c;
	  };
	}

	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	/**
	 * Binds a method to the component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 * @param {function} method Method to be bound.
	 * @return {function} The bound method.
	 */
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	  if (process.env.NODE_ENV !== 'production') {
	    boundMethod.__reactBoundContext = component;
	    boundMethod.__reactBoundMethod = method;
	    boundMethod.__reactBoundArguments = null;
	    var componentName = component.constructor.displayName;
	    var _bind = boundMethod.bind;
	    boundMethod.bind = function (newThis) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      // User is trying to bind() an autobound method; we effectively will
	      // ignore the value of "this" that the user is trying to use, so
	      // let's warn.
	      if (newThis !== component && newThis !== null) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
	      } else if (!args.length) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
	        return boundMethod;
	      }
	      var reboundMethod = _bind.apply(boundMethod, arguments);
	      reboundMethod.__reactBoundContext = component;
	      reboundMethod.__reactBoundMethod = method;
	      reboundMethod.__reactBoundArguments = args;
	      return reboundMethod;
	    };
	  }
	  return boundMethod;
	}

	/**
	 * Binds all auto-bound methods in a component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 */
	function bindAutoBindMethods(component) {
	  var pairs = component.__reactAutoBindPairs;
	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];
	    var method = pairs[i + 1];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}

	/**
	 * Add more to the ReactClass base class. These are all legacy features and
	 * therefore not already part of the modern ReactComponent.
	 */
	var ReactClassMixin = {

	  /**
	   * TODO: This will be deprecated because state should always keep a consistent
	   * type signature and the only use case for this, is to avoid that.
	   */
	  replaceState: function (newState, callback) {
	    this.updater.enqueueReplaceState(this, newState);
	    if (callback) {
	      this.updater.enqueueCallback(this, callback, 'replaceState');
	    }
	  },

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function () {
	    return this.updater.isMounted(this);
	  }
	};

	var ReactClassComponent = function () {};
	_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

	/**
	 * Module for creating composite components.
	 *
	 * @class ReactClass
	 */
	var ReactClass = {

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function (spec) {
	    var Constructor = function (props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (initialState === undefined && this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

	      this.state = initialState;
	    };
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, spec);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  },

	  injection: {
	    injectMixin: function (mixin) {
	      injectedMixins.push(mixin);
	    }
	  }

	};

	module.exports = ReactClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocations
	 */

	'use strict';

	var keyMirror = __webpack_require__(139);

	var ReactPropTypeLocations = keyMirror({
	  prop: null,
	  context: null,
	  childContext: null
	});

	module.exports = ReactPropTypeLocations;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(124);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function keyMirror(obj) {
	  var ret = {};
	  var key;
	  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : void 0;
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocationNames
	 */

	'use strict';

	var ReactPropTypeLocationNames = {};

	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}

	module.exports = ReactPropTypeLocationNames;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 141 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function keyOf(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMFactories
	 */

	'use strict';

	var ReactElement = __webpack_require__(125);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @private
	 */
	var createDOMFactory = ReactElement.createFactory;
	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(143);
	  createDOMFactory = ReactElementValidator.createFactory;
	}

	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOMFactories = {
	  a: createDOMFactory('a'),
	  abbr: createDOMFactory('abbr'),
	  address: createDOMFactory('address'),
	  area: createDOMFactory('area'),
	  article: createDOMFactory('article'),
	  aside: createDOMFactory('aside'),
	  audio: createDOMFactory('audio'),
	  b: createDOMFactory('b'),
	  base: createDOMFactory('base'),
	  bdi: createDOMFactory('bdi'),
	  bdo: createDOMFactory('bdo'),
	  big: createDOMFactory('big'),
	  blockquote: createDOMFactory('blockquote'),
	  body: createDOMFactory('body'),
	  br: createDOMFactory('br'),
	  button: createDOMFactory('button'),
	  canvas: createDOMFactory('canvas'),
	  caption: createDOMFactory('caption'),
	  cite: createDOMFactory('cite'),
	  code: createDOMFactory('code'),
	  col: createDOMFactory('col'),
	  colgroup: createDOMFactory('colgroup'),
	  data: createDOMFactory('data'),
	  datalist: createDOMFactory('datalist'),
	  dd: createDOMFactory('dd'),
	  del: createDOMFactory('del'),
	  details: createDOMFactory('details'),
	  dfn: createDOMFactory('dfn'),
	  dialog: createDOMFactory('dialog'),
	  div: createDOMFactory('div'),
	  dl: createDOMFactory('dl'),
	  dt: createDOMFactory('dt'),
	  em: createDOMFactory('em'),
	  embed: createDOMFactory('embed'),
	  fieldset: createDOMFactory('fieldset'),
	  figcaption: createDOMFactory('figcaption'),
	  figure: createDOMFactory('figure'),
	  footer: createDOMFactory('footer'),
	  form: createDOMFactory('form'),
	  h1: createDOMFactory('h1'),
	  h2: createDOMFactory('h2'),
	  h3: createDOMFactory('h3'),
	  h4: createDOMFactory('h4'),
	  h5: createDOMFactory('h5'),
	  h6: createDOMFactory('h6'),
	  head: createDOMFactory('head'),
	  header: createDOMFactory('header'),
	  hgroup: createDOMFactory('hgroup'),
	  hr: createDOMFactory('hr'),
	  html: createDOMFactory('html'),
	  i: createDOMFactory('i'),
	  iframe: createDOMFactory('iframe'),
	  img: createDOMFactory('img'),
	  input: createDOMFactory('input'),
	  ins: createDOMFactory('ins'),
	  kbd: createDOMFactory('kbd'),
	  keygen: createDOMFactory('keygen'),
	  label: createDOMFactory('label'),
	  legend: createDOMFactory('legend'),
	  li: createDOMFactory('li'),
	  link: createDOMFactory('link'),
	  main: createDOMFactory('main'),
	  map: createDOMFactory('map'),
	  mark: createDOMFactory('mark'),
	  menu: createDOMFactory('menu'),
	  menuitem: createDOMFactory('menuitem'),
	  meta: createDOMFactory('meta'),
	  meter: createDOMFactory('meter'),
	  nav: createDOMFactory('nav'),
	  noscript: createDOMFactory('noscript'),
	  object: createDOMFactory('object'),
	  ol: createDOMFactory('ol'),
	  optgroup: createDOMFactory('optgroup'),
	  option: createDOMFactory('option'),
	  output: createDOMFactory('output'),
	  p: createDOMFactory('p'),
	  param: createDOMFactory('param'),
	  picture: createDOMFactory('picture'),
	  pre: createDOMFactory('pre'),
	  progress: createDOMFactory('progress'),
	  q: createDOMFactory('q'),
	  rp: createDOMFactory('rp'),
	  rt: createDOMFactory('rt'),
	  ruby: createDOMFactory('ruby'),
	  s: createDOMFactory('s'),
	  samp: createDOMFactory('samp'),
	  script: createDOMFactory('script'),
	  section: createDOMFactory('section'),
	  select: createDOMFactory('select'),
	  small: createDOMFactory('small'),
	  source: createDOMFactory('source'),
	  span: createDOMFactory('span'),
	  strong: createDOMFactory('strong'),
	  style: createDOMFactory('style'),
	  sub: createDOMFactory('sub'),
	  summary: createDOMFactory('summary'),
	  sup: createDOMFactory('sup'),
	  table: createDOMFactory('table'),
	  tbody: createDOMFactory('tbody'),
	  td: createDOMFactory('td'),
	  textarea: createDOMFactory('textarea'),
	  tfoot: createDOMFactory('tfoot'),
	  th: createDOMFactory('th'),
	  thead: createDOMFactory('thead'),
	  time: createDOMFactory('time'),
	  title: createDOMFactory('title'),
	  tr: createDOMFactory('tr'),
	  track: createDOMFactory('track'),
	  u: createDOMFactory('u'),
	  ul: createDOMFactory('ul'),
	  'var': createDOMFactory('var'),
	  video: createDOMFactory('video'),
	  wbr: createDOMFactory('wbr'),

	  // SVG
	  circle: createDOMFactory('circle'),
	  clipPath: createDOMFactory('clipPath'),
	  defs: createDOMFactory('defs'),
	  ellipse: createDOMFactory('ellipse'),
	  g: createDOMFactory('g'),
	  image: createDOMFactory('image'),
	  line: createDOMFactory('line'),
	  linearGradient: createDOMFactory('linearGradient'),
	  mask: createDOMFactory('mask'),
	  path: createDOMFactory('path'),
	  pattern: createDOMFactory('pattern'),
	  polygon: createDOMFactory('polygon'),
	  polyline: createDOMFactory('polyline'),
	  radialGradient: createDOMFactory('radialGradient'),
	  rect: createDOMFactory('rect'),
	  stop: createDOMFactory('stop'),
	  svg: createDOMFactory('svg'),
	  text: createDOMFactory('text'),
	  tspan: createDOMFactory('tspan')
	};

	module.exports = ReactDOMFactories;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElementValidator
	 */

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	'use strict';

	var ReactCurrentOwner = __webpack_require__(126);
	var ReactComponentTreeHook = __webpack_require__(144);
	var ReactElement = __webpack_require__(125);
	var ReactPropTypeLocations = __webpack_require__(138);

	var checkReactTypeSpec = __webpack_require__(145);

	var canDefineProperty = __webpack_require__(129);
	var getIteratorFn = __webpack_require__(131);
	var warning = __webpack_require__(127);

	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = ReactCurrentOwner.current.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  var info = getDeclarationErrorAddendum();

	  if (!info) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      info = ' Check the top-level render call using <' + parentName + '>.';
	    }
	  }
	  return info;
	}

	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;

	  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

	  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
	  if (memoizer[currentComponentErrorInfo]) {
	    return;
	  }
	  memoizer[currentComponentErrorInfo] = true;

	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  var childOwner = '';
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
	  }

	  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
	}

	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    // Entry iterators provide implicit keys.
	    if (iteratorFn) {
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (ReactElement.isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}

	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  if (componentClass.propTypes) {
	    checkReactTypeSpec(componentClass.propTypes, element.props, ReactPropTypeLocations.prop, name, element, null);
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
	  }
	}

	var ReactElementValidator = {

	  createElement: function (type, props, children) {
	    var validType = typeof type === 'string' || typeof type === 'function';
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    if (!validType) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;
	    }

	    var element = ReactElement.createElement.apply(this, arguments);

	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }

	    // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)
	    if (validType) {
	      for (var i = 2; i < arguments.length; i++) {
	        validateChildKeys(arguments[i], type);
	      }
	    }

	    validatePropTypes(element);

	    return element;
	  },

	  createFactory: function (type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
	    // Legacy hook TODO: Warn if this is accessed
	    validatedFactory.type = type;

	    if (process.env.NODE_ENV !== 'production') {
	      if (canDefineProperty) {
	        Object.defineProperty(validatedFactory, 'type', {
	          enumerable: false,
	          get: function () {
	            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
	            Object.defineProperty(this, 'type', {
	              value: type
	            });
	            return type;
	          }
	        });
	      }
	    }

	    return validatedFactory;
	  },

	  cloneElement: function (element, props, children) {
	    var newElement = ReactElement.cloneElement.apply(this, arguments);
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], newElement.type);
	    }
	    validatePropTypes(newElement);
	    return newElement;
	  }

	};

	module.exports = ReactElementValidator;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentTreeHook
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(123);

	var ReactCurrentOwner = __webpack_require__(126);

	var invariant = __webpack_require__(124);
	var warning = __webpack_require__(127);

	function isNative(fn) {
	  // Based on isNative() from Lodash
	  var funcToString = Function.prototype.toString;
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  var reIsNative = RegExp('^' + funcToString
	  // Take an example native function source for comparison
	  .call(hasOwnProperty)
	  // Strip regex characters so we can use it for regex
	  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  // Remove hasOwnProperty from the template to make it generic
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	  try {
	    var source = funcToString.call(fn);
	    return reIsNative.test(source);
	  } catch (err) {
	    return false;
	  }
	}

	var canUseCollections =
	// Array.from
	typeof Array.from === 'function' &&
	// Map
	typeof Map === 'function' && isNative(Map) &&
	// Map.prototype.keys
	Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
	// Set
	typeof Set === 'function' && isNative(Set) &&
	// Set.prototype.keys
	Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

	var itemMap;
	var rootIDSet;

	var itemByKey;
	var rootByKey;

	if (canUseCollections) {
	  itemMap = new Map();
	  rootIDSet = new Set();
	} else {
	  itemByKey = {};
	  rootByKey = {};
	}

	var unmountedIDs = [];

	// Use non-numeric keys to prevent V8 performance issues:
	// https://github.com/facebook/react/pull/7232
	function getKeyFromID(id) {
	  return '.' + id;
	}
	function getIDFromKey(key) {
	  return parseInt(key.substr(1), 10);
	}

	function get(id) {
	  if (canUseCollections) {
	    return itemMap.get(id);
	  } else {
	    var key = getKeyFromID(id);
	    return itemByKey[key];
	  }
	}

	function remove(id) {
	  if (canUseCollections) {
	    itemMap['delete'](id);
	  } else {
	    var key = getKeyFromID(id);
	    delete itemByKey[key];
	  }
	}

	function create(id, element, parentID) {
	  var item = {
	    element: element,
	    parentID: parentID,
	    text: null,
	    childIDs: [],
	    isMounted: false,
	    updateCount: 0
	  };

	  if (canUseCollections) {
	    itemMap.set(id, item);
	  } else {
	    var key = getKeyFromID(id);
	    itemByKey[key] = item;
	  }
	}

	function addRoot(id) {
	  if (canUseCollections) {
	    rootIDSet.add(id);
	  } else {
	    var key = getKeyFromID(id);
	    rootByKey[key] = true;
	  }
	}

	function removeRoot(id) {
	  if (canUseCollections) {
	    rootIDSet['delete'](id);
	  } else {
	    var key = getKeyFromID(id);
	    delete rootByKey[key];
	  }
	}

	function getRegisteredIDs() {
	  if (canUseCollections) {
	    return Array.from(itemMap.keys());
	  } else {
	    return Object.keys(itemByKey).map(getIDFromKey);
	  }
	}

	function getRootIDs() {
	  if (canUseCollections) {
	    return Array.from(rootIDSet.keys());
	  } else {
	    return Object.keys(rootByKey).map(getIDFromKey);
	  }
	}

	function purgeDeep(id) {
	  var item = get(id);
	  if (item) {
	    var childIDs = item.childIDs;

	    remove(id);
	    childIDs.forEach(purgeDeep);
	  }
	}

	function describeComponentFrame(name, source, ownerName) {
	  return '\n    in ' + name + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
	}

	function getDisplayName(element) {
	  if (element == null) {
	    return '#empty';
	  } else if (typeof element === 'string' || typeof element === 'number') {
	    return '#text';
	  } else if (typeof element.type === 'string') {
	    return element.type;
	  } else {
	    return element.type.displayName || element.type.name || 'Unknown';
	  }
	}

	function describeID(id) {
	  var name = ReactComponentTreeHook.getDisplayName(id);
	  var element = ReactComponentTreeHook.getElement(id);
	  var ownerID = ReactComponentTreeHook.getOwnerID(id);
	  var ownerName;
	  if (ownerID) {
	    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
	  }
	  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
	  return describeComponentFrame(name, element && element._source, ownerName);
	}

	var ReactComponentTreeHook = {
	  onSetChildren: function (id, nextChildIDs) {
	    var item = get(id);
	    item.childIDs = nextChildIDs;

	    for (var i = 0; i < nextChildIDs.length; i++) {
	      var nextChildID = nextChildIDs[i];
	      var nextChild = get(nextChildID);
	      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
	      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
	      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
	      if (nextChild.parentID == null) {
	        nextChild.parentID = id;
	        // TODO: This shouldn't be necessary but mounting a new root during in
	        // componentWillMount currently causes not-yet-mounted components to
	        // be purged from our tree data so their parent ID is missing.
	      }
	      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
	    }
	  },
	  onBeforeMountComponent: function (id, element, parentID) {
	    create(id, element, parentID);
	  },
	  onBeforeUpdateComponent: function (id, element) {
	    var item = get(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.element = element;
	  },
	  onMountComponent: function (id) {
	    var item = get(id);
	    item.isMounted = true;
	    var isRoot = item.parentID === 0;
	    if (isRoot) {
	      addRoot(id);
	    }
	  },
	  onUpdateComponent: function (id) {
	    var item = get(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.updateCount++;
	  },
	  onUnmountComponent: function (id) {
	    var item = get(id);
	    if (item) {
	      // We need to check if it exists.
	      // `item` might not exist if it is inside an error boundary, and a sibling
	      // error boundary child threw while mounting. Then this instance never
	      // got a chance to mount, but it still gets an unmounting event during
	      // the error boundary cleanup.
	      item.isMounted = false;
	      var isRoot = item.parentID === 0;
	      if (isRoot) {
	        removeRoot(id);
	      }
	    }
	    unmountedIDs.push(id);
	  },
	  purgeUnmountedComponents: function () {
	    if (ReactComponentTreeHook._preventPurging) {
	      // Should only be used for testing.
	      return;
	    }

	    for (var i = 0; i < unmountedIDs.length; i++) {
	      var id = unmountedIDs[i];
	      purgeDeep(id);
	    }
	    unmountedIDs.length = 0;
	  },
	  isMounted: function (id) {
	    var item = get(id);
	    return item ? item.isMounted : false;
	  },
	  getCurrentStackAddendum: function (topElement) {
	    var info = '';
	    if (topElement) {
	      var type = topElement.type;
	      var name = typeof type === 'function' ? type.displayName || type.name : type;
	      var owner = topElement._owner;
	      info += describeComponentFrame(name || 'Unknown', topElement._source, owner && owner.getName());
	    }

	    var currentOwner = ReactCurrentOwner.current;
	    var id = currentOwner && currentOwner._debugID;

	    info += ReactComponentTreeHook.getStackAddendumByID(id);
	    return info;
	  },
	  getStackAddendumByID: function (id) {
	    var info = '';
	    while (id) {
	      info += describeID(id);
	      id = ReactComponentTreeHook.getParentID(id);
	    }
	    return info;
	  },
	  getChildIDs: function (id) {
	    var item = get(id);
	    return item ? item.childIDs : [];
	  },
	  getDisplayName: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element) {
	      return null;
	    }
	    return getDisplayName(element);
	  },
	  getElement: function (id) {
	    var item = get(id);
	    return item ? item.element : null;
	  },
	  getOwnerID: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element || !element._owner) {
	      return null;
	    }
	    return element._owner._debugID;
	  },
	  getParentID: function (id) {
	    var item = get(id);
	    return item ? item.parentID : null;
	  },
	  getSource: function (id) {
	    var item = get(id);
	    var element = item ? item.element : null;
	    var source = element != null ? element._source : null;
	    return source;
	  },
	  getText: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (typeof element === 'string') {
	      return element;
	    } else if (typeof element === 'number') {
	      return '' + element;
	    } else {
	      return null;
	    }
	  },
	  getUpdateCount: function (id) {
	    var item = get(id);
	    return item ? item.updateCount : 0;
	  },


	  getRegisteredIDs: getRegisteredIDs,

	  getRootIDs: getRootIDs
	};

	module.exports = ReactComponentTreeHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule checkReactTypeSpec
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(123);

	var ReactPropTypeLocationNames = __webpack_require__(140);
	var ReactPropTypesSecret = __webpack_require__(146);

	var invariant = __webpack_require__(124);
	var warning = __webpack_require__(127);

	var ReactComponentTreeHook;

	if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
	  // Temporary hack.
	  // Inline requires don't work well with Jest:
	  // https://github.com/facebook/react/issues/7240
	  // Remove the inline requires when we don't need them anymore:
	  // https://github.com/facebook/react/pull/7178
	  ReactComponentTreeHook = __webpack_require__(144);
	}

	var loggedTypeFailures = {};

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?object} element The React element that is being type-checked
	 * @param {?number} debugID The React component instance that is being type-checked
	 * @private
	 */
	function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
	  for (var typeSpecName in typeSpecs) {
	    if (typeSpecs.hasOwnProperty(typeSpecName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
	        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	      } catch (ex) {
	        error = ex;
	      }
	      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;

	        var componentStackInfo = '';

	        if (process.env.NODE_ENV !== 'production') {
	          if (!ReactComponentTreeHook) {
	            ReactComponentTreeHook = __webpack_require__(144);
	          }
	          if (debugID !== null) {
	            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
	          } else if (element !== null) {
	            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
	          }
	        }

	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
	      }
	    }
	  }
	}

	module.exports = checkReactTypeSpec;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 146 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypesSecret
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypes
	 */

	'use strict';

	var ReactElement = __webpack_require__(125);
	var ReactPropTypeLocationNames = __webpack_require__(140);
	var ReactPropTypesSecret = __webpack_require__(146);

	var emptyFunction = __webpack_require__(128);
	var getIteratorFn = __webpack_require__(131);
	var warning = __webpack_require__(127);

	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = '<<anonymous>>';

	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),
	  symbol: createPrimitiveTypeChecker('symbol'),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  element: createElementTypeChecker(),
	  instanceOf: createInstanceTypeChecker,
	  node: createNodeChecker(),
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	/*eslint-disable no-self-compare*/
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/*eslint-enable no-self-compare*/

	/**
	 * We use an Error-like object for backward compatibility as people may call
	 * PropTypes directly and inspect their output. However we don't use real
	 * Errors anymore. We don't inspect their stack anyway, and creating them
	 * is prohibitively expensive if they are created too often, such as what
	 * happens in oneOfType() for any type before the one that matched.
	 */
	function PropTypeError(message) {
	  this.message = message;
	  this.stack = '';
	}
	// Make `instanceof Error` still work for returned errors.
	PropTypeError.prototype = Error.prototype;

	function createChainableTypeChecker(validate) {
	  if (process.env.NODE_ENV !== 'production') {
	    var manualPropTypeCallCache = {};
	  }
	  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	    componentName = componentName || ANONYMOUS;
	    propFullName = propFullName || propName;
	    if (process.env.NODE_ENV !== 'production') {
	      if (secret !== ReactPropTypesSecret && typeof console !== 'undefined') {
	        var cacheKey = componentName + ':' + propName;
	        if (!manualPropTypeCallCache[cacheKey]) {
	          process.env.NODE_ENV !== 'production' ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in the next major version. You may be ' + 'seeing this warning due to a third-party PropTypes library. ' + 'See https://fb.me/react-warning-dont-call-proptypes for details.', propFullName, componentName) : void 0;
	          manualPropTypeCallCache[cacheKey] = true;
	        }
	      }
	    }
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        return new PropTypeError('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
	      }
	      return null;
	    } else {
	      return validate(props, propName, componentName, location, propFullName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, componentName, location, propFullName, secret) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = ReactPropTypeLocationNames[location];
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);

	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns(null));
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	    }
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createElementTypeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    if (!ReactElement.isValidElement(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      var actualClassName = getClassName(props[propName]);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  if (!Array.isArray(expectedValues)) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	    return emptyFunction.thatReturnsNull;
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (is(propValue, expectedValues[i])) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    var valuesString = JSON.stringify(expectedValues);
	    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	    }
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  if (!Array.isArray(arrayOfTypeCheckers)) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	    return emptyFunction.thatReturnsNull;
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createNodeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!isNode(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function isNode(propValue) {
	  switch (typeof propValue) {
	    case 'number':
	    case 'string':
	    case 'undefined':
	      return true;
	    case 'boolean':
	      return !propValue;
	    case 'object':
	      if (Array.isArray(propValue)) {
	        return propValue.every(isNode);
	      }
	      if (propValue === null || ReactElement.isValidElement(propValue)) {
	        return true;
	      }

	      var iteratorFn = getIteratorFn(propValue);
	      if (iteratorFn) {
	        var iterator = iteratorFn.call(propValue);
	        var step;
	        if (iteratorFn !== propValue.entries) {
	          while (!(step = iterator.next()).done) {
	            if (!isNode(step.value)) {
	              return false;
	            }
	          }
	        } else {
	          // Iterator will provide entry [k,v] tuples rather than values.
	          while (!(step = iterator.next()).done) {
	            var entry = step.value;
	            if (entry) {
	              if (!isNode(entry[1])) {
	                return false;
	              }
	            }
	          }
	        }
	      } else {
	        return false;
	      }

	      return true;
	    default:
	      return false;
	  }
	}

	function isSymbol(propType, propValue) {
	  // Native Symbol.
	  if (propType === 'symbol') {
	    return true;
	  }

	  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	  if (propValue['@@toStringTag'] === 'Symbol') {
	    return true;
	  }

	  // Fallback for non-spec compliant Symbols which are polyfilled.
	  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	    return true;
	  }

	  return false;
	}

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  if (isSymbol(propType, propValue)) {
	    return 'symbol';
	  }
	  return propType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}

	// Returns class name of the object, if any.
	function getClassName(propValue) {
	  if (!propValue.constructor || !propValue.constructor.name) {
	    return ANONYMOUS;
	  }
	  return propValue.constructor.name;
	}

	module.exports = ReactPropTypes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 148 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactVersion
	 */

	'use strict';

	module.exports = '15.3.2';

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule onlyChild
	 */
	'use strict';

	var _prodInvariant = __webpack_require__(123);

	var ReactElement = __webpack_require__(125);

	var invariant = __webpack_require__(124);

	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
	  return children;
	}

	module.exports = onlyChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)))

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Wave = undefined;

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(33);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(117);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var yy_wave_num = 2; /**
	                      * Created by yuanyunlong on 2017/1/3.
	                      */

	var yy_wave_width = 360;
	var height = 60;

	var Wave = exports.Wave = function (_Component) {
	    (0, _inherits3.default)(Wave, _Component);

	    function Wave(props) {
	        (0, _classCallCheck3.default)(this, Wave);

	        var _this2 = (0, _possibleConstructorReturn3.default)(this, (Wave.__proto__ || (0, _getPrototypeOf2.default)(Wave)).call(this, props));

	        _this2.state = {

	            yy_start_point: [-180, 60, -180],
	            yy_seeds: [1.0, 0.6, 0.5],
	            yy_wave_phase: [35, 25, 15],
	            yy_wave_color: ['rgba(56,173,255,0.2)', 'rgba(56,173,255,0.4)', 'rgba(56,173,255,1)'],
	            yy_wave_centers: [35, 28, 10],
	            yy_wave_directions: [true, true, true], // true up , false down
	            yy_wave_dangerous_point: [0, 0, -10]

	        };
	        return _this2;
	    }

	    (0, _createClass3.default)(Wave, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var waveID = this.props.waveID || 'wave';
	            var drawing = document.querySelector('#' + waveID);
	            drawing.width = window.screen.width;
	            yy_wave_width = window.screen.width;
	            var context = drawing.getContext('2d');

	            this.setState({
	                drawing: drawing,
	                context: context
	            });

	            var _this = this;

	            setTimeout(function () {
	                _this.yyDrawWave();
	            }, 100);
	            // setInterval(function () {
	            //
	            //     _this.yyDrawWave();
	            //
	            // },  1000/60);
	        }
	    }, {
	        key: 'yyDrawWave',
	        value: function yyDrawWave() {

	            var start_point = this.state.yy_start_point;
	            var seeds = this.state.yy_seeds;
	            var phases = this.state.yy_wave_phase;
	            var colors = this.state.yy_wave_color;
	            var directions = this.state.yy_wave_directions;
	            var dangerous_point = this.state.yy_wave_dangerous_point;
	            var centers = this.state.yy_wave_centers;
	            var drawing = this.state.drawing;
	            var context = this.state.context;
	            context.clearRect(0, 0, drawing.width, drawing.height);

	            for (var index = 0; index < 3; index++) {
	                if (start_point[index] >= dangerous_point[index]) {
	                    start_point[index] = -yy_wave_width;
	                }
	                start_point[index] += seeds[index];
	                this.yyDrawBezierCurveLine(start_point[index], centers[index], phases[index], colors[index], directions[index]);
	            }
	        }
	    }, {
	        key: 'yyDrawBezierCurveLine',
	        value: function yyDrawBezierCurveLine(spx, centerY, hn, color, direction) {

	            var drawing = this.state.drawing;
	            var context = this.state.context;
	            var width = yy_wave_width / yy_wave_num;
	            context.strokeStyle = color;
	            context.fillStyle = color;
	            context.save();
	            context.beginPath();
	            context.moveTo(spx, centerY);

	            var controlP1 = 0;
	            var endP1 = 0;
	            for (var i = 0; i < yy_wave_num; i++) {
	                controlP1 = spx + width + yy_wave_width * i;
	                endP1 = spx + yy_wave_width * (i + 1);
	                var centerY1 = centerY - hn;
	                var centerY2 = centerY + hn;
	                context.bezierCurveTo(controlP1, centerY1, controlP1, centerY2, endP1, centerY);
	            }
	            if (direction) {
	                context.lineTo(endP1, 0);
	                context.lineTo(0, 0);
	            } else {
	                context.lineTo(endP1, height);
	                context.lineTo(0, height);
	            }

	            context.closePath();
	            context.stroke();
	            context.fill();
	            context.restore();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var width = yy_wave_width;
	            var waveID = this.props.waveID || 'wave';
	            return _react2.default.createElement(
	                'div',
	                { className: 'wave_animation' },
	                _react2.default.createElement('canvas', { id: waveID, width: width, height: '60' })
	            );
	        }
	    }]);
	    return Wave;
	}(_react.Component);

	;

/***/ },
/* 151 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 时间选择组件
	 * @prop {boolean} show  时间选择组件是否显示(默认为false)
	 * @prop {boolean} hourshow  小时选择条是否显示(默认为true)
	 * @prop {boolean} minuteshow  分钟选择条是否显示(默认为true)
	 * @prop {string} title  时间组件的标题(默认为设置时间)
	 * @prop {string} statusname  状态名 用于显示多少时间后开启/关闭等(默认为关闭)
	 * @prop {number} hourstep  小时的间隔(默认为1)
	 * @prop {number} minutestep 分钟的间隔(默认为1)
	 * @prop {function} cancelClock 点击取消触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {function} submitClock 点击确认触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {number} defaulthour 默认选中的不要设置为取值范围(0-59)外的值
	 * @prop {number} maxhour 可选的最大小时(默认值为23)小时(默认值为0) !!不要设置为取值范围(minhour-maxhour)外的值
	 * @prop {number} defaultminute 默认选中的分钟(默认值为0) !!
	 * @prop {number} minhour 可选的最小小时(默认值为0)
	 * @prop {array} hourarr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * @prop {boolean} ArrayInit 是否更新可选数组
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var TimeSelect = exports.TimeSelect = React.createClass({
	    displayName: 'TimeSelect',

	    getInitialState: function getInitialState() {
	        return {
	            hourtime: 0,
	            minutetime: 0,
	            hourindex: 0,
	            hourarr: [],
	            minuteindex: 0,
	            minutearr: [],
	            showOpacity: 0,
	            timeDisplay: false,
	            resetTimer: null
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        //初始化时间可选值数组
	        this.timearrInit(this.props);
	    },
	    timearrInit: function timearrInit(next) {
	        //设置时间可选值数组
	        var maxhour = parseInt(next.maxhour) || 60;
	        var minhour = parseInt(next.minhour) || 0;
	        var hourstep = parseInt(next.hourstep) || 1;
	        var maxlength = parseInt((maxhour - minhour) / hourstep);
	        var hourarr = [];
	        if (next.hourarray && next.hourarray instanceof Array) {
	            hourarr = next.hourarray;
	            this.setState({
	                hourarr: hourarr,
	                hourtime: minhour
	            });
	        } else {
	            for (var i = 0; i <= maxlength; i++) {
	                var value = minhour + i * hourstep;
	                value = value < 10 ? '0' + value : value;
	                hourarr.push(value);
	            }
	            maxhour = maxhour < 10 ? '0' + maxhour : maxhour;
	            if (hourarr.indexOf(maxhour) == -1) hourarr.push(maxhour);
	            this.setState({
	                hourarr: hourarr,
	                hourtime: minhour
	            });
	        }

	        //设置默认小时
	        if (next.defaulthour !== undefined) {
	            var index = hourarr.indexOf(next.defaulthour);
	            if (index != -1) {
	                this.setState({
	                    hourtime: next.defaulthour,
	                    hourindex: index
	                });
	            }
	        }
	        var maxminute = 45;
	        var minminute = 0;
	        var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
	        var maxlength2 = parseInt((maxminute - minminute) / minutestep);
	        var minutearr = [];
	        for (var j = 0; j <= maxlength2; j++) {
	            var _value = minminute + j * minutestep;
	            _value = _value < 10 ? '0' + _value : _value;
	            minutearr.push(_value);
	        }
	        if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
	        this.setState({
	            minutearr: minutearr,
	            minutetime: minminute
	        });
	        //设置默认分钟
	        if (next.defaultminute) {
	            var mindex = minutearr.indexOf(next.defaultminute);
	            if (mindex != -1) {
	                this.setState({
	                    minutetime: next.defaultminute,
	                    minuteindex: mindex
	                });
	            }
	        }
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(next) {
	        //更新时间可选值数组
	        if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.ArrayInit === true || next.needUpdateArray == true) {
	            this.timearrInit(next);
	        }

	        //设置默认小时
	        if (next.defaulthour !== undefined && this.props.show !== undefined) {
	            if (this.props.show === false && next.show === true) {
	                var hourarr = next.hourarray;
	                var defaultHour = next.defaulthour;
	                var index = hourarr.indexOf(defaultHour);
	                if (index != -1) {
	                    this.setState({
	                        hourtime: next.defaulthour,
	                        hourindex: index
	                    });
	                }
	            }
	        }

	        var showOpacity = this.state.showOpacity;
	        if (next.show != this.props.show) {
	            if (next.show == true) {
	                this.setState({ timeDisplay: true });
	                clearInterval(this.timr);
	                this.timr = setInterval(function () {
	                    showOpacity += 1;
	                    if (showOpacity >= 1) {
	                        clearInterval(this.timr);
	                        this.setState({ showOpacity: showOpacity });
	                    }
	                }.bind(this), 10);
	            } else if (next.show == false) {
	                clearInterval(this.timr);
	                this.timr = setInterval(function () {
	                    showOpacity -= 1;
	                    // console.log('1',showOpacity,parseInt(showOpacity));
	                    if (showOpacity <= 0) {
	                        clearInterval(this.timr);
	                        this.setState({ timeDisplay: false });
	                        this.setState({ showOpacity: showOpacity });
	                    }
	                }.bind(this), 30);
	            }
	        }
	    },
	    startrange: function startrange(e) {
	        //开始滑动时间刻度 记录初始坐标值
	        e.preventDefault();
	        e.stopPropagation();

	        var yvalue = parseInt(e.touches[0].clientY);
	        this.setState({
	            oldy: yvalue
	        });
	    },
	    moverange: function moverange(e) {
	        //滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
	        e.preventDefault();
	        e.stopPropagation();

	        var yvalue = parseInt(e.touches[0].clientY);
	        var oldy = parseInt(this.state.oldy);
	        var value = (yvalue - oldy) / 1.72; //获取滑动距离，px为单位，但是要转换为百分比，所以除以1.72当范围大于20的时候，算作一格，负数一样
	        if (value > 20) value = 20;
	        if (value < -20) value = -20;
	        var type = e.target.getAttribute('data-type');
	        if (type == 'hour') {
	            this.setState({
	                newy: yvalue,
	                hourtop: value
	            });
	        }
	        if (type == 'minute') {
	            this.setState({
	                newy: yvalue,
	                minutetop: value
	            });
	        }
	    },
	    endrange: function endrange(e) {
	        //滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
	        e.stopPropagation();
	        e.preventDefault();
	        var newy = parseInt(this.state.newy); //滑动结束时的y值
	        var oldy = parseInt(this.state.oldy); //滑动开始时的y值
	        var hour = parseInt(this.state.hourtime); //上一次选中的小时值
	        var hourarr = this.state.hourarr; //小时可选值数组
	        var hourindex = parseInt(this.state.hourindex); //上次选中的小时值对应数组中索引
	        var minutearr = this.state.minutearr; //分钟可选值数组
	        var minuteindex = parseInt(this.state.minuteindex); //上次选中的分钟值对应数组索引
	        var minute = parseInt(this.state.minutetime); //上次选中的分钟值
	        var hourstep = parseInt(this.props.hourstep) || 1; //小时的间隔
	        var minutestep = parseInt(this.props.minutestep) || 1; //分钟的间隔
	        var maxhour = parseInt(this.props.maxhour) || 23; //设置的最大小时值
	        var minhour = parseInt(this.props.minhour) || 0; //设置的最小小时值
	        var type = e.target.getAttribute('data-type'); //滑动更改的类型
	        //小时减小
	        if (newy - oldy > 20 && type == 'hour') {
	            var rangestep = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
	            hourindex = hourindex - rangestep;
	            hourindex = hourindex < 0 ? 0 : hourindex;
	            hour = hourarr[hourindex];
	            this.setState({
	                hourtime: hour,
	                hourindex: hourindex,
	                hourtop: 0
	            });
	        };
	        //小时增加
	        if (newy - oldy < -20 && type == 'hour') {
	            var _rangestep = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
	            hourindex = hourindex + _rangestep;
	            hourindex = hourindex >= hourarr.length ? hourarr.length - 1 : hourindex;
	            hour = hourarr[hourindex];
	            this.setState({
	                hourtime: hour,
	                hourindex: hourindex,
	                hourtop: 0
	            });
	        };
	        //分钟减小
	        if (newy - oldy > 20 && type == 'minute') {
	            var _rangestep2 = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
	            minuteindex = minuteindex - _rangestep2;
	            minuteindex = minuteindex < 0 ? 0 : minuteindex;
	            minute = minutearr[minuteindex];
	            this.setState({
	                minutetime: minute,
	                minuteindex: minuteindex,
	                minutetop: 0
	            });
	        };
	        //分钟增加
	        if (newy - oldy < -20 && type == 'minute') {
	            var _rangestep3 = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
	            minuteindex = minuteindex + _rangestep3;
	            minuteindex = minuteindex >= minutearr.length ? minutearr.length - 1 : minuteindex;
	            minute = minutearr[minuteindex];
	            this.setState({
	                minutetime: minute,
	                minuteindex: minuteindex,
	                minutetop: 0
	            });
	        };
	        //重置为未拖动状态
	        this.setState({
	            hourtop: 0,
	            minutetop: 0
	        });
	    },
	    endDefault: function endDefault(e) {
	        //阻止IOS上冒泡触发iscroll事件
	        e.stopPropagation();
	        e.preventDefault();
	    },
	    cancelclock: function cancelclock(e) {
	        //取消选择
	        if (typeof this.props.cancelClock === 'function') {
	            this.props.cancelClock();
	        } else {
	            console.log('error:the cancel callback is not a function');
	        }
	    },
	    submitclock: function submitclock(e) {
	        //确认提交时间
	        if (typeof this.props.submitClock === 'function') {
	            this.props.submitClock(this.state.hourtime, this.state.minutetime);
	            var hourValue = this.state.hourarr[0];
	            var minuteValue = this.state.minutearr[0];
	            var me = this;
	            me.setState({
	                hourtime: hourValue,
	                minutetime: minuteValue,
	                hourindex: 0,
	                minuteindex: 0
	            });
	            /*//不让用户看到重置的过程，呵呵哒
	             this.state.resetTimer && clearTimeout(this.state.resetTimer);
	             this.state.resetTimer = setTimeout(()=>{
	             me.setState({
	             hourindex:0,
	             minuteindex:0
	             });
	             console.log('10000');
	             },2000);*/
	        } else {
	            console.log('error:the submit callback is not a function');
	        }
	    },
	    render: function render() {
	        var show = this.props.show || false;
	        var maxhour = parseInt(this.props.maxhour) || 23;
	        var minhour = parseInt(this.props.minhour) || 0;
	        var hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow) === false ? false : true;
	        var minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow) === false ? false : true;
	        if (!hourshow && !minuteshow) hourshow = true;
	        var hourstep = parseInt(this.props.hourstep) || 1;
	        var minutestep = parseInt(this.props.minutestep) || 1;
	        var selecttitle = this.props.title || '';
	        var statusshow = this.props.statusshow || false;
	        var statusname = this.props.statusname || '关闭';
	        var hour = this.state.hourtime || '0';
	        hour = parseInt(hour) > maxhour ? maxhour : parseInt(hour);
	        hour = hour < minhour ? minhour : hour;
	        var minute = this.state.minutetime || '0';
	        minute = parseInt(minute) > 59 ? 59 : parseInt(minute);
	        minute = minute < 0 ? 0 : minute;
	        var hourtop = this.state.hourtop || 0;
	        var minutetop = this.state.minutetop || 0;
	        var hourarr = this.state.hourarr;
	        var hourindex = parseInt(this.state.hourindex);
	        var minutearr = this.state.minutearr;
	        var minuteindex = parseInt(this.state.minuteindex);
	        var hourunit = this.props.hourunit || '';
	        var minuteunit = this.props.minuteunit || '';
	        minuteindex = hourindex == 14 ? 0 : minuteindex;

	        var hourseAppendStyle = { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? 'block' : 'none' };
	        if (!statusshow && !minuteshow) {
	            hourseAppendStyle = { top: minutetop + '%', display: hourshow ? 'block' : 'none', left: hourshow ? 20 + '%' : 45 + '%',
	                width: '60%' };
	        }
	        //visibility:this.state.timeDisplay?"initial":"hidden" visibility这个属性在华为某些机型下居然hidden不掉...，呵呵哒
	        return React.createElement(
	            'section',
	            { ref: 'selecter', style: { display: this.state.timeDisplay ? 'block' : 'none', opacity: this.state.showOpacity }, className: 'timeSelect' },
	            React.createElement('section', { onTouchEnd: this.cancelclock }),
	            React.createElement(
	                'section',
	                { className: 'timeselect', onTouchMove: this.endDefault },
	                React.createElement(
	                    'section',
	                    { className: 'selectbtn flex' },
	                    React.createElement(
	                        'span',
	                        { className: 'flex-cell', onTouchEnd: this.cancelclock },
	                        '\u53D6\u6D88'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'flex-cell', onTouchEnd: this.submitclock },
	                        '\u786E\u5B9A'
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'selecttitle' },
	                    React.createElement(
	                        'span',
	                        { className: 'title' },
	                        selecttitle
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'time' },
	                    React.createElement('section', { 'data-type': 'hour', style: { width: minuteshow ? '50%' : '100%', display: hourshow ? 'inline-block' : 'none' },
	                        onTouchStart: this.startrange, onTouchMove: this.moverange,
	                        onTouchEnd: this.endrange, className: 'hour' }),
	                    React.createElement('section', { 'data-type': 'minute', style: { display: minuteshow ? 'inline-block' : 'none', width: hourshow ? '50%' : '100%', left: hourshow ? '50%' : '0%' },
	                        onTouchStart: this.startrange, onTouchMove: this.moverange,
	                        onTouchEnd: this.endrange, className: 'minute' }),
	                    React.createElement(
	                        'section',
	                        { className: 'timetext' },
	                        React.createElement(
	                            'span',
	                            { style: { left: 4 + '%' }, className: statusshow ? 'status show' : 'status' },
	                            ''
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'hour', style: { left: minuteshow ? 33 + '%' : 56 + '%', display: hourshow ? 'inline-block' : 'none' } },
	                            hourunit
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
	                            minuteunit
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: statusshow ? 'status show' : 'status' },
	                            '' || statusname
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'hourvalue flex-column', style: hourseAppendStyle },
	                        React.createElement(
	                            'span',
	                            { className: hourindex - 3 < 0 ? 'line4' : 'line1' },
	                            hourindex - 3 < 0 ? '' : hourarr[hourindex - 3]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: hourindex - 2 < 0 ? 'line4' : 'line1' },
	                            hourindex - 2 < 0 ? '' : hourarr[hourindex - 2]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: hourindex - 1 < 0 ? 'line4' : 'line2' },
	                            hourindex - 1 < 0 ? '' : hourarr[hourindex - 1]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'line3' },
	                            hourarr[hourindex]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: hourindex + 1 >= hourarr.length ? 'line4' : 'line2' },
	                            hourindex + 1 >= hourarr.length ? '' : hourarr[hourindex + 1]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: hourindex + 2 >= hourarr.length ? 'line4' : 'line1' },
	                            hourindex + 2 >= hourarr.length ? '' : hourarr[hourindex + 2]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: hourindex + 3 >= hourarr.length ? 'line4' : 'line1' },
	                            hourindex + 3 >= hourarr.length ? '' : hourarr[hourindex + 3]
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? 'block' : 'none', left: hourshow ? 58 + '%' : 45 + '%' } },
	                        React.createElement(
	                            'span',
	                            { className: minuteindex - 3 < 0 ? 'line4' : 'line1' },
	                            minuteindex - 3 < 0 ? '' : minutearr[minuteindex - 3]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: minuteindex - 2 < 0 ? 'line4' : 'line1' },
	                            minuteindex - 2 < 0 ? '' : minutearr[minuteindex - 2]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: minuteindex - 1 < 0 ? 'line4' : 'line2' },
	                            minuteindex - 1 < 0 ? '' : minutearr[minuteindex - 1]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'line3' },
	                            minutearr[minuteindex]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: minuteindex + 1 >= minutearr.length ? 'line4' : 'line2' },
	                            minuteindex + 1 >= minutearr.length ? '' : minutearr[minuteindex + 1]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: minuteindex + 2 >= minutearr.length ? 'line4' : 'line1' },
	                            minuteindex + 2 >= minutearr.length ? '' : minutearr[minuteindex + 2]
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: minuteindex + 3 >= minutearr.length ? 'line4' : 'line1' },
	                            minuteindex + 3 >= minutearr.length ? '' : minutearr[minuteindex + 3]
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AirStatePage = undefined;

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(33);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _BaseComponentClass = __webpack_require__(88);

	var _TimeSelect = __webpack_require__(151);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isIOS = true;
	var halfHeight = 300;

	var todayTimeStr = "";

	var AirStatePage = exports.AirStatePage = function (_BaseComponent) {
	    (0, _inherits3.default)(AirStatePage, _BaseComponent);

	    function AirStatePage(props) {
	        (0, _classCallCheck3.default)(this, AirStatePage);

	        //导航栏:{ios:73,android:64}
	        var _this = (0, _possibleConstructorReturn3.default)(this, (AirStatePage.__proto__ || (0, _getPrototypeOf2.default)(AirStatePage)).call(this, props));

	        isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	        halfHeight = window.screen.height * 0.65 * 0.65;
	        _this.state = {
	            selectshow: true
	        };

	        var now = new Date();
	        todayTimeStr = now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日";
	        return _this;
	    }

	    (0, _createClass3.default)(AirStatePage, [{
	        key: 'hiddenAction',
	        value: function hiddenAction() {
	            if (typeof this.props.hiddenAction === 'function') {
	                this.props.hiddenAction();
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            console.log("drawChart componentDidMount");
	            this.drawChart();
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(next) {
	            // console.log("drawChart componentWillReceiveProps");
	            // console.log("next:" + JSON.stringify(next.historyData));
	            // console.log("props:" + JSON.stringify(this.props.historyData));
	            if (next.historyData !== this.props.historyData) {
	                console.log("drawChart componentWillReceiveProps");
	                this.drawChart(next.historyData);
	            }
	        }
	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {

	            this.setState({
	                selectshow: false
	            });
	        }
	    }, {
	        key: 'selectOneDay',
	        value: function selectOneDay() {
	            console.log(",,,,111");
	            if (typeof this.props.selectOneDay === 'function') {
	                this.props.selectOneDay();
	            }
	        }
	    }, {
	        key: 'drawChart',
	        value: function drawChart(datasource) {
	            var node = ReactDOM.findDOMNode(this.refs.main);
	            var myChart = echarts.init(node);

	            var dataArray = [];
	            if (datasource) {
	                dataArray = datasource;
	            } else if (this.props.historyData) {
	                dataArray = this.props.historyData;
	            }
	            //  let dataArray =  [0, 0, 0, 0, 0, 100, 0, 100, 0, 100, 0, ];
	            if (dataArray && dataArray.length < 1) {
	                //console.log("dataArray 为空");
	                dataArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	            } else {
	                //console.log("dataArray:" + dataArray);
	            }
	            var maxData = dataArray[0];
	            dataArray.map(function (value, index) {
	                if (maxData < value) {
	                    maxData = value;
	                }
	            });

	            var option = {

	                // title: {
	                //     show:true,
	                //     text:'室内空气PM2.5走势图',
	                //     textStyle:{
	                //         color:'#FFF',
	                //         fontsize:10,
	                //     }
	                // },
	                animtion: false,
	                tooltip: {
	                    trigger: 'axis',
	                    padding: 5,
	                    confine: 'true',
	                    formatter: function formatter(params, ticket, callback) {
	                        var slectData = params[0];
	                        return slectData.name.toString() + " " + slectData.data.toString() + 'ug/m³';
	                    },
	                    backgroundColor: 'rgba(255,255,255,1)',
	                    textStyle: {
	                        color: 'rgba(56,173,255,1)',
	                        fontSize: 11
	                    },
	                    axisPointer: {
	                        animation: false,
	                        lineStyle: {
	                            color: 'rgba(255,255,255,1)'
	                        }
	                    },
	                    transitionDuration: 0,
	                    triggerOn: 'click'

	                },

	                grid: {
	                    left: '1%',
	                    right: '1%',
	                    bottom: '6%',
	                    top: '6%',
	                    containLabel: true,
	                    show: true,
	                    borderWidth: 0
	                },
	                xAxis: {
	                    type: 'category',
	                    boundaryGap: true,
	                    axisTick: {
	                        show: false
	                    },
	                    axisLabel: {
	                        textStyle: {
	                            color: 'rgba(255,255,255,1)'
	                        }
	                    },
	                    axisLine: {
	                        show: false
	                    },
	                    data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
	                },
	                yAxis: {
	                    type: 'value',
	                    axisLine: {
	                        show: false
	                    },
	                    axisTick: {
	                        show: false
	                    },
	                    axisLabel: {
	                        formatter: '{value}',
	                        textStyle: {
	                            color: "#FFF"
	                        }
	                    },
	                    splitLine: {
	                        lineStyle: {
	                            color: 'rgba(255,255,255,0.3)'
	                        }
	                    }
	                },
	                series: [{
	                    name: '',
	                    type: 'line',
	                    smooth: true,
	                    itemStyle: {
	                        normal: {
	                            color: '#FFF'
	                        }
	                    },
	                    markLine: {
	                        animation: false,
	                        label: {
	                            normal: {
	                                formatter: {
	                                    color: '#FFF'
	                                }
	                            }
	                        }
	                    },
	                    markPoint: {
	                        animation: false
	                    },
	                    effect: { color: '#0ff' },
	                    // data: [10, 12, 10, 13, 15, 12, 14, 15, 10, 16, 16, 12, 10, 12, 10, 15, 10, 10, 12, 10, 10, 10, 10, 15]
	                    data: dataArray,
	                    lineStyle: { // 折线的颜色
	                        normal: {
	                            color: 'rgba(255,255,255,1)'
	                        }
	                    },
	                    hoverAnimation: false

	                }]
	            };
	            // 使用刚指定的配置项和数据显示图表。
	            myChart.setOption(option);
	        }

	        // style={{width: '90%', height: '50%', paddingLeft:'5%'}}

	    }, {
	        key: 'render',
	        value: function render() {

	            var show = this.props.show || false;
	            var timeToSelect = this.props.selectOneDayOnMonth || todayTimeStr;

	            //  console.log("airStatePage render");

	            return React.createElement(
	                'div',
	                { className: "airStatePage " + (show ? "slide-up" : "slide-down") },
	                React.createElement(
	                    'div',
	                    { style: { paddingTop: isIOS ? "72px" : "81px" } },
	                    React.createElement(
	                        'div',
	                        { className: 'airPage_downButton', onTouchStart: this.hiddenAction.bind(this) },
	                        React.createElement('img', { src: '../static/image/appmain/arrow_down.png' })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'chartTitle' },
	                        React.createElement(
	                            'div',
	                            { className: ' chartAirTitle', onTouchStart: this.selectOneDay.bind(this) },
	                            '\u5BA4\u5185\u7A7A\u6C14PM2.5\u8D70\u52BF\u56FE'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: ' timeSelectBtn', onTouchStart: this.selectOneDay.bind(this) },
	                            React.createElement('img', { src: '../static/image/appmain/timeSelectMonth.png' }),
	                            React.createElement(
	                                'span',
	                                null,
	                                timeToSelect
	                            ),
	                            React.createElement('img', { src: '../static/image/appmain/timeSelectMonthDown.png' })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'echart_main' },
	                        React.createElement('div', { ref: 'main', className: 'flex ', style: { width: '90%', height: halfHeight, paddingLeft: '5%', paddingTop: '-5%' } })
	                    )
	                )
	            );
	        }
	    }]);
	    return AirStatePage;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DirtView = undefined;

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(33);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(117);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var wave_width = 500;
	var wave_angle = 10;
	var wave_height = 15; // 浪的峰值

	var ismoveout = false;

	var draPoint = [];
	var drawTimer = void 0;

	var DirtView = exports.DirtView = function (_Component) {
	    (0, _inherits3.default)(DirtView, _Component);

	    function DirtView(props) {
	        (0, _classCallCheck3.default)(this, DirtView);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (DirtView.__proto__ || (0, _getPrototypeOf2.default)(DirtView)).call(this, props));

	        _this.status = {
	            flag: 0,
	            step: 0,
	            midleColor: "rgba(247, 228, 123,",
	            goodColor: "rgba(255, 255, 255,",
	            badColor: "rgba(255, 134, 134,"
	        };
	        console.log("child constructor");

	        wave_width = window.screen.width;
	        return _this;
	    }

	    (0, _createClass3.default)(DirtView, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.drawDirt(this.props.airStatus);
	        }
	    }, {
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(next) {
	            console.log("receive next " + next.airStatus);
	            if (next.airStatus != this.props.airStatus) {
	                console.log("redraw receive next " + next.airStatus);
	                this.drawDirt(next.airStatus);
	            }
	        }
	    }, {
	        key: "drawDirt",
	        value: function drawDirt(airStatus) {

	            var canvas = document.getElementById('air_canvas');
	            var context = canvas.getContext('2d');
	            var width = canvas.width;
	            var height = canvas.height;
	            var initNumPoint = 30;
	            var originX = width / 2;
	            var originY = height / 2;

	            if (drawTimer) {
	                clearInterval(drawTimer);
	            }

	            function clear() {
	                // context.strokeStyle = "rgba(255, 255, 255, 0)";
	                // context.fillStyle = "rgba(255, 255, 255, 0)";
	                // context.fillRect(0, 0, canvas.width, canvas.height);
	                context.clearRect(0, 0, width * 1.2, height * 1.2);
	            }
	            clear();

	            var airStatus = airStatus || "good";
	            console.log("receive next " + airStatus);

	            function getRandomPoints(num) {
	                for (var i = num; i >= 0; i--) {
	                    var point = getRandomPoint();
	                    draPoint.push(point);
	                };
	                return draPoint;
	            }

	            function getRandomPoint() {
	                var x = Math.floor(Math.random() * width);
	                var y = Math.floor(Math.random() * height);

	                var point = {
	                    x: x - originX,
	                    y: y - originY,
	                    count: 0
	                };
	                return point;
	            }

	            function getRandomOneMorePoint() {
	                var x = Math.floor(Math.random() * width);
	                var y = Math.floor(Math.random() * height);

	                var point = {
	                    x: x - originX,
	                    y: y - originY,
	                    count: 0
	                };
	                return point;
	            }

	            function getRandomHalfPoint() {
	                var x = Math.floor(Math.random() * width * 0.5);
	                var y = Math.floor(Math.random() * height * 0.5);

	                var point = {
	                    x: x - originX * 0.5,
	                    y: y - originY * 0.5,
	                    count: 0
	                };
	                return point;
	            }

	            var points = getRandomPoints(initNumPoint);

	            var speed = 100;
	            var radiusDirt = 4;
	            var colorStr = this.status.goodColor;
	            if (airStatus == "bad") {
	                colorStr = this.status.badColor;
	                ismoveout = false;
	                speed = 1000 / 60;
	            } else if (airStatus == "fine") {
	                colorStr = this.status.midleColor;
	                ismoveout = false;
	                speed = 1000 / 60;
	                radiusDirt = 3;
	            } else {
	                colorStr = this.status.goodColor;
	                ismoveout = true;
	                speed = 1000 / 60;
	            }

	            function drawPoints(pointsToDraw, color, radiusMode) {
	                clear();

	                var arrayLength = pointsToDraw.length;
	                for (var i = 0; i < arrayLength; i++) {

	                    var alpha = i % 10 * 0.1;
	                    var radius = Math.floor(i % radiusMode);

	                    radius = radius > 1 ? radius : 1;
	                    context.beginPath();
	                    //context.fillStyle = color+ alpha + ")";
	                    //context.strokeStyle = color+ alpha + ")";

	                    var randomx = pointsToDraw[i].x;
	                    var randomy = pointsToDraw[i].y;
	                    var countPoint = pointsToDraw[i].count;
	                    if (ismoveout) {
	                        countPoint--;
	                    } else {
	                        countPoint++;
	                    }

	                    var pointMoveCount = countPoint;
	                    pointsToDraw[i].count = countPoint;
	                    var arc = Math.atan(randomx / randomy);

	                    var xpoint = 0;
	                    var ypoint = 0;

	                    var movePx = 2;
	                    if (randomx > 0 && randomy > 0) {
	                        xpoint = pointsToDraw[i].x - movePx * pointMoveCount * Math.sin(arc) + originX;
	                        ypoint = pointsToDraw[i].y - movePx * pointMoveCount * Math.cos(arc) + originY;
	                    } else if (randomx > 0 && randomy < 0) {
	                        xpoint = pointsToDraw[i].x + movePx * pointMoveCount * Math.sin(arc) + originX;
	                        ypoint = pointsToDraw[i].y + movePx * pointMoveCount * Math.cos(arc) + originY;
	                    } else if (randomx < 0 && randomy > 0) {
	                        xpoint = pointsToDraw[i].x - movePx * pointMoveCount * Math.sin(arc) + originX;
	                        ypoint = pointsToDraw[i].y - movePx * pointMoveCount * Math.cos(arc) + originY;
	                    } else if (randomx < 0 && randomy < 0) {
	                        xpoint = pointsToDraw[i].x + movePx * pointMoveCount * Math.sin(arc) + originX;
	                        ypoint = pointsToDraw[i].y + movePx * pointMoveCount * Math.cos(arc) + originY;
	                    }

	                    context.arc(xpoint, ypoint, radius, 0, Math.PI * 2, true);
	                    context.fillStyle = color + alpha + ")";
	                    context.fill();
	                    context.closePath();

	                    if (ismoveout) {
	                        if (Math.abs(xpoint) > width * 1.1 || Math.abs(ypoint) > height * 1.1 || Math.abs(xpoint) < 0.1 || Math.abs(ypoint) < 0.1) {
	                            var newpoint = getRandomHalfPoint();
	                            draPoint.splice(i, 1, newpoint);
	                            //console.log(" new x: " + newpoint.x + " y:" + newpoint.y + " old x:" + xpoint + " y:" + ypoint);
	                        }
	                    } else {
	                        if (Math.abs(xpoint - originX) < 50 && Math.abs(ypoint - originY) < 50) {
	                            var _newpoint = getRandomOneMorePoint();
	                            draPoint.splice(i, 1, _newpoint);
	                            // console.log(" new x: " + newpoint.x + " y:" + newpoint.y + " old x:" + xpoint + " y:" + ypoint);
	                        }
	                    }
	                }
	                //draPoint = drawPointArray;
	            }

	            drawTimer = setInterval(function () {
	                drawPoints(points, colorStr, radiusDirt);
	            }, speed);
	        }
	    }, {
	        key: "render",
	        value: function render() {

	            return _react2.default.createElement("canvas", { className: "dirt_image", id: "air_canvas", width: wave_width, height: wave_width });
	        }
	    }]);
	    return DirtView;
	}(_react.Component);

	;

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.WeatherForecast = undefined;

	var _stringify = __webpack_require__(92);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(33);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _Store = __webpack_require__(91);

	var _RequestAction = __webpack_require__(95);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by yuanyunlong on 2017/4/17.
	 */
	var canvaswidth = "1280";
	var canvasheight = "300";
	var seventHeighLowTempArray = [];
	var sevenHieghtLowTempAndTimeArray = [];

	var weather7dayData = { "code": 0, "data": [{ "cityId": 101280601, "cityName": "深圳", "aqi": null, "temp": null, "temp1": 28, "temp2": 19, "wtext": "雷阵雨", "bgIcon": "", "weatherBigIcon": "http://200.200.200.50:8080/static/weatherIcon/1080/day/04.png", "weatherSmallIcon": "http://200.200.200.50:8080/static/weatherIcon/P6/day/04.png", "weatherV2Icon": null, "humidity": null, "windScale": "28.44", "windSpeed": "28.44", "windDirection": "南风", "pressure": null, "pm25": null, "updateTime": 1492704000000 }, { "cityId": 101280601, "cityName": "深圳", "aqi": null, "temp": null, "temp1": 21, "temp2": 19, "wtext": "小雨", "bgIcon": "", "weatherBigIcon": "http://200.200.200.50:8080/static/weatherIcon/1080/day/07.png", "weatherSmallIcon": "http://200.200.200.50:8080/static/weatherIcon/P6/day/07.png", "weatherV2Icon": null, "humidity": null, "windScale": "28.44", "windSpeed": "28.44", "windDirection": "东北风", "pressure": null, "pm25": null, "updateTime": 1492790400000 }, { "cityId": 101280601, "cityName": "深圳", "aqi": null, "temp": null, "temp1": 24, "temp2": 19, "wtext": "小雨", "bgIcon": "", "weatherBigIcon": "http://200.200.200.50:8080/static/weatherIcon/1080/day/07.png", "weatherSmallIcon": "http://200.200.200.50:8080/static/weatherIcon/P6/day/07.png", "weatherV2Icon": null, "humidity": null, "windScale": "19.44", "windSpeed": "19.44", "windDirection": "无持续风向", "pressure": null, "pm25": null, "updateTime": 1492876800000 }, { "cityId": 101280601, "cityName": "深圳", "aqi": null, "temp": null, "temp1": 27, "temp2": 23, "wtext": "小雨", "bgIcon": "", "weatherBigIcon": "http://200.200.200.50:8080/static/weatherIcon/1080/day/07.png", "weatherSmallIcon": "http://200.200.200.50:8080/static/weatherIcon/P6/day/07.png", "weatherV2Icon": null, "humidity": null, "windScale": "19.44", "windSpeed": "19.44", "windDirection": "无持续风向", "pressure": null, "pm25": null, "updateTime": 1492963200000 }, { "cityId": 101280601, "cityName": "深圳", "aqi": null, "temp": null, "temp1": 28, "temp2": 22, "wtext": "阵雨", "bgIcon": "", "weatherBigIcon": "http://200.200.200.50:8080/static/weatherIcon/1080/day/03.png", "weatherSmallIcon": "http://200.200.200.50:8080/static/weatherIcon/P6/day/03.png", "weatherV2Icon": null, "humidity": null, "windScale": "19.44", "windSpeed": "19.44", "windDirection": "无持续风向", "pressure": null, "pm25": null, "updateTime": 1493049600000 }, { "cityId": 101280601, "cityName": "深圳", "aqi": null, "temp": null, "temp1": 27, "temp2": 21, "wtext": "雷阵雨", "bgIcon": "", "weatherBigIcon": "http://200.200.200.50:8080/static/weatherIcon/1080/day/04.png", "weatherSmallIcon": "http://200.200.200.50:8080/static/weatherIcon/P6/day/04.png", "weatherV2Icon": null, "humidity": null, "windScale": "28.44", "windSpeed": "28.44", "windDirection": "东北风", "pressure": null, "pm25": null, "updateTime": 1493136000000 }, { "cityId": 101280601, "cityName": "深圳", "aqi": null, "temp": null, "temp1": 23, "temp2": 21, "wtext": "阵雨", "bgIcon": "", "weatherBigIcon": "http://200.200.200.50:8080/static/weatherIcon/1080/day/03.png", "weatherSmallIcon": "http://200.200.200.50:8080/static/weatherIcon/P6/day/03.png", "weatherV2Icon": null, "humidity": null, "windScale": "19.44", "windSpeed": "19.44", "windDirection": "无持续风向", "pressure": null, "pm25": null, "updateTime": 1493222400000 }] };

	var WeatherForecast = exports.WeatherForecast = function (_BaseComponent) {
	    (0, _inherits3.default)(WeatherForecast, _BaseComponent);

	    function WeatherForecast(props) {
	        (0, _classCallCheck3.default)(this, WeatherForecast);

	        //this.listenStore(Store); // 监听Store

	        var _this2 = (0, _possibleConstructorReturn3.default)(this, (WeatherForecast.__proto__ || (0, _getPrototypeOf2.default)(WeatherForecast)).call(this, props));

	        canvaswidth = window.screen.width;
	        canvasheight = window.screen.height;
	        var WeatherData = (0, _RequestAction.getSevenDayWeatherForeCastCacheData)();
	        if (WeatherData) {
	            console.log("constructor 有缓存数据 ");
	            _this2.state = {
	                weatherData: WeatherData
	            };
	        } else {
	            _this2.state = {
	                weatherData: []
	            };
	            console.log("constructor 没有有缓存数据 ");
	            _this2.getWeatherInfo();
	        }

	        return _this2;
	    }

	    (0, _createClass3.default)(WeatherForecast, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var city = (0, _RequestAction.getCity)();
	            var addr = (0, _RequestAction.getAddr)();

	            if (addr) {
	                het.setTitle((0, _stringify2.default)({
	                    setNavTitle: 1,
	                    title: addr,
	                    setNavRightBtnHiden: 1
	                }));
	            } else {
	                het.setTitle((0, _stringify2.default)({
	                    setNavTitle: 1,
	                    title: city,
	                    setNavRightBtnHiden: 1
	                }));
	            }
	        }
	    }, {
	        key: 'getWeatherInfo',
	        value: function getWeatherInfo() {

	            var _this = this;
	            var successCB = function successCB(weatherdata) {
	                console.log("getWeatherInfo success data 11111111:" + weatherdata);

	                _this.getHieghtLowTempFormWeatherData(weatherdata);
	                _this.drawWeatherInfo();

	                _this.setState({
	                    weatherData: weatherdata
	                });
	                //  Actions.setWeatherData(weatherdata);
	            };
	            var errorCB = function errorCB(error) {
	                het.toast("获取天气信息失败");
	            };
	            (0, _RequestAction.getWeatherForeCast)(successCB, errorCB);
	        }
	    }, {
	        key: 'getHieghtLowTempFormWeatherData',
	        value: function getHieghtLowTempFormWeatherData(data) {
	            var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
	            seventHeighLowTempArray = [];
	            sevenHieghtLowTempAndTimeArray = []; // 清空数据

	            var now = new Date();
	            var currentDay = now.getDate();

	            if (data) {
	                data.map(function (value, index, array) {

	                    var oneDayTem = {
	                        height: value["temp1"] || "0",
	                        low: value["temp2"] || "0"
	                    };
	                    seventHeighLowTempArray.push(oneDayTem);

	                    //  if(index != 0){
	                    var newDAY = new Date();
	                    var nextNow = newDAY.setDate(currentDay + index);
	                    var nextDay = new Date(nextNow);
	                    var week = nextDay.getDay();

	                    var forecastDay = {
	                        time: weekArray[week],
	                        image: value["weatherSmallIcon"],
	                        temp1: value["temp1"] || 0,
	                        temp2: value["temp2"] || 0
	                    };
	                    sevenHieghtLowTempAndTimeArray.push(forecastDay);
	                    // }
	                });
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {

	            var pixelRatio = function () {
	                var canvas = document.createElement('canvas'),
	                    context = canvas.getContext('2d'),
	                    backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;

	                return (window.devicePixelRatio || 1) / backingStore;
	            }();

	            console.log("pixelRatio:" + pixelRatio);

	            var drawing = document.querySelector('#sevenForecastChartHight');
	            drawing.width = window.screen.width * pixelRatio;
	            drawing.height = window.screen.height * 0.15 * pixelRatio;
	            var context = drawing.getContext('2d');

	            var drawinglow = document.querySelector('#sevenForecastChartLow');
	            drawinglow.width = window.screen.width * pixelRatio;
	            drawinglow.height = window.screen.height * 0.15 * pixelRatio;
	            var contextlow = drawinglow.getContext('2d');

	            this.setState({
	                drawingHeight: drawing,
	                contextHeight: context,
	                drawingLow: drawinglow,
	                contextLow: contextlow,
	                contentWidth: window.screen.width * pixelRatio,
	                contentHeight: window.screen.height * 0.15 * pixelRatio,
	                pixelRatio: pixelRatio
	            });

	            console.log("componentDidMount");
	            if (this.state.weatherData && this.state.weatherData.length > 0) {
	                this.getHieghtLowTempFormWeatherData(this.state.weatherData);
	                this.drawWeatherInfo();
	            }

	            //  测试
	            // this.setState({
	            //     weatherData:weather7dayData["data"]
	            // });
	            // let weatherData = weather7dayData["data"] ;
	            // this.getHieghtLowTempFormWeatherData(weatherData);
	            // this.drawWeatherInfo();
	        }
	    }, {
	        key: 'drawWeatherInfo',
	        value: function drawWeatherInfo() {
	            var _this = this;
	            setTimeout(function () {
	                _this.drawChart();
	                _this.drawChartLow();
	            }, 100);
	        }
	    }, {
	        key: 'drawLineWithColorAndData',
	        value: function drawLineWithColorAndData(MaxTemp, minTemp, drawYHeight, startPointX, xSpace, context, lineColor, upParmas, isHeight, pixelRatio) {
	            var ybaseValue = MaxTemp - minTemp;
	            var expandValue = ybaseValue;
	            if (expandValue == 0) {
	                expandValue = 1;
	            }
	            ybaseValue = ybaseValue + expandValue * 4;

	            console.log("ybaseValue:" + ybaseValue + " expandValue：" + expandValue);
	            var len = seventHeighLowTempArray.length;
	            for (var index = 0; index < len; index++) {

	                var heightValue = seventHeighLowTempArray[index].height;
	                if (isHeight == false) {
	                    heightValue = seventHeighLowTempArray[index].low;
	                }
	                var heightValueZero = heightValue - minTemp + expandValue * upParmas;
	                var yValue = drawYHeight * (1 - heightValueZero / ybaseValue);
	                var xValue = startPointX + index * xSpace;

	                if (index == 0) {
	                    context.moveTo(startPointX, yValue);
	                } else {
	                    context.lineTo(xValue, yValue);
	                }
	                context.lineWidth = 1 * pixelRatio;
	                context.stroke();

	                context.beginPath();
	                context.arc(xValue, yValue, 3 * pixelRatio, 0, Math.PI * 2, true);
	                context.fillStyle = lineColor;
	                context.strokeStyle = lineColor;
	                context.fill();
	                context.stroke();
	                context.closePath();
	                var fontSize = 12 * pixelRatio;

	                context.font = "bold " + fontSize + "px '字体','Arial'";
	                context.fillStyle = "rgba(255,255,255,1)";
	                context.fillText(heightValue, xValue - 7 * pixelRatio, yValue - 7 * pixelRatio, 20 * pixelRatio);
	                // console.log("height pointX: " + xValue + "pointY:" + yValue + " temp:" + heightValue);
	            }
	            context.stroke();
	        }
	    }, {
	        key: 'drawChart',
	        value: function drawChart() {

	            var context = this.state.contextHeight;
	            var contentWidth = this.state.contentWidth;
	            var contentHeight = this.state.contentHeight;
	            var pixelRatio = this.state.pixelRatio;

	            var startPointX = 20 * pixelRatio;
	            var drawXWidth = contentWidth - startPointX * 2; // 绘图区域的宽度
	            var drawYHeight = contentHeight; // 绘图区域的高度

	            var xSpace = drawXWidth / 6;

	            var MaxTemp = seventHeighLowTempArray[0].height;
	            var minTemp = seventHeighLowTempArray[0].height;
	            var len = seventHeighLowTempArray.length;
	            for (var i = 1; i < len; i++) {
	                var temp = seventHeighLowTempArray[i];
	                if (temp.height > MaxTemp) {
	                    MaxTemp = temp.height;
	                } else if (temp.height < minTemp) {
	                    minTemp = temp.height;
	                }
	            }
	            //console.log("maxTemp:" + MaxTemp + "minTemp:" + minTemp + " height:" + drawYHeight);
	            this.drawLineWithColorAndData(MaxTemp, minTemp, drawYHeight, startPointX, xSpace, context, "rgba(255,255,255,1)", 0.2, true, pixelRatio);
	        }
	    }, {
	        key: 'drawChartLow',
	        value: function drawChartLow() {

	            var context = this.state.contextLow;
	            var contentWidth = this.state.contentWidth;
	            var contentHeight = this.state.contentHeight;
	            var pixelRatio = this.state.pixelRatio;

	            var startPointX = 20 * pixelRatio;
	            var drawXWidth = contentWidth - startPointX * 2; // 绘图区域的宽度
	            var drawYHeight = contentHeight; // 绘图区域的高度

	            var xSpace = drawXWidth / 6;

	            var MaxTemp = seventHeighLowTempArray[0].low;
	            var minTemp = seventHeighLowTempArray[0].low;
	            var len = 7;
	            for (var i = 1; i < len; i++) {
	                var temp = seventHeighLowTempArray[i];
	                if (temp.low > MaxTemp) {
	                    MaxTemp = temp.low;
	                } else if (temp.low < minTemp) {
	                    minTemp = temp.low;
	                }
	            }
	            //console.log("maxTemp:" + MaxTemp + "minTemp:" + minTemp + " height:" + drawYHeight);
	            this.drawLineWithColorAndData(MaxTemp, minTemp, drawYHeight, startPointX, xSpace, context, "rgba(255,255,0,1)", 2, false, pixelRatio);
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            console.log("weatherData render hidden ");
	            var showWeatherInfo = { visibility: "hidden" };
	            var weatherData = this.state.weatherData;

	            console.log("weatherData:" + (0, _stringify2.default)(weatherData));

	            var currentDayWeatherImagePath = "";
	            var currentDayWeatherTemp = "";
	            var currentWtext = "";

	            if (weatherData && weatherData.length > 0) {
	                console.log("weatherData render  visible");
	                showWeatherInfo = { visibility: "visible" };
	                var currentDayInfo = weatherData[0];
	                currentDayWeatherImagePath = currentDayInfo["weatherSmallIcon"];
	                currentWtext = currentDayInfo["wtext"];
	                currentDayWeatherTemp = currentDayInfo["temp1"] + "°";
	            } else {
	                console.log("weatherData render hidden ");
	                showWeatherInfo = { visibility: "hidden" };
	            }

	            var PM25Value = (0, _RequestAction.getPM25)();
	            // let temp = getTemp() + "°";
	            // if(temp.length < 2){
	            //     temp = currentDayWeatherTemp;
	            // }

	            // console.log("pm25value:  " +  PM25Value);
	            // console.log("temp:  " +  temp);

	            return React.createElement(
	                'main',
	                { className: 'main' },
	                React.createElement(
	                    'section',
	                    { className: 'weatherView', style: showWeatherInfo },
	                    React.createElement(
	                        'div',
	                        { className: 'paddingContent' },
	                        ' '
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'todayweather' },
	                        React.createElement(
	                            'div',
	                            { className: 'todayweatherImage' },
	                            React.createElement('img', { src: currentDayWeatherImagePath })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'todayweatherAir' },
	                            React.createElement(
	                                'div',
	                                { className: 'todayweatherTemp' },
	                                currentDayWeatherTemp
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'todayweatherPm' },
	                                currentWtext,
	                                ' PM2.5 ',
	                                PM25Value
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'sevenForecastTitle' },
	                            '7\u5929\u9884\u62A5'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'sevenForecastChartContainer' },
	                        React.createElement('canvas', { id: 'sevenForecastChartHight', className: 'sevenForecastChartHight' }),
	                        React.createElement('canvas', { id: 'sevenForecastChartLow', className: 'sevenForecastChartLow' })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'sevenForecastTemp' },
	                        sevenHieghtLowTempAndTimeArray.map(function (value, index) {
	                            var week = value["time"];
	                            var imagePath = value["image"] || "";
	                            var temp1 = value["temp1"] || "0";
	                            temp1 = temp1 + "°";
	                            var temp2 = value["temp2"];
	                            temp2 = temp2 + "°";

	                            return React.createElement(
	                                'div',
	                                { className: 'flex sevenForecastOneDayTemp', key: index },
	                                React.createElement(
	                                    'div',
	                                    { className: 'week flex-cell' },
	                                    week
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'weekWeatherImage flex-cell' },
	                                    React.createElement('img', { src: imagePath })
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'weekWeatherTemp flex-cell' },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        temp1
	                                    ),
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        temp2
	                                    )
	                                )
	                            );
	                        }.bind(this))
	                    )
	                )
	            );
	        }
	    }]);
	    return WeatherForecast;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EmitterCSSAnimation = undefined;

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(33);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(117);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var wave_width = 500;
	var wave_angle = 10;
	var wave_height = 15; // 浪的峰值

	var ismoveout = false;

	var draPoint = [];
	var drawTimer = void 0;
	// direction   方向         "input"  "output"
	// grainColor  例子颜色     "rgba(255,255,255,1)"

	var EmitterCSSAnimation = exports.EmitterCSSAnimation = function (_Component) {
	    (0, _inherits3.default)(EmitterCSSAnimation, _Component);

	    function EmitterCSSAnimation(props) {
	        (0, _classCallCheck3.default)(this, EmitterCSSAnimation);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (EmitterCSSAnimation.__proto__ || (0, _getPrototypeOf2.default)(EmitterCSSAnimation)).call(this, props));

	        _this.status = {
	            flag: 0,
	            step: 0
	        };

	        wave_width = window.screen.width;
	        wave_height = window.screen.height * 0.65;
	        return _this;
	    }

	    (0, _createClass3.default)(EmitterCSSAnimation, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            // let innerPM25Value = this.props.innerPM25Value || 0;
	            // this.drawDirt(innerPM25Value);

	            this.cssEmitterAnimation(this.props.direction, this.props.grainColor);
	        }
	    }, {
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(next) {
	            console.log("receive next " + next.moveStyle);
	            if (next.direction != this.props.direction || next.grainColor != this.props.grainColor) {
	                this.cssEmitterAnimation(next.direction, next.grainColor);
	            }
	        }
	    }, {
	        key: "cssEmitterAnimation",
	        value: function cssEmitterAnimation(direction, grainColor) {

	            var movedirection = direction || "output";
	            var movePointColor = grainColor || "#fff";
	            var layers = 6;
	            var starsPerLayer = 80;
	            var renderLayers = function renderLayers() {
	                var containerLayer = document.getElementById("EmitterCSSAnimationContainer");
	                containerLayer.innerHTML = "";

	                for (var i = 0; i < layers; i++) {
	                    var newLayer = document.createElement('div');
	                    newLayer.style.width = wave_width;
	                    newLayer.style.height = wave_height;
	                    if (movedirection == "input") {
	                        newLayer.classList.add('layerscale');
	                    } else {
	                        newLayer.classList.add('layerzoom');
	                    }
	                    populateParticles(starsPerLayer, newLayer);
	                    containerLayer.appendChild(newLayer);
	                }
	            };

	            var populateParticles = function populateParticles(amt, container) {
	                for (var i = 0; i < amt; i++) {
	                    var el = document.createElement('div');
	                    el.classList.add('star');
	                    var top = Math.floor(Math.random() * wave_width);
	                    var left = Math.floor(Math.random() * wave_width);
	                    el.style.top = top + 'px';
	                    el.style.left = left + 'px';
	                    el.style.borderRadius = 1 + 'px';
	                    el.style.width = 2 + 'px';
	                    el.style.height = 2 + 'px';
	                    el.style.backgroundColor = movePointColor;
	                    container.appendChild(el);
	                }
	            };

	            renderLayers();
	        }
	    }, {
	        key: "render",
	        value: function render() {

	            var sytle = { width: wave_width, height: wave_height };
	            return _react2.default.createElement("div", { className: "EmitterCSSAnimationContainer", id: "EmitterCSSAnimationContainer", style: sytle })
	            // <canvas className="dirt_image" id="air_canvas" width={wave_width} height={wave_width}>
	            //
	            // </canvas>
	            ;
	        }
	    }]);
	    return EmitterCSSAnimation;
	}(_react.Component);

	;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.YYEmitterCSSAnimation = undefined;

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(33);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(117);

	var _react2 = _interopRequireDefault(_react);

	var _RequestAction = __webpack_require__(95);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var wave_width = 500;
	var wave_angle = 10;
	var wave_height = 15; // 浪的峰值

	var ismoveout = false;
	var pixration = 2;
	var draPoint = [];
	var drawTimer = void 0;
	// direction   方向         "input"  "output"
	// grainColor  例子颜色     "rgba(255,255,255,1)"

	var YYEmitterCSSAnimation = exports.YYEmitterCSSAnimation = function (_Component) {
	    (0, _inherits3.default)(YYEmitterCSSAnimation, _Component);

	    function YYEmitterCSSAnimation(props) {
	        (0, _classCallCheck3.default)(this, YYEmitterCSSAnimation);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (YYEmitterCSSAnimation.__proto__ || (0, _getPrototypeOf2.default)(YYEmitterCSSAnimation)).call(this, props));

	        _this.status = {
	            flag: 0,
	            step: 0
	        };

	        pixration = (0, _RequestAction.getPoxelRation)();
	        wave_width = window.screen.width;
	        wave_height = window.screen.height * 0.65;
	        return _this;
	    }

	    (0, _createClass3.default)(YYEmitterCSSAnimation, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // let innerPM25Value = this.props.innerPM25Value || 0;
	            // this.drawDirt(innerPM25Value);

	            this.cssEmitterAnimation(this.props.direction, this.props.grainColor);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(next) {
	            console.log("receive next " + next.moveStyle);
	            if (next.direction != this.props.direction || next.grainColor != this.props.grainColor) {
	                this.cssEmitterAnimation(next.direction, next.grainColor);
	            }
	        }
	    }, {
	        key: 'cssEmitterAnimation',
	        value: function cssEmitterAnimation(direction, grainColor) {

	            var movedirection = direction || "output";
	            var movePointColor = grainColor || "#fff";
	            var layers = 1;
	            var starsPerLayer = 20;
	            var renderLayers = function renderLayers() {
	                var containerLayer = document.getElementById("EmitterCSSAnimationContainer");
	                containerLayer.innerHTML = "";

	                for (var i = 0; i < layers; i++) {
	                    var newLayer = document.createElement('div');
	                    newLayer.style.width = wave_width + "px";
	                    newLayer.style.height = wave_height + "px";

	                    if (movedirection == "input") {
	                        newLayer.classList.add('layerscale');
	                    } else {
	                        newLayer.classList.add('layerzoom');
	                    }
	                    populateParticles(starsPerLayer, newLayer);
	                    containerLayer.appendChild(newLayer);
	                }
	            };

	            var populateParticles = function populateParticles(amt, container) {
	                draPoint = [];
	                for (var i = 0; i < amt; i++) {
	                    // var el = document.createElement('div');
	                    // el.classList.add('star');
	                    var top = Math.floor(Math.random() * wave_width);
	                    var left = Math.floor(Math.random() * wave_width);

	                    var point = {
	                        x: top,
	                        y: left,
	                        color: "rgba(255,255,0,1)"
	                    };
	                    draPoint.push(point);
	                    // el.style.top = top + 'px';
	                    // el.style.left = left + 'px';
	                    // el.style.backgroundColor =   movePointColor;
	                }

	                var canvas = drawPointInLayer(draPoint, 3);
	                canvas.id = "YYEmitterLayerCanvas";
	                canvas.style.width = wave_width + "px";
	                canvas.style.height = wave_height + "px";
	                container.appendChild(canvas);
	            };

	            var drawPointInLayer = function drawPoints(pointsToDraw, radiusMode) {

	                var canvas = document.createElement('canvas'),
	                    context = canvas.getContext('2d');

	                canvas.width = wave_width;
	                canvas.height = wave_height;
	                canvas.style.position = "absolute";
	                canvas.style.top = "0";
	                canvas.style.left = "0";
	                canvas.style.width = wave_width * pixration + "px";
	                canvas.style.height = wave_height * pixration + "px";

	                var arrayLength = pointsToDraw.length;
	                for (var i = 0; i < arrayLength; i++) {

	                    var alpha = i % 10 * 0.1;
	                    var radius = Math.floor(i % radiusMode);

	                    radius = radius > 1 ? radius : 1;
	                    context.beginPath();
	                    //context.fillStyle = color+ alpha + ")";
	                    //context.strokeStyle = color+ alpha + ")";

	                    var randomx = pointsToDraw[i].x;
	                    var randomy = pointsToDraw[i].y;
	                    var xpoint = randomx;
	                    var ypoint = randomy;
	                    var color = pointsToDraw[i].color;

	                    context.arc(xpoint, ypoint, radius, 0, Math.PI * 2, true);
	                    context.fillStyle = color + alpha + ")";
	                    context.fill();
	                    context.closePath();
	                }
	                //draPoint = drawPointArray;

	                return canvas;
	            };

	            renderLayers();
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var sytle = { width: wave_width, height: wave_height };
	            return _react2.default.createElement('div', { className: 'EmitterCSSAnimationContainer', id: 'EmitterCSSAnimationContainer' })
	            // <canvas className="dirt_image" id="air_canvas" width={wave_width} height={wave_width}>
	            //
	            // </canvas>
	            ;
	        }
	    }]);
	    return YYEmitterCSSAnimation;
	}(_react.Component);

	;

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.YYImageAnimation = undefined;

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(33);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(117);

	var _react2 = _interopRequireDefault(_react);

	var _RequestAction = __webpack_require__(95);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var wave_width = 500;
	var wave_angle = 10;
	var wave_height = 15; // 浪的峰值

	var ismoveout = false;
	var pixration = 2;
	var draPoint = [];
	var drawTimer = void 0;
	// direction   方向         "input"  "output"
	// grainColor  例子颜色     "rgba(255,255,255,1)"

	var YYImageAnimation = exports.YYImageAnimation = function (_Component) {
	    (0, _inherits3.default)(YYImageAnimation, _Component);

	    function YYImageAnimation(props) {
	        (0, _classCallCheck3.default)(this, YYImageAnimation);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (YYImageAnimation.__proto__ || (0, _getPrototypeOf2.default)(YYImageAnimation)).call(this, props));

	        _this.status = {
	            flag: 0,
	            step: 0
	        };

	        pixration = (0, _RequestAction.getPoxelRation)();
	        wave_width = window.screen.width;
	        wave_height = window.screen.width;
	        return _this;
	    }

	    (0, _createClass3.default)(YYImageAnimation, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'render',
	        value: function render() {

	            var sytle = { width: wave_width, height: wave_height };
	            return _react2.default.createElement('div', { className: 'YYImageAnimation', id: 'EmitterCSSAnimationContainer' })
	            // <canvas className="dirt_image" id="air_canvas" width={wave_width} height={wave_width}>
	            //
	            // </canvas>
	            ;
	        }
	    }]);
	    return YYImageAnimation;
	}(_react.Component);

	;

/***/ }
/******/ ]);