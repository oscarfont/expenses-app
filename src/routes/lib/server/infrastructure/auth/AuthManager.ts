import type { IAuthManager } from './authmanager.interface';
import { google } from 'googleapis';
import { keys } from './credentials';
import { SECRET } from '$env/static/private';

class AuthManager implements IAuthManager {
	private authToken;
	private scopeUrl: string;

	constructor() {
		this.scopeUrl = 'https://www.googleapis.com/auth/spreadsheets';
		this.authToken = new google.auth.GoogleAuth({
			credentials: keys,
			scopes: [this.scopeUrl]
		});
	}

	async getToken() {
		try {
			await this.authToken.getClient();
		} catch (ex: any) {
			throw ex;
		}

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
