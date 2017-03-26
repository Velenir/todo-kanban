import {connect} from 'react-redux';
import {changeDescription} from '../actions';

import Description from '../components/Description';

const mapStateToProps = ({modal: {id}, descriptions}) => ({
	id,
	description: descriptions.get(id)
});

export default connect(mapStateToProps, {changeDescription})(Description);
