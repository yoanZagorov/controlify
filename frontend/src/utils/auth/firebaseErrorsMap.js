const firebaseErrorsMap = {
  "auth/email-already-in-use": { statusCode: 409, message: "Email already in use" },
  "auth/email-already-exists": { statusCode: 409, message: "Email already in use" },
  "auth/credential-already-in-use": { statusCode: 409, message: "Email already in use" },
  "auth/uid-already-exists": { statusCode: 409, message: "Email already in use" },
  "auth/invalid-email": { statusCode: 400, message: "Invalid email format. Please try again" },
  "auth/invalid-password": { statusCode: 400, message: "Invalid password format. Please try again" },
  "auth/invalid-credential": { statusCode: 400, message: "Please enter valid credentials" },
  "auth/account-exists-with-different-credential": { statusCode: 400, message: "Please enter valid credentials" },
  "auth/weak-password": { statusCode: 400, message: "Your password is too weak. Please choose a stronger one" },
  "auth/internal-error": { statusCode: 500, message: "The server is currently unavailable. Please try again later" },
  "auth/network-request-failed": { statusCode: 503, message: "Network error. Please try again later" },
  "auth/user-not-found": { statusCode: 404, message: "No account found with this email address. Please check your email or sign up." },
  "auth/wrong-password": { statusCode: 401, message: "Incorrect password. Please try again" },
  "auth/null-user": { statusCode: 404, message: "Something went wrong. Please try again" },
  "auth/too-many-requests": { statusCode: 429, message: "Too many requests. Please try again later" },
}

export default firebaseErrorsMap;