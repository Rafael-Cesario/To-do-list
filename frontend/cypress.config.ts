import { defineConfig } from "cypress";

export default defineConfig({
	component: {
		reporter: "list",
		watchForFileChanges: false,
		devServer: { framework: "next", bundler: "webpack" },
	},

	e2e: {
		reporter: "list",
		watchForFileChanges: false,
		baseUrl: "http://localhost:3000/",
	},
});
