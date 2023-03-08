import request from 'supertest-graphql';
import mongoose from 'mongoose';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { startServer } from '../../server';
import { startDatabase } from '../../database';
import { CREATE_USER, READ_USER } from '../__queries__/queriesUser';

describe('Read user', () => {
	let url: string;

	const user = { email: 'userEmail', name: 'name', password: 'password' };

	const requestReadUser = async (email = 'userEmail') => {
		type Response = { readUser: { email: string; name: string; password: string } };
		const { data, errors } = await request<Response>(url).query(READ_USER).variables({ email });
		return { data, errors };
	};

	const createUser = async () => {
		await request(url)
			.mutate(CREATE_USER)
			.variables({ user: { ...user } });
	};

	beforeAll(async () => {
		url = await startServer(0);
		await startDatabase();
		await createUser();
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('returns a user and omit the password', async () => {
		const { data } = await requestReadUser();
		expect(data?.readUser).toEqual({ email: user.email.toLowerCase(), name: user.name, password: '' });
	});

	it('throws a error. empty variables', async () => {
		const { errors } = await requestReadUser('');
		expect(errors?.[0].message).toBe('Failure: Email was not provided');
	});

	it(`Didn't find the user`, async () => {
		const { errors } = await requestReadUser('nonExistent');
		expect(errors?.[0].message).toBe('Failure: User not found');
	});
});
