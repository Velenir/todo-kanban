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
			previewText: description,
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
		const {item, description} = this.props;
		const {text, previewText, showPreview, Preview} = this.state;
		
		return (
			<div className="description">
				<h3 className="description__title">Description for {item}</h3>
				{showPreview && Preview && <Preview text={previewText} onClick={this.onPreviewClick} className="description__preview"/>}
				{!showPreview &&
					<div className="description__display description__display--editor">
						<TextArea rows="5" autoFocus className="description__editor"
							placeholder="Add a description. &#10;Supports markdown."
							onChange={this.onDescriptionChange}
							onBlur={this.onDescriptionBlur}
							ref={c => this.textarea = c}
							value={text}
						/>
						<button
							type="button"
							className="description__controls description__controls--save"
							onClick={this.saveInput}
							ref={c => this.saveButton = c}
							disabled={!text && !description}>
							Save
						</button>
						<button
							type="button"
							className="description__controls description__controls--cancel"
							onClick={this.cancelInput}
							ref={c => this.cancelButton = c}
							disabled={!text && !description}>
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
		// wrapped by react-redux connect Description is already pure props-wise
		// only change when state.Preview is updated and must be shown immediately
		if(sameExceptForPreview(nextState, this.state)) {
			// if showPreview is false? don't update
			return nextState.showPreview;
		}
		
		return true;
	}
}

export default Description;
