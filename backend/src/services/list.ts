import { searchEmptyValues } from "../utils/search-empty-values";
import { GraphQLError } from "graphql";
import { prisma } from "../database";
import { ICreateList } from "../interfaces/list";

class ListServices {
	async getLists({ userID }: { userID: string }) {
		if (!userID) throw new GraphQLError("missingFields: userId is required");

		const user = await prisma.user.findUnique({
			where: { id: userID },
			select: { lists: true },
		});

		if (!user) throw new GraphQLError("notFound: User not found");

		return user.lists;
	}

	async createList({ input }: ICreateList) {
		const emptyValues = searchEmptyValues(input);
		if (emptyValues) throw new GraphQLError("missingFields: " + emptyValues);

		const user = await prisma.user.findUnique({ where: { id: input.userID }, include: { lists: true } });
		if (!user) throw new GraphQLError("notFound: User not found");

		input.name = input.name.toLowerCase();

		const hasList = user.lists.findIndex((list) => list.name === input.name);
		if (hasList > -1) throw new GraphQLError("duplicated: This list already exist");

		const newList = await prisma.list.create({ data: { ...input } });
		return newList;
	}
}

export const listServices = new ListServices();
