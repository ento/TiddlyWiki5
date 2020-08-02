module.exports = {
    env: {
        browser: true,
        commonjs: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 5
    },
    overrides: [
        {
            files: ["editions/test/tiddlers/tests/**/*.js"],
            env: { jasmine: true }
        }
    ],
    ignorePatterns: [
        "boot/sjcl.js",
        "core/modules/utils/base64-utf8/base64-utf8.module.js",
        "core/modules/utils/base64-utf8/base64-utf8.module.min.js",
        "core/modules/utils/diff-match-patch/diff_match_patch.js",
        "core/modules/utils/diff-match-patch/diff_match_patch_uncompressed.js",
        "core/modules/utils/dom/csscolorparser.js",
        "plugins/tiddlywiki/*/files/**/*.js"
    ],
    rules: {
        /* // Do:
           if (foo) {
           } else {
           }
           // Don't:
           if (foo) {
           }
           else {
           }
        */
        "brace-style": "error",
        // Proper sentence capitalisation for comments
        "capitalized-comments": [
            "error",
            "always",
            // First line must be capitalized,
            // while subsequent comments are ignored.
            { ignoreConsecutiveComments: true }
        ],
        // Always use braces, even when optional
        curly: "error",
        // Prefer strict equality checks
        eqeqeq: "error",
        // No whitespace within function parameters
        "func-args-comma-spacing": [
            "error",
            { after: false }
        ],
        // Use tabs for indenting.
        indent: [
            "error",
            "tab",
            {
                /* // Do:
                   switch(foo) {
                       case 1:
                       break;
                   }
                   // Don't:
                   switch(foo) {
                   case 1:
                   break;
                   }
                */
                SwitchCase: 1,
                /* // Do:
                   (function(){
                   export.foo = 1;
                   })();

                   // Don't:
                   (function(){
                       export.foo = 1;
                   })();
                */
                outerIIFEBody: 0,
            }
        ],
        /* No space between "if" etc and brackets
           e.g.
           // Do:
           switch(param) {
           }

           // Don't:
           switch (param) {
           }
        */
        "keyword-spacing": [
            "error",
            {
                overrides: {
                    catch: { after: false },
                    for: { after: false },
                    function: { after: false },
                    if: { after: false },
                    switch: { after: false },
                    while: { after: false }
                }
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        // One blank line is used to separate blocks of code.
        // As a rule of thumb, occasional blank lines are permitted within blocks
        // for clarity, but should be avoided unless they solve a specific readability problem.
        "no-multiple-empty-lines": [
            "error",
            { max: 1 }
        ],
        // Double quotes are preferred over single quotes for string literals.
        quotes: [
            "error",
            "double"
        ],
        // Always use semicolons
        semi: [
            "error",
            "always"
        ],
        // Always spaces around binary operators
        "space-infix-ops": "error",
        // Disallow unused variables
        "no-unused-vars": [
            "error",
            // Allow global variables, including those declared
            // in /*global*/ comments to be unused in the file.
            { vars: "local" }
        ]
    }
};
