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
	}
}


export default datax;
