import { GraphQLError } from "graphql";
import { prisma } from "../database";

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
}

export const listServices = new ListServices();
