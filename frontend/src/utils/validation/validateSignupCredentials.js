import { VALIDATION_RULES } from "@/constants";
import { ValidationError } from "../errors";
import validateEmail from "./validateEmail";
import validateFullName from "./validateFullName";

export default function validateSignupCredentials(email, password, fullName) {
  // Check email validity
  validateEmail(email);

  // Check password validity
  if (!password) {
    throw new ValidationError("Please provide a password");
  }

  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH || password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
    throw new ValidationError(`Password length should be between ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} and ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} characters. Please try again`);
  }

  if (!VALIDATION_RULES.PASSWORD.REGEX.test(password)) {
    throw new ValidationError("The password should include at least 1 lowercase letter, 1 uppercase letter and 1 special character");
  }

  // Check full name validity
  validateFullName(fullName);
}