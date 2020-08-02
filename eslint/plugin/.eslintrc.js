const path = require("path");

module.exports = {
    plugins: [
        "eslint-plugin"
    ],
    extends: [
        "plugin:eslint-plugin/recommended"
    ],
    rules: {
        "import/no-extraneous-dependencies": [
            "error",
            {
                devDependencies: [
                    path.join(__dirname, "tests/**")
                ]
            }
        ]
    }
};
