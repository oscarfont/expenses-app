import type { ISpreadsheet } from './domain/spreadsheet.interface';
import BalanceDto from './dtos/BalanceDto';
import HistoryDto from './dtos/HistoryDto';
import type { IBalanceDto } from './dtos/IBalanceDto';
import type { IHistoryDto } from './dtos/IHistoryDto';
import dateUtils from './infrastructure/dateutils';
import type { ISpreadsheetManager } from './infrastructure/spreadsheets/spreadsheetmanager.interface';
import type { IJwtManager } from './infrastructure/jwt/IJwtManager';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const getHistory = async (
	currentMonth: string,
	spreadsheetManager: ISpreadsheetManager
): Promise<ISpreadsheet> => {
	try {
		const id = env.SPREADHSEET_ID;
		const range = `${currentMonth}!A1:D`;
		return await spreadsheetManager.readSheet(id, range);
	} catch (ex: any) {
		throw ex;
	}
};

export const computeTotalSum = (sheet: ISpreadsheet): IHistoryDto => {
	const history = new HistoryDto();
	history.fromSpreadSheet(sheet);

	// compute and add totals
	const people = new Set(history.rows.map((value) => value.person));
	people.forEach((person) => {
		const personExpenses = history.rows
			.filter((value) => value.person === person && value.category === 'comida')
			.map((cell) => cell.value);
		const total = personExpenses.reduce((acc, curr) => acc + curr, 0);
		history.addTotal(person, total);
	});

	return history;
};

export const getCarryOvers = (history: IHistoryDto): Map<string, number> => {
	const personCarryOvers = new Map<string, number>();

	const carryOverRows = history.rows.filter((row) => row.category === 'carryover');
	carryOverRows.forEach((row) => personCarryOvers.set(row.person, row.value));

	return personCarryOvers;
};

const createMonthSheet = async (
	month: string,
	spreadsheetManager: ISpreadsheetManager
): Promise<ISpreadsheet> => {
	try {
		// compute the month to get the carryover from
		const monthsAvailable = await spreadsheetManager.getSheetNames();
		const monthToGetCarryOver = monthsAvailable[monthsAvailable.length - 1];

		// compute carryover
		const balance = await computeBalance(monthToGetCarryOver, spreadsheetManager);
		const personCarryOvers = [...balance.personBalance.keys()].map((person: string) => {
			let personCarryOver = balance.personBalance.get(person) ?? 0;
			return [person, 'N.A.', 'carryover', personCarryOver];
		});

		// create new months sheet
		await spreadsheetManager.createTab(month);
		await spreadsheetManager.addValue(month, ['Persona', 'Fecha', 'Categoria', 'Valor']);
		for await (const carryover of personCarryOvers) {
			spreadsheetManager.addValue(month, carryover);
		}
		const sheet = await getHistory(month, spreadsheetManager);
		return sheet;
	} catch (e: any) {
		throw e;
	}
};

export const addExpense = async (
	person: string,
	expense: number,
	spreadsheetManager: ISpreadsheetManager,
	fecha?: string
): Promise<number> => {
	try {
		// get todays date and treat expense
		const currentMonthName = dateUtils.getCurrentMonthName();
		const todayDate = dateUtils.getTodaysDateString();
		const treatedExpense = expense.toString().includes('.')
			? expense.toString().replace('.', ',')
			: expense.toString();

		// get month of date
		const dateMonth = fecha ? fecha.split('-')[1] : todayDate.split('/')[1];

		// check if it is current month
		if (dateMonth !== todayDate.split('/')[1])
			throw error(500, { message: 'Por favor introduce un gasto de este mes! :(' });

		// check if there is historical data for current month
		let sheet: ISpreadsheet;
		try {
			sheet = await getHistory(currentMonthName, spreadsheetManager);
		} catch (e: any) {
			if (e?.response?.data?.error?.message.includes('parse')) {
				try {
					sheet = await createMonthSheet(currentMonthName, spreadsheetManager);
				} catch (e: any) {
					throw e;
				}
			} else {
				throw e;
			}
		}

		if (!sheet) throw Error('No se ha podido crear o recuperar la nueva hoja correctamente :(');

		// get the date to write to the sheet
		const dateToAdd = fecha ? dateUtils.fromEngToSpaDate(fecha) : todayDate;

		// check if for today there is a row for that person
		const personRow = sheet.findRow(person, dateToAdd);

		// if there is get the amount already there
		const formulaToAdd = personRow
			? `=${[...personRow.entries()].shift()?.[1][3].value}+(${treatedExpense})`
			: `=(${treatedExpense})`;

		// use sheet manager to update or add the new expense
		const rowsAffected = personRow
			? await spreadsheetManager.updateValue(currentMonthName, personRow, formulaToAdd)
			: await spreadsheetManager.addValue(currentMonthName, [
					person,
					dateToAdd,
					'comida',
					formulaToAdd
			  ]);

		return rowsAffected;
	} catch (e: any) {
		throw e;
	}
};

export const computeBalance = async (
	month: string,
	spreadsheetManager: ISpreadsheetManager
): Promise<IBalanceDto> => {
	try {
		const sheet = await getHistory(month, spreadsheetManager);
		const history = computeTotalSum(sheet);
		history.carryovers = getCarryOvers(history);
		const balance = new BalanceDto();

		[...history.totals.keys()].forEach((person) => balance.computeBalanceOf(person, history));
		balance.computeDefaulter();
		balance.monthTotal = [...history.totals.values()].reduce((prev, curr) => (prev += curr), 0);
		balance.defaulterTotal = history.totals.get(balance.defaulter) ?? 0;
		balance.getDateRange(history);
		return balance;
	} catch (e: any) {
		throw e;
	}
};

export const logIn = async (
	user: string,
	pass: string,
	jwtManager: IJwtManager
): Promise<{ token: string }> => {
	try {
		if (pass !== env.SECRET) throw error(401, { message: 'Wrong password' });
		const jwt = await jwtManager.generateToken({ user });
		return { token: jwt };
	} catch (e: any) {
		throw e;
	}
};
