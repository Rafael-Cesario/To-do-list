import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { startServer } from '../../server';
import { startDatabase } from '../../database';
import { requestCreateUser, requestLogin } from '../__queries__/queriesUser';

describe('Login', () => {
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

	it('do login', async () => {
		const { data } = await requestLogin(url, { email: defaultUser.email, password: defaultUser.password });

		expect(data?.login.token).toBeDefined();
		expect(data?.login.message).toBe('Success');
	});

	it('throws a error. email is empty', async () => {
		const { errors } = await requestLogin(url, { email: '', password: '' });
		expect(errors?.[0].message).toBe('Failure: Invalid credentials');
	});

	it('throws a error. email is wrong', async () => {
		const { errors } = await requestLogin(url, { email: 'wrong', password: defaultUser.password });
		expect(errors?.[0].message).toBe('Failure: Invalid credentials');
	});

	it('throws a error. password is wrong', async () => {
		const { errors } = await requestLogin(url, { email: defaultUser.password, password: 'wrong' });
		expect(errors?.[0].message).toBe('Failure: Invalid credentials');
	});
});
