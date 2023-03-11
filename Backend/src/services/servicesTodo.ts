/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { InputCreateTodo } from '../interfaces/interfacesTodo';
import { ModelList } from '../models/modelList';
import { ModelTodo } from '../models/modelTodo';
import { ModelUser } from '../models/modelUser';
import { verifyValues } from '../utils/verifyValues';

export class ServicesTodo {
	async createTodo(createTodo: InputCreateTodo) {
		try {
			const { email, id, listName, task } = createTodo;

			const hasEmptyValues = verifyValues(createTodo);
			if (hasEmptyValues) throw new Error(`Failure: ${hasEmptyValues}`);

			const user = await ModelUser.findOne({ email });
			if (!user) throw new Error('Failure: User not found');

			const list = await ModelList.findOne({ email, listName });
			if (!list) throw new Error('Failure: List not found');

			const sameId = await ModelTodo.findOne({ email, listName, id });
			if (sameId) throw new Error('Failure: Todo with same ID');

			const todo = new ModelTodo({ email, listName, id, task, state: 'next', tags: [] });
			await todo.save();

			return { message: 'Success: New task created' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}
}
