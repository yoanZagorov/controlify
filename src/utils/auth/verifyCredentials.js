export default function verifyCredentials(credentials) {
  const { email, password, username } = credentials;

  // Check email validity
  // Regex:
    // Local: Allows [._-] but not at the start and not consecutively
    // Domain: Allows - but not at the start and not consecutively; TLD must be only letters and between 2 and 10 letters
  const emailRegex = /^[a-z0-9]+(?:[\._-][a-z0-9]+)*@[a-z0-9]+(?:-?[a-z0-9]+)*\.[a-z]{2,10}$/;

  if (email === "") {
    throw new Error("Please provide an email");
  }

  if (email.length <= 2) {
    throw new Error("Email length should be greater than 2 characters");
  }
  
  const lc_email = email.toLowerCase();

  if (!emailRegex.test(lc_email)) {
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
  
  // Check username validity
  // Regex: Can include letters, digits, - or _ but can't include two consecutive special chars or start and end with them
  const usernameRegex = /^(?![_-])(?!.*[-_]{2})[a-zA-Z0-9_-]{3,20}(?<![_-])$/;

  const reserved = ["admin", "support", "root", "login", "signup", "home", "null", "undefined", "controlify"];

  if (username === "") {
    throw new Error("Please provide a username");
  }
  
  if (username.length < 3 && username.length > 20) {
    throw new Error("Username length should be between 3 and 20 characters");
  }

  if (!usernameRegex.test(username)) {
    throw new Error("The username should not include any special characters");
  }
  
  const lc_username = username.toLowerCase();
  if (reserved.includes(lc_username)) {
    throw new Error("Please choose a different username");
  }

  console.log("Successfully created account!");

  return { verifiedEmail: lc_email, verifiedPassword: password, verifiedUsername: username };
}