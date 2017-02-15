import React, {Component} from 'react';
import App from '../containers/AppContainer';

class Board extends Component {
	render() {
		const {lists} = this.props;
		
		return (
			<div>
				{lists.map((list, i) => <App listIndex={i} key={i}/>)}
			</div>
		);
	}
}

export default Board;
