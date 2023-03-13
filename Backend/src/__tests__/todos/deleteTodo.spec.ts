import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startDatabase } from '../../database';
import { InputCreateList } from '../../interfaces/interfacesLists';
import { InputCreateUser } from '../../interfaces/interfacesUser';
import { ModelTodo } from '../../models/modelTodo';
import { startServer } from '../../server';
import { requestCreateList } from '../__queries__/queriesLists';
import { requestCreateTodo, requestDeleteTodo } from '../__queries__/queriesTodos';
import { requestCreateUser } from '../__queries__/queriesUser';

const defaultUser: InputCreateUser = { name: 'userName', email: 'userEmail', password: 'userPassword' };
const defaultList: InputCreateList = { email: defaultUser.email, listName: 'list01' };

describe('Delete todo', () => {
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

	it(`Has empty values`, async () => {
		const { error } = await requestDeleteTodo(url, { email: '', id: '', listName: '' });
		expect(error).toBe('Failure: Email was not provided, ListName was not provided, Id was not provided');
	});

	it(`Don't find the user`, async () => {
		const { error } = await requestDeleteTodo(url, { email: 'wrong', id: 'qwe', listName: 'qwe' });
		expect(error).toBe('Failure: User not found');
	});

	it(`Don't find the list`, async () => {
		const { error } = await requestDeleteTodo(url, { email: defaultUser.email, id: 'qwe', listName: 'wrong' });
		expect(error).toBe('Failure: List not found');
	});

	it(`Don't find the todo`, async () => {
		const { error } = await requestDeleteTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: 'wrong',
		});

		expect(error).toBe('Failure: Todo not found');
	});

	it(`Delete the todo`, async () => {
		const todoId = '123';

		await requestCreateTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: todoId,
			task: 'some task',
		});

		let todos = await ModelTodo.find({ email: defaultUser.email, listName: defaultList.listName });
		expect(todos?.length).toBe(1);

		const { data } = await requestDeleteTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: todoId,
		});

		expect(data?.deleteTodo.message).toBe('Success: Todo deleted');

		todos = await ModelTodo.find({ email: defaultUser.email, listName: defaultList.listName });
		expect(todos?.length).toBe(0);
	});
});
