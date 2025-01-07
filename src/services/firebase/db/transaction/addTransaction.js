import { serverTimestamp } from "firebase/firestore";

export default function addTransaction({ dbTransaction, docRef, data: { amount, wallet, category, date } }) {
  const newTransaction = {
    amount,
    category,
    wallet: {
      id: wallet.id,
      name: wallet.name,
      iconName: wallet.iconName,
      color: wallet.color,
      currency: wallet.currency
    },
    date,
    createdAt: serverTimestamp()
  }

  dbTransaction.set(docRef, newTransaction);
}