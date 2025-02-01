import { getPeriodInfo } from "@/services/router/utils";
import { performDecimalCalculation } from "../number";

export default function getBalanceChartDataDays({ period, openingBalance, transactionsByDayMap, trackBalanceChange = false }) {
  const { periodLength } = getPeriodInfo(period);

  let accumulatedBalance = openingBalance;
  let prevDayBalance = openingBalance;

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

    const isLastDay = i === periodLength - 1;

    return trackBalanceChange ?
      {
        dateKey,
        presentationKey: isLastDay ? "Total" : presentationKey,
        prevDayBalance,
        balanceChange: 0
      } :
      {
        dateKey,
        presentationKey,
        accumulatedBalance: 0,
      };
  });


  days.forEach(day => {
    const currentDayTransactions = transactionsByDayMap[day.dateKey] || [];

    const balanceChange = currentDayTransactions.reduce((acc, transaction) => {
      const operator = transaction.category.type === "expense" ? "-" : "+";
      return performDecimalCalculation(acc, transaction.amount, operator);
    }, 0)

    accumulatedBalance = performDecimalCalculation(accumulatedBalance, balanceChange, "+");

    if (trackBalanceChange) {
      day.balanceChange = balanceChange;
      day.prevDayBalance = prevDayBalance;
      prevDayBalance = accumulatedBalance;
    } else {
      day.accumulatedBalance = accumulatedBalance;
    }
  })

  console.log(days)
  return days;
}