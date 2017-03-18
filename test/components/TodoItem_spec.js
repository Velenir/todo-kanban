import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithTag, findRenderedComponentWithType, Simulate} from 'react-addons-test-utils';
import DragTodoItem from '../../app/components/TodoItem';
import {expect} from 'chai';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';

describe('TodoItem', () => {
	// Wrap DnD component in context with test backend
	const TodoItem = DragDropContext(TestBackend)(DragTodoItem);
	
	it('should render an item', () => {
		const text = "React";
		const component = renderIntoDocument(
			<TodoItem text={text} />
		);
		const todo = scryRenderedDOMComponentsWithTag(component, 'li');
		
		expect(todo).to.have.length.of(1);
		expect(todo[0].textContent).to.contain("React");
	});
	
	it('should strike through the item if it is completed', () => {
		const text = 'React';
		const component = renderIntoDocument(
			<TodoItem text={text} isCompleted={true}/>
		);
		const todo = scryRenderedDOMComponentsWithTag(component, 'li');
		
		expect(todo[0].classList.contains('completed')).to.be.true;
	});
	
	it('should look different when editing', () => {
		const text = 'React';
		const component = renderIntoDocument(
			<TodoItem text={text} isEditing={true}/>
		);
		const todo = scryRenderedDOMComponentsWithTag(component, 'li');
		
		expect(todo[0].classList.contains('editing')).to.be.true;
	});
	
	it('should be checked if the item is completed', () => {
		const text = 'React';
		const text2 = 'Redux';

		const component1 = renderIntoDocument(
			<TodoItem text={text} isCompleted={true}/>
		);
		const component2 = renderIntoDocument(
			<TodoItem text={text2} isCompleted={false}/>
		);
		
		const input1 = scryRenderedDOMComponentsWithTag(component1, 'input');
		const input2 = scryRenderedDOMComponentsWithTag(component2, 'input');
		
		expect(input1[0].checked).to.be.true;
		expect(input2[0].checked).to.be.false;
	});
	
	it('should invoke callback when the delete button is clicked', () => {
		const text = 'React';
		let deleted = false;
		
		// mock deleteItem function
		const deleteItem = () => deleted = true;
		const component = renderIntoDocument(
			<TodoItem text={text} deleteItem={deleteItem} itemPath={[0, 0]}/>
		);
		
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);
		
		expect(deleted).to.be.true;
	});
	
	it('should invoke callback when checkbox is clicked', () => {
		const text = 'React';
		let isChecked = false;
		
		// mock toggleComplete function
		const toggleComplete = () => isChecked = true;
		const component = renderIntoDocument(
			<TodoItem text={text} toggleComplete={toggleComplete} itemPath={[0, 0]}/>
		);
		
		const checkboxes = scryRenderedDOMComponentsWithTag(component, 'input');
		Simulate.change(checkboxes[0]);
		
		expect(isChecked).to.be.true;
	});
	
	it('should invoke callback when label is double clicked', () => {
		let text = 'React';
		
		// mock editItem function
		const editItem = () => text = 'Redux';
		const component = renderIntoDocument(
			<TodoItem text={text} editItem={editItem} itemPath={[0, 0]}/>
		);
		
		const label = scryRenderedDOMComponentsWithTag(component, 'label');
		Simulate.doubleClick(label[1]);
		
		expect(text).to.equal('Redux');
	});
	
	it('should invoke callback when text is double clicked', () => {
		let text = 'React';
		
		// mock editItem function
		const editItem = () => text = 'Redux';
		
		let selected = false;
		// mock selectEditItem function
		const selectEditItem = () => selected = true;
		const component = renderIntoDocument(
			<TodoItem text={text} editItem={editItem} selectEditItem={selectEditItem} itemPath={[0, 0]}/>
		);
		
		const span = scryRenderedDOMComponentsWithTag(component, 'span');
		Simulate.doubleClick(span[0]);
		
		expect(selected).to.be.true;
		expect(text).to.equal('React');
	});
	
	it('should autofocus one of TextInputs when updated with props.isEditing = true', (done) => {
		const text = 'React';
		
		class Com extends React.Component {
			state = {}
			
			render() {
				return (
          <div>
            <TodoItem text={text} isEditing={this.state.isEditing}/>
            <TodoItem text={text} isEditing={false}/>
          </div>
				);
			}
		}
		
		const component = renderIntoDocument(<Com/>);
		
		component.setState({isEditing: true}, () => {
			const input = scryRenderedDOMComponentsWithTag(component, 'input');
			
			// expect().to.equal() hangs when computing diff report
			expect(document.activeElement === input[1]).to.be.true;
			done();
		});
	});
	
	it('should lower opacity when dragged', () => {
		const text = 'React';
		const component = renderIntoDocument(
			<TodoItem text={text} itemPath={[0, 0]}/>
		);
		
		const backend = component.getManager().getBackend();

		// Test that opacity is 1
		const li = findRenderedDOMComponentWithTag(component, 'li');
		expect(li.style.opacity).to.equal("1");
		
		// Find the drag source ID and use it to simulate the dragging operation
		const item = findRenderedComponentWithType(component, DragTodoItem);
		backend.simulateBeginDrag([item.getHandlerId()]);
		
		// Verify that the li changed its opacity
		expect(li.style.opacity).to.be.below(1);
		
		backend.simulateEndDrag();
	});
	
	it('should not allow dragging while editing', () => {
		const text = 'React';
		const component = renderIntoDocument(
			<TodoItem text={text} isEditing/>
		);
		
		const backend = component.getManager().getBackend();

		// Test that opacity is 1
		let li = findRenderedDOMComponentWithTag(component, 'li');
		expect(li.style.opacity).to.equal("1");
		
		// Find the drag source ID and use it to simulate the dragging operation
		const item = findRenderedComponentWithType(component, DragTodoItem);
		backend.simulateBeginDrag([item.getHandlerId()]);
		
		// throws if nothing is being dragged
		expect(() => backend.simulateEndDrag()).to.throw();
		
		// Verify that the li didn't change its opacity
		expect(li.style.opacity).to.equal("1");
	});
});
