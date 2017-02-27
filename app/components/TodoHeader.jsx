import React, {PureComponent} from 'react';

class TodoHeader extends PureComponent {
	handleKeyPress = (e) => {
		if(e.key === "Enter" && e.target.value !== "") {
			const text = e.target.value;
			e.target.value = "";
			
			return this.props.addItem(text);
		}
	}
	
	handleTitleChange = (e) => {
		if(e.key === "Enter") {
			e.preventDefault();
			
			console.log("TITLE#ENTER");
			// save empty title when explicitly press Enter
			if(e.target.textContent === "") this.props.changeTitle("");
			e.target.blur();
		} else if(e.key === "Escape") {
			e.preventDefault();
			// return display to previous title
			e.target.textContent = this.props.title;
			e.target.blur();
		}
	}
	
	handleTitleBlur = (e) => {
		const text = e.target.textContent,
			{title: oldTitle} = this.props;
		console.log("TITLE#BLUR");
		// do nothing if ultimately nothing changed
		if(text === oldTitle) return;
		// don't save empty title on blur
		if(text !== "") {
			this.props.changeTitle(text);
		} else {
			// return display to previous title
			e.target.textContent = oldTitle;
		}
	}
	
	render() {
		const {title, listIndex} = this.props;
		return (
			<header className="header">
				<h3 contentEditable suppressContentEditableWarning
					onKeyDown={this.handleTitleChange}
					onBlur={this.handleTitleBlur}>
					{title}
				</h3>
				<input className="new-todo"
					autoFocus={listIndex === 0}
					autoComplete="off"
					placeholder="What needs to be done?"
					onKeyPress={this.handleKeyPress}
				/>
			</header>
		);
	}
}

export default TodoHeader;
