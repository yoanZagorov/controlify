import { redirect } from "react-router-dom";

export default async function rootLoader() {
  const isUser = JSON.parse(localStorage.getItem("isUser"));

  if (isUser) {
    return redirect("/app"); 
  }

  return redirect("/auth/create-account");
}