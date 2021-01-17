import fnBUS from './bus.js';

var rbus = {}



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

rbus.findDirectBus = async function(posA, posB, far = 250, citys = ['TPE','NWT']){
    // rocptx.router.bus.findDirectBus({lat:25.049991, lng:121.57715},{lat:25.046123, lng:121.537417}, 800).then((e)=>{console.log(e)})
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
    var aryRouteUIDs = {};
    for(var i=0; i<aryMapping.length; i++){
        // getPromiseMultiBusStopRoute
        var tmpCity = aryMapping[i].city;
        if(!aryRouteUIDs[tmpCity]) aryRouteUIDs[tmpCity] = [];
        if(aryRouteUIDs[tmpCity].indexOf(aryMapping[i].RouteUID) == -1) aryRouteUIDs[tmpCity].push(aryMapping[i].RouteUID);
    }
    var busStopData = [];
    for(var k in aryRouteUIDs){
        var tmpBs = await fnBUS.getPromiseMultiBusStopRoute(aryRouteUIDs[k], k);
        busStopData = busStopData.concat(tmpBs);
    }
    for(var i=0; i<aryMapping.length; i++){
        var t = aryMapping[i];
        busStopData.forEach((routeStops)=>{
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

export default rbus;