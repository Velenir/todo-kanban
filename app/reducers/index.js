import {Map} from 'immutable';

function setState(state, newState) {
	return state.merge(newState);
}

function findItemIndex(state, itemId) {
	return state.get('todos').findIndex(
		(item) => item.get('id') === itemId
	);
}

function toggleComplete(state, itemId) {
	const itemIndex = findItemIndex(state, itemId);

	return state.updateIn(["todos", itemIndex, "status"], status => status === 'active' ? 'completed' : 'active');
}

function changeFilter(state, filter) {
	return state.set("filter", filter);
}

function editItem(state, itemId) {
	const itemIndex = findItemIndex(state, itemId);
	
	return state.mergeIn(["todos", itemIndex], {editing: true, selectText: false});
}

function selectAndEditItem(state, itemId) {
	const itemIndex = findItemIndex(state, itemId);
	
	return state.mergeIn(["todos", itemIndex], {editing: true, selectText: true});
}

function cancelEditing(state, itemId) {
	const itemIndex = findItemIndex(state, itemId);
	
	return state.setIn(["todos", itemIndex, "editing"], false);
}

function doneEditing(state, itemId, newText) {
	const itemIndex = findItemIndex(state, itemId);

	return state.mergeIn(["todos", itemIndex], {editing: false, text: newText});
}

function clearCompleted(state) {
	return state.update("todos", todos => todos.filterNot(
		item => item.get("status") === "completed"
	));
}

function addItem(state, text) {
	const itemId = state.get("todos").reduce((maxId, item) => Math.max(maxId, item.get("id")), 0) + 1;

	const newItem = Map({id: itemId, text: text, status: "active"});
	return state.update("todos", (todos) => todos.push(newItem));
}

function deleteItem(state, itemId) {
	return state.update("todos", todos => todos.filterNot(
		item => item.get("id") === itemId
	));
}

export default function (state = Map(), action) {
	switch (action.type) {
		case "SET_STATE":
			return setState(state, action.state);
		case "TOGGLE_COMPLETE":
			return toggleComplete(state, action.itemId);
		case "CHANGE_FILTER":
			return changeFilter(state, action.filter);
		case 'EDIT_ITEM':
			return editItem(state, action.itemId);
		case 'SELECT_EDIT_ITEM':
			return selectAndEditItem(state, action.itemId);
		case 'CANCEL_EDITING':
			return cancelEditing(state, action.itemId);
		case 'DONE_EDITING':
			return doneEditing(state, action.itemId, action.newText);
		case 'CLEAR_COMPLETED':
			return clearCompleted(state);
		case 'ADD_ITEM':
			return addItem(state, action.text);
		case 'DELETE_ITEM':
			return deleteItem(state, action.itemId);
		default:
			return state;
	}
}
