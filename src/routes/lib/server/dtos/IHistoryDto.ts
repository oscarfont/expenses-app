import type { ISpreadsheet } from '../domain/spreadsheet.interface';

export type entry = {
	person: string;
	date: string;
	category: string;
	value: number;
};

export interface IHistoryDto {
	month: string;
	rows: Array<entry>;
	totals: Map<string, number>;
	carryovers: Map<string, number>;
	fromSpreadSheet(sheet: ISpreadsheet): void;
	addTotal(person: string, total: number): void;
}
