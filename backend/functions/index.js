import { onSchedule } from "firebase-functions/scheduler";
import { db } from "../firebase.config.js";

import { getActiveCurrencies, getBaseCurrency } from "./db/currencies/index.js";
import { fetchCurrencyRates } from "./utils/index.js";
import { performDecimalCalculation } from "./utils/number/index.js";
import { onRequest } from "firebase-functions/https";
import { v2 as cloudinary } from "cloudinary";

export const updateCurrencyRates = onSchedule("every day 00:00", async (event) => {
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
    const conversionRate = performDecimalCalculation(1, currencyRates[currency.code], "/", 4);
    return currencyDocRef.update({ conversionRate });
  }))
}

export const initializeCloudinary = onRequest(
  { secrets: ["CLOUDINARY_API_SECRET", "CLOUDINARY_API_KEY"] },
  (req, res) => {
    try {
      cloudinary.config({
        cloud_name: "cloudinary",
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      console.log('Cloudinary configuration successful');
      res.status(200).send('Cloudinary configuration successful');
    } catch (error) {
      res.status(500).send('Cloudinary configuration failed');
    }
  });



// export const deleteCloudinaryImage = onRequest(async (req, res) => {
//   try {
//   } catch (error) {
//     cloud
//   }
// })

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
