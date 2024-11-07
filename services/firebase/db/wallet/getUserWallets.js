import { AppError } from "@/utils/errors";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getUserWallets(userId) {
  const walletsRef = collection(db, `users/${userId}/wallets`);

  const walletsQuery = query(
    walletsRef,
    orderBy("isDefault", "desc"),
    orderBy("createdAt", "desc")
  );

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
    throw new AppError("Error checking wallets existence", { cause: error }); // To do: Create a more user-friendly message and display it    
  }
}