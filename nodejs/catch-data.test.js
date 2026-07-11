const assert = require('node:assert/strict');
const test = require('node:test');

const { installFakeXHR, loadRocptx } = require('./test-support');

const FakeXHR = installFakeXHR();
const ptx = loadRocptx();
const datax = ptx.datax;

test('metro catchData 靜態資料查找', async (t) => {
    const cd = ptx.trtc.catchData;

    await t.test('getDataXLineObj / getDataXLineMainSub', () => {
        const line = cd.getDataXLineObj('BL');
        assert.ok(line && line.LineID === 'BL');

        const ms = cd.getDataXLineMainSub('BL');
        assert.ok(Array.isArray(ms.main) && ms.main.length > 0, 'main 路由不可為空');
        assert.ok(Array.isArray(ms.sub));
    });

    await t.test('getDataXRouteMainTerminal 回傳首末站', () => {
        const line = cd.getDataXLineObj('BL');
        const terminal = cd.getDataXRouteMainTerminal('BL');
        const stations = line.Route[0].Stations;
        assert.deepEqual(terminal, [stations[0], stations[stations.length - 1]]);
    });

    await t.test('getDataXS2STravelTime 站間行駛時間累計', () => {
        const rt = cd.getDataXS2STravelTime('BL12', 'BL15');
        assert.ok(rt && Array.isArray(rt.list) && rt.list.length === 3, 'BL12->BL15 應為 3 段');
        assert.equal(rt.list[0].from, 'BL12');
        assert.equal(rt.list[2].to, 'BL15');
        const expectSec = rt.list.reduce((v, c) => v + c.RunTime + c.StopTime, 0);
        assert.equal(rt.sec, expectSec);
        assert.equal(rt.min, Math.ceil(expectSec / 60));
        assert.equal(rt.list[0].StopTime, 0, '起始段不含停站時間');
    });

    await t.test('getDataXStationData / getDataXStationName', () => {
        const st = cd.getDataXStationData('BL12');
        assert.ok(st && st.name === '台北車站');
        assert.equal(cd.getDataXStationName('BL12'), '台北車站');
        assert.equal(cd.getDataXStationName('BL12', true), 'Taipei Main Station');
    });

    await t.test('getDataXTransferOfLine / getDataXTransferStation', () => {
        const list = cd.getDataXTransferOfLine('BL');
        assert.ok(list.length > 0);
        assert.ok(list.every((c) => c.FromLineID === 'BL'));

        const toR = cd.getDataXTransferStation('BL', 'R');
        assert.ok(toR.length > 0);
        assert.ok(toR.every((c) => c.FromLineID === 'BL' && c.ToLineID === 'R'));
    });

    await t.test('getStationByTimeSimpleArray', () => {
        const ary = [{ StationID: 'BL12', x: 1 }, { StationID: 'BL13', x: 2 }];
        assert.equal(cd.getStationByTimeSimpleArray('BL13', ary).x, 2);
        assert.equal(cd.getStationByTimeSimpleArray('BL99', ary), undefined);
    });
});

test('metro catchData 計算邏輯', async (t) => {
    const cd = ptx.trtc.catchData;

    await t.test('calcLineTimeByFirstStation 由首站時間推整條路線各站時間', () => {
        const line = datax.getLine('trtc_BL');
        const route = line.Route.find((c) => c.Direction === 0);
        const stations = route.Stations;
        const times = cd.calcLineTimeByFirstStation('BL', stations[0], '06:00', route.RouteID, 0);

        assert.equal(times.length, stations.length, '每站一個時間');
        assert.equal(times[0], '06:00', '首站時間即輸入時間');
        // 第二站 = 首站 + RunTime[0] + StopTime[1]
        const expectSec = ptx.common.transTime2Sec('06:00') + route.TravelTime.RunTime[0] + (route.TravelTime.StopTime[1] || 0);
        assert.equal(times[1], ptx.common.transSec2Time(expectSec));
        // 時間單調遞增
        for (let i = 1; i < times.length; i++) {
            assert.ok(
                ptx.common.transTime2Sec(times[i], true) >= ptx.common.transTime2Sec(times[i - 1], true),
                `時間應遞增: ${times[i - 1]} -> ${times[i]}`
            );
        }
    });

    await t.test('calcStationDayTimeBySimple 依星期過濾並排序班次', () => {
        const ms = cd.getDataXLineMainSub('BL');
        const mainRouteID = ms.main[0];
        const timeObj = {
            StationID: 'BL12',
            LineID: 'BL',
            Direction: [
                [
                    { RouteID: mainRouteID, To: 'BL23', weekStr: '12345', Timetables: ['06:10', '06:00'] },
                    { RouteID: mainRouteID, To: 'BL23', weekStr: '06', Timetables: ['07:00'] }
                ],
                [
                    { RouteID: mainRouteID, To: 'BL01', weekStr: '12345', Timetables: ['06:05'] }
                ]
            ]
        };
        const rt = cd.calcStationDayTimeBySimple(timeObj, 2); // 星期二
        assert.equal(rt.week, '2');
        assert.ok(rt.main, '應有主線時刻');
        assert.deepEqual(rt.main[0].Simple, ['06:00', '06:10'], '應照時間排序且過濾掉週末班次');
        assert.deepEqual(rt.main[1].Simple, ['06:05']);
        assert.deepEqual(rt.mainTo, [['BL23'], ['BL01']]);

        const rtSat = cd.calcStationDayTimeBySimple(timeObj, 6); // 星期六
        assert.deepEqual(rtSat.main[0].Simple, ['07:00'], '星期六只剩週末班次');
    });

    await t.test('calcStationTimeByHeadWays 由班距推時刻', (subT) => {
        // BR 線：datax 有 Frequency 與車站 FirstLast 資料
        const line = datax.getLine('trtc_BR');
        if (!line || !line.Frequency || !line.Frequency.length) {
            subT.skip('datax BR 線無 Frequency 資料');
            return;
        }
        const route = line.Route.find((c) => c.Direction === 0);
        const rt = cd.calcStationTimeByHeadWays('BR', route.Stations[0], route.RouteID, 0);
        assert.ok(Array.isArray(rt) && rt.length > 0);
        for (const item of rt) {
            assert.ok(typeof item.weekStr === 'string');
            assert.ok(Array.isArray(item.time) && item.time.length > 0);
        }
    });
});

test('metro catchData 抓取整合（fixture）', async (t) => {
    t.afterEach(() => FakeXHR.reset());

    await t.test('catchData.Line 合併路由 / 轉乘 / 站間距 / 班距', async () => {
        FakeXHR.handler = (url) => {
            if (/\/Line\/TRTC/.test(url)) return [{ LineID: 'XX', LineName: { Zh_tw: '測試線' }, LineColor: '#000', IsBranch: false }];
            if (/\/StationOfRoute\/TRTC/.test(url)) return [{ RouteID: 'XX-1', Direction: 0, LineID: 'XX', Stations: [{ StationID: 'XX01' }, { StationID: 'XX02' }] }];
            if (/\/LineTransfer\/TRTC/.test(url)) return [{ FromLineID: 'XX', FromStationID: 'XX01', ToLineID: 'YY', ToStationID: 'YY01', IsOnSiteTransfer: false, TransferTime: 5 }];
            if (/\/S2STravelTime\/TRTC/.test(url)) return [{ LineID: 'XX', RouteID: 'XX-1', TravelTimes: [{ FromStationID: 'XX01', ToStationID: 'XX02', RunTime: 90, StopTime: 20 }] }];
            if (/\/Frequency\/TRTC/.test(url)) return [{
                LineID: 'XX', RouteID: 'XX-1',
                // TDX 現行欄位為 ServiceDay(單數)
                ServiceDay: { ServiceTag: 'weekday', NationalHolidays: false, Sunday: false, Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: false },
                OperationTime: { StartTime: '06:00', EndTime: '24:00' },
                Headways: [{ StartTime: '06:00', EndTime: '09:00', MinHeadwayMins: 4, MaxHeadwayMins: 6 }]
            }];
            return [];
        };

        const json = await ptx.trtc.catchData.Line();
        assert.equal(json.length, 1);
        const line = json[0];
        assert.equal(line.LineID, 'XX');
        assert.deepEqual(line.Route[0].Stations, ['XX01', 'XX02'], 'Stations 應攤平為 StationID 陣列');
        assert.equal(line.Transfer[0].ToLineID, 'YY');
        // trtc 的 Line_callback 會把站間距併入 Route.TravelTime（RunTime / StopTime 陣列）並整理出 main 路由
        assert.deepEqual(line.Route[0].TravelTime.RunTime, [90, 0], '站間行駛時間應併入 Route');
        assert.deepEqual(line.Route[0].TravelTime.StopTime, [20, 0], '停站時間應併入 Route');
        assert.deepEqual(line.main, ['XX-1'], '應整理出主路由清單');
        // Frequency 整理：來源 ServiceDay(單數) 應轉出舊格式 ServiceDays.week（2026-07 修正的迴歸測試）
        const frq = line.Frequency[0];
        assert.deepEqual(frq.OperationTime, ['06:00', '24:00']);
        assert.deepEqual(frq.Headways[0].Time, ['06:00', '09:00']);
        assert.equal(frq.Headways[0].AveMins, 5, '(4+6)/2 = 5');
        assert.deepEqual(frq.ServiceDays.week, [false, true, true, true, true, true, false]);
    });

    await t.test('catchData.TimeSimple 由站別時刻表組出簡化格式（ServiceDay 單數欄位）', async () => {
        FakeXHR.handler = (url) => {
            if (/\/Station\/TRTC/.test(url)) return [{ StationID: 'XX01' }];
            if (/\/StationTimeTable\/TRTC/.test(url)) return [
                {
                    StationID: 'XX01', LineID: 'XX', RouteID: 'XX-1', Direction: 0, DestinationStaionID: 'XX09',
                    ServiceDay: { Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: false, Sunday: false },
                    Timetables: [{ Sequence: 1, DepartureTime: '06:00' }, { Sequence: 2, DepartureTime: '06:10' }]
                },
                {
                    StationID: 'XX01', LineID: 'XX', RouteID: 'XX-1', Direction: 1, DestinationStaionID: 'XX00',
                    ServiceDay: { Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: true, Sunday: true },
                    Timetables: [{ Sequence: 1, DepartureTime: '07:00' }]
                }
            ];
            return [];
        };

        const json = await ptx.trtc.catchData.TimeSimple();
        assert.equal(json.length, 1);
        const st = json[0];
        assert.equal(st.StationID, 'XX01');
        assert.equal(st.LineID, 'XX');
        assert.deepEqual(st.Direction[0][0].Timetables, ['06:00', '06:10']);
        assert.equal(st.Direction[0][0].To, 'XX09');
        assert.equal(st.Direction[0][0].weekStr, '12345', '平日 weekStr');
        assert.equal(st.Direction[1][0].weekStr, '06', '週末 weekStr');
    });

    await t.test('catchData.Station 合併首末班車並整理座標 / 名稱', async () => {
        FakeXHR.handler = (url) => {
            if (/\/Station\/TRTC/.test(url)) return [{ StationID: 'XX01', StationName: { Zh_tw: '測試站', En: 'Test' }, StationPosition: { PositionLat: 25.01, PositionLon: 121.5 } }];
            if (/\/FirstLastTimetable\/TRTC/.test(url)) return [{ StationID: 'XX01', LineID: 'XX', DestinationStaionID: 'XX09', FirstTrainTime: '06:00', LastTrainTime: '00:30' }];
            return [];
        };

        const json = await ptx.trtc.catchData.Station();
        assert.equal(json.length, 1);
        const st = json[0];
        assert.equal(st.name, '測試站');
        assert.equal(st.ename, 'Test');
        assert.ok(!st.StationName, 'StationName 應已刪除');
        assert.ok(Array.isArray(st.FirstLast) && st.FirstLast.length === 1, '應合併首末班車資料');
    });
});

test('thsr / tra catchData 靜態資料查找', async (t) => {
    await t.test('thsr.v2.catchData', () => {
        const st = ptx.thsr.v2.catchData.getDataXStationData('0990');
        assert.ok(st && st.name === '南港');
        assert.equal(ptx.thsr.v2.catchData.getDataXStationName('0990'), '南港');
        assert.equal(ptx.thsr.v2.catchData.getDataXStationName('0990', true), 'Nangang');
    });

    await t.test('tra.catchData：datax 為 v3 ID，v2 ID 查詢走相容層', () => {
        // 2026-07 起 TDX 的 TRA v2 API 改回傳 v3 站 ID，datax 亦為 v3 ID
        const stV3 = ptx.tra.catchData.getDataXStationData('1000');
        assert.ok(stV3 && stV3.name === '臺北', 'v3 ID 直接查詢');

        const stV2 = ptx.tra.catchData.getDataXStationData('1008');
        assert.ok(stV2 && stV2.name === '臺北', 'v2 ID 應經相容層轉換查到同一站');
        assert.equal(stV2.v3id, '1000', '應合併 data 靜態資料的 v3id');
        assert.equal(ptx.tra.catchData.getDataXStationName('1008'), '臺北');
        assert.equal(ptx.tra.catchData.getDataXStationName('1000'), '臺北');
    });
});
