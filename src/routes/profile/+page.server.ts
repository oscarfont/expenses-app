import type { Actions } from '@sveltejs/kit';
import JwtManager from '../lib/server/infrastructure/jwt/JwtManager';
import { logIn } from '../lib/server/usecases';

export const actions = {
	auth: async ({ request }: { request: Request }) => {
		const jwtManager = new JwtManager();
		try {
			const data = await request.formData();
			const user = data.get('user')?.toString()!!;
			const pass = data.get('secret')?.toString()!!;
			const response = await logIn(user, pass, jwtManager);
			return response;
		} catch (ex: any) {
			throw ex;
		}
	}
} satisfies Actions;
