import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import jest from 'eslint-plugin-jest'
import typescript from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
      '@typescript-eslint': typescript,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...prettier.rules,
      ...typescript.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react/jsx-no-target-blank': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
]
