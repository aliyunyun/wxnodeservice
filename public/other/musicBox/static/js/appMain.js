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

	var _common = __webpack_require__(2);

	var _router = __webpack_require__(3);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.addEventListener('load', function () {
	    ReactDOM.render(_router2.default, document.getElementById('ROOT'));
	});

	// 禁止滑动事件
	document.addEventListener('touchmove', function (e) {
	    e.preventDefault();
	}, false);

	window.gMain = {
	    deviceId: getUrlParam('deviceId')
	};

	function getUrlParam(sName) {
	    var reg = new RegExp("(^|&)" + sName + "=([^&]*)(&|$)", "i");
	    var r = window.location.hash.split('?')[1].match(reg);
	    if (r != null) return decodeURIComponent(r[2]); // (r[2]);
	    return "";
	}

	/*
	    测试专用，手动种植wechatUserId和token
	*/
	//setCookie();
	function setCookie() {
	    function setCookie(c_name, value, expiredays, path) {
	        var exdate = new Date();
	        exdate.setTime(exdate.getTime() + expiredays * 24 * 60 * 60 * 1000);
	        document.cookie = c_name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString()) + ";" + (path == null ? "" : "path=" + escape(path));
	    };
	    var getCookie = function getCookie(name) {
	        var arr,
	            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	        if (arr = document.cookie.match(reg)) {
	            return unescape(arr[2]);
	        } else {
	            return null;
	        }
	    };

	    function getQueryString(name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return decodeURI(r[2]);
	        return null;
	    };

	    var routerFirst = _common.Path.wPath;
	    var _this = this;

	    //微信授权
	    var hasCookie = function hasCookie(name) {
	        var wechatId = getCookie(name);
	        if (wechatId == "" || wechatId == null || wechatId == undefined) {
	            //console.log('-------------请求id--')
	            //"http://weixin.clife.cn/clife-wechat-test" + "/wechat/user/login?format=json&type=1&redirect=" + location.href;
	            var url = routerFirst + "/wechat/hotel/user/login?format=json&type=1&redirect=" + location.href;
	            //console.log(url)
	            window.location.href = url;
	        } else {
	            //console.log('设置WeChatUserId成功');
	            ajax({
	                url: _common.Path.wPath + '/wechat/hotel/getToken',
	                dataType: 'json',
	                // cache:true,
	                // async:false,
	                success: function success(r) {
	                    if (r.code == 0) {
	                        var access = r.data;
	                        setCookie('accessToken', access, 0.5, '/');
	                    }
	                }
	            });
	        }
	    };
	    setCookie('wechatUserId', 10328, 0.5, '/');
	    hasCookie('wechatUserId');
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var wPath, aPath;
	switch (location.host) {
	    case 'weixin.clife.cn':
	        wPath = '/clife-wechat-test';
	        aPath = 'http://200.200.200.50';
	        break;
	    case 'weixin.hetyj.com':
	        wPath = '/clife-wechat-preRelease';
	        aPath = 'http://weixin.hetyj.com';
	        break;
	    case 'wechat.hetyj.com':
	        wPath = '/clife-wechat';
	        aPath = 'http://wechat.hetyj.com';
	        break;
	    default:
	        wPath = '/clife-wechat-test';
	        aPath = 'http://200.200.200.50';
	}

	var Path = exports.Path = {
	    wPath: wPath,
	    aPath: aPath
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _page = __webpack_require__(4);

	var _page2 = _interopRequireDefault(_page);

	var _home = __webpack_require__(116);

	var _home2 = _interopRequireDefault(_home);

	var _albums = __webpack_require__(119);

	var _albums2 = _interopRequireDefault(_albums);

	var _albumSongs = __webpack_require__(120);

	var _albumSongs2 = _interopRequireDefault(_albumSongs);

	var _collection = __webpack_require__(129);

	var _collection2 = _interopRequireDefault(_collection);

	var _internal = __webpack_require__(130);

	var _internal2 = _interopRequireDefault(_internal);

	var _localStation = __webpack_require__(131);

	var _localStation2 = _interopRequireDefault(_localStation);

	var _network = __webpack_require__(132);

	var _network2 = _interopRequireDefault(_network);

	var _player = __webpack_require__(133);

	var _player2 = _interopRequireDefault(_player);

	var _recent = __webpack_require__(135);

	var _recent2 = _interopRequireDefault(_recent);

	var _tags = __webpack_require__(136);

	var _tags2 = _interopRequireDefault(_tags);

	var _networkMusic = __webpack_require__(137);

	var _networkMusic2 = _interopRequireDefault(_networkMusic);

	var _buildAlbum = __webpack_require__(138);

	var _buildAlbum2 = _interopRequireDefault(_buildAlbum);

	var _anchors = __webpack_require__(139);

	var _anchors2 = _interopRequireDefault(_anchors);

	var _anchorAlbums = __webpack_require__(140);

	var _anchorAlbums2 = _interopRequireDefault(_anchorAlbums);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var IndexRedirect = _ReactRouter.IndexRedirect;


	var RouterDom;
	exports.default = RouterDom = React.createElement(
	    Router,
	    { history: hashHistory },
	    React.createElement(
	        Route,
	        { path: '/', component: _page2.default },
	        React.createElement(Route, { path: '/home', component: _home2.default }),
	        React.createElement(
	            Route,
	            { path: '/albums' },
	            React.createElement(IndexRedirect, { to: 'index' }),
	            React.createElement(Route, { path: 'index', component: _albums2.default }),
	            React.createElement(Route, { path: 'songs/:id/:name/:img', component: _albumSongs2.default }),
	            React.createElement(Route, { path: 'build/:id/:name', component: _buildAlbum2.default })
	        ),
	        React.createElement(Route, { path: '/collection', component: _collection2.default }),
	        React.createElement(Route, { path: '/recent', component: _recent2.default }),
	        React.createElement(Route, { path: '/internal', component: _internal2.default }),
	        React.createElement(
	            Route,
	            { path: '/network' },
	            React.createElement(IndexRedirect, { to: 'index' }),
	            React.createElement(Route, { path: 'index', component: _network2.default }),
	            React.createElement(Route, { path: 'tags/:id/:title', component: _tags2.default }),
	            React.createElement(Route, { path: 'anchors/:id/:title', component: _anchors2.default }),
	            React.createElement(Route, { path: 'anchorAlbums/:id/:title', component: _anchorAlbums2.default }),
	            React.createElement(Route, { path: 'albums/:baseInfo', component: _networkMusic2.default })
	        ),
	        React.createElement(Route, { path: '/localStation', component: _localStation2.default }),
	        React.createElement(Route, { path: '/player', component: _player2.default })
	    )
	);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _salver = __webpack_require__(91);

	var _salver2 = _interopRequireDefault(_salver);

	var _playList = __webpack_require__(94);

	var _playList2 = _interopRequireDefault(_playList);

	var _blueToothTip = __webpack_require__(96);

	var _blueToothTip2 = _interopRequireDefault(_blueToothTip);

	var _store = __webpack_require__(97);

	var _localStore = __webpack_require__(104);

	var _action = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Page = function (_React$Component) {
	    (0, _inherits3.default)(Page, _React$Component);

	    function Page(props) {
	        (0, _classCallCheck3.default)(this, Page);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).call(this, props));

	        _this.state = {
	            currInfo: {},
	            list: [],
	            playMode: 0,
	            playSource: 0,
	            playStatus: 0,
	            internalInfo: null,
	            showBTTip: true
	        };
	        _this.hideFooterArr = ['player', 'newFile'];

	        _this.removeListen = _store.Store.listen(_this.setState.bind(_this));
	        return _this;
	    }

	    (0, _createClass3.default)(Page, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            if (_localStore.blueToothTip.isHide) this.state.showBTTip = false;
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.removeListen();
	            clearInterval(this.timer);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _action.Actions.getList();

	            _action.Actions.getDeviceData();
	            this.timer = setInterval(function () {
	                _action.Actions.getDeviceData();
	            }, 5000);
	        }
	    }, {
	        key: 'showPlayList',
	        value: function showPlayList() {
	            this.refs['playList'].toggle(true);
	        }
	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            this.setState({ showBTTip: false });
	        }
	    }, {
	        key: 'confirm',
	        value: function confirm(neverShow) {
	            neverShow && _localStore.blueToothTip.hide();
	            this.setState({ showBTTip: false });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _state = this.state;
	            var currInfo = _state.currInfo;
	            var playStatus = _state.playStatus;
	            var playSource = _state.playSource;
	            var showBTTip = _state.showBTTip;


	            var showFooter = true;
	            this.hideFooterArr.forEach(function (item, i) {
	                if (location.hash.indexOf(item) != -1) showFooter = false;
	            });
	            return React.createElement(
	                'div',
	                { className: 'container' },
	                React.cloneElement(this.props.children, _.extend({ showPlayList: this.showPlayList.bind(this) }, this.state)),
	                showFooter && React.createElement(
	                    'footer',
	                    { className: 'footer' },
	                    React.createElement(_salver2.default, { info: currInfo, playStatus: playStatus, showPlayList: this.showPlayList.bind(this) })
	                ),
	                React.createElement(_playList2.default, { list: this.state.list, playSource: playSource, currId: currInfo ? currInfo.mid : -1, ref: 'playList' }),
	                showBTTip && React.createElement(_blueToothTip2.default, { onCancel: this.cancel.bind(this), onConfirm: this.confirm.bind(this) })
	            );
	        }
	    }]);
	    return Page;
	}(React.Component);

	exports.default = Page;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	module.exports = __webpack_require__(18).Object.getPrototypeOf;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(8)
	  , $getPrototypeOf = __webpack_require__(10);

	__webpack_require__(16)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(9);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(11)
	  , toObject    = __webpack_require__(8)
	  , IE_PROTO    = __webpack_require__(12)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(13)('keys')
	  , uid    = __webpack_require__(15);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(14)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(17)
	  , core    = __webpack_require__(18)
	  , fails   = __webpack_require__(27);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(14)
	  , core      = __webpack_require__(18)
	  , ctx       = __webpack_require__(19)
	  , hide      = __webpack_require__(21)
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
/* 18 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(20);
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
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(22)
	  , createDesc = __webpack_require__(30);
	module.exports = __webpack_require__(26) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(23)
	  , IE8_DOM_DEFINE = __webpack_require__(25)
	  , toPrimitive    = __webpack_require__(29)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(26) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(26) && !__webpack_require__(27)(function(){
	  return Object.defineProperty(__webpack_require__(28)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(27)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24)
	  , document = __webpack_require__(14).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(24);
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
/* 30 */
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
/* 31 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(33);

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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(34), __esModule: true };

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(35);
	var $Object = __webpack_require__(18).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(17);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(26), 'Object', {defineProperty: __webpack_require__(22).f});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(37);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(38);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(67);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(39), __esModule: true };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(40);
	__webpack_require__(62);
	module.exports = __webpack_require__(66).f('iterator');

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(41)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(43)(String, 'String', function(iterated){
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , defined   = __webpack_require__(9);
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
/* 42 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(44)
	  , $export        = __webpack_require__(17)
	  , redefine       = __webpack_require__(45)
	  , hide           = __webpack_require__(21)
	  , has            = __webpack_require__(11)
	  , Iterators      = __webpack_require__(46)
	  , $iterCreate    = __webpack_require__(47)
	  , setToStringTag = __webpack_require__(60)
	  , getPrototypeOf = __webpack_require__(10)
	  , ITERATOR       = __webpack_require__(61)('iterator')
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
/* 44 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(48)
	  , descriptor     = __webpack_require__(30)
	  , setToStringTag = __webpack_require__(60)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(21)(IteratorPrototype, __webpack_require__(61)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(23)
	  , dPs         = __webpack_require__(49)
	  , enumBugKeys = __webpack_require__(58)
	  , IE_PROTO    = __webpack_require__(12)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(28)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(59).appendChild(iframe);
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(22)
	  , anObject = __webpack_require__(23)
	  , getKeys  = __webpack_require__(50);

	module.exports = __webpack_require__(26) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(51)
	  , enumBugKeys = __webpack_require__(58);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(11)
	  , toIObject    = __webpack_require__(52)
	  , arrayIndexOf = __webpack_require__(55)(false)
	  , IE_PROTO     = __webpack_require__(12)('IE_PROTO');

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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(53)
	  , defined = __webpack_require__(9);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(54);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(52)
	  , toLength  = __webpack_require__(56)
	  , toIndex   = __webpack_require__(57);
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(42)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14).document && document.documentElement;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(22).f
	  , has = __webpack_require__(11)
	  , TAG = __webpack_require__(61)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(13)('wks')
	  , uid        = __webpack_require__(15)
	  , Symbol     = __webpack_require__(14).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	var global        = __webpack_require__(14)
	  , hide          = __webpack_require__(21)
	  , Iterators     = __webpack_require__(46)
	  , TO_STRING_TAG = __webpack_require__(61)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(64)
	  , step             = __webpack_require__(65)
	  , Iterators        = __webpack_require__(46)
	  , toIObject        = __webpack_require__(52);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(43)(Array, 'Array', function(iterated, kind){
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
/* 64 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(61);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(82);
	module.exports = __webpack_require__(18).Symbol;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(14)
	  , has            = __webpack_require__(11)
	  , DESCRIPTORS    = __webpack_require__(26)
	  , $export        = __webpack_require__(17)
	  , redefine       = __webpack_require__(45)
	  , META           = __webpack_require__(70).KEY
	  , $fails         = __webpack_require__(27)
	  , shared         = __webpack_require__(13)
	  , setToStringTag = __webpack_require__(60)
	  , uid            = __webpack_require__(15)
	  , wks            = __webpack_require__(61)
	  , wksExt         = __webpack_require__(66)
	  , wksDefine      = __webpack_require__(71)
	  , keyOf          = __webpack_require__(72)
	  , enumKeys       = __webpack_require__(73)
	  , isArray        = __webpack_require__(76)
	  , anObject       = __webpack_require__(23)
	  , toIObject      = __webpack_require__(52)
	  , toPrimitive    = __webpack_require__(29)
	  , createDesc     = __webpack_require__(30)
	  , _create        = __webpack_require__(48)
	  , gOPNExt        = __webpack_require__(77)
	  , $GOPD          = __webpack_require__(79)
	  , $DP            = __webpack_require__(22)
	  , $keys          = __webpack_require__(50)
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
	  __webpack_require__(78).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(75).f  = $propertyIsEnumerable;
	  __webpack_require__(74).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(44)){
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(21)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(15)('meta')
	  , isObject = __webpack_require__(24)
	  , has      = __webpack_require__(11)
	  , setDesc  = __webpack_require__(22).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(27)(function(){
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(14)
	  , core           = __webpack_require__(18)
	  , LIBRARY        = __webpack_require__(44)
	  , wksExt         = __webpack_require__(66)
	  , defineProperty = __webpack_require__(22).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(50)
	  , toIObject = __webpack_require__(52);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(50)
	  , gOPS    = __webpack_require__(74)
	  , pIE     = __webpack_require__(75);
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
/* 74 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 75 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(54);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(52)
	  , gOPN      = __webpack_require__(78).f
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(51)
	  , hiddenKeys = __webpack_require__(58).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(75)
	  , createDesc     = __webpack_require__(30)
	  , toIObject      = __webpack_require__(52)
	  , toPrimitive    = __webpack_require__(29)
	  , has            = __webpack_require__(11)
	  , IE8_DOM_DEFINE = __webpack_require__(25)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(26) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71)('asyncIterator');

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71)('observable');

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(84);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(88);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(37);

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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	module.exports = __webpack_require__(18).Object.setPrototypeOf;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(17);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(87).set});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(24)
	  , anObject = __webpack_require__(23);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(19)(Function.call, __webpack_require__(79).f(Object.prototype, '__proto__').set, 2);
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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90);
	var $Object = __webpack_require__(18).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(17)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(48)});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _action = __webpack_require__(92);

	var _const = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Slaver = function (_React$Component) {
		(0, _inherits3.default)(Slaver, _React$Component);

		function Slaver() {
			(0, _classCallCheck3.default)(this, Slaver);
			return (0, _possibleConstructorReturn3.default)(this, (Slaver.__proto__ || (0, _getPrototypeOf2.default)(Slaver)).apply(this, arguments));
		}

		(0, _createClass3.default)(Slaver, [{
			key: 'playOrPause',
			value: function playOrPause(playing) {
				_action.Actions.playOrPause(playing);
				this.setState({});
			}
		}, {
			key: 'link',
			value: function link() {
				location.hash = '#/player';
			}
		}, {
			key: 'render',
			value: function render() {
				var _props$info = this.props.info;
				var msi = _props$info.msi;
				var name = _props$info.name;
				var artist = _props$info.artist;

				var playing = this.props.playStatus == _const.PlayStatus.PLAY;

				return React.createElement(
					'div',
					{ className: 'salver' },
					React.createElement(
						'div',
						{ className: 'img_wrap', onTouchTap: this.link },
						React.createElement('img', { className: playing ? 'music_img' : '', src: msi || '../static/imgs/pic-40@2x.png' })
					),
					React.createElement(
						'div',
						{ className: 'base_info', onTouchTap: this.link },
						name ? name + '-' + artist : '无歌曲'
					),
					React.createElement(
						'div',
						{ className: 'switch' },
						React.createElement('i', { className: playing ? 'start' : 'stop', onTouchEnd: this.playOrPause.bind(this, playing) })
					),
					React.createElement(
						'div',
						{ className: 'more', onTouchTap: this.props.showPlayList },
						React.createElement('i', null)
					)
				);
			}
		}]);
		return Slaver;
	}(React.Component);

	exports.default = Slaver;

/***/ },
/* 92 */
/***/ function(module, exports) {

	
	'use strict';
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['playOrPause', 'prev', 'next', 'getList', 'playInternalMusic', 'getDeviceData', 'changeMode', 'remove', 'clear', 'change', 'addToNext', 'playNetWorkMusic']);

/***/ },
/* 93 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	// 播放模式
	var PlayMode = exports.PlayMode = {
		ORDER: 0, // 顺序播放
		SINGLE: 1, // 单曲循环
		RANDOM: 3 };

	// 播放状态
	var PlayStatus = exports.PlayStatus = {
		PLAY: 1, // 播放
		PAUSE: 2 };

	// 播放操作
	var PlayOper = exports.PlayOper = {
		PREV: 1, // 上一曲
		NEXT: 2 };

	// 播放源
	var PlaySource = exports.PlaySource = {
		INTERNAL: 1, // 设备内置音乐（设备内置T卡播放）
		NETWORK: 2 };

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	var _action = __webpack_require__(92);

	var _const = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PlayList = function (_React$Component) {
		(0, _inherits3.default)(PlayList, _React$Component);

		function PlayList(props) {
			(0, _classCallCheck3.default)(this, PlayList);

			var _this = (0, _possibleConstructorReturn3.default)(this, (PlayList.__proto__ || (0, _getPrototypeOf2.default)(PlayList)).call(this, props));

			_this.state = {
				show: true
			};

			_this.state.show = props.show;
			return _this;
		}

		(0, _createClass3.default)(PlayList, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.myScroll = new _iscrollProbe2.default('#listWrap', { mouseWheel: true });
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				this.refreshScroll();
			}

			/* 当滚动内容区域尺寸变化后需要重新计算 */

		}, {
			key: 'refreshScroll',
			value: function refreshScroll() {
				var _this2 = this;

				setTimeout(function () {
					_this2.myScroll.refresh();
				}, 0);
			}
		}, {
			key: 'del',
			value: function del(id, e) {
				_action.Actions.remove(id);
				e.stopPropagation();
			}
		}, {
			key: 'toggle',
			value: function toggle(isShow) {
				var _this3 = this;

				setTimeout(function () {
					_this3.show = true;
					_this3.setState({ show: isShow });
				}, 10);
			}
		}, {
			key: 'clearList',
			value: function clearList() {
				_action.Actions.clear();
			}
		}, {
			key: 'render',
			value: function render() {
				var _this4 = this;

				var _props = this.props;
				var currId = _props.currId;
				var list = _props.list;
				var playSource = _props.playSource;var arr;

				if (list.length) {
					arr = list.map(function (item, i) {
						var mid = item.mid;
						var name = item.name;
						var artist = item.artist;


						return React.createElement(
							'li',
							{ key: i, className: '' + (currId == mid ? 'selected' : ''), onTouchTap: _action.Actions.change.bind(_this4, mid) },
							React.createElement(
								'div',
								null,
								React.createElement(
									'span',
									{ className: 'pl_title' },
									name
								),
								playSource == _const.PlaySource.NETWORK && React.createElement(
									'span',
									{ className: 'singer' },
									artist
								),
								React.createElement(
									'span',
									{ className: 'icon_wrap' },
									React.createElement('i', { className: 'playing_icon' })
								),
								playSource == _const.PlaySource.NETWORK && React.createElement(
									'span',
									{ className: 'del_icon_wrap', onTouchTap: _this4.del.bind(_this4, mid) },
									React.createElement('i', { className: 'del_icon' })
								)
							)
						);
					});
				} else {
					arr = React.createElement(
						'div',
						{ className: 'empty_playlist' },
						'\u64AD\u653E\u5217\u8868\u65E0\u6B4C\u66F2'
					);
				}

				var show = this.state.show;

				return React.createElement(
					'div',
					{ className: 'dim_wrap ' + (this.show ? show ? 'ashow' : 'ahide' : '') },
					React.createElement('div', { className: 'dim ' + (show ? 'show' : 'hide'), onTouchTap: this.toggle.bind(this, false) }),
					React.createElement(
						'div',
						{ className: 'playlist' },
						React.createElement(
							'div',
							{ className: 'top_line' },
							React.createElement(
								'span',
								null,
								'\u64AD\u653E\u5217\u8868'
							),
							playSource == _const.PlaySource.NETWORK && React.createElement('i', { className: 'clear_icon', onTouchTap: this.clearList.bind(this) })
						),
						React.createElement(
							'div',
							{ className: 'list_wrap', id: 'listWrap' },
							React.createElement(
								'ul',
								null,
								arr
							)
						),
						React.createElement(
							'div',
							{ className: 'bottom_line', onTouchTap: this.toggle.bind(this, false) },
							React.createElement(
								'span',
								null,
								'\u5173\u95ED'
							)
						)
					)
				);
			}
		}]);
		return PlayList;
	}(React.Component);

	exports.default = PlayList;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(37);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*! iScroll v5.1.2 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */
	(function (window, document, Math) {
		var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};

		var utils = function () {
			var me = {};

			var _elementStyle = document.createElement('div').style;
			var _vendor = function () {
				var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				    transform,
				    i = 0,
				    l = vendors.length;

				for (; i < l; i++) {
					transform = vendors[i] + 'ransform';
					if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
				}

				return false;
			}();

			function _prefixStyle(style) {
				if (_vendor === false) return false;
				if (_vendor === '') return style;
				return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
			}

			me.getTime = Date.now || function getTime() {
				return new Date().getTime();
			};

			me.extend = function (target, obj) {
				for (var i in obj) {
					target[i] = obj[i];
				}
			};

			me.addEvent = function (el, type, fn, capture) {
				el.addEventListener(type, fn, !!capture);
			};

			me.removeEvent = function (el, type, fn, capture) {
				el.removeEventListener(type, fn, !!capture);
			};

			me.prefixPointerEvent = function (pointerEvent) {
				return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) : pointerEvent;
			};

			me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
				var distance = current - start,
				    speed = Math.abs(distance) / time,
				    destination,
				    duration;

				deceleration = deceleration === undefined ? 0.0006 : deceleration;

				destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
				duration = speed / deceleration;

				if (destination < lowerMargin) {
					destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
					distance = Math.abs(destination - current);
					duration = distance / speed;
				} else if (destination > 0) {
					destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
					distance = Math.abs(current) + destination;
					duration = distance / speed;
				}

				return {
					destination: Math.round(destination),
					duration: duration
				};
			};

			var _transform = _prefixStyle('transform');

			me.extend(me, {
				hasTransform: _transform !== false,
				hasPerspective: _prefixStyle('perspective') in _elementStyle,
				hasTouch: 'ontouchstart' in window,
				hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
				hasTransition: _prefixStyle('transition') in _elementStyle
			});

			// This should find all Android browsers lower than build 535.19 (both stock browser and webview)
			me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion);

			me.extend(me.style = {}, {
				transform: _transform,
				transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
				transitionDuration: _prefixStyle('transitionDuration'),
				transitionDelay: _prefixStyle('transitionDelay'),
				transformOrigin: _prefixStyle('transformOrigin')
			});

			me.hasClass = function (e, c) {
				var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
				return re.test(e.className);
			};

			me.addClass = function (e, c) {
				if (me.hasClass(e, c)) {
					return;
				}

				var newclass = e.className.split(' ');
				newclass.push(c);
				e.className = newclass.join(' ');
			};

			me.removeClass = function (e, c) {
				if (!me.hasClass(e, c)) {
					return;
				}

				var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
				e.className = e.className.replace(re, ' ');
			};

			me.offset = function (el) {
				var left = -el.offsetLeft,
				    top = -el.offsetTop;

				// jshint -W084
				while (el = el.offsetParent) {
					left -= el.offsetLeft;
					top -= el.offsetTop;
				}
				// jshint +W084

				return {
					left: left,
					top: top
				};
			};

			me.preventDefaultException = function (el, exceptions) {
				for (var i in exceptions) {
					if (exceptions[i].test(el[i])) {
						return true;
					}
				}

				return false;
			};

			me.extend(me.eventType = {}, {
				touchstart: 1,
				touchmove: 1,
				touchend: 1,

				mousedown: 2,
				mousemove: 2,
				mouseup: 2,

				pointerdown: 3,
				pointermove: 3,
				pointerup: 3,

				MSPointerDown: 3,
				MSPointerMove: 3,
				MSPointerUp: 3
			});

			me.extend(me.ease = {}, {
				quadratic: {
					style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
					fn: function fn(k) {
						return k * (2 - k);
					}
				},
				circular: {
					style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
					fn: function fn(k) {
						return Math.sqrt(1 - --k * k);
					}
				},
				back: {
					style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
					fn: function fn(k) {
						var b = 4;
						return (k = k - 1) * k * ((b + 1) * k + b) + 1;
					}
				},
				bounce: {
					style: '',
					fn: function fn(k) {
						if ((k /= 1) < 1 / 2.75) {
							return 7.5625 * k * k;
						} else if (k < 2 / 2.75) {
							return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
						} else if (k < 2.5 / 2.75) {
							return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
						} else {
							return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
						}
					}
				},
				elastic: {
					style: '',
					fn: function fn(k) {
						var f = 0.22,
						    e = 0.4;

						if (k === 0) {
							return 0;
						}
						if (k == 1) {
							return 1;
						}

						return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
					}
				}
			});

			me.tap = function (e, eventName) {
				var ev = document.createEvent('Event');
				ev.initEvent(eventName, true, true);
				ev.pageX = e.pageX;
				ev.pageY = e.pageY;
				e.target.dispatchEvent(ev);
			};

			me.click = function (e) {
				var target = e.target,
				    ev;

				if (!/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName)) {
					ev = document.createEvent('MouseEvents');
					ev.initMouseEvent('click', true, true, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);

					ev._constructed = true;
					target.dispatchEvent(ev);
				}
			};

			return me;
		}();

		function IScroll(el, options) {
			this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
			this.scroller = this.wrapper.children[0];
			this.scrollerStyle = this.scroller.style; // cache style for better performance

			this.options = {

				resizeScrollbars: true,

				mouseWheelSpeed: 20,

				snapThreshold: 0.334,

				// INSERT POINT: OPTIONS 

				startX: 0,
				startY: 0,
				scrollY: true,
				directionLockThreshold: 5,
				momentum: true,

				bounce: true,
				bounceTime: 600,
				bounceEasing: '',

				preventDefault: true,
				preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

				HWCompositing: true,
				useTransition: true,
				useTransform: true
			};

			for (var i in options) {
				this.options[i] = options[i];
			}

			// Normalize options
			this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

			this.options.useTransition = utils.hasTransition && this.options.useTransition;
			this.options.useTransform = utils.hasTransform && this.options.useTransform;

			this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
			this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

			// If you want eventPassthrough I have to lock one of the axes
			this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
			this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

			// With eventPassthrough we also need lockDirection mechanism
			this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
			this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

			this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

			this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

			if (this.options.tap === true) {
				this.options.tap = 'tap';
			}

			if (this.options.shrinkScrollbars == 'scale') {
				this.options.useTransition = false;
			}

			this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

			if (this.options.probeType == 3) {
				this.options.useTransition = false;
			}

			// INSERT POINT: NORMALIZATION

			// Some defaults	
			this.x = 0;
			this.y = 0;
			this.directionX = 0;
			this.directionY = 0;
			this._events = {};

			// INSERT POINT: DEFAULTS

			this._init();
			this.refresh();

			this.scrollTo(this.options.startX, this.options.startY);
			this.enable();
		}

		IScroll.prototype = {
			version: '5.1.2',

			_init: function _init() {
				this._initEvents();

				if (this.options.scrollbars || this.options.indicators) {
					this._initIndicators();
				}

				if (this.options.mouseWheel) {
					this._initWheel();
				}

				if (this.options.snap) {
					this._initSnap();
				}

				if (this.options.keyBindings) {
					this._initKeys();
				}

				// INSERT POINT: _init
			},

			destroy: function destroy() {
				this._initEvents(true);

				this._execEvent('destroy');
			},

			_transitionEnd: function _transitionEnd(e) {
				if (e.target != this.scroller || !this.isInTransition) {
					return;
				}

				this._transitionTime();
				if (!this.resetPosition(this.options.bounceTime)) {
					this.isInTransition = false;
					this._execEvent('scrollEnd');
				}
			},

			_start: function _start(e) {
				// React to left mouse button only
				if (utils.eventType[e.type] != 1) {
					if (e.button !== 0) {
						return;
					}
				}

				if (!this.enabled || this.initiated && utils.eventType[e.type] !== this.initiated) {
					return;
				}

				if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
					e.preventDefault();
				}

				var point = e.touches ? e.touches[0] : e,
				    pos;

				this.initiated = utils.eventType[e.type];
				this.moved = false;
				this.distX = 0;
				this.distY = 0;
				this.directionX = 0;
				this.directionY = 0;
				this.directionLocked = 0;

				this._transitionTime();

				this.startTime = utils.getTime();

				if (this.options.useTransition && this.isInTransition) {
					this.isInTransition = false;
					pos = this.getComputedPosition();
					this._translate(Math.round(pos.x), Math.round(pos.y));
					this._execEvent('scrollEnd');
				} else if (!this.options.useTransition && this.isAnimating) {
					this.isAnimating = false;
					this._execEvent('scrollEnd');
				}

				this.startX = this.x;
				this.startY = this.y;
				this.absStartX = this.x;
				this.absStartY = this.y;
				this.pointX = point.pageX;
				this.pointY = point.pageY;

				this._execEvent('beforeScrollStart');
			},

			_move: function _move(e) {
				if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
					return;
				}

				if (this.options.preventDefault) {
					// increases performance on Android? TODO: check!
					e.preventDefault();
				}

				var point = e.touches ? e.touches[0] : e,
				    deltaX = point.pageX - this.pointX,
				    deltaY = point.pageY - this.pointY,
				    timestamp = utils.getTime(),
				    newX,
				    newY,
				    absDistX,
				    absDistY;

				this.pointX = point.pageX;
				this.pointY = point.pageY;

				this.distX += deltaX;
				this.distY += deltaY;
				absDistX = Math.abs(this.distX);
				absDistY = Math.abs(this.distY);

				// We need to move at least 10 pixels for the scrolling to initiate
				if (timestamp - this.endTime > 300 && absDistX < 10 && absDistY < 10) {
					return;
				}

				// If you are scrolling in one direction lock the other
				if (!this.directionLocked && !this.options.freeScroll) {
					if (absDistX > absDistY + this.options.directionLockThreshold) {
						this.directionLocked = 'h'; // lock horizontally
					} else if (absDistY >= absDistX + this.options.directionLockThreshold) {
						this.directionLocked = 'v'; // lock vertically
					} else {
						this.directionLocked = 'n'; // no lock
					}
				}

				if (this.directionLocked == 'h') {
					if (this.options.eventPassthrough == 'vertical') {
						e.preventDefault();
					} else if (this.options.eventPassthrough == 'horizontal') {
						this.initiated = false;
						return;
					}

					deltaY = 0;
				} else if (this.directionLocked == 'v') {
					if (this.options.eventPassthrough == 'horizontal') {
						e.preventDefault();
					} else if (this.options.eventPassthrough == 'vertical') {
						this.initiated = false;
						return;
					}

					deltaX = 0;
				}

				deltaX = this.hasHorizontalScroll ? deltaX : 0;
				deltaY = this.hasVerticalScroll ? deltaY : 0;

				newX = this.x + deltaX;
				newY = this.y + deltaY;

				// Slow down if outside of the boundaries
				if (newX > 0 || newX < this.maxScrollX) {
					newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
				}
				if (newY > 0 || newY < this.maxScrollY) {
					newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
				}

				this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
				this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

				if (!this.moved) {
					this._execEvent('scrollStart');
				}

				this.moved = true;

				this._translate(newX, newY);

				/* REPLACE START: _move */
				if (timestamp - this.startTime > 300) {
					this.startTime = timestamp;
					this.startX = this.x;
					this.startY = this.y;

					if (this.options.probeType == 1) {
						this._execEvent('scroll');
					}
				}

				if (this.options.probeType > 1) {
					this._execEvent('scroll');
				}
				/* REPLACE END: _move */
			},

			_end: function _end(e) {
				if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
					return;
				}

				if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
					e.preventDefault();
				}

				var point = e.changedTouches ? e.changedTouches[0] : e,
				    momentumX,
				    momentumY,
				    duration = utils.getTime() - this.startTime,
				    newX = Math.round(this.x),
				    newY = Math.round(this.y),
				    distanceX = Math.abs(newX - this.startX),
				    distanceY = Math.abs(newY - this.startY),
				    time = 0,
				    easing = '';

				this.isInTransition = 0;
				this.initiated = 0;
				this.endTime = utils.getTime();

				// reset if we are outside of the boundaries
				if (this.resetPosition(this.options.bounceTime)) {
					return;
				}

				this.scrollTo(newX, newY); // ensures that the last position is rounded

				// we scrolled less than 10 pixels
				if (!this.moved) {
					if (this.options.tap) {
						utils.tap(e, this.options.tap);
					}

					if (this.options.click) {
						utils.click(e);
					}

					this._execEvent('scrollCancel');
					return;
				}

				if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
					this._execEvent('flick');
					return;
				}

				// start momentum animation if needed
				if (this.options.momentum && duration < 300) {
					momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
					momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
					newX = momentumX.destination;
					newY = momentumY.destination;
					time = Math.max(momentumX.duration, momentumY.duration);
					this.isInTransition = 1;
				}

				if (this.options.snap) {
					var snap = this._nearestSnap(newX, newY);
					this.currentPage = snap;
					time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
					newX = snap.x;
					newY = snap.y;

					this.directionX = 0;
					this.directionY = 0;
					easing = this.options.bounceEasing;
				}

				// INSERT POINT: _end

				if (newX != this.x || newY != this.y) {
					// change easing function when scroller goes out of the boundaries
					if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
						easing = utils.ease.quadratic;
					}

					this.scrollTo(newX, newY, time, easing);
					return;
				}

				this._execEvent('scrollEnd');
			},

			_resize: function _resize() {
				var that = this;

				clearTimeout(this.resizeTimeout);

				this.resizeTimeout = setTimeout(function () {
					that.refresh();
				}, this.options.resizePolling);
			},

			resetPosition: function resetPosition(time) {
				var x = this.x,
				    y = this.y;

				time = time || 0;

				if (!this.hasHorizontalScroll || this.x > 0) {
					x = 0;
				} else if (this.x < this.maxScrollX) {
					x = this.maxScrollX;
				}

				if (!this.hasVerticalScroll || this.y > 0) {
					y = 0;
				} else if (this.y < this.maxScrollY) {
					y = this.maxScrollY;
				}

				if (x == this.x && y == this.y) {
					return false;
				}

				this.scrollTo(x, y, time, this.options.bounceEasing);

				return true;
			},

			disable: function disable() {
				this.enabled = false;
			},

			enable: function enable() {
				this.enabled = true;
			},

			refresh: function refresh() {
				var rf = this.wrapper.offsetHeight; // Force reflow

				this.wrapperWidth = this.wrapper.clientWidth;
				this.wrapperHeight = this.wrapper.clientHeight;

				/* REPLACE START: refresh */

				this.scrollerWidth = this.scroller.offsetWidth;
				this.scrollerHeight = this.scroller.offsetHeight;

				this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
				this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

				/* REPLACE END: refresh */

				this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
				this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;

				if (!this.hasHorizontalScroll) {
					this.maxScrollX = 0;
					this.scrollerWidth = this.wrapperWidth;
				}

				if (!this.hasVerticalScroll) {
					this.maxScrollY = 0;
					this.scrollerHeight = this.wrapperHeight;
				}

				this.endTime = 0;
				this.directionX = 0;
				this.directionY = 0;

				this.wrapperOffset = utils.offset(this.wrapper);

				this._execEvent('refresh');

				this.resetPosition();

				// INSERT POINT: _refresh
			},

			on: function on(type, fn) {
				if (!this._events[type]) {
					this._events[type] = [];
				}

				this._events[type].push(fn);
			},

			off: function off(type, fn) {
				if (!this._events[type]) {
					return;
				}

				var index = this._events[type].indexOf(fn);

				if (index > -1) {
					this._events[type].splice(index, 1);
				}
			},

			_execEvent: function _execEvent(type) {
				if (!this._events[type]) {
					return;
				}

				var i = 0,
				    l = this._events[type].length;

				if (!l) {
					return;
				}

				for (; i < l; i++) {
					this._events[type][i].apply(this, [].slice.call(arguments, 1));
				}
			},

			scrollBy: function scrollBy(x, y, time, easing) {
				x = this.x + x;
				y = this.y + y;
				time = time || 0;

				this.scrollTo(x, y, time, easing);
			},

			scrollTo: function scrollTo(x, y, time, easing) {
				easing = easing || utils.ease.circular;

				this.isInTransition = this.options.useTransition && time > 0;

				if (!time || this.options.useTransition && easing.style) {
					this._transitionTimingFunction(easing.style);
					this._transitionTime(time);
					this._translate(x, y);
				} else {
					this._animate(x, y, time, easing.fn);
				}
			},

			scrollToElement: function scrollToElement(el, time, offsetX, offsetY, easing) {
				el = el.nodeType ? el : this.scroller.querySelector(el);

				if (!el) {
					return;
				}

				var pos = utils.offset(el);

				pos.left -= this.wrapperOffset.left;
				pos.top -= this.wrapperOffset.top;

				// if offsetX/Y are true we center the element to the screen
				if (offsetX === true) {
					offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
				}
				if (offsetY === true) {
					offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
				}

				pos.left -= offsetX || 0;
				pos.top -= offsetY || 0;

				pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
				pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

				time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;

				this.scrollTo(pos.left, pos.top, time, easing);
			},

			_transitionTime: function _transitionTime(time) {
				time = time || 0;

				this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

				if (!time && utils.isBadAndroid) {
					this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
				}

				if (this.indicators) {
					for (var i = this.indicators.length; i--;) {
						this.indicators[i].transitionTime(time);
					}
				}

				// INSERT POINT: _transitionTime
			},

			_transitionTimingFunction: function _transitionTimingFunction(easing) {
				this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

				if (this.indicators) {
					for (var i = this.indicators.length; i--;) {
						this.indicators[i].transitionTimingFunction(easing);
					}
				}

				// INSERT POINT: _transitionTimingFunction
			},

			_translate: function _translate(x, y) {
				if (this.options.useTransform) {

					/* REPLACE START: _translate */

					this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

					/* REPLACE END: _translate */
				} else {
					x = Math.round(x);
					y = Math.round(y);
					this.scrollerStyle.left = x + 'px';
					this.scrollerStyle.top = y + 'px';
				}

				this.x = x;
				this.y = y;

				if (this.indicators) {
					for (var i = this.indicators.length; i--;) {
						this.indicators[i].updatePosition();
					}
				}

				// INSERT POINT: _translate
			},

			_initEvents: function _initEvents(remove) {
				var eventType = remove ? utils.removeEvent : utils.addEvent,
				    target = this.options.bindToWrapper ? this.wrapper : window;

				eventType(window, 'orientationchange', this);
				eventType(window, 'resize', this);

				if (this.options.click) {
					eventType(this.wrapper, 'click', this, true);
				}

				if (!this.options.disableMouse) {
					eventType(this.wrapper, 'mousedown', this);
					eventType(target, 'mousemove', this);
					eventType(target, 'mousecancel', this);
					eventType(target, 'mouseup', this);
				}

				if (utils.hasPointer && !this.options.disablePointer) {
					eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
					eventType(target, utils.prefixPointerEvent('pointermove'), this);
					eventType(target, utils.prefixPointerEvent('pointercancel'), this);
					eventType(target, utils.prefixPointerEvent('pointerup'), this);
				}

				if (utils.hasTouch && !this.options.disableTouch) {
					eventType(this.wrapper, 'touchstart', this);
					eventType(target, 'touchmove', this);
					eventType(target, 'touchcancel', this);
					eventType(target, 'touchend', this);
				}

				eventType(this.scroller, 'transitionend', this);
				eventType(this.scroller, 'webkitTransitionEnd', this);
				eventType(this.scroller, 'oTransitionEnd', this);
				eventType(this.scroller, 'MSTransitionEnd', this);
			},

			getComputedPosition: function getComputedPosition() {
				var matrix = window.getComputedStyle(this.scroller, null),
				    x,
				    y;

				if (this.options.useTransform) {
					matrix = matrix[utils.style.transform].split(')')[0].split(', ');
					x = +(matrix[12] || matrix[4]);
					y = +(matrix[13] || matrix[5]);
				} else {
					x = +matrix.left.replace(/[^-\d.]/g, '');
					y = +matrix.top.replace(/[^-\d.]/g, '');
				}

				return { x: x, y: y };
			},

			_initIndicators: function _initIndicators() {
				var interactive = this.options.interactiveScrollbars,
				    customStyle = typeof this.options.scrollbars != 'string',
				    indicators = [],
				    indicator;

				var that = this;

				this.indicators = [];

				if (this.options.scrollbars) {
					// Vertical scrollbar
					if (this.options.scrollY) {
						indicator = {
							el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
							interactive: interactive,
							defaultScrollbars: true,
							customStyle: customStyle,
							resize: this.options.resizeScrollbars,
							shrink: this.options.shrinkScrollbars,
							fade: this.options.fadeScrollbars,
							listenX: false
						};

						this.wrapper.appendChild(indicator.el);
						indicators.push(indicator);
					}

					// Horizontal scrollbar
					if (this.options.scrollX) {
						indicator = {
							el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
							interactive: interactive,
							defaultScrollbars: true,
							customStyle: customStyle,
							resize: this.options.resizeScrollbars,
							shrink: this.options.shrinkScrollbars,
							fade: this.options.fadeScrollbars,
							listenY: false
						};

						this.wrapper.appendChild(indicator.el);
						indicators.push(indicator);
					}
				}

				if (this.options.indicators) {
					// TODO: check concat compatibility
					indicators = indicators.concat(this.options.indicators);
				}

				for (var i = indicators.length; i--;) {
					this.indicators.push(new Indicator(this, indicators[i]));
				}

				// TODO: check if we can use array.map (wide compatibility and performance issues)
				function _indicatorsMap(fn) {
					for (var i = that.indicators.length; i--;) {
						fn.call(that.indicators[i]);
					}
				}

				if (this.options.fadeScrollbars) {
					this.on('scrollEnd', function () {
						_indicatorsMap(function () {
							this.fade();
						});
					});

					this.on('scrollCancel', function () {
						_indicatorsMap(function () {
							this.fade();
						});
					});

					this.on('scrollStart', function () {
						_indicatorsMap(function () {
							this.fade(1);
						});
					});

					this.on('beforeScrollStart', function () {
						_indicatorsMap(function () {
							this.fade(1, true);
						});
					});
				}

				this.on('refresh', function () {
					_indicatorsMap(function () {
						this.refresh();
					});
				});

				this.on('destroy', function () {
					_indicatorsMap(function () {
						this.destroy();
					});

					delete this.indicators;
				});
			},

			_initWheel: function _initWheel() {
				utils.addEvent(this.wrapper, 'wheel', this);
				utils.addEvent(this.wrapper, 'mousewheel', this);
				utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

				this.on('destroy', function () {
					utils.removeEvent(this.wrapper, 'wheel', this);
					utils.removeEvent(this.wrapper, 'mousewheel', this);
					utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
				});
			},

			_wheel: function _wheel(e) {
				if (!this.enabled) {
					return;
				}

				e.preventDefault();
				e.stopPropagation();

				var wheelDeltaX,
				    wheelDeltaY,
				    newX,
				    newY,
				    that = this;

				if (this.wheelTimeout === undefined) {
					that._execEvent('scrollStart');
				}

				// Execute the scrollEnd event after 400ms the wheel stopped scrolling
				clearTimeout(this.wheelTimeout);
				this.wheelTimeout = setTimeout(function () {
					that._execEvent('scrollEnd');
					that.wheelTimeout = undefined;
				}, 400);

				if ('deltaX' in e) {
					wheelDeltaX = -e.deltaX;
					wheelDeltaY = -e.deltaY;
				} else if ('wheelDeltaX' in e) {
					wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
					wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
				} else if ('wheelDelta' in e) {
					wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
				} else if ('detail' in e) {
					wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
				} else {
					return;
				}

				wheelDeltaX *= this.options.invertWheelDirection;
				wheelDeltaY *= this.options.invertWheelDirection;

				if (!this.hasVerticalScroll) {
					wheelDeltaX = wheelDeltaY;
					wheelDeltaY = 0;
				}

				if (this.options.snap) {
					newX = this.currentPage.pageX;
					newY = this.currentPage.pageY;

					if (wheelDeltaX > 0) {
						newX--;
					} else if (wheelDeltaX < 0) {
						newX++;
					}

					if (wheelDeltaY > 0) {
						newY--;
					} else if (wheelDeltaY < 0) {
						newY++;
					}

					this.goToPage(newX, newY);

					return;
				}

				newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
				newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

				if (newX > 0) {
					newX = 0;
				} else if (newX < this.maxScrollX) {
					newX = this.maxScrollX;
				}

				if (newY > 0) {
					newY = 0;
				} else if (newY < this.maxScrollY) {
					newY = this.maxScrollY;
				}

				this.scrollTo(newX, newY, 0);

				if (this.options.probeType > 1) {
					this._execEvent('scroll');
				}

				// INSERT POINT: _wheel
			},

			_initSnap: function _initSnap() {
				this.currentPage = {};

				if (typeof this.options.snap == 'string') {
					this.options.snap = this.scroller.querySelectorAll(this.options.snap);
				}

				this.on('refresh', function () {
					var i = 0,
					    l,
					    m = 0,
					    n,
					    cx,
					    cy,
					    x = 0,
					    y,
					    stepX = this.options.snapStepX || this.wrapperWidth,
					    stepY = this.options.snapStepY || this.wrapperHeight,
					    el;

					this.pages = [];

					if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
						return;
					}

					if (this.options.snap === true) {
						cx = Math.round(stepX / 2);
						cy = Math.round(stepY / 2);

						while (x > -this.scrollerWidth) {
							this.pages[i] = [];
							l = 0;
							y = 0;

							while (y > -this.scrollerHeight) {
								this.pages[i][l] = {
									x: Math.max(x, this.maxScrollX),
									y: Math.max(y, this.maxScrollY),
									width: stepX,
									height: stepY,
									cx: x - cx,
									cy: y - cy
								};

								y -= stepY;
								l++;
							}

							x -= stepX;
							i++;
						}
					} else {
						el = this.options.snap;
						l = el.length;
						n = -1;

						for (; i < l; i++) {
							if (i === 0 || el[i].offsetLeft <= el[i - 1].offsetLeft) {
								m = 0;
								n++;
							}

							if (!this.pages[m]) {
								this.pages[m] = [];
							}

							x = Math.max(-el[i].offsetLeft, this.maxScrollX);
							y = Math.max(-el[i].offsetTop, this.maxScrollY);
							cx = x - Math.round(el[i].offsetWidth / 2);
							cy = y - Math.round(el[i].offsetHeight / 2);

							this.pages[m][n] = {
								x: x,
								y: y,
								width: el[i].offsetWidth,
								height: el[i].offsetHeight,
								cx: cx,
								cy: cy
							};

							if (x > this.maxScrollX) {
								m++;
							}
						}
					}

					this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

					// Update snap threshold if needed
					if (this.options.snapThreshold % 1 === 0) {
						this.snapThresholdX = this.options.snapThreshold;
						this.snapThresholdY = this.options.snapThreshold;
					} else {
						this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
						this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
					}
				});

				this.on('flick', function () {
					var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1000), Math.min(Math.abs(this.y - this.startY), 1000)), 300);

					this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, time);
				});
			},

			_nearestSnap: function _nearestSnap(x, y) {
				if (!this.pages.length) {
					return { x: 0, y: 0, pageX: 0, pageY: 0 };
				}

				var i = 0,
				    l = this.pages.length,
				    m = 0;

				// Check if we exceeded the snap threshold
				if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
					return this.currentPage;
				}

				if (x > 0) {
					x = 0;
				} else if (x < this.maxScrollX) {
					x = this.maxScrollX;
				}

				if (y > 0) {
					y = 0;
				} else if (y < this.maxScrollY) {
					y = this.maxScrollY;
				}

				for (; i < l; i++) {
					if (x >= this.pages[i][0].cx) {
						x = this.pages[i][0].x;
						break;
					}
				}

				l = this.pages[i].length;

				for (; m < l; m++) {
					if (y >= this.pages[0][m].cy) {
						y = this.pages[0][m].y;
						break;
					}
				}

				if (i == this.currentPage.pageX) {
					i += this.directionX;

					if (i < 0) {
						i = 0;
					} else if (i >= this.pages.length) {
						i = this.pages.length - 1;
					}

					x = this.pages[i][0].x;
				}

				if (m == this.currentPage.pageY) {
					m += this.directionY;

					if (m < 0) {
						m = 0;
					} else if (m >= this.pages[0].length) {
						m = this.pages[0].length - 1;
					}

					y = this.pages[0][m].y;
				}

				return {
					x: x,
					y: y,
					pageX: i,
					pageY: m
				};
			},

			goToPage: function goToPage(x, y, time, easing) {
				easing = easing || this.options.bounceEasing;

				if (x >= this.pages.length) {
					x = this.pages.length - 1;
				} else if (x < 0) {
					x = 0;
				}

				if (y >= this.pages[x].length) {
					y = this.pages[x].length - 1;
				} else if (y < 0) {
					y = 0;
				}

				var posX = this.pages[x][y].x,
				    posY = this.pages[x][y].y;

				time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;

				this.currentPage = {
					x: posX,
					y: posY,
					pageX: x,
					pageY: y
				};

				this.scrollTo(posX, posY, time, easing);
			},

			next: function next(time, easing) {
				var x = this.currentPage.pageX,
				    y = this.currentPage.pageY;

				x++;

				if (x >= this.pages.length && this.hasVerticalScroll) {
					x = 0;
					y++;
				}

				this.goToPage(x, y, time, easing);
			},

			prev: function prev(time, easing) {
				var x = this.currentPage.pageX,
				    y = this.currentPage.pageY;

				x--;

				if (x < 0 && this.hasVerticalScroll) {
					x = 0;
					y--;
				}

				this.goToPage(x, y, time, easing);
			},

			_initKeys: function _initKeys(e) {
				// default key bindings
				var keys = {
					pageUp: 33,
					pageDown: 34,
					end: 35,
					home: 36,
					left: 37,
					up: 38,
					right: 39,
					down: 40
				};
				var i;

				// if you give me characters I give you keycode
				if ((0, _typeof3.default)(this.options.keyBindings) == 'object') {
					for (i in this.options.keyBindings) {
						if (typeof this.options.keyBindings[i] == 'string') {
							this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
						}
					}
				} else {
					this.options.keyBindings = {};
				}

				for (i in keys) {
					this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
				}

				utils.addEvent(window, 'keydown', this);

				this.on('destroy', function () {
					utils.removeEvent(window, 'keydown', this);
				});
			},

			_key: function _key(e) {
				if (!this.enabled) {
					return;
				}

				var snap = this.options.snap,
				    // we are using this alot, better to cache it
				newX = snap ? this.currentPage.pageX : this.x,
				    newY = snap ? this.currentPage.pageY : this.y,
				    now = utils.getTime(),
				    prevTime = this.keyTime || 0,
				    acceleration = 0.250,
				    pos;

				if (this.options.useTransition && this.isInTransition) {
					pos = this.getComputedPosition();

					this._translate(Math.round(pos.x), Math.round(pos.y));
					this.isInTransition = false;
				}

				this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

				switch (e.keyCode) {
					case this.options.keyBindings.pageUp:
						if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
							newX += snap ? 1 : this.wrapperWidth;
						} else {
							newY += snap ? 1 : this.wrapperHeight;
						}
						break;
					case this.options.keyBindings.pageDown:
						if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
							newX -= snap ? 1 : this.wrapperWidth;
						} else {
							newY -= snap ? 1 : this.wrapperHeight;
						}
						break;
					case this.options.keyBindings.end:
						newX = snap ? this.pages.length - 1 : this.maxScrollX;
						newY = snap ? this.pages[0].length - 1 : this.maxScrollY;
						break;
					case this.options.keyBindings.home:
						newX = 0;
						newY = 0;
						break;
					case this.options.keyBindings.left:
						newX += snap ? -1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.up:
						newY += snap ? 1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.right:
						newX -= snap ? -1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.down:
						newY -= snap ? 1 : 5 + this.keyAcceleration >> 0;
						break;
					default:
						return;
				}

				if (snap) {
					this.goToPage(newX, newY);
					return;
				}

				if (newX > 0) {
					newX = 0;
					this.keyAcceleration = 0;
				} else if (newX < this.maxScrollX) {
					newX = this.maxScrollX;
					this.keyAcceleration = 0;
				}

				if (newY > 0) {
					newY = 0;
					this.keyAcceleration = 0;
				} else if (newY < this.maxScrollY) {
					newY = this.maxScrollY;
					this.keyAcceleration = 0;
				}

				this.scrollTo(newX, newY, 0);

				this.keyTime = now;
			},

			_animate: function _animate(destX, destY, duration, easingFn) {
				var that = this,
				    startX = this.x,
				    startY = this.y,
				    startTime = utils.getTime(),
				    destTime = startTime + duration;

				function step() {
					var now = utils.getTime(),
					    newX,
					    newY,
					    easing;

					if (now >= destTime) {
						that.isAnimating = false;
						that._translate(destX, destY);

						if (!that.resetPosition(that.options.bounceTime)) {
							that._execEvent('scrollEnd');
						}

						return;
					}

					now = (now - startTime) / duration;
					easing = easingFn(now);
					newX = (destX - startX) * easing + startX;
					newY = (destY - startY) * easing + startY;
					that._translate(newX, newY);

					if (that.isAnimating) {
						rAF(step);
					}

					if (that.options.probeType == 3) {
						that._execEvent('scroll');
					}
				}

				this.isAnimating = true;
				step();
			},

			handleEvent: function handleEvent(e) {
				switch (e.type) {
					case 'touchstart':
					case 'pointerdown':
					case 'MSPointerDown':
					case 'mousedown':
						this._start(e);
						break;
					case 'touchmove':
					case 'pointermove':
					case 'MSPointerMove':
					case 'mousemove':
						this._move(e);
						break;
					case 'touchend':
					case 'pointerup':
					case 'MSPointerUp':
					case 'mouseup':
					case 'touchcancel':
					case 'pointercancel':
					case 'MSPointerCancel':
					case 'mousecancel':
						this._end(e);
						break;
					case 'orientationchange':
					case 'resize':
						this._resize();
						break;
					case 'transitionend':
					case 'webkitTransitionEnd':
					case 'oTransitionEnd':
					case 'MSTransitionEnd':
						this._transitionEnd(e);
						break;
					case 'wheel':
					case 'DOMMouseScroll':
					case 'mousewheel':
						this._wheel(e);
						break;
					case 'keydown':
						this._key(e);
						break;
					case 'click':
						if (!e._constructed) {
							e.preventDefault();
							e.stopPropagation();
						}
						break;
				}
			}
		};
		function createDefaultScrollbar(direction, interactive, type) {
			var scrollbar = document.createElement('div'),
			    indicator = document.createElement('div');

			if (type === true) {
				scrollbar.style.cssText = 'position:absolute;z-index:9999';
				indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
			}

			indicator.className = 'iScrollIndicator';

			if (direction == 'h') {
				if (type === true) {
					scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
					indicator.style.height = '100%';
				}
				scrollbar.className = 'iScrollHorizontalScrollbar';
			} else {
				if (type === true) {
					scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
					indicator.style.width = '100%';
				}
				scrollbar.className = 'iScrollVerticalScrollbar';
			}

			scrollbar.style.cssText += ';overflow:hidden';

			if (!interactive) {
				scrollbar.style.pointerEvents = 'none';
			}

			scrollbar.appendChild(indicator);

			return scrollbar;
		}

		function Indicator(scroller, options) {
			this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
			this.wrapperStyle = this.wrapper.style;
			this.indicator = this.wrapper.children[0];
			this.indicatorStyle = this.indicator.style;
			this.scroller = scroller;

			this.options = {
				listenX: true,
				listenY: true,
				interactive: false,
				resize: true,
				defaultScrollbars: false,
				shrink: false,
				fade: false,
				speedRatioX: 0,
				speedRatioY: 0
			};

			for (var i in options) {
				this.options[i] = options[i];
			}

			this.sizeRatioX = 1;
			this.sizeRatioY = 1;
			this.maxPosX = 0;
			this.maxPosY = 0;

			if (this.options.interactive) {
				if (!this.options.disableTouch) {
					utils.addEvent(this.indicator, 'touchstart', this);
					utils.addEvent(window, 'touchend', this);
				}
				if (!this.options.disablePointer) {
					utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
					utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
				}
				if (!this.options.disableMouse) {
					utils.addEvent(this.indicator, 'mousedown', this);
					utils.addEvent(window, 'mouseup', this);
				}
			}

			if (this.options.fade) {
				this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
				this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';
				this.wrapperStyle.opacity = '0';
			}
		}

		Indicator.prototype = {
			handleEvent: function handleEvent(e) {
				switch (e.type) {
					case 'touchstart':
					case 'pointerdown':
					case 'MSPointerDown':
					case 'mousedown':
						this._start(e);
						break;
					case 'touchmove':
					case 'pointermove':
					case 'MSPointerMove':
					case 'mousemove':
						this._move(e);
						break;
					case 'touchend':
					case 'pointerup':
					case 'MSPointerUp':
					case 'mouseup':
					case 'touchcancel':
					case 'pointercancel':
					case 'MSPointerCancel':
					case 'mousecancel':
						this._end(e);
						break;
				}
			},

			destroy: function destroy() {
				if (this.options.interactive) {
					utils.removeEvent(this.indicator, 'touchstart', this);
					utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
					utils.removeEvent(this.indicator, 'mousedown', this);

					utils.removeEvent(window, 'touchmove', this);
					utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
					utils.removeEvent(window, 'mousemove', this);

					utils.removeEvent(window, 'touchend', this);
					utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
					utils.removeEvent(window, 'mouseup', this);
				}

				if (this.options.defaultScrollbars) {
					this.wrapper.parentNode.removeChild(this.wrapper);
				}
			},

			_start: function _start(e) {
				var point = e.touches ? e.touches[0] : e;

				e.preventDefault();
				e.stopPropagation();

				this.transitionTime();

				this.initiated = true;
				this.moved = false;
				this.lastPointX = point.pageX;
				this.lastPointY = point.pageY;

				this.startTime = utils.getTime();

				if (!this.options.disableTouch) {
					utils.addEvent(window, 'touchmove', this);
				}
				if (!this.options.disablePointer) {
					utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
				}
				if (!this.options.disableMouse) {
					utils.addEvent(window, 'mousemove', this);
				}

				this.scroller._execEvent('beforeScrollStart');
			},

			_move: function _move(e) {
				var point = e.touches ? e.touches[0] : e,
				    deltaX,
				    deltaY,
				    newX,
				    newY,
				    timestamp = utils.getTime();

				if (!this.moved) {
					this.scroller._execEvent('scrollStart');
				}

				this.moved = true;

				deltaX = point.pageX - this.lastPointX;
				this.lastPointX = point.pageX;

				deltaY = point.pageY - this.lastPointY;
				this.lastPointY = point.pageY;

				newX = this.x + deltaX;
				newY = this.y + deltaY;

				this._pos(newX, newY);

				if (this.scroller.options.probeType == 1 && timestamp - this.startTime > 300) {
					this.startTime = timestamp;
					this.scroller._execEvent('scroll');
				} else if (this.scroller.options.probeType > 1) {
					this.scroller._execEvent('scroll');
				}

				// INSERT POINT: indicator._move

				e.preventDefault();
				e.stopPropagation();
			},

			_end: function _end(e) {
				if (!this.initiated) {
					return;
				}

				this.initiated = false;

				e.preventDefault();
				e.stopPropagation();

				utils.removeEvent(window, 'touchmove', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
				utils.removeEvent(window, 'mousemove', this);

				if (this.scroller.options.snap) {
					var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

					var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);

					if (this.scroller.x != snap.x || this.scroller.y != snap.y) {
						this.scroller.directionX = 0;
						this.scroller.directionY = 0;
						this.scroller.currentPage = snap;
						this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
					}
				}

				if (this.moved) {
					this.scroller._execEvent('scrollEnd');
				}
			},

			transitionTime: function transitionTime(time) {
				time = time || 0;
				this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';

				if (!time && utils.isBadAndroid) {
					this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
				}
			},

			transitionTimingFunction: function transitionTimingFunction(easing) {
				this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
			},

			refresh: function refresh() {
				this.transitionTime();

				if (this.options.listenX && !this.options.listenY) {
					this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
				} else if (this.options.listenY && !this.options.listenX) {
					this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
				} else {
					this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
				}

				if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
					utils.addClass(this.wrapper, 'iScrollBothScrollbars');
					utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

					if (this.options.defaultScrollbars && this.options.customStyle) {
						if (this.options.listenX) {
							this.wrapper.style.right = '8px';
						} else {
							this.wrapper.style.bottom = '8px';
						}
					}
				} else {
					utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
					utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

					if (this.options.defaultScrollbars && this.options.customStyle) {
						if (this.options.listenX) {
							this.wrapper.style.right = '2px';
						} else {
							this.wrapper.style.bottom = '2px';
						}
					}
				}

				var r = this.wrapper.offsetHeight; // force refresh

				if (this.options.listenX) {
					this.wrapperWidth = this.wrapper.clientWidth;
					if (this.options.resize) {
						this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
						this.indicatorStyle.width = this.indicatorWidth + 'px';
					} else {
						this.indicatorWidth = this.indicator.clientWidth;
					}

					this.maxPosX = this.wrapperWidth - this.indicatorWidth;

					if (this.options.shrink == 'clip') {
						this.minBoundaryX = -this.indicatorWidth + 8;
						this.maxBoundaryX = this.wrapperWidth - 8;
					} else {
						this.minBoundaryX = 0;
						this.maxBoundaryX = this.maxPosX;
					}

					this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX;
				}

				if (this.options.listenY) {
					this.wrapperHeight = this.wrapper.clientHeight;
					if (this.options.resize) {
						this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
						this.indicatorStyle.height = this.indicatorHeight + 'px';
					} else {
						this.indicatorHeight = this.indicator.clientHeight;
					}

					this.maxPosY = this.wrapperHeight - this.indicatorHeight;

					if (this.options.shrink == 'clip') {
						this.minBoundaryY = -this.indicatorHeight + 8;
						this.maxBoundaryY = this.wrapperHeight - 8;
					} else {
						this.minBoundaryY = 0;
						this.maxBoundaryY = this.maxPosY;
					}

					this.maxPosY = this.wrapperHeight - this.indicatorHeight;
					this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY;
				}

				this.updatePosition();
			},

			updatePosition: function updatePosition() {
				var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
				    y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

				if (!this.options.ignoreBoundaries) {
					if (x < this.minBoundaryX) {
						if (this.options.shrink == 'scale') {
							this.width = Math.max(this.indicatorWidth + x, 8);
							this.indicatorStyle.width = this.width + 'px';
						}
						x = this.minBoundaryX;
					} else if (x > this.maxBoundaryX) {
						if (this.options.shrink == 'scale') {
							this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
							this.indicatorStyle.width = this.width + 'px';
							x = this.maxPosX + this.indicatorWidth - this.width;
						} else {
							x = this.maxBoundaryX;
						}
					} else if (this.options.shrink == 'scale' && this.width != this.indicatorWidth) {
						this.width = this.indicatorWidth;
						this.indicatorStyle.width = this.width + 'px';
					}

					if (y < this.minBoundaryY) {
						if (this.options.shrink == 'scale') {
							this.height = Math.max(this.indicatorHeight + y * 3, 8);
							this.indicatorStyle.height = this.height + 'px';
						}
						y = this.minBoundaryY;
					} else if (y > this.maxBoundaryY) {
						if (this.options.shrink == 'scale') {
							this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
							this.indicatorStyle.height = this.height + 'px';
							y = this.maxPosY + this.indicatorHeight - this.height;
						} else {
							y = this.maxBoundaryY;
						}
					} else if (this.options.shrink == 'scale' && this.height != this.indicatorHeight) {
						this.height = this.indicatorHeight;
						this.indicatorStyle.height = this.height + 'px';
					}
				}

				this.x = x;
				this.y = y;

				if (this.scroller.options.useTransform) {
					this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
				} else {
					this.indicatorStyle.left = x + 'px';
					this.indicatorStyle.top = y + 'px';
				}
			},

			_pos: function _pos(x, y) {
				if (x < 0) {
					x = 0;
				} else if (x > this.maxPosX) {
					x = this.maxPosX;
				}

				if (y < 0) {
					y = 0;
				} else if (y > this.maxPosY) {
					y = this.maxPosY;
				}

				x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
				y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

				this.scroller.scrollTo(x, y);
			},

			fade: function fade(val, hold) {
				if (hold && !this.visible) {
					return;
				}

				clearTimeout(this.fadeTimeout);
				this.fadeTimeout = null;

				var time = val ? 250 : 500,
				    delay = val ? 0 : 300;

				val = val ? '1' : '0';

				this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

				this.fadeTimeout = setTimeout(function (val) {
					this.wrapperStyle.opacity = val;
					this.visible = +val;
				}.bind(this, val), delay);
			}
		};

		IScroll.utils = utils;

		if (typeof module != 'undefined' && module.exports) {
			module.exports = IScroll;
		} else {
			window.IScroll = IScroll;
		}
	})(window, document, Math);

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BlueToothTip = function (_React$Component) {
		(0, _inherits3.default)(BlueToothTip, _React$Component);

		function BlueToothTip(props) {
			(0, _classCallCheck3.default)(this, BlueToothTip);

			var _this = (0, _possibleConstructorReturn3.default)(this, (BlueToothTip.__proto__ || (0, _getPrototypeOf2.default)(BlueToothTip)).call(this, props));

			_this.opts = { title: '标题', content: '内容' };

			_.assign(_this.opts, _this.props);
			return _this;
		}

		(0, _createClass3.default)(BlueToothTip, [{
			key: 'confirm',
			value: function confirm() {
				var onConfirm = this.props.onConfirm;


				onConfirm(this.refs.noTip.checked);
			}
		}, {
			key: 'render',
			value: function render() {
				var _props = this.props;
				var onConfirm = _props.onConfirm;
				var onCancel = _props.onCancel;

				return React.createElement(
					'div',
					{ className: 'confirm_wrap blueToothTip' },
					React.createElement(
						'div',
						{ className: 'confirm_box' },
						React.createElement(
							'div',
							{ className: 'confirm_content' },
							React.createElement(
								'h4',
								null,
								'\u63D0\u793A'
							),
							React.createElement(
								'p',
								null,
								'\u661F\u6708\u667A\u80FD\u706F\u64AD\u653E\u97F3\u4E50\u65F6\uFF0C\u9700\u8981\u624B\u673A\u84DD\u7259\u548C\u97F3\u7BB1\u84DD\u7259\u914D\u5BF9\u3002'
							),
							React.createElement(
								'div',
								null,
								React.createElement('input', { type: 'checkbox', ref: 'noTip', name: 'noTip', id: 'noTip' }),
								React.createElement(
									'span',
									null,
									'\u4E0D\u518D\u63D0\u793A'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'confirm_ope' },
							React.createElement('input', { type: 'button', value: '\u786E\u5B9A', onTouchEnd: this.confirm.bind(this) })
						),
						React.createElement('div', { className: 'confirm_shade' })
					)
				);
			}
		}]);
		return BlueToothTip;
	}(React.Component);

	exports.default = BlueToothTip;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.audio = exports.Store = undefined;

	var _action = __webpack_require__(92);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _localStore = __webpack_require__(104);

	var _sington = __webpack_require__(115);

	var _const = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Store = exports.Store = Reflux.createStore({

		// 当前播放源
		playSource: _const.PlaySource.NETWORK,

		// 当前播放状态
		playStatus: _const.PlayStatus.PAUSE,

		// 当前播放模式(内置音乐模式)
		playMode: _const.PlayMode.ORDER,

		// 当前播放音乐信息
		currInfo: {},

		listenables: [_action.Actions],

		_trigger: function _trigger() {
			var data, mode, currInfo, list;

			if (this.playSource == _const.PlaySource.INTERNAL) {
				mode = this.playMode;
				currInfo = this.currInfo;
				list = _sington.Internal.getList();
			} else {
				mode = _localStore.Play.getMode();
				currInfo = _localStore.Play.getCurrItem() || {};
				list = _localStore.Play.getList();
			}

			data = {
				playSource: this.playSource,
				playStatus: this.playStatus,
				playMode: mode,
				list: list,
				currInfo: currInfo
			};

			this.trigger(data);
		},
		onGetList: function onGetList() {
			this._trigger();
		},


		// 获取星月灯设备运行数据
		onGetDeviceData: function onGetDeviceData() {
			var _this = this;

			_ajax2.default.getData(function (res) {
				var data,
				    music = {};

				if (res.code != 0) return console.log('onGetDeviceData:' + res.msg);

				// 防跳变过滤数据
				data = dataFilter(res.data);

				if (data.speakerSoundSource) _this.playSource = data.speakerSoundSource;

				// SD卡内置音乐播放
				if (_this.playSource == _const.PlaySource.INTERNAL) {
					!audio.paused && audio.pause();

					if (data.speakerSoundNumber) {
						music = _sington.Internal.getItem(data.speakerSoundNumber);
						_this.currInfo = {
							mid: music.id,
							msi: null,
							name: music && music.name || '未知',
							artist: '未知'
						};
					}

					if (data.speakerPlayStatus != undefined) _this.playStatus = data.speakerPlayStatus;

					if (data.speakerMode != undefined) _this.playMode = data.speakerMode;

					_this._trigger();
				}
			});
		},


		// 播放内置音乐
		onPlayInternalMusic: function onPlayInternalMusic(music) {
			if (!music) return;

			this.playSource = _const.PlaySource.INTERNAL;
			this.playStatus = _const.PlayStatus.PLAY;
			this.currInfo = {
				mid: music.id,
				msi: null,
				name: music.name,
				artist: music.artist || '未知'
			};

			setDataTimer('speakerPlayStatus', 'speakerSoundNumber', 'speakerSoundSource');

			!audio.paused && audio.pause();

			_ajax2.default.setMusicControl({
				speakerSoundSource: this.playSource,
				speakerPlayStatus: this.PlayStatus,
				speakerSoundNumber: music.id
			});

			this._trigger();
		},


		// 播放网络音乐
		onPlayNetWorkMusic: function onPlayNetWorkMusic(music) {
			// 当前音源为内置音乐时，发送命令到设备切换到蓝牙播放
			if (this.playSource == _const.PlaySource.INTERNAL) {
				setDataTimer('speakerSoundSource');
				_ajax2.default.setMusicControl({ speakerSoundSource: _const.PlaySource.NETWORK });
			}

			this.playSource = _const.PlaySource.NETWORK;
			this.playStatus = _const.PlayStatus.PLAY;

			// 添加音乐到播放列表
			_localStore.Play.play(music);

			this.onChange(music.mid);

			this._trigger();
		},


		// 播放或暂停
		onPlayOrPause: function onPlayOrPause(playing) {
			this.playStatus = playing ? _const.PlayStatus.PAUSE : _const.PlayStatus.PLAY;

			if (this.playSource == _const.PlaySource.INTERNAL) {
				setDataTimer('speakerPlayStatus');
				_ajax2.default.setMusicControl({ speakerPlayStatus: this.playStatus });
			} else {
				var music = _localStore.Play.getCurrItem();

				if (!playing && music) {
					audio.src ? audio.play() : this.onChange(music.mid);
				} else {
					audio.pause();
				}
			}

			this._trigger();
		},


		// 改变播放模式
		onChangeMode: function onChangeMode() {
			if (this.playSource == _const.PlaySource.INTERNAL) {
				switch (this.playMode) {
					case _const.PlayMode.ORDER:
						this.playMode = _const.PlayMode.SINGLE;
						break;
					case _const.PlayMode.SINGLE:
						this.playMode = _const.PlayMode.RANDOM;
						break;
					case _const.PlayMode.RANDOM:
						this.playMode = _const.PlayMode.ORDER;
						break;
				}
				setDataTimer('speakerMode');
				_ajax2.default.setMusicControl({ speakerMode: this.playMode });
			} else {
				switch (_localStore.Play.getMode()) {
					case _const.PlayMode.ORDER:
						_localStore.Play.setMode(_const.PlayMode.SINGLE);
						break;
					case _const.PlayMode.SINGLE:
						_localStore.Play.setMode(_const.PlayMode.RANDOM);
						break;
					case _const.PlayMode.RANDOM:
						_localStore.Play.setMode(_const.PlayMode.ORDER);
						break;
				}
			}
			this._trigger();
		},


		// 播放下一首
		onNext: function onNext() {
			this.oper(_const.PlayOper.NEXT);
			this._trigger();
		},


		// 播放上一首
		onPrev: function onPrev() {
			this.oper(_const.PlayOper.PREV);
			this._trigger();
		},


		// 新增到下一首
		onAddToNext: function onAddToNext(items) {
			if (_localStore.Play.addToNext(items)) this._trigger();
		},


		// 删除播放列表音乐
		onRemove: function onRemove(ids) {
			var music = _localStore.Play.remove(ids);

			// 删除当前音乐的时候自动播放下一首
			if (music) {
				audio.pause();
				this.onChange(music.mid);
			}

			this._trigger();
		},


		// 清空
		onClear: function onClear() {
			_localStore.Play.clear();
			this._trigger();
		},


		// 根据id播放指定歌曲
		onChange: function onChange(id) {
			if (this.playSource == _const.PlaySource.INTERNAL) {
				var music = _sington.Internal.getItem(id);
				this.onPlayInternalMusic(music);
			} else {
				var music = _localStore.Play.getItem(id);

				if (!music) return console.log('未找到该歌曲');

				_localStore.Play.setCurrId(id);

				// 添加到播放记录
				_localStore.Records.add(music);

				audio.src = music.uri;
				audio.paused && (audio.load = function () {
					audio.play();
				});
				audio.play();
			}
		},
		oper: function oper(operate) {
			if (this.playSource == _const.PlaySource.INTERNAL) {
				_ajax2.default.setMusicControl({ speakerOperate: operate });
			} else {
				var item = _localStore.Play.getLaterItem(operate);

				this.onChange(item ? item.mid : -1);
			}
		},


		// 获取播放时间
		getCurrentTime: function getCurrentTime() {
			return audio.currentTime;
		},


		// 设置播放时间
		setCurrentTime: function setCurrentTime(time) {
			audio.currentTime = time;
		}
	});

	var audio = exports.audio = new Audio();
	;(function () {
		audio.autoplay = true;
		audio.addEventListener('ended', function () {
			if (Store.playSource == _const.PlaySource.NETWORK) {
				if (_localStore.Play.getMode() == _const.PlayMode.SINGLE) {
					audio.currentTime = 0;
					audio.play();
				} else {
					Store.onNext();
				}
			}
		});

		audio.onplay = function () {
			if (Store.playSource == _const.PlaySource.NETWORK) {
				Store.playStatus = _const.PlayStatus.PLAY;
				Store._trigger();
			}
		};

		audio.onpause = function () {
			if (Store.playSource == _const.PlaySource.NETWORK) {
				Store.playStatus = _const.PlayStatus.PAUSE;
				Store._trigger();
			}
		};

		audio.onerror = function (info) {
			if (Store.playSource == _const.PlaySource.NETWORK) {
				Store.onNext();
				/*			Store.playStatus = PlayStatus.PAUSE;
	   			Store._trigger();*/
			}
		};
	})();

	// 数据过滤计时器
	var dataFilterTimers = {
		speakerPlayStatus: 0,
		speakerSoundNumber: 0,
		speakerSoundSource: 0
	};

	// 返回过滤后的数据
	function dataFilter(data) {
		var time = new Date().getTime();
		var result = {};
		for (var k in data) {
			if (typeof dataFilterTimers[k] !== 'undefined') {
				if (dataFilterTimers[k] < time) {
					dataFilterTimers[k] = 0;
					result[k] = data[k];
				}
			} else {
				result[k] = data[k];
			}
		}
		return result;
	}

	// 设置过滤器过期时间
	function setDataTimer() {
		var time = new Date().getTime() + 15e3; // 15秒内不接收新数据

		for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
			keys[_key] = arguments[_key];
		}

		for (var i in keys) {
			dataFilterTimers[keys[i]] = time;
		}
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _create = __webpack_require__(88);

	var _create2 = _interopRequireDefault(_create);

	var _stringify = __webpack_require__(99);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _common = __webpack_require__(2);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defData = { appId: 11011, type: 1, deviceSource: 2 };

	var Ajax;
	exports.default = Ajax = {

		// 获取星月灯运行数据
		getData: function getData(suc) {
			var time = +new Date();
			ajax({
				url: _common.Path.wPath + '/wechat/hotel/device/data/get',
				data: {
					deviceId: gMain.deviceId,
					time: +new Date()
				},
				success: function success(res) {
					if (res.code == 103005001) {
						// 未授权，跳转授权页面
						location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
					}
					suc && suc(res);
				}
			});
		},


		// 下发播放内置音乐控制数据
		setMusicControl: function setMusicControl(data, suc, err) {
			var sendData = {
				controlNumber: 2,
				speakerPlayStatus: 0,
				speakerOperate: 0,
				//speakerMode:0,
				speakerVolume: 5,
				speakerSoundSource: 0,
				speakerSoundNumber: 0
			};

			_loadsh2.default.extend(sendData, data);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/device/config/set',
				type: 'post',
				data: {
					deviceId: gMain.deviceId,
					source: 8,
					json: (0, _stringify2.default)(sendData)
				},
				success: function success(res) {
					suc && suc(res);
				}
			});
		},


		// 获取自定义专辑
		getCustomAlbums: function getCustomAlbums(suc, err) {
			var sendData = (0, _create2.default)(defData);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/albums/getCustomAlbumsList',
				data: sendData,
				success: function success(res) {
					if (res.code != 0) return;
					suc && suc(res.data);
				}
			});
		},


		// 添加自定义专辑
		buildCustomAlbum: function buildCustomAlbum(data, suc, err) {
			var sendData = (0, _create2.default)(defData);
			sendData.title = data.title;
			sendData.undefaultPic = false;

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/albums/buildCustomAlbum',
				data: sendData,
				type: 'post',
				success: function success(res) {
					suc && suc(res);
				}
			});
		},


		// 删除自定义专辑
		deleteCustomAlbum: function deleteCustomAlbum(data, suc, err) {
			var sendData = _loadsh2.default.extend({}, defData, data);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/albums/deleteCustomAlbum',
				data: sendData,
				type: 'post',
				success: function success(res) {
					suc && suc(res);
				}
			});
		},


		// 更新自定义专辑信息
		renewCustomAlbum: function renewCustomAlbum(data, suc, err) {
			var sendData = _loadsh2.default.extend({}, defData, data);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/albums/renewCustomAlbum',
				data: sendData,
				type: 'post',
				success: function success(res) {
					suc && suc(res);
				}
			});
		},


		// 获取自定义专辑中的歌曲列表
		getMusicsFromCustomAlbum: function getMusicsFromCustomAlbum(data, suc, err) {
			var sendData = (0, _create2.default)(defData);
			sendData.albumsCustomId = data.albumsCustomId;
			sendData.paged = false;

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/albums/getMusicsFromCustomAlbum',
				data: sendData,
				success: function success(res) {
					if (res.code != 0) return;

					suc && suc(res.data.list);
				}
			});
		},


		// 删除自定义专辑中的音乐
		deleteMusicFromCustomAlbum: function deleteMusicFromCustomAlbum(data, suc, err) {
			var sendData = (0, _create2.default)(defData);
			sendData.musicList = (0, _stringify2.default)(data.musicList);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/albums/deleteMusicFromCustomAlbum',
				data: sendData,
				type: 'post',
				success: function success(res) {
					suc && suc(res);
				}
			});
		},


		// 添加自定义专辑中的音乐
		addMusicsToCustomAlbum: function addMusicsToCustomAlbum(data, suc, err) {
			var sendData = (0, _create2.default)(defData);
			sendData.musicList = (0, _stringify2.default)(data.musicList);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/albums/addMusicsToCustomAlbum',
				data: sendData,
				type: 'post',
				success: function success(res) {
					suc && suc(res);
				}
			});
		},


		// 获取收藏的歌曲
		getCollectList: function getCollectList(data, suc, err) {
			var sendData = (0, _create2.default)(defData);
			sendData.paged = false;

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/albums/getCollectList',
				data: sendData,
				success: function success(res) {
					if (res.code != 0) return;

					suc && suc(res.data.list);
				}
			});
		},


		// 获取推荐专辑列表
		getRecommAlbums: function getRecommAlbums(suc, err) {
			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/albums/getRecommAlbums',
				success: function success(res) {
					if (res.code != 0) return;

					suc && suc(res.data);
				}
			});
		},


		// 获取设备内音乐
		getRoomeMusicList: function getRoomeMusicList(data, suc, err) {
			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/getRoomeMusicList',
				success: function success(res) {
					suc && suc(res);
				}
			});
		},


		// 获取本地电台
		getLocalRadio: function getLocalRadio(data, suc, err) {
			var sendData = _loadsh2.default.extend({}, defData);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/getLocalRadio',
				success: function success(res) {
					suc && suc(res.data);
				}
			});
		},


		// 根据大类标识获取音乐小类列表
		getSubCategroyList: function getSubCategroyList(data, suc, err) {
			var sendData = _loadsh2.default.extend({}, defData, data);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/getSubCategroyList',
				data: sendData,
				success: function success(res) {
					suc && suc(res);
				}
			});
		},


		// 获取助眠音乐专辑列表
		getXmlyAlbumsList: function getXmlyAlbumsList(data, suc, err) {
			var sendData = _loadsh2.default.extend({}, defData, data);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/getXmlyAlbumsList',
				data: sendData,
				success: function success(res) {
					suc && suc(res);
				}
			});
		},


		// 收藏音乐
		musicCollect: function musicCollect(data, suc, err) {
			var sendData = _loadsh2.default.extend({}, defData, data);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/music/collect',
				data: sendData,
				success: function success(res) {
					suc && suc(res);
				}
			});
		},


		// 获取收藏列表
		getCollect: function getCollect(data, suc, err) {
			var sendData = _loadsh2.default.extend({}, defData);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/music/getCollect',
				//data:sendData,
				success: function success(res) {
					if (res.code != 0) return;

					suc && suc(res.data);
				}
			});
		},


		// 取消收藏音乐
		unsubscribe: function unsubscribe(data, suc, err) {
			var sendData = _loadsh2.default.extend({}, defData, data);

			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/music/unsubscribe',
				data: sendData,
				success: function success(res) {
					if (res.code != 0) return;

					suc && suc(res);
				}
			});
		},


		// 喜马拉雅接口
		getXmlyMusicByUrl: function getXmlyMusicByUrl(url, sdata, suc, err) {
			var sendData = _loadsh2.default.extend({}, defData);

			var str = '';
			for (var key in sdata) {
				str += key + '=' + sdata[key] + '&';
			}
			str = str.substr(0, str.length - 1);

			sendData.url = url;
			sendData.data = encodeURIComponent(str);

			//sendData = JSON.stringify(sendData);
			ajax({
				url: _common.Path.wPath + '/wechat/hotel/media/getXmlyMusicByUrl',
				data: sendData,
				type: 'post',
				success: function success(res) {
					if (res.code != 0) return;

					suc && suc(JSON.parse(res.data));
				}
			});
		},


		// 获取喜马拉雅内容分类
		getXmlyCategoryList: function getXmlyCategoryList(data, suc, err) {
			var url = 'http://api.ximalaya.com/categories/list';
			this.getXmlyMusicByUrl(url, data, suc, err);
		},


		// 根据分类 ID 获取标签列表
		getXmlyCategoryTags: function getXmlyCategoryTags(data, suc, err) {
			var url = 'http://api.ximalaya.com/tags/list';
			this.getXmlyMusicByUrl(url, data, suc, err);
		},


		// 根据分类和标签 ID 获取专辑列表
		getXmlyCategoryAlbums: function getXmlyCategoryAlbums(data, suc, err) {
			var url = 'http://api.ximalaya.com/albums/list';
			this.getXmlyMusicByUrl(url, data, suc, err);
		},


		// 根据专辑 ID 获取音乐列表
		getXmlyAlbumMusics: function getXmlyAlbumMusics(data, suc, err) {
			var url = 'http://api.ximalaya.com/albums/browse';
			this.getXmlyMusicByUrl(url, data, suc, err);
		},


		// 获取主播分类
		getXmlyAnnoCateList: function getXmlyAnnoCateList(data, suc, err) {
			var url = 'http://api.ximalaya.com/announcers/categories';
			this.getXmlyMusicByUrl(url, data, suc, err);
		},


		// 获取主播分类下的主播列表
		getXmlyCategoryAnnos: function getXmlyCategoryAnnos(data, suc, err) {
			var url = 'http://api.ximalaya.com/announcers/list';
			this.getXmlyMusicByUrl(url, data, suc, err);
		},


		// 获取主播的专辑列表
		getXmlyAnnoAblums: function getXmlyAnnoAblums(data, suc, err) {
			var url = 'http://api.ximalaya.com/albums/by_announcer';
			this.getXmlyMusicByUrl(url, data, suc, err);
		}
	};


	function createAjax() {
		var xhr = null;
		try {
			//IE系列浏览器
			xhr = new ActiveXObject("microsoft.xmlhttp");
		} catch (e1) {
			try {
				//非IE浏览器
				xhr = new XMLHttpRequest();
			} catch (e2) {
				window.alert("您的浏览器不支持ajax，请更换！");
			}
		}
		return xhr;
	};

	function ajax(conf) {
		// 初始化
		//type参数,可选
		var type = conf.type;
		//url参数，必填 
		var url = conf.url;
		//data参数可选，只有在post请求时需要
		var data = conf.data;
		//datatype参数可选    
		var dataType = conf.dataType;
		//回调函数可选
		var success = conf.success;

		var error = conf.error;

		if (type == null) {
			//type参数可选，默认为get
			type = "get";
		}
		if (dataType == null) {
			//dataType参数可选，默认为text
			dataType = "json";
		}
		if (type == "GET" || type == "get") {
			if (data) {
				var str = '?';
				for (var key in data) {
					str += key + '=' + data[key] + '&';
				}
				str = str.substr(0, str.length - 1);
				url += str;
			}
		}
		// 创建ajax引擎对象
		var xhr = createAjax();
		// 打开
		xhr.open(type, url, true);
		// 发送
		if (type == "GET" || type == "get") {
			xhr.send(null);
		} else if (type == "POST" || type == "post") {
			/*xhr.setRequestHeader("content-type",
	              "application/x-www-form-urlencoded");*/
			var oForm = new FormData();
			for (var key in data) {
				oForm.append(key, data[key]);
			}
			xhr.send(oForm);
		}
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (dataType == "text" || dataType == "TEXT") {
					if (success != null) {
						//普通文本
						success(xhr.responseText);
					}
				} else if (dataType == "xml" || dataType == "XML") {
					if (success != null) {
						//接收xml文档    
						success(xhr.responseXML);
					}
				} else if (dataType == "json" || dataType == "JSON") {
					if (success != null) {
						//将json字符串转换为js对象  
						success(JSON.parse(xhr.responseText));
					}
				}
			}
		};
	};

	window.ajax = ajax;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(18)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';var _typeof2=__webpack_require__(37);var _typeof3=_interopRequireDefault(_typeof2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	 * @license
	 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern -o ./lodash.js`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */;(function(){/** Used as a safe reference for `undefined` in pre-ES5 environments. */var undefined;/** Used as the semantic version number. */var VERSION='3.10.1';/** Used to compose bitmasks for wrapper metadata. */var BIND_FLAG=1,BIND_KEY_FLAG=2,CURRY_BOUND_FLAG=4,CURRY_FLAG=8,CURRY_RIGHT_FLAG=16,PARTIAL_FLAG=32,PARTIAL_RIGHT_FLAG=64,ARY_FLAG=128,REARG_FLAG=256;/** Used as default options for `_.trunc`. */var DEFAULT_TRUNC_LENGTH=30,DEFAULT_TRUNC_OMISSION='...';/** Used to detect when a function becomes hot. */var HOT_COUNT=150,HOT_SPAN=16;/** Used as the size to enable large array optimizations. */var LARGE_ARRAY_SIZE=200;/** Used to indicate the type of lazy iteratees. */var LAZY_FILTER_FLAG=1,LAZY_MAP_FLAG=2;/** Used as the `TypeError` message for "Functions" methods. */var FUNC_ERROR_TEXT='Expected a function';/** Used as the internal argument placeholder. */var PLACEHOLDER='__lodash_placeholder__';/** `Object#toString` result references. */var argsTag='[object Arguments]',arrayTag='[object Array]',boolTag='[object Boolean]',dateTag='[object Date]',errorTag='[object Error]',funcTag='[object Function]',mapTag='[object Map]',numberTag='[object Number]',objectTag='[object Object]',regexpTag='[object RegExp]',setTag='[object Set]',stringTag='[object String]',weakMapTag='[object WeakMap]';var arrayBufferTag='[object ArrayBuffer]',float32Tag='[object Float32Array]',float64Tag='[object Float64Array]',int8Tag='[object Int8Array]',int16Tag='[object Int16Array]',int32Tag='[object Int32Array]',uint8Tag='[object Uint8Array]',uint8ClampedTag='[object Uint8ClampedArray]',uint16Tag='[object Uint16Array]',uint32Tag='[object Uint32Array]';/** Used to match empty string literals in compiled template source. */var reEmptyStringLeading=/\b__p \+= '';/g,reEmptyStringMiddle=/\b(__p \+=) '' \+/g,reEmptyStringTrailing=/(__e\(.*?\)|\b__t\)) \+\n'';/g;/** Used to match HTML entities and HTML characters. */var reEscapedHtml=/&(?:amp|lt|gt|quot|#39|#96);/g,reUnescapedHtml=/[&<>"'`]/g,reHasEscapedHtml=RegExp(reEscapedHtml.source),reHasUnescapedHtml=RegExp(reUnescapedHtml.source);/** Used to match template delimiters. */var reEscape=/<%-([\s\S]+?)%>/g,reEvaluate=/<%([\s\S]+?)%>/g,reInterpolate=/<%=([\s\S]+?)%>/g;/** Used to match property names within property paths. */var reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/,rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;/**
	   * Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns)
	   * and those outlined by [`EscapeRegExpPattern`](http://ecma-international.org/ecma-262/6.0/#sec-escaperegexppattern).
	   */var reRegExpChars=/^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,reHasRegExpChars=RegExp(reRegExpChars.source);/** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */var reComboMark=/[\u0300-\u036f\ufe20-\ufe23]/g;/** Used to match backslashes in property paths. */var reEscapeChar=/\\(\\)?/g;/** Used to match [ES template delimiters](http://ecma-international.org/ecma-262/6.0/#sec-template-literal-lexical-components). */var reEsTemplate=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;/** Used to match `RegExp` flags from their coerced string values. */var reFlags=/\w*$/;/** Used to detect hexadecimal string values. */var reHasHexPrefix=/^0[xX]/;/** Used to detect host constructors (Safari > 5). */var reIsHostCtor=/^\[object .+?Constructor\]$/;/** Used to detect unsigned integer values. */var reIsUint=/^\d+$/;/** Used to match latin-1 supplementary letters (excluding mathematical operators). */var reLatin1=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;/** Used to ensure capturing order of template delimiters. */var reNoMatch=/($^)/;/** Used to match unescaped characters in compiled string literals. */var reUnescapedString=/['\n\r\u2028\u2029\\]/g;/** Used to match words to create compound words. */var reWords=function(){var upper='[A-Z\\xc0-\\xd6\\xd8-\\xde]',lower='[a-z\\xdf-\\xf6\\xf8-\\xff]+';return RegExp(upper+'+(?='+upper+lower+')|'+upper+'?'+lower+'|'+upper+'+|[0-9]+','g');}();/** Used to assign default `context` object properties. */var contextProps=['Array','ArrayBuffer','Date','Error','Float32Array','Float64Array','Function','Int8Array','Int16Array','Int32Array','Math','Number','Object','RegExp','Set','String','_','clearTimeout','isFinite','parseFloat','parseInt','setTimeout','TypeError','Uint8Array','Uint8ClampedArray','Uint16Array','Uint32Array','WeakMap'];/** Used to make template sourceURLs easier to identify. */var templateCounter=-1;/** Used to identify `toStringTag` values of typed arrays. */var typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=true;typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=false;/** Used to identify `toStringTag` values supported by `_.clone`. */var cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[stringTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=true;cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[mapTag]=cloneableTags[setTag]=cloneableTags[weakMapTag]=false;/** Used to map latin-1 supplementary letters to basic latin letters. */var deburredLetters={'\xc0':'A','\xc1':'A','\xc2':'A','\xc3':'A','\xc4':'A','\xc5':'A','\xe0':'a','\xe1':'a','\xe2':'a','\xe3':'a','\xe4':'a','\xe5':'a','\xc7':'C','\xe7':'c','\xd0':'D','\xf0':'d','\xc8':'E','\xc9':'E','\xca':'E','\xcb':'E','\xe8':'e','\xe9':'e','\xea':'e','\xeb':'e','\xcC':'I','\xcd':'I','\xce':'I','\xcf':'I','\xeC':'i','\xed':'i','\xee':'i','\xef':'i','\xd1':'N','\xf1':'n','\xd2':'O','\xd3':'O','\xd4':'O','\xd5':'O','\xd6':'O','\xd8':'O','\xf2':'o','\xf3':'o','\xf4':'o','\xf5':'o','\xf6':'o','\xf8':'o','\xd9':'U','\xda':'U','\xdb':'U','\xdc':'U','\xf9':'u','\xfa':'u','\xfb':'u','\xfc':'u','\xdd':'Y','\xfd':'y','\xff':'y','\xc6':'Ae','\xe6':'ae','\xde':'Th','\xfe':'th','\xdf':'ss'};/** Used to map characters to HTML entities. */var htmlEscapes={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'};/** Used to map HTML entities to characters. */var htmlUnescapes={'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'",'&#96;':'`'};/** Used to determine if values are of the language type `Object`. */var objectTypes={'function':true,'object':true};/** Used to escape characters for inclusion in compiled regexes. */var regexpEscapes={'0':'x30','1':'x31','2':'x32','3':'x33','4':'x34','5':'x35','6':'x36','7':'x37','8':'x38','9':'x39','A':'x41','B':'x42','C':'x43','D':'x44','E':'x45','F':'x46','a':'x61','b':'x62','c':'x63','d':'x64','e':'x65','f':'x66','n':'x6e','r':'x72','t':'x74','u':'x75','v':'x76','x':'x78'};/** Used to escape characters for inclusion in compiled string literals. */var stringEscapes={'\\':'\\',"'":"'",'\n':'n','\r':'r','\u2028':'u2028','\u2029':'u2029'};/** Detect free variable `exports`. */var freeExports=objectTypes[ false?'undefined':(0,_typeof3.default)(exports)]&&exports&&!exports.nodeType&&exports;/** Detect free variable `module`. */var freeModule=objectTypes[ false?'undefined':(0,_typeof3.default)(module)]&&module&&!module.nodeType&&module;/** Detect free variable `global` from Node.js. */var freeGlobal=freeExports&&freeModule&&(typeof global==='undefined'?'undefined':(0,_typeof3.default)(global))=='object'&&global&&global.Object&&global;/** Detect free variable `self`. */var freeSelf=objectTypes[typeof self==='undefined'?'undefined':(0,_typeof3.default)(self)]&&self&&self.Object&&self;/** Detect free variable `window`. */var freeWindow=objectTypes[typeof window==='undefined'?'undefined':(0,_typeof3.default)(window)]&&window&&window.Object&&window;/** Detect the popular CommonJS extension `module.exports`. */var moduleExports=freeModule&&freeModule.exports===freeExports&&freeExports;/**
	   * Used as a reference to the global object.
	   *
	   * The `this` value is used if it's the global object to avoid Greasemonkey's
	   * restricted `window` object, otherwise the `window` object is used.
	   */var root=freeGlobal||freeWindow!==(this&&this.window)&&freeWindow||freeSelf||this;/*--------------------------------------------------------------------------*//**
	   * The base implementation of `compareAscending` which compares values and
	   * sorts them in ascending order without guaranteeing a stable sort.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {number} Returns the sort order indicator for `value`.
	   */function baseCompareAscending(value,other){if(value!==other){var valIsNull=value===null,valIsUndef=value===undefined,valIsReflexive=value===value;var othIsNull=other===null,othIsUndef=other===undefined,othIsReflexive=other===other;if(value>other&&!othIsNull||!valIsReflexive||valIsNull&&!othIsUndef&&othIsReflexive||valIsUndef&&othIsReflexive){return 1;}if(value<other&&!valIsNull||!othIsReflexive||othIsNull&&!valIsUndef&&valIsReflexive||othIsUndef&&valIsReflexive){return-1;}}return 0;}/**
	   * The base implementation of `_.findIndex` and `_.findLastIndex` without
	   * support for callback shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */function baseFindIndex(array,predicate,fromRight){var length=array.length,index=fromRight?length:-1;while(fromRight?index--:++index<length){if(predicate(array[index],index,array)){return index;}}return-1;}/**
	   * The base implementation of `_.indexOf` without support for binary searches.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */function baseIndexOf(array,value,fromIndex){if(value!==value){return indexOfNaN(array,fromIndex);}var index=fromIndex-1,length=array.length;while(++index<length){if(array[index]===value){return index;}}return-1;}/**
	   * The base implementation of `_.isFunction` without support for environments
	   * with incorrect `typeof` results.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   */function baseIsFunction(value){// Avoid a Chakra JIT bug in compatibility modes of IE 11.
	// See https://github.com/jashkenas/underscore/issues/1621 for more details.
	return typeof value=='function'||false;}/**
	   * Converts `value` to a string if it's not one. An empty string is returned
	   * for `null` or `undefined` values.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {string} Returns the string.
	   */function baseToString(value){return value==null?'':value+'';}/**
	   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
	   * of `string` that is not found in `chars`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @param {string} chars The characters to find.
	   * @returns {number} Returns the index of the first character not found in `chars`.
	   */function charsLeftIndex(string,chars){var index=-1,length=string.length;while(++index<length&&chars.indexOf(string.charAt(index))>-1){}return index;}/**
	   * Used by `_.trim` and `_.trimRight` to get the index of the last character
	   * of `string` that is not found in `chars`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @param {string} chars The characters to find.
	   * @returns {number} Returns the index of the last character not found in `chars`.
	   */function charsRightIndex(string,chars){var index=string.length;while(index--&&chars.indexOf(string.charAt(index))>-1){}return index;}/**
	   * Used by `_.sortBy` to compare transformed elements of a collection and stable
	   * sort them in ascending order.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @returns {number} Returns the sort order indicator for `object`.
	   */function compareAscending(object,other){return baseCompareAscending(object.criteria,other.criteria)||object.index-other.index;}/**
	   * Used by `_.sortByOrder` to compare multiple properties of a value to another
	   * and stable sort them.
	   *
	   * If `orders` is unspecified, all valuess are sorted in ascending order. Otherwise,
	   * a value is sorted in ascending order if its corresponding order is "asc", and
	   * descending if "desc".
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {boolean[]} orders The order to sort by for each property.
	   * @returns {number} Returns the sort order indicator for `object`.
	   */function compareMultiple(object,other,orders){var index=-1,objCriteria=object.criteria,othCriteria=other.criteria,length=objCriteria.length,ordersLength=orders.length;while(++index<length){var result=baseCompareAscending(objCriteria[index],othCriteria[index]);if(result){if(index>=ordersLength){return result;}var order=orders[index];return result*(order==='asc'||order===true?1:-1);}}// Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	// that causes it, under certain circumstances, to provide the same value for
	// `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
	// for more details.
	//
	// This also ensures a stable sort in V8 and other engines.
	// See https://code.google.com/p/v8/issues/detail?id=90 for more details.
	return object.index-other.index;}/**
	   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	   *
	   * @private
	   * @param {string} letter The matched letter to deburr.
	   * @returns {string} Returns the deburred letter.
	   */function deburrLetter(letter){return deburredLetters[letter];}/**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */function escapeHtmlChar(chr){return htmlEscapes[chr];}/**
	   * Used by `_.escapeRegExp` to escape characters for inclusion in compiled regexes.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @param {string} leadingChar The capture group for a leading character.
	   * @param {string} whitespaceChar The capture group for a whitespace character.
	   * @returns {string} Returns the escaped character.
	   */function escapeRegExpChar(chr,leadingChar,whitespaceChar){if(leadingChar){chr=regexpEscapes[chr];}else if(whitespaceChar){chr=stringEscapes[chr];}return'\\'+chr;}/**
	   * Used by `_.template` to escape characters for inclusion in compiled string literals.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */function escapeStringChar(chr){return'\\'+stringEscapes[chr];}/**
	   * Gets the index at which the first occurrence of `NaN` is found in `array`.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {number} fromIndex The index to search from.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	   */function indexOfNaN(array,fromIndex,fromRight){var length=array.length,index=fromIndex+(fromRight?0:-1);while(fromRight?index--:++index<length){var other=array[index];if(other!==other){return index;}}return-1;}/**
	   * Checks if `value` is object-like.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   */function isObjectLike(value){return!!value&&(typeof value==='undefined'?'undefined':(0,_typeof3.default)(value))=='object';}/**
	   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
	   * character code is whitespace.
	   *
	   * @private
	   * @param {number} charCode The character code to inspect.
	   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
	   */function isSpace(charCode){return charCode<=160&&charCode>=9&&charCode<=13||charCode==32||charCode==160||charCode==5760||charCode==6158||charCode>=8192&&(charCode<=8202||charCode==8232||charCode==8233||charCode==8239||charCode==8287||charCode==12288||charCode==65279);}/**
	   * Replaces all `placeholder` elements in `array` with an internal placeholder
	   * and returns an array of their indexes.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {*} placeholder The placeholder to replace.
	   * @returns {Array} Returns the new array of placeholder indexes.
	   */function replaceHolders(array,placeholder){var index=-1,length=array.length,resIndex=-1,result=[];while(++index<length){if(array[index]===placeholder){array[index]=PLACEHOLDER;result[++resIndex]=index;}}return result;}/**
	   * An implementation of `_.uniq` optimized for sorted arrays without support
	   * for callback shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {Function} [iteratee] The function invoked per iteration.
	   * @returns {Array} Returns the new duplicate free array.
	   */function sortedUniq(array,iteratee){var seen,index=-1,length=array.length,resIndex=-1,result=[];while(++index<length){var value=array[index],computed=iteratee?iteratee(value,index,array):value;if(!index||seen!==computed){seen=computed;result[++resIndex]=value;}}return result;}/**
	   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
	   * character of `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the index of the first non-whitespace character.
	   */function trimmedLeftIndex(string){var index=-1,length=string.length;while(++index<length&&isSpace(string.charCodeAt(index))){}return index;}/**
	   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
	   * character of `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the index of the last non-whitespace character.
	   */function trimmedRightIndex(string){var index=string.length;while(index--&&isSpace(string.charCodeAt(index))){}return index;}/**
	   * Used by `_.unescape` to convert HTML entities to characters.
	   *
	   * @private
	   * @param {string} chr The matched character to unescape.
	   * @returns {string} Returns the unescaped character.
	   */function unescapeHtmlChar(chr){return htmlUnescapes[chr];}/*--------------------------------------------------------------------------*//**
	   * Create a new pristine `lodash` function using the given `context` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns a new `lodash` function.
	   * @example
	   *
	   * _.mixin({ 'foo': _.constant('foo') });
	   *
	   * var lodash = _.runInContext();
	   * lodash.mixin({ 'bar': lodash.constant('bar') });
	   *
	   * _.isFunction(_.foo);
	   * // => true
	   * _.isFunction(_.bar);
	   * // => false
	   *
	   * lodash.isFunction(lodash.foo);
	   * // => false
	   * lodash.isFunction(lodash.bar);
	   * // => true
	   *
	   * // using `context` to mock `Date#getTime` use in `_.now`
	   * var mock = _.runInContext({
	   *   'Date': function() {
	   *     return { 'getTime': getTimeMock };
	   *   }
	   * });
	   *
	   * // or creating a suped-up `defer` in Node.js
	   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
	   */function runInContext(context){// Avoid issues with some ES3 environments that attempt to use values, named
	// after built-in constructors like `Object`, for the creation of literals.
	// ES5 clears this up by stating that literals must use built-in constructors.
	// See https://es5.github.io/#x11.1.5 for more details.
	context=context?_.defaults(root.Object(),context,_.pick(root,contextProps)):root;/** Native constructor references. */var Array=context.Array,Date=context.Date,Error=context.Error,Function=context.Function,Math=context.Math,Number=context.Number,Object=context.Object,RegExp=context.RegExp,String=context.String,TypeError=context.TypeError;/** Used for native method references. */var arrayProto=Array.prototype,objectProto=Object.prototype,stringProto=String.prototype;/** Used to resolve the decompiled source of functions. */var fnToString=Function.prototype.toString;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/** Used to generate unique IDs. */var idCounter=0;/**
	     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	     * of values.
	     */var objToString=objectProto.toString;/** Used to restore the original `_` reference in `_.noConflict`. */var oldDash=root._;/** Used to detect if a method is native. */var reIsNative=RegExp('^'+fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g,'\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?')+'$');/** Native method references. */var ArrayBuffer=context.ArrayBuffer,clearTimeout=context.clearTimeout,parseFloat=context.parseFloat,pow=Math.pow,propertyIsEnumerable=objectProto.propertyIsEnumerable,Set=getNative(context,'Set'),setTimeout=context.setTimeout,splice=arrayProto.splice,Uint8Array=context.Uint8Array,WeakMap=getNative(context,'WeakMap');/* Native method references for those with the same name as other `lodash` methods. */var nativeCeil=Math.ceil,nativeCreate=getNative(Object,'create'),nativeFloor=Math.floor,nativeIsArray=getNative(Array,'isArray'),nativeIsFinite=context.isFinite,nativeKeys=getNative(Object,'keys'),nativeMax=Math.max,nativeMin=Math.min,nativeNow=getNative(Date,'now'),nativeParseInt=context.parseInt,nativeRandom=Math.random;/** Used as references for `-Infinity` and `Infinity`. */var NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY,POSITIVE_INFINITY=Number.POSITIVE_INFINITY;/** Used as references for the maximum length and index of an array. */var MAX_ARRAY_LENGTH=4294967295,MAX_ARRAY_INDEX=MAX_ARRAY_LENGTH-1,HALF_MAX_ARRAY_LENGTH=MAX_ARRAY_LENGTH>>>1;/**
	     * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	     * of an array-like value.
	     */var MAX_SAFE_INTEGER=9007199254740991;/** Used to store function metadata. */var metaMap=WeakMap&&new WeakMap();/** Used to lookup unminified function names. */var realNames={};/*------------------------------------------------------------------------*//**
	     * Creates a `lodash` object which wraps `value` to enable implicit chaining.
	     * Methods that operate on and return arrays, collections, and functions can
	     * be chained together. Methods that retrieve a single value or may return a
	     * primitive value will automatically end the chain returning the unwrapped
	     * value. Explicit chaining may be enabled using `_.chain`. The execution of
	     * chained methods is lazy, that is, execution is deferred until `_#value`
	     * is implicitly or explicitly called.
	     *
	     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	     * fusion is an optimization strategy which merge iteratee calls; this can help
	     * to avoid the creation of intermediate data structures and greatly reduce the
	     * number of iteratee executions.
	     *
	     * Chaining is supported in custom builds as long as the `_#value` method is
	     * directly or indirectly included in the build.
	     *
	     * In addition to lodash methods, wrappers have `Array` and `String` methods.
	     *
	     * The wrapper `Array` methods are:
	     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
	     * `splice`, and `unshift`
	     *
	     * The wrapper `String` methods are:
	     * `replace` and `split`
	     *
	     * The wrapper methods that support shortcut fusion are:
	     * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
	     * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
	     * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
	     * and `where`
	     *
	     * The chainable wrapper methods are:
	     * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
	     * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
	     * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`,
	     * `defer`, `delay`, `difference`, `drop`, `dropRight`, `dropRightWhile`,
	     * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`,
	     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
	     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
	     * `invoke`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`,
	     * `matchesProperty`, `memoize`, `merge`, `method`, `methodOf`, `mixin`,
	     * `modArgs`, `negate`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
	     * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
	     * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `restParam`,
	     * `reverse`, `set`, `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`,
	     * `sortByOrder`, `splice`, `spread`, `take`, `takeRight`, `takeRightWhile`,
	     * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
	     * `transform`, `union`, `uniq`, `unshift`, `unzip`, `unzipWith`, `values`,
	     * `valuesIn`, `where`, `without`, `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
	     *
	     * The wrapper methods that are **not** chainable by default are:
	     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clone`, `cloneDeep`,
	     * `deburr`, `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
	     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`,
	     * `floor`, `get`, `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`,
	     * `inRange`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
	     * `isEmpty`, `isEqual`, `isError`, `isFinite` `isFunction`, `isMatch`,
	     * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
	     * `isRegExp`, `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`,
	     * `last`, `lastIndexOf`, `lt`, `lte`, `max`, `min`, `noConflict`, `noop`,
	     * `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`,
	     * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `shift`, `size`,
	     * `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`, `startCase`,
	     * `startsWith`, `sum`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
	     * `unescape`, `uniqueId`, `value`, and `words`
	     *
	     * The wrapper method `sample` will return a wrapped value when `n` is provided,
	     * otherwise an unwrapped value is returned.
	     *
	     * @name _
	     * @constructor
	     * @category Chain
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // returns an unwrapped value
	     * wrapped.reduce(function(total, n) {
	     *   return total + n;
	     * });
	     * // => 6
	     *
	     * // returns a wrapped value
	     * var squares = wrapped.map(function(n) {
	     *   return n * n;
	     * });
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */function lodash(value){if(isObjectLike(value)&&!isArray(value)&&!(value instanceof LazyWrapper)){if(value instanceof LodashWrapper){return value;}if(hasOwnProperty.call(value,'__chain__')&&hasOwnProperty.call(value,'__wrapped__')){return wrapperClone(value);}}return new LodashWrapper(value);}/**
	     * The function whose prototype all chaining wrappers inherit from.
	     *
	     * @private
	     */function baseLodash(){}// No operation performed.
	/**
	     * The base constructor for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
	     * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
	     */function LodashWrapper(value,chainAll,actions){this.__wrapped__=value;this.__actions__=actions||[];this.__chain__=!!chainAll;}/**
	     * An object environment feature flags.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */var support=lodash.support={};/**
	     * By default, the template delimiters used by lodash are like those in
	     * embedded Ruby (ERB). Change the following template settings to use
	     * alternative delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */lodash.templateSettings={/**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */'escape':reEscape,/**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */'evaluate':reEvaluate,/**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */'interpolate':reInterpolate,/**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type string
	       */'variable':'',/**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type Object
	       */'imports':{/**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type Function
	         */'_':lodash}};/*------------------------------------------------------------------------*//**
	     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     */function LazyWrapper(value){this.__wrapped__=value;this.__actions__=[];this.__dir__=1;this.__filtered__=false;this.__iteratees__=[];this.__takeCount__=POSITIVE_INFINITY;this.__views__=[];}/**
	     * Creates a clone of the lazy wrapper object.
	     *
	     * @private
	     * @name clone
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the cloned `LazyWrapper` object.
	     */function lazyClone(){var result=new LazyWrapper(this.__wrapped__);result.__actions__=arrayCopy(this.__actions__);result.__dir__=this.__dir__;result.__filtered__=this.__filtered__;result.__iteratees__=arrayCopy(this.__iteratees__);result.__takeCount__=this.__takeCount__;result.__views__=arrayCopy(this.__views__);return result;}/**
	     * Reverses the direction of lazy iteration.
	     *
	     * @private
	     * @name reverse
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the new reversed `LazyWrapper` object.
	     */function lazyReverse(){if(this.__filtered__){var result=new LazyWrapper(this);result.__dir__=-1;result.__filtered__=true;}else{result=this.clone();result.__dir__*=-1;}return result;}/**
	     * Extracts the unwrapped value from its lazy wrapper.
	     *
	     * @private
	     * @name value
	     * @memberOf LazyWrapper
	     * @returns {*} Returns the unwrapped value.
	     */function lazyValue(){var array=this.__wrapped__.value(),dir=this.__dir__,isArr=isArray(array),isRight=dir<0,arrLength=isArr?array.length:0,view=getView(0,arrLength,this.__views__),start=view.start,end=view.end,length=end-start,index=isRight?end:start-1,iteratees=this.__iteratees__,iterLength=iteratees.length,resIndex=0,takeCount=nativeMin(length,this.__takeCount__);if(!isArr||arrLength<LARGE_ARRAY_SIZE||arrLength==length&&takeCount==length){return baseWrapperValue(array,this.__actions__);}var result=[];outer:while(length--&&resIndex<takeCount){index+=dir;var iterIndex=-1,value=array[index];while(++iterIndex<iterLength){var data=iteratees[iterIndex],iteratee=data.iteratee,type=data.type,computed=iteratee(value);if(type==LAZY_MAP_FLAG){value=computed;}else if(!computed){if(type==LAZY_FILTER_FLAG){continue outer;}else{break outer;}}}result[resIndex++]=value;}return result;}/*------------------------------------------------------------------------*//**
	     * Creates a cache object to store key/value pairs.
	     *
	     * @private
	     * @static
	     * @name Cache
	     * @memberOf _.memoize
	     */function MapCache(){this.__data__={};}/**
	     * Removes `key` and its value from the cache.
	     *
	     * @private
	     * @name delete
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
	     */function mapDelete(key){return this.has(key)&&delete this.__data__[key];}/**
	     * Gets the cached value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the cached value.
	     */function mapGet(key){return key=='__proto__'?undefined:this.__data__[key];}/**
	     * Checks if a cached value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */function mapHas(key){return key!='__proto__'&&hasOwnProperty.call(this.__data__,key);}/**
	     * Sets `value` to `key` of the cache.
	     *
	     * @private
	     * @name set
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to cache.
	     * @param {*} value The value to cache.
	     * @returns {Object} Returns the cache object.
	     */function mapSet(key,value){if(key!='__proto__'){this.__data__[key]=value;}return this;}/*------------------------------------------------------------------------*//**
	     *
	     * Creates a cache object to store unique values.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     */function SetCache(values){var length=values?values.length:0;this.data={'hash':nativeCreate(null),'set':new Set()};while(length--){this.push(values[length]);}}/**
	     * Checks if `value` is in `cache` mimicking the return signature of
	     * `_.indexOf` by returning `0` if the value is found, else `-1`.
	     *
	     * @private
	     * @param {Object} cache The cache to search.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns `0` if `value` is found, else `-1`.
	     */function cacheIndexOf(cache,value){var data=cache.data,result=typeof value=='string'||isObject(value)?data.set.has(value):data.hash[value];return result?0:-1;}/**
	     * Adds `value` to the cache.
	     *
	     * @private
	     * @name push
	     * @memberOf SetCache
	     * @param {*} value The value to cache.
	     */function cachePush(value){var data=this.data;if(typeof value=='string'||isObject(value)){data.set.add(value);}else{data.hash[value]=true;}}/*------------------------------------------------------------------------*//**
	     * Creates a new array joining `array` with `other`.
	     *
	     * @private
	     * @param {Array} array The array to join.
	     * @param {Array} other The other array to join.
	     * @returns {Array} Returns the new concatenated array.
	     */function arrayConcat(array,other){var index=-1,length=array.length,othIndex=-1,othLength=other.length,result=Array(length+othLength);while(++index<length){result[index]=array[index];}while(++othIndex<othLength){result[index++]=other[othIndex];}return result;}/**
	     * Copies the values of `source` to `array`.
	     *
	     * @private
	     * @param {Array} source The array to copy values from.
	     * @param {Array} [array=[]] The array to copy values to.
	     * @returns {Array} Returns `array`.
	     */function arrayCopy(source,array){var index=-1,length=source.length;array||(array=Array(length));while(++index<length){array[index]=source[index];}return array;}/**
	     * A specialized version of `_.forEach` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns `array`.
	     */function arrayEach(array,iteratee){var index=-1,length=array.length;while(++index<length){if(iteratee(array[index],index,array)===false){break;}}return array;}/**
	     * A specialized version of `_.forEachRight` for arrays without support for
	     * callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns `array`.
	     */function arrayEachRight(array,iteratee){var length=array.length;while(length--){if(iteratee(array[length],length,array)===false){break;}}return array;}/**
	     * A specialized version of `_.every` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`.
	     */function arrayEvery(array,predicate){var index=-1,length=array.length;while(++index<length){if(!predicate(array[index],index,array)){return false;}}return true;}/**
	     * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
	     * with one argument: (value).
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {*} Returns the extremum value.
	     */function arrayExtremum(array,iteratee,comparator,exValue){var index=-1,length=array.length,computed=exValue,result=computed;while(++index<length){var value=array[index],current=+iteratee(value);if(comparator(current,computed)){computed=current;result=value;}}return result;}/**
	     * A specialized version of `_.filter` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */function arrayFilter(array,predicate){var index=-1,length=array.length,resIndex=-1,result=[];while(++index<length){var value=array[index];if(predicate(value,index,array)){result[++resIndex]=value;}}return result;}/**
	     * A specialized version of `_.map` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */function arrayMap(array,iteratee){var index=-1,length=array.length,result=Array(length);while(++index<length){result[index]=iteratee(array[index],index,array);}return result;}/**
	     * Appends the elements of `values` to `array`.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to append.
	     * @returns {Array} Returns `array`.
	     */function arrayPush(array,values){var index=-1,length=values.length,offset=array.length;while(++index<length){array[offset+index]=values[index];}return array;}/**
	     * A specialized version of `_.reduce` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {boolean} [initFromArray] Specify using the first element of `array`
	     *  as the initial value.
	     * @returns {*} Returns the accumulated value.
	     */function arrayReduce(array,iteratee,accumulator,initFromArray){var index=-1,length=array.length;if(initFromArray&&length){accumulator=array[++index];}while(++index<length){accumulator=iteratee(accumulator,array[index],index,array);}return accumulator;}/**
	     * A specialized version of `_.reduceRight` for arrays without support for
	     * callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {boolean} [initFromArray] Specify using the last element of `array`
	     *  as the initial value.
	     * @returns {*} Returns the accumulated value.
	     */function arrayReduceRight(array,iteratee,accumulator,initFromArray){var length=array.length;if(initFromArray&&length){accumulator=array[--length];}while(length--){accumulator=iteratee(accumulator,array[length],length,array);}return accumulator;}/**
	     * A specialized version of `_.some` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */function arraySome(array,predicate){var index=-1,length=array.length;while(++index<length){if(predicate(array[index],index,array)){return true;}}return false;}/**
	     * A specialized version of `_.sum` for arrays without support for callback
	     * shorthands and `this` binding..
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {number} Returns the sum.
	     */function arraySum(array,iteratee){var length=array.length,result=0;while(length--){result+=+iteratee(array[length])||0;}return result;}/**
	     * Used by `_.defaults` to customize its `_.assign` use.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @returns {*} Returns the value to assign to the destination object.
	     */function assignDefaults(objectValue,sourceValue){return objectValue===undefined?sourceValue:objectValue;}/**
	     * Used by `_.template` to customize its `_.assign` use.
	     *
	     * **Note:** This function is like `assignDefaults` except that it ignores
	     * inherited property values when checking if a property is `undefined`.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @param {string} key The key associated with the object and source values.
	     * @param {Object} object The destination object.
	     * @returns {*} Returns the value to assign to the destination object.
	     */function assignOwnDefaults(objectValue,sourceValue,key,object){return objectValue===undefined||!hasOwnProperty.call(object,key)?sourceValue:objectValue;}/**
	     * A specialized version of `_.assign` for customizing assigned values without
	     * support for argument juggling, multiple sources, and `this` binding `customizer`
	     * functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} customizer The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     */function assignWith(object,source,customizer){var index=-1,props=keys(source),length=props.length;while(++index<length){var key=props[index],value=object[key],result=customizer(value,source[key],key,object,source);if((result===result?result!==value:value===value)||value===undefined&&!(key in object)){object[key]=result;}}return object;}/**
	     * The base implementation of `_.assign` without support for argument juggling,
	     * multiple sources, and `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @returns {Object} Returns `object`.
	     */function baseAssign(object,source){return source==null?object:baseCopy(source,keys(source),object);}/**
	     * The base implementation of `_.at` without support for string collections
	     * and individual key arguments.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {number[]|string[]} props The property names or indexes of elements to pick.
	     * @returns {Array} Returns the new array of picked elements.
	     */function baseAt(collection,props){var index=-1,isNil=collection==null,isArr=!isNil&&isArrayLike(collection),length=isArr?collection.length:0,propsLength=props.length,result=Array(propsLength);while(++index<propsLength){var key=props[index];if(isArr){result[index]=isIndex(key,length)?collection[key]:undefined;}else{result[index]=isNil?undefined:collection[key];}}return result;}/**
	     * Copies properties of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy properties from.
	     * @param {Array} props The property names to copy.
	     * @param {Object} [object={}] The object to copy properties to.
	     * @returns {Object} Returns `object`.
	     */function baseCopy(source,props,object){object||(object={});var index=-1,length=props.length;while(++index<length){var key=props[index];object[key]=source[key];}return object;}/**
	     * The base implementation of `_.callback` which supports specifying the
	     * number of arguments to provide to `func`.
	     *
	     * @private
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {number} [argCount] The number of arguments to provide to `func`.
	     * @returns {Function} Returns the callback.
	     */function baseCallback(func,thisArg,argCount){var type=typeof func==='undefined'?'undefined':(0,_typeof3.default)(func);if(type=='function'){return thisArg===undefined?func:bindCallback(func,thisArg,argCount);}if(func==null){return identity;}if(type=='object'){return baseMatches(func);}return thisArg===undefined?property(func):baseMatchesProperty(func,thisArg);}/**
	     * The base implementation of `_.clone` without support for argument juggling
	     * and `this` binding `customizer` functions.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {string} [key] The key of `value`.
	     * @param {Object} [object] The object `value` belongs to.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates clones with source counterparts.
	     * @returns {*} Returns the cloned value.
	     */function baseClone(value,isDeep,customizer,key,object,stackA,stackB){var result;if(customizer){result=object?customizer(value,key,object):customizer(value);}if(result!==undefined){return result;}if(!isObject(value)){return value;}var isArr=isArray(value);if(isArr){result=initCloneArray(value);if(!isDeep){return arrayCopy(value,result);}}else{var tag=objToString.call(value),isFunc=tag==funcTag;if(tag==objectTag||tag==argsTag||isFunc&&!object){result=initCloneObject(isFunc?{}:value);if(!isDeep){return baseAssign(result,value);}}else{return cloneableTags[tag]?initCloneByTag(value,tag,isDeep):object?value:{};}}// Check for circular references and return its corresponding clone.
	stackA||(stackA=[]);stackB||(stackB=[]);var length=stackA.length;while(length--){if(stackA[length]==value){return stackB[length];}}// Add the source value to the stack of traversed objects and associate it with its clone.
	stackA.push(value);stackB.push(result);// Recursively populate clone (susceptible to call stack limits).
	(isArr?arrayEach:baseForOwn)(value,function(subValue,key){result[key]=baseClone(subValue,isDeep,customizer,key,value,stackA,stackB);});return result;}/**
	     * The base implementation of `_.create` without support for assigning
	     * properties to the created object.
	     *
	     * @private
	     * @param {Object} prototype The object to inherit from.
	     * @returns {Object} Returns the new object.
	     */var baseCreate=function(){function object(){}return function(prototype){if(isObject(prototype)){object.prototype=prototype;var result=new object();object.prototype=undefined;}return result||{};};}();/**
	     * The base implementation of `_.delay` and `_.defer` which accepts an index
	     * of where to slice the arguments to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {Object} args The arguments provide to `func`.
	     * @returns {number} Returns the timer id.
	     */function baseDelay(func,wait,args){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}return setTimeout(function(){func.apply(undefined,args);},wait);}/**
	     * The base implementation of `_.difference` which accepts a single array
	     * of values to exclude.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Array} values The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     */function baseDifference(array,values){var length=array?array.length:0,result=[];if(!length){return result;}var index=-1,indexOf=getIndexOf(),isCommon=indexOf===baseIndexOf,cache=isCommon&&values.length>=LARGE_ARRAY_SIZE?createCache(values):null,valuesLength=values.length;if(cache){indexOf=cacheIndexOf;isCommon=false;values=cache;}outer:while(++index<length){var value=array[index];if(isCommon&&value===value){var valuesIndex=valuesLength;while(valuesIndex--){if(values[valuesIndex]===value){continue outer;}}result.push(value);}else if(indexOf(values,value,0)<0){result.push(value);}}return result;}/**
	     * The base implementation of `_.forEach` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object|string} Returns `collection`.
	     */var baseEach=createBaseEach(baseForOwn);/**
	     * The base implementation of `_.forEachRight` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object|string} Returns `collection`.
	     */var baseEachRight=createBaseEach(baseForOwnRight,true);/**
	     * The base implementation of `_.every` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`
	     */function baseEvery(collection,predicate){var result=true;baseEach(collection,function(value,index,collection){result=!!predicate(value,index,collection);return result;});return result;}/**
	     * Gets the extremum value of `collection` invoking `iteratee` for each value
	     * in `collection` to generate the criterion by which the value is ranked.
	     * The `iteratee` is invoked with three arguments: (value, index|key, collection).
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {*} Returns the extremum value.
	     */function baseExtremum(collection,iteratee,comparator,exValue){var computed=exValue,result=computed;baseEach(collection,function(value,index,collection){var current=+iteratee(value,index,collection);if(comparator(current,computed)||current===exValue&&current===result){computed=current;result=value;}});return result;}/**
	     * The base implementation of `_.fill` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     */function baseFill(array,value,start,end){var length=array.length;start=start==null?0:+start||0;if(start<0){start=-start>length?0:length+start;}end=end===undefined||end>length?length:+end||0;if(end<0){end+=length;}length=start>end?0:end>>>0;start>>>=0;while(start<length){array[start++]=value;}return array;}/**
	     * The base implementation of `_.filter` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */function baseFilter(collection,predicate){var result=[];baseEach(collection,function(value,index,collection){if(predicate(value,index,collection)){result.push(value);}});return result;}/**
	     * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	     * without support for callback shorthands and `this` binding, which iterates
	     * over `collection` using the provided `eachFunc`.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {Function} eachFunc The function to iterate over `collection`.
	     * @param {boolean} [retKey] Specify returning the key of the found element
	     *  instead of the element itself.
	     * @returns {*} Returns the found element or its key, else `undefined`.
	     */function baseFind(collection,predicate,eachFunc,retKey){var result;eachFunc(collection,function(value,key,collection){if(predicate(value,key,collection)){result=retKey?key:value;return false;}});return result;}/**
	     * The base implementation of `_.flatten` with added support for restricting
	     * flattening and specifying the start index.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isDeep] Specify a deep flatten.
	     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	     * @param {Array} [result=[]] The initial result value.
	     * @returns {Array} Returns the new flattened array.
	     */function baseFlatten(array,isDeep,isStrict,result){result||(result=[]);var index=-1,length=array.length;while(++index<length){var value=array[index];if(isObjectLike(value)&&isArrayLike(value)&&(isStrict||isArray(value)||isArguments(value))){if(isDeep){// Recursively flatten arrays (susceptible to call stack limits).
	baseFlatten(value,isDeep,isStrict,result);}else{arrayPush(result,value);}}else if(!isStrict){result[result.length]=value;}}return result;}/**
	     * The base implementation of `baseForIn` and `baseForOwn` which iterates
	     * over `object` properties returned by `keysFunc` invoking `iteratee` for
	     * each property. Iteratee functions may exit iteration early by explicitly
	     * returning `false`.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */var baseFor=createBaseFor();/**
	     * This function is like `baseFor` except that it iterates over properties
	     * in the opposite order.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */var baseForRight=createBaseFor(true);/**
	     * The base implementation of `_.forIn` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */function baseForIn(object,iteratee){return baseFor(object,iteratee,keysIn);}/**
	     * The base implementation of `_.forOwn` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */function baseForOwn(object,iteratee){return baseFor(object,iteratee,keys);}/**
	     * The base implementation of `_.forOwnRight` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */function baseForOwnRight(object,iteratee){return baseForRight(object,iteratee,keys);}/**
	     * The base implementation of `_.functions` which creates an array of
	     * `object` function property names filtered from those provided.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} props The property names to filter.
	     * @returns {Array} Returns the new array of filtered property names.
	     */function baseFunctions(object,props){var index=-1,length=props.length,resIndex=-1,result=[];while(++index<length){var key=props[index];if(isFunction(object[key])){result[++resIndex]=key;}}return result;}/**
	     * The base implementation of `get` without support for string paths
	     * and default values.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} path The path of the property to get.
	     * @param {string} [pathKey] The key representation of path.
	     * @returns {*} Returns the resolved value.
	     */function baseGet(object,path,pathKey){if(object==null){return;}if(pathKey!==undefined&&pathKey in toObject(object)){path=[pathKey];}var index=0,length=path.length;while(object!=null&&index<length){object=object[path[index++]];}return index&&index==length?object:undefined;}/**
	     * The base implementation of `_.isEqual` without support for `this` binding
	     * `customizer` functions.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */function baseIsEqual(value,other,customizer,isLoose,stackA,stackB){if(value===other){return true;}if(value==null||other==null||!isObject(value)&&!isObjectLike(other)){return value!==value&&other!==other;}return baseIsEqualDeep(value,other,baseIsEqual,customizer,isLoose,stackA,stackB);}/**
	     * A specialized version of `baseIsEqual` for arrays and objects which performs
	     * deep comparisons and tracks traversed objects enabling objects with circular
	     * references to be compared.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing objects.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	     * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */function baseIsEqualDeep(object,other,equalFunc,customizer,isLoose,stackA,stackB){var objIsArr=isArray(object),othIsArr=isArray(other),objTag=arrayTag,othTag=arrayTag;if(!objIsArr){objTag=objToString.call(object);if(objTag==argsTag){objTag=objectTag;}else if(objTag!=objectTag){objIsArr=isTypedArray(object);}}if(!othIsArr){othTag=objToString.call(other);if(othTag==argsTag){othTag=objectTag;}else if(othTag!=objectTag){othIsArr=isTypedArray(other);}}var objIsObj=objTag==objectTag,othIsObj=othTag==objectTag,isSameTag=objTag==othTag;if(isSameTag&&!(objIsArr||objIsObj)){return equalByTag(object,other,objTag);}if(!isLoose){var objIsWrapped=objIsObj&&hasOwnProperty.call(object,'__wrapped__'),othIsWrapped=othIsObj&&hasOwnProperty.call(other,'__wrapped__');if(objIsWrapped||othIsWrapped){return equalFunc(objIsWrapped?object.value():object,othIsWrapped?other.value():other,customizer,isLoose,stackA,stackB);}}if(!isSameTag){return false;}// Assume cyclic values are equal.
	// For more information on detecting circular references see https://es5.github.io/#JO.
	stackA||(stackA=[]);stackB||(stackB=[]);var length=stackA.length;while(length--){if(stackA[length]==object){return stackB[length]==other;}}// Add `object` and `other` to the stack of traversed objects.
	stackA.push(object);stackB.push(other);var result=(objIsArr?equalArrays:equalObjects)(object,other,equalFunc,customizer,isLoose,stackA,stackB);stackA.pop();stackB.pop();return result;}/**
	     * The base implementation of `_.isMatch` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} matchData The propery names, values, and compare flags to match.
	     * @param {Function} [customizer] The function to customize comparing objects.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     */function baseIsMatch(object,matchData,customizer){var index=matchData.length,length=index,noCustomizer=!customizer;if(object==null){return!length;}object=toObject(object);while(index--){var data=matchData[index];if(noCustomizer&&data[2]?data[1]!==object[data[0]]:!(data[0]in object)){return false;}}while(++index<length){data=matchData[index];var key=data[0],objValue=object[key],srcValue=data[1];if(noCustomizer&&data[2]){if(objValue===undefined&&!(key in object)){return false;}}else{var result=customizer?customizer(objValue,srcValue,key):undefined;if(!(result===undefined?baseIsEqual(srcValue,objValue,customizer,true):result)){return false;}}}return true;}/**
	     * The base implementation of `_.map` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */function baseMap(collection,iteratee){var index=-1,result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value,key,collection){result[++index]=iteratee(value,key,collection);});return result;}/**
	     * The base implementation of `_.matches` which does not clone `source`.
	     *
	     * @private
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     */function baseMatches(source){var matchData=getMatchData(source);if(matchData.length==1&&matchData[0][2]){var key=matchData[0][0],value=matchData[0][1];return function(object){if(object==null){return false;}return object[key]===value&&(value!==undefined||key in toObject(object));};}return function(object){return baseIsMatch(object,matchData);};}/**
	     * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	     *
	     * @private
	     * @param {string} path The path of the property to get.
	     * @param {*} srcValue The value to compare.
	     * @returns {Function} Returns the new function.
	     */function baseMatchesProperty(path,srcValue){var isArr=isArray(path),isCommon=isKey(path)&&isStrictComparable(srcValue),pathKey=path+'';path=toPath(path);return function(object){if(object==null){return false;}var key=pathKey;object=toObject(object);if((isArr||!isCommon)&&!(key in object)){object=path.length==1?object:baseGet(object,baseSlice(path,0,-1));if(object==null){return false;}key=last(path);object=toObject(object);}return object[key]===srcValue?srcValue!==undefined||key in object:baseIsEqual(srcValue,object[key],undefined,true);};}/**
	     * The base implementation of `_.merge` without support for argument juggling,
	     * multiple sources, and `this` binding `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} [customizer] The function to customize merged values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     * @returns {Object} Returns `object`.
	     */function baseMerge(object,source,customizer,stackA,stackB){if(!isObject(object)){return object;}var isSrcArr=isArrayLike(source)&&(isArray(source)||isTypedArray(source)),props=isSrcArr?undefined:keys(source);arrayEach(props||source,function(srcValue,key){if(props){key=srcValue;srcValue=source[key];}if(isObjectLike(srcValue)){stackA||(stackA=[]);stackB||(stackB=[]);baseMergeDeep(object,source,key,baseMerge,customizer,stackA,stackB);}else{var value=object[key],result=customizer?customizer(value,srcValue,key,object,source):undefined,isCommon=result===undefined;if(isCommon){result=srcValue;}if((result!==undefined||isSrcArr&&!(key in object))&&(isCommon||(result===result?result!==value:value===value))){object[key]=result;}}});return object;}/**
	     * A specialized version of `baseMerge` for arrays and objects which performs
	     * deep merges and tracks traversed objects enabling objects with circular
	     * references to be merged.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {string} key The key of the value to merge.
	     * @param {Function} mergeFunc The function to merge values.
	     * @param {Function} [customizer] The function to customize merged values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */function baseMergeDeep(object,source,key,mergeFunc,customizer,stackA,stackB){var length=stackA.length,srcValue=source[key];while(length--){if(stackA[length]==srcValue){object[key]=stackB[length];return;}}var value=object[key],result=customizer?customizer(value,srcValue,key,object,source):undefined,isCommon=result===undefined;if(isCommon){result=srcValue;if(isArrayLike(srcValue)&&(isArray(srcValue)||isTypedArray(srcValue))){result=isArray(value)?value:isArrayLike(value)?arrayCopy(value):[];}else if(isPlainObject(srcValue)||isArguments(srcValue)){result=isArguments(value)?toPlainObject(value):isPlainObject(value)?value:{};}else{isCommon=false;}}// Add the source value to the stack of traversed objects and associate
	// it with its merged value.
	stackA.push(srcValue);stackB.push(result);if(isCommon){// Recursively merge objects and arrays (susceptible to call stack limits).
	object[key]=mergeFunc(result,srcValue,customizer,stackA,stackB);}else if(result===result?result!==value:value===value){object[key]=result;}}/**
	     * The base implementation of `_.property` without support for deep paths.
	     *
	     * @private
	     * @param {string} key The key of the property to get.
	     * @returns {Function} Returns the new function.
	     */function baseProperty(key){return function(object){return object==null?undefined:object[key];};}/**
	     * A specialized version of `baseProperty` which supports deep paths.
	     *
	     * @private
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     */function basePropertyDeep(path){var pathKey=path+'';path=toPath(path);return function(object){return baseGet(object,path,pathKey);};}/**
	     * The base implementation of `_.pullAt` without support for individual
	     * index arguments and capturing the removed elements.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {number[]} indexes The indexes of elements to remove.
	     * @returns {Array} Returns `array`.
	     */function basePullAt(array,indexes){var length=array?indexes.length:0;while(length--){var index=indexes[length];if(index!=previous&&isIndex(index)){var previous=index;splice.call(array,index,1);}}return array;}/**
	     * The base implementation of `_.random` without support for argument juggling
	     * and returning floating-point numbers.
	     *
	     * @private
	     * @param {number} min The minimum possible value.
	     * @param {number} max The maximum possible value.
	     * @returns {number} Returns the random number.
	     */function baseRandom(min,max){return min+nativeFloor(nativeRandom()*(max-min+1));}/**
	     * The base implementation of `_.reduce` and `_.reduceRight` without support
	     * for callback shorthands and `this` binding, which iterates over `collection`
	     * using the provided `eachFunc`.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} accumulator The initial value.
	     * @param {boolean} initFromCollection Specify using the first or last element
	     *  of `collection` as the initial value.
	     * @param {Function} eachFunc The function to iterate over `collection`.
	     * @returns {*} Returns the accumulated value.
	     */function baseReduce(collection,iteratee,accumulator,initFromCollection,eachFunc){eachFunc(collection,function(value,index,collection){accumulator=initFromCollection?(initFromCollection=false,value):iteratee(accumulator,value,index,collection);});return accumulator;}/**
	     * The base implementation of `setData` without support for hot loop detection.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */var baseSetData=!metaMap?identity:function(func,data){metaMap.set(func,data);return func;};/**
	     * The base implementation of `_.slice` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */function baseSlice(array,start,end){var index=-1,length=array.length;start=start==null?0:+start||0;if(start<0){start=-start>length?0:length+start;}end=end===undefined||end>length?length:+end||0;if(end<0){end+=length;}length=start>end?0:end-start>>>0;start>>>=0;var result=Array(length);while(++index<length){result[index]=array[index+start];}return result;}/**
	     * The base implementation of `_.some` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */function baseSome(collection,predicate){var result;baseEach(collection,function(value,index,collection){result=predicate(value,index,collection);return!result;});return!!result;}/**
	     * The base implementation of `_.sortBy` which uses `comparer` to define
	     * the sort order of `array` and replaces criteria objects with their
	     * corresponding values.
	     *
	     * @private
	     * @param {Array} array The array to sort.
	     * @param {Function} comparer The function to define sort order.
	     * @returns {Array} Returns `array`.
	     */function baseSortBy(array,comparer){var length=array.length;array.sort(comparer);while(length--){array[length]=array[length].value;}return array;}/**
	     * The base implementation of `_.sortByOrder` without param guards.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	     * @param {boolean[]} orders The sort orders of `iteratees`.
	     * @returns {Array} Returns the new sorted array.
	     */function baseSortByOrder(collection,iteratees,orders){var callback=getCallback(),index=-1;iteratees=arrayMap(iteratees,function(iteratee){return callback(iteratee);});var result=baseMap(collection,function(value){var criteria=arrayMap(iteratees,function(iteratee){return iteratee(value);});return{'criteria':criteria,'index':++index,'value':value};});return baseSortBy(result,function(object,other){return compareMultiple(object,other,orders);});}/**
	     * The base implementation of `_.sum` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {number} Returns the sum.
	     */function baseSum(collection,iteratee){var result=0;baseEach(collection,function(value,index,collection){result+=+iteratee(value,index,collection)||0;});return result;}/**
	     * The base implementation of `_.uniq` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The function invoked per iteration.
	     * @returns {Array} Returns the new duplicate free array.
	     */function baseUniq(array,iteratee){var index=-1,indexOf=getIndexOf(),length=array.length,isCommon=indexOf===baseIndexOf,isLarge=isCommon&&length>=LARGE_ARRAY_SIZE,seen=isLarge?createCache():null,result=[];if(seen){indexOf=cacheIndexOf;isCommon=false;}else{isLarge=false;seen=iteratee?[]:result;}outer:while(++index<length){var value=array[index],computed=iteratee?iteratee(value,index,array):value;if(isCommon&&value===value){var seenIndex=seen.length;while(seenIndex--){if(seen[seenIndex]===computed){continue outer;}}if(iteratee){seen.push(computed);}result.push(value);}else if(indexOf(seen,computed,0)<0){if(iteratee||isLarge){seen.push(computed);}result.push(value);}}return result;}/**
	     * The base implementation of `_.values` and `_.valuesIn` which creates an
	     * array of `object` property values corresponding to the property names
	     * of `props`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} props The property names to get values for.
	     * @returns {Object} Returns the array of property values.
	     */function baseValues(object,props){var index=-1,length=props.length,result=Array(length);while(++index<length){result[index]=object[props[index]];}return result;}/**
	     * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
	     * and `_.takeWhile` without support for callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Array} Returns the slice of `array`.
	     */function baseWhile(array,predicate,isDrop,fromRight){var length=array.length,index=fromRight?length:-1;while((fromRight?index--:++index<length)&&predicate(array[index],index,array)){}return isDrop?baseSlice(array,fromRight?0:index,fromRight?index+1:length):baseSlice(array,fromRight?index+1:0,fromRight?length:index);}/**
	     * The base implementation of `wrapperValue` which returns the result of
	     * performing a sequence of actions on the unwrapped `value`, where each
	     * successive action is supplied the return value of the previous.
	     *
	     * @private
	     * @param {*} value The unwrapped value.
	     * @param {Array} actions Actions to peform to resolve the unwrapped value.
	     * @returns {*} Returns the resolved value.
	     */function baseWrapperValue(value,actions){var result=value;if(result instanceof LazyWrapper){result=result.value();}var index=-1,length=actions.length;while(++index<length){var action=actions[index];result=action.func.apply(action.thisArg,arrayPush([result],action.args));}return result;}/**
	     * Performs a binary search of `array` to determine the index at which `value`
	     * should be inserted into `array` in order to maintain its sort order.
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */function binaryIndex(array,value,retHighest){var low=0,high=array?array.length:low;if(typeof value=='number'&&value===value&&high<=HALF_MAX_ARRAY_LENGTH){while(low<high){var mid=low+high>>>1,computed=array[mid];if((retHighest?computed<=value:computed<value)&&computed!==null){low=mid+1;}else{high=mid;}}return high;}return binaryIndexBy(array,value,identity,retHighest);}/**
	     * This function is like `binaryIndex` except that it invokes `iteratee` for
	     * `value` and each element of `array` to compute their sort ranking. The
	     * iteratee is invoked with one argument; (value).
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */function binaryIndexBy(array,value,iteratee,retHighest){value=iteratee(value);var low=0,high=array?array.length:0,valIsNaN=value!==value,valIsNull=value===null,valIsUndef=value===undefined;while(low<high){var mid=nativeFloor((low+high)/2),computed=iteratee(array[mid]),isDef=computed!==undefined,isReflexive=computed===computed;if(valIsNaN){var setLow=isReflexive||retHighest;}else if(valIsNull){setLow=isReflexive&&isDef&&(retHighest||computed!=null);}else if(valIsUndef){setLow=isReflexive&&(retHighest||isDef);}else if(computed==null){setLow=false;}else{setLow=retHighest?computed<=value:computed<value;}if(setLow){low=mid+1;}else{high=mid;}}return nativeMin(high,MAX_ARRAY_INDEX);}/**
	     * A specialized version of `baseCallback` which only supports `this` binding
	     * and specifying the number of arguments to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to bind.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {number} [argCount] The number of arguments to provide to `func`.
	     * @returns {Function} Returns the callback.
	     */function bindCallback(func,thisArg,argCount){if(typeof func!='function'){return identity;}if(thisArg===undefined){return func;}switch(argCount){case 1:return function(value){return func.call(thisArg,value);};case 3:return function(value,index,collection){return func.call(thisArg,value,index,collection);};case 4:return function(accumulator,value,index,collection){return func.call(thisArg,accumulator,value,index,collection);};case 5:return function(value,other,key,object,source){return func.call(thisArg,value,other,key,object,source);};}return function(){return func.apply(thisArg,arguments);};}/**
	     * Creates a clone of the given array buffer.
	     *
	     * @private
	     * @param {ArrayBuffer} buffer The array buffer to clone.
	     * @returns {ArrayBuffer} Returns the cloned array buffer.
	     */function bufferClone(buffer){var result=new ArrayBuffer(buffer.byteLength),view=new Uint8Array(result);view.set(new Uint8Array(buffer));return result;}/**
	     * Creates an array that is the composition of partially applied arguments,
	     * placeholders, and provided arguments into a single array of arguments.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to prepend to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */function composeArgs(args,partials,holders){var holdersLength=holders.length,argsIndex=-1,argsLength=nativeMax(args.length-holdersLength,0),leftIndex=-1,leftLength=partials.length,result=Array(leftLength+argsLength);while(++leftIndex<leftLength){result[leftIndex]=partials[leftIndex];}while(++argsIndex<holdersLength){result[holders[argsIndex]]=args[argsIndex];}while(argsLength--){result[leftIndex++]=args[argsIndex++];}return result;}/**
	     * This function is like `composeArgs` except that the arguments composition
	     * is tailored for `_.partialRight`.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to append to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */function composeArgsRight(args,partials,holders){var holdersIndex=-1,holdersLength=holders.length,argsIndex=-1,argsLength=nativeMax(args.length-holdersLength,0),rightIndex=-1,rightLength=partials.length,result=Array(argsLength+rightLength);while(++argsIndex<argsLength){result[argsIndex]=args[argsIndex];}var offset=argsIndex;while(++rightIndex<rightLength){result[offset+rightIndex]=partials[rightIndex];}while(++holdersIndex<holdersLength){result[offset+holders[holdersIndex]]=args[argsIndex++];}return result;}/**
	     * Creates a `_.countBy`, `_.groupBy`, `_.indexBy`, or `_.partition` function.
	     *
	     * @private
	     * @param {Function} setter The function to set keys and values of the accumulator object.
	     * @param {Function} [initializer] The function to initialize the accumulator object.
	     * @returns {Function} Returns the new aggregator function.
	     */function createAggregator(setter,initializer){return function(collection,iteratee,thisArg){var result=initializer?initializer():{};iteratee=getCallback(iteratee,thisArg,3);if(isArray(collection)){var index=-1,length=collection.length;while(++index<length){var value=collection[index];setter(result,value,iteratee(value,index,collection),collection);}}else{baseEach(collection,function(value,key,collection){setter(result,value,iteratee(value,key,collection),collection);});}return result;};}/**
	     * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	     *
	     * @private
	     * @param {Function} assigner The function to assign values.
	     * @returns {Function} Returns the new assigner function.
	     */function createAssigner(assigner){return restParam(function(object,sources){var index=-1,length=object==null?0:sources.length,customizer=length>2?sources[length-2]:undefined,guard=length>2?sources[2]:undefined,thisArg=length>1?sources[length-1]:undefined;if(typeof customizer=='function'){customizer=bindCallback(customizer,thisArg,5);length-=2;}else{customizer=typeof thisArg=='function'?thisArg:undefined;length-=customizer?1:0;}if(guard&&isIterateeCall(sources[0],sources[1],guard)){customizer=length<3?undefined:customizer;length=1;}while(++index<length){var source=sources[index];if(source){assigner(object,source,customizer);}}return object;});}/**
	     * Creates a `baseEach` or `baseEachRight` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */function createBaseEach(eachFunc,fromRight){return function(collection,iteratee){var length=collection?getLength(collection):0;if(!isLength(length)){return eachFunc(collection,iteratee);}var index=fromRight?length:-1,iterable=toObject(collection);while(fromRight?index--:++index<length){if(iteratee(iterable[index],index,iterable)===false){break;}}return collection;};}/**
	     * Creates a base function for `_.forIn` or `_.forInRight`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */function createBaseFor(fromRight){return function(object,iteratee,keysFunc){var iterable=toObject(object),props=keysFunc(object),length=props.length,index=fromRight?length:-1;while(fromRight?index--:++index<length){var key=props[index];if(iteratee(iterable[key],key,iterable)===false){break;}}return object;};}/**
	     * Creates a function that wraps `func` and invokes it with the `this`
	     * binding of `thisArg`.
	     *
	     * @private
	     * @param {Function} func The function to bind.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @returns {Function} Returns the new bound function.
	     */function createBindWrapper(func,thisArg){var Ctor=createCtorWrapper(func);function wrapper(){var fn=this&&this!==root&&this instanceof wrapper?Ctor:func;return fn.apply(thisArg,arguments);}return wrapper;}/**
	     * Creates a `Set` cache object to optimize linear searches of large arrays.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	     */function createCache(values){return nativeCreate&&Set?new SetCache(values):null;}/**
	     * Creates a function that produces compound words out of the words in a
	     * given string.
	     *
	     * @private
	     * @param {Function} callback The function to combine each word.
	     * @returns {Function} Returns the new compounder function.
	     */function createCompounder(callback){return function(string){var index=-1,array=words(deburr(string)),length=array.length,result='';while(++index<length){result=callback(result,array[index],index);}return result;};}/**
	     * Creates a function that produces an instance of `Ctor` regardless of
	     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	     *
	     * @private
	     * @param {Function} Ctor The constructor to wrap.
	     * @returns {Function} Returns the new wrapped function.
	     */function createCtorWrapper(Ctor){return function(){// Use a `switch` statement to work with class constructors.
	// See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	// for more details.
	var args=arguments;switch(args.length){case 0:return new Ctor();case 1:return new Ctor(args[0]);case 2:return new Ctor(args[0],args[1]);case 3:return new Ctor(args[0],args[1],args[2]);case 4:return new Ctor(args[0],args[1],args[2],args[3]);case 5:return new Ctor(args[0],args[1],args[2],args[3],args[4]);case 6:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5]);case 7:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);}var thisBinding=baseCreate(Ctor.prototype),result=Ctor.apply(thisBinding,args);// Mimic the constructor's `return` behavior.
	// See https://es5.github.io/#x13.2.2 for more details.
	return isObject(result)?result:thisBinding;};}/**
	     * Creates a `_.curry` or `_.curryRight` function.
	     *
	     * @private
	     * @param {boolean} flag The curry bit flag.
	     * @returns {Function} Returns the new curry function.
	     */function createCurry(flag){function curryFunc(func,arity,guard){if(guard&&isIterateeCall(func,arity,guard)){arity=undefined;}var result=createWrapper(func,flag,undefined,undefined,undefined,undefined,undefined,arity);result.placeholder=curryFunc.placeholder;return result;}return curryFunc;}/**
	     * Creates a `_.defaults` or `_.defaultsDeep` function.
	     *
	     * @private
	     * @param {Function} assigner The function to assign values.
	     * @param {Function} customizer The function to customize assigned values.
	     * @returns {Function} Returns the new defaults function.
	     */function createDefaults(assigner,customizer){return restParam(function(args){var object=args[0];if(object==null){return object;}args.push(customizer);return assigner.apply(undefined,args);});}/**
	     * Creates a `_.max` or `_.min` function.
	     *
	     * @private
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {Function} Returns the new extremum function.
	     */function createExtremum(comparator,exValue){return function(collection,iteratee,thisArg){if(thisArg&&isIterateeCall(collection,iteratee,thisArg)){iteratee=undefined;}iteratee=getCallback(iteratee,thisArg,3);if(iteratee.length==1){collection=isArray(collection)?collection:toIterable(collection);var result=arrayExtremum(collection,iteratee,comparator,exValue);if(!(collection.length&&result===exValue)){return result;}}return baseExtremum(collection,iteratee,comparator,exValue);};}/**
	     * Creates a `_.find` or `_.findLast` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new find function.
	     */function createFind(eachFunc,fromRight){return function(collection,predicate,thisArg){predicate=getCallback(predicate,thisArg,3);if(isArray(collection)){var index=baseFindIndex(collection,predicate,fromRight);return index>-1?collection[index]:undefined;}return baseFind(collection,predicate,eachFunc);};}/**
	     * Creates a `_.findIndex` or `_.findLastIndex` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new find function.
	     */function createFindIndex(fromRight){return function(array,predicate,thisArg){if(!(array&&array.length)){return-1;}predicate=getCallback(predicate,thisArg,3);return baseFindIndex(array,predicate,fromRight);};}/**
	     * Creates a `_.findKey` or `_.findLastKey` function.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new find function.
	     */function createFindKey(objectFunc){return function(object,predicate,thisArg){predicate=getCallback(predicate,thisArg,3);return baseFind(object,predicate,objectFunc,true);};}/**
	     * Creates a `_.flow` or `_.flowRight` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new flow function.
	     */function createFlow(fromRight){return function(){var wrapper,length=arguments.length,index=fromRight?length:-1,leftIndex=0,funcs=Array(length);while(fromRight?index--:++index<length){var func=funcs[leftIndex++]=arguments[index];if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}if(!wrapper&&LodashWrapper.prototype.thru&&getFuncName(func)=='wrapper'){wrapper=new LodashWrapper([],true);}}index=wrapper?-1:length;while(++index<length){func=funcs[index];var funcName=getFuncName(func),data=funcName=='wrapper'?getData(func):undefined;if(data&&isLaziable(data[0])&&data[1]==(ARY_FLAG|CURRY_FLAG|PARTIAL_FLAG|REARG_FLAG)&&!data[4].length&&data[9]==1){wrapper=wrapper[getFuncName(data[0])].apply(wrapper,data[3]);}else{wrapper=func.length==1&&isLaziable(func)?wrapper[funcName]():wrapper.thru(func);}}return function(){var args=arguments,value=args[0];if(wrapper&&args.length==1&&isArray(value)&&value.length>=LARGE_ARRAY_SIZE){return wrapper.plant(value).value();}var index=0,result=length?funcs[index].apply(this,args):value;while(++index<length){result=funcs[index].call(this,result);}return result;};};}/**
	     * Creates a function for `_.forEach` or `_.forEachRight`.
	     *
	     * @private
	     * @param {Function} arrayFunc The function to iterate over an array.
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @returns {Function} Returns the new each function.
	     */function createForEach(arrayFunc,eachFunc){return function(collection,iteratee,thisArg){return typeof iteratee=='function'&&thisArg===undefined&&isArray(collection)?arrayFunc(collection,iteratee):eachFunc(collection,bindCallback(iteratee,thisArg,3));};}/**
	     * Creates a function for `_.forIn` or `_.forInRight`.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new each function.
	     */function createForIn(objectFunc){return function(object,iteratee,thisArg){if(typeof iteratee!='function'||thisArg!==undefined){iteratee=bindCallback(iteratee,thisArg,3);}return objectFunc(object,iteratee,keysIn);};}/**
	     * Creates a function for `_.forOwn` or `_.forOwnRight`.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new each function.
	     */function createForOwn(objectFunc){return function(object,iteratee,thisArg){if(typeof iteratee!='function'||thisArg!==undefined){iteratee=bindCallback(iteratee,thisArg,3);}return objectFunc(object,iteratee);};}/**
	     * Creates a function for `_.mapKeys` or `_.mapValues`.
	     *
	     * @private
	     * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
	     * @returns {Function} Returns the new map function.
	     */function createObjectMapper(isMapKeys){return function(object,iteratee,thisArg){var result={};iteratee=getCallback(iteratee,thisArg,3);baseForOwn(object,function(value,key,object){var mapped=iteratee(value,key,object);key=isMapKeys?mapped:key;value=isMapKeys?value:mapped;result[key]=value;});return result;};}/**
	     * Creates a function for `_.padLeft` or `_.padRight`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify padding from the right.
	     * @returns {Function} Returns the new pad function.
	     */function createPadDir(fromRight){return function(string,length,chars){string=baseToString(string);return(fromRight?string:'')+createPadding(string,length,chars)+(fromRight?'':string);};}/**
	     * Creates a `_.partial` or `_.partialRight` function.
	     *
	     * @private
	     * @param {boolean} flag The partial bit flag.
	     * @returns {Function} Returns the new partial function.
	     */function createPartial(flag){var partialFunc=restParam(function(func,partials){var holders=replaceHolders(partials,partialFunc.placeholder);return createWrapper(func,flag,undefined,partials,holders);});return partialFunc;}/**
	     * Creates a function for `_.reduce` or `_.reduceRight`.
	     *
	     * @private
	     * @param {Function} arrayFunc The function to iterate over an array.
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @returns {Function} Returns the new each function.
	     */function createReduce(arrayFunc,eachFunc){return function(collection,iteratee,accumulator,thisArg){var initFromArray=arguments.length<3;return typeof iteratee=='function'&&thisArg===undefined&&isArray(collection)?arrayFunc(collection,iteratee,accumulator,initFromArray):baseReduce(collection,getCallback(iteratee,thisArg,4),accumulator,initFromArray,eachFunc);};}/**
	     * Creates a function that wraps `func` and invokes it with optional `this`
	     * binding of, partial application, and currying.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
	     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */function createHybridWrapper(func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity){var isAry=bitmask&ARY_FLAG,isBind=bitmask&BIND_FLAG,isBindKey=bitmask&BIND_KEY_FLAG,isCurry=bitmask&CURRY_FLAG,isCurryBound=bitmask&CURRY_BOUND_FLAG,isCurryRight=bitmask&CURRY_RIGHT_FLAG,Ctor=isBindKey?undefined:createCtorWrapper(func);function wrapper(){// Avoid `arguments` object use disqualifying optimizations by
	// converting it to an array before providing it to other functions.
	var length=arguments.length,index=length,args=Array(length);while(index--){args[index]=arguments[index];}if(partials){args=composeArgs(args,partials,holders);}if(partialsRight){args=composeArgsRight(args,partialsRight,holdersRight);}if(isCurry||isCurryRight){var placeholder=wrapper.placeholder,argsHolders=replaceHolders(args,placeholder);length-=argsHolders.length;if(length<arity){var newArgPos=argPos?arrayCopy(argPos):undefined,newArity=nativeMax(arity-length,0),newsHolders=isCurry?argsHolders:undefined,newHoldersRight=isCurry?undefined:argsHolders,newPartials=isCurry?args:undefined,newPartialsRight=isCurry?undefined:args;bitmask|=isCurry?PARTIAL_FLAG:PARTIAL_RIGHT_FLAG;bitmask&=~(isCurry?PARTIAL_RIGHT_FLAG:PARTIAL_FLAG);if(!isCurryBound){bitmask&=~(BIND_FLAG|BIND_KEY_FLAG);}var newData=[func,bitmask,thisArg,newPartials,newsHolders,newPartialsRight,newHoldersRight,newArgPos,ary,newArity],result=createHybridWrapper.apply(undefined,newData);if(isLaziable(func)){setData(result,newData);}result.placeholder=placeholder;return result;}}var thisBinding=isBind?thisArg:this,fn=isBindKey?thisBinding[func]:func;if(argPos){args=reorder(args,argPos);}if(isAry&&ary<args.length){args.length=ary;}if(this&&this!==root&&this instanceof wrapper){fn=Ctor||createCtorWrapper(func);}return fn.apply(thisBinding,args);}return wrapper;}/**
	     * Creates the padding required for `string` based on the given `length`.
	     * The `chars` string is truncated if the number of characters exceeds `length`.
	     *
	     * @private
	     * @param {string} string The string to create padding for.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the pad for `string`.
	     */function createPadding(string,length,chars){var strLength=string.length;length=+length;if(strLength>=length||!nativeIsFinite(length)){return'';}var padLength=length-strLength;chars=chars==null?' ':chars+'';return repeat(chars,nativeCeil(padLength/chars.length)).slice(0,padLength);}/**
	     * Creates a function that wraps `func` and invokes it with the optional `this`
	     * binding of `thisArg` and the `partials` prepended to those provided to
	     * the wrapper.
	     *
	     * @private
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {Array} partials The arguments to prepend to those provided to the new function.
	     * @returns {Function} Returns the new bound function.
	     */function createPartialWrapper(func,bitmask,thisArg,partials){var isBind=bitmask&BIND_FLAG,Ctor=createCtorWrapper(func);function wrapper(){// Avoid `arguments` object use disqualifying optimizations by
	// converting it to an array before providing it `func`.
	var argsIndex=-1,argsLength=arguments.length,leftIndex=-1,leftLength=partials.length,args=Array(leftLength+argsLength);while(++leftIndex<leftLength){args[leftIndex]=partials[leftIndex];}while(argsLength--){args[leftIndex++]=arguments[++argsIndex];}var fn=this&&this!==root&&this instanceof wrapper?Ctor:func;return fn.apply(isBind?thisArg:this,args);}return wrapper;}/**
	     * Creates a `_.ceil`, `_.floor`, or `_.round` function.
	     *
	     * @private
	     * @param {string} methodName The name of the `Math` method to use when rounding.
	     * @returns {Function} Returns the new round function.
	     */function createRound(methodName){var func=Math[methodName];return function(number,precision){precision=precision===undefined?0:+precision||0;if(precision){precision=pow(10,precision);return func(number*precision)/precision;}return func(number);};}/**
	     * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
	     *
	     * @private
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {Function} Returns the new index function.
	     */function createSortedIndex(retHighest){return function(array,value,iteratee,thisArg){var callback=getCallback(iteratee);return iteratee==null&&callback===baseCallback?binaryIndex(array,value,retHighest):binaryIndexBy(array,value,callback(iteratee,thisArg,1),retHighest);};}/**
	     * Creates a function that either curries or invokes `func` with optional
	     * `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of flags.
	     *  The bitmask may be composed of the following flags:
	     *     1 - `_.bind`
	     *     2 - `_.bindKey`
	     *     4 - `_.curry` or `_.curryRight` of a bound function
	     *     8 - `_.curry`
	     *    16 - `_.curryRight`
	     *    32 - `_.partial`
	     *    64 - `_.partialRight`
	     *   128 - `_.rearg`
	     *   256 - `_.ary`
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to be partially applied.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */function createWrapper(func,bitmask,thisArg,partials,holders,argPos,ary,arity){var isBindKey=bitmask&BIND_KEY_FLAG;if(!isBindKey&&typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}var length=partials?partials.length:0;if(!length){bitmask&=~(PARTIAL_FLAG|PARTIAL_RIGHT_FLAG);partials=holders=undefined;}length-=holders?holders.length:0;if(bitmask&PARTIAL_RIGHT_FLAG){var partialsRight=partials,holdersRight=holders;partials=holders=undefined;}var data=isBindKey?undefined:getData(func),newData=[func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity];if(data){mergeData(newData,data);bitmask=newData[1];arity=newData[9];}newData[9]=arity==null?isBindKey?0:func.length:nativeMax(arity-length,0)||0;if(bitmask==BIND_FLAG){var result=createBindWrapper(newData[0],newData[2]);}else if((bitmask==PARTIAL_FLAG||bitmask==(BIND_FLAG|PARTIAL_FLAG))&&!newData[4].length){result=createPartialWrapper.apply(undefined,newData);}else{result=createHybridWrapper.apply(undefined,newData);}var setter=data?baseSetData:setData;return setter(result,newData);}/**
	     * A specialized version of `baseIsEqualDeep` for arrays with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Array} array The array to compare.
	     * @param {Array} other The other array to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing arrays.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	     */function equalArrays(array,other,equalFunc,customizer,isLoose,stackA,stackB){var index=-1,arrLength=array.length,othLength=other.length;if(arrLength!=othLength&&!(isLoose&&othLength>arrLength)){return false;}// Ignore non-index properties.
	while(++index<arrLength){var arrValue=array[index],othValue=other[index],result=customizer?customizer(isLoose?othValue:arrValue,isLoose?arrValue:othValue,index):undefined;if(result!==undefined){if(result){continue;}return false;}// Recursively compare arrays (susceptible to call stack limits).
	if(isLoose){if(!arraySome(other,function(othValue){return arrValue===othValue||equalFunc(arrValue,othValue,customizer,isLoose,stackA,stackB);})){return false;}}else if(!(arrValue===othValue||equalFunc(arrValue,othValue,customizer,isLoose,stackA,stackB))){return false;}}return true;}/**
	     * A specialized version of `baseIsEqualDeep` for comparing objects of
	     * the same `toStringTag`.
	     *
	     * **Note:** This function only supports comparing values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {string} tag The `toStringTag` of the objects to compare.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */function equalByTag(object,other,tag){switch(tag){case boolTag:case dateTag:// Coerce dates and booleans to numbers, dates to milliseconds and booleans
	// to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	return+object==+other;case errorTag:return object.name==other.name&&object.message==other.message;case numberTag:// Treat `NaN` vs. `NaN` as equal.
	return object!=+object?other!=+other:object==+other;case regexpTag:case stringTag:// Coerce regexes to strings and treat strings primitives and string
	// objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	return object==other+'';}return false;}/**
	     * A specialized version of `baseIsEqualDeep` for objects with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */function equalObjects(object,other,equalFunc,customizer,isLoose,stackA,stackB){var objProps=keys(object),objLength=objProps.length,othProps=keys(other),othLength=othProps.length;if(objLength!=othLength&&!isLoose){return false;}var index=objLength;while(index--){var key=objProps[index];if(!(isLoose?key in other:hasOwnProperty.call(other,key))){return false;}}var skipCtor=isLoose;while(++index<objLength){key=objProps[index];var objValue=object[key],othValue=other[key],result=customizer?customizer(isLoose?othValue:objValue,isLoose?objValue:othValue,key):undefined;// Recursively compare objects (susceptible to call stack limits).
	if(!(result===undefined?equalFunc(objValue,othValue,customizer,isLoose,stackA,stackB):result)){return false;}skipCtor||(skipCtor=key=='constructor');}if(!skipCtor){var objCtor=object.constructor,othCtor=other.constructor;// Non `Object` object instances with different constructors are not equal.
	if(objCtor!=othCtor&&'constructor'in object&&'constructor'in other&&!(typeof objCtor=='function'&&objCtor instanceof objCtor&&typeof othCtor=='function'&&othCtor instanceof othCtor)){return false;}}return true;}/**
	     * Gets the appropriate "callback" function. If the `_.callback` method is
	     * customized this function returns the custom method, otherwise it returns
	     * the `baseCallback` function. If arguments are provided the chosen function
	     * is invoked with them and its result is returned.
	     *
	     * @private
	     * @returns {Function} Returns the chosen function or its result.
	     */function getCallback(func,thisArg,argCount){var result=lodash.callback||callback;result=result===callback?baseCallback:result;return argCount?result(func,thisArg,argCount):result;}/**
	     * Gets metadata for `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {*} Returns the metadata for `func`.
	     */var getData=!metaMap?noop:function(func){return metaMap.get(func);};/**
	     * Gets the name of `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {string} Returns the function name.
	     */function getFuncName(func){var result=func.name+'',array=realNames[result],length=array?array.length:0;while(length--){var data=array[length],otherFunc=data.func;if(otherFunc==null||otherFunc==func){return data.name;}}return result;}/**
	     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
	     * customized this function returns the custom method, otherwise it returns
	     * the `baseIndexOf` function. If arguments are provided the chosen function
	     * is invoked with them and its result is returned.
	     *
	     * @private
	     * @returns {Function|number} Returns the chosen function or its result.
	     */function getIndexOf(collection,target,fromIndex){var result=lodash.indexOf||indexOf;result=result===indexOf?baseIndexOf:result;return collection?result(collection,target,fromIndex):result;}/**
	     * Gets the "length" property value of `object`.
	     *
	     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	     * that affects Safari on at least iOS 8.1-8.3 ARM64.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {*} Returns the "length" value.
	     */var getLength=baseProperty('length');/**
	     * Gets the propery names, values, and compare flags of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the match data of `object`.
	     */function getMatchData(object){var result=pairs(object),length=result.length;while(length--){result[length][2]=isStrictComparable(result[length][1]);}return result;}/**
	     * Gets the native function at `key` of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {string} key The key of the method to get.
	     * @returns {*} Returns the function if it's native, else `undefined`.
	     */function getNative(object,key){var value=object==null?undefined:object[key];return isNative(value)?value:undefined;}/**
	     * Gets the view, applying any `transforms` to the `start` and `end` positions.
	     *
	     * @private
	     * @param {number} start The start of the view.
	     * @param {number} end The end of the view.
	     * @param {Array} transforms The transformations to apply to the view.
	     * @returns {Object} Returns an object containing the `start` and `end`
	     *  positions of the view.
	     */function getView(start,end,transforms){var index=-1,length=transforms.length;while(++index<length){var data=transforms[index],size=data.size;switch(data.type){case'drop':start+=size;break;case'dropRight':end-=size;break;case'take':end=nativeMin(end,start+size);break;case'takeRight':start=nativeMax(start,end-size);break;}}return{'start':start,'end':end};}/**
	     * Initializes an array clone.
	     *
	     * @private
	     * @param {Array} array The array to clone.
	     * @returns {Array} Returns the initialized clone.
	     */function initCloneArray(array){var length=array.length,result=new array.constructor(length);// Add array properties assigned by `RegExp#exec`.
	if(length&&typeof array[0]=='string'&&hasOwnProperty.call(array,'index')){result.index=array.index;result.input=array.input;}return result;}/**
	     * Initializes an object clone.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @returns {Object} Returns the initialized clone.
	     */function initCloneObject(object){var Ctor=object.constructor;if(!(typeof Ctor=='function'&&Ctor instanceof Ctor)){Ctor=Object;}return new Ctor();}/**
	     * Initializes an object clone based on its `toStringTag`.
	     *
	     * **Note:** This function only supports cloning values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @param {string} tag The `toStringTag` of the object to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the initialized clone.
	     */function initCloneByTag(object,tag,isDeep){var Ctor=object.constructor;switch(tag){case arrayBufferTag:return bufferClone(object);case boolTag:case dateTag:return new Ctor(+object);case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:var buffer=object.buffer;return new Ctor(isDeep?bufferClone(buffer):buffer,object.byteOffset,object.length);case numberTag:case stringTag:return new Ctor(object);case regexpTag:var result=new Ctor(object.source,reFlags.exec(object));result.lastIndex=object.lastIndex;}return result;}/**
	     * Invokes the method at `path` on `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {Array} args The arguments to invoke the method with.
	     * @returns {*} Returns the result of the invoked method.
	     */function invokePath(object,path,args){if(object!=null&&!isKey(path,object)){path=toPath(path);object=path.length==1?object:baseGet(object,baseSlice(path,0,-1));path=last(path);}var func=object==null?object:object[path];return func==null?undefined:func.apply(object,args);}/**
	     * Checks if `value` is array-like.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	     */function isArrayLike(value){return value!=null&&isLength(getLength(value));}/**
	     * Checks if `value` is a valid array-like index.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	     */function isIndex(value,length){value=typeof value=='number'||reIsUint.test(value)?+value:-1;length=length==null?MAX_SAFE_INTEGER:length;return value>-1&&value%1==0&&value<length;}/**
	     * Checks if the provided arguments are from an iteratee call.
	     *
	     * @private
	     * @param {*} value The potential iteratee value argument.
	     * @param {*} index The potential iteratee index or key argument.
	     * @param {*} object The potential iteratee object argument.
	     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	     */function isIterateeCall(value,index,object){if(!isObject(object)){return false;}var type=typeof index==='undefined'?'undefined':(0,_typeof3.default)(index);if(type=='number'?isArrayLike(object)&&isIndex(index,object.length):type=='string'&&index in object){var other=object[index];return value===value?value===other:other!==other;}return false;}/**
	     * Checks if `value` is a property name and not a property path.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {Object} [object] The object to query keys on.
	     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	     */function isKey(value,object){var type=typeof value==='undefined'?'undefined':(0,_typeof3.default)(value);if(type=='string'&&reIsPlainProp.test(value)||type=='number'){return true;}if(isArray(value)){return false;}var result=!reIsDeepProp.test(value);return result||object!=null&&value in toObject(object);}/**
	     * Checks if `func` has a lazy counterpart.
	     *
	     * @private
	     * @param {Function} func The function to check.
	     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
	     */function isLaziable(func){var funcName=getFuncName(func),other=lodash[funcName];if(typeof other!='function'||!(funcName in LazyWrapper.prototype)){return false;}if(func===other){return true;}var data=getData(other);return!!data&&func===data[0];}/**
	     * Checks if `value` is a valid array-like length.
	     *
	     * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	     */function isLength(value){return typeof value=='number'&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;}/**
	     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` if suitable for strict
	     *  equality comparisons, else `false`.
	     */function isStrictComparable(value){return value===value&&!isObject(value);}/**
	     * Merges the function metadata of `source` into `data`.
	     *
	     * Merging metadata reduces the number of wrappers required to invoke a function.
	     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
	     * augment function arguments, making the order in which they are executed important,
	     * preventing the merging of metadata. However, we make an exception for a safe
	     * common case where curried functions have `_.ary` and or `_.rearg` applied.
	     *
	     * @private
	     * @param {Array} data The destination metadata.
	     * @param {Array} source The source metadata.
	     * @returns {Array} Returns `data`.
	     */function mergeData(data,source){var bitmask=data[1],srcBitmask=source[1],newBitmask=bitmask|srcBitmask,isCommon=newBitmask<ARY_FLAG;var isCombo=srcBitmask==ARY_FLAG&&bitmask==CURRY_FLAG||srcBitmask==ARY_FLAG&&bitmask==REARG_FLAG&&data[7].length<=source[8]||srcBitmask==(ARY_FLAG|REARG_FLAG)&&bitmask==CURRY_FLAG;// Exit early if metadata can't be merged.
	if(!(isCommon||isCombo)){return data;}// Use source `thisArg` if available.
	if(srcBitmask&BIND_FLAG){data[2]=source[2];// Set when currying a bound function.
	newBitmask|=bitmask&BIND_FLAG?0:CURRY_BOUND_FLAG;}// Compose partial arguments.
	var value=source[3];if(value){var partials=data[3];data[3]=partials?composeArgs(partials,value,source[4]):arrayCopy(value);data[4]=partials?replaceHolders(data[3],PLACEHOLDER):arrayCopy(source[4]);}// Compose partial right arguments.
	value=source[5];if(value){partials=data[5];data[5]=partials?composeArgsRight(partials,value,source[6]):arrayCopy(value);data[6]=partials?replaceHolders(data[5],PLACEHOLDER):arrayCopy(source[6]);}// Use source `argPos` if available.
	value=source[7];if(value){data[7]=arrayCopy(value);}// Use source `ary` if it's smaller.
	if(srcBitmask&ARY_FLAG){data[8]=data[8]==null?source[8]:nativeMin(data[8],source[8]);}// Use source `arity` if one is not provided.
	if(data[9]==null){data[9]=source[9];}// Use source `func` and merge bitmasks.
	data[0]=source[0];data[1]=newBitmask;return data;}/**
	     * Used by `_.defaultsDeep` to customize its `_.merge` use.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @returns {*} Returns the value to assign to the destination object.
	     */function mergeDefaults(objectValue,sourceValue){return objectValue===undefined?sourceValue:merge(objectValue,sourceValue,mergeDefaults);}/**
	     * A specialized version of `_.pick` which picks `object` properties specified
	     * by `props`.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {string[]} props The property names to pick.
	     * @returns {Object} Returns the new object.
	     */function pickByArray(object,props){object=toObject(object);var index=-1,length=props.length,result={};while(++index<length){var key=props[index];if(key in object){result[key]=object[key];}}return result;}/**
	     * A specialized version of `_.pick` which picks `object` properties `predicate`
	     * returns truthy for.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Object} Returns the new object.
	     */function pickByCallback(object,predicate){var result={};baseForIn(object,function(value,key,object){if(predicate(value,key,object)){result[key]=value;}});return result;}/**
	     * Reorder `array` according to the specified indexes where the element at
	     * the first index is assigned as the first element, the element at
	     * the second index is assigned as the second element, and so on.
	     *
	     * @private
	     * @param {Array} array The array to reorder.
	     * @param {Array} indexes The arranged array indexes.
	     * @returns {Array} Returns `array`.
	     */function reorder(array,indexes){var arrLength=array.length,length=nativeMin(indexes.length,arrLength),oldArray=arrayCopy(array);while(length--){var index=indexes[length];array[length]=isIndex(index,arrLength)?oldArray[index]:undefined;}return array;}/**
	     * Sets metadata for `func`.
	     *
	     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	     * period of time, it will trip its breaker and transition to an identity function
	     * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
	     * for more details.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */var setData=function(){var count=0,lastCalled=0;return function(key,value){var stamp=now(),remaining=HOT_SPAN-(stamp-lastCalled);lastCalled=stamp;if(remaining>0){if(++count>=HOT_COUNT){return key;}}else{count=0;}return baseSetData(key,value);};}();/**
	     * A fallback implementation of `Object.keys` which creates an array of the
	     * own enumerable property names of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */function shimKeys(object){var props=keysIn(object),propsLength=props.length,length=propsLength&&object.length;var allowIndexes=!!length&&isLength(length)&&(isArray(object)||isArguments(object));var index=-1,result=[];while(++index<propsLength){var key=props[index];if(allowIndexes&&isIndex(key,length)||hasOwnProperty.call(object,key)){result.push(key);}}return result;}/**
	     * Converts `value` to an array-like object if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Array|Object} Returns the array-like object.
	     */function toIterable(value){if(value==null){return[];}if(!isArrayLike(value)){return values(value);}return isObject(value)?value:Object(value);}/**
	     * Converts `value` to an object if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Object} Returns the object.
	     */function toObject(value){return isObject(value)?value:Object(value);}/**
	     * Converts `value` to property path array if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Array} Returns the property path array.
	     */function toPath(value){if(isArray(value)){return value;}var result=[];baseToString(value).replace(rePropName,function(match,number,quote,string){result.push(quote?string.replace(reEscapeChar,'$1'):number||match);});return result;}/**
	     * Creates a clone of `wrapper`.
	     *
	     * @private
	     * @param {Object} wrapper The wrapper to clone.
	     * @returns {Object} Returns the cloned wrapper.
	     */function wrapperClone(wrapper){return wrapper instanceof LazyWrapper?wrapper.clone():new LodashWrapper(wrapper.__wrapped__,wrapper.__chain__,arrayCopy(wrapper.__actions__));}/*------------------------------------------------------------------------*//**
	     * Creates an array of elements split into groups the length of `size`.
	     * If `collection` can't be split evenly, the final chunk will be the remaining
	     * elements.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to process.
	     * @param {number} [size=1] The length of each chunk.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the new array containing chunks.
	     * @example
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 2);
	     * // => [['a', 'b'], ['c', 'd']]
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 3);
	     * // => [['a', 'b', 'c'], ['d']]
	     */function chunk(array,size,guard){if(guard?isIterateeCall(array,size,guard):size==null){size=1;}else{size=nativeMax(nativeFloor(size)||1,1);}var index=0,length=array?array.length:0,resIndex=-1,result=Array(nativeCeil(length/size));while(index<length){result[++resIndex]=baseSlice(array,index,index+=size);}return result;}/**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are falsey.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */function compact(array){var index=-1,length=array?array.length:0,resIndex=-1,result=[];while(++index<length){var value=array[index];if(value){result[++resIndex]=value;}}return result;}/**
	     * Creates an array of unique `array` values not included in the other
	     * provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {...Array} [values] The arrays of values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.difference([1, 2, 3], [4, 2]);
	     * // => [1, 3]
	     */var difference=restParam(function(array,values){return isObjectLike(array)&&isArrayLike(array)?baseDifference(array,baseFlatten(values,false,true)):[];});/**
	     * Creates a slice of `array` with `n` elements dropped from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.drop([1, 2, 3]);
	     * // => [2, 3]
	     *
	     * _.drop([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.drop([1, 2, 3], 5);
	     * // => []
	     *
	     * _.drop([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */function drop(array,n,guard){var length=array?array.length:0;if(!length){return[];}if(guard?isIterateeCall(array,n,guard):n==null){n=1;}return baseSlice(array,n<0?0:n);}/**
	     * Creates a slice of `array` with `n` elements dropped from the end.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRight([1, 2, 3]);
	     * // => [1, 2]
	     *
	     * _.dropRight([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.dropRight([1, 2, 3], 5);
	     * // => []
	     *
	     * _.dropRight([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */function dropRight(array,n,guard){var length=array?array.length:0;if(!length){return[];}if(guard?isIterateeCall(array,n,guard):n==null){n=1;}n=length-(+n||0);return baseSlice(array,0,n<0?0:n);}/**
	     * Creates a slice of `array` excluding elements dropped from the end.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that match the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRightWhile([1, 2, 3], function(n) {
	     *   return n > 1;
	     * });
	     * // => [1]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
	     * // => ['barney', 'fred']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.dropRightWhile(users, 'active'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */function dropRightWhile(array,predicate,thisArg){return array&&array.length?baseWhile(array,getCallback(predicate,thisArg,3),true,true):[];}/**
	     * Creates a slice of `array` excluding elements dropped from the beginning.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropWhile([1, 2, 3], function(n) {
	     *   return n < 3;
	     * });
	     * // => [3]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
	     * // => ['fred', 'pebbles']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.dropWhile(users, 'active', false), 'user');
	     * // => ['pebbles']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.dropWhile(users, 'active'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */function dropWhile(array,predicate,thisArg){return array&&array.length?baseWhile(array,getCallback(predicate,thisArg,3),true):[];}/**
	     * Fills elements of `array` with `value` from `start` up to, but not
	     * including, `end`.
	     *
	     * **Note:** This method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _.fill(array, 'a');
	     * console.log(array);
	     * // => ['a', 'a', 'a']
	     *
	     * _.fill(Array(3), 2);
	     * // => [2, 2, 2]
	     *
	     * _.fill([4, 6, 8], '*', 1, 2);
	     * // => [4, '*', 8]
	     */function fill(array,value,start,end){var length=array?array.length:0;if(!length){return[];}if(start&&typeof start!='number'&&isIterateeCall(array,value,start)){start=0;end=length;}return baseFill(array,value,start,end);}/**
	     * This method is like `_.find` except that it returns the index of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.findIndex(users, function(chr) {
	     *   return chr.user == 'barney';
	     * });
	     * // => 0
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findIndex(users, { 'user': 'fred', 'active': false });
	     * // => 1
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findIndex(users, 'active', false);
	     * // => 0
	     *
	     * // using the `_.property` callback shorthand
	     * _.findIndex(users, 'active');
	     * // => 2
	     */var findIndex=createFindIndex();/**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of `collection` from right to left.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.findLastIndex(users, function(chr) {
	     *   return chr.user == 'pebbles';
	     * });
	     * // => 2
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
	     * // => 0
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findLastIndex(users, 'active', false);
	     * // => 2
	     *
	     * // using the `_.property` callback shorthand
	     * _.findLastIndex(users, 'active');
	     * // => 0
	     */var findLastIndex=createFindIndex(true);/**
	     * Gets the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @alias head
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the first element of `array`.
	     * @example
	     *
	     * _.first([1, 2, 3]);
	     * // => 1
	     *
	     * _.first([]);
	     * // => undefined
	     */function first(array){return array?array[0]:undefined;}/**
	     * Flattens a nested array. If `isDeep` is `true` the array is recursively
	     * flattened, otherwise it's only flattened a single level.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isDeep] Specify a deep flatten.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2, 3, [4]]]);
	     * // => [1, 2, 3, [4]]
	     *
	     * // using `isDeep`
	     * _.flatten([1, [2, 3, [4]]], true);
	     * // => [1, 2, 3, 4]
	     */function flatten(array,isDeep,guard){var length=array?array.length:0;if(guard&&isIterateeCall(array,isDeep,guard)){isDeep=false;}return length?baseFlatten(array,isDeep):[];}/**
	     * Recursively flattens a nested array.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to recursively flatten.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flattenDeep([1, [2, 3, [4]]]);
	     * // => [1, 2, 3, 4]
	     */function flattenDeep(array){var length=array?array.length:0;return length?baseFlatten(array,true):[];}/**
	     * Gets the index at which the first occurrence of `value` is found in `array`
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons. If `fromIndex` is negative, it's used as the offset
	     * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
	     * performs a faster binary search.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
	     *  to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 1, 2], 2);
	     * // => 1
	     *
	     * // using `fromIndex`
	     * _.indexOf([1, 2, 1, 2], 2, 2);
	     * // => 3
	     *
	     * // performing a binary search
	     * _.indexOf([1, 1, 2, 2], 2, true);
	     * // => 2
	     */function indexOf(array,value,fromIndex){var length=array?array.length:0;if(!length){return-1;}if(typeof fromIndex=='number'){fromIndex=fromIndex<0?nativeMax(length+fromIndex,0):fromIndex;}else if(fromIndex){var index=binaryIndex(array,value);if(index<length&&(value===value?value===array[index]:array[index]!==array[index])){return index;}return-1;}return baseIndexOf(array,value,fromIndex||0);}/**
	     * Gets all but the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     */function initial(array){return dropRight(array,1);}/**
	     * Creates an array of unique values that are included in all of the provided
	     * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of shared values.
	     * @example
	     * _.intersection([1, 2], [4, 2], [2, 1]);
	     * // => [2]
	     */var intersection=restParam(function(arrays){var othLength=arrays.length,othIndex=othLength,caches=Array(length),indexOf=getIndexOf(),isCommon=indexOf===baseIndexOf,result=[];while(othIndex--){var value=arrays[othIndex]=isArrayLike(value=arrays[othIndex])?value:[];caches[othIndex]=isCommon&&value.length>=120?createCache(othIndex&&value):null;}var array=arrays[0],index=-1,length=array?array.length:0,seen=caches[0];outer:while(++index<length){value=array[index];if((seen?cacheIndexOf(seen,value):indexOf(result,value,0))<0){var othIndex=othLength;while(--othIndex){var cache=caches[othIndex];if((cache?cacheIndexOf(cache,value):indexOf(arrays[othIndex],value,0))<0){continue outer;}}if(seen){seen.push(value);}result.push(value);}}return result;});/**
	     * Gets the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the last element of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     */function last(array){var length=array?array.length:0;return length?array[length-1]:undefined;}/**
	     * This method is like `_.indexOf` except that it iterates over elements of
	     * `array` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=array.length-1] The index to search from
	     *  or `true` to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 1, 2], 2);
	     * // => 3
	     *
	     * // using `fromIndex`
	     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
	     * // => 1
	     *
	     * // performing a binary search
	     * _.lastIndexOf([1, 1, 2, 2], 2, true);
	     * // => 3
	     */function lastIndexOf(array,value,fromIndex){var length=array?array.length:0;if(!length){return-1;}var index=length;if(typeof fromIndex=='number'){index=(fromIndex<0?nativeMax(length+fromIndex,0):nativeMin(fromIndex||0,length-1))+1;}else if(fromIndex){index=binaryIndex(array,value,true)-1;var other=array[index];if(value===value?value===other:other!==other){return index;}return-1;}if(value!==value){return indexOfNaN(array,index,true);}while(index--){if(array[index]===value){return index;}}return-1;}/**
	     * Removes all provided values from `array` using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * **Note:** Unlike `_.without`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...*} [values] The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3, 1, 2, 3];
	     *
	     * _.pull(array, 2, 3);
	     * console.log(array);
	     * // => [1, 1]
	     */function pull(){var args=arguments,array=args[0];if(!(array&&array.length)){return array;}var index=0,indexOf=getIndexOf(),length=args.length;while(++index<length){var fromIndex=0,value=args[index];while((fromIndex=indexOf(array,value,fromIndex))>-1){splice.call(array,fromIndex,1);}}return array;}/**
	     * Removes elements from `array` corresponding to the given indexes and returns
	     * an array of the removed elements. Indexes may be specified as an array of
	     * indexes or as individual arguments.
	     *
	     * **Note:** Unlike `_.at`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...(number|number[])} [indexes] The indexes of elements to remove,
	     *  specified as individual indexes or arrays of indexes.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [5, 10, 15, 20];
	     * var evens = _.pullAt(array, 1, 3);
	     *
	     * console.log(array);
	     * // => [5, 15]
	     *
	     * console.log(evens);
	     * // => [10, 20]
	     */var pullAt=restParam(function(array,indexes){indexes=baseFlatten(indexes);var result=baseAt(array,indexes);basePullAt(array,indexes.sort(baseCompareAscending));return result;});/**
	     * Removes all elements from `array` that `predicate` returns truthy for
	     * and returns an array of the removed elements. The predicate is bound to
	     * `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * **Note:** Unlike `_.filter`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4];
	     * var evens = _.remove(array, function(n) {
	     *   return n % 2 == 0;
	     * });
	     *
	     * console.log(array);
	     * // => [1, 3]
	     *
	     * console.log(evens);
	     * // => [2, 4]
	     */function remove(array,predicate,thisArg){var result=[];if(!(array&&array.length)){return result;}var index=-1,indexes=[],length=array.length;predicate=getCallback(predicate,thisArg,3);while(++index<length){var value=array[index];if(predicate(value,index,array)){result.push(value);indexes.push(index);}}basePullAt(array,indexes);return result;}/**
	     * Gets all but the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @alias tail
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.rest([1, 2, 3]);
	     * // => [2, 3]
	     */function rest(array){return drop(array,1);}/**
	     * Creates a slice of `array` from `start` up to, but not including, `end`.
	     *
	     * **Note:** This method is used instead of `Array#slice` to support node
	     * lists in IE < 9 and to ensure dense arrays are returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */function slice(array,start,end){var length=array?array.length:0;if(!length){return[];}if(end&&typeof end!='number'&&isIterateeCall(array,start,end)){start=0;end=length;}return baseSlice(array,start,end);}/**
	     * Uses a binary search to determine the lowest index at which `value` should
	     * be inserted into `array` in order to maintain its sort order. If an iteratee
	     * function is provided it's invoked for `value` and each element of `array`
	     * to compute their sort ranking. The iteratee is bound to `thisArg` and
	     * invoked with one argument; (value).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedIndex([30, 50], 40);
	     * // => 1
	     *
	     * _.sortedIndex([4, 4, 5, 5], 5);
	     * // => 2
	     *
	     * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
	     *
	     * // using an iteratee function
	     * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
	     *   return this.data[word];
	     * }, dict);
	     * // => 1
	     *
	     * // using the `_.property` callback shorthand
	     * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
	     * // => 1
	     */var sortedIndex=createSortedIndex();/**
	     * This method is like `_.sortedIndex` except that it returns the highest
	     * index at which `value` should be inserted into `array` in order to
	     * maintain its sort order.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedLastIndex([4, 4, 5, 5], 5);
	     * // => 4
	     */var sortedLastIndex=createSortedIndex(true);/**
	     * Creates a slice of `array` with `n` elements taken from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.take([1, 2, 3]);
	     * // => [1]
	     *
	     * _.take([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.take([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.take([1, 2, 3], 0);
	     * // => []
	     */function take(array,n,guard){var length=array?array.length:0;if(!length){return[];}if(guard?isIterateeCall(array,n,guard):n==null){n=1;}return baseSlice(array,0,n<0?0:n);}/**
	     * Creates a slice of `array` with `n` elements taken from the end.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRight([1, 2, 3]);
	     * // => [3]
	     *
	     * _.takeRight([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.takeRight([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.takeRight([1, 2, 3], 0);
	     * // => []
	     */function takeRight(array,n,guard){var length=array?array.length:0;if(!length){return[];}if(guard?isIterateeCall(array,n,guard):n==null){n=1;}n=length-(+n||0);return baseSlice(array,n<0?0:n);}/**
	     * Creates a slice of `array` with elements taken from the end. Elements are
	     * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
	     * and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRightWhile([1, 2, 3], function(n) {
	     *   return n > 1;
	     * });
	     * // => [2, 3]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
	     * // => ['pebbles']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.takeRightWhile(users, 'active', false), 'user');
	     * // => ['fred', 'pebbles']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.takeRightWhile(users, 'active'), 'user');
	     * // => []
	     */function takeRightWhile(array,predicate,thisArg){return array&&array.length?baseWhile(array,getCallback(predicate,thisArg,3),false,true):[];}/**
	     * Creates a slice of `array` with elements taken from the beginning. Elements
	     * are taken until `predicate` returns falsey. The predicate is bound to
	     * `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeWhile([1, 2, 3], function(n) {
	     *   return n < 3;
	     * });
	     * // => [1, 2]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false},
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.takeWhile(users, 'active', false), 'user');
	     * // => ['barney', 'fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.takeWhile(users, 'active'), 'user');
	     * // => []
	     */function takeWhile(array,predicate,thisArg){return array&&array.length?baseWhile(array,getCallback(predicate,thisArg,3)):[];}/**
	     * Creates an array of unique values, in order, from all of the provided arrays
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of combined values.
	     * @example
	     *
	     * _.union([1, 2], [4, 2], [2, 1]);
	     * // => [1, 2, 4]
	     */var union=restParam(function(arrays){return baseUniq(baseFlatten(arrays,false,true));});/**
	     * Creates a duplicate-free version of an array, using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons, in which only the first occurence of each element
	     * is kept. Providing `true` for `isSorted` performs a faster search algorithm
	     * for sorted arrays. If an iteratee function is provided it's invoked for
	     * each element in the array to generate the criterion by which uniqueness
	     * is computed. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, array).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias unique
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {boolean} [isSorted] Specify the array is sorted.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new duplicate-value-free array.
	     * @example
	     *
	     * _.uniq([2, 1, 2]);
	     * // => [2, 1]
	     *
	     * // using `isSorted`
	     * _.uniq([1, 1, 2], true);
	     * // => [1, 2]
	     *
	     * // using an iteratee function
	     * _.uniq([1, 2.5, 1.5, 2], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => [1, 2.5]
	     *
	     * // using the `_.property` callback shorthand
	     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */function uniq(array,isSorted,iteratee,thisArg){var length=array?array.length:0;if(!length){return[];}if(isSorted!=null&&typeof isSorted!='boolean'){thisArg=iteratee;iteratee=isIterateeCall(array,isSorted,thisArg)?undefined:isSorted;isSorted=false;}var callback=getCallback();if(!(iteratee==null&&callback===baseCallback)){iteratee=callback(iteratee,thisArg,3);}return isSorted&&getIndexOf()===baseIndexOf?sortedUniq(array,iteratee):baseUniq(array,iteratee);}/**
	     * This method is like `_.zip` except that it accepts an array of grouped
	     * elements and creates an array regrouping the elements to their pre-zip
	     * configuration.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     *
	     * _.unzip(zipped);
	     * // => [['fred', 'barney'], [30, 40], [true, false]]
	     */function unzip(array){if(!(array&&array.length)){return[];}var index=-1,length=0;array=arrayFilter(array,function(group){if(isArrayLike(group)){length=nativeMax(group.length,length);return true;}});var result=Array(length);while(++index<length){result[index]=arrayMap(array,baseProperty(index));}return result;}/**
	     * This method is like `_.unzip` except that it accepts an iteratee to specify
	     * how regrouped values should be combined. The `iteratee` is bound to `thisArg`
	     * and invoked with four arguments: (accumulator, value, index, group).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @param {Function} [iteratee] The function to combine regrouped values.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
	     * // => [[1, 10, 100], [2, 20, 200]]
	     *
	     * _.unzipWith(zipped, _.add);
	     * // => [3, 30, 300]
	     */function unzipWith(array,iteratee,thisArg){var length=array?array.length:0;if(!length){return[];}var result=unzip(array);if(iteratee==null){return result;}iteratee=bindCallback(iteratee,thisArg,4);return arrayMap(result,function(group){return arrayReduce(group,iteratee,undefined,true);});}/**
	     * Creates an array excluding all provided values using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to filter.
	     * @param {...*} [values] The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.without([1, 2, 1, 3], 1, 2);
	     * // => [3]
	     */var without=restParam(function(array,values){return isArrayLike(array)?baseDifference(array,values):[];});/**
	     * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
	     * of the provided arrays.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of values.
	     * @example
	     *
	     * _.xor([1, 2], [4, 2]);
	     * // => [1, 4]
	     */function xor(){var index=-1,length=arguments.length;while(++index<length){var array=arguments[index];if(isArrayLike(array)){var result=result?arrayPush(baseDifference(result,array),baseDifference(array,result)):array;}}return result?baseUniq(result):[];}/**
	     * Creates an array of grouped elements, the first of which contains the first
	     * elements of the given arrays, the second of which contains the second elements
	     * of the given arrays, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to process.
	     * @returns {Array} Returns the new array of grouped elements.
	     * @example
	     *
	     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     */var zip=restParam(unzip);/**
	     * The inverse of `_.pairs`; this method returns an object composed from arrays
	     * of property names and values. Provide either a single two dimensional array,
	     * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
	     * and one of corresponding values.
	     *
	     * @static
	     * @memberOf _
	     * @alias object
	     * @category Array
	     * @param {Array} props The property names.
	     * @param {Array} [values=[]] The property values.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.zipObject([['fred', 30], ['barney', 40]]);
	     * // => { 'fred': 30, 'barney': 40 }
	     *
	     * _.zipObject(['fred', 'barney'], [30, 40]);
	     * // => { 'fred': 30, 'barney': 40 }
	     */function zipObject(props,values){var index=-1,length=props?props.length:0,result={};if(length&&!values&&!isArray(props[0])){values=[];}while(++index<length){var key=props[index];if(values){result[key]=values[index];}else if(key){result[key[0]]=key[1];}}return result;}/**
	     * This method is like `_.zip` except that it accepts an iteratee to specify
	     * how grouped values should be combined. The `iteratee` is bound to `thisArg`
	     * and invoked with four arguments: (accumulator, value, index, group).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to process.
	     * @param {Function} [iteratee] The function to combine grouped values.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new array of grouped elements.
	     * @example
	     *
	     * _.zipWith([1, 2], [10, 20], [100, 200], _.add);
	     * // => [111, 222]
	     */var zipWith=restParam(function(arrays){var length=arrays.length,iteratee=length>2?arrays[length-2]:undefined,thisArg=length>1?arrays[length-1]:undefined;if(length>2&&typeof iteratee=='function'){length-=2;}else{iteratee=length>1&&typeof thisArg=='function'?(--length,thisArg):undefined;thisArg=undefined;}arrays.length=length;return unzipWith(arrays,iteratee,thisArg);});/*------------------------------------------------------------------------*//**
	     * Creates a `lodash` object that wraps `value` with explicit method
	     * chaining enabled.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36 },
	     *   { 'user': 'fred',    'age': 40 },
	     *   { 'user': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _.chain(users)
	     *   .sortBy('age')
	     *   .map(function(chr) {
	     *     return chr.user + ' is ' + chr.age;
	     *   })
	     *   .first()
	     *   .value();
	     * // => 'pebbles is 1'
	     */function chain(value){var result=lodash(value);result.__chain__=true;return result;}/**
	     * This method invokes `interceptor` and returns `value`. The interceptor is
	     * bound to `thisArg` and invoked with one argument; (value). The purpose of
	     * this method is to "tap into" a method chain in order to perform operations
	     * on intermediate results within the chain.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @param {*} [thisArg] The `this` binding of `interceptor`.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3])
	     *  .tap(function(array) {
	     *    array.pop();
	     *  })
	     *  .reverse()
	     *  .value();
	     * // => [2, 1]
	     */function tap(value,interceptor,thisArg){interceptor.call(thisArg,value);return value;}/**
	     * This method is like `_.tap` except that it returns the result of `interceptor`.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @param {*} [thisArg] The `this` binding of `interceptor`.
	     * @returns {*} Returns the result of `interceptor`.
	     * @example
	     *
	     * _('  abc  ')
	     *  .chain()
	     *  .trim()
	     *  .thru(function(value) {
	     *    return [value];
	     *  })
	     *  .value();
	     * // => ['abc']
	     */function thru(value,interceptor,thisArg){return interceptor.call(thisArg,value);}/**
	     * Enables explicit method chaining on the wrapper object.
	     *
	     * @name chain
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // without explicit chaining
	     * _(users).first();
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // with explicit chaining
	     * _(users).chain()
	     *   .first()
	     *   .pick('user')
	     *   .value();
	     * // => { 'user': 'barney' }
	     */function wrapperChain(){return chain(this);}/**
	     * Executes the chained sequence and returns the wrapped result.
	     *
	     * @name commit
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2];
	     * var wrapped = _(array).push(3);
	     *
	     * console.log(array);
	     * // => [1, 2]
	     *
	     * wrapped = wrapped.commit();
	     * console.log(array);
	     * // => [1, 2, 3]
	     *
	     * wrapped.last();
	     * // => 3
	     *
	     * console.log(array);
	     * // => [1, 2, 3]
	     */function wrapperCommit(){return new LodashWrapper(this.value(),this.__chain__);}/**
	     * Creates a new array joining a wrapped array with any additional arrays
	     * and/or values.
	     *
	     * @name concat
	     * @memberOf _
	     * @category Chain
	     * @param {...*} [values] The values to concatenate.
	     * @returns {Array} Returns the new concatenated array.
	     * @example
	     *
	     * var array = [1];
	     * var wrapped = _(array).concat(2, [3], [[4]]);
	     *
	     * console.log(wrapped.value());
	     * // => [1, 2, 3, [4]]
	     *
	     * console.log(array);
	     * // => [1]
	     */var wrapperConcat=restParam(function(values){values=baseFlatten(values);return this.thru(function(array){return arrayConcat(isArray(array)?array:[toObject(array)],values);});});/**
	     * Creates a clone of the chained sequence planting `value` as the wrapped value.
	     *
	     * @name plant
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2];
	     * var wrapped = _(array).map(function(value) {
	     *   return Math.pow(value, 2);
	     * });
	     *
	     * var other = [3, 4];
	     * var otherWrapped = wrapped.plant(other);
	     *
	     * otherWrapped.value();
	     * // => [9, 16]
	     *
	     * wrapped.value();
	     * // => [1, 4]
	     */function wrapperPlant(value){var result,parent=this;while(parent instanceof baseLodash){var clone=wrapperClone(parent);if(result){previous.__wrapped__=clone;}else{result=clone;}var previous=clone;parent=parent.__wrapped__;}previous.__wrapped__=value;return result;}/**
	     * Reverses the wrapped array so the first element becomes the last, the
	     * second element becomes the second to last, and so on.
	     *
	     * **Note:** This method mutates the wrapped array.
	     *
	     * @name reverse
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new reversed `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _(array).reverse().value()
	     * // => [3, 2, 1]
	     *
	     * console.log(array);
	     * // => [3, 2, 1]
	     */function wrapperReverse(){var value=this.__wrapped__;var interceptor=function interceptor(value){return value.reverse();};if(value instanceof LazyWrapper){var wrapped=value;if(this.__actions__.length){wrapped=new LazyWrapper(this);}wrapped=wrapped.reverse();wrapped.__actions__.push({'func':thru,'args':[interceptor],'thisArg':undefined});return new LodashWrapper(wrapped,this.__chain__);}return this.thru(interceptor);}/**
	     * Produces the result of coercing the unwrapped value to a string.
	     *
	     * @name toString
	     * @memberOf _
	     * @category Chain
	     * @returns {string} Returns the coerced string value.
	     * @example
	     *
	     * _([1, 2, 3]).toString();
	     * // => '1,2,3'
	     */function wrapperToString(){return this.value()+'';}/**
	     * Executes the chained sequence to extract the unwrapped value.
	     *
	     * @name value
	     * @memberOf _
	     * @alias run, toJSON, valueOf
	     * @category Chain
	     * @returns {*} Returns the resolved unwrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).value();
	     * // => [1, 2, 3]
	     */function wrapperValue(){return baseWrapperValue(this.__wrapped__,this.__actions__);}/*------------------------------------------------------------------------*//**
	     * Creates an array of elements corresponding to the given keys, or indexes,
	     * of `collection`. Keys may be specified as individual arguments or as arrays
	     * of keys.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(number|number[]|string|string[])} [props] The property names
	     *  or indexes of elements to pick, specified individually or in arrays.
	     * @returns {Array} Returns the new array of picked elements.
	     * @example
	     *
	     * _.at(['a', 'b', 'c'], [0, 2]);
	     * // => ['a', 'c']
	     *
	     * _.at(['barney', 'fred', 'pebbles'], 0, 2);
	     * // => ['barney', 'pebbles']
	     */var at=restParam(function(collection,props){return baseAt(collection,baseFlatten(props));});/**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is the number of times the key was returned by `iteratee`.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(n) {
	     *   return Math.floor(n);
	     * });
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy(['one', 'two', 'three'], 'length');
	     * // => { '3': 2, '5': 1 }
	     */var countBy=createAggregator(function(result,value,key){hasOwnProperty.call(result,key)?++result[key]:result[key]=1;});/**
	     * Checks if `predicate` returns truthy for **all** elements of `collection`.
	     * The predicate is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias all
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes'], Boolean);
	     * // => false
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': false },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.every(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.every(users, 'active', false);
	     * // => true
	     *
	     * // using the `_.property` callback shorthand
	     * _.every(users, 'active');
	     * // => false
	     */function every(collection,predicate,thisArg){var func=isArray(collection)?arrayEvery:baseEvery;if(thisArg&&isIterateeCall(collection,predicate,thisArg)){predicate=undefined;}if(typeof predicate!='function'||thisArg!==undefined){predicate=getCallback(predicate,thisArg,3);}return func(collection,predicate);}/**
	     * Iterates over elements of `collection`, returning an array of all elements
	     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias select
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * _.filter([4, 5, 6], function(n) {
	     *   return n % 2 == 0;
	     * });
	     * // => [4, 6]
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.filter(users, 'active', false), 'user');
	     * // => ['fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.filter(users, 'active'), 'user');
	     * // => ['barney']
	     */function filter(collection,predicate,thisArg){var func=isArray(collection)?arrayFilter:baseFilter;predicate=getCallback(predicate,thisArg,3);return func(collection,predicate);}/**
	     * Iterates over elements of `collection`, returning the first element
	     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias detect
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': true },
	     *   { 'user': 'fred',    'age': 40, 'active': false },
	     *   { 'user': 'pebbles', 'age': 1,  'active': true }
	     * ];
	     *
	     * _.result(_.find(users, function(chr) {
	     *   return chr.age < 40;
	     * }), 'user');
	     * // => 'barney'
	     *
	     * // using the `_.matches` callback shorthand
	     * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
	     * // => 'pebbles'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.result(_.find(users, 'active', false), 'user');
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.result(_.find(users, 'active'), 'user');
	     * // => 'barney'
	     */var find=createFind(baseEach);/**
	     * This method is like `_.find` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * _.findLast([1, 2, 3, 4], function(n) {
	     *   return n % 2 == 1;
	     * });
	     * // => 3
	     */var findLast=createFind(baseEachRight,true);/**
	     * Performs a deep comparison between each element in `collection` and the
	     * source object, returning the first element that has equivalent property
	     * values.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Object} source The object of property values to match.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
	     * // => 'barney'
	     *
	     * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
	     * // => 'fred'
	     */function findWhere(collection,source){return find(collection,baseMatches(source));}/**
	     * Iterates over elements of `collection` invoking `iteratee` for each element.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection). Iteratee functions may exit iteration early
	     * by explicitly returning `false`.
	     *
	     * **Note:** As with other "Collections" methods, objects with a "length" property
	     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	     * may be used for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @alias each
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2]).forEach(function(n) {
	     *   console.log(n);
	     * }).value();
	     * // => logs each value from left to right and returns the array
	     *
	     * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	     *   console.log(n, key);
	     * });
	     * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	     */var forEach=createForEach(arrayEach,baseEach);/**
	     * This method is like `_.forEach` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias eachRight
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2]).forEachRight(function(n) {
	     *   console.log(n);
	     * }).value();
	     * // => logs each value from right to left and returns the array
	     */var forEachRight=createForEach(arrayEachRight,baseEachRight);/**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is an array of the elements responsible for generating the key.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(n) {
	     *   return Math.floor(n);
	     * });
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * // using the `_.property` callback shorthand
	     * _.groupBy(['one', 'two', 'three'], 'length');
	     * // => { '3': ['one', 'two'], '5': ['three'] }
	     */var groupBy=createAggregator(function(result,value,key){if(hasOwnProperty.call(result,key)){result[key].push(value);}else{result[key]=[value];}});/**
	     * Checks if `target` is in `collection` using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons. If `fromIndex` is negative, it's used as the offset
	     * from the end of `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @alias contains, include
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {*} target The value to search for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
	     * @returns {boolean} Returns `true` if a matching element is found, else `false`.
	     * @example
	     *
	     * _.includes([1, 2, 3], 1);
	     * // => true
	     *
	     * _.includes([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
	     * // => true
	     *
	     * _.includes('pebbles', 'eb');
	     * // => true
	     */function includes(collection,target,fromIndex,guard){var length=collection?getLength(collection):0;if(!isLength(length)){collection=values(collection);length=collection.length;}if(typeof fromIndex!='number'||guard&&isIterateeCall(target,fromIndex,guard)){fromIndex=0;}else{fromIndex=fromIndex<0?nativeMax(length+fromIndex,0):fromIndex||0;}return typeof collection=='string'||!isArray(collection)&&isString(collection)?fromIndex<=length&&collection.indexOf(target,fromIndex)>-1:!!length&&getIndexOf(collection,target,fromIndex)>-1;}/**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is the last element responsible for generating the key. The
	     * iteratee function is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * var keyData = [
	     *   { 'dir': 'left', 'code': 97 },
	     *   { 'dir': 'right', 'code': 100 }
	     * ];
	     *
	     * _.indexBy(keyData, 'dir');
	     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keyData, function(object) {
	     *   return String.fromCharCode(object.code);
	     * });
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keyData, function(object) {
	     *   return this.fromCharCode(object.code);
	     * }, String);
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     */var indexBy=createAggregator(function(result,value,key){result[key]=value;});/**
	     * Invokes the method at `path` of each element in `collection`, returning
	     * an array of the results of each invoked method. Any additional arguments
	     * are provided to each invoked method. If `methodName` is a function it's
	     * invoked for, and `this` bound to, each element in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|Function|string} path The path of the method to invoke or
	     *  the function invoked per iteration.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	     * // => [[1, 5, 7], [1, 2, 3]]
	     *
	     * _.invoke([123, 456], String.prototype.split, '');
	     * // => [['1', '2', '3'], ['4', '5', '6']]
	     */var invoke=restParam(function(collection,path,args){var index=-1,isFunc=typeof path=='function',isProp=isKey(path),result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value){var func=isFunc?path:isProp&&value!=null?value[path]:undefined;result[++index]=func?func.apply(value,args):invokePath(value,path,args);});return result;});/**
	     * Creates an array of values by running each element in `collection` through
	     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	     *
	     * The guarded methods are:
	     * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
	     * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
	     * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
	     * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
	     * `sum`, `uniq`, and `words`
	     *
	     * @static
	     * @memberOf _
	     * @alias collect
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new mapped array.
	     * @example
	     *
	     * function timesThree(n) {
	     *   return n * 3;
	     * }
	     *
	     * _.map([1, 2], timesThree);
	     * // => [3, 6]
	     *
	     * _.map({ 'a': 1, 'b': 2 }, timesThree);
	     * // => [3, 6] (iteration order is not guaranteed)
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * // using the `_.property` callback shorthand
	     * _.map(users, 'user');
	     * // => ['barney', 'fred']
	     */function map(collection,iteratee,thisArg){var func=isArray(collection)?arrayMap:baseMap;iteratee=getCallback(iteratee,thisArg,3);return func(collection,iteratee);}/**
	     * Creates an array of elements split into two groups, the first of which
	     * contains elements `predicate` returns truthy for, while the second of which
	     * contains elements `predicate` returns falsey for. The predicate is bound
	     * to `thisArg` and invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the array of grouped elements.
	     * @example
	     *
	     * _.partition([1, 2, 3], function(n) {
	     *   return n % 2;
	     * });
	     * // => [[1, 3], [2]]
	     *
	     * _.partition([1.2, 2.3, 3.4], function(n) {
	     *   return this.floor(n) % 2;
	     * }, Math);
	     * // => [[1.2, 3.4], [2.3]]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': false },
	     *   { 'user': 'fred',    'age': 40, 'active': true },
	     *   { 'user': 'pebbles', 'age': 1,  'active': false }
	     * ];
	     *
	     * var mapper = function(array) {
	     *   return _.pluck(array, 'user');
	     * };
	     *
	     * // using the `_.matches` callback shorthand
	     * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
	     * // => [['pebbles'], ['barney', 'fred']]
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.map(_.partition(users, 'active', false), mapper);
	     * // => [['barney', 'pebbles'], ['fred']]
	     *
	     * // using the `_.property` callback shorthand
	     * _.map(_.partition(users, 'active'), mapper);
	     * // => [['fred'], ['barney', 'pebbles']]
	     */var partition=createAggregator(function(result,value,key){result[key?0:1].push(value);},function(){return[[],[]];});/**
	     * Gets the property value of `path` from all elements in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|string} path The path of the property to pluck.
	     * @returns {Array} Returns the property values.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.pluck(users, 'user');
	     * // => ['barney', 'fred']
	     *
	     * var userIndex = _.indexBy(users, 'user');
	     * _.pluck(userIndex, 'age');
	     * // => [36, 40] (iteration order is not guaranteed)
	     */function pluck(collection,path){return map(collection,property(path));}/**
	     * Reduces `collection` to a value which is the accumulated result of running
	     * each element in `collection` through `iteratee`, where each successive
	     * invocation is supplied the return value of the previous. If `accumulator`
	     * is not provided the first element of `collection` is used as the initial
	     * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
	     * (accumulator, value, index|key, collection).
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.reduce`, `_.reduceRight`, and `_.transform`.
	     *
	     * The guarded methods are:
	     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `sortByAll`,
	     * and `sortByOrder`
	     *
	     * @static
	     * @memberOf _
	     * @alias foldl, inject
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.reduce([1, 2], function(total, n) {
	     *   return total + n;
	     * });
	     * // => 3
	     *
	     * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
	     *   result[key] = n * 3;
	     *   return result;
	     * }, {});
	     * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
	     */var reduce=createReduce(arrayReduce,baseEach);/**
	     * This method is like `_.reduce` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias foldr
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var array = [[0, 1], [2, 3], [4, 5]];
	     *
	     * _.reduceRight(array, function(flattened, other) {
	     *   return flattened.concat(other);
	     * }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */var reduceRight=createReduce(arrayReduceRight,baseEachRight);/**
	     * The opposite of `_.filter`; this method returns the elements of `collection`
	     * that `predicate` does **not** return truthy for.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * _.reject([1, 2, 3, 4], function(n) {
	     *   return n % 2 == 0;
	     * });
	     * // => [1, 3]
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.reject(users, 'active', false), 'user');
	     * // => ['fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.reject(users, 'active'), 'user');
	     * // => ['barney']
	     */function reject(collection,predicate,thisArg){var func=isArray(collection)?arrayFilter:baseFilter;predicate=getCallback(predicate,thisArg,3);return func(collection,function(value,index,collection){return!predicate(value,index,collection);});}/**
	     * Gets a random element or `n` random elements from a collection.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to sample.
	     * @param {number} [n] The number of elements to sample.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {*} Returns the random sample(s).
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     *
	     * _.sample([1, 2, 3, 4], 2);
	     * // => [3, 1]
	     */function sample(collection,n,guard){if(guard?isIterateeCall(collection,n,guard):n==null){collection=toIterable(collection);var length=collection.length;return length>0?collection[baseRandom(0,length-1)]:undefined;}var index=-1,result=toArray(collection),length=result.length,lastIndex=length-1;n=nativeMin(n<0?0:+n||0,length);while(++index<n){var rand=baseRandom(index,lastIndex),value=result[rand];result[rand]=result[index];result[index]=value;}result.length=n;return result;}/**
	     * Creates an array of shuffled values, using a version of the
	     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4]);
	     * // => [4, 1, 3, 2]
	     */function shuffle(collection){return sample(collection,POSITIVE_INFINITY);}/**
	     * Gets the size of `collection` by returning its length for array-like
	     * values or the number of own enumerable properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @returns {number} Returns the size of `collection`.
	     * @example
	     *
	     * _.size([1, 2, 3]);
	     * // => 3
	     *
	     * _.size({ 'a': 1, 'b': 2 });
	     * // => 2
	     *
	     * _.size('pebbles');
	     * // => 7
	     */function size(collection){var length=collection?getLength(collection):0;return isLength(length)?length:keys(collection).length;}/**
	     * Checks if `predicate` returns truthy for **any** element of `collection`.
	     * The function returns as soon as it finds a passing value and does not iterate
	     * over the entire collection. The predicate is bound to `thisArg` and invoked
	     * with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias any
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': true },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.some(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.some(users, 'active', false);
	     * // => true
	     *
	     * // using the `_.property` callback shorthand
	     * _.some(users, 'active');
	     * // => true
	     */function some(collection,predicate,thisArg){var func=isArray(collection)?arraySome:baseSome;if(thisArg&&isIterateeCall(collection,predicate,thisArg)){predicate=undefined;}if(typeof predicate!='function'||thisArg!==undefined){predicate=getCallback(predicate,thisArg,3);}return func(collection,predicate);}/**
	     * Creates an array of elements, sorted in ascending order by the results of
	     * running each element in a collection through `iteratee`. This method performs
	     * a stable sort, that is, it preserves the original sort order of equal elements.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * _.sortBy([1, 2, 3], function(n) {
	     *   return Math.sin(n);
	     * });
	     * // => [3, 1, 2]
	     *
	     * _.sortBy([1, 2, 3], function(n) {
	     *   return this.sin(n);
	     * }, Math);
	     * // => [3, 1, 2]
	     *
	     * var users = [
	     *   { 'user': 'fred' },
	     *   { 'user': 'pebbles' },
	     *   { 'user': 'barney' }
	     * ];
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.sortBy(users, 'user'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */function sortBy(collection,iteratee,thisArg){if(collection==null){return[];}if(thisArg&&isIterateeCall(collection,iteratee,thisArg)){iteratee=undefined;}var index=-1;iteratee=getCallback(iteratee,thisArg,3);var result=baseMap(collection,function(value,key,collection){return{'criteria':iteratee(value,key,collection),'index':++index,'value':value};});return baseSortBy(result,compareAscending);}/**
	     * This method is like `_.sortBy` except that it can sort by multiple iteratees
	     * or property names.
	     *
	     * If a property name is provided for an iteratee the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If an object is provided for an iteratee the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(Function|Function[]|Object|Object[]|string|string[])} iteratees
	     *  The iteratees to sort by, specified as individual values or arrays of values.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 42 },
	     *   { 'user': 'barney', 'age': 34 }
	     * ];
	     *
	     * _.map(_.sortByAll(users, ['user', 'age']), _.values);
	     * // => [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
	     *
	     * _.map(_.sortByAll(users, 'user', function(chr) {
	     *   return Math.floor(chr.age / 10);
	     * }), _.values);
	     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	     */var sortByAll=restParam(function(collection,iteratees){if(collection==null){return[];}var guard=iteratees[2];if(guard&&isIterateeCall(iteratees[0],iteratees[1],guard)){iteratees.length=1;}return baseSortByOrder(collection,baseFlatten(iteratees),[]);});/**
	     * This method is like `_.sortByAll` except that it allows specifying the
	     * sort orders of the iteratees to sort by. If `orders` is unspecified, all
	     * values are sorted in ascending order. Otherwise, a value is sorted in
	     * ascending order if its corresponding order is "asc", and descending if "desc".
	     *
	     * If a property name is provided for an iteratee the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If an object is provided for an iteratee the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	     * @param {boolean[]} [orders] The sort orders of `iteratees`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 34 },
	     *   { 'user': 'fred',   'age': 42 },
	     *   { 'user': 'barney', 'age': 36 }
	     * ];
	     *
	     * // sort by `user` in ascending order and by `age` in descending order
	     * _.map(_.sortByOrder(users, ['user', 'age'], ['asc', 'desc']), _.values);
	     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	     */function sortByOrder(collection,iteratees,orders,guard){if(collection==null){return[];}if(guard&&isIterateeCall(iteratees,orders,guard)){orders=undefined;}if(!isArray(iteratees)){iteratees=iteratees==null?[]:[iteratees];}if(!isArray(orders)){orders=orders==null?[]:[orders];}return baseSortByOrder(collection,iteratees,orders);}/**
	     * Performs a deep comparison between each element in `collection` and the
	     * source object, returning an array of all elements that have equivalent
	     * property values.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Object} source The object of property values to match.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
	     *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
	     * // => ['barney']
	     *
	     * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
	     * // => ['fred']
	     */function where(collection,source){return filter(collection,baseMatches(source));}/*------------------------------------------------------------------------*//**
	     * Gets the number of milliseconds that have elapsed since the Unix epoch
	     * (1 January 1970 00:00:00 UTC).
	     *
	     * @static
	     * @memberOf _
	     * @category Date
	     * @example
	     *
	     * _.defer(function(stamp) {
	     *   console.log(_.now() - stamp);
	     * }, _.now());
	     * // => logs the number of milliseconds it took for the deferred function to be invoked
	     */var now=nativeNow||function(){return new Date().getTime();};/*------------------------------------------------------------------------*//**
	     * The opposite of `_.before`; this method creates a function that invokes
	     * `func` once it's called `n` or more times.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls before `func` is invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => logs 'done saving!' after the two async saves have completed
	     */function after(n,func){if(typeof func!='function'){if(typeof n=='function'){var temp=n;n=func;func=temp;}else{throw new TypeError(FUNC_ERROR_TEXT);}}n=nativeIsFinite(n=+n)?n:0;return function(){if(--n<1){return func.apply(this,arguments);}};}/**
	     * Creates a function that accepts up to `n` arguments ignoring any
	     * additional arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to cap arguments for.
	     * @param {number} [n=func.length] The arity cap.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
	     * // => [6, 8, 10]
	     */function ary(func,n,guard){if(guard&&isIterateeCall(func,n,guard)){n=undefined;}n=func&&n==null?func.length:nativeMax(+n||0,0);return createWrapper(func,ARY_FLAG,undefined,undefined,undefined,undefined,n);}/**
	     * Creates a function that invokes `func`, with the `this` binding and arguments
	     * of the created function, while it's called less than `n` times. Subsequent
	     * calls to the created function return the result of the last `func` invocation.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls at which `func` is no longer invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * jQuery('#add').on('click', _.before(5, addContactToList));
	     * // => allows adding up to 4 contacts to the list
	     */function before(n,func){var result;if(typeof func!='function'){if(typeof n=='function'){var temp=n;n=func;func=temp;}else{throw new TypeError(FUNC_ERROR_TEXT);}}return function(){if(--n>0){result=func.apply(this,arguments);}if(n<=1){func=undefined;}return result;};}/**
	     * Creates a function that invokes `func` with the `this` binding of `thisArg`
	     * and prepends any additional `_.bind` arguments to those provided to the
	     * bound function.
	     *
	     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** Unlike native `Function#bind` this method does not set the "length"
	     * property of bound functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to bind.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var greet = function(greeting, punctuation) {
	     *   return greeting + ' ' + this.user + punctuation;
	     * };
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * var bound = _.bind(greet, object, 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * // using placeholders
	     * var bound = _.bind(greet, object, _, '!');
	     * bound('hi');
	     * // => 'hi fred!'
	     */var bind=restParam(function(func,thisArg,partials){var bitmask=BIND_FLAG;if(partials.length){var holders=replaceHolders(partials,bind.placeholder);bitmask|=PARTIAL_FLAG;}return createWrapper(func,bitmask,thisArg,partials,holders);});/**
	     * Binds methods of an object to the object itself, overwriting the existing
	     * method. Method names may be specified as individual arguments or as arrays
	     * of method names. If no method names are provided all enumerable function
	     * properties, own and inherited, of `object` are bound.
	     *
	     * **Note:** This method does not set the "length" property of bound functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Object} object The object to bind and assign the bound methods to.
	     * @param {...(string|string[])} [methodNames] The object method names to bind,
	     *  specified as individual method names or arrays of method names.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'onClick': function() {
	     *     console.log('clicked ' + this.label);
	     *   }
	     * };
	     *
	     * _.bindAll(view);
	     * jQuery('#docs').on('click', view.onClick);
	     * // => logs 'clicked docs' when the element is clicked
	     */var bindAll=restParam(function(object,methodNames){methodNames=methodNames.length?baseFlatten(methodNames):functions(object);var index=-1,length=methodNames.length;while(++index<length){var key=methodNames[index];object[key]=createWrapper(object[key],BIND_FLAG,object);}return object;});/**
	     * Creates a function that invokes the method at `object[key]` and prepends
	     * any additional `_.bindKey` arguments to those provided to the bound function.
	     *
	     * This method differs from `_.bind` by allowing bound functions to reference
	     * methods that may be redefined or don't yet exist.
	     * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
	     * for more details.
	     *
	     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Object} object The object the method belongs to.
	     * @param {string} key The key of the method.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var object = {
	     *   'user': 'fred',
	     *   'greet': function(greeting, punctuation) {
	     *     return greeting + ' ' + this.user + punctuation;
	     *   }
	     * };
	     *
	     * var bound = _.bindKey(object, 'greet', 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * object.greet = function(greeting, punctuation) {
	     *   return greeting + 'ya ' + this.user + punctuation;
	     * };
	     *
	     * bound('!');
	     * // => 'hiya fred!'
	     *
	     * // using placeholders
	     * var bound = _.bindKey(object, 'greet', _, '!');
	     * bound('hi');
	     * // => 'hiya fred!'
	     */var bindKey=restParam(function(object,key,partials){var bitmask=BIND_FLAG|BIND_KEY_FLAG;if(partials.length){var holders=replaceHolders(partials,bindKey.placeholder);bitmask|=PARTIAL_FLAG;}return createWrapper(key,bitmask,object,partials,holders);});/**
	     * Creates a function that accepts one or more arguments of `func` that when
	     * called either invokes `func` returning its result, if all `func` arguments
	     * have been provided, or returns a function that accepts one or more of the
	     * remaining `func` arguments, and so on. The arity of `func` may be specified
	     * if `func.length` is not sufficient.
	     *
	     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method does not set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curry(abc);
	     *
	     * curried(1)(2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // using placeholders
	     * curried(1)(_, 3)(2);
	     * // => [1, 2, 3]
	     */var curry=createCurry(CURRY_FLAG);/**
	     * This method is like `_.curry` except that arguments are applied to `func`
	     * in the manner of `_.partialRight` instead of `_.partial`.
	     *
	     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method does not set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curryRight(abc);
	     *
	     * curried(3)(2)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(2, 3)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // using placeholders
	     * curried(3)(1, _)(2);
	     * // => [1, 2, 3]
	     */var curryRight=createCurry(CURRY_RIGHT_FLAG);/**
	     * Creates a debounced function that delays invoking `func` until after `wait`
	     * milliseconds have elapsed since the last time the debounced function was
	     * invoked. The debounced function comes with a `cancel` method to cancel
	     * delayed invocations. Provide an options object to indicate that `func`
	     * should be invoked on the leading and/or trailing edge of the `wait` timeout.
	     * Subsequent calls to the debounced function return the result of the last
	     * `func` invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the the debounced function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.debounce` and `_.throttle`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to debounce.
	     * @param {number} [wait=0] The number of milliseconds to delay.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=false] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	     *  delayed before it's invoked.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // avoid costly calculations while the window size is in flux
	     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	     *
	     * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
	     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * }));
	     *
	     * // ensure `batchLog` is invoked once after 1 second of debounced calls
	     * var source = new EventSource('/stream');
	     * jQuery(source).on('message', _.debounce(batchLog, 250, {
	     *   'maxWait': 1000
	     * }));
	     *
	     * // cancel a debounced call
	     * var todoChanges = _.debounce(batchLog, 1000);
	     * Object.observe(models.todo, todoChanges);
	     *
	     * Object.observe(models, function(changes) {
	     *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
	     *     todoChanges.cancel();
	     *   }
	     * }, ['delete']);
	     *
	     * // ...at some point `models.todo` is changed
	     * models.todo.completed = true;
	     *
	     * // ...before 1 second has passed `models.todo` is deleted
	     * // which cancels the debounced `todoChanges` call
	     * delete models.todo;
	     */function debounce(func,wait,options){var args,maxTimeoutId,result,stamp,thisArg,timeoutId,trailingCall,lastCalled=0,maxWait=false,trailing=true;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}wait=wait<0?0:+wait||0;if(options===true){var leading=true;trailing=false;}else if(isObject(options)){leading=!!options.leading;maxWait='maxWait'in options&&nativeMax(+options.maxWait||0,wait);trailing='trailing'in options?!!options.trailing:trailing;}function cancel(){if(timeoutId){clearTimeout(timeoutId);}if(maxTimeoutId){clearTimeout(maxTimeoutId);}lastCalled=0;maxTimeoutId=timeoutId=trailingCall=undefined;}function complete(isCalled,id){if(id){clearTimeout(id);}maxTimeoutId=timeoutId=trailingCall=undefined;if(isCalled){lastCalled=now();result=func.apply(thisArg,args);if(!timeoutId&&!maxTimeoutId){args=thisArg=undefined;}}}function delayed(){var remaining=wait-(now()-stamp);if(remaining<=0||remaining>wait){complete(trailingCall,maxTimeoutId);}else{timeoutId=setTimeout(delayed,remaining);}}function maxDelayed(){complete(trailing,timeoutId);}function debounced(){args=arguments;stamp=now();thisArg=this;trailingCall=trailing&&(timeoutId||!leading);if(maxWait===false){var leadingCall=leading&&!timeoutId;}else{if(!maxTimeoutId&&!leading){lastCalled=stamp;}var remaining=maxWait-(stamp-lastCalled),isCalled=remaining<=0||remaining>maxWait;if(isCalled){if(maxTimeoutId){maxTimeoutId=clearTimeout(maxTimeoutId);}lastCalled=stamp;result=func.apply(thisArg,args);}else if(!maxTimeoutId){maxTimeoutId=setTimeout(maxDelayed,remaining);}}if(isCalled&&timeoutId){timeoutId=clearTimeout(timeoutId);}else if(!timeoutId&&wait!==maxWait){timeoutId=setTimeout(delayed,wait);}if(leadingCall){isCalled=true;result=func.apply(thisArg,args);}if(isCalled&&!timeoutId&&!maxTimeoutId){args=thisArg=undefined;}return result;}debounced.cancel=cancel;return debounced;}/**
	     * Defers invoking the `func` until the current call stack has cleared. Any
	     * additional arguments are provided to `func` when it's invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to defer.
	     * @param {...*} [args] The arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.defer(function(text) {
	     *   console.log(text);
	     * }, 'deferred');
	     * // logs 'deferred' after one or more milliseconds
	     */var defer=restParam(function(func,args){return baseDelay(func,1,args);});/**
	     * Invokes `func` after `wait` milliseconds. Any additional arguments are
	     * provided to `func` when it's invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {...*} [args] The arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.delay(function(text) {
	     *   console.log(text);
	     * }, 1000, 'later');
	     * // => logs 'later' after one second
	     */var delay=restParam(function(func,wait,args){return baseDelay(func,wait,args);});/**
	     * Creates a function that returns the result of invoking the provided
	     * functions with the `this` binding of the created function, where each
	     * successive invocation is supplied the return value of the previous.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {...Function} [funcs] Functions to invoke.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flow(_.add, square);
	     * addSquare(1, 2);
	     * // => 9
	     */var flow=createFlow();/**
	     * This method is like `_.flow` except that it creates a function that
	     * invokes the provided functions from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias backflow, compose
	     * @category Function
	     * @param {...Function} [funcs] Functions to invoke.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flowRight(square, _.add);
	     * addSquare(1, 2);
	     * // => 9
	     */var flowRight=createFlow(true);/**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided it determines the cache key for storing the result based on the
	     * arguments provided to the memoized function. By default, the first argument
	     * provided to the memoized function is coerced to a string and used as the
	     * cache key. The `func` is invoked with the `this` binding of the memoized
	     * function.
	     *
	     * **Note:** The cache is exposed as the `cache` property on the memoized
	     * function. Its creation may be customized by replacing the `_.memoize.Cache`
	     * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	     * method interface of `get`, `has`, and `set`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] The function to resolve the cache key.
	     * @returns {Function} Returns the new memoizing function.
	     * @example
	     *
	     * var upperCase = _.memoize(function(string) {
	     *   return string.toUpperCase();
	     * });
	     *
	     * upperCase('fred');
	     * // => 'FRED'
	     *
	     * // modifying the result cache
	     * upperCase.cache.set('fred', 'BARNEY');
	     * upperCase('fred');
	     * // => 'BARNEY'
	     *
	     * // replacing `_.memoize.Cache`
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'barney' };
	     * var identity = _.memoize(_.identity);
	     *
	     * identity(object);
	     * // => { 'user': 'fred' }
	     * identity(other);
	     * // => { 'user': 'fred' }
	     *
	     * _.memoize.Cache = WeakMap;
	     * var identity = _.memoize(_.identity);
	     *
	     * identity(object);
	     * // => { 'user': 'fred' }
	     * identity(other);
	     * // => { 'user': 'barney' }
	     */function memoize(func,resolver){if(typeof func!='function'||resolver&&typeof resolver!='function'){throw new TypeError(FUNC_ERROR_TEXT);}var memoized=function memoized(){var args=arguments,key=resolver?resolver.apply(this,args):args[0],cache=memoized.cache;if(cache.has(key)){return cache.get(key);}var result=func.apply(this,args);memoized.cache=cache.set(key,result);return result;};memoized.cache=new memoize.Cache();return memoized;}/**
	     * Creates a function that runs each argument through a corresponding
	     * transform function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to wrap.
	     * @param {...(Function|Function[])} [transforms] The functions to transform
	     * arguments, specified as individual functions or arrays of functions.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function doubled(n) {
	     *   return n * 2;
	     * }
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var modded = _.modArgs(function(x, y) {
	     *   return [x, y];
	     * }, square, doubled);
	     *
	     * modded(1, 2);
	     * // => [1, 4]
	     *
	     * modded(5, 10);
	     * // => [25, 20]
	     */var modArgs=restParam(function(func,transforms){transforms=baseFlatten(transforms);if(typeof func!='function'||!arrayEvery(transforms,baseIsFunction)){throw new TypeError(FUNC_ERROR_TEXT);}var length=transforms.length;return restParam(function(args){var index=nativeMin(args.length,length);while(index--){args[index]=transforms[index](args[index]);}return func.apply(this,args);});});/**
	     * Creates a function that negates the result of the predicate `func`. The
	     * `func` predicate is invoked with the `this` binding and arguments of the
	     * created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} predicate The predicate to negate.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function isEven(n) {
	     *   return n % 2 == 0;
	     * }
	     *
	     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	     * // => [1, 3, 5]
	     */function negate(predicate){if(typeof predicate!='function'){throw new TypeError(FUNC_ERROR_TEXT);}return function(){return!predicate.apply(this,arguments);};}/**
	     * Creates a function that is restricted to invoking `func` once. Repeat calls
	     * to the function return the value of the first call. The `func` is invoked
	     * with the `this` binding and arguments of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // `initialize` invokes `createApplication` once
	     */function once(func){return before(2,func);}/**
	     * Creates a function that invokes `func` with `partial` arguments prepended
	     * to those provided to the new function. This method is like `_.bind` except
	     * it does **not** alter the `this` binding.
	     *
	     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method does not set the "length" property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) {
	     *   return greeting + ' ' + name;
	     * };
	     *
	     * var sayHelloTo = _.partial(greet, 'hello');
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     *
	     * // using placeholders
	     * var greetFred = _.partial(greet, _, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     */var partial=createPartial(PARTIAL_FLAG);/**
	     * This method is like `_.partial` except that partially applied arguments
	     * are appended to those provided to the new function.
	     *
	     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method does not set the "length" property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) {
	     *   return greeting + ' ' + name;
	     * };
	     *
	     * var greetFred = _.partialRight(greet, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     *
	     * // using placeholders
	     * var sayHelloTo = _.partialRight(greet, 'hello', _);
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     */var partialRight=createPartial(PARTIAL_RIGHT_FLAG);/**
	     * Creates a function that invokes `func` with arguments arranged according
	     * to the specified indexes where the argument value at the first index is
	     * provided as the first argument, the argument value at the second index is
	     * provided as the second argument, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to rearrange arguments for.
	     * @param {...(number|number[])} indexes The arranged argument indexes,
	     *  specified as individual indexes or arrays of indexes.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var rearged = _.rearg(function(a, b, c) {
	     *   return [a, b, c];
	     * }, 2, 0, 1);
	     *
	     * rearged('b', 'c', 'a')
	     * // => ['a', 'b', 'c']
	     *
	     * var map = _.rearg(_.map, [1, 0]);
	     * map(function(n) {
	     *   return n * 3;
	     * }, [1, 2, 3]);
	     * // => [3, 6, 9]
	     */var rearg=restParam(function(func,indexes){return createWrapper(func,REARG_FLAG,undefined,undefined,undefined,baseFlatten(indexes));});/**
	     * Creates a function that invokes `func` with the `this` binding of the
	     * created function and arguments from `start` and beyond provided as an array.
	     *
	     * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.restParam(function(what, names) {
	     *   return what + ' ' + _.initial(names).join(', ') +
	     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	     * });
	     *
	     * say('hello', 'fred', 'barney', 'pebbles');
	     * // => 'hello fred, barney, & pebbles'
	     */function restParam(func,start){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}start=nativeMax(start===undefined?func.length-1:+start||0,0);return function(){var args=arguments,index=-1,length=nativeMax(args.length-start,0),rest=Array(length);while(++index<length){rest[index]=args[start+index];}switch(start){case 0:return func.call(this,rest);case 1:return func.call(this,args[0],rest);case 2:return func.call(this,args[0],args[1],rest);}var otherArgs=Array(start+1);index=-1;while(++index<start){otherArgs[index]=args[index];}otherArgs[start]=rest;return func.apply(this,otherArgs);};}/**
	     * Creates a function that invokes `func` with the `this` binding of the created
	     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
	     *
	     * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/Web/JavaScript/Reference/Operators/Spread_operator).
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to spread arguments over.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.spread(function(who, what) {
	     *   return who + ' says ' + what;
	     * });
	     *
	     * say(['fred', 'hello']);
	     * // => 'fred says hello'
	     *
	     * // with a Promise
	     * var numbers = Promise.all([
	     *   Promise.resolve(40),
	     *   Promise.resolve(36)
	     * ]);
	     *
	     * numbers.then(_.spread(function(x, y) {
	     *   return x + y;
	     * }));
	     * // => a Promise of 76
	     */function spread(func){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}return function(array){return func.apply(this,array);};}/**
	     * Creates a throttled function that only invokes `func` at most once per
	     * every `wait` milliseconds. The throttled function comes with a `cancel`
	     * method to cancel delayed invocations. Provide an options object to indicate
	     * that `func` should be invoked on the leading and/or trailing edge of the
	     * `wait` timeout. Subsequent calls to the throttled function return the
	     * result of the last `func` call.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the the throttled function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.throttle` and `_.debounce`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to throttle.
	     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=true] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // avoid excessively updating the position while scrolling
	     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	     *
	     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
	     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
	     *   'trailing': false
	     * }));
	     *
	     * // cancel a trailing throttled call
	     * jQuery(window).on('popstate', throttled.cancel);
	     */function throttle(func,wait,options){var leading=true,trailing=true;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}if(options===false){leading=false;}else if(isObject(options)){leading='leading'in options?!!options.leading:leading;trailing='trailing'in options?!!options.trailing:trailing;}return debounce(func,wait,{'leading':leading,'maxWait':+wait,'trailing':trailing});}/**
	     * Creates a function that provides `value` to the wrapper function as its
	     * first argument. Any additional arguments provided to the function are
	     * appended to those provided to the wrapper function. The wrapper is invoked
	     * with the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {*} value The value to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('fred, barney, & pebbles');
	     * // => '<p>fred, barney, &amp; pebbles</p>'
	     */function wrap(value,wrapper){wrapper=wrapper==null?identity:wrapper;return createWrapper(wrapper,PARTIAL_FLAG,undefined,[value],[]);}/*------------------------------------------------------------------------*//**
	     * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
	     * otherwise they are assigned by reference. If `customizer` is provided it's
	     * invoked to produce the cloned values. If `customizer` returns `undefined`
	     * cloning is handled by the method instead. The `customizer` is bound to
	     * `thisArg` and invoked with up to three argument; (value [, index|key, object]).
	     *
	     * **Note:** This method is loosely based on the
	     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	     * The enumerable properties of `arguments` objects and objects created by
	     * constructors other than `Object` are cloned to plain `Object` objects. An
	     * empty object is returned for uncloneable values such as functions, DOM nodes,
	     * Maps, Sets, and WeakMaps.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {*} Returns the cloned value.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * var shallow = _.clone(users);
	     * shallow[0] === users[0];
	     * // => true
	     *
	     * var deep = _.clone(users, true);
	     * deep[0] === users[0];
	     * // => false
	     *
	     * // using a customizer callback
	     * var el = _.clone(document.body, function(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(false);
	     *   }
	     * });
	     *
	     * el === document.body
	     * // => false
	     * el.nodeName
	     * // => BODY
	     * el.childNodes.length;
	     * // => 0
	     */function clone(value,isDeep,customizer,thisArg){if(isDeep&&typeof isDeep!='boolean'&&isIterateeCall(value,isDeep,customizer)){isDeep=false;}else if(typeof isDeep=='function'){thisArg=customizer;customizer=isDeep;isDeep=false;}return typeof customizer=='function'?baseClone(value,isDeep,bindCallback(customizer,thisArg,3)):baseClone(value,isDeep);}/**
	     * Creates a deep clone of `value`. If `customizer` is provided it's invoked
	     * to produce the cloned values. If `customizer` returns `undefined` cloning
	     * is handled by the method instead. The `customizer` is bound to `thisArg`
	     * and invoked with up to three argument; (value [, index|key, object]).
	     *
	     * **Note:** This method is loosely based on the
	     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	     * The enumerable properties of `arguments` objects and objects created by
	     * constructors other than `Object` are cloned to plain `Object` objects. An
	     * empty object is returned for uncloneable values such as functions, DOM nodes,
	     * Maps, Sets, and WeakMaps.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {*} Returns the deep cloned value.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * var deep = _.cloneDeep(users);
	     * deep[0] === users[0];
	     * // => false
	     *
	     * // using a customizer callback
	     * var el = _.cloneDeep(document.body, function(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(true);
	     *   }
	     * });
	     *
	     * el === document.body
	     * // => false
	     * el.nodeName
	     * // => BODY
	     * el.childNodes.length;
	     * // => 20
	     */function cloneDeep(value,customizer,thisArg){return typeof customizer=='function'?baseClone(value,true,bindCallback(customizer,thisArg,3)):baseClone(value,true);}/**
	     * Checks if `value` is greater than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
	     * @example
	     *
	     * _.gt(3, 1);
	     * // => true
	     *
	     * _.gt(3, 3);
	     * // => false
	     *
	     * _.gt(1, 3);
	     * // => false
	     */function gt(value,other){return value>other;}/**
	     * Checks if `value` is greater than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
	     * @example
	     *
	     * _.gte(3, 1);
	     * // => true
	     *
	     * _.gte(3, 3);
	     * // => true
	     *
	     * _.gte(1, 3);
	     * // => false
	     */function gte(value,other){return value>=other;}/**
	     * Checks if `value` is classified as an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isArguments(function() { return arguments; }());
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */function isArguments(value){return isObjectLike(value)&&isArrayLike(value)&&hasOwnProperty.call(value,'callee')&&!propertyIsEnumerable.call(value,'callee');}/**
	     * Checks if `value` is classified as an `Array` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isArray([1, 2, 3]);
	     * // => true
	     *
	     * _.isArray(function() { return arguments; }());
	     * // => false
	     */var isArray=nativeIsArray||function(value){return isObjectLike(value)&&isLength(value.length)&&objToString.call(value)==arrayTag;};/**
	     * Checks if `value` is classified as a boolean primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isBoolean(false);
	     * // => true
	     *
	     * _.isBoolean(null);
	     * // => false
	     */function isBoolean(value){return value===true||value===false||isObjectLike(value)&&objToString.call(value)==boolTag;}/**
	     * Checks if `value` is classified as a `Date` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isDate(new Date);
	     * // => true
	     *
	     * _.isDate('Mon April 23 2012');
	     * // => false
	     */function isDate(value){return isObjectLike(value)&&objToString.call(value)==dateTag;}/**
	     * Checks if `value` is a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     *
	     * _.isElement('<body>');
	     * // => false
	     */function isElement(value){return!!value&&value.nodeType===1&&isObjectLike(value)&&!isPlainObject(value);}/**
	     * Checks if `value` is empty. A value is considered empty unless it's an
	     * `arguments` object, array, string, or jQuery-like collection with a length
	     * greater than `0` or an object with own enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Array|Object|string} value The value to inspect.
	     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty(null);
	     * // => true
	     *
	     * _.isEmpty(true);
	     * // => true
	     *
	     * _.isEmpty(1);
	     * // => true
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({ 'a': 1 });
	     * // => false
	     */function isEmpty(value){if(value==null){return true;}if(isArrayLike(value)&&(isArray(value)||isString(value)||isArguments(value)||isObjectLike(value)&&isFunction(value.splice))){return!value.length;}return!keys(value).length;}/**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent. If `customizer` is provided it's invoked to compare values.
	     * If `customizer` returns `undefined` comparisons are handled by the method
	     * instead. The `customizer` is bound to `thisArg` and invoked with up to
	     * three arguments: (value, other [, index|key]).
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. Functions and DOM nodes
	     * are **not** supported. Provide a customizer function to extend support
	     * for comparing other values.
	     *
	     * @static
	     * @memberOf _
	     * @alias eq
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize value comparisons.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'fred' };
	     *
	     * object == other;
	     * // => false
	     *
	     * _.isEqual(object, other);
	     * // => true
	     *
	     * // using a customizer callback
	     * var array = ['hello', 'goodbye'];
	     * var other = ['hi', 'goodbye'];
	     *
	     * _.isEqual(array, other, function(value, other) {
	     *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
	     *     return true;
	     *   }
	     * });
	     * // => true
	     */function isEqual(value,other,customizer,thisArg){customizer=typeof customizer=='function'?bindCallback(customizer,thisArg,3):undefined;var result=customizer?customizer(value,other):undefined;return result===undefined?baseIsEqual(value,other,customizer):!!result;}/**
	     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	     * `SyntaxError`, `TypeError`, or `URIError` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	     * @example
	     *
	     * _.isError(new Error);
	     * // => true
	     *
	     * _.isError(Error);
	     * // => false
	     */function isError(value){return isObjectLike(value)&&typeof value.message=='string'&&objToString.call(value)==errorTag;}/**
	     * Checks if `value` is a finite primitive number.
	     *
	     * **Note:** This method is based on [`Number.isFinite`](http://ecma-international.org/ecma-262/6.0/#sec-number.isfinite).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
	     * @example
	     *
	     * _.isFinite(10);
	     * // => true
	     *
	     * _.isFinite('10');
	     * // => false
	     *
	     * _.isFinite(true);
	     * // => false
	     *
	     * _.isFinite(Object(10));
	     * // => false
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     */function isFinite(value){return typeof value=='number'&&nativeIsFinite(value);}/**
	     * Checks if `value` is classified as a `Function` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     *
	     * _.isFunction(/abc/);
	     * // => false
	     */function isFunction(value){// The use of `Object#toString` avoids issues with the `typeof` operator
	// in older versions of Chrome and Safari which return 'function' for regexes
	// and Safari 8 which returns 'object' for typed array constructors.
	return isObject(value)&&objToString.call(value)==funcTag;}/**
	     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(1);
	     * // => false
	     */function isObject(value){// Avoid a V8 JIT bug in Chrome 19-20.
	// See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	var type=typeof value==='undefined'?'undefined':(0,_typeof3.default)(value);return!!value&&(type=='object'||type=='function');}/**
	     * Performs a deep comparison between `object` and `source` to determine if
	     * `object` contains equivalent property values. If `customizer` is provided
	     * it's invoked to compare values. If `customizer` returns `undefined`
	     * comparisons are handled by the method instead. The `customizer` is bound
	     * to `thisArg` and invoked with three arguments: (value, other, index|key).
	     *
	     * **Note:** This method supports comparing properties of arrays, booleans,
	     * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
	     * and DOM nodes are **not** supported. Provide a customizer function to extend
	     * support for comparing other values.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Function} [customizer] The function to customize value comparisons.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.isMatch(object, { 'age': 40 });
	     * // => true
	     *
	     * _.isMatch(object, { 'age': 36 });
	     * // => false
	     *
	     * // using a customizer callback
	     * var object = { 'greeting': 'hello' };
	     * var source = { 'greeting': 'hi' };
	     *
	     * _.isMatch(object, source, function(value, other) {
	     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
	     * });
	     * // => true
	     */function isMatch(object,source,customizer,thisArg){customizer=typeof customizer=='function'?bindCallback(customizer,thisArg,3):undefined;return baseIsMatch(object,getMatchData(source),customizer);}/**
	     * Checks if `value` is `NaN`.
	     *
	     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
	     * which returns `true` for `undefined` and other non-numeric values.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */function isNaN(value){// An `NaN` primitive is the only value that is not equal to itself.
	// Perform the `toStringTag` check first to avoid errors with some host objects in IE.
	return isNumber(value)&&value!=+value;}/**
	     * Checks if `value` is a native function.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	     * @example
	     *
	     * _.isNative(Array.prototype.push);
	     * // => true
	     *
	     * _.isNative(_);
	     * // => false
	     */function isNative(value){if(value==null){return false;}if(isFunction(value)){return reIsNative.test(fnToString.call(value));}return isObjectLike(value)&&reIsHostCtor.test(value);}/**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(void 0);
	     * // => false
	     */function isNull(value){return value===null;}/**
	     * Checks if `value` is classified as a `Number` primitive or object.
	     *
	     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	     * as numbers, use the `_.isFinite` method.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isNumber(8.4);
	     * // => true
	     *
	     * _.isNumber(NaN);
	     * // => true
	     *
	     * _.isNumber('8.4');
	     * // => false
	     */function isNumber(value){return typeof value=='number'||isObjectLike(value)&&objToString.call(value)==numberTag;}/**
	     * Checks if `value` is a plain object, that is, an object created by the
	     * `Object` constructor or one with a `[[Prototype]]` of `null`.
	     *
	     * **Note:** This method assumes objects created by the `Object` constructor
	     * have no inherited enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     * }
	     *
	     * _.isPlainObject(new Foo);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     *
	     * _.isPlainObject(Object.create(null));
	     * // => true
	     */function isPlainObject(value){var Ctor;// Exit early for non `Object` objects.
	if(!(isObjectLike(value)&&objToString.call(value)==objectTag&&!isArguments(value))||!hasOwnProperty.call(value,'constructor')&&(Ctor=value.constructor,typeof Ctor=='function'&&!(Ctor instanceof Ctor))){return false;}// IE < 9 iterates inherited properties before own properties. If the first
	// iterated property is an object's own property then there are no inherited
	// enumerable properties.
	var result;// In most environments an object's own properties are iterated before
	// its inherited properties. If the last iterated property is an object's
	// own property then there are no inherited enumerable properties.
	baseForIn(value,function(subValue,key){result=key;});return result===undefined||hasOwnProperty.call(value,result);}/**
	     * Checks if `value` is classified as a `RegExp` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isRegExp(/abc/);
	     * // => true
	     *
	     * _.isRegExp('/abc/');
	     * // => false
	     */function isRegExp(value){return isObject(value)&&objToString.call(value)==regexpTag;}/**
	     * Checks if `value` is classified as a `String` primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isString('abc');
	     * // => true
	     *
	     * _.isString(1);
	     * // => false
	     */function isString(value){return typeof value=='string'||isObjectLike(value)&&objToString.call(value)==stringTag;}/**
	     * Checks if `value` is classified as a typed array.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isTypedArray(new Uint8Array);
	     * // => true
	     *
	     * _.isTypedArray([]);
	     * // => false
	     */function isTypedArray(value){return isObjectLike(value)&&isLength(value.length)&&!!typedArrayTags[objToString.call(value)];}/**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     *
	     * _.isUndefined(null);
	     * // => false
	     */function isUndefined(value){return value===undefined;}/**
	     * Checks if `value` is less than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
	     * @example
	     *
	     * _.lt(1, 3);
	     * // => true
	     *
	     * _.lt(3, 3);
	     * // => false
	     *
	     * _.lt(3, 1);
	     * // => false
	     */function lt(value,other){return value<other;}/**
	     * Checks if `value` is less than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
	     * @example
	     *
	     * _.lte(1, 3);
	     * // => true
	     *
	     * _.lte(3, 3);
	     * // => true
	     *
	     * _.lte(3, 1);
	     * // => false
	     */function lte(value,other){return value<=other;}/**
	     * Converts `value` to an array.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Array} Returns the converted array.
	     * @example
	     *
	     * (function() {
	     *   return _.toArray(arguments).slice(1);
	     * }(1, 2, 3));
	     * // => [2, 3]
	     */function toArray(value){var length=value?getLength(value):0;if(!isLength(length)){return values(value);}if(!length){return[];}return arrayCopy(value);}/**
	     * Converts `value` to a plain object flattening inherited enumerable
	     * properties of `value` to own properties of the plain object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Object} Returns the converted plain object.
	     * @example
	     *
	     * function Foo() {
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.assign({ 'a': 1 }, new Foo);
	     * // => { 'a': 1, 'b': 2 }
	     *
	     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	     * // => { 'a': 1, 'b': 2, 'c': 3 }
	     */function toPlainObject(value){return baseCopy(value,keysIn(value));}/*------------------------------------------------------------------------*//**
	     * Recursively merges own enumerable properties of the source object(s), that
	     * don't resolve to `undefined` into the destination object. Subsequent sources
	     * overwrite property assignments of previous sources. If `customizer` is
	     * provided it's invoked to produce the merged values of the destination and
	     * source properties. If `customizer` returns `undefined` merging is handled
	     * by the method instead. The `customizer` is bound to `thisArg` and invoked
	     * with five arguments: (objectValue, sourceValue, key, object, source).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var users = {
	     *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	     * };
	     *
	     * var ages = {
	     *   'data': [{ 'age': 36 }, { 'age': 40 }]
	     * };
	     *
	     * _.merge(users, ages);
	     * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	     *
	     * // using a customizer callback
	     * var object = {
	     *   'fruits': ['apple'],
	     *   'vegetables': ['beet']
	     * };
	     *
	     * var other = {
	     *   'fruits': ['banana'],
	     *   'vegetables': ['carrot']
	     * };
	     *
	     * _.merge(object, other, function(a, b) {
	     *   if (_.isArray(a)) {
	     *     return a.concat(b);
	     *   }
	     * });
	     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	     */var merge=createAssigner(baseMerge);/**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object. Subsequent sources overwrite property assignments of previous sources.
	     * If `customizer` is provided it's invoked to produce the assigned values.
	     * The `customizer` is bound to `thisArg` and invoked with five arguments:
	     * (objectValue, sourceValue, key, object, source).
	     *
	     * **Note:** This method mutates `object` and is based on
	     * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
	     *
	     * @static
	     * @memberOf _
	     * @alias extend
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	     * // => { 'user': 'fred', 'age': 40 }
	     *
	     * // using a customizer callback
	     * var defaults = _.partialRight(_.assign, function(value, other) {
	     *   return _.isUndefined(value) ? other : value;
	     * });
	     *
	     * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	     * // => { 'user': 'barney', 'age': 36 }
	     */var assign=createAssigner(function(object,source,customizer){return customizer?assignWith(object,source,customizer):baseAssign(object,source);});/**
	     * Creates an object that inherits from the given `prototype` object. If a
	     * `properties` object is provided its own enumerable properties are assigned
	     * to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, {
	     *   'constructor': Circle
	     * });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */function create(prototype,properties,guard){var result=baseCreate(prototype);if(guard&&isIterateeCall(prototype,properties,guard)){properties=undefined;}return properties?baseAssign(result,properties):result;}/**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object for all destination properties that resolve to `undefined`. Once a
	     * property is set, additional values of the same property are ignored.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	     * // => { 'user': 'barney', 'age': 36 }
	     */var defaults=createDefaults(assign,assignDefaults);/**
	     * This method is like `_.defaults` except that it recursively assigns
	     * default properties.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
	     * // => { 'user': { 'name': 'barney', 'age': 36 } }
	     *
	     */var defaultsDeep=createDefaults(merge,mergeDefaults);/**
	     * This method is like `_.find` except that it returns the key of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findKey(users, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => 'barney' (iteration order is not guaranteed)
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findKey(users, { 'age': 1, 'active': true });
	     * // => 'pebbles'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findKey(users, 'active', false);
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.findKey(users, 'active');
	     * // => 'barney'
	     */var findKey=createFindKey(baseForOwn);/**
	     * This method is like `_.findKey` except that it iterates over elements of
	     * a collection in the opposite order.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findLastKey(users, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => returns `pebbles` assuming `_.findKey` returns `barney`
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findLastKey(users, { 'age': 36, 'active': true });
	     * // => 'barney'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findLastKey(users, 'active', false);
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.findLastKey(users, 'active');
	     * // => 'pebbles'
	     */var findLastKey=createFindKey(baseForOwnRight);/**
	     * Iterates over own and inherited enumerable properties of an object invoking
	     * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
	     * with three arguments: (value, key, object). Iteratee functions may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forIn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
	     */var forIn=createForIn(baseFor);/**
	     * This method is like `_.forIn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forInRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'c', 'b', and 'a' assuming `_.forIn ` logs 'a', 'b', and 'c'
	     */var forInRight=createForIn(baseForRight);/**
	     * Iterates over own enumerable properties of an object invoking `iteratee`
	     * for each property. The `iteratee` is bound to `thisArg` and invoked with
	     * three arguments: (value, key, object). Iteratee functions may exit iteration
	     * early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'a' and 'b' (iteration order is not guaranteed)
	     */var forOwn=createForOwn(baseForOwn);/**
	     * This method is like `_.forOwn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwnRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'b' and 'a' assuming `_.forOwn` logs 'a' and 'b'
	     */var forOwnRight=createForOwn(baseForOwnRight);/**
	     * Creates an array of function property names from all enumerable properties,
	     * own and inherited, of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @alias methods
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the new array of property names.
	     * @example
	     *
	     * _.functions(_);
	     * // => ['after', 'ary', 'assign', ...]
	     */function functions(object){return baseFunctions(object,keysIn(object));}/**
	     * Gets the property value at `path` of `object`. If the resolved value is
	     * `undefined` the `defaultValue` is used in its place.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.get(object, 'a[0].b.c');
	     * // => 3
	     *
	     * _.get(object, ['a', '0', 'b', 'c']);
	     * // => 3
	     *
	     * _.get(object, 'a.b.c', 'default');
	     * // => 'default'
	     */function get(object,path,defaultValue){var result=object==null?undefined:baseGet(object,toPath(path),path+'');return result===undefined?defaultValue:result;}/**
	     * Checks if `path` is a direct property.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
	     * @example
	     *
	     * var object = { 'a': { 'b': { 'c': 3 } } };
	     *
	     * _.has(object, 'a');
	     * // => true
	     *
	     * _.has(object, 'a.b.c');
	     * // => true
	     *
	     * _.has(object, ['a', 'b', 'c']);
	     * // => true
	     */function has(object,path){if(object==null){return false;}var result=hasOwnProperty.call(object,path);if(!result&&!isKey(path)){path=toPath(path);object=path.length==1?object:baseGet(object,baseSlice(path,0,-1));if(object==null){return false;}path=last(path);result=hasOwnProperty.call(object,path);}return result||isLength(object.length)&&isIndex(path,object.length)&&(isArray(object)||isArguments(object));}/**
	     * Creates an object composed of the inverted keys and values of `object`.
	     * If `object` contains duplicate values, subsequent values overwrite property
	     * assignments of previous values unless `multiValue` is `true`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to invert.
	     * @param {boolean} [multiValue] Allow multiple values per key.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Object} Returns the new inverted object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2, 'c': 1 };
	     *
	     * _.invert(object);
	     * // => { '1': 'c', '2': 'b' }
	     *
	     * // with `multiValue`
	     * _.invert(object, true);
	     * // => { '1': ['a', 'c'], '2': ['b'] }
	     */function invert(object,multiValue,guard){if(guard&&isIterateeCall(object,multiValue,guard)){multiValue=undefined;}var index=-1,props=keys(object),length=props.length,result={};while(++index<length){var key=props[index],value=object[key];if(multiValue){if(hasOwnProperty.call(result,value)){result[value].push(key);}else{result[value]=[key];}}else{result[value]=key;}}return result;}/**
	     * Creates an array of the own enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects. See the
	     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keys(new Foo);
	     * // => ['a', 'b'] (iteration order is not guaranteed)
	     *
	     * _.keys('hi');
	     * // => ['0', '1']
	     */var keys=!nativeKeys?shimKeys:function(object){var Ctor=object==null?undefined:object.constructor;if(typeof Ctor=='function'&&Ctor.prototype===object||typeof object!='function'&&isArrayLike(object)){return shimKeys(object);}return isObject(object)?nativeKeys(object):[];};/**
	     * Creates an array of the own and inherited enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keysIn(new Foo);
	     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	     */function keysIn(object){if(object==null){return[];}if(!isObject(object)){object=Object(object);}var length=object.length;length=length&&isLength(length)&&(isArray(object)||isArguments(object))&&length||0;var Ctor=object.constructor,index=-1,isProto=typeof Ctor=='function'&&Ctor.prototype===object,result=Array(length),skipIndexes=length>0;while(++index<length){result[index]=index+'';}for(var key in object){if(!(skipIndexes&&isIndex(key,length))&&!(key=='constructor'&&(isProto||!hasOwnProperty.call(object,key)))){result.push(key);}}return result;}/**
	     * The opposite of `_.mapValues`; this method creates an object with the
	     * same values as `object` and keys generated by running each own enumerable
	     * property of `object` through `iteratee`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the new mapped object.
	     * @example
	     *
	     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
	     *   return key + value;
	     * });
	     * // => { 'a1': 1, 'b2': 2 }
	     */var mapKeys=createObjectMapper(true);/**
	     * Creates an object with the same keys as `object` and values generated by
	     * running each own enumerable property of `object` through `iteratee`. The
	     * iteratee function is bound to `thisArg` and invoked with three arguments:
	     * (value, key, object).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the new mapped object.
	     * @example
	     *
	     * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
	     *   return n * 3;
	     * });
	     * // => { 'a': 3, 'b': 6 }
	     *
	     * var users = {
	     *   'fred':    { 'user': 'fred',    'age': 40 },
	     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // using the `_.property` callback shorthand
	     * _.mapValues(users, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	     */var mapValues=createObjectMapper();/**
	     * The opposite of `_.pick`; this method creates an object composed of the
	     * own and inherited enumerable properties of `object` that are not omitted.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|...(string|string[])} [predicate] The function invoked per
	     *  iteration or property names to omit, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.omit(object, 'age');
	     * // => { 'user': 'fred' }
	     *
	     * _.omit(object, _.isNumber);
	     * // => { 'user': 'fred' }
	     */var omit=restParam(function(object,props){if(object==null){return{};}if(typeof props[0]!='function'){var props=arrayMap(baseFlatten(props),String);return pickByArray(object,baseDifference(keysIn(object),props));}var predicate=bindCallback(props[0],props[1],3);return pickByCallback(object,function(value,key,object){return!predicate(value,key,object);});});/**
	     * Creates a two dimensional array of the key-value pairs for `object`,
	     * e.g. `[[key1, value1], [key2, value2]]`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the new array of key-value pairs.
	     * @example
	     *
	     * _.pairs({ 'barney': 36, 'fred': 40 });
	     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	     */function pairs(object){object=toObject(object);var index=-1,props=keys(object),length=props.length,result=Array(length);while(++index<length){var key=props[index];result[index]=[key,object[key]];}return result;}/**
	     * Creates an object composed of the picked `object` properties. Property
	     * names may be specified as individual arguments or as arrays of property
	     * names. If `predicate` is provided it's invoked for each property of `object`
	     * picking the properties `predicate` returns truthy for. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|...(string|string[])} [predicate] The function invoked per
	     *  iteration or property names to pick, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.pick(object, 'user');
	     * // => { 'user': 'fred' }
	     *
	     * _.pick(object, _.isString);
	     * // => { 'user': 'fred' }
	     */var pick=restParam(function(object,props){if(object==null){return{};}return typeof props[0]=='function'?pickByCallback(object,bindCallback(props[0],props[1],3)):pickByArray(object,baseFlatten(props));});/**
	     * This method is like `_.get` except that if the resolved value is a function
	     * it's invoked with the `this` binding of its parent object and its result
	     * is returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to resolve.
	     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	     *
	     * _.result(object, 'a[0].b.c1');
	     * // => 3
	     *
	     * _.result(object, 'a[0].b.c2');
	     * // => 4
	     *
	     * _.result(object, 'a.b.c', 'default');
	     * // => 'default'
	     *
	     * _.result(object, 'a.b.c', _.constant('default'));
	     * // => 'default'
	     */function result(object,path,defaultValue){var result=object==null?undefined:object[path];if(result===undefined){if(object!=null&&!isKey(path,object)){path=toPath(path);object=path.length==1?object:baseGet(object,baseSlice(path,0,-1));result=object==null?undefined:object[last(path)];}result=result===undefined?defaultValue:result;}return isFunction(result)?result.call(object):result;}/**
	     * Sets the property value of `path` on `object`. If a portion of `path`
	     * does not exist it's created.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to augment.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.set(object, 'a[0].b.c', 4);
	     * console.log(object.a[0].b.c);
	     * // => 4
	     *
	     * _.set(object, 'x[0].y.z', 5);
	     * console.log(object.x[0].y.z);
	     * // => 5
	     */function set(object,path,value){if(object==null){return object;}var pathKey=path+'';path=object[pathKey]!=null||isKey(path,object)?[pathKey]:toPath(path);var index=-1,length=path.length,lastIndex=length-1,nested=object;while(nested!=null&&++index<length){var key=path[index];if(isObject(nested)){if(index==lastIndex){nested[key]=value;}else if(nested[key]==null){nested[key]=isIndex(path[index+1])?[]:{};}}nested=nested[key];}return object;}/**
	     * An alternative to `_.reduce`; this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own enumerable
	     * properties through `iteratee`, with each invocation potentially mutating
	     * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
	     * with four arguments: (accumulator, value, key, object). Iteratee functions
	     * may exit iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Array|Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.transform([2, 3, 4], function(result, n) {
	     *   result.push(n *= n);
	     *   return n % 2 == 0;
	     * });
	     * // => [4, 9]
	     *
	     * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
	     *   result[key] = n * 3;
	     * });
	     * // => { 'a': 3, 'b': 6 }
	     */function transform(object,iteratee,accumulator,thisArg){var isArr=isArray(object)||isTypedArray(object);iteratee=getCallback(iteratee,thisArg,4);if(accumulator==null){if(isArr||isObject(object)){var Ctor=object.constructor;if(isArr){accumulator=isArray(object)?new Ctor():[];}else{accumulator=baseCreate(isFunction(Ctor)?Ctor.prototype:undefined);}}else{accumulator={};}}(isArr?arrayEach:baseForOwn)(object,function(value,index,object){return iteratee(accumulator,value,index,object);});return accumulator;}/**
	     * Creates an array of the own enumerable property values of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.values(new Foo);
	     * // => [1, 2] (iteration order is not guaranteed)
	     *
	     * _.values('hi');
	     * // => ['h', 'i']
	     */function values(object){return baseValues(object,keys(object));}/**
	     * Creates an array of the own and inherited enumerable property values
	     * of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.valuesIn(new Foo);
	     * // => [1, 2, 3] (iteration order is not guaranteed)
	     */function valuesIn(object){return baseValues(object,keysIn(object));}/*------------------------------------------------------------------------*//**
	     * Checks if `n` is between `start` and up to but not including, `end`. If
	     * `end` is not specified it's set to `start` with `start` then set to `0`.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} n The number to check.
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
	     * @example
	     *
	     * _.inRange(3, 2, 4);
	     * // => true
	     *
	     * _.inRange(4, 8);
	     * // => true
	     *
	     * _.inRange(4, 2);
	     * // => false
	     *
	     * _.inRange(2, 2);
	     * // => false
	     *
	     * _.inRange(1.2, 2);
	     * // => true
	     *
	     * _.inRange(5.2, 4);
	     * // => false
	     */function inRange(value,start,end){start=+start||0;if(end===undefined){end=start;start=0;}else{end=+end||0;}return value>=nativeMin(start,end)&&value<nativeMax(start,end);}/**
	     * Produces a random number between `min` and `max` (inclusive). If only one
	     * argument is provided a number between `0` and the given number is returned.
	     * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
	     * number is returned instead of an integer.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} [min=0] The minimum possible value.
	     * @param {number} [max=1] The maximum possible value.
	     * @param {boolean} [floating] Specify returning a floating-point number.
	     * @returns {number} Returns the random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */function random(min,max,floating){if(floating&&isIterateeCall(min,max,floating)){max=floating=undefined;}var noMin=min==null,noMax=max==null;if(floating==null){if(noMax&&typeof min=='boolean'){floating=min;min=1;}else if(typeof max=='boolean'){floating=max;noMax=true;}}if(noMin&&noMax){max=1;noMax=false;}min=+min||0;if(noMax){max=min;min=0;}else{max=+max||0;}if(floating||min%1||max%1){var rand=nativeRandom();return nativeMin(min+rand*(max-min+parseFloat('1e-'+((rand+'').length-1))),max);}return baseRandom(min,max);}/*------------------------------------------------------------------------*//**
	     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the camel cased string.
	     * @example
	     *
	     * _.camelCase('Foo Bar');
	     * // => 'fooBar'
	     *
	     * _.camelCase('--foo-bar');
	     * // => 'fooBar'
	     *
	     * _.camelCase('__foo_bar__');
	     * // => 'fooBar'
	     */var camelCase=createCompounder(function(result,word,index){word=word.toLowerCase();return result+(index?word.charAt(0).toUpperCase()+word.slice(1):word);});/**
	     * Capitalizes the first character of `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to capitalize.
	     * @returns {string} Returns the capitalized string.
	     * @example
	     *
	     * _.capitalize('fred');
	     * // => 'Fred'
	     */function capitalize(string){string=baseToString(string);return string&&string.charAt(0).toUpperCase()+string.slice(1);}/**
	     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to deburr.
	     * @returns {string} Returns the deburred string.
	     * @example
	     *
	     * _.deburr('déjà vu');
	     * // => 'deja vu'
	     */function deburr(string){string=baseToString(string);return string&&string.replace(reLatin1,deburrLetter).replace(reComboMark,'');}/**
	     * Checks if `string` ends with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=string.length] The position to search from.
	     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
	     * @example
	     *
	     * _.endsWith('abc', 'c');
	     * // => true
	     *
	     * _.endsWith('abc', 'b');
	     * // => false
	     *
	     * _.endsWith('abc', 'b', 2);
	     * // => true
	     */function endsWith(string,target,position){string=baseToString(string);target=target+'';var length=string.length;position=position===undefined?length:nativeMin(position<0?0:+position||0,length);position-=target.length;return position>=0&&string.indexOf(target,position)==position;}/**
	     * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
	     * their corresponding HTML entities.
	     *
	     * **Note:** No other characters are escaped. To escape additional characters
	     * use a third-party library like [_he_](https://mths.be/he).
	     *
	     * Though the ">" character is escaped for symmetry, characters like
	     * ">" and "/" don't need escaping in HTML and have no special meaning
	     * unless they're part of a tag or unquoted attribute value.
	     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	     * (under "semi-related fun fact") for more details.
	     *
	     * Backticks are escaped because in Internet Explorer < 9, they can break out
	     * of attribute values or HTML comments. See [#59](https://html5sec.org/#59),
	     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
	     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
	     * for more details.
	     *
	     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
	     * to reduce XSS vectors.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('fred, barney, & pebbles');
	     * // => 'fred, barney, &amp; pebbles'
	     */function escape(string){// Reset `lastIndex` because in IE < 9 `String#replace` does not.
	string=baseToString(string);return string&&reHasUnescapedHtml.test(string)?string.replace(reUnescapedHtml,escapeHtmlChar):string;}/**
	     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
	     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escapeRegExp('[lodash](https://lodash.com/)');
	     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
	     */function escapeRegExp(string){string=baseToString(string);return string&&reHasRegExpChars.test(string)?string.replace(reRegExpChars,escapeRegExpChar):string||'(?:)';}/**
	     * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the kebab cased string.
	     * @example
	     *
	     * _.kebabCase('Foo Bar');
	     * // => 'foo-bar'
	     *
	     * _.kebabCase('fooBar');
	     * // => 'foo-bar'
	     *
	     * _.kebabCase('__foo_bar__');
	     * // => 'foo-bar'
	     */var kebabCase=createCompounder(function(result,word,index){return result+(index?'-':'')+word.toLowerCase();});/**
	     * Pads `string` on the left and right sides if it's shorter than `length`.
	     * Padding characters are truncated if they can't be evenly divided by `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.pad('abc', 8);
	     * // => '  abc   '
	     *
	     * _.pad('abc', 8, '_-');
	     * // => '_-abc_-_'
	     *
	     * _.pad('abc', 3);
	     * // => 'abc'
	     */function pad(string,length,chars){string=baseToString(string);length=+length;var strLength=string.length;if(strLength>=length||!nativeIsFinite(length)){return string;}var mid=(length-strLength)/2,leftLength=nativeFloor(mid),rightLength=nativeCeil(mid);chars=createPadding('',rightLength,chars);return chars.slice(0,leftLength)+string+chars;}/**
	     * Pads `string` on the left side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padLeft('abc', 6);
	     * // => '   abc'
	     *
	     * _.padLeft('abc', 6, '_-');
	     * // => '_-_abc'
	     *
	     * _.padLeft('abc', 3);
	     * // => 'abc'
	     */var padLeft=createPadDir();/**
	     * Pads `string` on the right side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padRight('abc', 6);
	     * // => 'abc   '
	     *
	     * _.padRight('abc', 6, '_-');
	     * // => 'abc_-_'
	     *
	     * _.padRight('abc', 3);
	     * // => 'abc'
	     */var padRight=createPadDir(true);/**
	     * Converts `string` to an integer of the specified radix. If `radix` is
	     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
	     * in which case a `radix` of `16` is used.
	     *
	     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
	     * of `parseInt`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} string The string to convert.
	     * @param {number} [radix] The radix to interpret `value` by.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     *
	     * _.map(['6', '08', '10'], _.parseInt);
	     * // => [6, 8, 10]
	     */function parseInt(string,radix,guard){// Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
	// Chrome fails to trim leading <BOM> whitespace characters.
	// See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
	if(guard?isIterateeCall(string,radix,guard):radix==null){radix=0;}else if(radix){radix=+radix;}string=trim(string);return nativeParseInt(string,radix||(reHasHexPrefix.test(string)?16:10));}/**
	     * Repeats the given string `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to repeat.
	     * @param {number} [n=0] The number of times to repeat the string.
	     * @returns {string} Returns the repeated string.
	     * @example
	     *
	     * _.repeat('*', 3);
	     * // => '***'
	     *
	     * _.repeat('abc', 2);
	     * // => 'abcabc'
	     *
	     * _.repeat('abc', 0);
	     * // => ''
	     */function repeat(string,n){var result='';string=baseToString(string);n=+n;if(n<1||!string||!nativeIsFinite(n)){return result;}// Leverage the exponentiation by squaring algorithm for a faster repeat.
	// See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
	do{if(n%2){result+=string;}n=nativeFloor(n/2);string+=string;}while(n);return result;}/**
	     * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the snake cased string.
	     * @example
	     *
	     * _.snakeCase('Foo Bar');
	     * // => 'foo_bar'
	     *
	     * _.snakeCase('fooBar');
	     * // => 'foo_bar'
	     *
	     * _.snakeCase('--foo-bar');
	     * // => 'foo_bar'
	     */var snakeCase=createCompounder(function(result,word,index){return result+(index?'_':'')+word.toLowerCase();});/**
	     * Converts `string` to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the start cased string.
	     * @example
	     *
	     * _.startCase('--foo-bar');
	     * // => 'Foo Bar'
	     *
	     * _.startCase('fooBar');
	     * // => 'Foo Bar'
	     *
	     * _.startCase('__foo_bar__');
	     * // => 'Foo Bar'
	     */var startCase=createCompounder(function(result,word,index){return result+(index?' ':'')+(word.charAt(0).toUpperCase()+word.slice(1));});/**
	     * Checks if `string` starts with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=0] The position to search from.
	     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
	     * @example
	     *
	     * _.startsWith('abc', 'a');
	     * // => true
	     *
	     * _.startsWith('abc', 'b');
	     * // => false
	     *
	     * _.startsWith('abc', 'b', 1);
	     * // => true
	     */function startsWith(string,target,position){string=baseToString(string);position=position==null?0:nativeMin(position<0?0:+position||0,string.length);return string.lastIndexOf(target,position)==position;}/**
	     * Creates a compiled template function that can interpolate data properties
	     * in "interpolate" delimiters, HTML-escape interpolated data properties in
	     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
	     * properties may be accessed as free variables in the template. If a setting
	     * object is provided it takes precedence over `_.templateSettings` values.
	     *
	     * **Note:** In the development build `_.template` utilizes
	     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
	     * for easier debugging.
	     *
	     * For more information on precompiling templates see
	     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
	     *
	     * For more information on Chrome extension sandboxes see
	     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The template string.
	     * @param {Object} [options] The options object.
	     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
	     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	     * @param {Object} [options.imports] An object to import into the template as free variables.
	     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
	     * @param {string} [options.variable] The data object variable name.
	     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
	     * @returns {Function} Returns the compiled template function.
	     * @example
	     *
	     * // using the "interpolate" delimiter to create a compiled template
	     * var compiled = _.template('hello <%= user %>!');
	     * compiled({ 'user': 'fred' });
	     * // => 'hello fred!'
	     *
	     * // using the HTML "escape" delimiter to escape data property values
	     * var compiled = _.template('<b><%- value %></b>');
	     * compiled({ 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
	     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the internal `print` function in "evaluate" delimiters
	     * var compiled = _.template('<% print("hello " + user); %>!');
	     * compiled({ 'user': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
	     * var compiled = _.template('hello ${ user }!');
	     * compiled({ 'user': 'pebbles' });
	     * // => 'hello pebbles!'
	     *
	     * // using custom template delimiters
	     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	     * var compiled = _.template('hello {{ user }}!');
	     * compiled({ 'user': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // using backslashes to treat delimiters as plain text
	     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
	     * compiled({ 'value': 'ignored' });
	     * // => '<%- value %>'
	     *
	     * // using the `imports` option to import `jQuery` as `jq`
	     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the `sourceURL` option to specify a custom sourceURL for the template
	     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	     *
	     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     * //   var __t, __p = '';
	     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	     * //   return __p;
	     * // }
	     *
	     * // using the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and a stack trace
	     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */function template(string,options,otherOptions){// Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
	// and Laura Doktorova's doT.js (https://github.com/olado/doT).
	var settings=lodash.templateSettings;if(otherOptions&&isIterateeCall(string,options,otherOptions)){options=otherOptions=undefined;}string=baseToString(string);options=assignWith(baseAssign({},otherOptions||options),settings,assignOwnDefaults);var imports=assignWith(baseAssign({},options.imports),settings.imports,assignOwnDefaults),importsKeys=keys(imports),importsValues=baseValues(imports,importsKeys);var isEscaping,isEvaluating,index=0,interpolate=options.interpolate||reNoMatch,source="__p += '";// Compile the regexp to match each delimiter.
	var reDelimiters=RegExp((options.escape||reNoMatch).source+'|'+interpolate.source+'|'+(interpolate===reInterpolate?reEsTemplate:reNoMatch).source+'|'+(options.evaluate||reNoMatch).source+'|$','g');// Use a sourceURL for easier debugging.
	var sourceURL='//# sourceURL='+('sourceURL'in options?options.sourceURL:'lodash.templateSources['+ ++templateCounter+']')+'\n';string.replace(reDelimiters,function(match,escapeValue,interpolateValue,esTemplateValue,evaluateValue,offset){interpolateValue||(interpolateValue=esTemplateValue);// Escape characters that can't be included in string literals.
	source+=string.slice(index,offset).replace(reUnescapedString,escapeStringChar);// Replace delimiters with snippets.
	if(escapeValue){isEscaping=true;source+="' +\n__e("+escapeValue+") +\n'";}if(evaluateValue){isEvaluating=true;source+="';\n"+evaluateValue+";\n__p += '";}if(interpolateValue){source+="' +\n((__t = ("+interpolateValue+")) == null ? '' : __t) +\n'";}index=offset+match.length;// The JS engine embedded in Adobe products requires returning the `match`
	// string in order to produce the correct `offset` value.
	return match;});source+="';\n";// If `variable` is not specified wrap a with-statement around the generated
	// code to add the data object to the top of the scope chain.
	var variable=options.variable;if(!variable){source='with (obj) {\n'+source+'\n}\n';}// Cleanup code by stripping empty strings.
	source=(isEvaluating?source.replace(reEmptyStringLeading,''):source).replace(reEmptyStringMiddle,'$1').replace(reEmptyStringTrailing,'$1;');// Frame code as the function body.
	source='function('+(variable||'obj')+') {\n'+(variable?'':'obj || (obj = {});\n')+"var __t, __p = ''"+(isEscaping?', __e = _.escape':'')+(isEvaluating?', __j = Array.prototype.join;\n'+"function print() { __p += __j.call(arguments, '') }\n":';\n')+source+'return __p\n}';var result=attempt(function(){return Function(importsKeys,sourceURL+'return '+source).apply(undefined,importsValues);});// Provide the compiled function's source by its `toString` method or
	// the `source` property as a convenience for inlining compiled templates.
	result.source=source;if(isError(result)){throw result;}return result;}/**
	     * Removes leading and trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trim('  abc  ');
	     * // => 'abc'
	     *
	     * _.trim('-_-abc-_-', '_-');
	     * // => 'abc'
	     *
	     * _.map(['  foo  ', '  bar  '], _.trim);
	     * // => ['foo', 'bar']
	     */function trim(string,chars,guard){var value=string;string=baseToString(string);if(!string){return string;}if(guard?isIterateeCall(value,chars,guard):chars==null){return string.slice(trimmedLeftIndex(string),trimmedRightIndex(string)+1);}chars=chars+'';return string.slice(charsLeftIndex(string,chars),charsRightIndex(string,chars)+1);}/**
	     * Removes leading whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimLeft('  abc  ');
	     * // => 'abc  '
	     *
	     * _.trimLeft('-_-abc-_-', '_-');
	     * // => 'abc-_-'
	     */function trimLeft(string,chars,guard){var value=string;string=baseToString(string);if(!string){return string;}if(guard?isIterateeCall(value,chars,guard):chars==null){return string.slice(trimmedLeftIndex(string));}return string.slice(charsLeftIndex(string,chars+''));}/**
	     * Removes trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimRight('  abc  ');
	     * // => '  abc'
	     *
	     * _.trimRight('-_-abc-_-', '_-');
	     * // => '-_-abc'
	     */function trimRight(string,chars,guard){var value=string;string=baseToString(string);if(!string){return string;}if(guard?isIterateeCall(value,chars,guard):chars==null){return string.slice(0,trimmedRightIndex(string)+1);}return string.slice(0,charsRightIndex(string,chars+'')+1);}/**
	     * Truncates `string` if it's longer than the given maximum string length.
	     * The last characters of the truncated string are replaced with the omission
	     * string which defaults to "...".
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to truncate.
	     * @param {Object|number} [options] The options object or maximum string length.
	     * @param {number} [options.length=30] The maximum string length.
	     * @param {string} [options.omission='...'] The string to indicate text is omitted.
	     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the truncated string.
	     * @example
	     *
	     * _.trunc('hi-diddly-ho there, neighborino');
	     * // => 'hi-diddly-ho there, neighbo...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', 24);
	     * // => 'hi-diddly-ho there, n...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': ' '
	     * });
	     * // => 'hi-diddly-ho there,...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': /,? +/
	     * });
	     * // => 'hi-diddly-ho there...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'omission': ' [...]'
	     * });
	     * // => 'hi-diddly-ho there, neig [...]'
	     */function trunc(string,options,guard){if(guard&&isIterateeCall(string,options,guard)){options=undefined;}var length=DEFAULT_TRUNC_LENGTH,omission=DEFAULT_TRUNC_OMISSION;if(options!=null){if(isObject(options)){var separator='separator'in options?options.separator:separator;length='length'in options?+options.length||0:length;omission='omission'in options?baseToString(options.omission):omission;}else{length=+options||0;}}string=baseToString(string);if(length>=string.length){return string;}var end=length-omission.length;if(end<1){return omission;}var result=string.slice(0,end);if(separator==null){return result+omission;}if(isRegExp(separator)){if(string.slice(end).search(separator)){var match,newEnd,substring=string.slice(0,end);if(!separator.global){separator=RegExp(separator.source,(reFlags.exec(separator)||'')+'g');}separator.lastIndex=0;while(match=separator.exec(substring)){newEnd=match.index;}result=result.slice(0,newEnd==null?end:newEnd);}}else if(string.indexOf(separator,end)!=end){var index=result.lastIndexOf(separator);if(index>-1){result=result.slice(0,index);}}return result+omission;}/**
	     * The inverse of `_.escape`; this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
	     * corresponding characters.
	     *
	     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
	     * entities use a third-party library like [_he_](https://mths.be/he).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('fred, barney, &amp; pebbles');
	     * // => 'fred, barney, & pebbles'
	     */function unescape(string){string=baseToString(string);return string&&reHasEscapedHtml.test(string)?string.replace(reEscapedHtml,unescapeHtmlChar):string;}/**
	     * Splits `string` into an array of its words.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {RegExp|string} [pattern] The pattern to match words.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the words of `string`.
	     * @example
	     *
	     * _.words('fred, barney, & pebbles');
	     * // => ['fred', 'barney', 'pebbles']
	     *
	     * _.words('fred, barney, & pebbles', /[^, ]+/g);
	     * // => ['fred', 'barney', '&', 'pebbles']
	     */function words(string,pattern,guard){if(guard&&isIterateeCall(string,pattern,guard)){pattern=undefined;}string=baseToString(string);return string.match(pattern||reWords)||[];}/*------------------------------------------------------------------------*//**
	     * Attempts to invoke `func`, returning either the result or the caught error
	     * object. Any additional arguments are provided to `func` when it's invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Function} func The function to attempt.
	     * @returns {*} Returns the `func` result or error object.
	     * @example
	     *
	     * // avoid throwing errors for invalid selectors
	     * var elements = _.attempt(function(selector) {
	     *   return document.querySelectorAll(selector);
	     * }, '>_>');
	     *
	     * if (_.isError(elements)) {
	     *   elements = [];
	     * }
	     */var attempt=restParam(function(func,args){try{return func.apply(undefined,args);}catch(e){return isError(e)?e:new Error(e);}});/**
	     * Creates a function that invokes `func` with the `this` binding of `thisArg`
	     * and arguments of the created function. If `func` is a property name the
	     * created callback returns the property value for a given element. If `func`
	     * is an object the created callback returns `true` for elements that contain
	     * the equivalent object properties, otherwise it returns `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias iteratee
	     * @category Utility
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the callback.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // wrap to create custom callback shorthands
	     * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
	     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
	     *   if (!match) {
	     *     return callback(func, thisArg);
	     *   }
	     *   return function(object) {
	     *     return match[2] == 'gt'
	     *       ? object[match[1]] > match[3]
	     *       : object[match[1]] < match[3];
	     *   };
	     * });
	     *
	     * _.filter(users, 'age__gt36');
	     * // => [{ 'user': 'fred', 'age': 40 }]
	     */function callback(func,thisArg,guard){if(guard&&isIterateeCall(func,thisArg,guard)){thisArg=undefined;}return isObjectLike(func)?matches(func):baseCallback(func,thisArg);}/**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var getter = _.constant(object);
	     *
	     * getter() === object;
	     * // => true
	     */function constant(value){return function(){return value;};}/**
	     * This method returns the first argument provided to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.identity(object) === object;
	     * // => true
	     */function identity(value){return value;}/**
	     * Creates a function that performs a deep comparison between a given object
	     * and `source`, returning `true` if the given object has equivalent property
	     * values, else `false`.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
	     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
	     */function matches(source){return baseMatches(baseClone(source,true));}/**
	     * Creates a function that compares the property value of `path` on a given
	     * object to `value`.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * _.find(users, _.matchesProperty('user', 'fred'));
	     * // => { 'user': 'fred' }
	     */function matchesProperty(path,srcValue){return baseMatchesProperty(path,baseClone(srcValue,true));}/**
	     * Creates a function that invokes the method at `path` on a given object.
	     * Any additional arguments are provided to the invoked method.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': { 'c': _.constant(2) } } },
	     *   { 'a': { 'b': { 'c': _.constant(1) } } }
	     * ];
	     *
	     * _.map(objects, _.method('a.b.c'));
	     * // => [2, 1]
	     *
	     * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
	     * // => [1, 2]
	     */var method=restParam(function(path,args){return function(object){return invokePath(object,path,args);};});/**
	     * The opposite of `_.method`; this method creates a function that invokes
	     * the method at a given path on `object`. Any additional arguments are
	     * provided to the invoked method.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} object The object to query.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var array = _.times(3, _.constant),
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
	     * // => [2, 0]
	     */var methodOf=restParam(function(object,args){return function(path){return invokePath(object,path,args);};});/**
	     * Adds all own enumerable function properties of a source object to the
	     * destination object. If `object` is a function then methods are added to
	     * its prototype as well.
	     *
	     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
	     * avoid conflicts caused by modifying the original.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Function|Object} [object=lodash] The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.chain=true] Specify whether the functions added
	     *  are chainable.
	     * @returns {Function|Object} Returns `object`.
	     * @example
	     *
	     * function vowels(string) {
	     *   return _.filter(string, function(v) {
	     *     return /[aeiou]/i.test(v);
	     *   });
	     * }
	     *
	     * _.mixin({ 'vowels': vowels });
	     * _.vowels('fred');
	     * // => ['e']
	     *
	     * _('fred').vowels().value();
	     * // => ['e']
	     *
	     * _.mixin({ 'vowels': vowels }, { 'chain': false });
	     * _('fred').vowels();
	     * // => ['e']
	     */function mixin(object,source,options){if(options==null){var isObj=isObject(source),props=isObj?keys(source):undefined,methodNames=props&&props.length?baseFunctions(source,props):undefined;if(!(methodNames?methodNames.length:isObj)){methodNames=false;options=source;source=object;object=this;}}if(!methodNames){methodNames=baseFunctions(source,keys(source));}var chain=true,index=-1,isFunc=isFunction(object),length=methodNames.length;if(options===false){chain=false;}else if(isObject(options)&&'chain'in options){chain=options.chain;}while(++index<length){var methodName=methodNames[index],func=source[methodName];object[methodName]=func;if(isFunc){object.prototype[methodName]=function(func){return function(){var chainAll=this.__chain__;if(chain||chainAll){var result=object(this.__wrapped__),actions=result.__actions__=arrayCopy(this.__actions__);actions.push({'func':func,'args':arguments,'thisArg':object});result.__chain__=chainAll;return result;}return func.apply(object,arrayPush([this.value()],arguments));};}(func);}}return object;}/**
	     * Reverts the `_` variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */function noConflict(){root._=oldDash;return this;}/**
	     * A no-operation function that returns `undefined` regardless of the
	     * arguments it receives.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.noop(object) === undefined;
	     * // => true
	     */function noop(){}// No operation performed.
	/**
	     * Creates a function that returns the property value at `path` on a
	     * given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': { 'c': 2 } } },
	     *   { 'a': { 'b': { 'c': 1 } } }
	     * ];
	     *
	     * _.map(objects, _.property('a.b.c'));
	     * // => [2, 1]
	     *
	     * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	     * // => [1, 2]
	     */function property(path){return isKey(path)?baseProperty(path):basePropertyDeep(path);}/**
	     * The opposite of `_.property`; this method creates a function that returns
	     * the property value at a given path on `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} object The object to query.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var array = [0, 1, 2],
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
	     * // => [2, 0]
	     */function propertyOf(object){return function(path){return baseGet(object,toPath(path),path+'');};}/**
	     * Creates an array of numbers (positive and/or negative) progressing from
	     * `start` up to, but not including, `end`. If `end` is not specified it's
	     * set to `start` with `start` then set to `0`. If `end` is less than `start`
	     * a zero-length range is created unless a negative `step` is specified.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} [step=1] The value to increment or decrement by.
	     * @returns {Array} Returns the new array of numbers.
	     * @example
	     *
	     * _.range(4);
	     * // => [0, 1, 2, 3]
	     *
	     * _.range(1, 5);
	     * // => [1, 2, 3, 4]
	     *
	     * _.range(0, 20, 5);
	     * // => [0, 5, 10, 15]
	     *
	     * _.range(0, -4, -1);
	     * // => [0, -1, -2, -3]
	     *
	     * _.range(1, 4, 0);
	     * // => [1, 1, 1]
	     *
	     * _.range(0);
	     * // => []
	     */function range(start,end,step){if(step&&isIterateeCall(start,end,step)){end=step=undefined;}start=+start||0;step=step==null?1:+step||0;if(end==null){end=start;start=0;}else{end=+end||0;}// Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
	// See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
	var index=-1,length=nativeMax(nativeCeil((end-start)/(step||1)),0),result=Array(length);while(++index<length){result[index]=start;start+=step;}return result;}/**
	     * Invokes the iteratee function `n` times, returning an array of the results
	     * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
	     * one argument; (index).
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {number} n The number of times to invoke `iteratee`.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
	     * // => [3, 6, 4]
	     *
	     * _.times(3, function(n) {
	     *   mage.castSpell(n);
	     * });
	     * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
	     *
	     * _.times(3, function(n) {
	     *   this.cast(n);
	     * }, mage);
	     * // => also invokes `mage.castSpell(n)` three times
	     */function times(n,iteratee,thisArg){n=nativeFloor(n);// Exit early to avoid a JSC JIT bug in Safari 8
	// where `Array(0)` is treated as `Array(1)`.
	if(n<1||!nativeIsFinite(n)){return[];}var index=-1,result=Array(nativeMin(n,MAX_ARRAY_LENGTH));iteratee=bindCallback(iteratee,thisArg,1);while(++index<n){if(index<MAX_ARRAY_LENGTH){result[index]=iteratee(index);}else{iteratee(index);}}return result;}/**
	     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {string} [prefix] The value to prefix the ID with.
	     * @returns {string} Returns the unique ID.
	     * @example
	     *
	     * _.uniqueId('contact_');
	     * // => 'contact_104'
	     *
	     * _.uniqueId();
	     * // => '105'
	     */function uniqueId(prefix){var id=++idCounter;return baseToString(prefix)+id;}/*------------------------------------------------------------------------*//**
	     * Adds two numbers.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} augend The first number to add.
	     * @param {number} addend The second number to add.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * _.add(6, 4);
	     * // => 10
	     */function add(augend,addend){return(+augend||0)+(+addend||0);}/**
	     * Calculates `n` rounded up to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round up.
	     * @param {number} [precision=0] The precision to round up to.
	     * @returns {number} Returns the rounded up number.
	     * @example
	     *
	     * _.ceil(4.006);
	     * // => 5
	     *
	     * _.ceil(6.004, 2);
	     * // => 6.01
	     *
	     * _.ceil(6040, -2);
	     * // => 6100
	     */var ceil=createRound('ceil');/**
	     * Calculates `n` rounded down to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round down.
	     * @param {number} [precision=0] The precision to round down to.
	     * @returns {number} Returns the rounded down number.
	     * @example
	     *
	     * _.floor(4.006);
	     * // => 4
	     *
	     * _.floor(0.046, 2);
	     * // => 0.04
	     *
	     * _.floor(4060, -2);
	     * // => 4000
	     */var floor=createRound('floor');/**
	     * Gets the maximum value of `collection`. If `collection` is empty or falsey
	     * `-Infinity` is returned. If an iteratee function is provided it's invoked
	     * for each value in `collection` to generate the criterion by which the value
	     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * _.max([]);
	     * // => -Infinity
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.max(users, function(chr) {
	     *   return chr.age;
	     * });
	     * // => { 'user': 'fred', 'age': 40 }
	     *
	     * // using the `_.property` callback shorthand
	     * _.max(users, 'age');
	     * // => { 'user': 'fred', 'age': 40 }
	     */var max=createExtremum(gt,NEGATIVE_INFINITY);/**
	     * Gets the minimum value of `collection`. If `collection` is empty or falsey
	     * `Infinity` is returned. If an iteratee function is provided it's invoked
	     * for each value in `collection` to generate the criterion by which the value
	     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * _.min([]);
	     * // => Infinity
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.min(users, function(chr) {
	     *   return chr.age;
	     * });
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // using the `_.property` callback shorthand
	     * _.min(users, 'age');
	     * // => { 'user': 'barney', 'age': 36 }
	     */var min=createExtremum(lt,POSITIVE_INFINITY);/**
	     * Calculates `n` rounded to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round.
	     * @param {number} [precision=0] The precision to round to.
	     * @returns {number} Returns the rounded number.
	     * @example
	     *
	     * _.round(4.006);
	     * // => 4
	     *
	     * _.round(4.006, 2);
	     * // => 4.01
	     *
	     * _.round(4060, -2);
	     * // => 4100
	     */var round=createRound('round');/**
	     * Gets the sum of the values in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * _.sum([4, 6]);
	     * // => 10
	     *
	     * _.sum({ 'a': 4, 'b': 6 });
	     * // => 10
	     *
	     * var objects = [
	     *   { 'n': 4 },
	     *   { 'n': 6 }
	     * ];
	     *
	     * _.sum(objects, function(object) {
	     *   return object.n;
	     * });
	     * // => 10
	     *
	     * // using the `_.property` callback shorthand
	     * _.sum(objects, 'n');
	     * // => 10
	     */function sum(collection,iteratee,thisArg){if(thisArg&&isIterateeCall(collection,iteratee,thisArg)){iteratee=undefined;}iteratee=getCallback(iteratee,thisArg,3);return iteratee.length==1?arraySum(isArray(collection)?collection:toIterable(collection),iteratee):baseSum(collection,iteratee);}/*------------------------------------------------------------------------*/// Ensure wrappers are instances of `baseLodash`.
	lodash.prototype=baseLodash.prototype;LodashWrapper.prototype=baseCreate(baseLodash.prototype);LodashWrapper.prototype.constructor=LodashWrapper;LazyWrapper.prototype=baseCreate(baseLodash.prototype);LazyWrapper.prototype.constructor=LazyWrapper;// Add functions to the `Map` cache.
	MapCache.prototype['delete']=mapDelete;MapCache.prototype.get=mapGet;MapCache.prototype.has=mapHas;MapCache.prototype.set=mapSet;// Add functions to the `Set` cache.
	SetCache.prototype.push=cachePush;// Assign cache to `_.memoize`.
	memoize.Cache=MapCache;// Add functions that return wrapped values when chaining.
	lodash.after=after;lodash.ary=ary;lodash.assign=assign;lodash.at=at;lodash.before=before;lodash.bind=bind;lodash.bindAll=bindAll;lodash.bindKey=bindKey;lodash.callback=callback;lodash.chain=chain;lodash.chunk=chunk;lodash.compact=compact;lodash.constant=constant;lodash.countBy=countBy;lodash.create=create;lodash.curry=curry;lodash.curryRight=curryRight;lodash.debounce=debounce;lodash.defaults=defaults;lodash.defaultsDeep=defaultsDeep;lodash.defer=defer;lodash.delay=delay;lodash.difference=difference;lodash.drop=drop;lodash.dropRight=dropRight;lodash.dropRightWhile=dropRightWhile;lodash.dropWhile=dropWhile;lodash.fill=fill;lodash.filter=filter;lodash.flatten=flatten;lodash.flattenDeep=flattenDeep;lodash.flow=flow;lodash.flowRight=flowRight;lodash.forEach=forEach;lodash.forEachRight=forEachRight;lodash.forIn=forIn;lodash.forInRight=forInRight;lodash.forOwn=forOwn;lodash.forOwnRight=forOwnRight;lodash.functions=functions;lodash.groupBy=groupBy;lodash.indexBy=indexBy;lodash.initial=initial;lodash.intersection=intersection;lodash.invert=invert;lodash.invoke=invoke;lodash.keys=keys;lodash.keysIn=keysIn;lodash.map=map;lodash.mapKeys=mapKeys;lodash.mapValues=mapValues;lodash.matches=matches;lodash.matchesProperty=matchesProperty;lodash.memoize=memoize;lodash.merge=merge;lodash.method=method;lodash.methodOf=methodOf;lodash.mixin=mixin;lodash.modArgs=modArgs;lodash.negate=negate;lodash.omit=omit;lodash.once=once;lodash.pairs=pairs;lodash.partial=partial;lodash.partialRight=partialRight;lodash.partition=partition;lodash.pick=pick;lodash.pluck=pluck;lodash.property=property;lodash.propertyOf=propertyOf;lodash.pull=pull;lodash.pullAt=pullAt;lodash.range=range;lodash.rearg=rearg;lodash.reject=reject;lodash.remove=remove;lodash.rest=rest;lodash.restParam=restParam;lodash.set=set;lodash.shuffle=shuffle;lodash.slice=slice;lodash.sortBy=sortBy;lodash.sortByAll=sortByAll;lodash.sortByOrder=sortByOrder;lodash.spread=spread;lodash.take=take;lodash.takeRight=takeRight;lodash.takeRightWhile=takeRightWhile;lodash.takeWhile=takeWhile;lodash.tap=tap;lodash.throttle=throttle;lodash.thru=thru;lodash.times=times;lodash.toArray=toArray;lodash.toPlainObject=toPlainObject;lodash.transform=transform;lodash.union=union;lodash.uniq=uniq;lodash.unzip=unzip;lodash.unzipWith=unzipWith;lodash.values=values;lodash.valuesIn=valuesIn;lodash.where=where;lodash.without=without;lodash.wrap=wrap;lodash.xor=xor;lodash.zip=zip;lodash.zipObject=zipObject;lodash.zipWith=zipWith;// Add aliases.
	lodash.backflow=flowRight;lodash.collect=map;lodash.compose=flowRight;lodash.each=forEach;lodash.eachRight=forEachRight;lodash.extend=assign;lodash.iteratee=callback;lodash.methods=functions;lodash.object=zipObject;lodash.select=filter;lodash.tail=rest;lodash.unique=uniq;// Add functions to `lodash.prototype`.
	mixin(lodash,lodash);/*------------------------------------------------------------------------*/// Add functions that return unwrapped values when chaining.
	lodash.add=add;lodash.attempt=attempt;lodash.camelCase=camelCase;lodash.capitalize=capitalize;lodash.ceil=ceil;lodash.clone=clone;lodash.cloneDeep=cloneDeep;lodash.deburr=deburr;lodash.endsWith=endsWith;lodash.escape=escape;lodash.escapeRegExp=escapeRegExp;lodash.every=every;lodash.find=find;lodash.findIndex=findIndex;lodash.findKey=findKey;lodash.findLast=findLast;lodash.findLastIndex=findLastIndex;lodash.findLastKey=findLastKey;lodash.findWhere=findWhere;lodash.first=first;lodash.floor=floor;lodash.get=get;lodash.gt=gt;lodash.gte=gte;lodash.has=has;lodash.identity=identity;lodash.includes=includes;lodash.indexOf=indexOf;lodash.inRange=inRange;lodash.isArguments=isArguments;lodash.isArray=isArray;lodash.isBoolean=isBoolean;lodash.isDate=isDate;lodash.isElement=isElement;lodash.isEmpty=isEmpty;lodash.isEqual=isEqual;lodash.isError=isError;lodash.isFinite=isFinite;lodash.isFunction=isFunction;lodash.isMatch=isMatch;lodash.isNaN=isNaN;lodash.isNative=isNative;lodash.isNull=isNull;lodash.isNumber=isNumber;lodash.isObject=isObject;lodash.isPlainObject=isPlainObject;lodash.isRegExp=isRegExp;lodash.isString=isString;lodash.isTypedArray=isTypedArray;lodash.isUndefined=isUndefined;lodash.kebabCase=kebabCase;lodash.last=last;lodash.lastIndexOf=lastIndexOf;lodash.lt=lt;lodash.lte=lte;lodash.max=max;lodash.min=min;lodash.noConflict=noConflict;lodash.noop=noop;lodash.now=now;lodash.pad=pad;lodash.padLeft=padLeft;lodash.padRight=padRight;lodash.parseInt=parseInt;lodash.random=random;lodash.reduce=reduce;lodash.reduceRight=reduceRight;lodash.repeat=repeat;lodash.result=result;lodash.round=round;lodash.runInContext=runInContext;lodash.size=size;lodash.snakeCase=snakeCase;lodash.some=some;lodash.sortedIndex=sortedIndex;lodash.sortedLastIndex=sortedLastIndex;lodash.startCase=startCase;lodash.startsWith=startsWith;lodash.sum=sum;lodash.template=template;lodash.trim=trim;lodash.trimLeft=trimLeft;lodash.trimRight=trimRight;lodash.trunc=trunc;lodash.unescape=unescape;lodash.uniqueId=uniqueId;lodash.words=words;// Add aliases.
	lodash.all=every;lodash.any=some;lodash.contains=includes;lodash.eq=isEqual;lodash.detect=find;lodash.foldl=reduce;lodash.foldr=reduceRight;lodash.head=first;lodash.include=includes;lodash.inject=reduce;mixin(lodash,function(){var source={};baseForOwn(lodash,function(func,methodName){if(!lodash.prototype[methodName]){source[methodName]=func;}});return source;}(),false);/*------------------------------------------------------------------------*/// Add functions capable of returning wrapped and unwrapped values when chaining.
	lodash.sample=sample;lodash.prototype.sample=function(n){if(!this.__chain__&&n==null){return sample(this.value());}return this.thru(function(value){return sample(value,n);});};/*------------------------------------------------------------------------*//**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type string
	     */lodash.VERSION=VERSION;// Assign default placeholders.
	arrayEach(['bind','bindKey','curry','curryRight','partial','partialRight'],function(methodName){lodash[methodName].placeholder=lodash;});// Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
	arrayEach(['drop','take'],function(methodName,index){LazyWrapper.prototype[methodName]=function(n){var filtered=this.__filtered__;if(filtered&&!index){return new LazyWrapper(this);}n=n==null?1:nativeMax(nativeFloor(n)||0,0);var result=this.clone();if(filtered){result.__takeCount__=nativeMin(result.__takeCount__,n);}else{result.__views__.push({'size':n,'type':methodName+(result.__dir__<0?'Right':'')});}return result;};LazyWrapper.prototype[methodName+'Right']=function(n){return this.reverse()[methodName](n).reverse();};});// Add `LazyWrapper` methods that accept an `iteratee` value.
	arrayEach(['filter','map','takeWhile'],function(methodName,index){var type=index+1,isFilter=type!=LAZY_MAP_FLAG;LazyWrapper.prototype[methodName]=function(iteratee,thisArg){var result=this.clone();result.__iteratees__.push({'iteratee':getCallback(iteratee,thisArg,1),'type':type});result.__filtered__=result.__filtered__||isFilter;return result;};});// Add `LazyWrapper` methods for `_.first` and `_.last`.
	arrayEach(['first','last'],function(methodName,index){var takeName='take'+(index?'Right':'');LazyWrapper.prototype[methodName]=function(){return this[takeName](1).value()[0];};});// Add `LazyWrapper` methods for `_.initial` and `_.rest`.
	arrayEach(['initial','rest'],function(methodName,index){var dropName='drop'+(index?'':'Right');LazyWrapper.prototype[methodName]=function(){return this.__filtered__?new LazyWrapper(this):this[dropName](1);};});// Add `LazyWrapper` methods for `_.pluck` and `_.where`.
	arrayEach(['pluck','where'],function(methodName,index){var operationName=index?'filter':'map',createCallback=index?baseMatches:property;LazyWrapper.prototype[methodName]=function(value){return this[operationName](createCallback(value));};});LazyWrapper.prototype.compact=function(){return this.filter(identity);};LazyWrapper.prototype.reject=function(predicate,thisArg){predicate=getCallback(predicate,thisArg,1);return this.filter(function(value){return!predicate(value);});};LazyWrapper.prototype.slice=function(start,end){start=start==null?0:+start||0;var result=this;if(result.__filtered__&&(start>0||end<0)){return new LazyWrapper(result);}if(start<0){result=result.takeRight(-start);}else if(start){result=result.drop(start);}if(end!==undefined){end=+end||0;result=end<0?result.dropRight(-end):result.take(end-start);}return result;};LazyWrapper.prototype.takeRightWhile=function(predicate,thisArg){return this.reverse().takeWhile(predicate,thisArg).reverse();};LazyWrapper.prototype.toArray=function(){return this.take(POSITIVE_INFINITY);};// Add `LazyWrapper` methods to `lodash.prototype`.
	baseForOwn(LazyWrapper.prototype,function(func,methodName){var checkIteratee=/^(?:filter|map|reject)|While$/.test(methodName),retUnwrapped=/^(?:first|last)$/.test(methodName),lodashFunc=lodash[retUnwrapped?'take'+(methodName=='last'?'Right':''):methodName];if(!lodashFunc){return;}lodash.prototype[methodName]=function(){var args=retUnwrapped?[1]:arguments,chainAll=this.__chain__,value=this.__wrapped__,isHybrid=!!this.__actions__.length,isLazy=value instanceof LazyWrapper,iteratee=args[0],useLazy=isLazy||isArray(value);if(useLazy&&checkIteratee&&typeof iteratee=='function'&&iteratee.length!=1){// Avoid lazy use if the iteratee has a "length" value other than `1`.
	isLazy=useLazy=false;}var interceptor=function interceptor(value){return retUnwrapped&&chainAll?lodashFunc(value,1)[0]:lodashFunc.apply(undefined,arrayPush([value],args));};var action={'func':thru,'args':[interceptor],'thisArg':undefined},onlyLazy=isLazy&&!isHybrid;if(retUnwrapped&&!chainAll){if(onlyLazy){value=value.clone();value.__actions__.push(action);return func.call(value);}return lodashFunc.call(undefined,this.value())[0];}if(!retUnwrapped&&useLazy){value=onlyLazy?value:new LazyWrapper(this);var result=func.apply(value,args);result.__actions__.push(action);return new LodashWrapper(result,chainAll);}return this.thru(interceptor);};});// Add `Array` and `String` methods to `lodash.prototype`.
	arrayEach(['join','pop','push','replace','shift','sort','splice','split','unshift'],function(methodName){var func=(/^(?:replace|split)$/.test(methodName)?stringProto:arrayProto)[methodName],chainName=/^(?:push|sort|unshift)$/.test(methodName)?'tap':'thru',retUnwrapped=/^(?:join|pop|replace|shift)$/.test(methodName);lodash.prototype[methodName]=function(){var args=arguments;if(retUnwrapped&&!this.__chain__){return func.apply(this.value(),args);}return this[chainName](function(value){return func.apply(value,args);});};});// Map minified function names to their real names.
	baseForOwn(LazyWrapper.prototype,function(func,methodName){var lodashFunc=lodash[methodName];if(lodashFunc){var key=lodashFunc.name+'',names=realNames[key]||(realNames[key]=[]);names.push({'name':methodName,'func':lodashFunc});}});realNames[createHybridWrapper(undefined,BIND_KEY_FLAG).name]=[{'name':'wrapper','func':undefined}];// Add functions to the lazy wrapper.
	LazyWrapper.prototype.clone=lazyClone;LazyWrapper.prototype.reverse=lazyReverse;LazyWrapper.prototype.value=lazyValue;// Add chaining functions to the `lodash` wrapper.
	lodash.prototype.chain=wrapperChain;lodash.prototype.commit=wrapperCommit;lodash.prototype.concat=wrapperConcat;lodash.prototype.plant=wrapperPlant;lodash.prototype.reverse=wrapperReverse;lodash.prototype.toString=wrapperToString;lodash.prototype.run=lodash.prototype.toJSON=lodash.prototype.valueOf=lodash.prototype.value=wrapperValue;// Add function aliases to the `lodash` wrapper.
	lodash.prototype.collect=lodash.prototype.map;lodash.prototype.head=lodash.prototype.first;lodash.prototype.select=lodash.prototype.filter;lodash.prototype.tail=lodash.prototype.rest;return lodash;}/*--------------------------------------------------------------------------*/// Export lodash.
	var _=runInContext();// Some AMD build optimizers like r.js check for condition patterns like the following:
	if("function"=='function'&&(0,_typeof3.default)(__webpack_require__(103))=='object'&&__webpack_require__(103)){// Expose lodash to the global object when an AMD loader is present to avoid
	// errors in cases where lodash is loaded by a script tag and not intended
	// as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
	// more details.
	root._=_;// Define as an anonymous module so, through path mapping, it can be
	// referenced as the "underscore" module.
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return _;}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}// Check for `exports` after `define` in case a build optimizer adds an `exports` object.
	else if(freeExports&&freeModule){// Export for Node.js or RingoJS.
	if(moduleExports){(freeModule.exports=_)._=_;}// Export for Rhino with CommonJS support.
	else{freeExports._=_;}}else{// Export for a browser or Rhino.
	root._=_;}}).call(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(102)(module), (function() { return this; }())))

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 103 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Panel = exports.Records = exports.Play = exports.blueToothTip = undefined;

	var _stringify = __webpack_require__(99);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _toConsumableArray2 = __webpack_require__(105);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _const = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 是否显示蓝牙配对提示
	var blueToothTip = exports.blueToothTip = function () {
		var show = true;

		return {
			isHide: function isHide() {
				getLocalStorage('hideBTTip') == '1';
			},
			hide: function hide() {
				setLocalStorage('hideBTTip', 1);
			},
			close: function close() {
				show = false;
			}
		};
	}();

	// 播放列表信息
	var Play = exports.Play = function () {
		/*
	 	当前播放音乐的ID
	 */
		var currId = getLocalStorage('currId') || 0;

		/*
	 	播放模式
	 	0：顺序播放  1：单曲循环  3：随机播放  
	 */
		var mode = getLocalStorage('mode') || 0;

		/*
	 	播放列表音乐信息
	 		音乐id，音乐名称，播放链接，小图，中图，音乐作者
	 		mid, name, uri, msi, mmi, artist
	 */
		var list = getLocalStorage('list') || [];

		if (!currId && list.length) currId = list[0].mid;

		return {
			getCurrId: function getCurrId() {
				return currId;
			},
			getMode: function getMode() {
				return mode;
			},
			getList: function getList() {
				return list;
			},
			getCurrItem: function getCurrItem() {
				return this.getItem(currId);
			},
			setCurrId: function setCurrId(id) {
				currId = id;
				setLocalStorage('currId', id);
			},
			setMode: function setMode(val) {
				mode = val;
				setLocalStorage('mode', val);
			},
			getItem: function getItem(id) {
				var index = this.getItemIndex(id);

				if (index != -1) {
					return list[index];
				}
				return null;
			},


			// 判断歌曲中是否存在列表中
			isExist: function isExist(id) {
				return this.getItemIndex(id) != -1;
			},


			// 获取指定id音乐的索引
			getItemIndex: function getItemIndex(id) {
				var i,
				    len = list.length;

				for (i = 0; i < len; i++) {
					if (id == list[i].mid) return i;
				}
				return -1;
			},


			/*
	  	删除播放列表音乐
	  	@params
	  		ids 要删除的音乐id或id数组
	  			@return 如果删除了当前音乐，返回新的当前音乐
	  */
			remove: function remove(ids) {
				var j, item;

				ids = [].concat(ids);

				ids.forEach(function (id, i) {
					for (j = 0; j < list.length;) {
						item = list[j];
						if (item && item.mid == id) {
							list.splice(j, 1);
						} else {
							j++;
						}
					}
				});
				setLocalStorage('list', list);

				// 删除了当前currId，重新设置currId
				if (ids.indexOf(currId) > -1) {
					var index = this.getItemIndex(currId);

					// 获取删除后当前位置的音乐，不存在的话获取最后一个
					var item = list[index] || list[list.length - 1];

					currId = item ? item.mid : -1;
					setLocalStorage('currId', currId);

					return item;
				}
			},


			// 新增到下一首
			addToNext: function addToNext(items) {
				items = this.getNoExistItems(items);
				if (items.length) {
					var _list;

					var index = this.getItemIndex(currId);
					(_list = list).splice.apply(_list, [index + 1, 0].concat((0, _toConsumableArray3.default)(items)));
					setLocalStorage('list', list);
				}
				return items.length;
			},


			// 播放歌曲
			play: function play(item) {
				if (!this.isExist(item.mid)) {
					list = list.concat(item);
					setLocalStorage('list', list);
				}
				setLocalStorage('currId', item.mid);
			},


			// 过滤掉列表中已经有的歌曲
			getNoExistItems: function getNoExistItems(items) {
				var _this = this;

				var arr = [];
				items.forEach(function (item) {
					if (!_this.isExist(item.mid)) arr.push(item);
				});
				return arr;
			},


			// 获取以后的歌曲（随机一个，上一个，下一个）
			getLaterItem: function getLaterItem(operate) {
				var icurr = this.getItemIndex(currId),
				    ilater = icurr;

				if (mode == _const.PlayMode.RANDOM) {
					// 随机播放
					while (icurr == ilater) {
						ilater = this.getRandom();
					}
				} else {
					// 顺序或单曲
					if (operate == _const.PlayOper.PREV && --ilater < 0) {
						ilater = list.length - 1;
					}

					if (operate == _const.PlayOper.NEXT && ++ilater > list.length - 1) {
						ilater = 0;
					}
				}

				this.setCurrId(list[ilater].mid);

				return list[ilater];
			},
			getRandom: function getRandom() {
				return parseInt(Math.random() * list.length);
			},
			clear: function clear() {
				list.length = 0;
				setLocalStorage('list', list);
			}
		};
	}();

	// 播放记录
	var Records = exports.Records = {};
	;(function () {

		/*
	 	存储播放记录的最大数
	 */
		Records.maxSize = 100;

		/*
	 	存储记录有效时间
	 		7天
	 */
		Records.limitTime = 7 * 24 * 3600;

		/*
	 	记录列表
	 		mid, name, uri, msi, mmi, artist
	 */
		Records.list = getLocalStorage('records') || [];

		// 获取记录列表
		Records.getList = function () {
			return this.list;
		};

		// 添加记录
		Records.add = function (item) {
			this.list.push(item);
			setLocalStorage('records', this.list);
		};

		// 删除记录
		Records.remove = function (items) {
			// Object.prototype.toString.call(items) === '[object Array]';
			var list = this.list;

			items.forEach(function (item) {
				for (var i = 0; i < list.length;) {
					if (list[i].mid == item.mid) {
						list.splice(i, 1);
					} else {
						i++;
					}
				}
			});

			setLocalStorage('records', list);
		};
	})();

	/*
		存储标签栏id，当通过强制刷新或回退键直接访问页面时，直接定位到
		存储的panel, 通过链接访问页面时应设置为默认的第一个panel。
		有panel的页面：interval、localStation、network、tags
	*/
	var Panel = exports.Panel = {};
	;(function () {

		Panel.data = getLocalStorage('panel') || {};

		/*
	 	获取name页面的panelId
	 */
		Panel.getId = function (name) {
			return this.data[name] || 0;
		};

		/*
	 	设置name页面panel的id,
	 	id为0表示索引位置第一个
	 */
		Panel.setId = function (name, id) {
			this.data[name] = id || 0;
			setLocalStorage('panel', this.data);
		};
	})();

	/*
		获取本地存储信息
	*/
	function getLocalStorage(name) {
		if (name == 'list' || name == 'records') return JSON.parse(localStorage[name] || '[]');
		if (name == 'panel') return JSON.parse(localStorage[name] || '{}');
		return localStorage[name];
	}

	/*
		设置本地存储信息
	*/
	function setLocalStorage(name, data) {
		if (name == 'list' || name == 'records' || name == 'panel') data = (0, _stringify2.default)(data);
		localStorage[name] = data;
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(106);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(40);
	__webpack_require__(108);
	module.exports = __webpack_require__(18).Array.from;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(19)
	  , $export        = __webpack_require__(17)
	  , toObject       = __webpack_require__(8)
	  , call           = __webpack_require__(109)
	  , isArrayIter    = __webpack_require__(110)
	  , toLength       = __webpack_require__(56)
	  , createProperty = __webpack_require__(111)
	  , getIterFn      = __webpack_require__(112);

	$export($export.S + $export.F * !__webpack_require__(114)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(23);
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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(46)
	  , ITERATOR   = __webpack_require__(61)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(22)
	  , createDesc      = __webpack_require__(30);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(113)
	  , ITERATOR  = __webpack_require__(61)('iterator')
	  , Iterators = __webpack_require__(46);
	module.exports = __webpack_require__(18).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(54)
	  , TAG = __webpack_require__(61)('toStringTag')
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(61)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Internal = exports.Collects = undefined;

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
		收藏信息
	*/
	var Collects = exports.Collects = {};
	;(function (Ajax) {

		Collects.list = [];

		Ajax.getCollectList({}, function (list) {
			Collects.list = list.map(function (s) {
				return {
					mid: s.music_id,
					name: s.name,
					artist: s.artist,
					uri: s.uri,
					sourceType: s.sourceType
				};
			});
		});

		Collects.has = function (item) {
			for (var i = 0; i < this.list.length; i++) {
				if (item.mid == this.list[i].mid) return true;
			}
			return false;
		};

		Collects.add = function (items) {
			var _this = this;

			var arr = [].concat(items);

			arr.forEach(function (item) {
				if (!_this.has(item)) _this.list.push(item);
			});
		};

		Collects.remove = function (items) {
			var list = this.list;

			var arr = [].concat(items);

			arr.forEach(function (item) {
				for (var i = 0; i < list.length;) {
					if (list[i].mid == item.mid) {
						list.splice(i, 1);
					} else {
						i++;
					}
				}
			});
		};
	})(_ajax2.default);

	/*
		内置音乐
	*/
	var Internal = exports.Internal = {};
	;(function (Ajax) {

		Internal.list = [];

		Ajax.getRoomeMusicList({}, function (res) {
			if (res.code != 0) return;
			Internal.list = res.data;
		});

		// 获取内置音乐
		Internal.getData = function (callback) {
			return this.list;
		};

		Internal.getList = function () {
			var list = [],
			    i = 0,
			    j;

			for (; i < this.list.length; i++) {
				var item = this.list[i];
				for (j = 0; j < item.roomeMusicList.length; j++) {
					var music = item.roomeMusicList[j];
					list.push({
						mid: music.id,
						name: music.name,
						artist: '未知',
						msi: null
					});
				}
			}
			return list;
		};

		// 根据id获取
		Internal.getItem = function (id) {
			var i = 0,
			    j;
			for (; i < this.list.length; i++) {
				var item = this.list[i];
				for (j = 0; j < item.roomeMusicList.length; j++) {
					var music = item.roomeMusicList[j];
					if (music.id == id) return music;
				}
			}
			return null;
		};
	})(_ajax2.default);

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tips = __webpack_require__(117);

	var _tips2 = _interopRequireDefault(_tips);

	var _confirm = __webpack_require__(118);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	var _localStore = __webpack_require__(104);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;

	var Home = function (_React$Component) {
	    (0, _inherits3.default)(Home, _React$Component);

	    function Home(props) {
	        (0, _classCallCheck3.default)(this, Home);
	        return (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));
	    }

	    (0, _createClass3.default)(Home, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            document.title = '音乐';
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {}
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {}
	    }, {
	        key: 'setDefaultPanel',
	        value: function setDefaultPanel(name) {
	            _localStore.Panel.setId(name);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'page page_home' },
	                React.createElement(
	                    'section',
	                    { className: 'main' },
	                    React.createElement(
	                        'div',
	                        { className: 'wrapper', id: 'wrapper' },
	                        React.createElement(
	                            'div',
	                            { className: 'con' },
	                            React.createElement(
	                                'div',
	                                { className: 'group1' },
	                                React.createElement(
	                                    'div',
	                                    null,
	                                    React.createElement(
	                                        Link,
	                                        { to: '/albums' },
	                                        React.createElement('img', { src: '../static/imgs/pic-33@2x.png' }),
	                                        React.createElement(
	                                            'div',
	                                            null,
	                                            '\u6211\u7684\u6B4C\u5355'
	                                        )
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    null,
	                                    React.createElement(
	                                        Link,
	                                        { to: '/collection' },
	                                        React.createElement('img', { src: '../static/imgs/pic-34@2x.png' }),
	                                        React.createElement(
	                                            'div',
	                                            null,
	                                            '\u6211\u7684\u6536\u85CF'
	                                        )
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    null,
	                                    React.createElement(
	                                        Link,
	                                        { to: '/recent' },
	                                        React.createElement('img', { src: '../static/imgs/pic-35@2x.png' }),
	                                        React.createElement(
	                                            'div',
	                                            null,
	                                            '\u6700\u8FD1\u64AD\u653E'
	                                        )
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'group3' },
	                                React.createElement(
	                                    'div',
	                                    null,
	                                    React.createElement(
	                                        Link,
	                                        { to: '/internal', onTouchTap: this.setDefaultPanel.bind(this, 'internal') },
	                                        React.createElement(
	                                            'div',
	                                            null,
	                                            React.createElement('img', { src: '../static/imgs/pic-37@2x.png' })
	                                        ),
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            '\u8BBE\u5907\u97F3\u4E50'
	                                        )
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    null,
	                                    React.createElement(
	                                        Link,
	                                        { to: '/network', onTouchTap: this.setDefaultPanel.bind(this, 'network') },
	                                        React.createElement(
	                                            'div',
	                                            null,
	                                            React.createElement('img', { src: '../static/imgs/pic-38@2x.png' })
	                                        ),
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            '\u559C\u9A6C\u62C9\u96C5'
	                                        )
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    null,
	                                    React.createElement(
	                                        Link,
	                                        { to: '/localStation', onTouchTap: this.setDefaultPanel.bind(this, 'localStation') },
	                                        React.createElement(
	                                            'div',
	                                            null,
	                                            React.createElement('img', { src: '../static/imgs/pic-39@2x.png' })
	                                        ),
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            '\u672C\u5730\u7535\u53F0'
	                                        )
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	    return Home;
	}(React.Component);

	exports.default = Home;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tips = function (_React$Component) {
		(0, _inherits3.default)(Tips, _React$Component);

		function Tips(props) {
			(0, _classCallCheck3.default)(this, Tips);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Tips.__proto__ || (0, _getPrototypeOf2.default)(Tips)).call(this, props));

			_this.opts = { second: 3 };
			_this.state = { animate: false };

			_.assign(_this.opts, _this.props);
			return _this;
		}

		(0, _createClass3.default)(Tips, [{
			key: 'showMsg',
			value: function showMsg(msg) {
				var _this2 = this;

				this.setState({ animate: false, show: true, tip: msg });
				this.removeInterval = setTimeout(function () {
					_this2.setState({ animate: true });
					_this2.removeInterval = setTimeout(function () {
						_this2.setState({ show: false });
					}, 1000);
				}, this.opts.second * 1000);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				clearTimeout(this.removeInterval);
			}
		}, {
			key: 'render',
			value: function render() {
				var _state = this.state;
				var show = _state.show;
				var tip = _state.tip;
				var animate = _state.animate;


				return React.createElement(
					'div',
					{ className: 'tips_content ' + (show ? 'show ' : 'hide ') + (animate ? 'fadeout' : 'fadein') },
					React.createElement('div', { className: 'tips_shade' }),
					React.createElement(
						'span',
						{ className: 'tips' },
						tip
					)
				);
			}
		}]);
		return Tips;
	}(React.Component);

	exports.default = Tips;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Confirm = function (_React$Component) {
		(0, _inherits3.default)(Confirm, _React$Component);

		function Confirm(props) {
			(0, _classCallCheck3.default)(this, Confirm);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Confirm.__proto__ || (0, _getPrototypeOf2.default)(Confirm)).call(this, props));

			_this.opts = { title: '标题', content: '内容' };

			_.assign(_this.opts, _this.props);
			return _this;
		}

		(0, _createClass3.default)(Confirm, [{
			key: 'render',
			value: function render() {
				var _props$opts = this.props.opts;
				var title = _props$opts.title;
				var content = _props$opts.content;
				var onConfirm = _props$opts.onConfirm;
				var onCancel = _props$opts.onCancel;

				return React.createElement(
					'div',
					{ className: 'confirm_wrap' },
					React.createElement(
						'div',
						{ className: 'confirm_box' },
						React.createElement(
							'div',
							{ className: 'confirm_content' },
							React.createElement(
								'h4',
								null,
								title
							),
							React.createElement(
								'p',
								null,
								content
							)
						),
						React.createElement(
							'div',
							{ className: 'confirm_ope' },
							React.createElement('input', { type: 'button', value: '\u53D6\u6D88', onTouchEnd: onCancel }),
							React.createElement('input', { type: 'button', value: '\u786E\u5B9A', onTouchEnd: onConfirm })
						),
						React.createElement('div', { className: 'confirm_shade' })
					)
				);
			}
		}]);
		return Confirm;
	}(React.Component);

	exports.default = Confirm;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tips = __webpack_require__(117);

	var _tips2 = _interopRequireDefault(_tips);

	var _confirm = __webpack_require__(118);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;

	var Songs = function (_React$Component) {
		(0, _inherits3.default)(Songs, _React$Component);

		function Songs() {
			var _ref;

			var _temp, _this, _ret;

			(0, _classCallCheck3.default)(this, Songs);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Songs.__proto__ || (0, _getPrototypeOf2.default)(Songs)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
				list: []
			}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
		}

		(0, _createClass3.default)(Songs, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				document.title = '我的歌单';
				this.myScroll = new _iscrollProbe2.default('#wrapper');
				_ajax2.default.getCustomAlbums(function (data) {
					_this2.setState({ list: data });
					_this2.refreshScroll();
				});
			}

			/* 当滚动内容区域尺寸变化后需要重新计算 */

		}, {
			key: 'refreshScroll',
			value: function refreshScroll() {
				var _this3 = this;

				setTimeout(function () {
					_this3.myScroll.refresh();
				}, 0);
			}

			/* 点击歌单列表 */

		}, {
			key: 'onTouchItem',
			value: function onTouchItem(item) {
				location.hash = '#/albums/songs/' + item.album_id + '/' + encodeURIComponent(item.title) + '/' + encodeURIComponent(item.cover_url_small);
			}
		}, {
			key: 'render',
			value: function render() {
				var list = this.state.list;


				var count = 0;
				list && list.forEach(function (item) {
					count += item.tracks_count || 0;
				});
				return React.createElement(
					'div',
					{ className: 'page play_list' },
					React.createElement(
						'header',
						{ className: 'header' },
						React.createElement(
							'span',
							null,
							'\u5171',
							count,
							'\u9996\u6B4C'
						),
						React.createElement(
							Link,
							{ to: 'albums/build/0/0', className: 'add' },
							React.createElement(
								'i',
								null,
								'+'
							),
							'\u6DFB\u52A0'
						)
					),
					React.createElement(
						'section',
						{ className: 'wrapper', id: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'scroller' },
							React.createElement(FileList, { list: this.state.list, touchCallback: this.onTouchItem.bind(this) })
						)
					)
				);
			}
		}]);
		return Songs;
	}(React.Component);

	exports.default = Songs;

	var FileList = function (_React$Component2) {
		(0, _inherits3.default)(FileList, _React$Component2);

		function FileList() {
			(0, _classCallCheck3.default)(this, FileList);
			return (0, _possibleConstructorReturn3.default)(this, (FileList.__proto__ || (0, _getPrototypeOf2.default)(FileList)).apply(this, arguments));
		}

		(0, _createClass3.default)(FileList, [{
			key: 'render',
			value: function render() {
				var _this5 = this;

				var list = this.props.list.map(function (item, i) {
					return React.createElement(Item, { key: i, info: item, touchCallback: _this5.props.touchCallback });
				});

				return React.createElement(
					'ul',
					{ className: 'file_list' },
					list
				);
			}
		}]);
		return FileList;
	}(React.Component);

	var Item = function (_React$Component3) {
		(0, _inherits3.default)(Item, _React$Component3);

		function Item() {
			(0, _classCallCheck3.default)(this, Item);
			return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).apply(this, arguments));
		}

		(0, _createClass3.default)(Item, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var info = _props.info;
				var touchCallback = _props.touchCallback;


				return React.createElement(
					'li',
					{ onTouchTap: touchCallback.bind(null, info) },
					React.createElement(
						'div',
						{ className: 'img' },
						React.createElement('img', { src: info.cover_url_small })
					),
					React.createElement(
						'div',
						{ className: 'base_info' },
						React.createElement(
							'div',
							{ className: 'title' },
							info.title
						),
						React.createElement(
							'div',
							{ className: 'num' },
							info.tracks_count,
							'\u9996'
						)
					),
					React.createElement(
						'div',
						{ className: 'oper_icon' },
						React.createElement('i', null)
					)
				);
			}
		}]);
		return Item;
	}(React.Component);

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(121);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _baseModule = __webpack_require__(125);

	var _baseModule2 = _interopRequireDefault(_baseModule);

	var _songList = __webpack_require__(128);

	var _songList2 = _interopRequireDefault(_songList);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _sington = __webpack_require__(115);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AlbumSongs = function (_BaseModule) {
		(0, _inherits3.default)(AlbumSongs, _BaseModule);

		function AlbumSongs(props) {
			(0, _classCallCheck3.default)(this, AlbumSongs);

			var _this = (0, _possibleConstructorReturn3.default)(this, (AlbumSongs.__proto__ || (0, _getPrototypeOf2.default)(AlbumSongs)).call(this, props));

			_loadsh2.default.extend(_this.state, {});
			_this.state.toolbar.events = _this.toolEvent();
			return _this;
		}

		(0, _createClass3.default)(AlbumSongs, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				document.title = this.props.params.name;

				if (document.getElementById('wrapper')) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });

				this.getData();
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (document.getElementById('wrapper') && !this.scroll) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });
			}
		}, {
			key: 'getData',
			value: function getData() {
				var _this2 = this;

				var obj = {
					albumsCustomId: this.props.params.id,
					paged: false
				};

				_ajax2.default.getMusicsFromCustomAlbum(obj, function (data) {
					_this2.loaded = true;
					var arr = data.map(function (s) {
						return {
							mid: s.music_id,
							name: s.name,
							uri: s.uri,
							msi: s.image_url_small,
							mmi: s.image_url_middle,
							artist: s.artist,
							sourceType: s.sourceType
						};
					});

					_this2.state.songs.list = arr;
					_this2.setState({});
					_this2.refreshScroll();
				});
			}
		}, {
			key: 'moreOpea',
			value: function moreOpea(item) {
				var self = this;
				this.state.toolType = 'all';
				this.state.toolbar.tools = [{ name: 'toAlbum' }, { name: 'collect', hasCollect: _sington.Collects.has(item) }, { name: 'edit', fun: function fun() {
						self.onEditAlbum();
					}
				}, { name: 'delete', fun: function fun() {
						self.onDeleteAlbum();
					}
				}];
				this.state.showDim = true;
				this.state.toolbar.show = true;
				this.setState({});
			}
		}, {
			key: 'toolEvent',
			value: function toolEvent() {
				var self = this,
				    events = (0, _get3.default)(AlbumSongs.prototype.__proto__ || (0, _getPrototypeOf2.default)(AlbumSongs.prototype), 'toolEvent', this).call(this);

				/* 重写删除歌曲事件 */
				var supDelete = events.delete;
				events.delete = function () {
					supDelete(function (items) {
						var musicList = [];

						items.forEach(function (item) {
							musicList.push({
								albumsCustomId: self.props.params.id,
								musicId: item.mid,
								sourceType: item.sourceType
							});
						});

						self.setState({ confirm: { show: false } });
						self.reset();

						// 删除歌曲
						_ajax2.default.deleteMusicFromCustomAlbum({ musicList: musicList }, function (res) {
							if (res.code != 0) return;

							// 删除ui列表中的歌曲
							var list = self.state.songs.list;
							items.forEach(function (item) {
								for (var i = 0; i < list.length; i++) {
									if (item.mid == list[i].mid && item.sourceType == list[i].sourceType) {
										list.splice(i, 1);
										break;
									}
								}
							});

							self.refs.tips.showMsg('删除成功');
							self.setState({});
						});
					});
				};

				return events;
			}
		}, {
			key: 'onEditAlbum',
			value: function onEditAlbum() {
				var _props$params = this.props.params;
				var id = _props$params.id;
				var name = _props$params.name;

				location.hash = '#/albums/build/' + id + '/' + encodeURIComponent(name);
			}
		}, {
			key: 'onDeleteAlbum',
			value: function onDeleteAlbum() {
				var self = this;
				this.setState({ confirm: {
						show: true,
						content: '确定删除该歌单吗？',
						onCancel: function onCancel() {
							self.setState({ confirm: { show: false } });
						},
						onConfirm: function onConfirm() {
							_ajax2.default.deleteCustomAlbum({ albumsCustomId: self.props.params.id }, function (res) {
								if (res.code != 0) return self.refs.tips.showMsg('删除失败');

								location.hash = '#/albums/index';
							});
						}
					} });
			}
		}, {
			key: 'render',
			value: function render() {
				var _props$params2 = this.props.params;
				var name = _props$params2.name;
				var id = _props$params2.id;
				var img = _props$params2.img;

				var className;
				if (this.state.status == 'multi' && this.state.toolbar.show) {
					className = 'scro_bottom2';
				} else {
					className = 'scro_bottom1';
				}

				var multiBar = this.getMulitBar();
				var doms = this.getDoms();

				if (!this.loaded) {
					// 未获取数据前的界面展示
					return React.createElement(
						'div',
						{ className: 'loading' },
						'\u6B63\u5728\u52A0\u8F7D...'
					);
				};

				return React.createElement(
					'div',
					{ className: 'page page_detail' },
					React.createElement(
						'header',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'palylist_info' },
							React.createElement(
								'div',
								{ className: 'img_wrap' },
								React.createElement('img', { src: img })
							),
							React.createElement(
								'div',
								{ className: 'base_info' },
								React.createElement(
									'div',
									{ className: 'name' },
									name
								),
								React.createElement(
									'div',
									{ className: 'num' },
									React.createElement('i', null),
									React.createElement(
										'span',
										null,
										this.state.songs.list.length,
										'\u9996'
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'more', onTouchTap: this.moreOpea.bind(this) },
								React.createElement(
									'span',
									null,
									React.createElement('i', null)
								)
							)
						),
						multiBar
					),
					React.createElement(
						'section',
						{ className: 'wrapper', id: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'scroller ' + className },
							React.createElement(_songList2.default, { ref: 'songList', opts: this.state.songs, status: this.state.status })
						)
					),
					doms,
					this.loaded && !this.state.songs.list.length && React.createElement(
						'div',
						{ className: 'empty_detail' },
						React.createElement('img', { src: '../static/imgs/pic-53@2x.png' }),
						React.createElement('br', null),
						React.createElement(
							'span',
							null,
							'\u8FD9\u4E2A\u6B4C\u5355\u6CA1\u6709\u6B4C\u66F2'
						),
						React.createElement(
							'div',
							{ className: 'btn_wrap' },
							React.createElement(
								'span',
								{ onTouchTap: this.onEditAlbum.bind(this) },
								'\u7F16\u8F91\u6B4C\u5355'
							),
							React.createElement(
								'span',
								{ onTouchTap: this.onDeleteAlbum.bind(this) },
								'\u5220\u9664'
							)
						)
					)
				);
			}
		}]);
		return AlbumSongs;
	}(_baseModule2.default);

	exports.default = AlbumSongs;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _getOwnPropertyDescriptor = __webpack_require__(122);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

	  if (desc === undefined) {
	    var parent = (0, _getPrototypeOf2.default)(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(123), __esModule: true };

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(124);
	var $Object = __webpack_require__(18).Object;
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(52)
	  , $getOwnPropertyDescriptor = __webpack_require__(79).f;

	__webpack_require__(16)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _action = __webpack_require__(92);

	var _toolbar = __webpack_require__(126);

	var _toolbar2 = _interopRequireDefault(_toolbar);

	var _tips = __webpack_require__(117);

	var _tips2 = _interopRequireDefault(_tips);

	var _confirm = __webpack_require__(118);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _albumsPop = __webpack_require__(127);

	var _albumsPop2 = _interopRequireDefault(_albumsPop);

	var _sington = __webpack_require__(115);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BaseModule = function (_React$Component) {
		(0, _inherits3.default)(BaseModule, _React$Component);

		function BaseModule(props) {
			(0, _classCallCheck3.default)(this, BaseModule);

			var _this = (0, _possibleConstructorReturn3.default)(this, (BaseModule.__proto__ || (0, _getPrototypeOf2.default)(BaseModule)).call(this, props));

			_this.scroll = null;
			_this.pageSize = 128;
			_this.selects = null;
			_this.state = {
				status: 'single', // 单选、多选
				confirm: { // 确认框
					show: false,
					content: ''
				},
				songs: {
					list: [], // 歌曲列表
					showToolbar: _this.showToolbar.bind(_this),
					playSong: _this.playSong.bind(_this),
					type: 'default'
				},
				showDim: false, // 是否显示阴影遮罩

				bSelectAll: false, // 是否全选
				toolbar: {},
				albumsPop: {}
			};
			return _this;
		}

		/* 当滚动内容区域尺寸变化后需要重新计算 */


		(0, _createClass3.default)(BaseModule, [{
			key: 'refreshScroll',
			value: function refreshScroll() {
				var _this2 = this;

				if (this.scroll) {
					setTimeout(function () {
						_this2.scroll.refresh();
					}, 0);
				}
			}

			/* 判断是否空对象 */

		}, {
			key: 'isEmptyObject',
			value: function isEmptyObject(o) {
				for (var k in o) {
					return !1;
				}return !0;
			}

			/* 重置所有状态 */

		}, {
			key: 'reset',
			value: function reset() {
				var albumsPop = this.state.albumsPop;

				this.state.showDim = false;
				if (!this.isEmptyObject(albumsPop)) albumsPop.show = false;
				this.cancelMulti();
				this.setState({});
			}

			// 取消多选

		}, {
			key: 'cancelMulti',
			value: function cancelMulti() {
				this.state.status = 'single';
				this.state.toolbar.show = false;

				this.refreshScroll();
			}

			/* 获取选中的列表项 */

		}, {
			key: 'getSelectes',
			value: function getSelectes() {
				if (this.state.toolType == 'all') return this.state.songs.list;

				if (this.state.status == 'single') return [this.selects];

				return this.refs.songList.getSelectedItems();
			}
		}, {
			key: 'setMulitTools',
			value: function setMulitTools() {
				this.state.toolType = 'mulit';
				this.state.toolbar.tools = [{ name: 'toNext', text: '添加到播放' }, { name: 'toAlbum' }, { name: 'collect' }, { name: 'delete' }];
			}
		}, {
			key: 'setSimpleTools',
			value: function setSimpleTools(item) {
				this.state.toolType = 'single';
				this.state.toolbar.tools = [{ name: 'toNext' }, { name: 'toAlbum' }, { name: 'collect', hasCollect: _sington.Collects.has(item) }, { name: 'delete' }];
			}
		}, {
			key: 'toolEvent',
			value: function toolEvent() {
				var self = this;

				return {
					/* 下一首播放 */
					toNext: function toNext() {
						var items = self.getSelectes();
						self.refs.tips.showMsg('已加入下一首播放');
						_action.Actions.addToNext(items);
						self.reset();
					},


					/* 加到歌单 */
					toAlbum: function toAlbum() {
						var items = self.getSelectes();
						self.state.showDim = true;
						self.setState({
							albumsPop: {
								musics: items,
								show: true,
								callBack: function callBack(res) {
									if (res.code != 0) return self.refs.tips.showMsg('添加失败');
									self.refs.tips.showMsg('添加成功');
									self.state.albumsPop.show = false;
									self.reset();
								}
							}
						});
					},


					/* 收藏歌曲 */
					collect: function collect() {
						var items = self.getSelectes(),
						    musicList = [];

						items.forEach(function (item) {
							musicList.push({
								musicId: item.mid,
								sourceType: item.sourceType
							});
						});

						if (self.state.toolType == 'single' && _sington.Collects.has(items[0])) {
							_ajax2.default.deleteMusicFromCustomAlbum({ musicList: musicList }, function (res) {
								if (res.code == 0) {
									_sington.Collects.remove(items);
									self.refs.tips.showMsg('取消收藏');
								}
							});
						} else {
							_ajax2.default.addMusicsToCustomAlbum({ musicList: musicList }, function (res) {
								if (res.code == 0) {
									_sington.Collects.add(items);
									self.refs.tips.showMsg('收藏成功');
								}
							});
						}

						self.reset();
					},


					/* 确定要删除吗？*/
					delete: function _delete(confirm, cancel) {
						var items = self.getSelectes();
						self.setState({ confirm: {
								show: true,
								content: '确定要删除吗？',
								onCancel: function onCancel() {
									self.setState({ confirm: { show: false } });
									cancel();
								},
								onConfirm: function onConfirm() {
									confirm(items);
								}
							} });
					}
				};
			}

			/* 点击歌曲事件 */

		}, {
			key: 'showToolbar',
			value: function showToolbar(item) {
				this.selects = item;
				this.state.showDim = true;
				this.state.toolbar.show = true;
				this.setSimpleTools(item);
				this.setState({});
			}

			/* 点击多选事件 */

		}, {
			key: 'onMultiSelect',
			value: function onMultiSelect() {
				this.setMulitTools();
				this.state.status = 'multi';
				this.state.toolbar.show = true;

				this.onSelectAll(false);

				this.refreshScroll();
				this.setState({});
			}

			/* 取消多选事件 */

		}, {
			key: 'onCancelMulti',
			value: function onCancelMulti() {
				this.cancelMulti();
				this.setState({});
			}
		}, {
			key: 'onTouchDim',
			value: function onTouchDim() {
				this.reset();
				this.setState({});
			}
		}, {
			key: 'playSong',
			value: function playSong(item) {
				this.selects = item;
				var list = this.state.songs.list;

				if (list && list.length) {
					_action.Actions.clear();
					_action.Actions.addToNext(list);
					_action.Actions.playNetWorkMusic(item);
				}
			}
		}, {
			key: 'onPlayAll',
			value: function onPlayAll() {
				var list = this.state.songs.list;

				if (list && list.length) {
					_action.Actions.clear();
					_action.Actions.addToNext(list);
					_action.Actions.playNetWorkMusic(list[0]);
				}
			}
		}, {
			key: 'onSelectAll',
			value: function onSelectAll(flag) {
				this.refs.songList.selectAll(flag);
				this.setState({ bSelectAll: flag });
			}
		}, {
			key: 'getMulitBar',
			value: function getMulitBar() {
				var _state = this.state;
				var status = _state.status;
				var bSelectAll = _state.bSelectAll;


				if (status == 'single') {
					return React.createElement(
						'div',
						{ className: 'multi_bar' },
						React.createElement(
							'div',
							{ className: 'left' },
							React.createElement(
								'span',
								{ className: 'ver_mid', onTouchTap: this.onPlayAll.bind(this) },
								React.createElement('i', null),
								React.createElement(
									'span',
									null,
									'\u64AD\u653E\u5168\u90E8\u6B4C\u66F2'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'right' },
							React.createElement(
								'span',
								{ className: 'ver_mid', onTouchEnd: this.onMultiSelect.bind(this) },
								React.createElement('i', null),
								React.createElement(
									'span',
									null,
									'\u591A\u9009'
								)
							)
						)
					);
				} else {
					return React.createElement(
						'div',
						{ className: 'multi_bar' },
						React.createElement(
							'div',
							{ className: 'left' },
							React.createElement(
								'span',
								{ onTouchTap: this.onSelectAll.bind(this, !bSelectAll) },
								React.createElement('i', { className: 'multi_select ' + (bSelectAll ? 'checked' : 'unchecked') }),
								React.createElement(
									'span',
									null,
									'\u591A\u9009'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'right' },
							React.createElement(
								'span',
								{ className: 'ver_mid', onTouchEnd: this.onCancelMulti.bind(this) },
								React.createElement(
									'span',
									null,
									'\u53D6\u6D88'
								)
							)
						)
					);
				}
			}
		}, {
			key: 'getDoms',
			value: function getDoms() {
				var _state2 = this.state;
				var albumsPop = _state2.albumsPop;
				var toolbar = _state2.toolbar;

				return [React.createElement('div', { key: '1', onTouchEnd: this.onTouchDim.bind(this), className: 'dim ' + (this.state.showDim ? 'show' : 'hide') }), toolbar.tools && React.createElement(_toolbar2.default, { key: '2', show: toolbar.show, list: toolbar.tools, events: toolbar.events }), this.state.confirm.show && React.createElement(_confirm2.default, { key: '3', opts: this.state.confirm }), React.createElement(_tips2.default, { key: '4', ref: 'tips', tip: this.state.tip }), !this.isEmptyObject(albumsPop) && React.createElement(_albumsPop2.default, { key: '5', opts: albumsPop, sourceType: '1' })];
			}
		}]);
		return BaseModule;
	}(React.Component);

	exports.default = BaseModule;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Toolbar = function (_React$Component) {
		(0, _inherits3.default)(Toolbar, _React$Component);

		function Toolbar(props) {
			(0, _classCallCheck3.default)(this, Toolbar);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Toolbar.__proto__ || (0, _getPrototypeOf2.default)(Toolbar)).call(this, props));

			_this.opts = [{ icon: '', text: '', fun: null, disable: false }];
			_this.defaults = {
				toNext: { icon: 50, text: '下一首播放' },
				toAlbum: { icon: 49, text: '加到歌单' },
				collect: { icon: 51, text: '收藏' },
				delete: { icon: 52, text: '删除' },
				edit: { icon: 54, text: '编辑' }
			};

			_.assign(_this.opts, _this.props);
			return _this;
		}

		(0, _createClass3.default)(Toolbar, [{
			key: 'componentWillMount',
			value: function componentWillMount() {}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {}
		}, {
			key: 'getVal',
			value: function getVal(k, item) {

				if (item.name == 'collect' && k == 'icon' && item.hasCollect) return 511; // 已收藏

				return item[k] || this.defaults[item.name][k];
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props;
				var show = _props.show;
				var list = _props.list;
				var events = _props.events;
				var arr = [];

				if (list) {
					arr = list.map(function (item, i) {
						var icon = item.icon;
						var text = item.text;
						var fun = item.fun;
						var disable = item.disable;


						var event = fun || events[item.name];

						return React.createElement(
							'li',
							{ key: i, className: disable ? 'disable' : '', onTouchEnd: disable ? null : event },
							React.createElement(
								'div',
								{ className: 'icon_wrap' },
								React.createElement('img', { src: '../static/imgs/actionBar/pic-' + _this2.getVal('icon', item) + '@2x.png' })
							),
							React.createElement(
								'div',
								{ className: 'icon_name' },
								_this2.getVal('text', item)
							)
						);
					});
				}
				return React.createElement(
					'ul',
					{ className: 'action_bar ' + (show ? 'show' : 'hide') },
					arr,
					React.createElement('div', { className: 'bg' })
				);
			}
		}]);
		return Toolbar;
	}(React.Component);

	exports.default = Toolbar;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tips = __webpack_require__(117);

	var _tips2 = _interopRequireDefault(_tips);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
		添加歌曲到专辑的弹出层组件
		props	
			opts:{
				musics: 	要添加的歌曲列表
				show: 		是否显示
				callback: 	添加成功后的回调
			}
	*/
	var AlbumsPop = function (_React$Component) {
		(0, _inherits3.default)(AlbumsPop, _React$Component);

		function AlbumsPop() {
			var _ref;

			var _temp, _this, _ret;

			(0, _classCallCheck3.default)(this, AlbumsPop);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AlbumsPop.__proto__ || (0, _getPrototypeOf2.default)(AlbumsPop)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
				list: [] // 自定义专辑列表
			}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
		}

		(0, _createClass3.default)(AlbumsPop, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				this.myScroll = new _iscrollProbe2.default('#wrapper2');
				_ajax2.default.getCustomAlbums(function (data) {
					_this2.setState({ list: data });
					_this2.refreshScroll();
				});
			}

			/* 当滚动内容区域尺寸变化后需要重新计算 */

		}, {
			key: 'refreshScroll',
			value: function refreshScroll() {
				var _this3 = this;

				setTimeout(function () {
					_this3.myScroll.refresh();
				}, 0);
			}

			/* 点击歌单列表 */

		}, {
			key: 'onTouchItem',
			value: function onTouchItem(albums) {
				var _this4 = this;

				var data = { musicList: [] };
				var _props$opts = this.props.opts;
				var musics = _props$opts.musics;
				var sourceType = _props$opts.sourceType;
				var callBack = _props$opts.callBack;


				musics.forEach(function (item) {
					var obj = {
						albumsCustomId: albums.album_id,
						musicId: item.mid,
						sourceType: item.sourceType || _this4.props.sourceType
					};

					if (sourceType == 3) {
						obj.name = item.name;
						obj.imageUrlSmall = item.imageUrlSmall;
						obj.imageUrlMiddle = item.imageUrlMiddle;
						obj.imageUrlLarge = item.imageUrlLarge;
						obj.totalTime = item.totalTime;
						obj.uri = item.uri;
						obj.playUrl64 = item.playUrl64;
						obj.createTime = item.createTime;
					}

					data.musicList.push(obj);
				});

				_ajax2.default.addMusicsToCustomAlbum(data, function (data) {
					callBack(data);
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this5 = this;

				var _props$opts2 = this.props.opts;
				var musics = _props$opts2.musics;
				var show = _props$opts2.show;


				return React.createElement(
					'div',
					{ className: 'custom_albums ' + (show ? "show" : "hide") },
					musics && musics.length == 1 && React.createElement(
						'header',
						{ className: 'header2' },
						React.createElement(
							'div',
							{ className: 'title' },
							musics[0].name
						),
						React.createElement(
							'div',
							{ className: 'nickname' },
							musics[0].nickname || musics[0].artist
						)
					),
					React.createElement(
						'section',
						{ className: 'wrapper2', id: 'wrapper2' },
						React.createElement(
							'div',
							{ className: 'scroller2' },
							React.createElement(
								'ul',
								{ className: 'file_list' },
								this.state.list.map(function (item, i) {
									return React.createElement(Item, { key: item.album_id, info: item, touchCallback: _this5.onTouchItem.bind(_this5) });
								})
							)
						)
					)
				);
			}
		}]);
		return AlbumsPop;
	}(React.Component);

	exports.default = AlbumsPop;

	var Item = function (_React$Component2) {
		(0, _inherits3.default)(Item, _React$Component2);

		function Item() {
			(0, _classCallCheck3.default)(this, Item);
			return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).apply(this, arguments));
		}

		(0, _createClass3.default)(Item, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var info = _props.info;
				var touchCallback = _props.touchCallback;


				return React.createElement(
					'li',
					{ onTouchTap: touchCallback.bind(null, info) },
					React.createElement(
						'div',
						{ className: 'img' },
						React.createElement('img', { src: info.cover_url_small })
					),
					React.createElement(
						'div',
						{ className: 'base_info' },
						React.createElement(
							'div',
							null,
							info.title
						),
						React.createElement(
							'div',
							{ className: 'num' },
							info.tracks_count,
							'\u9996'
						)
					),
					React.createElement(
						'div',
						{ className: 'oper_icon' },
						React.createElement('i', null)
					)
				);
			}
		}]);
		return Item;
	}(React.Component);

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
		歌曲列表组件

		props:
			opts:
				list 		歌曲列表
				playSong	播放音乐函数
				showToolbar	显示工具栏函数
				mode		样式状态

			status: multi多选模式   single单选模式


		public供外部调用函数
			selectAll：选择或取消选择所有行
			getSelectedItems: 获取所有选择的行
	*/

	var SongList = function (_React$Component) {
		(0, _inherits3.default)(SongList, _React$Component);

		function SongList() {
			(0, _classCallCheck3.default)(this, SongList);
			return (0, _possibleConstructorReturn3.default)(this, (SongList.__proto__ || (0, _getPrototypeOf2.default)(SongList)).apply(this, arguments));
		}

		(0, _createClass3.default)(SongList, [{
			key: 'selectAll',
			value: function selectAll(flag) {
				var list = this.props.opts.list;

				list.forEach(function (item, i) {
					item.selected = flag;
				});
				this.setState({});
			}
		}, {
			key: 'getSelectedItems',
			value: function getSelectedItems() {
				var list = this.props.opts.list;var selecteds = [];
				list.forEach(function (item, i) {
					item.selected && selecteds.push(item);
				});
				return selecteds;
			}

			// 点击列表直接播放音乐

		}, {
			key: 'onTouchItem',
			value: function onTouchItem(item) {
				var playSong = this.props.opts.playSong;
				var status = this.props.status;

				if (status == 'multi') {
					item.selected = !item.selected;
				} else {
					this.sid = item.mid;
					playSong(item);
				}

				this.setState({});
			}

			// 点击更多操作显示工具操作栏

		}, {
			key: 'onTouchOper',
			value: function onTouchOper(item, e) {
				var showToolbar = this.props.opts.showToolbar;


				this.sid = item.mid;
				showToolbar(item);
				e.stopPropagation();
			}

			/* 将秒数转化为 hh:mm:ss 格式 */

		}, {
			key: 'formatSecond',
			value: function formatSecond(a) {
				if (!a || a < 0) return '00:00';

				var hh = parseInt(a / 3600),
				    mm = parseInt(a % 3600 / 60),
				    ss = parseInt(a % 60);

				return (hh > 0 ? this.format(hh) + ":" : '') + this.format(mm) + ":" + this.format(ss);
			}

			/* 个位数时，十位补0 */

		}, {
			key: 'format',
			value: function format(d) {
				return d >= 10 ? d : "0" + d;
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props$opts = this.props.opts;
				var mode = _props$opts.mode;
				var list = _props$opts.list;
				var status = _props$opts.status;
				var status = this.props.status;

				if (!list || !list.length) return React.createElement('div', null);

				var html = list.map(function (item, i) {
					var mid = item.mid;
					var name = item.name;
					var artist = item.artist;
					var playCount = item.playCount;
					var duration = item.duration;
					var selected = item.selected;


					playCount = playCount > 10000 ? (playCount / 10000).toFixed(1) + '万' : playCount;
					duration = _this2.formatSecond(duration);

					// 单选的话根据this.sid重新设置selected项
					if (status !== 'multi') selected = _this2.sid === mid;

					return React.createElement(
						'li',
						{ className: 'item ' + (selected ? 'selected' : ''), key: mid, onTouchTap: _this2.onTouchItem.bind(_this2, item) },
						React.createElement(
							'div',
							{ className: 'selt_icon' },
							React.createElement('i', null)
						),
						React.createElement(
							'div',
							{ className: 'base_info' },
							React.createElement(
								'div',
								{ className: 'name' },
								name || '未知'
							),
							!mode && React.createElement(
								'div',
								{ className: 'singer' },
								artist || '未知'
							),
							mode && React.createElement(
								'div',
								{ className: 'singer' },
								React.createElement('i', { className: 'playnum_icon' }),
								React.createElement(
									'span',
									null,
									playCount || 0
								),
								React.createElement('i', { className: 'num_icon' }),
								React.createElement(
									'span',
									null,
									duration || 0
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'oper_icon', onTouchTap: _this2.onTouchOper.bind(_this2, item) },
							React.createElement('i', null)
						)
					);
				});

				return React.createElement(
					'ul',
					{ className: 'song_list ' + status },
					html
				);
			}
		}]);
		return SongList;
	}(React.Component);

	exports.default = SongList;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(121);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _baseModule = __webpack_require__(125);

	var _baseModule2 = _interopRequireDefault(_baseModule);

	var _songList = __webpack_require__(128);

	var _songList2 = _interopRequireDefault(_songList);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	var _sington = __webpack_require__(115);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Collection = function (_BaseModule) {
		(0, _inherits3.default)(Collection, _BaseModule);

		function Collection(props) {
			(0, _classCallCheck3.default)(this, Collection);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Collection.__proto__ || (0, _getPrototypeOf2.default)(Collection)).call(this, props));

			_loadsh2.default.extend(_this.state, {});
			_this.state.toolbar.events = _this.toolEvent();
			return _this;
		}

		(0, _createClass3.default)(Collection, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				document.title = '我的收藏';

				if (document.getElementById('wrapper')) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });

				this.getData();
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (document.getElementById('wrapper') && !this.scroll) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });
			}
		}, {
			key: 'getData',
			value: function getData() {
				var _this2 = this;

				_ajax2.default.getCollectList({ paged: false }, function (data) {
					_this2.loaded = true;
					var list = [];
					if (data && data.length) {
						data.forEach(function (s) {
							list.push({
								mid: s.music_id,
								name: s.name,
								uri: s.uri,
								msi: s.image_url_small,
								mmi: s.image_url_middle,
								artist: s.artist,
								sourceType: s.sourceType
							});
						});
					}
					_this2.state.songs.list = list;
					_this2.setState({});
					_this2.refreshScroll();
				});
			}
		}, {
			key: 'setMulitTools',
			value: function setMulitTools() {
				this.state.toolType = 'mulit';
				this.state.toolbar.tools = [{ name: 'toNext', text: '添加到播放' }, { name: 'toAlbum' }, { name: 'collect', icon: '64', fun: function fun() {}
				}, { name: 'delete' }];
			}
		}, {
			key: 'setSimpleTools',
			value: function setSimpleTools(item) {
				this.state.toolType = 'single';
				this.state.toolbar.tools = [{ name: 'toNext' }, { name: 'toAlbum' }, { name: 'collect', icon: '64', fun: function fun() {}
				}, { name: 'delete' }];
			}
		}, {
			key: 'toolEvent',
			value: function toolEvent() {
				var self = this,
				    events = (0, _get3.default)(Collection.prototype.__proto__ || (0, _getPrototypeOf2.default)(Collection.prototype), 'toolEvent', this).call(this);

				/* 重写删除歌曲事件 */
				var supDelete = events.delete;
				events.delete = function (items) {
					supDelete(function (items) {
						self.cancelMulti();
						var musicList = [];
						items.forEach(function (item) {
							musicList.push({
								musicId: item.mid,
								sourceType: item.sourceType
							});
						});

						self.setState({ confirm: { show: false } });
						self.reset();

						_ajax2.default.deleteMusicFromCustomAlbum({ musicList: musicList }, function (res) {
							if (res.code != 0) return;

							_sington.Collects.remove(items);

							// 删除ui列表中的歌曲
							var list = self.state.songs.list;
							items.forEach(function (item) {
								for (var i = 0; i < list.length; i++) {
									if (item.mid == list[i].mid && item.sourceType == list[i].sourceType) {
										list.splice(i, 1);
										break;
									}
								}
							});

							self.refs.tips.showMsg('删除成功');
							self.setState({});
						});
					});
				};

				return events;
			}
		}, {
			key: 'render',
			value: function render() {
				var className;
				if (this.state.status == 'multi' && this.state.toolbar.show) {
					className = 'scro_bottom2';
				} else {
					className = 'scro_bottom1';
				}

				var multiBar = this.getMulitBar();
				var doms = this.getDoms();

				if (!this.loaded) {
					// 未获取数据前的界面展示
					return React.createElement(
						'div',
						{ className: 'loading' },
						'\u6B63\u5728\u52A0\u8F7D...'
					);
				};

				return React.createElement(
					'div',
					{ className: 'page page_collection' },
					React.createElement(
						'header',
						{ className: 'header' },
						multiBar
					),
					React.createElement(
						'section',
						{ className: 'wrapper', id: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'scroller ' + className },
							React.createElement(_songList2.default, { ref: 'songList', opts: this.state.songs, status: this.state.status })
						)
					),
					doms
				);
			}
		}]);
		return Collection;
	}(_baseModule2.default);

	exports.default = Collection;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tips = __webpack_require__(117);

	var _tips2 = _interopRequireDefault(_tips);

	var _confirm = __webpack_require__(118);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _toolbar = __webpack_require__(126);

	var _toolbar2 = _interopRequireDefault(_toolbar);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	var _localStore = __webpack_require__(104);

	var _action = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Internal = function (_React$Component) {
		(0, _inherits3.default)(Internal, _React$Component);

		function Internal() {
			var _ref;

			var _temp, _this, _ret;

			(0, _classCallCheck3.default)(this, Internal);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Internal.__proto__ || (0, _getPrototypeOf2.default)(Internal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
				currId: 0,
				list: [],
				panels: []
			}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
		}

		(0, _createClass3.default)(Internal, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				document.title = '设备内音乐';
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				if (document.getElementById('wrapper')) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });

				_ajax2.default.getRoomeMusicList({}, function (res) {
					_this2.loaded = true;
					if (res.code != 0) return;
					var currId = _localStore.Panel.getId('internal') || res.data[0].subCategoryId;
					_this2.setState({ panels: res.data, currId: currId });
					_this2.refreshScroll();
				});
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (document.getElementById('wrapper') && !this.scroll) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				clearInterval(this.timer);
			}

			/* 当滚动内容区域尺寸变化后需要重新计算 */

		}, {
			key: 'refreshScroll',
			value: function refreshScroll() {
				var _this3 = this;

				setTimeout(function () {
					_this3.scroll.refresh();
				}, 0);
			}

			/* 点击歌曲事件 */

		}, {
			key: 'onTouchItem',
			value: function onTouchItem(item) {
				this.selects = item.id;
				_action.Actions.playInternalMusic(item);
			}
		}, {
			key: 'selectPanel',
			value: function selectPanel(pid) {
				_localStore.Panel.setId('internal', pid);
				this.setState({ currId: pid });
				this.refreshScroll();
			}
		}, {
			key: 'render',
			value: function render() {
				var _this4 = this;

				var list = [];

				if (!this.loaded) {
					// 未获取数据前的界面展示
					return React.createElement(
						'div',
						{ className: 'loading' },
						'\u6B63\u5728\u52A0\u8F7D...'
					);
				};

				return React.createElement(
					'div',
					{ className: 'page page_internal' },
					React.createElement(
						'header',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'panel' },
							this.state.panels.map(function (item, i) {
								var pid = item.subCategoryId;
								if (_this4.state.currId == pid) list = item.roomeMusicList;
								return React.createElement(
									'span',
									{ key: pid, onTouchTap: _this4.selectPanel.bind(_this4, pid), className: _this4.state.currId == pid ? 'selected' : '' },
									item.desc
								);
							})
						)
					),
					React.createElement(
						'section',
						{ className: 'wrapper', id: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'scroller ' },
							React.createElement(
								'ul',
								{ className: 'list' },
								list.map(function (item, i) {
									return React.createElement(
										'li',
										{ key: item.id, onTouchTap: _this4.onTouchItem.bind(_this4, item), className: item.id == _this4.selects ? 'selected' : '' },
										React.createElement(
											'span',
											null,
											item.name
										)
									);
								})
							)
						)
					),
					React.createElement(_tips2.default, { ref: 'tips', tip: this.state.tip })
				);
			}
		}]);
		return Internal;
	}(React.Component);

	exports.default = Internal;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _baseModule = __webpack_require__(125);

	var _baseModule2 = _interopRequireDefault(_baseModule);

	var _songList = __webpack_require__(128);

	var _songList2 = _interopRequireDefault(_songList);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _localStore = __webpack_require__(104);

	var _sington = __webpack_require__(115);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LocalStation = function (_BaseModule) {
		(0, _inherits3.default)(LocalStation, _BaseModule);

		function LocalStation(props) {
			(0, _classCallCheck3.default)(this, LocalStation);

			var _this = (0, _possibleConstructorReturn3.default)(this, (LocalStation.__proto__ || (0, _getPrototypeOf2.default)(LocalStation)).call(this, props));

			_loadsh2.default.extend(_this.state, { panels: [] });
			_this.state.toolbar.events = _this.toolEvent();
			return _this;
		}

		(0, _createClass3.default)(LocalStation, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				document.title = '本地电台';

				if (document.getElementById('wrapper')) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });

				this.getData();
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (document.getElementById('wrapper') && !this.scroll) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });
			}
		}, {
			key: 'getData',
			value: function getData() {
				var _this2 = this;

				_ajax2.default.getLocalRadio({ paged: false }, function (data) {
					_this2.loaded = true;
					var currId = _localStore.Panel.getId('localStation') || data[0].subCategoryId;
					_this2.setState({ panels: data, currId: currId });
					_this2.refreshScroll();
				});
			}
		}, {
			key: 'selectPanel',
			value: function selectPanel(pid) {
				_localStore.Panel.setId('localStation', pid);
				this.setState({ currId: pid });
				this.refreshScroll();
			}
		}, {
			key: 'setSimpleTools',
			value: function setSimpleTools(item) {
				this.state.toolbar.tools = [{ name: 'toNext' }, { name: 'toAlbum' }, { name: 'collect', hasCollect: _sington.Collects.has(item) }];
			}
		}, {
			key: 'onTouchItem',
			value: function onTouchItem(item) {
				this.playSong(item);
			}
		}, {
			key: 'onTouchOper',
			value: function onTouchOper(item, e) {
				this.showToolbar(item);
				e.stopPropagation();
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var list = [];
				var doms = this.getDoms();
				var arr = {
					music: '音乐',
					education: '教育',
					news: '新闻',
					sports: '运动'
				};
				return React.createElement(
					'div',
					{ className: 'page page_internal page_ls' },
					React.createElement(
						'header',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'panel' },
							this.state.panels.map(function (item, i) {
								var pid = item.subCategoryId;
								if (_this3.state.currId == pid) {
									_this3.state.songs.list = item.radiosList.map(function (item) {
										return {
											mid: item.music_id,
											name: item.name,
											artist: item.artist,
											uri: item.uri,
											sourceType: 2
										};
									});
								}
								return React.createElement(
									'span',
									{ key: pid, onTouchTap: _this3.selectPanel.bind(_this3, pid), className: _this3.state.currId == pid ? 'selected' : '' },
									arr[item.categroy]
								);
							})
						)
					),
					React.createElement(
						'section',
						{ className: 'wrapper', id: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'scroller ' },
							React.createElement(
								'ul',
								{ className: 'list' },
								this.state.songs.list.map(function (item, i) {
									return React.createElement(
										'li',
										{ key: item.mid, onTouchTap: _this3.onTouchItem.bind(_this3, item) },
										React.createElement(
											'span',
											null,
											item.name
										),
										React.createElement(
											'div',
											{ className: 'oper_icon', onTouchTap: _this3.onTouchOper.bind(_this3, item) },
											React.createElement('i', null)
										)
									);
								})
							)
						)
					),
					doms
				);
			}
		}]);
		return LocalStation;
	}(_baseModule2.default);

	exports.default = LocalStation;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _stringify = __webpack_require__(99);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tips = __webpack_require__(117);

	var _tips2 = _interopRequireDefault(_tips);

	var _confirm = __webpack_require__(118);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	var _localStore = __webpack_require__(104);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Network = function (_React$Component) {
		(0, _inherits3.default)(Network, _React$Component);

		function Network() {
			var _ref;

			var _temp, _this, _ret;

			(0, _classCallCheck3.default)(this, Network);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Network.__proto__ || (0, _getPrototypeOf2.default)(Network)).call.apply(_ref, [this].concat(args))), _this), _this.panels = [{ id: '1', text: '推荐' }, { id: '2', text: '分类' }, { id: '3', text: '主播' }], _this.state = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
		}

		(0, _createClass3.default)(Network, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				document.title = '喜马拉雅';
				this.myScroll = new _iscrollProbe2.default('#wrapper', { mouseWheel: true });
				var currPanelId = _localStore.Panel.getId('network') || 1;
				this.getData(currPanelId);
			}

			/* 当滚动内容区域尺寸变化后需要重新计算 */

		}, {
			key: 'refreshScroll',
			value: function refreshScroll() {
				var _this2 = this;

				setTimeout(function () {
					_this2.myScroll.refresh();
				}, 0);
			}
		}, {
			key: 'getData',
			value: function getData(id) {
				var _this3 = this;

				_localStore.Panel.setId('network', id);
				if (id == 1) {
					_ajax2.default.getRecommAlbums(function (data) {
						_this3.setState({ currPanelId: id, recommend: data });
						_this3.refreshScroll();
					});
				} else if (id == 2) {
					_ajax2.default.getXmlyCategoryList({}, function (data) {
						var arr = [{ id: 99, kind: 'category', cover_url_small: '../static/imgs/pic-76@2x.png', category_name: '助眠' }];
						arr = arr.concat(data);
						_this3.setState({ currPanelId: id, category: arr });
						_this3.refreshScroll();
					});
				} else if (id == 3) {
					_ajax2.default.getXmlyAnnoCateList({}, function (data) {
						_this3.setState({ currPanelId: id, category: data });
						_this3.refreshScroll();
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this4 = this;

				var currPanelId = this.state.currPanelId;


				return React.createElement(
					'div',
					{ className: 'page page_network' },
					React.createElement(
						'header',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'panel' },
							this.panels.map(function (item, i) {
								return React.createElement(
									'span',
									{ key: item.id, onTouchTap: _this4.getData.bind(_this4, item.id), className: _this4.state.currPanelId == item.id ? 'selected' : '' },
									item.text
								);
							})
						)
					),
					React.createElement(
						'section',
						{ className: 'wrapper', id: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'scroller ' },
							function (self) {
								if (currPanelId == 1) {
									return self.state.recommend.map(function (item, i) {
										return React.createElement(Item, { key: i, opts: item });
									});
								} else {
									return React.createElement(Item2, { list: self.state.category, type: currPanelId });
								}
							}(this)
						)
					)
				);
			}
		}]);
		return Network;
	}(React.Component);

	exports.default = Network;

	var Item = function (_React$Component2) {
		(0, _inherits3.default)(Item, _React$Component2);

		function Item() {
			(0, _classCallCheck3.default)(this, Item);
			return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).apply(this, arguments));
		}

		(0, _createClass3.default)(Item, [{
			key: 'link',
			value: function link(baseInfo) {
				location.hash = '#/network/albums/' + encodeURIComponent((0, _stringify2.default)(baseInfo));
			}
		}, {
			key: 'moreLink',
			value: function moreLink(type, recomId, title) {
				if (type == 1) {
					_localStore.Panel.setId('tags');
					location.hash = '#/network/tags/' + recomId + '/' + encodeURIComponent(title);
				} else if (type == 2) {
					location.hash = '#/network/anchors/' + recomId + '/' + encodeURIComponent(title);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this6 = this;

				var _props$opts = this.props.opts;
				var type = _props$opts.type;
				var name = _props$opts.name;
				var recomId = _props$opts.recomId;
				var albumsList = _props$opts.albumsList;

				return React.createElement(
					'div',
					{ className: 'nw_box' },
					React.createElement(
						'div',
						{ className: 'header' },
						React.createElement(
							'span',
							null,
							name
						),
						React.createElement(
							'span',
							{ className: 'more', onTouchTap: this.moreLink.bind(this, type, recomId, name) },
							'\u66F4\u591A>'
						)
					),
					React.createElement(
						'ul',
						{ className: '' },
						albumsList && albumsList.map(function (item, i) {
							var baseInfo = {
								id: item.id,
								title: item.title,
								playsCount: item.playsCount,
								img: item.coverUrlMiddle,
								intro: item.intro,
								artist: item.nickname
							};
							return React.createElement(
								'li',
								{ className: 'item', key: item.id },
								React.createElement(
									'div',
									{ onTouchTap: _this6.link.bind(_this6, baseInfo) },
									React.createElement('img', { src: item.coverUrlSmall }),
									React.createElement('br', null),
									React.createElement(
										'span',
										null,
										item.title
									)
								)
							);
						})
					)
				);
			}
		}]);
		return Item;
	}(React.Component);

	var Item2 = function (_React$Component3) {
		(0, _inherits3.default)(Item2, _React$Component3);

		function Item2() {
			(0, _classCallCheck3.default)(this, Item2);
			return (0, _possibleConstructorReturn3.default)(this, (Item2.__proto__ || (0, _getPrototypeOf2.default)(Item2)).apply(this, arguments));
		}

		(0, _createClass3.default)(Item2, [{
			key: 'link',
			value: function link(id, name, type) {
				if (type == 2) {
					// 分类
					_localStore.Panel.setId('tags');
					location.hash = '#/network/tags/' + id + '/' + encodeURIComponent(name);
				} else if (type == 3) {
					// 主播
					location.hash = '#/network/anchors/' + id + '/' + encodeURIComponent(name);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this8 = this;

				var _props = this.props;
				var list = _props.list;
				var type = _props.type;var html = [];var arr = [];

				list && list.forEach(function (item, i) {
					var name = item[item.kind + '_name'];
					i % 2 == 0 && (arr = []);
					arr.push(React.createElement(
						'li',
						{ onTouchTap: _this8.link.bind(_this8, item.id, name, type), key: item.id },
						type == 2 && React.createElement('img', { src: item.cover_url_small }),
						name
					));

					if (i % 2 == 0) {
						if (i == list.length - 1) html.push(React.createElement(
							'ul',
							null,
							arr
						));
					} else {
						html.push(React.createElement(
							'ul',
							null,
							arr
						));
					}
				});

				return React.createElement(
					'div',
					{ className: 'category ' + (type == 3 ? 'text_center' : '') },
					html
				);
			}
		}]);
		return Item2;
	}(React.Component);

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tips = __webpack_require__(117);

	var _tips2 = _interopRequireDefault(_tips);

	var _confirm = __webpack_require__(118);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _albumsPop = __webpack_require__(127);

	var _albumsPop2 = _interopRequireDefault(_albumsPop);

	var _action = __webpack_require__(92);

	var _store = __webpack_require__(97);

	var _sington = __webpack_require__(115);

	var _const = __webpack_require__(93);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _Slider = __webpack_require__(134);

	var _baseModule = __webpack_require__(125);

	var _baseModule2 = _interopRequireDefault(_baseModule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Player = function (_BaseModule) {
		(0, _inherits3.default)(Player, _BaseModule);

		function Player(props) {
			(0, _classCallCheck3.default)(this, Player);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Player.__proto__ || (0, _getPrototypeOf2.default)(Player)).call(this, props));

			_loadsh2.default.extend(_this.state, {});
			return _this;
		}

		(0, _createClass3.default)(Player, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				document.title = this.props.currInfo.name || '歌曲';
				this.timer = setInterval(function () {
					_this2.setState({});
				}, 1000);
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (document.title != this.props.currInfo.name) document.title = this.props.currInfo.name || '歌曲';
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				clearInterval(this.timer);
			}

			/* 加到歌单 */

		}, {
			key: 'addToList',
			value: function addToList(items) {
				if (this.props.playSource == _const.PlaySource.INTERNAL) {
					this.refs.tips.showMsg('设备内音乐无法添加');
					return;
				}
				if (!items) return;

				var self = this;
				items = [].concat(items);
				this.state.showDim = true;
				this.setState({
					albumsPop: {
						musics: items,
						show: true,
						callBack: function callBack(res) {
							if (res.code != 0) return self.refs.tips.showMsg('添加失败');
							self.refs.tips.showMsg('添加成功');
							self.state.albumsPop.show = false;
							self.reset();
						}
					}
				});
			}

			/* 收藏歌曲 */

		}, {
			key: 'collect',
			value: function collect(item) {
				var _this3 = this;

				if (this.props.playSource == _const.PlaySource.INTERNAL) {
					this.refs.tips.showMsg('设备内音乐无法收藏');
					return;
				}

				if (!item) return;

				var musicList = [{
					musicId: item.mid,
					sourceType: item.sourceType
				}];

				if (_sington.Collects.has(item)) {
					_ajax2.default.deleteMusicFromCustomAlbum({ musicList: musicList }, function (res) {
						if (res.code == 0) {
							_sington.Collects.remove(item);
							_this3.setState({});
						}
					});
				} else {
					_ajax2.default.addMusicsToCustomAlbum({ musicList: musicList }, function (res) {
						if (res.code == 0) {
							_sington.Collects.add(item);
							_this3.setState({});
						}
					});
				}
			}
		}, {
			key: 'showList',
			value: function showList() {
				this.props.showPlayList();
			}
		}, {
			key: 'playOrPause',
			value: function playOrPause(playing) {
				_action.Actions.playOrPause(playing);
				this.setState({});
			}
		}, {
			key: 'prev',
			value: function prev() {
				_action.Actions.prev();
			}
		}, {
			key: 'next',
			value: function next() {
				_action.Actions.next();
			}
		}, {
			key: 'setCurrentTime',
			value: function setCurrentTime(value) {
				_store.audio.currentTime = value;
			}
		}, {
			key: 'render',
			value: function render() {
				var item = this.props.currInfo;
				var name = item.name;
				var mmi = item.mmi;
				var artist = item.artist;

				var playing = this.props.playStatus == _const.PlayStatus.PLAY;

				var bgStyle = {
					backgroundImage: 'url(' + (mmi || '../static/imgs/pic-75音乐默认背景@2x.jpg') + ')',
					backgroundSize: '100% 100%'
				};

				var duration = !_store.audio.duration || _store.audio.duration == Infinity ? 0 : _store.audio.duration;
				if (this.props.playSource == _const.PlaySource.INTERNAL) {
					duration = 0;
					_store.audio.currentTime = 0;
				}

				var doms = this.getDoms();
				return React.createElement(
					'div',
					{ className: 'page page_player', style: bgStyle },
					React.createElement('div', { className: 'masking' }),
					React.createElement(
						'div',
						{ className: 'content' },
						React.createElement(
							'div',
							{ className: 'song_info' },
							React.createElement(
								'div',
								{ className: 'singer' },
								artist
							),
							React.createElement(
								'div',
								{ className: 'head_img' },
								React.createElement('img', { className: playing ? 'music_img' : '', src: mmi || '../static/imgs/pic-74@2x.png' })
							)
						),
						React.createElement(
							'div',
							{ className: 'extend_ope' },
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'add', onTouchTap: this.addToList.bind(this, item) })
							),
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: _sington.Collects.has(item) ? 'collected' : 'uncollected', onTouchTap: this.collect.bind(this, item) })
							),
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'mode mode' + this.props.playMode, onTouchTap: _action.Actions.changeMode })
							),
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'list', onTouchTap: this.showList.bind(this) })
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'bottom_bar' },
						React.createElement(
							'div',
							{ className: 'silder' },
							React.createElement(_Slider.Slider, { min: '0', max: duration, changeValue: this.setCurrentTime.bind(this), value: _store.audio.currentTime })
						),
						React.createElement(
							'div',
							{ className: 'song_ope' },
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'prev', onTouchTap: this.prev.bind(this) })
							),
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'control ' + (playing ? 'stop' : 'start'), onTouchTap: this.playOrPause.bind(this, playing) })
							),
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'next', onTouchTap: this.next.bind(this) })
							)
						)
					),
					doms
				);
			}
		}]);
		return Player;
	}(_baseModule2.default);

	exports.default = Player;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Slider = undefined;

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Slider = exports.Slider = function (_React$Component) {
	    (0, _inherits3.default)(Slider, _React$Component);

	    function Slider(props) {
	        (0, _classCallCheck3.default)(this, Slider);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Slider.__proto__ || (0, _getPrototypeOf2.default)(Slider)).call(this, props));

	        _this.textOriginLeftPos = 0;
	        _this.potOriginLeftPos = 0;
	        _this.sliderBarWidth = 0;
	        _this.sliderOrginX = 0;
	        return _this;
	    }

	    (0, _createClass3.default)(Slider, [{
	        key: "touchStart",
	        value: function touchStart(e) {
	            this.spos = e.changedTouches[0];
	            this.canMove = true;
	            this.first = true;
	        }
	    }, {
	        key: "touchEnd",
	        value: function touchEnd(e) {
	            if (!this.canMove) return;
	            var x = e.changedTouches[0].pageX - this.sliderOrginX;
	            if (x > 0) {
	                var value = parseInt(x / this.sliderBarWidth * this.props.max);
	                value = value > this.props.max ? this.props.max : value;
	                console.log("touch value: " + value);
	                this.pos(value);
	                if (typeof this.props.changeValue === "function") {
	                    this.props.changeValue(value);
	                }
	            }
	        }
	    }, {
	        key: "touchMove",
	        value: function touchMove(e) {
	            if (this.first) {
	                this.first = false;
	                // 向上滑动
	                if (Math.abs(this.spos.pageY - e.changedTouches[0].pageY) > Math.abs(this.spos.pageX - e.changedTouches[0].pageX)) this.canMove = false;
	            }
	            if (!this.canMove) return;
	            var x = e.changedTouches[0].pageX - this.sliderOrginX;
	            if (x > 0) {
	                var value = parseInt(x / this.sliderBarWidth * this.props.max);
	                value = value > this.props.max ? this.props.max : value;
	                console.log("touch value: " + value);
	                this.pos(value);
	                if (typeof this.props.changeValue === "function") {
	                    this.props.changeValue(value);
	                }
	            }
	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {

	            var valueBarDom = this.refs.valueBar;
	            var sliderPotDom = this.refs.sliderPot;

	            this.potOriginLeftPos = sliderPotDom.offsetLeft;

	            this.sliderBarWidth = this.refs.sliderBar.offsetWidth - sliderPotDom.offsetWidth;
	            var value = parseInt(this.props.value);
	            this.pos(value);

	            this.sliderOrginX = this.refs.sliderBar.offsetLeft + sliderPotDom.offsetWidth / 2;
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate() {
	            this.pos(this.props.value);
	        }
	        /**
	         * 根据只算出左边进度条和原点的位置
	         */

	    }, {
	        key: "pos",
	        value: function pos(value) {
	            var valueBarDom = this.refs.valueBar;
	            var sliderPotDom = this.refs.sliderPot;

	            valueBarDom.style.width = value * this.sliderBarWidth / parseInt(this.props.max) + "px";

	            sliderPotDom.style.left = this.potOriginLeftPos + parseInt(valueBarDom.style.width) + "px";
	        }
	        /* 将秒数转化为 hh:mm:ss 格式 */

	    }, {
	        key: "formatSecond",
	        value: function formatSecond(a) {
	            if (a < 0) return '';

	            var hh = parseInt(a / 3600),
	                mm = parseInt(a % 3600 / 60),
	                ss = parseInt(a % 60);

	            return (hh > 0 ? this.format(hh) + ":" : '') + this.format(mm) + ":" + this.format(ss);
	        }

	        /* 个位数时，十位补0 */

	    }, {
	        key: "format",
	        value: function format(d) {
	            return d >= 10 ? d : "0" + d;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var total, currTime;
	            currTime = this.formatSecond(this.props.value);
	            total = this.formatSecond(this.props.max);
	            return React.createElement(
	                "div",
	                { className: "sliderContainer" },
	                React.createElement(
	                    "div",
	                    { className: "sliderContainer_container" },
	                    React.createElement(
	                        "div",
	                        { className: "txt_wrap" },
	                        React.createElement(
	                            "span",
	                            { className: "txt_left" },
	                            currTime
	                        ),
	                        React.createElement(
	                            "span",
	                            { className: "txt_right" },
	                            total
	                        )
	                    ),
	                    React.createElement("div", { className: "fakeBar" }),
	                    React.createElement(
	                        "div",
	                        { className: "touchTap", onTouchStart: this.touchStart.bind(this), onTouchEnd: this.touchEnd.bind(this), onTouchMove: this.touchMove.bind(this) },
	                        React.createElement("input", { type: "range", min: this.props.min, max: this.props.max, className: "sliderBar", ref: "sliderBar" })
	                    ),
	                    React.createElement("div", { className: "valueBar", ref: "valueBar" }),
	                    React.createElement("span", { className: "sliderPot", ref: "sliderPot" })
	                )
	            );
	        }
	    }]);
	    return Slider;
	}(React.Component);

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(121);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _baseModule = __webpack_require__(125);

	var _baseModule2 = _interopRequireDefault(_baseModule);

	var _songList = __webpack_require__(128);

	var _songList2 = _interopRequireDefault(_songList);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _localStore = __webpack_require__(104);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Recent = function (_BaseModule) {
		(0, _inherits3.default)(Recent, _BaseModule);

		function Recent(props) {
			(0, _classCallCheck3.default)(this, Recent);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Recent.__proto__ || (0, _getPrototypeOf2.default)(Recent)).call(this, props));

			_loadsh2.default.extend(_this.state, {});
			_this.state.toolbar.events = _this.toolEvent();
			_this.state.songs.list = _localStore.Records.getList();
			return _this;
		}

		(0, _createClass3.default)(Recent, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				document.title = '最近播放';

				if (document.getElementById('wrapper')) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (document.getElementById('wrapper') && !this.scroll) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });
			}
		}, {
			key: 'toolEvent',
			value: function toolEvent() {
				var self = this,
				    events = (0, _get3.default)(Recent.prototype.__proto__ || (0, _getPrototypeOf2.default)(Recent.prototype), 'toolEvent', this).call(this);

				/* 重写删除歌曲事件 */
				var supDelete = events.delete;
				events.delete = function () {
					supDelete(function (items) {
						self.setState({ confirm: { show: false } });
						self.reset();
						_localStore.Records.remove(items);
					});
				};

				return events;
			}
		}, {
			key: 'render',
			value: function render() {
				var _props$params = this.props.params;
				var name = _props$params.name;
				var id = _props$params.id;

				var className;
				if (this.state.status == 'multi' && this.state.toolbar.show) {
					className = 'scro_bottom2';
				} else {
					className = 'scro_bottom1';
				}

				var multiBar = this.getMulitBar();
				var doms = this.getDoms();

				return React.createElement(
					'div',
					{ className: 'page page_collection' },
					React.createElement(
						'header',
						{ className: 'header' },
						multiBar
					),
					React.createElement(
						'section',
						{ className: 'wrapper', id: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'scroller ' + className },
							React.createElement(_songList2.default, { ref: 'songList', opts: this.state.songs, status: this.state.status })
						)
					),
					doms
				);
			}
		}]);
		return Recent;
	}(_baseModule2.default);

	exports.default = Recent;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _stringify = __webpack_require__(99);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tips = __webpack_require__(117);

	var _tips2 = _interopRequireDefault(_tips);

	var _confirm = __webpack_require__(118);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	var _localStore = __webpack_require__(104);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;

	var Network = function (_React$Component) {
		(0, _inherits3.default)(Network, _React$Component);

		function Network() {
			var _ref;

			var _temp, _this, _ret;

			(0, _classCallCheck3.default)(this, Network);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Network.__proto__ || (0, _getPrototypeOf2.default)(Network)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
				pager: {
					current_page: 0,
					total_page: 1
				},
				currTag: '',
				list: [],
				showMore: false,
				panels: []
			}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
		}

		(0, _createClass3.default)(Network, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				var self = this;
				document.title = this.props.params.title;
				this.myScroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });
				this.myScroll.on("scroll", function () {
					if (this.y < this.maxScrollY) this.loading = true;
				});
				this.myScroll.on("scrollEnd", function () {
					if (this.loading) {
						this.loading = false;
						self.getAlbums({ subCategoryId: self.state.currTag, tag_name: self.state.currTag });
					}
				});

				this.tagScroll = new _iscrollProbe2.default('#tagWrap', { scrollX: true, scrollY: false });

				var cid = this.props.params.id;
				var currPanelItem;

				if (cid == 99) {
					// 睡眠
					_ajax2.default.getSubCategroyList({ categoryId: 1 }, function (res) {
						_this2.state.panels = res.data;
						currPanelItem = _this2.getPanelItem(_localStore.Panel.getId('tags'), res.data);
						res.data.length && _this2.getAlbums(currPanelItem);
						_this2.setState({});
						setTimeout(function () {
							_this2.tagScroll.refresh();
						}, 0);
					});
				} else {
					_ajax2.default.getXmlyCategoryTags({ category_id: cid, type: 0 }, function (data) {
						_this2.state.panels = data;
						currPanelItem = _this2.getPanelItem(_localStore.Panel.getId('tags'), data);
						data.length && _this2.getAlbums(currPanelItem);
						_this2.setState({});
						setTimeout(function () {
							_this2.tagScroll.refresh();
						}, 0);
					});
				}
			}
		}, {
			key: 'getPanelItem',
			value: function getPanelItem(tag, list) {

				for (var i = 0; i < list.length; i++) {
					if (tag == list[i].subCategoryId || tag == list[i].tag_name) return list[i];
				}
				return list[0];
			}
		}, {
			key: 'getAlbums',
			value: function getAlbums(item) {
				var _this3 = this;

				var cid = this.props.params.id;

				if (this.state.currTag != item.subCategoryId && this.state.currTag != item.tag_name) {
					this.state.pager = {
						current_page: 0,
						total_page: 1
					};
					this.state.list = [];
				}

				var _state$pager = this.state.pager;
				var current_page = _state$pager.current_page;
				var total_page = _state$pager.total_page;


				if (total_page <= current_page) return;

				_localStore.Panel.setId('tags', item.subCategoryId || item.tag_name);

				if (cid == 99) {
					// 睡眠
					_ajax2.default.getXmlyAlbumsList({ categoryId: 1, type: 1, subCategoryId: item.subCategoryId, pageIndex: current_page + 1 }, function (res) {
						var list = [];
						res.data.list.forEach(function (item) {
							list.push({
								id: item.id,
								include_track_count: item.tracksCount,
								play_count: item.playsCount,
								cover_url_small: item.coverUrlSmall,
								nickname: item.nickname,
								album_title: item.title
							});
						});
						_this3.state.pager = { current_page: current_page + 1, total_page: res.data.pager.totalPages };
						_this3.state.list = _this3.state.list.concat(list);
						_this3.state.currTag = item.subCategoryId;
						_this3.setState({});
						_this3.refreshScroll();
					});
				} else {
					_ajax2.default.getXmlyCategoryAlbums({
						category_id: cid,
						tag_name: item.tag_name,
						calc_dimension: 1,
						page: current_page + 1
					}, function (data) {
						_this3.state.pager = { current_page: data.current_page, total_page: data.total_page };
						_this3.state.list = _this3.state.list.concat(data.albums);
						_this3.state.currTag = item.tag_name;
						_this3.setState({});
						_this3.refreshScroll();
					});
				}

				this.state.panels.forEach(function (item) {
					item.selected = false;
				});
				item.selected = true;
				this.setState({ showMore: false });
			}

			/* 当滚动内容区域尺寸变化后需要重新计算 */

		}, {
			key: 'refreshScroll',
			value: function refreshScroll() {
				var _this4 = this;

				setTimeout(function () {
					_this4.myScroll.refresh();
				}, 0);
			}
		}, {
			key: 'toggle',
			value: function toggle() {
				this.setState({ showMore: !this.state.showMore });
			}
		}, {
			key: 'render',
			value: function render() {
				var _this5 = this;

				var showMore = this.state.showMore;

				var cid = this.props.params.id;

				return React.createElement(
					'div',
					{ className: 'page page_tags' },
					React.createElement(
						'header',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'panel' },
							React.createElement(
								'div',
								{ className: 'tag_wrap', id: 'tagWrap', style: { display: showMore ? 'none' : 'block' } },
								React.createElement(
									'div',
									{ style: { display: 'inline-block', paddingRight: '3.333rem' } },
									this.state.panels.map(function (item, i) {
										//if(i>3) return '';
										var name = item.tag_name || item.subCategoryName;
										return React.createElement(
											'div',
											{ key: name, className: 'tag_item ' + (_this5.state.currTag == name ? 'selected' : ''), onTouchTap: _this5.getAlbums.bind(_this5, item) },
											React.createElement(
												'span',
												null,
												name
											)
										);
									})
								)
							),
							showMore && React.createElement(
								'span',
								null,
								'\u66F4\u591A\u5206\u7C7B'
							),
							React.createElement(
								'span',
								{ className: 'more', onTouchEnd: this.toggle.bind(this) },
								React.createElement('i', { className: 'arrow_bottom ' + (showMore ? 'roate_top' : 'roate_bottom') })
							)
						)
					),
					React.createElement(
						'section',
						{ className: 'wrapper', id: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'scroller' },
							React.createElement(Item, { list: this.state.list })
						),
						showMore && React.createElement(MoreList, { list: this.state.panels, touchCallback: this.getAlbums.bind(this) })
					)
				);
			}
		}]);
		return Network;
	}(React.Component);

	exports.default = Network;

	var Item = function (_React$Component2) {
		(0, _inherits3.default)(Item, _React$Component2);

		function Item() {
			(0, _classCallCheck3.default)(this, Item);
			return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).apply(this, arguments));
		}

		(0, _createClass3.default)(Item, [{
			key: 'link',
			value: function link(baseInfo) {
				location.hash = '#/network/albums/' + encodeURIComponent((0, _stringify2.default)(baseInfo));
			}
		}, {
			key: 'render',
			value: function render() {
				var _this7 = this;

				var list = this.props.list;var html = [];
				if (!list) return React.createElement('div', null);

				html = list.map(function (item) {
					var playCount = item.play_count > 10000 ? (item.play_count / 10000).toFixed(1) + '万' : item.play_count;
					var baseInfo = {
						id: item.id,
						title: item.album_title,
						playsCount: item.play_count,
						img: item.cover_url_middle,
						intro: item.album_info,
						artist: item.nickname
					};
					return React.createElement(
						'li',
						{ key: item.id, onTouchTap: _this7.link.bind(_this7, baseInfo) },
						React.createElement(
							'div',
							{ className: 'img_wrap' },
							React.createElement('img', { src: item.cover_url_small })
						),
						React.createElement(
							'div',
							{ className: 'base_info' },
							React.createElement(
								'p',
								{ className: 'line1' },
								item.album_title
							),
							React.createElement(
								'p',
								{ className: 'line2' },
								'by ',
								item.nickname || item.announcer.nickname || ''
							),
							React.createElement(
								'div',
								{ className: 'line3' },
								React.createElement('i', { className: 'playnum_icon' }),
								React.createElement(
									'span',
									null,
									playCount
								),
								React.createElement('i', { className: 'num_icon' }),
								React.createElement(
									'span',
									null,
									item.include_track_count,
									'\u96C6'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'oper_icon' },
							React.createElement('i', { className: 'arrow_right' })
						)
					);
				});
				return React.createElement(
					'ul',
					{ className: 'category_list' },
					html
				);
			}
		}]);
		return Item;
	}(React.Component);

	var MoreList = function (_React$Component3) {
		(0, _inherits3.default)(MoreList, _React$Component3);

		function MoreList() {
			(0, _classCallCheck3.default)(this, MoreList);
			return (0, _possibleConstructorReturn3.default)(this, (MoreList.__proto__ || (0, _getPrototypeOf2.default)(MoreList)).apply(this, arguments));
		}

		(0, _createClass3.default)(MoreList, [{
			key: 'render',
			value: function render() {
				var _this9 = this;

				var list = this.props.list;
				var html = [];var arr;var num = 3;

				list.forEach(function (item, i) {
					i % num == 0 && (arr = []);

					arr.push(React.createElement(
						'li',
						{ onTouchTap: _this9.props.touchCallback.bind(_this9, item) },
						React.createElement(
							'span',
							{ className: item.selected ? 'selected' : '' },
							item.tag_name || item.subCategoryName
						)
					));

					if (i % num == num - 1 || i == list.length - 1) html.push(React.createElement(
						'ul',
						null,
						arr
					));
				});

				return React.createElement(
					'div',
					{ className: 'more_list' },
					html
				);
			}
		}]);
		return MoreList;
	}(React.Component);

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _baseModule = __webpack_require__(125);

	var _baseModule2 = _interopRequireDefault(_baseModule);

	var _songList = __webpack_require__(128);

	var _songList2 = _interopRequireDefault(_songList);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _sington = __webpack_require__(115);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NetworkMusic = function (_BaseModule) {
		(0, _inherits3.default)(NetworkMusic, _BaseModule);

		function NetworkMusic(props) {
			(0, _classCallCheck3.default)(this, NetworkMusic);

			var _this = (0, _possibleConstructorReturn3.default)(this, (NetworkMusic.__proto__ || (0, _getPrototypeOf2.default)(NetworkMusic)).call(this, props));

			_loadsh2.default.extend(_this.state, {});
			_this.state.toolbar.events = _this.toolEvent();
			_this.baseInfo = JSON.parse(_this.props.params.baseInfo);
			return _this;
		}

		(0, _createClass3.default)(NetworkMusic, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				document.title = this.baseInfo.title;

				if (document.getElementById('wrapper')) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });

				this.getData();
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (document.getElementById('wrapper') && !this.scroll) this.scroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });
			}
		}, {
			key: 'setMulitTools',
			value: function setMulitTools() {
				this.state.toolType = 'mulit';
				this.state.toolbar.tools = [{ name: 'toNext', text: '添加到播放' }, { name: 'toAlbum' }, { name: 'collect' }];
			}
		}, {
			key: 'setSimpleTools',
			value: function setSimpleTools(item) {
				this.state.toolType = 'single';
				this.state.toolbar.tools = [{ name: 'toNext' }, { name: 'toAlbum' }, { name: 'collect', hasCollect: _sington.Collects.has(item) }];
			}
		}, {
			key: 'getData',
			value: function getData() {
				var _this2 = this;

				_ajax2.default.getXmlyAlbumMusics({ album_id: this.baseInfo.id, count: this.pageSize }, function (data) {
					_this2.loaded = true;
					var list = _this2.state.songs.list;
					if (data && data.tracks && data.tracks.length) {
						_this2.state.songs.artist = data.tracks[0].announcer.nickname;
						data.tracks.forEach(function (item) {
							list.push({
								mid: item.id,
								name: item.track_title,
								uri: item.play_url_32,
								msi: item.cover_url_small,
								mmi: item.cover_url_middle,
								artist: item.announcer.nickname,
								sourceType: 1
							});
						});
					}
					_this2.state.songs.album_title = data.album_title;
					_this2.state.songs.album_intro = data.album_intro;
					_this2.state.songs.cover_url_large = data.cover_url_large;

					_this2.setState({});
					_this2.refreshScroll();
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var baseInfo = this.baseInfo;

				var _state$songs = this.state.songs;
				var album_title = _state$songs.album_title;
				var artist = _state$songs.artist;
				var album_intro = _state$songs.album_intro;
				var cover_url_large = _state$songs.cover_url_large;
				var play_count = _state$songs.play_count;

				var className;
				if (this.state.status == 'multi' && this.state.toolbar.show) {
					className = 'scro_bottom2';
				} else {
					className = 'scro_bottom1';
				}

				var multiBar = this.getMulitBar();
				var doms = this.getDoms();

				if (!this.loaded) {
					// 未获取数据前的界面展示
					return React.createElement(
						'div',
						{ className: 'loading' },
						'\u6B63\u5728\u52A0\u8F7D...'
					);
				};

				return React.createElement(
					'div',
					{ className: 'page nw_music' },
					React.createElement(
						'header',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'group_info', style: { backgroundImage: 'url(' + (cover_url_large || baseInfo.img) + ')' } },
							React.createElement('div', { className: 'opa_dim' }),
							React.createElement(
								'div',
								{ className: 'info' },
								React.createElement(
									'div',
									{ className: 'base_info' },
									React.createElement(
										'div',
										{ className: 'name' },
										album_intro || baseInfo.intro
									),
									React.createElement(
										'div',
										{ className: 'flex' },
										React.createElement(
											'span',
											{ className: 'desc' },
											artist || baseInfo.artist
										),
										React.createElement(
											'div',
											{ className: 'num' },
											React.createElement('i', { className: 'playnum_icon' }),
											React.createElement(
												'span',
												null,
												play_count || baseInfo.playsCount
											),
											React.createElement('i', { className: 'num_icon' }),
											React.createElement(
												'span',
												null,
												this.state.songs.list.length,
												'\u96C6'
											)
										)
									)
								)
							)
						),
						multiBar
					),
					React.createElement(
						'section',
						{ className: 'wrapper', id: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'scroller ' + className },
							React.createElement(_songList2.default, { ref: 'songList', opts: this.state.songs, status: this.state.status })
						)
					),
					doms
				);
			}
		}]);
		return NetworkMusic;
	}(_baseModule2.default);

	exports.default = NetworkMusic;

	var List = function (_React$Component) {
		(0, _inherits3.default)(List, _React$Component);

		function List() {
			(0, _classCallCheck3.default)(this, List);
			return (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));
		}

		return List;
	}(React.Component);

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tips = __webpack_require__(117);

	var _tips2 = _interopRequireDefault(_tips);

	var _confirm = __webpack_require__(118);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BuildAlbum = function (_React$Component) {
		(0, _inherits3.default)(BuildAlbum, _React$Component);

		function BuildAlbum() {
			(0, _classCallCheck3.default)(this, BuildAlbum);
			return (0, _possibleConstructorReturn3.default)(this, (BuildAlbum.__proto__ || (0, _getPrototypeOf2.default)(BuildAlbum)).apply(this, arguments));
		}

		(0, _createClass3.default)(BuildAlbum, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.type = 'add';
				var _props$params = this.props.params;
				var id = _props$params.id;
				var name = _props$params.name;

				if (+this.props.params.id) {
					document.title = '编辑歌单';
				} else {
					document.title = '新建歌单';
				}
			}
		}, {
			key: 'save',
			value: function save() {
				var _this2 = this;

				var id = +this.props.params.id;
				var val = this.refs.albumName.value;
				if (val == '') return this.refs.tips.showMsg('请输入歌单名称');
				if (val.length > 20) return this.refs.tips.showMsg('名称长度不能超过20');

				if (id) {
					_ajax2.default.renewCustomAlbum({ albumsCustomId: id, title: val }, function (res) {
						if (res.code == 0) {
							history.go(-2);
						} else {
							_this2.refs.tips.showMsg('修改失败');
						}
					});
				} else {
					_ajax2.default.buildCustomAlbum({ title: val }, function (res) {
						if (res.code == 0) {
							window.history.back();
						} else {
							_this2.refs.tips.showMsg('添加失败');
						}
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _props$params2 = this.props.params;
				var id = _props$params2.id;
				var name = _props$params2.name;


				name = +id ? name : '';

				if (this.type == 'update') val = this.props.params;
				return React.createElement(
					'div',
					{ className: 'page page_newfile' },
					React.createElement('input', { type: 'text', ref: 'albumName', defaultValue: name, className: 'txt_file', placeholder: '\u8BF7\u8F93\u5165\u6B4C\u5355\u540D\u79F0' }),
					React.createElement('input', { type: 'button', className: 'btn_save', value: '\u4FDD\u5B58', onTouchTap: this.save.bind(this) }),
					React.createElement(_tips2.default, { ref: 'tips' })
				);
			}
		}]);
		return BuildAlbum;
	}(React.Component);

	exports.default = BuildAlbum;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tips = __webpack_require__(117);

	var _tips2 = _interopRequireDefault(_tips);

	var _confirm = __webpack_require__(118);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;

	var Anchors = function (_React$Component) {
		(0, _inherits3.default)(Anchors, _React$Component);

		function Anchors() {
			var _ref;

			var _temp, _this, _ret;

			(0, _classCallCheck3.default)(this, Anchors);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Anchors.__proto__ || (0, _getPrototypeOf2.default)(Anchors)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
				pager: {
					current_page: 0,
					total_page: 1
				},
				data: {
					announcers: []
				}
			}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
		}

		(0, _createClass3.default)(Anchors, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var self = this;

				document.title = this.props.params.title;

				this.myScroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });
				this.myScroll.on("scroll", function () {
					if (this.y < this.maxScrollY) this.loading = true;;
				});
				this.myScroll.on("scrollEnd", function () {
					if (this.loading) {
						this.loading = false;
						self.getData.call(self);
					}
				});

				this.getData();
			}
		}, {
			key: 'getData',
			value: function getData() {
				var _this2 = this;

				var _state$pager = this.state.pager;
				var current_page = _state$pager.current_page;
				var total_page = _state$pager.total_page;


				if (total_page <= current_page) return;

				_ajax2.default.getXmlyCategoryAnnos({ vcategory_id: this.props.params.id, calc_dimension: 1, page: current_page + 1 }, function (data) {
					_this2.state.data.announcers = _this2.state.data.announcers.concat(data.announcers);
					_this2.state.pager = { current_page: data.current_page, total_page: data.total_page };
					_this2.setState({});
					_this2.refreshScroll();
				});
			}

			/* 当滚动内容区域尺寸变化后需要重新计算 */

		}, {
			key: 'refreshScroll',
			value: function refreshScroll() {
				var _this3 = this;

				setTimeout(function () {
					_this3.myScroll.refresh();
				}, 0);
			}
		}, {
			key: 'render',
			value: function render() {
				var showMore = this.state.showMore;


				return React.createElement(
					'div',
					{ className: 'page page_anchors' },
					React.createElement(
						'section',
						{ className: 'wrapper', id: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'scroller' },
							React.createElement(Item, { list: this.state.data.announcers })
						)
					)
				);
			}
		}]);
		return Anchors;
	}(React.Component);

	exports.default = Anchors;

	var Item = function (_React$Component2) {
		(0, _inherits3.default)(Item, _React$Component2);

		function Item() {
			(0, _classCallCheck3.default)(this, Item);
			return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).apply(this, arguments));
		}

		(0, _createClass3.default)(Item, [{
			key: 'link',
			value: function link(id, title) {
				location.hash = '#/network/anchorAlbums/' + id + '/' + encodeURIComponent(title);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this5 = this;

				var list = this.props.list;var html = [];

				html = list.map(function (item) {
					var followerCount = item.follower_count > 10000 ? (item.follower_count / 10000).toFixed(1) + '万' : item.follower_count;

					return React.createElement(
						'li',
						{ key: item.id, onTouchTap: _this5.link.bind(_this5, item.id, item.nickname) },
						React.createElement(
							'div',
							{ className: 'img_wrap' },
							React.createElement('img', { src: item.avatar_url })
						),
						React.createElement(
							'div',
							{ className: 'base_info' },
							React.createElement(
								'p',
								{ className: 'line1' },
								item.nickname
							),
							React.createElement(
								'p',
								{ className: 'line2' },
								item.vdesc || '暂无'
							),
							React.createElement(
								'div',
								{ className: 'line3' },
								React.createElement('i', { className: 'playnum_icon' }),
								React.createElement(
									'span',
									null,
									followerCount || 0
								),
								React.createElement('i', { className: 'num_icon' }),
								React.createElement(
									'span',
									null,
									item.released_track_count || 0,
									'\u96C6'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'oper_icon' },
							React.createElement('i', { className: 'arrow_right' })
						)
					);
				});
				return React.createElement(
					'ul',
					{ className: 'category_list' },
					html
				);
			}
		}]);
		return Item;
	}(React.Component);

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _stringify = __webpack_require__(99);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _tips = __webpack_require__(117);

	var _tips2 = _interopRequireDefault(_tips);

	var _confirm = __webpack_require__(118);

	var _confirm2 = _interopRequireDefault(_confirm);

	var _loadsh = __webpack_require__(101);

	var _loadsh2 = _interopRequireDefault(_loadsh);

	var _ajax = __webpack_require__(98);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _iscrollProbe = __webpack_require__(95);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;

	var AnchorAlbums = function (_React$Component) {
		(0, _inherits3.default)(AnchorAlbums, _React$Component);

		function AnchorAlbums() {
			var _ref;

			var _temp, _this, _ret;

			(0, _classCallCheck3.default)(this, AnchorAlbums);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AnchorAlbums.__proto__ || (0, _getPrototypeOf2.default)(AnchorAlbums)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
				pager: {
					current_page: 0,
					total_page: 1
				},
				data: {
					albums: []
				}
			}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
		}

		(0, _createClass3.default)(AnchorAlbums, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var self = this;

				document.title = this.props.params.title;

				this.myScroll = new _iscrollProbe2.default('#wrapper', { probeType: 3 });
				this.myScroll.on("scroll", function () {
					if (this.y < this.maxScrollY) this.loading = true;;
				});
				this.myScroll.on("scrollEnd", function () {
					if (this.loading) {
						this.loading = false;
						self.getData.call(self);
					}
				});

				this.getData();
			}
		}, {
			key: 'getData',
			value: function getData() {
				var _this2 = this;

				var _state$pager = this.state.pager;
				var current_page = _state$pager.current_page;
				var total_page = _state$pager.total_page;


				if (total_page <= current_page) return;

				_ajax2.default.getXmlyAnnoAblums({ aid: this.props.params.id, page: current_page + 1 }, function (data) {
					_this2.state.data.albums = _this2.state.data.albums.concat(data.albums);
					_this2.state.pager = { current_page: data.current_page, total_page: data.total_page };
					_this2.setState({});
					_this2.refreshScroll();
				});
			}

			/* 当滚动内容区域尺寸变化后需要重新计算 */

		}, {
			key: 'refreshScroll',
			value: function refreshScroll() {
				var _this3 = this;

				setTimeout(function () {
					_this3.myScroll.refresh();
				}, 0);
			}
		}, {
			key: 'render',
			value: function render() {
				var showMore = this.state.showMore;


				return React.createElement(
					'div',
					{ className: 'page page_anchors' },
					React.createElement(
						'section',
						{ className: 'wrapper', id: 'wrapper' },
						React.createElement(
							'div',
							{ className: 'scroller' },
							React.createElement(Item, { list: this.state.data.albums })
						)
					)
				);
			}
		}]);
		return AnchorAlbums;
	}(React.Component);

	exports.default = AnchorAlbums;

	var Item = function (_React$Component2) {
		(0, _inherits3.default)(Item, _React$Component2);

		function Item() {
			(0, _classCallCheck3.default)(this, Item);
			return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).apply(this, arguments));
		}

		(0, _createClass3.default)(Item, [{
			key: 'link',
			value: function link(baseInfo) {
				location.hash = '#/network/albums/' + encodeURIComponent((0, _stringify2.default)(baseInfo));
			}
		}, {
			key: 'render',
			value: function render() {
				var _this5 = this;

				var list = this.props.list;var html = [];

				html = list.map(function (item) {
					var playCount = item.play_count > 10000 ? (item.play_count / 10000).toFixed(1) + '万' : item.play_count;
					var baseInfo = {
						id: item.id,
						title: item.album_title,
						playsCount: item.play_count,
						img: item.cover_url_middle,
						intro: item.album_info,
						artist: item.nickname
					};
					return React.createElement(
						'li',
						{ key: item.id, onTouchTap: _this5.link.bind(_this5, baseInfo) },
						React.createElement(
							'div',
							{ className: 'img_wrap' },
							React.createElement('img', { src: item.cover_url_small })
						),
						React.createElement(
							'div',
							{ className: 'base_info' },
							React.createElement(
								'p',
								{ className: 'line1' },
								item.album_title
							),
							React.createElement(
								'p',
								{ className: 'line2' },
								item.album_intro
							),
							React.createElement(
								'div',
								{ className: 'line3' },
								React.createElement('i', { className: 'playnum_icon' }),
								React.createElement(
									'span',
									null,
									playCount
								),
								React.createElement('i', { className: 'num_icon' }),
								React.createElement(
									'span',
									null,
									item.include_track_count,
									'\u96C6'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'oper_icon' },
							React.createElement('i', { className: 'arrow_right' })
						)
					);
				});
				return React.createElement(
					'ul',
					{ className: 'category_list' },
					html
				);
			}
		}]);
		return Item;
	}(React.Component);

/***/ }
/******/ ]);