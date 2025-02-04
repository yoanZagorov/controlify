import { getBaseCurrency } from "@/services/firebase/db/currency";
import getNonBaseCurrenciesRates from "./getNonBaseCurrenciesRates";
import { getWallets } from "@/services/firebase/db/wallet";
import { where } from "firebase/firestore";
import { getTransactions } from "@/services/firebase/db/transaction";
import { getUser } from "@/services/firebase/db/user";

export default async function getAllNeededConversionData({ userId = null, periodInfo = {}, neededData, providedData }) {
  const conversionData = { ...providedData };

  if (neededData.includes("allWallets") && !conversionData.allWallets) {
    conversionData.allWallets = await getWallets(userId);
  }

  if (neededData.includes("periodTransactionsByWallet") && !conversionData.periodTransactionsByWallet) {
    const periodTransactionsQuery = [
      where("date", ">=", periodInfo.start),
      where("date", "<=", periodInfo.end)
    ];
    conversionData.periodTransactionsByWallet = await getTransactions({
      userId,
      prefetchedWallets: conversionData.allWallets,
      query: periodTransactionsQuery,
      dataFormat: "structured"
    });
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
      ...(conversionData.nonBaseCurrenciesSet
        ? { providedNonBaseCurrenciesSet: conversionData.nonBaseCurrenciesSet } // Mutually
        : { transactionsByWallet: conversionData.periodTransactionsByWallet }), // Exclusive
      ...(neededData.includes("userCurrency") ? { userCurrency: conversionData.userCurrency } : {})
    })
  };

  return conversionData;
}