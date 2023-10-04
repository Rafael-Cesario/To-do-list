/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { InputCreateList, InputDeleteList, InputRenameList } from '../interfaces/interfacesLists';
import { ModelList } from '../models/modelList';
import { ModelTodo } from '../models/modelTodo';
import { ModelUser } from '../models/modelUser';
import { verifyValues } from '../utils/verifyValues';

export class ServiceLists {
	async createList(createList: InputCreateList) {
		try {
			const { email, listName } = createList;

			const user = await ModelUser.findOne({ email });
			if (!user) throw new Error('Failure: Wrong email, user not found');

			const hasList = await ModelList.findOne({ email, listName });
			if (hasList) throw new Error('Failure: This list already exist');

			const list = new ModelList({ email, listName });
			await list.save();

			return { message: 'Success: New list created' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async readLists(email: string) {
		try {
			if (!email) throw new Error('Failure: Email was not provided');

			const user = await ModelUser.findOne({ email });
			if (!user) throw new Error('Failure: User not found');

			const userLists = await ModelList.find({ email });
			const lists = userLists.map(({ listName }) => listName);
			return { lists };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async renameList(renameList: InputRenameList) {
		try {
			const { email, newName, oldName } = renameList;

			const hasEmptyValues = verifyValues(renameList);
			if (hasEmptyValues) throw new Error(`Failure: ${hasEmptyValues}`);

			const user = await ModelUser.findOne({ email });
			if (!user) throw new Error('Failure: User not found');

			const list = await ModelList.findOne({ email, listName: oldName });
			if (!list) throw new Error('Failure: list not found');

			const todos = await ModelTodo.find({ email, listName: oldName });

			todos.forEach(async (todo) => {
				todo.listName = newName.toLowerCase();
				await todo.save();
			});

			list.listName = newName;
			await list.save();

			return { message: 'Success: List renamed' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async deleteList(deleteList: InputDeleteList) {
		try {
			const { email, listName } = deleteList;

			const hasEmptyValues = verifyValues(deleteList);
			if (hasEmptyValues) throw new Error(`Failure: ${hasEmptyValues}`);

			const user = await ModelUser.findOne({ email });
			if (!user) throw new Error('Failure: User not found');

			const list = await ModelList.findOne({ email, listName });
			if (!list) throw new Error('Failure: List not found');

			await ModelTodo.deleteMany({ email, listName });
			await list.deleteOne();

			return { message: 'Success: List deleted' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}
}
