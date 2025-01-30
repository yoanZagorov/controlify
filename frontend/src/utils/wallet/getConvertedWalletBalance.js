import { getBaseCurrency } from "@/services/firebase/db/currencies";
import { getEntities } from "@/services/firebase/db/utils/entity";
import { db } from "@/services/firebase/firebase.config";
import { collection, where } from "firebase/firestore";
import { performDecimalCalculation } from "../number";

export default async function getConvertedWalletBalance(oldCurrencyCode, newCurrencyCode, oldBalance) {
  const currenciesCollectionRef = collection(db, "currencies");

  const baseCurrency = await getBaseCurrency();

  let balanceInBaseCurrency = oldBalance;
  if (oldCurrencyCode !== baseCurrency.code) {
    const oldCurrencyQuery = [
      where("code", "==", oldCurrencyCode)
    ]
    const oldCurrency = (await getEntities(currenciesCollectionRef, "currencies", oldCurrencyQuery))[0];
    balanceInBaseCurrency = performDecimalCalculation(oldBalance, oldCurrency.conversionRate, "*", 4);
  }

  let newBalance = balanceInBaseCurrency;
  if (newCurrencyCode !== baseCurrency.code) {
    const newCurrencyQuery = [
      where("code", "==", newCurrencyCode)
    ]
    const newCurrency = (await getEntities(currenciesCollectionRef, "currencies", newCurrencyQuery))[0];
    newBalance = performDecimalCalculation(balanceInBaseCurrency, newCurrency.conversionRate, "/", 4);
  }

  return parseFloat(newBalance.toFixed(2));;
}