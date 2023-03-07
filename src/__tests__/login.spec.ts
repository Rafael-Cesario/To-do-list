import mongoose from 'mongoose';
import request from 'supertest-graphql';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { CREATE_USER, LOGIN } from './__queries__/queriesUser';
import { startServer } from '../server';
import { startDatabase } from '../database';

interface Response {
	login: {
		message: string;
		token: string;
	};
}

describe('Login', () => {
	let url: string;
	const user = { email: 'userEmail', name: 'name', password: 'password' };

	const createUser = async () => {
		await request(url).mutate(CREATE_USER).variables({ user });
	};

	const login = async ({ email, password }: { email?: string; password?: string }) => {
		const { data, errors } = await request<Response>(url)
			.query(LOGIN)
			.variables({ login: { email: email ?? user.email, password: password ?? user.password } });

		return { data, errors };
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

	it('do login', async () => {
		const { data } = await login({});

		expect(data?.login.token).toBeDefined();
		expect(data?.login.message).toBe('Success');
	});

	it('throws a error. email is empty', async () => {
		const { errors } = await login({ email: '' });
		expect(errors?.[0].message).toBe('Failure: Invalid credentials');
	});

	it('throws a error. email is wrong', async () => {
		const { errors } = await login({ email: 'wrong' });
		expect(errors?.[0].message).toBe('Failure: Invalid credentials');
	});

	it('throws a error. password is wrong', async () => {
		const { errors } = await login({ password: 'wrong' });
		expect(errors?.[0].message).toBe('Failure: Invalid credentials');
	});
});
