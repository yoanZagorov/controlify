import { redirect } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "services/firebase/firebase.config";

import { verifyCredentials } from "@/utils/auth";

export default async function loginAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const { verifiedEmail, verifiedPassword } = verifyCredentials({ email, password });

    await signInWithEmailAndPassword(auth, verifiedEmail, verifiedPassword);

    // Message to display on successful login
    sessionStorage.setItem("loginMsg", "Successfully logged in!");
    return redirect("/");
  } catch (error) {
    console.error(error);

    if (error.code === "auth/invalid-credential") {
      error.message = "Invalid email and/or password";
    } else if (error.code === "auth/too-many-requests") {
      error.message = "Too many requests. Please try again later";
    }
    return { errorMsg: error.message };
  }
}