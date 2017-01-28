import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../app/reducers';

describe('reducer', () => {
	
	it('should handle SET_STATE', () => {
		const initialState = Map();
		const action = {
			type: "SET_STATE",
			state: Map({
				todos: List.of(
					Map({id: 1, text: 'React', status: 'active'}),
					Map({id: 2, text: 'Redux', status: 'active'}),
					Map({id: 3, text: 'Immutable', status: 'completed'})
				)
			})
		};
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]
		}));
	});
	
	it('should handle SET_STATE with plain JS payload', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: {
				todos: [
					{id: 1, text: 'React', status: 'active'},
					{id: 2, text: 'Redux', status: 'active'},
					{id: 3, text: 'Immutable', status: 'completed'}
				]
			}
		};
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]
		}));
	});
	
	it('should handle SET_STATE without initial state', () => {
		const action = {
			type: 'SET_STATE',
			state: {
				todos: [
					{id: 1, text: 'React', status: 'active'},
					{id: 2, text: 'Redux', status: 'active'},
					{id: 3, text: 'Immutable', status: 'completed'}
				]
			}
		};
		
		const nextState = reducer(undefined, action);
		
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]
		}));
	});
	
	it('should handle TOGGLE_COMPLETE by changing the status from active to completed', () => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]
		});
		const action = {
			type: 'TOGGLE_COMPLETE',
			itemId: 1
		};
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'completed'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]
		}));
	});
	
	it('should handle TOGGLE_COMPLETE by changing the status from completed to active', () => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'completed'}
			]
		});
		const action = {
			type: 'TOGGLE_COMPLETE',
			itemId: 3
		};
		
		const nextState = reducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'active'},
				{id: 3, text: 'Immutable', status: 'active'}
			]
		}));
	});
	
	it('should handle CHANGE_FILTER by changing the filter', () => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
			],
			filter: 'all'
		});
		const action = {
			type: 'CHANGE_FILTER',
			filter: 'active'
		};
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
			],
			filter: 'active'
		}));
	});
	
	it('should handle EDIT_ITEM by setting editing to true and selectText to false', () => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: false},
			]
		});
		const action = {
			type: 'EDIT_ITEM',
			itemId: 1
		};
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: true, selectText: false},
			]
		}));
	});
	
	it('should handle SELECT_EDIT_ITEM by setting editing and selectText to true', () => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: false},
			]
		});
		const action = {
			type: 'SELECT_EDIT_ITEM',
			itemId: 1
		};
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: true, selectText: true},
			]
		}));
	});
	
	it('should handle CANCEL_EDITING by setting editing to false', () => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: true},
			]
		});
		const action = {
			type: 'CANCEL_EDITING',
			itemId: 1
		};
		
		const nextState = reducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: false},
			]
		}));
	});
	
	it('should handle DONE_EDITING by setting by updating the text', () => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active', editing: true},
			]
		});
		const action = {
			type: 'DONE_EDITING',
			itemId: 1,
			newText: 'Redux',
		};
		
		const nextState = reducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'Redux', status: 'active', editing: false},
			]
		}));
	});
	
	it('should handle CLEAR_COMPLETED by removing all the completed items', () => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'completed'},
			]
		});
		const action = {
			type: 'CLEAR_COMPLETED'
		};
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
			]
		}));
	});
	
	it('should handle ADD_ITEM by adding the item', () => {
		const initialState = fromJS({
			todos: [
				{id: 7, text: 'React', status: 'active'}
			]
		});
		const action = {
			type: 'ADD_ITEM',
			text: 'Redux'
		};
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 7, text: 'React', status: 'active'},
				{id: 8, text: 'Redux', status: 'active'},
			]
		}));
	});
	
	it('should handle DELETE_ITEM by removing the item', () => {
		const initialState = fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
				{id: 2, text: 'Redux', status: 'completed'},
			]
		});
		const action = {
			type: 'DELETE_ITEM',
			itemId: 2
		};
		
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.equal(fromJS({
			todos: [
				{id: 1, text: 'React', status: 'active'},
			]
		}));
	});
});
