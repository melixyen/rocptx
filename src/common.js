
var CM = {
    defaultCrossDayTime: '04:00',
    timeHour: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
    timeMinSec: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29',
        '30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
    weekStringAry: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    inBrowser: !!(typeof(window)!='undefined' && window.document),
    clone: function(objA){return JSON.parse(JSON.stringify(objA));},
    findArrayTarget: function(ary, testFn){
        for(var i=0; i<ary.length; i++){
            if(testFn(ary[i])){
                return ary[i];
            }
        }
    },
    findAllArrayarget: function(ary, testFn){
        var rt = [];
        for(var i=0; i<ary.length; i++){
            if(testFn(ary[i])){
                rt.push(ary[i]);
            }
        }
        return rt;
    },
    weekArray2WeekStr: function(week){
        return week.map((c,i)=>{return (c) ? i : '';}).join('');
    },
    transTime2Sec: function(str,offsetTomorrow){
        if (str == null || str == '') {
            str = '0';
        }
        var aryA = str.split(':'), rt;
        if (aryA.length <= 1) {
            rt = parseInt(str,10);
        } else if (aryA.length == 2) {
            rt = parseInt(aryA[0],10) * 3600 + parseInt(aryA[1],10) * 60;
        } else if (aryA.length == 3) {
            rt = parseInt(aryA[0],10) * 3600 + parseInt(aryA[1],10) * 60 + parseInt(aryA[2],10);
        }
        
        if(offsetTomorrow && rt < this.transTime2Sec(this.defaultCrossDayTime)){
            rt = rt + 86400;
        }
        return rt;
    },
    transSec2Time: function(sec, doNotTransOver24){
        var tih = 0,
            tim = 0,
            tis = 0;

        if((sec === '')){
            return '';
        }else if(parseInt(sec,10) < 0){
            sec = 86400 + sec;
        }else if(parseInt(sec)>=86400 && !doNotTransOver24){
            sec = sec - 86400;
        }
        
        sec = parseInt(sec,10);
        tis = sec % 60;
        sec = sec - tis;
        sec = sec / 60;
        tim = sec % 60;
        sec = sec - tim;
        sec = sec / 60
        tih = sec;
        

        tih = (tih < 10) ? '0' + tih : tih;
        tim = (tim < 10) ? '0' + tim : tim;
        tis = (tis < 10) ? '0' + tis : tis;

        return tih + ':' + tim;
    }
}

CM.statusCode = {
    SUCCESS: 'success',
    FAIL: 'fail'
}
CM.CONST_PTX_API_SUCCESS = CM.statusCode.SUCCESS;
CM.CONST_PTX_API_FAIL = CM.statusCode.FAIL;
CM.CONST_PTX_API_MSG_COMM_FAILED = 'Communication failed, no response. (通訊失敗，PTX 無法取回資料。)';
CM.v2url = 'https://ptx.transportdata.tw/MOTC/v2';
CM.ptxURL = CM.v2url;
CM.metroURL = CM.ptxURL + '/Rail/Metro';
CM.busURL = CM.ptxURL + '/Bus'
CM.traURL = '/Rail/TRA';
CM.ptxMRTWeekStr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
CM.defaultCrossDayTimeSec = CM.transTime2Sec(CM.defaultCrossDayTime);


CM.pui = {
    printStatus: function(){
        if(typeof(TT)=='object' && TT.ui && TT.ui.printStatus){ TT.ui.printStatus.apply(TT.ui, arguments); }
    },
    msg: {
        show: function(){if(typeof(TT)=='object' && TT.ui && TT.ui.msg && TT.ui.msg.show){ TT.ui.msg.show.apply(TT.ui, arguments); }},
        alert: function(){if(typeof(TT)=='object' && TT.ui && TT.ui.msg && TT.ui.msg.alert){ TT.ui.msg.alert.apply(TT.ui, arguments); }}
    },
    mask: function(){
        if(typeof(TT)=='object' && TT.ui && TT.ui.mask){ TT.ui.mask.apply(TT.ui, arguments); }
    },
    unmask: function(){
        if(typeof(TT)=='object' && TT.ui && TT.ui.unmask){ TT.ui.unmask.apply(TT.ui, arguments); }
    }
}



export default CM;

