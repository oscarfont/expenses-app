import type { IHistoryDto } from './IHistoryDto';

export interface IBalanceDto {
	defaulter: string;
	personBalance: Map<string, number>;
	monthTotal: number;
	defaulterTotal: number;
	startDate: string;
	endDate: string;

	computeBalanceOf(person: string, history: IHistoryDto): void;
	computeDefaulter(): void;
}
