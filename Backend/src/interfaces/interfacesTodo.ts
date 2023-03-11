export interface InputCreateTodo {
	email: string;
	listName: string;
	id: string;
	task: string;
}

export interface InputReadTodos {
	email: string;
	listName: string;
}
