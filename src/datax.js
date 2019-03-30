import trtc_line from './datax/trtc.line.json';
import krtc_line from './datax/krtc.line.json';
import tymetro_line from './datax/tymetro.line.json';

import trtc_station from './datax/trtc.station.json';
import krtc_station from './datax/krtc.station.json';
import tymetro_station from './datax/tymetro.station.json';

import trtc_transfer from './datax/trtc.transfer.json';
import krtc_transfer from './datax/krtc.transfer.json';

import tra_line from './datax/tra.line.json';
import tra_station from './datax/tra.station.json';
import tra_train from './datax/tra.train.json';

function getObjID(uid){
	//透過 uid 拆解找對應的資料，uid 格式為 {公司名}_{路線名}，例如 trtc_R 為台北捷運紅線
	if(/^TRA-|^TRTC-|^KRTC-|^TYMC-|^KLRT-|^THSR-/.test(uid)){
		if(/^TRA-/.test(uid)) uid = uid.replace(/^TRA-/,'tra_');
		else if(/^TRTC-/.test(uid)) uid = uid.replace(/^TRTC-/,'trtc_');
		else if(/^KRTC-/.test(uid)) uid = uid.replace(/^KRTC-/,'krtc_');
		else if(/^TYMC-/.test(uid)) uid = uid.replace(/^TYMC-/,'tymetro_');
		else if(/^KLRT-/.test(uid)) uid = uid.replace(/^KLRT-/,'klrt_');
		else if(/^THSR-/.test(uid)) uid = uid.replace(/^THSR-/,'thsr_');
	}
	let ary = uid.split('_');
	let companyTag = ary[0];
	let id = uid.replace(companyTag+'_','');
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
	krtc: {
		line: krtc_line,
		station: krtc_station,
		transfer: krtc_transfer
	},
	tymetro: {
		line: tymetro_line,
		station: tymetro_station
	},
	tra: {
		line: tra_line,
		station: tra_station,
		train: tra_train
	},
	getLine: function(uid){
		let objA = getObjID(uid);
		if(arguments.length==2){
			objA = {company:arguments[0], id:arguments[1]}
		}
		if(!this[objA.company]) throw  'Company ' + objA.company + ' is not defined. Error on datax.js getLine';
		let lineAry = this[objA.company].line;
		return lineAry.find((c)=>c.LineID==objA.id);
	},
	getStation: function(uid){
		let objA = getObjID(uid);
		if(arguments.length==2){
			objA = {company:arguments[0], id:arguments[1]}
		}
		if(!this[objA.company]) throw  'Company ' + objA.company + ' is not defined. Error on datax.js getStation';
		let stAry = this[objA.company].station;
		return stAry.find((c)=>c.StationID==objA.id);
	}
}


export default datax;
