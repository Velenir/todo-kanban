import {connect} from 'react-redux';
import * as actions from '../actions';
import {filterTodos, findItemEntry} from '../helpers/immutableHelpers';

import App from '../components/App';

// const mapStateToProps = ({todos, filter}) => ({
// 	...filterTodos(todos, filter),
// 	findItem: findItemEntry.bind(null, todos)
// });

const boundFindItem = new WeakMap();
function bindNewFindItem(todos) {
	const inCache = boundFindItem.get(todos);
	if(inCache) {
		console.log("findItems from cache");
		return inCache;
	}
	
	const bound = findItemEntry.bind(null, todos);
	boundFindItem.set(todos, bound);
	return bound;
}

const mapStateToProps = ({lists}, {listIndex}) => {
	const {todos, filter, title, newlyAdded} = lists[listIndex];
	
	return {
		...filterTodos(todos, filter),
		// findItem: findItemEntry.bind(null, todos),
		findItem: bindNewFindItem(todos),
		title,
		newlyAdded
	};
};

const appActionKeys = Object.keys(actions).filter(a => a !== "addList");

const mapDispatchToProps = (dispatch, {listIndex}) => {
	const boundActions = {};
	console.log("BINDING Actions to list", listIndex);
	for (let key of appActionKeys) {
		const action = actions[key];	// eslint-disable-line import/namespace
		// pass actions bound to specific listIndex, corresponding to each <App/> element
		boundActions[key] = (...args) => dispatch(action.call(null, listIndex, ...args));
	}
	
	return boundActions;
};

const options = {
	pure: true,
	areStatePropsEqual(props, nextProps) {
		for (let prop in props) {
			if(prop !== "findItem" && props[prop] !== nextProps[prop]) {
				console.log("not eq", prop);
				return false;
			}
		}

		return true;
	}
};

// actions get wrapped in dispatch call
export default connect(mapStateToProps, mapDispatchToProps, null, options)(App);
