import React, {PureComponent} from 'react';
 
// const TextInput = () => (
// 	<input className="edit" type="text" autoFocus={true}/>
// );

// export default TextInput;

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
		const {text, itemId, cancelEditing} = this.props;
		
		this.setState({
			value: text
		});
		
		cancelEditing(itemId);
	}
	
	handleKeyDown = (e) => {
		switch(e.key) {
			case "Enter":
				{
					const {value} = this.state;
					// cancel on empty todo
					if(value === "") return this.cancelEditing();
					const {itemId, doneEditing} = this.props;
					return doneEditing(itemId, value);
				}
			case "Escape":
				return this.cancelEditing();
		}
	}
	
	componentDidMount() {
		if(this.props.selectText) {
			console.log("SELECTING");
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
				ref={c => (console.log("REF"), this.itemInput = c)}
				onKeyDown={this.handleKeyDown}
				onBlur={()=>this.cancelEditing()}
			/>
		);
	}
}
