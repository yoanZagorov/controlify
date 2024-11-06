import { redirect } from "react-router-dom";
import { getAuthUserId } from "services/firebase/db/user";

export default async function rootLoader() {
  console.log("rootLoader");
  const userId = await getAuthUserId();

  if (!userId) {
    return redirect("/login");
  }

  return redirect("/app");
}