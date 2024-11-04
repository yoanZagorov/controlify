import { signOut } from "firebase/auth";
import { auth } from "services/firebase/firebase.config";

export default async function logOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}
