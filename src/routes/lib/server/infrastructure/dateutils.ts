export interface IDateUtils {
	getTodaysDateString(): string;
	getCurrentMonthName(): string;
	fromEngToSpaDate(date: string): string;
}

interface IMonthToName {
	[key: string]: string;
}

class DateUtils implements IDateUtils {
	private monthToNameOfMonth: IMonthToName = {
		'01': 'Enero',
		'02': 'Febrero',
		'03': 'Marzo',
		'04': 'Abril',
		'05': 'Mayo',
		'06': 'Junio',
		'07': 'Julio',
		'08': 'Agosto',
		'09': 'Septiembre',
		'10': 'Octubre',
		'11': 'Noviembre',
		'12': 'Diciembre'
	};
	getTodaysDateString(): string {
		return new Date()
			.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
			.split(',')
			.shift()!!;
	}

	getCurrentMonthName(): string {
		const todaysDateString = this.getTodaysDateString();
		const monthStrNumber = todaysDateString.split('/')[1]!!;
		return this.monthToNameOfMonth[monthStrNumber];
	}

	fromEngToSpaDate(date: string): string {
		const dateParts = date.split('-');
		return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
	}
}

const dateUtils = new DateUtils();
export default dateUtils;
