import { where } from "firebase/firestore";
import getUserBalance from "../user/getUserBalance";
import { performDecimalCalculation } from "@/utils/number";
import { getBalanceChartDataDays } from "@/utils/charts";
import { getPeriodInfo } from "@/utils/date";
import { getAllNeededConversionData } from "../currency";

// Convert balance to base currency and then to user currency. Used in appLoader and reflectLoader
export default async function getUserBalanceChartData({ userId, period, trackBalanceChange = false, providedData = {} }) {
  const periodInfo = getPeriodInfo(period);

  // Fetch the data that isn't provided
  const neededData = ["allWallets", "periodTransactionsByWallet", "baseCurrency", "userCurrency", "nonBaseCurrenciesRates"];
  const allNeededConversionData = await getAllNeededConversionData({ userId, periodInfo, neededData, providedData });
  const { allWallets, periodTransactionsByWallet, baseCurrency, userCurrency, nonBaseCurrenciesRates } = allNeededConversionData;

  // Calculate balance before start of period
  const openingBalanceTransactionsQuery = [
    where("date", "<", periodInfo.start)
  ];
  const openingBalance = await getUserBalance({
    userId,
    wallets: allWallets,
    query: openingBalanceTransactionsQuery,
    baseCurrency,
    userCurrency,
    nonBaseCurrenciesRates
  });

  // Create a period map by each day
  const periodTransactions = periodTransactionsByWallet.flatMap(wallet => wallet.transactions);
  let transactionsByDayMap = {};
  for (const transaction of periodTransactions) {
    const currency = transaction.wallet.currency;

    // Calculate the appropriate amount for each transaction
    let convertedTransactionAmount;
    if (currency !== userCurrency) {
      let baseCurrencyTransactionAmount = transaction.amount;
      if (currency !== baseCurrency.code) {
        baseCurrencyTransactionAmount = performDecimalCalculation(transaction.amount, nonBaseCurrenciesRates[currency], "*", 4);
      }

      convertedTransactionAmount = baseCurrencyTransactionAmount;
      if (baseCurrency.code !== userCurrency) {
        convertedTransactionAmount = performDecimalCalculation(baseCurrencyTransactionAmount, nonBaseCurrenciesRates[userCurrency], "/", 4);
      }
    }

    const dateKey = transaction.date.toDateString();

    if (!transactionsByDayMap[dateKey]) transactionsByDayMap[dateKey] = [];
    transactionsByDayMap[dateKey].push({
      ...transaction,
      ...(convertedTransactionAmount ? { amount: convertedTransactionAmount } : {})
    });
  }

  // Calculate the balance for each individual day
  const days = getBalanceChartDataDays({ periodInfo, openingBalance, transactionsByDayMap, trackBalanceChange });

  return days;
}