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
import { requestCreateTag, requestUpdateTag } from '../__queries__/queriesTags';
import { requestCreateTodo } from '../__queries__/queriesTodos';
import { requestCreateUser } from '../__queries__/queriesUser';

describe('Update Tag', () => {
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

	it('Has empty values', async () => {
		const { error } = await requestUpdateTag(url, { email: '', id: 'qwe', listName: 'qwe', newTag: 'qwe', oldTag: 'qwe' });
		expect(error).toBe('Failure: Email was not provided');
	});

	it(`Don't find the user`, async () => {
		const { error } = await requestUpdateTag(url, { email: 'wrong', id: 'qwe', listName: 'qwe', newTag: 'qwe', oldTag: 'qwe' });
		expect(error).toBe('Failure: User not found');
	});

	it(`Don't find the list`, async () => {
		const { error } = await requestUpdateTag(url, { email: defaultUser.email, id: 'qwe', listName: 'wrong', newTag: 'qwe', oldTag: 'qwe' });
		expect(error).toBe('Failure: List not found');
	});

	it(`Don't find the todo`, async () => {
		const { error } = await requestUpdateTag(url, {
			email: defaultUser.email,
			id: 'qwe',
			listName: defaultList.listName,
			newTag: 'qwe',
			oldTag: 'qwe',
		});
		expect(error).toBe('Failure: Todo not found');
	});

	it(`Don't find the tag`, async () => {
		const { error } = await requestUpdateTag(url, {
			email: defaultUser.email,
			id: defaultTodo.id,
			listName: defaultList.listName,
			newTag: 'new',
			oldTag: 'old',
		});
		expect(error).toBe('Failure: Tag not found');
	});

	it(`try to update tag to one that already exist`, async () => {
		await requestCreateTag(url, defaultTag);
		await requestCreateTag(url, { ...defaultTag, tag: 'tag02' });

		const { error } = await requestUpdateTag(url, {
			email: defaultUser.email,
			id: defaultTodo.id,
			listName: defaultList.listName,
			oldTag: defaultTag.tag,
			newTag: 'TAG02',
		});

		expect(error).toBe('Failure: Duplicated tag');
	});

	it('Update tag', async () => {
		await requestCreateTag(url, defaultTag);

		const newTag = 'New Tag';
		const { data } = await requestUpdateTag(url, {
			email: defaultUser.email,
			id: defaultTodo.id,
			listName: defaultList.listName,
			oldTag: defaultTag.tag,
			newTag,
		});

		expect(data).toBe('Success: Tag updated');

		const todo = await ModelTodo.findOne({ email: defaultUser.email, listName: defaultList.listName, id: defaultTodo.id });
		const hasTag = todo?.tags.includes(newTag.toLowerCase());
		expect(hasTag).toBe(true);
	});
});
