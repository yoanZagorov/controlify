import { performDecimalCalculation } from "@/utils/number";
import { getAllNeededConversionData } from "../currency";
import { getActiveWallets } from "@/services/firebase/db/wallet";

// Convert balance to base currency and then to user currency. Used in appLoader
export default async function getCurrentUserBalance({ userId, providedData = {} }) {
  // Implementation is like this because the Set creation logic for the nonBaseCurrenciesSet is rather unique for the app
  let activeWallets = providedData.activeWallets;
  if (!activeWallets) {
    activeWallets = await getActiveWallets(userId);
  }

  const nonBaseCurrenciesSet = new Set(activeWallets
    .filter(wallet => wallet.currency !== baseCurrency.code)
    .map(wallet => wallet.currency));

  const providedConversionData = { ...providedData, nonBaseCurrenciesSet };
  delete providedConversionData.activeWallets;

  const neededData = ["baseCurrency", "userCurrency", "nonBaseCurrenciesRates"];
  const { baseCurrency, userCurrency, nonBaseCurrenciesRates } = (await getAllNeededConversionData({ userId, neededData, providedData: providedConversionData }));

  const balance = activeWallets.reduce((acc, wallet) => {
    let balanceInBaseCurrency = wallet.balance;
    if (wallet.currency !== baseCurrency.code) {
      const conversionRate = nonBaseCurrenciesRates[wallet.currency];
      balanceInBaseCurrency = performDecimalCalculation(wallet.balance, conversionRate, "*", 4);
    }

    return performDecimalCalculation(acc, balanceInBaseCurrency, "+");
  }, 0);

  const balanceInPreferredCurrency = userCurrency === baseCurrency.code
    ? balance
    : performDecimalCalculation(balance, nonBaseCurrenciesRates[userCurrency], "/", 4);

  return balanceInPreferredCurrency.toFixed(2);
}