import type { Cell, ISpreadsheet } from './spreadsheet.interface';

class Spreadsheet implements ISpreadsheet {
	id: string;
	rows: Map<number, Cell<any>[]>;

	constructor() {
		this.id = 'SAMPLE_ID';
		this.rows = new Map<number, Cell<any>[]>();
	}
}

export default Spreadsheet;
