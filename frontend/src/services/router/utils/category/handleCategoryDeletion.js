import { deleteField, doc, writeBatch } from "firebase/firestore";

import { CATEGORY } from "#constants";

import { createSuccessResponse } from "../../responses";

import { db } from "#services/firebase/firebase.config";
import { getActiveWallets } from "#services/firebase/db/wallet";
import { getCategories } from "#services/firebase/db/category";

import { ValidationError } from "#utils/errors";

import handleActionError from "../handleActionError";

export default async function handleCategoryDeletion(userId, formData) {
  const { id, type } = formData;

  try {
    // Don't allow the deletion if the num of left categories is less than the min allowed num
    const categories = await getCategories(userId);
    const sameTypeCategories = categories.filter(category => category.type === type);

    if (type === "expense" && sameTypeCategories.length === CATEGORY.MIN_AMOUNT.EXPENSE) {
      throw new ValidationError(`Your account should have a minimum of ${CATEGORY.MIN_AMOUNT.EXPENSE} expense categories`);
    }
    if (type === "income" && sameTypeCategories.length === CATEGORY.MIN_AMOUNT.INCOME) {
      throw new ValidationError(`Your account should have a minimum of ${CATEGORY.MIN_AMOUNT.INCOME} income categories`);
    }

    const batch = writeBatch(db);

    // Removing the category from each active wallet's categoriesVisibility field
    const activeWallets = await getActiveWallets(userId);
    activeWallets.forEach(wallet => {
      const walletDocRef = doc(db, `users/${userId}/wallets/${wallet.id}`);
      batch.update(walletDocRef, { [`categoriesVisibility.${id}`]: deleteField() })
    })

    // Delete the category doc
    const categoryDocRef = doc(db, `users/${userId}/categories/${id}`);
    batch.delete(categoryDocRef);

    await batch.commit();

    return createSuccessResponse({
      msg: `Successfully deleted your category!`,
      msgType: "success",
    })
  } catch (error) {
    return handleActionError(error, "Couldn't delete your category. Please try again");
  }
}