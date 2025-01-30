import { ValidationError } from "../errors";

export default function validateEmail(email) {
  // Regex:
  // Local: Allows [._-] but not at the start and not consecutively
  // Domain: Allows - but not at the start and not consecutively; TLD must be only letters
  const emailRegex = /^[a-z0-9]+(?:[\._-][a-z0-9]+)*@[a-z0-9]+(?:-?[a-z0-9]+)*\.[a-z]{2,10}$/;

  if (!email) {
    throw new ValidationError("Email should not be empty!");
  }

  if (email.length <= 2) {
    throw new ValidationError("Email length should be greater than 2 characters");
  }

  if (!emailRegex.test(email)) {
    throw new ValidationError("Invalid email address!");
  }
}