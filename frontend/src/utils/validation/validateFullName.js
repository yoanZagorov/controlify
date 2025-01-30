import { ValidationError } from "@/utils/errors";

export default function validateFullName(fullName) {
  // Regex: Matches letters from all alphabets, with apostrophes, double names (with hyphens) 
  const fullNameRegex = /^[\p{L}]{1,2}'?[\p{L}]{1,14}[\s-][\p{L}]{1,2}'?[\p{L}]{1,14}(?:[\s-][\p{L}]{1,2}'?[\p{L}]{1,14}){0,2}$/u;

  if (!fullName) {
    throw new ValidationError("Name should not be empty!");
  }

  if (fullName.length < 3) {
    throw new ValidationError("Name length should be greater than 3 characters!");
  }

  if (!fullNameRegex.test(fullName)) {
    throw new ValidationError("Invalid name format!");
  }
}