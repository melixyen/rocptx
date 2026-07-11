const assert = require('node:assert/strict');
const test = require('node:test');

const { createAllCrawlers } = require('./auto-crawler');
const { getRocptx } = require('./runtime');

const crawlers = createAllCrawlers();
const metroAndTraCrawlers = [
    ['trtc', crawlers.trtc],
    ['krtc', crawlers.krtc],
    ['tymc', crawlers.tymc],
    ['tmrt', crawlers.tmrt],
    ['klrt', crawlers.klrt],
    ['ntmc', crawlers.ntmc],
    ['tra', crawlers.tra],
    ['trav3', crawlers.trav3]
];

function assertNonEmptyArray(value, label) {
    assert.ok(Array.isArray(value), `${label} should return an array.`);
    assert.ok(value.length > 0, `${label} should return at least one item.`);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function assertLineAndStationCrawler(name, crawler) {
    const lines = await crawler.listLines();
    assertNonEmptyArray(lines, `${name}.listLines()`);

    const lineId = lines[0] && lines[0].LineID;
    assert.ok(lineId, `${name} first line should include LineID.`);

    const stations = await crawler.getStationsByLine(lineId);
    assertNonEmptyArray(stations, `${name}.getStationsByLine()`);
}

test('crawler smoke tests', { timeout: 600000, concurrency: false }, async (t) => {
    for (const [name, crawler] of metroAndTraCrawlers) {
        await t.test(`${name} crawler can fetch lines and stations`, { timeout: 120000 }, async () => {
            await assertLineAndStationCrawler(name, crawler);
        });
        await sleep(1200);
    }

    await t.test('thsrv2 crawler can fetch stations and station detail', { timeout: 120000 }, async () => {
        const stations = await crawlers.thsrv2.listStations();
        assertNonEmptyArray(stations, 'thsrv2.listStations()');

        const stationId = stations[0] && stations[0].StationID;
        assert.ok(stationId, 'thsrv2 first station should include StationID.');

        const station = await crawlers.thsrv2.getStation(stationId);
        assert.ok(station && typeof station === 'object', 'thsrv2.getStation() should return an object.');
        assert.equal(station.StationID, stationId, 'thsrv2.getStation() should return the requested station.');
    });
});

test('sdk live smoke tests', { timeout: 300000, concurrency: false }, async (t) => {
    const ptx = await getRocptx();

    await t.test('bus v2 InterCity route query works', { timeout: 60000 }, async () => {
        const result = await new Promise((resolve) => {
            ptx.bus.searchBusByNumber('1815', null, {
                manageBy: 'InterCity',
                cbFn: (data) => resolve(data)
            });
        });
        assertNonEmptyArray(result, 'bus.searchBusByNumber(InterCity 1815)');
        assert.ok(/^THB/.test(result[0].RouteUID), 'InterCity route should have THB-prefixed RouteUID.');
    });
    await sleep(1200);

    await t.test('rail.v2 operator and S2S distance work', { timeout: 60000 }, async () => {
        const operators = await ptx.rail.v2.getOperator({ top: 50 });
        assertNonEmptyArray(operators.data, 'rail.v2.getOperator()');

        const distance = await ptx.rail.v2.getS2SDistance('KRTC', { top: 5 });
        assertNonEmptyArray(distance.data, 'rail.v2.getS2SDistance(KRTC)');
    });
    await sleep(1200);

    await t.test('metro TransferStations works for TRTC_NTMC', { timeout: 60000 }, async () => {
        const result = await ptx.metro._TransferStations('TRTC_NTMC', { top: 5 });
        assertNonEmptyArray(result.data, 'metro._TransferStations(TRTC_NTMC)');
    });
    await sleep(1200);

    await t.test('thsr daily timetable dates work', { timeout: 60000 }, async () => {
        const result = await ptx.thsr.v2.getDailyTimetableDates({ top: 100 });
        assert.ok(result.data && Array.isArray(result.data.TrainDates), 'TrainDates should be an array.');
        assert.ok(result.data.TrainDates.length > 0, 'TrainDates should not be empty.');
    });
    await sleep(1200);

    // 哨兵測試：TDX 2026-07 起將 THSR 座位 payload 由 Items 改名 AvailableSeats，若再改名此測試會失敗
    await t.test('thsr available seat payload uses AvailableSeats key', { timeout: 60000 }, async () => {
        const result = await ptx.thsr.v2.getAvailableSeatStatusList({ top: 1 });
        assert.ok(result.data, 'AvailableSeatStatusList should return data.');
        assert.ok('AvailableSeats' in result.data, 'payload key should be AvailableSeats (spec rename sentinel).');
        assert.ok(!('Items' in result.data), 'legacy Items key should no longer exist.');
    });
    await sleep(1200);

    await t.test('bus v2 City route query works', { timeout: 60000 }, async () => {
        const result = await new Promise((resolve) => {
            ptx.bus.searchBusByNumber('307', 'Taipei', { cbFn: (data) => resolve(data) });
        });
        assertNonEmptyArray(result, 'bus.searchBusByNumber(City Taipei 307)');
    });
    await sleep(1200);

    await t.test('bus v3 route and DRTS route queries work', { timeout: 120000 }, async () => {
        // 依 Swagger，一般 CityBus v3 目前僅支援 Tainan
        // 哨兵：Swagger schema 寫 payload 為 Items，實際 API 已改回傳語意化的 Routes
        const v3 = await ptx.bus.v3.getRoute('Tainan', { top: 3 });
        assert.ok(v3.data && Array.isArray(v3.data.Routes) && v3.data.Routes.length > 0, 'bus.v3.getRoute(Tainan) should return Routes.');

        const drts = await ptx.bus.v3.drts.getRoute('NewTaipei', { top: 3 });
        assert.ok(drts.data && Array.isArray(drts.data.Routes || drts.data.Items), 'bus.v3.drts.getRoute(NewTaipei) should return Routes/Items array.');
    });
    await sleep(1200);

    await t.test('afr v3 station query works', { timeout: 60000 }, async () => {
        const result = await ptx.afr.v3.getStation({ top: 5 });
        assert.ok(result.data && Array.isArray(result.data.Stations) && result.data.Stations.length > 0, 'afr.v3.getStation() should return Stations.');
    });
});