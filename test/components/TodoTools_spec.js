import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedComponentWithType, Simulate} from 'react-addons-test-utils';
import DropTodoTools from '../../app/components/TodoTools';
import * as FILTER from '../../app/reducers/filterVars';
import {expect} from 'chai';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import DragTodoItem from '../../app/components/TodoItem';

describe.only('TodoTools', () => {
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
		
		expect(filters[0].classList.contains('selected')).to.equal(false);
		expect(filters[1].classList.contains('selected')).to.equal(true);
		expect(filters[2].classList.contains('selected')).to.equal(false);
	});
	
	it('should not render a Clear Completed button when there are no completed items', () => {
		const component = renderIntoDocument(
			<TodoTools nbCompletedItems={0}/>
		);
		
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		
		expect(buttons.length).to.equal(0);
	});
	
	it('should call a callback when the user clicks on the Clear Completed button', () => {
		let cleared = false;
		const clearCompleted = () => cleared = true;
		const component = renderIntoDocument(
			<TodoTools clearCompleted={clearCompleted} nbCompletedItems={3}/>
		);
		
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);
		
		expect(cleared).to.equal(true);
	});
});
