import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {fromJS} from './helpers/immutableHelpers';

import 'todomvc-app-css/index.css';

import App from './containers/AppContainer';

const initialState = {
	todos: fromJS([
		{id: 1, text: 'React'},
		{id: 2, text: 'Redux'},
		{id: 3, text: 'Immutable'},
	])
};

// eslint-disable-next-line no-underscore-dangle
const store = createStore(reducer, initialState, process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
	serialize: {
		options: {
			symbol: true
		}
	}
}) : undefined);


render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById("app")
);
