import {connect} from 'react-redux';
import {addList} from '../actions';
// import * as actions from '../actions';
// import {filterTodos, findItemEntry} from '../helpers/immutableHelpers';

import Board from '../components/Board';

// const mapStateToProps = ({todos, filter}) => ({
// 	...filterTodos(todos, filter),
// 	findItem: findItemEntry.bind(null, todos)
// });

const mapStateToProps = ({lists}) => ({
	lists
});

// actions get wrapped in dispatch call
export default connect(mapStateToProps, {addList})(Board);
