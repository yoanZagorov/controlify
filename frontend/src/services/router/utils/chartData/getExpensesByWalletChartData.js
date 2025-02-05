import { getAllNeededConversionData } from "../currency";
import { performDecimalCalculation } from "@/utils/number";

// Convert balance to base currency. Used in wallets loader
export default async function getExpensesByWalletChartData({ userId, periodInfo, providedData }) {
  // Fetch the data that isn't provided
  const neededData = ["periodTransactionsByWallet", "baseCurrency", "nonBaseCurrenciesRates"];
  const allNeededConversionData = await getAllNeededConversionData({ userId, periodInfo, neededData, providedData });
  const { periodTransactionsByWallet, baseCurrency, nonBaseCurrenciesRates } = allNeededConversionData;

  const expensesByWallet = periodTransactionsByWallet.map(wallet => {
    const { id, currency, name, iconName, transactions, color } = wallet;

    let totalExpenses = 0;
    for (const transaction of transactions) {
      const { amount, category: { type } } = transaction;

      if (type === "expense") {
        // Normalizing all amounts to base currency, so the percentage values are accurate
        let amountInBaseCurrency = amount;
        if (currency !== baseCurrency.code) {
          amountInBaseCurrency = performDecimalCalculation(amount, nonBaseCurrenciesRates[currency], "*", 4);
        }

        totalExpenses = performDecimalCalculation(totalExpenses, amountInBaseCurrency, "+");
      }
    }

    return {
      name,
      amount: totalExpenses,
      fill: color,
      wallet: {
        id,
        iconName
      }
    };
  })

  return expensesByWallet;
}