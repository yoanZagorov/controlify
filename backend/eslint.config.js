import globals from 'globals'
import sharedConfig from '../shared/eslint.config.js'

export default [
  ...sharedConfig,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
]
