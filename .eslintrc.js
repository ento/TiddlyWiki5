module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 5
	},
	"overrides": [
		{
			"files": [ "editions/test/tiddlers/tests/**/*.js" ],
			"env": { "jasmine": true }
		}
	],
	"ignorePatterns": [
		"boot/sjcl.js",
		"core/modules/utils/base64-utf8/base64-utf8.module.js",
		"core/modules/utils/base64-utf8/base64-utf8.module.min.js",
		"core/modules/utils/diff-match-patch/diff_match_patch.js",
		"core/modules/utils/diff-match-patch/diff_match_patch_uncompressed.js",
		"core/modules/utils/dom/csscolorparser.js",
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
		// Always use braces, even when optional
		"curly": "error",
		// Prefer strict equality checks
		"eqeqeq": "error",
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
		"keyword-spacing": [
			"error",
			{
				/* No space between "if" etc and brackets
				   e.g.
				   // Do:
				   switch(param) {
				   }

				   // Don't:
				   switch (param) {
				   }
				 */
				"overrides": {
					"catch": { "after": false },
					"for": { "after": false },
					"function": { "after": false },
					"if": { "after": false },
					"switch": { "after": false },
					"while": { "after": false }
				}
			}
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
		],
		// Always spaces around binary operators
		"space-infix-ops": "error"
	}
};
