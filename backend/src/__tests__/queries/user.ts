import gql from "graphql-tag";

class UserQueries {
	CREATE_USER = gql`
		mutation CreateUser($newUser: INewUser!) {
			createUser(newUser: $newUser) {
				message
			}
		}
	`;
}

export const userQueries = new UserQueries();
