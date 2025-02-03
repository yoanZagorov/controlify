import { collection, where } from "firebase/firestore";
import { getTransactions } from "@/services/firebase/db/transaction";
import { performDecimalCalculation } from "../number";
import { getWallets } from "@/services/firebase/db/wallet";
import { db } from "@/services/firebase/firebase.config";
import { getBaseCurrency } from "@/services/firebase/db/currencies";
import { getNonBaseCurrenciesRates } from "../currency";

export default async function getCashFlowByCategoryChartData({ type, userId = null, period = null, prefetchedData }) {
  // Fetch data data is not readily available
  let allWallets = prefetchedData.allWallets;
  if (!allWallets) {
    const allWalletsCollectionRef = collection(db, `users/${userId}/wallets`);
    allWallets = await getWallets(allWalletsCollectionRef);
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