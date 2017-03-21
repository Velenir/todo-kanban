import React, {PureComponent} from 'react';
import '../styles/modal.scss';

class Modal extends PureComponent {
	render() {
		if(!this.props.open) return null;
		
		return (
			<div className="modal modal--overlay">
				<div className="modal modal--contents">
					<button className="modal modal--close">×</button>
					{this.props.children}
				</div>
			</div>
		);
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
	}
}

export default Modal;
