import { updateDoc } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { ValidationError } from "@/utils/errors";
import { storeRedirectData } from "@/utils/storage";
import { redirect } from "react-router";

export default async function handleWalletDeletion(docRef) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    await updateDoc(docRef, { deletedAt: today });

    return createSuccessResponse({
      msg: "Successfully deleted wallet!",
      msgType: "success",
    })

    // Another variant
    // storeRedirectData("Successfully deleted wallet!", "success");
    // return redirect("/app/wallets");

  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message);
    }

    return createErrorResponse(500, error.message);
  }
}