import mongoose from 'mongoose';
import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { startServer } from '../server';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startDatabase } from '../database';

const CREATE_USER = gql`
	mutation CreateUser($user: InputUser!) {
		createUser(user: $user) {
			message
		}
	}
`;

describe('Create User', () => {
	let url: string;

	beforeAll(async () => {
		url = await startServer(0);
		startDatabase();
	});

	afterEach(async () => {
		await mongoose.connection.dropDatabase();
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	it('Creates a new user', async () => {
		type Response = { createUser: { message: string } };
		const { data } = await request<Response>(url)
			.mutate(CREATE_USER)
			.variables({ user: { email: 'Rafael@hotmail.com', name: 'Rafael', password: 'Rafael123' } });

		expect(data?.createUser.message).toBe('Success: New user created');
	});
});
