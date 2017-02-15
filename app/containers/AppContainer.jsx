import {connect} from 'react-redux';
import * as actions from '../actions';
import {filterTodos, findItemEntry} from '../helpers/immutableHelpers';

import App from '../components/App';

// const mapStateToProps = ({todos, filter}) => ({
// 	...filterTodos(todos, filter),
// 	findItem: findItemEntry.bind(null, todos)
// });

const mapStateToProps = ({lists}, {listIndex}) => {
	const list = lists.get(listIndex);
	const todos = list.get("todos");
	const filter = list.get("filter");
	const title = list.get("title");
	// console.log(lists.get(listIndex));
	console.log(title);
	console.log(filter);
	console.log(todos.toJS());
	return {
		...filterTodos(todos, filter),
		findItem: findItemEntry.bind(null, todos),
		title
	};
};

// actions get wrapped in dispatch call
export default connect(mapStateToProps, actions)(App);
