import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

// The way configurations are extended (using plugins and extends) seems strange according to the plugin docs,
// but right according to the ESLint docs themselves. See more here: https://eslint.org/docs/latest/use/configure/configuration-files#when-to-use-extends-vs-cascading

export default defineConfig([
  globalIgnores(['**/node_modules/']),
  eslintConfigPrettier, // disable rules that would conflict with Prettier
  {
    files: ['**/*.{ts,js}'],

    plugins: {
      js,
      tseslint,
      importPlugin, // used for file import rules
    },

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],

    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // TODO: investigate why this option fails (used to allow tseslint to enforce ts-specific rules)
        // projectService: true,
      },
    },

    rules: {
      // Custom import ordering
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ],
    },

    settings: {
      'import/resolver': { typescript: {} }, // need this to allow the import plugin to resolve imports with ts
    },
  },
])
