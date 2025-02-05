import { performDecimalCalculation } from "@/utils/number";
import { getAllNeededConversionData } from "../currency";

export default async function getCashFlowByCategoryChartData({ type, userId, periodInfo, providedData = {}, convertToBaseCurrency = false }) {
  // Fetch needed data that is not readily available
  const neededData = [
    "periodTransactionsByWallet",
    ...(convertToBaseCurrency ? ["baseCurrency", "nonBaseCurrenciesRates"] : [])
  ];
  const allNeededConversionData = await getAllNeededConversionData({ userId, periodInfo, neededData, providedData });
  const { periodTransactionsByWallet } = allNeededConversionData;

  let baseCurrency, nonBaseCurrenciesRates;
  if (convertToBaseCurrency) {
    ({ baseCurrency, nonBaseCurrenciesRates } = allNeededConversionData);
  }

  const categoryAmountsMap = new Map(); // Used a Map to ensure only a single instance of each category

  const periodTransactions = periodTransactionsByWallet.flatMap(wallet => wallet.transactions);
  for (const transaction of periodTransactions) {
    if (transaction.category.type === type) {
      const { amount, wallet: { currency }, category: { id, name, iconName, color } } = transaction;

      // Convert transaction to baseCurrency (if needed)
      let correctAmount = amount;
      if (convertToBaseCurrency && currency !== baseCurrency.code) {
        correctAmount = performDecimalCalculation(amount, nonBaseCurrenciesRates[currency], "*", 4);
      }

      // Add to categories map
      if (categoryAmountsMap.has(name)) {
        const currentCategory = categoryAmountsMap.get(name);
        currentCategory.amount = performDecimalCalculation(currentCategory.amount, correctAmount, "+");
      } else {
        categoryAmountsMap.set(name, {
          name,
          amount: correctAmount,
          fill: color,
          category: {
            id,
            iconName
          }
        });
      }
    }
  }

  return Array.from(categoryAmountsMap.values());
}