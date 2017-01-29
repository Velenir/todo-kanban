import React from 'react';
import {connect} from 'react-redux';
import TodoList from '../components/TodoList';
import TodoTools from '../components/TodoTools';
import TodoHeader from '../components/TodoHeader';

import * as actions from '../actions';
import {filterTodos} from '../helpers/immutableHelpers';
 
const App = ({changeFilter, clearCompleted, addItem, todos, activeItems, filter, ...rest}) => {	
	return (
		<div>
			<section className="todoapp">
				<TodoHeader addItem={addItem}/>
				<TodoList todos={todos} {...rest} />
				<TodoTools  changeFilter={changeFilter}
					filter={filter}
					nbActiveItems={activeItems}
					clearCompleted={clearCompleted}
				/>
			</section>
		</div>
	);
};

const mapStateToProps = ({todos, filter}) => filterTodos(todos, filter);

// actions get wrapped in dispatch call
export default connect(mapStateToProps, actions)(App);
