import { getEntity } from "../utils/entity";

export default async function editTransaction({ dbTransaction, docRefs, ids, data }) {
  const category = data.category
    ? (await getEntity(docRefs.category, ids.category, "category"))
    : null;
  const wallet = data.wallet
    ? (await getEntity(docRefs.wallet, ids.wallet, "wallet"))
    : null;

  const updatedData = {
    ...data,
    ...(data.wallet ? [{ // Check if the data property was actually changed
      wallet: {
        id: wallet.id,
        color: wallet.color,
        name: wallet.name,
        iconName: wallet.iconName,
        currency: wallet.currency,
      }
    }] : []),
    ...(data.category ? [{ // Check if the data property was actually changed
      category: {
        id: category.id,
        color: category.color,
        iconName: category.iconName,
        name: category.name,
        type: category.type,
      }
    }] : [])
  }

  dbTransaction.update(docRefs.transaction, updatedData);
}