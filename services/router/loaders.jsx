import { redirect } from "react-router-dom";

export async function appLoader() {
  const isUser = JSON.parse(localStorage.getItem("isUser"));
  console.log(isUser)

  if (!isUser) {
    return redirect("/auth/login");
  }

  return null;
}