export const getHistoricalData = async (): Promise<any> => {
	try {
		const data = (await fetch('/api/expense')).json();
		return data;
	} catch (e: any) {
		throw e;
	}
};
