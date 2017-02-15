import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {fromJS} from './helpers/immutableHelpers';
import {Map, List} from 'immutable';

import 'todomvc-app-css/index.css';

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
		Map({
			title: "Technologies used",
			todos: fromJS([
				{id: 1, text: 'React'},
				{id: 2, text: 'Redux'},
				{id: 3, text: 'Immutable'}
			])
		}),
		Map({
			title: "New List",
			todos: fromJS([
				{id: 1, text: 'Item 1'},
				{id: 2, text: 'Item 2'},
				{id: 3, text: 'Item 3'},
				{id: 4, text: 'Item 4'}
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

console.log("STORE", store.getState().lists.toJS());


render(
	<Provider store={store}>
		<Board/>
	</Provider>,
	document.getElementById("app")
);
