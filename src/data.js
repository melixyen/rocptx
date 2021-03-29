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
            //Wenhu Line
            {id:"trtc_br01", StationID:["BR01"], name: "動物園", estring: "dongwuyuantaipeizoo"},
            {id:"trtc_br02", StationID:["BR02"], name: "木柵", estring: "muzha"},
            {id:"trtc_br03", StationID:["BR03"], name: "萬芳社區", estring: "wanfangshequwanfangcommunity"},
            {id:"trtc_br04", StationID:["BR04"], name: "萬芳醫院", estring: "dongwuyuantaipeizoo"},
            {id:"trtc_br05", StationID:["BR05"], name: "辛亥", estring: "xinhai"},
            {id:"trtc_br06", StationID:["BR06"], name: "麟光", estring: "linguang"},
            {id:"trtc_br07", StationID:["BR07"], name: "六張犁", estring: "liuzhangli"},
            {id:"trtc_br08", StationID:["BR08"], name: "科技大樓", estring: "kejidaloutechnologybuilding"},
            {id:"trtc_br12", StationID:["BR12"], name: "中山國中", estring: "zhongshanguozhongzhongshanjuniorhighschool"},
            {id:"trtc_br13", StationID:["BR13"], name: "松山機場", estring: "songshanjichangsongshanairport"},
            {id:"trtc_br14", StationID:["BR14"], name: "大直", estring: "dazhi"},
            {id:"trtc_br15", StationID:["BR15"], name: "劍南路", estring: "jiannanlujiannanroad"},
            {id:"trtc_br16", StationID:["BR16"], name: "西湖", estring: "xihu"},
            {id:"trtc_br17", StationID:["BR17"], name: "港墘", estring: "gangqian"},
            {id:"trtc_br18", StationID:["BR18"], name: "文德", estring: "wende"},
            {id:"trtc_br19", StationID:["BR19"], name: "內湖", estring: "neihu"},
            {id:"trtc_br20", StationID:["BR20"], name: "大湖公園", estring: "dahugongyuandahupark"},
            {id:"trtc_br21", StationID:["BR21"], name: "葫洲", estring: "huzhou"},
            {id:"trtc_br22", StationID:["BR22"], name: "東湖", estring: "donghu"},
            {id:"trtc_br23", StationID:["BR23"], name: "南港軟體園區", estring: "nangangruantiyuanqunangangsoftwarepark"},
            //Bannan Line
            {id:"trtc_031", StationID:["BL23","BR24"], name: "南港展覽館", estring: "nangangzhanlanguantaipeinangangexhibitioncenter"},
            {id:"trtc_097", StationID:["BL22"], name: "南港", estring: "nangang"},
            {id:"trtc_096", StationID:["BL21"], name: "昆陽", estring: "kunyang"},
            {id:"trtc_095", StationID:["BL20"], name: "後山埤", estring: "houshanpi"},
            {id:"trtc_094", StationID:["BL19"], name: "永春", estring: "yongchun"},
            {id:"trtc_093", StationID:["BL18"], name: "市政府", estring: "taipeicityhallshizhengfu"},
            {id:"trtc_092", StationID:["BL17"], name: "國父紀念館", estring: "sunyatsenmemorialhallguofujinianguan"},
            {id:"trtc_091", StationID:["BL16"], name: "忠孝敦化", estring: "zhongxiaodunhua"},
            {id:"trtc_010", StationID:["BL15","BR10"], name: "忠孝復興", estring: "zhongxiaofuxing"},
            {id:"trtc_089", StationID:["BL14","O07"], name: "忠孝新生", estring: "zhongxiaoxinsheng"},
            {id:"trtc_088", StationID:["BL13"], name: "善導寺", estring: "shandaosishandaotemple"},
            {id:"trtc_086", StationID:["BL11","G12"], name: "西門", estring: "ximen"},
            {id:"trtc_085", StationID:["BL10"], name: "龍山寺", estring: "longshansilongshantemple"},
            {id:"trtc_084", StationID:["BL09"], name: "江子翠", estring: "jiangzicui"},
            {id:"trtc_083", StationID:["BL08"], name: "新埔", estring: "xinpu"},
            {id:"trtc_082", StationID:["BL07"], name: "板橋", estring: "banqiao"},
            {id:"trtc_081", StationID:["BL06"], name: "府中", estring: "fuzhong"},
            {id:"trtc_080", StationID:["BL05"], name: "亞東醫院", estring: "yadongyiyuanfareasternhospital"},
            {id:"trtc_079", StationID:["BL04"], name: "海山", estring: "haishan"},
            {id:"trtc_078", StationID:["BL03"], name: "土城", estring: "tucheng"},
            {id:"trtc_077", StationID:["BL02"], name: "永寧", estring: "yongning"},
            {id:"trtc_076", StationID:["BL01"], name: "頂埔", estring: "dingpu"},
            //TamsuiXinyi Line
            {id:"trtc_071", StationID:["R28"], name: "淡水", estring: "danshuitamsui"},
            {id:"trtc_070", StationID:["R27"], name: "紅樹林", estring: "hongshulin"},
            {id:"trtc_069", StationID:["R26"], name: "竹圍", estring: "zhuwei"},
            {id:"trtc_068", StationID:["R25"], name: "關渡", estring: "guandu"},
            {id:"trtc_067", StationID:["R24"], name: "忠義", estring: "zhongyi"},
            {id:"trtc_066", StationID:["R23"], name: "復興崗", estring: "fuxinggang"},
            {id:"trtc_064", StationID:["R22"], name: "北投", estring: "beitou"},
            {id:"trtc_063", StationID:["R21"], name: "奇岩", estring: "qiyan"},
            {id:"trtc_062", StationID:["R20"], name: "唭哩岸", estring: "qilian"},
            {id:"trtc_061", StationID:["R19"], name: "石牌", estring: "shipai"},
            {id:"trtc_060", StationID:["R18"], name: "明德", estring: "mingde"},
            {id:"trtc_059", StationID:["R17"], name: "芝山", estring: "zhishan"},
            {id:"trtc_058", StationID:["R16"], name: "士林", estring: "shilin"},
            {id:"trtc_057", StationID:["R15"], name: "劍潭", estring: "jiantan"},
            {id:"trtc_056", StationID:["R14"], name: "圓山", estring: "yuanshan"},
            {id:"trtc_055", StationID:["R13","O11"], name: "民權西路", estring: "mingquanwrdmingquanxilu"},
            {id:"trtc_054", StationID:["R12"], name: "雙連", estring: "shuanglian"},
            {id:"trtc_053", StationID:["R11","G14"], name: "中山", estring: "zhongshan"},
            {id:"trtc_051", StationID:["R10","BL12"], name: "台北車站", estring: "taipeichezhantaipeimainstation"},
            {id:"trtc_050", StationID:["R09"], name: "台大醫院", estring: "taidayiyuanntuhospital"},
            {id:"trtc_134", StationID:["R07","O06"], name: "東門", estring: "dongmen"},
            {id:"trtc_103", StationID:["R06"], name: "大安森林公園", estring: "daanparkdaansenlingongyuan"},
            {id:"trtc_011", StationID:["R05","BR09"], name: "大安", estring: "daan"},
            {id:"trtc_101", StationID:["R04"], name: "信義安和", estring: "xinyianhe"},
            {id:"trtc_100", StationID:["R03"], name: "台北101/世貿", estring: "taipei101worldtradecentertaipei101shimao"},
            {id:"trtc_099", StationID:["R02"], name: "象山", estring: "xiangshan"},
            //ZhongHeXinLu Line
            {id:"trtc_048", StationID:["O01"], name: "南勢角", estring: "nanshijiao"},
            {id:"trtc_047", StationID:["O02","Y11"], name: "景安", estring: "jingan"},
            {id:"trtc_046", StationID:["O03"], name: "永安市場", estring: "yonganshichangyonganmarket"},
            {id:"trtc_045", StationID:["O04"], name: "頂溪", estring: "dingxi"},
            {id:"trtc_131", StationID:["O09"], name: "行天宮", estring: "xingtiantemplexingtiangong"},
            {id:"trtc_130", StationID:["O10"], name: "中山國小", estring: "zhongshanguoxiaozhongshanelementaryschool"},
            {id:"trtc_128", StationID:["O12"], name: "大橋頭", estring: "daqiaotou"},
            {id:"trtc_127", StationID:["O13"], name: "台北橋", estring: "taibeiqiaotaipeibridge"},
            {id:"trtc_126", StationID:["O14"], name: "菜寮", estring: "cailiao"},
            {id:"trtc_125", StationID:["O15"], name: "三重", estring: "sanchong"},
            {id:"trtc_124", StationID:["O16"], name: "先嗇宮", estring: "xiansetemplexiansegong"},
            {id:"trtc_123", StationID:["O17","Y18"], name: "頭前庄", estring: "touqianzhuang"},
            {id:"trtc_122", StationID:["O18"], name: "新莊", estring: "xinzhuang"},
            {id:"trtc_121", StationID:["O19"], name: "輔大", estring: "fudafujenuniversity"},
            {id:"trtc_180", StationID:["O20"], name: "丹鳳", estring: "danfeng"},
            {id:"trtc_179", StationID:["O21"], name: "迴龍", estring: "huilong"},
            {id:"trtc_178", StationID:["O50"], name: "三重國小", estring: "sanchongguoxiaosanchongelementaryschool"},
            {id:"trtc_177", StationID:["O51"], name: "三和國中", estring: "sanheguozhongsanhejuniorhighschool"},
            {id:"trtc_176", StationID:["O52"], name: "徐匯中學", estring: "xuhuizhongxuestignatiushighschool"},
            {id:"trtc_175", StationID:["O53"], name: "三民高中", estring: "sanmingaozhongsanminseniorhighschool"},
            {id:"trtc_174", StationID:["O54"], name: "蘆洲", estring: "luzhou"},
            //SongShanXinDian Line
            {id:"trtc_111", StationID:["G19"], name: "松山", estring: "songshan"},
            {id:"trtc_110", StationID:["G18"], name: "南京三民", estring: "nanjingsanmin"},
            {id:"trtc_109", StationID:["G17"], name: "台北小巨蛋", estring: "taipeiarenataibeixiaojudan"},
            {id:"trtc_009", StationID:["G16","BR11"], name: "南京復興", estring: "nanjingfuxing"},
            {id:"trtc_132", StationID:["G15","O08"], name: "松江南京", estring: "songjiangnanjing"},
            {id:"trtc_105", StationID:["G13"], name: "北門", estring: "beimen"},
            {id:"trtc_043", StationID:["G11"], name: "小南門", estring: "xiaonanmen"},
            {id:"trtc_042", StationID:["G10","R08"], name: "中正紀念堂", estring: "zhongzhengjiniantangchiangkaishekmemorialhall"},
            {id:"trtc_041", StationID:["G09","O05"], name: "古亭", estring: "guting"},
            {id:"trtc_040", StationID:["G08"], name: "台電大樓", estring: "taidiandaloutaipowerbuilding"},
            {id:"trtc_039", StationID:["G07"], name: "公館", estring: "gongguan"},
            {id:"trtc_038", StationID:["G06"], name: "萬隆", estring: "wanlong"},
            {id:"trtc_037", StationID:["G05"], name: "景美", estring: "jingmei"},
            {id:"trtc_036", StationID:["G04","Y07"], name: "大坪林", estring: "dapinglin"},
            {id:"trtc_035", StationID:["G03"], name: "七張", estring: "qizhang"},
            {id:"trtc_034", StationID:["G02"], name: "新店區公所", estring: "xindiandistrictofficexindianqugongsuo"},
            {id:"trtc_033", StationID:["G01"], name: "新店", estring: "xindian"},
            //Circular Line
            {id:"trtc_y08", StationID:["Y08"], name: "十四張", estring: "shisizhang"},
            {id:"trtc_y09", StationID:["Y09"], name: "秀朗橋", estring: "xiulangqiao"},
            {id:"trtc_y10", StationID:["Y10"], name: "景平", estring: "jingping"},
            {id:"trtc_y12", StationID:["Y12"], name: "中和", estring: "zhonghe"},
            {id:"trtc_y13", StationID:["Y13"], name: "橋和", estring: "qiaohe"},
            {id:"trtc_y14", StationID:["Y14"], name: "中原", estring: "zhongyuan"},
            {id:"trtc_y15", StationID:["Y15"], name: "板新", estring: "banxin"},
            {id:"trtc_y16", StationID:["Y16"], name: "板橋（環狀）", estring: "banqiao"},
            {id:"trtc_y17", StationID:["Y17"], name: "新埔民生", estring: "xinpuminsheng"},
            {id:"trtc_y19", StationID:["Y19"], name: "幸福", estring: "xingfu"},
            {id:"trtc_y20", StationID:["Y20"], name: "新北產業園區", estring: "xinbeichanyeyuanqui"}
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
            }],
            name: "文湖線(1)",
            color: "#b57a25",
            dir: "0",
            station: ["trtc_br01","trtc_br02","trtc_br03","trtc_br04","trtc_br05","trtc_br06","trtc_br07","trtc_br08","trtc_011","trtc_010","trtc_009","trtc_br12","trtc_br13","trtc_br14","trtc_br15","trtc_br16","trtc_br17","trtc_br18","trtc_br19","trtc_br20","trtc_br21","trtc_br22","trtc_br23","trtc_031"]
        }, {
            id: 'trtc_6',
            LineID: 'Y',
            route: [{
                dir: 0,
                Direction: 0,
                work: [{RouteID: 'Y-1', from: 'Y07', to: 'Y20'}]
            }, {
                dir: 1,
                Direction: 1,
                work: [{RouteID: 'Y-1', from: 'Y20', to: 'Y07'}]
            }],
            name: "環狀線(6)",
            color: "#ffdb00",
            dir: "0",
            station: ["trtc_036","trtc_y08","trtc_y09","trtc_y10","trtc_047","trtc_y12","trtc_y13","trtc_y14","trtc_y15","trtc_y16","trtc_y17","trtc_123","trtc_y19","trtc_y20"]
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
            }],
            name: "淡水信義線(2)",
            color: "#cb2c30",
            dir: "1",
            outArea: [{
                dir: "1",
                station: "trtc_071~trtc_066",
                transAt: "trtc_064",
                waitingNextMinute: 4
            }, {
                dir: "1",
                station: "trtc_101~trtc_099",
                transAt: "trtc_011",
                waitingNextMinute: 4
            }],
            station: ["trtc_071","trtc_070","trtc_069","trtc_068","trtc_067","trtc_066","trtc_064","trtc_063","trtc_062","trtc_061","trtc_060","trtc_059","trtc_058","trtc_057","trtc_056","trtc_055","trtc_054","trtc_053","trtc_051","trtc_050","trtc_042","trtc_134","trtc_103","trtc_011","trtc_101","trtc_100","trtc_099"]
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
            }],
            name: "松山新店線(3)",
            color: "#007749",
            dir: "1",
            outArea: [{
                dir: "1",
                station: "trtc_039~trtc_033",
                transAt: "trtc_040",
                waitingNextMinute: 4
            }],
            station: ["trtc_111","trtc_110","trtc_109","trtc_009","trtc_132","trtc_053","trtc_105","trtc_086","trtc_043","trtc_042","trtc_041","trtc_040","trtc_039","trtc_038","trtc_037","trtc_036","trtc_035","trtc_034","trtc_033"]
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
            }],
            name: "中和新蘆線(4)",
            color: "#ffa300",
            dir: "0",
            splitStation: ['trtc_128'],
            outArea: [{
                dir: "0",
                station: "trtc_127~trtc_179",
                transAt: "trtc_128",
                isSubLine: true,
                waitingNextMinute: 4
            }, {
                dir: "0",
                station: "trtc_178~trtc_174",
                transAt: "trtc_128",
                isSubLine: true,
                waitingNextMinute: 4
            }],
            station: ["trtc_048","trtc_047","trtc_046","trtc_045","trtc_041","trtc_134","trtc_089","trtc_132","trtc_131","trtc_130","trtc_055","trtc_128","trtc_127","trtc_126","trtc_125","trtc_124","trtc_123","trtc_122","trtc_121","trtc_180","trtc_179",
                "trtc_178", "trtc_177", "trtc_176", "trtc_175", "trtc_174"]
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
            }],
            name: "板南線(5)",
            color: "#005eb8",
            dir: "1",
            outArea: [{
                dir: "1",
                station: "trtc_079~trtc_076",
                transAt: "trtc_080",
                waitingNextMinute: 4
            }],
            station: ["trtc_031","trtc_097","trtc_096","trtc_095","trtc_094","trtc_093","trtc_092","trtc_091","trtc_010","trtc_089","trtc_088","trtc_051","trtc_086","trtc_085","trtc_084","trtc_083","trtc_082","trtc_081","trtc_080","trtc_079","trtc_078","trtc_077","trtc_076"]
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
            {id:"tymetro_a01", StationID:["A1"], name: "臺北車站", estring: "taipeichezhantaipeimainstation", sect: 'taipei', big: 'd'},
            {id:"tymetro_a02", StationID:["A2"], name: "三重", estring: "sanchong", sect: 'taipei'},
            {id:"tymetro_a03", StationID:["A3"], name: "新北產業園區", estring: "xinbeichanyeyuanqui", sect: 'taipei', big: 'd'},
            {id:"tymetro_a04", StationID:["A4"], name: "新莊副都心", estring: "xinzhungfuduxin", sect: 'taipei'},
            {id:"tymetro_a05", StationID:["A5"], name: "泰山", estring: "taishan", sect: 'taipei'},
            {id:"tymetro_a06", StationID:["A6"], name: "泰山貴和", estring: "taishanguehe", sect: 'taipei'},
            {id:"tymetro_a07", StationID:["A7"], name: "體育大學", estring: "tiyvdaxue", sect: 'taipei'},
            {id:"tymetro_a08", StationID:["A8"], name: "長庚醫院", estring: "changgengyiyuan", sect: 'taoyuan', big: 'd'},
            {id:"tymetro_a09", StationID:["A9"], name: "林口", estring: "linkou", sect: 'taoyuan'},
            {id:"tymetro_a10", StationID:["A10"], name: "山鼻", estring: "shanbi", sect: 'taoyuan'},
            {id:"tymetro_a11", StationID:["A11"], name: "坑口", estring: "kengkou", sect: 'taoyuan'},
            {id:"tymetro_a12", StationID:["A12"], name: "機場第一航廈", estring: "terminal1", sect: 'taoyuan', big: 'd'},
            {id:"tymetro_a13", StationID:["A13"], name: "機場第二航廈", estring: "terminal2", sect: 'taoyuan', big: 'd'},
            {id:"tymetro_a14a", StationID:["A14a"], name: "機場旅館", estring: "airporthotel", sect: 'taoyuan'},
            {id:"tymetro_a15", StationID:["A15"], name: "大園", estring: "dayuan", sect: 'taoyuan'},
            {id:"tymetro_a16", StationID:["A16"], name: "橫山", estring: "hengshan", sect: 'taoyuan'},
            {id:"tymetro_a17", StationID:["A17"], name: "領航", estring: "linghang", sect: 'taoyuan'},
            {id:"tymetro_a18", StationID:["A18"], name: "高鐵桃園站", estring: "gaotietaoyuanzhan", sect: 'taoyuan'},
            {id:"tymetro_a19", StationID:["A19"], name: "桃園體育園區", estring: "taoyuantiyuyuanqui", sect: 'taoyuan'},
            {id:"tymetro_a20", StationID:["A20"], name: "興南", estring: "xingnan", sect: 'taoyuan'},
            {id:"tymetro_a21", StationID:["A21"], name: "環北", estring: "huanbei", sect: 'taoyuan'}
        ],
        line: [
            {
                id: "tymetro_1",
                LineID: "A",
                name: "機場捷運",
                trainSect: ["taipei", "taoyuan"],
                color: "#8e47ad",
                dir: "1",
                station: ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14a","A15","A16","A17","A18","A19","A20","A21"]
            }
        ]
    },
    tmrt: {
        sect_ary: ['taichung'],
        station_ary: [
            //G Line
            {id:"tmrt_103a", StationID:["103a"], name: "北屯總站", estring: "beitunmainstationbeitunzhongzhan", sect: 'taichung'},
            {id:"tmrt_103", StationID:["103"], name: "舊社", estring: "jiushe", sect: 'taichung'},
            {id:"tmrt_104", StationID:["104"], name: "松竹", estring: "songzhu", sect: 'taichung'},
            {id:"tmrt_105", StationID:["105"], name: "四維國小", estring: "sihweielementaryschoolsiweiguoxiao", sect: 'taichung'},
            {id:"tmrt_106", StationID:["106"], name: "文心崇德", estring: "wenxinchongde", sect: 'taichung'},
            {id:"tmrt_107", StationID:["107"], name: "文心中清", estring: "wenxinzhongqing", sect: 'taichung'},
            {id:"tmrt_108", StationID:["108"], name: "文華高中", estring: "wenhuaseniorhighschoolwenhuagaozhong", sect: 'taichung'},
            {id:"tmrt_109", StationID:["109"], name: "文心櫻花", estring: "wenxinyinghua", sect: 'taichung'},
            {id:"tmrt_110", StationID:["110"], name: "市政府", estring: "taichungcityhallshizhengfu", sect: 'taichung'},
            {id:"tmrt_111", StationID:["111"], name: "水安宮", estring: "shuiantempleshuiangong", sect: 'taichung'},
            {id:"tmrt_112", StationID:["112"], name: "文心森林公園", estring: "wenxinforestpark", sect: 'taichung'},
            {id:"tmrt_113", StationID:["113"], name: "南屯", estring: "nantun", sect: 'taichung'},
            {id:"tmrt_114", StationID:["114"], name: "豐樂公園", estring: "fengleparkfenglegongyuan", sect: 'taichung'},
            {id:"tmrt_115", StationID:["115"], name: "大慶", estring: "daqing", sect: 'taichung'},
            {id:"tmrt_116", StationID:["116"], name: "九張犁", estring: "jiuzhangli", sect: 'taichung'},
            {id:"tmrt_117", StationID:["117"], name: "九德", estring: "jiude", sect: 'taichung'},
            {id:"tmrt_118", StationID:["118"], name: "烏日", estring: "wuri", sect: 'taichung'},
            {id:"tmrt_119", StationID:["119"], name: "高鐵臺中站", estring: "hSRtaichungstationgaotietaizhongzhan", sect: 'taichung'}
        ],
        line: [
            {
                id: "tymetro_G",
                LineID: "G",
                name: "烏日文心北屯線",
                trainSect: ["taichung"],
                color: "#84BD00",
                dir: "0",
                station: ["103a","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119"]
            }
        ]
    },
    thsr: {
        station_ary: [
            {id:'thsr_0990', StationID:['0990'], name: '南港', estring:'nangang', sect: 'taipei'},
            {id:'thsr_1000', StationID:['1000'], name: '台北', estring:'taipeitaibei', sect: 'taipei'},
            {id:'thsr_1010', StationID:['1010'], name: '板橋', estring:'banqiaobanciao', sect: 'taipei'},
            {id:'thsr_1020', StationID:['1020'], name: '桃園', estring:'taoyuan', sect: 'taoyuan'},
            {id:'thsr_1030', StationID:['1030'], name: '新竹', estring:'hsinchuxinzhu', sect: 'hsinchu'},
            {id:'thsr_1035', StationID:['1035'], name: '苗栗', estring:'miaoli', sect: 'miaoli'},
            {id:'thsr_1040', StationID:['1040'], name: '台中', estring:'taizhongtaichung', sect: 'taichung'},
            {id:'thsr_1043', StationID:['1043'], name: '彰化', estring:'zhanghuachanghua', sect: 'changhua'},
            {id:'thsr_1047', StationID:['1047'], name: '雲林', estring:'yunlin', sect: 'yunlin'},
            {id:'thsr_1050', StationID:['1050'], name: '嘉義', estring:'jiayichiayi', sect: 'chiayi'},
            {id:'thsr_1060', StationID:['1060'], name: '台南', estring:'tainan', sect: 'tainan'},
            {id:'thsr_1070', StationID:['1070'], name: '左營', estring:'zouying', sect: 'kaohsiung'},
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
            {id:"tra_1001", v3id:"0900", name: "基隆", estring: "keelung", sect: "keelung"},
            {id:"tra_1029", v3id:"0910", name: "三坑", estring: "sankeng", sect: "keelung"},
            {id:"tra_1002", v3id:"0920", name: "八堵", estring: "badu", sect: "keelung", big: 'e'},
            {id:"tra_1003", v3id:"0930", name: "七堵", estring: "qidu", sect: "keelung", big: 'ew'},
            {id:"tra_1030", v3id:"0940", name: "百福", estring: "baifu", sect: "keelung"},
            {id:"tra_1004", v3id:"0950", name: "五堵", estring: "wudu", sect: "taipei"},
            {id:"tra_1005", v3id:"0960", name: "汐止", estring: "xizhisijhih", sect: "taipei"},
            {id:"tra_1031", v3id:"0970", name: "汐科", estring: "xikesike", sect: "taipei"},
            {id:"tra_1006", v3id:"0980", name: "南港", estring: "nangang", sect: "taipei"},
            {id:"tra_1007", v3id:"0990", name: "松山", estring: "songshan", sect: "taipei", big: 'ew', bigMaster: true},
            {id:"tra_1008", v3id:"1000", name: "台北", estring: "taipeitaibei", sect: "taipei", big: 'ew', bigMaster: true},
            {id:"tra_1009", v3id:"1010", name: "萬華", estring: "wanhua", sect: "taipei"},
            {id:"tra_1011", v3id:"1020", name: "板橋", estring: "banqiao", sect: "taipei", big: 'ew', bigMaster: true},
            {id:"tra_1032", v3id:"1030", name: "浮洲", estring: "fuzhou", sect: "taipei"},
            {id:"tra_1012", v3id:"1040", name: "樹林", estring: "shulin", sect: "taipei", big: 'e'},
            {id:"tra_1034", v3id:"1050", name: "南樹林", estring: "nanshulin", sect: "taipei"},
            {id:"tra_1013", v3id:"1060", name: "山佳", estring: "shanjia", sect: "taipei"},
            {id:"tra_1014", v3id:"1070", name: "鶯歌", estring: "yingge", sect: "taipei"},
            {id:"tra_1015", v3id:"1080", name: "桃園", estring: "taoyuan", sect: "taoyuan", big: 'w'},
            {id:"tra_1016", v3id:"1090", name: "內壢", estring: "neili", sect: "taoyuan"},
            {id:"tra_1017", v3id:"1100", name: "中壢", estring: "zhongli", sect: "taoyuan", big: 'w'},
            {id:"tra_1018", v3id:"1110", name: "埔心", estring: "puxin", sect: "taoyuan"},
            {id:"tra_1019", v3id:"1120", name: "楊梅", estring: "yangmei", sect: "taoyuan"},
            {id:"tra_1020", v3id:"1130", name: "富岡", estring: "fugan", sect: "taoyuan"},
            {id:"tra_1036", v3id:"1140", name: "新富", estring: "xinfu", sect: "taoyuan"},
            {id:"tra_1033", v3id:"1150", name: "北湖", estring: "beihu", sect: "hsinchu"},
            {id:"tra_1021", v3id:"1160", name: "湖口", estring: "hukou", sect: "hsinchu"},
            {id:"tra_1022", v3id:"1170", name: "新豐", estring: "xinfeng", sect: "hsinchu"},
            {id:"tra_1023", v3id:"1180", name: "竹北", estring: "zhubei", sect: "hsinchu"},
            {id:"tra_1024", v3id:"1190", name: "北新竹", estring: "northhsinchubeixinzhu", sect: "hsinchu"},
            {id:"tra_1025", v3id:"1210", name: "新竹", estring: "hsinchuxinzhu", sect: "hsinchu", big: 'w'},
            {id:"tra_1035", v3id:"1220", name: "三姓橋", estring: "sanxingqiao", sect: "hsinchu"},
            {id:"tra_1026", v3id:"1230", name: "香山", estring: "xiangshan", sect: "hsinchu"},
            {id:"tra_1027", v3id:"1240", name: "崎頂", estring: "jidingciding", sect: "hsinchu"},
            {id:"tra_1028", v3id:"1250", name: "竹南", estring: "zhunan", sect: "hsinchu", big: 'w'},
            {id:"tra_1302", v3id:"3140", name: "造橋", estring: "zaoqiao", sect: "miaoli"},
            {id:"tra_1304", v3id:"3150", name: "豐富", estring: "fengfu", sect: "miaoli"},
            {id:"tra_1305", v3id:"3160", name: "苗栗", estring: "miaoli", sect: "miaoli", big: 'w'},
            {id:"tra_1307", v3id:"3170", name: "南勢", estring: "nanshi", sect: "miaoli"},
            {id:"tra_1308", v3id:"3180", name: "銅鑼", estring: "tongluo", sect: "miaoli"},
            {id:"tra_1310", v3id:"3190", name: "三義", estring: "sanyi", sect: "miaoli"},
            {id:"tra_1314", v3id:"3210", name: "泰安", estring: "taian", sect: "miaoli"},
            {id:"tra_1315", v3id:"3220", name: "后里", estring: "houli", sect: "taichung"},
            {id:"tra_1317", v3id:"3230", name: "豐原", estring: "fengyuan", sect: "taichung", big: 'w'},
            {id:"tra_1325", v3id:"3240", name: "栗林", estring: "lilin", sect: "taichung"},
            {id:"tra_1318", v3id:"3250", name: "潭子", estring: "tanzi", sect: "taichung"},
            {id:"tra_1326", v3id:"3260", name: "頭家厝", estring: "toujiacuo", sect: "taichung"},
            {id:"tra_1327", v3id:"3270", name: "松竹", estring: "toujiacuo", sect: "songzhu"},
            {id:"tra_1323", v3id:"3280", name: "太原", estring: "taiyuan", sect: "taichung"},
            {id:"tra_1328", v3id:"3290", name: "精武", estring: "jingwu", sect: "taichung"},
            {id:"tra_1319", v3id:"3300", name: "台中", estring: "taizhongtaichung", sect: "taichung", big: 'w'},
            {id:"tra_1329", v3id:"3310", name: "五權", estring: "wuquan", sect: "taichung"},
            {id:"tra_1322", v3id:"3320", name: "大慶", estring: "daqing", sect: "taichung"},
            {id:"tra_1320", v3id:"3330", name: "烏日", estring: "wuri", sect: "taichung"},
            {id:"tra_1324", v3id:"3340", name: "新烏日", estring: "xinwuri", sect: "taichung"},
            {id:"tra_1321", v3id:"3350", name: "成功", estring: "chenggong", sect: "taichung"},
            {id:"tra_1120", v3id:"3360", name: "彰化", estring: "zhanghuachanghua", sect: "changhua", big: 'w'},
            {id:"tra_1202", v3id:"3370", name: "花壇", estring: "huatan", sect: "changhua"},
            {id:"tra_1240", v3id:"3380", name: "大村", estring: "dacundatsun", sect: "changhua"},
            {id:"tra_1203", v3id:"3390", name: "員林", estring: "yuanlin", sect: "changhua", big: 'w'},
            {id:"tra_1204", v3id:"3400", name: "永靖", estring: "yongjing", sect: "changhua"},
            {id:"tra_1205", v3id:"3410", name: "社頭", estring: "shetou", sect: "changhua"},
            {id:"tra_1206", v3id:"3420", name: "田中", estring: "tianzhong", sect: "changhua"},
            {id:"tra_1207", v3id:"3430", name: "二水", estring: "ershuei", sect: "changhua"},
            {id:"tra_1208", v3id:"3450", name: "林內", estring: "linnei", sect: "yunlin"},
            {id:"tra_1209", v3id:"3460", name: "石榴", estring: "shilioushihliou", sect: "yunlin"},
            {id:"tra_1210", v3id:"3470", name: "斗六", estring: "douliou", sect: "yunlin", big: 'w'},
            {id:"tra_1211", v3id:"3480", name: "斗南", estring: "dounan", sect: "yunlin"},
            {id:"tra_1212", v3id:"3490", name: "石龜", estring: "shigueishihguei", sect: "yunlin"},
            {id:"tra_1213", v3id:"4050", name: "大林", estring: "dalin", sect: "yunlin"},
            {id:"tra_1214", v3id:"4060", name: "民雄", estring: "minxiong", sect: "chiayi"},
            {id:"tra_1241", v3id:"4070", name: "嘉北", estring: "jiabei", sect: "chiayi"},
            {id:"tra_1215", v3id:"4080", name: "嘉義", estring: "jiayichiayi", sect: "chiayi", big: 'w'},
            {id:"tra_1217", v3id:"4090", name: "水上", estring: "shueishang", sect: "chiayi"},
            {id:"tra_1218", v3id:"4100", name: "南靖", estring: "nanjing", sect: "chiayi"},
            {id:"tra_1219", v3id:"4110", name: "後壁", estring: "houbi", sect: "tainan"},
            {id:"tra_1220", v3id:"4120", name: "新營", estring: "xinyingsinying", sect: "tainan", big: 'w'},
            {id:"tra_1221", v3id:"4130", name: "柳營", estring: "liouying", sect: "tainan"},
            {id:"tra_1222", v3id:"4140", name: "林鳳營", estring: "linfengyinglinfongying", sect: "tainan"},
            {id:"tra_1223", v3id:"4150", name: "隆田", estring: "longtian", sect: "tainan"},
            {id:"tra_1224", v3id:"4160", name: "拔林", estring: "balin", sect: "tainan"},
            {id:"tra_1225", v3id:"4170", name: "善化", estring: "shanghua", sect: "tainan"},
            {id:"tra_1244", v3id:"4180", name: "南科", estring: "nanke", sect: "tainan"},
            {id:"tra_1226", v3id:"4190", name: "新市", estring: "xinshisinshih", sect: "tainan"},
            {id:"tra_1227", v3id:"4200", name: "永康", estring: "yungkangyongkang", sect: "tainan"},
            {id:"tra_1239", v3id:"4210", name: "大橋", estring: "daqiaodaciao", sect: "tainan"},
            {id:"tra_1228", v3id:"4220", name: "台南", estring: "tainan", sect: "tainan", big: 'w'},
            {id:"tra_1229", v3id:"4250", name: "保安", estring: "baoan", sect: "tainan"},
            {id:"tra_1243", v3id:"4260", name: "仁德", estring: "rende", sect: "tainan"},
            {id:"tra_1230", v3id:"4270", name: "中州", estring: "zhongzhoujhongjhou", sect: "tainan"},
            {id:"tra_1231", v3id:"4290", name: "大湖", estring: "dahu", sect: "kaohsiung"},
            {id:"tra_1232", v3id:"4300", name: "路竹", estring: "luzhulujhu", sect: "kaohsiung"},
            {id:"tra_1233", v3id:"4310", name: "岡山", estring: "ganshan", sect: "kaohsiung", big: 'w'},
            {id:"tra_1234", v3id:"4320", name: "橋頭", estring: "qiaotou", sect: "kaohsiung"},
            {id:"tra_1235", v3id:"4330", name: "楠梓", estring: "nanzi", sect: "kaohsiung"},
            {id:"tra_1242", v3id:"4340", name: "新左營", estring: "xingzouying", sect: "kaohsiung", big: 's'},
            {id:"tra_1236", v3id:"4350", name: "左營", estring: "zouying", sect: "kaohsiung"},
            {id:"tra_1245", v3id:"4360", name: "內惟", estring: "neiwei", sect: "kaohsiung"},
            {id:"tra_1246", v3id:"4370", name: "美術館", estring: "meishuguanmuseumoffinearts", sect: "kaohsiung"},
            {id:"tra_1237", v3id:"4380", name: "鼓山", estring: "gushan", sect: "kaohsiung"},
            {id:"tra_1247", v3id:"4390", name: "三塊厝", estring: "sankuaicuo", sect: "kaohsiung"},
            {id:"tra_1238", v3id:"4400", name: "高雄", estring: "kaohsiunggaoxung", sect: "kaohsiung", big: 'ws'},
            {id:"tra_1419", v3id:"4410", name: "民族", estring: "mingzhu", sect: "kaohsiung"},
            {id:"tra_1420", v3id:"4420", name: "科工館", estring: "kegongguanscienceandtecnologymuseum", sect: "kaohsiung"},
            {id:"tra_1421", v3id:"4430", name: "正義", estring: "zhengyi", sect: "kaohsiung"},
            {id:"tra_1402", v3id:"4440", name: "鳳山", estring: "fongshanfengshan", sect: "kaohsiung"},
            {id:"tra_1403", v3id:"4450", name: "後庄", sect: "kaohsiung"},
            {id:"tra_1404", v3id:"4460", name: "九曲堂", sect: "kaohsiung"},
            {id:"tra_1405", v3id:"4470", name: "六塊厝", sect: "pingdong"},
            {id:"tra_1406", v3id:"5000", name: "屏東", estring: "pingtungpingdong", sect: "pingdong", big: 'ws', noShow: true},
            {id:"tra_1407", v3id:"5010", name: "歸來", sect: "pingdong"},
            {id:"tra_1408", v3id:"5020", name: "麟洛", sect: "pingdong"},
            {id:"tra_1409", v3id:"5030", name: "西勢", sect: "pingdong"},
            {id:"tra_1410", v3id:"5040", name: "竹田", sect: "pingdong"},
            {id:"tra_1411", v3id:"5050", name: "潮州", estring: "chaozhouchaojhou", sect: "pingdong", big: 'ws', noShow: true},
            {id:"tra_1412", v3id:"5060", name: "崁頂", sect: "pingdong"},
            {id:"tra_1413", v3id:"5070", name: "南州", sect: "pingdong"},
            {id:"tra_1414", v3id:"5080", name: "鎮安", sect: "pingdong"},
            {id:"tra_1415", v3id:"5090", name: "林邊", sect: "pingdong"},
            {id:"tra_1416", v3id:"5100", name: "佳冬", sect: "pingdong"},
            {id:"tra_1417", v3id:"5110", name: "東海", sect: "pingdong"},
            {id:"tra_1418", v3id:"5120", name: "枋寮", sect: "pingdong"},
            {id:"tra_1802", v3id:"7390", name: "暖暖", estring: "nuannuan", sect: "northeast"},
            {id:"tra_1803", v3id:"7380", name: "四腳亭", estring: "sijiaoting", sect: "northeast"},
            {id:"tra_1804", v3id:"7360", name: "瑞芳", estring: "ruifang", sect: "northeast", big: 'e'},
            {id:"tra_1805", v3id:"7350", name: "猴硐", estring: "houdong", sect: "northeast"},
            {id:"tra_1806", v3id:"7330", name: "三貂嶺", estring: "sandiaoling", sect: "northeast"},
            {id:"tra_1807", v3id:"7320", name: "牡丹", estring: "mudan", sect: "northeast"},
            {id:"tra_1808", v3id:"7310", name: "雙溪", estring: "shuangxi", sect: "northeast"},
            {id:"tra_1809", v3id:"7300", name: "貢寮", estring: "gongliao", sect: "northeast"},
            {id:"tra_1810", v3id:"7290", name: "福隆", estring: "fulong", sect: "northeast"},
            {id:"tra_1811", v3id:"7280", name: "石城", estring: "shicheng", sect: "yilan"},
            {id:"tra_1812", v3id:"7270", name: "大里", estring: "dali", sect: "yilan"},
            {id:"tra_1813", v3id:"7260", name: "大溪", estring: "daxidasi", sect: "yilan"},
            {id:"tra_1814", v3id:"7250", name: "龜山", estring: "gueishan", sect: "yilan"},
            {id:"tra_1815", v3id:"7240", name: "外澳", estring: "waiao", sect: "yilan"},
            {id:"tra_1816", v3id:"7230", name: "頭城", estring: "toucheng", sect: "yilan", big: 'e'},
            {id:"tra_1817", v3id:"7220", name: "頂埔", estring: "dingpu", sect: "yilan"},
            {id:"tra_1818", v3id:"7210", name: "礁溪", estring: "jiaoxijiaohsi", sect: "yilan"},
            {id:"tra_1819", v3id:"7200", name: "四城", estring: "sicheng", sect: "yilan"},
            {id:"tra_1820", v3id:"7190", name: "宜蘭", estring: "yilan", sect: "yilan", big: 'e'},
            {id:"tra_1821", v3id:"7180", name: "二結", estring: "erjie", sect: "yilan"},
            {id:"tra_1822", v3id:"7170", name: "中里", estring: "zhongli", sect: "yilan"},
            {id:"tra_1823", v3id:"7160", name: "羅東", estring: "luodong", sect: "yilan", big: 'e'},
            {id:"tra_1824", v3id:"7150", name: "冬山", estring: "dongshan", sect: "yilan"},
            {id:"tra_1825", v3id:"7140", name: "新馬", estring: "xinmasinma", sect: "yilan"},
            {id:"tra_1826", v3id:"7130", name: "蘇澳新", estring: "suaoxinsuaosin", sect: "yilan", big: 'e'},
            {id:"tra_1827", v3id:"7120", name: "蘇澳", estring: "suao", sect: "yilan"},
            {id:"tra_1703", v3id:"7110", name: "永樂", estring: "yongle", sect: "beihui"},
            {id:"tra_1704", v3id:"7100", name: "東澳", estring: "dongao", sect: "beihui"},
            {id:"tra_1705", v3id:"7090", name: "南澳", estring: "nanao", sect: "beihui", big: 'e'},
            {id:"tra_1706", v3id:"7080", name: "武塔", estring: "wuta", sect: "beihui"},
            {id:"tra_1708", v3id:"7070", name: "漢本", estring: "hanben", sect: "beihui"},
            {id:"tra_1709", v3id:"7060", name: "和平", estring: "heping", sect: "beihui"},
            {id:"tra_1710", v3id:"7050", name: "和仁", estring: "heren", sect: "beihui"},
            {id:"tra_1711", v3id:"7040", name: "崇德", estring: "chongde", sect: "hualian"},
            {id:"tra_1712", v3id:"7030", name: "新城", estring: "xinchengsincheng", sect: "hualian"},
            {id:"tra_1713", v3id:"7020", name: "景美", estring: "jingmei", sect: "hualian"},
            {id:"tra_1714", v3id:"7010", name: "北埔", estring: "beipu", sect: "hualian"},
            {id:"tra_1715", v3id:"7000", name: "花蓮", estring: "hualienhualian", sect: "hualian", big: 'e'},//sect:hualian
            {id:"tra_1602", v3id:"6250", name: "吉安", estring: "jian", sect: "hualian"},
            {id:"tra_1604", v3id:"6240", name: "志學", estring: "zhixue", sect: "hualian"},
            {id:"tra_1605", v3id:"6230", name: "平和", estring: "pinghe", sect: "hualian"},
            {id:"tra_1606", v3id:"6220", name: "壽豐", estring: "shoufeng", sect: "hualian"},
            {id:"tra_1607", v3id:"6210", name: "豐田", estring: "fengtian", sect: "hualian"},
            {id:"tra_1608", v3id:"6200", name: "林榮新光", estring: "lingrongzinguanglingrongshinkong", sect: "hualian"},
            {id:"tra_1609", v3id:"6190", name: "南平", estring: "nanping", sect: "hualian"},
            {id:"tra_1610", v3id:"6180", name: "鳳林", estring: "fenglinfonglin", sect: "hualian"},
            {id:"tra_1611", v3id:"6170", name: "萬榮", estring: "wanrong", sect: "hualian"},
            {id:"tra_1612", v3id:"6160", name: "光復", estring: "guangfu", sect: "hualian"},
            {id:"tra_1613", v3id:"6150", name: "大富", estring: "dafu", sect: "hualian"},
            {id:"tra_1614", v3id:"6140", name: "富源", estring: "fuyuan", sect: "hualian"},
            {id:"tra_1616", v3id:"6130", name: "瑞穗", estring: "ruisui", sect: "hualian"},
            {id:"tra_1617", v3id:"6120", name: "三民", estring: "sanmin", sect: "hualian"},
            {id:"tra_1619", v3id:"6110", name: "玉里", estring: "yuli", sect: "hualian", big: 'e'},
            {id:"tra_1621", v3id:"6100", name: "東里", estring: "dongli", sect: "hualian"},
            {id:"tra_1622", v3id:"6090", name: "東竹", estring: "dongzhu", sect: "hualian"},
            {id:"tra_1623", v3id:"6080", name: "富里", estring: "fuli", sect: "hualian"},
            {id:"tra_1624", v3id:"6070", name: "池上", estring: "chishang", sect: "taidong"},
            {id:"tra_1625", v3id:"6060", name: "海端", estring: "haiduan", sect: "taidong"},
            {id:"tra_1626", v3id:"6050", name: "關山", estring: "guanshan", sect: "taidong"},
            {id:"tra_1628", v3id:"6040", name: "瑞和", estring: "ruihe", sect: "taidong"},
            {id:"tra_1629", v3id:"6030", name: "瑞源", estring: "ruiyuan", sect: "taidong"},
            {id:"tra_1630", v3id:"6020", name: "鹿野", estring: "luye", sect: "taidong"},
            {id:"tra_1631", v3id:"6010", name: "山里", estring: "shanli", sect: "taidong"},
            {id:"tra_1632", v3id:"6000", name: "台東", estring: "taitungtaidong", sect: "taidong", big: 'es'},
            //海線及南迴線臨時資料
            
            {id:"tra_1102", v3id:"2110", name: "談文", sect: "miaoli"},
            {id:"tra_1104", v3id:"2120", name: "大山", sect: "miaoli"},
            {id:"tra_1105", v3id:"2130", name: "後龍", sect: "miaoli"},
            {id:"tra_1106", v3id:"2140", name: "龍港", sect: "miaoli"},
            {id:"tra_1107", v3id:"2150", name: "白沙屯", sect: "miaoli"},
            {id:"tra_1108", v3id:"2160", name: "新埔", sect: "miaoli"},
            {id:"tra_1109", v3id:"2170", name: "通霄", sect: "miaoli"},
            {id:"tra_1110", v3id:"2180", name: "苑裡", sect: "miaoli"},
            {id:"tra_1111", v3id:"2190", name: "日南", sect: "taichung"},
            {id:"tra_1112", v3id:"2200", name: "大甲", sect: "taichung"},
            {id:"tra_1113", v3id:"2210", name: "臺中港", sect: "taichung"},
            {id:"tra_1114", v3id:"2220", name: "清水", sect: "taichung"},
            {id:"tra_1115", v3id:"2230", name: "沙鹿", sect: "taichung"},
            {id:"tra_1116", v3id:"2240", name: "龍井", sect: "taichung"},
            {id:"tra_1117", v3id:"2250", name: "大肚", sect: "taichung"},
            {id:"tra_1118", v3id:"2260", name: "追分", sect: "taichung"},
            
            {id:"tra_1502", v3id:"5130", name: "加祿", sect: "pingdong"},
            {id:"tra_1503", v3id:"5140", name: "內獅", sect: "pingdong"},
            {id:"tra_1504", v3id:"5160", name: "枋山", sect: "pingdong"},
            {id:"tra_1507", v3id:"5180", name: "古莊", sect: "taidong"},
            {id:"tra_1508", v3id:"5190", name: "大武", sect: "taidong"},
            {id:"tra_1510", v3id:"5200", name: "瀧溪", sect: "taidong"},
            {id:"tra_1512", v3id:"5210", name: "金崙", sect: "taidong"},
            {id:"tra_1514", v3id:"5220", name: "太麻里", sect: "taidong"},
            {id:"tra_1516", v3id:"5230", name: "知本", sect: "taidong"},
            {id:"tra_1517", v3id:"5240", name: "康樂", sect: "taidong"},
            //海線及南迴線臨時資料
            {id:"tra_2003", v3id:"7362", name:"八斗子", estring:"badouzi", sect:"northeast"},
            {id:"tra_6103", v3id:"7361", name:"海科館", estring:"haikeguan", sect:"northeast"},
            {id:"tra_1903", v3id:"7331", name:"大華", estring:"dahua", sect:"northeast"},
            {id:"tra_1904", v3id:"7332", name:"十分", estring:"shifenshihfen", sect:"northeast"},
            {id:"tra_1905", v3id:"7333", name:"望古", estring:"wanggu", sect:"northeast"},
            {id:"tra_1906", v3id:"7334", name:"嶺腳", estring:"lingjiao", sect:"northeast"},
            {id:"tra_1907", v3id:"7335", name:"平溪", estring:"pingxipingsi", sect:"northeast"},
            {id:"tra_1908", v3id:"7336", name:"菁桐", estring:"jingtong", sect:"northeast"},
            {id:"tra_2212", v3id:"1191", name:"千甲", estring:"qianjia", sect:"hsinchu"},
            {id:"tra_2213", v3id:"1192", name:"新莊", estring:"xinzhuang", sect:"hsinchu"},
            {id:"tra_2203", v3id:"1193", name:"竹中", estring:"zhuzhong", sect:"hsinchu"},
            {id:"tra_2214", v3id:"1194", name:"六家", estring:"liujia", sect:"hsinchu"},
            {id:"tra_2204", v3id:"1201", name:"上員", estring:"shangyuan", sect:"hsinchu"},
            {id:"tra_2211", v3id:"1202", name:"榮華", estring:"ronghua", sect:"hsinchu"},
            {id:"tra_2205", v3id:"1203", name:"竹東", estring:"zhudong", sect:"hsinchu"},
            {id:"tra_2206", v3id:"1204", name:"橫山", estring:"zhuzhong", sect:"hsinchu"},
            {id:"tra_2207", v3id:"1205", name:"九讚頭", estring:"jiouzantou", sect:"hsinchu"},
            {id:"tra_2208", v3id:"1206", name:"合興", estring:"hexinghesing", sect:"hsinchu"},
            {id:"tra_2209", v3id:"1207", name:"富貴", estring:"fuguei", sect:"hsinchu"},
            {id:"tra_2210", v3id:"1208", name:"內灣", estring:"neiwan", sect:"hsinchu"},
            {id:"tra_2702", v3id:"3431", name:"源泉", estring:"yuanciyuanyuanquan", sect:"changhua"},
            {id:"tra_2703", v3id:"3432", name:"濁水", estring:"zhuoshuijhoushuei", sect:"changhua"},
            {id:"tra_2704", v3id:"3433", name:"龍泉", estring:"longquanlungcyuan", sect:"changhua"},
            {id:"tra_2705", v3id:"3434", name:"集集", estring:"jiji", sect:"changhua"},
            {id:"tra_2706", v3id:"3435", name:"水里", estring:"shuilishueili", sect:"changhua"},
            {id:"tra_2707", v3id:"3436", name:"車埕", estring:"checheng", sect:"changhua"},
            {id:"tra_5101", v3id:"4271", name:"長榮大學", estring:"changrongdaxuechangjungchristianuniversity", sect:"tainan"},
            {id:"tra_5102", v3id:"4272", name:"沙崙", estring:"shalun", sect:"tainan"}
        ],
        line: [
            {
                v2LineID: 'TL-N', v3LineID: 'WL',
                id: "tra_xibu",
                name: "西部幹線(基隆-竹南)",
                trainSect: ["keelung", "taipei", "taoyuan", "hsinchu"],
                color: "#000050",
                dir: "1",
                area: 'w',
                link: {
                    "tra_yilan": {station: "tra_1002", dir: "0"},
                    "tra_shan": {station: "tra_1028", dir: "1"},
                    "tra_hai": {station: "tra_1028", dir: "1"},
                    "tra_liujia": {station: "tra_1025", dir: "0"}
                },
                station: ["tra_1001","tra_1029","tra_1002","tra_1003","tra_1030","tra_1004","tra_1005","tra_1031","tra_1006","tra_1007","tra_1008","tra_1009","tra_1011","tra_1032","tra_1012","tra_1034","tra_1013","tra_1014",//taipei
                    "tra_1015","tra_1016","tra_1017","tra_1018","tra_1019","tra_1020","tra_1036","tra_1033","tra_1021","tra_1022","tra_1023","tra_1024","tra_1025","tra_1035","tra_1026","tra_1027","tra_1028"]
            }, {
                v2LineID: 'TL-M', v3LineID: 'WL',
                id: "tra_shan",
                name: "山線(竹南-彰化)",
                trainSect: ["hsinchu", "miaoli", "taichung", "changhua"],
                color: "#104020",
                dir: "1",
                area: 'w',
                link: {
                    "tra_xibu": {station: "tra_1028", dir: "0"},
                    "tra_zhjy": {station: "tra_1120", dir: "1"}
                },
                station: ["tra_1028","tra_1302","tra_1304","tra_1305","tra_1307","tra_1308","tra_1310","tra_1314","tra_1315","tra_1317", "tra_1325",
                    "tra_1318","tra_1326","tra_1327","tra_1323","tra_1328","tra_1319","tra_1329","tra_1322","tra_1320","tra_1324","tra_1321","tra_1120"]
            }, {
                v2LineID: 'TL-S', v3LineID: 'WL',
                id: "tra_zhjy",
                name: "西部幹線(彰化-嘉義)",
                trainSect: ["changhua", "yunlin", "chiayi"],
                color: "#707010",
                dir: "1",
                area: 'w',
                link: {
                    "tra_shan": {station: "tra_1120", dir: "0"},
                    "tra_hai": {station: "tra_1120", dir: "0"},
                    "tra_jiji": {station: "tra_1207", dir: "1"},
                    "tra_jygx": {station: "tra_1215", dir: "1"}
                },
                station: ["tra_1120","tra_1202","tra_1240","tra_1203","tra_1204","tra_1205","tra_1206","tra_1207","tra_1208","tra_1209","tra_1210","tra_1211","tra_1212","tra_1213","tra_1214","tra_1241","tra_1215"]
            }, {
                v2LineID: 'TL-S', v3LineID: 'WL',
                id: "tra_jygx",
                name: "西部幹線(嘉義-高雄)",
                trainSect: ["chiayi", "tainan", "kaohsiung"],
                color: "#302040",
                dir: "1",
                area: 'w',
                link: {
                    "tra_zhjy": {station: "tra_1215", dir: "0"},
                    "tra_pingdong": {station: "tra_1238", dir: "1"},
                    "tra_shalun": {station: "tra_1230", dir: "1"}
                },
                station: ["tra_1215","tra_1217","tra_1218","tra_1219","tra_1220","tra_1221","tra_1222","tra_1223","tra_1224","tra_1225","tra_1244","tra_1226","tra_1227","tra_1239","tra_1228",
                    "tra_1229","tra_1243","tra_1230","tra_1231","tra_1232","tra_1233","tra_1234","tra_1235","tra_1242","tra_1236","tra_1245","tra_1246","tra_1237","tra_1247","tra_1238"]
            }, {
                v2LineID: 'PL', v3LineID: 'WL|SL',
                id: "tra_pingdong",
                name: "屏東線",
                trainSect: ["kaohsiung", "pingdong"],
                color: "#7D3810",
                dir: "1",
                area: 'w',
                innerNeedTransAt: 'tra_1411',
                link: {
                    "tra_jygx": {station: "tra_1238", dir: "0"}
                },
                station: ["tra_1238","tra_1419","tra_1420","tra_1421","tra_1402","tra_1403","tra_1404","tra_1405","tra_1406","tra_1407","tra_1408","tra_1409",
                    "tra_1410","tra_1411","tra_1412","tra_1413","tra_1414","tra_1415","tra_1416","tra_1417","tra_1418"]
            }, {
                v2LineID: 'YL', v3LineID: 'EL|SU',
                id: "tra_yilan",
                name: "宜蘭線",
                trainSect: ["taipei", "keelung", "northeast", "yilan"],
                color: "#500000",
                dir: "0",
                area: 'e',
                link: {
                    "tra_xibu": {station: "tra_1002", dir: "1"},
                    "tra_beihui": {station: "tra_1826", dir: "0"},
                    "tra_pingxi": {station: "tra_1804", dir: "0"}
                },
                //commonCrossLineStation: ["tra_1012","tra_1032","tra_1011","tra_1009","tra_1008","tra_1007","tra_1006","tra_1031","tra_1005","tra_1004","tra_1030","tra_1003"],
                station: ["tra_1002","tra_1802","tra_1803","tra_1804","tra_1805","tra_1806","tra_1807","tra_1808","tra_1809","tra_1810",//taipei
                    "tra_1811","tra_1812","tra_1813","tra_1814","tra_1815","tra_1816","tra_1817","tra_1818","tra_1819","tra_1820","tra_1821","tra_1822","tra_1823","tra_1824","tra_1825","tra_1826","tra_1827"]
            }, {
                v2LineID: 'NL', v3LineID: 'EL',
                id: "tra_beihui",
                name: "北迴線(蘇澳-花蓮)",
                trainSect: ["taipei", "keelung", "northeast","yilan","beihui","hualian"],
                color: "#004060",
                dir: "0",
                area: 'e',
                link: {
                    "tra_yilan": {station: "tra_1826", dir: "1"},
                    "tra_huadong": {station: "tra_1715", dir: "0"}
                },
                station: ["tra_1826","tra_1703","tra_1704","tra_1705","tra_1706","tra_1708","tra_1709","tra_1710","tra_1711","tra_1712","tra_1713","tra_1714","tra_1715"]
            }, {
                v2LineID: 'TT', v3LineID: 'EL',
                id: "tra_huadong",
                name: "台東線",
                trainSect: ["taipei", "keelung", "northeast","yilan","beihui","hualian","taidong"],
                color: "#605040",
                dir: "0",
                area: 'e',
                link: {
                    "tra_beihui": {station: "tra_1715", dir: "1"}
                },
                station: ["tra_1715","tra_1602","tra_1604","tra_1605","tra_1606","tra_1607","tra_1608","tra_1609","tra_1610","tra_1611","tra_1612","tra_1613","tra_1614","tra_1616","tra_1617","tra_1619",
                    "tra_1621","tra_1622","tra_1623","tra_1624","tra_1625","tra_1626","tra_1628","tra_1629","tra_1630","tra_1631","tra_1632"]
            }, {
                v2LineID: 'TL-C', v3LineID: 'WL-C',
                id: "tra_hai",
                name: "海線",
                trainSect: ["miaoli","taichung"],
                color: "#2050C0",
                dir: "1",
                area: 'w',
                link: {
                    "tra_xibu": {station: "tra_1028", dir: "0"},
                    "tra_zhjy": {station: "tra_1120", dir: "1"}
                },
                station: ["tra_1028","tra_1102","tra_1104","tra_1105","tra_1106","tra_1107","tra_1108","tra_1109","tra_1110","tra_1111","tra_1112","tra_1113","tra_1114","tra_1115","tra_1116","tra_1117","tra_1118","tra_1120"]
            }, {
                v2LineID: 'PX|SA', v3LineID: 'PX|SA',
                id: "tra_pingxi",
                name: "平溪線",
                trainSect: ["northeast"],
                color: "#003030",
                dir: "0",
                area: 'e',
                protectStation: ["tra_1804"],
                link: {
                    "tra_yilan": {station: "tra_1804", dir: "1"}
                },
                station: ["tra_2003","tra_6103","tra_1804","tra_1805","tra_1806","tra_1903","tra_1904","tra_1905","tra_1906","tra_1907","tra_1908"]
            }, {
                v2LineID: 'NW|LJ', v3LineID: 'NW|LJ',
                id: "tra_liujia",
                name: "內灣／六家線",
                trainSect: ["hsinchu"],
                color: "#403090",
                dir: "0",
                area: 'w',
                protectStation: ["tra_1024","tra_1025"],
                protectStationSect: {
                    "tra_1024": "taoyuan,hsinchu"
                },
                subWorkingArea: {
                    transAt: "tra_2203",
                    transStationID: "zhuzhongtra1",
                    station: ["tra_2204","tra_2211","tra_2205","tra_2206","tra_2207","tra_2208","tra_2209","tra_2210"]
                },
                link: {
                    "tra_xibu": {station: "tra_1025", dir: "1"}
                },
                station: ["tra_1025","tra_1024","tra_2212","tra_2213","tra_2203","tra_2214","tra_2204","tra_2211","tra_2205","tra_2206","tra_2207","tra_2208","tra_2209","tra_2210"]
            }, {
                v2LineID: 'JJ', v3LineID: 'JJ',
                id: "tra_jiji",
                name: "集集線",
                trainSect: ["changhua"],
                color: "#22A050",
                dir: "1",
                area: 'w',
                link: {
                    "tra_zhjy": {station: "tra_1207", dir: "0"}
                },
                station: ["tra_1207","tra_2702","tra_2703","tra_2704","tra_2705","tra_2706","tra_2707"]
            }, {
                v2LineID: 'SH', v3LineID: 'SH',
                id: "tra_shalun",
                name: "沙崙線",
                trainSect: ["tainan"],
                color: "#124060",
                dir: "1",
                area: 'w',
                protectStation: ["tra_1230"],
                link: {
                    "tra_jygx": {station: "tra_1230", dir: "0"}
                },
                station: ["tra_1230","tra_5101","tra_5102"]
            }
        ],
        running_ary: [{
            id: 'eTemu', cate: 'express', CarClass: ['1107','1102'], dir: '0', area: 'e', range: ['tra_1012','tra_1632'], name: '東部幹線太魯閣號、普悠瑪號',
            rangeSplit: 'tra_1715',
            lineOf: ['tra_xibu','tra_yilan','tra_beihui','tra_huadong'],
            mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007', 'tra_1715', 'tra_1619', 'tra_1632'],
            maybeStop: ['tra_1006','tra_1003','tra_1820','tra_1823','tra_1606','tra_1610','tra_1612','tra_1616','tra_1626'],
            lessStop: ['tra_1002','tra_1804', 'tra_1816', 'tra_1818','tra_1712','tra_1602','tra_1604','tra_1611','tra_1623','tra_1624','tra_1630']
        }, {
            id: 'eZi', cate: 'express', CarClass: ['1100','1101','1103','1108','1109','110A','110B','110C','110D','110E','110F'], dir: '0', area: 'e', range: ['tra_1012','tra_1632'], name: '東部幹線自強號',
            rangeSplit: 'tra_1715',
            lineOf: ['tra_xibu','tra_yilan','tra_beihui','tra_huadong'],
            mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007','tra_1820','tra_1823', 'tra_1715', 'tra_1619', 'tra_1632'],
            maybeStop: ['tra_1003','tra_1804','tra_1816','tra_1818','tra_1826','tra_1705','tra_1712','tra_1602','tra_1604','tra_1611','tra_1623','tra_1624','tra_1630'],
            lessStop: ['tra_1009','tra_1006','tra_1005','tra_1002','tra_1808','tra_1810','tra_1709']
        }, {
            id: 'eJv', cate: 'express', CarClass: ['1110','11111','1114','1115'], dir: '0', area: 'e', range: ['tra_1012','tra_1632'], name: '東部幹線莒光號',
            rangeSplit: 'tra_1715',
            lineOf: ['tra_xibu','tra_yilan','tra_beihui','tra_huadong'],
            mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007','tra_1804','tra_1816','tra_1818','tra_1820','tra_1823', 'tra_1715', 'tra_1619', 'tra_1632'],
            maybeStop: ['tra_1005','tra_1003','tra_1826','tra_1705','tra_1712','tra_1602','tra_1604','tra_1611','tra_1623','tra_1624','tra_1630'],
            lessStop: ['tra_1009','tra_1002','tra_1805','tra_1808','tra_1810','tra_1704','tra_1709','tra_1607','tra_1621','tra_1622']
        }, {//西部對號
            id: 'wZi', cate: 'express', CarClass: ['1100','1101','1103','1108','1109','110A','110B','110C','110D','110E','110F'], dir: '1', area: 'w', range: ['tra_1003','tra_1411'], name: '西部幹線自強號',
            lineOf: ['tra_xibu','tra_shan','tra_zhjy','tra_jygx','tra_pingdong'],
            mustStop: ['tra_1003','tra_1007','tra_1008','tra_1011','tra_1015','tra_1017','tra_1025','tra_1305','tra_1317','tra_1319','tra_1120','tra_1210','tra_1215','tra_1228','tra_1242','tra_1238','tra_1402','tra_1406','tra_1411'],
            maybeStop: ['tra_1005','tra_1028','tra_1203','tra_1206','tra_1211','tra_1220','tra_1404'],
            lessStop: ['tra_1006','tra_1012','tra_1214','tra_1225','tra_1227','tra_1233']
        }, {
            id: 'wJv', cate: 'express', CarClass: ['1110','11111','1114','1115'], dir: '1', area: 'w', range: ['tra_1003','tra_1411'], name: '西部幹線莒光號',
            lineOf: ['tra_xibu','tra_hai','tra_zhjy','tra_jygx','tra_pingdong'],
            mustStop: ['tra_1003','tra_1005','tra_1007','tra_1008','tra_1011','tra_1012','tra_1015','tra_1017','tra_1019','tra_1021','tra_1025','tra_1028',
                'tra_1105', 'tra_1109', 'tra_1110', 'tra_1112', 'tra_1114', 'tra_1115',
                'tra_1120','tra_1203','tra_1206','tra_1210','tra_1211','tra_1215','tra_1220','tra_1223','tra_1225','tra_1228','tra_1233','tra_1242','tra_1238','tra_1402','tra_1406','tra_1411'],
            maybeStop: ['tra_1023','tra_1207','tra_1213','tra_1214','tra_1227','tra_1404'],
            lessStop: ['tra_1014','tra_1107','tra_1117','tra_1214','tra_1226','tra_1231','tra_1232']
        }, {//南迴線對號
            id: 'sZi', cate: 'express', CarClass: ['1100','1101','1103','1108','1109','110A','110B','110C','110D','110E','110F'], dir: '1', area: 's', range: ['tra_1242','tra_1632'], name: '南迴線自強號',
            lineOf: ['tra_jygx','tra_pingdong'],
            mustStop: ['tra_1242', 'tra_1238','tra_1402','tra_1406','tra_1411','tra_1418','tra_1508','tra_1514','tra_1516','tra_1632'],
            maybeStop: ['tra_1413','tra_1415','tra_1512'],
            lessStop: ['tra_1404','tra_1510','tra_1517']
        }, {
            id: 'sJvFu', cate: 'express', CarClass: ['1110','11111','1114','1115','1120'], dir: '1', area: 's', range: ['tra_1242','tra_1632'], name: '南迴線莒光號、復興號',
            lineOf: ['tra_jygx','tra_pingdong'],
            mustStop: ['tra_1242', 'tra_1238','tra_1402','tra_1406','tra_1411','tra_1418','tra_1508','tra_1512','tra_1514','tra_1516','tra_1632'],
            maybeStop: ['tra_1404','tra_1413','tra_1415','tra_1510','tra_1517'],
            lessStop: []
        }, {
            id: 'eLocal1', cate: 'local', CarClass: ['1131'], dir: '0', area: 'e', range: ['tra_1012','tra_1827'], name: '宜蘭線區間車', stopAll: true,
            lineOf: ['tra_xibu','tra_yilan']
        }, {
            id: 'eLocal2', cate: 'local', CarClass: ['1131'], dir: '0', area: 'e', range: ['tra_1820','tra_1715'], name: '北迴線區間車', stopAll: true,
            lineOf: ['tra_yilan','tra_beihui']
        }, {
            id: 'eLocal3', cate: 'local', CarClass: ['1131'], dir: '0', area: 'e', range: ['tra_1715','tra_1632'], name: '臺東線區間車', stopAll: true, maybeStop: ['tra_1608'],//當stopAll 時 maybeStop 表示為不一定停靠
            lineOf: ['tra_huadong']
        }, {
            id: 'wLocal1', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1001','tra_1025'], name: '基隆新竹段區間車', stopAll: true,
            lineOf: ['tra_xibu']
        }, {
            id: 'wLocal2', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1025','tra_1120'], name: '山線區間車', stopAll: true,
            lineOf: ['tra_xibu','tra_shan']
        }, {
            id: 'wLocal3', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1025','tra_1120'], name: '海線區間車', stopAll: true,
            lineOf: ['tra_xibu','tra_hai']
        }, {
            id: 'wLocal4', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1120','tra_1215'], name: '彰化嘉義段區間車', stopAll: true,
            lineOf: ['tra_zhjy']
        }, {
            id: 'wLocal5', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1215','tra_1411'], name: '嘉義潮州段區間車', stopAll: true,
            lineOf: ['tra_jygx','tra_pingdong']
        }, {
            id: 'wLocal6', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1411','tra_1418'], name: '潮州枋寮段區間車', stopAll: true,
            lineOf: ['tra_pingdong']
        }, {
            id: 'sLocal', cate: 'local', CarClass: ['1131'], dir: '1', area: 's', range: ['tra_1418','tra_1632'], name: '南迴線區間車', stopAll: true,
            lineOf: ['']
        }, {
            id: 'subPX', cate: 'local', CarClass: ['1150','1131'], dir: '0', area: 'e', range: ['tra_2003','tra_1908'], name: '平溪線', stopAll: true,
            lineOf: ['tra_pingxi']
        }, {
            id: 'subLJ', cate: 'local', CarClass: ['1131'], dir: '0', area: 'w', range: ['tra_1025','tra_2214'], name: '六家線', stopAll: true,
            lineOf: ['tra_liujia']
        }, {
            id: 'subNW', cate: 'local', CarClass: ['1150','1131'], dir: '0', area: 'w', range: ['tra_2203','tra_2210'], name: '內灣線', stopAll: true,
            lineOf: ['tra_liujia']
        }, {
            id: 'subJJ', cate: 'local', CarClass: ['1150','1131'], dir: '1', area: 'w', range: ['tra_1207','tra_2707'], name: '集集線', stopAll: true,
            lineOf: ['tra_jiji']
        }, {
            id: 'subSL', cate: 'local', CarClass: ['1150','1131'], dir: '1', area: 'w', range: ['tra_1228','tra_5102'], name: '沙崙線', stopAll: true,
            lineOf: ['tra_jygx','tra_shalun']
        }]
    },

    //================ 以下為轉乘用途資料，非 PTX 資料 ===============================
    
    transStation: [
            {
                id: 'taidongtra1', name: "台東",
                changeLine: ["tra_huadong", "tra_huadong"],
                changeStation: ['tra_1632','tra_1632'],
                walkMinute: 4
            }, {
                id: 'yulitra1', name: "玉里",
                changeLine: ["tra_huadong", "tra_huadong"],
                changeStation: ['tra_1619','tra_1619'],
                walkMinute: 4
            }, {
                id: 'hualiantra1', name: "花蓮",
                changeLine: ["tra_beihui", "tra_huadong"],
                changeStation: ['tra_1715','tra_1715'],
                walkMinute: 4
            }, {
                id: 'xingcheng', name: "新城",
                changeLine: ["tra_beihui", "tra_beihui"],
                changeStation: ['tra_1712','tra_1712'],
                walkMinute: 2
            }, {
                id: 'nanaotra1', name: "南澳",
                changeLine: ["tra_beihui", "tra_beihui"],
                changeStation: ['tra_1705','tra_1705'],
                walkMinute: 2
            }, {
                id: 'suaoxintra1', name: "蘇澳新",
                changeLine: ["tra_yilan", "tra_beihui"],
                changeStation: ['tra_1826','tra_1826'],
                walkMinute: 4
            }, {
                id: 'luodongtra1', name: "羅東",
                changeLine: ["tra_yilan", "tra_yilan"],
                changeStation: ['tra_1823','tra_1823'],
                walkMinute: 4
            }, {
                id: 'yilantra1', name: "宜蘭",
                changeLine: ["tra_yilan", "tra_yilan"],
                changeStation: ['tra_1820','tra_1820'],
                walkMinute: 4
            }, {
                id: 'toucheng1', name: "頭城",
                changeLine: ["tra_yilan", "tra_yilan"],
                changeStation: ['tra_1816','tra_1816'],
                walkMinute: 4
            }, {
                id: 'ruifangtra1', name: "瑞芳",
                changeLine: ["tra_yilan", "tra_pingxi"],
                changeStation: ['tra_1804','tra_1804'],
                walkMinute: 4
            }, {
                id: 'badutra1', name: "八堵",
                changeLine: ["tra_xibu", "tra_yilan"],
                changeStation: ['tra_1002','tra_1002'],
                walkMinute: 3
            }, {
                id: 'qidutra1', name: "七堵",
                changeLine: ["tra_xibu", "tra_xibu"],
                changeStation: ['tra_1003','tra_1003'],
                walkMinute: 3
            }, {
                id: 'songshantra1', name: "松山",
                changeLine: ["tra_xibu", "tra_xibu"],
                changeStation: ['tra_1007','tra_1007'],
                walkMinute: 3
            }, {
                id: 'taipeitra1', name: "台北",
                changeLine: ["tra_xibu", "tra_xibu"],
                changeStation: ['tra_1008','tra_1008'],
                walkMinute: 3
            }, {
                id: 'banqiaotra1', name: "板橋",
                changeLine: ["tra_xibu", "tra_xibu"],
                changeStation: ['tra_1011','tra_1011'],
                walkMinute: 3
            }, {
                id: 'taoyuantra1', name: "桃園",
                changeLine: ["tra_xibu", "tra_xibu"],
                changeStation: ['tra_1015','tra_1015'],
                walkMinute: 3
            }, {
                id: 'zhonglitra1', name: "中壢",
                changeLine: ["tra_xibu", "tra_xibu"],
                changeStation: ['tra_1017','tra_1017'],
                walkMinute: 3
            }, {
                id: 'northhsinchutra1', name: "北新竹",
                changeLine: ["tra_xibu", "tra_liujia"],
                changeStation: ['tra_1024','tra_1024'],
                walkMinute: 4
            }, {
                id: 'hsinchutra1', name: "新竹",
                changeLine: ["tra_xibu", "tra_liujia"],
                changeStation: ['tra_1025','tra_1025'],
                walkMinute: 4
            }, {
                id: 'zhunantra1', name: "竹南",
                changeLine: ["tra_xibu", "tra_shan"],
                changeStation: ['tra_1028','tra_1028'],
                walkMinute: 3
            }, {
                id: 'zhunantra2', name: "竹南", changeLine: ["tra_xibu", "tra_hai"], changeStation: ['tra_1028','tra_1028'], walkMinute: 3
            }, {
                id: 'zhunantra3', name: "竹南", changeLine: ["tra_shan", "tra_hai"], changeStation: ['tra_1028','tra_1028'], walkMinute: 3
            }, {
                id: 'miaolitra1', name: "苗栗",
                changeLine: ["tra_shan", "tra_shan"],
                changeStation: ['tra_1305','tra_1305'],
                walkMinute: 4
            }, {
                id: 'fengyuantra1', name: "豐原",
                changeLine: ["tra_shan", "tra_shan"],
                changeStation: ['tra_1317','tra_1317'],
                walkMinute: 4
            }, {
                id: 'taizhongtra1', name: "台中",
                changeLine: ["tra_shan", "tra_shan"],
                changeStation: ['tra_1319','tra_1319'],
                walkMinute: 4
            }, {
                id: 'zhanghuatra1', name: "彰化",
                changeLine: ["tra_shan", "tra_zhjy"],
                changeStation: ['tra_1120','tra_1120'],
                walkMinute: 4
            }, {
                id: 'zhanghuatra2', name: "彰化", changeLine: ["tra_hai", "tra_zhjy"], changeStation: ['tra_1120','tra_1120'], walkMinute: 4
            }, {
                id: 'zhanghuatra3', name: "彰化", changeLine: ["tra_shan", "tra_hai"], changeStation: ['tra_1120','tra_1120'], walkMinute: 4
            }, {
                id: 'yuanlintra1', name: "員林",
                changeLine: ["tra_zhjy", "tra_zhjy"],
                changeStation: ['tra_1203','tra_1203'],
                walkMinute: 4
            }, {
                id: 'douliutra1', name: "斗六",
                changeLine: ["tra_zhjy", "tra_zhjy"],
                changeStation: ['tra_1210','tra_1210'],
                walkMinute: 4
            }, {
                id: 'jiayitra1', name: "嘉義",
                changeLine: ["tra_zhjy", "tra_jygx"],
                changeStation: ['tra_1215','tra_1215'],
                walkMinute: 4
            }, {
                id: 'xinyingtra1', name: "新營",
                changeLine: ["tra_jygx", "tra_jygx"],
                changeStation: ['tra_1220','tra_1220'],
                walkMinute: 4
            }, {
                id: 'tainantra1', name: "台南",
                changeLine: ["tra_jygx", "tra_shalun"],
                changeStation: ['tra_1228','tra_1228'],
                walkMinute: 4
            }, {
                id: 'zhongzhoutra1', name: "中洲",
                changeLine: ["tra_jygx", "tra_shalun"],
                changeStation: ['tra_1230','tra_1230'],
                walkMinute: 4
            }, {
                id: 'gangshantra1', name: "岡山",
                changeLine: ["tra_jygx", "tra_jygx"],
                changeStation: ['tra_1233','tra_1233'],
                walkMinute: 4
            }, {
                id: 'gaoxungtra1', name: "高雄",
                changeLine: ["tra_jygx", "tra_pingdong"],
                changeStation: ['tra_1238','tra_1238'],
                walkMinute: 4
            }, {
                id: 'fongshantra1', name: "鳳山",
                changeLine: ["tra_pingdong", "tra_pingdong"],
                changeStation: ['tra_1402','tra_1402'],
                walkMinute: 1
            }, {
                id: 'pingdongtra1', name: "屏東",
                changeLine: ["tra_pingdong", "tra_pingdong"],
                changeStation: ['tra_1406','tra_1406'],
                walkMinute: 1
            }, {
                id: 'chaozhoutra1', name: "潮州",
                changeLine: ["tra_pingdong", "tra_pingdong"],
                changeStation: ['tra_1411','tra_1411'],
                walkMinute: 1
            }, {
                id: 'holongtra1', name: "後龍",
                changeLine: ["tra_hai", "tra_hai"],
                changeStation: ['tra_1105','tra_1105'],
                walkMinute: 1
            }, {
                id: 'tongxiaotra1', name: "通霄",
                changeLine: ["tra_hai", "tra_hai"],
                changeStation: ['tra_1109','tra_1109'],
                walkMinute: 1
            }, {
                id: 'yuanlitra1', name: "苑裡",
                changeLine: ["tra_hai", "tra_hai"],
                changeStation: ['tra_1110','tra_1110'],
                walkMinute: 1
            }, {
                id: 'dajiatra1', name: "大甲",
                changeLine: ["tra_hai", "tra_hai"],
                changeStation: ['tra_1112','tra_1112'],
                walkMinute: 1
            }, {
                id: 'qingshuitra1', name: "清水",
                changeLine: ["tra_hai", "tra_hai"],
                changeStation: ['tra_1114','tra_1114'],
                walkMinute: 1
            }, {
                id: 'shalutra1', name: "沙鹿",
                changeLine: ["tra_hai", "tra_hai"],
                changeStation: ['tra_1115','tra_1115'],
                walkMinute: 1
            }, {
                id: 'zhuzhongtra1', name: "竹中",
                changeLine: ["tra_liujia", "tra_liujia"],
                changeStation: ['tra_2203','tra_2203'],
                walkMinute: 3
            }, {
                id: 'nangang1', name: "南港",
                changeLine: ["tra_xibu", "trtc_5"],
                changeStation: ['tra_1006','trtc_097'],
                video: {
                    "tra_1006": {width:420, height:315, src:'https://www.youtube.com/embed/AIQETgZdBKM'},
                    "trtc_097": {width:420, height:315, src:'https://www.youtube.com/embed/HNBdfyBxMa8'}
                },
                walkMinute: 5
            }, {
                id: 'songshan1', name: "松山",
                changeLine: ["tra_xibu", "trtc_3"],
                changeStation: ['tra_1007','trtc_111'],
                video: {
                    "tra_1007": {width:420, height:315, src:'https://www.youtube.com/embed/CFX9EdLwT9A'},
                    "trtc_111": {width:420, height:315, src:'https://www.youtube.com/embed/64ADnwMTLyQ'}
                },
                walkMinute: 6
            }, {
                id: 'ximen1', name: "西門",
                changeLine: ["trtc_5", "trtc_3"],
                changeStation: ['trtc_086','trtc_086'],
                walkMinute: 1
            }, {
                id: 'zhongshan1', name: "中山",
                changeLine: ["trtc_3", "trtc_2"],
                changeStation: ['trtc_053','trtc_053'],
                walkMinute: 2
            }, {
                id: 'taipei1', name: "台北",
                changeLine: ["tra_xibu", "trtc_5"],
                changeStation: ['tra_1008','trtc_051'],
                walkMinute: 7
            }, {
                id: 'taipei2', name: "台北",
                changeLine: ["tra_xibu", "trtc_2"],
                changeStation: ['tra_1008','trtc_051'],
                walkMinute: 4
            }, {
                id: 'taipei3', name: "台北",
                changeLine: ["trtc_5", "trtc_2"],
                changeStation: ['trtc_051','trtc_051'],
                walkMinute: 3
            }, {
                id: 'taipei4', name: "台北",//機捷台鐵
                changeLine: ["tra_xibu", "tymetro_1"],
                changeStation: ['tra_1008','tymetro_a01'],
                video: {
                    "tra_1008": {width:420, height:315, src:'https://www.youtube.com/embed/dxfIJJ0b_3o'},
                    "tymetro_a01": {width:420, height:315, src:'https://www.youtube.com/embed/ulOu7N85QRo'}
                },
                walkMinute: 7
            }, {
                id: 'taipei5', name: "台北",//機捷淡水線
                changeLine: ["trtc_2", "tymetro_1"],
                changeStation: ['trtc_051','tymetro_a01'],
                video: {
                    "trtc_2": {width:420, height:315, src:'https://www.youtube.com/embed/gq7FJbhUN7U'},
                    "tymetro_a01": {width:420, height:315, src:'https://www.youtube.com/embed/A6PPO4zqxJI'}
                },
                walkMinute: 12
            }, {
                id: 'taipei6', name: "台北",//機捷板南線
                changeLine: ["trtc_5", "tymetro_1"],
                changeStation: ['trtc_051','tymetro_a01'],
                video: {
                    "trtc_5": {width:420, height:315, src:'https://www.youtube.com/embed/n7FgZ1-sDyk'},
                    "tymetro_a01": {width:420, height:315, src:'https://www.youtube.com/embed/uaLbpXkDiX4'}
                },
                walkMinute: 11
            }, {
                id: 'taipei7', name: "北門",//機捷松山線
                changeLine: ["trtc_3", "tymetro_1"],
                changeStation: ['trtc_105','tymetro_a01'],
                video: {
                    "trtc_105": {width:420, height:315, src:'https://www.youtube.com/embed/X_sjsSHqsoU'},
                    "tymetro_a01": {width:420, height:315, src:'https://www.youtube.com/embed/g5nm5Sbn6bw'}
                },
                walkMinute: 11
            }, {
                id: 'sanchong1', name: "三重",//機捷新莊線
                changeLine: ["trtc_4", "tymetro_1"],
                changeStation: ['trtc_125','tymetro_a02'],
                walkMinute: 7
            }, {
                id: 'cksmh1', name: "中正紀念堂",
                changeLine: ["trtc_3", "trtc_2"],
                changeStation: ['trtc_042','trtc_042'],
                walkMinute: 1
            }, {
                id: 'banqiao1', name: "板橋",
                changeLine: ["tra_xibu", "trtc_5"],
                changeStation: ['tra_1011','trtc_082'],
                walkMinute: 7
            }, {
                id: 'mqxl1', name: "民權西路",
                changeLine: ["trtc_2", "trtc_4"],
                changeStation: ['trtc_055','trtc_055'],
                walkMinute: 3
            }, {
                id: 'dongmen1', name: "東門",
                changeLine: ["trtc_2", "trtc_4"],
                changeStation: ['trtc_134','trtc_134'],
                walkMinute: 1
            }, {
                id: 'guting1', name: "古亭",
                changeLine: ["trtc_3", "trtc_4"],
                changeStation: ['trtc_041','trtc_041'],
                walkMinute: 1
            }, {
                id: 'zhongxiaoxs1', name: "忠孝新生",
                changeLine: ["trtc_5", "trtc_4"],
                changeStation: ['trtc_089','trtc_089'],
                walkMinute: 2
            }, {
                id: 'sjnanjing1', name: "松江南京",
                changeLine: ["trtc_3", "trtc_4"],
                changeStation: ['trtc_132','trtc_132'],
                walkMinute: 2
            }, {
                id: 'daqiaotou1', name: "大橋頭",
                changeLine: ["trtc_4", "trtc_4"],
                changeStation: ['trtc_128','trtc_128'],
                walkMinute: 1
            }, {
                id: 'changgengyiyuan1', name: "長庚醫院",
                changeLine: ["tymetro_1", "tymetro_1"],
                changeStation: ['tymetro_a08','tymetro_a08'],
                walkMinute: 0
            }
    ],
    routeMap: [
        {
            id: 'traInnerTrans_tra_xibu,tra_jygx',
            fromToLine: ["tra_xibu","tra_jygx"],
            sect: ['keelung','taipei','taoyuan','hsinchu','chiayi','tainan','kaohsiung'],
            route: [
                {
                    line: ["tra_xibu", "tra_jygx"],
                    transStation: ["qidutra1"]
                },
                {
                    line: ["tra_xibu", "tra_jygx"],
                    transStation: ["songshantra1"]
                },
                {
                    line: ["tra_xibu", "tra_jygx"],
                    transStation: ["taipeitra1"]
                },
                {
                    line: ["tra_xibu", "tra_jygx"],
                    transStation: ["banqiaotra1"]
                },
                {
                    line: ["tra_xibu", "tra_jygx"],
                    transStation: ["taoyuantra1"]
                },
                {
                    line: ["tra_xibu", "tra_jygx"],
                    transStation: ["zhonglitra1"]
                },
                {
                    line: ["tra_xibu", "tra_jygx"],
                    transStation: ["hsinchutra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["jiayitra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["xinyingtra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["tainantra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["gangshantra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["gaoxungtra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_xibu,tra_zhjy',
            fromToLine: ["tra_xibu","tra_zhjy"],
            sect: ['keelung','taipei','taoyuan','hsinchu','changhua','yunlin','chiayi'],
            route: [
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["qidutra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["songshantra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["taipeitra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["banqiaotra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["taoyuantra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["zhonglitra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["hsinchutra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["zhunantra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["zhanghuatra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["yuanlintra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["douliutra1"]
                },
                {
                    line: ["tra_xibu", "tra_zhjy"],
                    transStation: ["jiayitra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_xibu,tra_shan',
            fromToLine: ["tra_xibu","tra_shan"],
            sect: ['keelung','taipei','taoyuan','hsinchu','miaoli','taichung','changhua'],
            route: [
                {
                    line: ["tra_xibu", "tra_xibu"],
                    transStation: ["qidutra1"]
                },
                {
                    line: ["tra_xibu", "tra_xibu"],
                    transStation: ["songshantra1"]
                },
                {
                    line: ["tra_xibu", "tra_xibu"],
                    transStation: ["taipeitra1"]
                },
                {
                    line: ["tra_xibu", "tra_xibu"],
                    transStation: ["banqiaotra1"]
                },
                {
                    line: ["tra_xibu", "tra_xibu"],
                    transStation: ["taoyuantra1"]
                },
                {
                    line: ["tra_xibu", "tra_xibu"],
                    transStation: ["zhonglitra1"]
                },
                {
                    line: ["tra_xibu", "tra_xibu"],
                    transStation: ["hsinchutra1"]
                },
                {
                    line: ["tra_xibu", "tra_shan"],
                    transStation: ["zhunantra1"]
                },
                {
                    line: ["tra_xibu", "tra_shan"],
                    transStation: ["miaolitra1"]
                },
                {
                    line: ["tra_xibu", "tra_shan"],
                    transStation: ["fengyuantra1"]
                },
                {
                    line: ["tra_xibu", "tra_shan"],
                    transStation: ["taizhongtra1"]
                },
                {
                    line: ["tra_xibu", "tra_shan"],
                    transStation: ["zhanghuatra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_shan,tra_zhjy',
            fromToLine: ["tra_shan","tra_zhjy"],
            sect: ['miaoli','taichung','changhua','yunlin','chiayi'],
            route: [
                {
                    line: ["tra_shan", "tra_shan"],
                    transStation: ["miaolitra1"]
                },
                {
                    line: ["tra_shan", "tra_shan"],
                    transStation: ["fengyuantra1"]
                },
                {
                    line: ["tra_shan", "tra_shan"],
                    transStation: ["taizhongtra1"]
                },
                {
                    line: ["tra_shan", "tra_zhjy"],
                    transStation: ["zhanghuatra1"]
                },
                {
                    line: ["tra_shan", "tra_zhjy"],
                    transStation: ["yuanlintra1"]
                },
                {
                    line: ["tra_shan", "tra_zhjy"],
                    transStation: ["douliutra1"]
                },
                {
                    line: ["tra_shan", "tra_zhjy"],
                    transStation: ["jiayitra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_shan,tra_jygx',
            fromToLine: ["tra_shan","tra_jygx"],
            sect: ['miaoli','taichung','changhua','chiayi','tainan','kaohsiung'],
            route: [
                {
                    line: ["tra_shan", "tra_shan"],
                    transStation: ["miaolitra1"]
                },
                {
                    line: ["tra_shan", "tra_shan"],
                    transStation: ["fengyuantra1"]
                },
                {
                    line: ["tra_shan", "tra_shan"],
                    transStation: ["taizhongtra1"]
                },
                {
                    line: ["tra_shan", "tra_jygx"],
                    transStation: ["zhanghuatra1"]
                },
                {
                    line: ["tra_shan", "tra_jygx"],
                    transStation: ["jiayitra1"]
                },
                {
                    line: ["tra_shan", "tra_jygx"],
                    transStation: ["xinyingtra1"]
                },
                {
                    line: ["tra_shan", "tra_jygx"],
                    transStation: ["tainantra1"]
                },
                {
                    line: ["tra_shan", "tra_jygx"],
                    transStation: ["gangshantra1"]
                },
                {
                    line: ["tra_shan", "tra_jygx"],
                    transStation: ["gaoxungtra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_zhjy,tra_jygx',
            fromToLine: ["tra_zhjy","tra_jygx"],
            sect: ['changhua','yunlin','chiayi','tainan','kaohsiung'],
            route: [
                {
                    line: ["tra_zhjy", "tra_zhjy"],
                    transStation: ["zhanghuatra1"]
                },
                {
                    line: ["tra_zhjy", "tra_zhjy"],
                    transStation: ["yuanlintra1"]
                },
                {
                    line: ["tra_zhjy", "tra_zhjy"],
                    transStation: ["douliutra1"]
                },
                {
                    line: ["tra_zhjy", "tra_jygx"],
                    transStation: ["jiayitra1"]
                },
                {
                    line: ["tra_zhjy", "tra_jygx"],
                    transStation: ["xinyingtra1"]
                },
                {
                    line: ["tra_zhjy", "tra_jygx"],
                    transStation: ["tainantra1"]
                },
                {
                    line: ["tra_zhjy", "tra_jygx"],
                    transStation: ["gangshantra1"]
                },
                {
                    line: ["tra_zhjy", "tra_jygx"],
                    transStation: ["gaoxungtra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_jygx,tra_pingdong',
            fromToLine: ["tra_jygx","tra_pingdong"],
            sect: ['chiayi','tainan','kaohsiung','pingdong'],
            route: [
                {
                    line: ["tra_jygx", "tra_pingdong"],
                    transStation: ["gaoxungtra1"]
                },
                {
                    line: ["tra_pingdong", "tra_pingdong"],
                    transStation: ["fongshantra1"]
                },
                {
                    line: ["tra_pingdong", "tra_pingdong"],
                    transStation: ["chaozhoutra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_pingdong',
            fromToLine: ["tra_pingdong","tra_pingdong"],
            sect: ['kaohsiung','pingdong'],
            route: [
                {
                    line: ["tra_pingdong", "tra_pingdong"],
                    transStation: ["chaozhoutra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_yilan,tra_beihui',
            fromToLine: ["tra_yilan","tra_beihui"],
            sect: ['northeast','yilan','beihui','hualian'],
            route: [
                {
                    line: ["tra_beihui", "tra_beihui"],
                    transStation: ["hualiantra1"]
                },
                {
                    line: ["tra_yilan", "tra_beihui"],
                    transStation: ["suaoxintra1"]
                },
                {
                    line: ["tra_yilan", "tra_yilan"],
                    transStation: ["luodongtra1"]
                },
                {
                    line: ["tra_yilan", "tra_yilan"],
                    transStation: ["yilantra1"]
                },
                {
                    line: ["tra_yilan", "tra_yilan"],
                    transStation: ["ruifangtra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_yilan,tra_huadong',
            fromToLine: ["tra_yilan","tra_huadong"],
            sect: ['northeast','yilan','beihui','hualian','taidong'],
            route: [
                {
                    line: ["tra_huadong", "tra_huadong"],
                    transStation: ["taidongtra1"]
                },
                {
                    line: ["tra_huadong", "tra_huadong"],
                    transStation: ["yulitra1"]
                },
                {
                    line: ["tra_beihui", "tra_huadong"],
                    transStation: ["hualiantra1"]
                },
                {
                    line: ["tra_yilan", "tra_beihui"],
                    transStation: ["suaoxintra1"]
                },
                {
                    line: ["tra_yilan", "tra_yilan"],
                    transStation: ["luodongtra1"]
                },
                {
                    line: ["tra_yilan", "tra_yilan"],
                    transStation: ["yilantra1"]
                },
                {
                    line: ["tra_yilan", "tra_yilan"],
                    transStation: ["ruifangtra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_beihui,tra_huadong',
            fromToLine: ["tra_beihui","tra_huadong"],
            sect: ['yilan','beihui','hualian','taidong'],
            route: [
                {
                    line: ["tra_huadong", "tra_huadong"],
                    transStation: ["taidongtra1"]
                },
                {
                    line: ["tra_huadong", "tra_huadong"],
                    transStation: ["yulitra1"]
                },
                {
                    line: ["tra_beihui", "tra_huadong"],
                    transStation: ["hualiantra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_yilan,tra_pingxi',
            fromToLine: ["tra_yilan","tra_pingxi"],
            fromToLineReg: [
                "^tra_pingxi$",
                "^tra_yilan$|^tra_beihui$|^tra_huadong$"
            ],
            sect: ['northeast','yilan','beihui','hualian','taidong'],
            route: [
                {
                    line: ["tra_yilan", "tra_pingxi"],
                    transStation: ["ruifangtra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_xibu,tra_yilan',
            fromToLine: ["tra_xibu","tra_yilan"],
            fromToLineReg: [
                "^tra_xibu$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_shalun$",
                "^tra_yilan$|^tra_beihui$|^tra_huadong$"
            ],
            sect: ['kaohsiung','tainan','chiayi','yunlin','changhua','taichung','miaoli','hsinchu','taoyuan','taipei','keelung','northeast','yilan','beihui','hualian','taidong'],
            route: [
                {
                    line: ["tra_xibu", "tra_yilan"],
                    transStation: ["banqiaotra1"]
                },
                {
                    line: ["tra_xibu", "tra_yilan"],
                    transStation: ["taipeitra1"]
                },
                {
                    line: ["tra_xibu", "tra_yilan"],
                    transStation: ["songshantra1"]
                },
                {
                    line: ["tra_xibu", "tra_yilan"],
                    transStation: ["qidutra1"]
                },
                {
                    line: ["tra_xibu", "tra_yilan"],
                    transStation: ["badutra1"]
                }
            ]
        /*}, {
            id: 'traInnerTrans_tra_xibu,tra_beihui',
            fromToLine: ["tra_xibu","tra_beihui"],
            sect: ['taoyuan','taipei','keelung','northeast','yilan','beihui','hualian'],
            route: [
                {
                    line: ["tra_xibu", "tra_beihui"],
                    transStation: ["banqiaotra1"]
                },
                {
                    line: ["tra_xibu", "tra_beihui"],
                    transStation: ["taipeitra1"]
                },
                {
                    line: ["tra_xibu", "tra_beihui"],
                    transStation: ["songshantra1"]
                },
                {
                    line: ["tra_xibu", "tra_beihui"],
                    transStation: ["qidutra1"]
                },
                {
                    line: ["tra_xibu", "tra_beihui"],
                    transStation: ["badutra1"]
                }
            ]*/
        }, {
            id: 'traInnerTrans_tra_shan,tra_pingxi',
            fromToLine: ["tra_shan","tra_pingxi"],
            fromToLineReg: [
                "^tra_shan$|^tra_zhjy$|^tra_jygx$",
                "^tra_pingxi$"
            ],
            sect: ['northeast','miaoli','taichung','changhua','yunlin','chiayi','tainan','kaohsiung'],
            route: [
                {
                    line: ["tra_shan", "tra_pingxi"],
                    transStation: ["banqiaotra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_xibu,tra_pingxi',
            fromToLine: ["tra_xibu","tra_pingxi"],
            fromToLineReg: [
                "^tra_xibu$|^tra_shan$|^tra_zhjy$|^tra_jygx$",
                "^tra_pingxi$"
            ],
            sect: ['hsinchu','taoyuan','taipei','keelung','northeast'],
            route: [
                {
                    line: ["tra_yilan", "tra_pingxi"],
                    transStation: ["ruifangtra1"]
                },
                {
                    line: ["tra_xibu", "tra_yilan" ,"tra_pingxi"],
                    transStation: ["banqiaotra1", "ruifangtra1"]
                },
                {
                    line: ["tra_xibu", "tra_yilan" ,"tra_pingxi"],
                    transStation: ["taipeitra1", "ruifangtra1"]
                },
                {
                    line: ["tra_xibu", "tra_yilan" ,"tra_pingxi"],
                    transStation: ["songshantra1", "ruifangtra1"]
                },
                {
                    line: ["tra_xibu", "tra_yilan" ,"tra_pingxi"],
                    transStation: ["qidutra1", "ruifangtra1"]
                },
                {
                    line: ["tra_xibu", "tra_yilan" ,"tra_pingxi"],
                    transStation: ["badutra1", "ruifangtra1"]
                },
                {
                    line: ["tra_shan", "tra_yilan" ,"tra_pingxi"],
                    transStation: ["banqiaotra1", "ruifangtra1"]
                },
                {
                    line: ["tra_zhjy", "tra_yilan" ,"tra_pingxi"],
                    transStation: ["banqiaotra1", "ruifangtra1"]
                },
                {
                    line: ["tra_jygx", "tra_yilan" ,"tra_pingxi"],
                    transStation: ["banqiaotra1", "ruifangtra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_xibu,tra_liujia',
            fromToLine: ["tra_xibu","tra_liujia"],
            sect: ['hsinchu','taoyuan','taipei','keelung','northeast'],
            route: [
                {
                    line: ["tra_xibu", "tra_liujia"],
                    transStation: ["hsinchutra1"]
                },
                {
                    line: ["tra_xibu", "tra_liujia"],
                    transStation: ["northhsinchutra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_shan,tra_liujia',
            fromToLine: ["tra_shan","tra_liujia"],
            fromToLineReg: [
                "^tra_shan$|^tra_zhjy$|^tra_jygx$",
                "^tra_liujia$"
            ],
            sect: ['hsinchu','miaoli','taichung','changhua','yunlin','chiayi','tainan','kaohsiung'],
            route: [
                {
                    line: ["tra_xibu", "tra_liujia"],
                    transStation: ["hsinchutra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_yilan,tra_liujia',
            fromToLine: ["tra_yilan","tra_liujia"],
            fromToLineReg: [
                "^tra_liujia$",
                "^tra_yilan$|^tra_beihui$|^tra_huadong$"
            ],
            sect: ['hsinchu','yilan','northeast','beihui','hualian','taidong'],
            route: [
                {
                    line: ["tra_yilan", "tra_xibu"],
                    transStation: ["banqiaotra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_jygx,tra_shalun',
            fromToLine: ["tra_jygx","tra_shalun"],
            sect: ['chiayi','tainan','kaohsiung'],
            route: [
                {
                    line: ["tra_jygx", "tra_shalun"],
                    transStation: ["zhongzhoutra1"]
                },
                {
                    line: ["tra_jygx", "tra_shalun"],
                    transStation: ["tainantra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_xibu,tra_shalun',
            fromToLine: ["tra_xibu","tra_shalun"],
            fromToLineReg: [
                "^tra_xibu$|^tra_shan$|^tra_zhjy$",
                "^tra_shalun$"
            ],
            sect: ['northeast','keelung','taipei','taoyuan','hsinchu','miaoli','taichung','changhua','yunlin','chiayi','tainan'],
            route: [
                {
                    line: ["tra_xibu", "tra_shalun"],
                    transStation: ["tainantra1"]
                }
            ]
        }, {//TRA sub line to sub line
            id: 'traInnerTrans_tra_pingxi,tra_liujia',
            fromToLine: ["tra_pingxi","tra_liujia"],
            sect: ['hsinchu','northeast'],
            route: [
                {
                    line: ["tra_pingxi", "tra_xibu", "tra_yilan" ,"tra_liujia"],
                    transStation: ["ruifangtra1", "banqiaotra1", "hsinchutra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_pingxi,tra_shalun',
            fromToLine: ["tra_pingxi","tra_shalun"],
            sect: ['northeast','tainan'],
            route: [
                {
                    line: ["tra_pingxi", "tra_yilan", "tra_xibu" ,"tra_shalun"],
                    transStation: ["ruifangtra1", "banqiaotra1", "tainantra1"]
                }
            ]
        }, {
            id: 'traInnerTrans_tra_liujia,tra_shalun',
            fromToLine: ["tra_liujia","tra_shalun"],
            sect: ['hsinchu','tainan'],
            route: [
                {
                    line: ["tra_liujia", "tra_xibu","tra_shalun"],
                    transStation: ["hsinchutra1", "tainantra1"]
                }
            ]
        }, {//TRA to TRTC
            id: 'tra_xibu,trtc_3',
            fromToLine: ["tra_xibu","trtc_3"],
            sect: ['taipei','keelung','taoyuan','hsinchu'],
            route: [
                {
                    bypassStationReg: '^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$',
                    line: ["tra_xibu", "trtc_3"],
                    transStation: ["songshan1"]
                },
                {
                    bypassStationReg: '^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$',
                    line: ["tra_xibu", "trtc_2", "trtc_3"],
                    transStation: ["taipei2", "zhongshan1"]
                },
                {
                    line: ["tra_xibu", "trtc_5", "trtc_3"],
                    transStation: ["banqiao1", "ximen1"]
                },
                {
                    bypassStationReg: '^trtc_111$|^trtc_110$|^trtc_109$|^trtc_009$|^trtc_132$|^trtc_053$|^trtc_105$|^trtc_086$',
                    line: ["tra_xibu", "trtc_2", "trtc_3"],
                    transStation: ["taipei2", "cksmh1"]
                }
            ]
        }, {
            id: 'tra_xibu,trtc_5',
            fromToLine: ["tra_xibu","trtc_5"],
            sect: ['taipei','keelung','taoyuan','hsinchu'],
            route: [
                {
                    bypassStationReg: '^trtc_08[0-2]$|^trtc_07[6-9]$',
                    line: ["tra_xibu", "trtc_5"],
                    transStation: ["nangang1"]
                },
                {
                    line: ["tra_xibu", "trtc_5"],
                    transStation: ["taipei1"]
                },
                {
                    bypassStationReg: '^trtc_031$|^trtc_097$|^trtc_096$',
                    line: ["tra_xibu", "trtc_5"],
                    transStation: ["banqiao1"]
                }
            ]
        }, {
            id: 'tra_xibu,trtc_2',
            fromToLine: ["tra_xibu","trtc_2"],
            sect: ['taipei','keelung','taoyuan','hsinchu'],
            route: [
                {
                    line: ["tra_xibu", "trtc_2"],
                    transStation: ["taipei2"]
                }
            ]
        }, {
            id: 'tra_xibu,trtc_4',
            fromToLine: ["tra_xibu","trtc_4"],
            sect: ['taipei','keelung','taoyuan','hsinchu'],
            route: [
                {
                    bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                    line: ["tra_xibu", "trtc_2", "trtc_4"],
                    transStation: ["taipei2", "dongmen1"]
                },
                {
                    bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
                    line: ["tra_xibu", "trtc_2", "trtc_4"],
                    transStation: ["taipei2", "mqxl1"]
                },
                {
                    bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                    line: ["tra_xibu", "trtc_2", "trtc_3", "trtc_4"],
                    transStation: ["taipei2", "cksmh1", "guting1"]
                },
                {
                    bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
                    line: ["tra_xibu", "trtc_3", "trtc_4"],
                    transStation: ["songshan1","sjnanjing1"]
                }
            ]
        }, {//TRA to TTYMETRO
            id: 'tra_xibu,tymetro_1',
            fromToLine: ["tra_xibu","tymetro_1"],
            sect: ['taipei','keelung','taoyuan','hsinchu'],
            route: [
                {
                    line: ["tra_xibu", "tymetro_1"],
                    transStation: ["taipei4"]
                }
            ]
        }, {
        //TRTC inner trans
            id: 'trtc_5,trtc_2',
            fromToLine: ["trtc_5","trtc_2"],
            sect: ['taipei'],
            route: [
                {
                    line: ["trtc_5", "trtc_2"],
                    transStation: ["taipei3"]
                },
                {
                    bypassBothStationReg: '^trtc_08[8-9]$|^trtc_010$|^trtc_09[1-7]$|^trtc_031$|^trtc_05[1-9]$|^trtc_06[0-9]$|^trtc_07[0-1]$',
                    line: ["trtc_5", "trtc_3", "trtc_2"],
                    transStation: ["ximen1", "cksmh1"]
                }
            ]
        }, {
            id: 'trtc_4,trtc_2',
            fromToLine: ["trtc_4","trtc_2"],
            sect: ['taipei'],
            route: [
                {
                    bypassBothStationReg: '^trtc_05[0-4]$|^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                    line: ["trtc_4", "trtc_2"],
                    transStation: ["dongmen1"]
                },
                {
                    bypassBothStationReg: '^trtc_05[0-4]$|^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
                    line: ["trtc_4", "trtc_2"],
                    transStation: ["mqxl1"]
                },
                {
                    bypassBothStationReg: '^trtc_05[0-4]$|^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                    line: ["trtc_4", "trtc_3", "trtc_2"],
                    transStation: ["guting1", "cksmh1"]
                }
            ]
        }, {
            id: 'trtc_3,trtc_2',
            fromToLine: ["trtc_3","trtc_2"],
            sect: ['taipei'],
            route: [
                {
                    bypassBothStationReg: '^trtc_105$|^trtc_132$|^trtc_009$|^trtc_11[0-1]$|^trtc_109$|^trtc_05[0-9]$|^trtc_06[0-9]$|^trtc_07[0-1]$',
                    line: ["trtc_3", "trtc_2"],
                    transStation: ["cksmh1"]
                },
                {
                    bypassStationReg: '^trtc_04[0-3]$|^trtc_03[2-9]$',
                    line: ["trtc_3", "trtc_2"],
                    transStation: ["zhongshan1"]
                }
            ]
        }, {
            id: 'trtc_3,trtc_5',
            fromToLine: ["trtc_3","trtc_5"],
            sect: ['taipei'],
            route: [
                {
                    line: ["trtc_3", "trtc_5"],
                    transStation: ["ximen1"]
                },
                {
                    bypassStationReg: '^trtc_07[6-9]$|^trtc_08[0-9]$|^trtc_09[1-5]$|^trtc_05[1-3]$|^trtc_010$|^trtc_03[2-9]$|^trtc_04[0-3]$|^trtc_132$',
                    line: ["trtc_3", "tra_xibu", "trtc_5"],
                    transStation: ["songshan1", "nangang1"]
                }
            ]
        }, {
            id: 'trtc_4,trtc_5',
            fromToLine: ["trtc_4","trtc_5"],
            sect: ['taipei'],
            route: [
                {
                    line: ["trtc_4", "trtc_5"],
                    transStation: ["zhongxiaoxs1"]
                },
                {
                    bypassBothStationReg: '^trtc_08[8-9]$|^trtc_010$|^trtc_09[1-7]$|^trtc_031$|^trtc_051$|^trtc_055$|^trtc_13[0-2]$|^trtc_12[1-8]$|^trtc_17[4-9]$|^trtc_180$',
                    line: ["trtc_4", "trtc_3", "trtc_5"],
                    transStation: ["guting1", "ximen1"]
                }
            ]
        }, {
            id: 'trtc_3,trtc_4',
            fromToLine: ["trtc_3","trtc_4"],
            sect: ['taipei'],
            route: [
                {
                    bypassBothStationReg: '^trtc_009$|^trtc_109$|^trtc_11[0-1]$|^trtc_105$|^trtc_053$|^trtc_055$|^trtc_13[0-2]$|^trtc_12[1-8]$|^trtc_17[4-9]$|^trtc_180$',
                    line: ["trtc_3", "trtc_4"],
                    transStation: ["guting1"]
                },
                {
                    bypassBothStationReg: '^trtc_04[5-8]$|^trtc_105$|^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$|^trtc_134$|^trtc_089$',
                    line: ["trtc_3", "trtc_4"],
                    transStation: ["sjnanjing1"]
                }
            ]
        }, {
            id: 'trtc_4,trtc_4',
            fromToLine: ["trtc_4","trtc_4"],
            sect: ['taipei'],
            route: [
                {
                    line: ["trtc_4", "trtc_4"],
                    transStation: ["daqiaotou1"]
                }
            ]
        }, {//TYMETRO to TRTC
            id: 'tymetro_1,trtc_3',
            fromToLine: ["tymetro_1","trtc_3"],
            sect: ['taipei','taoyuan'],
            route: [
                {
                    line: ["tymetro_1", "trtc_3"],
                    transStation: ["taipei7"]
                },
                {
                    bypassStationReg: '^trtc_111$|^trtc_110$|^trtc_109$|^trtc_009$|^trtc_132$|^trtc_105$|^trtc_086$',
                    line: ["tymetro_1", "trtc_2", "trtc_3"],
                    transStation: ["taipei5", "cksmh1"]
                }
            ]
        }, {
            id: 'tymetro_1,trtc_5',
            fromToLine: ["tymetro_1","trtc_5"],
            sect: ['taipei','taoyuan'],
            route: [
                {
                    line: ["tymetro_1", "trtc_5"],
                    transStation: ["taipei6"]
                }
            ]
        }, {
            id: 'tymetro_1,trtc_2',
            fromToLine: ["tymetro_1","trtc_2"],
            sect: ['taipei','taoyuan'],
            route: [
                {
                    line: ["tymetro_1", "trtc_2"],
                    transStation: ["taipei5"]
                }
            ]
        }, {
            id: 'tymetro_1,trtc_4',
            fromToLine: ["tymetro_1","trtc_4"],
            sect: ['taipei','taoyuan'],
            route: [
                {
                    bypassStationReg: '^trtc_17[4-8]$',
                    line: ["tymetro_1", "trtc_4"],
                    transStation: ["sanchong1"]
                },
                {
                    bypassStationReg: '^trtc_089$|^trtc_055$|^trtc_041$|^trtc_04[5-8]$|^trtc_12[1-8]$|^trtc_180$|^trtc_179$|^trtc_13[0-1]$',
                    line: ["tymetro_1", "trtc_4", "trtc_4"],
                    transStation: ["sanchong1", "daqiaotou1"]
                },
                {
                    bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                    line: ["tymetro_1", "trtc_2", "trtc_4"],
                    transStation: ["taipei5", "dongmen1"]
                },
                {
                    bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
                    line: ["tymetro_1", "trtc_2", "trtc_4"],
                    transStation: ["taipei5", "mqxl1"]
                },
                {
                    bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                    line: ["tymetro_1", "trtc_2", "trtc_3", "trtc_4"],
                    transStation: ["taipei5", "cksmh1", "guting1"]
                }
            ]
        }, {//TYMETRO Route
            id: 'tymetroInnerTrans_tymetro_1,tymetro_1',
            fromToLine: ["tymetro_1","tymetro_1"],
            sect: ['taoyuan','taipei'],
            route: [
                {
                    line: ["tymetro_1", "tymetro_1"],
                    transStation: ["changgengyiyuan1"]
                }
            ]
        }
    ],
    routeSystem: [
        {
            id: 'tra_r1',
            rType: 'direct',//direct , trans 
            company: 'tra',
            big: 'e',
            lineStr: 'tra_xibu,tra_huadong,tra_beihui,tra_yilan',
            directSect: 'taipei,keeling,northeast,yilan,beihui,hualian,taidong'
        }, {
            id: 'tra_r2',
            rType: 'direct',//direct , trans 
            company: 'tra',
            big: 'w',
            lineStr: 'tra_xibu,tra_shan,tra_zhjy,tra_jygx,tra_pingdong',
            directSect: 'keeling,taipei,taoyuan,hsinchu,miaoli,taichung,chungha,yunlin,chiayi,tainan,kaohsiung,pingdong'
        }, {
            id: 'tra_r4',
            rType: 'direct',//direct , trans 
            company: 'tra',
            big: 'w',
            lineStr: 'tra_huadong,tra_beihui,tra_yilan,tra_shan,tra_zhjy,tra_jygx,tra_pingdong',
            directSect: 'northeast,yilan,beihui,hualian,taidong,miaoli,taichung,chungha,yunlin,chiayi,tainan,kaohsiung,pingdong'
        }, {
            id: 'tra_r5',
            rType: 'direct',//direct , trans 
            company: 'tra',
            big: 'w',
            lineStr: 'tra_liujia',
            directSect: 'hsinchu'
        }, {
            id: 'tra_r6',
            rType: 'direct',//direct , trans 
            company: 'tra',
            big: 'w',
            lineStr: 'tra_shalun,tra_jygx',
            directSect: 'tainan'
        }, {
            id: 'tra_route_line_map',
            rType: 'map',//Do not remove this route system , important
            company: 'tra',
            dir: "0",
            link:[
                'tra_pingdong,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_pingxi',
                'tra_pingdong,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_pingxi',
                'tra_pingdong,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong',
                'tra_pingdong,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong',
                'tra_jiji,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong',
                'tra_jiji,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong',
                'tra_shalun,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong',
                'tra_shalun,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong'
            ]
        }, {
            id: 'tra_west_east_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_xibu,tra_yilan,tra_beihui,tra_huadong',
            lineInclude: [
                ['tra_xibu','tra_shan','tra_zhjy','tra_jygx','tra_liujia','tra_shalun','tra_jiji'],
                ['tra_yilan','tra_beihui','tra_huadong','tra_pingxi']
            ],
            rule: [
                {
                    line: ['tra_jygx','tra_zhjy','tra_shan','tra_yilan','tra_beihui','tra_huadong','tra_pingxi'],
                    sect: ['taoyuan','hsinchu','miaoli','taichung','changhua','yunlin','chiayi','tainan','kaohsiung','pingdong'],
                    station: ["tra_1032","tra_1012","tra_1013","tra_1014"],
                    transStation: 'banqiaotra1'
                }, {
                    line: ['tra_yilan','tra_beihui','tra_huadong','tra_pingxi'],
                    station: ["tra_1009","tra_1006","tra_1031","tra_1005","tra_1004"],
                    transStation: 'songshantra1'
                }, {
                    line: ['tra_yilan','tra_beihui','tra_huadong','tra_pingxi'],
                    station: ["tra_1031","tra_1005","tra_1004","tra_1030","tra_1002","tra_1029","tra_1001"],
                    transStation: 'qidutra1'
                }, {
                    line: ['tra_yilan','tra_beihui','tra_huadong','tra_pingxi'],
                    station: ["tra_1030","tra_1003","tra_1029","tra_1001"],
                    transStation: 'badutra1'
                }, {
                    line: ['tra_shalun','tra_pingxi'],
                    station: ["tra_1228"],
                    transStation: 'tainantra1'
                }
                
            ]
        }, {
            id: 'tra_xibu_shan_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_xibu,tra_shan',
            lineInclude: [
                ['tra_xibu','tra_liujia'],
                ['tra_shan']
            ],
            rule: [
                {
                    line: ['tra_shan'],
                    sect: ['keelung'],
                    transStation: 'qidutra1'
                }, {
                    line: ['tra_shan'],
                    station: ["tra_1004","tra_1005","tra_1031","tra_1006"],
                    transStation: 'songshantra1'
                }, {
                    line: ['tra_shan'],
                    station: ["tra_1009","tra_1032","tra_1012","tra_1013"],
                    transStation: 'banqiaotra1'
                }, {
                    line: ['tra_shan'],
                    station: ["tra_1012","tra_1013","tra_1014"],
                    transStation: 'taoyuantra1'
                }, {
                    line: ['tra_shan'],
                    station: ["tra_1016","tra_1018"],
                    transStation: 'zhonglitra1'
                }, {
                    line: ['tra_shan'],
                    station: ["tra_1019","tra_1020","tra_1036"],
                    sect: ['hsinchu'],
                    transStation: 'hsinchutra1'
                }, {
                    line: ['tra_xibu','tra_liujia'],
                    station: ["tra_1019","tra_1020","tra_1036"],
                    sect: ['miaoli'],
                    transStation: 'miaolitra1'
                }, {
                    line: ['tra_xibu','tra_liujia'],
                    station: ["tra_1315","tra_1318"],
                    transStation: 'fengyuantra1'
                }, {
                    line: ['tra_xibu','tra_liujia'],
                    sect: ['taichung'],
                    transStation: 'taizhongtra1'
                }
                
            ]
        }, {
            id: 'tra_xibu_zhjy_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_xibu,tra_zhjy',
            lineInclude: [
                ['tra_xibu','tra_liujia'],
                ['tra_zhjy']
            ],
            rule: [
                {
                    line: ['tra_zhjy'],
                    sect: ['keelung'],
                    transStation: 'qidutra1'
                }, {
                    line: ['tra_zhjy'],
                    station: ["tra_1004","tra_1005","tra_1031","tra_1006"],
                    transStation: 'songshantra1'
                }, {
                    line: ['tra_zhjy'],
                    station: ["tra_1009","tra_1032","tra_1012","tra_1013"],
                    transStation: 'banqiaotra1'
                }, {
                    line: ['tra_zhjy'],
                    station: ["tra_1012","tra_1013","tra_1014"],
                    transStation: 'taoyuantra1'
                }, {
                    line: ['tra_zhjy'],
                    station: ["tra_1016","tra_1018"],
                    transStation: 'zhonglitra1'
                }, {
                    line: ['tra_zhjy'],
                    station: ["tra_1019","tra_1020","tra_1036"],
                    sect: ['hsinchu'],
                    transStation: 'hsinchutra1'
                }, {
                    line: ['tra_xibu','tra_liujia'],
                    sect: ['changhua'],
                    transStation: 'zhanghuatra1'
                }, {
                    line: ['tra_xibu','tra_liujia'],
                    station: ["tra_1208","tra_1209"],
                    sect: ['changhua'],
                    transStation: 'yuanlintra1'
                }, {
                    line: ['tra_xibu','tra_liujia'],
                    sect: ['yunlin'],
                    transStation: 'douliutra1'
                }, {
                    line: ['tra_xibu','tra_liujia'],
                    sect: ['chiayi'],
                    transStation: 'jiayitra1'
                }
                
            ]
        }, {
            id: 'tra_xibu_jygx_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_xibu,tra_jygx',
            lineInclude: [
                ['tra_xibu','tra_liujia'],
                ['tra_jygx','tra_shalun']
            ],
            rule: [
                {
                    line: ['tra_jygx','tra_shalun'],
                    sect: ['keelung'],
                    transStation: 'qidutra1'
                }, {
                    line: ['tra_jygx','tra_shalun'],
                    station: ["tra_1004","tra_1005","tra_1031","tra_1006"],
                    transStation: 'songshantra1'
                }, {
                    line: ['tra_jygx','tra_shalun'],
                    station: ["tra_1009","tra_1032","tra_1012","tra_1013"],
                    transStation: 'banqiaotra1'
                }, {
                    line: ['tra_jygx','tra_shalun'],
                    station: ["tra_1012","tra_1013","tra_1014"],
                    transStation: 'taoyuantra1'
                }, {
                    line: ['tra_jygx','tra_shalun'],
                    station: ["tra_1016","tra_1018"],
                    transStation: 'zhonglitra1'
                }, {
                    line: ['tra_jygx','tra_shalun'],
                    station: ["tra_1019","tra_1020","tra_1036"],
                    sect: ['hsinchu'],
                    transStation: 'hsinchutra1'
                }, {
                    line: ['tra_xibu','tra_liujia'],
                    sect: ['chiayi'],
                    transStation: 'jiayitra1'
                }, {
                    line: ['tra_xibu','tra_liujia'],
                    sect: ['tainan'],
                    transStation: 'tainantra1'
                }, {
                    line: ['tra_xibu','tra_liujia'],
                    sect: ['kaohsiung'],
                    transStation: 'gaoxungtra1'
                }
                
            ]
        }, {
            id: 'tra_shan_zhjy_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_shan,tra_zhjy',
            lineInclude: [
                ['tra_shan'],
                ['tra_zhjy']
            ],
            rule: [
                {
                    line: ['tra_zhjy'],
                    sect: ['miaoli'],
                    transStation: 'miaolitra1'
                }, {
                    line: ['tra_zhjy'],
                    station: ["tra_1315","tra_1314","tra_1310"],
                    transStation: 'fengyuantra1'
                }, {
                    line: ['tra_zhjy'],
                    sect: ['taichung'],
                    transStation: 'taizhongtra1'
                }, {
                    line: ['tra_shan'],
                    sect: ['changhua'],
                    station: ["tra_1321","tra_1324"],
                    transStation: 'zhanghuatra1'
                }, {
                    line: ['tra_shan'],
                    sect: ['changhua'],
                    transStation: 'yuanlintra1'
                }, {
                    line: ['tra_shan'],
                    sect: ['yunlin'],
                    transStation: 'douliutra1'
                }, {
                    line: ['tra_shan'],
                    sect: ['chiayi'],
                    transStation: 'jiayitra1'
                }
            ]
        }, {
            id: 'tra_shan_jygx_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_shan,tra_jygx',
            lineInclude: [
                ['tra_shan'],
                ['tra_jygx','tra_shalun']
            ],
            rule: [
                {
                    line: ['tra_jygx','tra_shalun'],
                    sect: ['miaoli'],
                    transStation: 'miaolitra1'
                }, {
                    line: ['tra_jygx','tra_shalun'],
                    station: ["tra_1315","tra_1314","tra_1310"],
                    transStation: 'fengyuantra1'
                }, {
                    line: ['tra_jygx','tra_shalun'],
                    sect: ['taichung'],
                    transStation: 'taizhongtra1'
                }, {
                    line: ['tra_jygx','tra_shalun'],
                    sect: ['changhua'],
                    station: ["tra_1321","tra_1324"],
                    transStation: 'zhanghuatra1'
                }, {
                    line: ['tra_shan'],
                    sect: ['chiayi'],
                    transStation: 'jiayitra1'
                }, {
                    line: ['tra_shan'],
                    sect: ['tainan'],
                    transStation: 'tainantra1'
                }, {
                    line: ['tra_shan'],
                    sect: ['kaohsiung'],
                    transStation: 'gaoxungtra1'
                }
            ]
        }, {
            id: 'tra_zhjy_jygx_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_zhjy,tra_jygx',
            lineInclude: [
                ['tra_zhjy'],
                ['tra_jygx','tra_shalun']
            ],
            rule: [
                {
                    line: ['tra_jygx','tra_shalun'],
                    sect: ['changhua'],
                    transStation: 'yuanlintra1'
                }, {
                    line: ['tra_jygx','tra_shalun'],
                    sect: ['yunlin'],
                    transStation: 'douliutra1'
                }, {
                    line: ['tra_jygx','tra_shalun'],
                    sect: ['chiayi'],
                    transStation: 'jiayitra1'
                }, {
                    line: ['tra_zhjy'],
                    sect: ['tainan'],
                    transStation: 'tainantra1'
                }, {
                    line: ['tra_zhjy'],
                    sect: ['kaohsiung'],
                    transStation: 'gaoxungtra1'
                }
            ]
        }, {
            id: 'tra_xibu_shan_zhjy_pingdong_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_zhjy,tra_pingdong',
            lineInclude: [
                ['tra_xibu','tra_shan','tra_zhjy','tra_liujia'],
                ['tra_pingdong']
            ],
            rule: [
                {
                    line: ['tra_pingdong'],
                    sect: ['keelung'],
                    transStation: 'qidutra1'
                }, {
                    line: ['tra_pingdong'],
                    station: ["tra_1004","tra_1005","tra_1031","tra_1006"],
                    transStation: 'songshantra1'
                }, {
                    line: ['tra_pingdong'],
                    station: ["tra_1009","tra_1032","tra_1012","tra_1013"],
                    transStation: 'banqiaotra1'
                }, {
                    line: ['tra_pingdong'],
                    station: ["tra_1012","tra_1013","tra_1014"],
                    transStation: 'taoyuantra1'
                }, {
                    line: ['tra_pingdong'],
                    station: ["tra_1016","tra_1018"],
                    sect: ["taoyuan"],
                    transStation: 'zhonglitra1'
                }, {
                    line: ['tra_pingdong'],
                    station: ["tra_1019","tra_1020","tra_1036"],
                    sect: ['hsinchu'],
                    transStation: 'hsinchutra1'
                }, {
                    line: ['tra_pingdong'],
                    sect: ['miaoli'],
                    transStation: 'miaolitra1'
                }, {
                    line: ['tra_pingdong'],
                    sect: ['taichung'],
                    transStation: 'taizhongtra1'
                }, {
                    line: ['tra_pingdong'],
                    sect: ['changhua'],
                    transStation: 'zhanghuatra1'
                }, {
                    line: ['tra_pingdong'],
                    sect: ['changhua'],
                    transStation: 'yuanlintra1'
                }, {
                    line: ['tra_pingdong'],
                    sect: ['yunlin'],
                    transStation: 'douliutra1'
                }, {
                    line: ['tra_pingdong'],
                    sect: ['chiayi'],
                    transStation: 'jiayitra1'
                }, {
                    line: ['tra_zhjy'],
                    sect: ['kaohsiung'],
                    transStation: 'gaoxungtra1'
                }, {
                    line: ['tra_zhjy'],
                    sect: ['kaohsiung'],
                    transStation: 'fongshantra1'
                }, {
                    line: ['tra_zhjy'],
                    sect: ['pingdong'],
                    transStation: 'pingdongtra1'
                }, {
                    line: ['tra_zhjy'],
                    sect: ['pingdong'],
                    transStation: 'chaozhoutra1'
                }
            ]
        }, {
            id: 'tra_jygx_pingdong_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_jygx,tra_pingdong',
            lineInclude: [
                ['tra_jygx','tra_shalun'],
                ['tra_pingdong']
            ],
            rule: [
                {
                    line: ['tra_jygx','tra_shalun','tra_pingdong'],
                    sect: ['pingdong','kaohsiung','tainan'],
                    transStation: 'chaozhoutra1'
                }, {
                    line: ['tra_pingdong'],
                    sect: ['tainan'],
                    transStation: 'tainantra1'
                }, {
                    line: ['tra_pingdong'],
                    sect: ['kaohsiung','tainan'],
                    transStation: 'gaoxungtra1'
                }
            ]
        }, {
            id: 'tra_pingdong_inner_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_pingdong',
            lineInclude: [
                ['tra_pingdong'],
                ['tra_pingdong']
            ],
            rule: [
                {
                    line: ['tra_pingdong'],
                    sect: ['pingdong','kaohsiung'],
                    transStation: 'chaozhoutra1'
                }
            ]
        }, {
            id: 'tra_yilan_beihui_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_yilan,tra_beihui',
            lineInclude: [
                ['tra_beihui'],
                ['tra_yilan','tra_pingxi']
            ],
            rule: [
                {
                    line: ['tra_beihui'],
                    station: ["tra_1802","tra_1803","tra_1805","tra_1806"],
                    transStation: 'ruifangtra1'
                }, {
                    line: ['tra_beihui'],
                    station: ["tra_1807","tra_1808","tra_1809","tra_1810","tra_1811","tra_1812","tra_1813","tra_1814","tra_1815","tra_1816","tra_1817","tra_1818","tra_1819"],
                    transStation: 'yilantra1'
                }, {
                    line: ['tra_beihui'],
                    station: ["tra_1821","tra_1822","tra_1824","tra_1825"],
                    transStation: 'luodongtra1'
                }, {
                    line: ['tra_beihui'],
                    station: ["tra_1827","tra_1825","tra_1824"],
                    transStation: 'suaoxintra1'
                }, {
                    line: ['tra_yilan','tra_pingxi'],
                    sect: ['hualian'],
                    transStation: 'hualiantra1'
                }
                
            ]
        }, {
            id: 'tra_yilan_huadong_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_yilan,tra_huadong',
            lineInclude: [
                ['tra_huadong'],
                ['tra_yilan','tra_pingxi']
            ],
            rule: [
                {
                    line: ['tra_huadong'],
                    station: ["tra_1802","tra_1803","tra_1805","tra_1806"],
                    transStation: 'ruifangtra1'
                }, {
                    line: ['tra_huadong'],
                    station: ["tra_1807","tra_1808","tra_1809","tra_1810","tra_1811","tra_1812","tra_1813","tra_1814","tra_1815","tra_1816","tra_1817","tra_1818","tra_1819"],
                    transStation: 'yilantra1'
                }, {
                    line: ['tra_huadong'],
                    station: ["tra_1821","tra_1822","tra_1824","tra_1825"],
                    transStation: 'luodongtra1'
                }, {
                    line: ['tra_huadong'],
                    station: ["tra_1827","tra_1825","tra_1824"],
                    transStation: 'suaoxintra1'
                }, {
                    line: ['tra_yilan','tra_pingxi'],
                    sect: ['hualian'],
                    transStation: 'hualiantra1'
                }, {
                    line: ['tra_yilan','tra_pingxi'],
                    sect: ['hualian'],
                    station: ["tra_1624","tra_1625","tra_1626"],
                    transStation: 'yulitra1'
                }, {
                    line: ['tra_yilan','tra_pingxi'],
                    sect: ['taidong'],
                    transStation: 'taidongtra1'
                }
            ]
        }, {
            id: 'tra_beihui_huadong_trans',
            rType: 'trans',
            company: 'tra',
            routeMapID: 'traInnerTrans_tra_yilan,tra_huadong',
            lineInclude: [
                ['tra_huadong'],
                ['tra_beihui']
            ],
            rule: [
                {
                    line: ['tra_huadong'],
                    sect: ['beihui','hualian'],
                    transStation: 'hualiantra1'
                }
            ]
        }, {
            id: 'tymetro_1_fast_normal_trans',
            rType: 'trans',
            company: 'tymetro',
            routeMapID: 'tymetroInnerTrans_tymetro_1,tymetro_1',
            rule: [
                {
                    line: ['tymetro_1'],
                    sect: ['taoyuan','taipei'],
                    transStation: 'changgengyiyuan1'
                }
            ]
        }, {
            id: 'trtc_trans_tra_east',
            rType: 'cross',//direct , trans 
            company: ['trtc','tra'],// cross company serial
            regLine: "^trtc_1$|^trtc_2$|^trtc_3$|^trtc_4|^trtc_5$|^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$",
            lineIsSame: {
                "tra_xibu": "^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$"
            },
            link: [
                {
                    regLine: "^trtc_5|^tra_",
                    transStation: [
                        ['banqiao1','taipei1','nangang1']
                    ]
                }, {
                    regLine: "^trtc_3$|^trtc_4|^tra_",
                    transStation: [['taipei2','songshan1']]
                }, {
                    regLine: "^trtc_2$|^tra_",
                    transStation: [['taipei2']]
                }
            ],
            sect: ['hsinchu','taoyuan','taipei','keeling','northeast','yilan','beihui','hualian','taidong']
        }, {
            id: 'trtc_trans_tra_west',
            rType: 'cross',//direct , trans 
            company: ['trtc','tra'],// cross company serial
            regLine: "^trtc_1$|^trtc_2$|^trtc_3$|^trtc_4|^trtc_5$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong|^tra_shalun$|^tra_hai$|^tra_jiji$",
            lineIsSame: {
                "tra_xibu": "^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_jiji$"
            },
            link: [
                {
                    regLine: "^trtc_5|^tra_",
                    transStation: [
                        ['banqiao1','taipei1']
                    ]
                }, {
                    regLine: "^trtc_3$|^trtc_4|^tra_",
                    transStation: [['taipei2','songshan1']]
                }, {
                    regLine: "^trtc_2$|^tra_",
                    transStation: [['taipei2']]
                }
            ],
            sect: ['hsinchu','taoyuan','taipei','keeling','miaoli','taichung','changhua','yunlin','chiayi','tainan','kaohsiung','pingdong']
        }, {
        //TRA and TYMETRO trans
            id: 'tymetro_trans_tra_east',
            rType: 'cross',//direct , trans 
            company: ['tymetro','tra'],// cross company serial
            regLine: "^tymetro_1$|^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$",
            lineIsSame: {
                "tra_xibu": "^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$"
            },
            link: [
                {
                    regLine: "^tymetro_1|^tra_",
                    transStation: [
                        ['taipei4']
                    ]
                }
            ],
            sect: ['hsinchu','taoyuan','taipei','keeling','northeast','yilan','beihui','hualian','taidong']
        }, {
            id: 'tymetro_trans_tra_west',
            rType: 'cross',//direct , trans 
            company: ['tymetro','tra'],// cross company serial
            regLine: "^tymetro_1$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_hai$|^tra_jiji$",
            lineIsSame: {
                "tra_xibu": "^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_hai$|^tra_jiji$"
            },
            link: [
                {
                    regLine: "^tymetro_1|^tra_",
                    transStation: [
                        ['taipei4']
                    ]
                }
            ],
            sect: ['hsinchu','taoyuan','taipei','keeling','miaoli','taichung','changhua','yunlin','chiayi','tainan','kaohsiung','pingdong']
        }
    ]
    
}

export default pData;