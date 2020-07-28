module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2020": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 11
	},
	"ignorePatterns": [
		"plugins/tiddlywiki/*/files/**/*.js"
	],
	"rules": {
		"capitalized-comments": [
			"error",
			// Proper sentence capitalisation for comments
			"always",
			// First line must be capitalized,
			// while subsequent comments are ignored.
			{ "ignoreConsecutiveComments": true }
		],
		"indent": [
			"error",
			// Use tabs for indenting.
			"tab",
			/* // Do:
			   (function(){

			   export.foo = 1;

			   })();

			   // Don't:
			   (function(){

			   	export.foo = 1;

			   })();
			 */
			{ "outerIIFEBody": 0 }
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"no-multiple-empty-lines": [
			"error",
			// One blank line is used to separate blocks of code.
			// Occasional blank lines are permitted within blocks for clarity,
			// but should be avoided unless they solve a specific readability problem.
			{ "max": 1 }
		],
		"quotes": [
			"error",
			// Double quotes are preferred over single quotes for string literals.
			"double"
		],
		"semi": [
			"error",
			// Always use semicolons
			"always"
		]
	}
};
