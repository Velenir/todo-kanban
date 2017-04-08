import React from 'react';
import {renderIntoDocument, findRenderedDOMComponentWithTag, Simulate} from 'react-dom/test-utils';
import TextArea from '../../app/components/TextArea';
import {expect} from 'chai';

describe('TextArea', () => {
	it('should invoke a callback on change', () => {
		let called = false;
		const onChange = () => called = true;
		
		const component = renderIntoDocument(
			<TextArea onChange={onChange}/>
		);
		
		const textarea = findRenderedDOMComponentWithTag(component, "textarea");
		
		Simulate.change(textarea);
		
		expect(called).to.be.true;
	});
	
	it('should expose internal textarea.value on the component', () => {
		const component = renderIntoDocument(
			<TextArea/>
		);
		
		const textarea = findRenderedDOMComponentWithTag(component, "textarea");
		
		expect(textarea.value).to.equal("");
		expect(component.value).to.equal("");
		
		// change through DOM element
		textarea.value = "text";
		
		expect(textarea.value).to.equal("text");
		expect(component.value).to.equal("text");
		
		// changing through prop on component
		component.value = "new text";
		
		expect(textarea.value).to.equal("new text");
		expect(component.value).to.equal("new text");
	});
	
	it('should resize on change', () => {
		const component = renderIntoDocument(
			<TextArea/>
		);
		
		const textarea = findRenderedDOMComponentWithTag(component, "textarea");
		
		// jsdom doesn't do layouting, so just check for invocation
		let called = false;
		const oldResize = component.resize;
		component.resize = function() {
			oldResize.call(this);
			called = true;
		};
		
		Simulate.change(textarea);
		
		expect(called).to.be.true;
	});
	
	it('should resize on mount', () => {
		// jsdom doesn't do layouting, so just check for invocation
		let called = false;
		class WatchResize extends TextArea {
			resize() {
				super.resize();
				called = true;
			}
		}
		
		renderIntoDocument(
			<WatchResize/>
		);
		
		expect(called).to.be.true;
	});
});
