import { performDecimalCalculation } from "../number";

export default function getBalanceChartDataDays({ periodInfo, openingBalance, transactionsByDayMap, trackBalanceChange = false }) {
  const { periodLength } = periodInfo;

  // Initialize accumulator
  let accumulatedBalance = openingBalance;

  // Create the days array
  const days = Array.from({ length: periodLength }, (_, i) => {
    const currentDayDate = new Date();
    currentDayDate.setDate(currentDayDate.getDate() - (periodLength - i));
    currentDayDate.setHours(0, 0, 0, 0);

    const dateKey = currentDayDate.toDateString();

    let presentationKey;
    switch (periodInfo.timeframe) {
      case "lastThirtyDays":
        presentationKey = `${currentDayDate.getDate()}/${currentDayDate.getMonth() + 1}`;
        break;
    }

    const isLastDay = i === periodLength - 1;

    return trackBalanceChange ?
      {
        dateKey,
        presentationKey: isLastDay ? "Total" : presentationKey,
        prevDayBalance: accumulatedBalance,
        balanceChange: 0,
      } :
      {
        dateKey,
        presentationKey,
        accumulatedBalance,
      };
  });

  // Iterate over the days, calculate balance and sum it up
  days.forEach(day => {
    const currentDayTransactions = transactionsByDayMap[day.dateKey] || [];

    const balanceChange = currentDayTransactions.reduce((acc, transaction) => {
      const { amount, category: { type } } = transaction;
      const operator = type === "expense" ? "-" : "+";
      return performDecimalCalculation(acc, amount, operator);
    }, 0)

    if (trackBalanceChange) {
      day.balanceChange = balanceChange;
      day.prevDayBalance = accumulatedBalance;
    }

    accumulatedBalance = performDecimalCalculation(accumulatedBalance, balanceChange, "+");

    if (!trackBalanceChange) {
      day.accumulatedBalance = accumulatedBalance;
    }
  })

  return days;
}