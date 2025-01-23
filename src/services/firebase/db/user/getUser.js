import { AppError } from "@/utils/errors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import getAuthUser from "./getAuthUser";

export default async function getUser(userId) {
  const userDocRef = doc(db, "users", userId);

  try {
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      throw new AppError(404, `User with id ${userId} doesn't exist`)  // To do: Create a more user-friendly message and display it
    };

    const user = docSnap.data();

    return {
      ...user,
      id: userId
    }
  } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    } else {
      throw new Error("Error fetching user", { cause: error }); // To do: Create a more user-friendly message and display it    
    }
  }
}