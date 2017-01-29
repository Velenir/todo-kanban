import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import TodoItem from '../../app/components/TodoItem';
import {expect} from 'chai';

describe('TodoItem', () => {
	it('should render an item', () => {
		const text = "React";
		const component = renderIntoDocument(
			<TodoItem text={text} />
		);
		const todo = scryRenderedDOMComponentsWithTag(component, "li");
		
		expect(todo.length).to.equal(1);
		expect(todo[0].textContent).to.contain("React");
	});
	
	it('should strike through the item if it is completed', () => {
		const text = 'React';
		const component = renderIntoDocument(
			<TodoItem text={text} isCompleted={true}/>
		);
		const todo = scryRenderedDOMComponentsWithTag(component, 'li');
		
		expect(todo[0].classList.contains('completed')).to.equal(true);
	});
	
	it('should look different when editing', () => {
		const text = 'React';
		const component = renderIntoDocument(
			<TodoItem text={text} isEditing={true}/>
		);
		const todo = scryRenderedDOMComponentsWithTag(component, 'li');
		
		expect(todo[0].classList.contains('editing')).to.equal(true);
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
		
		expect(input1[0].checked).to.equal(true);
		expect(input2[0].checked).to.equal(false);
	});
	
	it('should invoke callback when the delete button is clicked', () => {
		const text = 'React';
		let deleted = false;
		
		// mock deleteItem function
		const deleteItem = () => deleted = true;
		const component = renderIntoDocument(
			<TodoItem text={text} deleteItem={deleteItem}/>
		);
		
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);
		
		expect(deleted).to.equal(true);
	});
	
	it('should invoke callback when checkbox is clicked', () => {
		const text = 'React';
		let isChecked = false;
		
		// mock toggleComplete function
		const toggleComplete = () => isChecked = true;
		const component = renderIntoDocument(
			<TodoItem text={text} toggleComplete={toggleComplete}/>
		);
		
		const checkboxes = scryRenderedDOMComponentsWithTag(component, 'input');
		Simulate.change(checkboxes[0]);
		
		expect(isChecked).to.equal(true);
	});
	
	it('should call a callback when label is double clicked', () => {
		let text = 'React';
		
		// mock editItem function
		const editItem = () => text = 'Redux';
		const component = renderIntoDocument(
			<TodoItem text={text} editItem={editItem}/>
		);
		
		const label = component.text;
		Simulate.doubleClick(label);
		
		expect(text).to.equal('Redux');
	});
	
	it('should call a callback when text is double clicked', () => {
		let text = 'React';
		
		// mock editItem function
		const editItem = () => text = 'Redux';
		
		let selected = false;
		// mock selectEditItem function
		const selectEditItem = () => selected = true;
		const component = renderIntoDocument(
			<TodoItem text={text} editItem={editItem} selectEditItem={selectEditItem}/>
		);
		
		const span = scryRenderedDOMComponentsWithTag(component, 'span');
		Simulate.doubleClick(span[0]);
		
		expect(selected).to.equal(true);
		expect(text).to.equal('React');
	});
	
	it('should autofocus one of TextInput  when updated with props.isEditing = true', (done) => {
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
});
