import React, {Component} from 'react';
import Radio from './Checkbox';

import '../styles/header.scss';

class Header extends Component {
	state = {checked: -1}
	
	onChange = ({target: {value}}) => {
		console.log(value);
		this.setState({
			checked: +value
		});
	}
	
	render() {
		return (
			<header className="main-header" onChange={this.onChange}>
				<Radio checked={this.state.checked === 0} type="radio" name="layout" whenChecked="⦿" whenUnchecked="⦾" value={0} className="layout-radio"/>
				<Radio checked={this.state.checked === 1} type="radio" name="layout" whenChecked="⦿" whenUnchecked="⦾" value={1} className="layout-radio"/>
				<Radio checked={this.state.checked === 2} type="radio" name="layout" whenChecked="⦿" whenUnchecked="⦾" value={2} className="layout-radio"/>
				<Radio checked={this.state.checked === 3} type="radio" name="layout" whenChecked="⦿" whenUnchecked="⦾" value={3} className="layout-radio"/>
			</header>
		);
	}
	
	componentDidUpdate(prevProps) {
		const updatedProps = {};
		for(let prop in prevProps) {
			const prevProp = prevProps[prop];
			const currentProp = this.props[prop];
			if(prevProp !== currentProp) {
				updatedProps[prop] = `${String(prevProp)} -> ${String(currentProp)}`;
			}
		}
		console.log(`Header UPDATED with`, updatedProps);
	}
}

export default Header;
