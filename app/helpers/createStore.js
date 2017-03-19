import {createStore} from 'redux';
import reducer from '../reducers';
import {fromJS, ListRecord, List} from './immutableHelpers';

import {v4 as uuid} from 'uuid';

function getDefaultInitialState() {
	return {
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
}

export default function createMyStore(initialState = getDefaultInitialState()) {
	// eslint-disable-next-line no-underscore-dangle
	return createStore(reducer, initialState, process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
		serialize: {
			options: {
				symbol: true
			},
			immutable: require('immutable'),
			refs: [
				require('./immutableHelpers').TodoRecord,
				require('./immutableHelpers').ListRecord
			]
		}
	}) : undefined);
}
