import React, {Component} from 'react';
import Radio from './Checkbox';

import '../styles/header.scss';

import LayoutColumnWrap from '../images/layout-flex-column-wrap.svg';
import LayoutColumn from '../images/layout-flex-column.svg';
import LayoutRow from '../images/layout-flex-row.svg';

const ColumnWrap = <LayoutColumnWrap width={undefined} height={undefined}/>;
const Column = <LayoutColumn width={undefined} height={undefined}/>;
const Row = <LayoutRow width={undefined} height={undefined}/>;

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
				<Radio checked={this.state.checked === 0} type="radio" name="layout" whenChecked={Column} whenUnchecked={Column} value={0} className="layout-radio" title="column"/>
				<Radio checked={this.state.checked === 1} type="radio" name="layout" whenChecked={ColumnWrap} whenUnchecked={ColumnWrap} value={1} className="layout-radio" title="column wrap"/>
				<Radio checked={this.state.checked === 2} type="radio" name="layout" whenChecked={Row} whenUnchecked={Row} value={2} className="layout-radio" title="row"/>
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
