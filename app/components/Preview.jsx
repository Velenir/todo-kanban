import React, {Component} from 'react';
// import markdown from 'markdown-it';
// const md = markdown({
// 	linkify: true,
// 	breaks: true
// });

// function renderMarkdown(text) {
// 	return {__html: md.render(text)};
// }

class Preview extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			rendered: null
		};
		
		if(!Preview.md) {
			Preview.md = import('markdown-it')
				// .then(module => module.default)
				.then(markdown => markdown({
					linkify: true,
					breaks: true
				}));
		}
	}
	
	static md = null
		
	renderMarkdown(text) {
		Preview.md.then(markdown => this.setState({
			rendered: {
				__html: this.lastRendered.output = markdown.render(text)
			}
		}));
	}
	
	lastRendered = {}
	
	cacheRender() {
		const lastRendered = this.lastRendered;
		const {text} = this.props;
		
		if(text === lastRendered.input) {
			this.setState({
				rendered: {__html: lastRendered.output}
			});
			return;
		}
		
		this.renderMarkdown(text);
	}
	
	render() {
		// eslint-disable-next-line no-unused-vars
		const {text, ...props} = this.props;
		console.log("Preview rendering with", text);
		return (
			<div {...props} dangerouslySetInnerHTML={this.state.rendered}/>
		);
	}
	
	componentWillReceiveProps(nextProps) {
		if(this.props.text !== nextProps.text) this.cacheRender();
	}
	
	componentWillMount() {
		this.renderMarkdown(this.props.text);
	}
}

export default Preview;
