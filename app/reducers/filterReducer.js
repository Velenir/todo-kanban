import {CHANGE_FILTER} from '../actions/actionTypes';
import {ALL} from './filterVars';

export default function (state = ALL, action) {
	
	switch (action.type) {
		case CHANGE_FILTER:
			return action.filter;
		default:
			return state;
	}
}
