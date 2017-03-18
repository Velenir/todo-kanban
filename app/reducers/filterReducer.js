import {CHANGE_FILTER} from '../actions/actionTypes';
import * as FILTER from './filterVars';

export default function (state = FILTER.ALL, action) {
	
	switch (action.type) {
		case CHANGE_FILTER:
			return action.filter;
		default:
			return state;
	}
}
