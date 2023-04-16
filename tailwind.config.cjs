/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				firasans: ['FiraSans'],
				maitree: ['Maitree'],
				sintony: ['Sintony']
			}
		},
		colors: {
			'gray-nurse': '#d4f0d5' /*Light shades*/,
			'emerald-light': '#46cd75' /*Light accent*/,
			'pewter-light': '#99aca0' /*Main brand color*/,
			'granny-smith-apple': '#a7e28d' /*Dark accent*/,
			'tom-thumb': '#3a5c34' /*Dark shades*/
		}
	},
	plugins: []
};
