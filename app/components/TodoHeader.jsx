import React, {PureComponent} from 'react';

import {TODO_ITEM} from '../helpers/itemTypes';
import {DropTarget} from 'react-dnd';

import {sameExceptForListIndex} from '../helpers/propsSameExcept';

const todoHeaderTarget = {
	canDrop() {
		return false;
	},
	hover(props, monitor) {
		// console.log("OVER HEADER");
		const {listIndex: currentListIndex} = props;
		const draggingItem = monitor.getItem();
		const {currentItemPath: lastItemPath} = draggingItem;
		
		// resize current list only when adding items from another list
		if(lastItemPath[0] === currentListIndex) return;
		console.log("ADDING To List", currentListIndex);
		
		props.moveItem(lastItemPath, draggingItem.currentItemPath = [currentListIndex, 0]);
	}
};

function collectTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	};
}


class TodoHeader extends PureComponent {
	handleKeyPress = (e) => {
		if(e.key === "Enter" && e.target.value !== "") {
			const text = e.target.value;
			e.target.value = "";
			
			const {listIndex, addItem} = this.props;
			
			return addItem(listIndex, text);
		}
	}
	
	handleTitleChange = (e) => {
		if(e.key === "Enter") {
			e.preventDefault();
			
			console.log("TITLE#ENTER");
			// save empty title when explicitly press Enter
			if(e.target.textContent === "") {
				const {listIndex, changeTitle} = this.props;
				changeTitle(listIndex, "");
			}
			e.target.blur();
		} else if(e.key === "Escape") {
			e.preventDefault();
			// return display to previous title
			e.target.textContent = this.props.title;
			e.target.blur();
		}
	}
	
	handleTitleBlur = (e) => {
		const text = e.target.textContent,
			{title: oldTitle} = this.props;
		console.log("TITLE#BLUR");
		// do nothing if ultimately nothing changed
		if(text === oldTitle) return;
		// don't save empty title on blur
		if(text !== "") {
			const {listIndex, changeTitle} = this.props;
			changeTitle(listIndex, text);
		} else {
			// return display to previous title
			e.target.textContent = oldTitle;
		}
	}
	
	render() {
		const {title, listIndex, removeList, connectDropTarget} = this.props;
		return (
			<header className="header">
				<div className="titlespace">
					<h3 contentEditable suppressContentEditableWarning
						onKeyDown={this.handleTitleChange}
						onBlur={this.handleTitleBlur}
						spellCheck="false"
						data-placeholder="name this list" tabIndex="0">
						{title}
					</h3>
					<button type="button" onClick={() => removeList(this.props.listIndex)}>x</button>
				</div>
				{connectDropTarget(
					<input className="new-todo"
						autoFocus={listIndex === 0}
						autoComplete="off"
						placeholder="What needs to be done?"
						onKeyPress={this.handleKeyPress}
					/>
				)}
			</header>
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
				updatedProps[prop] = `${prevProp} -> ${currentProp}`;
			}
		}
		console.log(`Header ${this.props.title} UPDATED with`, updatedProps);
	}
}

export default DropTarget(TODO_ITEM, todoHeaderTarget, collectTarget)(TodoHeader);
