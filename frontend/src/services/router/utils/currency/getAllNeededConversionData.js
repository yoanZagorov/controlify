import { getBaseCurrency } from "@/services/firebase/db/currency";
import { getWallet, getWallets } from "@/services/firebase/db/wallet";
import { getPeriodTransactions } from "@/services/firebase/db/transaction";
import { getUser } from "@/services/firebase/db/user";

import getNonBaseCurrenciesRates from "./getNonBaseCurrenciesRates";

// This function is currently not used, but it'll be refactored and used in the future
export default async function getAllNeededConversionData({ userId = null, walletId = null, periodInfo = {}, neededData, providedData }) {
  const conversionData = { ...providedData };

  if (neededData.includes("wallets") && !conversionData.wallets) {
    conversionData.wallets = await getWallets(userId);
  }

  if (neededData.includes("periodTransactionsByWallet") && !conversionData.periodTransactionsByWallet) {
    const providedWallets = providedData.wallets || await getWallets(userId); // Useful if you need back only the transactions but not the wallets themselves
    conversionData.periodTransactionsByWallet = await getPeriodTransactions({ userId, providedWallets, periodInfo, byWallet: true })
  }

  if (neededData.includes("baseCurrency") && !conversionData.baseCurrency) {
    conversionData.baseCurrency = await getBaseCurrency();
  }

  if (neededData.includes("userCurrency") && !conversionData.userCurrency) {
    conversionData.userCurrency = (await getUser(userId)).currency;
  }

  if (neededData.includes("walletCurrency") && !conversionData.walletCurrency) {
    conversionData.walletCurrency = (await getWallet(userId, walletId)).currency;
  }

  // Fetch nonBaseCurrenciesRates last, after all dependencies are available
  if (neededData.includes("nonBaseCurrenciesRates") && !conversionData.nonBaseCurrenciesRates) {
    conversionData.nonBaseCurrenciesRates = await getNonBaseCurrenciesRates({
      baseCurrency: conversionData.baseCurrency,
      entities: conversionData.entities,
      ...(neededData.includes("userCurrency") ? { userCurrency: conversionData.userCurrency } : {})
    })
  };

  return conversionData;
}