import { ValidationError } from "@/utils/errors";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { checkWalletInitialBalance, checkWalletName, checkWalletNameDuplicate } from "@/utils/wallet";
import { formatEntityNameForFirebase } from "@/utils/formatting";
import { getAuthUserId } from "@/services/firebase/db/user";
import { createNewWallet } from "@/services/firebase/db/wallet";
import { handleTransactionSubmission, handleTransactionUpdate } from "../utils";

export default async function walletsAction({ request }) {
  const userId = await getAuthUserId();

  const formData = Object.fromEntries(await request.formData());
  const { intent } = formData;

  if (intent === "addWallet") {
    console.log(formData);
    const initialBalance = Number(formData.initialBalance);

    try {
      checkWalletName(formData.name);
      checkWalletInitialBalance(initialBalance);

      const formattedName = formatEntityNameForFirebase(formData.name);

      await checkWalletNameDuplicate(userId, formattedName);

      const formattedFormData = {
        ...formData,
        name: formattedName,
        categories: JSON.parse(formData.categories),
        balance: initialBalance
      }

      delete formattedFormData.initialBalance;
      delete formattedFormData.intent;

      await createNewWallet(userId, formattedFormData);

      return createSuccessResponse({
        msg: "Successfully created your wallet!",
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

  if (intent === "addTransaction") {
    return (await handleTransactionSubmission(userId, formData));
  }

  if (intent === "updateTransaction") {
    return (await handleTransactionUpdate(userId, formData));
  }
}