const path = require('path');


const extensions = ['.js', '.ts', '.tsx', '.json', '.css', '.scss'];

module.exports = {
    'extends': [
        'next/core-web-vitals'
    ],
    settings: {
        'import/extensions': extensions,
        'import/resolver': {
            alias: {
                map: [
                    ['Components', path.join(__dirname, 'comps')],
                ],
                extensions
            },
            node: {
                extensions
            }
        },
    },
    rules: {
        indent: ['error', 'tab'],
        quotes: ['error', 'single'],
        curly: ['error', 'multi-or-nest',],
        'linebreak-style': ['error', 'unix'],
        'nonblock-statement-body-position': ['error', 'below'],
        'react/jsx-indent': ['error', 'tab'],
        'react/jsx-indent-props': ['error', 'tab'],
        'react/jsx-props-no-spreading': 'off',
        'no-restricted-syntax': 'off',
        'no-mixed-operators': 'off',
        'no-console': 'off',
        'no-shadow': 'off',
        'no-nested-ternary': 'off',
        'no-confusing-arrow': 'off',
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'off',
        'max-len': [
            'error',
            {
                code: 100,
                tabWidth: 4,
                ignoreUrls: true,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'arrow-parens': [
            'error',
            'as-needed',
            {
                requireForBlockBody: false,
            },
        ],
        'object-curly-newline': [
            'error',
            {
                multiline: true,
                consistent: true,
            },
        ],
        'operator-linebreak': [
            'error',
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before',
                },
            },
        ],
        'react/sort-comp': [
            'error',
            {
                order: [
                    'instance-variables',
                    'static-methods',
                    'lifecycle',
                    'everything-else',
                    'rendering',
                ],
            },
        ],
        'no-multiple-empty-lines': [
            'warn',
            {
                max: 2,
            },
        ],
        'import/newline-after-import': [
            'error',
            {
                count: 2,
            },
        ],
        'import/order': [
            'warn',
            {
                groups: [
                    [
                        'builtin',
                        'external',
                    ],
                    'internal',
                    [
                        'parent',
                        'sibling',
                        'index',
                    ],
                ],
                'newlines-between': 'always',
            },
        ],
    }
}
