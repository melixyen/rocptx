import common from './common.js';
import ptx from './ptx.js';
import pData from './data.js';
import metro from './metro.js';

const companyTag = metro.getCompanyTag('trtc');
var mrtPTXFn = new metro.baseMethod(companyTag);
let catchData = mrtPTXFn.catchData;
//Catch Data 資料預處理
mrtPTXFn.catchData.config.Line_callback = function(json){
    json.forEach((Line)=>{
        let TravelTime = Line.TravelTime, tmpA, tmpB, main = [];
        Line.Route.forEach((Route)=>{
            if(main.indexOf(Route.RouteID)==-1 && Route.RouteID!='G-3' && Route.RouteID!='R-3') main.push(Route.RouteID);
            tmpA = TravelTime.find((rr)=>{ return !!(rr.RouteID==Route.RouteID)});
            let sameDir = !!(tmpA.TravelTimes[0].FromTo[0] == Route.Stations[0]);
            let RunTime = [], StopTime = [];
            for(var i=0; i<Route.Stations.length; i++){
                tmpB = tmpA.TravelTimes[i] || {RunTime:0, StopTime:0}
                RunTime.push(tmpB.RunTime);
                StopTime.push(tmpB.StopTime);
            }
            if(!sameDir){//與 Route 同方向時，每一站同一 index , RunTime 儲存本站到下一站要開多久 , StopTime 儲存本站要停多久 ; 不同時反轉陣列，RunTime 位移一站再補終站 0
                RunTime.reverse().shift();
                RunTime.push(0);
                StopTime.reverse();
            }
            Route.TravelTime = {RunTime:RunTime, StopTime:StopTime}
        })
        delete Line.TravelTime;
        Line.main = main;
    })
    return json;
}

catchData.calcBRLineTime = function(){
    const RouteName = 'BR-1';
    let LineObj = catchData.getDataXLineObj('BR');
    let tmpA;
    //1.抓 Route 排出全線車站在 Direction 0 和 1 的順序
    let Route = [];
    Route.push(LineObj.Route.find(c=>c.RouteID==RouteName && c.Direction==0));
    Route.push(LineObj.Route.find(c=>c.RouteID==RouteName && c.Direction==1));
    //2.把起站依照間距排出全日時刻表 , 按照 Frequency 數量分出要建立幾組時刻表
    let startStationTime = [{
        StationID: Route[0].Stations[0],
        DepTime: catchData.calcStationTimeByHeadWays(LineObj, Route[0].Stations[0], RouteName, 0)
    }, {
        StationID: Route[1].Stations[0],
        DepTime: catchData.calcStationTimeByHeadWays(LineObj, Route[1].Stations[0], RouteName, 1)
    }];
    //3.用 RunTime 與 StopTime 計算全線時刻表
    let tmpTrainTime = [];
    startStationTime.forEach((dirObj, Direction)=>{//分方向
        dirObj.DepTime.forEach(c=>{//分星期幾運行
            c.trainTime = [];
            c.stationTime = [];
            c.stationList = [];
            c.time.forEach(t=>{//算全線時間
                tmpTrainTime = catchData.calcLineTimeByFirstStation(LineObj, dirObj.StationID, t, RouteName, Direction);
                tmpTrainTime.forEach((stt,stidx)=>{
                    c.stationTime[stidx] = c.stationTime[stidx] || [];
                    c.stationTime[stidx].push(stt);
                    c.stationList.push(Route[Direction].Stations[stidx]);
                })
                c.trainTime.push(tmpTrainTime);
            })
            c.To = c.stationList[c.stationList.length-1];
            let firstTrainTime = c.trainTime[0];
            let otherStationStartTrainTime = [];
            c.stationList.forEach((stid,stidx)=>{
                let stObj = catchData.getDataXStationData(stid);
                let firstLastInfo = stObj.FirstLast.find(fs=>fs.To==c.To);
                let advBackTime = false, tmpAdvRealTime = [];
                if(firstLastInfo){
                    let firstTime = firstLastInfo.Time[0];
                    if(common.transTime2Sec(firstTime) + 60 < common.transTime2Sec(firstTrainTime[stidx])){
                        tmpAdvRealTime = catchData.calcLineTimeByFirstStation(LineObj, stid, firstTime, RouteName, Direction);
                        advBackTime = new Array(stidx).concat(tmpAdvRealTime);
                        firstTrainTime = advBackTime;
                        otherStationStartTrainTime.push(advBackTime);
                        advBackTime.forEach((stt,stidx)=>{
                            if(stt){
                                c.stationTime[stidx].push(stt);
                            }
                        })
                    }
                }
            })
            c.trainTime = c.trainTime.concat(otherStationStartTrainTime);
        })
    })
    //4.找沿線車站的首班發車時間，早於首站的第一班車且早超過班距最大值時補上該站起始的車到順位最前面，依序算到倒數第二站
    //先跳過
    //5.將時間轉化為 TimeSimple 格式
    let timeBack = Route[0].Stations.map(st=>{
        return {
            Direction: [[],[]],
            LineID: LineObj.LineID,
            StationID: st
        }
    })
    startStationTime.forEach((dirObj, dir)=>{
        dirObj.DepTime.forEach((c, cidx)=>{
            c.stationTime.forEach((stt,stidx)=>{
                let aryTimes = stt.map(m=>m);
                let targetStationID = c.stationList[stidx];
                timeBack.find(st=>targetStationID==st.StationID).Direction[dir].push({
                    RouteID: RouteName,
                    Timetables: aryTimes,
                    To: c.stationList[c.stationList.length-1],
                    weekStr: c.weekStr
                })
            })
        })
    })
    return timeBack;
}

let cachePTX = {
    station: {}
}

var fnMRT = {
    checkRouteIdOnUse: function(RouteID, LineID){
        var lineData = this.getLineData(LineID);
        var rt = false;
        for(var i=0; i<lineData.route.length; i++){
            for(var j=0; j<lineData.route[i].work.length; j++){
                if(lineData.route[i].work[j].RouteID==RouteID){
                    rt = true;
                    break;
                }
            }
        }
        return rt;
    },
    getLineData: function(id){
        var rt = false;
        pData.trtc.line.forEach(function(c){
            if(c.id==id || c.LineID==id){
                rt = c;
            }
        });
        return rt;
    },
    getLineID: function(id){
        return this.getLineData(id).LineID;
    },
    getOriginalLineByLineID: function(LineID){
        var rt = false;
        pData.trtc.line.forEach(function(c){
            if(c.LineID==LineID){
                rt = c;
            }
        });
        return rt;
    },
    getStationData: function(id){
        var ary = pData.trtc.station_ary;
        var stData = false;
        for(var i=0; i<ary.length; i++){
            if(ary[i].id==id){
                stData = ary[i];
                break;
            }
        }
        return stData;
    },
    getStationIDAry: function(id){
        var ary = pData.trtc.station_ary;
        var stData = false;
        for(var i=0; i<ary.length; i++){
            if(ary[i].id==id){
                stData = ary[i].StationID;
                break;
            }
        }
        return stData;
    },
    getStationID: function(id, lineOriginalID){
        var LineID = (/^trtc/.test(lineOriginalID)) ? this.getLineID(lineOriginalID) : lineOriginalID;
        var stData = this.getStationIDAry(id);
        if(!LineID){
            return false;
        }else{
            var rt = false,
                lineCode = '',
                codeLen = 0;
            stData.forEach(function(c){
                if(/^[a-zA-Z]{1}\d{2}/gi.test(c)){
                    codeLen = 1;
                }else if(/^[a-zA-Z]{2}\d{2}/gi.test(c)){
                    codeLen = 2;
                }
                lineCode = c.substr(0, codeLen);
                if(lineCode == LineID){
                    rt = c;
                }
            });
            return rt;
        }
    },
    getStationIDInWhatLine: function(StatioinID){
        if(/^[a-zA-Z]{1}\d{2}/gi.test(StatioinID)){
            return StatioinID.substr(0,1);
        }else if(/^[a-zA-Z]{2}\d{2}/gi.test(StatioinID)){
            return StatioinID.substr(0,2);
        }
    },
    getStationTime: function(LineID, StationID, w, cbFn){
        var targetID = false;
        var me = this;
        if(typeof(StationID)!='string' && StationID.length==2){
            targetID = StationID[1];
            StationID = StationID[0];
        }
        var Week = false;
        if(typeof(w)=='number') Week = common.ptxMRTWeekStr[w];
        var mtStr = "$filter=LineID eq '" + LineID + "' and StationID eq '" + StationID + "'";
        if(Week) mtStr += ' and ServiceDay/' + Week + ' eq true';
        var url = common.metroURL + '/StationTimeTable/TRTC?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
        common.pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表');
        //產生暫存時刻表空間
        if(!ptx.tempTimeTable.trtc) ptx.tempTimeTable.trtc = {};
        if(!ptx.tempTimeTable.trtc[LineID]) ptx.tempTimeTable.trtc[LineID] = [];
        if(!ptx.tempTimeTable.trtc[LineID][StationID]) ptx.tempTimeTable.trtc[LineID][StationID] = [];
        ptx.tempTimeTable.trtc[LineID][StationID][w] = [[],[]];//Direction 0 and 1
        //抓時刻表
        ptx.getURL(url, function(json, e){
            if(e.status==common.CONST_PTX_API_FAIL){
                cbFn(json);
                return false;
            }
            json.forEach(function(routeA){
                var tmpAry = ptx.tempTimeTable.trtc[LineID][StationID][w];
                var tmpTimeAry = routeA.Timetables.map(function(timeObj){
                    timeObj.tt_sortTime = common.transTime2Sec(timeObj.DepartureTime);
                    timeObj.RouteID = routeA.RouteID;
                    return timeObj;
                });
                if(me.checkRouteIdOnUse(routeA.RouteID, routeA.LineID)){
                    if(routeA.Direction == 0){
                        tmpAry[0] = tmpAry[0].concat(tmpTimeAry);
                    }else if(routeA.Direction == 1){
                        tmpAry[1] = tmpAry[1].concat(tmpTimeAry);
                    }
                }
            });
            
            var workAry = ptx.tempTimeTable.trtc[LineID][StationID][w];
            var timeMakeFn = function(c){
                return c.DepartureTime;
            };
            workAry[0] = workAry[0].sort(ptx.sortByTTSortTime);
            //在這一步之前都還是物件狀態時刻表，之後暫時改造成單一時刻表替換 rnwTimeTable
            workAry[0] = workAry[0].map(timeMakeFn);
            workAry[1] = workAry[1].sort(ptx.sortByTTSortTime);
            workAry[1] = workAry[1].map(timeMakeFn);
            
            cbFn(json);
        });
    },
    getFormatStationTime: function(stID, line, dir, w){
        w = parseInt(w);
        var StationID = ptx.trtc.getStationID(stID, line);
        var LineID = ptx.trtc.getLineID(line);
        var rt = false;
        if(!ptx.tempTimeTable.trtc) return false;
        if(!ptx.tempTimeTable.trtc[LineID]) return false;
        if(!ptx.tempTimeTable.trtc[LineID][StationID]) return false;
        if(!ptx.tempTimeTable.trtc[LineID][StationID][w]) return false;
        if(!ptx.tempTimeTable.trtc[LineID][StationID][w][dir]) return false;
        if(ptx.tempTimeTable.trtc[LineID][StationID][w][dir].length==0) return false;
        return ptx.tempTimeTable.trtc[LineID][StationID][w][dir];
    },
    getOriginalStationID: function(StationID){
        var ary = pData.trtc.station_ary;
        var stData = false;
        for(var i=0; i<ary.length; i++){
            if(ary[i].StationID.indexOf(StationID)!=-1){
                stData = ary[i].id;
                break;
            }
        }
        return stData;
    },
    //使用 PTX StationID 存取
    getByStationID: function(StationID){
        if(cachePTX.station[StationID]) return cachePTX.station[StationID];
        var ttid = this.getOriginalStationID(StationID);
        var data = this.getStationData(ttid);
        if(data){
            data = JSON.parse(JSON.stringify(data));
            data.targetStationID = StationID;
            data.LineID = this.getStationIDInWhatLine(StationID);
            cachePTX.station[StationID] = data;
        }
        return data;
    }
}

mrtPTXFn.methodList.forEach(function(k){
    fnMRT[k] = mrtPTXFn[k];
})

export default fnMRT;