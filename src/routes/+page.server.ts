import type { Actions } from './$types';
import AuthManager from './lib/server/infrastructure/auth/AuthManager';
import JwtManager from './lib/server/infrastructure/jwt/JwtManager';
import SpreadsheetManager from './lib/server/infrastructure/spreadsheets/SpreadsheetManager';
import { addExpense, computeBalance, logIn } from './lib/server/usecases';

export const actions = {
	addExpense: async ({ request }: { request: Request }) => {
		const authManager = new AuthManager();
		try {
			const auth = await authManager.getToken();
			const spreadSheetManager = new SpreadsheetManager(auth);

			const data = await request.formData();
			const person = data.get('persona')?.toString()!!;
			const expense = parseFloat(data.get('gasto')?.toString()!!);

			await addExpense(person, expense, spreadSheetManager);
		} catch (ex: any) {
			throw ex;
		}
	},
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

export async function load() {
	const authManager = new AuthManager();
	try {
		const auth = await authManager.getToken();
		const spreadSheetManager = new SpreadsheetManager(auth);
		const balance = await computeBalance(spreadSheetManager);
		return { defaulter: balance.defaulter, personBalance: balance.personBalance };
	} catch (ex: any) {
		throw ex;
	}
}
