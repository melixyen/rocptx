var pData = {
    sect_ary: ['pingdong','kaohsiung','tainan','chiayi','yunlin','changhua','taichung','miaoli','hsinchu','taoyuan','taipei','keelung',
                'northeast','yilan','beihui','hualian','taidong'
    ],
    bus: {
        city: [
            {name:'臺北市', City:'Taipei', CityCode:'TPE'},
            {name:'新北市', City:'NewTaipei', CityCode:'NWT'},
            {name:'桃園市', City:'Taoyuan', CityCode:'TAO'},
            {name:'臺中市', City:'Taichung', CityCode:'TXG'},
            {name:'臺南市', City:'Tainan', CityCode:'TNN'},
            {name:'高雄市', City:'Kaohsiung', CityCode:'KHH'},
            {name:'基隆市', City:'Keelung', CityCode:'KEE'},
            {name:'新竹市', City:'Hsinchu', CityCode:'HSZ'},
            {name:'新竹縣', City:'HsinchuCounty', CityCode:'HSQ'},
            {name:'苗栗縣', City:'MiaoliCounty', CityCode:'MIA'},
            {name:'彰化縣', City:'ChanghuaCounty', CityCode:'CHA'},
            {name:'南投縣', City:'NantouCounty', CityCode:'NAN'},
            {name:'雲林縣', City:'YunlinCounty', CityCode:'YUN'},
            {name:'嘉義縣', City:'ChiayiCounty', CityCode:'CYQ'},
            {name:'嘉義市', City:'Chiayi', CityCode:'CYI'},
            {name:'屏東縣', City:'PingtungCounty', CityCode:'PIF'},
            {name:'宜蘭縣', City:'YilanCounty', CityCode:'ILA'},
            {name:'花蓮縣', City:'HualienCounty', CityCode:'HUA'},
            {name:'臺東縣', City:'TaitungCounty', CityCode:'TTT'},
            {name:'金門縣', City:'KinmenCounty', CityCode:'KIN'},
            {name:'澎湖縣', City:'PenghuCounty', CityCode:'PEN'},
            {name:'連江縣', City:'LienchiangCounty', CityCode:'LIE'}
        ]
    },
    trtc: {
        station_ary: [
            //Bannan Line
            {id:"trtc_031", StationID:["BL23","BR24"]},
            {id:"trtc_097", StationID:["BL22"]},
            {id:"trtc_096", StationID:["BL21"]},
            {id:"trtc_095", StationID:["BL20"]},
            {id:"trtc_094", StationID:["BL19"]},
            {id:"trtc_093", StationID:["BL18"]},
            {id:"trtc_092", StationID:["BL17"]},
            {id:"trtc_091", StationID:["BL16"]},
            {id:"trtc_010", StationID:["BL15","BR10"]},
            {id:"trtc_089", StationID:["BL14","O07"]},
            {id:"trtc_088", StationID:["BL13"]},
            {id:"trtc_086", StationID:["BL11","G12"]},
            {id:"trtc_085", StationID:["BL10"]},
            {id:"trtc_084", StationID:["BL09"]},
            {id:"trtc_083", StationID:["BL08"]},
            {id:"trtc_082", StationID:["BL07"]},
            {id:"trtc_081", StationID:["BL06"]},
            {id:"trtc_080", StationID:["BL05"]},
            {id:"trtc_079", StationID:["BL04"]},
            {id:"trtc_078", StationID:["BL03"]},
            {id:"trtc_077", StationID:["BL02"]},
            {id:"trtc_076", StationID:["BL01"]},
            //TamsuiXinyi Line
            {id:"trtc_071", StationID:["R28"]},
            {id:"trtc_070", StationID:["R27"]},
            {id:"trtc_069", StationID:["R26"]},
            {id:"trtc_068", StationID:["R25"]},
            {id:"trtc_067", StationID:["R24"]},
            {id:"trtc_066", StationID:["R23"]},
            {id:"trtc_064", StationID:["R22"]},
            {id:"trtc_063", StationID:["R21"]},
            {id:"trtc_062", StationID:["R20"]},
            {id:"trtc_061", StationID:["R19"]},
            {id:"trtc_060", StationID:["R18"]},
            {id:"trtc_059", StationID:["R17"]},
            {id:"trtc_058", StationID:["R16"]},
            {id:"trtc_057", StationID:["R15"]},
            {id:"trtc_056", StationID:["R14"]},
            {id:"trtc_055", StationID:["R13","O11"]},
            {id:"trtc_054", StationID:["R12"]},
            {id:"trtc_053", StationID:["R11","G14"]},
            {id:"trtc_051", StationID:["R10","BL12"]},
            {id:"trtc_050", StationID:["R09"]},
            {id:"trtc_134", StationID:["R07","O06"]},
            {id:"trtc_103", StationID:["R06"]},
            {id:"trtc_011", StationID:["R05","BR09"]},
            {id:"trtc_101", StationID:["R04"]},
            {id:"trtc_100", StationID:["R03"]},
            {id:"trtc_099", StationID:["R02"]},
            //ZhongHeXinLu Line
            {id:"trtc_048", StationID:["O01"]},
            {id:"trtc_047", StationID:["O02"]},
            {id:"trtc_046", StationID:["O03"]},
            {id:"trtc_045", StationID:["O04"]},
            {id:"trtc_131", StationID:["O09"]},
            {id:"trtc_130", StationID:["O10"]},
            {id:"trtc_128", StationID:["O12"]},
            {id:"trtc_127", StationID:["O13"]},
            {id:"trtc_126", StationID:["O14"]},
            {id:"trtc_125", StationID:["O15"]},
            {id:"trtc_124", StationID:["O16"]},
            {id:"trtc_123", StationID:["O17"]},
            {id:"trtc_122", StationID:["O18"]},
            {id:"trtc_121", StationID:["O19"]},
            {id:"trtc_180", StationID:["O20"]},
            {id:"trtc_179", StationID:["O21"]},
            {id:"trtc_178", StationID:["O50"]},
            {id:"trtc_177", StationID:["O51"]},
            {id:"trtc_176", StationID:["O52"]},
            {id:"trtc_175", StationID:["O53"]},
            {id:"trtc_174", StationID:["O54"]},
            //SongShanXinDian Line
            {id:"trtc_111", StationID:["G19"]},
            {id:"trtc_110", StationID:["G18"]},
            {id:"trtc_109", StationID:["G17"]},
            {id:"trtc_009", StationID:["G16","BR11"]},
            {id:"trtc_132", StationID:["G15","O08"]},
            {id:"trtc_105", StationID:["G13"]},
            {id:"trtc_043", StationID:["G11"]},
            {id:"trtc_042", StationID:["G10","R08"]},
            {id:"trtc_041", StationID:["G09","O05"]},
            {id:"trtc_040", StationID:["G08"]},
            {id:"trtc_039", StationID:["G07"]},
            {id:"trtc_038", StationID:["G06"]},
            {id:"trtc_037", StationID:["G05"]},
            {id:"trtc_036", StationID:["G04"]},
            {id:"trtc_035", StationID:["G03"]},
            {id:"trtc_034", StationID:["G02"]},
            {id:"trtc_033", StationID:["G01"]}
        ],
        line: [{
            id: 'trtc_1',
            LineID: 'BR',
            route: [{
                dir: 0,
                Direction: 0,
                work: [{RouteID: 'BR-1', from: 'BR01', to: 'BR24'}]
            }, {
                dir: 1,
                Direction: 1,
                work: [{RouteID: 'BR-1', from: 'BR24', to: 'BR01'}]
            }]
        }, {
            id: 'trtc_2',
            LineID: 'R',
            route: [{
                dir: 0,
                Direction: 0,
                work: [{RouteID: 'R-1', from: 'R02', to: 'R28'}, {RouteID: 'R-2', from: 'R05', to: 'R22'}]
            }, {
                dir: 1,
                Direction: 1,
                work: [{RouteID: 'R-1', from: 'R28', to: 'R02'}, {RouteID: 'R-2', from: 'R22', to: 'R05'}]
            }]
        }, {
            id: 'trtc_3',
            LineID: 'G',
            route: [{
                dir: 0,
                Direction: 0,
                work: [{RouteID: 'G-1', from: 'G01', to: 'G19'}, {RouteID: 'G-2', from: 'G08', to: 'G19'}]
            }, {
                dir: 1,
                Direction: 1,
                work: [{RouteID: 'G-1', from: 'G19', to: 'G01'}, {RouteID: 'G-2', from: 'G19', to: 'G08'}]
            }]
        }, {
            id: 'trtc_4',
            LineID: 'O',
            route: [{
                dir: 0,
                Direction: 0,
                work: [{RouteID: 'O-1', from: 'O01', to: 'O21'}, {RouteID: 'O-2', from: 'O01', to: 'O54'}]
            }, {
                dir: 1,
                Direction: 1,
                work: [{RouteID: 'O-1', from: 'O21', to: 'O01'}, {RouteID: 'O-2', from: 'O54', to: 'O01'}]
            }]
        }, {
            id: 'trtc_5',
            LineID: 'BL',
            route: [{
                dir: 0,
                Direction: 0,
                work: [{RouteID: 'BL-1', from: 'BL01', to: 'BL23'}, {RouteID: 'BL-2', from: 'BL05', to: 'BL23'}]
            }, {
                dir: 1,
                Direction: 1,
                work: [{RouteID: 'BL-1', from: 'BL23', to: 'BL01'}, {RouteID: 'BL-2', from: 'BL23', to: 'BL05'}]
            }]
        }]
    },
    tymetro: {
        defined: {
            "CarClass": [
                {"id": "directly", "name": "直達車", "ename": "Express", "color": "#A1A"},
                {"id": "normal", "name": "普通車", "ename": "Local", "color": "#33F"}
            ]
        },
        sect_ary: ['taoyuan','taipei'],
        station_ary: [
            //Airport Line
            {id:"A1", name: "臺北車站", estring: "taipeichezhantaipeimainstation", sect: 'taipei', big: 'd'},
            {id:"A2", name: "三重", estring: "sanchong", sect: 'taipei'},
            {id:"A3", name: "新北產業園區", estring: "xinbeichanyeyuanqui", sect: 'taipei', big: 'd'},
            {id:"A4", name: "新莊副都心", estring: "xinzhungfuduxin", sect: 'taipei'},
            {id:"A5", name: "泰山", estring: "taishan", sect: 'taipei'},
            {id:"A6", name: "泰山貴和", estring: "taishanguehe", sect: 'taipei'},
            {id:"A7", name: "體育大學", estring: "tiyvdaxue", sect: 'taipei'},
            {id:"A8", name: "長庚醫院", estring: "changgengyiyuan", sect: 'taoyuan', big: 'd'},
            {id:"A9", name: "林口", estring: "linkou", sect: 'taoyuan'},
            {id:"A10", name: "山鼻", estring: "shanbi", sect: 'taoyuan'},
            {id:"A11", name: "坑口", estring: "kengkou", sect: 'taoyuan'},
            {id:"A12", name: "機場第一航廈", estring: "terminal1", sect: 'taoyuan', big: 'd'},
            {id:"A13", name: "機場第二航廈", estring: "terminal2", sect: 'taoyuan', big: 'd'},
            {id:"A14a", name: "機場旅館", estring: "airporthotel", sect: 'taoyuan'},
            {id:"A15", name: "大園", estring: "dayuan", sect: 'taoyuan'},
            {id:"A16", name: "橫山", estring: "hengshan", sect: 'taoyuan'},
            {id:"A17", name: "領航", estring: "linghang", sect: 'taoyuan'},
            {id:"A18", name: "高鐵桃園站", estring: "gaotietaoyuanzhan", sect: 'taoyuan'},
            {id:"A19", name: "桃園體育園區", estring: "taoyuantiyuyuanqui", sect: 'taoyuan'},
            {id:"A20", name: "興南", estring: "xingnan", sect: 'taoyuan'},
            {id:"A21", name: "環北", estring: "huanbei", sect: 'taoyuan'}
        ],
        line: [
            {
                id: "tymetro_1",
                name: "機場捷運",
                trainSect: ["taipei", "taoyuan"],
                color: "#8e47ad",
                dir: "1",
                station: ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14a","A15","A16","A17","A18","A19","A20","A21"]
            }
        ]
    },
    tra: {
        "CarClass": [
            {"id": "1100", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "1101", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "1102", "code": 1, "name": "太魯閣號", "ename": "Tze-Chiang Limited Express(Tarko)", "color": "#FD8A10"},
            {"id": "1103", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "1106", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "1107", "code": 2, "name": "普悠瑪號", "ename": "Tze-Chiang Limited Express(Puyuma)", "color": "#ff0030"},
            {"id": "1108", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "1109", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "110A", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "110B", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "110C", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "110D", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "110E", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "110F", "code": 3, "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
            {"id": "1110", "code": 4, "name": "莒光號", "ename": "Chu-Kuang Express", "color": "#ff1070"},
            {"id": "1111", "code": 4, "name": "莒光號", "ename": "Chu-Kuang Express", "color": "#ff1070"},
            {"id": "1114", "code": 4, "name": "莒光號", "ename": "Chu-Kuang Express", "color": "#ff1070"},
            {"id": "1115", "code": 4, "name": "莒光號", "ename": "Chu-Kuang Express", "color": "#ff1070"},
            {"id": "1120", "code": 5, "name": "復興號", "ename": "Fu-Hsing Semi Express", "color": "#32CFBC"},
            {"id": "1130", "code": 6, "name": "電車號", "ename": "Electric Multiple Unit"},
            {"id": "1131", "code": 6, "name": "區間車", "ename": "Local Train", "color": "#0D46A2"},
            {"id": "1132", "code": 6, "name": "區間快", "ename": "Fast Local Train", "color": "#32CFBC"},
            {"id": "1140", "code": 7, "name": "普快車", "ename": "Ordinary train"},
            {"id": "1141", "code": 7, "name": "柴快車", "ename": "Disel Rail Car"},
            {"id": "1150", "code": 7, "name": "柴油車", "ename": "na"}
        ],
        station_ary: [//big: e for big station of east(dongbu), w for big station of west(xibu), s for south link(nanhuei)
            {id:"1001", v3id:"0900", name: "基隆", estring: "keelung", sect: "keelung"},
            {id:"1029", v3id:"0910", name: "三坑", estring: "sankeng", sect: "keelung"},
            {id:"1002", v3id:"0920", name: "八堵", estring: "badu", sect: "keelung", big: 'e'},
            {id:"1003", v3id:"0930", name: "七堵", estring: "qidu", sect: "keelung", big: 'ew'},
            {id:"1030", v3id:"0940", name: "百福", estring: "baifu", sect: "keelung"},
            {id:"1004", v3id:"0950", name: "五堵", estring: "wudu", sect: "taipei"},
            {id:"1005", v3id:"0960", name: "汐止", estring: "xizhisijhih", sect: "taipei"},
            {id:"1031", v3id:"0970", name: "汐科", estring: "xikesike", sect: "taipei"},
            {id:"1006", v3id:"0980", name: "南港", estring: "nangang", sect: "taipei"},
            {id:"1007", v3id:"0990", name: "松山", estring: "songshan", sect: "taipei", big: 'ew', bigMaster: true},
            {id:"1008", v3id:"1000", name: "台北", estring: "taipeitaibei", sect: "taipei", big: 'ew', bigMaster: true},
            {id:"1009", v3id:"1010", name: "萬華", estring: "wanhua", sect: "taipei"},
            {id:"1011", v3id:"1020", name: "板橋", estring: "banqiao", sect: "taipei", big: 'ew', bigMaster: true},
            {id:"1032", v3id:"1030", name: "浮洲", estring: "fuzhou", sect: "taipei"},
            {id:"1012", v3id:"1040", name: "樹林", estring: "shulin", sect: "taipei", big: 'e'},
            {id:"1034", v3id:"1050", name: "南樹林", estring: "nanshulin", sect: "taipei"},
            {id:"1013", v3id:"1060", name: "山佳", estring: "shanjia", sect: "taipei"},
            {id:"1014", v3id:"1070", name: "鶯歌", estring: "yingge", sect: "taipei"},
            {id:"1015", v3id:"1080", name: "桃園", estring: "taoyuan", sect: "taoyuan", big: 'w'},
            {id:"1016", v3id:"1090", name: "內壢", estring: "neili", sect: "taoyuan"},
            {id:"1017", v3id:"1100", name: "中壢", estring: "zhongli", sect: "taoyuan", big: 'w'},
            {id:"1018", v3id:"1110", name: "埔心", estring: "puxin", sect: "taoyuan"},
            {id:"1019", v3id:"1120", name: "楊梅", estring: "yangmei", sect: "taoyuan"},
            {id:"1020", v3id:"1130", name: "富岡", estring: "fugan", sect: "taoyuan"},
            {id:"1036", v3id:"1140", name: "新富", estring: "xinfu", sect: "taoyuan"},
            {id:"1033", v3id:"1150", name: "北湖", estring: "beihu", sect: "hsinchu"},
            {id:"1021", v3id:"1160", name: "湖口", estring: "hukou", sect: "hsinchu"},
            {id:"1022", v3id:"1170", name: "新豐", estring: "xinfeng", sect: "hsinchu"},
            {id:"1023", v3id:"1180", name: "竹北", estring: "zhubei", sect: "hsinchu"},
            {id:"1024", v3id:"1190", name: "北新竹", estring: "northhsinchubeixinzhu", sect: "hsinchu"},
            {id:"1025", v3id:"1210", name: "新竹", estring: "hsinchuxinzhu", sect: "hsinchu", big: 'w'},
            {id:"1035", v3id:"1220", name: "三姓橋", estring: "sanxingqiao", sect: "hsinchu"},
            {id:"1026", v3id:"1230", name: "香山", estring: "xiangshan", sect: "hsinchu"},
            {id:"1027", v3id:"1240", name: "崎頂", estring: "jidingciding", sect: "hsinchu"},
            {id:"1028", v3id:"1250", name: "竹南", estring: "zhunan", sect: "hsinchu", big: 'w'},
            {id:"1302", v3id:"3140", name: "造橋", estring: "zaoqiao", sect: "miaoli"},
            {id:"1304", v3id:"3150", name: "豐富", estring: "fengfu", sect: "miaoli"},
            {id:"1305", v3id:"3160", name: "苗栗", estring: "miaoli", sect: "miaoli", big: 'w'},
            {id:"1307", v3id:"3170", name: "南勢", estring: "nanshi", sect: "miaoli"},
            {id:"1308", v3id:"3180", name: "銅鑼", estring: "tongluo", sect: "miaoli"},
            {id:"1310", v3id:"3190", name: "三義", estring: "sanyi", sect: "miaoli"},
            {id:"1314", v3id:"3210", name: "泰安", estring: "taian", sect: "miaoli"},
            {id:"1315", v3id:"3220", name: "后里", estring: "houli", sect: "taichung"},
            {id:"1317", v3id:"3230", name: "豐原", estring: "fengyuan", sect: "taichung", big: 'w'},
            {id:"1325", v3id:"3240", name: "栗林", estring: "lilin", sect: "taichung"},
            {id:"1318", v3id:"3250", name: "潭子", estring: "tanzi", sect: "taichung"},
            {id:"1326", v3id:"3260", name: "頭家厝", estring: "toujiacuo", sect: "taichung"},
            {id:"1327", v3id:"3270", name: "松竹", estring: "toujiacuo", sect: "songzhu"},
            {id:"1323", v3id:"3280", name: "太原", estring: "taiyuan", sect: "taichung"},
            {id:"1328", v3id:"3290", name: "精武", estring: "jingwu", sect: "taichung"},
            {id:"1319", v3id:"3300", name: "台中", estring: "taizhongtaichung", sect: "taichung", big: 'w'},
            {id:"1329", v3id:"3310", name: "五權", estring: "wuquan", sect: "taichung"},
            {id:"1322", v3id:"3320", name: "大慶", estring: "daqing", sect: "taichung"},
            {id:"1320", v3id:"3330", name: "烏日", estring: "wuri", sect: "taichung"},
            {id:"1324", v3id:"3340", name: "新烏日", estring: "xinwuri", sect: "taichung"},
            {id:"1321", v3id:"3350", name: "成功", estring: "chenggong", sect: "taichung"},
            {id:"1120", v3id:"3360", name: "彰化", estring: "zhanghuachanghua", sect: "changhua", big: 'w'},
            {id:"1202", v3id:"3370", name: "花壇", estring: "huatan", sect: "changhua"},
            {id:"1240", v3id:"3380", name: "大村", estring: "dacundatsun", sect: "changhua"},
            {id:"1203", v3id:"3390", name: "員林", estring: "yuanlin", sect: "changhua", big: 'w'},
            {id:"1204", v3id:"3400", name: "永靖", estring: "yongjing", sect: "changhua"},
            {id:"1205", v3id:"3410", name: "社頭", estring: "shetou", sect: "changhua"},
            {id:"1206", v3id:"3420", name: "田中", estring: "tianzhong", sect: "changhua"},
            {id:"1207", v3id:"3430", name: "二水", estring: "ershuei", sect: "changhua"},
            {id:"1208", v3id:"3450", name: "林內", estring: "linnei", sect: "yunlin"},
            {id:"1209", v3id:"3460", name: "石榴", estring: "shilioushihliou", sect: "yunlin"},
            {id:"1210", v3id:"3470", name: "斗六", estring: "douliou", sect: "yunlin", big: 'w'},
            {id:"1211", v3id:"3480", name: "斗南", estring: "dounan", sect: "yunlin"},
            {id:"1212", v3id:"3490", name: "石龜", estring: "shigueishihguei", sect: "yunlin"},
            {id:"1213", v3id:"4050", name: "大林", estring: "dalin", sect: "yunlin"},
            {id:"1214", v3id:"4060", name: "民雄", estring: "minxiong", sect: "chiayi"},
            {id:"1241", v3id:"4070", name: "嘉北", estring: "jiabei", sect: "chiayi"},
            {id:"1215", v3id:"4080", name: "嘉義", estring: "jiayichiayi", sect: "chiayi", big: 'w'},
            {id:"1217", v3id:"4090", name: "水上", estring: "shueishang", sect: "chiayi"},
            {id:"1218", v3id:"4100", name: "南靖", estring: "nanjing", sect: "chiayi"},
            {id:"1219", v3id:"4110", name: "後壁", estring: "houbi", sect: "tainan"},
            {id:"1220", v3id:"4120", name: "新營", estring: "xinyingsinying", sect: "tainan", big: 'w'},
            {id:"1221", v3id:"4130", name: "柳營", estring: "liouying", sect: "tainan"},
            {id:"1222", v3id:"4140", name: "林鳳營", estring: "linfengyinglinfongying", sect: "tainan"},
            {id:"1223", v3id:"4150", name: "隆田", estring: "longtian", sect: "tainan"},
            {id:"1224", v3id:"4160", name: "拔林", estring: "balin", sect: "tainan"},
            {id:"1225", v3id:"4170", name: "善化", estring: "shanghua", sect: "tainan"},
            {id:"1244", v3id:"4180", name: "南科", estring: "nanke", sect: "tainan"},
            {id:"1226", v3id:"4190", name: "新市", estring: "xinshisinshih", sect: "tainan"},
            {id:"1227", v3id:"4200", name: "永康", estring: "yungkangyongkang", sect: "tainan"},
            {id:"1239", v3id:"4210", name: "大橋", estring: "daqiaodaciao", sect: "tainan"},
            {id:"1228", v3id:"4220", name: "台南", estring: "tainan", sect: "tainan", big: 'w'},
            {id:"1229", v3id:"4250", name: "保安", estring: "baoan", sect: "tainan"},
            {id:"1243", v3id:"4260", name: "仁德", estring: "rende", sect: "tainan"},
            {id:"1230", v3id:"4270", name: "中州", estring: "zhongzhoujhongjhou", sect: "tainan"},
            {id:"1231", v3id:"4290", name: "大湖", estring: "dahu", sect: "kaohsiung"},
            {id:"1232", v3id:"4300", name: "路竹", estring: "luzhulujhu", sect: "kaohsiung"},
            {id:"1233", v3id:"4310", name: "岡山", estring: "ganshan", sect: "kaohsiung", big: 'w'},
            {id:"1234", v3id:"4320", name: "橋頭", estring: "qiaotou", sect: "kaohsiung"},
            {id:"1235", v3id:"4330", name: "楠梓", estring: "nanzi", sect: "kaohsiung"},
            {id:"1242", v3id:"4340", name: "新左營", estring: "xingzouying", sect: "kaohsiung", big: 's'},
            {id:"1236", v3id:"4350", name: "左營", estring: "zouying", sect: "kaohsiung"},
            {id:"1245", v3id:"4360", name: "內惟", estring: "neiwei", sect: "kaohsiung"},
            {id:"1246", v3id:"4370", name: "美術館", estring: "meishuguanmuseumoffinearts", sect: "kaohsiung"},
            {id:"1237", v3id:"4380", name: "鼓山", estring: "gushan", sect: "kaohsiung"},
            {id:"1247", v3id:"4390", name: "三塊厝", estring: "sankuaicuo", sect: "kaohsiung"},
            {id:"1238", v3id:"4400", name: "高雄", estring: "kaohsiunggaoxung", sect: "kaohsiung", big: 'ws'},
            {id:"1419", v3id:"4410", name: "民族", estring: "mingzhu", sect: "kaohsiung"},
            {id:"1420", v3id:"4420", name: "科工館", estring: "kegongguanscienceandtecnologymuseum", sect: "kaohsiung"},
            {id:"1421", v3id:"4430", name: "正義", estring: "zhengyi", sect: "kaohsiung"},
            {id:"1402", v3id:"4440", name: "鳳山", estring: "fongshanfengshan", sect: "kaohsiung"},
            {id:"1403", v3id:"4450", name: "後庄", sect: "kaohsiung"},
            {id:"1404", v3id:"4460", name: "九曲堂", sect: "kaohsiung"},
            {id:"1405", v3id:"4470", name: "六塊厝", sect: "pingdong"},
            {id:"1406", v3id:"5000", name: "屏東", estring: "pingtungpingdong", sect: "pingdong", big: 'ws', noShow: true},
            {id:"1407", v3id:"5010", name: "歸來", sect: "pingdong"},
            {id:"1408", v3id:"5020", name: "麟洛", sect: "pingdong"},
            {id:"1409", v3id:"5030", name: "西勢", sect: "pingdong"},
            {id:"1410", v3id:"5040", name: "竹田", sect: "pingdong"},
            {id:"1411", v3id:"5050", name: "潮州", estring: "chaozhouchaojhou", sect: "pingdong", big: 'ws', noShow: true},
            {id:"1412", v3id:"5060", name: "崁頂", sect: "pingdong"},
            {id:"1413", v3id:"5070", name: "南州", sect: "pingdong"},
            {id:"1414", v3id:"5080", name: "鎮安", sect: "pingdong"},
            {id:"1415", v3id:"5090", name: "林邊", sect: "pingdong"},
            {id:"1416", v3id:"5100", name: "佳冬", sect: "pingdong"},
            {id:"1417", v3id:"5110", name: "東海", sect: "pingdong"},
            {id:"1418", v3id:"5120", name: "枋寮", sect: "pingdong"},
            {id:"1802", v3id:"7390", name: "暖暖", estring: "nuannuan", sect: "northeast"},
            {id:"1803", v3id:"7380", name: "四腳亭", estring: "sijiaoting", sect: "northeast"},
            {id:"1804", v3id:"7360", name: "瑞芳", estring: "ruifang", sect: "northeast", big: 'e'},
            {id:"1805", v3id:"7350", name: "猴硐", estring: "houdong", sect: "northeast"},
            {id:"1806", v3id:"7330", name: "三貂嶺", estring: "sandiaoling", sect: "northeast"},
            {id:"1807", v3id:"7320", name: "牡丹", estring: "mudan", sect: "northeast"},
            {id:"1808", v3id:"7310", name: "雙溪", estring: "shuangxi", sect: "northeast"},
            {id:"1809", v3id:"7300", name: "貢寮", estring: "gongliao", sect: "northeast"},
            {id:"1810", v3id:"7290", name: "福隆", estring: "fulong", sect: "northeast"},
            {id:"1811", v3id:"7280", name: "石城", estring: "shicheng", sect: "yilan"},
            {id:"1812", v3id:"7270", name: "大里", estring: "dali", sect: "yilan"},
            {id:"1813", v3id:"7260", name: "大溪", estring: "daxidasi", sect: "yilan"},
            {id:"1814", v3id:"7250", name: "龜山", estring: "gueishan", sect: "yilan"},
            {id:"1815", v3id:"7240", name: "外澳", estring: "waiao", sect: "yilan"},
            {id:"1816", v3id:"7230", name: "頭城", estring: "toucheng", sect: "yilan", big: 'e'},
            {id:"1817", v3id:"7220", name: "頂埔", estring: "dingpu", sect: "yilan"},
            {id:"1818", v3id:"7210", name: "礁溪", estring: "jiaoxijiaohsi", sect: "yilan"},
            {id:"1819", v3id:"7200", name: "四城", estring: "sicheng", sect: "yilan"},
            {id:"1820", v3id:"7190", name: "宜蘭", estring: "yilan", sect: "yilan", big: 'e'},
            {id:"1821", v3id:"7180", name: "二結", estring: "erjie", sect: "yilan"},
            {id:"1822", v3id:"7170", name: "中里", estring: "zhongli", sect: "yilan"},
            {id:"1823", v3id:"7160", name: "羅東", estring: "luodong", sect: "yilan", big: 'e'},
            {id:"1824", v3id:"7150", name: "冬山", estring: "dongshan", sect: "yilan"},
            {id:"1825", v3id:"7140", name: "新馬", estring: "xinmasinma", sect: "yilan"},
            {id:"1826", v3id:"7130", name: "蘇澳新", estring: "suaoxinsuaosin", sect: "yilan", big: 'e'},
            {id:"1827", v3id:"7120", name: "蘇澳", estring: "suao", sect: "yilan"},
            {id:"1703", v3id:"7110", name: "永樂", estring: "yongle", sect: "beihui"},
            {id:"1704", v3id:"7100", name: "東澳", estring: "dongao", sect: "beihui"},
            {id:"1705", v3id:"7090", name: "南澳", estring: "nanao", sect: "beihui", big: 'e'},
            {id:"1706", v3id:"7080", name: "武塔", estring: "wuta", sect: "beihui"},
            {id:"1708", v3id:"7070", name: "漢本", estring: "hanben", sect: "beihui"},
            {id:"1709", v3id:"7060", name: "和平", estring: "heping", sect: "beihui"},
            {id:"1710", v3id:"7050", name: "和仁", estring: "heren", sect: "beihui"},
            {id:"1711", v3id:"7040", name: "崇德", estring: "chongde", sect: "hualian"},
            {id:"1712", v3id:"7030", name: "新城", estring: "xinchengsincheng", sect: "hualian"},
            {id:"1713", v3id:"7020", name: "景美", estring: "jingmei", sect: "hualian"},
            {id:"1714", v3id:"7010", name: "北埔", estring: "beipu", sect: "hualian"},
            {id:"1715", v3id:"7000", name: "花蓮", estring: "hualienhualian", sect: "hualian", big: 'e'},//sect:hualian
            {id:"1602", v3id:"6250", name: "吉安", estring: "jian", sect: "hualian"},
            {id:"1604", v3id:"6240", name: "志學", estring: "zhixue", sect: "hualian"},
            {id:"1605", v3id:"6230", name: "平和", estring: "pinghe", sect: "hualian"},
            {id:"1606", v3id:"6220", name: "壽豐", estring: "shoufeng", sect: "hualian"},
            {id:"1607", v3id:"6210", name: "豐田", estring: "fengtian", sect: "hualian"},
            {id:"1608", v3id:"6200", name: "林榮新光", estring: "lingrongzinguanglingrongshinkong", sect: "hualian"},
            {id:"1609", v3id:"6190", name: "南平", estring: "nanping", sect: "hualian"},
            {id:"1610", v3id:"6180", name: "鳳林", estring: "fenglinfonglin", sect: "hualian"},
            {id:"1611", v3id:"6170", name: "萬榮", estring: "wanrong", sect: "hualian"},
            {id:"1612", v3id:"6160", name: "光復", estring: "guangfu", sect: "hualian"},
            {id:"1613", v3id:"6150", name: "大富", estring: "dafu", sect: "hualian"},
            {id:"1614", v3id:"6140", name: "富源", estring: "fuyuan", sect: "hualian"},
            {id:"1616", v3id:"6130", name: "瑞穗", estring: "ruisui", sect: "hualian"},
            {id:"1617", v3id:"6120", name: "三民", estring: "sanmin", sect: "hualian"},
            {id:"1619", v3id:"6110", name: "玉里", estring: "yuli", sect: "hualian", big: 'e'},
            {id:"1621", v3id:"6100", name: "東里", estring: "dongli", sect: "hualian"},
            {id:"1622", v3id:"6090", name: "東竹", estring: "dongzhu", sect: "hualian"},
            {id:"1623", v3id:"6080", name: "富里", estring: "fuli", sect: "hualian"},
            {id:"1624", v3id:"6070", name: "池上", estring: "chishang", sect: "taidong"},
            {id:"1625", v3id:"6060", name: "海端", estring: "haiduan", sect: "taidong"},
            {id:"1626", v3id:"6050", name: "關山", estring: "guanshan", sect: "taidong"},
            {id:"1628", v3id:"6040", name: "瑞和", estring: "ruihe", sect: "taidong"},
            {id:"1629", v3id:"6030", name: "瑞源", estring: "ruiyuan", sect: "taidong"},
            {id:"1630", v3id:"6020", name: "鹿野", estring: "luye", sect: "taidong"},
            {id:"1631", v3id:"6010", name: "山里", estring: "shanli", sect: "taidong"},
            {id:"1632", v3id:"6000", name: "台東", estring: "taitungtaidong", sect: "taidong", big: 'es'},
            //海線及南迴線臨時資料
            
            {id:"1102", v3id:"2110", name: "談文", sect: "miaoli"},
            {id:"1104", v3id:"2120", name: "大山", sect: "miaoli"},
            {id:"1105", v3id:"2130", name: "後龍", sect: "miaoli"},
            {id:"1106", v3id:"2140", name: "龍港", sect: "miaoli"},
            {id:"1107", v3id:"2150", name: "白沙屯", sect: "miaoli"},
            {id:"1108", v3id:"2160", name: "新埔", sect: "miaoli"},
            {id:"1109", v3id:"2170", name: "通霄", sect: "miaoli"},
            {id:"1110", v3id:"2180", name: "苑裡", sect: "miaoli"},
            {id:"1111", v3id:"2190", name: "日南", sect: "taichung"},
            {id:"1112", v3id:"2200", name: "大甲", sect: "taichung"},
            {id:"1113", v3id:"2210", name: "臺中港", sect: "taichung"},
            {id:"1114", v3id:"2220", name: "清水", sect: "taichung"},
            {id:"1115", v3id:"2230", name: "沙鹿", sect: "taichung"},
            {id:"1116", v3id:"2240", name: "龍井", sect: "taichung"},
            {id:"1117", v3id:"2250", name: "大肚", sect: "taichung"},
            {id:"1118", v3id:"2260", name: "追分", sect: "taichung"},
            
            {id:"1502", v3id:"5130", name: "加祿", sect: "pingdong"},
            {id:"1503", v3id:"5140", name: "內獅", sect: "pingdong"},
            {id:"1504", v3id:"5160", name: "枋山", sect: "pingdong"},
            {id:"1507", v3id:"5180", name: "古莊", sect: "taidong"},
            {id:"1508", v3id:"5190", name: "大武", sect: "taidong"},
            {id:"1510", v3id:"5200", name: "瀧溪", sect: "taidong"},
            {id:"1512", v3id:"5210", name: "金崙", sect: "taidong"},
            {id:"1514", v3id:"5220", name: "太麻里", sect: "taidong"},
            {id:"1516", v3id:"5230", name: "知本", sect: "taidong"},
            {id:"1517", v3id:"5240", name: "康樂", sect: "taidong"},
            //海線及南迴線臨時資料
            {id:"2003", v3id:"7362", name:"八斗子", estring:"badouzi", sect:"northeast"},
            {id:"6103", v3id:"7361", name:"海科館", estring:"haikeguan", sect:"northeast"},
            {id:"1903", v3id:"7331", name:"大華", estring:"dahua", sect:"northeast"},
            {id:"1904", v3id:"7332", name:"十分", estring:"shifenshihfen", sect:"northeast"},
            {id:"1905", v3id:"7333", name:"望古", estring:"wanggu", sect:"northeast"},
            {id:"1906", v3id:"7334", name:"嶺腳", estring:"lingjiao", sect:"northeast"},
            {id:"1907", v3id:"7335", name:"平溪", estring:"pingxipingsi", sect:"northeast"},
            {id:"1908", v3id:"7336", name:"菁桐", estring:"jingtong", sect:"northeast"},
            {id:"2212", v3id:"1191", name:"千甲", estring:"qianjia", sect:"hsinchu"},
            {id:"2213", v3id:"1192", name:"新莊", estring:"xinzhuang", sect:"hsinchu"},
            {id:"2203", v3id:"1193", name:"竹中", estring:"zhuzhong", sect:"hsinchu"},
            {id:"2214", v3id:"1194", name:"六家", estring:"liujia", sect:"hsinchu"},
            {id:"2204", v3id:"1201", name:"上員", estring:"shangyuan", sect:"hsinchu"},
            {id:"2211", v3id:"1202", name:"榮華", estring:"ronghua", sect:"hsinchu"},
            {id:"2205", v3id:"1203", name:"竹東", estring:"zhudong", sect:"hsinchu"},
            {id:"2206", v3id:"1204", name:"橫山", estring:"zhuzhong", sect:"hsinchu"},
            {id:"2207", v3id:"1205", name:"九讚頭", estring:"jiouzantou", sect:"hsinchu"},
            {id:"2208", v3id:"1206", name:"合興", estring:"hexinghesing", sect:"hsinchu"},
            {id:"2209", v3id:"1207", name:"富貴", estring:"fuguei", sect:"hsinchu"},
            {id:"2210", v3id:"1208", name:"內灣", estring:"neiwan", sect:"hsinchu"},
            {id:"2702", v3id:"3431", name:"源泉", estring:"yuanciyuanyuanquan", sect:"changhua"},
            {id:"2703", v3id:"3432", name:"濁水", estring:"zhuoshuijhoushuei", sect:"changhua"},
            {id:"2704", v3id:"3433", name:"龍泉", estring:"longquanlungcyuan", sect:"changhua"},
            {id:"2705", v3id:"3434", name:"集集", estring:"jiji", sect:"changhua"},
            {id:"2706", v3id:"3435", name:"水里", estring:"shuilishueili", sect:"changhua"},
            {id:"2707", v3id:"3436", name:"車埕", estring:"checheng", sect:"changhua"},
            {id:"5101", v3id:"4271", name:"長榮大學", estring:"changrongdaxuechangjungchristianuniversity", sect:"tainan"},
            {id:"5102", v3id:"4272", name:"沙崙", estring:"shalun", sect:"tainan"}
        ],
        line: [
            {
                LineID: 'TL-N',
                ttid: "tra_xibu",
                name: "西部幹線(基隆-竹南)",
                trainSect: ["keelung", "taipei", "taoyuan", "hsinchu"],
                color: "#000050",
                dir: "1",
                link: {
                    "YL": {station: "1002", dir: "0"},
                    "TL-M": {station: "1028", dir: "1"},
                    "TL-C": {station: "1028", dir: "1"},
                    "NW": {station: "1025", dir: "0"}
                },
                station: ["1001","1029","1002","1003","1030","1004","1005","1031","1006","1007","1008","1009","1011","1032","1012","1034","1013","1014",
                    "1015","1016","1017","1018","1019","1020","1036","1033","1021","1022","1023","1024","1025","1035","1026","1027","1028"]
            }, {
                LineID: 'TL-M',
                ttid: "tra_shan",
                name: "山線(竹南-彰化)",
                trainSect: ["hsinchu", "miaoli", "taichung", "changhua"],
                color: "#104020",
                dir: "1",
                area: 'w',
                link: {
                    "TL-N": {station: "1028", dir: "0"},
                    "TL-S": {station: "1120", dir: "1"},
                    "CZ": {station: "1321", dir: "0"}
                },
                station: ["1028","1302","1304","1305","1307","1308","1310","1314","1315","1317", "1325",
                    "1318","1326","1327","1323","1328","1319","1329","1322","1320","1324","1321","1120"]
            }, {
                LineID: 'TL-C',
                ttid: "tra_hai",
                name: "海線",
                trainSect: ["miaoli","taichung"],
                color: "#2050C0",
                dir: "1",
                area: 'w',
                link: {
                    "TL-N": {station: "1028", dir: "0"},
                    "TL-S": {station: "1120", dir: "1"},
                    "CZ": {station: "1118", dir: "1"}
                },
                station: ["1028","1102","1104","1105","1106","1107","1108","1109","1110","1111","1112","1113","1114","1115","1116","1117","1118","1120"]
            }, {
                LineID: 'CZ',
                ttid: "",
                name: "成追線",
                trainSect: ["taichung"],
                color: "#204020",
                dir: "0",
                area: 'w',
                link: {
                    "TL-M": {station: "1321", dir: "1"},
                    "TL-C": {station: "1118", dir: "0"}
                },
                station: ["1321","1118"]
            }, {
                LineID: 'TL-S',
                ttid: "tra_zhjy|tra_jygx",
                name: "西部幹線(彰化-高雄)",
                trainSect: ["changhua", "yunlin", "chiayi"],
                color: "#707010",
                dir: "1",
                area: 'w',
                link: {
                    "TL-M": {station: "1120", dir: "0"},
                    "TL-C": {station: "1120", dir: "0"},
                    "JJ": {station: "1120", dir: "1"},
                    "SH": {station: "1120", dir: "1"},
                    "PL": {station: "1238", dir: "1"}
                },
                station: ["1120","1202","1240","1203","1204","1205","1206","1207","1208","1209","1210","1211","1212","1213","1214","1241","1215",
                    "tra_1217","tra_1218","tra_1219","tra_1220","tra_1221","tra_1222","tra_1223","tra_1224","tra_1225","tra_1244","tra_1226","tra_1227","tra_1239","tra_1228",
                    "tra_1229","tra_1243","tra_1230","tra_1231","tra_1232","tra_1233","tra_1234","tra_1235","tra_1242","tra_1236","tra_1245","tra_1246","tra_1237","tra_1247","tra_1238"
                ]
            }, {
                LineID: 'PL',
                ttid: "tra_pingdong",
                name: "屏東線",
                trainSect: ["kaohsiung", "pingdong"],
                color: "#501F02",
                dir: "1",
                area: 'w',
                link: {
                    "TL-S": {station: "1238", dir: "0"},
                    "SL": {station: "1418", dir: "1"}
                },
                station: ["1238","1402","1403","1404","1405","1406","1407","1408","1409","1410","1411","1412","1413","1414","1415","1416","1417","1418"]
            }, {
                LineID: 'YL',
                ttid: "tra_yilan",
                name: "宜蘭線",
                trainSect: ["taipei", "keelung", "northeast", "yilan"],
                color: "#500000",
                dir: "0",
                area: 'e',
                link: {
                    "TL-N": {station: "1002", dir: "1"},
                    "NL": {station: "1826", dir: "0"},
                    "SA": {station: "1804", dir: "1"},
                    "PX": {station: "1806", dir: "0"}
                },
                station: ["1002","1802","1803","1804","1805","1806","1807","1808","1809","1810",//taipei
                    "1811","1812","1813","1814","1815","1816","1817","1818","1819","1820","1821","1822","1823","1824","1825","1826","1827"]
            }, {
                LineID: 'NL',
                ttid: "tra_beihui",
                name: "北迴線(蘇澳-花蓮)",
                trainSect: ["taipei", "keelung", "northeast","yilan","beihui","hualian"],
                color: "#004060",
                dir: "0",
                area: 'e',
                link: {
                    "YL": {station: "1826", dir: "1"},
                    "TT": {station: "1715", dir: "0"}
                },
                station: ["1826","1703","1704","1705","1706","1708","1709","1710","1711","1712","1713","1714","1715"]
            }, {
                LineID: 'TT',
                ttid: "tra_huadong",
                name: "台東線",
                trainSect: ["taipei", "keelung", "northeast","yilan","beihui","hualian","taidong"],
                color: "#605040",
                dir: "0",
                area: 'e',
                link: {
                    "NL": {station: "1715", dir: "1"},
                    "SL": {station: "1632", dir: "0"}
                },
                station: ["1715","1602","1604","1605","1606","1607","1609","1610","1611","1612","1613","1614","1616","1617","1619",
                    "1621","1622","1623","1624","1625","1626","1628","1629","1630","1631","1632"]
            }, {
                LineID: 'SL',
                ttid: "tra_nanhuei",
                name: "南迴線",
                trainSect: ["taidong","pingdong"],
                color: "#3040A0",
                dir: "0",
                area: 'e',
                link: {
                    "TT": {station: "1632", dir: "1"},
                    "PL": {station: "1418", dir: "0"}
                },
                station: ["1632","1517","1516","1514","1512","1510","1508","1507","1504","1503","1502","1418"]
            }, {
                LineID: 'PX',
                ttid: "tra_pingxi",
                name: "平溪線",
                trainSect: ["northeast"],
                color: "#003030",
                dir: "0",
                area: 'e',
                link: {
                    "YL": {station: "1806", dir: "0"}
                },
                station: ["1806","1903","1904","1905","1906","1907","1908"]
            }, {
                LineID: 'SA',
                ttid: "tra_pingxi",
                name: "深澳線",
                trainSect: ["northeast"],
                color: "#003030",
                dir: "0",
                area: 'e',
                link: {
                    "YL": {station: "1804", dir: "1"}
                },
                station: ["2003","6103","1804"]
            }, {
                LineID: 'NW',
                ttid: "tra_liujia",
                name: "內灣線",
                trainSect: ["hsinchu"],
                color: "#403090",
                dir: "0",
                area: 'w',
                link: {
                    "TL-N": {station: "1025", dir: "1"},
                    "LJ": {station: "2203", dir: "0"}
                },
                station: ["1025","1024","2212","2213","2203","2204","2211","2205","2206","2207","2208","2209","2210"]
            }, {
                LineID: 'LJ',
                ttid: "tra_liujia",
                name: "六家線",
                trainSect: ["hsinchu"],
                color: "#403090",
                dir: "0",
                area: 'w',
                link: {
                    "NW": {station: "2203", dir: "1"}
                },
                station: ["2203","2214"]
            }, {
                LineID: 'SH',
                ttid: "tra_shalun",
                name: "沙崙線",
                trainSect: ["tainan"],
                color: "#124060",
                dir: "1",
                area: 'w',
                protectStation: ["1230"],
                link: {
                    "TL-S": {station: "1230", dir: "0"}
                },
                station: ["1230","5101","5102"]
            }
        ],
        running_ary: [{
                id: 'eTemu', cate: 'express', CarClass: ['1107','1102'], dir: '0', area: 'e', range: ['1012','1632'], name: '東部幹線太魯閣號、普悠瑪號',
                rangeSplit: '1715',
                lineOf: ['TL-N','YL','NL','TT'],
                mustStop: ['1012', '1011', '1008', '1007', '1715', '1619', '1632'],
                maybeStop: ['1006','1003','1820','1823','1606','1610','1612','1616','1626'],
                lessStop: ['1002','1804', '1816', '1818','1712','1602','1604','1611','1623','1624','1630']
            }, {
                id: 'eZi', cate: 'express', CarClass: ['1100','1101','1103','1108','1109','110A','110B','110C','110D','110E','110F'], dir: '0', area: 'e', range: ['1012','1632'], name: '東部幹線自強號',
                rangeSplit: '1715',
                lineOf: ['TL-N','YL','NL','TT'],
                mustStop: ['1012', '1011', '1008', '1007','1820','1823', '1715', '1619', '1632'],
                maybeStop: ['1003','1804','1816','1818','1826','1705','1712','1602','1604','1611','1623','1624','1630'],
                lessStop: ['1009','1006','1005','1002','1808','1810','1709']
            }, {
                id: 'eJv', cate: 'express', CarClass: ['1110','11111','1114','1115'], dir: '0', area: 'e', range: ['1012','1632'], name: '東部幹線莒光號',
                rangeSplit: '1715',
                lineOf: ['TL-N','YL','NL','TT'],
                mustStop: ['1012', '1011', '1008', '1007','1804','1816','1818','1820','1823', '1715', '1619', '1632'],
                maybeStop: ['1005','1003','1826','1705','1712','1602','1604','1611','1623','1624','1630'],
                lessStop: ['1009','1002','1805','1808','1810','1704','1709','1607','1621','1622']
            }, {//西部對號
                id: 'wZi', cate: 'express', CarClass: ['1100','1101','1103','1108','1109','110A','110B','110C','110D','110E','110F'], dir: '1', area: 'w', range: ['1003','1411'], name: '西部幹線自強號',
                lineOf: ['TL-N','TL-M','TL-S','PL'],
                mustStop: ['1003','1007','1008','1011','1015','1017','1025','1305','1317','1319','1120','1210','1215','1228','1242','1238','1402','1406','1411'],
                maybeStop: ['1005','1028','1203','1206','1211','1220','1404'],
                lessStop: ['1006','1012','1214','1225','1227','1233']
            }, {
                id: 'wJv', cate: 'express', CarClass: ['1110','11111','1114','1115'], dir: '1', area: 'w', range: ['1003','1411'], name: '西部幹線莒光號',
                lineOf: ['TL-N','TL-C','TL-S','PL'],
                mustStop: ['1003','1005','1007','1008','1011','1012','1015','1017','1019','1021','1025','1028',
                    '1105', '1109', '1110', '1112', '1114', '1115',
                    '1120','1203','1206','1210','1211','1215','1220','1223','1225','1228','1233','1242','1238','1402','1406','1411'],
                maybeStop: ['1023','1207','1213','1214','1227','1404'],
                lessStop: ['1014','1107','1117','1214','1226','1231','1232']
            }, {//南迴線對號
                id: 'sZi', cate: 'express', CarClass: ['1100','1101','1103','1108','1109','110A','110B','110C','110D','110E','110F'], dir: '1', area: 's', range: ['1242','1632'], name: '南迴線自強號',
                lineOf: ['TL-S','PL','SL'],
                mustStop: ['1242', '1238','1402','1406','1411','1418','1508','1514','1516','1632'],
                maybeStop: ['1413','1415','1512'],
                lessStop: ['1404','1510','1517']
            }, {
                id: 'sJvFu', cate: 'express', CarClass: ['1110','11111','1114','1115','1120'], dir: '1', area: 's', range: ['1242','1632'], name: '南迴線莒光號、復興號',
                lineOf: ['TL-S','PL','SL'],
                mustStop: ['1242', '1238','1402','1406','1411','1418','1508','1512','1514','1516','1632'],
                maybeStop: ['1404','1413','1415','1510','1517'],
                lessStop: []
            }, {
                id: 'eLocal1', cate: 'local', CarClass: ['1131'], dir: '0', area: 'e', range: ['1012','1827'], name: '宜蘭線區間車', stopAll: true,
                lineOf: ['TL-N','YL']
            }, {
                id: 'eLocal2', cate: 'local', CarClass: ['1131'], dir: '0', area: 'e', range: ['1820','1715'], name: '北迴線區間車', stopAll: true,
                lineOf: ['YL','NL']
            }, {
                id: 'eLocal3', cate: 'local', CarClass: ['1131'], dir: '0', area: 'e', range: ['1715','1632'], name: '臺東線區間車', stopAll: true, maybeStop: ['1608'],//當stopAll 時 maybeStop 表示為不一定停靠
                lineOf: ['TT']
            }, {
                id: 'wLocal1', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['1001','1025'], name: '基隆新竹段區間車', stopAll: true,
                lineOf: ['TL-N']
            }, {
                id: 'wLocal2', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['1025','1120'], name: '山線區間車', stopAll: true,
                lineOf: ['TL-N','TL-M']
            }, {
                id: 'wLocal3', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['1025','1120'], name: '海線區間車', stopAll: true,
                lineOf: ['TL-N','TL-C']
            }, {
                id: 'wLocal4', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['1120','1215'], name: '彰化嘉義段區間車', stopAll: true,
                lineOf: ['TL-S']
            }, {
                id: 'wLocal5', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['1215','1411'], name: '嘉義潮州段區間車', stopAll: true,
                lineOf: ['TL-S','PL']
            }, {
                id: 'wLocal6', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['1411','1418'], name: '潮州枋寮段區間車', stopAll: true,
                lineOf: ['PL']
            }, {
                id: 'sLocal', cate: 'local', CarClass: ['1131'], dir: '1', area: 's', range: ['1418','1632'], name: '南迴線區間車', stopAll: true,
                lineOf: ['SL']
            }, {
                id: 'subPX', cate: 'local', CarClass: ['1150','1131'], dir: '0', area: 'e', range: ['2003','1908'], name: '平溪線', stopAll: true,
                lineOf: ['SA','YL','PX']
            }, {
                id: 'subLJ', cate: 'local', CarClass: ['1131'], dir: '0', area: 'w', range: ['1025','2214'], name: '六家線', stopAll: true,
                lineOf: ['NW','LJ']
            }, {
                id: 'subNW', cate: 'local', CarClass: ['1150','1131'], dir: '0', area: 'w', range: ['2203','2210'], name: '內灣線', stopAll: true,
                lineOf: ['NW']
            }, {
                id: 'subJJ', cate: 'local', CarClass: ['1150','1131'], dir: '1', area: 'w', range: ['1207','2707'], name: '集集線', stopAll: true,
                lineOf: ['JJ']
            }, {
                id: 'subSL', cate: 'local', CarClass: ['1150','1131'], dir: '1', area: 'w', range: ['1228','5102'], name: '沙崙線', stopAll: true,
                lineOf: ['TL-S','SH']
        }]
    }
}

export default pData;