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

// const initialState = {
// 	todos: fromJS([
// 		{id: 1, text: 'React'},
// 		{id: 2, text: 'Redux'},
// 		{id: 3, text: 'Immutable'},
// 	])
// };
const initialState = {
	lists: List.of(
		ListRecord({
			id: 0,
			title: "Technologies used",
			todos: fromJS([
				{id: uuid(), text: 'React'},
				{id: uuid(), text: 'Redux'},
				{id: uuid(), text: 'Immutable'}
			])
		}),
		ListRecord({
			id: 1,
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

// console.log("STORE", store.getState().lists.toJS());


render(
	<Provider store={store}>
		<Board/>
	</Provider>,
	document.getElementById("app")
);
