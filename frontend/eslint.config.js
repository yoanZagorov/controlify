import globals from 'globals'
import { defineConfig } from 'eslint/config'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

import sharedConfig from '../shared/eslint.config.js'

export default defineConfig([
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'], // needed since using React 17+
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.recommended,
  ...sharedConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

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
