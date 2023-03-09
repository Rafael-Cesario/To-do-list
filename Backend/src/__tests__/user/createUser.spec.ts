import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startServer } from '../../server';
import { startDatabase } from '../../database';
import { ModelUser } from '../../models/modelUser';
import { requestCreateUser } from '../__queries__/queriesUser';

const defaultUser = { email: 'email@user.com', name: 'userName', password: 'strongPassword' };

describe('Create User', () => {
	let url: string;

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
	});

	afterEach(async () => {
		await ModelUser.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('Creates a new user', async () => {
		const { data } = await requestCreateUser(url, defaultUser);
		expect(data?.createUser.message).toBe('Success: New user created');
	});

	it('Throws a error. empty variables', async () => {
		const { errors } = await requestCreateUser(url, { email: '', name: '', password: '' });

		expect(errors?.[0].message).toMatch(
			/name: Name is required, email: Email is required, password: Password is required/
		);
	});

	it('Throws a error. Email is duplicated', async () => {
		await requestCreateUser(url, defaultUser);
		const { errors } = await requestCreateUser(url, defaultUser);

		expect(errors?.[0].message).toMatch(/This user already exist/i);
	});

	it('Throws a error. Name is to long', async () => {
		const { errors } = await requestCreateUser(url, {
			email: 'email',
			name: 'this name is way to long',
			password: 'password',
		});

		expect(errors?.[0].message).toMatch(/longer than the maximum allowed length/);
	});

	it('hash the password', async () => {
		await requestCreateUser(url, defaultUser);
		const user = await ModelUser.findOne({ email: defaultUser.email });
		expect(user?.password).not.toBe(defaultUser.password);
	});

	it('saves email as lowerCase', async () => {
		await requestCreateUser(url, { email: 'USEREMAIL', name: 'name', password: 'password' });
		const user = await ModelUser.findOne({ email: 'useremail' });
		expect(user?.email).toBe('useremail');
	});
});
