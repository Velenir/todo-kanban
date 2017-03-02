import React, {PureComponent} from 'react';
import TodoItem from './TodoItem';
import * as FILTER from '../reducers/filterVars';

import {TODO_ITEM} from '../helpers/itemTypes';
import {DropTarget} from 'react-dnd';

const todoListTarget = {
	drop() {}
};

function collectTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	};
}

class TodoList extends PureComponent {
	getItems() {
		const {todos, connectDropTarget, ...rest} = this.props;	//eslint-disable-line no-unused-vars
		return todos.map(item =>
			<TodoItem key={item.id}
				{...rest}
				id={item.id}
				text={item.text}
				isCompleted={item.status === FILTER.COMPLETED}
				isEditing={item.editing}
				selectText={item.selectText}
			/>
		);
	}
	
	render() {
		return this.props.connectDropTarget(
			<section className="main">
				<ul className="todo-list">
					{this.getItems()}
				</ul>
			</section>
		);
	}
}

export default DropTarget(TODO_ITEM, todoListTarget, collectTarget)(TodoList);
