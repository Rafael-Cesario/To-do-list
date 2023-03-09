import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { InputCreateUser, InputLogin, InputUpdateUser } from '../../interfaces/interfacesUser';

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

interface ResponseDeleteUser {
	deleteUser: { message: string };
}

interface ResponseLogin {
	login: {
		message: string;
		token: string;
	};
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

export const requestDeleteUser = async (url: string, email: string) => {
	const { data, errors } = await request<ResponseDeleteUser>(url).mutate(DELETE_USER).variables({ email });
	return { data, errors };
};

export const requestLogin = async (url: string, variables: InputLogin) => {
	const { data, errors } = await request<ResponseLogin>(url).query(LOGIN).variables({
		login: variables,
	});

	return { data, errors };
};
