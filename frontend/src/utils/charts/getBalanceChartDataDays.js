import { performDecimalCalculation } from "../number";

export default function getBalanceChartDataDays(periodLength, period, openingBalance, transactionsByDayMap) {
  const days = Array.from({ length: periodLength }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (periodLength - i));

    let presentationKey;

    switch (period) {
      case "lastThirtyDays":
        presentationKey = `${day.getDate()}/${day.getMonth() + 1}`;
        break;
    }

    const dateKey = day.toDateString();

    return { dateKey, presentationKey, balance: 0 };
  });

  let accumulatedBalance = openingBalance;

  days.forEach(day => {
    const currentDayTransactions = transactionsByDayMap[day.dateKey] || [];

    if (currentDayTransactions.length) {
      const dayBalance = currentDayTransactions.reduce((acc, transaction) => {
        const operator = transaction.category.type === "expense" ? "-" : "+";

        return performDecimalCalculation(acc, transaction.amount, operator);
      }, 0)

      accumulatedBalance = performDecimalCalculation(accumulatedBalance, dayBalance, "+");
    }

    day.balance = accumulatedBalance;
  })

  return days;
}