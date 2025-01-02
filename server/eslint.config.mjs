import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    // Укажите глобальные переменные для Jest через languageOptions, а не через env
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        test: 'readonly', // Добавьте тестовые глобальные функции
        expect: 'readonly', // Если используете expect
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  pluginJs.configs.recommended,
];
