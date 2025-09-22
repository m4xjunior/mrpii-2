module.exports = [
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/tokenProvider.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBearerTokenProvider = getBearerTokenProvider;
const core_rest_pipeline_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/index.js [app-route] (ecmascript)");
/**
 * Returns a callback that provides a bearer token.
 * For example, the bearer token can be used to authenticate a request as follows:
 * ```ts snippet:token_provider_example
 * import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
 * import { createPipelineRequest } from "@azure/core-rest-pipeline";
 *
 * const credential = new DefaultAzureCredential();
 * const scope = "https://cognitiveservices.azure.com/.default";
 * const getAccessToken = getBearerTokenProvider(credential, scope);
 * const token = await getAccessToken();
 *
 * // usage
 * const request = createPipelineRequest({ url: "https://example.com" });
 * request.headers.set("Authorization", `Bearer ${token}`);
 * ```
 *
 * @param credential - The credential used to authenticate the request.
 * @param scopes - The scopes required for the bearer token.
 * @param options - Options to configure the token provider.
 * @returns a callback that provides a bearer token.
 */ function getBearerTokenProvider(credential, scopes, options) {
    const { abortSignal, tracingOptions } = options || {};
    const pipeline = (0, core_rest_pipeline_1.createEmptyPipeline)();
    pipeline.addPolicy((0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)({
        credential,
        scopes
    }));
    async function getRefreshedToken() {
        // Create a pipeline with just the bearer token policy
        // and run a dummy request through it to get the token
        const res = await pipeline.sendRequest({
            sendRequest: (request)=>Promise.resolve({
                    request,
                    status: 200,
                    headers: request.headers
                })
        }, (0, core_rest_pipeline_1.createPipelineRequest)({
            url: "https://example.com",
            abortSignal,
            tracingOptions
        }));
        const accessToken = res.headers.get("authorization")?.split(" ")[1];
        if (!accessToken) {
            throw new Error("Failed to get access token");
        }
        return accessToken;
    }
    return getRefreshedToken;
} //# sourceMappingURL=tokenProvider.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/constants.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_TOKEN_CACHE_NAME = exports.CACHE_NON_CAE_SUFFIX = exports.CACHE_CAE_SUFFIX = exports.ALL_TENANTS = exports.DefaultAuthority = exports.DefaultAuthorityHost = exports.AzureAuthorityHosts = exports.DefaultTenantId = exports.DeveloperSignOnClientId = exports.SDK_VERSION = void 0;
/**
 * Current version of the `@azure/identity` package.
 */ exports.SDK_VERSION = `4.12.0`;
/**
 * The default client ID for authentication
 * @internal
 */ // TODO: temporary - this is the Azure CLI clientID - we'll replace it when
// Developer Sign On application is available
// https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/identity/Azure.Identity/src/Constants.cs#L9
exports.DeveloperSignOnClientId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";
/**
 * The default tenant for authentication
 * @internal
 */ exports.DefaultTenantId = "common";
/**
 * A list of known Azure authority hosts
 */ var AzureAuthorityHosts;
(function(AzureAuthorityHosts) {
    /**
     * China-based Azure Authority Host
     */ AzureAuthorityHosts["AzureChina"] = "https://login.chinacloudapi.cn";
    /**
     * Germany-based Azure Authority Host
     *
     * @deprecated Microsoft Cloud Germany was closed on October 29th, 2021.
     *
     * */ AzureAuthorityHosts["AzureGermany"] = "https://login.microsoftonline.de";
    /**
     * US Government Azure Authority Host
     */ AzureAuthorityHosts["AzureGovernment"] = "https://login.microsoftonline.us";
    /**
     * Public Cloud Azure Authority Host
     */ AzureAuthorityHosts["AzurePublicCloud"] = "https://login.microsoftonline.com";
})(AzureAuthorityHosts || (exports.AzureAuthorityHosts = AzureAuthorityHosts = {}));
/**
 * @internal
 * The default authority host.
 */ exports.DefaultAuthorityHost = AzureAuthorityHosts.AzurePublicCloud;
/**
 * @internal
 * The default environment host for Azure Public Cloud
 */ exports.DefaultAuthority = "login.microsoftonline.com";
/**
 * @internal
 * Allow acquiring tokens for any tenant for multi-tentant auth.
 */ exports.ALL_TENANTS = [
    "*"
];
/**
 * @internal
 */ exports.CACHE_CAE_SUFFIX = "cae";
/**
 * @internal
 */ exports.CACHE_NON_CAE_SUFFIX = "nocae";
/**
 * @internal
 *
 * The default name for the cache persistence plugin.
 * Matches the constant defined in the cache persistence package.
 */ exports.DEFAULT_TOKEN_CACHE_NAME = "msal.cache"; //# sourceMappingURL=constants.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalPlugins.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.msalPlugins = exports.msalNodeFlowVSCodeCredentialControl = exports.msalNodeFlowNativeBrokerControl = exports.vsCodeBrokerInfo = exports.vsCodeAuthRecordPath = exports.nativeBrokerInfo = exports.msalNodeFlowCacheControl = exports.persistenceProvider = void 0;
exports.hasNativeBroker = hasNativeBroker;
exports.hasVSCodePlugin = hasVSCodePlugin;
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/constants.js [app-route] (ecmascript)");
/**
 * The current persistence provider, undefined by default.
 * @internal
 */ exports.persistenceProvider = undefined;
/**
 * An object that allows setting the persistence provider.
 * @internal
 */ exports.msalNodeFlowCacheControl = {
    setPersistence (pluginProvider) {
        exports.persistenceProvider = pluginProvider;
    }
};
/**
 * The current native broker provider, undefined by default.
 * @internal
 */ exports.nativeBrokerInfo = undefined;
/**
 * The current VSCode auth record path, undefined by default.
 * @internal
 */ exports.vsCodeAuthRecordPath = undefined;
/**
 * The current VSCode broker, undefined by default.
 * @internal
 */ exports.vsCodeBrokerInfo = undefined;
function hasNativeBroker() {
    return exports.nativeBrokerInfo !== undefined;
}
function hasVSCodePlugin() {
    return exports.vsCodeAuthRecordPath !== undefined && exports.vsCodeBrokerInfo !== undefined;
}
/**
 * An object that allows setting the native broker provider.
 * @internal
 */ exports.msalNodeFlowNativeBrokerControl = {
    setNativeBroker (broker) {
        exports.nativeBrokerInfo = {
            broker
        };
    }
};
/**
 * An object that allows setting the VSCode credential auth record path and broker.
 * @internal
 */ exports.msalNodeFlowVSCodeCredentialControl = {
    setVSCodeAuthRecordPath (path) {
        exports.vsCodeAuthRecordPath = path;
    },
    setVSCodeBroker (broker) {
        exports.vsCodeBrokerInfo = {
            broker
        };
    }
};
/**
 * Configures plugins, validating that required plugins are available and enabled.
 *
 * Does not create the plugins themselves, but rather returns the configuration that will be used to create them.
 *
 * @param options - options for creating the MSAL client
 * @returns plugin configuration
 */ function generatePluginConfiguration(options) {
    const config = {
        cache: {},
        broker: {
            ...options.brokerOptions,
            isEnabled: options.brokerOptions?.enabled ?? false,
            enableMsaPassthrough: options.brokerOptions?.legacyEnableMsaPassthrough ?? false
        }
    };
    if (options.tokenCachePersistenceOptions?.enabled) {
        if (exports.persistenceProvider === undefined) {
            throw new Error([
                "Persistent token caching was requested, but no persistence provider was configured.",
                "You must install the identity-cache-persistence plugin package (`npm install --save @azure/identity-cache-persistence`)",
                "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
                "`useIdentityPlugin(cachePersistencePlugin)` before using `tokenCachePersistenceOptions`."
            ].join(" "));
        }
        const cacheBaseName = options.tokenCachePersistenceOptions.name || constants_js_1.DEFAULT_TOKEN_CACHE_NAME;
        config.cache.cachePlugin = (0, exports.persistenceProvider)({
            name: `${cacheBaseName}.${constants_js_1.CACHE_NON_CAE_SUFFIX}`,
            ...options.tokenCachePersistenceOptions
        });
        config.cache.cachePluginCae = (0, exports.persistenceProvider)({
            name: `${cacheBaseName}.${constants_js_1.CACHE_CAE_SUFFIX}`,
            ...options.tokenCachePersistenceOptions
        });
    }
    if (options.brokerOptions?.enabled) {
        config.broker.nativeBrokerPlugin = getBrokerPlugin(options.isVSCodeCredential || false);
    }
    return config;
}
// Broker error message templates with variables for credential and package names
const brokerErrorTemplates = {
    missing: (credentialName, packageName, pluginVar)=>[
            `${credentialName} was requested, but no plugin was configured or no authentication record was found.`,
            `You must install the ${packageName} plugin package (npm install --save ${packageName})`,
            "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
            `useIdentityPlugin(${pluginVar}) before using enableBroker.`
        ].join(" "),
    unavailable: (credentialName, packageName)=>[
            `${credentialName} was requested, and the plugin is configured, but the broker is unavailable.`,
            `Ensure the ${credentialName} plugin is properly installed and configured.`,
            "Check for missing native dependencies and ensure the package is properly installed.",
            `See the README for prerequisites on installing and using ${packageName}.`
        ].join(" ")
};
// Values for VSCode and native broker configurations for error message
const brokerConfig = {
    vsCode: {
        credentialName: "Visual Studio Code Credential",
        packageName: "@azure/identity-vscode",
        pluginVar: "vsCodePlugin",
        get brokerInfo () {
            return exports.vsCodeBrokerInfo;
        }
    },
    native: {
        credentialName: "Broker for WAM",
        packageName: "@azure/identity-broker",
        pluginVar: "nativeBrokerPlugin",
        get brokerInfo () {
            return exports.nativeBrokerInfo;
        }
    }
};
/**
 * Set appropriate broker plugin based on whether VSCode or native broker is requested.
 * @param isVSCodePlugin - true for VSCode broker, false for native broker
 * @returns the broker plugin if available
 */ function getBrokerPlugin(isVSCodePlugin) {
    const { credentialName, packageName, pluginVar, brokerInfo } = brokerConfig[isVSCodePlugin ? "vsCode" : "native"];
    if (brokerInfo === undefined) {
        throw new Error(brokerErrorTemplates.missing(credentialName, packageName, pluginVar));
    }
    if (brokerInfo.broker.isBrokerAvailable === false) {
        throw new Error(brokerErrorTemplates.unavailable(credentialName, packageName));
    }
    return brokerInfo.broker;
}
/**
 * Wraps generatePluginConfiguration as a writeable property for test stubbing purposes.
 */ exports.msalPlugins = {
    generatePluginConfiguration
}; //# sourceMappingURL=msalPlugins.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/plugins/consumer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useIdentityPlugin = useIdentityPlugin;
const msalPlugins_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalPlugins.js [app-route] (ecmascript)");
/**
 * The context passed to an Identity plugin. This contains objects that
 * plugins can use to set backend implementations.
 * @internal
 */ const pluginContext = {
    cachePluginControl: msalPlugins_js_1.msalNodeFlowCacheControl,
    nativeBrokerPluginControl: msalPlugins_js_1.msalNodeFlowNativeBrokerControl,
    vsCodeCredentialControl: msalPlugins_js_1.msalNodeFlowVSCodeCredentialControl
};
/**
 * Extend Azure Identity with additional functionality. Pass a plugin from
 * a plugin package, such as:
 *
 * - `@azure/identity-cache-persistence`: provides persistent token caching
 * - `@azure/identity-vscode`: provides the dependencies of
 *   `VisualStudioCodeCredential` and enables it
 *
 * Example:
 *
 * ```ts snippet:consumer_example
 * import { useIdentityPlugin, DeviceCodeCredential } from "@azure/identity";
 *
 * useIdentityPlugin(cachePersistencePlugin);
 * // The plugin has the capability to extend `DeviceCodeCredential` and to
 * // add middleware to the underlying credentials, such as persistence.
 * const credential = new DeviceCodeCredential({
 *   tokenCachePersistenceOptions: {
 *     enabled: true,
 *   },
 * });
 * ```
 *
 * @param plugin - the plugin to register
 */ function useIdentityPlugin(plugin) {
    plugin(pluginContext);
} //# sourceMappingURL=consumer.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthenticationRequiredError = exports.AggregateAuthenticationError = exports.AggregateAuthenticationErrorName = exports.AuthenticationError = exports.AuthenticationErrorName = exports.CredentialUnavailableError = exports.CredentialUnavailableErrorName = void 0;
function isErrorResponse(errorResponse) {
    return errorResponse && typeof errorResponse.error === "string" && typeof errorResponse.error_description === "string";
}
/**
 * The Error.name value of an CredentialUnavailable
 */ exports.CredentialUnavailableErrorName = "CredentialUnavailableError";
/**
 * This signifies that the credential that was tried in a chained credential
 * was not available to be used as the credential. Rather than treating this as
 * an error that should halt the chain, it's caught and the chain continues
 */ class CredentialUnavailableError extends Error {
    constructor(message, options){
        super(message, options);
        this.name = exports.CredentialUnavailableErrorName;
    }
}
exports.CredentialUnavailableError = CredentialUnavailableError;
/**
 * The Error.name value of an AuthenticationError
 */ exports.AuthenticationErrorName = "AuthenticationError";
/**
 * Provides details about a failure to authenticate with Azure Active
 * Directory.  The `errorResponse` field contains more details about
 * the specific failure.
 */ class AuthenticationError extends Error {
    /**
     * The HTTP status code returned from the authentication request.
     */ statusCode;
    /**
     * The error response details.
     */ errorResponse;
    constructor(statusCode, errorBody, options){
        let errorResponse = {
            error: "unknown",
            errorDescription: "An unknown error occurred and no additional details are available."
        };
        if (isErrorResponse(errorBody)) {
            errorResponse = convertOAuthErrorResponseToErrorResponse(errorBody);
        } else if (typeof errorBody === "string") {
            try {
                // Most error responses will contain JSON-formatted error details
                // in the response body
                const oauthErrorResponse = JSON.parse(errorBody);
                errorResponse = convertOAuthErrorResponseToErrorResponse(oauthErrorResponse);
            } catch (e) {
                if (statusCode === 400) {
                    errorResponse = {
                        error: "invalid_request",
                        errorDescription: `The service indicated that the request was invalid.\n\n${errorBody}`
                    };
                } else {
                    errorResponse = {
                        error: "unknown_error",
                        errorDescription: `An unknown error has occurred. Response body:\n\n${errorBody}`
                    };
                }
            }
        } else {
            errorResponse = {
                error: "unknown_error",
                errorDescription: "An unknown error occurred and no additional details are available."
            };
        }
        super(`${errorResponse.error} Status code: ${statusCode}\nMore details:\n${errorResponse.errorDescription},`, options);
        this.statusCode = statusCode;
        this.errorResponse = errorResponse;
        // Ensure that this type reports the correct name
        this.name = exports.AuthenticationErrorName;
    }
}
exports.AuthenticationError = AuthenticationError;
/**
 * The Error.name value of an AggregateAuthenticationError
 */ exports.AggregateAuthenticationErrorName = "AggregateAuthenticationError";
/**
 * Provides an `errors` array containing {@link AuthenticationError} instance
 * for authentication failures from credentials in a {@link ChainedTokenCredential}.
 */ class AggregateAuthenticationError extends Error {
    /**
     * The array of error objects that were thrown while trying to authenticate
     * with the credentials in a {@link ChainedTokenCredential}.
     */ errors;
    constructor(errors, errorMessage){
        const errorDetail = errors.join("\n");
        super(`${errorMessage}\n${errorDetail}`);
        this.errors = errors;
        // Ensure that this type reports the correct name
        this.name = exports.AggregateAuthenticationErrorName;
    }
}
exports.AggregateAuthenticationError = AggregateAuthenticationError;
function convertOAuthErrorResponseToErrorResponse(errorBody) {
    return {
        error: errorBody.error,
        errorDescription: errorBody.error_description,
        correlationId: errorBody.correlation_id,
        errorCodes: errorBody.error_codes,
        timestamp: errorBody.timestamp,
        traceId: errorBody.trace_id
    };
}
/**
 * Error used to enforce authentication after trying to retrieve a token silently.
 */ class AuthenticationRequiredError extends Error {
    /**
     * The list of scopes for which the token will have access.
     */ scopes;
    /**
     * The options passed to the getToken request.
     */ getTokenOptions;
    constructor(/**
     * Optional parameters. A message can be specified. The {@link GetTokenOptions} of the request can also be specified to more easily associate the error with the received parameters.
     */ options){
        super(options.message, options.cause ? {
            cause: options.cause
        } : undefined);
        this.scopes = options.scopes;
        this.getTokenOptions = options.getTokenOptions;
        this.name = "AuthenticationRequiredError";
    }
}
exports.AuthenticationRequiredError = AuthenticationRequiredError; //# sourceMappingURL=errors.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logger = void 0;
exports.processEnvVars = processEnvVars;
exports.logEnvVars = logEnvVars;
exports.formatSuccess = formatSuccess;
exports.formatError = formatError;
exports.credentialLoggerInstance = credentialLoggerInstance;
exports.credentialLogger = credentialLogger;
const logger_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/logger/dist/commonjs/index.js [app-route] (ecmascript)");
/**
 * The AzureLogger used for all clients within the identity package
 */ exports.logger = (0, logger_1.createClientLogger)("identity");
/**
 * Separates a list of environment variable names into a plain object with two arrays: an array of missing environment variables and another array with assigned environment variables.
 * @param supportedEnvVars - List of environment variable names
 */ function processEnvVars(supportedEnvVars) {
    return supportedEnvVars.reduce((acc, envVariable)=>{
        if (process.env[envVariable]) {
            acc.assigned.push(envVariable);
        } else {
            acc.missing.push(envVariable);
        }
        return acc;
    }, {
        missing: [],
        assigned: []
    });
}
/**
 * Based on a given list of environment variable names,
 * logs the environment variables currently assigned during the usage of a credential that goes by the given name.
 * @param credentialName - Name of the credential in use
 * @param supportedEnvVars - List of environment variables supported by that credential
 */ function logEnvVars(credentialName, supportedEnvVars) {
    const { assigned } = processEnvVars(supportedEnvVars);
    exports.logger.info(`${credentialName} => Found the following environment variables: ${assigned.join(", ")}`);
}
/**
 * Formatting the success event on the credentials
 */ function formatSuccess(scope) {
    return `SUCCESS. Scopes: ${Array.isArray(scope) ? scope.join(", ") : scope}.`;
}
/**
 * Formatting the success event on the credentials
 */ function formatError(scope, error) {
    let message = "ERROR.";
    if (scope?.length) {
        message += ` Scopes: ${Array.isArray(scope) ? scope.join(", ") : scope}.`;
    }
    return `${message} Error message: ${typeof error === "string" ? error : error.message}.`;
}
/**
 * Generates a CredentialLoggerInstance.
 *
 * It logs with the format:
 *
 *   `[title] => [message]`
 *
 */ function credentialLoggerInstance(title, parent, log = exports.logger) {
    const fullTitle = parent ? `${parent.fullTitle} ${title}` : title;
    function info(message) {
        log.info(`${fullTitle} =>`, message);
    }
    function warning(message) {
        log.warning(`${fullTitle} =>`, message);
    }
    function verbose(message) {
        log.verbose(`${fullTitle} =>`, message);
    }
    function error(message) {
        log.error(`${fullTitle} =>`, message);
    }
    return {
        title,
        fullTitle,
        info,
        warning,
        verbose,
        error
    };
}
/**
 * Generates a CredentialLogger, which is a logger declared at the credential's constructor, and used at any point in the credential.
 * It has all the properties of a CredentialLoggerInstance, plus other logger instances, one per method.
 *
 * It logs with the format:
 *
 *   `[title] => [message]`
 *   `[title] => getToken() => [message]`
 *
 */ function credentialLogger(title, log = exports.logger) {
    const credLogger = credentialLoggerInstance(title, undefined, log);
    return {
        ...credLogger,
        parent: log,
        getToken: credentialLoggerInstance("=> getToken()", credLogger, log)
    };
} //# sourceMappingURL=logging.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tracingClient = void 0;
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/constants.js [app-route] (ecmascript)");
const core_tracing_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-tracing/dist/commonjs/index.js [app-route] (ecmascript)");
/**
 * Creates a span using the global tracer.
 * @internal
 */ exports.tracingClient = (0, core_tracing_1.createTracingClient)({
    namespace: "Microsoft.AAD",
    packageName: "@azure/identity",
    packageVersion: constants_js_1.SDK_VERSION
}); //# sourceMappingURL=tracing.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/chainedTokenCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChainedTokenCredential = exports.logger = void 0;
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
/**
 * @internal
 */ exports.logger = (0, logging_js_1.credentialLogger)("ChainedTokenCredential");
/**
 * Enables multiple `TokenCredential` implementations to be tried in order until
 * one of the getToken methods returns an access token. For more information, see
 * [ChainedTokenCredential overview](https://aka.ms/azsdk/js/identity/credential-chains#use-chainedtokencredential-for-granularity).
 */ class ChainedTokenCredential {
    _sources = [];
    /**
     * Creates an instance of ChainedTokenCredential using the given credentials.
     *
     * @param sources - `TokenCredential` implementations to be tried in order.
     *
     * Example usage:
     * ```ts snippet:chained_token_credential_example
     * import { ClientSecretCredential, ChainedTokenCredential } from "@azure/identity";
     *
     * const tenantId = "<tenant-id>";
     * const clientId = "<client-id>";
     * const clientSecret = "<client-secret>";
     * const anotherClientId = "<another-client-id>";
     * const anotherSecret = "<another-client-secret>";
     *
     * const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
     * const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
     *
     * const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);
     * ```
     */ constructor(...sources){
        this._sources = sources;
    }
    /**
     * Returns the first access token returned by one of the chained
     * `TokenCredential` implementations.  Throws an {@link AggregateAuthenticationError}
     * when one or more credentials throws an {@link AuthenticationError} and
     * no credentials have returned an access token.
     *
     * This method is called automatically by Azure SDK client libraries. You may call this method
     * directly, but you must also handle token caching and token refreshing.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                `TokenCredential` implementation might make.
     */ async getToken(scopes, options = {}) {
        const { token } = await this.getTokenInternal(scopes, options);
        return token;
    }
    async getTokenInternal(scopes, options = {}) {
        let token = null;
        let successfulCredential;
        const errors = [];
        return tracing_js_1.tracingClient.withSpan("ChainedTokenCredential.getToken", options, async (updatedOptions)=>{
            for(let i = 0; i < this._sources.length && token === null; i++){
                try {
                    token = await this._sources[i].getToken(scopes, updatedOptions);
                    successfulCredential = this._sources[i];
                } catch (err) {
                    if (err.name === "CredentialUnavailableError" || err.name === "AuthenticationRequiredError") {
                        errors.push(err);
                    } else {
                        exports.logger.getToken.info((0, logging_js_1.formatError)(scopes, err));
                        throw err;
                    }
                }
            }
            if (!token && errors.length > 0) {
                const err = new errors_js_1.AggregateAuthenticationError(errors, "ChainedTokenCredential authentication failed.");
                exports.logger.getToken.info((0, logging_js_1.formatError)(scopes, err));
                throw err;
            }
            exports.logger.getToken.info(`Result for ${successfulCredential.constructor.name}: ${(0, logging_js_1.formatSuccess)(scopes)}`);
            if (token === null) {
                throw new errors_js_1.CredentialUnavailableError("Failed to retrieve a valid token");
            }
            return {
                token,
                successfulCredential
            };
        });
    }
}
exports.ChainedTokenCredential = ChainedTokenCredential; //# sourceMappingURL=chainedTokenCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/msal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.msalCommon = void 0;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
const msalCommon = tslib_1.__importStar(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/msal-node/lib/msal-node.cjs [app-route] (ecmascript)"));
exports.msalCommon = msalCommon; //# sourceMappingURL=msal.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultLoggerCallback = void 0;
exports.ensureValidMsalToken = ensureValidMsalToken;
exports.getAuthorityHost = getAuthorityHost;
exports.getAuthority = getAuthority;
exports.getKnownAuthorities = getKnownAuthorities;
exports.getMSALLogLevel = getMSALLogLevel;
exports.randomUUID = randomUUID;
exports.handleMsalError = handleMsalError;
exports.publicToMsal = publicToMsal;
exports.msalToPublic = msalToPublic;
exports.serializeAuthenticationRecord = serializeAuthenticationRecord;
exports.deserializeAuthenticationRecord = deserializeAuthenticationRecord;
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/constants.js [app-route] (ecmascript)");
const core_util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)");
const abort_controller_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/abort-controller/dist/commonjs/index.js [app-route] (ecmascript)");
const msal_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/msal.js [app-route] (ecmascript)");
/**
 * @internal
 */ const logger = (0, logging_js_1.credentialLogger)("IdentityUtils");
/**
 * Latest AuthenticationRecord version
 * @internal
 */ const LatestAuthenticationRecordVersion = "1.0";
/**
 * Ensures the validity of the MSAL token
 * @internal
 */ function ensureValidMsalToken(scopes, msalToken, getTokenOptions) {
    const error = (message)=>{
        logger.getToken.info(message);
        return new errors_js_1.AuthenticationRequiredError({
            scopes: Array.isArray(scopes) ? scopes : [
                scopes
            ],
            getTokenOptions,
            message
        });
    };
    if (!msalToken) {
        throw error("No response");
    }
    if (!msalToken.expiresOn) {
        throw error(`Response had no "expiresOn" property.`);
    }
    if (!msalToken.accessToken) {
        throw error(`Response had no "accessToken" property.`);
    }
}
/**
 * Returns the authority host from either the options bag or the AZURE_AUTHORITY_HOST environment variable.
 *
 * Defaults to {@link DefaultAuthorityHost}.
 * @internal
 */ function getAuthorityHost(options) {
    let authorityHost = options?.authorityHost;
    if (!authorityHost && core_util_1.isNodeLike) {
        authorityHost = process.env.AZURE_AUTHORITY_HOST;
    }
    return authorityHost ?? constants_js_1.DefaultAuthorityHost;
}
/**
 * Generates a valid authority by combining a host with a tenantId.
 * @internal
 */ function getAuthority(tenantId, host) {
    if (!host) {
        host = constants_js_1.DefaultAuthorityHost;
    }
    if (new RegExp(`${tenantId}/?$`).test(host)) {
        return host;
    }
    if (host.endsWith("/")) {
        return host + tenantId;
    } else {
        return `${host}/${tenantId}`;
    }
}
/**
 * Generates the known authorities.
 * If the Tenant Id is `adfs`, the authority can't be validated since the format won't match the expected one.
 * For that reason, we have to force MSAL to disable validating the authority
 * by sending it within the known authorities in the MSAL configuration.
 * @internal
 */ function getKnownAuthorities(tenantId, authorityHost, disableInstanceDiscovery) {
    if (tenantId === "adfs" && authorityHost || disableInstanceDiscovery) {
        return [
            authorityHost
        ];
    }
    return [];
}
/**
 * Generates a logger that can be passed to the MSAL clients.
 * @param credLogger - The logger of the credential.
 * @internal
 */ const defaultLoggerCallback = (credLogger, platform = core_util_1.isNode ? "Node" : "Browser")=>(level, message, containsPii)=>{
        if (containsPii) {
            return;
        }
        switch(level){
            case msal_js_1.msalCommon.LogLevel.Error:
                credLogger.info(`MSAL ${platform} V2 error: ${message}`);
                return;
            case msal_js_1.msalCommon.LogLevel.Info:
                credLogger.info(`MSAL ${platform} V2 info message: ${message}`);
                return;
            case msal_js_1.msalCommon.LogLevel.Verbose:
                credLogger.info(`MSAL ${platform} V2 verbose message: ${message}`);
                return;
            case msal_js_1.msalCommon.LogLevel.Warning:
                credLogger.info(`MSAL ${platform} V2 warning: ${message}`);
                return;
        }
    };
exports.defaultLoggerCallback = defaultLoggerCallback;
/**
 * @internal
 */ function getMSALLogLevel(logLevel) {
    switch(logLevel){
        case "error":
            return msal_js_1.msalCommon.LogLevel.Error;
        case "info":
            return msal_js_1.msalCommon.LogLevel.Info;
        case "verbose":
            return msal_js_1.msalCommon.LogLevel.Verbose;
        case "warning":
            return msal_js_1.msalCommon.LogLevel.Warning;
        default:
            // default msal logging level should be Info
            return msal_js_1.msalCommon.LogLevel.Info;
    }
}
/**
 * Wraps core-util's randomUUID in order to allow for mocking in tests.
 * This prepares the library for the upcoming core-util update to ESM.
 *
 * @internal
 * @returns A string containing a random UUID
 */ function randomUUID() {
    return (0, core_util_1.randomUUID)();
}
/**
 * Handles MSAL errors.
 */ function handleMsalError(scopes, error, getTokenOptions) {
    if (error.name === "AuthError" || error.name === "ClientAuthError" || error.name === "BrowserAuthError") {
        const msalError = error;
        switch(msalError.errorCode){
            case "endpoints_resolution_error":
                logger.info((0, logging_js_1.formatError)(scopes, error.message));
                return new errors_js_1.CredentialUnavailableError(error.message);
            case "device_code_polling_cancelled":
                return new abort_controller_1.AbortError("The authentication has been aborted by the caller.");
            case "consent_required":
            case "interaction_required":
            case "login_required":
                logger.info((0, logging_js_1.formatError)(scopes, `Authentication returned errorCode ${msalError.errorCode}`));
                break;
            default:
                logger.info((0, logging_js_1.formatError)(scopes, `Failed to acquire token: ${error.message}`));
                break;
        }
    }
    if (error.name === "ClientConfigurationError" || error.name === "BrowserConfigurationAuthError" || error.name === "AbortError" || error.name === "AuthenticationError") {
        return error;
    }
    if (error.name === "NativeAuthError") {
        logger.info((0, logging_js_1.formatError)(scopes, `Error from the native broker: ${error.message} with status code: ${error.statusCode}`));
        return error;
    }
    return new errors_js_1.AuthenticationRequiredError({
        scopes,
        getTokenOptions,
        message: error.message
    });
}
// transformations
function publicToMsal(account) {
    return {
        localAccountId: account.homeAccountId,
        environment: account.authority,
        username: account.username,
        homeAccountId: account.homeAccountId,
        tenantId: account.tenantId
    };
}
function msalToPublic(clientId, account) {
    const record = {
        authority: account.environment ?? constants_js_1.DefaultAuthority,
        homeAccountId: account.homeAccountId,
        tenantId: account.tenantId || constants_js_1.DefaultTenantId,
        username: account.username,
        clientId,
        version: LatestAuthenticationRecordVersion
    };
    return record;
}
/**
 * Serializes an `AuthenticationRecord` into a string.
 *
 * The output of a serialized authentication record will contain the following properties:
 *
 * - "authority"
 * - "homeAccountId"
 * - "clientId"
 * - "tenantId"
 * - "username"
 * - "version"
 *
 * To later convert this string to a serialized `AuthenticationRecord`, please use the exported function `deserializeAuthenticationRecord()`.
 */ function serializeAuthenticationRecord(record) {
    return JSON.stringify(record);
}
/**
 * Deserializes a previously serialized authentication record from a string into an object.
 *
 * The input string must contain the following properties:
 *
 * - "authority"
 * - "homeAccountId"
 * - "clientId"
 * - "tenantId"
 * - "username"
 * - "version"
 *
 * If the version we receive is unsupported, an error will be thrown.
 *
 * At the moment, the only available version is: "1.0", which is always set when the authentication record is serialized.
 *
 * @param serializedRecord - Authentication record previously serialized into string.
 * @returns AuthenticationRecord.
 */ function deserializeAuthenticationRecord(serializedRecord) {
    const parsed = JSON.parse(serializedRecord);
    if (parsed.version && parsed.version !== LatestAuthenticationRecordVersion) {
        throw Error("Unsupported AuthenticationRecord version");
    }
    return parsed;
} //# sourceMappingURL=utils.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/identityTokenEndpoint.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getIdentityTokenEndpointSuffix = getIdentityTokenEndpointSuffix;
function getIdentityTokenEndpointSuffix(tenantId) {
    if (tenantId === "adfs") {
        return "oauth2/token";
    } else {
        return "oauth2/v2.0/token";
    }
} //# sourceMappingURL=identityTokenEndpoint.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serviceFabricErrorMessage = void 0;
exports.mapScopesToResource = mapScopesToResource;
exports.parseExpirationTimestamp = parseExpirationTimestamp;
exports.parseRefreshTimestamp = parseRefreshTimestamp;
const DefaultScopeSuffix = "/.default";
/**
 * Error message for Service Fabric Managed Identity environment.
 */ exports.serviceFabricErrorMessage = "Specifying a `clientId` or `resourceId` is not supported by the Service Fabric managed identity environment. The managed identity configuration is determined by the Service Fabric cluster resource configuration. See https://aka.ms/servicefabricmi for more information";
/**
 * Most MSIs send requests to the IMDS endpoint, or a similar endpoint.
 * These are GET requests that require sending a `resource` parameter on the query.
 * This resource can be derived from the scopes received through the getToken call, as long as only one scope is received.
 * Multiple scopes assume that the resulting token will have access to multiple resources, which won't be the case.
 *
 * For that reason, when we encounter multiple scopes, we return undefined.
 * It's up to the individual MSI implementations to throw the errors (which helps us provide less generic errors).
 */ function mapScopesToResource(scopes) {
    let scope = "";
    if (Array.isArray(scopes)) {
        if (scopes.length !== 1) {
            return;
        }
        scope = scopes[0];
    } else if (typeof scopes === "string") {
        scope = scopes;
    }
    if (!scope.endsWith(DefaultScopeSuffix)) {
        return scope;
    }
    return scope.substr(0, scope.lastIndexOf(DefaultScopeSuffix));
}
/**
 * Given a token response, return the expiration timestamp as the number of milliseconds from the Unix epoch.
 * @param body - A parsed response body from the authentication endpoint.
 */ function parseExpirationTimestamp(body) {
    if (typeof body.expires_on === "number") {
        return body.expires_on * 1000;
    }
    if (typeof body.expires_on === "string") {
        const asNumber = +body.expires_on;
        if (!isNaN(asNumber)) {
            return asNumber * 1000;
        }
        const asDate = Date.parse(body.expires_on);
        if (!isNaN(asDate)) {
            return asDate;
        }
    }
    if (typeof body.expires_in === "number") {
        return Date.now() + body.expires_in * 1000;
    }
    throw new Error(`Failed to parse token expiration from body. expires_in="${body.expires_in}", expires_on="${body.expires_on}"`);
}
/**
 * Given a token response, return the expiration timestamp as the number of milliseconds from the Unix epoch.
 * @param body - A parsed response body from the authentication endpoint.
 */ function parseRefreshTimestamp(body) {
    if (body.refresh_on) {
        if (typeof body.refresh_on === "number") {
            return body.refresh_on * 1000;
        }
        if (typeof body.refresh_on === "string") {
            const asNumber = +body.refresh_on;
            if (!isNaN(asNumber)) {
                return asNumber * 1000;
            }
            const asDate = Date.parse(body.refresh_on);
            if (!isNaN(asDate)) {
                return asDate;
            }
        }
        throw new Error(`Failed to parse refresh_on from body. refresh_on="${body.refresh_on}"`);
    } else {
        return undefined;
    }
} //# sourceMappingURL=utils.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/client/identityClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IdentityClient = void 0;
exports.getIdentityClientAuthorityHost = getIdentityClientAuthorityHost;
const core_client_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-client/dist/commonjs/index.js [app-route] (ecmascript)");
const core_util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)");
const core_rest_pipeline_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/index.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const identityTokenEndpoint_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/identityTokenEndpoint.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/constants.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/utils.js [app-route] (ecmascript)");
const noCorrelationId = "noCorrelationId";
/**
 * @internal
 */ function getIdentityClientAuthorityHost(options) {
    // The authorityHost can come from options or from the AZURE_AUTHORITY_HOST environment variable.
    let authorityHost = options?.authorityHost;
    // The AZURE_AUTHORITY_HOST environment variable can only be provided in Node.js.
    if (core_util_1.isNode) {
        authorityHost = authorityHost ?? process.env.AZURE_AUTHORITY_HOST;
    }
    // If the authorityHost is not provided, we use the default one from the public cloud: https://login.microsoftonline.com
    return authorityHost ?? constants_js_1.DefaultAuthorityHost;
}
/**
 * The network module used by the Identity credentials.
 *
 * It allows for credentials to abort any pending request independently of the MSAL flow,
 * by calling to the `abortRequests()` method.
 *
 */ class IdentityClient extends core_client_1.ServiceClient {
    authorityHost;
    allowLoggingAccountIdentifiers;
    abortControllers;
    allowInsecureConnection = false;
    // used for WorkloadIdentity
    tokenCredentialOptions;
    constructor(options){
        const packageDetails = `azsdk-js-identity/${constants_js_1.SDK_VERSION}`;
        const userAgentPrefix = options?.userAgentOptions?.userAgentPrefix ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}` : `${packageDetails}`;
        const baseUri = getIdentityClientAuthorityHost(options);
        if (!baseUri.startsWith("https:")) {
            throw new Error("The authorityHost address must use the 'https' protocol.");
        }
        super({
            requestContentType: "application/json; charset=utf-8",
            retryOptions: {
                maxRetries: 3
            },
            ...options,
            userAgentOptions: {
                userAgentPrefix
            },
            baseUri
        });
        this.authorityHost = baseUri;
        this.abortControllers = new Map();
        this.allowLoggingAccountIdentifiers = options?.loggingOptions?.allowLoggingAccountIdentifiers;
        // used for WorkloadIdentity
        this.tokenCredentialOptions = {
            ...options
        };
        // used for ManagedIdentity
        if (options?.allowInsecureConnection) {
            this.allowInsecureConnection = options.allowInsecureConnection;
        }
    }
    async sendTokenRequest(request) {
        logging_js_1.logger.info(`IdentityClient: sending token request to [${request.url}]`);
        const response = await this.sendRequest(request);
        if (response.bodyAsText && (response.status === 200 || response.status === 201)) {
            const parsedBody = JSON.parse(response.bodyAsText);
            if (!parsedBody.access_token) {
                return null;
            }
            this.logIdentifiers(response);
            const token = {
                accessToken: {
                    token: parsedBody.access_token,
                    expiresOnTimestamp: (0, utils_js_1.parseExpirationTimestamp)(parsedBody),
                    refreshAfterTimestamp: (0, utils_js_1.parseRefreshTimestamp)(parsedBody),
                    tokenType: "Bearer"
                },
                refreshToken: parsedBody.refresh_token
            };
            logging_js_1.logger.info(`IdentityClient: [${request.url}] token acquired, expires on ${token.accessToken.expiresOnTimestamp}`);
            return token;
        } else {
            const error = new errors_js_1.AuthenticationError(response.status, response.bodyAsText);
            logging_js_1.logger.warning(`IdentityClient: authentication error. HTTP status: ${response.status}, ${error.errorResponse.errorDescription}`);
            throw error;
        }
    }
    async refreshAccessToken(tenantId, clientId, scopes, refreshToken, clientSecret, options = {}) {
        if (refreshToken === undefined) {
            return null;
        }
        logging_js_1.logger.info(`IdentityClient: refreshing access token with client ID: ${clientId}, scopes: ${scopes} started`);
        const refreshParams = {
            grant_type: "refresh_token",
            client_id: clientId,
            refresh_token: refreshToken,
            scope: scopes
        };
        if (clientSecret !== undefined) {
            refreshParams.client_secret = clientSecret;
        }
        const query = new URLSearchParams(refreshParams);
        return tracing_js_1.tracingClient.withSpan("IdentityClient.refreshAccessToken", options, async (updatedOptions)=>{
            try {
                const urlSuffix = (0, identityTokenEndpoint_js_1.getIdentityTokenEndpointSuffix)(tenantId);
                const request = (0, core_rest_pipeline_1.createPipelineRequest)({
                    url: `${this.authorityHost}/${tenantId}/${urlSuffix}`,
                    method: "POST",
                    body: query.toString(),
                    abortSignal: options.abortSignal,
                    headers: (0, core_rest_pipeline_1.createHttpHeaders)({
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    }),
                    tracingOptions: updatedOptions.tracingOptions
                });
                const response = await this.sendTokenRequest(request);
                logging_js_1.logger.info(`IdentityClient: refreshed token for client ID: ${clientId}`);
                return response;
            } catch (err) {
                if (err.name === errors_js_1.AuthenticationErrorName && err.errorResponse.error === "interaction_required") {
                    // It's likely that the refresh token has expired, so
                    // return null so that the credential implementation will
                    // initiate the authentication flow again.
                    logging_js_1.logger.info(`IdentityClient: interaction required for client ID: ${clientId}`);
                    return null;
                } else {
                    logging_js_1.logger.warning(`IdentityClient: failed refreshing token for client ID: ${clientId}: ${err}`);
                    throw err;
                }
            }
        });
    }
    // Here is a custom layer that allows us to abort requests that go through MSAL,
    // since MSAL doesn't allow us to pass options all the way through.
    generateAbortSignal(correlationId) {
        const controller = new AbortController();
        const controllers = this.abortControllers.get(correlationId) || [];
        controllers.push(controller);
        this.abortControllers.set(correlationId, controllers);
        const existingOnAbort = controller.signal.onabort;
        controller.signal.onabort = (...params)=>{
            this.abortControllers.set(correlationId, undefined);
            if (existingOnAbort) {
                existingOnAbort.apply(controller.signal, params);
            }
        };
        return controller.signal;
    }
    abortRequests(correlationId) {
        const key = correlationId || noCorrelationId;
        const controllers = [
            ...this.abortControllers.get(key) || [],
            // MSAL passes no correlation ID to the get requests...
            ...this.abortControllers.get(noCorrelationId) || []
        ];
        if (!controllers.length) {
            return;
        }
        for (const controller of controllers){
            controller.abort();
        }
        this.abortControllers.set(key, undefined);
    }
    getCorrelationId(options) {
        const parameter = options?.body?.split("&").map((part)=>part.split("=")).find(([key])=>key === "client-request-id");
        return parameter && parameter.length ? parameter[1] || noCorrelationId : noCorrelationId;
    }
    // The MSAL network module methods follow
    async sendGetRequestAsync(url, options) {
        const request = (0, core_rest_pipeline_1.createPipelineRequest)({
            url,
            method: "GET",
            body: options?.body,
            allowInsecureConnection: this.allowInsecureConnection,
            headers: (0, core_rest_pipeline_1.createHttpHeaders)(options?.headers),
            abortSignal: this.generateAbortSignal(noCorrelationId)
        });
        const response = await this.sendRequest(request);
        this.logIdentifiers(response);
        return {
            body: response.bodyAsText ? JSON.parse(response.bodyAsText) : undefined,
            headers: response.headers.toJSON(),
            status: response.status
        };
    }
    async sendPostRequestAsync(url, options) {
        const request = (0, core_rest_pipeline_1.createPipelineRequest)({
            url,
            method: "POST",
            body: options?.body,
            headers: (0, core_rest_pipeline_1.createHttpHeaders)(options?.headers),
            allowInsecureConnection: this.allowInsecureConnection,
            // MSAL doesn't send the correlation ID on the get requests.
            abortSignal: this.generateAbortSignal(this.getCorrelationId(options))
        });
        const response = await this.sendRequest(request);
        this.logIdentifiers(response);
        return {
            body: response.bodyAsText ? JSON.parse(response.bodyAsText) : undefined,
            headers: response.headers.toJSON(),
            status: response.status
        };
    }
    /**
     *
     * @internal
     */ getTokenCredentialOptions() {
        return this.tokenCredentialOptions;
    }
    /**
     * If allowLoggingAccountIdentifiers was set on the constructor options
     * we try to log the account identifiers by parsing the received access token.
     *
     * The account identifiers we try to log are:
     * - `appid`: The application or Client Identifier.
     * - `upn`: User Principal Name.
     *   - It might not be available in some authentication scenarios.
     *   - If it's not available, we put a placeholder: "No User Principal Name available".
     * - `tid`: Tenant Identifier.
     * - `oid`: Object Identifier of the authenticated user.
     */ logIdentifiers(response) {
        if (!this.allowLoggingAccountIdentifiers || !response.bodyAsText) {
            return;
        }
        const unavailableUpn = "No User Principal Name available";
        try {
            const parsed = response.parsedBody || JSON.parse(response.bodyAsText);
            const accessToken = parsed.access_token;
            if (!accessToken) {
                // Without an access token allowLoggingAccountIdentifiers isn't useful.
                return;
            }
            const base64Metadata = accessToken.split(".")[1];
            const { appid, upn, tid, oid } = JSON.parse(Buffer.from(base64Metadata, "base64").toString("utf8"));
            logging_js_1.logger.info(`[Authenticated account] Client ID: ${appid}. Tenant ID: ${tid}. User Principal Name: ${upn || unavailableUpn}. Object ID (user): ${oid}`);
        } catch (e) {
            logging_js_1.logger.warning("allowLoggingAccountIdentifiers was set, but we couldn't log the account information. Error:", e.message);
        }
    }
}
exports.IdentityClient = IdentityClient; //# sourceMappingURL=identityClient.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/regionalAuthority.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RegionalAuthority = void 0;
exports.calculateRegionalAuthority = calculateRegionalAuthority;
/**
 * Helps specify a regional authority, or "AutoDiscoverRegion" to auto-detect the region.
 */ var RegionalAuthority;
(function(RegionalAuthority) {
    /** Instructs MSAL to attempt to discover the region */ RegionalAuthority["AutoDiscoverRegion"] = "AutoDiscoverRegion";
    /** Uses the {@link RegionalAuthority} for the Azure 'westus' region. */ RegionalAuthority["USWest"] = "westus";
    /** Uses the {@link RegionalAuthority} for the Azure 'westus2' region. */ RegionalAuthority["USWest2"] = "westus2";
    /** Uses the {@link RegionalAuthority} for the Azure 'centralus' region. */ RegionalAuthority["USCentral"] = "centralus";
    /** Uses the {@link RegionalAuthority} for the Azure 'eastus' region. */ RegionalAuthority["USEast"] = "eastus";
    /** Uses the {@link RegionalAuthority} for the Azure 'eastus2' region. */ RegionalAuthority["USEast2"] = "eastus2";
    /** Uses the {@link RegionalAuthority} for the Azure 'northcentralus' region. */ RegionalAuthority["USNorthCentral"] = "northcentralus";
    /** Uses the {@link RegionalAuthority} for the Azure 'southcentralus' region. */ RegionalAuthority["USSouthCentral"] = "southcentralus";
    /** Uses the {@link RegionalAuthority} for the Azure 'westcentralus' region. */ RegionalAuthority["USWestCentral"] = "westcentralus";
    /** Uses the {@link RegionalAuthority} for the Azure 'canadacentral' region. */ RegionalAuthority["CanadaCentral"] = "canadacentral";
    /** Uses the {@link RegionalAuthority} for the Azure 'canadaeast' region. */ RegionalAuthority["CanadaEast"] = "canadaeast";
    /** Uses the {@link RegionalAuthority} for the Azure 'brazilsouth' region. */ RegionalAuthority["BrazilSouth"] = "brazilsouth";
    /** Uses the {@link RegionalAuthority} for the Azure 'northeurope' region. */ RegionalAuthority["EuropeNorth"] = "northeurope";
    /** Uses the {@link RegionalAuthority} for the Azure 'westeurope' region. */ RegionalAuthority["EuropeWest"] = "westeurope";
    /** Uses the {@link RegionalAuthority} for the Azure 'uksouth' region. */ RegionalAuthority["UKSouth"] = "uksouth";
    /** Uses the {@link RegionalAuthority} for the Azure 'ukwest' region. */ RegionalAuthority["UKWest"] = "ukwest";
    /** Uses the {@link RegionalAuthority} for the Azure 'francecentral' region. */ RegionalAuthority["FranceCentral"] = "francecentral";
    /** Uses the {@link RegionalAuthority} for the Azure 'francesouth' region. */ RegionalAuthority["FranceSouth"] = "francesouth";
    /** Uses the {@link RegionalAuthority} for the Azure 'switzerlandnorth' region. */ RegionalAuthority["SwitzerlandNorth"] = "switzerlandnorth";
    /** Uses the {@link RegionalAuthority} for the Azure 'switzerlandwest' region. */ RegionalAuthority["SwitzerlandWest"] = "switzerlandwest";
    /** Uses the {@link RegionalAuthority} for the Azure 'germanynorth' region. */ RegionalAuthority["GermanyNorth"] = "germanynorth";
    /** Uses the {@link RegionalAuthority} for the Azure 'germanywestcentral' region. */ RegionalAuthority["GermanyWestCentral"] = "germanywestcentral";
    /** Uses the {@link RegionalAuthority} for the Azure 'norwaywest' region. */ RegionalAuthority["NorwayWest"] = "norwaywest";
    /** Uses the {@link RegionalAuthority} for the Azure 'norwayeast' region. */ RegionalAuthority["NorwayEast"] = "norwayeast";
    /** Uses the {@link RegionalAuthority} for the Azure 'eastasia' region. */ RegionalAuthority["AsiaEast"] = "eastasia";
    /** Uses the {@link RegionalAuthority} for the Azure 'southeastasia' region. */ RegionalAuthority["AsiaSouthEast"] = "southeastasia";
    /** Uses the {@link RegionalAuthority} for the Azure 'japaneast' region. */ RegionalAuthority["JapanEast"] = "japaneast";
    /** Uses the {@link RegionalAuthority} for the Azure 'japanwest' region. */ RegionalAuthority["JapanWest"] = "japanwest";
    /** Uses the {@link RegionalAuthority} for the Azure 'australiaeast' region. */ RegionalAuthority["AustraliaEast"] = "australiaeast";
    /** Uses the {@link RegionalAuthority} for the Azure 'australiasoutheast' region. */ RegionalAuthority["AustraliaSouthEast"] = "australiasoutheast";
    /** Uses the {@link RegionalAuthority} for the Azure 'australiacentral' region. */ RegionalAuthority["AustraliaCentral"] = "australiacentral";
    /** Uses the {@link RegionalAuthority} for the Azure 'australiacentral2' region. */ RegionalAuthority["AustraliaCentral2"] = "australiacentral2";
    /** Uses the {@link RegionalAuthority} for the Azure 'centralindia' region. */ RegionalAuthority["IndiaCentral"] = "centralindia";
    /** Uses the {@link RegionalAuthority} for the Azure 'southindia' region. */ RegionalAuthority["IndiaSouth"] = "southindia";
    /** Uses the {@link RegionalAuthority} for the Azure 'westindia' region. */ RegionalAuthority["IndiaWest"] = "westindia";
    /** Uses the {@link RegionalAuthority} for the Azure 'koreasouth' region. */ RegionalAuthority["KoreaSouth"] = "koreasouth";
    /** Uses the {@link RegionalAuthority} for the Azure 'koreacentral' region. */ RegionalAuthority["KoreaCentral"] = "koreacentral";
    /** Uses the {@link RegionalAuthority} for the Azure 'uaecentral' region. */ RegionalAuthority["UAECentral"] = "uaecentral";
    /** Uses the {@link RegionalAuthority} for the Azure 'uaenorth' region. */ RegionalAuthority["UAENorth"] = "uaenorth";
    /** Uses the {@link RegionalAuthority} for the Azure 'southafricanorth' region. */ RegionalAuthority["SouthAfricaNorth"] = "southafricanorth";
    /** Uses the {@link RegionalAuthority} for the Azure 'southafricawest' region. */ RegionalAuthority["SouthAfricaWest"] = "southafricawest";
    /** Uses the {@link RegionalAuthority} for the Azure 'chinanorth' region. */ RegionalAuthority["ChinaNorth"] = "chinanorth";
    /** Uses the {@link RegionalAuthority} for the Azure 'chinaeast' region. */ RegionalAuthority["ChinaEast"] = "chinaeast";
    /** Uses the {@link RegionalAuthority} for the Azure 'chinanorth2' region. */ RegionalAuthority["ChinaNorth2"] = "chinanorth2";
    /** Uses the {@link RegionalAuthority} for the Azure 'chinaeast2' region. */ RegionalAuthority["ChinaEast2"] = "chinaeast2";
    /** Uses the {@link RegionalAuthority} for the Azure 'germanycentral' region. */ RegionalAuthority["GermanyCentral"] = "germanycentral";
    /** Uses the {@link RegionalAuthority} for the Azure 'germanynortheast' region. */ RegionalAuthority["GermanyNorthEast"] = "germanynortheast";
    /** Uses the {@link RegionalAuthority} for the Azure 'usgovvirginia' region. */ RegionalAuthority["GovernmentUSVirginia"] = "usgovvirginia";
    /** Uses the {@link RegionalAuthority} for the Azure 'usgoviowa' region. */ RegionalAuthority["GovernmentUSIowa"] = "usgoviowa";
    /** Uses the {@link RegionalAuthority} for the Azure 'usgovarizona' region. */ RegionalAuthority["GovernmentUSArizona"] = "usgovarizona";
    /** Uses the {@link RegionalAuthority} for the Azure 'usgovtexas' region. */ RegionalAuthority["GovernmentUSTexas"] = "usgovtexas";
    /** Uses the {@link RegionalAuthority} for the Azure 'usdodeast' region. */ RegionalAuthority["GovernmentUSDodEast"] = "usdodeast";
    /** Uses the {@link RegionalAuthority} for the Azure 'usdodcentral' region. */ RegionalAuthority["GovernmentUSDodCentral"] = "usdodcentral";
})(RegionalAuthority || (exports.RegionalAuthority = RegionalAuthority = {}));
/**
 * Calculates the correct regional authority based on the supplied value
 * and the AZURE_REGIONAL_AUTHORITY_NAME environment variable.
 *
 * Values will be returned verbatim, except for {@link RegionalAuthority.AutoDiscoverRegion}
 * which is mapped to a value MSAL can understand.
 *
 * @internal
 */ function calculateRegionalAuthority(regionalAuthority) {
    // Note: as of today only 3 credentials support regional authority, and the parameter
    // is not exposed via the public API. Regional Authority is _only_ supported
    // via the AZURE_REGIONAL_AUTHORITY_NAME env var and _only_ for: ClientSecretCredential, ClientCertificateCredential, and ClientAssertionCredential.
    // Accepting the regionalAuthority parameter will allow us to support it in the future.
    let azureRegion = regionalAuthority;
    if (azureRegion === undefined && globalThis.process?.env?.AZURE_REGIONAL_AUTHORITY_NAME !== undefined) {
        azureRegion = process.env.AZURE_REGIONAL_AUTHORITY_NAME;
    }
    if (azureRegion === RegionalAuthority.AutoDiscoverRegion) {
        return "AUTO_DISCOVER";
    }
    return azureRegion;
} //# sourceMappingURL=regionalAuthority.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/processMultiTenantRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.processMultiTenantRequest = processMultiTenantRequest;
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
function createConfigurationErrorMessage(tenantId) {
    return `The current credential is not configured to acquire tokens for tenant ${tenantId}. To enable acquiring tokens for this tenant add it to the AdditionallyAllowedTenants on the credential options, or add "*" to AdditionallyAllowedTenants to allow acquiring tokens for any tenant.`;
}
/**
 * Of getToken contains a tenantId, this functions allows picking this tenantId as the appropriate for authentication,
 * unless multitenant authentication has been disabled through the AZURE_IDENTITY_DISABLE_MULTITENANTAUTH (on Node.js),
 * or unless the original tenant Id is `adfs`.
 * @internal
 */ function processMultiTenantRequest(tenantId, getTokenOptions, additionallyAllowedTenantIds = [], logger) {
    let resolvedTenantId;
    if (process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH) {
        resolvedTenantId = tenantId;
    } else if (tenantId === "adfs") {
        resolvedTenantId = tenantId;
    } else {
        resolvedTenantId = getTokenOptions?.tenantId ?? tenantId;
    }
    if (tenantId && resolvedTenantId !== tenantId && !additionallyAllowedTenantIds.includes("*") && !additionallyAllowedTenantIds.some((t)=>t.localeCompare(resolvedTenantId) === 0)) {
        const message = createConfigurationErrorMessage(resolvedTenantId);
        logger?.info(message);
        throw new errors_js_1.CredentialUnavailableError(message);
    }
    return resolvedTenantId;
} //# sourceMappingURL=processMultiTenantRequest.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.processMultiTenantRequest = void 0;
exports.checkTenantId = checkTenantId;
exports.resolveTenantId = resolveTenantId;
exports.resolveAdditionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds;
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/constants.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
var processMultiTenantRequest_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/processMultiTenantRequest.js [app-route] (ecmascript)");
Object.defineProperty(exports, "processMultiTenantRequest", {
    enumerable: true,
    get: function() {
        return processMultiTenantRequest_js_1.processMultiTenantRequest;
    }
});
/**
 * @internal
 */ function checkTenantId(logger, tenantId) {
    if (!tenantId.match(/^[0-9a-zA-Z-.]+$/)) {
        const error = new Error("Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://learn.microsoft.com/partner-center/find-ids-and-domain-names.");
        logger.info((0, logging_js_1.formatError)("", error));
        throw error;
    }
}
/**
 * @internal
 */ function resolveTenantId(logger, tenantId, clientId) {
    if (tenantId) {
        checkTenantId(logger, tenantId);
        return tenantId;
    }
    if (!clientId) {
        clientId = constants_js_1.DeveloperSignOnClientId;
    }
    if (clientId !== constants_js_1.DeveloperSignOnClientId) {
        return "common";
    }
    return "organizations";
}
/**
 * @internal
 */ function resolveAdditionallyAllowedTenantIds(additionallyAllowedTenants) {
    if (!additionallyAllowedTenants || additionallyAllowedTenants.length === 0) {
        return [];
    }
    if (additionallyAllowedTenants.includes("*")) {
        return constants_js_1.ALL_TENANTS;
    }
    return additionallyAllowedTenants;
} //# sourceMappingURL=tenantIdUtils.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateMsalConfiguration = generateMsalConfiguration;
exports.createMsalClient = createMsalClient;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
const msal = tslib_1.__importStar(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/msal-node/lib/msal-node.cjs [app-route] (ecmascript)"));
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const msalPlugins_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalPlugins.js [app-route] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/utils.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const identityClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/client/identityClient.js [app-route] (ecmascript)");
const regionalAuthority_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/regionalAuthority.js [app-route] (ecmascript)");
const logger_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/logger/dist/commonjs/index.js [app-route] (ecmascript)");
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
/**
 * The default logger used if no logger was passed in by the credential.
 */ const msalLogger = (0, logging_js_1.credentialLogger)("MsalClient");
/**
 * Generates the configuration for MSAL (Microsoft Authentication Library).
 *
 * @param clientId - The client ID of the application.
 * @param  tenantId - The tenant ID of the Azure Active Directory.
 * @param  msalClientOptions - Optional. Additional options for creating the MSAL client.
 * @returns  The MSAL configuration object.
 */ function generateMsalConfiguration(clientId, tenantId, msalClientOptions = {}) {
    const resolvedTenant = (0, tenantIdUtils_js_1.resolveTenantId)(msalClientOptions.logger ?? msalLogger, tenantId, clientId);
    // TODO: move and reuse getIdentityClientAuthorityHost
    const authority = (0, utils_js_1.getAuthority)(resolvedTenant, (0, utils_js_1.getAuthorityHost)(msalClientOptions));
    const httpClient = new identityClient_js_1.IdentityClient({
        ...msalClientOptions.tokenCredentialOptions,
        authorityHost: authority,
        loggingOptions: msalClientOptions.loggingOptions
    });
    const msalConfig = {
        auth: {
            clientId,
            authority,
            knownAuthorities: (0, utils_js_1.getKnownAuthorities)(resolvedTenant, authority, msalClientOptions.disableInstanceDiscovery)
        },
        system: {
            networkClient: httpClient,
            loggerOptions: {
                loggerCallback: (0, utils_js_1.defaultLoggerCallback)(msalClientOptions.logger ?? msalLogger),
                logLevel: (0, utils_js_1.getMSALLogLevel)((0, logger_1.getLogLevel)()),
                piiLoggingEnabled: msalClientOptions.loggingOptions?.enableUnsafeSupportLogging
            }
        }
    };
    return msalConfig;
}
/**
 * Creates an instance of the MSAL (Microsoft Authentication Library) client.
 *
 * @param clientId - The client ID of the application.
 * @param tenantId - The tenant ID of the Azure Active Directory.
 * @param createMsalClientOptions - Optional. Additional options for creating the MSAL client.
 * @returns An instance of the MSAL client.
 *
 * @public
 */ function createMsalClient(clientId, tenantId, createMsalClientOptions = {}) {
    const state = {
        msalConfig: generateMsalConfiguration(clientId, tenantId, createMsalClientOptions),
        cachedAccount: createMsalClientOptions.authenticationRecord ? (0, utils_js_1.publicToMsal)(createMsalClientOptions.authenticationRecord) : null,
        pluginConfiguration: msalPlugins_js_1.msalPlugins.generatePluginConfiguration(createMsalClientOptions),
        logger: createMsalClientOptions.logger ?? msalLogger
    };
    const publicApps = new Map();
    async function getPublicApp(options = {}) {
        const appKey = options.enableCae ? "CAE" : "default";
        let publicClientApp = publicApps.get(appKey);
        if (publicClientApp) {
            state.logger.getToken.info("Existing PublicClientApplication found in cache, returning it.");
            return publicClientApp;
        }
        // Initialize a new app and cache it
        state.logger.getToken.info(`Creating new PublicClientApplication with CAE ${options.enableCae ? "enabled" : "disabled"}.`);
        const cachePlugin = options.enableCae ? state.pluginConfiguration.cache.cachePluginCae : state.pluginConfiguration.cache.cachePlugin;
        state.msalConfig.auth.clientCapabilities = options.enableCae ? [
            "cp1"
        ] : undefined;
        publicClientApp = new msal.PublicClientApplication({
            ...state.msalConfig,
            broker: {
                nativeBrokerPlugin: state.pluginConfiguration.broker.nativeBrokerPlugin
            },
            cache: {
                cachePlugin: await cachePlugin
            }
        });
        publicApps.set(appKey, publicClientApp);
        return publicClientApp;
    }
    const confidentialApps = new Map();
    async function getConfidentialApp(options = {}) {
        const appKey = options.enableCae ? "CAE" : "default";
        let confidentialClientApp = confidentialApps.get(appKey);
        if (confidentialClientApp) {
            state.logger.getToken.info("Existing ConfidentialClientApplication found in cache, returning it.");
            return confidentialClientApp;
        }
        // Initialize a new app and cache it
        state.logger.getToken.info(`Creating new ConfidentialClientApplication with CAE ${options.enableCae ? "enabled" : "disabled"}.`);
        const cachePlugin = options.enableCae ? state.pluginConfiguration.cache.cachePluginCae : state.pluginConfiguration.cache.cachePlugin;
        state.msalConfig.auth.clientCapabilities = options.enableCae ? [
            "cp1"
        ] : undefined;
        confidentialClientApp = new msal.ConfidentialClientApplication({
            ...state.msalConfig,
            broker: {
                nativeBrokerPlugin: state.pluginConfiguration.broker.nativeBrokerPlugin
            },
            cache: {
                cachePlugin: await cachePlugin
            }
        });
        confidentialApps.set(appKey, confidentialClientApp);
        return confidentialClientApp;
    }
    async function getTokenSilent(app, scopes, options = {}) {
        if (state.cachedAccount === null) {
            state.logger.getToken.info("No cached account found in local state.");
            throw new errors_js_1.AuthenticationRequiredError({
                scopes
            });
        }
        // Keep track and reuse the claims we received across challenges
        if (options.claims) {
            state.cachedClaims = options.claims;
        }
        const silentRequest = {
            account: state.cachedAccount,
            scopes,
            claims: state.cachedClaims
        };
        if (state.pluginConfiguration.broker.isEnabled) {
            silentRequest.tokenQueryParameters ||= {};
            if (state.pluginConfiguration.broker.enableMsaPassthrough) {
                silentRequest.tokenQueryParameters["msal_request_type"] = "consumer_passthrough";
            }
        }
        if (options.proofOfPossessionOptions) {
            silentRequest.shrNonce = options.proofOfPossessionOptions.nonce;
            silentRequest.authenticationScheme = "pop";
            silentRequest.resourceRequestMethod = options.proofOfPossessionOptions.resourceRequestMethod;
            silentRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
        }
        state.logger.getToken.info("Attempting to acquire token silently");
        try {
            return await app.acquireTokenSilent(silentRequest);
        } catch (err) {
            throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
    }
    /**
     * Builds an authority URL for the given request. The authority may be different than the one used when creating the MSAL client
     * if the user is creating cross-tenant requests
     */ function calculateRequestAuthority(options) {
        if (options?.tenantId) {
            return (0, utils_js_1.getAuthority)(options.tenantId, (0, utils_js_1.getAuthorityHost)(createMsalClientOptions));
        }
        return state.msalConfig.auth.authority;
    }
    /**
     * Performs silent authentication using MSAL to acquire an access token.
     * If silent authentication fails, falls back to interactive authentication.
     *
     * @param msalApp - The MSAL application instance.
     * @param scopes - The scopes for which to acquire the access token.
     * @param options - The options for acquiring the access token.
     * @param onAuthenticationRequired - A callback function to handle interactive authentication when silent authentication fails.
     * @returns A promise that resolves to an AccessToken object containing the access token and its expiration timestamp.
     */ async function withSilentAuthentication(msalApp, scopes, options, onAuthenticationRequired) {
        let response = null;
        try {
            response = await getTokenSilent(msalApp, scopes, options);
        } catch (e) {
            if (e.name !== "AuthenticationRequiredError") {
                throw e;
            }
            if (options.disableAutomaticAuthentication) {
                throw new errors_js_1.AuthenticationRequiredError({
                    scopes,
                    getTokenOptions: options,
                    message: "Automatic authentication has been disabled. You may call the authentication() method."
                });
            }
        }
        // Silent authentication failed
        if (response === null) {
            try {
                response = await onAuthenticationRequired();
            } catch (err) {
                throw (0, utils_js_1.handleMsalError)(scopes, err, options);
            }
        }
        // At this point we should have a token, process it
        (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
        state.cachedAccount = response?.account ?? null;
        state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
        return {
            token: response.accessToken,
            expiresOnTimestamp: response.expiresOn.getTime(),
            refreshAfterTimestamp: response.refreshOn?.getTime(),
            tokenType: response.tokenType
        };
    }
    async function getTokenByClientSecret(scopes, clientSecret, options = {}) {
        state.logger.getToken.info(`Attempting to acquire token using client secret`);
        state.msalConfig.auth.clientSecret = clientSecret;
        const msalApp = await getConfidentialApp(options);
        try {
            const response = await msalApp.acquireTokenByClientCredential({
                scopes,
                authority: calculateRequestAuthority(options),
                azureRegion: (0, regionalAuthority_js_1.calculateRegionalAuthority)(),
                claims: options?.claims
            });
            (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
            state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
            return {
                token: response.accessToken,
                expiresOnTimestamp: response.expiresOn.getTime(),
                refreshAfterTimestamp: response.refreshOn?.getTime(),
                tokenType: response.tokenType
            };
        } catch (err) {
            throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
    }
    async function getTokenByClientAssertion(scopes, clientAssertion, options = {}) {
        state.logger.getToken.info(`Attempting to acquire token using client assertion`);
        state.msalConfig.auth.clientAssertion = clientAssertion;
        const msalApp = await getConfidentialApp(options);
        try {
            const response = await msalApp.acquireTokenByClientCredential({
                scopes,
                authority: calculateRequestAuthority(options),
                azureRegion: (0, regionalAuthority_js_1.calculateRegionalAuthority)(),
                claims: options?.claims,
                clientAssertion
            });
            (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
            state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
            return {
                token: response.accessToken,
                expiresOnTimestamp: response.expiresOn.getTime(),
                refreshAfterTimestamp: response.refreshOn?.getTime(),
                tokenType: response.tokenType
            };
        } catch (err) {
            throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
    }
    async function getTokenByClientCertificate(scopes, certificate, options = {}) {
        state.logger.getToken.info(`Attempting to acquire token using client certificate`);
        state.msalConfig.auth.clientCertificate = certificate;
        const msalApp = await getConfidentialApp(options);
        try {
            const response = await msalApp.acquireTokenByClientCredential({
                scopes,
                authority: calculateRequestAuthority(options),
                azureRegion: (0, regionalAuthority_js_1.calculateRegionalAuthority)(),
                claims: options?.claims
            });
            (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
            state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
            return {
                token: response.accessToken,
                expiresOnTimestamp: response.expiresOn.getTime(),
                refreshAfterTimestamp: response.refreshOn?.getTime(),
                tokenType: response.tokenType
            };
        } catch (err) {
            throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
    }
    async function getTokenByDeviceCode(scopes, deviceCodeCallback, options = {}) {
        state.logger.getToken.info(`Attempting to acquire token using device code`);
        const msalApp = await getPublicApp(options);
        return withSilentAuthentication(msalApp, scopes, options, ()=>{
            const requestOptions = {
                scopes,
                cancel: options?.abortSignal?.aborted ?? false,
                deviceCodeCallback,
                authority: calculateRequestAuthority(options),
                claims: options?.claims
            };
            const deviceCodeRequest = msalApp.acquireTokenByDeviceCode(requestOptions);
            if (options.abortSignal) {
                options.abortSignal.addEventListener("abort", ()=>{
                    requestOptions.cancel = true;
                });
            }
            return deviceCodeRequest;
        });
    }
    async function getTokenByUsernamePassword(scopes, username, password, options = {}) {
        state.logger.getToken.info(`Attempting to acquire token using username and password`);
        const msalApp = await getPublicApp(options);
        return withSilentAuthentication(msalApp, scopes, options, ()=>{
            const requestOptions = {
                scopes,
                username,
                password,
                authority: calculateRequestAuthority(options),
                claims: options?.claims
            };
            return msalApp.acquireTokenByUsernamePassword(requestOptions);
        });
    }
    function getActiveAccount() {
        if (!state.cachedAccount) {
            return undefined;
        }
        return (0, utils_js_1.msalToPublic)(clientId, state.cachedAccount);
    }
    async function getTokenByAuthorizationCode(scopes, redirectUri, authorizationCode, clientSecret, options = {}) {
        state.logger.getToken.info(`Attempting to acquire token using authorization code`);
        let msalApp;
        if (clientSecret) {
            // If a client secret is provided, we need to use a confidential client application
            // See https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow#request-an-access-token-with-a-client_secret
            state.msalConfig.auth.clientSecret = clientSecret;
            msalApp = await getConfidentialApp(options);
        } else {
            msalApp = await getPublicApp(options);
        }
        return withSilentAuthentication(msalApp, scopes, options, ()=>{
            return msalApp.acquireTokenByCode({
                scopes,
                redirectUri,
                code: authorizationCode,
                authority: calculateRequestAuthority(options),
                claims: options?.claims
            });
        });
    }
    async function getTokenOnBehalfOf(scopes, userAssertionToken, clientCredentials, options = {}) {
        msalLogger.getToken.info(`Attempting to acquire token on behalf of another user`);
        if (typeof clientCredentials === "string") {
            // Client secret
            msalLogger.getToken.info(`Using client secret for on behalf of flow`);
            state.msalConfig.auth.clientSecret = clientCredentials;
        } else if (typeof clientCredentials === "function") {
            // Client Assertion
            msalLogger.getToken.info(`Using client assertion callback for on behalf of flow`);
            state.msalConfig.auth.clientAssertion = clientCredentials;
        } else {
            // Client certificate
            msalLogger.getToken.info(`Using client certificate for on behalf of flow`);
            state.msalConfig.auth.clientCertificate = clientCredentials;
        }
        const msalApp = await getConfidentialApp(options);
        try {
            const response = await msalApp.acquireTokenOnBehalfOf({
                scopes,
                authority: calculateRequestAuthority(options),
                claims: options.claims,
                oboAssertion: userAssertionToken
            });
            (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
            msalLogger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
            return {
                token: response.accessToken,
                expiresOnTimestamp: response.expiresOn.getTime(),
                refreshAfterTimestamp: response.refreshOn?.getTime(),
                tokenType: response.tokenType
            };
        } catch (err) {
            throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
    }
    /**
     * Creates a base interactive request configuration for MSAL interactive authentication.
     * This is shared between interactive and brokered authentication flows.
     *
     * @internal
     */ function createBaseInteractiveRequest(scopes, options) {
        return {
            openBrowser: async (url)=>{
                const open = await __turbopack_context__.A("[project]/Downloads/mrpii 2/node_modules/open/index.js [app-route] (ecmascript, async loader)");
                await open.default(url, {
                    newInstance: true
                });
            },
            scopes,
            authority: calculateRequestAuthority(options),
            claims: options?.claims,
            loginHint: options?.loginHint,
            errorTemplate: options?.browserCustomizationOptions?.errorMessage,
            successTemplate: options?.browserCustomizationOptions?.successMessage,
            prompt: options?.loginHint ? "login" : "select_account"
        };
    }
    /**
     * @internal
     */ async function getBrokeredTokenInternal(scopes, useDefaultBrokerAccount, options = {}) {
        msalLogger.verbose("Authentication will resume through the broker");
        const app = await getPublicApp(options);
        const interactiveRequest = createBaseInteractiveRequest(scopes, options);
        if (state.pluginConfiguration.broker.parentWindowHandle) {
            interactiveRequest.windowHandle = Buffer.from(state.pluginConfiguration.broker.parentWindowHandle);
        } else {
            // this is a bug, as the pluginConfiguration handler should validate this case.
            msalLogger.warning("Parent window handle is not specified for the broker. This may cause unexpected behavior. Please provide the parentWindowHandle.");
        }
        if (state.pluginConfiguration.broker.enableMsaPassthrough) {
            (interactiveRequest.tokenQueryParameters ??= {})["msal_request_type"] = "consumer_passthrough";
        }
        if (useDefaultBrokerAccount) {
            interactiveRequest.prompt = "none";
            msalLogger.verbose("Attempting broker authentication using the default broker account");
        } else {
            msalLogger.verbose("Attempting broker authentication without the default broker account");
        }
        if (options.proofOfPossessionOptions) {
            interactiveRequest.shrNonce = options.proofOfPossessionOptions.nonce;
            interactiveRequest.authenticationScheme = "pop";
            interactiveRequest.resourceRequestMethod = options.proofOfPossessionOptions.resourceRequestMethod;
            interactiveRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
        }
        try {
            return await app.acquireTokenInteractive(interactiveRequest);
        } catch (e) {
            msalLogger.verbose(`Failed to authenticate through the broker: ${e.message}`);
            if (options.disableAutomaticAuthentication) {
                throw new errors_js_1.AuthenticationRequiredError({
                    scopes,
                    getTokenOptions: options,
                    message: "Cannot silently authenticate with default broker account."
                });
            }
            // If we tried to use the default broker account and failed, fall back to interactive authentication
            if (useDefaultBrokerAccount) {
                return getBrokeredTokenInternal(scopes, false, options);
            } else {
                throw e;
            }
        }
    }
    /**
     * A helper function that supports brokered authentication through the MSAL's public application.
     *
     * When useDefaultBrokerAccount is true, the method will attempt to authenticate using the default broker account.
     * If the default broker account is not available, the method will fall back to interactive authentication.
     */ async function getBrokeredToken(scopes, useDefaultBrokerAccount, options = {}) {
        msalLogger.getToken.info(`Attempting to acquire token using brokered authentication with useDefaultBrokerAccount: ${useDefaultBrokerAccount}`);
        const response = await getBrokeredTokenInternal(scopes, useDefaultBrokerAccount, options);
        (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
        state.cachedAccount = response?.account ?? null;
        state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
        return {
            token: response.accessToken,
            expiresOnTimestamp: response.expiresOn.getTime(),
            refreshAfterTimestamp: response.refreshOn?.getTime(),
            tokenType: response.tokenType
        };
    }
    async function getTokenByInteractiveRequest(scopes, options = {}) {
        msalLogger.getToken.info(`Attempting to acquire token interactively`);
        const app = await getPublicApp(options);
        return withSilentAuthentication(app, scopes, options, async ()=>{
            const interactiveRequest = createBaseInteractiveRequest(scopes, options);
            if (state.pluginConfiguration.broker.isEnabled) {
                return getBrokeredTokenInternal(scopes, state.pluginConfiguration.broker.useDefaultBrokerAccount ?? false, options);
            }
            if (options.proofOfPossessionOptions) {
                interactiveRequest.shrNonce = options.proofOfPossessionOptions.nonce;
                interactiveRequest.authenticationScheme = "pop";
                interactiveRequest.resourceRequestMethod = options.proofOfPossessionOptions.resourceRequestMethod;
                interactiveRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
            }
            return app.acquireTokenInteractive(interactiveRequest);
        });
    }
    return {
        getActiveAccount,
        getBrokeredToken,
        getTokenByClientSecret,
        getTokenByClientAssertion,
        getTokenByClientCertificate,
        getTokenByDeviceCode,
        getTokenByUsernamePassword,
        getTokenByAuthorizationCode,
        getTokenOnBehalfOf,
        getTokenByInteractiveRequest
    };
} //# sourceMappingURL=msalClient.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/clientCertificateCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClientCertificateCredential = void 0;
exports.parseCertificate = parseCertificate;
const msalClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalClient.js [app-route] (ecmascript)");
const node_crypto_1 = __turbopack_context__.r("[externals]/node:crypto [external] (node:crypto, cjs)");
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const promises_1 = __turbopack_context__.r("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const credentialName = "ClientCertificateCredential";
const logger = (0, logging_js_1.credentialLogger)(credentialName);
/**
 * Enables authentication to Microsoft Entra ID using a PEM-encoded
 * certificate that is assigned to an App Registration. More information
 * on how to configure certificate authentication can be found here:
 *
 * https://learn.microsoft.com/azure/active-directory/develop/active-directory-certificate-credentials#register-your-certificate-with-azure-ad
 *
 */ class ClientCertificateCredential {
    tenantId;
    additionallyAllowedTenantIds;
    certificateConfiguration;
    sendCertificateChain;
    msalClient;
    constructor(tenantId, clientId, certificatePathOrConfiguration, options = {}){
        if (!tenantId || !clientId) {
            throw new Error(`${credentialName}: tenantId and clientId are required parameters.`);
        }
        this.tenantId = tenantId;
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        this.sendCertificateChain = options.sendCertificateChain;
        this.certificateConfiguration = {
            ...typeof certificatePathOrConfiguration === "string" ? {
                certificatePath: certificatePathOrConfiguration
            } : certificatePathOrConfiguration
        };
        const certificate = this.certificateConfiguration.certificate;
        const certificatePath = this.certificateConfiguration.certificatePath;
        if (!this.certificateConfiguration || !(certificate || certificatePath)) {
            throw new Error(`${credentialName}: Provide either a PEM certificate in string form, or the path to that certificate in the filesystem. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
        }
        if (certificate && certificatePath) {
            throw new Error(`${credentialName}: To avoid unexpected behaviors, providing both the contents of a PEM certificate and the path to a PEM certificate is forbidden. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
        }
        this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, tenantId, {
            ...options,
            logger,
            tokenCredentialOptions: options
        });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${credentialName}.getToken`, options, async (newOptions)=>{
            newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
            const arrayScopes = Array.isArray(scopes) ? scopes : [
                scopes
            ];
            const certificate = await this.buildClientCertificate();
            return this.msalClient.getTokenByClientCertificate(arrayScopes, certificate, newOptions);
        });
    }
    async buildClientCertificate() {
        const parts = await parseCertificate(this.certificateConfiguration, this.sendCertificateChain ?? false);
        let privateKey;
        if (this.certificateConfiguration.certificatePassword !== undefined) {
            privateKey = (0, node_crypto_1.createPrivateKey)({
                key: parts.certificateContents,
                passphrase: this.certificateConfiguration.certificatePassword,
                format: "pem"
            }).export({
                format: "pem",
                type: "pkcs8"
            }).toString();
        } else {
            privateKey = parts.certificateContents;
        }
        return {
            thumbprint: parts.thumbprint,
            thumbprintSha256: parts.thumbprintSha256,
            privateKey,
            x5c: parts.x5c
        };
    }
}
exports.ClientCertificateCredential = ClientCertificateCredential;
/**
 * Parses a certificate into its relevant parts
 *
 * @param certificateConfiguration - The certificate contents or path to the certificate
 * @param sendCertificateChain - true if the entire certificate chain should be sent for SNI, false otherwise
 * @returns The parsed certificate parts and the certificate contents
 */ async function parseCertificate(certificateConfiguration, sendCertificateChain) {
    const certificate = certificateConfiguration.certificate;
    const certificatePath = certificateConfiguration.certificatePath;
    const certificateContents = certificate || await (0, promises_1.readFile)(certificatePath, "utf8");
    const x5c = sendCertificateChain ? certificateContents : undefined;
    const certificatePattern = /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g;
    const publicKeys = [];
    // Match all possible certificates, in the order they are in the file. These will form the chain that is used for x5c
    let match;
    do {
        match = certificatePattern.exec(certificateContents);
        if (match) {
            publicKeys.push(match[3]);
        }
    }while (match)
    if (publicKeys.length === 0) {
        throw new Error("The file at the specified path does not contain a PEM-encoded certificate.");
    }
    const thumbprint = (0, node_crypto_1.createHash)("sha1") // CodeQL [SM04514] Needed for backward compatibility reason
    .update(Buffer.from(publicKeys[0], "base64")).digest("hex").toUpperCase();
    const thumbprintSha256 = (0, node_crypto_1.createHash)("sha256").update(Buffer.from(publicKeys[0], "base64")).digest("hex").toUpperCase();
    return {
        certificateContents,
        thumbprintSha256,
        thumbprint,
        x5c
    };
} //# sourceMappingURL=clientCertificateCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureScopes = ensureScopes;
exports.ensureValidScopeForDevTimeCreds = ensureValidScopeForDevTimeCreds;
exports.getScopeResource = getScopeResource;
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
/**
 * Ensures the scopes value is an array.
 * @internal
 */ function ensureScopes(scopes) {
    return Array.isArray(scopes) ? scopes : [
        scopes
    ];
}
/**
 * Throws if the received scope is not valid.
 * @internal
 */ function ensureValidScopeForDevTimeCreds(scope, logger) {
    if (!scope.match(/^[0-9a-zA-Z-_.:/]+$/)) {
        const error = new Error("Invalid scope was specified by the user or calling client");
        logger.getToken.info((0, logging_js_1.formatError)(scope, error));
        throw error;
    }
}
/**
 * Returns the resource out of a scope.
 * @internal
 */ function getScopeResource(scope) {
    return scope.replace(/\/.default$/, "");
} //# sourceMappingURL=scopeUtils.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/clientSecretCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClientSecretCredential = void 0;
const msalClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalClient.js [app-route] (ecmascript)");
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const scopeUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("ClientSecretCredential");
/**
 * Enables authentication to Microsoft Entra ID using a client secret
 * that was generated for an App Registration. More information on how
 * to configure a client secret can be found here:
 *
 * https://learn.microsoft.com/entra/identity-platform/quickstart-configure-app-access-web-apis#add-credentials-to-your-web-application
 *
 */ class ClientSecretCredential {
    tenantId;
    additionallyAllowedTenantIds;
    msalClient;
    clientSecret;
    /**
     * Creates an instance of the ClientSecretCredential with the details
     * needed to authenticate against Microsoft Entra ID with a client
     * secret.
     *
     * @param tenantId - The Microsoft Entra tenant (directory) ID.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param clientSecret - A client secret that was generated for the App Registration.
     * @param options - Options for configuring the client which makes the authentication request.
     */ constructor(tenantId, clientId, clientSecret, options = {}){
        if (!tenantId) {
            throw new errors_js_1.CredentialUnavailableError("ClientSecretCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
        }
        if (!clientId) {
            throw new errors_js_1.CredentialUnavailableError("ClientSecretCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
        }
        if (!clientSecret) {
            throw new errors_js_1.CredentialUnavailableError("ClientSecretCredential: clientSecret is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
        }
        this.clientSecret = clientSecret;
        this.tenantId = tenantId;
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, tenantId, {
            ...options,
            logger,
            tokenCredentialOptions: options
        });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions)=>{
            newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
            const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
            return this.msalClient.getTokenByClientSecret(arrayScopes, this.clientSecret, newOptions);
        });
    }
}
exports.ClientSecretCredential = ClientSecretCredential; //# sourceMappingURL=clientSecretCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/usernamePasswordCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UsernamePasswordCredential = void 0;
const msalClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalClient.js [app-route] (ecmascript)");
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const scopeUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("UsernamePasswordCredential");
/**
 * Enables authentication to Microsoft Entra ID with a user's
 * username and password. This credential requires a high degree of
 * trust so you should only use it when other, more secure credential
 * types can't be used.
 * @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details.
 */ class UsernamePasswordCredential {
    tenantId;
    additionallyAllowedTenantIds;
    msalClient;
    username;
    password;
    /**
     * Creates an instance of the UsernamePasswordCredential with the details
     * needed to authenticate against Microsoft Entra ID with a username
     * and password.
     *
     * @param tenantId - The Microsoft Entra tenant (directory).
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param username - The user account's e-mail address (user name).
     * @param password - The user account's account password
     * @param options - Options for configuring the client which makes the authentication request.
     */ constructor(tenantId, clientId, username, password, options = {}){
        if (!tenantId) {
            throw new errors_js_1.CredentialUnavailableError("UsernamePasswordCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
        }
        if (!clientId) {
            throw new errors_js_1.CredentialUnavailableError("UsernamePasswordCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
        }
        if (!username) {
            throw new errors_js_1.CredentialUnavailableError("UsernamePasswordCredential: username is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
        }
        if (!password) {
            throw new errors_js_1.CredentialUnavailableError("UsernamePasswordCredential: password is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
        }
        this.tenantId = tenantId;
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        this.username = username;
        this.password = password;
        this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, this.tenantId, {
            ...options,
            tokenCredentialOptions: options ?? {}
        });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * If the user provided the option `disableAutomaticAuthentication`,
     * once the token can't be retrieved silently,
     * this method won't attempt to request user interaction to retrieve the token.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions)=>{
            newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
            const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
            return this.msalClient.getTokenByUsernamePassword(arrayScopes, this.username, this.password, newOptions);
        });
    }
}
exports.UsernamePasswordCredential = UsernamePasswordCredential; //# sourceMappingURL=usernamePasswordCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/environmentCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EnvironmentCredential = exports.AllSupportedEnvironmentVariables = void 0;
exports.getSendCertificateChain = getSendCertificateChain;
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const clientCertificateCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/clientCertificateCredential.js [app-route] (ecmascript)");
const clientSecretCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/clientSecretCredential.js [app-route] (ecmascript)");
const usernamePasswordCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/usernamePasswordCredential.js [app-route] (ecmascript)");
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
/**
 * Contains the list of all supported environment variable names so that an
 * appropriate error message can be generated when no credentials can be
 * configured.
 *
 * @internal
 */ exports.AllSupportedEnvironmentVariables = [
    "AZURE_TENANT_ID",
    "AZURE_CLIENT_ID",
    "AZURE_CLIENT_SECRET",
    "AZURE_CLIENT_CERTIFICATE_PATH",
    "AZURE_CLIENT_CERTIFICATE_PASSWORD",
    "AZURE_USERNAME",
    "AZURE_PASSWORD",
    "AZURE_ADDITIONALLY_ALLOWED_TENANTS",
    "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN"
];
function getAdditionallyAllowedTenants() {
    const additionallyAllowedValues = process.env.AZURE_ADDITIONALLY_ALLOWED_TENANTS ?? "";
    return additionallyAllowedValues.split(";");
}
const credentialName = "EnvironmentCredential";
const logger = (0, logging_js_1.credentialLogger)(credentialName);
function getSendCertificateChain() {
    const sendCertificateChain = (process.env.AZURE_CLIENT_SEND_CERTIFICATE_CHAIN ?? "").toLowerCase();
    const result = sendCertificateChain === "true" || sendCertificateChain === "1";
    logger.verbose(`AZURE_CLIENT_SEND_CERTIFICATE_CHAIN: ${process.env.AZURE_CLIENT_SEND_CERTIFICATE_CHAIN}; sendCertificateChain: ${result}`);
    return result;
}
/**
 * Enables authentication to Microsoft Entra ID using a client secret or certificate.
 */ class EnvironmentCredential {
    _credential = undefined;
    /**
     * Creates an instance of the EnvironmentCredential class and decides what credential to use depending on the available environment variables.
     *
     * Required environment variables:
     * - `AZURE_TENANT_ID`: The Microsoft Entra tenant (directory) ID.
     * - `AZURE_CLIENT_ID`: The client (application) ID of an App Registration in the tenant.
     *
     * If setting the AZURE_TENANT_ID, then you can also set the additionally allowed tenants
     * - `AZURE_ADDITIONALLY_ALLOWED_TENANTS`: For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens with a single semicolon delimited string. Use * to allow all tenants.
     *
     * Environment variables used for client credential authentication:
     * - `AZURE_CLIENT_SECRET`: A client secret that was generated for the App Registration.
     * - `AZURE_CLIENT_CERTIFICATE_PATH`: The path to a PEM certificate to use during the authentication, instead of the client secret.
     * - `AZURE_CLIENT_CERTIFICATE_PASSWORD`: (optional) password for the certificate file.
     * - `AZURE_CLIENT_SEND_CERTIFICATE_CHAIN`: (optional) indicates that the certificate chain should be set in x5c header to support subject name / issuer based authentication.
     *
     * Username and password authentication is deprecated, since it doesn't support multifactor authentication (MFA). See https://aka.ms/azsdk/identity/mfa for more details. Users can still provide environment variables for this authentication method:
     * - `AZURE_USERNAME`: Username to authenticate with.
     * - `AZURE_PASSWORD`: Password to authenticate with.
     *
     * If the environment variables required to perform the authentication are missing, a {@link CredentialUnavailableError} will be thrown.
     * If the authentication fails, or if there's an unknown error, an {@link AuthenticationError} will be thrown.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */ constructor(options){
        // Keep track of any missing environment variables for error details
        const assigned = (0, logging_js_1.processEnvVars)(exports.AllSupportedEnvironmentVariables).assigned.join(", ");
        logger.info(`Found the following environment variables: ${assigned}`);
        const tenantId = process.env.AZURE_TENANT_ID, clientId = process.env.AZURE_CLIENT_ID, clientSecret = process.env.AZURE_CLIENT_SECRET;
        const additionallyAllowedTenantIds = getAdditionallyAllowedTenants();
        const sendCertificateChain = getSendCertificateChain();
        const newOptions = {
            ...options,
            additionallyAllowedTenantIds,
            sendCertificateChain
        };
        if (tenantId) {
            (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
        }
        if (tenantId && clientId && clientSecret) {
            logger.info(`Invoking ClientSecretCredential with tenant ID: ${tenantId}, clientId: ${clientId} and clientSecret: [REDACTED]`);
            this._credential = new clientSecretCredential_js_1.ClientSecretCredential(tenantId, clientId, clientSecret, newOptions);
            return;
        }
        const certificatePath = process.env.AZURE_CLIENT_CERTIFICATE_PATH;
        const certificatePassword = process.env.AZURE_CLIENT_CERTIFICATE_PASSWORD;
        if (tenantId && clientId && certificatePath) {
            logger.info(`Invoking ClientCertificateCredential with tenant ID: ${tenantId}, clientId: ${clientId} and certificatePath: ${certificatePath}`);
            this._credential = new clientCertificateCredential_js_1.ClientCertificateCredential(tenantId, clientId, {
                certificatePath,
                certificatePassword
            }, newOptions);
            return;
        }
        const username = process.env.AZURE_USERNAME;
        const password = process.env.AZURE_PASSWORD;
        if (tenantId && clientId && username && password) {
            logger.info(`Invoking UsernamePasswordCredential with tenant ID: ${tenantId}, clientId: ${clientId} and username: ${username}`);
            logger.warning("Environment is configured to use username and password authentication. This authentication method is deprecated, as it doesn't support multifactor authentication (MFA). Use a more secure credential. For more details, see https://aka.ms/azsdk/identity/mfa.");
            this._credential = new usernamePasswordCredential_js_1.UsernamePasswordCredential(tenantId, clientId, username, password, newOptions);
        }
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - Optional parameters. See {@link GetTokenOptions}.
     */ async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${credentialName}.getToken`, options, async (newOptions)=>{
            if (this._credential) {
                try {
                    const result = await this._credential.getToken(scopes, newOptions);
                    logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
                    return result;
                } catch (err) {
                    const authenticationError = new errors_js_1.AuthenticationError(400, {
                        error: `${credentialName} authentication failed. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`,
                        error_description: err.message.toString().split("More details:").join("")
                    });
                    logger.getToken.info((0, logging_js_1.formatError)(scopes, authenticationError));
                    throw authenticationError;
                }
            }
            throw new errors_js_1.CredentialUnavailableError(`${credentialName} is unavailable. No underlying credential could be used. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`);
        });
    }
}
exports.EnvironmentCredential = EnvironmentCredential; //# sourceMappingURL=environmentCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/imdsRetryPolicy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imdsRetryPolicy = imdsRetryPolicy;
const core_rest_pipeline_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/index.js [app-route] (ecmascript)");
const core_util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)");
// Matches the default retry configuration in expontentialRetryStrategy.ts
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 64;
// For 410 responses, we need at least 70 seconds total retry duration
// With 5 retries using exponential backoff: delays of d, 2d, 4d, 8d, 16d sum to 31d
// Accounting for jitter (which can reduce delays by 20%), we need 31d * 0.8 >= 70
// So we need d >= 70/24.8 = 2.82 seconds. Using 3 seconds to be safe.
const MIN_DELAY_FOR_410_MS = 3000;
/**
 * An additional policy that retries on 404 and 410 errors. The default retry policy does not retry on
 * 404s or 410s, but the IMDS endpoint can return these when the token is not yet available or when
 * the identity is still being set up. This policy will retry on 404s and 410s with an exponential backoff.
 * For 410 responses, it uses a minimum 3-second initial delay to ensure at least 70 seconds total duration.
 *
 * @param msiRetryConfig - The retry configuration for the MSI credential.
 * @returns - The policy that will retry on 404s and 410s.
 */ function imdsRetryPolicy(msiRetryConfig) {
    return (0, core_rest_pipeline_1.retryPolicy)([
        {
            name: "imdsRetryPolicy",
            retry: ({ retryCount, response })=>{
                if (response?.status !== 404 && response?.status !== 410) {
                    return {
                        skipStrategy: true
                    };
                }
                // For 410 responses, use a minimum 3-second delay to ensure at least 70 seconds total retry duration
                const initialDelayMs = response?.status === 410 ? Math.max(MIN_DELAY_FOR_410_MS, msiRetryConfig.startDelayInMs) : msiRetryConfig.startDelayInMs;
                return (0, core_util_1.calculateRetryDelay)(retryCount, {
                    retryDelayInMs: initialDelayMs,
                    maxRetryDelayInMs: DEFAULT_CLIENT_MAX_RETRY_INTERVAL
                });
            }
        }
    ], {
        maxRetries: msiRetryConfig.maxRetries
    });
} //# sourceMappingURL=imdsRetryPolicy.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/imdsMsi.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imdsMsi = void 0;
const core_rest_pipeline_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/index.js [app-route] (ecmascript)");
const core_util_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-util/dist/commonjs/index.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/utils.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const msiName = "ManagedIdentityCredential - IMDS";
const logger = (0, logging_js_1.credentialLogger)(msiName);
const imdsHost = "http://169.254.169.254";
const imdsEndpointPath = "/metadata/identity/oauth2/token";
/**
 * Generates an invalid request options to get a response quickly from IMDS endpoint.
 * The response indicates the availability of IMSD service; otherwise the request would time out.
 */ function prepareInvalidRequestOptions(scopes) {
    const resource = (0, utils_js_1.mapScopesToResource)(scopes);
    if (!resource) {
        throw new Error(`${msiName}: Multiple scopes are not supported.`);
    }
    // Pod Identity will try to process this request even if the Metadata header is missing.
    // We can exclude the request query to ensure no IMDS endpoint tries to process the ping request.
    const url = new URL(imdsEndpointPath, process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST ?? imdsHost);
    const rawHeaders = {
        Accept: "application/json"
    };
    return {
        // intentionally not including any query
        url: `${url}`,
        method: "GET",
        headers: (0, core_rest_pipeline_1.createHttpHeaders)(rawHeaders)
    };
}
/**
 * Defines how to determine whether the Azure IMDS MSI is available.
 *
 * Actually getting the token once we determine IMDS is available is handled by MSAL.
 */ exports.imdsMsi = {
    name: "imdsMsi",
    async isAvailable (options) {
        const { scopes, identityClient, getTokenOptions } = options;
        const resource = (0, utils_js_1.mapScopesToResource)(scopes);
        if (!resource) {
            logger.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
            return false;
        }
        // if the PodIdentityEndpoint environment variable was set no need to probe the endpoint, it can be assumed to exist
        if (process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) {
            return true;
        }
        if (!identityClient) {
            throw new Error("Missing IdentityClient");
        }
        const requestOptions = prepareInvalidRequestOptions(resource);
        return tracing_js_1.tracingClient.withSpan("ManagedIdentityCredential-pingImdsEndpoint", getTokenOptions ?? {}, async (updatedOptions)=>{
            requestOptions.tracingOptions = updatedOptions.tracingOptions;
            // Create a request with a timeout since we expect that
            // not having a "Metadata" header should cause an error to be
            // returned quickly from the endpoint, proving its availability.
            const request = (0, core_rest_pipeline_1.createPipelineRequest)(requestOptions);
            // Default to 1000 if the default of 0 is used.
            // Negative values can still be used to disable the timeout.
            request.timeout = updatedOptions.requestOptions?.timeout || 1000;
            // This MSI uses the imdsEndpoint to get the token, which only uses http://
            request.allowInsecureConnection = true;
            let response;
            try {
                logger.info(`${msiName}: Pinging the Azure IMDS endpoint`);
                response = await identityClient.sendRequest(request);
            } catch (err) {
                // If the request failed, or Node.js was unable to establish a connection,
                // or the host was down, we'll assume the IMDS endpoint isn't available.
                if ((0, core_util_1.isError)(err)) {
                    logger.verbose(`${msiName}: Caught error ${err.name}: ${err.message}`);
                }
                // This is a special case for Docker Desktop which responds with a 403 with a message that contains "A socket operation was attempted to an unreachable network" or "A socket operation was attempted to an unreachable host"
                // rather than just timing out, as expected.
                logger.info(`${msiName}: The Azure IMDS endpoint is unavailable`);
                return false;
            }
            if (response.status === 403) {
                if (response.bodyAsText?.includes("unreachable")) {
                    logger.info(`${msiName}: The Azure IMDS endpoint is unavailable`);
                    logger.info(`${msiName}: ${response.bodyAsText}`);
                    return false;
                }
            }
            // If we received any response, the endpoint is available
            logger.info(`${msiName}: The Azure IMDS endpoint is available`);
            return true;
        });
    }
}; //# sourceMappingURL=imdsMsi.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/clientAssertionCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClientAssertionCredential = void 0;
const msalClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalClient.js [app-route] (ecmascript)");
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("ClientAssertionCredential");
/**
 * Authenticates a service principal with a JWT assertion.
 */ class ClientAssertionCredential {
    msalClient;
    tenantId;
    additionallyAllowedTenantIds;
    getAssertion;
    options;
    /**
     * Creates an instance of the ClientAssertionCredential with the details
     * needed to authenticate against Microsoft Entra ID with a client
     * assertion provided by the developer through the `getAssertion` function parameter.
     *
     * @param tenantId - The Microsoft Entra tenant (directory) ID.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param getAssertion - A function that retrieves the assertion for the credential to use.
     * @param options - Options for configuring the client which makes the authentication request.
     */ constructor(tenantId, clientId, getAssertion, options = {}){
        if (!tenantId) {
            throw new errors_js_1.CredentialUnavailableError("ClientAssertionCredential: tenantId is a required parameter.");
        }
        if (!clientId) {
            throw new errors_js_1.CredentialUnavailableError("ClientAssertionCredential: clientId is a required parameter.");
        }
        if (!getAssertion) {
            throw new errors_js_1.CredentialUnavailableError("ClientAssertionCredential: clientAssertion is a required parameter.");
        }
        this.tenantId = tenantId;
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        this.options = options;
        this.getAssertion = getAssertion;
        this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, tenantId, {
            ...options,
            logger,
            tokenCredentialOptions: this.options
        });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions)=>{
            newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
            const arrayScopes = Array.isArray(scopes) ? scopes : [
                scopes
            ];
            return this.msalClient.getTokenByClientAssertion(arrayScopes, this.getAssertion, newOptions);
        });
    }
}
exports.ClientAssertionCredential = ClientAssertionCredential; //# sourceMappingURL=clientAssertionCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/workloadIdentityCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WorkloadIdentityCredential = exports.SupportedWorkloadEnvironmentVariables = void 0;
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const clientAssertionCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/clientAssertionCredential.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const promises_1 = __turbopack_context__.r("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
const credentialName = "WorkloadIdentityCredential";
/**
 * Contains the list of all supported environment variable names so that an
 * appropriate error message can be generated when no credentials can be
 * configured.
 *
 * @internal
 */ exports.SupportedWorkloadEnvironmentVariables = [
    "AZURE_TENANT_ID",
    "AZURE_CLIENT_ID",
    "AZURE_FEDERATED_TOKEN_FILE"
];
const logger = (0, logging_js_1.credentialLogger)(credentialName);
/**
 * Workload Identity authentication is a feature in Azure that allows applications running on virtual machines (VMs)
 * to access other Azure resources without the need for a service principal or managed identity. With Workload Identity
 * authentication, applications authenticate themselves using their own identity, rather than using a shared service
 * principal or managed identity. Under the hood, Workload Identity authentication uses the concept of Service Account
 * Credentials (SACs), which are automatically created by Azure and stored securely in the VM. By using Workload
 * Identity authentication, you can avoid the need to manage and rotate service principals or managed identities for
 * each application on each VM. Additionally, because SACs are created automatically and managed by Azure, you don't
 * need to worry about storing and securing sensitive credentials themselves.
 * The WorkloadIdentityCredential supports Microsoft Entra Workload ID authentication on Azure Kubernetes and acquires
 * a token using the SACs available in the Azure Kubernetes environment.
 * Refer to <a href="https://learn.microsoft.com/azure/aks/workload-identity-overview">Microsoft Entra
 * Workload ID</a> for more information.
 */ class WorkloadIdentityCredential {
    client;
    azureFederatedTokenFileContent = undefined;
    cacheDate = undefined;
    federatedTokenFilePath;
    /**
     * WorkloadIdentityCredential supports Microsoft Entra Workload ID on Kubernetes.
     *
     * @param options - The identity client options to use for authentication.
     */ constructor(options){
        // Logging environment variables for error details
        const assignedEnv = (0, logging_js_1.processEnvVars)(exports.SupportedWorkloadEnvironmentVariables).assigned.join(", ");
        logger.info(`Found the following environment variables: ${assignedEnv}`);
        const workloadIdentityCredentialOptions = options ?? {};
        const tenantId = workloadIdentityCredentialOptions.tenantId || process.env.AZURE_TENANT_ID;
        const clientId = workloadIdentityCredentialOptions.clientId || process.env.AZURE_CLIENT_ID;
        this.federatedTokenFilePath = workloadIdentityCredentialOptions.tokenFilePath || process.env.AZURE_FEDERATED_TOKEN_FILE;
        if (tenantId) {
            (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
        }
        if (!clientId) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. clientId is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_CLIENT_ID".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
        }
        if (!tenantId) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. tenantId is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_TENANT_ID".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
        }
        if (!this.federatedTokenFilePath) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. federatedTokenFilePath is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_FEDERATED_TOKEN_FILE".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
        }
        logger.info(`Invoking ClientAssertionCredential with tenant ID: ${tenantId}, clientId: ${workloadIdentityCredentialOptions.clientId} and federated token path: [REDACTED]`);
        this.client = new clientAssertionCredential_js_1.ClientAssertionCredential(tenantId, clientId, this.readFileContents.bind(this), options);
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options) {
        if (!this.client) {
            const errorMessage = `${credentialName}: is unavailable. tenantId, clientId, and federatedTokenFilePath are required parameters. 
      In DefaultAzureCredential and ManagedIdentityCredential, these can be provided as environment variables - 
      "AZURE_TENANT_ID",
      "AZURE_CLIENT_ID",
      "AZURE_FEDERATED_TOKEN_FILE". See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`;
            logger.info(errorMessage);
            throw new errors_js_1.CredentialUnavailableError(errorMessage);
        }
        logger.info("Invoking getToken() of Client Assertion Credential");
        return this.client.getToken(scopes, options);
    }
    async readFileContents() {
        // Cached assertions expire after 5 minutes
        if (this.cacheDate !== undefined && Date.now() - this.cacheDate >= 1000 * 60 * 5) {
            this.azureFederatedTokenFileContent = undefined;
        }
        if (!this.federatedTokenFilePath) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. Invalid file path provided ${this.federatedTokenFilePath}.`);
        }
        if (!this.azureFederatedTokenFileContent) {
            const file = await (0, promises_1.readFile)(this.federatedTokenFilePath, "utf8");
            const value = file.trim();
            if (!value) {
                throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. No content on the file ${this.federatedTokenFilePath}.`);
            } else {
                this.azureFederatedTokenFileContent = value;
                this.cacheDate = Date.now();
            }
        }
        return this.azureFederatedTokenFileContent;
    }
}
exports.WorkloadIdentityCredential = WorkloadIdentityCredential; //# sourceMappingURL=workloadIdentityCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/tokenExchangeMsi.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tokenExchangeMsi = void 0;
const workloadIdentityCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/workloadIdentityCredential.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const msiName = "ManagedIdentityCredential - Token Exchange";
const logger = (0, logging_js_1.credentialLogger)(msiName);
/**
 * Defines how to determine whether the token exchange MSI is available, and also how to retrieve a token from the token exchange MSI.
 *
 * Token exchange MSI (used by AKS) is the only MSI implementation handled entirely by Azure Identity.
 * The rest have been migrated to MSAL.
 */ exports.tokenExchangeMsi = {
    name: "tokenExchangeMsi",
    async isAvailable (clientId) {
        const env = process.env;
        const result = Boolean((clientId || env.AZURE_CLIENT_ID) && env.AZURE_TENANT_ID && process.env.AZURE_FEDERATED_TOKEN_FILE);
        if (!result) {
            logger.info(`${msiName}: Unavailable. The environment variables needed are: AZURE_CLIENT_ID (or the client ID sent through the parameters), AZURE_TENANT_ID and AZURE_FEDERATED_TOKEN_FILE`);
        }
        return result;
    },
    async getToken (configuration, getTokenOptions = {}) {
        const { scopes, clientId } = configuration;
        const identityClientTokenCredentialOptions = {};
        const workloadIdentityCredential = new workloadIdentityCredential_js_1.WorkloadIdentityCredential({
            clientId,
            tenantId: process.env.AZURE_TENANT_ID,
            tokenFilePath: process.env.AZURE_FEDERATED_TOKEN_FILE,
            ...identityClientTokenCredentialOptions,
            disableInstanceDiscovery: true
        });
        return workloadIdentityCredential.getToken(scopes, getTokenOptions);
    }
}; //# sourceMappingURL=tokenExchangeMsi.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ManagedIdentityCredential = void 0;
const logger_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/logger/dist/commonjs/index.js [app-route] (ecmascript)");
const msal_node_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/msal-node/lib/msal-node.cjs [app-route] (ecmascript)");
const identityClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/client/identityClient.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/utils.js [app-route] (ecmascript)");
const imdsRetryPolicy_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/imdsRetryPolicy.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const imdsMsi_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/imdsMsi.js [app-route] (ecmascript)");
const tokenExchangeMsi_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/tokenExchangeMsi.js [app-route] (ecmascript)");
const utils_js_2 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/utils.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("ManagedIdentityCredential");
/**
 * Attempts authentication using a managed identity available at the deployment environment.
 * This authentication type works in Azure VMs, App Service instances, Azure Functions applications,
 * Azure Kubernetes Services, Azure Service Fabric instances and inside of the Azure Cloud Shell.
 *
 * More information about configuring managed identities can be found here:
 * https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview
 */ class ManagedIdentityCredential {
    managedIdentityApp;
    identityClient;
    clientId;
    resourceId;
    objectId;
    msiRetryConfig = {
        maxRetries: 5,
        startDelayInMs: 800,
        intervalIncrement: 2
    };
    isAvailableIdentityClient;
    /**
     * @internal
     * @hidden
     */ constructor(clientIdOrOptions, options){
        let _options;
        if (typeof clientIdOrOptions === "string") {
            this.clientId = clientIdOrOptions;
            _options = options ?? {};
        } else {
            this.clientId = clientIdOrOptions?.clientId;
            _options = clientIdOrOptions ?? {};
        }
        this.resourceId = _options?.resourceId;
        this.objectId = _options?.objectId;
        // For JavaScript users.
        const providedIds = [
            {
                key: "clientId",
                value: this.clientId
            },
            {
                key: "resourceId",
                value: this.resourceId
            },
            {
                key: "objectId",
                value: this.objectId
            }
        ].filter((id)=>id.value);
        if (providedIds.length > 1) {
            throw new Error(`ManagedIdentityCredential: only one of 'clientId', 'resourceId', or 'objectId' can be provided. Received values: ${JSON.stringify({
                clientId: this.clientId,
                resourceId: this.resourceId,
                objectId: this.objectId
            })}`);
        }
        // ManagedIdentity uses http for local requests
        _options.allowInsecureConnection = true;
        if (_options.retryOptions?.maxRetries !== undefined) {
            this.msiRetryConfig.maxRetries = _options.retryOptions.maxRetries;
        }
        this.identityClient = new identityClient_js_1.IdentityClient({
            ..._options,
            additionalPolicies: [
                {
                    policy: (0, imdsRetryPolicy_js_1.imdsRetryPolicy)(this.msiRetryConfig),
                    position: "perCall"
                }
            ]
        });
        this.managedIdentityApp = new msal_node_1.ManagedIdentityApplication({
            managedIdentityIdParams: {
                userAssignedClientId: this.clientId,
                userAssignedResourceId: this.resourceId,
                userAssignedObjectId: this.objectId
            },
            system: {
                disableInternalRetries: true,
                networkClient: this.identityClient,
                loggerOptions: {
                    logLevel: (0, utils_js_1.getMSALLogLevel)((0, logger_1.getLogLevel)()),
                    piiLoggingEnabled: _options.loggingOptions?.enableUnsafeSupportLogging,
                    loggerCallback: (0, utils_js_1.defaultLoggerCallback)(logger)
                }
            }
        });
        this.isAvailableIdentityClient = new identityClient_js_1.IdentityClient({
            ..._options,
            retryOptions: {
                maxRetries: 0
            }
        });
        const managedIdentitySource = this.managedIdentityApp.getManagedIdentitySource();
        // CloudShell MSI will ignore any user-assigned identity passed as parameters. To avoid confusion, we prevent this from happening as early as possible.
        if (managedIdentitySource === "CloudShell") {
            if (this.clientId || this.resourceId || this.objectId) {
                logger.warning(`CloudShell MSI detected with user-provided IDs - throwing. Received values: ${JSON.stringify({
                    clientId: this.clientId,
                    resourceId: this.resourceId,
                    objectId: this.objectId
                })}.`);
                throw new errors_js_1.CredentialUnavailableError("ManagedIdentityCredential: Specifying a user-assigned managed identity is not supported for CloudShell at runtime. When using Managed Identity in CloudShell, omit the clientId, resourceId, and objectId parameters.");
            }
        }
        // ServiceFabric does not support specifying user-assigned managed identity by client ID or resource ID. The managed identity selected is based on the resource configuration.
        if (managedIdentitySource === "ServiceFabric") {
            if (this.clientId || this.resourceId || this.objectId) {
                logger.warning(`Service Fabric detected with user-provided IDs - throwing. Received values: ${JSON.stringify({
                    clientId: this.clientId,
                    resourceId: this.resourceId,
                    objectId: this.objectId
                })}.`);
                throw new errors_js_1.CredentialUnavailableError(`ManagedIdentityCredential: ${utils_js_2.serviceFabricErrorMessage}`);
            }
        }
        logger.info(`Using ${managedIdentitySource} managed identity.`);
        // Check if either clientId, resourceId or objectId was provided and log the value used
        if (providedIds.length === 1) {
            const { key, value } = providedIds[0];
            logger.info(`${managedIdentitySource} with ${key}: ${value}`);
        }
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     * If an unexpected error occurs, an {@link AuthenticationError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options = {}) {
        logger.getToken.info("Using the MSAL provider for Managed Identity.");
        const resource = (0, utils_js_2.mapScopesToResource)(scopes);
        if (!resource) {
            throw new errors_js_1.CredentialUnavailableError(`ManagedIdentityCredential: Multiple scopes are not supported. Scopes: ${JSON.stringify(scopes)}`);
        }
        return tracing_js_1.tracingClient.withSpan("ManagedIdentityCredential.getToken", options, async ()=>{
            try {
                const isTokenExchangeMsi = await tokenExchangeMsi_js_1.tokenExchangeMsi.isAvailable(this.clientId);
                // Most scenarios are handled by MSAL except for two:
                // AKS pod identity - MSAL does not implement the token exchange flow.
                // IMDS Endpoint probing - MSAL does not do any probing before trying to get a token.
                // As a DefaultAzureCredential optimization we probe the IMDS endpoint with a short timeout and no retries before actually trying to get a token
                // We will continue to implement these features in the Identity library.
                const identitySource = this.managedIdentityApp.getManagedIdentitySource();
                const isImdsMsi = identitySource === "DefaultToImds" || identitySource === "Imds"; // Neither actually checks that IMDS endpoint is available, just that it's the source the MSAL _would_ try to use.
                logger.getToken.info(`MSAL Identity source: ${identitySource}`);
                if (isTokenExchangeMsi) {
                    // In the AKS scenario we will use the existing tokenExchangeMsi indefinitely.
                    logger.getToken.info("Using the token exchange managed identity.");
                    const result = await tokenExchangeMsi_js_1.tokenExchangeMsi.getToken({
                        scopes,
                        clientId: this.clientId,
                        identityClient: this.identityClient,
                        retryConfig: this.msiRetryConfig,
                        resourceId: this.resourceId
                    });
                    if (result === null) {
                        throw new errors_js_1.CredentialUnavailableError("Attempted to use the token exchange managed identity, but received a null response.");
                    }
                    return result;
                } else if (isImdsMsi) {
                    // In the IMDS scenario we will probe the IMDS endpoint to ensure it's available before trying to get a token.
                    // If the IMDS endpoint is not available and this is the source that MSAL will use, we will fail-fast with an error that tells DAC to move to the next credential.
                    logger.getToken.info("Using the IMDS endpoint to probe for availability.");
                    const isAvailable = await imdsMsi_js_1.imdsMsi.isAvailable({
                        scopes,
                        clientId: this.clientId,
                        getTokenOptions: options,
                        identityClient: this.isAvailableIdentityClient,
                        resourceId: this.resourceId
                    });
                    if (!isAvailable) {
                        throw new errors_js_1.CredentialUnavailableError(`Attempted to use the IMDS endpoint, but it is not available.`);
                    }
                }
                // If we got this far, it means:
                // - This is not a tokenExchangeMsi,
                // - We already probed for IMDS endpoint availability and failed-fast if it's unreachable.
                // We can proceed normally by calling MSAL for a token.
                logger.getToken.info("Calling into MSAL for managed identity token.");
                const token = await this.managedIdentityApp.acquireToken({
                    resource
                });
                this.ensureValidMsalToken(scopes, token, options);
                logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
                return {
                    expiresOnTimestamp: token.expiresOn.getTime(),
                    token: token.accessToken,
                    refreshAfterTimestamp: token.refreshOn?.getTime(),
                    tokenType: "Bearer"
                };
            } catch (err) {
                logger.getToken.error((0, logging_js_1.formatError)(scopes, err));
                // AuthenticationRequiredError described as Error to enforce authentication after trying to retrieve a token silently.
                // TODO: why would this _ever_ happen considering we're not trying the silent request in this flow?
                if (err.name === "AuthenticationRequiredError") {
                    throw err;
                }
                if (isNetworkError(err)) {
                    throw new errors_js_1.CredentialUnavailableError(`ManagedIdentityCredential: Network unreachable. Message: ${err.message}`, {
                        cause: err
                    });
                }
                throw new errors_js_1.CredentialUnavailableError(`ManagedIdentityCredential: Authentication failed. Message ${err.message}`, {
                    cause: err
                });
            }
        });
    }
    /**
     * Ensures the validity of the MSAL token
     */ ensureValidMsalToken(scopes, msalToken, getTokenOptions) {
        const createError = (message)=>{
            logger.getToken.info(message);
            return new errors_js_1.AuthenticationRequiredError({
                scopes: Array.isArray(scopes) ? scopes : [
                    scopes
                ],
                getTokenOptions,
                message
            });
        };
        if (!msalToken) {
            throw createError("No response.");
        }
        if (!msalToken.expiresOn) {
            throw createError(`Response had no "expiresOn" property.`);
        }
        if (!msalToken.accessToken) {
            throw createError(`Response had no "accessToken" property.`);
        }
    }
}
exports.ManagedIdentityCredential = ManagedIdentityCredential;
function isNetworkError(err) {
    // MSAL error
    if (err.errorCode === "network_error") {
        return true;
    }
    // Probe errors
    if (err.code === "ENETUNREACH" || err.code === "EHOSTUNREACH") {
        return true;
    }
    // This is a special case for Docker Desktop which responds with a 403 with a message that contains "A socket operation was attempted to an unreachable network" or "A socket operation was attempted to an unreachable host"
    // rather than just timing out, as expected.
    if (err.statusCode === 403 || err.code === 403) {
        if (err.message.includes("unreachable")) {
            return true;
        }
    }
    return false;
} //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/azureDeveloperCliCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AzureDeveloperCliCredential = exports.developerCliCredentialInternals = exports.azureDeveloperCliPublicErrorMessages = void 0;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const child_process_1 = tslib_1.__importDefault(__turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)"));
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const scopeUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("AzureDeveloperCliCredential");
/**
 * Messages to use when throwing in this credential.
 * @internal
 */ exports.azureDeveloperCliPublicErrorMessages = {
    notInstalled: "Azure Developer CLI couldn't be found. To mitigate this issue, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
    login: "Please run 'azd auth login' from a command prompt to authenticate before using this credential. For more information, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
    unknown: "Unknown error while trying to retrieve the access token",
    claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:"
};
/**
 * Mockable reference to the Developer CLI credential cliCredentialFunctions
 * @internal
 */ exports.developerCliCredentialInternals = {
    /**
     * @internal
     */ getSafeWorkingDir () {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            return "/bin";
        }
    },
    /**
     * Gets the access token from Azure Developer CLI
     * @param scopes - The scopes to use when getting the token
     * @internal
     */ async getAzdAccessToken (scopes, tenantId, timeout, claims) {
        let tenantSection = [];
        if (tenantId) {
            tenantSection = [
                "--tenant-id",
                tenantId
            ];
        }
        let claimsSections = [];
        if (claims) {
            const encodedClaims = btoa(claims);
            claimsSections = [
                "--claims",
                encodedClaims
            ];
        }
        return new Promise((resolve, reject)=>{
            try {
                const args = [
                    "auth",
                    "token",
                    "--output",
                    "json",
                    "--no-prompt",
                    ...scopes.reduce((previous, current)=>previous.concat("--scope", current), []),
                    ...tenantSection,
                    ...claimsSections
                ];
                const command = [
                    "azd",
                    ...args
                ].join(" ");
                child_process_1.default.exec(command, {
                    cwd: exports.developerCliCredentialInternals.getSafeWorkingDir(),
                    timeout
                }, (error, stdout, stderr)=>{
                    resolve({
                        stdout,
                        stderr,
                        error
                    });
                });
            } catch (err) {
                reject(err);
            }
        });
    }
};
/**
 * Azure Developer CLI is a command-line interface tool that allows developers to create, manage, and deploy
 * resources in Azure. It's built on top of the Azure CLI and provides additional functionality specific
 * to Azure developers. It allows users to authenticate as a user and/or a service principal against
 * <a href="https://learn.microsoft.com/entra/fundamentals/">Microsoft Entra ID</a>. The
 * AzureDeveloperCliCredential authenticates in a development environment and acquires a token on behalf of
 * the logged-in user or service principal in the Azure Developer CLI. It acts as the Azure Developer CLI logged in user or
 * service principal and executes an Azure CLI command underneath to authenticate the application against
 * Microsoft Entra ID.
 *
 * <h2> Configure AzureDeveloperCliCredential </h2>
 *
 * To use this credential, the developer needs to authenticate locally in Azure Developer CLI using one of the
 * commands below:
 *
 * <ol>
 *     <li>Run "azd auth login" in Azure Developer CLI to authenticate interactively as a user.</li>
 *     <li>Run "azd auth login --client-id clientID --client-secret clientSecret
 *     --tenant-id tenantID" to authenticate as a service principal.</li>
 * </ol>
 *
 * You may need to repeat this process after a certain time period, depending on the refresh token validity in your
 * organization. Generally, the refresh token validity period is a few weeks to a few months.
 * AzureDeveloperCliCredential will prompt you to sign in again.
 */ class AzureDeveloperCliCredential {
    tenantId;
    additionallyAllowedTenantIds;
    timeout;
    /**
     * Creates an instance of the {@link AzureDeveloperCliCredential}.
     *
     * To use this credential, ensure that you have already logged
     * in via the 'azd' tool using the command "azd auth login" from the commandline.
     *
     * @param options - Options, to optionally allow multi-tenant requests.
     */ constructor(options){
        if (options?.tenantId) {
            (0, tenantIdUtils_js_1.checkTenantId)(logger, options?.tenantId);
            this.tenantId = options?.tenantId;
        }
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        this.timeout = options?.processTimeoutInMs;
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options = {}) {
        const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, options, this.additionallyAllowedTenantIds);
        if (tenantId) {
            (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
        }
        let scopeList;
        if (typeof scopes === "string") {
            scopeList = [
                scopes
            ];
        } else {
            scopeList = scopes;
        }
        logger.getToken.info(`Using the scopes ${scopes}`);
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async ()=>{
            try {
                scopeList.forEach((scope)=>{
                    (0, scopeUtils_js_1.ensureValidScopeForDevTimeCreds)(scope, logger);
                });
                const obj = await exports.developerCliCredentialInternals.getAzdAccessToken(scopeList, tenantId, this.timeout, options.claims);
                const isMFARequiredError = obj.stderr?.match("must use multi-factor authentication") || obj.stderr?.match("reauthentication required");
                const isNotLoggedInError = obj.stderr?.match("not logged in, run `azd login` to login") || obj.stderr?.match("not logged in, run `azd auth login` to login");
                const isNotInstallError = obj.stderr?.match("azd:(.*)not found") || obj.stderr?.startsWith("'azd' is not recognized");
                if (isNotInstallError || obj.error && obj.error.code === "ENOENT") {
                    const error = new errors_js_1.CredentialUnavailableError(exports.azureDeveloperCliPublicErrorMessages.notInstalled);
                    logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
                    throw error;
                }
                if (isNotLoggedInError) {
                    const error = new errors_js_1.CredentialUnavailableError(exports.azureDeveloperCliPublicErrorMessages.login);
                    logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
                    throw error;
                }
                if (isMFARequiredError) {
                    const scope = scopeList.reduce((previous, current)=>previous.concat("--scope", current), []).join(" ");
                    const loginCmd = `azd auth login ${scope}`;
                    const error = new errors_js_1.CredentialUnavailableError(`${exports.azureDeveloperCliPublicErrorMessages.claim} ${loginCmd}`);
                    logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
                    throw error;
                }
                try {
                    const resp = JSON.parse(obj.stdout);
                    logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
                    return {
                        token: resp.token,
                        expiresOnTimestamp: new Date(resp.expiresOn).getTime(),
                        tokenType: "Bearer"
                    };
                } catch (e) {
                    if (obj.stderr) {
                        throw new errors_js_1.CredentialUnavailableError(obj.stderr);
                    }
                    throw e;
                }
            } catch (err) {
                const error = err.name === "CredentialUnavailableError" ? err : new errors_js_1.CredentialUnavailableError(err.message || exports.azureDeveloperCliPublicErrorMessages.unknown);
                logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
                throw error;
            }
        });
    }
}
exports.AzureDeveloperCliCredential = AzureDeveloperCliCredential; //# sourceMappingURL=azureDeveloperCliCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/subscriptionUtils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkSubscription = checkSubscription;
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
/**
 * @internal
 */ function checkSubscription(logger, subscription) {
    if (!subscription.match(/^[0-9a-zA-Z-._ ]+$/)) {
        const error = new Error(`Subscription '${subscription}' contains invalid characters. If this is the name of a subscription, use ` + `its ID instead. You can locate your subscription by following the instructions listed here: ` + `https://learn.microsoft.com/azure/azure-portal/get-subscription-tenant-id`);
        logger.info((0, logging_js_1.formatError)("", error));
        throw error;
    }
} //# sourceMappingURL=subscriptionUtils.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/azureCliCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AzureCliCredential = exports.cliCredentialInternals = exports.azureCliPublicErrorMessages = void 0;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const scopeUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const child_process_1 = tslib_1.__importDefault(__turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)"));
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const subscriptionUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/subscriptionUtils.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("AzureCliCredential");
/**
 * Messages to use when throwing in this credential.
 * @internal
 */ exports.azureCliPublicErrorMessages = {
    claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:",
    notInstalled: "Azure CLI could not be found. Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'.",
    login: "Please run 'az login' from a command prompt to authenticate before using this credential.",
    unknown: "Unknown error while trying to retrieve the access token",
    unexpectedResponse: 'Unexpected response from Azure CLI when getting token. Expected "expiresOn" to be a RFC3339 date string. Got:'
};
/**
 * Mockable reference to the CLI credential cliCredentialFunctions
 * @internal
 */ exports.cliCredentialInternals = {
    /**
     * @internal
     */ getSafeWorkingDir () {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            return "/bin";
        }
    },
    /**
     * Gets the access token from Azure CLI
     * @param resource - The resource to use when getting the token
     * @internal
     */ async getAzureCliAccessToken (resource, tenantId, subscription, timeout) {
        let tenantSection = [];
        let subscriptionSection = [];
        if (tenantId) {
            tenantSection = [
                "--tenant",
                tenantId
            ];
        }
        if (subscription) {
            // Add quotes around the subscription to handle subscriptions with spaces
            subscriptionSection = [
                "--subscription",
                `"${subscription}"`
            ];
        }
        return new Promise((resolve, reject)=>{
            try {
                const args = [
                    "account",
                    "get-access-token",
                    "--output",
                    "json",
                    "--resource",
                    resource,
                    ...tenantSection,
                    ...subscriptionSection
                ];
                const command = [
                    "az",
                    ...args
                ].join(" ");
                child_process_1.default.exec(command, {
                    cwd: exports.cliCredentialInternals.getSafeWorkingDir(),
                    timeout
                }, (error, stdout, stderr)=>{
                    resolve({
                        stdout: stdout,
                        stderr: stderr,
                        error
                    });
                });
            } catch (err) {
                reject(err);
            }
        });
    }
};
/**
 * This credential will use the currently logged-in user login information
 * via the Azure CLI ('az') commandline tool.
 * To do so, it will read the user access token and expire time
 * with Azure CLI command "az account get-access-token".
 */ class AzureCliCredential {
    tenantId;
    additionallyAllowedTenantIds;
    timeout;
    subscription;
    /**
     * Creates an instance of the {@link AzureCliCredential}.
     *
     * To use this credential, ensure that you have already logged
     * in via the 'az' tool using the command "az login" from the commandline.
     *
     * @param options - Options, to optionally allow multi-tenant requests.
     */ constructor(options){
        if (options?.tenantId) {
            (0, tenantIdUtils_js_1.checkTenantId)(logger, options?.tenantId);
            this.tenantId = options?.tenantId;
        }
        if (options?.subscription) {
            (0, subscriptionUtils_js_1.checkSubscription)(logger, options?.subscription);
            this.subscription = options?.subscription;
        }
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        this.timeout = options?.processTimeoutInMs;
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options = {}) {
        const scope = typeof scopes === "string" ? scopes : scopes[0];
        const claimsValue = options.claims;
        if (claimsValue && claimsValue.trim()) {
            const encodedClaims = btoa(claimsValue);
            let loginCmd = `az login --claims-challenge ${encodedClaims} --scope ${scope}`;
            const tenantIdFromOptions = options.tenantId;
            if (tenantIdFromOptions) {
                loginCmd += ` --tenant ${tenantIdFromOptions}`;
            }
            const error = new errors_js_1.CredentialUnavailableError(`${exports.azureCliPublicErrorMessages.claim} ${loginCmd}`);
            logger.getToken.info((0, logging_js_1.formatError)(scope, error));
            throw error;
        }
        const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, options, this.additionallyAllowedTenantIds);
        if (tenantId) {
            (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
        }
        if (this.subscription) {
            (0, subscriptionUtils_js_1.checkSubscription)(logger, this.subscription);
        }
        logger.getToken.info(`Using the scope ${scope}`);
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async ()=>{
            try {
                (0, scopeUtils_js_1.ensureValidScopeForDevTimeCreds)(scope, logger);
                const resource = (0, scopeUtils_js_1.getScopeResource)(scope);
                const obj = await exports.cliCredentialInternals.getAzureCliAccessToken(resource, tenantId, this.subscription, this.timeout);
                const specificScope = obj.stderr?.match("(.*)az login --scope(.*)");
                const isLoginError = obj.stderr?.match("(.*)az login(.*)") && !specificScope;
                const isNotInstallError = obj.stderr?.match("az:(.*)not found") || obj.stderr?.startsWith("'az' is not recognized");
                if (isNotInstallError) {
                    const error = new errors_js_1.CredentialUnavailableError(exports.azureCliPublicErrorMessages.notInstalled);
                    logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
                    throw error;
                }
                if (isLoginError) {
                    const error = new errors_js_1.CredentialUnavailableError(exports.azureCliPublicErrorMessages.login);
                    logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
                    throw error;
                }
                try {
                    const responseData = obj.stdout;
                    const response = this.parseRawResponse(responseData);
                    logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
                    return response;
                } catch (e) {
                    if (obj.stderr) {
                        throw new errors_js_1.CredentialUnavailableError(obj.stderr);
                    }
                    throw e;
                }
            } catch (err) {
                const error = err.name === "CredentialUnavailableError" ? err : new errors_js_1.CredentialUnavailableError(err.message || exports.azureCliPublicErrorMessages.unknown);
                logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
                throw error;
            }
        });
    }
    /**
     * Parses the raw JSON response from the Azure CLI into a usable AccessToken object
     *
     * @param rawResponse - The raw JSON response from the Azure CLI
     * @returns An access token with the expiry time parsed from the raw response
     *
     * The expiryTime of the credential's access token, in milliseconds, is calculated as follows:
     *
     * When available, expires_on (introduced in Azure CLI v2.54.0) will be preferred. Otherwise falls back to expiresOn.
     */ parseRawResponse(rawResponse) {
        const response = JSON.parse(rawResponse);
        const token = response.accessToken;
        // if available, expires_on will be a number representing seconds since epoch.
        // ensure it's a number or NaN
        let expiresOnTimestamp = Number.parseInt(response.expires_on, 10) * 1000;
        if (!isNaN(expiresOnTimestamp)) {
            logger.getToken.info("expires_on is available and is valid, using it");
            return {
                token,
                expiresOnTimestamp,
                tokenType: "Bearer"
            };
        }
        // fallback to the older expiresOn - an RFC3339 date string
        expiresOnTimestamp = new Date(response.expiresOn).getTime();
        // ensure expiresOn is well-formatted
        if (isNaN(expiresOnTimestamp)) {
            throw new errors_js_1.CredentialUnavailableError(`${exports.azureCliPublicErrorMessages.unexpectedResponse} "${response.expiresOn}"`);
        }
        return {
            token,
            expiresOnTimestamp,
            tokenType: "Bearer"
        };
    }
}
exports.AzureCliCredential = AzureCliCredential; //# sourceMappingURL=azureCliCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/processUtils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.processUtils = void 0;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
const node_child_process_1 = tslib_1.__importDefault(__turbopack_context__.r("[externals]/node:child_process [external] (node:child_process, cjs)"));
/**
 * Easy to mock childProcess utils.
 * @internal
 */ exports.processUtils = {
    /**
     * Promisifying childProcess.execFile
     * @internal
     */ execFile (file, params, options) {
        return new Promise((resolve, reject)=>{
            node_child_process_1.default.execFile(file, params, options, (error, stdout, stderr)=>{
                if (Buffer.isBuffer(stdout)) {
                    stdout = stdout.toString("utf8");
                }
                if (Buffer.isBuffer(stderr)) {
                    stderr = stderr.toString("utf8");
                }
                if (stderr || error) {
                    reject(stderr ? new Error(stderr) : error);
                } else {
                    resolve(stdout);
                }
            });
        });
    }
}; //# sourceMappingURL=processUtils.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/azurePowerShellCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AzurePowerShellCredential = exports.commandStack = exports.powerShellPublicErrorMessages = exports.powerShellErrors = void 0;
exports.formatCommand = formatCommand;
exports.parseJsonToken = parseJsonToken;
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const scopeUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const processUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/processUtils.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("AzurePowerShellCredential");
const isWindows = process.platform === "win32";
/**
 * Returns a platform-appropriate command name by appending ".exe" on Windows.
 *
 * @internal
 */ function formatCommand(commandName) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return commandName;
    }
}
/**
 * Receives a list of commands to run, executes them, then returns the outputs.
 * If anything fails, an error is thrown.
 * @internal
 */ async function runCommands(commands, timeout) {
    const results = [];
    for (const command of commands){
        const [file, ...parameters] = command;
        const result = await processUtils_js_1.processUtils.execFile(file, parameters, {
            encoding: "utf8",
            timeout
        });
        results.push(result);
    }
    return results;
}
/**
 * Known PowerShell errors
 * @internal
 */ exports.powerShellErrors = {
    login: "Run Connect-AzAccount to login",
    installed: "The specified module 'Az.Accounts' with version '2.2.0' was not loaded because no valid module file was found in any module directory"
};
/**
 * Messages to use when throwing in this credential.
 * @internal
 */ exports.powerShellPublicErrorMessages = {
    login: "Please run 'Connect-AzAccount' from PowerShell to authenticate before using this credential.",
    installed: `The 'Az.Account' module >= 2.2.0 is not installed. Install the Azure Az PowerShell module with: "Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force".`,
    claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:",
    troubleshoot: `To troubleshoot, visit https://aka.ms/azsdk/js/identity/powershellcredential/troubleshoot.`
};
// PowerShell Azure User not logged in error check.
const isLoginError = (err)=>err.message.match(`(.*)${exports.powerShellErrors.login}(.*)`);
// Az Module not Installed in Azure PowerShell check.
const isNotInstalledError = (err)=>err.message.match(exports.powerShellErrors.installed);
/**
 * The PowerShell commands to be tried, in order.
 *
 * @internal
 */ exports.commandStack = [
    formatCommand("pwsh")
];
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
/**
 * This credential will use the currently logged-in user information from the
 * Azure PowerShell module. To do so, it will read the user access token and
 * expire time with Azure PowerShell command `Get-AzAccessToken -ResourceUrl {ResourceScope}`
 */ class AzurePowerShellCredential {
    tenantId;
    additionallyAllowedTenantIds;
    timeout;
    /**
     * Creates an instance of the {@link AzurePowerShellCredential}.
     *
     * To use this credential:
     * - Install the Azure Az PowerShell module with:
     *   `Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force`.
     * - You have already logged in to Azure PowerShell using the command
     * `Connect-AzAccount` from the command line.
     *
     * @param options - Options, to optionally allow multi-tenant requests.
     */ constructor(options){
        if (options?.tenantId) {
            (0, tenantIdUtils_js_1.checkTenantId)(logger, options?.tenantId);
            this.tenantId = options?.tenantId;
        }
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        this.timeout = options?.processTimeoutInMs;
    }
    /**
     * Gets the access token from Azure PowerShell
     * @param resource - The resource to use when getting the token
     */ async getAzurePowerShellAccessToken(resource, tenantId, timeout) {
        // Clone the stack to avoid mutating it while iterating
        for (const powerShellCommand of [
            ...exports.commandStack
        ]){
            try {
                await runCommands([
                    [
                        powerShellCommand,
                        "/?"
                    ]
                ], timeout);
            } catch (e) {
                // Remove this credential from the original stack so that we don't try it again.
                exports.commandStack.shift();
                continue;
            }
            const results = await runCommands([
                [
                    powerShellCommand,
                    "-NoProfile",
                    "-NonInteractive",
                    "-Command",
                    `
          $tenantId = "${tenantId ?? ""}"
          $m = Import-Module Az.Accounts -MinimumVersion 2.2.0 -PassThru
          $useSecureString = $m.Version -ge [version]'2.17.0' -and $m.Version -lt [version]'5.0.0'

          $params = @{
            ResourceUrl = "${resource}"
          }

          if ($tenantId.Length -gt 0) {
            $params["TenantId"] = $tenantId
          }

          if ($useSecureString) {
            $params["AsSecureString"] = $true
          }

          $token = Get-AzAccessToken @params

          $result = New-Object -TypeName PSObject
          $result | Add-Member -MemberType NoteProperty -Name ExpiresOn -Value $token.ExpiresOn

          if ($token.Token -is [System.Security.SecureString]) {
            if ($PSVersionTable.PSVersion.Major -lt 7) {
              $ssPtr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token.Token)
              try {
                $result | Add-Member -MemberType NoteProperty -Name Token -Value ([System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ssPtr))
              }
              finally {
                [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ssPtr)
              }
            }
            else {
              $result | Add-Member -MemberType NoteProperty -Name Token -Value ($token.Token | ConvertFrom-SecureString -AsPlainText)
            }
          }
          else {
            $result | Add-Member -MemberType NoteProperty -Name Token -Value $token.Token
          }

          Write-Output (ConvertTo-Json $result)
          `
                ]
            ]);
            const result = results[0];
            return parseJsonToken(result);
        }
        throw new Error(`Unable to execute PowerShell. Ensure that it is installed in your system`);
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If the authentication cannot be performed through PowerShell, a {@link CredentialUnavailableError} will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this TokenCredential implementation might make.
     */ async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async ()=>{
            const scope = typeof scopes === "string" ? scopes : scopes[0];
            const claimsValue = options.claims;
            if (claimsValue && claimsValue.trim()) {
                const encodedClaims = btoa(claimsValue);
                let loginCmd = `Connect-AzAccount -ClaimsChallenge ${encodedClaims}`;
                const tenantIdFromOptions = options.tenantId;
                if (tenantIdFromOptions) {
                    loginCmd += ` -Tenant ${tenantIdFromOptions}`;
                }
                const error = new errors_js_1.CredentialUnavailableError(`${exports.powerShellPublicErrorMessages.claim} ${loginCmd}`);
                logger.getToken.info((0, logging_js_1.formatError)(scope, error));
                throw error;
            }
            const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, options, this.additionallyAllowedTenantIds);
            if (tenantId) {
                (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
            }
            try {
                (0, scopeUtils_js_1.ensureValidScopeForDevTimeCreds)(scope, logger);
                logger.getToken.info(`Using the scope ${scope}`);
                const resource = (0, scopeUtils_js_1.getScopeResource)(scope);
                const response = await this.getAzurePowerShellAccessToken(resource, tenantId, this.timeout);
                logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
                return {
                    token: response.Token,
                    expiresOnTimestamp: new Date(response.ExpiresOn).getTime(),
                    tokenType: "Bearer"
                };
            } catch (err) {
                if (isNotInstalledError(err)) {
                    const error = new errors_js_1.CredentialUnavailableError(exports.powerShellPublicErrorMessages.installed);
                    logger.getToken.info((0, logging_js_1.formatError)(scope, error));
                    throw error;
                } else if (isLoginError(err)) {
                    const error = new errors_js_1.CredentialUnavailableError(exports.powerShellPublicErrorMessages.login);
                    logger.getToken.info((0, logging_js_1.formatError)(scope, error));
                    throw error;
                }
                const error = new errors_js_1.CredentialUnavailableError(`${err}. ${exports.powerShellPublicErrorMessages.troubleshoot}`);
                logger.getToken.info((0, logging_js_1.formatError)(scope, error));
                throw error;
            }
        });
    }
}
exports.AzurePowerShellCredential = AzurePowerShellCredential;
/**
 *
 * @internal
 */ async function parseJsonToken(result) {
    const jsonRegex = /{[^{}]*}/g;
    const matches = result.match(jsonRegex);
    let resultWithoutToken = result;
    if (matches) {
        try {
            for (const item of matches){
                try {
                    const jsonContent = JSON.parse(item);
                    if (jsonContent?.Token) {
                        resultWithoutToken = resultWithoutToken.replace(item, "");
                        if (resultWithoutToken) {
                            logger.getToken.warning(resultWithoutToken);
                        }
                        return jsonContent;
                    }
                } catch (e) {
                    continue;
                }
            }
        } catch (e) {
            throw new Error(`Unable to parse the output of PowerShell. Received output: ${result}`);
        }
    }
    throw new Error(`No access token found in the output. Received output: ${result}`);
} //# sourceMappingURL=azurePowerShellCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/visualStudioCodeCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VisualStudioCodeCredential = void 0;
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const tenantIdUtils_js_2 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const msalClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalClient.js [app-route] (ecmascript)");
const scopeUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)");
const msalPlugins_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalPlugins.js [app-route] (ecmascript)");
const utils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/utils.js [app-route] (ecmascript)");
const promises_1 = __turbopack_context__.r("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
const CommonTenantId = "common";
const VSCodeClientId = "aebc6443-996d-45c2-90f0-388ff96faa56";
const logger = (0, logging_js_1.credentialLogger)("VisualStudioCodeCredential");
// Map of unsupported Tenant IDs and the errors we will be throwing.
const unsupportedTenantIds = {
    adfs: "The VisualStudioCodeCredential does not support authentication with ADFS tenants."
};
function checkUnsupportedTenant(tenantId) {
    // If the Tenant ID isn't supported, we throw.
    const unsupportedTenantError = unsupportedTenantIds[tenantId];
    if (unsupportedTenantError) {
        throw new errors_js_1.CredentialUnavailableError(unsupportedTenantError);
    }
}
/**
 * Connects to Azure using the user account signed in through the Azure Resources extension in Visual Studio Code.
 * Once the user has logged in via the extension, this credential can share the same refresh token
 * that is cached by the extension.
 */ class VisualStudioCodeCredential {
    tenantId;
    additionallyAllowedTenantIds;
    msalClient;
    options;
    /**
     * Creates an instance of VisualStudioCodeCredential to use for automatically authenticating via VSCode.
     *
     * **Note**: `VisualStudioCodeCredential` is provided by a plugin package:
     * `@azure/identity-vscode`. If this package is not installed, then authentication using
     * `VisualStudioCodeCredential` will not be available.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */ constructor(options){
        this.options = options || {};
        if (options && options.tenantId) {
            (0, tenantIdUtils_js_2.checkTenantId)(logger, options.tenantId);
            this.tenantId = options.tenantId;
        } else {
            this.tenantId = CommonTenantId;
        }
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        checkUnsupportedTenant(this.tenantId);
    }
    /**
     * Runs preparations for any further getToken request:
     *   - Validates that the plugin is available.
     *   - Loads the authentication record from VSCode if available.
     *   - Creates the MSAL client with the loaded plugin and authentication record.
     */ async prepare(scopes) {
        const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, this.options, this.additionallyAllowedTenantIds, logger) || this.tenantId;
        if (!(0, msalPlugins_js_1.hasVSCodePlugin)() || !msalPlugins_js_1.vsCodeAuthRecordPath) {
            throw new errors_js_1.CredentialUnavailableError("Visual Studio Code Authentication is not available." + " Ensure you have have Azure Resources Extension installed in VS Code," + " signed into Azure via VS Code, installed the @azure/identity-vscode package," + " and properly configured the extension.");
        }
        // Load the authentication record directly from the path
        const authenticationRecord = await this.loadAuthRecord(msalPlugins_js_1.vsCodeAuthRecordPath, scopes);
        this.msalClient = (0, msalClient_js_1.createMsalClient)(VSCodeClientId, tenantId, {
            ...this.options,
            isVSCodeCredential: true,
            brokerOptions: {
                enabled: true,
                parentWindowHandle: new Uint8Array(0),
                useDefaultBrokerAccount: true
            },
            authenticationRecord
        });
    }
    /**
     * The promise of the single preparation that will be executed at the first getToken request for an instance of this class.
     */ preparePromise;
    /**
     * Runs preparations for any further getToken, but only once.
     */ prepareOnce(scopes) {
        if (!this.preparePromise) {
            this.preparePromise = this.prepare(scopes);
        }
        return this.preparePromise;
    }
    /**
     * Returns the token found by searching VSCode's authentication cache or
     * returns null if no token could be found.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                `TokenCredential` implementation might make.
     */ async getToken(scopes, options) {
        // Load the plugin and authentication record only once
        const scopeArray = (0, scopeUtils_js_1.ensureScopes)(scopes);
        await this.prepareOnce(scopeArray);
        if (!this.msalClient) {
            throw new errors_js_1.CredentialUnavailableError("Visual Studio Code Authentication failed to initialize." + " Ensure you have have Azure Resources Extension installed in VS Code," + " signed into Azure via VS Code, installed the @azure/identity-vscode package," + " and properly configured the extension.");
        }
        // Disable automatic authentication to ensure that the user is not prompted interactively if no token is available
        return this.msalClient.getTokenByInteractiveRequest(scopeArray, {
            ...options,
            disableAutomaticAuthentication: true
        });
    }
    /**
     * Loads the authentication record from the specified path.
     * @param authRecordPath - The path to the authentication record file.
     * @param scopes - The list of scopes for which the token will have access.
     * @returns The authentication record or undefined if loading fails.
     */ async loadAuthRecord(authRecordPath, scopes) {
        try {
            const authRecordContent = await (0, promises_1.readFile)(authRecordPath, {
                encoding: "utf8"
            });
            return (0, utils_js_1.deserializeAuthenticationRecord)(authRecordContent);
        } catch (error) {
            logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
            throw new errors_js_1.CredentialUnavailableError("Cannot load authentication record in Visual Studio Code." + " Ensure you have have Azure Resources Extension installed in VS Code," + " signed into Azure via VS Code, installed the @azure/identity-vscode package," + " and properly configured the extension.");
        }
    }
}
exports.VisualStudioCodeCredential = VisualStudioCodeCredential; //# sourceMappingURL=visualStudioCodeCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/brokerCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BrokerCredential = void 0;
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const scopeUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const msalClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalClient.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("BrokerCredential");
/**
 * Enables authentication to Microsoft Entra ID using WAM (Web Account Manager) broker.
 * This credential uses the default account logged into the OS via a broker.
 */ class BrokerCredential {
    brokerMsalClient;
    brokerTenantId;
    brokerAdditionallyAllowedTenantIds;
    /**
     * Creates an instance of BrokerCredential with the required broker options.
     *
     * This credential uses WAM (Web Account Manager) for authentication, which provides
     * better security and user experience on Windows platforms.
     *
     * @param options - Options for configuring the broker credential, including required broker options.
     */ constructor(options){
        this.brokerTenantId = (0, tenantIdUtils_js_1.resolveTenantId)(logger, options.tenantId);
        this.brokerAdditionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        const msalClientOptions = {
            ...options,
            tokenCredentialOptions: options,
            logger,
            brokerOptions: {
                enabled: true,
                parentWindowHandle: new Uint8Array(0),
                useDefaultBrokerAccount: true
            }
        };
        this.brokerMsalClient = (0, msalClient_js_1.createMsalClient)(constants_js_1.DeveloperSignOnClientId, this.brokerTenantId, msalClientOptions);
    }
    /**
     * Authenticates with Microsoft Entra ID using WAM broker and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * This method extends the base getToken method to support silentAuthenticationOnly option
     * when using broker authentication.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure the token request, including silentAuthenticationOnly option.
     */ async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions)=>{
            newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.brokerTenantId, newOptions, this.brokerAdditionallyAllowedTenantIds, logger);
            const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
            try {
                return this.brokerMsalClient.getBrokeredToken(arrayScopes, true, {
                    ...newOptions,
                    disableAutomaticAuthentication: true
                });
            } catch (e) {
                logger.getToken.info((0, logging_js_1.formatError)(arrayScopes, e));
                throw new errors_js_1.CredentialUnavailableError("Failed to acquire token using broker authentication", {
                    cause: e
                });
            }
        });
    }
}
exports.BrokerCredential = BrokerCredential; //# sourceMappingURL=brokerCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/defaultAzureCredentialFunctions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDefaultBrokerCredential = createDefaultBrokerCredential;
exports.createDefaultVisualStudioCodeCredential = createDefaultVisualStudioCodeCredential;
exports.createDefaultManagedIdentityCredential = createDefaultManagedIdentityCredential;
exports.createDefaultWorkloadIdentityCredential = createDefaultWorkloadIdentityCredential;
exports.createDefaultAzureDeveloperCliCredential = createDefaultAzureDeveloperCliCredential;
exports.createDefaultAzureCliCredential = createDefaultAzureCliCredential;
exports.createDefaultAzurePowershellCredential = createDefaultAzurePowershellCredential;
exports.createDefaultEnvironmentCredential = createDefaultEnvironmentCredential;
const environmentCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/environmentCredential.js [app-route] (ecmascript)");
const index_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/index.js [app-route] (ecmascript)");
const workloadIdentityCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/workloadIdentityCredential.js [app-route] (ecmascript)");
const azureDeveloperCliCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/azureDeveloperCliCredential.js [app-route] (ecmascript)");
const azureCliCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/azureCliCredential.js [app-route] (ecmascript)");
const azurePowerShellCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/azurePowerShellCredential.js [app-route] (ecmascript)");
const visualStudioCodeCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/visualStudioCodeCredential.js [app-route] (ecmascript)");
const brokerCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/brokerCredential.js [app-route] (ecmascript)");
/**
 * Creates a {@link BrokerCredential} instance with the provided options.
 * This credential uses the Windows Authentication Manager (WAM) broker for authentication.
 * It will only attempt to authenticate silently using the default broker account
 *
 * @param options - Options for configuring the credential.
 *
 * @internal
 */ function createDefaultBrokerCredential(options = {}) {
    return new brokerCredential_js_1.BrokerCredential(options);
}
/**
 * Creates a {@link VisualStudioCodeCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */ function createDefaultVisualStudioCodeCredential(options = {}) {
    return new visualStudioCodeCredential_js_1.VisualStudioCodeCredential(options);
}
/**
 * Creates a {@link ManagedIdentityCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */ function createDefaultManagedIdentityCredential(options = {}) {
    options.retryOptions ??= {
        maxRetries: 5,
        retryDelayInMs: 800
    };
    const managedIdentityClientId = options?.managedIdentityClientId ?? process.env.AZURE_CLIENT_ID;
    const workloadIdentityClientId = options?.workloadIdentityClientId ?? managedIdentityClientId;
    const managedResourceId = options?.managedIdentityResourceId;
    const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
    const tenantId = options?.tenantId ?? process.env.AZURE_TENANT_ID;
    if (managedResourceId) {
        const managedIdentityResourceIdOptions = {
            ...options,
            resourceId: managedResourceId
        };
        return new index_js_1.ManagedIdentityCredential(managedIdentityResourceIdOptions);
    }
    if (workloadFile && workloadIdentityClientId) {
        const workloadIdentityCredentialOptions = {
            ...options,
            tenantId: tenantId
        };
        return new index_js_1.ManagedIdentityCredential(workloadIdentityClientId, workloadIdentityCredentialOptions);
    }
    if (managedIdentityClientId) {
        const managedIdentityClientOptions = {
            ...options,
            clientId: managedIdentityClientId
        };
        return new index_js_1.ManagedIdentityCredential(managedIdentityClientOptions);
    }
    // We may be able to return a UnavailableCredential here, but that may be a breaking change
    return new index_js_1.ManagedIdentityCredential(options);
}
/**
 * Creates a {@link WorkloadIdentityCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */ function createDefaultWorkloadIdentityCredential(options) {
    const managedIdentityClientId = options?.managedIdentityClientId ?? process.env.AZURE_CLIENT_ID;
    const workloadIdentityClientId = options?.workloadIdentityClientId ?? managedIdentityClientId;
    const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
    const tenantId = options?.tenantId ?? process.env.AZURE_TENANT_ID;
    if (workloadFile && workloadIdentityClientId) {
        const workloadIdentityCredentialOptions = {
            ...options,
            tenantId,
            clientId: workloadIdentityClientId,
            tokenFilePath: workloadFile
        };
        return new workloadIdentityCredential_js_1.WorkloadIdentityCredential(workloadIdentityCredentialOptions);
    }
    if (tenantId) {
        const workloadIdentityClientTenantOptions = {
            ...options,
            tenantId
        };
        return new workloadIdentityCredential_js_1.WorkloadIdentityCredential(workloadIdentityClientTenantOptions);
    }
    // We may be able to return a UnavailableCredential here, but that may be a breaking change
    return new workloadIdentityCredential_js_1.WorkloadIdentityCredential(options);
}
/**
 * Creates a {@link AzureDeveloperCliCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */ function createDefaultAzureDeveloperCliCredential(options = {}) {
    return new azureDeveloperCliCredential_js_1.AzureDeveloperCliCredential(options);
}
/**
 * Creates a {@link AzureCliCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */ function createDefaultAzureCliCredential(options = {}) {
    return new azureCliCredential_js_1.AzureCliCredential(options);
}
/**
 * Creates a {@link AzurePowerShellCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */ function createDefaultAzurePowershellCredential(options = {}) {
    return new azurePowerShellCredential_js_1.AzurePowerShellCredential(options);
}
/**
 * Creates an {@link EnvironmentCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */ function createDefaultEnvironmentCredential(options = {}) {
    return new environmentCredential_js_1.EnvironmentCredential(options);
} //# sourceMappingURL=defaultAzureCredentialFunctions.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/defaultAzureCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DefaultAzureCredential = exports.UnavailableDefaultCredential = void 0;
const chainedTokenCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/chainedTokenCredential.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const defaultAzureCredentialFunctions_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/defaultAzureCredentialFunctions.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("DefaultAzureCredential");
/**
 * A no-op credential that logs the reason it was skipped if getToken is called.
 * @internal
 */ class UnavailableDefaultCredential {
    credentialUnavailableErrorMessage;
    credentialName;
    constructor(credentialName, message){
        this.credentialName = credentialName;
        this.credentialUnavailableErrorMessage = message;
    }
    getToken() {
        logger.getToken.info(`Skipping ${this.credentialName}, reason: ${this.credentialUnavailableErrorMessage}`);
        return Promise.resolve(null);
    }
}
exports.UnavailableDefaultCredential = UnavailableDefaultCredential;
/**
 * Provides a default {@link ChainedTokenCredential} configuration that works for most
 * applications that use Azure SDK client libraries. For more information, see
 * [DefaultAzureCredential overview](https://aka.ms/azsdk/js/identity/credential-chains#use-defaultazurecredential-for-flexibility).
 *
 * The following credential types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link WorkloadIdentityCredential}
 * - {@link ManagedIdentityCredential}
 * - {@link VisualStudioCodeCredential}
 * - {@link AzureCliCredential}
 * - {@link AzurePowerShellCredential}
 * - {@link AzureDeveloperCliCredential}
 * - {@link BrokerCredential}
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 *
 * The following example demonstrates how to use the `requiredEnvVars` option to ensure that certain environment variables are set before the `DefaultAzureCredential` is instantiated.
 * If any of the specified environment variables are missing or empty, an error will be thrown, preventing the application from continuing execution without the necessary configuration.
 * It also demonstrates how to set the `AZURE_TOKEN_CREDENTIALS` environment variable to control which credentials are included in the chain.
 
 * ```ts snippet:defaultazurecredential_requiredEnvVars
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const credential = new DefaultAzureCredential({
 *   requiredEnvVars: [
 *     "AZURE_CLIENT_ID",
 *     "AZURE_TENANT_ID",
 *     "AZURE_CLIENT_SECRET",
 *     "AZURE_TOKEN_CREDENTIALS",
 *   ],
 * });
 * ```
 */ class DefaultAzureCredential extends chainedTokenCredential_js_1.ChainedTokenCredential {
    constructor(options){
        validateRequiredEnvVars(options);
        // If AZURE_TOKEN_CREDENTIALS is not set, use the default credential chain.
        const azureTokenCredentials = process.env.AZURE_TOKEN_CREDENTIALS ? process.env.AZURE_TOKEN_CREDENTIALS.trim().toLowerCase() : undefined;
        const devCredentialFunctions = [
            defaultAzureCredentialFunctions_js_1.createDefaultVisualStudioCodeCredential,
            defaultAzureCredentialFunctions_js_1.createDefaultAzureCliCredential,
            defaultAzureCredentialFunctions_js_1.createDefaultAzurePowershellCredential,
            defaultAzureCredentialFunctions_js_1.createDefaultAzureDeveloperCliCredential,
            defaultAzureCredentialFunctions_js_1.createDefaultBrokerCredential
        ];
        const prodCredentialFunctions = [
            defaultAzureCredentialFunctions_js_1.createDefaultEnvironmentCredential,
            defaultAzureCredentialFunctions_js_1.createDefaultWorkloadIdentityCredential,
            defaultAzureCredentialFunctions_js_1.createDefaultManagedIdentityCredential
        ];
        let credentialFunctions = [];
        const validCredentialNames = "EnvironmentCredential, WorkloadIdentityCredential, ManagedIdentityCredential, VisualStudioCodeCredential, AzureCliCredential, AzurePowerShellCredential, AzureDeveloperCliCredential";
        // If AZURE_TOKEN_CREDENTIALS is set, use it to determine which credentials to use.
        // The value of AZURE_TOKEN_CREDENTIALS should be either "dev" or "prod" or any one of these credentials - {validCredentialNames}.
        if (azureTokenCredentials) {
            switch(azureTokenCredentials){
                case "dev":
                    credentialFunctions = devCredentialFunctions;
                    break;
                case "prod":
                    credentialFunctions = prodCredentialFunctions;
                    break;
                case "environmentcredential":
                    credentialFunctions = [
                        defaultAzureCredentialFunctions_js_1.createDefaultEnvironmentCredential
                    ];
                    break;
                case "workloadidentitycredential":
                    credentialFunctions = [
                        defaultAzureCredentialFunctions_js_1.createDefaultWorkloadIdentityCredential
                    ];
                    break;
                case "managedidentitycredential":
                    credentialFunctions = [
                        defaultAzureCredentialFunctions_js_1.createDefaultManagedIdentityCredential
                    ];
                    break;
                case "visualstudiocodecredential":
                    credentialFunctions = [
                        defaultAzureCredentialFunctions_js_1.createDefaultVisualStudioCodeCredential
                    ];
                    break;
                case "azureclicredential":
                    credentialFunctions = [
                        defaultAzureCredentialFunctions_js_1.createDefaultAzureCliCredential
                    ];
                    break;
                case "azurepowershellcredential":
                    credentialFunctions = [
                        defaultAzureCredentialFunctions_js_1.createDefaultAzurePowershellCredential
                    ];
                    break;
                case "azuredeveloperclicredential":
                    credentialFunctions = [
                        defaultAzureCredentialFunctions_js_1.createDefaultAzureDeveloperCliCredential
                    ];
                    break;
                default:
                    {
                        // If AZURE_TOKEN_CREDENTIALS is set to an unsupported value, throw an error.
                        // This will prevent the creation of the DefaultAzureCredential.
                        const errorMessage = `Invalid value for AZURE_TOKEN_CREDENTIALS = ${process.env.AZURE_TOKEN_CREDENTIALS}. Valid values are 'prod' or 'dev' or any of these credentials - ${validCredentialNames}.`;
                        logger.warning(errorMessage);
                        throw new Error(errorMessage);
                    }
            }
        } else {
            // If AZURE_TOKEN_CREDENTIALS is not set, use the default credential chain.
            credentialFunctions = [
                ...prodCredentialFunctions,
                ...devCredentialFunctions
            ];
        }
        // Errors from individual credentials should not be thrown in the DefaultAzureCredential constructor, instead throwing on getToken() which is handled by ChainedTokenCredential.
        // When adding new credentials to the default chain, consider:
        // 1. Making the constructor parameters required and explicit
        // 2. Validating any required parameters in the factory function
        // 3. Returning a UnavailableDefaultCredential from the factory function if a credential is unavailable for any reason
        const credentials = credentialFunctions.map((createCredentialFn)=>{
            try {
                return createCredentialFn(options);
            } catch (err) {
                logger.warning(`Skipped ${createCredentialFn.name} because of an error creating the credential: ${err}`);
                return new UnavailableDefaultCredential(createCredentialFn.name, err.message);
            }
        });
        super(...credentials);
    }
}
exports.DefaultAzureCredential = DefaultAzureCredential;
/**
 * @internal This function checks that all environment variables in `options.requiredEnvVars` are set and non-empty.
 * If any are missing or empty, it throws an error.
 */ function validateRequiredEnvVars(options) {
    if (options?.requiredEnvVars) {
        const requiredVars = Array.isArray(options.requiredEnvVars) ? options.requiredEnvVars : [
            options.requiredEnvVars
        ];
        const missing = requiredVars.filter((envVar)=>!process.env[envVar]);
        if (missing.length > 0) {
            const errorMessage = `Required environment ${missing.length === 1 ? "variable" : "variables"} '${missing.join(", ")}' for DefaultAzureCredential ${missing.length === 1 ? "is" : "are"} not set or empty.`;
            logger.warning(errorMessage);
            throw new Error(errorMessage);
        }
    }
} //# sourceMappingURL=defaultAzureCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/interactiveBrowserCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InteractiveBrowserCredential = void 0;
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const scopeUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const msalClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalClient.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/constants.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("InteractiveBrowserCredential");
/**
 * Enables authentication to Microsoft Entra ID inside of the web browser
 * using the interactive login flow.
 */ class InteractiveBrowserCredential {
    tenantId;
    additionallyAllowedTenantIds;
    msalClient;
    disableAutomaticAuthentication;
    browserCustomizationOptions;
    loginHint;
    /**
     * Creates an instance of InteractiveBrowserCredential with the details needed.
     *
     * This credential uses the [Authorization Code Flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow).
     * On Node.js, it will open a browser window while it listens for a redirect response from the authentication service.
     * On browsers, it authenticates via popups. The `loginStyle` optional parameter can be set to `redirect` to authenticate by redirecting the user to an Azure secure login page, which then will redirect the user back to the web application where the authentication started.
     *
     * For Node.js, if a `clientId` is provided, the Microsoft Entra application will need to be configured to have a "Mobile and desktop applications" redirect endpoint.
     * Follow our guide on [setting up Redirect URIs for Desktop apps that calls to web APIs](https://learn.microsoft.com/entra/identity-platform/scenario-desktop-app-registration#redirect-uris).
     *
     * @param options - Options for configuring the client which makes the authentication requests.
     */ constructor(options){
        this.tenantId = (0, tenantIdUtils_js_1.resolveTenantId)(logger, options.tenantId, options.clientId);
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        const msalClientOptions = {
            ...options,
            tokenCredentialOptions: options,
            logger
        };
        const ibcNodeOptions = options;
        this.browserCustomizationOptions = ibcNodeOptions.browserCustomizationOptions;
        this.loginHint = ibcNodeOptions.loginHint;
        if (ibcNodeOptions?.brokerOptions?.enabled) {
            if (!ibcNodeOptions?.brokerOptions?.parentWindowHandle) {
                throw new Error("In order to do WAM authentication, `parentWindowHandle` under `brokerOptions` is a required parameter");
            } else {
                msalClientOptions.brokerOptions = {
                    enabled: true,
                    parentWindowHandle: ibcNodeOptions.brokerOptions.parentWindowHandle,
                    legacyEnableMsaPassthrough: ibcNodeOptions.brokerOptions?.legacyEnableMsaPassthrough,
                    useDefaultBrokerAccount: ibcNodeOptions.brokerOptions?.useDefaultBrokerAccount
                };
            }
        }
        this.msalClient = (0, msalClient_js_1.createMsalClient)(options.clientId ?? constants_js_1.DeveloperSignOnClientId, this.tenantId, msalClientOptions);
        this.disableAutomaticAuthentication = options?.disableAutomaticAuthentication;
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * If the user provided the option `disableAutomaticAuthentication`,
     * once the token can't be retrieved silently,
     * this method won't attempt to request user interaction to retrieve the token.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions)=>{
            newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
            const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
            return this.msalClient.getTokenByInteractiveRequest(arrayScopes, {
                ...newOptions,
                disableAutomaticAuthentication: this.disableAutomaticAuthentication,
                browserCustomizationOptions: this.browserCustomizationOptions,
                loginHint: this.loginHint
            });
        });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * If the token can't be retrieved silently, this method will always generate a challenge for the user.
     *
     * On Node.js, this credential has [Proof Key for Code Exchange (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636) enabled by default.
     * PKCE is a security feature that mitigates authentication code interception attacks.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                  TokenCredential implementation might make.
     */ async authenticate(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.authenticate`, options, async (newOptions)=>{
            const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
            await this.msalClient.getTokenByInteractiveRequest(arrayScopes, {
                ...newOptions,
                disableAutomaticAuthentication: false,
                browserCustomizationOptions: this.browserCustomizationOptions,
                loginHint: this.loginHint
            });
            return this.msalClient.getActiveAccount();
        });
    }
}
exports.InteractiveBrowserCredential = InteractiveBrowserCredential; //# sourceMappingURL=interactiveBrowserCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/deviceCodeCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeviceCodeCredential = void 0;
exports.defaultDeviceCodePromptCallback = defaultDeviceCodePromptCallback;
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const scopeUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const msalClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalClient.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/constants.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("DeviceCodeCredential");
/**
 * Method that logs the user code from the DeviceCodeCredential.
 * @param deviceCodeInfo - The device code.
 */ function defaultDeviceCodePromptCallback(deviceCodeInfo) {
    console.log(deviceCodeInfo.message);
}
/**
 * Enables authentication to Microsoft Entra ID using a device code
 * that the user can enter into https://microsoft.com/devicelogin.
 */ class DeviceCodeCredential {
    tenantId;
    additionallyAllowedTenantIds;
    disableAutomaticAuthentication;
    msalClient;
    userPromptCallback;
    /**
     * Creates an instance of DeviceCodeCredential with the details needed
     * to initiate the device code authorization flow with Microsoft Entra ID.
     *
     * A message will be logged, giving users a code that they can use to authenticate once they go to https://microsoft.com/devicelogin
     *
     * Developers can configure how this message is shown by passing a custom `userPromptCallback`:
     *
     * ```ts snippet:device_code_credential_example
     * import { DeviceCodeCredential } from "@azure/identity";
     *
     * const credential = new DeviceCodeCredential({
     *   tenantId: process.env.AZURE_TENANT_ID,
     *   clientId: process.env.AZURE_CLIENT_ID,
     *   userPromptCallback: (info) => {
     *     console.log("CUSTOMIZED PROMPT CALLBACK", info.message);
     *   },
     * });
     * ```
     *
     * @param options - Options for configuring the client which makes the authentication requests.
     */ constructor(options){
        this.tenantId = options?.tenantId;
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        const clientId = options?.clientId ?? constants_js_1.DeveloperSignOnClientId;
        const tenantId = (0, tenantIdUtils_js_1.resolveTenantId)(logger, options?.tenantId, clientId);
        this.userPromptCallback = options?.userPromptCallback ?? defaultDeviceCodePromptCallback;
        this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, tenantId, {
            ...options,
            logger,
            tokenCredentialOptions: options || {}
        });
        this.disableAutomaticAuthentication = options?.disableAutomaticAuthentication;
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * If the user provided the option `disableAutomaticAuthentication`,
     * once the token can't be retrieved silently,
     * this method won't attempt to request user interaction to retrieve the token.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions)=>{
            newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
            const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
            return this.msalClient.getTokenByDeviceCode(arrayScopes, this.userPromptCallback, {
                ...newOptions,
                disableAutomaticAuthentication: this.disableAutomaticAuthentication
            });
        });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * If the token can't be retrieved silently, this method will always generate a challenge for the user.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                  TokenCredential implementation might make.
     */ async authenticate(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.authenticate`, options, async (newOptions)=>{
            const arrayScopes = Array.isArray(scopes) ? scopes : [
                scopes
            ];
            await this.msalClient.getTokenByDeviceCode(arrayScopes, this.userPromptCallback, {
                ...newOptions,
                disableAutomaticAuthentication: false
            });
            return this.msalClient.getActiveAccount();
        });
    }
}
exports.DeviceCodeCredential = DeviceCodeCredential; //# sourceMappingURL=deviceCodeCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/azurePipelinesCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AzurePipelinesCredential = void 0;
exports.handleOidcResponse = handleOidcResponse;
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const core_rest_pipeline_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/core-rest-pipeline/dist/commonjs/index.js [app-route] (ecmascript)");
const clientAssertionCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/clientAssertionCredential.js [app-route] (ecmascript)");
const identityClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/client/identityClient.js [app-route] (ecmascript)");
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const credentialName = "AzurePipelinesCredential";
const logger = (0, logging_js_1.credentialLogger)(credentialName);
const OIDC_API_VERSION = "7.1";
/**
 * This credential is designed to be used in Azure Pipelines with service connections
 * as a setup for workload identity federation.
 */ class AzurePipelinesCredential {
    clientAssertionCredential;
    identityClient;
    /**
     * AzurePipelinesCredential supports Federated Identity on Azure Pipelines through Service Connections.
     * @param tenantId - tenantId associated with the service connection
     * @param clientId - clientId associated with the service connection
     * @param serviceConnectionId - Unique ID for the service connection, as found in the querystring's resourceId key
     * @param systemAccessToken - The pipeline's <see href="https://learn.microsoft.com/azure/devops/pipelines/build/variables?view=azure-devops%26tabs=yaml#systemaccesstoken">System.AccessToken</see> value.
     * @param options - The identity client options to use for authentication.
     */ constructor(tenantId, clientId, serviceConnectionId, systemAccessToken, options = {}){
        if (!clientId) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. clientId is a required parameter.`);
        }
        if (!tenantId) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. tenantId is a required parameter.`);
        }
        if (!serviceConnectionId) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. serviceConnectionId is a required parameter.`);
        }
        if (!systemAccessToken) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. systemAccessToken is a required parameter.`);
        }
        // Allow these headers to be logged for troubleshooting by AzurePipelines.
        options.loggingOptions = {
            ...options?.loggingOptions,
            additionalAllowedHeaderNames: [
                ...options.loggingOptions?.additionalAllowedHeaderNames ?? [],
                "x-vss-e2eid",
                "x-msedge-ref"
            ]
        };
        this.identityClient = new identityClient_js_1.IdentityClient(options);
        (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
        logger.info(`Invoking AzurePipelinesCredential with tenant ID: ${tenantId}, client ID: ${clientId}, and service connection ID: ${serviceConnectionId}`);
        if (!process.env.SYSTEM_OIDCREQUESTURI) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. Ensure that you're running this task in an Azure Pipeline, so that following missing system variable(s) can be defined- "SYSTEM_OIDCREQUESTURI"`);
        }
        const oidcRequestUrl = `${process.env.SYSTEM_OIDCREQUESTURI}?api-version=${OIDC_API_VERSION}&serviceConnectionId=${serviceConnectionId}`;
        logger.info(`Invoking ClientAssertionCredential with tenant ID: ${tenantId}, client ID: ${clientId} and service connection ID: ${serviceConnectionId}`);
        this.clientAssertionCredential = new clientAssertionCredential_js_1.ClientAssertionCredential(tenantId, clientId, this.requestOidcToken.bind(this, oidcRequestUrl, systemAccessToken), options);
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} or {@link AuthenticationError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options) {
        if (!this.clientAssertionCredential) {
            const errorMessage = `${credentialName}: is unavailable. To use Federation Identity in Azure Pipelines, the following parameters are required - 
      tenantId,
      clientId,
      serviceConnectionId,
      systemAccessToken,
      "SYSTEM_OIDCREQUESTURI".      
      See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/azurepipelinescredential/troubleshoot`;
            logger.error(errorMessage);
            throw new errors_js_1.CredentialUnavailableError(errorMessage);
        }
        logger.info("Invoking getToken() of Client Assertion Credential");
        return this.clientAssertionCredential.getToken(scopes, options);
    }
    /**
     *
     * @param oidcRequestUrl - oidc request url
     * @param systemAccessToken - system access token
     * @returns OIDC token from Azure Pipelines
     */ async requestOidcToken(oidcRequestUrl, systemAccessToken) {
        logger.info("Requesting OIDC token from Azure Pipelines...");
        logger.info(oidcRequestUrl);
        const request = (0, core_rest_pipeline_1.createPipelineRequest)({
            url: oidcRequestUrl,
            method: "POST",
            headers: (0, core_rest_pipeline_1.createHttpHeaders)({
                "Content-Type": "application/json",
                Authorization: `Bearer ${systemAccessToken}`,
                // Prevents the service from responding with a redirect HTTP status code (useful for automation).
                "X-TFS-FedAuthRedirect": "Suppress"
            })
        });
        const response = await this.identityClient.sendRequest(request);
        return handleOidcResponse(response);
    }
}
exports.AzurePipelinesCredential = AzurePipelinesCredential;
function handleOidcResponse(response) {
    // OIDC token is present in `bodyAsText` field
    const text = response.bodyAsText;
    if (!text) {
        logger.error(`${credentialName}: Authentication Failed. Received null token from OIDC request. Response status- ${response.status}. Complete response - ${JSON.stringify(response)}`);
        throw new errors_js_1.AuthenticationError(response.status, {
            error: `${credentialName}: Authentication Failed. Received null token from OIDC request.`,
            error_description: `${JSON.stringify(response)}. See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/azurepipelinescredential/troubleshoot`
        });
    }
    try {
        const result = JSON.parse(text);
        if (result?.oidcToken) {
            return result.oidcToken;
        } else {
            const errorMessage = `${credentialName}: Authentication Failed. oidcToken field not detected in the response.`;
            let errorDescription = ``;
            if (response.status !== 200) {
                errorDescription = `Response body = ${text}. Response Headers ["x-vss-e2eid"] = ${response.headers.get("x-vss-e2eid")} and ["x-msedge-ref"] = ${response.headers.get("x-msedge-ref")}. See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/azurepipelinescredential/troubleshoot`;
            }
            logger.error(errorMessage);
            logger.error(errorDescription);
            throw new errors_js_1.AuthenticationError(response.status, {
                error: errorMessage,
                error_description: errorDescription
            });
        }
    } catch (e) {
        const errorDetails = `${credentialName}: Authentication Failed. oidcToken field not detected in the response.`;
        logger.error(`Response from service = ${text}, Response Headers ["x-vss-e2eid"] = ${response.headers.get("x-vss-e2eid")} 
      and ["x-msedge-ref"] = ${response.headers.get("x-msedge-ref")}, error message = ${e.message}`);
        logger.error(errorDetails);
        throw new errors_js_1.AuthenticationError(response.status, {
            error: errorDetails,
            error_description: `Response = ${text}. Response headers ["x-vss-e2eid"] = ${response.headers.get("x-vss-e2eid")} and ["x-msedge-ref"] =  ${response.headers.get("x-msedge-ref")}. See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/azurepipelinescredential/troubleshoot`
        });
    }
} //# sourceMappingURL=azurePipelinesCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/authorizationCodeCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthorizationCodeCredential = void 0;
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const tenantIdUtils_js_2 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const scopeUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const msalClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalClient.js [app-route] (ecmascript)");
const logger = (0, logging_js_1.credentialLogger)("AuthorizationCodeCredential");
/**
 * Enables authentication to Microsoft Entra ID using an authorization code
 * that was obtained through the authorization code flow, described in more detail
 * in the Microsoft Entra ID documentation:
 *
 * https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow
 */ class AuthorizationCodeCredential {
    msalClient;
    disableAutomaticAuthentication;
    authorizationCode;
    redirectUri;
    tenantId;
    additionallyAllowedTenantIds;
    clientSecret;
    /**
     * @hidden
     * @internal
     */ constructor(tenantId, clientId, clientSecretOrAuthorizationCode, authorizationCodeOrRedirectUri, redirectUriOrOptions, options){
        (0, tenantIdUtils_js_2.checkTenantId)(logger, tenantId);
        this.clientSecret = clientSecretOrAuthorizationCode;
        if (typeof redirectUriOrOptions === "string") {
            // the clientId+clientSecret constructor
            this.authorizationCode = authorizationCodeOrRedirectUri;
            this.redirectUri = redirectUriOrOptions;
        // in this case, options are good as they come
        } else {
            // clientId only
            this.authorizationCode = clientSecretOrAuthorizationCode;
            this.redirectUri = authorizationCodeOrRedirectUri;
            this.clientSecret = undefined;
            options = redirectUriOrOptions;
        }
        // TODO: Validate tenant if provided
        this.tenantId = tenantId;
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, tenantId, {
            ...options,
            logger,
            tokenCredentialOptions: options ?? {}
        });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */ async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions)=>{
            const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds);
            newOptions.tenantId = tenantId;
            const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
            return this.msalClient.getTokenByAuthorizationCode(arrayScopes, this.redirectUri, this.authorizationCode, this.clientSecret, {
                ...newOptions,
                disableAutomaticAuthentication: this.disableAutomaticAuthentication
            });
        });
    }
}
exports.AuthorizationCodeCredential = AuthorizationCodeCredential; //# sourceMappingURL=authorizationCodeCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/onBehalfOfCredential.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OnBehalfOfCredential = void 0;
const msalClient_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/nodeFlows/msalClient.js [app-route] (ecmascript)");
const logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
const tenantIdUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tenantIdUtils.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
const node_crypto_1 = __turbopack_context__.r("[externals]/node:crypto [external] (node:crypto, cjs)");
const scopeUtils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/scopeUtils.js [app-route] (ecmascript)");
const promises_1 = __turbopack_context__.r("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
const tracing_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/tracing.js [app-route] (ecmascript)");
const credentialName = "OnBehalfOfCredential";
const logger = (0, logging_js_1.credentialLogger)(credentialName);
/**
 * Enables authentication to Microsoft Entra ID using the [On Behalf Of flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-on-behalf-of-flow).
 */ class OnBehalfOfCredential {
    tenantId;
    additionallyAllowedTenantIds;
    msalClient;
    sendCertificateChain;
    certificatePath;
    clientSecret;
    userAssertionToken;
    clientAssertion;
    constructor(options){
        const { clientSecret } = options;
        const { certificatePath, sendCertificateChain } = options;
        const { getAssertion } = options;
        const { tenantId, clientId, userAssertionToken, additionallyAllowedTenants: additionallyAllowedTenantIds } = options;
        if (!tenantId) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
        }
        if (!clientId) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
        }
        if (!clientSecret && !certificatePath && !getAssertion) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: You must provide one of clientSecret, certificatePath, or a getAssertion callback but none were provided. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
        }
        if (!userAssertionToken) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: userAssertionToken is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
        }
        this.certificatePath = certificatePath;
        this.clientSecret = clientSecret;
        this.userAssertionToken = userAssertionToken;
        this.sendCertificateChain = sendCertificateChain;
        this.clientAssertion = getAssertion;
        this.tenantId = tenantId;
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(additionallyAllowedTenantIds);
        this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, this.tenantId, {
            ...options,
            logger,
            tokenCredentialOptions: options
        });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure the underlying network requests.
     */ async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${credentialName}.getToken`, options, async (newOptions)=>{
            newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
            const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
            if (this.certificatePath) {
                const clientCertificate = await this.buildClientCertificate(this.certificatePath);
                return this.msalClient.getTokenOnBehalfOf(arrayScopes, this.userAssertionToken, clientCertificate, newOptions);
            } else if (this.clientSecret) {
                return this.msalClient.getTokenOnBehalfOf(arrayScopes, this.userAssertionToken, this.clientSecret, options);
            } else if (this.clientAssertion) {
                return this.msalClient.getTokenOnBehalfOf(arrayScopes, this.userAssertionToken, this.clientAssertion, options);
            } else {
                // this is an invalid scenario and is a bug, as the constructor should have thrown an error if neither clientSecret nor certificatePath nor clientAssertion were provided
                throw new Error("Expected either clientSecret or certificatePath or clientAssertion to be defined.");
            }
        });
    }
    async buildClientCertificate(certificatePath) {
        try {
            const parts = await this.parseCertificate({
                certificatePath
            }, this.sendCertificateChain);
            return {
                thumbprint: parts.thumbprint,
                thumbprintSha256: parts.thumbprintSha256,
                privateKey: parts.certificateContents,
                x5c: parts.x5c
            };
        } catch (error) {
            logger.info((0, logging_js_1.formatError)("", error));
            throw error;
        }
    }
    async parseCertificate(configuration, sendCertificateChain) {
        const certificatePath = configuration.certificatePath;
        const certificateContents = await (0, promises_1.readFile)(certificatePath, "utf8");
        const x5c = sendCertificateChain ? certificateContents : undefined;
        const certificatePattern = /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g;
        const publicKeys = [];
        // Match all possible certificates, in the order they are in the file. These will form the chain that is used for x5c
        let match;
        do {
            match = certificatePattern.exec(certificateContents);
            if (match) {
                publicKeys.push(match[3]);
            }
        }while (match)
        if (publicKeys.length === 0) {
            throw new Error("The file at the specified path does not contain a PEM-encoded certificate.");
        }
        const thumbprint = (0, node_crypto_1.createHash)("sha1") // CodeQL [SM04514] Needed for backward compatibility reason
        .update(Buffer.from(publicKeys[0], "base64")).digest("hex").toUpperCase();
        const thumbprintSha256 = (0, node_crypto_1.createHash)("sha256").update(Buffer.from(publicKeys[0], "base64")).digest("hex").toUpperCase();
        return {
            certificateContents,
            thumbprintSha256,
            thumbprint,
            x5c
        };
    }
}
exports.OnBehalfOfCredential = OnBehalfOfCredential; //# sourceMappingURL=onBehalfOfCredential.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBearerTokenProvider = exports.AzureAuthorityHosts = exports.logger = exports.WorkloadIdentityCredential = exports.OnBehalfOfCredential = exports.VisualStudioCodeCredential = exports.UsernamePasswordCredential = exports.AzurePowerShellCredential = exports.AuthorizationCodeCredential = exports.AzurePipelinesCredential = exports.DeviceCodeCredential = exports.ManagedIdentityCredential = exports.InteractiveBrowserCredential = exports.AzureDeveloperCliCredential = exports.AzureCliCredential = exports.ClientAssertionCredential = exports.ClientCertificateCredential = exports.EnvironmentCredential = exports.DefaultAzureCredential = exports.ClientSecretCredential = exports.ChainedTokenCredential = exports.deserializeAuthenticationRecord = exports.serializeAuthenticationRecord = exports.AuthenticationRequiredError = exports.CredentialUnavailableErrorName = exports.CredentialUnavailableError = exports.AggregateAuthenticationErrorName = exports.AuthenticationErrorName = exports.AggregateAuthenticationError = exports.AuthenticationError = void 0;
exports.getDefaultAzureCredential = getDefaultAzureCredential;
const tslib_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/plugins/consumer.js [app-route] (ecmascript)"), exports);
const defaultAzureCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/defaultAzureCredential.js [app-route] (ecmascript)");
var errors_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/errors.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AuthenticationError", {
    enumerable: true,
    get: function() {
        return errors_js_1.AuthenticationError;
    }
});
Object.defineProperty(exports, "AggregateAuthenticationError", {
    enumerable: true,
    get: function() {
        return errors_js_1.AggregateAuthenticationError;
    }
});
Object.defineProperty(exports, "AuthenticationErrorName", {
    enumerable: true,
    get: function() {
        return errors_js_1.AuthenticationErrorName;
    }
});
Object.defineProperty(exports, "AggregateAuthenticationErrorName", {
    enumerable: true,
    get: function() {
        return errors_js_1.AggregateAuthenticationErrorName;
    }
});
Object.defineProperty(exports, "CredentialUnavailableError", {
    enumerable: true,
    get: function() {
        return errors_js_1.CredentialUnavailableError;
    }
});
Object.defineProperty(exports, "CredentialUnavailableErrorName", {
    enumerable: true,
    get: function() {
        return errors_js_1.CredentialUnavailableErrorName;
    }
});
Object.defineProperty(exports, "AuthenticationRequiredError", {
    enumerable: true,
    get: function() {
        return errors_js_1.AuthenticationRequiredError;
    }
});
var utils_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/msal/utils.js [app-route] (ecmascript)");
Object.defineProperty(exports, "serializeAuthenticationRecord", {
    enumerable: true,
    get: function() {
        return utils_js_1.serializeAuthenticationRecord;
    }
});
Object.defineProperty(exports, "deserializeAuthenticationRecord", {
    enumerable: true,
    get: function() {
        return utils_js_1.deserializeAuthenticationRecord;
    }
});
var chainedTokenCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/chainedTokenCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ChainedTokenCredential", {
    enumerable: true,
    get: function() {
        return chainedTokenCredential_js_1.ChainedTokenCredential;
    }
});
var clientSecretCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/clientSecretCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ClientSecretCredential", {
    enumerable: true,
    get: function() {
        return clientSecretCredential_js_1.ClientSecretCredential;
    }
});
var defaultAzureCredential_js_2 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/defaultAzureCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "DefaultAzureCredential", {
    enumerable: true,
    get: function() {
        return defaultAzureCredential_js_2.DefaultAzureCredential;
    }
});
var environmentCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/environmentCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "EnvironmentCredential", {
    enumerable: true,
    get: function() {
        return environmentCredential_js_1.EnvironmentCredential;
    }
});
var clientCertificateCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/clientCertificateCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ClientCertificateCredential", {
    enumerable: true,
    get: function() {
        return clientCertificateCredential_js_1.ClientCertificateCredential;
    }
});
var clientAssertionCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/clientAssertionCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ClientAssertionCredential", {
    enumerable: true,
    get: function() {
        return clientAssertionCredential_js_1.ClientAssertionCredential;
    }
});
var azureCliCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/azureCliCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AzureCliCredential", {
    enumerable: true,
    get: function() {
        return azureCliCredential_js_1.AzureCliCredential;
    }
});
var azureDeveloperCliCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/azureDeveloperCliCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AzureDeveloperCliCredential", {
    enumerable: true,
    get: function() {
        return azureDeveloperCliCredential_js_1.AzureDeveloperCliCredential;
    }
});
var interactiveBrowserCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/interactiveBrowserCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "InteractiveBrowserCredential", {
    enumerable: true,
    get: function() {
        return interactiveBrowserCredential_js_1.InteractiveBrowserCredential;
    }
});
var index_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/managedIdentityCredential/index.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ManagedIdentityCredential", {
    enumerable: true,
    get: function() {
        return index_js_1.ManagedIdentityCredential;
    }
});
var deviceCodeCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/deviceCodeCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "DeviceCodeCredential", {
    enumerable: true,
    get: function() {
        return deviceCodeCredential_js_1.DeviceCodeCredential;
    }
});
var azurePipelinesCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/azurePipelinesCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AzurePipelinesCredential", {
    enumerable: true,
    get: function() {
        return azurePipelinesCredential_js_1.AzurePipelinesCredential;
    }
});
var authorizationCodeCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/authorizationCodeCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AuthorizationCodeCredential", {
    enumerable: true,
    get: function() {
        return authorizationCodeCredential_js_1.AuthorizationCodeCredential;
    }
});
var azurePowerShellCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/azurePowerShellCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AzurePowerShellCredential", {
    enumerable: true,
    get: function() {
        return azurePowerShellCredential_js_1.AzurePowerShellCredential;
    }
});
var usernamePasswordCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/usernamePasswordCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "UsernamePasswordCredential", {
    enumerable: true,
    get: function() {
        return usernamePasswordCredential_js_1.UsernamePasswordCredential;
    }
});
var visualStudioCodeCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/visualStudioCodeCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "VisualStudioCodeCredential", {
    enumerable: true,
    get: function() {
        return visualStudioCodeCredential_js_1.VisualStudioCodeCredential;
    }
});
var onBehalfOfCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/onBehalfOfCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "OnBehalfOfCredential", {
    enumerable: true,
    get: function() {
        return onBehalfOfCredential_js_1.OnBehalfOfCredential;
    }
});
var workloadIdentityCredential_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/credentials/workloadIdentityCredential.js [app-route] (ecmascript)");
Object.defineProperty(exports, "WorkloadIdentityCredential", {
    enumerable: true,
    get: function() {
        return workloadIdentityCredential_js_1.WorkloadIdentityCredential;
    }
});
var logging_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/util/logging.js [app-route] (ecmascript)");
Object.defineProperty(exports, "logger", {
    enumerable: true,
    get: function() {
        return logging_js_1.logger;
    }
});
var constants_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/constants.js [app-route] (ecmascript)");
Object.defineProperty(exports, "AzureAuthorityHosts", {
    enumerable: true,
    get: function() {
        return constants_js_1.AzureAuthorityHosts;
    }
});
/**
 * Returns a new instance of the {@link DefaultAzureCredential}.
 */ function getDefaultAzureCredential() {
    return new defaultAzureCredential_js_1.DefaultAzureCredential();
}
var tokenProvider_js_1 = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/@azure/identity/dist/commonjs/tokenProvider.js [app-route] (ecmascript)");
Object.defineProperty(exports, "getBearerTokenProvider", {
    enumerable: true,
    get: function() {
        return tokenProvider_js_1.getBearerTokenProvider;
    }
}); //# sourceMappingURL=index.js.map
}),
];

//# sourceMappingURL=e75cc_%40azure_identity_dist_commonjs_30965d58._.js.map