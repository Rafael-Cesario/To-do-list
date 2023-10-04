import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startDatabase } from '../../database';
import { InputCreateList } from '../../interfaces/interfacesLists';
import { InputCreateUser } from '../../interfaces/interfacesUser';
import { ModelTodo } from '../../models/modelTodo';
import { startServer } from '../../server';
import { requestCreateList } from '../__queries__/queriesLists';
import { requestCreateTodo, requestRenameTodo } from '../__queries__/queriesTodos';
import { requestCreateUser } from '../__queries__/queriesUser';

const defaultUser: InputCreateUser = { name: 'userName', email: 'userEmail', password: 'userPassword' };
const defaultList: InputCreateList = { email: defaultUser.email, listName: 'list01' };

describe('Rename todo', () => {
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
		const { error } = await requestRenameTodo(url, { email: '', id: '', listName: '', newTask: '' });
		expect(error).toBe(
			'Failure: Email was not provided, ListName was not provided, Id was not provided, NewTask was not provided'
		);
	});

	it(`Don't find the user`, async () => {
		const { error } = await requestRenameTodo(url, { email: 'wrong', id: 'qwe', listName: 'qwe', newTask: 'qwe' });
		expect(error).toBe('Failure: User not found');
	});

	it(`Don't find the list`, async () => {
		const { error } = await requestRenameTodo(url, {
			email: defaultUser.email,
			id: 'qwe',
			listName: 'qwe',
			newTask: 'qwe',
		});
		expect(error).toBe('Failure: List not found');
	});

	it(`Don't find the todo`, async () => {
		const { error } = await requestRenameTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: 'qwe',
			newTask: 'qwe',
		});

		expect(error).toBe('Failure: Todo not found');
	});

	it(`Rename a todo`, async () => {
		const todoID = '123';
		const newTask = 'New task to do';

		await requestCreateTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: todoID,
			task: 'some task',
		});

		const { data } = await requestRenameTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: todoID,
			newTask,
		});

		expect(data?.renameTodo.message).toBe('Success: Task renamed');

		const todo = await ModelTodo.findOne({ email: defaultUser.email, listName: defaultList.listName, id: todoID });
		expect(todo?.task).toBe(newTask);
	});
});
