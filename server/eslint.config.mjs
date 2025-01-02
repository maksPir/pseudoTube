import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    env: {
      jest: true,
    },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
];
