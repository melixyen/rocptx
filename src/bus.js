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
    getPositionBusStation: function(city, lat, lng, cfg){
        cfg = this.setDefaultCfg(cfg);
        var myURL = busURL + '/Station/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
        myURL += ptx.spatialFilterFn(lat, lng, cfg.far, cfg.field) + '&' + ptx.topFn();
        if(cfg.selectField) myURL += '&' + cfg.selectField;
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
        var myURL = busURL + '/StopOfRoute/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
        myURL += ptx.filterFn(ptx.filterParam('RouteUID','==',RouteUID.toString())) + '&';
        myURL += ptx.orderByFn('SubRouteName/Zh_tw', 'asc') + '&' + ptx.topFn();
        if(cfg.selectField) myURL += '&' + cfg.selectField;
        ptx.getURL(myURL, cfg.cbFn);
    },
    getPromiseBusStopRoute: function(RouteUID, city, cfg = {}){
        return new Promise((resolve)=>{
            cfg.cbFn = function(e){resolve(e);}
            fnBUS.getBusStopRoute(RouteUID, city, cfg);
        })
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

function cloneBusStationData(station){
    var a = {
        StationID: station.StationID,
        StationUID: station.StationUID,
        StationName: station.StationName,
        StationPosition: station.StationPosition,
        StationAddress: station.StationAddress,
        VersionID: station.VersionID
    }

    return JSON.parse(JSON.stringify(a));
}

fnBUS.findDirectBus = async function(posA, posB, far = 250, citys = ['TPE','NWT']){
    // rocptx.bus.findDirectBus({lat:25.049991, lng:121.57715},{lat:25.046123, lng:121.537417}, 800).then((e)=>{console.log(e)})
    if(!posA.lat || !posA.lng) return false;
    if(!posB.lat || !posB.lng) return false;
    var aryStationsA = [], aryStationsB = [];

    for(var i=0; i<citys.length; i++){
        var tmpA = await fnBUS.getPromisePositionBusStation(citys[i], posA.lat, posA.lng);
        var tmpB = await fnBUS.getPromisePositionBusStation(citys[i], posB.lat, posB.lng);

        aryStationsA = aryStationsA.concat(tmpA);
        aryStationsB = aryStationsB.concat(tmpB);
    }

    // 尋找 aryStationsA 中所有 Stops 的 RouteUID 和 aryStationsB 中所有 Stops 的 RouteUID 有 mapping 的
    var aryMapping = [], hasBusStationA = {}, hasBusStationB = {};
    aryStationsA.forEach((stnA)=>{
        stnA.Stops.forEach((stpA)=>{
            aryStationsB.forEach((stnB)=>{
                stnB.Stops.forEach((stpB)=>{
                    if(stpA.RouteUID == stpB.RouteUID){
                        var stsA_data = cloneBusStationData(stnA);
                        var stsB_data = cloneBusStationData(stnB);
                        var dataA = Object.assign({stationData:stsA_data}, stpA);
                        var dataB = Object.assign({stationData:stsB_data}, stpB);
                        hasBusStationA[stsA_data.StationUID] = stsA_data;
                        hasBusStationB[stsB_data.StationUID] = stsB_data;
                        aryMapping.push({
                            RouteUID: stpA.RouteUID,
                            city: stpA.RouteUID.substr(0,3),
                            from: dataA,
                            to: dataB
                        })
                    }
                });
            });
        })
    })

    // 將 Route Stop 放進物件中
    for(var i=0; i<aryMapping.length; i++){
        var t = aryMapping[i];
        var aryRouteStops = await fnBUS.getPromiseBusStopRoute(t.RouteUID, t.city);
        aryRouteStops.forEach((routeStops)=>{
            var flgMatchStop = routeStops.Stops.find((c)=>{
                return c.StopUID == t.from.StopUID;
            })
            if(flgMatchStop){
                aryMapping[i].busInfo = routeStops;
                var aidx = routeStops.Stops.findIndex((g)=>{ return g.StopUID==t.from.StopUID});
                var bidx = routeStops.Stops.findIndex((g)=>{ return g.StopUID==t.to.StopUID});
                aryMapping[i].fromStopIndex = aidx;
                aryMapping[i].toStopIndex = bidx;
                aryMapping[i].isRightBus = !!(aidx < bidx);
            }
        })
        
    }

    aryMapping = aryMapping.filter((c)=>{ return c.isRightBus;});

    return {hasBusStationA:hasBusStationA, hasBusStationB:hasBusStationB, mappingStops:aryMapping};
}

export default fnBUS;