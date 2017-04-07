import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithClass, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import Description from '../../app/components/Description';
import Preview from '../../app/components/Preview';
import {expect} from 'chai';

describe('Description', () => {
	before(() => {
		// avoid waiting for promise execution in componentWillMount
		Description.Preview = Preview;
	});
	
	it('should render description__title with item provided', () => {
		const component = renderIntoDocument(
			<Description item="Item Name"/>
		);
		
		const titles = scryRenderedDOMComponentsWithClass(component, "description__title");
		expect(titles[0].textContent).to.equal("Item Name");
	});
	
	it('should render description__preview and not description__display when provided a truthy description prop', () => {
		const component = renderIntoDocument(
			<Description description="description"/>
		);
		
		const displays = scryRenderedDOMComponentsWithClass(component, "description__display");
		expect(displays).to.have.length.of(0);
		const previews = scryRenderedDOMComponentsWithClass(component, "description__preview");
		expect(previews).to.have.length.of(1);
	});
	
	it('should render description__display and not description__preview when not provided a truthy description prop', () => {
		const component = renderIntoDocument(
			<Description description=""/>
		);
		
		const displays = scryRenderedDOMComponentsWithClass(component, "description__display");
		expect(displays).to.have.length.of(1);
		const previews = scryRenderedDOMComponentsWithClass(component, "description__preview");
		expect(previews).to.have.length.of(0);
	});
	
	it('should set showPreview to false when clicking on description__preview', () => {
		const component = renderIntoDocument(
			<Description description="description"/>
		);
		
		const previews = scryRenderedDOMComponentsWithClass(component, "description__preview");
		expect(component.state.showPreview).to.be.true;
		
		Simulate.click(previews[0]);
		
		expect(component.state.showPreview).to.be.false;
	});
	
	it('should not change state when clicking on a link inside description__preview', () => {
		const component = renderIntoDocument(
			<Description description="www.example.com"/>
		);
		
		const oldState = component.state;
		
		const previews = scryRenderedDOMComponentsWithClass(component, "description__preview");
		const link = previews[0].querySelector("a");
		Simulate.click(link);
		
		expect(component.state).to.equal(oldState);
	});
	
	it('should invoke a callback when save button is clicked', () => {
		let changeDescriptionArgs = null;
		const changeDescription = (...args) => changeDescriptionArgs = args;
		const component = renderIntoDocument(
			<Description description="" id={1} changeDescription={changeDescription}/>
		);
		
		component.setState({text: "description"});
		
		const [saveButton] = scryRenderedDOMComponentsWithClass(component, "description__controls--save");
		Simulate.click(saveButton);
		
		expect(changeDescriptionArgs).to.deep.equal([1, "description"]);
	});
	
	it('should not invoke a callback when save button is clicked if description hasn\'t changed', () => {
		let changeDescriptionArgs = null;
		const changeDescription = (...args) => changeDescriptionArgs = args;
		const component = renderIntoDocument(
			<Description description="" id={1} changeDescription={changeDescription}/>
		);
		
		// display buttons
		component.setState({showPreview: false});
		
		const [saveButton] = scryRenderedDOMComponentsWithClass(component, "description__controls--save");
		Simulate.click(saveButton);
		
		expect(changeDescriptionArgs).to.be.null;
	});
	
	it('should set showPreview to true if description is truthy and false otherwise, when save button is clicked', () => {
		const component = renderIntoDocument(
			<Description description="" changeDescription={() => {}}/>
		);
				
		const [saveButton] = scryRenderedDOMComponentsWithClass(component, "description__controls--save");
		Simulate.click(saveButton);
		
		expect(component.state.showPreview).to.be.false;
		
		component.setState({text: "description"});
		Simulate.click(saveButton);
		
		expect(component.state.showPreview).to.be.true;
	});
	
	it('should set showPreview to true if description is truthy and false otherwise, when cancel button is clicked', () => {
		let component = renderIntoDocument(
			<Description description=""/>
		);
				
		let [cancelButton] = scryRenderedDOMComponentsWithClass(component, "description__controls--cancel");
		Simulate.click(cancelButton);
		
		expect(component.state.showPreview).to.be.false;
		
		component = renderIntoDocument(
			<Description description="description"/>
		);
		
		// display buttons
		component.setState({showPreview: false});
		[cancelButton] = scryRenderedDOMComponentsWithClass(component, "description__controls--cancel");
		Simulate.click(cancelButton);
		
		expect(component.state.showPreview).to.be.true;
	});
	
	it('should set showPreview to true if description is truthy and false otherwise, when pressing Escape inside textarea', () => {
		let component = renderIntoDocument(
			<Description description=""/>
		);
				
		let [textarea] = scryRenderedDOMComponentsWithTag(component, "textarea");
		Simulate.keyDown(textarea, {key: "Escape", keyCode: 27, which: 27});
		
		expect(component.state.showPreview).to.be.false;
		
		component = renderIntoDocument(
			<Description description="description"/>
		);
		// display textarea
		component.setState({showPreview: false});
				
		[textarea] = scryRenderedDOMComponentsWithTag(component, "textarea");
		Simulate.keyDown(textarea, {key: "Escape", keyCode: 27, which: 27});
		
		expect(component.state.showPreview).to.be.true;
	});
	
	it('should set showPreview to true if description is truthy and false otherwise, when textarea loses focus', () => {
		let component = renderIntoDocument(
			<Description description=""/>
		);
				
		let [textarea] = scryRenderedDOMComponentsWithTag(component, "textarea");
		Simulate.blur(textarea);
		
		expect(component.state.showPreview).to.be.false;
		
		component = renderIntoDocument(
			<Description description="description"/>
		);
		// display textarea
		component.setState({showPreview: false});
				
		[textarea] = scryRenderedDOMComponentsWithTag(component, "textarea");
		Simulate.blur(textarea);
		
		expect(component.state.showPreview).to.be.true;
	});
	
	it('should not change state when textarea loses focus to save or cancel button', () => {
		const component = renderIntoDocument(
			<Description description=""/>
		);
		
		const oldState = component.state;
				
		const [textarea] = scryRenderedDOMComponentsWithTag(component, "textarea");
		const buttons = scryRenderedDOMComponentsWithTag(component, "button");
		Simulate.blur(textarea, {relatedTarget: buttons[0]});
		
		expect(component.state).to.equal(oldState);
		
		Simulate.blur(textarea, {relatedTarget: buttons[1]});
		
		expect(component.state).to.equal(oldState);
	});
	
	it('should have save and cancel buttons disabled when both state.text and props.description are falsy', () => {
		let component = renderIntoDocument(
			<Description description=""/>
		);
		
		let buttons = scryRenderedDOMComponentsWithTag(component, "button");
		expect(buttons[0].disabled).to.be.true;
		expect(buttons[1].disabled).to.be.true;
		
		component.setState({text: "description"});
		
		expect(buttons[0].disabled).to.be.false;
		expect(buttons[1].disabled).to.be.false;
		
		component = renderIntoDocument(
			<Description description="description"/>
		);
		// display textarea and set empty text
		component.setState({showPreview: false, text: ""});
		
		buttons = scryRenderedDOMComponentsWithTag(component, "button");
		expect(buttons[0].disabled).to.be.false;
		expect(buttons[1].disabled).to.be.false;
	});
});
