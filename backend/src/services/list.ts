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
		console.log({ input });
	}
}

export const listServices = new ListServices();
