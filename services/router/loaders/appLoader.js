import { redirect } from "react-router-dom";

export default async function appLoader() {
  const isUser = JSON.parse(localStorage.getItem("isUser"));

  if (!isUser) {
    return redirect("/auth/login");
  }

  try {
    // To do: Implement querying logic
    return {
      profilePic: null,
      email: null,
      fullName: null,
    }
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}