const fs = require('node:fs');
const path = require('node:path');

const DRADRA_APP_ID_B64 = 'bWVsaXh5ZW4tNGE3MDA1YWQtMWE0Ny00NDAx';
const DRADRA_APP_KEY_B64 = 'MjlhOTM4MzUtNDM4OS00M2EyLTljOGMtMzBmYjgyMDdmZTA2';

// 註：429 rate limit 的自動重試已下沉到 rocptx library 本體（src/ptx.js 的 rateLimitRetry），
//     這個 shim 只負責單純的 XHR ↔ fetch 轉接，避免兩層重試疊加。
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
        this._responseHeaders = null;
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

    getResponseHeader(name) {
        if (!this._responseHeaders) return null;
        const value = this._responseHeaders.get(name);
        return value === undefined ? null : value;
    }

    async send(body) {
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
            this._responseHeaders = response.headers;
            this.responseText = await response.text();
            this.response = this.responseText;
            this.readyState = 4;

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