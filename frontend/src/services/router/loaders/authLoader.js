import { redirect } from "react-router";

import { ROUTES } from "@/constants";

import { getAuthUserId } from "@/services/firebase/auth";
import { getRandomQuote } from "@/services/firebase/db/quote";

import { createErrorResponse, createSuccessResponse } from "../responses";

import { getStoredRedirectData } from "@/utils/localStorage";

export default async function authLoader() {
  const userId = await getAuthUserId();

  if (userId) {
    return redirect(ROUTES.APP);
  }

  try {
    const storedRedirectData = getStoredRedirectData();
    const randomQuote = await getRandomQuote();

    const loaderData = {
      quote: randomQuote,
      redirectData: storedRedirectData || {}
    }

    return createSuccessResponse(loaderData);
  } catch (error) {
    console.error(error);

    throw createErrorResponse("Sorry, an unexpected error occurred. Please try reloading the page.")
  }
}