import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils';
import TodoList from '../../app/components/TodoList';
import {expect} from 'chai';
import {filterTodos, fromJS} from '../../app/helpers/immutableHelpers';
import * as FILTER from '../../app/reducers/filterVars';

describe('TodoList', () => {
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
		
		expect(items.length).to.equal(2);
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
		
		expect(items.length).to.equal(1);
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
		
		expect(items.length).to.equal(3);
		expect(items[0].textContent).to.contain('React');
		expect(items[1].textContent).to.contain('Redux');
		expect(items[2].textContent).to.contain('Immutable');
	});
});
