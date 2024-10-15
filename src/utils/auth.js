export function verifyCredentials(credentials) {
  const { email, password } = credentials;
  // Check email validity
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@[\w-]+\.[a-z]{2,10}$/;

  if (email === "") {
    throw new Error("Please provide an email");
  }

  const lc_email = email.toLowerCase();

  if (lc_email.length <= 2) {
    throw new Error("Email length should be greater than 2 characters");
  }

  if (!emailRegex.test(lc_email)) {
    throw new Error("Invalid email address");
  }

  // Check password validity
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%*!#?&^_])[A-Za-z\d@$%*!#?&^_]{8,12}$/;

  if (password === "") {
    throw new Error("Please provide a password");
  }

  if (password.length < 8 || password.length > 12) {
    throw new Error("Password should be between 8 and 12 characters");
  }

  if (!passwordRegex.test(password)) {
    throw new Error("The password should include at least 1 lowercase letter, 1 uppercase letter and 1 special character");
  }

  console.log("Successfully created account!");

  return { verifiedEmail: lc_email, verifiedPassword: password };
}