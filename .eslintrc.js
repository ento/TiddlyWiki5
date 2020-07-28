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
