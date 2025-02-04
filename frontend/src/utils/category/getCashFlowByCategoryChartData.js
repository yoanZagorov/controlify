import { collection, where } from "firebase/firestore";
import { getTransactions } from "@/services/firebase/db/transaction";
import { performDecimalCalculation } from "../number";
import { db } from "@/services/firebase/firebase.config";
import { getBaseCurrency } from "@/services/firebase/db/currency";
import { getNonBaseCurrenciesRates } from "../currency";
import { getWallets } from "@/services/router/utils/wallet";

// Convert balance to base currency but only conditionally (pass a flag). Used in reflect loader and wallet loader
export default async function getCashFlowByCategoryChartData({ type, userId = null, period = null, prefetchedData, convertToBaseCurrency = false }) {
  // Fetch data data is not readily available
  let allWallets = prefetchedData.allWallets;
  if (!allWallets) {
    allWallets = await getWallets(userId);
  }

  let periodTransactionsByWallet = prefetchedData.periodTransactionsByWallet;
  if (!periodTransactionsByWallet) {
    const { start, end } = period;
    const transactionsQuery = [
      where("date", ">=", start),
      where("date", "<=", end)
    ];
    periodTransactionsByWallet = await getTransactions({ userId, allWallets, query: transactionsQuery });
  }

  let baseCurrency = prefetchedData.baseCurrency;
  if (!baseCurrency) {
    baseCurrency = await getBaseCurrency();
  }

  let nonBaseCurrenciesRates = prefetchedData.nonBaseCurrenciesRates;
  if (!nonBaseCurrenciesRates) {
    nonBaseCurrenciesRates = await getNonBaseCurrenciesRates();
  }

  const periodTransactions = periodTransactionsByWallet.flatMap(wallet => wallet.transactions);
  let transactions = [];
  for (const transaction of periodTransactions) {
    if (transaction.category.type === type) {
      const currency = transaction.wallet.currency;

      let amountBaseCurrency = transaction.amount;
      if (currency !== baseCurrency.code) {
        amountBaseCurrency = performDecimalCalculation(transaction.amount, nonBaseCurrenciesRates[currency], "*", 4);
      }

      transactions.push({ ...transaction, amount: amountBaseCurrency });
    }
  }

  if (!transactions.length) return [];

  const categoryAmountsMap = new Map(); // Used a Map to ensure only a single instance of each category

  transactions.forEach(transaction => {
    const { category: { id, name, iconName, color }, amount } = transaction;

    if (categoryAmountsMap.has(name)) {
      const currentCategory = categoryAmountsMap.get(name);

      currentCategory.amount = performDecimalCalculation(currentCategory.amount, amount, "+");
    } else {
      categoryAmountsMap.set(name, {
        name,
        amount,
        fill: color,
        category: {
          id,
          iconName
        }
      });
    }
  });

  return Array.from(categoryAmountsMap.values());;
}