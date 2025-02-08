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
    REGEX: /^[a-z0-9]+(?:[\._-][a-z0-9]+)*@[a-z0-9]+(?:[\.-]?[a-z0-9]+)*\.[a-z]{2,10}$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 12,
    REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%*!#?&^_])[A-Za-z0-9@$%*!#?&^_]{8,12}$/,
  },
  FULL_NAME: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 50,
    REGEX: /^[\p{L}]{1,2}'?[\p{L}]{1,14}[\s-][\p{L}]{1,2}'?[\p{L}]{1,14}(?:[\s-][\p{L}]{1,2}'?[\p{L}]{1,14}){0,2}$/u,
  },
  WALLET_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    // To do: REGEX:
  },
}

export default VALIDATION_RULES;