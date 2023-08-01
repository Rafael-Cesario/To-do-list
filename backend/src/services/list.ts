import { searchEmptyValues } from "../utils/search-empty-values";
import { GraphQLError } from "graphql";
import { prisma } from "../database";
import { ICreateList, IDeleteList, IRenameList } from "../interfaces/list";

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

	async renameList({ input }: IRenameList) {
		const emptyValues = searchEmptyValues(input);
		if (emptyValues) throw new GraphQLError("missingFields: " + emptyValues);

		const user = await prisma.user.findUnique({ where: { id: input.userID }, include: { lists: true } });
		if (!user) throw new GraphQLError("notFound: User not found");

		input.newName = input.newName.toLowerCase();

		const listIndexByName = user.lists.findIndex((list) => list.name === input.newName);
		if (listIndexByName > -1) throw new GraphQLError("duplicated: This list already exist");

		const listIndexById = user.lists.findIndex((list) => list.listID === input.listID);
		if (listIndexById < 0) throw new GraphQLError("notFound: List not found");

		const newList = await prisma.list.update({
			where: { listID: input.listID },
			data: { name: input.newName },
		});

		return newList;
	}

	async deleteList({ input }: IDeleteList) {
		const list = await prisma.list.findUnique({ where: { listID: input.listID } });
		if (!list) throw new GraphQLError("notFound: List not found");

		await prisma.list.delete({ where: { listID: input.listID } });
		return "success: List deleted";
	}
}

export const listServices = new ListServices();
