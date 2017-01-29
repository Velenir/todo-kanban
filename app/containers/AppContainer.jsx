import {connect} from 'react-redux';
import * as actions from '../actions';
import {filterTodos} from '../helpers/immutableHelpers';

import App from '../components/App';

const mapStateToProps = ({todos, filter}) => filterTodos(todos, filter);

// actions get wrapped in dispatch call
export default connect(mapStateToProps, actions)(App);
