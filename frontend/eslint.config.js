import globals from 'globals'
import { defineConfig } from 'eslint/config'

import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

import sharedConfig from '../shared/eslint.config.js'

export default defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['dist'],

    plugins: {
      react,
      reactHooks,
      reactRefresh, // ensure react-refresh (hot component reloading) works properly
    },

    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'], // used, since using React 17+
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.recommended,
      sharedConfig,
    ],

    languageOptions: {
      globals: {
        ...globals.browser, // additional global variables
      },
    },

    settings: { react: { version: 'detect' } },

    rules: {
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
])
