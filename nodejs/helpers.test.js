const assert = require('node:assert/strict');
const test = require('node:test');

const { installFakeXHR, loadRocptx } = require('./test-support');

installFakeXHR();
const ptx = loadRocptx();
const common = ptx.common;

test('ptx.filterParam', async (t) => {
    await t.test('運算子映射', () => {
        assert.equal(ptx.filterParam('A', '==', 'x'), "A eq 'x'");
        assert.equal(ptx.filterParam('A', '!=', 'x'), "A ne 'x'");
        assert.equal(ptx.filterParam('A', '>', 5), 'A gt 5');
        assert.equal(ptx.filterParam('A', '>=', 5), 'A ge 5');
        assert.equal(ptx.filterParam('A', '<', 5), 'A lt 5');
        assert.equal(ptx.filterParam('A', '<=', 5), 'A le 5');
    });

    await t.test('字串值加引號、數值不加', () => {
        assert.equal(ptx.filterParam('StationID', '==', 'BL01'), "StationID eq 'BL01'");
        assert.equal(ptx.filterParam('Direction', '==', 0), 'Direction eq 0');
    });

    await t.test('陣列欄位 / 值以 andOr 連接', () => {
        assert.equal(
            ptx.filterParam(['RouteUID', 'Direction'], '==', ['TPE1', '0'], 'and'),
            "RouteUID eq 'TPE1' and Direction eq '0'"
        );
        assert.equal(
            ptx.filterParam('RouteUID', '==', ['TPE1', 'TPE2']),
            "RouteUID eq 'TPE1' or RouteUID eq 'TPE2'"
        );
    });

    await t.test('兩邊皆為陣列但長度不符應 throw', () => {
        assert.throws(
            () => ptx.filterParam(['A', 'B'], '==', ['1', '2', '3']),
            (err) => typeof err === 'string' && /Not equal length/.test(err)
        );
    });
});

test('ptx query helper', async (t) => {
    await t.test('filterFn 編碼', () => {
        assert.equal(ptx.filterFn("A eq 'x'"), encodeURI("$filter=A eq 'x'"));
    });

    await t.test('orderByFn 方向小寫', () => {
        assert.equal(ptx.orderByFn('Name', 'DESC'), encodeURI('$orderby=Name desc'));
        assert.equal(ptx.orderByFn('Name'), encodeURI('$orderby=Name'));
    });

    await t.test('topFn 預設值', () => {
        assert.equal(ptx.topFn(), '$top=3000&$format=JSON');
        assert.equal(ptx.topFn(10, 'XML'), '$top=10&$format=XML');
    });

    await t.test('spatialFilterFn 預設 200 公尺與 StationPosition', () => {
        assert.equal(
            ptx.spatialFilterFn(25.04, 121.51),
            encodeURI('$spatialFilter=nearby(StationPosition, 25.04, 121.51, 200)')
        );
        assert.equal(
            ptx.spatialFilterFn(25.04, 121.51, 500, 'StopPosition'),
            encodeURI('$spatialFilter=nearby(StopPosition, 25.04, 121.51, 500)')
        );
    });

    await t.test('selectFieldFn 陣列 join', () => {
        assert.equal(ptx.selectFieldFn(['A', 'B']), encodeURI('$select=A,B'));
        assert.equal(ptx.selectFieldFn('A,B'), encodeURI('$select=A,B'));
    });
});

test('common 時間工具', async (t) => {
    await t.test('transTime2Sec 基本轉換', () => {
        assert.equal(common.transTime2Sec('01:30'), 5400);
        assert.equal(common.transTime2Sec('1:2:3'), 3723);
        assert.equal(common.transTime2Sec('90'), 90);
        assert.equal(common.transTime2Sec(''), 0);
        assert.equal(common.transTime2Sec(null), 0);
    });

    await t.test('transTime2Sec 跨日 offset（預設跨日點 04:00）', () => {
        assert.equal(common.transTime2Sec('02:00', true), 7200 + 86400, '02:00 在跨日點前應加一天');
        assert.equal(common.transTime2Sec('05:00', true), 18000, '05:00 在跨日點後不加');
    });

    await t.test('transSec2Time', () => {
        assert.equal(common.transSec2Time(5400), '01:30');
        assert.equal(common.transSec2Time(90000), '01:00', '超過 24 小時預設迴繞');
        assert.equal(common.transSec2Time(90000, true), '25:00', 'doNotTransOver24 保留 25:00');
        assert.equal(common.transSec2Time(-3600), '23:00', '負值視為前一日');
        assert.equal(common.transSec2Time(''), '');
    });

    await t.test('appendNumber0', () => {
        assert.equal(common.appendNumber0(5), '05');
        assert.equal(common.appendNumber0(5, 3), '005');
        assert.equal(common.appendNumber0('123'), '123');
    });

    await t.test('weekArray2WeekStr', () => {
        assert.equal(common.weekArray2WeekStr([1, 0, 1, 0, 0, 0, 1]), '026');
        assert.equal(common.weekArray2WeekStr([0, 0, 0, 0, 0, 0, 0]), '');
    });
});

test('common 物件 / 陣列工具', async (t) => {
    await t.test('assign / assignIf', () => {
        assert.deepEqual(common.assign({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
        assert.deepEqual(common.assignIf({ a: 1 }, { a: 9, b: 2 }), { a: 1, b: 2 }, 'assignIf 不覆蓋既有值');
    });

    await t.test('clone 為深拷貝', () => {
        const src = { a: { b: 1 } };
        const copied = common.clone(src);
        copied.a.b = 2;
        assert.equal(src.a.b, 1);
    });

    await t.test('findArrayTarget / findAllArrayarget', () => {
        const ary = [{ id: 1 }, { id: 2 }, { id: 2 }];
        assert.deepEqual(common.findArrayTarget(ary, (c) => c.id === 2), { id: 2 });
        assert.equal(common.findArrayTarget(ary, (c) => c.id === 9), undefined);
        assert.equal(common.findAllArrayarget(ary, (c) => c.id === 2).length, 2);
    });
});
