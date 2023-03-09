import mongoose from 'mongoose';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { startServer } from '../../server';
import { startDatabase } from '../../database';
import { requestCreateUser, requestReadUser } from '../__queries__/queriesUser';

const defaultUser = { email: 'email@user.com', name: 'userName', password: 'strongPassword' };

describe('Read user', () => {
	let url: string;

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
		await requestCreateUser(url, defaultUser);
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('returns a user and omit the password', async () => {
		const { data } = await requestReadUser(url, defaultUser.email);
		expect(data?.readUser).toEqual({ email: defaultUser.email.toLowerCase(), name: defaultUser.name, password: '' });
	});

	it('throws a error. empty variables', async () => {
		const { errors } = await requestReadUser(url, '');
		expect(errors?.[0].message).toBe('Failure: Email was not provided');
	});

	it(`Didn't find the user`, async () => {
		const { errors } = await requestReadUser(url, 'nonExistentEmail');
		expect(errors?.[0].message).toBe('Failure: User not found');
	});
});
