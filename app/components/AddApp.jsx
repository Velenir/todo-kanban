import React, {Component} from 'react';

class AddApp extends Component {
	render() {
		return (
			<div>
				<section className="addapp">
					<button type="button">+</button>
				</section>
			</div>
		);
	}
	
	componentDidUpdate() {
		console.warn("AddApp UPDATED");
	}
}

export default AddApp;
