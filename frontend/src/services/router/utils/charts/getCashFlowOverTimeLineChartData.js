import { performDecimalCalculation } from "@/utils/number";
import { convertTransactionsToPreferredCurrency } from "../currency";
import { isArrayTruthy } from "@/utils/array";

export default async function getCashFlowOverTimeLineChartData(periodTransactions, periodInfo, preferredCurrency = null, providedBaseCurrency = null) {
  // Convert to preferred currency if not already done
  if (isArrayTruthy(periodTransactions) && !periodTransactions[0].convertedAmount) {
    await convertTransactionsToPreferredCurrency(periodTransactions, preferredCurrency, providedBaseCurrency);
  }

  // Create a period map by each day
  let transactionsByDayMap = {};
  for (const transaction of periodTransactions) {
    const dateKey = transaction.date.toDateString();

    if (!transactionsByDayMap[dateKey]) transactionsByDayMap[dateKey] = [];
    transactionsByDayMap[dateKey].push(transaction);
  }

  // Calculate the balance for each individual day
  const { periodLength } = periodInfo;

  const days = Array.from({ length: periodLength }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (periodLength - i));

    let presentationKey;
    switch (periodInfo.timeframe) {
      case "lastThirtyDays":
        presentationKey = `${day.getDate()}/${day.getMonth() + 1}`;
        break;
    }

    const dateKey = day.toDateString();

    return {
      dateKey,
      presentationKey,
      expense: 0,
      income: 0
    };
  });

  days.forEach(day => {
    const currentDayTransactions = transactionsByDayMap[day.dateKey] || [];

    for (const transaction of currentDayTransactions) {
      const { convertedAmount, type } = transaction;

      if (type === "expense") {
        day.expense = performDecimalCalculation(day.expense, convertedAmount, "+");
      } else {
        day.income = performDecimalCalculation(day.income, convertedAmount, "+");
      }
    }
  })

  return days;
}