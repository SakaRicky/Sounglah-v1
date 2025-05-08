module.exports = {
	env: {
		browser: true,
		commonjs: true,
	},
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"prefer-const": "error",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["warn"],
		semi: [2, "always"],
		camelcase: [1],
	},
};

// {
//     "extends": "next/core-web-vitals",
//     // "parser": "@typescript-eslint/parser",
//     "plugins": ["@typescript-eslint"],
//     "rules": {
//       "prefer-const": "error",
//       "no-unused-vars": "off",
//       "@typescript-eslint/no-unused-vars": ["warn"],
//       "semi": [
//         2,
//         "always"
//       ],
//       "camelcase": [
//         1
//       ]
//     }
//   }
