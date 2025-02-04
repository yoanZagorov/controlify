import { redirect } from "react-router";

import { getRandomItem } from "@/utils/array";
import { getStoredData } from "@/utils/localStorage";
import { createSuccessResponse } from "../responses";
import { quotes } from "../utils";
import { getAuthUserId } from "@/services/firebase/auth";
import { ROUTES } from "@/constants";

export default async function authLoader() {
  const userId = await getAuthUserId();

  if (userId) {
    return redirect(ROUTES.APP);
  }

  const storedRedirectData = getStoredData("redirectData");

  const loaderData = {
    quote: getRandomItem(quotes),
    redirectData: storedRedirectData || {}
  }

  return createSuccessResponse(loaderData);
}