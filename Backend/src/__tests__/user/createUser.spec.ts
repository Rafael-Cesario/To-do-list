import mongoose from 'mongoose';
import request from 'supertest-graphql';
import { startServer } from '../../server';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { startDatabase } from '../../database';
import { InputCreateUser } from '../../interfaces/interfacesUser';
import { ModelUser } from '../../models/modelUser';
import { CREATE_USER } from '../__queries__/queriesUser';

describe('Create User', () => {
	let url: string;

	const requestCreateUser = async (createUser?: { createUser: InputCreateUser }) => {
		type Response = { createUser: { message: string } };

		const { data, errors } = await request<Response>(url)
			.mutate(CREATE_USER)
			.variables(
				createUser ? { createUser } : { createUser: { email: 'UserEmail', name: 'name', password: 'password' } }
			);

		return { data, errors };
	};

	beforeAll(async () => {
		url = await startServer(0);
		startDatabase();
	});

	afterEach(async () => {
		await ModelUser.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('Creates a new user', async () => {
		const { data } = await requestCreateUser();
		expect(data?.createUser.message).toBe('Success: New user created');
	});

	it('Throws a error. empty variables', async () => {
		const { errors } = await requestCreateUser({ createUser: { email: '', name: '', password: '' } });

		expect(errors?.[0].message).toMatch(
			/name: Name is required, email: Email is required, password: Password is required/
		);
	});

	it('Throws a error. Email is duplicated', async () => {
		await request(url)
			.mutate(CREATE_USER)
			.variables({ user: { email: 'UserEmail', name: 'name', password: 'password' } });

		const { errors } = await request(url)
			.mutate(CREATE_USER)
			.variables({ user: { email: 'UserEmail', name: 'name', password: 'password' } });

		expect(errors?.[0].message).toMatch(/This user already exist/i);
	});

	it('Throws a error. Name is to long', async () => {
		const { errors } = await requestCreateUser({
			createUser: {
				email: 'email',
				name: 'this name is way to long',
				password: 'password',
			},
		});

		expect(errors?.[0].message).toMatch(/longer than the maximum allowed length/);
	});

	it('hash the password', async () => {
		await requestCreateUser();
		const user = await ModelUser.findOne({ email: 'email' });
		expect(user?.password).not.toBe('email');
	});

	it('saves email as lowerCase', async () => {
		await requestCreateUser({ createUser: { email: 'USEREMAIL', name: 'name', password: 'password' } });
		const user = await ModelUser.findOne({ email: 'useremail' });
		expect(user?.email).toBe('useremail');
	});
});
