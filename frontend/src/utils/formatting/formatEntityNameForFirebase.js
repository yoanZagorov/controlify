import { VALIDATION_RULES } from "@/constants";
import { spaceToDash } from "../str"

// If there is a currency code, keep it as is for prettier look
export default function formatEntityNameForFirebase(entityName) {
  const everyWordLowercase = entityName
    .split(" ")
    .map(word => VALIDATION_RULES.CURRENCY_CODE_REGEX.test(word) ? word : word.toLowerCase())
    .join(" ");

  const formattedEntityName = spaceToDash(everyWordLowercase);

  return formattedEntityName;
}