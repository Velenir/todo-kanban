import React, {Component} from 'react';
import TextArea from './TextArea';
import Preview from './Preview';

class Description extends Component {
	state = {text: this.props.description, showPreview: !!this.props.description}
	
	onDescriptionChange = ({target: {value: text}}) => {
		console.log(text);
		this.setState({text});
	}
	
	saveInput = () => {
		const newText = this.textarea.value.trim();
		// TODO: dispatch action updating props.description here
		// update state in componentWillReceiveProps
		this.setState({
			text: newText,
			showPreview: !!newText
		});
	}
	
	cancelInput = () => {
		const {description} = this.props;
		
		this.setState({
			text: description,
			showPreview: !!description
		});
	}
	
	render() {
		const {item} = this.props;
		const {text, showPreview} = this.state;
		
		return (
			<div className="description">
				<h3 className="description__title">Description for {item}</h3>
				<div>
					<TextArea rows="5" cols="50" autoFocus className="description__editor"
						placeholder="Add a description. &#10;Supports markdown."
						onChange={this.onDescriptionChange}
						ref={c => this.textarea = c}
						value={text}
					/>
					{showPreview && <Preview text={text}/>}
					<button type="button" className="description__controls description__controls--save" onClick={this.saveInput}>Save</button>
					<button type="button" className="description__controls description__controls--cancel" onClick={this.cancelInput}>Cancel</button>
				</div>
			</div>
		);
	}
}

export default Description;
