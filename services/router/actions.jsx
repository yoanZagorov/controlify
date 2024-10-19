import { redirect } from "react-router-dom";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { verifyCredentials, checkUser } from "@/utils/auth";
import { auth } from "services/firebase";

export async function createAccountAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    const { verifiedEmail, verifiedPassword, verifiedUsername } = verifyCredentials({ email, password, username });

    const { user: newUser } = await createUserWithEmailAndPassword(auth, verifiedEmail, verifiedPassword);

    updateProfile(newUser, {
      displayName: verifiedUsername
    })

    // Message to display on successful account creation
    sessionStorage.setItem("createAccountMsg", "Successfully created an account!");

    return redirect("/app");

  } catch (error) {
    console.error(error);

    if (error.code === "auth/email-already-in-use") {
      error.message = "Email already in use";
    }

    return { errorMsg: error.message };
  }
}

export async function loginAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const { checkedEmail, checkedPassword } = checkUser({ email, password });
    await signInWithEmailAndPassword(auth, checkedEmail, checkedPassword);

    // Message to display on successful login
    sessionStorage.setItem("loginMsg", "Successfully logged in!");
    return redirect("/app");
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