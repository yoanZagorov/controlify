import { convertTransactionsToPreferredCurrency } from '#services/router/utils/currency'
import { isArrayTruthy } from '#utils/array'
import { performDecimalCalculation } from '#utils/number'

// Entity can be either wallet or category
export default async function getCashFlowByEntityPieChartData(
  entity,
  type,
  periodTransactions,
  preferredCurrency = null,
  providedBaseCurrency = null,
) {
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

  const entityAmountsMap = new Map() // Used a Map to ensure only a single instance of each entity

  for (const transaction of periodTransactions) {
    if (transaction.type === type) {
      const {
        convertedAmount,
        [entity]: { id, name, iconName, color },
      } = transaction

      // Add to the map
      if (entityAmountsMap.has(id)) {
        const currentEntity = entityAmountsMap.get(id)
        currentEntity.amount = performDecimalCalculation(
          currentEntity.amount,
          convertedAmount,
          '+',
        )
      } else {
        entityAmountsMap.set(id, {
          name,
          amount: convertedAmount,
          fill: color,
          details: { id, iconName },
        })
      }
    }
  }

  return Array.from(entityAmountsMap.values())
}
