# enforce consistent spacing before and after commas in function declarations and function calls (func-args-comma-spacing)

This rule is basically the same as [comma-spacing][comma-spacing] but scoped to function declarations and function calls.


```js
function (a,b) {}
var foo = (a, b) => true;
```

## Rule Details

[comma-spacing][comma-spacing] doesn't allow different spacing rules per context. This rule, while limited to function parameters and arguments, allows you to override the option at the granularity of node types.


### Options

This rule has an object option:

* `"before": false` (default) disallows spaces before commas
* `"before": true` requires one or more spaces before commas
* `"after": true` (default) requires one or more spaces after commas
* `"after": false` disallows spaces after commas
* `"overrides"` allows overriding spacing rules for the following cases

    * `"ArrowFunctionExpression"`
    * `"CallExpression"`
    * `"FunctionDeclaration"`
    * `"FunctionExpression"`
    * `"NewExpression"`

Examples of **incorrect** code for this rule:

```js
/*eslint func-args-comma-spacing: ["error", { "before": false, "after": true, "overrides": { "FunctionCall": { "after": false } } }]*/

var foo = (a,b) => true; // ArrowFunctionExpression defaults to after: true
foo(a, b); // FunctionCall is overridden with after: false
function foo(a , b) {} // FunctionDeclaration defaults to before: false
var foo = function(a,b) {} // FunctionExpression defaults to after: true
new Foo(a,b); // NewExpression defaults to after: true
```

Examples of **correct** code for this rule:

```js
/*eslint func-args-comma-spacing: ["error", { "before": false, "after": true, "overrides": { "FunctionCall": { "after": false } } }]*/

var foo = (a, b) => true; // ArrowFunctionExpression defaults to after: true
foo(a,b); // FunctionCall is overridden with after: false
function foo(a, b) {} // FunctionDeclaration defaults to before: false
var foo = function(a, b) {} // FunctionExpression defaults to after: true
new Foo(a, b); // NewExpression defaults to after: true
```

## Related Rules

- [comma-spacing][comma-spacing]

[comma-spacing]: https://eslint.org/docs/rules/comma-spacing
