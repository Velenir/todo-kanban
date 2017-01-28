import {List, Map} from 'immutable';

function findItemIndex(list, itemId) {
	return list.findIndex(
		(item) => item.get('id') === itemId
	);
}

function toggleComplete(state, {itemId}) {
	const itemIndex = findItemIndex(state, itemId);

	return state.updateIn([itemIndex, "status"], status => status === 'active' ? 'completed' : 'active');
}

function editItem(state, {itemId}) {
	const itemIndex = findItemIndex(state, itemId);
	
	return state.mergeIn([itemIndex], {editing: true, selectText: false});
}

function selectAndEditItem(state, {itemId}) {
	const itemIndex = findItemIndex(state, itemId);
	
	return state.mergeIn([itemIndex], {editing: true, selectText: true});
}

function cancelEditing(state, {itemId}) {
	const itemIndex = findItemIndex(state, itemId);
	
	return state.setIn([itemIndex, "editing"], false);
}

function doneEditing(state, {itemId, newText}) {
	const itemIndex = findItemIndex(state, itemId);

	return state.mergeIn([itemIndex], {editing: false, text: newText});
}

function clearCompleted(state) {
	return state.filterNot(item => item.get("status") === "completed");
}

function addItem(state, {text}) {
	const itemId = state.reduce((maxId, item) => Math.max(maxId, item.get("id")), 0) + 1;

	const newItem = Map({id: itemId, text: text, status: "active"});
	return state.push(newItem);
}

function deleteItem(state, {itemId}) {
	return state.filterNot(item => item.get("id") === itemId);
}

export default function (state = List(), action) {
	switch (action.type) {
		case "TOGGLE_COMPLETE":
			return toggleComplete(state, action);
		case 'EDIT_ITEM':
			return editItem(state, action);
		case 'SELECT_EDIT_ITEM':
			return selectAndEditItem(state, action);
		case 'CANCEL_EDITING':
			return cancelEditing(state, action);
		case 'DONE_EDITING':
			return doneEditing(state, action);
		case 'CLEAR_COMPLETED':
			return clearCompleted(state);
		case 'ADD_ITEM':
			return addItem(state, action);
		case 'DELETE_ITEM':
			return deleteItem(state, action);
		default:
			return state;
	}
}
