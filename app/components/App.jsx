import React, {PureComponent} from 'react';
import TodoList from '../components/TodoList';
import TodoTools from '../components/TodoTools';
import TodoHeader from '../components/TodoHeader';

import {DragSource, DropTarget} from 'react-dnd';
import {APP} from '../helpers/itemTypes';
import {compose} from 'redux';


const appSource = {
	beginDrag({listIndex}) {
		return {
			currentListIndex: listIndex,
			originalListIndex: listIndex
		};
	},
	endDrag(props, monitor) {
		console.log("endDrag list", props.listIndex, props.title);
		if(!monitor.didDrop()) {
			const {currentListIndex, originalListIndex} = monitor.getItem();
			
			// don't dispatch actions when there is no movement from last location
			if(currentListIndex === originalListIndex) return;
			console.log("RETURNING");
			props.moveList(currentListIndex, originalListIndex);
		}
	}
};

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	};
}

function smallMovement(prev, cur) {
	console.log("was:", prev, "now:", cur, typeof cur);
	const dx = prev.x - cur.x;
	const dy = prev.y - cur.y;
	const deltaSquared = dx * dx + dy * dy;
	console.log(deltaSquared < 900 ? "stop" : "proceed");
	return deltaSquared < 900;
}

const appTarget = {
	canDrop() {
		return false;
	},
	hover(props, monitor) {
		const draggingItem = monitor.getItem();
		const {currentListIndex} = draggingItem;
		
		const {listIndex: overListIndex} = props;
		
		if(currentListIndex !== overListIndex) {
			const {lastOffset} = draggingItem;
			const currentOffset = monitor.getClientOffset();
			
			if(lastOffset && currentOffset && smallMovement(lastOffset, currentOffset)) return;
			
			draggingItem.lastOffset = currentOffset;
			
			// keep track of last location
			draggingItem.currentListIndex = overListIndex;
			
			props.moveList(overListIndex, currentListIndex);
		}
	}
};

function collectTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	};
}

 
class App extends PureComponent {
	render() {
		// eslint-disable-next-line no-unused-vars
		const {removeList, changeFilter, changeTitle, clearCompleted, addItem, moveItem, activeItems, filter, listIndex, title, newlyAdded, connectDropTarget, connectDragSource, connectDragPreview, isDragging, todos, id, ...rest} = this.props;
		
		const totalItems = todos.length;
		
		return connectDropTarget(connectDragPreview(
			<div ref={c => this.element = c} style={{opacity: isDragging ? 0.3 : 1}} className="appwrapper">
				<section className="todoapp">
					{connectDragSource(<div className="todohandle"/>)}
					<TodoHeader changeTitle={changeTitle}
						addItem={addItem} moveItem={moveItem}
						title={title} listIndex={listIndex}
						removeList={removeList}
					/>
					<TodoList {...rest} todos={todos} moveItem={moveItem} listIndex={listIndex}/>
					{totalItems > 0 && <TodoTools changeFilter={changeFilter}
						filter={filter}
						nbActiveItems={activeItems}
						nbCompletedItems={totalItems - activeItems}
						clearCompleted={clearCompleted}
						listIndex={listIndex}
						moveItem={moveItem}
					/>}
				</section>
			</div>
		));
	}
	
	componentDidMount() {
		// scroll to <AddApp/> on ADD_LIST
		if (this.props.newlyAdded && this.element.nextSibling) this.element.nextSibling.scrollIntoView({
			behavior: "smooth",
			block: "end"
		});
	}
	
	componentDidUpdate(prevProps) {
		const updatedProps = {};
		for(let prop in prevProps) {
			const prevProp = prevProps[prop];
			const currentProp = this.props[prop];
			if(prevProp !== currentProp) {
				updatedProps[prop] = `${String(prevProp)} -> ${String(currentProp)}`;
			}
		}
		console.log(`App ${this.props.listIndex} ${this.props.title} UPDATED with`, updatedProps);
	}
}

export default compose(
	DropTarget(APP, appTarget, collectTarget),
	DragSource(APP, appSource, collectSource)
)(App);
