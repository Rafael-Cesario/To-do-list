/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import {
	InputCreateTodo,
	InputDeleteTodo,
	InputReadTodos,
	InputRenameTodo,
	InputUpdateStatus,
} from '../interfaces/interfacesTodo';
import { ModelList } from '../models/modelList';
import { ModelTodo } from '../models/modelTodo';
import { ModelUser } from '../models/modelUser';
import { verifyValues } from '../utils/verifyValues';

export class ServicesTodo {
	private async validateValues(userInput: object, email: string, listName: string) {
		const hasEmptyValues = verifyValues(userInput);
		if (hasEmptyValues) return `Failure: ${hasEmptyValues}`;

		const user = await ModelUser.findOne({ email });
		if (!user) return 'Failure: User not found';

		const list = await ModelList.findOne({ email, listName });
		if (!list) return 'Failure: List not found';
	}

	async createTodo(createTodo: InputCreateTodo) {
		try {
			const { email, id, listName, task } = createTodo;

			const error = await this.validateValues(createTodo, email, listName);
			if (error) throw new Error(error);

			const sameId = await ModelTodo.findOne({ email, listName, id });
			if (sameId) throw new Error('Failure: Todo with same ID');

			const todo = new ModelTodo({ email, listName, id, task, status: 'next', tags: [] });
			await todo.save();

			return { message: 'Success: New task created' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async readTodos(readTodos: InputReadTodos) {
		try {
			const { email, listName } = readTodos;

			const error = await this.validateValues(readTodos, email, listName);
			if (error) throw new Error(error);

			const todos = await ModelTodo.find({ email, listName });
			return todos;
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async renameTodo(renameTodo: InputRenameTodo) {
		try {
			const { email, id, listName, newTask } = renameTodo;

			const error = await this.validateValues(renameTodo, email, listName);
			if (error) throw new Error(error);

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
			const { email, id, listName } = deleteTodo;

			const error = await this.validateValues(deleteTodo, email, listName);
			if (error) throw new Error(error);

			const todo = await ModelTodo.findOne({ id });
			if (!todo) throw new Error('Failure: Todo not found');

			await todo.deleteOne();
			return { message: 'Success: Todo deleted' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async updateStatus(updateStatus: InputUpdateStatus) {
		try {
			const { email, id, listName, newStatus } = updateStatus;

			const error = await this.validateValues(updateStatus, email, listName);
			if (error) throw new Error(error);

			const todo = await ModelTodo.findOne({ id });
			if (!todo) throw new Error('Failure: Todo not found');

			todo.status = newStatus;
			await todo.save();

			return { message: 'Success: Status updated' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}
}
