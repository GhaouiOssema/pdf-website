import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
			},
			output: {
				manualChunks: undefined,
			},
		},
		assets: {
			publicPath: '/',
			include: ['favicon.svg', 'robots.txt', 'assets/**'], // Add any other assets you want to include
			exclude: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		},
		chunkSizeWarningLimit: 600,
		// Copy _redirects file to build output
		assetsInclude: ['_redirects'],
	},
});
