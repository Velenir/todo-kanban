import React from 'react';
import {renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils';
import DragApp from '../../app/components/App';
import TodoTools from '../../app/components/TodoTools';
import {expect} from 'chai';
import {fromJS} from '../../app/helpers/immutableHelpers';
import {List} from 'immutable';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';

describe('App', () => {
	// Wrap DnD component in context with test backend
	const App = DragDropContext(TestBackend)(DragApp);
	
	it('should render TodoTools if there are todo items', () => {
		const todos = fromJS([
			{id: 1, text: 'React'},
			{id: 2, text: 'Redux'},
			{id: 3, text: 'Immutable'}
		]);
		const component = renderIntoDocument(
			<App todos={todos}/>
		);
		const todoTools = scryRenderedComponentsWithType(component, TodoTools);
		
		expect(todoTools).to.have.length.of(1);
	});
	
	it('should no render TodoTools if there are no todo items', () => {
		const todos = List();
		const component = renderIntoDocument(
			<App todos={todos}/>
		);
		const todoTools = scryRenderedComponentsWithType(component, TodoTools);
		
		expect(todoTools).to.have.length.of(0);
	});
	
	it('should lower opacity when dragged', () => {
		const todos = List();
		const component = renderIntoDocument(
			<App todos={todos}/>
		);
		
		const backend = component.getManager().getBackend();
		
		// Test that opacity is 1
		const divs = scryRenderedDOMComponentsWithTag(component, "div");
		expect(divs[0].style.opacity).to.equal("1");
		
		// Find the drag source ID and use it to simulate the dragging operation
		const app = findRenderedComponentWithType(component, DragApp);
		backend.simulateBeginDrag([app.getDecoratedComponentInstance().getHandlerId()]);
		
		// Verify that the li changed its opacity
		expect(divs[0].style.opacity).to.be.below(1);
		
		backend.simulateEndDrag();
	});
});
