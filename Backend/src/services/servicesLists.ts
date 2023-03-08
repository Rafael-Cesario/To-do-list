/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { InputCreateList } from '../interfaces/interfacesLists';
import { ModelUser } from '../models/modelUser';

export class ServiceLists {
	async createList(createList: InputCreateList) {
		try {
			const { email, listName } = createList;

			const user = await ModelUser.findOne({ email });
			if (!user) throw new Error('Failure: Wrong email, user not found');

			return { message: 'Success: New list created' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}
}
