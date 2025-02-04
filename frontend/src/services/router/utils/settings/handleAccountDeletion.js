import { getAuthUser } from "@/services/firebase/db/user";
import { createErrorResponse } from "../../responses";
import { deleteUser, signOut } from "firebase/auth";
import { storeRedirectData } from "@/utils/localStorage";
import { auth, db } from "@/services/firebase/firebase.config";
import { redirect } from "react-router";
import { deleteDoc, doc } from "firebase/firestore";

export default async function handleAccountDeletion() {
  const authUser = await getAuthUser();

  try {
    // Deleting the user doc from Firestore is managed with the Delete User Data Firebase extension
    await deleteUser(authUser);
    storeRedirectData("Successfully deleted your account!", "success");
    return redirect("/create-account");
  } catch (error) {
    console.error(error);

    if (error.code === "auth/requires-recent-login") {
      storeRedirectData("Account deletion requires a recent login. Please log in and try again.", "notification", "/app/settings");
      await signOut(auth);
      return redirect("/login");
    }

    return createErrorResponse(500, "Couldn't delete your account. Please try again.");
  }
}