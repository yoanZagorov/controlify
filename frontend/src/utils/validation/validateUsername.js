import { ValidationError } from "../errors";

// Currently not used but could come in handy if decided to implement usernames
export default function validateUsername(username) {
  // Regex: Can include letters, digits, - or _ but can't include two consecutive special chars or start and end with them
  const usernameRegex = /^(?![_-])(?!.*[-_]{2})[a-zA-Z0-9_-]{3,20}(?<![_-])$/;

  const reserved = ["admin", "support", "root", "login", "signup", "home", "null", "undefined", "controlify"];

  if (username === "") {
    throw new ValidationError("Please provide a username");
  }

  if (username.length < 3 && username.length > 20) {
    throw new ValidationError("username length should be between 3 and 20 characters");
  }

  if (!usernameRegex.test(username)) {
    throw new ValidationError("The username should not include any special characters");
  }

  const lc_username = username.toLowerCase();
  if (reserved.includes(lc_username)) {
    throw new ValidationError("Please choose a different username");
  }
}