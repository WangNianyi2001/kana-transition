import { defineConfig } from 'vite';

export default defineConfig({
	root: 'src',
	base: '/kana-transition/build',
	build: {
		emptyOutDir: true,
		outDir: '../build',
	},
});