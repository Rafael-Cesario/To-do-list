import { describe, it, expect } from 'vitest';
import { generateToken, verifyToken } from '../token';

describe('Token', () => {
	it('Returns a token', () => {
		const email = 'placeHolderEmail';
		const token = generateToken(email);
		const decoded = verifyToken(token);

		expect(token).toBeDefined();
		expect(decoded.email).toBe(email);
	});

	it('Expires in...', () => {
		const email = 'placeHolderEmail';
		const token = generateToken(email);
		const decoded = verifyToken(token);
		const expiresInDay = new Date(decoded.exp * 1000).getDate();
		const day = new Date().getDate() + 7;

		expect(expiresInDay).toEqual(day);
	});
});
