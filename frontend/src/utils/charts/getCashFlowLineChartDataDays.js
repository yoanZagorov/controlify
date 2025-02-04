import { getPeriodInfo } from "@/services/router/utils";
import { performDecimalCalculation } from "../number";

export default function getCashFlowLineChartDataDays({ period, transactionsByDayMap }) {
  const { periodLength } = getPeriodInfo(period);

  // let accumulatedAmount = 0;
  // let prevDayAmount = 0;

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
      const { amount, category: { type } } = transaction;

      if (type === "expense") {
        day.expense = performDecimalCalculation(day.expense, amount, "+");
      } else {
        day.income = performDecimalCalculation(day.income, amount, "+");
      }
    }
  })

  return days;
}