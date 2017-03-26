import React, {Component} from 'react';
import markdown from 'markdown-it';
import markdownLinkAttributes from 'markdown-it-link-attributes';

const md = markdown({
	linkify: true,
	breaks: true
});

md.use(markdownLinkAttributes, {
	target: '_blank',
	rel: 'noopener noreferrer'
});

function renderMarkdown(text) {
	return {__html: md.render(text)};
}

class Preview extends Component {
	static lastRendered = {}
	
	cacheRender(text) {
		const lastRendered = Preview.lastRendered;
		
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
