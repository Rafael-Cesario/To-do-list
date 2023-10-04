/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';
import mongoose from 'mongoose';

let URI = process.env.DATABASE;

if (process.env.NODE_ENV) {
	URI += `-${process.env.NODE_ENV}`;
}

export const startDatabase = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(URI!);

		const testEnvironment = process.env.NODE_ENV === 'test';
		testEnvironment || console.log('DB connected');
	} catch (error: any) {
		console.log(error.message);
	}
};
