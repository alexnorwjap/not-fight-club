import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        // Vite globals
        import: 'readonly',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      // Основные правила ESLint
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-debugger': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      // Prettier интеграция
      'prettier/prettier': 'error',

      // Отключаем конфликтующие с Prettier правила
      ...prettierConfig.rules,
    },
  },
  {
    // Исключения для определенных файлов
    ignores: ['dist/**', 'node_modules/**', '*.config.js'],
  },
];
