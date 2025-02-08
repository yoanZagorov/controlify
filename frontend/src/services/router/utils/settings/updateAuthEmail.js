import { getAuthUser } from "@/services/firebase/auth";
import { auth } from "@/services/firebase/firebase.config";
import { storeRedirectData } from "@/utils/localStorage";
import { sendEmailVerification, signOut, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { redirect } from "react-router";

export default async function updateAuthEmail(email) {
  const authUser = await getAuthUser();

  try {
    await verifyBeforeUpdateEmail(authUser, email);

    storeRedirectData("Please check your inbox and verify your new email address to finalize the update.", "notification", "/app/settings");
    await signOut(auth);
    return redirect("/login");
  } catch (error) {
    console.error(error);

    if (error.code === "auth/requires-recent-login") {
      storeRedirectData("This change requires a recent login. Please log in with your old email address and try again.", "notification", "/app/settings");
      await signOut(auth);
      return redirect("/login");
    }

    throw new Error("Unable to update your email address. Please try again.");
  }
}