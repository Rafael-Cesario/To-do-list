import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { startDatabase } from '../../database';
import { ModelList } from '../../models/modelList';
import { startServer } from '../../server';
import { requestCreateList, requestRenameList } from '../__queries__/queriesLists';
import { requestCreateUser } from '../__queries__/queriesUser';

describe('Rename List', () => {
	let url: string;
	const defaultUser = { email: 'userEmail', name: 'userName', password: 'password' };

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
		await requestCreateUser(url, defaultUser);
	});

	beforeEach(async () => {
		await requestCreateList(url, { email: defaultUser.email, listName: 'List01' });
	});

	afterEach(async () => {
		await ModelList.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('Has empty values', async () => {
		const { errors } = await requestRenameList(url, { email: '', oldName: '', newName: '' });
		expect(errors?.[0].message).toBe(
			'Failure: Email was not provided, OldName was not provided, NewName was not provided'
		);
	});

	it(`Doesn't find the user`, async () => {
		const { errors } = await requestRenameList(url, { email: 'wrong', oldName: 'bla', newName: 'asdf' });
		expect(errors?.[0].message).toBe('Failure: User not found');
	});

	it(`Doesn't find the list`, async () => {
		const { errors } = await requestRenameList(url, { email: defaultUser.email, oldName: 'wrong', newName: 'newName' });
		expect(errors?.[0].message).toBe('Failure: list not found');
	});

	it('Rename a list', async () => {
		const { data } = await requestRenameList(url, {
			email: defaultUser.email,
			oldName: 'list01',
			newName: 'newName',
		});
		expect(data?.renameList.message).toBe('Success: List renamed');

		const list = await ModelList.findOne({ email: defaultUser.email, listName: 'newName' });
		expect(list?.listName).toBe('newname');
	});
});
