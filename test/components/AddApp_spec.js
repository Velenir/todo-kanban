import React from 'react';
import {renderIntoDocument, findRenderedDOMComponentWithTag, Simulate} from 'react-dom/test-utils';
import AddApp from '../../app/components/AddApp';
import {expect} from 'chai';

describe('AddApp', () => {
	it('should invoke a callback when button is clicked', () => {
		let called = null;
		// mock addList function
		const addList = () => called = true;
		
		const component = renderIntoDocument(
			<AddApp lists={[]} addList={addList}/>
		);
		
		const button = findRenderedDOMComponentWithTag(component, "button");
		Simulate.click(button);
		
		expect(called).to.be.true;
	});
});
