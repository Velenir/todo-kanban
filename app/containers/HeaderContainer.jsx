import {connect} from 'react-redux';
import {changeLayout} from '../actions';

import Header from '../components/Header';

const mapStateToProps = ({layout}) => ({
	layout
});

export default connect(mapStateToProps, {changeLayout})(Header);
