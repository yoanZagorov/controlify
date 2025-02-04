import { redirect } from "react-router";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase/firebase.config";

import { checkFirebaseError, checkLoginFields } from "@/utils/auth";
import { ValidationError } from "@/utils/errors";
import { storeRedirectData } from "@/utils/localStorage";
import { createErrorResponse } from "../responses";

export default async function loginAction({ request }) {
  try {
    const formData = Object.fromEntries(await request.formData());
    const { originalPath, email, password } = formData;

    checkLoginFields(email, password);

    await signInWithEmailAndPassword(auth, email, password);

    // Message to display on successful login
    storeRedirectData("Successfully logged in!", "success");

    return redirect(originalPath || "/app");
  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message);
    }

    const firebaseError = checkFirebaseError(error.code);

    if (firebaseError) {
      console.error("firebaseError:", firebaseError);
      return createErrorResponse(firebaseError.statusCode, firebaseError.message);
    };

    return createErrorResponse(500, "Couldn't log you in. Please try again");
  }
}