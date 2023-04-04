import type { Actions } from './$types';

export const actions = {
	default: async ({ request }: { request: Request }) => {
		const data = await request.formData();
		const person = data.get('persona');
		const expense = data.get('gasto');
		//console.log(person);
		//console.log(expense);
	}
} satisfies Actions;
