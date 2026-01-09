import { convertTransactionsToPreferredCurrency } from '#services/router/utils/currency'

import { isArrayTruthy } from '#utils/array'
import { calculateBalance } from '#utils/charts'
import { performDecimalCalculation } from '#utils/number'

// preferredCurrency is provided only if the amounts are not converted beforehand
export default async function getBalanceOverTimeLineChartData({
  openingBalance,
  periodTransactions,
  periodInfo,
  preferredCurrency = null,
  providedBaseCurrency = null,
  trackBalanceChange = false,
}) {
  // Convert to preferred currency if not already done
  if (
    isArrayTruthy(periodTransactions) &&
    !periodTransactions[0].convertedAmount
  ) {
    await convertTransactionsToPreferredCurrency(
      periodTransactions,
      preferredCurrency,
      providedBaseCurrency,
    )
  }

  // Create a period map by each day
  let transactionsByDayMap = {}
  for (const transaction of periodTransactions) {
    const dateKey = transaction.date.toDateString()

    if (!transactionsByDayMap[dateKey]) transactionsByDayMap[dateKey] = []
    transactionsByDayMap[dateKey].push(transaction)
  }

  // Calculate the balance for each individual day
  const { periodLength } = periodInfo

  let accumulatedBalance = openingBalance // Initialize accumulator

  // Create the days array
  const days = Array.from({ length: periodLength }, (_, i) => {
    const currentDayDate = new Date()
    currentDayDate.setDate(currentDayDate.getDate() - (periodLength - i))
    currentDayDate.setHours(0, 0, 0, 0)

    const dateKey = currentDayDate.toDateString()

    let presentationKey
    switch (periodInfo.timeframe) {
      case 'lastThirtyDays':
        presentationKey = `${currentDayDate.getDate()}/${currentDayDate.getMonth() + 1}`
        break
    }

    const isLastDay = i === periodLength - 1

    return trackBalanceChange
      ? {
          dateKey,
          presentationKey: isLastDay ? 'Total' : presentationKey,
          prevDayBalance: accumulatedBalance,
          balanceChange: 0,
        }
      : {
          dateKey,
          presentationKey,
          accumulatedBalance,
        }
  })

  // Iterate over the days, calculate balance and sum it up
  days.forEach((day, i) => {
    const currentDayTransactions = transactionsByDayMap[day.dateKey] || []

    const balanceChange = calculateBalance(currentDayTransactions)

    // Used for the waterfall chart variant (with trackBalanceChange)
    const isLastDay = i === periodLength - 1
    // const isLastDay = false;

    if (trackBalanceChange) {
      // Create a Total column, starting from the opening balance and ending with the current balance if it's the last day
      // Account for the opening balance as well
      day.balanceChange = isLastDay
        ? balanceChange + accumulatedBalance + Math.abs(openingBalance)
        : balanceChange
      day.prevDayBalance = isLastDay ? openingBalance : accumulatedBalance
    }

    accumulatedBalance = performDecimalCalculation(
      accumulatedBalance,
      balanceChange,
      '+',
    )

    if (!trackBalanceChange) {
      day.accumulatedBalance = accumulatedBalance
    }
  })

  return days
}
