import React, {PureComponent} from 'react';
import classnames from 'classnames';

import TextInput from './TextInput';


export default class TodoItem extends PureComponent {

	render() {
		const {id, text, isCompleted: completed, isEditing: editing, selectText, deleteItem, editItem, selectEditItem, toggleComplete, cancelEditing, doneEditing} = this.props;
		
		const itemClass = classnames("todo", {completed, editing});
		
		return (
			<li className={itemClass}>
				<div className="view">
					<input type="checkbox" className="toggle"
						checked={completed}
						onChange={() => toggleComplete(id)}
					/>
					<label htmlFor="todo" ref={c => this.text = c} onDoubleClick={() => editItem(id)}>
						<span onDoubleClick={(e) => (e.stopPropagation(), selectEditItem(id))}>{text}</span>
					</label>
					<button className="destroy" onClick={() => deleteItem(id)}></button>
				</div>
				{editing && <TextInput
					text={text} itemId={id}
					cancelEditing={cancelEditing} doneEditing={doneEditing}
					selectText={selectText}
				/>}
			</li>
		);
	}
}
