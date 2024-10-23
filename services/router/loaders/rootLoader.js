import { checkUserStatus } from "@/utils/auth";
import { redirect } from "react-router-dom";

export default async function rootLoader() {
  const isUser = await checkUserStatus();

  if (isUser) {
    return redirect("/app");
  }

  return redirect("/auth/login");
}