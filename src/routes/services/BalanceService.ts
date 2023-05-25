import type { IBalanceDto } from '../lib/server/dtos/IBalanceDto';

export const getBalanceData = async (): Promise<IBalanceDto> => {
	try {
		const data = (await fetch('/api/balance')).json();
		return data;
	} catch (e: any) {
		throw e;
	}
};
