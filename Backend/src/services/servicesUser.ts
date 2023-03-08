/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { InputLogin, InputUpdateUser, InputUser } from '../interfaces/interfacesUser';
import { ModelUser } from '../models/modelUser';
import { comparePasswords } from '../utils/encryptPassword';
import { generateToken } from '../utils/token';

export class ServicesUser {
	async createUser(user: InputUser) {
		try {
			const { email, name, password } = user;
			await ModelUser.create({ email, name, password });

			return { message: 'Success: New user created' };
		} catch (error: any) {
			if (error.message.match(/E11000 duplicate key error/)) throw new GraphQLError('Failure: This user already exist');
			throw new GraphQLError(error.message);
		}
	}

	async readUser(email: string) {
		try {
			if (!email) throw new Error('Failure: Email was not provided');

			const user = await ModelUser.findOne({ email });
			if (!user) throw new Error('Failure: User not found');

			return { email: user.email, name: user.name, password: '' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async updateUser(updateUser: InputUpdateUser) {
		try {
			if (!updateUser.email) throw new Error('Failure: Email was not provided');

			const user = await ModelUser.findOne({ email: updateUser.email });
			if (!user) throw new Error('Failure: User not found');

			const update = updateUser.update;
			const updateKeys = Object.keys(update);
			type TypeUpdateKeys = keyof typeof update;

			updateKeys.forEach((key) => {
				const newValue = update[key as TypeUpdateKeys]?.trim();
				const oldValue = user[key as TypeUpdateKeys];

				user[key as TypeUpdateKeys] = newValue || oldValue;
			});

			await user.save();
			return { message: 'Success: User has been updated' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async deleteUser(email: string) {
		try {
			if (!email) throw new Error('Failure: Email was not provided');

			const deleted = await ModelUser.findOneAndDelete({ email });
			if (!deleted) throw new Error('Failure: User not found');

			return { message: 'Success: User deleted' };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}

	async login(login: InputLogin) {
		try {
			const { email, password } = login;
			if (!email || !password) throw new Error('Failure: Invalid credentials');

			const user = await ModelUser.findOne({ email });
			if (!user) throw new Error('Failure: Invalid credentials');

			const samePassword = comparePasswords(password, user.password);
			if (!samePassword) throw new Error('Failure: Invalid credentials');

			const token = generateToken(email);
			return { message: 'Success', token };
		} catch (error: any) {
			throw new GraphQLError(error.message);
		}
	}
}
