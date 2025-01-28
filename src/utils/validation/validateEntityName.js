import { ValidationError } from "../errors";
import { capitalize } from "../str";

export default function validateEntityName(entity, name, reservedWords = []) {
  const nameRegex = /^[a-zA-Z0-9 _-]+$/;

  if (!name) {
    throw new ValidationError(`${capitalize(entity)} name should not be empty!`);
  }

  if (name.length <= 2) {
    throw new ValidationError(`${capitalize(entity)} name length should be greater than 2 characters!`);
  }

  if (name.length >= 30) {
    throw new ValidationError(`${capitalize(entity)} name length should be less than 30 characters!`);
  }

  if (!nameRegex.test(name)) {
    throw new ValidationError(`${capitalize(entity)} name can only include letters, numbers, spaces, and - _`);
  }

  if (reservedWords.length && reservedWords.includes(name.toLowerCase())) {
    throw new ValidationError("Invalid name. Please choose another one");
  }
}