import { json, type RequestHandler } from '@sveltejs/kit';
import AuthManager from '../../lib/server/infrastructure/auth/AuthManager';
import SpreadsheetManager from '../../lib/server/infrastructure/spreadsheets/SpreadsheetManager';
import { computeBalance } from '../../lib/server/usecases';

export const GET = (async () => {
	const authManager = new AuthManager();
	try {
		const auth = await authManager.getToken();
		const spreadSheetManager = new SpreadsheetManager(auth);
		const monthsAvailable = await spreadSheetManager.getSheetNames();
		const month = monthsAvailable[monthsAvailable.length - 1];

		const balance = await computeBalance(month, spreadSheetManager);
		return json({
			balanceMonth: month,
			defaulter: balance.defaulter,
			personBalance: Object.fromEntries(balance.personBalance),
			monthTotal: balance.monthTotal,
			defaulterTotal: balance.defaulterTotal,
			startDate: balance.startDate,
			endDate: balance.endDate
		});
	} catch (ex: any) {
		throw ex;
	}
}) satisfies RequestHandler;
