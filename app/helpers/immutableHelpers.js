import {Record, Iterable, List, fromJS} from 'immutable';
import * as FILTER from '../reducers/filterVars';

const filteredCache = new WeakMap();

export function filterTodos(todos, filter) {
	console.log("FILTERING");
	const inCache = filteredCache.get(todos);
	if(inCache && filter in inCache) {
		console.log("Filtered from cache");
		return inCache[filter];
	}
	
	
	let activeItems = 0;
		
	if(filter !== FILTER.ALL) {
		
		todos = todos.map(item => {
			const status = item.get("status");
			if(status === FILTER.ACTIVE) ++activeItems;
			return status === filter ? item : null;
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

export const ListRecord = Record({id: null, title: "", todos: List(), filter: FILTER.ALL, newlyAdded: false});

let IndexAcessedList;
if("Proxy" in window) {
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
	const originalPush = Array.prototype.push;
	Object.defineProperties(Array.prototype, {
		"update": {
			value(index, cb) {
				console.log("update", index);
				const newAr = this.slice();
				newAr[index] = cb(newAr[index]);
				return newAr;
			}
		},
		"push": {
			value() {
				const newAr = this.slice();
				originalPush.apply(newAr, arguments);
				return newAr;
			}
		},
		"remove": {
			value(index) {
				const newAr = this.slice();
				newAr.splice(index, 1);
				return newAr;
			}
		},
		"set": {
			value(index, val) {
				const newAr = this.slice();
				newAr[index] = val;
				return newAr;
			}
		},
		"withMutations": {
			value(cb) {
				const tempAr = this.slice();
				tempAr.set = function(index, val) {
					this[index] = val;
					return this;
				};
				const newAr = cb(newAr);
				delete newAr.set;
				return newAr;
			}
		}
	});
	
	IndexAcessedList = ar => ar;
	
	IndexAcessedList.of = Array.of.bind(Array);
}

export {IndexAcessedList as List};

function fromJSWithRecords(obj, reviver = (k,v) => {
	const isIndexed = Iterable.isIndexed(v);
	return isIndexed ? v.toList() : new TodoRecord(v.toMap());
}) {
	return fromJS(obj, reviver);
}

export {fromJSWithRecords as fromJS};
