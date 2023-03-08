/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { InputCreateList, InputDeleteList, InputRenameList } from '../interfaces/interfacesLists';
import { ModelList } from '../models/modelLists';
import { ModelUser } from '../models/modelUser';
import { verifyValues } from '../utils/verifyValues';

export class ServiceLists {
	async createList(createList: InputCreateList) {
		try {
			const { email, listName } = createList;

			const user = await ModelUser.findOne({ email });
			if (!user) throw new Error('Failure: Wrong email, user not found');

			const list = new ModelList({ email, listName });
			await list.save();

			return { message: 'Success: New list created' };
		} catch (error: any) {
			if (error.message.match(/E11000 duplicate key error/)) throw new GraphQLError('Failure: This list already exist');
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
			if (hasEmptyValues) throw new Error(hasEmptyValues);

			const user = await ModelUser.findOne({ email });
			if (!user) throw new Error('Failure: User not found');

			const list = await ModelList.findOne({ email, listName: oldName });
			if (!list) throw new Error('Failure: list not found');

			list.listName = newName;
			await list.save();

			return { message: 'Success: List renamed' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async deleteList(deleteList: InputDeleteList) {
		console.log({ deleteList });
		return { message: 'Success: List delete' };
	}
}
