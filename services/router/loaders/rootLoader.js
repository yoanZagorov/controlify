import { getAuthUserId } from "services/firebase/db/user";
import { redirect } from "react-router-dom";

export default async function rootLoader() {
  const authUserId = await getAuthUserId();

  if (authUserId) {
    return redirect("/app");
  }

  return redirect("/auth/login");
}