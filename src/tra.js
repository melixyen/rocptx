import common from './common.js';
import ptx from './ptx.js';
import pData from './data.js';

const traURL = common.traURL;
const urls = {
    Network: traURL + '/Network', //取得臺鐵路網資料
    Line: traURL + '/Line/', //取得路線基本資料
    Station: traURL + '/Station/', //取得車站基本資料
    StationOfLine: traURL + '/StationOfLine/', //取得路線車站基本資料
    TrainType: traURL + '/TrainType',//取得所有列車車種資料
    ODFare: traURL + '/ODFare/', //取得票價資料
    Shape: traURL + '/Shape/', //取得指定營運業者之軌道路網實體路線圖資資料
    GeneralTrainInfo: traURL + '/GeneralTrainInfo/', //取得所有車次的定期車次資料
    GeneralTimetable: traURL + '/GeneralTimetable/', //取得所有車次的定期時刻表資料
    DailyTrainInfo_Today: traURL + '/DailyTrainInfo/Today/', //取得當天所有車次的車次資料
    DailyTimetable_Today: traURL + '/DailyTimetable/Today/', //取得當天所有車次的時刻表資料
    LiveBoard: traURL + '/LiveBoard/', //取得車站別列車即時到離站電子看板
    LiveTrainDelay: traURL + '/LiveTrainDelay/', //取得列車即時準點/延誤時間資料
    //以下為帶有變數的 API
    ODFareFromTo: traURL + '/ODFare/{OriginStationID}/to/{DestinationStationID}', //取得指定[起訖站間]之票價資料
    GeneralTrainInfo_TrainNo: traURL + '/GeneralTrainInfo/TrainNo/{TrainNo}', //取得指定[車次]的定期車次資料
    GeneralTimetable_TrainNo: traURL + '/GeneralTimetable/TrainNo/{TrainNo}', //取得指定[車次]的定期時刻表資料
    DailyTrainInfo_Today_TrainNo: traURL + '/DailyTrainInfo/Today/TrainNo/{TrainNo}', //取得當天指定[車次]的車次資料
    DailyTrainInfo_TrainDate: traURL + '/DailyTrainInfo/TrainDate/{TrainDate}', //取得指定[日期]所有車次的車次資料 yyyy-MM-dd
    DailyTrainInfo_TrainNo_TrainDate: traURL + '/DailyTrainInfo/TrainNo/{TrainNo}/TrainDate/{TrainDate}', //取得指定[日期]與[車次]的車次資料
    DailyTimetable_Today_TrainNo: traURL + '/DailyTimetable/Today/TrainNo/{TrainNo}', //取得當天指定[車次]的時刻表資料
    DailyTimetable_TrainDate_TrainNo: traURL + '/DailyTimetable/TrainDate/{TrainDate}', //取得指定[日期]所有車次的時刻表資料
    DailyTimetable_TrainNo_TrainDate: traURL + '/DailyTimetable/TrainNo/{TrainNo}/TrainDate/{TrainDate}', //取得指定[日期],[車次]的時刻表資料
    DailyTimetable_Station_TrainDate: traURL + '/DailyTimetable/Station/{StationID}/{TrainDate}', //取得指定[日期],[車站]的站別時刻表資料
    DailyTimetable_OD_TrainDate: traURL + '/DailyTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate}',//取得指定[日期],[起迄站間]之站間時刻表資料
    LiveBoard_Station: traURL + '/LiveBoard/Station/{StationID}' //取得指定[車站]列車即時到離站電子看板(動態前後30分鐘的車次)
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

function useLineID2filterBy(LineID, cfg={}){
    cfg.filterBy = cfg.filterBy || '';
    cfg.filterBy += ptx.filterParam('LineID', '==', LineID);
    return cfg;
}
function useStationID2filterBy(StationID, cfg={}){
    cfg.filterBy = cfg.filterBy || '';
    cfg.filterBy += ptx.filterParam('StationID', '==', StationID);
    return cfg;
}

var tra = {
    companyTag: 'TRA',
    urls: urls,
    vars: vars,
    getStationOfLine: function(LineID, cfg={}){
        cfg = useLineID2filterBy(LineID, cfg);
        return tra._StationOfLine(cfg);
    },
    getStation: function(StationID, cfg={}){
        cfg = useStationID2filterBy(StationID, cfg);
        return tra._Station(cfg);
    },
    getStationFare: function(StationID, cfg={}){
        cfg.filterBy = cfg.filterBy || '';
        cfg.filterBy += TT.ptx.filterParam('OriginStationID', '==', StationID);
        return tra._ODFare(cfg);
    },
    getStationTodayTimeTable: function(StationID, cfg={}){
        let date = new Date();
        let dateStr = date.getFullYear() + '-' + common.appendNumber0(date.getMonth()+1) + '-' + common.appendNumber0(date.getDate());
        return tra._DailyTimetable_Station_TrainDate(StationID, dateStr, cfg);
    }
}
//自動產生 Function
function makePTX_func(cmd, cfg){
    cfg = setDefaultCfg(cfg);
    var param = processCfg(cfg);
    return getPTX(urls[cmd] + param, cfg);
}
var aryMakeFunction = Object.keys(urls);
var ptxAutoTRAFunctionKey = [];
aryMakeFunction.forEach(function(fn){
    if(!/\{/.test(urls[fn])){//排除要傳參數組 URL 的
        tra['_' + fn] = function(cfg){return makePTX_func(fn, cfg);}
        ptxAutoTRAFunctionKey.push('_' + fn);
    }else{//處理有動態參數的
        let urlAry = urls[fn].split('/');
        let paramCount = 0;
        let paramAry = [];
        urlAry.forEach((c)=>{if(/^\{/.test(c)){paramCount++; paramAry.push(c); } })

        tra['_' + fn] = function(){
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
tra.ptxAutoTRAFunctionKey = ptxAutoTRAFunctionKey;
tra.getStationLiveBoard = tra._LiveBoard_Station;//alias
tra.getFromToFare = tra._ODFareFromTo;//alias



export default tra;