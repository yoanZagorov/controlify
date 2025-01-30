import { performDecimalCalculation } from "@/utils/number";
import { collection, where } from "firebase/firestore";
import { getEntities } from "../utils/entity";
import { getBaseCurrency } from "../currencies";
import { db } from "../../firebase.config";

export default async function getCurrentBalance({ userId, wallets = [], userCurrency }) {
  let activeWallets = wallets;
  if (!activeWallets.length) {
    const walletsCollectionRef = collection(db, `users/${userId}/wallets`);
    const activeWalletsQuery = [
      where("deletedAt", "==", null),
    ];
    activeWallets = await getEntities(walletsCollectionRef, "wallets", activeWalletsQuery);
  }

  const baseCurrency = await getBaseCurrency();

  const nonBaseCurrenciesSet = new Set(activeWallets
    .filter(wallet => wallet.currency !== baseCurrency.code)
    .map(wallet => wallet.currency));

  const isPreferredCurrencyBase = userCurrency === baseCurrency.code;
  if (!isPreferredCurrencyBase) {
    nonBaseCurrenciesSet.add(userCurrency);
  }

  let nonBaseCurrenciesRates = {};
  if (nonBaseCurrenciesSet.size) {
    const currenciesCollectionRef = collection(db, "currencies");
    const nonBaseCurrenciesQuery = [
      where("code", "in", [...nonBaseCurrenciesSet])
    ];
    const fetchedCurrencies = await getEntities(currenciesCollectionRef, "currencies", nonBaseCurrenciesQuery);
    nonBaseCurrenciesRates = Object.fromEntries(fetchedCurrencies.map(currency => [currency.code, currency.conversionRate]));
  }

  const balance = activeWallets.reduce((acc, wallet) => {
    let balanceInBaseCurrency = wallet.balance;
    if (wallet.currency !== baseCurrency.code) {
      const conversionRate = nonBaseCurrenciesRates[wallet.currency];
      balanceInBaseCurrency = performDecimalCalculation(wallet.balance, conversionRate, "*", 4);
    }

    return performDecimalCalculation(acc, balanceInBaseCurrency, "+");
  }, 0);

  const balanceInPreferredCurrency = isPreferredCurrencyBase
    ? balance
    : performDecimalCalculation(balance, nonBaseCurrenciesRates[userCurrency], "/", 4);

  return balanceInPreferredCurrency.toFixed(2);
}