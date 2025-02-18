import { db } from "../../../firebase.config.js";

export default async function getActiveCurrencies() {
  try {
    const currenciesRef = db.collection("currencies");
    const snapshot = await currenciesRef.get();

    const currencies = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    return currencies;
  } catch (error) {
    throw new Error("Error fetching active currencies", { cause: error });
  }
}