import React from 'react';
import {connect} from 'react-redux';
import TodoList from '../components/TodoList';
import TodoTools from '../components/TodoTools';
import TodoHeader from '../components/TodoHeader';

import * as actions from '../actions';
 
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

function filterTodos(todos, filter) {
	let activeItems = 0;
		
	if(filter !== "all") {
		
		todos = todos.filter(item => {
			const status = item.get("status");
			if(status === "active") ++activeItems;
			return status === filter;
		});
	}	else {
		activeItems = todos.filter(item => item.get("status") === "active").size;
	}
	
	return {activeItems, todos, filter};
}

const mapStateToProps = ({todos, filter}) => filterTodos(todos, filter);

// actions get wrapped in dispatch call
export default connect(mapStateToProps, actions)(App);
