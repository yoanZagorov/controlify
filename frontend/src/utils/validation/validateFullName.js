import { VALIDATION_RULES } from "@/constants";
import { ValidationError } from "@/utils/errors";

export default function validateFullName(fullName) {
  if (!fullName) {
    throw new ValidationError("Please provide a full name");
  }

  if (fullName.length < VALIDATION_RULES.FULL_NAME.MIN_LENGTH) {
    throw new ValidationError(`Full name length should be greater than ${VALIDATION_RULES.FULL_NAME.MIN_LENGTH - 1} characters. Please try with a longer one`);
  }

  if (fullName.length > VALIDATION_RULES.FULL_NAME.MAX_LENGTH) {
    throw new ValidationError(`Full name length should be less than ${VALIDATION_RULES.FULL_NAME.MAX_LENGTH + 1} characters. Please try with a shorter one`);
  }

  if (!VALIDATION_RULES.FULL_NAME.REGEX.test(fullName)) {
    throw new ValidationError("Invalid full name format. Please try again");
  }
}