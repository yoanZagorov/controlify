import { checkWalletName, checkWalletNameDuplicate } from "@/utils/wallet";
import getDataToChange from "../getDataToChange";
import { formatEntityNameForFirebase } from "@/utils/formatting";
import { runTransaction } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { ValidationError } from "@/utils/errors";
import { db } from "@/services/firebase/firebase.config";

export default async function handleWalletUpdate(userId, walletDocRef, formData) {
  try {
    checkWalletName(formData.name);
    const formattedName = formatEntityNameForFirebase(formData.name);

    const formattedFormData = {
      ...formData,
      name: formattedName,
      categories: JSON.parse(formData.categories)
    }

    const { name, currency, color, categories } = formattedFormData;

    await runTransaction(db, async (transaction) => {
      const oldWalletData = (await transaction.get(walletDocRef)).data();

      const hasDataChanged = {
        name: oldWalletData.name !== name,
        currency: oldWalletData.currency !== currency,
        color: oldWalletData.color !== color,
        categories: true // To do: do a real array comparison
      }

      if (hasDataChanged.name) {
        await checkWalletNameDuplicate(userId, formattedName);
      }

      const dataToChange = getDataToChange(hasDataChanged, formattedFormData);

      transaction.update(walletDocRef, dataToChange);
    })

    return createSuccessResponse({
      msg: "Successfully updated wallet settings data!",
      msgType: "success",
    })
  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message);
    }

    return createErrorResponse(500, error.message);
  }
}