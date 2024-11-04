import { redirect } from "react-router-dom";
import { getAuthUserId } from "services/firebase/db/user";

export default async function authLoader() {
  const authUserId = await getAuthUserId();

  if (authUserId) {
    return redirect("/app");
  }

  return null;
}