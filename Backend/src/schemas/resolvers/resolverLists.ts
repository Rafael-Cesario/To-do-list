import { InputCreateList } from '../../interfaces/interfacesLists';
import { ServiceLists } from '../../services/servicesLists';

const serviceLists = new ServiceLists();

export const ListsResolvers = {
	Query: {
		readLists: (parent: never, { email }: { email: string }) => serviceLists.readLists(email),
	},

	Mutation: {
		createList: (parent: never, { createList }: { createList: InputCreateList }) => serviceLists.createList(createList),
	},
};
