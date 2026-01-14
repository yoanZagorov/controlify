import { HTTP_STATUS_CODES } from '#/constants'

const firebaseAuthErrorsMap = {
  'auth/invalid-email': {
    statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
    message: 'Invalid email format. Please try again',
  },
  'auth/invalid-password': {
    statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
    message: 'Invalid password format. Please try again',
  },
  'auth/invalid-credential': {
    statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
    message: 'Please enter valid credentials',
  },
  'auth/account-exists-with-different-credential': {
    statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
    message: 'Please enter valid credentials',
  },
  'auth/weak-password': {
    statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
    message: 'Your password is too weak. Please choose a stronger one',
  },
  'auth/wrong-password': {
    statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
    message: 'Incorrect password. Please try again',
  },
  'auth/user-not-found': {
    statusCode: HTTP_STATUS_CODES.NOT_FOUND,
    message:
      'No account found with this email address. Please check your email or sign up',
  },
  'auth/null-user': {
    statusCode: HTTP_STATUS_CODES.NOT_FOUND,
    message: 'Something went wrong. Please try again',
  },
  'auth/email-already-in-use': {
    statusCode: HTTP_STATUS_CODES.CONFLICT,
    message: 'Email already in use',
  },
  'auth/email-already-exists': {
    statusCode: HTTP_STATUS_CODES.CONFLICT,
    message: 'Email already in use',
  },
  'auth/credential-already-in-use': {
    statusCode: HTTP_STATUS_CODES.CONFLICT,
    message: 'Email already in use',
  },
  'auth/uid-already-exists': {
    statusCode: HTTP_STATUS_CODES.CONFLICT,
    message: 'Email already in use',
  },
  'auth/too-many-requests': {
    statusCode: HTTP_STATUS_CODES.TOO_MANY_REQUESTS,
    message: 'Too many requests. Please try again later',
  },
  'auth/internal-error': {
    statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    message: 'The server is currently unavailable. Please try again later',
  },
  'auth/network-request-failed': {
    statusCode: HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
    message: 'Network error. Please try again later',
  },
}

export default firebaseAuthErrorsMap
