import gql from 'graphql-tag';

export const CREATE_USER = gql`
	mutation CreateUser($user: InputUser!) {
		createUser(user: $user) {
			message
		}
	}
`;

export const READ_USER = gql`
	query ReadUser($email: String!) {
		readUser(email: $email) {
			email
			name
			password
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser($updateUser: InputUpdateUser!) {
		updateUser(updateUser: $updateUser) {
			message
		}
	}
`;

export const DELETE_USER = gql`
	mutation DeleteUser($email: String!) {
		deleteUser(email: $email) {
			message
		}
	}
`;

export const LOGIN = gql`
	query Login($login: InputLogin!) {
		login(login: $login) {
			token
			message
		}
	}
`;
