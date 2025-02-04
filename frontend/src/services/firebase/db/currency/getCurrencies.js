import { collection } from "firebase/firestore";
import { getEntities } from "../utils/entity";
import { db } from "../../firebase.config";

export default async function getCurrencies(query = []) {
  const currenciesCollectionRef = collection(db, "currencies");
  return await getEntities(currenciesCollectionRef, "currencies", query);
}