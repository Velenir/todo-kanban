import React, {Component} from 'react';
import AddApp from './AddApp';
import App from '../containers/AppContainer';

import {DragDropContext, DropTarget} from 'react-dnd';
import {APP} from '../helpers/itemTypes';
import HTML5Backend from 'react-dnd-html5-backend';
import {compose} from 'redux';

import Modal from '../containers/ModalContainer';
import Description from '../containers/DescriptionContainer';

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
	
	render() {
		const {addList, connectDropTarget} = this.props;
		
		return connectDropTarget(
			<div className="board">
				{this.getApps()}
				<AddApp addList={addList}/>
				<Modal>
					<Description/>
				</Modal>
			</div>
		);
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
		console.log(`Board UPDATED with`, updatedProps);
	}
}

export {Board as UndecoratedBoard};
export const DropTargetWrapper = DropTarget(APP, boardTarget, collectTarget);

export default compose(
	DragDropContext(HTML5Backend),
	DropTargetWrapper
)(Board);
