const assert = require('node:assert/strict');
const test = require('node:test');

const { installFakeXHR, loadRocptx } = require('./test-support');

const FakeXHR = installFakeXHR();
const ptx = loadRocptx();

test('router.v2 捷運 block 推導與路徑搜尋', async (t) => {
    await t.test('getBlockData：trtc / tymc / krtc / ntmc 可離線建立 block', () => {
        for (const company of ['trtc', 'tymc', 'krtc', 'ntmc']) {
            const blocks = ptx.router.v2[company].getBlockData();
            assert.ok(Array.isArray(blocks) && blocks.length > 0, company + ' blocks');
            const flat = blocks.reduce((c, n) => c.concat(n), []);
            assert.ok(flat.every((b) => b.BlockID && b.LineID && /^(station|transfer)$/.test(b.type)), company + ' block 欄位');
        }
    });

    await t.test('router.v2.krtc：紅橘兩線 block 與美麗島轉乘', () => {
        const blocks = ptx.router.v2.krtc.getBlockData();
        assert.equal(blocks.length, 2, '紅線與橘線各一組 block');
        const flat = blocks.reduce((c, n) => c.concat(n), []);
        const transferR = flat.find((b) => b.type === 'transfer' && b.station === 'R10');
        assert.ok(transferR, '紅線 R10 美麗島應為 transfer block');
        assert.deepEqual(transferR.toIDList, ['O5'], 'R10 轉乘目標為橘線 O5');
        assert.ok(transferR.transferList[0].transStation, '應對應到 data.js transStation 美麗島');
        assert.equal(transferR.transferList[0].transStation.id, 'meilidao1');
        const transferO = flat.find((b) => b.type === 'transfer' && b.station === 'O5');
        assert.ok(transferO, '橘線 O5 美麗島應為 transfer block');
    });

    await t.test('router.v2.krtc：同線 getMRTThrough 與 getAllLineRoute', () => {
        const r = ptx.router.v2.krtc;
        const through = r.getMRTThrough('R11', 'R16');
        assert.ok(through, '紅線同線應找得到路徑');
        assert.equal(through.Stations[0], 'R11');
        assert.equal(through.Stations[through.Stations.length - 1], 'R16');
        assert.ok(through.travelTime && through.travelTime.min > 0, '應含 travelTime');

        const routes = r.getAllLineRoute('R14', 'R16');
        assert.ok(routes.length > 0, '同線應有至少一條路徑');
        assert.equal(routes[0].travelStation[0], 'R14');
        assert.equal(routes[0].travelStation[routes[0].travelStation.length - 1], 'R16');
    });

    await t.test('router.v2.krtc：跨線查詢經美麗島轉乘', () => {
        const r = ptx.router.v2.krtc;
        const routes = r.getAllLineRoute('R16', 'O7'); // 紅線左營 -> 橘線文化中心
        assert.ok(routes.length > 0, '跨線應有路徑');
        const first = routes[0];
        assert.equal(first.travelStation[0], 'R16');
        assert.equal(first.travelStation[first.travelStation.length - 1], 'O7');
        assert.ok(first.route.length >= 2, '至少經過兩條路線segment');
        const hasTransfer = first.travelRoute.some((c) => typeof c.TransferTime !== 'undefined');
        assert.ok(hasTransfer, 'travelRoute 應包含美麗島轉乘段');
    });

    await t.test('getStationBlockByID：轉乘站回傳 transfer block', () => {
        const r = ptx.router.v2.trtc;
        const b = r.getStationBlockByID('BL12'); // 台北車站為轉乘站
        assert.ok(b && b.type === 'transfer');
        assert.equal(b.station, 'BL12');
        assert.ok(Array.isArray(b.toIDList) && b.toIDList.length > 0, '轉乘站應有 toIDList');

        const b2 = r.getStationBlockByID('BL13'); // 一般站
        assert.ok(b2 && b2.type === 'station');
        assert.ok(b2.station.includes('BL13'));
    });

    await t.test('findBlock 以 BlockID 取回 block', () => {
        const r = ptx.router.v2.trtc;
        const b = r.getStationBlockByID('BL12');
        const found = r.findBlock(b.BlockID);
        assert.equal(found.BlockID, b.BlockID);
        assert.equal(found.type, 'transfer');
    });

    await t.test('getMRTThrough：同線兩站回傳站序與行駛時間', () => {
        const r = ptx.router.v2.trtc;
        const through = r.getMRTThrough('BL12', 'BL15');
        assert.ok(through, '同線應找得到路徑');
        assert.equal(through.Stations[0], 'BL12');
        assert.equal(through.Stations[through.Stations.length - 1], 'BL15');
        assert.equal(through.Stations.length, 4, 'BL12~BL15 共 4 站');
        assert.ok(through.travelTime && through.travelTime.min > 0, '應含 travelTime');

        // 反方向也應找得到（走 Direction 1 的路由）
        const back = r.getMRTThrough('BL15', 'BL12');
        assert.ok(back && back.Stations[0] === 'BL15');

        // 跨線直接回傳 false
        assert.equal(r.getMRTThrough('BL12', 'R10'), false);
    });

    await t.test('getAllLineRoute：同線查詢', () => {
        const r = ptx.router.v2.trtc;
        const routes = r.getAllLineRoute('BL13', 'BL15');
        assert.ok(routes.length > 0, '同線應有至少一條路徑');
        const first = routes[0];
        assert.equal(first.travelStation[0], 'BL13');
        assert.equal(first.travelStation[first.travelStation.length - 1], 'BL15');
        assert.ok(first.travelTime > 0);
    });

    await t.test('getAllLineRoute：跨線查詢含轉乘', () => {
        const r = ptx.router.v2.trtc;
        const routes = r.getAllLineRoute('BL13', 'R08'); // 板南線 -> 淡水信義線
        assert.ok(routes.length > 0, '跨線應有路徑');
        const first = routes[0];
        assert.equal(first.travelStation[0], 'BL13');
        assert.equal(first.travelStation[first.travelStation.length - 1], 'R08');
        assert.ok(first.route.length >= 2, '至少經過兩條路線segment');
        const hasTransfer = first.travelRoute.some((c) => typeof c.TransferTime !== 'undefined');
        assert.ok(hasTransfer, 'travelRoute 應包含轉乘段');
    });

    await t.test('findTransfer 回傳指定站間轉乘資料', () => {
        const r = ptx.router.v2.trtc;
        const list = ptx.trtc.catchData.getDataXTransferOfLine('BL');
        const sample = list[0];
        const tf = r.findTransfer(sample.FromStationID, sample.ToStationID);
        assert.ok(tf && tf.FromStationID === sample.FromStationID && tf.ToStationID === sample.ToStationID);
    });

    await t.test('router.v2.ntmc：環狀線 block 推導與轉乘站', () => {
        const blocks = ptx.router.v2.ntmc.getBlockData();
        assert.equal(blocks.length, 1, '環狀線一組 block');
        const flat = blocks[0];
        // 轉乘站 Y07 / Y11 / Y16 / Y17 / Y18 應各自成 transfer block
        for (const st of ['Y07', 'Y11', 'Y16', 'Y17', 'Y18']) {
            const b = flat.find((c) => c.type === 'transfer' && c.station === st);
            assert.ok(b, st + ' 應為 transfer block');
            assert.ok(b.toIDList.length > 0, st + ' 應有跨公司轉乘目標（北捷）');
        }
        const b2 = ptx.router.v2.ntmc.getStationBlockByID('Y08');
        assert.ok(b2 && b2.type === 'station' && b2.station.includes('Y08'));
    });

    await t.test('router.v2.ntmc：同線 getMRTThrough 與 getAllLineRoute', () => {
        const r = ptx.router.v2.ntmc;
        const through = r.getMRTThrough('Y07', 'Y11');
        assert.ok(through, '環狀線同線應找得到路徑');
        assert.deepEqual(through.Stations, ['Y07', 'Y08', 'Y09', 'Y10', 'Y11']);
        assert.ok(through.travelTime && through.travelTime.min > 0, '應含 travelTime');

        // 反方向
        const back = r.getMRTThrough('Y11', 'Y07');
        assert.ok(back && back.Stations[0] === 'Y11');

        // 跨越轉乘 block 的查詢（轉乘目標為北捷、不在 ntmc block 內，應被略過而非 throw）
        const routes = r.getAllLineRoute('Y08', 'Y15');
        assert.ok(routes.length > 0, '跨轉乘站的同線查詢應有路徑');
        assert.equal(routes[0].travelStation[0], 'Y08');
        assert.equal(routes[0].travelStation[routes[0].travelStation.length - 1], 'Y15');
        assert.ok(routes[0].travelTime > 0);
    });
});

test('router.bus.findDirectBus（fixture）', async (t) => {
    t.afterEach(() => FakeXHR.reset());

    await t.test('可找到直達公車並判斷方向', async () => {
        const stationA = {
            StationID: '1001', StationUID: 'TPE1001', StationName: { Zh_tw: 'A站' },
            StationPosition: { PositionLat: 25.05, PositionLon: 121.57 }, StationAddress: '', VersionID: 1,
            Stops: [
                { RouteUID: 'TPE10852', RouteName: { Zh_tw: '306' }, StopUID: 'TPE_stopA' },
                { RouteUID: 'TPE99999', RouteName: { Zh_tw: '999' }, StopUID: 'TPE_stopA9' }
            ]
        };
        const stationB = {
            StationID: '2001', StationUID: 'TPE2001', StationName: { Zh_tw: 'B站' },
            StationPosition: { PositionLat: 25.046, PositionLon: 121.537 }, StationAddress: '', VersionID: 1,
            Stops: [
                { RouteUID: 'TPE10852', RouteName: { Zh_tw: '306' }, StopUID: 'TPE_stopB' }
            ]
        };
        FakeXHR.handler = (url) => {
            if (/\/Station\/City\/Taipei/.test(url)) {
                // 以 spatialFilter 的座標分辨 A / B 兩次查詢
                return /25\.05,/.test(decodeURIComponent(url)) ? [stationA] : [stationB];
            }
            if (/\/StopOfRoute\/City\/Taipei/.test(url)) {
                return [{
                    RouteUID: 'TPE10852', RouteName: { Zh_tw: '306' }, Direction: 0,
                    Stops: [{ StopUID: 'TPE_stopA', Sequence: 1 }, { StopUID: 'TPE_stopB', Sequence: 2 }]
                }];
            }
            return [];
        };

        const rt = await ptx.router.bus.findDirectBus(
            { lat: 25.05, lng: 121.57 },
            { lat: 25.046, lng: 121.537 },
            ['TPE']
        );
        assert.ok(rt, '應回傳結果物件');
        assert.equal(rt.mappingStops.length, 1, '只有共同路線 TPE10852 成立');
        const hit = rt.mappingStops[0];
        assert.equal(hit.RouteUID, 'TPE10852');
        assert.equal(hit.isRightBus, true, 'A 在 B 之前，方向正確');
        assert.equal(hit.fromStopIndex, 0);
        assert.equal(hit.toStopIndex, 1);
        assert.ok(rt.hasBusStationA.TPE1001, '起點站應記錄');
        assert.ok(rt.hasBusStationB.TPE2001, '迄點站應記錄');
    });

    await t.test('反方向公車會被過濾', async () => {
        const mkStation = (uid, stop, lat) => ({
            StationID: uid, StationUID: 'TPE' + uid, StationName: { Zh_tw: uid },
            StationPosition: { PositionLat: lat, PositionLon: 121.5 }, StationAddress: '', VersionID: 1,
            Stops: [{ RouteUID: 'TPE10852', RouteName: { Zh_tw: '306' }, StopUID: stop }]
        });
        FakeXHR.handler = (url) => {
            if (/\/Station\/City\/Taipei/.test(url)) {
                return /25\.05,/.test(decodeURIComponent(url)) ? [mkStation('1001', 'TPE_stopA', 25.05)] : [mkStation('2001', 'TPE_stopB', 25.046)];
            }
            if (/\/StopOfRoute\/City\/Taipei/.test(url)) {
                return [{
                    RouteUID: 'TPE10852', Direction: 0,
                    Stops: [{ StopUID: 'TPE_stopB', Sequence: 1 }, { StopUID: 'TPE_stopA', Sequence: 2 }] // B 在 A 前 => 反向
                }];
            }
            return [];
        };

        const rt = await ptx.router.bus.findDirectBus({ lat: 25.05, lng: 121.57 }, { lat: 25.046, lng: 121.537 }, ['TPE']);
        assert.equal(rt.mappingStops.length, 0, '反方向路線應被過濾');
    });

    await t.test('缺少座標回傳 false', async () => {
        assert.equal(await ptx.router.bus.findDirectBus({ lat: 25 }, { lat: 25, lng: 121 }), false);
    });
});
