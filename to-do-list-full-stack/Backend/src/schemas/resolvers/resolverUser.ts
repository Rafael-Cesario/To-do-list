import { InputLogin, InputUpdateUser, InputCreateUser } from '../../interfaces/interfacesUser';
import { ServicesUser } from '../../services/servicesUser';

const servicesUser = new ServicesUser();

export const UserResolvers = {
	Query: {
		readUser: (parent: never, { email }: { email: string }) => servicesUser.readUser(email),
		login: (parent: never, { login }: { login: InputLogin }) => servicesUser.login(login),
	},

	Mutation: {
		createUser: (parent: never, { createUser }: { createUser: InputCreateUser }) => servicesUser.createUser(createUser),
		updateUser: (parent: never, { updateUser }: { updateUser: InputUpdateUser }) => servicesUser.updateUser(updateUser),
		deleteUser: (parent: never, { email }: { email: string }) => servicesUser.deleteUser(email),
	},
};
