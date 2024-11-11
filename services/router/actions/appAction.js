import { signOut } from "firebase/auth";
import { storeRedirectData } from "@/utils/storage";
import { redirect } from "react-router-dom";
import { auth } from "services/firebase/firebase.config";
import { createErrorResponse } from "../responses";

export default async function appAction({ request }) {
  const formData = Object.fromEntries(await request.formData());

  const { intent } = formData;

  if (intent === "logout") {
    try {
      throw new Error("Kaboom");
      await signOut(auth);

      storeRedirectData("Successfully logged out!", "success");
      return redirect("/login");
    } catch (error) {
      console.error(error);
      return createErrorResponse(500, "Couldn't sign you out. Please try again");
    }
  }
}