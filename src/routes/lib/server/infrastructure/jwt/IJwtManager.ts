export interface TokenPayload {
	user: string;
}

export interface IJwtManager {
	generateToken(payload: TokenPayload): Promise<string>;
	verifyToken(token: string): Promise<TokenPayload>;
}
