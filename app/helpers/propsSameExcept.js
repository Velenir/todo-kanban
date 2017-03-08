export default function sameExceptFor(...exceptProps) {
	let notException;
	if(exceptProps.length === 0) {
		return function(nextProps, prevProps) {
			const nextPropsKeys = Object.keys(nextProps);
			const prevPropsKeys = Object.keys(prevProps);
			
			if(nextPropsKeys.length !== prevPropsKeys.length) return false;
			
			for(let key of prevPropsKeys) {
				if((!nextPropsKeys.hasOwnProperty(key) || nextProps[key] !== prevProps[key])) {
					console.log("CH_PROP:", key);
					return false;
				}
			}
			
			return true;
		};
	}
	else if(exceptProps.length === 1) {
		exceptProps = exceptProps[0];
		notException = (key) => key !== exceptProps;
	} else {
		exceptProps = new Set(exceptProps);
		notException = (key) => !exceptProps.has(key);
	}
	
	return function(nextProps, prevProps) {
		const nextPropsKeys = Object.keys(nextProps);
		const prevPropsKeys = Object.keys(prevProps);
		
		if(nextPropsKeys.length !== prevPropsKeys.length) return false;
		
		for(let key of prevPropsKeys) {
			if((!nextProps.hasOwnProperty(key) || nextProps[key] !== prevProps[key]) && notException(key)) {
				return false;
			}
		}
		
		return true;
	};
}


export const sameExceptForListIndex = sameExceptFor("listIndex");
