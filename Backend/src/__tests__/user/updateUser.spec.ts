/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from 'mongoose';
import { startServer } from '../../server';
import { startDatabase } from '../../database';
import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect } from 'vitest';
import { ModelUser } from '../../models/modelUser';
import { comparePasswords } from '../../utils/encryptPassword';
import { requestCreateUser, requestUpdateUser } from '../__queries__/queriesUser';

describe('Update User', () => {
	let url: string;
	const defaultUser = { email: 'email@user.com', name: 'userName', password: 'strongPassword' };

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
	});

	beforeEach(async () => {
		await requestCreateUser(url, defaultUser);
	});

	afterEach(async () => {
		await ModelUser.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('Throws a error. empty email', async () => {
		const { errors } = await requestUpdateUser(url, {
			email: '',
			update: defaultUser,
		});

		expect(errors?.[0].message).toBe('Failure: Email was not provided');
	});

	it('Throws a error. can not update user to empty values', async () => {
		const { errors } = await requestUpdateUser(url, {
			email: defaultUser.email,
			update: { email: '', name: '', password: '' },
		});

		expect(errors?.[0].message).toBe(
			'Failure: Name was not provided, Email was not provided, Password was not provided'
		);
	});

	it('Throws a error. user not found', async () => {
		const { errors } = await requestUpdateUser(url, { email: 'wrongEmail', update: { ...defaultUser } });
		expect(errors?.[0].message).toBe('Failure: User not found');
	});

	it('Update user', async () => {
		const { data } = await requestUpdateUser(url, {
			email: defaultUser.email,
			update: { name: 'new', email: 'newEmail', password: 'new' },
		});
		const user = await ModelUser.findOne({ email: 'newEmail' });

		expect(user?.email).toBe('newemail');
		expect(user?.name).toBe('new');

		const samePassword = comparePasswords('new', user!.password);
		expect(samePassword).toBe(true);

		expect(data?.updateUser.message).toBe('Success: User has been updated');
	});
});
