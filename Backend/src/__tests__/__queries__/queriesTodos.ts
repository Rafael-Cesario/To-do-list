import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { InputCreateTodo } from '../../interfaces/interfacesTodo';

interface ResponseCreateTodo {
	createTodo: { message: string };
}

const CREATE_TODO = gql`
	mutation CreateTodo($createTodo: InputCreateTodo!) {
		createTodo(createTodo: $createTodo) {
			message
		}
	}
`;

export const requestCreateTodo = async (url: string, createTodo: InputCreateTodo) => {
	const { data, errors } = await request<ResponseCreateTodo>(url).mutate(CREATE_TODO).variables({ createTodo });
	return { data, error: errors?.[0].message };
};
