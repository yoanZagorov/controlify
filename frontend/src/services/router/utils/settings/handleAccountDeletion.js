import { deleteUser, signOut } from "firebase/auth";
import { redirect } from "react-router";

import { ROUTES } from "#constants";

import { createErrorResponse } from "../../responses";

import { auth } from "#services/firebase/firebase.config";
import { getAuthUser } from "#services/firebase/auth";

import { storeRedirectData } from "#utils/localStorage";

export default async function handleAccountDeletion() {
  const authUser = await getAuthUser();

  try {
    // To do: Delete the user's profile pic from Cloudinary first (if there is one)
    // const {user: profilePic} = await getUser();
    // if (profilePic) {
    //   await deleteProfilePicFromCloudinary(oldUserData.profilePic.publicId);
    // }

    // Deleting the user doc from Firestore is managed with the Delete User Data Firebase extension
    await deleteUser(authUser);
    storeRedirectData("Successfully deleted your account!", "success");
    return redirect(ROUTES.CREATE_ACCOUNT);
  } catch (error) {
    console.error(error);

    // If the error was thrown because the user needs to just log in - catch it and send them to the login page 
    if (error.code === "auth/requires-recent-login") {
      storeRedirectData("Account deletion requires a recent login. Please log in and try again", "notification", ROUTES.SETTINGS);
      await signOut(auth);
      return redirect(ROUTES.LOGIN);
    }

    return createErrorResponse("Couldn't delete your account. Please try again");
  }
}