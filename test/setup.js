import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = jsdom.jsdom(`
	<!doctype html>
	<html>
		<body></body>
	</html>
`);
const win = doc.defaultView;

// React TestUtils renderer needs global window and document for anything but shallow rendering
global.document = doc;
global.window = win;

Object.keys(window).forEach(key => {
	if(!(key in global)) global[key] = window[key];
});

chai.use(chaiImmutable);
