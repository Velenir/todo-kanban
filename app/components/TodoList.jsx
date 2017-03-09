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
		const {todos, connectDropTarget, listIndex, ...rest} = this.props;	//eslint-disable-line no-unused-vars
		return todos.map((item, i) =>
			item && <TodoItem key={item.id}
				{...rest}
				id={item.id}
				text={item.text}
				isCompleted={item.status === FILTER.COMPLETED}
				isEditing={item.editing}
				selectText={item.selectText}
				itemPath={[listIndex, i]}
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
	
	componentDidUpdate(prevProps) {
		const updatedProps = {};
		for(let prop in prevProps) {
			const prevProp = prevProps[prop];
			const currentProp = this.props[prop];
			if(prevProp !== currentProp) {
				updatedProps[prop] = `${prevProp} -> ${currentProp}`;
			}
		}
		console.log(`List ${this.props.listIndex} UPDATED with`, updatedProps);
	}
}

export default DropTarget(TODO_ITEM, todoListTarget, collectTarget)(TodoList);
