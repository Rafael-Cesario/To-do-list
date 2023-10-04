import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startDatabase } from '../../database';
import { InputCreateList } from '../../interfaces/interfacesLists';
import { InputCreateUser } from '../../interfaces/interfacesUser';
import { ModelTodo } from '../../models/modelTodo';
import { startServer } from '../../server';
import { requestCreateList } from '../__queries__/queriesLists';
import { requestCreateTodo, requestReadTodos } from '../__queries__/queriesTodos';
import { requestCreateUser } from '../__queries__/queriesUser';

const defaultUser: InputCreateUser = { name: 'userName', email: 'userEmail', password: 'userPassword' };
const defaultList: InputCreateList = { email: defaultUser.email, listName: 'list01' };

const createTodos = async (url: string, todosCount: number) => {
	let x = 0;

	while (x < todosCount) {
		await requestCreateTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: String(x),
			task: 'task' + x,
		});

		x++;
	}
};

describe('Read Todos', () => {
	let url: string;

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();

		await requestCreateUser(url, defaultUser);
		await requestCreateList(url, defaultList);
	});

	afterEach(async () => {
		await ModelTodo.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it(`Can't read without inputs`, async () => {
		const { error } = await requestReadTodos(url, { email: '', listName: '' });
		expect(error).toBe('Failure: Email was not provided, ListName was not provided');
	});

	it(`Can't read without a user`, async () => {
		const { error } = await requestReadTodos(url, { email: 'wrong', listName: 'list01' });
		expect(error).toBe('Failure: User not found');
	});

	it(`Can't read without a list`, async () => {
		const { error } = await requestReadTodos(url, { email: defaultUser.email, listName: 'wrong' });
		expect(error).toBe('Failure: List not found');
	});

	it(`Return all todos for a user`, async () => {
		const todosCount = 5;
		await createTodos(url, todosCount);

		const { data } = await requestReadTodos(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
		});

		expect(data?.readTodos.length).toBe(todosCount);
		expect(data?.readTodos[0]).toEqual({
			id: '0',
			task: 'task0',
			status: 'next',
			tags: [],
		});
	});
});
