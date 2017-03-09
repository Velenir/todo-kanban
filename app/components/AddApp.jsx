import React, {PureComponent} from 'react';

class AddApp extends PureComponent {
	render() {
		return (
			<div className="afterwrapper">
				<section className="addapp">
					<button type="button" onClick={this.props.addList}>+</button>
				</section>
			</div>
		);
	}
	
	componentDidUpdate() {
		console.warn("AddApp UPDATED");
	}
}

export default AddApp;
