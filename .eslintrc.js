module.exports = {
	"extends": [
		"eslint:recommended",
		// TiddlyWiki-specific rules
		"./eslint/base.config.js",
		// List of ignored files while we work on fixing all code style inconsistencies
		"./eslint/todo.config.js"
	]
};
