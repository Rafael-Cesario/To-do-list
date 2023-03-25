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

export interface InputRenameTodo {
	email: string;
	listName: string;
	id: string;
	newTask: string;
}

export interface InputDeleteTodo {
	email: string;
	listName: string;
	id: string;
}

export interface InputUpdateStatus {
	email: string;
	listName: string;
	id: string;
	newStatus: string;
}

export interface InputUpdateTodo {
	email: string;
	listName: string;
	id: string;
	task: string;
	status: string;
	tags: string[];
}
