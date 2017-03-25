import {combineReducers} from 'redux-immutable';
import {ListRecord} from '../helpers/immutableHelpers';

import todos from './todoReducer';
import filter from './filterReducer';
import title from './titleReducer';
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
	MOVE_ITEM,
	CHANGE_FILTER,
	CHANGE_TITLE,
	ADD_LIST,
	REMOVE_LIST,
	MOVE_LIST
} from '../actions/actionTypes';

import {v4 as uuid} from 'uuid';

export const todoReducer = combineReducers({
	todos,
	filter,
	title,
	newlyAdded: () => false,
	id: id => id
});


function moveItem(lists, {fromItemPath: [fromListIndex, fromItemIndex], toItemPath: [toListIndex, toItemIndex]}) {
	let fromList = lists[fromListIndex];
	// consider -0 === last element index
	if(Object.is(fromItemIndex, -0)) fromItemIndex = fromList.todos.length - 1;
	const item = fromList.todos.get(fromItemIndex);
	
	fromList = fromList.deleteIn(["todos", fromItemIndex]);
	
	const sameList = fromListIndex === toListIndex;
	
	let toList = sameList ? fromList : lists[toListIndex];
		
	toList = toList.update("todos", todos => todos.insert(Object.is(toItemIndex, -0) ? todos.length : toItemIndex, item));
	
	if(sameList) {
		return lists.set(toListIndex, toList);
	}
	
	return lists.withMutations(tempList =>
		tempList.set(fromListIndex, fromList).set(toListIndex, toList)
	);
}

function moveList(lists, {fromListIndex, toListIndex}) {
	const list = lists[fromListIndex];
	return lists.remove(fromListIndex).insert(toListIndex, list);
}

export default function listsReducer(state = List(), action) {
	switch (action.type) {
		case TOGGLE_COMPLETE:
		case EDIT_ITEM:
		case SELECT_EDIT_ITEM:
		case CANCEL_EDITING:
		case DONE_EDITING:
		case CLEAR_COMPLETED:
		case DELETE_ITEM:
		case ADD_ITEM:
		case CHANGE_FILTER:
		case CHANGE_TITLE:
			return state.update(action.listIndex, list => todoReducer(list, action));
		case MOVE_ITEM:
			return moveItem(state, action);
		case ADD_LIST:
			return state.push(new ListRecord({id: uuid(), newlyAdded: true}));
		case REMOVE_LIST:
			return state.remove(action.listIndex);
		case MOVE_LIST:
			return  moveList(state, action);
		default:
			return state;
	}
}
