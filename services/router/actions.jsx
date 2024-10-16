import { redirect } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { verifyCredentials } from "@/utils/auth";
import { auth } from "services/firebase";

export async function createAccountAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    const { verifiedEmail, verifiedPassword, verifiedUsername } = verifyCredentials({ email, password, username });
    const userCredentials = await createUserWithEmailAndPassword(auth, verifiedEmail, verifiedPassword);

    userCredentials.user.displayName = verifiedUsername;

    console.log(userCredentials);
  } catch (error) {
    console.error(error);
    return { errorMsg: error.message };
  }
  
  // Message to display on successfull account creation
  sessionStorage.setItem("createdAccountMessage", "Successfully created an account!");

  return redirect("/app");
}

export async function loginAction() {
  console.log("loginAction");
  return null;
}