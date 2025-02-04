import { query as firebaseQuery, getDocs } from "firebase/firestore";

export default async function getEntities(collectionRef, entities, query = []) {
  try {
    // If the query is provided, it gets spreaded and applied. If there isn't a query, the plain collectionRef is used and all documents are retrieved
    const firebaseQuery = firebaseQuery(collectionRef, ...query);
    const querySnapshot = await getDocs(firebaseQuery);

    if (querySnapshot.empty) {
      throw new Error(`No matching documents found in "${entities}" with the given query parameters`);
    };

    const docs = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    return docs;
  } catch (error) {
    throw new Error(`Error fetching ${entities}`, { cause: error });
  }
}