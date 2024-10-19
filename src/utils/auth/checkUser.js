export default function checkUser(credentials) {
  const { email, password } = credentials;

  if (email === "") {
    throw new Error("Please provide an email");
  }

  const lc_email = email.toLowerCase();

  if (password === "") {
    throw new Error("Please provide a password");
  }

  return { checkedEmail: lc_email, checkedPassword: password };
}