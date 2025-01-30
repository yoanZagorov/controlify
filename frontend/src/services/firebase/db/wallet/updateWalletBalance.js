import { performDecimalCalculation } from "@/utils/number";

export default async function updateWalletBalance(dbTransaction, docRef, amount) {
  const walletDoc = await dbTransaction.get(docRef);

  const newBalance = performDecimalCalculation(walletDoc.data().balance, amount, "+");

  dbTransaction.update(docRef, { balance: newBalance });
}