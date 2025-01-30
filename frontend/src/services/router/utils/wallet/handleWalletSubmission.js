import { createNewWallet } from "@/services/firebase/db/wallet";
import { db } from "@/services/firebase/firebase.config";
import { formatEntityNameForFirebase } from "@/utils/formatting";
import { checkWalletInitialBalance, checkWalletName, checkWalletNameDuplicate } from "@/utils/wallet";
import { collection } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { ValidationError } from "@/utils/errors";

export default async function handleWalletSubmission(userId, formData) {
  const { name, initialBalance: initialBalanceStr } = formData;

  const initialBalance = Number(initialBalanceStr);

  const walletsCollectionRef = collection(db, `users/${userId}/wallets`);

  try {
    checkWalletName(name);
    checkWalletInitialBalance(initialBalance);

    const formattedName = formatEntityNameForFirebase(name);

    await checkWalletNameDuplicate(userId, formattedName);

    const formattedFormData = {
      ...formData,
      name: formattedName,
      categories: JSON.parse(formData.categories),
      balance: initialBalance
    }

    delete formattedFormData.initialBalance;
    delete formattedFormData.intent;

    await createNewWallet(walletsCollectionRef, formattedFormData);

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