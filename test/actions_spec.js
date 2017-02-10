import * as actionTypes from '../app/actions/actionTypes';
import * as actions from '../app/actions';
import {expect} from 'chai';
import * as FILTER from '../app/reducers/filterVars';

describe('action creator', () => {
	const results = {
		default(type) {
			return {
				input: [1],
				output: {type, itemId: 1}
			};
		},
		changeFilter(type) {
			return {
				input: [FILTER.ACTIVE],
				output: {type, filter: FILTER.ACTIVE}
			};
		},
		doneEditing(type) {
			return {
				input: [1, "Todo text"],
				output: {type, itemId: 1, newText: "Todo text"}
			};
		},
		clearCompleted(type) {
			return {
				output: {type}
			};
		},
		addItem(type) {
			return {
				input: ["Todo text"],
				output: {type, text: "Todo text"}
			};
		},
		moveItem(type) {
			return {
				input: [[1, {id: 1, text: "Todo text"}], 2],
				output: {type, itemEntry: [1, {id: 1, text: "Todo text"}], toIndex: 2}
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
