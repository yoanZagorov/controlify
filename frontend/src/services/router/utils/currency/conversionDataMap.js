import { where } from "firebase/firestore";


export default conversionDataMap;
let allWallets = prefetchedData.allWallets;
if (!allWallets) {
  allWallets = await getWallets(userId);
}

let periodTransactionsByWallet = prefetchedData.periodTransactionsByWallet;
if (!periodTransactionsByWallet) {
  const periodTransactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];
  periodTransactionsByWallet = await getTransactions({
    userId,
    prefetchedWallets: allWallets,
    query: periodTransactionsQuery,
    dataFormat: "structured"
  });
}

let baseCurrency = prefetchedData.baseCurrency;
if (!baseCurrency) {
  baseCurrency = await getBaseCurrency();
}

let userCurrency = prefetchedData.userCurrency;
if (!userCurrency) {
  ({ currency: userCurrency } = await getUser(userId));
}

let nonBaseCurrenciesRates = prefetchedData.nonBaseCurrenciesRates;
if (!nonBaseCurrenciesRates) {
  nonBaseCurrenciesRates = await getNonBaseCurrenciesRates(periodTransactionsByWallet, baseCurrency, userCurrency);
}