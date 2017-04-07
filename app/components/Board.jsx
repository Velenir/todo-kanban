import React, {Component} from 'react';
import AddApp from './AddApp';
import App from '../containers/AppContainer';

import {DragDropContext, DropTarget} from 'react-dnd';
import {APP} from '../helpers/itemTypes';
import HTML5Backend from 'react-dnd-html5-backend';
import {compose} from 'redux';

import Modal from '../containers/ModalContainer';
import Description from '../containers/DescriptionContainer';

import * as LAYOUT from '../reducers/layoutVars';
const layoutClasses = {
	[LAYOUT.COLUMN]: "board--column",
	[LAYOUT.COLUMN_WRAP]: "board--column-wrap",
	[LAYOUT.ROW]: "board--row"
};

const boardTarget = {
	drop() {},
	hover(props, monitor) {
		// reset wasLastOverId
		if(monitor.isOver({shallow: true})) monitor.getItem().wasLastOverId = null;
	}
};

function collectTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	};
}

class Board extends Component {
	getApps() {
		return this.props.lists.map((list, i) => <App listIndex={i} key={list.id} id={list.id}/>);
	}
	
	getDescription() {
		return <Description/>;
	}
	
	render() {
		const {addList, connectDropTarget, layout} = this.props;
		
		return connectDropTarget(
			<main className={"board " + layoutClasses[layout]}>
				{this.getApps()}
				<AddApp addList={addList}/>
				<Modal>
					{this.getDescription}
				</Modal>
			</main>
		);
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
		console.log(`Board UPDATED with`, updatedProps);
	}
}

export {Board as UndecoratedBoard};
export const DropTargetWrapper = DropTarget(APP, boardTarget, collectTarget);

export default compose(
	DragDropContext(HTML5Backend),
	DropTargetWrapper
)(Board);
