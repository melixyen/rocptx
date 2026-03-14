const fs = require('node:fs');
const path = require('node:path');

const DRADRA_APP_ID_B64 = 'bWVsaXh5ZW4tNGE3MDA1YWQtMWE0Ny00NDAx';
const DRADRA_APP_KEY_B64 = 'MjlhOTM4MzUtNDM4OS00M2EyLTljOGMtMzBmYjgyMDdmZTA2';
const MAX_RETRY_COUNT = 4;
const RETRYABLE_STATUS_CODES = new Set([429]);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRetryDelayMs(response, attempt) {
    const retryAfter = Number(response.headers.get('retry-after'));
    if (Number.isFinite(retryAfter) && retryAfter > 0) {
        return retryAfter * 1000;
    }

    return 1200 * (attempt + 1);
}

class FetchXMLHttpRequest {
    constructor() {
        this.readyState = 0;
        this.status = 0;
        this.statusText = '';
        this.response = '';
        this.responseText = '';
        this.timeout = 0;
        this._method = 'GET';
        this._url = '';
        this._headers = {};
        this._listeners = new Map();
    }

    addEventListener(type, listener) {
        const listeners = this._listeners.get(type) || [];
        listeners.push(listener);
        this._listeners.set(type, listeners);
    }

    open(method, url) {
        this._method = method;
        this._url = url;
        this.readyState = 1;
    }

    setRequestHeader(name, value) {
        this._headers[name] = value;
    }

    async send(body) {
        return this._sendWithRetry(body, 0);
    }

    async _sendWithRetry(body, attempt) {
        const controller = new AbortController();
        let timedOut = false;
        let timeoutHandle;

        if (this.timeout > 0) {
            timeoutHandle = setTimeout(() => {
                timedOut = true;
                controller.abort();
            }, this.timeout);
        }

        try {
            const response = await fetch(this._url, {
                method: this._method,
                headers: this._headers,
                body: this._method === 'GET' ? undefined : body,
                signal: controller.signal
            });

            this.status = response.status;
            this.statusText = response.statusText;
            this.responseText = await response.text();
            this.response = this.responseText;
            this.readyState = 4;

            if (RETRYABLE_STATUS_CODES.has(this.status) && attempt < MAX_RETRY_COUNT) {
                await sleep(getRetryDelayMs(response, attempt));
                return this._sendWithRetry(body, attempt + 1);
            }

            this._dispatch('load');
        } catch (error) {
            this.readyState = 4;
            this.responseText = String(error && error.message ? error.message : error || '');
            this.response = this.responseText;
            this._dispatch(timedOut ? 'timeout' : 'error');
        } finally {
            clearTimeout(timeoutHandle);
        }
    }

    _dispatch(type) {
        const listeners = this._listeners.get(type) || [];
        const event = { target: this, type };

        listeners.forEach((listener) => listener(event));
    }
}

function decodeBase64(value) {
    return Buffer.from(value, 'base64').toString('utf8');
}

function installXMLHttpRequest() {
    if (typeof globalThis.XMLHttpRequest !== 'function') {
        globalThis.XMLHttpRequest = FetchXMLHttpRequest;
    }
}

function resolveCredentials() {
    return {
        appId: process.env.ROCPTX_APP_ID || decodeBase64(DRADRA_APP_ID_B64),
        appKey: process.env.ROCPTX_APP_KEY || decodeBase64(DRADRA_APP_KEY_B64)
    };
}

let rocptxPromise;

async function getRocptx() {
    if (!rocptxPromise) {
        rocptxPromise = (async () => {
            installXMLHttpRequest();

            const distEntry = path.resolve(__dirname, '../dist/ptx.js');
            if (!fs.existsSync(distEntry)) {
                throw new Error(`Missing compiled library at ${distEntry}. Run \"npm run build:node-lib\" first.`);
            }

            const rocptx = require(distEntry);
            const { appId, appKey } = resolveCredentials();

            await rocptx.initToken(appId, appKey);
            return rocptx;
        })();
    }

    return rocptxPromise;
}

module.exports = {
    getRocptx,
    installXMLHttpRequest,
    resolveCredentials
};