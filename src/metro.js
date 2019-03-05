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


var metro = {
    getCompanyTag: getCompanyTag,
    //_Line: function(companyTag, cfg){return makePTX_func('Line', companyTag, cfg);},
    //_Route: function(companyTag, cfg){return makePTX_func('Route', companyTag, cfg);},
    //_StationOfLine: function(companyTag, cfg){return makePTX_func('StationOfLine', companyTag, cfg);},
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


export default metro;