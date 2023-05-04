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
		const monthsAvailable = await spreadSheetManager.getSheetNames();
		const month = monthsAvailable[monthsAvailable.length - 1];

		const sheet: ISpreadsheet = await getHistory(month, spreadSheetManager);
		const history = computeTotalSum(sheet);
		return {
			month: month,
			rows: history.rows.filter((row) => row.category !== 'carryover'),
			totals: history.totals
		};
	} catch (ex: any) {
		throw ex;
	}
}
