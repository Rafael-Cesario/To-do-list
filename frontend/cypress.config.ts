import { defineConfig } from "cypress";

export default defineConfig({
	component: {
		watchForFileChanges: false,
		devServer: {
			framework: "next",
			bundler: "webpack",
		},
	},

	e2e: {
		baseUrl: "http://localhost:3000/",
		watchForFileChanges: false,
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
