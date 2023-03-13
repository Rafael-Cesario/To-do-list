import { InputCreateTag } from '../../interfaces/interfacesTags';
import { ServiceTag } from '../../services/serviceTag';

const serviceTag = new ServiceTag();

export const TagsResolver = {
	Mutation: {
		createTag: (parent: never, { createTag }: { createTag: InputCreateTag }) => serviceTag.createTag(createTag),
	},
};
