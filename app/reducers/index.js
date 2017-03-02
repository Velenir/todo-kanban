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
	REMOVE_LIST
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

function moveItem(state, {listIndex, itemEntry: [fromIndex, item], toIndex, fromListIndex}) {
	// return state.delete(fromIndex).insert(toIndex, item);
	console.log("from", fromListIndex, fromIndex, ", to", listIndex, toIndex);
	const fromList = state[fromListIndex].deleteIn(["todos", fromIndex]);
	console.log("BEFORE:", state[fromListIndex].todos.size, "AFTER:", fromList.todos.size, state[fromListIndex].todos[fromIndex] === fromList.todos[fromIndex]);
	console.log(state[fromListIndex].todos[fromIndex], fromList.todos[fromIndex]);
	console.log("BEFORE:", state[fromListIndex].todos.toJS(), "AFTER:", fromList.todos.toJS());
	// const toList = state[listIndex].todos.insert(toIndex, item);
	const toList = state[listIndex].update("todos", todos => todos.insert(toIndex, item));
	console.log("BEFORE:", state[listIndex].todos.size, "AFTER:", toList.todos.size);
	console.log("BEFORE:", state[listIndex].todos.toJS(), "AFTER:", toList.todos.toJS());
	// console.log(item);
	const res = state.withMutations(temp =>
		temp.set(fromListIndex, fromList).set(listIndex, toList)
	);
	console.log("RESULT:",res.toJS(), res===state);
	return res;
	return state.merge({[fromListIndex]: fromList, [listIndex]: toList});
}

export default function listsReducer(state = {lists: List()}, action) {
	switch (action.type) {
		case MOVE_ITEM:
			console.log(action.fromListIndex, "->", action.listIndex);
			if(action.listIndex !== action.fromListIndex) {
				console.log("TO DIFFERENT LIST");
				return {
					lists: moveItem(state.lists, action)
				};
			}
		// falls through
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
		case ADD_LIST:
			return {
				lists: state.lists.push(new ListRecord({newlyAdded: true}))
			};
		case REMOVE_LIST:
			return {
				lists: state.lists.remove(action.listIndex)
			};
		default:
			return state;
	}
}
