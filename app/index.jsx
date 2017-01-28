import React from 'react';
import {render} from 'react-dom';
// import {List, Map} from 'immutable';
import {fromJS} from 'immutable';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';

import 'todomvc-app-css/index.css';

import App from './containers/App';

// const todos = List.of(
// 	Map({id: 1, text: "React", status: "active", editing: false}),
// 	Map({id: 1, text: "Redux", status: "active", editing: false}),
// 	Map({id: 1, text: "Immutable", status: "completed", editing: false})
// );
//
// const filter = "all";

const initialState = {
	todos: fromJS([
		{id: 1, text: 'React', status: 'active', editing: false},
		{id: 2, text: 'Redux', status: 'active', editing: false},
		{id: 3, text: 'Immutable', status: 'active', editing: false},
	]),
	filter: 'all'
};

// eslint-disable-next-line no-underscore-dangle
const store = createStore(reducer, initialState, process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : undefined);


render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById("app")
);
