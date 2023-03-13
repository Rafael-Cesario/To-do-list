/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { InputCreateTag } from '../interfaces/interfacesTags';

export class ServiceTag {
	async createTag(createTag: InputCreateTag) {
		try {
			console.log({ createTag });
			return { message: 'New tag Created' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}
}
