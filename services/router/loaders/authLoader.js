import { redirect } from "react-router-dom";
import { getAuthUserId } from "@/utils/auth";

export default async function authLoader() {
  const authUserId = await getAuthUserId();

  if (authUserId) {
    return redirect("/app");
  }

  return null;
}