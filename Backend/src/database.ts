/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';
import mongoose from 'mongoose';

const URI = `${process.env.DATABASE}_${process.env.NODE_ENV}`;

export const startDatabase = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(URI);

		const testEnvironment = process.env.NODE_ENV === 'test';
		testEnvironment || console.log('DB connected');
	} catch (error: any) {
		console.log(error.message);
	}
};
