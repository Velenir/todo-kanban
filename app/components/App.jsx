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
			listIndex
		};
	},
	endDrag(props, monitor) {
		
	}
};

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	};
}

const appTarget = {
	canDrop() {
		return false;
	},
	hover(props, monitor) {
		
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
		const {removeList, changeFilter, changeTitle, clearCompleted, addItem, moveItem, activeItems, filter, listIndex, title, newlyAdded, connectDropTarget, connectDragSource, connectDragPreview, isDragging, ...rest} = this.props;
		
		return connectDropTarget(connectDragPreview(
			<div ref={c => this.element = c} style={{opacity: isDragging ? 0.3 : 1}}>
				<section className="todoapp">
					<TodoHeader changeTitle={changeTitle}
						addItem={addItem} moveItem={moveItem}
						title={title} listIndex={listIndex}
						removeList={removeList}
					/>
					<TodoList {...rest} moveItem={moveItem} listIndex={listIndex}/>
					<TodoTools  changeFilter={changeFilter}
						filter={filter}
						nbActiveItems={activeItems}
						clearCompleted={clearCompleted}
						listIndex={listIndex}
						moveItem={moveItem}
					/>
					<div className="appcover"/>
					{connectDragSource(<div className="todohandle"/>)}
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
				updatedProps[prop] = `${prevProp} -> ${currentProp}`;
			}
		}
		console.log(`App ${this.props.listIndex} ${this.props.title} UPDATED with`, updatedProps);
	}
}

export default compose(
	DropTarget(APP, appTarget, collectTarget),
	DragSource(APP, appSource, collectSource)
)(App);
