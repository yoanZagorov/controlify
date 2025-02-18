import { getCategories } from "@/services/firebase/db/category";
import { HTTP_STATUS_CODES } from "@/constants";
import { StatusCodeError } from "@/utils/errors";

export default async function checkCategoryNameDuplicate(userId, name) {
  const categoryNames = (await getCategories(userId)).map(category => category.name);

  if (categoryNames.includes(name)) {
    throw new StatusCodeError("A category with this name already exists. Please try a different one", HTTP_STATUS_CODES.CONFLICT);
  }
}