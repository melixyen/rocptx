import jsSHA from './jsSHA';
import common from './common.js';


let fnTRTC = () => ptx.trtc;

var ptx = {
    statusCode: common.statusCode,
    timeout: 30000,
    tempTimeTable: {},
    throwError: function(str){ throw str;},
    filterParam: function(field, op, value, andOr){
        //field 及 value可為陣列，其中一者為陣列時將用 andOr 連接，但當兩者皆為陣列時必需長度一致以便配對連接
        //ptx.filterParam(['fdfsd/fdfd','fdfd/gfg','fgf'],'<',[325,'ggg',996],'AND')
        andOr = andOr || 'or'; andOr = andOr.toLowerCase();
        var opMap = {
            '=': 'eq', '==': 'eq', '===': 'eq',
            '!=': 'ne', '!==': 'ne',
            '!': 'not',
            '>': 'gt', '>=': 'ge', '<': 'lt', '<=': 'le'
        }
        var op2 = opMap[op] || op;
        if(typeof(field)=='object' && typeof(value)=='object' && field.length != value.length){
            ptx.throwError('Not equal length of filterParam filed and value;');
            return false;
        }
        if(typeof(field)!='object'){field = [field];}
        if(typeof(value)!='object'){value = [value];}
        var cnt = (field.length > value.length) ? field.length : value.length;
        var tmpField, tmpValue, stringAry = [];
        for(var i=0; i<cnt; i++){
            tmpField = field[i] || field[0];
            tmpValue = value[i] || value[0];
            if(typeof(tmpValue)=='string') tmpValue = "'" + tmpValue + "'";
            stringAry.push(tmpField + ' ' + op2 + ' ' + tmpValue);
        }
        return stringAry.join(' ' + andOr + ' ');
    },
    filterFn: function(param){
        return encodeURI('$filter=' + param);
    },
    orderByFn: function(field, dir){
        dir = (dir && typeof(dir)=='string') ? ' ' + dir.toLowerCase() : '';
        return encodeURI('$orderby=' + arguments[0] + dir);
    },
    spatialFilterFn: function(lat, lng, far=200, field='StationPosition'){
        //預設對 PTX 找 200 公尺範圍的
        return encodeURI('$spatialFilter=nearby(' + field + ', ' + lat + ', ' + lng + ', ' + far + ')');
    },
    topFn: function(top, formatStr){
        top = top || 3000;
        formatStr = formatStr || 'JSON';
        return '$top=' + top + '&format=' + formatStr;
    },
    selectFieldFn: function(str){
        if(typeof(str)=='object' && str.length){
            str = str.join(',');
        }
        return encodeURI('$select=' + str);
    },
    GetAuthorizationHeader: function(){
        var AppID = ptx.AppID || 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
        var AppKey = ptx.AppKey || 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

        var GMTString = new Date().toGMTString();
        var ShaObj = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        var HMAC = ShaObj.getHMAC('B64');
        var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

        return { 'Authorization': Authorization, 'X-Date': GMTString};
    },
    getTakeMRTTimeTable: function(mrtPTXAry, w, cbFn){
        var rtStatus = [];
        function runGet(arr){
            if(arr.length==0){
                cbFn(rtStatus, ptx.tempTimeTable);
            }else{
                var obj = arr.shift();
                if(obj.company=='trtc'){
                    var LineID = fnTRTC().getLineID(obj.line),
                        StationID = fnTRTC().getStationID(obj.takeRange[0], obj.line),
                        targetID = fnTRTC().getStationID(obj.takeRange[1], obj.line);
                    fnTRTC().getStationTime(LineID, [StationID,targetID], parseInt(w), function(json){
                        var rts = {LineID:LineID, StationID: StationID, targetID: targetID};
                        if(json==common.CONST_PTX_API_FAIL){
                            rts.status = common.CONST_PTX_API_FAIL;
                            rts.message = common.CONST_PTX_API_MSG_COMM_FAILED;
                            rtStatus.push(rts);
                            runGet(arr);
                        }else{
                            rts.status = common.CONST_PTX_API_SUCCESS;
                            rtStatus.push(rts);
                            runGet(arr);
                        }
                    });
                }
            }
        }
        runGet(mrtPTXAry);
    },
    getURL: function(url, cbFn){
        function reqListener(xhr){
            var event = {
                xhr: xhr,
                data: xhr.target.response
            }
            if(xhr.target.readyState==4 && xhr.target.status==200){
                event.status = common.CONST_PTX_API_SUCCESS;
                cbFn(JSON.parse(xhr.target.response), event);
            }else{
                event.status = common.CONST_PTX_API_FAIL;
                cbFn(xhr.target.response, event);
            }
        }
        var fm = new XMLHttpRequest();
        fm.addEventListener("load", reqListener);
        fm.addEventListener("error", reqListener);
        fm.addEventListener("abort", reqListener);
        fm.addEventListener("timeout", reqListener);
        fm.open('GET', url);
        fm.timeout = ptx.timeout;
        var headerObj = this.GetAuthorizationHeader();
        for(var k in headerObj){
            fm.setRequestHeader(k, headerObj[k]);
        }
        fm.send();
    },
    getPromiseURL: function(url, cfg={}){

        return new Promise(function(resolve, reject){
            function reqListener(xhr){
                var event = {
                    xhr: xhr,
                    url: url,
                    config: cfg,
                    resolve: resolve,
                    reject: reject,
                    response: xhr.target.response
                }
                if(xhr.target.readyState==4 && xhr.target.status==200){
                    event.status = common.CONST_PTX_API_SUCCESS;
                    event.data = JSON.parse(xhr.target.response);
                    if(typeof(cfg.processJSON) == 'function'){
                        event.data = cfg.processJSON(event.data);
                    }
                    resolve(event);
                }else{
                    event.status = common.CONST_PTX_API_FAIL;
                    reject(event);
                }
            }
            var fm = new XMLHttpRequest();
            fm.addEventListener("load", reqListener);
            fm.addEventListener("error", reqListener);
            fm.addEventListener("abort", reqListener);
            fm.addEventListener("timeout", reqListener);

            var method = cfg.method || 'GET';
            fm.open(method, url);
            fm.timeout = cfg.timeout || ptx.timeout;
            var headerObj = cfg.head || ptx.GetAuthorizationHeader();
            for(var k in headerObj){
                fm.setRequestHeader(k, headerObj[k]);
            }
            fm.send();
        })
    },
    getStationLiveInfo: function(stid, cbFn){
        stid = (stid) ? stid.replace('tra_','') : '1008';
        cbFn = cbFn || function(data){console.info(data);};
        var url = traURL + '/LiveBoard/Station/' + stid + '?$top=30&$format=JSON';
        this.getURL(url, cbFn);
    },
    getStationTodayTime: function(stid, cbFn){
        stid = (stid) ? stid.replace('tra_','') : '1008';
        cbFn = cbFn || function(data){console.info(data);};
        var url = traURL + '/DailyTimetable/Station/' + stid + '/' + TT.goingData.today + '?$top=3000&$format=JSON';
        this.getURL(url, cbFn);
    },
    sortByTTSortTime: function(a,b){
        var intA = parseInt(a.tt_sortTime,10);
        var intB = parseInt(b.tt_sortTime,10);
        if(intA==intB) return 0;
        if(intA < intB) return -1;
        if(intA > intB) return 1;
    }
}

export default ptx;

