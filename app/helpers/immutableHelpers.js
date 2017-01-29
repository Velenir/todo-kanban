import {Record, Iterable, fromJS} from 'immutable';
import * as FILTER from '../reducers/filterVars';

export function filterTodos(todos, filter) {
	let activeItems = 0;
		
	if(filter !== FILTER.ALL) {
		
		todos = todos.filter(item => {
			const status = item.get("status");
			if(status === FILTER.ACTIVE) ++activeItems;
			return status === filter;
		});
	}	else {
		activeItems = todos.filter(item => item.get("status") === FILTER.ACTIVE).size;
	}
	
	return {activeItems, todos, filter};
}


export const TodoRecord = Record({id: null, text: "", status: FILTER.ACTIVE, editing: false, selectText: false});


function fromJSWithRecords(obj, reviver = (k,v) => {
	const isIndexed = Iterable.isIndexed(v);
	return isIndexed ? v.toList() : new TodoRecord(v.toMap());
}) {
	return fromJS(obj, reviver);
}

export {fromJSWithRecords as fromJS};
