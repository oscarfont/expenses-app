import type { ISpreadsheet } from '../../domain/spreadsheet.interface';
import type { ISpreadsheetManager } from './spreadsheetmanager.interface';
import { google, sheets_v4 } from 'googleapis';
import type { IAuthManager } from '../auth/authmanager.interface';

class SpreadsheetManager implements ISpreadsheetManager {
	public sheet?: ISpreadsheet;
	private spreadsheetsClient: sheets_v4.Sheets;

	constructor(auth: IAuthManager, sheet?: ISpreadsheet) {
		this.spreadsheetsClient = google.sheets({
			version: 'v4',
			auth: auth.getToken()
		});
		this.sheet = sheet;
	}

	isClientInit(): boolean {
		return this.spreadsheetsClient && typeof this.spreadsheetsClient.context == 'object';
	}

	addValue(id: string, x: number): ISpreadsheet {
		// TODO: Implement method
		return this.sheet!!;
	}
	updateValue(id: string, x: number): ISpreadsheet {
		// TODO: Implement method
		return this.sheet!!;
	}
	createTab(id: string, name: string): ISpreadsheet {
		// TODO: Implement method
		return this.sheet!!;
	}
	createSheet(name: string): ISpreadsheet {
		// TODO: Implement method
		return this.sheet!!;
	}
}

export default SpreadsheetManager;
