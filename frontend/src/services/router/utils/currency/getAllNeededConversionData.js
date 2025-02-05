import { getBaseCurrency } from "@/services/firebase/db/currency";
import { getWallets } from "@/services/firebase/db/wallet";
import { getPeriodTransactionsByWallet } from "@/services/firebase/db/transaction";
import { getUser } from "@/services/firebase/db/user";

import getNonBaseCurrenciesRates from "./getNonBaseCurrenciesRates";

export default async function getAllNeededConversionData({ userId = null, periodInfo = {}, neededData, providedData }) {
  const conversionData = { ...providedData };

  if (neededData.includes("wallets") && !conversionData.wallets) {
    conversionData.wallets = await getWallets(userId);
  }

  if (neededData.includes("periodTransactionsByWallet") && !conversionData.periodTransactionsByWallet) {
    const providedWallets = providedData.wallets || await getWallets(userId); // Useful if you need back only the transactions but not the wallets themselves
    conversionData.periodTransactionsByWallet = await getPeriodTransactionsByWallet({ userId, providedWallets, periodInfo })
  }

  if (neededData.includes("baseCurrency") && !conversionData.baseCurrency) {
    conversionData.baseCurrency = await getBaseCurrency();
  }

  if (neededData.includes("userCurrency") && !conversionData.userCurrency) {
    conversionData.userCurrency = (await getUser(userId)).currency;
  }

  // Fetch nonBaseCurrenciesRates last, after all dependencies are available
  if (neededData.includes("nonBaseCurrenciesRates") && !conversionData.nonBaseCurrenciesRates) {
    conversionData.nonBaseCurrenciesRates = await getNonBaseCurrenciesRates({
      baseCurrency: conversionData.baseCurrency,
      transactionsByWallet: conversionData.periodTransactionsByWallet,
      ...(neededData.includes("userCurrency") ? { userCurrency: conversionData.userCurrency } : {})
    })
  };

  return conversionData;
}