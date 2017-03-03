import React from 'react';
import {renderIntoDocument, findRenderedDOMComponentWithTag, Simulate} from 'react-addons-test-utils';
import TodoHeader from '../../app/components/TodoHeader';
import {expect} from 'chai';

describe('TodoHeader', () => {
	it('should call a callback on input submit', () => {
		let addedItem = '';
		const addItem = (item) => addedItem = item;
		const component = renderIntoDocument(
			<TodoHeader addItem={addItem} />
		);
		
		const input = findRenderedDOMComponentWithTag(component, 'input');
		input.value = 'This is a new item';
		Simulate.keyPress(input, {key: "Enter", keyCode: 13, which: 13});
		
		expect(addedItem).to.equal('This is a new item');
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
		let title = 'Title';
		const changeTitle = (newTitle) => title = newTitle;
		
		const component = renderIntoDocument(
			<TodoHeader title={title} changeTitle={changeTitle}/>
		);
		
		const h3 = findRenderedDOMComponentWithTag(component, 'h3');
		
		h3.onblur=()=>console.log("BLURRED");
		h3.textContent = "New title";
		Simulate.keyDown(h3, {key: "Enter", keyCode: 13, which: 13});
		
		// jsdom doesn't implement contenteditable-dependent logic yet
		// trigger blur manually
		if(h3.isContentEditable === undefined) Simulate.blur(h3);
		
		expect(title).to.equal("New title");
		
		h3.textContent = "Newer title";
		Simulate.blur(h3);
		expect(title).to.equal("Newer title");
	});
	
	it('should not call a callback when losing focus on title when title hasn\'t changed', () => {
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
		
		expect(called).to.equal(false);
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
		
		expect(called).to.equal(true);
	});
});
