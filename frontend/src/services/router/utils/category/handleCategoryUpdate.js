import { getTransactions } from "@/services/firebase/db/transaction";
import { getEntities } from "@/services/firebase/db/utils/entity";
import { db } from "@/services/firebase/firebase.config";
import { categoriesColors, categoriesIconNames, checkCategoryNameDuplicate } from "@/utils/category";
import { ValidationError } from "@/utils/errors";
import { formatEntityNameForFirebase } from "@/utils/formatting";
import { validateEntityName } from "@/utils/validation";
import { collection, doc, runTransaction, where } from "firebase/firestore";
import getDataToChange from "../getDataToChange";
import { createErrorResponse, createSuccessResponse } from "../../responses";

export default async function handleCategoryUpdate(userId, formData) {
  const { id: categoryId } = formData;
  delete formData.id;
  delete formData.intent;

  formData.name = formatEntityNameForFirebase(formData.name.trim());
  formData.type = formData.type.toLowerCase();

  const { name, type, iconName, color } = formData;

  try {
    await runTransaction(db, async (dbTransaction) => {
      const categoryDocRef = doc(db, `users/${userId}/categories/${categoryId}`);
      const oldCategoryData = (await dbTransaction.get(categoryDocRef)).data();

      const hasDataChanged = {
        name: oldCategoryData.name !== name,
        type: oldCategoryData.type !== type,
        iconName: oldCategoryData.iconName !== iconName,
        color: oldCategoryData.color !== color,
      }

      if (hasDataChanged.type) {
        throw new Error("Category type should not change!");
      }

      if (hasDataChanged.name || hasDataChanged.iconName || hasDataChanged.color) {
        if (hasDataChanged.name) {
          validateEntityName("category", name);
          await checkCategoryNameDuplicate(userId, name);
        }

        if (hasDataChanged.iconName && !categoriesIconNames.includes(iconName)) {
          throw new ValidationError("Invalid category icon name!");
        }

        if (hasDataChanged.color && !categoriesColors.includes(color)) {
          throw new ValidationError("Invalid category color code!");
        }

        const walletsCollectionRef = collection(db, `users/${userId}/wallets`);
        const allWallets = await getEntities(walletsCollectionRef, "wallets");

        const transactionsQuery = [
          where("category.id", "==", categoryId)
        ]
        const transactionsByWallet = await getTransactions({ userId, wallets: allWallets, query: transactionsQuery, dataFormat: "structured" });

        transactionsByWallet.forEach(wallet => {
          wallet.transactions.forEach(transaction => {
            const transactionDocRef = doc(db, `users/${userId}/wallets/${wallet.id}/transactions/${transaction.id}`);
            dbTransaction.update(transactionDocRef, {
              ...(hasDataChanged.name ? { "category.name": name } : {}),
              ...(hasDataChanged.iconName ? { "category.iconName": iconName } : {}),
              ...(hasDataChanged.color ? { "category.color": color } : {}),
            })
          })
        })
      }

      const dataToChange = getDataToChange(hasDataChanged, formData);
      dbTransaction.update(categoryDocRef, dataToChange);
    });

    return createSuccessResponse({
      msg: `Successfully updated the category!`,
      msgType: "success",
    })
  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return createErrorResponse(error.message, error.statusCode);
    }

    return createErrorResponse(error.message);
  }
} 