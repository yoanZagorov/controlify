import { redirect } from "react-router-dom";

export const rootLoader = () => {
  const isUser = JSON.parse(localStorage.getItem("isUser"));

  if (isUser) {
    return redirect("/app"); 
  }

  return redirect("/auth/create-account");
}

export async function appLoader() {
  const isUser = JSON.parse(localStorage.getItem("isUser"));

  if (!isUser) {
    return redirect("/auth/login");
  }

  return null;
}