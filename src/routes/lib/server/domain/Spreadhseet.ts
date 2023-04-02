import type { ICell, ISpreadsheet } from './spreadsheet.interface';

export class Cell<T> implements ICell<T> {
	value: T;

	constructor(value: any) {
		this.value = value;
	}
}

class Spreadsheet implements ISpreadsheet {
	id: string;
	rows: Map<number, Cell<any>[]>;

	constructor(id?: string) {
		this.id = id ? id : 'SAMPLE_ID';
		this.rows = new Map<number, Cell<any>[]>();
	}

	addRow(rowNum: number, values: Array<Cell<any>>): void {
		this.rows.set(rowNum, values);
	}
}

export default Spreadsheet;
