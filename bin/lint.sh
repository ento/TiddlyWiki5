#!/usr/bin/env bash

set -euo pipefail

# The eslint dependency is tracked by eslint/plugin/package.json,
# as we want to keep the top-level package.json free of devDependencies.
eslint="eslint/plugin/node_modules/.bin/eslint"
flags="--rulesdir eslint/plugin/lib/rules --resolve-plugins-relative-to eslint/plugin"

if [ ! -x "$eslint" ]; then
    ( cd eslint/plugin && npm install )
fi

if [ "$#" -eq "0" ]; then
    "$eslint" $flags .
else
    "$eslint" $flags "$@"
fi
