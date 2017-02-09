import React, {PureComponent} from 'react';
import classnames from 'classnames';

import {DragSource, DropTarget} from 'react-dnd';
import * as ItemTypes from '../helpers/itemTypes';
import {compose} from 'redux';

import TextInput from './TextInput';


const todoItemSource = {
	beginDrag({id, findItem}) {
		console.log("BEGIN DRAG", id);
		return {
			id,
			originalIndex: findItem(id)
		};
	}
};

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

const todoItemTarget = {
	canDrop() {
		return false;
	},
	hover(props, monitor) {
		const {id: draggedId} = monitor.getItem();
		const {id: overId} = props;
		// console.log("HOVERING", draggedId, "over", overId);
		
		if(draggedId !== overId) {
			const [overIndex] = props.findItem(overId);
			const draggedEntry = props.findItem(draggedId);
			props.moveItem(draggedEntry, overIndex);
		}
	}
};

function collectTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	};
}

class TodoItem extends PureComponent {

	render() {
		const {id, text, isCompleted: completed, isEditing: editing, selectText, deleteItem, editItem, selectEditItem, toggleComplete, cancelEditing, doneEditing, connectDragSource, isDragging, connectDropTarget} = this.props;
		
		const itemClass = classnames("todo", {completed, editing});
		
		return connectDragSource(connectDropTarget(
			<li className={itemClass} style={{opacity: isDragging ? 0.2 : 1}}>
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
		));
	}
}

export default compose(
	DragSource(ItemTypes.TODO_ITEM, todoItemSource, collectSource),
	DropTarget(ItemTypes.TODO_ITEM, todoItemTarget, collectTarget)
)(TodoItem);
