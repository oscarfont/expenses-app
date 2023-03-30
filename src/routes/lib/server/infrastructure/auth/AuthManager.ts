import type { IAuthManager } from './authmanager.interface';
import { JWT } from 'google-auth-library';
import keys from './my-spreadsheets-api-605dd8409717.json';
import { SECRET } from '$env/static/private';

class AuthManager implements IAuthManager {
	private authToken: JWT;
	private scopeUrl: string;

	constructor() {
		this.scopeUrl = 'https://www.googleapis.com/auth/spreadsheets';
		this.authToken = new JWT({
			email: keys.client_email,
			key: keys.private_key,
			scopes: [this.scopeUrl]
		});
	}

	getToken(): JWT {
		return this.authToken;
	}

	getScope(): Array<string> {
		return [this.scopeUrl];
	}

	isAuthenticated(secret: string): boolean {
		return secret === SECRET;
	}
}

export default AuthManager;
