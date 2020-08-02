# eslint-plugin-tiddlywiki

ESLint rules for TiddlyWiki.

TiddlyWiki's coding style is a compromise between file size and readability.
It deviates from what might be the 'industry standard' of common codebases,
as TiddlyWiki's code is intended to be readable and debuggable by its end-users.

File size matters because TiddlyWiki is shipped as a single HTML file, among
other installation methods. The user may copy the HTML file to a USB stick
or make multiple backups, and every bit counts towards space efficiency for the user.

This compromise is the source of styling choices such as the preference of
tabs over spaces: to indent with four spaces, you need four characters if
you use the space character for indentation, whereas the tab character gets
the job done in just one.

Due to this unique situation, some of TiddlyWiki's coding guidelines cannot
be configured through off-the-shelf config options. This plugin provides custom rules
to support the enforcement of these guidelines.

Although the code found here isn't published to the NPM registry, it follows the
standard ESLint plugin directory structure to give predictability as to where to
find the rule implementation, tests, docs and such.

## Supported Rules

* [`func-args-comma-spacing`](./docs/rules/func-args-comma-spacing.md)
