export function filterTodos(todos, filter) {
	let activeItems = 0;
		
	if(filter !== "all") {
		
		todos = todos.filter(item => {
			const status = item.get("status");
			if(status === "active") ++activeItems;
			return status === filter;
		});
	}	else {
		activeItems = todos.filter(item => item.get("status") === "active").size;
	}
	
	return {activeItems, todos, filter};
}
