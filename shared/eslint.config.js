import { globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

// Export a plain array since defineConfig should be called only once - in the package's config

export default [
  globalIgnores(['**/node_modules/']),
  js.configs.recommended,
  tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  eslintConfigPrettier, // disable rules that would conflict with Prettier
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        // TODO: investigate why this option fails (used to allow tseslint to enforce ts-specific rules)
        projectService: true,
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
]
