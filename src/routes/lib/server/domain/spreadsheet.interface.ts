export interface ISpreadsheet {
	id: string;
	rows: Map<number, Array<Cell<any>>>;
}

export interface Cell<T> {
	value: T;
}
