import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedComponentsWithType} from 'react-addons-test-utils';
import DropTodoList from '../../app/components/TodoList';
import DragTodoItem from '../../app/components/TodoItem';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import {expect} from 'chai';
import {filterTodos, fromJS} from '../../app/helpers/immutableHelpers';
import * as FILTER from '../../app/reducers/filterVars';

describe('TodoList', () => {
	// Wrap DnD component in context with test backend
	const TodoList = DragDropContext(TestBackend)(DropTodoList);
	
	it('should render a list with only the active items if the fiter is active', () => {
		const todos = fromJS([
      {id: 1, text: 'React', status: FILTER.ACTIVE},
      {id: 2, text: 'Redux', status: FILTER.ACTIVE},
      {id: 3, text: 'Immutable', status: FILTER.COMPLETED}
			]),
			filter = FILTER.ACTIVE;
			
		const filteredTodos = filterTodos(todos,filter).todos;
		
		const component = renderIntoDocument(
			<TodoList todos={filteredTodos} />
		);
		
		const items = scryRenderedDOMComponentsWithTag(component, "li");
		
		expect(items).to.have.length.of(2);
		expect(items[0].textContent).to.contain("React");
		expect(items[1].textContent).to.contain("Redux");
	});
	
	it('should render a list with only completed items if the filter is completed', () => {
		const todos = fromJS([
      {id: 1, text: 'React', status: FILTER.ACTIVE},
      {id: 2, text: 'Redux', status: FILTER.ACTIVE},
      {id: 3, text: 'Immutable', status: FILTER.COMPLETED}
			]),
			filter = FILTER.COMPLETED;
			
		const filteredTodos = filterTodos(todos,filter).todos;
			
		const component = renderIntoDocument(
			<TodoList todos={filteredTodos} />
		);
		const items = scryRenderedDOMComponentsWithTag(component, 'li');
		
		expect(items).to.have.length.of(1);
		expect(items[0].textContent).to.contain('Immutable');
	});
	
	it('should render a list with all the items', () => {
		const todos = fromJS([
			{id: 1, text: 'React', status: FILTER.ACTIVE},
			{id: 2, text: 'Redux', status: FILTER.ACTIVE},
			{id: 3, text: 'Immutable', status: FILTER.COMPLETED}
			]),
			filter = FILTER.ALL;
		const component = renderIntoDocument(
			<TodoList filter={filter} todos={todos} />
		);
		const items = scryRenderedDOMComponentsWithTag(component, 'li');
		
		expect(items).to.have.length.of(3);
		expect(items[0].textContent).to.contain('React');
		expect(items[1].textContent).to.contain('Redux');
		expect(items[2].textContent).to.contain('Immutable');
	});
	
	it('should move item on hover when dragging', () => {
		const todos = fromJS([
			{id: 1, text: 'React', status: FILTER.ACTIVE},
			{id: 2, text: 'Redux', status: FILTER.ACTIVE},
			{id: 3, text: 'Immutable', status: FILTER.ACTIVE}
			]),
			filter = FILTER.ALL;
		
		let moveArguments = null;
		// Keep track of moveItem function execution
		const moveItem = (...args) => moveArguments = args;
		
		const component = renderIntoDocument(
			<TodoList filter={filter} todos={todos} moveItem={moveItem} listIndex={1}/>
		);
		const backend = component.getManager().getBackend();
		
		const todoItems = scryRenderedComponentsWithType(component, DragTodoItem);
		
		backend.simulateBeginDrag([todoItems[2].getHandlerId()]);
		// hover over DropTarget-wrapped instance
		backend.simulateHover([todoItems[0].getDecoratedComponentInstance().getHandlerId()]);
		
		expect(moveArguments).to.deep.equal([[1,2], [1,0]]);
		
		backend.simulateEndDrag();
	});
	
	it('should not move item on hover over item itself when dragging', () => {
		const todos = fromJS([
			{id: 1, text: 'React', status: FILTER.ACTIVE},
			{id: 2, text: 'Redux', status: FILTER.ACTIVE},
			{id: 3, text: 'Immutable', status: FILTER.ACTIVE}
			]),
			filter = FILTER.ALL;
		
		let moveArguments = null;
		// Keep track of moveItem function execution
		const moveItem = (draggedEntry, overIndex) => moveArguments = {draggedEntry, overIndex};
		
		const component = renderIntoDocument(
			<TodoList filter={filter} todos={todos} moveItem={moveItem} listIndex={1}/>
		);
		const backend = component.getManager().getBackend();
		
		const todoItems = scryRenderedComponentsWithType(component, DragTodoItem);
		
		backend.simulateBeginDrag([todoItems[2].getHandlerId()]);
		// hover over DropTarget-wrapped instance of itself
		backend.simulateHover([todoItems[2].getDecoratedComponentInstance().getHandlerId()]);
		
		// Verify that item wasn't moved
		expect(moveArguments).to.be.null;
		
		backend.simulateEndDrag();
	});
	
	it('should retain item in its position from last hover when dropped in valid location', () => {
		const todos = fromJS([
			{id: 1, text: 'React', status: FILTER.ACTIVE},
			{id: 2, text: 'Redux', status: FILTER.ACTIVE},
			{id: 3, text: 'Immutable', status: FILTER.ACTIVE}
			]),
			filter = FILTER.ALL;
		
		let moveArguments = null;
		// Keep track of moveItem function execution
		const moveItem = (...args) => moveArguments = args;
		
		const component = renderIntoDocument(
			<TodoList filter={filter} todos={todos} moveItem={moveItem} listIndex={1}/>
		);
		const backend = component.getManager().getBackend();
		
		const todoItems = scryRenderedComponentsWithType(component, DragTodoItem);
		
		backend.simulateBeginDrag([todoItems[2].getHandlerId()]);
		// hover over DropTarget-wrapped instance
		backend.simulateHover([todoItems[0].getDecoratedComponentInstance().getHandlerId()]);
		
		// to index 0 on hover
		expect(moveArguments).to.deep.equal([[1,2], [1,0]]);
		backend.simulateDrop();
		
		// stay at index 0 on endDrag
		expect(moveArguments).to.deep.equal([[1,2], [1,0]]);
		backend.simulateEndDrag();
	});
	
	it('should return item back to its original position when dropped not in valid location', () => {
		const todos = fromJS([
			{id: 1, text: 'React', status: FILTER.ACTIVE},
			{id: 2, text: 'Redux', status: FILTER.ACTIVE},
			{id: 3, text: 'Immutable', status: FILTER.ACTIVE}
			]),
			filter = FILTER.ALL;
		
		let moveArguments = null;
		// Keep track of moveItem function execution
		const moveItem = (...args) => moveArguments = args;
		
		const component = renderIntoDocument(
			<TodoList filter={filter} todos={todos} moveItem={moveItem} listIndex={1}/>
		);
		const backend = component.getManager().getBackend();
		
		const todoItems = scryRenderedComponentsWithType(component, DragTodoItem);
		
		backend.simulateBeginDrag([todoItems[2].getHandlerId()]);
		// hover over DropTarget-wrapped instance
		backend.simulateHover([todoItems[0].getDecoratedComponentInstance().getHandlerId()]);
		
		// to index 0 on hover
		expect(moveArguments).to.deep.equal([[1,2], [1,0]]);
		// without dropping
		backend.simulateEndDrag();
		// back to index 2 on endDrag
		expect(moveArguments).to.deep.equal([[1,0], [1,2]]);
	});
});
