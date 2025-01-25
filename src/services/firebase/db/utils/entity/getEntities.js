import { AppError } from "@/utils/errors";
import { query as firebaseQuery, getDocs } from "firebase/firestore";

export default async function getEntities(collectionRef, entities, query = []) {
  const q = firebaseQuery(collectionRef, ...query);

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new AppError(404, `No ${entities} found!`);
    };

    const entitiesDocs = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    return entitiesDocs;
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }

    throw new Error(`Error fetching ${entities}. Please try again.`, { cause: error }); // To do: Create a more user-friendly message and display it    
  }
}