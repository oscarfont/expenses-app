import type { Actions } from './$types';
import AuthManager from './lib/server/infrastructure/auth/AuthManager';
import SpreadsheetManager from './lib/server/infrastructure/spreadsheets/SpreadsheetManager';
import { addExpense, computeBalance } from './lib/server/usecases';

export const actions = {
	addExpense: async ({ request }: { request: Request }) => {
		const authManager = new AuthManager();
		try {
			const auth = await authManager.getToken();
			const spreadSheetManager = new SpreadsheetManager(auth);

			const data = await request.formData();
			const person = data.get('user')?.toString()!!;
			const fecha = data.get('fecha')?.toString()!!;
			const expense = parseFloat(data.get('gasto')?.toString()!!);

			await addExpense(person, expense, spreadSheetManager, fecha);
		} catch (ex: any) {
			throw ex;
		}
	}
} satisfies Actions;

/*export async function load() {
	const authManager = new AuthManager();
	try {
		const auth = await authManager.getToken();
		const spreadSheetManager = new SpreadsheetManager(auth);
		const monthsAvailable = await spreadSheetManager.getSheetNames();
		const month = monthsAvailable[monthsAvailable.length - 1];

		const balance = await computeBalance(month, spreadSheetManager);
		return {
			balanceMonth: month,
			defaulter: balance.defaulter,
			personBalance: balance.personBalance,
			monthTotal: balance.monthTotal,
			defaulterTotal: balance.defaulterTotal,
			startDate: balance.startDate,
			endDate: balance.endDate
		};
	} catch (ex: any) {
		throw ex;
	}
}*/
