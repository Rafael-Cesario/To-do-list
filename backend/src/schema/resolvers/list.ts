import { listServices } from "../../services/list";

export const listResolver = {
	Query: {
		getLists: (parent: never, variables: { userID: string }) => listServices.getLists(variables),
	},
};
