import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startDatabase } from '../../database';
import { InputCreateList } from '../../interfaces/interfacesLists';
import { InputCreateUser } from '../../interfaces/interfacesUser';
import { ModelTodo } from '../../models/modelTodo';
import { startServer } from '../../server';
import { requestCreateList } from '../__queries__/queriesLists';
import { requestCreateTodo } from '../__queries__/queriesTodos';
import { requestCreateUser } from '../__queries__/queriesUser';

const defaultUser: InputCreateUser = { name: 'userName', email: 'userEmail', password: 'userPassword' };
const defaultList: InputCreateList = { email: 'userEmail', listName: 'list01' };

describe('Create Todo', () => {
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

	it(`Can't create without values`, async () => {
		const { error } = await requestCreateTodo(url, {
			email: '',
			id: '',
			listName: '',
			task: '',
		});

		expect(error).toBe(
			'Failure: Email was not provided, ListName was not provided, Id was not provided, Task was not provided'
		);
	});

	it(`can't create a todo without a user`, async () => {
		const { error } = await requestCreateTodo(url, {
			email: 'wrong',
			id: '123',
			listName: 'list01',
			task: 'new task',
		});

		expect(error).toBe('Failure: User not found');
	});

	it(`Can't create without a list`, async () => {
		const { error } = await requestCreateTodo(url, {
			email: defaultUser.email,
			listName: 'wrong',
			id: '123',
			task: 'new task',
		});

		expect(error).toBe('Failure: List not found');
	});

	it(`Can't create with same id`, async () => {
		await requestCreateTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: '123',
			task: 'newTask',
		});

		const { error } = await requestCreateTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: '123',
			task: 'newTask',
		});

		expect(error).toBe('Failure: Todo with same ID');
	});

	it('Creates a new todo', async () => {
		const { data } = await requestCreateTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: '123',
			task: 'newTask',
		});

		expect(data?.createTodo.message).toBe('Success: New task created');

		const todos = await ModelTodo.find({});
		expect(todos.length).toBe(1);

		const properties = ['status', 'tags', 'email', 'listName', 'id', 'task'];
		properties.forEach((property) => {
			expect(todos[0]).toHaveProperty(property);
		});
	});
});
