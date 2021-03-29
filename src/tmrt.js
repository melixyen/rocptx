import common from './common.js';
import ptx from './ptx.js';
import pData from './data.js';
import metro from './metro.js';

const companyTag = metro.getCompanyTag('tmrt');
var mrtPTXFn = new metro.baseMethod(companyTag);
//Catch Data 資料預處理
mrtPTXFn.catchData.config.Line_callback = function(json){
    json.forEach((Line)=>{
        let TravelTime = Line.TravelTime, tmpA, tmpB;
        Line.Route.forEach((Route)=>{
            tmpA = TravelTime.find((rr)=>{ return !!(rr.RouteID==Route.RouteID)});
            //TravelTimes 有重複值要先濾除
            let alreadyWriteStation = [], aryTravelTimes = [];
            tmpA.TravelTimes.forEach(function(c, idx, arr){
                if(alreadyWriteStation.indexOf(c.FromTo[0])==-1){
                    aryTravelTimes.push(c);
                    alreadyWriteStation.push(c.FromTo[0]);
                }
            })
            let sameDir = !!(aryTravelTimes[0].FromTo[0] == Route.Stations[0]);
            let RunTime = [], StopTime = [];
            for(var i=0; i<Route.Stations.length; i++){
                tmpB = aryTravelTimes[i] || {RunTime:0, StopTime:0}
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
    })
    return json;
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
        pData.tmrt.line.forEach(function(c){
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
        pData.tmrt.line.forEach(function(c){
            if(c.LineID==LineID){
                rt = c;
            }
        });
        return rt;
    },
    getStationIDAry: function(id){
        var ary = pData.tmrt.station_ary;
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
        var LineID = (/^tmrt/.test(lineOriginalID)) ? this.getLineID(lineOriginalID) : lineOriginalID;
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
        var url = common.metroURL + '/StationTimeTable/TMRT?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
        common.pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表');
        //產生暫存時刻表空間
        if(!ptx.tempTimeTable.tmrt) ptx.tempTimeTable.tmrt = {};
        if(!ptx.tempTimeTable.tmrt[LineID]) ptx.tempTimeTable.tmrt[LineID] = [];
        if(!ptx.tempTimeTable.tmrt[LineID][StationID]) ptx.tempTimeTable.tmrt[LineID][StationID] = [];
        ptx.tempTimeTable.tmrt[LineID][StationID][w] = [[],[]];//Direction 0 and 1
        //抓時刻表
        ptx.getURL(url, function(json, e){
            if(e.status==common.CONST_PTX_API_FAIL){
                cbFn(json);
                return false;
            }
            json.forEach(function(routeA){
                var tmpAry = ptx.tempTimeTable.tmrt[LineID][StationID][w];
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
            
            var workAry = ptx.tempTimeTable.tmrt[LineID][StationID][w];
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
        var StationID = ptx.tmrt.getStationID(stID, line);
        var LineID = ptx.tmrt.getLineID(line);
        var rt = false;
        if(!ptx.tempTimeTable.tmrt) return false;
        if(!ptx.tempTimeTable.tmrt[LineID]) return false;
        if(!ptx.tempTimeTable.tmrt[LineID][StationID]) return false;
        if(!ptx.tempTimeTable.tmrt[LineID][StationID][w]) return false;
        if(!ptx.tempTimeTable.tmrt[LineID][StationID][w][dir]) return false;
        if(ptx.tempTimeTable.tmrt[LineID][StationID][w][dir].length==0) return false;
        return ptx.tempTimeTable.tmrt[LineID][StationID][w][dir];
    },
    getOriginalStationID: function(StationID){
        var ary = pData.tmrt.station_ary;
        var stData = false;
        for(var i=0; i<ary.length; i++){
            if(ary[i].StationID.indexOf(StationID)!=-1){
                stData = ary[i].id;
                break;
            }
        }
        return stData;
    }
}

mrtPTXFn.methodList.forEach(function(k){
    fnMRT[k] = mrtPTXFn[k];
})

export default fnMRT;