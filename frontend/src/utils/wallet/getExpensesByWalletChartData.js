import { where } from "firebase/firestore";

import { getTransactions } from "@/services/firebase/db/transaction";

import { getPeriodInfo } from "@/services/router/utils";
import { performDecimalCalculation } from "../number";
import { getBaseCurrency } from "@/services/firebase/db/currencies";
import { getNonBaseCurrenciesRates } from "../currency";

export default async function getExpensesByWalletChartData(userId, wallets, period) {
  const { start, end } = getPeriodInfo(period);

  const query = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];
  const periodTransactionsByWallet = await getTransactions({ userId, wallets, query, dataFormat: "structured" });

  const baseCurrency = await getBaseCurrency();
  const nonBaseCurrenciesRates = await getNonBaseCurrenciesRates(periodTransactionsByWallet, baseCurrency);

  const expensesByWallet = periodTransactionsByWallet.map(wallet => {
    const { id, name, iconName, transactions, color } = wallet;

    const expenseTransactions = transactions.filter(transaction => transaction.category.type === "expense");

    const totalExpenses = expenseTransactions.reduce((acc, transaction) => {
      // Normalizing all amounts to base currency, so the percentage values are accurate
      let amountInBaseCurrency = transaction.amount;
      if (wallet.currency !== baseCurrency.code) {
        const conversionRate = nonBaseCurrenciesRates[wallet.currency];
        amountInBaseCurrency = performDecimalCalculation(transaction.amount, conversionRate, "*", 4);
      }

      return performDecimalCalculation(acc, amountInBaseCurrency, "+");
    }, 0);

    return {
      name,
      amount: totalExpenses,
      fill: color,
      wallet: {
        id,
        iconName
      }
    };
  })

  return expensesByWallet;
}