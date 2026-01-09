import { ValidationError } from '../errors'

export default function validateWalletVisibleCategories(categories) {
  if (!Array.isArray(categories)) {
    // Throwing a normal error since this message won't be understandable by the user and it's better to return a generic one
    throw new Error('Visible categories must be an array')
  }

  if (!categories.some((category) => category.isVisible)) {
    throw new ValidationError(
      'There should be at least 1 visible category for the wallet',
    )
  }
}
