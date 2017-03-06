import React, {Component} from 'react';
import classnames from 'classnames';

import {DragSource, DropTarget} from 'react-dnd';
import {TODO_ITEM} from '../helpers/itemTypes';
import {compose} from 'redux';

import TextInput from './TextInput';

import sameExceptFor from '../helpers/propsSameExcept';


const todoItemSource = {
	beginDrag({id, itemPath}) {
		return {
			id,
			originalItemPath: itemPath,
			currentItemPath: itemPath
		};
	},
	canDrag({isEditing}) {
		return !isEditing;
	},
	endDrag(props, monitor) {
		if(!monitor.didDrop()) {
			const {originalItemPath, currentItemPath} = monitor.getItem();
			
			// don't dispatch actions when there is no movement from last location
			if(originalItemPath[0] === currentItemPath[0] && originalItemPath[1] === currentItemPath[1]) return;
			
			props.moveItem(currentItemPath, originalItemPath);
		}
	},
	isDragging({id}, monitor) {
		return id === monitor.getItem().id;
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
		const draggingItem = monitor.getItem();
		const {id: draggedId, currentItemPath: lastItemPath} = draggingItem;
		const {id: overId, itemPath: overItemPath} = props;
		
		// console.log("now over", overItemPath);
		
		if(draggedId !== overId) {
			// const [overIndex] = props.findItem(overId);
			// const draggedEntry = props.findItem(draggedId);
			draggingItem.currentItemPath = overItemPath;
			// console.log("reassigned monitored to", monitor.getItem());
			
			props.moveItem(lastItemPath, overItemPath);
		}
	}
};

function collectTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	};
}

const sameExceptForItemPath = sameExceptFor("itemPath");

class TodoItem extends Component {

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
	
	shouldComponentUpdate(nextProps) {
		return !sameExceptForItemPath(nextProps, this.props);
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
		console.log(`Item ${this.props.text} UPDATED with`, updatedProps);
	}
}

export default compose(
	DragSource(TODO_ITEM, todoItemSource, collectSource),
	DropTarget(TODO_ITEM, todoItemTarget, collectTarget)
)(TodoItem);
