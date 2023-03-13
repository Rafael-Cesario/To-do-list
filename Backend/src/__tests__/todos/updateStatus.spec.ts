import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startDatabase } from '../../database';
import { InputCreateList } from '../../interfaces/interfacesLists';
import { InputCreateUser } from '../../interfaces/interfacesUser';
import { ModelTodo } from '../../models/modelTodo';
import { startServer } from '../../server';
import { requestCreateList } from '../__queries__/queriesLists';
import { requestCreateTodo, requestUpdateStatus } from '../__queries__/queriesTodos';
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

	it('has emtpy values', async () => {
		const { error } = await requestUpdateStatus(url, { email: '', id: '', listName: '', newStatus: '' });
		expect(error).toBe(
			'Failure: Email was not provided, ListName was not provided, Id was not provided, NewStatus was not provided'
		);
	});

	it(`Don't find the user`, async () => {
		const { error } = await requestUpdateStatus(url, { email: 'wrong', id: 'qwe', listName: 'qwe', newStatus: 'qwe' });
		expect(error).toBe('Failure: User not found');
	});

	it(`Don't find the list`, async () => {
		const { error } = await requestUpdateStatus(url, {
			email: defaultUser.email,
			listName: 'wrong',
			id: 'qwe',
			newStatus: 'qwe',
		});

		expect(error).toBe('Failure: List not found');
	});

	it(`Don't find the todo`, async () => {
		const { error } = await requestUpdateStatus(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: 'wrong',
			newStatus: 'qwe',
		});

		expect(error).toBe('Failure: Todo not found');
	});

	it('Change the status', async () => {
		const todoId = '123';
		const newStatus = 'done';

		await requestCreateTodo(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: todoId,
			task: 'some task',
		});

		const { data } = await requestUpdateStatus(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: todoId,
			newStatus,
		});

		expect(data?.updateStatus.message).toBe('Success: Status updated');

		const todo = await ModelTodo.findOne({ email: defaultUser.email, listName: defaultList.listName, id: todoId });
		expect(todo?.status).toBe(newStatus);
	});
});
