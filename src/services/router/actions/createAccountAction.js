import { redirect } from "react-router";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";

import { auth } from "@/services/firebase/firebase.config";

import { createUser, getAuthUserId } from "@/services/firebase/db/user";

import { checkFirebaseError, validateSignupCredentials } from "@/utils/auth";
import { ValidationError } from "@/utils/errors";
import { storeRedirectData } from "@/utils/storage";
import { createErrorResponse } from "../responses";

export default async function createAccountAction({ request }) {
  try {
    const formData = Object.fromEntries(await request.formData());
    const { originalPath, email, password, fullName } = formData;

    const { verifiedEmail, verifiedPassword, verifiedFullName } = validateSignupCredentials(email, password, fullName);

    const { user: { uid: userId } } = (await createUserWithEmailAndPassword(auth, verifiedEmail, verifiedPassword));

    await createUser(verifiedEmail, verifiedFullName, userId);

    // Message to display on successful account creation
    storeRedirectData("Successfully created an account!", "success");

    return redirect(originalPath || "/app");
  } catch (error) {
    const authUserId = await getAuthUserId();
    try {
      if (authUserId) {
        await deleteUser(auth.currentUser);
      }
    } catch (deleteError) {
      console.error("Failed to delete auth user:", deleteError);
    }

    console.error(error);

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