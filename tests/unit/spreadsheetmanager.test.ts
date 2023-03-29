import { describe, it, expect, beforeAll } from 'vitest';
import Spreadsheet from '../../src/routes/lib/server/domain/Spreadhseet';
import AuthManager from '../../src/routes/lib/server/infrastructure/auth/AuthManager';
import type { IAuthManager } from '../../src/routes/lib/server/infrastructure/auth/authmanager.interface';
import SpreadsheetManager from '../../src/routes/lib/server/infrastructure/spreadsheets/SpreadsheetManager';
import type { ISpreadsheetManager } from '../../src/routes/lib/server/infrastructure/spreadsheets/spreadsheetmanager.interface';

describe('Spreadsheets Manager tests', () => {
	let spreadhseetManager: ISpreadsheetManager;
	let authManager: IAuthManager;

	beforeAll(() => {
		authManager = new AuthManager();
	});

	it('SpreadsheetManager is initialized successfully without providing sheet', () => {
		spreadhseetManager = new SpreadsheetManager(authManager);
		expect(spreadhseetManager.isClientInit()).toBeTruthy();
	});

	it('SpreadsheetManager is initialized successfully providing a sample sheet', () => {
		const spreadsheet = new Spreadsheet();
		spreadhseetManager = new SpreadsheetManager(authManager, spreadsheet);
		expect(spreadhseetManager.isClientInit()).toBeTruthy();
	});

	it('SpreadsheetManager addValue is not implemented yet', () => {
		const spreadsheet = new Spreadsheet();
		spreadhseetManager = new SpreadsheetManager(authManager, spreadsheet);
		expect(spreadhseetManager.addValue('', 2)).toBe(spreadsheet);
	});

	it('SpreadsheetManager updateValue is not implemented yet', () => {
		const spreadsheet = new Spreadsheet();
		spreadhseetManager = new SpreadsheetManager(authManager, spreadsheet);
		expect(spreadhseetManager.updateValue('', 2)).toBe(spreadsheet);
	});

	it('SpreadsheetManager createTab is not implemented yet', () => {
		const spreadsheet = new Spreadsheet();
		spreadhseetManager = new SpreadsheetManager(authManager, spreadsheet);
		expect(spreadhseetManager.createTab('', 'SampleTab')).toBe(spreadsheet);
	});

	it('SpreadsheetManager createSheet is not implemented yet', () => {
		const spreadsheet = new Spreadsheet();
		spreadhseetManager = new SpreadsheetManager(authManager, spreadsheet);
		expect(spreadhseetManager.createSheet('SAMPLESHEET')).toBe(spreadsheet);
	});
});
