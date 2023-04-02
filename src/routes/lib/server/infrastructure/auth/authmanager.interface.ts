import type { JWT } from 'google-auth-library';

export interface IAuthManager {
	getToken();
	getScope(): Array<string>;
	isAuthenticated(secret: string): boolean;
}
