import type { ISpreadsheet } from '../lib/server/domain/spreadsheet.interface';
import AuthManager from '../lib/server/infrastructure/auth/AuthManager';
import SpreadsheetManager from '../lib/server/infrastructure/spreadsheets/SpreadsheetManager';
import { computeTotalSum, getHistory } from '../lib/server/usecases';

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
