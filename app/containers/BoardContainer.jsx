import {connect} from 'react-redux';
import {addList} from '../actions';

import Board from '../components/Board';

const mapStateToProps = ({lists}) => ({
	lists
});

// actions get wrapped in dispatch call
export default connect(mapStateToProps, {addList})(Board);
