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
