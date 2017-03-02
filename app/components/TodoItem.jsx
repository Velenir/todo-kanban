import React, {PureComponent} from 'react';
import classnames from 'classnames';

import {DragSource, DropTarget} from 'react-dnd';
import {TODO_ITEM} from '../helpers/itemTypes';
import {compose} from 'redux';

import TextInput from './TextInput';


const todoItemSource = {
	beginDrag({id, findItem, listIndex}) {
		return {
			id,
			originalIndex: findItem(id)[0],
			originalListIndex: listIndex,
			findOriginalItem: findItem
		};
	},
	canDrag({isEditing}) {
		return !isEditing;
	},
	endDrag(props, monitor) {
		// if dropped not on DropTarget (neither on TodoItem nor on TodoList)
		if(!monitor.didDrop()) {
			// return to original place
			const {id, originalIndex} = monitor.getItem();
			props.moveItem(props.findItem(id), originalIndex);
		}
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
		const draggedItem = monitor.getItem();
		const {id: draggedId, originalListIndex: fromListIndex, findOriginalItem} = draggedItem;
		const {id: overId, listIndex} = props;
		// console.log("source", fromListIndex, draggedId);
		// console.log("hovering over", props.listIndex, props.id, props.text);
		
		// move only if not the same item
		if(draggedId !== overId || fromListIndex !== listIndex) {
			const [overIndex] = props.findItem(overId);
			const draggedEntry = findOriginalItem(draggedId);
			Object.assign(draggedItem, {
				findOriginalItem: props.findItem,
				originalListIndex: listIndex
			});
			props.moveItem(draggedEntry, overIndex, fromListIndex);
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
			<li className={itemClass} style={{opacity: isDragging ? 0.05 : 1}}>
				<div className="view">
					<input type="checkbox" className="toggle"
						checked={completed}
						onChange={() => toggleComplete(id)}
					/>
					<label htmlFor="todo" onDoubleClick={() => editItem(id)}>
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
	DragSource(TODO_ITEM, todoItemSource, collectSource),
	DropTarget(TODO_ITEM, todoItemTarget, collectTarget)
)(TodoItem);
