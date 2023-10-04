import { ICreateList, IDeleteList, IRenameList } from "../../interfaces/list";
import { listServices } from "../../services/list";

export const listResolver = {
	Query: {
		getLists: (parent: never, variables: { userID: string }) => listServices.getLists(variables),
	},

	Mutation: {
		createList: (_: never, variables: ICreateList) => listServices.createList(variables),
		renameList: (_: never, variables: IRenameList) => listServices.renameList(variables),
		deleteList: (_: never, variables: IDeleteList) => listServices.deleteList(variables),
	},
};
