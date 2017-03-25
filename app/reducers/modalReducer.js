import {OPEN_MODAL, CLOSE_MODAL} from '../actions/actionTypes';
import {ModalRecord} from '../helpers/immutableHelpers';

export default function (state = new ModalRecord(), action) {
	switch (action.type) {
		case OPEN_MODAL:
			return state.merge({
				open: true,
				item: action.item,
				id: action.itemId
			});
		case CLOSE_MODAL:
			return state.clear();
		default:
			return state;
	}
}
