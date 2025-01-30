import { AppError } from "@/utils/errors";
import { getDocs, query as firebaseQuery } from "firebase/firestore";

export default async function getWallets(collectionRef, query = []) {
  const q = firebaseQuery(collectionRef, ...query);

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new AppError(404, "No wallets found");
    };

    const walletsDocs = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    return walletsDocs;
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }

    throw new Error("Error fetching wallets. Please try again.", { cause: error }); // To do: Create a more user-friendly message and display it    
  }
}