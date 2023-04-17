import jwt from 'jsonwebtoken';
import type { TokenPayload } from './IJwtManager';

class JwtManager {
	private readonly secret: string;

	constructor() {
		this.secret = process.env.JWT_SECRET ?? 'secret';
	}

	public async generateToken(payload: TokenPayload): Promise<string> {
		try {
			return jwt.sign(payload, this.secret, { expiresIn: '60d' });
		} catch (ex: any) {
			throw ex;
		}
	}

	public async verifyToken(token: string): Promise<TokenPayload> {
		try {
			return jwt.verify(token, this.secret) as TokenPayload;
		} catch (ex: any) {
			throw ex;
		}
	}
}

export default JwtManager;
