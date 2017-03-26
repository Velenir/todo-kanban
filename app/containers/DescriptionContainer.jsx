import {connect} from 'react-redux';
import {changeDescription} from '../actions';

import Description from '../components/Description';

const mapStateToProps = ({modal: {id}}) => ({
	id
});

export default connect(mapStateToProps, {changeDescription})(Description);
