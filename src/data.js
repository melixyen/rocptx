var pData = {
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
    }
}

export default pData;