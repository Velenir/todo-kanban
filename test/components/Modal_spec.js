import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import Modal from '../../app/components/Modal';
import {expect} from 'chai';

describe('Modal', () => {
	afterEach(() => {
		// clean up possible class addition
		document.body.classList.remove("modal-open");
	});
	
	it('should render children when open prop is true', () => {
		const component = renderIntoDocument(
			<Modal open>Child</Modal>
		);
		
		const divs = scryRenderedDOMComponentsWithTag(component, "div");
		expect(divs[1].textContent).to.include("Child");
	});
	
	it('should not render when open prop is false', () => {
		const component = renderIntoDocument(
			<Modal open={false}>Child</Modal>
		);
		
		const divs = scryRenderedDOMComponentsWithTag(component, "div");
		
		expect(divs).to.have.length.of(0);
	});
	
	it('should invoke a callback on outer div click and button click', () => {
		let called = false;
		const closeModal = () => called = true;
		
		const component = renderIntoDocument(
			<Modal open closeModal={closeModal}/>
		);
		
		const divs = scryRenderedDOMComponentsWithTag(component, "div");
		Simulate.click(divs[0]);
		
		expect(called).to.be.true;
		called = false;
		
		const buttons = scryRenderedDOMComponentsWithTag(component, "button");
		Simulate.click(buttons[0]);
		expect(called).to.be.true;
	});
	
	it('should add modal-open class to body on opening', () => {
		expect(document.body.classList.contains("modal-open")).to.be.false;
		renderIntoDocument(
			<Modal open>Child</Modal>
		);
		
		expect(document.body.classList.contains("modal-open")).to.be.true;
	});
	
	it('should remove modal-open class to body on closing', () => {
		class Wrapper extends React.Component {
			state = {open: true}
			
			render() {
				return <Modal open={this.state.open}>Child</Modal>;
			}
		}
		
		const wrapper = renderIntoDocument(
			<Wrapper/>
		);
		
		expect(document.body.classList.contains("modal-open")).to.be.true;
		
		wrapper.setState({open: false});
		
		expect(document.body.classList.contains("modal-open")).to.be.false;
	});
});
