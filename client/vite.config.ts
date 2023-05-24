import {defineConfig, splitVendorChunkPlugin} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
        splitVendorChunkPlugin(),
        react(),
    ],
    server: {
        origin: "http://localhost:3001",
    },
    build: {
        outDir: "../server/public/",
        manifest: true,
        rollupOptions: {
            input: "src/main.tsx",
        },
    },
});
