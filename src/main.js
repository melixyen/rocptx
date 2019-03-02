import common from './common.js';
import ptx from './ptx.js';
import data from './data.js';
import bus from './bus.js';
import trtc from './trtc.js';
import jsSHA from './jsSHA';


var inBrowser = common.inBrowser;


var combine = {
	data: data,
	bus: bus,
	trtc: trtc,
	jsSHA: jsSHA,
	common: common
}
for(var k in combine){
	ptx[k] = combine[k];
}

if(inBrowser && !window.rocptx){
	window.rocptx = ptx;
}


export default ptx;
