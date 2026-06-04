const tseslint = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    ignores: ['dist/**', 'eslint.config.js', 'node_modules/**'],
  },
  {
    files: ['src/**/*.ts', 'test/**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
    ],
    ...eslintPluginPrettierRecommended,
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
  },
);
