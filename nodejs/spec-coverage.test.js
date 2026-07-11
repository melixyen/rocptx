const assert = require('node:assert/strict');
const test = require('node:test');

const { installFakeXHR, loadRocptx, loadSpec } = require('./test-support');

installFakeXHR();
const ptx = loadRocptx();

const BASE = 'https://tdx.transportdata.tw/api/basic';

// SDK urls map 是 URL template（{Param} 佔位符與 Swagger path 相同），去掉 base 即為 spec path
function templateToSpecPath(url) {
    return url.replace(BASE, '');
}

function assertUrlsInSpec(t, label, urlsMap, specPaths, transform = templateToSpecPath) {
    for (const [key, url] of Object.entries(urlsMap)) {
        const p = transform(url, key);
        assert.ok(specPaths.has(p), `${label}.urls.${key} 的路徑 ${p} 不存在於 Swagger 規格`);
    }
}

test('SDK urls 與 Swagger 規格一致性', async (t) => {
    const railV2Paths = new Set(Object.keys(loadSpec('公共運輸_軌道_v2.json').paths));
    const railV3Paths = new Set(Object.keys(loadSpec('公共運輸_軌道_v3.json').paths));
    const busV2Paths = new Set(Object.keys(loadSpec('公共運輸_公車_v2.json').paths));
    const busV3Paths = new Set(Object.keys(loadSpec('公共運輸_公車_v3.json').paths));

    await t.test('metro.urls（含 RailSystem 佔位）', () => {
        assertUrlsInSpec(t, 'metro', ptx.metro.urls, railV2Paths, (url) => {
            let p = templateToSpecPath(url);
            if (!p.endsWith('/')) p += '/';
            return p + '{RailSystem}';
        });
    });

    await t.test('thsr.v2.urls', () => {
        assertUrlsInSpec(t, 'thsr.v2', ptx.thsr.v2.urls, railV2Paths);
    });

    await t.test('tra.urls (v2)', () => {
        assertUrlsInSpec(t, 'tra(v2)', ptx.tra.urls, railV2Paths);
    });

    await t.test('tra.v3.urls', () => {
        assertUrlsInSpec(t, 'tra.v3', ptx.tra.v3.urls, railV3Paths);
    });

    await t.test('afr.v3.urls', () => {
        assertUrlsInSpec(t, 'afr.v3', ptx.afr.v3.urls, railV3Paths);
    });

    await t.test('rail.v2.urls', () => {
        assertUrlsInSpec(t, 'rail.v2', ptx.rail.v2.urls, railV2Paths);
    });

    await t.test('bus.v3.urls（含 drts / shuttle）', () => {
        assertUrlsInSpec(t, 'bus.v3', ptx.bus.v3.urls, busV3Paths);
        assertUrlsInSpec(t, 'bus.v3.drts', ptx.bus.v3.drts.urls, busV3Paths);
        assertUrlsInSpec(t, 'bus.v3.shuttleHospital', ptx.bus.v3.shuttleHospital.urls, busV3Paths);
        assertUrlsInSpec(t, 'bus.v3.shuttleSciencePark', ptx.bus.v3.shuttleSciencePark.urls, busV3Paths);
    });

    await t.test('bus v2 群組路徑（City / InterCity）', () => {
        // bus v2 沒有 urls map（動態組 URL），以 SDK 實際使用的群組清單對照規格
        const bothVariants = [
            'Route', 'Stop', 'Station', 'StopOfRoute', 'EstimatedTimeOfArrival',
            'RealTimeNearStop', 'RealTimeByFrequency', 'RealTimeByFrequency/Streaming',
            'RealTimeNearStop/Streaming', 'EstimatedTimeOfArrival/Streaming',
            'Operator', 'RouteFare', 'Shape', 'Schedule', 'Alert', 'News',
            'DataVersion', 'FirstLastTripInfo', 'StationGroup', 'DailyTimeTable', 'RouteTPASS'
        ];
        for (const g of bothVariants) {
            assert.ok(busV2Paths.has(`/v2/Bus/${g}/City/{City}`), `bus v2 ${g} 應有 City 路徑`);
            assert.ok(busV2Paths.has(`/v2/Bus/${g}/InterCity`), `bus v2 ${g} 應有 InterCity 路徑`);
        }

        const cityOnly = ['DisplayStopOfRoute', 'RouteNetwork', 'DailyStopTimeTable', 'Vehicle'];
        for (const g of cityOnly) {
            assert.ok(busV2Paths.has(`/v2/Bus/${g}/City/{City}`), `bus v2 ${g} 應有 City 路徑`);
        }

        // 特殊形態
        assert.ok(busV2Paths.has('/v2/Bus/Vehicle'), 'bus v2 應有通用 Vehicle 路徑');
        assert.ok(busV2Paths.has('/v2/Bus/S2STravelTime/City/{City}/{RouteID}'), 'bus v2 S2STravelTime City 需帶 RouteID');
        assert.ok(busV2Paths.has('/v2/Bus/S2STravelTime/InterCity/{RouteID}'), 'bus v2 S2STravelTime InterCity 需帶 RouteID');

        // ByNumber 版使用的 RouteName 變體
        const routeNameVariants = [
            'Route', 'StopOfRoute', 'RouteFare', 'Shape', 'Schedule', 'DailyTimeTable',
            'RealTimeByFrequency', 'RealTimeByFrequency/Streaming', 'RouteTPASS',
            'RealTimeNearStop/Streaming', 'EstimatedTimeOfArrival/Streaming'
        ];
        for (const g of routeNameVariants) {
            assert.ok(busV2Paths.has(`/v2/Bus/${g}/City/{City}/{RouteName}`), `bus v2 ${g} 應有 City RouteName 路徑`);
        }
    });

    await t.test('覆蓋率統計（資訊用，不 fail）', () => {
        const covered = new Set();
        const collect = (urlsMap, transform = templateToSpecPath) => {
            Object.values(urlsMap).forEach((u) => covered.add(transform(u)));
        };
        collect(ptx.bus.v3.urls);
        collect(ptx.bus.v3.drts.urls);
        collect(ptx.bus.v3.shuttleHospital.urls);
        collect(ptx.bus.v3.shuttleSciencePark.urls);
        const uncovered = [...busV3Paths].filter((p) => !covered.has(p));
        console.log(`bus v3 規格 ${busV3Paths.size} 條，SDK 覆蓋 ${busV3Paths.size - uncovered.length} 條`);
        uncovered.forEach((p) => console.log('  未覆蓋: ' + p));
    });
});
