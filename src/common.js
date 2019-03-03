
var CM = {
    inBrowser: !!(typeof(window)!='undefined' && window.document),
    clone: function(objA){return JSON.parse(JSON.stringify(objA));}
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

