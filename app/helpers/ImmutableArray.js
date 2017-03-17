class ImmutableArray extends Array {
	constructor(...args) {
		super(...args);
		if(!ImmutableArray.dontFreeze) {
			ImmutableArray.dontFreeze = false;
			Object.freeze(this);
		}
	}
		
	static of(...args) {
		ImmutableArray.dontFreeze = true;
		const ar = super.of(...args);
		return Object.freeze(ar);
	}
	
	static from(...args) {
		ImmutableArray.dontFreeze = true;
		const ar = super.from(...args);
		return Object.freeze(ar);
	}
	
	slice(...args) {
		ImmutableArray.dontFreeze = true;
		const ar = super.slice.apply(this, args);
		return Object.freeze(ar);
	}
	
	get(index) {
		return this[index];
	}
	
	set(index, val) {
		const copy = super.slice();
		copy[index] = val;
		return copy;
	}
	
	pop() {
		const copy = super.slice();
		super.pop.call(copy);
		return copy;
	}
	
	push(...args) {
		const copy = super.slice();
		super.push.apply(copy, args);
		return copy;
	}
	
	shift() {
		const copy = super.slice();
		super.shift.call(copy);
		return copy;
	}
	
	unshift(...args) {
		const copy = super.slice();
		super.unshift.apply(copy, args);
		return copy;
	}
	
	fill(...args) {
		const copy = super.slice();
		super.fill.apply(copy, args);
		return copy;
	}
	
	sort(...args) {
		const copy = super.slice();
		super.sort.apply(copy, args);
		return copy;
	}
	
	splice(...args) {
		const copy = super.slice();
		super.splice.apply(copy, args);
		return copy;
	}
	
	reverse() {
		const copy = super.slice();
		super.reverse.call(copy);
		return copy;
	}
	
	copyWithin(...args) {
		const copy = super.slice();
		super.copyWithin.apply(copy, args);
		return copy;
	}
	
	asMutable() {
		return Array.from(this);
	}
	
	withMutations(cb) {
		const mutated = cb(this.asMutable());
		return ImmutableArray.from(mutated);
	}
}

export default ImmutableArray;
