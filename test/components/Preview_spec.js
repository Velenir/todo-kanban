import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils';
import Preview from '../../app/components/Preview';
import {expect} from 'chai';

describe('Preview', () => {
	it('should render markdown passed to it', () => {
		const text = `**BOLD**
		*italic*
		www.example.com`;
		
		const component = renderIntoDocument(
			<Preview text={text}/>
		);
		
		const divs = scryRenderedDOMComponentsWithTag(component, "div");
		expect(divs[0].innerHTML).to.equal(
`<p><strong>BOLD</strong><br>
<em>italic</em><br>
<a href="http://www.example.com" target="_blank" rel="noopener noreferrer">www.example.com</a></p>
`
		);
	});
});
