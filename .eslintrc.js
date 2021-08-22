module.exports = {
    env: {
        browser: false,
        node: true,
        es2021: true
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-unused-vars': 'off',
        'class-methods-use-this': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error']
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts']
            },
            typescript: {
                alwaysTryTypes: true
            }
        }
    }
}
