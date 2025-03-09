import { capitalizeEveryWord, dashToSpace } from "../str/index.js";

export default function formatPeriodNameForUI(periodName) {
  const entityNameNoDashes = dashToSpace(periodName);
  const formattedEntityName = capitalizeEveryWord(entityNameNoDashes);

  // If there is a number in the period name, return it as a number
  switch (formattedEntityName) {
    case ("Last Thirty Days"):
      return "Last 30 Days";
    default:
      return formattedEntityName;
  }
}
