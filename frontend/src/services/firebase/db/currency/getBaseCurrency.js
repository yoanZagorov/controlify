import { where } from "firebase/firestore";
import getCurrencies from "./getCurrencies";

export default async function getBaseCurrency() {
  const baseCurrencyQuery = [
    where("isBase", "==", true)
  ];

  return (await getCurrencies(baseCurrencyQuery))[0];
}