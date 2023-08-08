import { GraphQLError } from "graphql";
import { ICreateTag } from "../interfaces/tags";
import { searchEmptyValues } from "../utils/search-empty-values";
import { prisma } from "../database";

class TagService {
	async createTag({ input }: ICreateTag) {
		const emptyValues = searchEmptyValues(input);
		if (emptyValues) throw new GraphQLError("missingFields: " + emptyValues);

		input.name = input.name.toLowerCase();

		const user = await prisma.user.findUnique({ where: { id: input.userID }, include: { tags: true } });
		if (!user) throw new GraphQLError("notFound: User not found");

		const isDuplicatedName = user.tags.find((tag) => tag.name === input.name);
		if (isDuplicatedName) throw new GraphQLError("duplicated: A tag with the same name already exist");

		const newTag = await prisma.tags.create({ data: input });
		return newTag;
	}
}

export const tagService = new TagService();
