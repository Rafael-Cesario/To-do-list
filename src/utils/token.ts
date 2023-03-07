import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const generateToken = (email: string) => {
	const secret = process.env.SECRET;
	if (!secret) throw new Error('Server Error');

	const expiresIn = 1 * 60 * 60 * 24 * 7; // 1 week
	const token = jwt.sign({ email }, secret, { expiresIn });

	return token;
};
