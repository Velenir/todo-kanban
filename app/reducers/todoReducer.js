import {List, Map} from 'immutable';


function changeItemMap(action) {
	const {type, itemId} = action;
	
	switch (type) {
		case "TOGGLE_COMPLETE":
			return item => item.get("id") === itemId ? item.update("status",
				status => status === "active" ? "completed" : "active")
			: item;
		case "EDIT_ITEM":
			return item => item.get("id") === itemId ? item.merge({editing: true, selectText: false})
			: item;
		case "SELECT_EDIT_ITEM":
			return item => item.get("id") === itemId ? item.merge({editing: true, selectText: true})
			: item;
		case "CANCEL_EDITING":
			return item => item.get("id") === itemId ? item.set("editing", false)
			: item;
		case "DONE_EDITING":
			return item => item.get("id") === itemId ? item.merge({editing: false, text: action.newText})
			: item;
		default:
			return item => item;
	}
}

function deleteItemCondition(action) {
	switch (action.type) {
		case "CLEAR_COMPLETED":
			return item => item.get("status") === "completed";
		case "DELETE_ITEM":
			return item => item.get("id") === action.itemId;
		default:
			return () => false;
	}
}

function createNewItem(state, action) {
	const itemId = state.reduce((maxId, item) => Math.max(maxId, item.get("id")), 0) + 1;

	return Map({id: itemId, text: action.text, status: "active"});
}

export default function (state = List(), action) {
	switch (action.type) {
		case "TOGGLE_COMPLETE":
		case "EDIT_ITEM":
		case "SELECT_EDIT_ITEM":
		case "CANCEL_EDITING":
		case "DONE_EDITING":
			return state.map(changeItemMap(action));
		case "CLEAR_COMPLETED":
		case "DELETE_ITEM":
			return state.filterNot(deleteItemCondition(action));
		case "ADD_ITEM":
			return state.push(createNewItem(state, action));
		default:
			return state;
	}
}
