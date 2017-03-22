import React, {Component} from 'react';
import TextArea from './TextArea';
import Preview from './Preview';

class Description extends Component {
	constructor(props) {
		super(props);
		
		const {description} = props;
		this.state = {
			text: description,
			previewText: description,
			showPreview: !!description
		};
	}
	
	onDescriptionChange = ({target: {value: text}}) => {
		console.log(text);
		this.setState({text});
	}
	
	saveInput = () => {
		const newText = this.state.text.trim();
		console.log("SAVING", newText);
		// TODO: dispatch action updating props.description here
		// update state in componentWillReceiveProps
		this.setState({
			// text: newText,
			previewText: newText,
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
	
	onDescriptionBlur = (e) => {
		console.log(e.relatedTarget);
		const {relatedTarget} = e;
		if(relatedTarget === this.saveButton) {
			this.saveInput();
			return;
		} else if(relatedTarget === this.cancelButton) {
			this.cancelInput();
			return;
		}
		
		const {description} = this.props;
		
		this.setState({
			showPreview: !!description,
			previewText: description
		});
	}
	
	onPreviewClick = () => {
		this.setState({
			showPreview: false
		});
	}
	
	render() {
		const {item} = this.props;
		const {text, previewText, showPreview} = this.state;
		
		return (
			<div className="description">
				<h3 className="description__title">Description for {item}</h3>
				<div>
					{showPreview && <Preview text={previewText} onClick={this.onPreviewClick}/>}
					{!showPreview && [
						<TextArea rows="5" cols="50" autoFocus className="description__editor"
							placeholder="Add a description. &#10;Supports markdown."
							onChange={this.onDescriptionChange}
							onBlur={this.onDescriptionBlur}
							ref={c => this.textarea = c}
							value={text}
						/>,
						<button
							type="button"
							className="description__controls description__controls--save"
							onClick={this.saveInput}
							ref={c => this.saveButton = c}>
							Save
						</button>,
						<button
							type="button"
							className="description__controls description__controls--cancel"
							onClick={this.cancelInput}
							ref={c => this.cancelButton = c}>
							Cancel
						</button>
					]}
				</div>
			</div>
		);
	}
}

export default Description;
