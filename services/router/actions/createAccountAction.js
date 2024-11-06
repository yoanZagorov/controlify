import { redirect } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "services/firebase/firebase.config";

import { createUser } from "services/firebase/db/user";

import { verifyCredentials } from "@/utils/auth";

export default async function createAccountAction({ request }) {
  try {
    const formData = Object.fromEntries(await request.formData());
    const { originalPath, email, password, fullName } = formData;

    const { verifiedEmail, verifiedPassword, verifiedFullName } = verifyCredentials({ email, password, fullName }, true);

    const userCredential = await createUserWithEmailAndPassword(auth, verifiedEmail, verifiedPassword);
    const userId = userCredential.user.uid;

    await createUser(verifiedEmail, verifiedFullName, userId);

    // Message to display on successful account creation
    const redirectData = {
      originalPath: "",
      flashMsg: "Successfully created an account!",
      msgType: "success"
    }

    localStorage.setItem("redirectData", JSON.stringify(redirectData));
    return redirect(originalPath || "/app");
  } catch (error) {
    console.error(error);

    if (error.code === "auth/email-already-in-use") {
      error.message = "Email already in use";
    }

    return { errorMsg: error.message };
  }
}