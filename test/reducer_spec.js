import {fromJS, ListRecord, List} from '../app/helpers/immutableHelpers';
import ImAr from '../app/helpers/ImmutableArray';
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
	moveItem,
	changeTitle,
	addList,
	removeList,
	moveList
} from '../app/actions';
import * as FILTER from '../app/reducers/filterVars';

describe('reducers:', () => {
	function expectTodosToEqual(state, todos) {
		todos = todos.map(item => fromJS(item));
		expect(state.todos.length).to.equal(todos.length);
		
		for(let i = 0, len = todos.length; i < len; ++i) {
			expect(state.todos[i]).to.equal(todos[i]);
		}
	}
	
	describe('combined todoReducer', () => {
		it('should handle TOGGLE_COMPLETE by changing the status from active to completed', () => {
			const initialState = new ListRecord({
				todos: fromJS([
					{id: 1, text: 'React', status: FILTER.ACTIVE},
					{id: 2, text: 'Redux', status: FILTER.ACTIVE},
					{id: 3, text: 'Immutable', status: FILTER.COMPLETED}
				])
			});
			const action = toggleComplete(0, 1);
			console.log(initialState.todos instanceof ImAr);
			console.log("isFrozen", Object.isFrozen(initialState.todos));
			
			const nextState = todoReducer(initialState, action);
			
			expectTodosToEqual(nextState, [
				{id: 1, text: 'React', status: FILTER.COMPLETED},
				{id: 2, text: 'Redux', status: FILTER.ACTIVE},
				{id: 3, text: 'Immutable', status: FILTER.COMPLETED}
			]);
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
			
			expectTodosToEqual(nextState, [
				{id: 1, text: 'React', status: FILTER.ACTIVE},
				{id: 2, text: 'Redux', status: FILTER.ACTIVE},
				{id: 3, text: 'Immutable', status: FILTER.ACTIVE}
			]);
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
			
			expectTodosToEqual(nextState, [
				{id: 1, text: 'React', status: FILTER.ACTIVE, editing: true, selectText: false}
			]);
		});
		
		it('should handle SELECT_EDIT_ITEM by setting editing and selectText to true', () => {
			const initialState = new ListRecord({
				todos: fromJS([
					{id: 1, text: 'React', status: FILTER.ACTIVE, editing: false}
				])
			});
			const action = selectEditItem(0, 1);
			
			const nextState = todoReducer(initialState, action);
			
			expectTodosToEqual(nextState, [
				{id: 1, text: 'React', status: FILTER.ACTIVE, editing: true, selectText: true}
			]);
		});
		
		it('should handle CANCEL_EDITING by setting editing to false', () => {
			const initialState = new ListRecord({
				todos: fromJS([
					{id: 1, text: 'React', status: FILTER.ACTIVE, editing: true}
				])
			});
			const action = cancelEditing(0, 1);
			
			const nextState = todoReducer(initialState, action);
			expectTodosToEqual(nextState, [
				{id: 1, text: 'React', status: FILTER.ACTIVE, editing: false}
			]);
		});
		
		it('should handle DONE_EDITING by updating the text', () => {
			const initialState = new ListRecord({
				todos: fromJS([
					{id: 1, text: 'React', status: FILTER.ACTIVE, editing: true}
				])
			});
			const action = doneEditing(0, 1, "Redux");
			
			const nextState = todoReducer(initialState, action);
			expectTodosToEqual(nextState, [
				{id: 1, text: 'Redux', status: FILTER.ACTIVE, editing: false}
			]);
		});
		
		it('should handle CLEAR_COMPLETED by removing all the completed items', () => {
			const initialState = new ListRecord({
				todos: fromJS([
					{id: 1, text: 'React', status: FILTER.ACTIVE},
					{id: 2, text: 'Redux', status: FILTER.COMPLETED}
				])
			});
			const action = clearCompleted(0);
			
			const nextState = todoReducer(initialState, action);
			
			expectTodosToEqual(nextState, [
				{id: 1, text: 'React', status: FILTER.ACTIVE}
			]);
		});
		
		it('should handle ADD_ITEM by adding the item', () => {
			const initialState = new ListRecord({
				todos: fromJS([
					{id: 1, text: 'React', status: FILTER.ACTIVE}
				])
			});
			const action = addItem(0, "Redux");
			
			const nextState = todoReducer(initialState, action);
			
			expectTodosToEqual(nextState, [
				{id: 1, text: 'React', status: FILTER.ACTIVE},
				{id: nextState.todos[1].id, text: 'Redux', status: FILTER.ACTIVE}
			]);
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
			
			expectTodosToEqual(nextState, [
				{id: 1, text: 'React', status: FILTER.ACTIVE}
			]);
		});
		
		it('should handle CHANGE_TITLE by changing the title', () => {
			const initialState = new ListRecord({
				title: "Title"
			});
			const action = changeTitle(0, "New title");
			
			const nextState = todoReducer(initialState, action);
			
			expect(nextState).to.have.property("title").that.equals("New title");
		});
		
		it('should set newlyAdded property to false on any reduction', () => {
			const initialState = new ListRecord({
				newlyAdded: true
			});
			
			const nextState = todoReducer(initialState, {});
			
			expect(nextState).to.have.property("newlyAdded").that.is.false;
		});
	});
	
	describe('listsReducer', () => {
		function expectListsToEqual(state, lists) {
			expect(state.lists.length).to.equal(lists.length);
			
			for(let i = 0, len = lists.length; i < len; ++i) {
				const list = state.lists[i];
				expect(list.id).to.equal(lists[i].id);
				expect(list.title).to.equal(lists[i].title);
				expectTodosToEqual(list, lists[i].todos);
			}
		}
		
		it('should handle MOVE_ITEM by moving the item to a new index', () => {
			const initialState = {
				lists: List.of(new ListRecord({
					id: 1,
					title: "Technologies used",
					todos: fromJS([
						{id: 1, text: 'React'},
						{id: 2, text: 'Redux'}
					])
				}))
			};
			const action = moveItem([0,1], [0,0]);
			
			const nextState = listsReducer(initialState, action);
			
			expectListsToEqual(nextState, List.of(
					new ListRecord({
						id: 1,
						title: "Technologies used",
						todos: fromJS([
							{id: 2, text: 'Redux'},
							{id: 1, text: 'React'}
						])
					})
			));
		});
		
		it('should handle ADD_LIST by adding a new list', () => {
			const initialState = {
				lists: List.of(new ListRecord({
					id: 1,
					title: "Technologies used",
					todos: fromJS([
						{id: 1, text: 'React'},
						{id: 2, text: 'Redux'},
						{id: 3, text: 'Immutable'}
					])
				}))
			};
			const action = addList();
			
			const nextState = listsReducer(initialState, action);
			
			expectListsToEqual(nextState, List.of(
					new ListRecord({
						id: 1,
						title: "Technologies used",
						todos: fromJS([
							{id: 1, text: 'React'},
							{id: 2, text: 'Redux'},
							{id: 3, text: 'Immutable'}
						])
					}),
					new ListRecord({id: nextState.lists[1].id, newlyAdded: true})
			));
		});
		
		it('should handle REMOVE_LIST by deleting the list', () => {
			const initialState = {
				lists: List.of(
					new ListRecord({
						id: 1,
						title: "Technologies used",
						todos: fromJS([
							{id: 1, text: 'React'},
							{id: 2, text: 'Redux'},
							{id: 3, text: 'Immutable'}
						])
					}),
					new ListRecord({
						id: 2,
						title: "List to delete"
					})
				)
			};
			const action = removeList(1);
			
			const nextState = listsReducer(initialState, action);
			
			expectListsToEqual(nextState, List.of(
					new ListRecord({
						id: 1,
						title: "Technologies used",
						todos: fromJS([
							{id: 1, text: 'React'},
							{id: 2, text: 'Redux'},
							{id: 3, text: 'Immutable'}
						])
					})
			));
		});
		
		it('should handle MOVE_LIST by moving the list', () => {
			const initialState = {
				lists: List.of(
					new ListRecord({
						id: 1,
						title: "Technologies used",
						todos: fromJS([
							{id: 1, text: 'React'},
							{id: 2, text: 'Redux'},
							{id: 3, text: 'Immutable'}
						])
					}),
					new ListRecord({
						id: 2,
						title: "List to move"
					})
				)
			};
			const action = moveList(0, 1);
			
			const nextState = listsReducer(initialState, action);
			
			expectListsToEqual(nextState, List.of(
					new ListRecord({
						id: 2,
						title: "List to move"
					}),
					new ListRecord({
						id: 1,
						title: "Technologies used",
						todos: fromJS([
							{id: 1, text: 'React'},
							{id: 2, text: 'Redux'},
							{id: 3, text: 'Immutable'}
						])
					})
			));
		});
	});
});
