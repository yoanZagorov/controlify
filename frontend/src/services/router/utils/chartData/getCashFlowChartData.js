import { getCashFlowLineChartDataDays } from "@/utils/charts";
import { convertAmountToUserCurrency, getAllNeededConversionData } from "../currency";

export default async function getCashFlowChartData({ userId, periodInfo, providedData }) {
  // Fetch the data that isn't provided
  const neededData = ["periodTransactionsByWallet", "baseCurrency", "userCurrency", "nonBaseCurrenciesRates"];
  const allNeededConversionData = await getAllNeededConversionData({ userId, periodInfo, neededData, providedData });
  const { periodTransactionsByWallet, baseCurrency, userCurrency, nonBaseCurrenciesRates } = allNeededConversionData;

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
    transactionsByDayMap[dateKey].push({
      ...transaction,
      amount: correctTransactionAmount
    });
  }

  // Calculate the balance for each individual day
  const days = getCashFlowLineChartDataDays({ periodInfo, transactionsByDayMap });

  return days;
}