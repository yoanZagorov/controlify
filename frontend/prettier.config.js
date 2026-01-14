// Extend if necessary
import sharedConfig from '../shared/prettier.config.js'

export default {
  ...sharedConfig,
  plugins: ['prettier-plugin-tailwindcss'],
}
