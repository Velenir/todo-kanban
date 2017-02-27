import {CHANGE_TITLE} from '../actions/actionTypes';

export default function(state = "", action) {
	switch (action.type) {
		case CHANGE_TITLE:
			return action.title;
		default:
			return state;
	}
}
