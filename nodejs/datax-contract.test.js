const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('fs');
const path = require('path');

const schemas = require('./datax-schema');
const { validate, checkShrink, checkPath } = require('./datax-validate');
const { DIRS } = require('./datax-runner');

const DATA_DIRS = [DIRS.datax, DIRS.out_data];

test('datax 契約驗證器本身', async (t) => {
    await t.test('checkPath 路徑語法', () => {
        const item = { a: { b: 1 }, list: [{ x: 1 }, { x: 0 }], empty: [], flag: false };
        assert.equal(checkPath(item, ['a', 'b']), true);
        assert.equal(checkPath(item, ['a', 'c']), false);
        assert.equal(checkPath(item, ['list[]']), true);
        assert.equal(checkPath(item, ['list[]', 'x']), true, '0 也算有值');
        assert.equal(checkPath(item, ['list[]', 'y']), false);
        assert.equal(checkPath(item, ['empty[]']), false, '空陣列不通過 []');
        assert.equal(checkPath(item, ['flag']), true, 'false 也算有值');
        assert.equal(checkPath(item, ['nothing']), false);
    });

    await t.test('validate 基本規則', () => {
        const schema = { type: 'array', minItems: 2, every: ['id'], some: ['opt'] };
        assert.deepEqual(validate([{ id: 1, opt: 1 }, { id: 2 }], schema), []);
        assert.ok(validate([{ id: 1 }], schema).length, 'minItems 未達應報錯');
        assert.ok(validate([{ id: 1, opt: 1 }, {}], schema).length, '缺 every 欄位應報錯');
        assert.ok(validate([{ id: 1 }, { id: 2 }], schema).length, '缺 some 欄位應報錯');
    });

    await t.test('checkShrink 縮水保護', () => {
        assert.deepEqual(checkShrink([1, 2, 3], [1, 2, 3, 4], 'x'), []);
        assert.ok(checkShrink([1], [1, 2, 3, 4], 'x').length, '縮水超過 40% 應報錯');
        assert.deepEqual(checkShrink([1, 2], null, 'x'), [], '無舊資料不檢查');
    });
});

test('datax / out_data 檔案契約', async (t) => {
    await t.test('src/datax 與 out_data 每個 JSON 都必須有 schema 契約', () => {
        const missing = [];
        for (const dir of DATA_DIRS) {
            if (!fs.existsSync(dir)) continue;
            for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
                if (!schemas[f]) missing.push(path.basename(dir) + '/' + f);
            }
        }
        assert.deepEqual(missing, [], '以下檔案缺 schema，請在 nodejs/datax-schema.js 補上使用欄位契約: ' + missing.join(', '));
    });

    await t.test('現有檔案必須通過各自契約', () => {
        const failures = [];
        for (const [file, schema] of Object.entries(schemas)) {
            for (const dir of DATA_DIRS) {
                const p = path.join(dir, file);
                if (!fs.existsSync(p)) continue; // 尚未抓取的包
                const errs = validate(JSON.parse(fs.readFileSync(p, 'utf8')), schema, file);
                if (errs.length) failures.push(errs.join('; '));
            }
        }
        assert.deepEqual(failures, []);
    });

    await t.test('同一資料包不得同時存在於 datax 與 out_data', () => {
        const seen = {};
        const dup = [];
        for (const dir of DATA_DIRS) {
            if (!fs.existsSync(dir)) continue;
            for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
                if (seen[f]) dup.push(f);
                seen[f] = true;
            }
        }
        assert.deepEqual(dup, [], '重複存在的資料包: ' + dup.join(', '));
    });
});

test('datax 外部資料載入接口', async (t) => {
    const { installFakeXHR, loadRocptx } = require('./test-support');
    installFakeXHR();
    const ptx = loadRocptx();

    await t.test('attachData 檔名解析與掛載', () => {
        ptx.datax.attachData('test.fare', { A: { B: 10 } });
        assert.equal(ptx.datax.test.fare.A.B, 10);
        ptx.datax.attachData('test.time.json', [1, 2]);
        assert.deepEqual(ptx.datax.test.time, [1, 2]);
        assert.throws(() => ptx.datax.attachData('bad', {}), (e) => /格式/.test(e));
    });

    await t.test('loadOutDataByFile 讀取 out_data 目錄（Node File API）', async () => {
        const outDir = DIRS.out_data;
        await ptx.datax.loadOutDataByFile(outDir, ['tra.fare', 'thsr.time']);
        assert.ok(ptx.datax.tra.fare['1000'], 'tra.fare 應載入台北站票價');
        assert.ok(Array.isArray(ptx.datax.thsr.time) && ptx.datax.thsr.time.length > 100, 'thsr.time 應載入時刻表');
    });

    await t.test('loadOutDataByFile 不指定 list 時載入全部 JSON', async () => {
        await ptx.datax.loadOutDataByFile(DIRS.out_data);
        assert.ok(ptx.datax.trtc.fare && ptx.datax.klrt.fare && ptx.datax.tra.time, '全部 out_data 包皆掛載');
    });

    await t.test('loadOutDataByURL 以 fetch 載入（stub）', async () => {
        const orig = globalThis.fetch;
        globalThis.fetch = async (url) => ({
            ok: true,
            json: async () => ({ from: url })
        });
        try {
            await ptx.datax.loadOutDataByURL('https://example.com/out_data/', ['demo.fare']);
            assert.equal(ptx.datax.demo.fare.from, 'https://example.com/out_data/demo.fare.json');
        } finally {
            globalThis.fetch = orig;
        }
    });

    await t.test('loadOutDataByURL 缺 list 或 HTTP 錯誤時 reject', async () => {
        await assert.rejects(() => ptx.datax.loadOutDataByURL('https://example.com'), (e) => /list/.test(e));
        const orig = globalThis.fetch;
        globalThis.fetch = async () => ({ ok: false, status: 404 });
        try {
            await assert.rejects(() => ptx.datax.loadOutDataByURL('https://example.com', ['x.fare']), (e) => /404/.test(e));
        } finally {
            globalThis.fetch = orig;
        }
    });

    await t.test('loadOutDataByFile 目錄不存在時 reject 不拋未捕捉錯誤', async () => {
        await assert.rejects(() => ptx.datax.loadOutDataByFile('C:/no/such/dir'), (e) => /失敗/.test(e));
    });
});
