import { where } from "firebase/firestore";
import getUserBalance from "../user/getUserBalance";
import { getBalanceChartDataDays } from "@/utils/charts";
import { convertAmountToUserCurrency, getAllNeededConversionData } from "../currency";
import { performDecimalCalculation } from "@/utils/number";

export default async function getUserBalanceChartData({ userId, periodInfo, trackBalanceChange = false, providedData = {} }) {
  // Fetch the data that isn't provided
  const neededData = ["wallets", "periodTransactionsByWallet", "baseCurrency", "userCurrency", "nonBaseCurrenciesRates"];
  const allNeededConversionData = await getAllNeededConversionData({ userId, periodInfo, neededData, providedData });
  const { wallets, periodTransactionsByWallet, baseCurrency, userCurrency, nonBaseCurrenciesRates } = allNeededConversionData;

  // Calculate balance before start of period
  const openingBalanceTransactionsQuery = [
    where("date", "<", periodInfo.start)
  ];
  const openingBalance = await getUserBalance({
    userId,
    wallets,
    query: openingBalanceTransactionsQuery,
    baseCurrency,
    userCurrency,
    nonBaseCurrenciesRates
  });

  // Create a period map by each day
  const periodTransactions = periodTransactionsByWallet.flatMap(wallet => wallet.transactions);
  let transactionsByDayMap = {};
  for (const transaction of periodTransactions) {
    const { amount, date, wallet: { currency } } = transaction;

    // Calculate the appropriate amount for each transaction
    let correctTransactionAmount = amount;
    if (currency !== userCurrency) {
      correctTransactionAmount = convertAmountToUserCurrency({ amount, currency, baseCurrency, userCurrency, nonBaseCurrenciesRates });
    }

    const dateKey = date.toDateString();

    if (!transactionsByDayMap[dateKey]) transactionsByDayMap[dateKey] = [];
    transactionsByDayMap[dateKey].push(transaction);
  }

  // Calculate the balance for each individual day
  const days = getBalanceChartDataDays({ periodInfo, openingBalance, transactionsByDayMap, trackBalanceChange });

  return days;
}