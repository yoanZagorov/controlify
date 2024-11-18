import { AppError } from "@/utils/errors";
import { collection, getDocs, query as firebaseQuery } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getWallets(userId, query = []) {
  const walletsRef = collection(db, `users/${userId}/wallets`);

  const walletsQuery = query
    ? firebaseQuery(walletsRef, ...query)
    : walletsRef;

  try {
    const querySnapshot = await getDocs(walletsQuery);

    if (querySnapshot.empty) {
      throw new AppError(404, "No wallets found");
    };

    const wallets = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    return wallets;
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    } else {
      throw new Error("Error fetching wallets", { cause: error }); // To do: Create a more user-friendly message and display it    
    }
  }
}