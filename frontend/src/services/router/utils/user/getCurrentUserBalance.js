import { getActiveWallets } from "@/services/firebase/db/wallet";
import { performDecimalCalculation } from "@/utils/number";
import { getBaseCurrency, getCurrencies } from "@/services/firebase/db/currency";
import { where } from "firebase/firestore";
import { getUser } from "@/services/firebase/db/user";

// Implementation is like this because the Set creation logic for the nonBaseCurrenciesSet here is rather unique for the app
// Would use getAllNeededConversionData but here it is a one off instance so better to not refactor the whole func
export default async function getCurrentUserBalance({ userId, providedData = {} }) {
  // Fetch needed data
  let activeWallets = providedData.activeWallets;
  if (!activeWallets) {
    activeWallets = await getActiveWallets(userId);
  }

  let baseCurrency = providedData.baseCurrency;
  if (!baseCurrency) {
    baseCurrency = await getBaseCurrency();
  }

  let userCurrency = providedData.userCurrency;
  if (!userCurrency) {
    ({ currency: userCurrency } = (await getUser(userId)));
  }

  // Create a Set of unique currencies
  const nonBaseCurrenciesSet = new Set(activeWallets
    .filter(wallet => wallet.currency !== baseCurrency.code)
    .map(wallet => wallet.currency));

  // Include the user currency if different from the base
  const isPreferredCurrencyBase = userCurrency === baseCurrency.code;
  if (!isPreferredCurrencyBase) {
    nonBaseCurrenciesSet.add(userCurrency);
  }

  // Create currency lookup table
  let nonBaseCurrenciesRates = {};
  if (nonBaseCurrenciesSet.size) {
    const nonBaseCurrenciesQuery = [
      where("code", "in", [...nonBaseCurrenciesSet])
    ];
    const nonBaseCurrencies = await getCurrencies(nonBaseCurrenciesQuery);
    // Turn the array into a lookup table
    nonBaseCurrenciesRates = Object.fromEntries(nonBaseCurrencies.map(currency => [currency.code, currency.conversionRate]));
  }

  const balance = activeWallets.reduce((acc, wallet) => {
    const { balance, currency } = wallet;

    let balanceInBaseCurrency = balance;
    if (currency !== baseCurrency.code) {
      balanceInBaseCurrency = performDecimalCalculation(balance, nonBaseCurrenciesRates[currency], "*", 4);
    }

    return performDecimalCalculation(acc, balanceInBaseCurrency, "+");
  }, 0);

  const balanceInPreferredCurrency = userCurrency === baseCurrency.code
    ? balance
    : performDecimalCalculation(balance, nonBaseCurrenciesRates[userCurrency], "/", 4);

  return balanceInPreferredCurrency.toFixed(2);
}