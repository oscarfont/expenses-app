import type { IHistoryDto } from '../lib/server/dtos/IHistoryDto';

export const getHistoricalData = async (): Promise<IHistoryDto> => {
	try {
		const data = (await fetch('/api/expense')).json();
		return data;
	} catch (e: any) {
		throw e;
	}
};
