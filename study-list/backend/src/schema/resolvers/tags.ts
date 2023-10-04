import { ICreateTag, IDeleteTag, IUpdateTag } from "../../interfaces/tags";
import { tagService } from "../../services/tags";

export const tagResolver = {
	Query: {
		getTags: (_: never, variables: { userID: string }) => tagService.getTags(variables),
	},

	Mutation: {
		createTag: (_: never, variables: ICreateTag) => tagService.createTag(variables),
		updateTag: (_: never, variables: IUpdateTag) => tagService.updateTag(variables),
		deleteTag: (_: never, variables: IDeleteTag) => tagService.deleteTag(variables),
	},
};
