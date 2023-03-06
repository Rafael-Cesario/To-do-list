import { InputUpdateUser, InputUser } from '../../interfaces/interfacesUser';
import { ServicesUser } from '../../services/servicesUser';

const servicesUser = new ServicesUser();

export const UserResolvers = {
	Query: {
		readUser: (parent: never, { email }: { email: string }) => servicesUser.readUser(email),
	},

	Mutation: {
		createUser: (parent: never, { user }: { user: InputUser }) => servicesUser.createUser(user),
		updateUser: (parent: never, { updateUser }: { updateUser: InputUpdateUser }) => servicesUser.updateUser(updateUser),
	},
};
