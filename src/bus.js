import common from './common.js';
import ptx from './ptx.js';
import pData from './data.js';

let busURL = common.busURL;
let busV3URL = common.busV3URL;

const v3urls = {
    Network: busV3URL + '/Network/City/{City}',
    Stop: busV3URL + '/Stop/City/{City}',
    Station: busV3URL + '/Station/City/{City}',
    Route: busV3URL + '/Route/City/{City}',
    SubRoute: busV3URL + '/SubRoute/City/{City}',
    FirstLastTripInfo: busV3URL + '/FirstLastTripInfo/City/{City}',
    Depot: busV3URL + '/Depot/City/{City}',
    StopOfRoute: busV3URL + '/StopOfRoute/City/{City}',
    DisplayStopOfRoute: busV3URL + '/DisplayStopOfRoute/City/{City}',
    RouteFare: busV3URL + '/RouteFare/City/{City}',
    Schedule: busV3URL + '/Schedule/City/{City}',
    DailyTimeTable: busV3URL + '/DailyTimeTable/City/{City}',
    RealTimeByFrequency: busV3URL + '/RealTimeByFrequency/City/{City}',
    RealTimeByFrequency_RouteName: busV3URL + '/RealTimeByFrequency/City/{City}/{RouteName}',
    RealTimeNearStop: busV3URL + '/RealTimeNearStop/City/{City}',
    RealTimeNearStop_RouteName: busV3URL + '/RealTimeNearStop/City/{City}/{RouteName}',
    EstimatedTimeOfArrival: busV3URL + '/EstimatedTimeOfArrival/City/{City}',
    EstimatedTimeOfArrival_RouteName: busV3URL + '/EstimatedTimeOfArrival/City/{City}/{RouteName}',
    Alert: busV3URL + '/Alert/City/{City}',
    News: busV3URL + '/News/City/{City}',
    Operator: busV3URL + '/Operator/City/{City}',
    Vehicle: busV3URL + '/Vehicle/City/{City}',
    VehicleDepot: busV3URL + '/VehicleDepot/City/{City}',
    VehicleRoute: busV3URL + '/VehicleRoute/City/{City}',
    Shape: busV3URL + '/Shape/City/{City}',
    RouteNetwork: busV3URL + '/RouteNetwork/City/{City}',
    S2STravelTime: busV3URL + '/S2STravelTime/City/{City}'
};

const drtsV3urls = {
    Stop: busV3URL + '/DRTS/Stop/City/{City}',
    Station: busV3URL + '/DRTS/Station/City/{City}',
    StationGroup: busV3URL + '/DRTS/StationGroup/City/{City}',
    Operator: busV3URL + '/DRTS/Operator/City/{City}',
    Route: busV3URL + '/DRTS/Route/City/{City}',
    SubRoute: busV3URL + '/DRTS/SubRoute/City/{City}',
    SubRoute_RouteName: busV3URL + '/DRTS/SubRoute/City/{City}/{RouteName}',
    BookingRule: busV3URL + '/DRTS/BookingRule/City/{City}',
    StopOfRoute: busV3URL + '/DRTS/StopOfRoute/City/{City}',
    StopOfRoute_RouteName: busV3URL + '/DRTS/StopOfRoute/City/{City}/{RouteName}',
    RouteFare: busV3URL + '/DRTS/RouteFare/City/{City}',
    RouteFare_RouteName: busV3URL + '/DRTS/RouteFare/City/{City}/{RouteName}',
    Schedule: busV3URL + '/DRTS/Schedule/City/{City}',
    Schedule_RouteName: busV3URL + '/DRTS/Schedule/City/{City}/{RouteName}',
    DailyTimeTable: busV3URL + '/DRTS/DailyTimeTable/City/{City}',
    DailyTimeTable_RouteName: busV3URL + '/DRTS/DailyTimeTable/City/{City}/{RouteName}',
    GeneralStopTimeTable: busV3URL + '/DRTS/GeneralStopTimeTable/City/{City}',
    GeneralStopTimeTable_RouteName: busV3URL + '/DRTS/GeneralStopTimeTable/City/{City}/{RouteName}',
    DailyStopTimeTable: busV3URL + '/DRTS/DailyStopTimeTable/City/{City}',
    DailyStopTimeTable_RouteName: busV3URL + '/DRTS/DailyStopTimeTable/City/{City}/{RouteName}',
    Location: busV3URL + '/DRTS/Location/City/{City}',
    LocationGroup: busV3URL + '/DRTS/LocationGroup/City/{City}',
    Shape: busV3URL + '/DRTS/Shape/City/{City}',
    Shape_RouteName: busV3URL + '/DRTS/Shape/City/{City}/{RouteName}',
    S2STravelTime: busV3URL + '/DRTS/S2STravelTime/City/{City}',
    Vehicle: busV3URL + '/DRTS/Vehicle/City/{City}',
    Alert: busV3URL + '/DRTS/Alert/City/{City}',
    RealTimeByFrequency: busV3URL + '/DRTS/RealTimeByFrequency/City/{City}',
    RealTimeByFrequency_RouteName: busV3URL + '/DRTS/RealTimeByFrequency/City/{City}/{RouteName}',
    RealTimeNearStop: busV3URL + '/DRTS/RealTimeNearStop/City/{City}',
    RealTimeNearStop_RouteName: busV3URL + '/DRTS/RealTimeNearStop/City/{City}/{RouteName}',
    EstimatedTimeOfArrival: busV3URL + '/DRTS/EstimatedTimeOfArrival/City/{City}',
    EstimatedTimeOfArrival_RouteName: busV3URL + '/DRTS/EstimatedTimeOfArrival/City/{City}/{RouteName}'
};

const shuttleHospitalV3urls = {
    Authority: busV3URL + '/Shuttle/Hospital/Authority',
    Operator: busV3URL + '/Shuttle/Hospital/Operator/Authority/{AuthorityCode}',
    Stop: busV3URL + '/Shuttle/Hospital/Stop/Authority/{AuthorityCode}',
    Route: busV3URL + '/Shuttle/Hospital/Route/Authority/{AuthorityCode}',
    StopOfRoute: busV3URL + '/Shuttle/Hospital/StopOfRoute/Authority/{AuthorityCode}',
    Schedule: busV3URL + '/Shuttle/Hospital/Schedule/Authority/{AuthorityCode}'
};

const shuttleScienceParkV3urls = {
    Authority: busV3URL + '/Shuttle/SciencePark/Authority',
    Operator: busV3URL + '/Shuttle/SciencePark/Operator/Authority/{AuthorityCode}',
    Stop: busV3URL + '/Shuttle/SciencePark/Stop/Authority/{AuthorityCode}',
    Route: busV3URL + '/Shuttle/SciencePark/Route/Authority/{AuthorityCode}',
    StopOfRoute: busV3URL + '/Shuttle/SciencePark/StopOfRoute/Authority/{AuthorityCode}',
    Schedule: busV3URL + '/Shuttle/SciencePark/Schedule/Authority/{AuthorityCode}',
    RealTimeByFrequency: busV3URL + '/Shuttle/SciencePark/RealTimeByFrequency/Authority/{AuthorityCode}',
    RealTimeNearStop: busV3URL + '/Shuttle/SciencePark/RealTimeNearStop/Authority/{AuthorityCode}',
    EstimatedTimeOfArrival: busV3URL + '/Shuttle/SciencePark/EstimatedTimeOfArrival/Authority/{AuthorityCode}'
};

function findBusCity(str){
    var ary = pData.bus.city;
    var rt = false;
    for(var i=0; i<ary.length; i++){
        if(ary[i].name==str || ary[i].City==str || ary[i].CityCode==str){
            rt = ary[i];
            break;
        }
    }
    return rt;
}

function normalizeCityCfg(city, cfg){
    if(!cfg && city && typeof(city)=='object' && !Array.isArray(city)){
        cfg = city;
        city = false;
    }
    return {
        city: city,
        cfg: cfg
    }
}

function getBusManagePath(city, cfg){
    if(cfg.manageBy == 'InterCity') return 'InterCity';
    var cityData = findBusCity(city);
    if(!cityData){
        ptx.throwError('Bus city not found.');
        return false;
    }
    return cfg.manageBy + '/' + cityData.City;
}

function buildBusURL(group, city, cfg, routeName){
    var managePath = getBusManagePath(city, cfg);
    if(!managePath) return false;
    var myURL = busURL + '/' + group + '/' + managePath;
    if(routeName) myURL += '/' + encodeURI(routeName);
    return myURL + '?';
}

function buildBusCityOnlyURL(group, city, cfg, routeName){
    if(cfg.manageBy == 'InterCity'){
        ptx.throwError(group + ' only support City manageBy.');
        return false;
    }
    return buildBusURL(group, city, cfg, routeName);
}

function buildBusQuery(cfg, queryAry){
    queryAry = (queryAry || []).filter(function(item){
        return !!item;
    });
    queryAry.push(ptx.topFn(cfg.top, cfg.format));
    if(cfg.selectField) queryAry.push(cfg.selectField);
    return queryAry.join('&');
}

function getBusV3City(city){
    var cityData = findBusCity(city);
    if(!cityData){
        ptx.throwError('Bus city not found.');
        return false;
    }
    return cityData.City;
}

function setBusV3DefaultCfg(cfg={}){
    if(typeof(cfg)=='string') cfg = {paramDirectlyUse: cfg};
    cfg.top = cfg.top || 3000;
    cfg.format = cfg.format || 'JSON';
    return cfg;
}

function processBusV3Cfg(cfg){
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

var fnBUS = {
    setDefaultCfg: function(cfg){
        cfg = cfg || {};
        cfg.manageBy = cfg.manageBy || 'City';//City , InterCity
        cfg.cbFn = cfg.cbFn || function(data,e){console.info(data);};
        cfg.selectField = (cfg.selectField) ? ptx.selectFieldFn(cfg.selectField) : '';
        cfg.top = cfg.top || 3000;
        cfg.format = cfg.format || 'JSON';
        return cfg;
    },
    getCityData: function(str){
        return findBusCity(str);
    },
    getBusArriveTime: function(StopUID, city, cfg){
        var filterStr = ptx.filterFn(ptx.filterParam('StopUID','==',StopUID,'or'));
        this.getEstimatedTimeOfArrival(filterStr, city, cfg);
    },
    getBusRouteArriveTime: function(RouteUID, cfg){
        var city = RouteUID.substr(0,3);
        var filterStr = ptx.filterFn(ptx.filterParam('RouteUID','==',RouteUID,'or'));
        this.getEstimatedTimeOfArrival(filterStr, city, cfg);
    },
    getBusRouteInfo: function(RouteUID, cfg){
        cfg = this.setDefaultCfg(cfg);
        var city = RouteUID.substr(0,3);
        var myURL = buildBusURL('Route', city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg, [ptx.filterFn(ptx.filterParam('RouteUID','==',RouteUID))]);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRealtimeNearStop: function(RouteUID, dir, cfg){
        cfg = this.setDefaultCfg(cfg);
        var city = RouteUID.substr(0,3);
        var myURL = buildBusURL('RealTimeNearStop', city, cfg);
        if(!myURL) return false;
        var filterStr;
        if(/string|number/.test(typeof(dir))){
            dir = dir.toString();
            filterStr = ptx.filterFn(ptx.filterParam(['RouteUID', 'Direction'],'==',[RouteUID, dir],'and'));
        }else{
            filterStr = ptx.filterFn(ptx.filterParam(['RouteUID'],'==',[RouteUID],'and'));
        }
        myURL += buildBusQuery(cfg, [filterStr]);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRoute: function(RouteUID, cfg, city){
        cfg = this.setDefaultCfg(cfg);
        if(!city){
            if(typeof(RouteUID)=='string'){city = RouteUID.substr(0,3);}
            else{city = RouteUID[0].substr(0,3);}
        }
        var myURL = buildBusURL('Route', city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg, [ptx.filterFn(ptx.filterParam('RouteUID','==',RouteUID))]);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusStation: function(StationID, city, cfg){
        cfg = this.setDefaultCfg(cfg);
        var myURL = buildBusURL('Station', city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg, [ptx.filterFn(ptx.filterParam('StationID','==',StationID.toString()))]);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getPositionBusStation: function(city, lat, lng, cfg){
        cfg = this.setDefaultCfg(cfg);
        var myURL = buildBusURL('Station', city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg, [ptx.spatialFilterFn(lat, lng, cfg.far, cfg.field)]);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getPromisePositionBusStation: function(city, lat, lng, cfg = {}){
        return new Promise((resolve)=>{
            cfg.cbFn = function(e){resolve(e);}
            fnBUS.getPositionBusStation(city, lat, lng, cfg);
        })
    },
    getBusStopRoute: function(RouteUID, city, cfg){
        cfg = this.setDefaultCfg(cfg);
        var myURL = buildBusURL('StopOfRoute', city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg, [ptx.filterFn(ptx.filterParam('RouteUID','==',RouteUID.toString())), ptx.orderByFn('SubRouteName/Zh_tw', 'asc')]);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getPromiseBusStopRoute: function(RouteUID, city, cfg = {}){
        return new Promise((resolve)=>{
            cfg.cbFn = function(e){resolve(e);}
            fnBUS.getBusStopRoute(RouteUID, city, cfg);
        })
    },
    getPromiseMultiBusStopRoute: function(aryRouteUID, city, cfg = {}){
        var rtuids = aryRouteUID.map((c)=>{ return 'RouteUID'; })
        cfg = this.setDefaultCfg(cfg);
        var myURL = buildBusURL('StopOfRoute', city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg, [ptx.filterFn(ptx.filterParam(rtuids,'==',aryRouteUID, 'or')), ptx.orderByFn('SubRouteName/Zh_tw', 'asc')]);

        return new Promise((resolve)=>{
            ptx.getURL(myURL, resolve);
        })
    },
    getBusStopRouteByNumber: function(busNumber, city, cfg){
        cfg = this.setDefaultCfg(cfg);
        var myURL = buildBusURL('StopOfRoute', city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg, [ptx.orderByFn('SubRouteName/Zh_tw', 'asc')]);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getEstimatedTimeOfArrival: function(filterStr, city, cfg){
        cfg = this.setDefaultCfg(cfg);
        var myURL = buildBusURL('EstimatedTimeOfArrival', city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg, [filterStr]);
        ptx.getURL(myURL, cfg.cbFn);
    },
    searchBusByNumber:function(busNumber, city, cfg){
        cfg = this.setDefaultCfg(cfg);
        var myURL = buildBusURL('Route', city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg, [ptx.orderByFn('RouteName/Zh_tw', 'asc')]);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusOperator: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('Operator', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRouteFare: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('RouteFare', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRouteFareByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('RouteFare', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusShape: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('Shape', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusShapeByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('Shape', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusSchedule: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('Schedule', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusScheduleByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('Schedule', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusVehicle: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = (cfg.manageBy == 'City') ? buildBusURL('Vehicle', arg.city, cfg) : busURL + '/Vehicle?';
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusAlert: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('Alert', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusStop: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('Stop', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusDisplayStopRoute: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusCityOnlyURL('DisplayStopOfRoute', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusDisplayStopRouteByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusCityOnlyURL('DisplayStopOfRoute', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusDailyTimeTable: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('DailyTimeTable', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusDailyTimeTableByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('DailyTimeTable', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRouteNetwork: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusCityOnlyURL('RouteNetwork', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRouteNetworkByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusCityOnlyURL('RouteNetwork', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusDailyStopTimeTable: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusCityOnlyURL('DailyStopTimeTable', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusDailyStopTimeTableByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusCityOnlyURL('DailyStopTimeTable', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusDataVersion: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('DataVersion', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusFirstLastTripInfo: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('FirstLastTripInfo', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusFirstLastTripInfoByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        if(cfg.manageBy == 'InterCity'){
            ptx.throwError('FirstLastTripInfo route-name only support City manageBy.');
            return false;
        }
        var myURL = buildBusURL('FirstLastTripInfo', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusNews: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('News', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRealTimeByFrequency: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('RealTimeByFrequency', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRealTimeByFrequencyByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('RealTimeByFrequency', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRealTimeByFrequencyStreaming: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('RealTimeByFrequency/Streaming', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRealTimeByFrequencyStreamingByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('RealTimeByFrequency/Streaming', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRealTimeNearStopStreaming: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('RealTimeNearStop/Streaming', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRealTimeNearStopStreamingByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('RealTimeNearStop/Streaming', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusEstimatedTimeOfArrivalStreaming: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('EstimatedTimeOfArrival/Streaming', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusEstimatedTimeOfArrivalStreamingByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('EstimatedTimeOfArrival/Streaming', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusStationGroup: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('StationGroup', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusS2STravelTime: function(routeID, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('S2STravelTime', arg.city, cfg, routeID);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRouteTPASS: function(city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('RouteTPASS', arg.city, cfg);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRouteTPASSByNumber: function(busNumber, city, cfg){
        var arg = normalizeCityCfg(city, cfg);
        cfg = this.setDefaultCfg(arg.cfg);
        var myURL = buildBusURL('RouteTPASS', arg.city, cfg, busNumber);
        if(!myURL) return false;
        myURL += buildBusQuery(cfg);
        ptx.getURL(myURL, cfg.cbFn);
    }
}

fnBUS.v3 = {
    urls: v3urls,
    getCityData: function(city){
        return findBusCity(city);
    },
    getNetwork: function(city, cfg={}){return fnBUS.v3._Network(city, cfg);},
    getStop: function(city, cfg={}){return fnBUS.v3._Stop(city, cfg);},
    getStation: function(city, cfg={}){return fnBUS.v3._Station(city, cfg);},
    getRoute: function(city, cfg={}){return fnBUS.v3._Route(city, cfg);},
    getSubRoute: function(city, cfg={}){return fnBUS.v3._SubRoute(city, cfg);},
    getFirstLastTripInfo: function(city, cfg={}){return fnBUS.v3._FirstLastTripInfo(city, cfg);},
    getDepot: function(city, cfg={}){return fnBUS.v3._Depot(city, cfg);},
    getStopOfRoute: function(city, cfg={}){return fnBUS.v3._StopOfRoute(city, cfg);},
    getDisplayStopOfRoute: function(city, cfg={}){return fnBUS.v3._DisplayStopOfRoute(city, cfg);},
    getRouteFare: function(city, cfg={}){return fnBUS.v3._RouteFare(city, cfg);},
    getSchedule: function(city, cfg={}){return fnBUS.v3._Schedule(city, cfg);},
    getDailyTimeTable: function(city, cfg={}){return fnBUS.v3._DailyTimeTable(city, cfg);},
    getRealTimeByFrequency: function(city, cfg={}){return fnBUS.v3._RealTimeByFrequency(city, cfg);},
    getRealTimeByFrequencyByRouteName: function(routeName, city, cfg={}){return fnBUS.v3._RealTimeByFrequency_RouteName(city, routeName, cfg);},
    getRealTimeNearStop: function(city, cfg={}){return fnBUS.v3._RealTimeNearStop(city, cfg);},
    getRealTimeNearStopByRouteName: function(routeName, city, cfg={}){return fnBUS.v3._RealTimeNearStop_RouteName(city, routeName, cfg);},
    getEstimatedTimeOfArrival: function(city, cfg={}){return fnBUS.v3._EstimatedTimeOfArrival(city, cfg);},
    getEstimatedTimeOfArrivalByRouteName: function(routeName, city, cfg={}){return fnBUS.v3._EstimatedTimeOfArrival_RouteName(city, routeName, cfg);},
    getAlert: function(city, cfg={}){return fnBUS.v3._Alert(city, cfg);},
    getNews: function(city, cfg={}){return fnBUS.v3._News(city, cfg);},
    getOperator: function(city, cfg={}){return fnBUS.v3._Operator(city, cfg);},
    getVehicle: function(city, cfg={}){return fnBUS.v3._Vehicle(city, cfg);},
    getVehicleDepot: function(city, cfg={}){return fnBUS.v3._VehicleDepot(city, cfg);},
    getVehicleRoute: function(city, cfg={}){return fnBUS.v3._VehicleRoute(city, cfg);},
    getShape: function(city, cfg={}){return fnBUS.v3._Shape(city, cfg);},
    getRouteNetwork: function(city, cfg={}){return fnBUS.v3._RouteNetwork(city, cfg);},
    getS2STravelTime: function(city, cfg={}){return fnBUS.v3._S2STravelTime(city, cfg);},
    drts: {
        urls: drtsV3urls,
        getCityData: function(city){
            return findBusCity(city);
        },
        getStop: function(city, cfg={}){return fnBUS.v3.drts._Stop(city, cfg);},
        getStation: function(city, cfg={}){return fnBUS.v3.drts._Station(city, cfg);},
        getStationGroup: function(city, cfg={}){return fnBUS.v3.drts._StationGroup(city, cfg);},
        getOperator: function(city, cfg={}){return fnBUS.v3.drts._Operator(city, cfg);},
        getRoute: function(city, cfg={}){return fnBUS.v3.drts._Route(city, cfg);},
        getSubRoute: function(city, cfg={}){return fnBUS.v3.drts._SubRoute(city, cfg);},
        getSubRouteByRouteName: function(routeName, city, cfg={}){return fnBUS.v3.drts._SubRoute_RouteName(city, routeName, cfg);},
        getBookingRule: function(city, cfg={}){return fnBUS.v3.drts._BookingRule(city, cfg);},
        getStopOfRoute: function(city, cfg={}){return fnBUS.v3.drts._StopOfRoute(city, cfg);},
        getStopOfRouteByRouteName: function(routeName, city, cfg={}){return fnBUS.v3.drts._StopOfRoute_RouteName(city, routeName, cfg);},
        getRouteFare: function(city, cfg={}){return fnBUS.v3.drts._RouteFare(city, cfg);},
        getRouteFareByRouteName: function(routeName, city, cfg={}){return fnBUS.v3.drts._RouteFare_RouteName(city, routeName, cfg);},
        getSchedule: function(city, cfg={}){return fnBUS.v3.drts._Schedule(city, cfg);},
        getScheduleByRouteName: function(routeName, city, cfg={}){return fnBUS.v3.drts._Schedule_RouteName(city, routeName, cfg);},
        getDailyTimeTable: function(city, cfg={}){return fnBUS.v3.drts._DailyTimeTable(city, cfg);},
        getDailyTimeTableByRouteName: function(routeName, city, cfg={}){return fnBUS.v3.drts._DailyTimeTable_RouteName(city, routeName, cfg);},
        getGeneralStopTimeTable: function(city, cfg={}){return fnBUS.v3.drts._GeneralStopTimeTable(city, cfg);},
        getGeneralStopTimeTableByRouteName: function(routeName, city, cfg={}){return fnBUS.v3.drts._GeneralStopTimeTable_RouteName(city, routeName, cfg);},
        getDailyStopTimeTable: function(city, cfg={}){return fnBUS.v3.drts._DailyStopTimeTable(city, cfg);},
        getDailyStopTimeTableByRouteName: function(routeName, city, cfg={}){return fnBUS.v3.drts._DailyStopTimeTable_RouteName(city, routeName, cfg);},
        getLocation: function(city, cfg={}){return fnBUS.v3.drts._Location(city, cfg);},
        getLocationGroup: function(city, cfg={}){return fnBUS.v3.drts._LocationGroup(city, cfg);},
        getShape: function(city, cfg={}){return fnBUS.v3.drts._Shape(city, cfg);},
        getShapeByRouteName: function(routeName, city, cfg={}){return fnBUS.v3.drts._Shape_RouteName(city, routeName, cfg);},
        getS2STravelTime: function(city, cfg={}){return fnBUS.v3.drts._S2STravelTime(city, cfg);},
        getVehicle: function(city, cfg={}){return fnBUS.v3.drts._Vehicle(city, cfg);},
        getAlert: function(city, cfg={}){return fnBUS.v3.drts._Alert(city, cfg);},
        getRealTimeByFrequency: function(city, cfg={}){return fnBUS.v3.drts._RealTimeByFrequency(city, cfg);},
        getRealTimeByFrequencyByRouteName: function(routeName, city, cfg={}){return fnBUS.v3.drts._RealTimeByFrequency_RouteName(city, routeName, cfg);},
        getRealTimeNearStop: function(city, cfg={}){return fnBUS.v3.drts._RealTimeNearStop(city, cfg);},
        getRealTimeNearStopByRouteName: function(routeName, city, cfg={}){return fnBUS.v3.drts._RealTimeNearStop_RouteName(city, routeName, cfg);},
        getEstimatedTimeOfArrival: function(city, cfg={}){return fnBUS.v3.drts._EstimatedTimeOfArrival(city, cfg);},
        getEstimatedTimeOfArrivalByRouteName: function(routeName, city, cfg={}){return fnBUS.v3.drts._EstimatedTimeOfArrival_RouteName(city, routeName, cfg);}
    },
    shuttleHospital: {
        urls: shuttleHospitalV3urls,
        getAuthority: function(cfg={}){return fnBUS.v3.shuttleHospital._Authority(cfg);},
        getOperator: function(authorityCode, cfg={}){return fnBUS.v3.shuttleHospital._Operator(authorityCode, cfg);},
        getStop: function(authorityCode, cfg={}){return fnBUS.v3.shuttleHospital._Stop(authorityCode, cfg);},
        getRoute: function(authorityCode, cfg={}){return fnBUS.v3.shuttleHospital._Route(authorityCode, cfg);},
        getStopOfRoute: function(authorityCode, cfg={}){return fnBUS.v3.shuttleHospital._StopOfRoute(authorityCode, cfg);},
        getSchedule: function(authorityCode, cfg={}){return fnBUS.v3.shuttleHospital._Schedule(authorityCode, cfg);}
    },
    shuttleSciencePark: {
        urls: shuttleScienceParkV3urls,
        getAuthority: function(cfg={}){return fnBUS.v3.shuttleSciencePark._Authority(cfg);},
        getOperator: function(authorityCode, cfg={}){return fnBUS.v3.shuttleSciencePark._Operator(authorityCode, cfg);},
        getStop: function(authorityCode, cfg={}){return fnBUS.v3.shuttleSciencePark._Stop(authorityCode, cfg);},
        getRoute: function(authorityCode, cfg={}){return fnBUS.v3.shuttleSciencePark._Route(authorityCode, cfg);},
        getStopOfRoute: function(authorityCode, cfg={}){return fnBUS.v3.shuttleSciencePark._StopOfRoute(authorityCode, cfg);},
        getSchedule: function(authorityCode, cfg={}){return fnBUS.v3.shuttleSciencePark._Schedule(authorityCode, cfg);},
        getRealTimeByFrequency: function(authorityCode, cfg={}){return fnBUS.v3.shuttleSciencePark._RealTimeByFrequency(authorityCode, cfg);},
        getRealTimeNearStop: function(authorityCode, cfg={}){return fnBUS.v3.shuttleSciencePark._RealTimeNearStop(authorityCode, cfg);},
        getEstimatedTimeOfArrival: function(authorityCode, cfg={}){return fnBUS.v3.shuttleSciencePark._EstimatedTimeOfArrival(authorityCode, cfg);}
    }
}

function makePTXBusV3_func(urlMap, cmd, cfg){
    cfg = setBusV3DefaultCfg(cfg);
    var param = processBusV3Cfg(cfg);
    return ptx.getPromiseURL(urlMap[cmd] + param, cfg);
}

function attachBusV3Api(target, urlMap, autoKeyName){
    var aryMakeBusV3Function = Object.keys(urlMap);
    var autoKeys = [];
    aryMakeBusV3Function.forEach(function(fn){
        if(!/\{/.test(urlMap[fn])){
            target['_' + fn] = function(cfg){return makePTXBusV3_func(urlMap, fn, cfg);}
            autoKeys.push('_' + fn);
        }else{
        let urlAry = urlMap[fn].split('/');
        let paramCount = 0;
        let paramAry = [];
        urlAry.forEach(function(c){
            if(/^\{/.test(c)){
                paramCount++;
                paramAry.push(c.replace(/[{}]/g, ''));
            }
        })

        target['_' + fn] = function(){
            let ptr = 0;
            let arg = arguments;
            
            let isObjArgs = false;
            let paramsObj = null;

            if(arg.length > 0 && typeof arg[0] === 'object' && arg[0] !== null) {
                if (paramAry.some(p => p in arg[0])) {
                    isObjArgs = true;
                    paramsObj = arg[0];
                }
            }

            if(!isObjArgs && arg.length < paramCount) throw('Lose parameter, need ' + paramAry.join());
            
            let url = urlAry.map(function(c){
                if(/^\{/.test(c)){
                    let key = c.replace(/[{}]/g, '');
                    let value;
                    if(isObjArgs) {
                        if(paramsObj[key] === undefined) throw('Lose parameter, need ' + key);
                        value = paramsObj[key];
                    } else {
                        value = arg[ptr++];
                    }
                    if(key == 'City') return getBusV3City(value);
                    return encodeURI(value);
                }
                return c;
            }).join('/');
            
            let cfg = isObjArgs ? arguments[1] : arguments[paramCount];
            cfg = setBusV3DefaultCfg(cfg);
            var param = processBusV3Cfg(cfg);
            return ptx.getPromiseURL(url + param, cfg);
        }
        autoKeys.push('_' + fn);
        }
    })
    target[autoKeyName] = autoKeys;
}

attachBusV3Api(fnBUS.v3, v3urls, 'ptxAutoBusV3FunctionKey');
attachBusV3Api(fnBUS.v3.drts, drtsV3urls, 'ptxAutoBusV3DRTSFunctionKey');
attachBusV3Api(fnBUS.v3.shuttleHospital, shuttleHospitalV3urls, 'ptxAutoBusV3ShuttleHospitalFunctionKey');
attachBusV3Api(fnBUS.v3.shuttleSciencePark, shuttleScienceParkV3urls, 'ptxAutoBusV3ShuttleScienceParkFunctionKey');


export default fnBUS;