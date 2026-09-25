const assert = require('node:assert/strict');
const test = require('node:test');

const { installFakeXHR, loadRocptx } = require('./test-support');

const FakeXHR = installFakeXHR();
const ptx = loadRocptx();

// 測試用 proxy 網址；實際 proxy 網址不寫進 library 專案
const PROXY = 'https://proxy.example.com';

test('rocptx.proxy：啟用後送出前把 TDX 網域換成 proxy', async (t) => {
    t.beforeEach(() => {
        FakeXHR.reset();
        FakeXHR.responseData = [{ ok: 1 }];
        ptx.proxy.disable();
        ptx.proxy.headers = {};
    });
    t.after(() => {
        ptx.proxy.disable();
        ptx.proxy.url = '';
        ptx.proxy.headers = {};
    });

    await t.test('預設停用、未內建 proxy 網址、headers 為空', () => {
        assert.equal(ptx.proxy.enabled, false);
        assert.equal(ptx.proxy.url, '');
        assert.deepEqual(ptx.proxy.headers, {});
    });

    await t.test('enable(url, { headers }) 在走 proxy 的請求附加 header，並保留預設 header', async () => {
        ptx.proxy.enable(PROXY, { headers: { Origin: 'http://localhost' } });
        await ptx.req('/v2/Rail/THSR/Station');
        assert.equal(FakeXHR.lastHeaders.Origin, 'http://localhost');
        assert.match(FakeXHR.lastHeaders.Authorization, /^Bearer /);
        await new Promise((resolve) => ptx.getURL('https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/Station?$format=JSON', resolve));
        assert.equal(FakeXHR.lastHeaders.Origin, 'http://localhost');
    });

    await t.test('proxy.headers 同名（不分大小寫）時覆蓋預設 header', async () => {
        ptx.proxy.enable(PROXY, { headers: { authorization: 'Bearer auto' } });
        await ptx.req('/v2/Rail/THSR/Station');
        assert.equal(FakeXHR.lastHeaders.authorization, 'Bearer auto');
        assert.equal(FakeXHR.lastHeaders.Authorization, undefined);
    });

    await t.test('enable 未帶 headers 時保留既有 proxy.headers；也可直接指定 proxy.headers', async () => {
        ptx.proxy.headers = { Origin: 'http://localhost' };
        ptx.proxy.enable(PROXY);
        await ptx.req('/v2/Rail/THSR/Station');
        assert.equal(FakeXHR.lastHeaders.Origin, 'http://localhost');
        assert.throws(() => ptx.proxy.enable(PROXY, { headers: 'Origin' }));
    });

    await t.test('停用或非 TDX 網域時不附加 proxy.headers', async () => {
        ptx.proxy.headers = { Origin: 'http://localhost' };
        await ptx.req('/v2/Rail/THSR/Station');
        assert.equal(FakeXHR.lastHeaders.Origin, undefined);
        ptx.proxy.enable(PROXY);
        await ptx.getPromiseURL('https://example.com/api');
        assert.equal(FakeXHR.lastURL, 'https://example.com/api');
        assert.equal(FakeXHR.lastHeaders.Origin, undefined);
    });

    await t.test('停用時網址不變', async () => {
        await ptx.req('/v2/Rail/THSR/Station');
        assert.equal(FakeXHR.lastURL, 'https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/Station?$format=JSON');
    });

    await t.test('enable() 未帶網址或網址無效時拋錯且不啟用', () => {
        assert.throws(() => ptx.proxy.enable());
        assert.throws(() => ptx.proxy.enable('proxy.example.com'));
        assert.throws(() => ptx.proxy.enable(123));
        assert.equal(ptx.proxy.enabled, false);
    });

    await t.test('啟用後 getPromiseURL（rocptx.req）走 proxy，路徑與參數不變', async () => {
        ptx.proxy.enable(PROXY);
        await ptx.req('/v2/Rail/THSR/Station', { top: 5 });
        assert.equal(FakeXHR.lastURL, PROXY + '/api/basic/v2/Rail/THSR/Station?$top=5&$format=JSON');
    });

    await t.test('啟用後 getURL 與各模組請求走 proxy', async () => {
        ptx.proxy.enable(PROXY);
        await new Promise((resolve) => ptx.getURL('https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/Station?$format=JSON', resolve));
        assert.equal(FakeXHR.lastURL, PROXY + '/api/basic/v2/Rail/TRA/Station?$format=JSON');
        await ptx.thsr.v2.getStation();
        assert.ok(FakeXHR.lastURL.startsWith(PROXY + '/api/basic/v2/Rail/THSR/'));
    });

    await t.test('換 token 請求也走 proxy', async () => {
        ptx.proxy.enable(PROXY);
        FakeXHR.responseData = { access_token: 'fake' };
        await ptx.initToken('auto', 'auto');
        assert.equal(FakeXHR.lastURL, PROXY + '/auth/realms/TDXConnect/protocol/openid-connect/token');
    });

    await t.test('網址去除結尾斜線；setURL 可更換網址且不改變啟用狀態', async () => {
        ptx.proxy.enable('http://localhost:8080/');
        assert.equal(ptx.proxy.url, 'http://localhost:8080');
        ptx.proxy.setURL(PROXY);
        assert.equal(ptx.proxy.enabled, true);
        await ptx.req('/v2/Rail/THSR/Station');
        assert.equal(FakeXHR.lastURL, PROXY + '/api/basic/v2/Rail/THSR/Station?$format=JSON');
        assert.throws(() => ptx.proxy.setURL());
    });

    await t.test('非 TDX 網域不改寫', () => {
        ptx.proxy.enable(PROXY);
        assert.equal(ptx.proxy.resolveURL('https://example.com/api'), 'https://example.com/api');
        assert.equal(ptx.proxy.resolveURL('https://tdx.transportdata.tw.example.com/api'), 'https://tdx.transportdata.tw.example.com/api');
    });

    await t.test('disable 後恢復直連', async () => {
        ptx.proxy.enable(PROXY).disable();
        await ptx.req('/v2/Rail/THSR/Station');
        assert.equal(FakeXHR.lastURL, 'https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/Station?$format=JSON');
    });
});
