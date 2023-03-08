/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { InputCreateList } from '../interfaces/interfacesLists';
import { ModelList } from '../models/modelLists';
import { ModelUser } from '../models/modelUser';

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
}
