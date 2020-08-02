const path = require("path");

// This directory follows a separate coding style than the rest of the repo
// as it will not be shipped as part of the wiki and following a standard
// style impoves portability.
module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "./plugin/node_modules/eslint-config-airbnb-base/.eslintrc"
    ],
    env: {
        commonjs: true,
        node: true
    },
    // Follow eslint's ecmaVersion
    parserOptions: {
        ecmaVersion: 2020
    },
    settings: {
        "import/resolver": {
            node: {
                moduleDirectory: [
                    path.join(__dirname, "plugin", "node_modules")
                ]
            }
        }
    },
    rules: {
        "import/no-extraneous-dependencies": [
            "error",
            { packageDir: path.join(__dirname, "plugin") }
        ],
        indent: ["error", 4], // Same as TiddlyWiki
        "max-len": ["error", 160], // Same as eslint
        quotes: ["error", "double"], // Same as TiddlyWiki
    }
};
