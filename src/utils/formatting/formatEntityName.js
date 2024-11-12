import { andToAmpersand, dashToSpace, capitalizeEveryWord } from "../str"

export default function formatEntityName(entityName) {
  const entityNameNoDashes = dashToSpace(entityName);
  const entityNameAndToAmpersand = andToAmpersand(entityNameNoDashes);
  const formattedEntityName = capitalizeEveryWord(entityNameAndToAmpersand);

  return formattedEntityName;
}