import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: 3000,
	},
	plugins: [
		sveltekit(),
		VitePWA({
			devOptions: {
				enabled: true,
			},
			registerType: "autoUpdate",
			manifest: {
				id: "/?source=pwa",
				name: "Netify",
				short_name: "Netify",
				description: "Моё крутое Netify приложение",
				theme_color: "#ffffff",
				background_color: "#ffffff",
				buildBase: "/",
				start_url: "/?source=pwa",
				display: "fullscreen",
				scope: "/",
				icons: [
					{
						src: "/images/icons/pwa/icon-192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/images/icons/pwa/icon-512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
				"screenshots": [
					{
						"src": "/images/icons/pwa/icon-512.png",
						"type": "image/png",
						"sizes": "512x512",
						"form_factor": "wide",
					},
					{
						"src": "/images/icons/pwa/icon-512.png",
						"type": "image/png",
						"sizes": "512x512",
						"form_factor": "narrow",
					}
				]
			},
		}),
	],
});
