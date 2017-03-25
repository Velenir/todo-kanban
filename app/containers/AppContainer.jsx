import {connect} from 'react-redux';
import * as actions from '../actions';
import {filterTodos} from '../helpers/immutableHelpers';

import App from '../components/App';


const mapStateToProps = ({lists}, {listIndex}) => {
	const {todos, filter, title, newlyAdded} = lists[listIndex];
	
	return {
		...filterTodos(todos, filter),
		title,
		newlyAdded
	};
};


const appActionKeys = Object.assign({}, actions, {addList: undefined, closeModal: undefined});

// actions get wrapped in dispatch call
export default connect(mapStateToProps, appActionKeys)(App);
