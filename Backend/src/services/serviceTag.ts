/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { InputCreateTag } from '../interfaces/interfacesTags';
import { ModelList } from '../models/modelList';
import { ModelTodo } from '../models/modelTodo';
import { ModelUser } from '../models/modelUser';
import { verifyValues } from '../utils/verifyValues';

export class ServiceTag {
	private async validateValues(userInputs: object, email: string, listName: string) {
		const hasEmptyValues = verifyValues(userInputs);
		if (hasEmptyValues) return `Failure: ${hasEmptyValues}`;

		const user = await ModelUser.findOne({ email });
		if (!user) return `Failure: User not found`;

		const list = await ModelList.findOne({ email, listName });
		if (!list) return `Failure: List not found`;
	}

	async createTag(createTag: InputCreateTag) {
		try {
			const { email, id, listName, tag } = createTag;

			const error = await this.validateValues(createTag, email, listName);
			if (error) throw new Error(error);

			const todo = await ModelTodo.findOne({ email, listName, id });
			if (!todo) return `Failure: Todo not found`;

			const hasTag = todo.tags.includes(tag.toLowerCase());
			if (hasTag) throw new Error('Failure: Duplicated tag');

			todo.tags.push(tag);
			await todo.save();

			return { message: 'Success: New tag Created' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}
}
