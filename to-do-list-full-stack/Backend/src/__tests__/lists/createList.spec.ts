import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startDatabase } from '../../database';
import { ModelList } from '../../models/modelList';
import { startServer } from '../../server';
import { requestCreateList } from '../__queries__/queriesLists';
import { requestCreateUser } from '../__queries__/queriesUser';

describe('Create list', () => {
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

	it('Creates a new list', async () => {
		const { data } = await requestCreateList(url, { email: defaultUser.email, listName: 'list10101010' });
		expect(data?.createList.message).toMatch(/Success/);

		const lists = await ModelList.find({ email: defaultUser.email });
		expect(lists.length).toBe(1);
	});

	it("can't create a new list with non existent user", async () => {
		const { errors } = await requestCreateList(url, { email: 'nonExistent', listName: 'list01' });
		expect(errors?.[0].message).toBe('Failure: Wrong email, user not found');
	});

	it("can't create a list without a name", async () => {
		const { errors } = await requestCreateList(url, { email: defaultUser.email, listName: '' });
		expect(errors?.[0].message).toMatch(/ListName is required/);
	});

	it("can't create a list that already exist", async () => {
		await requestCreateList(url, { email: defaultUser.email, listName: 'list01' });
		const { errors } = await requestCreateList(url, { email: defaultUser.email, listName: 'list01' });
		expect(errors?.[0].message).toBe('Failure: This list already exist');
	});
});
