export interface ISpreadsheet {
	id: string;
	rows: Map<number, Array<ICell<any>>>;

	addRow(rowNum: number, values: Array<ICell<any>>): void;
}

export interface ICell<T> {
	value: T;
}
