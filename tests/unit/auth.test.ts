import { describe, it, expect, beforeAll } from 'vitest';
import AuthManager from '../../src/routes/lib/server/infrastructure/auth/AuthManager';
import type { IAuthManager } from '../../src/routes/lib/server/infrastructure/auth/authmanager.interface';

describe('Spreadsheets domain object tests', () => {
	let authManager: IAuthManager;

	beforeAll(() => {
		authManager = new AuthManager();
	});

	it('Auth Manager has the right scope set for spreadsheets api', () => {
		const scope = authManager.getScope().pop();
		const expectedScope = 'https://www.googleapis.com/auth/spreadsheets';
		expect(scope).toBe(expectedScope);
	});

	it('Auth Manager getClient returns de JWT token successsfully', () => {
		const token = authManager.getToken();
		expect(token).toBeTypeOf('object');
		expect(token).toHaveProperty('email');
		expect(token.email).toBeTruthy();
	});
});
