import { defineConfig } from "cypress";

export default defineConfig({
	component: {
		watchForFileChanges: false,
		testIsolation: true,
		reporter: "list",
		devServer: { framework: "next", bundler: "webpack" },
	},

	e2e: {
		watchForFileChanges: false,
		testIsolation: true,
		reporter: "list",
		baseUrl: "http://localhost:3000/",
	},
});
