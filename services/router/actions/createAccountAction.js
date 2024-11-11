import { redirect } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "services/firebase/firebase.config";

import { createUser } from "services/firebase/db/user";

import { checkFirebaseError, validateSignupCredentials } from "@/utils/auth";
import { createErrorResponse } from "../responses";
import { ValidationError } from "@/utils/errors";
import { storeRedirectData } from "@/utils/storage";

export default async function createAccountAction({ request }) {
  try {
    const formData = Object.fromEntries(await request.formData());
    const { originalPath, email, password, fullName } = formData;

    const { verifiedEmail, verifiedPassword, verifiedFullName } = validateSignupCredentials(email, password, fullName);

    const userCredential = await createUserWithEmailAndPassword(auth, verifiedEmail, verifiedPassword);
    const userId = userCredential.user.uid;

    await createUser(verifiedEmail, verifiedFullName, userId);

    // Message to display on successful account creation
    storeRedirectData("Successfully created an account!", "success");

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
      return createErrorResponse(firebaseError.status, firebaseError.message);
    };

    return createErrorResponse(500, "Couldn't create your account. Please try again");
  }
}