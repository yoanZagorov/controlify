import { getAuthUserId } from "@/services/firebase/db/user";
import { redirect } from "react-router";
import { checkUserAuthStatus } from "../utils/auth";

export default async function dashboardLoader({ request }) {
  const userId = await getAuthUserId();
  if (!checkUserAuthStatus(userId, request.url)) {
    return redirect("/login");
  }

  return null;
}

