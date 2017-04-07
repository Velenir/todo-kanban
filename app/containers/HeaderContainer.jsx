import {connect} from 'react-redux';
import {changeLayout} from '../actions';

import Header from '../components/Header';

const mapStateToProps = () => ({
	
});

export default connect(mapStateToProps, {changeLayout})(Header);
