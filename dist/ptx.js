/*
*   name: rocptx 
*   description: Dynamic public traffic library of Taiwan and Kinmen, Lienchiang 
*   version: 0.0.6 
*   license: MIT 
*   
*   Edit by: Melix Yen
*   E-Mail: melixyen@gmail.com
*   	
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.rocptx = factory());
}(this, function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var f$1 = _wks;

	var _wksExt = {
		f: f$1
	};

	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
	};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
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
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', { create: _objectCreate });

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperties: _objectDps });

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

	var $getOwnPropertyDescriptor$1 = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
	  };
	});

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto$1 = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto$1 : null;
	};

	// 19.1.2.9 Object.getPrototypeOf(O)



	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return _objectGpo(_toObject(it));
	  };
	});

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f;
	});

	// 19.1.2.5 Object.freeze(O)

	var meta = _meta.onFreeze;

	_objectSap('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

	// 19.1.2.17 Object.seal(O)

	var meta$1 = _meta.onFreeze;

	_objectSap('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
	  };
	});

	// 19.1.2.15 Object.preventExtensions(O)

	var meta$2 = _meta.onFreeze;

	_objectSap('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
	  };
	});

	// 19.1.2.12 Object.isFrozen(O)


	_objectSap('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return _isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

	// 19.1.2.13 Object.isSealed(O)


	_objectSap('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return _isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

	// 19.1.2.11 Object.isExtensible(O)


	_objectSap('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	// 7.2.9 SameValue(x, y)
	var _sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// 19.1.3.10 Object.is(value1, value2)

	_export(_export.S, 'Object', { is: _sameValue });

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	// 19.1.3.6 Object.prototype.toString()

	var test = {};
	test[_wks('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  _redefine(Object.prototype, 'toString', function toString() {
	    return '[object ' + _classof(this) + ']';
	  }, true);
	}

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var arraySlice = [].slice;
	var factories = {};

	var construct = function (F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	var _bind = Function.bind || function bind(that /* , ...args */) {
	  var fn = _aFunction(this);
	  var partArgs = arraySlice.call(arguments, 1);
	  var bound = function (/* args... */) {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
	  };
	  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)


	_export(_export.P, 'Function', { bind: _bind });

	var dP$2 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors && dP$2(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var HAS_INSTANCE = _wks('hasInstance');
	var FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, { value: function (O) {
	  if (typeof this != 'function' || !_isObject(O)) return false;
	  if (!_isObject(this.prototype)) return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while (O = _objectGpo(O)) if (this.prototype === O) return true;
	  return false;
	} });

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt = _global.parseInt;
	var $trim = _stringTrim.trim;

	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	// 18.2.5 parseInt(string, radix)
	_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

	var $parseFloat = _global.parseFloat;
	var $trim$1 = _stringTrim.trim;

	var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim$1(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// 18.2.4 parseFloat(string)
	_export(_export.G + _export.F * (parseFloat != _parseFloat), { parseFloat: _parseFloat });

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var gOPN$2 = _objectGopn.f;
	var gOPD$2 = _objectGopd.f;
	var dP$3 = _objectDp.f;
	var $trim$2 = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = _global[NUMBER];
	var Base = $Number;
	var proto = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = _toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim$2(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? _fails(function () { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
	        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = _descriptors ? gOPN$2(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
	    if (_has(Base, key = keys[j$1]) && !_has($Number, key)) {
	      dP$3($Number, key, gOPD$2(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  _redefine(_global, NUMBER, $Number);
	}

	var _aNumberValue = function (it, msg) {
	  if (typeof it != 'number' && _cof(it) != 'Number') throw TypeError(msg);
	  return +it;
	};

	var _stringRepeat = function repeat(count) {
	  var str = String(_defined(this));
	  var res = '';
	  var n = _toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
	  return res;
	};

	var $toFixed = 1.0.toFixed;
	var floor$1 = Math.floor;
	var data = [0, 0, 0, 0, 0, 0];
	var ERROR = 'Number.toFixed: incorrect invocation!';
	var ZERO = '0';

	var multiply = function (n, c) {
	  var i = -1;
	  var c2 = c;
	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor$1(c2 / 1e7);
	  }
	};
	var divide = function (n) {
	  var i = 6;
	  var c = 0;
	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor$1(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function () {
	  var i = 6;
	  var s = '';
	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + _stringRepeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  } return n;
	};

	_export(_export.P + _export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
	) || !_fails(function () {
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = _aNumberValue(this, ERROR);
	    var f = _toInteger(fractionDigits);
	    var s = '';
	    var m = ZERO;
	    var e, z, j, k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    // eslint-disable-next-line no-self-compare
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);
	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }
	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(0, z);
	        j = f;
	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + _stringRepeat.call(ZERO, f);
	      }
	    }
	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + _stringRepeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

	var $toPrecision = 1.0.toPrecision;

	_export(_export.P + _export.F * (_fails(function () {
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !_fails(function () {
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = _aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});

	// 20.1.2.1 Number.EPSILON


	_export(_export.S, 'Number', { EPSILON: Math.pow(2, -52) });

	// 20.1.2.2 Number.isFinite(number)

	var _isFinite = _global.isFinite;

	_export(_export.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

	// 20.1.2.3 Number.isInteger(number)

	var floor$2 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$2(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)


	_export(_export.S, 'Number', { isInteger: _isInteger });

	// 20.1.2.4 Number.isNaN(number)


	_export(_export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	// 20.1.2.5 Number.isSafeInteger(number)


	var abs = Math.abs;

	_export(_export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

	// 20.1.2.6 Number.MAX_SAFE_INTEGER


	_export(_export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

	// 20.1.2.10 Number.MIN_SAFE_INTEGER


	_export(_export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

	// 20.1.2.12 Number.parseFloat(string)
	_export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', { parseFloat: _parseFloat });

	// 20.1.2.13 Number.parseInt(string, radix)
	_export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', { parseInt: _parseInt });

	// 20.2.2.20 Math.log1p(x)
	var _mathLog1p = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

	// 20.2.2.3 Math.acosh(x)


	var sqrt = Math.sqrt;
	var $acosh = Math.acosh;

	_export(_export.S + _export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

	// 20.2.2.5 Math.asinh(x)

	var $asinh = Math.asinh;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0
	_export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

	// 20.2.2.7 Math.atanh(x)

	var $atanh = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0
	_export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

	// 20.2.2.28 Math.sign(x)
	var _mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	// 20.2.2.9 Math.cbrt(x)



	_export(_export.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return _mathSign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

	// 20.2.2.11 Math.clz32(x)


	_export(_export.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

	// 20.2.2.12 Math.cosh(x)

	var exp = Math.exp;

	_export(_export.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	var _mathExpm1 = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

	// 20.2.2.14 Math.expm1(x)



	_export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', { expm1: _mathExpm1 });

	// 20.2.2.16 Math.fround(x)

	var pow$1 = Math.pow;
	var EPSILON = pow$1(2, -52);
	var EPSILON32 = pow$1(2, -23);
	var MAX32 = pow$1(2, 127) * (2 - EPSILON32);
	var MIN32 = pow$1(2, -126);

	var roundTiesToEven = function (n) {
	  return n + 1 / EPSILON - 1 / EPSILON;
	};

	var _mathFround = Math.fround || function fround(x) {
	  var $abs = Math.abs(x);
	  var $sign = _mathSign(x);
	  var a, result;
	  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	  a = (1 + EPSILON32 / EPSILON) * $abs;
	  result = a - (a - $abs);
	  // eslint-disable-next-line no-self-compare
	  if (result > MAX32 || result != result) return $sign * Infinity;
	  return $sign * result;
	};

	// 20.2.2.16 Math.fround(x)


	_export(_export.S, 'Math', { fround: _mathFround });

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])

	var abs$1 = Math.abs;

	_export(_export.S, 'Math', {
	  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
	    var sum = 0;
	    var i = 0;
	    var aLen = arguments.length;
	    var larg = 0;
	    var arg, div;
	    while (i < aLen) {
	      arg = abs$1(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

	// 20.2.2.18 Math.imul(x, y)

	var $imul = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	_export(_export.S + _export.F * _fails(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff;
	    var xn = +x;
	    var yn = +y;
	    var xl = UINT16 & xn;
	    var yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

	// 20.2.2.21 Math.log10(x)


	_export(_export.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) * Math.LOG10E;
	  }
	});

	// 20.2.2.20 Math.log1p(x)


	_export(_export.S, 'Math', { log1p: _mathLog1p });

	// 20.2.2.22 Math.log2(x)


	_export(_export.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

	// 20.2.2.28 Math.sign(x)


	_export(_export.S, 'Math', { sign: _mathSign });

	// 20.2.2.30 Math.sinh(x)


	var exp$1 = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	_export(_export.S + _export.F * _fails(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1
	      ? (_mathExpm1(x) - _mathExpm1(-x)) / 2
	      : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
	  }
	});

	// 20.2.2.33 Math.tanh(x)


	var exp$2 = Math.exp;

	_export(_export.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = _mathExpm1(x = +x);
	    var b = _mathExpm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
	  }
	});

	// 20.2.2.34 Math.trunc(x)


	_export(_export.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	_export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
	    var res = [];
	    var aLen = arguments.length;
	    var i = 0;
	    var code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

	_export(_export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = _toIobject(callSite.raw);
	    var len = _toLength(tpl.length);
	    var aLen = arguments.length;
	    var res = [];
	    var i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

	// 21.1.3.25 String.prototype.trim()
	_stringTrim('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _iterators = {};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if (BUGGY || VALUES_BUG || !proto[ITERATOR]) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var $at$1 = _stringAt(false);
	_export(_export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at$1(this, pos);
	  }
	});

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];

	_export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = _stringContext(this, searchString, ENDS_WITH);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = _toLength(that.length);
	    var end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
	    var search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_export(_export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: _stringRepeat
	});

	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];

	_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = _stringContext(this, searchString, STARTS_WITH);
	    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

	var quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function (string, tag, attribute, value) {
	  var S = String(_defined(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	var _stringHtml = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  _export(_export.P + _export.F * _fails(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

	// B.2.3.2 String.prototype.anchor(name)
	_stringHtml('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});

	// B.2.3.3 String.prototype.big()
	_stringHtml('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});

	// B.2.3.4 String.prototype.blink()
	_stringHtml('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});

	// B.2.3.5 String.prototype.bold()
	_stringHtml('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});

	// B.2.3.6 String.prototype.fixed()
	_stringHtml('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});

	// B.2.3.7 String.prototype.fontcolor(color)
	_stringHtml('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});

	// B.2.3.8 String.prototype.fontsize(size)
	_stringHtml('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});

	// B.2.3.9 String.prototype.italics()
	_stringHtml('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});

	// B.2.3.10 String.prototype.link(url)
	_stringHtml('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});

	// B.2.3.11 String.prototype.small()
	_stringHtml('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});

	// B.2.3.12 String.prototype.strike()
	_stringHtml('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});

	// B.2.3.13 String.prototype.sub()
	_stringHtml('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});

	// B.2.3.14 String.prototype.sup()
	_stringHtml('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});

	// 20.3.3.1 / 15.9.4.4 Date.now()


	_export(_export.S, 'Date', { now: function () { return new Date().getTime(); } });

	_export(_export.P + _export.F * _fails(function () {
	  return new Date(NaN).toJSON() !== null
	    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
	}), 'Date', {
	  // eslint-disable-next-line no-unused-vars
	  toJSON: function toJSON(key) {
	    var O = _toObject(this);
	    var pv = _toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

	var getTime = Date.prototype.getTime;
	var $toISOString = Date.prototype.toISOString;

	var lz = function (num) {
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	var _dateToIsoString = (_fails(function () {
	  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
	}) || !_fails(function () {
	  $toISOString.call(new Date(NaN));
	})) ? function toISOString() {
	  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
	  var d = this;
	  var y = d.getUTCFullYear();
	  var m = d.getUTCMilliseconds();
	  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	} : $toISOString;

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()



	// PhantomJS / old WebKit has a broken implementations
	_export(_export.P + _export.F * (Date.prototype.toISOString !== _dateToIsoString), 'Date', {
	  toISOString: _dateToIsoString
	});

	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var $toString = DateProto[TO_STRING];
	var getTime$1 = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  _redefine(DateProto, TO_STRING, function toString() {
	    var value = getTime$1.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

	var NUMBER$1 = 'number';

	var _dateToPrimitive = function (hint) {
	  if (hint !== 'string' && hint !== NUMBER$1 && hint !== 'default') throw TypeError('Incorrect hint');
	  return _toPrimitive(_anObject(this), hint != NUMBER$1);
	};

	var TO_PRIMITIVE$1 = _wks('toPrimitive');
	var proto$1 = Date.prototype;

	if (!(TO_PRIMITIVE$1 in proto$1)) _hide(proto$1, TO_PRIMITIVE$1, _dateToPrimitive);

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


	_export(_export.S, 'Array', { isArray: _isArray });

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	// WebKit Array.of isn't generic
	_export(_export.S + _export.F * _fails(function () {
	  function F() { /* empty */ }
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */) {
	    var index = 0;
	    var aLen = arguments.length;
	    var result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) _createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	// 22.1.3.13 Array.prototype.join(separator)


	var arrayJoin = [].join;

	// fallback for not array-like strings
	_export(_export.P + _export.F * (_iobject != Object || !_strictMethod(arrayJoin)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin.call(_toIobject(this), separator === undefined ? ',' : separator);
	  }
	});

	var arraySlice$1 = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	_export(_export.P + _export.F * _fails(function () {
	  if (_html) arraySlice$1.call(_html);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = _toLength(this.length);
	    var klass = _cof(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice$1.call(this, begin, end);
	    var start = _toAbsoluteIndex(begin, len);
	    var upTo = _toAbsoluteIndex(end, len);
	    var size = _toLength(upTo - start);
	    var cloned = new Array(size);
	    var i = 0;
	    for (; i < size; i++) cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

	var $sort = [].sort;
	var test$1 = [1, 2, 3];

	_export(_export.P + _export.F * (_fails(function () {
	  // IE8-
	  test$1.sort(undefined);
	}) || !_fails(function () {
	  // V8 bug
	  test$1.sort(null);
	  // Old WebKit
	}) || !_strictMethod($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? $sort.call(_toObject(this))
	      : $sort.call(_toObject(this), _aFunction(comparefn));
	  }
	});

	var SPECIES = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var $forEach = _arrayMethods(0);
	var STRICT = _strictMethod([].forEach, true);

	_export(_export.P + _export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

	var $map = _arrayMethods(1);

	_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

	var $filter = _arrayMethods(2);

	_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	var $some = _arrayMethods(3);

	_export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

	var $every = _arrayMethods(4);

	_export(_export.P + _export.F * !_strictMethod([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

	var _arrayReduce = function (that, callbackfn, aLen, memo, isRight) {
	  _aFunction(callbackfn);
	  var O = _toObject(that);
	  var self = _iobject(O);
	  var length = _toLength(O.length);
	  var index = isRight ? length - 1 : 0;
	  var i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

	_export(_export.P + _export.F * !_strictMethod([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

	_export(_export.P + _export.F * !_strictMethod([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

	var $indexOf = _arrayIncludes(false);
	var $native = [].indexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

	var $native$1 = [].lastIndexOf;
	var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].lastIndexOf(1, -0) < 0;

	_export(_export.P + _export.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	    // convert -0 to +0
	    if (NEGATIVE_ZERO$1) return $native$1.apply(this, arguments) || 0;
	    var O = _toIobject(this);
	    var length = _toLength(O.length);
	    var index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, _toInteger(arguments[1]));
	    if (index < 0) index = length + index;
	    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
	    return -1;
	  }
	});

	var _arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = _toObject(this);
	  var len = _toLength(O.length);
	  var to = _toAbsoluteIndex(target, len);
	  var from = _toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else delete O[to];
	    to += inc;
	    from += inc;
	  } return O;
	};

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


	_export(_export.P, 'Array', { copyWithin: _arrayCopyWithin });

	_addToUnscopables('copyWithin');

	var _arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = _toObject(this);
	  var length = _toLength(O.length);
	  var aLen = arguments.length;
	  var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
	  var end = aLen > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


	_export(_export.P, 'Array', { fill: _arrayFill });

	_addToUnscopables('fill');

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = _arrayMethods(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	var $find$1 = _arrayMethods(6);
	var KEY$1 = 'findIndex';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
	_export(_export.P + _export.F * forced$1, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

	var SPECIES$1 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	_setSpecies('Array');

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var dP$4 = _objectDp.f;
	var gOPN$3 = _objectGopn.f;


	var $RegExp = _global.RegExp;
	var Base$1 = $RegExp;
	var proto$2 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors && (!CORRECT_NEW || _fails(function () {
	  re2[_wks('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = _isRegexp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : _inheritIfRequired(CORRECT_NEW
	        ? new Base$1(piRE && !fiU ? p.source : p, f)
	        : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
	      , tiRE ? this : proto$2, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$4($RegExp, key, {
	      configurable: true,
	      get: function () { return Base$1[key]; },
	      set: function (it) { Base$1[key] = it; }
	    });
	  };
	  for (var keys$1 = gOPN$3(Base$1), i = 0; keys$1.length > i;) proxy(keys$1[i++]);
	  proto$2.constructor = $RegExp;
	  $RegExp.prototype = proto$2;
	  _redefine(_global, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var TO_STRING$1 = 'toString';
	var $toString$1 = /./[TO_STRING$1];

	var define$1 = function (fn) {
	  _redefine(RegExp.prototype, TO_STRING$1, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails(function () { return $toString$1.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define$1(function toString() {
	    var R = _anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString$1.name != TO_STRING$1) {
	  define$1(function toString() {
	    return $toString$1.call(this);
	  });
	}

	var at = _stringAt(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	var SPECIES$2 = _wks('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$2] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative($match, regexp, this);
	      if (res.done) return res.value;
	      var rx = _anObject(regexp);
	      var S = String(this);
	      if (!rx.global) return _regexpExecAbstract(rx, S);
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = _regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var max$1 = Math.max;
	var min$2 = Math.min;
	var floor$3 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = defined(this);
	      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined
	        ? fn.call(searchValue, O, replaceValue)
	        : $replace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative($replace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = _regexpExecAbstract(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max$1(min$2(_toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	    // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = _toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$3(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	// @@search logic
	_fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[SEARCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative($search, regexp, this);
	      if (res.done) return res.value;
	      var rx = _anObject(regexp);
	      var S = String(this);
	      var previousLastIndex = rx.lastIndex;
	      if (!_sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = _regexpExecAbstract(rx, S);
	      if (!_sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES$3 = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES$3]) == undefined ? D : _aFunction(S);
	};

	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX$1 = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !_fails(function () { });

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!_isRegexp(separator)) return $split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = _regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX$1];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = defined(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var C = _speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = _advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	});

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var process = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$1 = _global.process;
	var Promise$1 = _global.Promise;
	var isNode = _cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$7
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator = _global.navigator;

	var _userAgent = navigator && navigator.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) _redefine(target, key, src[key], safe);
	  return target;
	};

	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$2 = _global.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE$1 = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE$1) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (_library || !USE_NATIVE$1), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$5 = _objectDp.f;









	var fastKey = _meta.fastKey;

	var SIZE = _descriptors ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = _objectCreate(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = _validateCollection(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$5(C.prototype, 'size', {
	      get: function () {
	        return _validateCollection(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
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
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return _iterStep(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    _setSpecies(NAME);
	  }
	};

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    _redefine(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = _fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = _iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        _anInstance(target, C, NAME);
	        var that = _inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  _setToStringTag(C, NAME);

	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = _collection(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, _collectionStrong, true);

	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = _collection(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, _collectionStrong);

	var getWeak = _meta.getWeak;







	var arrayFind = _arrayMethods(5);
	var arrayFindIndex = _arrayMethods(6);
	var id$1 = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id$1++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
	        return data && _has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
	        return data && _has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak(_anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

	var es6_weakMap = createCommonjsModule(function (module) {

	var each = _arrayMethods(0);






	var NATIVE_WEAK_MAP = _validateCollection;
	var IS_IE11 = !_global.ActiveXObject && 'ActiveXObject' in _global;
	var WEAK_MAP = 'WeakMap';
	var getWeak = _meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = _collectionWeak.ufstore;
	var InternalMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (_isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

	// IE11 WeakMap frozen keys fix
	if (NATIVE_WEAK_MAP && IS_IE11) {
	  InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
	  _objectAssign(InternalMap.prototype, methods);
	  _meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    _redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (_isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	var WEAK_SET = 'WeakSet';

	// 23.4 WeakSet Objects
	_collection(WEAK_SET, function (get) {
	  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
	  }
	}, _collectionWeak, false, true);

	var TYPED = _uid('typed_array');
	var VIEW = _uid('view');
	var ABV = !!(_global.ArrayBuffer && _global.DataView);
	var CONSTR = ABV;
	var i$1 = 0;
	var l = 9;
	var Typed;

	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');

	while (i$1 < l) {
	  if (Typed = _global[TypedArrayConstructors[i$1++]]) {
	    _hide(Typed.prototype, TYPED, true);
	    _hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}

	var _typed = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	};

	// https://tc39.github.io/ecma262/#sec-toindex


	var _toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = _toInteger(it);
	  var length = _toLength(number);
	  if (number !== length) throw RangeError('Wrong length!');
	  return length;
	};

	var _typedBuffer = createCommonjsModule(function (module, exports) {











	var gOPN = _objectGopn.f;
	var dP = _objectDp.f;


	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH = 'Wrong length!';
	var WRONG_INDEX = 'Wrong index!';
	var $ArrayBuffer = _global[ARRAY_BUFFER];
	var $DataView = _global[DATA_VIEW];
	var Math = _global.Math;
	var RangeError = _global.RangeError;
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity = _global.Infinity;
	var BaseBuffer = $ArrayBuffer;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;
	var BUFFER = 'buffer';
	var BYTE_LENGTH = 'byteLength';
	var BYTE_OFFSET = 'byteOffset';
	var $BUFFER = _descriptors ? '_b' : BUFFER;
	var $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
	var $OFFSET = _descriptors ? '_o' : BYTE_OFFSET;

	// IEEE754 conversions based on https://github.com/feross/ieee754
	function packIEEE754(value, mLen, nBytes) {
	  var buffer = new Array(nBytes);
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var i = 0;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
	  var e, m, c;
	  value = abs(value);
	  // eslint-disable-next-line no-self-compare
	  if (value != value || value === Infinity) {
	    // eslint-disable-next-line no-self-compare
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if (value * (c = pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	}
	function unpackIEEE754(buffer, mLen, nBytes) {
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = eLen - 7;
	  var i = nBytes - 1;
	  var s = buffer[i--];
	  var e = s & 127;
	  var m;
	  s >>= 7;
	  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	}

	function unpackI32(bytes) {
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	}
	function packI8(it) {
	  return [it & 0xff];
	}
	function packI16(it) {
	  return [it & 0xff, it >> 8 & 0xff];
	}
	function packI32(it) {
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	}
	function packF64(it) {
	  return packIEEE754(it, 52, 8);
	}
	function packF32(it) {
	  return packIEEE754(it, 23, 4);
	}

	function addGetter(C, key, internal) {
	  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
	}

	function get(view, bytes, index, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = _toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	}
	function set(view, bytes, index, conversion, value, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = _toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = conversion(+value);
	  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	}

	if (!_typed.ABV) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = _toIndex(length);
	    this._b = _arrayFill.call(new Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    _anInstance(this, $DataView, DATA_VIEW);
	    _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH];
	    var offset = _toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };

	  if (_descriptors) {
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }

	  _redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if (!_fails(function () {
	    $ArrayBuffer(1);
	  }) || !_fails(function () {
	    new $ArrayBuffer(-1); // eslint-disable-line no-new
	  }) || _fails(function () {
	    new $ArrayBuffer(); // eslint-disable-line no-new
	    new $ArrayBuffer(1.5); // eslint-disable-line no-new
	    new $ArrayBuffer(NaN); // eslint-disable-line no-new
	    return $ArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      _anInstance(this, $ArrayBuffer);
	      return new BaseBuffer(_toIndex(length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	      if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
	    }
	    ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2));
	  var $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if (view.getInt8(0) || !view.getInt8(1)) _redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	_setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	_setToStringTag($DataView, DATA_VIEW);
	_hide($DataView[PROTOTYPE], _typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;
	});

	var ArrayBuffer$1 = _global.ArrayBuffer;

	var $ArrayBuffer = _typedBuffer.ArrayBuffer;
	var $DataView = _typedBuffer.DataView;
	var $isView = _typed.ABV && ArrayBuffer$1.isView;
	var $slice = $ArrayBuffer.prototype.slice;
	var VIEW$1 = _typed.VIEW;
	var ARRAY_BUFFER = 'ArrayBuffer';

	_export(_export.G + _export.W + _export.F * (ArrayBuffer$1 !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

	_export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || _isObject(it) && VIEW$1 in it;
	  }
	});

	_export(_export.P + _export.U + _export.F * _fails(function () {
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start); // FF fix
	    var len = _anObject(this).byteLength;
	    var first = _toAbsoluteIndex(start, len);
	    var fin = _toAbsoluteIndex(end === undefined ? len : end, len);
	    var result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(fin - first));
	    var viewS = new $DataView(this);
	    var viewT = new $DataView(result);
	    var index = 0;
	    while (first < fin) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});

	_setSpecies(ARRAY_BUFFER);

	_export(_export.G + _export.W + _export.F * !_typed.ABV, {
	  DataView: _typedBuffer.DataView
	});

	var _typedArray = createCommonjsModule(function (module) {
	if (_descriptors) {
	  var LIBRARY = _library;
	  var global = _global;
	  var fails = _fails;
	  var $export = _export;
	  var $typed = _typed;
	  var $buffer = _typedBuffer;
	  var ctx = _ctx;
	  var anInstance = _anInstance;
	  var propertyDesc = _propertyDesc;
	  var hide = _hide;
	  var redefineAll = _redefineAll;
	  var toInteger = _toInteger;
	  var toLength = _toLength;
	  var toIndex = _toIndex;
	  var toAbsoluteIndex = _toAbsoluteIndex;
	  var toPrimitive = _toPrimitive;
	  var has = _has;
	  var classof = _classof;
	  var isObject = _isObject;
	  var toObject = _toObject;
	  var isArrayIter = _isArrayIter;
	  var create = _objectCreate;
	  var getPrototypeOf = _objectGpo;
	  var gOPN = _objectGopn.f;
	  var getIterFn = core_getIteratorMethod;
	  var uid = _uid;
	  var wks = _wks;
	  var createArrayMethod = _arrayMethods;
	  var createArrayIncludes = _arrayIncludes;
	  var speciesConstructor = _speciesConstructor;
	  var ArrayIterators = es6_array_iterator;
	  var Iterators = _iterators;
	  var $iterDetect = _iterDetect;
	  var setSpecies = _setSpecies;
	  var arrayFill = _arrayFill;
	  var arrayCopyWithin = _arrayCopyWithin;
	  var $DP = _objectDp;
	  var $GOPD = _objectGopd;
	  var dP = $DP.f;
	  var gOPD = $GOPD.f;
	  var RangeError = global.RangeError;
	  var TypeError = global.TypeError;
	  var Uint8Array = global.Uint8Array;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var PROTOTYPE = 'prototype';
	  var ArrayProto = Array[PROTOTYPE];
	  var $ArrayBuffer = $buffer.ArrayBuffer;
	  var $DataView = $buffer.DataView;
	  var arrayForEach = createArrayMethod(0);
	  var arrayFilter = createArrayMethod(2);
	  var arraySome = createArrayMethod(3);
	  var arrayEvery = createArrayMethod(4);
	  var arrayFind = createArrayMethod(5);
	  var arrayFindIndex = createArrayMethod(6);
	  var arrayIncludes = createArrayIncludes(true);
	  var arrayIndexOf = createArrayIncludes(false);
	  var arrayValues = ArrayIterators.values;
	  var arrayKeys = ArrayIterators.keys;
	  var arrayEntries = ArrayIterators.entries;
	  var arrayLastIndexOf = ArrayProto.lastIndexOf;
	  var arrayReduce = ArrayProto.reduce;
	  var arrayReduceRight = ArrayProto.reduceRight;
	  var arrayJoin = ArrayProto.join;
	  var arraySort = ArrayProto.sort;
	  var arraySlice = ArrayProto.slice;
	  var arrayToString = ArrayProto.toString;
	  var arrayToLocaleString = ArrayProto.toLocaleString;
	  var ITERATOR = wks('iterator');
	  var TAG = wks('toStringTag');
	  var TYPED_CONSTRUCTOR = uid('typed_constructor');
	  var DEF_CONSTRUCTOR = uid('def_constructor');
	  var ALL_CONSTRUCTORS = $typed.CONSTR;
	  var TYPED_ARRAY = $typed.TYPED;
	  var VIEW = $typed.VIEW;
	  var WRONG_LENGTH = 'Wrong length!';

	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails(function () {
	    // eslint-disable-next-line no-undef
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	    new Uint8Array(1).set({});
	  });

	  var toOffset = function (it, BYTES) {
	    var offset = toInteger(it);
	    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	    return offset;
	  };

	  var validate = function (it) {
	    if (isObject(it) && TYPED_ARRAY in it) return it;
	    throw TypeError(it + ' is not a typed array!');
	  };

	  var allocate = function (C, length) {
	    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };

	  var speciesFromList = function (O, list) {
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = allocate(C, length);
	    while (length > index) result[index] = list[index++];
	    return result;
	  };

	  var addGetter = function (it, key, internal) {
	    dP(it, key, { get: function () { return this._d[internal]; } });
	  };

	  var $from = function from(source /* , mapfn, thisArg */) {
	    var O = toObject(source);
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var iterFn = getIterFn(O);
	    var i, length, values, result, step, iterator;
	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      } O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of(/* ...items */) {
	    var index = 0;
	    var length = arguments.length;
	    var result = allocate(this, length);
	    while (length > index) result[index] = arguments[index++];
	    return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto = {
	    copyWithin: function copyWithin(target, start /* , end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /* , thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /* , thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /* , thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /* , thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /* , thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /* , fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /* , fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) { // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /* , thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this;
	      var length = validate(that).length;
	      var middle = Math.floor(length / 2);
	      var index = 0;
	      var value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      } return that;
	    },
	    some: function some(callbackfn /* , thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this);
	      var length = O.length;
	      var $begin = toAbsoluteIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
	      );
	    }
	  };

	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /* , offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1);
	    var length = this.length;
	    var src = toObject(arrayLike);
	    var len = toLength(src.length);
	    var index = 0;
	    if (len + offset > length) throw RangeError(WRONG_LENGTH);
	    while (index < len) this[offset + index] = src[index++];
	  };

	  var $iterators = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function (target, key) {
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ) {
	      target[key] = desc.value;
	      return target;
	    } return dP(target, key, desc);
	  };

	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }

	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });

	  if (fails(function () { arrayToString.call({}); })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }

	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function () { /* noop */ },
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function () { return this[TYPED_ARRAY]; }
	  });

	  // eslint-disable-next-line max-statements
	  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + KEY;
	    var SETTER = 'set' + KEY;
	    var TypedArray = global[NAME];
	    var Base = TypedArray || {};
	    var TAC = TypedArray && getPrototypeOf(TypedArray);
	    var FORCED = !TypedArray || !$typed.ABV;
	    var O = {};
	    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function (that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function (that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function (that, index) {
	      dP(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME, '_d');
	        var index = 0;
	        var offset = 0;
	        var buffer, byteLength, length, klass;
	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!fails(function () {
	      TypedArray(1);
	    }) || !fails(function () {
	      new TypedArray(-1); // eslint-disable-line no-new
	    }) || !$iterDetect(function (iter) {
	      new TypedArray(); // eslint-disable-line no-new
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(1.5); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject(data)) return new Base(toIndex(data));
	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR];
	    var CORRECT_ITER_NAME = !!$nativeIterator
	      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
	    var $iterator = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP(TypedArrayPrototype, TAG, {
	        get: function () { return NAME; }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES
	    });

	    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
	      from: $from,
	      of: $of
	    });

	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export($export.P, NAME, proto);

	    setSpecies(NAME);

	    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

	    $export($export.P + $export.F * fails(function () {
	      new TypedArray(1).slice();
	    }), NAME, { slice: $slice });

	    $export($export.P + $export.F * (fails(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, { toLocaleString: $toLocaleString });

	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function () { /* empty */ };
	});

	_typedArray('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

	_typedArray('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)



	var rApply = (_global.Reflect || {}).apply;
	var fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	_export(_export.S + _export.F * !_fails(function () {
	  rApply(function () { /* empty */ });
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = _aFunction(target);
	    var L = _anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])







	var rConstruct = (_global.Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = _fails(function () {
	  function F() { /* empty */ }
	  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !_fails(function () {
	  rConstruct(function () { /* empty */ });
	});

	_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /* , newTarget */) {
	    _aFunction(Target);
	    _anObject(args);
	    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (_bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return _isObject(result) ? result : instance;
	  }
	});

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)





	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	_export(_export.S + _export.F * _fails(function () {
	  // eslint-disable-next-line no-undef
	  Reflect.defineProperty(_objectDp.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    _anObject(target);
	    propertyKey = _toPrimitive(propertyKey, true);
	    _anObject(attributes);
	    try {
	      _objectDp.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)

	var gOPD$3 = _objectGopd.f;


	_export(_export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD$3(_anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

	// 26.1.5 Reflect.enumerate(target)


	var Enumerate = function (iterated) {
	  this._t = _anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = [];      // keys
	  var key;
	  for (key in iterated) keys.push(key);
	};
	_iterCreate(Enumerate, 'Object', function () {
	  var that = this;
	  var keys = that._k;
	  var key;
	  do {
	    if (that._i >= keys.length) return { value: undefined, done: true };
	  } while (!((key = keys[that._i++]) in that._t));
	  return { value: key, done: false };
	});

	_export(_export.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])







	function get(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (_anObject(target) === receiver) return target[propertyKey];
	  if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
	}

	_export(_export.S, 'Reflect', { get: get });

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)




	_export(_export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return _objectGopd.f(_anObject(target), propertyKey);
	  }
	});

	// 26.1.8 Reflect.getPrototypeOf(target)




	_export(_export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return _objectGpo(_anObject(target));
	  }
	});

	// 26.1.9 Reflect.has(target, propertyKey)


	_export(_export.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

	// 26.1.10 Reflect.isExtensible(target)


	var $isExtensible = Object.isExtensible;

	_export(_export.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    _anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

	// all object keys, includes non-enumerable and symbols



	var Reflect$1 = _global.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = _objectGopn.f(_anObject(it));
	  var getSymbols = _objectGops.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	// 26.1.11 Reflect.ownKeys(target)


	_export(_export.S, 'Reflect', { ownKeys: _ownKeys });

	// 26.1.12 Reflect.preventExtensions(target)


	var $preventExtensions = Object.preventExtensions;

	_export(_export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    _anObject(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])









	function set(target, propertyKey, V /* , receiver */) {
	  var receiver = arguments.length < 4 ? target : arguments[3];
	  var ownDesc = _objectGopd.f(_anObject(target), propertyKey);
	  var existingDescriptor, proto;
	  if (!ownDesc) {
	    if (_isObject(proto = _objectGpo(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = _propertyDesc(0);
	  }
	  if (_has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !_isObject(receiver)) return false;
	    if (existingDescriptor = _objectGopd.f(receiver, propertyKey)) {
	      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
	      existingDescriptor.value = V;
	      _objectDp.f(receiver, propertyKey, existingDescriptor);
	    } else _objectDp.f(receiver, propertyKey, _propertyDesc(0, V));
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	_export(_export.S, 'Reflect', { set: set });

	// 26.1.14 Reflect.setPrototypeOf(target, proto)



	if (_setProto) _export(_export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    _setProto.check(target, proto);
	    try {
	      _setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	var includes = _core.Array.includes;

	// https://github.com/tc39/proposal-string-pad-start-end




	var _stringPad = function (that, maxLength, fillString, left) {
	  var S = String(_defined(that));
	  var stringLength = S.length;
	  var fillStr = fillString === undefined ? ' ' : String(fillString);
	  var intMaxLength = _toLength(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength;
	  var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

	// https://github.com/tc39/proposal-string-pad-start-end




	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);

	_export(_export.P + _export.F * WEBKIT_BUG, 'String', {
	  padStart: function padStart(maxLength /* , fillString = ' ' */) {
	    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

	var padStart = _core.String.padStart;

	// https://github.com/tc39/proposal-string-pad-start-end




	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG$1 = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);

	_export(_export.P + _export.F * WEBKIT_BUG$1, 'String', {
	  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
	    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

	var padEnd = _core.String.padEnd;

	_wksDefine('asyncIterator');

	var asyncIterator = _wksExt.f('asyncIterator');

	// https://github.com/tc39/proposal-object-getownpropertydescriptors






	_export(_export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = _toIobject(object);
	    var getDesc = _objectGopd.f;
	    var keys = _ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) _createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	var getOwnPropertyDescriptors = _core.Object.getOwnPropertyDescriptors;

	var isEnum$1 = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum$1.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $values = _objectToArray(false);

	_export(_export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	var values = _core.Object.values;

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = _objectToArray(true);

	_export(_export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var entries = _core.Object.entries;

	_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return _promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return _promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	var _finally = _core.Promise['finally'];

	// ie9- setTimeout & setInterval additional parameters fix



	var slice = [].slice;
	var MSIE = /MSIE .\./.test(_userAgent); // <- dirty ie9- check
	var wrap$1 = function (set) {
	  return function (fn, time /* , ...args */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : false;
	    return set(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
	    } : fn, time);
	  };
	};
	_export(_export.G + _export.B + _export.F * MSIE, {
	  setTimeout: wrap$1(_global.setTimeout),
	  setInterval: wrap$1(_global.setInterval)
	});

	_export(_export.G + _export.B, {
	  setImmediate: _task.set,
	  clearImmediate: _task.clear
	});

	var ITERATOR$4 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i$2 = 0; i$2 < collections.length; i$2++) {
	  var NAME$1 = collections[i$2];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = _global[NAME$1];
	  var proto$3 = Collection && Collection.prototype;
	  var key$1;
	  if (proto$3) {
	    if (!proto$3[ITERATOR$4]) _hide(proto$3, ITERATOR$4, ArrayValues);
	    if (!proto$3[TO_STRING_TAG]) _hide(proto$3, TO_STRING_TAG, NAME$1);
	    _iterators[NAME$1] = ArrayValues;
	    if (explicit) for (key$1 in es6_array_iterator) if (!proto$3[key$1]) _redefine(proto$3, key$1, es6_array_iterator[key$1], true);
	  }
	}

	var runtime = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	!(function(global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = module.exports;

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };
	})(
	  // In sloppy mode, unbound `this` refers to the global object, fallback to
	  // Function constructor if we're in global strict mode. That is sadly a form
	  // of indirect eval which violates Content Security Policy.
	  (function() {
	    return this || (typeof self === "object" && self);
	  })() || Function("return this")()
	);
	});

	if (commonjsGlobal._babelPolyfill && typeof console !== "undefined" && console.warn) {
	  console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " + "and may have consequences if different versions of the polyfills are applied sequentially. " + "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " + "instead to bypass the warning.");
	}

	commonjsGlobal._babelPolyfill = true;

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var CM = {
	  defaultCrossDayTime: '04:00',
	  timeHour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
	  timeMinSec: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
	  today: function () {
	    var d = new Date();
	    return d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2);
	  }(),
	  weekStringAry: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	  inBrowser: !!(typeof window != 'undefined' && window.document),
	  assign: function assign(objA, objB) {
	    for (var k in objB) {
	      objA[k] = objB[k];
	    }
	    return objA;
	  },
	  assignIf: function assignIf(objA, objB) {
	    for (var k in objB) {
	      if (!objA[k]) {
	        objA[k] = objB[k];
	      }
	    }
	    return objA;
	  },
	  clone: function clone(objA) {
	    return JSON.parse(JSON.stringify(objA));
	  },
	  findArrayTarget: function findArrayTarget(ary, testFn) {
	    for (var i = 0; i < ary.length; i++) {
	      if (testFn(ary[i])) {
	        return ary[i];
	      }
	    }
	  },
	  findAllArrayarget: function findAllArrayarget(ary, testFn) {
	    var rt = [];

	    for (var i = 0; i < ary.length; i++) {
	      if (testFn(ary[i])) {
	        rt.push(ary[i]);
	      }
	    }

	    return rt;
	  },
	  transTime2Date: function transTime2Date(time) {
	    var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
	    var d = _typeof(time) == 'object' && typeof time.getTime == 'function' ? time : new Date(time).getTime();
	    return d.getFullYear() + str + ("0" + (d.getMonth() + 1)).slice(-2) + str + ("0" + d.getDate()).slice(-2);
	  },
	  weekArray2WeekStr: function weekArray2WeekStr(week) {
	    return week.map(function (c, i) {
	      return c ? i : '';
	    }).join('');
	  },
	  appendNumber0: function appendNumber0(str) {
	    var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	    str = str.toString();

	    if (str.length < len) {
	      var pr = len - str.length;

	      for (var i = 0; i < pr; i++) {
	        str = '0' + str;
	      }
	    }

	    return str;
	  },
	  transTime2Sec: function transTime2Sec(str, offsetTomorrow) {
	    if (str == null || str == '') {
	      str = '0';
	    }

	    var aryA = str.split(':'),
	        rt;

	    if (aryA.length <= 1) {
	      rt = parseInt(str, 10);
	    } else if (aryA.length == 2) {
	      rt = parseInt(aryA[0], 10) * 3600 + parseInt(aryA[1], 10) * 60;
	    } else if (aryA.length == 3) {
	      rt = parseInt(aryA[0], 10) * 3600 + parseInt(aryA[1], 10) * 60 + parseInt(aryA[2], 10);
	    }

	    if (offsetTomorrow && rt < this.transTime2Sec(this.defaultCrossDayTime)) {
	      rt = rt + 86400;
	    }

	    return rt;
	  },
	  transSec2Time: function transSec2Time(sec, doNotTransOver24) {
	    var tih = 0,
	        tim = 0,
	        tis = 0;

	    if (sec === '') {
	      return '';
	    } else if (parseInt(sec, 10) < 0) {
	      sec = 86400 + sec;
	    } else if (parseInt(sec) >= 86400 && !doNotTransOver24) {
	      sec = sec - 86400;
	    }

	    sec = parseInt(sec, 10);
	    tis = sec % 60;
	    sec = sec - tis;
	    sec = sec / 60;
	    tim = sec % 60;
	    sec = sec - tim;
	    sec = sec / 60;
	    tih = sec;
	    tih = tih < 10 ? '0' + tih : tih;
	    tim = tim < 10 ? '0' + tim : tim;
	    tis = tis < 10 ? '0' + tis : tis;
	    return tih + ':' + tim;
	  }
	};
	CM.statusCode = {
	  SUCCESS: 'success',
	  FAIL: 'fail'
	};
	CM.CONST_PTX_API_SUCCESS = CM.statusCode.SUCCESS;
	CM.CONST_PTX_API_FAIL = CM.statusCode.FAIL;
	CM.CONST_PTX_API_MSG_COMM_FAILED = 'Communication failed, no response. (通訊失敗，PTX 無法取回資料。)';
	CM.v2url = 'https://ptx.transportdata.tw/MOTC/v2';
	CM.v3url = 'https://ptx.transportdata.tw/MOTC/v3';
	CM.ptxURL = CM.v2url;
	CM.ptxV3URL = CM.v3url;
	CM.metroURL = CM.ptxURL + '/Rail/Metro';
	CM.busURL = CM.ptxURL + '/Bus';
	CM.traURL = CM.ptxURL + '/Rail/TRA';
	CM.traV3URL = CM.ptxV3URL + '/Rail/TRA';
	CM.thsrV2URL = CM.ptxURL + '/Rail/THSR';
	CM.ptxMRTWeekStr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	CM.defaultCrossDayTimeSec = CM.transTime2Sec(CM.defaultCrossDayTime);
	CM.pui = {
	  printStatus: function printStatus() {
	    if ((typeof TT === "undefined" ? "undefined" : _typeof(TT)) == 'object' && TT.ui && TT.ui.printStatus) {
	      TT.ui.printStatus.apply(TT.ui, arguments);
	    }
	  },
	  msg: {
	    show: function show() {
	      if ((typeof TT === "undefined" ? "undefined" : _typeof(TT)) == 'object' && TT.ui && TT.ui.msg && TT.ui.msg.show) {
	        TT.ui.msg.show.apply(TT.ui, arguments);
	      }
	    },
	    alert: function alert() {
	      if ((typeof TT === "undefined" ? "undefined" : _typeof(TT)) == 'object' && TT.ui && TT.ui.msg && TT.ui.msg.alert) {
	        TT.ui.msg.alert.apply(TT.ui, arguments);
	      }
	    }
	  },
	  mask: function mask() {
	    if ((typeof TT === "undefined" ? "undefined" : _typeof(TT)) == 'object' && TT.ui && TT.ui.mask) {
	      TT.ui.mask.apply(TT.ui, arguments);
	    }
	  },
	  unmask: function unmask() {
	    if ((typeof TT === "undefined" ? "undefined" : _typeof(TT)) == 'object' && TT.ui && TT.ui.unmask) {
	      TT.ui.unmask.apply(TT.ui, arguments);
	    }
	  }
	};

	var me = {}; //jsSHA function start

	(function (G) {
	  function r(d, b, c) {
	    var h = 0,
	        a = [],
	        f = 0,
	        g,
	        m,
	        k,
	        e,
	        l,
	        p,
	        q,
	        t,
	        w = !1,
	        n = [],
	        u = [],
	        v,
	        r = !1;
	    c = c || {};
	    g = c.encoding || "UTF8";
	    v = c.numRounds || 1;
	    if (v !== parseInt(v, 10) || 1 > v) throw Error("numRounds must a integer >= 1");
	    if ("SHA-1" === d) l = 512, p = z, q = H, e = 160, t = function t(a) {
	      return a.slice();
	    };else throw Error("Chosen SHA variant is not supported");
	    k = A(b, g);
	    m = x(d);

	    this.setHMACKey = function (a, f, b) {
	      var c;
	      if (!0 === w) throw Error("HMAC key already set");
	      if (!0 === r) throw Error("Cannot set HMAC key after calling update");
	      g = (b || {}).encoding || "UTF8";
	      f = A(f, g)(a);
	      a = f.binLen;
	      f = f.value;
	      c = l >>> 3;
	      b = c / 4 - 1;

	      if (c < a / 8) {
	        for (f = q(f, a, 0, x(d), e); f.length <= b;) {
	          f.push(0);
	        }

	        f[b] &= 4294967040;
	      } else if (c > a / 8) {
	        for (; f.length <= b;) {
	          f.push(0);
	        }

	        f[b] &= 4294967040;
	      }

	      for (a = 0; a <= b; a += 1) {
	        n[a] = f[a] ^ 909522486, u[a] = f[a] ^ 1549556828;
	      }

	      m = p(n, m);
	      h = l;
	      w = !0;
	    };

	    this.update = function (e) {
	      var b,
	          g,
	          c,
	          d = 0,
	          q = l >>> 5;
	      b = k(e, a, f);
	      e = b.binLen;
	      g = b.value;
	      b = e >>> 5;

	      for (c = 0; c < b; c += q) {
	        d + l <= e && (m = p(g.slice(c, c + q), m), d += l);
	      }

	      h += d;
	      a = g.slice(d >>> 5);
	      f = e % l;
	      r = !0;
	    };

	    this.getHash = function (b, g) {
	      var c, k, l, p;
	      if (!0 === w) throw Error("Cannot call getHash after setting HMAC key");
	      l = B(g);

	      switch (b) {
	        case "HEX":
	          c = function c(a) {
	            return C(a, e, l);
	          };

	          break;

	        case "B64":
	          c = function c(a) {
	            return D(a, e, l);
	          };

	          break;

	        case "BYTES":
	          c = function c(a) {
	            return E(a, e);
	          };

	          break;

	        case "ARRAYBUFFER":
	          try {
	            k = new ArrayBuffer(0);
	          } catch (I) {
	            throw Error("ARRAYBUFFER not supported by this environment");
	          }

	          c = function c(a) {
	            return F(a, e);
	          };

	          break;

	        default:
	          throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
	      }

	      p = q(a.slice(), f, h, t(m), e);

	      for (k = 1; k < v; k += 1) {
	        p = q(p, e, 0, x(d), e);
	      }

	      return c(p);
	    };

	    this.getHMAC = function (b, g) {
	      var c, k, n, r;
	      if (!1 === w) throw Error("Cannot call getHMAC without first setting HMAC key");
	      n = B(g);

	      switch (b) {
	        case "HEX":
	          c = function c(a) {
	            return C(a, e, n);
	          };

	          break;

	        case "B64":
	          c = function c(a) {
	            return D(a, e, n);
	          };

	          break;

	        case "BYTES":
	          c = function c(a) {
	            return E(a, e);
	          };

	          break;

	        case "ARRAYBUFFER":
	          try {
	            c = new ArrayBuffer(0);
	          } catch (I) {
	            throw Error("ARRAYBUFFER not supported by this environment");
	          }

	          c = function c(a) {
	            return F(a, e);
	          };

	          break;

	        default:
	          throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
	      }

	      k = q(a.slice(), f, h, t(m), e);
	      r = p(u, x(d));
	      r = q(k, e, l, r, e);
	      return c(r);
	    };
	  }

	  function C(d, b, c) {
	    var h = "";
	    b /= 8;
	    var a, f;

	    for (a = 0; a < b; a += 1) {
	      f = d[a >>> 2] >>> 8 * (3 + a % 4 * -1), h += "0123456789abcdef".charAt(f >>> 4 & 15) + "0123456789abcdef".charAt(f & 15);
	    }

	    return c.outputUpper ? h.toUpperCase() : h;
	  }

	  function D(d, b, c) {
	    var h = "",
	        a = b / 8,
	        f,
	        g,
	        m;

	    for (f = 0; f < a; f += 3) {
	      for (g = f + 1 < a ? d[f + 1 >>> 2] : 0, m = f + 2 < a ? d[f + 2 >>> 2] : 0, m = (d[f >>> 2] >>> 8 * (3 + f % 4 * -1) & 255) << 16 | (g >>> 8 * (3 + (f + 1) % 4 * -1) & 255) << 8 | m >>> 8 * (3 + (f + 2) % 4 * -1) & 255, g = 0; 4 > g; g += 1) {
	        8 * f + 6 * g <= b ? h += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(m >>> 6 * (3 - g) & 63) : h += c.b64Pad;
	      }
	    }

	    return h;
	  }

	  function E(d, b) {
	    var c = "",
	        h = b / 8,
	        a,
	        f;

	    for (a = 0; a < h; a += 1) {
	      f = d[a >>> 2] >>> 8 * (3 + a % 4 * -1) & 255, c += String.fromCharCode(f);
	    }

	    return c;
	  }

	  function F(d, b) {
	    var c = b / 8,
	        h,
	        a = new ArrayBuffer(c),
	        f;
	    f = new Uint8Array(a);

	    for (h = 0; h < c; h += 1) {
	      f[h] = d[h >>> 2] >>> 8 * (3 + h % 4 * -1) & 255;
	    }

	    return a;
	  }

	  function B(d) {
	    var b = {
	      outputUpper: !1,
	      b64Pad: "=",
	      shakeLen: -1
	    };
	    d = d || {};
	    b.outputUpper = d.outputUpper || !1;
	    !0 === d.hasOwnProperty("b64Pad") && (b.b64Pad = d.b64Pad);
	    if ("boolean" !== typeof b.outputUpper) throw Error("Invalid outputUpper formatting option");
	    if ("string" !== typeof b.b64Pad) throw Error("Invalid b64Pad formatting option");
	    return b;
	  }

	  function A(d, b) {
	    var c;

	    switch (b) {
	      case "UTF8":
	      case "UTF16BE":
	      case "UTF16LE":
	        break;

	      default:
	        throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");
	    }

	    switch (d) {
	      case "HEX":
	        c = function c(b, a, f) {
	          var g = b.length,
	              c,
	              d,
	              e,
	              l,
	              p;
	          if (0 !== g % 2) throw Error("String of HEX type must be in byte increments");
	          a = a || [0];
	          f = f || 0;
	          p = f >>> 3;

	          for (c = 0; c < g; c += 2) {
	            d = parseInt(b.substr(c, 2), 16);
	            if (isNaN(d)) throw Error("String of HEX type contains invalid characters");
	            l = (c >>> 1) + p;

	            for (e = l >>> 2; a.length <= e;) {
	              a.push(0);
	            }

	            a[e] |= d << 8 * (3 + l % 4 * -1);
	          }

	          return {
	            value: a,
	            binLen: 4 * g + f
	          };
	        };

	        break;

	      case "TEXT":
	        c = function c(_c, a, f) {
	          var g,
	              d,
	              k = 0,
	              e,
	              l,
	              p,
	              q,
	              t,
	              n;
	          a = a || [0];
	          f = f || 0;
	          p = f >>> 3;
	          if ("UTF8" === b) for (n = 3, e = 0; e < _c.length; e += 1) {
	            for (g = _c.charCodeAt(e), d = [], 128 > g ? d.push(g) : 2048 > g ? (d.push(192 | g >>> 6), d.push(128 | g & 63)) : 55296 > g || 57344 <= g ? d.push(224 | g >>> 12, 128 | g >>> 6 & 63, 128 | g & 63) : (e += 1, g = 65536 + ((g & 1023) << 10 | _c.charCodeAt(e) & 1023), d.push(240 | g >>> 18, 128 | g >>> 12 & 63, 128 | g >>> 6 & 63, 128 | g & 63)), l = 0; l < d.length; l += 1) {
	              t = k + p;

	              for (q = t >>> 2; a.length <= q;) {
	                a.push(0);
	              }

	              a[q] |= d[l] << 8 * (n + t % 4 * -1);
	              k += 1;
	            }
	          } else if ("UTF16BE" === b || "UTF16LE" === b) for (n = 2, e = 0; e < _c.length; e += 1) {
	            g = _c.charCodeAt(e);
	            "UTF16LE" === b && (l = g & 255, g = l << 8 | g >>> 8);
	            t = k + p;

	            for (q = t >>> 2; a.length <= q;) {
	              a.push(0);
	            }

	            a[q] |= g << 8 * (n + t % 4 * -1);
	            k += 2;
	          }
	          return {
	            value: a,
	            binLen: 8 * k + f
	          };
	        };

	        break;

	      case "B64":
	        c = function c(b, a, f) {
	          var c = 0,
	              d,
	              k,
	              e,
	              l,
	              p,
	              q,
	              n;
	          if (-1 === b.search(/^[a-zA-Z0-9=+\/]+$/)) throw Error("Invalid character in base-64 string");
	          k = b.indexOf("=");
	          b = b.replace(/\=/g, "");
	          if (-1 !== k && k < b.length) throw Error("Invalid '=' found in base-64 string");
	          a = a || [0];
	          f = f || 0;
	          q = f >>> 3;

	          for (k = 0; k < b.length; k += 4) {
	            p = b.substr(k, 4);

	            for (e = l = 0; e < p.length; e += 1) {
	              d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(p[e]), l |= d << 18 - 6 * e;
	            }

	            for (e = 0; e < p.length - 1; e += 1) {
	              n = c + q;

	              for (d = n >>> 2; a.length <= d;) {
	                a.push(0);
	              }

	              a[d] |= (l >>> 16 - 8 * e & 255) << 8 * (3 + n % 4 * -1);
	              c += 1;
	            }
	          }

	          return {
	            value: a,
	            binLen: 8 * c + f
	          };
	        };

	        break;

	      case "BYTES":
	        c = function c(b, a, _c2) {
	          var d, m, k, e, l;
	          a = a || [0];
	          _c2 = _c2 || 0;
	          k = _c2 >>> 3;

	          for (m = 0; m < b.length; m += 1) {
	            d = b.charCodeAt(m), l = m + k, e = l >>> 2, a.length <= e && a.push(0), a[e] |= d << 8 * (3 + l % 4 * -1);
	          }

	          return {
	            value: a,
	            binLen: 8 * b.length + _c2
	          };
	        };

	        break;

	      case "ARRAYBUFFER":
	        try {
	          c = new ArrayBuffer(0);
	        } catch (h) {
	          throw Error("ARRAYBUFFER not supported by this environment");
	        }

	        c = function c(b, a, _c3) {
	          var d, m, k, e, l;
	          a = a || [0];
	          _c3 = _c3 || 0;
	          m = _c3 >>> 3;
	          l = new Uint8Array(b);

	          for (d = 0; d < b.byteLength; d += 1) {
	            e = d + m, k = e >>> 2, a.length <= k && a.push(0), a[k] |= l[d] << 8 * (3 + e % 4 * -1);
	          }

	          return {
	            value: a,
	            binLen: 8 * b.byteLength + _c3
	          };
	        };

	        break;

	      default:
	        throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
	    }

	    return c;
	  }

	  function n(d, b) {
	    return d << b | d >>> 32 - b;
	  }

	  function u(d, b) {
	    var c = (d & 65535) + (b & 65535);
	    return ((d >>> 16) + (b >>> 16) + (c >>> 16) & 65535) << 16 | c & 65535;
	  }

	  function y(d, b, c, h, a) {
	    var f = (d & 65535) + (b & 65535) + (c & 65535) + (h & 65535) + (a & 65535);
	    return ((d >>> 16) + (b >>> 16) + (c >>> 16) + (h >>> 16) + (a >>> 16) + (f >>> 16) & 65535) << 16 | f & 65535;
	  }

	  function x(d) {
	    var b = [];
	    if ("SHA-1" === d) b = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];else throw Error("No SHA variants supported");
	    return b;
	  }

	  function z(d, b) {
	    var c = [],
	        h,
	        a,
	        f,
	        g,
	        m,
	        k,
	        e;
	    h = b[0];
	    a = b[1];
	    f = b[2];
	    g = b[3];
	    m = b[4];

	    for (e = 0; 80 > e; e += 1) {
	      c[e] = 16 > e ? d[e] : n(c[e - 3] ^ c[e - 8] ^ c[e - 14] ^ c[e - 16], 1), k = 20 > e ? y(n(h, 5), a & f ^ ~a & g, m, 1518500249, c[e]) : 40 > e ? y(n(h, 5), a ^ f ^ g, m, 1859775393, c[e]) : 60 > e ? y(n(h, 5), a & f ^ a & g ^ f & g, m, 2400959708, c[e]) : y(n(h, 5), a ^ f ^ g, m, 3395469782, c[e]), m = g, g = f, f = n(a, 30), a = h, h = k;
	    }

	    b[0] = u(h, b[0]);
	    b[1] = u(a, b[1]);
	    b[2] = u(f, b[2]);
	    b[3] = u(g, b[3]);
	    b[4] = u(m, b[4]);
	    return b;
	  }

	  function H(d, b, c, h) {
	    var a;

	    for (a = (b + 65 >>> 9 << 4) + 15; d.length <= a;) {
	      d.push(0);
	    }

	    d[b >>> 5] |= 128 << 24 - b % 32;
	    b += c;
	    d[a] = b & 4294967295;
	    d[a - 1] = b / 4294967296 | 0;
	    b = d.length;

	    for (a = 0; a < b; a += 16) {
	      h = z(d.slice(a, a + 16), h);
	    }

	    return h;
	  }

	  "function" === typeof define && define.amd ? define(function () {
	    return r;
	  }) : "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (module.exports = r), exports = r) : G.jsSHA = r;
	})(me); //jsSHA function end


	var jsSHA = me.jsSHA;

	var fnTRTC = function fnTRTC() {
	  return ptx.trtc;
	};

	var ptx = {
	  statusCode: CM.statusCode,
	  timeout: 30000,
	  tempTimeTable: {},
	  throwError: function throwError(str) {
	    throw str;
	  },
	  filterParam: function filterParam(field, op, value, andOr) {
	    //field 及 value可為陣列，其中一者為陣列時將用 andOr 連接，但當兩者皆為陣列時必需長度一致以便配對連接
	    //ptx.filterParam(['fdfsd/fdfd','fdfd/gfg','fgf'],'<',[325,'ggg',996],'AND')
	    andOr = andOr || 'or';
	    andOr = andOr.toLowerCase();
	    var opMap = {
	      '=': 'eq',
	      '==': 'eq',
	      '===': 'eq',
	      '!=': 'ne',
	      '!==': 'ne',
	      '!': 'not',
	      '>': 'gt',
	      '>=': 'ge',
	      '<': 'lt',
	      '<=': 'le'
	    };
	    var op2 = opMap[op] || op;

	    if (_typeof(field) == 'object' && _typeof(value) == 'object' && field.length != value.length) {
	      ptx.throwError('Not equal length of filterParam filed and value;');
	      return false;
	    }

	    if (_typeof(field) != 'object') {
	      field = [field];
	    }

	    if (_typeof(value) != 'object') {
	      value = [value];
	    }

	    var cnt = field.length > value.length ? field.length : value.length;
	    var tmpField,
	        tmpValue,
	        stringAry = [];

	    for (var i = 0; i < cnt; i++) {
	      tmpField = field[i] || field[0];
	      tmpValue = value[i] || value[0];
	      if (typeof tmpValue == 'string') tmpValue = "'" + tmpValue + "'";
	      stringAry.push(tmpField + ' ' + op2 + ' ' + tmpValue);
	    }

	    return stringAry.join(' ' + andOr + ' ');
	  },
	  filterFn: function filterFn(param) {
	    return encodeURI('$filter=' + param);
	  },
	  orderByFn: function orderByFn(field, dir) {
	    dir = dir && typeof dir == 'string' ? ' ' + dir.toLowerCase() : '';
	    return encodeURI('$orderby=' + arguments[0] + dir);
	  },
	  spatialFilterFn: function spatialFilterFn(lat, lng) {
	    var far = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
	    var field = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'StationPosition';
	    //預設對 PTX 找 200 公尺範圍的
	    return encodeURI('$spatialFilter=nearby(' + field + ', ' + lat + ', ' + lng + ', ' + far + ')');
	  },
	  topFn: function topFn(top, formatStr) {
	    top = top || 3000;
	    formatStr = formatStr || 'JSON';
	    return '$top=' + top + '&format=' + formatStr;
	  },
	  selectFieldFn: function selectFieldFn(str) {
	    if (_typeof(str) == 'object' && str.length) {
	      str = str.join(',');
	    }

	    return encodeURI('$select=' + str);
	  },
	  GetAuthorizationHeader: function GetAuthorizationHeader() {
	    var AppID = ptx.AppID || 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
	    var AppKey = ptx.AppKey || 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
	    var GMTString = new Date().toGMTString();
	    var ShaObj = new jsSHA('SHA-1', 'TEXT');
	    ShaObj.setHMACKey(AppKey, 'TEXT');
	    ShaObj.update('x-date: ' + GMTString);
	    var HMAC = ShaObj.getHMAC('B64');
	    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
	    return {
	      'Authorization': Authorization,
	      'X-Date': GMTString
	    };
	  },
	  getTakeMRTTimeTable: function getTakeMRTTimeTable(mrtPTXAry, w, cbFn) {
	    var rtStatus = [];

	    function runGet(arr) {
	      if (arr.length == 0) {
	        cbFn(rtStatus, ptx.tempTimeTable);
	      } else {
	        var obj = arr.shift();

	        if (obj.company == 'trtc') {
	          var LineID = fnTRTC().getLineID(obj.line),
	              StationID = fnTRTC().getStationID(obj.takeRange[0], obj.line),
	              targetID = fnTRTC().getStationID(obj.takeRange[1], obj.line);
	          fnTRTC().getStationTime(LineID, [StationID, targetID], parseInt(w), function (json) {
	            var rts = {
	              LineID: LineID,
	              StationID: StationID,
	              targetID: targetID
	            };

	            if (json == CM.CONST_PTX_API_FAIL) {
	              rts.status = CM.CONST_PTX_API_FAIL;
	              rts.message = CM.CONST_PTX_API_MSG_COMM_FAILED;
	              rtStatus.push(rts);
	              runGet(arr);
	            } else {
	              rts.status = CM.CONST_PTX_API_SUCCESS;
	              rtStatus.push(rts);
	              runGet(arr);
	            }
	          });
	        }
	      }
	    }

	    runGet(mrtPTXAry);
	  },
	  getURL: function getURL(url, cbFn) {
	    function reqListener(xhr) {
	      var event = {
	        xhr: xhr,
	        data: xhr.target.response
	      };

	      if (xhr.target.readyState == 4 && xhr.target.status == 200) {
	        event.status = CM.CONST_PTX_API_SUCCESS;
	        cbFn(JSON.parse(xhr.target.response), event);
	      } else {
	        event.status = CM.CONST_PTX_API_FAIL;
	        cbFn(xhr.target.response, event);
	      }
	    }

	    var fm = new XMLHttpRequest();
	    fm.addEventListener("load", reqListener);
	    fm.addEventListener("error", reqListener);
	    fm.addEventListener("abort", reqListener);
	    fm.addEventListener("timeout", reqListener);
	    fm.open('GET', url);
	    fm.timeout = ptx.timeout;
	    var headerObj = this.GetAuthorizationHeader();

	    for (var k in headerObj) {
	      fm.setRequestHeader(k, headerObj[k]);
	    }

	    fm.send();
	  },
	  getPromiseURL: function getPromiseURL(url) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    return new Promise(function (resolve, reject) {
	      function reqListener(xhr) {
	        var event = {
	          xhr: xhr,
	          url: url,
	          config: cfg,
	          resolve: resolve,
	          reject: reject,
	          response: xhr.target.response
	        };

	        if (xhr.target.readyState == 4 && xhr.target.status == 200) {
	          event.status = CM.CONST_PTX_API_SUCCESS;
	          event.data = JSON.parse(xhr.target.response);

	          if (typeof cfg.processJSON == 'function') {
	            event.data = cfg.processJSON(event.data);
	          }

	          resolve(event);
	        } else {
	          event.status = CM.CONST_PTX_API_FAIL;
	          reject(event);
	        }
	      }

	      var fm = new XMLHttpRequest();
	      fm.addEventListener("load", reqListener);
	      fm.addEventListener("error", reqListener);
	      fm.addEventListener("abort", reqListener);
	      fm.addEventListener("timeout", reqListener);
	      var method = cfg.method || 'GET';
	      fm.open(method, url);
	      fm.timeout = cfg.timeout || ptx.timeout;
	      var headerObj = cfg.head || ptx.GetAuthorizationHeader();

	      for (var k in headerObj) {
	        fm.setRequestHeader(k, headerObj[k]);
	      }

	      fm.send();
	    });
	  },
	  getStationLiveInfo: function getStationLiveInfo(stid, cbFn) {
	    stid = stid ? stid.replace('tra_', '') : '1008';

	    cbFn = cbFn || function (data) {
	      console.info(data);
	    };

	    var url = traURL + '/LiveBoard/Station/' + stid + '?$top=30&$format=JSON';
	    this.getURL(url, cbFn);
	  },
	  getStationTodayTime: function getStationTodayTime(stid, cbFn) {
	    stid = stid ? stid.replace('tra_', '') : '1008';

	    cbFn = cbFn || function (data) {
	      console.info(data);
	    };

	    var url = traURL + '/DailyTimetable/Station/' + stid + '/' + TT.goingData.today + '?$top=3000&$format=JSON';
	    this.getURL(url, cbFn);
	  },
	  sortByTTSortTime: function sortByTTSortTime(a, b) {
	    var intA = parseInt(a.tt_sortTime, 10);
	    var intB = parseInt(b.tt_sortTime, 10);
	    if (intA == intB) return 0;
	    if (intA < intB) return -1;
	    if (intA > intB) return 1;
	  }
	};

	var pData = {
	  sect_ary: ['pingdong', 'kaohsiung', 'tainan', 'chiayi', 'yunlin', 'changhua', 'taichung', 'miaoli', 'hsinchu', 'taoyuan', 'taipei', 'keelung', 'northeast', 'yilan', 'beihui', 'hualian', 'taidong'],
	  bus: {
	    city: [{
	      name: '臺北市',
	      City: 'Taipei',
	      CityCode: 'TPE'
	    }, {
	      name: '新北市',
	      City: 'NewTaipei',
	      CityCode: 'NWT'
	    }, {
	      name: '桃園市',
	      City: 'Taoyuan',
	      CityCode: 'TAO'
	    }, {
	      name: '臺中市',
	      City: 'Taichung',
	      CityCode: 'TXG'
	    }, {
	      name: '臺南市',
	      City: 'Tainan',
	      CityCode: 'TNN'
	    }, {
	      name: '高雄市',
	      City: 'Kaohsiung',
	      CityCode: 'KHH'
	    }, {
	      name: '基隆市',
	      City: 'Keelung',
	      CityCode: 'KEE'
	    }, {
	      name: '新竹市',
	      City: 'Hsinchu',
	      CityCode: 'HSZ'
	    }, {
	      name: '新竹縣',
	      City: 'HsinchuCounty',
	      CityCode: 'HSQ'
	    }, {
	      name: '苗栗縣',
	      City: 'MiaoliCounty',
	      CityCode: 'MIA'
	    }, {
	      name: '彰化縣',
	      City: 'ChanghuaCounty',
	      CityCode: 'CHA'
	    }, {
	      name: '南投縣',
	      City: 'NantouCounty',
	      CityCode: 'NAN'
	    }, {
	      name: '雲林縣',
	      City: 'YunlinCounty',
	      CityCode: 'YUN'
	    }, {
	      name: '嘉義縣',
	      City: 'ChiayiCounty',
	      CityCode: 'CYQ'
	    }, {
	      name: '嘉義市',
	      City: 'Chiayi',
	      CityCode: 'CYI'
	    }, {
	      name: '屏東縣',
	      City: 'PingtungCounty',
	      CityCode: 'PIF'
	    }, {
	      name: '宜蘭縣',
	      City: 'YilanCounty',
	      CityCode: 'ILA'
	    }, {
	      name: '花蓮縣',
	      City: 'HualienCounty',
	      CityCode: 'HUA'
	    }, {
	      name: '臺東縣',
	      City: 'TaitungCounty',
	      CityCode: 'TTT'
	    }, {
	      name: '金門縣',
	      City: 'KinmenCounty',
	      CityCode: 'KIN'
	    }, {
	      name: '澎湖縣',
	      City: 'PenghuCounty',
	      CityCode: 'PEN'
	    }, {
	      name: '連江縣',
	      City: 'LienchiangCounty',
	      CityCode: 'LIE'
	    }]
	  },
	  trtc: {
	    station_ary: [//Wenhu Line
	    {
	      id: "trtc_br01",
	      StationID: ["BR01"],
	      name: "動物園",
	      estring: "dongwuyuantaipeizoo"
	    }, {
	      id: "trtc_br02",
	      StationID: ["BR02"],
	      name: "木柵",
	      estring: "muzha"
	    }, {
	      id: "trtc_br03",
	      StationID: ["BR03"],
	      name: "萬芳社區",
	      estring: "wanfangshequwanfangcommunity"
	    }, {
	      id: "trtc_br04",
	      StationID: ["BR04"],
	      name: "萬芳醫院",
	      estring: "dongwuyuantaipeizoo"
	    }, {
	      id: "trtc_br05",
	      StationID: ["BR05"],
	      name: "辛亥",
	      estring: "xinhai"
	    }, {
	      id: "trtc_br06",
	      StationID: ["BR06"],
	      name: "麟光",
	      estring: "linguang"
	    }, {
	      id: "trtc_br07",
	      StationID: ["BR07"],
	      name: "六張犁",
	      estring: "liuzhangli"
	    }, {
	      id: "trtc_br08",
	      StationID: ["BR08"],
	      name: "科技大樓",
	      estring: "kejidaloutechnologybuilding"
	    }, {
	      id: "trtc_br12",
	      StationID: ["BR12"],
	      name: "中山國中",
	      estring: "zhongshanguozhongzhongshanjuniorhighschool"
	    }, {
	      id: "trtc_br13",
	      StationID: ["BR13"],
	      name: "松山機場",
	      estring: "songshanjichangsongshanairport"
	    }, {
	      id: "trtc_br14",
	      StationID: ["BR14"],
	      name: "大直",
	      estring: "dazhi"
	    }, {
	      id: "trtc_br15",
	      StationID: ["BR15"],
	      name: "劍南路",
	      estring: "jiannanlujiannanroad"
	    }, {
	      id: "trtc_br16",
	      StationID: ["BR16"],
	      name: "西湖",
	      estring: "xihu"
	    }, {
	      id: "trtc_br17",
	      StationID: ["BR17"],
	      name: "港墘",
	      estring: "gangqian"
	    }, {
	      id: "trtc_br18",
	      StationID: ["BR18"],
	      name: "文德",
	      estring: "wende"
	    }, {
	      id: "trtc_br19",
	      StationID: ["BR19"],
	      name: "內湖",
	      estring: "neihu"
	    }, {
	      id: "trtc_br20",
	      StationID: ["BR20"],
	      name: "大湖公園",
	      estring: "dahugongyuandahupark"
	    }, {
	      id: "trtc_br21",
	      StationID: ["BR21"],
	      name: "葫洲",
	      estring: "huzhou"
	    }, {
	      id: "trtc_br22",
	      StationID: ["BR22"],
	      name: "東湖",
	      estring: "donghu"
	    }, {
	      id: "trtc_br23",
	      StationID: ["BR23"],
	      name: "南港軟體園區",
	      estring: "nangangruantiyuanqunangangsoftwarepark"
	    }, //Bannan Line
	    {
	      id: "trtc_031",
	      StationID: ["BL23", "BR24"],
	      name: "南港展覽館",
	      estring: "nangangzhanlanguantaipeinangangexhibitioncenter"
	    }, {
	      id: "trtc_097",
	      StationID: ["BL22"],
	      name: "南港",
	      estring: "nangang"
	    }, {
	      id: "trtc_096",
	      StationID: ["BL21"],
	      name: "昆陽",
	      estring: "kunyang"
	    }, {
	      id: "trtc_095",
	      StationID: ["BL20"],
	      name: "後山埤",
	      estring: "houshanpi"
	    }, {
	      id: "trtc_094",
	      StationID: ["BL19"],
	      name: "永春",
	      estring: "yongchun"
	    }, {
	      id: "trtc_093",
	      StationID: ["BL18"],
	      name: "市政府",
	      estring: "taipeicityhallshizhengfu"
	    }, {
	      id: "trtc_092",
	      StationID: ["BL17"],
	      name: "國父紀念館",
	      estring: "sunyatsenmemorialhallguofujinianguan"
	    }, {
	      id: "trtc_091",
	      StationID: ["BL16"],
	      name: "忠孝敦化",
	      estring: "zhongxiaodunhua"
	    }, {
	      id: "trtc_010",
	      StationID: ["BL15", "BR10"],
	      name: "忠孝復興",
	      estring: "zhongxiaofuxing"
	    }, {
	      id: "trtc_089",
	      StationID: ["BL14", "O07"],
	      name: "忠孝新生",
	      estring: "zhongxiaoxinsheng"
	    }, {
	      id: "trtc_088",
	      StationID: ["BL13"],
	      name: "善導寺",
	      estring: "shandaosishandaotemple"
	    }, {
	      id: "trtc_086",
	      StationID: ["BL11", "G12"],
	      name: "西門",
	      estring: "ximen"
	    }, {
	      id: "trtc_085",
	      StationID: ["BL10"],
	      name: "龍山寺",
	      estring: "longshansilongshantemple"
	    }, {
	      id: "trtc_084",
	      StationID: ["BL09"],
	      name: "江子翠",
	      estring: "jiangzicui"
	    }, {
	      id: "trtc_083",
	      StationID: ["BL08"],
	      name: "新埔",
	      estring: "xinpu"
	    }, {
	      id: "trtc_082",
	      StationID: ["BL07"],
	      name: "板橋",
	      estring: "banqiao"
	    }, {
	      id: "trtc_081",
	      StationID: ["BL06"],
	      name: "府中",
	      estring: "fuzhong"
	    }, {
	      id: "trtc_080",
	      StationID: ["BL05"],
	      name: "亞東醫院",
	      estring: "yadongyiyuanfareasternhospital"
	    }, {
	      id: "trtc_079",
	      StationID: ["BL04"],
	      name: "海山",
	      estring: "haishan"
	    }, {
	      id: "trtc_078",
	      StationID: ["BL03"],
	      name: "土城",
	      estring: "tucheng"
	    }, {
	      id: "trtc_077",
	      StationID: ["BL02"],
	      name: "永寧",
	      estring: "yongning"
	    }, {
	      id: "trtc_076",
	      StationID: ["BL01"],
	      name: "頂埔",
	      estring: "dingpu"
	    }, //TamsuiXinyi Line
	    {
	      id: "trtc_071",
	      StationID: ["R28"],
	      name: "淡水",
	      estring: "danshuitamsui"
	    }, {
	      id: "trtc_070",
	      StationID: ["R27"],
	      name: "紅樹林",
	      estring: "hongshulin"
	    }, {
	      id: "trtc_069",
	      StationID: ["R26"],
	      name: "竹圍",
	      estring: "zhuwei"
	    }, {
	      id: "trtc_068",
	      StationID: ["R25"],
	      name: "關渡",
	      estring: "guandu"
	    }, {
	      id: "trtc_067",
	      StationID: ["R24"],
	      name: "忠義",
	      estring: "zhongyi"
	    }, {
	      id: "trtc_066",
	      StationID: ["R23"],
	      name: "復興崗",
	      estring: "fuxinggang"
	    }, {
	      id: "trtc_064",
	      StationID: ["R22"],
	      name: "北投",
	      estring: "beitou"
	    }, {
	      id: "trtc_063",
	      StationID: ["R21"],
	      name: "奇岩",
	      estring: "qiyan"
	    }, {
	      id: "trtc_062",
	      StationID: ["R20"],
	      name: "唭哩岸",
	      estring: "qilian"
	    }, {
	      id: "trtc_061",
	      StationID: ["R19"],
	      name: "石牌",
	      estring: "shipai"
	    }, {
	      id: "trtc_060",
	      StationID: ["R18"],
	      name: "明德",
	      estring: "mingde"
	    }, {
	      id: "trtc_059",
	      StationID: ["R17"],
	      name: "芝山",
	      estring: "zhishan"
	    }, {
	      id: "trtc_058",
	      StationID: ["R16"],
	      name: "士林",
	      estring: "shilin"
	    }, {
	      id: "trtc_057",
	      StationID: ["R15"],
	      name: "劍潭",
	      estring: "jiantan"
	    }, {
	      id: "trtc_056",
	      StationID: ["R14"],
	      name: "圓山",
	      estring: "yuanshan"
	    }, {
	      id: "trtc_055",
	      StationID: ["R13", "O11"],
	      name: "民權西路",
	      estring: "mingquanwrdmingquanxilu"
	    }, {
	      id: "trtc_054",
	      StationID: ["R12"],
	      name: "雙連",
	      estring: "shuanglian"
	    }, {
	      id: "trtc_053",
	      StationID: ["R11", "G14"],
	      name: "中山",
	      estring: "zhongshan"
	    }, {
	      id: "trtc_051",
	      StationID: ["R10", "BL12"],
	      name: "台北車站",
	      estring: "taipeichezhantaipeimainstation"
	    }, {
	      id: "trtc_050",
	      StationID: ["R09"],
	      name: "台大醫院",
	      estring: "taidayiyuanntuhospital"
	    }, {
	      id: "trtc_134",
	      StationID: ["R07", "O06"],
	      name: "東門",
	      estring: "dongmen"
	    }, {
	      id: "trtc_103",
	      StationID: ["R06"],
	      name: "大安森林公園",
	      estring: "daanparkdaansenlingongyuan"
	    }, {
	      id: "trtc_011",
	      StationID: ["R05", "BR09"],
	      name: "大安",
	      estring: "daan"
	    }, {
	      id: "trtc_101",
	      StationID: ["R04"],
	      name: "信義安和",
	      estring: "xinyianhe"
	    }, {
	      id: "trtc_100",
	      StationID: ["R03"],
	      name: "台北101/世貿",
	      estring: "taipei101worldtradecentertaipei101shimao"
	    }, {
	      id: "trtc_099",
	      StationID: ["R02"],
	      name: "象山",
	      estring: "xiangshan"
	    }, //ZhongHeXinLu Line
	    {
	      id: "trtc_048",
	      StationID: ["O01"],
	      name: "南勢角",
	      estring: "nanshijiao"
	    }, {
	      id: "trtc_047",
	      StationID: ["O02", "Y11"],
	      name: "景安",
	      estring: "jingan"
	    }, {
	      id: "trtc_046",
	      StationID: ["O03"],
	      name: "永安市場",
	      estring: "yonganshichangyonganmarket"
	    }, {
	      id: "trtc_045",
	      StationID: ["O04"],
	      name: "頂溪",
	      estring: "dingxi"
	    }, {
	      id: "trtc_131",
	      StationID: ["O09"],
	      name: "行天宮",
	      estring: "xingtiantemplexingtiangong"
	    }, {
	      id: "trtc_130",
	      StationID: ["O10"],
	      name: "中山國小",
	      estring: "zhongshanguoxiaozhongshanelementaryschool"
	    }, {
	      id: "trtc_128",
	      StationID: ["O12"],
	      name: "大橋頭",
	      estring: "daqiaotou"
	    }, {
	      id: "trtc_127",
	      StationID: ["O13"],
	      name: "台北橋",
	      estring: "taibeiqiaotaipeibridge"
	    }, {
	      id: "trtc_126",
	      StationID: ["O14"],
	      name: "菜寮",
	      estring: "cailiao"
	    }, {
	      id: "trtc_125",
	      StationID: ["O15"],
	      name: "三重",
	      estring: "sanchong"
	    }, {
	      id: "trtc_124",
	      StationID: ["O16"],
	      name: "先嗇宮",
	      estring: "xiansetemplexiansegong"
	    }, {
	      id: "trtc_123",
	      StationID: ["O17", "Y18"],
	      name: "頭前庄",
	      estring: "touqianzhuang"
	    }, {
	      id: "trtc_122",
	      StationID: ["O18"],
	      name: "新莊",
	      estring: "xinzhuang"
	    }, {
	      id: "trtc_121",
	      StationID: ["O19"],
	      name: "輔大",
	      estring: "fudafujenuniversity"
	    }, {
	      id: "trtc_180",
	      StationID: ["O20"],
	      name: "丹鳳",
	      estring: "danfeng"
	    }, {
	      id: "trtc_179",
	      StationID: ["O21"],
	      name: "迴龍",
	      estring: "huilong"
	    }, {
	      id: "trtc_178",
	      StationID: ["O50"],
	      name: "三重國小",
	      estring: "sanchongguoxiaosanchongelementaryschool"
	    }, {
	      id: "trtc_177",
	      StationID: ["O51"],
	      name: "三和國中",
	      estring: "sanheguozhongsanhejuniorhighschool"
	    }, {
	      id: "trtc_176",
	      StationID: ["O52"],
	      name: "徐匯中學",
	      estring: "xuhuizhongxuestignatiushighschool"
	    }, {
	      id: "trtc_175",
	      StationID: ["O53"],
	      name: "三民高中",
	      estring: "sanmingaozhongsanminseniorhighschool"
	    }, {
	      id: "trtc_174",
	      StationID: ["O54"],
	      name: "蘆洲",
	      estring: "luzhou"
	    }, //SongShanXinDian Line
	    {
	      id: "trtc_111",
	      StationID: ["G19"],
	      name: "松山",
	      estring: "songshan"
	    }, {
	      id: "trtc_110",
	      StationID: ["G18"],
	      name: "南京三民",
	      estring: "nanjingsanmin"
	    }, {
	      id: "trtc_109",
	      StationID: ["G17"],
	      name: "台北小巨蛋",
	      estring: "taipeiarenataibeixiaojudan"
	    }, {
	      id: "trtc_009",
	      StationID: ["G16", "BR11"],
	      name: "南京復興",
	      estring: "nanjingfuxing"
	    }, {
	      id: "trtc_132",
	      StationID: ["G15", "O08"],
	      name: "松江南京",
	      estring: "songjiangnanjing"
	    }, {
	      id: "trtc_105",
	      StationID: ["G13"],
	      name: "北門",
	      estring: "beimen"
	    }, {
	      id: "trtc_043",
	      StationID: ["G11"],
	      name: "小南門",
	      estring: "xiaonanmen"
	    }, {
	      id: "trtc_042",
	      StationID: ["G10", "R08"],
	      name: "中正紀念堂",
	      estring: "zhongzhengjiniantangchiangkaishekmemorialhall"
	    }, {
	      id: "trtc_041",
	      StationID: ["G09", "O05"],
	      name: "古亭",
	      estring: "guting"
	    }, {
	      id: "trtc_040",
	      StationID: ["G08"],
	      name: "台電大樓",
	      estring: "taidiandaloutaipowerbuilding"
	    }, {
	      id: "trtc_039",
	      StationID: ["G07"],
	      name: "公館",
	      estring: "gongguan"
	    }, {
	      id: "trtc_038",
	      StationID: ["G06"],
	      name: "萬隆",
	      estring: "wanlong"
	    }, {
	      id: "trtc_037",
	      StationID: ["G05"],
	      name: "景美",
	      estring: "jingmei"
	    }, {
	      id: "trtc_036",
	      StationID: ["G04", "Y07"],
	      name: "大坪林",
	      estring: "dapinglin"
	    }, {
	      id: "trtc_035",
	      StationID: ["G03"],
	      name: "七張",
	      estring: "qizhang"
	    }, {
	      id: "trtc_034",
	      StationID: ["G02"],
	      name: "新店區公所",
	      estring: "xindiandistrictofficexindianqugongsuo"
	    }, {
	      id: "trtc_033",
	      StationID: ["G01"],
	      name: "新店",
	      estring: "xindian"
	    }, //Circular Line
	    {
	      id: "trtc_y08",
	      StationID: ["Y08"],
	      name: "十四張",
	      estring: "shisizhang"
	    }, {
	      id: "trtc_y09",
	      StationID: ["Y09"],
	      name: "秀朗橋",
	      estring: "xiulangqiao"
	    }, {
	      id: "trtc_y10",
	      StationID: ["Y10"],
	      name: "景平",
	      estring: "jingping"
	    }, {
	      id: "trtc_y12",
	      StationID: ["Y12"],
	      name: "中和",
	      estring: "zhonghe"
	    }, {
	      id: "trtc_y13",
	      StationID: ["Y13"],
	      name: "橋和",
	      estring: "qiaohe"
	    }, {
	      id: "trtc_y14",
	      StationID: ["Y14"],
	      name: "中原",
	      estring: "zhongyuan"
	    }, {
	      id: "trtc_y15",
	      StationID: ["Y15"],
	      name: "板新",
	      estring: "banxin"
	    }, {
	      id: "trtc_y16",
	      StationID: ["Y16"],
	      name: "板橋（環狀）",
	      estring: "banqiao"
	    }, {
	      id: "trtc_y17",
	      StationID: ["Y17"],
	      name: "新埔民生",
	      estring: "xinpuminsheng"
	    }, {
	      id: "trtc_y19",
	      StationID: ["Y19"],
	      name: "幸福",
	      estring: "xingfu"
	    }, {
	      id: "trtc_y20",
	      StationID: ["Y20"],
	      name: "新北產業園區",
	      estring: "xinbeichanyeyuanqui"
	    }],
	    line: [{
	      id: 'trtc_1',
	      LineID: 'BR',
	      route: [{
	        dir: 0,
	        Direction: 0,
	        work: [{
	          RouteID: 'BR-1',
	          from: 'BR01',
	          to: 'BR24'
	        }]
	      }, {
	        dir: 1,
	        Direction: 1,
	        work: [{
	          RouteID: 'BR-1',
	          from: 'BR24',
	          to: 'BR01'
	        }]
	      }],
	      name: "文湖線(1)",
	      color: "#b57a25",
	      dir: "0",
	      station: ["trtc_br01", "trtc_br02", "trtc_br03", "trtc_br04", "trtc_br05", "trtc_br06", "trtc_br07", "trtc_br08", "trtc_011", "trtc_010", "trtc_009", "trtc_br12", "trtc_br13", "trtc_br14", "trtc_br15", "trtc_br16", "trtc_br17", "trtc_br18", "trtc_br19", "trtc_br20", "trtc_br21", "trtc_br22", "trtc_br23", "trtc_031"]
	    }, {
	      id: 'trtc_6',
	      LineID: 'Y',
	      route: [{
	        dir: 0,
	        Direction: 0,
	        work: [{
	          RouteID: 'Y-1',
	          from: 'Y07',
	          to: 'Y20'
	        }]
	      }, {
	        dir: 1,
	        Direction: 1,
	        work: [{
	          RouteID: 'Y-1',
	          from: 'Y20',
	          to: 'Y07'
	        }]
	      }],
	      name: "環狀線(6)",
	      color: "#ffdb00",
	      dir: "0",
	      station: ["trtc_036", "trtc_y08", "trtc_y09", "trtc_y10", "trtc_047", "trtc_y12", "trtc_y13", "trtc_y14", "trtc_y15", "trtc_y16", "trtc_y17", "trtc_123", "trtc_y19", "trtc_y20"]
	    }, {
	      id: 'trtc_2',
	      LineID: 'R',
	      route: [{
	        dir: 0,
	        Direction: 0,
	        work: [{
	          RouteID: 'R-1',
	          from: 'R02',
	          to: 'R28'
	        }, {
	          RouteID: 'R-2',
	          from: 'R05',
	          to: 'R22'
	        }]
	      }, {
	        dir: 1,
	        Direction: 1,
	        work: [{
	          RouteID: 'R-1',
	          from: 'R28',
	          to: 'R02'
	        }, {
	          RouteID: 'R-2',
	          from: 'R22',
	          to: 'R05'
	        }]
	      }],
	      name: "淡水信義線(2)",
	      color: "#cb2c30",
	      dir: "1",
	      outArea: [{
	        dir: "1",
	        station: "trtc_071~trtc_066",
	        transAt: "trtc_064",
	        waitingNextMinute: 4
	      }, {
	        dir: "1",
	        station: "trtc_101~trtc_099",
	        transAt: "trtc_011",
	        waitingNextMinute: 4
	      }],
	      station: ["trtc_071", "trtc_070", "trtc_069", "trtc_068", "trtc_067", "trtc_066", "trtc_064", "trtc_063", "trtc_062", "trtc_061", "trtc_060", "trtc_059", "trtc_058", "trtc_057", "trtc_056", "trtc_055", "trtc_054", "trtc_053", "trtc_051", "trtc_050", "trtc_042", "trtc_134", "trtc_103", "trtc_011", "trtc_101", "trtc_100", "trtc_099"]
	    }, {
	      id: 'trtc_3',
	      LineID: 'G',
	      route: [{
	        dir: 0,
	        Direction: 0,
	        work: [{
	          RouteID: 'G-1',
	          from: 'G01',
	          to: 'G19'
	        }, {
	          RouteID: 'G-2',
	          from: 'G08',
	          to: 'G19'
	        }]
	      }, {
	        dir: 1,
	        Direction: 1,
	        work: [{
	          RouteID: 'G-1',
	          from: 'G19',
	          to: 'G01'
	        }, {
	          RouteID: 'G-2',
	          from: 'G19',
	          to: 'G08'
	        }]
	      }],
	      name: "松山新店線(3)",
	      color: "#007749",
	      dir: "1",
	      outArea: [{
	        dir: "1",
	        station: "trtc_039~trtc_033",
	        transAt: "trtc_040",
	        waitingNextMinute: 4
	      }],
	      station: ["trtc_111", "trtc_110", "trtc_109", "trtc_009", "trtc_132", "trtc_053", "trtc_105", "trtc_086", "trtc_043", "trtc_042", "trtc_041", "trtc_040", "trtc_039", "trtc_038", "trtc_037", "trtc_036", "trtc_035", "trtc_034", "trtc_033"]
	    }, {
	      id: 'trtc_4',
	      LineID: 'O',
	      route: [{
	        dir: 0,
	        Direction: 0,
	        work: [{
	          RouteID: 'O-1',
	          from: 'O01',
	          to: 'O21'
	        }, {
	          RouteID: 'O-2',
	          from: 'O01',
	          to: 'O54'
	        }]
	      }, {
	        dir: 1,
	        Direction: 1,
	        work: [{
	          RouteID: 'O-1',
	          from: 'O21',
	          to: 'O01'
	        }, {
	          RouteID: 'O-2',
	          from: 'O54',
	          to: 'O01'
	        }]
	      }],
	      name: "中和新蘆線(4)",
	      color: "#ffa300",
	      dir: "0",
	      splitStation: ['trtc_128'],
	      outArea: [{
	        dir: "0",
	        station: "trtc_127~trtc_179",
	        transAt: "trtc_128",
	        isSubLine: true,
	        waitingNextMinute: 4
	      }, {
	        dir: "0",
	        station: "trtc_178~trtc_174",
	        transAt: "trtc_128",
	        isSubLine: true,
	        waitingNextMinute: 4
	      }],
	      station: ["trtc_048", "trtc_047", "trtc_046", "trtc_045", "trtc_041", "trtc_134", "trtc_089", "trtc_132", "trtc_131", "trtc_130", "trtc_055", "trtc_128", "trtc_127", "trtc_126", "trtc_125", "trtc_124", "trtc_123", "trtc_122", "trtc_121", "trtc_180", "trtc_179", "trtc_178", "trtc_177", "trtc_176", "trtc_175", "trtc_174"]
	    }, {
	      id: 'trtc_5',
	      LineID: 'BL',
	      route: [{
	        dir: 0,
	        Direction: 0,
	        work: [{
	          RouteID: 'BL-1',
	          from: 'BL01',
	          to: 'BL23'
	        }, {
	          RouteID: 'BL-2',
	          from: 'BL05',
	          to: 'BL23'
	        }]
	      }, {
	        dir: 1,
	        Direction: 1,
	        work: [{
	          RouteID: 'BL-1',
	          from: 'BL23',
	          to: 'BL01'
	        }, {
	          RouteID: 'BL-2',
	          from: 'BL23',
	          to: 'BL05'
	        }]
	      }],
	      name: "板南線(5)",
	      color: "#005eb8",
	      dir: "1",
	      outArea: [{
	        dir: "1",
	        station: "trtc_079~trtc_076",
	        transAt: "trtc_080",
	        waitingNextMinute: 4
	      }],
	      station: ["trtc_031", "trtc_097", "trtc_096", "trtc_095", "trtc_094", "trtc_093", "trtc_092", "trtc_091", "trtc_010", "trtc_089", "trtc_088", "trtc_051", "trtc_086", "trtc_085", "trtc_084", "trtc_083", "trtc_082", "trtc_081", "trtc_080", "trtc_079", "trtc_078", "trtc_077", "trtc_076"]
	    }]
	  },
	  tymetro: {
	    defined: {
	      "CarClass": [{
	        "id": "directly",
	        "name": "直達車",
	        "ename": "Express",
	        "color": "#A1A"
	      }, {
	        "id": "normal",
	        "name": "普通車",
	        "ename": "Local",
	        "color": "#33F"
	      }]
	    },
	    sect_ary: ['taoyuan', 'taipei'],
	    station_ary: [//Airport Line
	    {
	      id: "tymetro_a01",
	      StationID: ["A1"],
	      name: "臺北車站",
	      estring: "taipeichezhantaipeimainstation",
	      sect: 'taipei',
	      big: 'd'
	    }, {
	      id: "tymetro_a02",
	      StationID: ["A2"],
	      name: "三重",
	      estring: "sanchong",
	      sect: 'taipei'
	    }, {
	      id: "tymetro_a03",
	      StationID: ["A3"],
	      name: "新北產業園區",
	      estring: "xinbeichanyeyuanqui",
	      sect: 'taipei',
	      big: 'd'
	    }, {
	      id: "tymetro_a04",
	      StationID: ["A4"],
	      name: "新莊副都心",
	      estring: "xinzhungfuduxin",
	      sect: 'taipei'
	    }, {
	      id: "tymetro_a05",
	      StationID: ["A5"],
	      name: "泰山",
	      estring: "taishan",
	      sect: 'taipei'
	    }, {
	      id: "tymetro_a06",
	      StationID: ["A6"],
	      name: "泰山貴和",
	      estring: "taishanguehe",
	      sect: 'taipei'
	    }, {
	      id: "tymetro_a07",
	      StationID: ["A7"],
	      name: "體育大學",
	      estring: "tiyvdaxue",
	      sect: 'taipei'
	    }, {
	      id: "tymetro_a08",
	      StationID: ["A8"],
	      name: "長庚醫院",
	      estring: "changgengyiyuan",
	      sect: 'taoyuan',
	      big: 'd'
	    }, {
	      id: "tymetro_a09",
	      StationID: ["A9"],
	      name: "林口",
	      estring: "linkou",
	      sect: 'taoyuan'
	    }, {
	      id: "tymetro_a10",
	      StationID: ["A10"],
	      name: "山鼻",
	      estring: "shanbi",
	      sect: 'taoyuan'
	    }, {
	      id: "tymetro_a11",
	      StationID: ["A11"],
	      name: "坑口",
	      estring: "kengkou",
	      sect: 'taoyuan'
	    }, {
	      id: "tymetro_a12",
	      StationID: ["A12"],
	      name: "機場第一航廈",
	      estring: "terminal1",
	      sect: 'taoyuan',
	      big: 'd'
	    }, {
	      id: "tymetro_a13",
	      StationID: ["A13"],
	      name: "機場第二航廈",
	      estring: "terminal2",
	      sect: 'taoyuan',
	      big: 'd'
	    }, {
	      id: "tymetro_a14a",
	      StationID: ["A14a"],
	      name: "機場旅館",
	      estring: "airporthotel",
	      sect: 'taoyuan'
	    }, {
	      id: "tymetro_a15",
	      StationID: ["A15"],
	      name: "大園",
	      estring: "dayuan",
	      sect: 'taoyuan'
	    }, {
	      id: "tymetro_a16",
	      StationID: ["A16"],
	      name: "橫山",
	      estring: "hengshan",
	      sect: 'taoyuan'
	    }, {
	      id: "tymetro_a17",
	      StationID: ["A17"],
	      name: "領航",
	      estring: "linghang",
	      sect: 'taoyuan'
	    }, {
	      id: "tymetro_a18",
	      StationID: ["A18"],
	      name: "高鐵桃園站",
	      estring: "gaotietaoyuanzhan",
	      sect: 'taoyuan'
	    }, {
	      id: "tymetro_a19",
	      StationID: ["A19"],
	      name: "桃園體育園區",
	      estring: "taoyuantiyuyuanqui",
	      sect: 'taoyuan'
	    }, {
	      id: "tymetro_a20",
	      StationID: ["A20"],
	      name: "興南",
	      estring: "xingnan",
	      sect: 'taoyuan'
	    }, {
	      id: "tymetro_a21",
	      StationID: ["A21"],
	      name: "環北",
	      estring: "huanbei",
	      sect: 'taoyuan'
	    }],
	    line: [{
	      id: "tymetro_1",
	      LineID: "A",
	      name: "機場捷運",
	      trainSect: ["taipei", "taoyuan"],
	      color: "#8e47ad",
	      dir: "1",
	      station: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14a", "A15", "A16", "A17", "A18", "A19", "A20", "A21"]
	    }]
	  },
	  tmrt: {
	    sect_ary: ['taichung'],
	    station_ary: [//G Line
	    {
	      id: "tmrt_103a",
	      StationID: ["103a"],
	      name: "北屯總站",
	      estring: "beitunmainstationbeitunzhongzhan",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_103",
	      StationID: ["103"],
	      name: "舊社",
	      estring: "jiushe",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_104",
	      StationID: ["104"],
	      name: "松竹",
	      estring: "songzhu",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_105",
	      StationID: ["105"],
	      name: "四維國小",
	      estring: "sihweielementaryschoolsiweiguoxiao",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_106",
	      StationID: ["106"],
	      name: "文心崇德",
	      estring: "wenxinchongde",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_107",
	      StationID: ["107"],
	      name: "文心中清",
	      estring: "wenxinzhongqing",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_108",
	      StationID: ["108"],
	      name: "文華高中",
	      estring: "wenhuaseniorhighschoolwenhuagaozhong",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_109",
	      StationID: ["109"],
	      name: "文心櫻花",
	      estring: "wenxinyinghua",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_110",
	      StationID: ["110"],
	      name: "市政府",
	      estring: "taichungcityhallshizhengfu",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_111",
	      StationID: ["111"],
	      name: "水安宮",
	      estring: "shuiantempleshuiangong",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_112",
	      StationID: ["112"],
	      name: "文心森林公園",
	      estring: "wenxinforestpark",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_113",
	      StationID: ["113"],
	      name: "南屯",
	      estring: "nantun",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_114",
	      StationID: ["114"],
	      name: "豐樂公園",
	      estring: "fengleparkfenglegongyuan",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_115",
	      StationID: ["115"],
	      name: "大慶",
	      estring: "daqing",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_116",
	      StationID: ["116"],
	      name: "九張犁",
	      estring: "jiuzhangli",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_117",
	      StationID: ["117"],
	      name: "九德",
	      estring: "jiude",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_118",
	      StationID: ["118"],
	      name: "烏日",
	      estring: "wuri",
	      sect: 'taichung'
	    }, {
	      id: "tmrt_119",
	      StationID: ["119"],
	      name: "高鐵臺中站",
	      estring: "hSRtaichungstationgaotietaizhongzhan",
	      sect: 'taichung'
	    }],
	    line: [{
	      id: "tymetro_G",
	      LineID: "G",
	      name: "烏日文心北屯線",
	      trainSect: ["taichung"],
	      color: "#84BD00",
	      dir: "0",
	      station: ["103a", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119"]
	    }]
	  },
	  thsr: {
	    station_ary: [{
	      id: 'thsr_0990',
	      StationID: ['0990'],
	      name: '南港',
	      estring: 'nangang',
	      sect: 'taipei'
	    }, {
	      id: 'thsr_1000',
	      StationID: ['1000'],
	      name: '台北',
	      estring: 'taipeitaibei',
	      sect: 'taipei'
	    }, {
	      id: 'thsr_1010',
	      StationID: ['1010'],
	      name: '板橋',
	      estring: 'banqiaobanciao',
	      sect: 'taipei'
	    }, {
	      id: 'thsr_1020',
	      StationID: ['1020'],
	      name: '桃園',
	      estring: 'taoyuan',
	      sect: 'taoyuan'
	    }, {
	      id: 'thsr_1030',
	      StationID: ['1030'],
	      name: '新竹',
	      estring: 'hsinchuxinzhu',
	      sect: 'hsinchu'
	    }, {
	      id: 'thsr_1035',
	      StationID: ['1035'],
	      name: '苗栗',
	      estring: 'miaoli',
	      sect: 'miaoli'
	    }, {
	      id: 'thsr_1040',
	      StationID: ['1040'],
	      name: '台中',
	      estring: 'taizhongtaichung',
	      sect: 'taichung'
	    }, {
	      id: 'thsr_1043',
	      StationID: ['1043'],
	      name: '彰化',
	      estring: 'zhanghuachanghua',
	      sect: 'changhua'
	    }, {
	      id: 'thsr_1047',
	      StationID: ['1047'],
	      name: '雲林',
	      estring: 'yunlin',
	      sect: 'yunlin'
	    }, {
	      id: 'thsr_1050',
	      StationID: ['1050'],
	      name: '嘉義',
	      estring: 'jiayichiayi',
	      sect: 'chiayi'
	    }, {
	      id: 'thsr_1060',
	      StationID: ['1060'],
	      name: '台南',
	      estring: 'tainan',
	      sect: 'tainan'
	    }, {
	      id: 'thsr_1070',
	      StationID: ['1070'],
	      name: '左營',
	      estring: 'zouying',
	      sect: 'kaohsiung'
	    }]
	  },
	  tra: {
	    "CarClass": [{
	      "id": "1100",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "1101",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "1102",
	      "code": 1,
	      "name": "太魯閣號",
	      "ename": "Tze-Chiang Limited Express(Tarko)",
	      "color": "#FD8A10"
	    }, {
	      "id": "1103",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "1106",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "1107",
	      "code": 2,
	      "name": "普悠瑪號",
	      "ename": "Tze-Chiang Limited Express(Puyuma)",
	      "color": "#ff0030"
	    }, {
	      "id": "1108",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "1109",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "110A",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "110B",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "110C",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "110D",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "110E",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "110F",
	      "code": 3,
	      "name": "自強號",
	      "ename": "Tze-Chiang Limited Express",
	      "color": "#fd7a10"
	    }, {
	      "id": "1110",
	      "code": 4,
	      "name": "莒光號",
	      "ename": "Chu-Kuang Express",
	      "color": "#ff1070"
	    }, {
	      "id": "1111",
	      "code": 4,
	      "name": "莒光號",
	      "ename": "Chu-Kuang Express",
	      "color": "#ff1070"
	    }, {
	      "id": "1114",
	      "code": 4,
	      "name": "莒光號",
	      "ename": "Chu-Kuang Express",
	      "color": "#ff1070"
	    }, {
	      "id": "1115",
	      "code": 4,
	      "name": "莒光號",
	      "ename": "Chu-Kuang Express",
	      "color": "#ff1070"
	    }, {
	      "id": "1120",
	      "code": 5,
	      "name": "復興號",
	      "ename": "Fu-Hsing Semi Express",
	      "color": "#32CFBC"
	    }, {
	      "id": "1130",
	      "code": 6,
	      "name": "電車號",
	      "ename": "Electric Multiple Unit"
	    }, {
	      "id": "1131",
	      "code": 6,
	      "name": "區間車",
	      "ename": "Local Train",
	      "color": "#0D46A2"
	    }, {
	      "id": "1132",
	      "code": 6,
	      "name": "區間快",
	      "ename": "Fast Local Train",
	      "color": "#32CFBC"
	    }, {
	      "id": "1140",
	      "code": 7,
	      "name": "普快車",
	      "ename": "Ordinary train"
	    }, {
	      "id": "1141",
	      "code": 7,
	      "name": "柴快車",
	      "ename": "Disel Rail Car"
	    }, {
	      "id": "1150",
	      "code": 7,
	      "name": "柴油車",
	      "ename": "na"
	    }],
	    station_ary: [//big: e for big station of east(dongbu), w for big station of west(xibu), s for south link(nanhuei)
	    {
	      id: "tra_1001",
	      v3id: "0900",
	      name: "基隆",
	      estring: "keelung",
	      sect: "keelung"
	    }, {
	      id: "tra_1029",
	      v3id: "0910",
	      name: "三坑",
	      estring: "sankeng",
	      sect: "keelung"
	    }, {
	      id: "tra_1002",
	      v3id: "0920",
	      name: "八堵",
	      estring: "badu",
	      sect: "keelung",
	      big: 'e'
	    }, {
	      id: "tra_1003",
	      v3id: "0930",
	      name: "七堵",
	      estring: "qidu",
	      sect: "keelung",
	      big: 'ew'
	    }, {
	      id: "tra_1030",
	      v3id: "0940",
	      name: "百福",
	      estring: "baifu",
	      sect: "keelung"
	    }, {
	      id: "tra_1004",
	      v3id: "0950",
	      name: "五堵",
	      estring: "wudu",
	      sect: "taipei"
	    }, {
	      id: "tra_1005",
	      v3id: "0960",
	      name: "汐止",
	      estring: "xizhisijhih",
	      sect: "taipei"
	    }, {
	      id: "tra_1031",
	      v3id: "0970",
	      name: "汐科",
	      estring: "xikesike",
	      sect: "taipei"
	    }, {
	      id: "tra_1006",
	      v3id: "0980",
	      name: "南港",
	      estring: "nangang",
	      sect: "taipei"
	    }, {
	      id: "tra_1007",
	      v3id: "0990",
	      name: "松山",
	      estring: "songshan",
	      sect: "taipei",
	      big: 'ew',
	      bigMaster: true
	    }, {
	      id: "tra_1008",
	      v3id: "1000",
	      name: "台北",
	      estring: "taipeitaibei",
	      sect: "taipei",
	      big: 'ew',
	      bigMaster: true
	    }, {
	      id: "tra_1009",
	      v3id: "1010",
	      name: "萬華",
	      estring: "wanhua",
	      sect: "taipei"
	    }, {
	      id: "tra_1011",
	      v3id: "1020",
	      name: "板橋",
	      estring: "banqiao",
	      sect: "taipei",
	      big: 'ew',
	      bigMaster: true
	    }, {
	      id: "tra_1032",
	      v3id: "1030",
	      name: "浮洲",
	      estring: "fuzhou",
	      sect: "taipei"
	    }, {
	      id: "tra_1012",
	      v3id: "1040",
	      name: "樹林",
	      estring: "shulin",
	      sect: "taipei",
	      big: 'e'
	    }, {
	      id: "tra_1034",
	      v3id: "1050",
	      name: "南樹林",
	      estring: "nanshulin",
	      sect: "taipei"
	    }, {
	      id: "tra_1013",
	      v3id: "1060",
	      name: "山佳",
	      estring: "shanjia",
	      sect: "taipei"
	    }, {
	      id: "tra_1014",
	      v3id: "1070",
	      name: "鶯歌",
	      estring: "yingge",
	      sect: "taipei"
	    }, {
	      id: "tra_1015",
	      v3id: "1080",
	      name: "桃園",
	      estring: "taoyuan",
	      sect: "taoyuan",
	      big: 'w'
	    }, {
	      id: "tra_1016",
	      v3id: "1090",
	      name: "內壢",
	      estring: "neili",
	      sect: "taoyuan"
	    }, {
	      id: "tra_1017",
	      v3id: "1100",
	      name: "中壢",
	      estring: "zhongli",
	      sect: "taoyuan",
	      big: 'w'
	    }, {
	      id: "tra_1018",
	      v3id: "1110",
	      name: "埔心",
	      estring: "puxin",
	      sect: "taoyuan"
	    }, {
	      id: "tra_1019",
	      v3id: "1120",
	      name: "楊梅",
	      estring: "yangmei",
	      sect: "taoyuan"
	    }, {
	      id: "tra_1020",
	      v3id: "1130",
	      name: "富岡",
	      estring: "fugan",
	      sect: "taoyuan"
	    }, {
	      id: "tra_1036",
	      v3id: "1140",
	      name: "新富",
	      estring: "xinfu",
	      sect: "taoyuan"
	    }, {
	      id: "tra_1033",
	      v3id: "1150",
	      name: "北湖",
	      estring: "beihu",
	      sect: "hsinchu"
	    }, {
	      id: "tra_1021",
	      v3id: "1160",
	      name: "湖口",
	      estring: "hukou",
	      sect: "hsinchu"
	    }, {
	      id: "tra_1022",
	      v3id: "1170",
	      name: "新豐",
	      estring: "xinfeng",
	      sect: "hsinchu"
	    }, {
	      id: "tra_1023",
	      v3id: "1180",
	      name: "竹北",
	      estring: "zhubei",
	      sect: "hsinchu"
	    }, {
	      id: "tra_1024",
	      v3id: "1190",
	      name: "北新竹",
	      estring: "northhsinchubeixinzhu",
	      sect: "hsinchu"
	    }, {
	      id: "tra_1025",
	      v3id: "1210",
	      name: "新竹",
	      estring: "hsinchuxinzhu",
	      sect: "hsinchu",
	      big: 'w'
	    }, {
	      id: "tra_1035",
	      v3id: "1220",
	      name: "三姓橋",
	      estring: "sanxingqiao",
	      sect: "hsinchu"
	    }, {
	      id: "tra_1026",
	      v3id: "1230",
	      name: "香山",
	      estring: "xiangshan",
	      sect: "hsinchu"
	    }, {
	      id: "tra_1027",
	      v3id: "1240",
	      name: "崎頂",
	      estring: "jidingciding",
	      sect: "hsinchu"
	    }, {
	      id: "tra_1028",
	      v3id: "1250",
	      name: "竹南",
	      estring: "zhunan",
	      sect: "hsinchu",
	      big: 'w'
	    }, {
	      id: "tra_1302",
	      v3id: "3140",
	      name: "造橋",
	      estring: "zaoqiao",
	      sect: "miaoli"
	    }, {
	      id: "tra_1304",
	      v3id: "3150",
	      name: "豐富",
	      estring: "fengfu",
	      sect: "miaoli"
	    }, {
	      id: "tra_1305",
	      v3id: "3160",
	      name: "苗栗",
	      estring: "miaoli",
	      sect: "miaoli",
	      big: 'w'
	    }, {
	      id: "tra_1307",
	      v3id: "3170",
	      name: "南勢",
	      estring: "nanshi",
	      sect: "miaoli"
	    }, {
	      id: "tra_1308",
	      v3id: "3180",
	      name: "銅鑼",
	      estring: "tongluo",
	      sect: "miaoli"
	    }, {
	      id: "tra_1310",
	      v3id: "3190",
	      name: "三義",
	      estring: "sanyi",
	      sect: "miaoli"
	    }, {
	      id: "tra_1314",
	      v3id: "3210",
	      name: "泰安",
	      estring: "taian",
	      sect: "miaoli"
	    }, {
	      id: "tra_1315",
	      v3id: "3220",
	      name: "后里",
	      estring: "houli",
	      sect: "taichung"
	    }, {
	      id: "tra_1317",
	      v3id: "3230",
	      name: "豐原",
	      estring: "fengyuan",
	      sect: "taichung",
	      big: 'w'
	    }, {
	      id: "tra_1325",
	      v3id: "3240",
	      name: "栗林",
	      estring: "lilin",
	      sect: "taichung"
	    }, {
	      id: "tra_1318",
	      v3id: "3250",
	      name: "潭子",
	      estring: "tanzi",
	      sect: "taichung"
	    }, {
	      id: "tra_1326",
	      v3id: "3260",
	      name: "頭家厝",
	      estring: "toujiacuo",
	      sect: "taichung"
	    }, {
	      id: "tra_1327",
	      v3id: "3270",
	      name: "松竹",
	      estring: "toujiacuo",
	      sect: "songzhu"
	    }, {
	      id: "tra_1323",
	      v3id: "3280",
	      name: "太原",
	      estring: "taiyuan",
	      sect: "taichung"
	    }, {
	      id: "tra_1328",
	      v3id: "3290",
	      name: "精武",
	      estring: "jingwu",
	      sect: "taichung"
	    }, {
	      id: "tra_1319",
	      v3id: "3300",
	      name: "台中",
	      estring: "taizhongtaichung",
	      sect: "taichung",
	      big: 'w'
	    }, {
	      id: "tra_1329",
	      v3id: "3310",
	      name: "五權",
	      estring: "wuquan",
	      sect: "taichung"
	    }, {
	      id: "tra_1322",
	      v3id: "3320",
	      name: "大慶",
	      estring: "daqing",
	      sect: "taichung"
	    }, {
	      id: "tra_1320",
	      v3id: "3330",
	      name: "烏日",
	      estring: "wuri",
	      sect: "taichung"
	    }, {
	      id: "tra_1324",
	      v3id: "3340",
	      name: "新烏日",
	      estring: "xinwuri",
	      sect: "taichung"
	    }, {
	      id: "tra_1321",
	      v3id: "3350",
	      name: "成功",
	      estring: "chenggong",
	      sect: "taichung"
	    }, {
	      id: "tra_1120",
	      v3id: "3360",
	      name: "彰化",
	      estring: "zhanghuachanghua",
	      sect: "changhua",
	      big: 'w'
	    }, {
	      id: "tra_1202",
	      v3id: "3370",
	      name: "花壇",
	      estring: "huatan",
	      sect: "changhua"
	    }, {
	      id: "tra_1240",
	      v3id: "3380",
	      name: "大村",
	      estring: "dacundatsun",
	      sect: "changhua"
	    }, {
	      id: "tra_1203",
	      v3id: "3390",
	      name: "員林",
	      estring: "yuanlin",
	      sect: "changhua",
	      big: 'w'
	    }, {
	      id: "tra_1204",
	      v3id: "3400",
	      name: "永靖",
	      estring: "yongjing",
	      sect: "changhua"
	    }, {
	      id: "tra_1205",
	      v3id: "3410",
	      name: "社頭",
	      estring: "shetou",
	      sect: "changhua"
	    }, {
	      id: "tra_1206",
	      v3id: "3420",
	      name: "田中",
	      estring: "tianzhong",
	      sect: "changhua"
	    }, {
	      id: "tra_1207",
	      v3id: "3430",
	      name: "二水",
	      estring: "ershuei",
	      sect: "changhua"
	    }, {
	      id: "tra_1208",
	      v3id: "3450",
	      name: "林內",
	      estring: "linnei",
	      sect: "yunlin"
	    }, {
	      id: "tra_1209",
	      v3id: "3460",
	      name: "石榴",
	      estring: "shilioushihliou",
	      sect: "yunlin"
	    }, {
	      id: "tra_1210",
	      v3id: "3470",
	      name: "斗六",
	      estring: "douliou",
	      sect: "yunlin",
	      big: 'w'
	    }, {
	      id: "tra_1211",
	      v3id: "3480",
	      name: "斗南",
	      estring: "dounan",
	      sect: "yunlin"
	    }, {
	      id: "tra_1212",
	      v3id: "3490",
	      name: "石龜",
	      estring: "shigueishihguei",
	      sect: "yunlin"
	    }, {
	      id: "tra_1213",
	      v3id: "4050",
	      name: "大林",
	      estring: "dalin",
	      sect: "yunlin"
	    }, {
	      id: "tra_1214",
	      v3id: "4060",
	      name: "民雄",
	      estring: "minxiong",
	      sect: "chiayi"
	    }, {
	      id: "tra_1241",
	      v3id: "4070",
	      name: "嘉北",
	      estring: "jiabei",
	      sect: "chiayi"
	    }, {
	      id: "tra_1215",
	      v3id: "4080",
	      name: "嘉義",
	      estring: "jiayichiayi",
	      sect: "chiayi",
	      big: 'w'
	    }, {
	      id: "tra_1217",
	      v3id: "4090",
	      name: "水上",
	      estring: "shueishang",
	      sect: "chiayi"
	    }, {
	      id: "tra_1218",
	      v3id: "4100",
	      name: "南靖",
	      estring: "nanjing",
	      sect: "chiayi"
	    }, {
	      id: "tra_1219",
	      v3id: "4110",
	      name: "後壁",
	      estring: "houbi",
	      sect: "tainan"
	    }, {
	      id: "tra_1220",
	      v3id: "4120",
	      name: "新營",
	      estring: "xinyingsinying",
	      sect: "tainan",
	      big: 'w'
	    }, {
	      id: "tra_1221",
	      v3id: "4130",
	      name: "柳營",
	      estring: "liouying",
	      sect: "tainan"
	    }, {
	      id: "tra_1222",
	      v3id: "4140",
	      name: "林鳳營",
	      estring: "linfengyinglinfongying",
	      sect: "tainan"
	    }, {
	      id: "tra_1223",
	      v3id: "4150",
	      name: "隆田",
	      estring: "longtian",
	      sect: "tainan"
	    }, {
	      id: "tra_1224",
	      v3id: "4160",
	      name: "拔林",
	      estring: "balin",
	      sect: "tainan"
	    }, {
	      id: "tra_1225",
	      v3id: "4170",
	      name: "善化",
	      estring: "shanghua",
	      sect: "tainan"
	    }, {
	      id: "tra_1244",
	      v3id: "4180",
	      name: "南科",
	      estring: "nanke",
	      sect: "tainan"
	    }, {
	      id: "tra_1226",
	      v3id: "4190",
	      name: "新市",
	      estring: "xinshisinshih",
	      sect: "tainan"
	    }, {
	      id: "tra_1227",
	      v3id: "4200",
	      name: "永康",
	      estring: "yungkangyongkang",
	      sect: "tainan"
	    }, {
	      id: "tra_1239",
	      v3id: "4210",
	      name: "大橋",
	      estring: "daqiaodaciao",
	      sect: "tainan"
	    }, {
	      id: "tra_1228",
	      v3id: "4220",
	      name: "台南",
	      estring: "tainan",
	      sect: "tainan",
	      big: 'w'
	    }, {
	      id: "tra_1229",
	      v3id: "4250",
	      name: "保安",
	      estring: "baoan",
	      sect: "tainan"
	    }, {
	      id: "tra_1243",
	      v3id: "4260",
	      name: "仁德",
	      estring: "rende",
	      sect: "tainan"
	    }, {
	      id: "tra_1230",
	      v3id: "4270",
	      name: "中州",
	      estring: "zhongzhoujhongjhou",
	      sect: "tainan"
	    }, {
	      id: "tra_1231",
	      v3id: "4290",
	      name: "大湖",
	      estring: "dahu",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1232",
	      v3id: "4300",
	      name: "路竹",
	      estring: "luzhulujhu",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1233",
	      v3id: "4310",
	      name: "岡山",
	      estring: "ganshan",
	      sect: "kaohsiung",
	      big: 'w'
	    }, {
	      id: "tra_1234",
	      v3id: "4320",
	      name: "橋頭",
	      estring: "qiaotou",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1235",
	      v3id: "4330",
	      name: "楠梓",
	      estring: "nanzi",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1242",
	      v3id: "4340",
	      name: "新左營",
	      estring: "xingzouying",
	      sect: "kaohsiung",
	      big: 's'
	    }, {
	      id: "tra_1236",
	      v3id: "4350",
	      name: "左營",
	      estring: "zouying",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1245",
	      v3id: "4360",
	      name: "內惟",
	      estring: "neiwei",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1246",
	      v3id: "4370",
	      name: "美術館",
	      estring: "meishuguanmuseumoffinearts",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1237",
	      v3id: "4380",
	      name: "鼓山",
	      estring: "gushan",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1247",
	      v3id: "4390",
	      name: "三塊厝",
	      estring: "sankuaicuo",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1238",
	      v3id: "4400",
	      name: "高雄",
	      estring: "kaohsiunggaoxung",
	      sect: "kaohsiung",
	      big: 'ws'
	    }, {
	      id: "tra_1419",
	      v3id: "4410",
	      name: "民族",
	      estring: "mingzhu",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1420",
	      v3id: "4420",
	      name: "科工館",
	      estring: "kegongguanscienceandtecnologymuseum",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1421",
	      v3id: "4430",
	      name: "正義",
	      estring: "zhengyi",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1402",
	      v3id: "4440",
	      name: "鳳山",
	      estring: "fongshanfengshan",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1403",
	      v3id: "4450",
	      name: "後庄",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1404",
	      v3id: "4460",
	      name: "九曲堂",
	      sect: "kaohsiung"
	    }, {
	      id: "tra_1405",
	      v3id: "4470",
	      name: "六塊厝",
	      sect: "pingdong"
	    }, {
	      id: "tra_1406",
	      v3id: "5000",
	      name: "屏東",
	      estring: "pingtungpingdong",
	      sect: "pingdong",
	      big: 'ws',
	      noShow: true
	    }, {
	      id: "tra_1407",
	      v3id: "5010",
	      name: "歸來",
	      sect: "pingdong"
	    }, {
	      id: "tra_1408",
	      v3id: "5020",
	      name: "麟洛",
	      sect: "pingdong"
	    }, {
	      id: "tra_1409",
	      v3id: "5030",
	      name: "西勢",
	      sect: "pingdong"
	    }, {
	      id: "tra_1410",
	      v3id: "5040",
	      name: "竹田",
	      sect: "pingdong"
	    }, {
	      id: "tra_1411",
	      v3id: "5050",
	      name: "潮州",
	      estring: "chaozhouchaojhou",
	      sect: "pingdong",
	      big: 'ws',
	      noShow: true
	    }, {
	      id: "tra_1412",
	      v3id: "5060",
	      name: "崁頂",
	      sect: "pingdong"
	    }, {
	      id: "tra_1413",
	      v3id: "5070",
	      name: "南州",
	      sect: "pingdong"
	    }, {
	      id: "tra_1414",
	      v3id: "5080",
	      name: "鎮安",
	      sect: "pingdong"
	    }, {
	      id: "tra_1415",
	      v3id: "5090",
	      name: "林邊",
	      sect: "pingdong"
	    }, {
	      id: "tra_1416",
	      v3id: "5100",
	      name: "佳冬",
	      sect: "pingdong"
	    }, {
	      id: "tra_1417",
	      v3id: "5110",
	      name: "東海",
	      sect: "pingdong"
	    }, {
	      id: "tra_1418",
	      v3id: "5120",
	      name: "枋寮",
	      sect: "pingdong"
	    }, {
	      id: "tra_1802",
	      v3id: "7390",
	      name: "暖暖",
	      estring: "nuannuan",
	      sect: "northeast"
	    }, {
	      id: "tra_1803",
	      v3id: "7380",
	      name: "四腳亭",
	      estring: "sijiaoting",
	      sect: "northeast"
	    }, {
	      id: "tra_1804",
	      v3id: "7360",
	      name: "瑞芳",
	      estring: "ruifang",
	      sect: "northeast",
	      big: 'e'
	    }, {
	      id: "tra_1805",
	      v3id: "7350",
	      name: "猴硐",
	      estring: "houdong",
	      sect: "northeast"
	    }, {
	      id: "tra_1806",
	      v3id: "7330",
	      name: "三貂嶺",
	      estring: "sandiaoling",
	      sect: "northeast"
	    }, {
	      id: "tra_1807",
	      v3id: "7320",
	      name: "牡丹",
	      estring: "mudan",
	      sect: "northeast"
	    }, {
	      id: "tra_1808",
	      v3id: "7310",
	      name: "雙溪",
	      estring: "shuangxi",
	      sect: "northeast"
	    }, {
	      id: "tra_1809",
	      v3id: "7300",
	      name: "貢寮",
	      estring: "gongliao",
	      sect: "northeast"
	    }, {
	      id: "tra_1810",
	      v3id: "7290",
	      name: "福隆",
	      estring: "fulong",
	      sect: "northeast"
	    }, {
	      id: "tra_1811",
	      v3id: "7280",
	      name: "石城",
	      estring: "shicheng",
	      sect: "yilan"
	    }, {
	      id: "tra_1812",
	      v3id: "7270",
	      name: "大里",
	      estring: "dali",
	      sect: "yilan"
	    }, {
	      id: "tra_1813",
	      v3id: "7260",
	      name: "大溪",
	      estring: "daxidasi",
	      sect: "yilan"
	    }, {
	      id: "tra_1814",
	      v3id: "7250",
	      name: "龜山",
	      estring: "gueishan",
	      sect: "yilan"
	    }, {
	      id: "tra_1815",
	      v3id: "7240",
	      name: "外澳",
	      estring: "waiao",
	      sect: "yilan"
	    }, {
	      id: "tra_1816",
	      v3id: "7230",
	      name: "頭城",
	      estring: "toucheng",
	      sect: "yilan",
	      big: 'e'
	    }, {
	      id: "tra_1817",
	      v3id: "7220",
	      name: "頂埔",
	      estring: "dingpu",
	      sect: "yilan"
	    }, {
	      id: "tra_1818",
	      v3id: "7210",
	      name: "礁溪",
	      estring: "jiaoxijiaohsi",
	      sect: "yilan"
	    }, {
	      id: "tra_1819",
	      v3id: "7200",
	      name: "四城",
	      estring: "sicheng",
	      sect: "yilan"
	    }, {
	      id: "tra_1820",
	      v3id: "7190",
	      name: "宜蘭",
	      estring: "yilan",
	      sect: "yilan",
	      big: 'e'
	    }, {
	      id: "tra_1821",
	      v3id: "7180",
	      name: "二結",
	      estring: "erjie",
	      sect: "yilan"
	    }, {
	      id: "tra_1822",
	      v3id: "7170",
	      name: "中里",
	      estring: "zhongli",
	      sect: "yilan"
	    }, {
	      id: "tra_1823",
	      v3id: "7160",
	      name: "羅東",
	      estring: "luodong",
	      sect: "yilan",
	      big: 'e'
	    }, {
	      id: "tra_1824",
	      v3id: "7150",
	      name: "冬山",
	      estring: "dongshan",
	      sect: "yilan"
	    }, {
	      id: "tra_1825",
	      v3id: "7140",
	      name: "新馬",
	      estring: "xinmasinma",
	      sect: "yilan"
	    }, {
	      id: "tra_1826",
	      v3id: "7130",
	      name: "蘇澳新",
	      estring: "suaoxinsuaosin",
	      sect: "yilan",
	      big: 'e'
	    }, {
	      id: "tra_1827",
	      v3id: "7120",
	      name: "蘇澳",
	      estring: "suao",
	      sect: "yilan"
	    }, {
	      id: "tra_1703",
	      v3id: "7110",
	      name: "永樂",
	      estring: "yongle",
	      sect: "beihui"
	    }, {
	      id: "tra_1704",
	      v3id: "7100",
	      name: "東澳",
	      estring: "dongao",
	      sect: "beihui"
	    }, {
	      id: "tra_1705",
	      v3id: "7090",
	      name: "南澳",
	      estring: "nanao",
	      sect: "beihui",
	      big: 'e'
	    }, {
	      id: "tra_1706",
	      v3id: "7080",
	      name: "武塔",
	      estring: "wuta",
	      sect: "beihui"
	    }, {
	      id: "tra_1708",
	      v3id: "7070",
	      name: "漢本",
	      estring: "hanben",
	      sect: "beihui"
	    }, {
	      id: "tra_1709",
	      v3id: "7060",
	      name: "和平",
	      estring: "heping",
	      sect: "beihui"
	    }, {
	      id: "tra_1710",
	      v3id: "7050",
	      name: "和仁",
	      estring: "heren",
	      sect: "beihui"
	    }, {
	      id: "tra_1711",
	      v3id: "7040",
	      name: "崇德",
	      estring: "chongde",
	      sect: "hualian"
	    }, {
	      id: "tra_1712",
	      v3id: "7030",
	      name: "新城",
	      estring: "xinchengsincheng",
	      sect: "hualian"
	    }, {
	      id: "tra_1713",
	      v3id: "7020",
	      name: "景美",
	      estring: "jingmei",
	      sect: "hualian"
	    }, {
	      id: "tra_1714",
	      v3id: "7010",
	      name: "北埔",
	      estring: "beipu",
	      sect: "hualian"
	    }, {
	      id: "tra_1715",
	      v3id: "7000",
	      name: "花蓮",
	      estring: "hualienhualian",
	      sect: "hualian",
	      big: 'e'
	    }, //sect:hualian
	    {
	      id: "tra_1602",
	      v3id: "6250",
	      name: "吉安",
	      estring: "jian",
	      sect: "hualian"
	    }, {
	      id: "tra_1604",
	      v3id: "6240",
	      name: "志學",
	      estring: "zhixue",
	      sect: "hualian"
	    }, {
	      id: "tra_1605",
	      v3id: "6230",
	      name: "平和",
	      estring: "pinghe",
	      sect: "hualian"
	    }, {
	      id: "tra_1606",
	      v3id: "6220",
	      name: "壽豐",
	      estring: "shoufeng",
	      sect: "hualian"
	    }, {
	      id: "tra_1607",
	      v3id: "6210",
	      name: "豐田",
	      estring: "fengtian",
	      sect: "hualian"
	    }, {
	      id: "tra_1608",
	      v3id: "6200",
	      name: "林榮新光",
	      estring: "lingrongzinguanglingrongshinkong",
	      sect: "hualian"
	    }, {
	      id: "tra_1609",
	      v3id: "6190",
	      name: "南平",
	      estring: "nanping",
	      sect: "hualian"
	    }, {
	      id: "tra_1610",
	      v3id: "6180",
	      name: "鳳林",
	      estring: "fenglinfonglin",
	      sect: "hualian"
	    }, {
	      id: "tra_1611",
	      v3id: "6170",
	      name: "萬榮",
	      estring: "wanrong",
	      sect: "hualian"
	    }, {
	      id: "tra_1612",
	      v3id: "6160",
	      name: "光復",
	      estring: "guangfu",
	      sect: "hualian"
	    }, {
	      id: "tra_1613",
	      v3id: "6150",
	      name: "大富",
	      estring: "dafu",
	      sect: "hualian"
	    }, {
	      id: "tra_1614",
	      v3id: "6140",
	      name: "富源",
	      estring: "fuyuan",
	      sect: "hualian"
	    }, {
	      id: "tra_1616",
	      v3id: "6130",
	      name: "瑞穗",
	      estring: "ruisui",
	      sect: "hualian"
	    }, {
	      id: "tra_1617",
	      v3id: "6120",
	      name: "三民",
	      estring: "sanmin",
	      sect: "hualian"
	    }, {
	      id: "tra_1619",
	      v3id: "6110",
	      name: "玉里",
	      estring: "yuli",
	      sect: "hualian",
	      big: 'e'
	    }, {
	      id: "tra_1621",
	      v3id: "6100",
	      name: "東里",
	      estring: "dongli",
	      sect: "hualian"
	    }, {
	      id: "tra_1622",
	      v3id: "6090",
	      name: "東竹",
	      estring: "dongzhu",
	      sect: "hualian"
	    }, {
	      id: "tra_1623",
	      v3id: "6080",
	      name: "富里",
	      estring: "fuli",
	      sect: "hualian"
	    }, {
	      id: "tra_1624",
	      v3id: "6070",
	      name: "池上",
	      estring: "chishang",
	      sect: "taidong"
	    }, {
	      id: "tra_1625",
	      v3id: "6060",
	      name: "海端",
	      estring: "haiduan",
	      sect: "taidong"
	    }, {
	      id: "tra_1626",
	      v3id: "6050",
	      name: "關山",
	      estring: "guanshan",
	      sect: "taidong"
	    }, {
	      id: "tra_1628",
	      v3id: "6040",
	      name: "瑞和",
	      estring: "ruihe",
	      sect: "taidong"
	    }, {
	      id: "tra_1629",
	      v3id: "6030",
	      name: "瑞源",
	      estring: "ruiyuan",
	      sect: "taidong"
	    }, {
	      id: "tra_1630",
	      v3id: "6020",
	      name: "鹿野",
	      estring: "luye",
	      sect: "taidong"
	    }, {
	      id: "tra_1631",
	      v3id: "6010",
	      name: "山里",
	      estring: "shanli",
	      sect: "taidong"
	    }, {
	      id: "tra_1632",
	      v3id: "6000",
	      name: "台東",
	      estring: "taitungtaidong",
	      sect: "taidong",
	      big: 'es'
	    }, //海線及南迴線臨時資料
	    {
	      id: "tra_1102",
	      v3id: "2110",
	      name: "談文",
	      sect: "miaoli"
	    }, {
	      id: "tra_1104",
	      v3id: "2120",
	      name: "大山",
	      sect: "miaoli"
	    }, {
	      id: "tra_1105",
	      v3id: "2130",
	      name: "後龍",
	      sect: "miaoli"
	    }, {
	      id: "tra_1106",
	      v3id: "2140",
	      name: "龍港",
	      sect: "miaoli"
	    }, {
	      id: "tra_1107",
	      v3id: "2150",
	      name: "白沙屯",
	      sect: "miaoli"
	    }, {
	      id: "tra_1108",
	      v3id: "2160",
	      name: "新埔",
	      sect: "miaoli"
	    }, {
	      id: "tra_1109",
	      v3id: "2170",
	      name: "通霄",
	      sect: "miaoli"
	    }, {
	      id: "tra_1110",
	      v3id: "2180",
	      name: "苑裡",
	      sect: "miaoli"
	    }, {
	      id: "tra_1111",
	      v3id: "2190",
	      name: "日南",
	      sect: "taichung"
	    }, {
	      id: "tra_1112",
	      v3id: "2200",
	      name: "大甲",
	      sect: "taichung"
	    }, {
	      id: "tra_1113",
	      v3id: "2210",
	      name: "臺中港",
	      sect: "taichung"
	    }, {
	      id: "tra_1114",
	      v3id: "2220",
	      name: "清水",
	      sect: "taichung"
	    }, {
	      id: "tra_1115",
	      v3id: "2230",
	      name: "沙鹿",
	      sect: "taichung"
	    }, {
	      id: "tra_1116",
	      v3id: "2240",
	      name: "龍井",
	      sect: "taichung"
	    }, {
	      id: "tra_1117",
	      v3id: "2250",
	      name: "大肚",
	      sect: "taichung"
	    }, {
	      id: "tra_1118",
	      v3id: "2260",
	      name: "追分",
	      sect: "taichung"
	    }, {
	      id: "tra_1502",
	      v3id: "5130",
	      name: "加祿",
	      sect: "pingdong"
	    }, {
	      id: "tra_1503",
	      v3id: "5140",
	      name: "內獅",
	      sect: "pingdong"
	    }, {
	      id: "tra_1504",
	      v3id: "5160",
	      name: "枋山",
	      sect: "pingdong"
	    }, {
	      id: "tra_1507",
	      v3id: "5180",
	      name: "古莊",
	      sect: "taidong"
	    }, {
	      id: "tra_1508",
	      v3id: "5190",
	      name: "大武",
	      sect: "taidong"
	    }, {
	      id: "tra_1510",
	      v3id: "5200",
	      name: "瀧溪",
	      sect: "taidong"
	    }, {
	      id: "tra_1512",
	      v3id: "5210",
	      name: "金崙",
	      sect: "taidong"
	    }, {
	      id: "tra_1514",
	      v3id: "5220",
	      name: "太麻里",
	      sect: "taidong"
	    }, {
	      id: "tra_1516",
	      v3id: "5230",
	      name: "知本",
	      sect: "taidong"
	    }, {
	      id: "tra_1517",
	      v3id: "5240",
	      name: "康樂",
	      sect: "taidong"
	    }, //海線及南迴線臨時資料
	    {
	      id: "tra_2003",
	      v3id: "7362",
	      name: "八斗子",
	      estring: "badouzi",
	      sect: "northeast"
	    }, {
	      id: "tra_6103",
	      v3id: "7361",
	      name: "海科館",
	      estring: "haikeguan",
	      sect: "northeast"
	    }, {
	      id: "tra_1903",
	      v3id: "7331",
	      name: "大華",
	      estring: "dahua",
	      sect: "northeast"
	    }, {
	      id: "tra_1904",
	      v3id: "7332",
	      name: "十分",
	      estring: "shifenshihfen",
	      sect: "northeast"
	    }, {
	      id: "tra_1905",
	      v3id: "7333",
	      name: "望古",
	      estring: "wanggu",
	      sect: "northeast"
	    }, {
	      id: "tra_1906",
	      v3id: "7334",
	      name: "嶺腳",
	      estring: "lingjiao",
	      sect: "northeast"
	    }, {
	      id: "tra_1907",
	      v3id: "7335",
	      name: "平溪",
	      estring: "pingxipingsi",
	      sect: "northeast"
	    }, {
	      id: "tra_1908",
	      v3id: "7336",
	      name: "菁桐",
	      estring: "jingtong",
	      sect: "northeast"
	    }, {
	      id: "tra_2212",
	      v3id: "1191",
	      name: "千甲",
	      estring: "qianjia",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2213",
	      v3id: "1192",
	      name: "新莊",
	      estring: "xinzhuang",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2203",
	      v3id: "1193",
	      name: "竹中",
	      estring: "zhuzhong",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2214",
	      v3id: "1194",
	      name: "六家",
	      estring: "liujia",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2204",
	      v3id: "1201",
	      name: "上員",
	      estring: "shangyuan",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2211",
	      v3id: "1202",
	      name: "榮華",
	      estring: "ronghua",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2205",
	      v3id: "1203",
	      name: "竹東",
	      estring: "zhudong",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2206",
	      v3id: "1204",
	      name: "橫山",
	      estring: "zhuzhong",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2207",
	      v3id: "1205",
	      name: "九讚頭",
	      estring: "jiouzantou",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2208",
	      v3id: "1206",
	      name: "合興",
	      estring: "hexinghesing",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2209",
	      v3id: "1207",
	      name: "富貴",
	      estring: "fuguei",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2210",
	      v3id: "1208",
	      name: "內灣",
	      estring: "neiwan",
	      sect: "hsinchu"
	    }, {
	      id: "tra_2702",
	      v3id: "3431",
	      name: "源泉",
	      estring: "yuanciyuanyuanquan",
	      sect: "changhua"
	    }, {
	      id: "tra_2703",
	      v3id: "3432",
	      name: "濁水",
	      estring: "zhuoshuijhoushuei",
	      sect: "changhua"
	    }, {
	      id: "tra_2704",
	      v3id: "3433",
	      name: "龍泉",
	      estring: "longquanlungcyuan",
	      sect: "changhua"
	    }, {
	      id: "tra_2705",
	      v3id: "3434",
	      name: "集集",
	      estring: "jiji",
	      sect: "changhua"
	    }, {
	      id: "tra_2706",
	      v3id: "3435",
	      name: "水里",
	      estring: "shuilishueili",
	      sect: "changhua"
	    }, {
	      id: "tra_2707",
	      v3id: "3436",
	      name: "車埕",
	      estring: "checheng",
	      sect: "changhua"
	    }, {
	      id: "tra_5101",
	      v3id: "4271",
	      name: "長榮大學",
	      estring: "changrongdaxuechangjungchristianuniversity",
	      sect: "tainan"
	    }, {
	      id: "tra_5102",
	      v3id: "4272",
	      name: "沙崙",
	      estring: "shalun",
	      sect: "tainan"
	    }],
	    line: [{
	      v2LineID: 'TL-N',
	      v3LineID: 'WL',
	      id: "tra_xibu",
	      name: "西部幹線(基隆-竹南)",
	      trainSect: ["keelung", "taipei", "taoyuan", "hsinchu"],
	      color: "#000050",
	      dir: "1",
	      area: 'w',
	      link: {
	        "tra_yilan": {
	          station: "tra_1002",
	          dir: "0"
	        },
	        "tra_shan": {
	          station: "tra_1028",
	          dir: "1"
	        },
	        "tra_hai": {
	          station: "tra_1028",
	          dir: "1"
	        },
	        "tra_liujia": {
	          station: "tra_1025",
	          dir: "0"
	        }
	      },
	      station: ["tra_1001", "tra_1029", "tra_1002", "tra_1003", "tra_1030", "tra_1004", "tra_1005", "tra_1031", "tra_1006", "tra_1007", "tra_1008", "tra_1009", "tra_1011", "tra_1032", "tra_1012", "tra_1034", "tra_1013", "tra_1014", //taipei
	      "tra_1015", "tra_1016", "tra_1017", "tra_1018", "tra_1019", "tra_1020", "tra_1036", "tra_1033", "tra_1021", "tra_1022", "tra_1023", "tra_1024", "tra_1025", "tra_1035", "tra_1026", "tra_1027", "tra_1028"]
	    }, {
	      v2LineID: 'TL-M',
	      v3LineID: 'WL',
	      id: "tra_shan",
	      name: "山線(竹南-彰化)",
	      trainSect: ["hsinchu", "miaoli", "taichung", "changhua"],
	      color: "#104020",
	      dir: "1",
	      area: 'w',
	      link: {
	        "tra_xibu": {
	          station: "tra_1028",
	          dir: "0"
	        },
	        "tra_zhjy": {
	          station: "tra_1120",
	          dir: "1"
	        }
	      },
	      station: ["tra_1028", "tra_1302", "tra_1304", "tra_1305", "tra_1307", "tra_1308", "tra_1310", "tra_1314", "tra_1315", "tra_1317", "tra_1325", "tra_1318", "tra_1326", "tra_1327", "tra_1323", "tra_1328", "tra_1319", "tra_1329", "tra_1322", "tra_1320", "tra_1324", "tra_1321", "tra_1120"]
	    }, {
	      v2LineID: 'TL-S',
	      v3LineID: 'WL',
	      id: "tra_zhjy",
	      name: "西部幹線(彰化-嘉義)",
	      trainSect: ["changhua", "yunlin", "chiayi"],
	      color: "#707010",
	      dir: "1",
	      area: 'w',
	      link: {
	        "tra_shan": {
	          station: "tra_1120",
	          dir: "0"
	        },
	        "tra_hai": {
	          station: "tra_1120",
	          dir: "0"
	        },
	        "tra_jiji": {
	          station: "tra_1207",
	          dir: "1"
	        },
	        "tra_jygx": {
	          station: "tra_1215",
	          dir: "1"
	        }
	      },
	      station: ["tra_1120", "tra_1202", "tra_1240", "tra_1203", "tra_1204", "tra_1205", "tra_1206", "tra_1207", "tra_1208", "tra_1209", "tra_1210", "tra_1211", "tra_1212", "tra_1213", "tra_1214", "tra_1241", "tra_1215"]
	    }, {
	      v2LineID: 'TL-S',
	      v3LineID: 'WL',
	      id: "tra_jygx",
	      name: "西部幹線(嘉義-高雄)",
	      trainSect: ["chiayi", "tainan", "kaohsiung"],
	      color: "#302040",
	      dir: "1",
	      area: 'w',
	      link: {
	        "tra_zhjy": {
	          station: "tra_1215",
	          dir: "0"
	        },
	        "tra_pingdong": {
	          station: "tra_1238",
	          dir: "1"
	        },
	        "tra_shalun": {
	          station: "tra_1230",
	          dir: "1"
	        }
	      },
	      station: ["tra_1215", "tra_1217", "tra_1218", "tra_1219", "tra_1220", "tra_1221", "tra_1222", "tra_1223", "tra_1224", "tra_1225", "tra_1244", "tra_1226", "tra_1227", "tra_1239", "tra_1228", "tra_1229", "tra_1243", "tra_1230", "tra_1231", "tra_1232", "tra_1233", "tra_1234", "tra_1235", "tra_1242", "tra_1236", "tra_1245", "tra_1246", "tra_1237", "tra_1247", "tra_1238"]
	    }, {
	      v2LineID: 'PL',
	      v3LineID: 'WL|SL',
	      id: "tra_pingdong",
	      name: "屏東線",
	      trainSect: ["kaohsiung", "pingdong"],
	      color: "#7D3810",
	      dir: "1",
	      area: 'w',
	      innerNeedTransAt: 'tra_1411',
	      link: {
	        "tra_jygx": {
	          station: "tra_1238",
	          dir: "0"
	        }
	      },
	      station: ["tra_1238", "tra_1419", "tra_1420", "tra_1421", "tra_1402", "tra_1403", "tra_1404", "tra_1405", "tra_1406", "tra_1407", "tra_1408", "tra_1409", "tra_1410", "tra_1411", "tra_1412", "tra_1413", "tra_1414", "tra_1415", "tra_1416", "tra_1417", "tra_1418"]
	    }, {
	      v2LineID: 'YL',
	      v3LineID: 'EL|SU',
	      id: "tra_yilan",
	      name: "宜蘭線",
	      trainSect: ["taipei", "keelung", "northeast", "yilan"],
	      color: "#500000",
	      dir: "0",
	      area: 'e',
	      link: {
	        "tra_xibu": {
	          station: "tra_1002",
	          dir: "1"
	        },
	        "tra_beihui": {
	          station: "tra_1826",
	          dir: "0"
	        },
	        "tra_pingxi": {
	          station: "tra_1804",
	          dir: "0"
	        }
	      },
	      //commonCrossLineStation: ["tra_1012","tra_1032","tra_1011","tra_1009","tra_1008","tra_1007","tra_1006","tra_1031","tra_1005","tra_1004","tra_1030","tra_1003"],
	      station: ["tra_1002", "tra_1802", "tra_1803", "tra_1804", "tra_1805", "tra_1806", "tra_1807", "tra_1808", "tra_1809", "tra_1810", //taipei
	      "tra_1811", "tra_1812", "tra_1813", "tra_1814", "tra_1815", "tra_1816", "tra_1817", "tra_1818", "tra_1819", "tra_1820", "tra_1821", "tra_1822", "tra_1823", "tra_1824", "tra_1825", "tra_1826", "tra_1827"]
	    }, {
	      v2LineID: 'NL',
	      v3LineID: 'EL',
	      id: "tra_beihui",
	      name: "北迴線(蘇澳-花蓮)",
	      trainSect: ["taipei", "keelung", "northeast", "yilan", "beihui", "hualian"],
	      color: "#004060",
	      dir: "0",
	      area: 'e',
	      link: {
	        "tra_yilan": {
	          station: "tra_1826",
	          dir: "1"
	        },
	        "tra_huadong": {
	          station: "tra_1715",
	          dir: "0"
	        }
	      },
	      station: ["tra_1826", "tra_1703", "tra_1704", "tra_1705", "tra_1706", "tra_1708", "tra_1709", "tra_1710", "tra_1711", "tra_1712", "tra_1713", "tra_1714", "tra_1715"]
	    }, {
	      v2LineID: 'TT',
	      v3LineID: 'EL',
	      id: "tra_huadong",
	      name: "台東線",
	      trainSect: ["taipei", "keelung", "northeast", "yilan", "beihui", "hualian", "taidong"],
	      color: "#605040",
	      dir: "0",
	      area: 'e',
	      link: {
	        "tra_beihui": {
	          station: "tra_1715",
	          dir: "1"
	        }
	      },
	      station: ["tra_1715", "tra_1602", "tra_1604", "tra_1605", "tra_1606", "tra_1607", "tra_1608", "tra_1609", "tra_1610", "tra_1611", "tra_1612", "tra_1613", "tra_1614", "tra_1616", "tra_1617", "tra_1619", "tra_1621", "tra_1622", "tra_1623", "tra_1624", "tra_1625", "tra_1626", "tra_1628", "tra_1629", "tra_1630", "tra_1631", "tra_1632"]
	    }, {
	      v2LineID: 'TL-C',
	      v3LineID: 'WL-C',
	      id: "tra_hai",
	      name: "海線",
	      trainSect: ["miaoli", "taichung"],
	      color: "#2050C0",
	      dir: "1",
	      area: 'w',
	      link: {
	        "tra_xibu": {
	          station: "tra_1028",
	          dir: "0"
	        },
	        "tra_zhjy": {
	          station: "tra_1120",
	          dir: "1"
	        }
	      },
	      station: ["tra_1028", "tra_1102", "tra_1104", "tra_1105", "tra_1106", "tra_1107", "tra_1108", "tra_1109", "tra_1110", "tra_1111", "tra_1112", "tra_1113", "tra_1114", "tra_1115", "tra_1116", "tra_1117", "tra_1118", "tra_1120"]
	    }, {
	      v2LineID: 'PX|SA',
	      v3LineID: 'PX|SA',
	      id: "tra_pingxi",
	      name: "平溪線",
	      trainSect: ["northeast"],
	      color: "#003030",
	      dir: "0",
	      area: 'e',
	      protectStation: ["tra_1804"],
	      link: {
	        "tra_yilan": {
	          station: "tra_1804",
	          dir: "1"
	        }
	      },
	      station: ["tra_2003", "tra_6103", "tra_1804", "tra_1805", "tra_1806", "tra_1903", "tra_1904", "tra_1905", "tra_1906", "tra_1907", "tra_1908"]
	    }, {
	      v2LineID: 'NW|LJ',
	      v3LineID: 'NW|LJ',
	      id: "tra_liujia",
	      name: "內灣／六家線",
	      trainSect: ["hsinchu"],
	      color: "#403090",
	      dir: "0",
	      area: 'w',
	      protectStation: ["tra_1024", "tra_1025"],
	      protectStationSect: {
	        "tra_1024": "taoyuan,hsinchu"
	      },
	      subWorkingArea: {
	        transAt: "tra_2203",
	        transStationID: "zhuzhongtra1",
	        station: ["tra_2204", "tra_2211", "tra_2205", "tra_2206", "tra_2207", "tra_2208", "tra_2209", "tra_2210"]
	      },
	      link: {
	        "tra_xibu": {
	          station: "tra_1025",
	          dir: "1"
	        }
	      },
	      station: ["tra_1025", "tra_1024", "tra_2212", "tra_2213", "tra_2203", "tra_2214", "tra_2204", "tra_2211", "tra_2205", "tra_2206", "tra_2207", "tra_2208", "tra_2209", "tra_2210"]
	    }, {
	      v2LineID: 'JJ',
	      v3LineID: 'JJ',
	      id: "tra_jiji",
	      name: "集集線",
	      trainSect: ["changhua"],
	      color: "#22A050",
	      dir: "1",
	      area: 'w',
	      link: {
	        "tra_zhjy": {
	          station: "tra_1207",
	          dir: "0"
	        }
	      },
	      station: ["tra_1207", "tra_2702", "tra_2703", "tra_2704", "tra_2705", "tra_2706", "tra_2707"]
	    }, {
	      v2LineID: 'SH',
	      v3LineID: 'SH',
	      id: "tra_shalun",
	      name: "沙崙線",
	      trainSect: ["tainan"],
	      color: "#124060",
	      dir: "1",
	      area: 'w',
	      protectStation: ["tra_1230"],
	      link: {
	        "tra_jygx": {
	          station: "tra_1230",
	          dir: "0"
	        }
	      },
	      station: ["tra_1230", "tra_5101", "tra_5102"]
	    }],
	    running_ary: [{
	      id: 'eTemu',
	      cate: 'express',
	      CarClass: ['1107', '1102'],
	      dir: '0',
	      area: 'e',
	      range: ['tra_1012', 'tra_1632'],
	      name: '東部幹線太魯閣號、普悠瑪號',
	      rangeSplit: 'tra_1715',
	      lineOf: ['tra_xibu', 'tra_yilan', 'tra_beihui', 'tra_huadong'],
	      mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007', 'tra_1715', 'tra_1619', 'tra_1632'],
	      maybeStop: ['tra_1006', 'tra_1003', 'tra_1820', 'tra_1823', 'tra_1606', 'tra_1610', 'tra_1612', 'tra_1616', 'tra_1626'],
	      lessStop: ['tra_1002', 'tra_1804', 'tra_1816', 'tra_1818', 'tra_1712', 'tra_1602', 'tra_1604', 'tra_1611', 'tra_1623', 'tra_1624', 'tra_1630']
	    }, {
	      id: 'eZi',
	      cate: 'express',
	      CarClass: ['1100', '1101', '1103', '1108', '1109', '110A', '110B', '110C', '110D', '110E', '110F'],
	      dir: '0',
	      area: 'e',
	      range: ['tra_1012', 'tra_1632'],
	      name: '東部幹線自強號',
	      rangeSplit: 'tra_1715',
	      lineOf: ['tra_xibu', 'tra_yilan', 'tra_beihui', 'tra_huadong'],
	      mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007', 'tra_1820', 'tra_1823', 'tra_1715', 'tra_1619', 'tra_1632'],
	      maybeStop: ['tra_1003', 'tra_1804', 'tra_1816', 'tra_1818', 'tra_1826', 'tra_1705', 'tra_1712', 'tra_1602', 'tra_1604', 'tra_1611', 'tra_1623', 'tra_1624', 'tra_1630'],
	      lessStop: ['tra_1009', 'tra_1006', 'tra_1005', 'tra_1002', 'tra_1808', 'tra_1810', 'tra_1709']
	    }, {
	      id: 'eJv',
	      cate: 'express',
	      CarClass: ['1110', '11111', '1114', '1115'],
	      dir: '0',
	      area: 'e',
	      range: ['tra_1012', 'tra_1632'],
	      name: '東部幹線莒光號',
	      rangeSplit: 'tra_1715',
	      lineOf: ['tra_xibu', 'tra_yilan', 'tra_beihui', 'tra_huadong'],
	      mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007', 'tra_1804', 'tra_1816', 'tra_1818', 'tra_1820', 'tra_1823', 'tra_1715', 'tra_1619', 'tra_1632'],
	      maybeStop: ['tra_1005', 'tra_1003', 'tra_1826', 'tra_1705', 'tra_1712', 'tra_1602', 'tra_1604', 'tra_1611', 'tra_1623', 'tra_1624', 'tra_1630'],
	      lessStop: ['tra_1009', 'tra_1002', 'tra_1805', 'tra_1808', 'tra_1810', 'tra_1704', 'tra_1709', 'tra_1607', 'tra_1621', 'tra_1622']
	    }, {
	      //西部對號
	      id: 'wZi',
	      cate: 'express',
	      CarClass: ['1100', '1101', '1103', '1108', '1109', '110A', '110B', '110C', '110D', '110E', '110F'],
	      dir: '1',
	      area: 'w',
	      range: ['tra_1003', 'tra_1411'],
	      name: '西部幹線自強號',
	      lineOf: ['tra_xibu', 'tra_shan', 'tra_zhjy', 'tra_jygx', 'tra_pingdong'],
	      mustStop: ['tra_1003', 'tra_1007', 'tra_1008', 'tra_1011', 'tra_1015', 'tra_1017', 'tra_1025', 'tra_1305', 'tra_1317', 'tra_1319', 'tra_1120', 'tra_1210', 'tra_1215', 'tra_1228', 'tra_1242', 'tra_1238', 'tra_1402', 'tra_1406', 'tra_1411'],
	      maybeStop: ['tra_1005', 'tra_1028', 'tra_1203', 'tra_1206', 'tra_1211', 'tra_1220', 'tra_1404'],
	      lessStop: ['tra_1006', 'tra_1012', 'tra_1214', 'tra_1225', 'tra_1227', 'tra_1233']
	    }, {
	      id: 'wJv',
	      cate: 'express',
	      CarClass: ['1110', '11111', '1114', '1115'],
	      dir: '1',
	      area: 'w',
	      range: ['tra_1003', 'tra_1411'],
	      name: '西部幹線莒光號',
	      lineOf: ['tra_xibu', 'tra_hai', 'tra_zhjy', 'tra_jygx', 'tra_pingdong'],
	      mustStop: ['tra_1003', 'tra_1005', 'tra_1007', 'tra_1008', 'tra_1011', 'tra_1012', 'tra_1015', 'tra_1017', 'tra_1019', 'tra_1021', 'tra_1025', 'tra_1028', 'tra_1105', 'tra_1109', 'tra_1110', 'tra_1112', 'tra_1114', 'tra_1115', 'tra_1120', 'tra_1203', 'tra_1206', 'tra_1210', 'tra_1211', 'tra_1215', 'tra_1220', 'tra_1223', 'tra_1225', 'tra_1228', 'tra_1233', 'tra_1242', 'tra_1238', 'tra_1402', 'tra_1406', 'tra_1411'],
	      maybeStop: ['tra_1023', 'tra_1207', 'tra_1213', 'tra_1214', 'tra_1227', 'tra_1404'],
	      lessStop: ['tra_1014', 'tra_1107', 'tra_1117', 'tra_1214', 'tra_1226', 'tra_1231', 'tra_1232']
	    }, {
	      //南迴線對號
	      id: 'sZi',
	      cate: 'express',
	      CarClass: ['1100', '1101', '1103', '1108', '1109', '110A', '110B', '110C', '110D', '110E', '110F'],
	      dir: '1',
	      area: 's',
	      range: ['tra_1242', 'tra_1632'],
	      name: '南迴線自強號',
	      lineOf: ['tra_jygx', 'tra_pingdong'],
	      mustStop: ['tra_1242', 'tra_1238', 'tra_1402', 'tra_1406', 'tra_1411', 'tra_1418', 'tra_1508', 'tra_1514', 'tra_1516', 'tra_1632'],
	      maybeStop: ['tra_1413', 'tra_1415', 'tra_1512'],
	      lessStop: ['tra_1404', 'tra_1510', 'tra_1517']
	    }, {
	      id: 'sJvFu',
	      cate: 'express',
	      CarClass: ['1110', '11111', '1114', '1115', '1120'],
	      dir: '1',
	      area: 's',
	      range: ['tra_1242', 'tra_1632'],
	      name: '南迴線莒光號、復興號',
	      lineOf: ['tra_jygx', 'tra_pingdong'],
	      mustStop: ['tra_1242', 'tra_1238', 'tra_1402', 'tra_1406', 'tra_1411', 'tra_1418', 'tra_1508', 'tra_1512', 'tra_1514', 'tra_1516', 'tra_1632'],
	      maybeStop: ['tra_1404', 'tra_1413', 'tra_1415', 'tra_1510', 'tra_1517'],
	      lessStop: []
	    }, {
	      id: 'eLocal1',
	      cate: 'local',
	      CarClass: ['1131'],
	      dir: '0',
	      area: 'e',
	      range: ['tra_1012', 'tra_1827'],
	      name: '宜蘭線區間車',
	      stopAll: true,
	      lineOf: ['tra_xibu', 'tra_yilan']
	    }, {
	      id: 'eLocal2',
	      cate: 'local',
	      CarClass: ['1131'],
	      dir: '0',
	      area: 'e',
	      range: ['tra_1820', 'tra_1715'],
	      name: '北迴線區間車',
	      stopAll: true,
	      lineOf: ['tra_yilan', 'tra_beihui']
	    }, {
	      id: 'eLocal3',
	      cate: 'local',
	      CarClass: ['1131'],
	      dir: '0',
	      area: 'e',
	      range: ['tra_1715', 'tra_1632'],
	      name: '臺東線區間車',
	      stopAll: true,
	      maybeStop: ['tra_1608'],
	      //當stopAll 時 maybeStop 表示為不一定停靠
	      lineOf: ['tra_huadong']
	    }, {
	      id: 'wLocal1',
	      cate: 'local',
	      CarClass: ['1131'],
	      dir: '1',
	      area: 'w',
	      range: ['tra_1001', 'tra_1025'],
	      name: '基隆新竹段區間車',
	      stopAll: true,
	      lineOf: ['tra_xibu']
	    }, {
	      id: 'wLocal2',
	      cate: 'local',
	      CarClass: ['1131'],
	      dir: '1',
	      area: 'w',
	      range: ['tra_1025', 'tra_1120'],
	      name: '山線區間車',
	      stopAll: true,
	      lineOf: ['tra_xibu', 'tra_shan']
	    }, {
	      id: 'wLocal3',
	      cate: 'local',
	      CarClass: ['1131'],
	      dir: '1',
	      area: 'w',
	      range: ['tra_1025', 'tra_1120'],
	      name: '海線區間車',
	      stopAll: true,
	      lineOf: ['tra_xibu', 'tra_hai']
	    }, {
	      id: 'wLocal4',
	      cate: 'local',
	      CarClass: ['1131'],
	      dir: '1',
	      area: 'w',
	      range: ['tra_1120', 'tra_1215'],
	      name: '彰化嘉義段區間車',
	      stopAll: true,
	      lineOf: ['tra_zhjy']
	    }, {
	      id: 'wLocal5',
	      cate: 'local',
	      CarClass: ['1131'],
	      dir: '1',
	      area: 'w',
	      range: ['tra_1215', 'tra_1411'],
	      name: '嘉義潮州段區間車',
	      stopAll: true,
	      lineOf: ['tra_jygx', 'tra_pingdong']
	    }, {
	      id: 'wLocal6',
	      cate: 'local',
	      CarClass: ['1131'],
	      dir: '1',
	      area: 'w',
	      range: ['tra_1411', 'tra_1418'],
	      name: '潮州枋寮段區間車',
	      stopAll: true,
	      lineOf: ['tra_pingdong']
	    }, {
	      id: 'sLocal',
	      cate: 'local',
	      CarClass: ['1131'],
	      dir: '1',
	      area: 's',
	      range: ['tra_1418', 'tra_1632'],
	      name: '南迴線區間車',
	      stopAll: true,
	      lineOf: ['']
	    }, {
	      id: 'subPX',
	      cate: 'local',
	      CarClass: ['1150', '1131'],
	      dir: '0',
	      area: 'e',
	      range: ['tra_2003', 'tra_1908'],
	      name: '平溪線',
	      stopAll: true,
	      lineOf: ['tra_pingxi']
	    }, {
	      id: 'subLJ',
	      cate: 'local',
	      CarClass: ['1131'],
	      dir: '0',
	      area: 'w',
	      range: ['tra_1025', 'tra_2214'],
	      name: '六家線',
	      stopAll: true,
	      lineOf: ['tra_liujia']
	    }, {
	      id: 'subNW',
	      cate: 'local',
	      CarClass: ['1150', '1131'],
	      dir: '0',
	      area: 'w',
	      range: ['tra_2203', 'tra_2210'],
	      name: '內灣線',
	      stopAll: true,
	      lineOf: ['tra_liujia']
	    }, {
	      id: 'subJJ',
	      cate: 'local',
	      CarClass: ['1150', '1131'],
	      dir: '1',
	      area: 'w',
	      range: ['tra_1207', 'tra_2707'],
	      name: '集集線',
	      stopAll: true,
	      lineOf: ['tra_jiji']
	    }, {
	      id: 'subSL',
	      cate: 'local',
	      CarClass: ['1150', '1131'],
	      dir: '1',
	      area: 'w',
	      range: ['tra_1228', 'tra_5102'],
	      name: '沙崙線',
	      stopAll: true,
	      lineOf: ['tra_jygx', 'tra_shalun']
	    }]
	  },
	  //================ 以下為轉乘用途資料，非 PTX 資料 ===============================
	  transStation: [{
	    id: 'taidongtra1',
	    name: "台東",
	    changeLine: ["tra_huadong", "tra_huadong"],
	    changeStation: ['tra_1632', 'tra_1632'],
	    walkMinute: 4
	  }, {
	    id: 'yulitra1',
	    name: "玉里",
	    changeLine: ["tra_huadong", "tra_huadong"],
	    changeStation: ['tra_1619', 'tra_1619'],
	    walkMinute: 4
	  }, {
	    id: 'hualiantra1',
	    name: "花蓮",
	    changeLine: ["tra_beihui", "tra_huadong"],
	    changeStation: ['tra_1715', 'tra_1715'],
	    walkMinute: 4
	  }, {
	    id: 'xingcheng',
	    name: "新城",
	    changeLine: ["tra_beihui", "tra_beihui"],
	    changeStation: ['tra_1712', 'tra_1712'],
	    walkMinute: 2
	  }, {
	    id: 'nanaotra1',
	    name: "南澳",
	    changeLine: ["tra_beihui", "tra_beihui"],
	    changeStation: ['tra_1705', 'tra_1705'],
	    walkMinute: 2
	  }, {
	    id: 'suaoxintra1',
	    name: "蘇澳新",
	    changeLine: ["tra_yilan", "tra_beihui"],
	    changeStation: ['tra_1826', 'tra_1826'],
	    walkMinute: 4
	  }, {
	    id: 'luodongtra1',
	    name: "羅東",
	    changeLine: ["tra_yilan", "tra_yilan"],
	    changeStation: ['tra_1823', 'tra_1823'],
	    walkMinute: 4
	  }, {
	    id: 'yilantra1',
	    name: "宜蘭",
	    changeLine: ["tra_yilan", "tra_yilan"],
	    changeStation: ['tra_1820', 'tra_1820'],
	    walkMinute: 4
	  }, {
	    id: 'toucheng1',
	    name: "頭城",
	    changeLine: ["tra_yilan", "tra_yilan"],
	    changeStation: ['tra_1816', 'tra_1816'],
	    walkMinute: 4
	  }, {
	    id: 'ruifangtra1',
	    name: "瑞芳",
	    changeLine: ["tra_yilan", "tra_pingxi"],
	    changeStation: ['tra_1804', 'tra_1804'],
	    walkMinute: 4
	  }, {
	    id: 'badutra1',
	    name: "八堵",
	    changeLine: ["tra_xibu", "tra_yilan"],
	    changeStation: ['tra_1002', 'tra_1002'],
	    walkMinute: 3
	  }, {
	    id: 'qidutra1',
	    name: "七堵",
	    changeLine: ["tra_xibu", "tra_xibu"],
	    changeStation: ['tra_1003', 'tra_1003'],
	    walkMinute: 3
	  }, {
	    id: 'songshantra1',
	    name: "松山",
	    changeLine: ["tra_xibu", "tra_xibu"],
	    changeStation: ['tra_1007', 'tra_1007'],
	    walkMinute: 3
	  }, {
	    id: 'taipeitra1',
	    name: "台北",
	    changeLine: ["tra_xibu", "tra_xibu"],
	    changeStation: ['tra_1008', 'tra_1008'],
	    walkMinute: 3
	  }, {
	    id: 'banqiaotra1',
	    name: "板橋",
	    changeLine: ["tra_xibu", "tra_xibu"],
	    changeStation: ['tra_1011', 'tra_1011'],
	    walkMinute: 3
	  }, {
	    id: 'taoyuantra1',
	    name: "桃園",
	    changeLine: ["tra_xibu", "tra_xibu"],
	    changeStation: ['tra_1015', 'tra_1015'],
	    walkMinute: 3
	  }, {
	    id: 'zhonglitra1',
	    name: "中壢",
	    changeLine: ["tra_xibu", "tra_xibu"],
	    changeStation: ['tra_1017', 'tra_1017'],
	    walkMinute: 3
	  }, {
	    id: 'northhsinchutra1',
	    name: "北新竹",
	    changeLine: ["tra_xibu", "tra_liujia"],
	    changeStation: ['tra_1024', 'tra_1024'],
	    walkMinute: 4
	  }, {
	    id: 'hsinchutra1',
	    name: "新竹",
	    changeLine: ["tra_xibu", "tra_liujia"],
	    changeStation: ['tra_1025', 'tra_1025'],
	    walkMinute: 4
	  }, {
	    id: 'zhunantra1',
	    name: "竹南",
	    changeLine: ["tra_xibu", "tra_shan"],
	    changeStation: ['tra_1028', 'tra_1028'],
	    walkMinute: 3
	  }, {
	    id: 'zhunantra2',
	    name: "竹南",
	    changeLine: ["tra_xibu", "tra_hai"],
	    changeStation: ['tra_1028', 'tra_1028'],
	    walkMinute: 3
	  }, {
	    id: 'zhunantra3',
	    name: "竹南",
	    changeLine: ["tra_shan", "tra_hai"],
	    changeStation: ['tra_1028', 'tra_1028'],
	    walkMinute: 3
	  }, {
	    id: 'miaolitra1',
	    name: "苗栗",
	    changeLine: ["tra_shan", "tra_shan"],
	    changeStation: ['tra_1305', 'tra_1305'],
	    walkMinute: 4
	  }, {
	    id: 'fengyuantra1',
	    name: "豐原",
	    changeLine: ["tra_shan", "tra_shan"],
	    changeStation: ['tra_1317', 'tra_1317'],
	    walkMinute: 4
	  }, {
	    id: 'taizhongtra1',
	    name: "台中",
	    changeLine: ["tra_shan", "tra_shan"],
	    changeStation: ['tra_1319', 'tra_1319'],
	    walkMinute: 4
	  }, {
	    id: 'zhanghuatra1',
	    name: "彰化",
	    changeLine: ["tra_shan", "tra_zhjy"],
	    changeStation: ['tra_1120', 'tra_1120'],
	    walkMinute: 4
	  }, {
	    id: 'zhanghuatra2',
	    name: "彰化",
	    changeLine: ["tra_hai", "tra_zhjy"],
	    changeStation: ['tra_1120', 'tra_1120'],
	    walkMinute: 4
	  }, {
	    id: 'zhanghuatra3',
	    name: "彰化",
	    changeLine: ["tra_shan", "tra_hai"],
	    changeStation: ['tra_1120', 'tra_1120'],
	    walkMinute: 4
	  }, {
	    id: 'yuanlintra1',
	    name: "員林",
	    changeLine: ["tra_zhjy", "tra_zhjy"],
	    changeStation: ['tra_1203', 'tra_1203'],
	    walkMinute: 4
	  }, {
	    id: 'douliutra1',
	    name: "斗六",
	    changeLine: ["tra_zhjy", "tra_zhjy"],
	    changeStation: ['tra_1210', 'tra_1210'],
	    walkMinute: 4
	  }, {
	    id: 'jiayitra1',
	    name: "嘉義",
	    changeLine: ["tra_zhjy", "tra_jygx"],
	    changeStation: ['tra_1215', 'tra_1215'],
	    walkMinute: 4
	  }, {
	    id: 'xinyingtra1',
	    name: "新營",
	    changeLine: ["tra_jygx", "tra_jygx"],
	    changeStation: ['tra_1220', 'tra_1220'],
	    walkMinute: 4
	  }, {
	    id: 'tainantra1',
	    name: "台南",
	    changeLine: ["tra_jygx", "tra_shalun"],
	    changeStation: ['tra_1228', 'tra_1228'],
	    walkMinute: 4
	  }, {
	    id: 'zhongzhoutra1',
	    name: "中洲",
	    changeLine: ["tra_jygx", "tra_shalun"],
	    changeStation: ['tra_1230', 'tra_1230'],
	    walkMinute: 4
	  }, {
	    id: 'gangshantra1',
	    name: "岡山",
	    changeLine: ["tra_jygx", "tra_jygx"],
	    changeStation: ['tra_1233', 'tra_1233'],
	    walkMinute: 4
	  }, {
	    id: 'gaoxungtra1',
	    name: "高雄",
	    changeLine: ["tra_jygx", "tra_pingdong"],
	    changeStation: ['tra_1238', 'tra_1238'],
	    walkMinute: 4
	  }, {
	    id: 'fongshantra1',
	    name: "鳳山",
	    changeLine: ["tra_pingdong", "tra_pingdong"],
	    changeStation: ['tra_1402', 'tra_1402'],
	    walkMinute: 1
	  }, {
	    id: 'pingdongtra1',
	    name: "屏東",
	    changeLine: ["tra_pingdong", "tra_pingdong"],
	    changeStation: ['tra_1406', 'tra_1406'],
	    walkMinute: 1
	  }, {
	    id: 'chaozhoutra1',
	    name: "潮州",
	    changeLine: ["tra_pingdong", "tra_pingdong"],
	    changeStation: ['tra_1411', 'tra_1411'],
	    walkMinute: 1
	  }, {
	    id: 'holongtra1',
	    name: "後龍",
	    changeLine: ["tra_hai", "tra_hai"],
	    changeStation: ['tra_1105', 'tra_1105'],
	    walkMinute: 1
	  }, {
	    id: 'tongxiaotra1',
	    name: "通霄",
	    changeLine: ["tra_hai", "tra_hai"],
	    changeStation: ['tra_1109', 'tra_1109'],
	    walkMinute: 1
	  }, {
	    id: 'yuanlitra1',
	    name: "苑裡",
	    changeLine: ["tra_hai", "tra_hai"],
	    changeStation: ['tra_1110', 'tra_1110'],
	    walkMinute: 1
	  }, {
	    id: 'dajiatra1',
	    name: "大甲",
	    changeLine: ["tra_hai", "tra_hai"],
	    changeStation: ['tra_1112', 'tra_1112'],
	    walkMinute: 1
	  }, {
	    id: 'qingshuitra1',
	    name: "清水",
	    changeLine: ["tra_hai", "tra_hai"],
	    changeStation: ['tra_1114', 'tra_1114'],
	    walkMinute: 1
	  }, {
	    id: 'shalutra1',
	    name: "沙鹿",
	    changeLine: ["tra_hai", "tra_hai"],
	    changeStation: ['tra_1115', 'tra_1115'],
	    walkMinute: 1
	  }, {
	    id: 'zhuzhongtra1',
	    name: "竹中",
	    changeLine: ["tra_liujia", "tra_liujia"],
	    changeStation: ['tra_2203', 'tra_2203'],
	    walkMinute: 3
	  }, {
	    id: 'nangang1',
	    name: "南港",
	    changeLine: ["tra_xibu", "trtc_5"],
	    changeStation: ['tra_1006', 'trtc_097'],
	    video: {
	      "tra_1006": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/AIQETgZdBKM'
	      },
	      "trtc_097": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/HNBdfyBxMa8'
	      }
	    },
	    walkMinute: 5
	  }, {
	    id: 'songshan1',
	    name: "松山",
	    changeLine: ["tra_xibu", "trtc_3"],
	    changeStation: ['tra_1007', 'trtc_111'],
	    video: {
	      "tra_1007": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/CFX9EdLwT9A'
	      },
	      "trtc_111": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/64ADnwMTLyQ'
	      }
	    },
	    walkMinute: 6
	  }, {
	    id: 'ximen1',
	    name: "西門",
	    changeLine: ["trtc_5", "trtc_3"],
	    changeStation: ['trtc_086', 'trtc_086'],
	    walkMinute: 1
	  }, {
	    id: 'zhongshan1',
	    name: "中山",
	    changeLine: ["trtc_3", "trtc_2"],
	    changeStation: ['trtc_053', 'trtc_053'],
	    walkMinute: 2
	  }, {
	    id: 'taipei1',
	    name: "台北",
	    changeLine: ["tra_xibu", "trtc_5"],
	    changeStation: ['tra_1008', 'trtc_051'],
	    walkMinute: 7
	  }, {
	    id: 'taipei2',
	    name: "台北",
	    changeLine: ["tra_xibu", "trtc_2"],
	    changeStation: ['tra_1008', 'trtc_051'],
	    walkMinute: 4
	  }, {
	    id: 'taipei3',
	    name: "台北",
	    changeLine: ["trtc_5", "trtc_2"],
	    changeStation: ['trtc_051', 'trtc_051'],
	    walkMinute: 3
	  }, {
	    id: 'taipei4',
	    name: "台北",
	    //機捷台鐵
	    changeLine: ["tra_xibu", "tymetro_1"],
	    changeStation: ['tra_1008', 'tymetro_a01'],
	    video: {
	      "tra_1008": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/dxfIJJ0b_3o'
	      },
	      "tymetro_a01": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/ulOu7N85QRo'
	      }
	    },
	    walkMinute: 7
	  }, {
	    id: 'taipei5',
	    name: "台北",
	    //機捷淡水線
	    changeLine: ["trtc_2", "tymetro_1"],
	    changeStation: ['trtc_051', 'tymetro_a01'],
	    video: {
	      "trtc_2": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/gq7FJbhUN7U'
	      },
	      "tymetro_a01": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/A6PPO4zqxJI'
	      }
	    },
	    walkMinute: 12
	  }, {
	    id: 'taipei6',
	    name: "台北",
	    //機捷板南線
	    changeLine: ["trtc_5", "tymetro_1"],
	    changeStation: ['trtc_051', 'tymetro_a01'],
	    video: {
	      "trtc_5": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/n7FgZ1-sDyk'
	      },
	      "tymetro_a01": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/uaLbpXkDiX4'
	      }
	    },
	    walkMinute: 11
	  }, {
	    id: 'taipei7',
	    name: "北門",
	    //機捷松山線
	    changeLine: ["trtc_3", "tymetro_1"],
	    changeStation: ['trtc_105', 'tymetro_a01'],
	    video: {
	      "trtc_105": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/X_sjsSHqsoU'
	      },
	      "tymetro_a01": {
	        width: 420,
	        height: 315,
	        src: 'https://www.youtube.com/embed/g5nm5Sbn6bw'
	      }
	    },
	    walkMinute: 11
	  }, {
	    id: 'sanchong1',
	    name: "三重",
	    //機捷新莊線
	    changeLine: ["trtc_4", "tymetro_1"],
	    changeStation: ['trtc_125', 'tymetro_a02'],
	    walkMinute: 7
	  }, {
	    id: 'cksmh1',
	    name: "中正紀念堂",
	    changeLine: ["trtc_3", "trtc_2"],
	    changeStation: ['trtc_042', 'trtc_042'],
	    walkMinute: 1
	  }, {
	    id: 'banqiao1',
	    name: "板橋",
	    changeLine: ["tra_xibu", "trtc_5"],
	    changeStation: ['tra_1011', 'trtc_082'],
	    walkMinute: 7
	  }, {
	    id: 'mqxl1',
	    name: "民權西路",
	    changeLine: ["trtc_2", "trtc_4"],
	    changeStation: ['trtc_055', 'trtc_055'],
	    walkMinute: 3
	  }, {
	    id: 'dongmen1',
	    name: "東門",
	    changeLine: ["trtc_2", "trtc_4"],
	    changeStation: ['trtc_134', 'trtc_134'],
	    walkMinute: 1
	  }, {
	    id: 'guting1',
	    name: "古亭",
	    changeLine: ["trtc_3", "trtc_4"],
	    changeStation: ['trtc_041', 'trtc_041'],
	    walkMinute: 1
	  }, {
	    id: 'zhongxiaoxs1',
	    name: "忠孝新生",
	    changeLine: ["trtc_5", "trtc_4"],
	    changeStation: ['trtc_089', 'trtc_089'],
	    walkMinute: 2
	  }, {
	    id: 'sjnanjing1',
	    name: "松江南京",
	    changeLine: ["trtc_3", "trtc_4"],
	    changeStation: ['trtc_132', 'trtc_132'],
	    walkMinute: 2
	  }, {
	    id: 'daqiaotou1',
	    name: "大橋頭",
	    changeLine: ["trtc_4", "trtc_4"],
	    changeStation: ['trtc_128', 'trtc_128'],
	    walkMinute: 1
	  }, {
	    id: 'changgengyiyuan1',
	    name: "長庚醫院",
	    changeLine: ["tymetro_1", "tymetro_1"],
	    changeStation: ['tymetro_a08', 'tymetro_a08'],
	    walkMinute: 0
	  }],
	  routeMap: [{
	    id: 'traInnerTrans_tra_xibu,tra_jygx',
	    fromToLine: ["tra_xibu", "tra_jygx"],
	    sect: ['keelung', 'taipei', 'taoyuan', 'hsinchu', 'chiayi', 'tainan', 'kaohsiung'],
	    route: [{
	      line: ["tra_xibu", "tra_jygx"],
	      transStation: ["qidutra1"]
	    }, {
	      line: ["tra_xibu", "tra_jygx"],
	      transStation: ["songshantra1"]
	    }, {
	      line: ["tra_xibu", "tra_jygx"],
	      transStation: ["taipeitra1"]
	    }, {
	      line: ["tra_xibu", "tra_jygx"],
	      transStation: ["banqiaotra1"]
	    }, {
	      line: ["tra_xibu", "tra_jygx"],
	      transStation: ["taoyuantra1"]
	    }, {
	      line: ["tra_xibu", "tra_jygx"],
	      transStation: ["zhonglitra1"]
	    }, {
	      line: ["tra_xibu", "tra_jygx"],
	      transStation: ["hsinchutra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["jiayitra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["xinyingtra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["tainantra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["gangshantra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["gaoxungtra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_xibu,tra_zhjy',
	    fromToLine: ["tra_xibu", "tra_zhjy"],
	    sect: ['keelung', 'taipei', 'taoyuan', 'hsinchu', 'changhua', 'yunlin', 'chiayi'],
	    route: [{
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["qidutra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["songshantra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["taipeitra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["banqiaotra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["taoyuantra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["zhonglitra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["hsinchutra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["zhunantra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["zhanghuatra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["yuanlintra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["douliutra1"]
	    }, {
	      line: ["tra_xibu", "tra_zhjy"],
	      transStation: ["jiayitra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_xibu,tra_shan',
	    fromToLine: ["tra_xibu", "tra_shan"],
	    sect: ['keelung', 'taipei', 'taoyuan', 'hsinchu', 'miaoli', 'taichung', 'changhua'],
	    route: [{
	      line: ["tra_xibu", "tra_xibu"],
	      transStation: ["qidutra1"]
	    }, {
	      line: ["tra_xibu", "tra_xibu"],
	      transStation: ["songshantra1"]
	    }, {
	      line: ["tra_xibu", "tra_xibu"],
	      transStation: ["taipeitra1"]
	    }, {
	      line: ["tra_xibu", "tra_xibu"],
	      transStation: ["banqiaotra1"]
	    }, {
	      line: ["tra_xibu", "tra_xibu"],
	      transStation: ["taoyuantra1"]
	    }, {
	      line: ["tra_xibu", "tra_xibu"],
	      transStation: ["zhonglitra1"]
	    }, {
	      line: ["tra_xibu", "tra_xibu"],
	      transStation: ["hsinchutra1"]
	    }, {
	      line: ["tra_xibu", "tra_shan"],
	      transStation: ["zhunantra1"]
	    }, {
	      line: ["tra_xibu", "tra_shan"],
	      transStation: ["miaolitra1"]
	    }, {
	      line: ["tra_xibu", "tra_shan"],
	      transStation: ["fengyuantra1"]
	    }, {
	      line: ["tra_xibu", "tra_shan"],
	      transStation: ["taizhongtra1"]
	    }, {
	      line: ["tra_xibu", "tra_shan"],
	      transStation: ["zhanghuatra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_shan,tra_zhjy',
	    fromToLine: ["tra_shan", "tra_zhjy"],
	    sect: ['miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi'],
	    route: [{
	      line: ["tra_shan", "tra_shan"],
	      transStation: ["miaolitra1"]
	    }, {
	      line: ["tra_shan", "tra_shan"],
	      transStation: ["fengyuantra1"]
	    }, {
	      line: ["tra_shan", "tra_shan"],
	      transStation: ["taizhongtra1"]
	    }, {
	      line: ["tra_shan", "tra_zhjy"],
	      transStation: ["zhanghuatra1"]
	    }, {
	      line: ["tra_shan", "tra_zhjy"],
	      transStation: ["yuanlintra1"]
	    }, {
	      line: ["tra_shan", "tra_zhjy"],
	      transStation: ["douliutra1"]
	    }, {
	      line: ["tra_shan", "tra_zhjy"],
	      transStation: ["jiayitra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_shan,tra_jygx',
	    fromToLine: ["tra_shan", "tra_jygx"],
	    sect: ['miaoli', 'taichung', 'changhua', 'chiayi', 'tainan', 'kaohsiung'],
	    route: [{
	      line: ["tra_shan", "tra_shan"],
	      transStation: ["miaolitra1"]
	    }, {
	      line: ["tra_shan", "tra_shan"],
	      transStation: ["fengyuantra1"]
	    }, {
	      line: ["tra_shan", "tra_shan"],
	      transStation: ["taizhongtra1"]
	    }, {
	      line: ["tra_shan", "tra_jygx"],
	      transStation: ["zhanghuatra1"]
	    }, {
	      line: ["tra_shan", "tra_jygx"],
	      transStation: ["jiayitra1"]
	    }, {
	      line: ["tra_shan", "tra_jygx"],
	      transStation: ["xinyingtra1"]
	    }, {
	      line: ["tra_shan", "tra_jygx"],
	      transStation: ["tainantra1"]
	    }, {
	      line: ["tra_shan", "tra_jygx"],
	      transStation: ["gangshantra1"]
	    }, {
	      line: ["tra_shan", "tra_jygx"],
	      transStation: ["gaoxungtra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_zhjy,tra_jygx',
	    fromToLine: ["tra_zhjy", "tra_jygx"],
	    sect: ['changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung'],
	    route: [{
	      line: ["tra_zhjy", "tra_zhjy"],
	      transStation: ["zhanghuatra1"]
	    }, {
	      line: ["tra_zhjy", "tra_zhjy"],
	      transStation: ["yuanlintra1"]
	    }, {
	      line: ["tra_zhjy", "tra_zhjy"],
	      transStation: ["douliutra1"]
	    }, {
	      line: ["tra_zhjy", "tra_jygx"],
	      transStation: ["jiayitra1"]
	    }, {
	      line: ["tra_zhjy", "tra_jygx"],
	      transStation: ["xinyingtra1"]
	    }, {
	      line: ["tra_zhjy", "tra_jygx"],
	      transStation: ["tainantra1"]
	    }, {
	      line: ["tra_zhjy", "tra_jygx"],
	      transStation: ["gangshantra1"]
	    }, {
	      line: ["tra_zhjy", "tra_jygx"],
	      transStation: ["gaoxungtra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_jygx,tra_pingdong',
	    fromToLine: ["tra_jygx", "tra_pingdong"],
	    sect: ['chiayi', 'tainan', 'kaohsiung', 'pingdong'],
	    route: [{
	      line: ["tra_jygx", "tra_pingdong"],
	      transStation: ["gaoxungtra1"]
	    }, {
	      line: ["tra_pingdong", "tra_pingdong"],
	      transStation: ["fongshantra1"]
	    }, {
	      line: ["tra_pingdong", "tra_pingdong"],
	      transStation: ["chaozhoutra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_pingdong',
	    fromToLine: ["tra_pingdong", "tra_pingdong"],
	    sect: ['kaohsiung', 'pingdong'],
	    route: [{
	      line: ["tra_pingdong", "tra_pingdong"],
	      transStation: ["chaozhoutra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_yilan,tra_beihui',
	    fromToLine: ["tra_yilan", "tra_beihui"],
	    sect: ['northeast', 'yilan', 'beihui', 'hualian'],
	    route: [{
	      line: ["tra_beihui", "tra_beihui"],
	      transStation: ["hualiantra1"]
	    }, {
	      line: ["tra_yilan", "tra_beihui"],
	      transStation: ["suaoxintra1"]
	    }, {
	      line: ["tra_yilan", "tra_yilan"],
	      transStation: ["luodongtra1"]
	    }, {
	      line: ["tra_yilan", "tra_yilan"],
	      transStation: ["yilantra1"]
	    }, {
	      line: ["tra_yilan", "tra_yilan"],
	      transStation: ["ruifangtra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_yilan,tra_huadong',
	    fromToLine: ["tra_yilan", "tra_huadong"],
	    sect: ['northeast', 'yilan', 'beihui', 'hualian', 'taidong'],
	    route: [{
	      line: ["tra_huadong", "tra_huadong"],
	      transStation: ["taidongtra1"]
	    }, {
	      line: ["tra_huadong", "tra_huadong"],
	      transStation: ["yulitra1"]
	    }, {
	      line: ["tra_beihui", "tra_huadong"],
	      transStation: ["hualiantra1"]
	    }, {
	      line: ["tra_yilan", "tra_beihui"],
	      transStation: ["suaoxintra1"]
	    }, {
	      line: ["tra_yilan", "tra_yilan"],
	      transStation: ["luodongtra1"]
	    }, {
	      line: ["tra_yilan", "tra_yilan"],
	      transStation: ["yilantra1"]
	    }, {
	      line: ["tra_yilan", "tra_yilan"],
	      transStation: ["ruifangtra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_beihui,tra_huadong',
	    fromToLine: ["tra_beihui", "tra_huadong"],
	    sect: ['yilan', 'beihui', 'hualian', 'taidong'],
	    route: [{
	      line: ["tra_huadong", "tra_huadong"],
	      transStation: ["taidongtra1"]
	    }, {
	      line: ["tra_huadong", "tra_huadong"],
	      transStation: ["yulitra1"]
	    }, {
	      line: ["tra_beihui", "tra_huadong"],
	      transStation: ["hualiantra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_yilan,tra_pingxi',
	    fromToLine: ["tra_yilan", "tra_pingxi"],
	    fromToLineReg: ["^tra_pingxi$", "^tra_yilan$|^tra_beihui$|^tra_huadong$"],
	    sect: ['northeast', 'yilan', 'beihui', 'hualian', 'taidong'],
	    route: [{
	      line: ["tra_yilan", "tra_pingxi"],
	      transStation: ["ruifangtra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_xibu,tra_yilan',
	    fromToLine: ["tra_xibu", "tra_yilan"],
	    fromToLineReg: ["^tra_xibu$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_shalun$", "^tra_yilan$|^tra_beihui$|^tra_huadong$"],
	    sect: ['kaohsiung', 'tainan', 'chiayi', 'yunlin', 'changhua', 'taichung', 'miaoli', 'hsinchu', 'taoyuan', 'taipei', 'keelung', 'northeast', 'yilan', 'beihui', 'hualian', 'taidong'],
	    route: [{
	      line: ["tra_xibu", "tra_yilan"],
	      transStation: ["banqiaotra1"]
	    }, {
	      line: ["tra_xibu", "tra_yilan"],
	      transStation: ["taipeitra1"]
	    }, {
	      line: ["tra_xibu", "tra_yilan"],
	      transStation: ["songshantra1"]
	    }, {
	      line: ["tra_xibu", "tra_yilan"],
	      transStation: ["qidutra1"]
	    }, {
	      line: ["tra_xibu", "tra_yilan"],
	      transStation: ["badutra1"]
	    }]
	    /*}, {
	        id: 'traInnerTrans_tra_xibu,tra_beihui',
	        fromToLine: ["tra_xibu","tra_beihui"],
	        sect: ['taoyuan','taipei','keelung','northeast','yilan','beihui','hualian'],
	        route: [
	            {
	                line: ["tra_xibu", "tra_beihui"],
	                transStation: ["banqiaotra1"]
	            },
	            {
	                line: ["tra_xibu", "tra_beihui"],
	                transStation: ["taipeitra1"]
	            },
	            {
	                line: ["tra_xibu", "tra_beihui"],
	                transStation: ["songshantra1"]
	            },
	            {
	                line: ["tra_xibu", "tra_beihui"],
	                transStation: ["qidutra1"]
	            },
	            {
	                line: ["tra_xibu", "tra_beihui"],
	                transStation: ["badutra1"]
	            }
	        ]*/

	  }, {
	    id: 'traInnerTrans_tra_shan,tra_pingxi',
	    fromToLine: ["tra_shan", "tra_pingxi"],
	    fromToLineReg: ["^tra_shan$|^tra_zhjy$|^tra_jygx$", "^tra_pingxi$"],
	    sect: ['northeast', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung'],
	    route: [{
	      line: ["tra_shan", "tra_pingxi"],
	      transStation: ["banqiaotra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_xibu,tra_pingxi',
	    fromToLine: ["tra_xibu", "tra_pingxi"],
	    fromToLineReg: ["^tra_xibu$|^tra_shan$|^tra_zhjy$|^tra_jygx$", "^tra_pingxi$"],
	    sect: ['hsinchu', 'taoyuan', 'taipei', 'keelung', 'northeast'],
	    route: [{
	      line: ["tra_yilan", "tra_pingxi"],
	      transStation: ["ruifangtra1"]
	    }, {
	      line: ["tra_xibu", "tra_yilan", "tra_pingxi"],
	      transStation: ["banqiaotra1", "ruifangtra1"]
	    }, {
	      line: ["tra_xibu", "tra_yilan", "tra_pingxi"],
	      transStation: ["taipeitra1", "ruifangtra1"]
	    }, {
	      line: ["tra_xibu", "tra_yilan", "tra_pingxi"],
	      transStation: ["songshantra1", "ruifangtra1"]
	    }, {
	      line: ["tra_xibu", "tra_yilan", "tra_pingxi"],
	      transStation: ["qidutra1", "ruifangtra1"]
	    }, {
	      line: ["tra_xibu", "tra_yilan", "tra_pingxi"],
	      transStation: ["badutra1", "ruifangtra1"]
	    }, {
	      line: ["tra_shan", "tra_yilan", "tra_pingxi"],
	      transStation: ["banqiaotra1", "ruifangtra1"]
	    }, {
	      line: ["tra_zhjy", "tra_yilan", "tra_pingxi"],
	      transStation: ["banqiaotra1", "ruifangtra1"]
	    }, {
	      line: ["tra_jygx", "tra_yilan", "tra_pingxi"],
	      transStation: ["banqiaotra1", "ruifangtra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_xibu,tra_liujia',
	    fromToLine: ["tra_xibu", "tra_liujia"],
	    sect: ['hsinchu', 'taoyuan', 'taipei', 'keelung', 'northeast'],
	    route: [{
	      line: ["tra_xibu", "tra_liujia"],
	      transStation: ["hsinchutra1"]
	    }, {
	      line: ["tra_xibu", "tra_liujia"],
	      transStation: ["northhsinchutra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_shan,tra_liujia',
	    fromToLine: ["tra_shan", "tra_liujia"],
	    fromToLineReg: ["^tra_shan$|^tra_zhjy$|^tra_jygx$", "^tra_liujia$"],
	    sect: ['hsinchu', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung'],
	    route: [{
	      line: ["tra_xibu", "tra_liujia"],
	      transStation: ["hsinchutra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_yilan,tra_liujia',
	    fromToLine: ["tra_yilan", "tra_liujia"],
	    fromToLineReg: ["^tra_liujia$", "^tra_yilan$|^tra_beihui$|^tra_huadong$"],
	    sect: ['hsinchu', 'yilan', 'northeast', 'beihui', 'hualian', 'taidong'],
	    route: [{
	      line: ["tra_yilan", "tra_xibu"],
	      transStation: ["banqiaotra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_jygx,tra_shalun',
	    fromToLine: ["tra_jygx", "tra_shalun"],
	    sect: ['chiayi', 'tainan', 'kaohsiung'],
	    route: [{
	      line: ["tra_jygx", "tra_shalun"],
	      transStation: ["zhongzhoutra1"]
	    }, {
	      line: ["tra_jygx", "tra_shalun"],
	      transStation: ["tainantra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_xibu,tra_shalun',
	    fromToLine: ["tra_xibu", "tra_shalun"],
	    fromToLineReg: ["^tra_xibu$|^tra_shan$|^tra_zhjy$", "^tra_shalun$"],
	    sect: ['northeast', 'keelung', 'taipei', 'taoyuan', 'hsinchu', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan'],
	    route: [{
	      line: ["tra_xibu", "tra_shalun"],
	      transStation: ["tainantra1"]
	    }]
	  }, {
	    //TRA sub line to sub line
	    id: 'traInnerTrans_tra_pingxi,tra_liujia',
	    fromToLine: ["tra_pingxi", "tra_liujia"],
	    sect: ['hsinchu', 'northeast'],
	    route: [{
	      line: ["tra_pingxi", "tra_xibu", "tra_yilan", "tra_liujia"],
	      transStation: ["ruifangtra1", "banqiaotra1", "hsinchutra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_pingxi,tra_shalun',
	    fromToLine: ["tra_pingxi", "tra_shalun"],
	    sect: ['northeast', 'tainan'],
	    route: [{
	      line: ["tra_pingxi", "tra_yilan", "tra_xibu", "tra_shalun"],
	      transStation: ["ruifangtra1", "banqiaotra1", "tainantra1"]
	    }]
	  }, {
	    id: 'traInnerTrans_tra_liujia,tra_shalun',
	    fromToLine: ["tra_liujia", "tra_shalun"],
	    sect: ['hsinchu', 'tainan'],
	    route: [{
	      line: ["tra_liujia", "tra_xibu", "tra_shalun"],
	      transStation: ["hsinchutra1", "tainantra1"]
	    }]
	  }, {
	    //TRA to TRTC
	    id: 'tra_xibu,trtc_3',
	    fromToLine: ["tra_xibu", "trtc_3"],
	    sect: ['taipei', 'keelung', 'taoyuan', 'hsinchu'],
	    route: [{
	      bypassStationReg: '^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$',
	      line: ["tra_xibu", "trtc_3"],
	      transStation: ["songshan1"]
	    }, {
	      bypassStationReg: '^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$',
	      line: ["tra_xibu", "trtc_2", "trtc_3"],
	      transStation: ["taipei2", "zhongshan1"]
	    }, {
	      line: ["tra_xibu", "trtc_5", "trtc_3"],
	      transStation: ["banqiao1", "ximen1"]
	    }, {
	      bypassStationReg: '^trtc_111$|^trtc_110$|^trtc_109$|^trtc_009$|^trtc_132$|^trtc_053$|^trtc_105$|^trtc_086$',
	      line: ["tra_xibu", "trtc_2", "trtc_3"],
	      transStation: ["taipei2", "cksmh1"]
	    }]
	  }, {
	    id: 'tra_xibu,trtc_5',
	    fromToLine: ["tra_xibu", "trtc_5"],
	    sect: ['taipei', 'keelung', 'taoyuan', 'hsinchu'],
	    route: [{
	      bypassStationReg: '^trtc_08[0-2]$|^trtc_07[6-9]$',
	      line: ["tra_xibu", "trtc_5"],
	      transStation: ["nangang1"]
	    }, {
	      line: ["tra_xibu", "trtc_5"],
	      transStation: ["taipei1"]
	    }, {
	      bypassStationReg: '^trtc_031$|^trtc_097$|^trtc_096$',
	      line: ["tra_xibu", "trtc_5"],
	      transStation: ["banqiao1"]
	    }]
	  }, {
	    id: 'tra_xibu,trtc_2',
	    fromToLine: ["tra_xibu", "trtc_2"],
	    sect: ['taipei', 'keelung', 'taoyuan', 'hsinchu'],
	    route: [{
	      line: ["tra_xibu", "trtc_2"],
	      transStation: ["taipei2"]
	    }]
	  }, {
	    id: 'tra_xibu,trtc_4',
	    fromToLine: ["tra_xibu", "trtc_4"],
	    sect: ['taipei', 'keelung', 'taoyuan', 'hsinchu'],
	    route: [{
	      bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
	      line: ["tra_xibu", "trtc_2", "trtc_4"],
	      transStation: ["taipei2", "dongmen1"]
	    }, {
	      bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
	      line: ["tra_xibu", "trtc_2", "trtc_4"],
	      transStation: ["taipei2", "mqxl1"]
	    }, {
	      bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
	      line: ["tra_xibu", "trtc_2", "trtc_3", "trtc_4"],
	      transStation: ["taipei2", "cksmh1", "guting1"]
	    }, {
	      bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
	      line: ["tra_xibu", "trtc_3", "trtc_4"],
	      transStation: ["songshan1", "sjnanjing1"]
	    }]
	  }, {
	    //TRA to TTYMETRO
	    id: 'tra_xibu,tymetro_1',
	    fromToLine: ["tra_xibu", "tymetro_1"],
	    sect: ['taipei', 'keelung', 'taoyuan', 'hsinchu'],
	    route: [{
	      line: ["tra_xibu", "tymetro_1"],
	      transStation: ["taipei4"]
	    }]
	  }, {
	    //TRTC inner trans
	    id: 'trtc_5,trtc_2',
	    fromToLine: ["trtc_5", "trtc_2"],
	    sect: ['taipei'],
	    route: [{
	      line: ["trtc_5", "trtc_2"],
	      transStation: ["taipei3"]
	    }, {
	      bypassBothStationReg: '^trtc_08[8-9]$|^trtc_010$|^trtc_09[1-7]$|^trtc_031$|^trtc_05[1-9]$|^trtc_06[0-9]$|^trtc_07[0-1]$',
	      line: ["trtc_5", "trtc_3", "trtc_2"],
	      transStation: ["ximen1", "cksmh1"]
	    }]
	  }, {
	    id: 'trtc_4,trtc_2',
	    fromToLine: ["trtc_4", "trtc_2"],
	    sect: ['taipei'],
	    route: [{
	      bypassBothStationReg: '^trtc_05[0-4]$|^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
	      line: ["trtc_4", "trtc_2"],
	      transStation: ["dongmen1"]
	    }, {
	      bypassBothStationReg: '^trtc_05[0-4]$|^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
	      line: ["trtc_4", "trtc_2"],
	      transStation: ["mqxl1"]
	    }, {
	      bypassBothStationReg: '^trtc_05[0-4]$|^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
	      line: ["trtc_4", "trtc_3", "trtc_2"],
	      transStation: ["guting1", "cksmh1"]
	    }]
	  }, {
	    id: 'trtc_3,trtc_2',
	    fromToLine: ["trtc_3", "trtc_2"],
	    sect: ['taipei'],
	    route: [{
	      bypassBothStationReg: '^trtc_105$|^trtc_132$|^trtc_009$|^trtc_11[0-1]$|^trtc_109$|^trtc_05[0-9]$|^trtc_06[0-9]$|^trtc_07[0-1]$',
	      line: ["trtc_3", "trtc_2"],
	      transStation: ["cksmh1"]
	    }, {
	      bypassStationReg: '^trtc_04[0-3]$|^trtc_03[2-9]$',
	      line: ["trtc_3", "trtc_2"],
	      transStation: ["zhongshan1"]
	    }]
	  }, {
	    id: 'trtc_3,trtc_5',
	    fromToLine: ["trtc_3", "trtc_5"],
	    sect: ['taipei'],
	    route: [{
	      line: ["trtc_3", "trtc_5"],
	      transStation: ["ximen1"]
	    }, {
	      bypassStationReg: '^trtc_07[6-9]$|^trtc_08[0-9]$|^trtc_09[1-5]$|^trtc_05[1-3]$|^trtc_010$|^trtc_03[2-9]$|^trtc_04[0-3]$|^trtc_132$',
	      line: ["trtc_3", "tra_xibu", "trtc_5"],
	      transStation: ["songshan1", "nangang1"]
	    }]
	  }, {
	    id: 'trtc_4,trtc_5',
	    fromToLine: ["trtc_4", "trtc_5"],
	    sect: ['taipei'],
	    route: [{
	      line: ["trtc_4", "trtc_5"],
	      transStation: ["zhongxiaoxs1"]
	    }, {
	      bypassBothStationReg: '^trtc_08[8-9]$|^trtc_010$|^trtc_09[1-7]$|^trtc_031$|^trtc_051$|^trtc_055$|^trtc_13[0-2]$|^trtc_12[1-8]$|^trtc_17[4-9]$|^trtc_180$',
	      line: ["trtc_4", "trtc_3", "trtc_5"],
	      transStation: ["guting1", "ximen1"]
	    }]
	  }, {
	    id: 'trtc_3,trtc_4',
	    fromToLine: ["trtc_3", "trtc_4"],
	    sect: ['taipei'],
	    route: [{
	      bypassBothStationReg: '^trtc_009$|^trtc_109$|^trtc_11[0-1]$|^trtc_105$|^trtc_053$|^trtc_055$|^trtc_13[0-2]$|^trtc_12[1-8]$|^trtc_17[4-9]$|^trtc_180$',
	      line: ["trtc_3", "trtc_4"],
	      transStation: ["guting1"]
	    }, {
	      bypassBothStationReg: '^trtc_04[5-8]$|^trtc_105$|^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$|^trtc_134$|^trtc_089$',
	      line: ["trtc_3", "trtc_4"],
	      transStation: ["sjnanjing1"]
	    }]
	  }, {
	    id: 'trtc_4,trtc_4',
	    fromToLine: ["trtc_4", "trtc_4"],
	    sect: ['taipei'],
	    route: [{
	      line: ["trtc_4", "trtc_4"],
	      transStation: ["daqiaotou1"]
	    }]
	  }, {
	    //TYMETRO to TRTC
	    id: 'tymetro_1,trtc_3',
	    fromToLine: ["tymetro_1", "trtc_3"],
	    sect: ['taipei', 'taoyuan'],
	    route: [{
	      line: ["tymetro_1", "trtc_3"],
	      transStation: ["taipei7"]
	    }, {
	      bypassStationReg: '^trtc_111$|^trtc_110$|^trtc_109$|^trtc_009$|^trtc_132$|^trtc_105$|^trtc_086$',
	      line: ["tymetro_1", "trtc_2", "trtc_3"],
	      transStation: ["taipei5", "cksmh1"]
	    }]
	  }, {
	    id: 'tymetro_1,trtc_5',
	    fromToLine: ["tymetro_1", "trtc_5"],
	    sect: ['taipei', 'taoyuan'],
	    route: [{
	      line: ["tymetro_1", "trtc_5"],
	      transStation: ["taipei6"]
	    }]
	  }, {
	    id: 'tymetro_1,trtc_2',
	    fromToLine: ["tymetro_1", "trtc_2"],
	    sect: ['taipei', 'taoyuan'],
	    route: [{
	      line: ["tymetro_1", "trtc_2"],
	      transStation: ["taipei5"]
	    }]
	  }, {
	    id: 'tymetro_1,trtc_4',
	    fromToLine: ["tymetro_1", "trtc_4"],
	    sect: ['taipei', 'taoyuan'],
	    route: [{
	      bypassStationReg: '^trtc_17[4-8]$',
	      line: ["tymetro_1", "trtc_4"],
	      transStation: ["sanchong1"]
	    }, {
	      bypassStationReg: '^trtc_089$|^trtc_055$|^trtc_041$|^trtc_04[5-8]$|^trtc_12[1-8]$|^trtc_180$|^trtc_179$|^trtc_13[0-1]$',
	      line: ["tymetro_1", "trtc_4", "trtc_4"],
	      transStation: ["sanchong1", "daqiaotou1"]
	    }, {
	      bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
	      line: ["tymetro_1", "trtc_2", "trtc_4"],
	      transStation: ["taipei5", "dongmen1"]
	    }, {
	      bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
	      line: ["tymetro_1", "trtc_2", "trtc_4"],
	      transStation: ["taipei5", "mqxl1"]
	    }, {
	      bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
	      line: ["tymetro_1", "trtc_2", "trtc_3", "trtc_4"],
	      transStation: ["taipei5", "cksmh1", "guting1"]
	    }]
	  }, {
	    //TYMETRO Route
	    id: 'tymetroInnerTrans_tymetro_1,tymetro_1',
	    fromToLine: ["tymetro_1", "tymetro_1"],
	    sect: ['taoyuan', 'taipei'],
	    route: [{
	      line: ["tymetro_1", "tymetro_1"],
	      transStation: ["changgengyiyuan1"]
	    }]
	  }],
	  routeSystem: [{
	    id: 'tra_r1',
	    rType: 'direct',
	    //direct , trans 
	    company: 'tra',
	    big: 'e',
	    lineStr: 'tra_xibu,tra_huadong,tra_beihui,tra_yilan',
	    directSect: 'taipei,keeling,northeast,yilan,beihui,hualian,taidong'
	  }, {
	    id: 'tra_r2',
	    rType: 'direct',
	    //direct , trans 
	    company: 'tra',
	    big: 'w',
	    lineStr: 'tra_xibu,tra_shan,tra_zhjy,tra_jygx,tra_pingdong',
	    directSect: 'keeling,taipei,taoyuan,hsinchu,miaoli,taichung,chungha,yunlin,chiayi,tainan,kaohsiung,pingdong'
	  }, {
	    id: 'tra_r4',
	    rType: 'direct',
	    //direct , trans 
	    company: 'tra',
	    big: 'w',
	    lineStr: 'tra_huadong,tra_beihui,tra_yilan,tra_shan,tra_zhjy,tra_jygx,tra_pingdong',
	    directSect: 'northeast,yilan,beihui,hualian,taidong,miaoli,taichung,chungha,yunlin,chiayi,tainan,kaohsiung,pingdong'
	  }, {
	    id: 'tra_r5',
	    rType: 'direct',
	    //direct , trans 
	    company: 'tra',
	    big: 'w',
	    lineStr: 'tra_liujia',
	    directSect: 'hsinchu'
	  }, {
	    id: 'tra_r6',
	    rType: 'direct',
	    //direct , trans 
	    company: 'tra',
	    big: 'w',
	    lineStr: 'tra_shalun,tra_jygx',
	    directSect: 'tainan'
	  }, {
	    id: 'tra_route_line_map',
	    rType: 'map',
	    //Do not remove this route system , important
	    company: 'tra',
	    dir: "0",
	    link: ['tra_pingdong,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_pingxi', 'tra_pingdong,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_pingxi', 'tra_pingdong,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong', 'tra_pingdong,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong', 'tra_jiji,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong', 'tra_jiji,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong', 'tra_shalun,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong', 'tra_shalun,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong']
	  }, {
	    id: 'tra_west_east_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_xibu,tra_yilan,tra_beihui,tra_huadong',
	    lineInclude: [['tra_xibu', 'tra_shan', 'tra_zhjy', 'tra_jygx', 'tra_liujia', 'tra_shalun', 'tra_jiji'], ['tra_yilan', 'tra_beihui', 'tra_huadong', 'tra_pingxi']],
	    rule: [{
	      line: ['tra_jygx', 'tra_zhjy', 'tra_shan', 'tra_yilan', 'tra_beihui', 'tra_huadong', 'tra_pingxi'],
	      sect: ['taoyuan', 'hsinchu', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung', 'pingdong'],
	      station: ["tra_1032", "tra_1012", "tra_1013", "tra_1014"],
	      transStation: 'banqiaotra1'
	    }, {
	      line: ['tra_yilan', 'tra_beihui', 'tra_huadong', 'tra_pingxi'],
	      station: ["tra_1009", "tra_1006", "tra_1031", "tra_1005", "tra_1004"],
	      transStation: 'songshantra1'
	    }, {
	      line: ['tra_yilan', 'tra_beihui', 'tra_huadong', 'tra_pingxi'],
	      station: ["tra_1031", "tra_1005", "tra_1004", "tra_1030", "tra_1002", "tra_1029", "tra_1001"],
	      transStation: 'qidutra1'
	    }, {
	      line: ['tra_yilan', 'tra_beihui', 'tra_huadong', 'tra_pingxi'],
	      station: ["tra_1030", "tra_1003", "tra_1029", "tra_1001"],
	      transStation: 'badutra1'
	    }, {
	      line: ['tra_shalun', 'tra_pingxi'],
	      station: ["tra_1228"],
	      transStation: 'tainantra1'
	    }]
	  }, {
	    id: 'tra_xibu_shan_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_xibu,tra_shan',
	    lineInclude: [['tra_xibu', 'tra_liujia'], ['tra_shan']],
	    rule: [{
	      line: ['tra_shan'],
	      sect: ['keelung'],
	      transStation: 'qidutra1'
	    }, {
	      line: ['tra_shan'],
	      station: ["tra_1004", "tra_1005", "tra_1031", "tra_1006"],
	      transStation: 'songshantra1'
	    }, {
	      line: ['tra_shan'],
	      station: ["tra_1009", "tra_1032", "tra_1012", "tra_1013"],
	      transStation: 'banqiaotra1'
	    }, {
	      line: ['tra_shan'],
	      station: ["tra_1012", "tra_1013", "tra_1014"],
	      transStation: 'taoyuantra1'
	    }, {
	      line: ['tra_shan'],
	      station: ["tra_1016", "tra_1018"],
	      transStation: 'zhonglitra1'
	    }, {
	      line: ['tra_shan'],
	      station: ["tra_1019", "tra_1020", "tra_1036"],
	      sect: ['hsinchu'],
	      transStation: 'hsinchutra1'
	    }, {
	      line: ['tra_xibu', 'tra_liujia'],
	      station: ["tra_1019", "tra_1020", "tra_1036"],
	      sect: ['miaoli'],
	      transStation: 'miaolitra1'
	    }, {
	      line: ['tra_xibu', 'tra_liujia'],
	      station: ["tra_1315", "tra_1318"],
	      transStation: 'fengyuantra1'
	    }, {
	      line: ['tra_xibu', 'tra_liujia'],
	      sect: ['taichung'],
	      transStation: 'taizhongtra1'
	    }]
	  }, {
	    id: 'tra_xibu_zhjy_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_xibu,tra_zhjy',
	    lineInclude: [['tra_xibu', 'tra_liujia'], ['tra_zhjy']],
	    rule: [{
	      line: ['tra_zhjy'],
	      sect: ['keelung'],
	      transStation: 'qidutra1'
	    }, {
	      line: ['tra_zhjy'],
	      station: ["tra_1004", "tra_1005", "tra_1031", "tra_1006"],
	      transStation: 'songshantra1'
	    }, {
	      line: ['tra_zhjy'],
	      station: ["tra_1009", "tra_1032", "tra_1012", "tra_1013"],
	      transStation: 'banqiaotra1'
	    }, {
	      line: ['tra_zhjy'],
	      station: ["tra_1012", "tra_1013", "tra_1014"],
	      transStation: 'taoyuantra1'
	    }, {
	      line: ['tra_zhjy'],
	      station: ["tra_1016", "tra_1018"],
	      transStation: 'zhonglitra1'
	    }, {
	      line: ['tra_zhjy'],
	      station: ["tra_1019", "tra_1020", "tra_1036"],
	      sect: ['hsinchu'],
	      transStation: 'hsinchutra1'
	    }, {
	      line: ['tra_xibu', 'tra_liujia'],
	      sect: ['changhua'],
	      transStation: 'zhanghuatra1'
	    }, {
	      line: ['tra_xibu', 'tra_liujia'],
	      station: ["tra_1208", "tra_1209"],
	      sect: ['changhua'],
	      transStation: 'yuanlintra1'
	    }, {
	      line: ['tra_xibu', 'tra_liujia'],
	      sect: ['yunlin'],
	      transStation: 'douliutra1'
	    }, {
	      line: ['tra_xibu', 'tra_liujia'],
	      sect: ['chiayi'],
	      transStation: 'jiayitra1'
	    }]
	  }, {
	    id: 'tra_xibu_jygx_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_xibu,tra_jygx',
	    lineInclude: [['tra_xibu', 'tra_liujia'], ['tra_jygx', 'tra_shalun']],
	    rule: [{
	      line: ['tra_jygx', 'tra_shalun'],
	      sect: ['keelung'],
	      transStation: 'qidutra1'
	    }, {
	      line: ['tra_jygx', 'tra_shalun'],
	      station: ["tra_1004", "tra_1005", "tra_1031", "tra_1006"],
	      transStation: 'songshantra1'
	    }, {
	      line: ['tra_jygx', 'tra_shalun'],
	      station: ["tra_1009", "tra_1032", "tra_1012", "tra_1013"],
	      transStation: 'banqiaotra1'
	    }, {
	      line: ['tra_jygx', 'tra_shalun'],
	      station: ["tra_1012", "tra_1013", "tra_1014"],
	      transStation: 'taoyuantra1'
	    }, {
	      line: ['tra_jygx', 'tra_shalun'],
	      station: ["tra_1016", "tra_1018"],
	      transStation: 'zhonglitra1'
	    }, {
	      line: ['tra_jygx', 'tra_shalun'],
	      station: ["tra_1019", "tra_1020", "tra_1036"],
	      sect: ['hsinchu'],
	      transStation: 'hsinchutra1'
	    }, {
	      line: ['tra_xibu', 'tra_liujia'],
	      sect: ['chiayi'],
	      transStation: 'jiayitra1'
	    }, {
	      line: ['tra_xibu', 'tra_liujia'],
	      sect: ['tainan'],
	      transStation: 'tainantra1'
	    }, {
	      line: ['tra_xibu', 'tra_liujia'],
	      sect: ['kaohsiung'],
	      transStation: 'gaoxungtra1'
	    }]
	  }, {
	    id: 'tra_shan_zhjy_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_shan,tra_zhjy',
	    lineInclude: [['tra_shan'], ['tra_zhjy']],
	    rule: [{
	      line: ['tra_zhjy'],
	      sect: ['miaoli'],
	      transStation: 'miaolitra1'
	    }, {
	      line: ['tra_zhjy'],
	      station: ["tra_1315", "tra_1314", "tra_1310"],
	      transStation: 'fengyuantra1'
	    }, {
	      line: ['tra_zhjy'],
	      sect: ['taichung'],
	      transStation: 'taizhongtra1'
	    }, {
	      line: ['tra_shan'],
	      sect: ['changhua'],
	      station: ["tra_1321", "tra_1324"],
	      transStation: 'zhanghuatra1'
	    }, {
	      line: ['tra_shan'],
	      sect: ['changhua'],
	      transStation: 'yuanlintra1'
	    }, {
	      line: ['tra_shan'],
	      sect: ['yunlin'],
	      transStation: 'douliutra1'
	    }, {
	      line: ['tra_shan'],
	      sect: ['chiayi'],
	      transStation: 'jiayitra1'
	    }]
	  }, {
	    id: 'tra_shan_jygx_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_shan,tra_jygx',
	    lineInclude: [['tra_shan'], ['tra_jygx', 'tra_shalun']],
	    rule: [{
	      line: ['tra_jygx', 'tra_shalun'],
	      sect: ['miaoli'],
	      transStation: 'miaolitra1'
	    }, {
	      line: ['tra_jygx', 'tra_shalun'],
	      station: ["tra_1315", "tra_1314", "tra_1310"],
	      transStation: 'fengyuantra1'
	    }, {
	      line: ['tra_jygx', 'tra_shalun'],
	      sect: ['taichung'],
	      transStation: 'taizhongtra1'
	    }, {
	      line: ['tra_jygx', 'tra_shalun'],
	      sect: ['changhua'],
	      station: ["tra_1321", "tra_1324"],
	      transStation: 'zhanghuatra1'
	    }, {
	      line: ['tra_shan'],
	      sect: ['chiayi'],
	      transStation: 'jiayitra1'
	    }, {
	      line: ['tra_shan'],
	      sect: ['tainan'],
	      transStation: 'tainantra1'
	    }, {
	      line: ['tra_shan'],
	      sect: ['kaohsiung'],
	      transStation: 'gaoxungtra1'
	    }]
	  }, {
	    id: 'tra_zhjy_jygx_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_zhjy,tra_jygx',
	    lineInclude: [['tra_zhjy'], ['tra_jygx', 'tra_shalun']],
	    rule: [{
	      line: ['tra_jygx', 'tra_shalun'],
	      sect: ['changhua'],
	      transStation: 'yuanlintra1'
	    }, {
	      line: ['tra_jygx', 'tra_shalun'],
	      sect: ['yunlin'],
	      transStation: 'douliutra1'
	    }, {
	      line: ['tra_jygx', 'tra_shalun'],
	      sect: ['chiayi'],
	      transStation: 'jiayitra1'
	    }, {
	      line: ['tra_zhjy'],
	      sect: ['tainan'],
	      transStation: 'tainantra1'
	    }, {
	      line: ['tra_zhjy'],
	      sect: ['kaohsiung'],
	      transStation: 'gaoxungtra1'
	    }]
	  }, {
	    id: 'tra_xibu_shan_zhjy_pingdong_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_zhjy,tra_pingdong',
	    lineInclude: [['tra_xibu', 'tra_shan', 'tra_zhjy', 'tra_liujia'], ['tra_pingdong']],
	    rule: [{
	      line: ['tra_pingdong'],
	      sect: ['keelung'],
	      transStation: 'qidutra1'
	    }, {
	      line: ['tra_pingdong'],
	      station: ["tra_1004", "tra_1005", "tra_1031", "tra_1006"],
	      transStation: 'songshantra1'
	    }, {
	      line: ['tra_pingdong'],
	      station: ["tra_1009", "tra_1032", "tra_1012", "tra_1013"],
	      transStation: 'banqiaotra1'
	    }, {
	      line: ['tra_pingdong'],
	      station: ["tra_1012", "tra_1013", "tra_1014"],
	      transStation: 'taoyuantra1'
	    }, {
	      line: ['tra_pingdong'],
	      station: ["tra_1016", "tra_1018"],
	      sect: ["taoyuan"],
	      transStation: 'zhonglitra1'
	    }, {
	      line: ['tra_pingdong'],
	      station: ["tra_1019", "tra_1020", "tra_1036"],
	      sect: ['hsinchu'],
	      transStation: 'hsinchutra1'
	    }, {
	      line: ['tra_pingdong'],
	      sect: ['miaoli'],
	      transStation: 'miaolitra1'
	    }, {
	      line: ['tra_pingdong'],
	      sect: ['taichung'],
	      transStation: 'taizhongtra1'
	    }, {
	      line: ['tra_pingdong'],
	      sect: ['changhua'],
	      transStation: 'zhanghuatra1'
	    }, {
	      line: ['tra_pingdong'],
	      sect: ['changhua'],
	      transStation: 'yuanlintra1'
	    }, {
	      line: ['tra_pingdong'],
	      sect: ['yunlin'],
	      transStation: 'douliutra1'
	    }, {
	      line: ['tra_pingdong'],
	      sect: ['chiayi'],
	      transStation: 'jiayitra1'
	    }, {
	      line: ['tra_zhjy'],
	      sect: ['kaohsiung'],
	      transStation: 'gaoxungtra1'
	    }, {
	      line: ['tra_zhjy'],
	      sect: ['kaohsiung'],
	      transStation: 'fongshantra1'
	    }, {
	      line: ['tra_zhjy'],
	      sect: ['pingdong'],
	      transStation: 'pingdongtra1'
	    }, {
	      line: ['tra_zhjy'],
	      sect: ['pingdong'],
	      transStation: 'chaozhoutra1'
	    }]
	  }, {
	    id: 'tra_jygx_pingdong_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_jygx,tra_pingdong',
	    lineInclude: [['tra_jygx', 'tra_shalun'], ['tra_pingdong']],
	    rule: [{
	      line: ['tra_jygx', 'tra_shalun', 'tra_pingdong'],
	      sect: ['pingdong', 'kaohsiung', 'tainan'],
	      transStation: 'chaozhoutra1'
	    }, {
	      line: ['tra_pingdong'],
	      sect: ['tainan'],
	      transStation: 'tainantra1'
	    }, {
	      line: ['tra_pingdong'],
	      sect: ['kaohsiung', 'tainan'],
	      transStation: 'gaoxungtra1'
	    }]
	  }, {
	    id: 'tra_pingdong_inner_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_pingdong',
	    lineInclude: [['tra_pingdong'], ['tra_pingdong']],
	    rule: [{
	      line: ['tra_pingdong'],
	      sect: ['pingdong', 'kaohsiung'],
	      transStation: 'chaozhoutra1'
	    }]
	  }, {
	    id: 'tra_yilan_beihui_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_yilan,tra_beihui',
	    lineInclude: [['tra_beihui'], ['tra_yilan', 'tra_pingxi']],
	    rule: [{
	      line: ['tra_beihui'],
	      station: ["tra_1802", "tra_1803", "tra_1805", "tra_1806"],
	      transStation: 'ruifangtra1'
	    }, {
	      line: ['tra_beihui'],
	      station: ["tra_1807", "tra_1808", "tra_1809", "tra_1810", "tra_1811", "tra_1812", "tra_1813", "tra_1814", "tra_1815", "tra_1816", "tra_1817", "tra_1818", "tra_1819"],
	      transStation: 'yilantra1'
	    }, {
	      line: ['tra_beihui'],
	      station: ["tra_1821", "tra_1822", "tra_1824", "tra_1825"],
	      transStation: 'luodongtra1'
	    }, {
	      line: ['tra_beihui'],
	      station: ["tra_1827", "tra_1825", "tra_1824"],
	      transStation: 'suaoxintra1'
	    }, {
	      line: ['tra_yilan', 'tra_pingxi'],
	      sect: ['hualian'],
	      transStation: 'hualiantra1'
	    }]
	  }, {
	    id: 'tra_yilan_huadong_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_yilan,tra_huadong',
	    lineInclude: [['tra_huadong'], ['tra_yilan', 'tra_pingxi']],
	    rule: [{
	      line: ['tra_huadong'],
	      station: ["tra_1802", "tra_1803", "tra_1805", "tra_1806"],
	      transStation: 'ruifangtra1'
	    }, {
	      line: ['tra_huadong'],
	      station: ["tra_1807", "tra_1808", "tra_1809", "tra_1810", "tra_1811", "tra_1812", "tra_1813", "tra_1814", "tra_1815", "tra_1816", "tra_1817", "tra_1818", "tra_1819"],
	      transStation: 'yilantra1'
	    }, {
	      line: ['tra_huadong'],
	      station: ["tra_1821", "tra_1822", "tra_1824", "tra_1825"],
	      transStation: 'luodongtra1'
	    }, {
	      line: ['tra_huadong'],
	      station: ["tra_1827", "tra_1825", "tra_1824"],
	      transStation: 'suaoxintra1'
	    }, {
	      line: ['tra_yilan', 'tra_pingxi'],
	      sect: ['hualian'],
	      transStation: 'hualiantra1'
	    }, {
	      line: ['tra_yilan', 'tra_pingxi'],
	      sect: ['hualian'],
	      station: ["tra_1624", "tra_1625", "tra_1626"],
	      transStation: 'yulitra1'
	    }, {
	      line: ['tra_yilan', 'tra_pingxi'],
	      sect: ['taidong'],
	      transStation: 'taidongtra1'
	    }]
	  }, {
	    id: 'tra_beihui_huadong_trans',
	    rType: 'trans',
	    company: 'tra',
	    routeMapID: 'traInnerTrans_tra_yilan,tra_huadong',
	    lineInclude: [['tra_huadong'], ['tra_beihui']],
	    rule: [{
	      line: ['tra_huadong'],
	      sect: ['beihui', 'hualian'],
	      transStation: 'hualiantra1'
	    }]
	  }, {
	    id: 'tymetro_1_fast_normal_trans',
	    rType: 'trans',
	    company: 'tymetro',
	    routeMapID: 'tymetroInnerTrans_tymetro_1,tymetro_1',
	    rule: [{
	      line: ['tymetro_1'],
	      sect: ['taoyuan', 'taipei'],
	      transStation: 'changgengyiyuan1'
	    }]
	  }, {
	    id: 'trtc_trans_tra_east',
	    rType: 'cross',
	    //direct , trans 
	    company: ['trtc', 'tra'],
	    // cross company serial
	    regLine: "^trtc_1$|^trtc_2$|^trtc_3$|^trtc_4|^trtc_5$|^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$",
	    lineIsSame: {
	      "tra_xibu": "^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$"
	    },
	    link: [{
	      regLine: "^trtc_5|^tra_",
	      transStation: [['banqiao1', 'taipei1', 'nangang1']]
	    }, {
	      regLine: "^trtc_3$|^trtc_4|^tra_",
	      transStation: [['taipei2', 'songshan1']]
	    }, {
	      regLine: "^trtc_2$|^tra_",
	      transStation: [['taipei2']]
	    }],
	    sect: ['hsinchu', 'taoyuan', 'taipei', 'keeling', 'northeast', 'yilan', 'beihui', 'hualian', 'taidong']
	  }, {
	    id: 'trtc_trans_tra_west',
	    rType: 'cross',
	    //direct , trans 
	    company: ['trtc', 'tra'],
	    // cross company serial
	    regLine: "^trtc_1$|^trtc_2$|^trtc_3$|^trtc_4|^trtc_5$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong|^tra_shalun$|^tra_hai$|^tra_jiji$",
	    lineIsSame: {
	      "tra_xibu": "^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_jiji$"
	    },
	    link: [{
	      regLine: "^trtc_5|^tra_",
	      transStation: [['banqiao1', 'taipei1']]
	    }, {
	      regLine: "^trtc_3$|^trtc_4|^tra_",
	      transStation: [['taipei2', 'songshan1']]
	    }, {
	      regLine: "^trtc_2$|^tra_",
	      transStation: [['taipei2']]
	    }],
	    sect: ['hsinchu', 'taoyuan', 'taipei', 'keeling', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung', 'pingdong']
	  }, {
	    //TRA and TYMETRO trans
	    id: 'tymetro_trans_tra_east',
	    rType: 'cross',
	    //direct , trans 
	    company: ['tymetro', 'tra'],
	    // cross company serial
	    regLine: "^tymetro_1$|^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$",
	    lineIsSame: {
	      "tra_xibu": "^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$"
	    },
	    link: [{
	      regLine: "^tymetro_1|^tra_",
	      transStation: [['taipei4']]
	    }],
	    sect: ['hsinchu', 'taoyuan', 'taipei', 'keeling', 'northeast', 'yilan', 'beihui', 'hualian', 'taidong']
	  }, {
	    id: 'tymetro_trans_tra_west',
	    rType: 'cross',
	    //direct , trans 
	    company: ['tymetro', 'tra'],
	    // cross company serial
	    regLine: "^tymetro_1$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_hai$|^tra_jiji$",
	    lineIsSame: {
	      "tra_xibu": "^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_hai$|^tra_jiji$"
	    },
	    link: [{
	      regLine: "^tymetro_1|^tra_",
	      transStation: [['taipei4']]
	    }],
	    sect: ['hsinchu', 'taoyuan', 'taipei', 'keeling', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung', 'pingdong']
	  }]
	};

	var trtc_line = [{"LineID":"BR","LineName":{"Zh_tw":"文湖線","En":"Wenhu Line"},"LineColor":"#b57a25","IsBranch":false,"Route":[{"RouteID":"BR-1","Direction":0,"LineID":"BR","Stations":["BR01","BR02","BR03","BR04","BR05","BR06","BR07","BR08","BR09","BR10","BR11","BR12","BR13","BR14","BR15","BR16","BR17","BR18","BR19","BR20","BR21","BR22","BR23","BR24"],"TravelTime":{"RunTime":[67,47,99,106,124,72,122,69,67,86,66,142,172,103,110,65,72,78,71,121,78,85,78,0],"StopTime":[0,25,18,20,18,18,20,25,30,45,35,35,18,25,25,25,25,25,20,18,20,20,18,0]}},{"RouteID":"BR-1","Direction":1,"LineID":"BR","Stations":["BR24","BR23","BR22","BR21","BR20","BR19","BR18","BR17","BR16","BR15","BR14","BR13","BR12","BR11","BR10","BR09","BR08","BR07","BR06","BR05","BR04","BR03","BR02","BR01"],"TravelTime":{"RunTime":[78,85,78,121,71,78,72,65,110,103,172,142,66,86,67,69,122,72,124,106,99,47,67,0],"StopTime":[0,18,20,20,18,20,25,25,25,25,25,18,35,35,45,30,25,20,18,18,20,18,25,0]}}],"Transfer":[{"FromLineID":"BR","FromStationID":"BR09","ToLineID":"R","ToStationID":"R05","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BR","FromStationID":"BR11","ToLineID":"G","ToStationID":"G16","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BR","FromStationID":"BR24","ToLineID":"BL","ToStationID":"BL23","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BR","FromStationID":"BR10","ToLineID":"BL","ToStationID":"BL15","IsOnSiteTransfer":1,"TransferTime":5}],"Frequency":[{"LineID":"BR","RouteID":"BR-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["06:00","07:00"],"AveMins":6},{"PeakFlag":"1","MinHeadwayMins":2,"MaxHeadwayMins":4,"Time":["07:00","09:00"],"AveMins":3},{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["09:00","17:00"],"AveMins":6},{"PeakFlag":"1","MinHeadwayMins":2,"MaxHeadwayMins":4,"Time":["17:00","19:30"],"AveMins":3},{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["19:30","23:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"BR","RouteID":"BR-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["06:00","23:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]}],"main":["BR-1"]},{"LineID":"R","LineName":{"Zh_tw":"淡水信義線","En":"Tamsui-Xinyi Line"},"LineColor":"#d90023","IsBranch":false,"Route":[{"RouteID":"R-1","Direction":0,"LineID":"R","Stations":["R02","R03","R04","R05","R06","R07","R08","R09","R10","R11","R12","R13","R14","R15","R16","R17","R18","R19","R20","R21","R22","R23","R24","R25","R26","R27","R28"],"TravelTime":{"RunTime":[93,81,81,70,65,165,83,63,65,58,57,90,109,92,91,76,61,100,73,91,145,109,78,145,136,175,0],"StopTime":[0,30,30,30,30,35,35,25,45,30,25,35,25,25,25,25,25,25,25,25,25,25,25,25,25,25,0]}},{"RouteID":"R-1","Direction":1,"LineID":"R","Stations":["R28","R27","R26","R25","R24","R23","R22","R21","R20","R19","R18","R17","R16","R15","R14","R13","R12","R11","R10","R09","R08","R07","R06","R05","R04","R03","R02"],"TravelTime":{"RunTime":[175,136,145,78,109,145,91,73,100,61,76,91,92,109,90,57,58,65,63,83,165,65,70,81,81,93,0],"StopTime":[0,25,25,25,25,25,25,25,25,25,25,25,25,25,25,35,25,30,45,25,35,35,30,30,30,30,0]}},{"RouteID":"R-2","Direction":0,"LineID":"R","Stations":["R05","R06","R07","R08","R09","R10","R11","R12","R13","R14","R15","R16","R17","R18","R19","R20","R21","R22"],"TravelTime":{"RunTime":[70,65,165,83,63,65,58,57,90,109,92,91,76,61,100,73,91,0],"StopTime":[0,30,35,35,25,45,30,25,35,25,25,25,25,25,25,25,25,0]}},{"RouteID":"R-2","Direction":1,"LineID":"R","Stations":["R22","R21","R20","R19","R18","R17","R16","R15","R14","R13","R12","R11","R10","R09","R08","R07","R06","R05"],"TravelTime":{"RunTime":[91,73,100,61,76,91,92,109,90,57,58,65,63,83,165,65,70,0],"StopTime":[0,25,25,25,25,25,25,25,25,35,25,30,45,25,35,35,30,0]}},{"RouteID":"R-3","Direction":0,"LineID":"R","Stations":["R22","R22A"],"TravelTime":{"RunTime":[157,0],"StopTime":[0,0]}},{"RouteID":"R-3","Direction":1,"LineID":"R","Stations":["R22A","R22"],"TravelTime":{"RunTime":[157,0],"StopTime":[0,0]}}],"Transfer":[{"FromLineID":"R","FromStationID":"R22","ToLineID":"R","ToStationID":"R22","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"R","FromStationID":"R13","ToLineID":"O","ToStationID":"O11","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"R","FromStationID":"R11","ToLineID":"G","ToStationID":"G14","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"R","FromStationID":"R10","ToLineID":"BL","ToStationID":"BL12","IsOnSiteTransfer":1,"TransferTime":4},{"FromLineID":"R","FromStationID":"R08","ToLineID":"G","ToStationID":"G10","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"R","FromStationID":"R07","ToLineID":"O","ToStationID":"O06","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"R","FromStationID":"R05","ToLineID":"BR","ToStationID":"BR09","IsOnSiteTransfer":1,"TransferTime":5}],"Frequency":[{"LineID":"R","RouteID":"R-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-3","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":15,"Time":["06:00","06:30"],"AveMins":14},{"PeakFlag":"1","MinHeadwayMins":7,"MaxHeadwayMins":8,"Time":["06:30","09:00"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":10,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":10},{"PeakFlag":"1","MinHeadwayMins":7,"MaxHeadwayMins":8,"Time":["17:00","19:30"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":15,"Time":["23:00","00:00"],"AveMins":14}]},{"LineID":"R","RouteID":"R-3","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":10,"MaxHeadwayMins":12,"Time":["06:00","23:00"],"AveMins":11},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":15,"Time":["23:00","00:00"],"AveMins":14}]}],"main":["R-1","R-2"]},{"LineID":"G","LineName":{"Zh_tw":"松山新店線","En":"Songshan-Xindian Line"},"LineColor":"#107547","IsBranch":false,"Route":[{"RouteID":"G-1","Direction":0,"LineID":"G","Stations":["G01","G02","G03","G04","G05","G06","G07","G08","G09","G10","G11","G12","G13","G14","G15","G16","G17","G18","G19"],"TravelTime":{"RunTime":[111,78,75,89,87,119,67,88,83,75,81,75,114,106,92,84,102,138,0],"StopTime":[0,22,25,25,25,25,25,25,25,25,25,35,30,35,35,35,30,30,0]}},{"RouteID":"G-1","Direction":1,"LineID":"G","Stations":["G19","G18","G17","G16","G15","G14","G13","G12","G11","G10","G09","G08","G07","G06","G05","G04","G03","G02","G01"],"TravelTime":{"RunTime":[138,102,84,92,106,114,75,81,75,83,88,67,119,87,89,75,78,111,0],"StopTime":[0,30,30,35,35,35,30,35,25,25,25,25,25,25,25,25,25,22,0]}},{"RouteID":"G-2","Direction":0,"LineID":"G","Stations":["G08","G09","G10","G11","G12","G13","G14","G15","G16","G17","G18","G19"],"TravelTime":{"RunTime":[88,83,75,81,75,114,106,92,84,102,138,0],"StopTime":[0,25,25,25,35,30,35,35,35,30,30,0]}},{"RouteID":"G-2","Direction":1,"LineID":"G","Stations":["G19","G18","G17","G16","G15","G14","G13","G12","G11","G10","G09","G08"],"TravelTime":{"RunTime":[138,102,84,92,106,114,75,81,75,83,88,0],"StopTime":[0,30,30,35,35,35,30,35,25,25,25,0]}},{"RouteID":"G-3","Direction":0,"LineID":"G","Stations":["G03","G03A"],"TravelTime":{"RunTime":[203,0],"StopTime":[0,0]}},{"RouteID":"G-3","Direction":1,"LineID":"G","Stations":["G03A","G03"],"TravelTime":{"RunTime":[203,0],"StopTime":[0,0]}}],"Transfer":[{"FromLineID":"G","FromStationID":"G14","ToLineID":"R","ToStationID":"R11","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"G","FromStationID":"G10","ToLineID":"R","ToStationID":"R08","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G16","ToLineID":"BR","ToStationID":"BR11","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"G","FromStationID":"G15","ToLineID":"O","ToStationID":"O08","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G12","ToLineID":"BL","ToStationID":"BL11","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G09","ToLineID":"O","ToStationID":"O05","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G03","ToLineID":"G","ToStationID":"G03","IsOnSiteTransfer":1,"TransferTime":3}],"Frequency":[{"LineID":"G","RouteID":"G-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["06:00","07:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","17:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["19:30","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["06:00","07:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","17:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["19:30","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-3","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":20,"Time":["06:00","00:00"],"AveMins":16}]},{"LineID":"G","RouteID":"G-3","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":20,"Time":["06:00","00:00"],"AveMins":16}]}],"main":["G-1","G-2"]},{"LineID":"O","LineName":{"Zh_tw":"中和新蘆線","En":"Zhonghe-Xinlu Line"},"LineColor":"#f5a818","IsBranch":false,"Route":[{"RouteID":"O-1","Direction":0,"LineID":"O","Stations":["O01","O02","O03","O04","O05","O06","O07","O08","O09","O10","O11","O12","O13","O14","O15","O16","O17","O18","O19","O20","O21"],"TravelTime":{"RunTime":[103,88,100,187,192,118,114,75,89,72,75,115,93,84,142,105,93,130,110,159,0],"StopTime":[0,25,25,25,40,35,35,35,35,35,45,35,25,25,25,25,25,25,25,25,0]}},{"RouteID":"O-1","Direction":1,"LineID":"O","Stations":["O21","O20","O19","O18","O17","O16","O15","O14","O13","O12","O11","O10","O09","O08","O07","O06","O05","O04","O03","O02","O01"],"TravelTime":{"RunTime":[159,110,130,93,105,142,84,93,115,75,72,89,75,114,118,192,187,100,88,103,0],"StopTime":[0,25,25,25,25,25,25,25,25,35,45,35,35,35,35,35,40,25,25,25,0]}},{"RouteID":"O-2","Direction":0,"LineID":"O","Stations":["O01","O02","O03","O04","O05","O06","O07","O08","O09","O10","O11","O12","O50","O51","O52","O53","O54"],"TravelTime":{"RunTime":[103,88,100,187,192,118,114,75,89,72,75,148,104,82,87,110,0],"StopTime":[0,25,25,25,40,35,35,35,35,35,45,35,30,30,30,30,0]}},{"RouteID":"O-2","Direction":1,"LineID":"O","Stations":["O54","O53","O52","O51","O50","O12","O11","O10","O09","O08","O07","O06","O05","O04","O03","O02","O01"],"TravelTime":{"RunTime":[110,87,82,104,148,75,72,89,75,114,118,192,187,100,88,103,0],"StopTime":[0,30,30,30,30,35,45,35,35,35,35,35,40,25,25,25,0]}}],"Transfer":[{"FromLineID":"O","FromStationID":"O11","ToLineID":"R","ToStationID":"R13","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"O","FromStationID":"O06","ToLineID":"R","ToStationID":"R07","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"O","FromStationID":"O08","ToLineID":"G","ToStationID":"G15","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"O","FromStationID":"O05","ToLineID":"G","ToStationID":"G09","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"O","FromStationID":"O12","ToLineID":"O","ToStationID":"O12","IsOnSiteTransfer":1,"TransferTime":1},{"FromLineID":"O","FromStationID":"O07","ToLineID":"BL","ToStationID":"BL14","IsOnSiteTransfer":1,"TransferTime":2}],"Frequency":[{"LineID":"O","RouteID":"O-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":9,"MaxHeadwayMins":10,"Time":["06:00","23:00"],"AveMins":10},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"O","RouteID":"O-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"O","RouteID":"O-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":9,"MaxHeadwayMins":10,"Time":["06:00","23:00"],"AveMins":10},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"O","RouteID":"O-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]}],"main":["O-1","O-2"]},{"LineID":"BL","LineName":{"Zh_tw":"板南線","En":"Bannan Line"},"LineColor":"#0a59ae","IsBranch":false,"Route":[{"RouteID":"BL-1","Direction":0,"LineID":"BL","Stations":["BL01","BL02","BL03","BL04","BL05","BL06","BL07","BL08","BL09","BL10","BL11","BL12","BL13","BL14","BL15","BL16","BL17","BL18","BL19","BL20","BL21","BL22","BL23"],"TravelTime":{"RunTime":[180,95,106,142,92,89,102,74,190,103,132,64,76,84,63,67,72,82,73,99,105,114,0],"StopTime":[0,25,25,25,25,25,25,30,28,28,30,40,30,28,40,28,28,28,25,25,25,25,0]}},{"RouteID":"BL-1","Direction":1,"LineID":"BL","Stations":["BL23","BL22","BL21","BL20","BL19","BL18","BL17","BL16","BL15","BL14","BL13","BL12","BL11","BL10","BL09","BL08","BL07","BL06","BL05","BL04","BL03","BL02","BL01"],"TravelTime":{"RunTime":[114,105,99,73,82,72,67,63,84,76,64,132,103,190,74,102,89,92,142,106,95,180,0],"StopTime":[0,25,25,25,25,28,28,28,40,28,30,40,30,28,28,30,25,25,25,25,25,25,0]}},{"RouteID":"BL-2","Direction":0,"LineID":"BL","Stations":["BL05","BL06","BL07","BL08","BL09","BL10","BL11","BL12","BL13","BL14","BL15","BL16","BL17","BL18","BL19","BL20","BL21","BL22","BL23"],"TravelTime":{"RunTime":[92,89,102,74,190,103,132,64,76,84,63,67,72,82,73,99,105,114,0],"StopTime":[0,25,25,30,28,28,30,40,30,28,40,28,28,28,25,25,25,25,0]}},{"RouteID":"BL-2","Direction":1,"LineID":"BL","Stations":["BL23","BL22","BL21","BL20","BL19","BL18","BL17","BL16","BL15","BL14","BL13","BL12","BL11","BL10","BL09","BL08","BL07","BL06","BL05"],"TravelTime":{"RunTime":[114,105,99,73,82,72,67,63,84,76,64,132,103,190,74,102,89,92,0],"StopTime":[0,25,25,25,25,28,28,28,40,28,30,40,30,28,28,30,25,25,0]}}],"Transfer":[{"FromLineID":"BL","FromStationID":"BL12","ToLineID":"R","ToStationID":"R10","IsOnSiteTransfer":1,"TransferTime":4},{"FromLineID":"BL","FromStationID":"BL11","ToLineID":"G","ToStationID":"G12","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"BL","FromStationID":"BL14","ToLineID":"O","ToStationID":"O07","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"BL","FromStationID":"BL23","ToLineID":"BR","ToStationID":"BR24","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BL","FromStationID":"BL15","ToLineID":"BR","ToStationID":"BR10","IsOnSiteTransfer":1,"TransferTime":5}],"Frequency":[{"LineID":"BL","RouteID":"BL-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]},{"LineID":"BL","RouteID":"BL-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":8,"Time":["06:00","09:00"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":9,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]},{"LineID":"BL","RouteID":"BL-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":8,"Time":["06:00","09:00"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":9,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]},{"LineID":"BL","RouteID":"BL-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]}],"main":["BL-1","BL-2"]}];

	var krtc_line = [{"LineID":"R","LineName":{"Zh_tw":"紅線","En":"Red Line"},"LineColor":"#d30547","IsBranch":false,"Route":[{"RouteID":"R","Direction":0,"LineID":"R","Stations":["R3","R4","R4A","R5","R6","R7","R8","R9","R10","R11","R12","R13","R14","R15","R16","R17","R18","R19","R20","R21","R22","R22A","R23","R24"],"TravelTime":{"RunTime":[120,180,180,180,180,120,180,120,180,180,120,120,180,180,180,120,180,120,120,180,120,120,240,0],"StopTime":[20,25,25,20,20,30,30,40,40,25,25,35,20,30,20,20,20,20,20,20,20,25,300,0]}},{"RouteID":"R","Direction":1,"LineID":"R","Stations":["R24","R23","R22A","R22","R21","R20","R19","R18","R17","R16","R15","R14","R13","R12","R11","R10","R9","R8","R7","R6","R5","R4A","R4","R3"],"TravelTime":{"RunTime":[240,120,120,180,120,120,180,120,180,180,180,120,120,180,180,120,180,120,180,180,180,180,120,0],"StopTime":[0,300,25,20,20,20,20,20,20,20,30,20,35,25,25,40,40,30,30,20,20,25,25,20]}}],"Transfer":[{"FromLineID":"R","FromStationID":"R10","ToLineID":"O","ToStationID":"O5","TransferTime":3}],"Frequency":[]},{"LineID":"O","LineName":{"Zh_tw":"橘線","En":"Orange Line"},"LineColor":"#f77f00","IsBranch":false,"Route":[{"RouteID":"O","Direction":0,"LineID":"O","Stations":["O1","O2","O4","O5","O6","O7","O8","O9","O10","O11","O12","O13","O14","OT1"],"TravelTime":{"RunTime":[120,120,120,120,120,120,120,120,120,120,240,120,240,0],"StopTime":[20,20,40,20,25,20,20,25,25,20,20,20,300,0]}},{"RouteID":"O","Direction":1,"LineID":"O","Stations":["OT1","O14","O13","O12","O11","O10","O9","O8","O7","O6","O5","O4","O2","O1"],"TravelTime":{"RunTime":[240,120,240,120,120,120,120,120,120,120,120,120,120,0],"StopTime":[0,300,20,20,20,25,25,20,20,25,20,40,20,20]}}],"Transfer":[{"FromLineID":"O","FromStationID":"O5","ToLineID":"R","ToStationID":"R10","TransferTime":3}],"Frequency":[]}];

	var tymetro_line = [{"LineID":"A","LineName":{"Zh_tw":"桃園機場捷運線","En":"Airport MRT Line"},"LineColor":"#8246af","IsBranch":false,"Route":[{"RouteID":"A","Direction":0,"LineID":"A","Stations":["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14a","A15","A16","A17","A18","A19","A20","A21"]},{"RouteID":"A","Direction":1,"LineID":"A","Stations":["A21","A20","A19","A18","A17","A16","A15","A14a","A13","A12","A11","A10","A9","A8","A7","A6","A5","A4","A3","A2","A1"]}],"Transfer":[],"TravelTime":[null,null,null,null],"Frequency":[{"LineID":"A","RouteID":"A","TrainType":0,"LineNo":"A","ServiceDays":{"ServiceTag":"每日","NationalHolidays":true,"week":[true,true,true,true,true,true,true]},"OperationTime":["05:57","00:25"],"Headways":[{"PeakFlag":"1","MinHeadwayMins":15,"MaxHeadwayMins":15,"Time":["05:57","00:25"],"AveMins":15}]}],"TravelTimeBetween":{"TrainType1":{"A1":{"A2":300,"A3":540,"A4":780,"A5":840,"A6":1020,"A7":1380,"A8":1620,"A9":1980,"A10":2580,"A11":2700,"A12":2940,"A13":3120,"A14a":3360,"A15":3540,"A16":3720,"A17":3900,"A18":4200,"A19":4320,"A20":4620,"A21":4920},"A2":{"A3":180,"A4":420,"A5":480,"A6":660,"A7":1020,"A8":1260,"A9":1620,"A10":2220,"A11":2340,"A12":2580,"A13":2760,"A14a":3000,"A15":3180,"A16":3360,"A17":3540,"A18":3840,"A19":3960,"A20":4260,"A21":4560,"A1":300},"A3":{"A4":180,"A5":240,"A6":420,"A7":780,"A8":1020,"A9":1380,"A10":1980,"A11":2100,"A12":2340,"A13":2520,"A14a":2760,"A15":2940,"A16":3120,"A17":3300,"A18":3600,"A19":3720,"A20":4020,"A21":4320,"A1":600,"A2":240},"A4":{"A5":60,"A6":240,"A7":600,"A8":840,"A9":1200,"A10":1800,"A11":1920,"A12":2160,"A13":2340,"A14a":2580,"A15":2760,"A16":2940,"A17":3120,"A18":3420,"A19":3540,"A20":3840,"A21":4140,"A1":780,"A2":420,"A3":120},"A5":{"A6":120,"A7":480,"A8":720,"A9":1080,"A10":1680,"A11":1800,"A12":2040,"A13":2220,"A14a":2460,"A15":2640,"A16":2820,"A17":3000,"A18":3300,"A19":3420,"A20":3720,"A21":4020,"A1":900,"A2":540,"A3":240,"A4":120},"A6":{"A7":300,"A8":540,"A9":900,"A10":1500,"A11":1620,"A12":1860,"A13":2040,"A14a":2280,"A15":2460,"A16":2640,"A17":2820,"A18":3120,"A19":3240,"A20":3540,"A21":3840,"A1":1080,"A2":720,"A3":420,"A4":300,"A5":180},"A7":{"A8":240,"A9":600,"A10":1200,"A11":1320,"A12":1560,"A13":1740,"A14a":1980,"A15":2160,"A16":2340,"A17":2520,"A18":2820,"A19":2940,"A20":3240,"A21":3540,"A1":1500,"A2":1140,"A3":840,"A4":720,"A5":600,"A6":420},"A8":{"A9":120,"A10":720,"A11":840,"A12":1080,"A13":1260,"A14a":1500,"A15":1680,"A16":1860,"A17":2040,"A18":2340,"A19":2460,"A20":2760,"A21":3060,"A1":1260,"A2":1380,"A3":780,"A4":960,"A5":840,"A6":660,"A7":240},"A9":{"A10":540,"A11":660,"A12":900,"A13":1080,"A14a":1320,"A15":1500,"A16":1680,"A17":1860,"A18":2160,"A19":2280,"A20":2580,"A21":2880,"A1":2160,"A2":1800,"A3":1500,"A4":1380,"A5":1260,"A6":1080,"A7":660,"A8":240},"A10":{"A11":120,"A12":360,"A13":540,"A14a":780,"A15":960,"A16":1140,"A17":1320,"A18":1620,"A19":1740,"A20":2040,"A21":2340,"A1":2640,"A2":2280,"A3":1980,"A4":1860,"A5":1740,"A6":1560,"A7":1140,"A8":720,"A9":480},"A11":{"A12":180,"A13":360,"A14a":600,"A15":780,"A16":960,"A17":1140,"A18":1440,"A19":1560,"A20":1860,"A21":2160,"A1":2760,"A2":2400,"A3":2100,"A4":1980,"A5":1860,"A6":1680,"A7":1260,"A8":840,"A9":600,"A10":120},"A12":{"A13":120,"A14a":360,"A15":540,"A16":720,"A17":900,"A18":1200,"A19":1320,"A20":1620,"A21":1920,"A1":3000,"A2":2640,"A3":2340,"A4":2220,"A5":2100,"A6":1920,"A7":1500,"A8":1080,"A9":840,"A10":360,"A11":180},"A13":{"A14a":180,"A15":360,"A16":540,"A17":720,"A18":1020,"A19":1140,"A20":1440,"A21":1740,"A1":3180,"A2":2820,"A3":2520,"A4":2400,"A5":2280,"A6":2100,"A7":1680,"A8":1260,"A9":1020,"A10":540,"A11":360,"A12":120},"A14a":{"A15":180,"A16":360,"A17":540,"A18":840,"A19":960,"A20":1260,"A21":1560,"A1":3420,"A2":3060,"A3":2760,"A4":2640,"A5":2520,"A6":2340,"A7":1920,"A8":1500,"A9":1260,"A10":780,"A11":600,"A12":360,"A13":180},"A15":{"A16":180,"A17":360,"A18":660,"A19":780,"A20":1080,"A21":1380,"A1":3600,"A2":3240,"A3":2940,"A4":2820,"A5":2700,"A6":2520,"A7":2100,"A8":1680,"A9":1440,"A10":960,"A11":780,"A12":540,"A13":360,"A14a":180},"A16":{"A17":180,"A18":480,"A19":600,"A20":900,"A21":1200,"A1":3780,"A2":3420,"A3":3120,"A4":3000,"A5":2880,"A6":2700,"A7":2280,"A8":1860,"A9":1620,"A10":1140,"A11":960,"A12":720,"A13":540,"A14a":360,"A15":180},"A17":{"A18":300,"A19":420,"A20":720,"A21":1020,"A1":3960,"A2":3600,"A3":3300,"A4":3180,"A5":3060,"A6":2880,"A7":2460,"A8":2040,"A9":1800,"A10":1320,"A11":1140,"A12":900,"A13":720,"A14a":540,"A15":360,"A16":180},"A18":{"A19":120,"A20":420,"A21":720,"A1":4200,"A2":3840,"A3":3540,"A4":3420,"A5":3300,"A6":3120,"A7":2700,"A8":2280,"A9":2040,"A10":1560,"A11":1380,"A12":1140,"A13":960,"A14a":780,"A15":600,"A16":420,"A17":240},"A19":{"A20":240,"A21":540,"A1":4440,"A2":4080,"A3":3780,"A4":3660,"A5":3540,"A6":3360,"A7":2940,"A8":2520,"A9":2280,"A10":1800,"A11":1620,"A12":1380,"A13":1200,"A14a":1020,"A15":840,"A16":660,"A17":480,"A18":180},"A20":{"A21":240,"A1":4740,"A2":4380,"A3":4080,"A4":3960,"A5":3840,"A6":3660,"A7":3240,"A8":2820,"A9":2580,"A10":2100,"A11":1920,"A12":1680,"A13":1500,"A14a":1320,"A15":1140,"A16":960,"A17":780,"A18":480,"A19":300},"A21":{"A1":4920,"A2":4560,"A3":4260,"A4":4140,"A5":4020,"A6":3840,"A7":3420,"A8":3000,"A9":2760,"A10":2280,"A11":2100,"A12":1860,"A13":1680,"A14a":1500,"A15":1320,"A16":1140,"A17":960,"A18":660,"A19":480,"A20":180}},"TrainType2":{"A1":{"A3":480,"A8":1260,"A12":2100,"A13":2340,"A18":3240,"A21":3840},"A3":{"A8":720,"A12":1560,"A13":1800,"A18":2700,"A21":3300,"A1":480},"A8":{"A12":840,"A13":1080,"A18":1980,"A21":2580,"A1":1260,"A3":780},"A12":{"A13":120,"A18":1020,"A21":1620,"A1":2160,"A3":1620,"A8":780},"A13":{"A18":780,"A21":1380,"A1":2340,"A3":1800,"A8":960,"A12":120},"A18":{"A21":540,"A1":3180,"A3":2640,"A8":1800,"A12":960,"A13":720},"A21":{"A1":3900,"A3":3360,"A8":2520,"A12":1680,"A13":1440,"A18":660}}}}];

	var trtc_station = [{"StationID":"BR01","lat":24.998205,"lon":24.998205,"name":"動物園","ename":"Taipei Zoo","FirstLast":[{"To":"BR24","Time":["06:00","00:00"]}]},{"StationID":"BR02","lat":24.99824,"lon":24.99824,"name":"木柵","ename":"Muzha","FirstLast":[{"To":"BR24","Time":["06:01","00:01"]},{"To":"BR01","Time":["06:04","00:53"]}]},{"StationID":"BR03","lat":24.99857,"lon":24.99857,"name":"萬芳社區","ename":"Wanfang Community","FirstLast":[{"To":"BR24","Time":["06:02","00:03"]},{"To":"BR01","Time":["06:03","00:52"]}]},{"StationID":"BR04","lat":24.99932,"lon":24.99932,"name":"萬芳醫院","ename":"Wanfang Hospital","FirstLast":[{"To":"BR24","Time":["06:04","00:05"]},{"To":"BR01","Time":["06:01","00:49"]}]},{"StationID":"BR05","lat":25.005455,"lon":25.005455,"name":"辛亥","ename":"Xinhai","FirstLast":[{"To":"BR24","Time":["06:00","00:07"]},{"To":"BR01","Time":["06:00","00:47"]}]},{"StationID":"BR06","lat":25.018495,"lon":25.018495,"name":"麟光","ename":"Linguang","FirstLast":[{"To":"BR24","Time":["06:01","00:10"]},{"To":"BR01","Time":["06:03","00:44"]}]},{"StationID":"BR07","lat":25.02381,"lon":25.02381,"name":"六張犁","ename":"Liuzhangli","FirstLast":[{"To":"BR24","Time":["06:03","00:12"]},{"To":"BR01","Time":["06:01","00:42"]}]},{"StationID":"BR08","lat":25.02612,"lon":25.02612,"name":"科技大樓","ename":"Technology Building","FirstLast":[{"To":"BR24","Time":["06:00","00:15"]},{"To":"BR01","Time":["06:00","00:39"]}]},{"StationID":"BR09","lat":25.033311,"lon":25.033311,"name":"大安","ename":"Daan","FirstLast":[{"To":"BR24","Time":["06:01","00:33"]},{"To":"BR01","Time":["06:05","00:37"]}]},{"StationID":"BR10","lat":25.041749,"lon":25.041749,"name":"忠孝復興","ename":"Zhongxiao Fuxing","FirstLast":[{"To":"BR24","Time":["06:03","00:35"]},{"To":"BR01","Time":["06:03","00:35"]}]},{"StationID":"BR11","lat":25.052044,"lon":25.052044,"name":"南京復興","ename":"Nanjing Fuxing","FirstLast":[{"To":"BR24","Time":["06:05","00:38"]},{"To":"BR01","Time":["06:01","00:33"]}]},{"StationID":"BR12","lat":25.06085,"lon":25.06085,"name":"中山國中","ename":"Zhongshan Junior High School","FirstLast":[{"To":"BR24","Time":["06:00","00:40"]},{"To":"BR01","Time":["06:00","00:29"]}]},{"StationID":"BR13","lat":25.062908,"lon":25.062908,"name":"松山機場","ename":"Songshan Airport","FirstLast":[{"To":"BR24","Time":["06:02","00:43"]},{"To":"BR01","Time":["06:02","00:25"]}]},{"StationID":"BR14","lat":25.07943,"lon":25.07943,"name":"大直","ename":"Dazhi","FirstLast":[{"To":"BR24","Time":["06:00","00:46"]},{"To":"BR01","Time":["06:00","00:22"]}]},{"StationID":"BR15","lat":25.08483,"lon":25.08483,"name":"劍南路","ename":"Jiannan Rd.","FirstLast":[{"To":"BR24","Time":["06:01","00:49"]},{"To":"BR01","Time":["06:03","00:19"]}]},{"StationID":"BR16","lat":25.08216,"lon":25.08216,"name":"西湖","ename":"Xihu","FirstLast":[{"To":"BR24","Time":["06:03","00:52"]},{"To":"BR01","Time":["06:01","00:16"]}]},{"StationID":"BR17","lat":25.08007,"lon":25.08007,"name":"港墘","ename":"Gangqian","FirstLast":[{"To":"BR24","Time":["06:00","00:54"]},{"To":"BR01","Time":["06:00","00:14"]}]},{"StationID":"BR18","lat":25.078455,"lon":25.078455,"name":"文德","ename":"Wende","FirstLast":[{"To":"BR24","Time":["06:01","00:56"]},{"To":"BR01","Time":["06:05","00:12"]}]},{"StationID":"BR19","lat":25.083675,"lon":25.083675,"name":"內湖","ename":"Neihu","FirstLast":[{"To":"BR24","Time":["06:02","00:58"]},{"To":"BR01","Time":["06:03","00:10"]}]},{"StationID":"BR20","lat":25.083805,"lon":25.083805,"name":"大湖公園","ename":"Dahu Park","FirstLast":[{"To":"BR24","Time":["06:04","01:00"]},{"To":"BR01","Time":["06:01","00:08"]}]},{"StationID":"BR21","lat":25.07271,"lon":25.07271,"name":"葫洲","ename":"Huzhou","FirstLast":[{"To":"BR24","Time":["06:00","01:03"]},{"To":"BR01","Time":["06:00","00:05"]}]},{"StationID":"BR22","lat":25.067455,"lon":25.067455,"name":"東湖","ename":"Donghu","FirstLast":[{"To":"BR24","Time":["06:01","01:05"]},{"To":"BR01","Time":["06:03","00:03"]}]},{"StationID":"BR23","lat":25.05992,"lon":25.05992,"name":"南港軟體園區","ename":"Nangang Software Park","FirstLast":[{"To":"BR24","Time":["06:03","01:07"]},{"To":"BR01","Time":["06:01","00:01"]}]},{"StationID":"BR24","lat":25.054919,"lon":25.054919,"name":"南港展覽館","ename":"Taipei Nangang Exhibition Center","FirstLast":[{"To":"BR01","Time":["06:00","00:00"]}]},{"StationID":"R02","lat":25.032395,"lon":25.032395,"name":"象山","ename":"Xiangshan","FirstLast":[{"To":"R28","Time":["06:00","00:00"]}]},{"StationID":"R03","lat":25.032865,"lon":25.032865,"name":"台北101/世貿","ename":"Taipei 101/World Trade Center","FirstLast":[{"To":"R28","Time":["06:02","00:02"]},{"To":"R02","Time":["06:04","00:56"]}]},{"StationID":"R04","lat":25.033015,"lon":25.033015,"name":"信義安和","ename":"Xinyi Anhe","FirstLast":[{"To":"R28","Time":["06:04","00:04"]},{"To":"R02","Time":["06:02","00:54"]}]},{"StationID":"R05","lat":25.033311,"lon":25.033311,"name":"大安","ename":"Daan","FirstLast":[{"To":"R28","Time":["06:00","00:25"]},{"To":"R02","Time":["06:00","00:52"]}]},{"StationID":"R06","lat":25.033225,"lon":25.033225,"name":"大安森林公園","ename":"Daan Park","FirstLast":[{"To":"R28","Time":["06:01","00:26"]},{"To":"R02","Time":["06:08","00:50"]}]},{"StationID":"R07","lat":25.033894,"lon":25.033894,"name":"東門","ename":"Dongmen","FirstLast":[{"To":"R28","Time":["06:03","00:28"]},{"To":"R02","Time":["06:06","00:49"]}]},{"StationID":"R08","lat":25.032767,"lon":25.032767,"name":"中正紀念堂","ename":"Chiang Kai-Shek Memorial Hall","FirstLast":[{"To":"R28","Time":["06:06","00:31"]},{"To":"R02","Time":["06:03","00:45"]}]},{"StationID":"R09","lat":25.041399,"lon":25.041399,"name":"台大醫院","ename":"NTU Hospital","FirstLast":[{"To":"R28","Time":["06:08","00:33"]},{"To":"R02","Time":["06:01","00:43"]}]},{"StationID":"R10","lat":25.04631,"lon":25.04631,"name":"台北車站","ename":"Taipei Main Station","FirstLast":[{"To":"R28","Time":["06:00","00:35"]},{"To":"R02","Time":["06:00","00:41"]}]},{"StationID":"R11","lat":25.052621,"lon":25.052621,"name":"中山","ename":"Zhongshan","FirstLast":[{"To":"R28","Time":["06:02","00:37"]},{"To":"R02","Time":["06:03","00:40"]}]},{"StationID":"R12","lat":25.057575,"lon":25.057575,"name":"雙連","ename":"Shuanglian","FirstLast":[{"To":"R28","Time":["06:03","00:38"]},{"To":"R02","Time":["06:01","00:38"]}]},{"StationID":"R13","lat":25.06235,"lon":25.06235,"name":"民權西路","ename":"Minzuan W. Rd.","FirstLast":[{"To":"R28","Time":["06:05","00:39"]},{"To":"R02","Time":["06:00","00:37"]}]},{"StationID":"R14","lat":25.071409,"lon":25.071409,"name":"圓山","ename":"Yuanshan","FirstLast":[{"To":"R28","Time":["06:07","00:42"]},{"To":"R02","Time":["06:02","00:34"]}]},{"StationID":"R15","lat":25.084201,"lon":25.084201,"name":"劍潭","ename":"Jiantan","FirstLast":[{"To":"R28","Time":["06:00","00:45"]},{"To":"R02","Time":["06:00","00:31"]}]},{"StationID":"R16","lat":25.093492,"lon":25.093492,"name":"士林","ename":"Shilin","FirstLast":[{"To":"R28","Time":["06:02","00:47"]},{"To":"R02","Time":["06:05","00:28"]}]},{"StationID":"R17","lat":25.102718,"lon":25.102718,"name":"芝山","ename":"Zhishan","FirstLast":[{"To":"R28","Time":["06:04","00:50"]},{"To":"R02","Time":["06:03","00:26"]}]},{"StationID":"R18","lat":25.109815,"lon":25.109815,"name":"明德","ename":"Mingde","FirstLast":[{"To":"R28","Time":["06:05","00:52"]},{"To":"R02","Time":["06:01","00:24"]}]},{"StationID":"R19","lat":25.114455,"lon":25.114455,"name":"石牌","ename":"Shipai","FirstLast":[{"To":"R28","Time":["06:07","00:53"]},{"To":"R02","Time":["06:00","00:23"]}]},{"StationID":"R20","lat":25.120852,"lon":25.120852,"name":"唭哩岸","ename":"Qilian","FirstLast":[{"To":"R28","Time":["06:00","00:56"]},{"To":"R02","Time":["06:00","00:19"]}]},{"StationID":"R21","lat":25.12547,"lon":25.12547,"name":"奇岩","ename":"Qiyan","FirstLast":[{"To":"R28","Time":["06:02","00:58"]},{"To":"R02","Time":["06:02","00:18"]}]},{"StationID":"R22","lat":25.131819,"lon":25.131819,"name":"北投","ename":"Beitou","FirstLast":[{"To":"R28","Time":["06:03","01:00"]},{"To":"R02","Time":["06:00","00:16"]},{"To":"R22A","Time":["06:00","00:10"]}]},{"StationID":"R22A","lat":25.136931,"lon":25.136931,"name":"新北投","ename":"Xinbeitou","FirstLast":[{"To":"R22","Time":["06:05","00:02"]}]},{"StationID":"R23","lat":25.137497,"lon":25.137497,"name":"復興崗","ename":"Fuxinggang","FirstLast":[{"To":"R28","Time":["06:06","01:03"]},{"To":"R02","Time":["06:02","00:12"]}]},{"StationID":"R24","lat":25.130923,"lon":25.130923,"name":"忠義","ename":"Zhongyi","FirstLast":[{"To":"R28","Time":["06:02","01:05"]},{"To":"R02","Time":["06:00","00:10"]}]},{"StationID":"R25","lat":25.12551,"lon":25.12551,"name":"關渡","ename":"Guandu","FirstLast":[{"To":"R28","Time":["06:04","01:07"]},{"To":"R02","Time":["06:08","00:08"]}]},{"StationID":"R26","lat":25.1369,"lon":25.1369,"name":"竹圍","ename":"Zhuwei","FirstLast":[{"To":"R28","Time":["06:07","01:10"]},{"To":"R02","Time":["06:05","00:06"]}]},{"StationID":"R27","lat":25.15399,"lon":25.15399,"name":"紅樹林","ename":"Hongshulin","FirstLast":[{"To":"R28","Time":["06:00","01:13"]},{"To":"R02","Time":["06:03","00:03"]}]},{"StationID":"R28","lat":25.167745,"lon":25.167745,"name":"淡水","ename":"Tamsui","FirstLast":[{"To":"R02","Time":["06:00","00:00"]}]},{"StationID":"G01","lat":24.95761,"lon":24.95761,"name":"新店","ename":"Xindian","FirstLast":[{"To":"G19","Time":["06:00","00:00"]}]},{"StationID":"G02","lat":24.96744,"lon":24.96744,"name":"新店區公所","ename":"Xindian District Office","FirstLast":[{"To":"G19","Time":["06:02","00:02"]},{"To":"G01","Time":["06:02","01:05"]}]},{"StationID":"G03","lat":24.97545,"lon":24.97545,"name":"七張","ename":"Qizhang","FirstLast":[{"To":"G19","Time":["06:03","00:03"]},{"To":"G01","Time":["06:00","01:03"]},{"To":"G03","Time":["06:03","23:57"]}]},{"StationID":"G03A","lat":24.97188,"lon":24.97188,"name":"小碧潭","ename":"Xiaobitan","FirstLast":[{"To":"G03A","Time":["06:11","00:09"]}]},{"StationID":"G04","lat":24.98272,"lon":24.98272,"name":"大坪林","ename":"Dapinglin","FirstLast":[{"To":"G19","Time":["06:00","00:05"]},{"To":"G01","Time":["06:08","01:02"]}]},{"StationID":"G05","lat":24.992824,"lon":24.992824,"name":"景美","ename":"Jingmei","FirstLast":[{"To":"G19","Time":["06:02","00:07"]},{"To":"G01","Time":["06:06","01:00"]}]},{"StationID":"G06","lat":25.001978,"lon":25.001978,"name":"萬隆","ename":"Wanlong","FirstLast":[{"To":"G19","Time":["06:04","00:08"]},{"To":"G01","Time":["06:04","00:58"]}]},{"StationID":"G07","lat":25.014781,"lon":25.014781,"name":"公館","ename":"Gongguan","FirstLast":[{"To":"G19","Time":["06:00","00:11"]},{"To":"G01","Time":["06:02","00:55"]}]},{"StationID":"G08","lat":25.020733,"lon":25.020733,"name":"台電大樓","ename":"Taipower Building","FirstLast":[{"To":"G19","Time":["06:02","00:12"]},{"To":"G01","Time":["06:00","00:54"]}]},{"StationID":"G09","lat":25.026373,"lon":25.026373,"name":"古亭","ename":"Guting","FirstLast":[{"To":"G19","Time":["06:04","00:14"]},{"To":"G01","Time":["06:05","00:52"]}]},{"StationID":"G10","lat":25.032767,"lon":25.032767,"name":"中正紀念堂","ename":"Chiang Kai-Shek Memorial Hall","FirstLast":[{"To":"G19","Time":["06:00","00:16"]},{"To":"G01","Time":["06:03","00:50"]}]},{"StationID":"G11","lat":25.035585,"lon":25.035585,"name":"小南門","ename":"Xiaonanmen","FirstLast":[{"To":"G19","Time":["06:02","00:18"]},{"To":"G01","Time":["06:02","00:48"]}]},{"StationID":"G12","lat":25.042025,"lon":25.042025,"name":"西門","ename":"Ximen","FirstLast":[{"To":"G19","Time":["06:04","00:27"]},{"To":"G01","Time":["06:00","00:46"]}]},{"StationID":"G13","lat":25.049554,"lon":25.049554,"name":"北門","ename":"Beimen","FirstLast":[{"To":"G19","Time":["06:00","00:41"]},{"To":"G01","Time":["06:02","00:44"]}]},{"StationID":"G14","lat":25.052621,"lon":25.052621,"name":"中山","ename":"Zhongshan","FirstLast":[{"To":"G19","Time":["06:02","00:43"]},{"To":"G01","Time":["06:00","00:42"]}]},{"StationID":"G15","lat":25.052693,"lon":25.052693,"name":"松江南京","ename":"Songliang Nanjing","FirstLast":[{"To":"G19","Time":["06:05","00:45"]},{"To":"G01","Time":["06:02","00:40"]}]},{"StationID":"G16","lat":25.052044,"lon":25.052044,"name":"南京復興","ename":"Nanjing Fuxing","FirstLast":[{"To":"G19","Time":["06:00","00:47"]},{"To":"G01","Time":["06:00","00:38"]}]},{"StationID":"G17","lat":25.05152,"lon":25.05152,"name":"台北小巨蛋","ename":"Taipei Arena","FirstLast":[{"To":"G19","Time":["06:02","00:49"]},{"To":"G01","Time":["06:05","00:05"]}]},{"StationID":"G18","lat":25.051588,"lon":25.051588,"name":"南京三民","ename":"Nanjing Sanmin","FirstLast":[{"To":"G19","Time":["06:05","00:51"]},{"To":"G01","Time":["06:03","00:03"]}]},{"StationID":"G19","lat":25.050118,"lon":25.050118,"name":"松山","ename":"Songshan","FirstLast":[{"To":"G01","Time":["06:00","00:00"]}]},{"StationID":"O01","lat":24.990065,"lon":24.990065,"name":"南勢角","ename":"Nanshijiao","FirstLast":[{"To":"O21","Time":["06:00","00:00"]},{"To":"O54","Time":["06:04","00:03"]}]},{"StationID":"O02","lat":24.99392,"lon":24.99392,"name":"景安","ename":"Jingan","FirstLast":[{"To":"O21","Time":["06:01","00:02"]},{"To":"O01","Time":["06:01","01:01"]},{"To":"O54","Time":["06:05","00:05"]}]},{"StationID":"O03","lat":25.002895,"lon":25.002895,"name":"永安市場","ename":"Yongan Market","FirstLast":[{"To":"O21","Time":["06:03","00:04"]},{"To":"O01","Time":["06:00","01:00"]},{"To":"O54","Time":["06:00","00:07"]}]},{"StationID":"O04","lat":25.013858,"lon":25.013858,"name":"頂溪","ename":"Dingxi","FirstLast":[{"To":"O21","Time":["06:05","00:06"]},{"To":"O01","Time":["06:03","00:58"]},{"To":"O54","Time":["06:02","00:09"]}]},{"StationID":"O05","lat":25.026373,"lon":25.026373,"name":"古亭","ename":"Guting","FirstLast":[{"To":"O21","Time":["06:00","00:17"]},{"To":"O01","Time":["06:00","00:54"]},{"To":"O54","Time":["06:06","00:27"]}]},{"StationID":"O06","lat":25.033894,"lon":25.033894,"name":"東門","ename":"Dongmen","FirstLast":[{"To":"O21","Time":["06:03","00:33"]},{"To":"O01","Time":["06:03","00:50"]},{"To":"O54","Time":["06:08","00:30"]}]},{"StationID":"O07","lat":25.042498,"lon":25.042498,"name":"忠孝新生","ename":"Zhongxiao Xinsheng","FirstLast":[{"To":"O21","Time":["06:06","00:36"]},{"To":"O01","Time":["06:00","00:48"]},{"To":"O54","Time":["06:00","00:33"]}]},{"StationID":"O08","lat":25.052693,"lon":25.052693,"name":"松江南京","ename":"Songliang Nanjing","FirstLast":[{"To":"O21","Time":["06:08","00:38"]},{"To":"O01","Time":["06:03","00:46"]},{"To":"O54","Time":["06:02","00:35"]}]},{"StationID":"O09","lat":25.05924,"lon":25.05924,"name":"行天宮","ename":"Xingtian Temple","FirstLast":[{"To":"O21","Time":["06:00","00:40"]},{"To":"O01","Time":["06:01","00:44"]},{"To":"O54","Time":["06:04","00:37"]}]},{"StationID":"O10","lat":25.062665,"lon":25.062665,"name":"中山國小","ename":"Zhongshan Elementary School","FirstLast":[{"To":"O21","Time":["06:02","00:41"]},{"To":"O01","Time":["06:00","00:42"]},{"To":"O54","Time":["06:06","00:39"]}]},{"StationID":"O11","lat":25.06235,"lon":25.06235,"name":"民權西路","ename":"Minzuan W. Rd.","FirstLast":[{"To":"O21","Time":["06:04","00:43"]},{"To":"O01","Time":["06:01","00:40"]},{"To":"O54","Time":["06:00","00:41"]}]},{"StationID":"O12","lat":25.06322,"lon":25.06322,"name":"大橋頭","ename":"Daqiaotou","FirstLast":[{"To":"O21","Time":["06:06","00:45"]},{"To":"O01","Time":["06:00","00:29"]},{"To":"O54","Time":["06:02","00:42"]}]},{"StationID":"O13","lat":25.063075,"lon":25.063075,"name":"台北橋","ename":"Taipei Bridge","FirstLast":[{"To":"O21","Time":["06:08","00:47"]},{"To":"O01","Time":["06:06","00:27"]}]},{"StationID":"O14","lat":25.059451,"lon":25.059451,"name":"菜寮","ename":"Cailiao","FirstLast":[{"To":"O21","Time":["06:00","00:49"]},{"To":"O01","Time":["06:04","00:25"]}]},{"StationID":"O15","lat":25.05571,"lon":25.05571,"name":"三重","ename":"Sanchong","FirstLast":[{"To":"O21","Time":["06:02","00:51"]},{"To":"O01","Time":["06:02","00:23"]}]},{"StationID":"O16","lat":25.04632,"lon":25.04632,"name":"先嗇宮","ename":"Xianse Temple","FirstLast":[{"To":"O21","Time":["06:04","00:53"]},{"To":"O01","Time":["06:00","00:12"]}]},{"StationID":"O17","lat":25.039735,"lon":25.039735,"name":"頭前庄","ename":"Touqianzhuang","FirstLast":[{"To":"O21","Time":["06:07","00:56"]},{"To":"O01","Time":["06:04","00:10"]}]},{"StationID":"O18","lat":25.03608,"lon":25.03608,"name":"新莊","ename":"Xinzhuang","FirstLast":[{"To":"O21","Time":["06:00","00:58"]},{"To":"O01","Time":["06:03","00:08"]}]},{"StationID":"O19","lat":25.03279,"lon":25.03279,"name":"輔大","ename":"Fu Jen University","FirstLast":[{"To":"O21","Time":["06:03","01:01"]},{"To":"O01","Time":["06:00","00:05"]}]},{"StationID":"O20","lat":25.029073,"lon":25.029073,"name":"丹鳳","ename":"Danfeng","FirstLast":[{"To":"O21","Time":["06:00","01:03"]},{"To":"O01","Time":["06:03","00:03"]}]},{"StationID":"O21","lat":25.022107,"lon":25.022107,"name":"迴龍","ename":"Huilong","FirstLast":[{"To":"O01","Time":["06:00","00:00"]}]},{"StationID":"O50","lat":25.070275,"lon":25.070275,"name":"三重國小","ename":"Sanchong Elementary School","FirstLast":[{"To":"O54","Time":["06:05","00:45"]},{"To":"O01","Time":["06:02","00:09"]}]},{"StationID":"O51","lat":25.07646,"lon":25.07646,"name":"三和國中","ename":"Sanhe Junior High School","FirstLast":[{"To":"O54","Time":["06:07","00:47"]},{"To":"O01","Time":["06:00","00:07"]}]},{"StationID":"O52","lat":25.080485,"lon":25.080485,"name":"徐匯中學","ename":"St.lgnatius High School","FirstLast":[{"To":"O54","Time":["06:00","00:49"]},{"To":"O01","Time":["06:04","00:05"]}]},{"StationID":"O53","lat":25.085425,"lon":25.085425,"name":"三民高中","ename":"Sanmin Senior High School","FirstLast":[{"To":"O54","Time":["06:02","00:51"]},{"To":"O01","Time":["06:02","00:03"]}]},{"StationID":"O54","lat":25.09152,"lon":25.09152,"name":"蘆洲","ename":"Luzhou","FirstLast":[{"To":"O01","Time":["06:00","00:00"]}]},{"StationID":"BL01","lat":24.96012,"lon":24.96012,"name":"頂埔","ename":"Dingpu","FirstLast":[{"To":"BL23","Time":["06:00","00:00"]}]},{"StationID":"BL02","lat":24.96682,"lon":24.96682,"name":"永寧","ename":"Yongning","FirstLast":[{"To":"BL23","Time":["06:03","00:03"]},{"To":"BL01","Time":["06:00","01:08"]}]},{"StationID":"BL03","lat":24.97313,"lon":24.97313,"name":"土城","ename":"Tucheng","FirstLast":[{"To":"BL23","Time":["06:05","00:05"]},{"To":"BL01","Time":["06:05","01:06"]}]},{"StationID":"BL04","lat":24.985305,"lon":24.985305,"name":"海山","ename":"Haishan","FirstLast":[{"To":"BL23","Time":["06:07","00:07"]},{"To":"BL01","Time":["06:03","01:04"]}]},{"StationID":"BL05","lat":24.99828,"lon":24.99828,"name":"亞東醫院","ename":"Far Eastern Hospital","FirstLast":[{"To":"BL23","Time":["06:00","00:10"]},{"To":"BL01","Time":["06:00","01:01"]}]},{"StationID":"BL06","lat":25.008465,"lon":25.008465,"name":"府中","ename":"Fuzhong","FirstLast":[{"To":"BL23","Time":["06:02","00:12"]},{"To":"BL01","Time":["06:05","00:59"]}]},{"StationID":"BL07","lat":25.013825,"lon":25.013825,"name":"板橋","ename":"Banqiao","FirstLast":[{"To":"BL23","Time":["06:03","00:13"]},{"To":"BL01","Time":["06:04","00:57"]}]},{"StationID":"BL08","lat":25.02327,"lon":25.02327,"name":"新埔","ename":"Xinpu","FirstLast":[{"To":"BL23","Time":["06:00","00:16"]},{"To":"BL01","Time":["06:02","00:55"]}]},{"StationID":"BL09","lat":25.030265,"lon":25.030265,"name":"江子翠","ename":"Jiangzicui","FirstLast":[{"To":"BL23","Time":["06:02","00:17"]},{"To":"BL01","Time":["06:00","00:54"]}]},{"StationID":"BL10","lat":25.03528,"lon":25.03528,"name":"龍山寺","ename":"Longshan Temple","FirstLast":[{"To":"BL23","Time":["06:05","00:21"]},{"To":"BL01","Time":["06:05","00:50"]}]},{"StationID":"BL11","lat":25.042025,"lon":25.042025,"name":"西門","ename":"Ximen","FirstLast":[{"To":"BL23","Time":["06:08","00:23"]},{"To":"BL01","Time":["06:03","00:48"]}]},{"StationID":"BL12","lat":25.04631,"lon":25.04631,"name":"台北車站","ename":"Taipei Main Station","FirstLast":[{"To":"BL23","Time":["06:00","00:45"]},{"To":"BL01","Time":["06:00","00:45"]}]},{"StationID":"BL13","lat":25.04468,"lon":25.04468,"name":"善導寺","ename":"Shandao Temple","FirstLast":[{"To":"BL23","Time":["06:02","00:46"]},{"To":"BL01","Time":["06:07","00:44"]}]},{"StationID":"BL14","lat":25.042498,"lon":25.042498,"name":"忠孝新生","ename":"Zhongxiao Xinsheng","FirstLast":[{"To":"BL23","Time":["06:04","00:48"]},{"To":"BL01","Time":["06:05","00:42"]}]},{"StationID":"BL15","lat":25.041749,"lon":25.041749,"name":"忠孝復興","ename":"Zhongxiao Fuxing","FirstLast":[{"To":"BL23","Time":["06:00","00:50"]},{"To":"BL01","Time":["06:03","00:40"]}]},{"StationID":"BL16","lat":25.041505,"lon":25.041505,"name":"忠孝敦化","ename":"Xhongxiao Dunhua","FirstLast":[{"To":"BL23","Time":["06:01","00:52"]},{"To":"BL01","Time":["06:02","00:24"]}]},{"StationID":"BL17","lat":25.04137,"lon":25.04137,"name":"國父紀念館","ename":"Sun Yat-Sen Memorial Hall","FirstLast":[{"To":"BL23","Time":["06:03","00:53"]},{"To":"BL01","Time":["06:00","00:22"]}]},{"StationID":"BL18","lat":25.041135,"lon":25.041135,"name":"市政府","ename":"Taipei City Hall","FirstLast":[{"To":"BL23","Time":["06:00","00:55"]},{"To":"BL01","Time":["06:03","00:21"]}]},{"StationID":"BL19","lat":25.040855,"lon":25.040855,"name":"永春","ename":"Yongchun","FirstLast":[{"To":"BL23","Time":["06:02","00:57"]},{"To":"BL01","Time":["06:02","00:19"]}]},{"StationID":"BL20","lat":25.044715,"lon":25.044715,"name":"後山埤","ename":"Houshanpi","FirstLast":[{"To":"BL23","Time":["06:04","00:59"]},{"To":"BL01","Time":["06:00","00:17"]}]},{"StationID":"BL21","lat":25.050459,"lon":25.050459,"name":"昆陽","ename":"Kunyang","FirstLast":[{"To":"BL23","Time":["06:06","01:01"]},{"To":"BL01","Time":["06:04","00:15"]}]},{"StationID":"BL22","lat":25.052035,"lon":25.052035,"name":"南港","ename":"Nangang","FirstLast":[{"To":"BL23","Time":["06:00","01:03"]},{"To":"BL01","Time":["06:02","00:12"]}]},{"StationID":"BL23","lat":25.054919,"lon":25.054919,"name":"南港展覽館","ename":"Taipei Nangang Exhibition Center","FirstLast":[{"To":"BL01","Time":["06:00","00:00"]}]}];

	var krtc_station = [{"StationID":"R3","lat":22.564822,"lon":22.564822,"name":"小港","ename":"Siaogang","FirstLast":[{"To":"R24","Time":["05:55","00:00"]},{"To":"R3","Time":["",""]}]},{"StationID":"R4","lat":22.570199,"lon":22.570199,"name":"高雄國際機場","ename":"Kaohsiung International Airport","FirstLast":[{"To":"R24","Time":["05:56","00:02"]},{"To":"R3","Time":["06:26","00:44"]}]},{"StationID":"R4A","lat":22.580363,"lon":22.580363,"name":"草衙","ename":"Caoya","FirstLast":[{"To":"R24","Time":["05:58","00:05"]},{"To":"R3","Time":["06:24","00:42"]}]},{"StationID":"R5","lat":22.588356,"lon":22.588356,"name":"前鎮高中","ename":"Cianjhen Senior High School","FirstLast":[{"To":"R24","Time":["06:00","00:08"]},{"To":"R3","Time":["06:22","00:40"]}]},{"StationID":"R6","lat":22.596856,"lon":22.596856,"name":"凱旋","ename":"Kaisyuan","FirstLast":[{"To":"R24","Time":["06:02","00:10"]},{"To":"R3","Time":["06:20","00:38"]}]},{"StationID":"R7","lat":22.60587,"lon":22.60587,"name":"獅甲","ename":"Shihjia","FirstLast":[{"To":"R24","Time":["06:04","00:13"]},{"To":"R3","Time":["06:18","00:35"]}]},{"StationID":"R8","lat":22.614011,"lon":22.614011,"name":"三多商圈","ename":"Sanduo Shopping District","FirstLast":[{"To":"R24","Time":["05:55","00:16"]},{"To":"R3","Time":["06:16","00:33"]}]},{"StationID":"R9","lat":22.624628,"lon":22.624628,"name":"中央公園","ename":"Central Park","FirstLast":[{"To":"R24","Time":["05:56","00:18"]},{"To":"R3","Time":["06:14","00:31"]}]},{"StationID":"R10","lat":22.631387,"lon":22.631387,"name":"美麗島","ename":"Formosa Boulevard","FirstLast":[{"To":"R24","Time":["05:58","00:21"]},{"To":"R3","Time":["06:12","00:29"]}]},{"StationID":"R11","lat":22.639769,"lon":22.639769,"name":"高雄車站","ename":"Kaohsiung Main Station","FirstLast":[{"To":"R24","Time":["06:00","00:23"]},{"To":"R3","Time":["06:10","00:28"]}]},{"StationID":"R12","lat":22.648314,"lon":22.648314,"name":"後驛","ename":"Houyi","FirstLast":[{"To":"R24","Time":["06:02","00:25"]},{"To":"R3","Time":["06:08","00:25"]}]},{"StationID":"R13","lat":22.657126,"lon":22.657126,"name":"凹子底","ename":"Aozihdi","FirstLast":[{"To":"R24","Time":["06:04","00:27"]},{"To":"R3","Time":["06:06","00:24"]}]},{"StationID":"R14","lat":22.666135,"lon":22.666135,"name":"巨蛋","ename":"Kaohsiung Arena","FirstLast":[{"To":"R24","Time":["06:06","00:29"]},{"To":"R3","Time":["06:04","00:22"]}]},{"StationID":"R15","lat":22.676738,"lon":22.676738,"name":"生態園區","ename":"Ecological District","FirstLast":[{"To":"R24","Time":["06:08","00:31"]},{"To":"R3","Time":["06:02","00:20"]}]},{"StationID":"R16","lat":22.688073,"lon":22.688073,"name":"左營","ename":"Zuoying","FirstLast":[{"To":"R24","Time":["06:10","00:33"]},{"To":"R3","Time":["06:00","00:17"]}]},{"StationID":"R17","lat":22.701622,"lon":22.701622,"name":"世運","ename":"World Game","FirstLast":[{"To":"R24","Time":["06:12","00:35"]},{"To":"R3","Time":["05:58","00:15"]}]},{"StationID":"R18","lat":22.708479,"lon":22.708479,"name":"油廠國小","ename":"Oil Refinery Elementary School","FirstLast":[{"To":"R24","Time":["06:14","00:37"]},{"To":"R3","Time":["05:56","00:14"]}]},{"StationID":"R19","lat":22.718671,"lon":22.718671,"name":"楠梓加工區","ename":"Nanzih Export Processing Zone","FirstLast":[{"To":"R24","Time":["06:16","00:39"]},{"To":"R3","Time":["05:55","00:11"]}]},{"StationID":"R20","lat":22.7223,"lon":22.7223,"name":"後勁","ename":"Houjing","FirstLast":[{"To":"R24","Time":["06:18","00:41"]},{"To":"R3","Time":["06:10","00:10"]}]},{"StationID":"R21","lat":22.729403,"lon":22.729403,"name":"都會公園","ename":"Metropolitan Park","FirstLast":[{"To":"R24","Time":["06:20","00:42"]},{"To":"R3","Time":["06:08","00:08"]}]},{"StationID":"R22","lat":22.744399,"lon":22.744399,"name":"青埔","ename":"Cingpu","FirstLast":[{"To":"R24","Time":["06:22","00:45"]},{"To":"R3","Time":["06:06","00:06"]}]},{"StationID":"R22A","lat":22.753398,"lon":22.753398,"name":"橋頭糖廠","ename":"Ciaotou Sugar Refinery","FirstLast":[{"To":"R24","Time":["06:24","00:46"]},{"To":"R3","Time":["06:04","00:04"]}]},{"StationID":"R23","lat":22.760452,"lon":22.760452,"name":"橋頭火車站","ename":"Ciaotou Station","FirstLast":[{"To":"R24","Time":["06:25","00:48"]},{"To":"R3","Time":["06:02","00:02"]}]},{"StationID":"R24","lat":22.780544,"lon":22.780544,"name":"南岡山","ename":"Gangshan South","FirstLast":[{"To":"R24","Time":["",""]},{"To":"R3","Time":["06:00","00:00"]}]},{"StationID":"O1","lat":22.621544,"lon":22.621544,"name":"西子灣","ename":"Sizihwan","FirstLast":[{"To":"OT1","Time":["06:00","00:00"]},{"To":"O1","Time":["",""]}]},{"StationID":"O2","lat":22.623538,"lon":22.623538,"name":"鹽埕埔","ename":"Yanchengpu","FirstLast":[{"To":"OT1","Time":["06:01","00:01"]},{"To":"O1","Time":["06:03","00:21"]}]},{"StationID":"O4","lat":22.629002,"lon":22.629002,"name":"市議會","ename":"City Council","FirstLast":[{"To":"OT1","Time":["06:03","00:03"]},{"To":"O1","Time":["06:01","00:19"]}]},{"StationID":"O5","lat":22.631387,"lon":22.631387,"name":"美麗島","ename":"Formosa Boulevard","FirstLast":[{"To":"OT1","Time":["06:05","00:05"]},{"To":"O1","Time":["06:00","00:16"]}]},{"StationID":"O6","lat":22.630745,"lon":22.630745,"name":"信義國小","ename":"Sinyi Elementary School","FirstLast":[{"To":"OT1","Time":["06:07","00:07"]},{"To":"O1","Time":["06:05","00:15"]}]},{"StationID":"O7","lat":22.630292,"lon":22.630292,"name":"文化中心","ename":"Cultural Center","FirstLast":[{"To":"OT1","Time":["06:08","00:08"]},{"To":"O1","Time":["06:04","00:13"]}]},{"StationID":"O8","lat":22.629331,"lon":22.629331,"name":"五塊厝","ename":"Wukuaicuo","FirstLast":[{"To":"OT1","Time":["06:00","00:10"]},{"To":"O1","Time":["06:02","00:12"]}]},{"StationID":"O9","lat":22.627291,"lon":22.627291,"name":"技擊館","ename":"Martial Arts Stadium","FirstLast":[{"To":"OT1","Time":["06:01","00:12"]},{"To":"O1","Time":["06:01","00:10"]}]},{"StationID":"O10","lat":22.625162,"lon":22.625162,"name":"衛武營","ename":"Weiwuying","FirstLast":[{"To":"OT1","Time":["06:02","00:13"]},{"To":"O1","Time":["06:00","00:09"]}]},{"StationID":"O11","lat":22.625331,"lon":22.625331,"name":"鳳山西站","ename":"Fongshan West","FirstLast":[{"To":"OT1","Time":["06:04","00:15"]},{"To":"O1","Time":["06:06","00:07"]}]},{"StationID":"O12","lat":22.625994,"lon":22.625994,"name":"鳳山","ename":"Fongshan","FirstLast":[{"To":"OT1","Time":["06:05","00:16"]},{"To":"O1","Time":["06:05","00:06"]}]},{"StationID":"O13","lat":22.625197,"lon":22.625197,"name":"大東","ename":"Dadong","FirstLast":[{"To":"OT1","Time":["06:07","00:18"]},{"To":"O1","Time":["06:03","00:04"]}]},{"StationID":"O14","lat":22.624915,"lon":22.624915,"name":"鳳山國中","ename":"Fongshan Junior High School","FirstLast":[{"To":"OT1","Time":["06:09","00:20"]},{"To":"O1","Time":["06:02","00:02"]}]},{"StationID":"OT1","lat":22.622423,"lon":22.622423,"name":"大寮","ename":"Daliao","FirstLast":[{"To":"OT1","Time":["",""]},{"To":"O1","Time":["06:00","00:00"]}]}];

	var tymetro_station = [{"StationID":"A1","lat":25.048,"lon":25.048,"name":"台北車站","ename":"Taipei Main Station","FirstLast":[{"To":"A21","Time":["06:07","23:07"],"TrainType":1},{"To":"A13","Time":["06:00","23:00"],"TrainType":2}]},{"StationID":"A2","lat":25.054,"lon":25.054,"name":"三重站","ename":"Sanchong Station","FirstLast":[{"To":"A21","Time":["05:58","23:15"],"TrainType":1},{"To":"A1","Time":["06:08","00:17"],"TrainType":1}]},{"StationID":"A3","lat":25.061,"lon":25.061,"name":"新北產業園區站","ename":"New Taipei Industrial Park Station","FirstLast":[{"To":"A21","Time":["06:02","23:19"],"TrainType":1},{"To":"A1","Time":["06:03","00:12"],"TrainType":1},{"To":"A13","Time":["06:09","23:09"],"TrainType":2},{"To":"A1","Time":["06:11","23:26"],"TrainType":2}]},{"StationID":"A4","lat":25.059,"lon":25.059,"name":"新莊副都心站","ename":"Xinzhuang Fuduxin Station","FirstLast":[{"To":"A21","Time":["06:05","23:22"],"TrainType":1},{"To":"A1","Time":["06:00","00:09"],"TrainType":1}]},{"StationID":"A5","lat":25.052,"lon":25.052,"name":"泰山站","ename":"Taishan Station","FirstLast":[{"To":"A21","Time":["06:07","23:24"],"TrainType":1},{"To":"A1","Time":["05:58","00:07"],"TrainType":1}]},{"StationID":"A6","lat":25.033,"lon":25.033,"name":"泰山貴和站","ename":"Taishan Guihe Station","FirstLast":[{"To":"A21","Time":["06:10","23:27"],"TrainType":1},{"To":"A1","Time":["06:10","00:04"],"TrainType":1}]},{"StationID":"A7","lat":25.041,"lon":25.041,"name":"體育大學站","ename":"National Taiwan Sport University Station","FirstLast":[{"To":"A21","Time":["06:00","23:32"],"TrainType":1},{"To":"A1","Time":["06:03","23:57"],"TrainType":1}]},{"StationID":"A8","lat":25.061,"lon":25.061,"name":"長庚醫院站","ename":"Chang Gung Memorial Hospital Station","FirstLast":[{"To":"A21","Time":["06:08","23:36"],"TrainType":1},{"To":"A1","Time":["05:59","23:53"],"TrainType":1},{"To":"A13","Time":["06:06","23:21"],"TrainType":2},{"To":"A1","Time":["05:58","23:11"],"TrainType":2}]},{"StationID":"A9","lat":25.066,"lon":25.066,"name":"林口站","ename":"Linkou Station","FirstLast":[{"To":"A21","Time":["06:11","23:39"],"TrainType":1},{"To":"A1","Time":["06:07","23:50"],"TrainType":1}]},{"StationID":"A10","lat":25.081,"lon":25.081,"name":"山鼻站","ename":"Shanbi Station","FirstLast":[{"To":"A21","Time":["06:05","23:48"],"TrainType":1},{"To":"A1","Time":["05:59","23:42"],"TrainType":1}]},{"StationID":"A11","lat":25.086,"lon":25.086,"name":"坑口站","ename":"Kengkou Station","FirstLast":[{"To":"A21","Time":["06:08","23:51"],"TrainType":1},{"To":"A1","Time":["06:11","23:40"],"TrainType":1}]},{"StationID":"A12","lat":25.082,"lon":25.082,"name":"機場第一航廈站","ename":"Airport Terminal 1 Station","FirstLast":[{"To":"A21","Time":["05:57","23:55"],"TrainType":1},{"To":"A1","Time":["06:07","23:36"],"TrainType":1},{"To":"A13","Time":["06:07","23:37"],"TrainType":2},{"To":"A1","Time":["05:59","22:58"],"TrainType":2}]},{"StationID":"A13","lat":25.077,"lon":25.077,"name":"機場第二航廈站","ename":"Airport Terminal 2 Station","FirstLast":[{"To":"A21","Time":["06:00","23:57"],"TrainType":1},{"To":"A1","Time":["06:04","23:33"],"TrainType":1},{"To":"A1","Time":["05:57","22:55"],"TrainType":2}]},{"StationID":"A14a","lat":25.069,"lon":25.069,"name":"機場旅館站","ename":"Airport Hotel Station","FirstLast":[{"To":"A21","Time":["06:03","00:00"],"TrainType":1},{"To":"A1","Time":["06:00","23:29"],"TrainType":1}]},{"StationID":"A15","lat":25.056,"lon":25.056,"name":"大園站","ename":"Dayuan Station","FirstLast":[{"To":"A21","Time":["06:06","00:03"],"TrainType":1},{"To":"A1","Time":["06:12","23:26"],"TrainType":1}]},{"StationID":"A16","lat":25.037,"lon":25.037,"name":"橫山站","ename":"Hengshan Station","FirstLast":[{"To":"A21","Time":["06:09","00:06"],"TrainType":1},{"To":"A1","Time":["06:09","23:23"],"TrainType":1}]},{"StationID":"A17","lat":25.024,"lon":25.024,"name":"領航站","ename":"Linghang Station","FirstLast":[{"To":"A21","Time":["06:12","00:09"],"TrainType":1},{"To":"A1","Time":["06:06","23:20"],"TrainType":1}]},{"StationID":"A18","lat":25.014,"lon":25.014,"name":"高鐵桃園站","ename":"Taoyuan HSR Station","FirstLast":[{"To":"A21","Time":["06:02","00:13"],"TrainType":1},{"To":"A1","Time":["06:02","23:16"],"TrainType":1}]},{"StationID":"A19","lat":25.002,"lon":25.002,"name":"桃園體育園區站","ename":"Taoyuan Sports Park Station","FirstLast":[{"To":"A21","Time":["06:05","00:16"],"TrainType":1},{"To":"A1","Time":["06:13","23:13"],"TrainType":1}]},{"StationID":"A20","lat":24.98,"lon":24.98,"name":"興南站","ename":"Xingnan Station","FirstLast":[{"To":"A21","Time":["06:10","00:21"],"TrainType":1},{"To":"A1","Time":["06:08","23:08"],"TrainType":1}]},{"StationID":"A21","lat":24.967,"lon":24.967,"name":"環北站","ename":"Huanbei Station","FirstLast":[{"To":"A1","Time":["06:05","23:05"],"TrainType":1}]}];

	var tmrt_station = [{"StationID":"103","lat":24.18228,"lon":24.18228,"name":"舊社","ename":"Jiushe","FirstLast":[{"To":"103a","Time":["06:07","00:29"]},{"To":"119","Time":["06:02","00:02"]}]},{"StationID":"103a","lat":24.18913,"lon":24.18913,"name":"北屯總站","ename":"Beitun Main Station","FirstLast":[{"To":"119","Time":["06:00","00:00"]}]},{"StationID":"104","lat":24.1808,"lon":24.1808,"name":"松竹","ename":"Songzhu","FirstLast":[{"To":"103a","Time":["06:04","00:27"]},{"To":"119","Time":["06:04","00:03"]}]},{"StationID":"105","lat":24.17124,"lon":24.17124,"name":"四維國小","ename":"Sihwei Elementary School","FirstLast":[{"To":"103a","Time":["06:00","00:25"]},{"To":"119","Time":["06:00","00:06"]}]},{"StationID":"106","lat":24.17219,"lon":24.17219,"name":"文心崇德","ename":"Wenxin Chongde","FirstLast":[{"To":"103a","Time":["06:09","00:23"]},{"To":"119","Time":["06:01","00:08"]}]},{"StationID":"107","lat":24.17368,"lon":24.17368,"name":"文心中清","ename":"Wenxin Zhongqing","FirstLast":[{"To":"103a","Time":["06:06","00:21"]},{"To":"119","Time":["06:03","00:10"]}]},{"StationID":"108","lat":24.17141,"lon":24.17141,"name":"文華高中","ename":"Wenhua Senior High School","FirstLast":[{"To":"103a","Time":["06:04","00:19"]},{"To":"119","Time":["06:05","00:12"]}]},{"StationID":"109","lat":24.16763,"lon":24.16763,"name":"文心櫻花","ename":"Wenxin Yinghua","FirstLast":[{"To":"103a","Time":["06:02","00:17"]},{"To":"119","Time":["06:07","00:13"]}]},{"StationID":"110","lat":24.16199,"lon":24.16199,"name":"市政府","ename":"Taichung City Hall","FirstLast":[{"To":"103a","Time":["06:00","00:16"]},{"To":"119","Time":["06:00","00:15"]}]},{"StationID":"111","lat":24.15311,"lon":24.15311,"name":"水安宮","ename":"Shui-an Temple","FirstLast":[{"To":"103a","Time":["06:07","00:14"]},{"To":"119","Time":["06:02","00:17"]}]},{"StationID":"112","lat":24.1454,"lon":24.1454,"name":"文心森林公園","ename":"Wenxin Forest Park","FirstLast":[{"To":"103a","Time":["06:06","00:12"]},{"To":"119","Time":["06:04","00:19"]}]},{"StationID":"113","lat":24.1405,"lon":24.1405,"name":"南屯","ename":"Nantun","FirstLast":[{"To":"103a","Time":["06:04","00:11"]},{"To":"119","Time":["06:05","00:20"]}]},{"StationID":"114","lat":24.1326,"lon":24.1326,"name":"豐樂公園","ename":"Feng-le Park","FirstLast":[{"To":"103a","Time":["06:02","00:09"]},{"To":"119","Time":["06:07","00:22"]}]},{"StationID":"115","lat":24.1191,"lon":24.1191,"name":"大慶","ename":"Daqing","FirstLast":[{"To":"103a","Time":["06:00","00:06"]},{"To":"119","Time":["06:00","00:25"]}]},{"StationID":"116","lat":24.1145,"lon":24.1145,"name":"九張犁","ename":"Jiuzhangli","FirstLast":[{"To":"103a","Time":["06:05","00:05"]},{"To":"119","Time":["06:02","00:26"]}]},{"StationID":"117","lat":24.11104,"lon":24.11104,"name":"九德","ename":"Jiude","FirstLast":[{"To":"103a","Time":["06:04","00:03"]},{"To":"119","Time":["06:05","00:28"]}]},{"StationID":"118","lat":24.1089,"lon":24.1089,"name":"烏日","ename":"Wuri","FirstLast":[{"To":"103a","Time":["06:02","00:02"]},{"To":"119","Time":["06:08","00:29"]}]},{"StationID":"119","lat":24.11011,"lon":24.11011,"name":"高鐵臺中站","ename":"HSR Taichung Station","FirstLast":[{"To":"103a","Time":["06:00","00:00"]}]}];

	var trtc_transfer = [{"FromLineID":"R","FromStationID":"R22","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R22","TransferTime":3,"name":"北投","ename":"Beitou"},{"FromLineID":"R","FromStationID":"R13","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O11","TransferTime":3,"name":"民權西路","ename":"Minzuan W. Rd."},{"FromLineID":"O","FromStationID":"O11","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R13","TransferTime":3,"name":"民權西路","ename":"Minzuan W. Rd."},{"FromLineID":"R","FromStationID":"R11","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G14","TransferTime":3,"name":"中山","ename":"Zhongshan"},{"FromLineID":"G","FromStationID":"G14","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R11","TransferTime":3,"name":"中山","ename":"Zhongshan"},{"FromLineID":"R","FromStationID":"R10","IsOnSiteTransfer":1,"ToLineID":"BL","ToStationID":"BL12","TransferTime":4,"name":"台北車站","ename":"Taipei Main Station"},{"FromLineID":"BL","FromStationID":"BL12","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R10","TransferTime":4,"name":"台北車站","ename":"Taipei Main Station"},{"FromLineID":"R","FromStationID":"R08","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G10","TransferTime":2,"name":"中正紀念堂","ename":"Chiang Kai-Shek Memorial Hall"},{"FromLineID":"G","FromStationID":"G10","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R08","TransferTime":2,"name":"中正紀念堂","ename":"Chiang Kai-Shek Memorial Hall"},{"FromLineID":"R","FromStationID":"R07","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O06","TransferTime":2,"name":"東門","ename":"Dongmen"},{"FromLineID":"O","FromStationID":"O06","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R07","TransferTime":2,"name":"東門","ename":"Dongmen"},{"FromLineID":"R","FromStationID":"R05","IsOnSiteTransfer":1,"ToLineID":"BR","ToStationID":"BR09","TransferTime":5,"name":"大安","ename":"Daan"},{"FromLineID":"BR","FromStationID":"BR09","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R05","TransferTime":5,"name":"大安","ename":"Daan"},{"FromLineID":"G","FromStationID":"G16","IsOnSiteTransfer":1,"ToLineID":"BR","ToStationID":"BR11","TransferTime":5,"name":"南京復興","ename":"Nanjing Fuxing"},{"FromLineID":"BR","FromStationID":"BR11","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G16","TransferTime":5,"name":"南京復興","ename":"Nanjing Fuxing"},{"FromLineID":"G","FromStationID":"G15","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O08","TransferTime":2,"name":"松江南京","ename":"Songliang Nanjing"},{"FromLineID":"O","FromStationID":"O08","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G15","TransferTime":2,"name":"松江南京","ename":"Songliang Nanjing"},{"FromLineID":"G","FromStationID":"G12","IsOnSiteTransfer":1,"ToLineID":"BL","ToStationID":"BL11","TransferTime":2,"name":"西門","ename":"Ximen"},{"FromLineID":"BL","FromStationID":"BL11","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G12","TransferTime":2,"name":"西門","ename":"Ximen"},{"FromLineID":"G","FromStationID":"G09","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O05","TransferTime":2,"name":"古亭","ename":"Guting"},{"FromLineID":"O","FromStationID":"O05","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G09","TransferTime":2,"name":"古亭","ename":"Guting"},{"FromLineID":"G","FromStationID":"G03","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G03","TransferTime":3,"name":"七張","ename":"Qizhang"},{"FromLineID":"O","FromStationID":"O12","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O12","TransferTime":1,"name":"大橋頭","ename":"Daqiaotou"},{"FromLineID":"O","FromStationID":"O07","IsOnSiteTransfer":1,"ToLineID":"BL","ToStationID":"BL14","TransferTime":2,"name":"忠孝新生","ename":"Zhongxiao Xinsheng"},{"FromLineID":"BL","FromStationID":"BL14","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O07","TransferTime":2,"name":"忠孝新生","ename":"Zhongxiao Xinsheng"},{"FromLineID":"BL","FromStationID":"BL23","IsOnSiteTransfer":1,"ToLineID":"BR","ToStationID":"BR24","TransferTime":5,"name":"南港展覽館","ename":"Taipei Nangang Exhibition Center"},{"FromLineID":"BR","FromStationID":"BR24","IsOnSiteTransfer":1,"ToLineID":"BL","ToStationID":"BL23","TransferTime":5,"name":"南港展覽館","ename":"Taipei Nangang Exhibition Center"},{"FromLineID":"BL","FromStationID":"BL15","IsOnSiteTransfer":1,"ToLineID":"BR","ToStationID":"BR10","TransferTime":5,"name":"忠孝復興","ename":"Zhongxiao Fuxing"},{"FromLineID":"BR","FromStationID":"BR10","IsOnSiteTransfer":1,"ToLineID":"BL","ToStationID":"BL15","TransferTime":5,"name":"忠孝復興","ename":"Zhongxiao Fuxing"}];

	var krtc_transfer = [{"FromLineID":"R","FromStationID":"R10","ToLineID":"O","ToStationID":"O5","TransferTime":3,"name":"美麗島","ename":"Formosa Boulevard"},{"FromLineID":"O","FromStationID":"O5","ToLineID":"R","ToStationID":"R10","TransferTime":3,"name":"美麗島","ename":"Formosa Boulevard"}];

	var thsr_station = [{"StationID":"0990","lat":25.05318832397461,"lon":121.60706329345703,"name":"南港","ename":"Nangang"},{"StationID":"1000","lat":25.047670364379883,"lon":121.51698303222656,"name":"台北","ename":"Taipei"},{"StationID":"1010","lat":25.013870239257812,"lon":121.46459197998047,"name":"板橋","ename":"Banciao"},{"StationID":"1020","lat":25.012861251831055,"lon":121.21472930908203,"name":"桃園","ename":"Taoyuan"},{"StationID":"1030","lat":24.808441162109375,"lon":121.0402603149414,"name":"新竹","ename":"Hsinchu"},{"StationID":"1035","lat":24.60544776916504,"lon":120.82527160644531,"name":"苗栗","ename":"Miaoli"},{"StationID":"1040","lat":24.112483978271484,"lon":120.615966796875,"name":"台中","ename":"Taichung"},{"StationID":"1043","lat":23.874326705932617,"lon":120.5746078491211,"name":"彰化","ename":"Changhua"},{"StationID":"1047","lat":23.736230850219727,"lon":120.41651153564453,"name":"雲林","ename":"Yunlin"},{"StationID":"1050","lat":23.45950698852539,"lon":120.32325744628906,"name":"嘉義","ename":"Chiayi"},{"StationID":"1060","lat":22.925077438354492,"lon":120.28620147705078,"name":"台南","ename":"Tainan"},{"StationID":"1070","lat":22.68739128112793,"lon":120.30748748779297,"name":"左營","ename":"Zuoying"}];

	var tra_line = [{"dir":0,"LineID":"YL","station":[{"name":"八堵","ID":"1002","TD":0},{"name":"暖暖","ID":"1802","TD":1.6},{"name":"四腳亭","ID":"1803","TD":3.9},{"name":"瑞芳","ID":"1804","TD":8.9},{"name":"侯硐","ID":"1805","TD":13.5},{"name":"三貂嶺","ID":"1806","TD":16},{"name":"牡丹","ID":"1807","TD":19.6},{"name":"雙溪","ID":"1808","TD":22.9},{"name":"貢寮","ID":"1809","TD":28.3},{"name":"福隆","ID":"1810","TD":32},{"name":"石城","ID":"1811","TD":37.4},{"name":"大里","ID":"1812","TD":40.1},{"name":"大溪","ID":"1813","TD":44.8},{"name":"龜山","ID":"1814","TD":49.4},{"name":"外澳","ID":"1815","TD":53},{"name":"頭城","ID":"1816","TD":56.6},{"name":"頂埔","ID":"1817","TD":58.8},{"name":"礁溪","ID":"1818","TD":62.9},{"name":"四城","ID":"1819","TD":67.6},{"name":"宜蘭","ID":"1820","TD":71.3},{"name":"二結","ID":"1821","TD":77.1},{"name":"中里","ID":"1822","TD":78.3},{"name":"羅東","ID":"1823","TD":80.1},{"name":"冬山","ID":"1824","TD":85.1},{"name":"新馬","ID":"1825","TD":89.3},{"name":"蘇澳新","ID":"1826","TD":90.2},{"name":"蘇澳","ID":"1827","TD":93.6}]},{"dir":0,"LineID":"NL","station":[{"name":"蘇澳新","ID":"1826","TD":0},{"name":"永樂","ID":"1703","TD":5.2},{"name":"東澳","ID":"1704","TD":11},{"name":"南澳","ID":"1705","TD":19},{"name":"武塔","ID":"1706","TD":22.7},{"name":"漢本","ID":"1708","TD":35.6},{"name":"和平","ID":"1709","TD":39.8},{"name":"和仁","ID":"1710","TD":47.5},{"name":"崇德","ID":"1711","TD":57.6},{"name":"新城","ID":"1712","TD":62.9},{"name":"景美","ID":"1713","TD":68.2},{"name":"北埔","ID":"1714","TD":74.7},{"name":"花蓮","ID":"1715","TD":79.2}]},{"dir":0,"LineID":"TT","station":[{"name":"花蓮","ID":"1715","TD":0},{"name":"吉安","ID":"1602","TD":3.4},{"name":"志學","ID":"1604","TD":12.4},{"name":"平和","ID":"1605","TD":15.3},{"name":"壽豐","ID":"1606","TD":17.2},{"name":"豐田","ID":"1607","TD":19.9},{"name":"南平","ID":"1609","TD":28.4},{"name":"鳳林","ID":"1610","TD":32.5},{"name":"萬榮","ID":"1611","TD":37.3},{"name":"光復","ID":"1612","TD":42.9},{"name":"大富","ID":"1613","TD":50.6},{"name":"富源","ID":"1614","TD":53.6},{"name":"瑞穗","ID":"1616","TD":62.9},{"name":"三民","ID":"1617","TD":72.1},{"name":"玉里","ID":"1619","TD":83.1},{"name":"東里","ID":"1621","TD":89.8},{"name":"東竹","ID":"1622","TD":95.7},{"name":"富里","ID":"1623","TD":101.9},{"name":"池上","ID":"1624","TD":108.8},{"name":"海端","ID":"1625","TD":114.4},{"name":"關山","ID":"1626","TD":120.9},{"name":"瑞和","ID":"1628","TD":128.3},{"name":"瑞源","ID":"1629","TD":131.1},{"name":"鹿野","ID":"1630","TD":136.6},{"name":"山里","ID":"1631","TD":142.6},{"name":"臺東","ID":"1632","TD":150.9}]},{"dir":0,"LineID":"PX","station":[{"name":"三貂嶺","ID":"1806","TD":0},{"name":"大華","ID":"1903","TD":3.5},{"name":"十分","ID":"1904","TD":6.4},{"name":"望古","ID":"1905","TD":8.2},{"name":"嶺腳","ID":"1906","TD":10.2},{"name":"平溪","ID":"1907","TD":11.2},{"name":"菁桐","ID":"1908","TD":12.9}]},{"dir":1,"LineID":"SA","station":[{"name":"瑞芳","ID":"1804","TD":0},{"name":"海科館","ID":"6103","TD":4.2}]},{"dir":0,"LineID":"NW","station":[{"name":"新竹","ID":"1025","TD":0},{"name":"北新竹","ID":"1024","TD":1.4},{"name":"千甲","ID":"2212","TD":3.6},{"name":"新莊","ID":"2213","TD":6.6},{"name":"竹中","ID":"2203","TD":7.9},{"name":"上員","ID":"2204","TD":10.5},{"name":"榮華","ID":"2211","TD":15},{"name":"竹東","ID":"2205","TD":16.6},{"name":"橫山","ID":"2206","TD":20},{"name":"九讚頭","ID":"2207","TD":22.2},{"name":"合興","ID":"2208","TD":24.4},{"name":"富貴","ID":"2209","TD":25.7},{"name":"內灣","ID":"2210","TD":27.9}]},{"dir":1,"LineID":"JJ","station":[{"name":"二水","ID":"1207","TD":0},{"name":"源泉","ID":"2702","TD":2.9},{"name":"濁水","ID":"2703","TD":10.8},{"name":"龍泉","ID":"2704","TD":15.7},{"name":"集集","ID":"2705","TD":20.1},{"name":"水里","ID":"2706","TD":27.4},{"name":"車埕","ID":"2707","TD":29.7}]},{"dir":1,"LineID":"SH","station":[{"name":"中洲","ID":"1230","TD":0},{"name":"長榮大學","ID":"5101","TD":2.6},{"name":"沙崙","ID":"5102","TD":5.3}]},{"dir":0,"LineID":"LJ","station":[{"name":"竹中","ID":"2203","TD":0},{"name":"六家","ID":"2214","TD":3.1}]},{"dir":0,"LineID":"CZ","station":[{"name":"成功","ID":"1321","TD":0},{"name":"追分","ID":"1118","TD":2.2}]},{"dir":1,"LineID":"TL-N","station":[{"name":"基隆","ID":"1001","TD":0},{"name":"三坑","ID":"1029","TD":1.3},{"name":"八堵","ID":"1002","TD":3.7},{"name":"七堵","ID":"1003","TD":6},{"name":"百福","ID":"1030","TD":8.7},{"name":"五堵","ID":"1004","TD":11.7},{"name":"汐止","ID":"1005","TD":13.1},{"name":"汐科","ID":"1031","TD":14.6},{"name":"南港","ID":"1006","TD":19.1},{"name":"松山","ID":"1007","TD":21.9},{"name":"臺北","ID":"1008","TD":28.3},{"name":"萬華","ID":"1009","TD":31.1},{"name":"板橋","ID":"1011","TD":35.5},{"name":"浮洲","ID":"1032","TD":38},{"name":"樹林","ID":"1012","TD":40.9},{"name":"山佳","ID":"1013","TD":44.8},{"name":"鶯歌","ID":"1014","TD":49.2},{"name":"桃園","ID":"1015","TD":57.4},{"name":"內壢","ID":"1016","TD":63.3},{"name":"中壢","ID":"1017","TD":67.3},{"name":"埔心","ID":"1018","TD":73.1},{"name":"楊梅","ID":"1019","TD":77.1},{"name":"富岡","ID":"1020","TD":83.9},{"name":"北湖","ID":"1033","TD":87.1},{"name":"湖口","ID":"1021","TD":89.6},{"name":"新豐","ID":"1022","TD":95.8},{"name":"竹北","ID":"1023","TD":100.6},{"name":"北新竹","ID":"1024","TD":105},{"name":"新竹","ID":"1025","TD":106.4},{"name":"三姓橋","ID":"1035","TD":111.2},{"name":"香山","ID":"1026","TD":114.4},{"name":"崎頂","ID":"1027","TD":120.8},{"name":"竹南","ID":"1028","TD":125.4}]},{"dir":1,"LineID":"TL-M","station":[{"name":"竹南","ID":"1028","TD":0},{"name":"造橋","ID":"1302","TD":5.3},{"name":"豐富","ID":"1304","TD":11.7},{"name":"苗栗","ID":"1305","TD":15.2},{"name":"南勢","ID":"1307","TD":21.8},{"name":"銅鑼","ID":"1308","TD":26},{"name":"三義","ID":"1310","TD":33.4},{"name":"泰安","ID":"1314","TD":44.3},{"name":"后里","ID":"1315","TD":46.9},{"name":"豐原","ID":"1317","TD":53.7},{"name":"潭子","ID":"1318","TD":58.7},{"name":"太原","ID":"1323","TD":63.8},{"name":"臺中","ID":"1319","TD":67.9},{"name":"大慶","ID":"1322","TD":72.1},{"name":"烏日","ID":"1320","TD":75.1},{"name":"新烏日","ID":"1324","TD":75.9},{"name":"成功","ID":"1321","TD":78.4},{"name":"彰化","ID":"1120","TD":85.5}]},{"dir":1,"LineID":"TL-C","station":[{"name":"竹南","ID":"1028","TD":0},{"name":"談文","ID":"1102","TD":4.5},{"name":"大山","ID":"1104","TD":11.2},{"name":"後龍","ID":"1105","TD":15},{"name":"龍港","ID":"1106","TD":18.6},{"name":"白沙屯","ID":"1107","TD":26.7},{"name":"新埔","ID":"1108","TD":29.8},{"name":"通霄","ID":"1109","TD":35.6},{"name":"苑裡","ID":"1110","TD":41.7},{"name":"日南","ID":"1111","TD":49.4},{"name":"大甲","ID":"1112","TD":54},{"name":"臺中港","ID":"1113","TD":59.3},{"name":"清水","ID":"1114","TD":65.3},{"name":"沙鹿","ID":"1115","TD":68.5},{"name":"龍井","ID":"1116","TD":73.1},{"name":"大肚","ID":"1117","TD":78.1},{"name":"追分","ID":"1118","TD":83.1},{"name":"彰化","ID":"1120","TD":90.2}]},{"dir":1,"LineID":"TL-S","station":[{"name":"彰化","ID":"1120","TD":0},{"name":"花壇","ID":"1202","TD":6.6},{"name":"大村","ID":"1240","TD":11.2},{"name":"員林","ID":"1203","TD":14.7},{"name":"永靖","ID":"1204","TD":18.2},{"name":"社頭","ID":"1205","TD":21.9},{"name":"田中","ID":"1206","TD":26.2},{"name":"二水","ID":"1207","TD":32},{"name":"林內","ID":"1208","TD":40.1},{"name":"石榴","ID":"1209","TD":44.9},{"name":"斗六","ID":"1210","TD":49.7},{"name":"斗南","ID":"1211","TD":57.3},{"name":"石龜","ID":"1212","TD":61.2},{"name":"大林","ID":"1213","TD":65.8},{"name":"民雄","ID":"1214","TD":71.6},{"name":"嘉北","ID":"1241","TD":78.3},{"name":"嘉義","ID":"1215","TD":80.9},{"name":"水上","ID":"1217","TD":87.5},{"name":"南靖","ID":"1218","TD":90.1},{"name":"後壁","ID":"1219","TD":96.1},{"name":"新營","ID":"1220","TD":103.8},{"name":"柳營","ID":"1221","TD":107.1},{"name":"林鳳營","ID":"1222","TD":111},{"name":"隆田","ID":"1223","TD":116.5},{"name":"拔林","ID":"1224","TD":118.7},{"name":"善化","ID":"1225","TD":123.3},{"name":"南科","ID":"1244","TD":126.2},{"name":"新市","ID":"1226","TD":130.9},{"name":"永康","ID":"1227","TD":135.9},{"name":"大橋","ID":"1239","TD":139.6},{"name":"臺南","ID":"1228","TD":142.3},{"name":"保安","ID":"1229","TD":149.9},{"name":"仁德","ID":"1243","TD":151.3},{"name":"中洲","ID":"1230","TD":153.9},{"name":"大湖","ID":"1231","TD":156.8},{"name":"路竹","ID":"1232","TD":159.7},{"name":"岡山","ID":"1233","TD":167.5},{"name":"橋頭","ID":"1234","TD":171.1},{"name":"楠梓","ID":"1235","TD":175.3},{"name":"新左營","ID":"1242","TD":180.4},{"name":"左營","ID":"1236","TD":182.3},{"name":"高雄","ID":"1238","TD":188.9}]},{"dir":1,"LineID":"PL","station":[{"name":"高雄","ID":"1238","TD":0},{"name":"鳳山","ID":"1402","TD":5.8},{"name":"後庄","ID":"1403","TD":9.5},{"name":"九曲堂","ID":"1404","TD":13.8},{"name":"六塊厝","ID":"1405","TD":18.8},{"name":"屏東","ID":"1406","TD":21},{"name":"歸來","ID":"1407","TD":23.6},{"name":"麟洛","ID":"1408","TD":25.9},{"name":"西勢","ID":"1409","TD":28.3},{"name":"竹田","ID":"1410","TD":32},{"name":"潮州","ID":"1411","TD":36.1},{"name":"崁頂","ID":"1412","TD":40.9},{"name":"南州","ID":"1413","TD":43.3},{"name":"鎮安","ID":"1414","TD":46.9},{"name":"林邊","ID":"1415","TD":50.1},{"name":"佳冬","ID":"1416","TD":54.1},{"name":"東海","ID":"1417","TD":57.2},{"name":"枋寮","ID":"1418","TD":61.3}]},{"dir":1,"LineID":"SL","station":[{"name":"枋寮","ID":"1418","TD":0},{"name":"加祿","ID":"1502","TD":5.3},{"name":"內獅","ID":"1503","TD":8.7},{"name":"枋山","ID":"1504","TD":13.6},{"name":"古莊","ID":"1507","TD":40.5},{"name":"大武","ID":"1508","TD":43.8},{"name":"瀧溪","ID":"1510","TD":55.5},{"name":"金崙","ID":"1512","TD":63.9},{"name":"太麻里","ID":"1514","TD":74.9},{"name":"知本","ID":"1516","TD":86.6},{"name":"康樂","ID":"1517","TD":93.6},{"name":"臺東","ID":"1632","TD":98.2}]}];

	var tra_station = [{"StationID":"4102","name":"樹調","ename":"ShuDiao"},{"StationID":"1632","lat":22.793711,"lon":121.123175,"name":"臺東","ename":"Taitung"},{"StationID":"1631","lat":22.862046,"lon":121.138031,"name":"山里","ename":"Shanli"},{"StationID":"1630","lat":22.912469,"lon":121.137004,"name":"鹿野","ename":"Luye"},{"StationID":"1629","lat":22.955978,"lon":121.159014,"name":"瑞源","ename":"Ruiyuan"},{"StationID":"1628","lat":22.979968,"lon":121.15579,"name":"瑞和","ename":"Ruihe"},{"StationID":"1626","lat":23.045665,"lon":121.164373,"name":"關山","ename":"Guanshan"},{"StationID":"1625","lat":23.102934,"lon":121.176829,"name":"海端","ename":"Haiduan"},{"StationID":"1624","lat":23.126158,"lon":121.21939,"name":"池上","ename":"Chishang"},{"StationID":"1623","lat":23.179132,"lon":121.248692,"name":"富里","ename":"Fuli"},{"StationID":"1622","lat":23.226025,"lon":121.278481,"name":"東竹","ename":"Dongzhu"},{"StationID":"1621","lat":23.272309,"lon":121.304181,"name":"東里","ename":"Dongli"},{"StationID":"1619","lat":23.331518,"lon":121.311726,"name":"玉里","ename":"Yuli"},{"StationID":"1617","lat":23.424766,"lon":121.345344,"name":"三民","ename":"Sanmin"},{"StationID":"1616","lat":23.497376,"lon":121.376841,"name":"瑞穗","ename":"Ruisui"},{"StationID":"1614","lat":23.580268,"lon":121.380122,"name":"富源","ename":"Fuyuan"},{"StationID":"1613","lat":23.605688,"lon":121.389624,"name":"大富","ename":"Dafu"},{"StationID":"1612","lat":23.666293,"lon":121.421168,"name":"光復","ename":"Guangfu"},{"StationID":"1611","lat":23.711978,"lon":121.419067,"name":"萬榮","ename":"Wanrong"},{"StationID":"1610","lat":23.74634,"lon":121.447024,"name":"鳳林","ename":"Fenglin"},{"StationID":"1609","lat":23.782276,"lon":121.45828,"name":"南平","ename":"Nanping"},{"StationID":"1608","lat":23.802587,"lon":121.462015,"name":"林榮新光","ename":"Linrong Shin Kong"},{"StationID":"1607","lat":23.848475,"lon":121.496168,"name":"豐田","ename":"Fengtian"},{"StationID":"1606","lat":23.869016,"lon":121.510633,"name":"壽豐","ename":"Shoufeng"},{"StationID":"1605","lat":23.882774,"lon":121.520485,"name":"平和","ename":"Pinghe"},{"StationID":"1604","lat":23.907494,"lon":121.529437,"name":"志學","ename":"Zhixue"},{"StationID":"1602","lat":23.968179,"lon":121.582699,"name":"吉安","ename":"Jian"},{"StationID":"1715","lat":23.992868,"lon":121.600993,"name":"花蓮","ename":"Hualien"},{"StationID":"1714","lat":24.032533,"lon":121.601671,"name":"北埔","ename":"Beipu"},{"StationID":"1713","lat":24.090317,"lon":121.610786,"name":"景美","ename":"Jingmei"},{"StationID":"1712","lat":24.127524,"lon":121.640866,"name":"新城","ename":"Xincheng"},{"StationID":"1711","lat":24.172116,"lon":121.655498,"name":"崇德","ename":"Chongde"},{"StationID":"1710","lat":24.242199,"lon":121.711749,"name":"和仁","ename":"Heren"},{"StationID":"1709","lat":24.298296,"lon":121.753346,"name":"和平","ename":"Heping"},{"StationID":"1708","lat":24.335428,"lon":121.768355,"name":"漢本","ename":"Hanben"},{"StationID":"1706","lat":24.448674,"lon":121.776037,"name":"武塔","ename":"Wuta"},{"StationID":"1705","lat":24.463396,"lon":121.800926,"name":"南澳","ename":"Nanao"},{"StationID":"1704","lat":24.518221,"lon":121.830683,"name":"東澳","ename":"Dongao"},{"StationID":"1703","lat":24.568417,"lon":121.844564,"name":"永樂","ename":"Yongle"},{"StationID":"1827","lat":24.595181,"lon":121.85144,"name":"蘇澳","ename":"Suao"},{"StationID":"1826","lat":24.609024,"lon":121.82703,"name":"蘇澳新","ename":"Suaoxin"},{"StationID":"1825","lat":24.615395,"lon":121.8229,"name":"新馬","ename":"Xinma"},{"StationID":"1824","lat":24.636726,"lon":121.792246,"name":"冬山","ename":"Dongshan"},{"StationID":"1823","lat":24.677929,"lon":121.774629,"name":"羅東","ename":"Luodong"},{"StationID":"1822","lat":24.694192,"lon":121.775163,"name":"中里","ename":"Zhongli"},{"StationID":"1821","lat":24.705267,"lon":121.774131,"name":"二結","ename":"Erjie"},{"StationID":"1820","lat":24.754512,"lon":121.758253,"name":"宜蘭","ename":"Yilan"},{"StationID":"1819","lat":24.786802,"lon":121.762727,"name":"四城","ename":"Sicheng"},{"StationID":"1818","lat":24.827034,"lon":121.775354,"name":"礁溪","ename":"Jiaoxi"},{"StationID":"1817","lat":24.843998,"lon":121.809207,"name":"頂埔","ename":"Dingpu"},{"StationID":"1816","lat":24.858976,"lon":121.822556,"name":"頭城","ename":"Toucheng"},{"StationID":"1815","lat":24.883703,"lon":121.845758,"name":"外澳","ename":"Waiao"},{"StationID":"1814","lat":24.904818,"lon":121.868878,"name":"龜山","ename":"Guishan"},{"StationID":"1813","lat":24.938423,"lon":121.889873,"name":"大溪","ename":"Daxi"},{"StationID":"1812","lat":24.966799,"lon":121.922496,"name":"大里","ename":"Dali"},{"StationID":"1811","lat":24.978334,"lon":121.945191,"name":"石城","ename":"Shicheng"},{"StationID":"1810","lat":25.015893,"lon":121.944659,"name":"福隆","ename":"Fulong"},{"StationID":"1809","lat":25.022044,"lon":121.908703,"name":"貢寮","ename":"Gongliao"},{"StationID":"1808","lat":25.038544,"lon":121.866548,"name":"雙溪","ename":"Shuangxi"},{"StationID":"1807","lat":25.058738,"lon":121.851977,"name":"牡丹","ename":"Mudan"},{"StationID":"1806","lat":25.065544,"lon":121.822559,"name":"三貂嶺","ename":"Sandiaoling"},{"StationID":"1805","lat":25.087009,"lon":121.827424,"name":"侯硐","ename":"Houtong"},{"StationID":"1804","lat":25.108928,"lon":121.806149,"name":"瑞芳","ename":"Ruifang"},{"StationID":"1803","lat":25.102751,"lon":121.761887,"name":"四腳亭","ename":"Sijiaoting"},{"StationID":"1802","lat":25.102282,"lon":121.740329,"name":"暖暖","ename":"Nuannuan"},{"StationID":"1001","lat":25.131598,"lon":121.738366,"name":"基隆","ename":"Keelung"},{"StationID":"1002","lat":25.108392,"lon":121.729049,"name":"八堵","ename":"Badu"},{"StationID":"1003","lat":25.093359,"lon":121.713868,"name":"七堵","ename":"Qidu"},{"StationID":"1004","lat":25.078,"lon":121.667701,"name":"五堵","ename":"Wudu"},{"StationID":"1005","lat":25.068224,"lon":121.661757,"name":"汐止","ename":"Xizhi"},{"StationID":"1006","lat":25.05314,"lon":121.607019,"name":"南港","ename":"Nangang"},{"StationID":"1007","lat":25.04933,"lon":121.577965,"name":"松山","ename":"Songshan"},{"StationID":"1008","lat":25.047503,"lon":121.517047,"name":"臺北","ename":"Taipei"},{"StationID":"1009","lat":25.03335,"lon":121.500331,"name":"萬華","ename":"Wanhua"},{"StationID":"1011","lat":25.014399,"lon":121.463497,"name":"板橋","ename":"Banqiao"},{"StationID":"1012","lat":24.991348,"lon":121.424564,"name":"樹林","ename":"Shulin"},{"StationID":"1013","lat":24.972482,"lon":121.392657,"name":"山佳","ename":"Shanjia"},{"StationID":"1014","lat":24.954532,"lon":121.355125,"name":"鶯歌","ename":"Yingge"},{"StationID":"1015","lat":24.989209,"lon":121.313499,"name":"桃園","ename":"Taoyuan"},{"StationID":"1016","lat":24.972797,"lon":121.258258,"name":"內壢","ename":"Neili"},{"StationID":"1017","lat":24.953666,"lon":121.225798,"name":"中壢","ename":"Zhongli"},{"StationID":"1018","lat":24.919951,"lon":121.183827,"name":"埔心","ename":"Puxin"},{"StationID":"1019","lat":24.914346,"lon":121.146405,"name":"楊梅","ename":"Yangmei"},{"StationID":"1020","lat":24.934273,"lon":121.083019,"name":"富岡","ename":"Fugang"},{"StationID":"1021","lat":24.903029,"lon":121.044009,"name":"湖口","ename":"Hukou"},{"StationID":"1022","lat":24.869228,"lon":120.99634,"name":"新豐","ename":"Xinfeng"},{"StationID":"1023","lat":24.839283,"lon":121.009376,"name":"竹北","ename":"Zhubei"},{"StationID":"1025","lat":24.801637,"lon":120.971627,"name":"新竹","ename":"Hsinchu"},{"StationID":"1026","lat":24.763121,"lon":120.91389,"name":"香山","ename":"Xiangshan"},{"StationID":"1027","lat":24.722782,"lon":120.87179,"name":"崎頂","ename":"Qiding"},{"StationID":"1028","lat":24.686562,"lon":120.880888,"name":"竹南","ename":"Zhunan"},{"StationID":"1102","lat":24.656414,"lon":120.858241,"name":"談文","ename":"Tanwen"},{"StationID":"1104","lat":24.645645,"lon":120.803778,"name":"大山","ename":"Dashan"},{"StationID":"1105","lat":24.616212,"lon":120.787307,"name":"後龍","ename":"Houlong"},{"StationID":"1106","lat":24.611683,"lon":120.758142,"name":"龍港","ename":"Longgang"},{"StationID":"1107","lat":24.564797,"lon":120.708198,"name":"白沙屯","ename":"Baishatun"},{"StationID":"1108","lat":24.54018,"lon":120.695179,"name":"新埔","ename":"Xinpu"},{"StationID":"1109","lat":24.491403,"lon":120.678425,"name":"通霄","ename":"Tongxiao"},{"StationID":"1110","lat":24.443426,"lon":120.651494,"name":"苑裡","ename":"Yuanli"},{"StationID":"1111","lat":24.378066,"lon":120.654119,"name":"日南","ename":"Rinan"},{"StationID":"1112","lat":24.34443,"lon":120.627017,"name":"大甲","ename":"Dajia"},{"StationID":"1113","lat":24.304366,"lon":120.602297,"name":"臺中港","ename":"Taichung Port"},{"StationID":"1114","lat":24.263624,"lon":120.569178,"name":"清水","ename":"Qingshui"},{"StationID":"1115","lat":24.237044,"lon":120.557627,"name":"沙鹿","ename":"Shalu"},{"StationID":"1116","lat":24.197444,"lon":120.543371,"name":"龍井","ename":"Longjing"},{"StationID":"1117","lat":24.154024,"lon":120.542536,"name":"大肚","ename":"Dadu"},{"StationID":"1118","lat":24.120613,"lon":120.570158,"name":"追分","ename":"Zhuifen"},{"StationID":"1302","lat":24.641439,"lon":120.867051,"name":"造橋","ename":"Zaoqiao"},{"StationID":"1305","lat":24.570036,"lon":120.822319,"name":"苗栗","ename":"Miaoli"},{"StationID":"1307","lat":24.522509,"lon":120.791571,"name":"南勢","ename":"Nanshi"},{"StationID":"1308","lat":24.48634,"lon":120.786173,"name":"銅鑼","ename":"Tongluo"},{"StationID":"1310","lat":24.42062,"lon":120.773931,"name":"三義","ename":"Sanyi"},{"StationID":"1314","lat":24.331292,"lon":120.741816,"name":"泰安","ename":"Taian"},{"StationID":"1315","lat":24.309312,"lon":120.732893,"name":"后里","ename":"Houli"},{"StationID":"1317","lat":24.254111,"lon":120.723447,"name":"豐原","ename":"Fengyuan"},{"StationID":"1318","lat":24.212802,"lon":120.705947,"name":"潭子","ename":"Tanzi"},{"StationID":"1319","lat":24.136955,"lon":120.686827,"name":"臺中","ename":"Taichung"},{"StationID":"1320","lat":24.108692,"lon":120.622472,"name":"烏日","ename":"Wuri"},{"StationID":"1321","lat":24.114232,"lon":120.590164,"name":"成功","ename":"Chenggong"},{"StationID":"1120","lat":24.081666,"lon":120.538539,"name":"彰化","ename":"Changhua"},{"StationID":"1202","lat":24.024997,"lon":120.5374,"name":"花壇","ename":"Huatan"},{"StationID":"1203","lat":23.959258,"lon":120.56965,"name":"員林","ename":"Yuanlin"},{"StationID":"1204","lat":23.928148,"lon":120.571672,"name":"永靖","ename":"Yongjing"},{"StationID":"1205","lat":23.89571,"lon":120.5808,"name":"社頭","ename":"Shetou"},{"StationID":"1206","lat":23.858503,"lon":120.591396,"name":"田中","ename":"Tianzhong"},{"StationID":"1207","lat":23.81315,"lon":120.618115,"name":"二水","ename":"Ershui"},{"StationID":"1208","lat":23.759681,"lon":120.614987,"name":"林內","ename":"Linnei"},{"StationID":"1209","lat":23.731643,"lon":120.579973,"name":"石榴","ename":"Shiliu"},{"StationID":"1210","lat":23.711813,"lon":120.541146,"name":"斗六","ename":"Douliu"},{"StationID":"1211","lat":23.672972,"lon":120.480841,"name":"斗南","ename":"Dounan"},{"StationID":"1212","lat":23.639568,"lon":120.471007,"name":"石龜","ename":"Shigui"},{"StationID":"1213","lat":23.601076,"lon":120.455839,"name":"大林","ename":"Dalin"},{"StationID":"1214","lat":23.555039,"lon":120.431651,"name":"民雄","ename":"Minxiong"},{"StationID":"1215","lat":23.479139,"lon":120.441026,"name":"嘉義","ename":"Chiayi"},{"StationID":"1217","lat":23.433995,"lon":120.399665,"name":"水上","ename":"Shuishang"},{"StationID":"1218","lat":23.41345,"lon":120.386544,"name":"南靖","ename":"Nanjing"},{"StationID":"1219","lat":23.36629,"lon":120.360517,"name":"後壁","ename":"Houbi"},{"StationID":"1220","lat":23.306732,"lon":120.323055,"name":"新營","ename":"Xinying"},{"StationID":"1221","lat":23.277737,"lon":120.322304,"name":"柳營","ename":"Liuying"},{"StationID":"1222","lat":23.24259,"lon":120.32093,"name":"林鳳營","ename":"Linfengying"},{"StationID":"1223","lat":23.192699,"lon":120.31929,"name":"隆田","ename":"Longtian"},{"StationID":"1224","lat":23.172622,"lon":120.32133,"name":"拔林","ename":"Balin"},{"StationID":"1225","lat":23.133323,"lon":120.306551,"name":"善化","ename":"Shanhua"},{"StationID":"1226","lat":23.06823,"lon":120.290035,"name":"新市","ename":"Xinshi"},{"StationID":"1227","lat":23.038338,"lon":120.253524,"name":"永康","ename":"Yongkang"},{"StationID":"1228","lat":22.997144,"lon":120.212966,"name":"臺南","ename":"Tainan"},{"StationID":"1229","lat":22.93294,"lon":120.231594,"name":"保安","ename":"Baoan"},{"StationID":"1230","lat":22.904544,"lon":120.2527,"name":"中洲","ename":"Zhongzhou"},{"StationID":"1231","lat":22.878228,"lon":120.253934,"name":"大湖","ename":"Dahu"},{"StationID":"1232","lat":22.853948,"lon":120.266275,"name":"路竹","ename":"Luzhu"},{"StationID":"1233","lat":22.792355,"lon":120.299933,"name":"岡山","ename":"Gangshan"},{"StationID":"1234","lat":22.760994,"lon":120.310334,"name":"橋頭","ename":"Qiaotou"},{"StationID":"1235","lat":22.727035,"lon":120.324371,"name":"楠梓","ename":"Nanzi"},{"StationID":"1236","lat":22.675204,"lon":120.294793,"name":"左營","ename":"Zuoying"},{"StationID":"1238","lat":22.63962,"lon":120.302111,"name":"高雄","ename":"Kaohsiung"},{"StationID":"1402","lat":22.631284,"lon":120.357683,"name":"鳳山","ename":"Fengshan"},{"StationID":"1403","lat":22.640067,"lon":120.391125,"name":"後庄","ename":"Houzhuang"},{"StationID":"1404","lat":22.656423,"lon":120.420879,"name":"九曲堂","ename":"Jiuqutang"},{"StationID":"1405","lat":22.666252,"lon":120.464873,"name":"六塊厝","ename":"Liukuaicuo"},{"StationID":"1406","lat":22.669306,"lon":120.486203,"name":"屏東","ename":"Pingtung"},{"StationID":"1407","lat":22.65238,"lon":120.502941,"name":"歸來","ename":"Guilai"},{"StationID":"1408","lat":22.634849,"lon":120.514378,"name":"麟洛","ename":"Linluo"},{"StationID":"1409","lat":22.616433,"lon":120.526697,"name":"西勢","ename":"Xishi"},{"StationID":"1410","lat":22.586491,"lon":120.540002,"name":"竹田","ename":"Zhutian"},{"StationID":"1411","lat":22.550086,"lon":120.53642,"name":"潮州","ename":"Chaozhou"},{"StationID":"1412","lat":22.51306,"lon":120.514765,"name":"崁頂","ename":"Kanding"},{"StationID":"1413","lat":22.492058,"lon":120.511738,"name":"南州","ename":"Nanzhou"},{"StationID":"1414","lat":22.457984,"lon":120.511356,"name":"鎮安","ename":"Zhenan"},{"StationID":"1415","lat":22.431406,"lon":120.515376,"name":"林邊","ename":"Linbian"},{"StationID":"1416","lat":22.414087,"lon":120.547742,"name":"佳冬","ename":"Jiadong"},{"StationID":"1417","lat":22.399005,"lon":120.572381,"name":"東海","ename":"Donghai"},{"StationID":"1418","lat":22.368019,"lon":120.595098,"name":"枋寮","ename":"Fangliao"},{"StationID":"1502","lat":22.330971,"lon":120.624621,"name":"加祿","ename":"Jialu"},{"StationID":"1503","lat":22.306184,"lon":120.643492,"name":"內獅","ename":"Neishi"},{"StationID":"1504","lat":22.267067,"lon":120.659647,"name":"枋山","ename":"Fangshan"},{"StationID":"1505","lat":22.280818,"lon":120.717243,"name":"枋野","ename":"Fangye"},{"StationID":"1507","lat":22.345509,"lon":120.878079,"name":"古莊","ename":"Guzhuang"},{"StationID":"1508","lat":22.365206,"lon":120.900713,"name":"大武","ename":"Dawu"},{"StationID":"1510","lat":22.46104,"lon":120.941771,"name":"瀧溪","ename":"Longxi"},{"StationID":"1512","lat":22.531488,"lon":120.967239,"name":"金崙","ename":"Jinlun"},{"StationID":"1514","lat":22.614936,"lon":120.993368,"name":"太麻里","ename":"Taimali"},{"StationID":"1516","lat":22.710182,"lon":121.060744,"name":"知本","ename":"Zhiben"},{"StationID":"1517","lat":22.764277,"lon":121.09356,"name":"康樂","ename":"Kangle"},{"StationID":"1322","lat":24.119304,"lon":120.648571,"name":"大慶","ename":"Daqing"},{"StationID":"1029","lat":25.123081,"lon":121.742009,"name":"三坑","ename":"Sankeng"},{"StationID":"1323","lat":24.163634,"lon":120.699717,"name":"太原","ename":"Taiyuan"},{"StationID":"1239","lat":23.019399,"lon":120.22442,"name":"大橋","ename":"Daqiao"},{"StationID":"1240","lat":23.990053,"lon":120.560645,"name":"大村","ename":"Dacun"},{"StationID":"1241","lat":23.499897,"lon":120.448503,"name":"嘉北","ename":"Jiabei"},{"StationID":"1903","lat":25.049758,"lon":121.797929,"name":"大華","ename":"Dahua"},{"StationID":"1904","lat":25.040991,"lon":121.775229,"name":"十分","ename":"Shifen"},{"StationID":"1905","lat":25.03454,"lon":121.763782,"name":"望古","ename":"Wanggu"},{"StationID":"1906","lat":25.030138,"lon":121.748102,"name":"嶺腳","ename":"Lingjiao"},{"StationID":"1907","lat":25.025633,"lon":121.739984,"name":"平溪","ename":"Pingxi"},{"StationID":"1908","lat":25.023918,"lon":121.723649,"name":"菁桐","ename":"Jingtong"},{"StationID":"1024","lat":24.808746,"lon":120.98367,"name":"北新竹","ename":"North Hsinchu"},{"StationID":"2212","lat":24.806662,"lon":121.003273,"name":"千甲","ename":"Qianjia"},{"StationID":"2213","lat":24.788176,"lon":121.022122,"name":"新莊","ename":"Xinzhuang"},{"StationID":"2214","lat":24.807655,"lon":121.039417,"name":"六家","ename":"Liujia"},{"StationID":"2203","lat":24.781358,"lon":121.031306,"name":"竹中","ename":"Zhuzhong"},{"StationID":"2204","lat":24.77789,"lon":121.055725,"name":"上員","ename":"Shangyuan"},{"StationID":"2205","lat":24.738257,"lon":121.0949,"name":"竹東","ename":"Zhudong"},{"StationID":"2206","lat":24.72056,"lon":121.11645,"name":"橫山","ename":"Hengshan"},{"StationID":"2207","lat":24.720599,"lon":121.13602,"name":"九讚頭","ename":"Jiuzantou"},{"StationID":"2208","lat":24.716746,"lon":121.154403,"name":"合興","ename":"Hexing"},{"StationID":"2209","lat":24.715559,"lon":121.167377,"name":"富貴","ename":"Fugui"},{"StationID":"2210","lat":24.705317,"lon":121.182325,"name":"內灣","ename":"Neiwan"},{"StationID":"2211","lat":24.74839,"lon":121.083399,"name":"榮華","ename":"Ronghua"},{"StationID":"2702","lat":23.798445,"lon":120.642034,"name":"源泉","ename":"Yuanquan"},{"StationID":"2703","lat":23.834666,"lon":120.70472,"name":"濁水","ename":"Zhuoshui"},{"StationID":"2704","lat":23.835188,"lon":120.750404,"name":"龍泉","ename":"Longquan"},{"StationID":"2705","lat":23.826451,"lon":120.784891,"name":"集集","ename":"Jiji"},{"StationID":"2706","lat":23.818456,"lon":120.853323,"name":"水里","ename":"Shuili"},{"StationID":"2707","lat":23.832637,"lon":120.865745,"name":"車埕","ename":"Checheng"},{"StationID":"3202","lat":23.994013,"lon":121.636083,"name":"花蓮港","ename":"hualien Port"},{"StationID":"1030","lat":25.077927,"lon":121.693869,"name":"百福","ename":"Baifu"},{"StationID":"1031","lat":25.062626,"lon":121.646584,"name":"汐科","ename":"Xike"},{"StationID":"1032","lat":25.004184,"lon":121.444649,"name":"浮洲","ename":"Fuzhou"},{"StationID":"1034","lat":24.980485,"lon":121.408796,"name":"南樹林","ename":"South Shulin"},{"StationID":"1036","lat":24.931239,"lon":121.066512,"name":"新富","ename":"Xinfu Station"},{"StationID":"1033","lat":24.922207,"lon":121.055671,"name":"北湖","ename":"BeihuChina University of Technology"},{"StationID":"1035","lat":24.78755,"lon":120.928937,"name":"三姓橋","ename":"Sanxingqiao"},{"StationID":"1304","lat":24.604417,"lon":120.826115,"name":"豐富","ename":"Fengfu"},{"StationID":"1325","name":"栗林","ename":"Lilin"},{"StationID":"1326","name":"頭家厝","ename":"Toujiacuo"},{"StationID":"1327","name":"松竹","ename":"Songzhu"},{"StationID":"1328","name":"精武","ename":"Jingwu"},{"StationID":"1329","lat":24.129105,"lon":120.666833,"name":"五權","ename":"Wuquan"},{"StationID":"1324","lat":24.109851,"lon":120.614309,"name":"新烏日","ename":"Xinwuri"},{"StationID":"1243","lat":22.923682,"lon":120.240609,"name":"仁德","ename":"Rende"},{"StationID":"1244","lat":23.107602,"lon":120.301996,"name":"南科","ename":"Nanke"},{"StationID":"5101","lat":22.907187,"lon":120.272176,"name":"長榮大學","ename":"CJCU"},{"StationID":"5102","lat":22.923953,"lon":120.286371,"name":"沙崙","ename":"Shalun"},{"StationID":"1242","lat":22.687544,"lon":120.306788,"name":"新左營","ename":"Xinzuoying"},{"StationID":"6103","lat":25.137706,"lon":121.800023,"name":"海科館","ename":"NMMST"},{"StationID":"2003","lat":25.135392,"lon":121.803199,"name":"八斗子","ename":"Badouzi"},{"StationID":"1245","lat":22.665959,"lon":120.287059,"name":"內惟","ename":"Neiwei"},{"StationID":"1246","lat":22.652737,"lon":120.281489,"name":"美術館","ename":"Museum of Fine Arts"},{"StationID":"1237","lat":22.639895,"lon":120.281328,"name":"鼓山","ename":"Gushan"},{"StationID":"1247","name":"三塊厝","ename":"Sankuaicuo"},{"StationID":"1419","name":"民族","ename":"Minzu"},{"StationID":"1420","lat":22.639693,"lon":120.323515,"name":"科工館","ename":"Science and Technology Museum"},{"StationID":"1421","name":"正義","ename":"Zhengyi"}];

	var tra_train = [{"TrainTypeID":"1107","TrainTypeCode":"2","note":"普悠瑪","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1115","TrainTypeCode":"4","note":"有身障座位 ,有自行車車廂","name":"莒光","ename":"Chu-Kuang Express"},{"TrainTypeID":"110F","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1110","TrainTypeCode":"4","note":"無身障座位","name":"莒光","ename":"Chu Kuang"},{"TrainTypeID":"110A","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1111","TrainTypeCode":"4","note":"有身障座位","name":"莒光","ename":"Chu-Kuang Express"},{"TrainTypeID":"1120","TrainTypeCode":"5","note":"","name":"復興","ename":"Fu Hsing"},{"TrainTypeID":"110E","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1106","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"110B","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1100","TrainTypeCode":"3","note":"DMU2800、2900、3000型柴聯及 EMU型電車自強號","name":"自強","ename":"Tze Chiang"},{"TrainTypeID":"1103","TrainTypeCode":"3","note":"DMU3100型柴聯自強號","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"110C","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1131","TrainTypeCode":"6","note":"","name":"區間車","ename":"Local Train"},{"TrainTypeID":"1114","TrainTypeCode":"4","note":"無身障座位 ,有自行車車廂","name":"莒光","ename":"Chu-Kuang Express"},{"TrainTypeID":"1109","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1108","TrainTypeCode":"3","note":"推拉式自強號且無自行車車廂","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1140","TrainTypeCode":"7","note":"","name":"普快車","ename":"Ordinary Express train"},{"TrainTypeID":"1101","TrainTypeCode":"3","note":"推拉式自強號","name":"自強","ename":"Tze Chiang"},{"TrainTypeID":"1132","TrainTypeCode":"6","note":"","name":"區間快","ename":"Fast Local Train"},{"TrainTypeID":"1102","TrainTypeCode":"1","note":"太魯閣","name":"自強","ename":"Tze Chiang"},{"TrainTypeID":"110D","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"}];

	//import trav3_station from './datax/tra.v3.station.json';
	//import trav3_train from './datax/tra.v3.train.json';

	function getObjID(uid) {
	  //透過 uid 拆解找對應的資料，uid 格式為 {公司名}_{路線名}，例如 trtc_R 為台北捷運紅線
	  if (/^TRA-|^TRTC-|^TMRT-|^KRTC-|^TYMC-|^KLRT-|^THSR-/.test(uid)) {
	    if (/^TRA-/.test(uid)) uid = uid.replace(/^TRA-/, 'tra_');else if (/^TRTC-/.test(uid)) uid = uid.replace(/^TRTC-/, 'trtc_');else if (/^TMRT-/.test(uid)) uid = uid.replace(/^TMRT-/, 'tmrt_');else if (/^KRTC-/.test(uid)) uid = uid.replace(/^KRTC-/, 'krtc_');else if (/^TYMC-/.test(uid)) uid = uid.replace(/^TYMC-/, 'tymetro_');else if (/^KLRT-/.test(uid)) uid = uid.replace(/^KLRT-/, 'klrt_');else if (/^THSR-/.test(uid)) uid = uid.replace(/^THSR-/, 'thsr_');
	  }

	  var ary = uid.split('_');
	  var companyTag = ary[0];
	  var id = uid.replace(companyTag + '_', '');
	  return {
	    company: companyTag,
	    id: id
	  };
	}

	var datax = {
	  trtc: {
	    line: trtc_line,
	    station: trtc_station,
	    transfer: trtc_transfer
	  },
	  tmrt: {
	    station: tmrt_station
	  },
	  krtc: {
	    line: krtc_line,
	    station: krtc_station,
	    transfer: krtc_transfer
	  },
	  tymetro: {
	    line: tymetro_line,
	    station: tymetro_station
	  },
	  thsr: {
	    station: thsr_station
	  },
	  tra: {
	    line: tra_line,
	    station: tra_station,
	    train: tra_train
	  },
	  getLine: function getLine(uid) {
	    var objA = getObjID(uid);

	    if (arguments.length == 2) {
	      objA = {
	        company: arguments[0],
	        id: arguments[1]
	      };
	    }

	    if (!this[objA.company]) throw 'Company ' + objA.company + ' is not defined. Error on datax.js getLine';
	    var lineAry = this[objA.company].line;
	    return lineAry.find(function (c) {
	      return c.LineID == objA.id;
	    });
	  },
	  getStation: function getStation(uid) {
	    var objA = getObjID(uid);

	    if (arguments.length == 2) {
	      objA = {
	        company: arguments[0],
	        id: arguments[1]
	      };
	    }

	    if (!this[objA.company]) throw 'Company ' + objA.company + ' is not defined. Error on datax.js getStation';
	    var stAry = this[objA.company].station;
	    return stAry.find(function (c) {
	      return c.StationID == objA.id;
	    });
	  }
	};

	var busURL = CM.busURL;
	var fnBUS = {
	  setDefaultCfg: function setDefaultCfg(cfg) {
	    cfg = cfg || {};
	    cfg.manageBy = cfg.manageBy || 'City'; //City , InterCity

	    cfg.cbFn = cfg.cbFn || function (data, e) {
	      console.info(data);
	    };

	    cfg.selectField = cfg.selectField ? ptx.selectFieldFn(cfg.selectField) : '';
	    cfg.top = 3000;
	    return cfg;
	  },
	  getCityData: function getCityData(str) {
	    var ary = pData.bus.city;
	    var rt = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].name == str || ary[i].City == str || ary[i].CityCode == str) {
	        rt = ary[i];
	        break;
	      }
	    }

	    return rt;
	  },
	  getBusArriveTime: function getBusArriveTime(StopUID, city, cfg) {
	    var filterStr = ptx.filterFn(ptx.filterParam('StopUID', '==', StopUID, 'or'));
	    this.getEstimatedTimeOfArrival(filterStr, city, cfg);
	  },
	  getBusRouteArriveTime: function getBusRouteArriveTime(RouteUID, cfg) {
	    var city = RouteUID.substr(0, 3);
	    var filterStr = ptx.filterFn(ptx.filterParam('RouteUID', '==', RouteUID, 'or'));
	    this.getEstimatedTimeOfArrival(filterStr, city, cfg);
	  },
	  getBusRouteInfo: function getBusRouteInfo(RouteUID, cfg) {
	    cfg = this.setDefaultCfg(cfg);
	    var city = RouteUID.substr(0, 3);
	    var myURL = busURL + '/Route/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
	    myURL += ptx.filterFn(ptx.filterParam('RouteUID', '==', RouteUID) + '&' + ptx.topFn());
	    if (cfg.selectField) myURL += '&' + cfg.selectField;
	    ptx.getURL(myURL, cfg.cbFn);
	  },
	  getBusRealtimeNearStop: function getBusRealtimeNearStop(RouteUID, dir, cfg) {
	    cfg = this.setDefaultCfg(cfg);
	    var city = RouteUID.substr(0, 3);

	    if (/string|number/.test(_typeof(dir))) {
	      dir = dir.toString();
	      var myURL = busURL + '/RealTimeNearStop/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
	      myURL += ptx.filterFn(ptx.filterParam(['RouteUID', 'Direction'], '==', [RouteUID, dir], 'and')) + '&' + ptx.topFn();
	    } else {
	      var myURL = busURL + '/RealTimeNearStop/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
	      myURL += ptx.filterFn(ptx.filterParam(['RouteUID'], '==', [RouteUID], 'and')) + '&' + ptx.topFn();
	    }

	    if (cfg.selectField) myURL += '&' + cfg.selectField;
	    ptx.getURL(myURL, cfg.cbFn);
	  },
	  getBusRoute: function getBusRoute(RouteUID, cfg, city) {
	    cfg = this.setDefaultCfg(cfg);

	    if (!city) {
	      if (typeof RouteUID == 'string') {
	        city = RouteUID.substr(0, 3);
	      } else {
	        city = RouteUID[0].substr(0, 3);
	      }
	    }

	    var myURL = busURL + '/Route/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
	    myURL += ptx.filterFn(ptx.filterParam('RouteUID', '==', RouteUID), 'or') + '&' + ptx.topFn();
	    if (cfg.selectField) myURL += '&' + cfg.selectField;
	    ptx.getURL(myURL, cfg.cbFn);
	  },
	  getBusStation: function getBusStation(StationID, city, cfg) {
	    cfg = this.setDefaultCfg(cfg);
	    var myURL = busURL + '/Station/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
	    myURL += ptx.filterFn(ptx.filterParam('StationID', '==', StationID.toString())) + '&' + ptx.topFn();
	    if (cfg.selectField) myURL += '&' + cfg.selectField;
	    ptx.getURL(myURL, cfg.cbFn);
	  },
	  getPositionBusStation: function getPositionBusStation(city, lat, lng, cfg) {
	    cfg = this.setDefaultCfg(cfg);
	    var myURL = busURL + '/Station/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
	    myURL += ptx.spatialFilterFn(lat, lng, cfg.far, cfg.field) + '&' + ptx.topFn();
	    if (cfg.selectField) myURL += '&' + cfg.selectField;
	    ptx.getURL(myURL, cfg.cbFn);
	  },
	  getPromisePositionBusStation: function getPromisePositionBusStation(city, lat, lng) {
	    var cfg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	    return new Promise(function (resolve) {
	      cfg.cbFn = function (e) {
	        resolve(e);
	      };

	      fnBUS.getPositionBusStation(city, lat, lng, cfg);
	    });
	  },
	  getBusStopRoute: function getBusStopRoute(RouteUID, city, cfg) {
	    cfg = this.setDefaultCfg(cfg);
	    var myURL = busURL + '/StopOfRoute/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
	    myURL += ptx.filterFn(ptx.filterParam('RouteUID', '==', RouteUID.toString())) + '&';
	    myURL += ptx.orderByFn('SubRouteName/Zh_tw', 'asc') + '&' + ptx.topFn();
	    if (cfg.selectField) myURL += '&' + cfg.selectField;
	    ptx.getURL(myURL, cfg.cbFn);
	  },
	  getPromiseBusStopRoute: function getPromiseBusStopRoute(RouteUID, city) {
	    var cfg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return new Promise(function (resolve) {
	      cfg.cbFn = function (e) {
	        resolve(e);
	      };

	      fnBUS.getBusStopRoute(RouteUID, city, cfg);
	    });
	  },
	  getPromiseMultiBusStopRoute: function getPromiseMultiBusStopRoute(aryRouteUID, city) {
	    var cfg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var rtuids = aryRouteUID.map(function (c) {
	      return 'RouteUID';
	    });
	    cfg = this.setDefaultCfg(cfg);
	    var myURL = busURL + '/StopOfRoute/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
	    myURL += ptx.filterFn(ptx.filterParam(rtuids, '==', aryRouteUID, 'or')) + '&';
	    myURL += ptx.orderByFn('SubRouteName/Zh_tw', 'asc') + '&' + ptx.topFn();
	    if (cfg.selectField) myURL += '&' + cfg.selectField;
	    return new Promise(function (resolve) {
	      ptx.getURL(myURL, resolve);
	    });
	  },
	  getBusStopRouteByNumber: function getBusStopRouteByNumber(busNumber, city, cfg) {
	    cfg = this.setDefaultCfg(cfg);
	    var myURL = busURL + '/StopOfRoute/' + cfg.manageBy + '/' + this.getCityData(city).City + '/' + encodeURI(busNumber) + '?';
	    myURL += ptx.orderByFn('SubRouteName/Zh_tw', 'asc') + '&' + ptx.topFn();
	    if (cfg.selectField) myURL += '&' + cfg.selectField;
	    ptx.getURL(myURL, cfg.cbFn);
	  },
	  getEstimatedTimeOfArrival: function getEstimatedTimeOfArrival(filterStr, city, cfg) {
	    filterStr = filterStr ? filterStr + '&' : '';
	    cfg = this.setDefaultCfg(cfg);
	    var myURL = busURL + '/EstimatedTimeOfArrival/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
	    myURL += filterStr + ptx.topFn();
	    if (cfg.selectField) myURL += '&' + cfg.selectField;
	    ptx.getURL(myURL, cfg.cbFn);
	  },
	  searchBusByNumber: function searchBusByNumber(busNumber, city, cfg) {
	    cfg = this.setDefaultCfg(cfg);
	    var myURL = busURL + '/Route/' + cfg.manageBy + '/' + this.getCityData(city).City + '/' + encodeURI(busNumber) + '?';
	    myURL += ptx.orderByFn('RouteName/Zh_tw', 'asc') + '&' + ptx.topFn();
	    if (cfg.selectField) myURL += '&' + cfg.selectField;
	    ptx.getURL(myURL, cfg.cbFn);
	  }
	};

	var metroURL = CM.metroURL;
	var urls = {
	  Network: metroURL + '/Network',
	  //取得捷運路網資料
	  Line: metroURL + '/Line/',
	  //取得捷運路線基本資料
	  Station: metroURL + '/Station/',
	  //取得捷運車站基本資料
	  StationOfLine: metroURL + '/StationOfLine/',
	  //取得捷運路線車站基本資料
	  LineTransfer: metroURL + '/LineTransfer/',
	  //取得捷運路線站間轉乘基本資料
	  StationFacility: metroURL + '/StationFacility/',
	  //取得捷運車站設施資料
	  StationExit: metroURL + '/StationExit/',
	  //取得捷運車站出入口基本資料
	  Route: metroURL + '/Route/',
	  //取得捷運營運路線基本資料
	  StationOfRoute: metroURL + '/StationOfRoute/',
	  //取得捷運營運路線車站基本資料
	  FirstLastTimetable: metroURL + '/FirstLastTimetable/',
	  //取得捷運首末班車時刻表資料
	  Frequency: metroURL + '/Frequency/',
	  //取得捷運路線發車班距頻率資料
	  S2STravelTime: metroURL + '/S2STravelTime/',
	  //取得捷運列車站間運行時間資料
	  ODFare: metroURL + '/ODFare/',
	  //取得捷運起迄站間票價資料
	  LiveBoard: metroURL + '/LiveBoard/',
	  //取得捷運起迄站間票價資料
	  StationTimeTable: metroURL + '/StationTimeTable/',
	  //取得捷運站別時刻表資料
	  Shape: metroURL + '/Shape/' //取得指定營運業者之軌道路網實體路線圖資資料

	};
	var companyTag = {
	  trtc: 'TRTC',
	  tymetro: 'TYMC',
	  tmrt: 'TMRT',
	  klrt: 'KLRT',
	  krtc: 'KRTC'
	};

	function companyTagFind(str) {
	  return Object.keys(companyTag).find(function (c) {
	    return !!(str == companyTag[c]);
	  });
	}

	var getPTX = ptx.getPromiseURL;

	function setDefaultCfg() {
	  var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  if (typeof cfg == 'string') cfg = {
	    paramDirectlyUse: cfg
	  }; //若傳入的為字串代表直接用於最後的參數不需再調整

	  cfg.cbFn = cfg.cbFn || function (data, e) {};

	  cfg.top = cfg.top || 50000;
	  cfg.format = 'JSON';
	  return cfg;
	}

	function processCfg(cfg) {
	  //將 cfg 轉為對應的參數
	  if (cfg.paramDirectlyUse) return cfg.paramDirectlyUse;
	  var aryParam = [];
	  if (cfg.selectField) aryParam.push(ptx.selectFieldFn(cfg.selectField));
	  if (cfg.filterBy) aryParam.push(ptx.filterFn(cfg.filterBy));

	  if (cfg.orderBy) {
	    var dir = cfg.orderDir || false;
	    aryParam.push(ptx.orderByFn(cfg.orderBy, dir));
	  }

	  aryParam.push(ptx.topFn(cfg.top, cfg.format)); //最後加這個

	  return '?' + aryParam.join('&');
	}

	function getCompanyTag(name) {
	  return companyTag[name] || name;
	}

	function makePTX_func(cmd, companyTag, cfg) {
	  cfg = setDefaultCfg(cfg);
	  var param = processCfg(cfg);
	  return getPTX(urls[cmd] + companyTag + param, cfg);
	}

	function getStationOnWhatLineID(StationID) {
	  if (/^[a-zA-Z]{1}\d{2}/gi.test(StationID)) {
	    return StationID.substr(0, 1);
	  } else if (/^[a-zA-Z]{2}\d{2}/gi.test(StationID)) {
	    return StationID.substr(0, 2);
	  }

	  var ary = StationID.split('');
	  var rt = '';

	  for (var i = 0; i < ary.length; i++) {
	    if (/[a-zA-Z]/.test(ary[i])) {
	      rt = rt + ary[i];
	    } else {
	      break;
	    }
	  }

	  return rt;
	}

	function promiseCatchLineCombine(json, data, combineName) {
	  var LineIDName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'LineID';
	  var mode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'array';
	  json.forEach(function (c) {
	    if (mode == 'array') c[combineName] = [];
	  });
	  data.forEach(function (c) {
	    var LineObj = CM.findArrayTarget(json, function (item) {
	      return !!(item.LineID == c[LineIDName]);
	    });
	    if (mode == 'array') LineObj[combineName].push(c);
	  });
	  return json;
	}

	function promiseCatchLinePredo(data, backTag, otherDo) {
	  return data.map(function (c) {
	    var rt = {};
	    backTag.forEach(function (key) {
	      rt[key] = c[key];
	    });
	    if (typeof otherDo == 'function') rt = otherDo(rt);
	    return rt;
	  });
	}

	function promiseCatchStationCombine(json, data, combineName) {
	  var StationID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'StationID';
	  var mode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'array';
	  var otherDo = arguments.length > 5 ? arguments[5] : undefined;
	  json.forEach(function (c) {
	    if (mode == 'array') c[combineName] = [];
	  });
	  data.forEach(function (c) {
	    var Obj = CM.findArrayTarget(json, function (item) {
	      return !!(item.StationID == c[StationID]);
	    });
	    if (typeof otherDo == 'function') c = otherDo(c);
	    if (mode == 'array') Obj[combineName].push(c);
	  });
	  return json;
	}

	var metro = {
	  getCompanyTag: getCompanyTag,
	  getStationOnWhatLineID: getStationOnWhatLineID,
	  urls: urls,
	  companyTag: companyTag //自動產生 Function

	};
	var aryMakeFunction = Object.keys(urls);
	var ptxAutoMetroFunctionKey = [];
	aryMakeFunction.forEach(function (fn) {
	  if (!/^Network$/.test(fn)) {
	    metro['_' + fn] = function (companyTag, cfg) {
	      return makePTX_func(fn, companyTag, cfg);
	    };

	    ptxAutoMetroFunctionKey.push('_' + fn);
	  }
	});
	metro.ptxAutoMetroFunctionKey = ptxAutoMetroFunctionKey; //========= 建立各捷運公司可直接使用之基本定義 Function ============

	var baseMethod = function baseMethod(companyTag) {
	  var _this = this,
	      _methodObj;

	  _classCallCheck(this, baseMethod);

	  var me = this;
	  var compName = companyTagFind(companyTag);
	  this.companyTag = companyTag;
	  ptxAutoMetroFunctionKey.forEach(function (fn) {
	    _this[fn] = function (cfg) {
	      return metro[fn](companyTag, cfg);
	    };
	  });

	  function useLineID2filterBy(LineID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg.filterBy = cfg.filterBy || '';
	    cfg.filterBy += ptx.filterParam('LineID', '==', LineID);
	    return cfg;
	  }

	  function useStationID2filterBy(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg.filterBy = cfg.filterBy || '';
	    cfg.filterBy += ptx.filterParam('StationID', '==', StationID);
	    return cfg;
	  }

	  var methodObj = (_methodObj = {
	    getRoute: function getRoute(LineID) {
	      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      cfg = useLineID2filterBy(LineID, cfg);
	      return me._Route(cfg);
	    },
	    getLineFrequency: function getLineFrequency(LineID) {
	      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      cfg = useLineID2filterBy(LineID, cfg);
	      return me._Frequency(cfg);
	    },
	    getLineTransfer: function getLineTransfer(LineID) {
	      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      cfg.filterBy = cfg.filterBy || '';
	      cfg.filterBy += ptx.filterParam('FromLineID', '==', LineID);
	      return me._LineTransfer(cfg);
	    }
	  }, _defineProperty(_methodObj, "getLineFrequency", function getLineFrequency(LineID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useLineID2filterBy(LineID, cfg);
	    return me._Frequency(cfg);
	  }), _defineProperty(_methodObj, "getFirstLastTimetable", function getFirstLastTimetable(LineID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useLineID2filterBy(LineID, cfg);
	    return me._FirstLastTimetable(cfg);
	  }), _defineProperty(_methodObj, "getS2STravelTime", function getS2STravelTime(LineID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useLineID2filterBy(LineID, cfg);

	    cfg.processJSON = function (json) {
	      var travleTimes, tmpA, tmpNextStop;
	      if (_typeof(json) != 'object') return json;

	      for (var m = 0; m < json.length; m++) {
	        travleTimes = json[m].TravelTimes;
	        json[m].TravelInterval = travleTimes.map(function (c, idx, arr) {
	          tmpNextStop = arr[idx + 1] ? parseInt(arr[idx + 1].StopTime) : 0;
	          tmpA = parseInt(c.RunTime) + Math.ceil(parseInt(c.StopTime) / 2) + Math.ceil(tmpNextStop / 2);
	          return tmpA;
	        });
	      }

	      return json;
	    };

	    return me._S2STravelTime(cfg);
	  }), _defineProperty(_methodObj, "getStationOfLine", function getStationOfLine(LineID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useLineID2filterBy(LineID, cfg);
	    return me._StationOfLine(cfg);
	  }), _defineProperty(_methodObj, "getStationOfRoute", function getStationOfRoute(LineID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useLineID2filterBy(LineID, cfg);
	    return me._StationOfRoute(cfg);
	  }), _defineProperty(_methodObj, "getFromToFare", function getFromToFare(fromID, toID) {
	    var cfg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    cfg.filterBy = cfg.filterBy || '';
	    cfg.filterBy += ptx.filterParam(['OriginStationID', 'DestinationStationID'], '==', [fromID, toID], 'and');
	    return me._ODFare(cfg);
	  }), _defineProperty(_methodObj, "getFromToTravelTime", function getFromToTravelTime(fromID, toID) {
	    var cfg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var LineID = getStationOnWhatLineID(fromID);
	    return me.getS2STravelTime(LineID, cfg).then(function (res) {
	      var aryTravelTimes = res.data.find(function (c) {
	        var hasFrom = false,
	            hasTo = false,
	            t = c.TravelTimes;

	        for (var i = 0; i < t.length; i++) {
	          if (t[i].FromStationID == fromID || t[i].ToStationID == fromID) {
	            hasFrom = true;
	          } else if (t[i].FromStationID == toID || t[i].ToStationID == toID) {
	            hasTo = true;
	          }
	        }

	        return hasFrom && hasTo;
	      });
	      if (aryTravelTimes && aryTravelTimes.TravelTimes) aryTravelTimes = aryTravelTimes.TravelTimes;
	      var flagReverse = false,
	          findTag = 'any'; // any , from / to , finish

	      if (!aryTravelTimes) return {
	        status: CM.CONST_PTX_API_FAIL,
	        error: 'No match any route.'
	      };
	      var aryBack = aryTravelTimes.filter(function (c, idx) {
	        switch (findTag) {
	          case 'any':
	            if (c.FromStationID == fromID || c.FromStationID == toID) {
	              findTag = c.FromStationID == fromID ? 'to' : 'from';
	              return true;
	            } else {
	              return false;
	            }

	            break;

	          case 'from':
	            flagReverse = true;

	          case 'to':
	            if (c.ToStationID == fromID || c.ToStationID == toID) findTag = 'finish';
	            return true;
	            break;

	          case 'finish':
	            return false;
	            break;
	        }
	      });

	      if (flagReverse) {
	        //如果是和伺服器給的順序相反時，將 FromStatioinID 與 ToStationID 反向
	        aryBack = aryBack.map(function (c, idx, arr) {
	          return {
	            FromStationID: c.ToStationID,
	            FromStationName: c.ToStationName,
	            ToStationID: c.FromStationID,
	            ToStationName: c.FromStationName,
	            Sequence: arr.length - idx,
	            RunTime: c.RunTime,
	            StopTime: idx == arr.length - 1 ? 0 : c.StopTime
	          };
	        }).reverse();
	      } else {
	        aryBack = aryBack.map(function (c, idx) {
	          c.Sequence = idx + 1;
	          c.StopTime = idx == 0 ? 0 : c.StopTime;
	          return c;
	        });
	      }

	      var totalTime = 0,
	          tmpNextStop;
	      var travelInterval = aryBack.map(function (c, idx, arr) {
	        totalTime += parseInt(c.RunTime) + parseInt(c.StopTime);
	        tmpNextStop = arr[idx + 1] ? parseInt(arr[idx + 1].StopTime) : 0;
	        return parseInt(c.RunTime) + Math.ceil(parseInt(c.StopTime) / 2) + Math.ceil(tmpNextStop / 2);
	      });
	      return {
	        status: CM.CONST_PTX_API_SUCCESS,
	        TravelTimes: aryBack,
	        TravelInterval: travelInterval,
	        TotalTime: totalTime,
	        FromStationID: fromID,
	        ToStationID: toID
	      };
	    });
	  }), _defineProperty(_methodObj, "getStation", function getStation(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useStationID2filterBy(StationID, cfg);
	    return me._Station(cfg);
	  }), _defineProperty(_methodObj, "getStationTimeTable", function getStationTimeTable(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useStationID2filterBy(StationID, cfg);
	    return me._StationTimeTable(cfg);
	  }), _defineProperty(_methodObj, "getStationFacility", function getStationFacility(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useStationID2filterBy(StationID, cfg);
	    return me._StationFacility(cfg);
	  }), _defineProperty(_methodObj, "getStationFirstLastTimetable", function getStationFirstLastTimetable(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useStationID2filterBy(StationID, cfg);
	    return me._FirstLastTimetable(cfg);
	  }), _defineProperty(_methodObj, "getStationExit", function getStationExit(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useStationID2filterBy(StationID, cfg);
	    return me._StationExit(cfg);
	  }), _defineProperty(_methodObj, "getStationFare", function getStationFare(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg.filterBy = cfg.filterBy || '';
	    cfg.filterBy += ptx.filterParam('OriginStationID', '==', StationID);
	    return me._ODFare(cfg);
	  }), _defineProperty(_methodObj, "getStationLiveBoard", function getStationLiveBoard(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useStationID2filterBy(StationID, cfg);
	    return me._LiveBoard(cfg);
	  }), _methodObj);

	  for (var k in methodObj) {
	    this[k] = methodObj[k];
	  } // ==== 整合抓資料 Function 以及抓完後的固定資料存取 Function ====


	  var catchData = {
	    config: {
	      Line_BackTag: ['LineID', 'LineName', 'LineColor', 'IsBranch'],
	      Line_StationOfRoute_BackTag: ['RouteID', 'Direction', 'LineID', 'Stations'],
	      Line_LineTransfer_BackTag: ['FromLineID', 'FromStationID', 'ToLineID', 'ToStationID', 'IsOnSiteTransfer', 'TransferTime'],
	      Line_S2STravelTime_BackTag: ['LineID', 'RouteID', 'TravelTimes'],
	      Line_Frequency_BackTag: ['LineID', 'RouteID', 'ServiceDay', 'OperationTime', 'Headways'],
	      Line_callback: function Line_callback(json) {
	        //通用預處理
	        return json;
	      },
	      Line_callback_final: function Line_callback_final(json) {
	        //私用預處理
	        return json;
	      },
	      Station_BackTag: ['StationID', 'StationName', 'StationPosition'],
	      Station_FirstLastTimetable_BackTag: ['StationID', 'LineID', 'DestinationStaionID', 'FirstTrainTime', 'LastTrainTime'],
	      Station_Fare_BackTag: ['OriginStationID', 'DestinationStationID', 'Fares'],
	      Station_Transfer_BackTag: ['FromLineID', 'FromStationID', 'FromStationName', 'IsOnSiteTransfer', 'ToLineID', 'ToStationID', 'TransferTime']
	    },
	    calcStationDayTimeBySimple: function calcStationDayTimeBySimple(timeObj) {
	      var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	      //運用 TimeSimple Format 計算一個車站每週每日往兩方向的所有班次資訊 , w for weekdays
	      w = w.toString();
	      var regW = new RegExp(w);
	      if (!timeObj) return {
	        error: "No time data"
	      };
	      var mainSub = catchData.getDataXLineMainSub(timeObj.LineID);
	      var hasSubLine = !!(mainSub.sub.length > 0); //如果這路線有分主幹線，要區分主幹線
	      //過濾要找的星期

	      function procTIme(rollTime) {
	        var Full = [],
	            Simple = [];
	        rollTime.forEach(function (c) {
	          c.Timetables.forEach(function (t) {
	            if (Simple.indexOf(t) == -1) {
	              Simple.push(t);
	              var tmpRG = {
	                RouteID: c.RouteID,
	                To: c.To,
	                Time: t,
	                tt_sortTime: CM.transTime2Sec(t, true)
	              };
	              if (c.TrainType) tmpRG.TrainType = c.TrainType;
	              Full.push(tmpRG);
	            }
	          });
	        });
	        Full.sort(ptx.sortByTTSortTime);
	        Simple = Full.map(function (c) {
	          return c.Time;
	        });
	        return {
	          Route: rollTime,
	          Full: Full,
	          Simple: Simple,
	          isEmpty: !!(rollTime.length == 0)
	        };
	      }

	      var SubDirTime = false,
	          isSubOfStation = false;
	      var MainDirTime = timeObj.Direction.map(function (DirTime) {
	        var rollTime = DirTime.filter(function (c) {
	          if (hasSubLine && mainSub.main.indexOf(c.RouteID) == -1) isSubOfStation = true;
	          return mainSub.main.indexOf(c.RouteID) != -1 && regW.test(c.weekStr);
	        });
	        return procTIme(rollTime);
	      });
	      if (MainDirTime[0].isEmpty && MainDirTime[1].isEmpty) MainDirTime = false;

	      if (hasSubLine && isSubOfStation) {
	        SubDirTime = timeObj.Direction.map(function (DirTime) {
	          var backTime = DirTime.filter(function (c) {
	            return mainSub.sub.indexOf(c.RouteID) != -1 && regW.test(c.weekStr);
	          });
	          return procTIme(backTime);
	        });
	      } //整理目標方向車站


	      var mainTo = [[], []],
	          subTo = [[], []];

	      if (MainDirTime) {
	        MainDirTime[0].Route.forEach(function (c) {
	          if (mainTo[0].indexOf(c.To) == -1) {
	            mainTo[0].push(c.To);
	          }
	        });
	        MainDirTime[1].Route.forEach(function (c) {
	          if (mainTo[1].indexOf(c.To) == -1) {
	            mainTo[1].push(c.To);
	          }
	        });
	      }

	      if (SubDirTime) {
	        SubDirTime[0].Route.forEach(function (c) {
	          if (subTo[0].indexOf(c.To) == -1) {
	            subTo[0].push(c.To);
	          }
	        });
	        SubDirTime[1].Route.forEach(function (c) {
	          if (subTo[1].indexOf(c.To) == -1) {
	            subTo[1].push(c.To);
	          }
	        });
	      }

	      return {
	        StationID: timeObj.StationID,
	        LineID: timeObj.LineID,
	        main: MainDirTime,
	        sub: SubDirTime,
	        mainTo: mainTo,
	        subTo: subTo,
	        week: w
	      };
	    },
	    calcStationTimeByHeadWays: function calcStationTimeByHeadWays(LineObj, StationID, RouteID, Direction) {
	      if (typeof LineObj == 'string') LineObj = catchData.getDataXLineObj(LineObj);
	      var stData = catchData.getDataXStationData(StationID);
	      var ToStationID = LineObj.Route.find(function (c) {
	        return c.RouteID == RouteID && c.Direction == Direction;
	      }).Stations;
	      ToStationID = ToStationID[ToStationID.length - 1];
	      var Frq = stData.FirstLast.find(function (c) {
	        return c.To == ToStationID;
	      });
	      var first = Frq.Time[0],
	          last = Frq.Time[1];
	      return LineObj.Frequency.map(function (c) {
	        var Headways = c.Headways;
	        var time = [],
	            tmpTime = '',
	            startTime = 0,
	            endTime = 0,
	            headWay = false,
	            intTime = 0,
	            intCount = 0,
	            headwayIndex = 0;

	        while (headwayIndex < Headways.length) {
	          headWay = Headways[headwayIndex];
	          startTime = headwayIndex == 0 ? CM.transTime2Sec(first, true) / 60 : CM.transTime2Sec(headWay.Time[0], true) / 60;
	          endTime = CM.transTime2Sec(headWay.Time[1], true) / 60;
	          intTime = headWay.AveMins + (endTime - startTime) % headWay.AveMins;
	          intCount = Math.ceil((endTime - startTime) / intTime);

	          for (var i = 0; i < intCount; i++) {
	            tmpTime = CM.transSec2Time((startTime + i * intTime) * 60);
	            time.push(tmpTime);
	          }

	          headwayIndex++;
	        }

	        if (time.indexOf(last) == -1) time.push(last);
	        return {
	          weekStr: CM.weekArray2WeekStr(c.ServiceDays.week),
	          time: time
	        };
	      });
	    },
	    calcLineTimeByFirstStation: function calcLineTimeByFirstStation(LineObj, FirstStationID, FirstStationTime, RouteID, Direction) {
	      if (typeof LineObj == 'string') LineObj = catchData.getDataXLineObj(LineObj); //let stData = catchData.getDataXStationData(StationID);

	      var Route = LineObj.Route.find(function (c) {
	        return c.RouteID == RouteID && c.Direction == Direction;
	      });
	      var Stations = Route.Stations;
	      var ToStationID = Route.Stations[Route.Stations.length - 1];
	      var RunTime = Route.TravelTime.RunTime,
	          StopTime = Route.TravelTime.StopTime;
	      var startIndex = Route.Stations.indexOf(FirstStationID);
	      var time = [],
	          tmpA,
	          nowSec = CM.transTime2Sec(FirstStationTime),
	          countSec = 0;

	      for (var i = startIndex; i < Stations.length; i++) {
	        tmpA = nowSec + countSec;
	        time.push(tmpA);

	        if (i < Stations.length - 1) {
	          nowSec = tmpA + RunTime[i];
	          if (StopTime[i + 1]) nowSec += StopTime[i + 1];
	        }
	      }

	      return time.map(function (c) {
	        return CM.transSec2Time(c);
	      });
	    },
	    getDataXLineObj: function getDataXLineObj(LineID) {
	      return ptx.datax[compName].line.find(function (c) {
	        return !!(c.LineID == LineID);
	      });
	    },
	    getDataXLineMainSub: function getDataXLineMainSub(lineObj) {
	      lineObj = (typeof line === "undefined" ? "undefined" : _typeof(line)) == 'object' ? lineObj : catchData.getDataXLineObj(lineObj);
	      var main = [],
	          sub = [];
	      var aryRouteID = lineObj.Route.map(function (c) {
	        return c.RouteID;
	      }).filter(function (c, idx, arr) {
	        return arr.indexOf(c) == idx;
	      });

	      if (lineObj.main) {
	        main = lineObj.main;
	        sub = aryRouteID.filter(function (c) {
	          return main.indexOf(c) == -1;
	        });
	      } else {
	        main = aryRouteID;
	      }

	      return {
	        main: main,
	        sub: sub
	      };
	    },
	    getDataXRouteDirectionInfo: function getDataXRouteDirectionInfo(LineID, RouteID, Direction) {
	      var lineObj = catchData.getDataXLineObj(LineID);
	      return lineObj.Route.find(function (c) {
	        return c.RouteID == RouteID && c.Direction == Direction;
	      });
	    },
	    getDataXRouteMainTerminal: function getDataXRouteMainTerminal(LineID) {
	      var lineObj = catchData.getDataXLineObj(LineID);
	      var r = lineObj.Route[0].Stations;
	      return [r[0], r[r.length - 1]];
	    },
	    getDataXS2STravelTime: function getDataXS2STravelTime(fromID, toID) {
	      var LineID = getStationOnWhatLineID(fromID);
	      var lineObj = catchData.getDataXLineObj(LineID);
	      var fidx = 0,
	          tidx = 0;
	      var routeData = lineObj.Route.find(function (c) {
	        fidx = c.Stations.indexOf(fromID);
	        tidx = c.Stations.indexOf(toID);
	        return fidx != -1 && tidx != -1 && fidx < tidx;
	      });
	      var rt = false;

	      if (routeData) {
	        var aryA = [];

	        if (routeData.TravelTime && routeData.TravelTime.RunTime) {
	          for (var i = fidx; i < tidx; i++) {
	            aryA.push({
	              from: routeData.Stations[i],
	              to: routeData.Stations[i + 1],
	              RunTime: routeData.TravelTime.RunTime[i],
	              StopTime: i > fidx && routeData.TravelTime.StopTime ? routeData.TravelTime.StopTime[i] : 0
	            });
	          }

	          rt = {
	            list: aryA,
	            sec: aryA.reduce(function (val, ac) {
	              return val + ac.RunTime + ac.StopTime;
	            }, 0)
	          };
	          rt.min = Math.ceil(rt.sec / 60);
	        } else if (lineObj.TravelTimeBetween) {
	          var aryTT = Object.keys(lineObj.TravelTimeBetween);
	          var aryTmpType = [],
	              tmpType = false,
	              fastSec = 999999;
	          aryTT.forEach(function (tp) {
	            tmpType = lineObj.TravelTimeBetween[tp];

	            if (tmpType[fromID] && tmpType[fromID][toID]) {
	              if (fastSec > tmpType[fromID][toID]) {
	                fastSec = tmpType[fromID][toID];
	              }

	              aryTmpType.push({
	                TrainType: tp,
	                sec: tmpType[fromID][toID],
	                min: Math.ceil(tmpType[fromID][toID] / 60)
	              });
	            }
	          });
	          rt = {
	            allType: aryTmpType,
	            sec: fastSec,
	            min: Math.ceil(fastSec / 60)
	          };
	        }
	      }

	      return rt;
	    },
	    getDataXStationData: function getDataXStationData(StationID) {
	      return ptx.datax[compName].station.find(function (c) {
	        return !!(c.StationID == StationID);
	      });
	    },
	    getDataXStationName: function getDataXStationName(StationID, isEn) {
	      var st = catchData.getDataXStationData(StationID);
	      return isEn ? st.ename : st.name;
	    },
	    getDataXTransferOfLine: function getDataXTransferOfLine(LineID) {
	      return ptx.datax[compName].transfer.filter(function (c) {
	        return c.FromLineID == LineID;
	      });
	    },
	    getDataXTransferStation: function getDataXTransferStation(FromLineID, ToLineID) {
	      return ptx.datax[compName].transfer.filter(function (c) {
	        return c.FromLineID == FromLineID && c.ToLineID == ToLineID;
	      });
	    },
	    getStationByTimeSimpleArray: function getStationByTimeSimpleArray(StationID, ary) {
	      return ary.find(function (c) {
	        return c.StationID == StationID;
	      });
	    },
	    Line: function Line(progressFn) {
	      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //路線包抓法 1.Line  2.合併路由和轉乘到 Line  3.合併站間距與班距到路由

	      progressFn('取得路網中');
	      var lineBackTag = catchData.config.Line_BackTag;

	      var atLine = me._Line({
	        selectField: lineBackTag
	      }).then(function (res) {
	        return promiseCatchLinePredo(res.data, lineBackTag);
	      }).then(function (json) {
	        //抓路由
	        progressFn('取得各線路由中');
	        var backTag = catchData.config.Line_StationOfRoute_BackTag;
	        return me._StationOfRoute({
	          selectField: backTag
	        }).then(function (res) {
	          //整理
	          return promiseCatchLinePredo(res.data, backTag, function (rt) {
	            rt.Stations = rt.Stations.map(function (st) {
	              return st.StationID;
	            });
	            return rt;
	          });
	        }).then(function (data) {
	          //合併
	          return promiseCatchLineCombine(json, data, 'Route');
	        }).catch(function () {
	          return json;
	        });
	      }).then(function (json) {
	        //抓轉乘
	        progressFn('取得轉乘資訊中');
	        var backTag = catchData.config.Line_LineTransfer_BackTag;
	        return me._LineTransfer({
	          selectField: backTag
	        }).then(function (res) {
	          //整理
	          return promiseCatchLinePredo(res.data, backTag);
	        }).then(function (data) {
	          //合併
	          return promiseCatchLineCombine(json, data, 'Transfer', 'FromLineID');
	        }).catch(function () {
	          return json;
	        });
	      }).then(function (json) {
	        //抓站間距
	        progressFn('取得站間距時間中');
	        var backTag = catchData.config.Line_S2STravelTime_BackTag;
	        return me._S2STravelTime({
	          selectField: backTag
	        }).then(function (res) {
	          //整理
	          return promiseCatchLinePredo(res.data, backTag, function (rt) {
	            rt.TravelTimes = rt.TravelTimes.map(function (c, idx, arr) {
	              var ret = {
	                FromTo: [c.FromStationID, c.ToStationID],
	                RunTime: c.RunTime
	              };
	              if (typeof c.StopTime != 'undefined') ret.StopTime = c.StopTime;
	              return ret;
	            });
	            return rt;
	          });
	        }).then(function (data) {
	          //合併
	          return promiseCatchLineCombine(json, data, 'TravelTime');
	        }).catch(function () {
	          return json;
	        });
	      }).then(function (json) {
	        //抓班距
	        progressFn('取得班距中');
	        var backTag = catchData.config.Line_Frequency_BackTag;
	        return me._Frequency({
	          selectField: backTag
	        }).then(function (res) {
	          //整理
	          return promiseCatchLinePredo(res.data, backTag, function (rt) {
	            rt.OperationTime = [rt.OperationTime.StartTime, rt.OperationTime.EndTime];
	            rt.Headways = rt.Headways.map(function (c) {
	              c.Time = [c.StartTime, c.EndTime];
	              delete c.StartTime;
	              delete c.EndTime;
	              c.AveMins = Math.ceil((parseInt(c.MinHeadwayMins) + parseInt(c.MaxHeadwayMins)) / 2);
	              return c;
	            });
	            var tmpSD = rt.ServiceDays;
	            rt.ServiceDays = {
	              ServiceTag: tmpSD.ServiceTag,
	              NationalHolidays: tmpSD.NationalHolidays,
	              week: [tmpSD.Sunday, tmpSD.Monday, tmpSD.Tuesday, tmpSD.Wednesday, tmpSD.Thursday, tmpSD.Friday, tmpSD.Saturday]
	            };
	            return rt;
	          });
	        }).then(function (data) {
	          //合併
	          return promiseCatchLineCombine(json, data, 'Frequency');
	        }).catch(function () {
	          return json;
	        });
	      }).then(function (json) {
	        progressFn('整理輸出資料格式');
	        return catchData.config.Line_callback_final(catchData.config.Line_callback(json));
	      });

	      return atLine;
	    },
	    Station: function Station(progressFn) {
	      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //車站包抓法  1.取得所有車站資料 2.合併首末班車

	      progressFn('取得車站中');
	      var stationBackTag = catchData.config.Station_BackTag;

	      var atStation = me._Station({
	        selectField: stationBackTag
	      }).then(function (res) {
	        return promiseCatchLinePredo(res.data, stationBackTag);
	      }).then(function (json) {
	        json.forEach(function (st, idx, arr) {
	          if (st.StationPosition) {
	            st.lat = st.StationPosition.PositionLat;
	            st.lon = st.StationPosition.PositionLat;
	            delete st.StationPosition;
	          }

	          st.name = st.StationName.Zh_tw;
	          if (st.StationName.En) st.ename = st.StationName.En;
	          delete st.StationName;
	        });
	        return json;
	      }).then(function (json) {
	        //抓首末班車
	        progressFn('取得首末班車');
	        var backTag = catchData.config.Station_FirstLastTimetable_BackTag;
	        return me._FirstLastTimetable({
	          selectField: backTag
	        }).then(function (res) {
	          //整理
	          return promiseCatchLinePredo(res.data, backTag);
	        }).then(function (data) {
	          //合併
	          var json2 = promiseCatchStationCombine(json, data, 'FirstLast', 'StationID', 'array', function (time) {
	            var rtObj = {
	              To: time.DestinationStaionID,
	              Time: [time.FirstTrainTime, time.LastTrainTime]
	            };
	            if (typeof time.TrainType != 'undefined') rtObj.TrainType = time.TrainType;
	            return rtObj;
	          });
	          return json2;
	        }).catch(function () {
	          return json;
	        });
	      });

	      return atStation;
	    },
	    Transfer: function Transfer(progressFn) {
	      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //轉乘包抓法  1.抓所有 ODFare  2.整理輸出就好

	      progressFn('取得轉乘站中');
	      var backTag = catchData.config.Station_Transfer_BackTag;
	      return me._LineTransfer({
	        selectField: backTag
	      }).then(function (res) {
	        //整理
	        return promiseCatchLinePredo(res.data, backTag);
	      }).then(function (data) {
	        //合併
	        data.forEach(function (st) {
	          st.name = st.FromStationName.Zh_tw;
	          st.ename = st.FromStationName.En;
	          delete st.FromStationName;
	        });
	        return data;
	      }).catch(function (res) {
	        return res;
	      });
	    },
	    Fare: function Fare(progressFn) {
	      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //票價包抓法  1.抓所有 ODFare  2.整理輸出全票票價就好

	      progressFn('取得車站中');
	      var backTag = catchData.config.Station_Fare_BackTag;
	      return me._ODFare({
	        selectField: backTag
	      }).then(function (res) {
	        //整理
	        return promiseCatchLinePredo(res.data, backTag);
	      }).then(function (data) {
	        //合併
	        var json2 = {};
	        data.forEach(function (st) {
	          if (!json2[st.OriginStationID]) json2[st.OriginStationID] = {};
	          var tmpA = st.Fares.find(function (fp) {
	            return !!(fp.TicketType == 1 && fp.FareClass == 1);
	          });
	          if (tmpA) json2[st.OriginStationID][st.DestinationStationID] = tmpA.Price;
	        });
	        return json2;
	      }).catch(function (res) {
	        return res;
	      });
	    },
	    TimeTable: function TimeTable(progressFn) {
	      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
	      progressFn('取得車站中');
	      var stationBackTag = ['StationID'];
	      var aryTime = [];
	      return me._Station({
	        selectField: stationBackTag
	      }).then(function (res) {
	        return promiseCatchLinePredo(res.data, stationBackTag);
	      }).then(function (json) {
	        //依序將所有車站做成 Promise 抓資料，間隔 
	        function makeCatchStation(StationID) {
	          return function () {
	            return new Promise(function (resolve) {
	              setTimeout(resolve, 100);
	            }).then(function () {
	              progressFn('正在讀取 ' + StationID + ' 站的時刻表');
	              return me.getStationTimeTable(StationID).then(function (objA) {
	                var rawTime = objA.data;
	                if (rawTime && rawTime.length > 0) aryTime.push(rawTime);
	                return rawTime;
	              });
	            });
	          };
	        }

	        var aryStationFn = json.map(function (c) {
	          return makeCatchStation(c.StationID);
	        });
	        return aryStationFn.reduce(function (cur, next) {
	          return cur.then(next);
	        }, Promise.resolve()).then(function () {
	          return aryTime;
	        });
	      }).then(function (pp) {
	        return pp;
	      }).catch(function (res) {
	        return res;
	      });
	    },
	    TimeSimple: function TimeSimple(progressFn) {
	      return catchData.TimeTable(progressFn).then(function (json) {
	        progressFn('簡化輸出格式');
	        json.forEach(function (station, idx, arr) {
	          var rt = {};
	          station.forEach(function (data, didx) {
	            if (didx == 0) {
	              rt.StationID = data.StationID;
	              rt.LineID = data.LineID;
	              rt.Direction = [[], []]; //Direction 0 與 1 直接分配到陣列的 0 跟 1
	            }

	            var weekStr = [data.ServiceDays.Sunday, data.ServiceDays.Monday, data.ServiceDays.Tuesday, data.ServiceDays.Wednesday, data.ServiceDays.Thursday, data.ServiceDays.Friday, data.ServiceDays.Saturday].map(function (day, idx) {
	              return day ? idx.toString() : '';
	            }).join('');
	            var TrainType = undefined;
	            var Timetables = data.Timetables.map(function (time) {
	              if (time.TrainType) {
	                TrainType = time.TrainType;
	              }
	              return time.DepartureTime;
	            });
	            rt.Direction[data.Direction].push({
	              To: data.DestinationStaionID,
	              RouteID: data.RouteID,
	              weekStr: weekStr,
	              TrainType: TrainType,
	              Timetables: Timetables
	            });
	          });
	          arr[idx] = rt;
	        });
	        return json;
	      });
	    }
	  };
	  this.catchData = catchData;
	  var methodList = Object.keys(this);
	  this.methodList = methodList;
	};

	metro.baseMethod = baseMethod;

	var companyTag$1 = metro.getCompanyTag('trtc');
	var mrtPTXFn = new metro.baseMethod(companyTag$1);
	var catchData = mrtPTXFn.catchData; //Catch Data 資料預處理

	mrtPTXFn.catchData.config.Line_callback = function (json) {
	  json.forEach(function (Line) {
	    var TravelTime = Line.TravelTime,
	        tmpA,
	        tmpB,
	        main = [];
	    Line.Route.forEach(function (Route) {
	      if (main.indexOf(Route.RouteID) == -1 && Route.RouteID != 'G-3' && Route.RouteID != 'R-3') main.push(Route.RouteID);
	      tmpA = TravelTime.find(function (rr) {
	        return !!(rr.RouteID == Route.RouteID);
	      });
	      var sameDir = !!(tmpA.TravelTimes[0].FromTo[0] == Route.Stations[0]);
	      var RunTime = [],
	          StopTime = [];

	      for (var i = 0; i < Route.Stations.length; i++) {
	        tmpB = tmpA.TravelTimes[i] || {
	          RunTime: 0,
	          StopTime: 0
	        };
	        RunTime.push(tmpB.RunTime);
	        StopTime.push(tmpB.StopTime);
	      }

	      if (!sameDir) {
	        //與 Route 同方向時，每一站同一 index , RunTime 儲存本站到下一站要開多久 , StopTime 儲存本站要停多久 ; 不同時反轉陣列，RunTime 位移一站再補終站 0
	        RunTime.reverse().shift();
	        RunTime.push(0);
	        StopTime.reverse();
	      }

	      Route.TravelTime = {
	        RunTime: RunTime,
	        StopTime: StopTime
	      };
	    });
	    delete Line.TravelTime;
	    Line.main = main;
	  });
	  return json;
	};

	catchData.calcBRLineTime = function () {
	  var RouteName = 'BR-1';
	  var LineObj = catchData.getDataXLineObj('BR');

	  var Route = [];
	  Route.push(LineObj.Route.find(function (c) {
	    return c.RouteID == RouteName && c.Direction == 0;
	  }));
	  Route.push(LineObj.Route.find(function (c) {
	    return c.RouteID == RouteName && c.Direction == 1;
	  })); //2.把起站依照間距排出全日時刻表 , 按照 Frequency 數量分出要建立幾組時刻表

	  var startStationTime = [{
	    StationID: Route[0].Stations[0],
	    DepTime: catchData.calcStationTimeByHeadWays(LineObj, Route[0].Stations[0], RouteName, 0)
	  }, {
	    StationID: Route[1].Stations[0],
	    DepTime: catchData.calcStationTimeByHeadWays(LineObj, Route[1].Stations[0], RouteName, 1)
	  }]; //3.用 RunTime 與 StopTime 計算全線時刻表

	  var tmpTrainTime = [];
	  startStationTime.forEach(function (dirObj, Direction) {
	    //分方向
	    dirObj.DepTime.forEach(function (c) {
	      //分星期幾運行
	      c.trainTime = [];
	      c.stationTime = [];
	      c.stationList = [];
	      c.time.forEach(function (t) {
	        //算全線時間
	        tmpTrainTime = catchData.calcLineTimeByFirstStation(LineObj, dirObj.StationID, t, RouteName, Direction);
	        tmpTrainTime.forEach(function (stt, stidx) {
	          c.stationTime[stidx] = c.stationTime[stidx] || [];
	          c.stationTime[stidx].push(stt);
	          c.stationList.push(Route[Direction].Stations[stidx]);
	        });
	        c.trainTime.push(tmpTrainTime);
	      });
	      c.To = c.stationList[c.stationList.length - 1];
	      var firstTrainTime = c.trainTime[0];
	      var otherStationStartTrainTime = [];
	      c.stationList.forEach(function (stid, stidx) {
	        var stObj = catchData.getDataXStationData(stid);
	        var firstLastInfo = stObj.FirstLast.find(function (fs) {
	          return fs.To == c.To;
	        });
	        var advBackTime = false,
	            tmpAdvRealTime = [];

	        if (firstLastInfo) {
	          var firstTime = firstLastInfo.Time[0];

	          if (CM.transTime2Sec(firstTime) + 60 < CM.transTime2Sec(firstTrainTime[stidx])) {
	            tmpAdvRealTime = catchData.calcLineTimeByFirstStation(LineObj, stid, firstTime, RouteName, Direction);
	            advBackTime = new Array(stidx).concat(tmpAdvRealTime);
	            firstTrainTime = advBackTime;
	            otherStationStartTrainTime.push(advBackTime);
	            advBackTime.forEach(function (stt, stidx) {
	              if (stt) {
	                c.stationTime[stidx].push(stt);
	              }
	            });
	          }
	        }
	      });
	      c.trainTime = c.trainTime.concat(otherStationStartTrainTime);
	    });
	  }); //4.找沿線車站的首班發車時間，早於首站的第一班車且早超過班距最大值時補上該站起始的車到順位最前面，依序算到倒數第二站
	  //先跳過
	  //5.將時間轉化為 TimeSimple 格式

	  var timeBack = Route[0].Stations.map(function (st) {
	    return {
	      Direction: [[], []],
	      LineID: LineObj.LineID,
	      StationID: st
	    };
	  });
	  startStationTime.forEach(function (dirObj, dir) {
	    dirObj.DepTime.forEach(function (c, cidx) {
	      c.stationTime.forEach(function (stt, stidx) {
	        var aryTimes = stt.map(function (m) {
	          return m;
	        });
	        var targetStationID = c.stationList[stidx];
	        timeBack.find(function (st) {
	          return targetStationID == st.StationID;
	        }).Direction[dir].push({
	          RouteID: RouteName,
	          Timetables: aryTimes,
	          To: c.stationList[c.stationList.length - 1],
	          weekStr: c.weekStr
	        });
	      });
	    });
	  });
	  return timeBack;
	};

	var cachePTX = {
	  station: {}
	};
	var fnMRT = {
	  checkRouteIdOnUse: function checkRouteIdOnUse(RouteID, LineID) {
	    var lineData = this.getLineData(LineID);
	    var rt = false;

	    for (var i = 0; i < lineData.route.length; i++) {
	      for (var j = 0; j < lineData.route[i].work.length; j++) {
	        if (lineData.route[i].work[j].RouteID == RouteID) {
	          rt = true;
	          break;
	        }
	      }
	    }

	    return rt;
	  },
	  getLineData: function getLineData(id) {
	    var rt = false;
	    pData.trtc.line.forEach(function (c) {
	      if (c.id == id || c.LineID == id) {
	        rt = c;
	      }
	    });
	    return rt;
	  },
	  getLineID: function getLineID(id) {
	    return this.getLineData(id).LineID;
	  },
	  getOriginalLineByLineID: function getOriginalLineByLineID(LineID) {
	    var rt = false;
	    pData.trtc.line.forEach(function (c) {
	      if (c.LineID == LineID) {
	        rt = c;
	      }
	    });
	    return rt;
	  },
	  getStationData: function getStationData(id) {
	    var ary = pData.trtc.station_ary;
	    var stData = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].id == id) {
	        stData = ary[i];
	        break;
	      }
	    }

	    return stData;
	  },
	  getStationIDAry: function getStationIDAry(id) {
	    var ary = pData.trtc.station_ary;
	    var stData = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].id == id) {
	        stData = ary[i].StationID;
	        break;
	      }
	    }

	    return stData;
	  },
	  getStationID: function getStationID(id, lineOriginalID) {
	    var LineID = /^trtc/.test(lineOriginalID) ? this.getLineID(lineOriginalID) : lineOriginalID;
	    var stData = this.getStationIDAry(id);

	    if (!LineID) {
	      return false;
	    } else {
	      var rt = false,
	          lineCode = '',
	          codeLen = 0;
	      stData.forEach(function (c) {
	        if (/^[a-zA-Z]{1}\d{2}/gi.test(c)) {
	          codeLen = 1;
	        } else if (/^[a-zA-Z]{2}\d{2}/gi.test(c)) {
	          codeLen = 2;
	        }

	        lineCode = c.substr(0, codeLen);

	        if (lineCode == LineID) {
	          rt = c;
	        }
	      });
	      return rt;
	    }
	  },
	  getStationIDInWhatLine: function getStationIDInWhatLine(StatioinID) {
	    if (/^[a-zA-Z]{1}\d{2}/gi.test(StatioinID)) {
	      return StatioinID.substr(0, 1);
	    } else if (/^[a-zA-Z]{2}\d{2}/gi.test(StatioinID)) {
	      return StatioinID.substr(0, 2);
	    }
	  },
	  getStationTime: function getStationTime(LineID, StationID, w, cbFn) {
	    var targetID = false;
	    var me = this;

	    if (typeof StationID != 'string' && StationID.length == 2) {
	      targetID = StationID[1];
	      StationID = StationID[0];
	    }

	    var Week = false;
	    if (typeof w == 'number') Week = CM.ptxMRTWeekStr[w];
	    var mtStr = "$filter=LineID eq '" + LineID + "' and StationID eq '" + StationID + "'";
	    if (Week) mtStr += ' and ServiceDay/' + Week + ' eq true';
	    var url = CM.metroURL + '/StationTimeTable/TRTC?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
	    CM.pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表'); //產生暫存時刻表空間

	    if (!ptx.tempTimeTable.trtc) ptx.tempTimeTable.trtc = {};
	    if (!ptx.tempTimeTable.trtc[LineID]) ptx.tempTimeTable.trtc[LineID] = [];
	    if (!ptx.tempTimeTable.trtc[LineID][StationID]) ptx.tempTimeTable.trtc[LineID][StationID] = [];
	    ptx.tempTimeTable.trtc[LineID][StationID][w] = [[], []]; //Direction 0 and 1
	    //抓時刻表

	    ptx.getURL(url, function (json, e) {
	      if (e.status == CM.CONST_PTX_API_FAIL) {
	        cbFn(json);
	        return false;
	      }

	      json.forEach(function (routeA) {
	        var tmpAry = ptx.tempTimeTable.trtc[LineID][StationID][w];
	        var tmpTimeAry = routeA.Timetables.map(function (timeObj) {
	          timeObj.tt_sortTime = CM.transTime2Sec(timeObj.DepartureTime);
	          timeObj.RouteID = routeA.RouteID;
	          return timeObj;
	        });

	        if (me.checkRouteIdOnUse(routeA.RouteID, routeA.LineID)) {
	          if (routeA.Direction == 0) {
	            tmpAry[0] = tmpAry[0].concat(tmpTimeAry);
	          } else if (routeA.Direction == 1) {
	            tmpAry[1] = tmpAry[1].concat(tmpTimeAry);
	          }
	        }
	      });
	      var workAry = ptx.tempTimeTable.trtc[LineID][StationID][w];

	      var timeMakeFn = function timeMakeFn(c) {
	        return c.DepartureTime;
	      };

	      workAry[0] = workAry[0].sort(ptx.sortByTTSortTime); //在這一步之前都還是物件狀態時刻表，之後暫時改造成單一時刻表替換 rnwTimeTable

	      workAry[0] = workAry[0].map(timeMakeFn);
	      workAry[1] = workAry[1].sort(ptx.sortByTTSortTime);
	      workAry[1] = workAry[1].map(timeMakeFn);
	      cbFn(json);
	    });
	  },
	  getFormatStationTime: function getFormatStationTime(stID, line, dir, w) {
	    w = parseInt(w);
	    var StationID = ptx.trtc.getStationID(stID, line);
	    var LineID = ptx.trtc.getLineID(line);
	    if (!ptx.tempTimeTable.trtc) return false;
	    if (!ptx.tempTimeTable.trtc[LineID]) return false;
	    if (!ptx.tempTimeTable.trtc[LineID][StationID]) return false;
	    if (!ptx.tempTimeTable.trtc[LineID][StationID][w]) return false;
	    if (!ptx.tempTimeTable.trtc[LineID][StationID][w][dir]) return false;
	    if (ptx.tempTimeTable.trtc[LineID][StationID][w][dir].length == 0) return false;
	    return ptx.tempTimeTable.trtc[LineID][StationID][w][dir];
	  },
	  getOriginalStationID: function getOriginalStationID(StationID) {
	    var ary = pData.trtc.station_ary;
	    var stData = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].StationID.indexOf(StationID) != -1) {
	        stData = ary[i].id;
	        break;
	      }
	    }

	    return stData;
	  },
	  //使用 PTX StationID 存取
	  getByStationID: function getByStationID(StationID) {
	    if (cachePTX.station[StationID]) return cachePTX.station[StationID];
	    var ttid = this.getOriginalStationID(StationID);
	    var data = this.getStationData(ttid);

	    if (data) {
	      data = JSON.parse(JSON.stringify(data));
	      data.targetStationID = StationID;
	      data.LineID = this.getStationIDInWhatLine(StationID);
	      cachePTX.station[StationID] = data;
	    }

	    return data;
	  }
	};
	mrtPTXFn.methodList.forEach(function (k) {
	  fnMRT[k] = mrtPTXFn[k];
	});

	var companyTag$2 = metro.getCompanyTag('tmrt');
	var mrtPTXFn$1 = new metro.baseMethod(companyTag$2); //Catch Data 資料預處理

	mrtPTXFn$1.catchData.config.Line_callback = function (json) {
	  json.forEach(function (Line) {
	    var TravelTime = Line.TravelTime,
	        tmpA,
	        tmpB;
	    Line.Route.forEach(function (Route) {
	      tmpA = TravelTime.find(function (rr) {
	        return !!(rr.RouteID == Route.RouteID);
	      }); //TravelTimes 有重複值要先濾除

	      var alreadyWriteStation = [],
	          aryTravelTimes = [];
	      tmpA.TravelTimes.forEach(function (c, idx, arr) {
	        if (alreadyWriteStation.indexOf(c.FromTo[0]) == -1) {
	          aryTravelTimes.push(c);
	          alreadyWriteStation.push(c.FromTo[0]);
	        }
	      });
	      var sameDir = !!(aryTravelTimes[0].FromTo[0] == Route.Stations[0]);
	      var RunTime = [],
	          StopTime = [];

	      for (var i = 0; i < Route.Stations.length; i++) {
	        tmpB = aryTravelTimes[i] || {
	          RunTime: 0,
	          StopTime: 0
	        };
	        RunTime.push(tmpB.RunTime);
	        StopTime.push(tmpB.StopTime);
	      }

	      if (!sameDir) {
	        //與 Route 同方向時，每一站同一 index , RunTime 儲存本站到下一站要開多久 , StopTime 儲存本站要停多久 ; 不同時反轉陣列，RunTime 位移一站再補終站 0
	        RunTime.reverse().shift();
	        RunTime.push(0);
	        StopTime.reverse();
	      }

	      Route.TravelTime = {
	        RunTime: RunTime,
	        StopTime: StopTime
	      };
	    });
	    delete Line.TravelTime;
	  });
	  return json;
	};

	var fnMRT$1 = {
	  checkRouteIdOnUse: function checkRouteIdOnUse(RouteID, LineID) {
	    var lineData = this.getLineData(LineID);
	    var rt = false;

	    for (var i = 0; i < lineData.route.length; i++) {
	      for (var j = 0; j < lineData.route[i].work.length; j++) {
	        if (lineData.route[i].work[j].RouteID == RouteID) {
	          rt = true;
	          break;
	        }
	      }
	    }

	    return rt;
	  },
	  getLineData: function getLineData(id) {
	    var rt = false;
	    pData.tmrt.line.forEach(function (c) {
	      if (c.id == id || c.LineID == id) {
	        rt = c;
	      }
	    });
	    return rt;
	  },
	  getLineID: function getLineID(id) {
	    return this.getLineData(id).LineID;
	  },
	  getOriginalLineByLineID: function getOriginalLineByLineID(LineID) {
	    var rt = false;
	    pData.tmrt.line.forEach(function (c) {
	      if (c.LineID == LineID) {
	        rt = c;
	      }
	    });
	    return rt;
	  },
	  getStationIDAry: function getStationIDAry(id) {
	    var ary = pData.tmrt.station_ary;
	    var stData = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].id == id) {
	        stData = ary[i].StationID;
	        break;
	      }
	    }

	    return stData;
	  },
	  getStationID: function getStationID(id, lineOriginalID) {
	    var LineID = /^tmrt/.test(lineOriginalID) ? this.getLineID(lineOriginalID) : lineOriginalID;
	    var stData = this.getStationIDAry(id);

	    if (!LineID) {
	      return false;
	    } else {
	      var rt = false,
	          lineCode = '',
	          codeLen = 0;
	      stData.forEach(function (c) {
	        if (/^[a-zA-Z]{1}\d{2}/gi.test(c)) {
	          codeLen = 1;
	        } else if (/^[a-zA-Z]{2}\d{2}/gi.test(c)) {
	          codeLen = 2;
	        }

	        lineCode = c.substr(0, codeLen);

	        if (lineCode == LineID) {
	          rt = c;
	        }
	      });
	      return rt;
	    }
	  },
	  getStationIDInWhatLine: function getStationIDInWhatLine(StatioinID) {
	    if (/^[a-zA-Z]{1}\d{2}/gi.test(StatioinID)) {
	      return StatioinID.substr(0, 1);
	    } else if (/^[a-zA-Z]{2}\d{2}/gi.test(StatioinID)) {
	      return StatioinID.substr(0, 2);
	    }
	  },
	  getStationTime: function getStationTime(LineID, StationID, w, cbFn) {
	    var targetID = false;
	    var me = this;

	    if (typeof StationID != 'string' && StationID.length == 2) {
	      targetID = StationID[1];
	      StationID = StationID[0];
	    }

	    var Week = false;
	    if (typeof w == 'number') Week = CM.ptxMRTWeekStr[w];
	    var mtStr = "$filter=LineID eq '" + LineID + "' and StationID eq '" + StationID + "'";
	    if (Week) mtStr += ' and ServiceDay/' + Week + ' eq true';
	    var url = CM.metroURL + '/StationTimeTable/TMRT?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
	    CM.pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表'); //產生暫存時刻表空間

	    if (!ptx.tempTimeTable.tmrt) ptx.tempTimeTable.tmrt = {};
	    if (!ptx.tempTimeTable.tmrt[LineID]) ptx.tempTimeTable.tmrt[LineID] = [];
	    if (!ptx.tempTimeTable.tmrt[LineID][StationID]) ptx.tempTimeTable.tmrt[LineID][StationID] = [];
	    ptx.tempTimeTable.tmrt[LineID][StationID][w] = [[], []]; //Direction 0 and 1
	    //抓時刻表

	    ptx.getURL(url, function (json, e) {
	      if (e.status == CM.CONST_PTX_API_FAIL) {
	        cbFn(json);
	        return false;
	      }

	      json.forEach(function (routeA) {
	        var tmpAry = ptx.tempTimeTable.tmrt[LineID][StationID][w];
	        var tmpTimeAry = routeA.Timetables.map(function (timeObj) {
	          timeObj.tt_sortTime = CM.transTime2Sec(timeObj.DepartureTime);
	          timeObj.RouteID = routeA.RouteID;
	          return timeObj;
	        });

	        if (me.checkRouteIdOnUse(routeA.RouteID, routeA.LineID)) {
	          if (routeA.Direction == 0) {
	            tmpAry[0] = tmpAry[0].concat(tmpTimeAry);
	          } else if (routeA.Direction == 1) {
	            tmpAry[1] = tmpAry[1].concat(tmpTimeAry);
	          }
	        }
	      });
	      var workAry = ptx.tempTimeTable.tmrt[LineID][StationID][w];

	      var timeMakeFn = function timeMakeFn(c) {
	        return c.DepartureTime;
	      };

	      workAry[0] = workAry[0].sort(ptx.sortByTTSortTime); //在這一步之前都還是物件狀態時刻表，之後暫時改造成單一時刻表替換 rnwTimeTable

	      workAry[0] = workAry[0].map(timeMakeFn);
	      workAry[1] = workAry[1].sort(ptx.sortByTTSortTime);
	      workAry[1] = workAry[1].map(timeMakeFn);
	      cbFn(json);
	    });
	  },
	  getFormatStationTime: function getFormatStationTime(stID, line, dir, w) {
	    w = parseInt(w);
	    var StationID = ptx.tmrt.getStationID(stID, line);
	    var LineID = ptx.tmrt.getLineID(line);
	    if (!ptx.tempTimeTable.tmrt) return false;
	    if (!ptx.tempTimeTable.tmrt[LineID]) return false;
	    if (!ptx.tempTimeTable.tmrt[LineID][StationID]) return false;
	    if (!ptx.tempTimeTable.tmrt[LineID][StationID][w]) return false;
	    if (!ptx.tempTimeTable.tmrt[LineID][StationID][w][dir]) return false;
	    if (ptx.tempTimeTable.tmrt[LineID][StationID][w][dir].length == 0) return false;
	    return ptx.tempTimeTable.tmrt[LineID][StationID][w][dir];
	  },
	  getOriginalStationID: function getOriginalStationID(StationID) {
	    var ary = pData.tmrt.station_ary;
	    var stData = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].StationID.indexOf(StationID) != -1) {
	        stData = ary[i].id;
	        break;
	      }
	    }

	    return stData;
	  }
	};
	mrtPTXFn$1.methodList.forEach(function (k) {
	  fnMRT$1[k] = mrtPTXFn$1[k];
	});

	var companyTag$3 = metro.getCompanyTag('krtc');
	var mrtPTXFn$2 = new metro.baseMethod(companyTag$3); //Catch Data 資料預處理

	mrtPTXFn$2.catchData.config.Line_callback = function (json) {
	  json.forEach(function (Line) {
	    var TravelTime = Line.TravelTime,
	        tmpA,
	        tmpB;
	    Line.Route.forEach(function (Route) {
	      tmpA = TravelTime.find(function (rr) {
	        return !!(rr.RouteID == Route.RouteID);
	      }); //高雄捷運 TravelTimes 有重複值要先濾除

	      var alreadyWriteStation = [],
	          aryTravelTimes = [];
	      tmpA.TravelTimes.forEach(function (c, idx, arr) {
	        if (alreadyWriteStation.indexOf(c.FromTo[0]) == -1) {
	          if (c.FromTo[0] == 'R11' && alreadyWriteStation.indexOf('R10') == -1) {
	            //PTX Bug : 高雄紅線 Travel Time 漏掉 R10 to R11 
	            aryTravelTimes.push({
	              RunTime: 180,
	              StopTime: 40
	            });
	          }

	          aryTravelTimes.push(c);
	          alreadyWriteStation.push(c.FromTo[0]);
	        }
	      });
	      var sameDir = !!(aryTravelTimes[0].FromTo[0] == Route.Stations[0]);
	      var RunTime = [],
	          StopTime = [];

	      for (var i = 0; i < Route.Stations.length; i++) {
	        tmpB = aryTravelTimes[i] || {
	          RunTime: 0,
	          StopTime: 0
	        };
	        RunTime.push(tmpB.RunTime);
	        StopTime.push(tmpB.StopTime);
	      }

	      if (!sameDir) {
	        //與 Route 同方向時，每一站同一 index , RunTime 儲存本站到下一站要開多久 , StopTime 儲存本站要停多久 ; 不同時反轉陣列，RunTime 位移一站再補終站 0
	        RunTime.reverse().shift();
	        RunTime.push(0);
	        StopTime.reverse();
	      }

	      Route.TravelTime = {
	        RunTime: RunTime,
	        StopTime: StopTime
	      };
	    });
	    delete Line.TravelTime;
	  });
	  return json;
	};

	var fnMRT$2 = {
	  checkRouteIdOnUse: function checkRouteIdOnUse(RouteID, LineID) {
	    var lineData = this.getLineData(LineID);
	    var rt = false;

	    for (var i = 0; i < lineData.route.length; i++) {
	      for (var j = 0; j < lineData.route[i].work.length; j++) {
	        if (lineData.route[i].work[j].RouteID == RouteID) {
	          rt = true;
	          break;
	        }
	      }
	    }

	    return rt;
	  },
	  getLineData: function getLineData(id) {
	    var rt = false;
	    pData.krtc.line.forEach(function (c) {
	      if (c.id == id || c.LineID == id) {
	        rt = c;
	      }
	    });
	    return rt;
	  },
	  getLineID: function getLineID(id) {
	    return this.getLineData(id).LineID;
	  },
	  getOriginalLineByLineID: function getOriginalLineByLineID(LineID) {
	    var rt = false;
	    pData.krtc.line.forEach(function (c) {
	      if (c.LineID == LineID) {
	        rt = c;
	      }
	    });
	    return rt;
	  },
	  getStationIDAry: function getStationIDAry(id) {
	    var ary = pData.krtc.station_ary;
	    var stData = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].id == id) {
	        stData = ary[i].StationID;
	        break;
	      }
	    }

	    return stData;
	  },
	  getStationID: function getStationID(id, lineOriginalID) {
	    var LineID = /^krtc/.test(lineOriginalID) ? this.getLineID(lineOriginalID) : lineOriginalID;
	    var stData = this.getStationIDAry(id);

	    if (!LineID) {
	      return false;
	    } else {
	      var rt = false,
	          lineCode = '',
	          codeLen = 0;
	      stData.forEach(function (c) {
	        if (/^[a-zA-Z]{1}\d{2}/gi.test(c)) {
	          codeLen = 1;
	        } else if (/^[a-zA-Z]{2}\d{2}/gi.test(c)) {
	          codeLen = 2;
	        }

	        lineCode = c.substr(0, codeLen);

	        if (lineCode == LineID) {
	          rt = c;
	        }
	      });
	      return rt;
	    }
	  },
	  getStationIDInWhatLine: function getStationIDInWhatLine(StatioinID) {
	    if (/^[a-zA-Z]{1}\d{2}/gi.test(StatioinID)) {
	      return StatioinID.substr(0, 1);
	    } else if (/^[a-zA-Z]{2}\d{2}/gi.test(StatioinID)) {
	      return StatioinID.substr(0, 2);
	    }
	  },
	  getStationTime: function getStationTime(LineID, StationID, w, cbFn) {
	    var targetID = false;
	    var me = this;

	    if (typeof StationID != 'string' && StationID.length == 2) {
	      targetID = StationID[1];
	      StationID = StationID[0];
	    }

	    var Week = false;
	    if (typeof w == 'number') Week = CM.ptxMRTWeekStr[w];
	    var mtStr = "$filter=LineID eq '" + LineID + "' and StationID eq '" + StationID + "'";
	    if (Week) mtStr += ' and ServiceDay/' + Week + ' eq true';
	    var url = CM.metroURL + '/StationTimeTable/KRTC?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
	    CM.pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表'); //產生暫存時刻表空間

	    if (!ptx.tempTimeTable.krtc) ptx.tempTimeTable.krtc = {};
	    if (!ptx.tempTimeTable.krtc[LineID]) ptx.tempTimeTable.krtc[LineID] = [];
	    if (!ptx.tempTimeTable.krtc[LineID][StationID]) ptx.tempTimeTable.krtc[LineID][StationID] = [];
	    ptx.tempTimeTable.krtc[LineID][StationID][w] = [[], []]; //Direction 0 and 1
	    //抓時刻表

	    ptx.getURL(url, function (json, e) {
	      if (e.status == CM.CONST_PTX_API_FAIL) {
	        cbFn(json);
	        return false;
	      }

	      json.forEach(function (routeA) {
	        var tmpAry = ptx.tempTimeTable.krtc[LineID][StationID][w];
	        var tmpTimeAry = routeA.Timetables.map(function (timeObj) {
	          timeObj.tt_sortTime = CM.transTime2Sec(timeObj.DepartureTime);
	          timeObj.RouteID = routeA.RouteID;
	          return timeObj;
	        });

	        if (me.checkRouteIdOnUse(routeA.RouteID, routeA.LineID)) {
	          if (routeA.Direction == 0) {
	            tmpAry[0] = tmpAry[0].concat(tmpTimeAry);
	          } else if (routeA.Direction == 1) {
	            tmpAry[1] = tmpAry[1].concat(tmpTimeAry);
	          }
	        }
	      });
	      var workAry = ptx.tempTimeTable.krtc[LineID][StationID][w];

	      var timeMakeFn = function timeMakeFn(c) {
	        return c.DepartureTime;
	      };

	      workAry[0] = workAry[0].sort(ptx.sortByTTSortTime); //在這一步之前都還是物件狀態時刻表，之後暫時改造成單一時刻表替換 rnwTimeTable

	      workAry[0] = workAry[0].map(timeMakeFn);
	      workAry[1] = workAry[1].sort(ptx.sortByTTSortTime);
	      workAry[1] = workAry[1].map(timeMakeFn);
	      cbFn(json);
	    });
	  },
	  getFormatStationTime: function getFormatStationTime(stID, line, dir, w) {
	    w = parseInt(w);
	    var StationID = ptx.krtc.getStationID(stID, line);
	    var LineID = ptx.krtc.getLineID(line);
	    if (!ptx.tempTimeTable.krtc) return false;
	    if (!ptx.tempTimeTable.krtc[LineID]) return false;
	    if (!ptx.tempTimeTable.krtc[LineID][StationID]) return false;
	    if (!ptx.tempTimeTable.krtc[LineID][StationID][w]) return false;
	    if (!ptx.tempTimeTable.krtc[LineID][StationID][w][dir]) return false;
	    if (ptx.tempTimeTable.krtc[LineID][StationID][w][dir].length == 0) return false;
	    return ptx.tempTimeTable.krtc[LineID][StationID][w][dir];
	  },
	  getOriginalStationID: function getOriginalStationID(StationID) {
	    var ary = pData.krtc.station_ary;
	    var stData = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].StationID.indexOf(StationID) != -1) {
	        stData = ary[i].id;
	        break;
	      }
	    }

	    return stData;
	  }
	};
	mrtPTXFn$2.methodList.forEach(function (k) {
	  fnMRT$2[k] = mrtPTXFn$2[k];
	});

	var companyTag$4 = metro.getCompanyTag('tymetro');
	var mrtPTXFn$3 = new metro.baseMethod(companyTag$4); //修正桃園捷運的 function

	mrtPTXFn$3.catchData.config.Line_S2STravelTime_BackTag = ['LineID', 'RouteID', 'TrainType', 'LineNo', 'TravelTimes'];
	mrtPTXFn$3.catchData.config.Line_Frequency_BackTag = ['LineID', 'RouteID', 'TrainType', 'LineNo', 'ServiceDays', 'OperationTime', 'Headways'];
	mrtPTXFn$3.catchData.config.Station_FirstLastTimetable_BackTag = ['LineID', 'StationID', 'TrainType', 'DestinationStaionID', 'FirstTrainTime', 'LastTrainTime'];
	mrtPTXFn$3.catchData.config.Station_Fare_BackTag = ['OriginStationID', 'DestinationStationID', 'Fares', 'TrainType']; //Catch Data 資料預處理

	mrtPTXFn$3.catchData.config.Line_callback = function (json) {
	  json.forEach(function (Line) {
	    if (Line.LineID == 'A') {
	      var TravelTime = Line.TravelTime;
	      var TravelTimeTrainType1 = {},
	          TravelTimeTrainType2 = {};
	      TravelTime.forEach(function (TRTM, Tidx) {
	        var objA = TRTM.TrainType == 1 ? TravelTimeTrainType1 : TravelTimeTrainType2;
	        TRTM.TravelTimes.forEach(function (c) {
	          if (!objA[c.FromTo[0]]) objA[c.FromTo[0]] = {};
	          objA[c.FromTo[0]][c.FromTo[1]] = c.RunTime;
	        });
	        TravelTime[Tidx] = undefined;
	      });
	      Line.TravelTimeBetween = {
	        "TrainType1": TravelTimeTrainType1,
	        "TrainType2": TravelTimeTrainType2
	      };
	    }
	  });
	  return json;
	};

	var fnMRT$3 = {
	  checkRouteIdOnUse: function checkRouteIdOnUse(RouteID, LineID) {
	    var lineData = this.getLineData(LineID);
	    var rt = false;

	    for (var i = 0; i < lineData.route.length; i++) {
	      for (var j = 0; j < lineData.route[i].work.length; j++) {
	        if (lineData.route[i].work[j].RouteID == RouteID) {
	          rt = true;
	          break;
	        }
	      }
	    }

	    return rt;
	  },
	  getLineData: function getLineData(id) {
	    var rt = false;
	    pData.tymetro.line.forEach(function (c) {
	      if (c.id == id || c.LineID == id) {
	        rt = c;
	      }
	    });
	    return rt;
	  },
	  getLineID: function getLineID(id) {
	    return this.getLineData(id).LineID;
	  },
	  getOriginalLineByLineID: function getOriginalLineByLineID(LineID) {
	    var rt = false;
	    pData.tymetro.line.forEach(function (c) {
	      if (c.LineID == LineID) {
	        rt = c;
	      }
	    });
	    return rt;
	  },
	  getStationIDAry: function getStationIDAry(id) {
	    var ary = pData.tymetro.station_ary;
	    var stData = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].id == id) {
	        stData = ary[i].StationID;
	        break;
	      }
	    }

	    return stData;
	  },
	  getStationID: function getStationID(id, lineOriginalID) {
	    var LineID = /^tymetro/.test(lineOriginalID) ? this.getLineID(lineOriginalID) : lineOriginalID;
	    var stData = this.getStationIDAry(id);

	    if (!LineID) {
	      return false;
	    } else {
	      var rt = false,
	          lineCode = '',
	          codeLen = 0;
	      stData.forEach(function (c) {
	        if (/^[a-zA-Z]{1}\d{2}/gi.test(c)) {
	          codeLen = 1;
	        } else if (/^[a-zA-Z]{2}\d{2}/gi.test(c)) {
	          codeLen = 2;
	        }

	        lineCode = c.substr(0, codeLen);

	        if (lineCode == LineID) {
	          rt = c;
	        }
	      });
	      return rt;
	    }
	  },
	  getStationIDInWhatLine: function getStationIDInWhatLine(StatioinID) {
	    if (/^[a-zA-Z]{1}\d{2}/gi.test(StatioinID)) {
	      return StatioinID.substr(0, 1);
	    } else if (/^[a-zA-Z]{2}\d{2}/gi.test(StatioinID)) {
	      return StatioinID.substr(0, 2);
	    }
	  },
	  getStationTime: function getStationTime(LineID, StationID, w, cbFn) {
	    var targetID = false;
	    var me = this;

	    if (typeof StationID != 'string' && StationID.length == 2) {
	      targetID = StationID[1];
	      StationID = StationID[0];
	    }

	    var Week = false;
	    if (typeof w == 'number') Week = CM.ptxMRTWeekStr[w];
	    var mtStr = "$filter=LineID eq '" + LineID + "' and StationID eq '" + StationID + "'";
	    if (Week) mtStr += ' and ServiceDays/' + Week + ' eq true';
	    var url = CM.metroURL + '/StationTimeTable/TYMC?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
	    CM.pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表'); //產生暫存時刻表空間

	    if (!ptx.tempTimeTable.tymetro) ptx.tempTimeTable.tymetro = {};
	    if (!ptx.tempTimeTable.tymetro[LineID]) ptx.tempTimeTable.tymetro[LineID] = [];
	    if (!ptx.tempTimeTable.tymetro[LineID][StationID]) ptx.tempTimeTable.tymetro[LineID][StationID] = [];
	    ptx.tempTimeTable.tymetro[LineID][StationID][w] = [[], []]; //Direction 0 and 1
	    //抓時刻表

	    ptx.getURL(url, function (json, e) {
	      if (e.status == CM.CONST_PTX_API_FAIL) {
	        cbFn(json);
	        return false;
	      }

	      json.forEach(function (routeA) {
	        var tmpAry = ptx.tempTimeTable.tymetro[LineID][StationID][w];
	        var tmpTimeAry = routeA.Timetables.map(function (timeObj) {
	          timeObj.tt_sortTime = CM.transTime2Sec(timeObj.DepartureTime);
	          timeObj.RouteID = routeA.RouteID;
	          return timeObj;
	        });

	        if (me.checkRouteIdOnUse(routeA.RouteID, routeA.LineID)) {
	          if (routeA.Direction == 0) {
	            tmpAry[0] = tmpAry[0].concat(tmpTimeAry);
	          } else if (routeA.Direction == 1) {
	            tmpAry[1] = tmpAry[1].concat(tmpTimeAry);
	          }
	        }
	      });
	      var workAry = ptx.tempTimeTable.tymetro[LineID][StationID][w];

	      var timeMakeFn = function timeMakeFn(c) {
	        return c.DepartureTime;
	      };

	      workAry[0] = workAry[0].sort(ptx.sortByTTSortTime); //在這一步之前都還是物件狀態時刻表，之後暫時改造成單一時刻表替換 rnwTimeTable

	      workAry[0] = workAry[0].map(timeMakeFn);
	      workAry[1] = workAry[1].sort(ptx.sortByTTSortTime);
	      workAry[1] = workAry[1].map(timeMakeFn);
	      cbFn(json);
	    });
	  },
	  getFormatStationTime: function getFormatStationTime(stID, line, dir, w) {
	    w = parseInt(w);
	    var StationID = ptx.tymetro.getStationID(stID, line);
	    var LineID = ptx.tymetro.getLineID(line);
	    if (!ptx.tempTimeTable.tymetro) return false;
	    if (!ptx.tempTimeTable.tymetro[LineID]) return false;
	    if (!ptx.tempTimeTable.tymetro[LineID][StationID]) return false;
	    if (!ptx.tempTimeTable.tymetro[LineID][StationID][w]) return false;
	    if (!ptx.tempTimeTable.tymetro[LineID][StationID][w][dir]) return false;
	    if (ptx.tempTimeTable.tymetro[LineID][StationID][w][dir].length == 0) return false;
	    return ptx.tempTimeTable.tymetro[LineID][StationID][w][dir];
	  },
	  getOriginalStationID: function getOriginalStationID(StationID) {
	    var ary = pData.tymetro.station_ary;
	    var stData = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].StationID.indexOf(StationID) != -1) {
	        stData = ary[i].id;
	        break;
	      }
	    }

	    return stData;
	  }
	};
	mrtPTXFn$3.methodList.forEach(function (k) {
	  fnMRT$3[k] = mrtPTXFn$3[k];
	});

	var companyTag$5 = metro.getCompanyTag('klrt');
	var mrtPTXFn$4 = new metro.baseMethod(companyTag$5);
	var fnMRT$4 = {
	  checkRouteIdOnUse: function checkRouteIdOnUse(RouteID, LineID) {
	    var lineData = this.getLineData(LineID);
	    var rt = false;

	    for (var i = 0; i < lineData.route.length; i++) {
	      for (var j = 0; j < lineData.route[i].work.length; j++) {
	        if (lineData.route[i].work[j].RouteID == RouteID) {
	          rt = true;
	          break;
	        }
	      }
	    }

	    return rt;
	  },
	  getLineData: function getLineData(id) {
	    var rt = false;
	    pData.klrt.line.forEach(function (c) {
	      if (c.id == id || c.LineID == id) {
	        rt = c;
	      }
	    });
	    return rt;
	  },
	  getLineID: function getLineID(id) {
	    return this.getLineData(id).LineID;
	  },
	  getOriginalLineByLineID: function getOriginalLineByLineID(LineID) {
	    var rt = false;
	    pData.klrt.line.forEach(function (c) {
	      if (c.LineID == LineID) {
	        rt = c;
	      }
	    });
	    return rt;
	  },
	  getStationIDAry: function getStationIDAry(id) {
	    var ary = pData.klrt.station_ary;
	    var stData = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].id == id) {
	        stData = ary[i].StationID;
	        break;
	      }
	    }

	    return stData;
	  },
	  getStationID: function getStationID(id, lineOriginalID) {
	    var LineID = /^klrt/.test(lineOriginalID) ? this.getLineID(lineOriginalID) : lineOriginalID;
	    var stData = this.getStationIDAry(id);

	    if (!LineID) {
	      return false;
	    } else {
	      var rt = false,
	          lineCode = '',
	          codeLen = 0;
	      stData.forEach(function (c) {
	        if (/^[a-zA-Z]{1}\d{2}/gi.test(c)) {
	          codeLen = 1;
	        } else if (/^[a-zA-Z]{2}\d{2}/gi.test(c)) {
	          codeLen = 2;
	        }

	        lineCode = c.substr(0, codeLen);

	        if (lineCode == LineID) {
	          rt = c;
	        }
	      });
	      return rt;
	    }
	  },
	  getStationIDInWhatLine: function getStationIDInWhatLine(StatioinID) {
	    if (/^[a-zA-Z]{1}\d{2}/gi.test(StatioinID)) {
	      return StatioinID.substr(0, 1);
	    } else if (/^[a-zA-Z]{2}\d{2}/gi.test(StatioinID)) {
	      return StatioinID.substr(0, 2);
	    }
	  },
	  getStationTime: function getStationTime(LineID, StationID, w, cbFn) {
	    var targetID = false;
	    var me = this;

	    if (typeof StationID != 'string' && StationID.length == 2) {
	      targetID = StationID[1];
	      StationID = StationID[0];
	    }

	    var Week = false;
	    if (typeof w == 'number') Week = CM.ptxMRTWeekStr[w];
	    var mtStr = "$filter=LineID eq '" + LineID + "' and StationID eq '" + StationID + "'";
	    if (Week) mtStr += ' and ServiceDay/' + Week + ' eq true';
	    var url = CM.metroURL + '/StationTimeTable/KLRT?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
	    CM.pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表'); //產生暫存時刻表空間

	    if (!ptx.tempTimeTable.klrt) ptx.tempTimeTable.klrt = {};
	    if (!ptx.tempTimeTable.klrt[LineID]) ptx.tempTimeTable.klrt[LineID] = [];
	    if (!ptx.tempTimeTable.klrt[LineID][StationID]) ptx.tempTimeTable.klrt[LineID][StationID] = [];
	    ptx.tempTimeTable.klrt[LineID][StationID][w] = [[], []]; //Direction 0 and 1
	    //抓時刻表

	    ptx.getURL(url, function (json, e) {
	      if (e.status == CM.CONST_PTX_API_FAIL) {
	        cbFn(json);
	        return false;
	      }

	      json.forEach(function (routeA) {
	        var tmpAry = ptx.tempTimeTable.klrt[LineID][StationID][w];
	        var tmpTimeAry = routeA.Timetables.map(function (timeObj) {
	          timeObj.tt_sortTime = CM.transTime2Sec(timeObj.DepartureTime);
	          timeObj.RouteID = routeA.RouteID;
	          return timeObj;
	        });

	        if (me.checkRouteIdOnUse(routeA.RouteID, routeA.LineID)) {
	          if (routeA.Direction == 0) {
	            tmpAry[0] = tmpAry[0].concat(tmpTimeAry);
	          } else if (routeA.Direction == 1) {
	            tmpAry[1] = tmpAry[1].concat(tmpTimeAry);
	          }
	        }
	      });
	      var workAry = ptx.tempTimeTable.klrt[LineID][StationID][w];

	      var timeMakeFn = function timeMakeFn(c) {
	        return c.DepartureTime;
	      };

	      workAry[0] = workAry[0].sort(ptx.sortByTTSortTime); //在這一步之前都還是物件狀態時刻表，之後暫時改造成單一時刻表替換 rnwTimeTable

	      workAry[0] = workAry[0].map(timeMakeFn);
	      workAry[1] = workAry[1].sort(ptx.sortByTTSortTime);
	      workAry[1] = workAry[1].map(timeMakeFn);
	      cbFn(json);
	    });
	  },
	  getFormatStationTime: function getFormatStationTime(stID, line, dir, w) {
	    w = parseInt(w);
	    var StationID = ptx.klrt.getStationID(stID, line);
	    var LineID = ptx.klrt.getLineID(line);
	    if (!ptx.tempTimeTable.klrt) return false;
	    if (!ptx.tempTimeTable.klrt[LineID]) return false;
	    if (!ptx.tempTimeTable.klrt[LineID][StationID]) return false;
	    if (!ptx.tempTimeTable.klrt[LineID][StationID][w]) return false;
	    if (!ptx.tempTimeTable.klrt[LineID][StationID][w][dir]) return false;
	    if (ptx.tempTimeTable.klrt[LineID][StationID][w][dir].length == 0) return false;
	    return ptx.tempTimeTable.klrt[LineID][StationID][w][dir];
	  },
	  getOriginalStationID: function getOriginalStationID(StationID) {
	    var ary = pData.klrt.station_ary;
	    var stData = false;

	    for (var i = 0; i < ary.length; i++) {
	      if (ary[i].StationID.indexOf(StationID) != -1) {
	        stData = ary[i].id;
	        break;
	      }
	    }

	    return stData;
	  }
	};
	mrtPTXFn$4.methodList.forEach(function (k) {
	  fnMRT$4[k] = mrtPTXFn$4[k];
	});

	var thsrV2URL = CM.thsrV2URL;
	var v2urls = {
	  Station: thsrV2URL + '/Station/',
	  //取得車站基本資料
	  ODFare: thsrV2URL + '/ODFare/',
	  //取得票價資料
	  GeneralTimetable: thsrV2URL + '/GeneralTimetable/',
	  //取得所有車次的定期時刻表資料
	  DailyTrainInfo_Today: thsrV2URL + '/DailyTrainInfo/Today/',
	  //取得當天所有車次的車次資料
	  DailyTimetable_Today: thsrV2URL + '/DailyTimetable/Today/',
	  //取得當天所有車次的時刻表資料
	  AlertInfo: thsrV2URL + '/AlertInfo',
	  //取得即時通阻事件資料
	  News: thsrV2URL + '/News',
	  //取得高鐵最新消息資料
	  Shape: thsrV2URL + '/Shape/',
	  //取得指定營運業者之軌道路網實體路線圖資資料
	  StationExit: thsrV2URL + '/StationExit/',
	  //取得車站基本資料
	  //以下為帶有變數的 API
	  ODFareFromTo: thsrV2URL + '/ODFare/{OriginStationID}/to/{DestinationStationID}',
	  //取得指定[起訖站間]之票價資料
	  GeneralTimetable_TrainNo: thsrV2URL + '/GeneralTimetable/TrainNo/{TrainNo}',
	  //取得指定[車次]的定期時刻表資料
	  DailyTrainInfo_Today_TrainNo: thsrV2URL + '/DailyTrainInfo/Today/TrainNo/{TrainNo}',
	  //取得當天指定[車次]的車次資料
	  DailyTrainInfo_TrainNo_TrainDate: thsrV2URL + '/DailyTrainInfo/TrainNo/{TrainNo}/TrainDate/{TrainDate}',
	  //取得指定[日期]與[車次]的車次資料
	  DailyTimetable_Today_TrainNo: thsrV2URL + '/DailyTimetable/Today/TrainNo/{TrainNo}',
	  //取得當天指定[車次]的時刻表資料
	  DailyTimetable_TrainDate_TrainDate: thsrV2URL + '/DailyTimetable/TrainDate/{TrainDate}',
	  //取得指定[日期]所有車次的時刻表資料
	  DailyTimetable_TrainNo_TrainDate: thsrV2URL + '/DailyTimetable/TrainNo/{TrainNo}/TrainDate/{TrainDate}',
	  //取得指定[日期],[車次]的時刻表資料
	  DailyTimetable_Station_TrainDate: thsrV2URL + '/DailyTimetable/Station/{StationID}/{TrainDate}',
	  //取得指定[日期],[車站]的站別時刻表資料
	  DailyTimetable_OD_TrainDate: thsrV2URL + '/DailyTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate}',
	  //取得指定[日期],[起迄站間]之站間時刻表資料
	  AvailableSeatStatusList: thsrV2URL + '/AvailableSeatStatusList/{StationID}' //取得動態指定[車站]的對號座剩餘座位資訊看板資料

	};
	var vars = {
	  queryCount: 10000,
	  format: 'JSON'
	};
	var getPTX$1 = ptx.getPromiseURL;

	function setDefaultCfg$1() {
	  var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  if (typeof cfg == 'string') cfg = {
	    paramDirectlyUse: cfg
	  }; //若傳入的為字串代表直接用於最後的參數不需再調整

	  cfg.cbFn = cfg.cbFn || function (data, e) {};

	  cfg.top = cfg.top || vars.queryCount;
	  cfg.format = vars.format;
	  return cfg;
	}

	function processCfg$1(cfg) {
	  //將 cfg 轉為對應的參數
	  if (cfg.paramDirectlyUse) return cfg.paramDirectlyUse;
	  var aryParam = [];
	  if (cfg.selectField) aryParam.push(ptx.selectFieldFn(cfg.selectField));
	  if (cfg.filterBy) aryParam.push(ptx.filterFn(cfg.filterBy));

	  if (cfg.orderBy) {
	    var dir = cfg.orderDir || false;
	    aryParam.push(ptx.orderByFn(cfg.orderBy, dir));
	  }

	  aryParam.push(ptx.topFn(cfg.top, cfg.format)); //最後加這個

	  return '?' + aryParam.join('&');
	}

	function useStationID2filterBy(StationID) {
	  var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  cfg.filterBy = cfg.filterBy || '';
	  cfg.filterBy += ptx.filterParam('StationID', '==', StationID);
	  return cfg;
	}

	var thsr = {
	  companyTag: 'THSR',
	  vars: vars
	};
	thsr.v2 = {
	  urls: v2urls,
	  getStationOfLine: function getStationOfLine() {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg.orderBy = 'StationID';
	    cfg.orderDir = 'ASC';
	    return thsr.v2._Station(cfg);
	  },
	  getStation: function getStation(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useStationID2filterBy(StationID, cfg);
	    return thsr.v2._Station(cfg);
	  },
	  getStationFare: function getStationFare(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg.filterBy = cfg.filterBy || '';
	    cfg.filterBy += ptx.filterParam('OriginStationID', '==', StationID);
	    return thsr.v2._ODFare(cfg);
	  },
	  getStationTodayTimeTable: function getStationTodayTimeTable(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var date = new Date();
	    var dateStr = date.getFullYear() + '-' + CM.appendNumber0(date.getMonth() + 1) + '-' + CM.appendNumber0(date.getDate());
	    return thsr.v2._DailyTimetable_Station_TrainDate(StationID, dateStr, cfg);
	  } //產生整包抓取 Function

	};
	var catchV2Data = {
	  config: {
	    Line_callback: function Line_callback(json) {
	      //通用預處理
	      return json;
	    },
	    Line_callback_final: function Line_callback_final(json) {
	      //私用預處理
	      return json;
	    }
	  },
	  getDataXStationData: function getDataXStationData(StationID) {
	    var rt = ptx.datax['thsr'].station.find(function (c) {
	      return !!(c.StationID == StationID);
	    });

	    if (rt) {
	      var dt = ptx.data.thsr.station_ary.find(function (c) {
	        return !!(c.id == StationID);
	      });

	      for (var k in dt) {
	        if (k == 'id') {
	          rt['ttid'] = 'thsr_' + dt[k];
	        } else if (!rt[k]) {
	          rt[k] = dt[k];
	        } else {
	          rt['data_' + k] = dt[k];
	        }
	      }
	    }

	    return rt;
	  },
	  getDataXStationName: function getDataXStationName(StationID, isEn) {
	    var st = catchV2Data.getDataXStationData(StationID);
	    return isEn ? st.ename : st.name;
	  },
	  GeneralTimetable: function GeneralTimetable(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //定期時刻表抓法  1.執行 thsr._GeneralTimetable

	    progressFn('取得時刻中');

	    var atTime = thsr.v2._GeneralTimetable().then(function (res) {
	      return res.data.map(function (c) {
	        c.GeneralTimetable.UpdateTime = c.UpdateTime;
	        c.GeneralTimetable.VersionID = c.VersionID;
	        return c.GeneralTimetable;
	      });
	    }).catch(function (res) {
	      return res;
	    });

	    return atTime;
	  },
	  Station: function Station(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
	    progressFn('取得車站中');
	    return thsr.v2._Station().then(function (res) {
	      return res.data.map(function (c) {
	        return {
	          StationID: c.StationID,
	          lat: c.StationPosition.PositionLat,
	          lon: c.StationPosition.PositionLon,
	          name: c.StationName.Zh_tw,
	          ename: c.StationName.En
	        };
	      });
	    }).catch(function (res) {
	      return res;
	    });
	  },
	  SimpleTimetable: function SimpleTimetable(progressFn) {
	    return catchV2Data.GeneralTimetable(progressFn).then(function (json) {
	      json.forEach(function (data, didx) {
	        var weekStr = [data.ServiceDay.Sunday, data.ServiceDay.Monday, data.ServiceDay.Tuesday, data.ServiceDay.Wednesday, data.ServiceDay.Thursday, data.ServiceDay.Friday, data.ServiceDay.Saturday].map(function (day, idx) {
	          return day ? idx.toString() : '';
	        }).join('');
	        data.weekStr = weekStr;
	        delete data.ServiceDay;
	        data.StopTimes.sort(function (a, b) {
	          return a.StopSequence > b.StopSequence ? 1 : -1;
	        });
	        data.stopTime = data.StopTimes.map(function (c) {
	          return {
	            Arr: c.ArrivalTime,
	            Dep: c.DepartureTime,
	            ID: c.StationID,
	            name: c.StationName.Zh_tw
	          };
	        });
	        delete data.StopTimes;
	        data.info = {};
	        var deleteKey = ['EndingStationName', 'StartingStationName'];

	        for (var k in data.GeneralTrainInfo) {
	          if (deleteKey.indexOf(k) == -1) {
	            data.info[k] = data.GeneralTrainInfo[k];
	          }
	        }

	        delete data.GeneralTrainInfo;

	        if (didx > 0) {
	          delete data.UpdateTime;
	          delete data.VersionID;
	        }
	      });
	      return json;
	    });
	  }
	};
	thsr.v2.catchData = catchV2Data; //自動產生 Function

	function makePTXV2_func(cmd, cfg) {
	  cfg = setDefaultCfg$1(cfg);
	  var param = processCfg$1(cfg);
	  return getPTX$1(v2urls[cmd] + param, cfg);
	}

	var aryMakeV2Function = Object.keys(v2urls);
	var ptxAutoTHSRV2FunctionKey = [];
	aryMakeV2Function.forEach(function (fn) {
	  if (!/\{/.test(v2urls[fn])) {
	    //排除要傳參數組 URL 的
	    thsr.v2['_' + fn] = function (cfg) {
	      return makePTXV2_func(fn, cfg);
	    };

	    ptxAutoTHSRV2FunctionKey.push('_' + fn);
	  } else {
	    //處理有動態參數的
	    var urlAry = v2urls[fn].split('/');
	    var paramCount = 0;
	    var paramAry = [];
	    urlAry.forEach(function (c) {
	      if (/^\{/.test(c)) {
	        paramCount++;
	        paramAry.push(c);
	      }
	    });

	    thsr.v2['_' + fn] = function () {
	      var ptr = 0;
	      var arg = arguments;
	      if (arg.length < paramCount) throw 'Lose parameter, need ' + paramAry.join();
	      var url = urlAry.map(function (c) {
	        if (/^\{/.test(c)) {
	          c = arg[ptr];
	          ptr++;
	        }

	        return c;
	      }).join('/');
	      var cfg = arguments[paramCount];
	      cfg = setDefaultCfg$1(cfg);
	      var param = processCfg$1(cfg);
	      return getPTX$1(url + param, cfg);
	    };
	  }
	});
	thsr.v2.ptxAutoTHSRFunctionKey = ptxAutoTHSRV2FunctionKey;
	thsr.v2.getFromToFare = thsr.v2._ODFareFromTo; //alias

	function getMRTStationIDInWhatLine(StatioinID) {
	  if (/^[a-zA-Z]{1}\d{2}/gi.test(StatioinID)) {
	    return StatioinID.substr(0, 1);
	  } else if (/^[a-zA-Z]{2}\d{2}/gi.test(StatioinID)) {
	    return StatioinID.substr(0, 2);
	  } else if (/^[a-zA-Z]{1}\d{1}/gi.test(StatioinID)) {
	    return StatioinID.substr(0, 1);
	  }
	} //====================== ID 轉換 ==============================


	function findData(ary, col, val) {
	  for (var i = 0; i < ary.length; i++) {
	    var colData = ary[i][col];

	    if (colData == val) {
	      return ary[i];
	    } else if (_typeof(colData) == 'object' && colData.length && colData.indexOf(val) >= 0) {
	      return ary[i];
	    }
	  }

	  return false;
	}

	function idTrans(objS) {
	  //objS.value 原始值放到 objS.from
	  //objS.Line 如果有多個 StationID 對應到一組 id 時用 Line 區別 
	  objS.returnType = objS.returnType || 'string'; //"string":只給對應 id。"data":給整個車站的 data obj。預設為 string

	  objS.fromType = objS.fromType || 'id'; //原來的車站 ID 格式，對應到 data 內的欄位名稱做搜尋匹配

	  objS.toType = objS.toType || 'id'; //轉換規則，對應到 data 內的欄位名稱給值，若 returnType 為 data 就不看了

	  if (objS.value.indexOf('_') > 0 && !objS.company) {
	    objS.company = objS.value.split('_')[0];
	  }

	  if (!objS.company) return false;
	  objS.from = objS.value; // if(/^tra/.test(objS.company) && objS.value.indexOf('_') > 0){ objS.from = objS.value.split('_')[1]; }

	  var stationAry = [],
	      stData = {},
	      tmpA = false,
	      rt = false;

	  switch (objS.company) {
	    case 'tra':
	      stationAry = pData.tra.station_ary;
	      stData = findData(stationAry, objS.fromType, objS.from);

	      if (stData) {
	        if (objS.returnType == 'string') {
	          rt = stData[objS.toType];
	        } else {
	          rt = stData;
	        }
	      }

	      break;

	    case 'trtc':
	      stationAry = pData.trtc.station_ary;
	      stData = findData(stationAry, objS.fromType, objS.from);

	      if (stData) {
	        if (objS.returnType == 'string') {
	          tmpA = stData[objS.toType];

	          if (_typeof(tmpA) == 'object' && tmpA.length && objS.LineID) {
	            if (/^trtc/.test(objS.LineID)) {
	              objS.LineID = findData(pData.trtc.line, 'id', objS.LineID)['LineID']; //如果給的是 rocptx 的路線 id 則於此處交換為 PTX 上操作 TRTC 的 LineID
	            }

	            var testReg = new RegExp('^' + objS.LineID + '[0-9]', 'i');
	            var returnValue = tmpA.find(function (k) {
	              return testReg.test(k);
	            });
	            rt = returnValue;
	          } else {
	            rt = stData[objS.toType];
	          }
	        } else {
	          rt = stData;
	        }
	      }

	      break;

	    case 'tymetro':
	      stationAry = pData.tymetro.station_ary;
	      stData = findData(stationAry, objS.fromType, objS.from);

	      if (stData) {
	        if (objS.returnType == 'string') {
	          tmpA = stData[objS.toType];

	          if (_typeof(tmpA) == 'object' && tmpA.length && objS.LineID) {
	            if (/^tymetro/.test(objS.LineID)) {
	              objS.LineID = findData(pData.tymetro.line, 'id', objS.LineID)['LineID']; //如果給的是 rocptx 的路線 id 則於此處交換為 PTX 上操作 TYMetro 的 LineID
	            }

	            var testReg = new RegExp('^' + objS.LineID + '[0-9]', 'i');
	            var returnValue = tmpA.find(function (k) {
	              return testReg.test(k);
	            });
	            rt = returnValue;
	          } else {
	            rt = stData[objS.toType];
	          }
	        } else {
	          rt = stData;
	        }
	      }

	      break;
	  }

	  return rt;
	}

	function mrtLineTrans(objS) {
	  //objS.value 原始值放到 objS.from
	  objS.returnType = objS.returnType || 'string'; //"string":只給對應 id。"data":給整個車站的 data obj。預設為 string

	  objS.fromType = objS.fromType || 'id'; //原來的車站 ID 格式，對應到 data 內的欄位名稱做搜尋匹配

	  objS.toType = objS.toType || 'LineID'; //轉換規則，對應到 data 內的欄位名稱給值，若 returnType 為 data 就不看了

	  if (!objS.company || !objS.value) return false;
	  var lineAry = [],
	      lineData = {},
	      rt = false;

	  switch (objS.company) {
	    case "trtc":
	      lineAry = pData.trtc.line;
	      lineData = findData(lineAry, objS.fromType, objS.value);

	      if (lineData) {
	        rt = objS.returnType == 'string' ? lineData[objS.toType] : lineData;
	      }

	      break;

	    case "tymetro":
	      lineAry = pData.tymetro.line;
	      lineData = findData(lineAry, objS.fromType, objS.value);

	      if (lineData) {
	        rt = objS.returnType == 'string' ? lineData[objS.toType] : lineData;
	      }

	      break;
	  }

	  return rt;
	}

	var thsr$1 = {
	  getPTXV2: function getPTXV2(id) {
	    return id.replace('thsr_', '');
	  },
	  getRPIDbyPTXV2: function getRPIDbyPTXV2(id) {
	    return 'thsr_' + id;
	  }
	};
	var tra = {
	  getPTXV2: function getPTXV2(id) {
	    if (id) id = id.replace(/^tra_/, '');
	    return id;
	  },
	  getPTXV3: function getPTXV3(id) {
	    if (!/^tra_/.test(id)) id = 'tra_' + id;
	    return idTrans({
	      company: 'tra',
	      value: id,
	      toType: 'v3id'
	    });
	  },
	  getPTXV3byV2: function getPTXV3byV2(id) {
	    id = 'tra_' + id;
	    return idTrans({
	      company: 'tra',
	      value: id,
	      toType: 'v3id'
	    });
	  },
	  getPTXV2byV3: function getPTXV2byV3(id) {
	    return this.getPTXV2(idTrans({
	      company: 'tra',
	      value: id.toString(),
	      fromType: 'v3id',
	      toType: 'id'
	    }));
	  },
	  getRPIDbyPTXV2: function getRPIDbyPTXV2(id) {
	    //rocptx station id
	    return 'tra_' + id;
	  },
	  getRPIDbyPTXV3: function getRPIDbyPTXV3(id) {
	    return idTrans({
	      company: 'tra',
	      value: id.toString(),
	      fromType: 'v3id',
	      toType: 'id'
	    });
	  }
	};
	var trtc = {
	  getPTXV2: function getPTXV2(id, line) {
	    var param = {
	      company: 'trtc',
	      value: id,
	      fromType: 'id',
	      toType: 'StationID'
	    };

	    if (line) {
	      param.LineID = line;
	    }

	    return idTrans(param);
	  },
	  getRPIDbyPTXV2: function getRPIDbyPTXV2(id) {
	    return idTrans({
	      company: 'trtc',
	      value: id,
	      fromType: 'StationID',
	      toType: 'id'
	    });
	  },
	  getLINE_LineIDbyRPID: function getLINE_LineIDbyRPID(id) {
	    return mrtLineTrans({
	      company: 'trtc',
	      value: id,
	      fromType: 'id',
	      toType: 'LineID'
	    });
	  },
	  getLINE_RPIDbyLineID: function getLINE_RPIDbyLineID(id) {
	    return mrtLineTrans({
	      company: 'trtc',
	      value: id,
	      fromType: 'LineID',
	      toType: 'id'
	    });
	  }
	};
	var tymetro = {
	  getPTXV2: function getPTXV2(id, line) {
	    var param = {
	      company: 'tymetro',
	      value: id,
	      fromType: 'id',
	      toType: 'StationID'
	    };

	    if (line) {
	      param.LineID = line;
	    }

	    return idTrans(param);
	  },
	  getRPIDbyPTXV2: function getRPIDbyPTXV2(id) {
	    return idTrans({
	      company: 'tymetro',
	      value: id,
	      fromType: 'StationID',
	      toType: 'id'
	    });
	  },
	  getLINE_LineIDbyRPID: function getLINE_LineIDbyRPID(id) {
	    return mrtLineTrans({
	      company: 'tymetro',
	      value: id,
	      fromType: 'id',
	      toType: 'LineID'
	    });
	  },
	  getLINE_RPIDbyLineID: function getLINE_RPIDbyLineID(id) {
	    return mrtLineTrans({
	      company: 'tymetro',
	      value: id,
	      fromType: 'LineID',
	      toType: 'id'
	    });
	  }
	};
	var id$2 = {
	  idTrans: idTrans,
	  mrtLineTrans: mrtLineTrans,
	  thsr: thsr$1,
	  tra: tra,
	  trtc: trtc,
	  tymetro: tymetro,
	  getMRTStationIDInWhatLine: getMRTStationIDInWhatLine
	};

	var traURL$1 = CM.traURL;
	var traV3URL = CM.traV3URL;
	var urls$1 = {
	  Network: traURL$1 + '/Network',
	  //取得臺鐵路網資料
	  Line: traURL$1 + '/Line/',
	  //取得路線基本資料
	  Station: traURL$1 + '/Station/',
	  //取得車站基本資料
	  StationOfLine: traURL$1 + '/StationOfLine/',
	  //取得路線車站基本資料
	  TrainType: traURL$1 + '/TrainType',
	  //取得所有列車車種資料
	  ODFare: traURL$1 + '/ODFare/',
	  //取得票價資料
	  Shape: traURL$1 + '/Shape/',
	  //取得指定營運業者之軌道路網實體路線圖資資料
	  GeneralTrainInfo: traURL$1 + '/GeneralTrainInfo/',
	  //取得所有車次的定期車次資料
	  GeneralTimetable: traURL$1 + '/GeneralTimetable/',
	  //取得所有車次的定期時刻表資料
	  DailyTrainInfo_Today: traURL$1 + '/DailyTrainInfo/Today/',
	  //取得當天所有車次的車次資料
	  DailyTimetable_Today: traURL$1 + '/DailyTimetable/Today/',
	  //取得當天所有車次的時刻表資料
	  LiveBoard: traURL$1 + '/LiveBoard/',
	  //取得車站別列車即時到離站電子看板
	  LiveTrainDelay: traURL$1 + '/LiveTrainDelay/',
	  //取得列車即時準點/延誤時間資料
	  //以下為帶有變數的 API
	  ODFareFromTo: traURL$1 + '/ODFare/{OriginStationID}/to/{DestinationStationID}',
	  //取得指定[起訖站間]之票價資料
	  GeneralTrainInfo_TrainNo: traURL$1 + '/GeneralTrainInfo/TrainNo/{TrainNo}',
	  //取得指定[車次]的定期車次資料
	  GeneralTimetable_TrainNo: traURL$1 + '/GeneralTimetable/TrainNo/{TrainNo}',
	  //取得指定[車次]的定期時刻表資料
	  DailyTrainInfo_Today_TrainNo: traURL$1 + '/DailyTrainInfo/Today/TrainNo/{TrainNo}',
	  //取得當天指定[車次]的車次資料
	  DailyTrainInfo_TrainDate: traURL$1 + '/DailyTrainInfo/TrainDate/{TrainDate}',
	  //取得指定[日期]所有車次的車次資料 yyyy-MM-dd
	  DailyTrainInfo_TrainNo_TrainDate: traURL$1 + '/DailyTrainInfo/TrainNo/{TrainNo}/TrainDate/{TrainDate}',
	  //取得指定[日期]與[車次]的車次資料
	  DailyTimetable_Today_TrainNo: traURL$1 + '/DailyTimetable/Today/TrainNo/{TrainNo}',
	  //取得當天指定[車次]的時刻表資料
	  DailyTimetable_TrainDate_TrainNo: traURL$1 + '/DailyTimetable/TrainDate/{TrainDate}',
	  //取得指定[日期]所有車次的時刻表資料
	  DailyTimetable_TrainNo_TrainDate: traURL$1 + '/DailyTimetable/TrainNo/{TrainNo}/TrainDate/{TrainDate}',
	  //取得指定[日期],[車次]的時刻表資料
	  DailyTimetable_Station_TrainDate: traURL$1 + '/DailyTimetable/Station/{StationID}/{TrainDate}',
	  //取得指定[日期],[車站]的站別時刻表資料
	  DailyTimetable_OD_TrainDate: traURL$1 + '/DailyTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate}',
	  //取得指定[日期],[起迄站間]之站間時刻表資料
	  LiveBoard_Station: traURL$1 + '/LiveBoard/Station/{StationID}' //取得指定[車站]列車即時到離站電子看板(動態前後30分鐘的車次)

	};
	var v3urls = {
	  Network: traV3URL + '/Network',
	  //取得臺鐵路網資料
	  Station: traV3URL + '/Station/',
	  //取得車站基本資料
	  StationExit: traV3URL + '/StationExit/',
	  //取得車站出入口資料
	  StationFacility: traV3URL + '/StationFacility/',
	  //取得車站設施資料
	  Line: traV3URL + '/Line/',
	  //取得路線基本資料
	  StationOfLine: traV3URL + '/StationOfLine/',
	  //取得路線車站基本資料
	  TrainType: traV3URL + '/TrainType',
	  //取得所有列車車種資料
	  //ODFare: traURL + '/ODFare/', //取得票價資料 , v3 已移除
	  //GeneralTrainInfo: traURL + '/GeneralTrainInfo/', //取得所有車次的定期車次資料 , v3 已移除
	  GeneralTrainTimetable: traV3URL + '/GeneralTrainTimetable/',
	  //取得所有車次的定期時刻表資料
	  GeneralStationTimetable: traV3URL + '/GeneralStationTimetable',
	  //取得各站的定期站別時刻表資料
	  SpecificTrainTimetable: traV3URL + '/SpecificTrainTimetable',
	  //取得所有特殊車次時刻表資料
	  DailyTrainTimetable_Today: traV3URL + '/DailyTrainTimetable/Today/',
	  //取得當天車次時刻表資料
	  DailyStationTimetable_Today: traV3URL + '/DailyStationTimetable/Today/',
	  //取得當天各站站別時刻表資料
	  StationLiveBoard: traV3URL + '/StationLiveBoard/',
	  //取得列車即時到離站資料
	  TrainLiveBoard: traV3URL + '/TrainLiveBoard/',
	  //取得列車即時位置動態資料
	  LineTransfer: traV3URL + '/LineTransfer/',
	  //取得內部路線轉乘資料
	  StationTransfer: traV3URL + '/StationTransfer/',
	  //取得車站跨運具轉乘資訊
	  News: traV3URL + '/News/',
	  //取得最新消息
	  Alert: traV3URL + '/Alert/',
	  //取得營運通阻資料
	  Shape: traV3URL + '/Shape/',
	  //取得線型基本資料
	  //以下為帶有變數的 API
	  ODFareFromTo: traV3URL + '/ODFare/{OriginStationID}/to/{DestinationStationID}',
	  //取得指定[起訖站間]之票價資料
	  GeneralTimetable_TrainNo: traV3URL + '/GeneralTimetable/TrainNo/{TrainNo}',
	  //取得指定[車次]的定期時刻表資料
	  GeneralStationTimetable_Station: traV3URL + '/GeneralStationTimetable/Station/{StationID}',
	  //取得指定[車站]的定期站別時刻表資料
	  SpecificTrainTimetable_TrainNo: traV3URL + '/SpecificTrainTimetable/TrainNo/{TrainNo}',
	  //取得指定[車次]的特殊車次時刻表資料
	  DailyTrainTimetable_Today_TrainNo: traV3URL + '/DailyTrainTimetable/Today/TrainNo/{TrainNo}',
	  //取得當天指定[車次]的時刻表資料
	  DailyTrainTimetable_TrainDate: traV3URL + '/DailyTrainTimetable/TrainDate/{TrainDate}',
	  //取得指定[日期]所有車次的時刻表資料(台鐵提供近60天每日時刻表)
	  DailyTrainTimetable_OD_TrainDate: traV3URL + '/DailyTrainTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate}',
	  //取得指定[日期],[起迄站]之站間時刻表資料
	  DailyTrainTimetable_OD_Inclusive_TrainDate: traV3URL + '/DailyTrainTimetable/OD/Inclusive/{OriginStationID}/to/{DestinationStationID}/{TrainDate}',
	  //取得指定[日期],[起迄站間]之站間全經過站時刻表資料
	  DailyStationTimetable_Today_Station: traV3URL + '/DailyStationTimetable/Today/Station/{StationID}',
	  //取得當天指定[車站]的時刻表資料
	  DailyStationTimetable_TrainDate: traV3URL + '/DailyStationTimetable/TrainDate/{TrainDate}',
	  //取得各站每日站別時刻表資料 yyyy-MM-dd
	  StationLiveBoard_Station: traV3URL + '/StationLiveBoard/Station/{StationID}',
	  //取得指定[車站]列車即時到離站電子看板(動態前後30分鐘的車次)
	  TrainLiveBoard_TrainNo: traV3URL + '/TrainLiveBoard/TrainNo/{TrainNo}' //取得指定[車次]的列車即時位置動態資料

	};
	var vars$1 = {
	  queryCount: 10000,
	  format: 'JSON'
	};
	var getPTX$2 = ptx.getPromiseURL;

	function setDefaultCfg$2() {
	  var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  if (typeof cfg == 'string') cfg = {
	    paramDirectlyUse: cfg
	  }; //若傳入的為字串代表直接用於最後的參數不需再調整

	  cfg.cbFn = cfg.cbFn || function (data, e) {};

	  cfg.top = cfg.top || vars$1.queryCount;
	  cfg.format = vars$1.format;
	  return cfg;
	}

	function processCfg$2(cfg) {
	  //將 cfg 轉為對應的參數
	  if (cfg.paramDirectlyUse) return cfg.paramDirectlyUse;
	  var aryParam = [];
	  if (cfg.selectField) aryParam.push(ptx.selectFieldFn(cfg.selectField));
	  if (cfg.filterBy) aryParam.push(ptx.filterFn(cfg.filterBy));

	  if (cfg.orderBy) {
	    var dir = cfg.orderDir || false;
	    aryParam.push(ptx.orderByFn(cfg.orderBy, dir));
	  }

	  aryParam.push(ptx.topFn(cfg.top, cfg.format)); //最後加這個

	  return '?' + aryParam.join('&');
	}

	function useLineID2filterBy(LineID) {
	  var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  cfg.filterBy = cfg.filterBy || '';
	  cfg.filterBy += ptx.filterParam('LineID', '==', LineID);
	  return cfg;
	}

	function useStationID2filterBy$1(StationID) {
	  var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  cfg.filterBy = cfg.filterBy || '';
	  cfg.filterBy += ptx.filterParam('StationID', '==', StationID);
	  return cfg;
	}

	var tra$1 = {
	  companyTag: 'TRA',
	  urls: urls$1,
	  vars: vars$1,
	  getStationOfLine: function getStationOfLine(LineID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useLineID2filterBy(LineID, cfg);
	    return tra$1._StationOfLine(cfg);
	  },
	  getStation: function getStation(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useStationID2filterBy$1(StationID, cfg);
	    return tra$1._Station(cfg);
	  },
	  getStationFare: function getStationFare(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg.filterBy = cfg.filterBy || '';
	    cfg.filterBy += ptx.filterParam('OriginStationID', '==', StationID);
	    return tra$1._ODFare(cfg);
	  },
	  getStationTodayTimeTable: function getStationTodayTimeTable(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var date = new Date();
	    var dateStr = date.getFullYear() + '-' + CM.appendNumber0(date.getMonth() + 1) + '-' + CM.appendNumber0(date.getDate());
	    return tra$1._DailyTimetable_Station_TrainDate(StationID, dateStr, cfg);
	  },
	  //以下均使用 rpID 並轉換為 v3id 呼叫
	  getStationLiveBoard: function getStationLiveBoard(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    if (!StationID) {
	      return tra$1.v3._StationLiveBoard(cfg).then(function (e) {
	        e.data.StationLiveBoards.forEach(function (c) {
	          c.rpStationID = id$2.tra.getRPIDbyPTXV3(c.StationID);
	        });
	        return e;
	      });
	    } else {
	      StationID = id$2.tra.getPTXV3(StationID) || StationID;
	      return tra$1.v3._StationLiveBoard_Station(StationID, cfg).then(function (e) {
	        e.data.StationLiveBoards.forEach(function (c) {
	          c.rpStationID = id$2.tra.getRPIDbyPTXV3(c.StationID);
	        });
	        return e;
	      });
	    }
	  },
	  getTrainLiveBoard: function getTrainLiveBoard(aryTrainNO) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    if (/string|number/.test(_typeof(aryTrainNO))) aryTrainNO = [aryTrainNO];

	    if (aryTrainNO && aryTrainNO.length) {
	      cfg.filterBy = cfg.filterBy || '';
	      cfg.filterBy = ptx.filterParam('TrainNo', '==', aryTrainNO, 'or');
	    }

	    return tra$1.v3._TrainLiveBoard(cfg).then(function (e) {
	      e.data.TrainLiveBoards.forEach(function (c) {
	        c.rpStationID = id$2.tra.getRPIDbyPTXV3(c.StationID);
	      });
	      return e;
	    });
	  },
	  getFromToTimeTable: function getFromToTimeTable(from, to, date) {
	    var Inclusive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	    from = id$2.tra.getPTXV3(from) || from;
	    to = id$2.tra.getPTXV3(to) || to;

	    if (!date) {
	      date = CM.transTime2Date(new Date());
	    } else if (_typeof(date) == 'object' && typeof date.toLocaleDateString == 'function') {
	      date = CM.transTime2Date(date);
	    }

	    var fn = Inclusive ? tra$1.v3._DailyTrainTimetable_OD_Inclusive_TrainDate : tra$1.v3._DailyTrainTimetable_OD_TrainDate;
	    return fn(from, to, date).then(function (e) {
	      e.data.TrainTimetables.sort(function (a, b) {
	        a.dep = a.StopTimes[0].DepartureTime;
	        a.sortTime = CM.transTime2Sec(a.dep);
	        b.dep = b.StopTimes[0].DepartureTime;
	        b.sortTime = CM.transTime2Sec(b.dep);
	        return a.dep > b.dep ? 1 : -1;
	      });
	      return e;
	    });
	  },
	  getLiveFromToTimeTable: function getLiveFromToTimeTable(from, to) {
	    var _this = this;

	    var len = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
	    var Inclusive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	    var dateObj = new Date();
	    var nowDaySec = Math.round((dateObj.getTime() / 1000 + 480 * 60) % 86400);
	    var date = CM.transTime2Date(dateObj);
	    this.getStationLiveBoard(from).then(function (e) {
	      //1.先抓該站的 Live 資訊用來判斷列車是否誤點
	      return e.data.StationLiveBoards;
	    }).then(function (liveData) {
	      return _this.getFromToTimeTable(from, to, date, Inclusive).then(function (e) {
	        var TrainTimetables = e.data.TrainTimetables;
	        TrainTimetables.forEach(function (time) {
	          var live = liveData.find(function (lc) {
	            return lc.TrainNo == time.TrainInfo.TrainNo;
	          });
	          time.TrainNo = time.TrainInfo.TrainNo;

	          if (live) {
	            time.liveData = live;
	            time.DelayTime = live.DelayTime;
	            time.sortTime = live.DelayTime * 60 + time.sortTime;
	          }
	        });
	        return TrainTimetables.filter(function (time) {
	          return time.sortTime >= nowDaySec;
	        }).slice(0, len);
	      });
	    }).then(function (timeTable) {
	      var aryTrainNo = timeTable.map(function (c) {
	        return c.TrainInfo.TrainNo;
	      });
	      return _this.getTrainLiveBoard(aryTrainNo).then(function (tlv) {
	        timeTable.forEach(function (time) {
	          var lv = tlv.data.TrainLiveBoards.find(function (c) {
	            return c.TrainNo == time.TrainInfo.TrainNo;
	          });

	          if (lv) {
	            time.trainLiveData = lv;

	            if (lv.DelayTime > 0 && !time.DelayTime) {
	              time.DelayTime = lv.DelayTime;
	              time.sortTime = lv.DelayTime * 60 + time.sortTime;
	            }
	          }
	        });
	        return timeTable;
	      });
	    }).then(function (timeTable) {
	      return timeTable;
	    });
	  } //產生整包抓取 Function

	};
	var catchData$1 = {
	  config: {
	    Line_callback: function Line_callback(json) {
	      //通用預處理
	      return json;
	    },
	    Line_callback_final: function Line_callback_final(json) {
	      //私用預處理
	      return json;
	    }
	  },
	  getDataXLineObj: function getDataXLineObj(LineID) {
	    var rt = ptx.datax['tra'].line.find(function (c) {
	      return !!(c.LineID == LineID);
	    });

	    if (rt) {
	      var dt = ptx.data.tra.line.find(function (c) {
	        return !!(c.LineID == LineID);
	      });

	      for (var k in dt) {
	        if (!rt[k]) {
	          rt[k] = dt[k];
	        } else {
	          rt['data_' + k] = dt[k];
	        }
	      }
	    }

	    return rt;
	  },
	  getDataXStationData: function getDataXStationData(StationID) {
	    var rt = ptx.datax['tra'].station.find(function (c) {
	      return !!(c.StationID == StationID);
	    });

	    if (rt) {
	      var dt = ptx.data.tra.station_ary.find(function (c) {
	        return !!(id$2.tra.getPTXV2(c.id) == StationID);
	      });

	      for (var k in dt) {
	        if (k == 'id') {
	          rt['id'] = dt[k];
	        } else if (!rt[k]) {
	          rt[k] = dt[k];
	        } else {
	          rt['data_' + k] = dt[k];
	        }
	      }
	    }

	    return rt;
	  },
	  getDataXTrain: function getDataXTrain(id) {
	    var rt = ptx.datax['tra'].train.find(function (c) {
	      return !!(c.TrainTypeID == id);
	    });

	    if (rt) {
	      var dt = ptx.data.tra["CarClass"].find(function (c) {
	        return !!(c.id == id);
	      });

	      for (var k in dt) {
	        if (!rt[k]) {
	          rt[k] = dt[k];
	        } else {
	          rt['data_' + k] = dt[k];
	        }
	      }
	    }

	    return rt;
	  },
	  getDataXStationName: function getDataXStationName(StationID, isEn) {
	    var st = catchData$1.getDataXStationData(StationID);
	    return isEn ? st.ename : st.name;
	  },
	  Line: function Line(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
	    progressFn('取得路線中');

	    var atLine = tra$1._StationOfLine().then(function (res) {
	      return res.data;
	    }).catch(function (res) {
	      return res;
	    });

	    return atLine;
	  },
	  GeneralTimetable: function GeneralTimetable(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //定期時刻表抓法  1.執行 tra._GeneralTimetable

	    progressFn('取得時刻中');

	    var atTime = tra$1._GeneralTimetable().then(function (res) {
	      return res.data.map(function (c) {
	        c.GeneralTimetable.UpdateTime = c.UpdateTime;
	        c.GeneralTimetable.VersionID = c.VersionID;
	        return c.GeneralTimetable;
	      });
	    }).catch(function (res) {
	      return res;
	    });

	    return atTime;
	  },
	  Station: function Station(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
	    progressFn('取得車站中');
	    return tra$1._Station().then(function (res) {
	      return res.data.map(function (c) {
	        return {
	          StationID: c.StationID,
	          lat: c.StationPosition.PositionLat,
	          lon: c.StationPosition.PositionLon,
	          name: c.StationName.Zh_tw,
	          ename: c.StationName.En
	        };
	      });
	    }).catch(function (res) {
	      return res;
	    });
	  },
	  TrainType: function TrainType(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
	    progressFn('取得車種中');
	    return tra$1._TrainType().then(function (res) {
	      return res.data.map(function (c) {
	        var nameAry = c.TrainTypeName.Zh_tw.split('(');
	        if (nameAry[1]) nameAry[1] = nameAry[1].replace(')', '');
	        return {
	          TrainTypeID: c.TrainTypeID,
	          TrainTypeCode: c.TrainTypeCode,
	          note: nameAry[1] || '',
	          name: nameAry[0],
	          ename: c.TrainTypeName.En
	        };
	      });
	    }).catch(function (res) {
	      return res;
	    });
	  },
	  SimpleLine: function SimpleLine(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //區分要抓的 line 在資料中是順時針或逆時針方向

	    var recordLineDir0 = ['CZ', 'YL', 'NL', 'TT', 'PX', 'NW', 'LJ'];
	    var recordLineDir1 = ['TL-N', 'TL-M', 'TL-C', 'TL-S', 'PL', 'SL', 'SA', 'JJ', 'SH'];
	    var lineCfg = {
	      filterBy: ptx.filterParam('LineID', '==', recordLineDir0.concat(recordLineDir1), 'or')
	    };
	    progressFn('取得路線中');

	    var atLine = tra$1._StationOfLine(lineCfg).then(function (res) {
	      return res.data.map(function (c) {
	        var stAry = c.Stations.sort(function (a, b) {
	          return a.Sequence > b.Sequence ? 1 : -1;
	        }).map(function (st) {
	          return {
	            name: st.StationName,
	            ID: st.StationID,
	            TD: st.TraveledDistance
	          };
	        });
	        return {
	          dir: recordLineDir0.indexOf(c.LineID) != -1 ? 0 : 1,
	          LineID: c.LineID,
	          station: stAry
	        };
	      });
	    }).catch(function (res) {
	      return res;
	    });

	    return atLine;
	  },
	  SimpleTimetable: function SimpleTimetable(progressFn) {
	    return catchData$1.GeneralTimetable(progressFn).then(function (json) {
	      json.forEach(function (data, didx) {
	        var weekStr = [data.ServiceDay.Sunday, data.ServiceDay.Monday, data.ServiceDay.Tuesday, data.ServiceDay.Wednesday, data.ServiceDay.Thursday, data.ServiceDay.Friday, data.ServiceDay.Saturday].map(function (day, idx) {
	          return day ? idx.toString() : '';
	        }).join('');
	        data.weekStr = weekStr;
	        delete data.ServiceDay;
	        data.StopTimes.sort(function (a, b) {
	          return a.StopSequence > b.StopSequence ? 1 : -1;
	        });
	        data.stopTime = data.StopTimes.map(function (c) {
	          return {
	            Arr: c.ArrivalTime,
	            Dep: c.DepartureTime,
	            ID: c.StationID,
	            name: c.StationName.Zh_tw
	          };
	        });
	        delete data.StopTimes;
	        data.info = {};
	        var deleteKey = ['EndingStationName', 'StartingStationName', 'TrainTypeName'];

	        for (var k in data.GeneralTrainInfo) {
	          if (deleteKey.indexOf(k) == -1) {
	            data.info[k] = data.GeneralTrainInfo[k];
	          }
	        }

	        delete data.GeneralTrainInfo;

	        if (didx > 0) {
	          delete data.UpdateTime;
	          delete data.VersionID;
	        }
	      });
	      return json;
	    });
	  }
	};
	tra$1.catchData = catchData$1; //自動產生 Function

	function makePTX_func$1(cmd, cfg) {
	  cfg = setDefaultCfg$2(cfg);
	  var param = processCfg$2(cfg);
	  return getPTX$2(urls$1[cmd] + param, cfg);
	}

	var aryMakeFunction$1 = Object.keys(urls$1);
	var ptxAutoTRAFunctionKey = [];
	aryMakeFunction$1.forEach(function (fn) {
	  if (!/\{/.test(urls$1[fn])) {
	    //排除要傳參數組 URL 的
	    tra$1['_' + fn] = function (cfg) {
	      return makePTX_func$1(fn, cfg);
	    };

	    ptxAutoTRAFunctionKey.push('_' + fn);
	  } else {
	    //處理有動態參數的
	    var urlAry = urls$1[fn].split('/');
	    var paramCount = 0;
	    var paramAry = [];
	    urlAry.forEach(function (c) {
	      if (/^\{/.test(c)) {
	        paramCount++;
	        paramAry.push(c);
	      }
	    });

	    tra$1['_' + fn] = function () {
	      var ptr = 0;
	      var arg = arguments;
	      if (arg.length < paramCount) throw 'Lose parameter, need ' + paramAry.join();
	      var url = urlAry.map(function (c) {
	        if (/^\{/.test(c)) {
	          c = arg[ptr];
	          ptr++;
	        }

	        return c;
	      }).join('/');
	      var cfg = arguments[paramCount];
	      cfg = setDefaultCfg$2(cfg);
	      var param = processCfg$2(cfg);
	      return getPTX$2(url + param, cfg);
	    };
	  }
	});
	tra$1.ptxAutoTRAFunctionKey = ptxAutoTRAFunctionKey;
	tra$1.getFromToFare = tra$1._ODFareFromTo; //alias
	//====================== TRA V3 Function 產生至 tra.v3 之下 ==============================

	tra$1.v2Sv3 = function (StationID) {
	  //輸入 v2 StationID 輸出 v3 id
	  return id$2.tra.getPTXV3byV2(StationID);
	};

	tra$1.v3Sv2 = function (StationID) {
	  //輸入 v3 StationID 輸出 v2 id
	  return id$2.tra.getPTXV2byV3(StationID);
	}; //自動產生 V3 Function


	tra$1.v3 = {
	  urls: v3urls,
	  getStationOfLine: function getStationOfLine(LineID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useLineID2filterBy(LineID, cfg);
	    return tra$1.v3._StationOfLine(cfg);
	  },
	  getStation: function getStation(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    cfg = useStationID2filterBy$1(StationID, cfg);
	    return tra$1.v3._Station(cfg);
	  },
	  getStationTodayTimeTable: function getStationTodayTimeTable(StationID) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    return tra$1.v3._DailyStationTimetable_Today_Station(StationID, cfg);
	  }
	}; //產生整包抓取 Function

	var catchV3Data = {
	  config: {
	    Line_callback: function Line_callback(json) {
	      //通用預處理
	      return json;
	    },
	    Line_callback_final: function Line_callback_final(json) {
	      //私用預處理
	      return json;
	    }
	  },
	  getDataXLineObj: function getDataXLineObj(LineID) {
	    var rt = ptx.datax['trav3'].line.find(function (c) {
	      return !!(c.LineID == LineID);
	    });

	    if (rt) {
	      var dt = ptx.data.tra.line.find(function (c) {
	        return !!(c.LineID == LineID);
	      });

	      for (var k in dt) {
	        if (!rt[k]) {
	          rt[k] = dt[k];
	        } else {
	          rt['data_' + k] = dt[k];
	        }
	      }
	    }

	    return rt;
	  },
	  getDataXStationData: function getDataXStationData(StationID) {
	    return catchData$1.getDataXStationData(id$2.tra.getPTXV2byV3(StationID)); // var rt = ptx.datax['trav3'].station.find((c)=>{return !!(c.StationID==StationID)})
	    // if(rt){
	    //     var dt = ptx.data.tra.station_ary.find(c=> !!(c.v3id==StationID))
	    //     for(var k in dt){
	    //         if(k=='id'){
	    //             rt['id'] = dt[k];
	    //         }else if(!rt[k]){
	    //             rt[k] = dt[k];
	    //         }else{
	    //             rt['data_' + k] = dt[k];
	    //         }
	    //     }
	    // }
	    // return rt;
	  },
	  getDataXTrain: function getDataXTrain(id) {
	    return catchData$1.getDataXTrain(id); // var rt = ptx.datax['trav3'].train.find((c)=>{return !!(c.TrainTypeID==id)})
	    // if(rt){
	    //     var dt = ptx.data.tra["CarClass"].find(c=> !!(c.id==id))
	    //     for(var k in dt){
	    //         if(!rt[k]){
	    //             rt[k] = dt[k];
	    //         }else{
	    //             rt['data_' + k] = dt[k];
	    //         }
	    //     }
	    // }
	    // return rt;
	  },
	  getDataXStationName: function getDataXStationName(StationID, isEn) {
	    var st = catchV3Data.getDataXStationData(StationID);
	    return isEn ? st.ename : st.name;
	  },
	  Line: function Line(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
	    progressFn('取得路線中');

	    var atLine = tra$1.v3._StationOfLine().then(function (res) {
	      return res.data.StationOfLines;
	    }).catch(function (res) {
	      return res;
	    });

	    return atLine;
	  },
	  GeneralTrainTimetable: function GeneralTrainTimetable(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //定期時刻表抓法  1.執行 tra.v3._GeneralTrainTimetable

	    progressFn('取得時刻中');

	    var atTime = tra$1.v3._GeneralTrainTimetable().then(function (res) {
	      return res.data.TrainTimetables;
	    }).catch(function (res) {
	      return res;
	    });

	    return atTime;
	  },
	  Station: function Station(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
	    progressFn('取得車站中');
	    return tra$1.v3._Station().then(function (res) {
	      return res.data.Stations.map(function (c) {
	        return {
	          StationID: c.StationID,
	          v2id: tra$1.v3Sv2(c.StationID),
	          lat: c.StationPosition.PositionLat,
	          lon: c.StationPosition.PositionLon,
	          name: c.StationName.Zh_tw,
	          ename: c.StationName.En
	        };
	      });
	    }).catch(function (res) {
	      return res;
	    });
	  },
	  TrainType: function TrainType(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
	    progressFn('取得車種中');
	    return tra$1.v3._TrainType().then(function (res) {
	      return res.data.TrainTypes.map(function (c) {
	        var nameAry = c.TrainTypeName.Zh_tw.split('(');
	        if (nameAry[1]) nameAry[1] = nameAry[1].replace(')', '');
	        return {
	          TrainTypeID: c.TrainTypeID,
	          TrainTypeCode: c.TrainTypeCode,
	          note: nameAry[1] || '',
	          name: nameAry[0],
	          ename: c.TrainTypeName.En
	        };
	      });
	    }).catch(function (res) {
	      return res;
	    });
	  },
	  SimpleLine: function SimpleLine(progressFn) {
	    if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //區分要抓的 line 在資料中是順時針或逆時針方向

	    var recordLineDir0 = ['CZ', 'EL', 'SU', 'PX', 'NW', 'LJ'];
	    var recordLineDir1 = ['WL', 'WL-C', 'SL', 'SA', 'JJ', 'SH'];
	    var lineCfg = {
	      filterBy: ptx.filterParam('LineID', '==', recordLineDir0.concat(recordLineDir1), 'or')
	    };
	    progressFn('取得路線中');

	    var atLine = tra$1.v3._StationOfLine(lineCfg).then(function (res) {
	      return res.data.StationOfLines.map(function (c) {
	        var stAry = c.Stations.sort(function (a, b) {
	          return a.Sequence > b.Sequence ? 1 : -1;
	        }).map(function (st) {
	          return {
	            name: st.StationName,
	            ID: st.StationID,
	            v2id: tra$1.v3Sv2(st.StationID),
	            TD: st.CumulativeDistance
	          };
	        });
	        return {
	          dir: recordLineDir0.indexOf(c.LineID) != -1 ? 0 : 1,
	          LineID: c.LineID,
	          station: stAry
	        };
	      });
	    }).catch(function (res) {
	      return res;
	    });

	    return atLine;
	  },
	  SimpleTimetable: function SimpleTimetable(progressFn) {
	    return catchV3Data.GeneralTrainTimetable(progressFn).then(function (json) {
	      json.forEach(function (data, didx) {
	        var weekStr = [data.ServiceDay.Sunday, data.ServiceDay.Monday, data.ServiceDay.Tuesday, data.ServiceDay.Wednesday, data.ServiceDay.Thursday, data.ServiceDay.Friday, data.ServiceDay.Saturday].map(function (day, idx) {
	          return day ? idx.toString() : '';
	        }).join('');
	        data.weekStr = weekStr;
	        delete data.ServiceDay;
	        data.StopTimes.sort(function (a, b) {
	          return a.StopSequence > b.StopSequence ? 1 : -1;
	        });
	        data.stopTime = data.StopTimes.map(function (c) {
	          return {
	            Arr: c.ArrivalTime,
	            Dep: c.DepartureTime,
	            ID: c.StationID,
	            v2id: tra$1.v3Sv2(c.StationID),
	            name: c.StationName.Zh_tw
	          };
	        });
	        delete data.StopTimes;
	        data.info = {};
	        var deleteKey = ['EndingStationName', 'StartingStationName', 'TrainTypeName', 'TripHeadSign', 'TripLine'];

	        for (var k in data.TrainInfo) {
	          if (deleteKey.indexOf(k) == -1) {
	            data.info[k] = data.TrainInfo[k];
	          }
	        }

	        delete data.TrainInfo;

	        if (didx > 0) {
	          delete data.UpdateTime;
	          delete data.VersionID;
	        }
	      });
	      return json;
	    });
	  }
	};
	tra$1.v3.catchData = catchV3Data;

	function makePTXV3_func(cmd, cfg) {
	  cfg = setDefaultCfg$2(cfg);
	  var param = processCfg$2(cfg);
	  return getPTX$2(v3urls[cmd] + param, cfg);
	}

	var aryMakeV3Function = Object.keys(v3urls);
	var ptxAutoTRAV3FunctionKey = [];
	aryMakeV3Function.forEach(function (fn) {
	  if (!/\{/.test(v3urls[fn])) {
	    //排除要傳參數組 URL 的
	    tra$1.v3['_' + fn] = function (cfg) {
	      return makePTXV3_func(fn, cfg);
	    };

	    ptxAutoTRAV3FunctionKey.push('_' + fn);
	  } else {
	    //處理有動態參數的
	    var urlAry = v3urls[fn].split('/');
	    var paramCount = 0;
	    var paramAry = [];
	    urlAry.forEach(function (c) {
	      if (/^\{/.test(c)) {
	        paramCount++;
	        paramAry.push(c);
	      }
	    });

	    tra$1.v3['_' + fn] = function () {
	      var ptr = 0;
	      var arg = arguments;
	      if (arg.length < paramCount) throw 'Lose parameter, need ' + paramAry.join();
	      var url = urlAry.map(function (c) {
	        if (/^\{/.test(c)) {
	          c = arg[ptr];
	          ptr++;
	        }

	        return c;
	      }).join('/');
	      var cfg = arguments[paramCount];
	      cfg = setDefaultCfg$2(cfg);
	      var param = processCfg$2(cfg);
	      return getPTX$2(url + param, cfg);
	    };
	  }
	});
	tra$1.v3.ptxAutoTRAFunctionKey = ptxAutoTRAV3FunctionKey;
	tra$1.v3.getStationLiveBoard = tra$1.v3._StationLiveBoard_Station; //alias

	tra$1.v3.getFromToFare = tra$1.v3._ODFareFromTo; //alias

	var router = {};

	// import ptx_thsr from './thsr.js';
	// import ptx_tra from './tra.js';

	var ptxFn = {
	  trtc: fnMRT,
	  krtc: fnMRT$2,
	  tymetro: fnMRT$3 // klrt: ptx_klrt,
	  // thsr: ptx_thsr,
	  // tra: ptx_tra
	  //動態加入機捷用的 Transfer

	};
	datax.tymetro.line.forEach(function (line) {
	  if (line.LineID == 'A' && line.Transfer.length == 0) {
	    line.Transfer.push({
	      FromLineID: "A",
	      FromStationID: "A8",
	      IsOnSiteTransfer: 1,
	      IsTrainTypeTransfer: true,
	      TrainType: ['TrainType1', 'TrainType2'],
	      ToLineID: "A",
	      ToStationID: "A8",
	      TransferTime: 2
	    });
	  }
	}); //=========== MRT Router Function ==========

	function findMRTpDataTransStation(company, FromStationID, ToStationID) {
	  var FromLineID = id$2.getMRTStationIDInWhatLine(FromStationID),
	      ToLineID = id$2.getMRTStationIDInWhatLine(ToStationID);
	  var transStation1 = id$2[company].getRPIDbyPTXV2(FromStationID),
	      transLine1 = id$2[company].getLINE_RPIDbyLineID(FromLineID),
	      transLine2 = id$2[company].getLINE_RPIDbyLineID(ToLineID),
	      transStation2 = id$2[company].getRPIDbyPTXV2(ToStationID);
	  var transStation = pData.transStation.find(function (c) {
	    var flg = false;

	    if (c.changeLine[0] == transLine1 && c.changeLine[1] == transLine2 || c.changeLine[0] == transLine2 && c.changeLine[1] == transLine1) {
	      if (c.changeStation[0] == transStation1 && c.changeStation[1] == transStation2 || c.changeStation[0] == transStation2 && c.changeStation[1] == transStation1) flg = true;
	    }

	    return flg;
	  });
	  return transStation;
	}

	function blockMRTLineStation(company) {
	  var mDataX = datax[company];
	  if (mDataX.block) return mDataX.block;
	  var aryBlock = [];
	  mDataX.line.forEach(function (line) {
	    var afterStation = [];
	    var transferStation = line.Transfer.map(function (c) {
	      return c.FromStationID;
	    });
	    var aryLineBlock = [];
	    var LineID = line.LineID;
	    var existBlock = false;
	    line.Route.forEach(function (route) {
	      var tmpSt = [];
	      var aryRouteBlock = [];
	      var cntBlockID = aryLineBlock.length + 1;

	      if (route.Direction == 0) {
	        route.Stations.forEach(function (st) {
	          if (afterStation.indexOf(st) == -1) {
	            afterStation.push(st);

	            if (transferStation.indexOf(st) == -1) {
	              tmpSt.push(st);
	            } else {
	              //Normal Station Array
	              if (tmpSt.length > 0) {
	                var near = [],
	                    myID = LineID + '_' + cntBlockID++;
	                if (aryRouteBlock[aryRouteBlock.length - 1]) near.push(aryRouteBlock[aryRouteBlock.length - 1].BlockID);

	                if (existBlock) {
	                  near.push(existBlock.BlockID);
	                  if (existBlock.near.indexOf(myID) == -1) existBlock.near.push(myID);
	                  existBlock = false;
	                }

	                aryRouteBlock.push({
	                  BlockID: myID,
	                  LineID: LineID,
	                  type: 'station',
	                  station: tmpSt,
	                  routes: [route.RouteID],
	                  near: near
	                });
	              }

	              tmpSt = []; //Trans Station

	              var aryTransSt = line.Transfer.filter(function (c) {
	                return !!(c.FromStationID == st);
	              });
	              var transSt = aryTransSt.map(function (c) {
	                var d = CM.assign({}, c);
	                d.transStation = findMRTpDataTransStation(company, c.FromStationID, c.ToStationID);
	                return d;
	              });
	              var near = [],
	                  myID = LineID + '_' + cntBlockID++;
	              if (aryRouteBlock[aryRouteBlock.length - 1]) near.push(aryRouteBlock[aryRouteBlock.length - 1].BlockID);

	              if (existBlock) {
	                near.push(existBlock.BlockID);
	                if (existBlock.near.indexOf(myID) == -1) existBlock.near.push(myID);
	                existBlock = false;
	              }

	              var tst = {
	                BlockID: myID,
	                LineID: LineID,
	                type: 'transfer',
	                station: st,
	                transferList: transSt,
	                routes: [route.RouteID],
	                near: []
	              };
	              tst.toIDList = transSt.map(function (c) {
	                return c.ToStationID;
	              });
	              aryRouteBlock.push(tst);
	            }
	          } else {
	            aryLineBlock.forEach(function (c) {
	              if (Array.isArray(c.station)) {
	                if (c.station.indexOf(st) != -1 && c.routes.indexOf(route.RouteID) == -1) {
	                  c.routes.push(route.RouteID);
	                  existBlock = c;
	                }
	              } else if (_typeof(c.station == 'string')) {
	                if (c.station == st && c.routes.indexOf(route.RouteID) == -1) {
	                  c.routes.push(route.RouteID);
	                  existBlock = c;
	                }
	              }
	            });
	          }
	        });
	      }

	      if (tmpSt.length > 0) {
	        var near = [],
	            myID = LineID + '_' + cntBlockID++;
	        if (aryRouteBlock[aryRouteBlock.length - 1]) near.push(aryRouteBlock[aryRouteBlock.length - 1].BlockID);

	        if (existBlock) {
	          near.push(existBlock.BlockID);
	          if (existBlock.near.indexOf(myID) == -1) existBlock.near.push(myID);
	          existBlock = false;
	        }

	        aryRouteBlock.push({
	          BlockID: myID,
	          LineID: LineID,
	          type: 'station',
	          station: tmpSt,
	          routes: [route.RouteID],
	          near: near
	        });
	      } //有後一個 block 的話把它串為自己的 near，然後把它的 near 加上自己


	      aryRouteBlock.forEach(function (c, idx, arr) {
	        if (arr[idx + 1] && arr[idx + 1].near.indexOf(c.BlockID) == -1) arr[idx + 1].near.push(c.BlockID);
	        if (arr[idx - 1] && arr[idx - 1].near.indexOf(c.BlockID) == -1) arr[idx - 1].near.push(c.BlockID);
	      }); //從已經加入到 Line Block 的路線分支出去的話會有 existBlock (如大橋頭站後會有蘆洲新莊兩線)，將彼此的 near 加入對方 BlockID

	      aryLineBlock = aryLineBlock.concat(aryRouteBlock); //綁定相鄰的同線 Block
	      //console.info(route);
	    });
	    aryBlock.push(aryLineBlock);
	  });
	  mDataX.block = aryBlock;
	  return aryBlock;
	}

	function getStationBlockByID(station) {
	  var blockData = this.getBlockData();
	  var aryBlock = blockData.reduce(function (c, n) {
	    return c.concat(n);
	  }, []);

	  for (var i = 0; i < aryBlock.length; i++) {
	    if (aryBlock[i].type == 'transfer' || typeof aryBlock[i].station == 'string') {
	      if (aryBlock[i].station == station) return aryBlock[i];
	    } else {
	      if (aryBlock[i].station.indexOf(station) != -1) return aryBlock[i];
	    }
	  }
	}

	function getMRTThrough(from, to) {
	  var me = this;
	  var LineID = id$2.getMRTStationIDInWhatLine(from),
	      ToLineID = id$2.getMRTStationIDInWhatLine(to);
	  if (LineID != ToLineID) return false;
	  var mDataX = datax[this.company];
	  var line = mDataX.line.find(function (c) {
	    return c.LineID == LineID;
	  });
	  var rt = {
	    RouteID: []
	  };
	  line.Route.forEach(function (route) {
	    var a = route.Stations.indexOf(from),
	        b = route.Stations.indexOf(to);

	    if (a != -1 && b != -1 && a < b) {
	      rt.Direction = route.Direction;
	      rt.RouteID.push(route.RouteID);
	      rt.Stations = route.Stations.filter(function (st, idx) {
	        return !!(idx >= a && idx <= b);
	      });
	      rt.travelTime = ptxFn[me.company].catchData.getDataXS2STravelTime(from, to);
	    }
	  });
	  if (rt.RouteID.length == 0) rt = false;
	  return rt;
	}

	var findMapBlock = {};

	function findBlock(BlockID) {
	  if (findMapBlock[BlockID]) return findMapBlock[BlockID];
	  var blockData = this.getBlockData();
	  var aryBlock = blockData.reduce(function (c, n) {
	    return c.concat(n);
	  }, []);

	  for (var i = 0; i < aryBlock.length; i++) {
	    if (aryBlock[i].BlockID == BlockID) {
	      findMapBlock[BlockID] = aryBlock[i];
	      return CM.assign({}, aryBlock[i]);
	    }
	  }
	}

	function getAllLineRoute(from, to) {
	  var _this = this;

	  var maxCnt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
	  var me = this;
	  var company = me.company;
	  var fromObj = this.getStationBlockByID(from);
	  var toObj = this.getStationBlockByID(to);
	  if (!fromObj || !toObj) return [];
	  var cnt = 0;
	  var travel = [];

	  if (fromObj.BlockID == toObj.BlockID) {
	    travel.push([fromObj.BlockID]);
	  } else {
	    //1.指定站 BlockID出發，往陣列前後或本身是轉乘站的話往外路線查
	    //2.不走回頭路，查找到走過的 BlockID 就結束該條路徑
	    //3.當任一路線從 from 走到 to 後加入 travel 成為一條 route
	    var fullRoute = [[fromObj.BlockID]];
	    var bObj, linkTarget;

	    while (cnt < maxCnt && travel.length < 20) {
	      var tmpRouteAry = [];
	      cnt++;
	      fullRoute.map(function (stAry) {
	        var nowID = stAry[stAry.length - 1];
	        linkTarget = [];
	        bObj = me.findBlock(nowID);
	        bObj.near.map(function (near) {
	          if (stAry.indexOf(near) == -1) {
	            linkTarget.push(near);

	            if (near == toObj.BlockID) {
	              cnt++;
	              travel.push(stAry.concat([near]));
	            }
	          }
	        });

	        if (bObj.toIDList) {
	          bObj.toIDList.map(function (trans) {
	            var tmpBlockID = me.getStationBlockByID(trans).BlockID;

	            if (stAry.indexOf(tmpBlockID) == -1) {
	              linkTarget.push(tmpBlockID);

	              if (tmpBlockID == toObj.BlockID) {
	                cnt++;
	                travel.push(stAry.concat([tmpBlockID]));
	              }
	            }
	          });
	        }

	        linkTarget.map(function (blockID) {
	          tmpRouteAry.push(stAry.concat([blockID]));
	        });
	      });
	      fullRoute = tmpRouteAry;
	    } //4.路線重覆經過同一車站但不同路線視為迂迴要過濾掉不採用


	    travel = travel.filter(function (blockAry) {
	      var rt = true;
	      var already = [],
	          overLine = [];
	      blockAry.forEach(function (c) {
	        c = me.findBlock(c);

	        if (c.type == 'transfer') {
	          var stidx = already.indexOf(c.station);

	          if (stidx != -1 && stidx != already.length - 1) {
	            rt = false;
	          } else {
	            already = already.concat(c.toIDList);
	          }
	        } else {
	          already = already.concat(c.station);
	        }

	        if (overLine[overLine.length - 1] != c.LineID) overLine.push(c.LineID);
	      });
	      return rt;
	    });
	  }

	  return travel.map(function (ary) {
	    var mainRoute = [],
	        startStation = false;
	    var blockRoute = ary.map(function (c, idx, arr) {
	      var bk = _this.findBlock(c);

	      if (arr[idx + 1]) {
	        var nextBk = _this.findBlock(arr[idx + 1]);

	        var mySt = typeof bk.station == 'string' ? bk.station : bk.station[0];
	        if (idx == 0) mySt = from;
	        var nextSt = typeof nextBk.station == 'string' ? nextBk.station : nextBk.station[0];
	        if (idx == arr.length - 2) nextSt = to;
	        if (!startStation) startStation = mySt;
	        var tmpRoute = me.getMRTThrough(startStation, nextSt);
	        var isSameLineTrans = bk.type == 'transfer' && bk.toIDList.indexOf(bk.station != -1) && ptxFn[company].getStationIDInWhatLine(mySt) == ptxFn[company].getStationIDInWhatLine(nextSt);

	        if (tmpRoute) {
	          var lastMainRoute = mainRoute[mainRoute.length - 1];

	          if (lastMainRoute && lastMainRoute.Stations[0] == tmpRoute.Stations[0]) {
	            mainRoute[mainRoute.length - 1] = tmpRoute;
	          } else {
	            mainRoute.push(tmpRoute);
	          }
	        } else {
	          startStation = false;

	          if (isSameLineTrans) {
	            startStation = mySt;
	            tmpRoute = me.getMRTThrough(startStation, nextSt);
	            mainRoute.push(tmpRoute);
	          }
	        } //同線轉乘站的處理

	      } else if (arr.length == 1) {
	        var tmpRoute = me.getMRTThrough(from, to);
	        if (tmpRoute) mainRoute.push(tmpRoute);
	      } else {
	        var lastMainRoute = mainRoute[mainRoute.length - 1];
	        var tmpA = true;
	        lastMainRoute.Stations = lastMainRoute.Stations.filter(function (st) {
	          if (tmpA) {
	            if (st == to) tmpA = false;
	            return true;
	          }

	          return false;
	        });
	      }

	      return bk;
	    }); //組合有包括轉乘站的 travelRoute

	    var travelRoute = [],
	        station = [];
	    mainRoute.forEach(function (route, idx, arr) {
	      if (idx == 0 && from != route.Stations[0]) {
	        var transSt = me.findTransfer(from, route.Stations[0]);
	        if (transSt) travelRoute.push(transSt);
	      }

	      travelRoute.push(route);

	      if (arr[idx + 1]) {
	        var transSt = me.findTransfer(route.Stations.slice(-1)[0], arr[idx + 1].Stations[0]);
	        if (transSt) travelRoute.push(transSt);
	      }

	      if (idx == arr.length - 1 && to != route.Stations[route.Stations.length - 1]) {
	        var transSt = me.findTransfer(route.Stations[route.Stations.length - 1], to);
	        if (transSt) travelRoute.push(transSt);
	      }

	      station = station.concat(route.Stations);
	    });
	    var travelTime = travelRoute.reduce(function (val, tr) {
	      if (tr.travelTime && tr.travelTime.min) {
	        val += tr.travelTime.min;
	      } else if (tr.TransferTime) {
	        val += tr.TransferTime;
	      }

	      return val;
	    }, 0);
	    station = station.filter(function (c, idx, arr) {
	      return arr.indexOf(c) == idx;
	    });
	    var travelStation = station.slice();
	    if (travelStation[0] != from) travelStation.splice(0, 0, from);
	    if (travelStation[travelStation.length - 1] != to) travelStation.push(to);
	    return {
	      block: blockRoute,
	      station: station,
	      travelStation: travelStation,
	      route: mainRoute,
	      travelRoute: travelRoute,
	      travelTime: travelTime
	    };
	  }).sort(function (a, b) {
	    var rt = a.route.length > b.route.length ? 1 : -1;

	    if (a.route.length == b.route.length) {
	      rt = a.station.length > b.station.length ? 1 : -1;
	      if (a.travelTime && b.travelTime) rt = a.travelTime > b.travelTime ? 1 : -1;
	    }

	    return rt;
	  });
	}

	function baseMRT(company) {
	  var mrt = {
	    company: company
	  };
	  mrt.dataX = datax[company];

	  mrt.getBlockData = function () {
	    return blockMRTLineStation(company);
	  };

	  mrt.getAllLineRoute = getAllLineRoute.bind(mrt);
	  mrt.getStationBlockByID = getStationBlockByID.bind(mrt);
	  mrt.findBlock = findBlock.bind(mrt);
	  mrt.getMRTThrough = getMRTThrough.bind(mrt);

	  mrt.findTransfer = function (from, to) {
	    var LineID = ptxFn[company].getStationIDInWhatLine(from);
	    var transferList = ptxFn[company].catchData.getDataXTransferOfLine(LineID);
	    return transferList.find(function (c) {
	      return c.FromStationID == from && c.ToStationID == to;
	    });
	  };

	  return mrt;
	}

	var trtc$1 = function () {
	  return baseMRT('trtc');
	}();

	var krtc = function () {
	  return baseMRT('krtc');
	}();

	var tymetro$1 = function () {
	  return baseMRT('tymetro');
	}();

	var router$1 = {
	  trtc: trtc$1,
	  krtc: krtc,
	  tymetro: tymetro$1
	};

	var rbus = {};

	function cloneBusStationData(station) {
	  var a = {
	    StationID: station.StationID,
	    StationUID: station.StationUID,
	    StationName: station.StationName,
	    StationPosition: station.StationPosition,
	    StationAddress: station.StationAddress,
	    VersionID: station.VersionID
	  };
	  return JSON.parse(JSON.stringify(a));
	}

	rbus.findDirectBus =
	/*#__PURE__*/
	function () {
	  var _ref = _asyncToGenerator(
	  /*#__PURE__*/
	  regeneratorRuntime.mark(function _callee(posA, posB, citys, far) {
	    var aryStationsA, aryStationsB, i, tmpA, tmpB, aryMapping, hasBusStationA, hasBusStationB, aryRouteUIDs, tmpCity, busStopData, k, tmpBs, t, filterSameRouteObj, stationIDGroup;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            citys = citys || ['TPE', 'NWT'];
	            far = far || 250; // rocptx.router.bus.findDirectBus({lat:25.049991, lng:121.57715},{lat:25.046123, lng:121.537417}).then((e)=>{console.log(e)})

	            if (!(!posA.lat || !posA.lng)) {
	              _context.next = 4;
	              break;
	            }

	            return _context.abrupt("return", false);

	          case 4:
	            if (!(!posB.lat || !posB.lng)) {
	              _context.next = 6;
	              break;
	            }

	            return _context.abrupt("return", false);

	          case 6:
	            aryStationsA = [], aryStationsB = [];
	            i = 0;

	          case 8:
	            if (!(i < citys.length)) {
	              _context.next = 20;
	              break;
	            }

	            _context.next = 11;
	            return fnBUS.getPromisePositionBusStation(citys[i], posA.lat, posA.lng, {
	              far: far
	            });

	          case 11:
	            tmpA = _context.sent;
	            _context.next = 14;
	            return fnBUS.getPromisePositionBusStation(citys[i], posB.lat, posB.lng, {
	              far: far
	            });

	          case 14:
	            tmpB = _context.sent;
	            aryStationsA = aryStationsA.concat(tmpA);
	            aryStationsB = aryStationsB.concat(tmpB);

	          case 17:
	            i++;
	            _context.next = 8;
	            break;

	          case 20:
	            // 尋找 aryStationsA 中所有 Stops 的 RouteUID 和 aryStationsB 中所有 Stops 的 RouteUID 有 mapping 的
	            aryMapping = [], hasBusStationA = {}, hasBusStationB = {};
	            aryStationsA.forEach(function (stnA) {
	              stnA.Stops.forEach(function (stpA) {
	                aryStationsB.forEach(function (stnB) {
	                  stnB.Stops.forEach(function (stpB) {
	                    if (stpA.RouteUID == stpB.RouteUID) {
	                      var stsA_data = cloneBusStationData(stnA);
	                      var stsB_data = cloneBusStationData(stnB);
	                      var dataA = Object.assign({
	                        stationData: stsA_data
	                      }, stpA);
	                      var dataB = Object.assign({
	                        stationData: stsB_data
	                      }, stpB);
	                      hasBusStationA[stsA_data.StationUID] = stsA_data;
	                      hasBusStationB[stsB_data.StationUID] = stsB_data;
	                      aryMapping.push({
	                        RouteUID: stpA.RouteUID,
	                        city: stpA.RouteUID.substr(0, 3),
	                        from: dataA,
	                        to: dataB
	                      });
	                    }
	                  });
	                });
	              });
	            }); // 將 Route Stop 放進物件中

	            aryRouteUIDs = {};

	            for (i = 0; i < aryMapping.length; i++) {
	              // getPromiseMultiBusStopRoute
	              tmpCity = aryMapping[i].city;
	              if (!aryRouteUIDs[tmpCity]) aryRouteUIDs[tmpCity] = [];
	              if (aryRouteUIDs[tmpCity].indexOf(aryMapping[i].RouteUID) == -1) aryRouteUIDs[tmpCity].push(aryMapping[i].RouteUID);
	            }

	            busStopData = [];
	            _context.t0 = regeneratorRuntime.keys(aryRouteUIDs);

	          case 26:
	            if ((_context.t1 = _context.t0()).done) {
	              _context.next = 34;
	              break;
	            }

	            k = _context.t1.value;
	            _context.next = 30;
	            return fnBUS.getPromiseMultiBusStopRoute(aryRouteUIDs[k], k);

	          case 30:
	            tmpBs = _context.sent;
	            busStopData = busStopData.concat(tmpBs);
	            _context.next = 26;
	            break;

	          case 34:
	            for (i = 0; i < aryMapping.length; i++) {
	              t = aryMapping[i];
	              busStopData.forEach(function (routeStops) {
	                var flgMatchStop = routeStops.Stops.find(function (c) {
	                  return c.StopUID == t.from.StopUID;
	                });

	                if (flgMatchStop) {
	                  aryMapping[i].busInfo = routeStops;
	                  var aidx = routeStops.Stops.findIndex(function (g) {
	                    return g.StopUID == t.from.StopUID;
	                  });
	                  var bidx = routeStops.Stops.findIndex(function (g) {
	                    return g.StopUID == t.to.StopUID;
	                  });
	                  aryMapping[i].fromStopIndex = aidx;
	                  aryMapping[i].toStopIndex = bidx;
	                  aryMapping[i].isRightBus = !!(aidx < bidx);
	                }
	              });
	            }

	            filterSameRouteObj = {};
	            aryMapping = aryMapping.filter(function (c) {
	              return c.isRightBus;
	            }).filter(function (c) {
	              if (!filterSameRouteObj[c.RouteUID]) {
	                filterSameRouteObj[c.RouteUID] = true;
	                return true;
	              } else {
	                return false;
	              }
	            }); // Group Station

	            stationIDGroup = {};
	            aryMapping.forEach(function (c, idx) {
	              var stationID = c.from.stationData.StationID.toString();
	              if (!stationIDGroup[stationID]) stationIDGroup[stationID] = [];
	              stationIDGroup[stationID].push({
	                mappingIndex: idx,
	                RouteUID: c.RouteUID
	              });
	            });
	            return _context.abrupt("return", {
	              hasBusStationA: hasBusStationA,
	              hasBusStationB: hasBusStationB,
	              mappingStops: aryMapping,
	              fromStationGroup: stationIDGroup
	            });

	          case 40:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));

	  return function (_x, _x2, _x3, _x4) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var router$2 = {
	  bus: rbus,
	  v1: router,
	  v2: router$1
	};

	var inBrowser = CM.inBrowser;
	var combine = {
	  data: pData,
	  datax: datax,
	  bus: fnBUS,
	  metro: metro,
	  trtc: fnMRT,
	  tmrt: fnMRT$1,
	  krtc: fnMRT$2,
	  tymetro: fnMRT$3,
	  klrt: fnMRT$4,
	  thsr: thsr,
	  tra: tra$1,
	  router: router$2,
	  jsSHA: jsSHA,
	  id: id$2,
	  common: CM
	};

	for (var k$1 in combine) {
	  ptx[k$1] = combine[k$1];
	}

	if (inBrowser) {
	  if (!window.rocptx) window.rocptx = ptx;
	  if (!window.$trainTaiwanLib) window.$trainTaiwanLib = {};
	  if (!window.$trainTaiwanLib.ptx) window.$trainTaiwanLib.ptx = ptx;
	  if (!window.Promise) console.log("PTX library need Promise, please include a Promise polyfill.");
	}

	return ptx;

}));
