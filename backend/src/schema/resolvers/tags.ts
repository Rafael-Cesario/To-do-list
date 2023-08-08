import { ICreateTag } from "../../interfaces/tags";
import { tagService } from "../../services/tags";

export const tagResolver = {
	Mutation: {
		createTag: (_: never, variables: ICreateTag) => tagService.createTag(variables),
	},
};
