import React, {PureComponent} from 'react';
import TodoList from '../components/TodoList';
import TodoTools from '../components/TodoTools';
import TodoHeader from '../components/TodoHeader';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

 
class App extends PureComponent {
	render() {
		// eslint-disable-next-line no-unused-vars
		const {removeList, changeFilter, changeTitle, clearCompleted, addItem, activeItems, filter, listIndex, title, newlyAdded, ...rest} = this.props;
		
		return (
			<div ref={c => this.element = c}>
				<section className="todoapp">
					<TodoHeader changeTitle={changeTitle} addItem={addItem}
						title={title} listIndex={listIndex}
						removeList={removeList}
					/>
					<TodoList {...rest}/>
					<TodoTools  changeFilter={changeFilter}
						filter={filter}
						nbActiveItems={activeItems}
						clearCompleted={clearCompleted}
					/>
				</section>
			</div>
		);
	}
	
	componentDidMount() {
		// scroll to <AddApp/> on ADD_LIST
		if (this.props.newlyAdded && this.element.nextSibling) this.element.nextSibling.scrollIntoView({
			behavior: "smooth",
			block: "end"
		});
	}
	
	componentDidUpdate() {
		console.log("APP", this.props.listIndex, this.props.title, "UPDATED");
	}
}

export default DragDropContext(HTML5Backend)(App);
