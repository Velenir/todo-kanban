import {JSDOM} from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const {window: win, window: {document: doc}} = new JSDOM(`
	<!doctype html>
	<html>
		<body></body>
	</html>
`);

// React TestUtils renderer needs global window and document for anything but shallow rendering
global.document = doc;
global.window = win;

Object.keys(window).forEach(key => {
	if(!(key in global)) global[key] = window[key];
});

chai.use(chaiImmutable);
