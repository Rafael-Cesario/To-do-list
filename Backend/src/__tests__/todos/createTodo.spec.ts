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
	});

	afterEach(async () => {
		await ModelTodo.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('Creates a new todo', async () => {
		await requestCreateUser(url, defaultUser);
		await requestCreateList(url, defaultList);

		const { data } = await requestCreateTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: '123',
			task: 'newTask',
		});

		expect(data?.createTodo.message).toBe('Success: New task created');

		const todos = await ModelTodo.find({});
		expect(todos.length).toBe(1);
	});
});
