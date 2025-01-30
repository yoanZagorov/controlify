import { getAuthUserId } from "@/services/firebase/db/user";
import { createSuccessResponse } from "../responses";
import { getStoredData, storeRedirectData } from "@/utils/storage";
import { getRandomItem } from "@/utils/array";

export default async function dashboardLoader() {
  const userId = await getAuthUserId();

  if (!userId) {
    const redirectData = getStoredData("redirectData");
    console.log(redirectData);

    if (redirectData) {
      storeRedirectData(...redirectData);
    } else {
      const pathname = new URL(request.url).pathname;
      storeRedirectData("You must log in first", "alert", pathname);
    }

    return redirect("/login");
  }

  // const storedRedirectData = getStoredData("redirectData");

  // const loaderData = storedRedirectData
  //   ? { redirectData: storedRedirectData }
  //   : { quote: getRandomItem(quotes) };

  return null;
}

