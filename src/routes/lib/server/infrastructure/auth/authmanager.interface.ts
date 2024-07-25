export interface IAuthManager {
	getToken(): unknown;
	getScope(): Array<string>;
	isAuthenticated(secret: string): boolean;
}
