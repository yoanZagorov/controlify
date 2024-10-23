import { redirect } from "react-router-dom";
import { checkUserStatus } from "@/utils/auth";
import { getUser } from "services/firebase/db/user";

export default async function appLoader() {
  const user = await checkUserStatus();

  if (user) {
    const userId = user.uid;

    try {
      const userInfo = await getUser(userId);
      return userInfo;
    } catch (error) {
      console.error(error);
      return { error: "Unable to fetch user" };
    }
  }

  return redirect("/auth/login");
}