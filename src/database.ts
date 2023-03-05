/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';
import mongoose from 'mongoose';

const URI = `${process.env.DATABASE}_${process.env.NODE_ENV}`;

export const startDatabase = async () => {
	try {
		await mongoose.connect(URI);
		console.log('DB connected');
	} catch (error) {
		console.log('DB error');
	}
};
