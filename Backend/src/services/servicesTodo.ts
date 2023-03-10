/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { InputCreateTodo } from '../interfaces/interfacesTodo';
import { ModelTodo } from '../models/modelTodo';

export class ServicesTodo {
	async createTodo(createTodo: InputCreateTodo) {
		try {
			const { email, id, listName, task } = createTodo;

			// verify Values
			// user has to exist
			// list has to exist
			// id can't be the same

			const todo = new ModelTodo({ id, task, state: 'next', tags: [] });
			await todo.save();

			return { message: 'Success: New task created' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}
}
