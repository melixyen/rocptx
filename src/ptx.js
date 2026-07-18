import jsSHA from './jsSHA';
import common from './common.js';


let fnTRTC = () => ptx.trtc;

const REQ_LEVEL_MAP = {
    basic: common.CONST_TDX_LEVEL_BASIC,
    advanced: common.CONST_TDX_LEVEL_ADVANCED,
    premium: common.CONST_TDX_LEVEL_PREMIUM,
    historical: common.CONST_TDX_LEVEL_HISTORICAL,
    maas: common.CONST_TDX_LEVEL_MAAS
};

//========== TDX rate limit（429）自動重試 ==========
//TDX 對任一 API 都可能回 429 API rate limit exceeded；底層（getURL / getPromiseURL）
//攔截後依 rateLimitRetry.delays 指數退避重試，整個機制跑完才 callback / resolve / reject。

//判斷回應是否為 rate limit（僅在非 200 的失敗回應上呼叫）
//優先序：1. HTTP status 429  2. header 可識別項目（remaining=0）  3. response message
function isRateLimitedXHR(target) {
    if (target.status === 429) return true;
    try {
        if (typeof (target.getResponseHeader) == 'function') {
            var remain = target.getResponseHeader('x-ratelimit-remaining-minute');
            if (remain === null || remain === undefined) remain = target.getResponseHeader('ratelimit-remaining');
            if (remain !== null && remain !== undefined && parseInt(remain, 10) === 0) return true;
        }
    } catch (e) { /* 瀏覽器 CORS 未曝露 header 時可能拋錯，忽略改用下一層判斷 */ }
    if (typeof (target.response) == 'string' && /API rate limit exceeded/i.test(target.response)) return true;
    return false;
}

//取得本次重試前的等待毫秒數：以退避序列為基準，若 Retry-After header 更長則採用 header 值
function getRateLimitDelay(target, attemptIdx) {
    var delay = ptx.rateLimitRetry.delays[attemptIdx];
    try {
        if (ptx.rateLimitRetry.useRetryAfterHeader && typeof (target.getResponseHeader) == 'function') {
            var ra = parseInt(target.getResponseHeader('retry-after'), 10);
            if (ra > 0 && ra * 1000 > delay) delay = ra * 1000;
        }
    } catch (e) { /* header 不可讀時維持退避序列 */ }
    return delay;
}

//共用重試迴圈：sendFn(onDone) 負責發出一次請求並以 xhr target 回呼；
//成功（status 200）或非 rate limit 失敗直接結束；rate limit 失敗依序列重試，
//序列用完仍失敗才把最後一次的結果交給 finishFn(isSuccess, target, retryCount)
function runWithRateLimitRetry(sendFn, finishFn) {
    var attemptIdx = 0;
    function run() {
        sendFn(function (target) {
            var isSuccess = !!(target.readyState == 4 && target.status == 200);
            if (!isSuccess && ptx.rateLimitRetry.enabled && attemptIdx < ptx.rateLimitRetry.delays.length && isRateLimitedXHR(target)) {
                var delay = getRateLimitDelay(target, attemptIdx);
                attemptIdx++;
                setTimeout(run, delay);
                return;
            }
            finishFn(isSuccess, target, attemptIdx);
        });
    }
    run();
}

//給 rocptx.req 用：若傳入的是字串（例如 CLI 參數、JSON.stringify 過的設定），自動 JSON.parse 成物件；
//已是物件或未提供（undefined/null）則原樣通過，讓呼叫端可以直接傳 JS 物件或 JSON 字串兩種形式
function parseIfJSONString(value, label) {
    if (typeof (value) != 'string') return value;
    var parsed;
    try {
        parsed = JSON.parse(value);
    } catch (e) {
        throw 'rocptx.req: ' + label + ' is a string but not valid JSON: ' + (e && e.message || e);
    }
    if (!parsed || typeof (parsed) != 'object' || Array.isArray(parsed)) {
        throw 'rocptx.req: ' + label + ' JSON string must parse to an object';
    }
    return parsed;
}

//給 rocptx.req 用：把 doc/tdx_docs 規格文件裡的 path 與 parameters 組成完整請求 URL
//path 樣板變數（{Xxx}）與剩餘的查詢參數皆對應 TDX 文件 Parameters 表的 Name 欄，
//查詢參數同時支援不帶 $ 的簡寫：select/filter/orderby/top/skip/format
function buildReqURL(path, parameters, options) {
    if (!path || typeof (path) != 'string') throw 'rocptx.req: path is required and must be a string';
    parameters = common.clone(parseIfJSONString(parameters, 'parameters') || {});
    options = parseIfJSONString(options, 'options') || {};

    var baseURL = '';
    if (!/^https?:\/\//i.test(path)) {
        if (options.baseURL) {
            baseURL = options.baseURL.replace(/\/$/, '');
        } else {
            var level = REQ_LEVEL_MAP[options.level || 'basic'];
            if (!level) throw 'rocptx.req: unknown options.level "' + options.level + '"';
            baseURL = common.CONST_TDX_API_URL + level;
        }
        if (!/^\//.test(path)) path = '/' + path;
    }

    //代入 path 樣板參數（例如 {OriginStationID}），用掉的 key 從 parameters 移除，不會再被當成 query 參數
    var usedKeys = [];
    var finalPath = path.replace(/\{([^}]+)\}/g, function (match, key) {
        if (parameters[key] === undefined) throw 'rocptx.req: missing path parameter "' + key + '" for ' + path;
        usedKeys.push(key);
        return encodeURI(parameters[key]);
    });
    usedKeys.forEach(function (k) { delete parameters[k]; });

    var shortMap = { select: '$select', filter: '$filter', orderby: '$orderby', orderBy: '$orderby', top: '$top', skip: '$skip', format: '$format' };
    var queryAry = [];
    var hasFormat = false;
    for (var key in parameters) {
        if (parameters[key] === undefined || parameters[key] === null) continue;
        var qKey = /^\$/.test(key) ? key : (shortMap[key] || key);
        if (qKey == '$format') hasFormat = true;
        queryAry.push(encodeURI(qKey + '=' + parameters[key]));
    }
    if (!hasFormat && (options.method || 'GET') == 'GET') queryAry.push('$format=' + (options.format || 'JSON'));
    if (options.query) queryAry.push(options.query.replace(/^[?&]/, ''));

    var url = baseURL + finalPath;
    if (queryAry.length) url += '?' + queryAry.join('&');
    return { url: url, options: options };
}

const TOKEN_DEFAULT_VALUE = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
let cfgToken = {
    _id: TOKEN_DEFAULT_VALUE,
    _secret: TOKEN_DEFAULT_VALUE,
    _token: TOKEN_DEFAULT_VALUE,
    get client_id() { return this._id; },
    set client_id(v) { this._id = v; },
    get client_secret() { return this._secret; },
    set client_secret(v) { this._secret = v; },
    get token() { return this._token; },
    set token(v) { this._token = v; },
    tokenGot: false,
    funProcess () {
        if (this.client_id != TOKEN_DEFAULT_VALUE && this.client_secret != TOKEN_DEFAULT_VALUE) {
            this.getToken().then((e) => {
                return e;
            });
        }
    },
    async getToken(_id, _secret) {
        if (_id) this.client_id = _id;
        if (_secret) this.client_secret = _secret;
        return ptx.getPromiseURL(common.CONST_TDX_GET_TOKEN, {
            head: {},
            param: {
                grant_type: 'client_credentials',
                client_id: this.client_id,
                client_secret: this.client_secret
            },
            method: 'POST'
        }).then((e) => {
            if (e.data.access_token) {
                this.tokenGot = true;
                this.token = e.data.access_token;
            }
            return e.data;
        })
    }
}

function defineObj() {
    Object.defineProperty(ptx, 'client_id', {
        get() { return cfgToken.client_id; },
        set(v) {cfgToken.client_id = v;},
        enumerable: true
    })
    Object.defineProperty(ptx, 'client_secret', {
        get() { return cfgToken.client_secret; },
        set(v) {cfgToken.client_secret = v;},
        enumerable: true
    })
    Object.defineProperty(ptx, 'AppID', {
        get() { return cfgToken.client_id; },
        set(v) {cfgToken.client_id = v; cfgToken.funProcess();},
        enumerable: true
    })
    Object.defineProperty(ptx, 'AppKey', {
        get() { return cfgToken.client_secret; },
        set(v) {cfgToken.client_secret = v; cfgToken.funProcess();},
        enumerable: true
    })
}

var ptx = {
    statusCode: common.statusCode,
    timeout: 30000,
    //TDX rate limit（429）自動重試設定：delays 為每次重試前的等待毫秒（指數退避 1s→32s），
    //序列用完仍失敗才回傳失敗；useRetryAfterHeader 為 true 時，Retry-After header 秒數大於退避值則採用 header 值
    rateLimitRetry: {
        enabled: true,
        delays: [1000, 2000, 4000, 8000, 16000, 32000],
        useRetryAfterHeader: true
    },
    tempTimeTable: {},
    throwError: function(str){ throw str;},
    initToken: function(_id, _secret) {
        return cfgToken.getToken(_id, _secret);
    },
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
    spatialFilterNearByFn: function(lat, lng, far=200){
        //進階(Advanced) NearBy API 的空間過濾，語法不帶欄位名：nearby({Lat},{Lon},{DistanceInMeters})
        //TDX 規格最大搜尋半徑為 1000 公尺，超過時以 1000 送出
        if(far > 1000) far = 1000;
        return encodeURI('$spatialFilter=nearby(' + lat + ', ' + lng + ', ' + far + ')');
    },
    topFn: function(top, formatStr){
        top = top || 3000;
        formatStr = formatStr || 'JSON';
        return '$top=' + top + '&$format=' + formatStr;
    },
    selectFieldFn: function(str){
        if(typeof(str)=='object' && str.length){
            str = str.join(',');
        }
        return encodeURI('$select=' + str);
    },
    GetAuthorizationHeaderTDX: function(){

        var GMTString = new Date().toGMTString();
        var Authorization = 'Bearer ' + cfgToken.token;

        return { 'Authorization': Authorization, 'X-Date': GMTString};
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
        function sendOnce(onDone){
            function reqListener(xhr){ onDone(xhr.target); }
            var fm = new XMLHttpRequest();
            fm.addEventListener("load", reqListener);
            fm.addEventListener("error", reqListener);
            fm.addEventListener("abort", reqListener);
            fm.addEventListener("timeout", reqListener);
            fm.open('GET', url);
            fm.timeout = ptx.timeout;
            var headerObj = ptx.GetAuthorizationHeaderTDX();
            for(var k in headerObj){
                fm.setRequestHeader(k, headerObj[k]);
            }
            fm.send();
        }
        //rate limit（429）自動重試，整個機制跑完才 callback
        runWithRateLimitRetry(sendOnce, function(isSuccess, target, retryCount){
            var event = {
                xhr: { target: target },
                data: target.response,
                retryCount: retryCount
            }
            if(isSuccess){
                event.status = common.CONST_PTX_API_SUCCESS;
                cbFn(JSON.parse(target.response), event);
            }else{
                event.status = common.CONST_PTX_API_FAIL;
                cbFn(target.response, event);
            }
        });
    },
    getPromiseURL: function(url, cfg={}){
		var paramAry = [];
		var paramPostAry = [];
        var param = cfg.param;
        cfg.method = cfg.method || 'GET';
        if (param && cfg.method == 'GET') {
			for (var k in param) {
				if (param[k]) paramAry.push(k + '=' + encodeURIComponent(param[k]));
			}
		} else if (param && cfg.method == 'POST') {
			for (var k in param) {
				if (param[k]) paramPostAry.push(k + '=' + encodeURIComponent(param[k]));
			}
		}

        return new Promise(function(resolve, reject){
            function sendOnce(onDone){
                function reqListener(xhr){ onDone(xhr.target); }
                var fm = new XMLHttpRequest();
                fm.addEventListener("load", reqListener);
                fm.addEventListener("error", reqListener);
                fm.addEventListener("abort", reqListener);
                fm.addEventListener("timeout", reqListener);

                var method = cfg.method || 'GET';
                fm.open(method, url);
                fm.timeout = cfg.timeout || ptx.timeout;
                var headerObj = cfg.head || ptx.GetAuthorizationHeaderTDX();
                for(var k in headerObj){
                    fm.setRequestHeader(k, headerObj[k]);
                }

                if (cfg.method == 'GET') {
                    fm.send();
                } else if (cfg.method == 'POST') {
                    fm.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    fm.send(paramPostAry.join('&'));
                }
            }
            //rate limit（429）自動重試，整個機制跑完才 resolve / reject
            runWithRateLimitRetry(sendOnce, function(isSuccess, target, retryCount){
                var event = {
                    xhr: { target: target },
                    url: url,
                    config: cfg,
                    resolve: resolve,
                    reject: reject,
                    response: target.response,
                    retryCount: retryCount
                }
                if(isSuccess){
                    event.status = common.CONST_PTX_API_SUCCESS;
                    event.data = JSON.parse(target.response);
                    if(typeof(cfg.processJSON) == 'function'){
                        event.data = cfg.processJSON(event.data);
                    }
                    resolve(event);
                }else{
                    event.status = common.CONST_PTX_API_FAIL;
                    reject(event);
                }
            });
        })
    },
    //通用 TDX API 呼叫器：直接依 doc/tdx_docs 規格文件的 path 與 Parameters 表打 API，不需等該 endpoint 被包成專屬模組
    //path：Swagger path，例如 '/v2/Rail/TRA/Station' 或含樣板 '/v2/Rail/TRA/ODFare/{OriginStationID}/to/{DestinationStationID}'；
    //      也可直接傳完整 http(s) URL（此時忽略 options.level / options.baseURL）
    //parameters：物件，key 對應文件 Parameters 表的 Name（path 樣板變數，或 $select/$filter/$orderby/$top/$skip/$format，
    //            也支援不帶 $ 的簡寫 select/filter/orderby/top/skip/format）；可省略；若傳入的是字串會自動 JSON.parse 成物件
    //options：{ level='basic'|'advanced'|'premium'|'historical'|'maas', baseURL, format='JSON',
    //          method='GET'|'POST', param（POST body）, timeout, head, processJSON, query（附加原始查詢字串) }
    //          同樣可省略；若傳入的是字串會自動 JSON.parse 成物件
    //回傳同 getPromiseURL 的 resolve 值（res.data 為解析後的 JSON）
    //範例：await rocptx.req('/v2/Rail/TRA/ODFare/{OriginStationID}/to/{DestinationStationID}', {OriginStationID:'1000', DestinationStationID:'1020', top:10})
    req: async function(path, parameters, options){
        var built = buildReqURL(path, parameters, options);//parameters / options 若為 JSON 字串會在這裡自動轉成物件
        options = built.options;
        return ptx.getPromiseURL(built.url, {
            method: options.method || 'GET',
            timeout: options.timeout,
            head: options.head,
            param: options.param,
            processJSON: options.processJSON
        });
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
defineObj();

export default ptx;

