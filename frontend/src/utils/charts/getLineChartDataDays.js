import { getPeriodInfo } from "@/services/router/utils";
import { performDecimalCalculation } from "../number";

export default function getLineChartDataDays({ period, openingAmount, transactionsByDayMap, trackAmountChange = false }) {
  const { periodLength } = getPeriodInfo(period);

  let accumulatedAmount = openingAmount || 0;
  let prevDayAmount = openingAmount || 0;

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

    return trackAmountChange ?
      {
        dateKey,
        presentationKey: isLastDay ? "Total" : presentationKey,
        prevDayAmount,
        amountChange: 0
      } :
      {
        dateKey,
        presentationKey,
        accumulatedAmount: 0,
      };
  });


  days.forEach(day => {
    const currentDayTransactions = transactionsByDayMap[day.dateKey] || [];

    const amountChange = currentDayTransactions.reduce((acc, transaction) => {
      const operator = transaction.category.type === "expense" ? "-" : "+";
      return performDecimalCalculation(acc, transaction.amount, operator);
    }, 0)

    accumulatedAmount = performDecimalCalculation(accumulatedAmount, amountChange, "+");

    if (trackAmountChange) {
      day.amountChange = amountChange;
      day.prevDayAmount = prevDayAmount;
      prevDayAmount = accumulatedAmount;
    } else {
      day.accumulatedAmount = accumulatedAmount;
    }
  })

  return days;
}