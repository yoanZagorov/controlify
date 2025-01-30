import { collection, where } from "firebase/firestore";
import { getBaseCurrency } from "../currencies";
import { getTransactions } from "../transaction";
import { performDecimalCalculation } from "@/utils/number";
import { getEntities } from "../utils/entity";
import { db } from "../../firebase.config";
import { getNonBaseCurrenciesRates } from "@/utils/currency";

export default async function getBalance({ userId, wallets, query, userCurrency }) {
  // const transactionsByWallet = await getTransactions({ userId, wallets, query, dateFormat: "structured" });

  // if (!transactionsByWallet.length) return 0;

  // const balance = transactions.reduce((acc, transaction) => {
  //   const operator = transaction.category.type === "expense" ? "-" : "+";

  //   return performDecimalCalculation(acc, transaction.amount, operator);
  // }, 0);

  // return balance


  // Fetch only the neccessary conversion rates, but do it in a single call
  const baseCurrency = await getBaseCurrency();

  const transactionsByWallet = await getTransactions({ userId, wallets, query, dataFormat: "structured" });
  if (!transactionsByWallet.length) return 0;

  const nonBaseCurrenciesRates = await getNonBaseCurrenciesRates(transactionsByWallet, baseCurrency, userCurrency);

  const balance = transactionsByWallet.reduce((accBalance, wallet, index) => {
    const currentWalletCurrency = wallet.currency;

    const walletBalance = wallet.transactions.reduce((acc, transaction) => {
      // Convert all transaction amounts to the base currency if not already in it
      let amountInBaseCurrency = transaction.amount;
      if (currentWalletCurrency !== baseCurrency.code) {
        const conversionRate = nonBaseCurrenciesRates[currentWalletCurrency];
        amountInBaseCurrency = performDecimalCalculation(transaction.amount, conversionRate, "*", 4);
      }

      const operator = transaction.category.type === "expense" ? "-" : "+";
      return performDecimalCalculation(acc, amountInBaseCurrency, operator);
    }, 0);

    return performDecimalCalculation(accBalance, walletBalance, "+");
  }, 0);

  const isPreferredCurrencyBase = userCurrency === baseCurrency.code;
  const balanceInPreferredCurrency = isPreferredCurrencyBase
    ? balance
    : performDecimalCalculation(balance, nonBaseCurrenciesRates[userCurrency], "/", 4);

  return parseFloat(balanceInPreferredCurrency.toFixed(2));
}