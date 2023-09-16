module.exports = {
	env: { browser: true, es2021: true, node: true },
	extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "next/core-web-vitals"],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		semi: ["warn", "always"],
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-explicit-any": "off",
	},
	globals: {
		React: "readonly",
	},
};
