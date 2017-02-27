import React, {Component} from 'react';
import App from '../containers/AppContainer';

class Board extends Component {
	render() {
		const {listsNumber} = this.props, listApps = [];
		for (let i = 0; i < listsNumber; ++i) {
			listApps.push(<App listIndex={i} key={i}/>);
		}
		
		return (
			<div>
				{listApps}
			</div>
		);
	}
}

export default Board;
