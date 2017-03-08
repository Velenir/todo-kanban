import React, {PureComponent} from 'react';


export default class TextInput extends PureComponent {
	state = {
		value: this.props.text
	};
	
	handleOnChange = (e) => {
		this.setState({
			value: e.target.value
		});
	}
	
	cancelEditing = () => {
		const {text, itemId, listIndex, cancelEditing} = this.props;
		
		this.setState({
			value: text
		});
		
		cancelEditing(listIndex, itemId);
	}
	
	handleKeyDown = (e) => {
		switch(e.key) {
			case "Enter":
				{
					const value = this.state.value.trim();
					// cancel on empty todo
					if(value === "") return this.cancelEditing();
					const {itemId, listIndex, doneEditing} = this.props;
					return doneEditing(listIndex, itemId, value);
				}
			case "Escape":
				return this.cancelEditing();
		}
	}
	
	componentDidMount() {
		if(this.props.selectText) {
			this.itemInput.select();
		}
	}
	
	render() {
		return (
			<input className="edit"
				autoFocus
				value={this.state.value}
				onChange={this.handleOnChange}
				type="text"
				ref={c => this.itemInput = c}
				onKeyDown={this.handleKeyDown}
				onBlur={this.cancelEditing}
			/>
		);
	}
}
