import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-dom/test-utils';
import Header from '../../app/components/Header';
import {expect} from 'chai';
import * as LAYOUT from '../../app/reducers/layoutVars';

describe('Header', () => {
	it('should render three radio buttons', () => {
		const component = renderIntoDocument(<Header/>);

		const radios = scryRenderedDOMComponentsWithTag(component, "input");
		expect(radios).to.have.length.of(3);
		expect(radios.every(input => input.type === "radio")).to.be.true;
	});

	it('should invoke a callback when a radio button state is changed', () => {
		let layoutArguments = null;
		const changeLayout = (...args) => layoutArguments = args;
		
		const component = renderIntoDocument(<Header changeLayout={changeLayout}/>);
		
		const radios = scryRenderedDOMComponentsWithTag(component, "input");
		Simulate.change(radios[1]);
		
		expect(layoutArguments).to.deep.equal([LAYOUT.COLUMN_WRAP]);
	});
});
