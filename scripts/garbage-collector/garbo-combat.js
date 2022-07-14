/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3932:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var tryToString = __webpack_require__(5637);

var TypeError = global.TypeError; // `Assert: IsCallable(argument) is true`

module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),

/***/ 2569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isObject = __webpack_require__(794);

var String = global.String;
var TypeError = global.TypeError; // `Assert: Type(argument) is Object`

module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};

/***/ }),

/***/ 5766:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(2977);

var toAbsoluteIndex = __webpack_require__(6782);

var lengthOfArrayLike = __webpack_require__(1825); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ 9624:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

/***/ }),

/***/ 3058:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var TO_STRING_TAG_SUPPORT = __webpack_require__(8191);

var isCallable = __webpack_require__(9212);

var classofRaw = __webpack_require__(9624);

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object; // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

/***/ }),

/***/ 3478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(2870);

var ownKeys = __webpack_require__(929);

var getOwnPropertyDescriptorModule = __webpack_require__(6683);

var definePropertyModule = __webpack_require__(4615);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

/***/ }),

/***/ 57:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ 4677:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ 5999:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPropertyKey = __webpack_require__(8734);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),

/***/ 8494:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544); // Detect IE8's incomplete defineProperty implementation


module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function get() {
      return 7;
    }
  })[1] != 7;
});

/***/ }),

/***/ 6668:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isObject = __webpack_require__(794);

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ 6918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(6061);

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),

/***/ 4061:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var userAgent = __webpack_require__(6918);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

/***/ }),

/***/ 5690:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ 7263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var getOwnPropertyDescriptor = (__webpack_require__(6683).f);

var createNonEnumerableProperty = __webpack_require__(57);

var redefine = __webpack_require__(1270);

var setGlobal = __webpack_require__(460);

var copyConstructorProperties = __webpack_require__(3478);

var isForced = __webpack_require__(4451);
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ 6544:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ 2938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var aCallable = __webpack_require__(3932);

var bind = uncurryThis(uncurryThis.bind); // optional / simple context binding

module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : bind ? bind(fn, that) : function
    /* ...args */
  () {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 8262:
/***/ ((module) => {

var call = Function.prototype.call;
module.exports = call.bind ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

/***/ }),

/***/ 4340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var hasOwn = __webpack_require__(2870);

var FunctionPrototype = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

/***/ }),

/***/ 7386:
/***/ ((module) => {

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var callBind = bind && bind.bind(call);
module.exports = bind ? function (fn) {
  return fn && callBind(call, fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};

/***/ }),

/***/ 6061:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var aFunction = function aFunction(argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),

/***/ 8272:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(3058);

var getMethod = __webpack_require__(911);

var Iterators = __webpack_require__(339);

var wellKnownSymbol = __webpack_require__(3649);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};

/***/ }),

/***/ 6307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var call = __webpack_require__(8262);

var aCallable = __webpack_require__(3932);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var getIteratorMethod = __webpack_require__(8272);

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};

/***/ }),

/***/ 911:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(3932); // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod


module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

/***/ }),

/***/ 7583:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

/***/ }),

/***/ 2870:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toObject = __webpack_require__(1324);

var hasOwnProperty = uncurryThis({}.hasOwnProperty); // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

/***/ }),

/***/ 4639:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 275:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var fails = __webpack_require__(6544);

var createElement = __webpack_require__(6668); // Thank's IE8 for his funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ 5044:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

var fails = __webpack_require__(6544);

var classof = __webpack_require__(9624);

var Object = global.Object;
var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;

/***/ }),

/***/ 9734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var isCallable = __webpack_require__(9212);

var store = __webpack_require__(1314);

var functionToString = uncurryThis(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

/***/ }),

/***/ 2743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(9491);

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

var isObject = __webpack_require__(794);

var createNonEnumerableProperty = __webpack_require__(57);

var hasOwn = __webpack_require__(2870);

var shared = __webpack_require__(1314);

var sharedKey = __webpack_require__(9137);

var hiddenKeys = __webpack_require__(4639);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);

  set = function set(it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget(store, it) || {};
  };

  has = function has(it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };

  has = function has(it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ 114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var Iterators = __webpack_require__(339);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),

/***/ 9212:
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};

/***/ }),

/***/ 4451:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ 794:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

/***/ }),

/***/ 6268:
/***/ ((module) => {

module.exports = false;

/***/ }),

/***/ 5871:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var getBuiltIn = __webpack_require__(6061);

var isCallable = __webpack_require__(9212);

var isPrototypeOf = __webpack_require__(2447);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var Object = global.Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};

/***/ }),

/***/ 4026:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var bind = __webpack_require__(2938);

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var isArrayIteratorMethod = __webpack_require__(114);

var lengthOfArrayLike = __webpack_require__(1825);

var isPrototypeOf = __webpack_require__(2447);

var getIterator = __webpack_require__(6307);

var getIteratorMethod = __webpack_require__(8272);

var iteratorClose = __webpack_require__(7093);

var TypeError = global.TypeError;

var Result = function Result(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function stop(condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function callFn(value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      }

      return new Result(false);
    }

    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;

  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }

    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  }

  return new Result(false);
};

/***/ }),

/***/ 7093:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var getMethod = __webpack_require__(911);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);

  try {
    innerResult = getMethod(iterator, 'return');

    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }

    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }

  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

/***/ }),

/***/ 339:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 1825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(97); // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike


module.exports = function (obj) {
  return toLength(obj.length);
};

/***/ }),

/***/ 8640:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(4061);

var fails = __webpack_require__(6544); // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing


module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),

/***/ 9491:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var inspectSource = __webpack_require__(9734);

var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));

/***/ }),

/***/ 4615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var DESCRIPTORS = __webpack_require__(8494);

var IE8_DOM_DEFINE = __webpack_require__(275);

var anObject = __webpack_require__(2569);

var toPropertyKey = __webpack_require__(8734);

var TypeError = global.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 6683:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var call = __webpack_require__(8262);

var propertyIsEnumerableModule = __webpack_require__(112);

var createPropertyDescriptor = __webpack_require__(4677);

var toIndexedObject = __webpack_require__(2977);

var toPropertyKey = __webpack_require__(8734);

var hasOwn = __webpack_require__(2870);

var IE8_DOM_DEFINE = __webpack_require__(275); // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe


var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

/***/ }),

/***/ 9275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8356);

var enumBugKeys = __webpack_require__(5690);

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),

/***/ 4012:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 2447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),

/***/ 8356:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var hasOwn = __webpack_require__(2870);

var toIndexedObject = __webpack_require__(2977);

var indexOf = (__webpack_require__(5766).indexOf);

var hiddenKeys = __webpack_require__(4639);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (hasOwn(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
  }

  return result;
};

/***/ }),

/***/ 112:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),

/***/ 6252:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var call = __webpack_require__(8262);

var isCallable = __webpack_require__(9212);

var isObject = __webpack_require__(794);

var TypeError = global.TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(6061);

var uncurryThis = __webpack_require__(7386);

var getOwnPropertyNamesModule = __webpack_require__(9275);

var getOwnPropertySymbolsModule = __webpack_require__(4012);

var anObject = __webpack_require__(2569);

var concat = uncurryThis([].concat); // all object keys, includes non-enumerable and symbols

module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),

/***/ 1270:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var hasOwn = __webpack_require__(2870);

var createNonEnumerableProperty = __webpack_require__(57);

var setGlobal = __webpack_require__(460);

var inspectSource = __webpack_require__(9734);

var InternalStateModule = __webpack_require__(2743);

var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(4340).CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;

  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }

    if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
      createNonEnumerableProperty(value, 'name', name);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});

/***/ }),

/***/ 3955:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var TypeError = global.TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ 460:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583); // eslint-disable-next-line es/no-object-defineproperty -- safe


var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),

/***/ 9137:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(7836);

var uid = __webpack_require__(8284);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ 1314:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var setGlobal = __webpack_require__(460);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),

/***/ 7836:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(6268);

var store = __webpack_require__(1314);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

/***/ }),

/***/ 6782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ 2977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(5044);

var requireObjectCoercible = __webpack_require__(3955);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ 7486:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor; // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity

module.exports = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- safe

  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

/***/ }),

/***/ 97:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var min = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ 1324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var requireObjectCoercible = __webpack_require__(3955);

var Object = global.Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ 9772:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var call = __webpack_require__(8262);

var isObject = __webpack_require__(794);

var isSymbol = __webpack_require__(5871);

var getMethod = __webpack_require__(911);

var ordinaryToPrimitive = __webpack_require__(6252);

var wellKnownSymbol = __webpack_require__(3649);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

/***/ }),

/***/ 8734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(9772);

var isSymbol = __webpack_require__(5871); // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey


module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

/***/ }),

/***/ 8191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),

/***/ 5637:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};

/***/ }),

/***/ 8284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),

/***/ 7786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(8640);

module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),

/***/ 3649:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var shared = __webpack_require__(7836);

var hasOwn = __webpack_require__(2870);

var uid = __webpack_require__(8284);

var NATIVE_SYMBOL = __webpack_require__(8640);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),

/***/ 5809:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var iterate = __webpack_require__(4026);

var createProperty = __webpack_require__(5999); // `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries


$({
  target: 'Object',
  stat: true
}, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, {
      AS_ENTRIES: true
    });
    return obj;
  }
});

/***/ }),

/***/ 2219:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ Copier)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Copier = /*#__PURE__*/_createClass(function Copier(couldCopy, prepare, canCopy, copiedMonster, fightCopy) {
  _classCallCheck(this, Copier);

  _defineProperty(this, "couldCopy", void 0);

  _defineProperty(this, "prepare", void 0);

  _defineProperty(this, "canCopy", void 0);

  _defineProperty(this, "copiedMonster", void 0);

  _defineProperty(this, "fightCopy", null);

  this.couldCopy = couldCopy;
  this.prepare = prepare;
  this.canCopy = canCopy;
  this.copiedMonster = copiedMonster;
  if (fightCopy) this.fightCopy = fightCopy;
});

/***/ }),

/***/ 4782:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "K": () => (/* binding */ ensureFreeRun)
});

// UNUSED EXPORTS: tryFindFreeRun

// EXTERNAL MODULE: external "kolmafia"
var external_kolmafia_ = __webpack_require__(7530);
// EXTERNAL MODULE: ./node_modules/libram/dist/combat.js
var combat = __webpack_require__(1762);
// EXTERNAL MODULE: ./node_modules/libram/dist/lib.js
var lib = __webpack_require__(3311);
// EXTERNAL MODULE: ./node_modules/libram/dist/maximize.js
var maximize = __webpack_require__(9376);
// EXTERNAL MODULE: ./node_modules/libram/dist/property.js + 2 modules
var property = __webpack_require__(2474);
// EXTERNAL MODULE: ./node_modules/libram/dist/template-string.js
var template_string = __webpack_require__(678);
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2009/Bandersnatch.js
var _templateObject, _templateObject2, _templateObject3;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var familiar = (0,template_string/* $familiar */.HP)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Frumious Bandersnatch"])));
/**
 * Returns true if the player has the Frumious Bandersnatch in their
 * terrarium
 */

function have() {
  return (0,lib/* have */.lf)(familiar);
}
/**
 * Returns the number of free runaways that have already been used
 * @see StompingBoots with which the Bandersnatch shares a counter
 */

function getRunaways() {
  return (0,property/* get */.U2)("_banderRunaways");
}
/**
 * Returns the total number of free runaways that the player can
 * get from their Bandersnatch
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */

function getMaxRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var weightBuffs = considerWeightAdjustment ? (0,external_kolmafia_.weightAdjustment)() : 0;
  return Math.floor(((0,external_kolmafia_.familiarWeight)(familiar) + weightBuffs) / 5);
}
/**
 * Returns the number of remaining free runaways the player can
 * get from their Bandersnatch
 *
 * @param considerWeightAdjustment
 */

function getRemainingRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return Math.max(0, getMaxRunaways(considerWeightAdjustment) - getRunaways());
}
/**
 * Returns true if the player could use their Bandersnatch to
 * get a free run in theory
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */

function couldRunaway() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return have() && getRemainingRunaways(considerWeightAdjustment) > 0;
}
var odeSkill = (0,template_string/* $skill */.tm)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["The Ode to Booze"])));
var odeEffect = (0,template_string/* $effect */._G)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Ode to Booze"])));
/**
 * Returns true if the player can use their Bandersnatch to get a
 * free run right now
 */

function canRunaway() {
  return isCurrentFamiliar(familiar) && couldRunaway() && _have(odeEffect);
}
/**
 * Prepare a Bandersnatch runaway.
 *
 * This will cast Ode to Booze and take your Bandersnatch with you.
 * If any of those steps fail, it will return false.
 *
 * @param songsToRemove Ordered list of songs that could be shrugged to make room for Ode to Booze
 */

function prepareRunaway(songsToRemove) {
  if (!_have(odeEffect)) {
    if (!_have(odeSkill)) {
      return false;
    }

    if (!canRememberSong()) {
      var activeSongs = getActiveSongs();

      var _iterator = _createForOfIteratorHelper(songsToRemove),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var song = _step.value;

          if (activeSongs.includes(song) && uneffect(song)) {
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    if (!useSkill(odeSkill)) {
      return false;
    }
  }

  return useFamiliar(familiar);
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2011/StompingBoots.js
var StompingBoots_templateObject;

function StompingBoots_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var StompingBoots_familiar = (0,template_string/* $familiar */.HP)(StompingBoots_templateObject || (StompingBoots_templateObject = StompingBoots_taggedTemplateLiteral(["Pair of Stomping Boots"])));
/**
 * Returns true if the player has the Pair of Stomping Boots in their
 * terrarium
 */

function StompingBoots_have() {
  return (0,lib/* have */.lf)(StompingBoots_familiar);
}
/**
 * Returns the number of free runaways that have already been used
 * @see Bandersnatch with which the Stomping Boots shares a counter
 */

function StompingBoots_getRunaways() {
  return (0,property/* get */.U2)("_banderRunaways");
}
/**
 * Returns the total number of free runaways that the player can
 * get from their Stomping Boots
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */

function StompingBoots_getMaxRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var weightBuffs = considerWeightAdjustment ? (0,external_kolmafia_.weightAdjustment)() : 0;
  return Math.floor(((0,external_kolmafia_.familiarWeight)(StompingBoots_familiar) + weightBuffs) / 5);
}
/**
 * Returns the number of remaining free runaways the player can
 * get from their Stomping Boots
 *
 * @param considerWeightAdjustment
 */

function StompingBoots_getRemainingRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return Math.max(0, StompingBoots_getMaxRunaways(considerWeightAdjustment) - StompingBoots_getRunaways());
}
/**
 * Returns true if the player could use their Stomping Boots to
 * get a free run in theory
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */

function StompingBoots_couldRunaway() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return StompingBoots_have() && StompingBoots_getRemainingRunaways(considerWeightAdjustment) > 0;
}
/**
 * Returns true if the player can use their Stomping Boots to get a
 * free run right now
 */

function StompingBoots_canRunaway() {
  return isCurrentFamiliar(StompingBoots_familiar) && StompingBoots_couldRunaway();
}
/**
 * Prepare a Stomping Boots runaway.
 *
 * This will take your Stomping Boots with you.
 * If any of those steps fail, it will return false.
 */

function StompingBoots_prepareRunaway() {
  return useFamiliar(StompingBoots_familiar);
}
// EXTERNAL MODULE: ./node_modules/libram/dist/resources/2017/AsdonMartin.js
var AsdonMartin = __webpack_require__(7867);
// EXTERNAL MODULE: ./node_modules/libram/dist/utils.js
var utils = __webpack_require__(8588);
;// CONCATENATED MODULE: ./node_modules/libram/dist/actions/ActionSource.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ActionSource_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = ActionSource_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || ActionSource_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function ActionSource_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ActionSource_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ActionSource_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return ActionSource_arrayLikeToArray(arr); }

function ActionSource_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






function mergeConstraints() {
  for (var _len = arguments.length, allConstraints = new Array(_len), _key = 0; _key < _len; _key++) {
    allConstraints[_key] = arguments[_key];
  }

  var familiars = allConstraints.map(constraints => constraints.familiar).filter(familiar => familiar);

  if (familiars.length > 1) {
    // Inconsistent requirements.
    return null;
  }

  return {
    equipmentRequirements: () => maximize/* Requirement.merge */.nb.merge(_toConsumableArray(allConstraints.map(constraints => {
      var _constraints$equipmen, _constraints$equipmen2;

      return (_constraints$equipmen = (_constraints$equipmen2 = constraints.equipmentRequirements) === null || _constraints$equipmen2 === void 0 ? void 0 : _constraints$equipmen2.call(constraints)) !== null && _constraints$equipmen !== void 0 ? _constraints$equipmen : new maximize/* Requirement */.nb([], {});
    }))),
    preparation: () => {
      var success = true;

      var _iterator = ActionSource_createForOfIteratorHelper(allConstraints),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var constraints = _step.value;
          success = success && (!constraints.preparation || constraints.preparation());
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return success;
    },
    familiar: familiars.find(familiar => familiar),
    cost: () => (0,utils/* sum */.Sm)(allConstraints, constraints => {
      var _constraints$cost, _constraints$cost2;

      return (_constraints$cost = (_constraints$cost2 = constraints.cost) === null || _constraints$cost2 === void 0 ? void 0 : _constraints$cost2.call(constraints)) !== null && _constraints$cost !== void 0 ? _constraints$cost : 0;
    })
  };
}
/**
 * A combat-based action resource in the game (e.g. a free run or free kill).
 */


var ActionSource = /*#__PURE__*/function () {
  // Infinity: unlimited

  /**
   * @param source Source(s) of the action (e.g. item, skill, or familiar needed).
   * @param potential Function returning how many times this action can be used.
   * @param macro Macro to execute this action in combat.
   * @param constraints Constraints required for this action to be available.
   */
  function ActionSource(source, potential, macro) {
    var constraints = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, ActionSource);

    _defineProperty(this, "source", void 0);

    _defineProperty(this, "potential", void 0);

    _defineProperty(this, "macro", void 0);

    _defineProperty(this, "constraints", void 0);

    this.source = source;
    this.potential = potential;
    this.macro = macro;
    this.constraints = constraints;
  }
  /**
   * @returns Name of the action source.
   */


  _createClass(ActionSource, [{
    key: "name",
    value: function name() {
      return this.source.toString();
    }
    /**
     * @returns Whether the action is available.
     */

  }, {
    key: "available",
    value: function available() {
      return this.potential() > 0;
    }
    /**
     * @returns Cost in meat per usage of the action.
     */

  }, {
    key: "cost",
    value: function cost() {
      return this.constraints.cost ? this.constraints.cost() : 0;
    }
    /**
     * @returns Whether the action costs 0 meat to use.
     */

  }, {
    key: "isFree",
    value: function isFree() {
      return !this.cost || this.cost() === 0;
    }
    /**
     * @returns Whether unlimited uses of the action are available.
     */

  }, {
    key: "isUnlimited",
    value: function isUnlimited() {
      return this.potential() === Infinity;
    }
    /**
     * Create a compound action source with merged constraints.
     * @param others Other actions to have available.
     * @returns Merged constraints, or null if they are inconsistent.
     */

  }, {
    key: "merge",
    value: function merge() {
      for (var _len2 = arguments.length, others = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        others[_key2] = arguments[_key2];
      }

      var actions = [this].concat(others);
      var constraints = mergeConstraints.apply(void 0, _toConsumableArray(actions.map(action => action.constraints)));

      if (constraints === null) {
        // Inconsistent constraints - no path forward here.
        return null;
      }

      return new ActionSource(_toConsumableArray(actions.map(action => action.source).flat()), () => (0,utils/* sum */.Sm)(actions, action => action.potential()), combat/* Macro.step.apply */.LE.step.apply(combat/* Macro */.LE, _toConsumableArray(actions.map(action => action.macro))), constraints);
    }
    /**
     * Perform all preparation necessary to make this action available.
     * @param otherRequirements Any other equipment requirements.
     * @returns Whether preparation succeeded.
     */

  }, {
    key: "prepare",
    value: function prepare(otherRequirements) {
      var _this$constraints$fam, _this$constraints;

      if ((_this$constraints$fam = (_this$constraints = this.constraints).familiar) !== null && _this$constraints$fam !== void 0 && _this$constraints$fam.call(_this$constraints)) {
        if (!(0,external_kolmafia_.useFamiliar)(this.constraints.familiar())) return false;
      }

      if (this.constraints.equipmentRequirements) {
        var requirement = otherRequirements ? otherRequirements.merge(this.constraints.equipmentRequirements()) : this.constraints.equipmentRequirements();
        if (!requirement.maximize()) return false;
      }

      if (this.constraints.preparation) return this.constraints.preparation();
      return true;
    }
    /**
     * Perform all preparation necessary to make this action available.
     * Throws an error if preparation fails.
     * @param otherRequirements Any other equipment requirements.
     */

  }, {
    key: "ensure",
    value: function ensure(otherRequirements) {
      if (!this.prepare(otherRequirements)) {
        throw new Error("Failed to prepare action ".concat(this.name(), "."));
      }
    }
  }]);

  return ActionSource;
}();

_defineProperty(ActionSource, "defaultPriceFunction", item => (0,external_kolmafia_.mallPrice)(item) > 0 ? (0,external_kolmafia_.mallPrice)(item) : Infinity);

function filterAction(action, constraints) {
  var _constraints$requireF, _constraints$requireU, _constraints$noFamili, _constraints$noRequir, _constraints$noPrepar, _constraints$maximumC, _constraints$maximumC2;

  return action.available() && (constraints.allowedAction === undefined || constraints.allowedAction(action)) && !((_constraints$requireF = constraints.requireFamiliar) !== null && _constraints$requireF !== void 0 && _constraints$requireF.call(constraints) && !action.constraints.familiar) && !((_constraints$requireU = constraints.requireUnlimited) !== null && _constraints$requireU !== void 0 && _constraints$requireU.call(constraints) && !action.isUnlimited()) && !((_constraints$noFamili = constraints.noFamiliar) !== null && _constraints$noFamili !== void 0 && _constraints$noFamili.call(constraints) && action.constraints.familiar) && !((_constraints$noRequir = constraints.noRequirements) !== null && _constraints$noRequir !== void 0 && _constraints$noRequir.call(constraints) && action.constraints.equipmentRequirements) && !((_constraints$noPrepar = constraints.noPreparation) !== null && _constraints$noPrepar !== void 0 && _constraints$noPrepar.call(constraints) && action.constraints.preparation) && action.cost() <= ((_constraints$maximumC = (_constraints$maximumC2 = constraints.maximumCost) === null || _constraints$maximumC2 === void 0 ? void 0 : _constraints$maximumC2.call(constraints)) !== null && _constraints$maximumC !== void 0 ? _constraints$maximumC : 0);
}
/**
 * Find an available action source subject to constraints.
 * @param actions Action source list.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Available action source satisfying constraints, or null.
 */


function findActionSource(actions) {
  var constraints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var validActions = actions.filter(actions => filterAction(actions, constraints));
  if (validActions.length < 1) return null;
  return validActions.reduce((a, b) => a.cost() <= b.cost() ? a : b);
}
/**
 * Count available action sources subject to constraints. Note that, if
 * constraints.maximumCost is high enough, this will return Infinity.
 * @param actions Action source list.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Count of available action sources.
 */

function actionSourcesAvailable(actions) {
  var constraints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // TODO: This will overcount if any Actions share a counter
  return sum(actions.filter(action => filterAction(action, constraints !== null && constraints !== void 0 ? constraints : {})), action => action.potential());
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/actions/FreeRun.js
var FreeRun_templateObject, FreeRun_templateObject2, FreeRun_templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58;

function FreeRun_toConsumableArray(arr) { return FreeRun_arrayWithoutHoles(arr) || FreeRun_iterableToArray(arr) || FreeRun_unsupportedIterableToArray(arr) || FreeRun_nonIterableSpread(); }

function FreeRun_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function FreeRun_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return FreeRun_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return FreeRun_arrayLikeToArray(o, minLen); }

function FreeRun_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function FreeRun_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return FreeRun_arrayLikeToArray(arr); }

function FreeRun_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function FreeRun_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }










 // Value of _lastCombatStarted the last time we updated scrapbook charges.

var scrapbookChargesLastUpdated = (0,property/* get */.U2)("_lastCombatStarted"); // Free unlimited source every 30 turns.
// Does not work on special monsters so needs a backup, see tryFindFreeRun.
// banishedMonsters isn't updated if the free run succeeds on an unbanishable monster

var asdonMartinSource = new ActionSource((0,template_string/* $skill */.tm)(FreeRun_templateObject || (FreeRun_templateObject = FreeRun_taggedTemplateLiteral(["Asdon Martin: Spring-Loaded Front Bumper"]))), () => {
  if (!AsdonMartin/* installed */.bL()) return 0;
  var banishes = (0,property/* get */.U2)("banishedMonsters").split(":");
  var bumperIndex = banishes.map(string => string.toLowerCase()).indexOf("spring-loaded front bumper");
  if (bumperIndex === -1) return 1;
  return (0,external_kolmafia_.myTurncount)() - parseInt(banishes[bumperIndex + 1]) > 30 ? 1 : 0;
}, combat/* Macro.trySkill */.LE.trySkill((0,template_string/* $skill */.tm)(FreeRun_templateObject2 || (FreeRun_templateObject2 = FreeRun_taggedTemplateLiteral(["Asdon Martin: Spring-Loaded Front Bumper"])))), {
  preparation: () => AsdonMartin/* fillTo */.Vg(50)
});
var freeRunSources = [// Free limited sources
new ActionSource(familiar, () => ((0,lib/* have */.lf)((0,template_string/* $effect */._G)(FreeRun_templateObject3 || (FreeRun_templateObject3 = FreeRun_taggedTemplateLiteral(["Ode to Booze"])))) || (0,lib/* getSongCount */.uG)() < (0,lib/* getSongLimit */.KN)()) && couldRunaway() ? getRemainingRunaways() : 0, combat/* Macro.step */.LE.step("runaway"), {
  equipmentRequirements: () => new maximize/* Requirement */.nb(["Familiar Weight"], {}),
  preparation: () => {
    (0,lib/* ensureEffect */.pq)((0,template_string/* $effect */._G)(_templateObject4 || (_templateObject4 = FreeRun_taggedTemplateLiteral(["Ode to Booze"]))));
    return (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject5 || (_templateObject5 = FreeRun_taggedTemplateLiteral(["Ode to Booze"]))));
  },
  familiar: () => familiar
}), new ActionSource(StompingBoots_familiar, () => StompingBoots_couldRunaway() ? StompingBoots_getRemainingRunaways() : 0, combat/* Macro.step */.LE.step("runaway"), {
  equipmentRequirements: () => new maximize/* Requirement */.nb(["Familiar Weight"], {}),
  familiar: () => StompingBoots_familiar
}), new ActionSource((0,template_string/* $skill */.tm)(_templateObject6 || (_templateObject6 = FreeRun_taggedTemplateLiteral(["Snokebomb"]))), () => (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(_templateObject7 || (_templateObject7 = FreeRun_taggedTemplateLiteral(["Snokebomb"])))) ? 3 - (0,property/* get */.U2)("_snokebombUsed") : 0, combat/* Macro.skill */.LE.skill((0,template_string/* $skill */.tm)(_templateObject8 || (_templateObject8 = FreeRun_taggedTemplateLiteral(["Snokebomb"])))), {
  preparation: () => (0,external_kolmafia_.restoreMp)(50)
}), new ActionSource((0,template_string/* $skill */.tm)(_templateObject9 || (_templateObject9 = FreeRun_taggedTemplateLiteral(["Emotionally Chipped"]))), () => (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(_templateObject10 || (_templateObject10 = FreeRun_taggedTemplateLiteral(["Emotionally Chipped"])))) ? 3 - (0,property/* get */.U2)("_feelHatredUsed") : 0, combat/* Macro.skill */.LE.skill((0,template_string/* $skill */.tm)(_templateObject11 || (_templateObject11 = FreeRun_taggedTemplateLiteral(["Feel Hatred"]))))), new ActionSource((0,template_string/* $item */.xr)(_templateObject12 || (_templateObject12 = FreeRun_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"]))), () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject13 || (_templateObject13 = FreeRun_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))) ? 3 - (0,property/* get */.U2)("_kgbTranquilizerDartUses") : 0, combat/* Macro.skill */.LE.skill((0,template_string/* $skill */.tm)(_templateObject14 || (_templateObject14 = FreeRun_taggedTemplateLiteral(["KGB tranquilizer dart"])))), {
  equipmentRequirements: () => new maximize/* Requirement */.nb([], {
    forceEquip: (0,template_string/* $items */.vS)(_templateObject15 || (_templateObject15 = FreeRun_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))
  })
}), new ActionSource((0,template_string/* $item */.xr)(_templateObject16 || (_templateObject16 = FreeRun_taggedTemplateLiteral(["latte lovers member's mug"]))), () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject17 || (_templateObject17 = FreeRun_taggedTemplateLiteral(["latte lovers member's mug"])))) && !(0,property/* get */.U2)("_latteBanishUsed") ? 1 : 0, combat/* Macro.skill */.LE.skill((0,template_string/* $skill */.tm)(_templateObject18 || (_templateObject18 = FreeRun_taggedTemplateLiteral(["Throw Latte on Opponent"])))), {
  equipmentRequirements: () => new maximize/* Requirement */.nb([], {
    forceEquip: (0,template_string/* $items */.vS)(_templateObject19 || (_templateObject19 = FreeRun_taggedTemplateLiteral(["latte lovers member's mug"])))
  })
}), new ActionSource((0,template_string/* $item */.xr)(_templateObject20 || (_templateObject20 = FreeRun_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]))), () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject21 || (_templateObject21 = FreeRun_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))) ? 3 - (0,property/* get */.U2)("_reflexHammerUsed") : 0, combat/* Macro.skill */.LE.skill((0,template_string/* $skill */.tm)(_templateObject22 || (_templateObject22 = FreeRun_taggedTemplateLiteral(["Reflex Hammer"])))), {
  equipmentRequirements: () => new maximize/* Requirement */.nb([], {
    forceEquip: (0,template_string/* $items */.vS)(_templateObject23 || (_templateObject23 = FreeRun_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))
  })
}), new ActionSource((0,template_string/* $item */.xr)(_templateObject24 || (_templateObject24 = FreeRun_taggedTemplateLiteral(["mafia middle finger ring"]))), () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject25 || (_templateObject25 = FreeRun_taggedTemplateLiteral(["mafia middle finger ring"])))) && (0,external_kolmafia_.canEquip)((0,template_string/* $item */.xr)(_templateObject26 || (_templateObject26 = FreeRun_taggedTemplateLiteral(["mafia middle finger ring"])))) && !(0,property/* get */.U2)("_mafiaMiddleFingerRingUsed") ? 1 : 0, combat/* Macro.skill */.LE.skill((0,template_string/* $skill */.tm)(_templateObject27 || (_templateObject27 = FreeRun_taggedTemplateLiteral(["Show them your ring"])))), {
  equipmentRequirements: () => new maximize/* Requirement */.nb([], {
    forceEquip: (0,template_string/* $items */.vS)(_templateObject28 || (_templateObject28 = FreeRun_taggedTemplateLiteral(["mafia middle finger ring"])))
  })
}), new ActionSource((0,template_string/* $item */.xr)(_templateObject29 || (_templateObject29 = FreeRun_taggedTemplateLiteral(["V for Vivala mask"]))), () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject30 || (_templateObject30 = FreeRun_taggedTemplateLiteral(["V for Vivala mask"])))) && !(0,property/* get */.U2)("_vmaskBanisherUsed") ? 1 : 0, combat/* Macro.skill */.LE.skill((0,template_string/* $skill */.tm)(_templateObject31 || (_templateObject31 = FreeRun_taggedTemplateLiteral(["Creepy Grin"])))), {
  equipmentRequirements: () => new maximize/* Requirement */.nb([], {
    forceEquip: (0,template_string/* $items */.vS)(_templateObject32 || (_templateObject32 = FreeRun_taggedTemplateLiteral(["V for Vivala mask"])))
  }),
  preparation: () => (0,external_kolmafia_.restoreMp)(30)
}), new ActionSource((0,template_string/* $item */.xr)(_templateObject33 || (_templateObject33 = FreeRun_taggedTemplateLiteral(["stinky cheese eye"]))), () => (0,lib/* getFoldGroup */._D)((0,template_string/* $item */.xr)(_templateObject34 || (_templateObject34 = FreeRun_taggedTemplateLiteral(["stinky cheese eye"])))).some(item => (0,lib/* have */.lf)(item)) && !(0,property/* get */.U2)("_stinkyCheeseBanisherUsed") ? 1 : 0, combat/* Macro.skill */.LE.skill((0,template_string/* $skill */.tm)(_templateObject35 || (_templateObject35 = FreeRun_taggedTemplateLiteral(["Give Your Opponent the Stinkeye"])))), {
  equipmentRequirements: () => new maximize/* Requirement */.nb([], {
    forceEquip: (0,template_string/* $items */.vS)(_templateObject36 || (_templateObject36 = FreeRun_taggedTemplateLiteral(["stinky cheese eye"])))
  }),
  preparation: () => {
    if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject37 || (_templateObject37 = FreeRun_taggedTemplateLiteral(["stinky cheese eye"]))))) {
      (0,external_kolmafia_.cliExecute)("fold stinky cheese eye");
    }

    return (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject38 || (_templateObject38 = FreeRun_taggedTemplateLiteral(["stinky cheese eye"]))));
  }
}), new ActionSource((0,template_string/* $item */.xr)(_templateObject39 || (_templateObject39 = FreeRun_taggedTemplateLiteral(["navel ring of navel gazing"]))), () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject40 || (_templateObject40 = FreeRun_taggedTemplateLiteral(["navel ring of navel gazing"])))) ? Math.max(0, 3 - (0,property/* get */.U2)("_navelRunaways")) : 0, combat/* Macro.step */.LE.step("runaway"), {
  equipmentRequirements: () => new maximize/* Requirement */.nb([], {
    forceEquip: (0,template_string/* $items */.vS)(_templateObject41 || (_templateObject41 = FreeRun_taggedTemplateLiteral(["navel ring of navel gazing"])))
  })
}), new ActionSource((0,template_string/* $item */.xr)(_templateObject42 || (_templateObject42 = FreeRun_taggedTemplateLiteral(["Greatest American Pants"]))), () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject43 || (_templateObject43 = FreeRun_taggedTemplateLiteral(["Greatest American Pants"])))) ? Math.max(0, 3 - (0,property/* get */.U2)("_navelRunaways")) : 0, combat/* Macro.step */.LE.step("runaway"), {
  equipmentRequirements: () => new maximize/* Requirement */.nb([], {
    forceEquip: (0,template_string/* $items */.vS)(_templateObject44 || (_templateObject44 = FreeRun_taggedTemplateLiteral(["Greatest American Pants"])))
  })
}), new ActionSource((0,template_string/* $skill */.tm)(_templateObject45 || (_templateObject45 = FreeRun_taggedTemplateLiteral(["Show your boring familiar pictures"]))), () => {
  if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject46 || (_templateObject46 = FreeRun_taggedTemplateLiteral(["familiar scrapbook"]))))) {
    if (scrapbookChargesLastUpdated !== (0,property/* get */.U2)("_lastCombatStarted")) {
      (0,external_kolmafia_.visitUrl)("desc_item.php?whichitem=463063785");
      scrapbookChargesLastUpdated = (0,property/* get */.U2)("_lastCombatStarted");
    }

    return Math.floor((0,property/* get */.U2)("scrapbookCharges") / 100);
  }

  return 0;
}, combat/* Macro.skill */.LE.skill((0,template_string/* $skill */.tm)(_templateObject47 || (_templateObject47 = FreeRun_taggedTemplateLiteral(["Show your boring familiar pictures"])))), {
  equipmentRequirements: () => new maximize/* Requirement */.nb([], {
    forceEquip: (0,template_string/* $items */.vS)(_templateObject48 || (_templateObject48 = FreeRun_taggedTemplateLiteral(["familiar scrapbook"])))
  })
}), new ActionSource((0,template_string/* $item */.xr)(_templateObject49 || (_templateObject49 = FreeRun_taggedTemplateLiteral(["peppermint parasol"]))), () => Math.max(0, 3 - (0,property/* get */.U2)("_navelRunaways")), combat/* Macro.item */.LE.item((0,template_string/* $item */.xr)(_templateObject50 || (_templateObject50 = FreeRun_taggedTemplateLiteral(["peppermint parasol"])))), {
  preparation: () => (0,external_kolmafia_.retrieveItem)((0,template_string/* $item */.xr)(_templateObject51 || (_templateObject51 = FreeRun_taggedTemplateLiteral(["peppermint parasol"])))),
  cost: () => Math.min(ActionSource.defaultPriceFunction((0,template_string/* $item */.xr)(_templateObject52 || (_templateObject52 = FreeRun_taggedTemplateLiteral(["peppermint sprout"])))) * 5, ActionSource.defaultPriceFunction((0,template_string/* $item */.xr)(_templateObject53 || (_templateObject53 = FreeRun_taggedTemplateLiteral(["peppermint parasol"]))))) / 10 // Breaks after 10 successful runaways.

}), new ActionSource((0,template_string/* $item */.xr)(_templateObject54 || (_templateObject54 = FreeRun_taggedTemplateLiteral(["human musk"]))), () => Math.max(0, 3 - (0,property/* get */.U2)("_humanMuskUses")), combat/* Macro.item */.LE.item((0,template_string/* $item */.xr)(_templateObject55 || (_templateObject55 = FreeRun_taggedTemplateLiteral(["human musk"])))), {
  preparation: () => (0,external_kolmafia_.retrieveItem)((0,template_string/* $item */.xr)(_templateObject56 || (_templateObject56 = FreeRun_taggedTemplateLiteral(["human musk"])))),
  cost: () => ActionSource.defaultPriceFunction((0,template_string/* $item */.xr)(_templateObject57 || (_templateObject57 = FreeRun_taggedTemplateLiteral(["human musk"]))))
})].concat(FreeRun_toConsumableArray((0,template_string/* $items */.vS)(_templateObject58 || (_templateObject58 = FreeRun_taggedTemplateLiteral(["Louder Than Bomb, divine champagne popper, tennis ball"]))).map(item => new ActionSource(item, () => Infinity, combat/* Macro.item */.LE.item(item), {
  preparation: () => (0,external_kolmafia_.retrieveItem)(item),
  cost: () => ActionSource.defaultPriceFunction(item)
}))));
/**
 * Find an available free run source subject to constraints.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Free run source satisfying constraints, or null.
 */

function tryFindFreeRun(constraints) {
  var source = findActionSource(freeRunSources, constraints); // Always try to use Asdon Martin: Spring-Loaded Front Bumper first,
  // but only if another source has been found.

  if (source && asdonMartinSource.available()) {
    source = asdonMartinSource.merge(source);
  }

  return source;
}
/**
 * Ensure an available free run source subject to constraints.
 * Throws an error if no source can be found.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Free run source satisfying constraints.
 */

function ensureFreeRun(constraints) {
  var source = tryFindFreeRun(constraints);

  if (!source) {
    throw new Error("Failed to ensure Free Run source");
  }

  return source;
}

/***/ }),

/***/ 1762:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LE": () => (/* binding */ Macro),
/* harmony export */   "Qk": () => (/* binding */ adventureMacro),
/* harmony export */   "Ao": () => (/* binding */ adventureMacroAuto),
/* harmony export */   "t$": () => (/* binding */ StrictMacro)
/* harmony export */ });
/* unused harmony exports getMacroId, InvalidMacroError */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3311);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2474);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(678);
var _templateObject, _templateObject2;

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name name.
 *
 * @category Combat
 * @returns {number} The macro ID.
 */

function getMacroId() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MACRO_NAME;
  var macroMatches = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"".concat(name, "\"]/@value"));

  if (macroMatches.length === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(name, "&macrotext=abort&action=save"));
    return parseInt((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)(newMacroText, "//input[@name=macroid]/@value")[0], 10);
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.get(itemOrName) : itemOrName;
}

var substringCombatItems = (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$items */ .vS)(_templateObject || (_templateObject = _taggedTemplateLiteral(["spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, adder, red button, pile of sand, mushroom, deluxe mushroom"])));
var substringCombatSkills = (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$skills */ .nx)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Cleave, Boil, Slice, Rainbow"])));

function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return !substringCombatItems.includes(item) ? item.name : (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(item).toString();
  }
}

function itemOrItemsBallsMacroPredicate(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ");
  } else {
    return "hascombatitem ".concat(itemOrItems);
  }
}

function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return kolmafia__WEBPACK_IMPORTED_MODULE_0__.Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) && !substringCombatSkills.includes(skill) ? skill.name : (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(skill);
}

var InvalidMacroError = /*#__PURE__*/function (_Error) {
  _inherits(InvalidMacroError, _Error);

  var _super = _createSuper(InvalidMacroError);

  function InvalidMacroError() {
    _classCallCheck(this, InvalidMacroError);

    return _super.apply(this, arguments);
  }

  return _createClass(InvalidMacroError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */

var Macro = /*#__PURE__*/function () {
  function Macro() {
    _classCallCheck(this, Macro);

    _defineProperty(this, "components", []);

    _defineProperty(this, "name", MACRO_NAME);
  }

  _createClass(Macro, [{
    key: "toString",
    value:
    /**
     * Convert macro to string.
     */
    function toString() {
      return this.components.join(";");
    }
    /**
     * Gives your macro a new name to be used when saving an autoattack.
     * @param name The name to be used when saving as an autoattack.
     * @returns The previous name assigned to this macro.
     */

  }, {
    key: "rename",
    value: function rename(name) {
      var returnValue = this.name;
      this.name = name;
      return returnValue;
    }
    /**
     * Save a macro to a Mafia property for use in a consult script.
     */

  }, {
    key: "save",
    value: function save() {
      (0,_property__WEBPACK_IMPORTED_MODULE_2__/* .set */ .t8)(Macro.SAVED_MACRO_PROPERTY, this.toString());
    }
    /**
     * Load a saved macro from the Mafia property.
     */

  }, {
    key: "step",
    value:
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */
    function step() {
      var _ref;

      for (var _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++) {
        nextSteps[_key] = arguments[_key];
      }

      var nextStepsStrings = (_ref = []).concat.apply(_ref, _toConsumableArray(nextSteps.map(x => x instanceof Macro ? x.components : [x])));

      this.components = [].concat(_toConsumableArray(this.components), _toConsumableArray(nextStepsStrings.filter(s => s.length > 0)));
      return this;
    }
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "submit",
    value:
    /**
     * Submit the built macro to KoL. Only works inside combat.
     */
    function submit() {
      var final = this.toString();
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("fight.php?action=macro&macrotext=".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(final)), true, true);
    }
    /**
     * Set this macro as a KoL native autoattack.
     */

  }, {
    key: "setAutoAttack",
    value: function setAutoAttack() {
      var id = Macro.cachedMacroIds.get(this.name);

      if (id === undefined) {
        id = getMacroId(this.name);
        Macro.cachedMacroIds.set(this.name, id);
      }

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getAutoAttack)() === 99000000 + id && this.toString() === Macro.cachedAutoAttacks.get(this.name)) {
        // This macro is already set. Don"t make the server request.
        return;
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&name=").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(this.name), "&macrotext=").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(this.toString()), "&action=save"), true, true);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account.php?am=1&action=autoattack&value=".concat(99000000 + id, "&ajax=1"));
      Macro.cachedAutoAttacks.set(this.name, this.toString());
    }
    /**
     * Renames the macro, then sets it as an autoattack.
     * @param name The name to save the macro under as an autoattack.
     */

  }, {
    key: "setAutoAttackAs",
    value: function setAutoAttackAs(name) {
      this.name = name;
      this.setAutoAttack();
    }
    /**
     * Clear all cached autoattacks, and delete all stored macros server-side.
     */

  }, {
    key: "abort",
    value:
    /**
     * Add an "abort" step to this macro.
     * @returns {Macro} This object itself.
     */
    function abort() {
      return this.step("abort");
    }
    /**
     * Create a new macro with an "abort" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "runaway",
    value:
    /**
     * Add a "runaway" step to this macro.
     * @returns {Macro} This object itself.
     */
    function runaway() {
      return this.step("runaway");
    }
    /**
     * Create a new macro with an "runaway" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "if_",
    value:
    /**
     * Add an "if" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
    function if_(condition, ifTrue) {
      var ballsCondition = "";

      if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Monster) {
        ballsCondition = "monsterid ".concat(condition.id);
      } else if (condition instanceof Array) {
        ballsCondition = condition.map(mon => "monsterid ".concat(mon.id)).join(" || ");
        ballsCondition = "(".concat(ballsCondition, ")");
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Effect) {
        ballsCondition = "haseffect ".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(condition));
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Skill) {
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item) {
        if (!condition.combat) {
          throw new InvalidMacroError("Item ".concat(condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));
        }

        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Location) {
        var snarfblat = condition.id;

        if (snarfblat < 1) {
          throw new InvalidMacroError("Location ".concat(condition, " cannot be made a valid BALLS predicate (it has no location id)"));
        }

        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Class) {
        if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(condition) > 6) {
          throw new InvalidMacroError("Class ".concat(condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));
        }

        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Stat) {
        ballsCondition = "".concat(condition.toString().toLowerCase(), "class");
      } else {
        ballsCondition = condition;
      }

      return this.step("if ".concat(ballsCondition)).step(ifTrue).step("endif");
    }
    /**
     * Create a new macro with an "if" statement.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "while_",
    value:
    /**
     * Add a "while" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */
    function while_(condition, contents) {
      return this.step("while ".concat(condition)).step(contents).step("endwhile");
    }
    /**
     * Create a new macro with a "while" statement.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "externalIf",
    value:
    /**
     * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */
    function externalIf(condition, ifTrue, ifFalse) {
      if (condition) return this.step(ifTrue);else if (ifFalse) return this.step(ifFalse);else return this;
    }
    /**
     * Create a new macro with a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "repeat",
    value:
    /**
     * Add a repeat step to the macro.
     * @returns {Macro} This object itself.
     */
    function repeat() {
      return this.step("repeat");
    }
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "skill",
    value: function skill() {
      for (var _len2 = arguments.length, skills = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        skills[_key2] = arguments[_key2];
      }

      return this.step.apply(this, _toConsumableArray(skills.map(skill => {
        return "skill ".concat(skillBallsMacroName(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */
    function trySkill() {
      for (var _len3 = arguments.length, skills = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        skills[_key3] = arguments[_key3];
      }

      return this.step.apply(this, _toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */
    function trySkillRepeat() {
      for (var _len4 = arguments.length, skills = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        skills[_key4] = arguments[_key4];
      }

      return this.step.apply(this, _toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill).repeat());
      })));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function item() {
      for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        items[_key5] = arguments[_key5];
      }

      return this.step.apply(this, _toConsumableArray(items.map(itemOrItems => {
        return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
      })));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function tryItem() {
      for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        items[_key6] = arguments[_key6];
      }

      return this.step.apply(this, _toConsumableArray(items.map(item => {
        return Macro.if_(itemOrItemsBallsMacroPredicate(item), "use ".concat(itemOrItemsBallsMacroName(item)));
      })));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "attack",
    value:
    /**
     * Add an attack step to the macro.
     * @returns {Macro} This object itself.
     */
    function attack() {
      return this.step("attack");
    }
    /**
     * Create a new macro with an attack step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "ifHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
     * @param macro The macro to place in the if_ statement
     */
    function ifHolidayWanderer(macro) {
      var todaysWanderers = (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getTodaysHolidayWanderers */ .UL)();
      if (todaysWanderers.length === 0) return this;
      return this.if_(todaysWanderers.map(monster => "monsterid ".concat(monster.id)).join(" || "), macro);
    }
    /**
     * Create a new macro starting with an ifHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }, {
    key: "ifNotHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
     * @param macro The macro to place in the if_ statement.
     */
    function ifNotHolidayWanderer(macro) {
      var todaysWanderers = (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getTodaysHolidayWanderers */ .UL)();
      if (todaysWanderers.length === 0) return this.step(macro);
      return this.if_(todaysWanderers.map(monster => "!monsterid ".concat(monster.id)).join(" && "), macro);
    }
    /**
     * Create a new macro starting with an ifNotHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }], [{
    key: "load",
    value: function load() {
      var _this;

      return (_this = new this()).step.apply(_this, _toConsumableArray((0,_property__WEBPACK_IMPORTED_MODULE_2__/* .get */ .U2)(Macro.SAVED_MACRO_PROPERTY).split(";")));
    }
    /**
     * Clear the saved macro in the Mafia property.
     */

  }, {
    key: "clearSaved",
    value: function clearSaved() {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.removeProperty)(Macro.SAVED_MACRO_PROPERTY);
    }
  }, {
    key: "step",
    value: function step() {
      var _this2;

      return (_this2 = new this()).step.apply(_this2, arguments);
    }
  }, {
    key: "clearAutoAttackMacros",
    value: function clearAutoAttackMacros() {
      var _iterator = _createForOfIteratorHelper(Macro.cachedAutoAttacks.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _Macro$cachedMacroIds;

          var name = _step.value;
          var id = (_Macro$cachedMacroIds = Macro.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1"));
          Macro.cachedAutoAttacks.delete(name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "abort",
    value: function abort() {
      return new this().abort();
    }
  }, {
    key: "runaway",
    value: function runaway() {
      return new this().runaway();
    }
  }, {
    key: "if_",
    value: function if_(condition, ifTrue) {
      return new this().if_(condition, ifTrue);
    }
  }, {
    key: "while_",
    value: function while_(condition, contents) {
      return new this().while_(condition, contents);
    }
  }, {
    key: "externalIf",
    value: function externalIf(condition, ifTrue, ifFalse) {
      return new this().externalIf(condition, ifTrue, ifFalse);
    }
  }, {
    key: "skill",
    value: function skill() {
      var _this3;

      return (_this3 = new this()).skill.apply(_this3, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this4;

      return (_this4 = new this()).trySkill.apply(_this4, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this5;

      return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this6;

      return (_this6 = new this()).item.apply(_this6, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this7;

      return (_this7 = new this()).tryItem.apply(_this7, arguments);
    }
  }, {
    key: "attack",
    value: function attack() {
      return new this().attack();
    }
  }, {
    key: "ifHolidayWanderer",
    value: function ifHolidayWanderer(macro) {
      return new this().ifHolidayWanderer(macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function ifNotHolidayWanderer(macro) {
      return new this().ifNotHolidayWanderer(macro);
    }
  }]);

  return Macro;
}();
/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */

_defineProperty(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");

_defineProperty(Macro, "cachedMacroIds", new Map());

_defineProperty(Macro, "cachedAutoAttacks", new Map());

function adventureMacro(loc, macro) {
  macro.save();
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setAutoAttack)(0);

  try {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)(loc, 0, "");

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inMultiFight)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.choiceFollowsFight)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */

function adventureMacroAuto(loc, autoMacro) {
  var _nextMacro;

  var nextMacro = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  nextMacro = (_nextMacro = nextMacro) !== null && _nextMacro !== void 0 ? _nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  nextMacro.save();

  try {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)(loc, 0, "");

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inMultiFight)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.choiceFollowsFight)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
var StrictMacro = /*#__PURE__*/function (_Macro) {
  _inherits(StrictMacro, _Macro);

  var _super2 = _createSuper(StrictMacro);

  function StrictMacro() {
    _classCallCheck(this, StrictMacro);

    return _super2.apply(this, arguments);
  }

  _createClass(StrictMacro, [{
    key: "skill",
    value:
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */
    function skill() {
      var _get2;

      for (var _len7 = arguments.length, skills = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        skills[_key7] = arguments[_key7];
      }

      return (_get2 = _get(_getPrototypeOf(StrictMacro.prototype), "skill", this)).call.apply(_get2, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function item() {
      var _get3;

      for (var _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        items[_key8] = arguments[_key8];
      }

      return (_get3 = _get(_getPrototypeOf(StrictMacro.prototype), "item", this)).call.apply(_get3, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkill() {
      var _get4;

      for (var _len9 = arguments.length, skills = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        skills[_key9] = arguments[_key9];
      }

      return (_get4 = _get(_getPrototypeOf(StrictMacro.prototype), "trySkill", this)).call.apply(_get4, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function tryItem() {
      var _get5;

      for (var _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        items[_key10] = arguments[_key10];
      }

      return (_get5 = _get(_getPrototypeOf(StrictMacro.prototype), "tryItem", this)).call.apply(_get5, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkillRepeat() {
      var _get6;

      for (var _len11 = arguments.length, skills = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        skills[_key11] = arguments[_key11];
      }

      return (_get6 = _get(_getPrototypeOf(StrictMacro.prototype), "trySkillRepeat", this)).call.apply(_get6, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */

  }], [{
    key: "skill",
    value: function skill() {
      var _this8;

      return (_this8 = new this()).skill.apply(_this8, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this9;

      return (_this9 = new this()).item.apply(_this9, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this10;

      return (_this10 = new this()).trySkill.apply(_this10, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this11;

      return (_this11 = new this()).tryItem.apply(_this11, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this12;

      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    }
  }]);

  return StrictMacro;
}(Macro);

/***/ }),

/***/ 5632:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U2": () => (/* binding */ get)
/* harmony export */ });
/* unused harmony exports exists, set */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Returns Infinity for counters that do not exist, and otherwise returns the duration of the counter
 * @param counter The name of the counter in question
 * @returns Infinity if the counter does not exist; otherwise returns the duration of the counter
 */

function get(counter) {
  var value = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCounter)(counter); // getCounter returns -1 for counters that don't exist, but it also returns -1 for counters whose value is -1

  if (value === -1) {
    // if we have a counter with value -1, we check to see if that counter exists via getCounters()
    // We return null if it doesn't exist
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCounters)(counter, -1, -1).trim() === "" ? Infinity : -1;
  }

  return value;
}
/**
 * The world is everything that is the case. This determines which counters are the case.
 * @param counter The name of the counter in question
 * @returns True for counters which currently exist; false for those which do not
 */

function exists(counter) {
  return getCounter(counter) !== -1 || getCounters(counter, -1, -1).trim() !== "";
}
/**
 * Creates a manual counter with specified name and duration
 * @param counter Name of the counter to manually create
 * @param duration Duration of counter to manually set
 * @returns Whether the counter was successfully set
 */

function set(counter, duration) {
  cliExecute("counters add ".concat(duration, " ").concat(counter));
  return get(counter) !== null;
}

/***/ }),

/***/ 3311:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KN": () => (/* binding */ getSongLimit),
/* harmony export */   "rU": () => (/* binding */ isSong),
/* harmony export */   "b_": () => (/* binding */ getActiveSongs),
/* harmony export */   "uG": () => (/* binding */ getSongCount),
/* harmony export */   "lf": () => (/* binding */ have),
/* harmony export */   "sy": () => (/* binding */ haveInCampground),
/* harmony export */   "_D": () => (/* binding */ getFoldGroup),
/* harmony export */   "N": () => (/* binding */ getAverageAdventures),
/* harmony export */   "cL": () => (/* binding */ questStep),
/* harmony export */   "pq": () => (/* binding */ ensureEffect),
/* harmony export */   "xI": () => (/* binding */ getSaleValue),
/* harmony export */   "q$": () => (/* binding */ findLeprechaunMultiplier),
/* harmony export */   "gK": () => (/* binding */ findFairyMultiplier),
/* harmony export */   "UL": () => (/* binding */ getTodaysHolidayWanderers),
/* harmony export */   "Ao": () => (/* binding */ canVisitUrl)
/* harmony export */ });
/* unused harmony exports getActiveEffects, canRememberSong, getMonsterLocations, getRemainingLiver, getRemainingStomach, getRemainingSpleen, Wanderer, haveCounter, haveWandererCounter, isVoteWandererNow, isWandererNow, getKramcoWandererChance, getFamiliarWandererChance, getWandererChance, isCurrentFamiliar, getZapGroup, getBanishedMonsters, canUse, noneToNull, getAverage, uneffect, getPlayerFromIdOrName, EnsureError, Environment, holidayWanderers, damageTakenByElement, telescope */
/* harmony import */ var core_js_modules_es_object_entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4875);
/* harmony import */ var core_js_modules_es_object_entries__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_entries__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_features_array_flat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2580);
/* harmony import */ var core_js_features_array_flat__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_features_array_flat__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2474);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(678);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/** @module GeneralLibrary */






/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 *
 * @category General
 */

function getSongLimit() {
  return 3 + ((0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.booleanModifier)("Four Songs") ? 1 : 0) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.numericModifier)("Additional Song");
}
/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 *
 * @category General
 * @param skillOrEffect The Skill or Effect
 */

function isSong(skillOrEffect) {
  if (skillOrEffect instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Effect && skillOrEffect.attributes.includes("song")) {
    return true;
  } else {
    var skill = skillOrEffect instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Effect ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.toSkill)(skillOrEffect) : skillOrEffect;
    return skill.class === (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$class */ ._$)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Accordion Thief"]))) && skill.buff;
  }
}
/**
 * List all active Effects
 *
 * @category General
 */

function getActiveEffects() {
  return Object.keys((0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.myEffects)()).map(e => kolmafia__WEBPACK_IMPORTED_MODULE_2__.Effect.get(e));
}
/**
 * List currently active Accordion Thief songs
 *
 * @category General
 */

function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
/**
 * List number of active Accordion Thief songs
 *
 * @category General
 */

function getSongCount() {
  return getActiveSongs().length;
}
/**
 * Returns true if the player can remember another Accordion Thief song
 *
 * @category General
 * @param quantity Number of songs to test the space for
 */

function canRememberSong() {
  var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return getSongLimit() - getSongCount() >= quantity;
}
/**
 * Return the locations in which the given monster can be encountered naturally
 *
 * @category General
 * @param monster Monster to find
 */

function getMonsterLocations(monster) {
  return Location.all().filter(location => monster.name in appearanceRates(location));
}
/**
 * Return the player's remaining liver space
 *
 * @category General
 */

function getRemainingLiver() {
  return inebrietyLimit() - myInebriety();
}
/**
 * Return the player's remaining stomach space
 *
 * @category General
 */

function getRemainingStomach() {
  return fullnessLimit() - myFullness();
}
/**
 * Return the player's remaining spleen space
 *
 * @category General
 */

function getRemainingSpleen() {
  return spleenLimit() - mySpleenUse();
}
/**
 * Return whether the player "has" any entity which one could feasibly "have".
 *
 * @category General
 * @param thing Thing to check
 * @param quantity Number to check that the player has
 */

function have(thing) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Effect) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveEffect)(thing) >= quantity;
  }

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Familiar) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveFamiliar)(thing);
  }

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Item) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.availableAmount)(thing) >= quantity;
  }

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Servant) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveServant)(thing);
  }

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Skill) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveSkill)(thing);
  }

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Thrall) {
    var thrall = (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }

  return false;
}
/**
 * Return whether an item is in the player's campground
 *
 * @category General
 * @param item The item mafia uses to represent the campground item
 */

function haveInCampground(item) {
  return Object.keys((0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.getCampground)()).map(i => kolmafia__WEBPACK_IMPORTED_MODULE_2__.Item.get(i)).includes(item);
}
var Wanderer;

(function (Wanderer) {
  Wanderer["Digitize"] = "Digitize Monster";
  Wanderer["Enamorang"] = "Enamorang Monster";
  Wanderer["Familiar"] = "Familiar";
  Wanderer["Holiday"] = "Holiday Monster";
  Wanderer["Kramco"] = "Kramco";
  Wanderer["Nemesis"] = "Nemesis Assassin";
  Wanderer["Portscan"] = "portscan.edu";
  Wanderer["Romantic"] = "Romantic Monster";
  Wanderer["Vote"] = "Vote Monster";
})(Wanderer || (Wanderer = {}));

var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
/**
 * Return whether the player has the queried counter
 *
 * @category General
 */

function haveCounter(counterName) {
  var minTurns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var maxTurns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  return getCounters(counterName, minTurns, maxTurns) === counterName;
}
/**
 * Return whether the player has the queried wandering counter
 *
 * @category Wanderers
 */

function haveWandererCounter(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer);
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}
/**
 * Returns whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 *
 * @category Wanderers
 */

function isVoteWandererNow() {
  return totalTurnsPlayed() % 11 == 1;
}
/**
 * Tells us whether we can expect a given wanderer now. Behaves differently
 * for different types of wanderer.
 *
 * - For deterministic wanderers, return whether the player will encounter
 *   the queried wanderer on the next turn
 *
 * - For variable wanderers (window), return whether the player is within
 *   an encounter window for the queried wanderer
 *
 * - For variable wanderers (chance per turn), returns true unless the player
 *   has exhausted the number of wanderers possible
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function isWandererNow(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }

  if (wanderer == Wanderer.Kramco) {
    return true;
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow();
  }

  if (wanderer === Wanderer.Familiar) {
    return get("_hipsterAdv") < 7;
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 *
 * @category Wanderers
 */

function getKramcoWandererChance() {
  var fights = get("_sausageFights");
  var lastFight = get("_lastSausageMonsterTurn");
  var totalTurns = totalTurnsPlayed();

  if (fights < 1) {
    return lastFight === totalTurns && myTurncount() < 1 ? 0.5 : 1.0;
  }

  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1.0, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.pow(Math.max(0, fights - 5), 3)));
}
/**
 * Returns the float chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 *
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently,ƒ the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 *
 * @category Wanderers
 */

function getFamiliarWandererChance() {
  var totalFights = get("_hipsterAdv");
  var probability = [0.5, 0.4, 0.3, 0.2];

  if (totalFights < 4) {
    return probability[totalFights];
  }

  return totalFights > 7 ? 0.0 : 0.1;
}
/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function getWandererChance(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0) ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Kramco) {
    getKramcoWandererChance();
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow() ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Familiar) {
    getFamiliarWandererChance();
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";

  if (haveCounter(begin, 1, 100)) {
    return 0.0;
  }

  var counters = get("relayCounters");
  var re = new RegExp("(\\d+):" + end);
  var matches = counters.match(re);

  if (matches && matches.length === 2) {
    var window = Number.parseInt(matches[1]) - myTurncount();
    return 1.0 / window;
  }

  return 0.0;
}
/**
 * Returns true if the player's current familiar is equal to the one supplied
 *
 * @category General
 * @param familiar Familiar to check
 */

function isCurrentFamiliar(familiar) {
  return myFamiliar() === familiar;
}
/**
 * Returns the fold group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required fold group
 */

function getFoldGroup(item) {
  return Object.entries((0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.getRelated)(item, "fold")).sort((_ref, _ref2) => {
    var _ref3 = _slicedToArray(_ref, 2),
        a = _ref3[1];

    var _ref4 = _slicedToArray(_ref2, 2),
        b = _ref4[1];

    return a - b;
  }).map(_ref5 => {
    var _ref6 = _slicedToArray(_ref5, 1),
        i = _ref6[0];

    return kolmafia__WEBPACK_IMPORTED_MODULE_2__.Item.get(i);
  });
}
/**
 * Returns the zap group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required zap group
 */

function getZapGroup(item) {
  return Object.keys(getRelated(item, "zap")).map(i => Item.get(i));
}
/**
 * Get a map of banished monsters keyed by what banished them
 *
 * @category General
 */

function getBanishedMonsters() {
  var banishes = chunk(get("banishedMonsters").split(":"), 3);
  var result = new Map();

  var _iterator = _createForOfIteratorHelper(banishes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          foe = _step$value[0],
          banisher = _step$value[1];

      if (foe === undefined || banisher === undefined) break; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

      var banisherItem = toItem(banisher);

      if (banisher.toLowerCase() === "saber force") {
        result.set($skill(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Use the Force"]))), Monster.get(foe));
      } else if ([Item.get("none"), Item.get("training scroll:  Snokebomb"), Item.get("tomayohawk-style reflex hammer"), null].includes(banisherItem)) {
        if (Skill.get(banisher) === $skill(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["none"])))) {
          break;
        } else {
          result.set(Skill.get(banisher), Monster.get(foe));
        }
      } else {
        result.set(banisherItem, Monster.get(foe));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}
/**
 * Returns true if the item is usable
 *
 * This function will be an ongoing work in progress
 *
 * @param item Item to check
 */

function canUse(item) {
  var path = myPath();

  if (path !== "Nuclear Autumn") {
    if ($items(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record"]))).includes(item)) {
      return false;
    }
  }

  if (path === "G-Lover") {
    if (!item.name.toLowerCase().includes("g")) return false;
  }

  if (path === "Bees Hate You") {
    if (item.name.toLowerCase().includes("b")) return false;
  }

  return true;
}
/**
 * Turn KoLmafia `none`s to JavaScript `null`s
 *
 * @param thing Thing that can have a mafia "none" value
 */

function noneToNull(thing) {
  if (thing instanceof Effect) {
    return thing === Effect.get("none") ? null : thing;
  }

  if (thing instanceof Familiar) {
    return thing === Familiar.get("none") ? null : thing;
  }

  if (thing instanceof Item) {
    return thing === Item.get("none") ? null : thing;
  }

  return thing;
}
/**
 * Return the average value from the sort of range that KoLmafia encodes as a string
 *
 * @param range KoLmafia-style range string
 */

function getAverage(range) {
  var _range$match;

  if (range.indexOf("-") < 0) return Number(range);

  var _ref7 = (_range$match = range.match(/(-?[0-9]+)-(-?[0-9]+)/)) !== null && _range$match !== void 0 ? _range$match : ["0", "0", "0"],
      _ref8 = _slicedToArray(_ref7, 3),
      lower = _ref8[1],
      upper = _ref8[2];

  return (Number(lower) + Number(upper)) / 2;
}
/**
 * Return average adventures expected from consuming an item
 *
 * If item is not a consumable, will just return "0".
 *
 * @param item Consumable item
 */

function getAverageAdventures(item) {
  return getAverage(item.adventures);
}
/**
 * Remove an effect
 *
 * @category General
 * @param effect Effect to remove
 */

function uneffect(effect) {
  return cliExecute("uneffect ".concat(effect.name));
}
/**
 * Get both the name and id of a player from either their name or id
 *
 * @param idOrName Id or name of player
 * @returns Object containing id and name of player
 */

function getPlayerFromIdOrName(idOrName) {
  var id = typeof idOrName === "number" ? idOrName : parseInt(getPlayerId(idOrName));
  return {
    name: getPlayerName(id),
    id: id
  };
}
/**
 * Return the step as a number for a given quest property.
 *
 * @param questName Name of quest property to check.
 */

function questStep(questName) {
  var stringStep = (0,_property__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)(questName);
  if (stringStep === "unstarted") return -1;else if (stringStep === "started") return 0;else if (stringStep === "finished" || stringStep === "") return 999;else {
    if (stringStep.substring(0, 4) !== "step") {
      throw new Error("Quest state parsing error.");
    }

    return parseInt(stringStep.substring(4), 10);
  }
}
var EnsureError = /*#__PURE__*/function (_Error) {
  _inherits(EnsureError, _Error);

  var _super = _createSuper(EnsureError);

  function EnsureError(cause, reason) {
    var _this;

    _classCallCheck(this, EnsureError);

    _this = _super.call(this, "Failed to ensure ".concat(cause.name, "!").concat(reason ? " ".concat(reason) : ""));
    _this.name = "Ensure Error";
    return _this;
  }

  return _createClass(EnsureError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Tries to get an effect using the default method
 * @param ef effect to try to get
 * @param turns turns to aim for; default of 1
 *
 * @throws {EnsureError} Throws an error if the effect cannot be guaranteed
 */

function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveEffect)(ef) < turns) {
    if (ef.default === null) {
      throw new EnsureError(ef, "No default action");
    }

    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.cliExecute)(ef.default) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveEffect)(ef) === 0) {
      throw new EnsureError(ef);
    }
  }
}
var valueMap = new Map();
var MALL_VALUE_MODIFIER = 0.9;
/**
 * Returns the average value--based on mallprice and autosell--of a collection of items
 * @param items items whose value you care about
 */

function getSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return items.map(item => {
    if (valueMap.has(item)) return valueMap.get(item) || 0;

    if (item.discardable) {
      valueMap.set(item, (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.mallPrice)(item) > Math.max(2 * (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.autosellPrice)(item), 100) ? MALL_VALUE_MODIFIER * (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.mallPrice)(item) : (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.autosellPrice)(item));
    } else {
      valueMap.set(item, (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.mallPrice)(item) > 100 ? MALL_VALUE_MODIFIER * (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.mallPrice)(item) : 0);
    }

    return valueMap.get(item) || 0;
  }).reduce((s, price) => s + price, 0) / items.length;
}
var Environment = {
  Outdoor: "outdoor",
  Indoor: "indoor",
  Underground: "underground",
  Underwater: "underwater"
};
/**
 * Returns the weight-coefficient of any leprechaunning that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Cactus Bud, returns the efficacy-multiplier instead
 * @param familiar The familiar whose leprechaun multiplier you're interested in
 */

function findLeprechaunMultiplier(familiar) {
  if (familiar === (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Mutant Cactus Bud"])))) return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.numericModifier)(familiar, "Leprechaun Effectiveness", 1, (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["none"]))));
  var meatBonus = (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.numericModifier)(familiar, "Meat Drop", 1, (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["none"]))));
  if (meatBonus === 0) return 0;
  return Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
/**
 * Returns the weight-coefficient of any baby gravy fairying that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Fire Ant, returns the efficacy-multiplier instead
 * @param familiar The familiar whose fairy multiplier you're interested in
 */

function findFairyMultiplier(familiar) {
  if (familiar === (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Mutant Fire Ant"])))) return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.numericModifier)(familiar, "Fairy Effectiveness", 1, (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["none"]))));
  var itemBonus = (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.numericModifier)(familiar, "Item Drop", 1, (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["none"]))));
  if (itemBonus === 0) return 0;
  return Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = new Map([["El Dia De Los Muertos Borrachos", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$monsters */ .fr)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$monsters */ .fr)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$monsters */ .fr)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.holiday)().split("/").map(holiday => {
    var _holidayWanderers$get;

    return (_holidayWanderers$get = holidayWanderers.get(holiday)) !== null && _holidayWanderers$get !== void 0 ? _holidayWanderers$get : [];
  }).flat();
}
/**
 * Determines & returns whether or not we can safely call visitUrl(), based on whether we're in a fight, multi-fight, choice, etc
 */

function canVisitUrl() {
  return !((0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.currentRound)() || (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.inMultiFight)() || (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.choiceFollowsFight)() || (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.handlingChoice)());
}
/**
 * Calculate damage taken from a specific element after factoring in resistance
 * @param baseDamage
 * @param element
 * @returns damage after factoring in resistances
 */

function damageTakenByElement(baseDamage, element) {
  if (baseDamage < 0) return 1;
  var res = elementalResistance(element);
  return Math.max(1, Math.ceil(baseDamage - baseDamage * res / 100));
}
var telescopeStats = new Map([["standing around flexing their muscles and using grip exercisers", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$stat */ .Ri)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Muscle"])))], ["sitting around playing chess and solving complicated-looking logic puzzles", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$stat */ .Ri)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Mysticality"])))], ["all wearing sunglasses and dancing", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$stat */ .Ri)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Moxie"])))]]);
var telescopeElements = new Map([["people, all of whom appear to be on fire", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["hot"])))], ["people, surrounded by a cloud of eldritch mist", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["spooky"])))], ["greasy-looking people furtively skulking around", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["sleaze"])))], ["people, surrounded by garbage and clouds of flies", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["stench"])))], ["people, clustered around a group of igloos", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap1 = new Map([["smoldering bushes on the outskirts of a hedge maze", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["hot"])))], ["creepy-looking black bushes on the outskirts of a hedge maze", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["spooky"])))], ["purplish, greasy-looking hedges", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["sleaze"])))], ["nasty-looking, dripping green bushes on the outskirts of a hedge maze", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["stench"])))], ["frost-rimed bushes on the outskirts of a hedge maze", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap2 = new Map([["smoke rising from deeper within the maze", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["hot"])))], ["a miasma of eldritch vapors rising from deeper within the maze", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["spooky"])))], ["a greasy purple cloud hanging over the center of the maze", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["sleaze"])))], ["a cloud of green gas hovering over the maze", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["stench"])))], ["wintry mists rising from deeper within the maze", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap3 = new Map([["with lava slowly oozing out of it", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["hot"])))], ["surrounded by creepy black mist", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["spooky"])))], ["that occasionally vomits out a greasy ball of hair", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["sleaze"])))], ["disgorging a really surprising amount of sewage", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["stench"])))], ["occasionally disgorging a bunch of ice cubes", (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$element */ .SS)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["cold"])))]]);
/**
 * @returns An object with all information the telescope gives you about the sorceress's contests and maze
 */

function telescope() {
  return {
    statContest: telescopeStats.get(get("telescope1")),
    elementContest: telescopeElements.get(get("telescope2")),
    hedge1: hedgeTrap1.get(get("telescope3")),
    hedge2: hedgeTrap2.get(get("telescope4")),
    hedge3: hedgeTrap3.get(get("telescope5"))
  };
}

/***/ }),

/***/ 8685:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var defaultHandlers = {
  info: message => (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)("<b>[Libram]</b> ".concat(message)),
  warning: message => (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)("<span style=\"background: orange; color: white;\"><b>[Libram]</b> ".concat(message, "</span>")),
  error: _error => (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)("<span style=\"background: red; color: white;\"><b>[Libram]</b> ".concat(_error.toString(), "</span>"))
};

var Logger = /*#__PURE__*/function () {
  function Logger() {
    _classCallCheck(this, Logger);

    _defineProperty(this, "handlers", defaultHandlers);
  }

  _createClass(Logger, [{
    key: "setHandler",
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function setHandler(level, callback) {
      this.handlers[level] = callback;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "log",
    value: function log(level, message) {
      this.handlers[level](message);
    }
  }, {
    key: "info",
    value: function info(message) {
      this.log("info", message);
    }
  }, {
    key: "warning",
    value: function warning(message) {
      this.log("warning", message);
    }
  }, {
    key: "error",
    value: function error(message) {
      this.log("error", message);
    }
  }]);

  return Logger;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Logger());

/***/ }),

/***/ 9376:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nb": () => (/* binding */ Requirement)
/* harmony export */ });
/* unused harmony exports setDefaultMaximizeOptions, maximizeCached */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8685);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(678);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8588);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





/**
 * Merges a Partial<MaximizeOptions> onto a MaximizeOptions. We merge via overriding for all boolean properties and for onlySlot, and concat all other array properties.
 * @param defaultOptions MaximizeOptions to use as a "base."
 * @param addendums Options to attempt to merge onto defaultOptions.
 */

function mergeMaximizeOptions(defaultOptions, addendums) {
  var _addendums$updateOnFa, _addendums$updateOnCa, _addendums$useOutfitC, _addendums$forceEquip, _addendums$preventEqu, _addendums$bonusEquip, _addendums$onlySlot, _addendums$preventSlo, _addendums$forceUpdat;

  return {
    updateOnFamiliarChange: (_addendums$updateOnFa = addendums.updateOnFamiliarChange) !== null && _addendums$updateOnFa !== void 0 ? _addendums$updateOnFa : defaultOptions.updateOnFamiliarChange,
    updateOnCanEquipChanged: (_addendums$updateOnCa = addendums.updateOnCanEquipChanged) !== null && _addendums$updateOnCa !== void 0 ? _addendums$updateOnCa : defaultOptions.updateOnCanEquipChanged,
    useOutfitCaching: (_addendums$useOutfitC = addendums.useOutfitCaching) !== null && _addendums$useOutfitC !== void 0 ? _addendums$useOutfitC : defaultOptions.useOutfitCaching,
    forceEquip: [].concat(_toConsumableArray(defaultOptions.forceEquip), _toConsumableArray((_addendums$forceEquip = addendums.forceEquip) !== null && _addendums$forceEquip !== void 0 ? _addendums$forceEquip : [])),
    preventEquip: [].concat(_toConsumableArray(defaultOptions.preventEquip), _toConsumableArray((_addendums$preventEqu = addendums.preventEquip) !== null && _addendums$preventEqu !== void 0 ? _addendums$preventEqu : [])).filter(item => {
      var _addendums$forceEquip2;

      return !defaultOptions.forceEquip.includes(item) && !((_addendums$forceEquip2 = addendums.forceEquip) !== null && _addendums$forceEquip2 !== void 0 && _addendums$forceEquip2.includes(item));
    }),
    bonusEquip: new Map([].concat(_toConsumableArray(defaultOptions.bonusEquip), _toConsumableArray((_addendums$bonusEquip = addendums.bonusEquip) !== null && _addendums$bonusEquip !== void 0 ? _addendums$bonusEquip : []))),
    onlySlot: (_addendums$onlySlot = addendums.onlySlot) !== null && _addendums$onlySlot !== void 0 ? _addendums$onlySlot : defaultOptions.onlySlot,
    preventSlot: [].concat(_toConsumableArray(defaultOptions.preventSlot), _toConsumableArray((_addendums$preventSlo = addendums.preventSlot) !== null && _addendums$preventSlo !== void 0 ? _addendums$preventSlo : [])),
    forceUpdate: (_addendums$forceUpdat = addendums.forceUpdate) !== null && _addendums$forceUpdat !== void 0 ? _addendums$forceUpdat : defaultOptions.forceUpdate
  };
}

var defaultMaximizeOptions = {
  updateOnFamiliarChange: true,
  updateOnCanEquipChanged: true,
  useOutfitCaching: true,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: new Map(),
  onlySlot: [],
  preventSlot: [],
  forceUpdate: false
};
/**
 *
 * @param options Default options for each maximizer run.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 */

function setDefaultMaximizeOptions(options) {
  Object.assign(defaultMaximizeOptions, options);
} // Subset of slots that are valid for caching.

var cachedSlots = (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slots */ .ei)(_templateObject || (_templateObject = _taggedTemplateLiteral(["hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar"])));

var CacheEntry = /*#__PURE__*/_createClass(function CacheEntry(equipment, rider, familiar, canEquipItemCount) {
  _classCallCheck(this, CacheEntry);

  _defineProperty(this, "equipment", void 0);

  _defineProperty(this, "rider", void 0);

  _defineProperty(this, "familiar", void 0);

  _defineProperty(this, "canEquipItemCount", void 0);

  this.equipment = equipment;
  this.rider = rider;
  this.familiar = familiar;
  this.canEquipItemCount = canEquipItemCount;
});

var _outfitSlots = /*#__PURE__*/new WeakMap();

var _useHistory = /*#__PURE__*/new WeakMap();

var _maxSize = /*#__PURE__*/new WeakMap();

var OutfitLRUCache = /*#__PURE__*/function () {
  // Current outfits allocated
  // Array of indices into #outfitSlots in order of use. Most recent at the front.
  function OutfitLRUCache(maxSize) {
    _classCallCheck(this, OutfitLRUCache);

    _classPrivateFieldInitSpec(this, _outfitSlots, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _useHistory, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _maxSize, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maxSize, maxSize);
  }

  _createClass(OutfitLRUCache, [{
    key: "checkConsistent",
    value: function checkConsistent() {
      if (_classPrivateFieldGet(this, _useHistory).length !== _classPrivateFieldGet(this, _outfitSlots).length || !_toConsumableArray(_classPrivateFieldGet(this, _useHistory)).sort().every((value, index) => value === index)) {
        throw new Error("Outfit cache consistency failed.");
      }
    }
  }, {
    key: "promote",
    value: function promote(index) {
      _classPrivateFieldSet(this, _useHistory, [index].concat(_toConsumableArray(_classPrivateFieldGet(this, _useHistory).filter(i => i !== index))));

      this.checkConsistent();
    }
  }, {
    key: "get",
    value: function get(key) {
      var index = _classPrivateFieldGet(this, _outfitSlots).indexOf(key);

      if (index < 0) return undefined;
      this.promote(index);
      return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
    }
  }, {
    key: "insert",
    value: function insert(key) {
      var lastUseIndex = undefined;

      if (_classPrivateFieldGet(this, _outfitSlots).length >= _classPrivateFieldGet(this, _maxSize)) {
        lastUseIndex = _classPrivateFieldGet(this, _useHistory).pop();

        if (lastUseIndex === undefined) {
          throw new Error("Outfit cache consistency failed.");
        }

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, lastUseIndex);

        _classPrivateFieldGet(this, _outfitSlots)[lastUseIndex] = key;
        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(lastUseIndex);
      } else {
        var index = _classPrivateFieldGet(this, _outfitSlots).push(key) - 1;

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, index);

        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
      }
    }
  }]);

  return OutfitLRUCache;
}();
/**
 * Save current equipment as KoL-native outfit.
 * @param name Name of new outfit.
 */


_defineProperty(OutfitLRUCache, "OUTFIT_PREFIX", "Script Outfit");

function saveOutfit(name) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("outfit save ".concat(name));
} // Objective cache entries.


var cachedObjectives = {}; // Outfit cache entries. Keep 6 by default to avoid cluttering list.

var outfitCache = new OutfitLRUCache(6); // Cache to prevent rescanning all items unnecessarily

var cachedStats = [0, 0, 0];
var cachedCanEquipItemCount = 0;
/**
 * Count the number of unique items that can be equipped.
 * @returns The count of unique items.
 */

function canEquipItemCount() {
  var stats = (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$stats */ .gw)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Muscle, Mysticality, Moxie"]))).map(stat => Math.min((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myBasestat)(stat), 300));

  if (stats.every((value, index) => value === cachedStats[index])) {
    return cachedCanEquipItemCount;
  }

  cachedStats = stats;
  cachedCanEquipItemCount = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.all().filter(item => (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.canEquip)(item)).length;
  return cachedCanEquipItemCount;
}
/**
 * Checks the objective cache for a valid entry.
 * @param cacheKey The cache key to check.
 * @param updateOnFamiliarChange Ignore cache if familiar has changed.
 * @param updateOnCanEquipChanged Ignore cache if stats have changed what can be equipped.
 * @returns A valid CacheEntry or null.
 */


function checkCache(cacheKey, options) {
  var entry = cachedObjectives[cacheKey];

  if (!entry) {
    return null;
  }

  if (options.updateOnFamiliarChange && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() !== entry.familiar) {
    _logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"].warning */ .Z.warning("Equipment found in maximize cache but familiar is different.");
    return null;
  }

  if (options.updateOnCanEquipChanged && entry.canEquipItemCount !== canEquipItemCount()) {
    _logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"].warning */ .Z.warning("Equipment found in maximize cache but equippable item list is out of date.");
    return null;
  }

  return entry;
}
/**
 * Applies equipment that was found in the cache.
 * @param entry The CacheEntry to apply
 */


function applyCached(entry, options) {
  var outfitName = options.useOutfitCaching ? outfitCache.get(entry) : undefined;

  if (outfitName) {
    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.isWearingOutfit)(outfitName)) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.outfit)(outfitName);
    }

    var familiarEquip = entry.equipment.get((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slot */ .Jh)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["familiar"]))));
    if (familiarEquip) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slot */ .Jh)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["familiar"]))), familiarEquip);
  } else {
    var _iterator = _createForOfIteratorHelper(entry.equipment),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            slot = _step$value[0],
            item = _step$value[1];

        if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedItem)(slot) !== item && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(item) > 0) {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)(slot, item);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (verifyCached(entry) && options.useOutfitCaching) {
      var _outfitName = outfitCache.insert(entry);

      _logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"].info */ .Z.info("Saving equipment to outfit ".concat(_outfitName, "."));
      saveOutfit(_outfitName);
    }
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Crown of Thrones"]))))) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.enthroneFamiliar)(entry.rider.get((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Crown of Thrones"])))) || (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$familiar */ .HP)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["none"]))));
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.bjornifyFamiliar)(entry.rider.get((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Buddy Bjorn"])))) || (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$familiar */ .HP)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["none"]))));
  }
}

var slotStructure = [(0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slots */ .ei)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["hat"]))), (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slots */ .ei)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["back"]))), (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slots */ .ei)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["shirt"]))), (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slots */ .ei)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["weapon, off-hand"]))), (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slots */ .ei)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["pants"]))), (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slots */ .ei)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["acc1, acc2, acc3"]))), (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slots */ .ei)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["familiar"])))];
/**
 * Verifies that a CacheEntry was applied successfully.
 * @param entry The CacheEntry to verify
 * @returns If all desired equipment was appliedn in the correct slots.
 */

function verifyCached(entry) {
  var success = true;

  var _iterator2 = _createForOfIteratorHelper(slotStructure),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var slotGroup = _step2.value;
      var desiredSlots = slotGroup.map(slot => {
        var _entry$equipment$get;

        return [slot, (_entry$equipment$get = entry.equipment.get(slot)) !== null && _entry$equipment$get !== void 0 ? _entry$equipment$get : null];
      }).filter(_ref => {
        var _ref2 = _slicedToArray(_ref, 2),
            item = _ref2[1];

        return item !== null;
      });
      var desiredSet = desiredSlots.map(_ref3 => {
        var _ref4 = _slicedToArray(_ref3, 2),
            item = _ref4[1];

        return item;
      });
      var equippedSet = desiredSlots.map(_ref5 => {
        var _ref6 = _slicedToArray(_ref5, 1),
            slot = _ref6[0];

        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedItem)(slot);
      });

      if (!(0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .setEqual */ .$x)(desiredSet, equippedSet)) {
        _logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"].warning */ .Z.warning("Failed to apply cached ".concat(desiredSet.join(", "), " in ").concat(slotGroup.join(", "), "."));
        success = false;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["Crown of Thrones"]))))) {
    if (entry.rider.get((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["Crown of Thrones"])))) !== (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myEnthronedFamiliar)()) {
      _logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"].warning */ .Z.warning("Failed to apply ".concat(entry.rider.get((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Crown of Thrones"])))), " in ").concat((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["Crown of Thrones"]))), "."));
      success = false;
    }
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    if (entry.rider.get((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["Buddy Bjorn"])))) !== (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myBjornedFamiliar)()) {
      _logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"].warning */ .Z.warning("Failed to apply".concat(entry.rider.get((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["Buddy Bjorn"])))), " in ").concat((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["Buddy Bjorn"]))), "."));
      success = false;
    }
  }

  return success;
}
/**
 * Save current equipment to the objective cache.
 * @param cacheKey The cache key to save.
 */


function saveCached(cacheKey, options) {
  var equipment = new Map();
  var rider = new Map();

  var _iterator3 = _createForOfIteratorHelper(cachedSlots),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _slot2 = _step3.value;
      equipment.set(_slot2, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedItem)(_slot2));
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["card sleeve"])))) > 0) {
    equipment.set((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slot */ .Jh)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["card-sleeve"]))), (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedItem)((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slot */ .Jh)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["card-sleeve"])))));
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["Crown of Thrones"])))) > 0) {
    rider.set((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["Crown of Thrones"]))), (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myEnthronedFamiliar)());
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["Buddy Bjorn"])))) > 0) {
    rider.set((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["Buddy Bjorn"]))), (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myBjornedFamiliar)());
  }

  if (options.preventSlot && options.preventSlot.length > 0) {
    var _iterator4 = _createForOfIteratorHelper(options.preventSlot),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var slot = _step4.value;
        equipment.delete(slot);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    if (options.preventSlot.includes((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slot */ .Jh)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (options.preventSlot.includes((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slot */ .Jh)(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  if (options.onlySlot && options.onlySlot.length > 0) {
    var _iterator5 = _createForOfIteratorHelper(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Slot.all()),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _slot = _step5.value;

        if (!options.onlySlot.includes(_slot)) {
          equipment.delete(_slot);
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    if (!options.onlySlot.includes((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slot */ .Jh)(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (!options.onlySlot.includes((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$slot */ .Jh)(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete((0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  var entry = new CacheEntry(equipment, rider, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)(), canEquipItemCount());
  cachedObjectives[cacheKey] = entry;

  if (options.useOutfitCaching) {
    var outfitName = outfitCache.insert(entry);
    _logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"].info */ .Z.info("Saving equipment to outfit ".concat(outfitName, "."));
    saveOutfit(outfitName);
  }
}
/**
 * Run the maximizer, but only if the objective and certain pieces of game state haven't changed since it was last run.
 * @param objectives Objectives to maximize for.
 * @param options Options for this run of the maximizer.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 * @returns Whether the maximize call succeeded.
 */


function maximizeCached(objectives) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options);
  var forceEquip = fullOptions.forceEquip,
      preventEquip = fullOptions.preventEquip,
      bonusEquip = fullOptions.bonusEquip,
      onlySlot = fullOptions.onlySlot,
      preventSlot = fullOptions.preventSlot,
      forceUpdate = fullOptions.forceUpdate; // Sort each group in objective to ensure consistent ordering in string

  var objective = [].concat(_toConsumableArray(objectives.sort()), _toConsumableArray(forceEquip.map(item => "equip ".concat(item)).sort()), _toConsumableArray(preventEquip.map(item => "-equip ".concat(item)).sort()), _toConsumableArray(onlySlot.map(slot => "".concat(slot)).sort()), _toConsumableArray(preventSlot.map(slot => "-".concat(slot)).sort()), _toConsumableArray(Array.from(bonusEquip.entries()).filter(_ref7 => {
    var _ref8 = _slicedToArray(_ref7, 2),
        bonus = _ref8[1];

    return bonus !== 0;
  }).map(_ref9 => {
    var _ref10 = _slicedToArray(_ref9, 2),
        item = _ref10[0],
        bonus = _ref10[1];

    return "".concat(Math.round(bonus * 100) / 100, " bonus ").concat(item);
  }).sort())).join(", ");
  var cacheEntry = checkCache(objective, fullOptions);

  if (cacheEntry && !forceUpdate) {
    _logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"].info */ .Z.info("Equipment found in maximize cache, equipping...");
    applyCached(cacheEntry, fullOptions);

    if (verifyCached(cacheEntry)) {
      _logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"].info */ .Z.info("Equipped cached ".concat(objective));
      return true;
    }

    _logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"].warning */ .Z.warning("Maximize cache application failed, maximizing...");
  }

  var result = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.maximize)(objective, false);
  saveCached(objective, fullOptions);
  return result;
}

var _maximizeParameters = /*#__PURE__*/new WeakMap();

var _maximizeOptions = /*#__PURE__*/new WeakMap();

var Requirement = /*#__PURE__*/function () {
  /**
   * A convenient way of combining maximization parameters and options
   * @param maximizeParameters Parameters you're attempting to maximize
   * @param maximizeOptions Object potentially containing forceEquips, bonusEquips, preventEquips, and preventSlots
   */
  function Requirement(maximizeParameters, maximizeOptions) {
    _classCallCheck(this, Requirement);

    _classPrivateFieldInitSpec(this, _maximizeParameters, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _maximizeOptions, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maximizeParameters, maximizeParameters);

    _classPrivateFieldSet(this, _maximizeOptions, maximizeOptions);
  }

  _createClass(Requirement, [{
    key: "maximizeParameters",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeParameters);
    }
  }, {
    key: "maximizeOptions",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeOptions);
    }
    /**
     * Merges two requirements, concanating relevant arrays. Typically used in static form.
     * @param other Requirement to merge with.
     */

  }, {
    key: "merge",
    value: function merge(other) {
      var _optionsA$forceEquip, _other$maximizeOption, _optionsA$preventEqui, _other$maximizeOption2, _optionsA$bonusEquip$, _optionsA$bonusEquip, _optionsB$bonusEquip$, _optionsB$bonusEquip, _optionsA$onlySlot, _optionsB$onlySlot, _optionsA$preventSlot, _optionsB$preventSlot;

      var optionsA = this.maximizeOptions;
      var optionsB = other.maximizeOptions;
      return new Requirement([].concat(_toConsumableArray(this.maximizeParameters), _toConsumableArray(other.maximizeParameters)), {
        updateOnFamiliarChange: optionsA.updateOnFamiliarChange || other.maximizeOptions.updateOnFamiliarChange,
        updateOnCanEquipChanged: optionsA.updateOnCanEquipChanged || other.maximizeOptions.updateOnCanEquipChanged,
        forceEquip: [].concat(_toConsumableArray((_optionsA$forceEquip = optionsA.forceEquip) !== null && _optionsA$forceEquip !== void 0 ? _optionsA$forceEquip : []), _toConsumableArray((_other$maximizeOption = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption !== void 0 ? _other$maximizeOption : [])),
        preventEquip: [].concat(_toConsumableArray((_optionsA$preventEqui = optionsA.preventEquip) !== null && _optionsA$preventEqui !== void 0 ? _optionsA$preventEqui : []), _toConsumableArray((_other$maximizeOption2 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption2 !== void 0 ? _other$maximizeOption2 : [])),
        bonusEquip: new Map([].concat(_toConsumableArray((_optionsA$bonusEquip$ = (_optionsA$bonusEquip = optionsA.bonusEquip) === null || _optionsA$bonusEquip === void 0 ? void 0 : _optionsA$bonusEquip.entries()) !== null && _optionsA$bonusEquip$ !== void 0 ? _optionsA$bonusEquip$ : []), _toConsumableArray((_optionsB$bonusEquip$ = (_optionsB$bonusEquip = optionsB.bonusEquip) === null || _optionsB$bonusEquip === void 0 ? void 0 : _optionsB$bonusEquip.entries()) !== null && _optionsB$bonusEquip$ !== void 0 ? _optionsB$bonusEquip$ : []))),
        onlySlot: [].concat(_toConsumableArray((_optionsA$onlySlot = optionsA.onlySlot) !== null && _optionsA$onlySlot !== void 0 ? _optionsA$onlySlot : []), _toConsumableArray((_optionsB$onlySlot = optionsB.onlySlot) !== null && _optionsB$onlySlot !== void 0 ? _optionsB$onlySlot : [])),
        preventSlot: [].concat(_toConsumableArray((_optionsA$preventSlot = optionsA.preventSlot) !== null && _optionsA$preventSlot !== void 0 ? _optionsA$preventSlot : []), _toConsumableArray((_optionsB$preventSlot = optionsB.preventSlot) !== null && _optionsB$preventSlot !== void 0 ? _optionsB$preventSlot : [])),
        forceUpdate: optionsA.forceUpdate || optionsB.forceUpdate
      });
    }
    /**
     * Merges a set of requirements together, starting with an empty requirement.
     * @param allRequirements Requirements to merge
     */

  }, {
    key: "maximize",
    value:
    /**
     * Runs maximizeCached, using the maximizeParameters and maximizeOptions contained by this requirement.
     * @returns Whether the maximize call succeeded.
     */
    function maximize() {
      return maximizeCached(this.maximizeParameters, this.maximizeOptions);
    }
    /**
     * Merges requirements, and then runs maximizeCached on the combined requirement.
     * @param requirements Requirements to maximize on
     */

  }], [{
    key: "merge",
    value: function merge(allRequirements) {
      return allRequirements.reduce((x, y) => x.merge(y), new Requirement([], {}));
    }
  }, {
    key: "maximize",
    value: function maximize() {
      for (var _len = arguments.length, requirements = new Array(_len), _key = 0; _key < _len; _key++) {
        requirements[_key] = arguments[_key];
      }

      Requirement.merge(requirements).maximize();
    }
  }]);

  return Requirement;
}();

/***/ }),

/***/ 1245:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "U": () => (/* binding */ get)
});

// UNUSED EXPORTS: mergeModifiers

// EXTERNAL MODULE: ./node_modules/libram/node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__(2231);
// EXTERNAL MODULE: external "kolmafia"
var external_kolmafia_ = __webpack_require__(7530);
;// CONCATENATED MODULE: ./node_modules/libram/dist/modifierTypes.js
// THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseModifiers.ts for more information
var modifierTypes_booleanModifiers = ["Softcore Only", "Single Equip", "Never Fumble", "Weakens Monster", "Free Pull", "Variable", "Nonstackable Watch", "Cold Immunity", "Hot Immunity", "Sleaze Immunity", "Spooky Immunity", "Stench Immunity", "Cold Vulnerability", "Hot Vulnerability", "Sleaze Vulnerability", "Spooky Vulnerability", "Stench Vulnerability", "Moxie Controls MP", "Moxie May Control MP", "Four Songs", "Adventure Underwater", "Underwater Familiar", "Generic", "Unarmed", "No Pull", "Lasts Until Rollover", "Attacks Can't Miss", "Pirate", "Breakable", "Drops Items", "Drops Meat"];
var classModifiers = ["Class"];
var modifierTypes_numericModifiers = ["Familiar Weight", "Monster Level", "Combat Rate", "Initiative", "Experience", "Item Drop", "Meat Drop", "Damage Absorption", "Damage Reduction", "Cold Resistance", "Hot Resistance", "Sleaze Resistance", "Spooky Resistance", "Stench Resistance", "Mana Cost", "Moxie", "Moxie Percent", "Muscle", "Muscle Percent", "Mysticality", "Mysticality Percent", "Maximum HP", "Maximum HP Percent", "Maximum MP", "Maximum MP Percent", "Weapon Damage", "Ranged Damage", "Spell Damage", "Spell Damage Percent", "Cold Damage", "Hot Damage", "Sleaze Damage", "Spooky Damage", "Stench Damage", "Cold Spell Damage", "Hot Spell Damage", "Sleaze Spell Damage", "Spooky Spell Damage", "Stench Spell Damage", "Underwater Combat Rate", "Fumble", "HP Regen Min", "HP Regen Max", "MP Regen Min", "MP Regen Max", "Adventures", "Familiar Weight Percent", "Weapon Damage Percent", "Ranged Damage Percent", "Stackable Mana Cost", "Hobo Power", "Base Resting HP", "Resting HP Percent", "Bonus Resting HP", "Base Resting MP", "Resting MP Percent", "Bonus Resting MP", "Critical Hit Percent", "PvP Fights", "Volleyball", "Sombrero", "Leprechaun", "Fairy", "Meat Drop Penalty", "Hidden Familiar Weight", "Item Drop Penalty", "Initiative Penalty", "Food Drop", "Booze Drop", "Hat Drop", "Weapon Drop", "Offhand Drop", "Shirt Drop", "Pants Drop", "Accessory Drop", "Volleyball Effectiveness", "Sombrero Effectiveness", "Leprechaun Effectiveness", "Fairy Effectiveness", "Familiar Weight Cap", "Slime Resistance", "Slime Hates It", "Spell Critical Percent", "Muscle Experience", "Mysticality Experience", "Moxie Experience", "Effect Duration", "Candy Drop", "DB Combat Damage", "Sombrero Bonus", "Familiar Experience", "Sporadic Meat Drop", "Sporadic Item Drop", "Meat Bonus", "Pickpocket Chance", "Combat Mana Cost", "Muscle Experience Percent", "Mysticality Experience Percent", "Moxie Experience Percent", "Minstrel Level", "Muscle Limit", "Mysticality Limit", "Moxie Limit", "Song Duration", "Prismatic Damage", "Smithsness", "Supercold Resistance", "Reduce Enemy Defense", "Pool Skill", "Surgeonosity", "Familiar Damage", "Gear Drop", "Maximum Hooch", "Water Level", "Crimbot Outfit Power", "Familiar Tuning Muscle", "Familiar Tuning Mysticality", "Familiar Tuning Moxie", "Random Monster Modifiers", "Luck", "Othello Skill", "Disco Style", "Rollover Effect Duration", "Sixgun Damage", "Fishing Skill", "Additional Song", "Sprinkle Drop", "Absorb Adventures", "Absorb Stats", "Rubee Drop", "Kruegerand Drop", "WarBear Armor Penetration", "Clowniness", "Maximum PP", "Plumber Power", "Drippy Damage", "Drippy Resistance", "Energy", "Scrap", "Familiar Action Bonus", "Water"];
var effectModifiers = ["Effect", "Rollover Effect"];
var monsterModifiers = ["Avatar"];
var skillModifiers = ["Skill"];
var statModifiers = ["Plumber Stat"];
var stringModifiers = ["Intrinsic Effect", "Equalize", "Wiki Name", "Modifiers", "Outfit", "Stat Tuning", "Equips On", "Familiar Effect", "Jiggle", "Equalize Muscle", "Equalize Mysticality", "Equalize Moxie", "Floor Buffed Muscle", "Floor Buffed Mysticality", "Floor Buffed Moxie"];
// EXTERNAL MODULE: ./node_modules/libram/dist/utils.js
var utils = __webpack_require__(8588);
;// CONCATENATED MODULE: ./node_modules/libram/dist/modifier.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function get(name, subject) {
  if ((0,utils/* arrayContains */.IA)(name, modifierTypes_booleanModifiers)) {
    return subject === undefined ? (0,external_kolmafia_.booleanModifier)(name) : (0,external_kolmafia_.booleanModifier)(subject, name);
  }

  if ((0,utils/* arrayContains */.IA)(name, classModifiers)) {
    return (0,external_kolmafia_.classModifier)(subject, name);
  }

  if ((0,utils/* arrayContains */.IA)(name, effectModifiers)) {
    return (0,external_kolmafia_.effectModifier)(subject, name);
  }

  if ((0,utils/* arrayContains */.IA)(name, monsterModifiers)) {
    return (0,external_kolmafia_.monsterModifier)(subject, name);
  }

  if ((0,utils/* arrayContains */.IA)(name, modifierTypes_numericModifiers)) {
    return subject === undefined ? (0,external_kolmafia_.numericModifier)(name) : (0,external_kolmafia_.numericModifier)(subject, name);
  }

  if ((0,utils/* arrayContains */.IA)(name, skillModifiers)) {
    return (0,external_kolmafia_.skillModifier)(subject, name);
  }

  if ((0,utils/* arrayContains */.IA)(name, stringModifiers)) {
    return subject === undefined ? (0,external_kolmafia_.stringModifier)(name) : (0,external_kolmafia_.stringModifier)(subject, name);
  }

  if ((0,utils/* arrayContains */.IA)(name, statModifiers)) {
    return (0,external_kolmafia_.statModifier)(subject, name);
  }
}
/**
 * Merge two Modifiers objects into one, summing all numeric modifiers, ||ing all boolean modifiers, and otherwise letting the second object overwrite the first.
 * @param modifiers1 Modifiers objects to be merged onto.
 * @param modifiers2 Modifiers object to merge.
 * @returns A single Modifiers object obtained by merging.
 */

function pairwiseMerge(modifiers1, modifiers2) {
  var returnValue = _objectSpread(_objectSpread({}, modifiers1), modifiers2);

  for (var modifier in modifiers1) {
    if (Array.from(Object.values(modifiers2)).includes(modifier)) {
      if (arrayContains(modifier, numericModifiers)) {
        var _modifiers1$modifier, _modifiers2$modifier;

        returnValue[modifier] = ((_modifiers1$modifier = modifiers1[modifier]) !== null && _modifiers1$modifier !== void 0 ? _modifiers1$modifier : 0) + ((_modifiers2$modifier = modifiers2[modifier]) !== null && _modifiers2$modifier !== void 0 ? _modifiers2$modifier : 0);
      }

      if (arrayContains(modifier, booleanModifiers)) {
        var _modifiers1$modifier2, _modifiers2$modifier2;

        returnValue[modifier] = ((_modifiers1$modifier2 = modifiers1[modifier]) !== null && _modifiers1$modifier2 !== void 0 ? _modifiers1$modifier2 : false) || ((_modifiers2$modifier2 = modifiers2[modifier]) !== null && _modifiers2$modifier2 !== void 0 ? _modifiers2$modifier2 : false);
      }
    }
  }

  return returnValue;
}
/**
 * Merge arbitrarily many Modifiers objects into one, summing all numeric modifiers, and ||ing all boolean modifiers.
 * @param modifierss Modifiers objects to be merged together.
 * @returns A single Modifiers object obtained by merging.
 */


function mergeModifiers() {
  for (var _len = arguments.length, modifierss = new Array(_len), _key = 0; _key < _len; _key++) {
    modifierss[_key] = arguments[_key];
  }

  return modifierss.reduce((a, b) => pairwiseMerge(a, b), {});
}

/***/ }),

/***/ 6115:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EA": () => (/* binding */ Mood)
/* harmony export */ });
/* unused harmony exports MpSource, OscusSoda, MagicalSausages */
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2231);
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3311);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2474);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7867);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(678);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8588);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }








var MpSource = /*#__PURE__*/function () {
  function MpSource() {
    _classCallCheck(this, MpSource);
  }

  _createClass(MpSource, [{
    key: "usesRemaining",
    value: function usesRemaining() {
      return 0;
    }
  }, {
    key: "availableMpMax",
    value: function availableMpMax() {
      return this.availableMpMin();
    }
  }]);

  return MpSource;
}();
var OscusSoda = /*#__PURE__*/function (_MpSource) {
  _inherits(OscusSoda, _MpSource);

  var _super = _createSuper(OscusSoda);

  function OscusSoda() {
    _classCallCheck(this, OscusSoda);

    return _super.apply(this, arguments);
  }

  _createClass(OscusSoda, [{
    key: "available",
    value: function available() {
      return (0,_lib__WEBPACK_IMPORTED_MODULE_2__/* .have */ .lf)((0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Oscus's neverending soda"]))));
    }
  }, {
    key: "usesRemaining",
    value: function usesRemaining() {
      return (0,_property__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("oscusSodaUsed") ? 0 : 1;
    }
  }, {
    key: "availableMpMin",
    value: function availableMpMin() {
      return this.available() && this.usesRemaining() > 0 ? 200 : 0;
    }
  }, {
    key: "availableMpMax",
    value: function availableMpMax() {
      return this.available() && this.usesRemaining() > 0 ? 300 : 0;
    }
  }, {
    key: "execute",
    value: function execute() {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Oscus's neverending soda"]))));
    }
  }]);

  return OscusSoda;
}(MpSource);

_defineProperty(OscusSoda, "instance", new OscusSoda());

var MagicalSausages = /*#__PURE__*/function (_MpSource2) {
  _inherits(MagicalSausages, _MpSource2);

  var _super2 = _createSuper(MagicalSausages);

  function MagicalSausages() {
    _classCallCheck(this, MagicalSausages);

    return _super2.apply(this, arguments);
  }

  _createClass(MagicalSausages, [{
    key: "available",
    value: function available() {
      return (0,_lib__WEBPACK_IMPORTED_MODULE_2__/* .have */ .lf)((0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))));
    }
  }, {
    key: "usesRemaining",
    value: function usesRemaining() {
      var maxSausages = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["magical sausage"])))) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["magical sausage casing"]))));
      return this.available() ? (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .clamp */ .uZ)(23 - (0,_property__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_sausagesEaten"), 0, maxSausages) : 0;
    }
  }, {
    key: "availableMpMin",
    value: function availableMpMin() {
      return this.available() ? Math.min((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxmp)(), 999) * this.usesRemaining() : 0;
    }
  }, {
    key: "execute",
    value: function execute() {
      var mpSpaceAvailable = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxmp)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)();
      if (mpSpaceAvailable < 700) return;
      var maxSausages = Math.min(this.usesRemaining(), Math.floor(((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxmp)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)()) / Math.min((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxmp)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)(), 999)));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.retrieveItem)(maxSausages, (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["magical sausage"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.eat)(maxSausages, (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["magical sausage"]))));
    }
  }]);

  return MagicalSausages;
}(MpSource);

_defineProperty(MagicalSausages, "instance", new MagicalSausages());

var MoodElement = /*#__PURE__*/function () {
  function MoodElement() {
    _classCallCheck(this, MoodElement);
  }

  _createClass(MoodElement, [{
    key: "mpCostPerTurn",
    value: function mpCostPerTurn() {
      return 0;
    }
  }, {
    key: "turnIncrement",
    value: function turnIncrement() {
      return 1;
    }
  }]);

  return MoodElement;
}();

var SkillMoodElement = /*#__PURE__*/function (_MoodElement) {
  _inherits(SkillMoodElement, _MoodElement);

  var _super3 = _createSuper(SkillMoodElement);

  function SkillMoodElement(skill) {
    var _this;

    _classCallCheck(this, SkillMoodElement);

    _this = _super3.call(this);

    _defineProperty(_assertThisInitialized(_this), "skill", void 0);

    _this.skill = skill;
    return _this;
  }

  _createClass(SkillMoodElement, [{
    key: "mpCostPerTurn",
    value: function mpCostPerTurn() {
      var turns = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.turnsPerCast)(this.skill);
      return turns > 0 ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mpCost)(this.skill) / turns : 0;
    }
  }, {
    key: "turnIncrement",
    value: function turnIncrement() {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.turnsPerCast)(this.skill);
    }
  }, {
    key: "execute",
    value: function execute(mood, ensureTurns) {
      var effect = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toEffect)(this.skill);
      var initialTurns = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(effect);
      if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveSkill)(this.skill)) return false;
      if (initialTurns >= ensureTurns) return true; // Deal with song slots.

      if (mood.options.songSlots.length > 0 && (0,_lib__WEBPACK_IMPORTED_MODULE_2__/* .isSong */ .rU)(this.skill) && !(0,_lib__WEBPACK_IMPORTED_MODULE_2__/* .have */ .lf)(effect)) {
        var activeSongs = (0,_lib__WEBPACK_IMPORTED_MODULE_2__/* .getActiveSongs */ .b_)();

        var _iterator = _createForOfIteratorHelper(activeSongs),
            _step;

        try {
          var _loop = function _loop() {
            var song = _step.value;
            var slot = mood.options.songSlots.find(slot => slot.includes(song));

            if (!slot || slot.includes(effect)) {
              (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("shrug ".concat(song));
              return "break";
            }
          };

          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _ret = _loop();

            if (_ret === "break") break;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      var oldRemainingCasts = -1;
      var remainingCasts = Math.ceil((ensureTurns - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(effect)) / (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.turnsPerCast)(this.skill));

      while (remainingCasts > 0 && oldRemainingCasts !== remainingCasts) {
        var maxCasts = void 0;

        if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.hpCost)(this.skill) > 0) {
          // FIXME: restore HP
          maxCasts = Math.floor((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHp)() / (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.hpCost)(this.skill));
        } else {
          var cost = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mpCost)(this.skill);
          maxCasts = Math.floor(Math.min(mood.availableMp(), (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)()) / cost);

          if (maxCasts < remainingCasts) {
            var bestMp = Math.min(remainingCasts * (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mpCost)(this.skill), (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxmp)());
            mood.moreMp(bestMp);
            maxCasts = Math.floor(Math.min(mood.availableMp(), (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)()) / cost);
          }
        }

        var casts = (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .clamp */ .uZ)(remainingCasts, 0, Math.min(100, maxCasts));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(casts, this.skill);
        oldRemainingCasts = remainingCasts;
        remainingCasts = Math.ceil((ensureTurns - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(effect)) / (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.turnsPerCast)(this.skill));
      }

      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(effect) > ensureTurns;
    }
  }]);

  return SkillMoodElement;
}(MoodElement);

var PotionMoodElement = /*#__PURE__*/function (_MoodElement2) {
  _inherits(PotionMoodElement, _MoodElement2);

  var _super4 = _createSuper(PotionMoodElement);

  function PotionMoodElement(potion, maxPricePerTurn) {
    var _this2;

    _classCallCheck(this, PotionMoodElement);

    _this2 = _super4.call(this);

    _defineProperty(_assertThisInitialized(_this2), "potion", void 0);

    _defineProperty(_assertThisInitialized(_this2), "maxPricePerTurn", void 0);

    _this2.potion = potion;
    _this2.maxPricePerTurn = maxPricePerTurn;
    return _this2;
  }

  _createClass(PotionMoodElement, [{
    key: "execute",
    value: function execute(mood, ensureTurns) {
      // FIXME: Smarter buying logic.
      // FIXME: Allow constructing stuff (e.g. snow cleats)
      var effect = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.effectModifier)(this.potion, "Effect");
      var effectTurns = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(effect);
      var turnsPerUse = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)(this.potion, "Effect Duration");

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mallPrice)(this.potion) > this.maxPricePerTurn * turnsPerUse) {
        return false;
      } // integer part


      if (effectTurns < ensureTurns) {
        var uses = Math.floor((ensureTurns - effectTurns) / turnsPerUse);
        var quantityToBuy = (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .clamp */ .uZ)(uses - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)(this.potion), 0, 100);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.buy)(quantityToBuy, this.potion, Math.floor(this.maxPricePerTurn * turnsPerUse));
        var quantityToUse = (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .clamp */ .uZ)(uses, 0, (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)(this.potion));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(quantityToUse, this.potion);
      } // fractional part


      var remainingDifference = ensureTurns - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(effect);

      if (remainingDifference > 0) {
        var price = Math.floor(this.maxPricePerTurn * remainingDifference);

        if (price >= (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mallPrice)(this.potion)) {
          if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)(this.potion) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.buy)(1, this.potion, price)) {
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, this.potion);
          }
        }
      }

      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(effect) >= ensureTurns;
    }
  }]);

  return PotionMoodElement;
}(MoodElement);

var GenieMoodElement = /*#__PURE__*/function (_MoodElement3) {
  _inherits(GenieMoodElement, _MoodElement3);

  var _super5 = _createSuper(GenieMoodElement);

  function GenieMoodElement(effect) {
    var _this3;

    _classCallCheck(this, GenieMoodElement);

    _this3 = _super5.call(this);

    _defineProperty(_assertThisInitialized(_this3), "effect", void 0);

    _this3.effect = effect;
    return _this3;
  }

  _createClass(GenieMoodElement, [{
    key: "execute",
    value: function execute(mood, ensureTurns) {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(this.effect) >= ensureTurns) return true;
      var neededWishes = Math.ceil(((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(this.effect) - ensureTurns) / 20);
      var wishesToBuy = (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .clamp */ .uZ)(neededWishes - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["pocket wish"])))), 0, 20);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.buy)(wishesToBuy, (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["pocket wish"]))), 50000);
      var wishesToUse = (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .clamp */ .uZ)(neededWishes, 0, (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["pocket wish"])))));

      for (; wishesToUse > 0; wishesToUse--) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("genie effect ".concat(this.effect.name));
      }

      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(this.effect) >= ensureTurns;
    }
  }]);

  return GenieMoodElement;
}(MoodElement);

var CustomMoodElement = /*#__PURE__*/function (_MoodElement4) {
  _inherits(CustomMoodElement, _MoodElement4);

  var _super6 = _createSuper(CustomMoodElement);

  function CustomMoodElement(effect, gainEffect) {
    var _this4;

    _classCallCheck(this, CustomMoodElement);

    _this4 = _super6.call(this);

    _defineProperty(_assertThisInitialized(_this4), "effect", void 0);

    _defineProperty(_assertThisInitialized(_this4), "gainEffect", void 0);

    _this4.effect = effect;
    _this4.gainEffect = gainEffect !== null && gainEffect !== void 0 ? gainEffect : () => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)(effect.default);
    return _this4;
  }

  _createClass(CustomMoodElement, [{
    key: "execute",
    value: function execute(mood, ensureTurns) {
      var currentTurns = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(this.effect);
      var lastCurrentTurns = -1;

      while (currentTurns < ensureTurns && currentTurns !== lastCurrentTurns) {
        this.gainEffect();
        lastCurrentTurns = currentTurns;
        currentTurns = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(this.effect);
      }

      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(this.effect) > ensureTurns;
    }
  }]);

  return CustomMoodElement;
}(MoodElement);

var AsdonMoodElement = /*#__PURE__*/function (_MoodElement5) {
  _inherits(AsdonMoodElement, _MoodElement5);

  var _super7 = _createSuper(AsdonMoodElement);

  function AsdonMoodElement(effect) {
    var _this5;

    var preferInventory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, AsdonMoodElement);

    _this5 = _super7.call(this);

    _defineProperty(_assertThisInitialized(_this5), "effect", void 0);

    _defineProperty(_assertThisInitialized(_this5), "preferInventory", void 0);

    _this5.effect = effect;
    _this5.preferInventory = preferInventory;
    return _this5;
  }

  _createClass(AsdonMoodElement, [{
    key: "execute",
    value: function execute(mood, ensureTurns) {
      return _resources__WEBPACK_IMPORTED_MODULE_6__/* .drive */ .Ag(this.effect, ensureTurns, this.preferInventory);
    }
  }]);

  return AsdonMoodElement;
}(MoodElement);
/**
 * Class representing a mood object. Add mood elements using the instance methods, which can be chained.
 */


var Mood = /*#__PURE__*/function () {
  /**
   * Construct a new Mood instance.
   * @param options Options for mood.
   */
  function Mood() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Mood);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "elements", []);

    this.options = _objectSpread(_objectSpread({}, Mood.defaultOptions), options);
  }
  /**
   * Get the MP available for casting skills.
   */


  _createClass(Mood, [{
    key: "availableMp",
    value: function availableMp() {
      return this.options.useNativeRestores ? Infinity : (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .sum */ .Sm)(this.options.mpSources, mpSource => mpSource.availableMpMin()) + Math.max((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)() - this.options.reserveMp, 0);
    }
  }, {
    key: "moreMp",
    value: function moreMp(minimumTarget) {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)() >= minimumTarget) return;

      var _iterator2 = _createForOfIteratorHelper(this.options.mpSources),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var mpSource = _step2.value;

          if (mpSource.usesRemaining() > 0) {
            mpSource.execute();
            if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)() >= minimumTarget) break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (this.options.useNativeRestores) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.restoreMp)(minimumTarget);
      }
    }
    /**
     * Add a skill to the mood.
     * @param skill Skill to add.
     */

  }, {
    key: "skill",
    value: function skill(_skill) {
      this.elements.push(new SkillMoodElement(_skill));
      return this;
    }
    /**
     * Add an effect to the mood, with casting based on {effect.default}.
     * @param effect Effect to add.
     * @param gainEffect How to gain the effect. Only runs if we don't have the effect.
     */

  }, {
    key: "effect",
    value: function effect(_effect, gainEffect) {
      var skill = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toSkill)(_effect);

      if (!gainEffect && skill !== (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["none"])))) {
        this.skill(skill);
      } else {
        this.elements.push(new CustomMoodElement(_effect, gainEffect));
      }

      return this;
    }
    /**
     * Add a potion to the mood.
     * @param potion Potion to add.
     * @param maxPricePerTurn Maximum price to pay per turn of the effect.
     */

  }, {
    key: "potion",
    value: function potion(_potion, maxPricePerTurn) {
      this.elements.push(new PotionMoodElement(_potion, maxPricePerTurn));
      return this;
    }
    /**
     * Add an effect to acquire via pocket wishes to the mood.
     * @param effect Effect to wish for in the mood.
     */

  }, {
    key: "genie",
    value: function genie(effect) {
      this.elements.push(new GenieMoodElement(effect));
      return this;
    }
    /**
     * Add an Asdon Martin driving style to the mood.
     * @param effect Driving style to add to the mood.
     */

  }, {
    key: "drive",
    value: function drive(effect) {
      if (Object.values(_resources__WEBPACK_IMPORTED_MODULE_6__/* .Driving */ .ji).includes(effect) && _resources__WEBPACK_IMPORTED_MODULE_6__/* .installed */ .bL()) {
        this.elements.push(new AsdonMoodElement(effect));
      }

      return this;
    }
    /**
     * Execute the mood, trying to ensure {ensureTurns} of each effect.
     * @param ensureTurns Turns of each effect to try and achieve.
     * @returns Whether or not we successfully got this many turns of every effect in the mood.
     */

  }, {
    key: "execute",
    value: function execute() {
      var ensureTurns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var availableMp = this.availableMp();
      var totalMpPerTurn = (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .sum */ .Sm)(this.elements, element => element.mpCostPerTurn());
      var potentialTurns = Math.floor(availableMp / totalMpPerTurn);
      var completeSuccess = true;

      var _iterator3 = _createForOfIteratorHelper(this.elements),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var element = _step3.value;
          var elementTurns = ensureTurns;

          if (element.mpCostPerTurn() > 0) {
            var elementPotentialTurns = Math.floor(potentialTurns / element.turnIncrement()) * element.turnIncrement();
            elementTurns = Math.min(ensureTurns, elementPotentialTurns);
          }

          completeSuccess = element.execute(this, elementTurns) && completeSuccess;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.moreMp(this.options.reserveMp);
      return completeSuccess;
    }
  }], [{
    key: "setDefaultOptions",
    value:
    /**
     * Set default options for new Mood instances.
     * @param options Default options for new Mood instances.
     */
    function setDefaultOptions(options) {
      Mood.defaultOptions = _objectSpread(_objectSpread({}, Mood.defaultOptions), options);
    }
  }]);

  return Mood;
}();

_defineProperty(Mood, "defaultOptions", {
  songSlots: [],
  mpSources: [MagicalSausages.instance, OscusSoda.instance],
  reserveMp: 0,
  useNativeRestores: false
});

/***/ }),

/***/ 2474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Jr": () => (/* binding */ PropertiesManager),
  "U2": () => (/* binding */ get),
  "KF": () => (/* binding */ getString),
  "t8": () => (/* binding */ _set),
  "Rj": () => (/* binding */ withChoice),
  "pr": () => (/* binding */ withProperty)
});

// UNUSED EXPORTS: getBoolean, getBounty, getClass, getCoinmaster, getCommaSeparated, getEffect, getElement, getFamiliar, getItem, getLocation, getMonster, getNumber, getPhylum, getServant, getSkill, getSlot, getStat, getThrall, setProperties, withChoices, withProperties

// EXTERNAL MODULE: ./node_modules/libram/node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(4875);
// EXTERNAL MODULE: ./node_modules/libram/node_modules/core-js/modules/es.object.from-entries.js
var es_object_from_entries = __webpack_require__(8819);
// EXTERNAL MODULE: external "kolmafia"
var external_kolmafia_ = __webpack_require__(7530);
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTypes.js
/** THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseDefaultProperties.ts for more information */
var booleanProperties = ["addChatCommandLine", "addCreationQueue", "addStatusBarToFrames", "allowCloseableDesktopTabs", "allowNegativeTally", "allowNonMoodBurning", "allowSummonBurning", "autoHighlightOnFocus", "broadcastEvents", "cacheMallSearches", "chatBeep", "chatLinksUseRelay", "compactChessboard", "copyAsHTML", "customizedTabs", "debugBuy", "debugConsequences", "debugFoxtrotRemoval", "debugPathnames", "gapProtection", "greenScreenProtection", "guiUsesOneWindow", "hideServerDebugText", "logAcquiredItems", "logBattleAction", "logBrowserInteractions", "logChatMessages", "logChatRequests", "logCleanedHTML", "logDecoratedResponses", "logFamiliarActions", "logGainMessages", "logReadableHTML", "logPreferenceChange", "logMonsterHealth", "logReverseOrder", "logStatGains", "logStatusEffects", "logStatusOnLogin", "macroDebug", "macroLens", "mementoListActive", "mergeHobopolisChat", "printStackOnAbort", "protectAgainstOverdrink", "proxySet", "relayAddSounds", "relayAddsCustomCombat", "relayAddsDiscoHelper", "relayAddsGraphicalCLI", "relayAddsQuickScripts", "relayAddsRestoreLinks", "relayAddsUpArrowLinks", "relayAddsUseLinks", "relayAddsWikiLinks", "relayAllowRemoteAccess", "relayBrowserOnly", "relayFormatsChatText", "relayHidesJunkMallItems", "relayMaintainsEffects", "relayMaintainsHealth", "relayMaintainsMana", "relayOverridesImages", "relayRunsAfterAdventureScript", "relayRunsBeforeBattleScript", "relayRunsBeforePVPScript", "relayScriptButtonFirst", "relayTextualizesEffects", "relayTrimsZapList", "relayUsesInlineLinks", "relayUsesIntegratedChat", "relayWarnOnRecoverFailure", "removeMalignantEffects", "saveSettingsOnSet", "sharePriceData", "showAllRequests", "showExceptionalRequests", "stealthLogin", "svnInstallDependencies", "svnShowCommitMessages", "svnUpdateOnLogin", "switchEquipmentForBuffs", "syncAfterSvnUpdate", "useChatToolbar", "useContactsFrame", "useDevProxyServer", "useDockIconBadge", "useHugglerChannel", "useImageCache", "useLastUserAgent", "useShinyTabbedChat", "useSystemTrayIcon", "useTabbedChatFrame", "useToolbars", "useZoneComboBox", "verboseSpeakeasy", "verboseFloundry", "wrapLongLines", "_announcementShown", "_svnRepoFileFetched", "_svnUpdated", "antagonisticSnowmanKitAvailable", "arcadeGameHints", "armoryUnlocked", "autoForbidIgnoringStores", "autoCraft", "autoQuest", "autoEntangle", "autoGarish", "autoManaRestore", "autoFillMayoMinder", "autoPinkyRing", "autoPlantHardcore", "autoPlantSoftcore", "autoPotionID", "autoRepairBoxServants", "autoSatisfyWithCloset", "autoSatisfyWithCoinmasters", "autoSatisfyWithMall", "autoSatisfyWithNPCs", "autoSatisfyWithStash", "autoSatisfyWithStorage", "autoSetConditions", "autoSphereID", "autoSteal", "autoTuxedo", "backupCameraReverserEnabled", "badMoonEncounter01", "badMoonEncounter02", "badMoonEncounter03", "badMoonEncounter04", "badMoonEncounter05", "badMoonEncounter06", "badMoonEncounter07", "badMoonEncounter08", "badMoonEncounter09", "badMoonEncounter10", "badMoonEncounter11", "badMoonEncounter12", "badMoonEncounter13", "badMoonEncounter14", "badMoonEncounter15", "badMoonEncounter16", "badMoonEncounter17", "badMoonEncounter18", "badMoonEncounter19", "badMoonEncounter20", "badMoonEncounter21", "badMoonEncounter22", "badMoonEncounter23", "badMoonEncounter24", "badMoonEncounter25", "badMoonEncounter26", "badMoonEncounter27", "badMoonEncounter28", "badMoonEncounter29", "badMoonEncounter30", "badMoonEncounter31", "badMoonEncounter32", "badMoonEncounter33", "badMoonEncounter34", "badMoonEncounter35", "badMoonEncounter36", "badMoonEncounter37", "badMoonEncounter38", "badMoonEncounter39", "badMoonEncounter40", "badMoonEncounter41", "badMoonEncounter42", "badMoonEncounter43", "badMoonEncounter44", "badMoonEncounter45", "badMoonEncounter46", "badMoonEncounter47", "badMoonEncounter48", "barrelShrineUnlocked", "bigBrotherRescued", "blackBartsBootyAvailable", "bondAdv", "bondBeach", "bondBeat", "bondBooze", "bondBridge", "bondDesert", "bondDR", "bondDrunk1", "bondDrunk2", "bondHoney", "bondHP", "bondInit", "bondItem1", "bondItem2", "bondItem3", "bondJetpack", "bondMartiniDelivery", "bondMartiniPlus", "bondMartiniTurn", "bondMeat", "bondMox1", "bondMox2", "bondMPregen", "bondMus1", "bondMus2", "bondMys1", "bondMys2", "bondSpleen", "bondStat", "bondStat2", "bondStealth", "bondStealth2", "bondSymbols", "bondWar", "bondWeapon2", "bondWpn", "booPeakLit", "bootsCharged", "breakfastCompleted", "burrowgrubHiveUsed", "canteenUnlocked", "chaosButterflyThrown", "chatbotScriptExecuted", "chateauAvailable", "chatLiterate", "chatServesUpdates", "checkJackassHardcore", "checkJackassSoftcore", "clanAttacksEnabled", "coldAirportAlways", "considerShadowNoodles", "controlRoomUnlock", "concertVisited", "controlPanel1", "controlPanel2", "controlPanel3", "controlPanel4", "controlPanel5", "controlPanel6", "controlPanel7", "controlPanel8", "controlPanel9", "corralUnlocked", "dailyDungeonDone", "dampOldBootPurchased", "daycareOpen", "demonSummoned", "dinseyAudienceEngagement", "dinseyGarbagePirate", "dinseyRapidPassEnabled", "dinseyRollercoasterNext", "dinseySafetyProtocolsLoose", "doghouseBoarded", "dontStopForCounters", "drippingHallUnlocked", "drippyShieldUnlocked", "edUsedLash", "eldritchFissureAvailable", "eldritchHorrorAvailable", "essenceOfAnnoyanceAvailable", "essenceOfBearAvailable", "expressCardUsed", "falloutShelterChronoUsed", "falloutShelterCoolingTankUsed", "fireExtinguisherBatHoleUsed", "fireExtinguisherChasmUsed", "fireExtinguisherCyrptUsed", "fireExtinguisherDesertUsed", "fireExtinguisherHaremUsed", "fistTeachingsHaikuDungeon", "fistTeachingsPokerRoom", "fistTeachingsBarroomBrawl", "fistTeachingsConservatory", "fistTeachingsBatHole", "fistTeachingsFunHouse", "fistTeachingsMenagerie", "fistTeachingsSlums", "fistTeachingsFratHouse", "fistTeachingsRoad", "fistTeachingsNinjaSnowmen", "flickeringPixel1", "flickeringPixel2", "flickeringPixel3", "flickeringPixel4", "flickeringPixel5", "flickeringPixel6", "flickeringPixel7", "flickeringPixel8", "frAlways", "frCemetaryUnlocked", "friarsBlessingReceived", "frMountainsUnlocked", "frSwampUnlocked", "frVillageUnlocked", "frWoodUnlocked", "getawayCampsiteUnlocked", "ghostPencil1", "ghostPencil2", "ghostPencil3", "ghostPencil4", "ghostPencil5", "ghostPencil6", "ghostPencil7", "ghostPencil8", "ghostPencil9", "gingerAdvanceClockUnlocked", "gingerBlackmailAccomplished", "gingerbreadCityAvailable", "gingerExtraAdventures", "gingerNegativesDropped", "gingerSewersUnlocked", "gingerSubwayLineUnlocked", "gingerRetailUnlocked", "glitchItemAvailable", "grabCloversHardcore", "grabCloversSoftcore", "guideToSafariAvailable", "guyMadeOfBeesDefeated", "hardcorePVPWarning", "harvestBatteriesHardcore", "harvestBatteriesSoftcore", "hasBartender", "hasChef", "hasCocktailKit", "hasCosmicBowlingBall", "hasDetectiveSchool", "hasMaydayContract", "hasOven", "hasRange", "hasShaker", "hasSushiMat", "haveBoxingDaydreamHardcore", "haveBoxingDaydreamSoftcore", "hermitHax0red", "holidayHalsBookAvailable", "horseryAvailable", "hotAirportAlways", "implementGlitchItem", "itemBoughtPerAscension637", "itemBoughtPerAscension8266", "itemBoughtPerAscension10790", "itemBoughtPerAscension10794", "itemBoughtPerAscension10795", "itemBoughtPerCharacter6423", "itemBoughtPerCharacter6428", "itemBoughtPerCharacter6429", "kingLiberated", "lastPirateInsult1", "lastPirateInsult2", "lastPirateInsult3", "lastPirateInsult4", "lastPirateInsult5", "lastPirateInsult6", "lastPirateInsult7", "lastPirateInsult8", "lawOfAveragesAvailable", "leafletCompleted", "libraryCardUsed", "lockPicked", "logBastilleBattalionBattles", "loginRecoveryHardcore", "loginRecoverySoftcore", "lovebugsUnlocked", "loveTunnelAvailable", "lowerChamberUnlock", "makePocketWishesHardcore", "makePocketWishesSoftcore", "manualOfNumberologyAvailable", "mappingMonsters", "mapToAnemoneMinePurchased", "mapToKokomoAvailable", "mapToMadnessReefPurchased", "mapToTheDiveBarPurchased", "mapToTheMarinaraTrenchPurchased", "mapToTheSkateParkPurchased", "maraisBeaverUnlock", "maraisCorpseUnlock", "maraisDarkUnlock", "maraisVillageUnlock", "maraisWildlifeUnlock", "maraisWizardUnlock", "maximizerAlwaysCurrent", "maximizerCreateOnHand", "maximizerCurrentMallPrices", "maximizerFoldables", "maximizerIncludeAll", "maximizerNoAdventures", "middleChamberUnlock", "milkOfMagnesiumActive", "moonTuned", "neverendingPartyAlways", "odeBuffbotCheck", "oilPeakLit", "oscusSodaUsed", "outrageousSombreroUsed", "pathedSummonsHardcore", "pathedSummonsSoftcore", "popularTartUnlocked", "prAlways", "prayedForGlamour", "prayedForProtection", "prayedForVigor", "primaryLabCheerCoreGrabbed", "pyramidBombUsed", "ROMOfOptimalityAvailable", "rageGlandVented", "readManualHardcore", "readManualSoftcore", "relayShowSpoilers", "relayShowWarnings", "rememberDesktopSize", "restUsingChateau", "restUsingCampAwayTent", "requireBoxServants", "requireSewerTestItems", "safePickpocket", "schoolOfHardKnocksDiplomaAvailable", "serverAddsCustomCombat", "SHAWARMAInitiativeUnlocked", "showForbiddenStores", "showGainsPerUnit", "showIgnoringStorePrices", "showNoSummonOnly", "showTurnFreeOnly", "sleazeAirportAlways", "snojoAvailable", "sortByRoom", "spacegateAlways", "spacegateVaccine1", "spacegateVaccine2", "spacegateVaccine3", "spaceInvaderDefeated", "spelunkyHints", "spiceMelangeUsed", "spookyAirportAlways", "stenchAirportAlways", "stopForFixedWanderer", "stopForUltraRare", "styxPixieVisited", "suppressInappropriateNags", "suppressPowerPixellation", "telegraphOfficeAvailable", "telescopeLookedHigh", "timeTowerAvailable", "trackLightsOut", "trackVoteMonster", "uneffectWithHotTub", "universalSeasoningActive", "universalSeasoningAvailable", "useCrimboToysHardcore", "useCrimboToysSoftcore", "verboseMaximizer", "visitLoungeHardcore", "visitLoungeSoftcore", "visitRumpusHardcore", "visitRumpusSoftcore", "voteAlways", "wildfireBarrelCaulked", "wildfireDusted", "wildfireFracked", "wildfirePumpGreased", "wildfireSprinkled", "yearbookCameraPending", "youRobotScavenged", "_affirmationCookieEaten", "_affirmationHateUsed", "_airFryerUsed", "_akgyxothUsed", "_alienAnimalMilkUsed", "_alienPlantPodUsed", "_allYearSucker", "_aprilShower", "_armyToddlerCast", "_authorsInkUsed", "_baconMachineUsed", "_bagOfCandy", "_bagOfCandyUsed", "_bagOTricksUsed", "_ballastTurtleUsed", "_ballInACupUsed", "_ballpit", "_barrelPrayer", "_bastilleLastBattleWon", "_beachCombing", "_bendHellUsed", "_blankoutUsed", "_bonersSummoned", "_borrowedTimeUsed", "_bowleggedSwaggerUsed", "_bowlFullOfJellyUsed", "_boxOfHammersUsed", "_brainPreservationFluidUsed", "_brassDreadFlaskUsed", "_cameraUsed", "_canSeekBirds", "_carboLoaded", "_cargoPocketEmptied", "_ceciHatUsed", "_chateauDeskHarvested", "_chateauMonsterFought", "_chronerCrossUsed", "_chronerTriggerUsed", "_chubbyAndPlumpUsed", "_circleDrumUsed", "_clanFortuneBuffUsed", "_claraBellUsed", "_coalPaperweightUsed", "_cocoaDispenserUsed", "_cocktailShakerUsed", "_coldAirportToday", "_coldOne", "_communismUsed", "_confusingLEDClockUsed", "_controlPanelUsed", "_corruptedStardustUsed", "_cosmicSixPackConjured", "_crappyCameraUsed", "_creepyVoodooDollUsed", "_crimboTree", "_cursedKegUsed", "_cursedMicrowaveUsed", "_dailyDungeonMalwareUsed", "_darkChocolateHeart", "_daycareFights", "_daycareNap", "_daycareSpa", "_daycareToday", "_defectiveTokenChecked", "_defectiveTokenUsed", "_dinseyGarbageDisposed", "_discoKnife", "_distentionPillUsed", "_dnaHybrid", "_docClocksThymeCocktailDrunk", "_drippingHallDoor1", "_drippingHallDoor2", "_drippingHallDoor3", "_drippingHallDoor4", "_drippyCaviarUsed", "_drippyNuggetUsed", "_drippyPilsnerUsed", "_drippyPlumUsed", "_drippyWineUsed", "_eldritchHorrorEvoked", "_eldritchTentacleFought", "_entauntaunedToday", "_envyfishEggUsed", "_essentialTofuUsed", "_etchedHourglassUsed", "_eternalCarBatteryUsed", "_everfullGlassUsed", "_eyeAndATwistUsed", "_fancyChessSetUsed", "_falloutShelterSpaUsed", "_fancyHotDogEaten", "_farmerItemsCollected", "_favoriteBirdVisited", "_firedJokestersGun", "_fireExtinguisherRefilled", "_fireStartingKitUsed", "_fireworksShop", "_fireworksShopHatBought", "_fireworksShopEquipmentBought", "_fireworkUsed", "_fishyPipeUsed", "_floundryItemCreated", "_floundryItemUsed", "_freePillKeeperUsed", "_frToday", "_fudgeSporkUsed", "_garbageItemChanged", "_gingerBiggerAlligators", "_gingerbreadCityToday", "_gingerbreadClockAdvanced", "_gingerbreadClockVisited", "_gingerbreadColumnDestroyed", "_gingerbreadMobHitUsed", "_glennGoldenDiceUsed", "_glitchItemImplemented", "_gnollEyeUsed", "_grimBuff", "_guildManualUsed", "_guzzlrQuestAbandoned", "_hardKnocksDiplomaUsed", "_hippyMeatCollected", "_hobbyHorseUsed", "_holidayFunUsed", "_holoWristCrystal", "_hotAirportToday", "_hungerSauceUsed", "_hyperinflatedSealLungUsed", "_iceHotelRoomsRaided", "_iceSculptureUsed", "_incredibleSelfEsteemCast", "_infernoDiscoVisited", "_internetDailyDungeonMalwareBought", "_internetGallonOfMilkBought", "_internetPlusOneBought", "_internetPrintScreenButtonBought", "_internetViralVideoBought", "_interviewIsabella", "_interviewMasquerade", "_interviewVlad", "_inquisitorsUnidentifiableObjectUsed", "_ironicMoustache", "_jackassPlumberGame", "_jarlsCheeseSummoned", "_jarlsCreamSummoned", "_jarlsDoughSummoned", "_jarlsEggsSummoned", "_jarlsFruitSummoned", "_jarlsMeatSummoned", "_jarlsPotatoSummoned", "_jarlsVeggiesSummoned", "_jingleBellUsed", "_jukebox", "_kgbFlywheelCharged", "_kgbLeftDrawerUsed", "_kgbOpened", "_kgbRightDrawerUsed", "_kolConSixPackUsed", "_kolhsCutButNotDried", "_kolhsIsskayLikeAnAshtray", "_kolhsPoeticallyLicenced", "_kolhsSchoolSpirited", "_kudzuSaladEaten", "_latteBanishUsed", "_latteCopyUsed", "_latteDrinkUsed", "_legendaryBeat", "_licenseToChillUsed", "_lookingGlass", "_loveTunnelUsed", "_luckyGoldRingVolcoino", "_lunchBreak", "_lupineHormonesUsed", "_lyleFavored", "_madLiquorDrunk", "_madTeaParty", "_mafiaMiddleFingerRingUsed", "_managerialManipulationUsed", "_mansquitoSerumUsed", "_maydayDropped", "_mayoDeviceRented", "_mayoTankSoaked", "_meatballMachineUsed", "_meatifyMatterUsed", "_milkOfMagnesiumUsed", "_mimeArmyShotglassUsed", "_missGravesVermouthDrunk", "_missileLauncherUsed", "_momFoodReceived", "_mrBurnsgerEaten", "_muffinOrderedToday", "_mushroomGardenVisited", "_neverendingPartyToday", "_newYouQuestCompleted", "_olympicSwimmingPool", "_olympicSwimmingPoolItemFound", "_overflowingGiftBasketUsed", "_partyHard", "_pastaAdditive", "_perfectFreezeUsed", "_perfectlyFairCoinUsed", "_petePartyThrown", "_peteRiotIncited", "_photocopyUsed", "_pickyTweezersUsed", "_pirateBellowUsed", "_pirateForkUsed", "_pixelOrbUsed", "_plumbersMushroomStewEaten", "_pneumaticityPotionUsed", "_potatoAlarmClockUsed", "_pottedTeaTreeUsed", "_prToday", "_psychoJarFilled", "_psychoJarUsed", "_psychokineticHugUsed", "_rainStickUsed", "_redwoodRainStickUsed", "_requestSandwichSucceeded", "_rhinestonesAcquired", "_seaJellyHarvested", "_setOfJacksUsed", "_sewingKitUsed", "_sexChanged", "_shrubDecorated", "_silverDreadFlaskUsed", "_skateBuff1", "_skateBuff2", "_skateBuff3", "_skateBuff4", "_skateBuff5", "_sleazeAirportToday", "_sobrieTeaUsed", "_softwareGlitchTurnReceived", "_spacegateMurderbot", "_spacegateRuins", "_spacegateSpant", "_spacegateToday", "_spacegateVaccine", "_spaghettiBreakfast", "_spaghettiBreakfastEaten", "_spinmasterLatheVisited", "_spinningWheel", "_spookyAirportToday", "_stabonicScrollUsed", "_steelyEyedSquintUsed", "_stenchAirportToday", "_stinkyCheeseBanisherUsed", "_streamsCrossed", "_stuffedPocketwatchUsed", "_styxSprayUsed", "_summonAnnoyanceUsed", "_summonCarrotUsed", "_summonResortPassUsed", "_sweetToothUsed", "_syntheticDogHairPillUsed", "_tacoFlierUsed", "_templeHiddenPower", "_tempuraAirUsed", "_thesisDelivered", "_timeSpinnerReplicatorUsed", "_toastSummoned", "_tonicDjinn", "_treasuryEliteMeatCollected", "_treasuryHaremMeatCollected", "_trivialAvocationsGame", "_tryptophanDartUsed", "_turtlePowerCast", "_twelveNightEnergyUsed", "_ultraMegaSourBallUsed", "_victorSpoilsUsed", "_villainLairCanLidUsed", "_villainLairColorChoiceUsed", "_villainLairDoorChoiceUsed", "_villainLairFirecrackerUsed", "_villainLairSymbologyChoiceUsed", "_villainLairWebUsed", "_vmaskBanisherUsed", "_voraciTeaUsed", "_volcanoItemRedeemed", "_volcanoSuperduperheatedMetal", "_voteToday", "_VYKEACafeteriaRaided", "_VYKEALoungeRaided", "_walfordQuestStartedToday", "_warbearBankUsed", "_warbearBreakfastMachineUsed", "_warbearGyrocopterUsed", "_warbearSodaMachineUsed", "_wildfireBarrelHarvested", "_witchessBuff", "_workshedItemUsed", "_zombieClover", "_preventScurvy", "lockedItem4637", "lockedItem4638", "lockedItem4639", "lockedItem4646", "lockedItem4647", "unknownRecipe3542", "unknownRecipe3543", "unknownRecipe3544", "unknownRecipe3545", "unknownRecipe3546", "unknownRecipe3547", "unknownRecipe3548", "unknownRecipe3749", "unknownRecipe3751", "unknownRecipe4172", "unknownRecipe4173", "unknownRecipe4174", "unknownRecipe5060", "unknownRecipe5061", "unknownRecipe5062", "unknownRecipe5063", "unknownRecipe5064", "unknownRecipe5066", "unknownRecipe5067", "unknownRecipe5069", "unknownRecipe5070", "unknownRecipe5072", "unknownRecipe5073", "unknownRecipe5670", "unknownRecipe5671", "unknownRecipe6501", "unknownRecipe6564", "unknownRecipe6565", "unknownRecipe6566", "unknownRecipe6567", "unknownRecipe6568", "unknownRecipe6569", "unknownRecipe6570", "unknownRecipe6571", "unknownRecipe6572", "unknownRecipe6573", "unknownRecipe6574", "unknownRecipe6575", "unknownRecipe6576", "unknownRecipe6577", "unknownRecipe6578", "unknownRecipe7752", "unknownRecipe7753", "unknownRecipe7754", "unknownRecipe7755", "unknownRecipe7756", "unknownRecipe7757", "unknownRecipe7758"];
var numericProperties = ["charsheetDropdown", "chatStyle", "coinMasterIndex", "dailyDeedsVersion", "defaultDropdown1", "defaultDropdown2", "defaultDropdownSplit", "defaultLimit", "fixedThreadPoolSize", "itemManagerIndex", "lastBuffRequestType", "lastGlobalCounterDay", "lastImageCacheClear", "lastRssUpdate", "previousUpdateRevision", "relayDelayForSVN", "relaySkillButtonCount", "scriptButtonPosition", "statusDropdown", "svnThreadPoolSize", "toolbarPosition", "_g9Effect", "addingScrolls", "affirmationCookiesEaten", "aminoAcidsUsed", "antagonisticSnowmanKitCost", "autoAbortThreshold", "autoAntidote", "autoBuyPriceLimit", "availableCandyCredits", "availableDimes", "availableFunPoints", "availableQuarters", "availableStoreCredits", "availableSwagger", "averageSwagger", "awolMedicine", "awolPointsBeanslinger", "awolPointsCowpuncher", "awolPointsSnakeoiler", "awolDeferredPointsBeanslinger", "awolDeferredPointsCowpuncher", "awolDeferredPointsSnakeoiler", "awolVenom", "bagOTricksCharges", "ballpitBonus", "bankedKarma", "barrelGoal", "bartenderTurnsUsed", "basementMallPrices", "basementSafetyMargin", "batmanFundsAvailable", "batmanBonusInitialFunds", "batmanTimeLeft", "bearSwagger", "beeCounter", "beGregariousCharges", "beGregariousFightsLeft", "birdformCold", "birdformHot", "birdformRoc", "birdformSleaze", "birdformSpooky", "birdformStench", "blackBartsBootyCost", "blackPuddingsDefeated", "blackForestProgress", "blankOutUsed", "bloodweiserDrunk", "bondPoints", "bondVillainsDefeated", "boneAbacusVictories", "booPeakProgress", "borisPoints", "breakableHandling", "breakableHandling1964", "breakableHandling9691", "breakableHandling9692", "breakableHandling9699", "breathitinCharges", "brodenBacteria", "brodenSprinkles", "buffBotMessageDisposal", "buffBotPhilanthropyType", "buffJimmyIngredients", "burnoutsDefeated", "burrowgrubSummonsRemaining", "camelSpit", "camerasUsed", "campAwayDecoration", "carboLoading", "catBurglarBankHeists", "cellarLayout", "charitableDonations", "chasmBridgeProgress", "chefTurnsUsed", "chessboardsCleared", "chilledToTheBone", "cinderellaMinutesToMidnight", "cinderellaScore", "cocktailSummons", "commerceGhostCombats", "controlPanelOmega", "cornucopiasOpened", "cosmicBowlingBallReturnCombats", "cozyCounter6332", "cozyCounter6333", "cozyCounter6334", "crimbo16BeardChakraCleanliness", "crimbo16BootsChakraCleanliness", "crimbo16BungChakraCleanliness", "crimbo16CrimboHatChakraCleanliness", "crimbo16GutsChakraCleanliness", "crimbo16HatChakraCleanliness", "crimbo16JellyChakraCleanliness", "crimbo16LiverChakraCleanliness", "crimbo16NippleChakraCleanliness", "crimbo16NoseChakraCleanliness", "crimbo16ReindeerChakraCleanliness", "crimbo16SackChakraCleanliness", "crimboTreeDays", "cubelingProgress", "currentExtremity", "currentHedgeMazeRoom", "currentMojoFilters", "currentNunneryMeat", "cursedMagnifyingGlassCount", "cyrptAlcoveEvilness", "cyrptCrannyEvilness", "cyrptNicheEvilness", "cyrptNookEvilness", "cyrptTotalEvilness", "darkGyfftePoints", "daycareEquipment", "daycareInstructors", "daycareLastScavenge", "daycareToddlers", "dbNemesisSkill1", "dbNemesisSkill2", "dbNemesisSkill3", "desertExploration", "desktopHeight", "desktopWidth", "dinseyFilthLevel", "dinseyFunProgress", "dinseyNastyBearsDefeated", "dinseySocialJusticeIProgress", "dinseySocialJusticeIIProgress", "dinseyTouristsFed", "dinseyToxicMultiplier", "doctorBagQuestLights", "doctorBagUpgrades", "dreadScroll1", "dreadScroll2", "dreadScroll3", "dreadScroll4", "dreadScroll5", "dreadScroll6", "dreadScroll7", "dreadScroll8", "dripAdventuresSinceAscension", "drippingHallAdventuresSinceAscension", "drippingTreesAdventuresSinceAscension", "drippyBatsUnlocked", "drippyJuice", "drippyOrbsClaimed", "drunkenSwagger", "edDefeatAbort", "edPoints", "eldritchTentaclesFought", "electricKoolAidEaten", "encountersUntilDMTChoice", "encountersUntilNEPChoice", "ensorceleeLevel", "entauntaunedColdRes", "essenceOfAnnoyanceCost", "essenceOfBearCost", "extraRolloverAdventures", "falloutShelterLevel", "fingernailsClipped", "fistSkillsKnown", "flyeredML", "fossilB", "fossilD", "fossilN", "fossilP", "fossilS", "fossilW", "fratboysDefeated", "frenchGuardTurtlesFreed", "garbageChampagneCharge", "garbageFireProgress", "garbageShirtCharge", "garbageTreeCharge", "garlandUpgrades", "gingerDigCount", "gingerLawChoice", "gingerMuscleChoice", "gingerTrainScheduleStudies", "gladiatorBallMovesKnown", "gladiatorBladeMovesKnown", "gladiatorNetMovesKnown", "glitchItemCost", "glitchItemImplementationCount", "glitchItemImplementationLevel", "glitchSwagger", "gloverPoints", "gnasirProgress", "goldenMrAccessories", "gongPath", "gooseDronesRemaining", "goreCollected", "gourdItemCount", "greyYouPoints", "grimoire1Summons", "grimoire2Summons", "grimoire3Summons", "grimstoneCharge", "guardTurtlesFreed", "guideToSafariCost", "guyMadeOfBeesCount", "guzzlrBronzeDeliveries", "guzzlrDeliveryProgress", "guzzlrGoldDeliveries", "guzzlrPlatinumDeliveries", "haciendaLayout", "heavyRainsStartingThunder", "heavyRainsStartingRain", "heavyRainsStartingLightning", "heroDonationBoris", "heroDonationJarlsberg", "heroDonationSneakyPete", "hiddenApartmentProgress", "hiddenBowlingAlleyProgress", "hiddenHospitalProgress", "hiddenOfficeProgress", "hiddenTavernUnlock", "highTopPumped", "hippiesDefeated", "holidayHalsBookCost", "holidaySwagger", "homebodylCharges", "hpAutoRecovery", "hpAutoRecoveryTarget", "iceSwagger", "item9084", "jarlsbergPoints", "jungCharge", "junglePuns", "knownAscensions", "kolhsTotalSchoolSpirited", "lastAnticheeseDay", "lastArcadeAscension", "lastBadMoonReset", "lastBangPotionReset", "lastBarrelSmashed", "lastBattlefieldReset", "lastBeardBuff", "lastBreakfast", "lastCastleGroundUnlock", "lastCastleTopUnlock", "lastCellarReset", "lastChanceThreshold", "lastChasmReset", "lastColosseumRoundWon", "lastCouncilVisit", "lastCounterDay", "lastDesertUnlock", "lastDispensaryOpen", "lastDMTDuplication", "lastDwarfFactoryReset", "lastEVHelmetValue", "lastEVHelmetReset", "lastEasterEggBalloon", "lastEmptiedStorage", "lastFilthClearance", "lastGoofballBuy", "lastGuildStoreOpen", "lastGuyMadeOfBeesReset", "lastFratboyCall", "lastFriarCeremonyAscension", "lastHippyCall", "lastIslandUnlock", "lastKeyotronUse", "lastKingLiberation", "lastLightsOutTurn", "lastMushroomPlot", "lastMiningReset", "lastNemesisReset", "lastPaperStripReset", "lastPirateEphemeraReset", "lastPirateInsultReset", "lastPlusSignUnlock", "lastQuartetAscension", "lastQuartetRequest", "lastSecondFloorUnlock", "lastSkateParkReset", "lastStillBeatingSpleen", "lastTavernAscension", "lastTavernSquare", "lastTelescopeReset", "lastTempleAdventures", "lastTempleButtonsUnlock", "lastTempleUnlock", "lastThingWithNoNameDefeated", "lastTr4pz0rQuest", "lastVioletFogMap", "lastVoteMonsterTurn", "lastWartDinseyDefeated", "lastWuTangDefeated", "lastYearbookCameraAscension", "lastZapperWand", "lastZapperWandExplosionDay", "lawOfAveragesCost", "libramSummons", "lightsOutAutomation", "louvreDesiredGoal", "louvreGoal", "lttQuestDifficulty", "lttQuestStageCount", "manaBurnSummonThreshold", "manaBurningThreshold", "manaBurningTrigger", "manorDrawerCount", "manualOfNumberologyCost", "mapToKokomoCost", "masksUnlocked", "maximizerMRUSize", "maximizerCombinationLimit", "maximizerEquipmentLevel", "maximizerEquipmentScope", "maximizerMaxPrice", "maximizerPriceLevel", "maxManaBurn", "mayflyExperience", "mayoLevel", "meansuckerPrice", "merkinVocabularyMastery", "miniAdvClass", "miniMartinisDrunk", "moleTunnelLevel", "mothershipProgress", "mpAutoRecovery", "mpAutoRecoveryTarget", "munchiesPillsUsed", "mushroomGardenCropLevel", "nextParanormalActivity", "nextQuantumFamiliarOwnerId", "nextQuantumFamiliarTurn", "noobPoints", "noobDeferredPoints", "noodleSummons", "nsContestants1", "nsContestants2", "nsContestants3", "numericSwagger", "nunsVisits", "oilPeakProgress", "optimalSwagger", "optimisticCandleProgress", "palindomeDudesDefeated", "parasolUsed", "pendingMapReflections", "pirateSwagger", "plantingDay", "plumberBadgeCost", "plumberCostumeCost", "plumberPoints", "poolSharkCount", "poolSkill", "primaryLabGooIntensity", "prismaticSummons", "procrastinatorLanguageFluency", "promptAboutCrafting", "puzzleChampBonus", "pyramidPosition", "rockinRobinProgress", "ROMOfOptimalityCost", "quantumPoints", "reagentSummons", "reanimatorArms", "reanimatorLegs", "reanimatorSkulls", "reanimatorWeirdParts", "reanimatorWings", "recentLocations", "redSnapperProgress", "relocatePygmyJanitor", "relocatePygmyLawyer", "rumpelstiltskinTurnsUsed", "rumpelstiltskinKidsRescued", "safariSwagger", "sausageGrinderUnits", "schoolOfHardKnocksDiplomaCost", "schoolSwagger", "scrapbookCharges", "scriptMRULength", "seaodesFound", "SeasoningSwagger", "sexChanges", "shenInitiationDay", "shockingLickCharges", "singleFamiliarRun", "skillBurn3", "skillBurn90", "skillBurn153", "skillBurn154", "skillBurn155", "skillBurn1019", "skillBurn5017", "skillBurn6014", "skillBurn6015", "skillBurn6016", "skillBurn6020", "skillBurn6021", "skillBurn6022", "skillBurn6023", "skillBurn6024", "skillBurn6026", "skillBurn6028", "skillBurn7323", "skillBurn14008", "skillBurn14028", "skillBurn14038", "skillBurn15011", "skillBurn15028", "skillBurn17005", "skillBurn22034", "skillBurn22035", "skillBurn23301", "skillBurn23302", "skillBurn23303", "skillBurn23304", "skillBurn23305", "skillBurn23306", "skillLevel46", "skillLevel47", "skillLevel48", "skillLevel117", "skillLevel118", "skillLevel121", "skillLevel128", "skillLevel134", "skillLevel144", "skillLevel180", "skillLevel188", "skillLevel7254", "slimelingFullness", "slimelingStacksDropped", "slimelingStacksDue", "smoresEaten", "smutOrcNoncombatProgress", "sneakyPetePoints", "snojoMoxieWins", "snojoMuscleWins", "snojoMysticalityWins", "sourceAgentsDefeated", "sourceEnlightenment", "sourceInterval", "sourcePoints", "sourceTerminalGram", "sourceTerminalPram", "sourceTerminalSpam", "spaceBabyLanguageFluency", "spacePirateLanguageFluency", "spelunkyNextNoncombat", "spelunkySacrifices", "spelunkyWinCount", "spookyPuttyCopiesMade", "statbotUses", "sugarCounter4178", "sugarCounter4179", "sugarCounter4180", "sugarCounter4181", "sugarCounter4182", "sugarCounter4183", "sugarCounter4191", "summonAnnoyanceCost", "sweat", "tacoDanCocktailSauce", "tacoDanFishMeat", "tavernLayout", "telescopeUpgrades", "tempuraSummons", "timeSpinnerMedals", "timesRested", "tomeSummons", "totalCharitableDonations", "turtleBlessingTurns", "twinPeakProgress", "unicornHornInflation", "universalSeasoningCost", "usable1HWeapons", "usable1xAccs", "usable2HWeapons", "usable3HWeapons", "usableAccessories", "usableHats", "usableOffhands", "usableOther", "usablePants", "usableShirts", "valueOfAdventure", "valueOfInventory", "valueOfStill", "valueOfTome", "vintnerWineLevel", "violetFogGoal", "walfordBucketProgress", "warehouseProgress", "welcomeBackAdv", "writingDesksDefeated", "xoSkeleltonXProgress", "xoSkeleltonOProgress", "yearbookCameraAscensions", "yearbookCameraUpgrades", "youRobotBody", "youRobotBottom", "youRobotLeft", "youRobotPoints", "youRobotRight", "youRobotTop", "zeppelinProtestors", "zigguratLianas", "zombiePoints", "_absintheDrops", "_abstractionDropsCrown", "_aguaDrops", "_xenomorphCharge", "_ancestralRecallCasts", "_antihangoverBonus", "_astralDrops", "_backUpUses", "_badlyRomanticArrows", "_badgerCharge", "_balefulHowlUses", "_banderRunaways", "_bastilleCheese", "_bastilleGames", "_bastilleGameTurn", "_bastilleLastCheese", "_beanCannonUses", "_bearHugs", "_beerLensDrops", "_bellydancerPickpockets", "_benettonsCasts", "_birdsSoughtToday", "_boomBoxFights", "_boomBoxSongsLeft", "_bootStomps", "_boxingGloveArrows", "_brickoEyeSummons", "_brickoFights", "_campAwayCloudBuffs", "_campAwaySmileBuffs", "_candySummons", "_captainHagnkUsed", "_carnieCandyDrops", "_carrotNoseDrops", "_catBurglarCharge", "_catBurglarHeistsComplete", "_cheerleaderSteam", "_chestXRayUsed", "_chipBags", "_chocolateCigarsUsed", "_chocolateSculpturesUsed", "_chocolatesUsed", "_chronolithActivations", "_chronolithNextCost", "_clanFortuneConsultUses", "_clipartSummons", "_coldMedicineConsults", "_companionshipCasts", "_cosmicBowlingSkillsUsed", "_crimbo21ColdResistance", "_dailySpecialPrice", "_daycareGymScavenges", "_daycareRecruits", "_deckCardsDrawn", "_deluxeKlawSummons", "_demandSandwich", "_detectiveCasesCompleted", "_disavowed", "_dnaPotionsMade", "_donhosCasts", "_dreamJarDrops", "_drunkPygmyBanishes", "_edDefeats", "_edLashCount", "_elronsCasts", "_enamorangs", "_energyCollected", "_expertCornerCutterUsed", "_favorRareSummons", "_feastUsed", "_feelinTheRhythm", "_feelPrideUsed", "_feelExcitementUsed", "_feelHatredUsed", "_feelLonelyUsed", "_feelNervousUsed", "_feelEnvyUsed", "_feelDisappointedUsed", "_feelSuperiorUsed", "_feelLostUsed", "_feelNostalgicUsed", "_feelPeacefulUsed", "_fingertrapArrows", "_fireExtinguisherCharge", "_fragrantHerbsUsed", "_freeBeachWalksUsed", "_frButtonsPressed", "_fudgeWaspFights", "_gapBuffs", "_garbageFireDropsCrown", "_genieFightsUsed", "_genieWishesUsed", "_gibbererAdv", "_gibbererCharge", "_gingerbreadCityTurns", "_glarkCableUses", "_glitchMonsterFights", "_gnomeAdv", "_godLobsterFights", "_goldenMoneyCharge", "_gongDrops", "_gothKidCharge", "_gothKidFights", "_grimBrotherCharge", "_grimFairyTaleDrops", "_grimFairyTaleDropsCrown", "_grimoireConfiscatorSummons", "_grimoireGeekySummons", "_grimstoneMaskDrops", "_grimstoneMaskDropsCrown", "_grooseCharge", "_grooseDrops", "_guzzlrDeliveries", "_guzzlrGoldDeliveries", "_guzzlrPlatinumDeliveries", "_hareAdv", "_hareCharge", "_highTopPumps", "_hipsterAdv", "_hoardedCandyDropsCrown", "_hoboUnderlingSummons", "_holoWristDrops", "_holoWristProgress", "_hotAshesDrops", "_hotJellyUses", "_hotTubSoaks", "_humanMuskUses", "_iceballUses", "_inigosCasts", "_jerksHealthMagazinesUsed", "_jiggleCheese", "_jiggleCream", "_jiggleLife", "_jiggleSteak", "_jitbCharge", "_juneCleaverFightsLeft", "_juneCleaverEncounters", "_juneCleaverStench", "_juneCleaverSpooky", "_juneCleaverSleaze", "_juneCleaverHot", "_juneCleaverCold", "_juneCleaverSkips", "_jungDrops", "_kgbClicksUsed", "_kgbDispenserUses", "_kgbTranquilizerDartUses", "_klawSummons", "_kloopCharge", "_kloopDrops", "_kolhsAdventures", "_kolhsSavedByTheBell", "_lastDailyDungeonRoom", "_lastSausageMonsterTurn", "_lastZomboEye", "_latteRefillsUsed", "_leafblowerML", "_legionJackhammerCrafting", "_llamaCharge", "_longConUsed", "_loveChocolatesUsed", "_lynyrdSnareUses", "_machineTunnelsAdv", "_macrometeoriteUses", "_mafiaThumbRingAdvs", "_mayflowerDrops", "_mayflySummons", "_mediumSiphons", "_meteoriteAdesUsed", "_meteorShowerUses", "_micrometeoriteUses", "_miniMartiniDrops", "_monstersMapped", "_mushroomGardenFights", "_nanorhinoCharge", "_navelRunaways", "_neverendingPartyFreeTurns", "_newYouQuestSharpensDone", "_newYouQuestSharpensToDo", "_nextColdMedicineConsult", "_nextQuantumAlignment", "_nightmareFuelCharges", "_noobSkillCount", "_nuclearStockpileUsed", "_oilExtracted", "_olfactionsUsed", "_optimisticCandleDropsCrown", "_oreDropsCrown", "_otoscopeUsed", "_oysterEggsFound", "_pantsgivingBanish", "_pantsgivingCount", "_pantsgivingCrumbs", "_pantsgivingFullness", "_pasteDrops", "_peteJukeboxFixed", "_peteJumpedShark", "_petePeeledOut", "_pieDrops", "_piePartsCount", "_pixieCharge", "_pocketProfessorLectures", "_poisonArrows", "_pokeGrowFertilizerDrops", "_poolGames", "_powderedGoldDrops", "_powderedMadnessUses", "_powerfulGloveBatteryPowerUsed", "_powerPillDrops", "_powerPillUses", "_precisionCasts", "_radlibSummons", "_raindohCopiesMade", "_rapidPrototypingUsed", "_raveStealCount", "_reflexHammerUsed", "_resolutionAdv", "_resolutionRareSummons", "_riftletAdv", "_roboDrops", "_rogueProgramCharge", "_romanticFightsLeft", "_saberForceMonsterCount", "_saberForceUses", "_saberMod", "_saltGrainsConsumed", "_sandwormCharge", "_saplingsPlanted", "_sausageFights", "_sausagesEaten", "_sausagesMade", "_sealFigurineUses", "_sealScreeches", "_sealsSummoned", "_shatteringPunchUsed", "_shortOrderCookCharge", "_shrubCharge", "_sloppyDinerBeachBucks", "_smilesOfMrA", "_smithsnessSummons", "_snojoFreeFights", "_snojoParts", "_snokebombUsed", "_snowconeSummons", "_snowglobeDrops", "_snowSuitCount", "_sourceTerminalDigitizeMonsterCount", "_sourceTerminalDigitizeUses", "_sourceTerminalDuplicateUses", "_sourceTerminalEnhanceUses", "_sourceTerminalExtrudes", "_sourceTerminalPortscanUses", "_spaceFurDropsCrown", "_spacegatePlanetIndex", "_spacegateTurnsLeft", "_spaceJellyfishDrops", "_speakeasyDrinksDrunk", "_spelunkerCharges", "_spelunkingTalesDrops", "_spookyJellyUses", "_stackLumpsUses", "_steamCardDrops", "_stickerSummons", "_stinkyCheeseCount", "_stressBallSqueezes", "_sugarSummons", "_sweatOutSomeBoozeUsed", "_taffyRareSummons", "_taffyYellowSummons", "_thanksgettingFoodsEaten", "_thingfinderCasts", "_thinknerdPackageDrops", "_thorsPliersCrafting", "_timeHelmetAdv", "_timeSpinnerMinutesUsed", "_tokenDrops", "_transponderDrops", "_turkeyBlastersUsed", "_turkeyBooze", "_turkeyMuscle", "_turkeyMyst", "_turkeyMoxie", "_unaccompaniedMinerUsed", "_unconsciousCollectiveCharge", "_universalSeasoningsUsed", "_universeCalculated", "_universeImploded", "_usedReplicaBatoomerang", "_vampyreCloakeFormUses", "_villainLairProgress", "_vitachocCapsulesUsed", "_vmaskAdv", "_voidFreeFights", "_volcanoItem1", "_volcanoItem2", "_volcanoItem3", "_volcanoItemCount1", "_volcanoItemCount2", "_volcanoItemCount3", "_voteFreeFights", "_VYKEACompanionLevel", "_warbearAutoAnvilCrafting", "_whiteRiceDrops", "_witchessFights", "_xoHugsUsed", "_yellowPixelDropsCrown", "_zapCount"];
var monsterProperties = ["beGregariousMonster", "cameraMonster", "chateauMonster", "clumsinessGroveBoss", "crappyCameraMonster", "crudeMonster", "enamorangMonster", "envyfishMonster", "glacierOfJerksBoss", "iceSculptureMonster", "lastCopyableMonster", "longConMonster", "maelstromOfLoversBoss", "makeFriendsMonster", "merkinLockkeyMonster", "nosyNoseMonster", "olfactedMonster", "photocopyMonster", "rainDohMonster", "romanticTarget", "screencappedMonster", "spookyPuttyMonster", "stenchCursedMonster", "superficiallyInterestedMonster", "waxMonster", "yearbookCameraTarget", "_gallapagosMonster", "_jiggleCreamedMonster", "_latteMonster", "_nanorhinoBanishedMonster", "_newYouQuestMonster", "_relativityMonster", "_saberForceMonster", "_sourceTerminalDigitizeMonster", "_voteMonster"];
var locationProperties = ["currentJunkyardLocation", "doctorBagQuestLocation", "ghostLocation", "guzzlrQuestLocation", "nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom", "sourceOracleTarget", "_floundryBassLocation", "_floundryCarpLocation", "_floundryCodLocation", "_floundryHatchetfishLocation", "_floundryTroutLocation", "_floundryTunaLocation"];
var stringProperties = ["autoLogin", "browserBookmarks", "chatFontSize", "combatHotkey0", "combatHotkey1", "combatHotkey2", "combatHotkey3", "combatHotkey4", "combatHotkey5", "combatHotkey6", "combatHotkey7", "combatHotkey8", "combatHotkey9", "commandLineNamespace", "cookies.inventory", "dailyDeedsOptions", "defaultBorderColor", "displayName", "externalEditor", "getBreakfast", "headerStates", "highlightList", "http.proxyHost", "http.proxyPassword", "http.proxyPort", "http.proxyUser", "https.proxyHost", "https.proxyPassword", "https.proxyPort", "https.proxyUser", "initialDesktop", "initialFrames", "innerChatColor", "innerTabColor", "lastRelayUpdate", "lastRssVersion", "lastUserAgent", "lastUsername", "logPreferenceChangeFilter", "loginScript", "loginServerName", "loginWindowLogo", "logoutScript", "outerChatColor", "outerTabColor", "previousNotifyList", "previousUpdateVersion", "saveState", "saveStateActive", "scriptList", "swingLookAndFeel", "userAgent", "afterAdventureScript", "autoOlfact", "autoPutty", "backupCameraMode", "banishedMonsters", "banishingShoutMonsters", "barrelLayout", "batmanStats", "batmanZone", "batmanUpgrades", "battleAction", "beachHeadsUnlocked", "beforePVPScript", "betweenBattleScript", "boomBoxSong", "breakfastAlways", "breakfastHardcore", "breakfastSoftcore", "buffBotCasting", "buyScript", "cargoPocketsEmptied", "cargoPocketScraps", "chatbotScript", "chatPlayerScript", "choiceAdventureScript", "chosenTrip", "clanFortuneReply1", "clanFortuneReply2", "clanFortuneReply3", "clanFortuneWord1", "clanFortuneWord2", "clanFortuneWord3", "commerceGhostItem", "counterScript", "copperheadClubHazard", "crimbotChassis", "crimbotArm", "crimbotPropulsion", "crystalBallPredictions", "csServicesPerformed", "currentEasyBountyItem", "currentHardBountyItem", "currentHippyStore", "currentJunkyardTool", "currentMood", "currentPVPSeason", "currentPvpVictories", "currentSpecialBountyItem", "customCombatScript", "cyrusAdjectives", "defaultFlowerLossMessage", "defaultFlowerWinMessage", "demonName1", "demonName2", "demonName3", "demonName4", "demonName5", "demonName6", "demonName7", "demonName8", "demonName9", "demonName10", "demonName11", "demonName12", "demonName13", "dinseyGatorStenchDamage", "dinseyRollercoasterStats", "doctorBagQuestItem", "dolphinItem", "edPiece", "enamorangMonsterTurn", "ensorcelee", "EVEDirections", "extraCosmeticModifiers", "familiarScript", "forbiddenStores", "gameProBossSpecialPower", "gooseReprocessed", "grimoireSkillsHardcore", "grimoireSkillsSoftcore", "grimstoneMaskPath", "guzzlrQuestClient", "guzzlrQuestBooze", "guzzlrQuestTier", "harvestGardenHardcore", "harvestGardenSoftcore", "hpAutoRecoveryItems", "invalidBuffMessage", "jickSwordModifier", "juneCleaverQueue", "kingLiberatedScript", "lassoTraining", "lastAdventure", "lastBangPotion819", "lastBangPotion820", "lastBangPotion821", "lastBangPotion822", "lastBangPotion823", "lastBangPotion824", "lastBangPotion825", "lastBangPotion826", "lastBangPotion827", "lastChanceBurn", "lastChessboard", "lastDwarfDiceRolls", "lastDwarfDigitRunes", "lastDwarfEquipmentRunes", "lastDwarfFactoryItem118", "lastDwarfFactoryItem119", "lastDwarfFactoryItem120", "lastDwarfFactoryItem360", "lastDwarfFactoryItem361", "lastDwarfFactoryItem362", "lastDwarfFactoryItem363", "lastDwarfFactoryItem364", "lastDwarfFactoryItem365", "lastDwarfFactoryItem910", "lastDwarfFactoryItem3199", "lastDwarfOfficeItem3208", "lastDwarfOfficeItem3209", "lastDwarfOfficeItem3210", "lastDwarfOfficeItem3211", "lastDwarfOfficeItem3212", "lastDwarfOfficeItem3213", "lastDwarfOfficeItem3214", "lastDwarfOreRunes", "lastDwarfHopper1", "lastDwarfHopper2", "lastDwarfHopper3", "lastDwarfHopper4", "lastEncounter", "lastMacroError", "lastMessageId", "lastPaperStrip3144", "lastPaperStrip4138", "lastPaperStrip4139", "lastPaperStrip4140", "lastPaperStrip4141", "lastPaperStrip4142", "lastPaperStrip4143", "lastPaperStrip4144", "lastPirateEphemera", "lastPorkoBoard", "lastPorkoPayouts", "lastPorkoExpected", "lastSlimeVial3885", "lastSlimeVial3886", "lastSlimeVial3887", "lastSlimeVial3888", "lastSlimeVial3889", "lastSlimeVial3890", "lastSlimeVial3891", "lastSlimeVial3892", "lastSlimeVial3893", "lastSlimeVial3894", "lastSlimeVial3895", "lastSlimeVial3896", "latteModifier", "latteUnlocks", "libramSkillsHardcore", "libramSkillsSoftcore", "louvreOverride", "lovePotion", "lttQuestName", "maximizerList", "maximizerMRUList", "mayoInMouth", "mayoMinderSetting", "merkinQuestPath", "mineLayout1", "mineLayout2", "mineLayout3", "mineLayout4", "mineLayout5", "mineLayout6", "mpAutoRecoveryItems", "muffinOnOrder", "nextAdventure", "nextQuantumFamiliarName", "nextQuantumFamiliarOwner", "nsChallenge2", "nsChallenge3", "nsChallenge4", "nsChallenge5", "nsTowerDoorKeysUsed", "oceanAction", "oceanDestination", "pastaThrall1", "pastaThrall2", "pastaThrall3", "pastaThrall4", "pastaThrall5", "pastaThrall6", "pastaThrall7", "pastaThrall8", "peteMotorbikeTires", "peteMotorbikeGasTank", "peteMotorbikeHeadlight", "peteMotorbikeCowling", "peteMotorbikeMuffler", "peteMotorbikeSeat", "pieStuffing", "plantingDate", "plantingLength", "plantingScript", "plumberCostumeWorn", "pokefamBoosts", "postAscensionScript", "preAscensionScript", "retroCapeSuperhero", "retroCapeWashingInstructions", "questClumsinessGrove", "questDoctorBag", "questECoBucket", "questESlAudit", "questESlBacteria", "questESlCheeseburger", "questESlCocktail", "questESlDebt", "questESlFish", "questESlMushStash", "questESlSalt", "questESlSprinkles", "questESpEVE", "questESpJunglePun", "questESpGore", "questESpClipper", "questESpFakeMedium", "questESpSerum", "questESpSmokes", "questESpOutOfOrder", "questEStFishTrash", "questEStGiveMeFuel", "questEStNastyBears", "questEStSocialJusticeI", "questEStSocialJusticeII", "questEStSuperLuber", "questEStWorkWithFood", "questEStZippityDooDah", "questEUNewYou", "questF01Primordial", "questF02Hyboria", "questF03Future", "questF04Elves", "questF05Clancy", "questG01Meatcar", "questG02Whitecastle", "questG03Ego", "questG04Nemesis", "questG05Dark", "questG06Delivery", "questG07Myst", "questG08Moxie", "questG09Muscle", "questGlacierOfJerks", "questGuzzlr", "questI01Scapegoat", "questI02Beat", "questL02Larva", "questL03Rat", "questL04Bat", "questL05Goblin", "questL06Friar", "questL07Cyrptic", "questL08Trapper", "questL09Topping", "questL10Garbage", "questL11MacGuffin", "questL11Black", "questL11Business", "questL11Curses", "questL11Desert", "questL11Doctor", "questL11Manor", "questL11Palindome", "questL11Pyramid", "questL11Ron", "questL11Shen", "questL11Spare", "questL11Worship", "questL12War", "questL12HippyFrat", "questL13Final", "questL13Warehouse", "questLTTQuestByWire", "questM01Untinker", "questM02Artist", "questM03Bugbear", "questM05Toot", "questM06Gourd", "questM07Hammer", "questM08Baker", "questM09Rocks", "questM10Azazel", "questM11Postal", "questM12Pirate", "questM13Escape", "questM14Bounty", "questM15Lol", "questM16Temple", "questM17Babies", "questM18Swamp", "questM19Hippy", "questM20Necklace", "questM21Dance", "questM22Shirt", "questM23Meatsmith", "questM24Doc", "questM25Armorer", "questM26Oracle", "questMaelstromOfLovers", "questPAGhost", "questS01OldGuy", "questS02Monkees", "raveCombo1", "raveCombo2", "raveCombo3", "raveCombo4", "raveCombo5", "raveCombo6", "recoveryScript", "relayCounters", "royalty", "scriptMRUList", "seahorseName", "shenQuestItem", "shrubGarland", "shrubGifts", "shrubLights", "shrubTopper", "sideDefeated", "sidequestArenaCompleted", "sidequestFarmCompleted", "sidequestJunkyardCompleted", "sidequestLighthouseCompleted", "sidequestNunsCompleted", "sidequestOrchardCompleted", "skateParkStatus", "snowsuit", "sourceTerminalChips", "sourceTerminalEducate1", "sourceTerminalEducate2", "sourceTerminalEnquiry", "sourceTerminalEducateKnown", "sourceTerminalEnhanceKnown", "sourceTerminalEnquiryKnown", "sourceTerminalExtrudeKnown", "spadingData", "spadingScript", "spelunkyStatus", "spelunkyUpgrades", "spookyravenRecipeUsed", "stationaryButton1", "stationaryButton2", "stationaryButton3", "stationaryButton4", "stationaryButton5", "streamCrossDefaultTarget", "sweetSynthesisBlacklist", "telescope1", "telescope2", "telescope3", "telescope4", "telescope5", "testudinalTeachings", "textColors", "thanksMessage", "tomeSkillsHardcore", "tomeSkillsSoftcore", "trapperOre", "umbrellaState", "umdLastObtained", "vintnerWineEffect", "vintnerWineName", "vintnerWineType", "violetFogLayout", "volcanoMaze1", "volcanoMaze2", "volcanoMaze3", "volcanoMaze4", "volcanoMaze5", "walfordBucketItem", "warProgress", "workteaClue", "yourFavoriteBird", "yourFavoriteBirdMods", "youRobotCPUUpgrades", "_bastilleBoosts", "_bastilleChoice1", "_bastilleChoice2", "_bastilleChoice3", "_bastilleCurrentStyles", "_bastilleEnemyCastle", "_bastilleEnemyName", "_bastilleLastBattleResults", "_bastilleLastEncounter", "_bastilleStats", "_beachHeadsUsed", "_beachLayout", "_beachMinutes", "_birdOfTheDay", "_birdOfTheDayMods", "_bittycar", "_campAwaySmileBuffSign", "_cloudTalkMessage", "_cloudTalkSmoker", "_coatOfPaintModifier", "_dailySpecial", "_deckCardsSeen", "_feastedFamiliars", "_floristPlantsUsed", "_frAreasUnlocked", "_frHoursLeft", "_frMonstersKilled", "_horsery", "_horseryCrazyMox", "_horseryCrazyMus", "_horseryCrazyMys", "_horseryCrazyName", "_horseryCurrentName", "_horseryDarkName", "_horseryNormalName", "_horseryPaleName", "_jickJarAvailable", "_jiggleCheesedMonsters", "_lastCombatStarted", "_LastPirateRealmIsland", "_locketMonstersFought", "_mummeryMods", "_mummeryUses", "_newYouQuestSkill", "_noHatModifier", "_pantogramModifier", "_questESp", "_questPartyFair", "_questPartyFairProgress", "_questPartyFairQuest", "_roboDrinks", "_roninStoragePulls", "_spacegateAnimalLife", "_spacegateCoordinates", "_spacegateHazards", "_spacegateIntelligentLife", "_spacegatePlanetName", "_spacegatePlantLife", "_stolenAccordions", "_tempRelayCounters", "_timeSpinnerFoodAvailable", "_unknownEasyBountyItem", "_unknownHardBountyItem", "_unknownSpecialBountyItem", "_untakenEasyBountyItem", "_untakenHardBountyItem", "_untakenSpecialBountyItem", "_userMods", "_villainLairColor", "_villainLairKey", "_voteLocal1", "_voteLocal2", "_voteLocal3", "_voteLocal4", "_voteMonster1", "_voteMonster2", "_voteModifier", "_VYKEACompanionType", "_VYKEACompanionRune", "_VYKEACompanionName"];
var numericOrStringProperties = ["statusEngineering", "statusGalley", "statusMedbay", "statusMorgue", "statusNavigation", "statusScienceLab", "statusSonar", "statusSpecialOps", "statusWasteProcessing", "choiceAdventure2", "choiceAdventure3", "choiceAdventure4", "choiceAdventure5", "choiceAdventure6", "choiceAdventure7", "choiceAdventure8", "choiceAdventure9", "choiceAdventure10", "choiceAdventure11", "choiceAdventure12", "choiceAdventure14", "choiceAdventure15", "choiceAdventure16", "choiceAdventure17", "choiceAdventure18", "choiceAdventure19", "choiceAdventure20", "choiceAdventure21", "choiceAdventure22", "choiceAdventure23", "choiceAdventure24", "choiceAdventure25", "choiceAdventure26", "choiceAdventure27", "choiceAdventure28", "choiceAdventure29", "choiceAdventure40", "choiceAdventure41", "choiceAdventure42", "choiceAdventure45", "choiceAdventure46", "choiceAdventure47", "choiceAdventure71", "choiceAdventure72", "choiceAdventure73", "choiceAdventure74", "choiceAdventure75", "choiceAdventure76", "choiceAdventure77", "choiceAdventure86", "choiceAdventure87", "choiceAdventure88", "choiceAdventure89", "choiceAdventure90", "choiceAdventure91", "choiceAdventure105", "choiceAdventure106", "choiceAdventure107", "choiceAdventure108", "choiceAdventure109", "choiceAdventure110", "choiceAdventure111", "choiceAdventure112", "choiceAdventure113", "choiceAdventure114", "choiceAdventure115", "choiceAdventure116", "choiceAdventure117", "choiceAdventure118", "choiceAdventure120", "choiceAdventure123", "choiceAdventure125", "choiceAdventure126", "choiceAdventure127", "choiceAdventure129", "choiceAdventure131", "choiceAdventure132", "choiceAdventure135", "choiceAdventure136", "choiceAdventure137", "choiceAdventure138", "choiceAdventure139", "choiceAdventure140", "choiceAdventure141", "choiceAdventure142", "choiceAdventure143", "choiceAdventure144", "choiceAdventure145", "choiceAdventure146", "choiceAdventure147", "choiceAdventure148", "choiceAdventure149", "choiceAdventure151", "choiceAdventure152", "choiceAdventure153", "choiceAdventure154", "choiceAdventure155", "choiceAdventure156", "choiceAdventure157", "choiceAdventure158", "choiceAdventure159", "choiceAdventure160", "choiceAdventure161", "choiceAdventure162", "choiceAdventure163", "choiceAdventure164", "choiceAdventure165", "choiceAdventure166", "choiceAdventure167", "choiceAdventure168", "choiceAdventure169", "choiceAdventure170", "choiceAdventure171", "choiceAdventure172", "choiceAdventure177", "choiceAdventure178", "choiceAdventure180", "choiceAdventure181", "choiceAdventure182", "choiceAdventure184", "choiceAdventure185", "choiceAdventure186", "choiceAdventure187", "choiceAdventure188", "choiceAdventure189", "choiceAdventure191", "choiceAdventure197", "choiceAdventure198", "choiceAdventure199", "choiceAdventure200", "choiceAdventure201", "choiceAdventure202", "choiceAdventure203", "choiceAdventure204", "choiceAdventure205", "choiceAdventure206", "choiceAdventure207", "choiceAdventure208", "choiceAdventure211", "choiceAdventure212", "choiceAdventure213", "choiceAdventure214", "choiceAdventure215", "choiceAdventure216", "choiceAdventure217", "choiceAdventure218", "choiceAdventure219", "choiceAdventure220", "choiceAdventure221", "choiceAdventure222", "choiceAdventure223", "choiceAdventure224", "choiceAdventure225", "choiceAdventure230", "choiceAdventure272", "choiceAdventure273", "choiceAdventure276", "choiceAdventure277", "choiceAdventure278", "choiceAdventure279", "choiceAdventure280", "choiceAdventure281", "choiceAdventure282", "choiceAdventure283", "choiceAdventure284", "choiceAdventure285", "choiceAdventure286", "choiceAdventure287", "choiceAdventure288", "choiceAdventure289", "choiceAdventure290", "choiceAdventure291", "choiceAdventure292", "choiceAdventure293", "choiceAdventure294", "choiceAdventure295", "choiceAdventure296", "choiceAdventure297", "choiceAdventure298", "choiceAdventure299", "choiceAdventure302", "choiceAdventure303", "choiceAdventure304", "choiceAdventure305", "choiceAdventure306", "choiceAdventure307", "choiceAdventure308", "choiceAdventure309", "choiceAdventure310", "choiceAdventure311", "choiceAdventure317", "choiceAdventure318", "choiceAdventure319", "choiceAdventure320", "choiceAdventure321", "choiceAdventure322", "choiceAdventure326", "choiceAdventure327", "choiceAdventure328", "choiceAdventure329", "choiceAdventure330", "choiceAdventure331", "choiceAdventure332", "choiceAdventure333", "choiceAdventure334", "choiceAdventure335", "choiceAdventure336", "choiceAdventure337", "choiceAdventure338", "choiceAdventure339", "choiceAdventure340", "choiceAdventure341", "choiceAdventure342", "choiceAdventure343", "choiceAdventure344", "choiceAdventure345", "choiceAdventure346", "choiceAdventure347", "choiceAdventure348", "choiceAdventure349", "choiceAdventure350", "choiceAdventure351", "choiceAdventure352", "choiceAdventure353", "choiceAdventure354", "choiceAdventure355", "choiceAdventure356", "choiceAdventure357", "choiceAdventure358", "choiceAdventure360", "choiceAdventure361", "choiceAdventure362", "choiceAdventure363", "choiceAdventure364", "choiceAdventure365", "choiceAdventure366", "choiceAdventure367", "choiceAdventure372", "choiceAdventure376", "choiceAdventure387", "choiceAdventure388", "choiceAdventure389", "choiceAdventure390", "choiceAdventure391", "choiceAdventure392", "choiceAdventure393", "choiceAdventure395", "choiceAdventure396", "choiceAdventure397", "choiceAdventure398", "choiceAdventure399", "choiceAdventure400", "choiceAdventure401", "choiceAdventure402", "choiceAdventure403", "choiceAdventure423", "choiceAdventure424", "choiceAdventure425", "choiceAdventure426", "choiceAdventure427", "choiceAdventure428", "choiceAdventure429", "choiceAdventure430", "choiceAdventure431", "choiceAdventure432", "choiceAdventure433", "choiceAdventure435", "choiceAdventure438", "choiceAdventure439", "choiceAdventure442", "choiceAdventure444", "choiceAdventure445", "choiceAdventure446", "choiceAdventure447", "choiceAdventure448", "choiceAdventure449", "choiceAdventure451", "choiceAdventure452", "choiceAdventure453", "choiceAdventure454", "choiceAdventure455", "choiceAdventure456", "choiceAdventure457", "choiceAdventure458", "choiceAdventure460", "choiceAdventure461", "choiceAdventure462", "choiceAdventure463", "choiceAdventure464", "choiceAdventure465", "choiceAdventure467", "choiceAdventure468", "choiceAdventure469", "choiceAdventure470", "choiceAdventure471", "choiceAdventure472", "choiceAdventure473", "choiceAdventure474", "choiceAdventure475", "choiceAdventure477", "choiceAdventure478", "choiceAdventure480", "choiceAdventure483", "choiceAdventure484", "choiceAdventure485", "choiceAdventure486", "choiceAdventure488", "choiceAdventure489", "choiceAdventure490", "choiceAdventure491", "choiceAdventure496", "choiceAdventure497", "choiceAdventure502", "choiceAdventure503", "choiceAdventure504", "choiceAdventure505", "choiceAdventure506", "choiceAdventure507", "choiceAdventure509", "choiceAdventure510", "choiceAdventure511", "choiceAdventure512", "choiceAdventure513", "choiceAdventure514", "choiceAdventure515", "choiceAdventure517", "choiceAdventure518", "choiceAdventure519", "choiceAdventure521", "choiceAdventure522", "choiceAdventure523", "choiceAdventure527", "choiceAdventure528", "choiceAdventure529", "choiceAdventure530", "choiceAdventure531", "choiceAdventure532", "choiceAdventure533", "choiceAdventure534", "choiceAdventure535", "choiceAdventure536", "choiceAdventure538", "choiceAdventure539", "choiceAdventure542", "choiceAdventure543", "choiceAdventure544", "choiceAdventure546", "choiceAdventure548", "choiceAdventure549", "choiceAdventure550", "choiceAdventure551", "choiceAdventure552", "choiceAdventure553", "choiceAdventure554", "choiceAdventure556", "choiceAdventure557", "choiceAdventure558", "choiceAdventure559", "choiceAdventure560", "choiceAdventure561", "choiceAdventure562", "choiceAdventure563", "choiceAdventure564", "choiceAdventure565", "choiceAdventure566", "choiceAdventure567", "choiceAdventure568", "choiceAdventure569", "choiceAdventure571", "choiceAdventure572", "choiceAdventure573", "choiceAdventure574", "choiceAdventure575", "choiceAdventure576", "choiceAdventure577", "choiceAdventure578", "choiceAdventure579", "choiceAdventure581", "choiceAdventure582", "choiceAdventure583", "choiceAdventure584", "choiceAdventure594", "choiceAdventure595", "choiceAdventure596", "choiceAdventure597", "choiceAdventure598", "choiceAdventure599", "choiceAdventure600", "choiceAdventure603", "choiceAdventure604", "choiceAdventure616", "choiceAdventure634", "choiceAdventure640", "choiceAdventure654", "choiceAdventure655", "choiceAdventure656", "choiceAdventure657", "choiceAdventure658", "choiceAdventure664", "choiceAdventure669", "choiceAdventure670", "choiceAdventure671", "choiceAdventure672", "choiceAdventure673", "choiceAdventure674", "choiceAdventure675", "choiceAdventure676", "choiceAdventure677", "choiceAdventure678", "choiceAdventure679", "choiceAdventure681", "choiceAdventure683", "choiceAdventure684", "choiceAdventure685", "choiceAdventure686", "choiceAdventure687", "choiceAdventure688", "choiceAdventure689", "choiceAdventure690", "choiceAdventure691", "choiceAdventure692", "choiceAdventure693", "choiceAdventure694", "choiceAdventure695", "choiceAdventure696", "choiceAdventure697", "choiceAdventure698", "choiceAdventure700", "choiceAdventure701", "choiceAdventure705", "choiceAdventure706", "choiceAdventure707", "choiceAdventure708", "choiceAdventure709", "choiceAdventure710", "choiceAdventure711", "choiceAdventure712", "choiceAdventure713", "choiceAdventure714", "choiceAdventure715", "choiceAdventure716", "choiceAdventure717", "choiceAdventure721", "choiceAdventure725", "choiceAdventure729", "choiceAdventure733", "choiceAdventure737", "choiceAdventure741", "choiceAdventure745", "choiceAdventure749", "choiceAdventure753", "choiceAdventure771", "choiceAdventure778", "choiceAdventure780", "choiceAdventure781", "choiceAdventure783", "choiceAdventure784", "choiceAdventure785", "choiceAdventure786", "choiceAdventure787", "choiceAdventure788", "choiceAdventure789", "choiceAdventure791", "choiceAdventure793", "choiceAdventure794", "choiceAdventure795", "choiceAdventure796", "choiceAdventure797", "choiceAdventure803", "choiceAdventure805", "choiceAdventure808", "choiceAdventure809", "choiceAdventure813", "choiceAdventure815", "choiceAdventure830", "choiceAdventure832", "choiceAdventure833", "choiceAdventure834", "choiceAdventure835", "choiceAdventure837", "choiceAdventure838", "choiceAdventure839", "choiceAdventure840", "choiceAdventure841", "choiceAdventure842", "choiceAdventure851", "choiceAdventure852", "choiceAdventure853", "choiceAdventure854", "choiceAdventure855", "choiceAdventure856", "choiceAdventure857", "choiceAdventure858", "choiceAdventure866", "choiceAdventure873", "choiceAdventure875", "choiceAdventure876", "choiceAdventure877", "choiceAdventure878", "choiceAdventure879", "choiceAdventure880", "choiceAdventure881", "choiceAdventure882", "choiceAdventure888", "choiceAdventure889", "choiceAdventure918", "choiceAdventure919", "choiceAdventure920", "choiceAdventure921", "choiceAdventure923", "choiceAdventure924", "choiceAdventure925", "choiceAdventure926", "choiceAdventure927", "choiceAdventure928", "choiceAdventure929", "choiceAdventure930", "choiceAdventure931", "choiceAdventure932", "choiceAdventure940", "choiceAdventure941", "choiceAdventure942", "choiceAdventure943", "choiceAdventure944", "choiceAdventure945", "choiceAdventure946", "choiceAdventure950", "choiceAdventure955", "choiceAdventure957", "choiceAdventure958", "choiceAdventure959", "choiceAdventure960", "choiceAdventure961", "choiceAdventure962", "choiceAdventure963", "choiceAdventure964", "choiceAdventure965", "choiceAdventure966", "choiceAdventure970", "choiceAdventure973", "choiceAdventure974", "choiceAdventure975", "choiceAdventure976", "choiceAdventure977", "choiceAdventure979", "choiceAdventure980", "choiceAdventure981", "choiceAdventure982", "choiceAdventure983", "choiceAdventure988", "choiceAdventure989", "choiceAdventure993", "choiceAdventure998", "choiceAdventure1000", "choiceAdventure1003", "choiceAdventure1005", "choiceAdventure1006", "choiceAdventure1007", "choiceAdventure1008", "choiceAdventure1009", "choiceAdventure1010", "choiceAdventure1011", "choiceAdventure1012", "choiceAdventure1013", "choiceAdventure1015", "choiceAdventure1016", "choiceAdventure1017", "choiceAdventure1018", "choiceAdventure1019", "choiceAdventure1020", "choiceAdventure1021", "choiceAdventure1022", "choiceAdventure1023", "choiceAdventure1026", "choiceAdventure1027", "choiceAdventure1028", "choiceAdventure1029", "choiceAdventure1030", "choiceAdventure1031", "choiceAdventure1032", "choiceAdventure1033", "choiceAdventure1034", "choiceAdventure1035", "choiceAdventure1036", "choiceAdventure1037", "choiceAdventure1038", "choiceAdventure1039", "choiceAdventure1040", "choiceAdventure1041", "choiceAdventure1042", "choiceAdventure1044", "choiceAdventure1045", "choiceAdventure1046", "choiceAdventure1048", "choiceAdventure1051", "choiceAdventure1052", "choiceAdventure1053", "choiceAdventure1054", "choiceAdventure1055", "choiceAdventure1056", "choiceAdventure1057", "choiceAdventure1059", "choiceAdventure1060", "choiceAdventure1061", "choiceAdventure1062", "choiceAdventure1065", "choiceAdventure1067", "choiceAdventure1068", "choiceAdventure1069", "choiceAdventure1070", "choiceAdventure1071", "choiceAdventure1073", "choiceAdventure1077", "choiceAdventure1080", "choiceAdventure1081", "choiceAdventure1082", "choiceAdventure1083", "choiceAdventure1084", "choiceAdventure1085", "choiceAdventure1091", "choiceAdventure1094", "choiceAdventure1095", "choiceAdventure1096", "choiceAdventure1097", "choiceAdventure1102", "choiceAdventure1106", "choiceAdventure1107", "choiceAdventure1108", "choiceAdventure1110", "choiceAdventure1114", "choiceAdventure1115", "choiceAdventure1116", "choiceAdventure1118", "choiceAdventure1119", "choiceAdventure1120", "choiceAdventure1121", "choiceAdventure1122", "choiceAdventure1123", "choiceAdventure1171", "choiceAdventure1172", "choiceAdventure1173", "choiceAdventure1174", "choiceAdventure1175", "choiceAdventure1193", "choiceAdventure1195", "choiceAdventure1196", "choiceAdventure1197", "choiceAdventure1198", "choiceAdventure1199", "choiceAdventure1202", "choiceAdventure1203", "choiceAdventure1204", "choiceAdventure1205", "choiceAdventure1206", "choiceAdventure1207", "choiceAdventure1208", "choiceAdventure1209", "choiceAdventure1210", "choiceAdventure1211", "choiceAdventure1212", "choiceAdventure1213", "choiceAdventure1214", "choiceAdventure1215", "choiceAdventure1219", "choiceAdventure1222", "choiceAdventure1223", "choiceAdventure1224", "choiceAdventure1225", "choiceAdventure1226", "choiceAdventure1227", "choiceAdventure1228", "choiceAdventure1229", "choiceAdventure1236", "choiceAdventure1237", "choiceAdventure1238", "choiceAdventure1239", "choiceAdventure1240", "choiceAdventure1241", "choiceAdventure1242", "choiceAdventure1243", "choiceAdventure1244", "choiceAdventure1245", "choiceAdventure1246", "choiceAdventure1247", "choiceAdventure1248", "choiceAdventure1249", "choiceAdventure1250", "choiceAdventure1251", "choiceAdventure1252", "choiceAdventure1253", "choiceAdventure1254", "choiceAdventure1255", "choiceAdventure1256", "choiceAdventure1266", "choiceAdventure1280", "choiceAdventure1281", "choiceAdventure1282", "choiceAdventure1283", "choiceAdventure1284", "choiceAdventure1285", "choiceAdventure1286", "choiceAdventure1287", "choiceAdventure1288", "choiceAdventure1289", "choiceAdventure1290", "choiceAdventure1291", "choiceAdventure1292", "choiceAdventure1293", "choiceAdventure1294", "choiceAdventure1295", "choiceAdventure1296", "choiceAdventure1297", "choiceAdventure1298", "choiceAdventure1299", "choiceAdventure1300", "choiceAdventure1301", "choiceAdventure1302", "choiceAdventure1303", "choiceAdventure1304", "choiceAdventure1305", "choiceAdventure1307", "choiceAdventure1310", "choiceAdventure1312", "choiceAdventure1313", "choiceAdventure1314", "choiceAdventure1315", "choiceAdventure1316", "choiceAdventure1317", "choiceAdventure1318", "choiceAdventure1319", "choiceAdventure1321", "choiceAdventure1322", "choiceAdventure1323", "choiceAdventure1324", "choiceAdventure1325", "choiceAdventure1326", "choiceAdventure1327", "choiceAdventure1328", "choiceAdventure1332", "choiceAdventure1333", "choiceAdventure1335", "choiceAdventure1340", "choiceAdventure1341", "choiceAdventure1345", "choiceAdventure1389", "choiceAdventure1392", "choiceAdventure1397", "choiceAdventure1399", "choiceAdventure1405", "choiceAdventure1411", "choiceAdventure1415", "choiceAdventure1427", "choiceAdventure1428", "choiceAdventure1429", "choiceAdventure1430", "choiceAdventure1431", "choiceAdventure1432", "choiceAdventure1433", "choiceAdventure1434", "choiceAdventure1436", "choiceAdventure1460", "choiceAdventure1461", "choiceAdventure1467", "choiceAdventure1468", "choiceAdventure1469", "choiceAdventure1470", "choiceAdventure1471", "choiceAdventure1472", "choiceAdventure1473", "choiceAdventure1474", "choiceAdventure1475"];
var familiarProperties = ["commaFamiliar", "nextQuantumFamiliar", "preBlackbirdFamiliar"];
var statProperties = ["nsChallenge1", "snojoSetting"];
var phylumProperties = ["dnaSyringe", "locketPhylum", "redSnapperPhylum"];
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTyping.js

var booleanPropertiesSet = new Set(booleanProperties);
var numericPropertiesSet = new Set(numericProperties);
var numericOrStringPropertiesSet = new Set(numericOrStringProperties);
var stringPropertiesSet = new Set(stringProperties);
var locationPropertiesSet = new Set(locationProperties);
var monsterPropertiesSet = new Set(monsterProperties);
var familiarPropertiesSet = new Set(familiarProperties);
var statPropertiesSet = new Set(statProperties);
var phylumPropertiesSet = new Set(phylumProperties);
function isBooleanProperty(property) {
  return booleanPropertiesSet.has(property);
}
function isNumericProperty(property) {
  return numericPropertiesSet.has(property);
}
function isNumericOrStringProperty(property) {
  return numericOrStringPropertiesSet.has(property);
}
function isStringProperty(property) {
  return stringPropertiesSet.has(property);
}
function isLocationProperty(property) {
  return locationPropertiesSet.has(property);
}
function isMonsterProperty(property) {
  return monsterPropertiesSet.has(property);
}
function isFamiliarProperty(property) {
  return familiarPropertiesSet.has(property);
}
function isStatProperty(property) {
  return statPropertiesSet.has(property);
}
function isPhylumProperty(property) {
  return phylumPropertiesSet.has(property);
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/property.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var createPropertyGetter = transform => (property, default_) => {
  var value = (0,external_kolmafia_.getProperty)(property);

  if (default_ !== undefined && value === "") {
    return default_;
  }

  return transform(value, property);
};

var createMafiaClassPropertyGetter = (Type, toType) => createPropertyGetter(value => {
  if (value === "") return null;
  var v = toType(value);
  return v === Type.get("none") ? null : v;
});

var getString = createPropertyGetter(value => value);
var getCommaSeparated = createPropertyGetter(value => value.split(/, ?/));
var getBoolean = createPropertyGetter(value => value === "true");
var getNumber = createPropertyGetter(value => Number(value));
var getBounty = createMafiaClassPropertyGetter(external_kolmafia_.Bounty, external_kolmafia_.toBounty);
var getClass = createMafiaClassPropertyGetter(external_kolmafia_.Class, external_kolmafia_.toClass);
var getCoinmaster = createMafiaClassPropertyGetter(external_kolmafia_.Coinmaster, external_kolmafia_.toCoinmaster);
var getEffect = createMafiaClassPropertyGetter(external_kolmafia_.Effect, external_kolmafia_.toEffect);
var getElement = createMafiaClassPropertyGetter(external_kolmafia_.Element, external_kolmafia_.toElement);
var getFamiliar = createMafiaClassPropertyGetter(external_kolmafia_.Familiar, external_kolmafia_.toFamiliar);
var getItem = createMafiaClassPropertyGetter(external_kolmafia_.Item, external_kolmafia_.toItem);
var getLocation = createMafiaClassPropertyGetter(external_kolmafia_.Location, external_kolmafia_.toLocation);
var getMonster = createMafiaClassPropertyGetter(external_kolmafia_.Monster, external_kolmafia_.toMonster);
var getPhylum = createMafiaClassPropertyGetter(external_kolmafia_.Phylum, external_kolmafia_.toPhylum);
var getServant = createMafiaClassPropertyGetter(external_kolmafia_.Servant, external_kolmafia_.toServant);
var getSkill = createMafiaClassPropertyGetter(external_kolmafia_.Skill, external_kolmafia_.toSkill);
var getSlot = createMafiaClassPropertyGetter(external_kolmafia_.Slot, external_kolmafia_.toSlot);
var getStat = createMafiaClassPropertyGetter(external_kolmafia_.Stat, external_kolmafia_.toStat);
var getThrall = createMafiaClassPropertyGetter(external_kolmafia_.Thrall, external_kolmafia_.toThrall);
function get(property, _default) {
  var value = getString(property); // Handle known properties.

  if (isBooleanProperty(property)) {
    var _getBoolean;

    return (_getBoolean = getBoolean(property, _default)) !== null && _getBoolean !== void 0 ? _getBoolean : false;
  } else if (isNumericProperty(property)) {
    var _getNumber;

    return (_getNumber = getNumber(property, _default)) !== null && _getNumber !== void 0 ? _getNumber : 0;
  } else if (isNumericOrStringProperty(property)) {
    return value.match(/^\d+$/) ? parseInt(value) : value;
  } else if (isLocationProperty(property)) {
    return getLocation(property, _default);
  } else if (isMonsterProperty(property)) {
    return getMonster(property, _default);
  } else if (isFamiliarProperty(property)) {
    return getFamiliar(property, _default);
  } else if (isStatProperty(property)) {
    return getStat(property, _default);
  } else if (isPhylumProperty(property)) {
    return getPhylum(property, _default);
  } else if (isStringProperty(property)) {
    return value;
  } // Not a KnownProperty from here on out.


  if (_default instanceof external_kolmafia_.Location) {
    return getLocation(property, _default);
  } else if (_default instanceof external_kolmafia_.Monster) {
    return getMonster(property, _default);
  } else if (_default instanceof external_kolmafia_.Familiar) {
    return getFamiliar(property, _default);
  } else if (_default instanceof external_kolmafia_.Stat) {
    return getStat(property, _default);
  } else if (_default instanceof external_kolmafia_.Phylum) {
    return getPhylum(property, _default);
  } else if (typeof _default === "boolean") {
    return value === "true" ? true : value === "false" ? false : _default;
  } else if (typeof _default === "number") {
    return value === "" ? _default : parseInt(value);
  } else if (value === "") {
    return _default === undefined ? "" : _default;
  } else {
    return value;
  }
} // eslint-disable-next-line @typescript-eslint/no-explicit-any

function _set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0,external_kolmafia_.setProperty)(property, stringValue);
}


function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        prop = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    _set(prop, value);
  }
}
function withProperties(properties, callback) {
  var propertiesBackup = Object.fromEntries(Object.entries(properties).map(_ref => {
    var _ref2 = _slicedToArray(_ref, 1),
        prop = _ref2[0];

    return [prop, get(prop)];
  }));
  setProperties(properties);

  try {
    callback();
  } finally {
    setProperties(propertiesBackup);
  }
}
function withProperty(property, value, callback) {
  withProperties(_defineProperty({}, property, value), callback);
}
function withChoices(choices, callback) {
  var properties = Object.fromEntries(Object.entries(choices).map(_ref3 => {
    var _ref4 = _slicedToArray(_ref3, 2),
        choice = _ref4[0],
        option = _ref4[1];

    return ["choiceAdventure".concat(choice), option];
  }));
  withProperties(properties, callback);
}
function withChoice(choice, value, callback) {
  withChoices(_defineProperty({}, choice, value), callback);
}
var PropertiesManager = /*#__PURE__*/function () {
  function PropertiesManager() {
    _classCallCheck(this, PropertiesManager);

    _defineProperty(this, "properties", {});
  }

  _createClass(PropertiesManager, [{
    key: "storedValues",
    get: function get() {
      return this.properties;
    }
    /**
     * Sets a collection of properties to the given values, storing the old values.
     * @param propertiesToSet A Properties object, keyed by property name.
     */

  }, {
    key: "set",
    value: function set(propertiesToSet) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(propertiesToSet); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            propertyName = _Object$entries2$_i[0],
            propertyValue = _Object$entries2$_i[1];

        if (this.properties[propertyName] === undefined) {
          this.properties[propertyName] = get(propertyName);
        }

        _set(propertyName, propertyValue);
      }
    }
    /**
     * Sets a collection of choice adventure properties to the given values, storing the old values.
     * @param choicesToSet An object keyed by choice adventure number.
     */

  }, {
    key: "setChoices",
    value: function setChoices(choicesToSet) {
      this.set(Object.fromEntries(Object.entries(choicesToSet).map(_ref5 => {
        var _ref6 = _slicedToArray(_ref5, 2),
            choiceNumber = _ref6[0],
            choiceValue = _ref6[1];

        return ["choiceAdventure".concat(choiceNumber), choiceValue];
      })));
    }
    /**
     * Sets a single choice adventure property to the given value, storing the old value.
     * @param choiceToSet The number of the choice adventure to set the property for.
     * @param value The value to assign to that choice adventure.
     */

  }, {
    key: "setChoice",
    value: function setChoice(choiceToSet, value) {
      this.setChoices(_defineProperty({}, choiceToSet, value));
    }
    /**
     * Resets the given properties to their original stored value. Does not delete entries from the manager.
     * @param properties Collection of properties to reset.
     */

  }, {
    key: "reset",
    value: function reset() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
        properties[_key] = arguments[_key];
      }

      for (var _i3 = 0, _properties = properties; _i3 < _properties.length; _i3++) {
        var property = _properties[_i3];
        var value = this.properties[property];

        if (value) {
          _set(property, value);
        }
      }
    }
    /**
     * Iterates over all stored values, setting each property back to its original stored value. Does not delete entries from the manager.
     */

  }, {
    key: "resetAll",
    value: function resetAll() {
      setProperties(this.properties);
    }
    /**
     * Stops storing the original values of inputted properties.
     * @param properties Properties for the manager to forget.
     */

  }, {
    key: "clear",
    value: function clear() {
      for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        properties[_key2] = arguments[_key2];
      }

      for (var _i4 = 0, _properties2 = properties; _i4 < _properties2.length; _i4++) {
        var property = _properties2[_i4];

        if (this.properties[property]) {
          delete this.properties[property];
        }
      }
    }
    /**
     * Clears all properties.
     */

  }, {
    key: "clearAll",
    value: function clearAll() {
      this.properties = {};
    }
    /**
     * Increases a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially raise.
     * @param value The minimum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMinimumValue",
    value: function setMinimumValue(property, value) {
      if (get(property, 0) < value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Decrease a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially lower.
     * @param value The maximum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMaximumValue",
    value: function setMaximumValue(property, value) {
      if (get(property, 0) > value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Creates a new PropertiesManager with identical stored values to this one.
     * @returns A new PropertiesManager, with identical stored values to this one.
     */

  }, {
    key: "clone",
    value: function clone() {
      var newGuy = new PropertiesManager();
      newGuy.properties = this.storedValues;
      return newGuy;
    }
    /**
     * Clamps a numeric property, modulating it up or down to fit within a specified range
     * @param property The numeric property to clamp
     * @param min The lower bound for what we want the property to be allowed to be.
     * @param max The upper bound for what we want the property to be allowed to be.
     * @returns Whether we ended up changing the property or not.
     */

  }, {
    key: "clamp",
    value: function clamp(property, min, max) {
      if (max < min) return false;
      var start = get(property);
      this.setMinimumValue(property, min);
      this.setMaximumValue(property, max);
      return start !== get(property);
    }
    /**
     * Determines whether this PropertiesManager has identical stored values to another.
     * @param other The PropertiesManager to compare to this one.
     * @returns Whether their StoredValues are identical.
     */

  }, {
    key: "equals",
    value: function equals(other) {
      var thisProps = Object.entries(this.storedValues);
      var otherProps = new Map(Object.entries(other.storedValues));
      if (thisProps.length !== otherProps.size) return false;

      for (var _i5 = 0, _thisProps = thisProps; _i5 < _thisProps.length; _i5++) {
        var _thisProps$_i = _slicedToArray(_thisProps[_i5], 2),
            propertyName = _thisProps$_i[0],
            propertyValue = _thisProps$_i[1];

        if (otherProps.get(propertyName) === propertyValue) return false;
      }

      return true;
    }
    /**
     * Merges a PropertiesManager onto this one, letting the input win in the event that both PropertiesManagers have a value stored.
     * @param other The PropertiesManager to be merged onto this one.
     * @returns A new PropertiesManager with stored values from both its parents.
     */

  }, {
    key: "merge",
    value: function merge(other) {
      var newGuy = new PropertiesManager();
      newGuy.properties = _objectSpread(_objectSpread({}, this.properties), other.properties);
      return newGuy;
    }
    /**
     * Merges an arbitrary collection of PropertiesManagers, letting the rightmost PropertiesManager win in the event of verlap.
     * @param mergees The PropertiesManagers to merge together.
     * @returns A PropertiesManager that is just an amalgam of all the constituents.
     */

  }], [{
    key: "merge",
    value: function merge() {
      for (var _len3 = arguments.length, mergees = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        mergees[_key3] = arguments[_key3];
      }

      if (mergees.length === 0) return new PropertiesManager();
      return mergees.reduce((a, b) => a.merge(b));
    }
  }]);

  return PropertiesManager;
}();

/***/ }),

/***/ 7975:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lf": () => (/* binding */ have),
/* harmony export */   "Aq": () => (/* binding */ paintingMonster),
/* harmony export */   "L0": () => (/* binding */ paintingFought),
/* harmony export */   "OV": () => (/* binding */ fightPainting)
/* harmony export */ });
/* unused harmony exports desks, ceilings, nightstands, getDesk, getCeiling, getNightstand, changeDesk, changeCeiling, changeNightstand */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2474);


function have() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_1__/* .get */ .U2)("chateauAvailable");
}
function paintingMonster() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_1__/* .get */ .U2)("chateauMonster");
}
function paintingFought() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_1__/* .get */ .U2)("_chateauMonsterFought");
}
function fightPainting() {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("place.php?whichplace=chateau&action=chateau_painting", false);
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
}
var desks = (/* unused pure expression or super */ null && (["fancy stationery set", "Swiss piggy bank", "continental juice bar"]));
var ceilings = (/* unused pure expression or super */ null && (["antler chandelier", "ceiling fan", "artificial skylight"]));
var nightstands = (/* unused pure expression or super */ null && (["foreign language tapes", "bowl of potpourri", "electric muscle stimulator"]));
function getDesk() {
  var _desks$find;

  return (_desks$find = desks.find(desk => Object.keys(getChateau()).includes(desk))) !== null && _desks$find !== void 0 ? _desks$find : null;
}
function getCeiling() {
  var _ceilings$find;

  return (_ceilings$find = ceilings.find(ceiling => Object.keys(getChateau()).includes(ceiling))) !== null && _ceilings$find !== void 0 ? _ceilings$find : null;
}
function getNightstand() {
  var _nightstands$find;

  return (_nightstands$find = nightstands.find(nightstand => Object.keys(getChateau()).includes(nightstand))) !== null && _nightstands$find !== void 0 ? _nightstands$find : null;
}
function changeDesk(desk) {
  if (getDesk() === desk) return true;
  if (!desks.includes(desk)) return false;
  buy(Item.get(desk));
  return getDesk() === desk;
}
function changeCeiling(ceiling) {
  if (getCeiling() === ceiling) return true;
  if (!ceilings.includes(ceiling)) return false;
  buy(Item.get(ceiling));
  return getCeiling() === ceiling;
}
function changeNightstand(nightstand) {
  if (getNightstand() === nightstand) return true;
  if (!nightstands.includes(nightstand)) return false;
  buy(Item.get(nightstand));
  return getNightstand() === nightstand;
}

/***/ }),

/***/ 9574:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DH": () => (/* binding */ Mayo)
/* harmony export */ });
/* unused harmony exports installed, have, setMayoMinder */
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2231);
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(678);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var Mayo = {
  nex: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Mayonex"]))),
  diol: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Mayodiol"]))),
  zapine: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Mayozapine"]))),
  flex: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Mayoflex"])))
};
function installed() {
  return getWorkshed() === $item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["portable Mayo Clinic"])));
}
function have() {
  return haveItem($item(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["portable Mayo Clinic"])))) || installed();
}
/**
 * Sets mayo minder to a particular mayo, and ensures you have enough of it.
 * @param mayo Mayo to use
 * @param quantity Quantity to ensure
 */

function setMayoMinder(mayo) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (getWorkshed() !== $item(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["portable Mayo Clinic"])))) return false;

  if (!Object.values(Mayo).includes(mayo)) {
    logger.error("Invalid mayo selected");
    return false;
  }

  if (get("mayoInMouth") && get("mayoInMouth") !== mayo.name) {
    logger.error("Currently have incorrect mayo in mouth");
    return false;
  }

  retrieveItem(quantity, mayo);
  if (!haveItem($item(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Mayo Minder\u2122"]))))) buy($item(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Mayo Minder\u2122"]))));

  if (get("mayoMinderSetting") !== mayo.name) {
    withChoice(1076, toInt(mayo) - 8260, () => use($item(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Mayo Minder\u2122"])))));
  }

  return get("mayoMinderSetting") === mayo.name;
}

/***/ }),

/***/ 1577:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lf": () => (/* binding */ have),
/* harmony export */   "SM": () => (/* binding */ getSkills),
/* harmony export */   "xj": () => (/* binding */ getDigitizeUses),
/* harmony export */   "Py": () => (/* binding */ getDigitizeMonster),
/* harmony export */   "A1": () => (/* binding */ getDigitizeMonsterCount),
/* harmony export */   "$O": () => (/* binding */ getMaximumDigitizeUses),
/* harmony export */   "VW": () => (/* binding */ getDigitizeUsesRemaining),
/* harmony export */   "SS": () => (/* binding */ canDigitize)
/* harmony export */ });
/* unused harmony exports item, Buffs, enhance, RolloverBuffs, enquiry, Skills, educate, isCurrentSkill, Items, extrude, getChips, couldDigitize, prepareDigitize, Digitize, getDuplicateUses, getEnhanceUses, getPortscanUses, maximumDuplicateUses, duplicateUsesRemaining, maximumEnhanceUses, enhanceUsesRemaining, enhanceBuffDuration, enquiryBuffDuration */
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2231);
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7120);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Copier__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2219);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3311);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2474);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(678);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var item = (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Source terminal"])));
function have() {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_4__/* .haveInCampground */ .sy)(item);
}
/**
 * Buffs that can be acquired from Enhance
 *
 * - Items: +30% Item Drop
 * - Meat: +60% Meat Drop
 * - Init: +50% Initiative
 * - Critical: +10% chance of Critical Hit, +10% chance of Spell Critical Hit
 * - Damage: +5 Prismatic Damage
 * - Substats: +3 Stats Per Fight
 */

var Buffs = {
  Items: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["items.enh"]))),
  Meat: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["meat.enh"]))),
  Init: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["init.enh"]))),
  Critical: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["critical.enh"]))),
  Damage: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["damage.enh"]))),
  Substats: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["substats.enh"])))
};
/**
 * Acquire a buff from the Source Terminal
 * @param buff The buff to acquire
 * @see Buffs
 */

function enhance(buff) {
  if (!Object.values(Buffs).includes(buff)) {
    return false;
  }

  return cliExecute("terminal enhance ".concat(buff.name));
}
/**
 * Rollover buffs that can be acquired from Enquiry
 */

var RolloverBuffs = {
  /** +5 Familiar Weight */
  Familiar: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["familiar.enq"]))),

  /** +25 ML */
  Monsters: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["monsters.enq"]))),

  /** +5 Prismatic Resistance */
  Protect: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["protect.enq"]))),

  /** +100% Muscle, +100% Mysticality, +100% Moxie */
  Stats: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["stats.enq"])))
};
/**
 * Acquire a buff from the Source Terminal
 * @param buff The buff to acquire
 * @see RolloverBuffs
 */

function enquiry(rolloverBuff) {
  if (!Object.values(RolloverBuffs).includes(rolloverBuff)) {
    return false;
  }

  return cliExecute("terminal enquiry ".concat(rolloverBuff.name));
}
/**
 * Skills that can be acquired from Enhance
 */

var Skills = {
  /** Collect Source essence from enemies once per combat */
  Extract: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Extract"]))),

  /** Stagger and create a wandering monster 1-3 times per day */
  Digitize: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Digitize"]))),

  /** Stagger and deal 25% of enemy HP in damage once per combat */
  Compress: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Compress"]))),

  /** Double monster's HP, attack, defence, attacks per round and item drops once per fight and once per day (five in The Source) */
  Duplicate: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Duplicate"]))),

  /** Causes government agent/Source Agent wanderer next turn once per combat and three times per day */
  Portscan: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Portscan"]))),

  /** Increase Max MP by 100% and recover 1000 MP once per combat with a 30 turn cooldown */
  Turbo: (0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Turbo"])))
};
/**
 * Make a skill available.
 * The Source Terminal can give the player access to two skills at any time
 * @param skill Skill to learn
 * @see Skills
 */

function educate(skills) {
  var skillsArray = Array.isArray(skills) ? skills.slice(0, 2) : [skills];
  if (lodash_isEqual__WEBPACK_IMPORTED_MODULE_2___default()(skillsArray, getSkills())) return true;

  var _iterator = _createForOfIteratorHelper(skillsArray),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var skill = _step.value;
      if (!Object.values(Skills).includes(skill)) return false;
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("terminal educate ".concat(skill.name.toLowerCase(), ".edu"));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
}
/**
 * Return the Skills currently available from Source Terminal
 */

function getSkills() {
  return ["sourceTerminalEducate1", "sourceTerminalEducate2"].map(p => (0,_property__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)(p)).filter(s => s !== "").map(s => kolmafia__WEBPACK_IMPORTED_MODULE_1__.Skill.get(s.slice(0, -4)));
}
function isCurrentSkill(skills) {
  var currentSkills = getSkills();
  var skillsArray = Array.isArray(skills) ? skills.slice(0, 2) : [skills];
  return skillsArray.every(skill => currentSkills.includes(skill));
}
/**
 * Items that can be generated by the Source Terminal
 */

var Items = new Map([[(0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["browser cookie"]))), "food.ext"], [(0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["hacked gibson"]))), "booze.ext"], [(0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["Source shades"]))), "goggles.ext"], [(0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["Source terminal GRAM chip"]))), "gram.ext"], [(0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["Source terminal PRAM chip"]))), "pram.ext"], [(0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Source terminal SPAM chip"]))), "spam.ext"], [(0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["Source terminal CRAM chip"]))), "cram.ext"], [(0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["Source terminal DRAM chip"]))), "dram.ext"], [(0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["Source terminal TRAM chip"]))), "tram.ext"], [(0,_template_string__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["software bug"]))), "familiar.ext"]]);
/**
 * Collect an item from the Source Terminal (up to three times a day)
 * @param item Item to collect
 * @see Items
 */

function extrude(item) {
  var fileName = Items.get(item);
  if (!fileName) return false;
  return cliExecute("terminal extrude ".concat(fileName));
}
/**
 * Return chips currently installed to player's Source Terminal
 */

function getChips() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("sourceTerminalChips").split(",");
}
/**
 * Return number of times digitize was cast today
 */

function getDigitizeUses() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("_sourceTerminalDigitizeUses");
}
/**
 * Return Monster that is currently digitized, else null
 */

function getDigitizeMonster() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("_sourceTerminalDigitizeMonster");
}
/**
 * Return number of digitized monsters encountered since it was last cast
 */

function getDigitizeMonsterCount() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("_sourceTerminalDigitizeMonsterCount");
}
/**
 * Return maximum number of digitizes player can cast
 */

function getMaximumDigitizeUses() {
  var chips = getChips();
  return 1 + (chips.includes("TRAM") ? 1 : 0) + (chips.includes("TRIGRAM") ? 1 : 0);
}
/**
 * Returns the current day's number of remaining digitize uses
 */

function getDigitizeUsesRemaining() {
  return getMaximumDigitizeUses() - getDigitizeUses();
}
/**
 * Returns whether the player could theoretically cast Digitize
 */

function couldDigitize() {
  return getDigitizeUses() < getMaximumDigitizeUses();
}
function prepareDigitize() {
  if (!isCurrentSkill(Skills.Digitize)) {
    return educate(Skills.Digitize);
  }

  return true;
}
/**
 * Returns whether the player can cast Digitize immediately
 * This only considers whether the player has learned the skill
 * and has sufficient daily casts remaining, not whether they have sufficient MP
 */

function canDigitize() {
  return couldDigitize() && getSkills().includes(Skills.Digitize);
}
var Digitize = new _Copier__WEBPACK_IMPORTED_MODULE_6__/* .Copier */ .D(() => couldDigitize(), () => prepareDigitize(), () => canDigitize(), () => getDigitizeMonster());
/**
 * Return number of times duplicate was cast today
 */

function getDuplicateUses() {
  return get("_sourceTerminalDuplicateUses");
}
/**
 * Return number of times enhance was cast today
 */

function getEnhanceUses() {
  return get("_sourceTerminalEnhanceUses");
}
/**
 * Return number of times portscan was cast today
 */

function getPortscanUses() {
  return get("_sourceTerminalPortscanUses");
}
/**
 * Returns maximum number of times duplicate can be used
 */

function maximumDuplicateUses() {
  return myPathId() === Paths.TheSource.id ? 5 : 1;
}
/**
 * Returns number of remaining times duplicate can be used today
 */

function duplicateUsesRemaining() {
  return maximumDuplicateUses() - getDuplicateUses();
}
/**
 * Return number of times enhance can be used per day
 */

function maximumEnhanceUses() {
  return 1 + getChips().filter(chip => ["CRAM", "SCRAM"].includes(chip)).length;
}
/**
 * Returns number of remaining times enahce can be used today
 */

function enhanceUsesRemaining() {
  return maximumEnhanceUses() - getEnhanceUses();
}
/**
 * Returns expected duration of an enhance buff
 */

function enhanceBuffDuration() {
  return 25 + get("sourceTerminalPram") * 5 + (getChips().includes("INGRAM") ? 25 : 0);
}
/**
 * Returns expected duration of an enquiry buff
 */

function enquiryBuffDuration() {
  return 50 + 10 * get("sourceTerminalGram") + (getChips().includes("DIAGRAM") ? 50 : 0);
}

/***/ }),

/***/ 7867:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bL": () => (/* binding */ installed),
/* harmony export */   "Vg": () => (/* binding */ fillTo),
/* harmony export */   "ji": () => (/* binding */ Driving),
/* harmony export */   "Ag": () => (/* binding */ drive)
/* harmony export */ });
/* unused harmony exports have, insertFuel, fillWithInventoryTo */
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2231);
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3311);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(678);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8588);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var PriceAge;

(function (PriceAge) {
  PriceAge[PriceAge["HISTORICAL"] = 0] = "HISTORICAL";
  PriceAge[PriceAge["RECENT"] = 1] = "RECENT";
  PriceAge[PriceAge["TODAY"] = 2] = "TODAY";
})(PriceAge || (PriceAge = {}));
/**
 * Returns whether or not we have the Asdon installed in the workshed at present.
 */


function installed() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getWorkshed)() === (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Asdon Martin keyfob"])));
}
/**
 * Returns true if we have the Asdon or if it's installed.
 */

function have() {
  return installed() || haveItem($item(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Asdon Martin keyfob"]))));
}
var fuelSkiplist = (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["cup of \"tea\", thermos of \"whiskey\", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of \"milk\""])));

function priceTooOld(item) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.historicalPrice)(item) === 0 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.historicalAge)(item) >= 7;
} // Return mall max if historicalPrice returns -1.


function historicalPriceOrMax(item) {
  var historical = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.historicalPrice)(item);
  return historical < 0 ? 999999999 : historical;
} // Return mall max if mallPrice returns -1.


function mallPriceOrMax(item) {
  var mall = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mallPrice)(item);
  return mall < 0 ? 999999999 : mall;
}

function price(item, priceAge) {
  switch (priceAge) {
    case PriceAge.HISTORICAL:
      {
        var historical = historicalPriceOrMax(item);
        return historical === 0 ? mallPriceOrMax(item) : historical;
      }

    case PriceAge.RECENT:
      return priceTooOld(item) ? mallPriceOrMax(item) : historicalPriceOrMax(item);

    case PriceAge.TODAY:
      return mallPriceOrMax(item);
  }
}

function inventoryItems() {
  return kolmafia__WEBPACK_IMPORTED_MODULE_1__.Item.all().filter(isFuelItem).filter(item => (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)(item) && [100, (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosellPrice)(item)].includes(price(item, PriceAge.RECENT)));
} // Efficiency in meat per fuel.


function calculateFuelUnitCost(it, targetUnits) {
  var priceAge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PriceAge.RECENT;
  var units = (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getAverageAdventures */ .N)(it);
  return price(it, priceAge) / Math.min(targetUnits, units);
}

function isFuelItem(it) {
  return !(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.isNpcItem)(it) && it.fullness + it.inebriety > 0 && (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getAverageAdventures */ .N)(it) > 0 && it.tradeable && it.discardable && !fuelSkiplist.includes(it);
}

function getBestFuel(targetUnits) {
  // Three stages.
  // 1. Filter to reasonable items using historical cost (within 5x of historical best).
  var allFuel = (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral([""]))).filter(isFuelItem);

  if (allFuel.filter(item => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.historicalPrice)(item) === 0).length > 100) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mallPrices)("food");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mallPrices)("booze");
  }

  var keyHistorical = item => calculateFuelUnitCost(item, targetUnits, PriceAge.HISTORICAL);

  allFuel.sort((x, y) => keyHistorical(x) - keyHistorical(y));
  var bestUnitCost = keyHistorical(allFuel[0]);
  var firstBadIndex = allFuel.findIndex(item => keyHistorical(item) > 5 * bestUnitCost);
  var potentialFuel = firstBadIndex > 0 ? allFuel.slice(0, firstBadIndex) : allFuel; // 2. Filter to top 10 candidates using prices at most a week old.

  if (potentialFuel.filter(item => priceTooOld(item)).length > 100) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mallPrices)("food");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mallPrices)("booze");
  }

  var key1 = item => -(0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getAverageAdventures */ .N)(item);

  var key2 = item => calculateFuelUnitCost(item, targetUnits, PriceAge.RECENT);

  potentialFuel.sort((x, y) => key1(x) - key1(y));
  potentialFuel.sort((x, y) => key2(x) - key2(y)); // 3. Find result using precise price for those top candidates.

  var candidates = potentialFuel.slice(0, 10);

  var key3 = item => calculateFuelUnitCost(item, targetUnits, PriceAge.TODAY);

  candidates.sort((x, y) => key3(x) - key3(y));

  if (calculateFuelUnitCost(candidates[0], targetUnits, PriceAge.TODAY) > 100) {
    throw new Error("Could not identify any fuel with efficiency better than 100 meat per fuel. " + "This means something went wrong.");
  }

  return candidates[0];
}
/**
 * Fuel your Asdon Martin with a given quantity of a given item
 * @param it Item to fuel with.
 * @param quantity Number of items to fuel with.
 * @returns Whether we succeeded at fueling with the given items.
 */


function insertFuel(it) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var result = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("campground.php?action=fuelconvertor&pwd&qty=".concat(quantity, "&iid=").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)(it), "&go=Convert%21"));
  return result.includes("The display updates with a");
}
/**
 * Fill your Asdon Martin to the given fuel level in the cheapest way possible
 * @param targetUnits Fuel level to attempt to reach.
 * @returns Whether we succeeded at filling to the target fuel level.
 */

function fillTo(targetUnits) {
  if (!installed()) return false;

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getFuel)() < targetUnits) {
    var remaining = targetUnits - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getFuel)(); // if in Hardcore/ronin, skip the price calculation and just use soda bread

    var fuel = void 0;
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.canInteract)()) fuel = getBestFuel(remaining);else fuel = (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["loaf of soda bread"])));
    var count = Math.ceil(targetUnits / (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getAverageAdventures */ .N)(fuel));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.retrieveItem)(count, fuel);

    if (!insertFuel(fuel, count)) {
      throw new Error("Failed to fuel Asdon Martin.");
    }
  }

  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getFuel)() >= targetUnits;
}

function fillWithBestInventoryItem(targetUnits) {
  var options = inventoryItems().sort((a, b) => (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getAverageAdventures */ .N)(b) / (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosellPrice)(b) - (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getAverageAdventures */ .N)(a) / (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosellPrice)(a));
  if (options.length === 0) return false;
  var best = options[0];
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosellPrice)(best) / (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getAverageAdventures */ .N)(best) > 100) return false;
  var amountToUse = (0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .clamp */ .uZ)(Math.ceil(targetUnits / (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getAverageAdventures */ .N)(best)), 0, (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)(best));
  return insertFuel(best, amountToUse);
}
/**
 * Fill your Asdon Martin by prioritizing mallmin items in your inventory. Default to the behavior of fillTo.
 * @param targetUnits Fuel level to attempt to reach.
 * @returns Whether we succeeded at filling to the target fuel level.
 */


function fillWithInventoryTo(targetUnits) {
  if (!installed()) return false;
  var continueFuelingFromInventory = true;

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getFuel)() < targetUnits && continueFuelingFromInventory) {
    continueFuelingFromInventory && (continueFuelingFromInventory = fillWithBestInventoryItem(targetUnits));
  }

  return fillTo(targetUnits);
}
/**
 * Object consisting of the various Asdon driving styles
 */

var Driving = {
  Obnoxiously: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$effect */ ._G)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Driving Obnoxiously"]))),
  Stealthily: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$effect */ ._G)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Driving Stealthily"]))),
  Wastefully: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$effect */ ._G)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Driving Wastefully"]))),
  Safely: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$effect */ ._G)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Driving Safely"]))),
  Recklessly: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$effect */ ._G)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Driving Recklessly"]))),
  Intimidatingly: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$effect */ ._G)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Driving Intimidatingly"]))),
  Quickly: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$effect */ ._G)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Driving Quickly"]))),
  Observantly: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$effect */ ._G)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Driving Observantly"]))),
  Waterproofly: (0,_template_string__WEBPACK_IMPORTED_MODULE_2__/* .$effect */ ._G)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Driving Waterproofly"])))
};
/**
 * Attempt to drive with a particular style for a particular number of turns.
 * @param style The driving style to use.
 * @param turns The number of turns to attempt to get.
 * @param preferInventory Whether we should preferentially value items currently in our inventory.
 * @returns Whether we have at least as many turns as requested of said driving style.
 */

function drive(style) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var preferInventory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!Object.values(Driving).includes(style)) return false;
  if (!installed()) return false;
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(style) >= turns) return true;
  var fuelNeeded = 37 * Math.ceil((turns - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(style)) / 30);
  (preferInventory ? fillWithInventoryTo : fillTo)(fuelNeeded);

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getFuel)() >= 37 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(style) < turns) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("asdonmartin drive ".concat(style.name.replace("Driving ", "")));
  }

  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(style) >= turns;
}

/***/ }),

/***/ 2211:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lf": () => (/* binding */ have),
/* harmony export */   "K_": () => (/* binding */ song),
/* harmony export */   "ib": () => (/* binding */ songChangesLeft)
/* harmony export */ });
/* unused harmony exports item, songBoomSongs, setSong, dropProgress */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3311);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2474);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(678);
var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var item = (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject || (_templateObject = _taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])));
function have() {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_2__/* .have */ .lf)(item);
}
var keywords = {
  "Eye of the Giger": "spooky",
  "Food Vibrations": "food",
  "Remainin' Alive": "dr",
  "These Fists Were Made for Punchin'": "damage",
  "Total Eclipse of Your Meat": "meat"
};
var songBoomSongs = new Set(Object.keys(keywords));
/**
 * Current song.
 */

function song() {
  var stored = (0,_property__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("boomBoxSong");
  return songBoomSongs.has(stored) ? stored : null;
}
/**
 * Song changes left today.
 */

function songChangesLeft() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("_boomBoxSongsLeft");
}
/**
 * Change the song.
 * @param newSong Song to change to.
 */

function setSong(newSong) {
  if (song() !== newSong) {
    if (songChangesLeft() === 0) throw new Error("Out of song changes!");
    cliExecute("boombox ".concat(newSong ? keywords[newSong] : "none"));
    return true;
  } else {
    return false;
  }
}
/**
 * Progress to next song drop (e.g. gathered meat-clip).
 */

function dropProgress() {
  return get("_boomBoxFights");
}

/***/ }),

/***/ 7329:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DF": () => (/* binding */ ponder)
/* harmony export */ });
/* unused harmony exports orb, have */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3311);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2474);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var orb = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.get("miniature crystal ball");
function have() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(orb) > 0;
}

var parsedProp = () => (0,_property__WEBPACK_IMPORTED_MODULE_1__/* .get */ .U2)("crystalBallPredictions").split("|").map(element => element.split(":")).map(_ref => {
  var _ref2 = _slicedToArray(_ref, 3),
      location = _ref2[1],
      monster = _ref2[2];

  return [(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toLocation)(location), (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toMonster)(monster)];
});
/**
 * Ponders your orb (if it is able to do so safely) and then returns a Map keyed by location consisting of extant predictions
 * @returns A map of all predictions currently active in an adventurer's miniature crystal ball, after visiting the "ponder" URL to refresh them.
 */


function ponder() {
  if (!have()) return new Map();
  if ((0,_lib__WEBPACK_IMPORTED_MODULE_2__/* .canVisitUrl */ .Ao)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("inventory.php?ponder=1", false);
  return new Map(parsedProp());
}

/***/ }),

/***/ 4866:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lk": () => (/* binding */ availableLocketMonsters),
/* harmony export */   "HZ": () => (/* binding */ reminisce)
/* harmony export */ });
/* unused harmony exports locket, have, unlockedLocketMonsters, reminiscesLeft, monstersReminisced, findMonster */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3311);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2474);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(678);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8588);
var _templateObject;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





 // eslint-disable-next-line libram/verify-constants

var locket = (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$item */ .xr)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Combat Lover's Locket"])));
function have() {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_2__/* .have */ .lf)(locket);
}
/**
 * Filters the set of all unlocked locket monsters to only the ones available to be locketed right now.
 * @returns An array consisting of all Monsters you can fight with your locket right now.
 */

function availableLocketMonsters() {
  if (reminiscesLeft() === 0) return [];
  return Object.entries((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getLocketMonsters)()).filter(_ref => {
    var _ref2 = _slicedToArray(_ref, 2),
        unused = _ref2[1];

    return unused;
  }).map(_ref3 => {
    var _ref4 = _slicedToArray(_ref3, 1),
        name = _ref4[0];

    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toMonster)(name);
  });
}
/**
 * Parses getLocketMonsters and returns the collection of all Monsters as an Array.
 * @returns An array consisting of all Monsters you can hypothetically fight, regardless of whether they've been fought today.
 */

function unlockedLocketMonsters() {
  return Object.entries(getLocketMonsters()).map(_ref5 => {
    var _ref6 = _slicedToArray(_ref5, 1),
        name = _ref6[0];

    return toMonster(name);
  });
}

function parseLocketProperty() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("_locketMonstersFought").split(",").filter(id => id.trim().length > 0);
}
/**
 * Determines how many reminisces remain by parsing the _locketMonstersFought property.
 * @returns The number of reminisces a player has available; 0 if they lack the Locket.
 */


function reminiscesLeft() {
  return have() ? (0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .clamp */ .uZ)(3 - parseLocketProperty().length, 0, 3) : 0;
}
/**
 * Determines which monsters were reminisced today by parsing the _locketMonstersFought property.
 * @returns An array consisting of the Monsters reminisced today.
 */

function monstersReminisced() {
  return parseLocketProperty().map(id => (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toMonster)(id));
}
/**
 * Fight a Monster using the Combat Lover's Locket
 * @param monster The Monster to fight
 * @returns false if we are unable to reminisce about this monster. Else, returns whether, at the end of all things, we have reminisced about this monster.
 */

function reminisce(monster) {
  if (!have() || reminiscesLeft() === 0 || !(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getLocketMonsters)()[monster.name]) {
    return false;
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("reminisce ".concat(monster));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
  return monstersReminisced().includes(monster);
}
/**
 * This function efficiently evaluates all of an adventurer's possibly reminiscable monsters, placing them through a filtering criteria and evaluating them based on a passed function.
 * @param criteria A filtering function for delineating which monsters are "fair game" for the search, such as "is this monster free".
 * @param value A function for deciding which monsters are "better" than others.
 * @returns A singular monster that fulfills the criteria function and maximizes the value function.
 */

function findMonster(criteria) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => 1;
  if (!have() || reminiscesLeft() === 0) return null;
  var options = availableLocketMonsters().filter(criteria);
  if (!options.length) return null;
  return options.reduce((a, b) => value(a) > value(b) ? a : b);
}

/***/ }),

/***/ 678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_$": () => (/* binding */ $class),
/* harmony export */   "_G": () => (/* binding */ $effect),
/* harmony export */   "lh": () => (/* binding */ $effects),
/* harmony export */   "SS": () => (/* binding */ $element),
/* harmony export */   "HP": () => (/* binding */ $familiar),
/* harmony export */   "xr": () => (/* binding */ $item),
/* harmony export */   "vS": () => (/* binding */ $items),
/* harmony export */   "PG": () => (/* binding */ $location),
/* harmony export */   "xw": () => (/* binding */ $locations),
/* harmony export */   "O4": () => (/* binding */ $monster),
/* harmony export */   "fr": () => (/* binding */ $monsters),
/* harmony export */   "tm": () => (/* binding */ $skill),
/* harmony export */   "nx": () => (/* binding */ $skills),
/* harmony export */   "Jh": () => (/* binding */ $slot),
/* harmony export */   "ei": () => (/* binding */ $slots),
/* harmony export */   "Ri": () => (/* binding */ $stat),
/* harmony export */   "gw": () => (/* binding */ $stats),
/* harmony export */   "_0": () => (/* binding */ $thralls)
/* harmony export */ });
/* unused harmony exports $bounty, $bounties, $classes, $coinmaster, $coinmasters, $elements, $familiars, $phylum, $phyla, $servant, $servants, $thrall */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



function splitByCommasWithEscapes(str) {
  var returnValue = [];
  var ignoreNext = false;
  var currentString = "";

  var _iterator = _createForOfIteratorHelper(str.split("")),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var char = _step.value;

      if (char === "\\") {
        ignoreNext = true;
      } else {
        if (char == "," && !ignoreNext) {
          returnValue.push(currentString);
          currentString = "";
        } else {
          currentString += char;
        }

        ignoreNext = false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  returnValue.push(currentString.trim());
  return returnValue;
}

var concatTemplateString = function concatTemplateString(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    placeholders[_key - 1] = arguments[_key];
  }

  return literals.raw.reduce((acc, literal, i) => {
    var _placeholders$i;

    return acc + literal + ((_placeholders$i = placeholders[i]) !== null && _placeholders$i !== void 0 ? _placeholders$i : "");
  }, "");
};

var createSingleConstant = Type => function (literals) {
  for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    placeholders[_key2 - 1] = arguments[_key2];
  }

  var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
  return Type.get(input);
};

var createPluralConstant = Type => function (literals) {
  for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    placeholders[_key3 - 1] = arguments[_key3];
  }

  var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));

  if (input === "") {
    return Type.all();
  }

  return Type.get(splitByCommasWithEscapes(input));
};
/**
 * A Bounty specified by name.
 *
 * @category In-game constant
 */


var $bounty = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 *
 * @category In-game constant
 */

var $bounties = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Bounty);
/**
 * A Class specified by name.
 *
 * @category In-game constant
 */

var $class = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 *
 * @category In-game constant
 */

var $classes = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Class);
/**
 * A Coinmaster specified by name.
 *
 * @category In-game constant
 */

var $coinmaster = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 *
 * @category In-game constant
 */

var $coinmasters = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Coinmaster);
/**
 * An Effect specified by name.
 *
 * @category In-game constant
 */

var $effect = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 *
 * @category In-game constant
 */

var $effects = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Effect);
/**
 * An Element specified by name.
 *
 * @category In-game constant
 */

var $element = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 *
 * @category In-game constant
 */

var $elements = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Element);
/**
 * A Familiar specified by name.
 *
 * @category In-game constant
 */

var $familiar = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 *
 * @category In-game constant
 */

var $familiars = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Familiar);
/**
 * An Item specified by name.
 *
 * @category In-game constant
 */

var $item = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 *
 * @category In-game constant
 */

var $items = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item);
/**
 * A Location specified by name.
 *
 * @category In-game constant
 */

var $location = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 *
 * @category In-game constant
 */

var $locations = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Location);
/**
 * A Monster specified by name.
 *
 * @category In-game constant
 */

var $monster = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 *
 * @category In-game constant
 */

var $monsters = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Monster);
/**
 * A Phylum specified by name.
 *
 * @category In-game constant
 */

var $phylum = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 *
 * @category In-game constant
 */

var $phyla = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Phylum);
/**
 * A Servant specified by name.
 *
 * @category In-game constant
 */

var $servant = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 *
 * @category In-game constant
 */

var $servants = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Servant);
/**
 * A Skill specified by name.
 *
 * @category In-game constant
 */

var $skill = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 *
 * @category In-game constant
 */

var $skills = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Skill);
/**
 * A Slot specified by name.
 *
 * @category In-game constant
 */

var $slot = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 *
 * @category In-game constant
 */

var $slots = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Slot);
/**
 * A Stat specified by name.
 *
 * @category In-game constant
 */

var $stat = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 *
 * @category In-game constant
 */

var $stats = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Stat);
/**
 * A Thrall specified by name.
 *
 * @category In-game constant
 */

var $thrall = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 *
 * @category In-game constant
 */

var $thralls = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Thrall);

/***/ }),

/***/ 8588:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uZ": () => (/* binding */ clamp),
/* harmony export */   "Sm": () => (/* binding */ sum),
/* harmony export */   "JD": () => (/* binding */ sumNumbers),
/* harmony export */   "IA": () => (/* binding */ arrayContains),
/* harmony export */   "$x": () => (/* binding */ setEqual),
/* harmony export */   "Mp": () => (/* binding */ invertMap)
/* harmony export */ });
/* unused harmony exports notNull, parseNumber, chunk, arrayToCountedMap, countedMapToArray, countedMapToString, createStringUnionTypeGuardFunction */
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function notNull(value) {
  return value !== null;
}
function parseNumber(n) {
  return Number.parseInt(n.replace(/,/g, ""));
}
/**
 * Clamp a number between lower and upper bounds.
 *
 * @param n Number to clamp.
 * @param min Lower bound.
 * @param max Upper bound.
 */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
/**
 * Split an {@param array} into {@param chunkSize} sized chunks
 *
 * @param array Array to split
 * @param chunkSize Size of chunk
 */

function chunk(array, chunkSize) {
  var result = [];

  for (var i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
function arrayToCountedMap(array) {
  if (!Array.isArray(array)) return array;
  var map = new Map();
  array.forEach(item => {
    map.set(item, (map.get(item) || 0) + 1);
  });
  return map;
}
function countedMapToArray(map) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray(_toConsumableArray(map).map(_ref2 => {
    var _ref3 = _slicedToArray(_ref2, 2),
        item = _ref3[0],
        quantity = _ref3[1];

    return Array(quantity).fill(item);
  })));
}
function countedMapToString(map) {
  return _toConsumableArray(map).map(_ref4 => {
    var _ref5 = _slicedToArray(_ref4, 2),
        item = _ref5[0],
        quantity = _ref5[1];

    return "".concat(quantity, " x ").concat(item);
  }).join(", ");
}
/**
 * Sum an array of numbers.
 * @param addends Addends to sum.
 * @param mappingFunction function to turn elements into numbers
 */

function sum(addends, mappingFunction) {
  return addends.reduce((subtotal, element) => subtotal + mappingFunction(element), 0);
}
function sumNumbers(addends) {
  return sum(addends, x => x);
}
/**
 * Checks if a given item is in a readonly array, acting as a typeguard.
 * @param item Needle
 * @param array Readonly array haystack
 * @returns Whether the item is in the array, and narrows the type of the item.
 */

function arrayContains(item, array) {
  return array.includes(item);
}
/**
 * Checks if two arrays contain the same elements in the same quantity.
 * @param a First array for comparison
 * @param b Second array for comparison
 * @returns Whether the two arrays are equal, irrespective of order.
 */

function setEqual(a, b) {
  var sortedA = _toConsumableArray(a).sort();

  var sortedB = _toConsumableArray(b).sort();

  return a.length === b.length && sortedA.every((item, index) => item === sortedB[index]);
}
/**
 * Reverses keys and values for a given map
 * @param map Map to invert
 */

function invertMap(map) {
  var returnValue = new Map();

  var _iterator = _createForOfIteratorHelper(map),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      returnValue.set(value, key);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return returnValue;
}
/**
 * Creates a Type Guard function for a string union type defined via an array as const.
 */

function createStringUnionTypeGuardFunction(array) {
  return function (x) {
    return array.includes(x);
  };
}

/***/ }),

/***/ 9292:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(1646);

module.exports = parent;

/***/ }),

/***/ 8469:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9101);

__webpack_require__(8938);

var entryUnbind = __webpack_require__(7592);

module.exports = entryUnbind('Array', 'flat');

/***/ }),

/***/ 2580:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(9292);

module.exports = parent;

/***/ }),

/***/ 5618:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var isCallable = __webpack_require__(1438);

var tryToString = __webpack_require__(1881);

var TypeError = global.TypeError; // `Assert: IsCallable(argument) is true`

module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),

/***/ 7331:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(7457);

var create = __webpack_require__(5131);

var definePropertyModule = __webpack_require__(811);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
} // add a key to Array.prototype[@@unscopables]


module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),

/***/ 3739:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var isObject = __webpack_require__(2949);

var String = global.String;
var TypeError = global.TypeError; // `Assert: Type(argument) is Object`

module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};

/***/ }),

/***/ 477:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(6211);

var toAbsoluteIndex = __webpack_require__(8786);

var lengthOfArrayLike = __webpack_require__(1563); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ 5350:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var isArray = __webpack_require__(1746);

var isConstructor = __webpack_require__(3579);

var isObject = __webpack_require__(2949);

var wellKnownSymbol = __webpack_require__(7457);

var SPECIES = wellKnownSymbol('species');
var Array = global.Array; // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? Array : C;
};

/***/ }),

/***/ 586:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(5350); // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate


module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

/***/ }),

/***/ 6202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

/***/ }),

/***/ 5830:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var TO_STRING_TAG_SUPPORT = __webpack_require__(4657);

var isCallable = __webpack_require__(1438);

var classofRaw = __webpack_require__(6202);

var wellKnownSymbol = __webpack_require__(7457);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object; // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

/***/ }),

/***/ 3780:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(6957);

var ownKeys = __webpack_require__(6813);

var getOwnPropertyDescriptorModule = __webpack_require__(9609);

var definePropertyModule = __webpack_require__(811);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

/***/ }),

/***/ 4059:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var definePropertyModule = __webpack_require__(811);

var createPropertyDescriptor = __webpack_require__(3300);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ 3300:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ 812:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPropertyKey = __webpack_require__(1247);

var definePropertyModule = __webpack_require__(811);

var createPropertyDescriptor = __webpack_require__(3300);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),

/***/ 2171:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(8901); // Detect IE8's incomplete defineProperty implementation


module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function get() {
      return 7;
    }
  })[1] != 7;
});

/***/ }),

/***/ 4603:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var isObject = __webpack_require__(2949);

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ 5096:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(1575);

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),

/***/ 2912:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var userAgent = __webpack_require__(5096);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

/***/ }),

/***/ 7592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var uncurryThis = __webpack_require__(1824);

module.exports = function (CONSTRUCTOR, METHOD) {
  return uncurryThis(global[CONSTRUCTOR].prototype[METHOD]);
};

/***/ }),

/***/ 393:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ 9004:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var getOwnPropertyDescriptor = (__webpack_require__(9609).f);

var createNonEnumerableProperty = __webpack_require__(4059);

var redefine = __webpack_require__(6486);

var setGlobal = __webpack_require__(3351);

var copyConstructorProperties = __webpack_require__(3780);

var isForced = __webpack_require__(2612);
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ 8901:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ 8529:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var global = __webpack_require__(2328);

var isArray = __webpack_require__(1746);

var lengthOfArrayLike = __webpack_require__(1563);

var bind = __webpack_require__(1871);

var TypeError = global.TypeError; // `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray

var flattenIntoArray = function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg) : false;
  var element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

module.exports = flattenIntoArray;

/***/ }),

/***/ 1871:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var aCallable = __webpack_require__(5618);

var NATIVE_BIND = __webpack_require__(708);

var bind = uncurryThis(uncurryThis.bind); // optional / simple context binding

module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function
    /* ...args */
  () {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 708:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(8901);

module.exports = !fails(function () {
  var test = function () {
    /* empty */
  }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

/***/ }),

/***/ 8435:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(708);

var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

/***/ }),

/***/ 9411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var hasOwn = __webpack_require__(6957);

var FunctionPrototype = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

/***/ }),

/***/ 1824:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(708);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);
module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};

/***/ }),

/***/ 1575:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var isCallable = __webpack_require__(1438);

var aFunction = function aFunction(argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),

/***/ 1072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(5830);

var getMethod = __webpack_require__(2670);

var Iterators = __webpack_require__(9759);

var wellKnownSymbol = __webpack_require__(7457);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};

/***/ }),

/***/ 8134:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var call = __webpack_require__(8435);

var aCallable = __webpack_require__(5618);

var anObject = __webpack_require__(3739);

var tryToString = __webpack_require__(1881);

var getIteratorMethod = __webpack_require__(1072);

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};

/***/ }),

/***/ 2670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(5618); // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod


module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

/***/ }),

/***/ 2328:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

/***/ }),

/***/ 6957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var toObject = __webpack_require__(6068);

var hasOwnProperty = uncurryThis({}.hasOwnProperty); // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

/***/ }),

/***/ 1055:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 4861:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(1575);

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),

/***/ 2674:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var fails = __webpack_require__(8901);

var createElement = __webpack_require__(4603); // Thanks to IE8 for its funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ 8483:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var uncurryThis = __webpack_require__(1824);

var fails = __webpack_require__(8901);

var classof = __webpack_require__(6202);

var Object = global.Object;
var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;

/***/ }),

/***/ 7599:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var isCallable = __webpack_require__(1438);

var store = __webpack_require__(5153);

var functionToString = uncurryThis(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

/***/ }),

/***/ 4081:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(1770);

var global = __webpack_require__(2328);

var uncurryThis = __webpack_require__(1824);

var isObject = __webpack_require__(2949);

var createNonEnumerableProperty = __webpack_require__(4059);

var hasOwn = __webpack_require__(6957);

var shared = __webpack_require__(5153);

var sharedKey = __webpack_require__(1449);

var hiddenKeys = __webpack_require__(1055);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);

  set = function set(it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget(store, it) || {};
  };

  has = function has(it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };

  has = function has(it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ 8110:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(7457);

var Iterators = __webpack_require__(9759);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),

/***/ 1746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(6202); // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe


module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};

/***/ }),

/***/ 1438:
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};

/***/ }),

/***/ 3579:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var fails = __webpack_require__(8901);

var isCallable = __webpack_require__(1438);

var classof = __webpack_require__(5830);

var getBuiltIn = __webpack_require__(1575);

var inspectSource = __webpack_require__(7599);

var noop = function noop() {
  /* empty */
};

var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }

  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;

/***/ }),

/***/ 2612:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(8901);

var isCallable = __webpack_require__(1438);

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ 2949:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(1438);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

/***/ }),

/***/ 6719:
/***/ ((module) => {

module.exports = false;

/***/ }),

/***/ 5634:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var getBuiltIn = __webpack_require__(1575);

var isCallable = __webpack_require__(1438);

var isPrototypeOf = __webpack_require__(3547);

var USE_SYMBOL_AS_UID = __webpack_require__(4719);

var Object = global.Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};

/***/ }),

/***/ 6449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var bind = __webpack_require__(1871);

var call = __webpack_require__(8435);

var anObject = __webpack_require__(3739);

var tryToString = __webpack_require__(1881);

var isArrayIteratorMethod = __webpack_require__(8110);

var lengthOfArrayLike = __webpack_require__(1563);

var isPrototypeOf = __webpack_require__(3547);

var getIterator = __webpack_require__(8134);

var getIteratorMethod = __webpack_require__(1072);

var iteratorClose = __webpack_require__(6535);

var TypeError = global.TypeError;

var Result = function Result(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function stop(condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function callFn(value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      }

      return new Result(false);
    }

    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;

  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }

    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  }

  return new Result(false);
};

/***/ }),

/***/ 6535:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8435);

var anObject = __webpack_require__(3739);

var getMethod = __webpack_require__(2670);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);

  try {
    innerResult = getMethod(iterator, 'return');

    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }

    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }

  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

/***/ }),

/***/ 9759:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 1563:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(588); // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike


module.exports = function (obj) {
  return toLength(obj.length);
};

/***/ }),

/***/ 4938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(2912);

var fails = __webpack_require__(8901); // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing


module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),

/***/ 1770:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var isCallable = __webpack_require__(1438);

var inspectSource = __webpack_require__(7599);

var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));

/***/ }),

/***/ 5131:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(3739);

var definePropertiesModule = __webpack_require__(422);

var enumBugKeys = __webpack_require__(393);

var hiddenKeys = __webpack_require__(1055);

var html = __webpack_require__(4861);

var documentCreateElement = __webpack_require__(4603);

var sharedKey = __webpack_require__(1449);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function EmptyConstructor() {
  /* empty */
};

var scriptTag = function scriptTag(content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var _NullProtoObject = function NullProtoObject() {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

  var length = enumBugKeys.length;

  while (length--) {
    delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  }

  return _NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = _NullProtoObject();

  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

/***/ }),

/***/ 422:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(882);

var definePropertyModule = __webpack_require__(811);

var anObject = __webpack_require__(3739);

var toIndexedObject = __webpack_require__(6211);

var objectKeys = __webpack_require__(669); // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe


exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) {
    definePropertyModule.f(O, key = keys[index++], props[key]);
  }

  return O;
};

/***/ }),

/***/ 811:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var DESCRIPTORS = __webpack_require__(2171);

var IE8_DOM_DEFINE = __webpack_require__(2674);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(882);

var anObject = __webpack_require__(3739);

var toPropertyKey = __webpack_require__(1247);

var TypeError = global.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 9609:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var call = __webpack_require__(8435);

var propertyIsEnumerableModule = __webpack_require__(7395);

var createPropertyDescriptor = __webpack_require__(3300);

var toIndexedObject = __webpack_require__(6211);

var toPropertyKey = __webpack_require__(1247);

var hasOwn = __webpack_require__(6957);

var IE8_DOM_DEFINE = __webpack_require__(2674); // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe


var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

/***/ }),

/***/ 5166:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(4085);

var enumBugKeys = __webpack_require__(393);

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),

/***/ 5863:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 3547:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),

/***/ 4085:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var hasOwn = __webpack_require__(6957);

var toIndexedObject = __webpack_require__(6211);

var indexOf = (__webpack_require__(477).indexOf);

var hiddenKeys = __webpack_require__(1055);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (hasOwn(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
  }

  return result;
};

/***/ }),

/***/ 669:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(4085);

var enumBugKeys = __webpack_require__(393); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe


module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

/***/ }),

/***/ 7395:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),

/***/ 8256:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var uncurryThis = __webpack_require__(1824);

var objectKeys = __webpack_require__(669);

var toIndexedObject = __webpack_require__(6211);

var $propertyIsEnumerable = (__webpack_require__(7395).f);

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push); // `Object.{ entries, values }` methods implementation

var createMethod = function createMethod(TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};

/***/ }),

/***/ 6482:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var call = __webpack_require__(8435);

var isCallable = __webpack_require__(1438);

var isObject = __webpack_require__(2949);

var TypeError = global.TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 6813:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(1575);

var uncurryThis = __webpack_require__(1824);

var getOwnPropertyNamesModule = __webpack_require__(5166);

var getOwnPropertySymbolsModule = __webpack_require__(5863);

var anObject = __webpack_require__(3739);

var concat = uncurryThis([].concat); // all object keys, includes non-enumerable and symbols

module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),

/***/ 6486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var isCallable = __webpack_require__(1438);

var hasOwn = __webpack_require__(6957);

var createNonEnumerableProperty = __webpack_require__(4059);

var setGlobal = __webpack_require__(3351);

var inspectSource = __webpack_require__(7599);

var InternalStateModule = __webpack_require__(4081);

var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(9411).CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;

  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }

    if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
      createNonEnumerableProperty(value, 'name', name);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});

/***/ }),

/***/ 4682:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var TypeError = global.TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ 3351:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328); // eslint-disable-next-line es/no-object-defineproperty -- safe


var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),

/***/ 1449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(8849);

var uid = __webpack_require__(858);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ 5153:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var setGlobal = __webpack_require__(3351);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),

/***/ 8849:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(6719);

var store = __webpack_require__(5153);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.21.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

/***/ }),

/***/ 8786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7278);

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ 6211:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8483);

var requireObjectCoercible = __webpack_require__(4682);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ 7278:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor; // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity

module.exports = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- safe

  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

/***/ }),

/***/ 588:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7278);

var min = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ 6068:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var requireObjectCoercible = __webpack_require__(4682);

var Object = global.Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ 4375:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var call = __webpack_require__(8435);

var isObject = __webpack_require__(2949);

var isSymbol = __webpack_require__(5634);

var getMethod = __webpack_require__(2670);

var ordinaryToPrimitive = __webpack_require__(6482);

var wellKnownSymbol = __webpack_require__(7457);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

/***/ }),

/***/ 1247:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(4375);

var isSymbol = __webpack_require__(5634); // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey


module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

/***/ }),

/***/ 4657:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(7457);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),

/***/ 1881:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};

/***/ }),

/***/ 858:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),

/***/ 4719:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(4938);

module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),

/***/ 882:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var fails = __webpack_require__(8901); // V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334


module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {
    /* empty */
  }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

/***/ }),

/***/ 7457:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var shared = __webpack_require__(8849);

var hasOwn = __webpack_require__(6957);

var uid = __webpack_require__(858);

var NATIVE_SYMBOL = __webpack_require__(4938);

var USE_SYMBOL_AS_UID = __webpack_require__(4719);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),

/***/ 9101:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $ = __webpack_require__(9004);

var flattenIntoArray = __webpack_require__(8529);

var toObject = __webpack_require__(6068);

var lengthOfArrayLike = __webpack_require__(1563);

var toIntegerOrInfinity = __webpack_require__(7278);

var arraySpeciesCreate = __webpack_require__(586); // `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat


$({
  target: 'Array',
  proto: true
}, {
  flat: function
    /* depthArg = 1 */
  flat() {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});

/***/ }),

/***/ 8938:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(7331); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables


addToUnscopables('flat');

/***/ }),

/***/ 4875:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(9004);

var $entries = (__webpack_require__(8256).entries); // `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries


$({
  target: 'Object',
  stat: true
}, {
  entries: function entries(O) {
    return $entries(O);
  }
});

/***/ }),

/***/ 8819:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(9004);

var iterate = __webpack_require__(6449);

var createProperty = __webpack_require__(812); // `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries


$({
  target: 'Object',
  stat: true
}, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, {
      AS_ENTRIES: true
    });
    return obj;
  }
});

/***/ }),

/***/ 2231:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(9004);

var $values = (__webpack_require__(8256).values); // `Object.values` method
// https://tc39.es/ecma262/#sec-object.values


$({
  target: 'Object',
  stat: true
}, {
  values: function values(O) {
    return $values(O);
  }
});

/***/ }),

/***/ 1646:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(8469);

module.exports = parent;

/***/ }),

/***/ 9940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var DataView = getNative(root, 'DataView');
module.exports = DataView;

/***/ }),

/***/ 1979:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hashClear = __webpack_require__(9129),
    hashDelete = __webpack_require__(7644),
    hashGet = __webpack_require__(3486),
    hashHas = __webpack_require__(4786),
    hashSet = __webpack_require__(6444);
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
module.exports = Hash;

/***/ }),

/***/ 2768:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var listCacheClear = __webpack_require__(3708),
    listCacheDelete = __webpack_require__(6993),
    listCacheGet = __webpack_require__(286),
    listCacheHas = __webpack_require__(1678),
    listCacheSet = __webpack_require__(9743);
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
module.exports = ListCache;

/***/ }),

/***/ 4804:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var Map = getNative(root, 'Map');
module.exports = Map;

/***/ }),

/***/ 8423:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mapCacheClear = __webpack_require__(6977),
    mapCacheDelete = __webpack_require__(7474),
    mapCacheGet = __webpack_require__(727),
    mapCacheHas = __webpack_require__(3653),
    mapCacheSet = __webpack_require__(6140);
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
module.exports = MapCache;

/***/ }),

/***/ 7114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var Promise = getNative(root, 'Promise');
module.exports = Promise;

/***/ }),

/***/ 689:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var Set = getNative(root, 'Set');
module.exports = Set;

/***/ }),

/***/ 9832:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(8423),
    setCacheAdd = __webpack_require__(9911),
    setCacheHas = __webpack_require__(7447);
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */


function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
module.exports = SetCache;

/***/ }),

/***/ 959:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(2768),
    stackClear = __webpack_require__(7553),
    stackDelete = __webpack_require__(6038),
    stackGet = __webpack_require__(2397),
    stackHas = __webpack_require__(2421),
    stackSet = __webpack_require__(2936);
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
} // Add methods to `Stack`.


Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
module.exports = Stack;

/***/ }),

/***/ 2773:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(4362);
/** Built-in value references. */


var Symbol = root.Symbol;
module.exports = Symbol;

/***/ }),

/***/ 2496:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(4362);
/** Built-in value references. */


var Uint8Array = root.Uint8Array;
module.exports = Uint8Array;

/***/ }),

/***/ 5284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var WeakMap = getNative(root, 'WeakMap');
module.exports = WeakMap;

/***/ }),

/***/ 6523:
/***/ ((module) => {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

module.exports = arrayFilter;

/***/ }),

/***/ 8083:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(5094),
    isArguments = __webpack_require__(9246),
    isArray = __webpack_require__(3670),
    isBuffer = __webpack_require__(2343),
    isIndex = __webpack_require__(6076),
    isTypedArray = __webpack_require__(1589);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

module.exports = arrayLikeKeys;

/***/ }),

/***/ 9258:
/***/ ((module) => {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

module.exports = arrayMap;

/***/ }),

/***/ 8421:
/***/ ((module) => {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}

module.exports = arrayPush;

/***/ }),

/***/ 4481:
/***/ ((module) => {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}

module.exports = arraySome;

/***/ }),

/***/ 6213:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(7950);
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

module.exports = assocIndexOf;

/***/ }),

/***/ 2478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isSymbol = __webpack_require__(4655);
/**
 * The base implementation of methods like `_.max` and `_.min` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per iteration.
 * @param {Function} comparator The comparator used to compare values.
 * @returns {*} Returns the extremum value.
 */


function baseExtremum(array, iteratee, comparator) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index],
        current = iteratee(value);

    if (current != null && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
      var computed = current,
          result = value;
    }
  }

  return result;
}

module.exports = baseExtremum;

/***/ }),

/***/ 5974:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var castPath = __webpack_require__(6883),
    toKey = __webpack_require__(7102);
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */


function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}

module.exports = baseGet;

/***/ }),

/***/ 891:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(8421),
    isArray = __webpack_require__(3670);
/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */


function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

/***/ }),

/***/ 1185:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2773),
    getRawTag = __webpack_require__(3888),
    objectToString = __webpack_require__(2299);
/** `Object#toString` result references. */


var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),

/***/ 582:
/***/ ((module) => {

/**
 * The base implementation of `_.gt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 */
function baseGt(value, other) {
  return value > other;
}

module.exports = baseGt;

/***/ }),

/***/ 5529:
/***/ ((module) => {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;

/***/ }),

/***/ 1075:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(1185),
    isObjectLike = __webpack_require__(4939);
/** `Object#toString` result references. */


var argsTag = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

/***/ }),

/***/ 9856:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqualDeep = __webpack_require__(1829),
    isObjectLike = __webpack_require__(4939);
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */


function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }

  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;

/***/ }),

/***/ 1829:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(959),
    equalArrays = __webpack_require__(3426),
    equalByTag = __webpack_require__(1402),
    equalObjects = __webpack_require__(4572),
    getTag = __webpack_require__(2417),
    isArray = __webpack_require__(3670),
    isBuffer = __webpack_require__(2343),
    isTypedArray = __webpack_require__(1589);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1;
/** `Object#toString` result references. */

var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }

    objIsArr = true;
    objIsObj = false;
  }

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;

/***/ }),

/***/ 4656:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(959),
    baseIsEqual = __webpack_require__(9856);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */

function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }

  object = Object(object);

  while (index--) {
    var data = matchData[index];

    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }

  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack();

      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }

      if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
        return false;
      }
    }
  }

  return true;
}

module.exports = baseIsMatch;

/***/ }),

/***/ 4106:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(3626),
    isMasked = __webpack_require__(9249),
    isObject = __webpack_require__(71),
    toSource = __webpack_require__(1214);
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */


var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

/***/ }),

/***/ 3638:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(1185),
    isLength = __webpack_require__(7100),
    isObjectLike = __webpack_require__(4939);
/** `Object#toString` result references. */


var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

/***/ }),

/***/ 9047:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseMatches = __webpack_require__(8334),
    baseMatchesProperty = __webpack_require__(5941),
    identity = __webpack_require__(1559),
    isArray = __webpack_require__(3670),
    property = __webpack_require__(8886);
/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */


function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }

  if (value == null) {
    return identity;
  }

  if (typeof value == 'object') {
    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }

  return property(value);
}

module.exports = baseIteratee;

/***/ }),

/***/ 7521:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototype = __webpack_require__(2803),
    nativeKeys = __webpack_require__(3865);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}

module.exports = baseKeys;

/***/ }),

/***/ 8334:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsMatch = __webpack_require__(4656),
    getMatchData = __webpack_require__(2811),
    matchesStrictComparable = __webpack_require__(4248);
/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */


function baseMatches(source) {
  var matchData = getMatchData(source);

  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }

  return function (object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;

/***/ }),

/***/ 5941:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(9856),
    get = __webpack_require__(643),
    hasIn = __webpack_require__(9059),
    isKey = __webpack_require__(837),
    isStrictComparable = __webpack_require__(3631),
    matchesStrictComparable = __webpack_require__(4248),
    toKey = __webpack_require__(7102);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */

function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }

  return function (object) {
    var objValue = get(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;

/***/ }),

/***/ 3184:
/***/ ((module) => {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

/***/ }),

/***/ 886:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGet = __webpack_require__(5974);
/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */


function basePropertyDeep(path) {
  return function (object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;

/***/ }),

/***/ 5094:
/***/ ((module) => {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

module.exports = baseTimes;

/***/ }),

/***/ 8257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2773),
    arrayMap = __webpack_require__(9258),
    isArray = __webpack_require__(3670),
    isSymbol = __webpack_require__(4655);
/** Used as references for various `Number` constants. */


var INFINITY = 1 / 0;
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

module.exports = baseToString;

/***/ }),

/***/ 9081:
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),

/***/ 3159:
/***/ ((module) => {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

/***/ }),

/***/ 6883:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(3670),
    isKey = __webpack_require__(837),
    stringToPath = __webpack_require__(376),
    toString = __webpack_require__(2049);
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */


function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }

  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;

/***/ }),

/***/ 1741:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(4362);
/** Used to detect overreaching core-js shims. */


var coreJsData = root['__core-js_shared__'];
module.exports = coreJsData;

/***/ }),

/***/ 3426:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(9832),
    arraySome = __webpack_require__(4481),
    cacheHas = __webpack_require__(3159);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  } // Check that cyclic values are equal.


  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);

  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }

  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array); // Ignore non-index properties.

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    } // Recursively compare arrays (susceptible to call stack limits).


    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

/***/ }),

/***/ 1402:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2773),
    Uint8Array = __webpack_require__(2496),
    eq = __webpack_require__(7950),
    equalArrays = __webpack_require__(3426),
    mapToArray = __webpack_require__(8961),
    setToArray = __webpack_require__(6983);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/** `Object#toString` result references. */

var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
/**
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
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= COMPARE_UNORDERED_FLAG; // Recursively compare objects (susceptible to call stack limits).

      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }

  }

  return false;
}

module.exports = equalByTag;

/***/ }),

/***/ 4572:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getAllKeys = __webpack_require__(5788);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1;
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  } // Check that cyclic values are equal.


  var objStacked = stack.get(object);
  var othStacked = stack.get(other);

  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    } // Recursively compare objects (susceptible to call stack limits).


    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

/***/ }),

/***/ 8556:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
module.exports = freeGlobal;

/***/ }),

/***/ 5788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetAllKeys = __webpack_require__(891),
    getSymbols = __webpack_require__(7976),
    keys = __webpack_require__(3225);
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */


function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

/***/ }),

/***/ 404:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isKeyable = __webpack_require__(4480);
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

module.exports = getMapData;

/***/ }),

/***/ 2811:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isStrictComparable = __webpack_require__(3631),
    keys = __webpack_require__(3225);
/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */


function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];
    result[length] = [key, value, isStrictComparable(value)];
  }

  return result;
}

module.exports = getMatchData;

/***/ }),

/***/ 3203:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(4106),
    getValue = __webpack_require__(7338);
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

/***/ }),

/***/ 3888:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2773);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

module.exports = getRawTag;

/***/ }),

/***/ 7976:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayFilter = __webpack_require__(6523),
    stubArray = __webpack_require__(4043);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Built-in value references. */

var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
module.exports = getSymbols;

/***/ }),

/***/ 2417:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DataView = __webpack_require__(9940),
    Map = __webpack_require__(4804),
    Promise = __webpack_require__(7114),
    Set = __webpack_require__(689),
    WeakMap = __webpack_require__(5284),
    baseGetTag = __webpack_require__(1185),
    toSource = __webpack_require__(1214);
/** `Object#toString` result references. */


var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';
var dataViewTag = '[object DataView]';
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
  getTag = function getTag(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;

        case mapCtorString:
          return mapTag;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag;

        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}

module.exports = getTag;

/***/ }),

/***/ 7338:
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),

/***/ 4727:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var castPath = __webpack_require__(6883),
    isArguments = __webpack_require__(9246),
    isArray = __webpack_require__(3670),
    isIndex = __webpack_require__(6076),
    isLength = __webpack_require__(7100),
    toKey = __webpack_require__(7102);
/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */


function hasPath(object, path, hasFunc) {
  path = castPath(path, object);
  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);

    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }

    object = object[key];
  }

  if (result || ++index != length) {
    return result;
  }

  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}

module.exports = hasPath;

/***/ }),

/***/ 9129:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

/***/ }),

/***/ 7644:
/***/ ((module) => {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

/***/ }),

/***/ 3486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

/***/ }),

/***/ 4786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

/***/ }),

/***/ 6444:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

/***/ }),

/***/ 6076:
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

/***/ }),

/***/ 837:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(3670),
    isSymbol = __webpack_require__(4655);
/** Used to match property names within property paths. */


var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */

function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }

  var type = typeof value;

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

module.exports = isKey;

/***/ }),

/***/ 4480:
/***/ ((module) => {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

module.exports = isKeyable;

/***/ }),

/***/ 9249:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(1741);
/** Used to detect methods masquerading as native. */


var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

module.exports = isMasked;

/***/ }),

/***/ 2803:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}

module.exports = isPrototype;

/***/ }),

/***/ 3631:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(71);
/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */


function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

/***/ }),

/***/ 3708:
/***/ ((module) => {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

/***/ }),

/***/ 6993:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/** Used for built-in method references. */


var arrayProto = Array.prototype;
/** Built-in value references. */

var splice = arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

module.exports = listCacheDelete;

/***/ }),

/***/ 286:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

/***/ }),

/***/ 1678:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

/***/ }),

/***/ 9743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

module.exports = listCacheSet;

/***/ }),

/***/ 6977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Hash = __webpack_require__(1979),
    ListCache = __webpack_require__(2768),
    Map = __webpack_require__(4804);
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

module.exports = mapCacheClear;

/***/ }),

/***/ 7474:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

/***/ }),

/***/ 727:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

/***/ }),

/***/ 3653:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

/***/ }),

/***/ 6140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

/***/ }),

/***/ 8961:
/***/ ((module) => {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

/***/ }),

/***/ 4248:
/***/ ((module) => {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }

    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}

module.exports = matchesStrictComparable;

/***/ }),

/***/ 5933:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var memoize = __webpack_require__(104);
/** Used as the maximum memoize cache size. */


var MAX_MEMOIZE_SIZE = 500;
/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */

function memoizeCapped(func) {
  var result = memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }

    return key;
  });
  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;

/***/ }),

/***/ 6326:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203);
/* Built-in method references that are verified to be native. */


var nativeCreate = getNative(Object, 'create');
module.exports = nativeCreate;

/***/ }),

/***/ 3865:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(5290);
/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeKeys = overArg(Object.keys, Object);
module.exports = nativeKeys;

/***/ }),

/***/ 1985:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(8556);
/** Detect free variable `exports`. */


var freeExports =  true && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */

var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */

var nodeUtil = function () {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    } // Legacy `process.binding('util')` for Node.js < 10.


    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;

/***/ }),

/***/ 2299:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),

/***/ 5290:
/***/ ((module) => {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

/***/ }),

/***/ 4362:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(8556);
/** Detect free variable `self`. */


var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
module.exports = root;

/***/ }),

/***/ 9911:
/***/ ((module) => {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */

function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);

  return this;
}

module.exports = setCacheAdd;

/***/ }),

/***/ 7447:
/***/ ((module) => {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

/***/ }),

/***/ 6983:
/***/ ((module) => {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

/***/ }),

/***/ 7553:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(2768);
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */


function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}

module.exports = stackClear;

/***/ }),

/***/ 6038:
/***/ ((module) => {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

module.exports = stackDelete;

/***/ }),

/***/ 2397:
/***/ ((module) => {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

/***/ }),

/***/ 2421:
/***/ ((module) => {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

/***/ }),

/***/ 2936:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(2768),
    Map = __webpack_require__(4804),
    MapCache = __webpack_require__(8423);
/** Used as the size to enable large array optimizations. */


var LARGE_ARRAY_SIZE = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof ListCache) {
    var pairs = data.__data__;

    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

/***/ }),

/***/ 376:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var memoizeCapped = __webpack_require__(5933);
/** Used to match property names within property paths. */


var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/** Used to match backslashes in property paths. */

var reEscapeChar = /\\(\\)?/g;
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */

var stringToPath = memoizeCapped(function (string) {
  var result = [];

  if (string.charCodeAt(0) === 46
  /* . */
  ) {
    result.push('');
  }

  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});
module.exports = stringToPath;

/***/ }),

/***/ 7102:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isSymbol = __webpack_require__(4655);
/** Used as references for various `Number` constants. */


var INFINITY = 1 / 0;
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

module.exports = toKey;

/***/ }),

/***/ 1214:
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

module.exports = toSource;

/***/ }),

/***/ 7950:
/***/ ((module) => {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),

/***/ 643:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGet = __webpack_require__(5974);
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
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
 */


function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

/***/ }),

/***/ 9059:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseHasIn = __webpack_require__(5529),
    hasPath = __webpack_require__(4727);
/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */


function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

/***/ }),

/***/ 1559:
/***/ ((module) => {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),

/***/ 9246:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(1075),
    isObjectLike = __webpack_require__(4939);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
module.exports = isArguments;

/***/ }),

/***/ 3670:
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
module.exports = isArray;

/***/ }),

/***/ 6175:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(3626),
    isLength = __webpack_require__(7100);
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */


function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),

/***/ 2343:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(4362),
    stubFalse = __webpack_require__(3444);
/** Detect free variable `exports`. */


var freeExports =  true && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Built-in value references. */

var Buffer = moduleExports ? root.Buffer : undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */

var isBuffer = nativeIsBuffer || stubFalse;
module.exports = isBuffer;

/***/ }),

/***/ 7120:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(9856);
/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */


function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;

/***/ }),

/***/ 3626:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(1185),
    isObject = __webpack_require__(71);
/** `Object#toString` result references. */


var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),

/***/ 7100:
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),

/***/ 71:
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
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
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),

/***/ 4939:
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

/***/ }),

/***/ 4655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(1185),
    isObjectLike = __webpack_require__(4939);
/** `Object#toString` result references. */


var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

module.exports = isSymbol;

/***/ }),

/***/ 1589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(3638),
    baseUnary = __webpack_require__(9081),
    nodeUtil = __webpack_require__(1985);
/* Node.js helper references. */


var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
module.exports = isTypedArray;

/***/ }),

/***/ 3225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(8083),
    baseKeys = __webpack_require__(7521),
    isArrayLike = __webpack_require__(6175);
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
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
 */


function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

/***/ }),

/***/ 4378:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseExtremum = __webpack_require__(2478),
    baseGt = __webpack_require__(582),
    baseIteratee = __webpack_require__(9047);
/**
 * This method is like `_.max` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * _.maxBy(objects, function(o) { return o.n; });
 * // => { 'n': 2 }
 *
 * // The `_.property` iteratee shorthand.
 * _.maxBy(objects, 'n');
 * // => { 'n': 2 }
 */


function maxBy(array, iteratee) {
  return array && array.length ? baseExtremum(array, baseIteratee(iteratee, 2), baseGt) : undefined;
}

module.exports = maxBy;

/***/ }),

/***/ 104:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(8423);
/** Error message constants. */


var FUNC_ERROR_TEXT = 'Expected a function';
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */

function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
} // Expose `MapCache`.


memoize.Cache = MapCache;
module.exports = memoize;

/***/ }),

/***/ 8886:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseProperty = __webpack_require__(3184),
    basePropertyDeep = __webpack_require__(886),
    isKey = __webpack_require__(837),
    toKey = __webpack_require__(7102);
/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */


function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;

/***/ }),

/***/ 4043:
/***/ ((module) => {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

/***/ }),

/***/ 3444:
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),

/***/ 2049:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseToString = __webpack_require__(8257);
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */


function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

/***/ }),

/***/ 4564:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ acquire)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2474);
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(742);



var priceCaps = {
  "cuppa Voraci tea": 200000,
  "cuppa Sobrie tea": 200000,
  "potion of the field gar": 50000,
  "Special Seasoning": 20000,
  "spice melange": 500000,
  "mojo filter": 10000,
  "Ol' Scratch's salad fork": 200000,
  "Frosty's frosty mug": 200000,
  "sweet tooth": 250000
};
function acquire(qty, item, maxPrice) {
  var throwOnFail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var maxAggregateCost = arguments.length > 4 ? arguments[4] : undefined;
  if (maxPrice === undefined) maxPrice = priceCaps[item.name];
  if (!item.tradeable || maxPrice !== undefined && maxPrice <= 0) return 0;
  if (maxPrice === undefined) throw new Error("No price cap for ".concat(item.name, "."));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Trying to acquire ".concat(qty, " ").concat(item.plural, "; max price ").concat(maxPrice.toFixed(0), "."), "green");

  if (qty * (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(item) > (maxAggregateCost !== null && maxAggregateCost !== void 0 ? maxAggregateCost : 1000000)) {
    throw new Error("Aggregate cost too high! Probably a bug.");
  }

  var startAmount = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)(item);
  var remaining = qty - startAmount;
  if (remaining <= 0) return qty;

  var logError = (target, source) => {
    throw new Error("Failed to remove ".concat(target, " from ").concat(source));
  };

  if ((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .get */ .U2)("autoSatisfyWithCloset")) {
    var getCloset = Math.min(remaining, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.closetAmount)(item));
    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeCloset)(getCloset, item) && throwOnFail) logError(item, "closet");
    remaining -= getCloset;
    if (remaining <= 0) return qty;
  }

  var getStorage = Math.min(remaining, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.storageAmount)(item));
  if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeStorage)(getStorage, item) && throwOnFail) logError(item, "storage");
  remaining -= getStorage;
  if (remaining <= 0) return qty;
  var getMall = Math.min(remaining, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.shopAmount)(item));

  if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeShop)(getMall, item)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("refresh shop");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("refresh inventory");
    remaining = qty - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)(item);
    getMall = Math.min(remaining, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.shopAmount)(item));
    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeShop)(getMall, item) && throwOnFail) logError(item, "shop");
  }

  remaining -= getMall;
  var coinmaster = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Coinmaster.all().find(cm => (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.sellsItem)(cm, item));
  var coinmasterPrice = coinmaster ? (0,_session__WEBPACK_IMPORTED_MODULE_1__/* .garboValue */ .sf)(coinmaster.item) * (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.sellPrice)(coinmaster, item) : 0;

  if (coinmaster && coinmasterPrice > (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(item)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)(item, remaining, maxPrice);
  } else {
    (0,libram__WEBPACK_IMPORTED_MODULE_2__/* .withProperty */ .pr)("autoBuyPriceLimit", maxPrice, () => (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(item, qty));
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)(item) < qty && throwOnFail) {
    throw new Error("Failed to purchase sufficient quantities of ".concat(item, " from the mall."));
  }

  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)(item) - startAmount;
}

/***/ }),

/***/ 5897:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports stashItems, withStash, withVIPClan, StashManager */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2474);
/* harmony import */ var _combat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4223);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7442);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var stashItems = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("garboStashItems", "").split(",").filter(x => x.trim().length > 0).map(id => (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(id));
function withStash(itemsToTake, action) {
  var manager = new StashManager();

  try {
    manager.take.apply(manager, _toConsumableArray(itemsToTake));
    return action();
  } finally {
    manager.putBackAll();
  }
}
function withVIPClan(action) {
  var clanIdOrNameString = get("garbo_vipClan");
  var clanIdOrName = clanIdOrNameString.match(/^\d+$/) ? parseInt(clanIdOrNameString) : clanIdOrNameString;

  if (clanIdOrName === "" && have($item(_templateObject || (_templateObject = _taggedTemplateLiteral(["Clan VIP Lounge key"]))))) {
    if (userConfirmDialog("The preference 'garbo_vipClan' is not set. Use the current clan as a VIP clan? (Defaults to yes in 15 seconds)", true, 15000)) {
      clanIdOrName = getClanId();
      set("garbo_vipClan", clanIdOrName);
    }
  }

  return withClan(clanIdOrName || getClanId(), action);
}

function withClan(clanIdOrName, action) {
  var startingClanId = getClanId();
  Clan.join(clanIdOrName);

  try {
    return action();
  } finally {
    Clan.join(startingClanId);
  }
}

var StashManager = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function StashManager() {
    _classCallCheck(this, StashManager);

    _defineProperty(this, "clanIdOrName", void 0);

    _defineProperty(this, "enabled", void 0);

    _defineProperty(this, "taken", new Map());

    var clanIdOrName = get("garbo_stashClan", "none");
    this.clanIdOrName = clanIdOrName.match(/^\d+$/) ? parseInt(clanIdOrName) : clanIdOrName;
    this.enabled = 0 !== this.clanIdOrName && "none" !== this.clanIdOrName;
  }

  _createClass(StashManager, [{
    key: "take",
    value: function take() {
      for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }

      if (items.length === 0) {
        return;
      }

      if (!this.enabled) {
        print("Stash access is disabled. Ignoring request to borrow \"".concat(items.map(value => value.name).join(", "), "\" from clan stash."), HIGHLIGHT);
        return;
      }

      withClan(this.clanIdOrName, () => {
        var _iterator = _createForOfIteratorHelper(items),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            if (have(item)) continue;

            if (getFoldGroup(item).some(fold => have(fold))) {
              cliExecute("fold ".concat(item.name));
              continue;
            }

            var foldArray = [item].concat(_toConsumableArray(getFoldGroup(item)));
            refreshStash();

            var _iterator2 = _createForOfIteratorHelper(foldArray),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var fold = _step2.value;

                try {
                  if (stashAmount(fold) > 0) {
                    if (takeStash(1, fold)) {
                      var _this$taken$get;

                      print("Took ".concat(fold.name, " from stash in ").concat(getClanName(), "."), HIGHLIGHT);
                      if (fold !== item) cliExecute("fold ".concat(item.name));
                      this.taken.set(item, ((_this$taken$get = this.taken.get(item)) !== null && _this$taken$get !== void 0 ? _this$taken$get : 0) + 1);
                      stashItems.push(fold);
                      break;
                    } else {
                      print("Failed to take ".concat(fold.name, " from the stash. Do you have stash access in ").concat(getClanName(), "?"), "red");
                    }
                  }
                } catch (_unused) {
                  print("Failed to take ".concat(fold.name, " from stash in ").concat(getClanName(), "."), "red");
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            if (have(item)) continue;
            print("Couldn't find ".concat(item.name, " in clan stash for ").concat(getClanName(), "."), "red");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    }
    /**
     * Ensure at least one of each of {items} in inventory.
     * @param items Items to take from the stash.
     */

  }, {
    key: "ensure",
    value: function ensure() {
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      this.take.apply(this, _toConsumableArray(items.filter(item => availableAmount(item) === 0)));
    }
  }, {
    key: "putBack",
    value: function putBack() {
      for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        items[_key3] = arguments[_key3];
      }

      if (items.length === 0) return;

      if (visitUrl("fight.php").includes("You're fighting")) {
        var _Macro$if_;

        print("In fight, trying to get away to return items to stash...", HIGHLIGHT);

        (_Macro$if_ = Macro.if_($monster(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Knob Goblin Embezzler"]))), Macro.attack().repeat())).tryItem.apply(_Macro$if_, _toConsumableArray($items(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Louder Than Bomb, divine champagne popper"]))))).step("runaway").submit();
      } else if (handlingChoice()) {
        print("I'm stuck in a choice, unfortunately, but were I not, I'd like to return the following items to your clan stash:", "red");
        items.forEach(item => print("".concat(item.name, ","), "red"));
      }

      withClan(this.clanIdOrName, () => {
        var _iterator3 = _createForOfIteratorHelper(items),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _this$taken$get2;

            var item = _step3.value;
            var count = (_this$taken$get2 = this.taken.get(item)) !== null && _this$taken$get2 !== void 0 ? _this$taken$get2 : 0;

            if (count > 0) {
              retrieveItem(count, item);

              if (item === $item(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Buddy Bjorn"])))) {
                visitUrl("desc_item.php?whichitem=".concat($item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Buddy Bjorn"]))).descid));
                bjornifyFamiliar($familiar(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["none"]))));
              }

              if (item === $item(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Crown of Thrones"])))) {
                visitUrl("desc_item.php?whichitem=".concat($item(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Crown of Thrones"]))).descid));
                enthroneFamiliar($familiar(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["none"]))));
              }

              if (putStash(count, item)) {
                var index = stashItems.indexOf(item);
                if (index >= 0) stashItems.splice(stashItems.indexOf(item), 1);
                print("Returned ".concat(item.name, " to stash in ").concat(getClanName(), "."), HIGHLIGHT);
                this.taken.delete(item);
              } else {
                throw "Failed to return ".concat(item.name, " to stash.");
              }
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      });
    }
    /**
     * Put all items back in the stash.
     */

  }, {
    key: "putBackAll",
    value: function putBackAll() {
      this.putBack.apply(this, _toConsumableArray(this.taken.keys()));
    }
  }]);

  return StashManager;
}()));

/***/ }),

/***/ 4223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "monsterManuelAvailable": () => (/* binding */ monsterManuelAvailable),
/* harmony export */   "maxPassiveDamage": () => (/* binding */ maxPassiveDamage),
/* harmony export */   "shouldRedigitize": () => (/* binding */ shouldRedigitize),
/* harmony export */   "Macro": () => (/* binding */ Macro),
/* harmony export */   "withMacro": () => (/* binding */ withMacro),
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(678);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2474);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1577);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3311);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5632);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1762);
/* harmony import */ var _familiar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9737);
/* harmony import */ var _wanderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5444);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104, _templateObject105, _templateObject106, _templateObject107, _templateObject108, _templateObject109, _templateObject110, _templateObject111, _templateObject112, _templateObject113, _templateObject114, _templateObject115, _templateObject116, _templateObject117, _templateObject118, _templateObject119, _templateObject120, _templateObject121, _templateObject122, _templateObject123, _templateObject124, _templateObject125, _templateObject126, _templateObject127, _templateObject128, _templateObject129, _templateObject130, _templateObject131, _templateObject132, _templateObject133, _templateObject134, _templateObject135, _templateObject136, _templateObject137, _templateObject138, _templateObject139, _templateObject140, _templateObject141, _templateObject142, _templateObject143, _templateObject144, _templateObject145, _templateObject146, _templateObject147, _templateObject148, _templateObject149, _templateObject150, _templateObject151, _templateObject152, _templateObject153, _templateObject154, _templateObject155, _templateObject156, _templateObject157, _templateObject158, _templateObject159, _templateObject160, _templateObject161, _templateObject162, _templateObject163, _templateObject164, _templateObject165, _templateObject166, _templateObject167, _templateObject168, _templateObject169, _templateObject170, _templateObject171, _templateObject172, _templateObject173, _templateObject174, _templateObject175, _templateObject176, _templateObject177, _templateObject178, _templateObject179, _templateObject180, _templateObject181, _templateObject182, _templateObject183;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var monsterManuelCached = undefined;
function monsterManuelAvailable() {
  if (monsterManuelCached !== undefined) return Boolean(monsterManuelCached);
  monsterManuelCached = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("questlog.php?which=3").includes("Monster Manuel");
  return Boolean(monsterManuelCached);
}

function maxCarriedFamiliarDamage(familiar) {
  // Only considering familiars we reasonably may carry
  switch (familiar) {
    // +5 to Familiar Weight
    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Animated Macaroni Duck"]))):
      return 50;

    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Barrrnacle"]))):
    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Gelatinous Cubeling"]))):
    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Penguin Goodfella"]))):
      return 30;

    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Misshapen Animal Skeleton"]))):
      return 40 + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)("Spooky Damage");
    // +25% Meat from Monsters

    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Hobo Monkey"]))):
      return 25;
    // +20% Meat from Monsters

    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Grouper Groupie"]))):
      // Double sleaze damage at Barf Mountain
      return 25 + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)("Sleaze Damage") * ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLocation)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$location */ .PG)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Barf Mountain"]))) ? 2 : 1);

    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Jitterbug"]))):
      return 20;

    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Mutant Cactus Bud"]))):
      // 25 poison damage (25+12+6+3+1)
      return 47;

    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Robortender"]))):
      return 20;
  }

  return 0;
}

function maxFamiliarDamage(familiar) {
  switch (familiar) {
    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Cocoabo"]))):
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)(familiar) + 3;

    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Feather Boa Constrictor"]))):
      // Double sleaze damage at Barf Mountain
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)(familiar) + 3 + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)("Sleaze Damage") * ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLocation)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$location */ .PG)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Barf Mountain"]))) ? 2 : 1);

    case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Ninja Pirate Zombie Robot"]))):
      return Math.floor(((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)(familiar) + 3) * 1.5);
  }

  return 0;
}

function maxPassiveDamage() {
  // Only considering passive damage sources we reasonably may have
  var vykeaMaxDamage = (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_VYKEACompanionLevel") > 0 ? 10 * (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_VYKEACompanionLevel") + 10 : 0; // Lasagmbie does max 2*level damage while Vermincelli does max level + (1/2 * level) + (1/2 * 1/2 * level) + ...

  var thrallMaxDamage = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myThrall)().level >= 5 && (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$thralls */ ._0)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Lasagmbie,Vermincelli"]))).includes((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myThrall)()) ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myThrall)().level * 2 : 0;
  var crownMaxDamage = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Crown of Thrones"])))) ? maxCarriedFamiliarDamage((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myEnthronedFamiliar)()) : 0;
  var bjornMaxDamage = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["Buddy Bjorn"])))) ? maxCarriedFamiliarDamage((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myBjornedFamiliar)()) : 0;
  var familiarMaxDamage = maxFamiliarDamage((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)());
  return vykeaMaxDamage + thrallMaxDamage + crownMaxDamage + bjornMaxDamage + familiarMaxDamage;
}
function shouldRedigitize() {
  var digitizesLeft = libram__WEBPACK_IMPORTED_MODULE_5__/* .getDigitizeUsesRemaining */ .VW();
  var monsterCount = libram__WEBPACK_IMPORTED_MODULE_5__/* .getDigitizeMonsterCount */ .A1() + 1; // triangular number * 10 - 3

  var digitizeAdventuresUsed = monsterCount * (monsterCount + 1) * 5 - 3; // Redigitize if fewer adventures than this digitize usage.

  return libram__WEBPACK_IMPORTED_MODULE_5__/* .have */ .lf() && libram__WEBPACK_IMPORTED_MODULE_5__/* .canDigitize */ .SS() && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)() * 1.04 < digitizesLeft * digitizeAdventuresUsed;
}
var Macro = /*#__PURE__*/function (_StrictMacro) {
  _inherits(Macro, _StrictMacro);

  var _super = _createSuper(Macro);

  function Macro() {
    _classCallCheck(this, Macro);

    return _super.apply(this, arguments);
  }

  _createClass(Macro, [{
    key: "submit",
    value: function submit() {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(this.components.join(";"));
      return _get(_getPrototypeOf(Macro.prototype), "submit", this).call(this);
    }
  }, {
    key: "tryHaveSkill",
    value: function tryHaveSkill(skill) {
      if (!skill) return this;
      return this.externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveSkill)(skill), Macro.trySkill(skill));
    }
  }, {
    key: "tryHaveItem",
    value: function tryHaveItem(item) {
      if (!item) return this;
      return this.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)(item), Macro.tryItem(item));
    }
  }, {
    key: "tryCopier",
    value: function tryCopier(itemOrSkill) {
      switch (itemOrSkill) {
        case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["Spooky Putty sheet"]))):
          return this.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("spookyPuttyCopiesMade") + Math.max(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_raindohCopiesMade")) < 6 && (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$items */ .vS)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["Spooky Putty sheet, Spooky Putty monster"]))).some(item => (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)(item)), Macro.tryItem(itemOrSkill));

        case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["Rain-Doh black box"]))):
          return this.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_raindohCopiesMade") + Math.max(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("spookyPuttyCopiesMade")) < 6 && (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$items */ .vS)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["Rain-Doh black box, Rain-Doh box full of monster"]))).some(item => (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)(item)), Macro.tryItem(itemOrSkill));

        case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["4-d camera"]))):
          return this.externalIf(!(0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_cameraUsed") && !(0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["shaking 4-d camera"])))), Macro.tryHaveItem(itemOrSkill));

        case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["crappy camera"]))):
          return this.externalIf(!(0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_crappyCameraUsed") && !(0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["shaking crappy camera"])))), Macro.tryHaveItem(itemOrSkill));

        case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["unfinished ice sculpture"]))):
          return this.externalIf(!(0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_iceSculptureUsed") && !(0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["ice sculpture"])))), Macro.tryHaveItem(itemOrSkill));

        case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["pulled green taffy"]))):
          return this.externalIf(!(0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_envyfishEggUsed") && !(0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["envyfish egg"])))), Macro.tryHaveItem(itemOrSkill));

        case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["print screen button"]))):
          return this.tryHaveItem(itemOrSkill);

        case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["alpine watercolor set"]))):
          return this.tryHaveItem(itemOrSkill);

        case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["LOV Enamorang"]))):
          return this.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_enamorangs") < 5 && !(0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("enamorangMonster"), Macro.tryHaveItem(itemOrSkill));

        case (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["Digitize"]))):
          return this.externalIf(libram__WEBPACK_IMPORTED_MODULE_5__/* .canDigitize */ .SS(), Macro.trySkill(itemOrSkill));
      } // Unsupported item or skill


      return this;
    }
  }, {
    key: "meatKill",
    value: function meatKill() {
      var sealClubberSetup = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["mafia pointer finger ring"])))) > 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$class */ ._$)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["Seal Clubber"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["Furious Wallop"]))));
      var opsSetup = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["mafia pointer finger ring"])))) > 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["Operation Patriot Shield"])))) > 0;
      var katanaSetup = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["mafia pointer finger ring"])))) > 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["haiku katana"])))) > 0;
      var capeSetup = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["mafia pointer finger ring"])))) > 0 && (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("retroCapeSuperhero") === "robot" && (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("retroCapeWashingInstructions") === "kill" && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemType)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedItem)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$slot */ .Jh)(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["weapon"]))))) === "pistol";
      var willCrit = sealClubberSetup || opsSetup || katanaSetup || capeSetup;
      return this.externalIf(shouldRedigitize(), Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monster */ .O4)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["Knob Goblin Embezzler"]))), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Digitize"])))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["Grey Goose"]))) && (0,_familiar__WEBPACK_IMPORTED_MODULE_1__/* .timeToMeatify */ .kZ)(), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Meatify Matter"]))))).tryHaveSkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["Sing Along"])))).externalIf((0,_wanderer__WEBPACK_IMPORTED_MODULE_2__/* .digitizedMonstersRemaining */ .J)() <= 5 - (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_meteorShowerUses") && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["Meteor Lore"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_meteorShowerUses") < 5, Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monster */ .O4)(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["Knob Goblin Embezzler"]))), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["Meteor Shower"])))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("cosmicBowlingBallReturnCombats") < 1, Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["Bowl Straight Up"]))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["Transcendent Olfaction"])))) && libram__WEBPACK_IMPORTED_MODULE_4__/* .getString */ .KF("olfactedMonster") !== "garbage tourist" && (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_olfactionsUsed") < 3, Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monster */ .O4)(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["garbage tourist"]))), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["Transcendent Olfaction"])))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_gallapagosMonster") !== (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monster */ .O4)(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["garbage tourist"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["Gallapagosian Mating Call"])))), Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monster */ .O4)(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral(["garbage tourist"]))), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["Gallapagosian Mating Call"])))))).externalIf(!(0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_latteCopyUsed") && ((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_latteMonster") !== (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monster */ .O4)(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(["garbage tourist"]))) || libram__WEBPACK_IMPORTED_MODULE_7__/* .get */ .U2("Latte Monster") > 30) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["latte lovers member's mug"])))), Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monster */ .O4)(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["garbage tourist"]))), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["Offer Latte to Opponent"])))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_feelNostalgicUsed") < 3 && (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("lastCopyableMonster") === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monster */ .O4)(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["garbage tourist"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["Feel Nostalgic"])))), Macro.if_("!monsterid ".concat((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monster */ .O4)(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["garbage tourist"]))).id), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["Feel Nostalgic"])))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral(["Space Jellyfish"]))), Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monsters */ .fr)(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["angry tourist, garbage tourist, horrible tourist family"]))), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral(["Extract Jelly"])))))).externalIf(opsSetup, Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral(["Throw Shield"]))))).meatStasis(willCrit).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.hippyStoneBroken)() && monsterManuelAvailable(), Macro.if_("(monsterid 1758 || monsterid 1759 || monsterid 1760) && monsterhpbelow ".concat(Math.floor((100 + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)("Monster Level")) / 5)), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral(["Feel Superior"])))))).externalIf(sealClubberSetup, Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral(["Furious Wallop"]))))).externalIf(opsSetup, Macro.attack()).externalIf(katanaSetup, Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral(["Summer Siesta"]))))).externalIf(capeSetup, Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral(["Precision Shot"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$class */ ._$)(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral(["Disco Bandit"]))), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral(["Disco Dance of Doom"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral(["Disco Dance II: Electric Boogaloo"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral(["Disco Dance 3: Back in the Habit"]))))).kill();
    }
  }, {
    key: "meatStasis",
    value: function meatStasis(checkPassive) {
      // We can't stasis without manuel's monsterhpabove if we want to crit
      if (checkPassive && !monsterManuelAvailable()) {
        return this;
      }

      var checkGet = i => (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)(i) && ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)(i) > 0 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(i));

      var stasisItem = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$items */ .vS)(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral(["facsimile dictionary, dictionary, seal tooth"]))).find(checkGet); // We retrieve a seal tooth at the start of the day, so this is just to make sure nothing has gone awry.

      if (!stasisItem) throw new Error("Acquire a seal tooth and run garbo again."); // Construct the monster HP component of the stasis condition
      // Evaluate the passive damage

      var passiveDamage = maxPassiveDamage() + 5; // Are we aiming to crit? If so, we need to respect the passive damage
      // Also we need to respect our health total

      var hpCheck = checkPassive ? "!hppercentbelow 25 && monsterhpabove ".concat(passiveDamage) : "!hppercentbelow 25"; // Same story but for the sixgun shot, which wants 40 more HP if possible

      var hpCheckSixgun = checkPassive ? "!hppercentbelow 25 && monsterhpabove ".concat(passiveDamage + 40) : "!hppercentbelow 25"; // Determine how long we'll be stasising for
      // By default there's no reason to stasis

      var stasisRounds = 0;

      if ([(0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral(["Cocoabo"]))), (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral(["Feather Boa Constrictor"]))), (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral(["Ninja Pirate Zombie Robot"]))), (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral(["Stocking Mimic"])))].includes((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)())) {
        // Cocoabo-likes drop meat for the first ten rounds of combat
        stasisRounds = 10;
      }

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral(["Hobo Monkey"]))) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral(["Buddy Bjorn"])))) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral(["Crown of Thrones"])))) || (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_bittycar")) {
        // These things can take a little longer to proc sometimes
        stasisRounds = 20;
      } // Ignore unexpected monsters, holiday scaling monsters seem to abort with monsterhpabove
      // Delevel the sausage goblins as otherwise they can kind of hurt


      return this.if_("monstername angry tourist || monstername garbage tourist || monstername horrible tourist family || monstername Knob Goblin Embezzler || monstername sausage goblin", Macro.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral(["Time-Spinner"])))), Macro.if_("".concat(hpCheck, " && monstername sausage goblin"), Macro.tryHaveItem((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral(["Time-Spinner"])))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral(["Meteor Lore"])))), Macro.if_("".concat(hpCheck, " && monstername sausage goblin"), Macro.tryHaveSkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral(["Micrometeorite"])))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral(["Pantsgiving"])))), Macro.if_("".concat(hpCheck), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral(["Pocket Crumbs"])))))).externalIf(libram__WEBPACK_IMPORTED_MODULE_5__/* .getSkills */ .SM().includes((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral(["Extract"])))), Macro.if_("".concat(hpCheck), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral(["Extract"])))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral(["vampyric cloake"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_vampyreCloakeFormUses") < 10, Macro.if_("".concat(hpCheck), Macro.tryHaveSkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral(["Become a Wolf"])))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral(["porquoise-handled sixgun"])))), Macro.if_("".concat(hpCheckSixgun), Macro.tryItem((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral(["porquoise-handled sixgun"])))))).while_("".concat(hpCheck, " && !pastround ").concat(stasisRounds), Macro.item(stasisItem)));
    }
  }, {
    key: "startCombat",
    value: function startCombat() {
      return this.tryHaveSkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral(["Sing Along"])))).tryHaveSkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral(["Curse of Weaksauce"])))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral(["Grey Goose"]))) && (0,_familiar__WEBPACK_IMPORTED_MODULE_1__/* .timeToMeatify */ .kZ)(), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral(["Meatify Matter"]))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("cosmicBowlingBallReturnCombats") < 1, Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral(["Bowl Straight Up"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject105 || (_templateObject105 = _taggedTemplateLiteral(["vampyric cloake"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_vampyreCloakeFormUses") < 10, Macro.tryHaveSkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject106 || (_templateObject106 = _taggedTemplateLiteral(["Become a Wolf"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject107 || (_templateObject107 = _taggedTemplateLiteral(["Pantsgiving"])))), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject108 || (_templateObject108 = _taggedTemplateLiteral(["Pocket Crumbs"]))))).externalIf(libram__WEBPACK_IMPORTED_MODULE_5__/* .getSkills */ .SM().includes((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject109 || (_templateObject109 = _taggedTemplateLiteral(["Extract"])))), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject110 || (_templateObject110 = _taggedTemplateLiteral(["Extract"]))))).tryHaveItem((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject111 || (_templateObject111 = _taggedTemplateLiteral(["porquoise-handled sixgun"])))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject112 || (_templateObject112 = _taggedTemplateLiteral(["Meteor Lore"])))), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject113 || (_templateObject113 = _taggedTemplateLiteral(["Micrometeorite"]))))).tryHaveItem((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject114 || (_templateObject114 = _taggedTemplateLiteral(["Time-Spinner"])))).tryHaveItem((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject115 || (_templateObject115 = _taggedTemplateLiteral(["Rain-Doh indigo cup"])))).tryHaveItem((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject116 || (_templateObject116 = _taggedTemplateLiteral(["Rain-Doh blue balls"])))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject117 || (_templateObject117 = _taggedTemplateLiteral(["Buddy Bjorn"])))) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject118 || (_templateObject118 = _taggedTemplateLiteral(["Crown of Thrones"])))), Macro.while_("!pastround 3 && !hppercentbelow 25", Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject119 || (_templateObject119 = _taggedTemplateLiteral(["seal tooth"])))))).externalIf([(0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject120 || (_templateObject120 = _taggedTemplateLiteral(["Cocoabo"]))), (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject121 || (_templateObject121 = _taggedTemplateLiteral(["Feather Boa Constrictor"]))), (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject122 || (_templateObject122 = _taggedTemplateLiteral(["Ninja Pirate Zombie Robot"]))), (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject123 || (_templateObject123 = _taggedTemplateLiteral(["Stocking Mimic"])))].some(familiar => (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === familiar), Macro.while_("!pastround 10 && !hppercentbelow 25", Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject124 || (_templateObject124 = _taggedTemplateLiteral(["seal tooth"])))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject125 || (_templateObject125 = _taggedTemplateLiteral(["Hobo Monkey"]))), Macro.while_("!match \"shoulder, and hands you some Meat.\" && !pastround 5 && !hppercentbelow 25", Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject126 || (_templateObject126 = _taggedTemplateLiteral(["seal tooth"]))))));
    }
  }, {
    key: "kill",
    value: function kill() {
      return this.externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$class */ ._$)(_templateObject127 || (_templateObject127 = _taggedTemplateLiteral(["Sauceror"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject128 || (_templateObject128 = _taggedTemplateLiteral(["Curse of Weaksauce"])))), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject129 || (_templateObject129 = _taggedTemplateLiteral(["Curse of Weaksauce"]))))).tryHaveSkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject130 || (_templateObject130 = _taggedTemplateLiteral(["Become a Wolf"])))).externalIf(!((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$class */ ._$)(_templateObject131 || (_templateObject131 = _taggedTemplateLiteral(["Sauceror"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject132 || (_templateObject132 = _taggedTemplateLiteral(["Curse of Weaksauce"]))))), Macro.while_("!pastround 24 && !hppercentbelow 25 && !missed 1", Macro.attack())) // Using while_ here in case you run out of mp
      .while_("hasskill Saucegeyser", Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject133 || (_templateObject133 = _taggedTemplateLiteral(["Saucegeyser"]))))).while_("hasskill Weapon of the Pastalord", Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject134 || (_templateObject134 = _taggedTemplateLiteral(["Weapon of the Pastalord"]))))).while_("hasskill Cannelloni Cannon", Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject135 || (_templateObject135 = _taggedTemplateLiteral(["Cannelloni Cannon"]))))).while_("hasskill Wave of Sauce", Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject136 || (_templateObject136 = _taggedTemplateLiteral(["Wave of Sauce"]))))).while_("hasskill Saucestorm", Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject137 || (_templateObject137 = _taggedTemplateLiteral(["Saucestorm"]))))).while_("hasskill Lunging Thrust-Smack", Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject138 || (_templateObject138 = _taggedTemplateLiteral(["Lunging Thrust-Smack"]))))).attack().repeat();
    }
  }, {
    key: "basicCombat",
    value: function basicCombat() {
      return this.startCombat().kill();
    }
  }, {
    key: "ghostBustin",
    value: function ghostBustin() {
      var _classStun;

      // Only bust ghosts if you have enough stunners to prevent getting hit
      var stunRounds = 0;
      var classStun = null;
      var extraStun = null;
      if ((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject139 || (_templateObject139 = _taggedTemplateLiteral(["Rain-Doh blue balls"]))))) stunRounds++;
      if ((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("lovebugsUnlocked")) stunRounds++;

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$class */ ._$)(_templateObject140 || (_templateObject140 = _taggedTemplateLiteral(["Seal Clubber"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject141 || (_templateObject141 = _taggedTemplateLiteral(["Club Foot"])))) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() >= (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mpCost)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject142 || (_templateObject142 = _taggedTemplateLiteral(["Club Foot"]))))) {
        var clubRounds = Math.min((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFury)(), 3) + ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemType)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedItem)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$slot */ .Jh)(_templateObject143 || (_templateObject143 = _taggedTemplateLiteral(["weapon"]))))) === "club" ? 1 : 0) - 1;

        if (stunRounds > 0) {
          classStun = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject144 || (_templateObject144 = _taggedTemplateLiteral(["Club Foot"])));
          stunRounds += clubRounds;
        }
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$class */ ._$)(_templateObject145 || (_templateObject145 = _taggedTemplateLiteral(["Turtle Tamer"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject146 || (_templateObject146 = _taggedTemplateLiteral(["Shell Up"])))) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() >= (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mpCost)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject147 || (_templateObject147 = _taggedTemplateLiteral(["Shell Up"]))))) {
        var shellRounds = ((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject148 || (_templateObject148 = _taggedTemplateLiteral(["Blessing of the Storm Tortoise"])))) ? 2 : 0) + ((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject149 || (_templateObject149 = _taggedTemplateLiteral(["Grand Blessing of the Storm Tortoise"])))) ? 3 : 0) + ((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject150 || (_templateObject150 = _taggedTemplateLiteral(["Glorious Blessing of the Storm Tortoise"])))) ? 4 : 0);

        if (shellRounds > 0) {
          classStun = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject151 || (_templateObject151 = _taggedTemplateLiteral(["Shell Up"])));
          stunRounds += shellRounds;
        }
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$class */ ._$)(_templateObject152 || (_templateObject152 = _taggedTemplateLiteral(["Pastamancer"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject153 || (_templateObject153 = _taggedTemplateLiteral(["Entangling Noodles"])))) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() >= (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mpCost)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject154 || (_templateObject154 = _taggedTemplateLiteral(["Entangling Noodles"]))))) {
        classStun = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject155 || (_templateObject155 = _taggedTemplateLiteral(["Entangling Noodles"])));
        stunRounds += 2;
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$class */ ._$)(_templateObject156 || (_templateObject156 = _taggedTemplateLiteral(["Sauceror"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject157 || (_templateObject157 = _taggedTemplateLiteral(["Soul Bubble"])))) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mySoulsauce)() >= 5) {
        classStun = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject158 || (_templateObject158 = _taggedTemplateLiteral(["Soul Bubble"])));
        stunRounds += 2;
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$class */ ._$)(_templateObject159 || (_templateObject159 = _taggedTemplateLiteral(["Accordion Thief"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject160 || (_templateObject160 = _taggedTemplateLiteral(["Accordion Bash"])))) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemType)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedItem)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$slot */ .Jh)(_templateObject161 || (_templateObject161 = _taggedTemplateLiteral(["weapon"]))))) === "accordion" && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() >= (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mpCost)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject162 || (_templateObject162 = _taggedTemplateLiteral(["Accordion Bash"]))))) {
        classStun = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject163 || (_templateObject163 = _taggedTemplateLiteral(["Accordion Bash"])));
        stunRounds += 2;
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$class */ ._$)(_templateObject164 || (_templateObject164 = _taggedTemplateLiteral(["Disco Bandit"])))) {// Rave Knockout seems like a pain
      } // Don't use shadow noodles unless we really need it.


      if (stunRounds < 3 && classStun !== (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject165 || (_templateObject165 = _taggedTemplateLiteral(["Entangling Noodles"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject166 || (_templateObject166 = _taggedTemplateLiteral(["Shadow Noodles"])))) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() >= (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mpCost)((_classStun = classStun) !== null && _classStun !== void 0 ? _classStun : (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject167 || (_templateObject167 = _taggedTemplateLiteral(["none"])))) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mpCost)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject168 || (_templateObject168 = _taggedTemplateLiteral(["Shadow Noodles"]))))) {
        extraStun = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject169 || (_templateObject169 = _taggedTemplateLiteral(["Shadow Noodles"])));
        stunRounds += 2;
      } // Lacking multi-round stuns


      if (stunRounds < 3) {
        return this.basicCombat();
      }

      return this.tryHaveSkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject170 || (_templateObject170 = _taggedTemplateLiteral(["Sing Along"])))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$familiar */ .HP)(_templateObject171 || (_templateObject171 = _taggedTemplateLiteral(["Grey Goose"]))) && (0,_familiar__WEBPACK_IMPORTED_MODULE_1__/* .timeToMeatify */ .kZ)(), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject172 || (_templateObject172 = _taggedTemplateLiteral(["Meatify Matter"]))))).tryHaveItem((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject173 || (_templateObject173 = _taggedTemplateLiteral(["Rain-Doh blue balls"])))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("lovebugsUnlocked"), Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject174 || (_templateObject174 = _taggedTemplateLiteral(["Summon Love Gnats"]))))).tryHaveSkill(classStun).tryHaveSkill(extraStun).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject175 || (_templateObject175 = _taggedTemplateLiteral(["Shoot Ghost"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject176 || (_templateObject176 = _taggedTemplateLiteral(["Shoot Ghost"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject177 || (_templateObject177 = _taggedTemplateLiteral(["Shoot Ghost"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject178 || (_templateObject178 = _taggedTemplateLiteral(["Trap Ghost"])))).kill();
    }
  }], [{
    key: "tryHaveSkill",
    value: function tryHaveSkill(skill) {
      return new Macro().tryHaveSkill(skill);
    }
  }, {
    key: "tryHaveItem",
    value: function tryHaveItem(item) {
      return new Macro().tryHaveItem(item);
    }
  }, {
    key: "tryCopier",
    value: function tryCopier(itemOrSkill) {
      return new Macro().tryCopier(itemOrSkill);
    }
  }, {
    key: "meatKill",
    value: function meatKill() {
      return new Macro().meatKill();
    }
  }, {
    key: "meatStasis",
    value: function meatStasis(checkPassive) {
      return new Macro().meatStasis(checkPassive);
    }
  }, {
    key: "startCombat",
    value: function startCombat() {
      return new Macro().startCombat();
    }
  }, {
    key: "kill",
    value: function kill() {
      return new Macro().kill();
    }
  }, {
    key: "basicCombat",
    value: function basicCombat() {
      return new Macro().basicCombat();
    }
  }, {
    key: "ghostBustin",
    value: function ghostBustin() {
      return new Macro().ghostBustin();
    }
  }]);

  return Macro;
}(libram__WEBPACK_IMPORTED_MODULE_8__/* .StrictMacro */ .t$);
/**
 * Attempt to perform a nonstandard combat-starting Action with a Macro
 * @param macro The Macro to attempt to use
 * @param action The combat-starting action to attempt
 * @param tryAuto Whether or not we should try to resolve the combat with an autoattack; autoattack macros can fail against special monsters, and thus we have to submit a macro with Macro.save() regardless
 * @returns The output of your specified action function (typically void)
 */

function withMacro(macro, action) {
  var tryAuto = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getAutoAttack)() !== 0) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setAutoAttack)(0);
  if (tryAuto) macro.setAutoAttack();
  macro.save();

  try {
    return action();
  } finally {
    Macro.clearSaved();
    if (tryAuto) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setAutoAttack)(0);
  }
}
function main() {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$effect */ ._G)(_templateObject179 || (_templateObject179 = _taggedTemplateLiteral(["Eldritch Attunement"]))))) {
    Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monster */ .O4)(_templateObject180 || (_templateObject180 = _taggedTemplateLiteral(["Eldritch Tentacle"]))), Macro.basicCombat()).step(Macro.load()).submit();
  } else if ((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .getTodaysHolidayWanderers */ .UL)().length !== 0) {
    Macro.ifHolidayWanderer(Macro.externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$item */ .xr)(_templateObject181 || (_templateObject181 = _taggedTemplateLiteral(["backup camera"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("_backUpUses") < 11 && (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .get */ .U2)("lastCopyableMonster") === (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$monster */ .O4)(_templateObject182 || (_templateObject182 = _taggedTemplateLiteral(["Knob Goblin Embezzler"]))) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === (0,_familiar__WEBPACK_IMPORTED_MODULE_1__/* .meatFamiliar */ .M2)(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .$skill */ .tm)(_templateObject183 || (_templateObject183 = _taggedTemplateLiteral(["Back-Up to your Last Enemy"])))).step(Macro.load()), Macro.basicCombat())).step(Macro.load()).submit();
  } else {
    Macro.load().submit();
  }

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inMultiFight)()) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.choiceFollowsFight)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("choice.php");
}

/***/ }),

/***/ 4033:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports mallMin, bestConsumable, potionMenu, computeDiet, consumeDiet, runDiet */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2474);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9574);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(678);
/* harmony import */ var _acquire__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4564);
/* harmony import */ var _clan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5897);
/* harmony import */ var _embezzler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4936);
/* harmony import */ var _extrovermectin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5836);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7442);
/* harmony import */ var _mood__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(614);
/* harmony import */ var _potions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2249);
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(742);
/* harmony import */ var _synthesis__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8845);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104, _templateObject105, _templateObject106, _templateObject107, _templateObject108, _templateObject109, _templateObject110, _templateObject111, _templateObject112, _templateObject113, _templateObject114, _templateObject115, _templateObject116, _templateObject117, _templateObject118, _templateObject119, _templateObject120, _templateObject121, _templateObject122, _templateObject123, _templateObject124, _templateObject125, _templateObject126, _templateObject127, _templateObject128, _templateObject129, _templateObject130, _templateObject131, _templateObject132, _templateObject133, _templateObject134, _templateObject135, _templateObject136, _templateObject137, _templateObject138, _templateObject139, _templateObject140, _templateObject141, _templateObject142, _templateObject143, _templateObject144, _templateObject145, _templateObject146, _templateObject147, _templateObject148, _templateObject149, _templateObject150, _templateObject151, _templateObject152, _templateObject153, _templateObject154, _templateObject155, _templateObject156, _templateObject157, _templateObject158, _templateObject159, _templateObject160, _templateObject161, _templateObject162, _templateObject163, _templateObject164, _templateObject165, _templateObject166, _templateObject167, _templateObject168, _templateObject169, _templateObject170, _templateObject171, _templateObject172, _templateObject173, _templateObject174, _templateObject175, _templateObject176, _templateObject177, _templateObject178, _templateObject179, _templateObject180, _templateObject181, _templateObject182, _templateObject183, _templateObject184, _templateObject185, _templateObject186, _templateObject187, _templateObject188, _templateObject189, _templateObject190, _templateObject191, _templateObject192;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }












var MPA = (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("valueOfAdventure");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Using adventure value ".concat(MPA, "."), _lib__WEBPACK_IMPORTED_MODULE_5__/* .HIGHLIGHT */ .X2);
var Mayo = libram__WEBPACK_IMPORTED_MODULE_11__/* .Mayo */ .DH;

function eatSafe(qty, item) {
  if (have($item(_templateObject || (_templateObject = _taggedTemplateLiteral(["Universal Seasoning"])))) && !get("_universalSeasoningUsed")) {
    use($item(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Universal Seasoning"]))));
  }

  if (myLevel() >= 15 && !get("_hungerSauceUsed") && mallPrice($item(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Hunger\u2122 Sauce"])))) < 3 * MPA) {
    acquire(1, $item(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Hunger\u2122 Sauce"]))), 3 * MPA);
    use($item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Hunger\u2122 Sauce"]))));
  }

  if (mallPrice($item(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["fudge spork"])))) < 3 * MPA && !get("_fudgeSporkUsed")) {
    eat($item(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["fudge spork"]))));
  }

  useIfUnused($item(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["milk of magnesium"]))), "_milkOfMagnesiumUsed", 5 * MPA);
  if (!eat(qty, item)) throw "Failed to eat safely";
}

function drinkSafe(qty, item) {
  var prevDrunk = myInebriety();

  if (have($skill(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["The Ode to Booze"]))))) {
    var odeTurns = qty * item.inebriety;
    var castTurns = odeTurns - haveEffect($effect(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Ode to Booze"]))));

    if (castTurns > 0) {
      useSkill($skill(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["The Ode to Booze"]))), Math.ceil(castTurns / turnsPerCast($skill(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["The Ode to Booze"]))))));
    }
  }

  if (!drink(qty, item)) throw "Failed to drink safely";

  if (item.inebriety === 1 && prevDrunk === qty + myInebriety() - 1) {
    // sometimes mafia does not track the mime army shotglass property
    setProperty("_mimeArmyShotglassUsed", "true");
  }
}

function chewSafe(qty, item) {
  if (!chew(qty, item)) throw "Failed to chew safely";
}

function consumeSafe(qty, item, additionalValue, skipAcquire) {
  var spleenCleaned = spleenCleaners.get(item);

  if (spleenCleaned && mySpleenUse() < spleenCleaned) {
    throw "No spleen to clear with this.";
  }

  var averageAdventures = getAverageAdventures(item);

  if (!skipAcquire && (averageAdventures > 0 || additionalValue)) {
    var cap = Math.max(0, averageAdventures * MPA) + (additionalValue !== null && additionalValue !== void 0 ? additionalValue : 0);
    acquire(qty, item, cap);
  } else if (!skipAcquire) {
    acquire(qty, item);
  }

  if (itemType(item) === "food" || item === saladFork) eatSafe(qty, item);else if (itemType(item) === "booze" || item === frostyMug) drinkSafe(qty, item);else if (itemType(item) === "spleen item") chewSafe(qty, item);else use(qty, item);
}

function propTrue(prop) {
  if (typeof prop === "boolean") {
    return prop;
  } else {
    return get(prop);
  }
}

function useIfUnused(item, prop, maxPrice) {
  if (!propTrue(prop)) {
    if (mallPrice(item) <= maxPrice) {
      acquire(1, item, maxPrice, false);
      if (!have(item)) return;
      use(1, item);
    } else {
      print("Skipping ".concat(item.name, "; too expensive (").concat(mallPrice(item), " > ").concat(maxPrice, ")."));
    }
  }
}

function nonOrganAdventures() {
  useIfUnused($item(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["fancy chocolate car"]))), get("_chocolatesUsed") !== 0, 2 * MPA);

  while (get("_loveChocolatesUsed") < 3) {
    var price = have($item(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["LOV Extraterrestrial Chocolate"])))) ? 15000 : 20000;
    var value = clamp(3 - get("_loveChocolatesUsed"), 0, 3) * get("valueOfAdventure");
    if (value < price) break;

    if (!have($item(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["LOV Extraterrestrial Chocolate"]))))) {
      Kmail.send("sellbot", "".concat($item(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["LOV Extraterrestrial Chocolate"]))).name, " (1)"), undefined, 20000);
      wait(11);
      cliExecute("refresh inventory");

      if (!have($item(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["LOV Extraterrestrial Chocolate"]))))) {
        print("I'm tired of waiting for sellbot to send me some chocolate", "red");
        break;
      }
    }

    use($item(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["LOV Extraterrestrial Chocolate"]))));
  }

  var chocos = new Map([[$class(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["Seal Clubber"]))), $item(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["chocolate seal-clubbing club"])))], [$class(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["Turtle Tamer"]))), $item(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["chocolate turtle totem"])))], [$class(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Pastamancer"]))), $item(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["chocolate pasta spoon"])))], [$class(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["Sauceror"]))), $item(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["chocolate saucepan"])))], [$class(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["Accordion Thief"]))), $item(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["chocolate stolen accordion"])))], [$class(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["Disco Bandit"]))), $item(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["chocolate disco ball"])))]]);
  var classChoco = chocos.get(myClass());

  var chocExpVal = (remaining, item) => {
    var advs = [0, 0, 1, 2, 3][remaining + (item === classChoco ? 1 : 0)];
    return advs * MPA - mallPrice(item);
  };

  var chocosRemaining = clamp(3 - get("_chocolatesUsed"), 0, 3);

  var _loop = function _loop(i) {
    var chocoVals = Array.from(chocos.values()).map(choc => {
      return {
        choco: choc,
        value: chocExpVal(i, choc)
      };
    });
    var best = chocoVals.sort((a, b) => b.value - a.value)[0];

    if (best.value > 0) {
      acquire(1, best.choco, best.value + mallPrice(best.choco), false);
      use(1, best.choco);
    } else return "break";
  };

  for (var i = chocosRemaining; i > 0; i--) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }

  useIfUnused($item(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["fancy chocolate sculpture"]))), get("_chocolateSculpturesUsed") < 1, 5 * MPA + 5000);
  useIfUnused($item(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["essential tofu"]))), "_essentialTofuUsed", 5 * MPA);

  if (!get("_etchedHourglassUsed") && have($item(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["etched hourglass"]))))) {
    use(1, $item(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["etched hourglass"]))));
  }

  if (getProperty("_timesArrowUsed") !== "true" && mallPrice($item(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["time's arrow"])))) < 5 * MPA) {
    acquire(1, $item(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["time's arrow"]))), 5 * MPA);
    cliExecute("csend 1 time's arrow to botticelli");
    setProperty("_timesArrowUsed", "true");
  }

  if (have($skill(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["Ancestral Recall"])))) && mallPrice($item(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["blue mana"])))) < 3 * MPA) {
    var casts = Math.max(10 - get("_ancestralRecallCasts"), 0);
    acquire(casts, $item(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["blue mana"]))), 3 * MPA);
    useSkill(casts, $skill(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["Ancestral Recall"]))));
  }

  if (globalOptions.ascending) useIfUnused($item(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["borrowed time"]))), "_borrowedTimeUsed", 5 * MPA);
}

function pillCheck() {
  if (!get("_distentionPillUsed")) {
    if (!get("garbo_skipPillCheck", false) && !have($item(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["distention pill"]))), 1)) {
      set("garbo_skipPillCheck", userConfirmDialog("You do not have any distention pills. Continue anyway? (Defaulting to no in 15 seconds)", false, 15000));
    }
  }

  if (!get("_syntheticDogHairPillUsed")) {
    if (!get("garbo_skipPillCheck", false) && !have($item(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["synthetic dog hair pill"]))), 1)) {
      set("garbo_skipPillCheck", userConfirmDialog("You do not have any synthetic dog hair pills. Continue anyway? (Defaulting to no in 15 seconds)", false, 15000));
    }
  }
}

var saladFork = (0,libram__WEBPACK_IMPORTED_MODULE_13__/* .$item */ .xr)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["Ol' Scratch's salad fork"])));
var frostyMug = (0,libram__WEBPACK_IMPORTED_MODULE_13__/* .$item */ .xr)(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Frosty's frosty mug"])));
var spleenCleaners = new Map([[(0,libram__WEBPACK_IMPORTED_MODULE_13__/* .$item */ .xr)(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["extra-greasy slider"]))), 5], [(0,libram__WEBPACK_IMPORTED_MODULE_13__/* .$item */ .xr)(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["jar of fermented pickle juice"]))), 5], [(0,libram__WEBPACK_IMPORTED_MODULE_13__/* .$item */ .xr)(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["mojo filter"]))), 1]]);
var stomachLiverCleaners = new Map([[(0,libram__WEBPACK_IMPORTED_MODULE_13__/* .$item */ .xr)(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["spice melange"]))), [-3, -3]], [(0,libram__WEBPACK_IMPORTED_MODULE_13__/* .$item */ .xr)(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["synthetic dog hair pill"]))), [0, -1]], [(0,libram__WEBPACK_IMPORTED_MODULE_13__/* .$item */ .xr)(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["cuppa Sobrie tea"]))), [0, -1]], [(0,libram__WEBPACK_IMPORTED_MODULE_13__/* .$item */ .xr)(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["designer sweatpants"]))), [0, -1]]]);
var mallMin = items => argmax(items.map(i => [i, -mallPrice(i)]));
/**
 * Generate a basic menu of high-yield items to consider
 * @returns basic menu
 */

function menu() {
  var spaghettiBreakfast = have($item(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["spaghetti breakfast"])))) && myFullness() === 0 && get("_timeSpinnerFoodAvailable") === "" && !get("_spaghettiBreakfastEaten") ? 1 : 0;
  /*
   * generated in mafia with an account that has super human cocktail crafting
   *  > js Item.all().filter((item) => item.inebriety > 0 && item.quality === "EPIC" && getIngredients(item)["mushroom fermenting powder]).join(", ")
   */

  var complexMushroomWines = $items(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["overpowering mushroom wine, complex mushroom wine, smooth mushroom wine, blood-red mushroom wine, buzzing mushroom wine, swirling mushroom wine"])));
  /*
   * generated in mafia with:
   *  > js Item.all().filter((item) => item.inebriety > 0 && getIngredients(item)["perfect ice cube"]).join(", ")
   */

  var perfectDrinks = $items(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["perfect cosmopolitan, perfect negroni, perfect dark and stormy, perfect mimosa, perfect old-fashioned, perfect paloma"])));
  /*
   * generated in mafia with an account that has Transcendental Noodlecraft
   *  > js Item.all().filter((item) => item.fullness > 0 && item.name.indexOf("lasagna") > 0 && getIngredients(item)["savory dry noodles"]).join(", ")
   */

  var lasagnas = $items(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["fishy fish lasagna, gnat lasagna, long pork lasagna"])));
  var smallEpics = [].concat(_toConsumableArray($items(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["meteoreo, ice rice"])))), [$item(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral(["Tea, Earl Grey, Hot"])))]);
  var boxingDayCareItems = $items(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["glass of raw eggs, punch-drunk punch"]))).filter(item => have(item));
  var pilsners = $items(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(["astral pilsner"]))).filter(item => globalOptions.ascending && have(item));
  var limitedItems = [].concat(_toConsumableArray(boxingDayCareItems), _toConsumableArray(pilsners)).map(item => new MenuItem(item, {
    maximum: availableAmount(item)
  }));
  return [// FOOD
  new MenuItem($item(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["Dreadsylvanian spooky pocket"])))), new MenuItem($item(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["tin cup of mulligan stew"])))), new MenuItem($item(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["frozen banquet"])))), new MenuItem($item(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["deviled egg"])))), new MenuItem($item(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["spaghetti breakfast"]))), {
    maximum: spaghettiBreakfast
  }), new MenuItem($item(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["extra-greasy slider"])))), new MenuItem(mallMin(lasagnas)), new MenuItem(mallMin(smallEpics)), new MenuItem($item(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["green hamhock"])))), // BOOZE
  new MenuItem($item(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral(["elemental caipiroska"])))), new MenuItem($item(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["moreltini"])))), new MenuItem($item(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral(["Dreadsylvanian grimlet"])))), new MenuItem($item(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral(["Hodgman's blanket"])))), new MenuItem($item(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral(["Sacramento wine"])))), new MenuItem($item(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral(["iced plum wine"])))), new MenuItem($item(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral(["splendid martini"])))), new MenuItem($item(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral(["Eye and a Twist"])))), new MenuItem($item(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral(["jar of fermented pickle juice"])))), new MenuItem(mallMin(complexMushroomWines)), new MenuItem(mallMin(perfectDrinks)), new MenuItem($item(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral(["green eggnog"])))), // SPLEEN
  new MenuItem($item(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral(["octolus oculus"])))), new MenuItem($item(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral(["prismatic wad"])))), new MenuItem($item(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral(["transdermal smoke patch"])))), new MenuItem($item(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral(["antimatter wad"])))), new MenuItem($item(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral(["voodoo snuff"])))), new MenuItem($item(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral(["blood-drive sticker"]))))].concat(_toConsumableArray(limitedItems), [// HELPERS
  new MenuItem($item(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral(["distention pill"])))), new MenuItem($item(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral(["cuppa Voraci tea"])))), new MenuItem(Mayo.flex), new MenuItem(Mayo.zapine), new MenuItem($item(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral(["Special Seasoning"])))), new MenuItem(saladFork), new MenuItem(frostyMug), new MenuItem($item(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral(["mojo filter"])))), new MenuItem($item(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral(["pocket wish"]))), {
    maximum: 1,
    effect: $effect(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral(["Refined Palate"])))
  }), new MenuItem($item(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral(["toasted brie"]))), {
    maximum: 1
  }), new MenuItem($item(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral(["potion of the field gar"]))), {
    maximum: 1
  })], _toConsumableArray(_toConsumableArray(stomachLiverCleaners.keys()).map(item => new MenuItem(item))), [new MenuItem($item(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral(["sweet tooth"]))), {
    size: -1,
    organ: "food",
    maximum: 1
  }), new MenuItem($item(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral(["designer sweatpants"]))), {
    size: -1,
    organ: "booze",
    maximum: Math.min(3 - get("_sweatOutSomeBoozeUsed"), Math.floor(get("sweat") / 25))
  })]);
}

function bestConsumable(organType, restrictList, maxSize) {
  var fullMenu = potionMenu(menu(), 0, 0);
  var organMenu = fullMenu.filter(menuItem => itemType(menuItem.item) === organType);

  if (restrictList) {
    if (restrictList instanceof Item) {
      organMenu = organMenu.filter(menuItem => restrictList !== menuItem.item);
    } else {
      organMenu = organMenu.filter(menuItem => !restrictList.includes(menuItem.item));
    }
  }

  if (maxSize) {
    organMenu = organMenu.filter(MenuItem => MenuItem.size <= maxSize);
  }

  var organList = organMenu.map(consumable => {
    var edible = consumable.item;
    var buff = getModifier("Effect", edible);
    var turnsPerUse = getModifier("Effect Duration", edible);
    var meatDrop = getModifier("Meat Drop", buff);
    var famWeight = getModifier("Familiar Weight", buff);
    var buffValue = (meatDrop + famWeight * 25 / 10) * turnsPerUse * (baseMeat + 750) / 100;
    var advValue = getAverageAdventures(edible) * get("valueOfAdventure");
    var organSpace = consumable.size;
    return {
      edible: edible,
      value: (buffValue + advValue - mallPrice(edible)) / organSpace
    };
  });
  var best = organList.sort((a, b) => b.value - a.value)[0];
  return best;
}

function gregariousCount() {
  var gregariousCharges = get("beGregariousCharges") + (get("beGregariousFightsLeft") > 0 && get("beGregariousMonster") === $monster(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral(["Knob Goblin Embezzler"]))) ? 1 : 0);
  var gregariousFightsPerCharge = expectedGregs(); // remove and preserve the last index - that is the marginal count of gregarious fights

  var marginalGregariousFights = gregariousFightsPerCharge.splice(gregariousFightsPerCharge.length - 1, 1)[0];
  var expectedGregariousFights = gregariousFightsPerCharge.slice(gregariousCharges);
  return {
    expectedGregariousFights: expectedGregariousFights,
    marginalGregariousFights: marginalGregariousFights
  };
}

function copiers() {
  // assuming embezzler is worth 4 * MPA and a marginal turn is 1 * MPA, the differential is 3 * MPA
  var embezzlerDifferential = 3 * MPA;

  var _gregariousCount = gregariousCount(),
      expectedGregariousFights = _gregariousCount.expectedGregariousFights,
      marginalGregariousFights = _gregariousCount.marginalGregariousFights;

  var extros = myInebriety() > inebrietyLimit() ? [] : [].concat(_toConsumableArray(expectedGregariousFights.map(embezzlers => new MenuItem($item(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral(["Extrovermectin\u2122"]))), {
    additionalValue: embezzlers * embezzlerDifferential,
    maximum: 1
  }))), [new MenuItem($item(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral(["Extrovermectin\u2122"]))), {
    additionalValue: marginalGregariousFights * embezzlerDifferential
  })]);
  return _toConsumableArray(extros);
}

function countCopies(diet) {
  // this only counts the copies not yet realized
  // any copies already realized will be properly counted by embezzlerCount
  // returns an array of expected counts for number of greg copies to fight per pill use
  // the last value is how much you expect to fight per pill
  var extros = sumNumbers(diet.entries.map(dietEntry => dietEntry.menuItems.some(menuItem => menuItem.item === $item(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral(["Extrovermectin\u2122"])))) ? dietEntry.quantity : 0));

  var _gregariousCount2 = gregariousCount(),
      expectedGregariousFights = _gregariousCount2.expectedGregariousFights,
      marginalGregariousFights = _gregariousCount2.marginalGregariousFights; // slice will never return an array that is bigger than the original array


  var replaceExtros = sumNumbers(expectedGregariousFights.slice(0, extros));
  var bonusExtros = clamp(extros - expectedGregariousFights.length, 0, extros) * marginalGregariousFights;
  return replaceExtros + bonusExtros;
}

function ingredientCost(item) {
  var ingredientMallPrice = mallPrice(item);
  var ingredientAutosellPrice = autosellPrice(item);

  if (!have(item) || item.tradeable && ingredientMallPrice > Math.max(100, 2 * ingredientAutosellPrice)) {
    return ingredientMallPrice;
  }

  return ingredientAutosellPrice;
}
/**
 * Generate a potion diet that has entries
 * @param embezzlers number of embezzlers expected to be encountered on this day
 * @param turns number of turns total expecte
 */


function potionMenu(baseMenu, embezzlers, turns) {
  function limitedPotion(input, limit) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (limit === 0) {
      return [];
    }

    var potion = input instanceof Item ? new Potion(input) : input;
    var mayo = undefined;

    if (itemType(potion.potion) === "food" && MayoClinic.installed()) {
      potion = potion.doubleDuration();
      mayo = Mayo.zapine;
    }

    return potion.value(embezzlers, turns, limit).map(tier => new MenuItem(potion.potion, {
      maximum: tier.quantity,
      additionalValue: tier.value,
      priceOverride: options.price,
      organ: options.organ,
      size: options.size,
      data: tier.name,
      mayo: mayo
    }));
  }

  function potion(potion) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return limitedPotion(potion, undefined, options);
  }

  var speakeasy = $item(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral(["Clan speakeasy"])));
  var hasSpeakeasy = getClanLounge()["".concat(speakeasy)];
  var twiceHauntedPrice = Math.min(ingredientCost($item(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral(["haunted orange"])))), ingredientCost($item(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral(["orange"])))) + ingredientCost($item(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral(["ghostly ectoplasm"]))))) + Math.min(ingredientCost($item(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral(["haunted bottle of vodka"])))), ingredientCost($item(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral(["bottle of vodka"])))) + ingredientCost($item(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral(["ghostly ectoplasm"])))));
  var campfireHotdog = get("getawayCampsiteUnlocked") ? potion($item(_templateObject105 || (_templateObject105 = _taggedTemplateLiteral(["campfire hot dog"]))), {
    price: ingredientCost($item(_templateObject106 || (_templateObject106 = _taggedTemplateLiteral(["stick of firewood"]))))
  }) : [];
  var foodCone = realmAvailable("stench") || globalOptions.simulateDiet && !globalOptions.noBarf ? limitedPotion($item(_templateObject107 || (_templateObject107 = _taggedTemplateLiteral(["Dinsey food-cone"]))), Math.floor(availableAmount($item(_templateObject108 || (_templateObject108 = _taggedTemplateLiteral(["FunFunds\u2122"])))) / 2), {
    price: 2 * garboValue($item(_templateObject109 || (_templateObject109 = _taggedTemplateLiteral(["FunFunds\u2122"]))))
  }) : [];
  return [].concat(_toConsumableArray(baseMenu), _toConsumableArray(copiers()), _toConsumableArray(potion($item(_templateObject110 || (_templateObject110 = _taggedTemplateLiteral(["jumping horseradish"]))))), _toConsumableArray(potion($item(_templateObject111 || (_templateObject111 = _taggedTemplateLiteral(["tempura cauliflower"]))))), _toConsumableArray(potion($item(_templateObject112 || (_templateObject112 = _taggedTemplateLiteral(["sea truffle"]))))), _toConsumableArray(potion($item(_templateObject113 || (_templateObject113 = _taggedTemplateLiteral(["tempura broccoli"]))))), _toConsumableArray(potion($item(_templateObject114 || (_templateObject114 = _taggedTemplateLiteral(["Miserable Pie"]))))), _toConsumableArray(potion($item(_templateObject115 || (_templateObject115 = _taggedTemplateLiteral(["Every Day is Like This Sundae"]))))), _toConsumableArray(potion($item(_templateObject116 || (_templateObject116 = _taggedTemplateLiteral(["bowl of mummy guts"]))))), _toConsumableArray(potion($item(_templateObject117 || (_templateObject117 = _taggedTemplateLiteral(["haunted Hell ramen"]))))), _toConsumableArray(campfireHotdog), _toConsumableArray(foodCone), _toConsumableArray(potion($item(_templateObject118 || (_templateObject118 = _taggedTemplateLiteral(["dirt julep"]))))), _toConsumableArray(potion($item(_templateObject119 || (_templateObject119 = _taggedTemplateLiteral(["Ambitious Turkey"]))))), _toConsumableArray(potion($item(_templateObject120 || (_templateObject120 = _taggedTemplateLiteral(["Friendly Turkey"]))))), _toConsumableArray(potion($item(_templateObject121 || (_templateObject121 = _taggedTemplateLiteral(["vintage smart drink"]))))), _toConsumableArray(potion($item(_templateObject122 || (_templateObject122 = _taggedTemplateLiteral(["Strikes Again Bigmouth"]))))), _toConsumableArray(potion($item(_templateObject123 || (_templateObject123 = _taggedTemplateLiteral(["Irish Coffee, English Heart"]))))), _toConsumableArray(potion($item(_templateObject124 || (_templateObject124 = _taggedTemplateLiteral(["Jack-O-Lantern beer"]))))), _toConsumableArray(potion($item(_templateObject125 || (_templateObject125 = _taggedTemplateLiteral(["Amnesiac Ale"]))))), _toConsumableArray(potion($item(_templateObject126 || (_templateObject126 = _taggedTemplateLiteral(["mentholated wine"]))))), _toConsumableArray(potion($item(_templateObject127 || (_templateObject127 = _taggedTemplateLiteral(["Feliz Navidad"]))))), _toConsumableArray(potion($item(_templateObject128 || (_templateObject128 = _taggedTemplateLiteral(["broberry brogurt"]))))), _toConsumableArray(potion($item(_templateObject129 || (_templateObject129 = _taggedTemplateLiteral(["haunted martini"]))))), _toConsumableArray(potion($item(_templateObject130 || (_templateObject130 = _taggedTemplateLiteral(["twice-haunted screwdriver"]))), {
    price: twiceHauntedPrice
  })), _toConsumableArray(limitedPotion($item(_templateObject131 || (_templateObject131 = _taggedTemplateLiteral(["high-end ginger wine"]))), availableAmount($item(_templateObject132 || (_templateObject132 = _taggedTemplateLiteral(["high-end ginger wine"])))))), _toConsumableArray(limitedPotion($item(_templateObject133 || (_templateObject133 = _taggedTemplateLiteral(["Hot Socks"]))), hasSpeakeasy ? 3 : 0, {
    price: 5000
  })), _toConsumableArray(realmAvailable("sleaze") && sellsItem($coinmaster(_templateObject134 || (_templateObject134 = _taggedTemplateLiteral(["The Frozen Brogurt Stand"]))), $item(_templateObject135 || (_templateObject135 = _taggedTemplateLiteral(["broberry brogurt"])))) ? limitedPotion($item(_templateObject136 || (_templateObject136 = _taggedTemplateLiteral(["broberry brogurt"]))), Math.floor(itemAmount($item(_templateObject137 || (_templateObject137 = _taggedTemplateLiteral(["Beach Buck"])))) / 10), {
    price: 10 * garboValue($item(_templateObject138 || (_templateObject138 = _taggedTemplateLiteral(["Beach Buck"]))))
  }) : []), _toConsumableArray(potion($item(_templateObject139 || (_templateObject139 = _taggedTemplateLiteral(["cute mushroom"]))))), _toConsumableArray(potion($item(_templateObject140 || (_templateObject140 = _taggedTemplateLiteral(["beggin' cologne"]))))), _toConsumableArray(potion($item(_templateObject141 || (_templateObject141 = _taggedTemplateLiteral(["Knob Goblin nasal spray"]))))), _toConsumableArray(potion($item(_templateObject142 || (_templateObject142 = _taggedTemplateLiteral(["handful of Smithereens"]))))), _toConsumableArray(potion($item(_templateObject143 || (_templateObject143 = _taggedTemplateLiteral(["black striped oyster egg"]))))), _toConsumableArray(potion($item(_templateObject144 || (_templateObject144 = _taggedTemplateLiteral(["black paisley oyster egg"]))))), _toConsumableArray(potion($item(_templateObject145 || (_templateObject145 = _taggedTemplateLiteral(["black polka-dot oyster egg"]))))), _toConsumableArray(potion($item(_templateObject146 || (_templateObject146 = _taggedTemplateLiteral(["lustrous oyster egg"]))))), _toConsumableArray(potion($item(_templateObject147 || (_templateObject147 = _taggedTemplateLiteral(["glimmering buzzard feather"]))))), _toConsumableArray(potion($item(_templateObject148 || (_templateObject148 = _taggedTemplateLiteral(["Knob Goblin pet-buffing spray"]))))), _toConsumableArray(potion($item(_templateObject149 || (_templateObject149 = _taggedTemplateLiteral(["abstraction: joy"]))))), _toConsumableArray(potion($item(_templateObject150 || (_templateObject150 = _taggedTemplateLiteral(["beastly paste"]))))), _toConsumableArray(potion($item(_templateObject151 || (_templateObject151 = _taggedTemplateLiteral(["gleaming oyster egg"]))))), _toConsumableArray(potion($item(_templateObject152 || (_templateObject152 = _taggedTemplateLiteral(["Party-in-a-Can\u2122"]))))), _toConsumableArray(limitedPotion($item(_templateObject153 || (_templateObject153 = _taggedTemplateLiteral(["body spradium"]))), clamp(availableAmount($item(_templateObject154 || (_templateObject154 = _taggedTemplateLiteral(["body spradium"])))), 0, 1))), _toConsumableArray(have($skill(_templateObject155 || (_templateObject155 = _taggedTemplateLiteral(["Sweet Synthesis"])))) ? potion(new Potion($item(_templateObject156 || (_templateObject156 = _taggedTemplateLiteral(["Rethinking Candy"]))), {
    effect: $effect(_templateObject157 || (_templateObject157 = _taggedTemplateLiteral(["Synthesis: Greed"]))),
    duration: 30
  }), {
    size: 1,
    organ: "spleen item",
    price: 0
  }) : []));
}

function balanceMenu(baseMenu, dietPlanner) {
  var baseEmbezzlers = embezzlerCount();

  function rebalance(menu, iterations, embezzlers, adventures) {
    var fullMenu = potionMenu(menu, baseEmbezzlers + embezzlers, estimatedTurns() + adventures);

    if (iterations <= 0) {
      return fullMenu;
    } else {
      var balancingDiet = dietPlanner(fullMenu);
      return rebalance(menu, iterations - 1, countCopies(balancingDiet), balancingDiet.expectedAdventures());
    }
  }

  var baseDiet = dietPlanner(baseMenu);
  return rebalance(baseMenu, 5, 0, baseDiet.expectedAdventures());
}

function computeDiet() {
  // Handle spleen manually, as the diet planner doesn't support synth. Only fill food and booze.
  var orEmpty = diet => diet.expectedValue(MPA, "net") < 0 ? new Diet() : diet;

  var fullDietPlanner = menu => orEmpty(Diet.plan(MPA, menu));

  var shotglassDietPlanner = menu => orEmpty(Diet.plan(MPA, menu, {
    booze: 1
  }));

  var pantsgivingDietPlanner = menu => orEmpty(Diet.plan(MPA, menu, {
    food: 1
  }));

  var sweatpantsDietPlanner = menu => orEmpty(Diet.plan(MPA, menu, {
    booze: getRemainingLiver()
  })); // const shotglassFilter = (menuItem: MenuItem)


  return {
    diet: () => fullDietPlanner(balanceMenu(menu(), fullDietPlanner)),
    shotglass: () => shotglassDietPlanner(balanceMenu(menu().filter(menuItem => itemType(menuItem.item) === "booze" && menuItem.size === 1), shotglassDietPlanner)),
    pantsgiving: () => pantsgivingDietPlanner(balanceMenu(menu().filter(menuItem => itemType(menuItem.item) === "food" && menuItem.size === 1), pantsgivingDietPlanner)),
    sweatpants: () => sweatpantsDietPlanner(balanceMenu(menu().filter(menuItem => itemType(menuItem.item) === "booze" && menuItem.size <= 3), sweatpantsDietPlanner))
  };
}

function printDiet(diet, name) {
  print("===== ".concat(name, " DIET ====="));
  if (diet.entries.length === 0) return;
  diet = diet.copy();
  diet.entries.sort((a, b) => itemPriority(b.menuItems) - itemPriority(a.menuItems));
  var embezzlers = Math.floor(embezzlerCount() + countCopies(diet));
  var adventures = Math.floor(estimatedTurns() + diet.expectedAdventures());
  print("Planning to fight ".concat(embezzlers, " embezzlers and run ").concat(adventures, " adventures"));

  var _iterator = _createForOfIteratorHelper(diet.entries),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var dietEntry = _step.value;
      if (dietEntry.quantity === 0) continue;
      var target = dietEntry.target();
      var datastr = target.data ? "(".concat(target.data, ")") : "";
      var maxstr = target.maximum ? " (max ".concat(target.maximum, ")") : "";
      var helpersstr = dietEntry.helpers().length > 0 ? " helpers: ".concat(dietEntry.helpers().join(", ")) : "";
      var addvalstr = target.additionalValue ? " (additional value: ".concat(target.additionalValue, ")") : "";
      var valuestr = "value: ".concat(Math.floor(dietEntry.expectedValue(MPA, diet))).concat(addvalstr, " price: ").concat(Math.floor(dietEntry.expectedPrice()));
      print("".concat(dietEntry.quantity).concat(maxstr, " ").concat(target).concat(datastr).concat(helpersstr, " ").concat(valuestr));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var totalValue = diet.expectedValue(MPA);
  var totalCost = diet.expectedPrice();
  var netValue = totalValue - totalCost;
  print("Assuming MPA of ".concat(MPA, ", Total Cost ").concat(totalCost, ", Total Value ").concat(totalValue, ", Net Value ").concat(netValue));
} // Item priority - higher means we eat it first.
// Anything that gives a consumption buff should go first (e.g. Refined Palate).


function itemPriority(menuItems) {
  // Last menu item is the food itself.
  var menuItem = menuItems[menuItems.length - 1];

  if (menuItem === undefined) {
    throw "Shouldn't have an empty menu item.";
  }

  if (menuItem.item === $item(_templateObject158 || (_templateObject158 = _taggedTemplateLiteral(["spaghetti breakfast"])))) return 200;

  if ($items(_templateObject159 || (_templateObject159 = _taggedTemplateLiteral(["pocket wish, toasted brie"]))).includes(menuItem.item) || spleenCleaners.get(menuItem.item) || stomachLiverCleaners.get(menuItem.item)) {
    return 100;
  } else {
    return 0;
  }
}

function consumeDiet(diet, name) {
  if (diet.entries.length === 0) return;
  diet = diet.copy();
  diet.entries.sort((a, b) => itemPriority(b.menuItems) - itemPriority(a.menuItems));
  print();
  printDiet(diet, name);
  print();
  var seasoningCount = sum(diet.entries, _ref => {
    var menuItems = _ref.menuItems,
        quantity = _ref.quantity;
    return menuItems.some(menuItem => menuItem.item === $item(_templateObject160 || (_templateObject160 = _taggedTemplateLiteral(["Special Seasoning"])))) ? quantity : 0;
  });
  acquire(seasoningCount, $item(_templateObject161 || (_templateObject161 = _taggedTemplateLiteral(["Special Seasoning"]))), MPA); // Fill organs in rounds, making sure we're making progress in each round.

  var organs = () => [myFullness(), myInebriety(), mySpleenUse()];

  var lastOrgans = [-1, -1, -1];

  while (sum(diet.entries, _ref2 => {
    var quantity = _ref2.quantity;
    return quantity;
  }) > 0) {
    if (arrayEquals(lastOrgans, organs())) {
      print();
      printDiet(diet, "REMAINING");
      print();
      throw "Failed to consume some diet item.";
    }

    lastOrgans = organs();

    var _iterator2 = _createForOfIteratorHelper(diet.entries),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var dietEntry = _step2.value;
        var menuItems = dietEntry.menuItems,
            quantity = dietEntry.quantity;
        if (quantity === 0) continue;
        var countToConsume = quantity;
        var capacity = {
          food: fullnessLimit() - myFullness(),
          booze: inebrietyLimit() - myInebriety(),
          "spleen item": spleenLimit() - mySpleenUse()
        };

        var _iterator3 = _createForOfIteratorHelper(menuItems),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _menuItem = _step3.value;
            logprint("Considering item ".concat(_menuItem.item, "."));

            if (_menuItem.organ === "booze" && _menuItem.size === 1 && !get("_mimeArmyShotglassUsed")) {
              countToConsume = 1;
            } else if (_menuItem.organ && _menuItem.size > 0) {
              countToConsume = Math.min(countToConsume, Math.floor(capacity[_menuItem.organ] / _menuItem.size));
            }

            logprint("Based on organ size, planning to consume ".concat(countToConsume, "."));
            var cleaning = stomachLiverCleaners.get(_menuItem.item);

            if (cleaning) {
              var _cleaning = _slicedToArray(cleaning, 2),
                  fullness = _cleaning[0],
                  inebriety = _cleaning[1];

              if (myFullness() + fullness < 0 || myInebriety() + inebriety < 0) {
                countToConsume = 0;
              }

              logprint("Based on organ-cleaning, planning to consume ".concat(countToConsume, "."));
            }

            var spleenCleaned = spleenCleaners.get(_menuItem.item);

            if (spleenCleaned) {
              countToConsume = Math.min(countToConsume, Math.floor(mySpleenUse() / spleenCleaned));
              logprint("Based on organ-cleaning, planning to consume ".concat(countToConsume, "."));
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        if (countToConsume === 0) continue;

        var elementalResistAction = element => {
          return (countToConsume, menuItem) => {
            if (myMaxhp() < 1000 * (1 - elementalResistance(element) / 100)) {
              maximizeCached(["0.05 HP", "".concat(element, " Resistance")]);

              if (myMaxhp() < 1000 * (1 - elementalResistance(element) / 100)) {
                throw "Could not achieve enough ".concat(element, " resistance for ").concat(menuItem.item, ".");
              }
            }

            consumeSafe(countToConsume, menuItem.item);
          };
        };

        var speakeasyDrinks = Object.keys(getClanLounge()).map(s => toItem(s)).filter(i => i.inebriety > 0).map(drink => [drink, (countToConsume, menuItem) => {
          cliExecute("drink ".concat(countToConsume, " ").concat(menuItem.item));
        }]);
        var mayoActions = Object.values(Mayo).map(i => [i, (countToConsume, menuItem) => {
          MayoClinic.setMayoMinder(menuItem.item, countToConsume);
        }]);
        var itemActions = new Map([[saladFork, elementalResistAction($element(_templateObject162 || (_templateObject162 = _taggedTemplateLiteral(["hot"]))))], [frostyMug, elementalResistAction($element(_templateObject163 || (_templateObject163 = _taggedTemplateLiteral(["cold"]))))], [$item(_templateObject164 || (_templateObject164 = _taggedTemplateLiteral(["pocket wish"]))), (countToConsume, menuItem) => acquire(countToConsume, $item(_templateObject165 || (_templateObject165 = _taggedTemplateLiteral(["pocket wish"]))), 60000) && cliExecute("genie effect ".concat(menuItem.effect))], [$item(_templateObject166 || (_templateObject166 = _taggedTemplateLiteral(["campfire hot dog"]))), (countToConsume, menuItem) => {
          // mafia does not support retrieveItem on campfire hot dog because it does not work on stick of firewood
          if (!have($item(_templateObject167 || (_templateObject167 = _taggedTemplateLiteral(["stick of firewood"]))))) {
            buy(1, $item(_templateObject168 || (_templateObject168 = _taggedTemplateLiteral(["stick of firewood"]))), ingredientCost($item(_templateObject169 || (_templateObject169 = _taggedTemplateLiteral(["stick of firewood"])))));
          }

          consumeSafe(countToConsume, menuItem.item);
        }], [$item(_templateObject170 || (_templateObject170 = _taggedTemplateLiteral(["Special Seasoning"]))), "skip"], [$item(_templateObject171 || (_templateObject171 = _taggedTemplateLiteral(["Rethinking Candy"]))), (countToConsume, menuItem) => {
          var _menuItem$effect;

          return synthesize(countToConsume, (_menuItem$effect = menuItem.effect) !== null && _menuItem$effect !== void 0 ? _menuItem$effect : $effect(_templateObject172 || (_templateObject172 = _taggedTemplateLiteral(["Synthesis: Greed"]))));
        }]].concat(_toConsumableArray(mayoActions), _toConsumableArray(speakeasyDrinks), [[$item(_templateObject173 || (_templateObject173 = _taggedTemplateLiteral(["broberry brogurt"]))), (countToConsume, menuItem) => {
          var amountNeeded = countToConsume - availableAmount($item(_templateObject174 || (_templateObject174 = _taggedTemplateLiteral(["broberry brogurt"]))));

          if (amountNeeded > 0) {
            var coinmasterPrice = realmAvailable("sleaze") && sellsItem($coinmaster(_templateObject175 || (_templateObject175 = _taggedTemplateLiteral(["The Frozen Brogurt Stand"]))), $item(_templateObject176 || (_templateObject176 = _taggedTemplateLiteral(["broberry brogurt"])))) ? 10 * garboValue($item(_templateObject177 || (_templateObject177 = _taggedTemplateLiteral(["Beach Buck"])))) : Infinity;
            var regularPrice = mallPrice($item(_templateObject178 || (_templateObject178 = _taggedTemplateLiteral(["broberry brogurt"]))));

            if (coinmasterPrice < regularPrice) {
              var amountToBuy = Math.min(amountNeeded, Math.floor(itemAmount($item(_templateObject179 || (_templateObject179 = _taggedTemplateLiteral(["Beach Buck"]))))));
              buy($coinmaster(_templateObject180 || (_templateObject180 = _taggedTemplateLiteral(["The Frozen Brogurt Stand"]))), amountToBuy, $item(_templateObject181 || (_templateObject181 = _taggedTemplateLiteral(["broberry brogurt"]))));
            }

            buy(countToConsume - availableAmount($item(_templateObject182 || (_templateObject182 = _taggedTemplateLiteral(["broberry brogurt"])))), $item(_templateObject183 || (_templateObject183 = _taggedTemplateLiteral(["broberry brogurt"]))));
          }

          consumeSafe(countToConsume, menuItem.item, menuItem.additionalValue);
        }], [$item(_templateObject184 || (_templateObject184 = _taggedTemplateLiteral(["designer sweatpants"]))), countToConsume => {
          for (var n = 1; n <= countToConsume; n++) {
            useSkill($skill(_templateObject185 || (_templateObject185 = _taggedTemplateLiteral(["Sweat Out Some Booze"]))));
          }
        }]]));

        var _iterator4 = _createForOfIteratorHelper(menuItems),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _menuItem2 = _step4.value;
            var itemAction = itemActions.get(_menuItem2.item);

            if (itemAction === "skip") {
              continue;
            } else if (itemAction) {
              itemAction(countToConsume, _menuItem2);
            } else {
              consumeSafe(countToConsume, _menuItem2.item, _menuItem2.additionalValue);
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        dietEntry.quantity -= countToConsume;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
}
function runDiet() {
  withVIPClan(() => {
    if (myFamiliar() === $familiar(_templateObject186 || (_templateObject186 = _taggedTemplateLiteral(["Stooper"])))) {
      useFamiliar($familiar(_templateObject187 || (_templateObject187 = _taggedTemplateLiteral(["none"]))));
    }

    MenuItem.defaultPriceFunction = item => {
      var itemRetrievePrice = retrievePrice(item);
      return itemRetrievePrice > 0 ? itemRetrievePrice : item.tradeable ? mallPrice(item) : 0;
    };

    var dietBuilder = computeDiet();

    if (globalOptions.simulateDiet) {
      print("===== SIMULATED DIET =====");

      if (!get("_mimeArmyShotglassUsed") && have($item(_templateObject188 || (_templateObject188 = _taggedTemplateLiteral(["mime army shotglass"]))))) {
        printDiet(dietBuilder.shotglass(), "SHOTGLASS");
      }

      printDiet(dietBuilder.diet(), "FULL");
    } else {
      pillCheck();
      nonOrganAdventures();

      if (have($item(_templateObject189 || (_templateObject189 = _taggedTemplateLiteral(["astral six-pack"]))))) {
        use($item(_templateObject190 || (_templateObject190 = _taggedTemplateLiteral(["astral six-pack"]))));
      }

      if (!get("_mimeArmyShotglassUsed") && have($item(_templateObject191 || (_templateObject191 = _taggedTemplateLiteral(["mime army shotglass"]))))) {
        consumeDiet(dietBuilder.shotglass(), "SHOTGLASS");
      }

      if (get("barrelShrineUnlocked") && !get("_barrelPrayer") && $classes(_templateObject192 || (_templateObject192 = _taggedTemplateLiteral(["Turtle Tamer, Accordion Thief"]))).includes(myClass())) {
        cliExecute("barrelprayer buff");
      }

      consumeDiet(dietBuilder.diet(), "FULL");
      shrugBadEffects();
    }
  });
}

/***/ }),

/***/ 5472:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "uv": () => (/* binding */ usingThumbRing)
});

// UNUSED EXPORTS: bestBjornalike, bonusGear, magnifyingGlass, pickBjorn, valueBjornModifiers

// EXTERNAL MODULE: external "kolmafia"
var external_kolmafia_ = __webpack_require__(7530);
// EXTERNAL MODULE: ./node_modules/libram/dist/lib.js
var lib = __webpack_require__(3311);
// EXTERNAL MODULE: ./node_modules/libram/dist/template-string.js
var template_string = __webpack_require__(678);
// EXTERNAL MODULE: ./node_modules/libram/dist/property.js + 2 modules
var property = __webpack_require__(2474);
// EXTERNAL MODULE: ./node_modules/libram/dist/utils.js
var utils = __webpack_require__(8588);
// EXTERNAL MODULE: ./node_modules/libram/dist/modifier.js + 1 modules
var modifier = __webpack_require__(1245);
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2010/CrownOfThrones.js
var _templateObject, _templateObject2, _modifier, _templateObject3, _templateObject4, _modifier2, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _modifier7, _templateObject13, _templateObject14, _modifier8, _templateObject15, _templateObject16, _modifier9, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _modifier15, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _modifier26, _templateObject51, _templateObject52, _modifier27, _templateObject53, _templateObject54, _modifier28, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _modifier31, _templateObject61, _templateObject62, _modifier32, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _modifier34, _templateObject67, _templateObject68, _modifier35, _templateObject69, _templateObject70, _modifier36, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var ridingFamiliars = [{
  familiar: (0,template_string/* $familiar */.HP)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Puck Man"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["yellow pixel"])))),
  probability: 0.25,
  modifier: (_modifier = {}, _defineProperty(_modifier, "Muscle", 10), _defineProperty(_modifier, "Mysticality", 10), _defineProperty(_modifier, "Moxie", 10), _modifier),
  dropPredicate: () => (0,property/* get */.U2)("_yellowPixelDropsCrown") < 25
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Ms. Puck Man"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["yellow pixel"])))),
  probability: 0.25,
  modifier: (_modifier2 = {}, _defineProperty(_modifier2, "Muscle", 10), _defineProperty(_modifier2, "Mysticality", 10), _defineProperty(_modifier2, "Moxie", 10), _modifier2),
  dropPredicate: () => (0,property/* get */.U2)("_yellowPixelDropsCrown") < 25
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Grimstone Golem"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["grimstone mask"])))),
  probability: 0.5,
  modifier: _defineProperty({}, "Combat Rate", -5),
  dropPredicate: () => (0,property/* get */.U2)("_grimstoneMaskDropsCrown") < 1
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Knob Goblin Organ Grinder"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: _defineProperty({}, "Meat Drop", 25)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Happy Medium"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: _defineProperty({}, "Meat Drop", 25)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Garbage Fire"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["burning newspaper"])))),
  probability: 0.5,
  modifier: _defineProperty({}, "Hot Spell Damage", 25),
  dropPredicate: () => (0,property/* get */.U2)("_garbageFireDropsCrown") < 3
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Machine Elf"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["abstraction: sensation, abstraction: thought, abstraction: action, abstraction: category, abstraction: perception, abstraction: purpose"]))))),
  probability: 0.2,
  modifier: (_modifier7 = {}, _defineProperty(_modifier7, "Muscle", 7), _defineProperty(_modifier7, "Mysticality", 7), _defineProperty(_modifier7, "Moxie", 7), _modifier7),
  dropPredicate: () => (0,property/* get */.U2)("_abstractionDropsCrown") < 25
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Trick-or-Treating Tot"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["hoarded candy wad"])))),
  probability: 0.5,
  modifier: (_modifier8 = {}, _defineProperty(_modifier8, "Muscle", 10), _defineProperty(_modifier8, "Mysticality", 10), _defineProperty(_modifier8, "Moxie", 10), _modifier8),
  dropPredicate: () => (0,property/* get */.U2)("_hoardedCandyDropsCrown") < 3
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Warbear Drone"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["warbear whosit"])))),
  probability: 1 / 4.5,
  modifier: (_modifier9 = {}, _defineProperty(_modifier9, "Maximum HP", 15), _defineProperty(_modifier9, "Maximum MP", 15), _modifier9)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Li'l Xenomorph"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["lunar isotope"])))),
  probability: 0.05,
  modifier: _defineProperty({}, "Item Drop", 15)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["Pottery Barn Owl"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["volcanic ash"])))),
  probability: 0.1,
  modifier: _defineProperty({}, "Hot Damage", 10)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["Grim Brother"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["grim fairy tale"])))),
  probability: 1,
  modifier: _defineProperty({}, "Combat Rate", 5),
  dropPredicate: () => (0,property/* get */.U2)("_grimFairyTaleDropsCrown") < 2
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Optimistic Candle"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["glob of melted wax"])))),
  probability: 1,
  dropPredicate: () => (0,property/* get */.U2)("_optimisticCandleDropsCrown") < 3,
  modifier: _defineProperty({}, "Item Drop", 15)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["Adventurous Spelunker"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["teflon ore, velcro ore, vinyl ore, cardboard ore, styrofoam ore, bubblewrap ore"]))))),
  probability: 1,
  dropPredicate: () => (0,property/* get */.U2)("_oreDropsCrown") < 6,
  modifier: _defineProperty({}, "Item Drop", 15)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["Twitching Space Critter"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["space beast fur"])))),
  probability: 1,
  modifier: (_modifier15 = {}, _defineProperty(_modifier15, "Hot Resistance", 2), _defineProperty(_modifier15, "Cold Resistance", 2), _defineProperty(_modifier15, "Spooky Resistance", 2), _defineProperty(_modifier15, "Sleaze Resistance", 2), _defineProperty(_modifier15, "Stench Resistance", 2), _modifier15),
  dropPredicate: () => (0,property/* get */.U2)("_spaceFurDropsCrown") < 1
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["Party Mouse"]))),
  meatVal: () => 50,

  /*
  The below code is more accurate. However, party mouse is virtually never going to be worthwhile and this causes so many useless mall hits it isn't funny.
         getSaleValue(
      ...Item.all().filter(
        (booze) =>
          ["decent", "good"].includes(booze.quality) &&
          booze.inebriety > 0 &&
          booze.tradeable &&
          booze.discardable &&
          !$items`glass of "milk", cup of "tea", thermos of "whiskey", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy`.includes(
            booze
          )
      )
    ),
    */
  probability: 0.05,
  modifier: _defineProperty({}, "Booze Drop", 25)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["Yule Hound"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["candy cane"])))),
  probability: 1,
  modifier: _defineProperty({}, "Candy Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["Gluttonous Green Ghost"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["bean burrito, enchanted bean burrito, jumping bean burrito"]))))),
  probability: 1,
  modifier: _defineProperty({}, "Food Drop", 15)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["Reassembled Blackbird"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["blackberry"])))),
  probability: 1,
  modifier: _defineProperty({}, "Item Drop", 10)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["Reconstituted Crow"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["blackberry"])))),
  probability: 1,
  modifier: _defineProperty({}, "Item Drop", 10)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["Hunchbacked Minion"]))),
  meatVal: () => 0.02 * (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["disembodied brain"])))) + 0.98 * (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["skeleton bone"])))),
  probability: 1,
  modifier: _defineProperty({}, "Muscle Experience", 2)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["Reanimated Reanimator"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["hot wing, broken skull"]))))),
  probability: 1,
  modifier: _defineProperty({}, "Mysticality Experience", 2)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["Attention-Deficit Demon"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["chorizo brownies, white chocolate and tomato pizza, carob chunk noodles"]))))),
  probability: 1,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Piano Cat"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["beertini, papaya slung, salty slug, tomato daiquiri"]))))),
  probability: 1,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Golden Monkey"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["gold nuggets"])))),
  probability: 0.5,
  modifier: _defineProperty({}, "Meat Drop", 25)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["Robot Reindeer"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))))),
  probability: 0.3,
  modifier: (_modifier26 = {}, _defineProperty(_modifier26, "Muscle", 10), _defineProperty(_modifier26, "Mysticality", 10), _defineProperty(_modifier26, "Moxie", 10), _modifier26)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["Stocking Mimic"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["Angry Farmer candy, Cold Hots candy, Rock Pops, Tasty Fun Good rice candy, Wint-O-Fresh mint"]))))),
  probability: 0.3,
  modifier: (_modifier27 = {}, _defineProperty(_modifier27, "Muscle", 10), _defineProperty(_modifier27, "Mysticality", 10), _defineProperty(_modifier27, "Moxie", 10), _modifier27)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["BRICKO chick"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["BRICKO brick"])))),
  probability: 1,
  modifier: (_modifier28 = {}, _defineProperty(_modifier28, "Muscle Percent", 10), _defineProperty(_modifier28, "Mysticality Percent", 10), _defineProperty(_modifier28, "Moxie Percent", 10), _modifier28)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["Cotton Candy Carnie"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["cotton candy pinch"])))),
  probability: 1,
  modifier: _defineProperty({}, "Initiative", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["Untamed Turtle"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral(["snailmail bits, turtlemail bits, turtle wax"]))))),
  probability: 0.35,
  modifier: _defineProperty({}, "Initiative", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["Astral Badger"]))),
  meatVal: () => 2 * lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(["spooky mushroom, Knob mushroom, Knoll mushroom"]))))),
  probability: 1,
  modifier: (_modifier31 = {}, _defineProperty(_modifier31, "Maximum HP", 10), _defineProperty(_modifier31, "Maximum MP", 10), _modifier31)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["Green Pixie"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["bottle of tequila"])))),
  probability: 0.2,
  modifier: (_modifier32 = {}, _defineProperty(_modifier32, "Maximum HP", 10), _defineProperty(_modifier32, "Maximum MP", 10), _modifier32)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["Angry Goat"]))),
  meatVal: () => (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["goat cheese pizza"])))),
  probability: 1,
  modifier: _defineProperty({}, "Muscle Percent", 15)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["Adorable Seal Larva"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["stench nuggets, spooky nuggets, hot nuggets, cold nuggets, sleaze nuggets"]))))),
  probability: 0.35,
  modifier: (_modifier34 = {}, _defineProperty(_modifier34, "HP Regen Min", 2), _defineProperty(_modifier34, "MP Regen Min", 2), _defineProperty(_modifier34, "HP Regen Max", 8), _defineProperty(_modifier34, "MP Regen Max", 8), _modifier34)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["Ancient Yuletide Troll"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))))),
  probability: 0.3,
  modifier: (_modifier35 = {}, _defineProperty(_modifier35, "HP Regen Min", 2), _defineProperty(_modifier35, "MP Regen Min", 2), _defineProperty(_modifier35, "HP Regen Max", 8), _defineProperty(_modifier35, "MP Regen Max", 8), _modifier35)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["Sweet Nutcracker"]))),
  meatVal: () => lib/* getSaleValue.apply */.xI.apply(void 0, _toConsumableArray((0,template_string/* $items */.vS)(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))))),
  probability: 0.3,
  modifier: (_modifier36 = {}, _defineProperty(_modifier36, "HP Regen Min", 2), _defineProperty(_modifier36, "MP Regen Min", 2), _defineProperty(_modifier36, "HP Regen Max", 8), _defineProperty(_modifier36, "MP Regen Max", 8), _modifier36)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral(["Casagnova Gnome"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral(["Coffee Pixie"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral(["Dancing Frog"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral(["Grouper Groupie"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral(["Hand Turkey"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral(["Hippo Ballerina"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral(["Jitterbug"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral(["Leprechaun"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral(["Obtuse Angel"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral(["Psychedelic Bear"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral(["Robortender"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Meat Drop", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral(["Ghost of Crimbo Commerce"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: _defineProperty({}, "Meat Drop", 25)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral(["Hobo Monkey"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Meat Drop", 25)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral(["Rockin' Robin"]))),
  meatVal: () => 60,
  probability: 1,
  modifier: _defineProperty({}, "Item Drop", 15)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral(["Feral Kobold"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: _defineProperty({}, "Item Drop", 15)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral(["Oily Woim"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: _defineProperty({}, "Item Drop", 10)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral(["Cat Burglar"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Item Drop", 10)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral(["Misshapen Animal Skeleton"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: _defineProperty({}, "Familiar Weight", 5)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral(["Gelatinous Cubeling"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: _defineProperty({}, "Familiar Weight", 5)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral(["Frozen Gravy Fairy"]))),
  // drops a cold nugget every combat, 5 of which can be used to make a cold wad
  meatVal: () => Math.max(0.2 * (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral(["cold wad"])))), (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral(["cold nuggets"]))))),
  probability: 1,
  modifier: _defineProperty({}, "Cold Damage", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral(["Stinky Gravy Fairy"]))),
  // drops a stench nugget every combat, 5 of which can be used to make a stench wad
  meatVal: () => Math.max(0.2 * (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral(["stench wad"])))), (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral(["stench nuggets"]))))),
  probability: 1,
  modifier: _defineProperty({}, "Stench Damage", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral(["Sleazy Gravy Fairy"]))),
  // drops a sleaze nugget every combat, 5 of which can be used to make a sleaze wad
  meatVal: () => Math.max(0.2 * (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral(["sleaze wad"])))), (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral(["sleaze nuggets"]))))),
  probability: 1,
  modifier: _defineProperty({}, "Sleaze Damage", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral(["Spooky Gravy Fairy"]))),
  // drops a spooky nugget every combat, 5 of which can be used to make a spooky wad
  meatVal: () => Math.max(0.2 * (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral(["spooky wad"])))), (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral(["spooky nuggets"]))))),
  probability: 1,
  modifier: _defineProperty({}, "Spooky Damage", 20)
}, {
  familiar: (0,template_string/* $familiar */.HP)(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral(["Flaming Gravy Fairy"]))),
  // drops a hot nugget every combat, 5 of which can be used to make a hot wad
  meatVal: () => Math.max(0.2 * (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral(["hot wad"])))), (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral(["hot nuggets"]))))),
  probability: 1,
  modifier: _defineProperty({}, "Hot Damage", 20)
}];
function valueRider(rider, modifierValueFunction) {
  var ignoreLimitedDrops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var dropValue = !rider.dropPredicate || rider.dropPredicate() && !ignoreLimitedDrops ? rider.probability * rider.meatVal() : 0;
  var modifierValue = modifierValueFunction(rider.modifier);
  return dropValue + modifierValue;
}
var riderModes = new Map();
function createRiderMode(name, modifierValueFunction) {
  var ignoreLimitedDrops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var excludeCurrentFamiliar = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return riderModes.set(name, {
    modifierValueFunction: modifierValueFunction,
    ignoreLimitedDrops: ignoreLimitedDrops,
    excludeCurrentFamiliar: excludeCurrentFamiliar
  });
}
var riderLists = new Map();
function CrownOfThrones_pickRider(mode) {
  var modeData = riderModes.get(mode);
  if (!modeData) return null;
  var modifierValueFunction = modeData.modifierValueFunction,
      ignoreLimitedDrops = modeData.ignoreLimitedDrops,
      excludeCurrentFamiliar = modeData.excludeCurrentFamiliar;

  if (!riderLists.has(mode)) {
    riderLists.set(mode, ridingFamiliars.filter(rider => have(rider.familiar)).sort((a, b) => valueRider(b, modifierValueFunction, ignoreLimitedDrops) - valueRider(a, modifierValueFunction, ignoreLimitedDrops)));
  }

  var list = riderLists.get(mode);

  if (list) {
    var riderToReturn = list.find(rider => (!rider.dropPredicate || rider.dropPredicate()) && (!excludeCurrentFamiliar || myFamiliar() !== rider.familiar));
    return riderToReturn !== null && riderToReturn !== void 0 ? riderToReturn : null;
  }

  return null;
}
// EXTERNAL MODULE: ./src/diet.ts
var diet = __webpack_require__(4033);
// EXTERNAL MODULE: ./src/embezzler.ts
var embezzler = __webpack_require__(4936);
// EXTERNAL MODULE: ./src/familiar.ts
var familiar = __webpack_require__(9737);
// EXTERNAL MODULE: ./src/lib.ts
var src_lib = __webpack_require__(7442);
// EXTERNAL MODULE: ./src/session.ts
var session = __webpack_require__(742);
;// CONCATENATED MODULE: ./src/dropsgear.ts
var dropsgear_templateObject, dropsgear_templateObject2, dropsgear_templateObject3, dropsgear_templateObject4, dropsgear_templateObject5, dropsgear_templateObject6, dropsgear_templateObject7, dropsgear_templateObject8, dropsgear_templateObject9, dropsgear_templateObject10, dropsgear_templateObject11, dropsgear_templateObject12, dropsgear_templateObject13, dropsgear_templateObject14, dropsgear_templateObject15, dropsgear_templateObject16, dropsgear_templateObject17, dropsgear_templateObject18, dropsgear_templateObject19, dropsgear_templateObject20, dropsgear_templateObject21, dropsgear_templateObject22, dropsgear_templateObject23, dropsgear_templateObject24, dropsgear_templateObject25, dropsgear_templateObject26, dropsgear_templateObject27, dropsgear_templateObject28, dropsgear_templateObject29, dropsgear_templateObject30, dropsgear_templateObject31, dropsgear_templateObject32, dropsgear_templateObject33, dropsgear_templateObject34, dropsgear_templateObject35, dropsgear_templateObject36, dropsgear_templateObject37, dropsgear_templateObject38, dropsgear_templateObject39, dropsgear_templateObject40, dropsgear_templateObject41, dropsgear_templateObject42, dropsgear_templateObject43, dropsgear_templateObject44, dropsgear_templateObject45, dropsgear_templateObject46, dropsgear_templateObject47, dropsgear_templateObject48, dropsgear_templateObject49, dropsgear_templateObject50, dropsgear_templateObject51, dropsgear_templateObject52, dropsgear_templateObject53, dropsgear_templateObject54, dropsgear_templateObject55, dropsgear_templateObject56, dropsgear_templateObject57, dropsgear_templateObject58, dropsgear_templateObject59, dropsgear_templateObject60, dropsgear_templateObject61, dropsgear_templateObject62, dropsgear_templateObject63, dropsgear_templateObject64, dropsgear_templateObject65, dropsgear_templateObject66, dropsgear_templateObject67, dropsgear_templateObject68, dropsgear_templateObject69, dropsgear_templateObject70, dropsgear_templateObject71, dropsgear_templateObject72, dropsgear_templateObject73, dropsgear_templateObject74, dropsgear_templateObject75, dropsgear_templateObject76;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = dropsgear_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || dropsgear_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function dropsgear_toConsumableArray(arr) { return dropsgear_arrayWithoutHoles(arr) || dropsgear_iterableToArray(arr) || dropsgear_unsupportedIterableToArray(arr) || dropsgear_nonIterableSpread(); }

function dropsgear_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function dropsgear_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dropsgear_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dropsgear_arrayLikeToArray(o, minLen); }

function dropsgear_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function dropsgear_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return dropsgear_arrayLikeToArray(arr); }

function dropsgear_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dropsgear_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









/**
 * Determine the meat value of the modifier bonuses a particular bjorned familiar grants
 * @param mode The BonusEquipMode of this fight: "free", "dmt", "embezzler", or "barf"
 * @param modifiers An object containing any and all modifier-value pairs that the potential familiar choice grants
 * @returns The meat value of the modifier bonuses given that mode
 */

function valueBjornModifiers(mode, modifiers) {
  var _modifiers$FamiliarW, _modifiers$MeatDrop, _modifiers$ItemDrop;

  var weight = (_modifiers$FamiliarW = modifiers["Familiar Weight"]) !== null && _modifiers$FamiliarW !== void 0 ? _modifiers$FamiliarW : 0;
  var meat = (_modifiers$MeatDrop = modifiers["Meat Drop"]) !== null && _modifiers$MeatDrop !== void 0 ? _modifiers$MeatDrop : 0;
  var item = (_modifiers$ItemDrop = modifiers["Item Drop"]) !== null && _modifiers$ItemDrop !== void 0 ? _modifiers$ItemDrop : 0;
  var meatValue = (!["dmt", "free"].includes(mode) ? src_lib/* baseMeat */.Vq + mode === "embezzler" ? 750 : 0 : 0) / 100;
  var itemValue = mode === "barf" ? 0.72 : 0;
  var lepMult = (0,lib/* findLeprechaunMultiplier */.q$)((0,familiar/* meatFamiliar */.M2)());
  var lepBonus = weight * (2 * lepMult + Math.sqrt(lepMult));
  var fairyMult = (0,lib/* findFairyMultiplier */.gK)((0,familiar/* meatFamiliar */.M2)());
  var fairyBonus = weight * (fairyMult + Math.sqrt(fairyMult) / 2);
  var bjornMeatDropValue = meatValue * (meat + lepBonus);
  var bjornItemDropValue = itemValue * (item + fairyBonus);
  return bjornMeatDropValue + bjornItemDropValue;
}
createRiderMode("free", modifiers => valueBjornModifiers("free", modifiers), false);
createRiderMode("embezzler", modifiers => valueBjornModifiers("embezzler", modifiers), true);
createRiderMode("dmt", modifiers => valueBjornModifiers("dmt", modifiers), true);
createRiderMode("barf", modifiers => valueBjornModifiers("barf", modifiers), false, true);
/**
 * Determines the best familiar to bjornify given a particular fight mode
 * @param mode The BonusEquipMode of this fight: "free", "dmt", "embezzler", or "barf"
 * @returns The best familiar to bjornify given this fight mode
 */

function pickBjorn() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "free";
  var attempt = pickRider(mode);
  if (attempt) return attempt;
  throw new Error("Unable to make a sensible bjorn decision");
}
var pantsgivingBonuses = new Map();

function pantsgiving() {
  if (!have($item(dropsgear_templateObject || (dropsgear_templateObject = dropsgear_taggedTemplateLiteral(["Pantsgiving"]))))) return new Map();
  var count = get("_pantsgivingCount");
  var turnArray = [5, 50, 500, 5000];
  var index = myFullness() === fullnessLimit() ? get("_pantsgivingFullness") : turnArray.findIndex(x => count < x);
  var turns = turnArray[index] || 50000;
  if (turns - count > estimatedTurns()) return new Map();
  var cachedBonus = pantsgivingBonuses.get(turns);
  if (cachedBonus) return new Map([[$item(dropsgear_templateObject2 || (dropsgear_templateObject2 = dropsgear_taggedTemplateLiteral(["Pantsgiving"]))), cachedBonus]]);
  var expectedSinusTurns = getWorkshed() === $item(dropsgear_templateObject3 || (dropsgear_templateObject3 = dropsgear_taggedTemplateLiteral(["portable Mayo Clinic"]))) ? 100 : 50;
  var expectedUseableSinusTurns = globalOptions.ascending ? clamp(estimatedTurns() - (turns - count) - haveEffect($effect(dropsgear_templateObject4 || (dropsgear_templateObject4 = dropsgear_taggedTemplateLiteral(["Kicked in the Sinuses"])))), 0, expectedSinusTurns) : expectedSinusTurns;
  var sinusVal = expectedUseableSinusTurns * 1.0 * baseMeat;
  var fullnessValue = sinusVal + get("valueOfAdventure") * 6.5 - (mallPrice($item(dropsgear_templateObject5 || (dropsgear_templateObject5 = dropsgear_taggedTemplateLiteral(["jumping horseradish"])))) + mallPrice($item(dropsgear_templateObject6 || (dropsgear_templateObject6 = dropsgear_taggedTemplateLiteral(["Special Seasoning"])))));
  var pantsgivingBonus = fullnessValue / (turns * 0.9);
  pantsgivingBonuses.set(turns, pantsgivingBonus);
  return new Map([[$item(dropsgear_templateObject7 || (dropsgear_templateObject7 = dropsgear_taggedTemplateLiteral(["Pantsgiving"]))), pantsgivingBonus]]);
}

function sweatpants(equipMode) {
  if (!have($item(dropsgear_templateObject8 || (dropsgear_templateObject8 = dropsgear_taggedTemplateLiteral(["designer sweatpants"])))) || equipMode === "embezzler") return new Map();
  var needSweat = !globalOptions.ascending && get("sweat") < 75 || get("sweat") < 25 * (3 - get("_sweatOutSomeBoozeUsed"));
  if (!needSweat) return new Map();
  var VOA = get("valueOfAdventure");
  var bestPerfectDrink = mallMin($items(dropsgear_templateObject9 || (dropsgear_templateObject9 = dropsgear_taggedTemplateLiteral(["perfect cosmopolitan, perfect negroni, perfect dark and stormy, perfect mimosa, perfect old-fashioned, perfect paloma"]))));
  var perfectDrinkValuePerDrunk = ((getAverageAdventures(bestPerfectDrink) + 3) * VOA - mallPrice(bestPerfectDrink)) / 3;
  var splendidMartiniValuePerDrunk = (getAverageAdventures($item(dropsgear_templateObject10 || (dropsgear_templateObject10 = dropsgear_taggedTemplateLiteral(["splendid martini"])))) + 2) * VOA;
  var bonus = Math.max(perfectDrinkValuePerDrunk, splendidMartiniValuePerDrunk) * 2 / 25;
  return new Map([[$item(dropsgear_templateObject11 || (dropsgear_templateObject11 = dropsgear_taggedTemplateLiteral(["designer sweatpants"]))), bonus]]);
}

var bestAdventuresFromPants = external_kolmafia_.Item.all().filter(item => (0,external_kolmafia_.toSlot)(item) === (0,template_string/* $slot */.Jh)(dropsgear_templateObject12 || (dropsgear_templateObject12 = dropsgear_taggedTemplateLiteral(["pants"]))) && (0,lib/* have */.lf)(item) && (0,external_kolmafia_.numericModifier)(item, "Adventures") > 0).map(pants => (0,external_kolmafia_.numericModifier)(pants, "Adventures")).sort((a, b) => b - a)[0] || 0;
var haveSomeCheese = (0,lib/* getFoldGroup */._D)((0,template_string/* $item */.xr)(dropsgear_templateObject13 || (dropsgear_templateObject13 = dropsgear_taggedTemplateLiteral(["stinky cheese diaper"])))).some(item => (0,lib/* have */.lf)(item));

function cheeses(embezzlerUp) {
  return haveSomeCheese && !globalOptions.ascending && get("_stinkyCheeseCount") < 100 && estimatedTurns() >= 100 - get("_stinkyCheeseCount") && !embezzlerUp ? new Map(getFoldGroup($item(dropsgear_templateObject14 || (dropsgear_templateObject14 = dropsgear_taggedTemplateLiteral(["stinky cheese diaper"])))).filter(item => toSlot(item) !== $slot(dropsgear_templateObject15 || (dropsgear_templateObject15 = dropsgear_taggedTemplateLiteral(["weapon"])))).map(item => [item, get("valueOfAdventure") * (10 - bestAdventuresFromPants) * (1 / 100)])) : [];
}

function mafiaThumbRing(equipMode) {
  if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(dropsgear_templateObject16 || (dropsgear_templateObject16 = dropsgear_taggedTemplateLiteral(["mafia thumb ring"])))) || ["free", "dmt"].some(mode => mode === equipMode)) {
    return new Map([]);
  }

  return new Map([[(0,template_string/* $item */.xr)(dropsgear_templateObject17 || (dropsgear_templateObject17 = dropsgear_taggedTemplateLiteral(["mafia thumb ring"]))), (1 / 0.96 - 1) * (0,property/* get */.U2)("valueOfAdventure")]]);
}

function luckyGoldRing(equipMode) {
  // Ignore for DMT, assuming mafia might get confused about the volcoino drop by the weird combats
  if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(dropsgear_templateObject18 || (dropsgear_templateObject18 = dropsgear_taggedTemplateLiteral(["lucky gold ring"])))) || equipMode === "dmt") {
    return new Map([]);
  } // Volcoino has a low drop rate which isn't accounted for here
  // Overestimating until it drops is probably fine, don't @ me


  var dropValues = [100].concat(dropsgear_toConsumableArray([(0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(dropsgear_templateObject19 || (dropsgear_templateObject19 = dropsgear_taggedTemplateLiteral(["hobo nickel"])))) > 0 ? 100 : 0, // This should be closeted
  (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(dropsgear_templateObject20 || (dropsgear_templateObject20 = dropsgear_taggedTemplateLiteral(["sand dollar"])))) > 0 ? (0,session/* garboValue */.sf)((0,template_string/* $item */.xr)(dropsgear_templateObject21 || (dropsgear_templateObject21 = dropsgear_taggedTemplateLiteral(["sand dollar"])))) : 0, // This should be closeted
  (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(dropsgear_templateObject22 || (dropsgear_templateObject22 = dropsgear_taggedTemplateLiteral(["Freddy Kruegerand"])))) > 0 ? (0,session/* garboValue */.sf)((0,template_string/* $item */.xr)(dropsgear_templateObject23 || (dropsgear_templateObject23 = dropsgear_taggedTemplateLiteral(["Freddy Kruegerand"])))) : 0, (0,src_lib/* realmAvailable */.e6)("sleaze") ? (0,session/* garboValue */.sf)((0,template_string/* $item */.xr)(dropsgear_templateObject24 || (dropsgear_templateObject24 = dropsgear_taggedTemplateLiteral(["Beach Buck"])))) : 0, (0,src_lib/* realmAvailable */.e6)("spooky") ? (0,session/* garboValue */.sf)((0,template_string/* $item */.xr)(dropsgear_templateObject25 || (dropsgear_templateObject25 = dropsgear_taggedTemplateLiteral(["Coinspiracy"])))) : 0, (0,src_lib/* realmAvailable */.e6)("stench") ? (0,session/* garboValue */.sf)((0,template_string/* $item */.xr)(dropsgear_templateObject26 || (dropsgear_templateObject26 = dropsgear_taggedTemplateLiteral(["FunFunds\u2122"])))) : 0, (0,src_lib/* realmAvailable */.e6)("hot") && !(0,property/* get */.U2)("_luckyGoldRingVolcoino") ? (0,session/* garboValue */.sf)((0,template_string/* $item */.xr)(dropsgear_templateObject27 || (dropsgear_templateObject27 = dropsgear_taggedTemplateLiteral(["Volcoino"])))) : 0, (0,src_lib/* realmAvailable */.e6)("cold") ? (0,session/* garboValue */.sf)((0,template_string/* $item */.xr)(dropsgear_templateObject28 || (dropsgear_templateObject28 = dropsgear_taggedTemplateLiteral(["Wal-Mart gift certificate"])))) : 0, (0,src_lib/* realmAvailable */.e6)("fantasy") ? (0,session/* garboValue */.sf)((0,template_string/* $item */.xr)(dropsgear_templateObject29 || (dropsgear_templateObject29 = dropsgear_taggedTemplateLiteral(["Rubee\u2122"])))) : 0].filter(value => value > 0))); // Items drop every ~10 turns

  return new Map([[(0,template_string/* $item */.xr)(dropsgear_templateObject30 || (dropsgear_templateObject30 = dropsgear_taggedTemplateLiteral(["lucky gold ring"]))), (0,utils/* sumNumbers */.JD)(dropValues) / dropValues.length / 10]]);
}

function mrCheengsSpectacles() {
  if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(dropsgear_templateObject31 || (dropsgear_templateObject31 = dropsgear_taggedTemplateLiteral(["Mr. Cheeng's spectacles"]))))) {
    return new Map([]);
  } // Items drop every 4 turns
  // TODO: Possible drops are speculated to be any pvpable potion that will never be banned by standard


  return new Map([[(0,template_string/* $item */.xr)(dropsgear_templateObject32 || (dropsgear_templateObject32 = dropsgear_taggedTemplateLiteral(["Mr. Cheeng's spectacles"]))), 400]]);
}

function mrScreegesSpectacles() {
  if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(dropsgear_templateObject33 || (dropsgear_templateObject33 = dropsgear_taggedTemplateLiteral(["Mr. Screege's spectacles"]))))) {
    return new Map([]);
  } // TODO: Calculate actual bonus value (good luck!)


  return new Map([[(0,template_string/* $item */.xr)(dropsgear_templateObject34 || (dropsgear_templateObject34 = dropsgear_taggedTemplateLiteral(["Mr. Screege's spectacles"]))), 180]]);
}

function pantogramPants() {
  if (!have($item(dropsgear_templateObject35 || (dropsgear_templateObject35 = dropsgear_taggedTemplateLiteral(["pantogram pants"])))) || !get("_pantogramModifier").includes("Drops Items")) {
    return new Map([]);
  } // TODO: Calculate actual bonus value (good luck!)


  return new Map([[$item(dropsgear_templateObject36 || (dropsgear_templateObject36 = dropsgear_taggedTemplateLiteral(["pantogram pants"]))), 100]]);
}

function bagOfManyConfections() {
  if (!have($item(dropsgear_templateObject37 || (dropsgear_templateObject37 = dropsgear_taggedTemplateLiteral(["bag of many confections"])))) || !have($familiar(dropsgear_templateObject38 || (dropsgear_templateObject38 = dropsgear_taggedTemplateLiteral(["Stocking Mimic"]))))) {
    return new Map([]);
  }

  return new Map([[$item(dropsgear_templateObject39 || (dropsgear_templateObject39 = dropsgear_taggedTemplateLiteral(["bag of many confections"]))), garboAverageValue.apply(void 0, dropsgear_toConsumableArray($items(dropsgear_templateObject40 || (dropsgear_templateObject40 = dropsgear_taggedTemplateLiteral(["Polka Pop, BitterSweetTarts, Piddles"]))))) / 6]]);
}

function snowSuit(equipMode) {
  // Ignore for EMBEZZLER
  // Ignore for DMT, assuming mafia might get confused about the drop by the weird combats
  if (!have($item(dropsgear_templateObject41 || (dropsgear_templateObject41 = dropsgear_taggedTemplateLiteral(["Snow Suit"])))) || get("_carrotNoseDrops") >= 3 || ["embezzler", "dmt"].some(mode => mode === equipMode)) {
    return new Map([]);
  }

  return new Map([[$item(dropsgear_templateObject42 || (dropsgear_templateObject42 = dropsgear_taggedTemplateLiteral(["Snow Suit"]))), garboValue($item(dropsgear_templateObject43 || (dropsgear_templateObject43 = dropsgear_taggedTemplateLiteral(["carrot nose"])))) / 10]]);
}

function mayflowerBouquet(equipMode) {
  // +40% meat drop 12.5% of the time (effectively 5%)
  // Drops flowers 50% of the time, wiki says 5-10 a day.
  // Theorized that flower drop rate drops off but no info on wiki.
  // During testing I got 4 drops then the 5th took like 40 more adventures
  // so let's just assume rate drops by 11% with a min of 1% ¯\_(ツ)_/¯
  // Ignore for EMBEZZLER
  // Ignore for DMT, assuming mafia might get confused about the drop by the weird combats
  if (!have($item(dropsgear_templateObject44 || (dropsgear_templateObject44 = dropsgear_taggedTemplateLiteral(["Mayflower bouquet"])))) || ["embezzler", "dmt"].some(mode => mode === equipMode)) {
    return new Map([]);
  }

  var sporadicMeatBonus = 40 * 0.125 * (equipMode === "barf" ? baseMeat : 0) / 100;
  var averageFlowerValue = garboAverageValue.apply(void 0, dropsgear_toConsumableArray($items(dropsgear_templateObject45 || (dropsgear_templateObject45 = dropsgear_taggedTemplateLiteral(["tin magnolia, upsy daisy, lesser grodulated violet, half-orchid, begpwnia"]))))) * Math.max(0.01, 0.5 - get("_mayflowerDrops") * 0.11);
  return new Map([[$item(dropsgear_templateObject46 || (dropsgear_templateObject46 = dropsgear_taggedTemplateLiteral(["Mayflower bouquet"]))), (get("_mayflowerDrops") < 10 ? averageFlowerValue : 0) + sporadicMeatBonus]]);
}
/*
This is separate from bonusGear to prevent circular references
bonusGear() calls pantsgiving(), which calls estimatedTurns(), which calls usingThumbRing()
If this isn't separated from bonusGear(), usingThumbRing() will call bonusGear(), creating a dangerous loop
*/


function bonusAccessories(equipMode) {
  return new Map([].concat(dropsgear_toConsumableArray(mafiaThumbRing(equipMode)), dropsgear_toConsumableArray(luckyGoldRing(equipMode)), dropsgear_toConsumableArray(mrCheengsSpectacles()), dropsgear_toConsumableArray(mrScreegesSpectacles())));
}

function magnifyingGlass() {
  if (!have($item(dropsgear_templateObject47 || (dropsgear_templateObject47 = dropsgear_taggedTemplateLiteral(["cursed magnifying glass"])))) || get("_voidFreeFights") >= 5 || get("cursedMagnifyingGlassCount") >= 13) {
    return new Map();
  }

  return new Map([[$item(dropsgear_templateObject48 || (dropsgear_templateObject48 = dropsgear_taggedTemplateLiteral(["cursed magnifying glass"]))), get("garbo_valueOfFreeFight", 2000) / 13]]);
}
function bonusGear(equipMode) {
  return new Map([].concat(dropsgear_toConsumableArray(cheeses(equipMode === "embezzler")), dropsgear_toConsumableArray(!["embezzler", "dmt"].includes(equipMode) ? pantsgiving() : []), dropsgear_toConsumableArray(sweatpants(equipMode)), dropsgear_toConsumableArray(shavingBonus()), dropsgear_toConsumableArray(bonusAccessories(equipMode)), dropsgear_toConsumableArray(pantogramPants()), dropsgear_toConsumableArray(bagOfManyConfections()), dropsgear_toConsumableArray(snowSuit(equipMode)), dropsgear_toConsumableArray(mayflowerBouquet(equipMode)), dropsgear_toConsumableArray(equipMode === "barf" ? magnifyingGlass() : []), dropsgear_toConsumableArray(juneCleaver(equipMode)), dropsgear_toConsumableArray(stickers(equipMode))));
}
function bestBjornalike(existingForceEquips) {
  var bjornalikes = $items(dropsgear_templateObject49 || (dropsgear_templateObject49 = dropsgear_taggedTemplateLiteral(["Buddy Bjorn, Crown of Thrones"])));
  var slots = bjornalikes.map(bjornalike => toSlot(bjornalike)).filter(slot => !existingForceEquips.some(equipment => toSlot(equipment) === slot));
  if (!slots.length) return undefined;

  if (slots.length < 2 || bjornalikes.some(thing => !have(thing))) {
    return bjornalikes.find(thing => have(thing) && slots.includes(toSlot(thing)));
  }

  var hasStrongLep = findLeprechaunMultiplier(meatFamiliar()) >= 2;
  var goodRobortHats = $items(dropsgear_templateObject50 || (dropsgear_templateObject50 = dropsgear_taggedTemplateLiteral(["crumpled felt fedora"])));
  if (myClass() === $class(dropsgear_templateObject51 || (dropsgear_templateObject51 = dropsgear_taggedTemplateLiteral(["Turtle Tamer"])))) goodRobortHats.push($item(dropsgear_templateObject52 || (dropsgear_templateObject52 = dropsgear_taggedTemplateLiteral(["warbear foil hat"]))));

  if (numericModifier($item(dropsgear_templateObject53 || (dropsgear_templateObject53 = dropsgear_taggedTemplateLiteral(["shining star cap"]))), "Familiar Weight") === 10) {
    goodRobortHats.push($item(dropsgear_templateObject54 || (dropsgear_templateObject54 = dropsgear_taggedTemplateLiteral(["shining star cap"]))));
  }

  if (have($item(dropsgear_templateObject55 || (dropsgear_templateObject55 = dropsgear_taggedTemplateLiteral(["carpe"])))) && (!hasStrongLep || !goodRobortHats.some(hat => have(hat)))) {
    return $item(dropsgear_templateObject56 || (dropsgear_templateObject56 = dropsgear_taggedTemplateLiteral(["Crown of Thrones"])));
  }

  return $item(dropsgear_templateObject57 || (dropsgear_templateObject57 = dropsgear_taggedTemplateLiteral(["Buddy Bjorn"])));
}

function shavingBonus() {
  var _DaylightShavings$buf;

  if (!DaylightShavings.have() || DaylightShavings.buffs.some(buff => have(buff, 2))) {
    return new Map();
  }

  var timeToMeatBuff = 11 * ((_DaylightShavings$buf = DaylightShavings.buffsUntil($effect(dropsgear_templateObject58 || (dropsgear_templateObject58 = dropsgear_taggedTemplateLiteral(["Friendly Chops"]))))) !== null && _DaylightShavings$buf !== void 0 ? _DaylightShavings$buf : Infinity);

  if (globalOptions.ascending && timeToMeatBuff > estimatedTurns()) {
    return new Map();
  }

  if (!globalOptions.ascending && DaylightShavings.nextBuff() === $effect(dropsgear_templateObject59 || (dropsgear_templateObject59 = dropsgear_taggedTemplateLiteral(["Friendly Chops"]))) && estimatedTurns() < 11 * 11) {
    return new Map();
  }

  var bonusValue = (baseMeat * 100 + 72 * 50) / 100;
  return new Map([[$item(dropsgear_templateObject60 || (dropsgear_templateObject60 = dropsgear_taggedTemplateLiteral(["Daylight Shavings Helmet"]))), bonusValue]]);
}

var cachedUsingThumbRing = null;
/**
 * Calculates whether we expect to be wearing the thumb ring for most of the farming day.
 * This is used in functions that leverage projected turns; for instance, calculating the
 * number of turns of sweet synthesis required in our diet calcs or potion costs.
 * @returns boolean of whether we expect to be wearing the thumb ring for much of the day
 */

function usingThumbRing() {
  if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(dropsgear_templateObject61 || (dropsgear_templateObject61 = dropsgear_taggedTemplateLiteral(["mafia thumb ring"]))))) {
    return false;
  }

  if (cachedUsingThumbRing === null) {
    var gear = bonusAccessories("barf");
    var accessoryBonuses = Array.from(gear.entries()).filter(_ref => {
      var _ref2 = _slicedToArray(_ref, 1),
          item = _ref2[0];

      return (0,lib/* have */.lf)(item);
    });
    (0,external_kolmafia_.setLocation)((0,template_string/* $location */.PG)(dropsgear_templateObject62 || (dropsgear_templateObject62 = dropsgear_taggedTemplateLiteral(["Barf Mountain"]))));
    var meatAccessories = external_kolmafia_.Item.all().filter(item => (0,lib/* have */.lf)(item) && (0,external_kolmafia_.toSlot)(item) === (0,template_string/* $slot */.Jh)(dropsgear_templateObject63 || (dropsgear_templateObject63 = dropsgear_taggedTemplateLiteral(["acc1"]))) && (0,modifier/* get */.U)("Meat Drop", item) > 0).map(item => [item, (0,modifier/* get */.U)("Meat Drop", item) * src_lib/* baseMeat */.Vq / 100]);
    var accessoryValues = new Map(accessoryBonuses);

    var _iterator = _createForOfIteratorHelper(meatAccessories),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _accessoryValues$get;

        var _step$value = _slicedToArray(_step.value, 2),
            accessory = _step$value[0],
            value = _step$value[1];

        accessoryValues.set(accessory, value + ((_accessoryValues$get = accessoryValues.get(accessory)) !== null && _accessoryValues$get !== void 0 ? _accessoryValues$get : 0));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(dropsgear_templateObject64 || (dropsgear_templateObject64 = dropsgear_taggedTemplateLiteral(["mafia pointer finger ring"])))) && ((0,external_kolmafia_.myClass)() === (0,template_string/* $class */._$)(dropsgear_templateObject65 || (dropsgear_templateObject65 = dropsgear_taggedTemplateLiteral(["Seal Clubber"]))) && (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(dropsgear_templateObject66 || (dropsgear_templateObject66 = dropsgear_taggedTemplateLiteral(["Furious Wallop"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(dropsgear_templateObject67 || (dropsgear_templateObject67 = dropsgear_taggedTemplateLiteral(["haiku katana"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(dropsgear_templateObject68 || (dropsgear_templateObject68 = dropsgear_taggedTemplateLiteral(["Operation Patriot Shield"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(dropsgear_templateObject69 || (dropsgear_templateObject69 = dropsgear_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))))) {
      accessoryValues.set((0,template_string/* $item */.xr)(dropsgear_templateObject70 || (dropsgear_templateObject70 = dropsgear_taggedTemplateLiteral(["mafia pointer finger ring"]))), 500);
    }

    var bestAccessories = Array.from(accessoryValues.entries()).sort((_ref3, _ref4) => {
      var _ref5 = _slicedToArray(_ref3, 2),
          aBonus = _ref5[1];

      var _ref6 = _slicedToArray(_ref4, 2),
          bBonus = _ref6[1];

      return bBonus - aBonus;
    }).map(_ref7 => {
      var _ref8 = _slicedToArray(_ref7, 1),
          item = _ref8[0];

      return item;
    });
    cachedUsingThumbRing = bestAccessories.slice(0, 2).includes((0,template_string/* $item */.xr)(dropsgear_templateObject71 || (dropsgear_templateObject71 = dropsgear_taggedTemplateLiteral(["mafia thumb ring"]))));
  }

  return cachedUsingThumbRing;
}
var juneCleaverEV = null;

function juneCleaver(equipMode) {
  if (!have($item(dropsgear_templateObject72 || (dropsgear_templateObject72 = dropsgear_taggedTemplateLiteral(["June cleaver"])))) || get("_juneCleaverFightsLeft") > estimatedTurns()) {
    return new Map();
  }

  if (!juneCleaverEV) {
    juneCleaverEV = JuneCleaver.choices.reduce((total, choice) => total + valueJuneCleaverOption(juneCleaverChoiceValues[choice][bestJuneCleaverOption(choice)]), 0) / JuneCleaver.choices.length;
  }

  var interval = equipMode === "embezzler" ? 30 : JuneCleaver.getInterval();
  return new Map([[$item(dropsgear_templateObject73 || (dropsgear_templateObject73 = dropsgear_taggedTemplateLiteral(["June cleaver"]))), juneCleaverEV / interval]]);
}

function stickers(equipMode) {
  if (equipMode === "embezzler") return new Map();
  var cost = sumNumbers($slots(dropsgear_templateObject74 || (dropsgear_templateObject74 = dropsgear_taggedTemplateLiteral(["sticker1, sticker2, sticker3"]))).map(s => mallPrice(equippedItem(s)) / 20));
  return new Map([[$item(dropsgear_templateObject75 || (dropsgear_templateObject75 = dropsgear_taggedTemplateLiteral(["scratch 'n' sniff sword"]))), -1 * cost], [$item(dropsgear_templateObject76 || (dropsgear_templateObject76 = dropsgear_taggedTemplateLiteral(["scratch 'n' sniff crossbow"]))), -1 * cost]]);
}

/***/ }),

/***/ 4936:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AN": () => (/* binding */ estimatedTurns)
/* harmony export */ });
/* unused harmony exports EmbezzlerFight, embezzlerMacro, chainStarters, copySources, wanderSources, conditionalSources, fakeSources, emergencyChainStarters, embezzlerSources, embezzlerCount, getNextEmbezzlerFight */
/* harmony import */ var canadv_ash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2549);
/* harmony import */ var canadv_ash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(canadv_ash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(678);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2474);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3311);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1577);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7975);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4866);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1762);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5632);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(7329);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(9376);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(8588);
/* harmony import */ var _acquire__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4564);
/* harmony import */ var _combat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4223);
/* harmony import */ var _dropsgear__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5472);
/* harmony import */ var _extrovermectin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5836);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7442);
/* harmony import */ var _outfit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1730);
/* harmony import */ var _wanderer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5444);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104, _templateObject105, _templateObject106, _templateObject107, _templateObject108, _templateObject109, _templateObject110, _templateObject111, _templateObject112, _templateObject113, _templateObject114, _templateObject115, _templateObject116, _templateObject117, _templateObject118, _templateObject119, _templateObject120, _templateObject121, _templateObject122, _templateObject123, _templateObject124, _templateObject125, _templateObject126, _templateObject127, _templateObject128, _templateObject129, _templateObject130, _templateObject131, _templateObject132, _templateObject133, _templateObject134, _templateObject135, _templateObject136, _templateObject137, _templateObject138, _templateObject139, _templateObject140, _templateObject141, _templateObject142, _templateObject143, _templateObject144, _templateObject145, _templateObject146, _templateObject147, _templateObject148, _templateObject149, _templateObject150;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }











var embezzler = (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$monster */ .O4)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Knob Goblin Embezzler"])));
/**
 * Configure the behavior of the fights in use in different parts of the fight engine
 * @interface EmbezzlerFightConfigOptions
 * @member {Requirement[]?} requirements maximizer requirements to use for this fight (defaults to empty)
 * @member {draggableFight?} draggable if this fight can be pulled into another zone and what kind of draggable it is (defaults to undefined)
 * @member {boolean?} canInitializeWandererCounters if this fight can be used to initialize wanderers (defaults to false)
 * @member {boolean?} gregariousReplace if this is a "monster replacement" fight - pulls another monster from the CSV (defautls to false)
 * @member {boolean?} wrongEncounterName if mafia does not update the lastEncounter properly when doing this fight (defaults to value of gregariousReplace)
 */

var _macro = /*#__PURE__*/new WeakMap();

var _location = /*#__PURE__*/new WeakMap();

var _useAuto = /*#__PURE__*/new WeakMap();

var EmbezzlerFightRunOptions = /*#__PURE__*/function () {
  function EmbezzlerFightRunOptions(macro, location) {
    var useAuto = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, EmbezzlerFightRunOptions);

    _classPrivateFieldInitSpec(this, _macro, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _location, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _useAuto, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _macro, macro);

    _classPrivateFieldSet(this, _location, location);

    _classPrivateFieldSet(this, _useAuto, useAuto);
  }

  _createClass(EmbezzlerFightRunOptions, [{
    key: "macro",
    get: function get() {
      return _classPrivateFieldGet(this, _macro);
    }
  }, {
    key: "location",
    get: function get() {
      if (!_classPrivateFieldGet(this, _location)) {
        throw "Embezzler fight tried to access a location, but none was set";
      } else {
        return _classPrivateFieldGet(this, _location);
      }
    }
  }, {
    key: "useAuto",
    get: function get() {
      return _classPrivateFieldGet(this, _useAuto);
    }
  }]);

  return EmbezzlerFightRunOptions;
}();

var EmbezzlerFight = /*#__PURE__*/function () {
  /**
   * This is the class that creates all the different ways to fight embezzlers
   * @classdesc Embezzler Fight enc
   * @prop {string} name The name of the source of this fight, primarily used to identify special cases.
   * @prop {() => boolean} available Returns whether or not we can do this fight right now (this may change later in the day).
   * @prop {() => number} potential Returns the number of embezzlers we expect to be able to fight from this source given the current state of hte character
   *  This is used when computing turns for buffs, so it should be as accurate as possible to the number of KGE we will fight
   * @prop {(options: EmbezzlerFightRunOptions) => void} execute This runs the combat, optionally using the provided location and macro. Location is used only by draggable fights.
   *  This is the meat of each fight. How do you initialize the fight? Are there any special considerations?
   * @prop {EmbezzlerFightConfigOptions} options configuration options for this fight. see EmbezzlerFightConfigOptions for full details of all available options
   * @example
   * // suppose that we wanted to add a fight that will use print screens repeatedly, as long as we have them in our inventory
   * new EmbezzlerFight(
   *  "Print Screen Monster",
   *  () => have($item`screencapped monster`) && get('screencappedMonster') === embezzler, // in order to start this fight, a KGE must already be screen capped
   *  () => availableAmount($item`screencapped monster`) + availableAmount($item`print screen button`) // the total of potential of this fight is the number of already copied KGE + the number of potentially copiable KGE
   *  () => (options: EmbezzlerFightRunOptions) => {
   *    const macro = Macro
   *      .externalIf(have($item`print screen button`), Macro.tryItem($item`print screen button`))
   *      .step(options.macro); // you should always include the macro passed in via options, as it may have special considerations for this fight
   *    withMacro(macro, () => useItem($item`screen capped monster`));
   *  },
   *  {
   *    canInitializeWnadererCounts: false; // this copy cannot be used to start wanderer counters, since the combats are not adv.php
   *  }
   * )
   */
  function EmbezzlerFight(name, available, potential, execute) {
    var _options$requirements, _options$canInitializ, _options$gregariousRe, _options$wrongEncount;

    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    _classCallCheck(this, EmbezzlerFight);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "available", void 0);

    _defineProperty(this, "potential", void 0);

    _defineProperty(this, "execute", void 0);

    _defineProperty(this, "requirements", void 0);

    _defineProperty(this, "draggable", void 0);

    _defineProperty(this, "canInitializeWandererCounters", void 0);

    _defineProperty(this, "wrongEncounterName", void 0);

    _defineProperty(this, "gregariousReplace", void 0);

    this.name = name;
    this.available = available;
    this.potential = potential;
    this.execute = execute;
    this.requirements = (_options$requirements = options.requirements) !== null && _options$requirements !== void 0 ? _options$requirements : [];
    this.draggable = options.draggable;
    this.canInitializeWandererCounters = (_options$canInitializ = options.canInitializeWandererCounters) !== null && _options$canInitializ !== void 0 ? _options$canInitializ : false;
    this.gregariousReplace = (_options$gregariousRe = options.gregariousReplace) !== null && _options$gregariousRe !== void 0 ? _options$gregariousRe : false;
    this.wrongEncounterName = (_options$wrongEncount = options.wrongEncounterName) !== null && _options$wrongEncount !== void 0 ? _options$wrongEncount : this.gregariousReplace;
  }

  _createClass(EmbezzlerFight, [{
    key: "run",
    value: function run() {
      var _options$macro;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!this.available() || !(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myAdventures)()) return;
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Now running Embezzler fight: ".concat(this.name, ". Stay tuned for details."));
      var fightMacro = (_options$macro = options.macro) !== null && _options$macro !== void 0 ? _options$macro : embezzlerMacro();

      if (this.draggable) {
        this.execute(new EmbezzlerFightRunOptions(fightMacro, this.location(options.location), options.useAuto));
      } else {
        this.execute(new EmbezzlerFightRunOptions(fightMacro, undefined, options.useAuto));
      }
    }
  }, {
    key: "location",
    value: function location(_location2) {
      var taffyIsWorthIt = () => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mallPrice)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["pulled green taffy"])))) < 3 * (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("valueOfAdventure") && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.retrieveItem)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["pulled green taffy"]))));

      var suggestion = this.draggable && !_location2 && checkUnderwater() && taffyIsWorthIt() ? (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["The Briny Deeps"]))) : _location2;

      if (this.draggable && !suggestion || this.draggable === "backup" && suggestion && suggestion.combatPercent < 100) {
        return (0,_wanderer__WEBPACK_IMPORTED_MODULE_8__/* .determineDraggableZoneAndEnsureAccess */ .x)(this.draggable);
      }

      return suggestion !== null && suggestion !== void 0 ? suggestion : (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Noob Cave"])));
    }
  }]);

  return EmbezzlerFight;
}();

function checkUnderwater() {
  // first check to see if underwater even makes sense
  if ((0,libram__WEBPACK_IMPORTED_MODULE_11__/* .questStep */ .cL)("questS01OldGuy") >= 0 && !((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_envyfishEggUsed") || (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["envyfish egg"]))))) && ((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_garbo_weightChain", false) || !(0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$familiar */ .HP)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Pocket Professor"]))))) && ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.booleanModifier)("Adventure Underwater") || _outfit__WEBPACK_IMPORTED_MODULE_7__/* .waterBreathingEquipment.some */ .RG.some(item => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)(item))) && ((0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$effect */ ._G)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Fishy"])))) || (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["fishy pipe"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_fishyPipeUsed"))) {
    if (!(0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$effect */ ._G)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Fishy"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_fishyPipeUsed")) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["fishy pipe"]))));
    return (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$effect */ ._G)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Fishy"]))));
  }

  return false;
}

function checkFax() {
  if (!(0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["photocopied monster"]))))) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("fax receive");
  if (libram__WEBPACK_IMPORTED_MODULE_10__/* .getString */ .KF("photocopyMonster") === "Knob Goblin Embezzler") return true;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("fax send");
  return false;
}

function faxEmbezzler() {
  if (!(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_photocopyUsed")) {
    if (checkFax()) return;
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.chatPrivate)("cheesefax", "Knob Goblin Embezzler");

    for (var i = 0; i < 3; i++) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.wait)(10);
      if (checkFax()) return;
    }

    throw new Error("Failed to acquire photocopied Knob Goblin Embezzler.");
  }
}

var embezzlerMacro = () => _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.if_(embezzler, _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["The Briny Deeps"]))), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.tryCopier((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["pulled green taffy"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myFamiliar)() === (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$familiar */ .HP)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Reanimated Reanimator"]))), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Wink at"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myFamiliar)() === (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$familiar */ .HP)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["Obtuse Angel"]))), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["Fire a badly romantic arrow"]))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousCharges") > 0 && ((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousMonster") !== embezzler || (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousFightsLeft") === 0), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["Be Gregarious"]))))).externalIf(libram__WEBPACK_IMPORTED_MODULE_12__/* .getDigitizeMonster */ .Py() !== embezzler || (0,_combat__WEBPACK_IMPORTED_MODULE_3__.shouldRedigitize)(), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.tryCopier((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["Digitize"]))))).tryCopier((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["Spooky Putty sheet"])))).tryCopier((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Rain-Doh black box"])))).tryCopier((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["4-d camera"])))).tryCopier((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["unfinished ice sculpture"])))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_enamorangs") === 0, _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.tryCopier((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["LOV Enamorang"]))))).meatKill()).abort();

var wandererFailsafeMacro = () => _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["backup camera"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_backUpUses") < 11 && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("lastCopyableMonster") === embezzler, _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.if_("!monsterid ".concat(embezzler.id), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["Back-Up to your Last Enemy"]))))));

var chainStarters = [new EmbezzlerFight("Chateau Painting", () => libram__WEBPACK_IMPORTED_MODULE_13__/* .have */ .lf() && !libram__WEBPACK_IMPORTED_MODULE_13__/* .paintingFought */ .L0() && libram__WEBPACK_IMPORTED_MODULE_13__/* .paintingMonster */ .Aq() === embezzler, () => libram__WEBPACK_IMPORTED_MODULE_13__/* .have */ .lf() && !libram__WEBPACK_IMPORTED_MODULE_13__/* .paintingFought */ .L0() && libram__WEBPACK_IMPORTED_MODULE_13__/* .paintingMonster */ .Aq() === embezzler ? 1 : 0, options => {
  (0,_combat__WEBPACK_IMPORTED_MODULE_3__.withMacro)(options.macro, () => libram__WEBPACK_IMPORTED_MODULE_13__/* .fightPainting */ .OV(), options.useAuto);
}), new EmbezzlerFight("Combat Lover's Locket", () => libram__WEBPACK_IMPORTED_MODULE_14__/* .availableLocketMonsters */ .Lk().includes(embezzler), () => libram__WEBPACK_IMPORTED_MODULE_14__/* .availableLocketMonsters */ .Lk().includes(embezzler) ? 1 : 0, options => {
  (0,_combat__WEBPACK_IMPORTED_MODULE_3__.withMacro)(options.macro, () => libram__WEBPACK_IMPORTED_MODULE_14__/* .reminisce */ .HZ(embezzler), options.useAuto);
}), new EmbezzlerFight("Fax", () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["Clan VIP Lounge key"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_photocopyUsed") && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getClanLounge)()["deluxe fax machine"] !== undefined, () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["Clan VIP Lounge key"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_photocopyUsed") && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getClanLounge)()["deluxe fax machine"] !== undefined ? 1 : 0, options => {
  faxEmbezzler();
  (0,_combat__WEBPACK_IMPORTED_MODULE_3__.withMacro)(options.macro, () => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["photocopied monster"])))), options.useAuto);
}), new EmbezzlerFight("Pillkeeper Semirare", () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["Eight Days a Week Pill Keeper"])))) && (0,canadv_ash__WEBPACK_IMPORTED_MODULE_0__.canAdv)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["Cobb's Knob Treasury"]))), true) && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_freePillKeeperUsed") && !(0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$effect */ ._G)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["Lucky!"])))), () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["Eight Days a Week Pill Keeper"])))) && (0,canadv_ash__WEBPACK_IMPORTED_MODULE_0__.canAdv)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["Cobb's Knob Treasury"]))), true) && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_freePillKeeperUsed") && !(0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$effect */ ._G)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["Lucky!"])))) ? 1 : 0, options => {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.retrieveItem)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["Eight Days a Week Pill Keeper"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("pillkeeper semirare");

  if (!(0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$effect */ ._G)(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["Lucky!"]))))) {
    (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .set */ .t8)("_freePillKeeperUsed", true);
    return;
  }

  var adventureFunction = options.useAuto ? libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacroAuto */ .Ao : libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk;
  adventureFunction((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["Cobb's Knob Treasury"]))), options.macro, options.macro);
})];
var copySources = [new EmbezzlerFight("Time-Spinner", () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["Time-Spinner"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$locations */ .xw)(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["Noob Cave, The Dire Warren, The Haunted Kitchen"]))).some(location => location.combatQueue.includes(embezzler.name)) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_timeSpinnerMinutesUsed") <= 7, () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["Time-Spinner"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$locations */ .xw)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["Noob Cave, The Dire Warren, The Haunted Kitchen"]))).some(location => location.combatQueue.includes(embezzler.name) || (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousCharges") > 0) ? Math.floor((10 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_timeSpinnerMinutesUsed")) / 3) : 0, options => {
  (0,_combat__WEBPACK_IMPORTED_MODULE_3__.withMacro)(options.macro, () => {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("inv_use.php?whichitem=".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Time-Spinner"]))))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?whichchoice=1196&monid=".concat(embezzler.id, "&option=1"));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
  }, options.useAuto);
}), new EmbezzlerFight("Spooky Putty & Rain-Doh", () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["Spooky Putty monster"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("spookyPuttyMonster") === embezzler || (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Rain-Doh box full of monster"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("rainDohMonster") === embezzler, () => {
  var havePutty = (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["Spooky Putty sheet"])))) || (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["Spooky Putty monster"]))));
  var haveRainDoh = (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["Rain-Doh black box"])))) || (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["Rain-Doh box full of monster"]))));
  var puttyLocked = (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["Spooky Putty monster"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("spookyPuttyMonster") !== embezzler;
  var rainDohLocked = (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["Rain-Doh box full of monster"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("rainDohMonster") !== embezzler;

  if (havePutty && haveRainDoh) {
    if (puttyLocked && rainDohLocked) return 0;else if (puttyLocked) {
      return 5 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_raindohCopiesMade") + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["Rain-Doh box full of monster"]))));
    } else if (rainDohLocked) {
      return 5 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("spookyPuttyCopiesMade") + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["Spooky Putty monster"]))));
    }
    return 6 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("spookyPuttyCopiesMade") - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_raindohCopiesMade") + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["Spooky Putty monster"])))) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["Rain-Doh box full of monster"]))));
  } else if (havePutty) {
    if (puttyLocked) return 0;
    return 5 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("spookyPuttyCopiesMade") + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral(["Spooky Putty monster"]))));
  } else if (haveRainDoh) {
    if (rainDohLocked) return 0;
    return 5 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_raindohCopiesMade") + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["Rain-Doh box full of monster"]))));
  }

  return 0;
}, options => {
  var macro = options.macro;
  (0,_combat__WEBPACK_IMPORTED_MODULE_3__.withMacro)(macro, () => {
    if ((0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(["Spooky Putty monster"]))))) return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["Spooky Putty monster"]))));
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["Rain-Doh box full of monster"]))));
  }, options.useAuto);
}), new EmbezzlerFight("4-d Camera", () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["shaking 4-d camera"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("cameraMonster") === embezzler && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_cameraUsed"), () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["shaking 4-d camera"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("cameraMonster") === embezzler && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_cameraUsed") ? 1 : 0, options => {
  (0,_combat__WEBPACK_IMPORTED_MODULE_3__.withMacro)(options.macro, () => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["shaking 4-d camera"])))), options.useAuto);
}), new EmbezzlerFight("Ice Sculpture", () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["ice sculpture"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("iceSculptureMonster") === embezzler && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_iceSculptureUsed"), () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["ice sculpture"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("iceSculptureMonster") === embezzler && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_iceSculptureUsed") ? 1 : 0, options => {
  (0,_combat__WEBPACK_IMPORTED_MODULE_3__.withMacro)(options.macro, () => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral(["ice sculpture"])))), options.useAuto);
}), new EmbezzlerFight("Green Taffy", () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["envyfish egg"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("envyfishMonster") === embezzler && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_envyfishEggUsed"), () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral(["envyfish egg"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("envyfishMonster") === embezzler && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_envyfishEggUsed") ? 1 : 0, options => {
  (0,_combat__WEBPACK_IMPORTED_MODULE_3__.withMacro)(options.macro, () => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral(["envyfish egg"]))))), options.useAuto;
}), new EmbezzlerFight("Screencapped Monster", () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral(["screencapped monster"])))) && libram__WEBPACK_IMPORTED_MODULE_10__/* .getString */ .KF("screencappedMonster") === "Knob Goblin Embezzler", () => libram__WEBPACK_IMPORTED_MODULE_10__/* .getString */ .KF("screencappedMonster") === "Knob Goblin Embezzler" ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral(["screencapped monster"])))) : 0, options => {
  (0,_combat__WEBPACK_IMPORTED_MODULE_3__.withMacro)(options.macro, () => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral(["screencapped monster"])))), options.useAuto);
}), new EmbezzlerFight("Sticky Clay Homunculus", () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral(["sticky clay homunculus"])))) && libram__WEBPACK_IMPORTED_MODULE_10__/* .getString */ .KF("crudeMonster") === "Knob Goblin Embezzler", () => libram__WEBPACK_IMPORTED_MODULE_10__/* .getString */ .KF("crudeMonster") === "Knob Goblin Embezzler" ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral(["sticky clay homunculus"])))) : 0, options => (0,_combat__WEBPACK_IMPORTED_MODULE_3__.withMacro)(options.macro, () => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral(["sticky clay homunculus"])))), options.useAuto))];
var wanderSources = [new EmbezzlerFight("Lucky!", () => (0,canadv_ash__WEBPACK_IMPORTED_MODULE_0__.canAdv)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral(["Cobb's Knob Treasury"]))), true) && (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$effect */ ._G)(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral(["Lucky!"])))), () => (0,canadv_ash__WEBPACK_IMPORTED_MODULE_0__.canAdv)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral(["Cobb's Knob Treasury"]))), true) && (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$effect */ ._G)(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral(["Lucky!"])))) ? 1 : 0, options => {
  var adventureFunction = options.useAuto ? libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacroAuto */ .Ao : libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk;
  adventureFunction((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral(["Cobb's Knob Treasury"]))), options.macro, options.macro);
}), new EmbezzlerFight("Digitize", () => (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_sourceTerminalDigitizeMonster") === embezzler && libram__WEBPACK_IMPORTED_MODULE_16__/* .get */ .U2("Digitize Monster") <= 0, () => libram__WEBPACK_IMPORTED_MODULE_12__/* .have */ .lf() && libram__WEBPACK_IMPORTED_MODULE_12__/* .getDigitizeUses */ .xj() === 0 ? 1 : 0, options => {
  var adventureFunction = options.useAuto ? libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacroAuto */ .Ao : libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk;
  adventureFunction(options.location, wandererFailsafeMacro().step(options.macro), wandererFailsafeMacro().step(options.macro));
}, {
  draggable: "wanderer"
}), new EmbezzlerFight("Guaranteed Romantic Monster", () => (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_romanticFightsLeft") > 0 && libram__WEBPACK_IMPORTED_MODULE_16__/* .get */ .U2("Romantic Monster window begin") <= 0 && libram__WEBPACK_IMPORTED_MODULE_16__/* .get */ .U2("Romantic Monster window end") <= 0, () => 0, options => {
  var adventureFunction = options.useAuto ? libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacroAuto */ .Ao : libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk;
  adventureFunction(options.location, wandererFailsafeMacro().step(options.macro), wandererFailsafeMacro().step(options.macro));
}, {
  draggable: "wanderer"
}), new EmbezzlerFight("Enamorang", () => libram__WEBPACK_IMPORTED_MODULE_16__/* .get */ .U2("Enamorang") <= 0 && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("enamorangMonster") === embezzler, () => libram__WEBPACK_IMPORTED_MODULE_16__/* .get */ .U2("Enamorang") <= 0 && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("enamorangMonster") === embezzler || (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral(["LOV Enamorang"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_enamorangs") ? 1 : 0, options => {
  var adventureFunction = options.useAuto ? libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacroAuto */ .Ao : libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk;
  adventureFunction(options.location, wandererFailsafeMacro().step(options.macro), wandererFailsafeMacro().step(options.macro));
}, {
  draggable: "wanderer"
})];
var conditionalSources = [new EmbezzlerFight("Orb Prediction", () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral(["miniature crystal ball"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_garbo_doneGregging", false) && libram__WEBPACK_IMPORTED_MODULE_17__/* .ponder */ .DF().get((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral(["The Dire Warren"])))) === embezzler, () => ((0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral(["miniature crystal ball"])))) ? 1 : 0) * ((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousCharges") + ((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousFightsLeft") > 0 || libram__WEBPACK_IMPORTED_MODULE_17__/* .ponder */ .DF().get((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral(["The Dire Warren"])))) === embezzler ? 1 : 0)), options => {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("inventory.php?ponder=1");

  if (libram__WEBPACK_IMPORTED_MODULE_17__/* .ponder */ .DF().get((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral(["The Dire Warren"])))) !== (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$monster */ .O4)(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral(["Knob Goblin Embezzler"])))) {
    return;
  }

  var adventureFunction = options.useAuto ? libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacroAuto */ .Ao : libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk;
  adventureFunction((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral(["The Dire Warren"]))), options.macro, options.macro);
  toasterGaze();
  if (!(0,_extrovermectin__WEBPACK_IMPORTED_MODULE_5__/* .doingExtrovermectin */ .KN)()) (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .set */ .t8)("_garbo_doneGregging", true);
}, {
  requirements: [new libram__WEBPACK_IMPORTED_MODULE_18__/* .Requirement */ .nb([], {
    forceEquip: (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$items */ .vS)(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral(["miniature crystal ball"])))
  })],
  canInitializeWandererCounters: true
}), new EmbezzlerFight("Macrometeorite", () => (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousMonster") === embezzler && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousFightsLeft") > 0 && (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral(["Meteor Lore"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_macrometeoriteUses") < 10 && proceedWithOrb(), () => ((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousMonster") === embezzler && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousFightsLeft") > 0 || (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousCharges") > 0) && (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral(["Meteor Lore"])))) ? 10 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_macrometeoriteUses") : 0, options => {
  (0,_extrovermectin__WEBPACK_IMPORTED_MODULE_5__/* .equipOrbIfDesired */ .H1)();
  var crateIsSabered = (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_saberForceMonster") === (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$monster */ .O4)(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral(["crate"])));
  var notEnoughCratesSabered = (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_saberForceMonsterCount") < 2;
  var weWantToSaberCrates = !crateIsSabered || notEnoughCratesSabered;
  (0,_lib__WEBPACK_IMPORTED_MODULE_6__/* .setChoice */ .Y7)(1387, 2);
  var macro = _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$monster */ .O4)(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral(["crate"]))), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.externalIf((0,_extrovermectin__WEBPACK_IMPORTED_MODULE_5__/* .crateStrategy */ .Gc)() !== "Saber" && !(0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$effect */ ._G)(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral(["On the Trail"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_olfactionsUsed") < 2, _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.tryHaveSkill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral(["Transcendent Olfaction"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))) && weWantToSaberCrates && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_saberForceUses") < 5, _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral(["Use the Force"]))))).skill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral(["Macrometeorite"]))))).step(options.macro);
  var adventureFunction = options.useAuto ? libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacroAuto */ .Ao : libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk;
  adventureFunction((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral(["Noob Cave"]))), macro, macro);
  if (libram__WEBPACK_IMPORTED_MODULE_17__/* .ponder */ .DF().get((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral(["Noob Cave"])))) === embezzler) toasterGaze();
}, {
  gregariousReplace: true
}), new EmbezzlerFight("Powerful Glove", () => (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousMonster") === embezzler && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousFightsLeft") > 0 && (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral(["Powerful Glove"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_powerfulGloveBatteryPowerUsed") <= 90 && proceedWithOrb(), () => ((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousMonster") === embezzler && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousFightsLeft") > 0 || (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousCharges") > 0) && (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral(["Powerful Glove"])))) ? Math.min((100 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_powerfulGloveBatteryPowerUsed")) / 10) : 0, options => {
  (0,_extrovermectin__WEBPACK_IMPORTED_MODULE_5__/* .equipOrbIfDesired */ .H1)();
  var crateIsSabered = (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_saberForceMonster") === (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$monster */ .O4)(_templateObject105 || (_templateObject105 = _taggedTemplateLiteral(["crate"])));
  var notEnoughCratesSabered = (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_saberForceMonsterCount") < 2;
  var weWantToSaberCrates = !crateIsSabered || notEnoughCratesSabered;
  (0,_lib__WEBPACK_IMPORTED_MODULE_6__/* .setChoice */ .Y7)(1387, 2);
  var macro = _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$monster */ .O4)(_templateObject106 || (_templateObject106 = _taggedTemplateLiteral(["crate"]))), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.externalIf((0,_extrovermectin__WEBPACK_IMPORTED_MODULE_5__/* .crateStrategy */ .Gc)() !== "Saber" && !(0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$effect */ ._G)(_templateObject107 || (_templateObject107 = _taggedTemplateLiteral(["On the Trail"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_olfactionsUsed") < 2, _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.tryHaveSkill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject108 || (_templateObject108 = _taggedTemplateLiteral(["Transcendent Olfaction"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject109 || (_templateObject109 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))) && weWantToSaberCrates && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_saberForceUses") < 5, _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject110 || (_templateObject110 = _taggedTemplateLiteral(["Use the Force"]))))).skill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject111 || (_templateObject111 = _taggedTemplateLiteral(["CHEAT CODE: Replace Enemy"]))))).step(options.macro);
  var adventureFunction = options.useAuto ? libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacroAuto */ .Ao : libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk;
  adventureFunction((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject112 || (_templateObject112 = _taggedTemplateLiteral(["Noob Cave"]))), macro, macro);
  if (libram__WEBPACK_IMPORTED_MODULE_17__/* .ponder */ .DF().get((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject113 || (_templateObject113 = _taggedTemplateLiteral(["Noob Cave"])))) === embezzler) toasterGaze();
}, {
  requirements: [new libram__WEBPACK_IMPORTED_MODULE_18__/* .Requirement */ .nb([], {
    forceEquip: (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$items */ .vS)(_templateObject114 || (_templateObject114 = _taggedTemplateLiteral(["Powerful Glove"])))
  })],
  gregariousReplace: true
}), new EmbezzlerFight("Be Gregarious", () => (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousMonster") === embezzler && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousFightsLeft") > ((0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject115 || (_templateObject115 = _taggedTemplateLiteral(["miniature crystal ball"])))) ? 1 : 0), () => (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousMonster") === embezzler ? (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousCharges") * 3 + (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousFightsLeft") : 0, options => {
  var _run$constraints$prep, _run$constraints;

  var run = (0,_lib__WEBPACK_IMPORTED_MODULE_6__/* .ltbRun */ .Pw)();
  (_run$constraints$prep = (_run$constraints = run.constraints).preparation) === null || _run$constraints$prep === void 0 ? void 0 : _run$constraints$prep.call(_run$constraints);
  var adventureFunction = options.useAuto ? libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacroAuto */ .Ao : libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk;
  adventureFunction((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject116 || (_templateObject116 = _taggedTemplateLiteral(["The Dire Warren"]))), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$monster */ .O4)(_templateObject117 || (_templateObject117 = _taggedTemplateLiteral(["fluffy bunny"]))), run.macro).step(options.macro), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.if_((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$monster */ .O4)(_templateObject118 || (_templateObject118 = _taggedTemplateLiteral(["fluffy bunny"]))), run.macro).step(options.macro)); // reset the crystal ball prediction by staring longingly at toast

  if ((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousFightsLeft") === 1 && (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject119 || (_templateObject119 = _taggedTemplateLiteral(["miniature crystal ball"]))))) {
    var warrenPrediction = libram__WEBPACK_IMPORTED_MODULE_17__/* .ponder */ .DF().get((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject120 || (_templateObject120 = _taggedTemplateLiteral(["The Dire Warren"]))));
    if (warrenPrediction !== embezzler) toasterGaze();
  }
}, {
  canInitializeWandererCounters: true
}), new EmbezzlerFight("Be Gregarious (Set Up Crystal Ball)", () => (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousMonster") === embezzler && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousFightsLeft") === 1 && (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject121 || (_templateObject121 = _taggedTemplateLiteral(["miniature crystal ball"])))) && !libram__WEBPACK_IMPORTED_MODULE_17__/* .ponder */ .DF().get((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject122 || (_templateObject122 = _taggedTemplateLiteral(["The Dire Warren"])))), () => (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousMonster") === embezzler && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousFightsLeft") > 0 || (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("beGregariousCharges") > 0 ? 1 : 0, options => {
  (0,libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject123 || (_templateObject123 = _taggedTemplateLiteral(["The Dire Warren"]))), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.if_(embezzler, options.macro).abort());
}, {
  requirements: [new libram__WEBPACK_IMPORTED_MODULE_18__/* .Requirement */ .nb([], {
    forceEquip: (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$items */ .vS)(_templateObject124 || (_templateObject124 = _taggedTemplateLiteral(["miniature crystal ball"]))).filter(item => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)(item))
  })],
  canInitializeWandererCounters: true
}), new EmbezzlerFight("Backup", () => (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("lastCopyableMonster") === embezzler && (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject125 || (_templateObject125 = _taggedTemplateLiteral(["backup camera"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_backUpUses") < 11, () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject126 || (_templateObject126 = _taggedTemplateLiteral(["backup camera"])))) ? 11 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_backUpUses") : 0, options => {
  var adventureFunction = options.useAuto ? libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacroAuto */ .Ao : libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk;
  adventureFunction(options.location, _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.if_("!monsterid ".concat(embezzler.id), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject127 || (_templateObject127 = _taggedTemplateLiteral(["Back-Up to your Last Enemy"]))))).step(options.macro), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.if_("!monsterid ".concat(embezzler.id), _combat__WEBPACK_IMPORTED_MODULE_3__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$skill */ .tm)(_templateObject128 || (_templateObject128 = _taggedTemplateLiteral(["Back-Up to your Last Enemy"]))))).step(options.macro));
}, {
  requirements: [new libram__WEBPACK_IMPORTED_MODULE_18__/* .Requirement */ .nb([], {
    forceEquip: (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$items */ .vS)(_templateObject129 || (_templateObject129 = _taggedTemplateLiteral(["backup camera"]))),
    bonusEquip: new Map([[(0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject130 || (_templateObject130 = _taggedTemplateLiteral(["backup camera"]))), 5000]])
  })],
  draggable: "backup",
  wrongEncounterName: true,
  canInitializeWandererCounters: true
})];
var fakeSources = [new EmbezzlerFight("Professor MeatChain", () => false, () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$familiar */ .HP)(_templateObject131 || (_templateObject131 = _taggedTemplateLiteral(["Pocket Professor"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_garbo_meatChain", false) ? Math.max(10 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_pocketProfessorLectures"), 0) : 0, () => {
  return;
}), new EmbezzlerFight("Professor WeightChain", () => false, () => (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$familiar */ .HP)(_templateObject132 || (_templateObject132 = _taggedTemplateLiteral(["Pocket Professor"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_garbo_weightChain", false) ? Math.min(15 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_pocketProfessorLectures"), 5) : 0, () => {
  return;
})];
var emergencyChainStarters = [// These are very deliberately the last embezzler fights.
new EmbezzlerFight("11-leaf clover (untapped potential)", () => {
  var potential = Math.floor(embezzlerCount());
  if (potential < 1) return false;
  if (!(0,canadv_ash__WEBPACK_IMPORTED_MODULE_0__.canAdv)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject133 || (_templateObject133 = _taggedTemplateLiteral(["Cobb's Knob Treasury"]))), true)) return false; // Don't use clovers if wishes are available and cheaper

  if ((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_genieFightsUsed") < 3 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mallPrice)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject134 || (_templateObject134 = _taggedTemplateLiteral(["11-leaf clover"])))) >= _lib__WEBPACK_IMPORTED_MODULE_6__/* .WISH_VALUE */ .zO) {
    return false;
  }

  if (_lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.askedAboutWish */ .Xe.askedAboutWish) return _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.wishAnswer */ .Xe.wishAnswer;
  var profit = (potential + 1) * (0,_lib__WEBPACK_IMPORTED_MODULE_6__/* .averageEmbezzlerNet */ .bb)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mallPrice)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject135 || (_templateObject135 = _taggedTemplateLiteral(["11-leaf clover"]))));
  if (profit < 0) return false;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("You have the following embezzler-sources untapped right now:", _lib__WEBPACK_IMPORTED_MODULE_6__/* .HIGHLIGHT */ .X2);
  embezzlerSources.filter(source => source.potential() > 0).map(source => "".concat(source.potential(), " from ").concat(source.name)).forEach(text => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)(text, _lib__WEBPACK_IMPORTED_MODULE_6__/* .HIGHLIGHT */ .X2));
  _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.askedAboutWish */ .Xe.askedAboutWish = true;
  _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.wishAnswer */ .Xe.wishAnswer = (0,_lib__WEBPACK_IMPORTED_MODULE_6__/* .userConfirmDialog */ .tq)("Garbo has detected you have ".concat(potential, " potential ways to copy an Embezzler, but no way to start a fight with one. Current embezzler net (before potions) is ").concat((0,_lib__WEBPACK_IMPORTED_MODULE_6__/* .averageEmbezzlerNet */ .bb)(), ", so we expect to earn ").concat(profit, " meat, after the cost of a 11-leaf clover. Should we get Lucky! for an Embezzler?"), true);
  return _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.wishAnswer */ .Xe.wishAnswer;
}, () => 0, options => {
  libram__WEBPACK_IMPORTED_MODULE_10__/* .withProperty */ .pr("autoSatisfyWithCloset", true, () => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.retrieveItem)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject136 || (_templateObject136 = _taggedTemplateLiteral(["11-leaf clover"])))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject137 || (_templateObject137 = _taggedTemplateLiteral(["11-leaf clover"]))));

  if ((0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$effect */ ._G)(_templateObject138 || (_templateObject138 = _taggedTemplateLiteral(["Lucky!"]))))) {
    var adventureFunction = options.useAuto ? libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacroAuto */ .Ao : libram__WEBPACK_IMPORTED_MODULE_15__/* .adventureMacro */ .Qk;
    adventureFunction((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject139 || (_templateObject139 = _taggedTemplateLiteral(["Cobb's Knob Treasury"]))), options.macro, options.macro);
  }

  _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.askedAboutWish */ .Xe.askedAboutWish = false;
}), new EmbezzlerFight("Pocket Wish (untapped potential)", () => {
  var potential = Math.floor(embezzlerCount());
  if (potential < 1) return false;
  if ((0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_genieFightsUsed") >= 3) return false;
  if (_lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.askedAboutWish */ .Xe.askedAboutWish) return _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.wishAnswer */ .Xe.wishAnswer;
  var profit = (potential + 1) * (0,_lib__WEBPACK_IMPORTED_MODULE_6__/* .averageEmbezzlerNet */ .bb)() - _lib__WEBPACK_IMPORTED_MODULE_6__/* .WISH_VALUE */ .zO;
  if (profit < 0) return false;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("You have the following embezzler-sources untapped right now:", _lib__WEBPACK_IMPORTED_MODULE_6__/* .HIGHLIGHT */ .X2);
  embezzlerSources.filter(source => source.potential() > 0).map(source => "".concat(source.potential(), " from ").concat(source.name)).forEach(text => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)(text, _lib__WEBPACK_IMPORTED_MODULE_6__/* .HIGHLIGHT */ .X2));
  _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.askedAboutWish */ .Xe.askedAboutWish = true;
  _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.wishAnswer */ .Xe.wishAnswer = (0,_lib__WEBPACK_IMPORTED_MODULE_6__/* .userConfirmDialog */ .tq)("Garbo has detected you have ".concat(potential, " potential ways to copy an Embezzler, but no way to start a fight with one. Current embezzler net (before potions) is ").concat((0,_lib__WEBPACK_IMPORTED_MODULE_6__/* .averageEmbezzlerNet */ .bb)(), ", so we expect to earn ").concat(profit, " meat, after the cost of a wish. Should we wish for an Embezzler?"), true);
  return _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.wishAnswer */ .Xe.wishAnswer;
}, () => 0, options => {
  (0,_combat__WEBPACK_IMPORTED_MODULE_3__.withMacro)(options.macro, () => {
    (0,_acquire__WEBPACK_IMPORTED_MODULE_2__/* .acquire */ .u)(1, (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject140 || (_templateObject140 = _taggedTemplateLiteral(["pocket wish"]))), _lib__WEBPACK_IMPORTED_MODULE_6__/* .WISH_VALUE */ .zO);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("inv_use.php?pwd=".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHash)(), "&which=3&whichitem=9537"), false, true);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?pwd&whichchoice=1267&option=1&wish=to fight a Knob Goblin Embezzler ", true, true);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("main.php", false);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
    _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.askedAboutWish */ .Xe.askedAboutWish = false;
  }, options.useAuto);
})];
var embezzlerSources = [].concat(wanderSources, conditionalSources, copySources, chainStarters, emergencyChainStarters, fakeSources);
function embezzlerCount() {
  return (0,libram__WEBPACK_IMPORTED_MODULE_19__/* .sum */ .Sm)(embezzlerSources, source => source.potential());
}
function estimatedTurns() {
  // Assume roughly 2 fullness from pantsgiving and 8 adventures/fullness.
  var pantsgivingAdventures = (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject141 || (_templateObject141 = _taggedTemplateLiteral(["Pantsgiving"])))) ? Math.max(0, 2 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_pantsgivingFullness")) * 8 : 0;
  var potentialSausages = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject142 || (_templateObject142 = _taggedTemplateLiteral(["magical sausage"])))) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject143 || (_templateObject143 = _taggedTemplateLiteral(["magical sausage casing"]))));
  var sausageAdventures = (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject144 || (_templateObject144 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"])))) ? Math.min(potentialSausages, 23 - (0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_sausagesEaten")) : 0;
  var thesisAdventures = (0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$familiar */ .HP)(_templateObject145 || (_templateObject145 = _taggedTemplateLiteral(["Pocket Professor"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_thesisDelivered") ? 11 : 0;
  var nightcapAdventures = _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.ascending */ .Xe.ascending && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myInebriety)() <= (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.inebrietyLimit)() ? 60 : 0;
  var thumbRingMultiplier = (0,_dropsgear__WEBPACK_IMPORTED_MODULE_4__/* .usingThumbRing */ .uv)() ? 1 / 0.96 : 1; // We need to estimate adventures from our organs if we are only dieting after yachtzee chaining

  var fullnessAdventures = ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.fullnessLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myFullness)()) * 8;
  var inebrietyAdventures = ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.inebrietyLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myInebriety)()) * 7;
  var adventuresAfterChaining = _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.yachtzeeChain */ .Xe.yachtzeeChain && !(0,libram__WEBPACK_IMPORTED_MODULE_10__/* .get */ .U2)("_garboYachtzeeChainCompleted") ? Math.max(fullnessAdventures + inebrietyAdventures - 30, 0) : 0;
  var turns;
  if (_lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.stopTurncount */ .Xe.stopTurncount) turns = _lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.stopTurncount */ .Xe.stopTurncount - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();else if (_lib__WEBPACK_IMPORTED_MODULE_6__/* .globalOptions.noBarf */ .Xe.noBarf) turns = embezzlerCount();else {
    turns = ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myAdventures)() + sausageAdventures + pantsgivingAdventures + nightcapAdventures + thesisAdventures + adventuresAfterChaining) * thumbRingMultiplier;
  }
  return turns;
}
/**
 * Gets next available embezzler fight. If there is no way to generate a fight, but copies are available,
 * the user is prompted to purchase a pocket wish to start the embezzler chain.
 * @returns the next available embezzler fight
 */

function getNextEmbezzlerFight() {
  var _ref;

  var wanderer = wanderSources.find(fight => fight.available());
  if (wanderer) return wanderer;
  var conditional = conditionalSources.find(fight => fight.available());

  if (conditional) {
    var leftoverReplacers = (have($skill(_templateObject146 || (_templateObject146 = _taggedTemplateLiteral(["Meteor Lore"])))) ? 10 - get("_macrometeoriteUses") : 0) + (have($item(_templateObject147 || (_templateObject147 = _taggedTemplateLiteral(["Powerful Glove"])))) ? Math.floor(100 - get("_powerfulGloveBatteryPowerUsed") / 10) : 0); // we don't want to reset our orb with a gregarious fight; that defeats the purpose

    var skip = conditional.name === "Be Gregarious" && crateStrategy() === "Orb" && leftoverReplacers;
    if (!skip) return conditional;
  }

  var copy = copySources.find(fight => fight.available());
  if (copy) return copy;
  var chainStart = chainStarters.find(fight => fight.available());
  if (chainStart) return chainStart;
  return (_ref = conditional !== null && conditional !== void 0 ? conditional : emergencyChainStarters.find(fight => fight.available())) !== null && _ref !== void 0 ? _ref : null;
}
/**
 * Determines whether we want to do this particular Embezzler fight; if we aren't using orb, should always return true. If we're using orb and it's a crate, we'll have to see!
 * @returns
 */

function proceedWithOrb() {
  var strat = (0,_extrovermectin__WEBPACK_IMPORTED_MODULE_5__/* .crateStrategy */ .Gc)(); // If we can't possibly use orb, return true

  if (!(0,libram__WEBPACK_IMPORTED_MODULE_11__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$item */ .xr)(_templateObject148 || (_templateObject148 = _taggedTemplateLiteral(["miniature crystal ball"])))) || strat !== "Orb") return true; // If we're using orb, we have a KGE prediction, and we can reset it, return false

  var gregFightNames = ["Macrometeorite", "Powerful Glove", "Be Gregarious", "Orb Prediction"];

  if (libram__WEBPACK_IMPORTED_MODULE_17__/* .ponder */ .DF().get((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject149 || (_templateObject149 = _taggedTemplateLiteral(["Noob Cave"])))) === embezzler && embezzlerSources.filter(source => !gregFightNames.includes(source.name)).find(source => source.available())) {
    return false;
  }

  return true;
}

function toasterGaze() {
  try {
    var store = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toUrl)((0,libram__WEBPACK_IMPORTED_MODULE_9__/* .$location */ .PG)(_templateObject150 || (_templateObject150 = _taggedTemplateLiteral(["The Shore, Inc. Travel Agency"])))));

    if (!store.includes("Check out the gift shop")) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Unable to stare longingly at toast");
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(4);
  } catch (_unused) {// orb reseting raises a mafia error
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("main.php");
}

/***/ }),

/***/ 5836:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KN": () => (/* binding */ doingExtrovermectin),
/* harmony export */   "Gc": () => (/* binding */ crateStrategy),
/* harmony export */   "H1": () => (/* binding */ equipOrbIfDesired)
/* harmony export */ });
/* unused harmony exports expectedGregs, hasMonsterReplacers, saberCrateIfSafe, initializeExtrovermectinZones */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2474);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3311);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(678);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7329);
/* harmony import */ var _familiar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9737);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7442);
/* harmony import */ var _combat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4223);
/* harmony import */ var _embezzler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4936);
/* harmony import */ var _acquire__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4564);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








function expectedGregs() {
  var baseGregs = 3;
  var timeSpunGregs = have($item(_templateObject || (_templateObject = _taggedTemplateLiteral(["Time-Spinner"])))) ? Math.floor((10 - get("_timeSpinnerMinutesUsed")) / 3) : 0;
  var orbGregs = have($item(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["miniature crystal ball"])))) ? 1 : 0;
  var macrometeors = have($skill(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Meteor Lore"])))) ? 10 - get("_macrometeoriteUses") : 0;
  var replaceEnemies = have($item(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Powerful Glove"])))) ? Math.floor((100 - get("_powerfulGloveBatteryPowerUsed")) / 10) : 0;
  var totalMonsterReplacers = macrometeors + replaceEnemies;
  var sabersLeft = have($item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))) ? clamp(5 - get("_saberForceUses"), 0, 3) : 0;
  var gregs = []; // these are estimates based on intuition

  var replacesPerGreg = have($skill(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Transcendent Olfaction"])))) ? 7 : 5;
  var firstReplaces = clamp(sabersLeft * 2 + replacesPerGreg, 0, totalMonsterReplacers);
  gregs.push(baseGregs + orbGregs + timeSpunGregs + firstReplaces);
  totalMonsterReplacers -= firstReplaces;

  while (totalMonsterReplacers > 0) {
    gregs.push(baseGregs + orbGregs + clamp(replacesPerGreg, 0, totalMonsterReplacers));
    totalMonsterReplacers -= replacesPerGreg;
  }

  gregs.push(baseGregs + orbGregs);
  return gregs;
}
function doingExtrovermectin() {
  return (0,libram__WEBPACK_IMPORTED_MODULE_8__/* .get */ .U2)("beGregariousCharges") > 0 || (0,libram__WEBPACK_IMPORTED_MODULE_8__/* .get */ .U2)("beGregariousFightsLeft") > 0 || _lib__WEBPACK_IMPORTED_MODULE_2__/* .globalOptions.yachtzeeChain */ .Xe.yachtzeeChain && !(0,libram__WEBPACK_IMPORTED_MODULE_8__/* .get */ .U2)("_garboYachtzeeChainCompleted");
}
function crateStrategy() {
  if (!doingExtrovermectin()) return null;

  if ((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$skill */ .tm)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Transcendent Olfaction"])))) && (libram__WEBPACK_IMPORTED_MODULE_8__/* .getString */ .KF("olfactedMonster") === "crate" || (0,libram__WEBPACK_IMPORTED_MODULE_8__/* .get */ .U2)("_olfactionsUsed") < 2)) {
    return "Sniff";
  }

  if ((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$item */ .xr)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["miniature crystal ball"]))))) return "Orb";
  if ((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$item */ .xr)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_8__/* .get */ .U2)("_saberForceUses") < 5) return "Saber";
  return null;
}
function hasMonsterReplacers() {
  return have($skill(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Meteor Lore"])))) && get("_macrometeoriteUses") < 10 || have($item(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Powerful Glove"])))) && get("_powerfulGloveBatteryPowerUsed") < 90;
}
/**
 * Saberfriends a crate if we are able to do so.
 */

function saberCrateIfSafe() {
  var canSaber = have($item(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))) && get("_saberForceUses") < 5;
  var isSafeToSaber = get("beGregariousFightsLeft") === 0 || get("_saberForceMonsterCount") > 0;
  if (!canSaber || !isSafeToSaber) return;

  do {
    var _tryFindFreeRun, _run$constraints$fami, _run$constraints$fami2, _run$constraints, _run$constraints$prep, _run$constraints2, _run$constraints$equi, _run$constraints$equi2, _run$constraints3;

    var run = (_tryFindFreeRun = tryFindFreeRun()) !== null && _tryFindFreeRun !== void 0 ? _tryFindFreeRun : ltbRun();
    useFamiliar((_run$constraints$fami = (_run$constraints$fami2 = (_run$constraints = run.constraints).familiar) === null || _run$constraints$fami2 === void 0 ? void 0 : _run$constraints$fami2.call(_run$constraints)) !== null && _run$constraints$fami !== void 0 ? _run$constraints$fami : freeFightFamiliar());
    (_run$constraints$prep = (_run$constraints2 = run.constraints).preparation) === null || _run$constraints$prep === void 0 ? void 0 : _run$constraints$prep.call(_run$constraints2);
    new Requirement([], {
      forceEquip: $items(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))),
      preventEquip: $items(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"])))
    }).merge((_run$constraints$equi = (_run$constraints$equi2 = (_run$constraints3 = run.constraints).equipmentRequirements) === null || _run$constraints$equi2 === void 0 ? void 0 : _run$constraints$equi2.call(_run$constraints3)) !== null && _run$constraints$equi !== void 0 ? _run$constraints$equi : new Requirement([], {})).maximize();
    setChoice(1387, 2);
    adventureMacro($location(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Noob Cave"]))), Macro.if_($monster(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["crate"]))), Macro.skill($skill(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Use the Force"]))))).if_($monsters(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["giant rubber spider, time-spinner prank"]))), Macro.kill()).if_($monster(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["sausage goblin"]))), Macro.kill()).ifHolidayWanderer(run.macro).abort());
  } while (["Puttin' it on Wax", "Wooof! Wooooooof!", "Playing Fetch*", "Your Dog Found Something Again"].includes(get("lastEncounter")));
}
/**
 * Equip the miniature crystal ball if the current prediction is good for us.
 */

function equipOrbIfDesired() {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$item */ .xr)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["miniature crystal ball"])))) && !((0,libram__WEBPACK_IMPORTED_MODULE_8__/* .get */ .U2)("_saberForceMonster") === (0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$monster */ .O4)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["crate"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_8__/* .get */ .U2)("_saberForceMonsterCount") > 0) && crateStrategy() !== "Sniff" && [undefined, (0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$monster */ .O4)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["crate"])))].includes(libram__WEBPACK_IMPORTED_MODULE_13__/* .ponder */ .DF().get((0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$location */ .PG)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Noob Cave"])))))) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$slot */ .Jh)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["familiar"]))), (0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$item */ .xr)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["miniature crystal ball"]))));
  }
}
/**
 * Pre-olfact/saber crates, for extrovermectin/gregarious reasons.
 */

function initializeCrates() {
  do {
    // We use the force while olfacting sometimes, so we'll need to refresh mafia's knowledge of olfaction
    if (property.getString("olfactedMonster") !== "crate") {
      visitUrl("desc_effect.php?whicheffect=".concat($effect(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["On the Trail"]))).descid));
    } // if we have olfaction, that's our primary method for ensuring crates


    if (crateStrategy() === "Sniff" && property.getString("olfactedMonster") !== "crate" || crateStrategy() === "Orb" && (get("_gallapagosMonster") !== $monster(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["crate"]))) && have($skill(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["Gallapagosian Mating Call"])))) || have($item(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["latte lovers member's mug"])))) && !get("_latteCopyUsed"))) {
      var _tryFindFreeRun2, _run$constraints$fami3, _run$constraints$fami4, _run$constraints4, _run$constraints$prep2, _run$constraints5, _run$constraints$equi3, _run$constraints$equi4, _run$constraints6;

      var run = (_tryFindFreeRun2 = tryFindFreeRun(latteActionSourceFinderConstraints)) !== null && _tryFindFreeRun2 !== void 0 ? _tryFindFreeRun2 : ltbRun();
      setChoice(1387, 2); // use the force, in case we decide to use that
      // Sniff the crate in as many ways as humanly possible

      var macro = Macro.trySkill($skill(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["Transcendent Olfaction"])))).trySkill($skill(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["Offer Latte to Opponent"])))).externalIf(get("_gallapagosMonster") !== $monster(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["crate"]))) && have($skill(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["Gallapagosian Mating Call"])))), Macro.trySkill($skill(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["Gallapagosian Mating Call"]))))).trySkill($skill(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["Use the Force"])))).step(run.macro); // equip latte and saber for lattesniff and saberfriends, if we want to
      // Crank up ML to make sure the crate survives several rounds; we may have some passive damage

      useFamiliar((_run$constraints$fami3 = (_run$constraints$fami4 = (_run$constraints4 = run.constraints).familiar) === null || _run$constraints$fami4 === void 0 ? void 0 : _run$constraints$fami4.call(_run$constraints4)) !== null && _run$constraints$fami3 !== void 0 ? _run$constraints$fami3 : freeFightFamiliar());
      (_run$constraints$prep2 = (_run$constraints5 = run.constraints).preparation) === null || _run$constraints$prep2 === void 0 ? void 0 : _run$constraints$prep2.call(_run$constraints5);
      new Requirement(["100 Monster Level"], {
        forceEquip: $items(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["latte lovers member's mug, Fourth of May Cosplay Saber"]))).filter(item => have(item)),
        preventEquip: $items(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["carnivorous potted plant"])))
      }).merge((_run$constraints$equi3 = (_run$constraints$equi4 = (_run$constraints6 = run.constraints).equipmentRequirements) === null || _run$constraints$equi4 === void 0 ? void 0 : _run$constraints$equi4.call(_run$constraints6)) !== null && _run$constraints$equi3 !== void 0 ? _run$constraints$equi3 : new Requirement([], {})).maximize();
      adventureMacro($location(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["Noob Cave"]))), Macro.if_($monster(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["crate"]))), macro).if_($monsters(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["giant rubber spider, time-spinner prank"]))), Macro.kill()).ifHolidayWanderer(run.macro).abort());
      visitUrl("desc_effect.php?whicheffect=".concat($effect(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["On the Trail"]))).descid));
    } else if (crateStrategy() === "Saber" && (get("_saberForceMonster") !== $monster(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["crate"]))) || get("_saberForceMonsterCount") === 0) && get("_saberForceUses") < 5) {
      saberCrateIfSafe();
    } else break; // we can break the loop if there's nothing to do

  } while (!["crate", "Using the Force"].includes(get("lastEncounter"))); // loop until we actually hit a crate

}

function initializeDireWarren() {
  visitUrl("museum.php?action=icehouse");
  var banishedMonsters = getBanishedMonsters();
  if (banishedMonsters.get($item(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["ice house"])))) === $monster(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["fluffy bunny"])))) return;
  var options = $items(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["human musk, tryptophan dart, Daily Affirmation: Be a Mind Master"])));

  if (options.some(option => banishedMonsters.get(option) === $monster(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["fluffy bunny"]))))) {
    return;
  }

  if (banishedMonsters.get($skill(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Furious Wallop"])))) === $monster(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["fluffy bunny"])))) return;

  if (!have($item(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["miniature crystal ball"]))))) {
    options.push.apply(options, _toConsumableArray($items(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["Louder Than Bomb, tennis ball"])))));
  }

  var banish = options.sort((a, b) => mallPrice(a) - mallPrice(b))[0];
  acquire(1, banish, 50000, true);

  do {
    adventureMacro($location(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["The Dire Warren"]))), Macro.if_($monster(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["fluffy bunny"]))), Macro.item(banish)).step(embezzlerMacro()));
  } while ("fluffy bunny" !== get("lastEncounter"));
}

function initializeExtrovermectinZones() {
  if (get("beGregariousFightsLeft") === 0) {
    if (hasMonsterReplacers()) initializeCrates();
    initializeDireWarren();
  }
}

/***/ }),

/***/ 9737:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M2": () => (/* binding */ meatFamiliar),
/* harmony export */   "kZ": () => (/* binding */ timeToMeatify)
/* harmony export */ });
/* unused harmony exports calculateMeatFamiliar, freeFightFamiliar, pocketProfessorLectures */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3311);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(678);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2474);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7442);
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(742);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function calculateMeatFamiliar() {
  var bestLeps = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Familiar.all() // The commerce ghost canot go underwater in most circumstances, and cannot use an amulet coin
  // We absolutely do not want that
  .filter(fam => (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)(fam) && fam !== (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Ghost of Crimbo Commerce"])))).sort((a, b) => (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .findLeprechaunMultiplier */ .q$)(b) - (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .findLeprechaunMultiplier */ .q$)(a));
  var bestLepMult = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .findLeprechaunMultiplier */ .q$)(bestLeps[0]);
  _meatFamiliar = bestLeps.filter(familiar => (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .findLeprechaunMultiplier */ .q$)(familiar) === bestLepMult).reduce((a, b) => (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .findFairyMultiplier */ .gK)(a) > (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .findFairyMultiplier */ .gK)(b) ? a : b);
}

var _meatFamiliar;

function meatFamiliar() {
  if (!_meatFamiliar) {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() > (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inebrietyLimit)() && (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Trick-or-Treating Tot"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["li'l pirate costume"]))))) {
      _meatFamiliar = (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Trick-or-Treating Tot"])));
    } else if ((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Robortender"]))))) {
      _meatFamiliar = (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Robortender"])));
    } else {
      calculateMeatFamiliar();
    }
  }

  return _meatFamiliar;
}

function myFamiliarWeight() {
  var familiar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (familiar === null) familiar = myFamiliar();
  return familiarWeight(familiar) + weightAdjustment();
} // 5, 10, 15, 20, 25 +5/turn: 5.29, 4.52, 3.91, 3.42, 3.03


var rotatingFamiliars = {
  "Fist Turkey": {
    expected: [3.91, 4.52, 4.52, 5.29, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Ambitious Turkey"]))),
    pref: "_turkeyBooze"
  },
  "Llama Lama": {
    expected: [3.42, 3.91, 4.52, 5.29, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["llama lama gong"]))),
    pref: "_gongDrops"
  },
  "Astral Badger": {
    expected: [3.03, 3.42, 3.91, 4.52, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["astral mushroom"]))),
    pref: "_astralDrops"
  },
  "Li'l Xenomorph": {
    expected: [3.03, 3.42, 3.91, 4.52, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["transporter transponder"]))),
    pref: "_transponderDrops"
  },
  "Rogue Program": {
    expected: [3.03, 3.42, 3.91, 4.52, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Game Grid token"]))),
    pref: "_tokenDrops"
  },
  "Bloovian Groose": {
    expected: [3.03, 3.42, 3.91, 4.52, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["groose grease"]))),
    pref: "_grooseDrops"
  },
  "Baby Sandworm": {
    expected: [3.03, 3.42, 3.91, 4.52, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["agua de vida"]))),
    pref: "_aguaDrops"
  },
  "Green Pixie": {
    expected: [3.03, 3.42, 3.91, 4.52, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["tiny bottle of absinthe"]))),
    pref: "_absintheDrops"
  },
  "Blavious Kloop": {
    expected: [3.03, 3.42, 3.91, 4.52, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["devilish folio"]))),
    pref: "_kloopDrops"
  },
  "Galloping Grill": {
    expected: [3.03, 3.42, 3.91, 4.52, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["hot ashes"]))),
    pref: "_hotAshesDrops"
  },
  "Grim Brother": {
    expected: [3.03, 3.42, 3.91, 4.52, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["grim fairy tale"]))),
    pref: "_grimFairyTaleDrops"
  },
  "Golden Monkey": {
    expected: [3.03, 3.42, 3.91, 4.52, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["powdered gold"]))),
    pref: "_powderedGoldDrops"
  },
  "Unconscious Collective": {
    expected: [3.03, 3.42, 3.91, 4.52, 5.29],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["Unconscious Collective Dream Jar"]))),
    pref: "_dreamJarDrops"
  },
  "Ms. Puck Man": {
    expected: Array((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["Ms. Puck Man"]))).dropsLimit).fill(12.85),
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["power pill"]))),
    pref: "_powerPillDrops"
  },
  "Puck Man": {
    expected: Array((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["Puck Man"]))).dropsLimit).fill(12.85),
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["power pill"]))),
    pref: "_powerPillDrops"
  },
  "Adventurous Spelunker": {
    expected: [7.0],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["Tales of Spelunking"]))),
    pref: "_spelunkingTalesDrops"
  },
  "Angry Jung Man": {
    expected: [30.0],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["psychoanalytic jar"]))),
    pref: "_jungDrops"
  },
  "Grimstone Golem": {
    expected: [45.0],
    drop: (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["grimstone mask"]))),
    pref: "_grimstoneMaskDrops"
  }
};
var savedMimicDropValue = null;

function mimicDropValue() {
  var _savedMimicDropValue;

  return (_savedMimicDropValue = savedMimicDropValue) !== null && _savedMimicDropValue !== void 0 ? _savedMimicDropValue : savedMimicDropValue = garboAverageValue.apply(void 0, _toConsumableArray($items(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["Polka Pop, BitterSweetTarts, Piddles"]))))) / (6.29 * 0.95 + 1 * 0.05);
}

var gooseExp = (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["Grey Goose"]))).experience || ((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["Shorter-Order Cook"])))) ? 100 : 0);
function freeFightFamiliar() {
  var canMeatify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (canMeatify && timeToMeatify()) return $familiar(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["Grey Goose"])));
  var familiarValue = [];

  if (have($familiar(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["Pocket Professor"])))) && $familiar(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["Pocket Professor"]))).experience < 400 && !get("_thesisDelivered")) {
    // Estimate based on value to charge thesis.
    familiarValue.push([$familiar(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["Pocket Professor"]))), 3000]);
  }

  if (have($familiar(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["Grey Goose"])))) && $familiar(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["Grey Goose"]))).experience < 400 && !get("_meatifyMatterUsed") && myInebriety() <= inebrietyLimit()) {
    var experienceNeeded = 400 - (globalOptions.ascending ? gooseExp : 25);
    var meatFromCast = Math.pow(15, 4);
    var estimatedExperience = 12;
    familiarValue.push([$familiar(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["Grey Goose"]))), meatFromCast / (experienceNeeded / estimatedExperience)]);
  }

  for (var _i = 0, _Object$keys = Object.keys(rotatingFamiliars); _i < _Object$keys.length; _i++) {
    var familiarName = _Object$keys[_i];
    var familiar = Familiar.get(familiarName);

    if (have(familiar)) {
      var _rotatingFamiliars$fa = rotatingFamiliars[familiarName],
          expected = _rotatingFamiliars$fa.expected,
          drop = _rotatingFamiliars$fa.drop,
          pref = _rotatingFamiliars$fa.pref;
      var dropsAlready = get(pref);
      if (dropsAlready >= expected.length) continue;
      var value = garboValue(drop) / expected[dropsAlready];
      familiarValue.push([familiar, value]);
    }
  }

  if (have($familiar(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["Stocking Mimic"]))))) {
    var mimicWeight = myFamiliarWeight($familiar(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["Stocking Mimic"]))));
    var actionPercentage = 1 / 3 + (haveEffect($effect(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["Jingle Jangle Jingle"])))) ? 0.1 : 0);
    var mimicValue = mimicDropValue() + mimicWeight * actionPercentage * 1 / 4 * 10 * 4 * 1.2;
    familiarValue.push([$familiar(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["Stocking Mimic"]))), mimicValue]);
  }

  if (have($familiar(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["Obtuse Angel"]))))) {
    familiarValue.push([$familiar(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["Obtuse Angel"]))), 0.02 * garboValue($item(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["time's arrow"]))))]);
  }

  if (have($familiar(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["Robortender"]))))) familiarValue.push([$familiar(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Robortender"]))), 200]);

  var _iterator = _createForOfIteratorHelper($familiars(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Hobo Monkey, Cat Burglar, Urchin Urchin, Leprechaun"])))),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _familiar = _step.value;
      if (have(_familiar)) familiarValue.push([_familiar, 1]);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  familiarValue.push([$familiar(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["none"]))), 0]);
  return argmax(familiarValue);
}
function pocketProfessorLectures() {
  return 2 + Math.ceil(Math.sqrt(familiarWeight($familiar(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["Pocket Professor"])))) + weightAdjustment()));
}
function timeToMeatify() {
  if (!(0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["Grey Goose"])))) || (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("_meatifyMatterUsed") || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() > (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inebrietyLimit)()) {
    return false;
  } else if ((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["Grey Goose"]))).experience >= 400) return true;else if (!_lib__WEBPACK_IMPORTED_MODULE_1__/* .globalOptions.ascending */ .Xe.ascending || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)() > 50) return false; // Check Wanderers


  var totalTurns = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.totalTurnsPlayed)();
  var baseMeat = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])))) ? 275 : 250;
  var usingLatte = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["latte lovers member's mug"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("latteModifier").split(",").includes("Meat Drop: 40");
  var nextProtonicGhost = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["protonic accelerator pack"])))) ? Math.max(1, (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("nextParanormalActivity") - totalTurns) : Infinity;
  var nextVoteMonster = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["\"I Voted!\" sticker"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("_voteFreeFights") < 3 ? Math.max(0, (totalTurns % 11 - 1) % 11) : Infinity;
  var nextVoidMonster = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$item */ .xr)(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["cursed magnifying glass"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("_voidFreeFights") < 5 && (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("valueOfFreeFight", 2000) / 13 > baseMeat * (usingLatte ? 0.75 : 0.6) ? -(0,libram__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("cursedMagnifyingGlassCount") % 13 : Infinity; // If any of the above are 0, then
  // (1) We should be fighting a free fight
  // (2) We meatify if Grey Goose is sufficiently heavy and we don't have another free wanderer in our remaining turns

  var freeFightNow = (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("questPAGhost") !== "unstarted" || nextVoteMonster === 0 || nextVoidMonster === 0;
  var delay = [nextProtonicGhost, nextVoteMonster === 0 ? (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)("_voteFreeFights") < 2 ? 11 : Infinity : nextVoteMonster, nextVoidMonster === 0 ? 13 : nextVoidMonster].reduce((a, b) => a < b ? a : b);
  if (delay < (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)()) return false; // We can wait for the next free fight
  else if (freeFightNow || (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .$familiar */ .HP)(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["Grey Goose"]))).experience >= 121) return true;
  return false;
}

/***/ }),

/***/ 7442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Xe": () => (/* binding */ globalOptions),
/* harmony export */   "zO": () => (/* binding */ WISH_VALUE),
/* harmony export */   "X2": () => (/* binding */ HIGHLIGHT),
/* harmony export */   "kr": () => (/* binding */ propertyManager),
/* harmony export */   "Vq": () => (/* binding */ baseMeat),
/* harmony export */   "bb": () => (/* binding */ averageEmbezzlerNet),
/* harmony export */   "Y7": () => (/* binding */ setChoice),
/* harmony export */   "Pw": () => (/* binding */ ltbRun),
/* harmony export */   "e6": () => (/* binding */ realmAvailable),
/* harmony export */   "tq": () => (/* binding */ userConfirmDialog)
/* harmony export */ });
/* unused harmony exports embezzlerLog, averageTouristNet, expectedEmbezzlerProfit, safeInterrupt, resetDailyPreference, shuffle, mapMonster, argmax, arrayEquals, questStep, tryFeast, coinmasterPrice, kramcoGuaranteed, logMessage, printLog, printHelpMenu, pillkeeperOpportunityCost, burnLibrams, safeRestoreMpTarget, safeRestore, checkGithubVersion, formatNumber, getChoiceOption, latteActionSourceFinderConstraints, today, garbageTouristRatio, turnsToNC, steveAdventures, dogOrHolidayWanderer, juneCleaverChoiceValues, valueJuneCleaverOption, bestJuneCleaverOption */
/* harmony import */ var canadv_ash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2549);
/* harmony import */ var canadv_ash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(canadv_ash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2474);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2211);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4782);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3311);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(678);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8588);
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(742);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var embezzlerLog = {
  initialEmbezzlersFought: 0,
  digitizedEmbezzlersFought: 0,
  sources: []
};
var globalOptions = {
  stopTurncount: null,
  ascending: false,
  saveTurns: 0,
  noBarf: false,
  askedAboutWish: false,
  triedToUnlockHiddenTavern: false,
  wishAnswer: false,
  simulateDiet: false,
  noDiet: false,
  clarasBellClaimed: (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("_claraBellUsed"),
  yachtzeeChain: false
};
var WISH_VALUE = 50000;
var HIGHLIGHT = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.isDarkMode)() ? "yellow" : "blue";
var propertyManager = new libram__WEBPACK_IMPORTED_MODULE_3__/* .PropertiesManager */ .Jr();
var baseMeat = libram__WEBPACK_IMPORTED_MODULE_4__/* .have */ .lf() && (libram__WEBPACK_IMPORTED_MODULE_4__/* .songChangesLeft */ .ib() > 0 || libram__WEBPACK_IMPORTED_MODULE_4__/* .song */ .K_() === "Total Eclipse of Your Meat" && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myInebriety)() <= (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.inebrietyLimit)()) ? 275 : 250;
function averageEmbezzlerNet() {
  return (baseMeat + 750) * (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.meatDropModifier)() / 100;
}
function averageTouristNet() {
  return baseMeat * meatDropModifier() / 100;
}
function expectedEmbezzlerProfit() {
  return averageEmbezzlerNet() - averageTouristNet();
}
function safeInterrupt() {
  if (get("garbo_interrupt", false)) {
    set("garbo_interrupt", false);
    throw new Error("User interrupt requested. Stopping Garbage Collector.");
  }
}
function resetDailyPreference(trackingPreference) {
  var today = todayToString();

  if (property.getString(trackingPreference) !== today) {
    property.set(trackingPreference, today);
    return true;
  } else {
    return false;
  }
}
function setChoice(adventure, value) {
  propertyManager.setChoices(_defineProperty({}, adventure, value));
}
/**
 * Shuffle a copy of {array}.
 * @param array Array to shuffle.
 */

function shuffle(array) {
  var shuffledArray = _toConsumableArray(array);

  for (var i = shuffledArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  return shuffledArray;
}
function mapMonster(location, monster) {
  if (haveSkill($skill(_templateObject || (_templateObject = _taggedTemplateLiteral(["Map the Monsters"])))) && !get("mappingMonsters") && get("_monstersMapped") < 3) {
    useSkill($skill(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Map the Monsters"]))));
  }

  if (!get("mappingMonsters")) throw "Failed to setup Map the Monsters.";
  var myTurns = myTurncount();
  var mapPage = ""; // Handle zone intros and holiday wanderers

  for (var tries = 0; tries < 10; tries++) {
    mapPage = visitUrl(toUrl(location), false, true);
    if (mapPage.includes("Leading Yourself Right to Them")) break; // Time-pranks can show up here, annoyingly

    if (mapPage.includes("<!-- MONSTERID: 1965 -->") || mapPage.includes("<!-- MONSTERID: 1622  -->")) {
      runCombat(Macro.attack().repeat().toString());
    }

    if (handlingChoice()) runChoice(-1);
    if (myTurncount() > myTurns + 1) throw "Map the monsters unsuccessful?";
    if (tries === 9) throw "Stuck trying to Map the monsters.";
  }

  var fightPage = visitUrl("choice.php?pwd&whichchoice=1435&option=1&heyscriptswhatsupwinkwink=".concat(monster.id));
  if (!fightPage.includes(monster.name)) throw "Something went wrong starting the fight.";
}
function argmax(values) {
  return values.reduce((_ref, _ref2) => {
    var _ref3 = _slicedToArray(_ref, 2),
        minValue = _ref3[0],
        minScore = _ref3[1];

    var _ref4 = _slicedToArray(_ref2, 2),
        value = _ref4[0],
        score = _ref4[1];

    return score > minScore ? [value, score] : [minValue, minScore];
  })[0];
}
/**
 * Returns true if the arguments have all elements equal.
 * @param array1 First array.
 * @param array2 Second array.
 */

function arrayEquals(array1, array2) {
  return array1.length === array2.length && array1.every((element, index) => element === array2[index]);
}
function questStep(questName) {
  var stringStep = property.getString(questName);
  if (stringStep === "unstarted" || stringStep === "") return -1;else if (stringStep === "started") return 0;else if (stringStep === "finished") return 999;else {
    if (stringStep.substring(0, 4) !== "step") {
      throw "Quest state parsing error.";
    }

    return parseInt(stringStep.substring(4), 10);
  }
}
function tryFeast(familiar) {
  if (have(familiar)) {
    useFamiliar(familiar);
    use($item(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["moveable feast"]))));
  }
}
var ltbRun = () => {
  return (0,libram__WEBPACK_IMPORTED_MODULE_8__/* .ensureFreeRun */ .K)({
    requireUnlimited: () => true,
    noFamiliar: () => true,
    noRequirements: () => true,
    maximumCost: () => {
      var _get;

      return (_get = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("autoBuyPriceLimit")) !== null && _get !== void 0 ? _get : 20000;
    }
  });
};
function coinmasterPrice(item) {
  // TODO: Get this from coinmasters.txt if more are needed
  switch (item) {
    case $item(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["viral video"]))):
      return 20;

    case $item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["plus one"]))):
      return 74;

    case $item(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["gallon of milk"]))):
      return 100;

    case $item(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["print screen button"]))):
      return 111;

    case $item(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["daily dungeon malware"]))):
      return 150;
  }

  return 0;
}
function kramcoGuaranteed() {
  return have($item(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"])))) && getKramcoWandererChance() >= 1;
}
var log = (/* unused pure expression or super */ null && ([]));
function logMessage(message) {
  log.push(message);
}
function printLog(color) {
  var _iterator = _createForOfIteratorHelper(log),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var message = _step.value;
      print(message, color);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
/**
 * Prints Garbo's help menu to the GCLI.
 */

function printHelpMenu() {
  var helpData = JSON.parse(fileToBuffer("garbo_help.json"));
  var tableMaxCharWidth = 82;
  var tableRows = helpData.map(_ref5 => {
    var tableItem = _ref5.tableItem,
        description = _ref5.description;
    var croppedDescription = description.length > tableMaxCharWidth ? description.replace(/(.{82}\s)/g, "$&\n") : description;
    return "<tr><td width=200><pre> ".concat(tableItem, "</pre></td><td width=600><pre>").concat(croppedDescription, "</pre></td></tr>");
  });
  printHtml("<table border=2 width=800 style=\"font-family:monospace;\">".concat(tableRows.join(""), "</table>"));
}
/**
 * Determines the opportunity cost of not using the Pillkeeper to fight an embezzler
 * @returns The expected value of using a pillkeeper charge to fight an embezzler
 */

function pillkeeperOpportunityCost() {
  var canTreasury = canAdv($location(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Cobb's Knob Treasury"]))), false);
  var alternateUse = [{
    can: canTreasury,
    value: 3 * get("valueOfAdventure")
  }, {
    can: realmAvailable("sleaze"),
    value: 40000
  }].filter(x => x.can).sort((a, b) => b.value - a.value)[0];
  var alternateUseValue = alternateUse === null || alternateUse === void 0 ? void 0 : alternateUse.value;
  if (!alternateUseValue) return 0;
  if (!canTreasury) return alternateUseValue;
  var embezzler = $monster(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Knob Goblin Embezzler"])));
  var canStartChain = [CombatLoversLocket.have() && getLocketMonsters()[embezzler.name], ChateauMantegna.have() && ChateauMantegna.paintingMonster() === embezzler && !ChateauMantegna.paintingFought(), have($item(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Clan VIP Lounge key"])))) && !get("_photocopyUsed")].some(x => x);
  return canStartChain ? alternateUseValue : WISH_VALUE;
}
/**
 * Burns existing MP on the mall-optimal libram skill until unable to cast any more.
 */

function burnLibrams() {
  var mpTarget = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var libramToCast = bestLibramToCast();

  while (libramToCast && mpCost(libramToCast) <= myMp() - mpTarget) {
    useSkill(libramToCast);
    libramToCast = bestLibramToCast();
  }

  if (mpTarget > 0) {
    cliExecute("burn -".concat(mpTarget));
  } else {
    cliExecute("burn *");
  }
}
function safeRestoreMpTarget() {
  return Math.min(myMaxmp(), 200);
}
function safeRestore() {
  if (have($effect(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Beaten Up"]))))) {
    if (get("lastEncounter") === "Sssshhsssblllrrggghsssssggggrrgglsssshhssslblgl") {
      uneffect($effect(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Beaten Up"]))));
    } else {
      throw new Error("Hey, you're beaten up, and that's a bad thing. Lick your wounds, handle your problems, and run me again when you feel ready.");
    }
  }

  if (myHp() < myMaxhp() * 0.5) {
    restoreHp(myMaxhp() * 0.9);
  }

  var mpTarget = safeRestoreMpTarget();

  if (myMp() < mpTarget) {
    if (have($item(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"])))) && (have($item(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["magical sausage"])))) || have($item(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["magical sausage casing"]))))) && get("_sausagesEaten") < 23) {
      eat($item(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["magical sausage"]))));
    } else restoreMp(mpTarget);
  }

  burnLibrams(mpTarget * 2); // Leave a mp buffer when burning
}
function checkGithubVersion() {
  if (false) {} else {
    var gitBranches = JSON.parse(visitUrl("https://api.github.com/repos/".concat("Loathing-Associates-Scripting-Society/garbage-collector", "/branches")));
    var mainBranch = gitBranches.find(branchInfo => branchInfo.name === "main");
    var mainSha = mainBranch && mainBranch.commit ? mainBranch.commit.sha : "CustomBuild";

    if ("6ca57dbf401b6f33eb463bafee61893857e2d4cf" === mainSha) {
      print("Garbo is up to date!", HIGHLIGHT);
    } else {
      print("Garbo is out of date. Please run 'svn update!", "red");
      print("".concat("Loathing-Associates-Scripting-Society/garbage-collector", "/main is at ").concat(mainSha));
    }
  }
}
function realmAvailable(identifier) {
  if (identifier === "fantasy") {
    return (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("_frToday") || (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("frAlways");
  } else if (identifier === "pirate") {
    return (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("_prToday") || (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("prAlways");
  }

  return (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("_".concat(identifier, "AirportToday"), false) || (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("".concat(identifier, "AirportAlways"), false);
}
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function getChoiceOption(partialText) {
  if (handlingChoice()) {
    var findResults = Object.entries(availableChoiceOptions()).find(value => value[1].indexOf(partialText) > -1);

    if (findResults) {
      return parseInt(findResults[0]);
    }
  }

  return -1;
}
/**
 * Confirmation dialog that supports automatic resolution via garbo_autoUserConfirm preference
 * @param msg string to display in confirmation dialog
 * @param defaultValue default answer if user doesn't provide one
 * @param timeOut time to show dialog before submitting default value
 * @returns answer to confirmation dialog
 */

function userConfirmDialog(msg, defaultValue, timeOut) {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("garbo_autoUserConfirm", false)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Automatically selected ".concat(defaultValue, " for ").concat(msg), "red");
    return defaultValue;
  }

  if (timeOut) return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.userConfirm)(msg, timeOut, defaultValue);
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.userConfirm)(msg);
}
var latteActionSourceFinderConstraints = {
  allowedAction: action => {
    var _action$constraints$e, _action$constraints, _action$constraints$e2;

    if (!(0,libram__WEBPACK_IMPORTED_MODULE_7__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$item */ .xr)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["latte lovers member's mug"]))))) return true;
    var forceEquipsOtherThanLatte = ((_action$constraints$e = action === null || action === void 0 ? void 0 : (_action$constraints = action.constraints) === null || _action$constraints === void 0 ? void 0 : (_action$constraints$e2 = _action$constraints.equipmentRequirements) === null || _action$constraints$e2 === void 0 ? void 0 : _action$constraints$e2.call(_action$constraints).maximizeOptions.forceEquip) !== null && _action$constraints$e !== void 0 ? _action$constraints$e : []).filter(equipment => equipment !== (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$item */ .xr)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["latte lovers member's mug"]))));
    return forceEquipsOtherThanLatte.every(equipment => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toSlot)(equipment) !== (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$slot */ .Jh)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["off-hand"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_12__/* .sum */ .Sm)(forceEquipsOtherThanLatte, kolmafia__WEBPACK_IMPORTED_MODULE_1__.weaponHands) < 2;
  }
};
var today = Date.now() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.gametimeToInt)() - 1000 * 60 * 3.5; // Barf setup info

var olfactionCopies = (0,libram__WEBPACK_IMPORTED_MODULE_7__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$skill */ .tm)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["Transcendent Olfaction"])))) ? 3 : 0;
var gallapagosCopies = (0,libram__WEBPACK_IMPORTED_MODULE_7__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$skill */ .tm)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Gallapagosian Mating Call"])))) ? 1 : 0;
var garbageTourists = 1 + olfactionCopies + gallapagosCopies,
    touristFamilies = 1,
    angryTourists = 1;
var barfTourists = garbageTourists + touristFamilies + angryTourists;
var garbageTouristRatio = garbageTourists / barfTourists;
var touristFamilyRatio = touristFamilies / barfTourists; // 30 tourists till NC, with families counting as 3
// Estimate number of turns till the counter hits 27
// then estimate the expected number of turns required to hit a counter of >= 30

var turnsToNC = 27 * barfTourists / (garbageTourists + angryTourists + 3 * touristFamilies) + 1 * touristFamilyRatio + 2 * (1 - touristFamilyRatio) * touristFamilyRatio + 3 * (1 - touristFamilyRatio) * (1 - touristFamilyRatio);
var steveAdventures = new Map([[(0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$location */ .PG)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["The Haunted Bedroom"]))), [1, 3, 1]], [(0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$location */ .PG)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["The Haunted Nursery"]))), [1, 2, 2, 1, 1]], [(0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$location */ .PG)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["The Haunted Conservatory"]))), [1, 2, 2]], [(0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$location */ .PG)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["The Haunted Billiards Room"]))), [1, 2, 2]], [(0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$location */ .PG)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["The Haunted Wine Cellar"]))), [1, 2, 2, 3]], [(0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$location */ .PG)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["The Haunted Boiler Room"]))), [1, 2, 2]], [(0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$location */ .PG)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["The Haunted Laboratory"]))), [1, 1, 3, 1, 1]]]);
function dogOrHolidayWanderer() {
  var extraEncounters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return [].concat(_toConsumableArray(extraEncounters), ["Wooof! Wooooooof!", "Playing Fetch*", "Your Dog Found Something Again"], _toConsumableArray(getTodaysHolidayWanderers().map(monster => monster.name))).includes(get("lastEncounter"));
}
var juneCleaverChoiceValues = {
  1467: {
    1: 0,
    2: 0,
    3: 5 * (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("valueOfAdventure")
  },
  1468: {
    1: 0,
    2: 5,
    3: 0
  },
  1469: {
    1: 0,
    2: (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$item */ .xr)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["Dad's brandy"]))),
    3: 1500
  },
  1470: {
    1: 0,
    2: (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$item */ .xr)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["teacher's pen"]))),
    3: 0
  },
  1471: {
    1: (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$item */ .xr)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["savings bond"]))),
    2: 250,
    3: 0
  },
  1472: {
    1: (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$item */ .xr)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["trampled ticket stub"]))),
    2: (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$item */ .xr)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["fire-roasted lake trout"]))),
    3: 0
  },
  1473: {
    1: (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$item */ .xr)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["gob of wet hair"]))),
    2: 0,
    3: 0
  },
  1474: {
    1: 0,
    2: (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$item */ .xr)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["guilty sprout"]))),
    3: 0
  },
  1475: {
    1: (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$item */ .xr)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["mother's necklace"]))),
    2: 0,
    3: 0
  }
};
function valueJuneCleaverOption(result) {
  return result instanceof Item ? garboValue(result) : result;
}
function bestJuneCleaverOption(id) {
  var options = [1, 2, 3];
  return options.map(option => ({
    option: option,
    value: valueJuneCleaverOption(juneCleaverChoiceValues[id][option])
  })).sort((a, b) => b.value - a.value)[0].option;
}

/***/ }),

/***/ 614:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports meatMood, freeFightMood, shrugBadEffects */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6115);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(678);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7442);
/* harmony import */ var _clan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5897);
/* harmony import */ var _outfit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1730);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






libram__WEBPACK_IMPORTED_MODULE_4__/* .Mood.setDefaultOptions */ .EA.setDefaultOptions({
  songSlots: [(0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$effects */ .lh)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Polka of Plenty"]))), (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$effects */ .lh)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Fat Leon's Phat Loot Lyric, Ur-Kel's Aria of Annoyance"]))), (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$effects */ .lh)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Chorale of Companionship"]))), (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$effects */ .lh)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["The Ballad of Richie Thingfinder"])))],
  useNativeRestores: true
});
function meatMood() {
  var urKels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var meat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : baseMeat;
  // Reserve the amount of MP we try to restore before each fight.
  var mood = new Mood({
    reserveMp: safeRestoreMpTarget()
  });
  mood.potion($item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["How to Avoid Scams"]))), 3 * baseMeat);
  mood.potion($item(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["resolution: be wealthier"]))), 0.3 * baseMeat);
  mood.potion($item(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["resolution: be happier"]))), 0.15 * 0.45 * 0.8 * 200);
  var flaskValue = usingPurse() ? 0.3 * baseMeat : 5;
  mood.potion($item(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Flaskfull of Hollow"]))), flaskValue);
  mood.skill($skill(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Blood Bond"]))));
  mood.skill($skill(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Leash of Linguini"]))));
  mood.skill($skill(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Empathy of the Newt"]))));
  mood.skill($skill(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["The Polka of Plenty"]))));
  mood.skill($skill(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Disco Leer"]))));
  mood.skill(urKels ? $skill(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Ur-Kel's Aria of Annoyance"]))) : $skill(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Fat Leon's Phat Loot Lyric"]))));
  mood.skill($skill(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Singer's Faithful Ocelot"]))));
  mood.skill($skill(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["The Spirit of Taking"]))));
  mood.skill($skill(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["Drescher's Annoying Noise"]))));
  mood.skill($skill(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["Pride of the Puffin"]))));
  var mmjCost = (100 - (have($skill(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["Five Finger Discount"])))) ? 5 : 0) - (have($item(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["Travoltan trousers"])))) ? 5 : 0)) * (200 / (1.5 * myLevel() + 5));
  var genericManaPotionCost = mallPrice($item(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["generic mana potion"])))) * (200 / (2.5 * myLevel()));
  var mpRestorerCost = Math.min(mmjCost, genericManaPotionCost);

  if (myClass() !== $class(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Pastamancer"]))) && 0.1 * meat * 10 > mpRestorerCost) {
    mood.skill($skill(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["Bind Lasagmbie"]))));
  }

  if (getWorkshed() === $item(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["Asdon Martin keyfob"])))) mood.drive(AsdonMartin.Driving.Observantly);

  if (have($item(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"]))))) {
    mood.effect($effect(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["A View to Some Meat"]))), () => {
      if (get("_kgbClicksUsed") < 22) {
        var buffTries = Math.ceil((22 - get("_kgbClicksUsed")) / 3);
        cliExecute("Briefcase buff ".concat(new Array(buffTries).fill("meat").join(" ")));
      }
    });
  }

  if (!get("concertVisited") && get("sidequestArenaCompleted") === "fratboy") {
    cliExecute("concert winklered");
  } else if (!get("concertVisited") && get("sidequestArenaCompleted") === "hippy") {
    cliExecute("concert optimist primal");
  }

  if (itemAmount($item(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["Bird-a-Day calendar"])))) > 0) {
    if (!have($skill(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["Seek out a Bird"])))) || !get("_canSeekBirds")) {
      use(1, $item(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["Bird-a-Day calendar"]))));
    }

    if (have($skill(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["Visit your Favorite Bird"])))) && !get("_favoriteBirdVisited") && (numericModifier($effect(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["Blessing of your favorite Bird"]))), "Meat Drop") > 0 || numericModifier($effect(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["Blessing of your favorite Bird"]))), "Item Drop") > 0)) {
      useSkill($skill(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["Visit your Favorite Bird"]))));
    }

    if (have($skill(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["Seek out a Bird"])))) && get("_birdsSoughtToday") < 6 && (numericModifier($effect(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["Blessing of the Bird"]))), "Meat Drop") > 0 || numericModifier($effect(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["Blessing of the Bird"]))), "Item Drop") > 0)) {
      // Ensure we don't get stuck in the choice if the count is wrong
      setChoice(1399, 2);
      useSkill($skill(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["Seek out a Bird"]))), 6 - get("_birdsSoughtToday"));
    }
  }

  if (have($skill(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["Incredible Self-Esteem"])))) && $effects(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["Always be Collecting, Work For Hours a Week"]))).some(effect => have(effect)) && !get("_incredibleSelfEsteemCast")) {
    useSkill($skill(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["Incredible Self-Esteem"]))));
  }

  var canRecord = getWorkshed() === $item(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["warbear LP-ROM burner"]))) || have($item(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["warbear LP-ROM burner"]))) || get("questG04Nemesis") === "finished");

  if (myClass() === $class(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["Accordion Thief"]))) && myLevel() >= 15 && !canRecord) {
    if (have($skill(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["The Ballad of Richie Thingfinder"]))))) {
      useSkill($skill(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["The Ballad of Richie Thingfinder"]))), 10 - get("_thingfinderCasts"));
    }

    if (have($skill(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Chorale of Companionship"]))))) {
      useSkill($skill(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["Chorale of Companionship"]))), 10 - get("_companionshipCasts"));
    }
  }

  shrugBadEffects();
  return mood;
}
function freeFightMood() {
  var mood = new Mood();

  for (var _len = arguments.length, additionalEffects = new Array(_len), _key = 0; _key < _len; _key++) {
    additionalEffects[_key] = arguments[_key];
  }

  for (var _i = 0, _additionalEffects = additionalEffects; _i < _additionalEffects.length; _i++) {
    var effect = _additionalEffects[_i];
    mood.effect(effect);
  }

  if (!get("_garbo_defectiveTokenAttempted", false)) {
    set("_garbo_defectiveTokenAttempted", true);
    withStash($items(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["defective Game Grid token"]))), () => {
      if (!get("_defectiveTokenUsed") && have($item(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["defective Game Grid token"]))))) {
        use($item(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["defective Game Grid token"]))));
      }
    });
  }

  if (!get("_glennGoldenDiceUsed")) {
    if (have($item(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["Glenn's golden dice"]))))) use($item(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["Glenn's golden dice"]))));
  }

  if (getClanLounge()["Clan pool table"] !== undefined) {
    while (get("_poolGames") < 3) {
      cliExecute("pool aggressive");
    }
  }

  if (haveEffect($effect(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["Blue Swayed"])))) < 50) {
    use(Math.ceil((50 - haveEffect($effect(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["Blue Swayed"]))))) / 10), $item(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["pulled blue taffy"]))));
  }

  mood.potion($item(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["white candy heart"]))), 30);
  mood.skill($skill(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral(["Curiosity of Br'er Tarrypin"]))));

  if ((get("daycareOpen") || get("_daycareToday")) && !get("_daycareSpa")) {
    cliExecute("daycare mysticality");
  }

  if (have($item(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["redwood rain stick"])))) && !get("_redwoodRainStickUsed")) {
    use($item(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(["redwood rain stick"]))));
  }

  var beachHeadsUsed = get("_beachHeadsUsed");

  if (have($item(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["Beach Comb"])))) && !beachHeadsUsed.toString().split(",").includes("10")) {
    mood.effect($effect(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["Do I Know You From Somewhere?"]))));
  }

  if (Witchess.have() && !get("_witchessBuff")) {
    mood.effect($effect(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["Puzzle Champ"]))));
  }

  if (questStep("questL06Friar") === 999 && !get("friarsBlessingReceived")) {
    cliExecute("friars familiar");
  }

  if (have($item(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["The Legendary Beat"])))) && !get("_legendaryBeat")) {
    use($item(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["The Legendary Beat"]))));
  }

  shrugBadEffects.apply(void 0, additionalEffects);
  if (getWorkshed() === $item(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["Asdon Martin keyfob"])))) mood.drive(AsdonMartin.Driving.Observantly);
  return mood;
}
var stings = [].concat(_toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$effects */ .lh)(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["Apoplectic with Rage, Barfpits, Berry Thorny, Biologically Shocked, Bone Homie, Boner Battalion, Coal-Powered, Curse of the Black Pearl Onion, Dizzy with Rage, Drenched With Filth, EVISCERATE!, Fangs and Pangs, Frigidalmatian, Gummi Badass, Haiku State of Mind, It's Electric!, Jaba\xF1ero Saucesphere, Jalape\xF1o Saucesphere, Little Mouse Skull Buddy, Long Live GORF, Mayeaugh, Permanent Halloween, Psalm of Pointiness, Pygmy Drinking Buddy, Quivering with Rage, Scarysauce, Skeletal Cleric, Skeletal Rogue, Skeletal Warrior, Skeletal Wizard, Smokin', Soul Funk, Spiky Frozen Hair, Stinkybeard, Stuck-Up Hair, Can Has Cyborger, Feeling Nervous"])))), [(0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$effect */ ._G)(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral(["Burning, Man"]))), (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$effect */ ._G)(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["Yes, Can Haz"])))]);
var textAlteringEffects = (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$effects */ .lh)(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral(["Can Has Cyborger, Dis Abled, Haiku State of Mind, Just the Best Anapests, O Hai!, Robocamo"])));
var teleportEffects = (0,libram__WEBPACK_IMPORTED_MODULE_5__/* .$effects */ .lh)(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral(["Teleportitis, Feeling Lost, Funday!"])));
function shrugBadEffects() {
  for (var _len2 = arguments.length, exclude = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    exclude[_key2] = arguments[_key2];
  }

  [].concat(_toConsumableArray(stings), _toConsumableArray(textAlteringEffects), _toConsumableArray(teleportEffects)).forEach(effect => {
    if (have(effect) && !exclude.includes(effect)) {
      uneffect(effect);
    }
  });
}

/***/ }),

/***/ 1730:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RG": () => (/* binding */ waterBreathingEquipment),
/* harmony export */   "PR": () => (/* binding */ usingPurse)
/* harmony export */ });
/* unused harmony exports freeFightOutfit, refreshLatte, tryFillLatte, meatOutfit, familiarWaterBreathingEquipment, useUPCs */
/* harmony import */ var canadv_ash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2549);
/* harmony import */ var canadv_ash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(canadv_ash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(678);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3311);
/* harmony import */ var _dropsgear__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5472);
/* harmony import */ var _embezzler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4936);
/* harmony import */ var _familiar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9737);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7442);
/* harmony import */ var _wanderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5444);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









function freeFightOutfit(requirement) {
  var _requirement$maximize, _requirement$maximize2, _requirement$maximize3, _requirement$maximize4, _requirement$maximize5;

  var equipMode = myFamiliar() === $familiar(_templateObject || (_templateObject = _taggedTemplateLiteral(["Machine Elf"]))) ? "dmt" : "free";
  var bjornChoice = pickBjorn(equipMode);
  var parameters = [].concat(_toConsumableArray((_requirement$maximize = requirement === null || requirement === void 0 ? void 0 : requirement.maximizeParameters) !== null && _requirement$maximize !== void 0 ? _requirement$maximize : []), ["-tie"]);
  var forceEquip = (_requirement$maximize2 = requirement === null || requirement === void 0 ? void 0 : requirement.maximizeOptions.forceEquip) !== null && _requirement$maximize2 !== void 0 ? _requirement$maximize2 : [];
  var bonusEquip = (_requirement$maximize3 = requirement === null || requirement === void 0 ? void 0 : requirement.maximizeOptions.bonusEquip) !== null && _requirement$maximize3 !== void 0 ? _requirement$maximize3 : new Map();
  var preventEquip = (_requirement$maximize4 = requirement === null || requirement === void 0 ? void 0 : requirement.maximizeOptions.preventEquip) !== null && _requirement$maximize4 !== void 0 ? _requirement$maximize4 : [];
  var preventSlot = (_requirement$maximize5 = requirement === null || requirement === void 0 ? void 0 : requirement.maximizeOptions.preventSlot) !== null && _requirement$maximize5 !== void 0 ? _requirement$maximize5 : [];
  parameters.push($familiars(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Pocket Professor, Grey Goose"]))).includes(myFamiliar()) ? "Familiar Experience" : "Familiar Weight");
  [];

  if (have($item(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["vampyric cloake"])))) && get("_vampyreCloakeFormUses") < 10 && forceEquip.every(equip => toSlot(equip) !== $slot(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["back"]))))) {
    forceEquip.push($item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["vampyric cloake"]))));
  }

  var bjornAlike = bestBjornalike(forceEquip);
  preventEquip.push(bjornAlike === $item(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Buddy Bjorn"]))) ? $item(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Crown of Thrones"]))) : $item(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Buddy Bjorn"]))));
  var finalRequirement = new Requirement(parameters, {
    forceEquip: forceEquip,
    preventEquip: [].concat(_toConsumableArray(preventEquip), [bjornAlike === $item(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Buddy Bjorn"]))) ? $item(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Crown of Thrones"]))) : $item(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Buddy Bjorn"])))]).filter(item => !forceEquip.includes(item)),
    bonusEquip: new Map([].concat(_toConsumableArray(bonusEquip), _toConsumableArray(bonusGear(equipMode)), _toConsumableArray(bjornAlike ? new Map([[bjornAlike, !bjornChoice.dropPredicate || bjornChoice.dropPredicate() ? bjornChoice.meatVal() * bjornChoice.probability : 0]]) : []))),
    preventSlot: preventSlot
  });
  finalRequirement.maximize();
  if (haveEquipped($item(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Buddy Bjorn"]))))) bjornifyFamiliar(bjornChoice.familiar);
  if (haveEquipped($item(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Crown of Thrones"]))))) enthroneFamiliar(bjornChoice.familiar);
  if (haveEquipped($item(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Snow Suit"])))) && get("snowsuit") !== "nose") cliExecute("snowsuit nose");

  var missingEquips = () => {
    var _finalRequirement$max;

    return ((_finalRequirement$max = finalRequirement.maximizeOptions.forceEquip) !== null && _finalRequirement$max !== void 0 ? _finalRequirement$max : []).filter(equipment => !haveEquipped(equipment));
  };

  if (missingEquips().length > 0) {
    cliExecute("refresh all");
    new Requirement([], {
      forceUpdate: true
    }).merge(finalRequirement).maximize();
  }

  if (missingEquips().length > 0) {
    throw new Error("Maximizer failed to equip the following equipment: ".concat(missingEquips().map(equipment => equipment.name).join(", "), ".?"));
  }
}
function refreshLatte() {
  // Refresh unlocked latte ingredients
  if (have($item(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["latte lovers member's mug"]))))) {
    visitUrl("main.php?latte=1", false);
  }

  return have($item(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["latte lovers member's mug"]))));
}
function tryFillLatte() {
  if (have($item(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["latte lovers member's mug"])))) && get("_latteRefillsUsed") < 3 && (get("_latteCopyUsed") || get("latteUnlocks").includes("cajun") && get("latteUnlocks").includes("rawhide") && (numericModifier($item(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["latte lovers member's mug"]))), "Familiar Weight") !== 5 || numericModifier($item(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["latte lovers member's mug"]))), "Meat Drop") !== 40 || get("latteUnlocks").includes("carrot") && numericModifier($item(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["latte lovers member's mug"]))), "Item Drop") !== 20))) {
    var goodLatteIngredients = ["cajun", "rawhide", "carrot"];
    var latteIngredients = goodLatteIngredients.filter(ingredient => get("latteUnlocks").includes(ingredient));
    if (latteIngredients.length < 3) latteIngredients.push("pumpkin");
    if (latteIngredients.length < 3) latteIngredients.push("vanilla");
    if (latteIngredients.length < 3) latteIngredients.push("cinnamon");
    cliExecute("latte refill ".concat(latteIngredients.join(" ")));
  }

  return numericModifier($item(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["latte lovers member's mug"]))), "Familiar Weight") === 5 && numericModifier($item(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["latte lovers member's mug"]))), "Meat Drop") === 40;
}
function meatOutfit(embezzlerUp, requirement, sea) {
  var _requirement$maximize6, _requirement$maximize7, _requirement$maximize8, _requirement$maximize9;

  var equipMode = embezzlerUp ? "embezzler" : "barf";
  var bjornChoice = pickBjorn(equipMode);
  var parameters = [].concat(_toConsumableArray((_requirement$maximize6 = requirement === null || requirement === void 0 ? void 0 : requirement.maximizeParameters) !== null && _requirement$maximize6 !== void 0 ? _requirement$maximize6 : []), ["-tie"]);
  var forceEquip = (_requirement$maximize7 = requirement === null || requirement === void 0 ? void 0 : requirement.maximizeOptions.forceEquip) !== null && _requirement$maximize7 !== void 0 ? _requirement$maximize7 : [];
  var preventEquip = (_requirement$maximize8 = requirement === null || requirement === void 0 ? void 0 : requirement.maximizeOptions.preventEquip) !== null && _requirement$maximize8 !== void 0 ? _requirement$maximize8 : [];
  var preventSlot = (_requirement$maximize9 = requirement === null || requirement === void 0 ? void 0 : requirement.maximizeOptions.preventSlot) !== null && _requirement$maximize9 !== void 0 ? _requirement$maximize9 : [];

  if (myInebriety() > inebrietyLimit()) {
    forceEquip.push($item(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Drunkula's wineglass"]))));
  } else if (!embezzlerUp) {
    if (have($item(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["protonic accelerator pack"])))) && get("questPAGhost") === "unstarted" && get("nextParanormalActivity") <= totalTurnsPlayed()) {
      forceEquip.push($item(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["protonic accelerator pack"]))));
    }

    if (have($item(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["mafia pointer finger ring"]))))) {
      if (myClass() === $class(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["Seal Clubber"]))) && have($skill(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["Furious Wallop"]))))) {
        forceEquip.push($item(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["mafia pointer finger ring"]))));
      } else if (have($item(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["Operation Patriot Shield"])))) && myClass() === $class(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["Turtle Tamer"])))) {
        forceEquip.push.apply(forceEquip, _toConsumableArray($items(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["Operation Patriot Shield, mafia pointer finger ring"])))));
      } else if (have($item(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["haiku katana"]))))) {
        forceEquip.push.apply(forceEquip, _toConsumableArray($items(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["haiku katana, mafia pointer finger ring"])))));
      } else if (have($item(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))) && forceEquip.every(equipment => toSlot(equipment) !== $slot(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["back"]))))) {
        var gun = have($item(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["love"])))) && meatFamiliar() === $familiar(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["Robortender"]))) ? $item(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["love"]))) : $item(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["ice nine"])));

        if (gun === $item(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["ice nine"]))) && !have($item(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["ice nine"]))))) {
          cliExecute("refresh inventory");
          retrieveItem($item(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["ice nine"]))));
        }

        forceEquip.push.apply(forceEquip, [gun].concat(_toConsumableArray($items(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["unwrapped knock-off retro superhero cape, mafia pointer finger ring"]))))));
      } else if (have($item(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Operation Patriot Shield"]))))) {
        forceEquip.push.apply(forceEquip, _toConsumableArray($items(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["Operation Patriot Shield, mafia pointer finger ring"])))));
      }
    }

    if (getKramcoWandererChance() > 0.05 && have($item(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"])))) && forceEquip.every(equipment => toSlot(equipment) !== $slot(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["off-hand"]))))) {
      forceEquip.push($item(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))));
    }
  }

  var stickerSlots = $slots(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["sticker1, sticker2, sticker3"])));
  var UPC = $item(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["scratch 'n' sniff UPC sticker"])));

  if (embezzlerUp) {
    var currentWeapon = 25 * findLeprechaunMultiplier(meatFamiliar());
    var embezzlers = globalOptions.ascending ? Math.min(20, embezzlerCount() || digitizedMonstersRemaining()) : 20;
    var addedValueOfFullSword = embezzlers * ((75 - currentWeapon) * (750 + baseMeat)) / 100;

    if (addedValueOfFullSword > 3 * mallPrice(UPC)) {
      var needed = 3 - stickerSlots.filter(sticker => equippedItem(sticker) === UPC).length;
      if (needed) buy(needed, UPC, addedValueOfFullSword / 3);
      useUPCs();
    }
  }

  if (stickerSlots.map(s => equippedItem(s)).includes($item(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["none"]))))) {
    preventEquip.push.apply(preventEquip, _toConsumableArray($items(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["scratch 'n' sniff sword, scratch 'n' sniff crossbow"])))));
  }

  if (myFamiliar() === $familiar(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["Obtuse Angel"])))) {
    forceEquip.push($item(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["quake of arrows"]))));
    if (!have($item(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["quake of arrows"]))))) retrieveItem($item(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["quake of arrows"]))));
  }

  if (sea) {
    if (!myFamiliar().underwater) {
      var familiarEquip = familiarWaterBreathingEquipment.find(item => have(item));
      if (familiarEquip) forceEquip.push(familiarEquip);
    }

    var airEquip = waterBreathingEquipment.find(item => have(item) && canEquip(item));
    if (airEquip) forceEquip.push(airEquip);else parameters.push("sea");
  }

  if (embezzlerUp && myFamiliar() !== $familiar(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral(["Pocket Professor"]))) && CombatLoversLocket.have() && !CombatLoversLocket.unlockedLocketMonsters().includes($monster(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["Knob Goblin Embezzler"]))))) {
    forceEquip.push(CombatLoversLocket.locket);
  }

  var bjornAlike = bestBjornalike(forceEquip);
  var compiledRequirements = (requirement !== null && requirement !== void 0 ? requirement : new Requirement([], {})).merge(new Requirement(["".concat(((embezzlerUp ? baseMeat + 750 : baseMeat) / 100).toFixed(2), " Meat Drop"), "".concat(embezzlerUp ? 0 : 0.72, " Item Drop")].concat(_toConsumableArray(parameters)), {
    forceEquip: forceEquip,
    preventEquip: [].concat(_toConsumableArray(preventEquip), _toConsumableArray(embezzlerUp ? $items(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(["cheap sunglasses"]))) : []), [bjornAlike === $item(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["Buddy Bjorn"]))) ? $item(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["Crown of Thrones"]))) : $item(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["Buddy Bjorn"])))]).filter(item => !forceEquip.includes(item)),
    bonusEquip: new Map([].concat(_toConsumableArray(bonusGear(equipMode)), _toConsumableArray(bjornAlike ? new Map([[bjornAlike, (!bjornChoice.dropPredicate || bjornChoice.dropPredicate() ? bjornChoice.meatVal() * bjornChoice.probability : 0) + valueBjornModifiers(equipMode, bjornChoice.modifier)]]) : []))),
    preventSlot: preventSlot
  }));
  compiledRequirements.maximize();
  if (haveEquipped($item(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["Buddy Bjorn"]))))) bjornifyFamiliar(bjornChoice.familiar);
  if (haveEquipped($item(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["Crown of Thrones"]))))) enthroneFamiliar(bjornChoice.familiar);
  if (haveEquipped($item(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["Snow Suit"])))) && get("snowsuit") !== "nose") cliExecute("snowsuit nose");

  if (haveEquipped($item(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))) && (get("retroCapeSuperhero") !== "robot" || get("retroCapeWashingInstructions") !== "kill")) {
    cliExecute("retrocape robot kill");
  }

  var missingEquips = () => {
    var _compiledRequirements;

    return ((_compiledRequirements = compiledRequirements.maximizeOptions.forceEquip) !== null && _compiledRequirements !== void 0 ? _compiledRequirements : []).filter(equipment => !haveEquipped(equipment));
  };

  if (missingEquips().length > 0) {
    cliExecute("refresh all");
    new Requirement([], {
      forceUpdate: true
    }).merge(compiledRequirements).maximize();
  }

  if (missingEquips().length > 0) {
    throw new Error("Maximizer failed to equip the following equipment: ".concat(missingEquips().map(equipment => equipment.name).join(", "), ".?"));
  }

  if (sea && haveEquipped($item(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral(["The Crown of Ed the Undying"]))))) cliExecute("edpiece fish");
}
var waterBreathingEquipment = (0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$items */ .vS)(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["The Crown of Ed the Undying, aerated diving helmet, crappy Mer-kin mask, Mer-kin gladiator mask, Mer-kin scholar mask, old SCUBA tank"])));
var familiarWaterBreathingEquipment = (0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$items */ .vS)(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral(["das boot, little bitty bathysphere"])));
var cachedUsingPurse = null;
function usingPurse() {
  if (cachedUsingPurse === null) {
    cachedUsingPurse = !(0,libram__WEBPACK_IMPORTED_MODULE_8__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$item */ .xr)(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral(["latte lovers member's mug"])))) || !(0,libram__WEBPACK_IMPORTED_MODULE_8__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$familiar */ .HP)(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral(["Robortender"])))) || !(0,canadv_ash__WEBPACK_IMPORTED_MODULE_0__.canAdv)((0,libram__WEBPACK_IMPORTED_MODULE_7__/* .$location */ .PG)(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral(["The Black Forest"]))), false);
  }

  return cachedUsingPurse;
}
function useUPCs() {
  var UPC = $item(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral(["scratch 'n' sniff UPC sticker"])));

  if ($items(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral(["scratch 'n' sniff sword, scratch 'n' sniff crossbow"]))).every(i => !have(i))) {
    visitUrl("bedazzle.php?action=juststick&sticker=".concat(toInt(UPC), "&pwd"));
  }

  for (var slotNumber = 1; slotNumber <= 3; slotNumber++) {
    var slot = toSlot("sticker".concat(slotNumber));
    var sticker = equippedItem(slot);
    if (sticker === UPC) continue;
    visitUrl("bedazzle.php");

    if (sticker !== $item(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral(["none"])))) {
      visitUrl("bedazzle.php?action=peel&pwd&slot=".concat(slotNumber));
    }

    visitUrl("bedazzle.php?action=stick&pwd&slot=".concat(slotNumber, "&sticker=").concat(toInt(UPC)));
  }
}

/***/ }),

/***/ 2249:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports mutuallyExclusive, Potion, farmingPotions, doublingPotions, potionSetup, bathroomFinance */
/* harmony import */ var core_js_modules_es_object_from_entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5809);
/* harmony import */ var core_js_modules_es_object_from_entries__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_from_entries__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(678);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1245);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3311);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8588);
/* harmony import */ var _acquire__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4564);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7442);
/* harmony import */ var _embezzler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4936);
/* harmony import */ var _outfit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1730);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var banned = (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .$items */ .vS)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Uncle Greenspan's Bathroom Finance Guide"])));
var mutuallyExclusiveList = [(0,libram__WEBPACK_IMPORTED_MODULE_6__/* .$effects */ .lh)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Blue Tongue, Green Tongue, Orange Tongue, Purple Tongue, Red Tongue, Black Tongue"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__/* .$effects */ .lh)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Cupcake of Choice, The Cupcake of Wrath, Shiny Happy Cupcake, Your Cupcake Senses Are Tingling, Tiny Bubbles in the Cupcake"])))];
var mutuallyExclusive = new Map();

for (var _i = 0, _mutuallyExclusiveLis = mutuallyExclusiveList; _i < _mutuallyExclusiveLis.length; _i++) {
  var effectGroup = _mutuallyExclusiveLis[_i];

  var _iterator = _createForOfIteratorHelper(effectGroup),
      _step;

  try {
    var _loop = function _loop() {
      var _mutuallyExclusive$ge;

      var effect = _step.value;
      mutuallyExclusive.set(effect, [].concat(_toConsumableArray((_mutuallyExclusive$ge = mutuallyExclusive.get(effect)) !== null && _mutuallyExclusive$ge !== void 0 ? _mutuallyExclusive$ge : []), _toConsumableArray(effectGroup.filter(other => other !== effect))));
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

var Potion = /*#__PURE__*/function () {
  function Potion(potion) {
    var _options$canDouble;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Potion);

    _defineProperty(this, "potion", void 0);

    _defineProperty(this, "providesDoubleDuration", void 0);

    _defineProperty(this, "canDouble", void 0);

    _defineProperty(this, "overrideEffect", void 0);

    _defineProperty(this, "overrideDuration", void 0);

    _defineProperty(this, "useOverride", void 0);

    this.potion = potion;
    this.providesDoubleDuration = options.providesDoubleDuration;
    this.canDouble = (_options$canDouble = options.canDouble) !== null && _options$canDouble !== void 0 ? _options$canDouble : true;
    this.overrideDuration = options.duration;
    this.overrideEffect = options.effect;
    this.useOverride = options.use;
  }

  _createClass(Potion, [{
    key: "doubleDuration",
    value: function doubleDuration() {
      if (this.canDouble) {
        return new Potion(this.potion, {
          providesDoubleDuration: true,
          canDouble: this.canDouble,
          duration: this.overrideDuration,
          effect: this.overrideEffect,
          use: this.useOverride
        });
      }

      return this;
    }
  }, {
    key: "effect",
    value: function effect() {
      var _this$overrideEffect;

      return (_this$overrideEffect = this.overrideEffect) !== null && _this$overrideEffect !== void 0 ? _this$overrideEffect : (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.effectModifier)(this.potion, "Effect");
    }
  }, {
    key: "effectDuration",
    value: function effectDuration() {
      var _this$overrideDuratio;

      return ((_this$overrideDuratio = this.overrideDuration) !== null && _this$overrideDuratio !== void 0 ? _this$overrideDuratio : (0,libram__WEBPACK_IMPORTED_MODULE_7__/* .get */ .U)("Effect Duration", this.potion)) * (this.providesDoubleDuration ? 2 : 1);
    }
  }, {
    key: "meatDrop",
    value: function meatDrop() {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setLocation)((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .$location */ .PG)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["none"]))));
      return (0,libram__WEBPACK_IMPORTED_MODULE_7__/* .get */ .U)("Meat Drop", this.effect()) + 2 * ((0,_outfit__WEBPACK_IMPORTED_MODULE_5__/* .usingPurse */ .PR)() ? (0,libram__WEBPACK_IMPORTED_MODULE_7__/* .get */ .U)("Smithsness", this.effect()) : 0);
    }
  }, {
    key: "familiarWeight",
    value: function familiarWeight() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_7__/* .get */ .U)("Familiar Weight", this.effect());
    }
  }, {
    key: "bonusMeat",
    value: function bonusMeat() {
      var familiarMultiplier = (0,libram__WEBPACK_IMPORTED_MODULE_8__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .$familiar */ .HP)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Robortender"])))) ? 2 : (0,libram__WEBPACK_IMPORTED_MODULE_8__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .$familiar */ .HP)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Hobo Monkey"])))) ? 1.25 : 1; // Assume base weight of 100 pounds. This is off but close enough.

      var assumedBaseWeight = 100; // Marginal value of familiar weight in % meat drop.

      var marginalValue = 2 * familiarMultiplier + Math.sqrt(220 * familiarMultiplier) / (2 * Math.sqrt(assumedBaseWeight));
      return this.familiarWeight() * marginalValue + this.meatDrop();
    }
  }, {
    key: "gross",
    value: function gross(embezzlers, maxTurns) {
      var bonusMeat = this.bonusMeat();
      var duration = Math.max(this.effectDuration(), maxTurns !== null && maxTurns !== void 0 ? maxTurns : 0); // Number of embezzlers this will actually be in effect for.

      var embezzlersApplied = Math.max(Math.min(duration, embezzlers) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(this.effect()), 0);
      return bonusMeat / 100 * (_lib__WEBPACK_IMPORTED_MODULE_3__/* .baseMeat */ .Vq * duration + 750 * embezzlersApplied);
    }
  }, {
    key: "price",
    value: function price(historical) {
      // If asked for historical, and age < 14 days, use historical.
      return historical && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.historicalAge)(this.potion) < 14 ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.historicalPrice)(this.potion) : (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mallPrice)(this.potion);
    }
  }, {
    key: "net",
    value: function net(embezzlers) {
      var historical = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.gross(embezzlers) - this.price(historical);
    }
  }, {
    key: "doublingValue",
    value: function doublingValue(embezzlers) {
      var historical = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return Math.min(Math.max(this.doubleDuration().net(embezzlers, historical), 0) - Math.max(this.net(embezzlers, historical), 0), this.price(true));
    }
  }, {
    key: "usesToCover",
    value:
    /**
     * Compute how many times to use this potion to cover the range of turns
     * @param turns the number of turns to cover
     * @param allowOverage whether or not to allow the potion to extend past this number of turns
     * @returns the number of uses required by this potion to cover thatrange
     */
    function usesToCover(turns, allowOverage) {
      if (allowOverage) {
        return Math.ceil(turns / this.effectDuration());
      } else {
        return Math.floor(turns / this.effectDuration());
      }
    }
  }, {
    key: "overage",
    value:
    /**
     * Compute how many fewer or more turns we are from the desired turn count based on the input usage
     * @param turns the number of turns to cover
     * @param uses the number of uses of hte potion
     * @returns negative number of the number of turns short, positive number of the number of extra turns
     */
    function overage(turns, uses) {
      return this.effectDuration() * uses - turns;
    }
  }, {
    key: "value",
    value:
    /**
     * Compute up to 4 possible value thresholds for this potion based on the number of embezzlers to fight at the start of the day
     * - using it to only cover embezzlers
     * - using it to cover both barf and embezzlers (this is max 1 use)
     * - using it to only cover barf
     * - using it to cover turns in barf and those that would be lost at the end of the day
     * @param embezzlers The number of embezzlers expected to be fought in a block at the start of the day
     * @returns
     */
    function value(embezzlers, turns, limit) {
      var startingTurns = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(this.effect());
      var ascending = _lib__WEBPACK_IMPORTED_MODULE_3__/* .globalOptions.ascending */ .Xe.ascending;
      var totalTurns = turns !== null && turns !== void 0 ? turns : (0,_embezzler__WEBPACK_IMPORTED_MODULE_4__/* .estimatedTurns */ .AN)();
      var values = [];
      var limitFunction = limit ? quantity => (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .clamp */ .uZ)(limit - (0,libram__WEBPACK_IMPORTED_MODULE_9__/* .sumNumbers */ .JD)(values.map(tier => tier.quantity)), 0, quantity) : quantity => quantity; // compute the value of covering embezzlers

      var embezzlerTurns = Math.max(0, embezzlers - startingTurns);
      var embezzlerQuantity = this.usesToCover(embezzlerTurns, false);
      var embezzlerValue = embezzlerQuantity ? this.gross(embezzlerTurns) : 0;
      values.push({
        name: "embezzler",
        quantity: limitFunction(embezzlerQuantity),
        value: embezzlerValue
      }); // compute the number of embezzlers missed before, and their value (along with barf unless nobarf)

      var overlapEmbezzlers = -this.overage(embezzlerTurns, embezzlerQuantity);

      if (overlapEmbezzlers > 0) {
        values.push({
          name: "overlap",
          quantity: limitFunction(1),
          value: this.gross(overlapEmbezzlers, _lib__WEBPACK_IMPORTED_MODULE_3__/* .globalOptions.noBarf */ .Xe.noBarf ? overlapEmbezzlers : undefined)
        });
      }

      var embezzlerCoverage = embezzlerQuantity + (overlapEmbezzlers > 0 ? 1 : 0) * this.effectDuration();

      if (!_lib__WEBPACK_IMPORTED_MODULE_3__/* .globalOptions.noBarf */ .Xe.noBarf) {
        // unless nobarf, compute the value of barf turns
        // if ascending, break those turns that are not fully covered by a potion into their own value
        var remainingTurns = Math.max(0, totalTurns - embezzlerCoverage - startingTurns);
        var barfQuantity = this.usesToCover(remainingTurns, !ascending);
        values.push({
          name: "barf",
          quantity: limitFunction(barfQuantity),
          value: this.gross(0)
        });

        if (_lib__WEBPACK_IMPORTED_MODULE_3__/* .globalOptions.ascending */ .Xe.ascending && this.overage(remainingTurns, barfQuantity) <= 0) {
          var ascendingTurns = Math.max(0, remainingTurns - barfQuantity * this.effectDuration());
          values.push({
            name: "ascending",
            quantity: limitFunction(1),
            value: this.gross(0, ascendingTurns)
          });
        }
      }

      return values.filter(tier => tier.quantity > 0);
    }
  }, {
    key: "use",
    value: function use(quantity) {
      if (this.useOverride) {
        return this.useOverride(quantity);
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemType)(this.potion) === "potion") {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(quantity, this.potion);
      } else {
        // must provide an override for non potions, otherwise they won't use
        return false;
      }
    }
  }], [{
    key: "bonusMeat",
    value: function bonusMeat(item) {
      return new Potion(item).bonusMeat();
    }
  }, {
    key: "gross",
    value: function gross(item, embezzlers) {
      return new Potion(item).gross(embezzlers);
    }
  }, {
    key: "net",
    value: function net(item, embezzlers) {
      var historical = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return new Potion(item).net(embezzlers, historical);
    }
  }, {
    key: "doublingValue",
    value: function doublingValue(item, embezzlers) {
      var historical = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return new Potion(item).doublingValue(embezzlers, historical);
    }
  }, {
    key: "usesToCover",
    value: function usesToCover(item, turns, allowOverage) {
      return new Potion(item).usesToCover(turns, allowOverage);
    }
  }, {
    key: "overage",
    value: function overage(item, turns, uses) {
      return new Potion(item).overage(turns, uses);
    }
  }]);

  return Potion;
}();

function useAsValuable(potion, embezzlers, embezzlersOnly) {
  var value = potion.value(embezzlers);
  var price = potion.price(false);
  var amountsAcquired = value.map(value => (!embezzlersOnly || value.name === "embezzler") && value.value - price > 0 ? acquire(value.quantity, potion.potion, value.value, false) : 0);
  var total = amountsAcquired.reduce((total, amount) => total + amount, 0);

  if (total > 0) {
    var effect = potion.effect();

    if (isSong(effect) && !have(effect)) {
      var _iterator2 = _createForOfIteratorHelper(getActiveSongs()),
          _step2;

      try {
        var _loop2 = function _loop2() {
          var song = _step2.value;
          var slot = Mood.defaultOptions.songSlots.find(slot => slot.includes(song));

          if (!slot || slot.includes(effect)) {
            cliExecute("shrug ".concat(song));
          }
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    print("Using ".concat(total, " ").concat(potion.potion.plural));
    potion.use(total);
  }

  return total;
}

var farmingPotions = [].concat(_toConsumableArray(kolmafia__WEBPACK_IMPORTED_MODULE_1__.Item.all().filter(item => item.tradeable && !banned.includes(item) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemType)(item) === "potion").map(item => new Potion(item)).filter(potion => potion.bonusMeat() > 0)), _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .$effects */ .lh)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Braaaaaains, Frosty"]))).map(effect => new Potion((0,libram__WEBPACK_IMPORTED_MODULE_6__/* .$item */ .xr)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["pocket wish"]))), {
  effect: effect,
  canDouble: false,
  duration: 20,
  use: quantity => new Array(quantity).fill(0).every(() => (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("genie effect ".concat(effect)))
}))));
function doublingPotions(embezzlers) {
  return farmingPotions.filter(potion => potion.doubleDuration().gross(embezzlers) / potion.price(true) > 0.5).map(potion => {
    return {
      potion: potion,
      value: potion.doublingValue(embezzlers)
    };
  }).sort((a, b) => b.value - a.value).map(pair => pair.potion);
}
/**
 * Determines if potions are worth using by comparing against meat-equilibrium. Considers using pillkeeper to double them. Accounts for non-wanderer embezzlers. Does not account for PYEC/LTC, or running out of turns with the ascend flag.
 * @param doEmbezzlers Do we account for embezzlers when deciding what potions are profitable?
 */

function potionSetup(embezzlersOnly) {
  // TODO: Count PYEC.
  // TODO: Count free fights (25 meat each for most).
  var embezzlers = embezzlerCount();

  if (have($item(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Eight Days a Week Pill Keeper"])))) && !get("_freePillKeeperUsed")) {
    var possibleDoublingPotions = doublingPotions(embezzlers);
    var bestPotion = possibleDoublingPotions.length > 0 ? possibleDoublingPotions[0] : undefined;

    if (bestPotion && bestPotion.doubleDuration().net(embezzlers) > pillkeeperOpportunityCost()) {
      print("Determined that ".concat(bestPotion.potion, " was the best potion to double"), HIGHLIGHT);
      cliExecute("pillkeeper extend");
      acquire(1, bestPotion.potion, bestPotion.doubleDuration().gross(embezzlers));
      bestPotion.use(1);
    }
  } // Only test potions which are reasonably close to being profitable using historical price.


  var testPotions = farmingPotions.filter(potion => potion.gross(embezzlers) / potion.price(true) > 0.5);
  testPotions.sort((a, b) => b.net(embezzlers) - a.net(embezzlers));
  var excludedEffects = new Set();

  var _iterator3 = _createForOfIteratorHelper(getActiveEffects()),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _mutuallyExclusive$ge2;

      var effect = _step3.value;

      var _iterator5 = _createForOfIteratorHelper((_mutuallyExclusive$ge2 = mutuallyExclusive.get(effect)) !== null && _mutuallyExclusive$ge2 !== void 0 ? _mutuallyExclusive$ge2 : []),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var excluded = _step5.value;
          excludedEffects.add(excluded);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  var _iterator4 = _createForOfIteratorHelper(testPotions),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var potion = _step4.value;

      var _effect = potion.effect();

      if (!excludedEffects.has(_effect) && useAsValuable(potion, embezzlers, embezzlersOnly) > 0) {
        var _mutuallyExclusive$ge3;

        var _iterator6 = _createForOfIteratorHelper((_mutuallyExclusive$ge3 = mutuallyExclusive.get(_effect)) !== null && _mutuallyExclusive$ge3 !== void 0 ? _mutuallyExclusive$ge3 : []),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _excluded = _step6.value;
            excludedEffects.add(_excluded);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
}
/**
 * Uses a Greenspan iff profitable; does not account for PYEC/LTC, or running out of adventures with the ascend flag.
 * @param embezzlers Do we want to account for embezzlers when calculating the value of bathroom finance?
 */

function bathroomFinance(embezzlers) {
  if (have($effect(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Buy!  Sell!  Buy!  Sell!"]))))) return; // Average meat % for embezzlers is sum of arithmetic series, 2 * sum(1 -> embezzlers)

  var averageEmbezzlerGross = (baseMeat + 750) * 2 * (embezzlers + 1) / 2 / 100;
  var embezzlerGross = averageEmbezzlerGross * embezzlers;
  var tourists = 100 - embezzlers; // Average meat % for tourists is sum of arithmetic series, 2 * sum(embezzlers + 1 -> 100)

  var averageTouristGross = baseMeat * 2 * (100 + embezzlers + 1) / 2 / 100;
  var touristGross = averageTouristGross * tourists;
  var greenspan = $item(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Uncle Greenspan's Bathroom Finance Guide"])));

  if (touristGross + embezzlerGross > mallPrice(greenspan)) {
    acquire(1, greenspan, touristGross + embezzlerGross, false);

    if (itemAmount(greenspan) > 0) {
      print("Using ".concat(greenspan, "!"), HIGHLIGHT);

      _use(greenspan);
    }
  }
}

/***/ }),

/***/ 742:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sf": () => (/* binding */ garboValue)
/* harmony export */ });
/* unused harmony exports garboAverageValue, startSession, sessionSinceStart, valueSession, printGarboSession */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(678);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3311);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8588);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7442);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





function currency() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  var unitCost = items.map(i => {
    var coinmaster = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Coinmaster.all().find(c => (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.sellPrice)(c, i) > 0);

    if (!coinmaster) {
      throw "Invalid coinmaster item ".concat(i);
    } else {
      return [i, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.sellPrice)(coinmaster, i)];
    }
  });
  return () => Math.max.apply(Math, _toConsumableArray(unitCost.map(_ref => {
    var _ref2 = _slicedToArray(_ref, 2),
        item = _ref2[0],
        cost = _ref2[1];

    return garboValue(item) / cost;
  })));
}

function complexCandy() {
  var candies = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.all().filter(i => i.candyType === "complex");
  var candyLookup = [[], [], [], [], []];

  var _iterator = _createForOfIteratorHelper(candies),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var candy = _step.value;
      var id = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(candy) % 5;

      if (candy.tradeable) {
        candyLookup[id].push(candy);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var candyIdPrices = candies.filter(i => !i.tradeable).map(i => [i, () => Math.min.apply(Math, _toConsumableArray(candyLookup[(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(i) % 5].map(i => garboValue(i))))]);
  return candyIdPrices;
}

var specialValueLookup = new Map([[(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Freddy Kruegerand"]))), currency.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["bottle of Bloodweiser, electric Kool-Aid, Dreadsylvanian skeleton key"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Beach Buck"]))), currency((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["one-day ticket to Spring Break Beach"]))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Coinspiracy"]))), currency.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Merc Core deployment orders, karma shawarma"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["FunFunds\u2122"]))), currency((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["one-day ticket to Dinseylandfill"]))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Volcoino"]))), currency((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["one-day ticket to That 70s Volcano"]))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Wal-Mart gift certificate"]))), currency((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["one-day ticket to The Glaciest"]))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Rubee\u2122"]))), currency((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["FantasyRealm guest pass"]))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Guzzlrbuck"]))), currency((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Never Don't Stop Not Striving"]))))]].concat(_toConsumableArray(complexCandy()), [[(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Merc Core deployment orders"]))), () => garboValue((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["one-day ticket to Conspiracy Island"]))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["free-range mushroom"]))), () => 3 * Math.max(garboValue((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["mushroom tea"])))) - garboValue((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["soda water"])))), garboValue((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["mushroom whiskey"])))) - garboValue((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["fermenting powder"])))), garboValue((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["mushroom filet"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["little firkin"]))), () => garboAverageValue.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["martini, screwdriver, strawberry daiquiri, margarita, vodka martini, tequila sunrise, bottle of Amontillado, barrel-aged martini, barrel gun"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["normal barrel"]))), () => garboAverageValue.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["a little sump'm sump'm, pink pony, rockin' wagon, roll in the hay, slip 'n' slide, slap and tickle"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["big tun"]))), () => garboAverageValue.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["gibson, gin and tonic, mimosette, tequila sunset, vodka and tonic, zmobie"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["weathered barrel"]))), () => garboAverageValue.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["bean burrito, enchanted bean burrito, jumping bean burrito"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["dusty barrel"]))), () => garboAverageValue.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["spicy bean burrito, spicy enchanted bean burrito, spicy jumping bean burrito"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["disintegrating barrel"]))), () => garboAverageValue.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["insanely spicy bean burrito, insanely spicy enchanted bean burrito, insanely spicy jumping bean burrito"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["moist barrel"]))), () => garboAverageValue.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["cast, concentrated magicalness pill, enchanted barbell, giant moxie weed, Mountain Stream soda"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["rotting barrel"]))), () => garboAverageValue.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["Doc Galaktik's Ailment Ointment, extra-strength strongness elixir, jug-o-magicalness, Marquis de Poivre soda, suntan lotion of moxiousness"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["mouldering barrel"]))), () => garboAverageValue.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["creepy ginger ale, haunted battery, scroll of drastic healing, synthetic marrow, the funk"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["barnacled barrel"]))), () => garboAverageValue.apply(void 0, _toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["Alewife\u2122 Ale, bazookafish bubble gum, beefy fish meat, eel battery, glistening fish meat, ink bladder, pufferfish spine, shark cartilage, slick fish meat, slug of rum, slug of shochu, slug of vodka, temporary teardrop tattoo"])))))], [(0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["fake hand"]))), () => 50000]]));

function printSession(session) {
  var value = session.value(garboValue);

  var printProfit = details => {
    var _iterator2 = _createForOfIteratorHelper(details),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = _step2.value,
            item = _step2$value.item,
            quantity = _step2$value.quantity,
            _value = _step2$value.value;
        print("  ".concat(item, " (").concat(quantity, ") @ ").concat(Math.floor(_value)));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  };

  var lowValue = value.itemDetails.filter(detail => detail.value < 0).sort((a, b) => a.value - b.value);
  var highValue = value.itemDetails.filter(detail => detail.value > 0).sort((a, b) => b.value - a.value);
  print("Total Session Value: ".concat(value.total));
  print("Of that, ".concat(value.meat, " came from meat and ").concat(value.items, " came from items"));
  print(" You gained meat on ".concat(highValue.length, " items including:"));
  printProfit(highValue);
  print(" You lost meat on ".concat(lowValue.length, " items including:"));
  printProfit(lowValue);
}

var garboValueCache = new Map();
function garboValue(item) {
  var cachedValue = garboValueCache.get(item);

  if (cachedValue === undefined) {
    var specialValueCompute = specialValueLookup.get(item);
    var value = specialValueCompute ? specialValueCompute() : (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .getSaleValue */ .xI)(item);
    garboValueCache.set(item, value);
    return value;
  }

  return cachedValue;
}
function garboAverageValue() {
  for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    items[_key2] = arguments[_key2];
  }

  return (0,libram__WEBPACK_IMPORTED_MODULE_4__/* .sumNumbers */ .JD)(items.map(garboValue)) / items.length;
}
var session = null;
/**
 * Start a new session, deleting any old session
 */

function startSession() {
  session = Session.current();
}
/**
 * Compute the difference between the current drops and starting session (if any)
 * @returns The difference
 */

function sessionSinceStart() {
  if (session) {
    return Session.current().diff(session);
  }

  return Session.current();
}
function valueSession() {
  printSession(Session.current());
  Session.current().toFile("test.json");
}
function printGarboSession() {
  if (resetDailyPreference("garboResultsDate")) {
    set("garboResultsMeat", 0);
    set("garboResultsItems", 0);
  }

  var message = (head, meat, items) => print("".concat(head, ", you generated ").concat(formatNumber(meat + items), " meat, with ").concat(formatNumber(meat), " raw meat and ").concat(formatNumber(items), " from items"), HIGHLIGHT);

  var _sessionSinceStart$va = sessionSinceStart().value(garboValue),
      meat = _sessionSinceStart$va.meat,
      items = _sessionSinceStart$va.items,
      itemDetails = _sessionSinceStart$va.itemDetails;

  var totalMeat = meat + property.getNumber("garboResultsMeat", 0);
  var totalItems = items + property.getNumber("garboResultsItems", 0); // list the top 3 gaining and top 3 losing items

  var losers = itemDetails.sort((a, b) => a.value - b.value).slice(0, 3);
  var winners = itemDetails.sort((a, b) => b.value - a.value).slice(0, 3);
  print("Extreme Items:", HIGHLIGHT);

  for (var _i2 = 0, _arr2 = [].concat(_toConsumableArray(winners), _toConsumableArray(losers)); _i2 < _arr2.length; _i2++) {
    var detail = _arr2[_i2];
    print("".concat(detail.quantity, " ").concat(detail.item, " worth ").concat(detail.value.toFixed(0), " total"), HIGHLIGHT);
  }

  set("garboResultsMeat", totalMeat);
  set("garboResultsItems", totalItems);
  message("This run of garbo", meat, items);
  message("So far today", totalMeat, totalItems);
}

/***/ }),

/***/ 8845:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export default */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(678);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7442);
var _templateObject;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var whitelist = (0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$items */ .vS)(_templateObject || (_templateObject = _taggedTemplateLiteral(["sugar shotgun, sugar shillelagh, sugar shank, sugar chapeau, sugar shorts, sugar shield, sugar shirt, Fudgie Roll"])));
function synthesize(casts, effect) {
  var shuffledWhitelist = shuffle(_toConsumableArray(whitelist));

  var _iterator = _createForOfIteratorHelper(shuffledWhitelist),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var itemA = _step.value;
      if (availableAmount(itemA) <= 1) continue;
      if (casts <= 0) return;

      var _iterator2 = _createForOfIteratorHelper(shuffledWhitelist),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var itemB = _step2.value;
          var minimum = itemA === itemB ? 2 : 1;
          if (availableAmount(itemB) <= minimum) continue;
          if (sweetSynthesisResult(itemA, itemB) !== effect) continue;
          var possibleCasts = itemA === itemB ? Math.floor((availableAmount(itemA) - 1) / 2) : Math.min(availableAmount(itemA), availableAmount(itemB)) - 1;
          var spleen = Math.max(spleenLimit() - mySpleenUse(), 0);
          var castsToDo = Math.min(possibleCasts, casts, spleen);
          if (castsToDo === 0) continue;
          if (itemA === itemB) retrieveItem(itemA, castsToDo * 2);else {
            retrieveItem(itemA, castsToDo);
            retrieveItem(itemB, castsToDo);
          }
          if (sweetSynthesis(castsToDo, itemA, itemB)) casts -= castsToDo;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  sweetSynthesis(clamp(casts, 0, spleenLimit() - mySpleenUse()), effect);
}

/***/ }),

/***/ 5444:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "x": () => (/* binding */ determineDraggableZoneAndEnsureAccess),
  "J": () => (/* binding */ digitizedMonstersRemaining)
});

// EXTERNAL MODULE: external "canadv.ash"
var external_canadv_ash_ = __webpack_require__(2549);
// EXTERNAL MODULE: external "kolmafia"
var external_kolmafia_ = __webpack_require__(7530);
// EXTERNAL MODULE: ./node_modules/lodash/maxBy.js
var maxBy = __webpack_require__(4378);
var maxBy_default = /*#__PURE__*/__webpack_require__.n(maxBy);
// EXTERNAL MODULE: ./node_modules/libram/dist/lib.js
var lib = __webpack_require__(3311);
// EXTERNAL MODULE: ./node_modules/libram/dist/property.js + 2 modules
var property = __webpack_require__(2474);
// EXTERNAL MODULE: ./node_modules/libram/dist/template-string.js
var template_string = __webpack_require__(678);
// EXTERNAL MODULE: ./node_modules/libram/dist/utils.js
var utils = __webpack_require__(8588);
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2020/Guzzlr.js
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var item = (0,template_string/* $item */.xr)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Guzzlr tablet"])));
function have() {
  return (0,lib/* have */.lf)(item);
}

function useTabletWithChoice(option) {
  (0,property/* withChoice */.Rj)(1412, option, () => (0,external_kolmafia_.use)(1, item));
}

function isQuestActive() {
  return (0,property/* get */.U2)("questGuzzlr") !== "unstarted";
}
/**
 * Platinum deliveries completed overall
 */

function getPlatinum() {
  return (0,property/* get */.U2)("guzzlrPlatinumDeliveries");
}
/**
 * Platinum deliveries completed today
 */

function getPlatinumToday() {
  return (0,property/* get */.U2)("_guzzlrPlatinumDeliveries");
}
/**
 * Can do a platinum delivery (haven't done one today)
 */

function canPlatinum() {
  return !isQuestActive() && getGold() >= 5 && getPlatinumToday() < 1;
}
/**
 * Have fully unlocked the platinum delivery bonuses (done >= 30)
 */

function haveFullPlatinumBonus() {
  return getPlatinum() >= 30;
}
/**
 * Accept platinum delivery
 */

function acceptPlatinum() {
  if (!canPlatinum()) return false;
  useTabletWithChoice(4);
  return true;
}
/**
 * Gold deliveries completed overall
 */

function getGold() {
  return (0,property/* get */.U2)("guzzlrGoldDeliveries");
}
/**
 * Gold deliveries completed today
 */

function getGoldToday() {
  return (0,property/* get */.U2)("_guzzlrGoldDeliveries");
}
/**
 * Can do a gold delivery (have done fewer than 3 today)
 */

function canGold() {
  return !isQuestActive() && getBronze() >= 5 && getGoldToday() < 3;
}
/**
 * Have fully unlocked the platinum delivery bonuses (done >= 30)
 */

function haveFullGoldBonus() {
  return getGold() >= 150;
}
/**
 * Accept gold delivery
 */

function acceptGold() {
  if (!canGold()) return false;
  useTabletWithChoice(3);
  return true;
}
/**
 * Bronze deliveries completed overall
 */

function getBronze() {
  return (0,property/* get */.U2)("guzzlrBronzeDeliveries");
}
/**
 * Accept bronze delivery
 */

function acceptBronze() {
  if (isQuestActive()) return false;
  useTabletWithChoice(2);
  return true;
}
/**
 * Have fully unlocked the platinum delivery bonuses (done >= 30)
 */

function haveFullBronzeBonus() {
  return getBronze() >= 196;
}
/**
 * Can abandon the current Guzzlr quest
 */

function canAbandon() {
  return isQuestActive() && !(0,property/* get */.U2)("_guzzlrQuestAbandoned");
}
/**
 * Abandon Guzzlr quest
 */

function abandon() {
  if (!canAbandon()) return false;
  (0,external_kolmafia_.visitUrl)("inventory.php?tap=guzzlr", false);
  (0,external_kolmafia_.runChoice)(1);
  (0,external_kolmafia_.runChoice)(5);
  return true;
}
/**
 * Get current Guzzlr quest location
 */

function getLocation() {
  return (0,property/* get */.U2)("guzzlrQuestLocation");
}
/**
 * Get current Guzzlr quest tier
 */

function getTier() {
  var tier = (0,property/* get */.U2)("guzzlrQuestTier");
  return tier === "" ? null : tier;
}
/**
 * Get current Guzzlr quest booze
 */

function getBooze() {
  var booze = (0,property/* get */.U2)("guzzlrQuestBooze");
  if (booze === "") return null;
  return external_kolmafia_.Item.get(booze);
}
/**
 * List of the platinum cocktails
 */

var Cocktails = (0,template_string/* $items */.vS)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Buttery Boy, Steamboat, Ghiaccio Colada, Nog-on-the-Cob, Sourfinger"])));
/**
 * Returns true if the user has a platinum cocktail in their inventory
 */

function havePlatinumBooze() {
  return Cocktails.some(cock => haveItem(cock));
}
/**
 * Returns true if the user has the cocktail that they need for their current quest
 *
 * If they have no quest, returns false
 */

function haveBooze() {
  var booze = getBooze();

  switch (booze) {
    case null:
      return false;

    case $item(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Guzzlr cocktail set"]))):
      return havePlatinumBooze();

    default:
      return haveItem(booze);
  }
}
var ingredientToPlatinumCocktail = new Map([[(0,template_string/* $item */.xr)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["miniature boiler"]))), (0,template_string/* $item */.xr)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Steamboat"])))], [(0,template_string/* $item */.xr)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["cold wad"]))), (0,template_string/* $item */.xr)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Ghiaccio Colada"])))], [(0,template_string/* $item */.xr)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["robin's egg"]))), (0,template_string/* $item */.xr)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Nog-on-the-Cob"])))], [(0,template_string/* $item */.xr)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["mangled finger"]))), (0,template_string/* $item */.xr)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Sourfinger"])))], [(0,template_string/* $item */.xr)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Dish of Clarified Butter"]))), (0,template_string/* $item */.xr)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Buttery Boy"])))]]);
var platinumCocktailToIngredient = (0,utils/* invertMap */.Mp)(ingredientToPlatinumCocktail);
function getCheapestPlatinumCocktail() {
  var freeCraft = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var defaultCocktail = [(0,template_string/* $item */.xr)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Dish of Clarified Butter"]))), (0,template_string/* $item */.xr)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Buttery Boy"])))];

  if (freeCraft) {
    var _maxBy;

    return ((_maxBy = maxBy_default()(Array.from(ingredientToPlatinumCocktail), ingredientAndCocktail => Math.max.apply(Math, _toConsumableArray(ingredientAndCocktail.map(item => -(0,external_kolmafia_.mallPrice)(item)))))) !== null && _maxBy !== void 0 ? _maxBy : defaultCocktail)[1];
  } else {
    var _maxBy2;

    return ((_maxBy2 = maxBy_default()(Array.from(ingredientToPlatinumCocktail), ingredientAndCocktail => -(0,external_kolmafia_.mallPrice)(ingredientAndCocktail[1]))) !== null && _maxBy2 !== void 0 ? _maxBy2 : defaultCocktail)[1];
  }
}
function turnsLeftOnQuest() {
  var useShoes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var progressPerTurn = useShoes ? Math.floor((10 - get("_guzzlrDeliveries")) * 1.5) : 10 - get("_guzzlrDeliveries");
  return Math.ceil((100 - get("guzzlrDeliveryProgress")) / progressPerTurn);
}
function expectedReward() {
  var usePants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  switch (getTier()) {
    case "platinum":
      // 20-25
      return 22.5 + (usePants ? 5 : 0);

    case "gold":
      // 5-7
      return 6 + (usePants ? 3 : 0);

    case "bronze":
      // 2-4
      return 3 + (usePants ? 3 : 0);

    default:
      return 0;
  }
}
// EXTERNAL MODULE: ./node_modules/libram/dist/resources/2016/SourceTerminal.js
var SourceTerminal = __webpack_require__(1577);
// EXTERNAL MODULE: ./node_modules/libram/dist/counter.js
var counter = __webpack_require__(5632);
// EXTERNAL MODULE: ./src/embezzler.ts
var embezzler = __webpack_require__(4936);
// EXTERNAL MODULE: ./src/lib.ts
var src_lib = __webpack_require__(7442);
// EXTERNAL MODULE: ./src/session.ts
var session = __webpack_require__(742);
;// CONCATENATED MODULE: ./src/wanderer.ts
var wanderer_templateObject, wanderer_templateObject2, wanderer_templateObject3, wanderer_templateObject4, wanderer_templateObject5, wanderer_templateObject6, wanderer_templateObject7, wanderer_templateObject8, wanderer_templateObject9, wanderer_templateObject10, wanderer_templateObject11, wanderer_templateObject12, wanderer_templateObject13, wanderer_templateObject14, wanderer_templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _ref, _templateObject28, _templateObject29, _ref3, _templateObject30, _ref4, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _ref10, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _ref14, _templateObject41;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function wanderer_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var WANDERER_PRICE_THRESHOLD = 10000;

function untangleDigitizes(turnCount, chunks) {
  var turnsPerChunk = turnCount / chunks;
  var monstersPerChunk = Math.sqrt((turnsPerChunk + 3) / 5 + 1 / 4) - 1 / 2;
  return Math.round(chunks * monstersPerChunk);
}

function digitizedMonstersRemaining() {
  if (!SourceTerminal/* have */.lf()) return 0;
  var digitizesLeft = SourceTerminal/* getDigitizeUsesRemaining */.VW();

  if (digitizesLeft === SourceTerminal/* getMaximumDigitizeUses */.$O()) {
    return untangleDigitizes((0,embezzler/* estimatedTurns */.AN)(), SourceTerminal/* getMaximumDigitizeUses */.$O());
  }

  var monsterCount = SourceTerminal/* getDigitizeMonsterCount */.A1() + 1;
  var turnsLeftAtNextMonster = (0,embezzler/* estimatedTurns */.AN)() - counter/* get */.U2("Digitize Monster");
  if (turnsLeftAtNextMonster <= 0) return 0;
  var turnsAtLastDigitize = turnsLeftAtNextMonster + ((monsterCount + 1) * monsterCount * 5 - 3);
  return untangleDigitizes(turnsAtLastDigitize, digitizesLeft + 1) - SourceTerminal/* getDigitizeMonsterCount */.A1();
}
var UnlockableZones = [{
  zone: "Spaaace",
  available: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(wanderer_templateObject || (wanderer_templateObject = wanderer_taggedTemplateLiteral(["Transpondent"])))),
  unlocker: (0,template_string/* $item */.xr)(wanderer_templateObject2 || (wanderer_templateObject2 = wanderer_taggedTemplateLiteral(["transporter transponder"]))),
  noInv: false
}, {
  zone: "Wormwood",
  available: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(wanderer_templateObject3 || (wanderer_templateObject3 = wanderer_taggedTemplateLiteral(["Absinthe-Minded"])))),
  unlocker: (0,template_string/* $item */.xr)(wanderer_templateObject4 || (wanderer_templateObject4 = wanderer_taggedTemplateLiteral(["tiny bottle of absinthe"]))),
  noInv: false
}, {
  zone: "RabbitHole",
  available: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(wanderer_templateObject5 || (wanderer_templateObject5 = wanderer_taggedTemplateLiteral(["Down the Rabbit Hole"])))),
  unlocker: (0,template_string/* $item */.xr)(wanderer_templateObject6 || (wanderer_templateObject6 = wanderer_taggedTemplateLiteral(["\"DRINK ME\" potion"]))),
  noInv: false
}, {
  zone: "Conspiracy Island",
  available: () => (0,src_lib/* realmAvailable */.e6)("spooky"),
  unlocker: (0,template_string/* $item */.xr)(wanderer_templateObject7 || (wanderer_templateObject7 = wanderer_taggedTemplateLiteral(["one-day ticket to Conspiracy Island"]))),
  noInv: true
}, {
  zone: "Dinseylandfill",
  available: () => (0,src_lib/* realmAvailable */.e6)("stench"),
  unlocker: (0,template_string/* $item */.xr)(wanderer_templateObject8 || (wanderer_templateObject8 = wanderer_taggedTemplateLiteral(["one-day ticket to Dinseylandfill"]))),
  noInv: true
}, {
  zone: "The Glaciest",
  available: () => (0,src_lib/* realmAvailable */.e6)("cold"),
  unlocker: (0,template_string/* $item */.xr)(wanderer_templateObject9 || (wanderer_templateObject9 = wanderer_taggedTemplateLiteral(["one-day ticket to The Glaciest"]))),
  noInv: true
}, {
  zone: "Spring Break Beach",
  available: () => (0,src_lib/* realmAvailable */.e6)("sleaze"),
  unlocker: (0,template_string/* $item */.xr)(wanderer_templateObject10 || (wanderer_templateObject10 = wanderer_taggedTemplateLiteral(["one-day ticket to Spring Break Beach"]))),
  noInv: true
}];

function canAdvOrUnlock(loc) {
  var underwater = loc.environment === "underwater";
  var skiplist = (0,template_string/* $locations */.xw)(wanderer_templateObject11 || (wanderer_templateObject11 = wanderer_taggedTemplateLiteral(["The Oasis, The Bubblin' Caldera, Barrrney's Barrr, The F'c'le, The Poop Deck, Belowdecks, 8-Bit Realm, Madness Bakery, The Secret Government Laboratory, The Dire Warren"])));

  if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(wanderer_templateObject12 || (wanderer_templateObject12 = wanderer_taggedTemplateLiteral(["repaid diaper"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(wanderer_templateObject13 || (wanderer_templateObject13 = wanderer_taggedTemplateLiteral(["Great Wolf's beastly trousers"]))))) {
    skiplist.push((0,template_string/* $location */.PG)(wanderer_templateObject14 || (wanderer_templateObject14 = wanderer_taggedTemplateLiteral(["The Icy Peak"]))));
  }

  var canAdvHack = loc === (0,template_string/* $location */.PG)(wanderer_templateObject15 || (wanderer_templateObject15 = wanderer_taggedTemplateLiteral(["The Upper Chamber"]))) && (0,lib/* questStep */.cL)("questL11Pyramid") === -1; // (hopefully) temporary fix for canadv bug that results in infinite loop

  var canUnlock = UnlockableZones.some(z => loc.zone === z.zone && (z.available() || !z.noInv));
  return !underwater && !skiplist.includes(loc) && !canAdvHack && ((0,external_canadv_ash_.canAdv)(loc, false) || canUnlock);
}

function unlock(loc) {
  var unlockableZone = UnlockableZones.find(z => z.zone === loc.zone);
  if (!unlockableZone) return (0,external_canadv_ash_.canAdv)(loc, false);
  if (unlockableZone.available()) return true;
  if ((0,external_kolmafia_.buy)(1, unlockableZone.unlocker, WANDERER_PRICE_THRESHOLD) === 0) return false;
  return (0,external_kolmafia_.use)(unlockableZone.unlocker);
}

var backupSkiplist = (0,template_string/* $locations */.xw)(_templateObject16 || (_templateObject16 = wanderer_taggedTemplateLiteral(["The Overgrown Lot, The Skeleton Store, The Mansion of Dr. Weirdeaux"])));
var wandererSkiplist = (0,template_string/* $locations */.xw)(_templateObject17 || (_templateObject17 = wanderer_taggedTemplateLiteral(["The Batrat and Ratbat Burrow, Guano Junction, The Beanbat Chamber, A-Boo Peak"])));

function canWander(location, type) {
  if (type === "backup") {
    return !backupSkiplist.includes(location) && location.combatPercent >= 100;
  } else if (type === "wanderer") {
    return !wandererSkiplist.includes(location) && location.wanderers;
  }

  return false;
}

function wandererTurnsAvailableToday(zone) {
  return (canWander(zone, "wanderer") ? digitizedMonstersRemaining() + ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject18 || (_templateObject18 = wanderer_taggedTemplateLiteral(["\"I Voted!\" sticker"])))) ? (0,utils/* clamp */.uZ)(3 - (0,property/* get */.U2)("_voteFreeFights"), 0, 3) : 0) + ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject19 || (_templateObject19 = wanderer_taggedTemplateLiteral(["cursed magnifying glass"])))) ? (0,utils/* clamp */.uZ)(5 - (0,property/* get */.U2)("_voidFreeFights"), 0, 5) : 0) : 0) + (canWander(zone, "backup") && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject20 || (_templateObject20 = wanderer_taggedTemplateLiteral(["backup camera"])))) ? (0,utils/* clamp */.uZ)(11 - (0,property/* get */.U2)("_backUpUses"), 0, 11) : 0);
}

function freeCrafts() {
  return ((0,lib/* have */.lf)((0,template_string/* $skill */.tm)(_templateObject21 || (_templateObject21 = wanderer_taggedTemplateLiteral(["Rapid Prototyping"])))) ? 5 - (0,property/* get */.U2)("_rapidPrototypingUsed") : 0) + ((0,lib/* have */.lf)((0,template_string/* $skill */.tm)(_templateObject22 || (_templateObject22 = wanderer_taggedTemplateLiteral(["Expert Corner-Cutter"])))) ? 5 - (0,property/* get */.U2)("_expertCornerCutterUsed") : 0);
}

var WandererTarget = /*#__PURE__*/function () {
  /**
   * Process for determining where to put a wanderer to extract additional value from it
   * @param name name of this wanderer - for documentation/logging purposes
   * @param available returns whether we can actually use this particular wanderer target
   * @param location returns the location to adventure to target this; null only if something goes wrong
   * @param value the expected additional value of putting a single wanderer-fight into the zone for this
   * @param prepareWanderer attempt to set this up without spending any turns or meat
   * @param prepareTurn attempt to set up, spending meat and or items as necessary
   */
  function WandererTarget(name, available, location, value) {
    var prepareWanderer = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : () => true;
    var prepareTurn = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : () => true;

    _classCallCheck(this, WandererTarget);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "available", void 0);

    _defineProperty(this, "prepareWanderer", void 0);

    _defineProperty(this, "location", void 0);

    _defineProperty(this, "value", void 0);

    _defineProperty(this, "prepareTurn", void 0);

    this.name = name;
    this.available = available;
    this.prepareWanderer = prepareWanderer;
    this.value = value;
    this.location = location;
    this.prepareTurn = prepareTurn;
  }

  _createClass(WandererTarget, [{
    key: "computeCachedValue",
    value: function computeCachedValue() {
      if (this.available() && this.prepareWanderer() && this.location()) {
        return {
          value: this.value(),
          target: this
        };
      }

      return {
        value: 0,
        target: this
      };
    }
  }]);

  return WandererTarget;
}();

function guzzlrAbandonQuest() {
  var location = getLocation();
  var remaningTurns = Math.ceil((100 - (0,property/* get */.U2)("guzzlrDeliveryProgress")) / (10 - (0,property/* get */.U2)("_guzzlrDeliveries")));
  (0,external_kolmafia_.print)("Got guzzlr quest ".concat(getTier(), " at ").concat(getLocation(), " with remaining turns ").concat(remaningTurns));

  if ( // consider abandoning
  !location || // if mafia faled to track the location correctly
  !canAdvOrUnlock(location) || // or the zone is marked as "generally cannot adv"
  src_lib/* globalOptions.ascending */.Xe.ascending && wandererTurnsAvailableToday(location) < remaningTurns // or ascending and not enough turns to finish
  ) {
    (0,external_kolmafia_.print)("Abandoning...");
    abandon();
  }
}

var wandererTargets = [new WandererTarget("Guzzlr", () => have(), () => getLocation(), () => {
  var tier = getTier();
  var progressPerTurn = 100 / (10 - (0,property/* get */.U2)("_guzzlrDeliveries"));

  if (tier) {
    var buckValue = (0,session/* garboValue */.sf)((0,template_string/* $item */.xr)(_templateObject23 || (_templateObject23 = wanderer_taggedTemplateLiteral(["Guzzlrbuck"]))));

    switch (tier) {
      case "bronze":
        return 3 * buckValue / progressPerTurn;

      case "gold":
        return 6 * buckValue / progressPerTurn;

      case "platinum":
        return 21.5 * buckValue / progressPerTurn;
    }
  }

  return -1;
}, () => {
  // try to accept the best possible quest, with the following algorithm:
  // * always prefer 1 plat per day
  // * go for gold if plat unavailable and gold not maxed and bronze is maxed or if both gold and bronze are maxed
  // * go for bronze if plat unavailable and gold is maxed and either gold unavailable or quests are not maxed
  if (isQuestActive()) guzzlrAbandonQuest();

  while (!isQuestActive()) {
    (0,external_kolmafia_.print)("Picking a guzzlr quest");

    if (canPlatinum() && !((0,property/* get */.U2)("garbo_prioritizeCappingGuzzlr", false) && haveFullPlatinumBonus())) {
      acceptPlatinum();
    } else if (canGold() && (haveFullBronzeBonus() || !haveFullGoldBonus())) {
      // if gold is not maxed, do that first since they are limited per day
      acceptGold();
    } else {
      // fall back to bronze when can't plat, can't gold, or bronze is not maxed
      acceptBronze();
    }

    guzzlrAbandonQuest();
  } // return true only if it is safe to try get guzzlr


  return isQuestActive() && getLocation() !== null;
}, () => {
  var guzzlrBooze = getTier() === "platinum" ? getCheapestPlatinumCocktail() : getBooze();

  if (!guzzlrBooze) {
    // this is an error state - accepted a guzzlr quest but mafia doesn't know the booze
    return false;
  }

  if (!(0,lib/* have */.lf)(guzzlrBooze)) {
    var fancy = guzzlrBooze && (0,external_kolmafia_.craftType)(guzzlrBooze).includes("fancy");

    if (guzzlrBooze && (!fancy || fancy && freeCrafts() > 0)) {
      (0,external_kolmafia_.retrieveItem)(guzzlrBooze);
    } else if (guzzlrBooze) {
      (0,external_kolmafia_.buy)(1, guzzlrBooze, WANDERER_PRICE_THRESHOLD);
    }
  }

  return (0,lib/* have */.lf)(guzzlrBooze);
}), new WandererTarget("Coinspiracy", () => (0,src_lib/* realmAvailable */.e6)("spooky") && (0,property/* get */.U2)("lovebugsUnlocked"), () => (0,template_string/* $location */.PG)(_templateObject24 || (_templateObject24 = wanderer_taggedTemplateLiteral(["The Deep Dark Jungle"]))), () => 2 // slightly higher value
), new WandererTarget("Default", () => true, // can always do default
() => (0,template_string/* $location */.PG)(_templateObject25 || (_templateObject25 = wanderer_taggedTemplateLiteral(["The Haunted Kitchen"]))), () => 1 // slightly lower value
)];
function determineDraggableZoneAndEnsureAccess() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "wanderer";
  var sortedTargets = wandererTargets.filter(target => target.available() && target.prepareWanderer()).map(target => target.computeCachedValue()).sort((a, b) => b.value - a.value);
  var best = sortedTargets.find(prospect => {
    var location = prospect.target.location();
    (0,external_kolmafia_.print)("Trying to place a wanderer using ".concat(prospect.target.name), src_lib/* HIGHLIGHT */.X2);
    return location && canWander(location, type) && canAdvOrUnlock(location) && unlock(location) && prospect.target.prepareTurn();
  }) || {
    target: wandererTargets[wandererTargets.length - 1],
    value: 1
  };
  var location = best.target.location() || (0,template_string/* $location */.PG)(_templateObject26 || (_templateObject26 = wanderer_taggedTemplateLiteral(["The Haunted Kitchen"])));
  (0,external_kolmafia_.print)("Wandering ".concat(best.target.name, " at ").concat(best.target.location(), " for expected value ").concat(best.value));
  var choices = unsupportedChoices.get(location);
  if (choices) src_lib/* propertyManager.setChoices */.kr.setChoices(choices);
  return location;
}
var unsupportedChoices = new Map([[(0,template_string/* $location */.PG)(_templateObject27 || (_templateObject27 = wanderer_taggedTemplateLiteral(["The Spooky Forest"]))), (_ref = {}, _defineProperty(_ref, 502, 2), _defineProperty(_ref, 505, 2), _ref)], [(0,template_string/* $location */.PG)(_templateObject28 || (_templateObject28 = wanderer_taggedTemplateLiteral(["Guano Junction"]))), _defineProperty({}, 1427, 1)], [(0,template_string/* $location */.PG)(_templateObject29 || (_templateObject29 = wanderer_taggedTemplateLiteral(["The Hidden Apartment Building"]))), (_ref3 = {}, _defineProperty(_ref3, 780, 6), _defineProperty(_ref3, 1578, 6), _ref3)], [(0,template_string/* $location */.PG)(_templateObject30 || (_templateObject30 = wanderer_taggedTemplateLiteral(["The Black Forest"]))), (_ref4 = {}, _defineProperty(_ref4, 923, 1), _defineProperty(_ref4, 924, 1), _ref4)], [(0,template_string/* $location */.PG)(_templateObject31 || (_templateObject31 = wanderer_taggedTemplateLiteral(["LavaCo\u2122 Lamp Factory"]))), _defineProperty({}, 1091, 9)], [(0,template_string/* $location */.PG)(_templateObject32 || (_templateObject32 = wanderer_taggedTemplateLiteral(["The Haunted Laboratory"]))), _defineProperty({}, 884, 6)], [(0,template_string/* $location */.PG)(_templateObject33 || (_templateObject33 = wanderer_taggedTemplateLiteral(["The Haunted Nursery"]))), _defineProperty({}, 885, 6)], [(0,template_string/* $location */.PG)(_templateObject34 || (_templateObject34 = wanderer_taggedTemplateLiteral(["The Haunted Storage Room"]))), _defineProperty({}, 886, 6)], [(0,template_string/* $location */.PG)(_templateObject35 || (_templateObject35 = wanderer_taggedTemplateLiteral(["The Hidden Park"]))), _defineProperty({}, 789, 6)], [(0,template_string/* $location */.PG)(_templateObject36 || (_templateObject36 = wanderer_taggedTemplateLiteral(["A Mob of Zeppelin Protesters"]))), (_ref10 = {}, _defineProperty(_ref10, 1432, 1), _defineProperty(_ref10, 857, 2), _ref10)], [(0,template_string/* $location */.PG)(_templateObject37 || (_templateObject37 = wanderer_taggedTemplateLiteral(["A-Boo Peak"]))), _defineProperty({}, 1430, 2)], [(0,template_string/* $location */.PG)(_templateObject38 || (_templateObject38 = wanderer_taggedTemplateLiteral(["Sloppy Seconds Diner"]))), _defineProperty({}, 919, 6)], [(0,template_string/* $location */.PG)(_templateObject39 || (_templateObject39 = wanderer_taggedTemplateLiteral(["VYKEA"]))), _defineProperty({}, 1115, 6)], [(0,template_string/* $location */.PG)(_templateObject40 || (_templateObject40 = wanderer_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))), (_ref14 = {}, _defineProperty(_ref14, 670, 4), _defineProperty(_ref14, 671, 4), _defineProperty(_ref14, 672, 1), _ref14)], [(0,template_string/* $location */.PG)(_templateObject41 || (_templateObject41 = wanderer_taggedTemplateLiteral(["The Copperhead Club"]))), _defineProperty({}, 855, 4)]]);

/***/ }),

/***/ 2549:
/***/ ((module) => {

"use strict";
module.exports = require("canadv.ash");

/***/ }),

/***/ 7530:
/***/ ((module) => {

"use strict";
module.exports = require("kolmafia");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(4223);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;