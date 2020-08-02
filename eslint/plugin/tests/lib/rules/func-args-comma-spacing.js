/**
 * @fileoverview enforce consistent spacing before and after commas in function declarations and function calls
 * @author ento
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/func-args-comma-spacing");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("func-args-comma-spacing", rule, {

    valid: [
        "myfunc(404, true/* bla bla bla */, 'hello');",
        "myfunc(404, true /* bla bla bla */, 'hello');",
        "myfunc(404, true/* bla bla bla *//* hi */, 'hello');",
        "myfunc(404, true/* bla bla bla */ /* hi */, 'hello');",
        "myfunc(404, true, /* bla bla bla */ 'hello');",
        "myfunc(404, // comment\n true, /* bla bla bla */ 'hello');",
        { code: "myfunc(404, // comment\n true,/* bla bla bla */ 'hello');", options: [{ before: false, after: false }] },
        { code: "var foo = a => true", parserOptions: { ecmaVersion: 6 } },
        "var a = 1,b = 2;",
        "var arr = [,];",
        "var obj = {'foo':'bar','baz':'qur'};",
        "function foo(a, b){}",
        { code: "function foo(a, b = 1){}", parserOptions: { ecmaVersion: 6 } },
        { code: "function foo(a = 1, b, c){}", parserOptions: { ecmaVersion: 6 } },
        { code: "var foo = (a, b) => {}", parserOptions: { ecmaVersion: 6 } },
        { code: "var foo = (a=1, b) => {}", parserOptions: { ecmaVersion: 6 } },
        { code: "var foo = a => a + 2", parserOptions: { ecmaVersion: 6 } },
        "a(b, c)",
        "new A(b, c)",
        "foo((a), b)",
        "var b = ((1 + 2),2);",
        "go.boom((a + b), 10)",
        "go.boom((a + b), 10, (4))",
        { code: "fn(a, b,)", parserOptions: { ecmaVersion: 2018 } }, // #11295
        { code: "const fn = (a, b,) => {}", parserOptions: { ecmaVersion: 2018 } }, // #11295
        { code: "const fn = function (a, b,) {}", parserOptions: { ecmaVersion: 2018 } }, // #11295
        { code: "function fn(a, b,) {}", parserOptions: { ecmaVersion: 2018 } }, // #11295
        "foo(/,/, 'a')",
        { code: "function foo(a ,b){}", options: [{ before: true, after: false }] },
        // eslint-disable-next-line no-template-curly-in-string
        { code: "var a; console.log(`${a}`, \"a\");", parserOptions: { ecmaVersion: 6 } },
    ],

    invalid: [
        {
            code: "a(b,c)",
            output: "a(b , c)",
            options: [{ before: true, after: true }],
            errors: [
                {
                    messageId: "missing",
                    data: { loc: "before" },
                    type: "Punctuator"
                },
                {
                    messageId: "missing",
                    data: { loc: "after" },
                    type: "Punctuator"
                }
            ]
        },
        {
            code: "new A(b,c)",
            output: "new A(b , c)",
            options: [{ before: true, after: true }],
            errors: [
                {
                    messageId: "missing",
                    data: { loc: "before" },
                    type: "Punctuator"
                },
                {
                    messageId: "missing",
                    data: { loc: "after" },
                    type: "Punctuator"
                }
            ]
        },
        {
            code: "function foo(a,b){}",
            output: "function foo(a , b){}",
            options: [{ before: true, after: true }],
            errors: [
                {
                    messageId: "missing",
                    data: { loc: "before" },
                    type: "Punctuator"
                },
                {
                    messageId: "missing",
                    data: { loc: "after" },
                    type: "Punctuator"
                }
            ]
        },
        {
            code: "var foo = (a,b) => {}",
            output: "var foo = (a , b) => {}",
            options: [{ before: true, after: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "missing",
                    data: { loc: "before" },
                    type: "Punctuator"
                },
                {
                    messageId: "missing",
                    data: { loc: "after" },
                    type: "Punctuator"
                }
            ]
        },
        {
            code: "var foo = (a = 1,b) => {}",
            output: "var foo = (a = 1 , b) => {}",
            options: [{ before: true, after: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "missing",
                    data: { loc: "before" },
                    type: "Punctuator"
                },
                {
                    messageId: "missing",
                    data: { loc: "after" },
                    type: "Punctuator"
                }
            ]
        },
        {
            code: "var foo = function(a = 1,b) {}",
            output: "var foo = function(a = 1 , b) {}",
            options: [{ before: true, after: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "missing",
                    data: { loc: "before" },
                    type: "Punctuator"
                },
                {
                    messageId: "missing",
                    data: { loc: "after" },
                    type: "Punctuator"
                }
            ]
        },
        {
            code: "function foo(a = 1 ,b = 2) {}",
            output: "function foo(a = 1, b = 2) {}",
            options: [{ before: false, after: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "There should be no space before ','.",
                    type: "Punctuator"
                },
                {
                    messageId: "missing",
                    data: { loc: "after" },
                    type: "Punctuator"
                }
            ]
        },
        {
            code: "<a>{foo(1 ,2)}</a>",
            output: "<a>{foo(1, 2)}</a>",
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } },
            errors: [
                {
                    message: "There should be no space before ','.",
                    type: "Punctuator"
                },
                {
                    messageId: "missing",
                    data: { loc: "after" },
                    type: "Punctuator"
                }
            ]
        },
        {
            code: "myfunc(404, true/* bla bla bla */ , 'hello');",
            output: "myfunc(404, true/* bla bla bla */, 'hello');",
            errors: [
                {
                    message: "There should be no space before ','.",
                    type: "Punctuator"
                }
            ]
        },
        {
            code: "myfunc(404, true,/* bla bla bla */ 'hello');",
            output: "myfunc(404, true, /* bla bla bla */ 'hello');",
            errors: [
                {
                    messageId: "missing",
                    data: { loc: "after" },
                    type: "Punctuator"
                }
            ]
        },
        {
            code: "myfunc(404,// comment\n true, 'hello');",
            output: "myfunc(404, // comment\n true, 'hello');",
            errors: [
                {
                    messageId: "missing",
                    data: { loc: "after" },
                    type: "Punctuator"
                }
            ]
        }
    ]
});
