import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";

export default async function getBaseCurrency() {
  try {
    const currenciesCollectionRef = collection(db, "currencies");
    const currenciesQuery = query(currenciesCollectionRef, where("isBase", "==", true));
    const snapshot = await getDocs(currenciesQuery);

    const baseCurrencyDoc = snapshot.docs[0];
    const baseCurrency = {
      ...baseCurrencyDoc.data(),
      id: baseCurrencyDoc.id
    }

    return baseCurrency;
  } catch (error) {
    throw new Error("Error fetching base currency", { cause: error });
  }
}