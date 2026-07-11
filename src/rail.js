import common from './common.js';
import ptx from './ptx.js';

const railV2URL = common.railV2URL;
const v2urls = {
    Operator: railV2URL + '/Operator', //取得軌道營運業者基本資料
    S2SDistance: railV2URL + '/S2SDistance/{RailSystem}', //取得[指定軌道系統]相鄰兩站站間距離資料
    ODDistance: railV2URL + '/ODDistance/{RailSystem}', //取得[指定軌道起迄站]站間距離資料
    ODDistance_OriginStationName_to_DestinationStationName: railV2URL + '/ODDistance/{RailSystem}/{OriginStationName}/to/{DestinationStationName}', //取得[指定軌道指定起迄站]站間距離資料
    ODFare_OriginStationName_to_DestinationStationName: railV2URL + '/ODFare/{RailSystem}/{OriginStationName}/to/{DestinationStationName}' //取得[指定軌道指定起迄站]站間票價資料
}

let vars = {
    queryCount: 10000,
    format: 'JSON'
}

let getPTX = ptx.getPromiseURL;

function setDefaultCfg(cfg={}){
    if(typeof(cfg)=='string') cfg = {paramDirectlyUse: cfg};
    cfg.cbFn = cfg.cbFn || function(data,e){};
    cfg.top = cfg.top || vars.queryCount;
    cfg.format = vars.format;
    return cfg;
}
function processCfg(cfg){
    if(cfg.paramDirectlyUse) return cfg.paramDirectlyUse;
    var aryParam = [];
    if(cfg.selectField) aryParam.push(ptx.selectFieldFn(cfg.selectField));
    if(cfg.filterBy) aryParam.push(ptx.filterFn(cfg.filterBy));
    if(cfg.orderBy){
        var dir = cfg.orderDir || false;
        aryParam.push(ptx.orderByFn(cfg.orderBy, dir));
    }
    aryParam.push(ptx.topFn(cfg.top, cfg.format));
    return '?' + aryParam.join('&');
}

var rail = {
    vars: vars
}

rail.v2 = {
    urls: v2urls,
    getOperator: function(cfg={}){return rail.v2._Operator(cfg);},
    getS2SDistance: function(RailSystem, cfg={}){return rail.v2._S2SDistance(RailSystem, cfg);},
    getODDistance: function(RailSystem, cfg={}){return rail.v2._ODDistance(RailSystem, cfg);},
    getODDistanceFromTo: function(RailSystem, OriginStationName, DestinationStationName, cfg={}){
        return rail.v2._ODDistance_OriginStationName_to_DestinationStationName(RailSystem, OriginStationName, DestinationStationName, cfg);
    },
    getODFareFromTo: function(RailSystem, OriginStationName, DestinationStationName, cfg={}){
        return rail.v2._ODFare_OriginStationName_to_DestinationStationName(RailSystem, OriginStationName, DestinationStationName, cfg);
    }
}
rail.v2.getFromToFare = rail.v2.getODFareFromTo;

var aryMakeRailV2Function = Object.keys(v2urls);
var ptxAutoRailV2FunctionKey = [];
aryMakeRailV2Function.forEach(function(fn){
    let urlAry = v2urls[fn].split('/');
    let paramCount = 0;
    let paramAry = [];
    urlAry.forEach((c)=>{if(/^\{/.test(c)){paramCount++; paramAry.push(c); } })

    rail.v2['_' + fn] = function(){
        let ptr = 0;
        let arg = arguments;

        let isObjArgs = false;
        let paramsObj = null;
        let cleanParamAry = paramAry.map(p => p.replace(/[{}]/g, ''));

        if(arg.length > 0 && typeof arg[0] === 'object' && arg[0] !== null) {
            if (cleanParamAry.some(p => p in arg[0])) {
                isObjArgs = true;
                paramsObj = arg[0];
            }
        }

        if(!isObjArgs && arg.length < paramCount) throw('Lose parameter, need ' + paramAry.join());

        let url = urlAry.map((c)=>{
            if(/^\{/.test(c)){
                let key = c.replace(/[{}]/g, '');
                if(isObjArgs) {
                    if(paramsObj[key] === undefined) throw('Lose parameter, need ' + key);
                    c = paramsObj[key];
                } else {
                    c = arg[ptr];
                    ptr++;
                }
                c = encodeURI(c);
            }
            return c;
        }).join('/');

        let cfg = isObjArgs ? arguments[1] : arguments[paramCount];
        cfg = setDefaultCfg(cfg);
        var param = processCfg(cfg);
        return getPTX(url + param, cfg);
    }
    ptxAutoRailV2FunctionKey.push('_' + fn);
})
rail.v2.ptxAutoRailFunctionKey = ptxAutoRailV2FunctionKey;

export default rail;
