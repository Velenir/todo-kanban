import React, {Component} from 'react';
import AddApp from './AddApp';
import App from '../containers/AppContainer';

class Board extends Component {
	render() {
		const {listsNumber, addList} = this.props, listApps = [];
		for (let i = 0; i < listsNumber; ++i) {
			listApps.push(<App listIndex={i} key={i}/>);
		}
		
		return (
			<div>
				{listApps}
				<AddApp addList={addList}/>
			</div>
		);
	}
	
	componentDidUpdate() {
		console.warn("BOARD UPDATED");
	}
}

export default Board;
