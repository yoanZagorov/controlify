export default function verifyCredentials(credentials, isSignup = false) {
  const { email, password, fullName } = credentials;

  // Check email validity
  // Regex:
  // Local: Allows [._-] but not at the start and not consecutively
  // Domain: Allows - but not at the start and not consecutively; TLD must be only letters
  const emailRegex = /^[a-z0-9]+(?:[\._-][a-z0-9]+)*@[a-z0-9]+(?:-?[a-z0-9]+)*\.[a-z]{2,10}$/;

  if (email === "") {
    throw new Error("Please provide an email");
  }

  if (email.length <= 2) {
    throw new Error("Email length should be greater than 2 characters");
  }

  const lcEmail = email.toLowerCase();

  if (!emailRegex.test(lcEmail)) {
    throw new Error("Invalid email address");
  }

  // Check password validity
  // Regex: Must include 1 uppercase letter, 1 lowercase letter, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%*!#?&^_])[A-Za-z0-9@$%*!#?&^_]{8,12}$/;

  if (password === "") {
    throw new Error("Please provide a password");
  }

  if (password.length < 8 || password.length > 12) {
    throw new Error("Password length should be between 8 and 12 characters");
  }

  if (!passwordRegex.test(password)) {
    throw new Error("The password should include at least 1 lowercase letter, 1 uppercase letter and 1 special character");
  }


  // Check full name validity
  // Regex: Matches letters from all alphabets, with apostrophes, double names (with hyphens) 
  if (isSignup) {

    const fullNameRegex = /^[\p{L}]{1,2}'?[\p{L}]{1,14}[\s-][\p{L}]{1,2}'?[\p{L}]{1,14}(?:[\s-][\p{L}]{1,2}'?[\p{L}]{1,14}){0,2}$/u;

    if (fullName === "") {
      throw new Error("Please provide a name");
    }

    if (fullName.length < 3) {
      throw new Error("Name length should be greater than 3 characters");
    }

    if (!fullNameRegex.test(fullName)) {
      throw new Error("Invalid name format");
    }
  }

  return { verifiedEmail: lcEmail, verifiedPassword: password, verifiedFullName: isSignup ? fullName : null };

  // Check username validity
  // Regex: Can include letters, digits, - or _ but can't include two consecutive special chars or start and end with them
  //   const usernameRegex = /^(?![_-])(?!.*[-_]{2})[a-zA-Z0-9_-]{3,20}(?<![_-])$/;

  //   const reserved = ["admin", "support", "root", "login", "signup", "home", "null", "undefined", "controlify"];

  //   if (username === "") {
  //     throw new Error("Please provide a username");
  //   }

  //   if (username.length < 3 && username.length > 20) {
  //     throw new Error("username length should be between 3 and 20 characters");
  //   }

  //   if (!usernameRegex.test(username)) {
  //     throw new Error("The username should not include any special characters");
  //   }

  //   const lc_username = username.toLowerCase();
  //   if (reserved.includes(lc_username)) {
  //     throw new Error("Please choose a different username");
  //   }

}