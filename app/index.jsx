import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import createMyStore from './helpers/createStore';

import './styles/todomvc-app.css';
import './styles/style.scss';

import Main from './components/Main';

const store = createMyStore();

render(
	<Provider store={store}>
		<Main/>
	</Provider>,
	document.getElementById("app")
);
