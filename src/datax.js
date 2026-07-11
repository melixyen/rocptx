import trtc_line from './datax/trtc.line.json';
import krtc_line from './datax/krtc.line.json';
import tymc_line from './datax/tymc.line.json';
import ntmc_line from './datax/ntmc.line.json';
import tmrt_line from './datax/tmrt.line.json';
import klrt_line from './datax/klrt.line.json';

import trtc_station from './datax/trtc.station.json';
import krtc_station from './datax/krtc.station.json';
import tymc_station from './datax/tymc.station.json';
import ntmc_station from './datax/ntmc.station.json';
import tmrt_station from './datax/tmrt.station.json';
import klrt_station from './datax/klrt.station.json';

import trtc_transfer from './datax/trtc.transfer.json';
import krtc_transfer from './datax/krtc.transfer.json';
import ntmc_transfer from './datax/ntmc.transfer.json';

import thsr_station from './datax/thsr.station.json';

import tra_line from './datax/tra.line.json';
import tra_station from './datax/tra.station.json';
import tra_train from './datax/tra.train.json';

import afr_line from './datax/afr.line.json';
import afr_station from './datax/afr.station.json';
import afr_train from './datax/afr.train.json';
import afr_time from './datax/afr.time.json';

import rail_operator from './datax/rail.operator.json';

//import trav3_line from './datax/tra.v3.line.json';
//import trav3_station from './datax/tra.v3.station.json';
//import trav3_train from './datax/tra.v3.train.json';

function getObjID(uid) {
	//透過 uid 拆解找對應的資料，uid 格式為 {公司名}_{路線名}，例如 trtc_R 為台北捷運紅線
	if (/^TRA-|^TRTC-|^TMRT-|^KRTC-|^TYMC-|^NTMC-|^KLRT-|^THSR-/.test(uid)) {
		if (/^TRA-/.test(uid)) uid = uid.replace(/^TRA-/, 'tra_');
		else if (/^TRTC-/.test(uid)) uid = uid.replace(/^TRTC-/, 'trtc_');
		else if (/^TMRT-/.test(uid)) uid = uid.replace(/^TMRT-/, 'tmrt_');
		else if (/^KRTC-/.test(uid)) uid = uid.replace(/^KRTC-/, 'krtc_');
		else if (/^TYMC-/.test(uid)) uid = uid.replace(/^TYMC-/, 'tymc_');
		else if (/^NTMC-/.test(uid)) uid = uid.replace(/^NTMC-/, 'ntmc_');
		else if (/^KLRT-/.test(uid)) uid = uid.replace(/^KLRT-/, 'klrt_');
		else if (/^THSR-/.test(uid)) uid = uid.replace(/^THSR-/, 'thsr_');
	}
	let ary = uid.split('_');
	let companyTag = ary[0];
	let id = uid.replace(companyTag + '_', '');
	return {
		company: companyTag,
		id: id
	}
}

const datax = {
	trtc: {
		line: trtc_line,
		station: trtc_station,
		transfer: trtc_transfer
	},
	tmrt: {
		line: tmrt_line,
		station: tmrt_station
	},
	klrt: {
		line: klrt_line,
		station: klrt_station
	},
	krtc: {
		line: krtc_line,
		station: krtc_station,
		transfer: krtc_transfer
	},
	tymc: {
		line: tymc_line,
		station: tymc_station
	},
	ntmc: {
		line: ntmc_line,
		station: ntmc_station,
		transfer: ntmc_transfer
	},
	thsr: {
		station: thsr_station
	},
	tra: {
		line: tra_line,
		station: tra_station,
		train: tra_train
	},
	afr: {
		line: afr_line,
		station: afr_station,
		train: afr_train,
		time: afr_time
	},
	rail: {
		operator: rail_operator
	},
	getLine: function (uid) {
		let objA = getObjID(uid);
		if (arguments.length == 2) {
			objA = { company: arguments[0], id: arguments[1] }
		}
		if (!this[objA.company]) throw 'Company ' + objA.company + ' is not defined. Error on datax.js getLine';
		let lineAry = this[objA.company].line;
		return lineAry.find((c) => c.LineID == objA.id);
	},
	getStation: function (uid) {
		let objA = getObjID(uid);
		if (arguments.length == 2) {
			objA = { company: arguments[0], id: arguments[1] }
		}
		if (!this[objA.company]) throw 'Company ' + objA.company + ' is not defined. Error on datax.js getStation';
		let stAry = this[objA.company].station;
		return stAry.find((c) => c.StationID == objA.id);
	},
	//========== 外部資料（out_data/）按需載入接口 ==========
	//大體積資料（票價 fare、時刻表 time）不打包進 library，存放於 out_data/（打包時 clone 至 dist/out_data/）。
	//檔名格式 {company}.{pack}.json，載入後掛到 datax[company][pack]。

	//把一筆外部資料塞進 datax，fileName 例：'tra.fare' 或 'tra.fare.json'
	attachData: function (fileName, data) {
		let ary = fileName.replace(/\.json$/, '').split('.');
		let company = ary[0], pack = ary[1];
		if (!company || !pack) throw 'attachData fileName 格式應為 {company}.{pack}';
		if (!this[company]) this[company] = {};
		this[company][pack] = data;
		return this;
	},
	//以 URL 載入（web / Node 18+ 皆可，使用全域 fetch）
	//baseURL 例：'https://melixyen.github.io/rocptx/dist/out_data'
	//list 例：['tra.fare', 'thsr.time']
	loadOutDataByURL: function (baseURL, list) {
		let me = this;
		if (typeof (fetch) != 'function') return Promise.reject('此環境無 fetch，請改用 loadOutDataByFile 或自行取得 JSON 後以 attachData 塞入');
		if (!list || !list.length) return Promise.reject('loadOutDataByURL 需要指定 list，例如 [\'tra.fare\']');
		baseURL = baseURL.replace(/\/$/, '');
		return Promise.all(list.map(function (name) {
			let fileName = /\.json$/.test(name) ? name : name + '.json';
			return fetch(baseURL + '/' + fileName).then(function (res) {
				if (!res.ok) throw 'loadOutDataByURL ' + fileName + ' HTTP ' + res.status;
				return res.json();
			}).then(function (data) {
				me.attachData(name, data);
				return name;
			});
		})).then(function () { return me; });
	},
	//以檔案系統載入（Node 專用；web 環境呼叫會 reject 但不會拋出未捕捉錯誤）
	//dirPath 例：require('path').join(__dirname, 'node_modules/rocptx/out_data')
	//list 省略時載入目錄內全部 *.json
	loadOutDataByFile: function (dirPath, list) {
		let me = this;
		return new Promise(function (resolve, reject) {
			let fs, path;
			try {
				//eval 避免 bundler 靜態解析 require，web 環境執行到這裡會進 catch
				fs = eval('require')('fs');
				path = eval('require')('path');
			} catch (e) {
				return reject('此環境無檔案系統（web 請改用 loadOutDataByURL）');
			}
			try {
				if (!list || !list.length) {
					list = fs.readdirSync(dirPath).filter(function (f) { return /\.json$/.test(f); });
				}
				list.forEach(function (name) {
					let fileName = /\.json$/.test(name) ? name : name + '.json';
					let data = JSON.parse(fs.readFileSync(path.join(dirPath, fileName), 'utf8'));
					me.attachData(name, data);
				});
				resolve(me);
			} catch (e) {
				reject('loadOutDataByFile 失敗: ' + (e && e.message || e));
			}
		});
	}
}


export default datax;
