import mongoose from 'mongoose';
import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import { startDatabase } from '../../database';
import { startServer } from '../../server';
import { ModelUser } from '../../models/modelUser';
import { requestCreateUser, requestDeleteUser } from '../__queries__/queriesUser';

describe('Delete user', () => {
	let url: string;
	const defaultUser = { email: 'email@user.com', name: 'userName', password: 'strongPassword' };

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
		await requestCreateUser(url, defaultUser);
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('delete a user', async () => {
		const { data } = await requestDeleteUser(url, defaultUser.email);
		const users = await ModelUser.find({});

		expect(data?.deleteUser.message).toMatch(/Success/);
		expect(users.length).toBe(0);
	});

	it('Throws a errors. Email not provided', async () => {
		const { errors } = await requestDeleteUser(url, '');
		expect(errors?.[0].message).toBe('Failure: Email was not provided');
	});

	it('Throws a errors. User not found', async () => {
		const { errors } = await requestDeleteUser(url, 'wrongEmail');
		expect(errors?.[0].message).toBe('Failure: User not found');
	});
});
