import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { InputCreateUser, InputUpdateUser } from '../../interfaces/interfacesUser';

interface ResponseCreateUser {
	createUser: { message: string };
}

interface ResponseReadUser {
	readUser: {
		email: string;
		name: string;
		password: string;
	};
}

interface ResponseUpdateUser {
	updateUser: { message: string };
}

export const CREATE_USER = gql`
	mutation CreateUser($createUser: InputCreateUser!) {
		createUser(createUser: $createUser) {
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

export const requestCreateUser = async (url: string, variables: InputCreateUser) => {
	const { data, errors } = await request<ResponseCreateUser>(url)
		.mutate(CREATE_USER)
		.variables({ createUser: variables });
	return { data, errors };
};

export const requestReadUser = async (url: string, email: string) => {
	const { data, errors } = await request<ResponseReadUser>(url).mutate(READ_USER).variables({ email });
	return { data, errors };
};

export const requestUpdateUser = async (url: string, variables: InputUpdateUser) => {
	const { data, errors } = await request<ResponseUpdateUser>(url)
		.mutate(UPDATE_USER)
		.variables({ updateUser: variables });

	return { data, errors };
};
