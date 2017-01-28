import React, {PureComponent} from 'react';
import TodoItem from './TodoItem';


export default class TodoList extends PureComponent {
	getItems() {
		const {todos, ...rest} = this.props;
		return todos.map(item =>
			<TodoItem key={item.get('id')}
				{...rest}
				id={item.get("id")}
				text={item.get('text')}
				isCompleted={item.get('status') === 'completed'}
				isEditing={item.get('editing')}
				selectText={item.get("selectText")}
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
