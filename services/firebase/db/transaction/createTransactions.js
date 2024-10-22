// To do: refactor the function when user makes their first transaction 
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function createTransactions(userId) {
  const userDocRef = doc(db, "users", userId);

  const walletsCollectionRef = collection(userDocRef, "wallets");

  const transactionsCollectionRef = collection(walletsCollectionRef, "transactions");
  
//   try {
//     addDoc(walletsCollectionRef, {
      
//     })
//   } catch (error) {
//     console.error(error);
//   }
}