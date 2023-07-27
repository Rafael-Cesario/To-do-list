import { INewUser } from "../interfaces/user";
import { GraphQLError } from "graphql";
import { searchEmptyValues } from "../utils/search-empty-values";
import { encryptPassword } from "../utils/crypt";
import { prisma } from "../database";
import { errorsMap } from "../utils/errors-map";

class UserServices {
	async createUser({ newUser }: INewUser) {
		const hasEmptyValues = searchEmptyValues(newUser);
		if (hasEmptyValues) throw new GraphQLError(hasEmptyValues);

		const isDuplicatedUser = await prisma.user.findUnique({ where: { email: newUser.email } });
		if (isDuplicatedUser) throw new GraphQLError(errorsMap.user.duplicated + "A user with the same email already exist");

		newUser.password = encryptPassword(newUser.password);
		newUser.email = newUser.email.toLowerCase();
		await prisma.user.create({ data: newUser });

		return { message: "Success: A new user was created" };
	}
}

export const userServices = new UserServices();
