import { createNewCategory } from "@/services/firebase/db/category";
import { categoriesColors, categoriesIconNames, checkCategoryNameDuplicate } from "@/utils/category";
import { ValidationError } from "@/utils/errors";
import { formatEntityNameForFirebase } from "@/utils/formatting";
import { validateEntityName } from "@/utils/validation";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { arrayUnion, collection, doc, serverTimestamp, where, writeBatch } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import { getEntities } from "@/services/firebase/db/utils/entity";

export default async function handleCategorySubmission(userId, formData) {
  const { name, type, iconName, color } = formData;
  const trimmedName = name.trim();
  const lcType = type.toLowerCase();

  try {
    // Name checks
    validateEntityName("category", trimmedName);
    const formattedName = formatEntityNameForFirebase(trimmedName);
    await checkCategoryNameDuplicate(userId, formattedName);

    // Type checks
    const validTypes = ["expense", "income"];
    if (!validTypes.includes(lcType)) {
      throw new ValidationError("The category type must be either expense or income!");
    }

    // Icon checks
    if (!categoriesIconNames.includes(iconName)) {
      throw new ValidationError("Invalid category icon name!");
    }

    // Color checks
    if (!categoriesColors.includes(color)) {
      throw new ValidationError("Invalid category color code!");
    }

    const newCategoryPayload = {
      name: formattedName,
      type: lcType,
      iconName,
      color,
      createdAt: serverTimestamp()
    }

    const batch = writeBatch(db);

    const categoriesCollectionRef = collection(db, `users/${userId}/categories`);
    const newCategoryDocRef = doc(categoriesCollectionRef);
    batch.set(newCategoryDocRef, newCategoryPayload);

    const walletsCollectionRef = collection(db, `users/${userId}/wallets`);
    const walletsQuery = [
      where("deletedAt", "==", null)
    ]
    const activeWallets = await getEntities(walletsCollectionRef, "wallets", walletsQuery);
    activeWallets.forEach(wallet => {
      const walletDocRef = doc(db, `users/${userId}/wallets/${wallet.id}`);

      batch.update(walletDocRef, {
        categories: arrayUnion({
          id: newCategoryDocRef.id,
          isVisible: true
        })
      })
    })

    await batch.commit();

    return createSuccessResponse({
      msg: "Successfully created the category!",
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