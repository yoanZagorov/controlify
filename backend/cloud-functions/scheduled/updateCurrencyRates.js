import { onSchedule } from "firebase-functions/scheduler";
import { onRequest } from "firebase-functions/https";
import { logger } from "firebase-functions";

import { db } from "../../firebase.config.js";
import { getActiveCurrencies, getBaseCurrency } from "../../db/currencies/index.js";
import { performDecimalCalculation } from "../../../shared/utils/number/index.js";

// Fetch the most recent currency rates
async function fetchCurrencyRates(baseCurrency) {
  const URL = `https://v6.exchangerate-api.com/v6/c9d6d9fb221d6baf099f9d4e/latest/${baseCurrency.code}`;

  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    if (data.result === "error") {
      throw new Error(`API Error: ${data["error-type"]}`);
    }

    return data.conversion_rates;
  } catch (error) {
    throw new Error("Error fetching currency rates", { cause: error });
  }
}

// Update the rates
async function updateRates() {
  const baseCurrency = await getBaseCurrency();
  const currencyRates = await fetchCurrencyRates(baseCurrency);
  const activeCurrencies = await getActiveCurrencies();

  await Promise.all(activeCurrencies.map(currency => {
    const currencyDocRef = db.collection("currencies").doc(currency.id)
    const conversionRate = performDecimalCalculation(1, currencyRates[currency.code], "/", 4);
    return currencyDocRef.update({ conversionRate });
  }))
}

// Export the Cloud Function
const updateCurrencyRates = onSchedule("every day 00:00", async () => {
  try {
    await updateRates();
  } catch (error) {
    logger.error("Error updating currency rates:", error);
  }
})

export default updateCurrencyRates;

// Used for testing
export const updateCurrencyRatesManually = onRequest(async (req, res) => {
  try {
    await updateRates();
    res.status(200).send("Currency rates updated successfully");
  } catch (error) {
    console.error("Error updating currency rates:", error);
    res.status(500).send("Error updating currency rates");
  }
});