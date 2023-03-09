/* eslint-disable @typescript-eslint/no-non-null-assertion */
import request from 'supertest-graphql';
import mongoose from 'mongoose';
import { startServer } from '../../server';
import { startDatabase } from '../../database';
import { CREATE_USER, UPDATE_USER } from '../__queries__/queriesUser';
import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect } from 'vitest';
import { ModelUser } from '../../models/modelUser';
import { comparePasswords } from '../../utils/encryptPassword';

interface VariablesUpdateUser {
	email?: string;
	name?: string;
	password?: string;
	filter?: string;
}

interface Response {
	updateUser: { message: string };
}

describe('Update User', () => {
	let url: string;
	const createUser = { email: 'userEmail', name: 'name', password: 'password' };

	const requestCreateUser = async () => {
		await request(url).mutate(CREATE_USER).variables({ createUser });
	};

	const updateUser = async ({ email, name, password, filter }: VariablesUpdateUser) => {
		const { data, errors } = await request<Response>(url)
			.mutate(UPDATE_USER)
			.variables({
				updateUser: {
					email: filter ?? createUser.email,
					update: {
						email: email ?? '',
						name: name ?? '',
						password: password ?? '',
					},
				},
			});

		return { data, errors };
	};

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
	});

	beforeEach(async () => {
		await requestCreateUser();
	});

	afterEach(async () => {
		await ModelUser.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('Throws a error. empty email', async () => {
		const { errors } = await updateUser({ filter: '' });
		expect(errors?.[0].message).toBe('Failure: Email was not provided');
	});

	it('Throws a error. user not found', async () => {
		const { errors } = await updateUser({ filter: 'notFound' });
		expect(errors?.[0].message).toBe('Failure: User not found');
	});

	it('Update user', async () => {
		const { data } = await updateUser({ email: 'newEmail', name: 'new', password: 'new' });
		const user = await ModelUser.findOne({ email: 'newEmail' });

		expect(user?.email).toBe('newemail');
		expect(user?.name).toBe('new');

		const samePassword = comparePasswords('new', user!.password);
		expect(samePassword).toBe(true);

		expect(data?.updateUser.message).toBe('Success: User has been updated');
	});
});
