import type { ISpreadsheet } from '../../domain/spreadsheet.interface';
import type { ISpreadsheetManager } from './spreadsheetmanager.interface';
import { google, sheets_v4 } from 'googleapis';
import type { ISpreadsheetDto } from '../../dtos/ISpreadhseetDto';
import Spreadsheet, { Cell } from '../../domain/Spreadhseet';

class SpreadsheetManager implements ISpreadsheetManager {
	public sheet?: ISpreadsheet;
	private spreadsheetsClient: sheets_v4.Sheets;

	constructor(auth: any, sheet?: ISpreadsheet) {
		this.spreadsheetsClient = google.sheets({
			version: 'v4',
			auth: auth
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
	async readSheet(id: string, range: string): Promise<ISpreadsheet> {
		try {
			const res = (await this.spreadsheetsClient.spreadsheets.values.get({
				spreadsheetId: id,
				range: range
			})) as ISpreadsheetDto;

			return this.toSpreadSheet(id, res);
		} catch (e: any) {
			console.log(e);
			throw e;
		}
	}

	toSpreadSheet(id: string, dto: ISpreadsheetDto): ISpreadsheet {
		const sheet = new Spreadsheet(id);
		dto.data.values.forEach((row: Array<any>, index: number) => {
			const values = row.map((value) => {
				return new Cell<typeof value>(value);
			});
			sheet.addRow(index, values);
		});
		return sheet;
	}
}

export default SpreadsheetManager;
