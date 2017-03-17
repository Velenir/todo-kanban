class ImmutableArray extends Array {
	constructor(...args) {
		super(...args);
	}
	
	static of(...args) {
		return super.of(...args);
	}
	
	static from(...args) {
		// console.log("FROM", ...args);
		return super.from(...args);
	}
	
	slice(...args) {
		return super.slice.apply(this, args);
	}
	
	get(index) {
		return this[index];
	}
	
	set(index, val) {
		const copy = super.slice();
		copy[index] = val;
		return copy;
	}
	
	_applySuperFunc(fn, args) {
		const copy = super.slice();
		fn.apply(copy, args);
		return copy;
	}
	
	/* eslint-disable no-underscore-dangle*/
	pop() {
		return this._applySuperFunc(super.pop);
	}
	
	push() {
		console.log("PUSHING");
		return this._applySuperFunc(super.push, arguments);
	}
	
	shift() {
		return this._applySuperFunc(super.shift);
	}
	
	unshift() {
		return this._applySuperFunc(super.unshift, arguments);
	}
	
	fill() {
		return this._applySuperFunc(super.fill, arguments);
	}
	
	sort() {
		return this._applySuperFunc(super.sort, arguments);
	}
	
	splice() {
		return this._applySuperFunc(super.splice, arguments);
	}
	
	reverse() {
		return this._applySuperFunc(super.reverse);
	}
	
	copyWithin() {
		return this._applySuperFunc(super.copyWithin, arguments);
	}
	
	/* eslint-enable no-underscore-dangle*/
	asMutable() {
		return Array.from(this);
	}
	
	withMutations(cb) {
		const mutated = cb(this.asMutable());
		return ImmutableArray.from(mutated);
	}
	
	remove(index) {
		return this.splice(index, 1);
	}
	
	insert(index, val) {
		return this.splice(index, 0, val);
	}
}

export default ImmutableArray;
