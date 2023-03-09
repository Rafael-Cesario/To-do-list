import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { startDatabase } from '../../database';
import { ModelList } from '../../models/modelLists';
import { startServer } from '../../server';
import { requestCreateList } from '../__queries__/queriesLists';
import { requestCreateUser } from '../__queries__/queriesUser';

describe('Create list', () => {
	let url: string;
	const user = { email: 'userEmail', name: 'userName', password: 'password' };

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
		await requestCreateUser(url, user);
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('Creates a new list', async () => {
		const { data } = await requestCreateList(url, { email: user.email, listName: 'list10101010' });
		expect(data?.createList.message).toMatch(/Success/);

		const lists = await ModelList.find({ email: user.email });
		expect(lists.length).toBe(1);
	});

	it.todo("can't create a new list with non existent user");
});
