import CATEGORY from "@/constants/category";
import { ValidationError } from "../errors";

export default function validateCategoryType(type) {
  if (!type) throw new ValidationError("Type should not be empty. Please choose a type");

  if (!CATEGORY.TYPES.includes(type)) {
    throw new ValidationError("The type must be either expense or income");
  }
}