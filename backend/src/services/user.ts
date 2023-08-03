import { ILogin, INewUser } from "../interfaces/user";
import { GraphQLError } from "graphql";
import { searchEmptyValues } from "../utils/search-empty-values";
import { decryptPassword, encryptPassword } from "../utils/crypt";
import { prisma } from "../database";
import { errorsMap } from "../utils/errors-map";
import { generateToken } from "../utils/token";

class UserServices {
	async createUser({ newUser }: INewUser) {
		const hasEmptyValues = searchEmptyValues(newUser);
		if (hasEmptyValues) throw new GraphQLError(hasEmptyValues);

		const isDuplicatedUser = await prisma.user.findUnique({ where: { email: newUser.email.toLowerCase() } });
		if (isDuplicatedUser) throw new GraphQLError(errorsMap.user.duplicated + "A user with the same email already exist");

		newUser.password = encryptPassword(newUser.password);
		newUser.email = newUser.email.toLowerCase();

		await prisma.user.create({ data: newUser });

		return { message: "Success: A new user was created" };
	}

	async login({ user }: ILogin) {
		const hasEmptyValues = searchEmptyValues(user);
		if (hasEmptyValues) throw new GraphQLError(hasEmptyValues);

		const userDB = await prisma.user.findUnique({ where: { email: user.email.toLowerCase() } });
		if (!userDB) throw new GraphQLError("invalidCredentials: Wrong email or password");

		const samePassword = decryptPassword(user.password, userDB.password);
		if (!samePassword) throw new GraphQLError("invalidCredentials: Wrong email or password");

		const token = generateToken(user.email);
		return { token, userID: userDB.email };
	}
}

export const userServices = new UserServices();
