import { gql } from "@apollo/client";

class UserQueries {
	readonly CREATE_USER = gql`
		mutation CreateUser($createUserData: CreateUserInput!) {
			createUser(createUserData: $createUserData) {
				createdAt
				email
				name
				id
			}
		}
	`;
}

export const userQueries = new UserQueries();
