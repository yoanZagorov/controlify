import { redirect } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/services/firebase/firebase.config";

import { createUser } from "@/services/firebase/db/user";

import { ValidationError } from "@/utils/errors";
import { storeRedirectData } from "@/utils/localStorage";
import { createErrorResponse } from "../responses";
import { ROUTES } from "@/constants";
import { validateSignupCredentials } from "@/utils/validation";
import { firebaseAuthErrorsMap, getAuthUser, rollbackAuthUserCreation } from "@/services/firebase/auth";

export default async function createAccountAction({ request }) {
  const formData = Object.fromEntries(await request.formData());
  const formattedFormData = {
    ...formData,
    email: formData.email.toLowerCase() // Normalize email
  }
  const { originalPath, email, password, fullName } = formattedFormData;

  try {
    validateSignupCredentials(email, password, fullName);

    const { user: { uid: userId } } = (await createUserWithEmailAndPassword(auth, email, password));

    // Firestore user account creation handled on the backend through Cloud Functions
    await createUser(userId, email, fullName);

    // Message to display on successful account creation
    storeRedirectData("Successfully created an account!", "success");

    return redirect(originalPath || ROUTES.APP);
  } catch (error) {
    console.error(error);

    // Try ensuring some form of atomicity for the operations 
    if (error.message === "Couldn't create the user's Firestore account.") {
      const authUser = await getAuthUser();

      try {
        await rollbackAuthUserCreation(authUser);
      } catch (error) {
        // If here, there is a a misalignment between user entries in Firebase Auth and Firestore
        // To do (Non-MVP): Handle this scenario with a cron job on the backend, clearing "orphaned" users periodically
        return createErrorResponse("There is a temporary issue with our servers. Please try creating your account later.");
      }
    }

    if (error instanceof ValidationError) {
      return createErrorResponse(error.message, error.statusCode);
    }

    const firebaseError = firebaseAuthErrorsMap[error.code];
    if (firebaseError) {
      return createErrorResponse(firebaseError.message, firebaseError.statusCode);
    };

    return createErrorResponse("Couldn't create your account. Please try again.");
  }
}