import type { ISpreadsheet } from './domain/spreadsheet.interface';
import HistoryDto from './dtos/HistoryDto';
import type { IHistoryDto } from './dtos/IHistoryDto';
import dateUtils from './infrastructure/dateutils';
import type { ISpreadsheetManager } from './infrastructure/spreadsheets/spreadsheetmanager.interface';

export const getHistory = async (
	month: string,
	spreadsheetManager: ISpreadsheetManager
): Promise<ISpreadsheet> => {
	try {
		const id = '1iiDe59t39Pk2QMOv0DBjWDuBOjP8rvSpFp0fpHE4T28';
		const range = `${month}!A1:D`;
		return await spreadsheetManager.readSheet(id, range);
	} catch (ex: any) {
		console.log(ex);
		throw ex;
	}
};

export const computeTotalSum = (sheet: ISpreadsheet): IHistoryDto => {
	const history = new HistoryDto();
	history.fromSpreadSheet(sheet);

	// compute and add totals
	const sheetRows = [...sheet.rows.values()].slice(1);
	const people = new Set(sheetRows.map((value) => value[0].value));
	people.forEach((person) => {
		const personExpenses = sheetRows
			.filter((value) => value[0].value === person)
			.map((cell) =>
				(cell[3].value as string).includes(',')
					? parseFloat((cell[3].value as string).replace(',', '.'))
					: parseFloat(cell[3].value)
			);
		const total = personExpenses.reduce((acc, curr) => acc + curr, 0);
		history.addTotal(person, total);
	});

	return history;
};

export const addExpense = async (
	month: string,
	person: string,
	expense: number,
	spreadsheetManager: ISpreadsheetManager
): Promise<number> => {
	try {
		// get historical data and todays date
		const currentMonthName = dateUtils.getCurrentMonthName();
		const todayDate = dateUtils.getTodaysDateString();
		const treatedExpense = expense.toString().includes('.')
			? expense.toString().replace('.', ',')
			: expense.toString();

		// check if there is historical data for current month
		const sheet = await getHistory(currentMonthName, spreadsheetManager);

		// check if for today there is a row for that person
		/*const personRow = sheet.findRow(person, todayDate);

		// if there is get the amount already there
		const formulaToAdd = personRow
			? `=${[...personRow.entries()].shift()?.[1][3].value}+(${treatedExpense})`
			: `=(${expense})`;

		// use sheet manager to update or add the new expense
		const rowsAffected = personRow
			? await spreadsheetManager.updateValue(currentMonthName, personRow, formulaToAdd)
			: await spreadsheetManager.addValue(month, person, todayDate, formulaToAdd);

		return rowsAffected;*/
		return 0;
	} catch (e: any) {
		throw e;
	}
};
