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
    cfg.top = cfg.top || 50000;
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
    if(/^[a-zA-Z]{1}\d{2}/gi.test(StationID)){
        return StationID.substr(0,1);
    }else if(/^[a-zA-Z]{2}\d{2}/gi.test(StationID)){
        return StationID.substr(0,2);
    }
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

function promiseCatchLineCombine(json, data, combineName, LineIDName='LineID', mode='array'){
    json.forEach(function(c){
        if(mode=='array') c[combineName] = [];
    });
    data.forEach(function(c){
        var LineObj = common.findArrayTarget(json, function(item){
            return !!(item.LineID==c[LineIDName]);
        });
        if(mode=='array') LineObj[combineName].push(c);
    })
    return json;
}
function promiseCatchLinePredo(data, backTag, otherDo){
    return data.map(function(c){
        var rt = {};
        backTag.forEach(function(key){
            rt[key] = c[key];
        })
        if(typeof(otherDo)=='function') rt = otherDo(rt);
        return rt;
    });

}
function promiseCatchStationCombine(json, data, combineName, StationID='StationID', mode='array', otherDo){
    json.forEach(function(c){
        if(mode=='array') c[combineName] = [];
    });
    data.forEach(function(c){
        var Obj = common.findArrayTarget(json, function(item){
            return !!(item.StationID==c[StationID]);
        });
        if(typeof(otherDo)=='function') c = otherDo(c);
        if(mode=='array') Obj[combineName].push(c);
    })
    return json;
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
                    if(typeof(json)!='object') return json;
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

        // ==== 整合抓資料 Function ====
        let catchData = {
            config: {
                Line_BackTag: ['LineID','LineName','LineColor','IsBranch'],
                Line_StationOfRoute_BackTag: ['RouteID','Direction','LineID','Stations'],
                Line_LineTransfer_BackTag: ['FromLineID','FromStationID','ToLineID','ToStationID','IsOnSiteTransfer','TransferTime'],
                Line_S2STravelTime_BackTag: ['LineID','RouteID','TravelTimes'],
                Line_Frequency_BackTag: ['LineID','RouteID','ServiceDays','OperationTime','Headways'],
                Line_callback: (json)=>{//通用預處理
                    return json;
                },
                Line_callback_final: (json)=>{//私用預處理
                    return json;
                },
                Station_BackTag: ['StationID','StationName','StationPosition'],
                Station_FirstLastTimetable_BackTag: ['StationID','LineID','DestinationStaionID','FirstTrainTime','LastTrainTime'],
                Station_Fare_BackTag: ['OriginStationID','DestinationStationID','Fares']
            },
            Line: function(progressFn){
                if(typeof(progressFn)!='function') progressFn = (msg)=>{};
                //路線包抓法 1.Line  2.合併路由和轉乘到 Line  3.合併站間距與班距到路由
                progressFn('取得路網中');
                let lineBackTag = catchData.config.Line_BackTag;
                var atLine = me._Line({selectField: lineBackTag})
                .then(function(res){
                    return promiseCatchLinePredo(res.data, lineBackTag);
                }).then(function(json){//抓路由
                    progressFn('取得各線路由中');
                    let backTag = catchData.config.Line_StationOfRoute_BackTag;
                    return me._StationOfRoute({selectField:backTag})
                    .then(function(res){//整理
                        return promiseCatchLinePredo(res.data, backTag, function(rt){
                            rt.Stations = rt.Stations.map(function(st){ return st.StationID; })
                            return rt;
                        });
                    }).then(function(data){//合併
                        return promiseCatchLineCombine(json, data, 'Route');
                    }).catch(function(){
                        return json;
                    })
                }).then(function(json){//抓轉乘
                    progressFn('取得轉乘資訊中');
                    let backTag = catchData.config.Line_LineTransfer_BackTag;
                    return me._LineTransfer({selectField:backTag})
                    .then(function(res){//整理
                        return promiseCatchLinePredo(res.data, backTag);
                    }).then(function(data){//合併
                        return promiseCatchLineCombine(json, data, 'Transfer', 'FromLineID');
                    }).catch(function(){
                        return json;
                    })
                }).then(function(json){//抓站間距
                    progressFn('取得站間距時間中');
                    let backTag = catchData.config.Line_S2STravelTime_BackTag;
                    return me._S2STravelTime({selectField:backTag})
                    .then(function(res){//整理
                        return promiseCatchLinePredo(res.data, backTag, function(rt){
                            rt.TravelTimes = rt.TravelTimes.map(function(c, idx, arr){
                                let ret = {
                                    FromTo: [c.FromStationID, c.ToStationID],
                                    RunTime: c.RunTime
                                }
                                if(typeof(c.StopTime)!='undefined') ret.StopTime = c.StopTime;
                                return ret;
                            })
                            return rt;
                        });
                    }).then(function(data){//合併
                        return promiseCatchLineCombine(json, data, 'TravelTime');
                    }).catch(function(){
                        return json;
                    })
                }).then(function(json){//抓班距
                    progressFn('取得班距中');
                    let backTag = catchData.config.Line_Frequency_BackTag;
                    return me._Frequency({selectField:backTag})
                    .then(function(res){//整理
                        return promiseCatchLinePredo(res.data, backTag, function(rt){
                            rt.OperationTime = [rt.OperationTime.StartTime, rt.OperationTime.EndTime];
                            rt.Headways = rt.Headways.map(function(c){
                                c.Time = [c.StartTime, c.EndTime];
                                delete c.StartTime; delete c.EndTime;
                                c.AveMins = Math.ceil((parseInt(c.MinHeadwayMins) + parseInt(c.MaxHeadwayMins))/2)
                                return c;
                            });
                            let tmpSD = rt.ServiceDays;
                            rt.ServiceDays = {
                                ServiceTag: tmpSD.ServiceTag,
                                NationalHolidays: tmpSD.NationalHolidays,
                                week: [tmpSD.Sunday, tmpSD.Monday, tmpSD.Tuesday, tmpSD.Wednesday, tmpSD.Thursday, tmpSD.Friday, tmpSD.Saturday]
                            }
                            return rt;
                        });
                    }).then(function(data){//合併
                        return promiseCatchLineCombine(json, data, 'Frequency');
                    }).catch(function(){
                        return json;
                    })
                }).then(function(json){
                    progressFn('整理輸出資料格式');
                    return catchData.config.Line_callback_final(catchData.config.Line_callback(json));
                });
                return atLine;
            },
            Station: function(progressFn){
                if(typeof(progressFn)!='function') progressFn = (msg)=>{};
                //車站包抓法  1.取得所有車站資料 2.合併首末班車
                progressFn('取得車站中');
                let stationBackTag = catchData.config.Station_BackTag;
                var atStation = me._Station({selectField: stationBackTag})
                .then(function(res){
                    return promiseCatchLinePredo(res.data, stationBackTag);
                }).then(function(json){
                    json.forEach((st,idx,arr)=>{
                        if(st.StationPosition){
                            st.lat = st.StationPosition.PositionLat;
                            st.lon = st.StationPosition.PositionLat;
                            delete st.StationPosition;
                        }
                        st.name = st.StationName.Zh_tw;
                        if(st.StationName.En) st.ename = st.StationName.En;
                        delete st.StationName;
                    })
                    return json;
                }).then(function(json){//抓首末班車
                    progressFn('取得首末班車');
                    let backTag = catchData.config.Station_FirstLastTimetable_BackTag;
                    return me._FirstLastTimetable({selectField:backTag})
                    .then(function(res){//整理
                        return promiseCatchLinePredo(res.data, backTag);
                    }).then(function(data){//合併
                        let json2 = promiseCatchStationCombine(json, data, 'FirstLast','StationID','array', function(time){
                            let rtObj = {
                                To: time.DestinationStaionID,
                                Time: [time.FirstTrainTime, time.LastTrainTime]
                            }
                            if(typeof(time.TrainType)!='undefined') rtObj.TrainType = time.TrainType;
                            return rtObj;
                        });
                        return json2
                    }).catch(function(){
                        return json;
                    })
                })
                return atStation;
            },
            Fare: function(progressFn){
                if(typeof(progressFn)!='function') progressFn = (msg)=>{};
                //票價包抓法  1.抓所有 ODFare  2.整理輸出全票票價就好
                progressFn('取得車站中');
                let backTag = catchData.config.Station_Fare_BackTag;
                return me._ODFare({selectField: backTag})
                .then(function(res){//整理
                    return promiseCatchLinePredo(res.data, backTag);
                }).then(function(data){//合併
                    let json2 = {}
                    data.forEach(function(st){
                        if(!json2[st.OriginStationID]) json2[st.OriginStationID] = {}
                        let tmpA = st.Fares.find((fp)=>{return !!(fp.TicketType==1 && fp.FareClass==1)})
                        if(tmpA) json2[st.OriginStationID][st.DestinationStationID] = tmpA.Price;
                    })
                    return json2
                }).catch(function(res){
                    return res;
                })
            },
            TimeTable: function(progressFn){
                if(typeof(progressFn)!='function') progressFn = (msg)=>{};
                progressFn('取得車站中');
                let stationBackTag = ['StationID'];
                let aryTime = [];
                return me._Station({selectField: stationBackTag})
                .then(function(res){
                    return promiseCatchLinePredo(res.data, stationBackTag);
                }).then(function(json){
                    //依序將所有車站做成 Promise 抓資料，間隔 
                    function makeCatchStation(StationID){
                        return function(){
                            return new Promise(function(resolve){
                                setTimeout(resolve,100);
                            }).then(function(){
                                progressFn('正在讀取 ' + StationID + ' 站的時刻表');
                                return me.getStationTimeTable(StationID).then(function(objA){
                                    let rawTime = objA.data;
                                    if(rawTime && rawTime.length>0) aryTime.push(rawTime);
                                    return rawTime;
                                });
                            });
                        }
                    }
                    let aryStationFn = json.map(c=> {return makeCatchStation(c.StationID)})
                    return aryStationFn.reduce(function(cur, next){
                        return cur.then(next);
                    }, Promise.resolve()).then(function(){
                        return aryTime;
                    })
                }).then(function(pp){
                    return pp;
                }).catch(function(res){
                    return res;
                })
            },
            TimeSimple: function(progressFn){
                return catchData.TimeTable(progressFn).then(function(json){
                    progressFn('簡化輸出格式');
                    json.forEach((station, idx, arr)=>{
                        let rt = {};
                        station.forEach((data, didx)=>{
                            if(didx==0){
                                rt.StationID = data.StationID;
                                rt.LineID = data.LineID;
                                rt.Direction = [[],[]];//Direction 0 與 1 直接分配到陣列的 0 跟 1
                            }
                            let weekStr = [data.ServiceDays.Sunday, data.ServiceDays.Monday, data.ServiceDays.Tuesday, data.ServiceDays.Wednesday, data.ServiceDays.Thursday, data.ServiceDays.Friday, data.ServiceDays.Saturday].map((day,idx)=>{return (day) ? idx.toString() : ''}).join('');
                            let Timetables = data.Timetables.map((time)=>{return time.DepartureTime});
                            rt.Direction[data.Direction].push({
                                To: data.DestinationStaionID,
                                RouteID: data.RouteID,
                                weekStr: weekStr,
                                Timetables: Timetables
                            })
                            if(data.TrainType) rt.TrainType = data.TrainType;
                        })
                        arr[idx] = rt;
                    })
                    return json;
                })
            }
        }
        this.catchData = catchData;

        const methodList = Object.keys(this);
        this.methodList = methodList;
    }
}
metro.baseMethod = baseMethod;


export default metro;