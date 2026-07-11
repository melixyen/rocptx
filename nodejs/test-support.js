const path = require('path');
const fs = require('fs');

// 假 XMLHttpRequest：攔截 SDK 組出的 URL，不實際發出網路請求，回傳可設定的假資料。
// SDK 的 getURL / getPromiseURL 皆在呼叫時才 new XMLHttpRequest()，因此掛在 global 即可攔截。
// handler 可回傳兩種形式：
//   1. 一般資料（陣列 / 物件）→ 以 status 200 回應
//   2. { __http: { status, headers, body } } → 模擬指定 HTTP 狀態與 response header（測 429 retry 用）
class FakeXMLHttpRequest {
    constructor() {
        this._listeners = {};
        this.readyState = 0;
        this.status = 0;
        this.response = '';
        this._responseHeaders = {};
    }
    addEventListener(type, fn) {
        if (!this._listeners[type]) this._listeners[type] = [];
        this._listeners[type].push(fn);
    }
    open(method, url) {
        this.method = method;
        this.url = url;
        FakeXMLHttpRequest.lastURL = url;
        FakeXMLHttpRequest.lastMethod = method;
        FakeXMLHttpRequest.urls.push(url);
    }
    setRequestHeader() {}
    getResponseHeader(name) {
        const key = Object.keys(this._responseHeaders).find((k) => k.toLowerCase() === String(name).toLowerCase());
        return key === undefined ? null : this._responseHeaders[key];
    }
    send() {
        this.readyState = 4;
        const data = (typeof FakeXMLHttpRequest.handler === 'function')
            ? FakeXMLHttpRequest.handler(this.url, this.method)
            : FakeXMLHttpRequest.responseData;
        if (data && data.__http) {
            this.status = data.__http.status;
            this._responseHeaders = data.__http.headers || {};
            this.response = (typeof data.__http.body === 'string') ? data.__http.body : JSON.stringify(data.__http.body || '');
        } else {
            this.status = 200;
            this._responseHeaders = {};
            this.response = JSON.stringify(data);
        }
        const event = { target: this };
        (this._listeners.load || []).forEach((fn) => fn(event));
    }
}
FakeXMLHttpRequest.lastURL = '';
FakeXMLHttpRequest.lastMethod = '';
FakeXMLHttpRequest.urls = [];
FakeXMLHttpRequest.responseData = [];
FakeXMLHttpRequest.handler = null; // (url, method) => data，設定後優先於 responseData
FakeXMLHttpRequest.reset = function () {
    FakeXMLHttpRequest.lastURL = '';
    FakeXMLHttpRequest.lastMethod = '';
    FakeXMLHttpRequest.urls = [];
    FakeXMLHttpRequest.responseData = [];
    FakeXMLHttpRequest.handler = null;
};

function installFakeXHR() {
    globalThis.XMLHttpRequest = FakeXMLHttpRequest;
    return FakeXMLHttpRequest;
}

function loadRocptx() {
    const distEntry = path.resolve(__dirname, '../dist/rocptx.js');
    if (!fs.existsSync(distEntry)) {
        throw new Error(`Missing compiled library at ${distEntry}. Run "npm run build:node-lib" first.`);
    }
    return require(distEntry);
}

// 取 URL 的 path 部分（去掉 base 與 query string）
function urlPath(url) {
    return url.replace('https://tdx.transportdata.tw/api/basic', '').split('?')[0];
}

function loadSpec(name) {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../doc/tdx_docs', name), 'utf8'));
}

module.exports = {
    FakeXMLHttpRequest,
    installFakeXHR,
    loadRocptx,
    urlPath,
    loadSpec
};
