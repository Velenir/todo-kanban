import React, {Component} from 'react';
import TextArea from './TextArea';

import sameExceptFor from '../helpers/propsSameExcept';
const sameExceptForPreview = sameExceptFor("Preview");

class Description extends Component {
	static Preview = null
	
	constructor(props) {
		super(props);
		
		const {description} = props;
		this.state = {
			text: description,
			previewText: description,
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
	
	onDescriptionChange = ({target: {value: text}}) => {
		// console.log(text);
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
			previewText: description,
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
	
	onPreviewClick = () => {
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
		const {text, previewText, showPreview, Preview} = this.state;
		
		return (
			<div className="description">
				<h3 className="description__title">{item}</h3>
				{showPreview && Preview && <Preview text={previewText} onClick={this.onPreviewClick} className="description__preview"/>}
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
	
	componentDidUpdate(prevProps, prevState) {
		const updatedProps = {};
		for(let prop in prevProps) {
			const prevProp = prevProps[prop];
			const currentProp = this.props[prop];
			if(prevProp !== currentProp) {
				updatedProps[prop] = `${String(prevProp)} -> ${String(currentProp)}`;
			}
		}
		console.log(`Description props UPDATED with`, updatedProps);
		
		const updatedState = {};
		for(let prop in prevState) {
			const prevProp = prevState[prop];
			const currentProp = this.state[prop];
			if(prevProp !== currentProp) {
				updatedState[prop] = `${String(prevProp)} -> ${String(currentProp)}`;
			}
		}
		console.log(`Description State UPDATED with`, updatedState);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		// FIX: expect not to update on props change
		
		console.log("props same", nextProps === this.state.props);
		console.log("states same", nextState === this.state.state);
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