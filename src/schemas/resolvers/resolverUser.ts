import { InputUser } from '../../interfaces/interfacesUser';

export const UserResolvers = {
	Mutation: {
		createUser: (parent: never, { user }: { user: InputUser }) => ({
			message: `Hello ${user.name}`,
		}),
	},
};
