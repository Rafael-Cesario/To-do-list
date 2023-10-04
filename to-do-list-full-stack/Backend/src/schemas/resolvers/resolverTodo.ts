import {
	InputCreateTodo,
	InputDeleteTodo,
	InputReadTodos,
	InputRenameTodo,
	InputUpdateStatus,
	InputUpdateTodo,
} from '../../interfaces/interfacesTodo';
import { ServicesTodo } from '../../services/servicesTodo';

const servicesTodo = new ServicesTodo();

export const TodoResolver = {
	Query: {
		readTodos: (parent: never, { readTodos }: { readTodos: InputReadTodos }) => servicesTodo.readTodos(readTodos),
	},

	Mutation: {
		createTodo: (parent: never, { createTodo }: { createTodo: InputCreateTodo }) => servicesTodo.createTodo(createTodo),
		renameTodo: (parent: never, { renameTodo }: { renameTodo: InputRenameTodo }) => servicesTodo.renameTodo(renameTodo),
		deleteTodo: (parent: never, { deleteTodo }: { deleteTodo: InputDeleteTodo }) => servicesTodo.deleteTodo(deleteTodo),
		updateTodo: (parent: never, { updateTodo }: { updateTodo: InputUpdateTodo }) => servicesTodo.updateTodo(updateTodo),
		updateStatus: (parent: never, { updateStatus }: { updateStatus: InputUpdateStatus }) => servicesTodo.updateStatus(updateStatus),
	},
};
