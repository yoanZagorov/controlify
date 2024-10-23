import { getAuthUser } from "@/utils/auth";
import { redirect } from "react-router-dom";

export default async function rootLoader() {
  const authUser = await getAuthUser();

  if (authUser) {
    return redirect("/app");
  }

  return redirect("/auth/login");
}