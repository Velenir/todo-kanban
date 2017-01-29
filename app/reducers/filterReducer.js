import {CHANGE_FILTER} from '../actions/actionTypes';

export default function (state = "all", action) {
	switch (action.type) {
		case CHANGE_FILTER:
			return action.filter;
		default:
			return state;
	}
}
