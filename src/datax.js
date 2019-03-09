import trtc_line from './datax/trtc.line.json';
import krtc_line from './datax/krtc.line.json';
import tymetro_line from './datax/tymetro.line.json';

import trtc_station from './datax/trtc.station.json';
import krtc_station from './datax/krtc.station.json';
import tymetro_station from './datax/tymetro.station.json';


const datax = {
	trtc: {
		line: trtc_line,
		station: trtc_station
	},
	krtc: {
		line: krtc_line,
		station: krtc_station
	},
	tymetro: {
		line: tymetro_line,
		station: tymetro_station
	}
}


export default datax;
