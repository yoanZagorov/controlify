import { spaceToDash, lowercaseEveryWord } from "../str"

export default function formatEntityNameForFirebase(entityName) {
  const everyWordLowercase = lowercaseEveryWord(entityName);
  const formattedEntityName = spaceToDash(everyWordLowercase);

  return formattedEntityName;
}