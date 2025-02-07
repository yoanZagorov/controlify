import { deleteUser } from "firebase/auth";

// Try preventing misalignment between entries in Firebase Auth and Firestore
export default async function rollbackAuthUserCreation(authUser, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await deleteUser(authUser);
      console.log("Successfully rolled back user creation!");
      return;
    } catch (error) {
      console.error(`Failed to delete user. Attempt ${attempt}:`, { cause: error });
      if (attempt === maxRetries) {
        // To do (Non-MVP): Handle this scenario with a cron job on the backend, clearing "orphaned" users periodically
        throw new Error("Max retries reached for deleting auth user.");
      }

      // Exponential backoff delay
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
}