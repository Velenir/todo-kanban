import React, {Component} from 'react';

class TextArea extends Component {
	resize() {
		const textarea = this.textarea;
		const style = textarea.style;
		style.height = "auto";
		style.height = textarea.scrollHeight + this.heightOffset + "px";
	}
	onChange = (e) => {
		this.resize();
		
		this.props.onChange && this.props.onChange(e);
	}
	
	get value() {
		return this.textarea.value;
	}
	
	set value(val) {
		this.textarea.value = val;
	}
	
	render() {
		console.log("TextArea rendering with", this.props.value);
		return (
			<textarea {...this.props} onChange={this.onChange} ref={c => this.textarea = c}/>
		);
	}
	
	componentDidMount() {
		console.log("TextArea MOUNTED");
		const {paddingBottom, paddingTop, boxSizing, borderTopWidth, borderBottomWidth} = window.getComputedStyle(this.textarea);
		
		let heightOffset;
		if(boxSizing === "border-box") heightOffset = parseFloat(borderTopWidth) + parseFloat(borderBottomWidth);
		else {
			heightOffset = parseFloat(paddingTop) + parseFloat(paddingBottom);
			if(boxSizing === "content-box") heightOffset *= -1;
		}
		
		// TODO: consider making heaightOffset static
		this.heightOffset = heightOffset;
		this.resize();
	}
}

export default TextArea;
