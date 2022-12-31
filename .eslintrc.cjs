// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires, node/no-unpublished-require
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: ['eslint:recommended', 'plugin:node/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  plugins: ['@typescript-eslint'],
});
