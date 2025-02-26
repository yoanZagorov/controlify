import globals from 'globals';
import sharedConfig from "../shared/eslint.config";

export default [
  {
    ...sharedConfig,
    languageOption: {
      globals: globals.node
    }
  }
]