import {List} from 'immutable';
import {
	TOGGLE_COMPLETE,
	EDIT_ITEM,
	SELECT_EDIT_ITEM,
	CANCEL_EDITING,
	DONE_EDITING,
	CLEAR_COMPLETED,
	DELETE_ITEM,
	ADD_ITEM,
	MOVE_ITEM
} from '../actions/actionTypes';
import {TodoRecord} from '../helpers/immutableHelpers';

import * as FILTER from './filterVars';


function changeItemMap(action) {
	const {type, itemId} = action;
	
	switch (type) {
		case TOGGLE_COMPLETE:
			return item => item.get("id") === itemId ? item.update("status",
				status => status === FILTER.ACTIVE ? FILTER.COMPLETED : FILTER.ACTIVE)
			: item;
		case EDIT_ITEM:
			return item => item.get("id") === itemId ? item.merge({editing: true, selectText: false})
			: item;
		case SELECT_EDIT_ITEM:
			return item => item.get("id") === itemId ? item.merge({editing: true, selectText: true})
			: item;
		case CANCEL_EDITING:
			return item => item.get("id") === itemId ? item.set("editing", false)
			: item;
		case DONE_EDITING:
			return item => item.get("id") === itemId ? item.merge({editing: false, text: action.newText})
			: item;
		default:
			return item => item;
	}
}

function deleteItemCondition(action) {
	switch (action.type) {
		case CLEAR_COMPLETED:
			return item => item.get("status") === FILTER.COMPLETED;
		case DELETE_ITEM:
			return item => item.get("id") === action.itemId;
		default:
			return () => false;
	}
}

function createNewItem(state, action) {
	const itemId = state.reduce((maxId, item) => Math.max(maxId, item.get("id")), 0) + 1;

	return new TodoRecord({id: itemId, text: action.text});
}

function moveItem(state, {itemEntry: [fromIndex, item], toIndex}) {
	return state.delete(fromIndex).insert(toIndex, item);
}

export default function (state = List(), action) {
	switch (action.type) {
		case TOGGLE_COMPLETE:
		case EDIT_ITEM:
		case SELECT_EDIT_ITEM:
		case CANCEL_EDITING:
		case DONE_EDITING:
			return state.map(changeItemMap(action));
		case CLEAR_COMPLETED:
		case DELETE_ITEM:
			return state.filterNot(deleteItemCondition(action));
		case ADD_ITEM:
			return state.push(createNewItem(state, action));
		case MOVE_ITEM:
			return moveItem(state, action);
		default:
			return state;
	}
}
