import React, {PureComponent} from 'react';
import TodoItem from './TodoItem';


export default class TodoList extends PureComponent {
	getItems() {
		const {todos, ...rest} = this.props;
		return todos.map(item =>
			<TodoItem key={item.id}
				{...rest}
				id={item.id}
				text={item.text}
				isCompleted={item.status === 'completed'}
				isEditing={item.editing}
				selectText={item.selectText}
			/>
		);
	}
	
	render() {
		return (
			<section className="main">
				<ul className="todo-list">
					{this.getItems()}
				</ul>
			</section>
		);
	}
}
