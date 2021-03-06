import React, {Component} from 'react';
import TodoList from '../components/TodoList';
import TodoTools from '../components/TodoTools';
import TodoHeader from '../components/TodoHeader';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

 
class App extends Component {
	render() {
		const {changeFilter, clearCompleted, addItem, todos, activeItems, filter, ...rest} = this.props;
		
		return (
			<div>
				<section className="todoapp">
					<TodoHeader addItem={addItem}/>
					<TodoList todos={todos} {...rest}/>
					<TodoTools  changeFilter={changeFilter}
						filter={filter}
						nbActiveItems={activeItems}
						clearCompleted={clearCompleted}
					/>
				</section>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(App);
