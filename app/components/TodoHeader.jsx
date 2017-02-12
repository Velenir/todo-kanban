import React, {PureComponent} from 'react';

class TodoHeader extends PureComponent {
	handleKeyPress = (e) => {
		if(e.key === "Enter" && e.target.value !== "") {
			const text = e.target.value;
			e.target.value = "";
			
			return this.props.addItem(text);
		}
	}
	
	render() {
		return (
			<header className="header">
				<h1>todos</h1>
				<input className="new-todo"
					autoFocus
					autoComplete="off"
					placeholder="What needs to be done?"
					onKeyPress={this.handleKeyPress}
				/>
			</header>
		);
	}
}

export default TodoHeader;
