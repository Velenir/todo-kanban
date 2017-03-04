import {fromJS, findItemEntry, ListRecord} from '../app/helpers/immutableHelpers';
import {expect} from 'chai';

import listsReducer, {todoReducer} from '../app/reducers';
import {
	toggleComplete,
	changeFilter,
	editItem,
	selectEditItem,
	cancelEditing,
	doneEditing,
	clearCompleted,
	deleteItem,
	addItem,
	moveItem
} from '../app/actions';
import * as FILTER from '../app/reducers/filterVars';

describe('reducer', () => {
	
	it('should handle TOGGLE_COMPLETE by changing the status from active to completed', () => {
		const initialState = new ListRecord({
			todos: fromJS([
				{id: 1, text: 'React', status: FILTER.ACTIVE},
				{id: 2, text: 'Redux', status: FILTER.ACTIVE},
				{id: 3, text: 'Immutable', status: FILTER.COMPLETED}
			])
		});
		const action = toggleComplete(0, 1);
		
		const nextState = todoReducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: FILTER.COMPLETED},
			{id: 2, text: 'Redux', status: FILTER.ACTIVE},
			{id: 3, text: 'Immutable', status: FILTER.COMPLETED}
		]));
	});
	
	it('should handle TOGGLE_COMPLETE by changing the status from completed to active', () => {
		const initialState = new ListRecord({
			todos: fromJS([
				{id: 1, text: 'React', status: FILTER.ACTIVE},
				{id: 2, text: 'Redux', status: FILTER.ACTIVE},
				{id: 3, text: 'Immutable', status: FILTER.COMPLETED}
			])
		});
		const action = toggleComplete(0, 3);
		
		const nextState = todoReducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: FILTER.ACTIVE},
			{id: 2, text: 'Redux', status: FILTER.ACTIVE},
			{id: 3, text: 'Immutable', status: FILTER.ACTIVE}
		]));
	});
	
	it('should handle CHANGE_FILTER by changing the filter', () => {
		const initialState = new ListRecord({
			filter: FILTER.ALL
		});
		const action = changeFilter(0, FILTER.ACTIVE);
		
		const nextState = todoReducer(initialState, action);
		
		expect(nextState).to.have.property("filter").that.equals(FILTER.ACTIVE);
	});
	
	it('should handle EDIT_ITEM by setting editing to true and selectText to false', () => {
		const initialState = new ListRecord({
			todos: fromJS([
				{id: 1, text: 'React', status: FILTER.ACTIVE, editing: false}
			])
		});
		const action = editItem(0, 1);
		
		const nextState = todoReducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: FILTER.ACTIVE, editing: true, selectText: false}
		]));
	});
	
	it('should handle SELECT_EDIT_ITEM by setting editing and selectText to true', () => {
		const initialState = new ListRecord({
			todos: fromJS([
				{id: 1, text: 'React', status: FILTER.ACTIVE, editing: false}
			])
		});
		const action = selectEditItem(0, 1);
		
		const nextState = todoReducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: FILTER.ACTIVE, editing: true, selectText: true}
		]));
	});
	
	it('should handle CANCEL_EDITING by setting editing to false', () => {
		const initialState = new ListRecord({
			todos: fromJS([
				{id: 1, text: 'React', status: FILTER.ACTIVE, editing: true}
			])
		});
		const action = cancelEditing(0, 1);
		
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: FILTER.ACTIVE, editing: false}
		]));
	});
	
	it('should handle DONE_EDITING by updating the text', () => {
		const initialState = new ListRecord({
			todos: fromJS([
				{id: 1, text: 'React', status: FILTER.ACTIVE, editing: true}
			])
		});
		const action = doneEditing(0, 1, "Redux");
		
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'Redux', status: FILTER.ACTIVE, editing: false}
		]));
	});
	
	it('should handle CLEAR_COMPLETED by removing all the completed items', () => {
		const initialState = new ListRecord({
			todos: fromJS([
				{id: 1, text: 'React', status: FILTER.ACTIVE},
				{id: 2, text: 'Redux', status: FILTER.COMPLETED}
			])
		});
		const action = clearCompleted(0, );
		
		const nextState = todoReducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: FILTER.ACTIVE}
		]));
	});
	
	it('should handle ADD_ITEM by adding the item', () => {
		const initialState = new ListRecord({
			todos: fromJS([
				{id: 7, text: 'React', status: FILTER.ACTIVE}
			])
		});
		const action = addItem(0, "Redux");
		
		const nextState = todoReducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 7, text: 'React', status: FILTER.ACTIVE},
			{id: 8, text: 'Redux', status: FILTER.ACTIVE}
		]));
	});
	
	it('should handle DELETE_ITEM by removing the item', () => {
		const initialState = new ListRecord({
			todos: fromJS([
				{id: 1, text: 'React', status: FILTER.ACTIVE},
				{id: 2, text: 'Redux', status: FILTER.COMPLETED}
			])
		});
		const action = deleteItem(0, 2);
		
		const nextState = todoReducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: FILTER.ACTIVE}
		]));
	});
	
	it('should handle MOVE_ITEM by moving the item to a new index', () => {
		const initialState = new ListRecord({
			todos: fromJS([
				{id: 1, text: 'React', status: FILTER.ACTIVE},
				{id: 2, text: 'Redux', status: FILTER.ACTIVE}
			])
		});
		const action = moveItem(0, findItemEntry(initialState.todos, 2), 0);
		
		const nextState = todoReducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 2, text: 'Redux', status: FILTER.ACTIVE},
			{id: 1, text: 'React', status: FILTER.ACTIVE}
		]));
	});
});
