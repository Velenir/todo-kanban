import {connect} from 'react-redux';
import {changeDescription} from '../actions';

import Description from '../components/Description';

const mapStateToProps = ({modal: {id, item}, descriptions}) => ({
	id,
	item,
	description: descriptions.get(id)
});

export default connect(mapStateToProps, {changeDescription})(Description);
