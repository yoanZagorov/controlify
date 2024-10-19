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

    const {user: newUser} = await createUserWithEmailAndPassword(auth, verifiedEmail, verifiedPassword);

    updateProfile(newUser, {
      displayName: verifiedUsername
    })

    // console.log(userCredentials);
  } catch (error) {
    console.error(error);
    return { errorMsg: error.message };
  }

  // Message to display on successful account creation
  sessionStorage.setItem("createAccountMsg", "Successfully created an account!");

  return redirect("/app");
}

export async function loginAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const { checkedEmail, checkedPassword } = checkUser({ email, password });
    const userCredentials = await signInWithEmailAndPassword(auth, checkedEmail, checkedPassword);

    console.log(userCredentials);
  } catch (error) {
    console.error(error);
    return { errorMsg: error.message };
  }

  // Message to display on successful login
  sessionStorage.setItem("loginMsg", "Successfully logged in!");

  return redirect("/app");
}