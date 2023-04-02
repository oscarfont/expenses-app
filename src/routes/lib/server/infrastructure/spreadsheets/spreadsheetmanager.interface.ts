import type { ISpreadsheet } from '../../domain/spreadsheet.interface';
import type { ISpreadsheetDto } from '../../dtos/ISpreadhseetDto';

export interface ISpreadsheetManager {
	isClientInit(): boolean;
	addValue(id: string, x: number): ISpreadsheet;
	updateValue(id: string, x: number): ISpreadsheet;
	createTab(id: string, name: string): ISpreadsheet;
	createSheet(name: string): ISpreadsheet;
	readSheet(id: string, range: string): Promise<ISpreadsheet>;
	toSpreadSheet(id: string, dto: ISpreadsheetDto): ISpreadsheet;
}
