import { InputCreateList, InputDeleteList, InputRenameList } from '../../interfaces/interfacesLists';
import { ServiceLists } from '../../services/servicesLists';

const serviceLists = new ServiceLists();

export const ListsResolvers = {
	Query: {
		readLists: (parent: never, { email }: { email: string }) => serviceLists.readLists(email),
	},

	Mutation: {
		createList: (parent: never, { createList }: { createList: InputCreateList }) => serviceLists.createList(createList),
		renameList: (parent: never, { renameList }: { renameList: InputRenameList }) => serviceLists.renameList(renameList),
		deleteList: (parent: never, { deleteList }: { deleteList: InputDeleteList }) => serviceLists.deleteList(deleteList),
	},
};
