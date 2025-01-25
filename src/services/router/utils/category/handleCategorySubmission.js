import { createNewCategory } from "@/services/firebase/db/category";
import { categoriesColors, categoriesIconNames, checkCategoryNameDuplicate } from "@/utils/category";
import { ValidationError } from "@/utils/errors";
import { formatEntityNameForFirebase } from "@/utils/formatting";
import { validateEntityName } from "@/utils/validation";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { collection } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";

export default async function handleCategorySubmission(userId, formData) {
  const categoriesCollectionRef = collection(db, `users/${userId}/categories`);

  const { name, type, icon, color } = formData;
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
    if (!categoriesIconNames.includes(icon)) {
      throw new ValidationError("Invalid category icon name!");
    }

    // Color checks
    if (!categoriesColors.includes(color)) {
      throw new ValidationError("Invalid category color code!");
    }

    const newCategoryPayload = {
      name: formattedName,
      type: lcType,
      iconName: icon,
      color
    }

    await createNewCategory(categoriesCollectionRef, newCategoryPayload);

    return createSuccessResponse({
      msg: "Successfully created your category!",
      msgType: "success",
    })

  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message);
    }

    return createErrorResponse(500, error.message);
  }
}