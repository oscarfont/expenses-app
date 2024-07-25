import type { Cell } from '../../domain/Spreadhseet';
import type { ISpreadsheet } from '../../domain/spreadsheet.interface';
import type { ISpreadsheetDto } from '../../dtos/ISpreadhseetDto';

export interface ISpreadsheetManager {
	isClientInit(): boolean;
	toSpreadSheet(id: string, dto: ISpreadsheetDto): ISpreadsheet;

	readSheet(id: string, range: string): Promise<ISpreadsheet>;
	getSheetNames(): Promise<Array<string>>;

	addValue(month: string, value: Array<any>): Promise<number>;
	updateValue(month: string, row: Map<number, Cell<any>[]>, value: string): Promise<number>;

	createTab(name: string): Promise<void>;
	//createSheet(name: string): ISpreadsheet | undefined;
}
