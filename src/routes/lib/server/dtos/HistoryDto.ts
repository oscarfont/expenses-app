import type { ISpreadsheet } from '../domain/spreadsheet.interface';
import type { IHistoryDto, entry } from './IHistoryDto';

class HistoryDto implements IHistoryDto {
	rows: Array<entry>;
	totals: Map<string, number>;
	carryovers: Map<string, number>;

	constructor() {
		this.rows = new Array<entry>();
		this.totals = new Map<string, number>();
		this.carryovers = new Map<string, number>();
	}

	private parseNumber(x: string): number {
		const strX = x.includes(',') ? x.replace(',', '.') : x;
		return parseFloat(strX);
	}

	fromSpreadSheet(sheet: ISpreadsheet): void {
		const rowIndexes = [...sheet.rows.keys()];
		rowIndexes.forEach((rowIndex, index) => {
			const values = sheet.rows.get(rowIndex);
			if (values && index !== 0)
				this.rows.push({
					person: values[0].value,
					date: values[1].value,
					category: values[2].value,
					value: this.parseNumber(values[3].value)
				});
		});
	}

	addTotal(person: string, total: number): void {
		this.totals.set(person, total);
	}
}

export default HistoryDto;
