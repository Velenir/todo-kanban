import {
	TOGGLE_COMPLETE,
	CHANGE_FILTER,
	EDIT_ITEM,
	SELECT_EDIT_ITEM,
	CANCEL_EDITING,
	DONE_EDITING,
	CLEAR_COMPLETED,
	DELETE_ITEM,
	ADD_ITEM,
	MOVE_ITEM
} from './actionTypes';

export function toggleComplete(itemId) {
	return {
		type: TOGGLE_COMPLETE,
		itemId
	};
}

export function changeFilter(filter) {
	return {
		type: CHANGE_FILTER,
		filter
	};
}

export function editItem(itemId) {
	return {
		type: EDIT_ITEM,
		itemId
	};
}

export function selectEditItem(itemId) {
	return {
		type: SELECT_EDIT_ITEM,
		itemId
	};
}

export function cancelEditing(itemId) {
	return {
		type: CANCEL_EDITING,
		itemId
	};
}

export function doneEditing(itemId, newText) {
	return {
		type: DONE_EDITING,
		itemId,
		newText
	};
}

export function clearCompleted() {
	return {
		type: CLEAR_COMPLETED,
	};
}

export function deleteItem(itemId) {
	return {
		type: DELETE_ITEM,
		itemId
	};
}

export function addItem(text) {
	return {
		type: ADD_ITEM,
		text
	};
}

export function moveItem(itemEntry, toIndex) {
	return {
		type: MOVE_ITEM,
		itemEntry,
		toIndex
	};
}
