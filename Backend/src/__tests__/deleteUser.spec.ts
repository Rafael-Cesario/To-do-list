import request from 'supertest-graphql';
import mongoose from 'mongoose';
import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import { startDatabase } from '../database';
import { startServer } from '../server';
import { CREATE_USER, DELETE_USER } from './__queries__/queriesUser';
import { ModelUser } from '../models/modelUser';

interface Response {
	deleteUser: { message: string };
}

describe('Delete user', () => {
	let url: string;
	const user = { email: 'userEmail', name: 'name', password: 'password' };

	const createUser = async () => {
		await request(url).mutate(CREATE_USER).variables({ user });
	};

	const deleteUser = async (email?: string) => {
		const { data, errors } = await request<Response>(url)
			.mutate(DELETE_USER)
			.variables({ email: email ?? user.email });
		return { data, errors };
	};

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('delete a user', async () => {
		await createUser();
		const { data } = await deleteUser();
		const users = await ModelUser.find({});

		expect(data?.deleteUser.message).toMatch(/Success/);
		expect(users.length).toBe(0);
	});

	it('Throws a errors. Email not provided', async () => {
		const { errors } = await deleteUser('');
		expect(errors?.[0].message).toBe('Failure: Email was not provided');
	});

	it('Throws a errors. User not found', async () => {
		const { errors } = await deleteUser('notFound');
		expect(errors?.[0].message).toBe('Failure: User not found');
	});
});
