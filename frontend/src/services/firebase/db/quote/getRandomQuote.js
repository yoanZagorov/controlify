import { getRandomDocQuery } from "@/services/firebase/db/utils/query";
import { db } from "@/services/firebase/firebase.config";
import { collection } from "firebase/firestore";
import getQuotes from "./getQuotes";

export default async function getRandomQuote() {
  const quotesCollectionRef = collection(db, "quotes");
  const randomQuoteDocQuery = await getRandomDocQuery(quotesCollectionRef);

  return (await getQuotes(randomQuoteDocQuery))[0];
}