import { onSchedule } from "firebase-functions/scheduler";
import { onRequest } from "firebase-functions/https";
import { db } from "./firebase.config.js";

import { getActiveCurrencies, getBaseCurrency } from "./db/currencies/index.js";
import { fetchCurrencyRates } from "./utils/index.js";

export const updateCurrencyRates = onSchedule("every 12 hours", async (event) => {
  try {
    await updateRates();
  } catch (error) {
    logger.error("Error updating currency rates:", error);
  }
})

async function updateRates() {
  const baseCurrency = await getBaseCurrency();
  const currencyRates = await fetchCurrencyRates(baseCurrency);
  const activeCurrencies = await getActiveCurrencies();

  await Promise.all(activeCurrencies.map(currency => {
    const currencyDocRef = db.collection("currencies").doc(currency.id)
    return currencyDocRef.update({ conversionRate: currencyRates[currency.code] });
  }))
}

// Used for testing
// export const updateCurrencyRatesManually = onRequest(async (req, res) => {
//   try {
//     await updateRates();
//     res.status(200).send("Currency rates updated successfully.");
//   } catch (error) {
//     console.error("Error updating currency rates:", error);
//     res.status(500).send("Error updating currency rates.");
//   }
// });
