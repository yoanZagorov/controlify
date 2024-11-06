import { redirect } from "react-router-dom";
import { getAuthUserId } from "services/firebase/db/user";
import { createRedirectResponse, createSuccessResponse } from "../responses";

export default async function loginLoader() {
  const userId = await getAuthUserId();

  if (userId) {
    return redirect("/app");
  }

  return createSuccessResponse();
}