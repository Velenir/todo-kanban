import * as actionTypes from '../app/actions/actionTypes';
import * as actions from '../app/actions';
import {expect} from 'chai';
import * as FILTER from '../app/reducers/filterVars';

describe('action creator', () => {
	const results = {
		default(type) {
			return {
				input: [0, 1],
				output: {type, listIndex: 0, itemId: 1}
			};
		},
		changeFilter(type) {
			return {
				input: [0, FILTER.ACTIVE],
				output: {type, listIndex: 0, filter: FILTER.ACTIVE}
			};
		},
		doneEditing(type) {
			return {
				input: [0, 1, "Todo text"],
				output: {type, listIndex: 0, itemId: 1, newText: "Todo text"}
			};
		},
		clearCompleted(type) {
			return {
				input: [0],
				output: {type, listIndex: 0}
			};
		},
		addItem(type) {
			return {
				input: [0, "Todo text"],
				output: {type, listIndex: 0, text: "Todo text"}
			};
		},
		moveItem(type) {
			return {
				input: [[0,1], [1,0]],
				output: {type, fromItemPath: [0, 1], toItemPath: [1, 0]}
			};
		},
		changeTitle(type) {
			return {
				input: [0, "New title"],
				output: {type, listIndex: 0, title: "New title"}
			};
		},
		addList(type) {
			return {
				output: {type}
			};
		},
		removeList(type) {
			return {
				input: [0],
				output: {type, listIndex: 0}
			};
		},
		moveList(type) {
			return {
				input: [0, 1],
				output: {type, toListIndex: 0, fromListIndex: 1}
			};
		}
	};
	
	for(let actionName of Object.keys(actionTypes)) {
		const fName = actionName.split("_").map((w, i) => i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()).join("");
		const actionType = actionTypes[actionName];
		const actionCreator = actions[fName];
	
		it(`${fName} should create ${actionName} action`, () => {
			/*eslint import/namespace: [2, { allowComputed: true }]*/
			const getResults = results[fName] || results.default;
			const {input = [], output} = getResults(actionType);
	
			expect(actionCreator(...input)).to.deep.equal(output);
		});
	}
});
