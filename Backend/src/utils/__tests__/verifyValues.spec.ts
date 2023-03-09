/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { verifyValues } from '../verifyValues';

describe('Verify values', () => {
	describe('Returns a string with all the empty values of a object', () => {
		it('send one empty value', () => {
			const object = { email: '' };
			const hasEmptyValues = verifyValues(object);
			expect(hasEmptyValues).toBe('Email was not provided');
		});

		it('send two empty values', () => {
			const object = { email: '', name: '' };
			const hasEmptyValues = verifyValues(object);
			expect(hasEmptyValues).toBe('Email was not provided, Name was not provided');
		});

		it('send empty and filled values', () => {
			const object = { email: 'email', name: 'name', age: '' };
			const hasEmptyValues = verifyValues(object);
			expect(hasEmptyValues).toBe('Age was not provided');
		});

		it('send all values filled', () => {
			const object = { email: 'email', name: 'name', age: '42' };
			const hasEmptyValues = verifyValues(object);
			expect(hasEmptyValues).toBe('');
		});
	});
});
