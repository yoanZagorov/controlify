// Email regex:
// Local: Allows [._-] but not at the start and not consecutively
// Domain: Allows subdomains; Allows - but not at the start and not consecutively; TLD must be only letters

// Password regex:
// Must include 1 uppercase letter, 1 lowercase letter, 1 special character

// Full name regex
// Matches letters from all alphabets, with apostrophes, double names (with hyphens)

const VALIDATION_RULES = {
  EMAIL: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 255,
    REGEX:
      /^[a-z0-9]+(?:[\._-][a-z0-9]+)*@[a-z0-9]+(?:[\.-]?[a-z0-9]+)*\.[a-z]{2,10}$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 12,
    REGEX:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%*!#?&^_])[A-Za-z0-9@$%*!#?&^_]{8,12}$/,
  },
  FULL_NAME: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 50,
    REGEX:
      /^[\p{L}]{1,2}'?[\p{L}]{1,14}[\s-][\p{L}]{1,2}'?[\p{L}]{1,14}(?:[\s-][\p{L}]{1,2}'?[\p{L}]{1,14}){0,2}$/u,
  },
  WALLET: {
    NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 30,
      CLIENT_REGEX: /^[a-zA-Z0-9 '._-]+$/,
      REGEX: /^[a-zA-Z0-9 '._-]{2,30}$/,
    },
    INITIAL_BALANCE: {
      MIN_AMOUNT: 0,
      MAX_AMOUNT: 999999.99,
    },
  },
  TRANSACTION: {
    AMOUNT: {
      MIN_AMOUNT: 1,
      MAX_AMOUNT: 999999.99,
    },
  },
  CATEGORY: {
    NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 30,
      CLIENT_REGEX: /^[a-zA-Z0-9 '._-]+$/,
      REGEX: /^[a-zA-Z0-9 '._-]{2,30}$/,
    },
  },
  AMOUNT: {
    REGEX: /^\d{1,6}(?:\.\d{1,2})?$/,
    LEADING_ZERO_REGEX: /^0\d{1,6}(?:\.\d{1,2})?$/,
  },
  CURRENCY_CODE_REGEX: /^[A-Z]{3}$/,
  HEX_COLOR_CODE_REGEX: /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
  RESERVED_WORDS: [
    'deleted',
    'updated',
    'system',
    'all',
    'none',
    'deleted',
    'archived',
    'unknown',
    'admin',
    'root',
    'user',
    'account',
    'balance',
    'null',
    'undefined',
    'true',
    'false',
    'select',
    'insert',
  ],
}

export default VALIDATION_RULES
