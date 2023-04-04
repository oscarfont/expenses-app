import type { ISpreadsheet } from '../domain/spreadsheet.interface';

export type entry = {
	person: string;
	date: string;
	value: number;
};

export interface IHistoryDto {
	rows: Array<entry>;
	totals: Map<string, number>;
	fromSpreadSheet(sheet: ISpreadsheet): void;
	addTotal(person: string, total: number): void;
}