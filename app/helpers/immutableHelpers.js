import {Record, Iterable, List, fromJS} from 'immutable';
import * as FILTER from '../reducers/filterVars';

const filteredCache = new WeakMap();

export function filterTodos(todos, filter) {
	const inCache = filteredCache.get(todos);
	if(inCache && filter in inCache) {
		console.log("Filtered from cache");
		return inCache[filter];
	}
	
	
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
	console.log("Filtered todos:", activeItems, todos, filter);
	const filtered = {activeItems, todos, filter};
	if(inCache) {
		console.log("ADDING to already in cache");
		inCache[filter] = filtered;
		console.log(inCache);
	} else {
		console.log("ADDING to new in cache");
		filteredCache.set(todos, {[filter]: filtered});
	}
	
	return filtered;
}


export const TodoRecord = Record({id: null, text: "", status: FILTER.ACTIVE, editing: false, selectText: false});

export const ListRecord = Record({title: "", todos: List(), filter: FILTER.ALL});


function fromJSWithRecords(obj, reviver = (k,v) => {
	const isIndexed = Iterable.isIndexed(v);
	return isIndexed ? v.toList() : new TodoRecord(v.toMap());
}) {
	return fromJS(obj, reviver);
}

export {fromJSWithRecords as fromJS};

export function findItemEntry(todos, itemId) {
	return todos.findEntry(item => item.get("id") === itemId);
}
