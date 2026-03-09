import common from './common.js';
import ptx from './ptx.js';

const afrV3URL = common.afrV3URL;
const v3urls = {
    Network: afrV3URL + '/Network',
    Station: afrV3URL + '/Station',
    Line: afrV3URL + '/Line',
    Operator: afrV3URL + '/Operator',
    GeneralTrainTimetable: afrV3URL + '/GeneralTrainTimetable',
    ODFare: afrV3URL + '/ODFare',
    Route: afrV3URL + '/Route',
    StationOfLine: afrV3URL + '/StationOfLine',
    TrainType: afrV3URL + '/TrainType',
    StationOfRoute: afrV3URL + '/StationOfRoute',
    News: afrV3URL + '/News',
    Shape: afrV3URL + '/Shape',
    GeneralTrainTimetable_TrainNo: afrV3URL + '/GeneralTrainTimetable/TrainNo/{TrainNo}',
    ODFare_OriginStationID_to_DestinationStationID: afrV3URL + '/ODFare/{OriginStationID}/to/{DestinationStationID}'
}

let vars = {
    queryCount: 10000,
    format: 'JSON'
}

let getPTX = ptx.getPromiseURL;

function isCfgArg(arg){
    return !!(arg && typeof(arg)=='object' && !Array.isArray(arg));
}
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
function useField2filterBy(field, value, cfg={}){
    cfg.filterBy = cfg.filterBy || '';
    cfg.filterBy += ptx.filterParam(field, '==', value);
    return cfg;
}
function shiftQueryArg(value, cfg={}){
    if(isCfgArg(value)){
        cfg = value;
        value = false;
    }
    return {value, cfg};
}

var afr = {
    companyTag: 'AFR',
    vars: vars
}

afr.v3 = {
    urls: v3urls,
    getNetwork: function(cfg={}){return afr.v3._Network(cfg);},
    getStation: function(StationID, cfg={}){
        let arg = shiftQueryArg(StationID, cfg);
        if(arg.value) arg.cfg = useField2filterBy('StationID', arg.value, arg.cfg);
        return afr.v3._Station(arg.cfg);
    },
    getLine: function(LineID, cfg={}){
        let arg = shiftQueryArg(LineID, cfg);
        if(arg.value) arg.cfg = useField2filterBy('LineID', arg.value, arg.cfg);
        return afr.v3._Line(arg.cfg);
    },
    getOperator: function(cfg={}){return afr.v3._Operator(cfg);},
    getGeneralTrainTimetable: function(TrainNo, cfg={}){
        let arg = shiftQueryArg(TrainNo, cfg);
        return (arg.value) ? afr.v3._GeneralTrainTimetable_TrainNo(arg.value, arg.cfg) : afr.v3._GeneralTrainTimetable(arg.cfg);
    },
    getODFare: function(OriginStationID, DestinationStationID, cfg={}){
        if(isCfgArg(OriginStationID)) return afr.v3._ODFare(OriginStationID);
        if(isCfgArg(DestinationStationID)){
            cfg = DestinationStationID;
            DestinationStationID = false;
        }
        if(OriginStationID && DestinationStationID) return afr.v3._ODFare_OriginStationID_to_DestinationStationID(OriginStationID, DestinationStationID, cfg);
        if(OriginStationID) cfg = useField2filterBy('OriginStationID', OriginStationID, cfg);
        return afr.v3._ODFare(cfg);
    },
    getRoute: function(RouteID, cfg={}){
        let arg = shiftQueryArg(RouteID, cfg);
        if(arg.value) arg.cfg = useField2filterBy('RouteID', arg.value, arg.cfg);
        return afr.v3._Route(arg.cfg);
    },
    getStationOfLine: function(LineID, cfg={}){
        let arg = shiftQueryArg(LineID, cfg);
        if(arg.value) arg.cfg = useField2filterBy('LineID', arg.value, arg.cfg);
        return afr.v3._StationOfLine(arg.cfg);
    },
    getTrainType: function(cfg={}){return afr.v3._TrainType(cfg);},
    getStationOfRoute: function(RouteID, cfg={}){
        let arg = shiftQueryArg(RouteID, cfg);
        if(arg.value) arg.cfg = useField2filterBy('RouteID', arg.value, arg.cfg);
        return afr.v3._StationOfRoute(arg.cfg);
    },
    getNews: function(cfg={}){return afr.v3._News(cfg);},
    getShape: function(cfg={}){return afr.v3._Shape(cfg);}
}

function makePTXAFRV3_func(cmd, cfg){
    cfg = setDefaultCfg(cfg);
    var param = processCfg(cfg);
    return getPTX(v3urls[cmd] + param, cfg);
}

var aryMakeAFRV3Function = Object.keys(v3urls);
var ptxAutoAFRV3FunctionKey = [];
aryMakeAFRV3Function.forEach(function(fn){
    if(!/\{/.test(v3urls[fn])){
        afr.v3['_' + fn] = function(cfg){return makePTXAFRV3_func(fn, cfg);}
        ptxAutoAFRV3FunctionKey.push('_' + fn);
    }else{
        let urlAry = v3urls[fn].split('/');
        let paramCount = 0;
        let paramAry = [];
        urlAry.forEach((c)=>{if(/^\{/.test(c)){paramCount++; paramAry.push(c); } })

        afr.v3['_' + fn] = function(){
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
afr.v3.ptxAutoAFRFunctionKey = ptxAutoAFRV3FunctionKey;
afr.v3.getFromToFare = afr.v3._ODFare_OriginStationID_to_DestinationStationID;

export default afr;