import common from './common.js';

import pData from './data.js';
import dataX from './datax.js';
import idFn from './id';

//=========== MRT Router Function ==========
function blockMRTLineStation(company){
    let mDataX = dataX[company];
    if(mDataX.block) return mDataX.block;
    var aryBlock = [];
    mDataX.line.forEach((line)=>{
        var afterStation = [];
        var transferStation = line.Transfer.map(function(c){
            return c.FromStationID;
        });
        var aryLinieBlock = [];
        let LineID = line.LineID;
        line.Route.forEach((route)=>{
            var tmpSt = [];
            if(route.Direction==0){
                route.Stations.forEach((st)=>{
                    if(afterStation.indexOf(st)==-1){
                        afterStation.push(st);
                        if(transferStation.indexOf(st)==-1){
                            tmpSt.push(st);
                        }else{
                            if(tmpSt.length>0) aryLinieBlock.push({BlockID: LineID+'_'+(aryLinieBlock.length+1), LineID: LineID, station: tmpSt});
                            tmpSt = [];
                            let transSt = line.Transfer.find((c)=>{
                                return !!(c.FromStationID==st);
                            })
                            let tst = {BlockID: LineID+'_'+(aryLinieBlock.length+1), LineID: LineID, station:transSt.FromStationID, transfer: transSt};
                            let transStation1 = idFn.trtc.getRPIDbyPTXV2(transSt.FromStationID),
                                transLine1 = idFn.trtc.getLINE_RPIDbyLineID(transSt.FromLineID),
                                transLine2 = idFn.trtc.getLINE_RPIDbyLineID(transSt.ToLineID),
                                transStation2 = idFn.trtc.getRPIDbyPTXV2(transSt.ToStationID);
                            let transStation = pData.transStation.find(function(c){
                                var flg = false;
                                if((c.changeLine[0]==transLine1 && c.changeLine[1]==transLine2) || (c.changeLine[0]==transLine2 && c.changeLine[1]==transLine1)){
                                    if((c.changeStation[0]==transStation1 && c.changeStation[1]==transStation2) || (c.changeStation[0]==transStation2 && c.changeStation[1]==transStation1)) flg = true;
                                }
                                return flg;
                            })
                            if(transStation) tst.transStation = transStation;
                            aryLinieBlock.push(tst);
                        }
                    }
                })
            }
            if(tmpSt.length>0) aryLinieBlock.push({BlockID: LineID+'_'+(aryLinieBlock.length+1), LineID: LineID, type:'station', station: tmpSt});
        });
        aryBlock.push(aryLinieBlock);
    });
    mDataX.block = aryBlock;
    return aryBlock;
}

let trtc = (()=>{
    const company = 'trtc';
    let mrt = {}

    mrt.getBlockData = ()=>blockMRTLineStation(company);

    return mrt;
})();


let krtc = (()=>{
    const company = 'krtc';
    let mrt = {}

    mrt.getBlockData = ()=>blockMRTLineStation(company);

    return mrt;
})();

let tymetro = (()=>{
    const company = 'tymetro';
    let mrt = {}

    mrt.getBlockData = ()=>blockMRTLineStation(company);

    return mrt;
})();

let router = {
    trtc: trtc,
    krtc: krtc,
    tymetro: tymetro
}

export default router;