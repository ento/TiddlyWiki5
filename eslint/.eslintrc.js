const path = require("path");

// This directory follows a separate coding style than the rest of the repo
// as it will not be shipped as part of the wiki and following a standard
// style impoves portability.
module.exports = {
    root: true,
    extends: [
        "eslint:recommended"
    ],
    env: {
        commonjs: true,
        node: true
    },
    // Follow eslint's ecmaVersion
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        indent: ["error", 4], // Same as TiddlyWiki
        "max-len": ["error", 160], // Same as eslint
        quotes: ["error", "double"], // Same as TiddlyWiki
    }
};
