import {CHANGE_LAYOUT} from '../actions/actionTypes';
import {COLUMN} from './layoutVars';

export default function (state = COLUMN, action) {
	switch (action.type) {
		case CHANGE_LAYOUT:
			return action.layout;
		default:
			return state;
	}
}
