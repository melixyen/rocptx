const assert = require('node:assert/strict');
const test = require('node:test');

const { installFakeXHR, loadRocptx } = require('./test-support');

installFakeXHR();
const ptx = loadRocptx();
const id = ptx.id;
const pData = ptx.data;
const datax = ptx.datax;

test('id 轉換工具', async (t) => {
    await t.test('getMRTStationIDInWhatLine', () => {
        assert.equal(id.getMRTStationIDInWhatLine('BL12'), 'BL');
        assert.equal(id.getMRTStationIDInWhatLine('R05'), 'R');
        assert.equal(id.getMRTStationIDInWhatLine('A8'), 'A');
        assert.equal(id.getMRTStationIDInWhatLine('BR24'), 'BR');
    });

    await t.test('id.thsr 前綴互轉', () => {
        assert.equal(id.thsr.getPTXV2('thsr_0990'), '0990');
        assert.equal(id.thsr.getRPIDbyPTXV2('0990'), 'thsr_0990');
    });

    await t.test('id.tra v2/v3 互轉（以台北站 1008 <-> 1000 為例）', () => {
        assert.equal(id.tra.getPTXV2('tra_1008'), '1008');
        assert.equal(id.tra.getRPIDbyPTXV2('1008'), 'tra_1008');
        assert.equal(id.tra.getPTXV3('1008'), '1000');
        assert.equal(id.tra.getPTXV3byV2('1008'), '1000');
        assert.equal(id.tra.getPTXV2byV3('1000'), '1008');
        assert.equal(id.tra.getRPIDbyPTXV3('1000'), 'tra_1008');
    });

    await t.test('id.tra 全站 v2 <-> v3 roundtrip', () => {
        const withV3 = pData.tra.station_ary.filter((c) => c.v3id);
        assert.ok(withV3.length > 200, 'tra station 應有大量 v3id 資料');
        for (const st of withV3) {
            const v2 = st.id.replace('tra_', '');
            const v3 = id.tra.getPTXV3byV2(v2);
            assert.equal(v3, st.v3id, `${st.id} 的 v3id 轉換`);
            assert.equal(id.tra.getPTXV2byV3(v3), v2, `${st.id} 的 v3 -> v2 反轉`);
        }
    });

    await t.test('id.trtc / id.tymc / id.ntmc StationID roundtrip', () => {
        assert.equal(id.trtc.getRPIDbyPTXV2('BL12'), 'trtc_051');
        assert.equal(id.trtc.getPTXV2('trtc_051', 'BL'), 'BL12');
        assert.equal(id.ntmc.getRPIDbyPTXV2('Y16'), 'ntmc_y16');
        assert.equal(id.ntmc.getPTXV2('ntmc_y16', 'Y'), 'Y16');

        // 全站 roundtrip：每個 station_ary 項目的每個 StationID 轉回同一個 id
        for (const company of ['trtc', 'tymc', 'krtc', 'ntmc']) {
            for (const st of pData[company].station_ary) {
                for (const StationID of st.StationID) {
                    const rpid = id[company].getRPIDbyPTXV2(StationID);
                    assert.equal(rpid, st.id, `${company} ${StationID} 應轉回 ${st.id}`);
                }
            }
        }
    });

    await t.test('id 線路轉換 getLINE_*', () => {
        for (const company of ['trtc', 'tymc', 'krtc', 'ntmc']) {
            for (const line of pData[company].line) {
                assert.equal(id[company].getLINE_LineIDbyRPID(line.id), line.LineID, `${company} ${line.id}`);
                assert.equal(id[company].getLINE_RPIDbyLineID(line.LineID), line.id, `${company} ${line.LineID}`);
            }
        }
    });

    await t.test('idTrans 以 value 前綴自動判斷公司', () => {
        const data = id.idTrans({ value: 'trtc_051', fromType: 'id', toType: 'StationID', returnType: 'data' });
        assert.ok(data && data.name, 'returnType data 應回傳整筆車站資料');
        assert.equal(data.name, '台北車站');
    });

    await t.test('idTrans 查無資料回傳 false', () => {
        assert.equal(id.idTrans({ value: 'trtc_not_exist', fromType: 'id', toType: 'StationID' }), false);
        assert.equal(id.idTrans({ value: 'no_prefix_company' }), false);
    });

    await t.test('id.ntmc：環狀線 14 站靜態轉換可用', () => {
        assert.equal(pData.ntmc.station_ary.length, 14);
        assert.equal(id.ntmc.getRPIDbyPTXV2('Y07'), 'ntmc_y07');
        assert.equal(id.ntmc.getRPIDbyPTXV2('Y20'), 'ntmc_y20');
        assert.equal(id.ntmc.getLINE_LineIDbyRPID('ntmc_1'), 'Y');
        assert.equal(id.ntmc.getLINE_RPIDbyLineID('Y'), 'ntmc_1');
        // 不存在的站仍回傳 false
        assert.equal(id.ntmc.getRPIDbyPTXV2('Y99'), false);
    });
});

test('data 靜態資料完整性', async (t) => {
    await t.test('bus.city 城市代碼唯一且欄位齊全', () => {
        const citys = pData.bus.city;
        assert.ok(citys.length >= 22, '至少 22 個城市');
        const codes = new Set(), names = new Set();
        for (const c of citys) {
            assert.ok(c.name && c.City && c.CityCode, JSON.stringify(c) + ' 欄位不齊');
            assert.ok(!codes.has(c.CityCode), 'CityCode 重複: ' + c.CityCode);
            assert.ok(!names.has(c.City), 'City 重複: ' + c.City);
            codes.add(c.CityCode);
            names.add(c.City);
        }
    });

    await t.test('metro 公司 line 與 station_ary 對得上', () => {
        for (const company of ['trtc', 'tymc', 'ntmc']) {
            const lineIDs = pData[company].line.map((c) => c.LineID);
            for (const st of pData[company].station_ary) {
                for (const StationID of st.StationID) {
                    const linePrefix = id.getMRTStationIDInWhatLine(StationID);
                    assert.ok(
                        lineIDs.includes(linePrefix),
                        `${company} ${StationID} 的線路前綴 ${linePrefix} 不在 line 清單 [${lineIDs}]`
                    );
                }
            }
        }
    });

    await t.test('transStation 轉乘站資料欄位齊全', () => {
        assert.ok(pData.transStation.length > 0);
        for (const ts of pData.transStation) {
            assert.ok(ts.id && ts.changeLine.length === 2 && ts.changeStation.length === 2, JSON.stringify(ts));
        }
    });
});

test('datax 擴增資料完整性', async (t) => {
    await t.test('datax line 的 Route.Stations 都存在於 station 資料', () => {
        for (const company of ['trtc', 'krtc', 'tymc', 'ntmc']) {
            const stationIDs = new Set(datax[company].station.map((c) => c.StationID));
            for (const line of datax[company].line) {
                for (const route of line.Route) {
                    assert.ok(route.Stations.length > 0, `${company} ${route.RouteID} Stations 不可為空`);
                    for (const st of route.Stations) {
                        assert.ok(stationIDs.has(st), `${company} ${route.RouteID} 的車站 ${st} 不在 station 資料中`);
                    }
                }
            }
        }
    });

    await t.test('datax line 的 Transfer 目標線路存在（含跨公司線）', () => {
        // 2026-07 起 TDX 的 LineTransfer 含跨公司轉乘（如北捷 BL -> 新北捷運環狀線 Y）
        const allLineIDs = new Set();
        for (const company of ['trtc', 'krtc', 'tymc', 'ntmc', 'tmrt', 'klrt']) {
            datax[company].line.forEach((c) => allLineIDs.add(c.LineID));
        }
        for (const company of ['trtc', 'krtc', 'tymc']) {
            for (const line of datax[company].line) {
                for (const tf of line.Transfer) {
                    assert.ok(allLineIDs.has(tf.ToLineID), `${company} ${line.LineID} 轉乘目標線 ${tf.ToLineID} 不存在於任何公司`);
                }
            }
        }
    });

    await t.test('datax.getLine / getStation 查詢', () => {
        const line = datax.getLine('trtc_BL');
        assert.ok(line && line.LineID === 'BL');

        const line2 = datax.getLine('TRTC-BL');
        assert.ok(line2 && line2.LineID === 'BL', 'TRTC- 前綴格式也應可查');

        const st = datax.getStation('trtc_BL12');
        assert.ok(st && st.StationID === 'BL12');

        assert.throws(() => datax.getLine('nosuch_BL'), (err) => /not defined/.test(err));
    });

    await t.test('datax.ntmc：環狀線資料齊全，轉乘全為跨公司（北捷）', () => {
        assert.equal(datax.ntmc.line.length, 1);
        const line = datax.ntmc.line[0];
        assert.equal(line.LineID, 'Y');
        assert.equal(datax.ntmc.station.length, 14);
        // Route 已合併站間行駛時間（router.v2 travelTime 依賴此格式）
        for (const route of line.Route) {
            assert.ok(route.TravelTime && Array.isArray(route.TravelTime.RunTime), `${route.RouteID} dir${route.Direction} 應有 TravelTime.RunTime`);
            assert.equal(route.TravelTime.RunTime.length, route.Stations.length);
        }
        // 環狀線的轉乘目標都是北捷路線（跨公司），不在 ntmc line 清單內
        assert.ok(line.Transfer.length >= 5, '應有轉乘資料');
        const ntmcLineIDs = new Set(datax.ntmc.line.map((c) => c.LineID));
        for (const tf of line.Transfer) {
            assert.ok(!ntmcLineIDs.has(tf.ToLineID), `轉乘目標 ${tf.ToLineID} 應為跨公司路線`);
        }
    });
});
