import { INewUser } from "../../interfaces/user";
import { userServices } from "../../services/user";

export const userResolver = {
	Mutation: {
		createUser: (parent: never, variables: INewUser) => userServices.createUser(variables),
	},
};
