import React, {Component} from 'react';
import TextArea from './TextArea';

class Description extends Component {
	onDescriptionChange(text) {
		console.log(text);
	}
	
	render() {
		const {item} = this.props;
		
		return (
			<div className="description">
				<h3 className="description__title">Description for {item}</h3>
				<div>
					<TextArea rows="5" cols="50" autoFocus className="description__editor"
						placeholder="Add a description. &#10;Supports markdown."
						onChange={this.onDescriptionChange}
					/>
					{/* <Preview/> */}
					<button type="button" className="description__controls description__controls--save">Save</button>
					<button type="button" className="description__controls description__controls--cancel">Cancel</button>
				</div>
			</div>
		);
	}
}

export default Description;
