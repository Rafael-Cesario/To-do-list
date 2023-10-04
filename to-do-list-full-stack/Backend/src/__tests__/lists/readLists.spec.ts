import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { startDatabase } from '../../database';
import { startServer } from '../../server';
import { requestCreateList, requestReadLists } from '../__queries__/queriesLists';
import { requestCreateUser } from '../__queries__/queriesUser';

describe('ReadLists', () => {
	let url: string;
	const defaultUser = { email: 'userEmail', name: 'userName', password: 'password' };

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();

		await requestCreateUser(url, defaultUser);
		await requestCreateList(url, { email: defaultUser.email, listName: 'List01' });
		await requestCreateList(url, { email: defaultUser.email, listName: 'List02' });
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('Returns a string array with all lists', async () => {
		const { data } = await requestReadLists(url, defaultUser.email);
		expect(data?.readLists.lists.length).toBe(2);
		expect(data?.readLists.lists).toEqual(['list01', 'list02']);
	});

	it('Throws a errors. Email was not provided', async () => {
		const { errors } = await requestReadLists(url, '');
		expect(errors?.[0].message).toBe('Failure: Email was not provided');
	});

	it('Not found the user', async () => {
		const { errors } = await requestReadLists(url, 'wrong');
		expect(errors?.[0].message).toBe('Failure: User not found');
	});
});
