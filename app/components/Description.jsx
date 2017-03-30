import React, {Component} from 'react';
import TextArea from './TextArea';

import sameExceptFor from '../helpers/propsSameExcept';
const sameExceptForPreview = sameExceptFor("Preview");
const sameProps = sameExceptFor();

class Description extends Component {
	static Preview = null
	
	constructor(props) {
		super(props);
		
		const {description} = props;
		this.state = {
			text: description,
			showPreview: !!description,
			Preview: Description.Preview
		};
	}
	
	componentWillMount() {
		if(!Description.Preview) {
			import("./Preview")
				.then(module => module.default)
				.then(Preview => this.setState({Preview: Description.Preview = Preview}));
		}
	}
	
	onDescriptionChange = ({target}) => {
		this.setState({text: target.value});
	}
	
	saveInput = () => {
		const newText = this.state.text.trim();
		
		this.setState({
			showPreview: !!newText
		});
		
		if(newText === this.props.description) return;
		
		const {id, changeDescription} = this.props;
		changeDescription(id, newText);
	}
	
	cancelInput = () => {
		const {description} = this.props;
		
		this.setState({
			text: description,
			showPreview: !!description
		});
	}
	
	onEditorBlur = (e) => {
		const {relatedTarget} = e;
		if(relatedTarget === this.saveButton || relatedTarget === this.cancelButton || relatedTarget === this.textarea.textarea) return;
		
		this.setState({
			showPreview: !!this.props.description
		});
	}
	
	onPreviewClick = (e) => {
		// don't hide Preview on link click
		if(e.target.tagName === "A") return;
		
		this.setState({
			showPreview: false
		});
	}
	
	onDescriptionKeyDown = (e) => {
		if(e.key === "Escape") {
			e.preventDefault();
			this.setState({
				showPreview: !!this.props.description
			});
		}
	}
	
	render() {
		const {item, description} = this.props;
		const {text, showPreview, Preview} = this.state;
		
		return (
			<div className="description">
				<h3 className="description__title">{item}</h3>
				{showPreview && Preview && <Preview text={description} onClick={this.onPreviewClick} className="description__preview"/>}
				{!showPreview &&
					<div className="description__display description__display--editor">
						<TextArea rows="5" autoFocus className="description__editor"
							placeholder="Add a description. &#10;Supports markdown."
							onChange={this.onDescriptionChange}
							onBlur={this.onEditorBlur}
							ref={c => this.textarea = c}
							onKeyDown={this.onDescriptionKeyDown}
							value={text}
						/>
						<button
							type="button"
							className="description__controls description__controls--save"
							onClick={this.saveInput}
							ref={c => this.saveButton = c}
							disabled={!text && !description}
							onBlur={this.onEditorBlur}>
							Save
						</button>
						<button
							type="button"
							className="description__controls description__controls--cancel"
							onClick={this.cancelInput}
							ref={c => this.cancelButton = c}
							disabled={!text && !description}
							onBlur={this.onEditorBlur}>
							Cancel
						</button>
					</div>
				}
			</div>
		);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		if(!sameProps(nextProps, this.props)) return true;

		// wrapped by react-redux connect Description is already pure props-wise
		// only change when state.Preview is updated and must be shown immediately
		if(sameExceptForPreview(nextState, this.state)) {
			// i.e. if showPreview is false, don't update
			return nextState.Preview !== this.state.Preview && nextState.showPreview;
		}
		
		return true;
	}
}

export default Description;
