import {Map} from 'immutable';
import {CHANGE_DESCRIPTION} from '../actions/actionTypes';

export default function (state = Map(), action) {
	switch (action.type) {
		case CHANGE_DESCRIPTION:
			return state.set(action.itemId, action.description);
		default:
			return state;
	}
}
