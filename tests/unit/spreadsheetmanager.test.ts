import { describe, it, expect, beforeAll, vi } from 'vitest';
import Spreadsheet, { Cell } from '../../src/routes/lib/server/domain/Spreadhseet';
import AuthManager from '../../src/routes/lib/server/infrastructure/auth/AuthManager';
import type { IAuthManager } from '../../src/routes/lib/server/infrastructure/auth/authmanager.interface';
import SpreadsheetManager from '../../src/routes/lib/server/infrastructure/spreadsheets/SpreadsheetManager';
import type { ISpreadsheetManager } from '../../src/routes/lib/server/infrastructure/spreadsheets/spreadsheetmanager.interface';

describe('Spreadsheets Manager tests', () => {
	let spreadsheetManager: ISpreadsheetManager;
	let authManager: IAuthManager;

	beforeAll(() => {
		authManager = new AuthManager();
	});

	it('SpreadsheetManager is initialized successfully without providing sheet', () => {
		spreadsheetManager = new SpreadsheetManager(authManager);
		expect(spreadsheetManager.isClientInit()).toBeTruthy();
	});

	it('SpreadsheetManager is initialized successfully providing a sample sheet', () => {
		const spreadsheet = new Spreadsheet();
		spreadsheetManager = new SpreadsheetManager(authManager, spreadsheet);
		expect(spreadsheetManager.isClientInit()).toBeTruthy();
	});

	it('SpreadsheetManager given a ISpreadsheet Dto maps it correctly to domain Spreadsheet object', () => {
		spreadsheetManager = new SpreadsheetManager(authManager);

		const sampleSheet = {
			data: {
				values: [
					['Persona', 'Fecha', 'Categoria', 'Valor'],
					['claudita', 'N.A.', 'carryover', '-310,11'],
					['ofontito', 'N.A.', 'carryover', '310,11']
				]
			}
		}

		const expectedSheet = new Spreadsheet('randomId');
		expectedSheet.addRow(
			0,
			[new Cell<string>('Persona'), new Cell<string>('Fecha'), new Cell<string>('Categoria'),
				new Cell<string>('Valor')]
		);
		expectedSheet.addRow(
			1,
			[new Cell<string>('claudita'), new Cell<string>('N.A.'), new Cell<string>('carryover'),
				new Cell<string>('-310,11')]
		);
		expectedSheet.addRow(
			2,
			[new Cell<string>('ofontito'), new Cell<string>('N.A.'), new Cell<string>('carryover'),
				new Cell<string>('310,11')]
		);

		const result = spreadsheetManager.toSpreadSheet('randomId', sampleSheet);

		expect(result).toEqual(expectedSheet);
	});

	it('SpreadsheetManager is able to add a value to a spreadsheet', async () => {
		const spreadsheet = new Spreadsheet('randomId');
		spreadsheetManager = new SpreadsheetManager(authManager, spreadsheet);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const googleClient = spreadsheetManager['spreadsheetsClient'];
		const googleClientSpy = vi.spyOn(googleClient.spreadsheets.values, 'append');
		googleClientSpy.mockImplementation(() => { return { data:{ updated: { updatedRows: 1 } } } });

		await spreadsheetManager.addValue('January', ['ofontito', '10/06/2024', '12,05']);
		expect(googleClientSpy).toHaveBeenCalledOnce();
	});

	it('SpreadsheetManager is able to update a value in a spreadsheet', async () => {
		const spreadsheet = new Spreadsheet('randomId');
		spreadsheetManager = new SpreadsheetManager(authManager, spreadsheet);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const googleClient = spreadsheetManager['spreadsheetsClient'];
		const googleClientSpy = vi.spyOn(googleClient.spreadsheets.values, 'update');
		googleClientSpy.mockImplementation(() => { return { data:{ updated: { updatedRows: 1 } } } });

		await spreadsheetManager.updateValue('January', new Map([
			[2, [new Cell('ofontito'), new Cell('10/06/2024'), new Cell('30.75')]]
		]), '33.5');
		expect(googleClientSpy).toHaveBeenCalledOnce();
	});

	it('SpreadsheetManager is able to create a new tab in a spreadsheet', async () => {
		const spreadsheet = new Spreadsheet('randomId');
		spreadsheetManager = new SpreadsheetManager(authManager, spreadsheet);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const googleClient = spreadsheetManager['spreadsheetsClient'];
		const googleClientSpy = vi.spyOn(googleClient.spreadsheets, 'batchUpdate');
		googleClientSpy.mockImplementation(() => { return {} });

		await spreadsheetManager.createTab('February');
		expect(googleClientSpy).toHaveBeenCalledOnce();
	});

	it('SpreadsheetManager is able to read the data of a spreadsheet', async () => {
		const spreadsheet = new Spreadsheet('randomId');
		spreadsheetManager = new SpreadsheetManager(authManager, spreadsheet);

		const sampleSheet = {
			data: {
				values: [
					['Persona', 'Fecha', 'Categoria', 'Valor'],
					['claudita', 'N.A.', 'carryover', '-310,11'],
					['ofontito', 'N.A.', 'carryover', '310,11']
				]
			}
		}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const googleClient = spreadsheetManager['spreadsheetsClient'];
		const googleClientSpy = vi.spyOn(googleClient.spreadsheets.values, 'get');
		googleClientSpy.mockImplementation(() => { return sampleSheet });

		await spreadsheetManager.readSheet('randomId', 'EneroA!12');
		expect(googleClientSpy).toHaveBeenCalledOnce();
	});

	it('SpreadsheetManager is able to read the names of a spreadsheet', async () => {
		const spreadsheet = new Spreadsheet('randomId');
		spreadsheetManager = new SpreadsheetManager(authManager, spreadsheet);

		const sampleSheetsData = {
			data: {
				sheets: [
					{
						properties: {
							title: 'Compra 2024 <3'
						}
					}
				]
			}
		}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const googleClient = spreadsheetManager['spreadsheetsClient'];
		const googleClientSpy = vi.spyOn(googleClient.spreadsheets, 'get');
		googleClientSpy.mockImplementation(() => { return sampleSheetsData });

		const names = await spreadsheetManager.getSheetNames();
		expect(names.pop()).toEqual('Compra 2024 <3');
	});
});
