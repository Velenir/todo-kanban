// import {combineReducers} from 'redux';
import {combineReducers} from 'redux-immutable';

import todos from './todoReducer';
import filter from './filterReducer';
import {List, Map} from 'immutable';

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
	CHANGE_FILTER
} from '../actions/actionTypes';

export const todoReducer = combineReducers({
	todos,
	filter,
	title: (state = "") => state
});

function combineImmutableReducers(reducerObject, getDefaultState = Map) {
	return function(state = getDefaultState(), action) {
	// 	const toMerge = {};
	// 	for (let key in reducerObject) {
	// 		toMerge[key] = reducerObject[key](state.get(key), action);
	// 	}
	// 	return state.merge(Map(toMerge));
	//
		return state.withMutations(temp => {
			for (let key in reducerObject) {
				temp.set(key, reducerObject[key](state.get(key), action));
			}
			
			return temp;
		});
	};
}

const todoIm = combineImmutableReducers({
	todos,
	filter
});

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
		case MOVE_ITEM:
		case CHANGE_FILTER:
			return {
				lists: state.lists.update(action.listIndex, list => todoReducer(list, action))
			};
		default:
			return {
				lists: state.lists.map(list => todoReducer(list, action))
			};
	}
}
