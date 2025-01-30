import { getAuthUserId } from "@/services/firebase/db/user";
import { getStoredData, storeRedirectData } from "@/utils/storage";

export default async function settingsLoader() {
  const userId = await getAuthUserId();

  if (!userId) {
    const redirectData = getStoredData("redirectData");

    if (redirectData) {
      const { msg, msgType, originalPath } = redirectData;
      storeRedirectData(msg, msgType, originalPath);
    } else {
      const pathname = new URL(request.url).pathname;
      storeRedirectData("You must log in first", "alert", pathname);
    }

    return redirect("/login");
  }

  return null;
}

