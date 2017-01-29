import {fromJS} from '../app/helpers/immutableHelpers';
import {expect} from 'chai';

import reducer from '../app/reducers';
import {
	toggleComplete,
	changeFilter,
	editItem,
	selectEditItem,
	cancelEditing,
	doneEditing,
	clearCompleted,
	deleteItem,
	addItem
} from '../app/actions';

describe('reducer', () => {
	
	it('should handle TOGGLE_COMPLETE by changing the status from active to completed', () => {
		const initialState = {
			todos: fromJS([
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			])
		};
		const action = toggleComplete(1);
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: 'completed'},
			{id: 2, text: 'Redux', status: 'active'},
			{id: 3, text: 'Immutable', status: 'completed'}
		]));
	});
	
	it('should handle TOGGLE_COMPLETE by changing the status from completed to active', () => {
		const initialState = {
			todos: fromJS([
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			])
		};
		const action = toggleComplete(3);
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: 'active'},
			{id: 2, text: 'Redux', status: 'active'},
			{id: 3, text: 'Immutable', status: 'active'}
		]));
	});
	
	it('should handle CHANGE_FILTER by changing the filter', () => {
		const initialState = {
			filter: 'all'
		};
		const action = changeFilter("active");
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.have.property("filter").that.equals("active");
	});
	
	it('should handle EDIT_ITEM by setting editing to true and selectText to false', () => {
		const initialState = {
			todos: fromJS([
				{id: 1, text: 'React', status: 'active', editing: false}
			])
		};
		const action = editItem(1);
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: 'active', editing: true, selectText: false}
		]));
	});
	
	it('should handle SELECT_EDIT_ITEM by setting editing and selectText to true', () => {
		const initialState = {
			todos: fromJS([
				{id: 1, text: 'React', status: 'active', editing: false}
			])
		};
		const action = selectEditItem(1);
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: 'active', editing: true, selectText: true}
		]));
	});
	
	it('should handle CANCEL_EDITING by setting editing to false', () => {
		const initialState = {
			todos: fromJS([
				{id: 1, text: 'React', status: 'active', editing: true}
			])
		};
		const action = cancelEditing(1);
		
		const nextState = reducer(initialState, action);
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: 'active', editing: false}
		]));
	});
	
	it('should handle DONE_EDITING by updating the text', () => {
		const initialState = {
			todos: fromJS([
				{id: 1, text: 'React', status: 'active', editing: true}
			])
		};
		const action = doneEditing(1, "Redux");
		
		const nextState = reducer(initialState, action);
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'Redux', status: 'active', editing: false}
		]));
	});
	
	it('should handle CLEAR_COMPLETED by removing all the completed items', () => {
		const initialState = {
			todos: fromJS([
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'completed'}
			])
		};
		const action = clearCompleted();
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: 'active'}
		]));
	});
	
	it('should handle ADD_ITEM by adding the item', () => {
		const initialState = {
			todos: fromJS([
				{id: 7, text: 'React', status: 'active'}
			])
		};
		const action = addItem("Redux");
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 7, text: 'React', status: 'active'},
			{id: 8, text: 'Redux', status: 'active'}
		]));
	});
	
	it('should handle DELETE_ITEM by removing the item', () => {
		const initialState = {
			todos: fromJS([
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'completed'},
			])
		};
		const action = deleteItem(2);
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.have.property("todos").that.equals(fromJS([
			{id: 1, text: 'React', status: 'active'}
		]));
	});
});
