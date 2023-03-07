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
