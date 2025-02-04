import { redirect } from "react-router";
import { getAuthUserId } from "@/services/firebase/db/user";
import { checkUserAuthStatus } from "../utils/auth";

export default async function rootLoader({ request }) {
  const userId = await getAuthUserId();
  if (!checkUserAuthStatus(userId, request.url)) {
    return redirect("/login");
  }

  return redirect("/app");
}