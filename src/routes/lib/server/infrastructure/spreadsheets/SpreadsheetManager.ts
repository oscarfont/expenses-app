import type { ISpreadsheet } from '../../domain/spreadsheet.interface';
import type { ISpreadsheetManager } from './spreadsheetmanager.interface';
import { google, sheets_v4 } from 'googleapis';
import type { ISpreadsheetDto } from '../../dtos/ISpreadhseetDto';
import Spreadsheet, { Cell } from '../../domain/Spreadhseet';
import { env } from '$env/dynamic/private';

class SpreadsheetManager implements ISpreadsheetManager {
	public sheet?: ISpreadsheet;
	private readonly spreadsheetsClient: sheets_v4.Sheets;

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

	async addValue(month: string, value: Array<unknown>): Promise<number> {
		const spreadsheetId = env.SPREADHSEET_ID ?? this.sheet?.id;
		const result = await this.spreadsheetsClient.spreadsheets.values.append({
			spreadsheetId,
			range: month,
			valueInputOption: 'USER_ENTERED',
			requestBody: {
				values: [value]
			}
		});
		return result.data.updates?.updatedRows ? result.data.updates?.updatedRows : 0;
	}

	async updateValue(month: string, row: Map<number, Cell<unknown>[]>, value: string): Promise<number> {
		const spreadsheetId = env.SPREADHSEET_ID ?? this.sheet?.id;
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
	}

	async createTab(name: string): Promise<void> {
		const spreadsheetId = env.SPREADHSEET_ID ?? this.sheet?.id;

		await this.spreadsheetsClient.spreadsheets.batchUpdate({
			spreadsheetId,
			requestBody: {
				requests: [
					{
						addSheet: {
							properties: {
								title: name
							}
						}
					}
				]
			}
		});
	}

	async readSheet(id: string, range: string): Promise<ISpreadsheet> {
		const res = (await this.spreadsheetsClient.spreadsheets.values.get({
			spreadsheetId: id,
			range: range
		})) as ISpreadsheetDto;

		return this.toSpreadSheet(id, res);
	}

	async getSheetNames(): Promise<string[]> {
		const spreadsheetId = env.SPREADHSEET_ID ?? this.sheet?.id;
		const res = await this.spreadsheetsClient.spreadsheets.get({
			spreadsheetId: spreadsheetId
		});
		return res.data.sheets?.map((sheet) => sheet.properties?.title ?? '') ?? [''];
	}

	toSpreadSheet(id: string, dto: ISpreadsheetDto): ISpreadsheet {
		const sheet = new Spreadsheet(id);
		dto.data.values.forEach((row: Array<unknown>, index: number) => {
			const values = row.map((value) => {
				return new Cell<typeof value>(value);
			});
			sheet.addRow(index, values);
		});
		return sheet;
	}
}

export default SpreadsheetManager;
