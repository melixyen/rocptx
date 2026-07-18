const assert = require('node:assert/strict');
const test = require('node:test');

const { installFakeXHR, loadRocptx } = require('./test-support');

const FakeXHR = installFakeXHR();
const ptx = loadRocptx();

const RATE_LIMIT_BODY = '{"message":"API rate limit exceeded"}';
const RATE_LIMIT_HEADERS = {
    'retry-after': '10',
    'x-ratelimit-remaining-minute': '0',
    'x-ratelimit-limit-minute': '5',
    'ratelimit-remaining': '0',
    'ratelimit-limit': '5',
    'ratelimit-reset': '10'
};

// 回傳一個 handler：前 failTimes 次回指定的失敗回應，之後回成功資料
function failThenSucceed(failTimes, failResponse, successData) {
    let calls = 0;
    return () => {
        calls++;
        return (calls <= failTimes) ? failResponse : successData;
    };
}

test('TDX rate limit（429）自動重試', async (t) => {
    const originalDelays = ptx.rateLimitRetry.delays;
    const originalMaxWait = ptx.rateLimitRetry.maxWaitSeconds;
    t.beforeEach(() => {
        FakeXHR.reset();
        ptx.rateLimitRetry.enabled = true;
        ptx.rateLimitRetry.useRetryAfterHeader = false; // 測試中避免 header 秒數拖慢，另有專測
        ptx.rateLimitRetry.delays = [5, 5, 5, 5, 5, 5];
        ptx.rateLimitRetry.maxWaitSeconds = 0.03; // 30ms 預算：配合 5ms 退避 = 最多 6 次重試（7 次請求）
    });
    t.afterEach(() => {
        ptx.rateLimitRetry.enabled = true;
        ptx.rateLimitRetry.useRetryAfterHeader = true;
        ptx.rateLimitRetry.delays = originalDelays;
        ptx.rateLimitRetry.maxWaitSeconds = originalMaxWait;
    });

    await t.test('429 兩次後成功：自動重試並 resolve', async () => {
        FakeXHR.handler = failThenSucceed(2,
            { __http: { status: 429, headers: {}, body: RATE_LIMIT_BODY } },
            [{ ok: 1 }]);
        const res = await ptx.getPromiseURL('https://example.com/api');
        assert.deepEqual(res.data, [{ ok: 1 }]);
        assert.equal(FakeXHR.urls.length, 3, '共 1 次原始請求 + 2 次重試');
        assert.equal(res.retryCount, 2);
    });

    await t.test('持續 429：重試到 maxWaitSeconds 預算耗盡（30ms 預算 / 5ms 退避 = 共 7 次請求）才 reject', async () => {
        FakeXHR.handler = () => ({ __http: { status: 429, headers: RATE_LIMIT_HEADERS, body: RATE_LIMIT_BODY } });
        await assert.rejects(
            ptx.getPromiseURL('https://example.com/api'),
            (e) => e.status === ptx.statusCode.FAIL && /rate limit/i.test(e.response)
        );
        assert.equal(FakeXHR.urls.length, 7);
    });

    await t.test('退避序列用完後沿用最後一值，直到預算耗盡（delays=[5] / 20ms 預算 = 4 次重試）', async () => {
        ptx.rateLimitRetry.delays = [5];
        ptx.rateLimitRetry.maxWaitSeconds = 0.02;
        FakeXHR.handler = () => ({ __http: { status: 429, headers: {}, body: RATE_LIMIT_BODY } });
        await assert.rejects(ptx.getPromiseURL('https://example.com/api'));
        assert.equal(FakeXHR.urls.length, 5, '1 次原始請求 + 4 次重試（5ms x 4 = 20ms 預算）');
    });

    await t.test('Retry-After 大於剩餘預算時以剩餘預算為上限，不會等超過 maxWaitSeconds', async () => {
        ptx.rateLimitRetry.useRetryAfterHeader = true;
        ptx.rateLimitRetry.delays = [5];
        ptx.rateLimitRetry.maxWaitSeconds = 0.05;
        const t0 = Date.now();
        FakeXHR.handler = () => ({ __http: { status: 429, headers: { 'retry-after': '30' }, body: RATE_LIMIT_BODY } });
        await assert.rejects(ptx.getPromiseURL('https://example.com/api'));
        const elapsed = Date.now() - t0;
        assert.equal(FakeXHR.urls.length, 2, 'Retry-After 30 秒被剩餘預算 50ms 取代，只重試 1 次');
        assert.ok(elapsed < 5000, '總耗時應遠小於 Retry-After 的 30 秒，實測 ' + elapsed + 'ms');
    });

    await t.test('判斷優先序 2：非 429 但 header remaining=0 也重試', async () => {
        FakeXHR.handler = failThenSucceed(1,
            { __http: { status: 503, headers: { 'x-ratelimit-remaining-minute': '0' }, body: 'busy' } },
            [{ ok: 1 }]);
        const res = await ptx.getPromiseURL('https://example.com/api');
        assert.deepEqual(res.data, [{ ok: 1 }]);
        assert.equal(FakeXHR.urls.length, 2);
    });

    await t.test('判斷優先序 2：ratelimit-remaining（無 x- 前綴）也可識別', async () => {
        FakeXHR.handler = failThenSucceed(1,
            { __http: { status: 503, headers: { 'ratelimit-remaining': '0' }, body: 'busy' } },
            [{ ok: 1 }]);
        await ptx.getPromiseURL('https://example.com/api');
        assert.equal(FakeXHR.urls.length, 2);
    });

    await t.test('判斷優先序 3：無 status / header 線索時以 response message 識別', async () => {
        FakeXHR.handler = failThenSucceed(1,
            { __http: { status: 500, headers: {}, body: RATE_LIMIT_BODY } },
            [{ ok: 1 }]);
        const res = await ptx.getPromiseURL('https://example.com/api');
        assert.deepEqual(res.data, [{ ok: 1 }]);
        assert.equal(FakeXHR.urls.length, 2);
    });

    await t.test('一般錯誤（404）不重試，直接 reject', async () => {
        FakeXHR.handler = () => ({ __http: { status: 404, headers: {}, body: '{"message":"Resouce Not Found"}' } });
        await assert.rejects(ptx.getPromiseURL('https://example.com/api'));
        assert.equal(FakeXHR.urls.length, 1);
    });

    await t.test('header remaining 尚有額度（非 0）時不視為 rate limit', async () => {
        FakeXHR.handler = () => ({ __http: { status: 500, headers: { 'x-ratelimit-remaining-minute': '3' }, body: 'server error' } });
        await assert.rejects(ptx.getPromiseURL('https://example.com/api'));
        assert.equal(FakeXHR.urls.length, 1);
    });

    await t.test('rateLimitRetry.enabled=false 時關閉重試', async () => {
        ptx.rateLimitRetry.enabled = false;
        FakeXHR.handler = () => ({ __http: { status: 429, headers: RATE_LIMIT_HEADERS, body: RATE_LIMIT_BODY } });
        await assert.rejects(ptx.getPromiseURL('https://example.com/api'));
        assert.equal(FakeXHR.urls.length, 1);
    });

    await t.test('getURL（callback 版）同樣走重試，跑完機制才 callback', async () => {
        FakeXHR.handler = failThenSucceed(2,
            { __http: { status: 429, headers: {}, body: RATE_LIMIT_BODY } },
            [{ ok: 'cb' }]);
        const result = await new Promise((resolve) => {
            ptx.getURL('https://example.com/api', (data, event) => resolve({ data, event }));
        });
        assert.deepEqual(result.data, [{ ok: 'cb' }]);
        assert.equal(result.event.status, ptx.statusCode.SUCCESS);
        assert.equal(result.event.retryCount, 2);
        assert.equal(FakeXHR.urls.length, 3, 'callback 只在整個機制結束後呼叫一次');
    });

    await t.test('getURL（callback 版）重試用盡後以失敗 callback', async () => {
        FakeXHR.handler = () => ({ __http: { status: 429, headers: {}, body: RATE_LIMIT_BODY } });
        const result = await new Promise((resolve) => {
            ptx.getURL('https://example.com/api', (data, event) => resolve({ data, event }));
        });
        assert.equal(result.event.status, ptx.statusCode.FAIL);
        assert.equal(FakeXHR.urls.length, 7);
    });

    await t.test('退避序列依序遞增（量測實際間隔）', async () => {
        ptx.rateLimitRetry.delays = [20, 40];
        ptx.rateLimitRetry.maxWaitSeconds = 0.2; // 預算需大於 20+40ms 以免退避被剩餘預算截短
        const timestamps = [];
        FakeXHR.handler = () => {
            timestamps.push(Date.now());
            return (timestamps.length <= 2)
                ? { __http: { status: 429, headers: {}, body: RATE_LIMIT_BODY } }
                : [{ ok: 1 }];
        };
        await ptx.getPromiseURL('https://example.com/api');
        assert.ok(timestamps[1] - timestamps[0] >= 15, '第一次重試間隔應約 20ms，實測 ' + (timestamps[1] - timestamps[0]));
        assert.ok(timestamps[2] - timestamps[1] >= 35, '第二次重試間隔應約 40ms，實測 ' + (timestamps[2] - timestamps[1]));
    });

    await t.test('useRetryAfterHeader：Retry-After 秒數大於退避值時採用 header 值', async () => {
        ptx.rateLimitRetry.useRetryAfterHeader = true;
        ptx.rateLimitRetry.delays = [10];
        ptx.rateLimitRetry.maxWaitSeconds = 2; // 預算需大於 Retry-After 1 秒以免被截短
        const timestamps = [];
        FakeXHR.handler = () => {
            timestamps.push(Date.now());
            return (timestamps.length <= 1)
                ? { __http: { status: 429, headers: { 'retry-after': '1' }, body: RATE_LIMIT_BODY } }
                : [{ ok: 1 }];
        };
        await ptx.getPromiseURL('https://example.com/api');
        assert.ok(timestamps[1] - timestamps[0] >= 950, 'Retry-After 1 秒應優先於 10ms 退避，實測 ' + (timestamps[1] - timestamps[0]) + 'ms');
    });

    await t.test('計數器為每次呼叫獨立：前一次用掉的重試不影響下一次', async () => {
        // 第一次呼叫：吃掉 5 次重試後成功（幾乎用完序列）
        FakeXHR.handler = failThenSucceed(5,
            { __http: { status: 429, headers: {}, body: RATE_LIMIT_BODY } },
            [{ ok: 1 }]);
        const res1 = await ptx.getPromiseURL('https://example.com/api');
        assert.equal(res1.retryCount, 5);
        assert.equal(FakeXHR.urls.length, 6);

        // 第二次呼叫：計數器歸零，仍有完整 6 次重試額度（共 7 次請求）可用
        FakeXHR.urls = [];
        FakeXHR.handler = failThenSucceed(6,
            { __http: { status: 429, headers: {}, body: RATE_LIMIT_BODY } },
            [{ ok: 2 }]);
        const res2 = await ptx.getPromiseURL('https://example.com/api');
        assert.deepEqual(res2.data, [{ ok: 2 }], '第二次呼叫應可用滿完整重試序列後成功');
        assert.equal(res2.retryCount, 6);
        assert.equal(FakeXHR.urls.length, 7);
    });

    await t.test('rocptx.req 也受底層重試保護', async () => {
        FakeXHR.handler = failThenSucceed(1,
            { __http: { status: 429, headers: {}, body: RATE_LIMIT_BODY } },
            [{ StationID: '1000' }]);
        const res = await ptx.req('/v2/Rail/TRA/Station', { top: 1 });
        assert.deepEqual(res.data, [{ StationID: '1000' }]);
        assert.equal(FakeXHR.urls.length, 2);
    });
});
