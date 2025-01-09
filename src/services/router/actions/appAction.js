import { redirect } from "react-router";
import { signOut } from "firebase/auth";

import { auth } from "@/services/firebase/firebase.config";

import { storeRedirectData } from "@/utils/storage";
import { createErrorResponse } from "../responses";

export default async function appAction({ request }) {
  const formData = Object.fromEntries(await request.formData());

  const { intent } = formData;

  if (intent === "logout") {
    try {
      await signOut(auth);

      storeRedirectData("Successfully logged out!", "success");
      return redirect("/login");
    } catch (error) {
      console.error(error);
      throw createErrorResponse(500, "Couldn't sign you out. Please try again");
    }
  }
}