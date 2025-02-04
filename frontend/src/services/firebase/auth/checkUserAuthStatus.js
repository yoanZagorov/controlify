import { getStoredRedirectData, storeRedirectData } from "@/utils/localStorage";

export default function checkUserAuthStatus(userId, url) {
  if (!userId) {
    const redirectData = getStoredRedirectData();

    if (redirectData) {
      const { msg, msgType, originalPath } = redirectData;
      storeRedirectData(msg, msgType, originalPath);
    } else {
      const pathname = new URL(url).pathname;
      storeRedirectData("You must log in first", "alert", pathname);
    }

    return false;
  }

  return true;
}