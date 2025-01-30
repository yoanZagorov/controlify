import { redirect } from "react-router";

import { getAuthUserId } from "@/services/firebase/db/user";

import { getRandomItem } from "@/utils/array";
import { getStoredData } from "@/utils/storage";
import { createSuccessResponse } from "../responses";
import { quotes } from "../utils";

export default async function authLoader() {
  const userId = await getAuthUserId();

  if (userId) {
    return redirect("/app");
  }

  const storedRedirectData = getStoredData("redirectData");

  const loaderData = {
    quote: getRandomItem(quotes),
    redirectData: storedRedirectData || {}
  }

  return createSuccessResponse(loaderData);
}