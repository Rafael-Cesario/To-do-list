import { GraphQLError } from "graphql";
import { ICreateTag, IUpdateTag } from "../interfaces/tags";
import { searchEmptyValues } from "../utils/search-empty-values";
import { prisma } from "../database";

class TagService {
	async createTag({ input }: ICreateTag) {
		const emptyValues = searchEmptyValues(input);
		if (emptyValues) throw new GraphQLError("missingFields: " + emptyValues);

		input.name = input.name.toLowerCase();

		const user = await prisma.user.findUnique({ where: { id: input.userID }, include: { tags: true } });
		if (!user) throw new GraphQLError("User not found");

		const isDuplicatedName = user.tags.find((tag) => tag.name === input.name);
		if (isDuplicatedName) throw new GraphQLError("duplicated: A tag with the same name already exist");

		const newTag = await prisma.tags.create({ data: input });
		return newTag;
	}

	async getTags({ userID }: { userID: string }) {
		const user = await prisma.user.findUnique({ where: { id: userID }, include: { tags: true } });
		if (!user) throw new GraphQLError("User not found");

		return user.tags;
	}

	async updateTag({ input }: IUpdateTag) {
		const emptyValues = searchEmptyValues(input);
		if (emptyValues) throw new GraphQLError("missingFields: " + emptyValues);

		const tag = await prisma.tags.findUnique({ where: { tagID: input.tagID } });
		if (!tag) throw new GraphQLError("notFound: Tag was not found");

		const newTag = prisma.tags.update({ where: { tagID: input.tagID }, data: { ...input } });
		return newTag;
	}
}

export const tagService = new TagService();
