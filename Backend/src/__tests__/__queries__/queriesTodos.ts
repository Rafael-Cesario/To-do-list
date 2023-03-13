import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { InputCreateTodo, InputReadTodos, InputRenameTodo } from '../../interfaces/interfacesTodo';

interface ResponseCreateTodo {
	createTodo: { message: string };
}

interface ResponseReadTodos {
	readTodos: { id: string; task: string; tags: string[]; status: string }[];
}

interface ResponseRenameTodo {
	renameTodo: { message: string };
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

const RENAME_TODO = gql`
	mutation RenameTodo($renameTodo: InputRenameTodo!) {
		renameTodo(renameTodo: $renameTodo) {
			message
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

export const requestRenameTodo = async (url: string, renameTodo: InputRenameTodo) => {
	const { data, errors } = await request<ResponseRenameTodo>(url).mutate(RENAME_TODO).variables({ renameTodo });
	return { data, error: errors?.[0].message };
};
