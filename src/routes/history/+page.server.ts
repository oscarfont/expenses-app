import type { Actions } from '@sveltejs/kit';
import type { ISpreadsheet } from '../lib/server/domain/spreadsheet.interface';
import AuthManager from '../lib/server/infrastructure/auth/AuthManager';
import JwtManager from '../lib/server/infrastructure/jwt/JwtManager';
import SpreadsheetManager from '../lib/server/infrastructure/spreadsheets/SpreadsheetManager';
import { computeTotalSum, getHistory, logIn } from '../lib/server/usecases';

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

export async function load({ params }: { params: { month: string } }) {
	const authManager = new AuthManager();
	try {
		const auth = await authManager.getToken();
		const spreadSheetManager = new SpreadsheetManager(auth);
		const sheet: ISpreadsheet = await getHistory(spreadSheetManager);
		const history = computeTotalSum(sheet);
		return { rows: history.rows, totals: history.totals };
	} catch (ex: any) {
		throw ex;
	}
}
