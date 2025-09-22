module.exports = [
"[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ __turbopack_context__.s([
    "__addDisposableResource",
    ()=>__addDisposableResource,
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn",
    ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__disposeResources",
    ()=>__disposeResources,
    "__esDecorate",
    ()=>__esDecorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__propKey",
    ()=>__propKey,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__rewriteRelativeImportExtension",
    ()=>__rewriteRelativeImportExtension,
    "__runInitializers",
    ()=>__runInitializers,
    "__setFunctionName",
    ()=>__setFunctionName,
    "__spread",
    ()=>__spread,
    "__spreadArray",
    ()=>__spreadArray,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
};
}),
"[project]/Downloads/mrpii 2/node_modules/ms/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Helpers.
 */ var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
        return parse(val);
    } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function parse(str) {
    str = String(str);
    if (str.length > 100) {
        return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
        return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch(type){
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;
        case 'weeks':
        case 'week':
        case 'w':
            return n * w;
        case 'days':
        case 'day':
        case 'd':
            return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
        return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
}
/**
 * Pluralization helper.
 */ function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}
}),
"[project]/Downloads/mrpii 2/node_modules/debug/src/common.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/ms/index.js [app-route] (ecmascript)");
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) {
                return;
            }
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== 'string') {
                // Anything else let's inspect with %O
                args.unshift('%O');
            }
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === '%%') {
                    return '%';
                }
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === 'function') {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, 'enabled', {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) {
                    return enableOverride;
                }
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === 'function') {
            createDebug.init(debug);
        }
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === 'string' ? namespaces : '').trim().replace(/\s+/g, ',').split(',').filter(Boolean);
        for (const ns of split){
            if (ns[0] === '-') {
                createDebug.skips.push(ns.slice(1));
            } else {
                createDebug.names.push(ns);
            }
        }
    }
    /**
	 * Checks if the given string matches a namespace template, honoring
	 * asterisks as wildcards.
	 *
	 * @param {String} search
	 * @param {String} template
	 * @return {Boolean}
	 */ function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while(searchIndex < search.length){
            if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
                // Match character or proceed with wildcard
                if (template[templateIndex] === '*') {
                    starIndex = templateIndex;
                    matchIndex = searchIndex;
                    templateIndex++; // Skip the '*'
                } else {
                    searchIndex++;
                    templateIndex++;
                }
            } else if (starIndex !== -1) {
                // Backtrack to the last '*' and try to match more characters
                templateIndex = starIndex + 1;
                matchIndex++;
                searchIndex = matchIndex;
            } else {
                return false; // No match
            }
        }
        // Handle trailing '*' in template
        while(templateIndex < template.length && template[templateIndex] === '*'){
            templateIndex++;
        }
        return templateIndex === template.length;
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names,
            ...createDebug.skips.map((namespace)=>'-' + namespace)
        ].join(',');
        createDebug.enable('');
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        for (const skip of createDebug.skips){
            if (matchesTemplate(name, skip)) {
                return false;
            }
        }
        for (const ns of createDebug.names){
            if (matchesTemplate(name, ns)) {
                return true;
            }
        }
        return false;
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) {
            return val.stack || val.message;
        }
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = setup;
}),
"[project]/Downloads/mrpii 2/node_modules/debug/src/node.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Module dependencies.
 */ const tty = __turbopack_context__.r("[externals]/tty [external] (tty, cjs)");
const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
/**
 * This is the Node.js implementation of `debug()`.
 */ exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(()=>{}, 'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
/**
 * Colors.
 */ exports.colors = [
    6,
    2,
    3,
    4,
    5,
    1
];
try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    const supportsColor = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/supports-color/index.js [app-route] (ecmascript)");
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
        ];
    }
} catch (error) {
// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */ exports.inspectOpts = Object.keys(process.env).filter((key)=>{
    return /^debug_/i.test(key);
}).reduce((obj, key)=>{
    // Camel-case
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k)=>{
        return k.toUpperCase();
    });
    // Coerce string value into JS value
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
    } else if (val === 'null') {
        val = null;
    } else {
        val = Number(val);
    }
    obj[prop] = val;
    return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */ function useColors() {
    return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    const { namespace: name, useColors } = this;
    if (useColors) {
        const c = this.color;
        const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
        const prefix = `  ${colorCode};1m${name} \u001B[0m`;
        args[0] = prefix + args[0].split('\n').join('\n' + prefix);
        args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
    } else {
        args[0] = getDate() + name + ' ' + args[0];
    }
}
function getDate() {
    if (exports.inspectOpts.hideDate) {
        return '';
    }
    return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
 */ function log(...args) {
    return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    if (namespaces) {
        process.env.DEBUG = namespaces;
    } else {
        // If you set a process.env field to null or undefined, it gets cast to the
        // string 'null' or 'undefined'. Just delete instead.
        delete process.env.DEBUG;
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for(let i = 0; i < keys.length; i++){
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
}
module.exports = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/debug/src/common.js [app-route] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split('\n').map((str)=>str.trim()).join(' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
};
}),
"[project]/Downloads/mrpii 2/node_modules/debug/src/browser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
        }
    };
})();
/**
 * Colors.
 */ exports.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
    }
    let m;
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    // eslint-disable-next-line no-return-assign
    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
    if (!this.useColors) {
        return;
    }
    const c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === '%%') {
            return;
        }
        index++;
        if (match === '%c') {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
        }
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    try {
        if (namespaces) {
            exports.storage.setItem('debug', namespaces);
        } else {
            exports.storage.removeItem('debug');
        }
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    let r;
    try {
        r = exports.storage.getItem('debug') || exports.storage.getItem('DEBUG');
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
    }
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
module.exports = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/debug/src/common.js [app-route] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
    }
};
}),
"[project]/Downloads/mrpii 2/node_modules/debug/src/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === 'undefined' || process.type === 'renderer' || ("TURBOPACK compile-time value", false) === true || process.__nwjs) {
    module.exports = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/debug/src/browser.js [app-route] (ecmascript)");
} else {
    module.exports = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/debug/src/node.js [app-route] (ecmascript)");
}
}),
"[project]/Downloads/mrpii 2/node_modules/has-flag/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = (flag, argv = process.argv)=>{
    const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf('--');
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};
}),
"[project]/Downloads/mrpii 2/node_modules/supports-color/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const os = __turbopack_context__.r("[externals]/os [external] (os, cjs)");
const tty = __turbopack_context__.r("[externals]/tty [external] (tty, cjs)");
const hasFlag = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/has-flag/index.js [app-route] (ecmascript)");
const { env } = process;
let forceColor;
if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false') || hasFlag('color=never')) {
    forceColor = 0;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
    forceColor = 1;
}
if ('FORCE_COLOR' in env) {
    if (env.FORCE_COLOR === 'true') {
        forceColor = 1;
    } else if (env.FORCE_COLOR === 'false') {
        forceColor = 0;
    } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
    }
}
function translateLevel(level) {
    if (level === 0) {
        return false;
    }
    return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
    };
}
function supportsColor(haveStream, streamIsTTY) {
    if (forceColor === 0) {
        return 0;
    }
    if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
        return 3;
    }
    if (hasFlag('color=256')) {
        return 2;
    }
    if (haveStream && !streamIsTTY && forceColor === undefined) {
        return 0;
    }
    const min = forceColor || 0;
    if (env.TERM === 'dumb') {
        return min;
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if ('CI' in env) {
        if ([
            'TRAVIS',
            'CIRCLECI',
            'APPVEYOR',
            'GITLAB_CI',
            'GITHUB_ACTIONS',
            'BUILDKITE'
        ].some((sign)=>sign in env) || env.CI_NAME === 'codeship') {
            return 1;
        }
        return min;
    }
    if ('TEAMCITY_VERSION' in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if (env.COLORTERM === 'truecolor') {
        return 3;
    }
    if ('TERM_PROGRAM' in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
        switch(env.TERM_PROGRAM){
            case 'iTerm.app':
                return version >= 3 ? 3 : 2;
            case 'Apple_Terminal':
                return 2;
        }
    }
    if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
    }
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
    }
    if ('COLORTERM' in env) {
        return 1;
    }
    return min;
}
function getSupportLevel(stream) {
    const level = supportsColor(stream, stream && stream.isTTY);
    return translateLevel(level);
}
module.exports = {
    supportsColor: getSupportLevel,
    stdout: translateLevel(supportsColor(true, tty.isatty(1))),
    stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};
}),
"[project]/Downloads/mrpii 2/node_modules/agent-base/dist/helpers.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.req = exports.json = exports.toBuffer = void 0;
const http = __importStar(__turbopack_context__.r("[externals]/http [external] (http, cjs)"));
const https = __importStar(__turbopack_context__.r("[externals]/https [external] (https, cjs)"));
async function toBuffer(stream) {
    let length = 0;
    const chunks = [];
    for await (const chunk of stream){
        length += chunk.length;
        chunks.push(chunk);
    }
    return Buffer.concat(chunks, length);
}
exports.toBuffer = toBuffer;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function json(stream) {
    const buf = await toBuffer(stream);
    const str = buf.toString('utf8');
    try {
        return JSON.parse(str);
    } catch (_err) {
        const err = _err;
        err.message += ` (input: ${str})`;
        throw err;
    }
}
exports.json = json;
function req(url, opts = {}) {
    const href = typeof url === 'string' ? url : url.href;
    const req1 = (href.startsWith('https:') ? https : http).request(url, opts);
    const promise = new Promise((resolve, reject)=>{
        req1.once('response', resolve).once('error', reject).end();
    });
    req1.then = promise.then.bind(promise);
    return req1;
}
exports.req = req; //# sourceMappingURL=helpers.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/agent-base/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Agent = void 0;
const net = __importStar(__turbopack_context__.r("[externals]/net [external] (net, cjs)"));
const http = __importStar(__turbopack_context__.r("[externals]/http [external] (http, cjs)"));
const https_1 = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
__exportStar(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/agent-base/dist/helpers.js [app-route] (ecmascript)"), exports);
const INTERNAL = Symbol('AgentBaseInternalState');
class Agent extends http.Agent {
    constructor(opts){
        super(opts);
        this[INTERNAL] = {};
    }
    /**
     * Determine whether this is an `http` or `https` request.
     */ isSecureEndpoint(options) {
        if (options) {
            // First check the `secureEndpoint` property explicitly, since this
            // means that a parent `Agent` is "passing through" to this instance.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (typeof options.secureEndpoint === 'boolean') {
                return options.secureEndpoint;
            }
            // If no explicit `secure` endpoint, check if `protocol` property is
            // set. This will usually be the case since using a full string URL
            // or `URL` instance should be the most common usage.
            if (typeof options.protocol === 'string') {
                return options.protocol === 'https:';
            }
        }
        // Finally, if no `protocol` property was set, then fall back to
        // checking the stack trace of the current call stack, and try to
        // detect the "https" module.
        const { stack } = new Error();
        if (typeof stack !== 'string') return false;
        return stack.split('\n').some((l)=>l.indexOf('(https.js:') !== -1 || l.indexOf('node:https:') !== -1);
    }
    // In order to support async signatures in `connect()` and Node's native
    // connection pooling in `http.Agent`, the array of sockets for each origin
    // has to be updated synchronously. This is so the length of the array is
    // accurate when `addRequest()` is next called. We achieve this by creating a
    // fake socket and adding it to `sockets[origin]` and incrementing
    // `totalSocketCount`.
    incrementSockets(name) {
        // If `maxSockets` and `maxTotalSockets` are both Infinity then there is no
        // need to create a fake socket because Node.js native connection pooling
        // will never be invoked.
        if (this.maxSockets === Infinity && this.maxTotalSockets === Infinity) {
            return null;
        }
        // All instances of `sockets` are expected TypeScript errors. The
        // alternative is to add it as a private property of this class but that
        // will break TypeScript subclassing.
        if (!this.sockets[name]) {
            // @ts-expect-error `sockets` is readonly in `@types/node`
            this.sockets[name] = [];
        }
        const fakeSocket = new net.Socket({
            writable: false
        });
        this.sockets[name].push(fakeSocket);
        // @ts-expect-error `totalSocketCount` isn't defined in `@types/node`
        this.totalSocketCount++;
        return fakeSocket;
    }
    decrementSockets(name, socket) {
        if (!this.sockets[name] || socket === null) {
            return;
        }
        const sockets = this.sockets[name];
        const index = sockets.indexOf(socket);
        if (index !== -1) {
            sockets.splice(index, 1);
            // @ts-expect-error  `totalSocketCount` isn't defined in `@types/node`
            this.totalSocketCount--;
            if (sockets.length === 0) {
                // @ts-expect-error `sockets` is readonly in `@types/node`
                delete this.sockets[name];
            }
        }
    }
    // In order to properly update the socket pool, we need to call `getName()` on
    // the core `https.Agent` if it is a secureEndpoint.
    getName(options) {
        const secureEndpoint = this.isSecureEndpoint(options);
        if (secureEndpoint) {
            // @ts-expect-error `getName()` isn't defined in `@types/node`
            return https_1.Agent.prototype.getName.call(this, options);
        }
        // @ts-expect-error `getName()` isn't defined in `@types/node`
        return super.getName(options);
    }
    createSocket(req, options, cb) {
        const connectOpts = {
            ...options,
            secureEndpoint: this.isSecureEndpoint(options)
        };
        const name = this.getName(connectOpts);
        const fakeSocket = this.incrementSockets(name);
        Promise.resolve().then(()=>this.connect(req, connectOpts)).then((socket)=>{
            this.decrementSockets(name, fakeSocket);
            if (socket instanceof http.Agent) {
                try {
                    // @ts-expect-error `addRequest()` isn't defined in `@types/node`
                    return socket.addRequest(req, connectOpts);
                } catch (err) {
                    return cb(err);
                }
            }
            this[INTERNAL].currentSocket = socket;
            // @ts-expect-error `createSocket()` isn't defined in `@types/node`
            super.createSocket(req, options, cb);
        }, (err)=>{
            this.decrementSockets(name, fakeSocket);
            cb(err);
        });
    }
    createConnection() {
        const socket = this[INTERNAL].currentSocket;
        this[INTERNAL].currentSocket = undefined;
        if (!socket) {
            throw new Error('No socket was returned in the `connect()` function');
        }
        return socket;
    }
    get defaultPort() {
        return this[INTERNAL].defaultPort ?? (this.protocol === 'https:' ? 443 : 80);
    }
    set defaultPort(v) {
        if (this[INTERNAL]) {
            this[INTERNAL].defaultPort = v;
        }
    }
    get protocol() {
        return this[INTERNAL].protocol ?? (this.isSecureEndpoint() ? 'https:' : 'http:');
    }
    set protocol(v) {
        if (this[INTERNAL]) {
            this[INTERNAL].protocol = v;
        }
    }
}
exports.Agent = Agent; //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/https-proxy-agent/dist/parse-proxy-response.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseProxyResponse = void 0;
const debug_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/debug/src/index.js [app-route] (ecmascript)"));
const debug = (0, debug_1.default)('https-proxy-agent:parse-proxy-response');
function parseProxyResponse(socket) {
    return new Promise((resolve, reject)=>{
        // we need to buffer any HTTP traffic that happens with the proxy before we get
        // the CONNECT response, so that if the response is anything other than an "200"
        // response code, then we can re-play the "data" events on the socket once the
        // HTTP parser is hooked up...
        let buffersLength = 0;
        const buffers = [];
        function read() {
            const b = socket.read();
            if (b) ondata(b);
            else socket.once('readable', read);
        }
        function cleanup() {
            socket.removeListener('end', onend);
            socket.removeListener('error', onerror);
            socket.removeListener('readable', read);
        }
        function onend() {
            cleanup();
            debug('onend');
            reject(new Error('Proxy connection ended before receiving CONNECT response'));
        }
        function onerror(err) {
            cleanup();
            debug('onerror %o', err);
            reject(err);
        }
        function ondata(b) {
            buffers.push(b);
            buffersLength += b.length;
            const buffered = Buffer.concat(buffers, buffersLength);
            const endOfHeaders = buffered.indexOf('\r\n\r\n');
            if (endOfHeaders === -1) {
                // keep buffering
                debug('have not received end of HTTP headers yet...');
                read();
                return;
            }
            const headerParts = buffered.slice(0, endOfHeaders).toString('ascii').split('\r\n');
            const firstLine = headerParts.shift();
            if (!firstLine) {
                socket.destroy();
                return reject(new Error('No header received from proxy CONNECT response'));
            }
            const firstLineParts = firstLine.split(' ');
            const statusCode = +firstLineParts[1];
            const statusText = firstLineParts.slice(2).join(' ');
            const headers = {};
            for (const header of headerParts){
                if (!header) continue;
                const firstColon = header.indexOf(':');
                if (firstColon === -1) {
                    socket.destroy();
                    return reject(new Error(`Invalid header from proxy CONNECT response: "${header}"`));
                }
                const key = header.slice(0, firstColon).toLowerCase();
                const value = header.slice(firstColon + 1).trimStart();
                const current = headers[key];
                if (typeof current === 'string') {
                    headers[key] = [
                        current,
                        value
                    ];
                } else if (Array.isArray(current)) {
                    current.push(value);
                } else {
                    headers[key] = value;
                }
            }
            debug('got proxy server response: %o %o', firstLine, headers);
            cleanup();
            resolve({
                connect: {
                    statusCode,
                    statusText,
                    headers
                },
                buffered
            });
        }
        socket.on('error', onerror);
        socket.on('end', onend);
        read();
    });
}
exports.parseProxyResponse = parseProxyResponse; //# sourceMappingURL=parse-proxy-response.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/https-proxy-agent/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpsProxyAgent = void 0;
const net = __importStar(__turbopack_context__.r("[externals]/net [external] (net, cjs)"));
const tls = __importStar(__turbopack_context__.r("[externals]/tls [external] (tls, cjs)"));
const assert_1 = __importDefault(__turbopack_context__.r("[externals]/assert [external] (assert, cjs)"));
const debug_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/debug/src/index.js [app-route] (ecmascript)"));
const agent_base_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/agent-base/dist/index.js [app-route] (ecmascript)");
const url_1 = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const parse_proxy_response_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/https-proxy-agent/dist/parse-proxy-response.js [app-route] (ecmascript)");
const debug = (0, debug_1.default)('https-proxy-agent');
const setServernameFromNonIpHost = (options)=>{
    if (options.servername === undefined && options.host && !net.isIP(options.host)) {
        return {
            ...options,
            servername: options.host
        };
    }
    return options;
};
/**
 * The `HttpsProxyAgent` implements an HTTP Agent subclass that connects to
 * the specified "HTTP(s) proxy server" in order to proxy HTTPS requests.
 *
 * Outgoing HTTP requests are first tunneled through the proxy server using the
 * `CONNECT` HTTP request method to establish a connection to the proxy server,
 * and then the proxy server connects to the destination target and issues the
 * HTTP request from the proxy server.
 *
 * `https:` requests have their socket connection upgraded to TLS once
 * the connection to the proxy server has been established.
 */ class HttpsProxyAgent extends agent_base_1.Agent {
    constructor(proxy, opts){
        super(opts);
        this.options = {
            path: undefined
        };
        this.proxy = typeof proxy === 'string' ? new url_1.URL(proxy) : proxy;
        this.proxyHeaders = opts?.headers ?? {};
        debug('Creating new HttpsProxyAgent instance: %o', this.proxy.href);
        // Trim off the brackets from IPv6 addresses
        const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, '');
        const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === 'https:' ? 443 : 80;
        this.connectOpts = {
            // Attempt to negotiate http/1.1 for proxy servers that support http/2
            ALPNProtocols: [
                'http/1.1'
            ],
            ...opts ? omit(opts, 'headers') : null,
            host,
            port
        };
    }
    /**
     * Called when the node-core HTTP client library is creating a
     * new HTTP request.
     */ async connect(req, opts) {
        const { proxy } = this;
        if (!opts.host) {
            throw new TypeError('No "host" provided');
        }
        // Create a socket connection to the proxy server.
        let socket;
        if (proxy.protocol === 'https:') {
            debug('Creating `tls.Socket`: %o', this.connectOpts);
            socket = tls.connect(setServernameFromNonIpHost(this.connectOpts));
        } else {
            debug('Creating `net.Socket`: %o', this.connectOpts);
            socket = net.connect(this.connectOpts);
        }
        const headers = typeof this.proxyHeaders === 'function' ? this.proxyHeaders() : {
            ...this.proxyHeaders
        };
        const host = net.isIPv6(opts.host) ? `[${opts.host}]` : opts.host;
        let payload = `CONNECT ${host}:${opts.port} HTTP/1.1\r\n`;
        // Inject the `Proxy-Authorization` header if necessary.
        if (proxy.username || proxy.password) {
            const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
            headers['Proxy-Authorization'] = `Basic ${Buffer.from(auth).toString('base64')}`;
        }
        headers.Host = `${host}:${opts.port}`;
        if (!headers['Proxy-Connection']) {
            headers['Proxy-Connection'] = this.keepAlive ? 'Keep-Alive' : 'close';
        }
        for (const name of Object.keys(headers)){
            payload += `${name}: ${headers[name]}\r\n`;
        }
        const proxyResponsePromise = (0, parse_proxy_response_1.parseProxyResponse)(socket);
        socket.write(`${payload}\r\n`);
        const { connect, buffered } = await proxyResponsePromise;
        req.emit('proxyConnect', connect);
        this.emit('proxyConnect', connect, req);
        if (connect.statusCode === 200) {
            req.once('socket', resume);
            if (opts.secureEndpoint) {
                // The proxy is connecting to a TLS server, so upgrade
                // this socket connection to a TLS connection.
                debug('Upgrading socket connection to TLS');
                return tls.connect({
                    ...omit(setServernameFromNonIpHost(opts), 'host', 'path', 'port'),
                    socket
                });
            }
            return socket;
        }
        // Some other status code that's not 200... need to re-play the HTTP
        // header "data" events onto the socket once the HTTP machinery is
        // attached so that the node core `http` can parse and handle the
        // error status code.
        // Close the original socket, and a new "fake" socket is returned
        // instead, so that the proxy doesn't get the HTTP request
        // written to it (which may contain `Authorization` headers or other
        // sensitive data).
        //
        // See: https://hackerone.com/reports/541502
        socket.destroy();
        const fakeSocket = new net.Socket({
            writable: false
        });
        fakeSocket.readable = true;
        // Need to wait for the "socket" event to re-play the "data" events.
        req.once('socket', (s)=>{
            debug('Replaying proxy buffer for failed request');
            (0, assert_1.default)(s.listenerCount('data') > 0);
            // Replay the "buffered" Buffer onto the fake `socket`, since at
            // this point the HTTP module machinery has been hooked up for
            // the user.
            s.push(buffered);
            s.push(null);
        });
        return fakeSocket;
    }
}
HttpsProxyAgent.protocols = [
    'http',
    'https'
];
exports.HttpsProxyAgent = HttpsProxyAgent;
function resume(socket) {
    socket.resume();
}
function omit(obj, ...keys) {
    const ret = {};
    let key;
    for(key in obj){
        if (!keys.includes(key)) {
            ret[key] = obj[key];
        }
    }
    return ret;
} //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/http-proxy-agent/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpProxyAgent = void 0;
const net = __importStar(__turbopack_context__.r("[externals]/net [external] (net, cjs)"));
const tls = __importStar(__turbopack_context__.r("[externals]/tls [external] (tls, cjs)"));
const debug_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/debug/src/index.js [app-route] (ecmascript)"));
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const agent_base_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/agent-base/dist/index.js [app-route] (ecmascript)");
const url_1 = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const debug = (0, debug_1.default)('http-proxy-agent');
/**
 * The `HttpProxyAgent` implements an HTTP Agent subclass that connects
 * to the specified "HTTP proxy server" in order to proxy HTTP requests.
 */ class HttpProxyAgent extends agent_base_1.Agent {
    constructor(proxy, opts){
        super(opts);
        this.proxy = typeof proxy === 'string' ? new url_1.URL(proxy) : proxy;
        this.proxyHeaders = opts?.headers ?? {};
        debug('Creating new HttpProxyAgent instance: %o', this.proxy.href);
        // Trim off the brackets from IPv6 addresses
        const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, '');
        const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === 'https:' ? 443 : 80;
        this.connectOpts = {
            ...opts ? omit(opts, 'headers') : null,
            host,
            port
        };
    }
    addRequest(req, opts) {
        req._header = null;
        this.setRequestProps(req, opts);
        // @ts-expect-error `addRequest()` isn't defined in `@types/node`
        super.addRequest(req, opts);
    }
    setRequestProps(req, opts) {
        const { proxy } = this;
        const protocol = opts.secureEndpoint ? 'https:' : 'http:';
        const hostname = req.getHeader('host') || 'localhost';
        const base = `${protocol}//${hostname}`;
        const url = new url_1.URL(req.path, base);
        if (opts.port !== 80) {
            url.port = String(opts.port);
        }
        // Change the `http.ClientRequest` instance's "path" field
        // to the absolute path of the URL that will be requested.
        req.path = String(url);
        // Inject the `Proxy-Authorization` header if necessary.
        const headers = typeof this.proxyHeaders === 'function' ? this.proxyHeaders() : {
            ...this.proxyHeaders
        };
        if (proxy.username || proxy.password) {
            const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
            headers['Proxy-Authorization'] = `Basic ${Buffer.from(auth).toString('base64')}`;
        }
        if (!headers['Proxy-Connection']) {
            headers['Proxy-Connection'] = this.keepAlive ? 'Keep-Alive' : 'close';
        }
        for (const name of Object.keys(headers)){
            const value = headers[name];
            if (value) {
                req.setHeader(name, value);
            }
        }
    }
    async connect(req, opts) {
        req._header = null;
        if (!req.path.includes('://')) {
            this.setRequestProps(req, opts);
        }
        // At this point, the http ClientRequest's internal `_header` field
        // might have already been set. If this is the case then we'll need
        // to re-generate the string since we just changed the `req.path`.
        let first;
        let endOfHeaders;
        debug('Regenerating stored HTTP header string for request');
        req._implicitHeader();
        if (req.outputData && req.outputData.length > 0) {
            debug('Patching connection write() output buffer with updated header');
            first = req.outputData[0].data;
            endOfHeaders = first.indexOf('\r\n\r\n') + 4;
            req.outputData[0].data = req._header + first.substring(endOfHeaders);
            debug('Output buffer: %o', req.outputData[0].data);
        }
        // Create a socket connection to the proxy server.
        let socket;
        if (this.proxy.protocol === 'https:') {
            debug('Creating `tls.Socket`: %o', this.connectOpts);
            socket = tls.connect(this.connectOpts);
        } else {
            debug('Creating `net.Socket`: %o', this.connectOpts);
            socket = net.connect(this.connectOpts);
        }
        // Wait for the socket's `connect` event, so that this `callback()`
        // function throws instead of the `http` request machinery. This is
        // important for i.e. `PacProxyAgent` which determines a failed proxy
        // connection via the `callback()` function throwing.
        await (0, events_1.once)(socket, 'connect');
        return socket;
    }
}
HttpProxyAgent.protocols = [
    'http',
    'https'
];
exports.HttpProxyAgent = HttpProxyAgent;
function omit(obj, ...keys) {
    const ret = {};
    let key;
    for(key in obj){
        if (!keys.includes(key)) {
            ret[key] = obj[key];
        }
    }
    return ret;
} //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/pipeline.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createEmptyPipeline = createEmptyPipeline;
const ts_http_runtime_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/index.js [app-route] (ecmascript)");
/**
 * Creates a totally empty pipeline.
 * Useful for testing or creating a custom one.
 */ function createEmptyPipeline() {
    return (0, ts_http_runtime_1.createEmptyPipeline)();
} //# sourceMappingURL=pipeline.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/log.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logger = void 0;
const logger_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/logger/dist/commonjs/index.js [app-route] (ecmascript)");
exports.logger = (0, logger_1.createClientLogger)("core-rest-pipeline"); //# sourceMappingURL=log.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/logPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logPolicyName = void 0;
exports.logPolicy = logPolicy;
const log_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/log.js [app-route] (ecmascript)");
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the logPolicy.
 */ exports.logPolicyName = policies_1.logPolicyName;
/**
 * A policy that logs all requests and responses.
 * @param options - Options to configure logPolicy.
 */ function logPolicy(options = {}) {
    return (0, policies_1.logPolicy)({
        logger: log_js_1.logger.info,
        ...options
    });
} //# sourceMappingURL=logPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/redirectPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.redirectPolicyName = void 0;
exports.redirectPolicy = redirectPolicy;
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the redirectPolicy.
 */ exports.redirectPolicyName = policies_1.redirectPolicyName;
/**
 * A policy to follow Location headers from the server in order
 * to support server-side redirection.
 * In the browser, this policy is not used.
 * @param options - Options to control policy behavior.
 */ function redirectPolicy(options = {}) {
    return (0, policies_1.redirectPolicy)(options);
} //# sourceMappingURL=redirectPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/userAgentPlatform.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHeaderName = getHeaderName;
exports.setPlatformSpecificData = setPlatformSpecificData;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
const node_os_1 = tslib_1.__importDefault(__turbopack_context__.r("[externals]/node:os [external] (node:os, cjs)"));
const node_process_1 = tslib_1.__importDefault(__turbopack_context__.r("[externals]/node:process [external] (node:process, cjs)"));
/**
 * @internal
 */ function getHeaderName() {
    return "User-Agent";
}
/**
 * @internal
 */ async function setPlatformSpecificData(map) {
    if (node_process_1.default && node_process_1.default.versions) {
        const versions = node_process_1.default.versions;
        if (versions.bun) {
            map.set("Bun", versions.bun);
        } else if (versions.deno) {
            map.set("Deno", versions.deno);
        } else if (versions.node) {
            map.set("Node", versions.node);
        }
    }
    map.set("OS", `(${node_os_1.default.arch()}-${node_os_1.default.type()}-${node_os_1.default.release()})`);
} //# sourceMappingURL=userAgentPlatform.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/constants.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_RETRY_POLICY_COUNT = exports.SDK_VERSION = void 0;
exports.SDK_VERSION = "1.22.1";
exports.DEFAULT_RETRY_POLICY_COUNT = 3; //# sourceMappingURL=constants.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/userAgent.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserAgentHeaderName = getUserAgentHeaderName;
exports.getUserAgentValue = getUserAgentValue;
const userAgentPlatform_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/userAgentPlatform.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/constants.js [app-route] (ecmascript)");
function getUserAgentString(telemetryInfo) {
    const parts = [];
    for (const [key, value] of telemetryInfo){
        const token = value ? `${key}/${value}` : key;
        parts.push(token);
    }
    return parts.join(" ");
}
/**
 * @internal
 */ function getUserAgentHeaderName() {
    return (0, userAgentPlatform_js_1.getHeaderName)();
}
/**
 * @internal
 */ async function getUserAgentValue(prefix) {
    const runtimeInfo = new Map();
    runtimeInfo.set("core-rest-pipeline", constants_js_1.SDK_VERSION);
    await (0, userAgentPlatform_js_1.setPlatformSpecificData)(runtimeInfo);
    const defaultAgent = getUserAgentString(runtimeInfo);
    const userAgentValue = prefix ? `${prefix} ${defaultAgent}` : defaultAgent;
    return userAgentValue;
} //# sourceMappingURL=userAgent.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/userAgentPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userAgentPolicyName = void 0;
exports.userAgentPolicy = userAgentPolicy;
const userAgent_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/userAgent.js [app-route] (ecmascript)");
const UserAgentHeaderName = (0, userAgent_js_1.getUserAgentHeaderName)();
/**
 * The programmatic identifier of the userAgentPolicy.
 */ exports.userAgentPolicyName = "userAgentPolicy";
/**
 * A policy that sets the User-Agent header (or equivalent) to reflect
 * the library version.
 * @param options - Options to customize the user agent value.
 */ function userAgentPolicy(options = {}) {
    const userAgentValue = (0, userAgent_js_1.getUserAgentValue)(options.userAgentPrefix);
    return {
        name: exports.userAgentPolicyName,
        async sendRequest (request, next) {
            if (!request.headers.has(UserAgentHeaderName)) {
                request.headers.set(UserAgentHeaderName, await userAgentValue);
            }
            return next(request);
        }
    };
} //# sourceMappingURL=userAgentPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/file.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasRawContent = hasRawContent;
exports.getRawContent = getRawContent;
exports.createFileFromStream = createFileFromStream;
exports.createFile = createFile;
const core_util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)");
function isNodeReadableStream(x) {
    return Boolean(x && typeof x["pipe"] === "function");
}
const unimplementedMethods = {
    arrayBuffer: ()=>{
        throw new Error("Not implemented");
    },
    bytes: ()=>{
        throw new Error("Not implemented");
    },
    slice: ()=>{
        throw new Error("Not implemented");
    },
    text: ()=>{
        throw new Error("Not implemented");
    }
};
/**
 * Private symbol used as key on objects created using createFile containing the
 * original source of the file object.
 *
 * This is used in Node to access the original Node stream without using Blob#stream, which
 * returns a web stream. This is done to avoid a couple of bugs to do with Blob#stream and
 * Readable#to/fromWeb in Node versions we support:
 * - https://github.com/nodejs/node/issues/42694 (fixed in Node 18.14)
 * - https://github.com/nodejs/node/issues/48916 (fixed in Node 20.6)
 *
 * Once these versions are no longer supported, we may be able to stop doing this.
 *
 * @internal
 */ const rawContent = Symbol("rawContent");
/**
 * Type guard to check if a given object is a blob-like object with a raw content property.
 */ function hasRawContent(x) {
    return typeof x[rawContent] === "function";
}
/**
 * Extract the raw content from a given blob-like object. If the input was created using createFile
 * or createFileFromStream, the exact content passed into createFile/createFileFromStream will be used.
 * For true instances of Blob and File, returns the actual blob.
 *
 * @internal
 */ function getRawContent(blob) {
    if (hasRawContent(blob)) {
        return blob[rawContent]();
    } else {
        return blob;
    }
}
/**
 * Create an object that implements the File interface. This object is intended to be
 * passed into RequestBodyType.formData, and is not guaranteed to work as expected in
 * other situations.
 *
 * Use this function to:
 * - Create a File object for use in RequestBodyType.formData in environments where the
 *   global File object is unavailable.
 * - Create a File-like object from a readable stream without reading the stream into memory.
 *
 * @param stream - the content of the file as a callback returning a stream. When a File object made using createFile is
 *                  passed in a request's form data map, the stream will not be read into memory
 *                  and instead will be streamed when the request is made. In the event of a retry, the
 *                  stream needs to be read again, so this callback SHOULD return a fresh stream if possible.
 * @param name - the name of the file.
 * @param options - optional metadata about the file, e.g. file name, file size, MIME type.
 */ function createFileFromStream(stream, name, options = {}) {
    return {
        ...unimplementedMethods,
        type: options.type ?? "",
        lastModified: options.lastModified ?? new Date().getTime(),
        webkitRelativePath: options.webkitRelativePath ?? "",
        size: options.size ?? -1,
        name,
        stream: ()=>{
            const s = stream();
            if (isNodeReadableStream(s)) {
                throw new Error("Not supported: a Node stream was provided as input to createFileFromStream.");
            }
            return s;
        },
        [rawContent]: stream
    };
}
/**
 * Create an object that implements the File interface. This object is intended to be
 * passed into RequestBodyType.formData, and is not guaranteed to work as expected in
 * other situations.
 *
 * Use this function create a File object for use in RequestBodyType.formData in environments where the global File object is unavailable.
 *
 * @param content - the content of the file as a Uint8Array in memory.
 * @param name - the name of the file.
 * @param options - optional metadata about the file, e.g. file name, file size, MIME type.
 */ function createFile(content, name, options = {}) {
    if (core_util_1.isNodeLike) {
        return {
            ...unimplementedMethods,
            type: options.type ?? "",
            lastModified: options.lastModified ?? new Date().getTime(),
            webkitRelativePath: options.webkitRelativePath ?? "",
            size: content.byteLength,
            name,
            arrayBuffer: async ()=>content.buffer,
            stream: ()=>new Blob([
                    content
                ]).stream(),
            [rawContent]: ()=>content
        };
    } else {
        return new File([
            content
        ], name, options);
    }
} //# sourceMappingURL=file.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/multipartPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.multipartPolicyName = void 0;
exports.multipartPolicy = multipartPolicy;
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
const file_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/file.js [app-route] (ecmascript)");
/**
 * Name of multipart policy
 */ exports.multipartPolicyName = policies_1.multipartPolicyName;
/**
 * Pipeline policy for multipart requests
 */ function multipartPolicy() {
    const tspPolicy = (0, policies_1.multipartPolicy)();
    return {
        name: exports.multipartPolicyName,
        sendRequest: async (request, next)=>{
            if (request.multipartBody) {
                for (const part of request.multipartBody.parts){
                    if ((0, file_js_1.hasRawContent)(part.body)) {
                        part.body = (0, file_js_1.getRawContent)(part.body);
                    }
                }
            }
            return tspPolicy.sendRequest(request, next);
        }
    };
} //# sourceMappingURL=multipartPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/decompressResponsePolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decompressResponsePolicyName = void 0;
exports.decompressResponsePolicy = decompressResponsePolicy;
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the decompressResponsePolicy.
 */ exports.decompressResponsePolicyName = policies_1.decompressResponsePolicyName;
/**
 * A policy to enable response decompression according to Accept-Encoding header
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
 */ function decompressResponsePolicy() {
    return (0, policies_1.decompressResponsePolicy)();
} //# sourceMappingURL=decompressResponsePolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/defaultRetryPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultRetryPolicyName = void 0;
exports.defaultRetryPolicy = defaultRetryPolicy;
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
/**
 * Name of the {@link defaultRetryPolicy}
 */ exports.defaultRetryPolicyName = policies_1.defaultRetryPolicyName;
/**
 * A policy that retries according to three strategies:
 * - When the server sends a 429 response with a Retry-After header.
 * - When there are errors in the underlying transport layer (e.g. DNS lookup failures).
 * - Or otherwise if the outgoing request fails, it will retry with an exponentially increasing delay.
 */ function defaultRetryPolicy(options = {}) {
    return (0, policies_1.defaultRetryPolicy)(options);
} //# sourceMappingURL=defaultRetryPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/formDataPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formDataPolicyName = void 0;
exports.formDataPolicy = formDataPolicy;
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the formDataPolicy.
 */ exports.formDataPolicyName = policies_1.formDataPolicyName;
/**
 * A policy that encodes FormData on the request into the body.
 */ function formDataPolicy() {
    return (0, policies_1.formDataPolicy)();
} //# sourceMappingURL=formDataPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/proxyPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.proxyPolicyName = void 0;
exports.getDefaultProxySettings = getDefaultProxySettings;
exports.proxyPolicy = proxyPolicy;
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the proxyPolicy.
 */ exports.proxyPolicyName = policies_1.proxyPolicyName;
/**
 * This method converts a proxy url into `ProxySettings` for use with ProxyPolicy.
 * If no argument is given, it attempts to parse a proxy URL from the environment
 * variables `HTTPS_PROXY` or `HTTP_PROXY`.
 * @param proxyUrl - The url of the proxy to use. May contain authentication information.
 * @deprecated - Internally this method is no longer necessary when setting proxy information.
 */ function getDefaultProxySettings(proxyUrl) {
    return (0, policies_1.getDefaultProxySettings)(proxyUrl);
}
/**
 * A policy that allows one to apply proxy settings to all requests.
 * If not passed static settings, they will be retrieved from the HTTPS_PROXY
 * or HTTP_PROXY environment variables.
 * @param proxySettings - ProxySettings to use on each request.
 * @param options - additional settings, for example, custom NO_PROXY patterns
 */ function proxyPolicy(proxySettings, options) {
    return (0, policies_1.proxyPolicy)(proxySettings, options);
} //# sourceMappingURL=proxyPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/setClientRequestIdPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setClientRequestIdPolicyName = void 0;
exports.setClientRequestIdPolicy = setClientRequestIdPolicy;
/**
 * The programmatic identifier of the setClientRequestIdPolicy.
 */ exports.setClientRequestIdPolicyName = "setClientRequestIdPolicy";
/**
 * Each PipelineRequest gets a unique id upon creation.
 * This policy passes that unique id along via an HTTP header to enable better
 * telemetry and tracing.
 * @param requestIdHeaderName - The name of the header to pass the request ID to.
 */ function setClientRequestIdPolicy(requestIdHeaderName = "x-ms-client-request-id") {
    return {
        name: exports.setClientRequestIdPolicyName,
        async sendRequest (request, next) {
            if (!request.headers.has(requestIdHeaderName)) {
                request.headers.set(requestIdHeaderName, request.requestId);
            }
            return next(request);
        }
    };
} //# sourceMappingURL=setClientRequestIdPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/agentPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.agentPolicyName = void 0;
exports.agentPolicy = agentPolicy;
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
/**
 * Name of the Agent Policy
 */ exports.agentPolicyName = policies_1.agentPolicyName;
/**
 * Gets a pipeline policy that sets http.agent
 */ function agentPolicy(agent) {
    return (0, policies_1.agentPolicy)(agent);
} //# sourceMappingURL=agentPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/tlsPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tlsPolicyName = void 0;
exports.tlsPolicy = tlsPolicy;
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
/**
 * Name of the TLS Policy
 */ exports.tlsPolicyName = policies_1.tlsPolicyName;
/**
 * Gets a pipeline policy that adds the client certificate to the HttpClient agent for authentication.
 */ function tlsPolicy(tlsSettings) {
    return (0, policies_1.tlsPolicy)(tlsSettings);
} //# sourceMappingURL=tlsPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/restError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RestError = void 0;
exports.isRestError = isRestError;
const ts_http_runtime_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/index.js [app-route] (ecmascript)");
/**
 * A custom error type for failed pipeline requests.
 */ // eslint-disable-next-line @typescript-eslint/no-redeclare
exports.RestError = ts_http_runtime_1.RestError;
/**
 * Typeguard for RestError
 * @param e - Something caught by a catch clause.
 */ function isRestError(e) {
    return (0, ts_http_runtime_1.isRestError)(e);
} //# sourceMappingURL=restError.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/tracingPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tracingPolicyName = void 0;
exports.tracingPolicy = tracingPolicy;
const core_tracing_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/index.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/constants.js [app-route] (ecmascript)");
const userAgent_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/userAgent.js [app-route] (ecmascript)");
const log_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/log.js [app-route] (ecmascript)");
const core_util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)");
const restError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/restError.js [app-route] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/internal.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the tracingPolicy.
 */ exports.tracingPolicyName = "tracingPolicy";
/**
 * A simple policy to create OpenTelemetry Spans for each request made by the pipeline
 * that has SpanOptions with a parent.
 * Requests made without a parent Span will not be recorded.
 * @param options - Options to configure the telemetry logged by the tracing policy.
 */ function tracingPolicy(options = {}) {
    const userAgentPromise = (0, userAgent_js_1.getUserAgentValue)(options.userAgentPrefix);
    const sanitizer = new util_1.Sanitizer({
        additionalAllowedQueryParameters: options.additionalAllowedQueryParameters
    });
    const tracingClient = tryCreateTracingClient();
    return {
        name: exports.tracingPolicyName,
        async sendRequest (request, next) {
            if (!tracingClient) {
                return next(request);
            }
            const userAgent = await userAgentPromise;
            const spanAttributes = {
                "http.url": sanitizer.sanitizeUrl(request.url),
                "http.method": request.method,
                "http.user_agent": userAgent,
                requestId: request.requestId
            };
            if (userAgent) {
                spanAttributes["http.user_agent"] = userAgent;
            }
            const { span, tracingContext } = tryCreateSpan(tracingClient, request, spanAttributes) ?? {};
            if (!span || !tracingContext) {
                return next(request);
            }
            try {
                const response = await tracingClient.withContext(tracingContext, next, request);
                tryProcessResponse(span, response);
                return response;
            } catch (err) {
                tryProcessError(span, err);
                throw err;
            }
        }
    };
}
function tryCreateTracingClient() {
    try {
        return (0, core_tracing_1.createTracingClient)({
            namespace: "",
            packageName: "@azure/core-rest-pipeline",
            packageVersion: constants_js_1.SDK_VERSION
        });
    } catch (e) {
        log_js_1.logger.warning(`Error when creating the TracingClient: ${(0, core_util_1.getErrorMessage)(e)}`);
        return undefined;
    }
}
function tryCreateSpan(tracingClient, request, spanAttributes) {
    try {
        // As per spec, we do not need to differentiate between HTTP and HTTPS in span name.
        const { span, updatedOptions } = tracingClient.startSpan(`HTTP ${request.method}`, {
            tracingOptions: request.tracingOptions
        }, {
            spanKind: "client",
            spanAttributes
        });
        // If the span is not recording, don't do any more work.
        if (!span.isRecording()) {
            span.end();
            return undefined;
        }
        // set headers
        const headers = tracingClient.createRequestHeaders(updatedOptions.tracingOptions.tracingContext);
        for (const [key, value] of Object.entries(headers)){
            request.headers.set(key, value);
        }
        return {
            span,
            tracingContext: updatedOptions.tracingOptions.tracingContext
        };
    } catch (e) {
        log_js_1.logger.warning(`Skipping creating a tracing span due to an error: ${(0, core_util_1.getErrorMessage)(e)}`);
        return undefined;
    }
}
function tryProcessError(span, error) {
    try {
        span.setStatus({
            status: "error",
            error: (0, core_util_1.isError)(error) ? error : undefined
        });
        if ((0, restError_js_1.isRestError)(error) && error.statusCode) {
            span.setAttribute("http.status_code", error.statusCode);
        }
        span.end();
    } catch (e) {
        log_js_1.logger.warning(`Skipping tracing span processing due to an error: ${(0, core_util_1.getErrorMessage)(e)}`);
    }
}
function tryProcessResponse(span, response) {
    try {
        span.setAttribute("http.status_code", response.status);
        const serviceRequestId = response.headers.get("x-ms-request-id");
        if (serviceRequestId) {
            span.setAttribute("serviceRequestId", serviceRequestId);
        }
        // Per semantic conventions, only set the status to error if the status code is 4xx or 5xx.
        // Otherwise, the status MUST remain unset.
        // https://opentelemetry.io/docs/specs/semconv/http/http-spans/#status
        if (response.status >= 400) {
            span.setStatus({
                status: "error"
            });
        }
        span.end();
    } catch (e) {
        log_js_1.logger.warning(`Skipping tracing span processing due to an error: ${(0, core_util_1.getErrorMessage)(e)}`);
    }
} //# sourceMappingURL=tracingPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/wrapAbortSignal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wrapAbortSignalLike = wrapAbortSignalLike;
/**
 * Creates a native AbortSignal which reflects the state of the provided AbortSignalLike.
 * If the AbortSignalLike is already a native AbortSignal, it is returned as is.
 * @param abortSignalLike - The AbortSignalLike to wrap.
 * @returns - An object containing the native AbortSignal and an optional cleanup function. The cleanup function should be called when the AbortSignal is no longer needed.
 */ function wrapAbortSignalLike(abortSignalLike) {
    if (abortSignalLike instanceof AbortSignal) {
        return {
            abortSignal: abortSignalLike
        };
    }
    if (abortSignalLike.aborted) {
        return {
            abortSignal: AbortSignal.abort(abortSignalLike.reason)
        };
    }
    const controller = new AbortController();
    let needsCleanup = true;
    function cleanup() {
        if (needsCleanup) {
            abortSignalLike.removeEventListener("abort", listener);
            needsCleanup = false;
        }
    }
    function listener() {
        controller.abort(abortSignalLike.reason);
        cleanup();
    }
    abortSignalLike.addEventListener("abort", listener);
    return {
        abortSignal: controller.signal,
        cleanup
    };
} //# sourceMappingURL=wrapAbortSignal.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/wrapAbortSignalLikePolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wrapAbortSignalLikePolicyName = void 0;
exports.wrapAbortSignalLikePolicy = wrapAbortSignalLikePolicy;
const wrapAbortSignal_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/wrapAbortSignal.js [app-route] (ecmascript)");
exports.wrapAbortSignalLikePolicyName = "wrapAbortSignalLikePolicy";
/**
 * Policy that ensure that any AbortSignalLike is wrapped in a native AbortSignal for processing by the pipeline.
 * Since the ts-http-runtime expects a native AbortSignal, this policy is used to ensure that any AbortSignalLike is wrapped in a native AbortSignal.
 *
 * @returns - created policy
 */ function wrapAbortSignalLikePolicy() {
    return {
        name: exports.wrapAbortSignalLikePolicyName,
        sendRequest: async (request, next)=>{
            if (!request.abortSignal) {
                return next(request);
            }
            const { abortSignal, cleanup } = (0, wrapAbortSignal_js_1.wrapAbortSignalLike)(request.abortSignal);
            // eslint-disable-next-line no-param-reassign
            request.abortSignal = abortSignal;
            try {
                return await next(request);
            } finally{
                cleanup?.();
            }
        }
    };
} //# sourceMappingURL=wrapAbortSignalLikePolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/createPipelineFromOptions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPipelineFromOptions = createPipelineFromOptions;
const logPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/logPolicy.js [app-route] (ecmascript)");
const pipeline_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/pipeline.js [app-route] (ecmascript)");
const redirectPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/redirectPolicy.js [app-route] (ecmascript)");
const userAgentPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/userAgentPolicy.js [app-route] (ecmascript)");
const multipartPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/multipartPolicy.js [app-route] (ecmascript)");
const decompressResponsePolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/decompressResponsePolicy.js [app-route] (ecmascript)");
const defaultRetryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/defaultRetryPolicy.js [app-route] (ecmascript)");
const formDataPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/formDataPolicy.js [app-route] (ecmascript)");
const core_util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)");
const proxyPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/proxyPolicy.js [app-route] (ecmascript)");
const setClientRequestIdPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/setClientRequestIdPolicy.js [app-route] (ecmascript)");
const agentPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/agentPolicy.js [app-route] (ecmascript)");
const tlsPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/tlsPolicy.js [app-route] (ecmascript)");
const tracingPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/tracingPolicy.js [app-route] (ecmascript)");
const wrapAbortSignalLikePolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/wrapAbortSignalLikePolicy.js [app-route] (ecmascript)");
/**
 * Create a new pipeline with a default set of customizable policies.
 * @param options - Options to configure a custom pipeline.
 */ function createPipelineFromOptions(options) {
    const pipeline = (0, pipeline_js_1.createEmptyPipeline)();
    if (core_util_1.isNodeLike) {
        if (options.agent) {
            pipeline.addPolicy((0, agentPolicy_js_1.agentPolicy)(options.agent));
        }
        if (options.tlsOptions) {
            pipeline.addPolicy((0, tlsPolicy_js_1.tlsPolicy)(options.tlsOptions));
        }
        pipeline.addPolicy((0, proxyPolicy_js_1.proxyPolicy)(options.proxyOptions));
        pipeline.addPolicy((0, decompressResponsePolicy_js_1.decompressResponsePolicy)());
    }
    pipeline.addPolicy((0, wrapAbortSignalLikePolicy_js_1.wrapAbortSignalLikePolicy)());
    pipeline.addPolicy((0, formDataPolicy_js_1.formDataPolicy)(), {
        beforePolicies: [
            multipartPolicy_js_1.multipartPolicyName
        ]
    });
    pipeline.addPolicy((0, userAgentPolicy_js_1.userAgentPolicy)(options.userAgentOptions));
    pipeline.addPolicy((0, setClientRequestIdPolicy_js_1.setClientRequestIdPolicy)(options.telemetryOptions?.clientRequestIdHeaderName));
    // The multipart policy is added after policies with no phase, so that
    // policies can be added between it and formDataPolicy to modify
    // properties (e.g., making the boundary constant in recorded tests).
    pipeline.addPolicy((0, multipartPolicy_js_1.multipartPolicy)(), {
        afterPhase: "Deserialize"
    });
    pipeline.addPolicy((0, defaultRetryPolicy_js_1.defaultRetryPolicy)(options.retryOptions), {
        phase: "Retry"
    });
    pipeline.addPolicy((0, tracingPolicy_js_1.tracingPolicy)({
        ...options.userAgentOptions,
        ...options.loggingOptions
    }), {
        afterPhase: "Retry"
    });
    if (core_util_1.isNodeLike) {
        // Both XHR and Fetch expect to handle redirects automatically,
        // so only include this policy when we're in Node.
        pipeline.addPolicy((0, redirectPolicy_js_1.redirectPolicy)(options.redirectOptions), {
            afterPhase: "Retry"
        });
    }
    pipeline.addPolicy((0, logPolicy_js_1.logPolicy)(options.loggingOptions), {
        afterPhase: "Sign"
    });
    return pipeline;
} //# sourceMappingURL=createPipelineFromOptions.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/defaultHttpClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDefaultHttpClient = createDefaultHttpClient;
const ts_http_runtime_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/index.js [app-route] (ecmascript)");
const wrapAbortSignal_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/wrapAbortSignal.js [app-route] (ecmascript)");
/**
 * Create the correct HttpClient for the current environment.
 */ function createDefaultHttpClient() {
    const client = (0, ts_http_runtime_1.createDefaultHttpClient)();
    return {
        async sendRequest (request) {
            // we wrap any AbortSignalLike here since the TypeSpec runtime expects a native AbortSignal.
            // 99% of the time, this should be a no-op since a native AbortSignal is passed in.
            const { abortSignal, cleanup } = request.abortSignal ? (0, wrapAbortSignal_js_1.wrapAbortSignalLike)(request.abortSignal) : {};
            try {
                // eslint-disable-next-line no-param-reassign
                request.abortSignal = abortSignal;
                return await client.sendRequest(request);
            } finally{
                cleanup?.();
            }
        }
    };
} //# sourceMappingURL=defaultHttpClient.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/httpHeaders.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createHttpHeaders = createHttpHeaders;
const ts_http_runtime_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/index.js [app-route] (ecmascript)");
/**
 * Creates an object that satisfies the `HttpHeaders` interface.
 * @param rawHeaders - A simple object representing initial headers
 */ function createHttpHeaders(rawHeaders) {
    return (0, ts_http_runtime_1.createHttpHeaders)(rawHeaders);
} //# sourceMappingURL=httpHeaders.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/pipelineRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPipelineRequest = createPipelineRequest;
const ts_http_runtime_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/index.js [app-route] (ecmascript)");
/**
 * Creates a new pipeline request with the given options.
 * This method is to allow for the easy setting of default values and not required.
 * @param options - The options to create the request with.
 */ function createPipelineRequest(options) {
    // Cast required due to difference between ts-http-runtime requiring AbortSignal while core-rest-pipeline allows
    // the more generic AbortSignalLike. The wrapAbortSignalLike pipeline policy will take care of ensuring that any AbortSignalLike in the request
    // is converted into a true AbortSignal.
    return (0, ts_http_runtime_1.createPipelineRequest)(options);
} //# sourceMappingURL=pipelineRequest.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/exponentialRetryPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exponentialRetryPolicyName = void 0;
exports.exponentialRetryPolicy = exponentialRetryPolicy;
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the exponentialRetryPolicy.
 */ exports.exponentialRetryPolicyName = policies_1.exponentialRetryPolicyName;
/**
 * A policy that attempts to retry requests while introducing an exponentially increasing delay.
 * @param options - Options that configure retry logic.
 */ function exponentialRetryPolicy(options = {}) {
    return (0, policies_1.exponentialRetryPolicy)(options);
} //# sourceMappingURL=exponentialRetryPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/systemErrorRetryPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.systemErrorRetryPolicyName = void 0;
exports.systemErrorRetryPolicy = systemErrorRetryPolicy;
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
/**
 * Name of the {@link systemErrorRetryPolicy}
 */ exports.systemErrorRetryPolicyName = policies_1.systemErrorRetryPolicyName;
/**
 * A retry policy that specifically seeks to handle errors in the
 * underlying transport layer (e.g. DNS lookup failures) rather than
 * retryable error codes from the server itself.
 * @param options - Options that customize the policy.
 */ function systemErrorRetryPolicy(options = {}) {
    return (0, policies_1.systemErrorRetryPolicy)(options);
} //# sourceMappingURL=systemErrorRetryPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/throttlingRetryPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.throttlingRetryPolicyName = void 0;
exports.throttlingRetryPolicy = throttlingRetryPolicy;
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
/**
 * Name of the {@link throttlingRetryPolicy}
 */ exports.throttlingRetryPolicyName = policies_1.throttlingRetryPolicyName;
/**
 * A policy that retries when the server sends a 429 response with a Retry-After header.
 *
 * To learn more, please refer to
 * https://learn.microsoft.com/azure/azure-resource-manager/resource-manager-request-limits,
 * https://learn.microsoft.com/azure/azure-subscription-service-limits and
 * https://learn.microsoft.com/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors
 *
 * @param options - Options that configure retry logic.
 */ function throttlingRetryPolicy(options = {}) {
    return (0, policies_1.throttlingRetryPolicy)(options);
} //# sourceMappingURL=throttlingRetryPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/retryPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.retryPolicy = retryPolicy;
const logger_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/logger/dist/commonjs/index.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/constants.js [app-route] (ecmascript)");
const policies_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)");
const retryPolicyLogger = (0, logger_1.createClientLogger)("core-rest-pipeline retryPolicy");
/**
 * retryPolicy is a generic policy to enable retrying requests when certain conditions are met
 */ function retryPolicy(strategies, options = {
    maxRetries: constants_js_1.DEFAULT_RETRY_POLICY_COUNT
}) {
    // Cast is required since the TSP runtime retry strategy type is slightly different
    // very deep down (using real AbortSignal vs. AbortSignalLike in RestError).
    // In practice the difference doesn't actually matter.
    return (0, policies_1.retryPolicy)(strategies, {
        logger: retryPolicyLogger,
        ...options
    });
} //# sourceMappingURL=retryPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/tokenCycler.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_CYCLER_OPTIONS = void 0;
exports.createTokenCycler = createTokenCycler;
const core_util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)");
// Default options for the cycler if none are provided
exports.DEFAULT_CYCLER_OPTIONS = {
    forcedRefreshWindowInMs: 1000,
    retryIntervalInMs: 3000,
    refreshWindowInMs: 1000 * 60 * 2
};
/**
 * Converts an an unreliable access token getter (which may resolve with null)
 * into an AccessTokenGetter by retrying the unreliable getter in a regular
 * interval.
 *
 * @param getAccessToken - A function that produces a promise of an access token that may fail by returning null.
 * @param retryIntervalInMs - The time (in milliseconds) to wait between retry attempts.
 * @param refreshTimeout - The timestamp after which the refresh attempt will fail, throwing an exception.
 * @returns - A promise that, if it resolves, will resolve with an access token.
 */ async function beginRefresh(getAccessToken, retryIntervalInMs, refreshTimeout) {
    // This wrapper handles exceptions gracefully as long as we haven't exceeded
    // the timeout.
    async function tryGetAccessToken() {
        if (Date.now() < refreshTimeout) {
            try {
                return await getAccessToken();
            } catch  {
                return null;
            }
        } else {
            const finalToken = await getAccessToken();
            // Timeout is up, so throw if it's still null
            if (finalToken === null) {
                throw new Error("Failed to refresh access token.");
            }
            return finalToken;
        }
    }
    let token = await tryGetAccessToken();
    while(token === null){
        await (0, core_util_1.delay)(retryIntervalInMs);
        token = await tryGetAccessToken();
    }
    return token;
}
/**
 * Creates a token cycler from a credential, scopes, and optional settings.
 *
 * A token cycler represents a way to reliably retrieve a valid access token
 * from a TokenCredential. It will handle initializing the token, refreshing it
 * when it nears expiration, and synchronizes refresh attempts to avoid
 * concurrency hazards.
 *
 * @param credential - the underlying TokenCredential that provides the access
 * token
 * @param tokenCyclerOptions - optionally override default settings for the cycler
 *
 * @returns - a function that reliably produces a valid access token
 */ function createTokenCycler(credential, tokenCyclerOptions) {
    let refreshWorker = null;
    let token = null;
    let tenantId;
    const options = {
        ...exports.DEFAULT_CYCLER_OPTIONS,
        ...tokenCyclerOptions
    };
    /**
     * This little holder defines several predicates that we use to construct
     * the rules of refreshing the token.
     */ const cycler = {
        /**
         * Produces true if a refresh job is currently in progress.
         */ get isRefreshing () {
            return refreshWorker !== null;
        },
        /**
         * Produces true if the cycler SHOULD refresh (we are within the refresh
         * window and not already refreshing)
         */ get shouldRefresh () {
            if (cycler.isRefreshing) {
                return false;
            }
            if (token?.refreshAfterTimestamp && token.refreshAfterTimestamp < Date.now()) {
                return true;
            }
            return (token?.expiresOnTimestamp ?? 0) - options.refreshWindowInMs < Date.now();
        },
        /**
         * Produces true if the cycler MUST refresh (null or nearly-expired
         * token).
         */ get mustRefresh () {
            return token === null || token.expiresOnTimestamp - options.forcedRefreshWindowInMs < Date.now();
        }
    };
    /**
     * Starts a refresh job or returns the existing job if one is already
     * running.
     */ function refresh(scopes, getTokenOptions) {
        if (!cycler.isRefreshing) {
            // We bind `scopes` here to avoid passing it around a lot
            const tryGetAccessToken = ()=>credential.getToken(scopes, getTokenOptions);
            // Take advantage of promise chaining to insert an assignment to `token`
            // before the refresh can be considered done.
            refreshWorker = beginRefresh(tryGetAccessToken, options.retryIntervalInMs, // If we don't have a token, then we should timeout immediately
            token?.expiresOnTimestamp ?? Date.now()).then((_token)=>{
                refreshWorker = null;
                token = _token;
                tenantId = getTokenOptions.tenantId;
                return token;
            }).catch((reason)=>{
                // We also should reset the refresher if we enter a failed state.  All
                // existing awaiters will throw, but subsequent requests will start a
                // new retry chain.
                refreshWorker = null;
                token = null;
                tenantId = undefined;
                throw reason;
            });
        }
        return refreshWorker;
    }
    return async (scopes, tokenOptions)=>{
        //
        // Simple rules:
        // - If we MUST refresh, then return the refresh task, blocking
        //   the pipeline until a token is available.
        // - If we SHOULD refresh, then run refresh but don't return it
        //   (we can still use the cached token).
        // - Return the token, since it's fine if we didn't return in
        //   step 1.
        //
        const hasClaimChallenge = Boolean(tokenOptions.claims);
        const tenantIdChanged = tenantId !== tokenOptions.tenantId;
        if (hasClaimChallenge) {
            // If we've received a claim, we know the existing token isn't valid
            // We want to clear it so that that refresh worker won't use the old expiration time as a timeout
            token = null;
        }
        // If the tenantId passed in token options is different to the one we have
        // Or if we are in claim challenge and the token was rejected and a new access token need to be issued, we need to
        // refresh the token with the new tenantId or token.
        const mustRefresh = tenantIdChanged || hasClaimChallenge || cycler.mustRefresh;
        if (mustRefresh) {
            return refresh(scopes, tokenOptions);
        }
        if (cycler.shouldRefresh) {
            refresh(scopes, tokenOptions);
        }
        return token;
    };
} //# sourceMappingURL=tokenCycler.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/bearerTokenAuthenticationPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bearerTokenAuthenticationPolicyName = void 0;
exports.bearerTokenAuthenticationPolicy = bearerTokenAuthenticationPolicy;
exports.parseChallenges = parseChallenges;
const tokenCycler_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/tokenCycler.js [app-route] (ecmascript)");
const log_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/log.js [app-route] (ecmascript)");
const restError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/restError.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */ exports.bearerTokenAuthenticationPolicyName = "bearerTokenAuthenticationPolicy";
/**
 * Try to send the given request.
 *
 * When a response is received, returns a tuple of the response received and, if the response was received
 * inside a thrown RestError, the RestError that was thrown.
 *
 * Otherwise, if an error was thrown while sending the request that did not provide an underlying response, it
 * will be rethrown.
 */ async function trySendRequest(request, next) {
    try {
        return [
            await next(request),
            undefined
        ];
    } catch (e) {
        if ((0, restError_js_1.isRestError)(e) && e.response) {
            return [
                e.response,
                e
            ];
        } else {
            throw e;
        }
    }
}
/**
 * Default authorize request handler
 */ async function defaultAuthorizeRequest(options) {
    const { scopes, getAccessToken, request } = options;
    // Enable CAE true by default
    const getTokenOptions = {
        abortSignal: request.abortSignal,
        tracingOptions: request.tracingOptions,
        enableCae: true
    };
    const accessToken = await getAccessToken(scopes, getTokenOptions);
    if (accessToken) {
        options.request.headers.set("Authorization", `Bearer ${accessToken.token}`);
    }
}
/**
 * We will retrieve the challenge only if the response status code was 401,
 * and if the response contained the header "WWW-Authenticate" with a non-empty value.
 */ function isChallengeResponse(response) {
    return response.status === 401 && response.headers.has("WWW-Authenticate");
}
/**
 * Re-authorize the request for CAE challenge.
 * The response containing the challenge is `options.response`.
 * If this method returns true, the underlying request will be sent once again.
 */ async function authorizeRequestOnCaeChallenge(onChallengeOptions, caeClaims) {
    const { scopes } = onChallengeOptions;
    const accessToken = await onChallengeOptions.getAccessToken(scopes, {
        enableCae: true,
        claims: caeClaims
    });
    if (!accessToken) {
        return false;
    }
    onChallengeOptions.request.headers.set("Authorization", `${accessToken.tokenType ?? "Bearer"} ${accessToken.token}`);
    return true;
}
/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a Bearer token.
 */ function bearerTokenAuthenticationPolicy(options) {
    const { credential, scopes, challengeCallbacks } = options;
    const logger = options.logger || log_js_1.logger;
    const callbacks = {
        authorizeRequest: challengeCallbacks?.authorizeRequest?.bind(challengeCallbacks) ?? defaultAuthorizeRequest,
        authorizeRequestOnChallenge: challengeCallbacks?.authorizeRequestOnChallenge?.bind(challengeCallbacks)
    };
    // This function encapsulates the entire process of reliably retrieving the token
    // The options are left out of the public API until there's demand to configure this.
    // Remember to extend `BearerTokenAuthenticationPolicyOptions` with `TokenCyclerOptions`
    // in order to pass through the `options` object.
    const getAccessToken = credential ? (0, tokenCycler_js_1.createTokenCycler)(credential /* , options */ ) : ()=>Promise.resolve(null);
    return {
        name: exports.bearerTokenAuthenticationPolicyName,
        /**
         * If there's no challenge parameter:
         * - It will try to retrieve the token using the cache, or the credential's getToken.
         * - Then it will try the next policy with or without the retrieved token.
         *
         * It uses the challenge parameters to:
         * - Skip a first attempt to get the token from the credential if there's no cached token,
         *   since it expects the token to be retrievable only after the challenge.
         * - Prepare the outgoing request if the `prepareRequest` method has been provided.
         * - Send an initial request to receive the challenge if it fails.
         * - Process a challenge if the response contains it.
         * - Retrieve a token with the challenge information, then re-send the request.
         */ async sendRequest (request, next) {
            if (!request.url.toLowerCase().startsWith("https://")) {
                throw new Error("Bearer token authentication is not permitted for non-TLS protected (non-https) URLs.");
            }
            await callbacks.authorizeRequest({
                scopes: Array.isArray(scopes) ? scopes : [
                    scopes
                ],
                request,
                getAccessToken,
                logger
            });
            let response;
            let error;
            let shouldSendRequest;
            [response, error] = await trySendRequest(request, next);
            if (isChallengeResponse(response)) {
                let claims = getCaeChallengeClaims(response.headers.get("WWW-Authenticate"));
                // Handle CAE by default when receive CAE claim
                if (claims) {
                    let parsedClaim;
                    // Return the response immediately if claims is not a valid base64 encoded string
                    try {
                        parsedClaim = atob(claims);
                    } catch (e) {
                        logger.warning(`The WWW-Authenticate header contains "claims" that cannot be parsed. Unable to perform the Continuous Access Evaluation authentication flow. Unparsable claims: ${claims}`);
                        return response;
                    }
                    shouldSendRequest = await authorizeRequestOnCaeChallenge({
                        scopes: Array.isArray(scopes) ? scopes : [
                            scopes
                        ],
                        response,
                        request,
                        getAccessToken,
                        logger
                    }, parsedClaim);
                    // Send updated request and handle response for RestError
                    if (shouldSendRequest) {
                        [response, error] = await trySendRequest(request, next);
                    }
                } else if (callbacks.authorizeRequestOnChallenge) {
                    // Handle custom challenges when client provides custom callback
                    shouldSendRequest = await callbacks.authorizeRequestOnChallenge({
                        scopes: Array.isArray(scopes) ? scopes : [
                            scopes
                        ],
                        request,
                        response,
                        getAccessToken,
                        logger
                    });
                    // Send updated request and handle response for RestError
                    if (shouldSendRequest) {
                        [response, error] = await trySendRequest(request, next);
                    }
                    // If we get another CAE Claim, we will handle it by default and return whatever value we receive for this
                    if (isChallengeResponse(response)) {
                        claims = getCaeChallengeClaims(response.headers.get("WWW-Authenticate"));
                        if (claims) {
                            let parsedClaim;
                            try {
                                parsedClaim = atob(claims);
                            } catch (e) {
                                logger.warning(`The WWW-Authenticate header contains "claims" that cannot be parsed. Unable to perform the Continuous Access Evaluation authentication flow. Unparsable claims: ${claims}`);
                                return response;
                            }
                            shouldSendRequest = await authorizeRequestOnCaeChallenge({
                                scopes: Array.isArray(scopes) ? scopes : [
                                    scopes
                                ],
                                response,
                                request,
                                getAccessToken,
                                logger
                            }, parsedClaim);
                            // Send updated request and handle response for RestError
                            if (shouldSendRequest) {
                                [response, error] = await trySendRequest(request, next);
                            }
                        }
                    }
                }
            }
            if (error) {
                throw error;
            } else {
                return response;
            }
        }
    };
}
/**
 * Converts: `Bearer a="b", c="d", Pop e="f", g="h"`.
 * Into: `[ { scheme: 'Bearer', params: { a: 'b', c: 'd' } }, { scheme: 'Pop', params: { e: 'f', g: 'h' } } ]`.
 *
 * @internal
 */ function parseChallenges(challenges) {
    // Challenge regex seperates the string to individual challenges with different schemes in the format `Scheme a="b", c=d`
    // The challenge regex captures parameteres with either quotes values or unquoted values
    const challengeRegex = /(\w+)\s+((?:\w+=(?:"[^"]*"|[^,]*),?\s*)+)/g;
    // Parameter regex captures the claims group removed from the scheme in the format `a="b"` and `c="d"`
    // CAE challenge always have quoted parameters. For more reference, https://learn.microsoft.com/entra/identity-platform/claims-challenge
    const paramRegex = /(\w+)="([^"]*)"/g;
    const parsedChallenges = [];
    let match;
    // Iterate over each challenge match
    while((match = challengeRegex.exec(challenges)) !== null){
        const scheme = match[1];
        const paramsString = match[2];
        const params = {};
        let paramMatch;
        // Iterate over each parameter match
        while((paramMatch = paramRegex.exec(paramsString)) !== null){
            params[paramMatch[1]] = paramMatch[2];
        }
        parsedChallenges.push({
            scheme,
            params
        });
    }
    return parsedChallenges;
}
/**
 * Parse a pipeline response and look for a CAE challenge with "Bearer" scheme
 * Return the value in the header without parsing the challenge
 * @internal
 */ function getCaeChallengeClaims(challenges) {
    if (!challenges) {
        return;
    }
    // Find all challenges present in the header
    const parsedChallenges = parseChallenges(challenges);
    return parsedChallenges.find((x)=>x.scheme === "Bearer" && x.params.claims && x.params.error === "insufficient_claims")?.params.claims;
} //# sourceMappingURL=bearerTokenAuthenticationPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/ndJsonPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ndJsonPolicyName = void 0;
exports.ndJsonPolicy = ndJsonPolicy;
/**
 * The programmatic identifier of the ndJsonPolicy.
 */ exports.ndJsonPolicyName = "ndJsonPolicy";
/**
 * ndJsonPolicy is a policy used to control keep alive settings for every request.
 */ function ndJsonPolicy() {
    return {
        name: exports.ndJsonPolicyName,
        async sendRequest (request, next) {
            // There currently isn't a good way to bypass the serializer
            if (typeof request.body === "string" && request.body.startsWith("[")) {
                const body = JSON.parse(request.body);
                if (Array.isArray(body)) {
                    request.body = body.map((item)=>JSON.stringify(item) + "\n").join("");
                }
            }
            return next(request);
        }
    };
} //# sourceMappingURL=ndJsonPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/auxiliaryAuthenticationHeaderPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.auxiliaryAuthenticationHeaderPolicyName = void 0;
exports.auxiliaryAuthenticationHeaderPolicy = auxiliaryAuthenticationHeaderPolicy;
const tokenCycler_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/tokenCycler.js [app-route] (ecmascript)");
const log_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/log.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the auxiliaryAuthenticationHeaderPolicy.
 */ exports.auxiliaryAuthenticationHeaderPolicyName = "auxiliaryAuthenticationHeaderPolicy";
const AUTHORIZATION_AUXILIARY_HEADER = "x-ms-authorization-auxiliary";
async function sendAuthorizeRequest(options) {
    const { scopes, getAccessToken, request } = options;
    const getTokenOptions = {
        abortSignal: request.abortSignal,
        tracingOptions: request.tracingOptions
    };
    return (await getAccessToken(scopes, getTokenOptions))?.token ?? "";
}
/**
 * A policy for external tokens to `x-ms-authorization-auxiliary` header.
 * This header will be used when creating a cross-tenant application we may need to handle authentication requests
 * for resources that are in different tenants.
 * You could see [ARM docs](https://learn.microsoft.com/azure/azure-resource-manager/management/authenticate-multi-tenant) for a rundown of how this feature works
 */ function auxiliaryAuthenticationHeaderPolicy(options) {
    const { credentials, scopes } = options;
    const logger = options.logger || log_js_1.logger;
    const tokenCyclerMap = new WeakMap();
    return {
        name: exports.auxiliaryAuthenticationHeaderPolicyName,
        async sendRequest (request, next) {
            if (!request.url.toLowerCase().startsWith("https://")) {
                throw new Error("Bearer token authentication for auxiliary header is not permitted for non-TLS protected (non-https) URLs.");
            }
            if (!credentials || credentials.length === 0) {
                logger.info(`${exports.auxiliaryAuthenticationHeaderPolicyName} header will not be set due to empty credentials.`);
                return next(request);
            }
            const tokenPromises = [];
            for (const credential of credentials){
                let getAccessToken = tokenCyclerMap.get(credential);
                if (!getAccessToken) {
                    getAccessToken = (0, tokenCycler_js_1.createTokenCycler)(credential);
                    tokenCyclerMap.set(credential, getAccessToken);
                }
                tokenPromises.push(sendAuthorizeRequest({
                    scopes: Array.isArray(scopes) ? scopes : [
                        scopes
                    ],
                    request,
                    getAccessToken,
                    logger
                }));
            }
            const auxiliaryTokens = (await Promise.all(tokenPromises)).filter((token)=>Boolean(token));
            if (auxiliaryTokens.length === 0) {
                logger.warning(`None of the auxiliary tokens are valid. ${AUTHORIZATION_AUXILIARY_HEADER} header will not be set.`);
                return next(request);
            }
            request.headers.set(AUTHORIZATION_AUXILIARY_HEADER, auxiliaryTokens.map((token)=>`Bearer ${token}`).join(", "));
            return next(request);
        }
    };
} //# sourceMappingURL=auxiliaryAuthenticationHeaderPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createFileFromStream = exports.createFile = exports.agentPolicyName = exports.agentPolicy = exports.auxiliaryAuthenticationHeaderPolicyName = exports.auxiliaryAuthenticationHeaderPolicy = exports.ndJsonPolicyName = exports.ndJsonPolicy = exports.bearerTokenAuthenticationPolicyName = exports.bearerTokenAuthenticationPolicy = exports.formDataPolicyName = exports.formDataPolicy = exports.tlsPolicyName = exports.tlsPolicy = exports.userAgentPolicyName = exports.userAgentPolicy = exports.defaultRetryPolicy = exports.tracingPolicyName = exports.tracingPolicy = exports.retryPolicy = exports.throttlingRetryPolicyName = exports.throttlingRetryPolicy = exports.systemErrorRetryPolicyName = exports.systemErrorRetryPolicy = exports.redirectPolicyName = exports.redirectPolicy = exports.getDefaultProxySettings = exports.proxyPolicyName = exports.proxyPolicy = exports.multipartPolicyName = exports.multipartPolicy = exports.logPolicyName = exports.logPolicy = exports.setClientRequestIdPolicyName = exports.setClientRequestIdPolicy = exports.exponentialRetryPolicyName = exports.exponentialRetryPolicy = exports.decompressResponsePolicyName = exports.decompressResponsePolicy = exports.isRestError = exports.RestError = exports.createPipelineRequest = exports.createHttpHeaders = exports.createDefaultHttpClient = exports.createPipelineFromOptions = exports.createEmptyPipeline = void 0;
var pipeline_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/pipeline.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createEmptyPipeline", {
    enumerable: true,
    get: function() {
        return pipeline_js_1.createEmptyPipeline;
    }
});
var createPipelineFromOptions_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/createPipelineFromOptions.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createPipelineFromOptions", {
    enumerable: true,
    get: function() {
        return createPipelineFromOptions_js_1.createPipelineFromOptions;
    }
});
var defaultHttpClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/defaultHttpClient.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createDefaultHttpClient", {
    enumerable: true,
    get: function() {
        return defaultHttpClient_js_1.createDefaultHttpClient;
    }
});
var httpHeaders_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/httpHeaders.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createHttpHeaders", {
    enumerable: true,
    get: function() {
        return httpHeaders_js_1.createHttpHeaders;
    }
});
var pipelineRequest_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/pipelineRequest.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createPipelineRequest", {
    enumerable: true,
    get: function() {
        return pipelineRequest_js_1.createPipelineRequest;
    }
});
var restError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/restError.js [app-route] (ecmascript)");
Object.defineProperty(exports, "RestError", {
    enumerable: true,
    get: function() {
        return restError_js_1.RestError;
    }
});
Object.defineProperty(exports, "isRestError", {
    enumerable: true,
    get: function() {
        return restError_js_1.isRestError;
    }
});
var decompressResponsePolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/decompressResponsePolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "decompressResponsePolicy", {
    enumerable: true,
    get: function() {
        return decompressResponsePolicy_js_1.decompressResponsePolicy;
    }
});
Object.defineProperty(exports, "decompressResponsePolicyName", {
    enumerable: true,
    get: function() {
        return decompressResponsePolicy_js_1.decompressResponsePolicyName;
    }
});
var exponentialRetryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/exponentialRetryPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "exponentialRetryPolicy", {
    enumerable: true,
    get: function() {
        return exponentialRetryPolicy_js_1.exponentialRetryPolicy;
    }
});
Object.defineProperty(exports, "exponentialRetryPolicyName", {
    enumerable: true,
    get: function() {
        return exponentialRetryPolicy_js_1.exponentialRetryPolicyName;
    }
});
var setClientRequestIdPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/setClientRequestIdPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "setClientRequestIdPolicy", {
    enumerable: true,
    get: function() {
        return setClientRequestIdPolicy_js_1.setClientRequestIdPolicy;
    }
});
Object.defineProperty(exports, "setClientRequestIdPolicyName", {
    enumerable: true,
    get: function() {
        return setClientRequestIdPolicy_js_1.setClientRequestIdPolicyName;
    }
});
var logPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/logPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "logPolicy", {
    enumerable: true,
    get: function() {
        return logPolicy_js_1.logPolicy;
    }
});
Object.defineProperty(exports, "logPolicyName", {
    enumerable: true,
    get: function() {
        return logPolicy_js_1.logPolicyName;
    }
});
var multipartPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/multipartPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "multipartPolicy", {
    enumerable: true,
    get: function() {
        return multipartPolicy_js_1.multipartPolicy;
    }
});
Object.defineProperty(exports, "multipartPolicyName", {
    enumerable: true,
    get: function() {
        return multipartPolicy_js_1.multipartPolicyName;
    }
});
var proxyPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/proxyPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "proxyPolicy", {
    enumerable: true,
    get: function() {
        return proxyPolicy_js_1.proxyPolicy;
    }
});
Object.defineProperty(exports, "proxyPolicyName", {
    enumerable: true,
    get: function() {
        return proxyPolicy_js_1.proxyPolicyName;
    }
});
Object.defineProperty(exports, "getDefaultProxySettings", {
    enumerable: true,
    get: function() {
        return proxyPolicy_js_1.getDefaultProxySettings;
    }
});
var redirectPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/redirectPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "redirectPolicy", {
    enumerable: true,
    get: function() {
        return redirectPolicy_js_1.redirectPolicy;
    }
});
Object.defineProperty(exports, "redirectPolicyName", {
    enumerable: true,
    get: function() {
        return redirectPolicy_js_1.redirectPolicyName;
    }
});
var systemErrorRetryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/systemErrorRetryPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "systemErrorRetryPolicy", {
    enumerable: true,
    get: function() {
        return systemErrorRetryPolicy_js_1.systemErrorRetryPolicy;
    }
});
Object.defineProperty(exports, "systemErrorRetryPolicyName", {
    enumerable: true,
    get: function() {
        return systemErrorRetryPolicy_js_1.systemErrorRetryPolicyName;
    }
});
var throttlingRetryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/throttlingRetryPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "throttlingRetryPolicy", {
    enumerable: true,
    get: function() {
        return throttlingRetryPolicy_js_1.throttlingRetryPolicy;
    }
});
Object.defineProperty(exports, "throttlingRetryPolicyName", {
    enumerable: true,
    get: function() {
        return throttlingRetryPolicy_js_1.throttlingRetryPolicyName;
    }
});
var retryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/retryPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "retryPolicy", {
    enumerable: true,
    get: function() {
        return retryPolicy_js_1.retryPolicy;
    }
});
var tracingPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/tracingPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "tracingPolicy", {
    enumerable: true,
    get: function() {
        return tracingPolicy_js_1.tracingPolicy;
    }
});
Object.defineProperty(exports, "tracingPolicyName", {
    enumerable: true,
    get: function() {
        return tracingPolicy_js_1.tracingPolicyName;
    }
});
var defaultRetryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/defaultRetryPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "defaultRetryPolicy", {
    enumerable: true,
    get: function() {
        return defaultRetryPolicy_js_1.defaultRetryPolicy;
    }
});
var userAgentPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/userAgentPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "userAgentPolicy", {
    enumerable: true,
    get: function() {
        return userAgentPolicy_js_1.userAgentPolicy;
    }
});
Object.defineProperty(exports, "userAgentPolicyName", {
    enumerable: true,
    get: function() {
        return userAgentPolicy_js_1.userAgentPolicyName;
    }
});
var tlsPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/tlsPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "tlsPolicy", {
    enumerable: true,
    get: function() {
        return tlsPolicy_js_1.tlsPolicy;
    }
});
Object.defineProperty(exports, "tlsPolicyName", {
    enumerable: true,
    get: function() {
        return tlsPolicy_js_1.tlsPolicyName;
    }
});
var formDataPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/formDataPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "formDataPolicy", {
    enumerable: true,
    get: function() {
        return formDataPolicy_js_1.formDataPolicy;
    }
});
Object.defineProperty(exports, "formDataPolicyName", {
    enumerable: true,
    get: function() {
        return formDataPolicy_js_1.formDataPolicyName;
    }
});
var bearerTokenAuthenticationPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/bearerTokenAuthenticationPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "bearerTokenAuthenticationPolicy", {
    enumerable: true,
    get: function() {
        return bearerTokenAuthenticationPolicy_js_1.bearerTokenAuthenticationPolicy;
    }
});
Object.defineProperty(exports, "bearerTokenAuthenticationPolicyName", {
    enumerable: true,
    get: function() {
        return bearerTokenAuthenticationPolicy_js_1.bearerTokenAuthenticationPolicyName;
    }
});
var ndJsonPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/ndJsonPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ndJsonPolicy", {
    enumerable: true,
    get: function() {
        return ndJsonPolicy_js_1.ndJsonPolicy;
    }
});
Object.defineProperty(exports, "ndJsonPolicyName", {
    enumerable: true,
    get: function() {
        return ndJsonPolicy_js_1.ndJsonPolicyName;
    }
});
var auxiliaryAuthenticationHeaderPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/auxiliaryAuthenticationHeaderPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "auxiliaryAuthenticationHeaderPolicy", {
    enumerable: true,
    get: function() {
        return auxiliaryAuthenticationHeaderPolicy_js_1.auxiliaryAuthenticationHeaderPolicy;
    }
});
Object.defineProperty(exports, "auxiliaryAuthenticationHeaderPolicyName", {
    enumerable: true,
    get: function() {
        return auxiliaryAuthenticationHeaderPolicy_js_1.auxiliaryAuthenticationHeaderPolicyName;
    }
});
var agentPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/policies/agentPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "agentPolicy", {
    enumerable: true,
    get: function() {
        return agentPolicy_js_1.agentPolicy;
    }
});
Object.defineProperty(exports, "agentPolicyName", {
    enumerable: true,
    get: function() {
        return agentPolicy_js_1.agentPolicyName;
    }
});
var file_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/util/file.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createFile", {
    enumerable: true,
    get: function() {
        return file_js_1.createFile;
    }
});
Object.defineProperty(exports, "createFileFromStream", {
    enumerable: true,
    get: function() {
        return file_js_1.createFileFromStream;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/logger/dist/commonjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AzureLogger = void 0;
exports.setLogLevel = setLogLevel;
exports.getLogLevel = getLogLevel;
exports.createClientLogger = createClientLogger;
const logger_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/logger/internal.js [app-route] (ecmascript)");
const context = (0, logger_1.createLoggerContext)({
    logLevelEnvVarName: "AZURE_LOG_LEVEL",
    namespace: "azure"
});
/**
 * The AzureLogger provides a mechanism for overriding where logs are output to.
 * By default, logs are sent to stderr.
 * Override the `log` method to redirect logs to another location.
 */ exports.AzureLogger = context.logger;
/**
 * Immediately enables logging at the specified log level. If no level is specified, logging is disabled.
 * @param level - The log level to enable for logging.
 * Options from most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */ function setLogLevel(level) {
    context.setLogLevel(level);
}
/**
 * Retrieves the currently specified log level.
 */ function getLogLevel() {
    return context.getLogLevel();
}
/**
 * Creates a logger for use by the Azure SDKs that inherits from `AzureLogger`.
 * @param namespace - The name of the SDK package.
 * @hidden
 */ function createClientLogger(namespace) {
    return context.createClientLogger(namespace);
} //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/aborterUtils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cancelablePromiseRace = cancelablePromiseRace;
/**
 * promise.race() wrapper that aborts rest of promises as soon as the first promise settles.
 */ async function cancelablePromiseRace(abortablePromiseBuilders, options) {
    const aborter = new AbortController();
    function abortHandler() {
        aborter.abort();
    }
    options?.abortSignal?.addEventListener("abort", abortHandler);
    try {
        return await Promise.race(abortablePromiseBuilders.map((p)=>p({
                abortSignal: aborter.signal
            })));
    } finally{
        aborter.abort();
        options?.abortSignal?.removeEventListener("abort", abortHandler);
    }
} //# sourceMappingURL=aborterUtils.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/createAbortablePromise.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createAbortablePromise = createAbortablePromise;
const abort_controller_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/abort-controller/dist/commonjs/index.js [app-route] (ecmascript)");
/**
 * Creates an abortable promise.
 * @param buildPromise - A function that takes the resolve and reject functions as parameters.
 * @param options - The options for the abortable promise.
 * @returns A promise that can be aborted.
 */ function createAbortablePromise(buildPromise, options) {
    const { cleanupBeforeAbort, abortSignal, abortErrorMsg } = options ?? {};
    return new Promise((resolve, reject)=>{
        function rejectOnAbort() {
            reject(new abort_controller_1.AbortError(abortErrorMsg ?? "The operation was aborted."));
        }
        function removeListeners() {
            abortSignal?.removeEventListener("abort", onAbort);
        }
        function onAbort() {
            cleanupBeforeAbort?.();
            removeListeners();
            rejectOnAbort();
        }
        if (abortSignal?.aborted) {
            return rejectOnAbort();
        }
        try {
            buildPromise((x)=>{
                removeListeners();
                resolve(x);
            }, (x)=>{
                removeListeners();
                reject(x);
            });
        } catch (err) {
            reject(err);
        }
        abortSignal?.addEventListener("abort", onAbort);
    });
} //# sourceMappingURL=createAbortablePromise.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/delay.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delay = delay;
exports.calculateRetryDelay = calculateRetryDelay;
const createAbortablePromise_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/createAbortablePromise.js [app-route] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/internal.js [app-route] (ecmascript)");
const StandardAbortMessage = "The delay was aborted.";
/**
 * A wrapper for setTimeout that resolves a promise after timeInMs milliseconds.
 * @param timeInMs - The number of milliseconds to be delayed.
 * @param options - The options for delay - currently abort options
 * @returns Promise that is resolved after timeInMs
 */ function delay(timeInMs, options) {
    let token;
    const { abortSignal, abortErrorMsg } = options ?? {};
    return (0, createAbortablePromise_js_1.createAbortablePromise)((resolve)=>{
        token = setTimeout(resolve, timeInMs);
    }, {
        cleanupBeforeAbort: ()=>clearTimeout(token),
        abortSignal,
        abortErrorMsg: abortErrorMsg ?? StandardAbortMessage
    });
}
/**
 * Calculates the delay interval for retry attempts using exponential delay with jitter.
 * @param retryAttempt - The current retry attempt number.
 * @param config - The exponential retry configuration.
 * @returns An object containing the calculated retry delay.
 */ function calculateRetryDelay(retryAttempt, config) {
    // Exponentially increase the delay each time
    const exponentialDelay = config.retryDelayInMs * Math.pow(2, retryAttempt);
    // Don't let the delay exceed the maximum
    const clampedDelay = Math.min(config.maxRetryDelayInMs, exponentialDelay);
    // Allow the final value to have some "jitter" (within 50% of the delay size) so
    // that retries across multiple clients don't occur simultaneously.
    const retryAfterInMs = clampedDelay / 2 + (0, util_1.getRandomIntegerInclusive)(0, clampedDelay / 2);
    return {
        retryAfterInMs
    };
} //# sourceMappingURL=delay.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/error.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getErrorMessage = getErrorMessage;
const util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/internal.js [app-route] (ecmascript)");
/**
 * Given what is thought to be an error object, return the message if possible.
 * If the message is missing, returns a stringified version of the input.
 * @param e - Something thrown from a try block
 * @returns The error message or a string of the input
 */ function getErrorMessage(e) {
    if ((0, util_1.isError)(e)) {
        return e.message;
    } else {
        let stringified;
        try {
            if (typeof e === "object" && e) {
                stringified = JSON.stringify(e);
            } else {
                stringified = String(e);
            }
        } catch (err) {
            stringified = "[unable to stringify input]";
        }
        return `Unknown error ${stringified}`;
    }
} //# sourceMappingURL=error.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/typeGuards.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isDefined = isDefined;
exports.isObjectWithProperties = isObjectWithProperties;
exports.objectHasProperty = objectHasProperty;
/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 */ function isDefined(thing) {
    return typeof thing !== "undefined" && thing !== null;
}
/**
 * Helper TypeGuard that checks if the input is an object with the specified properties.
 * @param thing - Anything.
 * @param properties - The name of the properties that should appear in the object.
 */ function isObjectWithProperties(thing, properties) {
    if (!isDefined(thing) || typeof thing !== "object") {
        return false;
    }
    for (const property of properties){
        if (!objectHasProperty(thing, property)) {
            return false;
        }
    }
    return true;
}
/**
 * Helper TypeGuard that checks if the input is an object with the specified property.
 * @param thing - Any object.
 * @param property - The name of the property that should appear in the object.
 */ function objectHasProperty(thing, property) {
    return isDefined(thing) && typeof thing === "object" && property in thing;
} //# sourceMappingURL=typeGuards.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isWebWorker = exports.isReactNative = exports.isNodeRuntime = exports.isNodeLike = exports.isNode = exports.isDeno = exports.isBun = exports.isBrowser = exports.objectHasProperty = exports.isObjectWithProperties = exports.isDefined = exports.getErrorMessage = exports.delay = exports.createAbortablePromise = exports.cancelablePromiseRace = void 0;
exports.calculateRetryDelay = calculateRetryDelay;
exports.computeSha256Hash = computeSha256Hash;
exports.computeSha256Hmac = computeSha256Hmac;
exports.getRandomIntegerInclusive = getRandomIntegerInclusive;
exports.isError = isError;
exports.isObject = isObject;
exports.randomUUID = randomUUID;
exports.uint8ArrayToString = uint8ArrayToString;
exports.stringToUint8Array = stringToUint8Array;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
const tspRuntime = tslib_1.__importStar(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/internal.js [app-route] (ecmascript)"));
var aborterUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/aborterUtils.js [app-route] (ecmascript)");
Object.defineProperty(exports, "cancelablePromiseRace", {
    enumerable: true,
    get: function() {
        return aborterUtils_js_1.cancelablePromiseRace;
    }
});
var createAbortablePromise_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/createAbortablePromise.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createAbortablePromise", {
    enumerable: true,
    get: function() {
        return createAbortablePromise_js_1.createAbortablePromise;
    }
});
var delay_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/delay.js [app-route] (ecmascript)");
Object.defineProperty(exports, "delay", {
    enumerable: true,
    get: function() {
        return delay_js_1.delay;
    }
});
var error_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/error.js [app-route] (ecmascript)");
Object.defineProperty(exports, "getErrorMessage", {
    enumerable: true,
    get: function() {
        return error_js_1.getErrorMessage;
    }
});
var typeGuards_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/typeGuards.js [app-route] (ecmascript)");
Object.defineProperty(exports, "isDefined", {
    enumerable: true,
    get: function() {
        return typeGuards_js_1.isDefined;
    }
});
Object.defineProperty(exports, "isObjectWithProperties", {
    enumerable: true,
    get: function() {
        return typeGuards_js_1.isObjectWithProperties;
    }
});
Object.defineProperty(exports, "objectHasProperty", {
    enumerable: true,
    get: function() {
        return typeGuards_js_1.objectHasProperty;
    }
});
/**
 * Calculates the delay interval for retry attempts using exponential delay with jitter.
 *
 * @param retryAttempt - The current retry attempt number.
 *
 * @param config - The exponential retry configuration.
 *
 * @returns An object containing the calculated retry delay.
 */ function calculateRetryDelay(retryAttempt, config) {
    return tspRuntime.calculateRetryDelay(retryAttempt, config);
}
/**
 * Generates a SHA-256 hash.
 *
 * @param content - The data to be included in the hash.
 *
 * @param encoding - The textual encoding to use for the returned hash.
 */ function computeSha256Hash(content, encoding) {
    return tspRuntime.computeSha256Hash(content, encoding);
}
/**
 * Generates a SHA-256 HMAC signature.
 *
 * @param key - The HMAC key represented as a base64 string, used to generate the cryptographic HMAC hash.
 *
 * @param stringToSign - The data to be signed.
 *
 * @param encoding - The textual encoding to use for the returned HMAC digest.
 */ function computeSha256Hmac(key, stringToSign, encoding) {
    return tspRuntime.computeSha256Hmac(key, stringToSign, encoding);
}
/**
 * Returns a random integer value between a lower and upper bound, inclusive of both bounds. Note that this uses Math.random and isn't secure. If you need to use this for any kind of security purpose, find a better source of random.
 *
 * @param min - The smallest integer value allowed.
 *
 * @param max - The largest integer value allowed.
 */ function getRandomIntegerInclusive(min, max) {
    return tspRuntime.getRandomIntegerInclusive(min, max);
}
/**
 * Typeguard for an error object shape (has name and message)
 *
 * @param e - Something caught by a catch clause.
 */ function isError(e) {
    return tspRuntime.isError(e);
}
/**
 * Helper to determine when an input is a generic JS object.
 *
 * @returns true when input is an object type that is not null, Array, RegExp, or Date.
 */ function isObject(input) {
    return tspRuntime.isObject(input);
}
/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 */ function randomUUID() {
    return tspRuntime.randomUUID();
}
/**
 * A constant that indicates whether the environment the code is running is a Web Browser.
 */ exports.isBrowser = tspRuntime.isBrowser;
/**
 * A constant that indicates whether the environment the code is running is Bun.sh.
 */ exports.isBun = tspRuntime.isBun;
/**
 * A constant that indicates whether the environment the code is running is Deno.
 */ exports.isDeno = tspRuntime.isDeno;
/**
 * A constant that indicates whether the environment the code is running is a Node.js compatible environment.
 *
 * @deprecated
 *
 * Use `isNodeLike` instead.
 */ exports.isNode = tspRuntime.isNodeLike;
/**
 * A constant that indicates whether the environment the code is running is a Node.js compatible environment.
 */ exports.isNodeLike = tspRuntime.isNodeLike;
/**
 * A constant that indicates whether the environment the code is running is Node.JS.
 */ exports.isNodeRuntime = tspRuntime.isNodeRuntime;
/**
 * A constant that indicates whether the environment the code is running is in React-Native.
 */ exports.isReactNative = tspRuntime.isReactNative;
/**
 * A constant that indicates whether the environment the code is running is a Web Worker.
 */ exports.isWebWorker = tspRuntime.isWebWorker;
/**
 * The helper that transforms bytes with specific character encoding into string
 * @param bytes - the uint8array bytes
 * @param format - the format we use to encode the byte
 * @returns a string of the encoded string
 */ function uint8ArrayToString(bytes, format) {
    return tspRuntime.uint8ArrayToString(bytes, format);
}
/**
 * The helper that transforms string to specific character encoded bytes array.
 * @param value - the string to be converted
 * @param format - the format we use to decode the value
 * @returns a uint8array
 */ function stringToUint8Array(value, format) {
    return tspRuntime.stringToUint8Array(value, format);
} //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/abort-controller/dist/commonjs/AbortError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbortError = void 0;
/**
 * This error is thrown when an asynchronous operation has been aborted.
 * Check for this error by testing the `name` that the name property of the
 * error matches `"AbortError"`.
 *
 * @example
 * ```ts
 * const controller = new AbortController();
 * controller.abort();
 * try {
 *   doAsyncWork(controller.signal)
 * } catch (e) {
 *   if (e.name === 'AbortError') {
 *     // handle abort error here.
 *   }
 * }
 * ```
 */ class AbortError extends Error {
    constructor(message){
        super(message);
        this.name = "AbortError";
    }
}
exports.AbortError = AbortError; //# sourceMappingURL=AbortError.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/abort-controller/dist/commonjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbortError = void 0;
var AbortError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/abort-controller/dist/commonjs/AbortError.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AbortError", {
    enumerable: true,
    get: function() {
        return AbortError_js_1.AbortError;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/tracingContext.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TracingContextImpl = exports.knownContextKeys = void 0;
exports.createTracingContext = createTracingContext;
/** @internal */ exports.knownContextKeys = {
    span: Symbol.for("@azure/core-tracing span"),
    namespace: Symbol.for("@azure/core-tracing namespace")
};
/**
 * Creates a new {@link TracingContext} with the given options.
 * @param options - A set of known keys that may be set on the context.
 * @returns A new {@link TracingContext} with the given options.
 *
 * @internal
 */ function createTracingContext(options = {}) {
    let context = new TracingContextImpl(options.parentContext);
    if (options.span) {
        context = context.setValue(exports.knownContextKeys.span, options.span);
    }
    if (options.namespace) {
        context = context.setValue(exports.knownContextKeys.namespace, options.namespace);
    }
    return context;
}
/** @internal */ class TracingContextImpl {
    _contextMap;
    constructor(initialContext){
        this._contextMap = initialContext instanceof TracingContextImpl ? new Map(initialContext._contextMap) : new Map();
    }
    setValue(key, value) {
        const newContext = new TracingContextImpl(this);
        newContext._contextMap.set(key, value);
        return newContext;
    }
    getValue(key) {
        return this._contextMap.get(key);
    }
    deleteValue(key) {
        const newContext = new TracingContextImpl(this);
        newContext._contextMap.delete(key);
        return newContext;
    }
}
exports.TracingContextImpl = TracingContextImpl; //# sourceMappingURL=tracingContext.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.state = void 0;
/**
 * @internal
 *
 * Holds the singleton instrumenter, to be shared across CJS and ESM imports.
 */ exports.state = {
    instrumenterImplementation: undefined
}; //# sourceMappingURL=state-cjs.cjs.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/instrumenter.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDefaultTracingSpan = createDefaultTracingSpan;
exports.createDefaultInstrumenter = createDefaultInstrumenter;
exports.useInstrumenter = useInstrumenter;
exports.getInstrumenter = getInstrumenter;
const tracingContext_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/tracingContext.js [app-route] (ecmascript)");
const state_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/state.js [app-route] (ecmascript)");
function createDefaultTracingSpan() {
    return {
        end: ()=>{
        // noop
        },
        isRecording: ()=>false,
        recordException: ()=>{
        // noop
        },
        setAttribute: ()=>{
        // noop
        },
        setStatus: ()=>{
        // noop
        },
        addEvent: ()=>{
        // noop
        }
    };
}
function createDefaultInstrumenter() {
    return {
        createRequestHeaders: ()=>{
            return {};
        },
        parseTraceparentHeader: ()=>{
            return undefined;
        },
        startSpan: (_name, spanOptions)=>{
            return {
                span: createDefaultTracingSpan(),
                tracingContext: (0, tracingContext_js_1.createTracingContext)({
                    parentContext: spanOptions.tracingContext
                })
            };
        },
        withContext (_context, callback, ...callbackArgs) {
            return callback(...callbackArgs);
        }
    };
}
/**
 * Extends the Azure SDK with support for a given instrumenter implementation.
 *
 * @param instrumenter - The instrumenter implementation to use.
 */ function useInstrumenter(instrumenter) {
    state_js_1.state.instrumenterImplementation = instrumenter;
}
/**
 * Gets the currently set instrumenter, a No-Op instrumenter by default.
 *
 * @returns The currently set instrumenter
 */ function getInstrumenter() {
    if (!state_js_1.state.instrumenterImplementation) {
        state_js_1.state.instrumenterImplementation = createDefaultInstrumenter();
    }
    return state_js_1.state.instrumenterImplementation;
} //# sourceMappingURL=instrumenter.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/tracingClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTracingClient = createTracingClient;
const instrumenter_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/instrumenter.js [app-route] (ecmascript)");
const tracingContext_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/tracingContext.js [app-route] (ecmascript)");
/**
 * Creates a new tracing client.
 *
 * @param options - Options used to configure the tracing client.
 * @returns - An instance of {@link TracingClient}.
 */ function createTracingClient(options) {
    const { namespace, packageName, packageVersion } = options;
    function startSpan(name, operationOptions, spanOptions) {
        const startSpanResult = (0, instrumenter_js_1.getInstrumenter)().startSpan(name, {
            ...spanOptions,
            packageName: packageName,
            packageVersion: packageVersion,
            tracingContext: operationOptions?.tracingOptions?.tracingContext
        });
        let tracingContext = startSpanResult.tracingContext;
        const span = startSpanResult.span;
        if (!tracingContext.getValue(tracingContext_js_1.knownContextKeys.namespace)) {
            tracingContext = tracingContext.setValue(tracingContext_js_1.knownContextKeys.namespace, namespace);
        }
        span.setAttribute("az.namespace", tracingContext.getValue(tracingContext_js_1.knownContextKeys.namespace));
        const updatedOptions = Object.assign({}, operationOptions, {
            tracingOptions: {
                ...operationOptions?.tracingOptions,
                tracingContext
            }
        });
        return {
            span,
            updatedOptions
        };
    }
    async function withSpan(name, operationOptions, callback, spanOptions) {
        const { span, updatedOptions } = startSpan(name, operationOptions, spanOptions);
        try {
            const result = await withContext(updatedOptions.tracingOptions.tracingContext, ()=>Promise.resolve(callback(updatedOptions, span)));
            span.setStatus({
                status: "success"
            });
            return result;
        } catch (err) {
            span.setStatus({
                status: "error",
                error: err
            });
            throw err;
        } finally{
            span.end();
        }
    }
    function withContext(context, callback, ...callbackArgs) {
        return (0, instrumenter_js_1.getInstrumenter)().withContext(context, callback, ...callbackArgs);
    }
    /**
     * Parses a traceparent header value into a span identifier.
     *
     * @param traceparentHeader - The traceparent header to parse.
     * @returns An implementation-specific identifier for the span.
     */ function parseTraceparentHeader(traceparentHeader) {
        return (0, instrumenter_js_1.getInstrumenter)().parseTraceparentHeader(traceparentHeader);
    }
    /**
     * Creates a set of request headers to propagate tracing information to a backend.
     *
     * @param tracingContext - The context containing the span to serialize.
     * @returns The set of headers to add to a request.
     */ function createRequestHeaders(tracingContext) {
        return (0, instrumenter_js_1.getInstrumenter)().createRequestHeaders(tracingContext);
    }
    return {
        startSpan,
        withSpan,
        withContext,
        parseTraceparentHeader,
        createRequestHeaders
    };
} //# sourceMappingURL=tracingClient.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTracingClient = exports.useInstrumenter = void 0;
var instrumenter_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/instrumenter.js [app-route] (ecmascript)");
Object.defineProperty(exports, "useInstrumenter", {
    enumerable: true,
    get: function() {
        return instrumenter_js_1.useInstrumenter;
    }
});
var tracingClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/tracingClient.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createTracingClient", {
    enumerable: true,
    get: function() {
        return tracingClient_js_1.createTracingClient;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/rng.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>rng
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr = rnds8Pool.length;
function rng() {
    if (poolPtr > rnds8Pool.length - 16) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomFillSync(rnds8Pool);
        poolPtr = 0;
    }
    return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/regex.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$regex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/regex.js [app-route] (ecmascript)");
;
function validate(uuid) {
    return typeof uuid === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$regex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].test(uuid);
}
const __TURBOPACK__default__export__ = validate;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)");
;
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ const byteToHex = [];
for(let i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).substr(1));
}
function stringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
const __TURBOPACK__default__export__ = stringify;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/v1.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$rng$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/rng.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)"); // **`v1()` - Generate time-based UUID**
;
;
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;
let _clockseq; // Previous uuid creation time
let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
    let i = buf && offset || 0;
    const b = buf || new Array(16);
    options = options || {};
    let node = options.node || _nodeId;
    let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
    // specified.  We do this lazily to minimize issues related to insufficient
    // system entropy.  See #189
    if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$rng$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        if (node == null) {
            // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
            node = _nodeId = [
                seedBytes[0] | 0x01,
                seedBytes[1],
                seedBytes[2],
                seedBytes[3],
                seedBytes[4],
                seedBytes[5]
            ];
        }
        if (clockseq == null) {
            // Per 4.2.2, randomize (14 bit) clockseq
            clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
        }
    } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)
    const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) {
        clockseq = clockseq + 1 & 0x3fff;
    } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
    } // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000; // `time_low`
    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff; // `time_mid`
    const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff; // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`
    b[i++] = clockseq & 0xff; // `node`
    for(let n = 0; n < 6; ++n){
        b[i + n] = node[n];
    }
    return buf || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(b);
}
const __TURBOPACK__default__export__ = v1;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/parse.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)");
;
function parse(uuid) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Invalid UUID');
    }
    let v;
    const arr = new Uint8Array(16); // Parse ########-....-....-....-............
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 0xff;
    arr[2] = v >>> 8 & 0xff;
    arr[3] = v & 0xff; // Parse ........-####-....-....-............
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 0xff; // Parse ........-....-####-....-............
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 0xff; // Parse ........-....-....-####-............
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 0xff; // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
    arr[11] = v / 0x100000000 & 0xff;
    arr[12] = v >>> 24 & 0xff;
    arr[13] = v >>> 16 & 0xff;
    arr[14] = v >>> 8 & 0xff;
    arr[15] = v & 0xff;
    return arr;
}
const __TURBOPACK__default__export__ = parse;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/v35.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DNS",
    ()=>DNS,
    "URL",
    ()=>URL,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/parse.js [app-route] (ecmascript)");
;
;
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str)); // UTF8 escape
    const bytes = [];
    for(let i = 0; i < str.length; ++i){
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
}
const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function __TURBOPACK__default__export__(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
        if (typeof value === 'string') {
            value = stringToBytes(value);
        }
        if (typeof namespace === 'string') {
            namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(namespace);
        }
        if (namespace.length !== 16) {
            throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
        } // Compute hash of namespace and value, Per 4.3
        // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
        // hashfunc([...namespace, ... value])`
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 0x0f | version;
        bytes[8] = bytes[8] & 0x3f | 0x80;
        if (buf) {
            offset = offset || 0;
            for(let i = 0; i < 16; ++i){
                buf[offset + i] = bytes[i];
            }
            return buf;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(bytes);
    } // Function#name is not settable on some platforms (#270)
    try {
        generateUUID.name = name; // eslint-disable-next-line no-empty
    } catch (err) {} // For CommonJS default export support
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
}
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/md5.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
function md5(bytes) {
    if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
    } else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('md5').update(bytes).digest();
}
const __TURBOPACK__default__export__ = md5;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/v3.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v35$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/v35.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$md5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/md5.js [app-route] (ecmascript)");
;
;
const v3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v35$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])('v3', 0x30, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$md5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = v3;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/v4.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$rng$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/rng.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)");
;
;
function v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random || (options.rng || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$rng$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(rnds);
}
const __TURBOPACK__default__export__ = v4;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/sha1.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
function sha1(bytes) {
    if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
    } else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha1').update(bytes).digest();
}
const __TURBOPACK__default__export__ = sha1;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/v5.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v35$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/v35.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$sha1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/sha1.js [app-route] (ecmascript)");
;
;
const v5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v35$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])('v5', 0x50, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$sha1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = v5;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/nil.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = '00000000-0000-0000-0000-000000000000';
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/version.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)");
;
function version(uuid) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Invalid UUID');
    }
    return parseInt(uuid.substr(14, 1), 16);
}
const __TURBOPACK__default__export__ = version;
}),
"[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NIL",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$nil$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "parse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "stringify",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "v1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "v3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "v4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "v5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "validate",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "version",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$version$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/v1.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/v3.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/v4.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v5$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/v5.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$nil$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/nil.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$version$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/version.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/uuid/dist/esm-node/parse.js [app-route] (ecmascript)");
}),
"[project]/Downloads/mrpii 2/node_modules/safe-buffer/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ /* eslint-disable node/no-deprecated-api */ var buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
var Buffer = buffer.Buffer;
// alternative to using Object.keys for old browsers
function copyProps(src, dst) {
    for(var key in src){
        dst[key] = src[key];
    }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
    module.exports = buffer;
} else {
    // Copy properties from require('buffer')
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
}
function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
}
SafeBuffer.prototype = Object.create(Buffer.prototype);
// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);
SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
    }
    return Buffer(arg, encodingOrOffset, length);
};
SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    var buf = Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        } else {
            buf.fill(fill);
        }
    } else {
        buf.fill(0);
    }
    return buf;
};
SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return Buffer(size);
};
SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return buffer.SlowBuffer(size);
};
}),
"[project]/Downloads/mrpii 2/node_modules/jws/lib/data-stream.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module, process*/ var Buffer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
function DataStream(data) {
    this.buffer = null;
    this.writable = true;
    this.readable = true;
    // No input
    if (!data) {
        this.buffer = Buffer.alloc(0);
        return this;
    }
    // Stream
    if (typeof data.pipe === 'function') {
        this.buffer = Buffer.alloc(0);
        data.pipe(this);
        return this;
    }
    // Buffer or String
    // or Object (assumedly a passworded key)
    if (data.length || typeof data === 'object') {
        this.buffer = data;
        this.writable = false;
        process.nextTick((function() {
            this.emit('end', data);
            this.readable = false;
            this.emit('close');
        }).bind(this));
        return this;
    }
    throw new TypeError('Unexpected data type (' + typeof data + ')');
}
util.inherits(DataStream, Stream);
DataStream.prototype.write = function write(data) {
    this.buffer = Buffer.concat([
        this.buffer,
        Buffer.from(data)
    ]);
    this.emit('data', data);
};
DataStream.prototype.end = function end(data) {
    if (data) this.write(data);
    this.emit('end', data);
    this.emit('close');
    this.writable = false;
    this.readable = false;
};
module.exports = DataStream;
}),
"[project]/Downloads/mrpii 2/node_modules/jws/lib/tostring.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module*/ var Buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").Buffer;
module.exports = function toString(obj) {
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number' || Buffer.isBuffer(obj)) return obj.toString();
    return JSON.stringify(obj);
};
}),
"[project]/Downloads/mrpii 2/node_modules/jws/lib/sign-stream.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module*/ var Buffer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var DataStream = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jws/lib/data-stream.js [app-route] (ecmascript)");
var jwa = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jwa/index.js [app-route] (ecmascript)");
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
var toString = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jws/lib/tostring.js [app-route] (ecmascript)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
function base64url(string, encoding) {
    return Buffer.from(string, encoding).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function jwsSecuredInput(header, payload, encoding) {
    encoding = encoding || 'utf8';
    var encodedHeader = base64url(toString(header), 'binary');
    var encodedPayload = base64url(toString(payload), encoding);
    return util.format('%s.%s', encodedHeader, encodedPayload);
}
function jwsSign(opts) {
    var header = opts.header;
    var payload = opts.payload;
    var secretOrKey = opts.secret || opts.privateKey;
    var encoding = opts.encoding;
    var algo = jwa(header.alg);
    var securedInput = jwsSecuredInput(header, payload, encoding);
    var signature = algo.sign(securedInput, secretOrKey);
    return util.format('%s.%s', securedInput, signature);
}
function SignStream(opts) {
    var secret = opts.secret || opts.privateKey || opts.key;
    var secretStream = new DataStream(secret);
    this.readable = true;
    this.header = opts.header;
    this.encoding = opts.encoding;
    this.secret = this.privateKey = this.key = secretStream;
    this.payload = new DataStream(opts.payload);
    this.secret.once('close', (function() {
        if (!this.payload.writable && this.readable) this.sign();
    }).bind(this));
    this.payload.once('close', (function() {
        if (!this.secret.writable && this.readable) this.sign();
    }).bind(this));
}
util.inherits(SignStream, Stream);
SignStream.prototype.sign = function sign() {
    try {
        var signature = jwsSign({
            header: this.header,
            payload: this.payload.buffer,
            secret: this.secret.buffer,
            encoding: this.encoding
        });
        this.emit('done', signature);
        this.emit('data', signature);
        this.emit('end');
        this.readable = false;
        return signature;
    } catch (e) {
        this.readable = false;
        this.emit('error', e);
        this.emit('close');
    }
};
SignStream.sign = jwsSign;
module.exports = SignStream;
}),
"[project]/Downloads/mrpii 2/node_modules/jws/lib/verify-stream.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module*/ var Buffer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var DataStream = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jws/lib/data-stream.js [app-route] (ecmascript)");
var jwa = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jwa/index.js [app-route] (ecmascript)");
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
var toString = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jws/lib/tostring.js [app-route] (ecmascript)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
function isObject(thing) {
    return Object.prototype.toString.call(thing) === '[object Object]';
}
function safeJsonParse(thing) {
    if (isObject(thing)) return thing;
    try {
        return JSON.parse(thing);
    } catch (e) {
        return undefined;
    }
}
function headerFromJWS(jwsSig) {
    var encodedHeader = jwsSig.split('.', 1)[0];
    return safeJsonParse(Buffer.from(encodedHeader, 'base64').toString('binary'));
}
function securedInputFromJWS(jwsSig) {
    return jwsSig.split('.', 2).join('.');
}
function signatureFromJWS(jwsSig) {
    return jwsSig.split('.')[2];
}
function payloadFromJWS(jwsSig, encoding) {
    encoding = encoding || 'utf8';
    var payload = jwsSig.split('.')[1];
    return Buffer.from(payload, 'base64').toString(encoding);
}
function isValidJws(string) {
    return JWS_REGEX.test(string) && !!headerFromJWS(string);
}
function jwsVerify(jwsSig, algorithm, secretOrKey) {
    if (!algorithm) {
        var err = new Error("Missing algorithm parameter for jws.verify");
        err.code = "MISSING_ALGORITHM";
        throw err;
    }
    jwsSig = toString(jwsSig);
    var signature = signatureFromJWS(jwsSig);
    var securedInput = securedInputFromJWS(jwsSig);
    var algo = jwa(algorithm);
    return algo.verify(securedInput, signature, secretOrKey);
}
function jwsDecode(jwsSig, opts) {
    opts = opts || {};
    jwsSig = toString(jwsSig);
    if (!isValidJws(jwsSig)) return null;
    var header = headerFromJWS(jwsSig);
    if (!header) return null;
    var payload = payloadFromJWS(jwsSig);
    if (header.typ === 'JWT' || opts.json) payload = JSON.parse(payload, opts.encoding);
    return {
        header: header,
        payload: payload,
        signature: signatureFromJWS(jwsSig)
    };
}
function VerifyStream(opts) {
    opts = opts || {};
    var secretOrKey = opts.secret || opts.publicKey || opts.key;
    var secretStream = new DataStream(secretOrKey);
    this.readable = true;
    this.algorithm = opts.algorithm;
    this.encoding = opts.encoding;
    this.secret = this.publicKey = this.key = secretStream;
    this.signature = new DataStream(opts.signature);
    this.secret.once('close', (function() {
        if (!this.signature.writable && this.readable) this.verify();
    }).bind(this));
    this.signature.once('close', (function() {
        if (!this.secret.writable && this.readable) this.verify();
    }).bind(this));
}
util.inherits(VerifyStream, Stream);
VerifyStream.prototype.verify = function verify() {
    try {
        var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
        var obj = jwsDecode(this.signature.buffer, this.encoding);
        this.emit('done', valid, obj);
        this.emit('data', valid);
        this.emit('end');
        this.readable = false;
        return valid;
    } catch (e) {
        this.readable = false;
        this.emit('error', e);
        this.emit('close');
    }
};
VerifyStream.decode = jwsDecode;
VerifyStream.isValid = isValidJws;
VerifyStream.verify = jwsVerify;
module.exports = VerifyStream;
}),
"[project]/Downloads/mrpii 2/node_modules/jws/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global exports*/ var SignStream = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jws/lib/sign-stream.js [app-route] (ecmascript)");
var VerifyStream = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jws/lib/verify-stream.js [app-route] (ecmascript)");
var ALGORITHMS = [
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'PS256',
    'PS384',
    'PS512',
    'ES256',
    'ES384',
    'ES512'
];
exports.ALGORITHMS = ALGORITHMS;
exports.sign = SignStream.sign;
exports.verify = VerifyStream.verify;
exports.decode = VerifyStream.decode;
exports.isValid = VerifyStream.isValid;
exports.createSign = function createSign(opts) {
    return new SignStream(opts);
};
exports.createVerify = function createVerify(opts) {
    return new VerifyStream(opts);
};
}),
"[project]/Downloads/mrpii 2/node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function getParamSize(keySize) {
    var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
    return result;
}
var paramBytesForAlg = {
    ES256: getParamSize(256),
    ES384: getParamSize(384),
    ES512: getParamSize(521)
};
function getParamBytesForAlg(alg) {
    var paramBytes = paramBytesForAlg[alg];
    if (paramBytes) {
        return paramBytes;
    }
    throw new Error('Unknown algorithm "' + alg + '"');
}
module.exports = getParamBytesForAlg;
}),
"[project]/Downloads/mrpii 2/node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Buffer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var getParamBytesForAlg = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js [app-route] (ecmascript)");
var MAX_OCTET = 0x80, CLASS_UNIVERSAL = 0, PRIMITIVE_BIT = 0x20, TAG_SEQ = 0x10, TAG_INT = 0x02, ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6, ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
function base64Url(base64) {
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function signatureAsBuffer(signature) {
    if (Buffer.isBuffer(signature)) {
        return signature;
    } else if ('string' === typeof signature) {
        return Buffer.from(signature, 'base64');
    }
    throw new TypeError('ECDSA signature must be a Base64 string or a Buffer');
}
function derToJose(signature, alg) {
    signature = signatureAsBuffer(signature);
    var paramBytes = getParamBytesForAlg(alg);
    // the DER encoded param should at most be the param size, plus a padding
    // zero, since due to being a signed integer
    var maxEncodedParamLength = paramBytes + 1;
    var inputLength = signature.length;
    var offset = 0;
    if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
    }
    var seqLength = signature[offset++];
    if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
    }
    if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
    }
    if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
    }
    var rLength = signature[offset++];
    if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
    }
    if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
    }
    var rOffset = offset;
    offset += rLength;
    if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
    }
    var sLength = signature[offset++];
    if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
    }
    if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
    }
    var sOffset = offset;
    offset += sLength;
    if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
    }
    var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
    var dst = Buffer.allocUnsafe(rPadding + rLength + sPadding + sLength);
    for(offset = 0; offset < rPadding; ++offset){
        dst[offset] = 0;
    }
    signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
    offset = paramBytes;
    for(var o = offset; offset < o + sPadding; ++offset){
        dst[offset] = 0;
    }
    signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
    dst = dst.toString('base64');
    dst = base64Url(dst);
    return dst;
}
function countPadding(buf, start, stop) {
    var padding = 0;
    while(start + padding < stop && buf[start + padding] === 0){
        ++padding;
    }
    var needsSign = buf[start + padding] >= MAX_OCTET;
    if (needsSign) {
        --padding;
    }
    return padding;
}
function joseToDer(signature, alg) {
    signature = signatureAsBuffer(signature);
    var paramBytes = getParamBytesForAlg(alg);
    var signatureBytes = signature.length;
    if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
    }
    var rPadding = countPadding(signature, 0, paramBytes);
    var sPadding = countPadding(signature, paramBytes, signature.length);
    var rLength = paramBytes - rPadding;
    var sLength = paramBytes - sPadding;
    var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
    var shortLength = rsBytes < MAX_OCTET;
    var dst = Buffer.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
    var offset = 0;
    dst[offset++] = ENCODED_TAG_SEQ;
    if (shortLength) {
        // Bit 8 has value "0"
        // bits 7-1 give the length.
        dst[offset++] = rsBytes;
    } else {
        // Bit 8 of first octet has value "1"
        // bits 7-1 give the number of additional length octets.
        dst[offset++] = MAX_OCTET | 1;
        // length, base 256
        dst[offset++] = rsBytes & 0xff;
    }
    dst[offset++] = ENCODED_TAG_INT;
    dst[offset++] = rLength;
    if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
    } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
    }
    dst[offset++] = ENCODED_TAG_INT;
    dst[offset++] = sLength;
    if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
    } else {
        signature.copy(dst, offset, paramBytes + sPadding);
    }
    return dst;
}
module.exports = {
    derToJose: derToJose,
    joseToDer: joseToDer
};
}),
"[project]/Downloads/mrpii 2/node_modules/buffer-equal-constant-time/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*jshint node:true */ var Buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").Buffer; // browserify
var SlowBuffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").SlowBuffer;
module.exports = bufferEq;
function bufferEq(a, b) {
    // shortcutting on type is necessary for correctness
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        return false;
    }
    // buffer sizes should be well-known information, so despite this
    // shortcutting, it doesn't leak any information about the *contents* of the
    // buffers.
    if (a.length !== b.length) {
        return false;
    }
    var c = 0;
    for(var i = 0; i < a.length; i++){
        /*jshint bitwise:false */ c |= a[i] ^ b[i]; // XOR
    }
    return c === 0;
}
bufferEq.install = function() {
    Buffer.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
        return bufferEq(this, that);
    };
};
var origBufEqual = Buffer.prototype.equal;
var origSlowBufEqual = SlowBuffer.prototype.equal;
bufferEq.restore = function() {
    Buffer.prototype.equal = origBufEqual;
    SlowBuffer.prototype.equal = origSlowBufEqual;
};
}),
"[project]/Downloads/mrpii 2/node_modules/jwa/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var Buffer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
var formatEcdsa = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js [app-route] (ecmascript)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
var MSG_INVALID_SECRET = 'secret must be a string or buffer';
var MSG_INVALID_VERIFIER_KEY = 'key must be a string or a buffer';
var MSG_INVALID_SIGNER_KEY = 'key must be a string, a buffer or an object';
var supportsKeyObjects = typeof crypto.createPublicKey === 'function';
if (supportsKeyObjects) {
    MSG_INVALID_VERIFIER_KEY += ' or a KeyObject';
    MSG_INVALID_SECRET += 'or a KeyObject';
}
function checkIsPublicKey(key) {
    if (Buffer.isBuffer(key)) {
        return;
    }
    if (typeof key === 'string') {
        return;
    }
    if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key !== 'object') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key.type !== 'string') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key.asymmetricKeyType !== 'string') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key.export !== 'function') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
}
;
function checkIsPrivateKey(key) {
    if (Buffer.isBuffer(key)) {
        return;
    }
    if (typeof key === 'string') {
        return;
    }
    if (typeof key === 'object') {
        return;
    }
    throw typeError(MSG_INVALID_SIGNER_KEY);
}
;
function checkIsSecretKey(key) {
    if (Buffer.isBuffer(key)) {
        return;
    }
    if (typeof key === 'string') {
        return key;
    }
    if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_SECRET);
    }
    if (typeof key !== 'object') {
        throw typeError(MSG_INVALID_SECRET);
    }
    if (key.type !== 'secret') {
        throw typeError(MSG_INVALID_SECRET);
    }
    if (typeof key.export !== 'function') {
        throw typeError(MSG_INVALID_SECRET);
    }
}
function fromBase64(base64) {
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function toBase64(base64url) {
    base64url = base64url.toString();
    var padding = 4 - base64url.length % 4;
    if (padding !== 4) {
        for(var i = 0; i < padding; ++i){
            base64url += '=';
        }
    }
    return base64url.replace(/\-/g, '+').replace(/_/g, '/');
}
function typeError(template) {
    var args = [].slice.call(arguments, 1);
    var errMsg = util.format.bind(util, template).apply(null, args);
    return new TypeError(errMsg);
}
function bufferOrString(obj) {
    return Buffer.isBuffer(obj) || typeof obj === 'string';
}
function normalizeInput(thing) {
    if (!bufferOrString(thing)) thing = JSON.stringify(thing);
    return thing;
}
function createHmacSigner(bits) {
    return function sign(thing, secret) {
        checkIsSecretKey(secret);
        thing = normalizeInput(thing);
        var hmac = crypto.createHmac('sha' + bits, secret);
        var sig = (hmac.update(thing), hmac.digest('base64'));
        return fromBase64(sig);
    };
}
var bufferEqual;
var timingSafeEqual = 'timingSafeEqual' in crypto ? function timingSafeEqual(a, b) {
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    return crypto.timingSafeEqual(a, b);
} : function timingSafeEqual(a, b) {
    if (!bufferEqual) {
        bufferEqual = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/buffer-equal-constant-time/index.js [app-route] (ecmascript)");
    }
    return bufferEqual(a, b);
};
function createHmacVerifier(bits) {
    return function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return timingSafeEqual(Buffer.from(signature), Buffer.from(computedSig));
    };
}
function createKeySigner(bits) {
    return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        // Even though we are specifying "RSA" here, this works with ECDSA
        // keys as well.
        var signer = crypto.createSign('RSA-SHA' + bits);
        var sig = (signer.update(thing), signer.sign(privateKey, 'base64'));
        return fromBase64(sig);
    };
}
function createKeyVerifier(bits) {
    return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify('RSA-SHA' + bits);
        verifier.update(thing);
        return verifier.verify(publicKey, signature, 'base64');
    };
}
function createPSSKeySigner(bits) {
    return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto.createSign('RSA-SHA' + bits);
        var sig = (signer.update(thing), signer.sign({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, 'base64'));
        return fromBase64(sig);
    };
}
function createPSSKeyVerifier(bits) {
    return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify('RSA-SHA' + bits);
        verifier.update(thing);
        return verifier.verify({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, signature, 'base64');
    };
}
function createECDSASigner(bits) {
    var inner = createKeySigner(bits);
    return function sign() {
        var signature = inner.apply(null, arguments);
        signature = formatEcdsa.derToJose(signature, 'ES' + bits);
        return signature;
    };
}
function createECDSAVerifer(bits) {
    var inner = createKeyVerifier(bits);
    return function verify(thing, signature, publicKey) {
        signature = formatEcdsa.joseToDer(signature, 'ES' + bits).toString('base64');
        var result = inner(thing, signature, publicKey);
        return result;
    };
}
function createNoneSigner() {
    return function sign() {
        return '';
    };
}
function createNoneVerifier() {
    return function verify(thing, signature) {
        return signature === '';
    };
}
module.exports = function jwa(algorithm) {
    var signerFactories = {
        hs: createHmacSigner,
        rs: createKeySigner,
        ps: createPSSKeySigner,
        es: createECDSASigner,
        none: createNoneSigner
    };
    var verifierFactories = {
        hs: createHmacVerifier,
        rs: createKeyVerifier,
        ps: createPSSKeyVerifier,
        es: createECDSAVerifer,
        none: createNoneVerifier
    };
    var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
    if (!match) throw typeError(MSG_INVALID_ALGORITHM, algorithm);
    var algo = (match[1] || match[3]).toLowerCase();
    var bits = match[2];
    return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
    };
};
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/decode.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var jws = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jws/index.js [app-route] (ecmascript)");
module.exports = function(jwt, options) {
    options = options || {};
    var decoded = jws.decode(jwt, options);
    if (!decoded) {
        return null;
    }
    var payload = decoded.payload;
    //try parse the payload
    if (typeof payload === 'string') {
        try {
            var obj = JSON.parse(payload);
            if (obj !== null && typeof obj === 'object') {
                payload = obj;
            }
        } catch (e) {}
    }
    //return header if `complete` option is enabled.  header includes claims
    //such as `kid` and `alg` used to select the key within a JWKS needed to
    //verify the signature
    if (options.complete === true) {
        return {
            header: decoded.header,
            payload: payload,
            signature: decoded.signature
        };
    }
    return payload;
};
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/JsonWebTokenError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var JsonWebTokenError = function(message, error) {
    Error.call(this, message);
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }
    this.name = 'JsonWebTokenError';
    this.message = message;
    if (error) this.inner = error;
};
JsonWebTokenError.prototype = Object.create(Error.prototype);
JsonWebTokenError.prototype.constructor = JsonWebTokenError;
module.exports = JsonWebTokenError;
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/NotBeforeError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var JsonWebTokenError = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/JsonWebTokenError.js [app-route] (ecmascript)");
var NotBeforeError = function(message, date) {
    JsonWebTokenError.call(this, message);
    this.name = 'NotBeforeError';
    this.date = date;
};
NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);
NotBeforeError.prototype.constructor = NotBeforeError;
module.exports = NotBeforeError;
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/TokenExpiredError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var JsonWebTokenError = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/JsonWebTokenError.js [app-route] (ecmascript)");
var TokenExpiredError = function(message, expiredAt) {
    JsonWebTokenError.call(this, message);
    this.name = 'TokenExpiredError';
    this.expiredAt = expiredAt;
};
TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);
TokenExpiredError.prototype.constructor = TokenExpiredError;
module.exports = TokenExpiredError;
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/timespan.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var ms = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/ms/index.js [app-route] (ecmascript)");
module.exports = function(time, iat) {
    var timestamp = iat || Math.floor(Date.now() / 1000);
    if (typeof time === 'string') {
        var milliseconds = ms(time);
        if (typeof milliseconds === 'undefined') {
            return;
        }
        return Math.floor(timestamp + milliseconds / 1000);
    } else if (typeof time === 'number') {
        return timestamp + time;
    } else {
        return;
    }
};
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const semver = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/index.js [app-route] (ecmascript)");
module.exports = semver.satisfies(process.version, '>=15.7.0');
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const semver = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/index.js [app-route] (ecmascript)");
module.exports = semver.satisfies(process.version, '>=16.9.0');
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/validateAsymmetricKey.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const ASYMMETRIC_KEY_DETAILS_SUPPORTED = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js [app-route] (ecmascript)");
const RSA_PSS_KEY_DETAILS_SUPPORTED = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js [app-route] (ecmascript)");
const allowedAlgorithmsForKeys = {
    'ec': [
        'ES256',
        'ES384',
        'ES512'
    ],
    'rsa': [
        'RS256',
        'PS256',
        'RS384',
        'PS384',
        'RS512',
        'PS512'
    ],
    'rsa-pss': [
        'PS256',
        'PS384',
        'PS512'
    ]
};
const allowedCurves = {
    ES256: 'prime256v1',
    ES384: 'secp384r1',
    ES512: 'secp521r1'
};
module.exports = function(algorithm, key) {
    if (!algorithm || !key) return;
    const keyType = key.asymmetricKeyType;
    if (!keyType) return;
    const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];
    if (!allowedAlgorithms) {
        throw new Error(`Unknown key type "${keyType}".`);
    }
    if (!allowedAlgorithms.includes(algorithm)) {
        throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(', ')}.`);
    }
    /*
   * Ignore the next block from test coverage because it gets executed
   * conditionally depending on the Node version. Not ignoring it would
   * prevent us from reaching the target % of coverage for versions of
   * Node under 15.7.0.
   */ /* istanbul ignore next */ if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
        switch(keyType){
            case 'ec':
                const keyCurve = key.asymmetricKeyDetails.namedCurve;
                const allowedCurve = allowedCurves[algorithm];
                if (keyCurve !== allowedCurve) {
                    throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
                }
                break;
            case 'rsa-pss':
                if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
                    const length = parseInt(algorithm.slice(-3), 10);
                    const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
                    if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
                        throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
                    }
                    if (saltLength !== undefined && saltLength > length >> 3) {
                        throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`);
                    }
                }
                break;
        }
    }
};
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/psSupported.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var semver = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/index.js [app-route] (ecmascript)");
module.exports = semver.satisfies(process.version, '^6.12.0 || >=8.0.0');
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/verify.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const JsonWebTokenError = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/JsonWebTokenError.js [app-route] (ecmascript)");
const NotBeforeError = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/NotBeforeError.js [app-route] (ecmascript)");
const TokenExpiredError = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/TokenExpiredError.js [app-route] (ecmascript)");
const decode = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/decode.js [app-route] (ecmascript)");
const timespan = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/timespan.js [app-route] (ecmascript)");
const validateAsymmetricKey = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/validateAsymmetricKey.js [app-route] (ecmascript)");
const PS_SUPPORTED = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/psSupported.js [app-route] (ecmascript)");
const jws = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jws/index.js [app-route] (ecmascript)");
const { KeyObject, createSecretKey, createPublicKey } = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const PUB_KEY_ALGS = [
    'RS256',
    'RS384',
    'RS512'
];
const EC_KEY_ALGS = [
    'ES256',
    'ES384',
    'ES512'
];
const RSA_KEY_ALGS = [
    'RS256',
    'RS384',
    'RS512'
];
const HS_ALGS = [
    'HS256',
    'HS384',
    'HS512'
];
if (PS_SUPPORTED) {
    PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, 'PS256', 'PS384', 'PS512');
    RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, 'PS256', 'PS384', 'PS512');
}
module.exports = function(jwtString, secretOrPublicKey, options, callback) {
    if (typeof options === 'function' && !callback) {
        callback = options;
        options = {};
    }
    if (!options) {
        options = {};
    }
    //clone this object since we are going to mutate it.
    options = Object.assign({}, options);
    let done;
    if (callback) {
        done = callback;
    } else {
        done = function(err, data) {
            if (err) throw err;
            return data;
        };
    }
    if (options.clockTimestamp && typeof options.clockTimestamp !== 'number') {
        return done(new JsonWebTokenError('clockTimestamp must be a number'));
    }
    if (options.nonce !== undefined && (typeof options.nonce !== 'string' || options.nonce.trim() === '')) {
        return done(new JsonWebTokenError('nonce must be a non-empty string'));
    }
    if (options.allowInvalidAsymmetricKeyTypes !== undefined && typeof options.allowInvalidAsymmetricKeyTypes !== 'boolean') {
        return done(new JsonWebTokenError('allowInvalidAsymmetricKeyTypes must be a boolean'));
    }
    const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1000);
    if (!jwtString) {
        return done(new JsonWebTokenError('jwt must be provided'));
    }
    if (typeof jwtString !== 'string') {
        return done(new JsonWebTokenError('jwt must be a string'));
    }
    const parts = jwtString.split('.');
    if (parts.length !== 3) {
        return done(new JsonWebTokenError('jwt malformed'));
    }
    let decodedToken;
    try {
        decodedToken = decode(jwtString, {
            complete: true
        });
    } catch (err) {
        return done(err);
    }
    if (!decodedToken) {
        return done(new JsonWebTokenError('invalid token'));
    }
    const header = decodedToken.header;
    let getSecret;
    if (typeof secretOrPublicKey === 'function') {
        if (!callback) {
            return done(new JsonWebTokenError('verify must be called asynchronous if secret or public key is provided as a callback'));
        }
        getSecret = secretOrPublicKey;
    } else {
        getSecret = function(header, secretCallback) {
            return secretCallback(null, secretOrPublicKey);
        };
    }
    return getSecret(header, function(err, secretOrPublicKey) {
        if (err) {
            return done(new JsonWebTokenError('error in secret or public key callback: ' + err.message));
        }
        const hasSignature = parts[2].trim() !== '';
        if (!hasSignature && secretOrPublicKey) {
            return done(new JsonWebTokenError('jwt signature is required'));
        }
        if (hasSignature && !secretOrPublicKey) {
            return done(new JsonWebTokenError('secret or public key must be provided'));
        }
        if (!hasSignature && !options.algorithms) {
            return done(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
        }
        if (secretOrPublicKey != null && !(secretOrPublicKey instanceof KeyObject)) {
            try {
                secretOrPublicKey = createPublicKey(secretOrPublicKey);
            } catch (_) {
                try {
                    secretOrPublicKey = createSecretKey(typeof secretOrPublicKey === 'string' ? Buffer.from(secretOrPublicKey) : secretOrPublicKey);
                } catch (_) {
                    return done(new JsonWebTokenError('secretOrPublicKey is not valid key material'));
                }
            }
        }
        if (!options.algorithms) {
            if (secretOrPublicKey.type === 'secret') {
                options.algorithms = HS_ALGS;
            } else if ([
                'rsa',
                'rsa-pss'
            ].includes(secretOrPublicKey.asymmetricKeyType)) {
                options.algorithms = RSA_KEY_ALGS;
            } else if (secretOrPublicKey.asymmetricKeyType === 'ec') {
                options.algorithms = EC_KEY_ALGS;
            } else {
                options.algorithms = PUB_KEY_ALGS;
            }
        }
        if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
            return done(new JsonWebTokenError('invalid algorithm'));
        }
        if (header.alg.startsWith('HS') && secretOrPublicKey.type !== 'secret') {
            return done(new JsonWebTokenError(`secretOrPublicKey must be a symmetric key when using ${header.alg}`));
        } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey.type !== 'public') {
            return done(new JsonWebTokenError(`secretOrPublicKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInvalidAsymmetricKeyTypes) {
            try {
                validateAsymmetricKey(header.alg, secretOrPublicKey);
            } catch (e) {
                return done(e);
            }
        }
        let valid;
        try {
            valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey);
        } catch (e) {
            return done(e);
        }
        if (!valid) {
            return done(new JsonWebTokenError('invalid signature'));
        }
        const payload = decodedToken.payload;
        if (typeof payload.nbf !== 'undefined' && !options.ignoreNotBefore) {
            if (typeof payload.nbf !== 'number') {
                return done(new JsonWebTokenError('invalid nbf value'));
            }
            if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
                return done(new NotBeforeError('jwt not active', new Date(payload.nbf * 1000)));
            }
        }
        if (typeof payload.exp !== 'undefined' && !options.ignoreExpiration) {
            if (typeof payload.exp !== 'number') {
                return done(new JsonWebTokenError('invalid exp value'));
            }
            if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
                return done(new TokenExpiredError('jwt expired', new Date(payload.exp * 1000)));
            }
        }
        if (options.audience) {
            const audiences = Array.isArray(options.audience) ? options.audience : [
                options.audience
            ];
            const target = Array.isArray(payload.aud) ? payload.aud : [
                payload.aud
            ];
            const match = target.some(function(targetAudience) {
                return audiences.some(function(audience) {
                    return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
                });
            });
            if (!match) {
                return done(new JsonWebTokenError('jwt audience invalid. expected: ' + audiences.join(' or ')));
            }
        }
        if (options.issuer) {
            const invalid_issuer = typeof options.issuer === 'string' && payload.iss !== options.issuer || Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1;
            if (invalid_issuer) {
                return done(new JsonWebTokenError('jwt issuer invalid. expected: ' + options.issuer));
            }
        }
        if (options.subject) {
            if (payload.sub !== options.subject) {
                return done(new JsonWebTokenError('jwt subject invalid. expected: ' + options.subject));
            }
        }
        if (options.jwtid) {
            if (payload.jti !== options.jwtid) {
                return done(new JsonWebTokenError('jwt jwtid invalid. expected: ' + options.jwtid));
            }
        }
        if (options.nonce) {
            if (payload.nonce !== options.nonce) {
                return done(new JsonWebTokenError('jwt nonce invalid. expected: ' + options.nonce));
            }
        }
        if (options.maxAge) {
            if (typeof payload.iat !== 'number') {
                return done(new JsonWebTokenError('iat required when maxAge is specified'));
            }
            const maxAgeTimestamp = timespan(options.maxAge, payload.iat);
            if (typeof maxAgeTimestamp === 'undefined') {
                return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
            }
            if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
                return done(new TokenExpiredError('maxAge exceeded', new Date(maxAgeTimestamp * 1000)));
            }
        }
        if (options.complete === true) {
            const signature = decodedToken.signature;
            return done(null, {
                header: header,
                payload: payload,
                signature: signature
            });
        }
        return done(null, payload);
    });
};
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/sign.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const timespan = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/timespan.js [app-route] (ecmascript)");
const PS_SUPPORTED = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/psSupported.js [app-route] (ecmascript)");
const validateAsymmetricKey = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/validateAsymmetricKey.js [app-route] (ecmascript)");
const jws = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jws/index.js [app-route] (ecmascript)");
const includes = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/lodash.includes/index.js [app-route] (ecmascript)");
const isBoolean = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/lodash.isboolean/index.js [app-route] (ecmascript)");
const isInteger = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/lodash.isinteger/index.js [app-route] (ecmascript)");
const isNumber = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/lodash.isnumber/index.js [app-route] (ecmascript)");
const isPlainObject = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/lodash.isplainobject/index.js [app-route] (ecmascript)");
const isString = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/lodash.isstring/index.js [app-route] (ecmascript)");
const once = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/lodash.once/index.js [app-route] (ecmascript)");
const { KeyObject, createSecretKey, createPrivateKey } = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const SUPPORTED_ALGS = [
    'RS256',
    'RS384',
    'RS512',
    'ES256',
    'ES384',
    'ES512',
    'HS256',
    'HS384',
    'HS512',
    'none'
];
if (PS_SUPPORTED) {
    SUPPORTED_ALGS.splice(3, 0, 'PS256', 'PS384', 'PS512');
}
const sign_options_schema = {
    expiresIn: {
        isValid: function(value) {
            return isInteger(value) || isString(value) && value;
        },
        message: '"expiresIn" should be a number of seconds or string representing a timespan'
    },
    notBefore: {
        isValid: function(value) {
            return isInteger(value) || isString(value) && value;
        },
        message: '"notBefore" should be a number of seconds or string representing a timespan'
    },
    audience: {
        isValid: function(value) {
            return isString(value) || Array.isArray(value);
        },
        message: '"audience" must be a string or array'
    },
    algorithm: {
        isValid: includes.bind(null, SUPPORTED_ALGS),
        message: '"algorithm" must be a valid string enum value'
    },
    header: {
        isValid: isPlainObject,
        message: '"header" must be an object'
    },
    encoding: {
        isValid: isString,
        message: '"encoding" must be a string'
    },
    issuer: {
        isValid: isString,
        message: '"issuer" must be a string'
    },
    subject: {
        isValid: isString,
        message: '"subject" must be a string'
    },
    jwtid: {
        isValid: isString,
        message: '"jwtid" must be a string'
    },
    noTimestamp: {
        isValid: isBoolean,
        message: '"noTimestamp" must be a boolean'
    },
    keyid: {
        isValid: isString,
        message: '"keyid" must be a string'
    },
    mutatePayload: {
        isValid: isBoolean,
        message: '"mutatePayload" must be a boolean'
    },
    allowInsecureKeySizes: {
        isValid: isBoolean,
        message: '"allowInsecureKeySizes" must be a boolean'
    },
    allowInvalidAsymmetricKeyTypes: {
        isValid: isBoolean,
        message: '"allowInvalidAsymmetricKeyTypes" must be a boolean'
    }
};
const registered_claims_schema = {
    iat: {
        isValid: isNumber,
        message: '"iat" should be a number of seconds'
    },
    exp: {
        isValid: isNumber,
        message: '"exp" should be a number of seconds'
    },
    nbf: {
        isValid: isNumber,
        message: '"nbf" should be a number of seconds'
    }
};
function validate(schema, allowUnknown, object, parameterName) {
    if (!isPlainObject(object)) {
        throw new Error('Expected "' + parameterName + '" to be a plain object.');
    }
    Object.keys(object).forEach(function(key) {
        const validator = schema[key];
        if (!validator) {
            if (!allowUnknown) {
                throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
            }
            return;
        }
        if (!validator.isValid(object[key])) {
            throw new Error(validator.message);
        }
    });
}
function validateOptions(options) {
    return validate(sign_options_schema, false, options, 'options');
}
function validatePayload(payload) {
    return validate(registered_claims_schema, true, payload, 'payload');
}
const options_to_payload = {
    'audience': 'aud',
    'issuer': 'iss',
    'subject': 'sub',
    'jwtid': 'jti'
};
const options_for_objects = [
    'expiresIn',
    'notBefore',
    'noTimestamp',
    'audience',
    'issuer',
    'subject',
    'jwtid'
];
module.exports = function(payload, secretOrPrivateKey, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    } else {
        options = options || {};
    }
    const isObjectPayload = typeof payload === 'object' && !Buffer.isBuffer(payload);
    const header = Object.assign({
        alg: options.algorithm || 'HS256',
        typ: isObjectPayload ? 'JWT' : undefined,
        kid: options.keyid
    }, options.header);
    function failure(err) {
        if (callback) {
            return callback(err);
        }
        throw err;
    }
    if (!secretOrPrivateKey && options.algorithm !== 'none') {
        return failure(new Error('secretOrPrivateKey must have a value'));
    }
    if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
        try {
            secretOrPrivateKey = createPrivateKey(secretOrPrivateKey);
        } catch (_) {
            try {
                secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === 'string' ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey);
            } catch (_) {
                return failure(new Error('secretOrPrivateKey is not valid key material'));
            }
        }
    }
    if (header.alg.startsWith('HS') && secretOrPrivateKey.type !== 'secret') {
        return failure(new Error(`secretOrPrivateKey must be a symmetric key when using ${header.alg}`));
    } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
        if (secretOrPrivateKey.type !== 'private') {
            return failure(new Error(`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInsecureKeySizes && !header.alg.startsWith('ES') && secretOrPrivateKey.asymmetricKeyDetails !== undefined && //KeyObject.asymmetricKeyDetails is supported in Node 15+
        secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
            return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
        }
    }
    if (typeof payload === 'undefined') {
        return failure(new Error('payload is required'));
    } else if (isObjectPayload) {
        try {
            validatePayload(payload);
        } catch (error) {
            return failure(error);
        }
        if (!options.mutatePayload) {
            payload = Object.assign({}, payload);
        }
    } else {
        const invalid_options = options_for_objects.filter(function(opt) {
            return typeof options[opt] !== 'undefined';
        });
        if (invalid_options.length > 0) {
            return failure(new Error('invalid ' + invalid_options.join(',') + ' option for ' + typeof payload + ' payload'));
        }
    }
    if (typeof payload.exp !== 'undefined' && typeof options.expiresIn !== 'undefined') {
        return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
    }
    if (typeof payload.nbf !== 'undefined' && typeof options.notBefore !== 'undefined') {
        return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
    }
    try {
        validateOptions(options);
    } catch (error) {
        return failure(error);
    }
    if (!options.allowInvalidAsymmetricKeyTypes) {
        try {
            validateAsymmetricKey(header.alg, secretOrPrivateKey);
        } catch (error) {
            return failure(error);
        }
    }
    const timestamp = payload.iat || Math.floor(Date.now() / 1000);
    if (options.noTimestamp) {
        delete payload.iat;
    } else if (isObjectPayload) {
        payload.iat = timestamp;
    }
    if (typeof options.notBefore !== 'undefined') {
        try {
            payload.nbf = timespan(options.notBefore, timestamp);
        } catch (err) {
            return failure(err);
        }
        if (typeof payload.nbf === 'undefined') {
            return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
    }
    if (typeof options.expiresIn !== 'undefined' && typeof payload === 'object') {
        try {
            payload.exp = timespan(options.expiresIn, timestamp);
        } catch (err) {
            return failure(err);
        }
        if (typeof payload.exp === 'undefined') {
            return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
    }
    Object.keys(options_to_payload).forEach(function(key) {
        const claim = options_to_payload[key];
        if (typeof options[key] !== 'undefined') {
            if (typeof payload[claim] !== 'undefined') {
                return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
            }
            payload[claim] = options[key];
        }
    });
    const encoding = options.encoding || 'utf8';
    if (typeof callback === 'function') {
        callback = callback && once(callback);
        jws.createSign({
            header: header,
            privateKey: secretOrPrivateKey,
            payload: payload,
            encoding: encoding
        }).once('error', callback).once('done', function(signature) {
            // TODO: Remove in favor of the modulus length check before signing once node 15+ is the minimum supported version
            if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
                return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
            }
            callback(null, signature);
        });
    } else {
        let signature = jws.sign({
            header: header,
            payload: payload,
            secret: secretOrPrivateKey,
            encoding: encoding
        });
        // TODO: Remove in favor of the modulus length check before signing once node 15+ is the minimum supported version
        if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
            throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`);
        }
        return signature;
    }
};
}),
"[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    decode: __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/decode.js [app-route] (ecmascript)"),
    verify: __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/verify.js [app-route] (ecmascript)"),
    sign: __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/sign.js [app-route] (ecmascript)"),
    JsonWebTokenError: __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/JsonWebTokenError.js [app-route] (ecmascript)"),
    NotBeforeError: __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/NotBeforeError.js [app-route] (ecmascript)"),
    TokenExpiredError: __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/jsonwebtoken/lib/TokenExpiredError.js [app-route] (ecmascript)")
};
}),
"[project]/Downloads/mrpii 2/node_modules/semver/internal/constants.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0';
const MAX_LENGTH = 256;
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */ 9007199254740991;
// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16;
// Max safe length for a build identifier. The max length minus 6 characters for
// the shortest version with a build 0.0.0+BUILD.
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
const RELEASE_TYPES = [
    'major',
    'premajor',
    'minor',
    'preminor',
    'patch',
    'prepatch',
    'prerelease'
];
module.exports = {
    MAX_LENGTH,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 0b001,
    FLAG_LOOSE: 0b010
};
}),
"[project]/Downloads/mrpii 2/node_modules/semver/internal/debug.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const debug = typeof process === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args)=>console.error('SEMVER', ...args) : ()=>{};
module.exports = debug;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/internal/re.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { MAX_SAFE_COMPONENT_LENGTH, MAX_SAFE_BUILD_LENGTH, MAX_LENGTH } = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/constants.js [app-route] (ecmascript)");
const debug = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/debug.js [app-route] (ecmascript)");
exports = module.exports = {};
// The actual regexps go on exports.re
const re = exports.re = [];
const safeRe = exports.safeRe = [];
const src = exports.src = [];
const safeSrc = exports.safeSrc = [];
const t = exports.t = {};
let R = 0;
const LETTERDASHNUMBER = '[a-zA-Z0-9-]';
// Replace some greedy regex tokens to prevent regex dos issues. These regex are
// used internally via the safeRe object since all inputs in this library get
// normalized first to trim and collapse all extra whitespace. The original
// regexes are exported for userland consumption and lower level usage. A
// future breaking change could export the safer regex only with a note that
// all input should have extra whitespace removed.
const safeRegexReplacements = [
    [
        '\\s',
        1
    ],
    [
        '\\d',
        MAX_LENGTH
    ],
    [
        LETTERDASHNUMBER,
        MAX_SAFE_BUILD_LENGTH
    ]
];
const makeSafeRegex = (value)=>{
    for (const [token, max] of safeRegexReplacements){
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
    }
    return value;
};
const createToken = (name, value, isGlobal)=>{
    const safe = makeSafeRegex(value);
    const index = R++;
    debug(name, index, value);
    t[name] = index;
    src[index] = value;
    safeSrc[index] = safe;
    re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
    safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined);
};
// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.
// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.
createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
createToken('NUMERICIDENTIFIERLOOSE', '\\d+');
// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.
createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
// ## Main Version
// Three dot-separated numeric identifiers.
createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})`);
createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})`);
// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.
// Non-numberic identifiers include numberic identifiers but can be longer.
// Therefore non-numberic identifiers must go first.
createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.
createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.
createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`);
// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.
createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.
// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.
createToken('FULLPLAIN', `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
createToken('FULL', `^${src[t.FULLPLAIN]}$`);
// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);
createToken('GTLT', '((?:<|>)?=?)');
// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?` + `)?)?`);
createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?` + `)?)?`);
createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCEPLAIN', `${'(^|[^\\d])' + '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
createToken('COERCEFULL', src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?` + `(?:${src[t.BUILD]})?` + `(?:$|[^\\d])`);
createToken('COERCERTL', src[t.COERCE], true);
createToken('COERCERTLFULL', src[t.COERCEFULL], true);
// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)');
createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
exports.tildeTrimReplace = '$1~';
createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)');
createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
exports.caretTrimReplace = '$1^';
createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
exports.comparatorTrimReplace = '$1$2$3';
// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAIN]})` + `\\s*$`);
createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAINLOOSE]})` + `\\s*$`);
// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*');
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
}),
"[project]/Downloads/mrpii 2/node_modules/semver/internal/parse-options.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// parse out just the options we care about
const looseOption = Object.freeze({
    loose: true
});
const emptyOpts = Object.freeze({});
const parseOptions = (options)=>{
    if (!options) {
        return emptyOpts;
    }
    if (typeof options !== 'object') {
        return looseOption;
    }
    return options;
};
module.exports = parseOptions;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/internal/identifiers.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const numeric = /^[0-9]+$/;
const compareIdentifiers = (a, b)=>{
    const anum = numeric.test(a);
    const bnum = numeric.test(b);
    if (anum && bnum) {
        a = +a;
        b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b)=>compareIdentifiers(b, a);
module.exports = {
    compareIdentifiers,
    rcompareIdentifiers
};
}),
"[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const debug = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/debug.js [app-route] (ecmascript)");
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/constants.js [app-route] (ecmascript)");
const { safeRe: re, t } = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/re.js [app-route] (ecmascript)");
const parseOptions = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/parse-options.js [app-route] (ecmascript)");
const { compareIdentifiers } = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/identifiers.js [app-route] (ecmascript)");
class SemVer {
    constructor(version, options){
        options = parseOptions(options);
        if (version instanceof SemVer) {
            if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
                return version;
            } else {
                version = version.version;
            }
        } else if (typeof version !== 'string') {
            throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
            throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
        }
        debug('SemVer', version, options);
        this.options = options;
        this.loose = !!options.loose;
        // this isn't actually relevant for versions, but keep it so that we
        // don't run into trouble passing this.options around.
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
            throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        // these are actually numbers
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
            throw new TypeError('Invalid major version');
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
            throw new TypeError('Invalid minor version');
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
            throw new TypeError('Invalid patch version');
        }
        // numberify any prerelease numeric ids
        if (!m[4]) {
            this.prerelease = [];
        } else {
            this.prerelease = m[4].split('.').map((id)=>{
                if (/^[0-9]+$/.test(id)) {
                    const num = +id;
                    if (num >= 0 && num < MAX_SAFE_INTEGER) {
                        return num;
                    }
                }
                return id;
            });
        }
        this.build = m[5] ? m[5].split('.') : [];
        this.format();
    }
    format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
            this.version += `-${this.prerelease.join('.')}`;
        }
        return this.version;
    }
    toString() {
        return this.version;
    }
    compare(other) {
        debug('SemVer.compare', this.version, this.options, other);
        if (!(other instanceof SemVer)) {
            if (typeof other === 'string' && other === this.version) {
                return 0;
            }
            other = new SemVer(other, this.options);
        }
        if (other.version === this.version) {
            return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        // NOT having a prerelease is > having one
        if (this.prerelease.length && !other.prerelease.length) {
            return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
            return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
            return 0;
        }
        let i = 0;
        do {
            const a = this.prerelease[i];
            const b = other.prerelease[i];
            debug('prerelease compare', i, a, b);
            if (a === undefined && b === undefined) {
                return 0;
            } else if (b === undefined) {
                return 1;
            } else if (a === undefined) {
                return -1;
            } else if (a === b) {
                continue;
            } else {
                return compareIdentifiers(a, b);
            }
        }while (++i)
    }
    compareBuild(other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        let i = 0;
        do {
            const a = this.build[i];
            const b = other.build[i];
            debug('build compare', i, a, b);
            if (a === undefined && b === undefined) {
                return 0;
            } else if (b === undefined) {
                return 1;
            } else if (a === undefined) {
                return -1;
            } else if (a === b) {
                continue;
            } else {
                return compareIdentifiers(a, b);
            }
        }while (++i)
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
        if (release.startsWith('pre')) {
            if (!identifier && identifierBase === false) {
                throw new Error('invalid increment argument: identifier is empty');
            }
            // Avoid an invalid semver results
            if (identifier) {
                const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
                if (!match || match[1] !== identifier) {
                    throw new Error(`invalid identifier: ${identifier}`);
                }
            }
        }
        switch(release){
            case 'premajor':
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor = 0;
                this.major++;
                this.inc('pre', identifier, identifierBase);
                break;
            case 'preminor':
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor++;
                this.inc('pre', identifier, identifierBase);
                break;
            case 'prepatch':
                // If this is already a prerelease, it will bump to the next version
                // drop any prereleases that might already exist, since they are not
                // relevant at this point.
                this.prerelease.length = 0;
                this.inc('patch', identifier, identifierBase);
                this.inc('pre', identifier, identifierBase);
                break;
            // If the input is a non-prerelease version, this acts the same as
            // prepatch.
            case 'prerelease':
                if (this.prerelease.length === 0) {
                    this.inc('patch', identifier, identifierBase);
                }
                this.inc('pre', identifier, identifierBase);
                break;
            case 'release':
                if (this.prerelease.length === 0) {
                    throw new Error(`version ${this.raw} is not a prerelease`);
                }
                this.prerelease.length = 0;
                break;
            case 'major':
                // If this is a pre-major version, bump up to the same major version.
                // Otherwise increment major.
                // 1.0.0-5 bumps to 1.0.0
                // 1.1.0 bumps to 2.0.0
                if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
                    this.major++;
                }
                this.minor = 0;
                this.patch = 0;
                this.prerelease = [];
                break;
            case 'minor':
                // If this is a pre-minor version, bump up to the same minor version.
                // Otherwise increment minor.
                // 1.2.0-5 bumps to 1.2.0
                // 1.2.1 bumps to 1.3.0
                if (this.patch !== 0 || this.prerelease.length === 0) {
                    this.minor++;
                }
                this.patch = 0;
                this.prerelease = [];
                break;
            case 'patch':
                // If this is not a pre-release version, it will increment the patch.
                // If it is a pre-release it will bump up to the same patch version.
                // 1.2.0-5 patches to 1.2.0
                // 1.2.0 patches to 1.2.1
                if (this.prerelease.length === 0) {
                    this.patch++;
                }
                this.prerelease = [];
                break;
            // This probably shouldn't be used publicly.
            // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
            case 'pre':
                {
                    const base = Number(identifierBase) ? 1 : 0;
                    if (this.prerelease.length === 0) {
                        this.prerelease = [
                            base
                        ];
                    } else {
                        let i = this.prerelease.length;
                        while(--i >= 0){
                            if (typeof this.prerelease[i] === 'number') {
                                this.prerelease[i]++;
                                i = -2;
                            }
                        }
                        if (i === -1) {
                            // didn't increment anything
                            if (identifier === this.prerelease.join('.') && identifierBase === false) {
                                throw new Error('invalid increment argument: identifier already exists');
                            }
                            this.prerelease.push(base);
                        }
                    }
                    if (identifier) {
                        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
                        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
                        let prerelease = [
                            identifier,
                            base
                        ];
                        if (identifierBase === false) {
                            prerelease = [
                                identifier
                            ];
                        }
                        if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                            if (isNaN(this.prerelease[1])) {
                                this.prerelease = prerelease;
                            }
                        } else {
                            this.prerelease = prerelease;
                        }
                    }
                    break;
                }
            default:
                throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
            this.raw += `+${this.build.join('.')}`;
        }
        return this;
    }
}
module.exports = SemVer;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/parse.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const parse = (version, options, throwErrors = false)=>{
    if (version instanceof SemVer) {
        return version;
    }
    try {
        return new SemVer(version, options);
    } catch (er) {
        if (!throwErrors) {
            return null;
        }
        throw er;
    }
};
module.exports = parse;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/valid.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const parse = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/parse.js [app-route] (ecmascript)");
const valid = (version, options)=>{
    const v = parse(version, options);
    return v ? v.version : null;
};
module.exports = valid;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/clean.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const parse = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/parse.js [app-route] (ecmascript)");
const clean = (version, options)=>{
    const s = parse(version.trim().replace(/^[=v]+/, ''), options);
    return s ? s.version : null;
};
module.exports = clean;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/inc.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const inc = (version, release, options, identifier, identifierBase)=>{
    if (typeof options === 'string') {
        identifierBase = identifier;
        identifier = options;
        options = undefined;
    }
    try {
        return new SemVer(version instanceof SemVer ? version.version : version, options).inc(release, identifier, identifierBase).version;
    } catch (er) {
        return null;
    }
};
module.exports = inc;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/diff.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const parse = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/parse.js [app-route] (ecmascript)");
const diff = (version1, version2)=>{
    const v1 = parse(version1, null, true);
    const v2 = parse(version2, null, true);
    const comparison = v1.compare(v2);
    if (comparison === 0) {
        return null;
    }
    const v1Higher = comparison > 0;
    const highVersion = v1Higher ? v1 : v2;
    const lowVersion = v1Higher ? v2 : v1;
    const highHasPre = !!highVersion.prerelease.length;
    const lowHasPre = !!lowVersion.prerelease.length;
    if (lowHasPre && !highHasPre) {
        // Going from prerelease -> no prerelease requires some special casing
        // If the low version has only a major, then it will always be a major
        // Some examples:
        // 1.0.0-1 -> 1.0.0
        // 1.0.0-1 -> 1.1.1
        // 1.0.0-1 -> 2.0.0
        if (!lowVersion.patch && !lowVersion.minor) {
            return 'major';
        }
        // If the main part has no difference
        if (lowVersion.compareMain(highVersion) === 0) {
            if (lowVersion.minor && !lowVersion.patch) {
                return 'minor';
            }
            return 'patch';
        }
    }
    // add the `pre` prefix if we are going to a prerelease version
    const prefix = highHasPre ? 'pre' : '';
    if (v1.major !== v2.major) {
        return prefix + 'major';
    }
    if (v1.minor !== v2.minor) {
        return prefix + 'minor';
    }
    if (v1.patch !== v2.patch) {
        return prefix + 'patch';
    }
    // high and low are preleases
    return 'prerelease';
};
module.exports = diff;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/major.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const major = (a, loose)=>new SemVer(a, loose).major;
module.exports = major;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/minor.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const minor = (a, loose)=>new SemVer(a, loose).minor;
module.exports = minor;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/patch.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const patch = (a, loose)=>new SemVer(a, loose).patch;
module.exports = patch;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/prerelease.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const parse = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/parse.js [app-route] (ecmascript)");
const prerelease = (version, options)=>{
    const parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
module.exports = prerelease;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const compare = (a, b, loose)=>new SemVer(a, loose).compare(new SemVer(b, loose));
module.exports = compare;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/rcompare.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)");
const rcompare = (a, b, loose)=>compare(b, a, loose);
module.exports = rcompare;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/compare-loose.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)");
const compareLoose = (a, b)=>compare(a, b, true);
module.exports = compareLoose;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/compare-build.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const compareBuild = (a, b, loose)=>{
    const versionA = new SemVer(a, loose);
    const versionB = new SemVer(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
module.exports = compareBuild;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/sort.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compareBuild = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare-build.js [app-route] (ecmascript)");
const sort = (list, loose)=>list.sort((a, b)=>compareBuild(a, b, loose));
module.exports = sort;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/rsort.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compareBuild = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare-build.js [app-route] (ecmascript)");
const rsort = (list, loose)=>list.sort((a, b)=>compareBuild(b, a, loose));
module.exports = rsort;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/gt.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)");
const gt = (a, b, loose)=>compare(a, b, loose) > 0;
module.exports = gt;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/lt.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)");
const lt = (a, b, loose)=>compare(a, b, loose) < 0;
module.exports = lt;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/eq.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)");
const eq = (a, b, loose)=>compare(a, b, loose) === 0;
module.exports = eq;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/neq.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)");
const neq = (a, b, loose)=>compare(a, b, loose) !== 0;
module.exports = neq;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/gte.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)");
const gte = (a, b, loose)=>compare(a, b, loose) >= 0;
module.exports = gte;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/lte.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)");
const lte = (a, b, loose)=>compare(a, b, loose) <= 0;
module.exports = lte;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/cmp.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const eq = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/eq.js [app-route] (ecmascript)");
const neq = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/neq.js [app-route] (ecmascript)");
const gt = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/gt.js [app-route] (ecmascript)");
const gte = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/gte.js [app-route] (ecmascript)");
const lt = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/lt.js [app-route] (ecmascript)");
const lte = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/lte.js [app-route] (ecmascript)");
const cmp = (a, op, b, loose)=>{
    switch(op){
        case '===':
            if (typeof a === 'object') {
                a = a.version;
            }
            if (typeof b === 'object') {
                b = b.version;
            }
            return a === b;
        case '!==':
            if (typeof a === 'object') {
                a = a.version;
            }
            if (typeof b === 'object') {
                b = b.version;
            }
            return a !== b;
        case '':
        case '=':
        case '==':
            return eq(a, b, loose);
        case '!=':
            return neq(a, b, loose);
        case '>':
            return gt(a, b, loose);
        case '>=':
            return gte(a, b, loose);
        case '<':
            return lt(a, b, loose);
        case '<=':
            return lte(a, b, loose);
        default:
            throw new TypeError(`Invalid operator: ${op}`);
    }
};
module.exports = cmp;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/coerce.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const parse = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/parse.js [app-route] (ecmascript)");
const { safeRe: re, t } = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/re.js [app-route] (ecmascript)");
const coerce = (version, options)=>{
    if (version instanceof SemVer) {
        return version;
    }
    if (typeof version === 'number') {
        version = String(version);
    }
    if (typeof version !== 'string') {
        return null;
    }
    options = options || {};
    let match = null;
    if (!options.rtl) {
        match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
    } else {
        // Find the right-most coercible string that does not share
        // a terminus with a more left-ward coercible string.
        // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
        // With includePrerelease option set, '1.2.3.4-rc' wants to coerce '2.3.4-rc', not '2.3.4'
        //
        // Walk through the string checking with a /g regexp
        // Manually set the index so as to pick up overlapping matches.
        // Stop when we get a match that ends at the string end, since no
        // coercible string can be more right-ward without the same terminus.
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)){
            if (!match || next.index + next[0].length !== match.index + match[0].length) {
                match = next;
            }
            coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        // leave it in a clean state
        coerceRtlRegex.lastIndex = -1;
    }
    if (match === null) {
        return null;
    }
    const major = match[2];
    const minor = match[3] || '0';
    const patch = match[4] || '0';
    const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : '';
    const build = options.includePrerelease && match[6] ? `+${match[6]}` : '';
    return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
};
module.exports = coerce;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/internal/lrucache.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

class LRUCache {
    constructor(){
        this.max = 1000;
        this.map = new Map();
    }
    get(key) {
        const value = this.map.get(key);
        if (value === undefined) {
            return undefined;
        } else {
            // Remove the key from the map and add it to the end
            this.map.delete(key);
            this.map.set(key, value);
            return value;
        }
    }
    delete(key) {
        return this.map.delete(key);
    }
    set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== undefined) {
            // If cache is full, delete the least recently used item
            if (this.map.size >= this.max) {
                const firstKey = this.map.keys().next().value;
                this.delete(firstKey);
            }
            this.map.set(key, value);
        }
        return this;
    }
}
module.exports = LRUCache;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SPACE_CHARACTERS = /\s+/g;
// hoisted class for cyclic dependency
class Range {
    constructor(range, options){
        options = parseOptions(options);
        if (range instanceof Range) {
            if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
                return range;
            } else {
                return new Range(range.raw, options);
            }
        }
        if (range instanceof Comparator) {
            // just put it in the set and return
            this.raw = range.value;
            this.set = [
                [
                    range
                ]
            ];
            this.formatted = undefined;
            return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        // First reduce all whitespace as much as possible so we do not have to rely
        // on potentially slow regexes like \s*. This is then stored and used for
        // future error messages as well.
        this.raw = range.trim().replace(SPACE_CHARACTERS, ' ');
        // First, split on ||
        this.set = this.raw.split('||')// map the range to a 2d array of comparators
        .map((r)=>this.parseRange(r.trim()))// throw out any comparator lists that are empty
        // this generally means that it was not a valid range, which is allowed
        // in loose mode, but will still throw if the WHOLE range is invalid.
        .filter((c)=>c.length);
        if (!this.set.length) {
            throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        // if we have any that are not the null set, throw out null sets.
        if (this.set.length > 1) {
            // keep the first one, in case they're all null sets
            const first = this.set[0];
            this.set = this.set.filter((c)=>!isNullSet(c[0]));
            if (this.set.length === 0) {
                this.set = [
                    first
                ];
            } else if (this.set.length > 1) {
                // if we have any that are *, then the range is just *
                for (const c of this.set){
                    if (c.length === 1 && isAny(c[0])) {
                        this.set = [
                            c
                        ];
                        break;
                    }
                }
            }
        }
        this.formatted = undefined;
    }
    get range() {
        if (this.formatted === undefined) {
            this.formatted = '';
            for(let i = 0; i < this.set.length; i++){
                if (i > 0) {
                    this.formatted += '||';
                }
                const comps = this.set[i];
                for(let k = 0; k < comps.length; k++){
                    if (k > 0) {
                        this.formatted += ' ';
                    }
                    this.formatted += comps[k].toString().trim();
                }
            }
        }
        return this.formatted;
    }
    format() {
        return this.range;
    }
    toString() {
        return this.range;
    }
    parseRange(range) {
        // memoize range parsing for performance.
        // this is a very hot path, and fully deterministic.
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ':' + range;
        const cached = cache.get(memoKey);
        if (cached) {
            return cached;
        }
        const loose = this.options.loose;
        // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug('hyphen replace', range);
        // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug('comparator trim', range);
        // `~ 1.2.3` => `~1.2.3`
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug('tilde trim', range);
        // `^ 1.2.3` => `^1.2.3`
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug('caret trim', range);
        // At this point, the range is completely trimmed and
        // ready to be split into comparators.
        let rangeList = range.split(' ').map((comp)=>parseComparator(comp, this.options)).join(' ').split(/\s+/)// >=0.0.0 is equivalent to *
        .map((comp)=>replaceGTE0(comp, this.options));
        if (loose) {
            // in loose mode, throw out any that are not valid comparators
            rangeList = rangeList.filter((comp)=>{
                debug('loose invalid filter', comp, this.options);
                return !!comp.match(re[t.COMPARATORLOOSE]);
            });
        }
        debug('range list', rangeList);
        // if any comparators are the null set, then replace with JUST null set
        // if more than one comparator, remove any * comparators
        // also, don't include the same comparator more than once
        const rangeMap = new Map();
        const comparators = rangeList.map((comp)=>new Comparator(comp, this.options));
        for (const comp of comparators){
            if (isNullSet(comp)) {
                return [
                    comp
                ];
            }
            rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has('')) {
            rangeMap.delete('');
        }
        const result = [
            ...rangeMap.values()
        ];
        cache.set(memoKey, result);
        return result;
    }
    intersects(range, options) {
        if (!(range instanceof Range)) {
            throw new TypeError('a Range is required');
        }
        return this.set.some((thisComparators)=>{
            return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators)=>{
                return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator)=>{
                    return rangeComparators.every((rangeComparator)=>{
                        return thisComparator.intersects(rangeComparator, options);
                    });
                });
            });
        });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
        if (!version) {
            return false;
        }
        if (typeof version === 'string') {
            try {
                version = new SemVer(version, this.options);
            } catch (er) {
                return false;
            }
        }
        for(let i = 0; i < this.set.length; i++){
            if (testSet(this.set[i], version, this.options)) {
                return true;
            }
        }
        return false;
    }
}
module.exports = Range;
const LRU = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/lrucache.js [app-route] (ecmascript)");
const cache = new LRU();
const parseOptions = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/parse-options.js [app-route] (ecmascript)");
const Comparator = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/comparator.js [app-route] (ecmascript)");
const debug = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/debug.js [app-route] (ecmascript)");
const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const { safeRe: re, t, comparatorTrimReplace, tildeTrimReplace, caretTrimReplace } = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/re.js [app-route] (ecmascript)");
const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/constants.js [app-route] (ecmascript)");
const isNullSet = (c)=>c.value === '<0.0.0-0';
const isAny = (c)=>c.value === '';
// take a set of comparators and determine whether there
// exists a version which can satisfy it
const isSatisfiable = (comparators, options)=>{
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while(result && remainingComparators.length){
        result = remainingComparators.every((otherComparator)=>{
            return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
    }
    return result;
};
// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const parseComparator = (comp, options)=>{
    debug('comp', comp, options);
    comp = replaceCarets(comp, options);
    debug('caret', comp);
    comp = replaceTildes(comp, options);
    debug('tildes', comp);
    comp = replaceXRanges(comp, options);
    debug('xrange', comp);
    comp = replaceStars(comp, options);
    debug('stars', comp);
    return comp;
};
const isX = (id)=>!id || id.toLowerCase() === 'x' || id === '*';
// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
// ~0.0.1 --> >=0.0.1 <0.1.0-0
const replaceTildes = (comp, options)=>{
    return comp.trim().split(/\s+/).map((c)=>replaceTilde(c, options)).join(' ');
};
const replaceTilde = (comp, options)=>{
    const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    return comp.replace(r, (_, M, m, p, pr)=>{
        debug('tilde', comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
            ret = '';
        } else if (isX(m)) {
            ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
            // ~1.2 == >=1.2.0 <1.3.0-0
            ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
            debug('replaceTilde pr', pr);
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
            // ~1.2.3 == >=1.2.3 <1.3.0-0
            ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug('tilde return', ret);
        return ret;
    });
};
// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
// ^0.0.1 --> >=0.0.1 <0.0.2-0
// ^0.1.0 --> >=0.1.0 <0.2.0-0
const replaceCarets = (comp, options)=>{
    return comp.trim().split(/\s+/).map((c)=>replaceCaret(c, options)).join(' ');
};
const replaceCaret = (comp, options)=>{
    debug('caret', comp, options);
    const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
    const z = options.includePrerelease ? '-0' : '';
    return comp.replace(r, (_, M, m, p, pr)=>{
        debug('caret', comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
            ret = '';
        } else if (isX(m)) {
            ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
            if (M === '0') {
                ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
            } else {
                ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
            }
        } else if (pr) {
            debug('replaceCaret pr', pr);
            if (M === '0') {
                if (m === '0') {
                    ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
                } else {
                    ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
                }
            } else {
                ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
            }
        } else {
            debug('no pr');
            if (M === '0') {
                if (m === '0') {
                    ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
                } else {
                    ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
                }
            } else {
                ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
            }
        }
        debug('caret return', ret);
        return ret;
    });
};
const replaceXRanges = (comp, options)=>{
    debug('replaceXRanges', comp, options);
    return comp.split(/\s+/).map((c)=>replaceXRange(c, options)).join(' ');
};
const replaceXRange = (comp, options)=>{
    comp = comp.trim();
    const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr)=>{
        debug('xRange', comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === '=' && anyX) {
            gtlt = '';
        }
        // if we're including prereleases in the match, then we need
        // to fix this to -0, the lowest possible prerelease value
        pr = options.includePrerelease ? '-0' : '';
        if (xM) {
            if (gtlt === '>' || gtlt === '<') {
                // nothing is allowed
                ret = '<0.0.0-0';
            } else {
                // nothing is forbidden
                ret = '*';
            }
        } else if (gtlt && anyX) {
            // we know patch is an x, because we have any x at all.
            // replace X with 0
            if (xm) {
                m = 0;
            }
            p = 0;
            if (gtlt === '>') {
                // >1 => >=2.0.0
                // >1.2 => >=1.3.0
                gtlt = '>=';
                if (xm) {
                    M = +M + 1;
                    m = 0;
                    p = 0;
                } else {
                    m = +m + 1;
                    p = 0;
                }
            } else if (gtlt === '<=') {
                // <=0.7.x is actually <0.8.0, since any 0.7.x should
                // pass.  Similarly, <=7.x is actually <8.0.0, etc.
                gtlt = '<';
                if (xm) {
                    M = +M + 1;
                } else {
                    m = +m + 1;
                }
            }
            if (gtlt === '<') {
                pr = '-0';
            }
            ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
            ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
            ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug('xRange return', ret);
        return ret;
    });
};
// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const replaceStars = (comp, options)=>{
    debug('replaceStars', comp, options);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace(re[t.STAR], '');
};
const replaceGTE0 = (comp, options)=>{
    debug('replaceGTE0', comp, options);
    return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
};
// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
// TODO build?
const hyphenReplace = (incPr)=>($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr)=>{
        if (isX(fM)) {
            from = '';
        } else if (isX(fm)) {
            from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
        } else if (isX(fp)) {
            from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
        } else if (fpr) {
            from = `>=${from}`;
        } else {
            from = `>=${from}${incPr ? '-0' : ''}`;
        }
        if (isX(tM)) {
            to = '';
        } else if (isX(tm)) {
            to = `<${+tM + 1}.0.0-0`;
        } else if (isX(tp)) {
            to = `<${tM}.${+tm + 1}.0-0`;
        } else if (tpr) {
            to = `<=${tM}.${tm}.${tp}-${tpr}`;
        } else if (incPr) {
            to = `<${tM}.${tm}.${+tp + 1}-0`;
        } else {
            to = `<=${to}`;
        }
        return `${from} ${to}`.trim();
    };
const testSet = (set, version, options)=>{
    for(let i = 0; i < set.length; i++){
        if (!set[i].test(version)) {
            return false;
        }
    }
    if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for(let i = 0; i < set.length; i++){
            debug(set[i].semver);
            if (set[i].semver === Comparator.ANY) {
                continue;
            }
            if (set[i].semver.prerelease.length > 0) {
                const allowed = set[i].semver;
                if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
                    return true;
                }
            }
        }
        // Version has a -pre, but it's not one of the ones we like.
        return false;
    }
    return true;
};
}),
"[project]/Downloads/mrpii 2/node_modules/semver/classes/comparator.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const ANY = Symbol('SemVer ANY');
// hoisted class for cyclic dependency
class Comparator {
    static get ANY() {
        return ANY;
    }
    constructor(comp, options){
        options = parseOptions(options);
        if (comp instanceof Comparator) {
            if (comp.loose === !!options.loose) {
                return comp;
            } else {
                comp = comp.value;
            }
        }
        comp = comp.trim().split(/\s+/).join(' ');
        debug('comparator', comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
            this.value = '';
        } else {
            this.value = this.operator + this.semver.version;
        }
        debug('comp', this);
    }
    parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
            throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== undefined ? m[1] : '';
        if (this.operator === '=') {
            this.operator = '';
        }
        // if it literally is just '>' or '' then allow anything.
        if (!m[2]) {
            this.semver = ANY;
        } else {
            this.semver = new SemVer(m[2], this.options.loose);
        }
    }
    toString() {
        return this.value;
    }
    test(version) {
        debug('Comparator.test', version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
            return true;
        }
        if (typeof version === 'string') {
            try {
                version = new SemVer(version, this.options);
            } catch (er) {
                return false;
            }
        }
        return cmp(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
        if (!(comp instanceof Comparator)) {
            throw new TypeError('a Comparator is required');
        }
        if (this.operator === '') {
            if (this.value === '') {
                return true;
            }
            return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === '') {
            if (comp.value === '') {
                return true;
            }
            return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        // Special cases where nothing can possibly be lower
        if (options.includePrerelease && (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
            return false;
        }
        if (!options.includePrerelease && (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
            return false;
        }
        // Same direction increasing (> or >=)
        if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
            return true;
        }
        // Same direction decreasing (< or <=)
        if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
            return true;
        }
        // same SemVer and both sides are inclusive (<= or >=)
        if (this.semver.version === comp.semver.version && this.operator.includes('=') && comp.operator.includes('=')) {
            return true;
        }
        // opposite directions less than
        if (cmp(this.semver, '<', comp.semver, options) && this.operator.startsWith('>') && comp.operator.startsWith('<')) {
            return true;
        }
        // opposite directions greater than
        if (cmp(this.semver, '>', comp.semver, options) && this.operator.startsWith('<') && comp.operator.startsWith('>')) {
            return true;
        }
        return false;
    }
}
module.exports = Comparator;
const parseOptions = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/parse-options.js [app-route] (ecmascript)");
const { safeRe: re, t } = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/re.js [app-route] (ecmascript)");
const cmp = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/cmp.js [app-route] (ecmascript)");
const debug = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/debug.js [app-route] (ecmascript)");
const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const Range = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)");
}),
"[project]/Downloads/mrpii 2/node_modules/semver/functions/satisfies.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Range = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)");
const satisfies = (version, range, options)=>{
    try {
        range = new Range(range, options);
    } catch (er) {
        return false;
    }
    return range.test(version);
};
module.exports = satisfies;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/ranges/to-comparators.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Range = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)");
// Mostly just for testing and legacy API reasons
const toComparators = (range, options)=>new Range(range, options).set.map((comp)=>comp.map((c)=>c.value).join(' ').trim().split(' '));
module.exports = toComparators;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/ranges/max-satisfying.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const Range = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)");
const maxSatisfying = (versions, range, options)=>{
    let max = null;
    let maxSV = null;
    let rangeObj = null;
    try {
        rangeObj = new Range(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach((v)=>{
        if (rangeObj.test(v)) {
            // satisfies(v, range, options)
            if (!max || maxSV.compare(v) === -1) {
                // compare(max, v, true)
                max = v;
                maxSV = new SemVer(max, options);
            }
        }
    });
    return max;
};
module.exports = maxSatisfying;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/ranges/min-satisfying.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const Range = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)");
const minSatisfying = (versions, range, options)=>{
    let min = null;
    let minSV = null;
    let rangeObj = null;
    try {
        rangeObj = new Range(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach((v)=>{
        if (rangeObj.test(v)) {
            // satisfies(v, range, options)
            if (!min || minSV.compare(v) === 1) {
                // compare(min, v, true)
                min = v;
                minSV = new SemVer(min, options);
            }
        }
    });
    return min;
};
module.exports = minSatisfying;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/ranges/min-version.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const Range = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)");
const gt = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/gt.js [app-route] (ecmascript)");
const minVersion = (range, loose)=>{
    range = new Range(range, loose);
    let minver = new SemVer('0.0.0');
    if (range.test(minver)) {
        return minver;
    }
    minver = new SemVer('0.0.0-0');
    if (range.test(minver)) {
        return minver;
    }
    minver = null;
    for(let i = 0; i < range.set.length; ++i){
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator)=>{
            // Clone to avoid manipulating the comparator's semver object.
            const compver = new SemVer(comparator.semver.version);
            switch(comparator.operator){
                case '>':
                    if (compver.prerelease.length === 0) {
                        compver.patch++;
                    } else {
                        compver.prerelease.push(0);
                    }
                    compver.raw = compver.format();
                /* fallthrough */ case '':
                case '>=':
                    if (!setMin || gt(compver, setMin)) {
                        setMin = compver;
                    }
                    break;
                case '<':
                case '<=':
                    break;
                /* istanbul ignore next */ default:
                    throw new Error(`Unexpected operation: ${comparator.operator}`);
            }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
            minver = setMin;
        }
    }
    if (minver && range.test(minver)) {
        return minver;
    }
    return null;
};
module.exports = minVersion;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/ranges/valid.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Range = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)");
const validRange = (range, options)=>{
    try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new Range(range, options).range || '*';
    } catch (er) {
        return null;
    }
};
module.exports = validRange;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/ranges/outside.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const Comparator = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/comparator.js [app-route] (ecmascript)");
const { ANY } = Comparator;
const Range = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)");
const satisfies = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/satisfies.js [app-route] (ecmascript)");
const gt = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/gt.js [app-route] (ecmascript)");
const lt = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/lt.js [app-route] (ecmascript)");
const lte = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/lte.js [app-route] (ecmascript)");
const gte = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/gte.js [app-route] (ecmascript)");
const outside = (version, range, hilo, options)=>{
    version = new SemVer(version, options);
    range = new Range(range, options);
    let gtfn, ltefn, ltfn, comp, ecomp;
    switch(hilo){
        case '>':
            gtfn = gt;
            ltefn = lte;
            ltfn = lt;
            comp = '>';
            ecomp = '>=';
            break;
        case '<':
            gtfn = lt;
            ltefn = gte;
            ltfn = gt;
            comp = '<';
            ecomp = '<=';
            break;
        default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    // If it satisfies the range it is not outside
    if (satisfies(version, range, options)) {
        return false;
    }
    // From now on, variable terms are as if we're in "gtr" mode.
    // but note that everything is flipped for the "ltr" function.
    for(let i = 0; i < range.set.length; ++i){
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator)=>{
            if (comparator.semver === ANY) {
                comparator = new Comparator('>=0.0.0');
            }
            high = high || comparator;
            low = low || comparator;
            if (gtfn(comparator.semver, high.semver, options)) {
                high = comparator;
            } else if (ltfn(comparator.semver, low.semver, options)) {
                low = comparator;
            }
        });
        // If the edge version comparator has a operator then our version
        // isn't outside it
        if (high.operator === comp || high.operator === ecomp) {
            return false;
        }
        // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
            return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
            return false;
        }
    }
    return true;
};
module.exports = outside;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/ranges/gtr.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Determine if version is greater than all the versions possible in the range.
const outside = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/outside.js [app-route] (ecmascript)");
const gtr = (version, range, options)=>outside(version, range, '>', options);
module.exports = gtr;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/ranges/ltr.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const outside = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/outside.js [app-route] (ecmascript)");
// Determine if version is less than all the versions possible in the range
const ltr = (version, range, options)=>outside(version, range, '<', options);
module.exports = ltr;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/ranges/intersects.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Range = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)");
const intersects = (r1, r2, options)=>{
    r1 = new Range(r1, options);
    r2 = new Range(r2, options);
    return r1.intersects(r2, options);
};
module.exports = intersects;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/ranges/simplify.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.
const satisfies = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/satisfies.js [app-route] (ecmascript)");
const compare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)");
module.exports = (versions, range, options)=>{
    const set = [];
    let first = null;
    let prev = null;
    const v = versions.sort((a, b)=>compare(a, b, options));
    for (const version of v){
        const included = satisfies(version, range, options);
        if (included) {
            prev = version;
            if (!first) {
                first = version;
            }
        } else {
            if (prev) {
                set.push([
                    first,
                    prev
                ]);
            }
            prev = null;
            first = null;
        }
    }
    if (first) {
        set.push([
            first,
            null
        ]);
    }
    const ranges = [];
    for (const [min, max] of set){
        if (min === max) {
            ranges.push(min);
        } else if (!max && min === v[0]) {
            ranges.push('*');
        } else if (!max) {
            ranges.push(`>=${min}`);
        } else if (min === v[0]) {
            ranges.push(`<=${max}`);
        } else {
            ranges.push(`${min} - ${max}`);
        }
    }
    const simplified = ranges.join(' || ');
    const original = typeof range.raw === 'string' ? range.raw : String(range);
    return simplified.length < original.length ? simplified : range;
};
}),
"[project]/Downloads/mrpii 2/node_modules/semver/ranges/subset.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Range = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)");
const Comparator = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/comparator.js [app-route] (ecmascript)");
const { ANY } = Comparator;
const satisfies = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/satisfies.js [app-route] (ecmascript)");
const compare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)");
// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
// - Every simple range `r1, r2, ...` is a null set, OR
// - Every simple range `r1, r2, ...` which is not a null set is a subset of
//   some `R1, R2, ...`
//
// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
// - If c is only the ANY comparator
//   - If C is only the ANY comparator, return true
//   - Else if in prerelease mode, return false
//   - else replace c with `[>=0.0.0]`
// - If C is only the ANY comparator
//   - if in prerelease mode, return true
//   - else replace C with `[>=0.0.0]`
// - Let EQ be the set of = comparators in c
// - If EQ is more than one, return true (null set)
// - Let GT be the highest > or >= comparator in c
// - Let LT be the lowest < or <= comparator in c
// - If GT and LT, and GT.semver > LT.semver, return true (null set)
// - If any C is a = range, and GT or LT are set, return false
// - If EQ
//   - If GT, and EQ does not satisfy GT, return true (null set)
//   - If LT, and EQ does not satisfy LT, return true (null set)
//   - If EQ satisfies every C, return true
//   - Else return false
// - If GT
//   - If GT.semver is lower than any > or >= comp in C, return false
//   - If GT is >=, and GT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the GT.semver tuple, return false
// - If LT
//   - If LT.semver is greater than any < or <= comp in C, return false
//   - If LT is <=, and LT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the LT.semver tuple, return false
// - Else return true
const subset = (sub, dom, options = {})=>{
    if (sub === dom) {
        return true;
    }
    sub = new Range(sub, options);
    dom = new Range(dom, options);
    let sawNonNull = false;
    OUTER: for (const simpleSub of sub.set){
        for (const simpleDom of dom.set){
            const isSub = simpleSubset(simpleSub, simpleDom, options);
            sawNonNull = sawNonNull || isSub !== null;
            if (isSub) {
                continue OUTER;
            }
        }
        // the null set is a subset of everything, but null simple ranges in
        // a complex range should be ignored.  so if we saw a non-null range,
        // then we know this isn't a subset, but if EVERY simple range was null,
        // then it is a subset.
        if (sawNonNull) {
            return false;
        }
    }
    return true;
};
const minimumVersionWithPreRelease = [
    new Comparator('>=0.0.0-0')
];
const minimumVersion = [
    new Comparator('>=0.0.0')
];
const simpleSubset = (sub, dom, options)=>{
    if (sub === dom) {
        return true;
    }
    if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
            return true;
        } else if (options.includePrerelease) {
            sub = minimumVersionWithPreRelease;
        } else {
            sub = minimumVersion;
        }
    }
    if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
            return true;
        } else {
            dom = minimumVersion;
        }
    }
    const eqSet = new Set();
    let gt, lt;
    for (const c of sub){
        if (c.operator === '>' || c.operator === '>=') {
            gt = higherGT(gt, c, options);
        } else if (c.operator === '<' || c.operator === '<=') {
            lt = lowerLT(lt, c, options);
        } else {
            eqSet.add(c.semver);
        }
    }
    if (eqSet.size > 1) {
        return null;
    }
    let gtltComp;
    if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
            return null;
        } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
            return null;
        }
    }
    // will iterate one or zero times
    for (const eq of eqSet){
        if (gt && !satisfies(eq, String(gt), options)) {
            return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
            return null;
        }
        for (const c of dom){
            if (!satisfies(eq, String(c), options)) {
                return false;
            }
        }
        return true;
    }
    let higher, lower;
    let hasDomLT, hasDomGT;
    // if the subset has a prerelease, we need a comparator in the superset
    // with the same tuple and a prerelease, or it's not a subset
    let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
    let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
    // exception: <1.2.3-0 is the same as <1.2.3
    if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
    }
    for (const c of dom){
        hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
        hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
        if (gt) {
            if (needDomGTPre) {
                if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
                    needDomGTPre = false;
                }
            }
            if (c.operator === '>' || c.operator === '>=') {
                higher = higherGT(gt, c, options);
                if (higher === c && higher !== gt) {
                    return false;
                }
            } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
                return false;
            }
        }
        if (lt) {
            if (needDomLTPre) {
                if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
                    needDomLTPre = false;
                }
            }
            if (c.operator === '<' || c.operator === '<=') {
                lower = lowerLT(lt, c, options);
                if (lower === c && lower !== lt) {
                    return false;
                }
            } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
                return false;
            }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
            return false;
        }
    }
    // if there was a < or >, and nothing in the dom, then must be false
    // UNLESS it was limited by another range in the other direction.
    // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
    if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
    }
    if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
    }
    // we needed a prerelease range in a specific tuple, but didn't get one
    // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
    // because it includes prereleases in the 1.2.3 tuple
    if (needDomGTPre || needDomLTPre) {
        return false;
    }
    return true;
};
// >=1.2.3 is lower than >1.2.3
const higherGT = (a, b, options)=>{
    if (!a) {
        return b;
    }
    const comp = compare(a.semver, b.semver, options);
    return comp > 0 ? a : comp < 0 ? b : b.operator === '>' && a.operator === '>=' ? b : a;
};
// <=1.2.3 is higher than <1.2.3
const lowerLT = (a, b, options)=>{
    if (!a) {
        return b;
    }
    const comp = compare(a.semver, b.semver, options);
    return comp < 0 ? a : comp > 0 ? b : b.operator === '<' && a.operator === '<=' ? b : a;
};
module.exports = subset;
}),
"[project]/Downloads/mrpii 2/node_modules/semver/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// just pre-load all the stuff that index.js lazily exports
const internalRe = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/re.js [app-route] (ecmascript)");
const constants = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/constants.js [app-route] (ecmascript)");
const SemVer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/semver.js [app-route] (ecmascript)");
const identifiers = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/internal/identifiers.js [app-route] (ecmascript)");
const parse = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/parse.js [app-route] (ecmascript)");
const valid = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/valid.js [app-route] (ecmascript)");
const clean = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/clean.js [app-route] (ecmascript)");
const inc = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/inc.js [app-route] (ecmascript)");
const diff = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/diff.js [app-route] (ecmascript)");
const major = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/major.js [app-route] (ecmascript)");
const minor = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/minor.js [app-route] (ecmascript)");
const patch = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/patch.js [app-route] (ecmascript)");
const prerelease = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/prerelease.js [app-route] (ecmascript)");
const compare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare.js [app-route] (ecmascript)");
const rcompare = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/rcompare.js [app-route] (ecmascript)");
const compareLoose = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare-loose.js [app-route] (ecmascript)");
const compareBuild = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/compare-build.js [app-route] (ecmascript)");
const sort = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/sort.js [app-route] (ecmascript)");
const rsort = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/rsort.js [app-route] (ecmascript)");
const gt = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/gt.js [app-route] (ecmascript)");
const lt = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/lt.js [app-route] (ecmascript)");
const eq = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/eq.js [app-route] (ecmascript)");
const neq = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/neq.js [app-route] (ecmascript)");
const gte = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/gte.js [app-route] (ecmascript)");
const lte = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/lte.js [app-route] (ecmascript)");
const cmp = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/cmp.js [app-route] (ecmascript)");
const coerce = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/coerce.js [app-route] (ecmascript)");
const Comparator = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/comparator.js [app-route] (ecmascript)");
const Range = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/classes/range.js [app-route] (ecmascript)");
const satisfies = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/functions/satisfies.js [app-route] (ecmascript)");
const toComparators = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/to-comparators.js [app-route] (ecmascript)");
const maxSatisfying = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/max-satisfying.js [app-route] (ecmascript)");
const minSatisfying = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/min-satisfying.js [app-route] (ecmascript)");
const minVersion = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/min-version.js [app-route] (ecmascript)");
const validRange = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/valid.js [app-route] (ecmascript)");
const outside = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/outside.js [app-route] (ecmascript)");
const gtr = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/gtr.js [app-route] (ecmascript)");
const ltr = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/ltr.js [app-route] (ecmascript)");
const intersects = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/intersects.js [app-route] (ecmascript)");
const simplifyRange = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/simplify.js [app-route] (ecmascript)");
const subset = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/semver/ranges/subset.js [app-route] (ecmascript)");
module.exports = {
    parse,
    valid,
    clean,
    inc,
    diff,
    major,
    minor,
    patch,
    prerelease,
    compare,
    rcompare,
    compareLoose,
    compareBuild,
    sort,
    rsort,
    gt,
    lt,
    eq,
    neq,
    gte,
    lte,
    cmp,
    coerce,
    Comparator,
    Range,
    satisfies,
    toComparators,
    maxSatisfying,
    minSatisfying,
    minVersion,
    validRange,
    outside,
    gtr,
    ltr,
    intersects,
    simplifyRange,
    subset,
    SemVer,
    re: internalRe.re,
    src: internalRe.src,
    tokens: internalRe.t,
    SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: constants.RELEASE_TYPES,
    compareIdentifiers: identifiers.compareIdentifiers,
    rcompareIdentifiers: identifiers.rcompareIdentifiers
};
}),
"[project]/Downloads/mrpii 2/node_modules/lodash.includes/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as references for various `Number` constants. */ var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 1.7976931348623157e+308, NAN = 0 / 0;
/** `Object#toString` result references. */ var argsTag = '[object Arguments]', funcTag = '[object Function]', genTag = '[object GeneratorFunction]', stringTag = '[object String]', symbolTag = '[object Symbol]';
/** Used to match leading and trailing whitespace. */ var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */ var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var reIsOctal = /^0o[0-7]+$/i;
/** Used to detect unsigned integer values. */ var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Built-in method references without a dependency on `root`. */ var freeParseInt = parseInt;
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */ function arrayMap(array, iteratee) {
    var index = -1, length = array ? array.length : 0, result = Array(length);
    while(++index < length){
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
    while(fromRight ? index-- : ++index < length){
        if (predicate(array[index], index, array)) {
            return index;
        }
    }
    return -1;
}
/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
    }
    var index = fromIndex - 1, length = array.length;
    while(++index < length){
        if (array[index] === value) {
            return index;
        }
    }
    return -1;
}
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */ function baseIsNaN(value) {
    return value !== value;
}
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */ function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while(++index < n){
        result[index] = iteratee(index);
    }
    return result;
}
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */ function baseValues(object, props) {
    return arrayMap(props, function(key) {
        return object[key];
    });
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}
/** Used for built-in method references. */ var objectProto = Object.prototype;
/** Used to check objects for own properties. */ var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/** Built-in value references. */ var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */ var nativeKeys = overArg(Object.keys, Object), nativeMax = Math.max;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */ function arrayLikeKeys(value, inherited) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    // Safari 9 makes `arguments.length` enumerable in strict mode.
    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for(var key in value){
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
            result.push(key);
        }
    }
    return result;
}
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function baseKeys(object) {
    if (!isPrototype(object)) {
        return nativeKeys(object);
    }
    var result = [];
    for(var key in Object(object)){
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
            result.push(key);
        }
    }
    return result;
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */ function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */ function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
    return value === proto;
}
/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */ function includes(collection, value, fromIndex, guard) {
    collection = isArrayLike(collection) ? collection : values(collection);
    fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
    var length = collection.length;
    if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
    }
    return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
}
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
 */ function isArguments(value) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}
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
 */ var isArray = Array.isArray;
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
 */ function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */ function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
}
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
 */ function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
}
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
 */ function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
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
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}
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
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */ function isString(value) {
    return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
}
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
 */ function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */ function toFinite(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */ function toInteger(value) {
    var result = toFinite(value), remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */ function toNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol(value)) {
        return NAN;
    }
    if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
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
 */ function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
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
 */ function values(object) {
    return object ? baseValues(object, keys(object)) : [];
}
module.exports = includes;
}),
"[project]/Downloads/mrpii 2/node_modules/lodash.isboolean/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */ /** `Object#toString` result references. */ var boolTag = '[object Boolean]';
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/**
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
 */ function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && objectToString.call(value) == boolTag;
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
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
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
module.exports = isBoolean;
}),
"[project]/Downloads/mrpii 2/node_modules/lodash.isinteger/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as references for various `Number` constants. */ var INFINITY = 1 / 0, MAX_INTEGER = 1.7976931348623157e+308, NAN = 0 / 0;
/** `Object#toString` result references. */ var symbolTag = '[object Symbol]';
/** Used to match leading and trailing whitespace. */ var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */ var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */ var freeParseInt = parseInt;
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */ function isInteger(value) {
    return typeof value == 'number' && value == toInteger(value);
}
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
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}
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
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
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
 */ function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */ function toFinite(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */ function toInteger(value) {
    var result = toFinite(value), remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */ function toNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol(value)) {
        return NAN;
    }
    if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
module.exports = isInteger;
}),
"[project]/Downloads/mrpii 2/node_modules/lodash.isnumber/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */ /** `Object#toString` result references. */ var numberTag = '[object Number]';
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
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
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
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
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */ function isNumber(value) {
    return typeof value == 'number' || isObjectLike(value) && objectToString.call(value) == numberTag;
}
module.exports = isNumber;
}),
"[project]/Downloads/mrpii 2/node_modules/lodash.isplainobject/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** `Object#toString` result references. */ var objectTag = '[object Object]';
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */ function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != 'function') {
        try {
            result = !!(value + '');
        } catch (e) {}
    }
    return result;
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}
/** Used for built-in method references. */ var funcProto = Function.prototype, objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */ var funcToString = funcProto.toString;
/** Used to check objects for own properties. */ var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to infer the `Object` constructor. */ var objectCtorString = funcToString.call(Object);
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/** Built-in value references. */ var getPrototype = overArg(Object.getPrototypeOf, Object);
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
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
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
 */ function isPlainObject(value) {
    if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
        return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
        return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
module.exports = isPlainObject;
}),
"[project]/Downloads/mrpii 2/node_modules/lodash.isstring/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */ /** `Object#toString` result references. */ var stringTag = '[object String]';
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
 */ var isArray = Array.isArray;
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
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
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
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
 */ function isString(value) {
    return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
}
module.exports = isString;
}),
"[project]/Downloads/mrpii 2/node_modules/lodash.once/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as the `TypeError` message for "Functions" methods. */ var FUNC_ERROR_TEXT = 'Expected a function';
/** Used as references for various `Number` constants. */ var INFINITY = 1 / 0, MAX_INTEGER = 1.7976931348623157e+308, NAN = 0 / 0;
/** `Object#toString` result references. */ var symbolTag = '[object Symbol]';
/** Used to match leading and trailing whitespace. */ var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */ var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */ var freeParseInt = parseInt;
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery(element).on('click', _.before(5, addContactToList));
 * // => Allows adding up to 4 contacts to the list.
 */ function before(n, func) {
    var result;
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    n = toInteger(n);
    return function() {
        if (--n > 0) {
            result = func.apply(this, arguments);
        }
        if (n <= 1) {
            func = undefined;
        }
        return result;
    };
}
/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 */ function once(func) {
    return before(2, func);
}
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
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}
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
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
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
 */ function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */ function toFinite(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */ function toInteger(value) {
    var result = toFinite(value), remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */ function toNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol(value)) {
        return NAN;
    }
    if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
module.exports = once;
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/base64.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.encodeString = encodeString;
exports.encodeByteArray = encodeByteArray;
exports.decodeString = decodeString;
exports.decodeStringToString = decodeStringToString;
/**
 * Encodes a string in base64 format.
 * @param value - the string to encode
 * @internal
 */ function encodeString(value) {
    return Buffer.from(value).toString("base64");
}
/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Aray to encode
 * @internal
 */ function encodeByteArray(value) {
    const bufferValue = value instanceof Buffer ? value : Buffer.from(value.buffer);
    return bufferValue.toString("base64");
}
/**
 * Decodes a base64 string into a byte array.
 * @param value - the base64 string to decode
 * @internal
 */ function decodeString(value) {
    return Buffer.from(value, "base64");
}
/**
 * Decodes a base64 string into a string.
 * @param value - the base64 string to decode
 * @internal
 */ function decodeStringToString(value) {
    return Buffer.from(value, "base64").toString();
} //# sourceMappingURL=base64.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/interfaces.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.XML_CHARKEY = exports.XML_ATTRKEY = void 0;
/**
 * Default key used to access the XML attributes.
 */ exports.XML_ATTRKEY = "$";
/**
 * Default key used to access the XML value content.
 */ exports.XML_CHARKEY = "_"; //# sourceMappingURL=interfaces.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPrimitiveBody = isPrimitiveBody;
exports.isDuration = isDuration;
exports.isValidUuid = isValidUuid;
exports.flattenResponse = flattenResponse;
/**
 * A type guard for a primitive response body.
 * @param value - Value to test
 *
 * @internal
 */ function isPrimitiveBody(value, mapperTypeName) {
    return mapperTypeName !== "Composite" && mapperTypeName !== "Dictionary" && (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || mapperTypeName?.match(/^(Date|DateTime|DateTimeRfc1123|UnixTime|ByteArray|Base64Url)$/i) !== null || value === undefined || value === null);
}
const validateISODuration = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
/**
 * Returns true if the given string is in ISO 8601 format.
 * @param value - The value to be validated for ISO 8601 duration format.
 * @internal
 */ function isDuration(value) {
    return validateISODuration.test(value);
}
const validUuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;
/**
 * Returns true if the provided uuid is valid.
 *
 * @param uuid - The uuid that needs to be validated.
 *
 * @internal
 */ function isValidUuid(uuid) {
    return validUuidRegex.test(uuid);
}
/**
 * Maps the response as follows:
 * - wraps the response body if needed (typically if its type is primitive).
 * - returns null if the combination of the headers and the body is empty.
 * - otherwise, returns the combination of the headers and the body.
 *
 * @param responseObject - a representation of the parsed response
 * @returns the response that will be returned to the user which can be null and/or wrapped
 *
 * @internal
 */ function handleNullableResponseAndWrappableBody(responseObject) {
    const combinedHeadersAndBody = {
        ...responseObject.headers,
        ...responseObject.body
    };
    if (responseObject.hasNullableType && Object.getOwnPropertyNames(combinedHeadersAndBody).length === 0) {
        return responseObject.shouldWrapBody ? {
            body: null
        } : null;
    } else {
        return responseObject.shouldWrapBody ? {
            ...responseObject.headers,
            body: responseObject.body
        } : combinedHeadersAndBody;
    }
}
/**
 * Take a `FullOperationResponse` and turn it into a flat
 * response object to hand back to the consumer.
 * @param fullResponse - The processed response from the operation request
 * @param responseSpec - The response map from the OperationSpec
 *
 * @internal
 */ function flattenResponse(fullResponse, responseSpec) {
    const parsedHeaders = fullResponse.parsedHeaders;
    // head methods never have a body, but we return a boolean set to body property
    // to indicate presence/absence of the resource
    if (fullResponse.request.method === "HEAD") {
        return {
            ...parsedHeaders,
            body: fullResponse.parsedBody
        };
    }
    const bodyMapper = responseSpec && responseSpec.bodyMapper;
    const isNullable = Boolean(bodyMapper?.nullable);
    const expectedBodyTypeName = bodyMapper?.type.name;
    /** If the body is asked for, we look at the expected body type to handle it */ if (expectedBodyTypeName === "Stream") {
        return {
            ...parsedHeaders,
            blobBody: fullResponse.blobBody,
            readableStreamBody: fullResponse.readableStreamBody
        };
    }
    const modelProperties = expectedBodyTypeName === "Composite" && bodyMapper.type.modelProperties || {};
    const isPageableResponse = Object.keys(modelProperties).some((k)=>modelProperties[k].serializedName === "");
    if (expectedBodyTypeName === "Sequence" || isPageableResponse) {
        const arrayResponse = fullResponse.parsedBody ?? [];
        for (const key of Object.keys(modelProperties)){
            if (modelProperties[key].serializedName) {
                arrayResponse[key] = fullResponse.parsedBody?.[key];
            }
        }
        if (parsedHeaders) {
            for (const key of Object.keys(parsedHeaders)){
                arrayResponse[key] = parsedHeaders[key];
            }
        }
        return isNullable && !fullResponse.parsedBody && !parsedHeaders && Object.getOwnPropertyNames(modelProperties).length === 0 ? null : arrayResponse;
    }
    return handleNullableResponseAndWrappableBody({
        body: fullResponse.parsedBody,
        headers: parsedHeaders,
        hasNullableType: isNullable,
        shouldWrapBody: isPrimitiveBody(fullResponse.parsedBody, expectedBodyTypeName)
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/serializer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapperTypeNames = void 0;
exports.createSerializer = createSerializer;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
const base64 = tslib_1.__importStar(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/base64.js [app-route] (ecmascript)"));
const interfaces_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/interfaces.js [app-route] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/utils.js [app-route] (ecmascript)");
class SerializerImpl {
    modelMappers;
    isXML;
    constructor(modelMappers = {}, isXML = false){
        this.modelMappers = modelMappers;
        this.isXML = isXML;
    }
    /**
     * @deprecated Removing the constraints validation on client side.
     */ validateConstraints(mapper, value, objectName) {
        const failValidation = (constraintName, constraintValue)=>{
            throw new Error(`"${objectName}" with value "${value}" should satisfy the constraint "${constraintName}": ${constraintValue}.`);
        };
        if (mapper.constraints && value !== undefined && value !== null) {
            const { ExclusiveMaximum, ExclusiveMinimum, InclusiveMaximum, InclusiveMinimum, MaxItems, MaxLength, MinItems, MinLength, MultipleOf, Pattern, UniqueItems } = mapper.constraints;
            if (ExclusiveMaximum !== undefined && value >= ExclusiveMaximum) {
                failValidation("ExclusiveMaximum", ExclusiveMaximum);
            }
            if (ExclusiveMinimum !== undefined && value <= ExclusiveMinimum) {
                failValidation("ExclusiveMinimum", ExclusiveMinimum);
            }
            if (InclusiveMaximum !== undefined && value > InclusiveMaximum) {
                failValidation("InclusiveMaximum", InclusiveMaximum);
            }
            if (InclusiveMinimum !== undefined && value < InclusiveMinimum) {
                failValidation("InclusiveMinimum", InclusiveMinimum);
            }
            if (MaxItems !== undefined && value.length > MaxItems) {
                failValidation("MaxItems", MaxItems);
            }
            if (MaxLength !== undefined && value.length > MaxLength) {
                failValidation("MaxLength", MaxLength);
            }
            if (MinItems !== undefined && value.length < MinItems) {
                failValidation("MinItems", MinItems);
            }
            if (MinLength !== undefined && value.length < MinLength) {
                failValidation("MinLength", MinLength);
            }
            if (MultipleOf !== undefined && value % MultipleOf !== 0) {
                failValidation("MultipleOf", MultipleOf);
            }
            if (Pattern) {
                const pattern = typeof Pattern === "string" ? new RegExp(Pattern) : Pattern;
                if (typeof value !== "string" || value.match(pattern) === null) {
                    failValidation("Pattern", Pattern);
                }
            }
            if (UniqueItems && value.some((item, i, ar)=>ar.indexOf(item) !== i)) {
                failValidation("UniqueItems", UniqueItems);
            }
        }
    }
    /**
     * Serialize the given object based on its metadata defined in the mapper
     *
     * @param mapper - The mapper which defines the metadata of the serializable object
     *
     * @param object - A valid Javascript object to be serialized
     *
     * @param objectName - Name of the serialized object
     *
     * @param options - additional options to serialization
     *
     * @returns A valid serialized Javascript object
     */ serialize(mapper, object, objectName, options = {
        xml: {}
    }) {
        const updatedOptions = {
            xml: {
                rootName: options.xml.rootName ?? "",
                includeRoot: options.xml.includeRoot ?? false,
                xmlCharKey: options.xml.xmlCharKey ?? interfaces_js_1.XML_CHARKEY
            }
        };
        let payload = {};
        const mapperType = mapper.type.name;
        if (!objectName) {
            objectName = mapper.serializedName;
        }
        if (mapperType.match(/^Sequence$/i) !== null) {
            payload = [];
        }
        if (mapper.isConstant) {
            object = mapper.defaultValue;
        }
        // This table of allowed values should help explain
        // the mapper.required and mapper.nullable properties.
        // X means "neither undefined or null are allowed".
        //           || required
        //           || true      | false
        //  nullable || ==========================
        //      true || null      | undefined/null
        //     false || X         | undefined
        // undefined || X         | undefined/null
        const { required, nullable } = mapper;
        if (required && nullable && object === undefined) {
            throw new Error(`${objectName} cannot be undefined.`);
        }
        if (required && !nullable && (object === undefined || object === null)) {
            throw new Error(`${objectName} cannot be null or undefined.`);
        }
        if (!required && nullable === false && object === null) {
            throw new Error(`${objectName} cannot be null.`);
        }
        if (object === undefined || object === null) {
            payload = object;
        } else {
            if (mapperType.match(/^any$/i) !== null) {
                payload = object;
            } else if (mapperType.match(/^(Number|String|Boolean|Object|Stream|Uuid)$/i) !== null) {
                payload = serializeBasicTypes(mapperType, objectName, object);
            } else if (mapperType.match(/^Enum$/i) !== null) {
                const enumMapper = mapper;
                payload = serializeEnumType(objectName, enumMapper.type.allowedValues, object);
            } else if (mapperType.match(/^(Date|DateTime|TimeSpan|DateTimeRfc1123|UnixTime)$/i) !== null) {
                payload = serializeDateTypes(mapperType, object, objectName);
            } else if (mapperType.match(/^ByteArray$/i) !== null) {
                payload = serializeByteArrayType(objectName, object);
            } else if (mapperType.match(/^Base64Url$/i) !== null) {
                payload = serializeBase64UrlType(objectName, object);
            } else if (mapperType.match(/^Sequence$/i) !== null) {
                payload = serializeSequenceType(this, mapper, object, objectName, Boolean(this.isXML), updatedOptions);
            } else if (mapperType.match(/^Dictionary$/i) !== null) {
                payload = serializeDictionaryType(this, mapper, object, objectName, Boolean(this.isXML), updatedOptions);
            } else if (mapperType.match(/^Composite$/i) !== null) {
                payload = serializeCompositeType(this, mapper, object, objectName, Boolean(this.isXML), updatedOptions);
            }
        }
        return payload;
    }
    /**
     * Deserialize the given object based on its metadata defined in the mapper
     *
     * @param mapper - The mapper which defines the metadata of the serializable object
     *
     * @param responseBody - A valid Javascript entity to be deserialized
     *
     * @param objectName - Name of the deserialized object
     *
     * @param options - Controls behavior of XML parser and builder.
     *
     * @returns A valid deserialized Javascript object
     */ deserialize(mapper, responseBody, objectName, options = {
        xml: {}
    }) {
        const updatedOptions = {
            xml: {
                rootName: options.xml.rootName ?? "",
                includeRoot: options.xml.includeRoot ?? false,
                xmlCharKey: options.xml.xmlCharKey ?? interfaces_js_1.XML_CHARKEY
            },
            ignoreUnknownProperties: options.ignoreUnknownProperties ?? false
        };
        if (responseBody === undefined || responseBody === null) {
            if (this.isXML && mapper.type.name === "Sequence" && !mapper.xmlIsWrapped) {
                // Edge case for empty XML non-wrapped lists. xml2js can't distinguish
                // between the list being empty versus being missing,
                // so let's do the more user-friendly thing and return an empty list.
                responseBody = [];
            }
            // specifically check for undefined as default value can be a falsey value `0, "", false, null`
            if (mapper.defaultValue !== undefined) {
                responseBody = mapper.defaultValue;
            }
            return responseBody;
        }
        let payload;
        const mapperType = mapper.type.name;
        if (!objectName) {
            objectName = mapper.serializedName;
        }
        if (mapperType.match(/^Composite$/i) !== null) {
            payload = deserializeCompositeType(this, mapper, responseBody, objectName, updatedOptions);
        } else {
            if (this.isXML) {
                const xmlCharKey = updatedOptions.xml.xmlCharKey;
                /**
                 * If the mapper specifies this as a non-composite type value but the responseBody contains
                 * both header ("$" i.e., XML_ATTRKEY) and body ("#" i.e., XML_CHARKEY) properties,
                 * then just reduce the responseBody value to the body ("#" i.e., XML_CHARKEY) property.
                 */ if (responseBody[interfaces_js_1.XML_ATTRKEY] !== undefined && responseBody[xmlCharKey] !== undefined) {
                    responseBody = responseBody[xmlCharKey];
                }
            }
            if (mapperType.match(/^Number$/i) !== null) {
                payload = parseFloat(responseBody);
                if (isNaN(payload)) {
                    payload = responseBody;
                }
            } else if (mapperType.match(/^Boolean$/i) !== null) {
                if (responseBody === "true") {
                    payload = true;
                } else if (responseBody === "false") {
                    payload = false;
                } else {
                    payload = responseBody;
                }
            } else if (mapperType.match(/^(String|Enum|Object|Stream|Uuid|TimeSpan|any)$/i) !== null) {
                payload = responseBody;
            } else if (mapperType.match(/^(Date|DateTime|DateTimeRfc1123)$/i) !== null) {
                payload = new Date(responseBody);
            } else if (mapperType.match(/^UnixTime$/i) !== null) {
                payload = unixTimeToDate(responseBody);
            } else if (mapperType.match(/^ByteArray$/i) !== null) {
                payload = base64.decodeString(responseBody);
            } else if (mapperType.match(/^Base64Url$/i) !== null) {
                payload = base64UrlToByteArray(responseBody);
            } else if (mapperType.match(/^Sequence$/i) !== null) {
                payload = deserializeSequenceType(this, mapper, responseBody, objectName, updatedOptions);
            } else if (mapperType.match(/^Dictionary$/i) !== null) {
                payload = deserializeDictionaryType(this, mapper, responseBody, objectName, updatedOptions);
            }
        }
        if (mapper.isConstant) {
            payload = mapper.defaultValue;
        }
        return payload;
    }
}
/**
 * Method that creates and returns a Serializer.
 * @param modelMappers - Known models to map
 * @param isXML - If XML should be supported
 */ function createSerializer(modelMappers = {}, isXML = false) {
    return new SerializerImpl(modelMappers, isXML);
}
function trimEnd(str, ch) {
    let len = str.length;
    while(len - 1 >= 0 && str[len - 1] === ch){
        --len;
    }
    return str.substr(0, len);
}
function bufferToBase64Url(buffer) {
    if (!buffer) {
        return undefined;
    }
    if (!(buffer instanceof Uint8Array)) {
        throw new Error(`Please provide an input of type Uint8Array for converting to Base64Url.`);
    }
    // Uint8Array to Base64.
    const str = base64.encodeByteArray(buffer);
    // Base64 to Base64Url.
    return trimEnd(str, "=").replace(/\+/g, "-").replace(/\//g, "_");
}
function base64UrlToByteArray(str) {
    if (!str) {
        return undefined;
    }
    if (str && typeof str.valueOf() !== "string") {
        throw new Error("Please provide an input of type string for converting to Uint8Array");
    }
    // Base64Url to Base64.
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    // Base64 to Uint8Array.
    return base64.decodeString(str);
}
function splitSerializeName(prop) {
    const classes = [];
    let partialclass = "";
    if (prop) {
        const subwords = prop.split(".");
        for (const item of subwords){
            if (item.charAt(item.length - 1) === "\\") {
                partialclass += item.substr(0, item.length - 1) + ".";
            } else {
                partialclass += item;
                classes.push(partialclass);
                partialclass = "";
            }
        }
    }
    return classes;
}
function dateToUnixTime(d) {
    if (!d) {
        return undefined;
    }
    if (typeof d.valueOf() === "string") {
        d = new Date(d);
    }
    return Math.floor(d.getTime() / 1000);
}
function unixTimeToDate(n) {
    if (!n) {
        return undefined;
    }
    return new Date(n * 1000);
}
function serializeBasicTypes(typeName, objectName, value) {
    if (value !== null && value !== undefined) {
        if (typeName.match(/^Number$/i) !== null) {
            if (typeof value !== "number") {
                throw new Error(`${objectName} with value ${value} must be of type number.`);
            }
        } else if (typeName.match(/^String$/i) !== null) {
            if (typeof value.valueOf() !== "string") {
                throw new Error(`${objectName} with value "${value}" must be of type string.`);
            }
        } else if (typeName.match(/^Uuid$/i) !== null) {
            if (!(typeof value.valueOf() === "string" && (0, utils_js_1.isValidUuid)(value))) {
                throw new Error(`${objectName} with value "${value}" must be of type string and a valid uuid.`);
            }
        } else if (typeName.match(/^Boolean$/i) !== null) {
            if (typeof value !== "boolean") {
                throw new Error(`${objectName} with value ${value} must be of type boolean.`);
            }
        } else if (typeName.match(/^Stream$/i) !== null) {
            const objectType = typeof value;
            if (objectType !== "string" && typeof value.pipe !== "function" && // NodeJS.ReadableStream
            typeof value.tee !== "function" && // browser ReadableStream
            !(value instanceof ArrayBuffer) && !ArrayBuffer.isView(value) && // File objects count as a type of Blob, so we want to use instanceof explicitly
            !((typeof Blob === "function" || typeof Blob === "object") && value instanceof Blob) && objectType !== "function") {
                throw new Error(`${objectName} must be a string, Blob, ArrayBuffer, ArrayBufferView, ReadableStream, or () => ReadableStream.`);
            }
        }
    }
    return value;
}
function serializeEnumType(objectName, allowedValues, value) {
    if (!allowedValues) {
        throw new Error(`Please provide a set of allowedValues to validate ${objectName} as an Enum Type.`);
    }
    const isPresent = allowedValues.some((item)=>{
        if (typeof item.valueOf() === "string") {
            return item.toLowerCase() === value.toLowerCase();
        }
        return item === value;
    });
    if (!isPresent) {
        throw new Error(`${value} is not a valid value for ${objectName}. The valid values are: ${JSON.stringify(allowedValues)}.`);
    }
    return value;
}
function serializeByteArrayType(objectName, value) {
    if (value !== undefined && value !== null) {
        if (!(value instanceof Uint8Array)) {
            throw new Error(`${objectName} must be of type Uint8Array.`);
        }
        value = base64.encodeByteArray(value);
    }
    return value;
}
function serializeBase64UrlType(objectName, value) {
    if (value !== undefined && value !== null) {
        if (!(value instanceof Uint8Array)) {
            throw new Error(`${objectName} must be of type Uint8Array.`);
        }
        value = bufferToBase64Url(value);
    }
    return value;
}
function serializeDateTypes(typeName, value, objectName) {
    if (value !== undefined && value !== null) {
        if (typeName.match(/^Date$/i) !== null) {
            if (!(value instanceof Date || typeof value.valueOf() === "string" && !isNaN(Date.parse(value)))) {
                throw new Error(`${objectName} must be an instanceof Date or a string in ISO8601 format.`);
            }
            value = value instanceof Date ? value.toISOString().substring(0, 10) : new Date(value).toISOString().substring(0, 10);
        } else if (typeName.match(/^DateTime$/i) !== null) {
            if (!(value instanceof Date || typeof value.valueOf() === "string" && !isNaN(Date.parse(value)))) {
                throw new Error(`${objectName} must be an instanceof Date or a string in ISO8601 format.`);
            }
            value = value instanceof Date ? value.toISOString() : new Date(value).toISOString();
        } else if (typeName.match(/^DateTimeRfc1123$/i) !== null) {
            if (!(value instanceof Date || typeof value.valueOf() === "string" && !isNaN(Date.parse(value)))) {
                throw new Error(`${objectName} must be an instanceof Date or a string in RFC-1123 format.`);
            }
            value = value instanceof Date ? value.toUTCString() : new Date(value).toUTCString();
        } else if (typeName.match(/^UnixTime$/i) !== null) {
            if (!(value instanceof Date || typeof value.valueOf() === "string" && !isNaN(Date.parse(value)))) {
                throw new Error(`${objectName} must be an instanceof Date or a string in RFC-1123/ISO8601 format ` + `for it to be serialized in UnixTime/Epoch format.`);
            }
            value = dateToUnixTime(value);
        } else if (typeName.match(/^TimeSpan$/i) !== null) {
            if (!(0, utils_js_1.isDuration)(value)) {
                throw new Error(`${objectName} must be a string in ISO 8601 format. Instead was "${value}".`);
            }
        }
    }
    return value;
}
function serializeSequenceType(serializer, mapper, object, objectName, isXml, options) {
    if (!Array.isArray(object)) {
        throw new Error(`${objectName} must be of type Array.`);
    }
    let elementType = mapper.type.element;
    if (!elementType || typeof elementType !== "object") {
        throw new Error(`element" metadata for an Array must be defined in the ` + `mapper and it must of type "object" in ${objectName}.`);
    }
    // Quirk: Composite mappers referenced by `element` might
    // not have *all* properties declared (like uberParent),
    // so let's try to look up the full definition by name.
    if (elementType.type.name === "Composite" && elementType.type.className) {
        elementType = serializer.modelMappers[elementType.type.className] ?? elementType;
    }
    const tempArray = [];
    for(let i = 0; i < object.length; i++){
        const serializedValue = serializer.serialize(elementType, object[i], objectName, options);
        if (isXml && elementType.xmlNamespace) {
            const xmlnsKey = elementType.xmlNamespacePrefix ? `xmlns:${elementType.xmlNamespacePrefix}` : "xmlns";
            if (elementType.type.name === "Composite") {
                tempArray[i] = {
                    ...serializedValue
                };
                tempArray[i][interfaces_js_1.XML_ATTRKEY] = {
                    [xmlnsKey]: elementType.xmlNamespace
                };
            } else {
                tempArray[i] = {};
                tempArray[i][options.xml.xmlCharKey] = serializedValue;
                tempArray[i][interfaces_js_1.XML_ATTRKEY] = {
                    [xmlnsKey]: elementType.xmlNamespace
                };
            }
        } else {
            tempArray[i] = serializedValue;
        }
    }
    return tempArray;
}
function serializeDictionaryType(serializer, mapper, object, objectName, isXml, options) {
    if (typeof object !== "object") {
        throw new Error(`${objectName} must be of type object.`);
    }
    const valueType = mapper.type.value;
    if (!valueType || typeof valueType !== "object") {
        throw new Error(`"value" metadata for a Dictionary must be defined in the ` + `mapper and it must of type "object" in ${objectName}.`);
    }
    const tempDictionary = {};
    for (const key of Object.keys(object)){
        const serializedValue = serializer.serialize(valueType, object[key], objectName, options);
        // If the element needs an XML namespace we need to add it within the $ property
        tempDictionary[key] = getXmlObjectValue(valueType, serializedValue, isXml, options);
    }
    // Add the namespace to the root element if needed
    if (isXml && mapper.xmlNamespace) {
        const xmlnsKey = mapper.xmlNamespacePrefix ? `xmlns:${mapper.xmlNamespacePrefix}` : "xmlns";
        const result = tempDictionary;
        result[interfaces_js_1.XML_ATTRKEY] = {
            [xmlnsKey]: mapper.xmlNamespace
        };
        return result;
    }
    return tempDictionary;
}
/**
 * Resolves the additionalProperties property from a referenced mapper
 * @param serializer - the serializer containing the entire set of mappers
 * @param mapper - the composite mapper to resolve
 * @param objectName - name of the object being serialized
 */ function resolveAdditionalProperties(serializer, mapper, objectName) {
    const additionalProperties = mapper.type.additionalProperties;
    if (!additionalProperties && mapper.type.className) {
        const modelMapper = resolveReferencedMapper(serializer, mapper, objectName);
        return modelMapper?.type.additionalProperties;
    }
    return additionalProperties;
}
/**
 * Finds the mapper referenced by className
 * @param serializer - the serializer containing the entire set of mappers
 * @param mapper - the composite mapper to resolve
 * @param objectName - name of the object being serialized
 */ function resolveReferencedMapper(serializer, mapper, objectName) {
    const className = mapper.type.className;
    if (!className) {
        throw new Error(`Class name for model "${objectName}" is not provided in the mapper "${JSON.stringify(mapper, undefined, 2)}".`);
    }
    return serializer.modelMappers[className];
}
/**
 * Resolves a composite mapper's modelProperties.
 * @param serializer - the serializer containing the entire set of mappers
 * @param mapper - the composite mapper to resolve
 */ function resolveModelProperties(serializer, mapper, objectName) {
    let modelProps = mapper.type.modelProperties;
    if (!modelProps) {
        const modelMapper = resolveReferencedMapper(serializer, mapper, objectName);
        if (!modelMapper) {
            throw new Error(`mapper() cannot be null or undefined for model "${mapper.type.className}".`);
        }
        modelProps = modelMapper?.type.modelProperties;
        if (!modelProps) {
            throw new Error(`modelProperties cannot be null or undefined in the ` + `mapper "${JSON.stringify(modelMapper)}" of type "${mapper.type.className}" for object "${objectName}".`);
        }
    }
    return modelProps;
}
function serializeCompositeType(serializer, mapper, object, objectName, isXml, options) {
    if (getPolymorphicDiscriminatorRecursively(serializer, mapper)) {
        mapper = getPolymorphicMapper(serializer, mapper, object, "clientName");
    }
    if (object !== undefined && object !== null) {
        const payload = {};
        const modelProps = resolveModelProperties(serializer, mapper, objectName);
        for (const key of Object.keys(modelProps)){
            const propertyMapper = modelProps[key];
            if (propertyMapper.readOnly) {
                continue;
            }
            let propName;
            let parentObject = payload;
            if (serializer.isXML) {
                if (propertyMapper.xmlIsWrapped) {
                    propName = propertyMapper.xmlName;
                } else {
                    propName = propertyMapper.xmlElementName || propertyMapper.xmlName;
                }
            } else {
                const paths = splitSerializeName(propertyMapper.serializedName);
                propName = paths.pop();
                for (const pathName of paths){
                    const childObject = parentObject[pathName];
                    if ((childObject === undefined || childObject === null) && (object[key] !== undefined && object[key] !== null || propertyMapper.defaultValue !== undefined)) {
                        parentObject[pathName] = {};
                    }
                    parentObject = parentObject[pathName];
                }
            }
            if (parentObject !== undefined && parentObject !== null) {
                if (isXml && mapper.xmlNamespace) {
                    const xmlnsKey = mapper.xmlNamespacePrefix ? `xmlns:${mapper.xmlNamespacePrefix}` : "xmlns";
                    parentObject[interfaces_js_1.XML_ATTRKEY] = {
                        ...parentObject[interfaces_js_1.XML_ATTRKEY],
                        [xmlnsKey]: mapper.xmlNamespace
                    };
                }
                const propertyObjectName = propertyMapper.serializedName !== "" ? objectName + "." + propertyMapper.serializedName : objectName;
                let toSerialize = object[key];
                const polymorphicDiscriminator = getPolymorphicDiscriminatorRecursively(serializer, mapper);
                if (polymorphicDiscriminator && polymorphicDiscriminator.clientName === key && (toSerialize === undefined || toSerialize === null)) {
                    toSerialize = mapper.serializedName;
                }
                const serializedValue = serializer.serialize(propertyMapper, toSerialize, propertyObjectName, options);
                if (serializedValue !== undefined && propName !== undefined && propName !== null) {
                    const value = getXmlObjectValue(propertyMapper, serializedValue, isXml, options);
                    if (isXml && propertyMapper.xmlIsAttribute) {
                        // XML_ATTRKEY, i.e., $ is the key attributes are kept under in xml2js.
                        // This keeps things simple while preventing name collision
                        // with names in user documents.
                        parentObject[interfaces_js_1.XML_ATTRKEY] = parentObject[interfaces_js_1.XML_ATTRKEY] || {};
                        parentObject[interfaces_js_1.XML_ATTRKEY][propName] = serializedValue;
                    } else if (isXml && propertyMapper.xmlIsWrapped) {
                        parentObject[propName] = {
                            [propertyMapper.xmlElementName]: value
                        };
                    } else {
                        parentObject[propName] = value;
                    }
                }
            }
        }
        const additionalPropertiesMapper = resolveAdditionalProperties(serializer, mapper, objectName);
        if (additionalPropertiesMapper) {
            const propNames = Object.keys(modelProps);
            for(const clientPropName in object){
                const isAdditionalProperty = propNames.every((pn)=>pn !== clientPropName);
                if (isAdditionalProperty) {
                    payload[clientPropName] = serializer.serialize(additionalPropertiesMapper, object[clientPropName], objectName + '["' + clientPropName + '"]', options);
                }
            }
        }
        return payload;
    }
    return object;
}
function getXmlObjectValue(propertyMapper, serializedValue, isXml, options) {
    if (!isXml || !propertyMapper.xmlNamespace) {
        return serializedValue;
    }
    const xmlnsKey = propertyMapper.xmlNamespacePrefix ? `xmlns:${propertyMapper.xmlNamespacePrefix}` : "xmlns";
    const xmlNamespace = {
        [xmlnsKey]: propertyMapper.xmlNamespace
    };
    if ([
        "Composite"
    ].includes(propertyMapper.type.name)) {
        if (serializedValue[interfaces_js_1.XML_ATTRKEY]) {
            return serializedValue;
        } else {
            const result = {
                ...serializedValue
            };
            result[interfaces_js_1.XML_ATTRKEY] = xmlNamespace;
            return result;
        }
    }
    const result = {};
    result[options.xml.xmlCharKey] = serializedValue;
    result[interfaces_js_1.XML_ATTRKEY] = xmlNamespace;
    return result;
}
function isSpecialXmlProperty(propertyName, options) {
    return [
        interfaces_js_1.XML_ATTRKEY,
        options.xml.xmlCharKey
    ].includes(propertyName);
}
function deserializeCompositeType(serializer, mapper, responseBody, objectName, options) {
    const xmlCharKey = options.xml.xmlCharKey ?? interfaces_js_1.XML_CHARKEY;
    if (getPolymorphicDiscriminatorRecursively(serializer, mapper)) {
        mapper = getPolymorphicMapper(serializer, mapper, responseBody, "serializedName");
    }
    const modelProps = resolveModelProperties(serializer, mapper, objectName);
    let instance = {};
    const handledPropertyNames = [];
    for (const key of Object.keys(modelProps)){
        const propertyMapper = modelProps[key];
        const paths = splitSerializeName(modelProps[key].serializedName);
        handledPropertyNames.push(paths[0]);
        const { serializedName, xmlName, xmlElementName } = propertyMapper;
        let propertyObjectName = objectName;
        if (serializedName !== "" && serializedName !== undefined) {
            propertyObjectName = objectName + "." + serializedName;
        }
        const headerCollectionPrefix = propertyMapper.headerCollectionPrefix;
        if (headerCollectionPrefix) {
            const dictionary = {};
            for (const headerKey of Object.keys(responseBody)){
                if (headerKey.startsWith(headerCollectionPrefix)) {
                    dictionary[headerKey.substring(headerCollectionPrefix.length)] = serializer.deserialize(propertyMapper.type.value, responseBody[headerKey], propertyObjectName, options);
                }
                handledPropertyNames.push(headerKey);
            }
            instance[key] = dictionary;
        } else if (serializer.isXML) {
            if (propertyMapper.xmlIsAttribute && responseBody[interfaces_js_1.XML_ATTRKEY]) {
                instance[key] = serializer.deserialize(propertyMapper, responseBody[interfaces_js_1.XML_ATTRKEY][xmlName], propertyObjectName, options);
            } else if (propertyMapper.xmlIsMsText) {
                if (responseBody[xmlCharKey] !== undefined) {
                    instance[key] = responseBody[xmlCharKey];
                } else if (typeof responseBody === "string") {
                    // The special case where xml parser parses "<Name>content</Name>" into JSON of
                    //   `{ name: "content"}` instead of `{ name: { "_": "content" }}`
                    instance[key] = responseBody;
                }
            } else {
                const propertyName = xmlElementName || xmlName || serializedName;
                if (propertyMapper.xmlIsWrapped) {
                    /* a list of <xmlElementName> wrapped by <xmlName>
                      For the xml example below
                        <Cors>
                          <CorsRule>...</CorsRule>
                          <CorsRule>...</CorsRule>
                        </Cors>
                      the responseBody has
                        {
                          Cors: {
                            CorsRule: [{...}, {...}]
                          }
                        }
                      xmlName is "Cors" and xmlElementName is"CorsRule".
                    */ const wrapped = responseBody[xmlName];
                    const elementList = wrapped?.[xmlElementName] ?? [];
                    instance[key] = serializer.deserialize(propertyMapper, elementList, propertyObjectName, options);
                    handledPropertyNames.push(xmlName);
                } else {
                    const property = responseBody[propertyName];
                    instance[key] = serializer.deserialize(propertyMapper, property, propertyObjectName, options);
                    handledPropertyNames.push(propertyName);
                }
            }
        } else {
            // deserialize the property if it is present in the provided responseBody instance
            let propertyInstance;
            let res = responseBody;
            // traversing the object step by step.
            let steps = 0;
            for (const item of paths){
                if (!res) break;
                steps++;
                res = res[item];
            }
            // only accept null when reaching the last position of object otherwise it would be undefined
            if (res === null && steps < paths.length) {
                res = undefined;
            }
            propertyInstance = res;
            const polymorphicDiscriminator = mapper.type.polymorphicDiscriminator;
            // checking that the model property name (key)(ex: "fishtype") and the
            // clientName of the polymorphicDiscriminator {metadata} (ex: "fishtype")
            // instead of the serializedName of the polymorphicDiscriminator (ex: "fish.type")
            // is a better approach. The generator is not consistent with escaping '\.' in the
            // serializedName of the property (ex: "fish\.type") that is marked as polymorphic discriminator
            // and the serializedName of the metadata polymorphicDiscriminator (ex: "fish.type"). However,
            // the clientName transformation of the polymorphicDiscriminator (ex: "fishtype") and
            // the transformation of model property name (ex: "fishtype") is done consistently.
            // Hence, it is a safer bet to rely on the clientName of the polymorphicDiscriminator.
            if (polymorphicDiscriminator && key === polymorphicDiscriminator.clientName && (propertyInstance === undefined || propertyInstance === null)) {
                propertyInstance = mapper.serializedName;
            }
            let serializedValue;
            // paging
            if (Array.isArray(responseBody[key]) && modelProps[key].serializedName === "") {
                propertyInstance = responseBody[key];
                const arrayInstance = serializer.deserialize(propertyMapper, propertyInstance, propertyObjectName, options);
                // Copy over any properties that have already been added into the instance, where they do
                // not exist on the newly de-serialized array
                for (const [k, v] of Object.entries(instance)){
                    if (!Object.prototype.hasOwnProperty.call(arrayInstance, k)) {
                        arrayInstance[k] = v;
                    }
                }
                instance = arrayInstance;
            } else if (propertyInstance !== undefined || propertyMapper.defaultValue !== undefined) {
                serializedValue = serializer.deserialize(propertyMapper, propertyInstance, propertyObjectName, options);
                instance[key] = serializedValue;
            }
        }
    }
    const additionalPropertiesMapper = mapper.type.additionalProperties;
    if (additionalPropertiesMapper) {
        const isAdditionalProperty = (responsePropName)=>{
            for(const clientPropName in modelProps){
                const paths = splitSerializeName(modelProps[clientPropName].serializedName);
                if (paths[0] === responsePropName) {
                    return false;
                }
            }
            return true;
        };
        for(const responsePropName in responseBody){
            if (isAdditionalProperty(responsePropName)) {
                instance[responsePropName] = serializer.deserialize(additionalPropertiesMapper, responseBody[responsePropName], objectName + '["' + responsePropName + '"]', options);
            }
        }
    } else if (responseBody && !options.ignoreUnknownProperties) {
        for (const key of Object.keys(responseBody)){
            if (instance[key] === undefined && !handledPropertyNames.includes(key) && !isSpecialXmlProperty(key, options)) {
                instance[key] = responseBody[key];
            }
        }
    }
    return instance;
}
function deserializeDictionaryType(serializer, mapper, responseBody, objectName, options) {
    /* jshint validthis: true */ const value = mapper.type.value;
    if (!value || typeof value !== "object") {
        throw new Error(`"value" metadata for a Dictionary must be defined in the ` + `mapper and it must of type "object" in ${objectName}`);
    }
    if (responseBody) {
        const tempDictionary = {};
        for (const key of Object.keys(responseBody)){
            tempDictionary[key] = serializer.deserialize(value, responseBody[key], objectName, options);
        }
        return tempDictionary;
    }
    return responseBody;
}
function deserializeSequenceType(serializer, mapper, responseBody, objectName, options) {
    let element = mapper.type.element;
    if (!element || typeof element !== "object") {
        throw new Error(`element" metadata for an Array must be defined in the ` + `mapper and it must of type "object" in ${objectName}`);
    }
    if (responseBody) {
        if (!Array.isArray(responseBody)) {
            // xml2js will interpret a single element array as just the element, so force it to be an array
            responseBody = [
                responseBody
            ];
        }
        // Quirk: Composite mappers referenced by `element` might
        // not have *all* properties declared (like uberParent),
        // so let's try to look up the full definition by name.
        if (element.type.name === "Composite" && element.type.className) {
            element = serializer.modelMappers[element.type.className] ?? element;
        }
        const tempArray = [];
        for(let i = 0; i < responseBody.length; i++){
            tempArray[i] = serializer.deserialize(element, responseBody[i], `${objectName}[${i}]`, options);
        }
        return tempArray;
    }
    return responseBody;
}
function getIndexDiscriminator(discriminators, discriminatorValue, typeName) {
    const typeNamesToCheck = [
        typeName
    ];
    while(typeNamesToCheck.length){
        const currentName = typeNamesToCheck.shift();
        const indexDiscriminator = discriminatorValue === currentName ? discriminatorValue : currentName + "." + discriminatorValue;
        if (Object.prototype.hasOwnProperty.call(discriminators, indexDiscriminator)) {
            return discriminators[indexDiscriminator];
        } else {
            for (const [name, mapper] of Object.entries(discriminators)){
                if (name.startsWith(currentName + ".") && mapper.type.uberParent === currentName && mapper.type.className) {
                    typeNamesToCheck.push(mapper.type.className);
                }
            }
        }
    }
    return undefined;
}
function getPolymorphicMapper(serializer, mapper, object, polymorphicPropertyName) {
    const polymorphicDiscriminator = getPolymorphicDiscriminatorRecursively(serializer, mapper);
    if (polymorphicDiscriminator) {
        let discriminatorName = polymorphicDiscriminator[polymorphicPropertyName];
        if (discriminatorName) {
            // The serializedName might have \\, which we just want to ignore
            if (polymorphicPropertyName === "serializedName") {
                discriminatorName = discriminatorName.replace(/\\/gi, "");
            }
            const discriminatorValue = object[discriminatorName];
            const typeName = mapper.type.uberParent ?? mapper.type.className;
            if (typeof discriminatorValue === "string" && typeName) {
                const polymorphicMapper = getIndexDiscriminator(serializer.modelMappers.discriminators, discriminatorValue, typeName);
                if (polymorphicMapper) {
                    mapper = polymorphicMapper;
                }
            }
        }
    }
    return mapper;
}
function getPolymorphicDiscriminatorRecursively(serializer, mapper) {
    return mapper.type.polymorphicDiscriminator || getPolymorphicDiscriminatorSafely(serializer, mapper.type.uberParent) || getPolymorphicDiscriminatorSafely(serializer, mapper.type.className);
}
function getPolymorphicDiscriminatorSafely(serializer, typeName) {
    return typeName && serializer.modelMappers[typeName] && serializer.modelMappers[typeName].type.polymorphicDiscriminator;
}
/**
 * Known types of Mappers
 */ exports.MapperTypeNames = {
    Base64Url: "Base64Url",
    Boolean: "Boolean",
    ByteArray: "ByteArray",
    Composite: "Composite",
    Date: "Date",
    DateTime: "DateTime",
    DateTimeRfc1123: "DateTimeRfc1123",
    Dictionary: "Dictionary",
    Enum: "Enum",
    Number: "Number",
    Object: "Object",
    Sequence: "Sequence",
    String: "String",
    Stream: "Stream",
    TimeSpan: "TimeSpan",
    UnixTime: "UnixTime"
}; //# sourceMappingURL=serializer.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.state = void 0;
/**
 * Holds the singleton operationRequestMap, to be shared across CJS and ESM imports.
 */ exports.state = {
    operationRequestMap: new WeakMap()
}; //# sourceMappingURL=state-cjs.cjs.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/operationHelpers.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOperationArgumentValueFromParameter = getOperationArgumentValueFromParameter;
exports.getOperationRequestInfo = getOperationRequestInfo;
const state_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/state.js [app-route] (ecmascript)");
/**
 * @internal
 * Retrieves the value to use for a given operation argument
 * @param operationArguments - The arguments passed from the generated client
 * @param parameter - The parameter description
 * @param fallbackObject - If something isn't found in the arguments bag, look here.
 *  Generally used to look at the service client properties.
 */ function getOperationArgumentValueFromParameter(operationArguments, parameter, fallbackObject) {
    let parameterPath = parameter.parameterPath;
    const parameterMapper = parameter.mapper;
    let value;
    if (typeof parameterPath === "string") {
        parameterPath = [
            parameterPath
        ];
    }
    if (Array.isArray(parameterPath)) {
        if (parameterPath.length > 0) {
            if (parameterMapper.isConstant) {
                value = parameterMapper.defaultValue;
            } else {
                let propertySearchResult = getPropertyFromParameterPath(operationArguments, parameterPath);
                if (!propertySearchResult.propertyFound && fallbackObject) {
                    propertySearchResult = getPropertyFromParameterPath(fallbackObject, parameterPath);
                }
                let useDefaultValue = false;
                if (!propertySearchResult.propertyFound) {
                    useDefaultValue = parameterMapper.required || parameterPath[0] === "options" && parameterPath.length === 2;
                }
                value = useDefaultValue ? parameterMapper.defaultValue : propertySearchResult.propertyValue;
            }
        }
    } else {
        if (parameterMapper.required) {
            value = {};
        }
        for(const propertyName in parameterPath){
            const propertyMapper = parameterMapper.type.modelProperties[propertyName];
            const propertyPath = parameterPath[propertyName];
            const propertyValue = getOperationArgumentValueFromParameter(operationArguments, {
                parameterPath: propertyPath,
                mapper: propertyMapper
            }, fallbackObject);
            if (propertyValue !== undefined) {
                if (!value) {
                    value = {};
                }
                value[propertyName] = propertyValue;
            }
        }
    }
    return value;
}
function getPropertyFromParameterPath(parent, parameterPath) {
    const result = {
        propertyFound: false
    };
    let i = 0;
    for(; i < parameterPath.length; ++i){
        const parameterPathPart = parameterPath[i];
        // Make sure to check inherited properties too, so don't use hasOwnProperty().
        if (parent && parameterPathPart in parent) {
            parent = parent[parameterPathPart];
        } else {
            break;
        }
    }
    if (i === parameterPath.length) {
        result.propertyValue = parent;
        result.propertyFound = true;
    }
    return result;
}
const originalRequestSymbol = Symbol.for("@azure/core-client original request");
function hasOriginalRequest(request) {
    return originalRequestSymbol in request;
}
function getOperationRequestInfo(request) {
    if (hasOriginalRequest(request)) {
        return getOperationRequestInfo(request[originalRequestSymbol]);
    }
    let info = state_js_1.state.operationRequestMap.get(request);
    if (!info) {
        info = {};
        state_js_1.state.operationRequestMap.set(request, info);
    }
    return info;
} //# sourceMappingURL=operationHelpers.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/deserializationPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deserializationPolicyName = void 0;
exports.deserializationPolicy = deserializationPolicy;
const interfaces_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/interfaces.js [app-route] (ecmascript)");
const core_rest_pipeline_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/index.js [app-route] (ecmascript)");
const serializer_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/serializer.js [app-route] (ecmascript)");
const operationHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/operationHelpers.js [app-route] (ecmascript)");
const defaultJsonContentTypes = [
    "application/json",
    "text/json"
];
const defaultXmlContentTypes = [
    "application/xml",
    "application/atom+xml"
];
/**
 * The programmatic identifier of the deserializationPolicy.
 */ exports.deserializationPolicyName = "deserializationPolicy";
/**
 * This policy handles parsing out responses according to OperationSpecs on the request.
 */ function deserializationPolicy(options = {}) {
    const jsonContentTypes = options.expectedContentTypes?.json ?? defaultJsonContentTypes;
    const xmlContentTypes = options.expectedContentTypes?.xml ?? defaultXmlContentTypes;
    const parseXML = options.parseXML;
    const serializerOptions = options.serializerOptions;
    const updatedOptions = {
        xml: {
            rootName: serializerOptions?.xml.rootName ?? "",
            includeRoot: serializerOptions?.xml.includeRoot ?? false,
            xmlCharKey: serializerOptions?.xml.xmlCharKey ?? interfaces_js_1.XML_CHARKEY
        }
    };
    return {
        name: exports.deserializationPolicyName,
        async sendRequest (request, next) {
            const response = await next(request);
            return deserializeResponseBody(jsonContentTypes, xmlContentTypes, response, updatedOptions, parseXML);
        }
    };
}
function getOperationResponseMap(parsedResponse) {
    let result;
    const request = parsedResponse.request;
    const operationInfo = (0, operationHelpers_js_1.getOperationRequestInfo)(request);
    const operationSpec = operationInfo?.operationSpec;
    if (operationSpec) {
        if (!operationInfo?.operationResponseGetter) {
            result = operationSpec.responses[parsedResponse.status];
        } else {
            result = operationInfo?.operationResponseGetter(operationSpec, parsedResponse);
        }
    }
    return result;
}
function shouldDeserializeResponse(parsedResponse) {
    const request = parsedResponse.request;
    const operationInfo = (0, operationHelpers_js_1.getOperationRequestInfo)(request);
    const shouldDeserialize = operationInfo?.shouldDeserialize;
    let result;
    if (shouldDeserialize === undefined) {
        result = true;
    } else if (typeof shouldDeserialize === "boolean") {
        result = shouldDeserialize;
    } else {
        result = shouldDeserialize(parsedResponse);
    }
    return result;
}
async function deserializeResponseBody(jsonContentTypes, xmlContentTypes, response, options, parseXML) {
    const parsedResponse = await parse(jsonContentTypes, xmlContentTypes, response, options, parseXML);
    if (!shouldDeserializeResponse(parsedResponse)) {
        return parsedResponse;
    }
    const operationInfo = (0, operationHelpers_js_1.getOperationRequestInfo)(parsedResponse.request);
    const operationSpec = operationInfo?.operationSpec;
    if (!operationSpec || !operationSpec.responses) {
        return parsedResponse;
    }
    const responseSpec = getOperationResponseMap(parsedResponse);
    const { error, shouldReturnResponse } = handleErrorResponse(parsedResponse, operationSpec, responseSpec, options);
    if (error) {
        throw error;
    } else if (shouldReturnResponse) {
        return parsedResponse;
    }
    // An operation response spec does exist for current status code, so
    // use it to deserialize the response.
    if (responseSpec) {
        if (responseSpec.bodyMapper) {
            let valueToDeserialize = parsedResponse.parsedBody;
            if (operationSpec.isXML && responseSpec.bodyMapper.type.name === serializer_js_1.MapperTypeNames.Sequence) {
                valueToDeserialize = typeof valueToDeserialize === "object" ? valueToDeserialize[responseSpec.bodyMapper.xmlElementName] : [];
            }
            try {
                parsedResponse.parsedBody = operationSpec.serializer.deserialize(responseSpec.bodyMapper, valueToDeserialize, "operationRes.parsedBody", options);
            } catch (deserializeError) {
                const restError = new core_rest_pipeline_1.RestError(`Error ${deserializeError} occurred in deserializing the responseBody - ${parsedResponse.bodyAsText}`, {
                    statusCode: parsedResponse.status,
                    request: parsedResponse.request,
                    response: parsedResponse
                });
                throw restError;
            }
        } else if (operationSpec.httpMethod === "HEAD") {
            // head methods never have a body, but we return a boolean to indicate presence/absence of the resource
            parsedResponse.parsedBody = response.status >= 200 && response.status < 300;
        }
        if (responseSpec.headersMapper) {
            parsedResponse.parsedHeaders = operationSpec.serializer.deserialize(responseSpec.headersMapper, parsedResponse.headers.toJSON(), "operationRes.parsedHeaders", {
                xml: {},
                ignoreUnknownProperties: true
            });
        }
    }
    return parsedResponse;
}
function isOperationSpecEmpty(operationSpec) {
    const expectedStatusCodes = Object.keys(operationSpec.responses);
    return expectedStatusCodes.length === 0 || expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default";
}
function handleErrorResponse(parsedResponse, operationSpec, responseSpec, options) {
    const isSuccessByStatus = 200 <= parsedResponse.status && parsedResponse.status < 300;
    const isExpectedStatusCode = isOperationSpecEmpty(operationSpec) ? isSuccessByStatus : !!responseSpec;
    if (isExpectedStatusCode) {
        if (responseSpec) {
            if (!responseSpec.isError) {
                return {
                    error: null,
                    shouldReturnResponse: false
                };
            }
        } else {
            return {
                error: null,
                shouldReturnResponse: false
            };
        }
    }
    const errorResponseSpec = responseSpec ?? operationSpec.responses.default;
    const initialErrorMessage = parsedResponse.request.streamResponseStatusCodes?.has(parsedResponse.status) ? `Unexpected status code: ${parsedResponse.status}` : parsedResponse.bodyAsText;
    const error = new core_rest_pipeline_1.RestError(initialErrorMessage, {
        statusCode: parsedResponse.status,
        request: parsedResponse.request,
        response: parsedResponse
    });
    // If the item failed but there's no error spec or default spec to deserialize the error,
    // and the parsed body doesn't look like an error object,
    // we should fail so we just throw the parsed response
    if (!errorResponseSpec && !(parsedResponse.parsedBody?.error?.code && parsedResponse.parsedBody?.error?.message)) {
        throw error;
    }
    const defaultBodyMapper = errorResponseSpec?.bodyMapper;
    const defaultHeadersMapper = errorResponseSpec?.headersMapper;
    try {
        // If error response has a body, try to deserialize it using default body mapper.
        // Then try to extract error code & message from it
        if (parsedResponse.parsedBody) {
            const parsedBody = parsedResponse.parsedBody;
            let deserializedError;
            if (defaultBodyMapper) {
                let valueToDeserialize = parsedBody;
                if (operationSpec.isXML && defaultBodyMapper.type.name === serializer_js_1.MapperTypeNames.Sequence) {
                    valueToDeserialize = [];
                    const elementName = defaultBodyMapper.xmlElementName;
                    if (typeof parsedBody === "object" && elementName) {
                        valueToDeserialize = parsedBody[elementName];
                    }
                }
                deserializedError = operationSpec.serializer.deserialize(defaultBodyMapper, valueToDeserialize, "error.response.parsedBody", options);
            }
            const internalError = parsedBody.error || deserializedError || parsedBody;
            error.code = internalError.code;
            if (internalError.message) {
                error.message = internalError.message;
            }
            if (defaultBodyMapper) {
                error.response.parsedBody = deserializedError;
            }
        }
        // If error response has headers, try to deserialize it using default header mapper
        if (parsedResponse.headers && defaultHeadersMapper) {
            error.response.parsedHeaders = operationSpec.serializer.deserialize(defaultHeadersMapper, parsedResponse.headers.toJSON(), "operationRes.parsedHeaders");
        }
    } catch (defaultError) {
        error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody - "${parsedResponse.bodyAsText}" for the default response.`;
    }
    return {
        error,
        shouldReturnResponse: false
    };
}
async function parse(jsonContentTypes, xmlContentTypes, operationResponse, opts, parseXML) {
    if (!operationResponse.request.streamResponseStatusCodes?.has(operationResponse.status) && operationResponse.bodyAsText) {
        const text = operationResponse.bodyAsText;
        const contentType = operationResponse.headers.get("Content-Type") || "";
        const contentComponents = !contentType ? [] : contentType.split(";").map((component)=>component.toLowerCase());
        try {
            if (contentComponents.length === 0 || contentComponents.some((component)=>jsonContentTypes.indexOf(component) !== -1)) {
                operationResponse.parsedBody = JSON.parse(text);
                return operationResponse;
            } else if (contentComponents.some((component)=>xmlContentTypes.indexOf(component) !== -1)) {
                if (!parseXML) {
                    throw new Error("Parsing XML not supported.");
                }
                const body = await parseXML(text, opts.xml);
                operationResponse.parsedBody = body;
                return operationResponse;
            }
        } catch (err) {
            const msg = `Error "${err}" occurred while parsing the response body - ${operationResponse.bodyAsText}.`;
            const errCode = err.code || core_rest_pipeline_1.RestError.PARSE_ERROR;
            const e = new core_rest_pipeline_1.RestError(msg, {
                code: errCode,
                statusCode: operationResponse.status,
                request: operationResponse.request,
                response: operationResponse
            });
            throw e;
        }
    }
    return operationResponse;
} //# sourceMappingURL=deserializationPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/interfaceHelpers.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStreamingResponseStatusCodes = getStreamingResponseStatusCodes;
exports.getPathStringFromParameter = getPathStringFromParameter;
const serializer_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/serializer.js [app-route] (ecmascript)");
/**
 * Gets the list of status codes for streaming responses.
 * @internal
 */ function getStreamingResponseStatusCodes(operationSpec) {
    const result = new Set();
    for(const statusCode in operationSpec.responses){
        const operationResponse = operationSpec.responses[statusCode];
        if (operationResponse.bodyMapper && operationResponse.bodyMapper.type.name === serializer_js_1.MapperTypeNames.Stream) {
            result.add(Number(statusCode));
        }
    }
    return result;
}
/**
 * Get the path to this parameter's value as a dotted string (a.b.c).
 * @param parameter - The parameter to get the path string for.
 * @returns The path to this parameter's value as a dotted string.
 * @internal
 */ function getPathStringFromParameter(parameter) {
    const { parameterPath, mapper } = parameter;
    let result;
    if (typeof parameterPath === "string") {
        result = parameterPath;
    } else if (Array.isArray(parameterPath)) {
        result = parameterPath.join(".");
    } else {
        result = mapper.serializedName;
    }
    return result;
} //# sourceMappingURL=interfaceHelpers.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/serializationPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serializationPolicyName = void 0;
exports.serializationPolicy = serializationPolicy;
exports.serializeHeaders = serializeHeaders;
exports.serializeRequestBody = serializeRequestBody;
const interfaces_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/interfaces.js [app-route] (ecmascript)");
const operationHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/operationHelpers.js [app-route] (ecmascript)");
const serializer_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/serializer.js [app-route] (ecmascript)");
const interfaceHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/interfaceHelpers.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the serializationPolicy.
 */ exports.serializationPolicyName = "serializationPolicy";
/**
 * This policy handles assembling the request body and headers using
 * an OperationSpec and OperationArguments on the request.
 */ function serializationPolicy(options = {}) {
    const stringifyXML = options.stringifyXML;
    return {
        name: exports.serializationPolicyName,
        async sendRequest (request, next) {
            const operationInfo = (0, operationHelpers_js_1.getOperationRequestInfo)(request);
            const operationSpec = operationInfo?.operationSpec;
            const operationArguments = operationInfo?.operationArguments;
            if (operationSpec && operationArguments) {
                serializeHeaders(request, operationArguments, operationSpec);
                serializeRequestBody(request, operationArguments, operationSpec, stringifyXML);
            }
            return next(request);
        }
    };
}
/**
 * @internal
 */ function serializeHeaders(request, operationArguments, operationSpec) {
    if (operationSpec.headerParameters) {
        for (const headerParameter of operationSpec.headerParameters){
            let headerValue = (0, operationHelpers_js_1.getOperationArgumentValueFromParameter)(operationArguments, headerParameter);
            if (headerValue !== null && headerValue !== undefined || headerParameter.mapper.required) {
                headerValue = operationSpec.serializer.serialize(headerParameter.mapper, headerValue, (0, interfaceHelpers_js_1.getPathStringFromParameter)(headerParameter));
                const headerCollectionPrefix = headerParameter.mapper.headerCollectionPrefix;
                if (headerCollectionPrefix) {
                    for (const key of Object.keys(headerValue)){
                        request.headers.set(headerCollectionPrefix + key, headerValue[key]);
                    }
                } else {
                    request.headers.set(headerParameter.mapper.serializedName || (0, interfaceHelpers_js_1.getPathStringFromParameter)(headerParameter), headerValue);
                }
            }
        }
    }
    const customHeaders = operationArguments.options?.requestOptions?.customHeaders;
    if (customHeaders) {
        for (const customHeaderName of Object.keys(customHeaders)){
            request.headers.set(customHeaderName, customHeaders[customHeaderName]);
        }
    }
}
/**
 * @internal
 */ function serializeRequestBody(request, operationArguments, operationSpec, stringifyXML = function() {
    throw new Error("XML serialization unsupported!");
}) {
    const serializerOptions = operationArguments.options?.serializerOptions;
    const updatedOptions = {
        xml: {
            rootName: serializerOptions?.xml.rootName ?? "",
            includeRoot: serializerOptions?.xml.includeRoot ?? false,
            xmlCharKey: serializerOptions?.xml.xmlCharKey ?? interfaces_js_1.XML_CHARKEY
        }
    };
    const xmlCharKey = updatedOptions.xml.xmlCharKey;
    if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
        request.body = (0, operationHelpers_js_1.getOperationArgumentValueFromParameter)(operationArguments, operationSpec.requestBody);
        const bodyMapper = operationSpec.requestBody.mapper;
        const { required, serializedName, xmlName, xmlElementName, xmlNamespace, xmlNamespacePrefix, nullable } = bodyMapper;
        const typeName = bodyMapper.type.name;
        try {
            if (request.body !== undefined && request.body !== null || nullable && request.body === null || required) {
                const requestBodyParameterPathString = (0, interfaceHelpers_js_1.getPathStringFromParameter)(operationSpec.requestBody);
                request.body = operationSpec.serializer.serialize(bodyMapper, request.body, requestBodyParameterPathString, updatedOptions);
                const isStream = typeName === serializer_js_1.MapperTypeNames.Stream;
                if (operationSpec.isXML) {
                    const xmlnsKey = xmlNamespacePrefix ? `xmlns:${xmlNamespacePrefix}` : "xmlns";
                    const value = getXmlValueWithNamespace(xmlNamespace, xmlnsKey, typeName, request.body, updatedOptions);
                    if (typeName === serializer_js_1.MapperTypeNames.Sequence) {
                        request.body = stringifyXML(prepareXMLRootList(value, xmlElementName || xmlName || serializedName, xmlnsKey, xmlNamespace), {
                            rootName: xmlName || serializedName,
                            xmlCharKey
                        });
                    } else if (!isStream) {
                        request.body = stringifyXML(value, {
                            rootName: xmlName || serializedName,
                            xmlCharKey
                        });
                    }
                } else if (typeName === serializer_js_1.MapperTypeNames.String && (operationSpec.contentType?.match("text/plain") || operationSpec.mediaType === "text")) {
                    // the String serializer has validated that request body is a string
                    // so just send the string.
                    return;
                } else if (!isStream) {
                    request.body = JSON.stringify(request.body);
                }
            }
        } catch (error) {
            throw new Error(`Error "${error.message}" occurred in serializing the payload - ${JSON.stringify(serializedName, undefined, "  ")}.`);
        }
    } else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
        request.formData = {};
        for (const formDataParameter of operationSpec.formDataParameters){
            const formDataParameterValue = (0, operationHelpers_js_1.getOperationArgumentValueFromParameter)(operationArguments, formDataParameter);
            if (formDataParameterValue !== undefined && formDataParameterValue !== null) {
                const formDataParameterPropertyName = formDataParameter.mapper.serializedName || (0, interfaceHelpers_js_1.getPathStringFromParameter)(formDataParameter);
                request.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(formDataParameter.mapper, formDataParameterValue, (0, interfaceHelpers_js_1.getPathStringFromParameter)(formDataParameter), updatedOptions);
            }
        }
    }
}
/**
 * Adds an xml namespace to the xml serialized object if needed, otherwise it just returns the value itself
 */ function getXmlValueWithNamespace(xmlNamespace, xmlnsKey, typeName, serializedValue, options) {
    // Composite and Sequence schemas already got their root namespace set during serialization
    // We just need to add xmlns to the other schema types
    if (xmlNamespace && ![
        "Composite",
        "Sequence",
        "Dictionary"
    ].includes(typeName)) {
        const result = {};
        result[options.xml.xmlCharKey] = serializedValue;
        result[interfaces_js_1.XML_ATTRKEY] = {
            [xmlnsKey]: xmlNamespace
        };
        return result;
    }
    return serializedValue;
}
function prepareXMLRootList(obj, elementName, xmlNamespaceKey, xmlNamespace) {
    if (!Array.isArray(obj)) {
        obj = [
            obj
        ];
    }
    if (!xmlNamespaceKey || !xmlNamespace) {
        return {
            [elementName]: obj
        };
    }
    const result = {
        [elementName]: obj
    };
    result[interfaces_js_1.XML_ATTRKEY] = {
        [xmlNamespaceKey]: xmlNamespace
    };
    return result;
} //# sourceMappingURL=serializationPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/pipeline.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createClientPipeline = createClientPipeline;
const deserializationPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/deserializationPolicy.js [app-route] (ecmascript)");
const core_rest_pipeline_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/index.js [app-route] (ecmascript)");
const serializationPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/serializationPolicy.js [app-route] (ecmascript)");
/**
 * Creates a new Pipeline for use with a Service Client.
 * Adds in deserializationPolicy by default.
 * Also adds in bearerTokenAuthenticationPolicy if passed a TokenCredential.
 * @param options - Options to customize the created pipeline.
 */ function createClientPipeline(options = {}) {
    const pipeline = (0, core_rest_pipeline_1.createPipelineFromOptions)(options ?? {});
    if (options.credentialOptions) {
        pipeline.addPolicy((0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)({
            credential: options.credentialOptions.credential,
            scopes: options.credentialOptions.credentialScopes
        }));
    }
    pipeline.addPolicy((0, serializationPolicy_js_1.serializationPolicy)(options.serializationOptions), {
        phase: "Serialize"
    });
    pipeline.addPolicy((0, deserializationPolicy_js_1.deserializationPolicy)(options.deserializationOptions), {
        phase: "Deserialize"
    });
    return pipeline;
} //# sourceMappingURL=pipeline.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/httpClientCache.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCachedDefaultHttpClient = getCachedDefaultHttpClient;
const core_rest_pipeline_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/index.js [app-route] (ecmascript)");
let cachedHttpClient;
function getCachedDefaultHttpClient() {
    if (!cachedHttpClient) {
        cachedHttpClient = (0, core_rest_pipeline_1.createDefaultHttpClient)();
    }
    return cachedHttpClient;
} //# sourceMappingURL=httpClientCache.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/urlHelpers.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRequestUrl = getRequestUrl;
exports.appendQueryParams = appendQueryParams;
const operationHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/operationHelpers.js [app-route] (ecmascript)");
const interfaceHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/interfaceHelpers.js [app-route] (ecmascript)");
const CollectionFormatToDelimiterMap = {
    CSV: ",",
    SSV: " ",
    Multi: "Multi",
    TSV: "\t",
    Pipes: "|"
};
function getRequestUrl(baseUri, operationSpec, operationArguments, fallbackObject) {
    const urlReplacements = calculateUrlReplacements(operationSpec, operationArguments, fallbackObject);
    let isAbsolutePath = false;
    let requestUrl = replaceAll(baseUri, urlReplacements);
    if (operationSpec.path) {
        let path = replaceAll(operationSpec.path, urlReplacements);
        // QUIRK: sometimes we get a path component like /{nextLink}
        // which may be a fully formed URL with a leading /. In that case, we should
        // remove the leading /
        if (operationSpec.path === "/{nextLink}" && path.startsWith("/")) {
            path = path.substring(1);
        }
        // QUIRK: sometimes we get a path component like {nextLink}
        // which may be a fully formed URL. In that case, we should
        // ignore the baseUri.
        if (isAbsoluteUrl(path)) {
            requestUrl = path;
            isAbsolutePath = true;
        } else {
            requestUrl = appendPath(requestUrl, path);
        }
    }
    const { queryParams, sequenceParams } = calculateQueryParameters(operationSpec, operationArguments, fallbackObject);
    /**
     * Notice that this call sets the `noOverwrite` parameter to true if the `requestUrl`
     * is an absolute path. This ensures that existing query parameter values in `requestUrl`
     * do not get overwritten. On the other hand when `requestUrl` is not absolute path, it
     * is still being built so there is nothing to overwrite.
     */ requestUrl = appendQueryParams(requestUrl, queryParams, sequenceParams, isAbsolutePath);
    return requestUrl;
}
function replaceAll(input, replacements) {
    let result = input;
    for (const [searchValue, replaceValue] of replacements){
        result = result.split(searchValue).join(replaceValue);
    }
    return result;
}
function calculateUrlReplacements(operationSpec, operationArguments, fallbackObject) {
    const result = new Map();
    if (operationSpec.urlParameters?.length) {
        for (const urlParameter of operationSpec.urlParameters){
            let urlParameterValue = (0, operationHelpers_js_1.getOperationArgumentValueFromParameter)(operationArguments, urlParameter, fallbackObject);
            const parameterPathString = (0, interfaceHelpers_js_1.getPathStringFromParameter)(urlParameter);
            urlParameterValue = operationSpec.serializer.serialize(urlParameter.mapper, urlParameterValue, parameterPathString);
            if (!urlParameter.skipEncoding) {
                urlParameterValue = encodeURIComponent(urlParameterValue);
            }
            result.set(`{${urlParameter.mapper.serializedName || parameterPathString}}`, urlParameterValue);
        }
    }
    return result;
}
function isAbsoluteUrl(url) {
    return url.includes("://");
}
function appendPath(url, pathToAppend) {
    if (!pathToAppend) {
        return url;
    }
    const parsedUrl = new URL(url);
    let newPath = parsedUrl.pathname;
    if (!newPath.endsWith("/")) {
        newPath = `${newPath}/`;
    }
    if (pathToAppend.startsWith("/")) {
        pathToAppend = pathToAppend.substring(1);
    }
    const searchStart = pathToAppend.indexOf("?");
    if (searchStart !== -1) {
        const path = pathToAppend.substring(0, searchStart);
        const search = pathToAppend.substring(searchStart + 1);
        newPath = newPath + path;
        if (search) {
            parsedUrl.search = parsedUrl.search ? `${parsedUrl.search}&${search}` : search;
        }
    } else {
        newPath = newPath + pathToAppend;
    }
    parsedUrl.pathname = newPath;
    return parsedUrl.toString();
}
function calculateQueryParameters(operationSpec, operationArguments, fallbackObject) {
    const result = new Map();
    const sequenceParams = new Set();
    if (operationSpec.queryParameters?.length) {
        for (const queryParameter of operationSpec.queryParameters){
            if (queryParameter.mapper.type.name === "Sequence" && queryParameter.mapper.serializedName) {
                sequenceParams.add(queryParameter.mapper.serializedName);
            }
            let queryParameterValue = (0, operationHelpers_js_1.getOperationArgumentValueFromParameter)(operationArguments, queryParameter, fallbackObject);
            if (queryParameterValue !== undefined && queryParameterValue !== null || queryParameter.mapper.required) {
                queryParameterValue = operationSpec.serializer.serialize(queryParameter.mapper, queryParameterValue, (0, interfaceHelpers_js_1.getPathStringFromParameter)(queryParameter));
                const delimiter = queryParameter.collectionFormat ? CollectionFormatToDelimiterMap[queryParameter.collectionFormat] : "";
                if (Array.isArray(queryParameterValue)) {
                    // replace null and undefined
                    queryParameterValue = queryParameterValue.map((item)=>{
                        if (item === null || item === undefined) {
                            return "";
                        }
                        return item;
                    });
                }
                if (queryParameter.collectionFormat === "Multi" && queryParameterValue.length === 0) {
                    continue;
                } else if (Array.isArray(queryParameterValue) && (queryParameter.collectionFormat === "SSV" || queryParameter.collectionFormat === "TSV")) {
                    queryParameterValue = queryParameterValue.join(delimiter);
                }
                if (!queryParameter.skipEncoding) {
                    if (Array.isArray(queryParameterValue)) {
                        queryParameterValue = queryParameterValue.map((item)=>{
                            return encodeURIComponent(item);
                        });
                    } else {
                        queryParameterValue = encodeURIComponent(queryParameterValue);
                    }
                }
                // Join pipes and CSV *after* encoding, or the server will be upset.
                if (Array.isArray(queryParameterValue) && (queryParameter.collectionFormat === "CSV" || queryParameter.collectionFormat === "Pipes")) {
                    queryParameterValue = queryParameterValue.join(delimiter);
                }
                result.set(queryParameter.mapper.serializedName || (0, interfaceHelpers_js_1.getPathStringFromParameter)(queryParameter), queryParameterValue);
            }
        }
    }
    return {
        queryParams: result,
        sequenceParams
    };
}
function simpleParseQueryParams(queryString) {
    const result = new Map();
    if (!queryString || queryString[0] !== "?") {
        return result;
    }
    // remove the leading ?
    queryString = queryString.slice(1);
    const pairs = queryString.split("&");
    for (const pair of pairs){
        const [name, value] = pair.split("=", 2);
        const existingValue = result.get(name);
        if (existingValue) {
            if (Array.isArray(existingValue)) {
                existingValue.push(value);
            } else {
                result.set(name, [
                    existingValue,
                    value
                ]);
            }
        } else {
            result.set(name, value);
        }
    }
    return result;
}
/** @internal */ function appendQueryParams(url, queryParams, sequenceParams, noOverwrite = false) {
    if (queryParams.size === 0) {
        return url;
    }
    const parsedUrl = new URL(url);
    // QUIRK: parsedUrl.searchParams will have their name/value pairs decoded, which
    // can change their meaning to the server, such as in the case of a SAS signature.
    // To avoid accidentally un-encoding a query param, we parse the key/values ourselves
    const combinedParams = simpleParseQueryParams(parsedUrl.search);
    for (const [name, value] of queryParams){
        const existingValue = combinedParams.get(name);
        if (Array.isArray(existingValue)) {
            if (Array.isArray(value)) {
                existingValue.push(...value);
                const valueSet = new Set(existingValue);
                combinedParams.set(name, Array.from(valueSet));
            } else {
                existingValue.push(value);
            }
        } else if (existingValue) {
            if (Array.isArray(value)) {
                value.unshift(existingValue);
            } else if (sequenceParams.has(name)) {
                combinedParams.set(name, [
                    existingValue,
                    value
                ]);
            }
            if (!noOverwrite) {
                combinedParams.set(name, value);
            }
        } else {
            combinedParams.set(name, value);
        }
    }
    const searchPieces = [];
    for (const [name, value] of combinedParams){
        if (typeof value === "string") {
            searchPieces.push(`${name}=${value}`);
        } else if (Array.isArray(value)) {
            // QUIRK: If we get an array of values, include multiple key/value pairs
            for (const subValue of value){
                searchPieces.push(`${name}=${subValue}`);
            }
        } else {
            searchPieces.push(`${name}=${value}`);
        }
    }
    // QUIRK: we have to set search manually as searchParams will encode comma when it shouldn't.
    parsedUrl.search = searchPieces.length ? `?${searchPieces.join("&")}` : "";
    return parsedUrl.toString();
} //# sourceMappingURL=urlHelpers.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/log.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logger = void 0;
const logger_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/logger/dist/commonjs/index.js [app-route] (ecmascript)");
exports.logger = (0, logger_1.createClientLogger)("core-client"); //# sourceMappingURL=log.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/serviceClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ServiceClient = void 0;
const core_rest_pipeline_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/index.js [app-route] (ecmascript)");
const pipeline_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/pipeline.js [app-route] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/utils.js [app-route] (ecmascript)");
const httpClientCache_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/httpClientCache.js [app-route] (ecmascript)");
const operationHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/operationHelpers.js [app-route] (ecmascript)");
const urlHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/urlHelpers.js [app-route] (ecmascript)");
const interfaceHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/interfaceHelpers.js [app-route] (ecmascript)");
const log_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/log.js [app-route] (ecmascript)");
/**
 * Initializes a new instance of the ServiceClient.
 */ class ServiceClient {
    /**
     * If specified, this is the base URI that requests will be made against for this ServiceClient.
     * If it is not specified, then all OperationSpecs must contain a baseUrl property.
     */ _endpoint;
    /**
     * The default request content type for the service.
     * Used if no requestContentType is present on an OperationSpec.
     */ _requestContentType;
    /**
     * Set to true if the request is sent over HTTP instead of HTTPS
     */ _allowInsecureConnection;
    /**
     * The HTTP client that will be used to send requests.
     */ _httpClient;
    /**
     * The pipeline used by this client to make requests
     */ pipeline;
    /**
     * The ServiceClient constructor
     * @param options - The service client options that govern the behavior of the client.
     */ constructor(options = {}){
        this._requestContentType = options.requestContentType;
        this._endpoint = options.endpoint ?? options.baseUri;
        if (options.baseUri) {
            log_js_1.logger.warning("The baseUri option for SDK Clients has been deprecated, please use endpoint instead.");
        }
        this._allowInsecureConnection = options.allowInsecureConnection;
        this._httpClient = options.httpClient || (0, httpClientCache_js_1.getCachedDefaultHttpClient)();
        this.pipeline = options.pipeline || createDefaultPipeline(options);
        if (options.additionalPolicies?.length) {
            for (const { policy, position } of options.additionalPolicies){
                // Sign happens after Retry and is commonly needed to occur
                // before policies that intercept post-retry.
                const afterPhase = position === "perRetry" ? "Sign" : undefined;
                this.pipeline.addPolicy(policy, {
                    afterPhase
                });
            }
        }
    }
    /**
     * Send the provided httpRequest.
     */ async sendRequest(request) {
        return this.pipeline.sendRequest(this._httpClient, request);
    }
    /**
     * Send an HTTP request that is populated using the provided OperationSpec.
     * @typeParam T - The typed result of the request, based on the OperationSpec.
     * @param operationArguments - The arguments that the HTTP request's templated values will be populated from.
     * @param operationSpec - The OperationSpec to use to populate the httpRequest.
     */ async sendOperationRequest(operationArguments, operationSpec) {
        const endpoint = operationSpec.baseUrl || this._endpoint;
        if (!endpoint) {
            throw new Error("If operationSpec.baseUrl is not specified, then the ServiceClient must have a endpoint string property that contains the base URL to use.");
        }
        // Templatized URLs sometimes reference properties on the ServiceClient child class,
        // so we have to pass `this` below in order to search these properties if they're
        // not part of OperationArguments
        const url = (0, urlHelpers_js_1.getRequestUrl)(endpoint, operationSpec, operationArguments, this);
        const request = (0, core_rest_pipeline_1.createPipelineRequest)({
            url
        });
        request.method = operationSpec.httpMethod;
        const operationInfo = (0, operationHelpers_js_1.getOperationRequestInfo)(request);
        operationInfo.operationSpec = operationSpec;
        operationInfo.operationArguments = operationArguments;
        const contentType = operationSpec.contentType || this._requestContentType;
        if (contentType && operationSpec.requestBody) {
            request.headers.set("Content-Type", contentType);
        }
        const options = operationArguments.options;
        if (options) {
            const requestOptions = options.requestOptions;
            if (requestOptions) {
                if (requestOptions.timeout) {
                    request.timeout = requestOptions.timeout;
                }
                if (requestOptions.onUploadProgress) {
                    request.onUploadProgress = requestOptions.onUploadProgress;
                }
                if (requestOptions.onDownloadProgress) {
                    request.onDownloadProgress = requestOptions.onDownloadProgress;
                }
                if (requestOptions.shouldDeserialize !== undefined) {
                    operationInfo.shouldDeserialize = requestOptions.shouldDeserialize;
                }
                if (requestOptions.allowInsecureConnection) {
                    request.allowInsecureConnection = true;
                }
            }
            if (options.abortSignal) {
                request.abortSignal = options.abortSignal;
            }
            if (options.tracingOptions) {
                request.tracingOptions = options.tracingOptions;
            }
        }
        if (this._allowInsecureConnection) {
            request.allowInsecureConnection = true;
        }
        if (request.streamResponseStatusCodes === undefined) {
            request.streamResponseStatusCodes = (0, interfaceHelpers_js_1.getStreamingResponseStatusCodes)(operationSpec);
        }
        try {
            const rawResponse = await this.sendRequest(request);
            const flatResponse = (0, utils_js_1.flattenResponse)(rawResponse, operationSpec.responses[rawResponse.status]);
            if (options?.onResponse) {
                options.onResponse(rawResponse, flatResponse);
            }
            return flatResponse;
        } catch (error) {
            if (typeof error === "object" && error?.response) {
                const rawResponse = error.response;
                const flatResponse = (0, utils_js_1.flattenResponse)(rawResponse, operationSpec.responses[error.statusCode] || operationSpec.responses["default"]);
                error.details = flatResponse;
                if (options?.onResponse) {
                    options.onResponse(rawResponse, flatResponse, error);
                }
            }
            throw error;
        }
    }
}
exports.ServiceClient = ServiceClient;
function createDefaultPipeline(options) {
    const credentialScopes = getCredentialScopes(options);
    const credentialOptions = options.credential && credentialScopes ? {
        credentialScopes,
        credential: options.credential
    } : undefined;
    return (0, pipeline_js_1.createClientPipeline)({
        ...options,
        credentialOptions
    });
}
function getCredentialScopes(options) {
    if (options.credentialScopes) {
        return options.credentialScopes;
    }
    if (options.endpoint) {
        return `${options.endpoint}/.default`;
    }
    if (options.baseUri) {
        return `${options.baseUri}/.default`;
    }
    if (options.credential && !options.credentialScopes) {
        throw new Error(`When using credentials, the ServiceClientOptions must contain either a endpoint or a credentialScopes. Unable to create a bearerTokenAuthenticationPolicy`);
    }
    return undefined;
} //# sourceMappingURL=serviceClient.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/authorizeRequestOnClaimChallenge.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseCAEChallenge = parseCAEChallenge;
exports.authorizeRequestOnClaimChallenge = authorizeRequestOnClaimChallenge;
const log_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/log.js [app-route] (ecmascript)");
const base64_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/base64.js [app-route] (ecmascript)");
/**
 * Converts: `Bearer a="b", c="d", Bearer d="e", f="g"`.
 * Into: `[ { a: 'b', c: 'd' }, { d: 'e', f: 'g' } ]`.
 *
 * @internal
 */ function parseCAEChallenge(challenges) {
    const bearerChallenges = `, ${challenges.trim()}`.split(", Bearer ").filter((x)=>x);
    return bearerChallenges.map((challenge)=>{
        const challengeParts = `${challenge.trim()}, `.split('", ').filter((x)=>x);
        const keyValuePairs = challengeParts.map((keyValue)=>(([key, value])=>({
                    [key]: value
                }))(keyValue.trim().split('="')));
        // Key-value pairs to plain object:
        return keyValuePairs.reduce((a, b)=>({
                ...a,
                ...b
            }), {});
    });
}
/**
 * This function can be used as a callback for the `bearerTokenAuthenticationPolicy` of `@azure/core-rest-pipeline`, to support CAE challenges:
 * [Continuous Access Evaluation](https://learn.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation).
 *
 * Call the `bearerTokenAuthenticationPolicy` with the following options:
 *
 * ```ts snippet:AuthorizeRequestOnClaimChallenge
 * import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
 * import { authorizeRequestOnClaimChallenge } from "@azure/core-client";
 *
 * const policy = bearerTokenAuthenticationPolicy({
 *   challengeCallbacks: {
 *     authorizeRequestOnChallenge: authorizeRequestOnClaimChallenge,
 *   },
 *   scopes: ["https://service/.default"],
 * });
 * ```
 *
 * Once provided, the `bearerTokenAuthenticationPolicy` policy will internally handle Continuous Access Evaluation (CAE) challenges.
 * When it can't complete a challenge it will return the 401 (unauthorized) response from ARM.
 *
 * Example challenge with claims:
 *
 * ```
 * Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token",
 * error_description="User session has been revoked",
 * claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYwMzc0MjgwMCJ9fX0="
 * ```
 */ async function authorizeRequestOnClaimChallenge(onChallengeOptions) {
    const { scopes, response } = onChallengeOptions;
    const logger = onChallengeOptions.logger || log_js_1.logger;
    const challenge = response.headers.get("WWW-Authenticate");
    if (!challenge) {
        logger.info(`The WWW-Authenticate header was missing. Failed to perform the Continuous Access Evaluation authentication flow.`);
        return false;
    }
    const challenges = parseCAEChallenge(challenge) || [];
    const parsedChallenge = challenges.find((x)=>x.claims);
    if (!parsedChallenge) {
        logger.info(`The WWW-Authenticate header was missing the necessary "claims" to perform the Continuous Access Evaluation authentication flow.`);
        return false;
    }
    const accessToken = await onChallengeOptions.getAccessToken(parsedChallenge.scope ? [
        parsedChallenge.scope
    ] : scopes, {
        claims: (0, base64_js_1.decodeStringToString)(parsedChallenge.claims)
    });
    if (!accessToken) {
        return false;
    }
    onChallengeOptions.request.headers.set("Authorization", `${accessToken.tokenType ?? "Bearer"} ${accessToken.token}`);
    return true;
} //# sourceMappingURL=authorizeRequestOnClaimChallenge.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/authorizeRequestOnTenantChallenge.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authorizeRequestOnTenantChallenge = void 0;
/**
 * A set of constants used internally when processing requests.
 */ const Constants = {
    DefaultScope: "/.default",
    /**
     * Defines constants for use with HTTP headers.
     */ HeaderConstants: {
        /**
         * The Authorization header.
         */ AUTHORIZATION: "authorization"
    }
};
function isUuid(text) {
    return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(text);
}
/**
 * Defines a callback to handle auth challenge for Storage APIs.
 * This implements the bearer challenge process described here: https://learn.microsoft.com/rest/api/storageservices/authorize-with-azure-active-directory#bearer-challenge
 * Handling has specific features for storage that departs to the general AAD challenge docs.
 **/ const authorizeRequestOnTenantChallenge = async (challengeOptions)=>{
    const requestOptions = requestToOptions(challengeOptions.request);
    const challenge = getChallenge(challengeOptions.response);
    if (challenge) {
        const challengeInfo = parseChallenge(challenge);
        const challengeScopes = buildScopes(challengeOptions, challengeInfo);
        const tenantId = extractTenantId(challengeInfo);
        if (!tenantId) {
            return false;
        }
        const accessToken = await challengeOptions.getAccessToken(challengeScopes, {
            ...requestOptions,
            tenantId
        });
        if (!accessToken) {
            return false;
        }
        challengeOptions.request.headers.set(Constants.HeaderConstants.AUTHORIZATION, `${accessToken.tokenType ?? "Bearer"} ${accessToken.token}`);
        return true;
    }
    return false;
};
exports.authorizeRequestOnTenantChallenge = authorizeRequestOnTenantChallenge;
/**
 * Extracts the tenant id from the challenge information
 * The tenant id is contained in the authorization_uri as the first
 * path part.
 */ function extractTenantId(challengeInfo) {
    const parsedAuthUri = new URL(challengeInfo.authorization_uri);
    const pathSegments = parsedAuthUri.pathname.split("/");
    const tenantId = pathSegments[1];
    if (tenantId && isUuid(tenantId)) {
        return tenantId;
    }
    return undefined;
}
/**
 * Builds the authentication scopes based on the information that comes in the
 * challenge information. Scopes url is present in the resource_id, if it is empty
 * we keep using the original scopes.
 */ function buildScopes(challengeOptions, challengeInfo) {
    if (!challengeInfo.resource_id) {
        return challengeOptions.scopes;
    }
    const challengeScopes = new URL(challengeInfo.resource_id);
    challengeScopes.pathname = Constants.DefaultScope;
    let scope = challengeScopes.toString();
    if (scope === "https://disk.azure.com/.default") {
        // the extra slash is required by the service
        scope = "https://disk.azure.com//.default";
    }
    return [
        scope
    ];
}
/**
 * We will retrieve the challenge only if the response status code was 401,
 * and if the response contained the header "WWW-Authenticate" with a non-empty value.
 */ function getChallenge(response) {
    const challenge = response.headers.get("WWW-Authenticate");
    if (response.status === 401 && challenge) {
        return challenge;
    }
    return;
}
/**
 * Converts: `Bearer a="b" c="d"`.
 * Into: `[ { a: 'b', c: 'd' }]`.
 *
 * @internal
 */ function parseChallenge(challenge) {
    const bearerChallenge = challenge.slice("Bearer ".length);
    const challengeParts = `${bearerChallenge.trim()} `.split(" ").filter((x)=>x);
    const keyValuePairs = challengeParts.map((keyValue)=>(([key, value])=>({
                [key]: value
            }))(keyValue.trim().split("=")));
    // Key-value pairs to plain object:
    return keyValuePairs.reduce((a, b)=>({
            ...a,
            ...b
        }), {});
}
/**
 * Extracts the options form a Pipeline Request for later re-use
 */ function requestToOptions(request) {
    return {
        abortSignal: request.abortSignal,
        requestOptions: {
            timeout: request.timeout
        },
        tracingOptions: request.tracingOptions
    };
} //# sourceMappingURL=authorizeRequestOnTenantChallenge.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authorizeRequestOnTenantChallenge = exports.authorizeRequestOnClaimChallenge = exports.serializationPolicyName = exports.serializationPolicy = exports.deserializationPolicyName = exports.deserializationPolicy = exports.XML_CHARKEY = exports.XML_ATTRKEY = exports.createClientPipeline = exports.ServiceClient = exports.MapperTypeNames = exports.createSerializer = void 0;
var serializer_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/serializer.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createSerializer", {
    enumerable: true,
    get: function() {
        return serializer_js_1.createSerializer;
    }
});
Object.defineProperty(exports, "MapperTypeNames", {
    enumerable: true,
    get: function() {
        return serializer_js_1.MapperTypeNames;
    }
});
var serviceClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/serviceClient.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ServiceClient", {
    enumerable: true,
    get: function() {
        return serviceClient_js_1.ServiceClient;
    }
});
var pipeline_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/pipeline.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createClientPipeline", {
    enumerable: true,
    get: function() {
        return pipeline_js_1.createClientPipeline;
    }
});
var interfaces_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/interfaces.js [app-route] (ecmascript)");
Object.defineProperty(exports, "XML_ATTRKEY", {
    enumerable: true,
    get: function() {
        return interfaces_js_1.XML_ATTRKEY;
    }
});
Object.defineProperty(exports, "XML_CHARKEY", {
    enumerable: true,
    get: function() {
        return interfaces_js_1.XML_CHARKEY;
    }
});
var deserializationPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/deserializationPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "deserializationPolicy", {
    enumerable: true,
    get: function() {
        return deserializationPolicy_js_1.deserializationPolicy;
    }
});
Object.defineProperty(exports, "deserializationPolicyName", {
    enumerable: true,
    get: function() {
        return deserializationPolicy_js_1.deserializationPolicyName;
    }
});
var serializationPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/serializationPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "serializationPolicy", {
    enumerable: true,
    get: function() {
        return serializationPolicy_js_1.serializationPolicy;
    }
});
Object.defineProperty(exports, "serializationPolicyName", {
    enumerable: true,
    get: function() {
        return serializationPolicy_js_1.serializationPolicyName;
    }
});
var authorizeRequestOnClaimChallenge_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/authorizeRequestOnClaimChallenge.js [app-route] (ecmascript)");
Object.defineProperty(exports, "authorizeRequestOnClaimChallenge", {
    enumerable: true,
    get: function() {
        return authorizeRequestOnClaimChallenge_js_1.authorizeRequestOnClaimChallenge;
    }
});
var authorizeRequestOnTenantChallenge_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/authorizeRequestOnTenantChallenge.js [app-route] (ecmascript)");
Object.defineProperty(exports, "authorizeRequestOnTenantChallenge", {
    enumerable: true,
    get: function() {
        return authorizeRequestOnTenantChallenge_js_1.authorizeRequestOnTenantChallenge;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-auth/dist/commonjs/azureKeyCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AzureKeyCredential = void 0;
/**
 * A static-key-based credential that supports updating
 * the underlying key value.
 */ class AzureKeyCredential {
    _key;
    /**
     * The value of the key to be used in authentication
     */ get key() {
        return this._key;
    }
    /**
     * Create an instance of an AzureKeyCredential for use
     * with a service client.
     *
     * @param key - The initial value of the key to use in authentication
     */ constructor(key){
        if (!key) {
            throw new Error("key must be a non-empty string");
        }
        this._key = key;
    }
    /**
     * Change the value of the key.
     *
     * Updates will take effect upon the next request after
     * updating the key value.
     *
     * @param newKey - The new key value to be used
     */ update(newKey) {
        this._key = newKey;
    }
}
exports.AzureKeyCredential = AzureKeyCredential; //# sourceMappingURL=azureKeyCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-auth/dist/commonjs/keyCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isKeyCredential = isKeyCredential;
const core_util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)");
/**
 * Tests an object to determine whether it implements KeyCredential.
 *
 * @param credential - The assumed KeyCredential to be tested.
 */ function isKeyCredential(credential) {
    return (0, core_util_1.isObjectWithProperties)(credential, [
        "key"
    ]) && typeof credential.key === "string";
} //# sourceMappingURL=keyCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-auth/dist/commonjs/azureNamedKeyCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AzureNamedKeyCredential = void 0;
exports.isNamedKeyCredential = isNamedKeyCredential;
const core_util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)");
/**
 * A static name/key-based credential that supports updating
 * the underlying name and key values.
 */ class AzureNamedKeyCredential {
    _key;
    _name;
    /**
     * The value of the key to be used in authentication.
     */ get key() {
        return this._key;
    }
    /**
     * The value of the name to be used in authentication.
     */ get name() {
        return this._name;
    }
    /**
     * Create an instance of an AzureNamedKeyCredential for use
     * with a service client.
     *
     * @param name - The initial value of the name to use in authentication.
     * @param key - The initial value of the key to use in authentication.
     */ constructor(name, key){
        if (!name || !key) {
            throw new TypeError("name and key must be non-empty strings");
        }
        this._name = name;
        this._key = key;
    }
    /**
     * Change the value of the key.
     *
     * Updates will take effect upon the next request after
     * updating the key value.
     *
     * @param newName - The new name value to be used.
     * @param newKey - The new key value to be used.
     */ update(newName, newKey) {
        if (!newName || !newKey) {
            throw new TypeError("newName and newKey must be non-empty strings");
        }
        this._name = newName;
        this._key = newKey;
    }
}
exports.AzureNamedKeyCredential = AzureNamedKeyCredential;
/**
 * Tests an object to determine whether it implements NamedKeyCredential.
 *
 * @param credential - The assumed NamedKeyCredential to be tested.
 */ function isNamedKeyCredential(credential) {
    return (0, core_util_1.isObjectWithProperties)(credential, [
        "name",
        "key"
    ]) && typeof credential.key === "string" && typeof credential.name === "string";
} //# sourceMappingURL=azureNamedKeyCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-auth/dist/commonjs/azureSASCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AzureSASCredential = void 0;
exports.isSASCredential = isSASCredential;
const core_util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)");
/**
 * A static-signature-based credential that supports updating
 * the underlying signature value.
 */ class AzureSASCredential {
    _signature;
    /**
     * The value of the shared access signature to be used in authentication
     */ get signature() {
        return this._signature;
    }
    /**
     * Create an instance of an AzureSASCredential for use
     * with a service client.
     *
     * @param signature - The initial value of the shared access signature to use in authentication
     */ constructor(signature){
        if (!signature) {
            throw new Error("shared access signature must be a non-empty string");
        }
        this._signature = signature;
    }
    /**
     * Change the value of the signature.
     *
     * Updates will take effect upon the next request after
     * updating the signature value.
     *
     * @param newSignature - The new shared access signature value to be used
     */ update(newSignature) {
        if (!newSignature) {
            throw new Error("shared access signature must be a non-empty string");
        }
        this._signature = newSignature;
    }
}
exports.AzureSASCredential = AzureSASCredential;
/**
 * Tests an object to determine whether it implements SASCredential.
 *
 * @param credential - The assumed SASCredential to be tested.
 */ function isSASCredential(credential) {
    return (0, core_util_1.isObjectWithProperties)(credential, [
        "signature"
    ]) && typeof credential.signature === "string";
} //# sourceMappingURL=azureSASCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-auth/dist/commonjs/tokenCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isBearerToken = isBearerToken;
exports.isPopToken = isPopToken;
exports.isTokenCredential = isTokenCredential;
/**
 * @internal
 * @param accessToken - Access token
 * @returns Whether a token is bearer type or not
 */ function isBearerToken(accessToken) {
    return !accessToken.tokenType || accessToken.tokenType === "Bearer";
}
/**
 * @internal
 * @param accessToken - Access token
 * @returns Whether a token is Pop token or not
 */ function isPopToken(accessToken) {
    return accessToken.tokenType === "pop";
}
/**
 * Tests an object to determine whether it implements TokenCredential.
 *
 * @param credential - The assumed TokenCredential to be tested.
 */ function isTokenCredential(credential) {
    // Check for an object with a 'getToken' function and possibly with
    // a 'signRequest' function.  We do this check to make sure that
    // a ServiceClientCredentials implementor (like TokenClientCredentials
    // in ms-rest-nodeauth) doesn't get mistaken for a TokenCredential if
    // it doesn't actually implement TokenCredential also.
    const castCredential = credential;
    return castCredential && typeof castCredential.getToken === "function" && (castCredential.signRequest === undefined || castCredential.getToken.length > 0);
} //# sourceMappingURL=tokenCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/core-auth/dist/commonjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isTokenCredential = exports.isSASCredential = exports.AzureSASCredential = exports.isNamedKeyCredential = exports.AzureNamedKeyCredential = exports.isKeyCredential = exports.AzureKeyCredential = void 0;
var azureKeyCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-auth/dist/commonjs/azureKeyCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AzureKeyCredential", {
    enumerable: true,
    get: function() {
        return azureKeyCredential_js_1.AzureKeyCredential;
    }
});
var keyCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-auth/dist/commonjs/keyCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "isKeyCredential", {
    enumerable: true,
    get: function() {
        return keyCredential_js_1.isKeyCredential;
    }
});
var azureNamedKeyCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-auth/dist/commonjs/azureNamedKeyCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AzureNamedKeyCredential", {
    enumerable: true,
    get: function() {
        return azureNamedKeyCredential_js_1.AzureNamedKeyCredential;
    }
});
Object.defineProperty(exports, "isNamedKeyCredential", {
    enumerable: true,
    get: function() {
        return azureNamedKeyCredential_js_1.isNamedKeyCredential;
    }
});
var azureSASCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-auth/dist/commonjs/azureSASCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AzureSASCredential", {
    enumerable: true,
    get: function() {
        return azureSASCredential_js_1.AzureSASCredential;
    }
});
Object.defineProperty(exports, "isSASCredential", {
    enumerable: true,
    get: function() {
        return azureSASCredential_js_1.isSASCredential;
    }
});
var tokenCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-auth/dist/commonjs/tokenCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "isTokenCredential", {
    enumerable: true,
    get: function() {
        return tokenCredential_js_1.isTokenCredential;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/sprintf-js/src/sprintf.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* global window, exports, define */ !function() {
    'use strict';
    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    };
    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments);
    }
    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [
            fmt
        ].concat(argv || []));
    }
    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, ph, pad, pad_character, pad_length, is_positive, sign;
        for(i = 0; i < tree_length; i++){
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i];
            } else if (typeof parse_tree[i] === 'object') {
                ph = parse_tree[i]; // convenience purposes only
                if (ph.keys) {
                    arg = argv[cursor];
                    for(k = 0; k < ph.keys.length; k++){
                        if (arg == undefined) {
                            throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k - 1]));
                        }
                        arg = arg[ph.keys[k]];
                    }
                } else if (ph.param_no) {
                    arg = argv[ph.param_no];
                } else {
                    arg = argv[cursor++];
                }
                if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
                    arg = arg();
                }
                if (re.numeric_arg.test(ph.type) && typeof arg !== 'number' && isNaN(arg)) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg));
                }
                if (re.number.test(ph.type)) {
                    is_positive = arg >= 0;
                }
                switch(ph.type){
                    case 'b':
                        arg = parseInt(arg, 10).toString(2);
                        break;
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10));
                        break;
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10);
                        break;
                    case 'j':
                        arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0);
                        break;
                    case 'e':
                        arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential();
                        break;
                    case 'f':
                        arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
                        break;
                    case 'g':
                        arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
                        break;
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8);
                        break;
                    case 's':
                        arg = String(arg);
                        arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                        break;
                    case 't':
                        arg = String(!!arg);
                        arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                        break;
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
                        arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                        break;
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0;
                        break;
                    case 'v':
                        arg = arg.valueOf();
                        arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                        break;
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16);
                        break;
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
                        break;
                }
                if (re.json.test(ph.type)) {
                    output += arg;
                } else {
                    if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                        sign = is_positive ? '+' : '-';
                        arg = arg.toString().replace(re.sign, '');
                    } else {
                        sign = '';
                    }
                    pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' ';
                    pad_length = ph.width - (sign + arg).length;
                    pad = ph.width ? pad_length > 0 ? pad_character.repeat(pad_length) : '' : '';
                    output += ph.align ? sign + arg + pad : pad_character === '0' ? sign + pad + arg : pad + sign + arg;
                }
            }
        }
        return output;
    }
    var sprintf_cache = Object.create(null);
    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt];
        }
        var _fmt = fmt, match, parse_tree = [], arg_names = 0;
        while(_fmt){
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0]);
            } else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%');
            } else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1;
                    var field_list = [], replacement_field = match[2], field_match = [];
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1]);
                        while((replacement_field = replacement_field.substring(field_match[0].length)) !== ''){
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1]);
                            } else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1]);
                            } else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key');
                            }
                        }
                    } else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key');
                    }
                    match[2] = field_list;
                } else {
                    arg_names |= 2;
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported');
                }
                parse_tree.push({
                    placeholder: match[0],
                    param_no: match[1],
                    keys: match[2],
                    sign: match[3],
                    pad_char: match[4],
                    align: match[5],
                    width: match[6],
                    precision: match[7],
                    type: match[8]
                });
            } else {
                throw new SyntaxError('[sprintf] unexpected placeholder');
            }
            _fmt = _fmt.substring(match[0].length);
        }
        return sprintf_cache[fmt] = parse_tree;
    }
    /**
     * export to either browser or node.js
     */ /* eslint-disable quote-props */ if ("TURBOPACK compile-time truthy", 1) {
        exports['sprintf'] = sprintf;
        exports['vsprintf'] = vsprintf;
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
/* eslint-enable quote-props */ }(); // eslint-disable-line
}),
"[project]/Downloads/mrpii 2/node_modules/js-md4/src/md4.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * [js-md4]{@link https://github.com/emn178/js-md4}
 *
 * @namespace md4
 * @version 0.3.2
 * @author Yi-Cyuan Chen [emn178@gmail.com]
 * @copyright Yi-Cyuan Chen 2015-2027
 * @license MIT
 */ /*jslint bitwise: true */ (function() {
    'use strict';
    var root = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : {};
    var NODE_JS = !root.JS_MD4_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
    if (NODE_JS) {
        root = /*TURBOPACK member replacement*/ __turbopack_context__.g;
    }
    var COMMON_JS = !root.JS_MD4_NO_COMMON_JS && ("TURBOPACK compile-time value", "object") === 'object' && module.exports;
    var AMD = typeof define === 'function' && define.amd;
    var ARRAY_BUFFER = !root.JS_MD4_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
    var HEX_CHARS = '0123456789abcdef'.split('');
    var EXTRA = [
        128,
        32768,
        8388608,
        -2147483648
    ];
    var SHIFT = [
        0,
        8,
        16,
        24
    ];
    var OUTPUT_TYPES = [
        'hex',
        'array',
        'digest',
        'buffer',
        'arrayBuffer'
    ];
    var blocks = [], buffer8;
    if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        buffer8 = new Uint8Array(buffer);
        blocks = new Uint32Array(buffer);
    }
    /**
   * @method hex
   * @memberof md4
   * @description Output hash as hex string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} Hex string
   * @example
   * md4.hex('The quick brown fox jumps over the lazy dog');
   * // equal to
   * md4('The quick brown fox jumps over the lazy dog');
   */ /**
   * @method digest
   * @memberof md4
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md4.digest('The quick brown fox jumps over the lazy dog');
   */ /**
   * @method array
   * @memberof md4
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md4.array('The quick brown fox jumps over the lazy dog');
   */ /**
   * @method buffer
   * @memberof md4
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md4.buffer('The quick brown fox jumps over the lazy dog');
   */ var createOutputMethod = function(outputType) {
        return function(message) {
            return new Md4(true).update(message)[outputType]();
        };
    };
    /**
   * @method create
   * @memberof md4
   * @description Create Md4 object
   * @returns {Md4} MD4 object.
   * @example
   * var hash = md4.create();
   */ /**
   * @method update
   * @memberof md4
   * @description Create and update Md4 object
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md4} MD4 object.
   * @example
   * var hash = md4.update('The quick brown fox jumps over the lazy dog');
   * // equal to
   * var hash = md4.create();
   * hash.update('The quick brown fox jumps over the lazy dog');
   */ var createMethod = function() {
        var method = createOutputMethod('hex');
        if (NODE_JS) {
            method = nodeWrap(method);
        }
        method.create = function() {
            return new Md4();
        };
        method.update = function(message) {
            return method.create().update(message);
        };
        for(var i = 0; i < OUTPUT_TYPES.length; ++i){
            var type = OUTPUT_TYPES[i];
            method[type] = createOutputMethod(type);
        }
        return method;
    };
    var nodeWrap = function(method) {
        var crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
        var Buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").Buffer;
        var nodeMethod = function(message) {
            if (typeof message === 'string') {
                return crypto.createHash('md4').update(message, 'utf8').digest('hex');
            } else if (ARRAY_BUFFER && message instanceof ArrayBuffer) {
                message = new Uint8Array(message);
            } else if (message.length === undefined) {
                return method(message);
            }
            return crypto.createHash('md4').update(new Buffer(message)).digest('hex');
        };
        return nodeMethod;
    };
    /**
   * Md4 class
   * @class Md4
   * @description This is internal class.
   * @see {@link md4.create}
   */ function Md4(sharedMemory) {
        if (sharedMemory) {
            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            this.blocks = blocks;
            this.buffer8 = buffer8;
        } else {
            if (ARRAY_BUFFER) {
                var buffer = new ArrayBuffer(68);
                this.buffer8 = new Uint8Array(buffer);
                this.blocks = new Uint32Array(buffer);
            } else {
                this.blocks = [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ];
            }
        }
        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = 0;
        this.finalized = this.hashed = false;
        this.first = true;
    }
    /**
   * @method update
   * @memberof Md4
   * @instance
   * @description Update hash
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md4} MD4 object.
   * @see {@link md4.update}
   */ Md4.prototype.update = function(message) {
        if (this.finalized) {
            return;
        }
        var notString = typeof message !== 'string';
        if (notString && ARRAY_BUFFER && message instanceof ArrayBuffer) {
            message = new Uint8Array(message);
        }
        var code, index = 0, i, length = message.length || 0, blocks = this.blocks;
        var buffer8 = this.buffer8;
        while(index < length){
            if (this.hashed) {
                this.hashed = false;
                blocks[0] = blocks[16];
                blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            }
            if (notString) {
                if (ARRAY_BUFFER) {
                    for(i = this.start; index < length && i < 64; ++index){
                        buffer8[i++] = message[index];
                    }
                } else {
                    for(i = this.start; index < length && i < 64; ++index){
                        blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
                    }
                }
            } else {
                if (ARRAY_BUFFER) {
                    for(i = this.start; index < length && i < 64; ++index){
                        code = message.charCodeAt(index);
                        if (code < 0x80) {
                            buffer8[i++] = code;
                        } else if (code < 0x800) {
                            buffer8[i++] = 0xc0 | code >> 6;
                            buffer8[i++] = 0x80 | code & 0x3f;
                        } else if (code < 0xd800 || code >= 0xe000) {
                            buffer8[i++] = 0xe0 | code >> 12;
                            buffer8[i++] = 0x80 | code >> 6 & 0x3f;
                            buffer8[i++] = 0x80 | code & 0x3f;
                        } else {
                            code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
                            buffer8[i++] = 0xf0 | code >> 18;
                            buffer8[i++] = 0x80 | code >> 12 & 0x3f;
                            buffer8[i++] = 0x80 | code >> 6 & 0x3f;
                            buffer8[i++] = 0x80 | code & 0x3f;
                        }
                    }
                } else {
                    for(i = this.start; index < length && i < 64; ++index){
                        code = message.charCodeAt(index);
                        if (code < 0x80) {
                            blocks[i >> 2] |= code << SHIFT[i++ & 3];
                        } else if (code < 0x800) {
                            blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                        } else if (code < 0xd800 || code >= 0xe000) {
                            blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                        } else {
                            code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
                            blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                        }
                    }
                }
            }
            this.lastByteIndex = i;
            this.bytes += i - this.start;
            if (i >= 64) {
                this.start = i - 64;
                this.hash();
                this.hashed = true;
            } else {
                this.start = i;
            }
        }
        return this;
    };
    Md4.prototype.finalize = function() {
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        var blocks = this.blocks, i = this.lastByteIndex;
        blocks[i >> 2] |= EXTRA[i & 3];
        if (i >= 56) {
            if (!this.hashed) {
                this.hash();
            }
            blocks[0] = blocks[16];
            blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        }
        blocks[14] = this.bytes << 3;
        this.hash();
    };
    Md4.prototype.hash = function() {
        var a, b, c, d, ab, bc, cd, da, blocks = this.blocks;
        if (this.first) {
            a = blocks[0] - 1;
            a = a << 3 | a >>> 29;
            d = (a & 0xefcdab89 | ~a & 0x98badcfe) + blocks[1] + 271733878;
            d = d << 7 | d >>> 25;
            c = (d & a | ~d & 0xefcdab89) + blocks[2] - 1732584194;
            c = c << 11 | c >>> 21;
            b = (c & d | ~c & a) + blocks[3] - 271733879;
            b = b << 19 | b >>> 13;
        } else {
            a = this.h0;
            b = this.h1;
            c = this.h2;
            d = this.h3;
            a += (b & c | ~b & d) + blocks[0];
            a = a << 3 | a >>> 29;
            d += (a & b | ~a & c) + blocks[1];
            d = d << 7 | d >>> 25;
            c += (d & a | ~d & b) + blocks[2];
            c = c << 11 | c >>> 21;
            b += (c & d | ~c & a) + blocks[3];
            b = b << 19 | b >>> 13;
        }
        a += (b & c | ~b & d) + blocks[4];
        a = a << 3 | a >>> 29;
        d += (a & b | ~a & c) + blocks[5];
        d = d << 7 | d >>> 25;
        c += (d & a | ~d & b) + blocks[6];
        c = c << 11 | c >>> 21;
        b += (c & d | ~c & a) + blocks[7];
        b = b << 19 | b >>> 13;
        a += (b & c | ~b & d) + blocks[8];
        a = a << 3 | a >>> 29;
        d += (a & b | ~a & c) + blocks[9];
        d = d << 7 | d >>> 25;
        c += (d & a | ~d & b) + blocks[10];
        c = c << 11 | c >>> 21;
        b += (c & d | ~c & a) + blocks[11];
        b = b << 19 | b >>> 13;
        a += (b & c | ~b & d) + blocks[12];
        a = a << 3 | a >>> 29;
        d += (a & b | ~a & c) + blocks[13];
        d = d << 7 | d >>> 25;
        c += (d & a | ~d & b) + blocks[14];
        c = c << 11 | c >>> 21;
        b += (c & d | ~c & a) + blocks[15];
        b = b << 19 | b >>> 13;
        bc = b & c;
        a += (bc | b & d | c & d) + blocks[0] + 1518500249;
        a = a << 3 | a >>> 29;
        ab = a & b;
        d += (ab | a & c | bc) + blocks[4] + 1518500249;
        d = d << 5 | d >>> 27;
        da = d & a;
        c += (da | d & b | ab) + blocks[8] + 1518500249;
        c = c << 9 | c >>> 23;
        cd = c & d;
        b += (cd | c & a | da) + blocks[12] + 1518500249;
        b = b << 13 | b >>> 19;
        bc = b & c;
        a += (bc | b & d | cd) + blocks[1] + 1518500249;
        a = a << 3 | a >>> 29;
        ab = a & b;
        d += (ab | a & c | bc) + blocks[5] + 1518500249;
        d = d << 5 | d >>> 27;
        da = d & a;
        c += (da | d & b | ab) + blocks[9] + 1518500249;
        c = c << 9 | c >>> 23;
        cd = c & d;
        b += (cd | c & a | da) + blocks[13] + 1518500249;
        b = b << 13 | b >>> 19;
        bc = b & c;
        a += (bc | b & d | cd) + blocks[2] + 1518500249;
        a = a << 3 | a >>> 29;
        ab = a & b;
        d += (ab | a & c | bc) + blocks[6] + 1518500249;
        d = d << 5 | d >>> 27;
        da = d & a;
        c += (da | d & b | ab) + blocks[10] + 1518500249;
        c = c << 9 | c >>> 23;
        cd = c & d;
        b += (cd | c & a | da) + blocks[14] + 1518500249;
        b = b << 13 | b >>> 19;
        bc = b & c;
        a += (bc | b & d | cd) + blocks[3] + 1518500249;
        a = a << 3 | a >>> 29;
        ab = a & b;
        d += (ab | a & c | bc) + blocks[7] + 1518500249;
        d = d << 5 | d >>> 27;
        da = d & a;
        c += (da | d & b | ab) + blocks[11] + 1518500249;
        c = c << 9 | c >>> 23;
        b += (c & d | c & a | da) + blocks[15] + 1518500249;
        b = b << 13 | b >>> 19;
        bc = b ^ c;
        a += (bc ^ d) + blocks[0] + 1859775393;
        a = a << 3 | a >>> 29;
        d += (bc ^ a) + blocks[8] + 1859775393;
        d = d << 9 | d >>> 23;
        da = d ^ a;
        c += (da ^ b) + blocks[4] + 1859775393;
        c = c << 11 | c >>> 21;
        b += (da ^ c) + blocks[12] + 1859775393;
        b = b << 15 | b >>> 17;
        bc = b ^ c;
        a += (bc ^ d) + blocks[2] + 1859775393;
        a = a << 3 | a >>> 29;
        d += (bc ^ a) + blocks[10] + 1859775393;
        d = d << 9 | d >>> 23;
        da = d ^ a;
        c += (da ^ b) + blocks[6] + 1859775393;
        c = c << 11 | c >>> 21;
        b += (da ^ c) + blocks[14] + 1859775393;
        b = b << 15 | b >>> 17;
        bc = b ^ c;
        a += (bc ^ d) + blocks[1] + 1859775393;
        a = a << 3 | a >>> 29;
        d += (bc ^ a) + blocks[9] + 1859775393;
        d = d << 9 | d >>> 23;
        da = d ^ a;
        c += (da ^ b) + blocks[5] + 1859775393;
        c = c << 11 | c >>> 21;
        b += (da ^ c) + blocks[13] + 1859775393;
        b = b << 15 | b >>> 17;
        bc = b ^ c;
        a += (bc ^ d) + blocks[3] + 1859775393;
        a = a << 3 | a >>> 29;
        d += (bc ^ a) + blocks[11] + 1859775393;
        d = d << 9 | d >>> 23;
        da = d ^ a;
        c += (da ^ b) + blocks[7] + 1859775393;
        c = c << 11 | c >>> 21;
        b += (da ^ c) + blocks[15] + 1859775393;
        b = b << 15 | b >>> 17;
        if (this.first) {
            this.h0 = a + 1732584193 << 0;
            this.h1 = b - 271733879 << 0;
            this.h2 = c - 1732584194 << 0;
            this.h3 = d + 271733878 << 0;
            this.first = false;
        } else {
            this.h0 = this.h0 + a << 0;
            this.h1 = this.h1 + b << 0;
            this.h2 = this.h2 + c << 0;
            this.h3 = this.h3 + d << 0;
        }
    };
    /**
   * @method hex
   * @memberof Md4
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md4.hex}
   * @example
   * hash.hex();
   */ Md4.prototype.hex = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
        return HEX_CHARS[h0 >> 4 & 0x0F] + HEX_CHARS[h0 & 0x0F] + HEX_CHARS[h0 >> 12 & 0x0F] + HEX_CHARS[h0 >> 8 & 0x0F] + HEX_CHARS[h0 >> 20 & 0x0F] + HEX_CHARS[h0 >> 16 & 0x0F] + HEX_CHARS[h0 >> 28 & 0x0F] + HEX_CHARS[h0 >> 24 & 0x0F] + HEX_CHARS[h1 >> 4 & 0x0F] + HEX_CHARS[h1 & 0x0F] + HEX_CHARS[h1 >> 12 & 0x0F] + HEX_CHARS[h1 >> 8 & 0x0F] + HEX_CHARS[h1 >> 20 & 0x0F] + HEX_CHARS[h1 >> 16 & 0x0F] + HEX_CHARS[h1 >> 28 & 0x0F] + HEX_CHARS[h1 >> 24 & 0x0F] + HEX_CHARS[h2 >> 4 & 0x0F] + HEX_CHARS[h2 & 0x0F] + HEX_CHARS[h2 >> 12 & 0x0F] + HEX_CHARS[h2 >> 8 & 0x0F] + HEX_CHARS[h2 >> 20 & 0x0F] + HEX_CHARS[h2 >> 16 & 0x0F] + HEX_CHARS[h2 >> 28 & 0x0F] + HEX_CHARS[h2 >> 24 & 0x0F] + HEX_CHARS[h3 >> 4 & 0x0F] + HEX_CHARS[h3 & 0x0F] + HEX_CHARS[h3 >> 12 & 0x0F] + HEX_CHARS[h3 >> 8 & 0x0F] + HEX_CHARS[h3 >> 20 & 0x0F] + HEX_CHARS[h3 >> 16 & 0x0F] + HEX_CHARS[h3 >> 28 & 0x0F] + HEX_CHARS[h3 >> 24 & 0x0F];
    };
    /**
   * @method toString
   * @memberof Md4
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md4.hex}
   * @example
   * hash.toString();
   */ Md4.prototype.toString = Md4.prototype.hex;
    /**
   * @method digest
   * @memberof Md4
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md4.digest}
   * @example
   * hash.digest();
   */ Md4.prototype.digest = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
        return [
            h0 & 0xFF,
            h0 >> 8 & 0xFF,
            h0 >> 16 & 0xFF,
            h0 >> 24 & 0xFF,
            h1 & 0xFF,
            h1 >> 8 & 0xFF,
            h1 >> 16 & 0xFF,
            h1 >> 24 & 0xFF,
            h2 & 0xFF,
            h2 >> 8 & 0xFF,
            h2 >> 16 & 0xFF,
            h2 >> 24 & 0xFF,
            h3 & 0xFF,
            h3 >> 8 & 0xFF,
            h3 >> 16 & 0xFF,
            h3 >> 24 & 0xFF
        ];
    };
    /**
   * @method array
   * @memberof Md4
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md4.array}
   * @example
   * hash.array();
   */ Md4.prototype.array = Md4.prototype.digest;
    /**
   * @method arrayBuffer
   * @memberof Md4
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md4.arrayBuffer}
   * @example
   * hash.arrayBuffer();
   */ Md4.prototype.arrayBuffer = function() {
        this.finalize();
        var buffer = new ArrayBuffer(16);
        var blocks = new Uint32Array(buffer);
        blocks[0] = this.h0;
        blocks[1] = this.h1;
        blocks[2] = this.h2;
        blocks[3] = this.h3;
        return buffer;
    };
    /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof Md4
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md4.buffer}
   * @example
   * hash.buffer();
   */ Md4.prototype.buffer = Md4.prototype.arrayBuffer;
    var exports = createMethod();
    if (COMMON_JS) {
        module.exports = exports;
    } else {
        /**
     * @method md4
     * @description MD4 hash function, export to global in browsers.
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} md4 hashes
     * @example
     * md4(''); // 31d6cfe0d16ae931b73c59d7e0c089c0
     * md4('The quick brown fox jumps over the lazy dog'); // 1bee69a46ba811185c194762abaeae90
     * md4('The quick brown fox jumps over the lazy dog.'); // 2812c6c7136898c51f6f6739ad08750e
     *
     * // It also supports UTF-8 encoding
     * md4('中文'); // 223088bf7bd45a16436b15360c5fc5a0
     *
     * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
     * md4([]); // 31d6cfe0d16ae931b73c59d7e0c089c0
     * md4(new Uint8Array([])); // 31d6cfe0d16ae931b73c59d7e0c089c0
     */ root.md4 = exports;
        if (AMD) {
            ((r)=>r !== undefined && __turbopack_context__.v(r))(function() {
                return exports;
            }(__turbopack_context__.r, exports, module));
        }
    }
})();
}),
"[project]/Downloads/mrpii 2/node_modules/native-duplexpair/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Duplex = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Duplex;
const kCallback = Symbol('Callback');
const kOtherSide = Symbol('Other');
class DuplexSocket extends Duplex {
    constructor(options){
        super(options);
        this[kCallback] = null;
        this[kOtherSide] = null;
    }
    _read() {
        const callback = this[kCallback];
        if (callback) {
            this[kCallback] = null;
            callback();
        }
    }
    _write(chunk, encoding, callback) {
        this[kOtherSide][kCallback] = callback;
        this[kOtherSide].push(chunk);
    }
    _final(callback) {
        this[kOtherSide].on('end', callback);
        this[kOtherSide].push(null);
    }
}
class DuplexPair {
    constructor(options){
        this.socket1 = new DuplexSocket(options);
        this.socket2 = new DuplexSocket(options);
        this.socket1[kOtherSide] = this.socket2;
        this.socket2[kOtherSide] = this.socket1;
    }
}
module.exports = DuplexPair;
}),
"[project]/Downloads/mrpii 2/node_modules/process/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// for now just expose the builtin process global from node.js
module.exports = /*TURBOPACK member replacement*/ __turbopack_context__.g.process;
}),
"[project]/Downloads/mrpii 2/node_modules/event-target-shim/dist/event-target-shim.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */ Object.defineProperty(exports, '__esModule', {
    value: true
});
/**
 * @typedef {object} PrivateData
 * @property {EventTarget} eventTarget The event target.
 * @property {{type:string}} event The original event object.
 * @property {number} eventPhase The current event phase.
 * @property {EventTarget|null} currentTarget The current event target.
 * @property {boolean} canceled The flag to prevent default.
 * @property {boolean} stopped The flag to stop propagation.
 * @property {boolean} immediateStopped The flag to stop propagation immediately.
 * @property {Function|null} passiveListener The listener if the current listener is passive. Otherwise this is null.
 * @property {number} timeStamp The unix time.
 * @private
 */ /**
 * Private data for event wrappers.
 * @type {WeakMap<Event, PrivateData>}
 * @private
 */ const privateData = new WeakMap();
/**
 * Cache for wrapper classes.
 * @type {WeakMap<Object, Function>}
 * @private
 */ const wrappers = new WeakMap();
/**
 * Get private data.
 * @param {Event} event The event object to get private data.
 * @returns {PrivateData} The private data of the event.
 * @private
 */ function pd(event) {
    const retv = privateData.get(event);
    console.assert(retv != null, "'this' is expected an Event object, but got", event);
    return retv;
}
/**
 * https://dom.spec.whatwg.org/#set-the-canceled-flag
 * @param data {PrivateData} private data.
 */ function setCancelFlag(data) {
    if (data.passiveListener != null) {
        if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error("Unable to preventDefault inside passive event listener invocation.", data.passiveListener);
        }
        return;
    }
    if (!data.event.cancelable) {
        return;
    }
    data.canceled = true;
    if (typeof data.event.preventDefault === "function") {
        data.event.preventDefault();
    }
}
/**
 * @see https://dom.spec.whatwg.org/#interface-event
 * @private
 */ /**
 * The event wrapper.
 * @constructor
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Event|{type:string}} event The original event to wrap.
 */ function Event(eventTarget, event) {
    privateData.set(this, {
        eventTarget,
        event,
        eventPhase: 2,
        currentTarget: eventTarget,
        canceled: false,
        stopped: false,
        immediateStopped: false,
        passiveListener: null,
        timeStamp: event.timeStamp || Date.now()
    });
    // https://heycam.github.io/webidl/#Unforgeable
    Object.defineProperty(this, "isTrusted", {
        value: false,
        enumerable: true
    });
    // Define accessors
    const keys = Object.keys(event);
    for(let i = 0; i < keys.length; ++i){
        const key = keys[i];
        if (!(key in this)) {
            Object.defineProperty(this, key, defineRedirectDescriptor(key));
        }
    }
}
// Should be enumerable, but class methods are not enumerable.
Event.prototype = {
    /**
     * The type of this event.
     * @type {string}
     */ get type () {
        return pd(this).event.type;
    },
    /**
     * The target of this event.
     * @type {EventTarget}
     */ get target () {
        return pd(this).eventTarget;
    },
    /**
     * The target of this event.
     * @type {EventTarget}
     */ get currentTarget () {
        return pd(this).currentTarget;
    },
    /**
     * @returns {EventTarget[]} The composed path of this event.
     */ composedPath () {
        const currentTarget = pd(this).currentTarget;
        if (currentTarget == null) {
            return [];
        }
        return [
            currentTarget
        ];
    },
    /**
     * Constant of NONE.
     * @type {number}
     */ get NONE () {
        return 0;
    },
    /**
     * Constant of CAPTURING_PHASE.
     * @type {number}
     */ get CAPTURING_PHASE () {
        return 1;
    },
    /**
     * Constant of AT_TARGET.
     * @type {number}
     */ get AT_TARGET () {
        return 2;
    },
    /**
     * Constant of BUBBLING_PHASE.
     * @type {number}
     */ get BUBBLING_PHASE () {
        return 3;
    },
    /**
     * The target of this event.
     * @type {number}
     */ get eventPhase () {
        return pd(this).eventPhase;
    },
    /**
     * Stop event bubbling.
     * @returns {void}
     */ stopPropagation () {
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.stopPropagation === "function") {
            data.event.stopPropagation();
        }
    },
    /**
     * Stop event bubbling.
     * @returns {void}
     */ stopImmediatePropagation () {
        const data = pd(this);
        data.stopped = true;
        data.immediateStopped = true;
        if (typeof data.event.stopImmediatePropagation === "function") {
            data.event.stopImmediatePropagation();
        }
    },
    /**
     * The flag to be bubbling.
     * @type {boolean}
     */ get bubbles () {
        return Boolean(pd(this).event.bubbles);
    },
    /**
     * The flag to be cancelable.
     * @type {boolean}
     */ get cancelable () {
        return Boolean(pd(this).event.cancelable);
    },
    /**
     * Cancel this event.
     * @returns {void}
     */ preventDefault () {
        setCancelFlag(pd(this));
    },
    /**
     * The flag to indicate cancellation state.
     * @type {boolean}
     */ get defaultPrevented () {
        return pd(this).canceled;
    },
    /**
     * The flag to be composed.
     * @type {boolean}
     */ get composed () {
        return Boolean(pd(this).event.composed);
    },
    /**
     * The unix time of this event.
     * @type {number}
     */ get timeStamp () {
        return pd(this).timeStamp;
    },
    /**
     * The target of this event.
     * @type {EventTarget}
     * @deprecated
     */ get srcElement () {
        return pd(this).eventTarget;
    },
    /**
     * The flag to stop event bubbling.
     * @type {boolean}
     * @deprecated
     */ get cancelBubble () {
        return pd(this).stopped;
    },
    set cancelBubble (value){
        if (!value) {
            return;
        }
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.cancelBubble === "boolean") {
            data.event.cancelBubble = true;
        }
    },
    /**
     * The flag to indicate cancellation state.
     * @type {boolean}
     * @deprecated
     */ get returnValue () {
        return !pd(this).canceled;
    },
    set returnValue (value){
        if (!value) {
            setCancelFlag(pd(this));
        }
    },
    /**
     * Initialize this event object. But do nothing under event dispatching.
     * @param {string} type The event type.
     * @param {boolean} [bubbles=false] The flag to be possible to bubble up.
     * @param {boolean} [cancelable=false] The flag to be possible to cancel.
     * @deprecated
     */ initEvent () {
    // Do nothing.
    }
};
// `constructor` is not enumerable.
Object.defineProperty(Event.prototype, "constructor", {
    value: Event,
    configurable: true,
    writable: true
});
// Ensure `event instanceof window.Event` is `true`.
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
/**
 * Get the property descriptor to redirect a given property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to redirect the property.
 * @private
 */ function defineRedirectDescriptor(key) {
    return {
        get () {
            return pd(this).event[key];
        },
        set (value1) {
            pd(this).event[key] = value1;
        },
        configurable: true,
        enumerable: true
    };
}
/**
 * Get the property descriptor to call a given method property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to call the method property.
 * @private
 */ function defineCallDescriptor(key) {
    return {
        value () {
            const event = pd(this).event;
            return event[key].apply(event, arguments);
        },
        configurable: true,
        enumerable: true
    };
}
/**
 * Define new wrapper class.
 * @param {Function} BaseEvent The base wrapper class.
 * @param {Object} proto The prototype of the original event.
 * @returns {Function} The defined wrapper class.
 * @private
 */ function defineWrapper(BaseEvent, proto) {
    const keys = Object.keys(proto);
    if (keys.length === 0) {
        return BaseEvent;
    }
    /** CustomEvent */ function CustomEvent(eventTarget, event) {
        BaseEvent.call(this, eventTarget, event);
    }
    CustomEvent.prototype = Object.create(BaseEvent.prototype, {
        constructor: {
            value: CustomEvent,
            configurable: true,
            writable: true
        }
    });
    // Define accessors.
    for(let i = 0; i < keys.length; ++i){
        const key = keys[i];
        if (!(key in BaseEvent.prototype)) {
            const descriptor = Object.getOwnPropertyDescriptor(proto, key);
            const isFunc = typeof descriptor.value === "function";
            Object.defineProperty(CustomEvent.prototype, key, isFunc ? defineCallDescriptor(key) : defineRedirectDescriptor(key));
        }
    }
    return CustomEvent;
}
/**
 * Get the wrapper class of a given prototype.
 * @param {Object} proto The prototype of the original event to get its wrapper.
 * @returns {Function} The wrapper class.
 * @private
 */ function getWrapper(proto) {
    if (proto == null || proto === Object.prototype) {
        return Event;
    }
    let wrapper = wrappers.get(proto);
    if (wrapper == null) {
        wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
        wrappers.set(proto, wrapper);
    }
    return wrapper;
}
/**
 * Wrap a given event to management a dispatching.
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Object} event The event to wrap.
 * @returns {Event} The wrapper instance.
 * @private
 */ function wrapEvent(eventTarget, event) {
    const Wrapper = getWrapper(Object.getPrototypeOf(event));
    return new Wrapper(eventTarget, event);
}
/**
 * Get the immediateStopped flag of a given event.
 * @param {Event} event The event to get.
 * @returns {boolean} The flag to stop propagation immediately.
 * @private
 */ function isStopped(event) {
    return pd(event).immediateStopped;
}
/**
 * Set the current event phase of a given event.
 * @param {Event} event The event to set current target.
 * @param {number} eventPhase New event phase.
 * @returns {void}
 * @private
 */ function setEventPhase(event, eventPhase) {
    pd(event).eventPhase = eventPhase;
}
/**
 * Set the current target of a given event.
 * @param {Event} event The event to set current target.
 * @param {EventTarget|null} currentTarget New current target.
 * @returns {void}
 * @private
 */ function setCurrentTarget(event, currentTarget) {
    pd(event).currentTarget = currentTarget;
}
/**
 * Set a passive listener of a given event.
 * @param {Event} event The event to set current target.
 * @param {Function|null} passiveListener New passive listener.
 * @returns {void}
 * @private
 */ function setPassiveListener(event, passiveListener) {
    pd(event).passiveListener = passiveListener;
}
/**
 * @typedef {object} ListenerNode
 * @property {Function} listener
 * @property {1|2|3} listenerType
 * @property {boolean} passive
 * @property {boolean} once
 * @property {ListenerNode|null} next
 * @private
 */ /**
 * @type {WeakMap<object, Map<string, ListenerNode>>}
 * @private
 */ const listenersMap = new WeakMap();
// Listener types
const CAPTURE = 1;
const BUBBLE = 2;
const ATTRIBUTE = 3;
/**
 * Check whether a given value is an object or not.
 * @param {any} x The value to check.
 * @returns {boolean} `true` if the value is an object.
 */ function isObject(x) {
    return x !== null && typeof x === "object" //eslint-disable-line no-restricted-syntax
    ;
}
/**
 * Get listeners.
 * @param {EventTarget} eventTarget The event target to get.
 * @returns {Map<string, ListenerNode>} The listeners.
 * @private
 */ function getListeners(eventTarget) {
    const listeners = listenersMap.get(eventTarget);
    if (listeners == null) {
        throw new TypeError("'this' is expected an EventTarget object, but got another value.");
    }
    return listeners;
}
/**
 * Get the property descriptor for the event attribute of a given event.
 * @param {string} eventName The event name to get property descriptor.
 * @returns {PropertyDescriptor} The property descriptor.
 * @private
 */ function defineEventAttributeDescriptor(eventName) {
    return {
        get () {
            const listeners = getListeners(this);
            let node = listeners.get(eventName);
            while(node != null){
                if (node.listenerType === ATTRIBUTE) {
                    return node.listener;
                }
                node = node.next;
            }
            return null;
        },
        set (listener) {
            if (typeof listener !== "function" && !isObject(listener)) {
                listener = null; // eslint-disable-line no-param-reassign
            }
            const listeners = getListeners(this);
            // Traverse to the tail while removing old value.
            let prev = null;
            let node = listeners.get(eventName);
            while(node != null){
                if (node.listenerType === ATTRIBUTE) {
                    // Remove old value.
                    if (prev !== null) {
                        prev.next = node.next;
                    } else if (node.next !== null) {
                        listeners.set(eventName, node.next);
                    } else {
                        listeners.delete(eventName);
                    }
                } else {
                    prev = node;
                }
                node = node.next;
            }
            // Add new value.
            if (listener !== null) {
                const newNode = {
                    listener,
                    listenerType: ATTRIBUTE,
                    passive: false,
                    once: false,
                    next: null
                };
                if (prev === null) {
                    listeners.set(eventName, newNode);
                } else {
                    prev.next = newNode;
                }
            }
        },
        configurable: true,
        enumerable: true
    };
}
/**
 * Define an event attribute (e.g. `eventTarget.onclick`).
 * @param {Object} eventTargetPrototype The event target prototype to define an event attrbite.
 * @param {string} eventName The event name to define.
 * @returns {void}
 */ function defineEventAttribute(eventTargetPrototype, eventName) {
    Object.defineProperty(eventTargetPrototype, `on${eventName}`, defineEventAttributeDescriptor(eventName));
}
/**
 * Define a custom EventTarget with event attributes.
 * @param {string[]} eventNames Event names for event attributes.
 * @returns {EventTarget} The custom EventTarget.
 * @private
 */ function defineCustomEventTarget(eventNames) {
    /** CustomEventTarget */ function CustomEventTarget() {
        EventTarget.call(this);
    }
    CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
        constructor: {
            value: CustomEventTarget,
            configurable: true,
            writable: true
        }
    });
    for(let i = 0; i < eventNames.length; ++i){
        defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
    }
    return CustomEventTarget;
}
/**
 * EventTarget.
 *
 * - This is constructor if no arguments.
 * - This is a function which returns a CustomEventTarget constructor if there are arguments.
 *
 * For example:
 *
 *     class A extends EventTarget {}
 *     class B extends EventTarget("message") {}
 *     class C extends EventTarget("message", "error") {}
 *     class D extends EventTarget(["message", "error"]) {}
 */ function EventTarget() {
    /*eslint-disable consistent-return */ if (this instanceof EventTarget) {
        listenersMap.set(this, new Map());
        return;
    }
    if (arguments.length === 1 && Array.isArray(arguments[0])) {
        return defineCustomEventTarget(arguments[0]);
    }
    if (arguments.length > 0) {
        const types = new Array(arguments.length);
        for(let i = 0; i < arguments.length; ++i){
            types[i] = arguments[i];
        }
        return defineCustomEventTarget(types);
    }
    throw new TypeError("Cannot call a class as a function");
/*eslint-enable consistent-return */ }
// Should be enumerable, but class methods are not enumerable.
EventTarget.prototype = {
    /**
     * Add a given listener to this event target.
     * @param {string} eventName The event name to add.
     * @param {Function} listener The listener to add.
     * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
     * @returns {void}
     */ addEventListener (eventName, listener, options) {
        if (listener == null) {
            return;
        }
        if (typeof listener !== "function" && !isObject(listener)) {
            throw new TypeError("'listener' should be a function or an object.");
        }
        const listeners = getListeners(this);
        const optionsIsObj = isObject(options);
        const capture = optionsIsObj ? Boolean(options.capture) : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        const newNode = {
            listener,
            listenerType,
            passive: optionsIsObj && Boolean(options.passive),
            once: optionsIsObj && Boolean(options.once),
            next: null
        };
        // Set it as the first node if the first node is null.
        let node = listeners.get(eventName);
        if (node === undefined) {
            listeners.set(eventName, newNode);
            return;
        }
        // Traverse to the tail while checking duplication..
        let prev = null;
        while(node != null){
            if (node.listener === listener && node.listenerType === listenerType) {
                // Should ignore duplication.
                return;
            }
            prev = node;
            node = node.next;
        }
        // Add it.
        prev.next = newNode;
    },
    /**
     * Remove a given listener from this event target.
     * @param {string} eventName The event name to remove.
     * @param {Function} listener The listener to remove.
     * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
     * @returns {void}
     */ removeEventListener (eventName, listener, options) {
        if (listener == null) {
            return;
        }
        const listeners = getListeners(this);
        const capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        let prev = null;
        let node = listeners.get(eventName);
        while(node != null){
            if (node.listener === listener && node.listenerType === listenerType) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
                return;
            }
            prev = node;
            node = node.next;
        }
    },
    /**
     * Dispatch a given event.
     * @param {Event|{type:string}} event The event to dispatch.
     * @returns {boolean} `false` if canceled.
     */ dispatchEvent (event) {
        if (event == null || typeof event.type !== "string") {
            throw new TypeError('"event.type" should be a string.');
        }
        // If listeners aren't registered, terminate.
        const listeners = getListeners(this);
        const eventName = event.type;
        let node = listeners.get(eventName);
        if (node == null) {
            return true;
        }
        // Since we cannot rewrite several properties, so wrap object.
        const wrappedEvent = wrapEvent(this, event);
        // This doesn't process capturing phase and bubbling phase.
        // This isn't participating in a tree.
        let prev = null;
        while(node != null){
            // Remove this listener if it's once
            if (node.once) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
            } else {
                prev = node;
            }
            // Call this listener
            setPassiveListener(wrappedEvent, node.passive ? node.listener : null);
            if (typeof node.listener === "function") {
                try {
                    node.listener.call(this, wrappedEvent);
                } catch (err) {
                    if (typeof console !== "undefined" && typeof console.error === "function") {
                        console.error(err);
                    }
                }
            } else if (node.listenerType !== ATTRIBUTE && typeof node.listener.handleEvent === "function") {
                node.listener.handleEvent(wrappedEvent);
            }
            // Break if `event.stopImmediatePropagation` was called.
            if (isStopped(wrappedEvent)) {
                break;
            }
            node = node.next;
        }
        setPassiveListener(wrappedEvent, null);
        setEventPhase(wrappedEvent, 0);
        setCurrentTarget(wrappedEvent, null);
        return !wrappedEvent.defaultPrevented;
    }
};
// `constructor` is not enumerable.
Object.defineProperty(EventTarget.prototype, "constructor", {
    value: EventTarget,
    configurable: true,
    writable: true
});
// Ensure `eventTarget instanceof window.EventTarget` is `true`.
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
exports.defineEventAttribute = defineEventAttribute;
exports.EventTarget = EventTarget;
exports.default = EventTarget;
module.exports = EventTarget;
module.exports.EventTarget = module.exports["default"] = EventTarget;
module.exports.defineEventAttribute = defineEventAttribute; //# sourceMappingURL=event-target-shim.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/abort-controller/dist/abort-controller.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */ Object.defineProperty(exports, '__esModule', {
    value: true
});
var eventTargetShim = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/event-target-shim/dist/event-target-shim.js [app-route] (ecmascript)");
/**
 * The signal class.
 * @see https://dom.spec.whatwg.org/#abortsignal
 */ class AbortSignal extends eventTargetShim.EventTarget {
    /**
     * AbortSignal cannot be constructed directly.
     */ constructor(){
        super();
        throw new TypeError("AbortSignal cannot be constructed directly");
    }
    /**
     * Returns `true` if this `AbortSignal`'s `AbortController` has signaled to abort, and `false` otherwise.
     */ get aborted() {
        const aborted = abortedFlags.get(this);
        if (typeof aborted !== "boolean") {
            throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
        }
        return aborted;
    }
}
eventTargetShim.defineEventAttribute(AbortSignal.prototype, "abort");
/**
 * Create an AbortSignal object.
 */ function createAbortSignal() {
    const signal = Object.create(AbortSignal.prototype);
    eventTargetShim.EventTarget.call(signal);
    abortedFlags.set(signal, false);
    return signal;
}
/**
 * Abort a given signal.
 */ function abortSignal(signal) {
    if (abortedFlags.get(signal) !== false) {
        return;
    }
    abortedFlags.set(signal, true);
    signal.dispatchEvent({
        type: "abort"
    });
}
/**
 * Aborted flag for each instances.
 */ const abortedFlags = new WeakMap();
// Properties should be enumerable.
Object.defineProperties(AbortSignal.prototype, {
    aborted: {
        enumerable: true
    }
});
// `toString()` should return `"[object AbortSignal]"`
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortSignal"
    });
}
/**
 * The AbortController.
 * @see https://dom.spec.whatwg.org/#abortcontroller
 */ class AbortController {
    /**
     * Initialize this controller.
     */ constructor(){
        signals.set(this, createAbortSignal());
    }
    /**
     * Returns the `AbortSignal` object associated with this object.
     */ get signal() {
        return getSignal(this);
    }
    /**
     * Abort and signal to any observers that the associated activity is to be aborted.
     */ abort() {
        abortSignal(getSignal(this));
    }
}
/**
 * Associated signals.
 */ const signals = new WeakMap();
/**
 * Get the associated signal of a given controller.
 */ function getSignal(controller) {
    const signal = signals.get(controller);
    if (signal == null) {
        throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`);
    }
    return signal;
}
// Properties should be enumerable.
Object.defineProperties(AbortController.prototype, {
    signal: {
        enumerable: true
    },
    abort: {
        enumerable: true
    }
});
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(AbortController.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortController"
    });
}
exports.AbortController = AbortController;
exports.AbortSignal = AbortSignal;
exports.default = AbortController;
module.exports = AbortController;
module.exports.AbortController = module.exports["default"] = AbortController;
module.exports.AbortSignal = AbortSignal; //# sourceMappingURL=abort-controller.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/string_decoder/lib/string_decoder.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
/*<replacement>*/ var Buffer = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
/*</replacement>*/ var isEncoding = Buffer.isEncoding || function(encoding) {
    encoding = '' + encoding;
    switch(encoding && encoding.toLowerCase()){
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
            return true;
        default:
            return false;
    }
};
function _normalizeEncoding(enc) {
    if (!enc) return 'utf8';
    var retried;
    while(true){
        switch(enc){
            case 'utf8':
            case 'utf-8':
                return 'utf8';
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return 'utf16le';
            case 'latin1':
            case 'binary':
                return 'latin1';
            case 'base64':
            case 'ascii':
            case 'hex':
                return enc;
            default:
                if (retried) return; // undefined
                enc = ('' + enc).toLowerCase();
                retried = true;
        }
    }
}
;
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
    return nenc || enc;
}
// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch(this.encoding){
        case 'utf16le':
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
        case 'utf8':
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
        case 'base64':
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
        default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer.allocUnsafe(nb);
}
StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return '';
    var r;
    var i;
    if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return '';
        i = this.lastNeed;
        this.lastNeed = 0;
    } else {
        i = 0;
    }
    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || '';
};
StringDecoder.prototype.end = utf8End;
// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;
// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
};
// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
    if (byte <= 0x7F) return 0;
    else if (byte >> 5 === 0x06) return 2;
    else if (byte >> 4 === 0x0E) return 3;
    else if (byte >> 3 === 0x1E) return 4;
    return byte >> 6 === 0x02 ? -1 : -2;
}
// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return '\ufffd';
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
            self.lastNeed = 1;
            return '\ufffd';
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xC0) !== 0x80) {
                self.lastNeed = 2;
                return '\ufffd';
            }
        }
    }
}
// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined) return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
}
// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed) return buf.toString('utf8', i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString('utf8', i, end);
}
// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + '\ufffd';
    return r;
}
// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
        var r = buf.toString('utf16le', i);
        if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 0xD800 && c <= 0xDBFF) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
            }
        }
        return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString('utf16le', i, buf.length - 1);
}
// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString('utf16le', 0, end);
    }
    return r;
}
function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0) return buf.toString('base64', i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
    } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString('base64', i, buf.length - n);
}
function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
    return r;
}
// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
    return buf.toString(this.encoding);
}
function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : '';
}
}),
"[project]/Downloads/mrpii 2/node_modules/inherits/inherits_browser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
        }
    };
} else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {};
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
        }
    };
}
}),
"[project]/Downloads/mrpii 2/node_modules/inherits/inherits.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

try {
    var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
    /* istanbul ignore next */ if (typeof util.inherits !== 'function') throw '';
    module.exports = util.inherits;
} catch (e) {
    /* istanbul ignore next */ module.exports = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/inherits/inherits_browser.js [app-route] (ecmascript)");
}
}),
"[project]/Downloads/mrpii 2/node_modules/bl/BufferList.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { Buffer } = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
const symbol = Symbol.for('BufferList');
function BufferList(buf) {
    if (!(this instanceof BufferList)) {
        return new BufferList(buf);
    }
    BufferList._init.call(this, buf);
}
BufferList._init = function _init(buf) {
    Object.defineProperty(this, symbol, {
        value: true
    });
    this._bufs = [];
    this.length = 0;
    if (buf) {
        this.append(buf);
    }
};
BufferList.prototype._new = function _new(buf) {
    return new BufferList(buf);
};
BufferList.prototype._offset = function _offset(offset) {
    if (offset === 0) {
        return [
            0,
            0
        ];
    }
    let tot = 0;
    for(let i = 0; i < this._bufs.length; i++){
        const _t = tot + this._bufs[i].length;
        if (offset < _t || i === this._bufs.length - 1) {
            return [
                i,
                offset - tot
            ];
        }
        tot = _t;
    }
};
BufferList.prototype._reverseOffset = function(blOffset) {
    const bufferId = blOffset[0];
    let offset = blOffset[1];
    for(let i = 0; i < bufferId; i++){
        offset += this._bufs[i].length;
    }
    return offset;
};
BufferList.prototype.getBuffers = function getBuffers() {
    return this._bufs;
};
BufferList.prototype.get = function get(index) {
    if (index > this.length || index < 0) {
        return undefined;
    }
    const offset = this._offset(index);
    return this._bufs[offset[0]][offset[1]];
};
BufferList.prototype.slice = function slice(start, end) {
    if (typeof start === 'number' && start < 0) {
        start += this.length;
    }
    if (typeof end === 'number' && end < 0) {
        end += this.length;
    }
    return this.copy(null, 0, start, end);
};
BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
    if (typeof srcStart !== 'number' || srcStart < 0) {
        srcStart = 0;
    }
    if (typeof srcEnd !== 'number' || srcEnd > this.length) {
        srcEnd = this.length;
    }
    if (srcStart >= this.length) {
        return dst || Buffer.alloc(0);
    }
    if (srcEnd <= 0) {
        return dst || Buffer.alloc(0);
    }
    const copy = !!dst;
    const off = this._offset(srcStart);
    const len = srcEnd - srcStart;
    let bytes = len;
    let bufoff = copy && dstStart || 0;
    let start = off[1];
    // copy/slice everything
    if (srcStart === 0 && srcEnd === this.length) {
        if (!copy) {
            // slice, but full concat if multiple buffers
            return this._bufs.length === 1 ? this._bufs[0] : Buffer.concat(this._bufs, this.length);
        }
        // copy, need to copy individual buffers
        for(let i = 0; i < this._bufs.length; i++){
            this._bufs[i].copy(dst, bufoff);
            bufoff += this._bufs[i].length;
        }
        return dst;
    }
    // easy, cheap case where it's a subset of one of the buffers
    if (bytes <= this._bufs[off[0]].length - start) {
        return copy ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
    }
    if (!copy) {
        // a slice, we need something to copy in to
        dst = Buffer.allocUnsafe(len);
    }
    for(let i = off[0]; i < this._bufs.length; i++){
        const l = this._bufs[i].length - start;
        if (bytes > l) {
            this._bufs[i].copy(dst, bufoff, start);
            bufoff += l;
        } else {
            this._bufs[i].copy(dst, bufoff, start, start + bytes);
            bufoff += l;
            break;
        }
        bytes -= l;
        if (start) {
            start = 0;
        }
    }
    // safeguard so that we don't return uninitialized memory
    if (dst.length > bufoff) return dst.slice(0, bufoff);
    return dst;
};
BufferList.prototype.shallowSlice = function shallowSlice(start, end) {
    start = start || 0;
    end = typeof end !== 'number' ? this.length : end;
    if (start < 0) {
        start += this.length;
    }
    if (end < 0) {
        end += this.length;
    }
    if (start === end) {
        return this._new();
    }
    const startOffset = this._offset(start);
    const endOffset = this._offset(end);
    const buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
    if (endOffset[1] === 0) {
        buffers.pop();
    } else {
        buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
    }
    if (startOffset[1] !== 0) {
        buffers[0] = buffers[0].slice(startOffset[1]);
    }
    return this._new(buffers);
};
BufferList.prototype.toString = function toString(encoding, start, end) {
    return this.slice(start, end).toString(encoding);
};
BufferList.prototype.consume = function consume(bytes) {
    // first, normalize the argument, in accordance with how Buffer does it
    bytes = Math.trunc(bytes);
    // do nothing if not a positive number
    if (Number.isNaN(bytes) || bytes <= 0) return this;
    while(this._bufs.length){
        if (bytes >= this._bufs[0].length) {
            bytes -= this._bufs[0].length;
            this.length -= this._bufs[0].length;
            this._bufs.shift();
        } else {
            this._bufs[0] = this._bufs[0].slice(bytes);
            this.length -= bytes;
            break;
        }
    }
    return this;
};
BufferList.prototype.duplicate = function duplicate() {
    const copy = this._new();
    for(let i = 0; i < this._bufs.length; i++){
        copy.append(this._bufs[i]);
    }
    return copy;
};
BufferList.prototype.append = function append(buf) {
    return this._attach(buf, BufferList.prototype._appendBuffer);
};
BufferList.prototype.prepend = function prepend(buf) {
    return this._attach(buf, BufferList.prototype._prependBuffer, true);
};
BufferList.prototype._attach = function _attach(buf, attacher, prepend) {
    if (buf == null) {
        return this;
    }
    if (buf.buffer) {
        // append/prepend a view of the underlying ArrayBuffer
        attacher.call(this, Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength));
    } else if (Array.isArray(buf)) {
        const [starting, modifier] = prepend ? [
            buf.length - 1,
            -1
        ] : [
            0,
            1
        ];
        for(let i = starting; i >= 0 && i < buf.length; i += modifier){
            this._attach(buf[i], attacher, prepend);
        }
    } else if (this._isBufferList(buf)) {
        // unwrap argument into individual BufferLists
        const [starting, modifier] = prepend ? [
            buf._bufs.length - 1,
            -1
        ] : [
            0,
            1
        ];
        for(let i = starting; i >= 0 && i < buf._bufs.length; i += modifier){
            this._attach(buf._bufs[i], attacher, prepend);
        }
    } else {
        // coerce number arguments to strings, since Buffer(number) does
        // uninitialized memory allocation
        if (typeof buf === 'number') {
            buf = buf.toString();
        }
        attacher.call(this, Buffer.from(buf));
    }
    return this;
};
BufferList.prototype._appendBuffer = function appendBuffer(buf) {
    this._bufs.push(buf);
    this.length += buf.length;
};
BufferList.prototype._prependBuffer = function prependBuffer(buf) {
    this._bufs.unshift(buf);
    this.length += buf.length;
};
BufferList.prototype.indexOf = function(search, offset, encoding) {
    if (encoding === undefined && typeof offset === 'string') {
        encoding = offset;
        offset = undefined;
    }
    if (typeof search === 'function' || Array.isArray(search)) {
        throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
    } else if (typeof search === 'number') {
        search = Buffer.from([
            search
        ]);
    } else if (typeof search === 'string') {
        search = Buffer.from(search, encoding);
    } else if (this._isBufferList(search)) {
        search = search.slice();
    } else if (Array.isArray(search.buffer)) {
        search = Buffer.from(search.buffer, search.byteOffset, search.byteLength);
    } else if (!Buffer.isBuffer(search)) {
        search = Buffer.from(search);
    }
    offset = Number(offset || 0);
    if (isNaN(offset)) {
        offset = 0;
    }
    if (offset < 0) {
        offset = this.length + offset;
    }
    if (offset < 0) {
        offset = 0;
    }
    if (search.length === 0) {
        return offset > this.length ? this.length : offset;
    }
    const blOffset = this._offset(offset);
    let blIndex = blOffset[0] // index of which internal buffer we're working on
    ;
    let buffOffset = blOffset[1] // offset of the internal buffer we're working on
    ;
    // scan over each buffer
    for(; blIndex < this._bufs.length; blIndex++){
        const buff = this._bufs[blIndex];
        while(buffOffset < buff.length){
            const availableWindow = buff.length - buffOffset;
            if (availableWindow >= search.length) {
                const nativeSearchResult = buff.indexOf(search, buffOffset);
                if (nativeSearchResult !== -1) {
                    return this._reverseOffset([
                        blIndex,
                        nativeSearchResult
                    ]);
                }
                buffOffset = buff.length - search.length + 1; // end of native search window
            } else {
                const revOffset = this._reverseOffset([
                    blIndex,
                    buffOffset
                ]);
                if (this._match(revOffset, search)) {
                    return revOffset;
                }
                buffOffset++;
            }
        }
        buffOffset = 0;
    }
    return -1;
};
BufferList.prototype._match = function(offset, search) {
    if (this.length - offset < search.length) {
        return false;
    }
    for(let searchOffset = 0; searchOffset < search.length; searchOffset++){
        if (this.get(offset + searchOffset) !== search[searchOffset]) {
            return false;
        }
    }
    return true;
};
(function() {
    const methods = {
        readDoubleBE: 8,
        readDoubleLE: 8,
        readFloatBE: 4,
        readFloatLE: 4,
        readBigInt64BE: 8,
        readBigInt64LE: 8,
        readBigUInt64BE: 8,
        readBigUInt64LE: 8,
        readInt32BE: 4,
        readInt32LE: 4,
        readUInt32BE: 4,
        readUInt32LE: 4,
        readInt16BE: 2,
        readInt16LE: 2,
        readUInt16BE: 2,
        readUInt16LE: 2,
        readInt8: 1,
        readUInt8: 1,
        readIntBE: null,
        readIntLE: null,
        readUIntBE: null,
        readUIntLE: null
    };
    for(const m in methods){
        (function(m) {
            if (methods[m] === null) {
                BufferList.prototype[m] = function(offset, byteLength) {
                    return this.slice(offset, offset + byteLength)[m](0, byteLength);
                };
            } else {
                BufferList.prototype[m] = function(offset = 0) {
                    return this.slice(offset, offset + methods[m])[m](0);
                };
            }
        })(m);
    }
})();
// Used internally by the class and also as an indicator of this object being
// a `BufferList`. It's not possible to use `instanceof BufferList` in a browser
// environment because there could be multiple different copies of the
// BufferList class and some `BufferList`s might be `BufferList`s.
BufferList.prototype._isBufferList = function _isBufferList(b) {
    return b instanceof BufferList || BufferList.isBufferList(b);
};
BufferList.isBufferList = function isBufferList(b) {
    return b != null && b[symbol];
};
module.exports = BufferList;
}),
"[project]/Downloads/mrpii 2/node_modules/bl/bl.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DuplexStream = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/readable-stream/lib/ours/index.js [app-route] (ecmascript)").Duplex;
const inherits = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/inherits/inherits.js [app-route] (ecmascript)");
const BufferList = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/bl/BufferList.js [app-route] (ecmascript)");
function BufferListStream(callback) {
    if (!(this instanceof BufferListStream)) {
        return new BufferListStream(callback);
    }
    if (typeof callback === 'function') {
        this._callback = callback;
        const piper = (function piper(err) {
            if (this._callback) {
                this._callback(err);
                this._callback = null;
            }
        }).bind(this);
        this.on('pipe', function onPipe(src) {
            src.on('error', piper);
        });
        this.on('unpipe', function onUnpipe(src) {
            src.removeListener('error', piper);
        });
        callback = null;
    }
    BufferList._init.call(this, callback);
    DuplexStream.call(this);
}
inherits(BufferListStream, DuplexStream);
Object.assign(BufferListStream.prototype, BufferList.prototype);
BufferListStream.prototype._new = function _new(callback) {
    return new BufferListStream(callback);
};
BufferListStream.prototype._write = function _write(buf, encoding, callback) {
    this._appendBuffer(buf);
    if (typeof callback === 'function') {
        callback();
    }
};
BufferListStream.prototype._read = function _read(size) {
    if (!this.length) {
        return this.push(null);
    }
    size = Math.min(size, this.length);
    this.push(this.slice(0, size));
    this.consume(size);
};
BufferListStream.prototype.end = function end(chunk) {
    DuplexStream.prototype.end.call(this, chunk);
    if (this._callback) {
        this._callback(null, this.slice());
        this._callback = null;
    }
};
BufferListStream.prototype._destroy = function _destroy(err, cb) {
    this._bufs.length = 0;
    this.length = 0;
    cb(err);
};
BufferListStream.prototype._isBufferList = function _isBufferList(b) {
    return b instanceof BufferListStream || b instanceof BufferList || BufferListStream.isBufferList(b);
};
BufferListStream.isBufferList = BufferList.isBufferList;
module.exports = BufferListStream;
module.exports.BufferListStream = BufferListStream;
module.exports.BufferList = BufferList;
}),
"[project]/Downloads/mrpii 2/node_modules/safer-buffer/safer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable node/no-deprecated-api */ var buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
var Buffer = buffer.Buffer;
var safer = {};
var key;
for(key in buffer){
    if (!buffer.hasOwnProperty(key)) continue;
    if (key === 'SlowBuffer' || key === 'Buffer') continue;
    safer[key] = buffer[key];
}
var Safer = safer.Buffer = {};
for(key in Buffer){
    if (!Buffer.hasOwnProperty(key)) continue;
    if (key === 'allocUnsafe' || key === 'allocUnsafeSlow') continue;
    Safer[key] = Buffer[key];
}
safer.Buffer.prototype = Buffer.prototype;
if (!Safer.from || Safer.from === Uint8Array.from) {
    Safer.from = function(value, encodingOrOffset, length) {
        if (typeof value === 'number') {
            throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof value);
        }
        if (value && typeof value.length === 'undefined') {
            throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof value);
        }
        return Buffer(value, encodingOrOffset, length);
    };
}
if (!Safer.alloc) {
    Safer.alloc = function(size, fill, encoding) {
        if (typeof size !== 'number') {
            throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size);
        }
        if (size < 0 || size >= 2 * (1 << 30)) {
            throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
        var buf = Buffer(size);
        if (!fill || fill.length === 0) {
            buf.fill(0);
        } else if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        } else {
            buf.fill(fill);
        }
        return buf;
    };
}
if (!safer.kStringMaxLength) {
    try {
        safer.kStringMaxLength = process.binding('buffer').kStringMaxLength;
    } catch (e) {
    // we can't determine kStringMaxLength in environments where process.binding
    // is unsupported, so let's not set it
    }
}
if (!safer.constants) {
    safer.constants = {
        MAX_LENGTH: safer.kMaxLength
    };
    if (safer.kStringMaxLength) {
        safer.constants.MAX_STRING_LENGTH = safer.kStringMaxLength;
    }
}
module.exports = safer;
}),
];

//# sourceMappingURL=e75cc_4c6d8fc2._.js.map