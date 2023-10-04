import mongoose from 'mongoose';
import { describe, expect, it, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { startDatabase } from '../../database';
import { InputCreateList } from '../../interfaces/interfacesLists';
import { InputCreateTag } from '../../interfaces/interfacesTags';
import { InputCreateTodo } from '../../interfaces/interfacesTodo';
import { InputCreateUser } from '../../interfaces/interfacesUser';
import { ModelTodo } from '../../models/modelTodo';
import { startServer } from '../../server';
import { requestCreateList } from '../__queries__/queriesLists';
import { requestCreateTag, requestDeleteTag } from '../__queries__/queriesTags';
import { requestCreateTodo } from '../__queries__/queriesTodos';
import { requestCreateUser } from '../__queries__/queriesUser';

describe('Create Tag', () => {
	let url: string;

	const defaultUser: InputCreateUser = { email: 'userEmail', name: 'userName', password: 'strongPassword' };
	const defaultList: InputCreateList = { email: defaultUser.email, listName: 'list01' };
	const defaultTodo: InputCreateTodo = { email: defaultUser.email, id: '123', listName: defaultList.listName, task: 'Dummy task' };
	const defaultTag: InputCreateTag = { email: defaultUser.email, id: defaultTodo.id, listName: defaultList.listName, tag: 'tag01' };

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
		const { error } = await requestDeleteTag(url, { email: '', listName: '', id: '', tag: '' });
		expect(error).toBe('Failure: Email was not provided, ListName was not provided, Id was not provided, Tag was not provided');
	});

	it(`Don't find the user`, async () => {
		const { error } = await requestDeleteTag(url, { email: 'wrong', listName: 'qwe', id: 'qwe', tag: 'qwe' });
		expect(error).toBe('Failure: User not found');
	});

	it(`Dont't find the list`, async () => {
		const { error } = await requestDeleteTag(url, { email: defaultUser.email, listName: 'wrong', id: 'qwe', tag: 'qwe' });
		expect(error).toBe('Failure: List not found');
	});

	it(`Dont't find the todo`, async () => {
		const { error } = await requestDeleteTag(url, { email: defaultUser.email, listName: defaultList.listName, id: 'wrong', tag: 'qwe' });
		expect(error).toBe('Failure: Todo not found');
	});

	it(`Dont't find the tag`, async () => {
		const { error } = await requestDeleteTag(url, { email: defaultUser.email, listName: defaultList.listName, id: defaultTodo.id, tag: 'qwe' });
		expect(error).toBe('Failure: Tag not found');
	});

	it('Delete one tag', async () => {
		await requestCreateTag(url, defaultTag);

		const { data } = await requestDeleteTag(url, {
			email: defaultUser.email,
			listName: defaultList.listName,
			id: defaultTodo.id,
			tag: defaultTag.tag,
		});

		expect(data).toBe('Success: Tag deleted');

		const todo = await ModelTodo.findOne({ email: defaultUser.email, listName: defaultList.listName, id: defaultTodo.id });
		expect(todo?.tags.length).toBe(0);
	});
});
