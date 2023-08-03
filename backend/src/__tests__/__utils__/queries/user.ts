import gql from "graphql-tag";

class UserQueries {
	CREATE_USER = gql`
		mutation CreateUser($newUser: INewUser!) {
			createUser(newUser: $newUser) {
				message
			}
		}
	`;

	LOGIN = gql`
		mutation Login($user: IUser!) {
			login (user: $user) {
				token, userID
			}
		}
	`;
}

export const userQueries = new UserQueries();
