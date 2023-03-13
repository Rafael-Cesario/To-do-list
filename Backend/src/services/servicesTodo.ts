/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { InputCreateTodo, InputDeleteTodo, InputReadTodos, InputRenameTodo } from '../interfaces/interfacesTodo';
import { ModelList } from '../models/modelList';
import { ModelTodo } from '../models/modelTodo';
import { ModelUser } from '../models/modelUser';
import { verifyValues } from '../utils/verifyValues';

export class ServicesTodo {
	private async validateValues(userInput: object, email: string, listName: string) {
		const hasEmptyValues = verifyValues(userInput);
		if (hasEmptyValues) throw new Error(`Failure: ${hasEmptyValues}`);

		const user = await ModelUser.findOne({ email });
		if (!user) throw new Error('Failure: User not found');

		const list = await ModelList.findOne({ email, listName });
		if (!list) throw new Error('Failure: List not found');
	}

	async createTodo(createTodo: InputCreateTodo) {
		try {
			const { email, id, listName, task } = createTodo;

			await this.validateValues(createTodo, email, listName);

			const sameId = await ModelTodo.findOne({ email, listName, id });
			if (sameId) throw new Error('Failure: Todo with same ID');

			const todo = new ModelTodo({ email, listName, id, task, state: 'next', tags: [] });
			await todo.save();

			return { message: 'Success: New task created' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async readTodos(readTodos: InputReadTodos) {
		try {
			const { email, listName } = readTodos;

			await this.validateValues(readTodos, email, listName);

			const todos = await ModelTodo.find({ email, listName });
			return todos;
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async renameTodo(renameTodo: InputRenameTodo) {
		try {
			const { email, id, listName, newTask } = renameTodo;

			await this.validateValues(renameTodo, email, listName);

			const todo = await ModelTodo.findOne({ email, listName, id });
			if (!todo) throw new Error('Failure: Todo not found');

			todo.task = newTask;
			await todo.save();

			return { message: 'Success: Task renamed' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async deleteTodo(deleteTodo: InputDeleteTodo) {
		try {
			console.log({ deleteTodo });
			return { message: 'Todo deleted' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}
}
