import { getAuthUserId } from "@/services/firebase/db/user";
import { getStoredData, storeRedirectData } from "@/utils/storage";
import { redirect } from "react-router";

export default async function dashboardLoader() {
  const userId = await getAuthUserId();

  if (!userId) {
    const redirectData = getStoredData("redirectData");

    if (redirectData) {
      storeRedirectData(...redirectData);
    } else {
      const pathname = new URL(request.url).pathname;
      storeRedirectData("You must log in first", "alert", pathname);
    }

    return redirect("/login");
  }

  return null;
}

