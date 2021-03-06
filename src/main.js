import '@babel/polyfill';
import common from './common.js';
import ptx from './ptx.js';
import data from './data.js';
import datax from './datax.js';
import bus from './bus.js';
import metro from './metro.js';
import trtc from './trtc.js';
import tmrt from './tmrt.js';
import krtc from './krtc.js';
import tymetro from './tymetro.js';
import klrt from './klrt.js';
import thsr from './thsr.js';
import tra from './tra.js';
import router from './router.js';
import jsSHA from './jsSHA';
import id from './id';


var inBrowser = common.inBrowser;


var combine = {
	data: data,
	datax: datax,
	bus: bus,
	metro: metro,
	trtc: trtc,
	tmrt: tmrt,
	krtc: krtc,
	tymetro: tymetro,
	klrt: klrt,
	thsr: thsr,
	tra: tra,
	router: router,
	jsSHA: jsSHA,
	id: id,
	common: common
}
for(var k in combine){
	ptx[k] = combine[k];
}

if(inBrowser){
	if(!window.rocptx) window.rocptx = ptx;
	if(!window.$trainTaiwanLib) window.$trainTaiwanLib = {};
	if(!window.$trainTaiwanLib.ptx) window.$trainTaiwanLib.ptx = ptx;
	if(!window.Promise) console.log("PTX library need Promise, please include a Promise polyfill.")
}


export default ptx;
