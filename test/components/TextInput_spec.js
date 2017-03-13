import React from 'react';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';
import TextInput from '../../app/components/TextInput';
import {expect} from 'chai';

describe('TextInput', () => {
	it('should call a callback when pressing enter', () => {
		const text = 'React';
		let hasDoneEditing = false;
		const doneEditing = () => hasDoneEditing = true;
		
		const component = renderIntoDocument(
			<TextInput text={text} doneEditing={doneEditing}/>
		);
		
		const input = component.itemInput;
		Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
		
		expect(hasDoneEditing).to.be.true;
	});
	
	it('should call a callback when pressing escape or losing focus', () => {
		const text = 'React';
		let hasCanceledEditing = false;
		const cancelEditing = () => hasCanceledEditing = true;
		
		const component = renderIntoDocument(
			<TextInput text={text} cancelEditing={cancelEditing}/>
		);
		
		const input = component.itemInput;
		Simulate.keyDown(input, {key: "Escape", keyCode: 27, which: 27});
		
		expect(hasCanceledEditing).to.be.true;
		
		hasCanceledEditing = false;
		
		Simulate.blur(input);
		
		expect(hasCanceledEditing).to.be.true;
	});
	
	it('should select text when rendered with selectText = true property', () => {
		const text = 'React';
		
		const component = renderIntoDocument(
			<TextInput text={text} selectText={true}/>
		);
		
		const input = component.itemInput;
		
		expect(input.selectionStart).to.equal(0);
		expect(input.selectionEnd).to.equal(text.length);
	});
	
	it('should be autofocused when rendered', () => {
		const text = 'React';
		
		const component = renderIntoDocument(
			<TextInput text={text}/>
		);
		
		const input = component.itemInput;
		
		expect(document.activeElement === input).to.be.true;
	});
});
