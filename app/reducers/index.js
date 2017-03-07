// import {combineReducers} from 'redux';
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

export const todoReducer = combineReducers({
	todos,
	filter,
	title,
	newlyAdded: () => false
});

// function combineImmutableReducers(reducerObject, getDefaultState = Map) {
// 	return function(state = getDefaultState(), action) {
// 	// 	const toMerge = {};
// 	// 	for (let key in reducerObject) {
// 	// 		toMerge[key] = reducerObject[key](state.get(key), action);
// 	// 	}
// 	// 	return state.merge(Map(toMerge));
// 	//
// 		return state.withMutations(temp => {
// 			for (let key in reducerObject) {
// 				temp.set(key, reducerObject[key](state.get(key), action));
// 			}
//
// 			return temp;
// 		});
// 	};
// }

// const todoIm = combineImmutableReducers({
// 	todos,
// 	filter
// });

function moveItem(lists, {fromItemPath: [fromListIndex, fromItemIndex], toItemPath: [toListIndex, toItemIndex]}) {
	let fromList = lists[fromListIndex];
	// consider -0 === last element index
	if(Object.is(fromItemIndex, -0)) fromItemIndex = fromList.todos.size - 1;
	const item = fromList.todos.get(fromItemIndex);
	
	fromList = fromList.deleteIn(["todos", fromItemIndex]);
	
	const sameList = fromListIndex === toListIndex;
	
	let toList = sameList ? fromList : lists[toListIndex];
		
	toList = toList.update("todos", todos => todos.insert(Object.is(toItemIndex, -0) ? todos.size : toItemIndex, item));
	
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

export default function listsReducer(state = {lists: List()}, action) {
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
			return {
				lists: state.lists.update(action.listIndex, list => todoReducer(list, action))
			};
		case MOVE_ITEM:
			return {
				lists: moveItem(state.lists, action)
			};
		case ADD_LIST:
			return {
				lists: state.lists.push(new ListRecord({newlyAdded: true}))
			};
		case REMOVE_LIST:
			return {
				lists: state.lists.remove(action.listIndex)
			};
		case MOVE_LIST:
			return {
				lists: moveList(state.lists, action)
			};
		default:
			return state;
	}
}
