import { getAuthUserId } from "@/services/firebase/db/user";
import { updateWallet } from "@/services/firebase/db/wallet";
import { formatEntityNameForFirebase } from "@/utils/formatting";
import { storeRedirectData } from "@/utils/storage";
import { checkWalletName, checkWalletNameDuplicate } from "@/utils/wallet";
import { redirect } from "react-router";
import { createErrorResponse } from "../responses";

export default async function walletAction({ request, params }) {
  const userId = await getAuthUserId();
  const walletId = params.walletId;

  const formData = Object.fromEntries(await request.formData());

  const { name, currency, color, categories: unparsedCategories } = formData;
  const categories = JSON.parse(unparsedCategories);

  try {
    checkWalletName(name);
    const formattedName = formatEntityNameForFirebase(name);
    await checkWalletNameDuplicate(userId, formattedName)

    await updateWallet(userId, walletId, { name: formattedName, currency, color, categories });

    storeRedirectData("Successfully updated wallet settings data!", "success");
    return redirect(`/app/wallets/${walletId}`);
  } catch (error) {
    console.error(error);
    createErrorResponse(error.statusCode, error.message);
  }
}