import { ValidationError } from "../errors";
import { validateEmail, validateFullName } from "../validation";

export default function validateSignupCredentials(email, password, fullName) {
  // Check email validity
  const lcEmail = email.toLowerCase();
  validateEmail(lcEmail);

  // Check password validity
  // Regex: Must include 1 uppercase letter, 1 lowercase letter, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%*!#?&^_])[A-Za-z0-9@$%*!#?&^_]{8,12}$/;

  if (!password) {
    throw new ValidationError("Please provide a password");
  }

  if (password.length < 8 || password.length > 12) {
    throw new ValidationError("Password length should be between 8 and 12 characters");
  }

  if (!passwordRegex.test(password)) {
    throw new ValidationError("The password should include at least 1 lowercase letter, 1 uppercase letter and 1 special character");
  }

  // Check full name validity
  validateFullName(fullName);

  return { verifiedEmail: lcEmail, verifiedPassword: password, verifiedFullName: fullName };

  // Check username validity
  // Regex: Can include letters, digits, - or _ but can't include two consecutive special chars or start and end with them
  //   const usernameRegex = /^(?![_-])(?!.*[-_]{2})[a-zA-Z0-9_-]{3,20}(?<![_-])$/;

  //   const reserved = ["admin", "support", "root", "login", "signup", "home", "null", "undefined", "controlify"];

  //   if (username === "") {
  //     throw new ValidationError("Please provide a username");
  //   }

  //   if (username.length < 3 && username.length > 20) {
  //     throw new ValidationError("username length should be between 3 and 20 characters");
  //   }

  //   if (!usernameRegex.test(username)) {
  //     throw new ValidationError("The username should not include any special characters");
  //   }

  //   const lc_username = username.toLowerCase();
  //   if (reserved.includes(lc_username)) {
  //     throw new ValidationError("Please choose a different username");
  //   }

}