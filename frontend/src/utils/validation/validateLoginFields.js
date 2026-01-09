import { ValidationError } from '../errors'

export default function validateLoginFields(email, password) {
  if (!email) {
    throw new ValidationError('Please provide an email')
  }

  if (!password) {
    throw new ValidationError('Please provide a password')
  }
}
