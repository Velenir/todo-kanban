import React, {Component} from 'react';

class TextArea extends Component {
	onChange = () => {
		const textarea = this.textarea;
		const style = textarea.style;
		style.height = "auto";
		style.height = textarea.scrollHeight + this.heightOffset + "px";
		
		this.props.onChange && this.props.onChange(textarea.value);
	}
	
	render() {
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
	}
}

export default TextArea;
