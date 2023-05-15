import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [sveltekit(), SvelteKitPWA()],
	test: {
		include: ['tests/unit/**/*.{test,spec}.{js,ts}']
	}
});
