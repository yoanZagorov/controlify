import { performDecimalCalculation } from "../number";

// Most likely wouldn't need this func but keep it for now
export default function getCashFlowLineChartDataDays({ periodInfo, transactionsByDayMap }) {
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