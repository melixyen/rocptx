import trtc_time from './datax/trtc.time.json';
import krtc_time from './datax/krtc.time.json';
import tymetro_time from './datax/tymetro.time.json';


let lineTime = {
	trtc: trtc_time,
	krtc: krtc_time,
	tymetro: tymetro_time
}

// let global;
// if(window.$trainTaiwanLib){
// 	global = window.$trainTaiwanLib.ptx;
// }else if(window.rocptx){
// 	global = window.rocptx;
// }

// global.lineTime = lineTime;

export default lineTime;