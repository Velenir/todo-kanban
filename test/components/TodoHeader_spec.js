import React from 'react';
import {renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedComponentWithType, Simulate} from 'react-dom/test-utils';
import DropTodoHeader from '../../app/components/TodoHeader';
import {expect} from 'chai';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import DragTodoItem from '../../app/components/TodoItem';

describe('TodoHeader', () => {
	// Wrap DnD component in context with test backend
	const TodoHeader = DragDropContext(TestBackend)(DropTodoHeader);
	
	it('should call a callback on input submit', () => {
		let addedItem, toList;
		const addItem = (listIndex, item) => (addedItem = item, toList = listIndex);
		const component = renderIntoDocument(
			<TodoHeader listIndex={0} addItem={addItem} />
		);
		
		const input = findRenderedDOMComponentWithTag(component, 'input');
		input.value = 'This is a new item';
		Simulate.keyPress(input, {key: "Enter", keyCode: 13, which: 13});
		
		expect(addedItem).to.equal('This is a new item');
		expect(toList).to.equal(0);
		expect(input.value).to.equal('');
	});
	
	it('should be autofocused when rendered as a first sibling', () => {
		const component = renderIntoDocument(
			<TodoHeader listIndex={0}/>
		);
		
		const input = findRenderedDOMComponentWithTag(component, 'input');
		
		expect(document.activeElement === input).to.be.true;
	});
	
	it('should call a callback when pressing Enter or losing focus on title', () => {
		let title = 'Title', list;
		const changeTitle = (listIndex, newTitle) => (title = newTitle, list = listIndex);
		
		const component = renderIntoDocument(
			<TodoHeader listIndex={0} title={title} changeTitle={changeTitle}/>
		);
		
		const h3 = findRenderedDOMComponentWithTag(component, 'h3');
		
		h3.textContent = "New title";
		Simulate.keyDown(h3, {key: "Enter", keyCode: 13, which: 13});
		
		// jsdom doesn't implement contenteditable-dependent logic yet
		// trigger blur manually
		if(h3.isContentEditable === undefined) Simulate.blur(h3);
		
		expect(title).to.equal("New title");
		
		h3.textContent = "Newer title";
		Simulate.blur(h3);
		expect(title).to.equal("Newer title");
		expect(list).to.equal(0);
	});
	
	it('should not call a callback when losing focus on title if title hasn\'t changed', () => {
		const title = 'Title';
		let called = false;
		const changeTitle = () => called = true;
		
		const component = renderIntoDocument(
			<TodoHeader title={title} changeTitle={changeTitle}/>
		);
		
		const h3 = findRenderedDOMComponentWithTag(component, 'h3');
		
		h3.textContent = "New title";
		h3.textContent = title;
		Simulate.blur(h3);
		
		expect(called).to.be.false;
	});
	
	it('should restore empty title when losing focus or pressing Escape', () => {
		const title = 'Title';
		
		const component = renderIntoDocument(
			<TodoHeader title={title}/>
		);
		
		const h3 = findRenderedDOMComponentWithTag(component, 'h3');
		
		h3.textContent = "";
		Simulate.blur(h3);
		
		expect(h3.textContent).to.equal(title);
		
		h3.textContent = "New title";
		Simulate.keyDown(h3, {key: "Escape", keyCode: 27, which: 27});
		
		expect(h3.textContent).to.equal(title);
	});
	
	it('should call a callback when button is clicked', () => {
		let called = false;
		const removeList = () => called = true;
		
		const component = renderIntoDocument(
			<TodoHeader removeList={removeList}/>
		);
		
		const button = findRenderedDOMComponentWithTag(component, 'button');
		Simulate.click(button);
		
		expect(called).to.be.true;
	});
	
	it('should move item to top on hover when dragging across lists', () => {
		let moveArguments = null;
		const moveItem = (...args) => moveArguments = args;
		
		const Wrapper = () => (
			<div>
				<DropTodoHeader listIndex={1} moveItem={moveItem}/>
				<DragTodoItem itemPath={[0, 0]} moveItem={() => {}}/>
			</div>
		);
		
		// Wrap DnD component in context with test backend
		const DnDWrapper = DragDropContext(TestBackend)(Wrapper);
		
		const component = renderIntoDocument(<DnDWrapper/>);
		
		const backend = component.getManager().getBackend();
		
		const todoItem = findRenderedComponentWithType(component, DragTodoItem);
		const todoHeader = findRenderedComponentWithType(component, DropTodoHeader);
		
		backend.simulateBeginDrag([todoItem.getHandlerId()]);
		// hover over DropTarget-wrapped instance
		backend.simulateHover([todoHeader.getHandlerId()]);
		
		expect(moveArguments).to.deep.equal([[0,0], [1,0]]);
		
		backend.simulateEndDrag();
	});
	
	it('should not move item on hover when dragging within same list', () => {
		let moveArguments = null;
		const moveItem = (...args) => moveArguments = args;
		
		const Wrapper = () => (
			<div>
				<DropTodoHeader listIndex={1} moveItem={moveItem}/>
				<DragTodoItem itemPath={[1, 0]} moveItem={() => {}}/>
			</div>
		);
		
		// Wrap DnD component in context with test backend
		const DnDWrapper = DragDropContext(TestBackend)(Wrapper);
		
		const component = renderIntoDocument(<DnDWrapper/>);
		
		const backend = component.getManager().getBackend();
		
		const todoItem = findRenderedComponentWithType(component, DragTodoItem);
		const todoHeader = findRenderedComponentWithType(component, DropTodoHeader);
		
		backend.simulateBeginDrag([todoItem.getHandlerId()]);
		// hover over DropTarget-wrapped instance
		backend.simulateHover([todoHeader.getHandlerId()]);
		
		expect(moveArguments).to.be.null;
		
		backend.simulateEndDrag();
	});
});
