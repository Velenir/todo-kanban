import React, {Component} from 'react';
import AddApp from './AddApp';
import App from '../containers/AppContainer';

import {DragDropContext, DropTarget} from 'react-dnd';
import {APP} from '../helpers/itemTypes';
import HTML5Backend from 'react-dnd-html5-backend';
import {compose} from 'redux';


const boardTarget = {
	drop() {
		console.log("DROPPED ON BOARD");
	}
};

function collectTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	};
}

class Board extends Component {
	render() {
		const {lists, addList, connectDropTarget} = this.props;
		// for (let i = 0; i < listsNumber; ++i) {
		// 	listApps.push(<App listIndex={i} key={i}/>);
		// }
		
		return connectDropTarget(
			<div>
				{lists.map((list, i) => <App listIndex={i} key={list.id} id={list.id}/>)}
				<AddApp addList={addList}/>
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

// export default DragDropContext(HTML5Backend)(Board);

export default compose(
	DragDropContext(HTML5Backend),
	DropTarget(APP, boardTarget, collectTarget)
)(Board);
