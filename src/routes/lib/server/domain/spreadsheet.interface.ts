import type { Cell } from './Spreadhseet';

export interface ISpreadsheet {
	id: string;
	rows: Map<number, Array<ICell<any>>>;

	addRow(rowNum: number, values: Array<ICell<any>>): void;
	findRow(person: string, date: string): Map<number, Cell<any>[]> | undefined;
}

export interface ICell<T> {
	value: T;
}
