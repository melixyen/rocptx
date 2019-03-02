import common from './common.js';
import ptx from './ptx.js';
import pData from './data.js';

let busURL = common.busURL;

var fnBUS = {
    setDefaultCfg: function(cfg){
        cfg = cfg || {};
        cfg.manageBy = cfg.manageBy || 'City';//City , InterCity
        cfg.cbFn = cfg.cbFn || function(data,e){console.info(data);};
        cfg.selectField = (cfg.selectField) ? ptx.selectFieldFn(cfg.selectField) : '';
        cfg.top = 3000;
        return cfg;
    },
    getCityData: function(str){
        var ary = pData.bus.city;
        var rt = false;
        for(var i=0; i<ary.length; i++){
            if(ary[i].name==str || ary[i].City==str || ary[i].CityCode==str){
            rt = ary[i];
            break;
            }
        }
        return rt;
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
        var myURL = busURL + '/Route/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
        myURL += ptx.filterFn(ptx.filterParam('RouteUID','==',RouteUID) + '&' + ptx.topFn());
        if(cfg.selectField) myURL += '&' + cfg.selectField;
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRealtimeNearStop: function(RouteUID, dir, cfg){
        cfg = this.setDefaultCfg(cfg);
        var city = RouteUID.substr(0,3);
        if(/string|number/.test(typeof(dir))){
            dir = dir.toString();
            var myURL = busURL + '/RealTimeNearStop/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
            myURL += ptx.filterFn(ptx.filterParam(['RouteUID', 'Direction'],'==',[RouteUID, dir],'and')) + '&' + ptx.topFn();
        }else{
            var myURL = busURL + '/RealTimeNearStop/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
            myURL += ptx.filterFn(ptx.filterParam(['RouteUID'],'==',[RouteUID],'and')) + '&' + ptx.topFn();
        }
        if(cfg.selectField) myURL += '&' + cfg.selectField;
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRoute: function(RouteUID, cfg, city){
        cfg = this.setDefaultCfg(cfg);
        if(!city){
            if(typeof(RouteUID)=='string'){city = RouteUID.substr(0,3);}
            else{city = RouteUID[0].substr(0,3);}
        }
        var myURL = busURL + '/Route/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
        myURL += ptx.filterFn(ptx.filterParam('RouteUID','==',RouteUID),'or') + '&' + ptx.topFn();
        if(cfg.selectField) myURL += '&' + cfg.selectField;
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusStation: function(StationID, city, cfg){
        cfg = this.setDefaultCfg(cfg);
        var myURL = busURL + '/Station/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
        myURL += ptx.filterFn(ptx.filterParam('StationID','==',StationID.toString())) + '&' + ptx.topFn();
        if(cfg.selectField) myURL += '&' + cfg.selectField;
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusStopRoute: function(RouteUID, city, cfg){
        cfg = this.setDefaultCfg(cfg);
        var myURL = busURL + '/StopOfRoute/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
        myURL += ptx.filterFn(ptx.filterParam('RouteUID','==',RouteUID.toString())) + '&';
        myURL += ptx.orderByFn('SubRouteName/Zh_tw', 'asc') + '&' + ptx.topFn();
        if(cfg.selectField) myURL += '&' + cfg.selectField;
        ptx.getURL(myURL, cfg.cbFn);
    },
    getBusStopRouteByNumber: function(busNumber, city, cfg){
        cfg = this.setDefaultCfg(cfg);
        var myURL = busURL + '/StopOfRoute/' + cfg.manageBy + '/' + this.getCityData(city).City + '/' + encodeURI(busNumber) + '?';
        myURL += ptx.orderByFn('SubRouteName/Zh_tw', 'asc') + '&' + ptx.topFn();
        if(cfg.selectField) myURL += '&' + cfg.selectField;
        ptx.getURL(myURL, cfg.cbFn);
    },
    getEstimatedTimeOfArrival: function(filterStr, city, cfg){
        filterStr = (filterStr) ? filterStr + '&' : '';
        cfg = this.setDefaultCfg(cfg);
        var myURL = busURL + '/EstimatedTimeOfArrival/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
        myURL += filterStr + ptx.topFn();
        if(cfg.selectField) myURL += '&' + cfg.selectField;
        ptx.getURL(myURL, cfg.cbFn);
    },
    searchBusByNumber:function(busNumber, city, cfg){
        cfg = this.setDefaultCfg(cfg);
        var myURL = busURL + '/Route/' + cfg.manageBy + '/' + this.getCityData(city).City + '/' + encodeURI(busNumber) + '?';
        myURL += ptx.orderByFn('RouteName/Zh_tw', 'asc') + '&' + ptx.topFn();
        if(cfg.selectField) myURL += '&' + cfg.selectField;
        ptx.getURL(myURL, cfg.cbFn);
    }
}

export default fnBUS;