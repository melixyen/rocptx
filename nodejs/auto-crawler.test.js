const assert = require('node:assert/strict');
const test = require('node:test');

const { createAllCrawlers } = require('./auto-crawler');

const crawlers = createAllCrawlers();
const metroAndTraCrawlers = [
    ['trtc', crawlers.trtc],
    ['krtc', crawlers.krtc],
    ['tymetro', crawlers.tymetro],
    ['tmrt', crawlers.tmrt],
    ['klrt', crawlers.klrt],
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