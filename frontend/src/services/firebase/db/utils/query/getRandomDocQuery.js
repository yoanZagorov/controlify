import { getRandomIndex } from "@/utils/general";
import { getCountFromServer, limit, orderBy, query, startAt } from "firebase/firestore";

export default async function getRandomDocQuery(collectionRef) {
  const collectionSnapshot = await getCountFromServer(collectionRef);
  const docsCount = collectionSnapshot.data().count;

  const randomIndex = getRandomIndex(docsCount);

  const randomDocQuery = query(
    collectionRef,
    orderBy("createdAt"),
    startAt(randomIndex),
    limit(1)
  )

  return randomDocQuery;
}