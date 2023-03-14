import mongoose from 'mongoose';
import { describe, expect, it, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { startDatabase } from '../../database';
import { InputCreateList } from '../../interfaces/interfacesLists';
import { InputCreateTodo } from '../../interfaces/interfacesTodo';
import { InputCreateUser } from '../../interfaces/interfacesUser';
import { ModelTodo } from '../../models/modelTodo';
import { startServer } from '../../server';
import { requestCreateList } from '../__queries__/queriesLists';
import { requestCreateTag } from '../__queries__/queriesTags';
import { requestCreateTodo } from '../__queries__/queriesTodos';
import { requestCreateUser } from '../__queries__/queriesUser';

describe('Create Tag', () => {
	let url: string;

	const defaultUser: InputCreateUser = { email: 'userEmail', name: 'userName', password: 'strongPassword' };
	const defaultList: InputCreateList = { email: defaultUser.email, listName: 'list01' };
	const defaultTodo: InputCreateTodo = { email: defaultUser.email, id: '123', listName: defaultList.listName, task: 'Dummy task' };

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();

		await requestCreateUser(url, defaultUser);
		await requestCreateList(url, defaultList);
	});

	beforeEach(async () => {
		await requestCreateTodo(url, defaultTodo);
	});

	afterEach(async () => {
		await ModelTodo.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it(`Has empty values`, async () => {
		const { error } = await requestCreateTag(url, { email: '', listName: '', id: '', tag: '' });
		expect(error).toBe('Failure: Email was not provided, ListName was not provided, Id was not provided, Tag was not provided');
	});

	it(`Don't find the user`, async () => {
		const { error } = await requestCreateTag(url, { email: 'wrong', listName: 'qwe', id: 'qwe', tag: 'qwe' });
		expect(error).toBe('Failure: User not found');
	});

	it(`Dont't find the list`, async () => {
		const { error } = await requestCreateTag(url, { email: defaultUser.email, listName: 'wrong', id: 'qwe', tag: 'qwe' });
		expect(error).toBe('Failure: List not found');
	});

	it(`Dont't find the todo`, async () => {
		const { error } = await requestCreateTag(url, { email: defaultUser.email, listName: defaultList.listName, id: 'wrong', tag: 'qwe' });
		expect(error).toBe('Failure: Todo not found');
	});

	it(`Already has tag`, async () => {
		await requestCreateTag(url, { email: defaultUser.email, listName: defaultList.listName, id: defaultTodo.id, tag: 'new tag' });
		const { error } = await requestCreateTag(url, { email: defaultUser.email, listName: defaultList.listName, id: defaultTodo.id, tag: 'NEW TAG' });
		expect(error).toBe('Failure: Duplicated tag');
	});

	it('Crate a new tag', async () => {
		const { data } = await requestCreateTag(url, { email: defaultUser.email, listName: defaultList.listName, id: defaultTodo.id, tag: 'new tag' });
		expect(data).toBe('Success: New tag created');

		const todo = await ModelTodo.findOne({ email: defaultUser.email, listName: defaultList.listName, id: defaultTodo.id });
		const tags = todo?.tags;
		expect(tags?.length).toBe(1);
	});
});
