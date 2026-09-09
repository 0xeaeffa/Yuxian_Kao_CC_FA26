import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	base: '/<REPO>/',
	server: {
		port: 6767,
		host: true,
		allowedHosts: true,
	}
});
