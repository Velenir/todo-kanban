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
	MOVE_ITEM,
	CHANGE_TITLE,
	ADD_LIST
} from './actionTypes';

export function toggleComplete(listIndex, itemId) {
	return {
		type: TOGGLE_COMPLETE,
		itemId,
		listIndex
	};
}

export function changeFilter(listIndex, filter) {
	return {
		type: CHANGE_FILTER,
		filter,
		listIndex
	};
}

export function editItem(listIndex, itemId) {
	return {
		type: EDIT_ITEM,
		itemId,
		listIndex
	};
}

export function selectEditItem(listIndex, itemId) {
	return {
		type: SELECT_EDIT_ITEM,
		itemId,
		listIndex
	};
}

export function cancelEditing(listIndex, itemId) {
	return {
		type: CANCEL_EDITING,
		itemId,
		listIndex
	};
}

export function doneEditing(listIndex, itemId, newText) {
	return {
		type: DONE_EDITING,
		itemId,
		newText,
		listIndex
	};
}

export function clearCompleted(listIndex) {
	return {
		type: CLEAR_COMPLETED,
		listIndex
	};
}

export function deleteItem(listIndex, itemId) {
	return {
		type: DELETE_ITEM,
		itemId,
		listIndex
	};
}

export function addItem(listIndex, text) {
	return {
		type: ADD_ITEM,
		text,
		listIndex
	};
}

export function moveItem(listIndex, itemEntry, toIndex) {
	return {
		type: MOVE_ITEM,
		itemEntry,
		toIndex,
		listIndex
	};
}

export function changeTitle(listIndex, title) {
	return {
		type: CHANGE_TITLE,
		listIndex,
		title
	};
}

export function addList() {
	return {
		type: ADD_LIST
	};
}
