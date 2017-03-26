import React, {Component} from 'react';
import '../styles/modal.scss';

class Modal extends Component {
	onOverlayClicked = (e) => {
		// don't react to clicks on child nodes
		if(e.target === e.currentTarget) this.props.closeModal();
	}
	render() {
		if(!this.props.open) return null;
		
		return (
			<div className="modal__overlay" onClick={this.onOverlayClicked}>
				<div className="modal__contents">
					<button className="modal__close" type="button" onClick={this.props.closeModal}>×</button>
					{this.props.children}
				</div>
			</div>
		);
	}
	
	preventDefault(e) {
		e.preventDefault();
	}
	
	static scrollDisabled = false;
	
	disablePageScroll() {
		if(!Modal.scrollDisabled) {
			Modal.scrollDisabled = true;
			document.body.classList.add("modal-open");
		}
	}
	
	enablePageScroll() {
		if(Modal.scrollDisabled) {
			Modal.scrollDisabled = false;
			document.body.classList.remove("modal-open");
		}
	}
	
	componentDidUpdate(prevProps) {
		const updatedProps = {};
		for(let prop in prevProps) {
			const prevProp = prevProps[prop];
			const currentProp = this.props[prop];
			if(prevProp !== currentProp) {
				updatedProps[prop] = `${String(prevProp)} -> ${String(currentProp)}`;
			}
		}
		console.log(`Modal UPDATED with`, updatedProps);
		
		if(prevProps.open !== this.props.open) {
			this.props.open ? this.disablePageScroll() : this.enablePageScroll();
		}
	}
	
	componentDidMount() {
		this.props.open && this.disablePageScroll();
	}
	
	componentWillUnmount() {
		console.log("MODAL WILL UNMOUNT");
		this.props.open && this.enablePageScroll();
	}
}

export default Modal;
