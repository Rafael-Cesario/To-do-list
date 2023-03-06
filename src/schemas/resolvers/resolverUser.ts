import { InputUser } from '../../interfaces/interfacesUser';
import { ServicesUser } from '../../services/servicesUser';

const servicesUser = new ServicesUser();

export const UserResolvers = {
	Mutation: {
		createUser: (parent: never, { user }: { user: InputUser }) => servicesUser.createUser(user),
	},
};
