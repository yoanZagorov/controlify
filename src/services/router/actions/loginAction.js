import { redirect } from "react-router";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase/firebase.config";

import { checkFirebaseError, checkLoginFields } from "@/utils/auth";
import { createErrorResponse } from "../responses";
import { ValidationError } from "@/utils/errors";
import { storeRedirectData } from "@/utils/storage";

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

    if (error?.options?.cause) {
      console.error("Cause:", error.options.cause);
    }

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message);
    }

    const firebaseError = checkFirebaseError(error.code);

    if (firebaseError) {
      console.log("firebaseError:", firebaseError);
      return createErrorResponse(firebaseError.status, firebaseError.message);
    };

    return createErrorResponse(500, "Couldn't log you in. Please try again");
  }
}