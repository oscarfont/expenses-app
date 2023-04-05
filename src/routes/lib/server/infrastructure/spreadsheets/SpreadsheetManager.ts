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

	async addValue(month: string, person: string, date: string, value: string): Promise<number> {
		try {
			const spreadsheetId = '1iiDe59t39Pk2QMOv0DBjWDuBOjP8rvSpFp0fpHE4T28';
			const result = await this.spreadsheetsClient.spreadsheets.values.append({
				spreadsheetId,
				range: month,
				valueInputOption: 'USER_ENTERED',
				requestBody: {
					values: [[person, date, 'comida', value]]
				}
			});
			return result.data.updates?.updatedRows ? result.data.updates?.updatedRows : 0;
		} catch (ex: any) {
			throw ex;
		}
	}

	async updateValue(month: string, row: Map<number, Cell<any>[]>, value: string): Promise<number> {
		try {
			const spreadsheetId = '1iiDe59t39Pk2QMOv0DBjWDuBOjP8rvSpFp0fpHE4T28';
			let rowNum = [...row.keys()].shift();
			if (!rowNum) throw new Error('Row for this person today does not exist at the sheet');
			rowNum++;
			const result = await this.spreadsheetsClient.spreadsheets.values.update({
				spreadsheetId,
				range: `${month}!D${rowNum}`,
				valueInputOption: 'USER_ENTERED',
				requestBody: {
					values: [[value]]
				}
			});
			return result.data?.updatedRows ? result.data?.updatedRows : 0;
		} catch (ex: any) {
			throw ex;
		}
	}

	createTab(name: string): ISpreadsheet {
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
