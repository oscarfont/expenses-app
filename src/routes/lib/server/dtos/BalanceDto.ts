import type { IBalanceDto } from './IBalanceDto';
import type { IHistoryDto } from './IHistoryDto';

class BalanceDto implements IBalanceDto {
	defaulter: string;
	personBalance: Map<string, number>;
	monthTotal: number;
	defaulterTotal: number;
	startDate: string;
	endDate: string;

	constructor() {
		this.defaulter = '';
		this.personBalance = new Map<string, number>();
		this.monthTotal = 0;
		this.defaulterTotal = 0;
		this.startDate = '';
		this.endDate = '';
	}

	computeBalanceOf(person: string, history: IHistoryDto): void {
		const personTotal = history.totals.get(person) ?? 0;
		[...history.totals.keys()].forEach((currPerson) => {
			if (person !== currPerson) {
				const balance =
					Math.round((personTotal - (history.totals.get(currPerson) ?? 0)) * 100) / 100;
				this.personBalance.set(person, balance);
			}
		});
	}

	computeDefaulter(): void {
		// sort personBalanceMap
		this.personBalance = new Map<string, number>(
			[...this.personBalance.entries()].sort((a, b) => a[1] - b[1])
		);

		// get person key
		this.defaulter = this.personBalance.keys().next().value;
	}

	getDateRange(history: IHistoryDto): void {
		// get min and max indexes of rows
		const rowIndexes = [...history.rows.keys()];
		const min = rowIndexes[2]; // exclude header and carryovers
		const max = rowIndexes[rowIndexes.length - 1];

		this.startDate = history.rows[min].date;
		this.endDate = history.rows[max].date;
	}
}

export default BalanceDto;
