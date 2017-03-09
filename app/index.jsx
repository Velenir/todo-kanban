import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {fromJS, ListRecord, List} from './helpers/immutableHelpers';
// import {List} from 'immutable';

import {v4 as uuid} from 'uuid';

import 'todomvc-app-css/index.css';
import './scss/style.scss';

import Board from './containers/BoardContainer';

const initialState = {
	lists: List.of(
		ListRecord({
			id: uuid(),
			title: "Technologies used",
			todos: fromJS([
				{id: uuid(), text: 'React'},
				{id: uuid(), text: 'Redux'},
				{id: uuid(), text: 'Immutable'}
			])
		}),
		ListRecord({
			id: uuid(),
			title: "New List",
			todos: fromJS([
				{id: uuid(), text: 'Item 1'},
				{id: uuid(), text: 'Item 2'},
				{id: uuid(), text: 'Item 3'},
				{id: uuid(), text: 'Item 4'}
			])
		})
	)
};

// eslint-disable-next-line no-underscore-dangle
const store = createStore(reducer, initialState, process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
	serialize: {
		options: {
			symbol: true
		},
		immutable: require('immutable'),
		refs: [require('./helpers/immutableHelpers').TodoRecord]
	}
}) : undefined);

render(
	<Provider store={store}>
		<Board/>
	</Provider>,
	document.getElementById("app")
);
