import { doc, runTransaction } from "firebase/firestore";

import { db } from "@/services/firebase/firebase.config";
import { getAuthUserId } from "@/services/firebase/db/user";

import { formatEntityNameForFirebase } from "@/utils/formatting";
import { checkWalletName, checkWalletNameDuplicate } from "@/utils/wallet";
import { ValidationError } from "@/utils/errors";

import { createErrorResponse, createSuccessResponse } from "../responses";

export default async function walletAction({ request, params }) {
  const userId = await getAuthUserId();
  const walletId = params.walletId;

  const formData = Object.fromEntries(await request.formData());

  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);

  try {
    if (formData.intent === "updateWallet") {
      checkWalletName(formData.name);
      const formattedName = formatEntityNameForFirebase(formData.name);

      const formattedFormData = {
        ...formData,
        name: formattedName,
        categories: JSON.parse(formData.categories)
      }

      const { name, currency, color, categories } = formattedFormData;

      await runTransaction(db, async (transaction) => {
        const currentWalletState = (await transaction.get(walletDocRef)).data();

        const hasDataChanged = {
          name: currentWalletState.name !== name,
          currency: currentWalletState.currency !== currency,
          color: currentWalletState.color !== color,
          categories: true // To do: do a real array comparison. This doesn't work (compared by reference): currentWalletState.categories === categories
        }

        if (hasDataChanged.name) {
          await checkWalletNameDuplicate(userId, formattedName);
        }

        const dataToChange = {};

        for (const property in hasDataChanged) {
          if (hasDataChanged[property]) {
            dataToChange[property] = formattedFormData[property];
          };
        }

        if (Object.keys(dataToChange).length === 0) throw new Error("You haven't performed any changes");

        transaction.update(walletDocRef, {
          ...dataToChange
        })
      })

      return createSuccessResponse({
        msg: "Successfully updated wallet settings data!",
        msgType: "success",
      })
    }

    if (formData.intent === "deleteWallet") {
      // To do
    }
  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message);
    }

    return createErrorResponse(500, error.message);

  }

}