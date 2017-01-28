import React from 'react';
import {connect} from 'react-redux';
import TodoList from '../components/TodoList';
import TodoTools from '../components/TodoTools';
import TodoHeader from '../components/TodoHeader';

import * as actions from '../actions';
 
const App = ({changeFilter, clearCompleted, addItem, ...rest}) => {
	const activeItems = rest.todos ? rest.todos.filter(item => item.get("status") === "active").size : 0;
	
	return (
		<div>
			<section className="todoapp">
				<TodoHeader addItem={addItem}/>
				<TodoList {...rest} />
				<TodoTools  changeFilter={changeFilter}
					filter={rest.filter}
					nbActiveItems={activeItems}
					clearCompleted={clearCompleted}
				/>
			</section>
		</div>
	);
};

const mapStateToProps = (state) => ({
	todos: state.get("todos"),
	filter: state.get("filter")
});

// actions get wrapped in dispatch call
export default connect(mapStateToProps, actions)(App);
