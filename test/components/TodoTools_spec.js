import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import TodoTools from '../../app/components/TodoTools';
import * as FILTER from '../../app/reducers/filterVars';
import {expect} from 'chai';

describe('TodoTools', () => {
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
	
	it('should call a callback when the user clicks on Clear Completed buttons', () => {
		let cleared = false;
		const clearCompleted = () => cleared = true;
		const component = renderIntoDocument(
			<TodoTools clearCompleted={clearCompleted} />
		);
		
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);
		
		expect(cleared).to.equal(true);
	});
});
