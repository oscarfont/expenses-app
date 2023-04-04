import type { ISpreadsheet } from '../../../../../../Proyectos/expenses-app/src/routes/lib/server/domain/spreadsheet.interface';
import AuthManager from '../../../../../../Proyectos/expenses-app/src/routes/lib/server/infrastructure/auth/AuthManager';
import SpreadsheetManager from '../../../../../../Proyectos/expenses-app/src/routes/lib/server/infrastructure/spreadsheets/SpreadsheetManager';
import {
	computeTotalSum,
	getHistory
} from '../../../../../../Proyectos/expenses-app/src/routes/lib/server/usecases';

export async function load({ params }: { params: { month: string } }) {
	const authManager = new AuthManager();
	try {
		const auth = await authManager.getToken();
		const spreadSheetManager = new SpreadsheetManager(auth);
		const sheet: ISpreadsheet = await getHistory(params.month, spreadSheetManager);
		const history = computeTotalSum(sheet);
		return { rows: history.rows, totals: history.totals };
	} catch (ex: any) {
		throw ex;
	}
}
