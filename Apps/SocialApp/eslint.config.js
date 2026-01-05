// @ts-check
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactHooks = require('eslint-plugin-react-hooks');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'android/**',
      'ios/**',
      'dist/**',
      '*.config.js',
      'babel.config.js',
      'metro.config.js',
      'supabase/functions/**', // Deno edge functions have different patterns
      '__tests__/**', // Test files have different patterns
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
    },
    rules: {
      // === CRITICAL: Async/Promise Rules ===
      // Catches promises that aren't awaited or handled
      '@typescript-eslint/no-floating-promises': 'error',

      // Catches promises in wrong contexts (e.g., conditions, void returns)
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            // Allow async event handlers - common in React Native
            attributes: false,
          },
        },
      ],

      // Ensure only thenables are awaited
      '@typescript-eslint/await-thenable': 'error',

      // === React Hooks Rules ===
      // Catches missing dependencies in useEffect/useCallback/useMemo
      'react-hooks/exhaustive-deps': 'warn',

      // Ensures hooks are called at top level, not conditionally
      'react-hooks/rules-of-hooks': 'error',

      // === Optional but Useful ===
      // Prefer async/await over .then() chains (consistency)
      '@typescript-eslint/promise-function-async': 'off', // Too strict for event handlers

      // Require return types on async functions (optional, can be noisy)
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
