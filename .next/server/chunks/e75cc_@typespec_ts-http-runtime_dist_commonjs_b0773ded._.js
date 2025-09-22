module.exports = [
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/abort-controller/AbortError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
 * ```ts snippet:ReadmeSampleAbortError
 * import { AbortError } from "@typespec/ts-http-runtime";
 *
 * async function doAsyncWork(options: { abortSignal: AbortSignal }): Promise<void> {
 *   if (options.abortSignal.aborted) {
 *     throw new AbortError();
 *   }
 *
 *   // do async work
 * }
 *
 * const controller = new AbortController();
 * controller.abort();
 *
 * try {
 *   doAsyncWork({ abortSignal: controller.signal });
 * } catch (e) {
 *   if (e instanceof Error && e.name === "AbortError") {
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
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/logger/log.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.log = log;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
const node_os_1 = __turbopack_context__.r("[externals]/node:os [external] (node:os, cjs)");
const node_util_1 = tslib_1.__importDefault(__turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)"));
const node_process_1 = tslib_1.__importDefault(__turbopack_context__.r("[externals]/node:process [external] (node:process, cjs)"));
function log(message, ...args) {
    node_process_1.default.stderr.write(`${node_util_1.default.format(message, ...args)}${node_os_1.EOL}`);
} //# sourceMappingURL=log.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/logger/debug.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
const log_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/logger/log.js [app-route] (ecmascript)");
const debugEnvVariable = typeof process !== "undefined" && process.env && process.env.DEBUG || undefined;
let enabledString;
let enabledNamespaces = [];
let skippedNamespaces = [];
const debuggers = [];
if (debugEnvVariable) {
    enable(debugEnvVariable);
}
const debugObj = Object.assign((namespace)=>{
    return createDebugger(namespace);
}, {
    enable,
    enabled,
    disable,
    log: log_js_1.log
});
function enable(namespaces) {
    enabledString = namespaces;
    enabledNamespaces = [];
    skippedNamespaces = [];
    const namespaceList = namespaces.split(",").map((ns)=>ns.trim());
    for (const ns of namespaceList){
        if (ns.startsWith("-")) {
            skippedNamespaces.push(ns.substring(1));
        } else {
            enabledNamespaces.push(ns);
        }
    }
    for (const instance of debuggers){
        instance.enabled = enabled(instance.namespace);
    }
}
function enabled(namespace) {
    if (namespace.endsWith("*")) {
        return true;
    }
    for (const skipped of skippedNamespaces){
        if (namespaceMatches(namespace, skipped)) {
            return false;
        }
    }
    for (const enabledNamespace of enabledNamespaces){
        if (namespaceMatches(namespace, enabledNamespace)) {
            return true;
        }
    }
    return false;
}
/**
 * Given a namespace, check if it matches a pattern.
 * Patterns only have a single wildcard character which is *.
 * The behavior of * is that it matches zero or more other characters.
 */ function namespaceMatches(namespace, patternToMatch) {
    // simple case, no pattern matching required
    if (patternToMatch.indexOf("*") === -1) {
        return namespace === patternToMatch;
    }
    let pattern = patternToMatch;
    // normalize successive * if needed
    if (patternToMatch.indexOf("**") !== -1) {
        const patternParts = [];
        let lastCharacter = "";
        for (const character of patternToMatch){
            if (character === "*" && lastCharacter === "*") {
                continue;
            } else {
                lastCharacter = character;
                patternParts.push(character);
            }
        }
        pattern = patternParts.join("");
    }
    let namespaceIndex = 0;
    let patternIndex = 0;
    const patternLength = pattern.length;
    const namespaceLength = namespace.length;
    let lastWildcard = -1;
    let lastWildcardNamespace = -1;
    while(namespaceIndex < namespaceLength && patternIndex < patternLength){
        if (pattern[patternIndex] === "*") {
            lastWildcard = patternIndex;
            patternIndex++;
            if (patternIndex === patternLength) {
                // if wildcard is the last character, it will match the remaining namespace string
                return true;
            }
            // now we let the wildcard eat characters until we match the next literal in the pattern
            while(namespace[namespaceIndex] !== pattern[patternIndex]){
                namespaceIndex++;
                // reached the end of the namespace without a match
                if (namespaceIndex === namespaceLength) {
                    return false;
                }
            }
            // now that we have a match, let's try to continue on
            // however, it's possible we could find a later match
            // so keep a reference in case we have to backtrack
            lastWildcardNamespace = namespaceIndex;
            namespaceIndex++;
            patternIndex++;
            continue;
        } else if (pattern[patternIndex] === namespace[namespaceIndex]) {
            // simple case: literal pattern matches so keep going
            patternIndex++;
            namespaceIndex++;
        } else if (lastWildcard >= 0) {
            // special case: we don't have a literal match, but there is a previous wildcard
            // which we can backtrack to and try having the wildcard eat the match instead
            patternIndex = lastWildcard + 1;
            namespaceIndex = lastWildcardNamespace + 1;
            // we've reached the end of the namespace without a match
            if (namespaceIndex === namespaceLength) {
                return false;
            }
            // similar to the previous logic, let's keep going until we find the next literal match
            while(namespace[namespaceIndex] !== pattern[patternIndex]){
                namespaceIndex++;
                if (namespaceIndex === namespaceLength) {
                    return false;
                }
            }
            lastWildcardNamespace = namespaceIndex;
            namespaceIndex++;
            patternIndex++;
            continue;
        } else {
            return false;
        }
    }
    const namespaceDone = namespaceIndex === namespace.length;
    const patternDone = patternIndex === pattern.length;
    // this is to detect the case of an unneeded final wildcard
    // e.g. the pattern `ab*` should match the string `ab`
    const trailingWildCard = patternIndex === pattern.length - 1 && pattern[patternIndex] === "*";
    return namespaceDone && (patternDone || trailingWildCard);
}
function disable() {
    const result = enabledString || "";
    enable("");
    return result;
}
function createDebugger(namespace) {
    const newDebugger = Object.assign(debug, {
        enabled: enabled(namespace),
        destroy,
        log: debugObj.log,
        namespace,
        extend
    });
    function debug(...args) {
        if (!newDebugger.enabled) {
            return;
        }
        if (args.length > 0) {
            args[0] = `${namespace} ${args[0]}`;
        }
        newDebugger.log(...args);
    }
    debuggers.push(newDebugger);
    return newDebugger;
}
function destroy() {
    const index = debuggers.indexOf(this);
    if (index >= 0) {
        debuggers.splice(index, 1);
        return true;
    }
    return false;
}
function extend(namespace) {
    const newDebugger = createDebugger(`${this.namespace}:${namespace}`);
    newDebugger.log = this.log;
    return newDebugger;
}
exports.default = debugObj; //# sourceMappingURL=debug.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/logger/logger.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TypeSpecRuntimeLogger = void 0;
exports.createLoggerContext = createLoggerContext;
exports.setLogLevel = setLogLevel;
exports.getLogLevel = getLogLevel;
exports.createClientLogger = createClientLogger;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
const debug_js_1 = tslib_1.__importDefault(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/logger/debug.js [app-route] (ecmascript)"));
const TYPESPEC_RUNTIME_LOG_LEVELS = [
    "verbose",
    "info",
    "warning",
    "error"
];
const levelMap = {
    verbose: 400,
    info: 300,
    warning: 200,
    error: 100
};
function patchLogMethod(parent, child) {
    child.log = (...args)=>{
        parent.log(...args);
    };
}
function isTypeSpecRuntimeLogLevel(level) {
    return TYPESPEC_RUNTIME_LOG_LEVELS.includes(level);
}
/**
 * Creates a logger context base on the provided options.
 * @param options - The options for creating a logger context.
 * @returns The logger context.
 */ function createLoggerContext(options) {
    const registeredLoggers = new Set();
    const logLevelFromEnv = typeof process !== "undefined" && process.env && process.env[options.logLevelEnvVarName] || undefined;
    let logLevel;
    const clientLogger = (0, debug_js_1.default)(options.namespace);
    clientLogger.log = (...args)=>{
        debug_js_1.default.log(...args);
    };
    function contextSetLogLevel(level) {
        if (level && !isTypeSpecRuntimeLogLevel(level)) {
            throw new Error(`Unknown log level '${level}'. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(",")}`);
        }
        logLevel = level;
        const enabledNamespaces = [];
        for (const logger of registeredLoggers){
            if (shouldEnable(logger)) {
                enabledNamespaces.push(logger.namespace);
            }
        }
        debug_js_1.default.enable(enabledNamespaces.join(","));
    }
    if (logLevelFromEnv) {
        // avoid calling setLogLevel because we don't want a mis-set environment variable to crash
        if (isTypeSpecRuntimeLogLevel(logLevelFromEnv)) {
            contextSetLogLevel(logLevelFromEnv);
        } else {
            console.error(`${options.logLevelEnvVarName} set to unknown log level '${logLevelFromEnv}'; logging is not enabled. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(", ")}.`);
        }
    }
    function shouldEnable(logger) {
        return Boolean(logLevel && levelMap[logger.level] <= levelMap[logLevel]);
    }
    function createLogger(parent, level) {
        const logger = Object.assign(parent.extend(level), {
            level
        });
        patchLogMethod(parent, logger);
        if (shouldEnable(logger)) {
            const enabledNamespaces = debug_js_1.default.disable();
            debug_js_1.default.enable(enabledNamespaces + "," + logger.namespace);
        }
        registeredLoggers.add(logger);
        return logger;
    }
    function contextGetLogLevel() {
        return logLevel;
    }
    function contextCreateClientLogger(namespace) {
        const clientRootLogger = clientLogger.extend(namespace);
        patchLogMethod(clientLogger, clientRootLogger);
        return {
            error: createLogger(clientRootLogger, "error"),
            warning: createLogger(clientRootLogger, "warning"),
            info: createLogger(clientRootLogger, "info"),
            verbose: createLogger(clientRootLogger, "verbose")
        };
    }
    return {
        setLogLevel: contextSetLogLevel,
        getLogLevel: contextGetLogLevel,
        createClientLogger: contextCreateClientLogger,
        logger: clientLogger
    };
}
const context = createLoggerContext({
    logLevelEnvVarName: "TYPESPEC_RUNTIME_LOG_LEVEL",
    namespace: "typeSpecRuntime"
});
/**
 * Immediately enables logging at the specified log level. If no level is specified, logging is disabled.
 * @param level - The log level to enable for logging.
 * Options from most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */ // eslint-disable-next-line @typescript-eslint/no-redeclare
exports.TypeSpecRuntimeLogger = context.logger;
/**
 * Retrieves the currently specified log level.
 */ function setLogLevel(logLevel) {
    context.setLogLevel(logLevel);
}
/**
 * Retrieves the currently specified log level.
 */ function getLogLevel() {
    return context.getLogLevel();
}
/**
 * Creates a logger for use by the SDKs that inherits from `TypeSpecRuntimeLogger`.
 * @param namespace - The name of the SDK package.
 * @hidden
 */ function createClientLogger(namespace) {
    return context.createClientLogger(namespace);
} //# sourceMappingURL=logger.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/httpHeaders.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createHttpHeaders = createHttpHeaders;
function normalizeName(name) {
    return name.toLowerCase();
}
function* headerIterator(map) {
    for (const entry of map.values()){
        yield [
            entry.name,
            entry.value
        ];
    }
}
class HttpHeadersImpl {
    _headersMap;
    constructor(rawHeaders){
        this._headersMap = new Map();
        if (rawHeaders) {
            for (const headerName of Object.keys(rawHeaders)){
                this.set(headerName, rawHeaders[headerName]);
            }
        }
    }
    /**
     * Set a header in this collection with the provided name and value. The name is
     * case-insensitive.
     * @param name - The name of the header to set. This value is case-insensitive.
     * @param value - The value of the header to set.
     */ set(name, value) {
        this._headersMap.set(normalizeName(name), {
            name,
            value: String(value).trim()
        });
    }
    /**
     * Get the header value for the provided header name, or undefined if no header exists in this
     * collection with the provided name.
     * @param name - The name of the header. This value is case-insensitive.
     */ get(name) {
        return this._headersMap.get(normalizeName(name))?.value;
    }
    /**
     * Get whether or not this header collection contains a header entry for the provided header name.
     * @param name - The name of the header to set. This value is case-insensitive.
     */ has(name) {
        return this._headersMap.has(normalizeName(name));
    }
    /**
     * Remove the header with the provided headerName.
     * @param name - The name of the header to remove.
     */ delete(name) {
        this._headersMap.delete(normalizeName(name));
    }
    /**
     * Get the JSON object representation of this HTTP header collection.
     */ toJSON(options = {}) {
        const result = {};
        if (options.preserveCase) {
            for (const entry of this._headersMap.values()){
                result[entry.name] = entry.value;
            }
        } else {
            for (const [normalizedName, entry] of this._headersMap){
                result[normalizedName] = entry.value;
            }
        }
        return result;
    }
    /**
     * Get the string representation of this HTTP header collection.
     */ toString() {
        return JSON.stringify(this.toJSON({
            preserveCase: true
        }));
    }
    /**
     * Iterate over tuples of header [name, value] pairs.
     */ [Symbol.iterator]() {
        return headerIterator(this._headersMap);
    }
}
/**
 * Creates an object that satisfies the `HttpHeaders` interface.
 * @param rawHeaders - A simple object representing initial headers
 */ function createHttpHeaders(rawHeaders) {
    return new HttpHeadersImpl(rawHeaders);
} //# sourceMappingURL=httpHeaders.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/auth/schemes.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
}); //# sourceMappingURL=schemes.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/auth/oauth2Flows.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
}); //# sourceMappingURL=oauth2Flows.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/uuidUtils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.randomUUID = randomUUID;
const node_crypto_1 = __turbopack_context__.r("[externals]/node:crypto [external] (node:crypto, cjs)");
// NOTE: This is a workaround until we can use `globalThis.crypto.randomUUID` in Node.js 19+.
const uuidFunction = typeof globalThis?.crypto?.randomUUID === "function" ? globalThis.crypto.randomUUID.bind(globalThis.crypto) : node_crypto_1.randomUUID;
/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 */ function randomUUID() {
    return uuidFunction();
} //# sourceMappingURL=uuidUtils.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/pipelineRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPipelineRequest = createPipelineRequest;
const httpHeaders_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/httpHeaders.js [app-route] (ecmascript)");
const uuidUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/uuidUtils.js [app-route] (ecmascript)");
class PipelineRequestImpl {
    url;
    method;
    headers;
    timeout;
    withCredentials;
    body;
    multipartBody;
    formData;
    streamResponseStatusCodes;
    enableBrowserStreams;
    proxySettings;
    disableKeepAlive;
    abortSignal;
    requestId;
    allowInsecureConnection;
    onUploadProgress;
    onDownloadProgress;
    requestOverrides;
    authSchemes;
    constructor(options){
        this.url = options.url;
        this.body = options.body;
        this.headers = options.headers ?? (0, httpHeaders_js_1.createHttpHeaders)();
        this.method = options.method ?? "GET";
        this.timeout = options.timeout ?? 0;
        this.multipartBody = options.multipartBody;
        this.formData = options.formData;
        this.disableKeepAlive = options.disableKeepAlive ?? false;
        this.proxySettings = options.proxySettings;
        this.streamResponseStatusCodes = options.streamResponseStatusCodes;
        this.withCredentials = options.withCredentials ?? false;
        this.abortSignal = options.abortSignal;
        this.onUploadProgress = options.onUploadProgress;
        this.onDownloadProgress = options.onDownloadProgress;
        this.requestId = options.requestId || (0, uuidUtils_js_1.randomUUID)();
        this.allowInsecureConnection = options.allowInsecureConnection ?? false;
        this.enableBrowserStreams = options.enableBrowserStreams ?? false;
        this.requestOverrides = options.requestOverrides;
        this.authSchemes = options.authSchemes;
    }
}
/**
 * Creates a new pipeline request with the given options.
 * This method is to allow for the easy setting of default values and not required.
 * @param options - The options to create the request with.
 */ function createPipelineRequest(options) {
    return new PipelineRequestImpl(options);
} //# sourceMappingURL=pipelineRequest.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/pipeline.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createEmptyPipeline = createEmptyPipeline;
const ValidPhaseNames = new Set([
    "Deserialize",
    "Serialize",
    "Retry",
    "Sign"
]);
/**
 * A private implementation of Pipeline.
 * Do not export this class from the package.
 * @internal
 */ class HttpPipeline {
    _policies = [];
    _orderedPolicies;
    constructor(policies){
        this._policies = policies?.slice(0) ?? [];
        this._orderedPolicies = undefined;
    }
    addPolicy(policy, options = {}) {
        if (options.phase && options.afterPhase) {
            throw new Error("Policies inside a phase cannot specify afterPhase.");
        }
        if (options.phase && !ValidPhaseNames.has(options.phase)) {
            throw new Error(`Invalid phase name: ${options.phase}`);
        }
        if (options.afterPhase && !ValidPhaseNames.has(options.afterPhase)) {
            throw new Error(`Invalid afterPhase name: ${options.afterPhase}`);
        }
        this._policies.push({
            policy,
            options
        });
        this._orderedPolicies = undefined;
    }
    removePolicy(options) {
        const removedPolicies = [];
        this._policies = this._policies.filter((policyDescriptor)=>{
            if (options.name && policyDescriptor.policy.name === options.name || options.phase && policyDescriptor.options.phase === options.phase) {
                removedPolicies.push(policyDescriptor.policy);
                return false;
            } else {
                return true;
            }
        });
        this._orderedPolicies = undefined;
        return removedPolicies;
    }
    sendRequest(httpClient, request) {
        const policies = this.getOrderedPolicies();
        const pipeline = policies.reduceRight((next, policy)=>{
            return (req)=>{
                return policy.sendRequest(req, next);
            };
        }, (req)=>httpClient.sendRequest(req));
        return pipeline(request);
    }
    getOrderedPolicies() {
        if (!this._orderedPolicies) {
            this._orderedPolicies = this.orderPolicies();
        }
        return this._orderedPolicies;
    }
    clone() {
        return new HttpPipeline(this._policies);
    }
    static create() {
        return new HttpPipeline();
    }
    orderPolicies() {
        /**
         * The goal of this method is to reliably order pipeline policies
         * based on their declared requirements when they were added.
         *
         * Order is first determined by phase:
         *
         * 1. Serialize Phase
         * 2. Policies not in a phase
         * 3. Deserialize Phase
         * 4. Retry Phase
         * 5. Sign Phase
         *
         * Within each phase, policies are executed in the order
         * they were added unless they were specified to execute
         * before/after other policies or after a particular phase.
         *
         * To determine the final order, we will walk the policy list
         * in phase order multiple times until all dependencies are
         * satisfied.
         *
         * `afterPolicies` are the set of policies that must be
         * executed before a given policy. This requirement is
         * considered satisfied when each of the listed policies
         * have been scheduled.
         *
         * `beforePolicies` are the set of policies that must be
         * executed after a given policy. Since this dependency
         * can be expressed by converting it into a equivalent
         * `afterPolicies` declarations, they are normalized
         * into that form for simplicity.
         *
         * An `afterPhase` dependency is considered satisfied when all
         * policies in that phase have scheduled.
         *
         */ const result = [];
        // Track all policies we know about.
        const policyMap = new Map();
        function createPhase(name) {
            return {
                name,
                policies: new Set(),
                hasRun: false,
                hasAfterPolicies: false
            };
        }
        // Track policies for each phase.
        const serializePhase = createPhase("Serialize");
        const noPhase = createPhase("None");
        const deserializePhase = createPhase("Deserialize");
        const retryPhase = createPhase("Retry");
        const signPhase = createPhase("Sign");
        // a list of phases in order
        const orderedPhases = [
            serializePhase,
            noPhase,
            deserializePhase,
            retryPhase,
            signPhase
        ];
        // Small helper function to map phase name to each Phase
        function getPhase(phase) {
            if (phase === "Retry") {
                return retryPhase;
            } else if (phase === "Serialize") {
                return serializePhase;
            } else if (phase === "Deserialize") {
                return deserializePhase;
            } else if (phase === "Sign") {
                return signPhase;
            } else {
                return noPhase;
            }
        }
        // First walk each policy and create a node to track metadata.
        for (const descriptor of this._policies){
            const policy = descriptor.policy;
            const options = descriptor.options;
            const policyName = policy.name;
            if (policyMap.has(policyName)) {
                throw new Error("Duplicate policy names not allowed in pipeline");
            }
            const node = {
                policy,
                dependsOn: new Set(),
                dependants: new Set()
            };
            if (options.afterPhase) {
                node.afterPhase = getPhase(options.afterPhase);
                node.afterPhase.hasAfterPolicies = true;
            }
            policyMap.set(policyName, node);
            const phase = getPhase(options.phase);
            phase.policies.add(node);
        }
        // Now that each policy has a node, connect dependency references.
        for (const descriptor of this._policies){
            const { policy, options } = descriptor;
            const policyName = policy.name;
            const node = policyMap.get(policyName);
            if (!node) {
                throw new Error(`Missing node for policy ${policyName}`);
            }
            if (options.afterPolicies) {
                for (const afterPolicyName of options.afterPolicies){
                    const afterNode = policyMap.get(afterPolicyName);
                    if (afterNode) {
                        // Linking in both directions helps later
                        // when we want to notify dependants.
                        node.dependsOn.add(afterNode);
                        afterNode.dependants.add(node);
                    }
                }
            }
            if (options.beforePolicies) {
                for (const beforePolicyName of options.beforePolicies){
                    const beforeNode = policyMap.get(beforePolicyName);
                    if (beforeNode) {
                        // To execute before another node, make it
                        // depend on the current node.
                        beforeNode.dependsOn.add(node);
                        node.dependants.add(beforeNode);
                    }
                }
            }
        }
        function walkPhase(phase) {
            phase.hasRun = true;
            // Sets iterate in insertion order
            for (const node of phase.policies){
                if (node.afterPhase && (!node.afterPhase.hasRun || node.afterPhase.policies.size)) {
                    continue;
                }
                if (node.dependsOn.size === 0) {
                    // If there's nothing else we're waiting for, we can
                    // add this policy to the result list.
                    result.push(node.policy);
                    // Notify anything that depends on this policy that
                    // the policy has been scheduled.
                    for (const dependant of node.dependants){
                        dependant.dependsOn.delete(node);
                    }
                    policyMap.delete(node.policy.name);
                    phase.policies.delete(node);
                }
            }
        }
        function walkPhases() {
            for (const phase of orderedPhases){
                walkPhase(phase);
                // if the phase isn't complete
                if (phase.policies.size > 0 && phase !== noPhase) {
                    if (!noPhase.hasRun) {
                        // Try running noPhase to see if that unblocks this phase next tick.
                        // This can happen if a phase that happens before noPhase
                        // is waiting on a noPhase policy to complete.
                        walkPhase(noPhase);
                    }
                    // Don't proceed to the next phase until this phase finishes.
                    return;
                }
                if (phase.hasAfterPolicies) {
                    // Run any policies unblocked by this phase
                    walkPhase(noPhase);
                }
            }
        }
        // Iterate until we've put every node in the result list.
        let iteration = 0;
        while(policyMap.size > 0){
            iteration++;
            const initialResultLength = result.length;
            // Keep walking each phase in order until we can order every node.
            walkPhases();
            // The result list *should* get at least one larger each time
            // after the first full pass.
            // Otherwise, we're going to loop forever.
            if (result.length <= initialResultLength && iteration > 1) {
                throw new Error("Cannot satisfy policy dependencies due to requirements cycle.");
            }
        }
        return result;
    }
}
/**
 * Creates a totally empty pipeline.
 * Useful for testing or creating a custom one.
 */ function createEmptyPipeline() {
    return HttpPipeline.create();
} //# sourceMappingURL=pipeline.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/object.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isObject = isObject;
/**
 * Helper to determine when an input is a generic JS object.
 * @returns true when input is an object type that is not null, Array, RegExp, or Date.
 */ function isObject(input) {
    return typeof input === "object" && input !== null && !Array.isArray(input) && !(input instanceof RegExp) && !(input instanceof Date);
} //# sourceMappingURL=object.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/error.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isError = isError;
const object_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/object.js [app-route] (ecmascript)");
/**
 * Typeguard for an error object shape (has name and message)
 * @param e - Something caught by a catch clause.
 */ function isError(e) {
    if ((0, object_js_1.isObject)(e)) {
        const hasName = typeof e.name === "string";
        const hasMessage = typeof e.message === "string";
        return hasName && hasMessage;
    }
    return false;
} //# sourceMappingURL=error.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/inspect.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.custom = void 0;
const node_util_1 = __turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)");
exports.custom = node_util_1.inspect.custom; //# sourceMappingURL=inspect.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/sanitizer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Sanitizer = void 0;
const object_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/object.js [app-route] (ecmascript)");
const RedactedString = "REDACTED";
// Make sure this list is up-to-date with the one under core/logger/Readme#Keyconcepts
const defaultAllowedHeaderNames = [
    "x-ms-client-request-id",
    "x-ms-return-client-request-id",
    "x-ms-useragent",
    "x-ms-correlation-request-id",
    "x-ms-request-id",
    "client-request-id",
    "ms-cv",
    "return-client-request-id",
    "traceparent",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Origin",
    "Access-Control-Expose-Headers",
    "Access-Control-Max-Age",
    "Access-Control-Request-Headers",
    "Access-Control-Request-Method",
    "Origin",
    "Accept",
    "Accept-Encoding",
    "Cache-Control",
    "Connection",
    "Content-Length",
    "Content-Type",
    "Date",
    "ETag",
    "Expires",
    "If-Match",
    "If-Modified-Since",
    "If-None-Match",
    "If-Unmodified-Since",
    "Last-Modified",
    "Pragma",
    "Request-Id",
    "Retry-After",
    "Server",
    "Transfer-Encoding",
    "User-Agent",
    "WWW-Authenticate"
];
const defaultAllowedQueryParameters = [
    "api-version"
];
/**
 * A utility class to sanitize objects for logging.
 */ class Sanitizer {
    allowedHeaderNames;
    allowedQueryParameters;
    constructor({ additionalAllowedHeaderNames: allowedHeaderNames = [], additionalAllowedQueryParameters: allowedQueryParameters = [] } = {}){
        allowedHeaderNames = defaultAllowedHeaderNames.concat(allowedHeaderNames);
        allowedQueryParameters = defaultAllowedQueryParameters.concat(allowedQueryParameters);
        this.allowedHeaderNames = new Set(allowedHeaderNames.map((n)=>n.toLowerCase()));
        this.allowedQueryParameters = new Set(allowedQueryParameters.map((p)=>p.toLowerCase()));
    }
    /**
     * Sanitizes an object for logging.
     * @param obj - The object to sanitize
     * @returns - The sanitized object as a string
     */ sanitize(obj) {
        const seen = new Set();
        return JSON.stringify(obj, (key, value)=>{
            // Ensure Errors include their interesting non-enumerable members
            if (value instanceof Error) {
                return {
                    ...value,
                    name: value.name,
                    message: value.message
                };
            }
            if (key === "headers") {
                return this.sanitizeHeaders(value);
            } else if (key === "url") {
                return this.sanitizeUrl(value);
            } else if (key === "query") {
                return this.sanitizeQuery(value);
            } else if (key === "body") {
                // Don't log the request body
                return undefined;
            } else if (key === "response") {
                // Don't log response again
                return undefined;
            } else if (key === "operationSpec") {
                // When using sendOperationRequest, the request carries a massive
                // field with the autorest spec. No need to log it.
                return undefined;
            } else if (Array.isArray(value) || (0, object_js_1.isObject)(value)) {
                if (seen.has(value)) {
                    return "[Circular]";
                }
                seen.add(value);
            }
            return value;
        }, 2);
    }
    /**
     * Sanitizes a URL for logging.
     * @param value - The URL to sanitize
     * @returns - The sanitized URL as a string
     */ sanitizeUrl(value) {
        if (typeof value !== "string" || value === null || value === "") {
            return value;
        }
        const url = new URL(value);
        if (!url.search) {
            return value;
        }
        for (const [key] of url.searchParams){
            if (!this.allowedQueryParameters.has(key.toLowerCase())) {
                url.searchParams.set(key, RedactedString);
            }
        }
        return url.toString();
    }
    sanitizeHeaders(obj) {
        const sanitized = {};
        for (const key of Object.keys(obj)){
            if (this.allowedHeaderNames.has(key.toLowerCase())) {
                sanitized[key] = obj[key];
            } else {
                sanitized[key] = RedactedString;
            }
        }
        return sanitized;
    }
    sanitizeQuery(value) {
        if (typeof value !== "object" || value === null) {
            return value;
        }
        const sanitized = {};
        for (const k of Object.keys(value)){
            if (this.allowedQueryParameters.has(k.toLowerCase())) {
                sanitized[k] = value[k];
            } else {
                sanitized[k] = RedactedString;
            }
        }
        return sanitized;
    }
}
exports.Sanitizer = Sanitizer; //# sourceMappingURL=sanitizer.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/restError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RestError = void 0;
exports.isRestError = isRestError;
const error_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/error.js [app-route] (ecmascript)");
const inspect_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/inspect.js [app-route] (ecmascript)");
const sanitizer_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/sanitizer.js [app-route] (ecmascript)");
const errorSanitizer = new sanitizer_js_1.Sanitizer();
/**
 * A custom error type for failed pipeline requests.
 */ class RestError extends Error {
    /**
     * Something went wrong when making the request.
     * This means the actual request failed for some reason,
     * such as a DNS issue or the connection being lost.
     */ static REQUEST_SEND_ERROR = "REQUEST_SEND_ERROR";
    /**
     * This means that parsing the response from the server failed.
     * It may have been malformed.
     */ static PARSE_ERROR = "PARSE_ERROR";
    /**
     * The code of the error itself (use statics on RestError if possible.)
     */ code;
    /**
     * The HTTP status code of the request (if applicable.)
     */ statusCode;
    /**
     * The request that was made.
     * This property is non-enumerable.
     */ request;
    /**
     * The response received (if any.)
     * This property is non-enumerable.
     */ response;
    /**
     * Bonus property set by the throw site.
     */ details;
    constructor(message, options = {}){
        super(message);
        this.name = "RestError";
        this.code = options.code;
        this.statusCode = options.statusCode;
        // The request and response may contain sensitive information in the headers or body.
        // To help prevent this sensitive information being accidentally logged, the request and response
        // properties are marked as non-enumerable here. This prevents them showing up in the output of
        // JSON.stringify and console.log.
        Object.defineProperty(this, "request", {
            value: options.request,
            enumerable: false
        });
        Object.defineProperty(this, "response", {
            value: options.response,
            enumerable: false
        });
        // Only include useful agent information in the request for logging, as the full agent object
        // may contain large binary data.
        const agent = this.request?.agent ? {
            maxFreeSockets: this.request.agent.maxFreeSockets,
            maxSockets: this.request.agent.maxSockets
        } : undefined;
        // Logging method for util.inspect in Node
        Object.defineProperty(this, inspect_js_1.custom, {
            value: ()=>{
                // Extract non-enumerable properties and add them back. This is OK since in this output the request and
                // response get sanitized.
                return `RestError: ${this.message} \n ${errorSanitizer.sanitize({
                    ...this,
                    request: {
                        ...this.request,
                        agent
                    },
                    response: this.response
                })}`;
            },
            enumerable: false
        });
        Object.setPrototypeOf(this, RestError.prototype);
    }
}
exports.RestError = RestError;
/**
 * Typeguard for RestError
 * @param e - Something caught by a catch clause.
 */ function isRestError(e) {
    if (e instanceof RestError) {
        return true;
    }
    return (0, error_js_1.isError)(e) && e.name === "RestError";
} //# sourceMappingURL=restError.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/bytesEncoding.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uint8ArrayToString = uint8ArrayToString;
exports.stringToUint8Array = stringToUint8Array;
/**
 * The helper that transforms bytes with specific character encoding into string
 * @param bytes - the uint8array bytes
 * @param format - the format we use to encode the byte
 * @returns a string of the encoded string
 */ function uint8ArrayToString(bytes, format) {
    return Buffer.from(bytes).toString(format);
}
/**
 * The helper that transforms string to specific character encoded bytes array.
 * @param value - the string to be converted
 * @param format - the format we use to decode the value
 * @returns a uint8array
 */ function stringToUint8Array(value, format) {
    return Buffer.from(value, format);
} //# sourceMappingURL=bytesEncoding.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/log.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logger = void 0;
const logger_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/logger/logger.js [app-route] (ecmascript)");
exports.logger = (0, logger_js_1.createClientLogger)("ts-http-runtime"); //# sourceMappingURL=log.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/nodeHttpClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBodyLength = getBodyLength;
exports.createNodeHttpClient = createNodeHttpClient;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
const node_http_1 = tslib_1.__importDefault(__turbopack_context__.r("[externals]/node:http [external] (node:http, cjs)"));
const node_https_1 = tslib_1.__importDefault(__turbopack_context__.r("[externals]/node:https [external] (node:https, cjs)"));
const node_zlib_1 = tslib_1.__importDefault(__turbopack_context__.r("[externals]/node:zlib [external] (node:zlib, cjs)"));
const node_stream_1 = __turbopack_context__.r("[externals]/node:stream [external] (node:stream, cjs)");
const AbortError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/abort-controller/AbortError.js [app-route] (ecmascript)");
const httpHeaders_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/httpHeaders.js [app-route] (ecmascript)");
const restError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/restError.js [app-route] (ecmascript)");
const log_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/log.js [app-route] (ecmascript)");
const sanitizer_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/sanitizer.js [app-route] (ecmascript)");
const DEFAULT_TLS_SETTINGS = {};
function isReadableStream(body) {
    return body && typeof body.pipe === "function";
}
function isStreamComplete(stream) {
    if (stream.readable === false) {
        return Promise.resolve();
    }
    return new Promise((resolve)=>{
        const handler = ()=>{
            resolve();
            stream.removeListener("close", handler);
            stream.removeListener("end", handler);
            stream.removeListener("error", handler);
        };
        stream.on("close", handler);
        stream.on("end", handler);
        stream.on("error", handler);
    });
}
function isArrayBuffer(body) {
    return body && typeof body.byteLength === "number";
}
class ReportTransform extends node_stream_1.Transform {
    loadedBytes = 0;
    progressCallback;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    _transform(chunk, _encoding, callback) {
        this.push(chunk);
        this.loadedBytes += chunk.length;
        try {
            this.progressCallback({
                loadedBytes: this.loadedBytes
            });
            callback();
        } catch (e) {
            callback(e);
        }
    }
    constructor(progressCallback){
        super();
        this.progressCallback = progressCallback;
    }
}
/**
 * A HttpClient implementation that uses Node's "https" module to send HTTPS requests.
 * @internal
 */ class NodeHttpClient {
    cachedHttpAgent;
    cachedHttpsAgents = new WeakMap();
    /**
     * Makes a request over an underlying transport layer and returns the response.
     * @param request - The request to be made.
     */ async sendRequest(request) {
        const abortController = new AbortController();
        let abortListener;
        if (request.abortSignal) {
            if (request.abortSignal.aborted) {
                throw new AbortError_js_1.AbortError("The operation was aborted. Request has already been canceled.");
            }
            abortListener = (event)=>{
                if (event.type === "abort") {
                    abortController.abort();
                }
            };
            request.abortSignal.addEventListener("abort", abortListener);
        }
        let timeoutId;
        if (request.timeout > 0) {
            timeoutId = setTimeout(()=>{
                const sanitizer = new sanitizer_js_1.Sanitizer();
                log_js_1.logger.info(`request to '${sanitizer.sanitizeUrl(request.url)}' timed out. canceling...`);
                abortController.abort();
            }, request.timeout);
        }
        const acceptEncoding = request.headers.get("Accept-Encoding");
        const shouldDecompress = acceptEncoding?.includes("gzip") || acceptEncoding?.includes("deflate");
        let body = typeof request.body === "function" ? request.body() : request.body;
        if (body && !request.headers.has("Content-Length")) {
            const bodyLength = getBodyLength(body);
            if (bodyLength !== null) {
                request.headers.set("Content-Length", bodyLength);
            }
        }
        let responseStream;
        try {
            if (body && request.onUploadProgress) {
                const onUploadProgress = request.onUploadProgress;
                const uploadReportStream = new ReportTransform(onUploadProgress);
                uploadReportStream.on("error", (e)=>{
                    log_js_1.logger.error("Error in upload progress", e);
                });
                if (isReadableStream(body)) {
                    body.pipe(uploadReportStream);
                } else {
                    uploadReportStream.end(body);
                }
                body = uploadReportStream;
            }
            const res = await this.makeRequest(request, abortController, body);
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }
            const headers = getResponseHeaders(res);
            const status = res.statusCode ?? 0;
            const response = {
                status,
                headers,
                request
            };
            // Responses to HEAD must not have a body.
            // If they do return a body, that body must be ignored.
            if (request.method === "HEAD") {
                // call resume() and not destroy() to avoid closing the socket
                // and losing keep alive
                res.resume();
                return response;
            }
            responseStream = shouldDecompress ? getDecodedResponseStream(res, headers) : res;
            const onDownloadProgress = request.onDownloadProgress;
            if (onDownloadProgress) {
                const downloadReportStream = new ReportTransform(onDownloadProgress);
                downloadReportStream.on("error", (e)=>{
                    log_js_1.logger.error("Error in download progress", e);
                });
                responseStream.pipe(downloadReportStream);
                responseStream = downloadReportStream;
            }
            if (// Value of POSITIVE_INFINITY in streamResponseStatusCodes is considered as any status code
            request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) || request.streamResponseStatusCodes?.has(response.status)) {
                response.readableStreamBody = responseStream;
            } else {
                response.bodyAsText = await streamToText(responseStream);
            }
            return response;
        } finally{
            // clean up event listener
            if (request.abortSignal && abortListener) {
                let uploadStreamDone = Promise.resolve();
                if (isReadableStream(body)) {
                    uploadStreamDone = isStreamComplete(body);
                }
                let downloadStreamDone = Promise.resolve();
                if (isReadableStream(responseStream)) {
                    downloadStreamDone = isStreamComplete(responseStream);
                }
                Promise.all([
                    uploadStreamDone,
                    downloadStreamDone
                ]).then(()=>{
                    // eslint-disable-next-line promise/always-return
                    if (abortListener) {
                        request.abortSignal?.removeEventListener("abort", abortListener);
                    }
                }).catch((e)=>{
                    log_js_1.logger.warning("Error when cleaning up abortListener on httpRequest", e);
                });
            }
        }
    }
    makeRequest(request, abortController, body) {
        const url = new URL(request.url);
        const isInsecure = url.protocol !== "https:";
        if (isInsecure && !request.allowInsecureConnection) {
            throw new Error(`Cannot connect to ${request.url} while allowInsecureConnection is false.`);
        }
        const agent = request.agent ?? this.getOrCreateAgent(request, isInsecure);
        const options = {
            agent,
            hostname: url.hostname,
            path: `${url.pathname}${url.search}`,
            port: url.port,
            method: request.method,
            headers: request.headers.toJSON({
                preserveCase: true
            }),
            ...request.requestOverrides
        };
        return new Promise((resolve, reject)=>{
            const req = isInsecure ? node_http_1.default.request(options, resolve) : node_https_1.default.request(options, resolve);
            req.once("error", (err)=>{
                reject(new restError_js_1.RestError(err.message, {
                    code: err.code ?? restError_js_1.RestError.REQUEST_SEND_ERROR,
                    request
                }));
            });
            abortController.signal.addEventListener("abort", ()=>{
                const abortError = new AbortError_js_1.AbortError("The operation was aborted. Rejecting from abort signal callback while making request.");
                req.destroy(abortError);
                reject(abortError);
            });
            if (body && isReadableStream(body)) {
                body.pipe(req);
            } else if (body) {
                if (typeof body === "string" || Buffer.isBuffer(body)) {
                    req.end(body);
                } else if (isArrayBuffer(body)) {
                    req.end(ArrayBuffer.isView(body) ? Buffer.from(body.buffer) : Buffer.from(body));
                } else {
                    log_js_1.logger.error("Unrecognized body type", body);
                    reject(new restError_js_1.RestError("Unrecognized body type"));
                }
            } else {
                // streams don't like "undefined" being passed as data
                req.end();
            }
        });
    }
    getOrCreateAgent(request, isInsecure) {
        const disableKeepAlive = request.disableKeepAlive;
        // Handle Insecure requests first
        if (isInsecure) {
            if (disableKeepAlive) {
                // keepAlive:false is the default so we don't need a custom Agent
                return node_http_1.default.globalAgent;
            }
            if (!this.cachedHttpAgent) {
                // If there is no cached agent create a new one and cache it.
                this.cachedHttpAgent = new node_http_1.default.Agent({
                    keepAlive: true
                });
            }
            return this.cachedHttpAgent;
        } else {
            if (disableKeepAlive && !request.tlsSettings) {
                // When there are no tlsSettings and keepAlive is false
                // we don't need a custom agent
                return node_https_1.default.globalAgent;
            }
            // We use the tlsSettings to index cached clients
            const tlsSettings = request.tlsSettings ?? DEFAULT_TLS_SETTINGS;
            // Get the cached agent or create a new one with the
            // provided values for keepAlive and tlsSettings
            let agent = this.cachedHttpsAgents.get(tlsSettings);
            if (agent && agent.options.keepAlive === !disableKeepAlive) {
                return agent;
            }
            log_js_1.logger.info("No cached TLS Agent exist, creating a new Agent");
            agent = new node_https_1.default.Agent({
                // keepAlive is true if disableKeepAlive is false.
                keepAlive: !disableKeepAlive,
                // Since we are spreading, if no tslSettings were provided, nothing is added to the agent options.
                ...tlsSettings
            });
            this.cachedHttpsAgents.set(tlsSettings, agent);
            return agent;
        }
    }
}
function getResponseHeaders(res) {
    const headers = (0, httpHeaders_js_1.createHttpHeaders)();
    for (const header of Object.keys(res.headers)){
        const value = res.headers[header];
        if (Array.isArray(value)) {
            if (value.length > 0) {
                headers.set(header, value[0]);
            }
        } else if (value) {
            headers.set(header, value);
        }
    }
    return headers;
}
function getDecodedResponseStream(stream, headers) {
    const contentEncoding = headers.get("Content-Encoding");
    if (contentEncoding === "gzip") {
        const unzip = node_zlib_1.default.createGunzip();
        stream.pipe(unzip);
        return unzip;
    } else if (contentEncoding === "deflate") {
        const inflate = node_zlib_1.default.createInflate();
        stream.pipe(inflate);
        return inflate;
    }
    return stream;
}
function streamToText(stream) {
    return new Promise((resolve, reject)=>{
        const buffer = [];
        stream.on("data", (chunk)=>{
            if (Buffer.isBuffer(chunk)) {
                buffer.push(chunk);
            } else {
                buffer.push(Buffer.from(chunk));
            }
        });
        stream.on("end", ()=>{
            resolve(Buffer.concat(buffer).toString("utf8"));
        });
        stream.on("error", (e)=>{
            if (e && e?.name === "AbortError") {
                reject(e);
            } else {
                reject(new restError_js_1.RestError(`Error reading response as text: ${e.message}`, {
                    code: restError_js_1.RestError.PARSE_ERROR
                }));
            }
        });
    });
}
/** @internal */ function getBodyLength(body) {
    if (!body) {
        return 0;
    } else if (Buffer.isBuffer(body)) {
        return body.length;
    } else if (isReadableStream(body)) {
        return null;
    } else if (isArrayBuffer(body)) {
        return body.byteLength;
    } else if (typeof body === "string") {
        return Buffer.from(body).length;
    } else {
        return null;
    }
}
/**
 * Create a new HttpClient instance for the NodeJS environment.
 * @internal
 */ function createNodeHttpClient() {
    return new NodeHttpClient();
} //# sourceMappingURL=nodeHttpClient.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/defaultHttpClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDefaultHttpClient = createDefaultHttpClient;
const nodeHttpClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/nodeHttpClient.js [app-route] (ecmascript)");
/**
 * Create the correct HttpClient for the current environment.
 */ function createDefaultHttpClient() {
    return (0, nodeHttpClient_js_1.createNodeHttpClient)();
} //# sourceMappingURL=defaultHttpClient.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/logPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logPolicyName = void 0;
exports.logPolicy = logPolicy;
const log_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/log.js [app-route] (ecmascript)");
const sanitizer_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/sanitizer.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the logPolicy.
 */ exports.logPolicyName = "logPolicy";
/**
 * A policy that logs all requests and responses.
 * @param options - Options to configure logPolicy.
 */ function logPolicy(options = {}) {
    const logger = options.logger ?? log_js_1.logger.info;
    const sanitizer = new sanitizer_js_1.Sanitizer({
        additionalAllowedHeaderNames: options.additionalAllowedHeaderNames,
        additionalAllowedQueryParameters: options.additionalAllowedQueryParameters
    });
    return {
        name: exports.logPolicyName,
        async sendRequest (request, next) {
            if (!logger.enabled) {
                return next(request);
            }
            logger(`Request: ${sanitizer.sanitize(request)}`);
            const response = await next(request);
            logger(`Response status code: ${response.status}`);
            logger(`Headers: ${sanitizer.sanitize(response.headers)}`);
            return response;
        }
    };
} //# sourceMappingURL=logPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/redirectPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.redirectPolicyName = void 0;
exports.redirectPolicy = redirectPolicy;
/**
 * The programmatic identifier of the redirectPolicy.
 */ exports.redirectPolicyName = "redirectPolicy";
/**
 * Methods that are allowed to follow redirects 301 and 302
 */ const allowedRedirect = [
    "GET",
    "HEAD"
];
/**
 * A policy to follow Location headers from the server in order
 * to support server-side redirection.
 * In the browser, this policy is not used.
 * @param options - Options to control policy behavior.
 */ function redirectPolicy(options = {}) {
    const { maxRetries = 20 } = options;
    return {
        name: exports.redirectPolicyName,
        async sendRequest (request, next) {
            const response = await next(request);
            return handleRedirect(next, response, maxRetries);
        }
    };
}
async function handleRedirect(next, response, maxRetries, currentRetries = 0) {
    const { request, status, headers } = response;
    const locationHeader = headers.get("location");
    if (locationHeader && (status === 300 || status === 301 && allowedRedirect.includes(request.method) || status === 302 && allowedRedirect.includes(request.method) || status === 303 && request.method === "POST" || status === 307) && currentRetries < maxRetries) {
        const url = new URL(locationHeader, request.url);
        request.url = url.toString();
        // POST request with Status code 303 should be converted into a
        // redirected GET request if the redirect url is present in the location header
        if (status === 303) {
            request.method = "GET";
            request.headers.delete("Content-Length");
            delete request.body;
        }
        request.headers.delete("Authorization");
        const res = await next(request);
        return handleRedirect(next, res, maxRetries, currentRetries + 1);
    }
    return response;
} //# sourceMappingURL=redirectPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/userAgentPlatform.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/constants.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_RETRY_POLICY_COUNT = exports.SDK_VERSION = void 0;
exports.SDK_VERSION = "0.3.1";
exports.DEFAULT_RETRY_POLICY_COUNT = 3; //# sourceMappingURL=constants.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/userAgent.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserAgentHeaderName = getUserAgentHeaderName;
exports.getUserAgentValue = getUserAgentValue;
const userAgentPlatform_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/userAgentPlatform.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/constants.js [app-route] (ecmascript)");
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
    runtimeInfo.set("ts-http-runtime", constants_js_1.SDK_VERSION);
    await (0, userAgentPlatform_js_1.setPlatformSpecificData)(runtimeInfo);
    const defaultAgent = getUserAgentString(runtimeInfo);
    const userAgentValue = prefix ? `${prefix} ${defaultAgent}` : defaultAgent;
    return userAgentValue;
} //# sourceMappingURL=userAgent.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/userAgentPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userAgentPolicyName = void 0;
exports.userAgentPolicy = userAgentPolicy;
const userAgent_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/userAgent.js [app-route] (ecmascript)");
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
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/decompressResponsePolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decompressResponsePolicyName = void 0;
exports.decompressResponsePolicy = decompressResponsePolicy;
/**
 * The programmatic identifier of the decompressResponsePolicy.
 */ exports.decompressResponsePolicyName = "decompressResponsePolicy";
/**
 * A policy to enable response decompression according to Accept-Encoding header
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
 */ function decompressResponsePolicy() {
    return {
        name: exports.decompressResponsePolicyName,
        async sendRequest (request, next) {
            // HEAD requests have no body
            if (request.method !== "HEAD") {
                request.headers.set("Accept-Encoding", "gzip,deflate");
            }
            return next(request);
        }
    };
} //# sourceMappingURL=decompressResponsePolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/random.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRandomIntegerInclusive = getRandomIntegerInclusive;
/**
 * Returns a random integer value between a lower and upper bound,
 * inclusive of both bounds.
 * Note that this uses Math.random and isn't secure. If you need to use
 * this for any kind of security purpose, find a better source of random.
 * @param min - The smallest integer value allowed.
 * @param max - The largest integer value allowed.
 */ function getRandomIntegerInclusive(min, max) {
    // Make sure inputs are integers.
    min = Math.ceil(min);
    max = Math.floor(max);
    // Pick a random offset from zero to the size of the range.
    // Since Math.random() can never return 1, we have to make the range one larger
    // in order to be inclusive of the maximum value after we take the floor.
    const offset = Math.floor(Math.random() * (max - min + 1));
    return offset + min;
} //# sourceMappingURL=random.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/delay.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateRetryDelay = calculateRetryDelay;
const random_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/random.js [app-route] (ecmascript)");
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
    const retryAfterInMs = clampedDelay / 2 + (0, random_js_1.getRandomIntegerInclusive)(0, clampedDelay / 2);
    return {
        retryAfterInMs
    };
} //# sourceMappingURL=delay.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/helpers.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delay = delay;
exports.parseHeaderValueAsNumber = parseHeaderValueAsNumber;
const AbortError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/abort-controller/AbortError.js [app-route] (ecmascript)");
const StandardAbortMessage = "The operation was aborted.";
/**
 * A wrapper for setTimeout that resolves a promise after delayInMs milliseconds.
 * @param delayInMs - The number of milliseconds to be delayed.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 * @param options - The options for delay - currently abort options
 *                  - abortSignal - The abortSignal associated with containing operation.
 *                  - abortErrorMsg - The abort error message associated with containing operation.
 * @returns Resolved promise
 */ function delay(delayInMs, value, options) {
    return new Promise((resolve, reject)=>{
        let timer = undefined;
        let onAborted = undefined;
        const rejectOnAbort = ()=>{
            return reject(new AbortError_js_1.AbortError(options?.abortErrorMsg ? options?.abortErrorMsg : StandardAbortMessage));
        };
        const removeListeners = ()=>{
            if (options?.abortSignal && onAborted) {
                options.abortSignal.removeEventListener("abort", onAborted);
            }
        };
        onAborted = ()=>{
            if (timer) {
                clearTimeout(timer);
            }
            removeListeners();
            return rejectOnAbort();
        };
        if (options?.abortSignal && options.abortSignal.aborted) {
            return rejectOnAbort();
        }
        timer = setTimeout(()=>{
            removeListeners();
            resolve(value);
        }, delayInMs);
        if (options?.abortSignal) {
            options.abortSignal.addEventListener("abort", onAborted);
        }
    });
}
/**
 * @internal
 * @returns the parsed value or undefined if the parsed value is invalid.
 */ function parseHeaderValueAsNumber(response, headerName) {
    const value = response.headers.get(headerName);
    if (!value) return;
    const valueAsNum = Number(value);
    if (Number.isNaN(valueAsNum)) return;
    return valueAsNum;
} //# sourceMappingURL=helpers.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/retryStrategies/throttlingRetryStrategy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isThrottlingRetryResponse = isThrottlingRetryResponse;
exports.throttlingRetryStrategy = throttlingRetryStrategy;
const helpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/helpers.js [app-route] (ecmascript)");
/**
 * The header that comes back from services representing
 * the amount of time (minimum) to wait to retry (in seconds or timestamp after which we can retry).
 */ const RetryAfterHeader = "Retry-After";
/**
 * The headers that come back from services representing
 * the amount of time (minimum) to wait to retry.
 *
 * "retry-after-ms", "x-ms-retry-after-ms" : milliseconds
 * "Retry-After" : seconds or timestamp
 */ const AllRetryAfterHeaders = [
    "retry-after-ms",
    "x-ms-retry-after-ms",
    RetryAfterHeader
];
/**
 * A response is a throttling retry response if it has a throttling status code (429 or 503),
 * as long as one of the [ "Retry-After" or "retry-after-ms" or "x-ms-retry-after-ms" ] headers has a valid value.
 *
 * Returns the `retryAfterInMs` value if the response is a throttling retry response.
 * If not throttling retry response, returns `undefined`.
 *
 * @internal
 */ function getRetryAfterInMs(response) {
    if (!(response && [
        429,
        503
    ].includes(response.status))) return undefined;
    try {
        // Headers: "retry-after-ms", "x-ms-retry-after-ms", "Retry-After"
        for (const header of AllRetryAfterHeaders){
            const retryAfterValue = (0, helpers_js_1.parseHeaderValueAsNumber)(response, header);
            if (retryAfterValue === 0 || retryAfterValue) {
                // "Retry-After" header ==> seconds
                // "retry-after-ms", "x-ms-retry-after-ms" headers ==> milli-seconds
                const multiplyingFactor = header === RetryAfterHeader ? 1000 : 1;
                return retryAfterValue * multiplyingFactor; // in milli-seconds
            }
        }
        // RetryAfterHeader ("Retry-After") has a special case where it might be formatted as a date instead of a number of seconds
        const retryAfterHeader = response.headers.get(RetryAfterHeader);
        if (!retryAfterHeader) return;
        const date = Date.parse(retryAfterHeader);
        const diff = date - Date.now();
        // negative diff would mean a date in the past, so retry asap with 0 milliseconds
        return Number.isFinite(diff) ? Math.max(0, diff) : undefined;
    } catch  {
        return undefined;
    }
}
/**
 * A response is a retry response if it has a throttling status code (429 or 503),
 * as long as one of the [ "Retry-After" or "retry-after-ms" or "x-ms-retry-after-ms" ] headers has a valid value.
 */ function isThrottlingRetryResponse(response) {
    return Number.isFinite(getRetryAfterInMs(response));
}
function throttlingRetryStrategy() {
    return {
        name: "throttlingRetryStrategy",
        retry ({ response }) {
            const retryAfterInMs = getRetryAfterInMs(response);
            if (!Number.isFinite(retryAfterInMs)) {
                return {
                    skipStrategy: true
                };
            }
            return {
                retryAfterInMs
            };
        }
    };
} //# sourceMappingURL=throttlingRetryStrategy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/retryStrategies/exponentialRetryStrategy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exponentialRetryStrategy = exponentialRetryStrategy;
exports.isExponentialRetryResponse = isExponentialRetryResponse;
exports.isSystemError = isSystemError;
const delay_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/delay.js [app-route] (ecmascript)");
const throttlingRetryStrategy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/retryStrategies/throttlingRetryStrategy.js [app-route] (ecmascript)");
// intervals are in milliseconds
const DEFAULT_CLIENT_RETRY_INTERVAL = 1000;
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 64;
/**
 * A retry strategy that retries with an exponentially increasing delay in these two cases:
 * - When there are errors in the underlying transport layer (e.g. DNS lookup failures).
 * - Or otherwise if the outgoing request fails (408, greater or equal than 500, except for 501 and 505).
 */ function exponentialRetryStrategy(options = {}) {
    const retryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
    const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
    return {
        name: "exponentialRetryStrategy",
        retry ({ retryCount, response, responseError }) {
            const matchedSystemError = isSystemError(responseError);
            const ignoreSystemErrors = matchedSystemError && options.ignoreSystemErrors;
            const isExponential = isExponentialRetryResponse(response);
            const ignoreExponentialResponse = isExponential && options.ignoreHttpStatusCodes;
            const unknownResponse = response && ((0, throttlingRetryStrategy_js_1.isThrottlingRetryResponse)(response) || !isExponential);
            if (unknownResponse || ignoreExponentialResponse || ignoreSystemErrors) {
                return {
                    skipStrategy: true
                };
            }
            if (responseError && !matchedSystemError && !isExponential) {
                return {
                    errorToThrow: responseError
                };
            }
            return (0, delay_js_1.calculateRetryDelay)(retryCount, {
                retryDelayInMs: retryInterval,
                maxRetryDelayInMs: maxRetryInterval
            });
        }
    };
}
/**
 * A response is a retry response if it has status codes:
 * - 408, or
 * - Greater or equal than 500, except for 501 and 505.
 */ function isExponentialRetryResponse(response) {
    return Boolean(response && response.status !== undefined && (response.status >= 500 || response.status === 408) && response.status !== 501 && response.status !== 505);
}
/**
 * Determines whether an error from a pipeline response was triggered in the network layer.
 */ function isSystemError(err) {
    if (!err) {
        return false;
    }
    return err.code === "ETIMEDOUT" || err.code === "ESOCKETTIMEDOUT" || err.code === "ECONNREFUSED" || err.code === "ECONNRESET" || err.code === "ENOENT" || err.code === "ENOTFOUND";
} //# sourceMappingURL=exponentialRetryStrategy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/retryPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.retryPolicy = retryPolicy;
const helpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/helpers.js [app-route] (ecmascript)");
const AbortError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/abort-controller/AbortError.js [app-route] (ecmascript)");
const logger_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/logger/logger.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/constants.js [app-route] (ecmascript)");
const retryPolicyLogger = (0, logger_js_1.createClientLogger)("ts-http-runtime retryPolicy");
/**
 * The programmatic identifier of the retryPolicy.
 */ const retryPolicyName = "retryPolicy";
/**
 * retryPolicy is a generic policy to enable retrying requests when certain conditions are met
 */ function retryPolicy(strategies, options = {
    maxRetries: constants_js_1.DEFAULT_RETRY_POLICY_COUNT
}) {
    const logger = options.logger || retryPolicyLogger;
    return {
        name: retryPolicyName,
        async sendRequest (request, next) {
            let response;
            let responseError;
            let retryCount = -1;
            retryRequest: while(true){
                retryCount += 1;
                response = undefined;
                responseError = undefined;
                try {
                    logger.info(`Retry ${retryCount}: Attempting to send request`, request.requestId);
                    response = await next(request);
                    logger.info(`Retry ${retryCount}: Received a response from request`, request.requestId);
                } catch (e) {
                    logger.error(`Retry ${retryCount}: Received an error from request`, request.requestId);
                    // RestErrors are valid targets for the retry strategies.
                    // If none of the retry strategies can work with them, they will be thrown later in this policy.
                    // If the received error is not a RestError, it is immediately thrown.
                    responseError = e;
                    if (!e || responseError.name !== "RestError") {
                        throw e;
                    }
                    response = responseError.response;
                }
                if (request.abortSignal?.aborted) {
                    logger.error(`Retry ${retryCount}: Request aborted.`);
                    const abortError = new AbortError_js_1.AbortError();
                    throw abortError;
                }
                if (retryCount >= (options.maxRetries ?? constants_js_1.DEFAULT_RETRY_POLICY_COUNT)) {
                    logger.info(`Retry ${retryCount}: Maximum retries reached. Returning the last received response, or throwing the last received error.`);
                    if (responseError) {
                        throw responseError;
                    } else if (response) {
                        return response;
                    } else {
                        throw new Error("Maximum retries reached with no response or error to throw");
                    }
                }
                logger.info(`Retry ${retryCount}: Processing ${strategies.length} retry strategies.`);
                strategiesLoop: for (const strategy of strategies){
                    const strategyLogger = strategy.logger || logger;
                    strategyLogger.info(`Retry ${retryCount}: Processing retry strategy ${strategy.name}.`);
                    const modifiers = strategy.retry({
                        retryCount,
                        response,
                        responseError
                    });
                    if (modifiers.skipStrategy) {
                        strategyLogger.info(`Retry ${retryCount}: Skipped.`);
                        continue strategiesLoop;
                    }
                    const { errorToThrow, retryAfterInMs, redirectTo } = modifiers;
                    if (errorToThrow) {
                        strategyLogger.error(`Retry ${retryCount}: Retry strategy ${strategy.name} throws error:`, errorToThrow);
                        throw errorToThrow;
                    }
                    if (retryAfterInMs || retryAfterInMs === 0) {
                        strategyLogger.info(`Retry ${retryCount}: Retry strategy ${strategy.name} retries after ${retryAfterInMs}`);
                        await (0, helpers_js_1.delay)(retryAfterInMs, undefined, {
                            abortSignal: request.abortSignal
                        });
                        continue retryRequest;
                    }
                    if (redirectTo) {
                        strategyLogger.info(`Retry ${retryCount}: Retry strategy ${strategy.name} redirects to ${redirectTo}`);
                        request.url = redirectTo;
                        continue retryRequest;
                    }
                }
                if (responseError) {
                    logger.info(`None of the retry strategies could work with the received error. Throwing it.`);
                    throw responseError;
                }
                if (response) {
                    logger.info(`None of the retry strategies could work with the received response. Returning it.`);
                    return response;
                }
            // If all the retries skip and there's no response,
            // we're still in the retry loop, so a new request will be sent
            // until `maxRetries` is reached.
            }
        }
    };
} //# sourceMappingURL=retryPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/defaultRetryPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultRetryPolicyName = void 0;
exports.defaultRetryPolicy = defaultRetryPolicy;
const exponentialRetryStrategy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/retryStrategies/exponentialRetryStrategy.js [app-route] (ecmascript)");
const throttlingRetryStrategy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/retryStrategies/throttlingRetryStrategy.js [app-route] (ecmascript)");
const retryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/retryPolicy.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/constants.js [app-route] (ecmascript)");
/**
 * Name of the {@link defaultRetryPolicy}
 */ exports.defaultRetryPolicyName = "defaultRetryPolicy";
/**
 * A policy that retries according to three strategies:
 * - When the server sends a 429 response with a Retry-After header.
 * - When there are errors in the underlying transport layer (e.g. DNS lookup failures).
 * - Or otherwise if the outgoing request fails, it will retry with an exponentially increasing delay.
 */ function defaultRetryPolicy(options = {}) {
    return {
        name: exports.defaultRetryPolicyName,
        sendRequest: (0, retryPolicy_js_1.retryPolicy)([
            (0, throttlingRetryStrategy_js_1.throttlingRetryStrategy)(),
            (0, exponentialRetryStrategy_js_1.exponentialRetryStrategy)(options)
        ], {
            maxRetries: options.maxRetries ?? constants_js_1.DEFAULT_RETRY_POLICY_COUNT
        }).sendRequest
    };
} //# sourceMappingURL=defaultRetryPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/checkEnvironment.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isReactNative = exports.isNodeRuntime = exports.isNodeLike = exports.isBun = exports.isDeno = exports.isWebWorker = exports.isBrowser = void 0;
/**
 * A constant that indicates whether the environment the code is running is a Web Browser.
 */ // eslint-disable-next-line @azure/azure-sdk/ts-no-window
exports.isBrowser = "undefined" !== "undefined" && typeof window.document !== "undefined";
/**
 * A constant that indicates whether the environment the code is running is a Web Worker.
 */ exports.isWebWorker = typeof self === "object" && typeof self?.importScripts === "function" && (self.constructor?.name === "DedicatedWorkerGlobalScope" || self.constructor?.name === "ServiceWorkerGlobalScope" || self.constructor?.name === "SharedWorkerGlobalScope");
/**
 * A constant that indicates whether the environment the code is running is Deno.
 */ exports.isDeno = typeof Deno !== "undefined" && typeof Deno.version !== "undefined" && typeof Deno.version.deno !== "undefined";
/**
 * A constant that indicates whether the environment the code is running is Bun.sh.
 */ exports.isBun = typeof Bun !== "undefined" && typeof Bun.version !== "undefined";
/**
 * A constant that indicates whether the environment the code is running is a Node.js compatible environment.
 */ exports.isNodeLike = typeof globalThis.process !== "undefined" && Boolean(globalThis.process.version) && Boolean(globalThis.process.versions?.node);
/**
 * A constant that indicates whether the environment the code is running is Node.JS.
 */ exports.isNodeRuntime = exports.isNodeLike && !exports.isBun && !exports.isDeno;
/**
 * A constant that indicates whether the environment the code is running is in React-Native.
 */ // https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Core/setUpNavigator.js
exports.isReactNative = typeof navigator !== "undefined" && navigator?.product === "ReactNative"; //# sourceMappingURL=checkEnvironment.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/formDataPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formDataPolicyName = void 0;
exports.formDataPolicy = formDataPolicy;
const bytesEncoding_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/bytesEncoding.js [app-route] (ecmascript)");
const checkEnvironment_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/checkEnvironment.js [app-route] (ecmascript)");
const httpHeaders_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/httpHeaders.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the formDataPolicy.
 */ exports.formDataPolicyName = "formDataPolicy";
function formDataToFormDataMap(formData) {
    const formDataMap = {};
    for (const [key, value] of formData.entries()){
        formDataMap[key] ??= [];
        formDataMap[key].push(value);
    }
    return formDataMap;
}
/**
 * A policy that encodes FormData on the request into the body.
 */ function formDataPolicy() {
    return {
        name: exports.formDataPolicyName,
        async sendRequest (request, next) {
            if (checkEnvironment_js_1.isNodeLike && typeof FormData !== "undefined" && request.body instanceof FormData) {
                request.formData = formDataToFormDataMap(request.body);
                request.body = undefined;
            }
            if (request.formData) {
                const contentType = request.headers.get("Content-Type");
                if (contentType && contentType.indexOf("application/x-www-form-urlencoded") !== -1) {
                    request.body = wwwFormUrlEncode(request.formData);
                } else {
                    await prepareFormData(request.formData, request);
                }
                request.formData = undefined;
            }
            return next(request);
        }
    };
}
function wwwFormUrlEncode(formData) {
    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)){
        if (Array.isArray(value)) {
            for (const subValue of value){
                urlSearchParams.append(key, subValue.toString());
            }
        } else {
            urlSearchParams.append(key, value.toString());
        }
    }
    return urlSearchParams.toString();
}
async function prepareFormData(formData, request) {
    // validate content type (multipart/form-data)
    const contentType = request.headers.get("Content-Type");
    if (contentType && !contentType.startsWith("multipart/form-data")) {
        // content type is specified and is not multipart/form-data. Exit.
        return;
    }
    request.headers.set("Content-Type", contentType ?? "multipart/form-data");
    // set body to MultipartRequestBody using content from FormDataMap
    const parts = [];
    for (const [fieldName, values] of Object.entries(formData)){
        for (const value of Array.isArray(values) ? values : [
            values
        ]){
            if (typeof value === "string") {
                parts.push({
                    headers: (0, httpHeaders_js_1.createHttpHeaders)({
                        "Content-Disposition": `form-data; name="${fieldName}"`
                    }),
                    body: (0, bytesEncoding_js_1.stringToUint8Array)(value, "utf-8")
                });
            } else if (value === undefined || value === null || typeof value !== "object") {
                throw new Error(`Unexpected value for key ${fieldName}: ${value}. Value should be serialized to string first.`);
            } else {
                // using || instead of ?? here since if value.name is empty we should create a file name
                const fileName = value.name || "blob";
                const headers = (0, httpHeaders_js_1.createHttpHeaders)();
                headers.set("Content-Disposition", `form-data; name="${fieldName}"; filename="${fileName}"`);
                // again, || is used since an empty value.type means the content type is unset
                headers.set("Content-Type", value.type || "application/octet-stream");
                parts.push({
                    headers,
                    body: value
                });
            }
        }
    }
    request.multipartBody = {
        parts
    };
} //# sourceMappingURL=formDataPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/proxyPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.globalNoProxyList = exports.proxyPolicyName = void 0;
exports.loadNoProxy = loadNoProxy;
exports.getDefaultProxySettings = getDefaultProxySettings;
exports.proxyPolicy = proxyPolicy;
const https_proxy_agent_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/https-proxy-agent/dist/index.js [app-route] (ecmascript)");
const http_proxy_agent_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/http-proxy-agent/dist/index.js [app-route] (ecmascript)");
const log_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/log.js [app-route] (ecmascript)");
const HTTPS_PROXY = "HTTPS_PROXY";
const HTTP_PROXY = "HTTP_PROXY";
const ALL_PROXY = "ALL_PROXY";
const NO_PROXY = "NO_PROXY";
/**
 * The programmatic identifier of the proxyPolicy.
 */ exports.proxyPolicyName = "proxyPolicy";
/**
 * Stores the patterns specified in NO_PROXY environment variable.
 * @internal
 */ exports.globalNoProxyList = [];
let noProxyListLoaded = false;
/** A cache of whether a host should bypass the proxy. */ const globalBypassedMap = new Map();
function getEnvironmentValue(name) {
    if (process.env[name]) {
        return process.env[name];
    } else if (process.env[name.toLowerCase()]) {
        return process.env[name.toLowerCase()];
    }
    return undefined;
}
function loadEnvironmentProxyValue() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const httpsProxy = getEnvironmentValue(HTTPS_PROXY);
    const allProxy = getEnvironmentValue(ALL_PROXY);
    const httpProxy = getEnvironmentValue(HTTP_PROXY);
    return httpsProxy || allProxy || httpProxy;
}
/**
 * Check whether the host of a given `uri` matches any pattern in the no proxy list.
 * If there's a match, any request sent to the same host shouldn't have the proxy settings set.
 * This implementation is a port of https://github.com/Azure/azure-sdk-for-net/blob/8cca811371159e527159c7eb65602477898683e2/sdk/core/Azure.Core/src/Pipeline/Internal/HttpEnvironmentProxy.cs#L210
 */ function isBypassed(uri, noProxyList, bypassedMap) {
    if (noProxyList.length === 0) {
        return false;
    }
    const host = new URL(uri).hostname;
    if (bypassedMap?.has(host)) {
        return bypassedMap.get(host);
    }
    let isBypassedFlag = false;
    for (const pattern of noProxyList){
        if (pattern[0] === ".") {
            // This should match either domain it self or any subdomain or host
            // .foo.com will match foo.com it self or *.foo.com
            if (host.endsWith(pattern)) {
                isBypassedFlag = true;
            } else {
                if (host.length === pattern.length - 1 && host === pattern.slice(1)) {
                    isBypassedFlag = true;
                }
            }
        } else {
            if (host === pattern) {
                isBypassedFlag = true;
            }
        }
    }
    bypassedMap?.set(host, isBypassedFlag);
    return isBypassedFlag;
}
function loadNoProxy() {
    const noProxy = getEnvironmentValue(NO_PROXY);
    noProxyListLoaded = true;
    if (noProxy) {
        return noProxy.split(",").map((item)=>item.trim()).filter((item)=>item.length);
    }
    return [];
}
/**
 * This method converts a proxy url into `ProxySettings` for use with ProxyPolicy.
 * If no argument is given, it attempts to parse a proxy URL from the environment
 * variables `HTTPS_PROXY` or `HTTP_PROXY`.
 * @param proxyUrl - The url of the proxy to use. May contain authentication information.
 * @deprecated - Internally this method is no longer necessary when setting proxy information.
 */ function getDefaultProxySettings(proxyUrl) {
    if (!proxyUrl) {
        proxyUrl = loadEnvironmentProxyValue();
        if (!proxyUrl) {
            return undefined;
        }
    }
    const parsedUrl = new URL(proxyUrl);
    const schema = parsedUrl.protocol ? parsedUrl.protocol + "//" : "";
    return {
        host: schema + parsedUrl.hostname,
        port: Number.parseInt(parsedUrl.port || "80"),
        username: parsedUrl.username,
        password: parsedUrl.password
    };
}
/**
 * This method attempts to parse a proxy URL from the environment
 * variables `HTTPS_PROXY` or `HTTP_PROXY`.
 */ function getDefaultProxySettingsInternal() {
    const envProxy = loadEnvironmentProxyValue();
    return envProxy ? new URL(envProxy) : undefined;
}
function getUrlFromProxySettings(settings) {
    let parsedProxyUrl;
    try {
        parsedProxyUrl = new URL(settings.host);
    } catch  {
        throw new Error(`Expecting a valid host string in proxy settings, but found "${settings.host}".`);
    }
    parsedProxyUrl.port = String(settings.port);
    if (settings.username) {
        parsedProxyUrl.username = settings.username;
    }
    if (settings.password) {
        parsedProxyUrl.password = settings.password;
    }
    return parsedProxyUrl;
}
function setProxyAgentOnRequest(request, cachedAgents, proxyUrl) {
    // Custom Agent should take precedence so if one is present
    // we should skip to avoid overwriting it.
    if (request.agent) {
        return;
    }
    const url = new URL(request.url);
    const isInsecure = url.protocol !== "https:";
    if (request.tlsSettings) {
        log_js_1.logger.warning("TLS settings are not supported in combination with custom Proxy, certificates provided to the client will be ignored.");
    }
    const headers = request.headers.toJSON();
    if (isInsecure) {
        if (!cachedAgents.httpProxyAgent) {
            cachedAgents.httpProxyAgent = new http_proxy_agent_1.HttpProxyAgent(proxyUrl, {
                headers
            });
        }
        request.agent = cachedAgents.httpProxyAgent;
    } else {
        if (!cachedAgents.httpsProxyAgent) {
            cachedAgents.httpsProxyAgent = new https_proxy_agent_1.HttpsProxyAgent(proxyUrl, {
                headers
            });
        }
        request.agent = cachedAgents.httpsProxyAgent;
    }
}
/**
 * A policy that allows one to apply proxy settings to all requests.
 * If not passed static settings, they will be retrieved from the HTTPS_PROXY
 * or HTTP_PROXY environment variables.
 * @param proxySettings - ProxySettings to use on each request.
 * @param options - additional settings, for example, custom NO_PROXY patterns
 */ function proxyPolicy(proxySettings, options) {
    if (!noProxyListLoaded) {
        exports.globalNoProxyList.push(...loadNoProxy());
    }
    const defaultProxy = proxySettings ? getUrlFromProxySettings(proxySettings) : getDefaultProxySettingsInternal();
    const cachedAgents = {};
    return {
        name: exports.proxyPolicyName,
        async sendRequest (request, next) {
            if (!request.proxySettings && defaultProxy && !isBypassed(request.url, options?.customNoProxyList ?? exports.globalNoProxyList, options?.customNoProxyList ? undefined : globalBypassedMap)) {
                setProxyAgentOnRequest(request, cachedAgents, defaultProxy);
            } else if (request.proxySettings) {
                setProxyAgentOnRequest(request, cachedAgents, getUrlFromProxySettings(request.proxySettings));
            }
            return next(request);
        }
    };
} //# sourceMappingURL=proxyPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/agentPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.agentPolicyName = void 0;
exports.agentPolicy = agentPolicy;
/**
 * Name of the Agent Policy
 */ exports.agentPolicyName = "agentPolicy";
/**
 * Gets a pipeline policy that sets http.agent
 */ function agentPolicy(agent) {
    return {
        name: exports.agentPolicyName,
        sendRequest: async (req, next)=>{
            // Users may define an agent on the request, honor it over the client level one
            if (!req.agent) {
                req.agent = agent;
            }
            return next(req);
        }
    };
} //# sourceMappingURL=agentPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/tlsPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tlsPolicyName = void 0;
exports.tlsPolicy = tlsPolicy;
/**
 * Name of the TLS Policy
 */ exports.tlsPolicyName = "tlsPolicy";
/**
 * Gets a pipeline policy that adds the client certificate to the HttpClient agent for authentication.
 */ function tlsPolicy(tlsSettings) {
    return {
        name: exports.tlsPolicyName,
        sendRequest: async (req, next)=>{
            // Users may define a request tlsSettings, honor those over the client level one
            if (!req.tlsSettings) {
                req.tlsSettings = tlsSettings;
            }
            return next(req);
        }
    };
} //# sourceMappingURL=tlsPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/typeGuards.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNodeReadableStream = isNodeReadableStream;
exports.isWebReadableStream = isWebReadableStream;
exports.isBinaryBody = isBinaryBody;
exports.isReadableStream = isReadableStream;
exports.isBlob = isBlob;
function isNodeReadableStream(x) {
    return Boolean(x && typeof x["pipe"] === "function");
}
function isWebReadableStream(x) {
    return Boolean(x && typeof x.getReader === "function" && typeof x.tee === "function");
}
function isBinaryBody(body) {
    return body !== undefined && (body instanceof Uint8Array || isReadableStream(body) || typeof body === "function" || body instanceof Blob);
}
function isReadableStream(x) {
    return isNodeReadableStream(x) || isWebReadableStream(x);
}
function isBlob(x) {
    return typeof x.stream === "function";
} //# sourceMappingURL=typeGuards.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/concat.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.concat = concat;
const stream_1 = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
const typeGuards_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/typeGuards.js [app-route] (ecmascript)");
async function* streamAsyncIterator() {
    const reader = this.getReader();
    try {
        while(true){
            const { done, value } = await reader.read();
            if (done) {
                return;
            }
            yield value;
        }
    } finally{
        reader.releaseLock();
    }
}
function makeAsyncIterable(webStream) {
    if (!webStream[Symbol.asyncIterator]) {
        webStream[Symbol.asyncIterator] = streamAsyncIterator.bind(webStream);
    }
    if (!webStream.values) {
        webStream.values = streamAsyncIterator.bind(webStream);
    }
}
function ensureNodeStream(stream) {
    if (stream instanceof ReadableStream) {
        makeAsyncIterable(stream);
        return stream_1.Readable.fromWeb(stream);
    } else {
        return stream;
    }
}
function toStream(source) {
    if (source instanceof Uint8Array) {
        return stream_1.Readable.from(Buffer.from(source));
    } else if ((0, typeGuards_js_1.isBlob)(source)) {
        return ensureNodeStream(source.stream());
    } else {
        return ensureNodeStream(source);
    }
}
/**
 * Utility function that concatenates a set of binary inputs into one combined output.
 *
 * @param sources - array of sources for the concatenation
 * @returns - in Node, a (() =\> NodeJS.ReadableStream) which, when read, produces a concatenation of all the inputs.
 *           In browser, returns a `Blob` representing all the concatenated inputs.
 *
 * @internal
 */ async function concat(sources) {
    return function() {
        const streams = sources.map((x)=>typeof x === "function" ? x() : x).map(toStream);
        return stream_1.Readable.from(async function*() {
            for (const stream of streams){
                for await (const chunk of stream){
                    yield chunk;
                }
            }
        }());
    };
} //# sourceMappingURL=concat.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/multipartPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.multipartPolicyName = void 0;
exports.multipartPolicy = multipartPolicy;
const bytesEncoding_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/bytesEncoding.js [app-route] (ecmascript)");
const typeGuards_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/typeGuards.js [app-route] (ecmascript)");
const uuidUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/uuidUtils.js [app-route] (ecmascript)");
const concat_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/concat.js [app-route] (ecmascript)");
function generateBoundary() {
    return `----AzSDKFormBoundary${(0, uuidUtils_js_1.randomUUID)()}`;
}
function encodeHeaders(headers) {
    let result = "";
    for (const [key, value] of headers){
        result += `${key}: ${value}\r\n`;
    }
    return result;
}
function getLength(source) {
    if (source instanceof Uint8Array) {
        return source.byteLength;
    } else if ((0, typeGuards_js_1.isBlob)(source)) {
        // if was created using createFile then -1 means we have an unknown size
        return source.size === -1 ? undefined : source.size;
    } else {
        return undefined;
    }
}
function getTotalLength(sources) {
    let total = 0;
    for (const source of sources){
        const partLength = getLength(source);
        if (partLength === undefined) {
            return undefined;
        } else {
            total += partLength;
        }
    }
    return total;
}
async function buildRequestBody(request, parts, boundary) {
    const sources = [
        (0, bytesEncoding_js_1.stringToUint8Array)(`--${boundary}`, "utf-8"),
        ...parts.flatMap((part)=>[
                (0, bytesEncoding_js_1.stringToUint8Array)("\r\n", "utf-8"),
                (0, bytesEncoding_js_1.stringToUint8Array)(encodeHeaders(part.headers), "utf-8"),
                (0, bytesEncoding_js_1.stringToUint8Array)("\r\n", "utf-8"),
                part.body,
                (0, bytesEncoding_js_1.stringToUint8Array)(`\r\n--${boundary}`, "utf-8")
            ]),
        (0, bytesEncoding_js_1.stringToUint8Array)("--\r\n\r\n", "utf-8")
    ];
    const contentLength = getTotalLength(sources);
    if (contentLength) {
        request.headers.set("Content-Length", contentLength);
    }
    request.body = await (0, concat_js_1.concat)(sources);
}
/**
 * Name of multipart policy
 */ exports.multipartPolicyName = "multipartPolicy";
const maxBoundaryLength = 70;
const validBoundaryCharacters = new Set(`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'()+,-./:=?`);
function assertValidBoundary(boundary) {
    if (boundary.length > maxBoundaryLength) {
        throw new Error(`Multipart boundary "${boundary}" exceeds maximum length of 70 characters`);
    }
    if (Array.from(boundary).some((x)=>!validBoundaryCharacters.has(x))) {
        throw new Error(`Multipart boundary "${boundary}" contains invalid characters`);
    }
}
/**
 * Pipeline policy for multipart requests
 */ function multipartPolicy() {
    return {
        name: exports.multipartPolicyName,
        async sendRequest (request, next) {
            if (!request.multipartBody) {
                return next(request);
            }
            if (request.body) {
                throw new Error("multipartBody and regular body cannot be set at the same time");
            }
            let boundary = request.multipartBody.boundary;
            const contentTypeHeader = request.headers.get("Content-Type") ?? "multipart/mixed";
            const parsedHeader = contentTypeHeader.match(/^(multipart\/[^ ;]+)(?:; *boundary=(.+))?$/);
            if (!parsedHeader) {
                throw new Error(`Got multipart request body, but content-type header was not multipart: ${contentTypeHeader}`);
            }
            const [, contentType, parsedBoundary] = parsedHeader;
            if (parsedBoundary && boundary && parsedBoundary !== boundary) {
                throw new Error(`Multipart boundary was specified as ${parsedBoundary} in the header, but got ${boundary} in the request body`);
            }
            boundary ??= parsedBoundary;
            if (boundary) {
                assertValidBoundary(boundary);
            } else {
                boundary = generateBoundary();
            }
            request.headers.set("Content-Type", `${contentType}; boundary=${boundary}`);
            await buildRequestBody(request, request.multipartBody.parts, boundary);
            request.multipartBody = undefined;
            return next(request);
        }
    };
} //# sourceMappingURL=multipartPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/createPipelineFromOptions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPipelineFromOptions = createPipelineFromOptions;
const logPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/logPolicy.js [app-route] (ecmascript)");
const pipeline_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/pipeline.js [app-route] (ecmascript)");
const redirectPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/redirectPolicy.js [app-route] (ecmascript)");
const userAgentPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/userAgentPolicy.js [app-route] (ecmascript)");
const decompressResponsePolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/decompressResponsePolicy.js [app-route] (ecmascript)");
const defaultRetryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/defaultRetryPolicy.js [app-route] (ecmascript)");
const formDataPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/formDataPolicy.js [app-route] (ecmascript)");
const checkEnvironment_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/checkEnvironment.js [app-route] (ecmascript)");
const proxyPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/proxyPolicy.js [app-route] (ecmascript)");
const agentPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/agentPolicy.js [app-route] (ecmascript)");
const tlsPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/tlsPolicy.js [app-route] (ecmascript)");
const multipartPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/multipartPolicy.js [app-route] (ecmascript)");
/**
 * Create a new pipeline with a default set of customizable policies.
 * @param options - Options to configure a custom pipeline.
 */ function createPipelineFromOptions(options) {
    const pipeline = (0, pipeline_js_1.createEmptyPipeline)();
    if (checkEnvironment_js_1.isNodeLike) {
        if (options.agent) {
            pipeline.addPolicy((0, agentPolicy_js_1.agentPolicy)(options.agent));
        }
        if (options.tlsOptions) {
            pipeline.addPolicy((0, tlsPolicy_js_1.tlsPolicy)(options.tlsOptions));
        }
        pipeline.addPolicy((0, proxyPolicy_js_1.proxyPolicy)(options.proxyOptions));
        pipeline.addPolicy((0, decompressResponsePolicy_js_1.decompressResponsePolicy)());
    }
    pipeline.addPolicy((0, formDataPolicy_js_1.formDataPolicy)(), {
        beforePolicies: [
            multipartPolicy_js_1.multipartPolicyName
        ]
    });
    pipeline.addPolicy((0, userAgentPolicy_js_1.userAgentPolicy)(options.userAgentOptions));
    // The multipart policy is added after policies with no phase, so that
    // policies can be added between it and formDataPolicy to modify
    // properties (e.g., making the boundary constant in recorded tests).
    pipeline.addPolicy((0, multipartPolicy_js_1.multipartPolicy)(), {
        afterPhase: "Deserialize"
    });
    pipeline.addPolicy((0, defaultRetryPolicy_js_1.defaultRetryPolicy)(options.retryOptions), {
        phase: "Retry"
    });
    if (checkEnvironment_js_1.isNodeLike) {
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
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/apiVersionPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.apiVersionPolicyName = void 0;
exports.apiVersionPolicy = apiVersionPolicy;
exports.apiVersionPolicyName = "ApiVersionPolicy";
/**
 * Creates a policy that sets the apiVersion as a query parameter on every request
 * @param options - Client options
 * @returns Pipeline policy that sets the apiVersion as a query parameter on every request
 */ function apiVersionPolicy(options) {
    return {
        name: exports.apiVersionPolicyName,
        sendRequest: (req, next)=>{
            // Use the apiVesion defined in request url directly
            // Append one if there is no apiVesion and we have one at client options
            const url = new URL(req.url);
            if (!url.searchParams.get("api-version") && options.apiVersion) {
                req.url = `${req.url}${Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"}api-version=${options.apiVersion}`;
            }
            return next(req);
        }
    };
} //# sourceMappingURL=apiVersionPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/auth/credentials.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isOAuth2TokenCredential = isOAuth2TokenCredential;
exports.isBearerTokenCredential = isBearerTokenCredential;
exports.isBasicCredential = isBasicCredential;
exports.isApiKeyCredential = isApiKeyCredential;
/**
 * Type guard to check if a credential is an OAuth2 token credential.
 */ function isOAuth2TokenCredential(credential) {
    return "getOAuth2Token" in credential;
}
/**
 * Type guard to check if a credential is a Bearer token credential.
 */ function isBearerTokenCredential(credential) {
    return "getBearerToken" in credential;
}
/**
 * Type guard to check if a credential is a Basic auth credential.
 */ function isBasicCredential(credential) {
    return "username" in credential && "password" in credential;
}
/**
 * Type guard to check if a credential is an API key credential.
 */ function isApiKeyCredential(credential) {
    return "key" in credential;
} //# sourceMappingURL=credentials.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/checkInsecureConnection.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureSecureConnection = ensureSecureConnection;
const log_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/log.js [app-route] (ecmascript)");
// Ensure the warining is only emitted once
let insecureConnectionWarningEmmitted = false;
/**
 * Checks if the request is allowed to be sent over an insecure connection.
 *
 * A request is allowed to be sent over an insecure connection when:
 * - The `allowInsecureConnection` option is set to `true`.
 * - The request has the `allowInsecureConnection` property set to `true`.
 * - The request is being sent to `localhost` or `127.0.0.1`
 */ function allowInsecureConnection(request, options) {
    if (options.allowInsecureConnection && request.allowInsecureConnection) {
        const url = new URL(request.url);
        if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
            return true;
        }
    }
    return false;
}
/**
 * Logs a warning about sending a token over an insecure connection.
 *
 * This function will emit a node warning once, but log the warning every time.
 */ function emitInsecureConnectionWarning() {
    const warning = "Sending token over insecure transport. Assume any token issued is compromised.";
    log_js_1.logger.warning(warning);
    if (typeof process?.emitWarning === "function" && !insecureConnectionWarningEmmitted) {
        insecureConnectionWarningEmmitted = true;
        process.emitWarning(warning);
    }
}
/**
 * Ensures that authentication is only allowed over HTTPS unless explicitly allowed.
 * Throws an error if the connection is not secure and not explicitly allowed.
 */ function ensureSecureConnection(request, options) {
    if (!request.url.toLowerCase().startsWith("https://")) {
        if (allowInsecureConnection(request, options)) {
            emitInsecureConnectionWarning();
        } else {
            throw new Error("Authentication is not permitted for non-TLS protected (non-https) URLs when allowInsecureConnection is false.");
        }
    }
} //# sourceMappingURL=checkInsecureConnection.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/apiKeyAuthenticationPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.apiKeyAuthenticationPolicyName = void 0;
exports.apiKeyAuthenticationPolicy = apiKeyAuthenticationPolicy;
const checkInsecureConnection_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/checkInsecureConnection.js [app-route] (ecmascript)");
/**
 * Name of the API Key Authentication Policy
 */ exports.apiKeyAuthenticationPolicyName = "apiKeyAuthenticationPolicy";
/**
 * Gets a pipeline policy that adds API key authentication to requests
 */ function apiKeyAuthenticationPolicy(options) {
    return {
        name: exports.apiKeyAuthenticationPolicyName,
        async sendRequest (request, next) {
            // Ensure allowInsecureConnection is explicitly set when sending request to non-https URLs
            (0, checkInsecureConnection_js_1.ensureSecureConnection)(request, options);
            const scheme = (request.authSchemes ?? options.authSchemes)?.find((x)=>x.kind === "apiKey");
            // Skip adding authentication header if no API key authentication scheme is found
            if (!scheme) {
                return next(request);
            }
            if (scheme.apiKeyLocation !== "header") {
                throw new Error(`Unsupported API key location: ${scheme.apiKeyLocation}`);
            }
            request.headers.set(scheme.name, options.credential.key);
            return next(request);
        }
    };
} //# sourceMappingURL=apiKeyAuthenticationPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/basicAuthenticationPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.basicAuthenticationPolicyName = void 0;
exports.basicAuthenticationPolicy = basicAuthenticationPolicy;
const bytesEncoding_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/bytesEncoding.js [app-route] (ecmascript)");
const checkInsecureConnection_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/checkInsecureConnection.js [app-route] (ecmascript)");
/**
 * Name of the Basic Authentication Policy
 */ exports.basicAuthenticationPolicyName = "bearerAuthenticationPolicy";
/**
 * Gets a pipeline policy that adds basic authentication to requests
 */ function basicAuthenticationPolicy(options) {
    return {
        name: exports.basicAuthenticationPolicyName,
        async sendRequest (request, next) {
            // Ensure allowInsecureConnection is explicitly set when sending request to non-https URLs
            (0, checkInsecureConnection_js_1.ensureSecureConnection)(request, options);
            const scheme = (request.authSchemes ?? options.authSchemes)?.find((x)=>x.kind === "http" && x.scheme === "basic");
            // Skip adding authentication header if no basic authentication scheme is found
            if (!scheme) {
                return next(request);
            }
            const { username, password } = options.credential;
            const headerValue = (0, bytesEncoding_js_1.uint8ArrayToString)((0, bytesEncoding_js_1.stringToUint8Array)(`${username}:${password}`, "utf-8"), "base64");
            request.headers.set("Authorization", `Basic ${headerValue}`);
            return next(request);
        }
    };
} //# sourceMappingURL=basicAuthenticationPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/bearerAuthenticationPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bearerAuthenticationPolicyName = void 0;
exports.bearerAuthenticationPolicy = bearerAuthenticationPolicy;
const checkInsecureConnection_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/checkInsecureConnection.js [app-route] (ecmascript)");
/**
 * Name of the Bearer Authentication Policy
 */ exports.bearerAuthenticationPolicyName = "bearerAuthenticationPolicy";
/**
 * Gets a pipeline policy that adds bearer token authentication to requests
 */ function bearerAuthenticationPolicy(options) {
    return {
        name: exports.bearerAuthenticationPolicyName,
        async sendRequest (request, next) {
            // Ensure allowInsecureConnection is explicitly set when sending request to non-https URLs
            (0, checkInsecureConnection_js_1.ensureSecureConnection)(request, options);
            const scheme = (request.authSchemes ?? options.authSchemes)?.find((x)=>x.kind === "http" && x.scheme === "bearer");
            // Skip adding authentication header if no bearer authentication scheme is found
            if (!scheme) {
                return next(request);
            }
            const token = await options.credential.getBearerToken({
                abortSignal: request.abortSignal
            });
            request.headers.set("Authorization", `Bearer ${token}`);
            return next(request);
        }
    };
} //# sourceMappingURL=bearerAuthenticationPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/oauth2AuthenticationPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.oauth2AuthenticationPolicyName = void 0;
exports.oauth2AuthenticationPolicy = oauth2AuthenticationPolicy;
const checkInsecureConnection_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/checkInsecureConnection.js [app-route] (ecmascript)");
/**
 * Name of the OAuth2 Authentication Policy
 */ exports.oauth2AuthenticationPolicyName = "oauth2AuthenticationPolicy";
/**
 * Gets a pipeline policy that adds authorization header from OAuth2 schemes
 */ function oauth2AuthenticationPolicy(options) {
    return {
        name: exports.oauth2AuthenticationPolicyName,
        async sendRequest (request, next) {
            // Ensure allowInsecureConnection is explicitly set when sending request to non-https URLs
            (0, checkInsecureConnection_js_1.ensureSecureConnection)(request, options);
            const scheme = (request.authSchemes ?? options.authSchemes)?.find((x)=>x.kind === "oauth2");
            // Skip adding authentication header if no OAuth2 authentication scheme is found
            if (!scheme) {
                return next(request);
            }
            const token = await options.credential.getOAuth2Token(scheme.flows, {
                abortSignal: request.abortSignal
            });
            request.headers.set("Authorization", `Bearer ${token}`);
            return next(request);
        }
    };
} //# sourceMappingURL=oauth2AuthenticationPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/clientHelpers.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDefaultPipeline = createDefaultPipeline;
exports.getCachedDefaultHttpsClient = getCachedDefaultHttpsClient;
const defaultHttpClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/defaultHttpClient.js [app-route] (ecmascript)");
const createPipelineFromOptions_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/createPipelineFromOptions.js [app-route] (ecmascript)");
const apiVersionPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/apiVersionPolicy.js [app-route] (ecmascript)");
const credentials_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/auth/credentials.js [app-route] (ecmascript)");
const apiKeyAuthenticationPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/apiKeyAuthenticationPolicy.js [app-route] (ecmascript)");
const basicAuthenticationPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/basicAuthenticationPolicy.js [app-route] (ecmascript)");
const bearerAuthenticationPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/bearerAuthenticationPolicy.js [app-route] (ecmascript)");
const oauth2AuthenticationPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/auth/oauth2AuthenticationPolicy.js [app-route] (ecmascript)");
let cachedHttpClient;
/**
 * Creates a default rest pipeline to re-use accross Rest Level Clients
 */ function createDefaultPipeline(options = {}) {
    const pipeline = (0, createPipelineFromOptions_js_1.createPipelineFromOptions)(options);
    pipeline.addPolicy((0, apiVersionPolicy_js_1.apiVersionPolicy)(options));
    const { credential, authSchemes, allowInsecureConnection } = options;
    if (credential) {
        if ((0, credentials_js_1.isApiKeyCredential)(credential)) {
            pipeline.addPolicy((0, apiKeyAuthenticationPolicy_js_1.apiKeyAuthenticationPolicy)({
                authSchemes,
                credential,
                allowInsecureConnection
            }));
        } else if ((0, credentials_js_1.isBasicCredential)(credential)) {
            pipeline.addPolicy((0, basicAuthenticationPolicy_js_1.basicAuthenticationPolicy)({
                authSchemes,
                credential,
                allowInsecureConnection
            }));
        } else if ((0, credentials_js_1.isBearerTokenCredential)(credential)) {
            pipeline.addPolicy((0, bearerAuthenticationPolicy_js_1.bearerAuthenticationPolicy)({
                authSchemes,
                credential,
                allowInsecureConnection
            }));
        } else if ((0, credentials_js_1.isOAuth2TokenCredential)(credential)) {
            pipeline.addPolicy((0, oauth2AuthenticationPolicy_js_1.oauth2AuthenticationPolicy)({
                authSchemes,
                credential,
                allowInsecureConnection
            }));
        }
    }
    return pipeline;
}
function getCachedDefaultHttpsClient() {
    if (!cachedHttpClient) {
        cachedHttpClient = (0, defaultHttpClient_js_1.createDefaultHttpClient)();
    }
    return cachedHttpClient;
} //# sourceMappingURL=clientHelpers.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/multipart.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildBodyPart = buildBodyPart;
exports.buildMultipartBody = buildMultipartBody;
const restError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/restError.js [app-route] (ecmascript)");
const httpHeaders_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/httpHeaders.js [app-route] (ecmascript)");
const bytesEncoding_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/bytesEncoding.js [app-route] (ecmascript)");
const typeGuards_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/typeGuards.js [app-route] (ecmascript)");
/**
 * Get value of a header in the part descriptor ignoring case
 */ function getHeaderValue(descriptor, headerName) {
    if (descriptor.headers) {
        const actualHeaderName = Object.keys(descriptor.headers).find((x)=>x.toLowerCase() === headerName.toLowerCase());
        if (actualHeaderName) {
            return descriptor.headers[actualHeaderName];
        }
    }
    return undefined;
}
function getPartContentType(descriptor) {
    const contentTypeHeader = getHeaderValue(descriptor, "content-type");
    if (contentTypeHeader) {
        return contentTypeHeader;
    }
    // Special value of null means content type is to be omitted
    if (descriptor.contentType === null) {
        return undefined;
    }
    if (descriptor.contentType) {
        return descriptor.contentType;
    }
    const { body } = descriptor;
    if (body === null || body === undefined) {
        return undefined;
    }
    if (typeof body === "string" || typeof body === "number" || typeof body === "boolean") {
        return "text/plain; charset=UTF-8";
    }
    if (body instanceof Blob) {
        return body.type || "application/octet-stream";
    }
    if ((0, typeGuards_js_1.isBinaryBody)(body)) {
        return "application/octet-stream";
    }
    // arbitrary non-text object -> generic JSON content type by default. We will try to JSON.stringify the body.
    return "application/json";
}
/**
 * Enclose value in quotes and escape special characters, for use in the Content-Disposition header
 */ function escapeDispositionField(value) {
    return JSON.stringify(value);
}
function getContentDisposition(descriptor) {
    const contentDispositionHeader = getHeaderValue(descriptor, "content-disposition");
    if (contentDispositionHeader) {
        return contentDispositionHeader;
    }
    if (descriptor.dispositionType === undefined && descriptor.name === undefined && descriptor.filename === undefined) {
        return undefined;
    }
    const dispositionType = descriptor.dispositionType ?? "form-data";
    let disposition = dispositionType;
    if (descriptor.name) {
        disposition += `; name=${escapeDispositionField(descriptor.name)}`;
    }
    let filename = undefined;
    if (descriptor.filename) {
        filename = descriptor.filename;
    } else if (typeof File !== "undefined" && descriptor.body instanceof File) {
        const filenameFromFile = descriptor.body.name;
        if (filenameFromFile !== "") {
            filename = filenameFromFile;
        }
    }
    if (filename) {
        disposition += `; filename=${escapeDispositionField(filename)}`;
    }
    return disposition;
}
function normalizeBody(body, contentType) {
    if (body === undefined) {
        // zero-length body
        return new Uint8Array([]);
    }
    // binary and primitives should go straight on the wire regardless of content type
    if ((0, typeGuards_js_1.isBinaryBody)(body)) {
        return body;
    }
    if (typeof body === "string" || typeof body === "number" || typeof body === "boolean") {
        return (0, bytesEncoding_js_1.stringToUint8Array)(String(body), "utf-8");
    }
    // stringify objects for JSON-ish content types e.g. application/json, application/merge-patch+json, application/vnd.oci.manifest.v1+json, application.json; charset=UTF-8
    if (contentType && /application\/(.+\+)?json(;.+)?/i.test(String(contentType))) {
        return (0, bytesEncoding_js_1.stringToUint8Array)(JSON.stringify(body), "utf-8");
    }
    throw new restError_js_1.RestError(`Unsupported body/content-type combination: ${body}, ${contentType}`);
}
function buildBodyPart(descriptor) {
    const contentType = getPartContentType(descriptor);
    const contentDisposition = getContentDisposition(descriptor);
    const headers = (0, httpHeaders_js_1.createHttpHeaders)(descriptor.headers ?? {});
    if (contentType) {
        headers.set("content-type", contentType);
    }
    if (contentDisposition) {
        headers.set("content-disposition", contentDisposition);
    }
    const body = normalizeBody(descriptor.body, contentType);
    return {
        headers,
        body
    };
}
function buildMultipartBody(parts) {
    return {
        parts: parts.map(buildBodyPart)
    };
} //# sourceMappingURL=multipart.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/sendRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendRequest = sendRequest;
const restError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/restError.js [app-route] (ecmascript)");
const httpHeaders_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/httpHeaders.js [app-route] (ecmascript)");
const pipelineRequest_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/pipelineRequest.js [app-route] (ecmascript)");
const clientHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/clientHelpers.js [app-route] (ecmascript)");
const typeGuards_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/typeGuards.js [app-route] (ecmascript)");
const multipart_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/multipart.js [app-route] (ecmascript)");
/**
 * Helper function to send request used by the client
 * @param method - method to use to send the request
 * @param url - url to send the request to
 * @param pipeline - pipeline with the policies to run when sending the request
 * @param options - request options
 * @param customHttpClient - a custom HttpClient to use when making the request
 * @returns returns and HttpResponse
 */ async function sendRequest(method, url, pipeline, options = {}, customHttpClient) {
    const httpClient = customHttpClient ?? (0, clientHelpers_js_1.getCachedDefaultHttpsClient)();
    const request = buildPipelineRequest(method, url, options);
    try {
        const response = await pipeline.sendRequest(httpClient, request);
        const headers = response.headers.toJSON();
        const stream = response.readableStreamBody ?? response.browserStreamBody;
        const parsedBody = options.responseAsStream || stream !== undefined ? undefined : getResponseBody(response);
        const body = stream ?? parsedBody;
        if (options?.onResponse) {
            options.onResponse({
                ...response,
                request,
                rawHeaders: headers,
                parsedBody
            });
        }
        return {
            request,
            headers,
            status: `${response.status}`,
            body
        };
    } catch (e) {
        if ((0, restError_js_1.isRestError)(e) && e.response && options.onResponse) {
            const { response } = e;
            const rawHeaders = response.headers.toJSON();
            // UNBRANDED DIFFERENCE: onResponse callback does not have a second __legacyError property
            options?.onResponse({
                ...response,
                request,
                rawHeaders
            }, e);
        }
        throw e;
    }
}
/**
 * Function to determine the request content type
 * @param options - request options InternalRequestParameters
 * @returns returns the content-type
 */ function getRequestContentType(options = {}) {
    return options.contentType ?? options.headers?.["content-type"] ?? getContentType(options.body);
}
/**
 * Function to determine the content-type of a body
 * this is used if an explicit content-type is not provided
 * @param body - body in the request
 * @returns returns the content-type
 */ function getContentType(body) {
    if (ArrayBuffer.isView(body)) {
        return "application/octet-stream";
    }
    if (typeof body === "string") {
        try {
            JSON.parse(body);
            return "application/json";
        } catch (error) {
            // If we fail to parse the body, it is not json
            return undefined;
        }
    }
    // By default return json
    return "application/json";
}
function buildPipelineRequest(method, url, options = {}) {
    const requestContentType = getRequestContentType(options);
    const { body, multipartBody } = getRequestBody(options.body, requestContentType);
    const hasContent = body !== undefined || multipartBody !== undefined;
    const headers = (0, httpHeaders_js_1.createHttpHeaders)({
        ...options.headers ? options.headers : {},
        accept: options.accept ?? options.headers?.accept ?? "application/json",
        ...hasContent && requestContentType && {
            "content-type": requestContentType
        }
    });
    return (0, pipelineRequest_js_1.createPipelineRequest)({
        url,
        method,
        body,
        multipartBody,
        headers,
        allowInsecureConnection: options.allowInsecureConnection,
        abortSignal: options.abortSignal,
        onUploadProgress: options.onUploadProgress,
        onDownloadProgress: options.onDownloadProgress,
        timeout: options.timeout,
        enableBrowserStreams: true,
        streamResponseStatusCodes: options.responseAsStream ? new Set([
            Number.POSITIVE_INFINITY
        ]) : undefined
    });
}
/**
 * Prepares the body before sending the request
 */ function getRequestBody(body, contentType = "") {
    if (body === undefined) {
        return {
            body: undefined
        };
    }
    if (typeof FormData !== "undefined" && body instanceof FormData) {
        return {
            body
        };
    }
    if ((0, typeGuards_js_1.isReadableStream)(body)) {
        return {
            body
        };
    }
    if (ArrayBuffer.isView(body)) {
        return {
            body: body instanceof Uint8Array ? body : JSON.stringify(body)
        };
    }
    const firstType = contentType.split(";")[0];
    switch(firstType){
        case "application/json":
            return {
                body: JSON.stringify(body)
            };
        case "multipart/form-data":
            if (Array.isArray(body)) {
                return {
                    multipartBody: (0, multipart_js_1.buildMultipartBody)(body)
                };
            }
            return {
                body: JSON.stringify(body)
            };
        case "text/plain":
            return {
                body: String(body)
            };
        default:
            if (typeof body === "string") {
                return {
                    body
                };
            }
            return {
                body: JSON.stringify(body)
            };
    }
}
/**
 * Prepares the response body
 */ function getResponseBody(response) {
    // Set the default response type
    const contentType = response.headers.get("content-type") ?? "";
    const firstType = contentType.split(";")[0];
    const bodyToParse = response.bodyAsText ?? "";
    if (firstType === "text/plain") {
        return String(bodyToParse);
    }
    // Default to "application/json" and fallback to string;
    try {
        return bodyToParse ? JSON.parse(bodyToParse) : undefined;
    } catch (error) {
        // If we were supposed to get a JSON object and failed to
        // parse, throw a parse error
        if (firstType === "application/json") {
            throw createParseError(response, error);
        }
        // We are not sure how to handle the response so we return it as
        // plain text.
        return String(bodyToParse);
    }
}
function createParseError(response, err) {
    const msg = `Error "${err}" occurred while parsing the response body - ${response.bodyAsText}.`;
    const errCode = err.code ?? restError_js_1.RestError.PARSE_ERROR;
    return new restError_js_1.RestError(msg, {
        code: errCode,
        statusCode: response.status,
        request: response.request,
        response: response
    });
} //# sourceMappingURL=sendRequest.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/urlHelpers.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildRequestUrl = buildRequestUrl;
exports.buildBaseUrl = buildBaseUrl;
exports.replaceAll = replaceAll;
function isQueryParameterWithOptions(x) {
    const value = x.value;
    return value !== undefined && value.toString !== undefined && typeof value.toString === "function";
}
/**
 * Builds the request url, filling in query and path parameters
 * @param endpoint - base url which can be a template url
 * @param routePath - path to append to the endpoint
 * @param pathParameters - values of the path parameters
 * @param options - request parameters including query parameters
 * @returns a full url with path and query parameters
 */ function buildRequestUrl(endpoint, routePath, pathParameters, options = {}) {
    if (routePath.startsWith("https://") || routePath.startsWith("http://")) {
        return routePath;
    }
    endpoint = buildBaseUrl(endpoint, options);
    routePath = buildRoutePath(routePath, pathParameters, options);
    const requestUrl = appendQueryParams(`${endpoint}/${routePath}`, options);
    const url = new URL(requestUrl);
    return url.toString()// Remove double forward slashes
    .replace(/([^:]\/)\/+/g, "$1");
}
function getQueryParamValue(key, allowReserved, style, param) {
    let separator;
    if (style === "pipeDelimited") {
        separator = "|";
    } else if (style === "spaceDelimited") {
        separator = "%20";
    } else {
        separator = ",";
    }
    let paramValues;
    if (Array.isArray(param)) {
        paramValues = param;
    } else if (typeof param === "object" && param.toString === Object.prototype.toString) {
        // If the parameter is an object without a custom toString implementation (e.g. a Date),
        // then we should deconstruct the object into an array [key1, value1, key2, value2, ...].
        paramValues = Object.entries(param).flat();
    } else {
        paramValues = [
            param
        ];
    }
    const value = paramValues.map((p)=>{
        if (p === null || p === undefined) {
            return "";
        }
        if (!p.toString || typeof p.toString !== "function") {
            throw new Error(`Query parameters must be able to be represented as string, ${key} can't`);
        }
        const rawValue = p.toISOString !== undefined ? p.toISOString() : p.toString();
        return allowReserved ? rawValue : encodeURIComponent(rawValue);
    }).join(separator);
    return `${allowReserved ? key : encodeURIComponent(key)}=${value}`;
}
function appendQueryParams(url, options = {}) {
    if (!options.queryParameters) {
        return url;
    }
    const parsedUrl = new URL(url);
    const queryParams = options.queryParameters;
    const paramStrings = [];
    for (const key of Object.keys(queryParams)){
        const param = queryParams[key];
        if (param === undefined || param === null) {
            continue;
        }
        const hasMetadata = isQueryParameterWithOptions(param);
        const rawValue = hasMetadata ? param.value : param;
        const explode = hasMetadata ? param.explode ?? false : false;
        const style = hasMetadata && param.style ? param.style : "form";
        if (explode) {
            if (Array.isArray(rawValue)) {
                for (const item of rawValue){
                    paramStrings.push(getQueryParamValue(key, options.skipUrlEncoding ?? false, style, item));
                }
            } else if (typeof rawValue === "object") {
                // For object explode, the name of the query parameter is ignored and we use the object key instead
                for (const [actualKey, value] of Object.entries(rawValue)){
                    paramStrings.push(getQueryParamValue(actualKey, options.skipUrlEncoding ?? false, style, value));
                }
            } else {
                // Explode doesn't really make sense for primitives
                throw new Error("explode can only be set to true for objects and arrays");
            }
        } else {
            paramStrings.push(getQueryParamValue(key, options.skipUrlEncoding ?? false, style, rawValue));
        }
    }
    if (parsedUrl.search !== "") {
        parsedUrl.search += "&";
    }
    parsedUrl.search += paramStrings.join("&");
    return parsedUrl.toString();
}
function buildBaseUrl(endpoint, options) {
    if (!options.pathParameters) {
        return endpoint;
    }
    const pathParams = options.pathParameters;
    for (const [key, param] of Object.entries(pathParams)){
        if (param === undefined || param === null) {
            throw new Error(`Path parameters ${key} must not be undefined or null`);
        }
        if (!param.toString || typeof param.toString !== "function") {
            throw new Error(`Path parameters must be able to be represented as string, ${key} can't`);
        }
        let value = param.toISOString !== undefined ? param.toISOString() : String(param);
        if (!options.skipUrlEncoding) {
            value = encodeURIComponent(param);
        }
        endpoint = replaceAll(endpoint, `{${key}}`, value) ?? "";
    }
    return endpoint;
}
function buildRoutePath(routePath, pathParameters, options = {}) {
    for (const pathParam of pathParameters){
        const allowReserved = typeof pathParam === "object" && (pathParam.allowReserved ?? false);
        let value = typeof pathParam === "object" ? pathParam.value : pathParam;
        if (!options.skipUrlEncoding && !allowReserved) {
            value = encodeURIComponent(value);
        }
        routePath = routePath.replace(/\{[\w-]+\}/, String(value));
    }
    return routePath;
}
/**
 * Replace all of the instances of searchValue in value with the provided replaceValue.
 * @param value - The value to search and replace in.
 * @param searchValue - The value to search for in the value argument.
 * @param replaceValue - The value to replace searchValue with in the value argument.
 * @returns The value where each instance of searchValue was replaced with replacedValue.
 */ function replaceAll(value, searchValue, replaceValue) {
    return !value || !searchValue ? value : value.split(searchValue).join(replaceValue || "");
} //# sourceMappingURL=urlHelpers.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/getClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getClient = getClient;
const clientHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/clientHelpers.js [app-route] (ecmascript)");
const sendRequest_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/sendRequest.js [app-route] (ecmascript)");
const urlHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/urlHelpers.js [app-route] (ecmascript)");
const checkEnvironment_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/checkEnvironment.js [app-route] (ecmascript)");
/**
 * Creates a client with a default pipeline
 * @param endpoint - Base endpoint for the client
 * @param credentials - Credentials to authenticate the requests
 * @param options - Client options
 */ function getClient(endpoint, clientOptions = {}) {
    const pipeline = clientOptions.pipeline ?? (0, clientHelpers_js_1.createDefaultPipeline)(clientOptions);
    if (clientOptions.additionalPolicies?.length) {
        for (const { policy, position } of clientOptions.additionalPolicies){
            // Sign happens after Retry and is commonly needed to occur
            // before policies that intercept post-retry.
            const afterPhase = position === "perRetry" ? "Sign" : undefined;
            pipeline.addPolicy(policy, {
                afterPhase
            });
        }
    }
    const { allowInsecureConnection, httpClient } = clientOptions;
    const endpointUrl = clientOptions.endpoint ?? endpoint;
    const client = (path, ...args)=>{
        const getUrl = (requestOptions)=>(0, urlHelpers_js_1.buildRequestUrl)(endpointUrl, path, args, {
                allowInsecureConnection,
                ...requestOptions
            });
        return {
            get: (requestOptions = {})=>{
                return buildOperation("GET", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            post: (requestOptions = {})=>{
                return buildOperation("POST", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            put: (requestOptions = {})=>{
                return buildOperation("PUT", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            patch: (requestOptions = {})=>{
                return buildOperation("PATCH", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            delete: (requestOptions = {})=>{
                return buildOperation("DELETE", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            head: (requestOptions = {})=>{
                return buildOperation("HEAD", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            options: (requestOptions = {})=>{
                return buildOperation("OPTIONS", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            },
            trace: (requestOptions = {})=>{
                return buildOperation("TRACE", getUrl(requestOptions), pipeline, requestOptions, allowInsecureConnection, httpClient);
            }
        };
    };
    return {
        path: client,
        pathUnchecked: client,
        pipeline
    };
}
function buildOperation(method, url, pipeline, options, allowInsecureConnection, httpClient) {
    allowInsecureConnection = options.allowInsecureConnection ?? allowInsecureConnection;
    return {
        then: function(onFulfilled, onrejected) {
            return (0, sendRequest_js_1.sendRequest)(method, url, pipeline, {
                ...options,
                allowInsecureConnection
            }, httpClient).then(onFulfilled, onrejected);
        },
        async asBrowserStream () {
            if (checkEnvironment_js_1.isNodeLike) {
                throw new Error("`asBrowserStream` is supported only in the browser environment. Use `asNodeStream` instead to obtain the response body stream. If you require a Web stream of the response in Node, consider using `Readable.toWeb` on the result of `asNodeStream`.");
            } else {
                return (0, sendRequest_js_1.sendRequest)(method, url, pipeline, {
                    ...options,
                    allowInsecureConnection,
                    responseAsStream: true
                }, httpClient);
            }
        },
        async asNodeStream () {
            if (checkEnvironment_js_1.isNodeLike) {
                return (0, sendRequest_js_1.sendRequest)(method, url, pipeline, {
                    ...options,
                    allowInsecureConnection,
                    responseAsStream: true
                }, httpClient);
            } else {
                throw new Error("`isNodeStream` is not supported in the browser environment. Use `asBrowserStream` to obtain the response body stream.");
            }
        }
    };
} //# sourceMappingURL=getClient.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/operationOptionHelpers.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.operationOptionsToRequestParameters = operationOptionsToRequestParameters;
/**
 * Helper function to convert OperationOptions to RequestParameters
 * @param options - the options that are used by Modular layer to send the request
 * @returns the result of the conversion in RequestParameters of RLC layer
 */ function operationOptionsToRequestParameters(options) {
    return {
        allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
        timeout: options.requestOptions?.timeout,
        skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
        abortSignal: options.abortSignal,
        onUploadProgress: options.requestOptions?.onUploadProgress,
        onDownloadProgress: options.requestOptions?.onDownloadProgress,
        headers: {
            ...options.requestOptions?.headers
        },
        onResponse: options.onResponse
    };
} //# sourceMappingURL=operationOptionHelpers.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/restError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRestError = createRestError;
const restError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/restError.js [app-route] (ecmascript)");
const httpHeaders_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/httpHeaders.js [app-route] (ecmascript)");
function createRestError(messageOrResponse, response) {
    const resp = typeof messageOrResponse === "string" ? response : messageOrResponse;
    const internalError = resp.body?.error ?? resp.body;
    const message = typeof messageOrResponse === "string" ? messageOrResponse : internalError?.message ?? `Unexpected status code: ${resp.status}`;
    return new restError_js_1.RestError(message, {
        statusCode: statusCodeToNumber(resp.status),
        code: internalError?.code,
        request: resp.request,
        response: toPipelineResponse(resp)
    });
}
function toPipelineResponse(response) {
    return {
        headers: (0, httpHeaders_js_1.createHttpHeaders)(response.headers),
        request: response.request,
        status: statusCodeToNumber(response.status) ?? -1
    };
}
function statusCodeToNumber(statusCode) {
    const status = Number.parseInt(statusCode);
    return Number.isNaN(status) ? undefined : status;
} //# sourceMappingURL=restError.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRestError = exports.operationOptionsToRequestParameters = exports.getClient = exports.createDefaultHttpClient = exports.uint8ArrayToString = exports.stringToUint8Array = exports.isRestError = exports.RestError = exports.createEmptyPipeline = exports.createPipelineRequest = exports.createHttpHeaders = exports.TypeSpecRuntimeLogger = exports.setLogLevel = exports.getLogLevel = exports.createClientLogger = exports.AbortError = void 0;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
var AbortError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/abort-controller/AbortError.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AbortError", {
    enumerable: true,
    get: function() {
        return AbortError_js_1.AbortError;
    }
});
var logger_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/logger/logger.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createClientLogger", {
    enumerable: true,
    get: function() {
        return logger_js_1.createClientLogger;
    }
});
Object.defineProperty(exports, "getLogLevel", {
    enumerable: true,
    get: function() {
        return logger_js_1.getLogLevel;
    }
});
Object.defineProperty(exports, "setLogLevel", {
    enumerable: true,
    get: function() {
        return logger_js_1.setLogLevel;
    }
});
Object.defineProperty(exports, "TypeSpecRuntimeLogger", {
    enumerable: true,
    get: function() {
        return logger_js_1.TypeSpecRuntimeLogger;
    }
});
var httpHeaders_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/httpHeaders.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createHttpHeaders", {
    enumerable: true,
    get: function() {
        return httpHeaders_js_1.createHttpHeaders;
    }
});
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/auth/schemes.js [app-route] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/auth/oauth2Flows.js [app-route] (ecmascript)"), exports);
var pipelineRequest_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/pipelineRequest.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createPipelineRequest", {
    enumerable: true,
    get: function() {
        return pipelineRequest_js_1.createPipelineRequest;
    }
});
var pipeline_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/pipeline.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createEmptyPipeline", {
    enumerable: true,
    get: function() {
        return pipeline_js_1.createEmptyPipeline;
    }
});
var restError_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/restError.js [app-route] (ecmascript)");
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
var bytesEncoding_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/bytesEncoding.js [app-route] (ecmascript)");
Object.defineProperty(exports, "stringToUint8Array", {
    enumerable: true,
    get: function() {
        return bytesEncoding_js_1.stringToUint8Array;
    }
});
Object.defineProperty(exports, "uint8ArrayToString", {
    enumerable: true,
    get: function() {
        return bytesEncoding_js_1.uint8ArrayToString;
    }
});
var defaultHttpClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/defaultHttpClient.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createDefaultHttpClient", {
    enumerable: true,
    get: function() {
        return defaultHttpClient_js_1.createDefaultHttpClient;
    }
});
var getClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/getClient.js [app-route] (ecmascript)");
Object.defineProperty(exports, "getClient", {
    enumerable: true,
    get: function() {
        return getClient_js_1.getClient;
    }
});
var operationOptionHelpers_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/operationOptionHelpers.js [app-route] (ecmascript)");
Object.defineProperty(exports, "operationOptionsToRequestParameters", {
    enumerable: true,
    get: function() {
        return operationOptionHelpers_js_1.operationOptionsToRequestParameters;
    }
});
var restError_js_2 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/client/restError.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createRestError", {
    enumerable: true,
    get: function() {
        return restError_js_2.createRestError;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/logger/internal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createLoggerContext = void 0;
var logger_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/logger/logger.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createLoggerContext", {
    enumerable: true,
    get: function() {
        return logger_js_1.createLoggerContext;
    }
}); //# sourceMappingURL=internal.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/exponentialRetryPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exponentialRetryPolicyName = void 0;
exports.exponentialRetryPolicy = exponentialRetryPolicy;
const exponentialRetryStrategy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/retryStrategies/exponentialRetryStrategy.js [app-route] (ecmascript)");
const retryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/retryPolicy.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/constants.js [app-route] (ecmascript)");
/**
 * The programmatic identifier of the exponentialRetryPolicy.
 */ exports.exponentialRetryPolicyName = "exponentialRetryPolicy";
/**
 * A policy that attempts to retry requests while introducing an exponentially increasing delay.
 * @param options - Options that configure retry logic.
 */ function exponentialRetryPolicy(options = {}) {
    return (0, retryPolicy_js_1.retryPolicy)([
        (0, exponentialRetryStrategy_js_1.exponentialRetryStrategy)({
            ...options,
            ignoreSystemErrors: true
        })
    ], {
        maxRetries: options.maxRetries ?? constants_js_1.DEFAULT_RETRY_POLICY_COUNT
    });
} //# sourceMappingURL=exponentialRetryPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/systemErrorRetryPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.systemErrorRetryPolicyName = void 0;
exports.systemErrorRetryPolicy = systemErrorRetryPolicy;
const exponentialRetryStrategy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/retryStrategies/exponentialRetryStrategy.js [app-route] (ecmascript)");
const retryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/retryPolicy.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/constants.js [app-route] (ecmascript)");
/**
 * Name of the {@link systemErrorRetryPolicy}
 */ exports.systemErrorRetryPolicyName = "systemErrorRetryPolicy";
/**
 * A retry policy that specifically seeks to handle errors in the
 * underlying transport layer (e.g. DNS lookup failures) rather than
 * retryable error codes from the server itself.
 * @param options - Options that customize the policy.
 */ function systemErrorRetryPolicy(options = {}) {
    return {
        name: exports.systemErrorRetryPolicyName,
        sendRequest: (0, retryPolicy_js_1.retryPolicy)([
            (0, exponentialRetryStrategy_js_1.exponentialRetryStrategy)({
                ...options,
                ignoreHttpStatusCodes: true
            })
        ], {
            maxRetries: options.maxRetries ?? constants_js_1.DEFAULT_RETRY_POLICY_COUNT
        }).sendRequest
    };
} //# sourceMappingURL=systemErrorRetryPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/throttlingRetryPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.throttlingRetryPolicyName = void 0;
exports.throttlingRetryPolicy = throttlingRetryPolicy;
const throttlingRetryStrategy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/retryStrategies/throttlingRetryStrategy.js [app-route] (ecmascript)");
const retryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/retryPolicy.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/constants.js [app-route] (ecmascript)");
/**
 * Name of the {@link throttlingRetryPolicy}
 */ exports.throttlingRetryPolicyName = "throttlingRetryPolicy";
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
    return {
        name: exports.throttlingRetryPolicyName,
        sendRequest: (0, retryPolicy_js_1.retryPolicy)([
            (0, throttlingRetryStrategy_js_1.throttlingRetryStrategy)()
        ], {
            maxRetries: options.maxRetries ?? constants_js_1.DEFAULT_RETRY_POLICY_COUNT
        }).sendRequest
    };
} //# sourceMappingURL=throttlingRetryPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/internal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userAgentPolicyName = exports.userAgentPolicy = exports.tlsPolicyName = exports.tlsPolicy = exports.redirectPolicyName = exports.redirectPolicy = exports.getDefaultProxySettings = exports.proxyPolicyName = exports.proxyPolicy = exports.multipartPolicyName = exports.multipartPolicy = exports.logPolicyName = exports.logPolicy = exports.formDataPolicyName = exports.formDataPolicy = exports.throttlingRetryPolicyName = exports.throttlingRetryPolicy = exports.systemErrorRetryPolicyName = exports.systemErrorRetryPolicy = exports.retryPolicy = exports.exponentialRetryPolicyName = exports.exponentialRetryPolicy = exports.defaultRetryPolicyName = exports.defaultRetryPolicy = exports.decompressResponsePolicyName = exports.decompressResponsePolicy = exports.agentPolicyName = exports.agentPolicy = void 0;
var agentPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/agentPolicy.js [app-route] (ecmascript)");
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
var decompressResponsePolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/decompressResponsePolicy.js [app-route] (ecmascript)");
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
var defaultRetryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/defaultRetryPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "defaultRetryPolicy", {
    enumerable: true,
    get: function() {
        return defaultRetryPolicy_js_1.defaultRetryPolicy;
    }
});
Object.defineProperty(exports, "defaultRetryPolicyName", {
    enumerable: true,
    get: function() {
        return defaultRetryPolicy_js_1.defaultRetryPolicyName;
    }
});
var exponentialRetryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/exponentialRetryPolicy.js [app-route] (ecmascript)");
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
var retryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/retryPolicy.js [app-route] (ecmascript)");
Object.defineProperty(exports, "retryPolicy", {
    enumerable: true,
    get: function() {
        return retryPolicy_js_1.retryPolicy;
    }
});
var systemErrorRetryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/systemErrorRetryPolicy.js [app-route] (ecmascript)");
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
var throttlingRetryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/throttlingRetryPolicy.js [app-route] (ecmascript)");
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
var formDataPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/formDataPolicy.js [app-route] (ecmascript)");
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
var logPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/logPolicy.js [app-route] (ecmascript)");
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
var multipartPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/multipartPolicy.js [app-route] (ecmascript)");
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
var proxyPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/proxyPolicy.js [app-route] (ecmascript)");
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
var redirectPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/redirectPolicy.js [app-route] (ecmascript)");
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
var tlsPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/tlsPolicy.js [app-route] (ecmascript)");
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
var userAgentPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/policies/userAgentPolicy.js [app-route] (ecmascript)");
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
}); //# sourceMappingURL=internal.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/sha256.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.computeSha256Hmac = computeSha256Hmac;
exports.computeSha256Hash = computeSha256Hash;
const node_crypto_1 = __turbopack_context__.r("[externals]/node:crypto [external] (node:crypto, cjs)");
/**
 * Generates a SHA-256 HMAC signature.
 * @param key - The HMAC key represented as a base64 string, used to generate the cryptographic HMAC hash.
 * @param stringToSign - The data to be signed.
 * @param encoding - The textual encoding to use for the returned HMAC digest.
 */ async function computeSha256Hmac(key, stringToSign, encoding) {
    const decodedKey = Buffer.from(key, "base64");
    return (0, node_crypto_1.createHmac)("sha256", decodedKey).update(stringToSign).digest(encoding);
}
/**
 * Generates a SHA-256 hash.
 * @param content - The data to be included in the hash.
 * @param encoding - The textual encoding to use for the returned hash.
 */ async function computeSha256Hash(content, encoding) {
    return (0, node_crypto_1.createHash)("sha256").update(content).digest(encoding);
} //# sourceMappingURL=sha256.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/internal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Sanitizer = exports.uint8ArrayToString = exports.stringToUint8Array = exports.isWebWorker = exports.isReactNative = exports.isDeno = exports.isNodeRuntime = exports.isNodeLike = exports.isBun = exports.isBrowser = exports.randomUUID = exports.computeSha256Hmac = exports.computeSha256Hash = exports.isError = exports.isObject = exports.getRandomIntegerInclusive = exports.calculateRetryDelay = void 0;
var delay_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/delay.js [app-route] (ecmascript)");
Object.defineProperty(exports, "calculateRetryDelay", {
    enumerable: true,
    get: function() {
        return delay_js_1.calculateRetryDelay;
    }
});
var random_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/random.js [app-route] (ecmascript)");
Object.defineProperty(exports, "getRandomIntegerInclusive", {
    enumerable: true,
    get: function() {
        return random_js_1.getRandomIntegerInclusive;
    }
});
var object_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/object.js [app-route] (ecmascript)");
Object.defineProperty(exports, "isObject", {
    enumerable: true,
    get: function() {
        return object_js_1.isObject;
    }
});
var error_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/error.js [app-route] (ecmascript)");
Object.defineProperty(exports, "isError", {
    enumerable: true,
    get: function() {
        return error_js_1.isError;
    }
});
var sha256_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/sha256.js [app-route] (ecmascript)");
Object.defineProperty(exports, "computeSha256Hash", {
    enumerable: true,
    get: function() {
        return sha256_js_1.computeSha256Hash;
    }
});
Object.defineProperty(exports, "computeSha256Hmac", {
    enumerable: true,
    get: function() {
        return sha256_js_1.computeSha256Hmac;
    }
});
var uuidUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/uuidUtils.js [app-route] (ecmascript)");
Object.defineProperty(exports, "randomUUID", {
    enumerable: true,
    get: function() {
        return uuidUtils_js_1.randomUUID;
    }
});
var checkEnvironment_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/checkEnvironment.js [app-route] (ecmascript)");
Object.defineProperty(exports, "isBrowser", {
    enumerable: true,
    get: function() {
        return checkEnvironment_js_1.isBrowser;
    }
});
Object.defineProperty(exports, "isBun", {
    enumerable: true,
    get: function() {
        return checkEnvironment_js_1.isBun;
    }
});
Object.defineProperty(exports, "isNodeLike", {
    enumerable: true,
    get: function() {
        return checkEnvironment_js_1.isNodeLike;
    }
});
Object.defineProperty(exports, "isNodeRuntime", {
    enumerable: true,
    get: function() {
        return checkEnvironment_js_1.isNodeRuntime;
    }
});
Object.defineProperty(exports, "isDeno", {
    enumerable: true,
    get: function() {
        return checkEnvironment_js_1.isDeno;
    }
});
Object.defineProperty(exports, "isReactNative", {
    enumerable: true,
    get: function() {
        return checkEnvironment_js_1.isReactNative;
    }
});
Object.defineProperty(exports, "isWebWorker", {
    enumerable: true,
    get: function() {
        return checkEnvironment_js_1.isWebWorker;
    }
});
var bytesEncoding_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/bytesEncoding.js [app-route] (ecmascript)");
Object.defineProperty(exports, "stringToUint8Array", {
    enumerable: true,
    get: function() {
        return bytesEncoding_js_1.stringToUint8Array;
    }
});
Object.defineProperty(exports, "uint8ArrayToString", {
    enumerable: true,
    get: function() {
        return bytesEncoding_js_1.uint8ArrayToString;
    }
});
var sanitizer_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@typespec/ts-http-runtime/dist/commonjs/util/sanitizer.js [app-route] (ecmascript)");
Object.defineProperty(exports, "Sanitizer", {
    enumerable: true,
    get: function() {
        return sanitizer_js_1.Sanitizer;
    }
}); //# sourceMappingURL=internal.js.map
}),
];

//# sourceMappingURL=e75cc_%40typespec_ts-http-runtime_dist_commonjs_b0773ded._.js.map