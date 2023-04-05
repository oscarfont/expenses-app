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

	findRow(person: string, date: string): Map<number, Cell<any>[]> | undefined {
		const foundRow = new Map<number, Cell<any>[]>();
		// searching from the last rows has higher probability of finding the desired row before
		[...this.rows.keys()].reverse().forEach((key) => {
			const cells = this.rows.get(key);
			if (cells && cells[0].value === person && cells[1].value === date) foundRow.set(key, cells);
		});
		return foundRow.size === 1 ? foundRow : undefined;
	}
}

export default Spreadsheet;
