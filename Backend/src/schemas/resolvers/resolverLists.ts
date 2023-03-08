import { InputCreateList } from '../../interfaces/interfacesLists';
import { ServiceLists } from '../../services/servicesLists';

const serviceLists = new ServiceLists();

export const ListsResolvers = {
	Mutation: {
		createList: (parent: never, { createList }: { createList: InputCreateList }) => serviceLists.createList(createList),
	},
};
