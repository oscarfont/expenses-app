import { json, type RequestHandler } from '@sveltejs/kit';
import type { ISpreadsheet } from '../../lib/server/domain/spreadsheet.interface';
import AuthManager from '../../lib/server/infrastructure/auth/AuthManager';
import SpreadsheetManager from '../../lib/server/infrastructure/spreadsheets/SpreadsheetManager';
import { computeTotalSum, getHistory } from '../../lib/server/usecases';

export const GET = (async () => {
	const authManager = new AuthManager();
	try {
		const auth = await authManager.getToken();
		const spreadSheetManager = new SpreadsheetManager(auth);
		const monthsAvailable = await spreadSheetManager.getSheetNames();
		const month = monthsAvailable[monthsAvailable.length - 1];

		const sheet: ISpreadsheet = await getHistory(month, spreadSheetManager);
		const history = computeTotalSum(sheet);
		return json({
			month: month,
			rows: history.rows.filter((row) => row.category !== 'carryover'),
			totals: history.totals
		});
	} catch (ex: any) {
		throw ex;
	}
}) satisfies RequestHandler;
