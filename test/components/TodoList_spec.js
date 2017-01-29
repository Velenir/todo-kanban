import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils';
import TodoList from '../../app/components/TodoList';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import {filterTodos} from '../../app/helpers/immutableHelpers';

describe('TodoList', () => {
	it('should render a list with only the active items if the fiter is active', () => {
		const todos = List.of(
      Map({id: 1, text: 'React', status: 'active'}),
      Map({id: 2, text: 'Redux', status: 'active'}),
      Map({id: 3, text: 'Immutable', status: 'completed'})
    ),
			filter = 'active';
			
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
		const todos = List.of(
			Map({id: 1, text: 'React', status: 'active'}),
			Map({id: 2, text: 'Redux', status: 'active'}),
			Map({id: 3, text: 'Immutable', status: 'completed'})
		),
			filter = 'completed';
			
		const filteredTodos = filterTodos(todos,filter).todos;
			
		const component = renderIntoDocument(
			<TodoList todos={filteredTodos} />
		);
		const items = scryRenderedDOMComponentsWithTag(component, 'li');
		
		expect(items.length).to.equal(1);
		expect(items[0].textContent).to.contain('Immutable');
	});
	
	it('should render a list with all the items', () => {
		const todos = List.of(
			Map({id: 1, text: 'React', status: 'active'}),
			Map({id: 2, text: 'Redux', status: 'active'}),
			Map({id: 3, text: 'Immutable', status: 'completed'})
		),
			filter = 'all';
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
