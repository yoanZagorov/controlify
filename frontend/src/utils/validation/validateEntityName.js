import { VALIDATION_RULES } from "@/constants";
import { ValidationError } from "../errors";
import { capitalize } from "../str";

export default function validateEntityName({ name, entity, minLength, maxLength, regex }) {
  if (!name) {
    throw new ValidationError(`${capitalize(entity)} name should not be empty!`);
  }

  if (name.length < minLength) {
    throw new ValidationError(`${capitalize(entity)} name length should be greater than ${minLength - 1} characters. Please try with a longer one`);
  }

  if (name.length > maxLength) {
    throw new ValidationError(`${capitalize(entity)} name length should be less than ${maxLength + 1} characters. Please try with a shorter one`);
  }

  if (!regex.test(name)) {
    throw new ValidationError(`${capitalize(entity)} name can only include letters, numbers, spaces, and '._-`);
  }

  if (VALIDATION_RULES.RESERVED_WORDS.includes(name.toLowerCase())) {
    throw new ValidationError("Invalid name. Please choose another one");
  }
}