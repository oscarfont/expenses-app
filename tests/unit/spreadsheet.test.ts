import { describe, it, expect } from 'vitest';
import Spreadsheet from '../../src/routes/lib/server/domain/Spreadhseet';

describe('Spreadsheets domain object tests', () => {
	it('Spreadsheet object gets created with sample id and empty cells', () => {
		const spreadsheet = new Spreadsheet();
		expect(spreadsheet.id).toBe('SAMPLE_ID');
		expect(spreadsheet.rows.values.length).toBe(0);
	});
});
