import React, {Component} from 'react';
import Radio from './Checkbox';

import '../styles/header.scss';
import * as LAYOUT from '../reducers/layoutVars';

import LayoutColumnWrap from '../images/layout-flex-column-wrap.svg';
import LayoutColumn from '../images/layout-flex-column.svg';
import LayoutRow from '../images/layout-flex-row.svg';

const ColumnWrap = <LayoutColumnWrap width={undefined} height={undefined}/>;
const Column = <LayoutColumn width={undefined} height={undefined}/>;
const Row = <LayoutRow width={undefined} height={undefined}/>;

const layoutRadios = [
	{
		icon: Column,
		title: "column",
		layoutVal: LAYOUT.COLUMN
	},
	{
		icon: ColumnWrap,
		title: "column wrap",
		layoutVal: LAYOUT.COLUMN_WRAP
	},
	{
		icon: Row,
		title: "row",
		layoutVal: LAYOUT.ROW
	}
];

class Header extends Component {
	onChange = ({target: {value}}) => {
		this.props.changeLayout(layoutRadios[value].layoutVal);
	}
	
	getRadios() {
		return layoutRadios.map(({icon, title, layoutVal}, i) => (
			<Radio checked={this.props.layout === layoutVal} type="radio" name="layout"
				whenChecked={icon} whenUnchecked={icon} value={i}
				className="layout-radio" title={title} key={i}
			/>
		));
	}
	
	render() {
		return (
			<header className="main-header" onChange={this.onChange}>
				{this.getRadios()}
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
