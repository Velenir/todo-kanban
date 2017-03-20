import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import createMyStore from './helpers/createStore';

import './scss/todomvc-app.css';
import './scss/style.scss';

import Board from './containers/BoardContainer';

const store = createMyStore();

render(
	<Provider store={store}>
		<Board/>
	</Provider>,
	document.getElementById("app")
);
