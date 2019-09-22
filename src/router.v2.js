import common from './common.js';

import pData from './data.js';
import dataX from './datax.js';
import idFn from './id';

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

function findMRTnearBlock(blockData, blockStation){
    let rt = [];
    if(blockStation.transferList){
        //是轉乘站，要找別線
        blockData.forEach(arr=>{
            for(var i=0; i<arr.length; i++){
                if(arr[i].toIDList.indexOf(blockStation.station)!=-1){
                    rt.push(arr[i]);
                }
            }
        })
    }
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
        if(aryBlock[i].transer){
            if(aryBlock[i].station==station) return aryBlock[i];
        }else{
            if(aryBlock[i].station.indexOf(station)!=-1) return aryBlock[i];
        }
    }
}

function getAllLineRoute(from, to, maxCnt=5){
    // var blockData = this.getBlockData();
    // var fromObj = this.getStationBlockByID(from);
    // var toObj = this.getStationBlockByID(to);
    // var cnt = 0;
    // var travel = [];
    // var alreadyBlock = {};
    // if(fromObj.BlockID==toObj.BlockID){
    //     travel.push([fromObj.BlockID]);
    // }else{
    //     //1.指定站 BlockID出發，往陣列前後或本身是轉乘站的話往外路線查
    //     //2.不走回頭路，查找到走過的 BlockID 就結束該條路徑
        
    // }
    // return travel;
}

function baseMRT(company){
    let mrt = {company:company}

    mrt.getBlockData = ()=>blockMRTLineStation(company);
    mrt.getAllLineRoute = getAllLineRoute.bind(mrt);
    mrt.getStationBlockByID = getStationBlockByID.bind(mrt);

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