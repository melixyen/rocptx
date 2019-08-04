
import pData from './data.js';


//====================== ID 轉換 ==============================

function findData(ary, col, val){
    for(let i=0; i<ary.length; i++){
        let colData = ary[i][col];
        if(colData==val){
            return ary[i];
        }else if(typeof(colData)=='object' && colData.length && colData.indexOf(val)>=0){
            return ary[i];
        }
    }
    return false;
}

function idTrans(objS){
    //objS.value 原始值放到 objS.from
    //objS.Line 如果有多個 StationID 對應到一組 id 時用 Line 區別 
    objS.returnType = objS.returnType || 'string';//"string":只給對應 id。"data":給整個車站的 data obj。預設為 string
    objS.fromType = objS.fromType || 'id';//原來的車站 ID 格式，對應到 data 內的欄位名稱做搜尋匹配
    objS.toType = objS.toType || 'id';//轉換規則，對應到 data 內的欄位名稱給值，若 returnType 為 data 就不看了
    if(objS.value.indexOf('_') > 0 && !objS.company){
        objS.company = objS.value.split('_')[0];
    }
    if(!objS.company) return false;
    objS.from = objS.value;
    if(/^tra/.test(objS.company) && objS.value.indexOf('_') > 0){
        objS.from = objS.value.split('_')[1];
    }

    let stationAry = [], stData = {}, tmpA = false, rt = false;
    switch(objS.company){
        case 'tra':
            stationAry = pData.tra.station_ary;
            stData = findData(stationAry, objS.fromType, objS.from);
            if(stData){
                if(objS.returnType=='string'){
                    rt = stData[objS.toType];
                }else{
                    rt = stData;
                }
            }
        break;
        case 'trtc':
            stationAry = pData.trtc.station_ary;
            stData = findData(stationAry, objS.fromType, objS.from);
            if(stData){
                if(objS.returnType=='string'){
                    tmpA = stData[objS.toType];
                    if(typeof(tmpA)=='object' && tmpA.length && objS.LineID){
                        if(/^trtc/.test(objS.LineID)){
                            objS.LineID = findData(pData.trtc.line, 'id', objS.LineID)['LineID'];//如果給的是 rocptx 的路線 id 則於此處交換為 PTX 上操作 TRTC 的 LineID
                        }
                        var testReg = new RegExp('^' + objS.LineID + '[0-9]', 'i');
                        var returnValue = tmpA.find(function(k){
                            return testReg.test(k);
                        })
                        rt = returnValue;
                    }else{
                        rt = stData[objS.toType];
                    }
                }else{
                    rt = stData;
                }
            }
        break;
        case 'tymetro':
            stationAry = pData.tymetro.station_ary;
            stData = findData(stationAry, objS.fromType, objS.from);
            if(stData){
                if(objS.returnType=='string'){
                    tmpA = stData[objS.toType];
                    if(typeof(tmpA)=='object' && tmpA.length && objS.LineID){
                        if(/^tymetro/.test(objS.LineID)){
                            objS.LineID = findData(pData.tymetro.line, 'id', objS.LineID)['LineID'];//如果給的是 rocptx 的路線 id 則於此處交換為 PTX 上操作 TYMetro 的 LineID
                        }
                        var testReg = new RegExp('^' + objS.LineID + '[0-9]', 'i');
                        var returnValue = tmpA.find(function(k){
                            return testReg.test(k);
                        })
                        rt = returnValue;
                    }else{
                        rt = stData[objS.toType];
                    }
                }else{
                    rt = stData;
                }
            }
        break;
    }
    return rt;
}

function mrtLineTrans(objS){
    //objS.value 原始值放到 objS.from
    objS.returnType = objS.returnType || 'string';//"string":只給對應 id。"data":給整個車站的 data obj。預設為 string
    objS.fromType = objS.fromType || 'id';//原來的車站 ID 格式，對應到 data 內的欄位名稱做搜尋匹配
    objS.toType = objS.toType || 'LineID';//轉換規則，對應到 data 內的欄位名稱給值，若 returnType 為 data 就不看了
    if(!objS.company || !objS.value) return false;
    
    let lineAry = [], lineData = {}, tmpA = false, rt = false;
    switch(objS.company){
        case "trtc":
            lineAry = pData.trtc.line;
            lineData = findData(lineAry, objS.fromType, objS.value);
            if(lineData){
                rt = (objS.returnType=='string') ? lineData[objS.toType] : lineData;
            }
        break;
        case "tymetro":
            lineAry = pData.tymetro.line;
            lineData = findData(lineAry, objS.fromType, objS.value);
            if(lineData){
                rt = (objS.returnType=='string') ? lineData[objS.toType] : lineData;
            }
        break;
    }
    return rt;
}

let thsr = {
    getPTXV2: function(id){
        return id.replace('thsr_','');
    },
    getRPIDbyPTXV2: function(id){
        return 'thsr_' + id;
    }
}

let tra = {
    getPTXV2: function(id){
        return id;
    },
    getPTXV3: function(id){
        return idTrans({company:'tra', value:id, toType: 'v3id'})
    },
    getPTXV3byV2: function(id){
        return idTrans({company:'tra', value:id, toType: 'v3id'})
    },
    getPTXV2byV3: function(id){
        return idTrans({company:'tra', value:id, fromType:'v3id', toType: 'id'})
    },
    getJGSKbyPTXV2: function(id){
        return 'tra_' + id;
    },
    getJGSKbyPTXV3: function(id){
        return 'tra_' + this.getPTXV2byV3(id)
    },
    getRPIDbyPTXV2: function(id){//rocptx station id
        return id;
    },
    getRPIDbyPTXV3: function(id){
        return idTrans({company:'tra', value:id, fromType:'v3id', toType: 'id'})
    }
}

let trtc = {
    getPTXV2: function(id, line){
        var param = {company:'trtc', value:id, fromType:'id', toType: 'StationID'};
        if(line){
            param.LineID = line;
        }
        return idTrans(param);
    },
    getRPIDbyPTXV2: function(id){
        return idTrans({company:'trtc', value:id, fromType:'StationID', toType: 'id'})
    },
    getLINE_LineIDbyRPID: function(id){
        return mrtLineTrans({company:'trtc', value:id, fromType:'id', toType:'LineID'})
    },
    getLINE_RPIDbyLineID: function(id){
        return mrtLineTrans({company:'trtc', value:id, fromType:'LineID', toType:'id'})
    }
}

let tymetro = {
    getPTXV2: function(id, line){
        var param = {company:'tymetro', value:id, fromType:'id', toType: 'StationID'};
        if(line){
            param.LineID = line;
        }
        return idTrans(param);
    },
    getRPIDbyPTXV2: function(id){
        return idTrans({company:'tymetro', value:id, fromType:'StationID', toType: 'id'})
    },
    getLINE_LineIDbyRPID: function(id){
        return mrtLineTrans({company:'tymetro', value:id, fromType:'id', toType:'LineID'})
    },
    getLINE_RPIDbyLineID: function(id){
        return mrtLineTrans({company:'tymetro', value:id, fromType:'LineID', toType:'id'})
    }
}

let id = {
    idTrans: idTrans,
    mrtLineTrans: mrtLineTrans,
    thsr: thsr,
    tra: tra,
    trtc: trtc,
    tymetro: tymetro
}



export default id;