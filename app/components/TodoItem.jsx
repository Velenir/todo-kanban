import React, {PureComponent} from 'react';
import classnames from 'classnames';

import {DragSource} from 'react-dnd';
import * as ItemTypes from '../helpers/itemTypes';

import TextInput from './TextInput';


const todoItemSource = {
	beginDrag({id}) {
		return {id};
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}


class TodoItem extends PureComponent {

	render() {
		const {id, text, isCompleted: completed, isEditing: editing, selectText, deleteItem, editItem, selectEditItem, toggleComplete, cancelEditing, doneEditing, connectDragSource, isDragging} = this.props;
		
		const itemClass = classnames("todo", {completed, editing});
		
		return connectDragSource(
			<li className={itemClass} style={{opacity: isDragging ? 0.5 : 1}}>
				<div className="view">
					<input type="checkbox" className="toggle"
						checked={completed}
						onChange={() => toggleComplete(id)}
					/>
					<label htmlFor="todo" ref={c => this.text = c} onDoubleClick={() => editItem(id)}>
						<span onDoubleClick={(e) => (e.stopPropagation(), selectEditItem(id))}>{text}</span>
					</label>
					<button className="destroy" onClick={() => deleteItem(id)}></button>
				</div>
				{editing && <TextInput
					text={text} itemId={id}
					cancelEditing={cancelEditing} doneEditing={doneEditing}
					selectText={selectText}
				/>}
			</li>
		);
	}
}

export default DragSource(ItemTypes.TODO_ITEM, todoItemSource, collect)(TodoItem);
