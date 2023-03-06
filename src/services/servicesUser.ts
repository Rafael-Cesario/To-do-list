/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { InputUser } from '../interfaces/interfacesUser';
import { ModelUser } from '../models/modelUser';

export class ServicesUser {
	async createUser(user: InputUser) {
		try {
			const { email, name, password } = user;
			await ModelUser.create({ email, name, password });
			return { message: 'Success: New user created' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}
}
