import React, {PureComponent} from 'react';

class CheckBox extends PureComponent {
	state = {
		checked: this.props.checked || this.props.defaultChecked || false
	}
	
	onChange = (e) => {
		const {onChange, checked} = this.props;
		
		// if CheckBox isn't controlled
		if(checked === undefined) {
			this.setState({
				checked: e.target.checked
			});
		}
		
		onChange && onChange(e);
	}
	
	render() {
		const {
			className,
			whenChecked = <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="-10 -10 120 120" style={{verticalAlign: "top"}}><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" strokeWidth="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>,
			whenUnchecked = <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="-10 -10 120 120" style={{verticalAlign: "top"}}><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" strokeWidth="3"/></svg>,
			checked = this.state.checked,
			style,
			checkedClass = "checked",
			...checkboxProps
		} = this.props;
				
		return (
			<label className={checked ? className ? `${className} ${checkedClass}` : checkedClass : className} style={style}>
				<input type="checkbox" checked={checked} {...checkboxProps} onChange={this.onChange} style={{display: "none"}}/>
				{checked ? whenChecked : whenUnchecked}
			</label>
		);
	}
	
	componentWillReceiveProps(nextProps) {
		if(this.props.checked !== nextProps.checked) this.setState({checked: nextProps.checked});
	}
}

export default CheckBox;
