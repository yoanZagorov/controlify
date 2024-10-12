import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <h1>Welcome to Controlify!</h1>
      <Link to="auth/login" className="bg-navy text-goldenrod">Log In</Link>
      <Link to="auth/create-account" className="bg-navy text-goldenrod mt-3">Create Account</Link>
    </>
  )
}
