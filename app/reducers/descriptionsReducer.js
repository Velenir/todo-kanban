import {Map} from 'immutable';
import {CHANGE_DESCRIPTION, DELETE_ITEM} from '../actions/actionTypes';

export default function (state = Map(), action) {
	switch (action.type) {
		case CHANGE_DESCRIPTION:
			return state.set(action.itemId, action.description);
		case DELETE_ITEM:
			return state.delete(action.itemId);
		default:
			return state;
	}
}
