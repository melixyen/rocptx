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
            {id:"1001", name: "基隆", estring: "keelung", sect: "keelung"},
            {id:"1029", name: "三坑", estring: "sankeng", sect: "keelung"},
            {id:"1002", name: "八堵", estring: "badu", sect: "keelung", big: 'e'},
            {id:"1003", name: "七堵", estring: "qidu", sect: "keelung", big: 'ew'},
            {id:"1030", name: "百福", estring: "baifu", sect: "keelung"},
            {id:"1004", name: "五堵", estring: "wudu", sect: "taipei"},
            {id:"1005", name: "汐止", estring: "xizhisijhih", sect: "taipei"},
            {id:"1031", name: "汐科", estring: "xikesike", sect: "taipei"},
            {id:"1006", name: "南港", estring: "nangang", sect: "taipei"},
            {id:"1007", name: "松山", estring: "songshan", sect: "taipei", big: 'ew', bigMaster: true},
            {id:"1008", name: "台北", estring: "taipeitaibei", sect: "taipei", big: 'ew', bigMaster: true},
            {id:"1009", name: "萬華", estring: "wanhua", sect: "taipei"},
            {id:"1011", name: "板橋", estring: "banqiao", sect: "taipei", big: 'ew', bigMaster: true},
            {id:"1032", name: "浮洲", estring: "fuzhou", sect: "taipei"},
            {id:"1012", name: "樹林", estring: "shulin", sect: "taipei", big: 'e'},
            {id:"1034", name: "南樹林", estring: "nanshulin", sect: "taipei"},
            {id:"1013", name: "山佳", estring: "shanjia", sect: "taipei"},
            {id:"1014", name: "鶯歌", estring: "yingge", sect: "taipei"},
            {id:"1015", name: "桃園", estring: "taoyuan", sect: "taoyuan", big: 'w'},
            {id:"1016", name: "內壢", estring: "neili", sect: "taoyuan"},
            {id:"1017", name: "中壢", estring: "zhongli", sect: "taoyuan", big: 'w'},
            {id:"1018", name: "埔心", estring: "puxin", sect: "taoyuan"},
            {id:"1019", name: "楊梅", estring: "yangmei", sect: "taoyuan"},
            {id:"1020", name: "富岡", estring: "fugan", sect: "taoyuan"},
            {id:"1036", name: "新富", estring: "xinfu", sect: "taoyuan"},
            {id:"1033", name: "北湖", estring: "beihu", sect: "hsinchu"},
            {id:"1021", name: "湖口", estring: "hukou", sect: "hsinchu"},
            {id:"1022", name: "新豐", estring: "xinfeng", sect: "hsinchu"},
            {id:"1023", name: "竹北", estring: "zhubei", sect: "hsinchu"},
            {id:"1024", name: "北新竹", estring: "northhsinchubeixinzhu", sect: "hsinchu"},
            {id:"1025", name: "新竹", estring: "hsinchuxinzhu", sect: "hsinchu", big: 'w'},
            {id:"1035", name: "三姓橋", estring: "sanxingqiao", sect: "hsinchu"},
            {id:"1026", name: "香山", estring: "xiangshan", sect: "hsinchu"},
            {id:"1027", name: "崎頂", estring: "jidingciding", sect: "hsinchu"},
            {id:"1028", name: "竹南", estring: "zhunan", sect: "hsinchu", big: 'w'},
            {id:"1302", name: "造橋", estring: "zaoqiao", sect: "miaoli"},
            {id:"1304", name: "豐富", estring: "fengfu", sect: "miaoli"},
            {id:"1305", name: "苗栗", estring: "miaoli", sect: "miaoli", big: 'w'},
            {id:"1307", name: "南勢", estring: "nanshi", sect: "miaoli"},
            {id:"1308", name: "銅鑼", estring: "tongluo", sect: "miaoli"},
            {id:"1310", name: "三義", estring: "sanyi", sect: "miaoli"},
            {id:"1314", name: "泰安", estring: "taian", sect: "miaoli"},
            {id:"1315", name: "后里", estring: "houli", sect: "taichung"},
            {id:"1317", name: "豐原", estring: "fengyuan", sect: "taichung", big: 'w'},
            {id:"1325", name: "栗林", estring: "lilin", sect: "taichung"},
            {id:"1318", name: "潭子", estring: "tanzi", sect: "taichung"},
            {id:"1326", name: "頭家厝", estring: "toujiacuo", sect: "taichung"},
            {id:"1327", name: "松竹", estring: "toujiacuo", sect: "songzhu"},
            {id:"1323", name: "太原", estring: "taiyuan", sect: "taichung"},
            {id:"1328", name: "精武", estring: "jingwu", sect: "taichung"},
            {id:"1319", name: "台中", estring: "taizhongtaichung", sect: "taichung", big: 'w'},
            {id:"1329", name: "五權", estring: "wuquan", sect: "taichung"},
            {id:"1322", name: "大慶", estring: "daqing", sect: "taichung"},
            {id:"1320", name: "烏日", estring: "wuri", sect: "taichung"},
            {id:"1324", name: "新烏日", estring: "xinwuri", sect: "taichung"},
            {id:"1321", name: "成功", estring: "chenggong", sect: "taichung"},
            {id:"1120", name: "彰化", estring: "zhanghuachanghua", sect: "changhua", big: 'w'},
            {id:"1202", name: "花壇", estring: "huatan", sect: "changhua"},
            {id:"1240", name: "大村", estring: "dacundatsun", sect: "changhua"},
            {id:"1203", name: "員林", estring: "yuanlin", sect: "changhua", big: 'w'},
            {id:"1204", name: "永靖", estring: "yongjing", sect: "changhua"},
            {id:"1205", name: "社頭", estring: "shetou", sect: "changhua"},
            {id:"1206", name: "田中", estring: "tianzhong", sect: "changhua"},
            {id:"1207", name: "二水", estring: "ershuei", sect: "changhua"},
            {id:"1208", name: "林內", estring: "linnei", sect: "yunlin"},
            {id:"1209", name: "石榴", estring: "shilioushihliou", sect: "yunlin"},
            {id:"1210", name: "斗六", estring: "douliou", sect: "yunlin", big: 'w'},
            {id:"1211", name: "斗南", estring: "dounan", sect: "yunlin"},
            {id:"1212", name: "石龜", estring: "shigueishihguei", sect: "yunlin"},
            {id:"1213", name: "大林", estring: "dalin", sect: "yunlin"},
            {id:"1214", name: "民雄", estring: "minxiong", sect: "chiayi"},
            {id:"1241", name: "嘉北", estring: "jiabei", sect: "chiayi"},
            {id:"1215", name: "嘉義", estring: "jiayichiayi", sect: "chiayi", big: 'w'},
            {id:"1217", name: "水上", estring: "shueishang", sect: "chiayi"},
            {id:"1218", name: "南靖", estring: "nanjing", sect: "chiayi"},
            {id:"1219", name: "後壁", estring: "houbi", sect: "tainan"},
            {id:"1220", name: "新營", estring: "xinyingsinying", sect: "tainan", big: 'w'},
            {id:"1221", name: "柳營", estring: "liouying", sect: "tainan"},
            {id:"1222", name: "林鳳營", estring: "linfengyinglinfongying", sect: "tainan"},
            {id:"1223", name: "隆田", estring: "longtian", sect: "tainan"},
            {id:"1224", name: "拔林", estring: "balin", sect: "tainan"},
            {id:"1225", name: "善化", estring: "shanghua", sect: "tainan"},
            {id:"1244", name: "南科", estring: "nanke", sect: "tainan"},
            {id:"1226", name: "新市", estring: "xinshisinshih", sect: "tainan"},
            {id:"1227", name: "永康", estring: "yungkangyongkang", sect: "tainan"},
            {id:"1239", name: "大橋", estring: "daqiaodaciao", sect: "tainan"},
            {id:"1228", name: "台南", estring: "tainan", sect: "tainan", big: 'w'},
            {id:"1229", name: "保安", estring: "baoan", sect: "tainan"},
            {id:"1243", name: "仁德", estring: "rende", sect: "tainan"},
            {id:"1230", name: "中州", estring: "zhongzhoujhongjhou", sect: "tainan"},
            {id:"1231", name: "大湖", estring: "dahu", sect: "kaohsiung"},
            {id:"1232", name: "路竹", estring: "luzhulujhu", sect: "kaohsiung"},
            {id:"1233", name: "岡山", estring: "ganshan", sect: "kaohsiung", big: 'w'},
            {id:"1234", name: "橋頭", estring: "qiaotou", sect: "kaohsiung"},
            {id:"1235", name: "楠梓", estring: "nanzi", sect: "kaohsiung"},
            {id:"1242", name: "新左營", estring: "xingzouying", sect: "kaohsiung", big: 's'},
            {id:"1236", name: "左營", estring: "zouying", sect: "kaohsiung"},
            {id:"1245", name: "內惟", estring: "neiwei", sect: "kaohsiung"},
            {id:"1246", name: "美術館", estring: "meishuguanmuseumoffinearts", sect: "kaohsiung"},
            {id:"1237", name: "鼓山", estring: "gushan", sect: "kaohsiung"},
            {id:"1247", name: "三塊厝", estring: "sankuaicuo", sect: "kaohsiung"},
            {id:"1238", name: "高雄", estring: "kaohsiunggaoxung", sect: "kaohsiung", big: 'ws'},
            {id:"1419", name: "民族", estring: "mingzhu", sect: "kaohsiung"},
            {id:"1420", name: "科工館", estring: "kegongguanscienceandtecnologymuseum", sect: "kaohsiung"},
            {id:"1421", name: "正義", estring: "zhengyi", sect: "kaohsiung"},
            {id:"1402", name: "鳳山", estring: "fongshanfengshan", sect: "kaohsiung"},
            {id:"1403", name: "後庄", sect: "kaohsiung"},
            {id:"1404", name: "九曲堂", sect: "kaohsiung"},
            {id:"1405", name: "六塊厝", sect: "pingdong"},
            {id:"1406", name: "屏東", estring: "pingtungpingdong", sect: "pingdong", big: 'ws', noShow: true},
            {id:"1407", name: "歸來", sect: "pingdong"},
            {id:"1408", name: "麟洛", sect: "pingdong"},
            {id:"1409", name: "西勢", sect: "pingdong"},
            {id:"1410", name: "竹田", sect: "pingdong"},
            {id:"1411", name: "潮州", estring: "chaozhouchaojhou", sect: "pingdong", big: 'ws', noShow: true},
            {id:"1412", name: "崁頂", sect: "pingdong"},
            {id:"1413", name: "南州", sect: "pingdong"},
            {id:"1414", name: "鎮安", sect: "pingdong"},
            {id:"1415", name: "林邊", sect: "pingdong"},
            {id:"1416", name: "佳冬", sect: "pingdong"},
            {id:"1417", name: "東海", sect: "pingdong"},
            {id:"1418", name: "枋寮", sect: "pingdong"},
            {id:"1802", name: "暖暖", estring: "nuannuan", sect: "northeast"},
            {id:"1803", name: "四腳亭", estring: "sijiaoting", sect: "northeast"},
            {id:"1804", name: "瑞芳", estring: "ruifang", sect: "northeast", big: 'e'},
            {id:"1805", name: "猴硐", estring: "houdong", sect: "northeast"},
            {id:"1806", name: "三貂嶺", estring: "sandiaoling", sect: "northeast"},
            {id:"1807", name: "牡丹", estring: "mudan", sect: "northeast"},
            {id:"1808", name: "雙溪", estring: "shuangxi", sect: "northeast"},
            {id:"1809", name: "貢寮", estring: "gongliao", sect: "northeast"},
            {id:"1810", name: "福隆", estring: "fulong", sect: "northeast"},
            {id:"1811", name: "石城", estring: "shicheng", sect: "yilan"},
            {id:"1812", name: "大里", estring: "dali", sect: "yilan"},
            {id:"1813", name: "大溪", estring: "daxidasi", sect: "yilan"},
            {id:"1814", name: "龜山", estring: "gueishan", sect: "yilan"},
            {id:"1815", name: "外澳", estring: "waiao", sect: "yilan"},
            {id:"1816", name: "頭城", estring: "toucheng", sect: "yilan", big: 'e'},
            {id:"1817", name: "頂埔", estring: "dingpu", sect: "yilan"},
            {id:"1818", name: "礁溪", estring: "jiaoxijiaohsi", sect: "yilan"},
            {id:"1819", name: "四城", estring: "sicheng", sect: "yilan"},
            {id:"1820", name: "宜蘭", estring: "yilan", sect: "yilan", big: 'e'},
            {id:"1821", name: "二結", estring: "erjie", sect: "yilan"},
            {id:"1822", name: "中里", estring: "zhongli", sect: "yilan"},
            {id:"1823", name: "羅東", estring: "luodong", sect: "yilan", big: 'e'},
            {id:"1824", name: "冬山", estring: "dongshan", sect: "yilan"},
            {id:"1825", name: "新馬", estring: "xinmasinma", sect: "yilan"},
            {id:"1826", name: "蘇澳新", estring: "suaoxinsuaosin", sect: "yilan", big: 'e'},
            {id:"1827", name: "蘇澳", estring: "suao", sect: "yilan"},
            {id:"1703", name: "永樂", estring: "yongle", sect: "beihui"},
            {id:"1704", name: "東澳", estring: "dongao", sect: "beihui"},
            {id:"1705", name: "南澳", estring: "nanao", sect: "beihui", big: 'e'},
            {id:"1706", name: "武塔", estring: "wuta", sect: "beihui"},
            {id:"1708", name: "漢本", estring: "hanben", sect: "beihui"},
            {id:"1709", name: "和平", estring: "heping", sect: "beihui"},
            {id:"1710", name: "和仁", estring: "heren", sect: "beihui"},
            {id:"1711", name: "崇德", estring: "chongde", sect: "hualian"},
            {id:"1712", name: "新城", estring: "xinchengsincheng", sect: "hualian"},
            {id:"1713", name: "景美", estring: "jingmei", sect: "hualian"},
            {id:"1714", name: "北埔", estring: "beipu", sect: "hualian"},
            {id:"1715", name: "花蓮", estring: "hualienhualian", sect: "hualian", big: 'e'},//sect:hualian
            {id:"1602", name: "吉安", estring: "jian", sect: "hualian"},
            {id:"1604", name: "志學", estring: "zhixue", sect: "hualian"},
            {id:"1605", name: "平和", estring: "pinghe", sect: "hualian"},
            {id:"1606", name: "壽豐", estring: "shoufeng", sect: "hualian"},
            {id:"1607", name: "豐田", estring: "fengtian", sect: "hualian"},
            {id:"1609", name: "南平", estring: "nanping", sect: "hualian"},
            {id:"1610", name: "鳳林", estring: "fenglinfonglin", sect: "hualian"},
            {id:"1611", name: "萬榮", estring: "wanrong", sect: "hualian"},
            {id:"1612", name: "光復", estring: "guangfu", sect: "hualian"},
            {id:"1613", name: "大富", estring: "dafu", sect: "hualian"},
            {id:"1614", name: "富源", estring: "fuyuan", sect: "hualian"},
            {id:"1616", name: "瑞穗", estring: "ruisui", sect: "hualian"},
            {id:"1617", name: "三民", estring: "sanmin", sect: "hualian"},
            {id:"1619", name: "玉里", estring: "yuli", sect: "hualian", big: 'e'},
            {id:"1621", name: "東里", estring: "dongli", sect: "hualian"},
            {id:"1622", name: "東竹", estring: "dongzhu", sect: "hualian"},
            {id:"1623", name: "富里", estring: "fuli", sect: "hualian"},
            {id:"1624", name: "池上", estring: "chishang", sect: "taidong"},
            {id:"1625", name: "海端", estring: "haiduan", sect: "taidong"},
            {id:"1626", name: "關山", estring: "guanshan", sect: "taidong"},
            {id:"1628", name: "瑞和", estring: "ruihe", sect: "taidong"},
            {id:"1629", name: "瑞源", estring: "ruiyuan", sect: "taidong"},
            {id:"1630", name: "鹿野", estring: "luye", sect: "taidong"},
            {id:"1631", name: "山里", estring: "shanli", sect: "taidong"},
            {id:"1632", name: "台東", estring: "taitungtaidong", sect: "taidong", big: 'es'},
            //海線及南迴線臨時資料
            
            {id:"1102", name: "談文", sect: "miaoli"},
            {id:"1104", name: "大山", sect: "miaoli"},
            {id:"1105", name: "後龍", sect: "miaoli"},
            {id:"1106", name: "龍港", sect: "miaoli"},
            {id:"1107", name: "白沙屯", sect: "miaoli"},
            {id:"1108", name: "新埔", sect: "miaoli"},
            {id:"1109", name: "通霄", sect: "miaoli"},
            {id:"1110", name: "苑裡", sect: "miaoli"},
            {id:"1111", name: "日南", sect: "taichung"},
            {id:"1112", name: "大甲", sect: "taichung"},
            {id:"1113", name: "臺中港", sect: "taichung"},
            {id:"1114", name: "清水", sect: "taichung"},
            {id:"1115", name: "沙鹿", sect: "taichung"},
            {id:"1116", name: "龍井", sect: "taichung"},
            {id:"1117", name: "大肚", sect: "taichung"},
            {id:"1118", name: "追分", sect: "taichung"},
            
            {id:"1502", name: "加祿", sect: "pingdong"},
            {id:"1503", name: "內獅", sect: "pingdong"},
            {id:"1504", name: "枋山", sect: "pingdong"},
            {id:"1507", name: "古莊", sect: "taidong"},
            {id:"1508", name: "大武", sect: "taidong"},
            {id:"1510", name: "瀧溪", sect: "taidong"},
            {id:"1512", name: "金崙", sect: "taidong"},
            {id:"1514", name: "太麻里", sect: "taidong"},
            {id:"1516", name: "知本", sect: "taidong"},
            {id:"1517", name: "康樂", sect: "taidong"},
            //海線及南迴線臨時資料
            {id:"2003", name:"八斗子", estring:"badouzi", sect:"northeast"},
            {id:"6103", name:"海科館", estring:"haikeguan", sect:"northeast"},
            {id:"1903", name:"大華", estring:"dahua", sect:"northeast"},
            {id:"1904", name:"十分", estring:"shifenshihfen", sect:"northeast"},
            {id:"1905", name:"望古", estring:"wanggu", sect:"northeast"},
            {id:"1906", name:"嶺腳", estring:"lingjiao", sect:"northeast"},
            {id:"1907", name:"平溪", estring:"pingxipingsi", sect:"northeast"},
            {id:"1908", name:"菁桐", estring:"jingtong", sect:"northeast"},
            {id:"2212", name:"千甲", estring:"qianjia", sect:"hsinchu"},
            {id:"2213", name:"新莊", estring:"xinzhuang", sect:"hsinchu"},
            {id:"2203", name:"竹中", estring:"zhuzhong", sect:"hsinchu"},
            {id:"2214", name:"六家", estring:"liujia", sect:"hsinchu"},
            {id:"2204", name:"上員", estring:"shangyuan", sect:"hsinchu"},
            {id:"2211", name:"榮華", estring:"ronghua", sect:"hsinchu"},
            {id:"2205", name:"竹東", estring:"zhudong", sect:"hsinchu"},
            {id:"2206", name:"橫山", estring:"zhuzhong", sect:"hsinchu"},
            {id:"2207", name:"九讚頭", estring:"jiouzantou", sect:"hsinchu"},
            {id:"2208", name:"合興", estring:"hexinghesing", sect:"hsinchu"},
            {id:"2209", name:"富貴", estring:"fuguei", sect:"hsinchu"},
            {id:"2210", name:"內灣", estring:"neiwan", sect:"hsinchu"},
            {id:"5101", name:"長榮大學", estring:"changrongdaxuechangjungchristianuniversity", sect:"tainan"},
            {id:"5102", name:"沙崙", estring:"shalun", sect:"tainan"}
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