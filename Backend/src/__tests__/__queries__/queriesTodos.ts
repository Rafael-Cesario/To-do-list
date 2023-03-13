import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { InputCreateTodo, InputReadTodos } from '../../interfaces/interfacesTodo';

interface ResponseCreateTodo {
	createTodo: { message: string };
}

interface ResponseReadTodos {
	readTodos: { id: string; task: string; tags: string[]; status: string }[];
}

const CREATE_TODO = gql`
	mutation CreateTodo($createTodo: InputCreateTodo!) {
		createTodo(createTodo: $createTodo) {
			message
		}
	}
`;

const READ_TODOS = gql`
	query ReadTodos($readTodos: InputReadTodos!) {
		readTodos(readTodos: $readTodos) {
			id
			task
			tags
			status
		}
	}
`;

export const requestCreateTodo = async (url: string, createTodo: InputCreateTodo) => {
	const { data, errors } = await request<ResponseCreateTodo>(url).mutate(CREATE_TODO).variables({ createTodo });
	return { data, error: errors?.[0].message };
};

export const requestReadTodos = async (url: string, readTodos: InputReadTodos) => {
	const { data, errors } = await request<ResponseReadTodos>(url).query(READ_TODOS).variables({ readTodos });
	return { data, error: errors?.[0].message };
};
