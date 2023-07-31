import { ICreateList } from "../../interfaces/list";
import { listServices } from "../../services/list";

export const listResolver = {
	Query: {
		getLists: (parent: never, variables: { userID: string }) => listServices.getLists(variables),
	},

	Mutation: {
		createList: (_: never, variables: ICreateList) => listServices.createList(variables),
	},
};
