import common from './common.js';
import ptx from './ptx.js';
import pData from './data.js';

const metroURL = common.metroURL;
const urls = {
    Network: metroURL + '/Network', //取得捷運路網資料
    Line: metroURL + '/Line/', //取得捷運路線基本資料
    Station: metroURL + '/Station/', //取得捷運車站基本資料
    StationOfLine: metroURL + '/StationOfLine/', //取得捷運路線車站基本資料
    LineTransfer: metroURL + '/LineTransfer/', //取得捷運路線站間轉乘基本資料
    StationFacility: metroURL + '/StationFacility/', //取得捷運車站設施資料
    StationExit: metroURL + '/StationExit/', //取得捷運車站出入口基本資料
    Route: metroURL + '/Route/', //取得捷運營運路線基本資料
    StationOfRoute: metroURL + '/StationOfRoute/', //取得捷運營運路線車站基本資料
    FirstLastTimetable: metroURL + '/FirstLastTimetable/', //取得捷運首末班車時刻表資料
    Frequency: metroURL + '/Frequency/', //取得捷運路線發車班距頻率資料
    S2STravelTime: metroURL + '/S2STravelTime/', //取得捷運列車站間運行時間資料
    ODFare: metroURL + '/ODFare/', //取得捷運起迄站間票價資料
    LiveBoard: metroURL + '/LiveBoard/', //取得捷運起迄站間票價資料
    StationTimeTable: metroURL + '/StationTimeTable/', //取得捷運站別時刻表資料
    Shape: metroURL + '/Shape/' //取得指定營運業者之軌道路網實體路線圖資資料
}
const companyTag = {
    trtc: 'TRTC',
    tymetro: 'TYMC',
    klrt: 'KLRT',
    krtc: 'KRTC'
}

let getPTX = ptx.getPromiseURL;

function setDefaultCfg(cfg={}){
    if(typeof(cfg)=='string') cfg = {paramDirectlyUse: cfg};//若傳入的為字串代表直接用於最後的參數不需再調整
    cfg.cbFn = cfg.cbFn || function(data,e){};
    cfg.selectField = (cfg.selectField) ? ptx.selectFieldFn(cfg.selectField) : '';
    cfg.top = 3000;
    cfg.format = 'JSON';
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

function getCompanyTag(name){ return companyTag[name] || name; }
function makePTX_func(cmd, companyTag, cfg){
    cfg = setDefaultCfg(cfg);
    var param = processCfg(cfg);
    return getPTX(urls[cmd] + companyTag + param, cfg);
}

function getStationOnWhatLineID(StationID){
    var ary = StationID.split('');
    var rt = '';
    for(var i=0; i<ary.length; i++){
        if(/[a-zA-Z]/.test(ary[i])){
            rt = rt + ary[i];
        }else{
            break;
        }
    }
    return rt;
}


var metro = {
    getCompanyTag: getCompanyTag,
    getStationOnWhatLineID: getStationOnWhatLineID,
    urls: urls,
    companyTag: companyTag
}
//自動產生 Function
var aryMakeFunction = Object.keys(urls);
var ptxAutoMetroFunctionKey = [];
aryMakeFunction.forEach(function(fn){
    if(!/^Network$/.test(fn)){
        metro['_' + fn] = function(companyTag, cfg){return makePTX_func(fn, companyTag, cfg);}
        ptxAutoMetroFunctionKey.push('_' + fn);
    }
})
metro.ptxAutoMetroFunctionKey = ptxAutoMetroFunctionKey;

//========= 建立各捷運公司可直接使用之基本定義 Function ============
class baseMethod {
    constructor(companyTag) {
        var me = this;
        this.companyTag = companyTag;
        ptxAutoMetroFunctionKey.forEach(fn=>{
            this[fn] = function(cfg){return metro[fn](companyTag, cfg)};
        });

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

        let methodObj = {
            getRoute: function(LineID, cfg={}){
                cfg = useLineID2filterBy(LineID, cfg);
                return me._Route(cfg);
            },
            getLineFrequency: function(LineID, cfg={}){
                cfg = useLineID2filterBy(LineID, cfg);
                return me._Frequency(cfg);
            },
            getLineTransfer: function(LineID, cfg={}){
                cfg.filterBy = cfg.filterBy || '';
                cfg.filterBy += ptx.filterParam('FromLineID', '==', LineID);
                return me._LineTransfer(cfg);
            },
            getLineFrequency: function(LineID, cfg={}){
                cfg = useLineID2filterBy(LineID, cfg);
                return me._Frequency(cfg);
            },
            getFirstLastTimetable: function(LineID, cfg={}){
                cfg = useLineID2filterBy(LineID, cfg);
                return me._FirstLastTimetable(cfg);
            },
            getS2STravelTime: function(LineID, cfg={}){
                cfg = useLineID2filterBy(LineID, cfg);
                cfg.processJSON = function(json){
                    var travleTimes, tmpA, tmpNextStop;
                    for(var m=0; m<json.length; m++){
                        travleTimes = json[m].TravelTimes;
                        json[m].TravelInterval = travleTimes.map(function(c, idx, arr){
                            tmpNextStop = (arr[idx + 1]) ? parseInt(arr[idx + 1].StopTime) : 0;
                            tmpA = parseInt(c.RunTime) + Math.ceil(parseInt(c.StopTime)/2) + Math.ceil(tmpNextStop/2);
                            return tmpA;
                        });
                    }
                    return json;
                }
                return me._S2STravelTime(cfg);
            },
            getStationOfLine: function(LineID, cfg={}){
                cfg = useLineID2filterBy(LineID, cfg);
                return me._StationOfLine(cfg);
            },
            getStationOfRoute: function(LineID, cfg={}){
                cfg = useLineID2filterBy(LineID, cfg);
                return me._StationOfRoute(cfg);
            },
            // ==== Station ====
            getFromToFare: function(fromID, toID, cfg = {}){
                cfg.filterBy = cfg.filterBy || '';
                cfg.filterBy += TT.ptx.filterParam(['OriginStationID','DestinationStationID'], '==', [fromID, toID], 'and');
                return me._ODFare(cfg);
            },
            getFromToTravelTime: function(fromID, toID, cfg = {}){
                let LineID = getStationOnWhatLineID(fromID);
                return me.getS2STravelTime(LineID, cfg).then(function(res){
                    let aryTravelTimes = res.data.find(function(c){
                        var hasFrom = false, hasTo = false, t = c.TravelTimes;
                        for(var i=0; i<t.length; i++){
                            if(t[i].FromStationID==fromID || t[i].ToStationID==fromID){
                                hasFrom = true;
                            }else if(t[i].FromStationID==toID || t[i].ToStationID==toID){
                                hasTo = true;
                            }
                        }
                        return hasFrom && hasTo;
                    })
                    if(aryTravelTimes && aryTravelTimes.TravelTimes) aryTravelTimes = aryTravelTimes.TravelTimes;
                    let flagReverse = false, findTag = 'any';// any , from / to , finish
                    if(!aryTravelTimes) return {status:common.CONST_PTX_API_FAIL, error: 'No match any route.'};
                    let aryBack = aryTravelTimes.filter(function(c,idx){
                        switch(findTag){
                            case 'any':
                                if(c.FromStationID==fromID || c.FromStationID==toID){
                                    findTag = (c.FromStationID==fromID) ? 'to' : 'from';
                                    return true
                                }else{
                                    return false;
                                }
                            break;
                            case 'from':
                                flagReverse = true;
                            case 'to':
                                if(c.ToStationID==fromID || c.ToStationID==toID) findTag = 'finish';
                                return true;
                            break;
                            case 'finish':
                                return false;
                            break;
                        }
                    });

                    if(flagReverse){//如果是和伺服器給的順序相反時，將 FromStatioinID 與 ToStationID 反向
                        aryBack = aryBack.map(function(c, idx, arr){
                            return {
                                FromStationID: c.ToStationID,
                                FromStationName: c.ToStationName,
                                ToStationID: c.FromStationID,
                                ToStationName: c.FromStationName,
                                Sequence: arr.length - idx,
                                RunTime: c.RunTime,
                                StopTime: (idx==arr.length-1) ? 0 : c.StopTime
                            }
                        }).reverse();
                    }else{
                        aryBack = aryBack.map(function(c, idx){
                            c.Sequence = idx+1;
                            c.StopTime = (idx==0) ? 0 : c.StopTime
                            return c;
                        })
                    }
                    
                    var totalTime = 0, tmpNextStop;
                    let travelInterval = aryBack.map(function(c, idx, arr){
                        totalTime += parseInt(c.RunTime) + parseInt(c.StopTime);
                        tmpNextStop = (arr[idx + 1]) ? parseInt(arr[idx + 1].StopTime) : 0;
                        return parseInt(c.RunTime) + Math.ceil(parseInt(c.StopTime)/2) + Math.ceil(tmpNextStop/2);
                    });

                    return {
                        status: common.CONST_PTX_API_SUCCESS,
                        TravelTimes: aryBack,
                        TravelInterval: travelInterval,
                        TotalTime: totalTime,
                        FromStationID: fromID,
                        ToStationID: toID
                    };
                });
            },
            getStation: function(StationID, cfg={}){
                cfg = useStationID2filterBy(StationID, cfg);
                return me._Station(cfg);
            },
            getStationTimeTable: function(StationID, cfg={}){
                cfg = useStationID2filterBy(StationID, cfg);
                return me._StationTimeTable(cfg);
            },
            getStationFacility: function(StationID, cfg={}){
                cfg = useStationID2filterBy(StationID, cfg);
                return me._StationFacility(cfg);
            },
            getStationFirstLastTimetable: function(StationID, cfg={}){
                cfg = useStationID2filterBy(StationID, cfg);
                return me._FirstLastTimetable(cfg);
            },
            getStationExit: function(StationID, cfg={}){
                cfg = useStationID2filterBy(StationID, cfg);
                return me._StationExit(cfg);
            },
            getStationFare: function(StationID, cfg={}){
                cfg.filterBy = cfg.filterBy || '';
                cfg.filterBy += TT.ptx.filterParam('OriginStationID', '==', StationID);
                return me._ODFare(cfg);
            },
            getStationLiveBoard: function(StationID, cfg={}){
                cfg = useStationID2filterBy(StationID, cfg);
                return me._LiveBoard(cfg);
            }
        }
        for(var k in methodObj){
            this[k] = methodObj[k];
        }

        const methodList = Object.keys(this);
        this.methodList = methodList;
    }
}
metro.baseMethod = baseMethod;


export default metro;