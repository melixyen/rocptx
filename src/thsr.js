import common from './common.js';
import ptx from './ptx.js';
import pData from './data.js';

const thsrV2URL = common.thsrV2URL;

const v2urls = {
    Station: thsrV2URL + '/Station/', //取得車站基本資料
    ODFare: thsrV2URL + '/ODFare/', //取得票價資料
    GeneralTimetable: thsrV2URL + '/GeneralTimetable/', //取得所有車次的定期時刻表資料
    DailyTrainInfo_Today: thsrV2URL + '/DailyTrainInfo/Today/', //取得當天所有車次的車次資料
    DailyTimetable_Today: thsrV2URL + '/DailyTimetable/Today/', //取得當天所有車次的時刻表資料
    AlertInfo: thsrV2URL + '/AlertInfo', //取得即時通阻事件資料
    News: thsrV2URL + '/News', //取得高鐵最新消息資料
    Shape: thsrV2URL + '/Shape/', //取得指定營運業者之軌道路網實體路線圖資資料
    StationExit: thsrV2URL + '/StationExit/', //取得車站基本資料
    //以下為帶有變數的 API
    ODFareFromTo: thsrV2URL + '/ODFare/{OriginStationID}/to/{DestinationStationID}', //取得指定[起訖站間]之票價資料
    GeneralTimetable_TrainNo: thsrV2URL + '/GeneralTimetable/TrainNo/{TrainNo}', //取得指定[車次]的定期時刻表資料
    DailyTrainInfo_Today_TrainNo: thsrV2URL + '/DailyTrainInfo/Today/TrainNo/{TrainNo}', //取得當天指定[車次]的車次資料
    DailyTrainInfo_TrainNo_TrainDate: thsrV2URL + '/DailyTrainInfo/TrainNo/{TrainNo}/TrainDate/{TrainDate}', //取得指定[日期]與[車次]的車次資料
    DailyTimetable_Today_TrainNo: thsrV2URL + '/DailyTimetable/Today/TrainNo/{TrainNo}', //取得當天指定[車次]的時刻表資料
    DailyTimetable_TrainDate_TrainDate: thsrV2URL + '/DailyTimetable/TrainDate/{TrainDate}', //取得指定[日期]所有車次的時刻表資料
    DailyTimetable_TrainNo_TrainDate: thsrV2URL + '/DailyTimetable/TrainNo/{TrainNo}/TrainDate/{TrainDate}', //取得指定[日期],[車次]的時刻表資料
    DailyTimetable_Station_TrainDate: thsrV2URL + '/DailyTimetable/Station/{StationID}/{TrainDate}', //取得指定[日期],[車站]的站別時刻表資料
    DailyTimetable_OD_TrainDate: thsrV2URL + '/DailyTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate}',//取得指定[日期],[起迄站間]之站間時刻表資料
    AvailableSeatStatusList: thsrV2URL + '/AvailableSeatStatusList/{StationID}' //取得動態指定[車站]的對號座剩餘座位資訊看板資料
}


let vars = {
    queryCount: 10000,
    format: 'JSON'
}


let getPTX = ptx.getPromiseURL;

function setDefaultCfg(cfg={}){
    if(typeof(cfg)=='string') cfg = {paramDirectlyUse: cfg};//若傳入的為字串代表直接用於最後的參數不需再調整
    cfg.cbFn = cfg.cbFn || function(data,e){};
    cfg.top = cfg.top || vars.queryCount;
    cfg.format = vars.format;
    return cfg;
}
function processCfg(cfg){//將 cfg 轉為對應的參數
    if(cfg.paramDirectlyUse) return cfg.paramDirectlyUse;
    var aryParam = [];
    if(cfg.selectField) aryParam.push(ptx.selectFieldFn(cfg.selectField));
    if(cfg.filterBy) aryParam.push(ptx.filterFn(cfg.filterBy));
    if(cfg.orderBy){
        var dir = cfg.orderDir || false;
        aryParam.push(ptx.orderByFn(cfg.orderBy, dir));
    }
    aryParam.push(ptx.topFn(cfg.top, cfg.format));//最後加這個

    return '?' + aryParam.join('&');
}

function useStationID2filterBy(StationID, cfg={}){
    cfg.filterBy = cfg.filterBy || '';
    cfg.filterBy += ptx.filterParam('StationID', '==', StationID);
    return cfg;
}

var thsr = {
    companyTag: 'THSR',
    vars: vars
}

thsr.v2 = {
    urls: v2urls,
    getStationOfLine: function(LineID = '', cfg={}){
        cfg.orderBy = 'StationID';
        cfg.orderDir = 'ASC';
        return thsr.v2._Station(cfg);
    },
    getStation: function(StationID, cfg={}){
        cfg = useStationID2filterBy(StationID, cfg);
        return thsr.v2._Station(cfg);
    },
    getStationFare: function(StationID, cfg={}){
        cfg.filterBy = cfg.filterBy || '';
        cfg.filterBy += TT.ptx.filterParam('OriginStationID', '==', StationID);
        return thsr.v2._ODFare(cfg);
    },
    getStationTodayTimeTable: function(StationID, cfg={}){
        let date = new Date();
        let dateStr = date.getFullYear() + '-' + common.appendNumber0(date.getMonth()+1) + '-' + common.appendNumber0(date.getDate());
        return thsr.v2._DailyTimetable_Station_TrainDate(StationID, dateStr, cfg);
    }
}

//產生整包抓取 Function
let catchV2Data = {
    config: {
        Line_callback: (json)=>{//通用預處理
            return json;
        },
        Line_callback_final: (json)=>{//私用預處理
            return json;
        }
    },
    getDataXStationData: function(StationID){
        var rt = ptx.datax['thsr'].station.find((c)=>{return !!(c.StationID==StationID)})
        if(rt){
            var dt = ptx.data.thsr.station_ary.find(c=> !!(c.id==StationID))
            for(var k in dt){
                if(k=='id'){
                    rt['ttid'] = 'thsr_' + dt[k];
                }else if(!rt[k]){
                    rt[k] = dt[k];
                }else{
                    rt['data_' + k] = dt[k];
                }
            }
        }
        return rt;
    },
    getDataXStationName: function(StationID, isEn){
        var st = catchV2Data.getDataXStationData(StationID);
        return (isEn) ? st.ename : st.name;
    },
    GeneralTimetable: function(progressFn){
        if(typeof(progressFn)!='function') progressFn = (msg)=>{};
        //定期時刻表抓法  1.執行 thsr._GeneralTimetable
        progressFn('取得時刻中');
        var atTime = thsr.v2._GeneralTimetable()
        .then(function(res){
            return res.data.map(function(c){
                c.GeneralTimetable.UpdateTime = c.UpdateTime;
                c.GeneralTimetable.VersionID = c.VersionID;
                return c.GeneralTimetable;
            })
        }).catch(function(res){
            return res;
        })
        return atTime;
    },
    Station: function(progressFn){
        if(typeof(progressFn)!='function') progressFn = (msg)=>{};
        progressFn('取得車站中');
        return thsr.v2._Station()
        .then(function(res){
            return res.data.map(function(c){
                return {
                    StationID: c.StationID,
                    lat: c.StationPosition.PositionLat,
                    lon: c.StationPosition.PositionLon,
                    name: c.StationName.Zh_tw,
                    ename: c.StationName.En
                }
            })
        }).catch(function(res){
            return res;
        })
    },
    SimpleTimetable: function(progressFn){
        return catchV2Data.GeneralTimetable(progressFn)
        .then(function(json){
            json.forEach((data,didx)=>{
                let weekStr = [data.ServiceDay.Sunday, data.ServiceDay.Monday, data.ServiceDay.Tuesday, data.ServiceDay.Wednesday, data.ServiceDay.Thursday, data.ServiceDay.Friday, data.ServiceDay.Saturday].map((day,idx)=>{return (day) ? idx.toString() : ''}).join('');
                data.weekStr = weekStr;
                delete data.ServiceDay;

                data.StopTimes.sort(function(a,b){
                    return (a.StopSequence > b.StopSequence) ? 1 : -1;
                })

                data.stopTime = data.StopTimes.map(c=>{
                    return {
                        Arr: c.ArrivalTime,
                        Dep: c.DepartureTime,
                        ID: c.StationID,
                        name: c.StationName.Zh_tw
                    }
                })
                delete data.StopTimes;

                data.info = {};
                let deleteKey = ['EndingStationName','StartingStationName'];
                for(var k in data.GeneralTrainInfo){
                    if(deleteKey.indexOf(k)==-1){
                        data.info[k] = data.GeneralTrainInfo[k];
                    }
                }
                delete data.GeneralTrainInfo;

                if(didx>0){
                    delete data.UpdateTime;
                    delete data.VersionID;
                }
            })
            return json;
        })
    }
}
thsr.v2.catchData = catchV2Data;

//自動產生 Function
function makePTXV2_func(cmd, cfg){
    cfg = setDefaultCfg(cfg);
    var param = processCfg(cfg);
    return getPTX(v2urls[cmd] + param, cfg);
}
var aryMakeV2Function = Object.keys(v2urls);
var ptxAutoTHSRV2FunctionKey = [];
aryMakeV2Function.forEach(function(fn){
    if(!/\{/.test(v2urls[fn])){//排除要傳參數組 URL 的
        thsr.v2['_' + fn] = function(cfg){return makePTXV2_func(fn, cfg);}
        ptxAutoTHSRV2FunctionKey.push('_' + fn);
    }else{//處理有動態參數的
        let urlAry = v2urls[fn].split('/');
        let paramCount = 0;
        let paramAry = [];
        urlAry.forEach((c)=>{if(/^\{/.test(c)){paramCount++; paramAry.push(c); } })

        thsr.v2['_' + fn] = function(){
            let ptr = 0;
            let arg = arguments;
            if(arg.length < paramCount) throw('Lose parameter, need ' + paramAry.join());
            let url = urlAry.map((c)=>{
                if(/^\{/.test(c)){
                    c = arg[ptr];
                    ptr++;
                }
                return c;
            }).join('/');
            let cfg = arguments[paramCount];
            cfg = setDefaultCfg(cfg);
            var param = processCfg(cfg);
            return getPTX(url + param, cfg);
        }
    }
})
thsr.v2.ptxAutoTHSRFunctionKey = ptxAutoTHSRV2FunctionKey;
thsr.v2.getFromToFare = thsr.v2._ODFareFromTo;//alias



export default thsr;