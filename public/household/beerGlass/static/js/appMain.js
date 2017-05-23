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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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

	var _Event = __webpack_require__(92);

	var _EventSet = __webpack_require__(94);

	var _GameList = __webpack_require__(95);

	var _GameOn = __webpack_require__(99);

	var _Ranking = __webpack_require__(100);

	var _Rule = __webpack_require__(101);

	var _Punish = __webpack_require__(102);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//惩罚建议

	//排行榜
	//啤酒杯主页
	//活动
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    IndexRedirect = _ReactRouter.IndexRedirect; //规则
	//游戏开始
	//活动设置组件

	het.domReady(function () {
	    // het.post({
	    //         url: Path.wPath+'/wechat/jssdk/sign',
	    //         data: 'format=json&url='+encodeURIComponent(location.href.split('#')[0]),
	    //         async:false,
	    //         success: function(data,status,xhr){
	    //             if(typeof data == 'string'){
	    //                 data = JSON.parse(data);
	    //             }
	    //             var code = data.code;
	    //             var jsonData = data.data;
	    //             if(status == "success" && code == 0){   
	    //                 wx.config({
	    //                     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    //                     appId: jsonData.appId, // 必填，公众号的唯一标识
	    //                     timestamp: jsonData.timestamp, // 必填，生成签名的时间戳
	    //                     nonceStr: jsonData.nonceStr, // 必填，生成签名的随机串
	    //                     signature: jsonData.signature,// 必填，签名，见附录1
	    //                     jsApiList: ['scanQRCode','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	    //                 });     
	    //                 sessionStorage.appid = jsonData.appId;          
	    //                 // wx.ready(function(){ 
	    //                 // });
	    //                 // wx.error(function(res){
	    //                 //  alert(res.errMsg);      
	    //                 // });                  
	    //             }       
	    //         }
	    //     });
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    (0, _inherits3.default)(App, _BaseComponent);

	    function App(props) {
	        (0, _classCallCheck3.default)(this, App);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(App, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'app' },
	                this.props.children
	            );
	        }
	    }]);
	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(
	            Route,
	            { path: '/', component: App },
	            React.createElement(IndexRedirect, { to: 'gameList' }),
	            React.createElement(Route, { path: 'event', component: _Event.Event }),
	            React.createElement(Route, { path: 'gameOn/:gameType', component: _GameOn.GameOn }),
	            React.createElement(Route, { path: 'gameList', component: _GameList.GameList }),
	            React.createElement(Route, { path: 'eventSet/:activityType/:lightType/:winNum', component: _EventSet.EventSet }),
	            React.createElement(Route, { path: 'rank/:groupId', component: _Ranking.Ranking }),
	            React.createElement(Route, { path: 'rule', component: _Rule.Rule }),
	            React.createElement(Route, { path: 'punish', component: _Punish.Punish })
	        )
	    ), document.getElementById('ROOT'));
	});

/***/ },
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
	var Actions = exports.Actions = Reflux.createActions(['startActivity', // 活动启动
	'ajax', // 接口请求（没有回调）
	'bindDevice', // 调起扫一扫，绑定设备
	'shareFriend']);

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

	var _Actions = __webpack_require__(90);

	var timer = 0;
	var tipsShow = function tipsShow(_this, tips) {
	  _this.trigger({
	    tips: tips,
	    toastShow: true
	  });
	  timer = setTimeout(function () {
	    _this.trigger({
	      toastShow: false
	    });
	  }, 3000);
	};
	var DOMAIN = location.host === 'weixin.clife.cn' || location.host === '127.0.0.1' ? '/clife-wechat-test/wechat/beerglass' : // 测试环境
	location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/beerglass' : // 预发布环境
	'/clife-wechat/wechat/beerglass'; // 正式环境

	var Store = exports.Store = Reflux.createStore({
	  listenables: [_Actions.Actions],
	  onBindDdevice: function onBindDdevice() {
	    var data = {};
	    // wx.scanQRCode({
	    //     needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	    //     scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
	    //     success: function (res) {
	    //         data.deviceUid  = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
	    //     }
	    // });
	    this.onAjax(data, DOMAIN + '/bind');
	  },
	  onShareFriend: function onShareFriend(url) {
	    console.log('share', url);
	    //       wx.onMenuShareAppMessage({
	    //     title: '', // 分享标题
	    //     desc: '', // 分享描述
	    //     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	    //     imgUrl: '', // 分享图标
	    //     type: '', // 分享类型,music、video或link，不填默认为link
	    //     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    //     success: function () { 
	    //         // 用户确认分享后执行的回调函数
	    //     },
	    //     cancel: function () { 
	    //         // 用户取消分享后执行的回调函数
	    //     }
	    // });
	  },
	  onAjax: function onAjax(data, url) {
	    var _this = this,
	        wholeUrl = DOMAIN + url;
	    wholeUrl = 'http://200.200.200.50/v1/web/open/systemNotice/getRollingNotice';
	    data = { pageRows: 100, pageIndex: 1 };
	    het.post(wholeUrl, data, function (result) {
	      result = JSON.parse(result);
	      var data = result.data ? result.data : '';
	      /*模拟数据*/
	      if (data) {
	        //     		data = [
	        //     {
	        //         "activityType": 1,
	        //         "lightType": null,
	        //         "winNum": null
	        //     },
	        //     {
	        //         "activityType": 2,
	        //         "lightType": 2,
	        //         "winNum": 1
	        //     },
	        // ];

	        data = {
	          "owner": {
	            "groupOwner": "23afdsf",
	            "ownerNickName": "owen",
	            "sex": 1,
	            "headImgUrl": "http://img/sdfsdfdf/1.png"
	          },
	          rankList: [{
	            "userUid": "23afdsf",
	            "nickName": "owen",
	            "sex": 1,
	            "headImgUrl": "http://img/sdfsdfdf/1.png",
	            "drinkCapacity": 400
	          }, {
	            "userUid": "24afdsf",
	            "nickName": "gavin",
	            "sex": 1,
	            "headImgUrl": "http://img/sdfsdfdf/2.png",
	            "drinkCapacity": 300
	          }],
	          "groupId": 1,
	          "groupName": "真心话大冒险一组",
	          "lightType": 2,
	          "groupOwner": 23,
	          "ownerNickName": "owen",
	          "isOwner": true,
	          "groupQRcode": "http://localhost/images/2013/weixin.png",
	          "groupUrl": "http://localhost/group/add"
	        };
	        // _this.trigger({eventInfo:data});
	        _this.trigger(data);
	      }
	      if (url == '/activity/start') {
	        //启动活动
	        tipsShow(_this, "活动已启动");
	        return;
	      }
	      if (url == '/activity/get') {
	        //活动详情
	        if (data != '') {
	          _this.trigger({ eventInfo: data });
	          return;
	        }
	      }
	      if (data.groupQRcode) {
	        localStorage.setItem('groupId_' + data.groupId, data.groupQRcode);
	      }
	    }, function (msg) {
	      alert(msg);
	    });
	  }
	});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Event = undefined;

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

	var _toast = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Event = exports.Event = function (_BaseComponent) {
	    (0, _inherits3.default)(Event, _BaseComponent);

	    function Event(props) {
	        (0, _classCallCheck3.default)(this, Event);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Event.__proto__ || (0, _getPrototypeOf2.default)(Event)).call(this, props));

	        _this.state = {
	            showToast: false
	        };
	        het.setTitle('活动');
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(Event, [{
	        key: 'handleStart',
	        value: function handleStart(type) {
	            // console.log(type);
	            var data = {};
	            data.activityType = parseInt(type);
	            _Actions.Actions.ajax(data, "/activity/start");
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.ajax('', '/activity/get'); //获取活动详情
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            // console.log(this.state)
	            var eventInfo = this.state.eventInfo ? this.state.eventInfo : [],
	                //活动详情信息
	            eventName = ['官方活动', '幸运抽奖'];

	            return React.createElement(
	                'section',
	                { className: 'event' },
	                React.createElement(
	                    'ul',
	                    { className: 'eventlist' },
	                    eventInfo.map(function (event, index) {
	                        var lightType = event.lightType ? event.lightType : 0,
	                            winNum = event.winNum ? event.winNum : 0,
	                            seted = lightType && winNum;
	                        return React.createElement(
	                            'li',
	                            { key: index },
	                            React.createElement(
	                                'p',
	                                null,
	                                eventName[index]
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex ' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell', onTouchTap: _this2.handleStart.bind(_this2, index + 1), style: { background: seted ? '#1A9964' : '#c6c6c6', pointerEvents: seted ? 'auto' : 'none' } },
	                                    '\u542F\u52A8'
	                                ),
	                                React.createElement(
	                                    Link,
	                                    { className: 'flex-cell', to: "/eventSet/" + event.activityType + "/" + lightType + '/' + winNum },
	                                    '\u8BBE\u7F6E'
	                                )
	                            )
	                        );
	                    })
	                ),
	                React.createElement(_toast.Toast, { show: this.state.toastShow, tips: this.state.tips })
	            );
	        }
	    }]);
	    return Event;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Toast = undefined;

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

	/*
	 	toast 提示组件
	 	参数：
	 	show： Boolean类型 true为显示false为隐藏；
	 	tips： string类型 toast的提示文本；
	    @author Yanan 
	    @time 2016/11/20 09:00:00
	*/
	var Toast = exports.Toast = function (_React$Component) {
	    (0, _inherits3.default)(Toast, _React$Component);

	    function Toast(props) {
	        (0, _classCallCheck3.default)(this, Toast);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Toast.__proto__ || (0, _getPrototypeOf2.default)(Toast)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    (0, _createClass3.default)(Toast, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { id: "toast", style: { width: "100%", height: "5rem", position: "fixed", left: "0", bottom: "0", display: this.props.show ? "block" : "none", textAlign: "center" } },
	                React.createElement(
	                    "span",
	                    { style: { padding: "0.8rem 1.5rem", background: "#000", color: "#fff", borderRadius: "3px", fontSize: "14px" } },
	                    this.props.tips
	                )
	            );
	        }
	    }]);
	    return Toast;
	}(React.Component);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EventSet = undefined;

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EventSet = exports.EventSet = function (_BaseComponent) {
	    (0, _inherits3.default)(EventSet, _BaseComponent);

	    function EventSet(props) {
	        (0, _classCallCheck3.default)(this, EventSet);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (EventSet.__proto__ || (0, _getPrototypeOf2.default)(EventSet)).call(this, props));

	        het.setTitle('设置');
	        _this.state = {
	            showLight: false,
	            lightIndex: props.params.lightType,
	            winnersNum: props.params.winNum,
	            activityType: props.params.activityType
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(EventSet, [{
	        key: 'lightSelect',
	        value: function lightSelect(e) {
	            var index = e.target.getAttribute('data-index'),
	                data = {};
	            data.lightType = index;
	            data.winNum = this.state.winNum;
	            this.setState({ lightIndex: index });
	            _Actions.Actions.ajax(data, '/activity/set');
	        }
	    }, {
	        key: 'showLight',
	        value: function showLight(e) {
	            this.setState({ showLight: !this.state.showLight });
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var winnersNum = e.target.value,
	                data = {};
	            data.lightType = this.state.lightType;
	            data.winNum = winnersNum;
	            this.setState({ winnersNum: winnersNum });
	            _Actions.Actions.ajax(data, '/activity/set');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var light = ['热情', '温柔', '欢快', '互动'];
	            return React.createElement(
	                'section',
	                { className: 'eventSet' },
	                React.createElement(
	                    'ul',
	                    { className: 'set-ul' },
	                    React.createElement(
	                        'li',
	                        { onTouchTap: this.showLight.bind(this) },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u706F\u5149\u9009\u62E9'
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            React.createElement(
	                                'i',
	                                null,
	                                this.state.lightIndex ? light[this.state.lightIndex - 1] : ''
	                            ),
	                            React.createElement('img', { src: '../static/img/ic-arrow.png' })
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u4E2D\u5956\u4EBA\u6570'
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            React.createElement('input', { type: 'tel', value: this.state.winnersNum ? this.state.winnersNum : '', onChange: this.handleChange.bind(this) }),
	                            React.createElement('img', { src: '../static/img/ic-arrow.png' })
	                        )
	                    )
	                ),
	                this.state.showLight ? React.createElement(
	                    'div',
	                    null,
	                    React.createElement('div', { className: 'shadow', onTouchTap: this.showLight.bind(this) }),
	                    React.createElement(
	                        'ul',
	                        { className: 'mode-ul' },
	                        light.map(function (item, index) {
	                            return React.createElement(
	                                'li',
	                                { key: index, 'data-index': index + 1, onTouchTap: _this2.lightSelect.bind(_this2) },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    item
	                                ),
	                                React.createElement('img', { className: _this2.state.lightIndex == index + 1 ? '' : 'hidden', src: '../static/img/ic-checked.png' })
	                            );
	                        })
	                    )
	                ) : ''
	            );
	        }
	    }]);
	    return EventSet;
	}(_BaseComponentClass.BaseComponent); /**
	                                       * 活动设置组件
	                                       * @props.params {number} activityType 活动类型
	                                       * @props.params {number} lightType 灯光类型索引
	                                       * @props.params {number} winNum 中奖人数
	                                       * @author pan
	                                       */

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameList = undefined;

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

	var _SideInfo = __webpack_require__(96);

	var _Alert = __webpack_require__(97);

	var _Alert2 = _interopRequireDefault(_Alert);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//弹框

	var GameList = exports.GameList = function (_BaseComponent) {
	    (0, _inherits3.default)(GameList, _BaseComponent);

	    function GameList(props) {
	        (0, _classCallCheck3.default)(this, GameList);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (GameList.__proto__ || (0, _getPrototypeOf2.default)(GameList)).call(this, props));

	        _this.state = {
	            showSide: false, //显示侧边栏
	            deviceUid: 'fdfdfdf', //啤酒杯设备唯一标识
	            gameType: '1' //参与中的游戏类型（本参数可为空，代表没有参与过任何游戏）
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(GameList, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            het.setTitle('啤酒杯');
	            _Actions.Actions.ajax('', '/user/index'); //用户参与游戏情况
	        }
	    }, {
	        key: 'showSide',
	        value: function showSide(e) {
	            this.setState({ showSide: !this.state.showSide });
	        }
	    }, {
	        key: 'handleBind',
	        value: function handleBind(state, fn) {
	            this.setState({ isShowAlert: state.isShowAlert });
	            if (state.sure) {
	                //添加设备
	                _Actions.Actions.bindDevice();
	            }
	        }
	    }, {
	        key: 'enterGame',
	        value: function enterGame(index) {
	            if (this.state.deviceUid) {
	                location.href = '#/gameOn/' + index;
	            } else {
	                this.setState({ isShowAlert: true });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var gameName = ['真心话大冒险', '谁是酒王'],
	                showSide = this.state.showSide,
	                message = '游戏需要先绑定设备哦，点击“添加设备”，扫描酒杯底部的二维码即可完成绑定。';

	            return React.createElement(
	                'div',
	                { className: 'main' },
	                React.createElement(
	                    'section',
	                    { className: 'gameList', style: { width: "100%", marginLeft: showSide ? '70%' : '' } },
	                    React.createElement('div', { className: 'shadow', style: { display: showSide ? '' : 'none' }, onTouchTap: this.showSide.bind(this) }),
	                    React.createElement(
	                        'p',
	                        { className: 'sidebar' },
	                        React.createElement('img', { src: '../static/img/ic-sidebar.png', onTouchTap: this.showSide.bind(this) })
	                    ),
	                    React.createElement(
	                        'ul',
	                        { className: 'set-ul' },
	                        gameName.map(function (item, index) {
	                            return React.createElement(
	                                'li',
	                                { key: index, onTouchTap: _this2.enterGame.bind(_this2, index + 1) },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    item
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        _this2.state.gameType == index + 1 ? '参与中' : '创建游戏'
	                                    ),
	                                    React.createElement('img', { src: '../static/img/ic-arrow.png' })
	                                )
	                            );
	                        })
	                    )
	                ),
	                React.createElement(_SideInfo.SideInfo, { show: showSide, deviceUid: this.state.deviceUid ? this.state.deviceUid : '' }),
	                this.state.isShowAlert ? React.createElement(_Alert2.default, { isShowTitle: false, message: message, btnSure: '\u6DFB\u52A0\u8BBE\u5907', childSetState: this.handleBind.bind(this) }) : ''
	            );
	        }
	    }]);
	    return GameList;
	}(_BaseComponentClass.BaseComponent); //侧边栏

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SideInfo = undefined;

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

	var _Alert = __webpack_require__(97);

	var _Alert2 = _interopRequireDefault(_Alert);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**侧边栏用户信息
	 * @props {string} deviceUid 啤酒杯设备id
	 */

	var SideInfo = exports.SideInfo = function (_BaseComponent) {
	    (0, _inherits3.default)(SideInfo, _BaseComponent);

	    function SideInfo(props) {
	        (0, _classCallCheck3.default)(this, SideInfo);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (SideInfo.__proto__ || (0, _getPrototypeOf2.default)(SideInfo)).call(this, props));

	        _this.state = {
	            isShowAlert: false
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(SideInfo, [{
	        key: 'handleBind',
	        value: function handleBind(e) {
	            var deviceMac = this.props.deviceUid;
	            if (deviceMac) {
	                this.setState({ isShowAlert: true });
	            } else {
	                //调起扫一扫 并绑定
	                _Actions.Actions.bindDevice();
	            }
	        }
	    }, {
	        key: 'unbind',
	        value: function unbind(state, fn) {
	            this.setState({ isShowAlert: state.isShowAlert });
	            if (state.sure) {
	                //解绑 
	                console.log('jiebang');
	                _Actions.Actions.ajax('', '/unbind');
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var deviceMac = this.props.deviceUid ? this.props.deviceUid : '',
	                message = '解绑设备后，您将不能参与游戏，确认要解绑吗';

	            return React.createElement(
	                'section',
	                { className: 'user-info', style: { display: this.props.show ? '' : "none" } },
	                React.createElement(
	                    'div',
	                    { className: 'header' },
	                    React.createElement('img', { src: this.props.headImgUrl, alt: '\u5934\u50CF' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        this.props.nickName
	                    )
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'info-ul' },
	                    React.createElement(
	                        'li',
	                        { onTouchTap: this.handleBind.bind(this) },
	                        React.createElement('img', { style: { top: deviceMac ? '27px' : '18px' }, src: '../static/img/ic-device.png', alt: '\u8BBE\u5907' }),
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6211\u7684\u8BBE\u5907'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                deviceMac
	                            )
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: deviceMac ? 'cl-red' : 'cl-gray' },
	                            deviceMac ? '解绑设备' : '暂未绑定设备'
	                        )
	                    )
	                ),
	                this.state.isShowAlert ? React.createElement(_Alert2.default, { isShowTitle: false, message: message, btnSure: '\u89E3\u7ED1', childSetState: this.unbind.bind(this) }) : ''
	            );
	        }
	    }]);
	    return SideInfo;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _defineProperty2 = __webpack_require__(98);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Alert = React.createClass({
		displayName: 'Alert',

		propTypes: {
			isShowTitle: React.PropTypes.bool, // 是否显示标题
			title: React.PropTypes.string, // 提示对话框上显示的标题内容
			message: React.PropTypes.string, // 提示对话框上显示的内容
			btnCancel: React.PropTypes.string, //提示对话框取消按钮显示的内容
			btnSure: React.PropTypes.string, // 提示对话框上确认按钮显示的内容
			onAnimationLeave: React.PropTypes.func // 提示对话框上关闭后的回调函数
		},
		getInitialState: function getInitialState() {
			return {
				animationClassName: 'animation-alert-enter',
				opacity: 1
			};
		},
		getDefaultProps: function getDefaultProps() {
			return {
				isShowTitle: true,
				title: '提示',
				message: '请添加内容',
				btnCancel: '取消',
				btnSure: '确定',
				onAnimationLeave: function onAnimationLeave() {}
			};
		},

		animationType: 'enter', //自定义对象属性，用以维护动画显隐
		animationEnd: function animationEnd() {
			if (this.animationType == 'enter') {
				this.animationType = 'leave';
				this.setState({ opacity: 1 });
			} else {
				this.animationType = 'enter';
				this.setState({ opacity: 0 } /*,()=>{
	                                this.props.onAnimationLeave()
	                                }*/);
			}
		},
		componentDidMount: function componentDidMount() {
			var _this = this;

			//onAnimationEnd react 0.14版本不支持标签上的直接量写法onAnimationEnd={this.animationEnd}
			this.refs['cancel'].addEventListener('touchstart', function () {
				_this.props.childSetState({ isShowAlert: false });
			}, false);
			this.refs['sure'].addEventListener('touchstart', function () {
				_this.props.childSetState({ isShowAlert: false, sure: true });
			}, false);
			this.refs['wrapper'].addEventListener('webkitAnimationEnd', function () {
				_this.animationEnd();
			}, false);
		},
		btnTouchClose: function btnTouchClose(e) {
			this.setState({ animationClassName: 'animation-alert-leave', close: 1 });
		},
		render: function render() {
			var _innerBox;

			var style = {
				wrapper: {
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					display: '-webkit-box',
					WebkitBoxAlign: 'center',
					WebkitBoxPack: 'center',
					background: 'rgba(0,0,0,0.5)',
					opacity: this.state.opacity
				},
				innerBox: (_innerBox = {
					width: '86%',
					maxHeight: '60%',
					borderRadius: '5px',
					boxSizing: 'border-box',
					WebkitBoxSizing: 'border-box',
					background: 'rgba(255,255,255,1)',
					padding: '14px 0 0'
				}, (0, _defineProperty3.default)(_innerBox, 'borderRadius', '4px'), (0, _defineProperty3.default)(_innerBox, 'boxShadow', '0 0 40px rgba(0,0,0,0.4)'), _innerBox),
				title: {
					padding: '0 17px 5px',
					color: 'black',
					fontSize: '18px',
					fontWeight: 'bold',
					textAlign: 'center'
				},
				message: {
					margin: '10px 25px 28px'
				},
				text: {
					margin: 0,
					fontSize: '16px',
					lineHeight: '26px',
					wordBreak: 'break-all',
					color: 'rgba(60,60,60,1)'
				},
				btnwrapper: {
					borderTop: "1px solid #E2E2E4"
				},
				btnCancel: {
					width: '50%',
					border: '0',
					background: 'rgba(255,255,255,1)',
					borderRadius: '5px',
					color: '#000',
					fontSize: '18px',
					outline: 'none',
					lineHeight: '48px',
					verticalAlign: 'top',
					borderRight: "1px solid #E2E2E4",
					WebkitTapHighlightColor: 'transparent'
				},
				btnSure: {
					width: '50%',
					border: '0',
					borderRadius: '5px',
					background: 'rgba(255,255,255,1)',
					color: '#3285ff',
					fontSize: '18px',
					outline: 'none',
					lineHeight: '48px',
					verticalAlign: 'top',
					borderLeft: "1px solid #E2E2E4",
					WebkitTapHighlightColor: 'transparent'
				}

			};
			var btnWrapperName = '';
			var animationClassName = this.state.animationClassName;
			var title = this.props.isShowTitle ? React.createElement(
				'h1',
				{ style: style.title },
				this.props.title
			) : null;

			return React.createElement(
				'div',
				{ style: style.wrapper, className: animationClassName, ref: 'wrapper', onAnimationEnd: this.animationEnd },
				React.createElement(
					'div',
					{ style: style.innerBox },
					title,
					React.createElement(
						'div',
						{ style: style.message },
						React.createElement(
							'p',
							{ style: style.text },
							this.props.message
						)
					),
					React.createElement(
						'div',
						{ style: style.btnwrapper },
						React.createElement('input', { type: 'button', ref: 'cancel', value: this.props.btnCancel, style: style.btnCancel, onTouchStart: this.btnTouchClose }),
						React.createElement('input', { type: 'button', ref: 'sure', value: this.props.btnSure, style: style.btnSure, onTouchStart: this.btnTouchClose })
					)
				)
			);
		}
	});

	exports.default = Alert;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(30);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GameOn = undefined;

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GameOn = exports.GameOn = function (_BaseComponent) {
	  (0, _inherits3.default)(GameOn, _BaseComponent);

	  function GameOn(props) {
	    (0, _classCallCheck3.default)(this, GameOn);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (GameOn.__proto__ || (0, _getPrototypeOf2.default)(GameOn)).call(this, props));

	    var gameTitle = ['真心话大冒险', '谁是酒王'];
	    het.setTitle(gameTitle[props.params.gameType - 1]);
	    _this.state = {
	      lightType: '2', //游戏组灯光模式
	      groupOwner: 23, //群主用户id
	      ownerNickName: "owen", //群主昵称
	      isOwner: true, //是否是群主（true-是，false-不是）
	      groupQRcode: "../static/img/aa.png", //游戏组二维码图片路径
	      groupUrl: "http://localhost/group/add", //游戏组链接
	      groupId: '1' };
	    _this.listenStore(_Store.Store); // 监听Store
	    return _this;
	  }

	  (0, _createClass3.default)(GameOn, [{
	    key: 'showLight',
	    value: function showLight(e) {
	      this.setState({ showLight: !this.state.showLight });
	    }
	  }, {
	    key: 'lightSelect',
	    value: function lightSelect(e) {
	      var index = e.target.getAttribute('data-index'),
	          data = {};
	      data.groupId = this.state.groupId;
	      data.lightType = index;
	      _Actions.Actions.ajax(data, '/gamegroup/set'); //设置游戏组灯光模式
	      this.setState({ lightIndex: index });
	    }
	  }, {
	    key: 'shareFriend',
	    value: function shareFriend(e) {
	      var linkStr = this.state.groupUrl;
	      _Actions.Actions.shareFriend(linkStr);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var gameType = this.props.params.gameType,
	          data = {};
	      data.gameType = gameType;
	      _Actions.Actions.ajax(data, '/gamegroup/create'); //创建游戏组
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var light = ['热情', '温柔', '欢快', '互动'];
	      return React.createElement(
	        'section',
	        { className: 'game' },
	        React.createElement(
	          'div',
	          { className: 'qrcodeMain' },
	          React.createElement(
	            'div',
	            { className: 'qrcodeImg' },
	            React.createElement('img', { src: this.state.groupQRcode, alt: '' })
	          ),
	          React.createElement(
	            'p',
	            null,
	            '\u8BF7\u8BA9\u597D\u53CB\u626B\u63CF\u4E8C\u7EF4\u7801\u52A0\u5165'
	          ),
	          React.createElement(
	            'p',
	            { onTouchTap: this.shareFriend.bind(this) },
	            '\u53D1\u9001\u94FE\u63A5\u7ED9\u597D\u53CB'
	          )
	        ),
	        React.createElement(
	          'ul',
	          { className: 'set-ul' },
	          React.createElement(
	            'a',
	            { href: '#/rule' },
	            React.createElement(
	              'span',
	              null,
	              '\u67E5\u770B\u6E38\u620F\u89C4\u5219'
	            ),
	            React.createElement(
	              'span',
	              null,
	              React.createElement('img', { src: '../static/img/ic-arrow.png' })
	            )
	          ),
	          this.state.isOwner ? React.createElement(
	            'li',
	            { onTouchTap: this.showLight.bind(this) },
	            React.createElement(
	              'span',
	              null,
	              '\u8BBE\u7F6E\u706F\u5149\u6A21\u5F0F'
	            ),
	            React.createElement(
	              'span',
	              null,
	              React.createElement(
	                'i',
	                null,
	                light[this.state.lightIndex ? this.state.lightIndex - 1 : 1]
	              ),
	              React.createElement('img', { src: '../static/img/ic-arrow.png' })
	            )
	          ) : ''
	        ),
	        React.createElement(
	          'a',
	          { className: 'btn', href: '#/rank/' + this.state.groupId },
	          '\u70B9\u51FB\u67E5\u770B\u9152\u91CF\u6392\u884C'
	        ),
	        this.state.showLight ? React.createElement(
	          'div',
	          null,
	          React.createElement('div', { className: 'shadow', onTouchTap: this.showLight.bind(this) }),
	          React.createElement(
	            'ul',
	            { className: 'mode-ul' },
	            light.map(function (item, index) {
	              return React.createElement(
	                'li',
	                { key: index, 'data-index': index + 1, onTouchTap: _this2.lightSelect.bind(_this2) },
	                React.createElement(
	                  'span',
	                  null,
	                  item
	                ),
	                React.createElement('img', { className: _this2.state.lightIndex == index + 1 ? '' : 'hidden', src: '../static/img/ic-checked.png' })
	              );
	            })
	          )
	        ) : ''
	      );
	    }
	  }]);
	  return GameOn;
	}(_BaseComponentClass.BaseComponent); /**
	                                       * 游戏主页
	                                       * @props.params {int} gameType 游戏类型（真心话大冒险） 
	                                       */

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Ranking = undefined;

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

	var _Alert = __webpack_require__(97);

	var _Alert2 = _interopRequireDefault(_Alert);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 排行榜组件
	 * @props.params {number} groupId 游戏组id
	 */
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var Ranking = exports.Ranking = function (_BaseComponent) {
	  (0, _inherits3.default)(Ranking, _BaseComponent);

	  function Ranking(props) {
	    (0, _classCallCheck3.default)(this, Ranking);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (Ranking.__proto__ || (0, _getPrototypeOf2.default)(Ranking)).call(this, props));

	    _this.state = {};
	    _this.listenStore(_Store.Store); // 监听Store
	    return _this;
	  }

	  (0, _createClass3.default)(Ranking, [{
	    key: 'showAlert',
	    value: function showAlert(e) {
	      this.setState({ isShowAlert: true });
	    }
	  }, {
	    key: 'gameOver',
	    value: function gameOver(state, fn) {
	      this.setState(state);
	      if (state.sure) {
	        var data = {};
	        data.groupId = parseInt(this.props.params.groupId);
	        _Actions.Actions.ajax(data, '/gamegroup/dissolve'); //结束游戏
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var groupId = parseInt(this.props.params.groupId),
	          data = {},
	          groupQRcode = localStorage.getItem('groupId_' + groupId) ? localStorage.getItem('groupId_' + groupId) : '';
	      data.groupId = groupId;
	      if (groupQRcode) this.setState({ groupQRcode: groupQRcode });
	      _Actions.Actions.ajax(data, '/gamegroup/drink/list'); //获取排行榜
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var message = '确认要结束游戏？';
	      var rankList = this.state.rankList ? this.state.rankList : [],
	          //排名信息
	      owner = this.state.owner; //群主信息
	      return React.createElement(
	        'section',
	        { className: 'rank' },
	        React.createElement(
	          'div',
	          { className: 'borderBox borderShadow' },
	          React.createElement(
	            'div',
	            { className: 'rank-header' },
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'span',
	                  { className: 'cl-gray' },
	                  '\u6E38\u620F\u7FA4\u4E3B\uFF1A'
	                ),
	                React.createElement(
	                  'span',
	                  null,
	                  owner ? owner.ownerNickName : ''
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'span',
	                  { className: 'cl-gray' },
	                  '\u53C2\u4E0E\u4EBA\u6570\uFF1A'
	                ),
	                React.createElement(
	                  'span',
	                  null,
	                  rankList ? rankList.length : ''
	                )
	              )
	            ),
	            React.createElement('img', { src: this.state.groupQRcode, alt: 'qrcode' })
	          )
	        ),
	        React.createElement(
	          'ul',
	          { className: 'rank-ul' },
	          React.createElement(
	            'li',
	            { className: 'flex cl-gray ' },
	            React.createElement(
	              'span',
	              { className: 'flex-cell' },
	              '\u6392\u540D'
	            ),
	            React.createElement(
	              'span',
	              { className: 'flex-cell' },
	              '\u6635\u79F0'
	            ),
	            React.createElement(
	              'span',
	              { className: 'flex-cell' },
	              '\u996E\u9152\u91CF'
	            )
	          ),
	          rankList.map(function (item, index) {
	            return React.createElement(
	              'li',
	              { key: index, className: 'flex' },
	              React.createElement(
	                'span',
	                { className: 'flex-cell' },
	                index + 1
	              ),
	              React.createElement(
	                'span',
	                { className: 'flex-cell' },
	                item.nickName
	              ),
	              React.createElement(
	                'span',
	                { className: 'flex-cell' },
	                item.drinkCapacity + 'ml'
	              )
	            );
	          })
	        ),
	        React.createElement(
	          'footer',
	          { className: 'flex' },
	          React.createElement(
	            'a',
	            { className: 'flex-cell btn', href: '#/punish' },
	            '\u60E9\u7F5A\u5EFA\u8BAE'
	          ),
	          React.createElement(
	            'span',
	            { className: 'flex-cell btn', onTouchTap: this.showAlert.bind(this) },
	            '\u7ED3\u675F\u6E38\u620F'
	          )
	        ),
	        this.state.isShowAlert ? React.createElement(_Alert2.default, { isShowTitle: false, message: message, btnSure: '\u7ED3\u675F', childSetState: this.gameOver.bind(this) }) : ''
	      );
	    }
	  }]);
	  return Ranking;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Rule = undefined;

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Rule = exports.Rule = function (_BaseComponent) {
	    (0, _inherits3.default)(Rule, _BaseComponent);

	    function Rule(props) {
	        (0, _classCallCheck3.default)(this, Rule);
	        return (0, _possibleConstructorReturn3.default)(this, (Rule.__proto__ || (0, _getPrototypeOf2.default)(Rule)).call(this, props));
	    }

	    (0, _createClass3.default)(Rule, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            het.setTitle('游戏规则');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'section',
	                { className: 'borderBox borderShadow' },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6E38\u620F\u89C4\u5219\u5982\u4E0B\uFF1A'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6E38\u620F\u5F00\u59CB\u540E\uFF0C\u6240\u6709\u53C2\u4E0E\u6E38\u620F\u7684\u667A\u80FD\u9152\u676F\u4F1A\u968F\u673A\u95EA\u70C1\u8D77\u706F\u5149\uFF0C\u6570\u79D2\u540E\u6240\u6709\u9152\u676F\u706F\u5149\u7184\u706D\uFF0C\u968F\u540E\u4EAE\u8D77\u7684\u9152\u676F\u4E3B\u4EBA\u5C06\u662F\u6700\u540E\u7684\u201C\u5E78\u8FD0\u513F\u201D\uFF0C\u7528\u4F60\u4EEC\u8BA4\u4E3A\u6700\u6709\u8DA3\u7684\u65B9\u5F0F\u53BB\u60E9\u7F5Ata\u5427\uFF0C\u516C\u4F17\u53F7\u4E2D\u4E5F\u4F1A\u6709\u60E9\u7F5A\u624B\u6BB5\u7684\u5EFA\u8BAE\u4F9B\u60A8\u53C2\u8003\u54E6\u3002'
	                        )
	                    ),
	                    React.createElement('img', { src: '../static/img/ic-rule.png', alt: '\u6E38\u620F\u89C4\u5219' })
	                )
	            );
	        }
	    }]);
	    return Rule;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Punish = undefined;

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Punish = exports.Punish = function (_BaseComponent) {
	    (0, _inherits3.default)(Punish, _BaseComponent);

	    function Punish(props) {
	        (0, _classCallCheck3.default)(this, Punish);
	        return (0, _possibleConstructorReturn3.default)(this, (Punish.__proto__ || (0, _getPrototypeOf2.default)(Punish)).call(this, props));
	    }

	    (0, _createClass3.default)(Punish, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            het.setTitle('惩罚建议');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var punishArr = ['在现场所有人中，你看哪位异性最舒服？', '对梦中情人有哪五条要求？', ' 你谈过几次恋爱？  ', ' 你吻过几个人？  ', ' 让你一直念念不忘的一位异性是谁？  ', ' 你会不会在意ta的过去，为什么？  ', ' 你认为在座谁最性感？  ', ' 你认为在座的哪一位异性可以成为你的性幻想对象？  ', ' 你在感情上劈过腿吗？  ', ' 最欣赏自己哪个部位?对自己那个部位最不满意?  ', ' 你在意你的老婆(老公)不是处女(处男)吗?  ', ' 你的初恋是在几岁？  ', ' 你会期待一夜情吗？  ', ' 做过最丢脸的事是什么？  ', ' 经历过最尴尬的场面是怎样的？ ', ' 怎样看待性？  ', ' 说一说你的择偶观  ', ' 在感情中，你是主动型还是被动型？ ', ' 上一次做春梦是在什么时候？什么内容？  ', ' 爱过你的老师吗？  ', ' 如果有一天我对你说我爱上你了，你怎么办?  ', ' 愿意被有钱人包养吗？  ', ' 请说出在座谁昨天最有可能没有洗澡？  ', ' 你觉得自己什么时候身体发育成熟的？  ', ' 自己做过最丢脸的事是什么？  ', ' 说出五种避孕方式  ', ' 只给你一天时间当异性，你最想做什么？', ' 为什么男人不坏，女人不爱？  ', ' 思想出轨和身体出轨，哪个比较能够接受  ', ' 你爱的和爱你的，你会选择哪一个？为什么？  ', ' 你觉得自己长的如何？  ', ' 你的小癖好是什么？  ', ' 你认为最浪漫的事情是什么  ', ' 你认为男女朋友分手后还能做普通朋友吗  ', ' 什么样算是分手最佳方式  ', ' 如果有来生，你选择当什么？  ', ' 假如可以改变你成长过程中的任何事，你希望有哪些改变？', ' 你认为有什么事是绝对不能开玩笑的？', ' 你吃过自己的鼻涕么？', ' 有被发现过走错厕所了吗？  ', ' 妻子和妈掉到水里，只能救一个，你救哪一个？', ' 你属于一见钟情还是日久生情型？', ' 喜欢女王型还是可爱纯情型？', ' 被爸妈打的最厉害的一次是因为什么？', ' 喜欢女王型还是可爱纯情型？', ' 对通讯录里的第一个异性打电话表白，要开免提哦', ' 试着努力的放个屁', ' 一边傻笑一边用舌头舔自己的胳膊肘', ' 加到现场一个异性的微信', ' 一边喝酒一边大喊“我是禽兽，我对不起你”', ' 抱起现场最重的朋友坚持20秒', ' 大声说出一句绕口令，重复三遍', ' 抱起现场最重的朋友坚持20秒', ' 跳骑马舞30秒', ' 看着离你最近的异性唱一首情歌', ' 帮左手边第一个异性朋友捏腿，直到满意为止', ' 喝下每个人喂你的酒', ' 走性感撩人的猫步20秒', ' 一边蛙跳一边学青蛙叫，持续10秒', ' 打开手机相册，让朋友们选三张照片并说出这三张照片背后的故事', ' 选择一位异性，和ta互换衣服', ' 向一位同性大声求婚', ' 对离你最远的一位异性说至少5句情话', ' 请对一异性展示自己最性感的动作和最妩媚的动作', ' 牵着一位同性的手，向ta表白一分钟'];
	            var randomNum = parseInt(punishArr.length * Math.random());
	            return React.createElement(
	                'section',
	                { className: 'borderBox borderShadow' },
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement('p', null),
	                        React.createElement(
	                            'p',
	                            null,
	                            punishArr[randomNum]
	                        )
	                    ),
	                    React.createElement('img', { src: '../static/img/ic-punish.png', alt: 'punish' })
	                )
	            );
	        }
	    }]);
	    return Punish;
	}(_BaseComponentClass.BaseComponent);

/***/ }
/******/ ]);