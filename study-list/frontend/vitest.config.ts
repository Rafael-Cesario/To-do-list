import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react(), tsconfigPaths()],

	test: {
        environment: "jsdom",
		globals: true,
		watch: false,
		css: false,
		// reporters: "verbose",
		// exclude: ["node_modules", "**/__utils__/**"],
		// setupFiles: ["./setupTests.ts"],
	},
});