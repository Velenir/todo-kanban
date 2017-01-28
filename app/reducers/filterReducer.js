function changeFilter(state, filter) {
	return state.set("filter", filter);
}

export default function (state = "all", action) {
	switch (action.type) {
		case "CHANGE_FILTER":
			return changeFilter(state, action.filter);
		default:
			return state;
	}
}
