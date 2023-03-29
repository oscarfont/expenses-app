import type { ISpreadsheet } from '../../domain/spreadsheet.interface';

export interface ISpreadsheetManager {
	isClientInit(): boolean;
	addValue(id: string, x: number): ISpreadsheet;
	updateValue(id: string, x: number): ISpreadsheet;
	createTab(id: string, name: string): ISpreadsheet;
	createSheet(name: string): ISpreadsheet;
}
