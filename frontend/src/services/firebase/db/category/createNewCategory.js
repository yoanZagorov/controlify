import { addDoc, serverTimestamp } from "firebase/firestore";

export default async function createNewCategory(collectionRef, data) {
  try {
    await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    throw new Error("Couldn't create your category. Please try again.");
  }
}