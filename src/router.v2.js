import common from './common.js';

import pData from './data.js';
import dataX from './datax.js';
import idFn from './id';
import ptx_trtc from './trtc.js';
import ptx_krtc from './krtc.js';
import ptx_tymetro from './tymetro.js';
// import ptx_klrt from './klrt.js';
// import ptx_thsr from './thsr.js';
// import ptx_tra from './tra.js';

const ptxFn = {
    trtc: ptx_trtc,
    krtc: ptx_krtc,
    tymetro: ptx_tymetro
    // klrt: ptx_klrt,
    // thsr: ptx_thsr,
    // tra: ptx_tra
}

//=========== MRT Router Function ==========
function findMRTpDataTransStation(company, FromStationID, ToStationID){
    let FromLineID = idFn.getMRTStationIDInWhatLine(FromStationID),
        ToLineID = idFn.getMRTStationIDInWhatLine(ToStationID);
    let transStation1 = idFn[company].getRPIDbyPTXV2(FromStationID),
        transLine1 = idFn[company].getLINE_RPIDbyLineID(FromLineID),
        transLine2 = idFn[company].getLINE_RPIDbyLineID(ToLineID),
        transStation2 = idFn[company].getRPIDbyPTXV2(ToStationID);
    let transStation = pData.transStation.find(function(c){
        var flg = false;
        if((c.changeLine[0]==transLine1 && c.changeLine[1]==transLine2) || (c.changeLine[0]==transLine2 && c.changeLine[1]==transLine1)){
            if((c.changeStation[0]==transStation1 && c.changeStation[1]==transStation2) || (c.changeStation[0]==transStation2 && c.changeStation[1]==transStation1)) flg = true;
        }
        return flg;
    })
    return transStation;
}

function checkHasSameMRTRoute(a, b){
    let rt = false;
    a = (typeof(a)=='string') ? [a] : a;
    b = (typeof(a)=='string') ? [b] : b;
    a.forEach((c)=>{
        if(b.indexOf(c)!=-1) rt = true;
    })
    return rt;
}

function blockMRTLineStation(company){
    let mDataX = dataX[company];
    if(mDataX.block) return mDataX.block;
    var aryBlock = [];
    mDataX.line.forEach((line)=>{
        var afterStation = [];
        var transferStation = line.Transfer.map(function(c){
            return c.FromStationID;
        });
        var aryLineBlock = [];
        let LineID = line.LineID;
        let existBlock = false;
        line.Route.forEach((route)=>{
            var tmpSt = [];
            let aryRouteBlock = [];
            let cntBlockID = aryLineBlock.length+1;
            if(route.Direction==0){
                route.Stations.forEach((st)=>{
                    if(afterStation.indexOf(st)==-1){
                        afterStation.push(st);
                        if(transferStation.indexOf(st)==-1){
                            tmpSt.push(st);
                        }else{
                            //Normal Station Array
                            if(tmpSt.length>0){
                                var near = [], myID = LineID+'_'+(cntBlockID++);
                                if(aryRouteBlock[aryRouteBlock.length-1]) near.push(aryRouteBlock[aryRouteBlock.length-1].BlockID);
                                if(existBlock){
                                    near.push(existBlock.BlockID);
                                    if(existBlock.near.indexOf(myID)==-1) existBlock.near.push(myID);
                                    existBlock = false;
                                }
                                aryRouteBlock.push({BlockID: myID, LineID: LineID, type:'station', station: tmpSt, routes:[route.RouteID], near:near});
                            }
                            tmpSt = [];
                            //Trans Station
                            let aryTransSt = line.Transfer.filter((c)=>{
                                return !!(c.FromStationID==st);
                            })
                            let transSt = aryTransSt.map(c=>{
                                let d = common.assign({},c);
                                d.transStation = findMRTpDataTransStation(company, c.FromStationID, c.ToStationID);
                                return d;
                            })
                            var near = [], myID = LineID+'_'+(cntBlockID++);
                            if(aryRouteBlock[aryRouteBlock.length-1]) near.push(aryRouteBlock[aryRouteBlock.length-1].BlockID);
                            if(existBlock){
                                near.push(existBlock.BlockID);
                                if(existBlock.near.indexOf(myID)==-1) existBlock.near.push(myID);
                                existBlock = false;
                            }
                            let tst = {BlockID: myID, LineID: LineID, type:'transfer', station:st, transferList: transSt, routes:[route.RouteID], near:[]};
                            tst.toIDList = transSt.map(c=>c.ToStationID);
                            aryRouteBlock.push(tst);
                        }
                    }else{
                        aryLineBlock.forEach(c=>{
                            if(Array.isArray(c.station)){
                                if(c.station.indexOf(st)!=-1 && c.routes.indexOf(route.RouteID)==-1){
                                    c.routes.push(route.RouteID);
                                    existBlock = c;
                                }
                            }else if(typeof(c.station=='string')){
                                if(c.station==st && c.routes.indexOf(route.RouteID)==-1){
                                    c.routes.push(route.RouteID);
                                    existBlock = c;
                                }
                            }
                        })
                    }
                })
            }
            if(tmpSt.length>0){
                var near = [], myID = LineID+'_'+(cntBlockID++);
                if(aryRouteBlock[aryRouteBlock.length-1]) near.push(aryRouteBlock[aryRouteBlock.length-1].BlockID);
                if(existBlock){
                    near.push(existBlock.BlockID);
                    if(existBlock.near.indexOf(myID)==-1) existBlock.near.push(myID);
                    existBlock = false;
                }
                aryRouteBlock.push({BlockID: myID, LineID: LineID, type:'station', station: tmpSt, routes:[route.RouteID], near:near});
            }
            //有後一個 block 的話把它串為自己的 near，然後把它的 near 加上自己
            aryRouteBlock.forEach((c,idx,arr)=>{
                if(arr[idx+1] && arr[idx+1].near.indexOf(c.BlockID)==-1) arr[idx+1].near.push(c.BlockID);
                if(arr[idx-1] && arr[idx-1].near.indexOf(c.BlockID)==-1) arr[idx-1].near.push(c.BlockID);
            })
            //從已經加入到 Line Block 的路線分支出去的話會有 existBlock (如大橋頭站後會有蘆洲新莊兩線)，將彼此的 near 加入對方 BlockID
            aryLineBlock = aryLineBlock.concat(aryRouteBlock);
            //綁定相鄰的同線 Block
            //console.info(route);
        });
        aryBlock.push(aryLineBlock);
    });
    mDataX.block = aryBlock;
    return aryBlock;
}

function getStationBlockByID(station){
    let blockData = this.getBlockData();
    let aryBlock = blockData.reduce((c, n)=>c.concat(n), []);
    for(var i=0; i<aryBlock.length; i++){
        if(aryBlock[i].type=='transfer' || typeof(aryBlock[i].station)=='string'){
            if(aryBlock[i].station==station) return aryBlock[i];
        }else{
            if(aryBlock[i].station.indexOf(station)!=-1) return aryBlock[i];
        }
    }
}
function getMRTThrough(from, to){
    var me = this;
    let LineID = idFn.getMRTStationIDInWhatLine(from),
        ToLineID = idFn.getMRTStationIDInWhatLine(to);
    if(LineID != ToLineID) return false;
    let mDataX = dataX[this.company];
    let line = mDataX.line.find(function(c){
        return c.LineID==LineID;
    })
    let rt = {RouteID: []};
    line.Route.forEach((route)=>{
        let a = route.Stations.indexOf(from), b = route.Stations.indexOf(to);
        if(a!=-1 && b!=-1 && a<b){
            rt.Direction = route.Direction;
            rt.RouteID.push(route.RouteID);
            rt.Stations = route.Stations.filter((st, idx)=>{
                return !!(idx >= a && idx <= b);
            })
            rt.travelTime = ptxFn[me.company].catchData.getDataXS2STravelTime(from, to);
        }
    })
    if(rt.RouteID.length==0) rt = false;
    return rt;
}

var findMapBlock = {};
function findBlock(BlockID){
    if(findMapBlock[BlockID]) return findMapBlock[BlockID];
    let blockData = this.getBlockData();
    let aryBlock = blockData.reduce((c, n)=>c.concat(n), []);
    for(var i=0; i<aryBlock.length; i++){
        if(aryBlock[i].BlockID==BlockID){
            findMapBlock[BlockID] = aryBlock[i];
            return common.assign({},aryBlock[i]);
        }
    }
}
s
function getAllLineRoute(from, to, maxCnt=100){
    var me = this;
    var company = me.company;
    var fromObj = this.getStationBlockByID(from);
    var toObj = this.getStationBlockByID(to);
    if(!fromObj || !toObj) return [];
    var cnt = 0;
    var travel = [];
    if(fromObj.BlockID==toObj.BlockID){
        travel.push([fromObj.BlockID]);
    }else{
        //1.指定站 BlockID出發，往陣列前後或本身是轉乘站的話往外路線查
        //2.不走回頭路，查找到走過的 BlockID 就結束該條路徑
        //3.當任一路線從 from 走到 to 後加入 travel 成為一條 route
        var fullRoute = [[fromObj.BlockID]];
        var bObj, linkTarget;
        while(cnt < maxCnt && travel.length<20){
            var tmpRouteAry = [];
            cnt++;
            fullRoute.map(function(stAry){
                var nowID = stAry[stAry.length-1];
                linkTarget = [];
                bObj = me.findBlock(nowID);
                bObj.near.map(function(near){
                    if(stAry.indexOf(near)==-1){
                        linkTarget.push(near);
                        if(near==toObj.BlockID){
                            cnt++
                            travel.push(stAry.concat([near]));
                        }
                    }
                })
                if(bObj.toIDList){
                    bObj.toIDList.map(function(trans){
                        var tmpBlockID = me.getStationBlockByID(trans).BlockID;
                        if(stAry.indexOf(tmpBlockID)==-1){
                            linkTarget.push(tmpBlockID);
                            if(tmpBlockID==toObj.BlockID){
                                cnt++
                                travel.push(stAry.concat([tmpBlockID]));
                            }
                        }
                    })
                }
                linkTarget.map(function(blockID){
                    tmpRouteAry.push(stAry.concat([blockID]));
                })
            })
            fullRoute = tmpRouteAry;
        }
        //4.路線重覆經過同一車站但不同路線視為迂迴要過濾掉不採用
        travel = travel.filter(function(blockAry){
            let rt = true;
            let already = [], overLine = [];
            blockAry.forEach((c)=>{
                c = me.findBlock(c);
                if(c.type=='transfer'){
                    let stidx = already.indexOf(c.station);
                    if(stidx!=-1 && stidx!=already.length-1){
                        rt = false;
                    }else{
                        already = already.concat(c.toIDList);
                    }
                }else{
                    already = already.concat(c.station);
                }
                if(overLine[overLine.length-1]!=c.LineID) overLine.push(c.LineID);
            })
            return rt;
        })
    }
    return travel.map((ary)=>{
        let mainRoute = [], startStation = false;
        let blockRoute = ary.map((c, idx, arr)=>{
            let bk = this.findBlock(c);
            if(arr[idx+1]){
                let nextBk = this.findBlock(arr[idx+1]);
                let mySt = (typeof(bk.station)=='string') ? bk.station : bk.station[0];
                if(idx==0) mySt = from;
                let nextSt = (typeof(nextBk.station)=='string') ? nextBk.station : nextBk.station[0];
                if(idx==arr.length-2) nextSt = to;
                if(!startStation) startStation = mySt;
                var tmpRoute = me.getMRTThrough(startStation, nextSt);
                var isSameLineTrans = (bk.type=='transfer' && bk.toIDList.indexOf(bk.station!=-1) && ptxFn[company].getStationIDInWhatLine(mySt)==ptxFn[company].getStationIDInWhatLine(nextSt));

                if(tmpRoute){
                    var lastMainRoute = mainRoute[mainRoute.length -1];
                    if(lastMainRoute && lastMainRoute.Stations[0]==tmpRoute.Stations[0]){
                        mainRoute[mainRoute.length -1] = tmpRoute;
                    }else{
                        mainRoute.push(tmpRoute);
                    }
                }else{
                    startStation = false;
                    if(isSameLineTrans){
                        startStation = mySt;
                        tmpRoute = me.getMRTThrough(startStation, nextSt);
                        mainRoute.push(tmpRoute);
                    }
                }
                //同線轉乘站的處理
                
            }else if(arr.length==1){
                var tmpRoute = me.getMRTThrough(from, to);
                if(tmpRoute) mainRoute.push(tmpRoute);
            }else{
                var lastMainRoute = mainRoute[mainRoute.length -1];
                var tmpA = true;
                lastMainRoute.Stations = lastMainRoute.Stations.filter((st)=>{
                    if(tmpA){
                        if(st==to) tmpA = false;
                        return true;
                    }
                    return false;
                })
            }
            return bk;
        })

        //組合有包括轉乘站的 travelRoute
        let travelRoute = [], station = [];
        mainRoute.forEach((route, idx, arr)=>{
            if(idx==0 && from!=route.Stations[0]){
                var transSt = me.findTransfer(from, route.Stations[0]);
                if(transSt) travelRoute.push(transSt);
            }
            travelRoute.push(route);
            if(arr[idx+1]){
                var transSt = me.findTransfer(route.Stations.slice(-1)[0], arr[idx+1].Stations[0]);
                if(transSt) travelRoute.push(transSt);
            }
            if(idx==arr.length-1 && to!=route.Stations[route.Stations.length-1]){
                var transSt = me.findTransfer(route.Stations[route.Stations.length-1], to);
                if(transSt) travelRoute.push(transSt);
            }
            station = station.concat(route.Stations);
        })
        let travelTime = travelRoute.reduce((val, tr)=>{
            if(tr.travelTime && tr.travelTime.min){
                val += tr.travelTime.min;
            }else if(tr.TransferTime){
                val += tr.TransferTime;
            }
            return val;
        }, 0)
        station = station.filter((c,idx,arr)=>arr.indexOf(c)==idx);
        let travelStation = station.slice();
        if(travelStation[0]!=from) travelStation.splice(0,0,from);
        if(travelStation[travelStation.length-1]!=to) travelStation.push(to);

        return {
            block: blockRoute,
            station: station,
            travelStation: travelStation,
            route: mainRoute,
            travelRoute: travelRoute,
            travelTime: travelTime
        }
    }).sort((a,b)=>{
        var rt = (a.route.length>b.route.length) ? 1 : -1;
        if(a.route.length==b.route.length){
            rt = (a.station.length>b.station.length) ? 1 : -1;
            if(a.travelTime && b.travelTime) rt = (a.travelTime>b.travelTime) ? 1 : -1;
        }
        return rt;
    });
}

function baseMRT(company){
    let mrt = {company:company}
    mrt.dataX = dataX[company];

    mrt.getBlockData = ()=>blockMRTLineStation(company);
    mrt.getAllLineRoute = getAllLineRoute.bind(mrt);
    mrt.getStationBlockByID = getStationBlockByID.bind(mrt);
    mrt.findBlock = findBlock.bind(mrt);
    mrt.getMRTThrough = getMRTThrough.bind(mrt);

    mrt.findTransfer = (from, to)=>{
        let LineID = ptxFn[company].getStationIDInWhatLine(from);
        let transferList = ptxFn[company].catchData.getDataXTransferOfLine(LineID);
        return transferList.find(function(c){
            return c.FromStationID==from && c.ToStationID==to;
        });
    }

    return mrt;
}

let trtc = (()=>{
    return baseMRT('trtc');
})();


let krtc = (()=>{
    return baseMRT('krtc');
})();

let tymetro = (()=>{
    return baseMRT('tymetro');
})();

let router = {
    trtc: trtc,
    krtc: krtc,
    tymetro: tymetro
}

export default router;