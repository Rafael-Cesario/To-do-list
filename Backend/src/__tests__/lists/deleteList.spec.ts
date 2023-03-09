import mongoose from 'mongoose';
import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';
import { requestCreateList, requestDeleteList } from '../__queries__/queriesLists';
import { requestCreateUser } from '../__queries__/queriesUser';
import { ModelList } from '../../models/modelLists';
import { startDatabase } from '../../database';
import { startServer } from '../../server';

describe('Delete List', () => {
	let url: string;
	const defaultUser = { email: 'userEmail', name: 'userName', password: 'password' };

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
		await requestCreateUser(url, defaultUser);
	});

	afterEach(async () => {
		await ModelList.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('Has empty values', async () => {
		const { errors } = await requestDeleteList(url, { email: '', listName: '' });
		expect(errors?.[0].message).toBe('Failure: ListName was not provided, Email was not provided');
	});

	it(`Didn't find the user`, async () => {
		const { errors } = await requestDeleteList(url, { email: 'wrongEmail', listName: 'list01' });
		expect(errors?.[0].message).toBe('Failure: User not found');
	});

	it(`Didn't find the list`, async () => {
		const { errors } = await requestDeleteList(url, { email: defaultUser.email, listName: 'wrongListName' });
		expect(errors?.[0].message).toBe('Failure: List not found');
	});

	it(`Delete a list`, async () => {
		const listName = 'list01';
		await requestCreateList(url, { email: defaultUser.email, listName });
		const { data } = await requestDeleteList(url, { email: defaultUser.email, listName });
		expect(data?.deleteList.message).toBe('Success: List deleted');

		const lists = await ModelList.find({ email: defaultUser.email });
		expect(lists.length).toBe(0);
	});
});
