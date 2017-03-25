import {connect} from 'react-redux';
import {closeModal} from '../actions';

import Modal from '../components/Modal';

const mapStateToProps = ({modal: {open}}) => ({
	open
});

export default connect(mapStateToProps, {closeModal})(Modal);
