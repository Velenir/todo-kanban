import React, {PureComponent} from 'react';
import classnames from 'classnames';
import * as FILTER from '../reducers/filterVars';

import {TODO_ITEM} from '../helpers/itemTypes';
import {DropTarget} from 'react-dnd';

import {sameExceptForListIndex} from '../helpers/propsSameExcept';

const todoToolsTarget = {
	canDrop() {
		return false;
	},
	hover(props, monitor) {
		// console.log("OVER TOOLS");
		const {listIndex: currentListIndex} = props;
		const draggingItem = monitor.getItem();
		const {currentItemPath: lastItemPath} = draggingItem;
		
		// resize current list only when adding items from another list
		if(lastItemPath[0] === currentListIndex) return;
		console.log("ADDING To List", currentListIndex);
		
		props.moveItem(lastItemPath, draggingItem.currentItemPath = [currentListIndex, -0]);
	}
};

function collectTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	};
}
 

class TodoTools extends PureComponent {
	getAttributes(newFilter) {
		const {filter, changeFilter} = this.props;
		return {
			className: classnames({selected : filter === newFilter}),
			onClick: (e) => (e.preventDefault(), changeFilter(this.props.listIndex, newFilter))
		};
	}
	
	render() {
		const {clearCompleted, nbActiveItems = 0, nbCompletedItems = 0, connectDropTarget} = this.props;
		
		return connectDropTarget(
      <footer className="footer">
        <span className="todo-count">
          <strong>{nbActiveItems}</strong>
        </span>
        <ul className="filters">
          <li>
            <a href="#" {...this.getAttributes(FILTER.ALL)}>
              All
            </a>
          </li>
          <li>
            <a href="#" {...this.getAttributes(FILTER.ACTIVE)}>
              Active
            </a>
          </li>
          <li>
            <a href="#" {...this.getAttributes(FILTER.COMPLETED)}>
              Completed
            </a>
          </li>
        </ul>
        {nbCompletedItems > 0 && <button className="clear-completed" onClick={() => clearCompleted(this.props.listIndex)}>
          Clear completed
        </button>}
      </footer>
		);
	}
	
	shouldComponentUpdate(nextProps) {
		return !sameExceptForListIndex(nextProps, this.props);
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
		console.log(`Tools ${this.props.listIndex} UPDATED with`, updatedProps);
	}
}

export default DropTarget(TODO_ITEM, todoToolsTarget, collectTarget)(TodoTools);
