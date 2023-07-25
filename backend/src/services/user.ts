import { INewUser } from "../interfaces/user";
import { GraphQLError } from "graphql";
import { searchEmptyValues } from "../utils/search-empty-values";

class UserServices {
	createUser({ newUser }: INewUser) {
		const hasEmptyValues = searchEmptyValues(newUser);
		if (hasEmptyValues) throw new GraphQLError(hasEmptyValues);
	}
}

export const userServices = new UserServices();
