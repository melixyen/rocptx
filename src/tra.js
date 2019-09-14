import common from './common.js';
import ptx from './ptx.js';
import pData from './data.js';
import idFn from './id.js';

const traURL = common.traURL;
const traV3URL = common.traV3URL;
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

const v3urls = {
    Network: traV3URL + '/Network', //取得臺鐵路網資料
    Station: traV3URL + '/Station/', //取得車站基本資料
    StationExit: traV3URL + '/StationExit/', //取得車站出入口資料
    StationFacility: traV3URL + '/StationFacility/', //取得車站設施資料
    Line: traV3URL + '/Line/', //取得路線基本資料
    StationOfLine: traV3URL + '/StationOfLine/', //取得路線車站基本資料
    TrainType: traV3URL + '/TrainType',//取得所有列車車種資料
    //ODFare: traURL + '/ODFare/', //取得票價資料 , v3 已移除
    //Shape: traURL + '/Shape/', //取得指定營運業者之軌道路網實體路線圖資資料 , v3 已移除
    //GeneralTrainInfo: traURL + '/GeneralTrainInfo/', //取得所有車次的定期車次資料 , v3 已移除
    GeneralTrainTimetable: traV3URL + '/GeneralTrainTimetable/', //取得所有車次的定期時刻表資料
    GeneralStationTimetable: traV3URL + '/GeneralStationTimetable', //取得各站的定期站別時刻表資料
    SpecificTrainTimetable : traV3URL + '/SpecificTrainTimetable', //取得所有特殊車次時刻表資料
    DailyTrainTimetable_Today: traV3URL + '/DailyTrainTimetable/Today/', //取得當天車次時刻表資料
    DailyStationTimetable_Today: traV3URL + '/DailyStationTimetable/Today/', //取得當天各站站別時刻表資料
    StationLiveBoard: traV3URL + '/StationLiveBoard/', //取得列車即時到離站資料
    TrainLiveBoard: traV3URL + '/TrainLiveBoard/', //取得列車即時位置動態資料
    LineTransfer: traV3URL + '/LineTransfer/', //取得內部路線轉乘資料
    StationTransfer: traV3URL + '/StationTransfer/', //取得車站跨運具轉乘資訊
    News: traV3URL + '/News/', //取得最新消息
    Alert: traV3URL + '/Alert/', //取得營運通阻資料
    //以下為帶有變數的 API
    ODFareFromTo: traV3URL + '/ODFare/{OriginStationID}/to/{DestinationStationID}', //取得指定[起訖站間]之票價資料
    GeneralTimetable_TrainNo: traV3URL + '/GeneralTimetable/TrainNo/{TrainNo}', //取得指定[車次]的定期時刻表資料
    GeneralStationTimetable_Station: traV3URL + '/GeneralStationTimetable/Station/{StationID}', //取得指定[車站]的定期站別時刻表資料
    SpecificTrainTimetable_TrainNo : traV3URL + '/SpecificTrainTimetable/TrainNo/{TrainNo}', //取得指定[車次]的特殊車次時刻表資料
    DailyTrainTimetable_Today_TrainNo: traV3URL + '/DailyTrainTimetable/Today/TrainNo/{TrainNo}', //取得當天指定[車次]的時刻表資料
    DailyTrainTimetable_TrainDate: traV3URL + '/DailyTrainTimetable/TrainDate/{TrainDate}', //取得指定[日期]所有車次的時刻表資料(台鐵提供近60天每日時刻表)
    DailyStationTimetable_Today_Station: traV3URL + '/DailyStationTimetable/Today/Station/{StationID}', //取得當天指定[車站]的時刻表資料
    DailyStationTimetable_TrainDate: traV3URL + '/DailyStationTimetable/TrainDate/{TrainDate}', //取得各站每日站別時刻表資料 yyyy-MM-dd
    StationLiveBoard_Station: traV3URL + '/StationLiveBoard/Station/{StationID}', //取得指定[車站]列車即時到離站電子看板(動態前後30分鐘的車次)
    TrainLiveBoard_TrainNo: traV3URL + '/TrainLiveBoard/TrainNo/{TrainNo}' //取得指定[車次]的列車即時位置動態資料
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

//產生整包抓取 Function
let catchData = {
    config: {
        Line_callback: (json)=>{//通用預處理
            return json;
        },
        Line_callback_final: (json)=>{//私用預處理
            return json;
        }
    },
    getDataXLineObj: function(LineID){
        var rt = ptx.datax['tra'].line.find((c)=>{return !!(c.LineID==LineID)})
        if(rt){
            var dt = ptx.data.tra.line.find(c=> !!(c.LineID==LineID))
            for(var k in dt){
                if(!rt[k]){
                    rt[k] = dt[k];
                }else{
                    rt['data_' + k] = dt[k];
                }
            }
        }
        return rt;
    },
    getDataXStationData: function(StationID){
        var rt = ptx.datax['tra'].station.find((c)=>{return !!(c.StationID==StationID)})
        if(rt){
            var dt = ptx.data.tra.station_ary.find(c=> !!(idFn.tra.getPTXV2(c.id)==StationID))
            for(var k in dt){
                if(k=='id'){
                    rt['id'] = dt[k];
                }else if(!rt[k]){
                    rt[k] = dt[k];
                }else{
                    rt['data_' + k] = dt[k];
                }
            }
        }
        return rt;
    },
    getDataXTrain: function(id){
        var rt = ptx.datax['tra'].train.find((c)=>{return !!(c.TrainTypeID==id)})
        if(rt){
            var dt = ptx.data.tra["CarClass"].find(c=> !!(c.id==id))
            for(var k in dt){
                if(!rt[k]){
                    rt[k] = dt[k];
                }else{
                    rt['data_' + k] = dt[k];
                }
            }
        }
        return rt;
    },
    getDataXStationName: function(StationID, isEn){
        var st = catchData.getDataXStationData(StationID);
        return (isEn) ? st.ename : st.name;
    },
    Line: function(progressFn){
        if(typeof(progressFn)!='function') progressFn = (msg)=>{};
        progressFn('取得路線中');
        var atLine = tra._StationOfLine()
        .then(function(res){
            return res.data
        }).catch(function(res){
            return res;
        })
        return atLine;
    },
    GeneralTimetable: function(progressFn){
        if(typeof(progressFn)!='function') progressFn = (msg)=>{};
        //定期時刻表抓法  1.執行 tra._GeneralTimetable
        progressFn('取得時刻中');
        var atTime = tra._GeneralTimetable()
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
        return tra._Station()
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
    TrainType: function(progressFn){
        if(typeof(progressFn)!='function') progressFn = (msg)=>{};
        progressFn('取得車種中');
        return tra._TrainType()
        .then(function(res){
            return res.data.map(function(c){
                let nameAry = c.TrainTypeName.Zh_tw.split('(');
                if(nameAry[1]) nameAry[1] = nameAry[1].replace(')','');
                return {
                    TrainTypeID: c.TrainTypeID,
                    TrainTypeCode: c.TrainTypeCode,
                    note: nameAry[1] || '',
                    name: nameAry[0],
                    ename: c.TrainTypeName.En
                }
            })
        }).catch(function(res){
            return res;
        })
    },
    SimpleLine: function(progressFn){
        if(typeof(progressFn)!='function') progressFn = (msg)=>{};
        //區分要抓的 line 在資料中是順時針或逆時針方向
        let recordLineDir0 = ['CZ','YL','NL','TT','PX','NW','LJ'];
        let recordLineDir1 = ['TL-N','TL-M','TL-C','TL-S','PL','SL','SA','JJ','SH'];
        let lineCfg = {
            filterBy: ptx.filterParam('LineID', '==', recordLineDir0.concat(recordLineDir1), 'or')
        }
        progressFn('取得路線中');
        var atLine = tra._StationOfLine(lineCfg)
        .then(function(res){
            return res.data.map(c=>{
                let stAry = c.Stations.sort((a,b)=>{
                    return (a.Sequence > b.Sequence) ? 1 : -1;
                }).map(st=>{
                    return {
                        name: st.StationName,
                        ID: st.StationID,
                        TD: st.TraveledDistance
                    }
                })
                return {
                    dir: (recordLineDir0.indexOf(c.LineID)!=-1) ? 0 : 1,
                    LineID: c.LineID,
                    station: stAry
                }
            });
        }).catch(function(res){
            return res;
        })
        return atLine;
    },
    SimpleTimetable: function(progressFn){
        return catchData.GeneralTimetable(progressFn)
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
                let deleteKey = ['EndingStationName','StartingStationName','TrainTypeName'];
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
tra.catchData = catchData;

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

//====================== TRA V3 Function 產生至 tra.v3 之下 ==============================

tra.v2Sv3 = function(StationID){//輸入 v2 StationID 輸出 v3 id
    let dt = ptx.data.tra.station_ary.find(c=> !!(c.id==StationID));
    return (dt) ? dt.v3id : false;
}
tra.v3Sv2 = function(StationID){//輸入 v3 StationID 輸出 v2 id
    let dt = ptx.data.tra.station_ary.find(c=> !!(c.v3id==StationID));
    return (dt) ? dt.id : false;
}

//自動產生 V3 Function
tra.v3 = {
    urls: v3urls,
    getStationOfLine: function(LineID, cfg={}){
        cfg = useLineID2filterBy(LineID, cfg);
        return tra.v3._StationOfLine(cfg);
    },
    getStation: function(StationID, cfg={}){
        cfg = useStationID2filterBy(StationID, cfg);
        return tra.v3._Station(cfg);
    },
    getStationTodayTimeTable: function(StationID, cfg={}){
        let date = new Date();
        //let dateStr = date.getFullYear() + '-' + common.appendNumber0(date.getMonth()+1) + '-' + common.appendNumber0(date.getDate());
        return tra.v3._DailyStationTimetable_Today_Station(StationID, cfg);
    }
};

//產生整包抓取 Function
let catchV3Data = {
    config: {
        Line_callback: (json)=>{//通用預處理
            return json;
        },
        Line_callback_final: (json)=>{//私用預處理
            return json;
        }
    },
    getDataXLineObj: function(LineID){
        var rt = ptx.datax['trav3'].line.find((c)=>{return !!(c.LineID==LineID)})
        if(rt){
            var dt = ptx.data.tra.line.find(c=> !!(c.LineID==LineID))
            for(var k in dt){
                if(!rt[k]){
                    rt[k] = dt[k];
                }else{
                    rt['data_' + k] = dt[k];
                }
            }
        }
        return rt;
    },
    getDataXStationData: function(StationID){
        return catchData.getDataXStationData(idFn.tra.getPTXV2byV3(StationID));
        var rt = ptx.datax['trav3'].station.find((c)=>{return !!(c.StationID==StationID)})
        if(rt){
            var dt = ptx.data.tra.station_ary.find(c=> !!(c.v3id==StationID))
            for(var k in dt){
                if(k=='id'){
                    rt['id'] = dt[k];
                }else if(!rt[k]){
                    rt[k] = dt[k];
                }else{
                    rt['data_' + k] = dt[k];
                }
            }
        }
        return rt;
    },
    getDataXTrain: function(id){
        return catchData.getDataXTrain(id);
        var rt = ptx.datax['trav3'].train.find((c)=>{return !!(c.TrainTypeID==id)})
        if(rt){
            var dt = ptx.data.tra["CarClass"].find(c=> !!(c.id==id))
            for(var k in dt){
                if(!rt[k]){
                    rt[k] = dt[k];
                }else{
                    rt['data_' + k] = dt[k];
                }
            }
        }
        return rt;
    },
    getDataXStationName: function(StationID, isEn){
        var st = catchV3Data.getDataXStationData(StationID);
        return (isEn) ? st.ename : st.name;
    },
    Line: function(progressFn){
        if(typeof(progressFn)!='function') progressFn = (msg)=>{};
        progressFn('取得路線中');
        var atLine = tra.v3._StationOfLine()
        .then(function(res){
            return res.data.StationOfLines
        }).catch(function(res){
            return res;
        })
        return atLine;
    },
    GeneralTrainTimetable: function(progressFn){
        if(typeof(progressFn)!='function') progressFn = (msg)=>{};
        //定期時刻表抓法  1.執行 tra.v3._GeneralTrainTimetable
        progressFn('取得時刻中');
        var atTime = tra.v3._GeneralTrainTimetable()
        .then(function(res){
            return res.data.TrainTimetables;
        }).catch(function(res){
            return res;
        })
        return atTime;
    },
    Station: function(progressFn){
        if(typeof(progressFn)!='function') progressFn = (msg)=>{};
        progressFn('取得車站中');
        return tra.v3._Station()
        .then(function(res){
            return res.data.Stations.map(function(c){
                return {
                    StationID: c.StationID,
                    v2id: tra.v3Sv2(c.StationID),
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
    TrainType: function(progressFn){
        if(typeof(progressFn)!='function') progressFn = (msg)=>{};
        progressFn('取得車種中');
        return tra.v3._TrainType()
        .then(function(res){
            return res.data.TrainTypes.map(function(c){
                let nameAry = c.TrainTypeName.Zh_tw.split('(');
                if(nameAry[1]) nameAry[1] = nameAry[1].replace(')','');
                return {
                    TrainTypeID: c.TrainTypeID,
                    TrainTypeCode: c.TrainTypeCode,
                    note: nameAry[1] || '',
                    name: nameAry[0],
                    ename: c.TrainTypeName.En
                }
            })
        }).catch(function(res){
            return res;
        })
    },
    SimpleLine: function(progressFn){
        if(typeof(progressFn)!='function') progressFn = (msg)=>{};
        //區分要抓的 line 在資料中是順時針或逆時針方向
        let recordLineDir0 = ['CZ','EL','SU','PX','NW','LJ'];
        let recordLineDir1 = ['WL','WL-C','SL','SA','JJ','SH'];
        let lineCfg = {
            filterBy: ptx.filterParam('LineID', '==', recordLineDir0.concat(recordLineDir1), 'or')
        }
        progressFn('取得路線中');
        var atLine = tra.v3._StationOfLine(lineCfg)
        .then(function(res){
            return res.data.StationOfLines.map(c=>{
                let stAry = c.Stations.sort((a,b)=>{
                    return (a.Sequence > b.Sequence) ? 1 : -1;
                }).map(st=>{
                    return {
                        name: st.StationName,
                        ID: st.StationID,
                        v2id: tra.v3Sv2(st.StationID),
                        TD: st.CumulativeDistance
                    }
                })
                return {
                    dir: (recordLineDir0.indexOf(c.LineID)!=-1) ? 0 : 1,
                    LineID: c.LineID,
                    station: stAry
                }
            });
        }).catch(function(res){
            return res;
        })
        return atLine;
    },
    SimpleTimetable: function(progressFn){
        return catchV3Data.GeneralTrainTimetable(progressFn)
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
                        v2id: tra.v3Sv2(c.StationID),
                        name: c.StationName.Zh_tw
                    }
                })
                delete data.StopTimes;

                data.info = {};
                let deleteKey = ['EndingStationName','StartingStationName','TrainTypeName','TripHeadSign','TripLine'];
                for(var k in data.TrainInfo){
                    if(deleteKey.indexOf(k)==-1){
                        data.info[k] = data.TrainInfo[k];
                    }
                }
                delete data.TrainInfo;

                if(didx>0){
                    delete data.UpdateTime;
                    delete data.VersionID;
                }
            })
            return json;
        })
    }
}
tra.v3.catchData = catchV3Data;

function makePTXV3_func(cmd, cfg){
    cfg = setDefaultCfg(cfg);
    var param = processCfg(cfg);
    return getPTX(v3urls[cmd] + param, cfg);
}
var aryMakeV3Function = Object.keys(v3urls);
var ptxAutoTRAV3FunctionKey = [];
aryMakeV3Function.forEach(function(fn){
    if(!/\{/.test(v3urls[fn])){//排除要傳參數組 URL 的
        tra.v3['_' + fn] = function(cfg){return makePTXV3_func(fn, cfg);}
        ptxAutoTRAV3FunctionKey.push('_' + fn);
    }else{//處理有動態參數的
        let urlAry = v3urls[fn].split('/');
        let paramCount = 0;
        let paramAry = [];
        urlAry.forEach((c)=>{if(/^\{/.test(c)){paramCount++; paramAry.push(c); } })

        tra.v3['_' + fn] = function(){
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
tra.v3.ptxAutoTRAFunctionKey = ptxAutoTRAV3FunctionKey;
tra.v3.getStationLiveBoard = tra.v3._StationLiveBoard_Station;//alias
tra.v3.getFromToFare = tra.v3._ODFareFromTo;//alias



export default tra;