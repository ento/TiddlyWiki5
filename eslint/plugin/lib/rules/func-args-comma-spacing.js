/**
 * @fileoverview enforce consistent spacing before and after commas in
 * function declarations and function calls
 */

// The eslint directory follows airbnb's coding style but the plugin code
// sometimes borrows from eslint's rule implementation, which sometimes
// deviates from airbnb's style. These adjustment(s) make it easier to
// re-use eslint's code more or less as-is.
/* eslint-disable prefer-destructuring */

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const NODE_TYPES = ["ArrowFunctionExpression", "CallExpression", "FunctionDeclaration", "FunctionExpression", "NewExpression"];

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

// A subset of eslint's internal helper
const astUtils = {
    /**
     * Checks if the given token is a closing parenthesis token or not.
     * @param {Token} token The token to check.
     * @returns {boolean} `true` if the token is a closing parenthesis token.
     */
    isClosingParenToken(token) {
        return token.value === ")" && token.type === "Punctuator";
    },

    /**
     * Checks if the given token is a comma token or not.
     * @param {Token} token The token to check.
     * @returns {boolean} `true` if the token is a comma token.
     */
    isCommaToken(token) {
        return token.value === "," && token.type === "Punctuator";
    },

    /**
     * Determines whether two adjacent tokens are on the same line.
     * @param {Object} left The left token object.
     * @param {Object} right The right token object.
     * @returns {boolean} Whether or not the tokens are on the same line.
     * @public
     */
    isTokenOnSameLine(left, right) {
        return left.loc.end.line === right.loc.start.line;
    }
};

/**
 * Parses the option object and determines the spacing rules for each node type.
 * @param {Object|undefined} options The option object to parse.
 * @returns {Object} - Normalized option object.
 *      Keys are supported node types.
 *      Values are instances of `{"before": boolean, "after": boolean}`.
 * @private
 */
function parseOptions(options) {
    const defaultValues = {
        before: options ? options.before : false,
        after: options ? options.after : true
    };
    const overrides = (options && options.overrides) || {};
    const retv = Object.create(null);
    NODE_TYPES.forEach((key) => {
        const override = overrides[key];
        if (override) {
            retv[key] = {
                before: ("before" in override) ? override.before : defaultValues.before,
                after: ("after" in override) ? override.after : defaultValues.after
            };
        } else {
            retv[key] = defaultValues;
        }
    });
    return retv;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "enforce consistent spacing before and after commas in function declarations and function calls",
            category: "Stylistic Issues",
            recommended: false
        },
        fixable: "whitespace",
        schema: [
            {
                type: "object",
                properties: {
                    before: { type: "boolean", default: false },
                    after: { type: "boolean", default: true },
                    overrides: {
                        type: "object",
                        properties: NODE_TYPES.reduce((retv, key) => {
                            // eslint-disable-next-line no-param-reassign
                            retv[key] = {
                                type: "object",
                                properties: {
                                    before: { type: "boolean" },
                                    after: { type: "boolean" }
                                },
                                additionalProperties: false
                            };
                            return retv;
                        }, {}),
                        additionalProperties: false
                    }
                },
                additionalProperties: false
            }
        ],
        messages: {
            missing: "A space is required {{loc}} ','.",
            unexpected: "There should be no space {{loc}} ','."
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        const optionsByNodeType = parseOptions(context.options[0]);

        //----------------------------------------------------------------------
        // Modified helper functions from comma-spacing
        //----------------------------------------------------------------------

        /**
         * Reports a spacing error with an appropriate message.
         * @param {ASTNode} node The binary expression node to report.
         * @param {string} loc Is the error "before" or "after" the comma?
         * @param {ASTNode} otherNode The node at the left or right of `node`
         * @param {object} options Validation options.
         * @returns {void}
         * @private
         */
        function report(node, loc, otherNode, options) {
            context.report({
                node,
                fix(fixer) {
                    if (options[loc]) {
                        if (loc === "before") {
                            return fixer.insertTextBefore(node, " ");
                        }
                        return fixer.insertTextAfter(node, " ");
                    }
                    let start; let
                        end;
                    const newText = "";

                    if (loc === "before") {
                        start = otherNode.range[1];
                        end = node.range[0];
                    } else {
                        start = node.range[1];
                        end = otherNode.range[0];
                    }

                    return fixer.replaceTextRange([start, end], newText);
                },
                messageId: options[loc] ? "missing" : "unexpected",
                data: {
                    loc
                }
            });
        }

        /**
         * Validates the spacing around a comma token.
         * @param {Object} tokens The tokens to be validated.
         * @param {Token} tokens.comma The token representing the comma.
         * @param {Token} [tokens.left] The last token before the comma.
         * @param {Token} [tokens.right] The first token after the comma.
         * @param {Token|ASTNode} reportItem The item to use when reporting an error.
         * @param {Object} options Validation options.
         * @param {boolean} [options.after] Whether there should or should not be
         *   a space after commas
         * @param {boolean} [options.before] Whether there should or should not be
         *   a space before commas.
         * @returns {void}
         * @private
         */
        function validateCommaItemSpacing(tokens, reportItem, options) {
            if (tokens.left && astUtils.isTokenOnSameLine(tokens.left, tokens.comma)
                    && (options.before !== sourceCode.isSpaceBetweenTokens(tokens.left, tokens.comma))
            ) {
                report(reportItem, "before", tokens.left, options);
            }

            if (tokens.right && astUtils.isClosingParenToken(tokens.right)) {
                return;
            }

            if (tokens.right && !options.after && tokens.right.type === "Line") {
                return;
            }

            if (tokens.right && astUtils.isTokenOnSameLine(tokens.comma, tokens.right)
                    && (options.after !== sourceCode.isSpaceBetweenTokens(tokens.comma, tokens.right))
            ) {
                report(reportItem, "after", tokens.right, options);
            }
        }

        function validateTokensAndComments(tokensAndComments, options) {
            tokensAndComments.forEach((token, i) => {
                if (!astUtils.isCommaToken(token)) {
                    return;
                }

                if (token && token.type === "JSXText") {
                    return;
                }

                const previousToken = tokensAndComments[i - 1];
                const nextToken = tokensAndComments[i + 1];

                validateCommaItemSpacing({
                    comma: token,
                    left: astUtils.isCommaToken(previousToken) ? null : previousToken,
                    right: astUtils.isCommaToken(nextToken) ? null : nextToken
                }, token, options);
            });
        }

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Validates nodes that are enclosed in parentheses.
         * @param {ASTNode} nodes Nodes to validate.
         * @param {object} options Validation options.
         * @private
         */
        function validateTokensInParens(nodes, options) {
            if (nodes.length < 2) {
                return;
            }
            const closingParen = sourceCode.getTokenAfter(
                nodes[nodes.length - 1], { filter: astUtils.isClosingParenToken }
            );
            const tokens = sourceCode.getTokensBetween(
                nodes[0], closingParen, { includeComments: true }
            );
            // `count` option of `getTokensBetween` doesn't seem to work well with `includeComments`;
            // manually expand the range of tokens.
            tokens.unshift(nodes[0]);
            tokens.push(closingParen);
            validateTokensAndComments(tokens, options);
        }

        /**
         * Validates a node with `params` of child nodes.
         * @param {ASTNode} node The item to validate.
         * @private
         */
        function validateNodeWithParams(node) {
            validateTokensInParens(node.params, optionsByNodeType[node.type]);
        }

        /**
         * Validates a node with `arguments` of child nodes.
         * @param {ASTNode} node The item to validate.
         * @private
         */
        function validateNodeWithArguments(node) {
            validateTokensInParens(node.arguments, optionsByNodeType[node.type]);
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            ArrowFunctionExpression: validateNodeWithParams,
            CallExpression: validateNodeWithArguments,
            FunctionDeclaration: validateNodeWithParams,
            FunctionExpression: validateNodeWithParams,
            NewExpression: validateNodeWithArguments
        };
    }
};
