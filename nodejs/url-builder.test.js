const assert = require('node:assert/strict');
const test = require('node:test');

const { installFakeXHR, loadRocptx, urlPath } = require('./test-support');

const FakeXHR = installFakeXHR();
const ptx = loadRocptx();

function lastPath() {
    return urlPath(FakeXHR.lastURL);
}
function lastQuery() {
    return FakeXHR.lastURL.split('?')[1] || '';
}
function isLoseParameterThrow(err) {
    return typeof err === 'string' && /Lose parameter/.test(err);
}

test('bus v2 URL 組合', async (t) => {
    t.beforeEach(() => FakeXHR.reset());

    await t.test('searchBusByNumber InterCity 不含城市段', () => {
        ptx.bus.searchBusByNumber('1815', null, { manageBy: 'InterCity', cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/Route/InterCity/1815');
    });

    await t.test('searchBusByNumber City 維持 City/{City}/{RouteName}', () => {
        ptx.bus.searchBusByNumber('307', 'Taipei', { cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/Route/City/Taipei/307');
    });

    await t.test('searchBusByNumber 支援中文城市名與路線名編碼', () => {
        ptx.bus.searchBusByNumber('紅30', '臺北市', { cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/Route/City/Taipei/' + encodeURI('紅30'));
    });

    await t.test('getBusStation InterCity', () => {
        ptx.bus.getBusStation('1000', null, { manageBy: 'InterCity', cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/Station/InterCity');
        assert.ok(/StationID/.test(decodeURIComponent(lastQuery())), 'query 應含 StationID filter');
    });

    await t.test('getBusRoute 以 RouteUID 前綴推導城市', () => {
        ptx.bus.getBusRoute('TPE16111', { cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/Route/City/Taipei');
    });

    await t.test('getBusStopRouteByNumber City', () => {
        ptx.bus.getBusStopRouteByNumber('307', 'Taipei', { cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/StopOfRoute/City/Taipei/307');
        assert.ok(/orderby/.test(decodeURIComponent(lastQuery())), 'query 應含 orderby');
    });

    await t.test('getEstimatedTimeOfArrival InterCity', () => {
        ptx.bus.getEstimatedTimeOfArrival('', null, { manageBy: 'InterCity', cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/EstimatedTimeOfArrival/InterCity');
    });

    await t.test('Streaming 系列 City / InterCity', () => {
        ptx.bus.getBusRealTimeNearStopStreaming('Taipei', { cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/RealTimeNearStop/Streaming/City/Taipei');

        ptx.bus.getBusEstimatedTimeOfArrivalStreaming({ manageBy: 'InterCity', cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/EstimatedTimeOfArrival/Streaming/InterCity');

        ptx.bus.getBusEstimatedTimeOfArrivalStreamingByNumber('1815', { manageBy: 'InterCity', cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/EstimatedTimeOfArrival/Streaming/InterCity/1815');
    });

    await t.test('getBusVehicle InterCity 走通用 /v2/Bus/Vehicle', () => {
        ptx.bus.getBusVehicle({ manageBy: 'InterCity', cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/Vehicle');
    });

    await t.test('CityOnly 群組在 InterCity 模式應 throw', () => {
        assert.throws(() => {
            ptx.bus.getBusDisplayStopRoute({ manageBy: 'InterCity', cbFn() {} });
        }, (err) => typeof err === 'string' && /only support City/.test(err));
    });

    // ===== 全方法表格驅動測試 =====

    await t.test('全部 (city, cfg) 型方法：City 與 InterCity 路徑', () => {
        const cityCfgMethods = [
            // [方法名, 群組, InterCity 是否支援]
            ['getBusOperator', 'Operator', true],
            ['getBusRouteFare', 'RouteFare', true],
            ['getBusShape', 'Shape', true],
            ['getBusSchedule', 'Schedule', true],
            ['getBusAlert', 'Alert', true],
            ['getBusStop', 'Stop', true],
            ['getBusDailyTimeTable', 'DailyTimeTable', true],
            ['getBusDataVersion', 'DataVersion', true],
            ['getBusFirstLastTripInfo', 'FirstLastTripInfo', true],
            ['getBusNews', 'News', true],
            ['getBusRealTimeByFrequency', 'RealTimeByFrequency', true],
            ['getBusRealTimeByFrequencyStreaming', 'RealTimeByFrequency/Streaming', true],
            ['getBusRealTimeNearStopStreaming', 'RealTimeNearStop/Streaming', true],
            ['getBusEstimatedTimeOfArrivalStreaming', 'EstimatedTimeOfArrival/Streaming', true],
            ['getBusStationGroup', 'StationGroup', true],
            ['getBusRouteTPASS', 'RouteTPASS', true],
            ['getBusDisplayStopRoute', 'DisplayStopOfRoute', false],
            ['getBusRouteNetwork', 'RouteNetwork', false],
            ['getBusDailyStopTimeTable', 'DailyStopTimeTable', false]
        ];
        for (const [fn, group, interCityOK] of cityCfgMethods) {
            FakeXHR.reset();
            ptx.bus[fn]('Taipei', { cbFn() {} });
            assert.equal(lastPath(), `/v2/Bus/${group}/City/Taipei`, `${fn} City 路徑`);

            if (interCityOK) {
                ptx.bus[fn]({ manageBy: 'InterCity', cbFn() {} });
                assert.equal(lastPath(), `/v2/Bus/${group}/InterCity`, `${fn} InterCity 路徑`);
            } else {
                assert.throws(
                    () => ptx.bus[fn]({ manageBy: 'InterCity', cbFn() {} }),
                    (err) => typeof err === 'string' && /only support City/.test(err),
                    `${fn} InterCity 應 throw`
                );
            }
        }
    });

    await t.test('全部 ByNumber 型方法：City 與 InterCity 路徑', () => {
        const byNumberMethods = [
            ['getBusRouteFareByNumber', 'RouteFare', true],
            ['getBusShapeByNumber', 'Shape', true],
            ['getBusScheduleByNumber', 'Schedule', true],
            ['getBusDailyTimeTableByNumber', 'DailyTimeTable', true],
            ['getBusRealTimeByFrequencyByNumber', 'RealTimeByFrequency', true],
            ['getBusRealTimeByFrequencyStreamingByNumber', 'RealTimeByFrequency/Streaming', true],
            ['getBusRealTimeNearStopStreamingByNumber', 'RealTimeNearStop/Streaming', true],
            ['getBusEstimatedTimeOfArrivalStreamingByNumber', 'EstimatedTimeOfArrival/Streaming', true],
            ['getBusRouteTPASSByNumber', 'RouteTPASS', true],
            ['getBusDisplayStopRouteByNumber', 'DisplayStopOfRoute', false],
            ['getBusRouteNetworkByNumber', 'RouteNetwork', false],
            ['getBusDailyStopTimeTableByNumber', 'DailyStopTimeTable', false]
        ];
        for (const [fn, group, interCityOK] of byNumberMethods) {
            FakeXHR.reset();
            ptx.bus[fn]('307', 'Taipei', { cbFn() {} });
            assert.equal(lastPath(), `/v2/Bus/${group}/City/Taipei/307`, `${fn} City 路徑`);

            if (interCityOK) {
                ptx.bus[fn]('1815', { manageBy: 'InterCity', cbFn() {} });
                assert.equal(lastPath(), `/v2/Bus/${group}/InterCity/1815`, `${fn} InterCity 路徑`);
            } else {
                assert.throws(
                    () => ptx.bus[fn]('1815', { manageBy: 'InterCity', cbFn() {} }),
                    (err) => typeof err === 'string' && /only support City/.test(err),
                    `${fn} InterCity 應 throw`
                );
            }
        }
    });

    await t.test('特殊形態方法', () => {
        // FirstLastTripInfo route-name 版依 Swagger 僅支援 City
        ptx.bus.getBusFirstLastTripInfoByNumber('307', 'Taipei', { cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/FirstLastTripInfo/City/Taipei/307');
        assert.throws(
            () => ptx.bus.getBusFirstLastTripInfoByNumber('1815', { manageBy: 'InterCity', cbFn() {} }),
            (err) => typeof err === 'string' && /only support City/.test(err)
        );

        // S2STravelTime 以 RouteID 為 path 參數
        ptx.bus.getBusS2STravelTime('TPE10132', 'Taipei', { cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/S2STravelTime/City/Taipei/TPE10132');
        ptx.bus.getBusS2STravelTime('THB1234', { manageBy: 'InterCity', cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/S2STravelTime/InterCity/THB1234');

        // getBusArriveTime / getBusRouteArriveTime 轉呼叫 ETA 並帶 filter
        ptx.bus.getBusArriveTime('TPE1000', 'Taipei', { cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/EstimatedTimeOfArrival/City/Taipei');
        assert.ok(/StopUID/.test(decodeURIComponent(FakeXHR.lastURL)), 'getBusArriveTime 應帶 StopUID filter');

        ptx.bus.getBusRouteArriveTime('TPE16111', { cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/EstimatedTimeOfArrival/City/Taipei');
        assert.ok(/RouteUID/.test(decodeURIComponent(FakeXHR.lastURL)), 'getBusRouteArriveTime 應帶 RouteUID filter');

        // getBusRouteInfo 由 RouteUID 推導城市
        ptx.bus.getBusRouteInfo('TPE16111', { cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/Route/City/Taipei');

        // getBusVehicle：City 走 City 路徑、InterCity 走通用路徑（前面已測）
        ptx.bus.getBusVehicle('Taipei', { cbFn() {} });
        assert.equal(lastPath(), '/v2/Bus/Vehicle/City/Taipei');
    });

    await t.test('Promise 型方法', async () => {
        await ptx.bus.getPromisePositionBusStation('Taipei', 25.04, 121.51, {});
        assert.equal(lastPath(), '/v2/Bus/Station/City/Taipei');
        assert.ok(/nearby/.test(decodeURIComponent(FakeXHR.lastURL)), '應帶 spatialFilter');

        await ptx.bus.getPromiseBusStopRoute('TPE16111', 'Taipei', {});
        assert.equal(lastPath(), '/v2/Bus/StopOfRoute/City/Taipei');

        await ptx.bus.getPromiseMultiBusStopRoute(['TPE16111', 'TPE16112'], 'Taipei');
        assert.equal(lastPath(), '/v2/Bus/StopOfRoute/City/Taipei');
        assert.ok(/TPE16112/.test(decodeURIComponent(FakeXHR.lastURL)), '應含多個 RouteUID filter');
    });

    await t.test('進階 NearBy 系列（advanced 服務層級，全臺不分縣市）', async () => {
        const ADV_BASE = 'https://tdx.transportdata.tw/api/advanced';
        function advPath() { return FakeXHR.lastURL.replace(ADV_BASE, '').split('?')[0]; }
        function decoded() { return decodeURIComponent(FakeXHR.lastURL); }

        const nearByMethods = [
            ['getBusStopNearBy', '/v2/Bus/Stop/NearBy'],
            ['getBusStationNearBy', '/v2/Bus/Station/NearBy'],
            ['getBusRouteNearBy', '/v2/Bus/Route/NearBy'],
            ['getBusRealTimeByFrequencyNearBy', '/v2/Bus/RealTimeByFrequency/NearBy'],
            ['getBusRealTimeNearStopNearBy', '/v2/Bus/RealTimeNearStop/NearBy'],
            ['getBusEstimatedTimeOfArrivalNearBy', '/v2/Bus/EstimatedTimeOfArrival/NearBy']
        ];
        for (const [fn, path] of nearByMethods) {
            FakeXHR.reset();
            ptx.bus[fn](25.0023, 121.5045, { cbFn() {} });
            assert.equal(advPath(), path, `${fn} 路徑`);
            assert.ok(/\$spatialFilter=nearby\(25.0023, 121.5045, 200\)/.test(decoded()), `${fn} 應帶不含欄位名的 nearby，預設半徑 200`);
        }

        // cfg.far 自訂半徑，超過 TDX 上限 1000 時應以 1000 送出
        ptx.bus.getBusStopNearBy(25.0023, 121.5045, { far: 500, cbFn() {} });
        assert.ok(/nearby\(25.0023, 121.5045, 500\)/.test(decoded()), 'far=500 應原樣送出');
        ptx.bus.getBusStopNearBy(25.0023, 121.5045, { far: 3000, cbFn() {} });
        assert.ok(/nearby\(25.0023, 121.5045, 1000\)/.test(decoded()), 'far=3000 應被上限 1000 取代');

        // getBusArriveTimeNearBy：StopUID 陣列轉 or filter，且與 spatialFilter 並存
        ptx.bus.getBusArriveTimeNearBy(25.0023, 121.5045, ['TPE213833', 'NWT126498'], { cbFn() {} });
        assert.equal(advPath(), '/v2/Bus/EstimatedTimeOfArrival/NearBy');
        assert.ok(/\$spatialFilter=nearby\(/.test(decoded()), '應帶 spatialFilter');
        assert.ok(/StopUID eq 'TPE213833' or StopUID eq 'NWT126498'/.test(decoded()), '應帶 StopUID or filter');

        // 省略 StopUID 時不帶 $filter
        FakeXHR.reset();
        ptx.bus.getBusArriveTimeNearBy(25.0023, 121.5045, null, { cbFn() {} });
        assert.ok(!/\$filter/.test(decoded()), '未帶 StopUID 不應有 $filter');

        // 未知 group 應 throw
        assert.throws(
            () => ptx.bus.getBusNearBy('NotExist', 25, 121, { cbFn() {} }),
            (err) => typeof err === 'string' && /NearBy group not found/.test(err)
        );

        // Promise 版
        await ptx.bus.getPromiseBusNearBy('EstimatedTimeOfArrival', 25.0023, 121.5045, {});
        assert.equal(advPath(), '/v2/Bus/EstimatedTimeOfArrival/NearBy');
    });
});

test('convenience getter 參數映射', async (t) => {
    t.beforeEach(() => FakeXHR.reset());

    function decodedURL() { return decodeURIComponent(FakeXHR.lastURL); }

    await t.test('metro baseMethod：LineID 型 getter 帶 LineID filter', async () => {
        const lineGetters = [
            ['getRoute', '/v2/Rail/Metro/Route/TRTC'],
            ['getLineFrequency', '/v2/Rail/Metro/Frequency/TRTC'],
            ['getFirstLastTimetable', '/v2/Rail/Metro/FirstLastTimetable/TRTC'],
            ['getStationOfLine', '/v2/Rail/Metro/StationOfLine/TRTC'],
            ['getStationOfRoute', '/v2/Rail/Metro/StationOfRoute/TRTC']
        ];
        for (const [fn, path] of lineGetters) {
            FakeXHR.reset();
            await ptx.trtc[fn]('BL');
            assert.equal(lastPath(), path, fn);
            assert.ok(/LineID eq 'BL'/.test(decodedURL()), `${fn} 應帶 LineID filter`);
        }

        await ptx.trtc.getLineTransfer('BL');
        assert.equal(lastPath(), '/v2/Rail/Metro/LineTransfer/TRTC');
        assert.ok(/FromLineID eq 'BL'/.test(decodedURL()), 'getLineTransfer 應帶 FromLineID filter');
    });

    await t.test('metro baseMethod：StationID 型 getter 帶 StationID filter', async () => {
        const stationGetters = [
            ['getStation', '/v2/Rail/Metro/Station/TRTC'],
            ['getStationTimeTable', '/v2/Rail/Metro/StationTimeTable/TRTC'],
            ['getStationFacility', '/v2/Rail/Metro/StationFacility/TRTC'],
            ['getStationFirstLastTimetable', '/v2/Rail/Metro/FirstLastTimetable/TRTC'],
            ['getStationExit', '/v2/Rail/Metro/StationExit/TRTC'],
            ['getStationLiveBoard', '/v2/Rail/Metro/LiveBoard/TRTC']
        ];
        for (const [fn, path] of stationGetters) {
            FakeXHR.reset();
            await ptx.trtc[fn]('BL12');
            assert.equal(lastPath(), path, fn);
            assert.ok(/StationID eq 'BL12'/.test(decodedURL()), `${fn} 應帶 StationID filter`);
        }
    });

    await t.test('metro baseMethod：票價 getter', async () => {
        await ptx.trtc.getFromToFare('BL12', 'BL15');
        assert.equal(lastPath(), '/v2/Rail/Metro/ODFare/TRTC');
        assert.ok(/OriginStationID eq 'BL12' and DestinationStationID eq 'BL15'/.test(decodedURL()));

        await ptx.trtc.getStationFare('BL12');
        assert.equal(lastPath(), '/v2/Rail/Metro/ODFare/TRTC');
        assert.ok(/OriginStationID eq 'BL12'/.test(decodedURL()));
    });

    await t.test('thsr.v2 getter 映射', async () => {
        await ptx.thsr.v2.getStation('0990');
        assert.equal(lastPath(), '/v2/Rail/THSR/Station');
        assert.ok(/StationID eq '0990'/.test(decodedURL()));

        await ptx.thsr.v2.getStationFare('0990');
        assert.equal(lastPath(), '/v2/Rail/THSR/ODFare');
        assert.ok(/OriginStationID eq '0990'/.test(decodedURL()));

        await ptx.thsr.v2.getStationOfLine();
        assert.equal(lastPath(), '/v2/Rail/THSR/StationOfLine');

        await ptx.thsr.v2.getStationExit('0990');
        assert.equal(lastPath(), '/v2/Rail/THSR/StationExit');
        assert.ok(/StationID eq '0990'/.test(decodedURL()));

        await ptx.thsr.v2.getAvailableSeatStatusListByStation('0990');
        assert.equal(lastPath(), '/v2/Rail/THSR/AvailableSeatStatusList/0990');

        await ptx.thsr.v2.getAvailableSeatStatusToday();
        assert.equal(lastPath(), '/v2/Rail/THSR/AvailableSeatStatus/Train/Leg/Today');

        await ptx.thsr.v2.getAvailableSeatStatusByDate('2026-07-15');
        assert.equal(lastPath(), '/v2/Rail/THSR/AvailableSeatStatus/Train/Leg/TrainDate/2026-07-15');

        await ptx.thsr.v2.getAvailableSeatStatusODByDate('2026-07-15');
        assert.equal(lastPath(), '/v2/Rail/THSR/AvailableSeatStatus/Train/OD/TrainDate/2026-07-15');

        await ptx.thsr.v2.getAvailableSeatStatusODFromToByDate('0990', '1070', '2026-07-15');
        assert.equal(lastPath(), '/v2/Rail/THSR/AvailableSeatStatus/Train/OD/0990/to/1070/TrainDate/2026-07-15');

        await ptx.thsr.v2.getAvailableSeatStatusODFromToByDateTrainNo('0990', '1070', '2026-07-15', '0803');
        assert.equal(lastPath(), '/v2/Rail/THSR/AvailableSeatStatus/Train/OD/0990/to/1070/TrainDate/2026-07-15/TrainNo/0803');

        await ptx.thsr.v2.getDailyFreeSeatingCarToday();
        assert.equal(lastPath(), '/v2/Rail/THSR/DailyFreeSeatingCar/Today');

        await ptx.thsr.v2.getDailyFreeSeatingCarByDate('2026-07-15');
        assert.equal(lastPath(), '/v2/Rail/THSR/DailyFreeSeatingCar/TrainDate/2026-07-15');

        await ptx.thsr.v2.getFromToFare('0990', '1070');
        assert.equal(lastPath(), '/v2/Rail/THSR/ODFare/0990/to/1070');
    });

    await t.test('tra (v2) getter 映射', async () => {
        await ptx.tra.getStation('1008');
        assert.equal(lastPath(), '/v2/Rail/TRA/Station');
        assert.ok(/StationID eq '1008'/.test(decodedURL()));

        await ptx.tra.getStationOfLine('WL');
        assert.equal(lastPath(), '/v2/Rail/TRA/StationOfLine');
        assert.ok(/LineID eq 'WL'/.test(decodedURL()));

        await ptx.tra.getStationFare('1008');
        assert.equal(lastPath(), '/v2/Rail/TRA/ODFare');
        assert.ok(/OriginStationID eq '1008'/.test(decodedURL()));

        await ptx.tra.getFromToFare('1008', '1319');
        assert.equal(lastPath(), '/v2/Rail/TRA/ODFare/1008/to/1319');
    });

    await t.test('tra.v3 getter 映射', async () => {
        await ptx.tra.v3.getStation('1000');
        assert.equal(lastPath(), '/v3/Rail/TRA/Station');
        assert.ok(/StationID eq '1000'/.test(decodedURL()));

        await ptx.tra.v3.getDailyTrainTimetableDates();
        assert.equal(lastPath(), '/v3/Rail/TRA/DailyTrainTimetable/TrainDates');

        await ptx.tra.v3.getOperator();
        assert.equal(lastPath(), '/v3/Rail/TRA/Operator');

        await ptx.tra.v3.getLineNetwork();
        assert.equal(lastPath(), '/v3/Rail/TRA/LineNetwork');

        await ptx.tra.v3.getNews();
        assert.equal(lastPath(), '/v3/Rail/TRA/News');

        await ptx.tra.v3.getStationFacility();
        assert.equal(lastPath(), '/v3/Rail/TRA/StationFacility');
    });

    await t.test('afr.v3 getter 映射', async () => {
        await ptx.afr.v3.getNetwork();
        assert.equal(lastPath(), '/v3/Rail/AFR/Network');

        await ptx.afr.v3.getStation('2200');
        assert.equal(lastPath(), '/v3/Rail/AFR/Station');
        assert.ok(/StationID eq '2200'/.test(decodedURL()));

        await ptx.afr.v3.getLine('AFR');
        assert.equal(lastPath(), '/v3/Rail/AFR/Line');
        assert.ok(/LineID eq 'AFR'/.test(decodedURL()));

        await ptx.afr.v3.getGeneralTrainTimetable('1'); // 有 TrainNo 走 path 版
        assert.equal(lastPath(), '/v3/Rail/AFR/GeneralTrainTimetable/TrainNo/1');

        await ptx.afr.v3.getGeneralTrainTimetable(); // 無參數走列表版
        assert.equal(lastPath(), '/v3/Rail/AFR/GeneralTrainTimetable');

        await ptx.afr.v3.getODFare('2200', '2260'); // 兩參數走 path 版
        assert.equal(lastPath(), '/v3/Rail/AFR/ODFare/2200/to/2260');

        await ptx.afr.v3.getODFare('2200'); // 單參數走 filter 版
        assert.equal(lastPath(), '/v3/Rail/AFR/ODFare');
        assert.ok(/OriginStationID eq '2200'/.test(decodedURL()));

        await ptx.afr.v3.getRoute('R1');
        assert.equal(lastPath(), '/v3/Rail/AFR/Route');
        assert.ok(/RouteID eq 'R1'/.test(decodedURL()));
    });

    await t.test('bus.v3 ByRouteName getter 參數順序（routeName 在前、city 在後）', async () => {
        await ptx.bus.v3.getRealTimeByFrequencyByRouteName('307', 'Taipei');
        assert.equal(lastPath(), '/v3/Bus/RealTimeByFrequency/City/Taipei/307');

        await ptx.bus.v3.getEstimatedTimeOfArrivalByRouteName('307', 'Taipei');
        assert.equal(lastPath(), '/v3/Bus/EstimatedTimeOfArrival/City/Taipei/307');

        await ptx.bus.v3.drts.getStopOfRouteByRouteName('美食', 'Tainan');
        assert.equal(lastPath(), '/v3/Bus/DRTS/StopOfRoute/City/Tainan/' + encodeURI('美食'));

        await ptx.bus.v3.drts.getSubRouteByRouteName('美食', 'Tainan');
        assert.equal(lastPath(), '/v3/Bus/DRTS/SubRoute/City/Tainan/' + encodeURI('美食'));

        await ptx.bus.v3.drts.getDailyStopTimeTableByRouteName('美食', 'Tainan');
        assert.equal(lastPath(), '/v3/Bus/DRTS/DailyStopTimeTable/City/Tainan/' + encodeURI('美食'));
    });
});

test('bus v3 URL 組合', async (t) => {
    t.beforeEach(() => FakeXHR.reset());

    await t.test('一般 CityBus {City} 城市名轉換', async () => {
        await ptx.bus.v3._Route('臺北市');
        assert.equal(lastPath(), '/v3/Bus/Route/City/Taipei');
    });

    await t.test('object-args 形式', async () => {
        await ptx.bus.v3._Route({ City: 'Taipei' });
        assert.equal(lastPath(), '/v3/Bus/Route/City/Taipei');
    });

    await t.test('RouteName 變體與編碼', async () => {
        await ptx.bus.v3._EstimatedTimeOfArrival_RouteName('Taipei', '紅30');
        assert.equal(lastPath(), '/v3/Bus/EstimatedTimeOfArrival/City/Taipei/' + encodeURI('紅30'));
    });

    await t.test('缺參數應 throw Lose parameter', () => {
        assert.throws(() => ptx.bus.v3._EstimatedTimeOfArrival_RouteName('Taipei'), isLoseParameterThrow);
    });

    await t.test('drts 新群組', async () => {
        await ptx.bus.v3.drts._SubRoute('Taipei');
        assert.equal(lastPath(), '/v3/Bus/DRTS/SubRoute/City/Taipei');

        await ptx.bus.v3.drts._GeneralStopTimeTable_RouteName('Tainan', '美食');
        assert.equal(lastPath(), '/v3/Bus/DRTS/GeneralStopTimeTable/City/Tainan/' + encodeURI('美食'));

        await ptx.bus.v3.drts.getLocationGroup('Taichung');
        assert.equal(lastPath(), '/v3/Bus/DRTS/LocationGroup/City/Taichung');
    });

    await t.test('shuttleHospital / shuttleSciencePark AuthorityCode', async () => {
        await ptx.bus.v3.shuttleHospital._StopOfRoute('THB');
        assert.equal(lastPath(), '/v3/Bus/Shuttle/Hospital/StopOfRoute/Authority/THB');

        await ptx.bus.v3.shuttleSciencePark.getSchedule('NSTC');
        assert.equal(lastPath(), '/v3/Bus/Shuttle/SciencePark/Schedule/Authority/NSTC');

        await ptx.bus.v3.shuttleSciencePark._RealTimeNearStop('NSTC');
        assert.equal(lastPath(), '/v3/Bus/Shuttle/SciencePark/RealTimeNearStop/Authority/NSTC');
    });
});

test('metro URL 組合', async (t) => {
    t.beforeEach(() => FakeXHR.reset());

    await t.test('metro._Xxx 以 companyTag 結尾', async () => {
        await ptx.metro._Station('TRTC');
        assert.equal(lastPath(), '/v2/Rail/Metro/Station/TRTC');
    });

    await t.test('公司 wrapper 自動帶入 companyTag', async () => {
        await ptx.trtc._StationTimeTable();
        assert.equal(lastPath(), '/v2/Rail/Metro/StationTimeTable/TRTC');

        await ptx.ntmc._Line();
        assert.equal(lastPath(), '/v2/Rail/Metro/Line/NTMC');
    });

    await t.test('2026-07 新增群組', async () => {
        await ptx.metro._TransferStations('TRTC_NTMC');
        assert.equal(lastPath(), '/v2/Rail/Metro/TransferStations/TRTC_NTMC');

        await ptx.metro._News('TRTC');
        assert.equal(lastPath(), '/v2/Rail/Metro/News/TRTC');

        await ptx.metro._StationPlatform('KLRT');
        assert.equal(lastPath(), '/v2/Rail/Metro/StationPlatform/KLRT');

        await ptx.metro._StoppingPattern('TYMC');
        assert.equal(lastPath(), '/v2/Rail/Metro/StoppingPattern/TYMC');
    });
});

test('thsr v2 URL 組合', async (t) => {
    t.beforeEach(() => FakeXHR.reset());

    await t.test('getDailyTimetableDates', async () => {
        await ptx.thsr.v2.getDailyTimetableDates();
        assert.equal(lastPath(), '/v2/Rail/THSR/DailyTimetable/TrainDates');
    });

    await t.test('getDailyTrainInfoByDate', async () => {
        await ptx.thsr.v2.getDailyTrainInfoByDate('2026-07-15');
        assert.equal(lastPath(), '/v2/Rail/THSR/DailyTrainInfo/TrainDate/2026-07-15');
    });

    await t.test('_ODFareFromTo 參數替換', async () => {
        await ptx.thsr.v2._ODFareFromTo('0990', '1000');
        assert.equal(lastPath(), '/v2/Rail/THSR/ODFare/0990/to/1000');
    });

    await t.test('getStationTodayTimeTable 使用今天日期', async () => {
        await ptx.thsr.v2.getStationTodayTimeTable('0990');
        const d = new Date();
        const today = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
        assert.equal(lastPath(), '/v2/Rail/THSR/DailyTimetable/Station/0990/' + today);
    });
});

test('tra v3 URL 組合', async (t) => {
    t.beforeEach(() => FakeXHR.reset());

    await t.test('OD 多參數替換', async () => {
        await ptx.tra.v3._DailyTrainTimetable_OD_TrainDate('1000', '1008', '2026-07-15');
        assert.equal(lastPath(), '/v3/Rail/TRA/DailyTrainTimetable/OD/1000/to/1008/2026-07-15');
    });

    await t.test('缺參數應 throw Lose parameter', () => {
        assert.throws(() => ptx.tra.v3._DailyTrainTimetable_OD_TrainDate('1000'), isLoseParameterThrow);
    });

    await t.test('GeneralTrainTimetable_TrainNo 使用 v3 正確路徑（2026-07 修正迴歸）', async () => {
        await ptx.tra.v3._GeneralTrainTimetable_TrainNo('110');
        assert.equal(lastPath(), '/v3/Rail/TRA/GeneralTrainTimetable/TrainNo/110');
    });
});

test('rail v2 URL 組合', async (t) => {
    t.beforeEach(() => FakeXHR.reset());

    await t.test('getOperator 無參數端點', async () => {
        await ptx.rail.v2.getOperator();
        assert.equal(lastPath(), '/v2/Rail/Operator');
    });

    await t.test('getS2SDistance', async () => {
        await ptx.rail.v2.getS2SDistance('KRTC');
        assert.equal(lastPath(), '/v2/Rail/S2SDistance/KRTC');
    });

    await t.test('getODFareFromTo 中文站名編碼', async () => {
        await ptx.rail.v2.getODFareFromTo('TRA', '臺北', '高雄');
        assert.equal(lastPath(), '/v2/Rail/ODFare/TRA/' + encodeURI('臺北') + '/to/' + encodeURI('高雄'));
    });

    await t.test('object-args 形式', async () => {
        await ptx.rail.v2._ODDistance({ RailSystem: 'TRA' });
        assert.equal(lastPath(), '/v2/Rail/ODDistance/TRA');
    });

    await t.test('缺參數應 throw Lose parameter', () => {
        assert.throws(() => ptx.rail.v2._S2SDistance(), isLoseParameterThrow);
    });
});

test('afr v3 URL 組合', async (t) => {
    t.beforeEach(() => FakeXHR.reset());

    await t.test('getFromToFare alias', async () => {
        await ptx.afr.v3.getFromToFare('2200', '2260');
        assert.equal(lastPath(), '/v3/Rail/AFR/ODFare/2200/to/2260');
    });
});

test('rocptx.req 通用呼叫器', async (t) => {
    t.beforeEach(() => FakeXHR.reset());

    await t.test('基本呼叫，無 parameters 時預設帶 $format=JSON', async () => {
        await ptx.req('/v2/Rail/TRA/Station');
        assert.equal(FakeXHR.lastURL, 'https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/Station?$format=JSON');
    });

    await t.test('path 沒有前導斜線時自動補上', async () => {
        await ptx.req('v2/Rail/TRA/Station');
        assert.equal(lastPath(), '/v2/Rail/TRA/Station');
    });

    await t.test('path 樣板參數代入，且用掉的 key 不會變成 query', async () => {
        await ptx.req('/v2/Rail/TRA/ODFare/{OriginStationID}/to/{DestinationStationID}', {
            OriginStationID: '1000',
            DestinationStationID: '1020'
        });
        assert.equal(lastPath(), '/v2/Rail/TRA/ODFare/1000/to/1020');
        assert.equal(lastQuery(), '$format=JSON');
    });

    await t.test('缺少樣板參數應 reject', async () => {
        await assert.rejects(
            ptx.req('/v2/Rail/TRA/ODFare/{OriginStationID}/to/{DestinationStationID}', { OriginStationID: '1000' }),
            (err) => typeof err === 'string' && /missing path parameter "DestinationStationID"/.test(err)
        );
    });

    await t.test('path 非字串或空值應 reject', async () => {
        await assert.rejects(ptx.req(), (err) => /path is required/.test(err));
        await assert.rejects(ptx.req(123), (err) => /path is required/.test(err));
    });

    await t.test('$ 開頭與簡寫查詢參數等價', async () => {
        await ptx.req('/v2/Rail/TRA/Station', { top: 5, filter: "StationID eq '1000'" });
        assert.equal(decodeURI(lastQuery()), "$top=5&$filter=StationID eq '1000'&$format=JSON");

        FakeXHR.reset();
        await ptx.req('/v2/Rail/TRA/Station', { '$top': 5, '$filter': "StationID eq '1000'" });
        assert.equal(decodeURI(lastQuery()), "$top=5&$filter=StationID eq '1000'&$format=JSON");
    });

    await t.test('0 與 false 等 falsy 查詢值應保留', async () => {
        await ptx.req('/v2/Rail/TRA/Station', { skip: 0, select: 'StationID' });
        assert.ok(/\$skip=0/.test(decodeURI(lastQuery())), 'skip=0 應保留在 query 中');
    });

    await t.test('options.level 切換服務層級', async () => {
        await ptx.req('/v2/Bus/Route/InterCity', {}, { level: 'advanced' });
        assert.equal(FakeXHR.lastURL.split('?')[0], 'https://tdx.transportdata.tw/api/advanced/v2/Bus/Route/InterCity');
    });

    await t.test('未知 level 應 reject', async () => {
        await assert.rejects(ptx.req('/x', {}, { level: 'nosuch' }), (err) => /unknown options\.level/.test(err));
    });

    await t.test('options.baseURL 完全覆蓋 base', async () => {
        await ptx.req('/custom/path', {}, { baseURL: 'https://example.com/api/' });
        assert.equal(FakeXHR.lastURL.split('?')[0], 'https://example.com/api/custom/path');
    });

    await t.test('path 為完整 http(s) URL 時直接使用，不套用 level/baseURL', async () => {
        await ptx.req('https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/Station', { top: 1 });
        assert.equal(FakeXHR.lastURL.split('?')[0], 'https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/Station');
        assert.equal(decodeURI(lastQuery()), '$top=1&$format=JSON');
    });

    await t.test('options.format 覆蓋預設格式', async () => {
        await ptx.req('/v2/Rail/TRA/Station', {}, { format: 'XML' });
        assert.equal(lastQuery(), '$format=XML');
    });

    await t.test('parameters 內已含 $format 時不再套用預設值', async () => {
        await ptx.req('/v2/Rail/TRA/Station', { format: 'XML' }, { format: 'JSON' });
        assert.equal(lastQuery(), '$format=XML', 'parameters 的 format 優先於 options.format');
    });

    await t.test('options.query 附加原始查詢字串', async () => {
        await ptx.req('/v2/Rail/TRA/Station', {}, { query: '$skip=10' });
        assert.equal(decodeURI(lastQuery()), '$format=JSON&$skip=10');
    });

    await t.test('POST 方法不自動附加 $format，並透過 options.param 帶 body', async () => {
        await ptx.req('https://example.com/token', { grant_type: 'client_credentials' }, { method: 'POST', param: { a: 1 } });
        assert.equal(FakeXHR.lastMethod, 'POST');
        assert.equal(FakeXHR.lastURL, 'https://example.com/token?grant_type=client_credentials');
    });

    await t.test('resolve 值與其他 SDK 方法一致，帶有 .data', async () => {
        FakeXHR.responseData = [{ StationID: '1000', name: '臺北' }];
        const res = await ptx.req('/v2/Rail/TRA/Station');
        assert.deepEqual(res.data, [{ StationID: '1000', name: '臺北' }]);
    });

    await t.test('parameters 為 JSON 字串時自動轉為物件', async () => {
        await ptx.req(
            '/v2/Rail/TRA/ODFare/{OriginStationID}/to/{DestinationStationID}',
            '{"OriginStationID":"1000","DestinationStationID":"1020","top":5}'
        );
        assert.equal(lastPath(), '/v2/Rail/TRA/ODFare/1000/to/1020');
        assert.equal(decodeURI(lastQuery()), '$top=5&$format=JSON');
    });

    await t.test('options 為 JSON 字串時自動轉為物件', async () => {
        await ptx.req('/v2/Bus/Route/InterCity', {}, '{"level":"advanced"}');
        assert.equal(FakeXHR.lastURL.split('?')[0], 'https://tdx.transportdata.tw/api/advanced/v2/Bus/Route/InterCity');
    });

    await t.test('parameters 與 options 同時為 JSON 字串', async () => {
        await ptx.req('/v2/Rail/TRA/Station', '{"top":3}', '{"format":"XML"}');
        assert.equal(decodeURI(lastQuery()), '$top=3&$format=XML');
    });

    await t.test('非合法 JSON 字串應 reject', async () => {
        await assert.rejects(
            ptx.req('/v2/Rail/TRA/Station', 'not json'),
            (err) => typeof err === 'string' && /parameters is a string but not valid JSON/.test(err)
        );
        await assert.rejects(
            ptx.req('/v2/Rail/TRA/Station', {}, '{bad'),
            (err) => typeof err === 'string' && /options is a string but not valid JSON/.test(err)
        );
    });

    await t.test('JSON 字串解析後非物件（陣列 / 純值）應 reject', async () => {
        await assert.rejects(
            ptx.req('/v2/Rail/TRA/Station', '[1,2,3]'),
            (err) => typeof err === 'string' && /must parse to an object/.test(err)
        );
        await assert.rejects(
            ptx.req('/v2/Rail/TRA/Station', '"just a string"'),
            (err) => typeof err === 'string' && /must parse to an object/.test(err)
        );
    });
});
