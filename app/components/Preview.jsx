import React, {Component} from 'react';
import markdown from 'markdown-it';
const md = markdown({
	linkify: true,
	breaks: true
});

function renderMarkdown(text) {
	return {__html: md.render(text)};
}

class Preview extends Component {
	lastRendered = {}
	
	cacheRender(text) {
		const lastRendered = this.lastRendered;
		
		return text === lastRendered.input ? lastRendered.output :
		(lastRendered.input = text, lastRendered.output = renderMarkdown(text));
	}
	
	render() {
		const {text, ...props} = this.props;
		console.log("Preview rendering with", text);
		return (
			<div {...props} dangerouslySetInnerHTML={this.cacheRender(text)}/>
		);
	}
}

export default Preview;
