import {Record, Iterable, List, fromJS} from 'immutable';
import * as FILTER from '../reducers/filterVars';

const filteredCache = new WeakMap();

export function filterTodos(todos, filter) {
	
	const inCache = filteredCache.get(todos);
	if(inCache && filter in inCache) {
		
		return inCache[filter];
	}
	
	
	let activeItems = 0, filteredTodos;
		
	if(filter !== FILTER.ALL) {
		
		filteredTodos = todos.map(item => {
			const status = item.get("status");
			if(status === FILTER.ACTIVE) ++activeItems;
			return status === filter ? item : null;
		});
	}	else {
		filteredTodos = todos;
		activeItems = todos.filter(item => item.get("status") === FILTER.ACTIVE).length;
		
	}
	
	const filtered = {activeItems, todos: filteredTodos, filter};
	if(inCache) {
		
		inCache[filter] = filtered;
		
	} else {
		
		filteredCache.set(todos, {[filter]: filtered});
	}
	
	return filtered;
}


export const TodoRecord = Record({id: null, text: "", status: FILTER.ACTIVE, editing: false, selectText: false});

export const ListRecord = Record({id: null, title: "", todos: List(), filter: FILTER.ALL, newlyAdded: false});

export const ModalRecord = Record({open: false, id: null, item: ""});

let IndexAcessedList;
const hasProxySupport = !!window.Proxy;
if(hasProxySupport) {
	const indexedProto = new Proxy(Object.prototype, {
		get(target, property, receiver) {
			if(typeof property === "string") {
				if(property === "length") return receiver.size;
				// throws for Symbols
				const index = +property;
				if(Number.isInteger(index)) return receiver.get(index);
			}
			
			return Reflect.get(target, property, receiver);
		}
	});
	
	Object.setPrototypeOf(Iterable.prototype, indexedProto);
	
	IndexAcessedList = List;
} else {
	IndexAcessedList = require('./ImmutableArray').default;
}

export {IndexAcessedList as List};

function fromJSWithRecords(obj, reviver = (k,v) => {
	const isIndexed = Iterable.isIndexed(v);
	return isIndexed ? hasProxySupport ? v.toList() : IndexAcessedList.from(v) : new TodoRecord(v.toMap());
}) {
	return fromJS(obj, reviver);
}

export {fromJSWithRecords as fromJS};
