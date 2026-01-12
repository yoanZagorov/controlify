import { VALIDATION_RULES } from '#/constants'
import { ValidationError } from '../errors'

export default function validateEmail(email) {
  if (!email) {
    throw new ValidationError('Please provide an email')
  }

  if (email.length < VALIDATION_RULES.EMAIL.MIN_LENGTH) {
    throw new ValidationError(
      `Email length should be greater than ${VALIDATION_RULES.EMAIL.MIN_LENGTH - 1} characters. Please try with a longer one`,
    )
  }

  if (email.length > VALIDATION_RULES.EMAIL.MAX_LENGTH) {
    throw new ValidationError(
      `Email length should be less than ${VALIDATION_RULES.EMAIL.MAX_LENGTH + 1} characters. Please try with a shorter one`,
    )
  }

  if (!VALIDATION_RULES.EMAIL.REGEX.test(email)) {
    throw new ValidationError('Invalid email address format. Please try again')
  }
}
