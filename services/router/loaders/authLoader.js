import { redirect } from "react-router-dom";
import { getAuthUserId } from "services/firebase/db/user";
import { createSuccessResponse } from "../responses";
import { getRandomItem } from "@/utils/array";
import { quotes } from "@/pages/auth/data";
import { getStoredData } from "@/utils/storage";

export default async function authLoader() {
  const userId = await getAuthUserId();

  if (userId) {
    return redirect("/app");
  }

  const storedRedirectData = getStoredData("redirectData");

  const loaderData = storedRedirectData
    ? { redirectData: storedRedirectData }
    : { quote: getRandomItem(quotes) }

  return createSuccessResponse(loaderData);
}