import { describe, it, expect } from 'vitest';
import { comparePasswords, encryptPassword } from './encryptPassword';

describe('Encrypt password', () => {
	it('returns a hashed password', () => {
		const password = 'MyPassword';
		const hashed = encryptPassword(password);
		expect(hashed).not.toBe(password);
	});

	it('compare passwords', () => {
		const password = 'MyPassword';
		const wrongPassword = 'WrongPassword';
		const hashed = encryptPassword(password);

		const caseRightPassword = comparePasswords(password, hashed);
		expect(caseRightPassword).toBe(true);

		const caseWrongPassword = comparePasswords(wrongPassword, hashed);
		expect(caseWrongPassword).toBe(false);
	});
});
