import { InputCreateTag, InputDeleteTag, InputUpdateTag } from '../../interfaces/interfacesTags';
import { ServiceTag } from '../../services/serviceTag';

const serviceTag = new ServiceTag();

export const TagsResolver = {
	Mutation: {
		createTag: (parent: never, { createTag }: { createTag: InputCreateTag }) => serviceTag.createTag(createTag),
		updateTag: (parent: never, { updateTag }: { updateTag: InputUpdateTag }) => serviceTag.updateTag(updateTag),
		deleteTag: (parent: never, { deleteTag }: { deleteTag: InputDeleteTag }) => serviceTag.deleteTag(deleteTag),
	},
};
