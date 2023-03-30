import type { JWT } from 'google-auth-library';

export interface IAuthManager {
	getToken(): JWT;
	getScope(): Array<string>;
	isAuthenticated(secret: string): boolean;
}
