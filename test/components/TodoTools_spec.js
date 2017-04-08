import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedComponentWithType, Simulate} from 'react-dom/test-utils';
import DropTodoTools from '../../app/components/TodoTools';
import * as FILTER from '../../app/reducers/filterVars';
import {expect} from 'chai';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import DragTodoItem from '../../app/components/TodoItem';

describe('TodoTools', () => {
	// Wrap DnD component in context with test backend
	const TodoTools = DragDropContext(TestBackend)(DropTodoTools);
	
	it('should display the number of items left', () => {
		const nbActiveItems = 3;
		const component = renderIntoDocument(
			<TodoTools nbActiveItems={nbActiveItems} />
		);
		
		const tools = scryRenderedDOMComponentsWithTag(component, 'footer');
		
		expect(tools[0].textContent).to.contain('3');
	});
	
	it('should highlight the active filter', () => {
		const filter = FILTER.ACTIVE;
		const component = renderIntoDocument(
			<TodoTools filter={filter} />
		);
		
		const filters = scryRenderedDOMComponentsWithTag(component, 'a');
		
		expect(filters[0].classList.contains('selected')).to.be.false;
		expect(filters[1].classList.contains('selected')).to.be.true;
		expect(filters[2].classList.contains('selected')).to.be.false;
	});
	
	it('should not render a Clear Completed button when there are no completed items', () => {
		const component = renderIntoDocument(
			<TodoTools nbCompletedItems={0}/>
		);
		
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		
		expect(buttons).to.have.length.of(0);
	});
	
	it('should call a callback when the user clicks on the Clear Completed button', () => {
		let cleared = false;
		const clearCompleted = () => cleared = true;
		const component = renderIntoDocument(
			<TodoTools clearCompleted={clearCompleted} nbCompletedItems={3}/>
		);
		
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);
		
		expect(cleared).to.be.true;
	});
	
	it('should move item to bottom on hover when dragging across lists', () => {
		let moveArguments = null;
		const moveItem = (...args) => moveArguments = args;
		
		const Wrapper = () => (
			<div>
				<DropTodoTools listIndex={1} moveItem={moveItem}/>
				<DragTodoItem itemPath={[0, 0]} moveItem={() => {}}/>
			</div>
		);
		
		// Wrap DnD component in context with test backend
		const DnDWrapper = DragDropContext(TestBackend)(Wrapper);
		
		const component = renderIntoDocument(<DnDWrapper/>);
		
		const backend = component.getManager().getBackend();
		
		const todoItem = findRenderedComponentWithType(component, DragTodoItem);
		const todoTools = findRenderedComponentWithType(component, DropTodoTools);
		
		backend.simulateBeginDrag([todoItem.getHandlerId()]);
		// hover over DropTarget-wrapped instance
		backend.simulateHover([todoTools.getHandlerId()]);
		
		expect(moveArguments).to.deep.equal([[0,0], [1,-0]]);
		
		backend.simulateEndDrag();
	});
	
	it('should not move item on hover when dragging within same list', () => {
		let moveArguments = null;
		const moveItem = (...args) => moveArguments = args;
		
		const Wrapper = () => (
			<div>
				<DropTodoTools listIndex={1} moveItem={moveItem}/>
				<DragTodoItem itemPath={[1, 0]} moveItem={() => {}}/>
			</div>
		);
		
		// Wrap DnD component in context with test backend
		const DnDWrapper = DragDropContext(TestBackend)(Wrapper);
		
		const component = renderIntoDocument(<DnDWrapper/>);
		
		const backend = component.getManager().getBackend();
		
		const todoItem = findRenderedComponentWithType(component, DragTodoItem);
		const todoTools = findRenderedComponentWithType(component, DropTodoTools);
		
		backend.simulateBeginDrag([todoItem.getHandlerId()]);
		// hover over DropTarget-wrapped instance
		backend.simulateHover([todoTools.getHandlerId()]);
		
		expect(moveArguments).to.deep.be.null;
		
		backend.simulateEndDrag();
	});
});
