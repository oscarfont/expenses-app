import type { Cell } from '../../domain/Spreadhseet';
import type { ISpreadsheet } from '../../domain/spreadsheet.interface';
import type { ISpreadsheetDto } from '../../dtos/ISpreadhseetDto';

export interface ISpreadsheetManager {
	isClientInit(): boolean;
	toSpreadSheet(id: string, dto: ISpreadsheetDto): ISpreadsheet;

	readSheet(id: string, range: string): Promise<ISpreadsheet>;

	addValue(month: string, person: string, date: string, value: string): Promise<number>;
	updateValue(month: string, row: Map<number, Cell<any>[]>, value: string): Promise<number>;

	createTab(name: string): ISpreadsheet;
	createSheet(name: string): ISpreadsheet;
}
