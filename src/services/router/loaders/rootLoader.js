import { redirect } from "react-router";
import { getAuthUserId } from "@/services/firebase/db/user";

export default async function rootLoader() {
  const userId = await getAuthUserId();

  if (!userId) {
    return redirect("/login");
  }

  return redirect("/app");
}